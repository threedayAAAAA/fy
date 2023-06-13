import { Mocker } from '../mocker.js';

/**
 * 常量数值
 * @param v
 * @returns {Mocker}
 */
export function constant(v: any) {
  return new Mocker(() => v);
}
