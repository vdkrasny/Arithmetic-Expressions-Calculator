const Calculator = require('./Calculator');

const calculator = new Calculator();

describe('Test the Calculator methods.', () => {
    describe('Testing the convertToRPN method', () => {
        it('Should throw an error if the expression is not a string', () => {
            const wrongInfixExpression = 1;

            expect(() => calculator.convertToRPN(wrongInfixExpression))
                .toThrow();
        });

        it('Should throw an error if forbidden arithmetic operations were  found in the expression. The available operations: + - * / ( )', () => {
            const wrongInfixExpression = '1 & 2';

            expect(() => calculator.convertToRPN(wrongInfixExpression))
                .toThrow();
        });

        it('Should throw an error if the unary operation was found in the expression', () => {
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
});
