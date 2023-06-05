## 使用

```ts
import { M } from 'mock';

const m = M.arrayOf(M.shape({
  id: M.number(10000, 1000000),     	// 返回1 ~ 100内的id.
  name: M.string(6),                	// 返回长度为6的随机字符串.
  sex: M.bool(),                    	// 随机返回true or false.
  city: M.constant('shenzhen'),          	 	// 常量.
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

## API & Mocker

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
M.constant('hello').mock(); // `hello` 
M.constant(null).mock(); // got null
```

- **M.oneOf(valueArray)**

```ts
M.oneOf(['深圳', '杭州']).mock(); // 深圳
```

- **M.Date([start, end, format])**

  ```
  M.Date(start, end, format).mock(); // 可选前2个参数为限定时间范围，参数1，开始时间，参数2，结束时间。可选参数3为格式化样式yyyyMMdd hh:mm:ss，输出为string，无参数3则为Date类型。
  ```

- **M.Time([start, end, format = 'hh:mm:ss'])**

  ```
  M.time(start, end, format).mock(); // 可选前2个参数为限定时间范围，参数1，开始时间，参数2，结束时间。可选参数3为格式化样式yyyyMMdd hh:mm:ss，输出为string
  ```

- **M.sentence([len = 10])**

  ```ts
  M.sentence(10).mock();// 可选参数1为选择字符数目，默认10，生成10位中文字符串
  ```

- **M.arrayOf(mocker[, min = 20, max = min])**

```ts
// 返回一个长度为10到20的字符串数组
M.arrayOf(VT.string(4), 10, 20);.mock(); 
```

- **M.shape(mockerObject)**

```ts
// 返回对象.
M.shape({
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