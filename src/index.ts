import { exitConsole, handleKeypress, print, setupConsole } from "./core/io.js";
import { Input } from "./core/input.js";
import { stripInput } from "./core/utils.js";
import { update } from "./core/index.js";

const { isChar, isCtrlC, isEnter } = Input;

export function calc() {
  handleKeypress(($input: string) => {
    const input = stripInput($input);
    const quitProgram = isChar(input.toLowerCase(), "q") || isCtrlC(input);

    if (quitProgram) {
      exitConsole();
    }

    update({ input });
  });
}

// staging
setupConsole();
calc();
