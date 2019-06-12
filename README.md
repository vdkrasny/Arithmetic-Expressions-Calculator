# Arithmetic Expressions Calculator

## Short Description

Create a program to calculate arithmetic expressions using TDD approach.

## Topics

- Unit Testing
- TDD
- Testing tools

## Requirements

Create a programm to calculate arithmetic expression that is provided as string. It should have the following functionality:

-   Arithmetic expression parser. That takes expression string written in infix notation as an input and converts it to Reverse Polish Notation.
    ```javascript
    const expression = "2 * ( 3 + 6 / 2 ) / 4"

    convertToRPN(expression)
    // "2 3 6 2 / + * 4 /"
    ```
-   Reverse Polish Notation calculator. It takes expression string written in RPN as an input and calculates it respecting priority.
    ```javascript
    const expression = "2 3 6 2 / + * 4 /"

    calculateRPNExpression(expression)
    // 3
    ```

#### Note

The following arthmetic operations are allowed: `+, -, *, /`. It shoud work with **positive** numbers. Invalid expressions should cause error.  
Both modules should validate parameters and cause custom errors if necessary.  

-   Every input string has numbers, operators and parentheses separated by space ` `
-   Accept only strings as parameters (TypeError)
-   Check expression for the correctness(invalid parentheses, double operators, restricted simbols) (BadSequenceError)
-   Calculating `0 / 0` should have triggered an exception, not given result `NaN`.

Must be used **TDD** approach, which means that every test must be written before implementing the functionality. 

Please use the following flow:
1. Write tests
2. Run tests
3. Commit
4. Make tests pass
5. Commit
6. Repeat from **1**

## Advanced Requirements

1. Use reporter tools to achive 100% code coverage.
2. Publish modules to npm.
3. Write documentation for each module.
4. Update program to evaluate expressions from console or file line by line using `readline`. Example: `node index.js < expressions.txt`. 
  ```javascript
    // expressions.txt
    5 + 8 * 3 / 2
    (5 + 8) * 3 / 2
    1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 + 11 + 12 + 13
    //...
  ```
