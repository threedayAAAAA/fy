import { randomBool } from '@/base/boolean'

describe('randomBool', () => {
    afterEach(() => {
      vi.restoreAllMocks()
    })
    
    it('应该以50%的概率生成true或false', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.4)
      expect(randomBool()).toBe(false)
      vi.spyOn(Math, 'random').mockReturnValue(0.6)
      expect(randomBool()).toBe(true)
    })

    it('当指定当前值时,应该以max/(max+min)的概率生成当前值，以min/(max+min)的概率生成相反的值', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.60)
      expect(randomBool(true, 1, 9)).toBe(true)
      vi.spyOn(Math, 'random').mockReturnValue(0.91)
      expect(randomBool(true, 1, 9)).toBe(false)
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
