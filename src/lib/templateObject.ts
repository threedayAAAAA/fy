import { Mocker } from '../mocker.js';

/**
 * 生成对象
 * @param mockerObject
 * @returns {Mocker}
 */
export function templateObject(mockerObject: Record<string, Mocker>) {
  return new Mocker(function () {
    const r :Record<string, Mocker> = {};
    for (const key in mockerObject) {
      if (!(mockerObject[key] instanceof Mocker)) {
        throw new Error('属性值必须为 Mocker 实例');
      }
      r[key] = mockerObject[key].mock();
    }
    return r;
  });
}