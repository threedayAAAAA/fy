import { Mocker } from '../src/mocker';
import { phone } from '../src/lib/index';
import { describe, expect, it } from 'vitest';

describe("phone", () => {
    it('应该返回一个Mocker实例', () => {
        const result = phone();
        expect(result).toBeInstanceOf(Mocker);
    });
    it("应该返回一个合法的手机号", () => {
        const phoneNumber = phone().mock();
        const regex = /^1[3-9]\d{9}$/;
        expect(regex.test(phoneNumber)).toBe(true);
    });
});