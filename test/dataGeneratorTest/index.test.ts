import { it, expect, describe, beforeEach } from 'vitest';
import { DataGenerator } from '../../src/dataGenerator/index';

describe('DataGenerator', () => {
  let dataGenerator: DataGenerator;

  beforeEach(() => {
    dataGenerator = new DataGenerator();
  });

  describe('generateData', () => {
    it('应该在输入不是对象、数组、数字、字符串或布尔值时返回相同的值', () => {
      const input = null;
      const result = dataGenerator.generateData(input);
      expect(result).toEqual(input);
    });

    it('应该根据输入的模板生成对象', () => {
      const input = {
        name: 'John',
        age: 30,
        address: {
          city: 'New York',
          state: 'NY',
          zip: '10001',
        },
      };
      const result = dataGenerator.generateData(input);
      expect(result).toEqual(input);
    });

    it('应该根据输入的模板生成数组', () => {
      const input = [1, 2, 3];
      const result = dataGenerator.generateData(input);
      expect(result).toEqual(input);
    });

    it('应该根据输入的模板生成数字', () => {
      const input = 10;
      const result = dataGenerator.generateData(input);
      expect(result).toEqual(input);
    });

    it('应该根据输入的模板生成字符串', () => {
      const input = 'Hello, @name!';
      const result = dataGenerator.generateData(input);
      expect(typeof result).toBe('string');
    });

    it('应该根据输入的模板生成布尔值', () => {
      const input = true;
      const result = dataGenerator.generateData(input);
      expect(result).toEqual(input);
    });
  });

  describe('genObject', () => {
    it('应该根据输入的模板生成对象', () => {
      const input = {
        name: 'John',
        age: 30,
        address: {
          city: 'New York',
          state: 'NY',
          zip: '10001',
        },
      };
      const result = dataGenerator['genObject'](input, {});
      expect(result).toEqual(input);
    });

    it('应该根据输入的模板生成有限数量的属性的对象', () => {
      const input = {
        name: 'John',
        age: 30,
        address: {
          city: 'New York',
          state: 'NY',
          zip: '10001',
        },
      };
      const result = dataGenerator['genObject'](input, { count: 2 });
      expect(Object.keys(result).length).toBe(2);
    });
  });

  describe('genArray', () => {
    it('应该在输入的模板为空时生成一个空数组', () => {
      const input: unknown[] = [];
      const result = dataGenerator['genArray'](input, {});
      expect(result).toEqual([]);
    });

    it('应该根据输入的模板生成数组', () => {
      const input = [1, 2, 3];
      const result = dataGenerator['genArray'](input, {});
      expect(result).toEqual(input);
    });

    it('应该根据输入的模板生成有限数量的项的数组', () => {
      const input = [1, 2, 3];
      const result = dataGenerator['genArray'](input, { count: 2 });
      expect(result.length).toBe(6);
    });
  });

  describe('genNumber', () => {
    it('应该根据输入的模板生成数字', () => {
      const input = 10;
      const result = dataGenerator['genNumber'](input, {});
      expect(result).toEqual(input);
    });

    it('应该根据输入的模板生成指定范围内的随机数字', () => {
      const input = 10;
      const result = dataGenerator['genNumber'](input, { min: 1, max: 20 });
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(20);
    });

    it('应该根据输入的规则中的count属性生成数字', () => {
      const input = 10;
      const result = dataGenerator['genNumber'](input, { count: 5 });
      expect(result).toEqual(5);
    });
  });

  describe('genString', () => {
    it('应该根据输入的模板生成字符串', () => {
      const input = 'Hello, @name!';
      const result = dataGenerator['genString'](input, {});
      expect(typeof result).toBe('string');
    });

    it('应该根据输入的规则中的count属性生成重复模式的字符串', () => {
      const input = 'X';
      const result = dataGenerator['genString'](input, { count: 3 });
      expect(result).toEqual('XXX');
    });

    it('应该匹配到模板中的占位符', () => {
      const input = 'dffds@string("abc", 2)';
      const result = dataGenerator['genString'](input, {});
      expect(result).toMatch(/dffds[abc]{2}/);
      expect(result.length).toBe(7);
    });

    it('应该忽略到模板中的存在反义字符串的占位符', () => {
      const input = 'dffds\\@string("abc", 2)';
      const result = dataGenerator['genString'](input, {});
      expect(result).toBe('dffds@string("abc", 2)');
    });

    it('应该正确处理占位符的方法不在数据生成器', () => {
      const input = 'dffds@noExit("abc", 2)';
      const result = dataGenerator['genString'](input, {});
      expect(result).toBe('dffds@noExit("abc", 2)');
    });

    it('应该正确处理自定义的方法，直接放回空字符串', () => {
      const mockFuncs = {
        badMock: 777,
      };
      dataGenerator.registerMockGen(mockFuncs);
      const input = 'dffds@badMock("abc", 2)';
      const result = dataGenerator['genString'](input, {});
      expect(result).toBe('dffds');
    });

    it('应该正确处理模板为空的情况的方法，返回长度为0-100的随机字符串', () => {
      const input = '';
      const result = dataGenerator['genString'](input, {});
      expect(result.length).toBeGreaterThanOrEqual(0);
      expect(result.length).toBeLessThanOrEqual(100);
    });

    it('当模板只有单个占位符时，应该返回解析后的原始类型', () => {
      const input = '@bool';
      const result = dataGenerator['genString'](input, {});
      expect(result).toBeTypeOf('boolean');
    });
  });

  describe('genBoolean', () => {
    it('应该根据输入的模板生成布尔值', () => {
      const input = true;
      const result = dataGenerator['genBoolean'](input, {});
      expect(result).toEqual(input);
    });

    it('应该根据输入的规则中的count属性生成布尔值', () => {
      const input = true;
      const result = dataGenerator['genBoolean'](input, { count: 2 });
      expect(typeof result).toBe('boolean');
    });
  });

  describe('registerMockGen', () => {
    it('应该注册自定义数据生成函数', () => {
      const mockFuncs = {
        customMockFn: () => {},
      };
      dataGenerator.registerMockGen(mockFuncs);
      expect(dataGenerator['mockGen']['getHandler']('customMockFn')).toBe(mockFuncs.customMockFn);
    });
  });
});
