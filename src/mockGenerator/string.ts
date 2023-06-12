import { isNumber, isString } from 'lodash-es';
import { DEFAULT_POOL } from './const';
import { natural } from './number';
/**
 * 从指定的字符池中随机返回一个字符。
 * @param pool 字符池。
 * @returns 返回一个随机字符。
 */
export function character(poolStr = '') {
  poolStr = poolStr || DEFAULT_POOL;
  return poolStr.charAt(natural(0, poolStr.length - 1));
}

interface RandomStrOptType {
  poolStr: string;
  strLen: number;
}

/** 默认字符串生成的最小长度 */
const DEFAULT_MIN = 0;

/** 默认字符串生成的最大长度 */
const DEFAULT_MAX = 100;

function getCharPool(poolStrOrLength: string | number) {
  return isString(poolStrOrLength) ? poolStrOrLength : DEFAULT_POOL;
}

function getLength(poolStrOrLength: string | number, min: number, max: number) {
  const length = isNumber(poolStrOrLength) ? poolStrOrLength : natural(min, max);
  return Math.max(length, 0);
}

function getRandomStrOpt(
  poolStrOrLength: string | number = DEFAULT_POOL,
  min = DEFAULT_MIN,
  max?: number,
): RandomStrOptType {
  // 匹配randomStr('test', 3)的情况，表示在test中随机抽取三个，所以最大值等于最小值
  if (isString(poolStrOrLength) && isNumber(min) && !isNumber(max)) {
    max = min || DEFAULT_MAX;
  }
  return {
    poolStr: getCharPool(poolStrOrLength),
    strLen: getLength(poolStrOrLength, min, max || DEFAULT_MAX),
  };
}

function simpleRandomStr(poolStr: string, length: number) {
  let str = '';
  for (let i = 0; i < length; i++) {
    str += character(poolStr);
  }
  return str;
}

/**
 * 随机生成字符串
 * @param poolStr 当只有一个或两个参数时表示min
 * @param min 当只有两个参数时表示max,当三个参数时表示min,
 * @param max
 * @returns
 */
export function randomStr(poolStrOrLength?: string | number, min?: number, max?: number): string {
  const { poolStr, strLen } = getRandomStrOpt(poolStrOrLength, min, max);
  return simpleRandomStr(poolStr, strLen);
}

export default {
  character,
  string: randomStr,
};
