import { exitConsole, handleKeypress, print, setupConsole } from "./core/io.js";
import { Input } from "./core/input.js";
import { State } from "./core/state.js";
import { update } from "./core/utils.js";

const { isChar, isCtrlC, isEnter } = Input;

export function calc() {
  handleKeypress((keypress: string) => {
    const quitProgram =
      isChar(keypress.toLowerCase(), "q") || isCtrlC(keypress);

    if (quitProgram) {
      exitConsole();
    }
    if (isEnter(keypress)) {
      // perform operation
      State.startY += State.cursorPosY;
      print(State.storedInput);
    }
    update({ keypress });
  });
}

// staging
setupConsole();
calc();
