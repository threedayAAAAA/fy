import { mockText } from '@/base'
import { textPools } from '@/const'
import { Mock } from '@/mockData'
import { MockDateClass } from '@/utils'

const stringRegString = /[a-zA-Z]{10}/
const numberRegString = /-?\d+(\.\d+)?/
const booleanRegString = 'true|false'
const timeRegString = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/

const stringReg = new RegExp(/[a-zA-Z]{10}/)
const numberReg = new RegExp(/-?\d+(\.\d+)?/)
const booleanReg = new RegExp(/true|false/)
const timeReg = new RegExp(/\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/)

describe('mockData', () => {
    let mockData: Mock

    beforeEach(() => {
        mockData = new Mock()
    })
    describe('constructor', () => {
        it('应该赋值进map', () => {
            const raw = mockData.template('@string')
            expect(raw).toMatch(stringReg)

            const newMock = new Mock({
                string: () => '666',
            })
            const newString = newMock.template('@string')
            expect(newString).toBe('666')
        })
    })

    describe('text', () => {
        it('应该返回指定长度的字符串', () => {
            const result = mockData.string(5)
            expect(result.length).toBe(5)
        })

        it('应该返回包含在指定池中的字符的字符串', () => {
            const result1 = mockData.string(10, textPools.number)
            expect(result1).toMatch(/^[0-9]{10}$/)

            const result2 = mockData.string(10, textPools.alpha)
            expect(result2).toMatch(stringReg)
        })

        it('应该返回空字符串，当长度为0时', () => {
            const result = mockData.string(0)
            expect(result).toBe('')
        })

        it('应该默认返回包含在大小写字符池中的字符串，当未指定池时', () => {
            const result = mockData.string(10)
            expect(result).toMatch(/^[a-zA-Z]{10}$/)
        })

        it('应该返回包含在指定池中的字符的字符串，当指定的池为alpha时', () => {
            const result = mockData.string(10, 'alpha')
            expect(result).toMatch(/^[a-zA-Z]{10}$/)
        })

        it('应该返回包含在指定池中的字符的字符串，当指定的池为all时', () => {
            const result = mockData.string(10, 'all')
            expect(result).toMatch(/^[a-zA-Z0-9!@#$%^&*()\[\]]{10}$/)
        })
    })

    describe('number', () => {
        it('应该返回一个介于min和max之间的整数', () => {
            const result = mockData.number(1, 10)
            expect(result).toBeGreaterThanOrEqual(1)
            expect(result).toBeLessThanOrEqual(10)
        })

        it('当没有提供min和max参数时，应该返回一个介于Number.MIN_SAFE_INTEGER和Number.MAX_SAFE_INTEGER之间的整数', () => {
            const result = mockData.number()
            expect(result).toBeGreaterThanOrEqual(Number.MIN_SAFE_INTEGER)
            expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER)
        })

        it('当提供的min和max参数不是数字时，应该抛出TypeError', () => {
            //@ts-ignore
            expect(() => mockData.number('1', 10)).toThrow('min和max应该是数字')
            //@ts-ignore
            expect(() => mockData.number(1, '10')).toThrow('min和max应该是数字')
        })

        it('当提供的min大于max时，应该抛出RangeError', () => {
            expect(() => mockData.number(10, 1)).toThrow('max < min')
        })

        it('当提供的min和max参数为小数时，应该返回一个介于min和max之间的整数', () => {
            const result = mockData.number(1.5, 9.9)
            expect(result).toBeGreaterThanOrEqual(1)
            expect(result).toBeLessThanOrEqual(9)
        })
    })

    describe('date', () => {
        it('应该返回一个随机日期', () => {
            const result = mockData.date()
            expect(result).toBeInstanceOf(MockDateClass)
        })

        it('应该能正常format', () => {
            const result = mockData.date()
            expect(result).toBeInstanceOf(MockDateClass)
            expect(result.format('yyyy-MM-dd HH:mm:ss')).toMatch(timeReg)
        })

        it('应该返回一个在指定范围内的随机日期', () => {
            const min = new Date('2023-05-01')
            const max = new Date('2023-05-31')
            const result = mockData.date(min, max)
            expect(result).toBeInstanceOf(MockDateClass)
            expect(result.getTime()).toBeGreaterThanOrEqual(min.getTime())
            expect(result.getTime()).toBeLessThanOrEqual(max.getTime())
        })

        it('应该返回一个最小值为当前日期的随机日期', () => {
            const min = new Date('2023-05-26')
            const result = mockData.date(min)
            expect(result).toBeInstanceOf(MockDateClass)
            expect(result.getTime()).toBeGreaterThanOrEqual(min.getTime())
        })

        it('应该返回一个最大值为当前日期的随机日期', () => {
            const max = new Date('2023-05-26')
            const result = mockData.date(undefined, max)
            expect(result).toBeInstanceOf(MockDateClass)
            expect(result.getTime()).toBeLessThanOrEqual(max.getTime())
        })

        it('应该返回一个最小值和最大值都为当前日期的随机日期', () => {
            const min = new Date('2023-05-26')
            const max = new Date('2023-05-26')
            const result = mockData.date(min, max)
            expect(result).toBeInstanceOf(MockDateClass)
            expect(result.getTime()).toBe(min.getTime())
        })
    })

    describe('boolean', () => {
        it('应该返回一个布尔值', () => {
            const result = mockData.boolean()
            expect(result).toBeTypeOf('boolean')
        })

        it('应该返回 true 或 false', () => {
            const result = mockData.boolean()
            expect([true, false]).toContain(result)
        })
    })

    describe('array', () => {
        it('默认生成3-7个元素的数组', () => {
            const result = mockData.array()
            expect(result.length).lessThanOrEqual(7)
            expect(result.length).greaterThanOrEqual(3)
        })
        it('应该返回一个包含指定长度的数组', () => {
            const result = mockData.array(5)
            expect(result).toHaveLength(5)
        })

        it('如果没有生成器，则默认使用MockText.string', () => {
            const result = mockData.array(3)
            expect(result).toHaveLength(3)
            result.forEach(item => {
                expect(item).toBeTypeOf('string')
            })
        })

        it('应该使用提供的生成器生成数组元素', () => {
            const result = mockData.array(3, 1, 2, () => 3)
            result.forEach(item => {
                expect([1, 2, 3]).contain(item)
            })
        })

        it('如果提供的生成器不足，则重复使用', () => {
            const result = mockData.array(
                10,
                () => 1,
                () => 2,
            )
            result.forEach(item => {
                expect([1, 2]).contain(item)
            })
        })

        it('如果提供的长度为0，则返回空数组', () => {
            const result = mockData.array(0, mockText.text)
            expect(result).toEqual([])
        })

        it('如果提供的长度为1000，则返回1000长度的数组，时间在20ms内', () => {
            const before = new Date().getTime()
            const result = mockData.array(1000, mockData.time)
            const after = new Date().getTime()

            expect(result.length).equal(1000)
            expect(after - before).lessThanOrEqual(20)
        })
    })

    //单侧不测其他base数据的替换,由各自模块单侧提供
    describe('template', () => {
        //常规替换
        it('应该正确替换模板中的占位符', () => {
            const template = '这是一个字符串模板，@string @number @boolean @time'
            const result = mockData.template(template)
            expect(result).toMatch(new RegExp(stringRegString, 'g'))
            expect(result).toMatch(new RegExp(numberRegString, 'g'))
            expect(result).toMatch(new RegExp(booleanRegString, 'g'))
            expect(result).toMatch(new RegExp(timeRegString, 'g'))
        })

        it('应该正确处理不存在的占位符', () => {
            const template = '这是一个不存在的占位符：@notExist'
            const result = mockData.template(template)
            expect(result).toBe(template)
        })

        it('应该正确处理空字符串模板', () => {
            const template = ''
            const result = mockData.template(template)
            expect(result).toBe(template)
        })

        it('应该正确处理只有占位符的模板', () => {
            const template = '@string'
            const result = mockData.template(template)
            expect(result).toMatch(new RegExp(stringRegString, 'g'))
        })
    })

    describe('templateObject', () => {
        it('当传入空对象时，应返回一个空对象', () => {
            const template = {}
            const result = mockData.templateObject(template)
            expect(result).toEqual({})
        })

        it('当传入对象中包含字符串时，应返回一个包含模板的对象', () => {
            const template = {
                name: 'John',
                city: '@string',
            }
            const result = mockData.templateObject(template)
            expect(result.city).toMatch(stringReg)
        })
        it('当传入对象key为模板时，应返回一个包含模板key的对象', () => {
            const template = {
                '@string': 'John',
            }
            const result = mockData.templateObject(template)
            expect(Object.keys(result)[0]).toMatch(stringReg)
        })

        it('当传入对象中包含嵌套对象时，应返回一个包含模板的对象', () => {
            const template = {
                name: 'John',
                age: '30',
                address: {
                    street: '123 Main St',
                    city: '@string',
                    state: 'CA',
                },
            }
            const result = mockData.templateObject(template)
            expect(result.address.city).toMatch(stringReg)
        })

        it('当传入对象中包含嵌套数组时，应返回一个包含模板的对象', () => {
            const template = {
                name: 'John',
                age: '30',
                hobbies: ['@time', 'swimming', 'running'],
            }
            const result = mockData.templateObject(template)
            expect(result.hobbies[0]).toMatch(timeReg)
        })

        it('当传入对象中包含null值时，应返回一个包含null值的对象', () => {
            const template = {
                name: '@string',
                age: null,
            }
            const result = mockData.templateObject(template)
            expect(result.name).toMatch(stringReg)
            expect(result.age).toBeNull()
        })

        it('当传入对象中包含undefined值时，应返回一个包含undefined值的对象', () => {
            const template = {
                time: '@time',
                age: undefined,
            }
            const result = mockData.templateObject(template)
            expect(result.time).toMatch(timeReg)
            expect(result.age).toBeUndefined()
        })
        it('当不传入任何值时应该返回对应值,不进行模板解析', () => {
            const template = undefined
            //@ts-ignore
            const result = mockData.templateObject(template)
            expect(result).toBeUndefined()
        })
    })

    describe('templateArray', () => {
        it('应该正确处理字符串数组', () => {
            const input = ['@string', '@time', '@boolean']
            const result = mockData.templateArray(input)
            expect(result[0]).toMatch(stringReg)
            expect(result[1]).toMatch(timeReg)
            expect(result[2]).toMatch(booleanReg)
        })

        it('应该正确处理嵌套数组', () => {
            const input = ['a', ['@string', 'c'], 'd']
            const result = mockData.templateArray(input)

            expect(result[1][0]).toMatch(stringReg)
        })

        it('应该正确处理嵌套对象', () => {
            const input = ['a', { b: '@string', d: 'e' }, 'f']
            const result = mockData.templateArray(input)
            expect(result[1].b).toMatch(stringReg)
        })

        it('应该正确处理空数组', () => {
            const input: any[] = []
            const expected: any[] = []
            const result = mockData.templateArray(input)
            expect(result).toEqual(expected)
        })

        it('应该正确处理空对象', () => {
            const input = [{}]
            const expected = [{}]
            const result = mockData.templateArray(input)
            expect(result).toEqual(expected)
        })

        it('应该正确处理混合数组', () => {
            const input = ['a', ['@string', { c: '@time' }], { e: ['f', '@number'] }]
            const result = mockData.templateArray(input)
            expect(result[1][0]).toMatch(stringReg)
            expect(result[1][1].c).toMatch(timeReg)
            expect(result[2].e[1]).toMatch(numberReg)
        })
    })

    describe('define', () => {
        it('应该将生成器函数添加到模板映射中', () => {
            const generator = () => 'hello world'
            mockData.define('test', generator)
            expect(mockData.template('@test')).toBe(generator())
        })
        it('生成器为字符串', () => {
            const generator = 'hello world'
            mockData.define('test', generator)
            expect(mockData.template('@test')).toBe(generator)
        })

        it('应该使用模板的其他函数收到影响', () => {
            expect(
                mockData.templateObject({
                    key: '@string',
                }).key,
            ).toMatch(stringReg)
            const generator = () => 'hello world'
            mockData.define('string', generator)
            expect(
                mockData.templateObject({
                    key: '@string',
                }),
            ).toHaveProperty('key', generator())
        })

        it('同样前缀匹配最长的', () => {
            const generator = () => 'hello world'
            mockData.define('str', generator)
            const result = mockData.templateObject({
                string: '@string',
                str: '@str',
            })
            expect(result.string).toMatch(stringReg)
            expect(result).toHaveProperty('str', generator())
        })

        it('应该允许添加多个生成器函数', () => {
            const generator1 = () => 'hello'
            const generator2 = () => 'world'
            mockData.define('test1', generator1)
            mockData.define('test2', generator2)
            expect(mockData.template('@test1')).toBe(generator1())
            expect(mockData.template('@test2')).toBe(generator2())
        })

        it('应该允许添加返回不同类型的生成器函数', () => {
            const generator1 = () => 'hello'
            const generator2 = () => 42
            mockData.define('test1', generator1)
            mockData.define('test2', generator2)
            expect(mockData.template('@test1 test1')).toBe(`${generator1()} test1`)
            expect(mockData.template('@test1 test2 @test2')).toBe(
                `${generator1()} test2 ${generator2()}`,
            )
        })
    })
})
