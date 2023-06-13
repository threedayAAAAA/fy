import { Mocker } from '../src/mocker';
import { email } from '../src/lib/index';
import { describe, expect, it } from 'vitest';

describe('randomEmail', () => {
    it('应该返回一个Mocker实例', () => {
        const result = email();
        expect(result).toBeInstanceOf(Mocker);
    });
    it('应该生成不同的邮箱', () => {
      const email1 = email().mock();
      const email2 = email().mock();
      expect(email1).not.toBe(email2);
    });
  });