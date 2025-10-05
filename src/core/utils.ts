import {
  consoleHeight,
  consoleWidth,
  cursorTo,
  print,
  Console,
  Cursor,
  setCursorPosition,
} from "./io.js";
import { State } from "./state.js";
import { Input } from "./input.js";

const { isBackspace, isArrowRight, isArrowLeft } = Input;
const { clearLine } = Console;

function updateStateCursorForwardPos() {
  ++State.keypressCount;

  if (State.cursorPosX >= consoleWidth) {
    State.cursorPosX = 0;
    if (State.cursorPosY > consoleHeight) {
      State.cursorPosY = 0;
    } else {
      ++State.cursorPosY;
    }
  } else {
    ++State.cursorPosX;
  }
}

function updateStateCursorBackwardPos() {
  --State.keypressCount;

  if (State.cursorPosX > 0) {
    --State.cursorPosX;
  } else {
    if (State.cursorPosY > 0) {
      State.cursorPosX = consoleWidth;
      --State.cursorPosY;
    }
  }
  return;
}

function updateStoredInput(keypress: string) {
  const storedInputList = Array.from(State.storedInput);
  storedInputList.splice(Math.max(State.cursorPosX - 1, 0), 0, keypress);
  State.storedInput = storedInputList.join("");
  return;
}

function deleteStoredCharAtPosX() {
  const storedInputList = Array.from(State.storedInput);
  storedInputList.splice(Math.max(State.cursorPosX, 0), 1);
  State.storedInput = storedInputList.join("");
}

export function render() {
  const { cursorPosX, cursorPosY } = State;
  // setCursorPosition();
  // cursorTo(State.cursorPosX, State.cursorPosY);

  clearLine(2);
  Cursor.moveLeft();
  print(State.storedInput);
  print(JSON.stringify(State, null, 2));
  Cursor.moveLeft();
  Cursor.moveRight(cursorPosX);
}

export type UpdateConfig = {
  keypress: string;
};

export function update(config: UpdateConfig) {
  const { keypress } = config;

  if (isBackspace(keypress)) {
    updateStateCursorBackwardPos();
    deleteStoredCharAtPosX();
  } else if (isArrowLeft(keypress)) {
    updateStateCursorBackwardPos();
  } else if (isArrowRight(keypress)) {
    updateStateCursorForwardPos();
  } else {
    updateStateCursorForwardPos();
    updateStoredInput(keypress);
  }

  render();
  return;
}
