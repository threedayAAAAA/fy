
import Randexp from 'randexp';
import {
    Response,
    MockDataOptions,
} from './const'
import commonFn from './hook.js';
const commonObj = commonFn();
export default function getResponseMock (bos: Response) {

    const mock = (properties: MockDataOptions[]) => {
        let response = {} as any;

        properties?.forEach((prop) => {
            let propName = prop.name;
            let propEnum = prop.schema.enums ?? [];
            let propType = prop.schema.type.toLowerCase();
            let pattern = prop.schema.pattern;
            if (propEnum.length) {
                response[propName] = propEnum[commonObj.genInt(0, propEnum.length - 1)];
                return
            }
            
            // 常用字段匹配
            let mockDataList = [
                {
                    pattern: 'time$', // 时间
                    fn () {
                        return Date.now() - ~~(Math.random() * 1000) * 3600000
                    }
                },
                {
                    pattern: 'username', // 用户名
                    fn () {
                        return commonObj.genWord(2, 6)
                    }
                },
                {
                    pattern: 'email', // 邮箱
                    fn () {
                      return commonObj.genEmail()
                    }
                },
                {
                    pattern: 'uuId', // 邮箱
                    fn () {
                      return commonObj.genUuId()
                    }
                }
            ]
            response[propName] = mockDataList.find(item => {
                let reg = new RegExp(item.pattern)
    
                return reg.test(propName)
            })?.fn()
    
            if (response[propName]) {
                return;
            }
            if (pattern) {
                response[propName] = new Randexp(pattern).gen();
                return;
            }
            
            switch (propType) {
                case 'string':
                    response[propName] = commonObj.genWord(1, 25)
                    break
                case 'number':
                    response[propName] = commonObj.genNatural(prop.schema.min, prop.schema.max)
                    break
                case 'boolean':
                    response[propName] = Boolean(Math.random() > 0.5)
                    break
                case 'array':
                    response[propName] = new Array(commonObj.genNatural(prop.schema.min, prop.schema.max)).fill(1).map(() => mock(prop.schema.properties)).map(item => {
                        return Object.values(item);
                    }).flat()
                    break
                case 'object':
                    response[propName] = mock(prop.schema.properties);
            }
        })
        return response;
    }
    return mock(bos.properties);
}