import type { KeyRule } from '../templateParser/type';

import { isEmpty, isUndefined } from 'lodash-es';
import { parserKey, parsePlaceholder } from '../templateParser';
import { getType } from '../util/typeof';
import { PLACEHOLDER_REG_ALL } from '../const/reg';
import { boolean } from '../mockGenerator/boolean';
import { float } from '../mockGenerator/number';
import { string } from '../mockGenerator/string';

/**
 * 将模板转换成最终代码
 * @param template 传入的模板
 * @param key 键名
 * @returns 最终生成的代码
 */
export function generateData(template: any, key?: string | number): any {
  key = isUndefined(key) ? '' : key.toString();

  const keyRule = parserKey(key);
  const templateType = getType(template);

  switch (templateType) {
    case 'object':
      return genObject(template, keyRule);

    case 'array':
      return genArray(template, keyRule);

    case 'number':
      return genNumber(template, keyRule);

    case 'string':
      return genString(template, keyRule);

    case 'boolean':
      return genBoolean(template, keyRule);

    default:
      return template;
  }
}

/**
 * 对象类型的模板转换器
 * @param template 传入的模板
 * @param rule 生成规则
 * @returns 转化后的生成的对象
 */
export function genObject(template: Record<string | number, any>, rule: KeyRule) {
  const res: Record<string, any> = {};
  const { count } = rule;
  const keys = Object.keys(template);
  const randomSelectKeys = isUndefined(count) ? keys : keys.slice(0, count);
  randomSelectKeys.forEach(key => {
    const { keyName } = parserKey(key);
    const generatedVal = generateData(template[key], key);
    res[keyName] = generatedVal;
  });
  return res;
}

/**
 * 数组类型的模板转换器
 * @param template 传入的模板
 * @param rule 生成规则
 * @returns 转化后的生成的数组
 */
export function genArray(template: any[], rule: KeyRule) {
  const res: any[] = [];

  if (isEmpty(template)) return res;

  const { count } = rule;
  if (isUndefined(count)) {
    template.forEach((item, i) => {
      res.push(generateData(item, i));
    });
  } else {
    for (let i = 0; i < count; i++) {
      template.forEach(item => res.push(generateData(item, res.length)));
    }
  }

  return res;
}

/**
 * 数字类型的模板转换器
 * @param template 传入的模板
 * @param rule 生成规则
 * @returns 数字后的生成的数字
 */
export function genNumber(template: number, rule: KeyRule) {
  const { min, max, count } = rule;
  return !isUndefined(min) && !isUndefined(max) ? float(min, max) : isUndefined(count) ? template : count;
}

export function genString(template: string, rule: KeyRule) {
  let result = '';
  let lastIndex = 0;
  let beforeParseStr = '';
  const { count } = rule;
  if (template.length) {
    beforeParseStr = template.repeat(count ?? 1);
    const matchs = beforeParseStr.matchAll(PLACEHOLDER_REG_ALL);

    for (const match of matchs) {
      const index = match.index!;
      const input = match[0];
      if (index >= lastIndex) {
        if (/^\\/.test(input)) {
          result += beforeParseStr.slice(lastIndex, index) + input.slice(1);
          lastIndex = index + input.length;
          continue;
        }
        const replaced = parsePlaceholder(input);
        if (index === 0 && input.length === beforeParseStr.length) {
          result = replaced;
        } else {
          result += beforeParseStr.slice(lastIndex, index) + replaced;
        }

        lastIndex = index + input.length;
      }
    }

    if (lastIndex < beforeParseStr.length) {
      result += beforeParseStr.slice(lastIndex);
    }
  } else {
    result = count ? string(count) : template;
  }

  return result;
}

/**
 * 布尔类型的模板转换器
 * @param template 传入的模板
 * @param rule 生成规则
 * @returns 最终生成的boolen
 */
export function genBoolean(template: boolean, rule: KeyRule) {
  return isUndefined(rule.count) ? template : boolean(rule.count);
}
