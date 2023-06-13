const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$';

/**
 * 四舍五入一个数字，可以指定小数位
 * @param number
 * @param fixed
 * @returns {number}
 */
function round(number: number, fixed: number): number {
  const t = Math.pow(10, fixed);
  return Math.round(number * t) / t;
}

/**
 * 随机生成一个浮点数
 * @param min
 * @param max
 * @param fixed
 * @returns {*}
 */
export function randomNumber(min: number = Number.MIN_SAFE_INTEGER, max: number = Number.MAX_SAFE_INTEGER, fixed: number = 0): number {

  if ( !Number.isInteger(min) || !Number.isInteger(max) ) {
    throw new Error('参数必须为整数');
  }

  if (min > max) {
    throw new Error('最小值不能大于最大值');
  }

  return round(Math.random() * (max - min) + min, fixed);
}

/**
 * 随机生成布尔值
 * @param rate
 * @returns {boolean}
 */
export function randomBool(rate: number = 0.5): boolean {
  if (rate < 0 || rate > 1) {
    throw new Error('rate应该在0与1之间')
  }
  return Math.random() < rate;
}

/**
 * 随机生成一个字符
 * @returns {*}
 */
export function randomChar(): string {
  return CHARS[randomNumber(0, CHARS.length - 1)];
}

/**
 * 随机生成一个字符串
 * @param len
 * @returns {string}
 */
export function randomString(min: number = 0, max: number = 10): string {
  if (min < 0 ) {
    throw new Error('参数必须大于等于0')
  }
  
  if ( !Number.isInteger(min) || !Number.isInteger(max) ) {
    throw new Error('参数必须为整数');
  }

  if (min > max) {
    throw new Error('最小值不能大于最大值')
  };

  const len = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Array(len).fill(0).map(() => randomChar()).join('');
}