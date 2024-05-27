const Calculator = require('./calculator');

describe('Calculator', () => {
  let calc;

  beforeEach(() => {
    calc = new Calculator();
  });

  test('adds numbers', () => {
    expect(calc.add(2, 3)).toBe(5);
  });

  test('multiplies numbers', () => {
    expect(calc.multiply(4, 5)).toBe(20);
  });
});
