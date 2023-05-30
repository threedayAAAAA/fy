import { textPools } from '../const'
import { intNum, natural } from './number'
import { MaybeNumber, PoolKeys } from '../type'
import { isUndefined, sample } from 'lodash'
import { formatDate } from '@/utils'
import { randomDate } from './date'
/**
 * 从指定字符池中随机生成一个字符
 * @param {PoolKeys} [poolKey='all'] 字符池的键名
 * @returns {string} 生成的字符
 */
export const character = (poolKey: PoolKeys = 'all') => {
    if (!Object.keys(textPools).includes(poolKey)) {
        throw new Error(`Invalid pool key: ${poolKey}`)
    }
    const pool = textPools[poolKey]
    return pool.charAt(natural(0, pool.length - 1))
}

/**
 * 生成指定长度的随机字符串
 * @param {Object} [params={}] 参数对象
 * @param {MaybeNumber} [params.min=3] 最小长度
 * @param {MaybeNumber} [params.max=7] 最大长度
 * @param {PoolKeys} [params.poolKey='all'] 字符池的键名
 * @returns {string} 生成的随机字符串
 */
export const text = (
    params: {
        min?: MaybeNumber
        max?: MaybeNumber
        poolKey?: PoolKeys
    } = {},
) => {
    let { min, max, poolKey = 'all' } = params
    if (isUndefined(min) && isUndefined(max)) {
        min = 3
        max = 7
    }
    return Array.from({ length: natural(min, max) }, () => character(poolKey)).join('')
}

/**
 * 生成随机手机号码
 * @returns {string} 生成的手机号码
 */
export const phone = () => {
    const prefix = sample(['130', '131', '132', '133', '135', '137', '138', '170', '187', '189'])
    const suffix = Array.from({ length: 8 })
        .map(() => natural(0, 9))
        .join('')
    return prefix + suffix
}

/**
 * 生成随机身份证号码
 * @returns {string} 生成的身份证号码
 */
export const ID = () => {
    const address = intNum(110101, 659004)
    const birthday = formatDate(randomDate(new Date('1950-01-01'), new Date()), 'YYYYMMdd')
    const sequenceCode = intNum(100, 999)
    const idCardBase = address.toString() + birthday + sequenceCode.toString()
    let idCardSum = 0
    for (var i = 0; i < 17; i++) {
        idCardSum += parseInt(idCardBase.toString().charAt(i)) * Math.pow(2, 17 - i)
    }
    const idCardMod = idCardSum % 11
    let idCardCheckCode = ''
    switch (idCardMod) {
        case 0:
            idCardCheckCode = '1'
            break
        case 1:
            idCardCheckCode = '0'
            break
        case 2:
            idCardCheckCode = 'X'
            break
        default:
            idCardCheckCode = (12 - idCardMod).toString()
    }
    // 拼接身份证号
    return idCardBase + idCardCheckCode
}
