let a = [1,2, [3,4,[5,6]]]
a = [1,2,[3,[4,[5,[6]]]]]

// 1. toString()方法
console.log(a.toString().split(',').map(x => Number(x)));

// 2. ES6数组拓展方法
console.log(a.flat(Infinity));


//todo 判断类型是否为数组？
// 1. Array.isArray(arr)
// 2. arr instance of 
// 3. 竟然写了下面这个老旧的方法
function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]'
}

// 3. 递归
function flatRecursive(arr) {
    let res = []
    res = arr.reduce((accu, item) =>{
        //console.log('item:', item)
        if(isArray(item)) {
            // 需要递归处理
            let tmp = flatRecursive(item)
            return accu.concat(tmp)
        } else {
            accu.push(item)
            return accu
        }
    },[])
    
    return res
} 

// testcase
console.log('res: ', JSON.stringify(flatRecursive(a)))