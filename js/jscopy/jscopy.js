import util from '../util.js'
import _test from '../unittest.js'

var jsCopyInstance = function(){
    // [object Undefined]
    // [object Null]
    // [object Boolean]
    // [object Number]
    // [object String]
    // [object Object]
    // [object Array]
    // [object Date]
    // [object RegExp]
    // [object Function]
    let a = [
        undefined,
        null,
        true, false,
        1, -1, 0, 1.24, 2e10,
        'abc', '',
        new Object(), {a:1},
        new Array(), [1, 2],
        new Date(),
        new RegExp(), /\d{1,}/g,
        new Function('a', 'b', 'return a+b'), ()=>console.log('arrow func')
    ]

    a.forEach(item => {console.log(typeof item)})
    a.forEach(item => {console.log(Object.prototype.toString.call(item))})

    const bb = Object.prototype.toString
    a.forEach(item => {
        console.log(this===window)
        console.log(bb['bind'](item)())
    })
    a.forEach(item => {console.log(bb.call(item))})

    a.map(item => {return [item, util.isObject(item)]})

    function shallowCopy(obj) {
        //Q1:浅复制对array/date/function/regexp怎么处理？
        if(obj === undefined ||
            obj === null ||
            !util.isObject(obj)
        ){
            return obj
        }
        let target = {}
        for (let key in obj) {
            if(obj.hasOwnProperty(key)){
                target[key] = obj[key]
            }
        }
        return target
    }
    a.map(item=>{
        return [item, typeof item, typeof shallowCopy(item), bb.call(item), bb.call(shallowCopy(item)),shallowCopy(item)]
    })
    function deepCopy(obj) {
        if(obj === undefined || obj === null ||
            !(util.isObject(obj) || util.isFunction(obj))) {
            return obj
        }
        //case: function
        if(obj instanceof Function) {
            return function () {
                return obj.apply(this, arguments) //注意这里的this
            }
        }
        //case1:array
        if(Array.isArray(obj)) {
            return Array.from(obj)
        }

        //case2:date
        if(obj instanceof Date) {
            return new Date(obj.getTime())
        }
        //case3:regexp
        if(obj instanceof RegExp) {
            return new RegExp(obj)
        }
        //case4: object
        //todo 没有防止重复调用问题 (object/array都有这个问题)
        if(obj instanceof Object) {
            let target = {}
            for(let key in obj) {
                if(obj.hasOwnProperty(key)){
                    target[key] = deepCopy(obj[key])
                }
            }
            return target
        }
    }
    let target = deepCopy(_test.data)

    return {
        deepCopy,
        shallowCopy,
    }
}()

export let jsCopyRef = function(){
    //from https://blog.csdn.net/weixin_33712987/article/details/94611753
    function deepClone(obj) {
        var copy;

        // 如果 obj 是 null、undefined 或 不是对象，直接返回 obj
        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = clone(obj[i]);
            }
            return copy;
        }

        // Handle Function
        if (obj instanceof Function) {
            copy = function() {
                return obj.apply(this, arguments);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = deepClone(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj as type isn't supported " + obj.constructor.name);
    }

    return {
        deepCopy: deepClone,


    }
}();

export default jsCopyInstance

export {
    jsCopyInstance as copy,
    jsCopyRef as copy2,

}