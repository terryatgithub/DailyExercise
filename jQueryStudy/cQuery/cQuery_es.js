(function(global, factory){
    'use strict'

    if ( typeof module === 'object' && typeof module.exports === 'object' ) {
        module.exports = global.document ? 
            factory(global, true) :
            function( w ) {
                if (!w.document) {
                    throw new Error('jQuery requires a window with a document')
                }
                return factory(w)
            }
    } else {
        factory( global )
    }
})(typeof window !== undefined ? window : global, function(window, noGlobal) {
    'use strict'

    var arr = []
    var indexOf = arr.indexOf

    const version = '0.0.1'

    let cQuery = function(selector) {
        return new cQuery.prototype.init(selector)
    }

    cQuery.fn = cQuery.prototype = {
        cquery: version,
        constructor: cQuery,
        length: 0,

        init: function(selector) {
            if ( !selector ) {
                return this;
            }
            if (typeof selector === 'string') {
                let els = document.querySelectorAll(selector)
                this.dom = els    
                //@todo 以下是jQuery真正做法，挂载到根下
                for(let i = 0; i < els.length; i++){
                    this[i] = els[i];
                }
                this.length = els.length;
            } else if (selector.constructor.name === 'NodeList' || Array.isArray(selector)) {
                this.dom = selector
                this[0] = selector
                this.length = 1
            } else {
                this.dom = [selector]
                this[0] = selector
                this.length = 1
            }
            return this
        },
        //@todo get
        get(num) {
            return this.dom[num]
        },

        //1. Event操作
        //@todo 参考$.on
        on(type, cb) {
            console.log('on.' + type + cb)
            this.dom.forEach( item => {
                item.addEventListener(type, cb)
            })
            return this
        },
        bind() {
            return this.on(...arguments)
        },
        unbind() {
            return this.off(...arguments)
        },
        //@todo 参考$.off
        off(type, cb) {
            console.log('off.')
            this.dom.forEach( (item, index) => {
                console.log('item: ' + index + ' :' + typeof item + item)
                item.removeEventListener(type, cb)
            })
            console.log('off end')
            return this
        },
        trigger(type) {
            let e = document.createEvent('Event')
            e.initEvent(type, true, true)
            this.dom.forEach( item => {
                item.dispatchEvent(e)
            })
            return this
        },
        //2. Class操作
        addClass(className) {
            console.log('addClass')
            this.dom.forEach(i => {
                i.classList.add(className)
            })
            return this
        },
        removeClass(className) {
            console.log('removeClass')
            this.dom.forEach(i => {
                i.classList.remove(className)
            })
            return this
        },
        toggleClass(className) {
            console.log('toggleClass')
            this.dom.forEach(i => {
                i.classList.toggle(className)
            })
            return this
        },
        containClass(className) {
            console.log('containClass')
            this.dom.forEach(i => {
                i.classList.contains(className)
            })
            return this
        },
        //3. 属性操作
        css(type) {
            console.log('css.')
            return this[0].style[type]
            // this.dom.forEach( i => {
            //     Object.keys(obj).forEach(k => {
            //         i.style[k] = obj[k]
            //     })
            // })
            // return this
        },
        //@ is(':visible') is(':hidden')
        is(type) {
            //@todo 
            //先简单实现如下，待实现真正功能
            if (type === ':visible') {
                return this
            }
            return false
        },
        prev(items) {
            let index = items.index(this)
            if (index > 0) {
                return cQuery(items[index -1])
            }
            return cQuery(null)
        },
        next(items) {
            let index = items.index(this)
            if (index < items.length-1) {
                return cQuery(items[index +1])
            }
            return cQuery(null)
        },
        index(elem) {
            // @todo
            // Locate the position of the desired element
            return indexOf.call( this,
                // If it receives a jQuery object, the first element is used
                elem.cquery ? elem[ 0 ] : elem
            );
        },
        each(callback) {
            var length, i = 0;
            var obj = this.dom
            // if ( isArrayLike( obj ) ) {
            //     length = obj.length;
            //     for ( ; i < length; i++ ) {
            //         if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
            //             break;
            //         }
            //     }
            // } else {
                obj.forEach((item, i) => {
                    if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                        // break;
                    }
                })
                // for ( i in obj ) {
                //     if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                //         break;
                //     }
                // }
            // }
    
            return this;
        },
        width() {
            return this[0].offsetWidth
        },
        height() {
            return this[0].offsetHeight
        },
        offset() {
            var rect, 
                win,
                elem = this[ 0 ];

            if ( !elem ) {
                return;
            }
            // Get document-relative position by adding viewport scroll to viewport-relative gBCR
            rect = elem.getBoundingClientRect();
            win = elem.ownerDocument.defaultView;
            return {
                top: rect.top + win.pageYOffset,
                left: rect.left + win.pageXOffset
            };
        },
        val(val) {
          console.log('val')  
          if(val) {
              this.dom[0].value = val
              return this
          } else {
              return this.dom[0].value
          }
        },
        //4. 内容操作
        //@todo html() 
        html(content) {
            console.log('text.' + content)
            if (content) {
                this.dom.forEach(i => {
                    i.innerHTML = content
                })
                return this    
            } else {
                return this.dom[0].innerHTML
            }
        },
        //@todo text() 
        text(content) {
            console.log('text.' + content)
            if (content) {
                this.dom.forEach(i => {
                    i.innerText = content
                })
                return this    
            } else {
                return this.dom[0].innerText
            }
        },
        attr(key, val) {
            if (key && !val) {
                return this.dom[0].getAttribute(key)
            } else {
                this.dom.forEach(i => {
                    i.setAttribute(key, val)
                })
                return this
            }
        },
        //DOM获取
        parent() { 
            //@todo 确认是否ok
            return $(this.dom[0].parentNode)    
        },
        siblings() {
            let dom = this.dom[0],
                a = [],
                p = dom.parentNode.children;
            for (let i = 0, pl = p.length; i < pl; i++){
                if (p[i] !== dom) a.push(p[i])
            }
            //@todo 确认$(a)是否ok
            return $(a)
        },

    }
    
    cQuery.extend = cQuery.fn.extend = function() {
        //@todo 
    }

    cQuery.extend({

    })

    cQuery.prototype.init.prototype = cQuery.prototype
    
    window.$ = window.cQuery = cQuery

    console.log('cQuery init')

    return cQuery
});

    // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
    // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    // cQuery.Event.prototype = {
    //     isPropagationStopped () {
    //         // @todo
    //     }
    // };
