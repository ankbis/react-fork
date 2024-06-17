import { parseJSON, JsonParseError } from '../src';

describe('JSON parser', () => {
  test('parses null', () => {
    expect(parseJSON('null')).toEqual({ type: 'null', value: null, pos: 0, end: 4 });
  });

  test('parses boolean', () => {
    expect(parseJSON('true')).toEqual({ type: 'boolean', value: true, pos: 0, end: 4 });
    expect(parseJSON('false')).toEqual({ type: 'boolean', value: false, pos: 0, end: 5 });
  });

  test('parses number', () => {
    expect(parseJSON('42')).toEqual({ type: 'number', value: 42, pos: 0, end: 2 });
    expect(parseJSON('-3.14')).toEqual({ type: 'number', value: -3.14, pos: 0, end: 5 });
    expect(parseJSON('6.02e23')).toEqual({ type: 'number', value: 6.02e23, pos: 0, end: 7 });
  });

  test('parses string', () => {
    expect(parseJSON('"hello"')).toEqual({ type: 'string', value: 'hello', pos: 0, end: 6 });
    expect(parseJSON('"hello\\nworld"')).toEqual({ type: 'string', value: 'hello\nworld', pos: 0, end: 13 });
  });

  test('parses array', () => {
    expect(parseJSON('[]')).toEqual([]);
    expect(parseJSON('[1, 2, 3]')).toEqual([
      { type: 'number', value: 1, pos: 1, end: 2 },
      { type: 'number', value: 2, pos: 4, end: 5 },
      { type: 'number', value: 3, pos: 7, end: 8 },
    ]);
    expect(parseJSON('[true, false, null]')).toEqual([
      { type: 'boolean', value: true, pos: 1, end: 5 },
      { type: 'boolean', value: false, pos: 7, end: 12 },
      { type: 'null', value: null, pos: 14, end: 18 },
    ]);
  });

  test('parses object', () => {
    expect(parseJSON('{}')).toEqual({});
    expect(parseJSON('{"foo": 42, "bar": true}')).toEqual({
      foo: { type: 'number', value: 42, pos: 8, end: 10 },
      bar: { type: 'boolean', value: true, pos: 18, end: 22 },
    });
    expect(parseJSON('{"a": 1, "b": [2, 3], "c": {"d": 4}}')).toEqual({
      a: { type: 'number', value: 1, pos: 6, end: 7 },
      b: [
        { type: 'number', value: 2, pos: 12, end: 13 },
        { type: 'number', value: 3, pos: 15, end: 16 },
      ],
      c: {
        d: { type: 'number', value: 4, pos: 23, end: 24 },
      },
    });
  });

  test('throws error on invalid input', () => {
    expect(() => parseJSON('invalid')).toThrowError(JsonParseError);
    expect(() => parseJSON('{"a": 1, "b": 2,}')).toThrowError(JsonParseError);
    expect(() => parseJSON('[1, 2, 3,]')).toThrowError(JsonParseError);
  });
});
