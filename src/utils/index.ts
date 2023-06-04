import { MaybeNumber } from '@/type'
import { isFunction, isNil } from 'lodash'

const validateSafeNum = (res: number) =>
    !isNaN(res) && res > Number.MIN_SAFE_INTEGER && res < Number.MAX_SAFE_INTEGER

export const validMoreThan = (errorString: string, min?: MaybeNumber, max?: MaybeNumber) => {
    const minNum = parseIntDefault(min)
    const maxNum = parseIntDefault(max)
    if (minNum > maxNum) throw new Error(errorString)
}
/**
 * 将字符串转换为整数，如果转换失败则返回默认值
 * @param {MaybeNumber| undefined} [str] 要转换的字符串
 * @param {number} [defaultNum = 0] 转换失败时的默认值
 * @returns {number} 转换后的整数
 */
export const parseIntDefault = (str: MaybeNumber | undefined, defaultNum = 0) => {
    if (isNil(str)) return defaultNum

    const result = parseInt(str.toString(), 10)

    return validateSafeNum(result) ? result : defaultNum
}

/**
 * 判断一个字符串是否是对象的属性名
 * @template T
 * @param {object} obj 要判断的对象
 * @param {T} key 要判断的属性名
 * @returns {key is keyof typeof obj} 如果是属性名则返回 true，否则返回 false
 */
export const isOwnKeyof = <T extends string>(obj: object, key: T): key is keyof typeof obj =>
    Object.getOwnPropertyNames(obj).includes(key)

/**
 * 重复执行一个函数并将结果拼接成字符串
 * @param {() => any} func 要执行的函数
 * @param {number} length 要执行的次数
 * @returns {string} 拼接后的字符串
 */
export const again = (func: () => any, length: number) => {
    return Array.from({ length }, () => func()).join('')
}

const formatPatter = {
    YYYY: 'yyyy',
    yyyy: 'getFullYear',
    yy: function (date: Date) {
        return ('' + date.getFullYear()).slice(2)
    },
    y: 'yy',

    MM: function (date: Date) {
        var m = date.getMonth() + 1
        return m < 10 ? '0' + m : m
    },
    M: function (date: Date) {
        return date.getMonth() + 1
    },

    dd: function (date: Date) {
        var d = date.getDate()
        return d < 10 ? '0' + d : d
    },
    d: 'getDate',

    HH: function (date: Date) {
        var h = date.getHours()
        return h < 10 ? '0' + h : h
    },
    H: 'getHours',
    hh: function (date: Date) {
        var h = date.getHours() % 12
        return h < 10 ? '0' + h : h
    },
    h: function (date: Date) {
        return date.getHours() % 12
    },

    mm: function (date: Date) {
        var m = date.getMinutes()
        return m < 10 ? '0' + m : m
    },
    m: 'getMinutes',

    ss: function (date: Date) {
        var s = date.getSeconds()
        return s < 10 ? '0' + s : s
    },
    s: 'getSeconds',

    SSS: 'SS',
    SS: function (date: Date) {
        var ms = date.getMilliseconds()
        return (ms < 10 && '00' + ms) || (ms < 100 && '0' + ms) || ms
    },
    S: 'getMilliseconds',

    A: function (date: Date) {
        return date.getHours() < 12 ? 'AM' : 'PM'
    },
    a: function (date: Date) {
        return date.getHours() < 12 ? 'am' : 'pm'
    },
    T: 'getTime',
} as const

//format对应正则
const formatPatterRegex = new RegExp(`(${Object.keys(formatPatter).join('|')})`, 'g')

/**
 * 格式化日期
 * @param {Date} date 要格式化的日期
 * @param {string} formatString 格式化字符串
 * @returns {string} 格式化后的字符串
 */
export const formatDate = (date: Date, formatString: string) => {
    return formatString.replace(
        formatPatterRegex,
        function pattern($0: string, p: keyof typeof formatPatter): string {
            const operate = formatPatter[p]
            return isFunction(operate)
                ? operate(date).toString()
                : isOwnKeyof(formatPatter, operate)
                ? pattern($0, operate)
                : date[operate as Exclude<typeof operate, 'yy' | 'yyyy' | 'dd' | 'SS'>]().toString()
        },
    )
}

/**
 * 扩展 Date 类，添加格式化方法
 */
export class MockDateClass extends Date {
    format: (formatString: string) => string
    constructor(...args: ConstructorParameters<typeof Date>) {
        super(...args)
        this.format = formatString => formatDate(this, formatString)
    }
}
