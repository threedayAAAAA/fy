import { parseIntDefault, isOwnKeyof, again, MockDateClass, formatDate } from '@/utils/index'

describe('utils', () => {
    describe('parseIntDefault', () => {
        it('应该将字符串转换为数字', () => {
            expect(parseIntDefault('123')).toBe(123)
            expect(parseIntDefault('0')).toBe(0)
            expect(parseIntDefault('-123')).toBe(-123)
        })

        it('应该返回默认值，如果字符串为 undefined 或 null', () => {
            //@ts-ignore
            expect(parseIntDefault(undefined, 123)).toBe(123)
            //@ts-ignore
            expect(parseIntDefault(null, 456)).toBe(456)
        })

        it('如果字符串无法转换为数字,应该返回默认值', () => {
            expect(parseIntDefault('1.23', 456)).toBe(1)
            expect(parseIntDefault('abc', 123)).toBe(123)
        })

        it('应该返回默认值，如果字符串超出了数字范围', () => {
            expect(
                parseIntDefault(
                    '999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999',
                    123,
                ),
            ).toBe(123)
            expect(
                parseIntDefault(
                    '-999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999',
                    456,
                ),
            ).toBe(456)
        })
    })

    describe('isOwnKeyof', () => {
        it("应该返回 true，因为 'foo' 是对象 {foo: 1, bar: 2} 的键", () => {
            const obj = { foo: 1, bar: 2 }
            expect(isOwnKeyof(obj, 'foo')).toBe(true)
        })

        it("应该返回 false，因为 'baz' 不是对象 {foo: 1, bar: 2} 的键", () => {
            const obj = { foo: 1, bar: 2 }
            expect(isOwnKeyof(obj, 'baz')).toBe(false)
        })

        it("应该返回 true，因为 'length' 是数组 [1, 2, 3] 的键", () => {
            const arr = [1, 2, 3]
            expect(isOwnKeyof(arr, 'length')).toBe(true)
        })

        it("应该返回 false，因为 'foo' 不是数字 123 的键", () => {
            const num = 123
            //@ts-ignore
            expect(isOwnKeyof(num, 'foo')).toBe(false)
        })

        it('应该报错，因为传入的对象为 null', () => {
            const obj = null
            //@ts-ignore
            expect(() => isOwnKeyof(obj, 'foo')).toThrowError()
        })

        it('应该报错，因为传入的对象为 undefined', () => {
            const obj = undefined
            //@ts-ignore
            expect(() => isOwnKeyof(obj, 'foo')).toThrowError()
        })

        it('应该返回 false，因为传入的键为 null', () => {
            const obj = { foo: 1, bar: 2 }
            const key = null
            //@ts-ignore
            expect(isOwnKeyof(obj, key)).toBe(false)
        })

        it('应该返回 false，因为传入的键为 undefined', () => {
            const obj = { foo: 1, bar: 2 }
            const key = undefined
            //@ts-ignore
            expect(isOwnKeyof(obj, key)).toBe(false)
        })

        it('应该返回 false，因为传入的键为数字', () => {
            const obj = { foo: 1, bar: 2 }
            const key = 123
            //@ts-ignore
            expect(isOwnKeyof(obj, key)).toBe(false)
        })

        it('应该返回 false，因为传入的键为布尔值', () => {
            const obj = { foo: 1, bar: 2 }
            const key = true
            //@ts-ignore
            expect(isOwnKeyof(obj, key)).toBe(false)
        })
    })

    describe('again', () => {
        it('应该返回 "abcabcabc"，因为调用了 3 次返回 "abc" 的函数', () => {
            const func = () => 'abc'
            expect(again(func, 3)).toBe('abcabcabc')
        })

        it('应该返回 ""，因为调用了 0 次返回 "abc" 的函数', () => {
            const func = () => 'abc'
            expect(again(func, 0)).toBe('')
        })

        it('应该返回 "abc"，因为调用了 1 次返回 "abc" 的函数', () => {
            const func = () => 'abc'
            expect(again(func, 1)).toBe('abc')
        })

        it('应该返回 ""，因为调用了 3 次返回 "" 的函数', () => {
            const func = () => ''
            expect(again(func, 3)).toBe('')
        })

        it('应该返回 "",因为undefined会被数组join忽略', () => {
            const func = () => undefined
            expect(again(func, 3)).toBe('')
        })
    })

    const timezoneOffset = new Date().getTimezoneOffset() * 60 * 1000
    const getTime = (str: string) => {
        return new Date(new Date(str).getTime() + timezoneOffset)
    }

    describe('MockDateClass', () => {
        test('format方法能够正确格式化日期', () => {
            const date = new MockDateClass(
                new Date('2023-05-30T12:34:56.789Z').getTime() + timezoneOffset,
            )
            expect(date.format('yyyy-MM-dd HH:mm:ss.SSS')).toBe('2023-05-30 12:34:56.789')
        })
    })

    describe('formatDate', () => {
        test('能够正确格式化日期', () => {
            const date = getTime('2023-05-30T12:34:56.789Z')
            expect(formatDate(date, 'yyyy-MM-dd HH:mm:ss.SSS')).toBe('2023-05-30 12:34:56.789')
        })

        test('能够正确处理单个格式化字符', () => {
            const date = getTime('2023-05-30T12:34:56.789Z')
            expect(formatDate(date, 'yyyy')).toBe('2023')
        })

        test('能够正确处理重复的格式化字符', () => {
            const date = getTime('2023-05-03T01:02:03.004Z')
            expect(formatDate(date, 'yyyy-MM-dd HH:mm:ss.SSS SSS a')).toBe(
                '2023-05-03 01:02:03.004 004 am',
            )
        })

        test('能够正确处理不带前导零的格式化字符', () => {
            const date = getTime('2023-05-30T14:34:56.012Z')
            expect(formatDate(date, 'y-M-d h:m:s.S a')).toBe('23-5-30 2:34:56.12 pm')
        })

        test('能够正确处理12小时制的格式化字符', () => {
            const date = getTime('2023-05-30T12:34:56.789Z')
            expect(formatDate(date, 'hh:mm:ss A')).toBe('00:34:56 PM')
        })

        test('能够正确处理小于10的日期部分', () => {
            const date = getTime('2023-05-03T01:02:03.004Z')
            expect(formatDate(date, 'yyyy-MM-dd HH:mm:ss.SS A')).toBe('2023-05-03 01:02:03.004 AM')
        })

        test('能够正确处理毫秒部分', () => {
            const date = getTime('2023-05-30T12:34:56.007Z')
            expect(formatDate(date, 'SSS')).toBe('007')
        })
    })
})
