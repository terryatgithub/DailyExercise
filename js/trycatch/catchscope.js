// try/catch的作用域问题
// 最终结论是 catch 作用域只是一个普通的块作用域，除此无他

// 以下参考：
// https://blog.csdn.net/weixin_42733155/article/details/85218885

//case 1
function foo() {
    e = 'global aaa'
    try {
        throw new Error('this is an error msg')
    } catch(e) {
        console.log('catch e: ', e);
    }
    console.log('--e: ', e);
    console.log('--window.e: ', window.e);
}
foo()
//output:
// catch e:  Error: this is an error msg
//     at foo (<anonymous>:6:15)
//     at <anonymous>:13:1
// VM599:10 --e:  global aaa
// VM599:11 --window.e:  global aaa

// A1: catch作用域中局部e 覆盖了全局的e

//case 2
function foo() {
    e = 'global aaa'
    try {
        throw new Error('this is an error msg')
    } catch(e) {
        var e 
        console.log('catch e: ', e);
    }
    console.log('--e: ', e);
    console.log('--window.e: ', window.e);
}
foo()
//output
// catch e:  Error: this is an error msg
//     at foo (<anonymous>:4:15)
//     at <anonymous>:12:1
// VM1586:9 --e:  global aaa 
// VM1586:10 --window.e:  undefined  //！！这里是重点

//A1: 这里看到 e = 'global aaa'并没有像case1那样挂载到window全局对象上，原因是
//es5只有全局作用域和函数作用域，var e 会被提升到函数作用域的最前方，所以最终代码执行时类似如下：
// function foo() {
//     var e 
//     e = 'global aaa'
//     try {
//         throw new Error('this is an error msg')
//     } catch(e) {
//         console.log('catch e: ', e); //这里是局部作用域覆盖函数作用于的e
//     }
//     console.log('--e: ', e);
//     console.log('--window.e: ', window.e); //这里根本没有注册到window对象上，所以是undefined
// }

