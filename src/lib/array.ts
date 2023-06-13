import { randomNumber } from './random/index.js';
import { Mocker } from '../mocker.js';

/**
 * 生成数组
 * @param mocker
 * @param min
 * @param max
 * @returns {Mocker}
 */
export function array(mocker: Mocker, min: number = 20, max: number = 20) {
  if (min < 0 ) {
    throw new Error('参数必须大于等于0')
  }
  return new Mocker(function () {
    return new Array(randomNumber(min, max)).fill(0).map(() => mocker.mock());
  });
}