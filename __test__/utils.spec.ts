import { getType } from '../src/utils'

describe('getType', () => {
  it('应该返回正确的类型', () => {
    expect(getType(42)).toBe('number')
    expect(getType('hello')).toBe('string')
    expect(getType(true)).toBe('boolean')
    expect(getType(undefined)).toBe('undefined')
    expect(getType(BigInt(42))).toBe('bigint')
    expect(getType([])).toBe('array')
    expect(getType(new Date())).toBe('date')
    expect(getType(null)).toBe('null')
    expect(getType({})).toBe('object')
    expect(getType(() => {})).toBe('function')
  })

  it('应该返回 unknown 对于未知类型', () => {
    expect(getType(Symbol('foo'))).toBe('unknown')
  })
})
