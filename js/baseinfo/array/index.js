let arr = ['a','b','c']
let count = 0
for(let i of arr) {
    console.log(i);
    arr.push('d'+count++) 
    if(count>100) {break}
}