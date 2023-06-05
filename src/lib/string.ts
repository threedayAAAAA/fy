import { randomString } from './random';
import { Mocker } from '../mocker/mocker';

/**
 * @param len
 * @returns {Mocker}
 */
export function string(len: number = 8) {
  return new Mocker(function () {
    return randomString(len);
  });
}