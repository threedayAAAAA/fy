import { Mocker } from '../src/mocker';
import { idCard } from '../src/lib/index';
import { describe, expect, it } from 'vitest';

describe("idCard", () => {
    it('应该返回一个Mocker实例', () => {
        const result = idCard();
        expect(result).toBeInstanceOf(Mocker);
    });
    
    it("应该能够生成多个不同的身份证号", () => {
        const id1 = idCard().mock();
        const id2 = idCard().mock();
        expect(id1).not.toBe(id2);
    });
});