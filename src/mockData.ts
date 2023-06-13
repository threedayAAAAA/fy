import { MockData, Generate, MockObject, MockArray } from '@/type'
import { isFunction, isNil, isObject, isString, isUndefined, sample } from 'lodash'
import { mockNumber, mockText, mockBoolean, mockDate } from './base'
import { MockDateClass, isOwnKeyof } from './utils'
import { textPools } from './const'

export class Mock implements MockData {
    private templateMap: Record<string, Generate<any>> = {
        ...mockText,
        ...mockNumber,
        ...mockBoolean,
        ...mockDate,

        string: this.string,
        number: this.number,
        boolean: this.boolean,
        time: this.time,
    }

    private get formatPatterRegex() {
        //转化成 匹配 /@(aFunc|bFunc)/
        return new RegExp(
            `@(${Object.keys(this.templateMap).join('|')})(?:\|\w+(?:-\w+)?)?(?:\|\w+)?`,
            'g',
        )
    }

    constructor(templateMap?: Record<string, () => any | string>) {
        if (templateMap) {
            Object.entries(templateMap).forEach(([key, func]) => this.define(key, func))
        }
    }

    string(length: number = 10, textPool = textPools.alpha): string {
        return mockText.text({
            min: length,
            max: length,
            textPool,
        })
    }

    number(min?: number, max?: number, toFixed = 0): number {
        if (isString(min) || isString(max)) {
            throw new TypeError('min和max应该是数字')
        }
        if (!isUndefined(min) && !isUndefined(max) && min > max) {
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

    template(template: string): any {
        //单个key特殊处理
        const maybeKey = template.split('@')[1]
        if (isOwnKeyof(this.templateMap, maybeKey)) {
            const func = this.templateMap[maybeKey] as Function | string
            return isFunction(func) ? func() : func
        }

        return template.replace(
            this.formatPatterRegex,
            ($0: string, p: string, ...params): string => {
                const func = this.templateMap[p] as Function | string
                return isFunction(func) ? func().toString() : func
            },
        )
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
        this.templateMap[name] = generator
    }
}
