import type { SafeAny } from 'src/types';

type ValueType =
  | 'null'
  | 'array'
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function';

export function getType(value: SafeAny): ValueType {
  if (value === null) {
    return 'null';
  } else if (Array.isArray(value)) {
    return 'array';
  } else {
    return typeof value;
  }
}
