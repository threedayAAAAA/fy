import { randomFloat } from './random';
import { Mocker } from '../mocker/mocker';

/**
 * @param arr
 * @returns {Mocker}
 */
export function oneOf(arr: any[]) {
  if (!(arr instanceof Array) || arr.length === 0)
    throw new Error('参数不能为空');

  return new Mocker(function() {
    return arr[randomFloat(0, arr.length - 1)];
  });
}