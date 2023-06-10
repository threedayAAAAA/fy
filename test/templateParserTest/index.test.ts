import { parserKey, parsePlaceholder, parseArgs } from '../../src/templateParser/index';
import { it, expect, describe } from 'vitest';
import mockGenerator from '../../src/mockGenerator/index';

describe('parserKey', () => {
  it('应该返回正确的 KeyRule 对象', () => {
    const key1 = 'foo|1-10';
    const key2 = 'bar|5';
    const key3 = 'baz';
    const key4 = undefined;

    const result1 = parserKey(key1);
    const result2 = parserKey(key2);
    const result3 = parserKey(key3);
    const result4 = parserKey(key4);

    expect(result1).toEqual({
      keyName: 'foo',
      count: expect.any(Number),
      min: 1,
      max: 10,
    });
    expect(result2).toEqual({
      keyName: 'bar',
      count: 5,
      min: 5,
      max: undefined,
    });
    expect(result3).toEqual({
      keyName: 'baz',
      count: undefined,
      min: undefined,
      max: undefined,
    });
    expect(result4).toEqual({
      keyName: '',
      count: undefined,
      min: undefined,
      max: undefined,
    });
  });

  it('应该正确处理边界情况', () => {
    const key1 = '';
    const key2 = 'foo|bar|baz';
    const key3 = 'foo|1-';
    const key4 = 'foo|-10';

    const result1 = parserKey(key1);
    const result2 = parserKey(key2);
    const result3 = parserKey(key3);
    const result4 = parserKey(key4);

    expect(result1).toEqual({
      keyName: '',
      count: undefined,
      min: undefined,
      max: undefined,
    });
    expect(result2).toEqual({
      keyName: 'foo|bar|baz',
      count: undefined,
      min: undefined,
      max: undefined,
    });
    expect(result3).toEqual({
      keyName: 'foo',
      count: 1,
      min: 1,
      max: undefined,
    });
    expect(result4).toEqual({
      keyName: 'foo',
      count: -10,
      min: -10,
      max: undefined,
    });
  });
});

describe('parsePlaceholder', () => {
  it('应该正确解析占位符并返回对应的值', () => {
    const result = parsePlaceholder('@string');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThanOrEqual(0);
    expect(result.length).toBeLessThanOrEqual(100);
  });

  it('应该正确解析带参数的占位符并返回对应的值', () => {
    const result = parsePlaceholder('@integer(1, 10)');
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(11);
  });

  it('应该正确处理无效的占位符并返回原始字符串', () => {
    const result = parsePlaceholder('@invalid');
    expect(result).toBe('@invalid');
  });

  it('应该正常处理新增自定义mock, 非方法的情况', () => {
    mockGenerator.customMockGen({
      test: '1',
    });
    const result = parsePlaceholder('@test');
    expect(result).toBe('');
  });
});

describe('parseArgs', () => {
  it('应该能够正确解析参数字符串', () => {
    const str = '1, "hello", true';
    const expected = [1, 'hello', true];
    const result = parseArgs(str);
    expect(result).toEqual(expected);
  });

  it('应该能够正确处理空字符串', () => {
    const str = '';
    const expected = [];
    const result = parseArgs(str);
    expect(result).toEqual(expected);
  });

  it('应该能够正确处理只有一个参数的情况', () => {
    const str = '1';
    const expected = [1];
    const result = parseArgs(str);
    expect(result).toEqual(expected);
  });

  it('应该能够正确处理参数中包含逗号的情况', () => {
    const str = '1,2,3,4,5';
    const expected = [1, 2, 3, 4, 5];
    const result = parseArgs(str);
    expect(result).toEqual(expected);
  });

  it('应该能够正确处理参数中包含引号的情况', () => {
    const str = '"hello", "world"';
    const expected = ['hello', 'world'];
    const result = parseArgs(str);
    expect(result).toEqual(expected);
  });

  it('应该能够正确处理参数中包含方括号的情况', () => {
    const str = '[1,2,3], [4,5,6]';
    const expected = [
      [1, 2, 3],
      [4, 5, 6],
    ];
    const result = parseArgs(str);
    expect(result).toEqual(expected);
  });

  it('应该能够正确处理参数中包含花括号的情况', () => {
    const str = '{ "name": "Alice", "age": 30 }, { "name": "Bob", "age": 40 }';
    const expected = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 40 },
    ];
    const result = parseArgs(str);
    expect(result).toEqual(expected);
  });

  it('应该能够正确处理参数中包含换行符的情况', () => {
    const str = '1,\n2,\n3';
    const expected = [1, 2, 3];
    const result = parseArgs(str);
    expect(result).toEqual(expected);
  });

  it('应该能够正确处理参数中包含制表符的情况', () => {
    const str = '1,\t2,\t3';
    const expected = [1, 2, 3];
    const result = parseArgs(str);
    expect(result).toEqual(expected);
  });

  it('应该能够正确处理参数中包含回车符的情况', () => {
    const str = '1,\r2,\r3';
    const expected = [1, 2, 3];
    const result = parseArgs(str);
    expect(result).toEqual(expected);
  });

  it('应该能够正确处理参数中包含非法字符的情况', () => {
    const str = '1,2,3,4,5,6,7,8,9,0,@,#,$,%';
    const expected = [];
    const result = parseArgs(str);
    expect(result).toEqual(expected);
  });
});
