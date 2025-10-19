import { print } from "./io.ts";
import { State } from "./state.ts";
import type { UpdateConfig } from "../@types/index.ts";
import { calculator } from "../calculator/main.ts";

export function stripInput(input: string) {
  return input.split("\n")[0] || "";
}

export function render() {
  print("= "+ String(State.result), { newLine: true });
}

export function update(config: UpdateConfig) {
  const { input: expr } = config;

  const result = calculator.calculate(expr);
  State.result = result as number;
  render();
  return;
}
