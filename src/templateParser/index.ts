import type { KeyRule } from './type';

import { isUndefined, isFunction } from 'lodash-es';
import { NUM_RANGE_REG, PLACEHOLDER_REG } from '../const/reg';
import mockGenerator from '../mockGenerator';
import { Logger } from '../util/logger';
import { POSITION } from './const';

/**
 * 解释参数
 * @param str 待解析参数字符串
 * @returns 参数数组
 */
export function parseArgs(str: string): any[] {
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
export function parserKey(key?: string | number): KeyRule {
  key = isUndefined(key) ? '' : key.toString();
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

  let [min, max] = [parseInt(rangeMatch[1], 10), parseInt(rangeMatch[2], 10)];

  const count = !isNaN(min) && !isNaN(max) ? mockGenerator.integer(min, max) : !isNaN(min) ? min : undefined;

  return {
    keyName,
    count,
    min: isNaN(min) ? undefined : min,
    max: isNaN(max) ? undefined : max,
  };
}

/**
 * 解析占位符
 * @param placeholderStr 占位符
 * @returns 执行完占位符后产生的结果
 */
export function parsePlaceholder(placeholderStr: string): any {
  const match = placeholderStr.match(PLACEHOLDER_REG);
  if (!match || !match[1]) return placeholderStr;

  const key = match[1].toLowerCase();

  const mockFunc = Object.entries(mockGenerator).find(([k]) => k.toUpperCase() === key.toUpperCase())?.[1];

  if (!mockFunc) {
    return placeholderStr;
  }

  const params = match[2] ? parseArgs(match[2]) : [];

  if (isFunction(mockFunc)) {
    return mockFunc(...params) ?? '';
  }

  return '';
}
