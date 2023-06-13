import { Mocker } from '../src/mocker';
import { string } from '../src/lib/index';
import { describe, expect, it } from 'vitest';

describe('string', () => {
    it('应该返回一个Mocker实例', () => {
        const result = string();
        expect(result).toBeInstanceOf(Mocker);
      });
    it('应该返回一个字符串', () => {
      const mocker = string();
      const result = mocker.mock();
      expect(typeof result).toBe('string');
    });
  
    it('应该返回指定长度的字符串', () => {
      const mocker = string(5, 5);
      const result = mocker.mock();
      expect(result.length).toBe(5);
    });
  
    it('应该返回最小长度的字符串', () => {
      const mocker = string(5);
      const result = mocker.mock();
      expect(result.length).toBeGreaterThanOrEqual(5);
    });
  
    it('应该返回最大长度的字符串', () => {
      const mocker = string(undefined, 5);
      const result = mocker.mock();
      expect(result.length).toBeLessThanOrEqual(5);
    });

    it('当min小于0时，应该抛出错误', () => {
      expect(() => string(-1).mock()).toThrowError('参数必须大于等于0')
    });

    it('当参数为小数时，应该抛出错误', () => {
      expect(() => string(1.1, 2.2).mock()).toThrowError('参数必须为整数')
    })

    it('当min大于max时，应该抛出错误', () => {
      expect(() => string(10, 1).mock()).toThrowError('最小值不能大于最大值')
    });
  
    it('应该返回空字符串', () => {
      const mocker = string(0, 0);
      const result = mocker.mock();
      expect(result).toBe('');
    });
  });