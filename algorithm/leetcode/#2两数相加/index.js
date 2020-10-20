// 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

// 如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

// 您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

// 示例：

// 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
// 输出：7 -> 0 -> 8
// 原因：342 + 465 = 807
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}
// testcase
const testCase = [
  // case 1: 长度相等，有进位
  [
    new ListNode(2, new ListNode(4, new ListNode(3))),
    new ListNode(5, new ListNode(6, new ListNode(4))),
  ],
  // case 2: 长度不等，
  // 2->4->3
  // 1
  // 3 4 3
  // 342+61=403
  [new ListNode(2, new ListNode(4, new ListNode(3))), new ListNode(1)],
  // case 3: 长度不等，
  // 2->4->3
  // 1->6
  // 3 0 4
  // 342+61=403
  [
    new ListNode(2, new ListNode(4, new ListNode(3))),
    new ListNode(1, new ListNode(6)),
  ],
  // case 4: 特殊情况
  // 2->4->3
  // 0
  [new ListNode(2, new ListNode(4, new ListNode(3))), new ListNode(0)],
];
testCase.forEach((item) => {
    console.log('--------------------');
    add1(item[0], item[1]);
    add(item[0], item[1]);
});
/**
 *
 * @param {ListNode} a
 * @param {ListNode} b
 * @return {ListNode}
 */
function add(a, b) {
  // 重点: 处理进位和边界条件
  // Q: 怎么记忆初始对象位置 A:如下 if(!sum)
  let sum = null, next = null;
  let plus1 = false;
  function addNode(tmp) {
    // 上一轮有进位
    if (plus1) {
      tmp += 1;
      plus1 = false;
    }
    //新增节点
    if(!sum) {
        sum = next = new ListNode()
    } else {
        next.next = new ListNode()
        next = next.next
    }
    next.val = tmp >= 10 ? tmp % 10 : tmp;
    // 本轮有进位
    if (tmp >= 10) {
      plus1 = true;
    }
  }
  while (a && b) {
    let tmp = a.val + b.val;
    addNode(tmp);
    a = a.next;
    b = b.next;
  }
  while (a) {
    let tmp = a.val;
    addNode(tmp);
    a = a.next;
  }

  while (b) {
    let tmp = b.val;
    addNode(tmp);
    b = b.next;
  }

  // !important
  // 如果链表遍历结束后还有进位，需要额外增加一个节点
  if (plus1) {
    addNode(0);
  }

//   console.log(sum);
  return sum;
}

// 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
// 输出：7 -> 0 -> 8
// 原因：342 + 465 = 807
/**
 * 由于两个链表是逆序排列的，所以两个链表同一位置的数字可以直接相加
 * 
 * 同时遍历两个链表，逐位计算他们的和，并与当前位置的进位相加。具体而言，如果当前两个链表相应位置的数字为n1,n2, 进位值为carry，则它们的和为 n1 + n2 + carry; 其中，答案链表处相应位置的值为 (n1+n2+carry) % 10, 而新的金唯智为 (n1+n2+carry) / 10 并向下取整,
 * 
 * 如果两个链表的长度不同，则可以认为短链表的后面有若干个0
 * 
 * 此外，如果链表遍历结束后，有carry>0, 还需要在答案链表后面附加一个节点，节点的值为 carry 
 * 
 * @param {*} a 
 * @param {*} b 
 */
function add1(a, b) {
    let head = tail = null, 
    carry = 0;
    while(a || b){
        // 1. 获取a/b当前节点值，如果不存在，补0
        const n1 = a ? a.val : 0;
        const n2 = b ? b.val : 0;

        // 2. 创建新节点，记录值
        const value = n1 + n2 + carry
        if(!head) {
            head = tail = new ListNode(value % 10)
        } else {
            tail.next = new ListNode(value % 10) 
            tail = tail.next
        }
        // 3. 更新carry值
        carry = Math.floor(value / 10)
        // 4. 往后迭代
        a && (a = a.next)
        b && (b = b.next)
    }
    // 如果迭代完后还有进位，需要处理
    if(carry) {
        tail.next = new ListNode(carry)
    }
    // console.log(head);
    return head
}

// 事件复杂度

// 空间复杂度
