//箭头函数 foo this指的是window全局
var aa = 'global aa'
let a  = {
	aa: '123',
	foo:() => { 
		console.log('foo: ', this.aa)
	},
	bar() {
		console.log('bar: ', this.aa)
	}
}
//a.foo()箭头函数的外层作用域是全局的，所以this.aa指向global
a.foo() //global 
//普通函数先找到调用位置（全局作用域）,然后运用绑定规则（默认绑定）
a.bar() //123

let b = {
	aa: 'b 234'
}
//箭头函数无法改变this
a.foo.call(b) //global
// 显性绑定 
a.bar.call(b) //b 234 


//箭头函数 
// 
var word = 'global word'
function func() { 
	return () => {
		console.log(this.word)
	}
}
let obj29= {
    word: 'obj29 word'
}
//这里func()返回的是箭头函数，通过bind无法改变箭头函数的this，
//所以执行时箭头函数的this还是原本func()绑定的this（没有）
let bar = func().bind(obj29) 
bar() //global word
let obj34 = {
    word: 'obj34 word'
}
let baz = bar.bind(obj34)
baz() // global word


//闭包  不要把闭包作用域和this混淆
function func() { 
	let word = 'local 1'
	return function (){
		console.log(word)
	}
}
let word = 'global word'
let bar = func()
bar() // local 1
let baz = bar.bind(null)
baz() // global word

//Q: 一个对象里的箭头函数，怎么调用当前对象里的函数？
var o62data = 'global data'
let o62 = {
    o62data: 'a62 local',
    bar: function() {
        console.log(this.o62data)
        console.log(this.arr1())
    },
    arr1: () => {
        console.log('arr func')
    },
    foo: () => {
        console.log('foo: ', this.o62data)
        console.log('foo: ', this.bar())
    }
}
//调用位置为全局调用，规则为：隐式绑定
o62.bar() // local  /arr func
// 箭头函数，调用位置全局调用，this为全局作用域
//全局作用域没有bar寒素，所以this.bar会报错
o62.foo() // global / this.bar is not a function.


//箭头函数
var o84data = 'global data'
function func85() {
    console.log(this.o84data)
}
func85() // global 调用位置为全局，绑定规则为默认
let o84 = {
    o84data: 'local data',
    foo() {
        func85.call(this)
    }
}
o84.foo() //调用规则为全局作用域 绑定规则为隐士绑定 local

let bar95 = o84.foo //获取函数引用
bar95() // local 调用规则为全局作用域，绑定规则为硬绑定
bar95.call(null) // local 同上
//##### A：以上分析错误， bar95获取的是函数引用，bar95()调用位置为全局作用域，
//默认绑定，this为全局对象 所以bar95()结果应为 global
let bar95 = o84.foo //获取函数引用
bar95() //global
bar95.call(null) // global 同上


//Q 调用同一个对象的方法，可以不使用this吗？
//分析：应该不能，因为从作用域链分析，函数查询变量时，会从作用域链往上查，当前对象并不在作用域链上
//结果： 以上分析是正确的，
function foo111() {
    console.log('global foo')
}
let o111 = {
    foo111() {
        console.log('local foo')
    },
    bar() {
        foo111()
    }
}
o111.bar() //global foo