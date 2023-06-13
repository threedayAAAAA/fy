### 使用

```ts
import { M } from 'mock';

const m = M.array(M.templateObject({
  id: M.number(10000, 1000000),     	// 返回1 ~ 100内的id.
  name: M.string(6),                	// 返回长度为6的随机字符串.
  sex: M.bool(),                    	// 随机返回true or false.
  city: M.const('shenzhen'),          	 	// 常量.
  work: M.oneOf(['DESC', 'ASC'])      	// 枚举
}), 2);                               // 长度为2的数组

m.mock();
```

生成结果如下：

```ts
[{
	id: 75,
	name: 'mU7RTB',
	sex: false,
	city: 'shenzhen',
	work: 'DESC'
}, {
	id: 3,
	name: 'jWuKxX',
	sex: true,
	city: 'shenzhen',
	work: 'ASC'
}]
```

### 生成简单数据

```tsx
import { M } from 'mock'
M.string() //随机字符串
M.bool() //随机布尔值
M.number() //随机数字
M.date() //随机日期
M.phone() // 随机电话号码
M.email() // 随机邮箱
M.idCard() // 随机身份号
```

### 生成复杂数据类型

```tsx
import { M } from 'mock'
// 生成数组
M.array(M.string()).mock()

// 生成对象
M.templateObject({name: M.string()}).mock()

```

### 生成自定义数据类型

```tsx
import { M } from 'mock'

const uuid = () => `test${M.string(5).mock()}-${M.phone().mock()}`

const randomUuid = () => {
    return M.apply(uuid);
}
```

### 按模板生成数据

```tsx
import { M } from 'mock'

const m = M.array(M.templateObject({
  id: M.number(100, 1000000),     	
  name: M.string(6),                	
  sex: M.oneOf(['male', 'female']),                    
  city: M.constant('shenzhen'),          
  work: M.oneOf(['DESC', 'ASC']),
  date: M.date('YYYY-MM-DD hh:mm:ss'),
  bool: M.bool(0.7),
  phone: M.phone(),
  idCard: M.idCard(),
  email: M.email(),
  uuid: randomUuid(),
}), 2).mock();  
```



### API & Mocker

- **M.bool()**

```ts
M.bool().mock(); // 随机返回真假值
```

- **M.number(min[, max = min, fixed = 0])**

```ts
M.number(1, 9, 2).mock(); // 4.71 返回随机数字，含浮点数
```

- **M.string([len = 8])**

```ts
M.string(6).mock(); // `Qv_teE` 可选参数1为选择字符数目，默认10，可选参数2为限定字符串内容
```

- **M.constant(value)**

```ts
M.const('hello').mock(); // `hello` 
M.const(null).mock(); // got null
```

- **M.oneOf(valueArray)**

```ts
M.oneOf(['深圳', '杭州']).mock(); // 深圳
```

- **M.Date([start, end, format])**

  ```
  M.Date(start, end, format).mock(); // 可选前2个参数为限定时间范围，参数1，开始时间，参数2，结束时间。可选参数3为格式化样式yyyyMMdd hh:mm:ss，输出为string，无参数3则为Date类型。
  ```

- **M.array(mocker[, min = 20, max = min])**


```ts
// 返回一个长度为10到20的字符串数组
M.array(VT.string(4), 10, 20);.mock(); 
```

- **M.templateObject(mockerObject)**

```ts
// 返回对象.
M.templateObject({
  name: M.string(10),
  id: M.number(10000, 1000000),
  sex: M.bool(),
  city: 'hz',
}).mock();
```

- **M.apply(Function)**

```ts
// 返回一个随机数
M.apply(() => Math.random()).mock(); 
```