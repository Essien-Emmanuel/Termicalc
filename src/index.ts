#!/usr/bin/env node

import { exitConsole, handleKeypress, setupConsole } from "./core/io.ts";
import { Input } from "./core/input.ts";
import { stripInput } from "./core/utils.ts";
import { update } from "./core/index.ts";

const { isChar, isCtrlC } = Input;

export function run() {
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
// setupConsole();
run();
