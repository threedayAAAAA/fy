import { Response } from "./const.js";
import getResponseMock from "./mock.js";

const template = {
    name: 'info',
    description: '）',
    properties: [{
        name: "username",
        description: '）',
        required: true,
        schema: {
            type: 'string',
            enums: [],
            properties: [],
        }
    }, {
        name: "phone",
        description: '',
        required: true,
        schema: {
            type: 'array',
            enums: [],
            // properties: [],
            properties: [{
                name: "domain",
                description: '',
                required: true,
                schema: {
                    type: 'string',
                    pattern: /^1[3-9]\d{9}$/,
                    enums: [],
                    properties: [],
                }
            }],
        }
    }, {
        name: "uuId",
        description: '',
        required: true,
        schema: {
            type: 'string',
            enums: [],
            properties: [],
        }
    }, {
        name: "domain",
        description: '',
        required: true,
        schema: {
            type: 'array',
            enums: [],
            properties: [{
                name: "domain",
                description: '',
                required: true,
                schema: {
                    type: 'string',
                    enums: [],
                    properties: [],
                }
            }],
        }
    }, {
        name: "app_type",
        description: '',
        required: true,
        schema: {
            type: 'object',
            enums: [],
            properties:[{
                name: "limit",
                description: '',
                required: true,
                schema: {
                    type: 'number',
                    enums: [],
                    properties: [],
                }
            }, {
                name: "sort_direction",
                description: '',
                required: true,
                schema: {
                    type: 'string',
                    enums: ['DESC', 'ASC'],
                    properties: [],
                }
            }, {
                name: "grade",
                description: '',
                required: true,
                schema: {
                    type: 'object',
                    enums: [],
                    properties: [{
                        name: "class",
                        description: '',
                        required: true,
                        schema: {
                            type: 'number',
                            enums: [],
                            max: 10,
                            min: 1,
                            properties: [],
                        }
                    }, {
                        name: "teacher_name",
                        description: '',
                        required: true,
                        schema: {
                            type: 'string',
                            enums: [],
                            properties: [],
                        }
                    }, {
                        name: "hobbies",
                        description: '',
                        required: true,
                        schema: {
                            type: 'array',
                            enums: [],
                            properties: [{
                                name: "",
                                description: '',
                                required: true,
                                schema: {
                                    type: 'string',
                                    enums: ['篮球', '跑步', '跳高', '跳远', '游泳'],
                                    properties: [],
                                }
                            }],
                        }
                    }],
                }
            }]
        }
    }],
    schema: {
        type: 'string',
        enums: [],
        properties: [],
    }
}

const getMultiMockData = (template: Response, len: number) => {
    if (len < 0 ) throw new Error();
    if (!Object.keys(template).length) throw new Error();
    let response = [];
    for (let i = 0; i < len - 1; i++) {
        let res = getResponseMock(template);
        response.push(res);
    }

    return response
}
const res = getMultiMockData(template, 5);
console.log(res);

export default getMultiMockData;