import { describe, it, expect } from 'vitest';

import { array } from '../../src/randomComplex/array';

describe('array', () => {
    it('should return an array with random length and string content if no arguments are provided', () => {
      const result = array();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result.length).toBeLessThanOrEqual(10);
      result.forEach((item) => {
        expect(typeof item).toBe('string');
      });
    });
  
    it('should return an array with the specified length and string content if only one argument is provided', () => {
      const result = array(5);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(5);
      result.forEach((item) => {
        expect(typeof item).toBe('string');
      });
    });

    it('should return an array with the specified length and string content if two argument is provided', () => {
        const result = array(2, 5);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThanOrEqual(2);
        expect(result.length).toBeLessThanOrEqual(5);
        result.forEach((item) => {
          expect(typeof item).toBe('string');
        });
    });

    it('should return an array with specified content with random length', () => {
        const result = array('@boolean()');
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThanOrEqual(1);
        expect(result.length).toBeLessThanOrEqual(10);
        result.forEach((item) => {
          expect(typeof item).toBe('boolean');
        });
    });
  
    it('should return an array with the specified length and content generator if two arguments are provided', () => {
      const result = array({ name: 'John' }, 3);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(3);
      result.forEach((item) => {
        expect(item).toEqual({ name: 'John' });
      });
    });
  
    it('should return an array with the specified length and content generator if three arguments are provided', () => {
      const result = array({ name: 'John' }, 2, 5);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThanOrEqual(2);
      expect(result.length).toBeLessThanOrEqual(5);
      result.forEach((item) => {
        expect(item).toEqual({ name: 'John' });
      });
    });

    describe('测试生成大量数据1000条', () => {
        it('生成一千条对象的数组', () => {
            const arrs = array({key: '@string()'} ,1000);
            expect(arrs).toHaveLength(1000);
        });
    });
});