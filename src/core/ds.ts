import type { NodeValue } from "../@types/index.ts";

class Node {
  public value: NodeValue;
  public next: Node | null;

  constructor(value: NodeValue) {
    this.value = value;
    this.next = null;
  }
}

export class Stack {
  private head: Node | null;
  public size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  public push(value: NodeValue): void {
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

  public pop(): NodeValue | null {
    let prev: Node | null = null;
    let node = this.head;
    if (!node) return null;
    while (node.next) {
      prev = node;
      node = node.next;
    }
    const value = node.value;
    if (prev) {
      prev.next = null;
    } else {
      this.head = null;
    }
    --this.size;
    return value;
  }

  public findLast(): NodeValue | null {
    let node = this.head;
    if (!node) return null;
    while (node.next) {
      node = node.next;
    }
    return node.value;
  }
}

export class Queue {
  private head: Node | null;
  public size: number;
  constructor() {
    this.head = null;
    this.size = 0;
  }

  public enqueue(value: NodeValue): void {
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

  public dequeue(): NodeValue | null {
    let node = this.head;
    if (!node) return null;
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
