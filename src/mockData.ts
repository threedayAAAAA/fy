import {
    MockDataType,
    Generate,
    MockObject,
    MockArray,
    MaybeNumber,
    MockTemplateType,
} from '@/type'
import { isFunction, isNil, isObject, isString, isUndefined, sample } from 'lodash'
import { mockNumber, mockText, mockBoolean, mockDate } from './base'
import { MockDateClass, isOwnKeyof, parseIntDefault } from './utils'
import { textPools } from './const'
import { MockTemplate } from './mockTemplate'

export class Mock implements MockDataType {
    private mockTemplate: MockTemplateType

    constructor(templateMap?: Record<string, () => any | string>) {
        this.mockTemplate = new MockTemplate({
            ...mockText,
            ...mockNumber,
            ...mockBoolean,
            ...mockDate,

            string: this.string,
            number: this.number,
            boolean: this.boolean,
            time: this.time,
            ...templateMap,
        })
    }

    template(template: string): any {
        return this.mockTemplate.judgeRawData(template)
            ? this.mockTemplate.templateRaw(template)
            : this.mockTemplate.templateString(template)
    }

    string(length: MaybeNumber = 10, textPool = textPools.alpha): string {
        return mockText.text({
            min: length,
            max: length,
            textPool,
        })
    }

    number(min?: MaybeNumber, max?: MaybeNumber, toFixed = 0): number {
        if (!isUndefined(min) && !isUndefined(max) && parseIntDefault(min) > parseIntDefault(max)) {
            throw new RangeError('max < min')
        }
        return mockNumber.floatNum(min, max, toFixed)
    }

    boolean(): boolean {
        return mockBoolean.randomBool()
    }

    date(min?: Date, max?: Date): MockDateClass {
        return mockDate.randomDate(min, max)
    }

    time(): string {
        return mockDate.dateTimeString()
    }

    array<T = string>(
        length: number = mockNumber.intNum(3, 7),
        ...generators: Generate<T>[]
    ): Array<T | string> {
        generators.length === 0 && generators.push(mockText.text as () => T)
        return Array.from({ length }).map(() => {
            const func = sample(generators)!
            return isFunction(func) ? func() : func
        })
    }

    private templateUnknown(value: unknown) {
        if (typeof value === 'string') {
            return this.template(value)
        } else if (Array.isArray(value)) {
            return this.templateArray(value)
        } else if (isObject(value)) {
            return this.templateObject(value)
        } else {
            return value
        }
    }

    templateArray(template: MockArray): MockArray {
        return template.map(value => this.templateUnknown(value))
    }

    templateObject(template: MockObject): MockObject {
        if (isNil(template)) return template
        return Object.entries(template).reduce((pre, [key, value]) => {
            pre[this.template(key)] = this.templateUnknown(value)
            return pre
        }, {} as MockObject)
    }

    define<T = any>(name: string, generator: Generate<T>): void {
        this.mockTemplate.define(name, generator)
    }
}
