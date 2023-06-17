import type { KeyRule } from '../templateParser/type';
import type { Fn, SafeAny, VKey } from 'src/types';

import { isEmpty, isFunction, isNumber, shuffle } from 'lodash-es';
import { parserKey, parseArgs } from '../templateParser';
import { getType } from '../util/typeof';
import { PLACEHOLDER_REG, PLACEHOLDER_REG_ALL } from '../const/reg';
import { randomBool } from '../mockGenerator/boolean';
import { randomfloat } from '../mockGenerator/number';
import { randomStr } from '../mockGenerator/string';
import MockGenerator from '../mockGenerator';

export class DataGenerator {
  /** 数据生成器 */
  private mockGen = new MockGenerator();

  /**
   * 注册自定义函数
   * @param mockFuncs 自定义函数
   */
  public registerMockGen(mockFuncs: Record<string, Fn>) {
    this.mockGen.registerMockGen(mockFuncs);
  }

  /**
   * 将模板转换成最终代码
   * @param template 传入的模板
   * @param key 键名
   * @returns 最终生成的代码
   */
  public generateData(template: unknown, key: VKey = ''): unknown {
    const keyRule = parserKey(key);
    const templateType = getType(template);

    switch (templateType) {
      case 'object':
        return this.genObject(template as Record<VKey, unknown>, keyRule);

      case 'array':
        return this.genArray(template as unknown[], keyRule);

      case 'number':
        return this.genNumber(template as number, keyRule);

      case 'string':
        return this.genString(template as string, keyRule);

      case 'boolean':
        return this.genBoolean(template as boolean, keyRule);

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
  private genObject(template: Record<VKey, unknown>, rule: KeyRule) {
    const { count } = rule;
    const keys = Object.keys(template);
    const randomSelectKeys = count === undefined ? keys : shuffle<VKey>(keys).slice(0, count);

    const res: Record<VKey, unknown> = {};

    randomSelectKeys.forEach(key => {
      const { keyName } = parserKey(key);
      if (keyName) {
        const generatedVal = this.generateData(template[key], key);
        res[keyName] = generatedVal;
      }
    });

    return res;
  }

  /**
   * 数组类型的模板转换器
   * @param template 传入的模板
   * @param rule 生成规则
   * @returns 转化后的生成的数组
   */
  private genArray(template: unknown[], rule: KeyRule) {
    const res: unknown[] = [];

    if (isEmpty(template)) return res;

    const { count } = rule;
    if (!isNumber(count)) {
      template.forEach((item, i) => {
        res.push(this.generateData(item, i));
      });
    } else {
      for (let i = 0; i < count; i++) {
        template.forEach(item => res.push(this.generateData(item, res.length)));
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
  private genNumber(template: number, rule: KeyRule) {
    const { min, max, count } = rule;
    return isNumber(min) && isNumber(max) ? randomfloat(min, max) : isNumber(count) ? count : template;
  }

  /**
   * 获取所有的占位符
   * @param str 原始字符串
   * @returns 匹配到的占位符数组
   */
  private getPlaceholders(str: string): string[] {
    const matches = str.matchAll(PLACEHOLDER_REG_ALL);
    return [...matches].map(match => match[0]);
  }

  /**
   * 获取最终的占位符
   * @param beforeParseStr 原始字符串
   * @param placeholders 所有的占位符数组
   * @returns 替换掉占位符后的字符串
   */
  private replacePlaceholders(beforeParseStr: string, placeholders: string[]): string {
    let result = '';
    let lastIndex = 0;

    for (const placeholder of placeholders) {
      const index = beforeParseStr.indexOf(placeholder, lastIndex);

      // 反义字符串不去解析占位符
      if (/^\\/.test(placeholder)) {
        result += beforeParseStr.slice(lastIndex, index) + placeholder.slice(1);
        lastIndex = index + placeholder.length;
        continue;
      }

      // 拿到解析并执行完的展位符用来替代原有的字符串
      const replaced = this.parsePlaceholder(placeholder);

      // 当有且只有一个占位符时，直接按原格式放回
      if (beforeParseStr === placeholder && placeholders.length === 1) {
        return replaced;
      }

      result += beforeParseStr.slice(lastIndex, index) + replaced;
      lastIndex = index + placeholder.length;
    }

    result += beforeParseStr.slice(lastIndex);

    return result;
  }

  /**
   * 解析占位符
   * @param placeholderStr 占位符
   * @returns 解析占位符
   */
  private parsePlaceholder(placeholderStr: string): SafeAny {
    const match = placeholderStr.match(PLACEHOLDER_REG);
    if (!match || !match[1]) return placeholderStr;

    const key = match[1].toLowerCase();
    const mockFunc = this.mockGen.getHandler(key);

    if (!mockFunc) {
      return placeholderStr;
    }

    const params = match[2] ? parseArgs(match[2]) : [];

    if (isFunction(mockFunc)) {
      return mockFunc(...params) ?? '';
    }
    return '';
  }

  /**
   * 字符串类型的模板转换器
   * @param template 字符串模板
   * @param rule 生成规则
   * @returns 最终生成的数据
   */
  private genString(template: string, rule: KeyRule) {
    const { count = 1 } = rule;

    if (!template.length) {
      return randomStr(count);
    }

    // 将字符串按count重复，如'text|2' = 'X'，'X'复制成'XX'
    const beforeParseStr = template.repeat(count);
    // 获取所有字符串中匹配的@XX的占位符
    const placeholders = this.getPlaceholders(beforeParseStr);

    return this.replacePlaceholders(beforeParseStr, placeholders);
  }

  /**
   * 布尔类型的模板转换器
   * @param template 传入的模板
   * @param rule 生成规则
   * @returns 最终生成的boolen
   */
  private genBoolean(template: boolean, rule: KeyRule) {
    return rule.count === undefined ? template : randomBool(rule.count);
  }
}
