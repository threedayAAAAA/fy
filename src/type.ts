export interface MockOptions {
  type?: string,
  len?: number,
  min?: number,
  max?: number,
  enum?: Array<number | string>,
  item?: MockOptions,
  properties?: MockOptions,
}

export type Pool = 'lower'|'upper'|'number'|'symbol';

export interface StringOption {
  len?: number,
  min?: number,
  max?: number,
  pool?: Pool
}