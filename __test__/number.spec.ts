import { intNum, natural, floatNum } from '@/base/number'

describe('number', () => {
    describe('int', () => {
        it('返回指定范围内的整数', () => {
            const result = intNum(1, 10)
            expect(result).toBeGreaterThanOrEqual(1)
            expect(result).toBeLessThanOrEqual(10)
        })

        it('当未指定范围时，返回默认范围内的整数', () => {
            const result = intNum()
            expect(result).toBeGreaterThanOrEqual(-9007199254740991)
            expect(result).toBeLessThanOrEqual(9007199254740991)
        })
    })

    describe('natural', () => {
        it('返回指定范围内的自然数', () => {
            const result = natural(1, 10)
            expect(result).toBeGreaterThanOrEqual(1)
            expect(result).toBeLessThanOrEqual(10)
        })

        it('当未指定范围时，返回默认范围内的自然数', () => {
            const result = natural()
            expect(result).toBeGreaterThanOrEqual(0)
            expect(result).toBeLessThanOrEqual(9007199254740991)
        })

        it('当指定范围小于等于0时，返回0', () => {
            const result = natural(-1, 0)
            expect(result).toBe(0)
        })
    })

    describe('float', () => {
        it('返回指定范围内的浮点数', () => {
            const result = floatNum(1, 10, 2)
            expect(result).toBeGreaterThanOrEqual(1)
            expect(result).toBeLessThanOrEqual(10)
            expect(result.toString().split('.')[1].length).lessThanOrEqual(2)
        })

        it('当未指定范围时，返回默认范围内的浮点数', () => {
            const result = floatNum()
            expect(result).toBeGreaterThanOrEqual(-9007199254740991)
            expect(result).toBeLessThanOrEqual(9007199254740991)
            expect(result.toString()).contain('.')
        })
    })
})
