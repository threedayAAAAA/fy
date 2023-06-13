interface OptionsType {
    min?: number
    max?: number
    decimalPlaces?: number
}

// 生成随机整数
export const mockInt = (options?: OptionsType): number => {
    const { min = 0, max = 100 } = options || {}

    if (min > max) {
        throw new Error('max必须大于min')
    }

    return Math.floor(Math.random() * (max - min + 1)) + min
}

// 生成随机浮点数
export const mockFloat = (options?: OptionsType): number => {
    const { min = 0, max = 100, decimalPlaces = 2 } = options || {}

    if (min > max) {
        throw new Error('max必须大于min')
    }

    if (decimalPlaces < 0) {
        throw new Error('decimalPlaces必须大于等于0')
    }

    const randomNum = Math.random() * (max - min) + min
    return parseFloat(randomNum.toFixed(decimalPlaces))
}

// 生成随机自然数
export const mockNatural = (options?: OptionsType): number => {
  const { min = 0, max = 100 } = options || {}

  if (min < 0 || max < 0) {
    throw new Error('min和max必须大于等于0')
  }

  if (min > max) {
    throw new Error('max必须大于min')
  }

  return Math.floor(Math.random() * (max - min)) + min
}

