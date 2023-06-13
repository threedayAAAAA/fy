// 定义正则表达式
const regex = /@(\w+)\(([\d, \w]*)\)/;

export function parser(template: string) {
    const match = template.match(regex);
    if (!match) {
        return null;
    }
    const operate = match[1];
    const params = match[2];
    let templateParams;
    if (params === '') {
        templateParams = [undefined];
    } else {
        templateParams = params.split(',').map(param => {
            const num = parseInt(param);
            if (!isNaN(num)) {
                return num;
              } else {
                return param;
            }
        })
    }
    return {operate, templateParams}
}

export function keyParser(key: string) {
    const [type, range] = key.split("|");
    if (!range) {
        return {type};
    }
    const [start, end] = range.split("-");
    if (end) {
        return {type, range: [parseInt(start), parseInt(end)]};
    }
    return {type, range: [parseInt(start)]};
}