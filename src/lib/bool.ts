import { randomBool } from './random/index.js';
import { Mocker } from '../mocker.js';

/**
 * boolean mocker.
 * @returns {Mocker}
 */
export function bool(rate: number) {
  return new Mocker(() => randomBool(rate));
}