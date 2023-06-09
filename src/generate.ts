import { mockNumber, mockString, mockBoolean, mockDate, mockCustom } from './base'
import { getType } from './utils'

export const mockObject = (template: Record<string | number, any>, options?: any) => {
    const res: any[] = []
    const { count = 1 } = options || {}
    for (let i = 0; i < count; i++) {
        const result: Record<string, unknown> = {}
        const keys = Object.keys(template || {})
        for (const key of keys) {
            result[key] = generateData(template[key], options)
        }
        res.push(result)
    }
    return count === 1 ? res[0] : res
}

export const mockArray = (template: unknown[], options?: any) => {
    const res: unknown[] = []
    const { count = 1 } = options || {}
    for (let i = 0; i < count; i++) {
        template.forEach(item => res.push(generateData(item, options)))
    }
    return res
}

export const generateMock: Record<string, Function> = {
    ...mockNumber,
    ...mockString,
    ...mockBoolean,
    ...mockDate,
    ...mockCustom,
    mockObject,
    mockArray,
}

export const generateData = (template: any, options?: any): any => {
    const templateType = getType(template)

    switch (templateType) {
        case 'object':
            return generateMock.mockObject(template, options)
        case 'array':
            return generateMock.mockArray(template, options)

        case 'number':
            return generateMock.mockInt(template, options)

        case 'string':
            return generateMock.mockString(template, options)

        case 'boolean':
            return generateMock.mockBool(template, options)
        case 'null':
            return null
        case 'undefined':
            return undefined
        default:
            return template
    }
}

// 添加自定义生成mock规则
export const addCustomMock = (fnName: string, customFn: Function) => {
    generateMock[fnName] = customFn
}
