/**
* 生成一个指定范围内的随机时间字符串
* @param options 选项对象，包括以下属性：
*   - hours: 小时数，默认为 24
*   - minutes: 分钟数，默认为 60
*   - seconds: 秒数，默认为 60
* @returns 一个随机时间字符串，格式为 'hh:mm:ss'
*/
export const time = (options?: { hours?: number, minutes?: number, seconds?: number }): string  => {
    const hours = options?.hours || 24
    const minutes = options?.minutes || 60
    const seconds = options?.seconds || 60
    const hour = Math.floor(Math.random() * hours)
    const minute = Math.floor(Math.random() * minutes)
    const second = Math.floor(Math.random() * seconds)
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`
}
