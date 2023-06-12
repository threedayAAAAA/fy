import { it, expect, describe, beforeEach } from 'vitest';
import MockGenerator from '../../src/mockGenerator';

const EMPTY_FN = () => {};

describe('MockGenerator', () => {
  let mockGenerator: MockGenerator;

  beforeEach(() => {
    mockGenerator = new MockGenerator();
  });

  describe('registerMockGen', () => {
    it('应该将自定义方法注册到 mockFnMap 中', () => {
      const mockFuncs = {
        customMockFn: EMPTY_FN,
      };
      mockGenerator.registerMockGen(mockFuncs);
      expect(mockGenerator.getHandler('customMockFn')).toBe(mockFuncs.customMockFn);
    });

    it('如果自定义方法的 key 在内置规则中，应该忽略该方法', () => {
      const mockFuncs = {
        string: EMPTY_FN,
      };
      mockGenerator.registerMockGen(mockFuncs);
      expect(mockGenerator.getHandler('string')).not.toBe(mockFuncs.string);
    });
  });

  describe('getHandler', () => {
    it('应该返回 mockFnMap 中对应 key 的方法', () => {
      const mockFuncs = {
        customMockFn: EMPTY_FN,
      };
      mockGenerator.registerMockGen(mockFuncs);
      expect(mockGenerator.getHandler('customMockFn')).toBe(mockFuncs.customMockFn);
    });

    it('如果找不到对应 key 的方法，应该返回 undefined', () => {
      expect(mockGenerator.getHandler('nonexistentKey')).toBeUndefined();
    });

    it('应该忽略 key 的大小写', () => {
      const mockFuncs = {
        customMockFn: EMPTY_FN,
      };
      mockGenerator.registerMockGen(mockFuncs);
      expect(mockGenerator.getHandler('CUSTOMMOCKFN')).toBe(mockFuncs.customMockFn);
    });
  });
});
