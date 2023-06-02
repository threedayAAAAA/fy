import getResponseMock from '../src/mock';
import { Response, MockDataOptions, SimpleSchema } from '../src/const';
import getMultiMockData from '../src/index';
import { describe, expect, it } from 'vitest';

describe('getResponseMock', () => {
    const mockDataOptions: MockDataOptions[] = [
        {
            name: 'name',
            required: true,
            schema: {
                type: 'string',
                properties: [],
                enums: [],
            },
            description: '名称',
        },
        {
            name: 'age',
            required: true,
            schema: {
                type: 'number',
                properties: [],
                enums: [],
                min: 0,
                max: 100,
            },
            description: '年龄',
        },
        {
            name: 'email',
            required: false,
            schema: {
                type: 'string',
                properties: [],
                enums: [],
                pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            },
            description: '邮箱',
        },
        {
            name: 'hobbies',
            required: false,
            schema: {
                type: 'array',
                properties: [
                    {
                        name: 'name',
                        required: true,
                        schema: {
                            type: 'string',
                            properties: [],
                            enums: [],
                        },
                        description: '名称',
                    },
                    {
                        name: 'level',
                        required: true,
                        schema: {
                            type: 'number',
                            properties: [],
                            enums: [],
                            min: 1,
                            max: 5,
                        },
                        description: '等级',
                    },
                ],
                enums: [],
                min: 1,
                max: 5,
            },
            description: '爱好',
        },
        {
            name: 'address',
            required: false,
            schema: {
                type: 'object',
                properties: [
                    {
                        name: 'province',
                        required: true,
                        schema: {
                            type: 'string',
                            properties: [],
                            enums: [],
                        },
                        description: '省份',
                    },
                    {
                        name: 'city',
                        required: true,
                        schema: {
                            type: 'string',
                            properties: [],
                            enums: [],
                        },
                        description: '城市',
                    },
                ],
                enums: [],
            },
            description: '地址',
        },
    ];

    const response: Response = {
        name: '用户信息',
        properties: mockDataOptions,
        schema: {
            type: 'object',
            properties: mockDataOptions,
            enums: [],
        },
        description: '用户信息',
    };

    const template: Response = {
        name: "mock",
        properties: [
            {
                name: "prop1",
                required: true,
                schema: {
                    type: "string",
                    properties: [],
                    enums: [],
                },
                description: "description1",
            },
            {
                name: "prop2",
                required: false,
                schema: {
                    type: "number",
                    properties: [],
                    enums: [],
                },
                description: "description2",
            },
        ],
        schema: {
            type: "object",
            properties: [],
            enums: [],
        },
        description: "mock description",
    };

    it('应该返回指定长度的响应数组', () => {
        const len = 3;
        const result = getMultiMockData(template, len);
        expect(result).toHaveLength(len);
    });

    it('当长度为 0 时，应该返回空数组', () => {
        const len = 0;
        const result = getMultiMockData(template, len);
        expect(result).toEqual([]);
    });

    it('当长度为负数时，应该抛出错误', () => {
        const len = -1;
        expect(() => getMultiMockData(template, len)).toThrow();
    });

    it('当模板为空时，应该抛出错误', () => {
        const len = 2;
        const emptyTemplate: Response = {
            name: '',
            description: '',
            properties: [],
            schema: {
                type: 'object',
                properties: [],
                enums: [],
            },
        };
        expect(() => getMultiMockData(emptyTemplate, len)).toThrow();
    });

    it('应该返回符合 Response 定义的对象', () => {
        const result = getResponseMock(response);
        expect(result).toBeDefined();
        expect(result).toHaveProperty('name');
        expect(result).toHaveProperty('age');
        expect(result).toHaveProperty('email');
        expect(result).toHaveProperty('hobbies');
        expect(result).toHaveProperty('address');
    });

    it('应该返回的对象属性值符合定义的类型和规则', () => {
        const result = getResponseMock(response);
        expect(typeof result.name).toBe('string');
        expect(typeof result.age).toBe('number');
        expect(typeof result.email).toBe('string');
        expect(Array.isArray(result.hobbies)).toBe(true);
        expect(typeof result.address).toBe('object');
        expect(typeof result.address.province).toBe('string');
        expect(typeof result.address.city).toBe('string');
    });

    it('应该返回的对象属性值符合定义的枚举类型', () => {
        const responseWithEnum: Response = {
            name: '带枚举类型的对象',
            properties: [
                {
                    name: 'gender',
                    required: true,
                    schema: {
                        type: 'string',
                        properties: [],
                        enums: ['男', '女'],
                    },
                    description: '性别',
                },
            ],
            schema: {
                type: 'object',
                properties: [
                    {
                        name: 'gender',
                        required: true,
                        schema: {
                            type: 'string',
                            properties: [],
                            enums: ['男', '女'],
                        },
                        description: '性别',
                    },
                ],
                enums: [],
            },
            description: '带枚举类型的对象',
        };
        const result = getResponseMock(responseWithEnum);
        expect(result.gender).toBeDefined();
        expect(['男', '女']).toContain(result.gender);
    });

    it('应该返回的对象属性值符合定义的正则表达式', () => {
        const responseWithPattern: Response = {
            name: '带正则表达式的对象',
            properties: [
                {
                    name: 'phone',
                    required: true,
                    schema: {
                        type: 'string',
                        properties: [],
                        enums: [],
                        pattern: /^1[3-9]\d{9}$/,
                    },
                    description: '手机号',
                },
            ],
            schema: {
                type: 'object',
                properties: [
                    {
                        name: 'phone',
                        required: true,
                        schema: {
                            type: 'string',
                            properties: [],
                            enums: [],
                            pattern: /^1[3-9]\d{9}$/,
                        },
                        description: '手机号',
                    },
                ],
                enums: [],
            },
            description: '带正则表达式的对象',
        };
        const result = getResponseMock(responseWithPattern);
        expect(result.phone).toBeDefined();
        expect(/^1[3-9]\d{9}$/.test(result.phone)).toBe(true);
    });

    it('应该返回的对象属性值符合定义的最小值和最大值', () => {
        const responseWithMinMax: Response = {
            name: '带最小值和最大值的对象',
            properties: [
                {
                    name: 'score',
                    required: true,
                    schema: {
                        type: 'number',
                        properties: [],
                        enums: [],
                        min: 60,
                        max: 100,
                    },
                    description: '分数',
                },
            ],
            schema: {
                type: 'object',
                properties: [
                    {
                        name: 'score',
                        required: true,
                        schema: {
                            type: 'number',
                            properties: [],
                            enums: [],
                            min: 60,
                            max: 100,
                        },
                        description: '分数',
                    },
                ],
                enums: [],
            },
            description: '带最小值和最大值的对象',
        };
        const result = getResponseMock(responseWithMinMax);
        expect(result.score).toBeDefined();
        expect(result.score >= 60 && result.score <= 100).toBe(true);
    });

    it('应该返回的对象属性值符合定义的子属性类型和规则', () => {
        const responseWithChildren: Response = {
            name: '带子属性的对象',
            properties: [
                {
                    name: 'person',
                    required: true,
                    schema: {
                        type: 'object',
                        properties: [
                            {
                                name: 'name',
                                required: true,
                                schema: {
                                    type: 'string',
                                    properties: [],
                                    enums: [],
                                },
                                description: '姓名',
                            },
                            {
                                name: 'age',
                                required: true,
                                schema: {
                                    type: 'number',
                                    properties: [],
                                    enums: [],
                                    min: 0,
                                    max: 100,
                                },
                                description: '年龄',
                            },
                        ],
                        enums: [],
                    },
                    description: '人员信息',
                },
            ],
            schema: {
                type: 'object',
                properties: [
                    {
                        name: 'person',
                        required: true,
                        schema: {
                            type: 'object',
                            properties: [
                                {
                                    name: 'name',
                                    required: true,
                                    schema: {
                                        type: 'string',
                                        properties: [],
                                        enums: [],
                                    },
                                    description: '姓名',
                                },
                                {
                                    name: 'age',
                                    required: true,
                                    schema: {
                                        type: 'number',
                                        properties: [],
                                        enums: [],
                                        min: 0,
                                        max: 100,
                                    },
                                    description: '年龄',
                                },
                            ],
                            enums: [],
                        },
                        description: '人员信息',
                    },
                ],
                enums: [],
            },
            description: '带子属性的对象',
        };
        const result = getResponseMock(responseWithChildren);
        expect(result.person).toBeDefined();
        expect(typeof result.person.name).toBe('string');
        expect(typeof result.person.age).toBe('number');
    });

    it('应该返回的对象属性值符合定义的深层子属性类型和规则', () => {
        const responseWithDeepChildren: Response = {
            name: '带深层子属性的对象',
            properties: [
                {
                    name: 'person',
                    required: true,
                    schema: {
                        type: 'object',
                        properties: [
                            {
                                name: 'name',
                                required: true,
                                schema: {
                                    type: 'string',
                                    properties: [],
                                    enums: [],
                                },
                                description: '姓名',
                            },
                            {
                                name: 'age',
                                required: true,
                                schema: {
                                    type: 'number',
                                    properties: [],
                                    enums: [],
                                    min: 0,
                                    max: 100,
                                },
                                description: '年龄',
                            },
                            {
                                name: 'hobbies',
                                required: false,
                                schema: {
                                    type: 'array',
                                    properties: [
                                        {
                                            name: 'name',
                                            required: true,
                                            schema: {
                                                type: 'string',
                                                properties: [],
                                                enums: [],
                                            },
                                            description: '名称',
                                        },
                                        {
                                            name: 'level',
                                            required: true,
                                            schema: {
                                                type: 'number',
                                                properties: [],
                                                enums: [],
                                                min: 1,
                                                max: 5,
                                            },
                                            description: '等级',
                                        },
                                        {
                                            name: 'details',
                                            required: false,
                                            schema: {
                                                type: 'object',
                                                properties: [
                                                    {
                                                        name: 'description',
                                                        required: true,
                                                        schema: {
                                                            type: 'string',
                                                            properties: [],
                                                            enums: [],
                                                        },
                                                        description: '描述',
                                                    },
                                                    {
                                                        name: 'images',
                                                        required: false,
                                                        schema: {
                                                            type: 'array',
                                                            properties: [
                                                                {
                                                                    name: 'url',
                                                                    required: true,
                                                                    schema: {
                                                                        type: 'string',
                                                                        properties: [],
                                                                        enums: [],
                                                                    },
                                                                    description: '图片链接',
                                                                },
                                                            ],
                                                            enums: [],
                                                        },
                                                        description: '图片',
                                                    },
                                                ],
                                                enums: [],
                                            },
                                            description: '详情',
                                        },
                                    ],
                                    enums: [],
                                    min: 1,
                                    max: 5,
                                },
                                description: '爱好',
                            },
                        ],
                        enums: [],
                    },
                    description: '人员信息',
                },
            ],
            schema: {
                type: 'object',
                properties: [
                    {
                        name: 'person',
                        required: true,
                        schema: {
                            type: 'object',
                            properties: [
                                {
                                    name: 'name',
                                    required: true,
                                    schema: {
                                        type: 'string',
                                        properties: [],
                                        enums: [],
                                    },
                                    description: '姓名',
                                },
                                {
                                    name: 'age',
                                    required: true,
                                    schema: {
                                        type: 'number',
                                        properties: [],
                                        enums: [],
                                        min: 0,
                                        max: 100,
                                    },
                                    description: '年龄',
                                },
                                {
                                    name: 'hobbies',
                                    required: false,
                                    schema: {
                                        type: 'array',
                                        properties: [
                                            {
                                                name: 'name',
                                                required: true,
                                                schema: {
                                                    type: 'string',
                                                    properties: [],
                                                    enums: [],
                                                },
                                                description: '名称',
                                            },
                                            {
                                                name: 'level',
                                                required: true,
                                                schema: {
                                                    type: 'number',
                                                    properties: [],
                                                    enums: [],
                                                    min: 1,
                                                    max: 5,
                                                },
                                                description: '等级',
                                            },
                                            {
                                                name: 'details',
                                                required: false,
                                                schema: {
                                                    type: 'object',
                                                    properties: [
                                                        {
                                                            name: 'description',
                                                            required: true,
                                                            schema: {
                                                                type: 'string',
                                                                properties: [],
                                                                enums: [],
                                                            },
                                                            description: '描述',
                                                        },
                                                        {
                                                            name: 'images',
                                                            required: false,
                                                            schema: {
                                                                type: 'array',
                                                                properties: [
                                                                    {
                                                                        name: 'url',
                                                                        required: true,
                                                                        schema: {
                                                                            type: 'string',
                                                                            properties: [],
                                                                            enums: [],
                                                                        },
                                                                        description: '图片链接',
                                                                    },
                                                                ],
                                                                enums: [],
                                                            },
                                                            description: '图片',
                                                        },
                                                    ],
                                                    enums: [],
                                                },
                                                description: '详情',
                                            },
                                        ],
                                        enums: [],
                                        min: 1,
                                        max: 5,
                                    },
                                    description: '爱好',
                                },
                            ],
                            enums: [],
                        },
                        description: '人员信息',
                    },
                ],
                enums: [],
            },
            description: '带深层子属性的对象',
        };
        const result = getResponseMock(responseWithDeepChildren);
        expect(result.person).toBeDefined();
        expect(typeof result.person.name).toBe('string');
        expect(typeof result.person.age).toBe('number');
        expect(Array.isArray(result.person.hobbies)).toBe(true);
        expect(result.person.hobbies.length >= 1 && result.person.hobbies.length <= 5).toBe(true);
        expect(typeof result.person.hobbies[0].name).toBe('string');
        expect(typeof result.person.hobbies[0].level).toBe('number');
        expect(result.person.hobbies[0].level >= 1 && result.person.hobbies[0].level <= 5).toBe(true);
        expect(typeof result.person.hobbies[0].details).toBe('object');
        expect(typeof result.person.hobbies[0].details.description).toBe('string');
        expect(Array.isArray(result.person.hobbies[0].details.images)).toBe(true);
        expect(result.person.hobbies[0].details.images.length >= 0 && result.person.hobbies[0].details.images.length <= 5).toBe(true);
        expect(typeof result.person.hobbies[0].details.images[0].url).toBe('string');
    });
});