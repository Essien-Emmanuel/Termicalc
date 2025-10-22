export declare const Input: {
    isEnter(key: string): key is "\r";
    isChar(char1: string, char2: string): boolean;
    isCtrlC(key: string): key is "\u0003";
    isBackspace(key: string): key is "b";
    isArrowUp(key: string): key is "\u001B[A";
    isArrowDown(key: string): key is "\u001B[B";
    isArrowRight(key: string): key is "\u001B[C";
    isArrowLeft(key: string): key is "\u001B[D";
};
//# sourceMappingURL=input.d.ts.map