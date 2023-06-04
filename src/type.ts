export interface MockOptions {
  type?: string,
  len?: number,
  min?: number,
  max?: number,
  enum?: Array<number | string>,
  item?: MockOptions,
  properties?: MockOptions,
}