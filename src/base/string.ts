/**
* 生成一个指定长度和字符集的随机字符串
* @param options 选项对象，包括以下属性：
*   - length: 字符串长度，默认为 10
*   - chars: 字符集，默认为包含大小写字母和数字的字符串
* @returns 一个随机字符串
*/

export const string = (options?: { length?: number, chars?: string }): string => {
    const length = options?.length || 10
    const chars = options?.chars || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let str = ''
    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * chars.length)
      str += chars[index]
    }
    return str
}