import type { op } from "../calculator/main.ts";

export type NodeValue = string | number;

export type UpdateConfig = {
  input: string;
};

export type CalculatorOperator = keyof typeof op;

export type CalculatorFunction = (typeof op)[CalculatorOperator];

export type CalcOp<T extends CalculatorOperator> = (typeof op)[T];
