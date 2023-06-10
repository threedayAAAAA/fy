/** 解析生成数的正则表达式 */
export const NUM_RANGE_REG = /([\+\-]?\d+)-?([\+\-]?\d+)?/;

/** 获取所有的占位符的正则表达式 */
export const PLACEHOLDER_REG_ALL = /\\*@([^@#%&()\?\s]+)(?:\((.*?)\))?/g;

/** 获取第一个的占位符的正则表达式 */
export const PLACEHOLDER_REG = /\\*@([^@#%&()\?\s]+)(?:\((.*?)\))?/;
