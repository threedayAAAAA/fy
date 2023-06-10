import { mockObject, mockArray, generateMock, addCustomMock } from '../src/generate'

describe('测试 mockObject 函数', () => {
  it('应该生成单个对象类型的 mock 数据', () => {
    const template = {
      name: '1',
      age: 2,
      isMale: true,
    }
    const result = mockObject(template)
    expect(typeof result).toBe('object')
    expect(result.name).toBeDefined()
    expect(typeof result.name).toBe('string')
    expect(result.age).toBeDefined()
    expect(typeof result.age).toBe('number')
    expect(result.isMale).toBeDefined()
    expect(typeof result.isMale).toBe('boolean')
  })

  it('应该生成多个对象类型的 mock 数据', () => {
    const template = {
      name: '1',
      age: 2,
      isMale: true,
    }
    const result = mockObject(template, { count: 3 })
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(3)
    result.forEach(item => {
      expect(typeof item).toBe('object')
      expect(item.name).toBeDefined()
      expect(typeof item.name).toBe('string')
      expect(item.age).toBeDefined()
      expect(typeof item.age).toBe('number')
      expect(item.isMale).toBeDefined()
      expect(typeof item.isMale).toBe('boolean')
    })
  })
})

describe('测试 mockArray 函数', () => {
  it('应该生成单个数组类型的 mock 数据', () => {
    const template = ['1', 0, true]
    const result = mockArray(template)
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(template.length)
    expect(typeof result[0]).toBe('string')
    expect(typeof result[1]).toBe('number')
    expect(typeof result[2]).toBe('boolean')
  })

  it('应该生成多个数组类型的 mock 数据', () => {
    const template = ['string', 'number', 'boolean']
    const result = mockArray(template, { count: 3 })
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(9)
  })
})

describe('测试 generateData 函数', () => {
  it('应该生成自定义类型的 mock 数据', () => {
    const template = 'custom'
    const customMockFn = () => 'mocked'
    addCustomMock(template, customMockFn)
    const result = generateMock.custom()
    expect(result).toEqual('mocked')
  })
})
