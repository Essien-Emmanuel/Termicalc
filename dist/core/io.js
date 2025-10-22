import process from "node:process";
const { stdin, stdout } = process;
export function handleKeypress(cb) {
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
    // stdout.write("\x1b[?1049l");
    process.exit();
}
export function print(str, config) {
    const suffix = config && config.newLine ? "\n" : "";
    stdout.write(str + suffix);
}
export function setCursorPosition(x, y) {
    const posConfig = x ? `${x};${y || 0}` : "";
    print(`\x1b[${posConfig}H`);
}
export const Cursor = {
    moveRight(n) {
        print(`\x1b[${n}C`);
    },
    moveLeft(n = 1000) {
        print(`\x1b[${n}D`);
    },
    moveUp(n = 0) {
        print(`\x1b[${n}A`);
    },
    moveDown(n = 0) {
        print(`\x1b[${n}B`);
    },
};
export const Console = {
    clearLine(val = 0) {
        print(`\x1b[${val}K`);
    },
};
export const cursorTo = stdout.cursorTo;
export const consoleWidth = stdout.columns;
export const consoleHeight = stdout.rows;
export const exit = process.exit;
//# sourceMappingURL=io.js.map