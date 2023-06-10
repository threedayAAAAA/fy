import { mockIdCardNumber, mockPhoneNumber } from '../src/base/custom'

describe('测试 mockIdCardNumber 函数', () => {
  it('生成的身份证号码应该符合规范', () => {
    const idCardNumber = mockIdCardNumber()
    const regExp = /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}[0-9X]$/
    expect(regExp.test(idCardNumber)).toBe(true)
  })

  it('生成的身份证号码省份代码应该符合规范', () => {
    const idCardNumber = mockIdCardNumber()
    const provinceCode = idCardNumber.slice(0, 6)
    const regExp = /^11[0-5]\d{3}$/
    expect(regExp.test(provinceCode)).toBe(true)
  })

  it('生成的身份证号码出生日期应该符合规范', () => {
    const idCardNumber = mockIdCardNumber()
    const birthDate = idCardNumber.slice(6, 14)
    const regExp = /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])$/
    expect(regExp.test(birthDate)).toBe(true)
  })

  it('生成的身份证号码校验码应该符合规范', () => {
    const idCardNumber = mockIdCardNumber()
    const checkCode = idCardNumber.slice(-1)
    const regExp = /^[0-9X]$/
    expect(regExp.test(checkCode)).toBe(true)
  })
})

describe('测试 mockPhoneNumber 函数', () => {
  it('生成的手机号码应该符合规范', () => {
    const phoneNumber = mockPhoneNumber()
    const regExp = /^1[3-9]\d{9}$/
    expect(regExp.test(phoneNumber)).toBe(true)
  })

  it('生成的手机号码前缀应该符合规范', () => {
    const phoneNumber = mockPhoneNumber()
    const prefix = phoneNumber.slice(0, 3)
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
    expect(prefixes.includes(prefix)).toBe(true)
  })

  it('生成的手机号码后缀应该符合规范', () => {
    const phoneNumber = mockPhoneNumber()
    const suffix = phoneNumber.slice(3)
    const regExp = /^\d{8}$/
    expect(regExp.test(suffix)).toBe(true)
  })
})
