class Queue {
    constructor() {
        this.queue = []
    }
    enqueue(item){
        this.queue.push(item)
    }
    dequeue() {
        return this.queue.shift()
    }
    getHeader() {
        return this.queue[0]
    }
    getLength() {
        return this.queue.length
    }
    isEmpty() {
        return this.getLength() === 0
    }
}
// 单链队列在出队操作的时候需要O(n)的时间复杂度，所以引入了循环队列
// 循环队列的出队操作平均是O(1)的时间复杂度

