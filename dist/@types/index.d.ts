import type { precedence, bracketTokens } from "../calculator/handler.ts";
export type NodeValue = string | number;
export type UpdateConfig = {
    input: string;
};
export type CalcOperator = keyof typeof precedence;
export type BracketToken = (typeof bracketTokens)[number];
export type ExpressionChar = CalcOperator | number | BracketToken;
export type ExpressionToken = ExpressionChar[];
//# sourceMappingURL=index.d.ts.map