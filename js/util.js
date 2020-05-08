function isObject(obj) {return typeof obj === 'object'}
function isFunction(obj) {return typeof obj === 'function'}
let toArray = Array.from ? Array.from : obj => [].slice.call(obj)

export default {
    isObject,
    isFunction,
    toArray
}
