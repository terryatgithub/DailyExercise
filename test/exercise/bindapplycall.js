let slice = Array.prototype.slice
slice.apply(arguments)


//以上相当于
Array.prototype.slice.apply(arguments)
// 本质是类似arguments.slice()


let unboundedSlice = Array.prototype.slice
slice = Function.prototype.apply.bind(unboundedSlice) //相当于用slice去调用apply
// 所以可以直接用
slice(arguments)
//像下面这样：
slice = Function.prototype.apply.bind(Array.prototype.slice)

//bind()方法创建一个新的函数，在bind()被调用时，新函数的this被指定为bind()的第一个参数，
if(!Function.prototype.bind) (function(){
    let slice = Array.prototype.slice
    Function.prototype.bind = function() {
        let thatFunc = this, //记录调用bind()的函数
            thatArg = arguments[0],//记录调用bind的第一个参数：thisArgs
            args = slice.call(arguments, 1) //记录剩余参数
        if(typeof thatFunc!= 'function') { //必须被函数调用
            throw new Error()
        }
        return function() { //
            return thatFunc.apply(thatArg, args.concat(slice.call(arguments)))
        }
    }
})()


//apply()
let arr = [1, 2, 3]
let arrb = [2, 3, 4]
arr.push.apply(arr, arrb)

Math.max.apply(null, arr)