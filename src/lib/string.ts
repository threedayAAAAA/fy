import { randomString } from './random/index.js';
import { Mocker } from '../mocker.js';

/**
 * 生成字符串
 * @param min
 * @param max
 * @returns {Mocker}
 */
export function string(min?:number, max?: number) {
  return new Mocker(function () {
    return randomString(min, max);
  });
}