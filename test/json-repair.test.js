const repairJSON = require('../scripts/json-repair');

test('repairs invalid JSON', () => {
  const invalidJSON = '{"key": "value",,}';
  const expectedJSON = '{"key":"value"}';
  expect(repairJSON(invalidJSON)).toBe(expectedJSON);
});

test('handles valid JSON', () => {
  const validJSON = '{"key": "value"}';
  expect(repairJSON(validJSON)).toBe(validJSON);
});

test('handles empty string', () => {
  const emptyString = '';
  expect(repairJSON(emptyString)).toBe(emptyString);
});

test('repairs invalid array', () => {
  const invalidArray = '[1, 2, 3, 4]';
  const expectedArray = '["1","2","3","4"]';
  expect(repairJSON(invalidArray)).toBe(expectedArray);
});
