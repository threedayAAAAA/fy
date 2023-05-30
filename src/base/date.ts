import { DateFunc } from '@/type'
import { MockDateClass } from '@/utils'
import { intNum } from './number'

/**
 * 生成随机日期的函数
 * @param {Date} min - 最小日期，默认为 1970 年 1 月 1 日
 * @param {Date} max - 最大日期，默认为当前日期
 * @returns {MockDateClass} - 返回一个 MockDateClass 实例，该实例包含一个随机日期
 */
export const randomDate = (min: Date = new Date(0), max: Date = new Date()): MockDateClass => {
    return new MockDateClass(intNum(min.getTime(), max.getTime()))
}

/**
 * 生成默认模板的日期字符串函数
 * @param {string} defaultFormat - 默认日期格式
 * @returns {DateFunc} - 返回一个函数，该函数调用 randomDate() 生成一个随机日期，并使用传入的默认格式进行格式化
 */
const commonDateFunc = (defaultFormat: string): DateFunc => {
    return () => randomDate().format(defaultFormat)
}

/**
 * 生成 yyyy-MM-dd 格式的随机日期字符串的函数
 * @returns {string} - 返回一个 yyyy-MM-dd 格式的随机日期字符串
 */
export const dateString = commonDateFunc('yyyy-MM-dd')

/**
 * 生成 HH:mm:ss 格式的随机时间字符串的函数
 * @returns {string} - 返回一个 HH:mm:ss 格式的随机时间字符串
 */
export const timeString = commonDateFunc('HH:mm:ss')

/**
 * 生成 yyyy-MM-dd HH:mm:ss 格式的随机日期时间字符串的函数
 * @returns {string} - 返回一个 yyyy-MM-dd HH:mm:ss 格式的随机日期时间字符串
 */
export const dateTimeString = commonDateFunc('yyyy-MM-dd HH:mm:ss')
