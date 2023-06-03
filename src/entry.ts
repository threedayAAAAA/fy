import { MockNumber, MockString, MockBoolean, MockDate, MockTime } from './base'
import { MockObject, MockArray, MockCustom, MockTemplate } from './complex'

interface MockOptions {
    [key: string]: any;
}
interface MockData {
  [key: string]: any;
}

export const generate = (type: string, options?: MockOptions, count: number = 1): (string | number | boolean | MockData)[] | (string | number | boolean | MockData) => {
  const results = [];
  // 支持生成大量数据，例如生成 1000 条数据
  for (let i = 0; i < count; i++) {
    switch (type) {
      case "string":
        results.push(MockString.string(options));
        break;
      case "number":
        results.push(MockNumber.int(options));
        break;
      case "boolean":
        results.push(MockBoolean.bool());
        break;
      case "date":
        results.push(MockDate.date(options));
        break;
      case "time":
        results.push(MockTime.time(options));
        break;
      case "array":
        results.push(MockArray.array(options));
        break;
      case "object":
        results.push(MockObject.obj(options));
        break;
      case "template":
        results.push(MockTemplate.template(options));
        break;
      case "custom":
        results.push(MockCustom.custom(options));
        break;
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  }
  return count === 1 ? results[0] : results;
}