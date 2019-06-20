const isNumber = require('../utils/isNumber');
const isString = require('../utils/isString');

module.exports = class Calculator {
    constructor(operators) {
        this.operators = ['(', ')', '+', '-', '*', '/'] || operators;
    }

    _isOperator(operator) {
        if (this.operators.indexOf(operator) !== -1) {
            return true;
        }

        return false;
    }

    _getOperatorPriority(operator) {
        switch (operator) {
            case '(':
            case ')':
                return 0;
            case '+':
            case '-':
                return 1;
            case '*':
            case '/':
                return 2;
            default: return 3;
        }
    }

    convertToRPN(expression) {
        if (!isString(expression)) {
            throw new Error('The expression is not a string.');
        }

        const operatorsStack = [];
        const outputQueue = [];
        const expressionArray = expression.split(' ');

        expressionArray.forEach((expressionToken, expressionIndex) => {
            if (isNumber(expressionToken)) {
                const parsedNumber = Number.parseFloat(expressionToken);

                if (parsedNumber < 0) {
                    throw new Error('The unary operation was found in the expression');
                }

                outputQueue.push(parsedNumber);
            } else if (this._isOperator(expressionToken)) {
                const operator = expressionToken;

                if (operator === '(') {
                    operatorsStack.push(operator);
                } else if (operator === ')') {
                    let popOperator = operatorsStack.pop();

                    while (popOperator !== '(') {
                        if (!operatorsStack.length) {
                            throw new Error('The Bad Sequence Error: an opening parenthesis was missed in the expression.');
                        }

                        outputQueue.push(popOperator);
                        popOperator = operatorsStack.pop();
                    }
                } else if (!operatorsStack.length) {
                    operatorsStack.push(operator);
                } else {
                    const topOperator = operatorsStack[operatorsStack.length - 1];

                    if (this._getOperatorPriority(operator) <= this._getOperatorPriority(topOperator)) {
                        outputQueue.push(operatorsStack.pop());
                    }

                    operatorsStack.push(operator);
                }
            } else {
                const availableOperations = this.operators.join(' ');
                throw new Error(`Forbidden arithmetic operations were found in the expression. The available operations: ${availableOperations}`);
            }
        });

        while (operatorsStack.length > 0) {
            const popOperator = operatorsStack.pop();

            if (popOperator === '(') {
                throw new Error('The Bad Sequence Error: an closing parenthesis was missed in the expression.');
            }

            outputQueue.push(popOperator);
        }

        return outputQueue.join(' ');
    }
};
