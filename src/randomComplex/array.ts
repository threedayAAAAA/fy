import randomBase from "../randomBase/index";
import { generate } from ".";

const {natural} = randomBase;

function getArray(len: number, content: any) {
    const result = [];
    for (let i = 0; i < len; i++) {
        result.push(generate(content));     
    }
    return result;
}

export function array(content?: any, min?: number, max?: number) {
    let len;
    if (typeof content === 'undefined') {
        return getArray(natural(1, 10), '@string()');
    }
    if (typeof content === 'number') {
        len = typeof min === 'number' ? natural(content, min) : content;
        return getArray(len, '@string()');
    }
    if (typeof min === 'undefined') {
        min = natural(1, 10);
    }
    len = typeof max === 'number' ? natural(min, max) : min;
    return getArray(len, content);
}
