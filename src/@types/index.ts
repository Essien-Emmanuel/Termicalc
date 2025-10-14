import type { precedence, bracketTokens } from "../calculator/handler.ts";

export type NodeValue = string | number;

export type UpdateConfig = {
  input: string;
};

// export type CalculatorOperator = keyof typeof op;

// export type CalculatorFunction = (typeof op)[CalculatorOperator];

// export type CalcOp<T extends CalculatorOperator> = (typeof op)[T];

export type CalcOperator = keyof typeof precedence;
export type BracketToken = (typeof bracketTokens)[number];
export type ExpressionChar = CalcOperator | number | BracketToken;

export type ExpressionToken = ExpressionChar[];
