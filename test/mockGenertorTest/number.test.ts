import { it, expect, describe } from 'vitest';
import { transformMinAndMax, random, randomInt, natural, randomfloat } from '../../src/mockGenerator/number';

describe('transformMinAndMax', () => {
  it('应该正确转换最小值和最大值', () => {
    expect(transformMinAndMax(1, 10)).toEqual([1, 10]);
    expect(transformMinAndMax(1.5, 10.5, true)).toEqual([1.5, 10.5]);
  });

  it('应该抛出错误，当最小值或最大值不是数字', () => {
    expect(() => transformMinAndMax('a', 10)).toThrowError();
    expect(() => transformMinAndMax(1, 'b')).toThrowError();
    expect(() => transformMinAndMax('a', 'b')).toThrowError();
  });

  it('应该抛出错误，当最大值小于最小值', () => {
    expect(() => transformMinAndMax(10, 1)).toThrowError();
  });
});

describe('random', () => {
  it('应该返回介于最小值和最大值之间的随机整数', () => {
    const result = random(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
    expect(Number.isInteger(result)).toBe(true);
  });

  it('当最小值等于最大值时，应该返回该值', () => {
    const result = random(5, 5);
    expect(result).toBe(5);
  });
});

describe('integer', () => {
  it('应该返回一个介于最小值和最大值之间的整数', () => {
    const result = randomInt(1, 10);
    expect(Number.isInteger(result)).toBe(true);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });

  it('当最小值和最大值为Number.MIN_SAFE_INTEGER和Number.MAX_SAFE_INTEGER时，应该返回一个介于最小值和最大值之间的整数', () => {
    const result = randomInt(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    expect(Number.isInteger(result)).toBe(true);
    expect(result).toBeGreaterThanOrEqual(Number.MIN_SAFE_INTEGER);
    expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
  });

  it('当最小值和最大值为Number.MIN_VALUE和Number.MAX_VALUE时，应该返回一个介于最小值和最大值之间的整数', () => {
    const result = randomInt(Number.MIN_VALUE, Number.MAX_VALUE);
    expect(Number.isInteger(result)).toBe(true);
    expect(result).toBeGreaterThanOrEqual(Number.MIN_VALUE);
    expect(result).toBeLessThanOrEqual(Number.MAX_VALUE);
  });

  it('当最小值和最大值为非数字时，应该抛出错误', () => {
    expect(() => randomInt('a', 'b')).toThrow();
  });
});

describe('natural', () => {
  it('应该返回一个介于最小值和最大值之间的自然数', () => {
    const result = natural(1, 10);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });

  it('当最小值和最大值都为负数时，应该返回一个介于最小值的绝对和最大值的绝对之间的自然数', () => {
    const result = natural(-10, -1);
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });

  it('当最小值和最大值都为0时，应该返回0', () => {
    const result = natural(0, 0);
    expect(result).toBe(0);
  });
});

describe('float', () => {
  it('应该返回一个浮点数', () => {
    const result = randomfloat(0, 10);
    expect(typeof result).toBe('number');
  });

  it('应该返回一个在指定范围内的浮点数', () => {
    const result = randomfloat(0, 10);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(10);
  });

  it('当min和max为字符串时，应该报错', () => {
    expect(() => randomfloat('0', '10')).toThrow();
  });

  it('当min和max为Number.MIN_SAFE_INTEGER和Number.MAX_SAFE_INTEGER时，应该返回一个安全的浮点数', () => {
    const result = randomfloat(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
    expect(result).toBeGreaterThanOrEqual(Number.MIN_SAFE_INTEGER);
    expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
  });

  it('当min和max为Infinity时，应该返回Infinity', () => {
    const result = randomfloat(-Infinity, Infinity);
    expect(typeof result).toBe('number');
  });

  it('当min和max为NaN时，应该报错', () => {
    expect(() => randomfloat(NaN, NaN)).toThrowError();
  });
});
