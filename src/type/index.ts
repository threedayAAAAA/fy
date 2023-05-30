import { textPools } from '@/const'

export * from './mockData'
export type MaybeNumber = number | string
export type PoolKeys = keyof typeof textPools
export type DateFunc = () => string
