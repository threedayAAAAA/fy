import { Mocker } from '../mocker.js';

/**
 * 随机生成邮箱
 * @return { string }
 */
export function randomEmail(): string {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    let email = "";
    for (let i = 0; i < 10; i++) {
        if (i === 0) {
        email += alphabet[Math.floor(Math.random() * alphabet.length)];
        } else if (i === 9) {
        email += "@example.com";
        } else {
        const randomChar = Math.random() < 0.5 ? alphabet : numbers;
        email += randomChar[Math.floor(Math.random() * randomChar.length)];
        }
    }
    return email;
}

export function email() {
    return new Mocker(function () {
      return randomEmail();
    });
  }

