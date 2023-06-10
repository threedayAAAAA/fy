import { it, expect, describe } from 'vitest';
import { genObject, genArray, genBoolean, genNumber, genString } from '../../src/codeGenerator/index';

const BASE_OBJECT_TEMP = {
  name: 'string',
  age: 1,
  arr: [],
  sex: true,
};

describe('genObject', () => {
  it('正常情况', () => {
    const rule = {
      count: 2,
      keyName: 'string',
    };
    const result = genObject(BASE_OBJECT_TEMP, rule);
    expect(Object.keys(result)).toHaveLength(2);
    result.name && expect(typeof result.name).toBe('string');
    result.age && expect(typeof result.age).toBe('number');
    result.arr && expect(typeof result.arr).toBe('array');
    result.sex && expect(typeof result.sex).toBe('boolean');
  });

  it('应该返回空对象，模板为空对象', () => {
    const template = {};
    const rule = {
      count: 1,
      keyName: 'string',
    };
    const result = genObject(template, rule);
    expect(Object.keys(result)).toHaveLength(0);
  });

  it('应该整个对象返回，生成规则count为空', () => {
    const rule = {
      keyName: 'string',
    };
    const result = genObject(BASE_OBJECT_TEMP, rule);
    expect(Object.keys(result)).toHaveLength(4);
    expect(typeof result.name).toBe('string');
    expect(typeof result.age).toBe('number');
    expect(typeof result.arr).toBe('object');
    expect(typeof result.sex).toBe('boolean');
  });

  it('应该返回一个正常放回，模板中存在非基本类型的值', () => {
    const template = {
      ...BASE_OBJECT_TEMP,
      address: {
        city: 'string',
        street: 'string',
      },
    };
    const rule = {
      count: 5,
      keyName: 'string',
    };
    const result = genObject(template, rule);
    expect(Object.keys(result)).toHaveLength(5);
    expect(typeof result.name).toBe('string');
    expect(typeof result.age).toBe('number');
    expect(typeof result.arr).toBe('object');
    expect(typeof result.sex).toBe('boolean');
    expect(typeof result.address).toBe('object');
  });
});

describe('genArray', () => {
  it('应该返回一个空数组，当传入的模板数组为空', () => {
    const template = [];
    const rule = {
      keyName: 'string',
      count: 1,
    };
    const result = genArray(template, rule);
    expect(result).toEqual([]);
  });

  it('应该返回一个包含一个元素的数组，当传入的模板数组包含一个元素，且 count 为 undefined', () => {
    const template = [1];
    const rule = {
      keyName: 'string',
    };
    const result = genArray(template, rule);
    expect(result).toEqual([1]);
  });

  it('应该返回一个包含 count 个元素的数组，当传入的模板数组包含一个元素，且 count 为一个正整数', () => {
    const template = [1];
    const rule = {
      keyName: 'string',
      count: 3,
    };
    const result = genArray(template, rule);
    expect(result).toEqual([1, 1, 1]);
  });

  it('应该返回一个包含 count * 模板数组长度 个元素的数组，当传入的模板数组包含多个元素，且 count 为一个正整数', () => {
    const template = [1, 2];
    const rule = { count: 2, keyName: 'string' };
    const result = genArray(template, rule);
    expect(result).toEqual([1, 2, 1, 2]);
  });
});

describe('genNumber函数', () => {
  it('应该返回模板值，当min和max都未定义时', () => {
    const template = 42;
    const rule = { count: 5, keyName: 'string' };
    expect(genNumber(template, rule)).toEqual(5);
  });

  it('应该返回一个随机数，当min和max都已定义时', () => {
    const template = 42;
    const rule = { min: 0, max: 100, keyName: 'string' };
    const result = genNumber(template, rule);
    expect(result).toBeGreaterThanOrEqual(rule.min);
    expect(result).toBeLessThanOrEqual(rule.max);
  });

  it('应该返回count，当count已定义且min和max都未定义时', () => {
    const template = 42;
    const rule = { count: 5, keyName: 'string' };
    expect(genNumber(template, rule)).toEqual(rule.count);
  });

  it('应该返回count，当min已定义但max未定义时', () => {
    const template = 42;
    const rule = { min: 5, count: 5, keyName: 'string' };
    expect(genNumber(template, rule)).toEqual(rule.count);
  });

  it('应该返回count，当max已定义但min未定义时', () => {
    const template = 42;
    const rule = { max: 100, count: 5, keyName: 'string' };
    expect(genNumber(template, rule)).toEqual(rule.count);
  });
});

describe('genString', () => {
  it('应该正确地替换所有占位符', () => {
    const template = 'test,@string(3, 8)';
    const rule = { count: 1, keyName: 'string' };
    const result = genString(template, rule);
    const reg = /^test,[a-zA-Z0-9!@#$%^&*()\[\]]{3,8}/;
    expect(result).match(reg);
  });

  it('应该正确地处理没有占位符的情况', () => {
    const template = '这是一个没有占位符的字符串。';
    const rule = { count: 2, keyName: 'string' };
    const result = genString(template, rule);
    expect(result).toEqual(template.repeat(rule.count));
  });

  it('应该正确地处理多个占位符的情况', () => {
    const template = 'test,@string(3, 8),@natural(2, 10)';
    const rule = { count: 1, keyName: 'string' };
    const result = genString(template, rule);
    const reg = /^test,[a-zA-Z0-9!@#$%^&*()\[\]]{3,8},\d+$/;
    expect(result).toMatch(reg);
  });

  it('应该正确地处理转义符', () => {
    const template = '这是一个转义符\\@AA的字符串。';
    const rule = { keyName: 'string' };
    const result = genString(template, rule);
    const expected = '这是一个转义符@AA的字符串。';
    expect(result).toEqual(expected);
  });

  it('应该正确地处理没有规则的占位符', () => {
    const template = '这是一个没有规则的占位符@foo。';
    const rule = { count: 4, keyName: 'string' };
    const result = genString(template, rule);
    const expected = '这是一个没有规则的占位符@foo。'.repeat(rule.count);
    expect(result).toEqual(expected);
  });

  it('应该正确地处理mock生成器中没有的占位符', () => {
    const template = '这是一个没有参数的占位符@bar。';
    const rule = { count: 5, keyName: 'string' };
    const result = genString(template, rule);
    const expected = '这是一个没有参数的占位符@bar。'.repeat(rule.count);
    expect(result).toEqual(expected);
  });

  it('应该正确地处理空字符串，但有count的情况', () => {
    const template = '';
    const rule = { count: 6, keyName: 'string' };
    const result = genString(template, rule);
    expect(typeof result).toEqual('string');
    expect(result.length).toEqual(rule.count);
  });

  it('应该正确地处理空字符串，但无count的情况', () => {
    const template = '';
    const rule = { keyName: 'string' };
    const result = genString(template, rule);
    expect(result).toEqual('');
  });
});

describe('genBoolean', () => {
  it('应该返回传入的模板值，因为没有传入生成规则', () => {
    const template = true;
    const rule = { keyName: 'string' };
    const result = genBoolean(template, rule);
    expect(result).toBe(template);
  });

  it('应该返回生成规则中指定的布尔值', () => {
    const template = true;
    const rule = { count: 0, keyName: 'string' };
    const result = genBoolean(template, rule);
    expect(result).toBe(false);
  });

  it('应该返回生成规则中指定的布尔值，即使传入的模板值为undefined', () => {
    const template = true;
    const rule = { count: 30, keyName: 'string' };
    const result = genBoolean(template, rule);
    expect(typeof result).toBe('boolean');
  });
});
