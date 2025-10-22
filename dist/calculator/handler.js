import { Queue, Stack } from "../core/ds.js";
export class TokenError extends Error {
    constructor(msg) {
        super(msg);
        this.name = "TokenError";
    }
}
export const precedence = {
    "^": 3,
    "/": 2,
    "*": 2,
    "+": 1,
    "-": 1,
};
export const bracketTokens = ["(", ")"];
export const operatorHandler = {
    "/": (m, n) => m / n,
    "*": (m, n) => m * n,
    "+": (m, n) => m + n,
    "-": (m, n) => m - n,
    "**": (m, n) => m ** n,
    "^": (m, n) => m ** n,
};
export function calculate(expr) {
    if (!expr.length)
        return 0;
    const output = new Queue();
    const opStack = new Stack();
    // create postfix expression
    for (let token of expr) {
        if (token in precedence || bracketTokens.includes(token)) {
            if (!opStack.size) {
                opStack.push(token);
            }
            else {
                // compare op
                while (true) {
                    const storedToken = opStack.findLast();
                    if (!storedToken) {
                        opStack.push(token);
                        break;
                    }
                    if (token === "(") {
                        opStack.push(token);
                        break;
                    }
                    if (token === ")") {
                        while (true) {
                            const popped = opStack.pop();
                            if (popped && popped === "(") {
                                break;
                            }
                            if (!popped) {
                                break;
                            }
                            output.enqueue(popped);
                        }
                        break;
                    }
                    // console.log({ token });
                    if (storedToken in precedence || storedToken === "(") {
                        const tokenPrecede = precedence[token] >
                            precedence[storedToken];
                        if (tokenPrecede || storedToken === "(") {
                            opStack.push(token);
                            break;
                        }
                        else {
                            const popped = opStack.pop();
                            if (popped) {
                                output.enqueue(popped);
                            }
                        }
                    }
                }
            }
        }
        else {
            output.enqueue(token);
        }
    }
    while (opStack.size) {
        // empty stack to enqueue output
        const popped = opStack.pop();
        if (popped) {
            output.enqueue(popped);
        }
    }
    // console.log("output ", JSON.stringify(output, null, 2));
    // console.log("stack ", JSON.stringify(opStack, null, 2));
    let leftNum;
    let rightNum;
    // execute
    while (output.size) {
        // push to stack
        const token = output.dequeue();
        if (!token && token !== 0)
            break;
        if (token in precedence) {
            if (!opStack.size)
                break;
            rightNum = opStack.pop();
            leftNum = opStack.pop();
            const res = operatorHandler[token](leftNum, rightNum);
            opStack.push(res);
        }
        else {
            opStack.push(token);
        }
    }
    return opStack.findLast();
}
//# sourceMappingURL=handler.js.map