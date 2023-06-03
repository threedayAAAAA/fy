/**
* 生成一个包含指定属性和类型的随机对象
* @param options 选项对象，包括以下属性：
*    - type: 属性值类型
*    - options: 生成属性值的选项对象
* @returns 一个包含指定属性和类型的随机对象
*/

import { generate } from '../entry';


interface OptionsType {
  [key: string]: any;
}
interface MockData {
  [key: string]: any;
}

export const obj = (options?: OptionsType): MockData => {
    const result: MockData = {};
    const keys = Object.keys(options || {});
    for (const key of keys) {
      result[key] = generate(options?.[key].type, options?.[key].options);
    }
    return result;
}