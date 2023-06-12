import { POSITION } from './const';
import { throwError } from './logger';

/**
 * 将数字，字符串数字统一转成10进制
 * @param num 需要转换的值
 */
export function parseDecInt(num: number | string) {
  const res = parseInt(num.toString(), 10);
  if (isNaN(res)) {
    throwError(POSITION, 'num must be a number');
  }
  return res;
}
