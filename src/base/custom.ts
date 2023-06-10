// 自定义方法内置两个： 随机生成身份证号码，随机生成手机号码

// 随机生成身份证号码
export function mockIdCardNumber(): string {
    const provinceCode = Math.floor(Math.random() * 1000 + 110000).toString()
    const birthDate = new Date(
        Math.floor(Math.random() * (new Date().getTime() - new Date(1900, 0, 1).getTime())) +
            new Date(1900, 0, 1).getTime(),
    )
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, '')
    const sequenceCode = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, '0')
    const idNumberWithoutCheckCode = `${provinceCode}${birthDate}${sequenceCode}`
    const checkCode = Math.floor(Math.random() * 10).toString()
    return `${idNumberWithoutCheckCode}${checkCode}`
}

// 随机生成手机号码
export function mockPhoneNumber(): string {
    const prefixes = [
        '130',
        '131',
        '132',
        '133',
        '134',
        '135',
        '136',
        '137',
        '138',
        '139',
        '150',
        '151',
        '152',
        '153',
        '154',
        '155',
        '156',
        '157',
        '158',
        '159',
        '170',
        '171',
        '172',
        '173',
        '174',
        '175',
        '176',
        '177',
        '178',
        '180',
        '181',
        '182',
        '183',
        '184',
        '185',
        '186',
        '187',
        '188',
        '189',
    ]
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)]
    const suffix = Math.floor(Math.random() * 100000000)
        .toString()
        .padStart(8, '0')
    return `${prefix}${suffix}`
}
