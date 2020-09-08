# jQuery源码学习


### 不错的参考资料
#### 完整系列：
jQuerySource[https://github.com/songjinzhong/JQuerySource]
jQuery源码分析系列[https://www.cnblogs.com/aaronjs/p/3279314.html]

#### 片段系列：
概况[https://segmentfault.com/a/1190000015214072]
[深入浅出jQuery] 源码浅析-整体架构 [https://blog.csdn.net/qq_31967569/article/details/89556557]

### 问题
1. jQuery无new构造原理? 
jQuery的无new构造原理

我们在构造jQuery对象的时候，并没有使用new来创建，但其实是在jQuery方法的内部，我们使用了new,这样就保证了当前对象内部就又了一个this对象，并且吧所有的属性和方法的键值对都映射到this上了，所以既可以通过链式取值，也可以通过索引取值。jquery除了实现了类数组结构, 方法的原型共享，还实现了静态和实例的共享.

javascript就是函数式语言，函数可以实现类，所以javascript不是一个严格的面向对象的语言。
平时的情况
```javascript
function ajquery(name) {
    this.name = name
}
ajquery.prototype = {
    say: function() {
        return this.name
    }
}
var a = new ajquery()
a.say()
```
但是在jquery中却不是这么来的。jQuery没有使用new运行符将jQuery显示的实例化，还是直接调用其函数
```javascript
$().ready()
$().noConflict()
```
如果要实现不用new直接获得实例
```javascript
var aJquery = function(selector, context) {
    return new aJquery() //直接new一下
}
aJquery.prototype = {
    name: function() {},
    age: function() {}
}
// 如果是上诉的样子，直接new aQuery()则会导致死循环。
```
如何得到一个正确的实例呢，那么<s>可以把jQuery类当作一个工厂方法来创建实例，把这个方法放到jQuery.prototye原型中，然后实例化这个方法，从而创建一个实例</s>
```javascript
jQuery = function(selector, context) {
    return new jQuery.fn.init(selector, context, rootjQuery)
}
// 但是问题又来了，init中的this指向的是实例init的原型对象，就导师了jquery类的this分离了，
// 解决这个问题的方法是：
jQuery.fn.init.prototype = jQuery.fn;
```
以上就是jQuery无new构造的原理了
```javascript
var aJquery = function(selector, context) {
    return new aJquery.prototype.init(selector, context)
}
aJquery.prototype = {
    init: function(name) {
        this.name = name
        return this
    },
    get: function() {
        return this.name
    },
    name: 'test'
}
aJquery.prototype.init.prototype = aJquery.prototype //这里使得init内部的this跟ajquery类的this保持了一致。//这里使init函数的原型对象跟aJquery类（函数）的原型对象保持了一致
aJquery('test').get()
```

2. ready() load()
针对文档的加载
```javascript
//1.
$(function(){

})
//2. 
$(document).ready(function(){

})
//3. 
// $(document).load(function(){

// })
```
//先看一个DOM文档的加载过程
1. html解析
2. 加载外部引用脚本和外部样式表
3. 解析执行脚本
4. 构造DOM原型 //ready
5. 加载图片等外部文件 //img.onload()
6. 页面加载完毕 //load

当初始的HTML文档被完全加载和解析完成后，DOMContentLoaded事件被触发，而无需等待样式表、图像和子框架的加载完成。