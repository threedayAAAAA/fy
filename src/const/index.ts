export const lower = 'abcdefghijklmnopqrstuvwxyz'
export const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const number = '0123456789'
export const symbol = '!@#$%^&*()[]'

export const textPools = {
    lower,
    upper,
    number,
    symbol,

    alpha: lower + upper,
    all: lower + upper + number + symbol,
}

export const safeMaxNum = Number.MAX_SAFE_INTEGER
