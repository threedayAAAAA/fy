import { parser } from "../parser";
import { object } from "./object";
import randomBase from "../randomBase/index";
import { array } from './array';


const operateMap: Record<string, Function> = {
    ...randomBase
}

// 解析符合@string(p1,p2)等格式的字符串模板为可执行函数
export function template(option?: any) {
    const {operate, templateParams} = parser(option)!;
    return operateMap[operate](...templateParams);
}

export function extend(key: string, fn: Function) {
    if (operateMap[key]) {
        throw new Error('不可覆盖已定义方法');
    }
    operateMap[key] = fn;
}

function getType(option?: any) {
    if (Array.isArray(option)) {
        return 'array';
    }
    if (option === null) {
        return 'null';
    }
    const type = typeof option;
    if (type === 'string') {
        return parser(option) ? 'template' : 'string';
    }
    return type;
}

// 根据配置的类型进行递归生成值，是对象则按照key遍历 是模板字符串则解析为函数执行，是其他类型直接返回
export function generate(option?: any): any {
    const type = getType(option);
    switch (type) {
        case 'object':
            return object(option);
        case 'template': 
            return template(option);
        default:
            return option;
    }
}

export default {
    array,
    object
}