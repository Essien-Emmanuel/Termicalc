import { print } from "./io.js";
import { State } from "./state.js";
import { calculator } from "../calculator/main.js";
import { Input } from "./input.js";
const { isChar } = Input;
export function stripInput(input) {
    return input.split("\n")[0] || "";
}
export function render() {
    print("= " + String(State.result), { newLine: true });
}
export function update(config) {
    const { input: expr } = config;
    if (isChar("r", expr)) {
        // load result to be reused
    }
    const result = calculator.calculate(expr);
    State.result = result;
    render();
    return;
}
//# sourceMappingURL=index.js.map