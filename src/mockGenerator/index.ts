import type { Fn } from 'src/types';

import MockNumber from './number';
import MockString from './string';
import MockBoolean from './boolean';
import MockCustom from './common';
import { Logger } from 'src/util/logger';
import { POSITION } from './const';

const BaseMockFnMap = {
  ...MockNumber,
  ...MockString,
  ...MockNumber,
  ...MockBoolean,
  ...MockCustom,
};

const BaseMockFnKeys = Object.keys(BaseMockFnMap);

class MockGenerator {
  private mockFnMap: typeof BaseMockFnMap & { [key: string]: Fn } = {
    ...BaseMockFnMap,
  };

  /**
   * 判断自定义方法的key是否在内置规则内
   * @param key 自定义方法的key值
   * @returns 是否在内置的mock生成函数中
   */
  private isBuiltInMockGen(key: string) {
    const isisBuiltInMockGenKey = BaseMockFnKeys.includes(key);
    if (isisBuiltInMockGenKey) {
      Logger.warn(POSITION, `内置生成函数中已存在${key}方法，不允许覆盖，将被忽略`);
    }
    return isisBuiltInMockGenKey;
  }

  public registerMockGen(mockFuncs: Record<string, Fn>) {
    Object.keys(mockFuncs).forEach(key => {
      if (!this.isBuiltInMockGen(key)) {
        this.mockFnMap[key] = mockFuncs[key];
      }
    });
  }

  public getHandler(key: string) {
    return Object.entries(this.mockFnMap).find(([k]) => k.toUpperCase() === key.toUpperCase())?.[1];
  }
}

export default MockGenerator;
