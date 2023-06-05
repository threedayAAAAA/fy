import { Mocker } from '../mocker/mocker';

/**
 * @param mockerObject
 * @returns {Mocker}
 */
export function shape(mockerObject: Record<string, Mocker>) {
  if (typeof mockerObject !== 'object')
    throw new Error('参数必须为对象');

  return new Mocker(function () {
    const r = {};
    for (const key in mockerObject) {
      r[key] = mockerObject[key].mock();
    }
    return r;
  });
}