class Node {
    value;
    next;
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}
export class Stack {
    head;
    size;
    constructor() {
        this.head = null;
        this.size = 0;
    }
    push(value) {
        if (!this.head) {
            this.head = new Node(value);
            ++this.size;
            return;
        }
        let node = this.head;
        while (node.next) {
            node = node.next;
        }
        node.next = new Node(value);
        ++this.size;
        return;
    }
    pop() {
        let prev = null;
        let node = this.head;
        if (!node)
            return null;
        while (node.next) {
            prev = node;
            node = node.next;
        }
        const value = node.value;
        if (prev) {
            prev.next = null;
        }
        else {
            this.head = null;
        }
        --this.size;
        return value;
    }
    findLast() {
        let node = this.head;
        if (!node)
            return null;
        while (node.next) {
            node = node.next;
        }
        return node.value;
    }
}
export class Queue {
    head;
    size;
    constructor() {
        this.head = null;
        this.size = 0;
    }
    enqueue(value) {
        if (!this.head) {
            this.head = new Node(value);
            ++this.size;
            return;
        }
        let node = this.head;
        while (node.next) {
            node = node.next;
        }
        node.next = new Node(value);
        ++this.size;
        return;
    }
    dequeue() {
        let node = this.head;
        if (!node)
            return null;
        const value = node.value;
        this.head = node.next;
        --this.size;
        return value;
    }
}
// const stack = new Stack();
// stack.push(2);
// stack.push(1);
// stack.push(3);
// stack.push(4);
// console.log(stack.pop());
// console.log(JSON.stringify(stack, null, 2));
//# sourceMappingURL=ds.js.map