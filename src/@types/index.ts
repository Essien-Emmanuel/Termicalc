import type { op } from "../calculator/main.js";

export type UpdateConfig = {
  input: string;
};

export type CalculatorOperator = keyof typeof op;

export type CalculatorFunction = (typeof op)[CalculatorOperator];

export type CalcOp<T extends CalculatorOperator> = (typeof op)[T];
