import { text, phone, ID, character } from '@/base/text'
import { textPools } from '@/const'
describe('character函数', () => {
    it('应该从指定的文本池中返回一个字符', () => {
        const result = character(textPools.lower)
        expect(typeof result).toBe('string')
        expect(result.length).toBe(1)
        expect(textPools.lower).contain(result)
    })

    it('如果未指定文本池，则应从默认文本池中返回一个字符', () => {
        const result = character()
        expect(typeof result).toBe('string')
        expect(result.length).toBe(1)
        expect(textPools.all).contain(result)
    })
})

describe('string', () => {
    it('应该返回一个长度在3到7之间的字符串', () => {
        const result = text()
        expect(result.length).toBeGreaterThanOrEqual(3)
        expect(result.length).toBeLessThanOrEqual(7)
    })

    it('应该返回一个长度为500~1000的字符串', () => {
        const result = text({ min: 500, max: 1000 })
        expect(result.length).lessThanOrEqual(1000)
        expect(result.length).greaterThanOrEqual(500)
    })

    it('应该返回一个只包含指定字符集的字符串', () => {
        const result = text({ textPool: textPools.lower })
        expect(result).toMatch(/^[a-z]+$/)
    })

    it('应该返回一个包含自定义字符集的字符串', () => {
        const result = text({ textPool: '123abc' })
        expect(result).toMatch(/^[123abc]+$/)
    })
    it('给个空池子，应当报错', () => {
        expect(() => text({ textPool: '' })).throw('textPool应该为长度大于一的字符串')
    })

    it('应该返回一个空字符串', () => {
        const result = text({ min: 0, max: 0 })
        expect(result).toBe('')
    })

    it('应该返回一个长度为1的字符串', () => {
        const result = text({ min: 1, max: 1 })
        expect(result.length).toBe(1)
    })

    it('应该返回一个长度为100的字符串', () => {
        const result = text({ min: 100, max: 100 })
        expect(result.length).toBe(100)
    })

    it('应该返回一个长度为1000的字符串', () => {
        const result = text({ min: 1000, max: 1000 })
        expect(result.length).toBe(1000)
    })
})

describe('phone', () => {
    it('应该返回一个11位的字符串', () => {
        const result = phone()
        expect(result).toHaveLength(11)
    })

    it('应该以1开头', () => {
        const result = phone()
        expect(result.charAt(0)).toBe('1')
    })

    it('应该返回的字符串中间8位应该是数字', () => {
        const result = phone()
        const middle = result.substring(3, 11)
        expect(middle).toMatch(/^\d+$/)
    })

    it('应该返回的字符串前三位应该是指定的前缀之一', () => {
        const prefixes = ['130', '131', '132', '133', '135', '137', '138', '170', '187', '189']
        const result = phone()
        const prefix = result.substring(0, 3)
        expect(prefixes).toContain(prefix)
    })

    it('应该返回不同的号码', () => {
        const results = new Set()
        for (let i = 0; i < 1000; i++) {
            results.add(phone())
        }
        expect(results.size).toBe(1000)
    })
})

describe('身份证号生成函数', () => {
    test('正常情况', () => {
        const ids = Array.from({ length: 100 }, () => ID())
        ids.forEach(id => {
            expect(id).toHaveLength(18)
            expect(/^\d{17}[\dX]$/.test(id)).toBe(true)
        })
    })

    test('地址码边界情况', () => {
        // 地址码最小值
        const address = parseInt(ID().substring(0, 6))
        expect(address).greaterThanOrEqual(110101)

        // 地址码最大值
        expect(address).lessThanOrEqual(659004)
    })

    test('出生日期边界情况', () => {
        // 最小出生日期
        const birthday = parseInt(ID().substring(6, 14))
        expect(birthday).greaterThanOrEqual(19500101)
    })

    test('序列号边界情况', () => {
        const sequenceCode = parseInt(ID().substring(14, 17))
        expect(sequenceCode).greaterThanOrEqual(100)
        expect(sequenceCode).lessThanOrEqual(999)
    })
})
