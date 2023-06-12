import { parseDecInt } from 'src/util/number';
import { throwError, Logger } from '../util/logger';
import { POSITION } from './const';
import { isNumber } from 'lodash-es';

export function transformMinAndMax(min: number, max: number, isFloat = false) {
  if (!isNumber(min) || !isNumber(max)) {
    throwError(POSITION, 'min and max must be a number');
  }

  if (min > max) {
    throwError(POSITION, 'min must <= max');
  }

  const parseFn = isFloat ? parseFloat : parseDecInt;
  min = parseFn(min.toString());
  max = parseFn(max.toString());

  if (isNaN(min) || isNaN(max)) {
    throwError(POSITION, 'min and max must be a number');
  }

  return [min, max];
}

export function random(minNumber: number, maxNumber: number) {
  return Math.round(Math.random() * (maxNumber - minNumber)) + minNumber;
}

/**
 * 生成随机整数
 * @param min 最小值
 * @param max 最大值
 * @returns 返回
 */
export function randomInt(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER): number {
  const [minNumber, maxNumber] = transformMinAndMax(min, max);
  return random(minNumber, maxNumber);
}

/**
 * 生成自然整数
 * @param min 最小值
 * @param max 最大值
 * @returns 返回
 */
export function natural(min = 0, max = Number.MAX_SAFE_INTEGER): number {
  const [minNumber, maxNumber] = transformMinAndMax(min, max, false);
  if (minNumber < 0 || maxNumber < 0) {
    Logger.warn(POSITION, 'min or max must >= 0, now auto abs');
  }
  return random(Math.abs(minNumber), Math.abs(maxNumber));
}

/**
 * 生成浮点型
 * @param min 最小值
 * @param max 最大值
 * @returns 返回
 */
export function randomfloat(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER): number {
  const [minNumber, maxNumber] = transformMinAndMax(min, max, true);
  return parseFloat(random(minNumber, maxNumber).toFixed(natural(0, 17)));
}

export default {
  integer: randomInt,
  natural,
  float: randomfloat,
};
