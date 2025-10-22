import type { ExpressionToken } from "../@types/index.ts";
declare class Calculator {
    private expr;
    protected tokenizedExpr: ExpressionToken;
    constructor();
    tokenizeExpression(): void;
    calculate(expr: string): import("../@types/index.ts").NodeValue | null;
}
export declare const calculator: Calculator;
export {};
//# sourceMappingURL=main.d.ts.map