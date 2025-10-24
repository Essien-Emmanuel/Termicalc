import { exit, print } from "../core/io.ts";
import { calculate as calculateFn } from "./handler.ts";
import { tokenizeExpression as tokenizeExpressionFn } from "./tokenizer.ts";
import type { ExpressionToken } from "../@types/index.ts";
import { printSyntaxError } from "../exceptions/index.ts";

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
    const prev = performance.now();
    this.tokenizeExpression();
    const curr = performance.now();
    console.log(curr - prev);

    // console.log(this.tokenizedExpr);

    const result = calculateFn(this.tokenizedExpr);

    if (!result && result !== 0) {
      printSyntaxError(this.expr);
      exit();
    }
    return result;
  }
}

// const expr = "2-+5";
// const t = tokenizeExpressionFn(expr);
// console.log(t);

export const calculator = new Calculator();
