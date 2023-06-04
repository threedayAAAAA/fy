### Mock

- 支持生成随机字符串、数字、布尔值、日期、时间等基本数据类型。
- 支持生成对象、数组等复杂数据类型。
- 支持自定义数据类型。
- 支持生成符合特定规则的数据，生成指定范围内的数字、指定长度的字符串、指定格式的日期等；
- 支持根据数据模板生成数据，根据一个 JSON 模板生成符合该模板的数据。

具体使用文档如下：

##### 1.生成基本数据类型

mockData.randomBase(type: string): string|number|boolean

```ts
import {MockData} form 'mock';

const mockData = new MockData();
//生成字符串
mockData.randomBase('string');
//生成整数
mockData.randomBase('integer');
//生成自然数
mockData.randomBase('natural');
//生成浮点数
mockData.randomBase('float');
//生成布尔值
mockData.randomBase('boolean');
//生成日期
mockData.randomBase('date');
//生成时间
mockData.randomBase('time');
//生成null
mockData.randomBase('null');
//生成undefined
mockData.randomBase('undefined');
```

##### 2.生成自定义（具有特定意义）数据类型

mockData.randomCustom(type: string, config?: Config): string|number

```ts
import {MockData} form 'mock';

const mockData = new MockData();
//生成身份证
mockData.randomCustom('idCard');
//生成手机号
mockData.randomCustom('phone');
//生成指定文字类型的字符串 '生日'
mockData.randomCustom('string', {type: 'cn'});
//生成uuid，数据类型为number|string
mockData.randomCustom('uuid', {type: 'number'});
//生成邮箱，邮箱类型
mockData.randomCustom('email', {suffix: 'qq.com'});
//生成ip，ipv4 ipv6 both
mockData.randomCustom('ip', {type: 'both'});
//生成域名
mockData.randomCustom('domain');
//生成url
mockData.randomCustom('url');
//生成英文姓名en|cn
mockData.randomCustom('name', {type: 'en'});
//生成指定正则的数据 'xG5'
mockData.randomCustom('regexp', {reg: '/[a-z][A-Z][0-9]/'});
```

##### 3.生成符合特定规则的数据

mockData.randomSpecial(type: string, config: Config): string|number

```ts
import {MockData} form 'mock';

const mockData = new MockData();
//生成指定长度范围字符串
mockData.randomSpecial('string', {min: 0, max: 10});
//生成指定长度字符串
mockData.randomSpecial('string', {len: 6});
//生成指定范围数字
mockData.randomSpecial('number', {min: 0, max: 10});
//生成指定格式日期 todo起始
mockData.randomSpecial('date', {pattern: 'yyyy-MM-dd HH:mm:ss'});
//生成枚举值
mockData.randomSpecial('enum', {enum: ['男', '女']});
//生成时间戳
mockData.randomSpecial('timeStamp', {start：1612108800000, end: 1614527999999});
```

##### 4.生成复杂数据类型的数据

mockData.randomComplex(type: 'array'|'object', config?: Config): array|object

```ts
import {MockData} form 'mock';

const mockData = new MockData();
//生成随机类型数组 随机长度  或指定长度范围min max
mockData.randomComplex('array');
//生成指定类型数组 指定长度  或指定长度范围min max ['1', '2']
mockData.randomComplex('array', {len: 2, item: {type: 'string'}});
//生成随机生成key值对象
mockData.randomComplex('object');
//生成指定key值对象
mockData.randomComplex('object', {properties: {id: {type: 'string'}}});
```

##### 5.根据mock模板生成js对象

mockData.jsonData(config: Config): array|object

生成大量数据也可根据模板进行配置数组

```ts
import {MockData} form 'mock';

const mockData = new MockData();

//key值为形成对象的key，json中的value配置的对象，type为形成的数据类型，min最小值，max最大值，len为长度，properties为对象内容的配置，item为数组内容的配置。
const objectJson = {
    "user": {
        "type": "object",
        "properties": {
            "id": {
                "type": "number"
            },
            "hobbies": {
                "type": "array",
                "len": 4,
                "item": {
                    "type": "string",
                }
            }
        }
    }
}

// 更清晰的模板 但需要解析模板 可能无法实现
const simpleJson = {
    code: 0,
    data: {
      "list|0-11": [ // 生成满足下列对象模板的0-11之间的数组
        {
          companyID: "@uuid(1, 100)", //生成uuid类型范围在1-100之间
          email: "@cword(1,20)", //
          isCurrentUser: "@boolean()", //生成布尔类型
          loginTime: "@date('yyyy-MM-dd')", //生成满足yyyy-MM-dd格式的日期
        },
      ],
      total: "@natural(1, 100)", //生成自然数
    }
};

const config = JSON.parse(objectJson);
mockData.jsonData(config);
```

