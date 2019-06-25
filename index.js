const readline = require('readline');
const Calculator = require('./src/Calculator');

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const calculator = new Calculator();

readlineInterface.question('Enter arithmetic expressions here: ', (expression) => {
    try {
        readlineInterface.close();
        const convertedRPN = calculator.convertToRPN(expression);
        const result = calculator.calculateRPNExpression(convertedRPN);

        console.log(result);
    } catch (error) {
        console.log(error.message);
    }
});
