const { isNumber, isString } = require('../utils');

module.exports = class Calculator {
    convertToRPN(expression) {
        if (!isString(expression)) {
            throw new Error('The expression is not a string.');
        }

        const operatorsStack = [];
        const outputStack = [];
        const expressionArray = expression.split(' ');

        expressionArray.forEach((expressionToken) => {
            if (isNumber(expressionToken)) {
                this._pushOperandToStack(expressionToken, outputStack);
            } else {
                const operator = expressionToken;

                switch (operator) {
                    case '(': {
                        operatorsStack.push(operator);
                        break;
                    }
                    case ')': {
                        let popOperator = operatorsStack.pop();

                        while (popOperator !== '(') {
                            if (!operatorsStack.length) {
                                throw new Error('The Bad Sequence Error: an opening parenthesis was missed in the expression.');
                            }

                            outputStack.push(popOperator);
                            popOperator = operatorsStack.pop();
                        }
                        break;
                    }
                    case '+': return this._operatorHandler('+', operatorsStack, outputStack);
                    case '-': return this._operatorHandler('-', operatorsStack, outputStack);
                    case '*': return this._operatorHandler('*', operatorsStack, outputStack);
                    case '/': return this._operatorHandler('/', operatorsStack, outputStack);
                    default: {
                        const availableOperations = ['(', ')', '+', '-', '*', '/'].join(' ');

                        throw new Error(`Unknown arithmetic operator was found in the expression. The available operations: ${availableOperations}`);
                    }
                }
            }

            return undefined;
        });

        while (operatorsStack.length > 0) {
            const popOperator = operatorsStack.pop();

            if (popOperator === '(') {
                throw new Error('The Bad Sequence Error: an closing parenthesis was missed in the expression.');
            }

            outputStack.push(popOperator);
        }

        return outputStack.join(' ');
    }

    calculateRPNExpression(expression) {
        if (!isString(expression)) {
            throw new Error('The expression is not a string.');
        }

        const calculationStack = [];
        const expressionArray = expression.split(' ');

        expressionArray.forEach((expressionToken) => {
            if (isNumber(expressionToken)) {
                this._pushOperandToStack(expressionToken, calculationStack);
            } else {
                const operator = expressionToken;

                if (calculationStack.length < 2) {
                    throw new Error('Not enough operands were found in the expression.');
                }

                const secondOperand = Number.parseFloat(calculationStack.pop());
                const firstOperand = Number.parseFloat(calculationStack.pop());

                switch (operator) {
                    case '+': return calculationStack.push(firstOperand + secondOperand);
                    case '-': return calculationStack.push(firstOperand - secondOperand);
                    case '*': return calculationStack.push(firstOperand * secondOperand);
                    case '/': {
                        if (secondOperand === 0) {
                            throw new Error('The expression exist divide by zero.');
                        }

                        return calculationStack.push(firstOperand / secondOperand);
                    }
                    default: {
                        const availableOperations = ['+', '-', '*', '/'].join(' ');

                        throw new Error(`Unknown arithmetic operator was found in the expression. The available operations: ${availableOperations}`);
                    }
                }
            }

            return undefined;
        });

        if (calculationStack.length > 1) {
            throw new Error('Not enough operands were found in the expression.');
        }

        return calculationStack.pop();
    }

    _pushOperandToStack(operand, stack) {
        const parsedOperand = Number.parseFloat(operand);

        if (parsedOperand < 0) {
            throw new Error('The negative operand was found in the expression');
        }

        return stack.push(operand);
    }

    _operatorHandler(operator, operatorsStack, outputStack) {
        if (!operatorsStack.length) {
            operatorsStack.push(operator);
        } else {
            const topOperator = operatorsStack[operatorsStack.length - 1];

            if (this._getOperatorPriority(operator) <= this._getOperatorPriority(topOperator)) {
                outputStack.push(operatorsStack.pop());
            }

            operatorsStack.push(operator);
        }
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
};
