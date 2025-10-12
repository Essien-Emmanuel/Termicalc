import { exit, print } from "../core/io.ts";
import { calculate as calculateFn } from "./handler.ts";
import { tokenizeExpression as tokenizeExpressionFn } from "./tokenizer.ts";
import type { ExpressionToken } from "../@types/index.ts";

class Calculator {
  private expr: string;
  protected tokenizedExpr: ExpressionToken;

  constructor() {
    this.expr = "";
    this.tokenizedExpr = [];
  }

  tokenizeExpression() {
    this.tokenizedExpr = tokenizeExpressionFn(this.expr);
  }

  calculate(expr: string) {
    this.expr = expr;
    this.tokenizeExpression();

    const result = calculateFn(this.tokenizedExpr);
    if (!result) {
      print(
        "\x1b[31mSyntaxError\x1b[0m: check expression for incomplete parenthesis or operator doubling",
        { newLine: true }
      );
      print(`Expression: ${this.expr}`, { newLine: true });
      exit();
    }
    return result;
  }
}

// const expr = "3-6/2+10/10";
// const calc = new Calculator();

// console.log(calc.calculate(expr));

export const calculator = new Calculator();
