import { Mocker } from '../src/mocker';
import { number } from '../src/lib/index';
import { describe, expect, it } from 'vitest';

describe('number函数', () => {
    it('应该返回一个Mocker实例', () => {
      const result = number();
      expect(result).toBeInstanceOf(Mocker);
    });
  
    it('应该返回一个在指定范围内的随机数', () => {
      const result = number(1, 10).mock();
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
    });
  
    it('当只传入一个参数时，应该返回一个在Number.MAX_SAFE_INTEGER到该参数之间的随机数', () => {
      const result = number(5).mock();
      expect(result).toBeGreaterThanOrEqual(5);
      expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
    });
  
    it('当传入fixed参数时，应该返回一个指定小数位数的随机数', () => {
      const result = number(1, 10, 2).mock();
      const decimalPlaces = (result.toString().split('.')[1] || '').length;
      expect(decimalPlaces).toBe(2);
    });
  
    it('当不传入参数时，应该返回Number.MIN_SAFE_INTEGER和Number.MAX_SAFE_INTEGER之间的随机数', () => {
      const result = number().mock();
      expect(result).toBeGreaterThanOrEqual(Number.MIN_SAFE_INTEGER);
      expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
    });

    it('当min大于max时，应该抛出错误', () => {
        expect(() => number(10, 1).mock()).toThrowError('最小值不能大于最大值')
    });

    it('当参数为小数时，应该抛出错误', () => {
      expect(() => number(1.1, 2.2).mock()).toThrowError('参数必须为整数')
    })
  });