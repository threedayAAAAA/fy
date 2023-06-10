import { mockTimestamp, mockDate, mockTime } from '../src/base/date'

describe('测试 mockTimestamp函数', () => {
  it('返回一个在指定范围内的随机时间戳', () => {
    const min = new Date(2023, 0, 1)
    const max = new Date(2023, 11, 31)
    const timestamp = mockTimestamp({ min, max })
    expect(timestamp).toBeGreaterThanOrEqual(min.getTime())
    expect(timestamp).toBeLessThanOrEqual(max.getTime())
  })

  it('如果未指定选项，则返回一个在2000年1月1日至今天之间的随机时间戳', () => {
    const timestamp = mockTimestamp()
    const min = new Date(2000, 0, 1).getTime()
    const max = new Date().getTime()
    expect(timestamp).toBeGreaterThanOrEqual(min)
    expect(timestamp).toBeLessThanOrEqual(max)
  })

  it('如果最小日期大于最大日期，则抛出错误', () => {
    const min = new Date(2023, 11, 31)
    const max = new Date(2023, 0, 1)
    expect(() => mockTimestamp({ min, max })).toThrow('最小日期不能大于最大日期')
  })
})

describe('mockDate', () => {
  it('返回一个在指定范围内的随机日期字符串', () => {
    const min = new Date(2023, 0, 1)
    const max = new Date(2023, 11, 31)
    const date = mockDate({ min, max })
    const parsedDate = new Date(date)
    expect(parsedDate.getTime()).toBeGreaterThanOrEqual(min.getTime())
    expect(parsedDate.getTime()).toBeLessThanOrEqual(max.getTime())
  })

  it('如果未指定选项，则返回一个在2000年1月1日至今天之间的随机日期字符串', () => {
    const date = mockDate()
    const parsedDate = new Date(date)
    const min = new Date(2000, 0, 1).getTime()
    const max = new Date().getTime()
    expect(parsedDate.getTime()).toBeGreaterThanOrEqual(min)
    expect(parsedDate.getTime()).toBeLessThanOrEqual(max)
  })

  it('可以指定日期格式', () => {
    const date = mockDate({ format: 'yyyy/MM/dd' })
    expect(date).toMatch(/^\d{4}\/\d{2}\/\d{2}$/)
  })

  it('可以指定日期格式和最小最大日期', () => {
    const min = new Date(2023, 5, 1)
    const max = new Date(2023, 5, 30)
    const date = mockDate({ format: 'yyyy/MM/dd', min, max })
    const parsedDate = new Date(date)
    expect(parsedDate.getTime()).toBeGreaterThanOrEqual(min.getTime())
    expect(parsedDate.getTime()).toBeLessThanOrEqual(max.getTime())
    expect(date).toMatch(/^\d{4}\/\d{2}\/\d{2}$/)
  })

  it('如果最小日期大于最大日期，则抛出错误', () => {
    const min = new Date(2023, 11, 31)
    const max = new Date(2023, 0, 1)
    expect(() => mockDate({ min, max })).toThrow('最小日期不能大于最大日期')
  })
})

describe('测试 mockTime函数', () => {
  it('返回一个在00:00:00至23:59:59之间的随机时间字符串', () => {
    const time = mockTime()
    expect(time).toMatch(/^\d{2}:\d{2}:\d{2}$/)
  })
})
