import { print } from "../core/io.ts";

export function printSyntaxError(expr: string) {
  print(
    "\x1b[31mSyntaxError\x1b[0m: check expression for incomplete parenthesis or operator doubling",
    { newLine: true }
  );
  print(`Expression: ${expr}`, { newLine: true });

  return;
}
