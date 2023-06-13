interface OptionsType {
    length?: number
    chars?: string
}

export const mockString = (options?: OptionsType): string => {
    const {
        length = 10,
        chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    } = options || {}

    if (length < 0) {
        throw new Error('length必须大于等于0')
    }

    // chars为空字符串,则返回空字符串
    if (chars === '') {
      return ''
    }

    let str = ''
    for (let i = 0; i < length; i++) {
        const index = Math.floor(Math.random() * chars.length)
        str += chars[index]
    }
    return str
}
