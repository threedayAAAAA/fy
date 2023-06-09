import { format } from 'date-fns'

interface DateOptions {
    min?: Date
    max?: Date
}

interface StringOptions extends DateOptions {
    format?: string
}

// 返回一个随机的时间戳
export function mockTimestamp(options?: DateOptions): number {
    const defaultOptions: DateOptions = {
        min: new Date(2000, 0, 1),
        max: new Date(),
    }
    const mergedOptions = { ...defaultOptions, ...options }
    // 获取最小和最大日期的时间戳
    const minTimestamp = mergedOptions.min.getTime()
    const maxTimestamp = mergedOptions.max.getTime()
    // 返回一个在最小和最大时间戳之间的随机时间戳
    return Math.floor(Math.random() * (maxTimestamp - minTimestamp + 1)) + minTimestamp
}

// 返回一个随机日期字符串
export function mockDate(options?: StringOptions): string {
    const defaultOptions: StringOptions = {
        format: 'yyyy-MM-dd',
        min: new Date(2000, 0, 1),
        max: new Date(),
    }
    const mergedOptions = { ...defaultOptions, ...options }
    // 获取一个随机时间戳
    const timestamp = mockTimestamp(mergedOptions)
    return format(timestamp, mergedOptions.format)
}

// 返回一个随机时间字符串
export function mockTime(): string {
    // 调用mockDate函数并指定时间格式为HH:mm:ss
    return mockDate({ format: 'HH:mm:ss' })
}
