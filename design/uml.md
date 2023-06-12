@startuml
class DataGenerator {
  - mockGen: MockGenerator
  + registerMockGen(mockFuncs: Record<string, Fn>): void
  + generateData(template: unknown, key: VKey = ''): unknown
  - genObject(template: Record<VKey, unknown>, rule: KeyRule): Record<VKey, unknown>
  - genArray(template: unknown[], rule: KeyRule): unknown[]
  - genNumber(template: number, rule: KeyRule): number
  - getPlaceholders(str: string): string[]
  - replacePlaceholders(beforeParseStr: string, placeholders: string[]): any
  - parsePlaceholder(placeholderStr: string): any
  - genString(template: string, rule: KeyRule): string
  - genBoolean(template: boolean, rule: KeyRule): boolean
}

class MockGenerator {
  - mockFnMap: typeof BaseMockFnMap & { [key: string]: Fn }
  + registerMockGen(mockFuncs: Record<string, Fn>): void
  + getHandler(key: string): Fn | undefined
  - isBuiltInMockGen(key: string): boolean
}

DataGenerator -> MockGenerator
MockGenerator -> BaseMockFnMap
@enduml