import { Mocker } from '../src/mocker';
import { bool } from '../src/lib/index';
import { describe, expect, it } from 'vitest';

describe('bool', () => {
    it('返回一个生成boolean值的Mocker的实例对象', () => {
        const mocker = bool(0.5);
        expect(mocker).toBeInstanceOf(Mocker);

        const generatedValues = Array.from({ length: 100 }, () => mocker.mock());
        expect(generatedValues).toEqual(expect.arrayContaining([true, false]));
    });

    it('返回一个只生成false的实例对象', () => {
        const mocker = bool(0);
        expect(mocker).toBeInstanceOf(Mocker);

        const generatedValues = Array.from({ length: 100 }, () => mocker.mock());
        expect(generatedValues).toEqual(Array(100).fill(false));
    });

    it('返回一个只生成true的实例对象', () => {
        const mocker = bool(1);
        expect(mocker).toBeInstanceOf(Mocker);

        const generatedValues = Array.from({ length: 100 }, () => mocker.mock());
        expect(generatedValues).toEqual(Array(100).fill(true));
    });

    it('rate不能小于0', () => {
        expect(() => bool(-0.5).mock()).toThrowError('rate应该在0与1之间');
    });

    it('rate不能大于1', () => {
        expect(() => bool(1.5).mock()).toThrowError('rate应该在0与1之间');
    });
});
