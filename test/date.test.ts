import { Mocker } from '../src/mocker';
import { date } from '../src/lib/index';
import { describe, expect, it } from 'vitest';

describe('randomDate', () => {
    it('应该返回一个Mocker实例', () => {
        const result = date();
        expect(result).toBeInstanceOf(Mocker);
    });
    it('应该返回符合格式的随机日期', () => {
        const result = date('YYYY-MM-DD').mock();
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        expect(regex.test(result)).toBe(true);
    });

    it('应该返回指定范围内的随机日期', () => {
        const start = '2022-01-01';
        const end = '2022-12-31';
        const result = date('YYYY-MM-DD', start, end).mock();
        const regex = /^2022-\d{2}-\d{2}$/;
        expect(regex.test(result)).toBe(true);
    });

    it('应该抛出错误，起始日期大于结束日期', () => {
        const start = '2022-12-31';
        const end = '2022-01-01';
        expect(() => date('YYYY-MM-DD', start, end).mock()).toThrowError('起始日期不能大于结束日期');
    });
});