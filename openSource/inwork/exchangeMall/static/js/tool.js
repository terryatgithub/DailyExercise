(function (UNDEFINED) {
    //#region var
    var globalScope = typeof global !== "undefined" ? global : window,  //browser or nodejs

        IS_ARRAY = "isArray",
        IS_OBJECT = "isObject",
        FALSE = !1,
        TRUE = !0,
        PROTO = "prototype",
        CALL = "call",
        APPLY = "apply",
        LEN = "length",

        ArrayProto = [],                //Array[PROTO]
        StringProto = String[PROTO],
        FuncProto = Function[PROTO],
        ObjProto = {},                  //Object[PROTO]
        RegExpProto = RegExp[PROTO],

        slice = ArrayProto.slice,       //[].slice
        concat = ArrayProto.concat,     //[].concat
        call = FuncProto[CALL],
        toString = ObjProto.toString,   //{}.toString
        exec = RegExpProto.exec,

        type = ["RegExp", "Function", "Array", "Object", "String", "Number", "Date"];
    //#endregion

    for (var index in type) {
        !function (type) {
            globalScope["is" + type] = function (obj) {
                return toString[CALL](obj) === formatString("[object {0}]", type);
            }
        }(type[index]);
    }

    function likeObj(obj) {
        return typeof obj === "object";
    }

    function getFirstDefined() {
        for (var i = 0,
                length = arguments[LEN] - 1; i < length; i++) {
            if (arguments[i] !== UNDEFINED) return arguments[i];
        }
        return arguments[length];
    }

    function each(obj, iterator, context) {
        if (globalScope[IS_ARRAY](obj)) {
            for (var i = 0, l = obj[LEN]; i < l && iterator[CALL](context, obj[i], i) !== TRUE; i++) { }
        } else {
            for (var key in obj) {
                if (iterator[CALL](context, obj[key], key) === TRUE) return;
            }
        }
    }

    //数组去重
    function unique(arr) {
        arr.sort();
        var res = [arr[0]];
        for(var i = 1; i < arr.length; i++){
            if(arr[i] !== res[res.length - 1]){
                res.push(arr[i]);
            }
        }
        return res;
    }

    //去掉字咐串中所有空格
    function removeAllSpace(str) {
        return str.replace(/\s+/g, "");
    }

    function keys(obj) {
        var arr = [];
        each(obj, function (v, key) {
            arr.push(key);
        });
        return arr;
    }

    function any(obj, predicate, context) {
        var flag = FALSE;
        each(obj, function (v) {
            return flag = predicate[CALL](context, v);
        });
        return flag;
    }

    function extend(obj) {
        each(slice[CALL](arguments, 1), function (arg) {
            for (var key in arg) {
                obj[key] = arg[key];
            }
        });
        return obj;
    }

    function defaults(obj) {
        each(slice[CALL](arguments, 1), function (arg) {
            for (var key in arg) {
                obj[key] = getFirstDefined(obj[key], arg[key]);
            }
        });
        return obj;
    }

    function map(obj, iterator, context) {
        var ret = globalScope[IS_ARRAY](obj) ? [] : {};
        each(obj, function (val, key) {
            ret[key] = iterator[CALL](context, val, key, obj);
        });
        return ret;
    }

    function clone(obj) {
        var ret;
        if (globalScope[IS_ARRAY](obj)) {
            ret = [];
        }
        else if (globalScope[IS_OBJECT](obj)) {
            ret = {};
        } else {
            return obj;
        }
        for (var key in obj) {
            if (likeObj(obj[key])) {
                ret[key] = arguments.callee(obj[key]);
            } else {
                ret[key] = obj[key];
            }
        }
        return ret;
    }

    function formatString(str, arg) {
        var isNotObj = typeof arg !== "object";
        if (isNotObj) arg = slice[CALL](arguments, 1);
        return str.replace(isNotObj ? /{(\d+)}/g : /{(.+?)}/g, function ($, $1) {
            return getFirstDefined(arg[$1], $);
        });
    }

    function formatNumber(number, len, fill) {
        for (var ret = "",
                 len = getFirstDefined(len, 2),
                 fill = getFirstDefined(fill, "0"),
                 i = len; i--; ret += fill) { }
        return (ret + number).slice(-len);
    }

    function formatDate(date, str) {
        var hour = date.getHours(),
            millisecond = date.getMilliseconds(),
            longDate = {
                MM: date.getMonth() + 1,
                dd: date.getDate(),
                HH: hour,
                hh: hour % 12 || 12,
                mm: date.getMinutes(),
                ss: date.getSeconds()
            };
        return format((str || "yyyy-MM-dd").replace(/(yyyy|MM|M|dd|d|HH|H|hh|h|tt|t|mm|m|ss|s|fff|f)/g, "{$1}"), extend({
            yyyy: date.getFullYear(),
            M: longDate.MM,
            H: hour,
            d: longDate.dd,
            h: longDate.hh,
            m: longDate.mm,
            s: longDate.ss,
            f: millisecond,
            fff: format(millisecond, 3),
            tt: hour < 12 ? "AM" : "PM"
        }, map(longDate, function (val) {
            return format(val);
        })));
    }

    //Router
    function format(obj) {
        var args = slice[CALL](arguments),
            result;
        if (isString(obj)) {
            result = formatString[APPLY](null, args);
        } else if (isNumber(obj)) {
            result = formatNumber[APPLY](null, args);
        } else if (isDate(obj)) {
            result = formatDate[APPLY](null, args);
        }
        return result;
    }

    function formatMoney(str, len, separator) {
        if (isString(len)) {
            separator = len;
            len = 3;
        }
        return str.toString().replace(/([^.]+)/, function (x, l) {
            return l.reverse().replace(new RegExp(format("\\d{{0}}(?=\\d)", len || 3), "g"), function (n) {
                return n + (separator || ",");
            }).reverse();
        });
    }

    //extend
    extend(globalScope, {
        formatString: formatString,
        formatNumber: formatNumber,
        formatDate: formatDate
    });
    each(type.slice(-3), function (val, key) {
        globalScope[val][PROTO].format = function () {
            return globalScope["format" + val][APPLY](null, concat[APPLY]([this], arguments));
        };
    });
    StringProto.reverse = function () {
        return this.split("").reverse().join("");
    };
    StringProto.formatMoney = function () {
        return formatMoney[APPLY](null, concat[APPLY]([this], arguments));
    };
    RegExpProto.run = function (str, iterator) {
        if (!this.global) throw new Error("dead loop");
        for (var match = UNDEFINED || (this.i = -1) ; (this.i++, match = exec[CALL](this, str)) && iterator[APPLY](this, match.concat(this.lastIndex)) !== TRUE;) { }
        //var match;
        //while (true) {
        //    match = exec[CALL](this, str);
        //    if (match == null || iterator[APPLY](this, match.concat(this.lastIndex)) === true) return;
        //}
    };
    RegExpProto.exec = function (str, iterator) {
        if (typeof iterator !== "function") {
            return exec[CALL](this, str);
        } else {
            if (!this.global) throw new Error("loop err");
            for (var match; (match = exec[CALL](this, str)) && iterator[CALL](this, match, this) !== TRUE;) { }
        }
    };
    extend(globalScope, {
        likeObj: likeObj,
        getFirstDefined: getFirstDefined,
        each: each,
        eachAsync: function (arr, iterator, callback, context) {
            for (var i = 0, sum = 0, l = arr[LEN]; i < l && iterator[CALL](context, function () {
                if (++sum == l) { callback(); }
            }, arr[i], i) !== TRUE; i++) { }
        },
        eachSync: function (arr) {
            arr[LEN] && (function (i, arr, iterator, callback, context) {
                var arg = arguments;
                iterator[CALL](context, function () {
                    if (arr[LEN] === ++arg[0]) {
                        callback();
                    } else {
                        arg.callee[APPLY](UNDEFINED, arg);
                    }
                }, arr[i], i);
            })[APPLY](UNDEFINED, [0].concat(slice[CALL](arguments)));
        },
        keys: keys,
        unique:unique,
        removeAllSpace:removeAllSpace,
        any: any,
        uniq: function (arr) {
            var ret = [];
            each(arr, function (v) {
                if (!any(ret, function (val) {
                    return val === v;
                })) {
                    ret.push(v);
                }
            });
            return ret;
        },
        extend: extend,
        defaults: defaults,
        map: map,
        clone: clone,
        format: format,
        slice: slice,
        concat: concat,
        range: function (min, max) {
            min > max && (min ^= max, max ^= min, min ^= max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        isMoney: function (str) {
            return isNumber(str) || /^-?(?:\d+(\.(\d+))?|\.\d+)$/.test(str);
        },
        asMoney: function (obj, key) {
            obj[key] = parseFloat(obj[key]);
            return TRUE;
        },
        toMoney: function (str) {
            return parseFloat(parseFloat(str).toFixed(2));
        },
        absLength: function (str) {
            var sum = 0;
            /([\x00-\xff])|([^\x00-\xff])/g.run(str, function (_, $1) {
                sum += $1 ? 1 : 2;
            });
            return sum;
        },
        formatMoney: formatMoney,
        addFn: function (obj, fns) {
            /(\w+[^,$])/g.run(fns, function (match, fn) {
                obj[fn] = function () {
                    ArrayProto[fn][APPLY](this, arguments);
                    return this; //链式支持
                };
            });
            return obj;
        },
        //fn的返回值将发送到callback
        processor: function (fn, callback, milliseconds) {
            if (!isFunction(callback)) {
                milliseconds = callback;
            }
            var timeoutId = null;
            var process = function () {
                clearTimeout(timeoutId);
                var args = arguments;
                var self = this;
                timeoutId = setTimeout(function () {
                    isFunction(callback)
                        ? callback(fn[APPLY](self, args))
                        : fn[APPLY](self, args);
                }, milliseconds || 400);
            }
            return function () {
                process[APPLY](this, arguments);
            };
        },
        get: function (obj, str) {
            var ret = obj;
            if (likeObj(obj)) {
                /([^.]+)/g.run(str, function (match, item) {
                    if (likeObj(ret) && item in ret) {
                        ret = ret[item];
                    } else {
                        ret = null;
                        return TRUE;
                    }
                });
            }
            return ret === obj ? null : ret;
        },
        set: function (obj, str, val) {
            //set(window, "aa.bb.cc", "dd")
            var ret;
            if (likeObj(obj)) {
                /([^.]+)(?=\.([^.]+)|$)/g.run(str, function (match, child, grandson) {
                    if (grandson) {
                        if (!likeObj(obj[child])) {
                            obj[child] = {};
                        }
                        obj = obj[child];
                    } else {
                        ret = obj[child] = val;
                    }
                });
                return ret;
            } else {
                throw new Error(obj + " is not Object");
            }
        }
    });
})();
var autoResize = (function () {
    var resizeEl = $();
    $(window).resize(processor(function () {
        resizeEl.css(getScreenSize());
    }, 50));

    return {
        push: function (el) {
            resizeEl = resizeEl.add(el);
            el.css(getScreenSize());
        }
    };
})();

function timeTotimestamp(date,type) {
    //type1为13位
    //type2为10位
    var date = new Date(date);
    return type == 2 ? date.getTime()/1000 : date.getTime();
};

function safePlus() {
    var sum = 0;
    each(slice.call(arguments), function (v) {
        sum += v * 100;
    });
    return parseFloat(parseFloat(sum / 100).toFixed(2));
};

function getScreenSize() {
    return {
        width: $(window).width() + $(window).scrollLeft(),
        height: $(window).height() + $(window).scrollTop()
    };
};

function jsonSend( url , param , callback , async ){
    if( async != false ){
        async = true;
    }
    $.ajax({
        url:url,
        data:param,
        type:'post',
        async:async,
        dataType:'json',
        success:callback
    });
}
(function ($) {
    var ajaxBg = $('<div class="loader-bg"><div class="loader"></div></div>').css({
        zIndex: 9999,
        position: "fixed",
        display: "none",
        left: 0,
        top: 0
    }).prependTo($("body"));
    autoResize.push(ajaxBg);

    $.ajaxSetup({
        count: 0,
        //可传递一个遮挡元素 默认使用上面的ajaxBg元素
        cover: null,
        global: false,
        type: "POST",
        beforeSend: function () {
            if (this.global) {
                $.ajaxSettings.count++;
                $(this.cover).length ? $(this.cover).show() : ajaxBg.show();
            }
        },
        complete: function (request) {
            ajaxBg.hide()
            ;
            if (this.global) {
                if (!--$.ajaxSettings.count) {
                    $(this.cover).length ? $(this.cover).hide() : ajaxBg.hide();
                }
            }

            if (request.status >= 500) {
                toast("服务器繁忙，请稍后重试！");
            }
        }
    });

    $.fn.hoverDelay = function(options){
        var defaults = {
            hoverDuring: 200,
            outDuring: 200,
            hoverEvent: function(){
                $.noop();
            },
            outEvent: function(){
                $.noop();
            }
        };
        var sets = $.extend(defaults,options || {});
        var hoverTimer, outTimer;
        return $(this).each(function(){
            $(this).hover(function(){
                clearTimeout(outTimer);
                hoverTimer = setTimeout(sets.hoverEvent, sets.hoverDuring);
            },function(){
                clearTimeout(hoverTimer);
                outTimer = setTimeout(sets.outEvent, sets.outDuring);
            });
        });
    }
})(jQuery);
