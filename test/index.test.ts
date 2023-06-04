import { describe, it, expect } from 'vitest';
import Mock from '../src';
import fs from 'fs';
import { resolve }from 'path';

describe('Mock', () => {
	const mock = new Mock();

  it('should generate a random string', () => {
    const result = mock.generate('string', { len: 10 });
    expect(typeof result).toBe('string');
    expect(result.length).toBe(10);
  });

  it('should generate a random number', () => {
    const result = mock.generate('number', { min: 0, max: 10 });
    expect(typeof result).toBe('number');
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(10);
  });

  it('should generate a random boolean', () => {
    const result = mock.generate('boolean');
    expect(typeof result).toBe('boolean');
  });

  it('should generate a random enum', () => {
    const result = mock.generate('enum', { enum: ['a', 'b', 'c'] });
    expect(typeof result).toBe('string');
    expect(['a', 'b', 'c']).toContain(result);
  });

  it('should generate a random date', () => {
    const result = mock.generate('date');
    expect(result instanceof Date).toBe(true);
  });

  it('should generate a random time', () => {
    const result = mock.generate('time');
    expect(typeof result).toBe('string');
    expect(result).toMatch(/^\d{2}:\d{2}:\d{2}$/);
  });

  it('should generate a random ID card number', () => {
    const result = mock.generate('idCard');
    expect(typeof result).toBe('string');
    expect(result).toMatch(/^\d{17}[\dX]$/);
  });

  it('should generate a random phone number', () => {
    const result = mock.generate('phone');
    expect(typeof result).toBe('string');
    expect(result).toMatch(/^1\d{10}$/);
  });

  it('should generate a random email', () => {
    const result = mock.generate('email');
    expect(typeof result).toBe('string');
    expect(result).toMatch(/^\w+@\w+\.\w+$/);
  });

  it('should generate a random array', () => {
    const result = mock.generate('array', { len: 5, item: { type: 'string', len: 10} });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(5);
    result.forEach((item: any) => {
      expect(typeof item).toBe('string');
      expect(item.length).toBe(10);
    });
  });

  it('should generate a random object', () => {
    const result = mock.generate('object', {
      properties: {
        name: { type: 'string', len: 10 },
        age: { type: 'number', min: 0, max: 100 },
        isMale: { type: 'boolean' },
        birthday: { type: 'date' },
        phone: { type: 'phone' },
        email: { type: 'email' },
        hobbies: { type: 'array', len: 3, item: { type: 'string', len: 5 } },
      },
    });
    expect(typeof result).toBe('object');
    expect(Object.keys(result).length).toBe(7);
    expect(typeof result.name).toBe('string');
    expect(result.name.length).toBe(10);
    expect(typeof result.age).toBe('number');
    expect(result.age).toBeGreaterThanOrEqual(0);
    expect(result.age).toBeLessThanOrEqual(100);
    expect(typeof result.isMale).toBe('boolean');
    expect(result.birthday instanceof Date).toBe(true);
    expect(typeof result.phone).toBe('string');
    expect(result.phone).toMatch(/^1\d{10}$/);
    expect(typeof result.email).toBe('string');
    expect(result.email).toMatch(/^\w+@\w+\.\w+$/);
    expect(Array.isArray(result.hobbies)).toBe(true);
    expect(result.hobbies.length).toBe(3);
    result.hobbies.forEach((item: any) => {
      expect(typeof item).toBe('string');
      expect(item.length).toBe(5);
    });
  });

  it('should convert JSON to mock data', () => {
    const json = `{
      "name": { "type": "string", "len": 10 },
      "age": { "type": "number", "min": 0, "max": 100 },
      "isMale": { "type": "boolean" },
      "birthday": { "type": "date" },
      "phone": { "type": "phone" },
      "email": { "type": "email" },
      "hobbies": { "type": "array", "len": 3, "item": { "type": "string", "len": 5 } }
    }`;
    const result = mock.jsonToMock(json);
    expect(typeof result).toBe('object');
    expect(Object.keys(result).length).toBe(7);
    expect(typeof result.name).toBe('string');
    expect(result.name.length).toBe(10);
    expect(typeof result.age).toBe('number');
    expect(result.age).toBeGreaterThanOrEqual(0);
    expect(result.age).toBeLessThanOrEqual(100);
    expect(typeof result.isMale).toBe('boolean');
    expect(result.birthday instanceof Date).toBe(true);
    expect(typeof result.phone).toBe('string');
    expect(result.phone).toMatch(/^1\d{10}$/);
    expect(result.phone).toMatch(/^1\d{10}$/);
    expect(typeof result.email).toBe('string');
    expect(result.email).toMatch(/^\w+@\w+\.\w+$/);
    expect(Array.isArray(result.hobbies)).toBe(true);
    expect(result.hobbies.length).toBe(3);
    result.hobbies.forEach((item: any) => {
      expect(typeof item).toBe('string');
      expect(item.length).toBe(5);
    });
  });

  it('should generate multiple mock data', () => {
    const json = `{
      "name": { "type": "string", "len": 10 },
      "age": { "type": "number", "min": 0, "max": 100 },
      "isMale": { "type": "boolean" },
      "birthday": { "type": "date" },
      "phone": { "type": "phone" },
      "email": { "type": "email" },
      "hobbies": { "type": "array", "len": 3, "item": { "type": "string", "len": 5 } }
    }`;
    const result = mock.multMock(5, json);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(5);
    result.forEach((item: any) => {
      expect(typeof item).toBe('object');
      expect(Object.keys(item).length).toBe(7);
      expect(typeof item.name).toBe('string');
      expect(item.name.length).toBe(10);
      expect(typeof item.age).toBe('number');
      expect(item.age).toBeGreaterThanOrEqual(0);
      expect(item.age).toBeLessThanOrEqual(100);
      expect(typeof item.isMale).toBe('boolean');
      expect(item.birthday instanceof Date).toBe(true);
      expect(typeof item.phone).toBe('string');
      expect(item.phone).toMatch(/^1\d{10}$/);
      expect(typeof item.email).toBe('string');
      expect(item.email).toMatch(/^\w+@\w+\.\w+$/);
      expect(Array.isArray(item.hobbies)).toBe(true);
      expect(item.hobbies.length).toBe(3);
      item.hobbies.forEach((hobby: any) => {
        expect(typeof hobby).toBe('string');
        expect(hobby.length).toBe(5);
        result.forEach((item: any) => {
          expect(typeof item).toBe('object');
          expect(Object.keys(item).length).toBe(7);
          expect(typeof item.name).toBe('string');
          expect(item.name.length).toBe(10);
          expect(typeof item.age).toBe('number');
          expect(item.age).toBeGreaterThanOrEqual(0);
          expect(item.age).toBeLessThanOrEqual(100);
          expect(typeof item.isMale).toBe('boolean');
          expect(item.birthday instanceof Date).toBe(true);
          expect(typeof item.phone).toBe('string');
          expect(item.phone).toMatch(/^1\d{10}$/);
          expect(typeof item.email).toBe('string');
          expect(item.email).toMatch(/^\w+@\w+\.\w+$/);
          expect(Array.isArray(item.hobbies)).toBe(true);
          expect(item.hobbies.length).toBe(3);
          item.hobbies.forEach((hobby: any) => {
            expect(typeof hobby).toBe('string');
            expect(hobby.length).toBe(5);
          });
        });
      });
    })
  })

  it('should convert JSON file to mock data', () => {
		const json = fs.readFileSync(resolve(__dirname, './test.json'), 'utf-8');
		const result = mock.jsonToMock(json);
    expect(typeof result).toBe('object');
    expect(Object.keys(result).length).toBe(6);
    expect(typeof result.id).toBe('string');
    expect(typeof result.name).toBe('string');
    expect(result.name.length).toBe(6);
    const {userObject, stringArray, objectArray, enumDst, userObject: {id, name, email, idCard, phone, isUse }} = result;
    expect(userObject).toBeTypeOf('object');
    expect(id).toBeTypeOf('number');
    expect(id).toBeGreaterThanOrEqual(1000);
    expect(id).toBeLessThanOrEqual(9999);
    expect(name).toBeTypeOf('string');
    expect(name).toHaveLength(2);
    expect(email).toMatch(/^\w+@\w+\.\w+$/);
    expect(idCard).toMatch(/^\d{17}[\dX]$/);
    expect(phone).toMatch(/^1\d{10}$/);
    expect(isUse).toBeTypeOf('boolean');
    expect(["SRC", "DST", "DNS", "URL"]).toContain(enumDst);
    stringArray.forEach((item: string) => {
      expect(item).toBeTypeOf('string');
      expect(item.length).toBe(10);
    });
    objectArray.forEach((item: Record<string, any>) => {
      expect(item).toBeTypeOf('object');
      const {id, name} = item;
      expect(id).toBeTypeOf('number');
      expect(name).toBeTypeOf('string');
      expect(name).toHaveLength(6);
    });
	})
	
	it('should generate multiple JSON mock data', () => {
		const json = fs.readFileSync(resolve(__dirname, './test.json'), 'utf-8');
		const result = mock.multMock(1000, json);
		expect(result).toHaveLength(1000);
	})

  it('should throw an error for unsupported type', () => {
    expect(() => mock.generate('unsupported')).toThrow('Unsupported type: unsupported');
  });
})