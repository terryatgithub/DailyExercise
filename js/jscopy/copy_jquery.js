// jQuery.extend(target);// jQuery 的扩展
// jQuery.extend(true, target);// jQuery 的扩展
// jQuery.extend(target, obj1, obj2,..);//浅拷贝 
// jQuery.extend(true, target, obj1, obj2,..);//深拷贝 

// 需要考虑
// 1. 深拷贝 浅拷贝
// 2. 各种基本类型对象的拷贝
// 3. 对象的重复引用导致的死循环
function extend() {
    let target = arguments[0] || {},
        copy,
        deep = false,
        i = 1,
        length = arguments.length;
    
    //case 3
    if (typeof target === 'boolean') {
        deep = target
        target = arguments[i] || {}
        i++
    }

    if (typeof target !== 'object' && !isFunction(target)) {
        target = {}
    }

    // 只有一个对象参数，将对象扩展到当前对象(jQuery)
    if (i === length) {
        target = this //this can be jQuery, or jQuery.fn
        i--
    }

    for (; i < length; i++) {
        copy = arguments[i]
    }



}