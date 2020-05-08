let a = {
    b:1, 
    c: 2,
    e: {
        ee: () => 'ee',
        ef: {
            eff: 'eff',
            efg: 'efg'
        }
    }
}
a.d = a
/**
 * 深拷贝(vue)
 * @param {*} obj 拷贝对象(object or array)
 * @param {*} cache 缓存数组
 */
function deepCopy(obj, cache=[]) {
    //typeof [] => 'object'
    //typeof {} => 'object'
    if(obj === null || typeof obj !== 'object') {
        return obj
    }
    //如果传入的对象与缓存的相等，则递归结束，这样防止循环
    const hit = cache.filter(c=>c.original === obj)[0]
    if(hit) {
        return hit.copy
    }

    const copy = Array.isArray(obj) ? [] : {}
    //将copy首先放入cache，因为我们需要在递归deepcopy的时候引用它
    cache.push({
        original: obj,
        copy
    })
    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], cache)
    })
    return copy
}
let t = deepCopy(a)