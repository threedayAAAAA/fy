/**
 * 生成一个随机日期字符串
 * @param options 选项对象，包括以下属性：
 *   - format: 日期格式，默认为 'yyyy-MM-dd'
 *   - min: 最小日期，默认为 2000 年 1 月 1 日
 *   - max: 最大日期，默认为当前日期
 * @returns 一个随机日期字符串
 */
export const date = (options?: { format?: string, min?: Date, max?: Date }): string => {
    // 默认选项
    const defaultOptions = {
      format: 'yyyy-MM-dd',
      min: new Date(2000, 0, 1),
      max: new Date(),
    };
    const mergedOptions = { ...defaultOptions, ...options };
    // 计算时间戳范围
    const minTimestamp = mergedOptions.min.getTime();
    const maxTimestamp = mergedOptions.max.getTime();
    // 生成随机时间戳
    const timestamp = Math.floor(Math.random() * (maxTimestamp - minTimestamp + 1)) + minTimestamp;
    // 根据时间戳创建日期对象
    const date = new Date(timestamp);
    // 格式化日期字符串
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const milliseconds = date.getMilliseconds().toString().padStart(3, '0');
    const replacements: { [key: string]: string } = {
      'yyyy': year,
      'MM': month,
      'dd': day,
      'HH': hours,
      'mm': minutes,
      'ss': seconds,
      'SSS': milliseconds,
    };
    const format = mergedOptions.format || defaultOptions.format;
    return format.replace(/yyyy|MM|dd|HH|mm|ss|SSS/g, match => replacements[match as keyof typeof replacements]);
  };