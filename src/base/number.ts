/**
* 生成一个指定范围内的随机整数
* @param options 选项对象，包括以下属性：
*   - min: 最小值，默认为 0
*   - max: 最大值，默认为 100
* @returns 一个随机整数
*/
export const int = (options?: { min?: number; max?: number }): number => {
    const min = options?.min || 0
    const max = options?.max || 100
    return Math.floor(Math.random() * (max - min + 1)) + min
}
