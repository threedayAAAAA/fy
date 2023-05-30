# 丰羽作业

## 主体
- 这是一个 生成Mock数据的 TypeScript库。它包含了一些生成随机数据的方法，如 string、number、boolean、date、time、array 等。  
- 其中 string 方法生成指定长度和字符集的字符串，number 方法生成指定范围的整数，boolean 方法生成随机的布尔值，date 方法生成指定范围内的日期，time 方法生成当前时间的字符串表示，array 方法生成指定长度和元素生成器的数组。
- 此外，还有 template、templateArray、templateObject 方法，用于生成模板数据。其中 template 方法将模板字符串中的占位符替换为随机数据，templateArray 方法将模板数组中的每个元素都进行模板替换，templateObject 方法将模板对象中的每个属性的键和值都进行模板替换。最后，还有 define 方法，用于自定义生成器。
## 生成器
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
## 使用方式
``` ts
import { Mock } from 'mock'
const mock = new Mock()
mock.template('@ID') //可以使用所有生成器
mock.template('@intNum') //某个整数
mock.template('???@time???') // ???某个时间???

mock.define('myString', ()=>666)
mock.template('@myString') // 666
```