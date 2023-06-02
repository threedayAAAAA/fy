/**
 * 参数定义
 */


export interface Response {
    /** 对象名称 */
    name: string;
    /** 属性信息 */
    properties: MockDataOptions[];
    /** 描述信息 */
    schema: SimpleSchema;
    /** 说明 */
    description: string;
    /** 枚举类型 */
    enums?: Array<string | number>;
}

/** 属性 */
export interface MockDataOptions {
    /** 属性名称 */
    name: string;
    /** 是否必填 */
    required: boolean;
    /** 描述信息 */
    schema: SimpleSchema;
    /** 说明 */
    description: string;
}

export interface SimpleSchema {
    /** 类型,例如 number string Array T */
    type: string;
    /** 属性信息 */
    properties: MockDataOptions[];
    /** 针对泛型类，有深层次的描述 */
    children?: SimpleSchema[];
    /** 枚举类型 */
    enums: Array<string | number>;
    pattern?: RegExp;
    max?: number,
    min?: number,
}
