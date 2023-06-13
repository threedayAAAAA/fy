import { randomNumber } from './random/index.js';
import { Mocker } from '../mocker.js';

/**
 * 生成number
 * @param min
 * @param max
 * @param fixed
 * @returns {Mocker}
 */
export function number(min?: number, max?: number, fixed?: number) {
  return new Mocker(function () {
    return randomNumber(min, max, fixed);
  });
}
