import type { NodeValue } from "../@types/index.js";
import type { ExpressionToken } from "../@types/index.js";
export declare class TokenError extends Error {
    constructor(msg: string);
}
export declare const precedence: {
    "^": number;
    "/": number;
    "*": number;
    "+": number;
    "-": number;
};
export declare const bracketTokens: readonly ["(", ")"];
export declare const operatorHandler: {
    "/": (m: number, n: number) => number;
    "*": (m: number, n: number) => number;
    "+": (m: number, n: number) => number;
    "-": (m: number, n: number) => number;
    "**": (m: number, n: number) => number;
    "^": (m: number, n: number) => number;
};
export declare function calculate(expr: ExpressionToken): NodeValue | null;
//# sourceMappingURL=handler.d.ts.map