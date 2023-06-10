import dayjs, { type ConfigType } from 'dayjs';
import { throwError } from '../util/logger';
import { POSITION } from './const';
import { random } from './number';

export function timestamp(start: ConfigType = new Date(0), end: ConfigType = new Date()) {
  const startTimestamp = dayjs(start).valueOf();
  const endTimestamp = dayjs(end).valueOf();

  if (startTimestamp > endTimestamp) {
    throwError(POSITION, 'start time must less end time');
  }

  return random(startTimestamp, endTimestamp);
}

export function date(format = 'yyyy-MM-dd HH:mm:ss', start: ConfigType = new Date(0), end: ConfigType = new Date()) {
  const randomDate = timestamp(start, end);
  return dayjs(randomDate).format(format);
}
