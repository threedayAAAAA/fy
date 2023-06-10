import { it, expect, describe } from 'vitest';
import { character, string } from '../../src/mockGenerator/string';

describe('character函数', () => {
  it('应该从默认字符池中返回一个字符', () => {
    const result = character();
    expect(typeof result).toBe('string');
    expect(result.length).toBe(1);
    expect(/[a-zA-Z0-9!@#$%^&*()\[\]]/.test(result)).toBe(true);
  });

  it('应该从指定字符池中返回一个字符', () => {
    const result = character('abc');
    expect(result).toMatch(/[abc]/);
  });

  it('当字符池为空时，应该从默认字符池中返回一个字符', () => {
    const result = character('');
    expect(/[a-zA-Z0-9!@#$%^&*()\[\]]/.test(result)).toBe(true);
  });

  it('当字符池为单个字符时，应该返回该字符', () => {
    const result = character('a');
    expect(result).toBe('a');
  });

  it('当字符池为多个相同字符时，应该返回其中一个字符', () => {
    const result = character('aaa');
    expect(result).toMatch(/[a]/);
  });

  it('当字符池为多个不同字符时，应该返回其中一个字符', () => {
    const result = character('abc');
    expect(result).toMatch(/[abc]/);
  });
});

describe('string', () => {
  it('应该返回一个长度在0到100之间的随机字符串，当没有传入参数时', () => {
    const result = string();
    expect(result.length).toBeGreaterThanOrEqual(0);
    expect(result.length).toBeLessThanOrEqual(100);
  });

  it('应该返回一个长度在0到100之间的字符池内的随机字符串，当只传入poolStr参数为字符串时', () => {
    const result = string('abc');
    expect(result).toMatch(/[abc]/);
    expect(result.length).toBeGreaterThanOrEqual(0);
    expect(result.length).toBeLessThanOrEqual(100);
  });

  it('应该返回一个指定长度的随机字符串，当只传入poolStr参数为数字时', () => {
    const result = string(5);
    expect(result.length).equal(5);
  });

  it('应该返回一个长度为min的最小值的随机字符串，当传入poolStr和min参数时，且poolStr为字符串', () => {
    const result = string('abc', 2);
    expect(result.length).toBe(2);
  });

  it('应该返回一个长度为poolStr和min的最小值之间的随机字符串，当传入poolStr和min参数时，且poolStr为数字', () => {
    const result = string(3, 2);
    expect(result.length).toBeGreaterThanOrEqual(2);
    expect(result.length).toBeLessThanOrEqual(3);
  });

  it('应该返回一个长度在min和max之间的随机字符串，当传入poolStr、min和max参数时，且poolStr为字符串', () => {
    const result = string('abc', 2, 4);
    expect(result.length).toBeGreaterThanOrEqual(2);
    expect(result.length).toBeLessThanOrEqual(4);
  });

  it('应该返回一个长度在min和max之间的随机字符串，当传入poolStr、min和max参数时，且poolStr为数字', () => {
    const result = string(3, 2, 4);
    expect(result.length).toBeGreaterThanOrEqual(2);
    expect(result.length).toBeLessThanOrEqual(4);
  });

  it('应该返回一个长度在min和max之间的随机字符串，当传入poolStr、min和max参数时，且poolStr不为字符串', () => {
    const result = string(3, 2, 4);
    expect(result.length).toBeGreaterThanOrEqual(2);
    expect(result.length).toBeLessThanOrEqual(4);
  });
});
