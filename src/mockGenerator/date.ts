import dayjs, { type ConfigType } from 'dayjs';
import { throwError } from '../util/logger';
import { POSITION } from './const';
import { random } from './number';

/**
 * 生成随机时间戳
 * @param start 开始时间
 * @param end 结束时间
 * @returns 开始时间和结束时间之间的的随机时间戳
 */
export function randomTimestamp(start: ConfigType = new Date(0), end: ConfigType = new Date()) {
  const startTimestamp = dayjs(start).valueOf();
  const endTimestamp = dayjs(end).valueOf();

  if (isNaN(startTimestamp) || isNaN(endTimestamp)) {
    throwError(POSITION, 'start or end invalid time');
  }

  if (startTimestamp > endTimestamp) {
    throwError(POSITION, 'start time must less end time');
  }

  return random(startTimestamp, endTimestamp);
}

/**
 * 生成指定格式指定时间范围的随机时间
 * @param format 生成时间字符串的格式
 * @param start 开始时间
 * @param end 结束时间
 * @returns 指定格式指定时间范围的随机时间
 */
export function randomDate(
  format = 'YYYY-MM-DD HH:mm:ss',
  start: ConfigType = new Date(0),
  end: ConfigType = new Date(),
) {
  const randomDate = randomTimestamp(start, end);
  return dayjs(randomDate).format(format);
}

export default {
  timestamp: randomTimestamp,
  date: randomDate,
};
