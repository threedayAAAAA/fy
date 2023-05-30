import { MaybeNumber } from '@/type'
import { parseIntDefault } from '@/utils'
import { isUndefined } from 'lodash'

/**
 * 生成一个随机布尔值，可以指定当前值、最小值和最大值。
 * 如果当前值未指定，则以50%的概率生成true或false。
 * 如果当前值已指定，则以max/(max+min)的概率生成当前值，以min/(max+min)的概率生成相反的值。
 * @param current 当前值
 * @param min 最小值，默认为1
 * @param max 最大值，默认为1
 * @returns 生成的随机布尔值
 */
export const randomBool = (current?: boolean, min?: MaybeNumber, max?: MaybeNumber): boolean => {
    if (isUndefined(current)) {
        return Math.random() > 0.5
    }
    const minNum = parseIntDefault(min, 1)
    const maxNum = parseIntDefault(max, 1)
    const percent = maxNum / (maxNum + minNum) //以这个概率生成current
    return Math.random() < percent ? current : !current
}
