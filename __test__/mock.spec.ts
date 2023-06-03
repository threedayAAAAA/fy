import { generate } from "../src/entry"

describe("Mock", () => {
  describe("generateString", () => {
    // 测试默认长度
    it('should generate a string of default length 10', () => {
      const result = generate('string')
      expect(result).toHaveLength(10)
    })

    // 测试指定长度
    it('should generate a string of specified length', () => {
      const result = generate('string', { length: 5 })
      expect(result).toHaveLength(5)
    })

    // 测试指定字符集
    it('should generate a string using specified characters', () => {
      const result = generate('string', { chars: 'abc' })
      expect(result).toMatch(/^[abc]{10}$/)
    })

    // 测试指定长度和字符集
    it('should generate a string using specified length and characters', () => {
      const result = generate('string', { length: 5, chars: 'abc' })
      expect(result).toMatch(/^[abc]{5}$/)
    })
  });

  describe("generateNumber", () => {
    // 测试默认范围
    it('should generate an integer between 0 and 100 by default', () => {
      const result = generate('number')
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThanOrEqual(100)
    })

    // 测试指定范围
    it('should generate an integer between specified min and max', () => {
      const result = generate('number', { min: 10, max: 20 })
      expect(result).toBeGreaterThanOrEqual(10)
      expect(result).toBeLessThanOrEqual(20)
    })

    // 测试仅指定最小值
    it('should generate an integer with specified min and default max', () => {
      const result = generate('number', { min: -10 })
      expect(result).toBeGreaterThanOrEqual(-10)
      expect(result).toBeLessThanOrEqual(100)
    })

    // 测试仅指定最大值
    it('should generate an integer with specified max and default min', () => {
      const result = generate('number', { max: 200 })
      expect(result).toBeGreaterThanOrEqual(0)
      expect(result).toBeLessThanOrEqual(200)
    })
  });

  describe("generateBoolean", () => {
    // 测试返回格式为布尔
    it("should generate a boolean", () => {
      const result = generate("boolean");
      expect(typeof result).toBe("boolean");
    });
  });

  describe("generateDate", () => {
    //  测试默认格式
    it('should generate a date string in the default format', () => {
      const result = generate('date')
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })

    // 测试指定格式
    it('should generate a date string in the specified format', () => {
      const result = generate('date', { format: 'yyyy年MM月dd日' })
      expect(result).toMatch(/^\d{4}年\d{2}月\d{2}日$/)
    })

    // 测试指定日期范围
    it('should generate a random date string within the specified range', () => {
      const minDate = new Date(2023, 0, 1);
      const maxDate = new Date(2023, 11, 31);
      const dateString = generate('date', { min: minDate, max: maxDate });
      const dateTimestamp = new Date(dateString as string).getTime();
      expect(dateTimestamp).toBeGreaterThanOrEqual(minDate.getTime());
      expect(dateTimestamp).toBeLessThanOrEqual(maxDate.getTime());
    });
  });

  describe("generateTime", () => {
    // 测试默认情况
    it('should generate a time string in the format of HH:mm:ss', () => {
      const result = generate('time')
      expect(result).toMatch(/^\d{2}:\d{2}:\d{2}$/)
    })

    // 测试指定最大小时
    it('should generate a time string with specified hours, minutes, and seconds', () => {
      const result = generate('time', { hours: 12, minutes: 30, seconds: 45 })
      expect(result).toMatch(/^\d{2}:\d{2}:\d{2}$/)
      const [hour, minute, second] = result.split(':').map(Number)
      expect(hour).toBeLessThanOrEqual(11)
      expect(minute).toBeLessThanOrEqual(29)
      expect(second).toBeLessThanOrEqual(44)
    })

    // 测试指定最大分钟
    it('should generate a time string with specified hours only', () => {
      const result = generate('time', { hours: 6 })
      expect(result).toMatch(/^\d{2}:\d{2}:\d{2}$/)
      const [hour] = result.split(':').map(Number)
      expect(hour).toBeLessThanOrEqual(5)
    })

    // 测试指定最大秒
    it('should generate a time string with specified minutes only', () => {
      const result = generate('time', { minutes: 30 })
      expect(result).toMatch(/^\d{2}:\d{2}:\d{2}$/)
      const [hour, minute] = result.split(':').map(Number)
      expect(hour).toBeLessThanOrEqual(23)
      expect(minute).toBeLessThanOrEqual(29)
    })

    // 测试同时指定最大时分秒
    it('should generate a time string with specified seconds only', () => {
      const result = generate('time', { seconds: 45 })
      expect(result).toMatch(/^\d{2}:\d{2}:\d{2}$/)
      const [hour, minute, second] = result.split(':').map(Number)
      expect(hour).toBeLessThanOrEqual(23)
      expect(minute).toBeLessThanOrEqual(59)
      expect(second).toBeLessThanOrEqual(44)
    })
  });

  describe("generateArray", () => {
    // 测试默认数组长度
    it('should generate an array of default length 10', () => {
      const result = generate('array')
      expect(result).toHaveLength(10)
    })

    // 测试指定数组长度
    it('should generate an array of specified length', () => {
      const result = generate('array', { length: 5 })
      expect(result).toHaveLength(5)
    })

    // 测试指定数组类型
    it('should generate an array of specified type', () => {
      const result = generate('array', { type: 'number' })
      expect(result).toEqual(expect.arrayContaining(result.map(Number)))
    })
  });

  describe("generateObject", () => {
    // 测试对象属性的类型
    it("should generate an object with default properties and types", () => {
      const result = generate("object", {
        name: { type: "string" },
        age: { type: "number" },
        isMale: { type: "boolean" },
      });
      expect(typeof result.name).toBe("string");
      expect(typeof result.age).toBe("number");
      expect(typeof result.isMale).toBe("boolean");
    });

    // 测试对象元素指定规则
    it("should generate an object with specified properties and types", () => {
      const result = generate("object", {
        name: { type: "string", options: { length: 5 } },
        age: { type: "number", options: { min: 18, max: 30 } },
        isMale: { type: "boolean" },
      });
      expect(typeof result.name).toBe("string");
      expect(result.name.length).toBe(5);
      expect(typeof result.age).toBe("number");
      expect(result.age).toBeGreaterThanOrEqual(18);
      expect(result.age).toBeLessThanOrEqual(30);
      expect(typeof result.isMale).toBe("boolean");
    });
  });

  describe('generateTemplate', () => {
    // 测试字符串
    it('should generate string', () => {
      const data = generate("template", { template: 'string' });
      expect(typeof data).toBe('string');
    });

    // 测试数字
    it('should generate number', () => {
      const data = generate("template", { template: 'number' });
      expect(typeof data).toBe('number');
    });

    // 测试布尔
    it('should generate boolean', () => {
      const data = generate("template", { template: 'boolean' });
      expect(typeof data).toBe('boolean');
    });

    // 测试数组
    it('should generate array', () => {
      const data = generate("template", { template: ['string'] });
      expect(Array.isArray(data)).toBe(true);
      expect(data.length).toBe(10);
      expect(typeof data[0]).toBe('string');
    });

    // 测试对象模板
    it('should generate object', () => {
      const data = generate("template", {
        template: {
          name: 'string',
          age: 'number',
          isMale: 'boolean',
        },
      });
      expect(typeof data.name).toBe('string');
      expect(typeof data.age).toBe('number');
      expect(typeof data.isMale).toBe('boolean');
    });
  });

  describe('generateCustom', () => {
    // 测试生成随机邮箱
    it('should generate a random email', () => {
      const email = generate('custom', { custom: 'mail' });
      expect(email).toMatch(/^\w{8}@(gmail|yahoo|hotmail|outlook|qq|163)\.com$/);
    });

    // 测试生成随机身份证号码
    it('should generate a random ID number', () => {
      const idNumber = generate('custom', { custom: 'id' });
      expect(idNumber).toMatch(/^\d{17}[\dX]$/);
    });

    // 测试生成随机电话号码
    it('should generate a random phone number', () => {
      const phoneNumber = generate('custom', { custom: 'phone' });
      expect(phoneNumber).toMatch(/^1[3456789]\d{9}$/);
    });

    // 测试其他自定义类型：暂不支持
    it('should throw error for unsupported type', () => {
      expect(() => generate('custom', { custom: 'unsupported' })).toThrowError(
        'Unsupported custom type: unsupported'
      );
    });
  });

  describe("generate", () => {
    // 测试支持生成大量数据
    it('should generate 1000 values without errors', () => {
      const result = generate('string', undefined, 1000)
      expect(result).toHaveLength(1000)
      expect(result).toEqual(expect.arrayContaining([expect.any(String)]))
    })
    // 测试其他类型数据：暂不支持
    it("should throw an error for unsupported type", () => {
      expect(() => generate("unsupported")).toThrowError("Unsupported type: unsupported");
    });
  });
});
