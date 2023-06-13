import { Mocker } from "../mocker.js";

/**
 * 随机生成手机号
 * @return { string }
 */
export function randomPhone() {
    const prefixes = ['130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '150', '151', '152', '153', '155', '156', '157', '158', '159', '170', '176', '177', '178', '180', '181', '182', '183', '184', '185', '186', '187', '188', '189']; // 可选的手机号前缀
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)]; // 随机选择一个手机号前缀
    const randomSuffix = Math.floor(Math.random() * 100000000).toString().padStart(8, '0'); // 随机生成一个 0 到 99999999 之间的数字作为后缀，并用 0 补齐到 8 位

    return `${randomPrefix}${randomSuffix}`; // 返回生成的随机手机号
}

export function phone() {
    return new Mocker(function () {
        return randomPhone();
    });
}