import { Mocker } from "../mocker.js";

function randomProvinceCode() {
    var provinceCodes = [
        '11', '12', '13', '14', '15', '21', '22', '23', '31', '32', '33', '34', '35', '36', '37', '41', '42', '43', '44', '45', '46', '50', '51', '52', '53', '54', '61', '62', '63', '64', '65', '71', '81', '82'
    ];
    var index = Math.floor(Math.random() * provinceCodes.length);
    return provinceCodes[index];
}

// 随机生成出生日期
function randomBirthDate() {
    var start = new Date(1900, 0, 1);
    var end = new Date(2023, 5, 30);
    var birthDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    var year = birthDate.getFullYear();
    var month = birthDate.getMonth() + 1;
    var day = birthDate.getDate();
    return `${year}${padZero(month)}${padZero(day)}}`;
}

// 补零函数
function padZero(num: number) {
    return num < 10 ? '0' + num : num;
}

// 随机生成顺序码
function randomSequenceCode() {
    return padZero(Math.floor(Math.random() * 1000));
}

// 计算校验码
function calculateCheckCode(idCard: string) {
    var weightFactors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var checkCodeChars = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
    var sum = 0;
    for (var i = 0; i < 17; i++) {
        sum += parseInt(idCard.charAt(i)) * weightFactors[i];
    }
    var checkCodeIndex = sum % 11;
    return checkCodeChars[checkCodeIndex];
}

/**
* 随机生成身份证号
* @return { string }
*/
export function randomIdCard() {
    var idCard = randomProvinceCode() + randomBirthDate() + randomSequenceCode();
    var checkCode = calculateCheckCode(idCard);
    return idCard + checkCode;
}


export function idCard() {
    return new Mocker(function () {
        return randomIdCard();
    });
}