(function (global, factory) {
    'use strict'

    // For CommonJS and CommonJS-like environments where test proper `window`
    // is present, execute the factory and get jQuery.
    // For environments that do not have test `window` with test `document`
    // (such as Node.js), expose test factory as module.exports.
    // This accentuates the need for the creation of test real `window`.
    // e.g. var jQuery = require("jquery")(window);
    // See ticket #14549 for more info.
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = global.document ?
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error('jQuery requires test window with test document')
                }
                return factory(w)
            }
    } else {
        factory(global)
    }
})(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
    'use strict'

    // 【1】
    // 创建jQuery对象, 实际上是jQuery.fn.init所返回的对象
    var jQuery = function( selector, context ) {
        return new jQuery.fn.init( selector, context );
        // 如果调用new jQuery, 生成的jQuery会被丢弃,最后返回jQuery.fn.init对象
        // 因此可以直接调用jQuery(selector, context), 不需要使用new
        // 如果使用new jQuery()容易出现死循环
        // 我们平常使用 $() ,就是直接调用jquery函数了
    }

    // 【2】
    // 创建jQuery对象原型，为jQuery添加各种方法
    jQuery.fn = jQuery.prototype = {

    }
    //DOM Ajax 选择器 事件 动画... 共13个模块
    //核心方法
    //回调系统
    //异步队列
    //数据缓存
    //队列操作
    // 选择器引擎
    // 属性操作
    // 节点遍历
    // 文档处理
    // 样式操作
    // 属性操作
    // 事件体系
    // AJAX交互
    // 动画引擎

    // 【3】
    // 在调用new jQuery.fn.init后, jQuery.fn.init.prototype = jQuery.fn = jQuery.prototype
    // 相当于将所有jQuery.fn的方法都挂载到一开始jQuery函数返回的对象上
    // 这里就是jquery的一个独特之处了，非常的巧妙
    jQuery.fn.init.prototype = jQuery.fn;
    
    // 【4】
    // 创建jQuery.extend方法
    jQuery.extend = jQuery.fn.extend = function () {

    }

    // 【5】
    // 使用jQuery.extend扩展静态方法
    jQuery.extend({})


    // 全局变量冲突处理
    var 
        _jQuery = window.jQuery,
        _$ = window.$;
    jQuery.noConflict = function( deep ) {
        if ( window.$ === jQuery ) {
            //让出$全局变量为最先出现的第三方库
            window.$ = _$
        }

        //当开启深度冲突处理，让出全局变量jQuery
        if ( deep && window.jQuery === jQuery ) {
            //如果deep为true，
            window.jQuery = _jQuery
        }

        return jQuery
    }

    // 【6】
    // 为window全局变量添加$对象,在给window全局添加变量的时候很有可可能会导致变量命名冲突哦，我们之后会学习到如何处理这种命名冲突的解决方法    
    if (typeof noGlobal === 'undefined') {
        window.jQuery = window.$ = jQuery;
        // $('') 
        // 同 jQuery('')
    }

    return jQuery;
});