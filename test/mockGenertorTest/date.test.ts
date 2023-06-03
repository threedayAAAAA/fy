import { it, expect, describe, vi } from 'vitest';
import { timestamp } from '../../src/mockGenerator/date';

describe('timestamp', () => {
  it('应该返回一个介于给定时间范围内的随机时间戳', () => {
    const start = new Date('2022-01-01T00:00:00.000Z');
    const end = new Date('2022-12-31T23:59:59.999Z');
    const result = timestamp(start, end);
    expect(result).toBeGreaterThanOrEqual(start.getTime());
    expect(result).toBeLessThanOrEqual(end.getTime());
  });

  it('如果未提供参数，则应该随机返回1970XX到当前时间的时间戳', () => {
    const now = new Date();
    const originalTime = new Date(0);
    const result = timestamp();
    expect(result).toBeGreaterThanOrEqual(originalTime.getTime());
    expect(result).toBeLessThanOrEqual(now.getTime());
  });

  it('如果提供的开始时间晚于结束时间，则应该抛出错误', () => {
    const start = new Date('2023-01-01T00:00:00.000Z');
    const end = new Date('2022-12-31T23:59:59.999Z');
    expect(() => timestamp(start, end)).toThrow();
  });
});
