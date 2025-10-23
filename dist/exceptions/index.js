import { print } from "../core/io.js";
export function printSyntaxError(expr) {
    print("\x1b[31mSyntaxError\x1b[0m: check expression for incomplete parenthesis or operator doubling", { newLine: true });
    print(`Expression: ${expr}`, { newLine: true });
    return;
}
//# sourceMappingURL=index.js.map