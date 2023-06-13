import dayjs from 'dayjs';

// 生成一个随机的 Date 对象。
function _randomDate (start = new Date(0), end = new Date()) { // start, end
    const startTime = start.getTime();
    const endTime = end.getTime();
    if (startTime > endTime) {
        throw new Error('起始时间大于终止时间')
    }

    return new Date(Math.random() * (endTime - startTime) + startTime)
}

// 返回一个随机时间戳
export function timestamp(start = new Date(0), end = new Date()) {  
    return _randomDate(start, end).valueOf();
}

// 返回一个随机的时间字符串。
export function time(start = new Date(0), end = new Date(), format = 'HH:mm:ss') {
    return dayjs(timestamp(start, end)).format(format);
}

// 返回一个随机的日期字符串。
export function date(start = new Date(0), end = new Date(), format = 'yyyy-MM-dd') {
    return dayjs(timestamp(start, end)).format(format);
}

// 返回一个随机的日期时间字符串。
export function datetime(start = new Date(0), end = new Date(), format = 'yyyy-MM-dd HH:mm:ss') {
    return dayjs(timestamp(start, end)).format(format);
}

// 已固定格式返回现在的时间
export function now(format = 'y-MM-dd HH:mm:ss') {
    return dayjs(new Date().valueOf()).format(format);
}

export default {
    timestamp,
    time,
    date,
    datetime,
    now
}