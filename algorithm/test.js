Function.prototype.myBind = function(context) {
    // 判断this是否为函数

    // 记录this和参数
    const self = this
    const args = [...arguments].slice(1)


    // 返回一个函数
    const fnBind = function() {
        // 处理new fnBind的情况
        const thisArgs = this instanceof fnBind ? this : context
        self.apply(thisArgs, [...args, ...arguments])
    }

    // 继承原型链
    function fNOP(){}
    fNOP.prototype = self.prototype
    fnBind.prototype = new fNOP()
    /* fnBind.prototype = Object.create(fNOP.prototype, {
        constructor: {
            value: fnBind,
            enumerable: false,
            writable: true,
            configurable: true
        }
    }) */

    return fnBind
}
var aa = 'global aa'
let obj = {
    aa: 'obj aa'
}
function foo(){
    console.log(this.aa, JSON.stringify(arguments))
}
var fooBind = foo.bind(obj, 1, 2, 3)
console.log(fooBind())
var fooMyBind = foo.myBind(obj, 1, 2, 3)
console.log(fooMyBind())