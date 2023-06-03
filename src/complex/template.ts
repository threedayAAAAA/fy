/**
* 根据模板生成随机数据
* @param options 选项对象，包括以下属性：
*   - template: 模板，可以是字符串或对象
* @returns 一个根据模板生成的随机数据
*/

import { MockNumber, MockString, MockBoolean, MockDate, MockTime } from '../base'
import { array } from './array'


export const template = (options?: { template?: any }) => {
    if (typeof options?.template === 'string') {
        switch (options.template) {
          case 'string':
            return MockString.string();
          case 'number':
            return MockNumber.int();
          case 'boolean':
            return MockBoolean.bool();
          case 'date':
            return MockDate.date();
          case 'time':
            return MockTime.time();
          default:
            throw new Error(`Unknown data type: ${template}`);
        }
      } else if (typeof options?.template === 'object') {
        if (Array.isArray(options.template)) {
          return array();
        } else {
          const result: { [key: string]: any } = {};
          for (const key in options.template) {
            if (options.template.hasOwnProperty(key)) {
              result[key] = template({ template: options.template[key] });
            }
          }
          return result;
        }
      } else {
        throw new Error(`Invalid template: ${options?.template}`);
      }
}