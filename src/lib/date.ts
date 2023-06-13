import { Mocker } from '../mocker.js';
import dayjs from 'dayjs';

/**
 * 随机生成日期
 * @param start
 * @param end
 * @param format
 * @return {string}
 */
export function randomDate(format: string = 'YYYY-MM-DD', start?: string, end?: string): string {
    const startDate = start ? new Date(start) : new Date(1970, 0, 1); // 起始日期为指定日期或 1970 年 1 月 1 日
    const endDate = end ? new Date(end) : new Date(); // 结束日期为指定日期或当前日期
    const startTimestamp = dayjs(startDate).valueOf();
    const endTimestamp = dayjs(endDate).valueOf();

    if (startTimestamp > endTimestamp) {
        throw new Error('起始日期不能大于结束日期');
    }
    const randomTime = Math.round(Math.random() * (endTimestamp - startTimestamp)) + startTimestamp;;
    return dayjs(randomTime).format(format);
}

export function date(format?: string, start?: string, end?: string) {
  return new Mocker(function () {
    return randomDate(format, start, end);
  });
}