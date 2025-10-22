import type { NodeValue } from "../@types/index.ts";
export declare class Stack {
    private head;
    size: number;
    constructor();
    push(value: NodeValue): void;
    pop(): NodeValue | null;
    findLast(): NodeValue | null;
}
export declare class Queue {
    private head;
    size: number;
    constructor();
    enqueue(value: NodeValue): void;
    dequeue(): NodeValue | null;
}
//# sourceMappingURL=ds.d.ts.map