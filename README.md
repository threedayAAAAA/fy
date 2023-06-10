使用 `pnpm i`安装依赖
使用 `pnpm test`执行单测

### 如何使用
* 支持生成随机字符串、数字、布尔值、日期、时间等基本数据类型。
* 支持生成对象、数组等复杂数据类型。
* 支持自定义数据类型。
* 支持生成符合特定规则的数据，生成指定范围内的数字、指定长度的字符串、指定格式的日期等；
* 支持根据数据模板生成数据，根据一个 JSON 模板生成符合该模板的数据。
```
export const Mock: Record<string, Function> = {
    ...mockNumber,
    ...mockString,
    ...mockBoolean,
    ...mockDate,
    ...mockCustom,
    mockNull,
    mockUndefined,
    mockObject,
    mockArray,
}
```
数字支持生成随机整数、随机浮点数、随机自然数
日期支持生成随机时间戳、随机日期字符串、随机时间字符串、指定格式的日期
自定义数据支持生成随机身份证号码、随机手机号码
支持自定义规则，按照自定义规则生成随机数据

## 生成随机的string
```
import { Mock } from 'mock'
Mock.mockString({ length: 5, chars: 'abc' }) // 字符范围为abc的长度5的随机字符串
```

* 生成一个指定长度和字符集的随机字符串
* @param options 选项对象，包括以下属性：
*   - length: 字符串长度，默认为 10
*   - chars: 字符集，默认为包含大小写字母和数字的字符串
* @returns 一个随机字符串

## 生成随机的number
```
import { Mock } from 'mock'
Mock.mockInt({ min: 10, max: 20 }) // 10-20范围的随机整数
Mock.mockFloat({ min: 10, max: 20, decimalPlaces: 3 }) // 10-20范围的随机浮点数，保留三位小数
Mock.mockNatural({ min: 10, max: 20 }) // 10-20范围的随机自然数
```

## 生成随机的boolean

* 生成一个随机布尔值
* @returns 一个随机布尔值

```
import { Mock } from 'mock'
Mock.mockBool()
```
## 生成随机date数据
```
import { Mock } from 'mock'
const min = new Date(2023, 0, 1)
const max = new Date(2023, 11, 31)
Mock.mockTimestamp({ min, max }) // 生成范围内的随机时间戳
Mock.mockDate({ format: 'yyyy/MM/dd' }) // 生成指定格式的日期字符串
Mock.mockTime() // 00:00:00至23:59:59之间的随机时间字符串
```
## 生成随机对象数据
```
import { Mock } from 'mock'
const template = {
  name: '@mockString',
  age: '@mockInt',
  isMale: '@mockBool',
}
Mock.mockObject(template)
```
@mockString代表调用mockString的方法，随机生成字符串
如果不使用@符号，则模板填入什么则生成什么，比如：
```
{
  name: '@mockString',
  age: 18,
}
```
则生成的对象，name为随机字符串，而age则为18
对象的键也可以使用该方式随机生成，比如：
```
{
  '@mockString': '@mockString',
}
```
则键与键值都是随机生成的字符串
调用随机生成数据方法时还可以传入参数，使随机生成数据符合特定规则
比如：
```
{
  name: '@mockString({ "length": 8, "chars": "asv" })',
}
则name的值为随机生成的长度为8，字符包含asv的字符串。需要注意，参数对象需要符合JSON格式，目前只支持传入JSON格式
```
## 生成随机数组
```
import { Mock } from 'mock'
const template = ['@mockString', '@mockInt', '@mockBool']
Mock.mockArray(template) // 生成随机长度为3的数组，第一个为随机字符串，第二个为随机整数，第三个为随机布尔值
```
生成数组与生成对象同理，也可以使用@调用对应的生成数据方法时也可以传入参数
数组还可以传入第二个参数count，表示生成多个模板数组，比如
```
const template = [1]
Mock.mockArray(template, 3) // 生成[1,1,1]
```

## 生成随机手机号码

* 生成随机生成手机号码
* @returns 一个随机生成手机号码
```
import { Mock } from 'mock'
Mock.mockPhoneNumber()
```

## 生成随机身份证号码
* 生成随机生成身份证号码
* @returns 一个随机生成身份证号码
```
import { Mock } from 'mock'
Mock.mockIdCardNumber()
```
## 自定义规则生成
```
import { Mock } from 'mock'
const customMockFn = () => 'mocked'
Mock.addCustomMock('customFn', customMockFn) // 添加自定义规则
Mock.customFn() // 调用自定义规则，生成'mocked'
```