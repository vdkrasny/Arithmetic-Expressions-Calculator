const Calculator = require('./Calculator');

const calculator = new Calculator();

describe('Functionality of the Arithmetic Expressions Calculator.', () => {
    describe('The convertToRPN method', () => {
        it('Should throw an error if the expression is not a string', () => {
            const wrongInfixExpression = 1;

            expect(() => calculator.convertToRPN(wrongInfixExpression))
                .toThrow();
        });

        it('Should throw an error if unknown arithmetic operator was found in the expression. The available operations: + - * / ( )', () => {
            const wrongInfixExpression = '1 & 2';

            expect(() => calculator.convertToRPN(wrongInfixExpression))
                .toThrow();
        });

        it('Should throw an error if the negative operand was found in the expression', () => {
            const wrongInfixExpression = '1 + -2';

            expect(() => calculator.convertToRPN(wrongInfixExpression))
                .toThrow();
        });

        it('Should throw the Bad Sequence error if opening parenthesis was missed in the expression', () => {
            const wrongInfixExpression = '1 + 2 + ( 3 + 4';

            expect(() => calculator.convertToRPN(wrongInfixExpression))
                .toThrow();
        });

        it('Should throw the Bad Sequence error if closing parenthesis was missed in the expression', () => {
            const wrongInfixExpression = '1 + 2 + 3 + 4 )';

            expect(() => calculator.convertToRPN(wrongInfixExpression))
                .toThrow();
        });

        describe('Results of conversion of Infix Notation expressions into Reverse Polish Notation', () => {
            const expressions = [
                [
                    '3 + 4 * 2 / ( 1 - 5 )',
                    '3 4 2 * 1 5 - / +'
                ],
                [
                    '( 1 + ( 3 + 4 ) ) * ( 2 + 1 ) * 2 / ( 1 - 5 )',
                    '1 3 4 + + 2 1 + * 2 * 1 5 - /'
                ]
            ];

            expressions.forEach(([infixExpression, convertedRPNExpression]) => {
                it(`Should converted "${infixExpression}" to "${convertedRPNExpression}"`, () => {
                    expect(calculator.convertToRPN(infixExpression))
                        .toBe(convertedRPNExpression);
                });
            });
        });
    });

    describe('The calculateRPNExpression method', () => {
        it('Should throw an error if the expression is not a string', () => {
            const wrongRPNExpression = 1;

            expect(() => calculator.calculateRPNExpression(wrongRPNExpression))
                .toThrow();
        });

        it('Should throw an error if unknown arithmetic operator was found in the expression. The available operations: + - * /', () => {
            const wrongRPNExpression = '1 2 &';

            expect(() => calculator.calculateRPNExpression(wrongRPNExpression))
                .toThrow();
        });

        it('Should throw an error if the negative operand was found in the expression', () => {
            const wrongRPNExpression = '1 -2 +';

            expect(() => calculator.calculateRPNExpression(wrongRPNExpression))
                .toThrow();
        });

        it('Should throw an error if not enough operands were found in the expression', () => {
            const wrongRPNExpression = '1 2 + -';

            expect(() => calculator.calculateRPNExpression(wrongRPNExpression))
                .toThrow();
        });

        it('Should throw an error if the expression exist divide by zero', () => {
            const wrongRPNExpression = '0 0 /';

            expect(() => calculator.calculateRPNExpression(wrongRPNExpression))
                .toThrow();
        });

        describe('Results of the calculation of the expression in the Reverse Polish Notation', () => {
            const expressions = [
                ['3 4 2 * 1 5 - / +', 1],
                ['1 3 4 + + 2 1 + * 2 * 1 5 - /', -12]
            ];

            expressions.forEach(([expressionInRPN, expressionResult]) => {
                it(`Should return result "${expressionResult}" of "${expressionInRPN}"`, () => {
                    expect(calculator.calculateRPNExpression(expressionInRPN))
                        .toBe(expressionResult);
                });
            });
        });
    });
});
