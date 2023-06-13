function judge(min: number, max: number) {
    if (min > max) {
        throw new Error('最小值大于最大值')
    }
}

// 返回一个随机的整数。
export function integer(min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
    // 最大值最小值报错
    judge(min, max);
    return Math.round(Math.random() * (max - min)) + min;
}

// 返回一个随机的自然数（大于等于 0 的整数）。
export function natural(min = 0, max = Number.MAX_SAFE_INTEGER) {
    // 最大值最小值报错
    judge(min, max);
    // min大于等于0
    if (min < 0) {
        throw new Error('最小值需要大于等于0')
    }
    return Math.round(Math.random() * (max - min)) + min
}

// 返回一个随机的浮点数。(浮点数小数位数)
export function float(min?: number, max?: number, dlen = 0) {
    // 小数点位不能小于0
    if (dlen < 0) {
        throw new Error('小数点位不能小于0')
    }
    let ret = integer(min, max) + '.';
    for (let i = 0; i < dlen; i++) {
        ret += (
            // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
            (i < dlen - 1) ? natural(0, 9).toString() : natural(1, 9).toString()
        )
    }
    return parseFloat(ret)
}

export default {
    integer,
    natural,
    float
}