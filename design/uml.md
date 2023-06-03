@startuml
class MockGenerator {
  + string(poolStr: string): string
  + string(poolStr: string, min: number): string
  + string(min: number, max: number): string
  + string(poolStr: strin, min: number, max: number): string
  + character(poolStr: string): string
  + integer(min: number, max: number): number
  + natural(min: number, max: number): number
  + float(min: number, max: number): number
  + boolean(min: number, max: number): number
  + timestamp(start: Date | number | string, end: Date | number | string): number
  + date(farmat: string, start: Date | number | string, end: Date | number | string): string
  + customMockGen(mockFuncs: Record<string, Fn>): void
}

class CodeGenerator {
  + generateData(template: any, key?: string | number): any
  + genObject(template: object, rule: keyRule): object
  + genArray(template: any[], rule: keyRule): any[]
  + genString(template: string, rule: keyRule): any
  + genNumber(template: number, rule: keyRule): number
  + genBoolean(template: boolean, rule: keyRule): number
}

class TemplateParse {
  + parseKey(key?: string): keyRule
  + parsePlaceholder(placeholder: string): any
}

CodeGenerator --> TemplateParse
TemplateParse --> MockGenerator
@enduml