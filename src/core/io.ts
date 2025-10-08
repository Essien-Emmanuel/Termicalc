import process from "node:process";

const { stdin, stdout } = process;

export function handleKeypress(cb: any) {
  stdin.removeAllListeners("data");
  stdin.setEncoding("utf8");
  stdin.setRawMode(false);
  stdin.on("data", (keypress) => cb(keypress));
}

export function setupConsole() {
  stdout.write("\x1b[?1049h");
  stdout.write("\x1b[2J");
  stdout.write("\x1b[H");
}

export function exitConsole() {
  stdout.write("\x1b[?1049l");
  process.exit();
}

export function print(str: string, config?: { newLine: boolean }) {
  const suffix = config && config.newLine ? "\n" : "";
  stdout.write(str + suffix);
}

export function setCursorPosition(x?: number, y?: number) {
  const posConfig = x ? `${x};${y || 0}` : "";
  print(`\x1b[${posConfig}H`);
}

export const Cursor = {
  moveRight(n: number) {
    print(`\x1b[${n}C`);
  },
  moveLeft(n: number = 1000) {
    print(`\x1b[${n}D`);
  },
  moveUp(n: number = 0) {
    print(`\x1b[${n}A`);
  },
  moveDown(n: number = 0) {
    print(`\x1b[${n}B`);
  },
};

export const Console = {
  clearLine(val: number = 0) {
    print(`\x1b[${val}K`);
  },
};

export const cursorTo = stdout.cursorTo;

export const consoleWidth = stdout.columns;

export const consoleHeight = stdout.rows;
