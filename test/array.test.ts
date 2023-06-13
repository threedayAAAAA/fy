import { Mocker } from '../src/mocker';
import { array } from '../src/lib/index';
import { describe, expect, it } from 'vitest';

describe('array', () => {
    it('应该返回一个Mocker实例', () => {
        const mocker = new Mocker(() => 42);
        const result = array(mocker, 3, 5);
        expect(result).toBeInstanceOf(Mocker);
    });

    it('应该返回一个长度在[min, max]之间的数组', () => {
        const mocker = new Mocker(() => 42);
        const arr = array(mocker, 3, 5).mock();
        expect(arr.length).toBeGreaterThanOrEqual(3);
        expect(arr.length).toBeLessThanOrEqual(5);
    });

    it('当不传入min和max时，应该返回一个长度为20的数组', () => {
        const mocker = new Mocker(() => 42);
        const arr = array(mocker).mock();
        expect(arr.length).toBe(20);
    });

    it('当min或max为负数时，应该抛出错误', () => {
        const mocker = new Mocker(() => 'mocked');
        expect(() => array(mocker, -1)).toThrowError('参数必须大于等于0');
    });

    it('应该返回一个由mocker.mock()生成的数组', () => {
        const mocker = new Mocker(() => 42);
        const arr = array(mocker, 3, 5).mock();
        expect(arr.every((item) => item === 42)).toBe(true);
    });
});