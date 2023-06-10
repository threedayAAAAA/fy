import { mockObject, mockArray, Mock, addCustomMock, generateData } from '../src/mock'

describe('测试 mockObject 函数', () => {
  it('应该生成单个对象类型的 mock 数据', () => {
    const template = {
      name: '@mockString',
      age: '@mockInt',
      isMale: '@mockBool',
    }
    const result = mockObject(template) as {
      name: string,
      age: number,
      isMale: boolean
    }
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
      name: '@mockString',
      age: '@mockInt',
      isMale: '@mockBool',
    }
    const result = mockObject(template, 3) as {
      name: string,
      age: number,
      isMale: boolean
    }[]
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(3)
    result.forEach((item: { name: string; age: number; isMale: boolean }) => {
      expect(typeof item).toBe('object')
      expect(item.name).toBeDefined()
      expect(typeof item.name).toBe('string')
      expect(item.age).toBeDefined()
      expect(typeof item.age).toBe('number')
      expect(item.isMale).toBeDefined()
      expect(typeof item.isMale).toBe('boolean')
    })
  })

  it('应该生成嵌套对象类型的 mock 数据', () => {
    const template = {
      name: '@mockString',
      age: '@mockInt',
      address: {
        province: '@mockString',
        city: '@mockString',
        street: {
          name: '@mockString',
          number: '@mockInt',
        },
      },
      date: '@mockDate'
    }
    const result = mockObject(template) as {
      name: string,
      age: number,
      address: {
        province: string,
        city: string,
        street: {
          name: string,
          number: number
        }
      }
      date: string,
    }
    expect(typeof result.name).toBe('string')
    expect(typeof result.age).toBe('number')
    expect(typeof result.address).toBe('object')
    expect(typeof result.address.province).toBe('string')
    expect(typeof result.address.city).toBe('string')
    expect(typeof result.address.street).toBe('object')
    expect(typeof result.address.street.name).toBe('string')
    expect(typeof result.address.street.number).toBe('number')
    expect(typeof result.date).toBe('string')
  })

  it('应该生成嵌套对象类型的 mock 数据，含有null和undefined', () => {
    const template = {
      name: '@mockNull',
      age: '@mockUndefined',
      tags: ['@mockString'],
      friend: null,
    }
    const result = mockObject(template) as {
      name: string,
      age: number,
      tags: string[],
      friend: null,
    }
    expect(result.name).toBeNull()
    expect(result.age).toBeUndefined()
    expect(Array.isArray(result.tags)).toBe(true)
    expect(result.tags[0]).toBeDefined()
    expect(typeof result.tags[0]).toBe('string')
    expect(result.friend).toBeNull()
  })

  it('应该生成嵌套对象类型的 mock 数据，含有空数组和空对象', () => {
    const template = {
      name: '@mockString',
      age: '@mockInt',
      tags: [],
      friend: {},
    }
    const result = mockObject(template) as {
      name: string,
      age: number,
      tags: unknown[],
      friend: Object,
    }
    expect(typeof result.name).toBe('string')
    expect(typeof result.age).toBe('number')
    expect(Array.isArray(result.tags)).toBe(true)
    expect(result.tags.length).toBe(0)
    expect(typeof result.friend).toBe('object')
    expect(Object.keys(result.friend).length).toBe(0)
  })

  it('应该生成对象类型的 mock 数据，含有模板参数', () => {
    const template = {
      name: '@mockString({ "length": 8, "chars": "asf" })',
      age: '@mockInt',
      isMale: '@mockBool',
    }
    const result = mockObject(template) as {
      name: string,
      age: number,
      isMale: boolean
    }
    expect(typeof result).toBe('object')
    expect(result.name).toBeDefined()
    expect(typeof result.name).toBe('string')
    expect(result.name.length).toBe(8)
    expect(result.age).toBeDefined()
    expect(typeof result.age).toBe('number')
    expect(result.isMale).toBeDefined()
    expect(typeof result.isMale).toBe('boolean')
  })  

  it('应该生成嵌套对象类型的 mock 数据，对象的key能够传入模板', () => {
    const template = {
      name: '@mockString',
      age: '@mockInt',
      isMale: '@mockBool',
      '@mockString': '@mockInt'
    }
    const result = mockObject(template) as {
      name: string,
      age: number,
      isMale: boolean,
    }
    expect(typeof result).toBe('object')
    expect(result.name).toBeDefined()
    expect(typeof result.name).toBe('string')
    expect(result.age).toBeDefined()
    expect(typeof result.age).toBe('number')
    expect(result.isMale).toBeDefined()
    expect(typeof result.isMale).toBe('boolean')
  })
})

