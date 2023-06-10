import { mockIdCardNumber, mockPhoneNumber } from '../src/base/custom'

describe('测试 mockIdCardNumber 函数', () => {
    test('生成的身份证号码应该符合规范', () => {
        const idCardNumber = mockIdCardNumber()
        const regExp = /^[1-9]\d{5}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}[0-9X]$/
        expect(regExp.test(idCardNumber)).toBe(true)
    })
})

describe('测试 mockPhoneNumber 函数', () => {
    test('生成的手机号码应该符合规范', () => {
        const phoneNumber = mockPhoneNumber()
        const regExp = /^1[3-9]\d{9}$/
        expect(regExp.test(phoneNumber)).toBe(true)
    })
})
