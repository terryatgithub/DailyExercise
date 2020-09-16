class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
// 基本的二叉搜索树实现
class BST {
  constructor() {
    this.root = null;
    this.size = 0;
  }
  getSize() {
    return this.size;
  }
  isEmpty() {
    return this.getSize() === 0;
  }

  addNode(v) {
    this.root = this._addChild(this.root, v);
  }

  // 添加节点时需要比较添加的节点值和当前节点值的大小
  _addChild(node, v) {
    if (!node) {
      this.size++;
      return new Node(v);
    }
    if (node.value > v) {
      node.left = this._addChild(node.left, v);
    } else {
      node.right = this._addChild(node.right, v);
    }
    return node;
  }

  // 先序遍历
  // 先序遍历可用于打印树的结构
  // 先序遍历先访问根节点，然后访问左节点，最后访问右节点
  preTraversal() {
    this._pre(this.root);
  }
  _pre(node) {
    if (node) {
      console.log(node.value);
      this._pre(node.left);
      this._pre(node.right);
    }
  }

  // 中序遍历先访问左节点、然后访问根节点、最后访问右节点
  // 中序遍历可用于排序，对于BST来说，中序遍历可以实现一次遍历就得到有序的值
  midTraversal() {
    this._mid(this.root);
  }
  _mid(node) {
    if (node) {
      this._mid(node.left);
      console.log(node.value);
      this._mid(node.right);
    }
  }

  // 后续遍历
  // 先访问左节点，在访问右节点，最后访问根节点
  backTraversal() {
    this._back(this.root);
  }
  _back(node) {
    if (node) {
      this._back(node.left);
      this._back(node.right);
      console.log(node.value);
    }
  }

  // 树的广度遍历，
  // 对广度遍历，需要利用队列结构来实现
  breadthTraversal() {
    if (!this.root) return null;
    let q = new Queue();
    q.enqueue(this.root);
    while (!q.isEmpty()) {
      let n = q.dequeue();
      console.log(n.value);
      if (n.left) q.enqueue(n.left);
      if (n.right) q.enqueue(n.right);
    }
  }

  // 如何在树中寻找最大值和最小值
  getMin() {
    return this._getMin(this.root).value;
  }
  _getMin(node) {
    if (!node.left) return node;
    return this._getMin(node.left);
  }
  _getMinIte(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }

  getMax() {
    return this._getMax(this.root).value;
  }
  _getMax(node) {
    if (!node.right) return node;
    return this._getMax(node.right);
  }
  _getMaxIte(node) {
    while (node.right) {
      node = node.right;
    }
    return node;
  }
}

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
function traversal(root) {
  if (root) {
    // 先序
    console.log(root);
    traversal(root.left);
    // 中序
    // console.log(root);
    traversal(root.right);
    // 后续
    // console.log(root);
  }
}
// 费递归实现
function pre(root) {
  if (root) {
    let stack = [];
    stack.push(root);
    while (stack.length > 0) {
      root = stack.pop();
      console.log(root);
      // 栈是先进后出，所以先push right
      if (root.right) stack.push(root.right);
      if (root.left) stack.push(root.left);
    }
  }
}

// 中序遍历非递归实现
// 首先把最左边节点遍历到底，依次push进站
// 当左边没有节点时，就打印站定元素，然后寻找右节点

function mid(root) {
  if (root) {
    let stack = [];
    while (stack.length > 0 || root) {
      if (root) {
        stack.push(root);
        root = root.left;
      } else {
        root = stack.pop();
        console.log(root);
        root = root.right;
      }
    }
  }
}

// 后续遍历，使用2个栈来实现遍历，相比一个栈的遍历容易理解
function pos(root) {
  if (root) {
    let stack1 = [];
    let stack2 = [];
    // 后续遍历是先坐在有在跟
    // 所以杜宇一个站来说，应该先push根，然后push右，最后push左
    stack1.push(root);
    while (stack1.length > 0) {
      root = stack1.pop();
      stack2.push(root);
      if (root.left) {
        stack1.push(root.left);
      }
      if (root.right) {
        stack1.push(root.right);
      }
    }
    while (stack2.length > 0) {
      console.log(stack2.pop());
    }
  }
}

function maxDepth(root) {
  if (!root) return 0;
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}

// 0 1 1 2 3 5 8 13 21 34 55
function fib(n) {
  if (n === 0 || n === 1) return n;
  return fib(n - 1) + fib(n - 2);
}
console.log(fib(10));

function fibIte(n) {
  let array = new Array(n+1).fill(null);
  array[0] = 0;
  array[1] = 1;
  for (let i = 2; i <= n; i++) {
    array[i] = array[i - 1] + array[i - 2];
  }
  return array;
}
console.log(fibIte(10));