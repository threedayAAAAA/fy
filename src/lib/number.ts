import { randomFloat } from './random';
import { Mocker } from '../mocker/mocker';

/**
 * @param min
 * @param max
 * @param fixed
 * @returns {Mocker}
 */
export function number(min: number, max?: number, fixed?: number) {
  max = max || min;
  return new Mocker(function () {
    return randomFloat(min, max!, fixed);
  });
}
