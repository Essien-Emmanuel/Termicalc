export const Input = {
  isEnter(key: string) {
    return key === "\r";
  },
  isChar(char1: string, char2: string) {
    return char1 === char2;
  },
  isCtrlC(key: string) {
    return key === "\u0003";
  },
  isBackspace(key: string) {
    return key === "b";
    // return key === "\u0008";
  },
  isArrowUp(key: string) {
    return key === "\u001b[A";
  },
  isArrowDown(key: string) {
    return key === "\u001b[B";
  },
  isArrowRight(key: string) {
    return key === "\u001b[C";
  },
  isArrowLeft(key: string) {
    return key === "\u001b[D";
  },
};
