export const Input = {
    isEnter(key) {
        return key === "\r";
    },
    isChar(char1, char2) {
        return char1 === char2;
    },
    isCtrlC(key) {
        return key === "\u0003";
    },
    isBackspace(key) {
        return key === "b";
        // return key === "\u0008";
    },
    isArrowUp(key) {
        return key === "\u001b[A";
    },
    isArrowDown(key) {
        return key === "\u001b[B";
    },
    isArrowRight(key) {
        return key === "\u001b[C";
    },
    isArrowLeft(key) {
        return key === "\u001b[D";
    },
};
//# sourceMappingURL=input.js.map