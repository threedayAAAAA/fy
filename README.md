# Mock数据生成工具

## 简介

Mock数据生成工具是一个用于生成随机数据的工具库，可以用于前端开发中的数据模拟、接口测试等场景。它支持生成各种类型的数据，包括字符串、数字、布尔值、日期、常用数据等。

## 安装

```bash
npm install lmock
```

## 使用

### 直接调用内置数据生成函数

Mock数据生成工具提供了一些内置的数据生成函数，可以直接调用来生成随机数据。
#### 基本使用
```ts
import { randomChart } from 'lmock'

// 生成随机单个字符串
randomChart('fsdfds')
```

#### 字符串类

- `randomChart`，随机生成单个字符串，允许传入字符池

  ```ts
  // 使用默认字符池
  randomChart()

  // 指定默认字符池
  randomChart('test')
  ```

- `randomStr`，随机生成指定字符池（可以不传，默认使用内置字符池）

  ```ts
  // 指定字符池
  randomStr('test')

  // 指定范围
  randomStr(2, 8)

  // 指定字符池及范围
  randomStr('test', 2, 8)
  ```

#### 数字类

- `randomInt`，随机生成指定范围内的整数

  ```ts
  // 默认在最小和最大安全数的范围内
  randomInt()

  // 传入指定范围
  randomInt(-10, 30)
  ```

- `randomNatural`，随机生成指定范围内的自然数，即大于等于0的整数

  ```ts
  // 默认在0到最大安全数内的范围
  randomNatural()

  // 传入指定范围
  randomNatural(2, 3)
  ```

- `randomFloat`，随机生成指定范围内的浮点数，用法同上

#### 布尔值

- `randomBool`，随机生成布尔值，支持指定生成true的范围

  ```ts
  // 默认时百分之五十的概率
  randomBool()

  // 指定生成的概率
  randomBool(60)
  ```

#### 日期类

- `randomTime`，随机生成时间戳，允许指定范围

  ```ts
  // 默认范围，为1970/1/1到当前
  randomTime()

  // 指定范围，允许传入时间戳，Date，符合规范的时间字符串
  randomTime('2000/12/12', '2012/6/6')
  ```

- `randomDate`，随机生成时间，允许指定生成时间的格式，和时间范围

  ```ts
  // 默认时格式yyyy-MM-dd HH:mm:ss，时间范围为为1970/1/1到当前
  randomDate()

  // 指定时间格式
  randomDate('HH:mm')

  // 指定时间格式和范围
  randomDate('HH:mm', '2000/12/12', '2012/6/6')
  ```

#### 日常常用数据类

- `randomPhone`，随机生成手机号码

  ```ts
  randomPhone()
  ```

- `randomCid`，随机生成身份证号

  ```ts
  randomCid()
  ```

### mock数据

Mock数据生成工具支持传入各种类型的数据，会根据键名和键值，进行解析。

```ts
import Mock from 'lmock'

// 自动根据传入的模板，返回最终数据
// 会自动解析key和value
// 如下会生成，随机生成三到八位的字符串再在此基础上增加1-10之间的倍数
Mock.tempalte({
  'id|1-10': '@string(3, 8)'
})

// 支持只定义数据生成函数，可以在template中直接调用
Mock.addCusFn({
  'cusTest1': () => 'test1',
  'cusTest2': () => 'test2'
})

Mock.tempalte('@cusTest1 + @cusTest2') // test1 + test2
```