describe('测试 mockArray 函数', () => {
  it('应该生成单个数组类型的 mock 数据', () => {
    const template = ['@mockString', '@mockInt', '@mockBool']
    const result = mockArray(template)
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(template.length)
    expect(typeof result[0]).toBe('string')
    expect(typeof result[1]).toBe('number')
    expect(typeof result[2]).toBe('boolean')
  })

  it('应该生成多个数组类型的 mock 数据', () => {
    const template = ['@mockString', '@mockInt', '@mockBool']
    const result = mockArray(template, 3)
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(9)
  })

  it('应该生成嵌套数组类型的 mock 数据', () => {
    const template = [
      {
        name: '@mockString',
        age: '@mockInt',
        tags: ['@mockString'],
      },
    ]
    const result = mockArray(template) as {
      name: string,
      age: number,
      tags: string[],
    }[]
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(template.length)
    expect(typeof result[0]).toBe('object')
    expect(result[0].name).toBeDefined()
    expect(typeof result[0].name).toBe('string')
    expect(result[0].age).toBeDefined()
    expect(typeof result[0].age).toBe('number')
    expect(Array.isArray(result[0].tags)).toBe(true)
    expect(result[0].tags[0]).toBeDefined()
    expect(typeof result[0].tags[0]).toBe('string')
  })

  it('应该生成嵌套数组类型的 mock 数据，含有null和undefined', () => {
    const template = [
      {
        name: '@mockNull',
        age: '@mockUndefined',
        tags: ['@mockString'],
        friend: null,
      },
    ]
    const result = mockArray(template) as {
      name: null,
      age: undefined,
      tags: string[]
      friend: null
    }[]
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(template.length)
    expect(result[0].name).toBeNull()
    expect(result[0].age).toBeUndefined()
    expect(Array.isArray(result[0].tags)).toBe(true)
    expect(result[0].tags[0]).toBeDefined()
    expect(typeof result[0].tags[0]).toBe('string')
    expect(result[0].friend).toBeNull()
  })

  it('应该生成嵌套数组类型的 mock 数据，含有空数组和空对象', () => {
    const template = [
      {
        name: '@mockString',
        age: '@mockInt',
        tags: [],
        friend: {},
      },
    ]
    const result = mockArray(template) as {
      name: string,
      age: number,
      tags: unknown[],
      friend: Object,
    }[]
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(template.length)
    expect(typeof result[0]).toBe('object')
    expect(result[0].name).toBeDefined()
    expect(typeof result[0].name).toBe('string')
    expect(result[0].age).toBeDefined()
    expect(typeof result[0].age).toBe('number')
    expect(Array.isArray(result[0].tags)).toBe(true)
    expect(result[0].tags.length).toBe(0)
    expect(typeof result[0].friend).toBe('object')
    expect(Object.keys(result[0].friend).length).toBe(0)
  })
  
  it('应该生成嵌套数组类型的 mock 数据，含有模板参数', () => {
    const template = [
      {
        name: '@mockString({ "length": 8, "chars": "asf" })',
        age: '@mockInt',
        tags: ['@mockString'],
      },
    ]
    const result = mockArray(template) as {
      name: string,
      age: number,
      tags: string[],
    }[]
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(template.length)
    expect(typeof result[0]).toBe('object')
    expect(result[0].name).toBeDefined()
    expect(typeof result[0].name).toBe('string')
    expect(result[0].name.length).toBe(8)
    expect(result[0].age).toBeDefined()
    expect(typeof result[0].age).toBe('number')
    expect(Array.isArray(result[0].tags)).toBe(true)
    expect(result[0].tags[0]).toBeDefined()
    expect(typeof result[0].tags[0]).toBe('string')
  })
})

describe('测试 addCustomMock 函数', () => {
  it('应该添加自定义 mock 函数', () => {
    addCustomMock('mockCustom', () => 'custom')
    const template = {
      name: '@mockCustom', // 使用自定义函数
    }
    const result = mockObject(template) as {
      name: string
    }
    expect(result.name).toBe('custom')
  })
})

describe('测试 generateData 函数', () => {

  it('应该生成字符串类型的 mock 数据', () => {
    const template = '@mockString'
    const result = generateData(template)
    expect(typeof result).toBe('string')
  })

  it('应该生成数字类型的 mock 数据', () => {
    const template1 = '@mockInt'
    const result1 = generateData(template1)
    expect(typeof result1).toBe('number')
    const template2 = '@mockFloat'
    const result2 = generateData(template2)
    expect(typeof result2).toBe('number')
    const template3 = '@mockNatural'
    const result3 = generateData(template3)
    expect(typeof result3).toBe('number')
  })

  it('应该生成布尔类型的 mock 数据', () => {
    const template = '@mockBool'
    const result = generateData(template)
    expect(typeof result).toBe('boolean')
  })

  it('应该生成日期类型的 mock 数据', () => {
    const template = '@mockDate'
    const result = generateData(template)
    expect(typeof result).toBe('string')
  })

  it('应该生成null类型的 mock 数据', () => {
    const result = Mock.mockNull()
    expect(result).toBeNull()
  })

  it('应该生成undefined类型的 mock 数据', () => {
    const result = Mock.mockUndefined()
    expect(result).toBeUndefined()
  })

  it('应该生成空对象类型的 mock 数据', () => {
    const template = {}
    const result = generateData(template)
    expect(typeof result).toBe('object')
    expect(Object.keys(result).length).toBe(0)
  })

  it('应该生成嵌套空数组和空对象类型的 mock 数据', () => {
    const template = {
      name: '@mockString',
      age: '@mockInt',
      tags: [],
      friend: {},
    }
    const result = generateData(template)
    expect(typeof result.name).toBe('string')
    expect(typeof result.age).toBe('number')
    expect(Array.isArray(result.tags)).toBe(true)
    expect(result.tags.length).toBe(0)
    expect(typeof result.friend).toBe('object')
    expect(Object.keys(result.friend).length).toBe(0)
  })

  it('should throw an error when template is an invalid string', () => {
      expect(() => generateData('@mockString({ length: 8, chars: "asf" })')).toThrowError('参数模板解析错误')
  })

  it('应该生成嵌套空数组和空对象类型的 mock 数据，含有null和undefined', () => {
    const template = {
      name: '@mockNull',
      age: '@mockUndefined',
      tags: [],
      friend: null,
      children: [{}],
    }
    const result = generateData(template)
    expect(result.name).toBeNull()
    expect(result.age).toBeUndefined()
    expect(Array.isArray(result.tags)).toBe(true)
    expect(result.tags.length).toBe(0)
    expect(result.friend).toBeNull()
    expect(Array.isArray(result.children)).toBe(true)
    expect(typeof result.children[0]).toBe('object')
    expect(Object.keys(result.children[0]).length).toBe(0)
  })
})
