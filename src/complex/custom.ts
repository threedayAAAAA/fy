/**
* 生成指定类型的自定义随机字符串
* @param options 选项对象，包括以下属性：
*   - custom: 自定义类型，可选值目前有 'mail'、'id' 和 'phone'
* @returns 一个指定类型的随机字符串
*/

import { id } from './id'
import { mail } from './mail'
import { phone } from './phone'

export const custom = (options?: { custom? : string }): string => {
    switch (options?.custom) {
        case "mail":
          return mail();
        case "id":
          return id();
        case "phone":
          return phone();
        default:
          throw new Error(`Unsupported custom type: ${options?.custom}`);
    }
}