const { parseJSON } = require('./json_parser');

describe('parseJSON', () => {
  test('parses a valid JSON string', () => {
    const jsonString = '{"name": "John Doe", "age": 30}';
    const expectedObject = { name: 'John Doe', age: 30 };
    expect(parseJSON(jsonString)).toEqual(expectedObject);
  });

  test('handles invalid JSON string', () => {
    const invalidJsonString = '{"name": "John Doe", age: 30}';
    expect(parseJSON(invalidJsonString)).toBeNull();
  });

  test('parses a JSON string with different data types', () => {
    const jsonString = '{"name": "Jane", "age": 25, "isStudent": true, "scores": [80, 90, 85], "nested": {"a": 1, "b": [2, 3]}}';
    const expectedObject = { name: 'Jane', age: 25, isStudent: true, scores: [80, 90, 85], nested: { a: 1, b: [2, 3] } };
    expect(parseJSON(jsonString)).toEqual(expectedObject);
  });

  test('parses an empty JSON string', () => {
    const emptyJsonString = '{}';
    expect(parseJSON(emptyJsonString)).toEqual({});
  });
});
