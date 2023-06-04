import { randomBool } from '@/base/boolean'

describe('randomBool', () => {
    it('应该以50%的概率生成true或false', () => {
        const result = randomBool()
        expect(result).toBeTypeOf('boolean')
    })

    it('当min为0时，应该总是生成当前值', () => {
        const current = false
        const min = 0
        const max = 1
        const result = Array.from({ length: 1000 }, () => randomBool(current, min, max))
        expect(result).not.contain(!current)
    })

    it('当max为0时，应该总是生成相反的值', () => {
        const current = true
        const min = 1
        const max = 0
        const result = Array.from({ length: 1000 }, () => randomBool(current, min, max))
        expect(result).not.contain(current)
    })

    it('当min和max都为0时，应该总是生成false', () => {
        const current = true
        const min = 0
        const max = 0
        const result = randomBool(current, min, max)
        expect(result).toBe(false)
    })
})
