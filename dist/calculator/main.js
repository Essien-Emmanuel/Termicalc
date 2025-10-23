import { exit, print } from "../core/io.js";
import { calculate as calculateFn } from "./handler.js";
import { tokenizeExpression as tokenizeExpressionFn } from "./tokenizer.js";
import { printSyntaxError } from "../exceptions/index.js";
class Calculator {
    expr;
    tokenizedExpr;
    constructor() {
        this.expr = "";
        this.tokenizedExpr = [];
    }
    tokenizeExpression() {
        this.tokenizedExpr = tokenizeExpressionFn(this.expr);
    }
    calculate(expr) {
        this.expr = expr;
        this.tokenizeExpression();
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
//# sourceMappingURL=main.js.map