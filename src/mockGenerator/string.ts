import { isString, isUndefined } from 'lodash-es';
import { Logger } from '../util/logger';
import { DEFAULT_POOL, POSITION } from './const';
import { natural } from './number';

function getMin(min = 0) {
  let poolToMin = parseInt(min.toString(), 10);
  return isNaN(poolToMin) ? natural(0, 100) : poolToMin;
}

/**
 * 从指定的字符池中随机返回一个字符。
 * @param pool 字符池。
 * @returns 返回一个随机字符。
 */
export function character(poolStr: string = '') {
  poolStr = poolStr || DEFAULT_POOL;
  return poolStr.charAt(natural(0, poolStr.length - 1));
}

/**
 * 随机生成字符串
 * @param poolStr 当只有一个或两个参数时表示min
 * @param min 当只有两个参数时表示max,当三个参数时表示min,
 * @param max
 * @returns
 */
export function string(poolStr?: string | number, min?: number, max?: number): string {
  let strLen = 0;
  let str = '';
  if (isUndefined(poolStr) && isUndefined(min) && isUndefined(max)) {
    strLen = natural(0, 100);
  } else if (!isUndefined(poolStr) && isUndefined(min) && isUndefined(max)) {
    if (isString(poolStr)) {
      strLen = natural(0, 100);
    } else {
      strLen = getMin(poolStr);
      poolStr = undefined;
    }
  } else if (!isUndefined(poolStr) && !isUndefined(min) && isUndefined(max)) {
    if (isString(poolStr)) {
      strLen = getMin(min);
    } else {
      strLen = natural(poolStr, min);
      poolStr = undefined;
    }
  } else if (!isUndefined(poolStr) && !isUndefined(min) && !isUndefined(max)) {
    strLen = natural(min, max);
    if (typeof poolStr !== 'string') {
      Logger.warn(POSITION, `string pool be a string,but got ${typeof poolStr}`);
    }
    poolStr = poolStr.toString();
  }

  for (let i = 0; i < strLen; i++) {
    str += character(poolStr as string);
  }

  return str;
}

export default {
  character,
  string,
};
