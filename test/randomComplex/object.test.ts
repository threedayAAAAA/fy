import { describe, it, expect } from 'vitest';

import { object } from '../../src/randomComplex/object';

describe('object', () => {
  it('should return an empty object if no arguments are provided', () => {
    const result = object();
    expect(typeof result).toBe('object');
    expect(Object.keys(result).length).toBe(0);
  });

  it('should generate an object with random properties and string content if an object with no range is provided', () => {
    const result = object({ name: '@string()', age: '@natural()'});
    expect(typeof result).toBe('object');
    expect(Object.keys(result).length).toBe(2);
    expect(typeof result.name).toBe('string');
    expect(typeof result.age).toBe('number');
  });
  it('should generate an object with properties and content generator if an object with range is provided', () => {
    const result = object({ 'name|2-5': '@string(2,5)', 'age|1-10': '@natural(1,10)' });
    expect(typeof result).toBe('object');
    expect(Object.keys(result).length).toBe(2);
    expect(Array.isArray(result.name)).toBe(true);
    expect(result.name.length).toBeGreaterThanOrEqual(2);
    expect(result.name.length).toBeLessThanOrEqual(5);
    result.name.forEach((item: string) => {
      expect(typeof item).toBe('string');
    });
    expect(Array.isArray(result.age)).toBe(true);
    expect(result.age.length).toBeGreaterThanOrEqual(1);
    expect(result.age.length).toBeLessThanOrEqual(10);
    result.age.forEach((item: number) => {
      expect(typeof item).toBe('number');
    });
  });
});