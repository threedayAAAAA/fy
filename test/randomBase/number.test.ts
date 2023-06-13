import { describe, it, expect } from 'vitest';
import { integer, natural, float } from '../../src/randomBase/number';

describe('number', () => {
  describe('integer', () => {
    it('返回一个随机整数', () => {
      const result = integer(1, 10);
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(10);
    });

    it('当最小值大于最大值时，抛出错误', () => {
      expect(() => integer(10, 1)).toThrowError('最小值大于最大值');
    });

    it('当最小值和最大值相等时，返回该值', () => {
      const result = integer(1, 1);
      expect(result).toBe(1);
    });

    it('当不传入参数时，返回一个在安全整数范围内的随机整数', () => {
      const result = integer();
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(Number.MIN_SAFE_INTEGER);
      expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
    });
  });

  describe('natural', () => {
    it('返回一个随机自然数', () => {
        const result = natural(1, 10);
        expect(Number.isInteger(result)).toBe(true);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(10);
      });
  
      it('当最小值大于最大值时，抛出错误', () => {
        expect(() => natural(10, 1)).toThrowError('最小值大于最大值');
      });
  
      it('当最小值小于0时，抛出错误', () => {
        expect(() => natural(-1, 1)).toThrowError('最小值需要大于等于0');
      });
  
      it('当最小值和最大值相等时，返回该值', () => {
        const result = natural(1, 1);
        expect(result).toBe(1);
      });
  
      it('当不传入参数时，返回一个在自然数范围内的随机整数', () => {
        const result = natural();
        expect(Number.isInteger(result)).toBe(true);
        expect(result).toBeGreaterThanOrEqual(0);
        expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
      });
    });
  
    describe('float', () => {
        it('返回一个随机浮点数', () => {
          const result = float(1, 10, 2);
          expect(typeof result).toBe('number');
          expect(result).toBeGreaterThanOrEqual(1);
          expect(result).toBeLessThanOrEqual(11);
          expect(result.toString().split('.')[1].length).toBe(2);
        });
    
        it('当小数点位数小于0时，抛出错误', () => {
          expect(() => float(1, 10, -1)).toThrowError('小数点位不能小于0');
        });
    
        it('当不传入参数时，返回一个在安全整数范围内的随机浮点数', () => {
          const result = float();
          expect(typeof result).toBe('number');
          expect(result).toBeGreaterThanOrEqual(Number.MIN_SAFE_INTEGER);
          expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
          expect(result.toString().split('.')[1]).toBeUndefined();
        });
    });
});