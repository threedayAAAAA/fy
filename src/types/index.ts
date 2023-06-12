export type SafeAny = any;

export interface Fn<TParams = SafeAny, TReturn = TParams> {
  (...arg: TParams[]): TReturn;
}

export type VKey = number | string | symbol;
