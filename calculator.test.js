const Calculator = require('./calculator');

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('add', () => {
    it('should add two numbers', () => {
      expect(calculator.add(2, 3)).toBe(5);
      expect(calculator.add(-5, 10)).toBe(5);
      expect(calculator.add(0, 0)).toBe(0);
    });
  });

  describe('multiply', () => {
    it('should multiply two numbers', () => {
      expect(calculator.multiply(2, 3)).toBe(6);
      expect(calculator.multiply(-5, 10)).toBe(-50);
      expect(calculator.multiply(0, 10)).toBe(0);
    });
  });
});
