import { isUndefined, random } from 'lodash'
import { safeMaxNum } from '../const'
import { MaybeNumber } from '../type'
import { parseIntDefault } from '../utils'

/**
 * 生成指定范围内的整数
 * @param {MaybeNumber} [min] 最小值
 * @param {MaybeNumber} [max] 最大值
 * @returns {number} 生成的整数
 */
export const intNum = (min?: MaybeNumber, max?: MaybeNumber) => {
    const minNum = parseIntDefault(min, -safeMaxNum)
    const maxNum = parseIntDefault(max, safeMaxNum)
    return random(minNum, maxNum, false)
}

/**
 * 生成指定范围内的自然数
 * @param {MaybeNumber} [min] 最小值
 * @param {MaybeNumber} [max] 最大值
 * @returns {number} 生成的自然数
 */
export const natural = (min?: MaybeNumber, max?: MaybeNumber) => {
    let minNum = parseIntDefault(min)
    minNum = minNum > 0 ? minNum : 0
    let maxNum = parseIntDefault(max, safeMaxNum)
    maxNum = maxNum > 0 ? maxNum : 0
    return intNum(minNum, maxNum)
}

/**
 * 生成指定范围内的浮点数
 * @param {MaybeNumber} [min] 最小值
 * @param {MaybeNumber} [max] 最大值
 * @param {number} [fixed] 保留小数位数
 * @returns {number} 生成的浮点数
 */
export const floatNum = (min?: MaybeNumber, max?: MaybeNumber, fixed?: number) => {
    const minNum = parseIntDefault(min, -safeMaxNum)
    const maxNum = parseIntDefault(max, safeMaxNum)
    let result = random(minNum, maxNum, true)
    if (!result.toString().includes('.')) {
        result = (result % 10) + 0.5
    }
    if (isUndefined(fixed)) {
        return result
    } else {
        const fixedNum = result.toFixed(fixed)
        return parseFloat(fixedNum)
    }
}
