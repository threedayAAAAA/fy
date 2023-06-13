import { Mocker } from '../src/mocker';
import { templateObject, array } from '../src/lib/index';
import { describe, expect, it } from 'vitest';

describe('templateObject', () => {
    it('应该返回一个对象，对象的属性值为对应 Mocker 的 mock 值', () => {
        const mockerObject = {
            name: new Mocker(() => '张三'),
            age: new Mocker(() => 18),
            gender: new Mocker(() => 'male'),
        };
        const result = templateObject(mockerObject).mock();
        expect(result).toEqual({
            name: '张三',
            age: 18,
            gender: 'male',
        });
    });

    it('如果 mockerObject 为空对象，应该返回空对象', () => {
        const mockerObject = {};
        const result = templateObject(mockerObject).mock();
        expect(result).toEqual({});
    });

    it('如果 mockerObject 中某个属性的值不是 Mocker 实例，应该抛出错误', () => {
        const mockerObject = {
            name: '张三',
            age: new Mocker(() => 18),
        };
        expect(() => templateObject(mockerObject).mock()).toThrowError('属性值必须为 Mocker 实例');
    });

    it('支持按模板生成多条数据', () => {
        const mockerObject = {
            name: new Mocker(() => '张三'),
            age: new Mocker(() => 18),
            gender: new Mocker(() => 'male'),
        };

        const result = array(templateObject(mockerObject), 5).mock();
        expect(result[0]).toEqual({
            name: '张三',
            age: 18,
            gender: 'male',
        });
        expect(result[1]).toEqual({
            name: '张三',
            age: 18,
            gender: 'male',
        });
        expect(result.length).toBeGreaterThanOrEqual(5)
    })
});