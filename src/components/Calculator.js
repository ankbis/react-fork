import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('0');
  const [operator, setOperator] = useState(null);

  const handleDigit = (digit) => {
    if (display === '0') {
      setDisplay(digit);
      setCurrentValue(digit);
    } else {
      setDisplay(display + digit);
      setCurrentValue(currentValue + digit);
    }
  };

  const handleOperator = (op) => {
    setOperator(op);
    setCurrentValue(display);
    setDisplay('0');
  };

  const handleEquals = () => {
    const result = calculateResult(currentValue, display, operator);
    setDisplay(result.toString());
    setCurrentValue(result.toString());
    setOperator(null);
  };

  const calculateResult = (a, b, op) => {
    const valueA = parseFloat(a);
    const valueB = parseFloat(b);
    switch (op) {
      case '+':
        return valueA + valueB;
      case '-':
        return valueA - valueB;
      case '*':
        return valueA * valueB;
      case '/':
        return valueB === 0 ? 'Error' : valueA / valueB;
      default:
        return 'Error';
    }
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button onClick={() => handleDigit('7')}>7</button>
        <button onClick={() => handleDigit('8')}>8</button>
        <button onClick={() => handleDigit('9')}>9</button>
        <button onClick={() => handleOperator('/')}>÷</button>
        <button onClick={() => handleDigit('4')}>4</button>
        <button onClick={() => handleDigit('5')}>5</button>
        <button onClick={() => handleDigit('6')}>6</button>
        <button onClick={() => handleOperator('*')}>×</button>
        <button onClick={() => handleDigit('1')}>1</button>
        <button onClick={() => handleDigit('2')}>2</button>
        <button onClick={() => handleDigit('3')}>3</button>
        <button onClick={() => handleOperator('-')}>-</button>
        <button onClick={() => handleDigit('0')}>0</button>
        <button onClick={() => handleEquals()}>=</button>
        <button onClick={() => handleOperator('+')}>+</button>
      </div>
    </div>
  );
};

export default Calculator;
