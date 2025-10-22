export declare function handleKeypress(cb: any): void;
export declare function setupConsole(): void;
export declare function exitConsole(): void;
export declare function print(str: string, config?: {
    newLine: boolean;
}): void;
export declare function setCursorPosition(x?: number, y?: number): void;
export declare const Cursor: {
    moveRight(n: number): void;
    moveLeft(n?: number): void;
    moveUp(n?: number): void;
    moveDown(n?: number): void;
};
export declare const Console: {
    clearLine(val?: number): void;
};
export declare const cursorTo: {
    (x: number, y?: number, callback?: () => void): boolean;
    (x: number, callback: () => void): boolean;
};
export declare const consoleWidth: number;
export declare const consoleHeight: number;
export declare const exit: (code?: number | string | null | undefined) => never;
//# sourceMappingURL=io.d.ts.map