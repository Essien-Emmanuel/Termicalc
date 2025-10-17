import type { NodeValue } from "../@types/index.js";
import { Queue, Stack } from "../core/ds.ts";
import type {
  ExpressionChar,
  ExpressionToken,
  BracketToken,
  CalcOperator,
} from "../@types/index.js";

export class TokenError extends Error {
  constructor(msg: string) {
    super(msg);
    this.name = "TokenError";
  }
}

export const precedence = {
  "^": 3,
  "**": 3,
  "/": 2,
  "*": 2,
  "+": 1,
  "-": 1,
};
export const bracketTokens = ["(", ")"] as const;

export const operatorHandler = {
  "/": (m: number, n: number) => m / n,
  "*": (m: number, n: number) => m * n,
  "+": (m: number, n: number) => m + n,
  "-": (m: number, n: number) => m - n,
  "**": (m: number, n: number) => m ** n,
  "^": (m: number, n: number) => m ** n,
};

export function calculate(expr: ExpressionToken) {
  if (!expr.length) return 0;

  const output = new Queue();
  const opStack = new Stack();

  // create postfix expression
  for (let token of expr) {
    if (token in precedence || bracketTokens.includes(token as BracketToken)) {
      if (!opStack.size) {
        opStack.push(token);
      } else {
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
            const tokenPrecede =
              precedence[token as CalcOperator] >
              precedence[storedToken as CalcOperator];
            if (tokenPrecede || storedToken === "(") {
              opStack.push(token);
              break;
            } else {
              const popped = opStack.pop();
              if (popped) {
                output.enqueue(popped);
              }
            }
          }
        }
      }
    } else {
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

  let leftNum: number;
  let rightNum: number;

  // execute
  while (output.size) {
    // push to stack
    const token = output.dequeue();
    if (!token) break;

    if (token in precedence) {
      if (!opStack.size) break;
      rightNum = opStack.pop() as number;
      leftNum = opStack.pop() as number;

      const res = operatorHandler[token as CalcOperator](leftNum, rightNum);
      opStack.push(res);
    } else {
      opStack.push(token);
    }
  }

  return opStack.findLast();
}
