import { randomNumber } from './random/index.js';
import { Mocker } from '../mocker.js';

/**
 * 
 * @param arr
 * @returns {Mocker}
 */
export function oneOf(arr: any[]) {
  if (!(arr instanceof Array) || arr.length === 0)
    throw new Error('参数必须为数组且不能为空');

  return new Mocker(function() {
    return arr[randomNumber(0, arr.length - 1)];
  });
}