import { isFunction } from 'lodash'
import { mockBoolean, mockDate, mockNumber, mockText } from './base'
import { Generate, MockTemplateType } from './type/mockData'
export class MockTemplate implements MockTemplateType {
    public templateMap: Record<string, Generate<any>> = {}
    public get formatPatterRegex() {
        return new RegExp(`@(${Object.keys(this.templateMap).join('|')})(?:\\|([\\w,-]+))*`, 'g')
    }
    public define<T>(name: string, generator: Generate<T>): void {
        this.templateMap[name] = generator
    }
    constructor(templateMap: Record<string, Generate<any>> = {}) {
        Object.entries(templateMap).forEach(([key, func]) => this.define(key, func))
    }

    private runFunc = (allString: string, funcKey: string) => {
        const func = this.templateMap[funcKey]
        const funcParams = allString.split(`${funcKey}|`)[1]?.split('|') || []
        return isFunction(func) ? func(...funcParams) : func
    }

    public judgeRawData(template: string): boolean {
        if (this.formatPatterRegex.test(template)) {
            const [[allString, funcKey]] = [...template.matchAll(this.formatPatterRegex)]
            if (allString === template) {
                return true
            }
        }
        return false
    }

    public templateRaw(template: string): any {
        const [[allString, funcKey]] = [...template.matchAll(this.formatPatterRegex)]
        return this.runFunc(allString, funcKey)
    }

    public templateString(template: string): string {
        return template.replace(
            this.formatPatterRegex,
            (allString: string, funcKey: string): string => this.runFunc(allString, funcKey),
        )
    }
    public template(template: string): any {
        return this.judgeRawData(template)
            ? this.templateRaw(template)
            : this.templateString(template)
    }
}
