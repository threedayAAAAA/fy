import { describe, it, expect } from 'vitest';
import { character, string } from '../../src/randomBase/string';

describe('测试随机字符串生成函数', () => {
  it('测试默认生成随机字符串', () => {
    const result = string();
    expect(result.length).toBeGreaterThanOrEqual(6);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('测试指定长度生成随机字符串', () => {
    const result = string(10);
    expect(result.length).toBe(10);
  });

  it('测试指定长度和字符池生成随机字符串', () => {
    const result = string('lower', 10);
    expect(result.length).toBe(10);
    expect(result).toMatch(/^[a-z]{10}$/);
  });

  it('测试指定长度范围和字符池生成随机字符串', () => {
    const result = string('upper', 5, 10);
    expect(result.length).toBeGreaterThanOrEqual(5);
    expect(result.length).toBeLessThanOrEqual(10);
    expect(result).toMatch(/^[A-Z]{5,10}$/);
  });

  it('测试字符池中不存在的字符', () => {
    const result = character('invalid');
    expect(result.length).toBe(1);
    expect('invalid').toContain(result);
  });

  it('测试字符池为空', () => {
    const result = character('');
    expect(result.length).toBe(1);
    expect(result).toMatch(/[a-zA-Z0-9!@#$%^&*()\[\]]/);
  });

  it('测试字符池为 undefined', () => {
    const result = character(undefined);
    expect(result.length).toBe(1);
    expect(result).toMatch(/[a-zA-Z0-9!@#$%^&*()\[\]]/);
  });
  it('当不传参数时，返回长度为6-10位之间的随机字符串', () => {
    const result = string();
    expect(result.length).toBeGreaterThanOrEqual(6);
    expect(result.length).toBeLessThanOrEqual(10);
  });

  it('当传入数字参数时，返回指定长度的随机字符串', () => {
    const result = string(10);
    expect(result.length).toBe(10);
  });

  it('当传入数字参数和最小长度参数时，返回指定长度范围内的随机字符串', () => {
    expect(() => string(10, 5)).toThrowError('最小值大于最大值');
  });

  it('当传入字符串参数、最小长度参数和最大长度参数时，返回指定长度范围内的随机字符串', () => {
    const result = string('abc', 5, 8);
    expect(result.length).toBeGreaterThanOrEqual(5);
    expect(result.length).toBeLessThanOrEqual(8);
    expect(result).toMatch(/[abc]+/);
  });

  it('当传入字符串参数时，返回指定字符集中的随机字符串', () => {
    const result = string('abc');
    expect(result).toMatch(/[abc]+/);
  });

  it('当传入不存在的字符集参数时，返回默认字符集中的随机字符串', () => {
    const result = string('xyz');
    expect(result).toMatch(/[a-zA-Z0-9]+/);
  });
});