import { parseIntDefault } from '.'
import { mockNumber } from '..'

const reges = {
    GUID: 1,
    RE_KEY: /@(.+)\|(?:\+(\d+)|([\+\-]?\d+-?[\+\-]?\d*)?(?:\.(\d+-?\d*))?)/g,
    RE_RANGE: /([\+\-]?\d+)-?([\+\-]?\d+)?/,
    RE_PLACEHOLDER: /\\*@([^@#%&()\?\s]+)(?:\((.*?)\))?/g,
}
export const parse = (str: string) => {
    const parameters = (str || '').match(reges.RE_KEY)
    const name = parameters?.[0]

    const range = parameters?.[3].match(reges.RE_RANGE)
    const min = range?.[1] && parseInt(range[1], 10) // || 1
    const max = range?.[2] && parseInt(range[2], 10) // || 1

    const count = range
        ? !range[2]
            ? parseInt(range[1], 10)
            : mockNumber.intNum(min, max)
        : undefined

    return {
        min,
        max,
        count,
    }
}
