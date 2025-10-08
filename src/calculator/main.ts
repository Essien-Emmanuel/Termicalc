import type {
  CalcOp,
  CalculatorFunction,
  CalculatorOperator,
} from "../@types/index.js";

export const op = {
  "√": "sqrt",
  "+": "add",
  "-": "subtract",
  "*": "multiply",
  "/": "divide",
  "**": "pow",
  "^": "pow",
} as const;

class Calculator {
  private op: typeof op;

  constructor() {
    this.op = op;
  }

  getOperation<T extends CalculatorFunction>(operator: CalculatorOperator) {
    const op = this.op[operator];
    return this[op] as Calculator[T];
  }

  registerInput(input: string) {
    const sanitizedInput = input.replace(/zs/g, "");
  }

  add = (m: number, n: number) => m + n;
  subtract = (m: number, n: number) => m - n;
  divide = (m: number, n: number) => m / n;
  multiply = (m: number, n: number) => m ** n;
  pow = (m: number, n: number) => m ** n;
  sqrt = (m: number) => m ** 0.5;
}

const calc = new Calculator();
const ope = "√";
const sqrt = calc.getOperation<CalcOp<typeof ope>>(ope);
console.log(sqrt(16));
