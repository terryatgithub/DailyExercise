(function(global, factory){
    'use strict'
    typeof exports === 'object' && typeof module !== 'undefined' ?
        module.exports = factory() :
        typeof define === 'function' && define.amd ?
            define(factory) :
            (global = global || self, global.cQuery = factory());
})(this, function() {
    'use strict'

    let cQuery = function(selector) {
        return new cQuery.prototype.init(selector)
    }

    cQuery.prototype = {
        constructor: cQuery,
        init: function(selector) {
            let els = document.querySelectorAll(selector)
            this.elements = els
            return this
        },
        //@todo 参考$.on
        on(type, cb) {
            console.log('on.' + type + cb)
            Array.prototype.forEach.call(
                this.elements,
                function(item) {
                    item.addEventListener(type, cb)
                })
        },
        //@todo 参考$.off
        off(type, cb) {
            console.log('off.')
            Array.prototype.forEach.call(
                this.elements,
                function(item) {
                    item.removeEventListener(type, cb)
                })
        },
        
        //@todo text() 
        text(content) {
            console.log('text.' + content)
            Array.prototype.forEach.call(
                this.elements,
                function(item) {
                    item.innerText = content
                })
        },

        //@todo html() 
        html(content) {
        console.log('text.' + content)
        Array.prototype.forEach.call(
            this.elements,
            function(item) {
                item.innerHTML = content
            })
        }
    }
    
    cQuery.prototype.init.prototype = cQuery.prototype
    
    window.$ = window.cQuery = cQuery

    console.log('cQuery init')

    return cQuery
});