import { Mocker } from '../src/mocker';
import { oneOf } from '../src/lib/index';
import { describe, expect, it } from 'vitest';

describe('oneOf', () => {
    it('应该返回一个 mocker 对象', () => {
        const arr = [1, 2, 3];
        const mocker = oneOf(arr);
        expect(mocker).toBeInstanceOf(Mocker);
    });

    it('应该从给定的数组中随机返回一个元素', () => {
        const arr = [1, 2, 3, 4, 5];
        const mocker = oneOf(arr);

        for (let i = 0; i < 100; i++) {
            const result = mocker.mock();
            expect(arr).toContain(result);
        }
    });

    it('应该抛出错误，当参数为空数组', () => {
        expect(() => oneOf([])).toThrowError('参数必须为数组且不能为空');
    });

    it('应该抛出错误，当参数不是数组', () => {
        expect(() => oneOf('')).toThrowError('参数必须为数组且不能为空');
    });
});