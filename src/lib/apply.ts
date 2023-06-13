
import { Mocker } from '../mocker.js';

/**
 * @param func
 * @returns {Mocker}
 */
export function apply(func: Function) {
  if (typeof func !== 'function') {
    throw new Error('func必须为函数')
  }
  return new Mocker(func);
}
