export function getType(value: any): string {
    const type = typeof value
    switch (type) {
        case 'number':
        case 'string':
        case 'boolean':
        case 'undefined':
        case 'bigint':
            return type
        case 'object':
            if (Array.isArray(value)) {
                return 'array'
            } else if (value instanceof Date) {
                return 'date'
            } else if (value === null) {
                return 'null'
            } else {
                return 'object'
            }
        case 'function':
            return 'function'
        default:
            return 'unknown'
    }
}
