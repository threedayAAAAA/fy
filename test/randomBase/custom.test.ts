import { describe, it, expect } from 'vitest';
import { idCard, phone, email, word, cword, oneof } from '../../src/randomBase/custom';
import { dict, POOLS } from '../../src/const';

describe('测试随机生成函数', () => {
  it('测试生成身份证号码', () => {
    const id = idCard();
    expect(id).toMatch(/^\d{6}\d{4}\d{2}\d{2}\d{4}$/);
  });

  it('测试生成手机号码', () => {
    const phoneNum = phone();
    expect(phoneNum).toMatch(/^\d{11}$/);
    const num = phone('number');
    expect(typeof num).toBe('number');
  });

  it('测试生成邮箱地址', () => {
    const emailAddr = email();
    expect(emailAddr).toMatch(/^[a-z0-9]+@[a-z0-9]+\.[a-z]+$/);
  });

  it('测试生成指定后缀邮箱地址', () => {
    const emailAddr = email('qq.com');
    expect(emailAddr).toMatch(/^[a-z0-9]+@qq.com$/);
  });

  it('测试生成随机长度的单词', () => {
    const cwordRandom = word();
    cwordRandom.split('').map(item =>{
      expect(POOLS.lower).toContain(item);
    })
    expect(cwordRandom.length).toBeGreaterThanOrEqual(6);
    expect(cwordRandom.length).toBeLessThanOrEqual(10);
  });

  it('测试生成指定长度的单词', () => {
    const word1 = word(5);
    expect(word1).toHaveLength(5);

    const word2 = word(10);
    expect(word2).toHaveLength(10);

    const word3 = word(20);
    expect(word3).toHaveLength(20);
  });

  it('测试生成指定长度范围的单词', () => {
    const word1 = word(5, 10);
    expect(word1.length).toBeGreaterThanOrEqual(5);
    expect(word1.length).toBeLessThanOrEqual(10);

    const word2 = word(10, 20);
    expect(word2.length).toBeGreaterThanOrEqual(10);
    expect(word2.length).toBeLessThanOrEqual(20);

    const word3 = word(20, 30);
    expect(word3.length).toBeGreaterThanOrEqual(20);
    expect(word3.length).toBeLessThanOrEqual(30);
  });

  it('测试生成指定长度的汉字', () => {
    const cword1 = cword(1);
    expect(cword1).toHaveLength(1);

    const cword2 = cword(2);
    expect(cword2).toHaveLength(2);

    const cword3 = cword(3);
    expect(cword3).toHaveLength(3);
  });

  it('测试生成随机长度的汉字', () => {
    const cwordRandom = cword();
    expect(dict).toContain(cwordRandom);
  });

  it('测试生成指定长度范围的汉字', () => {
    const cword1 = cword(1, 2);
    expect(cword1.length).toBeGreaterThanOrEqual(1);
    expect(cword1.length).toBeLessThanOrEqual(2);

    const cword2 = cword(2, 3);
    expect(cword2.length).toBeGreaterThanOrEqual(2);
    expect(cword2.length).toBeLessThanOrEqual(3);

    const cword3 = cword(3, 4);
    expect(cword3.length).toBeGreaterThanOrEqual(3);
    expect(cword3.length).toBeLessThanOrEqual(4);
  });

  it('测试生成指定汉字池的汉字', () => {
    const cword1 = cword('的');
    expect(cword1).toBe('的');

    const cword2 = cword('的一是');
    expect(cword2).toMatch(/^[的一是]$/);

    const cword3 = cword('的一是', 2);
    expect(cword3).toMatch(/^[的一是]{2}$/);

    const cword4 = cword('的一是', 2, 3);
    expect(cword4).toMatch(/^[的一是]{2,3}$/);
  });

  describe('oneof function', () => {
    it('should return one of the given arguments', () => {
      const result = oneof('apple', 'banana', 'orange');
      expect(['apple', 'banana', 'orange']).toContain(result);
    });

    it('should return undefined if no arguments are given', () => {
      const result = oneof();
      expect(result).toBeUndefined();
    });

    it('should always return one of the given arguments', () => {
      const args = ['a', 'b', 'c', 'd', 'e'];
      const results = new Set();
      for (let i = 0; i < 1000; i++) {
        const result = oneof(...args);
        results.add(result);
      }
      expect(results).toEqual(new Set(args));
    });
  });
});