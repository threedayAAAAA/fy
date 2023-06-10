import { mockBool } from '../src/base/boolean'

describe('测试 mockBool函数', () => {
    it('应该返回一个布尔值', () => {
        const result = mockBool()
        expect(typeof result).toBe('boolean')
    })

    it('应该在 50% 的概率下返回 true', () => {
        const results = Array.from({ length: 1000 }, mockBool)
        const trueCount = results.filter(Boolean).length
        const falseCount = results.length - trueCount
        expect(trueCount).toBeGreaterThan(400)
        expect(falseCount).toBeGreaterThan(400)
    })
})
