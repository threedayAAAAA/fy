/**
* 生成一个指定长度和类型的随机数组
* @param options 选项对象，包括以下属性：
*   - length: 数组长度，默认为 10
*   - type: 数组元素类型，默认为 'string'
* @returns 一个随机数组
*/

import { generate } from '../entry'

interface MockData {
    [key: string]: any;
}

export const array = (options?: { length?: number, type?: string }): (string | number | boolean | MockData)[] => {
    const length = options?.length || 10;
    const type = options?.type || "string";
    const result = [];
    for (let i = 0; i < length; i++) {
      result.push(generate(type));
    }
    return result;
}