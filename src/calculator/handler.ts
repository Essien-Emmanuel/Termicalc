export type NodeValue = string | number;

class Node {
  public value: NodeValue;
  public next: Node | null;

  constructor(value: NodeValue) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  private head: Node | null;
  constructor() {
    this.head = null;
  }

  public push(value: NodeValue): void {
    if (!this.head) {
      this.head = new Node(value);
      return;
    }
    let node = this.head;
    while (node.next) {
      // console.log("n => ", node);
      node = node.next;
    }
    node.next = new Node(value);
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
      console.log(prev);
      this.head = null;
    }
    return value;
  }
}

const stack = new Stack();
stack.push(3);
// stack.push(4);
// stack.push(5);
// stack.push(6);
stack.pop();
// stack.push(7);
console.log(JSON.stringify(stack, null, 2));
