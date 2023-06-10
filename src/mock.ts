import { mockNumber, mockString, mockBoolean, mockDate, mockCustom } from './base'
import { getType } from './utils'

// 生成随机对象
export const mockObject = (template: Record<string, unknown>, count = 1) => {
    const res: Record<string, unknown>[] = []
    for (let i = 0; i < count; i++) {
        const result: Record<string, unknown> = {}
        const keys = Object.keys(template || {})
        for (const key of keys) {
            // key可以传入模板，按模板生成随机key
            const mockKey = generateData(key, count)
            result[mockKey] = generateData(template[key], count)
        }
        res.push(result)
    }
    return count === 1 ? res[0] : res
}

// 生成随机数组
export const mockArray = (template: unknown[], count = 1) => {
    const res: unknown[] = []
    for (let i = 0; i < count; i++) {
        template.forEach(item => res.push(generateData(item, count)))
    }
    return res
}

// 生成null
export const mockNull = () => {
    return null
}

// 生成undefined
export const mockUndefined = () => {
    return undefined
}

// 添加自定义生成mock规则
export const addCustomMock = (fnName: string, customFn: Function) => {
    Mock[fnName] = customFn
}

export const Mock: Record<string, Function> = {
    ...mockNumber,
    ...mockString,
    ...mockBoolean,
    ...mockDate,
    ...mockCustom,
    mockNull,
    mockUndefined,
    mockObject,
    mockArray,

    addCustomMock,
}

// 解析模板规则
// template = {
//   name: '@mockString({ "length": 8, "chars": "asf" })',
// }
// 则name是通过调用生成随机字符串的方法mockString({ length: 8, chars: "asf" })
const parseTemplate = (template: string): { fnName: string; options: unknown } | null => {
    if (!template.startsWith('@')) {
      return null
    }
    const [fnName, fnParams] = template.slice(1).split('(')
    try {
      const options = fnParams ? JSON.parse(`${fnParams.slice(0, -1)}`) : {}
      return { fnName, options }
    } catch (error) {
      throw new Error(`参数模板解析错误`)
    }
}

export const generateData = (template: unknown, count = 1) => {
    const templateType = getType(template)
    if (templateType === 'object'){
      return Mock.mockObject(template, count)
    } 
    if (templateType === 'array') {
      return Mock.mockArray(template, count)
    } 
    if (templateType === 'string') {
      const parsedTemplate = parseTemplate(template as string)
      if (parsedTemplate) {
        const { fnName, options } = parsedTemplate
        return Mock[fnName](options)
      }
    }
    return template
}

