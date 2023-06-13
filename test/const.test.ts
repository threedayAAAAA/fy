import { Mocker } from '../src/mocker';
import { constant } from '../src/lib/index';
import { describe, expect, it } from 'vitest';

describe('常量数值函数', () => {
    it('应该返回一个 result 实例对象', () => {
        const result = constant(42);
        expect(result).toBeInstanceOf(Mocker);
    });
});

describe('常量数值函数', () => {
    it('应该能够正确处理 null 值', () => {
        const result = constant(null).mock();
        expect(result).toBeNull();
    });

    it('应该能够正确处理 undefined 值', () => {
        const result = constant(undefined).mock();
        expect(result).toBeUndefined();
    });

    it('应该能够正确处理字符串类型的常量', () => {
        const result = constant('hello').mock();
        expect(result).toBe('hello');
    });

    it('应该能够正确处理数字类型的常量', () => {
        const result = constant(42).mock();
        expect(result).toBe(42);
    });

    it('应该能够正确处理布尔类型的常量', () => {
        const result = constant(true).mock();
        expect(result).toBe(true);
    });

    it('应该能够正确处理对象类型的常量', () => {
        const obj = { foo: 'bar' };
        const result = constant(obj).mock();
        expect(result).toBe(obj);
    });

    it('应该能够正确处理数组类型的常量', () => {
        const arr = [1, 2, 3];
        const result = constant(arr).mock();
        expect(result).toBe(arr);
    });
});