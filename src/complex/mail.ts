/**
* 生成随机邮箱号码
* @returns 一个随机生成的邮箱号码
*/

import { MockString } from '../base'

export const mail = (): string => {
    const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "qq.com", "163.com"];
    const username = MockString.string({ length: 8 });
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const email = `${username}@${domain}`;
    return email;
}