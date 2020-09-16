
// 两个数不用四则运算得出和

// a + b = a ^ b + a&b << 1
// 按位异或就是不进位加法
// 这道题可以按位异或，因为按位异或就是不进位加法，8^8 = 0 如果进位了就是16，所以我们只需要将两个数进行异或操作,然后进位。
// 也就是说两个二进制都是1的位置，左边应该有一个进位1，所以可以得出以下公式：
// a + b = (a ^ b) + ((a & b) << 1)
// 然后通过迭代的方式模拟加法
1011
0010
console.log(parseInt('10101', 2));
console.log(sum(11, 2));
console.log(sum(4,5));
console.log(sum(11, 10));
function sum(a, b){
    if (a == 0) return b;
    if (b == 0) return a;
    let newA = a ^ b
    let newB = (a & b) << 1
    console.log(a, newA, b , newB);
    return sum(newA, newB)
}