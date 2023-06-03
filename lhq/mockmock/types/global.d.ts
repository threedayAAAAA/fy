declare global {
  interface Fn<TParams = SafeAny, TReturn = TParams> {
    (...arg: TParams[]): TReturn;
  }
}

export {};
