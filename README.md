使用 `pnpm i`安装依赖
使用 `pnpm test`执行单测

### 如何使用
```
export const generate = (type: string, options?: MockOptions, count: number = 1)
```
入口文件中暴露了生成mock数据的方法，参数有三个。type传入生成数据的类型，有string, number, boolean, date, time, array, object, template, custom; options 传入数据的约束条件，比如string类型时可以传入length，charts， 约束生成随机字符串的长度和字符； count 传入随机生成数据的条数，默认为一条。

使用时先import该函数
```
import { generate } from '../entry';
```
使用时, 例如想要生成长度为5的随机字符串：
```
const result = generate('string', { length: 5 })
```
得到的result就为一个string类型的随机字符。
```
const result = generate('string', { length: 5 }, 5)
```
得到的result就为一个string[]类型的字符数组，长度为5

其中第一个参数type是必传项，options和count为非必传。options每一个类型都有对应的默认值，比如生成随机string时，未指定长度和字符集时默认长度为10和全字符。count不传时默认为1。

### 如何生成随机的基本类型数据
## 生成随机的string
调用```generate("string")```

* 生成一个指定长度和字符集的随机字符串
* @param options 选项对象，包括以下属性：
*   - length: 字符串长度，默认为 10
*   - chars: 字符集，默认为包含大小写字母和数字的字符串
* @returns 一个随机字符串

```
export const string = (options?: { length?: number, chars?: string }): string
```
## 生成随机的number
调用```generate("number")```

* 生成一个指定范围内的随机整数
* @param options 选项对象，包括以下属性：
*   - min: 最小值，默认为 0
*   - max: 最大值，默认为 100
* @returns 一个随机整数

```
export const int = (options?: { min?: number; max?: number }): number
```
## 生成随机的boolean
直接调用```generate("bool")```,不需要传入参数

* 生成一个随机布尔值
* @returns 一个随机布尔值

```
export const bool = (): boolean
```

## 生成随机date数据
调用```generate("date")```

 * 生成一个随机日期字符串
 * @param options 选项对象，包括以下属性：
 *   - format: 日期格式，默认为 'yyyy-MM-dd'
 *   - min: 最小日期，默认为 2000 年 1 月 1 日
 *   - max: 最大日期，默认为当前日期
 * @returns 一个随机日期字符串

```
export const date = (options?: { format?: string, min?: Date, max?: Date }): string
```
format的传入是一个字符串，yyyy代表年，MM代表月，dd代表日，HH代表小时，mm代表分钟，ss代表秒，SSS代表毫秒。比如传入的format为```{ format: 'yyyy年MM月dd日' }```, 输出的随机日期为一个字符串，例如```2023年06月03日```。

### 如何生成随机的复杂类型数据
## 生成随机对象数据
调用```generate("object")```
* 生成一个包含指定属性和类型的随机对象
* @param options 选项对象，包括以下属性：
*    - type: 属性值类型
*    - options: 生成属性值的选项对象
* @returns 一个包含指定属性和类型的随机对象
type传入'object',第二个参数传入生成对象的键名，与键的类型type、约束条件options，如下例子：
```
generate("object", {
  name: { type: "string", options: { length: 5 } },
  age: { type: "number", options: { min: 18, max: 30 } },
  isMale: { type: "boolean" },
})
```

## 生成随机数组
调用```generate("array")```
* 生成一个指定长度和类型的随机数组
* @param options 选项对象，包括以下属性：
*   - length: 数组长度，默认为 10
*   - type: 数组元素类型，默认为 'string'
* @returns 一个随机数组
```
export const array = (options?: { length?: number, type?: string }): (string | number | boolean | MockData)[]
```

## 生成随机手机号码

* 生成随机生成手机号码
* @returns 一个随机生成手机号码
```
export const phone = (): string
```
