import { formatDate, MockDateClass } from '@/utils'
export type Generate<T = string> = (() => T) | T
export type MockObject = Record<string, any>
export type MockArray = Array<string | MockObject | any>
export interface MockDateType extends Date {
    format: typeof formatDate
}

export interface MockData {
    /**
     * 生成指定长度和字符集的字符串
     * @param {number} [length=10] 字符串长度
     * @param {textPool} [poolKey= textPools.alpha] 字符集
     * @returns {string} 生成的字符串
     */
    string(length: number, poolKey: string): string

    /**
     * 生成指定范围的数字
     * @param {number} [min] 最小值
     * @param {number} [max] 最大值
     * @param {number} [toFixed ] 保留的小数位数，默认不保留
     * @returns {number} 生成的整数
     * @throws {TypeError} 如果 `min` 或 `max` 是字符串类型
     * @throws {RangeError} 如果 `min` 大于 `max`
     */
    number(min?: number, max?: number, toFixed?: number): number

    /**
     * 生成随机的布尔值
     * @returns {boolean} 生成的布尔值
     */
    boolean(): boolean

    /**
     * 生成指定范围内的日期
     * @param {Date} [min] 最小日期
     * @param {Date} [max] 最大日期
     * @returns {MockDateClass} 生成的日期
     * @description 返回值基于date拓展了format函数
     */
    date(min: Date, max: Date): MockDateClass

    /**
     * 生成 yyyy-MM-dd HH:mm:ss 格式的随机日期时间字符串的函数
     * @returns {string} - 返回一个 yyyy-MM-dd HH:mm:ss 格式的随机日期时间字符串
     */
    time(): string

    /**
     * 生成指定长度和元素生成器的数组
     * @template T
     * @param {number} [length=3-7] 数组长度
     * @param {...Generate<T>[]} generators 元素生成器
     * @returns {Array<T | string>} 生成的数组
     */
    array<T>(length: number, ...generators: Generate<T>[]): Array<T | string>

    /**
     * 自定义生成器
     * @template T
     * @param {string} name 生成器名称
     * @param {Generate} generator 生成器函数或字符串
     */
    define<T>(name: string, generator: Generate<T>): void

    /**
     * 将模板字符串中的占位符替换为随机数据
     * @param {string} template 模板字符串
     * @returns {string} 替换后的字符串
     */
    template(template: string): string

    /**
     * 将模板对象中的每个属性值都进行模板替换
     * @param {MockObject} template 模板对象
     * @returns {MockObject} 替换后的对象
     */
    templateObject(template: MockObject): MockObject

    /**
     * 将模板数组中的每个元素都进行模板替换
     * @param {MockArray} template 模板数组
     * @returns {MockArray} 替换后的数组
     */
    templateArray(template: MockArray): MockArray

    /**
     * 根据数据模板生成数据
     * @param template 数据模板，用于指定数据的结构和类型
     */
    template(template: string): string
}
