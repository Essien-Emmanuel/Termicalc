import { print } from "./io.js";
import { State } from "./state.js";
import { Input } from "./input.js";
import type { UpdateConfig } from "../@types/index.js";

const { isEnter } = Input;

export function stripInput(input: string) {
  return input.split("\n")[0] || "";
}

export function render() {
  print(State.storedInput, { newLine: true });
}

export function update(config: UpdateConfig) {
  const { input } = config;

  State.storedInput = input;

  render();
  return;
}
