import './cQuery_es'

var CCFocusFixed = /** @class */ (function () {
    function CCFocusFixed() {
        this.debug = true;
        this.isSupportClick = false;
        this.isSupportTouch = true;
        this.linkButs = null;
        this.curLink = null;
        this.keydownListener = null;
        this.focusClass = null;
        return this;
    }
    CCFocusFixed.getInstance = function () {
        if (!CCFocusFixed.instance) {
            CCFocusFixed.instance = new CCFocusFixed();
        }
        return CCFocusFixed.instance;
    };
    CCFocusFixed.prototype.init = function (buts, curlink, hover) {
        var that = this;
        this.linkButs = (buts instanceof $) ? buts : $(buts);
        for (var i = this.linkButs.length - 1; i >= 0; i--) {
            var o = this.linkButs[i];
            if (o.getAttribute('data-no-focus') === 'true') {
                this.linkButs.splice(i, 1);
            }
        }
        if (this.linkButs.length === 0) {
            this.linkButs = $('body');
        }
        var c = (curlink instanceof $) ? curlink : $(curlink);
        if (c.length !== 0) {
            for (var j = 0; j < this.linkButs.length; j++) {
                if (this.linkButs.get(j) == c.get(0)) {
                    this.curLink = c;
                    break;
                }
            }
        }
        if (this.curLink == null) {
            for (var k = 0; k < this.linkButs.length; k++) {
                if ($(this.linkButs[k]).is(':visible')) {
                    this.curLink = $(this.linkButs[k]);
                    break;
                }
            }
        }
        this.focusClass = hover == null ? 'hover' : hover;
        this.setHeightLight();
        //@ keydown事件从哪里触发，这里是否能监听到？？ 
        console.log('before ccmap unbind')
        // $(document).unbind('keydown').bind('keydown', function (ev) { that.keydownHandler(ev); });
        const cb = function (ev) { that.keydownHandler(ev); }
        document.removeEventListener('keydown', cb)
        document.addEventListener('keydown', cb)
        console.log('after ccmap unbind')
        this.addClickAndTouchListener();
        return this;
    };
    CCFocusFixed.prototype.setFocusClass = function (focusClass) {
        if (!focusClass || typeof focusClass !== 'string') {
            this.log('WARNING: focusClass is incorrect');
            return this;
        }
        if (this.focusClass === focusClass)
            return this;
        this.linkButs.removeClass(this.focusClass);
        this.focusClass = focusClass;
        this.setHeightLight();
        return this;
    };
    CCFocusFixed.prototype.setOnKeydownListener = function (fn) {
        if (!fn || typeof fn !== 'function') {
            throw new Error("param must be a function");
        }
        this.keydownListener = fn;
    };
    CCFocusFixed.prototype.reset = function (buts) {
        if (!buts) {
            this.log('WARNING: param is incorrect');
            return this;
        }
        this.linkButs.removeClass(this.focusClass);
        this.removeClickAndTouchListener();
        this.linkButs = $(buts);
        this.curLink = null;
        this.setHeightLight();
        this.addClickAndTouchListener();
        return this;
    };
    CCFocusFixed.prototype.add = function (target) {
        if (!target) {
            this.log('WARNING: target is null');
            return this;
        }
        this.linkButs = this.linkButs.add(target);
        this.addClickAndTouchListener();
        return this;
    };
    CCFocusFixed.prototype.remove = function (target) {
        if (!target) {
            this.log('WARNING: target is null');
            return this;
        }
        this.log(this.focusClass);
        this.linkButs.removeClass(this.focusClass);
        this.removeClickAndTouchListener();
        this.linkButs = this.linkButs.not(target);
        this.setHeightLight();
        this.addClickAndTouchListener();
        return this;
    };
    CCFocusFixed.prototype.setSupportTouch = function (value) {
        if (!value) {
            this.log('WARNING: value is null');
            return this;
        }
        this.isSupportTouch = value;
        this.addClickAndTouchListener();
        return this;
    };
    CCFocusFixed.prototype.setSupportClick = function (value) {
        if (!value) {
            this.log('WARNING: value is null');
            return this;
        }
        this.isSupportClick = value;
        this.addClickAndTouchListener();
        return this;
    };
    CCFocusFixed.prototype.setFocus = function (target) {
        if (!target) {
            this.log('WARNING: target is null');
            return this;
        }
        if (!(target instanceof $))
            target = $(target);
        if (this.linkButs.index(target) === -1) {
            this.log('WARNING: target is not found');
            return this;
        }
        if (!target.is(":visible")) {
            this.log('WARNING: target is invisible');
            target = null;
            return this;
        }
        this.curLink = target;
        this.setHeightLight();
        return this;
    };
    CCFocusFixed.prototype.log = function () {
        var rest = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            rest[_i] = arguments[_i];
        }
        this.debug && console.log.apply(console, rest);
    };
    CCFocusFixed.prototype.setDebugFlag = function (value) {
        this.debug = value;
    };
    CCFocusFixed.prototype.moveUp = function () {
        if (this.curLink.attr("upTarget")) {
            if (this.curLink.attr("upTarget") === '#')
                return; //fixbug: 阻止焦点移动
            var link = $(this.curLink.attr("upTarget"));
            if (link.length > 0) {
                if (this.linkButs.index(link) === -1)
                    return; //fixbug：class不同的目标元素不能落焦
                this.curLink = link;
                this.setHeightLight();
                return this;
            }
        }
        var curLink = this.curLink, xthis, xdist, leftCoincide, rightCoincide, isFind = false, coincideDistance = 99999, noCoincideDistance = 99999, mx = curLink.offset().left, my = curLink.offset().top;
        this.linkButs.each(function () {
            xthis = $(this);
            if (xthis.is(":hidden") || xthis.css("visibility") == 'hidden')
                return this;
            var nx = xthis.offset().left, ny = xthis.offset().top;
            //先找重叠的目标元素，直接算Y坐标
            leftCoincide = nx <= mx && nx + xthis.width() > mx;
            rightCoincide = nx >= mx && mx + curLink.width() > nx;
            if (ny < my && (leftCoincide || rightCoincide)) {
                xdist = my - ny;
                if (xdist < coincideDistance) {
                    coincideDistance = xdist;
                    curLink = xthis;
                }
                isFind = true;
            }
            else if (isFind == false) {
                ///非重叠目标元素找距离最短的，向上移动的时候，如果在目标右边，计算左下角，否则计算右下角
                if (ny < my) {
                    if (nx >= mx)
                        xdist = CCFocusFixed.lineDistance(nx, ny + xthis.height(), mx, my);
                    else
                        xdist = CCFocusFixed.lineDistance(nx + xthis.width(), ny + xthis.height(), mx, my);
                    if (xdist < noCoincideDistance) {
                        noCoincideDistance = xdist;
                        curLink = xthis;
                    }
                }
            }
        });
        this.curLink = curLink;
        this.setHeightLight();
        return this;
    };
    CCFocusFixed.prototype.moveDown = function () {
        var _this = this;
        if (_this.curLink.attr("downTarget")) {
            if (_this.curLink.attr("downTarget") === '#')
                return;
            var link = $(_this.curLink.attr("downTarget"));
            if (link.length > 0) {
                if (_this.linkButs.index(link) === -1)
                    return;
                _this.curLink = link;
                this.setHeightLight();
                return this;
            }
        }
        var curLink = _this.curLink;
        var xthis, leftCoincide, rightCoincide, diffDistance = 99999;
        var mx = curLink.offset().left;
        var my = curLink.offset().top;
        var tarLink = curLink;
        var diffNoCoincide = 99999;
        var findF = false;
        var xdist;
        _this.linkButs.each(function () {
            xthis = $(this);
            if (xthis.is(":hidden") || xthis.css("visibility") == 'hidden') {
                return true;
            }
            var nx = xthis.offset().left;
            var ny = xthis.offset().top;
            leftCoincide = nx <= mx && nx + xthis.width() > mx;
            rightCoincide = nx >= mx && mx + tarLink.width() > nx;
            if (ny > my && (leftCoincide || rightCoincide)) {
                xdist = ny - my;
                if (xdist < diffDistance) {
                    diffDistance = xdist;
                    curLink = xthis;
                }
                findF = true;
            }
            else if (findF == false) {
                if (ny > my) {
                    //xdist = lineDistance(nx, ny, mx, my);
                    //向下移动的时候，如果在目标右边，计算左下角，否则计算右下角            
                    if (nx >= mx)
                        xdist = CCFocusFixed.lineDistance(nx, ny, mx, my + tarLink.height());
                    else
                        xdist = CCFocusFixed.lineDistance(nx + xthis.width(), ny, mx, my + tarLink.height());
                    if (xdist < diffNoCoincide) {
                        diffNoCoincide = xdist;
                        curLink = xthis;
                    }
                }
            }
        });
        _this.curLink = curLink;
        this.setHeightLight();
        return this;
    };
    CCFocusFixed.prototype.moveLeft = function () {
        var _this = this;
        if (_this.curLink.attr("leftTarget")) {
            if (_this.curLink.attr("leftTarget") === '#')
                return;
            var link = $(_this.curLink.attr("leftTarget"));
            if (link.length > 0) {
                if (_this.linkButs.index(link) === -1)
                    return;
                _this.curLink = link;
                this.setHeightLight();
                return this;
            }
        }
        var curLink = _this.curLink, xthis, upCoincide, downCoincide, diffDistance = 99999;
        var mx = curLink.offset().left, my = curLink.offset().top;
        var diffNoCoincide = 99999;
        var prev = _this.curLink.prev(_this.linkButs);
        var xdist;
        while (prev.length > 0) {
            //查找相邻的节点
            if (_this.linkButs.index(prev) != -1) {
                curLink = prev;
                break;
            }
            else {
                prev = prev.prev(_this.linkButs);
            }
        }
        if (_this.curLink == curLink) {
            _this.linkButs.each(function () {
                xthis = $(this);
                if (xthis.is(":hidden") || xthis.css("visibility") == 'hidden') {
                    return this;
                }
                var nx = xthis.offset().left, ny = xthis.offset().top;
                // 如果2个box有重叠，则计算x最近的即可
                upCoincide = ny <= my && ny + xthis.height() > my;
                downCoincide = ny >= my && ny < my + curLink.height();
                if (nx < mx && (upCoincide || downCoincide)) {
                    xdist = mx - nx;
                    if (xdist < diffDistance) {
                        diffDistance = xdist;
                        curLink = xthis;
                    }
                }
                if (nx < mx) {
                    // 向左边移动的时候，如果在目标上边，计算右下角，否则计算右上角
                    if (ny >= my) {
                        xdist = CCFocusFixed.lineDistance(nx + xthis.width(), ny, mx, my);
                    }
                    else {
                        xdist = CCFocusFixed.lineDistance(nx + xthis.width(), ny + xthis.height(), mx, my);
                    }
                    if (xdist < diffNoCoincide) {
                        diffNoCoincide = xdist;
                        curLink = xthis;
                    }
                }
            });
        }
        _this.curLink = curLink;
        this.setHeightLight();
        return this;
    };
    CCFocusFixed.prototype.moveRight = function () {
        var _this = this;
        if (_this.curLink.attr("rightTarget")) {
            if (_this.curLink.attr("rightTarget") === '#')
                return;
            var link = $(_this.curLink.attr("rightTarget"));
            if (link.length > 0) {
                if (_this.linkButs.index(link) === -1)
                    return;
                _this.curLink = link;
                this.setHeightLight();
                return this;
            }
        }
        var curLink = _this.curLink;
        var xthis, upCoincide, downCoincide, diffDistance = 99999;
        var mx = curLink.offset().left;
        var my = curLink.offset().top;
        var tarLink = curLink;
        var diffNoCoincide = 99999;
        var next = _this.curLink.next(_this.linkButs);
        while (next.length > 0) {
            if (_this.linkButs.index(next) != -1) {
                curLink = next;
                break;
            }
            else {
                next = next.next(_this.linkButs);
            }
        }
        if (_this.curLink == curLink) {
            _this.linkButs.each(function () {
                xthis = $(this);
                if (xthis.is(":hidden") || xthis.css("visibility") == 'hidden') {
                    return this;
                }
                var nx = xthis.offset().left;
                var ny = xthis.offset().top;
                var xdist;
                upCoincide = ny <= my && ny + xthis.height() > my;
                downCoincide = ny >= my && ny < my + curLink.height();
                if (nx > mx && (upCoincide || downCoincide)) {
                    xdist = nx - mx;
                    if (xdist < diffDistance) {
                        diffDistance = xdist;
                        curLink = xthis;
                    }
                }
                if (nx > mx) {
                    //向右边移动的时候，如果在目标上边，计算目标左下角，否则计算左上角
                    if (ny >= my)
                        xdist = CCFocusFixed.lineDistance(nx, ny, mx + tarLink.width(), my);
                    else
                        xdist = CCFocusFixed.lineDistance(nx, ny + xthis.height(), mx + tarLink.width(), my);
                    if (xdist < diffNoCoincide) {
                        diffNoCoincide = xdist;
                        curLink = xthis;
                    }
                }
            });
        }
        _this.curLink = curLink;
        this.setHeightLight();
        return this;
    };
    CCFocusFixed.lineDistance = function (x1, y1, x2, y2) {
        var xs = 0, ys = 0;
        xs = Math.abs(x1 - x2);
        xs = xs * xs;
        ys = Math.abs(y1 - y2);
        ys = ys * ys;
        return Math.sqrt(xs + ys);
    };
    CCFocusFixed.prototype.keydownHandler = function (ev) {
        this.log('keydownHandler keyCode = ' + ev.keyCode);
        var lastLink = this.curLink;
        // if (ev.isPropagationStopped() == false) {
        var test = true
        if (test) {
            switch (ev.keyCode) {
                case 37:
                    this.moveLeft();
                    ev.stopPropagation();
                    break;
                case 38:
                    this.moveUp();
                    ev.stopPropagation();
                    break;
                case 39:
                    this.moveRight();
                    ev.stopPropagation();
                    break;
                case 40:
                    this.moveDown();
                    ev.stopPropagation();
                    break;
                case 13:
                    this.curLink.trigger("itemClick");
                    break;
            }
        }
        if (lastLink != this.curLink) {
            lastLink.trigger("itemBlur");
            this.curLink.trigger("itemFocus");
        }
        this.keydownListener && this.keydownListener(ev);
    };
    CCFocusFixed.prototype.addClickAndTouchListener = function () {
        var that = this;
        if (this.isSupportTouch) {
            this.linkButs.unbind('touchstart').bind('touchstart', function () {
                that.linkButs.removeClass(that.focusClass);
                $(this).addClass(that.focusClass);
                $(this).trigger("itemClick");
            });
        }
        // 坑：Android5.0（不止）遥控器按键会触发click事件，导致触发两次itemClick
        // 鼠标点击同样会触发touchstart事件
        // 暂时关闭这段代码
        // if(this.isSupportClick) {
        // 	this.linkButs.unbind('click').bind('click', function() {
        // 		that.linkButs.removeClass(that.focusClass)
        // 		$(this).addClass(that.focusClass)
        // 		$(this).trigger("itemClick")
        // 	})
        // }
    };
    CCFocusFixed.prototype.removeClickAndTouchListener = function () {
        this.linkButs.unbind('touchstart');
        this.linkButs.unbind('click');
    };
    CCFocusFixed.prototype.setHeightLight = function () {
        if (this.curLink == null) {
            //将第一个可见元素设置为焦点元素
            for (var i = 0; i < this.linkButs.length; i++) {
                if ($(this.linkButs[i]).is(":visible")) {
                    this.curLink = $(this.linkButs[i]);
                    break;
                }
            }
        }
        this.linkButs.attr("readonly", true);
        this.linkButs.removeClass(this.focusClass);
        this.curLink.addClass(this.focusClass);
    };
    return CCFocusFixed;
}());
var ccMap = CCFocusFixed.getInstance();

export default ccMap;
