import { parserKey, parseArgs } from '../../src/templateParser/index';
import { it, expect, describe } from 'vitest';

describe('parserKey', () => {
  it('应该正确解析键名', () => {
    const key = 'foo|1-3';
    const expected = {
      keyName: 'foo',
      count: expect.any(Number),
      min: 1,
      max: 3,
    };
    const result = parserKey(key);
    expect(result).toEqual(expected);
  });

  it('应该正确处理没有范围的键名', () => {
    const key = 'bar';
    const expected = {
      keyName: 'bar',
    };
    const result = parserKey(key);
    expect(result).toEqual(expected);
  });

  it('应该正确处理没有计数的键名', () => {
    const key = 'baz|10-';
    const expected = {
      count: 10,
      keyName: 'baz',
      min: 10,
      max: undefined,
    };
    const result = parserKey(key);

    expect(result).toEqual(expected);
  });

  it('应该正确处理计数为0的键名', () => {
    const key = 'qux|0-0';
    const expected = {
      keyName: 'qux',
      count: 0,
      min: 0,
      max: 0,
    };
    const result = parserKey(key);
    expect(result).toEqual(expected);
  });

  it('应该正确处理无效的键名', () => {
    const key = null;
    const expected = {
      keyName: null,
    };
    const result = parserKey(key);
    expect(result).toEqual(expected);
  });

  it('应该正确处理无效的规则', () => {
    const key = 'qux|dfsa';
    const expected = {
      keyName: key,
    };
    const result = parserKey(key);
    expect(result).toEqual(expected);
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
