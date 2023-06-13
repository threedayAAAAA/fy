import { area, prefix, suffixs, dict } from '../const';
import { natural } from './number';
import { getString } from './string';

export function idCard() {
    const year = Math.floor(Math.random() * (2010 - 1950 + 1)) + 1950;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    const random = Math.floor(Math.random() * 10000);
    const areaCode = area[Math.floor(Math.random() * area.length)];
    const idCard = `${areaCode}${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}${random.toString().padStart(4, '0')}`;
    return idCard;
}

export function phone(type?: 'number' | 'string') {
    const random = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    const phone = `${prefix[Math.floor(Math.random() * prefix.length)]}${random}`;
    return type === 'number' ? parseInt(phone) : phone;
}

export function email(suffix?: string){
    const username = Math.random().toString(36).substring(2, 8);
    const domain = suffix || suffixs[Math.floor(Math.random() * suffixs.length)];
    const email = `${username}@${domain}`;
    return email;
}

// 随机生成一个单词。
export function word(min?: number, max?: number) {
    let len;
    if (typeof min === 'number' && typeof max === 'undefined') {
        len = min;
    } else {
        len = natural(min ?? 6, max ?? 10)
    }
    return getString(len, 'lower')
}

// 随机生成一个或多个汉字。
export function cword(pool?: number | string, min?: number, max?: number) {

    let len;
    switch (arguments.length) {
        case 0: // ()
            pool = dict
            len = 1
            break
        case 1: // ( pool )
            if (typeof pool === 'string') {
                len = 1
            } else {
                // ( length )
                len = pool
                pool = dict
            }
            break
        case 2:
            // ( pool, length )
            if (typeof pool === 'string') {
                len = min
            } else {
                // ( min, max )
                len = natural(pool, min)
                pool = dict
            }
            break
        case 3:
            len = natural(min, max)
            break
    }

    return getString(len!, pool as string)
}

export function oneof(...args: any[]) {
    // 生成一个随机数，范围为[0, arr.length)
    const randomIndex = Math.floor(Math.random() * args.length);
    // 从数组中随机选择一条数据
    return args[randomIndex];
}

export default {
    idCard,
    phone,
    email,
    word,
    cword,
    oneof
}