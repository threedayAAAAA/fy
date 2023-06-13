### Mock

- 支持生成随机字符串、数字、布尔值、日期、时间等基本数据类型。
- 支持生成对象、数组等复杂数据类型。
- 支持自定义数据类型。
- 支持生成符合特定规则的数据，生成指定范围内的数字、指定长度的字符串、指定格式的日期等；
- 支持根据数据模板生成数据，根据一个 JSON 模板生成符合该模板的数据。

具体使用文档如下：

##### 1.生成基本数据类型

可通过调用函数生成，也可通过模板字符串生成

```ts
import randomBase form 'randomBase'
import Mock from 'mock'
//生成字符串
randomBase.string()
Mock.mock('@string()')
//生成整数
randomBase.integer();
Mock.mock('@integer()')
//生成自然数
randomBase.natural();
Mock.mock('@natural()')
//生成浮点数
randomBase.float();
Mock.mock('@float()')
//生成布尔值
randomBase.boolean();
Mock.mock('@boolean()')
//生成日期
randomBase.date();
Mock.mock('@date()')
//生成现在的时间
randomBase.now();
Mock.mock('@now()')
//生成时间戳
randomBase.timestamp();
Mock.mock('@timestamp()')
```

##### 2.生成自定义（具有特定意义）数据类型

```ts
import randomBase form 'randomBase'
import Mock from 'mock'

//生成身份证
randomBase.idCard();
Mock.mock('@idCard()')
//生成手机号
randomBase.phone();
Mock.mock('@phone()')
//生成邮箱，邮箱类型，可配置指定后缀，不填写随机生成
randomBase.email('qq.com');
Mock.mock('@email()')
//生成小写英文单词2-4位之间单词
randomBase.word(2,4);
//生成小写英文单词4位之间单词
Mock.mock('@word(4)')
//生成中文2-4个字
randomBase.cword(2,4);
//生成中文4个字
Mock.mock('@cword(4)')
//生成枚举值，输入参数中随机选取一个
randomBase.oneof('1', '2');
Mock.mock('@oneof(abc,def,hij)')
```

##### 3.生成符合特定规则的数据

```ts
import randomBase form 'randomBase'
import Mock from 'mock'

const mockData = new MockData();
//生成指定长度范围字符串，生成小写字母，长度在1-10之间 'abc'
randomBase.string('lower', 1, 10);
Mock.mock('@string(lower,1,10)')
//生成指定长度字符串
randomBase.string(6);
//生成整数 min max 生成78-999之间的整数
randomBase.integer(78,999);
Mock.mock('@integer(78)') // 生成大于78的整数
//生成浮点数 生成整数位为3-5之间，小数位为2位的浮点数 4.23
randomBase.float(3,5,2);
//生成现在的时间 按照指定模板返回时间字符串
randomBase.now('yyyy-MM-dd HH:mm:ss');
//生成时间戳 start end
const start = new Date('2022-01-01T00:00:00.000Z');
const end = new Date('2022-12-31T23:59:59.999Z');
randomBase.timestamp(start,end);
```

##### 4.生成复杂数据类型的数据

```ts
import randomComplex form 'randomComplex'
import Mock from 'mock'

//生成随机类型数组 随机长度  或指定长度范围min max
randomComplex.array(3,8);
//生成指定类型数组 指定长度  指定生成格式
randomComplex.array('@string()',3,8);
//生成随机生成key值对象
randomComplex.object(3);
//生成指定key值对象
randomComplex.object({
    name: '@string()',
    'childs|4': '@cword()'
});
//生成的数据为
{
    name: '2445',
    childs: ['十点','十点','发说','第三方']
}
```

##### 5.根据mock模板生成js对象

生成大量数据也可根据模板进行配置数组

```ts
import Mock from 'mock'

// json模板
const json = `{
            "name": "@string(upper,10)",
            "age": "@natural(0,100)",
            "isMale": "@boolean()",
            "phone": "@phone()",
            "email": "@email()",
            "hobbies|3": "@string(5)"
          }`;
Mock.jsonToMock(json);

// 根据配置对象生成mock数据
Mock.mock(JSON.parse(json));
```

##### 6.自定义生成类型

生成大量数据也可根据模板进行配置数组

```ts
import Mock from 'mock'

//不能自定义已存在的方法
//定义
Mock.extend('uuid', (val: number) => val + 1)
//使用
Mock.mock('@uuid(1)');
```

