# 丰羽作业 mock数据

![coverage](https://img.shields.io/badge/coverage-100%25-green)

## First

- 灵感来源于mock.js
- 这是一个 生成Mock数据的 TypeScript库。它包含了一些生成随机数据的方法，如 string、number、boolean、date、time、array 等。  
- 其中 string 方法生成指定长度和字符集的字符串，number 方法生成指定范围的整数，boolean 方法生成随机的布尔值，date 方法生成指定范围内的日期，time 方法生成当前时间的字符串表示，array 方法生成指定长度和元素生成器的数组。
- 此外，还有 template、templateArray、templateObject 方法，用于生成模板数据。其中 template 方法将模板字符串中的占位符替换为随机数据，templateArray 方法将模板数组中的每个元素都进行模板替换，templateObject 方法将模板对象中的每个属性的键和值都进行模板替换。最后，还有 define 方法，用于自定义生成器。
- 最后  **所有相关函数均存在** 完善的ts类型推导和jsdoc注释，在README中不再详细介绍入参出参
  
## Reference

- [丰羽作业 mock数据](#丰羽作业-mock数据)
  - [First](#first)
  - [Reference](#reference)
  - [started  `mock-data`](#started--mock-data)
    - [step1 下载](#step1-下载)
    - [step2 链接](#step2-链接)
    - [step3 使用](#step3-使用)
  - [Generator](#generator)
  - [生成基础类型数据](#生成基础类型数据)
  - [生成复杂类型数据](#生成复杂类型数据)
  - [生成自定义数据类型](#生成自定义数据类型)
  - [生成模板数据](#生成模板数据)

## started  `mock-data`

- 目前还没发包，所以可能需要手动下载库

### step1 下载

``` git
git clone https://github.com/liu839/mockFunc.git
```

### step2 链接

``` npm
npm link <mockData文件夹绝对路径>
```

### step3 使用


``` ts
import { Mock, mockNumber, mockText, mockDate } from 'mock-data'
const mock = new Mock()
mock.string() //某个字符串

mock.template('@ID') // 生成id 可以使用所有生成器
mock.template('???@time???') // ???某个时间???

mock.define('myString', ()=>666)
mock.template('@myString') // 666 自定义生成器

mock.templateObject({
  id:"@ID",
  name:"王@myString"
}) // =>{ id:身份证号,name:王666 }

mock.templateArray(['@time','这是浮点数@floatNum???']) // =>[某个时间,这是浮点数<某个浮点数>???]

mock.array(100,
  ()=>mock.template('@myString'),  //=>666
  mockNumber.natural, //某个自然数
  ()=> mockText.text({ poolKey:'alpha' })) // 某个字符串,只包含大小写字母
  ()=>mock.template('我的id是@ID, 现在是@time'), //生成对应模板的字符串
///生成一个数组,数据量为100,生成的数据为这四个生成器随机生成

//mockData内部对某些基本迭代器进行了基本封装,传入了某些默认参数
//类似 @time => mockData.dateTimeString
mock.array(100,mockData.dateTimeString)
//效果等同于
mock.array(100,()=>mock.template('@time'))
```

## Generator

base文件夹内有四类自带的生成器

- mockBoolean
  - randomBool
- mockDate
  - randomDate
  - dateString
  - timeString
  - dateTimeString
- mockNumber
  - intNum
  - natural
  - floatNum
- mockText
  - character
  - text
  - phone
  - ID

- TODO：所有生成器均可在模板中使用@<Generator函数名>直接使用,不能传入函数参数，以后再~~抄一下~~优化
- TODO：额外注意template函数返回值是字符串，不是函数返回值类型（考虑匹配全字符串就是一个key命中的时候映射实际函数）

## 生成基础类型数据

```ts
  import { Mock } from 'mock-data'
  const mock = new Mock()
  mock.string() //某个字符串
  mock.boolean() //某个布尔值
  mock.number() //某个数字
  mock.date() //某个日期 Date格式
  mock.time() //某个时间 yyyy-MM-dd HH:mm:ss 格式

  // mock.template('@<Generator函数名>')可以返回对应数据的字符串
```

## 生成复杂类型数据

```ts
  import { Mock } from 'mock-data'
  const mock = new Mock()
  const stringArray = mock.array() // => 3~7个字符串组成的数组
  const stringObject = mock.templateObject({
    '@string': '@string'
  }) // => {key:value}的一个随机对象，key为某个字符串,value为某个字符串


```

## 生成自定义数据类型

```ts
  import { Mock } from 'mock-data'


  //我需要一个uuid，格式是5个随机字母-5个随机数字-时间（格式化为 时：分：秒 月 年）的整体字符串
  const uuid = ()=> `${Mock.string(5)}-${Mock.number(10000, 50000)}-${Mock.date().format('HH:mm:ss MM yyyy')}`

  //生成的这个mock示例将可以模板格式化@uuid
  const mock = new Mock({uuid})

  const randomUuid = mock.template('@uuid') //对应格式的字符串
```

## 生成模板数据

```ts
  // 这个文件抛出了一个方法，生成一个1000~5000数据量的模板数据，可以用来对接列表接口
  import { Mock } from 'mock-data'
  import { chunk } from 'lodash'

  const uuid = ()=> `${Mock.string(5)}-${Mock.number(10000, 50000)}-${Mock.date().format('HH:mm:ss MM yyyy')}`

  const mock = new Mock({uuid})

  const genData = ()=>{
    return mock.templateObject({
      key: '@uuid', //uuid
      name: '@string', //某个字符串
      now: '@time', // 固定格式的时间字符串
      hasSomething: mock.boolean() //不能使用@boolean, 所有模板生成的为纯字符串，需要原始格式的要把原函数在这里执行
      someTags: mock.array(mock.number(5,10), mock.string) //5~10个字符串的数组
    })
  }
  
  const data = mock.array(mock.number(1000,5000), genData)

  export const getResponse = ({pagesize = 10,pageNum = 1})=>{
    return {
      list: chunk(data, data.length/pagesize)[pageNum - 1],
      total: data.length，
    }
  }
```
