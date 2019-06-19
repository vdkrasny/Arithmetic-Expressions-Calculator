const Calculator = require('./Calculator');

const calculator = new Calculator();

describe('Test the Calculator methods.', () => {
    describe('Convert the Infix Notation expressions to the Reverse Polish Notation', () => {
        it('Should throw an error if the expression is not a string', () => {
            const infixExpression = 1;

            expect(calculator.convertToRPN(infixExpression))
                .toThrow();
        });

        it('Should throw an error if forbidden arithmetic operations are found in the expression. The list of available operations: + - * / ( )', () => {
            const infixExpression = '1 & 2';

            expect(calculator.convertToRPN(infixExpression))
                .toThrow();
        });

        it('Should throw the Bad Sequence error if the unary operation was found in the expression', () => {
            const infixExpression = '1 + -2';

            expect(calculator.convertToRPN(infixExpression))
                .toThrow();
        });

        it('Should throw the Bad Sequence error if mismatched parentheses are found in the expression', () => {
            const infixExpression = '1 + 2 + ( 3 + 4';

            expect(calculator.convertToRPN(infixExpression))
                .toThrow();
        });

        it('Should converted the Infix Notation expressions to the Reverse Polish Notation', () => {
            const infixExpression = '3 + 4 * 2 / (1 − 5)';
            const convertedRPNExpression = '3 4 2 * 1 − 5 / +';

            expect(calculator.convertToRPN(infixExpression))
                .toBe(convertedRPNExpression);
        });
    });

    // describe('Calculate Reverse Polish Notation.', () => {
    //     describe('Should throw an error ', () => {
    //         test('if the expression exist divide by zero.', () => {
    //             const mathExpression = '0 0 /';

    //             expect(calculator.calculate(mathExpression))
    //                 .toThrow();
    //         });
    //     });
    // });
});
