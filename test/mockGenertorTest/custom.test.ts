import { randomPhoneNumber, randomCid } from '../../src/mockGenerator/common';
import { it, expect, describe } from 'vitest';

const PRE_DIXS = [
  '130',
  '131',
  '132',
  '133',
  '134',
  '135',
  '136',
  '137',
  '138',
  '139',
  '150',
  '151',
  '152',
  '153',
  '155',
  '156',
  '157',
  '158',
  '159',
  '186',
  '187',
  '188',
  '189',
];

describe('randomPhoneNumber', () => {
  it('应该返回一个11位的字符串', () => {
    const result = randomPhoneNumber();
    expect(result).toHaveLength(11);
  });

  it('应该以1开头', () => {
    const result = randomPhoneNumber();
    expect(result.charAt(0)).toBe('1');
  });

  it('应该返回的手机号码前缀应该在预定义的前缀列表中', () => {
    const result = randomPhoneNumber();
    const prefix = result.substring(0, 3);
    expect(PRE_DIXS).toContain(prefix);
  });

  it('应该返回的手机号码后缀应该是8位数字', () => {
    const result = randomPhoneNumber();
    const suffix = result.substring(3);
    expect(suffix).toMatch(/^\d{8}$/);
  });
});

describe('randomCid', () => {
  it('应该是正确的身份证', () => {
    const result = randomCid();
    const reg = /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}[\dX]$/;
    expect(result.length).toEqual(18);
    expect(result).toMatch(reg);
  });
});
