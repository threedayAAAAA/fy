
import { Mocker } from '../mocker/mocker';

/**
 * @param func
 * @returns {Mocker}
 */
export function apply(func: Function) {
  return new Mocker(func);
}
