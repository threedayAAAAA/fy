import { it, expect, describe } from 'vitest';
import { randomTimestamp, randomDate } from '../../src/mockGenerator/date';

describe('timestamp', () => {
  it('应该返回一个介于给定时间范围内的随机时间戳', () => {
    const start = new Date('2022-01-01T00:00:00.000Z');
    const end = new Date('2022-12-31T23:59:59.999Z');
    const result = randomTimestamp(start, end);
    expect(result).toBeGreaterThanOrEqual(start.getTime());
    expect(result).toBeLessThanOrEqual(end.getTime());
  });

  it('如果未提供参数，则应该随机返回1970XX到当前时间的时间戳', () => {
    const now = new Date();
    const originalTime = new Date(0);
    const result = randomTimestamp();
    expect(result).toBeGreaterThanOrEqual(originalTime.getTime());
    expect(result).toBeLessThanOrEqual(now.getTime());
  });

  it('如果提供的开始时间晚于结束时间，则应该抛出错误', () => {
    const start = new Date('2023-01-01T00:00:00.000Z');
    const end = new Date('2022-12-31T23:59:59.999Z');
    expect(() => randomTimestamp(start, end)).toThrow();
  });
});

describe('randomDate', () => {
  it('应该返回指定格式的随机日期', () => {
    const result = randomDate('YYYY-MM-DD', new Date(2023, 5, 1), new Date(2023, 5, 30));
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('应该返回在1970-01-01和当前日期之间的随机日期', () => {
    const result = randomDate();
    const currentDate = new Date();
    expect(new Date(result)).toBeInstanceOf(Date);
    expect(new Date(result).getTime()).toBeGreaterThanOrEqual(new Date(0).getTime());
    expect(new Date(result).getTime()).toBeLessThanOrEqual(currentDate.getTime());
  });

  it('应该返回在指定的开始日期和结束日期之间的随机日期', () => {
    const result = randomDate('YYYY-MM-DD', new Date(2023, 5, 1), new Date(2023, 5, 30));
    const startDate = new Date(2023, 5, 1);
    const endDate = new Date(2023, 5, 30);
    expect(new Date(result).getTime()).toBeGreaterThanOrEqual(startDate.getTime());
    expect(new Date(result).getTime()).toBeLessThanOrEqual(endDate.getTime());
  });

  it('如果开始日期在结束日期之后，则应该抛出错误', () => {
    expect(() => randomDate('YYYY-MM-DD', new Date(2023, 5, 30), new Date(2023, 5, 1))).toThrow();
  });

  it('如果传入时间有无，则应该抛出错误', () => {
    expect(() => randomDate('YYYY-MM-DD', 'dsaff', 'fdsaf')).toThrow();
  });
});
