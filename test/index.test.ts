import { describe, it, expect } from 'vitest';

import Mock from '../src/index';

describe('Mock', () => {
  it('should return the same value if the input is not a string or an object', () => {
    expect(Mock.mock(123)).toBe(123);
    expect(Mock.mock(true)).toBe(true);
    expect(Mock.mock(null)).toBe(null);
    expect(Mock.mock(undefined)).toBe(undefined);
  });

  it('should return an array if the input is an array', () => {
    const arr = [1, 2, 3];
    expect(Mock.mock(arr)).toEqual(arr);
  });

  it('should return an object if the input is an object', () => {
    const obj = { name: 'John', age: 30 };
    expect(Mock.mock(obj)).toEqual(obj);
  });

  it('should generate a random value based on the template string', () => {
    const template = '@natural(1, 10)';
    const result = Mock.mock(template);
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(1);
    expect(result).toBeLessThanOrEqual(10);
  });
});

describe('json to mock', () => {
    it('读取json模板文件生成对应mock数据', () => {
        const json = `{
            "name": "@string(upper,10)",
            "age": "@natural(0,100)",
            "isMale": "@boolean()",
            "phone": "@phone()",
            "email": "@email()",
            "hobbies|3": "@string(5)"
          }`;
        const result = Mock.jsonToMock(json);
        expect(typeof result).toBe('object');
        expect(Object.keys(result).length).toBe(6);
        expect(typeof result.name).toBe('string');
        expect(result.name.length).toBe(10);
        expect(typeof result.age).toBe('number');
        expect(result.age).toBeGreaterThanOrEqual(0);
        expect(result.age).toBeLessThanOrEqual(100);
        expect(typeof result.isMale).toBe('boolean');
        expect(typeof result.phone).toBe('string');
        expect(result.phone).toMatch(/^1\d{10}$/);
        expect(result.phone).toMatch(/^1\d{10}$/);
        expect(typeof result.email).toBe('string');
        expect(result.email).toMatch(/^\w+@\w+\.\w+$/);
        expect(Array.isArray(result.hobbies)).toBe(true);
        expect(result.hobbies.length).toBe(3);
        result.hobbies.forEach((item: any) => {
        expect(typeof item).toBe('string');
        expect(item.length).toBe(5);
        });
    });
});

describe('插入自定义方法', () => {
    it('extend方法验证', () => {
        Mock.extend('uuid', (val: number) => val + 1)
        const val = Mock.mock('@uuid(1)');
        expect(val).toBe(2);
    });

    it('extend方法修改已有方法报错', () => {
        expect(() => Mock.extend('string', (val: number) => val + 1)).toThrowError('不可覆盖已定义方法');
    });
});