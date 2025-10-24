import { print } from "../core/io.ts";

export function printSyntaxError(expr: string, msg?: string) {
  const $msg =
    msg || "check expression for incomplete parenthesis or invalid character";

  print(`\x1b[31mSyntaxError\x1b[0m: ${$msg}`, { newLine: true });
  print(`Expression: ${expr}`, { newLine: true });

  return;
}
