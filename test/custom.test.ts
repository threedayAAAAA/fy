import { Mocker } from '../src/mocker';
import { apply, array, bool } from '../src/lib/index';
import { describe, expect, it } from 'vitest';

describe('apply', () => {
  it('应该返回一个Mocker实例', () => {
    const mockFunc = () => 1;
    const mocker = apply(mockFunc);
    expect(mocker).toBeInstanceOf(Mocker);
  });
});

describe('apply', () => {
  it('参数必须为函数', () => {
    expect(() => apply().mock()).toThrow('func必须为函数');
  });

  it('支持自定义类型', () => {
    const arr = () => array(bool(1), 5)
    const randomId = () => {
      return apply(arr);
    }
    const arrLen = randomId().mock().mock();
    expect(arrLen.length).greaterThanOrEqual(5);
  })
});