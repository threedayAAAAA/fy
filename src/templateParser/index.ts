import type { KeyRule } from './type';
import type { SafeAny, VKey } from 'src/types';

import { isString } from 'lodash-es';
import { NUM_RANGE_REG } from '../const/reg';
import { randomInt } from '../mockGenerator/number';
import { Logger } from '../util/logger';
import { POSITION } from './const';
import { parseDecInt } from 'src/util/number';

/**
 * 解释参数
 * @param str 待解析参数字符串
 * @returns 参数数组
 */
export function parseArgs(str: string): SafeAny[] {
  try {
    return JSON.parse(`[${str}]`);
  } catch (e) {
    Logger.warn(POSITION, `Failed to parse arguments:${e}`);
    return [];
  }
}

/**
 * 解析键名
 * @param key 需要解析的键名
 * @returns 解析键名后产生的模板生成规则
 */
export function parserKey(key: VKey = ''): KeyRule {
  if (!isString(key)) {
    return {
      keyName: key,
    };
  }
  const match = key.split('|');

  if (match.length < 2) {
    return { keyName: key };
  }

  const lastPart = match.pop()!;
  const rangeMatch = lastPart.match(NUM_RANGE_REG);

  if (!rangeMatch) {
    return { keyName: key };
  }

  const keyName = match[0];

  const [min, max] = [parseDecInt(rangeMatch[1]), parseInt(rangeMatch[2], 10)];

  const count = !isNaN(min) && !isNaN(max) ? randomInt(min, max) : !isNaN(min) ? min : undefined;

  return {
    keyName,
    count,
    min: isNaN(min) ? undefined : min,
    max: isNaN(max) ? undefined : max,
  };
}
