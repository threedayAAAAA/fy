import { mockString } from '../src/base/string'

describe('测试 mockString函数', () => {
    it('应该返回指定长度的随机字符串', () => {
        const result = mockString({ length: 5 })
        expect(result).toHaveLength(5)
    })

    it('应该返回默认长度为10的随机字符串', () => {
        const result = mockString()
        expect(result).toHaveLength(10)
    })

    it('应该返回只包含指定字符的随机字符串', () => {
        const result = mockString({ chars: 'abc' })
        expect(result).toMatch(/^[abc]{10}$/)
    })

    it('应该在length为0时返回空字符串', () => {
        const result = mockString({ length: 0 })
        expect(result).toBe('')
    })

    it('应该在length为负数时抛出错误', () => {
        expect(() => mockString({ length: -1 })).toThrow('length必须大于等于0')
    })

    it('应该在chars为空字符串时返回空字符串', () => {
        const result = mockString({ chars: '' })
        expect(result).toBe('')
    })
})
