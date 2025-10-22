#!/usr/bin/env node
import { exitConsole, handleKeypress, setupConsole } from "./core/io.js";
import { Input } from "./core/input.js";
import { stripInput } from "./core/utils.js";
import { update } from "./core/index.js";
const { isChar, isCtrlC } = Input;
export function run() {
    handleKeypress(($input) => {
        const input = stripInput($input);
        const quitProgram = isChar(input.toLowerCase(), "q") || isCtrlC(input);
        if (quitProgram) {
            exitConsole();
        }
        update({ input });
    });
}
// staging
// setupConsole();
run();
//# sourceMappingURL=index.js.map