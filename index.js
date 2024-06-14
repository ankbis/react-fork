const Calculator = require('./calculator');

const calculator = new Calculator();
console.log('Hello, World!');
console.log(`2 + 3 = ${calculator.add(2, 3)}`);
console.log(`4 * 5 = ${calculator.multiply(4, 5)}`);
