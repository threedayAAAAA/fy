import type {MockOptions} from './type';
import PrimitiveData from './primitive';

interface MockData {
  [key: string]: MockData;
}

class Mock extends PrimitiveData {

  constructor() {
    super();
  }

  public generate(type: string, options?: MockOptions): any {
    switch (type) {
      case "string":
        return this.randomString(options?.len);
      case "number":
        return this.randomNumber(options?.min, options?.max);
      case "boolean":
        return this.randomBoolean();
      case "enum":
        return this.randomEnum(options?.enum || []);
      case "date":
        return this.randomDate();
      case "time":
        return this.randomTime();
      case "idCard":
        return this.randomIdCard();
      case "phone":
        return this.randomPhone();
      case "email":
        return this.randomEmail();
      case "array":
        return this.randomArray(options);
      case "object":
        return this.randomObject(options?.properties);
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  }

  public jsonToMock(json: string): MockData {
    const obj = {properties: JSON.parse(json)};
    const res = this.generate('object', obj as MockOptions);
    return res;
  }

  public multMock(len: number, json: string): MockData[] {
    const res = [];
    for(let i = 0; i < len; i++) {
      res.push(this.jsonToMock(json))
    }
    return res;
  }

  private randomArray(options?: MockOptions): any[] {
    const length = options?.len || 10;
    const type = options?.item?.type || "string";
    const result = [];
    for (let i = 0; i < length; i++) {
      result.push(this.generate(type, options?.item));
    }
    return result;
  }

  private randomObject(options?: MockOptions): MockData {
    const result: MockData = {};
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        result[key] = this.generate(options[key].type, options[key]);
      }
    }
    return result;
  }
}

export default Mock; 