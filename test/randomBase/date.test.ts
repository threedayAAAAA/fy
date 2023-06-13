import { describe, it, expect } from 'vitest';
import { timestamp, time, date, datetime, now } from '../../src/randomBase/date';

describe('date', () => {
  describe('timestamp', () => {
    it('应该返回一个介于起始时间和终止时间之间的随机时间戳', () => {
      const start = new Date('2022-01-01');
      const end = new Date('2022-12-31');
      const result = timestamp(start, end);
      expect(result).toBeGreaterThanOrEqual(start.valueOf());
      expect(result).toBeLessThanOrEqual(end.valueOf());
    });

    it('如果起始时间大于终止时间，应该抛出错误', () => {
      const start = new Date('2022-12-31');
      const end = new Date('2022-01-01');
      expect(() => timestamp(start, end)).toThrowError('起始时间大于终止时间');
    });
  });

  describe('time', () => {
    it('应该返回一个介于起始时间和终止时间之间的随机时间字符串', () => {
      const start = new Date('2022-01-01T00:00:00.000Z');
      const end = new Date('2022-12-31T23:59:59.999Z');
      const result = time(start, end);
      const regex = /^\d{2}:\d{2}:\d{2}$/;
      expect(regex.test(result)).toBe(true);
    });
  });

  describe('date', () => {
    it('应该返回一个介于起始时间和终止时间之间的随机日期字符串', () => {
      const start = new Date('2022-01-01T00:00:00.000Z');
      const end = new Date('2022-12-31T23:59:59.999Z');
      const result = date(start, end);
      const regex = /^\w{4}-\d{2}-\w{2}$/;
      expect(regex.test(result)).toBe(true);
    });
  });

  describe('datetime', () => {
    it('应该返回一个介于起始时间和终止时间之间的随机日期时间字符串', () => {
      const start = new Date('2022-01-01T00:00:00.000Z');
      const end = new Date('2022-12-31T23:59:59.999Z');
      const result = datetime(start, end);
      const regex = /^\w{4}-\d{2}-\w{2} \d{2}:\d{2}:\d{2}$/;
      expect(regex.test(result)).toBe(true);
    });
  });

  describe('now', () => {
    it('应该返回当前时间的默认固定格式字符串', () => {
      const result = now();
      const regex = /^\w{1}-\d{2}-\w{2} \d{2}:\d{2}:\d{2}$/;
      expect(regex.test(result)).toBe(true);
    });

    it('应该返回当前时间的固定格式yyyy-MM-dd HH:mm:ss字符串', () => {
        const result = now('yyyy-MM-dd HH:mm:ss');
        const regex = /^\w{4}-\d{2}-\w{2} \d{2}:\d{2}:\d{2}$/;
        expect(regex.test(result)).toBe(true);
    });
  });
});