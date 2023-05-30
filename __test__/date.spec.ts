import { dateString, timeString, dateTimeString, randomDate } from '@/base/date'

describe('测试日期格式化函数', () => {
    test('测试默认日期格式', () => {
        const expectedRegex = /^\d{4}-\d{2}-\d{2}$/
        expect(expectedRegex.test(dateString())).toBe(true)
    })

    test('测试默认时间格式', () => {
        const expectedRegex = /^\d{2}:\d{2}:\d{2}$/
        expect(expectedRegex.test(timeString())).toBe(true)
    })

    test('测试默认日期时间格式', () => {
        const expectedRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/
        expect(expectedRegex.test(dateTimeString())).toBe(true)
    })

    test('测试自定义日期格式', () => {
        const expectedRegex = /^\d{4}年\d{2}月\d{2}日$/
        expect(expectedRegex.test(randomDate().format('yyyy年MM月dd日'))).toBe(true)
    })

    test('测试自定义时间格式', () => {
        const expectedRegex = /^\d{2}点\d{2}分\d{2}秒$/
        expect(expectedRegex.test(randomDate().format('hh点mm分ss秒'))).toBe(true)
    })

    test('测试自定义日期时间格式', () => {
        const expectedRegex = /^\d{4}年\d{2}月\d{2}日 \d{2}点\d{2}分\d{2}秒$/
        expect(expectedRegex.test(randomDate().format('yyyy年MM月dd日 HH点mm分ss秒'))).toBe(true)
    })
})
