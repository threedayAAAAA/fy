import { POSITION } from '../../src/mockGenerator/const';
import { Logger } from '../../src/util/logger';
import { it, expect, describe, vi } from 'vitest';
import { boolean } from '../../src/mockGenerator/boolean';

describe('boolean', () => {
  it('应该返回一个布尔值', () => {
    const result = boolean();
    expect(typeof result).toBe('boolean');
  });

  it('当传入的概率为默认值时，应该返回一个随机的布尔值', () => {
    const result = boolean();
    expect(typeof result).toBe('boolean');
  });

  it('当传入的概率为0时，应该始终返回false', () => {
    const result = boolean(0);
    expect(result).toBe(false);
  });

  it('当传入的概率为100时，应该始终返回true', () => {
    const result = boolean(100);
    expect(result).toBe(true);
  });

  it('当传入的概率大于100时，应该输出警告并返回一个随机的布尔值', () => {
    const spy = vi.spyOn(Logger, 'warn');
    const result = boolean(101);
    expect(spy).toHaveBeenCalledWith(POSITION, 'probability should <= 100');
    expect(typeof result).toBe('boolean');
  });

  it('当传入的概率小于0时，应该输出警告并返回一个随机的布尔值', () => {
    const spy = vi.spyOn(Logger, 'warn');
    const result = boolean(-1);
    expect(spy).toHaveBeenCalledWith(POSITION, 'probability should > 0');
    expect(typeof result).toBe('boolean');
  });

  it('当传入的概率为非数字时，应该输出警告并返回一个随机的布尔值', () => {
    const spy = vi.spyOn(Logger, 'warn');
    const result = boolean('abc');
    expect(spy).toHaveBeenCalledWith(POSITION, `probability must be a number, now use default (50)`);
    expect(typeof result).toBe('boolean');
  });
});
