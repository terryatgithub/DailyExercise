// function readonly(target, key, descriptor) {
//     descriptor.writable = false
//     return descriptor
// }

// class Test{
//     @readonly
//     name = 'terry'
// }
// let t = new Test()
// t.name = 'hahah'

// @testable
// class MyTestableClass {}
// function testable(target) {
//   target.isTestable = true;
// }
// // MyTestableClass = testable(MyTestableClass) || MyTestableClass
// console.log(MyTestableClass.isTestable);

// @decorator
// class A {}
// // ===
// A = decorator(A) || A;

// function testable(isTestable) {
//     return function(target) {
//         target.isTestable = isTestable
//     }
// }

// function test(target) {
//     target.prototype.isTestable = true
// }
// @testable(true)
// class MyTestableClass {}
// MyTestableClass.isTestable;

// @testable(false)
// class MyClass {}
// MyClass.isTestable

function mixins(...list) {
    return function(target){
        Object.assign(target.prototype, ...list)
    }
}

Object.assign(MyClass.prototype, Foo)

const Foo = {
    foo() {console.log('foo');}
}

@mixins(Foo)
class MyClass{}

let obj = new MyClass()
obj.foo()

class Math {
    @log 
    add(a, b) {
        return a+b
    }
}
class math = new Math()
math.add(1,2)

function log(target, key ,descriptor) {
    let oldValue = descriptor.value
    descriptor.value = function() {
        console.log(`calling ...`);
        return oldValue.apply(this, arguments)
    }
    return descriptor
}

