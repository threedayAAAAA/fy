import MockNumber from './number';
import MockString from './string';
import MockBoolean from './boolean';
import MockCustom from './custom';

const mockGenerator: Record<string, any> = {
  ...MockNumber,
  ...MockString,
  ...MockNumber,
  ...MockBoolean,
  ...MockCustom,
  customMockGen,
};

/**
 * 加入自定义生成mock的方法
 * @param mockFuncs 自定义生成mock的方法
 */
function customMockGen(mockFuncs: Record<string, Fn>) {
  Object.keys(mockFuncs).forEach(key => {
    mockGenerator[key] = mockFuncs[key];
  });
}

export default mockGenerator;
