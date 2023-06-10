import { mockInt, mockFloat, mockNatural } from '../src/base/number'

describe('测试 mockInt 函数', () => {
  it('当不传入参数时，返回 0 到 100 之间的整数', () => {
    const result = mockInt()
    expect(result).toBeGreaterThanOrEqual(0)
    expect(result).toBeLessThanOrEqual(100)
    expect(Number.isInteger(result)).toBe(true)
  })

  it('当传入参数时，返回指定范围内的整数', () => {
      const result = mockInt({ min: 10, max: 20 })
      expect(result).toBeGreaterThanOrEqual(10)
      expect(result).toBeLessThanOrEqual(20)
      expect(Number.isInteger(result)).toBe(true)
  })

  it('当传入的 min 大于等于 max 时，抛出错误', () => {
      expect(() => mockInt({ min: 20, max: 10 })).toThrow('max必须大于min')
  })

  it('当传入的 min 和 max 相等时，返回该整数', () => {
      const result = mockInt({ min: 10, max: 10 })
      expect(result).toBe(10)
      expect(Number.isInteger(result)).toBe(true)
  })
})

describe('测试 mockFloat 函数', () => {
  it('当不传入参数时，返回 0 到 100 之间的浮点数，小数点后保留两位', () => {
    const result = mockFloat()
    expect(result).toBeGreaterThanOrEqual(0)
    expect(result).toBeLessThanOrEqual(100)
    expect(result.toFixed(2)).toBe(String(result))
  })

  it('当传入参数时，返回指定范围内的浮点数，小数点后保留指定位数', () => {
      const result = mockFloat({ min: 10, max: 20, decimalPlaces: 3 })
      expect(result).toBeGreaterThanOrEqual(10)
      expect(result).toBeLessThanOrEqual(20)
      expect(result.toFixed(3)).toBe(String(result))
  })

  it('当传入的 min 大于等于 max 时，抛出错误', () => {
      expect(() => mockFloat({ min: 20, max: 10 })).toThrow('max必须大于min')
  })

  it('当传入的 decimalPlaces 小于 0 时，抛出错误', () => {
      expect(() => mockFloat({ decimalPlaces: -1 })).toThrow('decimalPlaces必须大于等于0')
  })

  it('当传入的 decimalPlaces 为 0 时，返回整数', () => {
      const result = mockFloat({ min: 10, max: 20, decimalPlaces: 0 })
      expect(Number.isInteger(result)).toBe(true)
  })
})

describe('测试 mockNatural 函数', () => {
  it('当不传入参数时，返回 0 到 100 之间的自然数', () => {
    const result = mockNatural()
    expect(result).toBeGreaterThanOrEqual(0)
    expect(result).toBeLessThanOrEqual(99)
    expect(Number.isInteger(result)).toBe(true)
  })

  it('当传入参数时，返回指定范围内的自然数', () => {
      const result = mockNatural({ min: 10, max: 20 })
      expect(result).toBeGreaterThanOrEqual(10)
      expect(result).toBeLessThanOrEqual(19)
      expect(Number.isInteger(result)).toBe(true)
  })

  it('当传入的 min 或 max 小于 0 时，抛出错误', () => {
      expect(() => mockNatural({ min: -1 })).toThrow('min和max必须大于等于0')
      expect(() => mockNatural({ max: -1 })).toThrow('min和max必须大于等于0')
  })

  it('当传入的 min 大于等于 max 时，抛出错误', () => {
      expect(() => mockNatural({ min: 20, max: 10 })).toThrow('max必须大于min')
  })

  it('当传入的 min 和 max 相等时，返回该自然数', () => {
      const result = mockNatural({ min: 10, max: 10 })
      expect(result).toBe(10)
      expect(Number.isInteger(result)).toBe(true)
  })
})