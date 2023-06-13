import {generate, extend} from "./randomComplex";

// 根据json模板生成mock数据
export function jsonToMock(json: string) {
    const option = JSON.parse(json);
    return generate(option);
}

export default {
    jsonToMock,
    extend,
    mock: generate
}