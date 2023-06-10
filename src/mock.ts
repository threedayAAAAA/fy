import { mockNumber, mockString, mockBoolean, mockDate, mockCustom } from './base'
import { getType } from './utils'

export const mockObject = (template: Record<string | number, any>, options?: any) => {
    const res: any[] = []
    const { count = 1 } = options || {}
    for (let i = 0; i < count; i++) {
        const result: Record<string, unknown> = {}
        const keys = Object.keys(template || {})
        for (const key of keys) {
            // key可以传入模板，按模板生成随机key
            const mockKey = generateData(key, options)
            result[mockKey] = generateData(template[key], options)
        }
        res.push(result)
    }
    return count === 1 ? res[0] : res
}

export const mockArray = (template: unknown[], count = 1) => {
    const res: unknown[] = []
    for (let i = 0; i < count; i++) {
        template.forEach(item => res.push(generateData(item, count)))
    }
    return res
}

export const mockNull = () => {
  return null
}

export const mockUndefined = () => {
  return undefined
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
}

// 解析模板规则
// template = {
//   name: '@mockString({ "length": 8, "chars": "asf" })',
// }
// 则调用mockString生成，参数为一个对象{ length: 8, chars: "asf" }
const parseTemplate = (template: string) => {
  if (!template.startsWith('@')) {
    return null
  }
  const [fnName, fnParams] = template.slice(1).split('(')
  const options = fnParams ? JSON.parse(`${fnParams.slice(0, -1)}`) : {}
  return { fnName, options }
}

export const generateData = (template: any, options?: any): any => {
    const templateType = getType(template)
    if (templateType === 'object'){
      return Mock.mockObject(template, options)
    } 
    if (templateType === 'array') {
      return Mock.mockArray(template, options)
    } 
    if (templateType === 'string') {
      const parsedTemplate = parseTemplate(template)
      if (parsedTemplate) {
        const { fnName, options } = parsedTemplate
        return Mock[fnName](options)
      }
    }
    return template
}

// 添加自定义生成mock规则
export const addCustomMock = (fnName: string, customFn: Function) => {
    Mock[fnName] = customFn
}
