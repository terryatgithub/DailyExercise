// stack
class Stack {
  constructor() {
    this.stack = [];
  }
  push(item) {
    // this.stack.unshift(item)
    this.stack.push(item);
  }
  pop() {
    return this.stack.pop();
    // return this.stack.shift()
  }
  getCount() {
    return this.stack.length;
  }
  isEmpty() {
    return this.getCount() === 0;
  }
  peek() {
    return this.stack[this.getCount() - 1];
  }
}

// 有效的括号
let strs = [
    "()[]{}((([])))",
    '()',
    '()[]{}',
    '(]',
    '([)]',
    '{[]}'
];
console.log(strs.forEach(str => isValid(str)));
function isValid(str) {
  let stack = new Stack();
  for (let i of str) {
    let top = "";
    switch (i) {
      case "(":
      case "[":
      case "{":
        stack.push(i);
        break;
      case ")":
      case "]":
      case "}":
        top = stack.pop();
        // console.log(`top: ${top}, i: ${i}`);
        if (
          (top === "(" && i === ")") ||
          (top === "[" && i === "]") ||
          (top === "{" && i === "}")
        ) {
        } else {
          console.log("invalid str", str);
          return false;
        }
        break;
    }
  }
  if (stack.getCount()) {
    console.log("invalid str2", str);
    return false;
  }
  console.log("valid", str);
  return true;
}
