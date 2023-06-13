import { DEFAULT_POOL, POOLS } from '../const';
import { natural } from './number';

export function getString(len: number, pool?: string) {
    let text = ''
    for (var i = 0; i < len; i++) {
        text += character(pool)
    }
    return text;
}

// 返回一个随机字符。
export function character(pool?: string) {
    const pools = pool ? POOLS[pool] ?? pool : DEFAULT_POOL;
    return pools.charAt(natural(0, pools.length - 1))
}

// 返回一个随机字符串。
export function string(pool?: string | number, min?: number, max?: number) {
    let len;
    if (typeof pool === 'undefined') {
        len = natural(6, 10);
        return getString(len);
    }
    if (typeof pool === 'number') {
        len = typeof min === 'undefined' ? pool : natural(pool, min);
        pool = undefined;
        return getString(len, pool);
    }
    if (typeof max === 'undefined') {
        len = typeof min === 'undefined' ? natural(6, 10) : min;
    } else {
        len = natural(min, max);
    }
    return getString(len, pool)
}

export default {
    character,
    string
}
