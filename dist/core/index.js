import { print } from "./io.js";
import { State } from "./state.js";
import { calculator } from "../calculator/main.js";
export function stripInput(input) {
    return input.split("\n")[0] || "";
}
export function render() {
    print("= " + String(State.result), { newLine: true });
}
export function update(config) {
    const { input: expr } = config;
    const result = calculator.calculate(expr);
    State.result = result;
    render();
    return;
}
//# sourceMappingURL=index.js.map