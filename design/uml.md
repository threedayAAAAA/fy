@startuml
class MockGenerator {
  + boolean(min: number, max: number): number
  + timestamp(start: Date | number | string, end: Date | number | string): number
  + date(farmat: string, start: Date | number | string, end: Date | number | string): string
  + customMockGen(mockFuncs: Record<string, Fn>): void
}

class DataGenerator {
  + static generateData(template: any, key?: string | number): any
  - static genObject(template: object, rule: keyRule): object
  - static genArray(template: any[], rule: keyRule): any[]
  - static genString(template: string, rule: keyRule): any
  - static genNumber(template: number, rule: keyRule): number
  - static genBoolean(template: boolean, rule: keyRule): number
}

class TemplateParse {
  + parseKey(key?: string): keyRule
  + parsePlaceholder(placeholder: string): any
}

DataGenerator --> TemplateParse
DataGenerator --> MockGenerator
@enduml