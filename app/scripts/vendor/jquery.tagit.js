/*! jQuery UI - v1.10.1 - 2013-02-27
 * http://jqueryui.com
 * Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.position.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.selectable.js, jquery.ui.sortable.js, jquery.ui.autocomplete.js, jquery.ui.menu.js
 * Copyright (c) 2013 jQuery Foundation and other contributors Licensed MIT */

(function(e, t) {
    function i(t, n) {
        var r, i, o, u = t.nodeName.toLowerCase();
        return "area" === u ? (r = t.parentNode, i = r.name, !t.href || !i || r.nodeName.toLowerCase() !== "map" ? !1 : (o = e("img[usemap=#" + i + "]")[0], !! o && s(o))) : (/input|select|textarea|button|object/.test(u) ? !t.disabled : "a" === u ? t.href || n : n) && s(t)
    }

    function s(t) {
        return e.expr.filters.visible(t) && !e(t).parents().addBack().filter(function() {
            return e.css(this, "visibility") === "hidden"
        }).length
    }
    var n = 0,
        r = /^ui-id-\d+$/;
    e.ui = e.ui || {};
    if (e.ui.version) return;
    e.extend(e.ui, {
        version: "1.10.1",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), e.fn.extend({
        _focus: e.fn.focus,
        focus: function(t, n) {
            return typeof t == "number" ? this.each(function() {
                var r = this;
                setTimeout(function() {
                    e(r).focus(), n && n.call(r)
                }, t)
            }) : this._focus.apply(this, arguments)
        },
        scrollParent: function() {
            var t;
            return e.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? t = this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(e.css(this, "position")) && /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
            }).eq(0) : t = this.parents().filter(function() {
                return /(auto|scroll)/.test(e.css(this, "overflow") + e.css(this, "overflow-y") + e.css(this, "overflow-x"))
            }).eq(0), /fixed/.test(this.css("position")) || !t.length ? e(document) : t
        },
        zIndex: function(n) {
            if (n !== t) return this.css("zIndex", n);
            if (this.length) {
                var r = e(this[0]),
                    i, s;
                while (r.length && r[0] !== document) {
                    i = r.css("position");
                    if (i === "absolute" || i === "relative" || i === "fixed") {
                        s = parseInt(r.css("zIndex"), 10);
                        if (!isNaN(s) && s !== 0) return s
                    }
                    r = r.parent()
                }
            }
            return 0
        },
        uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++n)
            })
        },
        removeUniqueId: function() {
            return this.each(function() {
                r.test(this.id) && e(this).removeAttr("id")
            })
        }
    }), e.extend(e.expr[":"], {
        data: e.expr.createPseudo ? e.expr.createPseudo(function(t) {
            return function(n) {
                return !!e.data(n, t)
            }
        }) : function(t, n, r) {
            return !!e.data(t, r[3])
        },
        focusable: function(t) {
            return i(t, !isNaN(e.attr(t, "tabindex")))
        },
        tabbable: function(t) {
            var n = e.attr(t, "tabindex"),
                r = isNaN(n);
            return (r || n >= 0) && i(t, !r)
        }
    }), e("<a>").outerWidth(1).jquery || e.each(["Width", "Height"], function(n, r) {
        function u(t, n, r, s) {
            return e.each(i, function() {
                n -= parseFloat(e.css(t, "padding" + this)) || 0, r && (n -= parseFloat(e.css(t, "border" + this + "Width")) || 0), s && (n -= parseFloat(e.css(t, "margin" + this)) || 0)
            }), n
        }
        var i = r === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
            s = r.toLowerCase(),
            o = {
                innerWidth: e.fn.innerWidth,
                innerHeight: e.fn.innerHeight,
                outerWidth: e.fn.outerWidth,
                outerHeight: e.fn.outerHeight
            };
        e.fn["inner" + r] = function(n) {
            return n === t ? o["inner" + r].call(this) : this.each(function() {
                e(this).css(s, u(this, n) + "px")
            })
        }, e.fn["outer" + r] = function(t, n) {
            return typeof t != "number" ? o["outer" + r].call(this, t) : this.each(function() {
                e(this).css(s, u(this, t, !0, n) + "px")
            })
        }
    }), e.fn.addBack || (e.fn.addBack = function(e) {
        return this.add(e == null ? this.prevObject : this.prevObject.filter(e))
    }), e("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (e.fn.removeData = function(t) {
        return function(n) {
            return arguments.length ? t.call(this, e.camelCase(n)) : t.call(this)
        }
    }(e.fn.removeData)), e.ui.ie = !! /msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), e.support.selectstart = "onselectstart" in document.createElement("div"), e.fn.extend({
        disableSelection: function() {
            return this.bind((e.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(e) {
                e.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }), e.extend(e.ui, {
        plugin: {
            add: function(t, n, r) {
                var i, s = e.ui[t].prototype;
                for (i in r) s.plugins[i] = s.plugins[i] || [], s.plugins[i].push([n, r[i]])
            },
            call: function(e, t, n) {
                var r, i = e.plugins[t];
                if (!i || !e.element[0].parentNode || e.element[0].parentNode.nodeType === 11) return;
                for (r = 0; r < i.length; r++) e.options[i[r][0]] && i[r][1].apply(e.element, n)
            }
        },
        hasScroll: function(t, n) {
            if (e(t).css("overflow") === "hidden") return !1;
            var r = n && n === "left" ? "scrollLeft" : "scrollTop",
                i = !1;
            return t[r] > 0 ? !0 : (t[r] = 1, i = t[r] > 0, t[r] = 0, i)
        }
    })
})(jQuery);
(function(e, t) {
    var n = 0,
        r = Array.prototype.slice,
        i = e.cleanData;
    e.cleanData = function(t) {
        for (var n = 0, r;
            (r = t[n]) != null; n++) try {
            e(r).triggerHandler("remove")
        } catch (s) {}
        i(t)
    }, e.widget = function(t, n, r) {
        var i, s, o, u, a = {}, f = t.split(".")[0];
        t = t.split(".")[1], i = f + "-" + t, r || (r = n, n = e.Widget), e.expr[":"][i.toLowerCase()] = function(t) {
            return !!e.data(t, i)
        }, e[f] = e[f] || {}, s = e[f][t], o = e[f][t] = function(e, t) {
            if (!this._createWidget) return new o(e, t);
            arguments.length && this._createWidget(e, t)
        }, e.extend(o, s, {
            version: r.version,
            _proto: e.extend({}, r),
            _childConstructors: []
        }), u = new n, u.options = e.widget.extend({}, u.options), e.each(r, function(t, r) {
            if (!e.isFunction(r)) {
                a[t] = r;
                return
            }
            a[t] = function() {
                var e = function() {
                    return n.prototype[t].apply(this, arguments)
                }, i = function(e) {
                        return n.prototype[t].apply(this, e)
                    };
                return function() {
                    var t = this._super,
                        n = this._superApply,
                        s;
                    return this._super = e, this._superApply = i, s = r.apply(this, arguments), this._super = t, this._superApply = n, s
                }
            }()
        }), o.prototype = e.widget.extend(u, {
            widgetEventPrefix: s ? u.widgetEventPrefix : t
        }, a, {
            constructor: o,
            namespace: f,
            widgetName: t,
            widgetFullName: i
        }), s ? (e.each(s._childConstructors, function(t, n) {
            var r = n.prototype;
            e.widget(r.namespace + "." + r.widgetName, o, n._proto)
        }), delete s._childConstructors) : n._childConstructors.push(o), e.widget.bridge(t, o)
    }, e.widget.extend = function(n) {
        var i = r.call(arguments, 1),
            s = 0,
            o = i.length,
            u, a;
        for (; s < o; s++)
            for (u in i[s]) a = i[s][u], i[s].hasOwnProperty(u) && a !== t && (e.isPlainObject(a) ? n[u] = e.isPlainObject(n[u]) ? e.widget.extend({}, n[u], a) : e.widget.extend({}, a) : n[u] = a);
        return n
    }, e.widget.bridge = function(n, i) {
        var s = i.prototype.widgetFullName || n;
        e.fn[n] = function(o) {
            var u = typeof o == "string",
                a = r.call(arguments, 1),
                f = this;
            return o = !u && a.length ? e.widget.extend.apply(null, [o].concat(a)) : o, u ? this.each(function() {
                var r, i = e.data(this, s);
                if (!i) return e.error("cannot call methods on " + n + " prior to initialization; " + "attempted to call method '" + o + "'");
                if (!e.isFunction(i[o]) || o.charAt(0) === "_") return e.error("no such method '" + o + "' for " + n + " widget instance");
                r = i[o].apply(i, a);
                if (r !== i && r !== t) return f = r && r.jquery ? f.pushStack(r.get()) : r, !1
            }) : this.each(function() {
                var t = e.data(this, s);
                t ? t.option(o || {})._init() : e.data(this, s, new i(o, this))
            }), f
        }
    }, e.Widget = function() {}, e.Widget._childConstructors = [], e.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(t, r) {
            r = e(r || this.defaultElement || this)[0], this.element = e(r), this.uuid = n++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = e.widget.extend({}, this.options, this._getCreateOptions(), t), this.bindings = e(), this.hoverable = e(), this.focusable = e(), r !== this && (e.data(r, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(e) {
                    e.target === r && this.destroy()
                }
            }), this.document = e(r.style ? r.ownerDocument : r.document || r), this.window = e(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
        },
        _getCreateOptions: e.noop,
        _getCreateEventData: e.noop,
        _create: e.noop,
        _init: e.noop,
        destroy: function() {
            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(e.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
        },
        _destroy: e.noop,
        widget: function() {
            return this.element
        },
        option: function(n, r) {
            var i = n,
                s, o, u;
            if (arguments.length === 0) return e.widget.extend({}, this.options);
            if (typeof n == "string") {
                i = {}, s = n.split("."), n = s.shift();
                if (s.length) {
                    o = i[n] = e.widget.extend({}, this.options[n]);
                    for (u = 0; u < s.length - 1; u++) o[s[u]] = o[s[u]] || {}, o = o[s[u]];
                    n = s.pop();
                    if (r === t) return o[n] === t ? null : o[n];
                    o[n] = r
                } else {
                    if (r === t) return this.options[n] === t ? null : this.options[n];
                    i[n] = r
                }
            }
            return this._setOptions(i), this
        },
        _setOptions: function(e) {
            var t;
            for (t in e) this._setOption(t, e[t]);
            return this
        },
        _setOption: function(e, t) {
            return this.options[e] = t, e === "disabled" && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !! t).attr("aria-disabled", t), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _on: function(t, n, r) {
            var i, s = this;
            typeof t != "boolean" && (r = n, n = t, t = !1), r ? (n = i = e(n), this.bindings = this.bindings.add(n)) : (r = n, n = this.element, i = this.widget()), e.each(r, function(r, o) {
                function u() {
                    if (!t && (s.options.disabled === !0 || e(this).hasClass("ui-state-disabled"))) return;
                    return (typeof o == "string" ? s[o] : o).apply(s, arguments)
                }
                typeof o != "string" && (u.guid = o.guid = o.guid || u.guid || e.guid++);
                var a = r.match(/^(\w+)\s*(.*)$/),
                    f = a[1] + s.eventNamespace,
                    l = a[2];
                l ? i.delegate(l, f, u) : n.bind(f, u)
            })
        },
        _off: function(e, t) {
            t = (t || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.unbind(t).undelegate(t)
        },
        _delay: function(e, t) {
            function n() {
                return (typeof e == "string" ? r[e] : e).apply(r, arguments)
            }
            var r = this;
            return setTimeout(n, t || 0)
        },
        _hoverable: function(t) {
            this.hoverable = this.hoverable.add(t), this._on(t, {
                mouseenter: function(t) {
                    e(t.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(t) {
                    e(t.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(t) {
            this.focusable = this.focusable.add(t), this._on(t, {
                focusin: function(t) {
                    e(t.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(t) {
                    e(t.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(t, n, r) {
            var i, s, o = this.options[t];
            r = r || {}, n = e.Event(n), n.type = (t === this.widgetEventPrefix ? t : this.widgetEventPrefix + t).toLowerCase(), n.target = this.element[0], s = n.originalEvent;
            if (s)
                for (i in s) i in n || (n[i] = s[i]);
            return this.element.trigger(n, r), !(e.isFunction(o) && o.apply(this.element[0], [n].concat(r)) === !1 || n.isDefaultPrevented())
        }
    }, e.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(t, n) {
        e.Widget.prototype["_" + t] = function(r, i, s) {
            typeof i == "string" && (i = {
                effect: i
            });
            var o, u = i ? i === !0 || typeof i == "number" ? n : i.effect || n : t;
            i = i || {}, typeof i == "number" && (i = {
                duration: i
            }), o = !e.isEmptyObject(i), i.complete = s, i.delay && r.delay(i.delay), o && e.effects && e.effects.effect[u] ? r[t](i) : u !== t && r[u] ? r[u](i.duration, i.easing, s) : r.queue(function(n) {
                e(this)[t](), s && s.call(r[0]), n()
            })
        }
    })
})(jQuery);
(function(e, t) {
    var n = !1;
    e(document).mouseup(function() {
        n = !1
    }), e.widget("ui.mouse", {
        version: "1.10.1",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var t = this;
            this.element.bind("mousedown." + this.widgetName, function(e) {
                return t._mouseDown(e)
            }).bind("click." + this.widgetName, function(n) {
                if (!0 === e.data(n.target, t.widgetName + ".preventClickEvent")) return e.removeData(n.target, t.widgetName + ".preventClickEvent"), n.stopImmediatePropagation(), !1
            }), this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(t) {
            if (n) return;
            this._mouseStarted && this._mouseUp(t), this._mouseDownEvent = t;
            var r = this,
                i = t.which === 1,
                s = typeof this.options.cancel == "string" && t.target.nodeName ? e(t.target).closest(this.options.cancel).length : !1;
            if (!i || s || !this._mouseCapture(t)) return !0;
            this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                r.mouseDelayMet = !0
            }, this.options.delay));
            if (this._mouseDistanceMet(t) && this._mouseDelayMet(t)) {
                this._mouseStarted = this._mouseStart(t) !== !1;
                if (!this._mouseStarted) return t.preventDefault(), !0
            }
            return !0 === e.data(t.target, this.widgetName + ".preventClickEvent") && e.removeData(t.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(e) {
                return r._mouseMove(e)
            }, this._mouseUpDelegate = function(e) {
                return r._mouseUp(e)
            }, e(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), t.preventDefault(), n = !0, !0
        },
        _mouseMove: function(t) {
            return e.ui.ie && (!document.documentMode || document.documentMode < 9) && !t.button ? this._mouseUp(t) : this._mouseStarted ? (this._mouseDrag(t), t.preventDefault()) : (this._mouseDistanceMet(t) && this._mouseDelayMet(t) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, t) !== !1, this._mouseStarted ? this._mouseDrag(t) : this._mouseUp(t)), !this._mouseStarted)
        },
        _mouseUp: function(t) {
            return e(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, t.target === this._mouseDownEvent.target && e.data(t.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(t)), !1
        },
        _mouseDistanceMet: function(e) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - e.pageX), Math.abs(this._mouseDownEvent.pageY - e.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    })
})(jQuery);
(function(e, t) {
    function h(e, t, n) {
        return [parseFloat(e[0]) * (l.test(e[0]) ? t / 100 : 1), parseFloat(e[1]) * (l.test(e[1]) ? n / 100 : 1)]
    }

    function p(t, n) {
        return parseInt(e.css(t, n), 10) || 0
    }

    function d(t) {
        var n = t[0];
        return n.nodeType === 9 ? {
            width: t.width(),
            height: t.height(),
            offset: {
                top: 0,
                left: 0
            }
        } : e.isWindow(n) ? {
            width: t.width(),
            height: t.height(),
            offset: {
                top: t.scrollTop(),
                left: t.scrollLeft()
            }
        } : n.preventDefault ? {
            width: 0,
            height: 0,
            offset: {
                top: n.pageY,
                left: n.pageX
            }
        } : {
            width: t.outerWidth(),
            height: t.outerHeight(),
            offset: t.offset()
        }
    }
    e.ui = e.ui || {};
    var n, r = Math.max,
        i = Math.abs,
        s = Math.round,
        o = /left|center|right/,
        u = /top|center|bottom/,
        a = /[\+\-]\d+(\.[\d]+)?%?/,
        f = /^\w+/,
        l = /%$/,
        c = e.fn.position;
    e.position = {
        scrollbarWidth: function() {
            if (n !== t) return n;
            var r, i, s = e("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                o = s.children()[0];
            return e("body").append(s), r = o.offsetWidth, s.css("overflow", "scroll"), i = o.offsetWidth, r === i && (i = s[0].clientWidth), s.remove(), n = r - i
        },
        getScrollInfo: function(t) {
            var n = t.isWindow ? "" : t.element.css("overflow-x"),
                r = t.isWindow ? "" : t.element.css("overflow-y"),
                i = n === "scroll" || n === "auto" && t.width < t.element[0].scrollWidth,
                s = r === "scroll" || r === "auto" && t.height < t.element[0].scrollHeight;
            return {
                width: i ? e.position.scrollbarWidth() : 0,
                height: s ? e.position.scrollbarWidth() : 0
            }
        },
        getWithinInfo: function(t) {
            var n = e(t || window),
                r = e.isWindow(n[0]);
            return {
                element: n,
                isWindow: r,
                offset: n.offset() || {
                    left: 0,
                    top: 0
                },
                scrollLeft: n.scrollLeft(),
                scrollTop: n.scrollTop(),
                width: r ? n.width() : n.outerWidth(),
                height: r ? n.height() : n.outerHeight()
            }
        }
    }, e.fn.position = function(t) {
        if (!t || !t.of) return c.apply(this, arguments);
        t = e.extend({}, t);
        var n, l, v, m, g, y, b = e(t.of),
            w = e.position.getWithinInfo(t.within),
            E = e.position.getScrollInfo(w),
            S = (t.collision || "flip").split(" "),
            x = {};
        return y = d(b), b[0].preventDefault && (t.at = "left top"), l = y.width, v = y.height, m = y.offset, g = e.extend({}, m), e.each(["my", "at"], function() {
            var e = (t[this] || "").split(" "),
                n, r;
            e.length === 1 && (e = o.test(e[0]) ? e.concat(["center"]) : u.test(e[0]) ? ["center"].concat(e) : ["center", "center"]), e[0] = o.test(e[0]) ? e[0] : "center", e[1] = u.test(e[1]) ? e[1] : "center", n = a.exec(e[0]), r = a.exec(e[1]), x[this] = [n ? n[0] : 0, r ? r[0] : 0], t[this] = [f.exec(e[0])[0], f.exec(e[1])[0]]
        }), S.length === 1 && (S[1] = S[0]), t.at[0] === "right" ? g.left += l : t.at[0] === "center" && (g.left += l / 2), t.at[1] === "bottom" ? g.top += v : t.at[1] === "center" && (g.top += v / 2), n = h(x.at, l, v), g.left += n[0], g.top += n[1], this.each(function() {
            var o, u, a = e(this),
                f = a.outerWidth(),
                c = a.outerHeight(),
                d = p(this, "marginLeft"),
                y = p(this, "marginTop"),
                T = f + d + p(this, "marginRight") + E.width,
                N = c + y + p(this, "marginBottom") + E.height,
                C = e.extend({}, g),
                k = h(x.my, a.outerWidth(), a.outerHeight());
            t.my[0] === "right" ? C.left -= f : t.my[0] === "center" && (C.left -= f / 2), t.my[1] === "bottom" ? C.top -= c : t.my[1] === "center" && (C.top -= c / 2), C.left += k[0], C.top += k[1], e.support.offsetFractions || (C.left = s(C.left), C.top = s(C.top)), o = {
                marginLeft: d,
                marginTop: y
            }, e.each(["left", "top"], function(r, i) {
                e.ui.position[S[r]] && e.ui.position[S[r]][i](C, {
                    targetWidth: l,
                    targetHeight: v,
                    elemWidth: f,
                    elemHeight: c,
                    collisionPosition: o,
                    collisionWidth: T,
                    collisionHeight: N,
                    offset: [n[0] + k[0], n[1] + k[1]],
                    my: t.my,
                    at: t.at,
                    within: w,
                    elem: a
                })
            }), t.using && (u = function(e) {
                var n = m.left - C.left,
                    s = n + l - f,
                    o = m.top - C.top,
                    u = o + v - c,
                    h = {
                        target: {
                            element: b,
                            left: m.left,
                            top: m.top,
                            width: l,
                            height: v
                        },
                        element: {
                            element: a,
                            left: C.left,
                            top: C.top,
                            width: f,
                            height: c
                        },
                        horizontal: s < 0 ? "left" : n > 0 ? "right" : "center",
                        vertical: u < 0 ? "top" : o > 0 ? "bottom" : "middle"
                    };
                l < f && i(n + s) < l && (h.horizontal = "center"), v < c && i(o + u) < v && (h.vertical = "middle"), r(i(n), i(s)) > r(i(o), i(u)) ? h.important = "horizontal" : h.important = "vertical", t.using.call(this, e, h)
            }), a.offset(e.extend(C, {
                using: u
            }))
        })
    }, e.ui.position = {
        fit: {
            left: function(e, t) {
                var n = t.within,
                    i = n.isWindow ? n.scrollLeft : n.offset.left,
                    s = n.width,
                    o = e.left - t.collisionPosition.marginLeft,
                    u = i - o,
                    a = o + t.collisionWidth - s - i,
                    f;
                t.collisionWidth > s ? u > 0 && a <= 0 ? (f = e.left + u + t.collisionWidth - s - i, e.left += u - f) : a > 0 && u <= 0 ? e.left = i : u > a ? e.left = i + s - t.collisionWidth : e.left = i : u > 0 ? e.left += u : a > 0 ? e.left -= a : e.left = r(e.left - o, e.left)
            },
            top: function(e, t) {
                var n = t.within,
                    i = n.isWindow ? n.scrollTop : n.offset.top,
                    s = t.within.height,
                    o = e.top - t.collisionPosition.marginTop,
                    u = i - o,
                    a = o + t.collisionHeight - s - i,
                    f;
                t.collisionHeight > s ? u > 0 && a <= 0 ? (f = e.top + u + t.collisionHeight - s - i, e.top += u - f) : a > 0 && u <= 0 ? e.top = i : u > a ? e.top = i + s - t.collisionHeight : e.top = i : u > 0 ? e.top += u : a > 0 ? e.top -= a : e.top = r(e.top - o, e.top)
            }
        },
        flip: {
            left: function(e, t) {
                var n = t.within,
                    r = n.offset.left + n.scrollLeft,
                    s = n.width,
                    o = n.isWindow ? n.scrollLeft : n.offset.left,
                    u = e.left - t.collisionPosition.marginLeft,
                    a = u - o,
                    f = u + t.collisionWidth - s - o,
                    l = t.my[0] === "left" ? -t.elemWidth : t.my[0] === "right" ? t.elemWidth : 0,
                    c = t.at[0] === "left" ? t.targetWidth : t.at[0] === "right" ? -t.targetWidth : 0,
                    h = -2 * t.offset[0],
                    p, d;
                if (a < 0) {
                    p = e.left + l + c + h + t.collisionWidth - s - r;
                    if (p < 0 || p < i(a)) e.left += l + c + h
                } else if (f > 0) {
                    d = e.left - t.collisionPosition.marginLeft + l + c + h - o;
                    if (d > 0 || i(d) < f) e.left += l + c + h
                }
            },
            top: function(e, t) {
                var n = t.within,
                    r = n.offset.top + n.scrollTop,
                    s = n.height,
                    o = n.isWindow ? n.scrollTop : n.offset.top,
                    u = e.top - t.collisionPosition.marginTop,
                    a = u - o,
                    f = u + t.collisionHeight - s - o,
                    l = t.my[1] === "top",
                    c = l ? -t.elemHeight : t.my[1] === "bottom" ? t.elemHeight : 0,
                    h = t.at[1] === "top" ? t.targetHeight : t.at[1] === "bottom" ? -t.targetHeight : 0,
                    p = -2 * t.offset[1],
                    d, v;
                a < 0 ? (v = e.top + c + h + p + t.collisionHeight - s - r, e.top + c + h + p > a && (v < 0 || v < i(a)) && (e.top += c + h + p)) : f > 0 && (d = e.top - t.collisionPosition.marginTop + c + h + p - o, e.top + c + h + p > f && (d > 0 || i(d) < f) && (e.top += c + h + p))
            }
        },
        flipfit: {
            left: function() {
                e.ui.position.flip.left.apply(this, arguments), e.ui.position.fit.left.apply(this, arguments)
            },
            top: function() {
                e.ui.position.flip.top.apply(this, arguments), e.ui.position.fit.top.apply(this, arguments)
            }
        }
    },

    function() {
        var t, n, r, i, s, o = document.getElementsByTagName("body")[0],
            u = document.createElement("div");
        t = document.createElement(o ? "div" : "body"), r = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        }, o && e.extend(r, {
            position: "absolute",
            left: "-1000px",
            top: "-1000px"
        });
        for (s in r) t.style[s] = r[s];
        t.appendChild(u), n = o || document.documentElement, n.insertBefore(t, n.firstChild), u.style.cssText = "position: absolute; left: 10.7432222px;", i = e(u).offset().left, e.support.offsetFractions = i > 10 && i < 11, t.innerHTML = "", n.removeChild(t)
    }()
})(jQuery);
(function(e, t) {
    e.widget("ui.draggable", e.ui.mouse, {
        version: "1.10.1",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            this.options.helper === "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
        },
        _destroy: function() {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
        },
        _mouseCapture: function(t) {
            var n = this.options;
            return this.helper || n.disabled || e(t.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(t), this.handle ? (e(n.iframeFix === !0 ? "iframe" : n.iframeFix).each(function() {
                e("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css(e(this).offset()).appendTo("body")
            }), !0) : !1)
        },
        _mouseStart: function(t) {
            var n = this.options;
            return this.helper = this._createHelper(t), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), e.ui.ddmanager && (e.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, e.extend(this.offset, {
                click: {
                    left: t.pageX - this.offset.left,
                    top: t.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.originalPosition = this.position = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, n.cursorAt && this._adjustOffsetFromHelper(n.cursorAt), n.containment && this._setContainment(), this._trigger("start", t) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), e.ui.ddmanager && !n.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this._mouseDrag(t, !0), e.ui.ddmanager && e.ui.ddmanager.dragStart(this, t), !0)
        },
        _mouseDrag: function(t, n) {
            this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute");
            if (!n) {
                var r = this._uiHash();
                if (this._trigger("drag", t, r) === !1) return this._mouseUp({}), !1;
                this.position = r.position
            }
            if (!this.options.axis || this.options.axis !== "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis !== "x") this.helper[0].style.top = this.position.top + "px";
            return e.ui.ddmanager && e.ui.ddmanager.drag(this, t), !1
        },
        _mouseStop: function(t) {
            var n, r = this,
                i = !1,
                s = !1;
            e.ui.ddmanager && !this.options.dropBehaviour && (s = e.ui.ddmanager.drop(this, t)), this.dropped && (s = this.dropped, this.dropped = !1), n = this.element[0];
            while (n && (n = n.parentNode)) n === document && (i = !0);
            return !i && this.options.helper === "original" ? !1 : (this.options.revert === "invalid" && !s || this.options.revert === "valid" && s || this.options.revert === !0 || e.isFunction(this.options.revert) && this.options.revert.call(this.element, s) ? e(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                r._trigger("stop", t) !== !1 && r._clear()
            }) : this._trigger("stop", t) !== !1 && this._clear(), !1)
        },
        _mouseUp: function(t) {
            return e("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            }), e.ui.ddmanager && e.ui.ddmanager.dragStop(this, t), e.ui.mouse.prototype._mouseUp.call(this, t)
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
        },
        _getHandle: function(t) {
            var n = !this.options.handle || !e(this.options.handle, this.element).length ? !0 : !1;
            return e(this.options.handle, this.element).find("*").addBack().each(function() {
                this === t.target && (n = !0)
            }), n
        },
        _createHelper: function(t) {
            var n = this.options,
                r = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [t])) : n.helper === "clone" ? this.element.clone().removeAttr("id") : this.element;
            return r.parents("body").length || r.appendTo(n.appendTo === "parent" ? this.element[0].parentNode : n.appendTo), r[0] !== this.element[0] && !/(fixed|absolute)/.test(r.css("position")) && r.css("position", "absolute"), r
        },
        _adjustOffsetFromHelper: function(t) {
            typeof t == "string" && (t = t.split(" ")), e.isArray(t) && (t = {
                left: +t[0],
                top: +t[1] || 0
            }), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var t = this.offsetParent.offset();
            this.cssPosition === "absolute" && this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop());
            if (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && e.ui.ie) t = {
                top: 0,
                left: 0
            };
            return {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition === "relative") {
                var e = this.element.position();
                return {
                    top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var t, n, r, i = this.options;
            i.containment === "parent" && (i.containment = this.helper[0].parentNode);
            if (i.containment === "document" || i.containment === "window") this.containment = [i.containment === "document" ? 0 : e(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, i.containment === "document" ? 0 : e(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (i.containment === "document" ? 0 : e(window).scrollLeft()) + e(i.containment === "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (i.containment === "document" ? 0 : e(window).scrollTop()) + (e(i.containment === "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(i.containment) && i.containment.constructor !== Array) {
                n = e(i.containment), r = n[0];
                if (!r) return;
                t = e(r).css("overflow") !== "hidden", this.containment = [(parseInt(e(r).css("borderLeftWidth"), 10) || 0) + (parseInt(e(r).css("paddingLeft"), 10) || 0), (parseInt(e(r).css("borderTopWidth"), 10) || 0) + (parseInt(e(r).css("paddingTop"), 10) || 0), (t ? Math.max(r.scrollWidth, r.offsetWidth) : r.offsetWidth) - (parseInt(e(r).css("borderLeftWidth"), 10) || 0) - (parseInt(e(r).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (t ? Math.max(r.scrollHeight, r.offsetHeight) : r.offsetHeight) - (parseInt(e(r).css("borderTopWidth"), 10) || 0) - (parseInt(e(r).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = n
            } else i.containment.constructor === Array && (this.containment = i.containment)
        },
        _convertPositionTo: function(t, n) {
            n || (n = this.position);
            var r = t === "absolute" ? 1 : -1,
                i = this.cssPosition !== "absolute" || this.scrollParent[0] !== document && !! e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                s = /(html|body)/i.test(i[0].tagName);
            return {
                top: n.top + this.offset.relative.top * r + this.offset.parent.top * r - (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : s ? 0 : i.scrollTop()) * r,
                left: n.left + this.offset.relative.left * r + this.offset.parent.left * r - (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : s ? 0 : i.scrollLeft()) * r
            }
        },
        _generatePosition: function(t) {
            var n, r, i, s, o = this.options,
                u = this.cssPosition !== "absolute" || this.scrollParent[0] !== document && !! e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                a = /(html|body)/i.test(u[0].tagName),
                f = t.pageX,
                l = t.pageY;
            return this.originalPosition && (this.containment && (this.relative_container ? (r = this.relative_container.offset(), n = [this.containment[0] + r.left, this.containment[1] + r.top, this.containment[2] + r.left, this.containment[3] + r.top]) : n = this.containment, t.pageX - this.offset.click.left < n[0] && (f = n[0] + this.offset.click.left), t.pageY - this.offset.click.top < n[1] && (l = n[1] + this.offset.click.top), t.pageX - this.offset.click.left > n[2] && (f = n[2] + this.offset.click.left), t.pageY - this.offset.click.top > n[3] && (l = n[3] + this.offset.click.top)), o.grid && (i = o.grid[1] ? this.originalPageY + Math.round((l - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY, l = n ? i - this.offset.click.top >= n[1] || i - this.offset.click.top > n[3] ? i : i - this.offset.click.top >= n[1] ? i - o.grid[1] : i + o.grid[1] : i, s = o.grid[0] ? this.originalPageX + Math.round((f - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX, f = n ? s - this.offset.click.left >= n[0] || s - this.offset.click.left > n[2] ? s : s - this.offset.click.left >= n[0] ? s - o.grid[0] : s + o.grid[0] : s)), {
                top: l - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : a ? 0 : u.scrollTop()),
                left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : a ? 0 : u.scrollLeft())
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] !== this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
        },
        _trigger: function(t, n, r) {
            return r = r || this._uiHash(), e.ui.plugin.call(this, t, [n, r]), t === "drag" && (this.positionAbs = this._convertPositionTo("absolute")), e.Widget.prototype._trigger.call(this, t, n, r)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }), e.ui.plugin.add("draggable", "connectToSortable", {
        start: function(t, n) {
            var r = e(this).data("ui-draggable"),
                i = r.options,
                s = e.extend({}, n, {
                    item: r.element
                });
            r.sortables = [], e(i.connectToSortable).each(function() {
                var n = e.data(this, "ui-sortable");
                n && !n.options.disabled && (r.sortables.push({
                    instance: n,
                    shouldRevert: n.options.revert
                }), n.refreshPositions(), n._trigger("activate", t, s))
            })
        },
        stop: function(t, n) {
            var r = e(this).data("ui-draggable"),
                i = e.extend({}, n, {
                    item: r.element
                });
            e.each(r.sortables, function() {
                this.instance.isOver ? (this.instance.isOver = 0, r.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(t), this.instance.options.helper = this.instance.options._helper, r.options.helper === "original" && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", t, i))
            })
        },
        drag: function(t, n) {
            var r = e(this).data("ui-draggable"),
                i = this;
            e.each(r.sortables, function() {
                var s = !1,
                    o = this;
                this.instance.positionAbs = r.positionAbs, this.instance.helperProportions = r.helperProportions, this.instance.offset.click = r.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (s = !0, e.each(r.sortables, function() {
                    return this.instance.positionAbs = r.positionAbs, this.instance.helperProportions = r.helperProportions, this.instance.offset.click = r.offset.click, this !== o && this.instance._intersectsWith(this.instance.containerCache) && e.contains(o.instance.element[0], this.instance.element[0]) && (s = !1), s
                })), s ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = e(i).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                    return n.helper[0]
                }, t.target = this.instance.currentItem[0], this.instance._mouseCapture(t, !0), this.instance._mouseStart(t, !0, !0), this.instance.offset.click.top = r.offset.click.top, this.instance.offset.click.left = r.offset.click.left, this.instance.offset.parent.left -= r.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= r.offset.parent.top - this.instance.offset.parent.top, r._trigger("toSortable", t), r.dropped = this.instance.element, r.currentItem = r.element, this.instance.fromOutside = r), this.instance.currentItem && this.instance._mouseDrag(t)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", t, this.instance._uiHash(this.instance)), this.instance._mouseStop(t, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), r._trigger("fromSortable", t), r.dropped = !1)
            })
        }
    }), e.ui.plugin.add("draggable", "cursor", {
        start: function() {
            var t = e("body"),
                n = e(this).data("ui-draggable").options;
            t.css("cursor") && (n._cursor = t.css("cursor")), t.css("cursor", n.cursor)
        },
        stop: function() {
            var t = e(this).data("ui-draggable").options;
            t._cursor && e("body").css("cursor", t._cursor)
        }
    }), e.ui.plugin.add("draggable", "opacity", {
        start: function(t, n) {
            var r = e(n.helper),
                i = e(this).data("ui-draggable").options;
            r.css("opacity") && (i._opacity = r.css("opacity")), r.css("opacity", i.opacity)
        },
        stop: function(t, n) {
            var r = e(this).data("ui-draggable").options;
            r._opacity && e(n.helper).css("opacity", r._opacity)
        }
    }), e.ui.plugin.add("draggable", "scroll", {
        start: function() {
            var t = e(this).data("ui-draggable");
            t.scrollParent[0] !== document && t.scrollParent[0].tagName !== "HTML" && (t.overflowOffset = t.scrollParent.offset())
        },
        drag: function(t) {
            var n = e(this).data("ui-draggable"),
                r = n.options,
                i = !1;
            if (n.scrollParent[0] !== document && n.scrollParent[0].tagName !== "HTML") {
                if (!r.axis || r.axis !== "x") n.overflowOffset.top + n.scrollParent[0].offsetHeight - t.pageY < r.scrollSensitivity ? n.scrollParent[0].scrollTop = i = n.scrollParent[0].scrollTop + r.scrollSpeed : t.pageY - n.overflowOffset.top < r.scrollSensitivity && (n.scrollParent[0].scrollTop = i = n.scrollParent[0].scrollTop - r.scrollSpeed);
                if (!r.axis || r.axis !== "y") n.overflowOffset.left + n.scrollParent[0].offsetWidth - t.pageX < r.scrollSensitivity ? n.scrollParent[0].scrollLeft = i = n.scrollParent[0].scrollLeft + r.scrollSpeed : t.pageX - n.overflowOffset.left < r.scrollSensitivity && (n.scrollParent[0].scrollLeft = i = n.scrollParent[0].scrollLeft - r.scrollSpeed)
            } else {
                if (!r.axis || r.axis !== "x") t.pageY - e(document).scrollTop() < r.scrollSensitivity ? i = e(document).scrollTop(e(document).scrollTop() - r.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < r.scrollSensitivity && (i = e(document).scrollTop(e(document).scrollTop() + r.scrollSpeed));
                if (!r.axis || r.axis !== "y") t.pageX - e(document).scrollLeft() < r.scrollSensitivity ? i = e(document).scrollLeft(e(document).scrollLeft() - r.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < r.scrollSensitivity && (i = e(document).scrollLeft(e(document).scrollLeft() + r.scrollSpeed))
            }
            i !== !1 && e.ui.ddmanager && !r.dropBehaviour && e.ui.ddmanager.prepareOffsets(n, t)
        }
    }), e.ui.plugin.add("draggable", "snap", {
        start: function() {
            var t = e(this).data("ui-draggable"),
                n = t.options;
            t.snapElements = [], e(n.snap.constructor !== String ? n.snap.items || ":data(ui-draggable)" : n.snap).each(function() {
                var n = e(this),
                    r = n.offset();
                this !== t.element[0] && t.snapElements.push({
                    item: this,
                    width: n.outerWidth(),
                    height: n.outerHeight(),
                    top: r.top,
                    left: r.left
                })
            })
        },
        drag: function(t, n) {
            var r, i, s, o, u, a, f, l, c, h, p = e(this).data("ui-draggable"),
                d = p.options,
                v = d.snapTolerance,
                m = n.offset.left,
                g = m + p.helperProportions.width,
                y = n.offset.top,
                b = y + p.helperProportions.height;
            for (c = p.snapElements.length - 1; c >= 0; c--) {
                u = p.snapElements[c].left, a = u + p.snapElements[c].width, f = p.snapElements[c].top, l = f + p.snapElements[c].height;
                if (!(u - v < m && m < a + v && f - v < y && y < l + v || u - v < m && m < a + v && f - v < b && b < l + v || u - v < g && g < a + v && f - v < y && y < l + v || u - v < g && g < a + v && f - v < b && b < l + v)) {
                    p.snapElements[c].snapping && p.options.snap.release && p.options.snap.release.call(p.element, t, e.extend(p._uiHash(), {
                        snapItem: p.snapElements[c].item
                    })), p.snapElements[c].snapping = !1;
                    continue
                }
                d.snapMode !== "inner" && (r = Math.abs(f - b) <= v, i = Math.abs(l - y) <= v, s = Math.abs(u - g) <= v, o = Math.abs(a - m) <= v, r && (n.position.top = p._convertPositionTo("relative", {
                    top: f - p.helperProportions.height,
                    left: 0
                }).top - p.margins.top), i && (n.position.top = p._convertPositionTo("relative", {
                    top: l,
                    left: 0
                }).top - p.margins.top), s && (n.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: u - p.helperProportions.width
                }).left - p.margins.left), o && (n.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: a
                }).left - p.margins.left)), h = r || i || s || o, d.snapMode !== "outer" && (r = Math.abs(f - y) <= v, i = Math.abs(l - b) <= v, s = Math.abs(u - m) <= v, o = Math.abs(a - g) <= v, r && (n.position.top = p._convertPositionTo("relative", {
                    top: f,
                    left: 0
                }).top - p.margins.top), i && (n.position.top = p._convertPositionTo("relative", {
                    top: l - p.helperProportions.height,
                    left: 0
                }).top - p.margins.top), s && (n.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: u
                }).left - p.margins.left), o && (n.position.left = p._convertPositionTo("relative", {
                    top: 0,
                    left: a - p.helperProportions.width
                }).left - p.margins.left)), !p.snapElements[c].snapping && (r || i || s || o || h) && p.options.snap.snap && p.options.snap.snap.call(p.element, t, e.extend(p._uiHash(), {
                    snapItem: p.snapElements[c].item
                })), p.snapElements[c].snapping = r || i || s || o || h
            }
        }
    }), e.ui.plugin.add("draggable", "stack", {
        start: function() {
            var t, n = this.data("ui-draggable").options,
                r = e.makeArray(e(n.stack)).sort(function(t, n) {
                    return (parseInt(e(t).css("zIndex"), 10) || 0) - (parseInt(e(n).css("zIndex"), 10) || 0)
                });
            if (!r.length) return;
            t = parseInt(e(r[0]).css("zIndex"), 10) || 0, e(r).each(function(n) {
                e(this).css("zIndex", t + n)
            }), this.css("zIndex", t + r.length)
        }
    }), e.ui.plugin.add("draggable", "zIndex", {
        start: function(t, n) {
            var r = e(n.helper),
                i = e(this).data("ui-draggable").options;
            r.css("zIndex") && (i._zIndex = r.css("zIndex")), r.css("zIndex", i.zIndex)
        },
        stop: function(t, n) {
            var r = e(this).data("ui-draggable").options;
            r._zIndex && e(n.helper).css("zIndex", r._zIndex)
        }
    })
})(jQuery);
(function(e, t) {
    function n(e, t, n) {
        return e > t && e < t + n
    }
    e.widget("ui.droppable", {
        version: "1.10.1",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: !1,
            addClasses: !0,
            greedy: !1,
            hoverClass: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function() {
            var t = this.options,
                n = t.accept;
            this.isover = !1, this.isout = !0, this.accept = e.isFunction(n) ? n : function(e) {
                return e.is(n)
            }, this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            }, e.ui.ddmanager.droppables[t.scope] = e.ui.ddmanager.droppables[t.scope] || [], e.ui.ddmanager.droppables[t.scope].push(this), t.addClasses && this.element.addClass("ui-droppable")
        },
        _destroy: function() {
            var t = 0,
                n = e.ui.ddmanager.droppables[this.options.scope];
            for (; t < n.length; t++) n[t] === this && n.splice(t, 1);
            this.element.removeClass("ui-droppable ui-droppable-disabled")
        },
        _setOption: function(t, n) {
            t === "accept" && (this.accept = e.isFunction(n) ? n : function(e) {
                return e.is(n)
            }), e.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function(t) {
            var n = e.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass), n && this._trigger("activate", t, this.ui(n))
        },
        _deactivate: function(t) {
            var n = e.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass), n && this._trigger("deactivate", t, this.ui(n))
        },
        _over: function(t) {
            var n = e.ui.ddmanager.current;
            if (!n || (n.currentItem || n.element)[0] === this.element[0]) return;
            this.accept.call(this.element[0], n.currentItem || n.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", t, this.ui(n)))
        },
        _out: function(t) {
            var n = e.ui.ddmanager.current;
            if (!n || (n.currentItem || n.element)[0] === this.element[0]) return;
            this.accept.call(this.element[0], n.currentItem || n.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", t, this.ui(n)))
        },
        _drop: function(t, n) {
            var r = n || e.ui.ddmanager.current,
                i = !1;
            return !r || (r.currentItem || r.element)[0] === this.element[0] ? !1 : (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                var t = e.data(this, "ui-droppable");
                if (t.options.greedy && !t.options.disabled && t.options.scope === r.options.scope && t.accept.call(t.element[0], r.currentItem || r.element) && e.ui.intersect(r, e.extend(t, {
                    offset: t.element.offset()
                }), t.options.tolerance)) return i = !0, !1
            }), i ? !1 : this.accept.call(this.element[0], r.currentItem || r.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", t, this.ui(r)), this.element) : !1)
        },
        ui: function(e) {
            return {
                draggable: e.currentItem || e.element,
                helper: e.helper,
                position: e.position,
                offset: e.positionAbs
            }
        }
    }), e.ui.intersect = function(e, t, r) {
        if (!t.offset) return !1;
        var i, s, o = (e.positionAbs || e.position.absolute).left,
            u = o + e.helperProportions.width,
            a = (e.positionAbs || e.position.absolute).top,
            f = a + e.helperProportions.height,
            l = t.offset.left,
            c = l + t.proportions.width,
            h = t.offset.top,
            p = h + t.proportions.height;
        switch (r) {
            case "fit":
                return l <= o && u <= c && h <= a && f <= p;
            case "intersect":
                return l < o + e.helperProportions.width / 2 && u - e.helperProportions.width / 2 < c && h < a + e.helperProportions.height / 2 && f - e.helperProportions.height / 2 < p;
            case "pointer":
                return i = (e.positionAbs || e.position.absolute).left + (e.clickOffset || e.offset.click).left, s = (e.positionAbs || e.position.absolute).top + (e.clickOffset || e.offset.click).top, n(s, h, t.proportions.height) && n(i, l, t.proportions.width);
            case "touch":
                return (a >= h && a <= p || f >= h && f <= p || a < h && f > p) && (o >= l && o <= c || u >= l && u <= c || o < l && u > c);
            default:
                return !1
        }
    }, e.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(t, n) {
            var r, i, s = e.ui.ddmanager.droppables[t.options.scope] || [],
                o = n ? n.type : null,
                u = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
            e: for (r = 0; r < s.length; r++) {
                if (s[r].options.disabled || t && !s[r].accept.call(s[r].element[0], t.currentItem || t.element)) continue;
                for (i = 0; i < u.length; i++)
                    if (u[i] === s[r].element[0]) {
                        s[r].proportions.height = 0;
                        continue e
                    }
                s[r].visible = s[r].element.css("display") !== "none";
                if (!s[r].visible) continue;
                o === "mousedown" && s[r]._activate.call(s[r], n), s[r].offset = s[r].element.offset(), s[r].proportions = {
                    width: s[r].element[0].offsetWidth,
                    height: s[r].element[0].offsetHeight
                }
            }
        },
        drop: function(t, n) {
            var r = !1;
            return e.each(e.ui.ddmanager.droppables[t.options.scope] || [], function() {
                if (!this.options) return;
                !this.options.disabled && this.visible && e.ui.intersect(t, this, this.options.tolerance) && (r = this._drop.call(this, n) || r), !this.options.disabled && this.visible && this.accept.call(this.element[0], t.currentItem || t.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, n))
            }), r
        },
        dragStart: function(t, n) {
            t.element.parentsUntil("body").bind("scroll.droppable", function() {
                t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, n)
            })
        },
        drag: function(t, n) {
            t.options.refreshPositions && e.ui.ddmanager.prepareOffsets(t, n), e.each(e.ui.ddmanager.droppables[t.options.scope] || [], function() {
                if (this.options.disabled || this.greedyChild || !this.visible) return;
                var r, i, s, o = e.ui.intersect(t, this, this.options.tolerance),
                    u = !o && this.isover ? "isout" : o && !this.isover ? "isover" : null;
                if (!u) return;
                this.options.greedy && (i = this.options.scope, s = this.element.parents(":data(ui-droppable)").filter(function() {
                    return e.data(this, "ui-droppable").options.scope === i
                }), s.length && (r = e.data(s[0], "ui-droppable"), r.greedyChild = u === "isover")), r && u === "isover" && (r.isover = !1, r.isout = !0, r._out.call(r, n)), this[u] = !0, this[u === "isout" ? "isover" : "isout"] = !1, this[u === "isover" ? "_over" : "_out"].call(this, n), r && u === "isout" && (r.isout = !1, r.isover = !0, r._over.call(r, n))
            })
        },
        dragStop: function(t, n) {
            t.element.parentsUntil("body").unbind("scroll.droppable"), t.options.refreshPositions || e.ui.ddmanager.prepareOffsets(t, n)
        }
    }
})(jQuery);
(function(e, t) {
    e.widget("ui.selectable", e.ui.mouse, {
        version: "1.10.1",
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch",
            selected: null,
            selecting: null,
            start: null,
            stop: null,
            unselected: null,
            unselecting: null
        },
        _create: function() {
            var t, n = this;
            this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
                t = e(n.options.filter, n.element[0]), t.addClass("ui-selectee"), t.each(function() {
                    var t = e(this),
                        n = t.offset();
                    e.data(this, "selectable-item", {
                        element: this,
                        $element: t,
                        left: n.left,
                        top: n.top,
                        right: n.left + t.outerWidth(),
                        bottom: n.top + t.outerHeight(),
                        startselected: !1,
                        selected: t.hasClass("ui-selected"),
                        selecting: t.hasClass("ui-selecting"),
                        unselecting: t.hasClass("ui-unselecting")
                    })
                })
            }, this.refresh(), this.selectees = t.addClass("ui-selectee"), this._mouseInit(), this.helper = e("<div class='ui-selectable-helper'></div>")
        },
        _destroy: function() {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
        },
        _mouseStart: function(t) {
            var n = this,
                r = this.options;
            this.opos = [t.pageX, t.pageY];
            if (this.options.disabled) return;
            this.selectees = e(r.filter, this.element[0]), this._trigger("start", t), e(r.appendTo).append(this.helper), this.helper.css({
                left: t.pageX,
                top: t.pageY,
                width: 0,
                height: 0
            }), r.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                var r = e.data(this, "selectable-item");
                r.startselected = !0, !t.metaKey && !t.ctrlKey && (r.$element.removeClass("ui-selected"), r.selected = !1, r.$element.addClass("ui-unselecting"), r.unselecting = !0, n._trigger("unselecting", t, {
                    unselecting: r.element
                }))
            }), e(t.target).parents().addBack().each(function() {
                var r, i = e.data(this, "selectable-item");
                if (i) return r = !t.metaKey && !t.ctrlKey || !i.$element.hasClass("ui-selected"), i.$element.removeClass(r ? "ui-unselecting" : "ui-selected").addClass(r ? "ui-selecting" : "ui-unselecting"), i.unselecting = !r, i.selecting = r, i.selected = r, r ? n._trigger("selecting", t, {
                    selecting: i.element
                }) : n._trigger("unselecting", t, {
                    unselecting: i.element
                }), !1
            })
        },
        _mouseDrag: function(t) {
            this.dragged = !0;
            if (this.options.disabled) return;
            var n, r = this,
                i = this.options,
                s = this.opos[0],
                o = this.opos[1],
                u = t.pageX,
                a = t.pageY;
            return s > u && (n = u, u = s, s = n), o > a && (n = a, a = o, o = n), this.helper.css({
                left: s,
                top: o,
                width: u - s,
                height: a - o
            }), this.selectees.each(function() {
                var n = e.data(this, "selectable-item"),
                    f = !1;
                if (!n || n.element === r.element[0]) return;
                i.tolerance === "touch" ? f = !(n.left > u || n.right < s || n.top > a || n.bottom < o) : i.tolerance === "fit" && (f = n.left > s && n.right < u && n.top > o && n.bottom < a), f ? (n.selected && (n.$element.removeClass("ui-selected"), n.selected = !1), n.unselecting && (n.$element.removeClass("ui-unselecting"), n.unselecting = !1), n.selecting || (n.$element.addClass("ui-selecting"), n.selecting = !0, r._trigger("selecting", t, {
                    selecting: n.element
                }))) : (n.selecting && ((t.metaKey || t.ctrlKey) && n.startselected ? (n.$element.removeClass("ui-selecting"), n.selecting = !1, n.$element.addClass("ui-selected"), n.selected = !0) : (n.$element.removeClass("ui-selecting"), n.selecting = !1, n.startselected && (n.$element.addClass("ui-unselecting"), n.unselecting = !0), r._trigger("unselecting", t, {
                    unselecting: n.element
                }))), n.selected && !t.metaKey && !t.ctrlKey && !n.startselected && (n.$element.removeClass("ui-selected"), n.selected = !1, n.$element.addClass("ui-unselecting"), n.unselecting = !0, r._trigger("unselecting", t, {
                    unselecting: n.element
                })))
            }), !1
        },
        _mouseStop: function(t) {
            var n = this;
            return this.dragged = !1, e(".ui-unselecting", this.element[0]).each(function() {
                var r = e.data(this, "selectable-item");
                r.$element.removeClass("ui-unselecting"), r.unselecting = !1, r.startselected = !1, n._trigger("unselected", t, {
                    unselected: r.element
                })
            }), e(".ui-selecting", this.element[0]).each(function() {
                var r = e.data(this, "selectable-item");
                r.$element.removeClass("ui-selecting").addClass("ui-selected"), r.selecting = !1, r.selected = !0, r.startselected = !0, n._trigger("selected", t, {
                    selected: r.element
                })
            }), this._trigger("stop", t), this.helper.remove(), !1
        }
    })
})(jQuery);
(function(e, t) {
    function n(e, t, n) {
        return e > t && e < t + n
    }
    e.widget("ui.sortable", e.ui.mouse, {
        version: "1.10.1",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _create: function() {
            var e = this.options;
            this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? e.axis === "x" || /left|right/.test(this.items[0].item.css("float")) || /inline|table-cell/.test(this.items[0].item.css("display")) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
        },
        _destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
            for (var e = this.items.length - 1; e >= 0; e--) this.items[e].item.removeData(this.widgetName + "-item");
            return this
        },
        _setOption: function(t, n) {
            t === "disabled" ? (this.options[t] = n, this.widget().toggleClass("ui-sortable-disabled", !! n)) : e.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function(t, n) {
            var r = null,
                i = !1,
                s = this;
            if (this.reverting) return !1;
            if (this.options.disabled || this.options.type === "static") return !1;
            this._refreshItems(t), e(t.target).parents().each(function() {
                if (e.data(this, s.widgetName + "-item") === s) return r = e(this), !1
            }), e.data(t.target, s.widgetName + "-item") === s && (r = e(t.target));
            if (!r) return !1;
            if (this.options.handle && !n) {
                e(this.options.handle, r).find("*").addBack().each(function() {
                    this === t.target && (i = !0)
                });
                if (!i) return !1
            }
            return this.currentItem = r, this._removeCurrentsFromItems(), !0
        },
        _mouseStart: function(t, n, r) {
            var i, s = this.options;
            this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(t), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, e.extend(this.offset, {
                click: {
                    left: t.pageX - this.offset.left,
                    top: t.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(t), this.originalPageX = t.pageX, this.originalPageY = t.pageY, s.cursorAt && this._adjustOffsetFromHelper(s.cursorAt), this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), s.containment && this._setContainment(), s.cursor && (e("body").css("cursor") && (this._storedCursor = e("body").css("cursor")), e("body").css("cursor", s.cursor)), s.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", s.opacity)), s.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", s.zIndex)), this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML" && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", t, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions();
            if (!r)
                for (i = this.containers.length - 1; i >= 0; i--) this.containers[i]._trigger("activate", t, this._uiHash(this));
            return e.ui.ddmanager && (e.ui.ddmanager.current = this), e.ui.ddmanager && !s.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(t), !0
        },
        _mouseDrag: function(t) {
            var n, r, i, s, o = this.options,
                u = !1;
            this.position = this._generatePosition(t), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && this.scrollParent[0].tagName !== "HTML" ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - t.pageY < o.scrollSensitivity ? this.scrollParent[0].scrollTop = u = this.scrollParent[0].scrollTop + o.scrollSpeed : t.pageY - this.overflowOffset.top < o.scrollSensitivity && (this.scrollParent[0].scrollTop = u = this.scrollParent[0].scrollTop - o.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - t.pageX < o.scrollSensitivity ? this.scrollParent[0].scrollLeft = u = this.scrollParent[0].scrollLeft + o.scrollSpeed : t.pageX - this.overflowOffset.left < o.scrollSensitivity && (this.scrollParent[0].scrollLeft = u = this.scrollParent[0].scrollLeft - o.scrollSpeed)) : (t.pageY - e(document).scrollTop() < o.scrollSensitivity ? u = e(document).scrollTop(e(document).scrollTop() - o.scrollSpeed) : e(window).height() - (t.pageY - e(document).scrollTop()) < o.scrollSensitivity && (u = e(document).scrollTop(e(document).scrollTop() + o.scrollSpeed)), t.pageX - e(document).scrollLeft() < o.scrollSensitivity ? u = e(document).scrollLeft(e(document).scrollLeft() - o.scrollSpeed) : e(window).width() - (t.pageX - e(document).scrollLeft()) < o.scrollSensitivity && (u = e(document).scrollLeft(e(document).scrollLeft() + o.scrollSpeed))), u !== !1 && e.ui.ddmanager && !o.dropBehaviour && e.ui.ddmanager.prepareOffsets(this, t)), this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || this.options.axis !== "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis !== "x") this.helper[0].style.top = this.position.top + "px";
            for (n = this.items.length - 1; n >= 0; n--) {
                r = this.items[n], i = r.item[0], s = this._intersectsWithPointer(r);
                if (!s) continue;
                if (r.instance !== this.currentContainer) continue;
                if (i !== this.currentItem[0] && this.placeholder[s === 1 ? "next" : "prev"]()[0] !== i && !e.contains(this.placeholder[0], i) && (this.options.type === "semi-dynamic" ? !e.contains(this.element[0], i) : !0)) {
                    this.direction = s === 1 ? "down" : "up";
                    if (this.options.tolerance !== "pointer" && !this._intersectsWithSides(r)) break;
                    this._rearrange(t, r), this._trigger("change", t, this._uiHash());
                    break
                }
            }
            return this._contactContainers(t), e.ui.ddmanager && e.ui.ddmanager.drag(this, t), this._trigger("sort", t, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
        },
        _mouseStop: function(t, n) {
            if (!t) return;
            e.ui.ddmanager && !this.options.dropBehaviour && e.ui.ddmanager.drop(this, t);
            if (this.options.revert) {
                var r = this,
                    i = this.placeholder.offset();
                this.reverting = !0, e(this.helper).animate({
                    left: i.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft),
                    top: i.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)
                }, parseInt(this.options.revert, 10) || 500, function() {
                    r._clear(t)
                })
            } else this._clear(t, n);
            return !1
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                }), this.options.helper === "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var t = this.containers.length - 1; t >= 0; t--) this.containers[t]._trigger("deactivate", null, this._uiHash(this)), this.containers[t].containerCache.over && (this.containers[t]._trigger("out", null, this._uiHash(this)), this.containers[t].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.options.helper !== "original" && this.helper && this.helper[0].parentNode && this.helper.remove(), e.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? e(this.domPosition.prev).after(this.currentItem) : e(this.domPosition.parent).prepend(this.currentItem)), this
        },
        serialize: function(t) {
            var n = this._getItemsAsjQuery(t && t.connected),
                r = [];
            return t = t || {}, e(n).each(function() {
                var n = (e(t.item || this).attr(t.attribute || "id") || "").match(t.expression || /(.+)[\-=_](.+)/);
                n && r.push((t.key || n[1] + "[]") + "=" + (t.key && t.expression ? n[1] : n[2]))
            }), !r.length && t.key && r.push(t.key + "="), r.join("&")
        },
        toArray: function(t) {
            var n = this._getItemsAsjQuery(t && t.connected),
                r = [];
            return t = t || {}, n.each(function() {
                r.push(e(t.item || this).attr(t.attribute || "id") || "")
            }), r
        },
        _intersectsWith: function(e) {
            var t = this.positionAbs.left,
                n = t + this.helperProportions.width,
                r = this.positionAbs.top,
                i = r + this.helperProportions.height,
                s = e.left,
                o = s + e.width,
                u = e.top,
                a = u + e.height,
                f = this.offset.click.top,
                l = this.offset.click.left,
                c = r + f > u && r + f < a && t + l > s && t + l < o;
            return this.options.tolerance === "pointer" || this.options.forcePointerForContainers || this.options.tolerance !== "pointer" && this.helperProportions[this.floating ? "width" : "height"] > e[this.floating ? "width" : "height"] ? c : s < t + this.helperProportions.width / 2 && n - this.helperProportions.width / 2 < o && u < r + this.helperProportions.height / 2 && i - this.helperProportions.height / 2 < a
        },
        _intersectsWithPointer: function(e) {
            var t = this.options.axis === "x" || n(this.positionAbs.top + this.offset.click.top, e.top, e.height),
                r = this.options.axis === "y" || n(this.positionAbs.left + this.offset.click.left, e.left, e.width),
                i = t && r,
                s = this._getDragVerticalDirection(),
                o = this._getDragHorizontalDirection();
            return i ? this.floating ? o && o === "right" || s === "down" ? 2 : 1 : s && (s === "down" ? 2 : 1) : !1
        },
        _intersectsWithSides: function(e) {
            var t = n(this.positionAbs.top + this.offset.click.top, e.top + e.height / 2, e.height),
                r = n(this.positionAbs.left + this.offset.click.left, e.left + e.width / 2, e.width),
                i = this._getDragVerticalDirection(),
                s = this._getDragHorizontalDirection();
            return this.floating && s ? s === "right" && r || s === "left" && !r : i && (i === "down" && t || i === "up" && !t)
        },
        _getDragVerticalDirection: function() {
            var e = this.positionAbs.top - this.lastPositionAbs.top;
            return e !== 0 && (e > 0 ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var e = this.positionAbs.left - this.lastPositionAbs.left;
            return e !== 0 && (e > 0 ? "right" : "left")
        },
        refresh: function(e) {
            return this._refreshItems(e), this.refreshPositions(), this
        },
        _connectWith: function() {
            var e = this.options;
            return e.connectWith.constructor === String ? [e.connectWith] : e.connectWith
        },
        _getItemsAsjQuery: function(t) {
            var n, r, i, s, o = [],
                u = [],
                a = this._connectWith();
            if (a && t)
                for (n = a.length - 1; n >= 0; n--) {
                    i = e(a[n]);
                    for (r = i.length - 1; r >= 0; r--) s = e.data(i[r], this.widgetFullName), s && s !== this && !s.options.disabled && u.push([e.isFunction(s.options.items) ? s.options.items.call(s.element) : e(s.options.items, s.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), s])
                }
            u.push([e.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : e(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (n = u.length - 1; n >= 0; n--) u[n][0].each(function() {
                o.push(this)
            });
            return e(o)
        },
        _removeCurrentsFromItems: function() {
            var t = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = e.grep(this.items, function(e) {
                for (var n = 0; n < t.length; n++)
                    if (t[n] === e.item[0]) return !1;
                return !0
            })
        },
        _refreshItems: function(t) {
            this.items = [], this.containers = [this];
            var n, r, i, s, o, u, a, f, l = this.items,
                c = [
                    [e.isFunction(this.options.items) ? this.options.items.call(this.element[0], t, {
                        item: this.currentItem
                    }) : e(this.options.items, this.element), this]
                ],
                h = this._connectWith();
            if (h && this.ready)
                for (n = h.length - 1; n >= 0; n--) {
                    i = e(h[n]);
                    for (r = i.length - 1; r >= 0; r--) s = e.data(i[r], this.widgetFullName), s && s !== this && !s.options.disabled && (c.push([e.isFunction(s.options.items) ? s.options.items.call(s.element[0], t, {
                        item: this.currentItem
                    }) : e(s.options.items, s.element), s]), this.containers.push(s))
                }
            for (n = c.length - 1; n >= 0; n--) {
                o = c[n][1], u = c[n][0];
                for (r = 0, f = u.length; r < f; r++) a = e(u[r]), a.data(this.widgetName + "-item", o), l.push({
                    item: a,
                    instance: o,
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0
                })
            }
        },
        refreshPositions: function(t) {
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            var n, r, i, s;
            for (n = this.items.length - 1; n >= 0; n--) {
                r = this.items[n];
                if (r.instance !== this.currentContainer && this.currentContainer && r.item[0] !== this.currentItem[0]) continue;
                i = this.options.toleranceElement ? e(this.options.toleranceElement, r.item) : r.item, t || (r.width = i.outerWidth(), r.height = i.outerHeight()), s = i.offset(), r.left = s.left, r.top = s.top
            }
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else
                for (n = this.containers.length - 1; n >= 0; n--) s = this.containers[n].element.offset(), this.containers[n].containerCache.left = s.left, this.containers[n].containerCache.top = s.top, this.containers[n].containerCache.width = this.containers[n].element.outerWidth(), this.containers[n].containerCache.height = this.containers[n].element.outerHeight();
            return this
        },
        _createPlaceholder: function(t) {
            t = t || this;
            var n, r = t.options;
            if (!r.placeholder || r.placeholder.constructor === String) n = r.placeholder, r.placeholder = {
                element: function() {
                    var r = e(document.createElement(t.currentItem[0].nodeName)).addClass(n || t.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
                    return n || (r.style.visibility = "hidden"), r
                },
                update: function(e, i) {
                    if (n && !r.forcePlaceholderSize) return;
                    i.height() || i.height(t.currentItem.innerHeight() - parseInt(t.currentItem.css("paddingTop") || 0, 10) - parseInt(t.currentItem.css("paddingBottom") || 0, 10)), i.width() || i.width(t.currentItem.innerWidth() - parseInt(t.currentItem.css("paddingLeft") || 0, 10) - parseInt(t.currentItem.css("paddingRight") || 0, 10))
                }
            };
            t.placeholder = e(r.placeholder.element.call(t.element, t.currentItem)), t.currentItem.after(t.placeholder), r.placeholder.update(t, t.placeholder)
        },
        _contactContainers: function(t) {
            var n, r, i, s, o, u, a, f, l, c = null,
                h = null;
            for (n = this.containers.length - 1; n >= 0; n--) {
                if (e.contains(this.currentItem[0], this.containers[n].element[0])) continue;
                if (this._intersectsWith(this.containers[n].containerCache)) {
                    if (c && e.contains(this.containers[n].element[0], c.element[0])) continue;
                    c = this.containers[n], h = n
                } else this.containers[n].containerCache.over && (this.containers[n]._trigger("out", t, this._uiHash(this)), this.containers[n].containerCache.over = 0)
            }
            if (!c) return;
            if (this.containers.length === 1) this.containers[h]._trigger("over", t, this._uiHash(this)), this.containers[h].containerCache.over = 1;
            else {
                i = 1e4, s = null, o = this.containers[h].floating ? "left" : "top", u = this.containers[h].floating ? "width" : "height", a = this.positionAbs[o] + this.offset.click[o];
                for (r = this.items.length - 1; r >= 0; r--) {
                    if (!e.contains(this.containers[h].element[0], this.items[r].item[0])) continue;
                    if (this.items[r].item[0] === this.currentItem[0]) continue;
                    f = this.items[r].item.offset()[o], l = !1, Math.abs(f - a) > Math.abs(f + this.items[r][u] - a) && (l = !0, f += this.items[r][u]), Math.abs(f - a) < i && (i = Math.abs(f - a), s = this.items[r], this.direction = l ? "up" : "down")
                }
                if (!s && !this.options.dropOnEmpty) return;
                this.currentContainer = this.containers[h], s ? this._rearrange(t, s, null, !0) : this._rearrange(t, null, this.containers[h].element, !0), this._trigger("change", t, this._uiHash()), this.containers[h]._trigger("change", t, this._uiHash(this)), this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[h]._trigger("over", t, this._uiHash(this)), this.containers[h].containerCache.over = 1
            }
        },
        _createHelper: function(t) {
            var n = this.options,
                r = e.isFunction(n.helper) ? e(n.helper.apply(this.element[0], [t, this.currentItem])) : n.helper === "clone" ? this.currentItem.clone() : this.currentItem;
            return r.parents("body").length || e(n.appendTo !== "parent" ? n.appendTo : this.currentItem[0].parentNode)[0].appendChild(r[0]), r[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }), (!r[0].style.width || n.forceHelperSize) && r.width(this.currentItem.width()), (!r[0].style.height || n.forceHelperSize) && r.height(this.currentItem.height()), r
        },
        _adjustOffsetFromHelper: function(t) {
            typeof t == "string" && (t = t.split(" ")), e.isArray(t) && (t = {
                left: +t[0],
                top: +t[1] || 0
            }), "left" in t && (this.offset.click.left = t.left + this.margins.left), "right" in t && (this.offset.click.left = this.helperProportions.width - t.right + this.margins.left), "top" in t && (this.offset.click.top = t.top + this.margins.top), "bottom" in t && (this.offset.click.top = this.helperProportions.height - t.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var t = this.offsetParent.offset();
            this.cssPosition === "absolute" && this.scrollParent[0] !== document && e.contains(this.scrollParent[0], this.offsetParent[0]) && (t.left += this.scrollParent.scrollLeft(), t.top += this.scrollParent.scrollTop());
            if (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() === "html" && e.ui.ie) t = {
                top: 0,
                left: 0
            };
            return {
                top: t.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: t.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition === "relative") {
                var e = this.currentItem.position();
                return {
                    top: e.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: e.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var t, n, r, i = this.options;
            i.containment === "parent" && (i.containment = this.helper[0].parentNode);
            if (i.containment === "document" || i.containment === "window") this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, e(i.containment === "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (e(i.containment === "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            /^(document|window|parent)$/.test(i.containment) || (t = e(i.containment)[0], n = e(i.containment).offset(), r = e(t).css("overflow") !== "hidden", this.containment = [n.left + (parseInt(e(t).css("borderLeftWidth"), 10) || 0) + (parseInt(e(t).css("paddingLeft"), 10) || 0) - this.margins.left, n.top + (parseInt(e(t).css("borderTopWidth"), 10) || 0) + (parseInt(e(t).css("paddingTop"), 10) || 0) - this.margins.top, n.left + (r ? Math.max(t.scrollWidth, t.offsetWidth) : t.offsetWidth) - (parseInt(e(t).css("borderLeftWidth"), 10) || 0) - (parseInt(e(t).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, n.top + (r ? Math.max(t.scrollHeight, t.offsetHeight) : t.offsetHeight) - (parseInt(e(t).css("borderTopWidth"), 10) || 0) - (parseInt(e(t).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
        },
        _convertPositionTo: function(t, n) {
            n || (n = this.position);
            var r = t === "absolute" ? 1 : -1,
                i = this.cssPosition !== "absolute" || this.scrollParent[0] !== document && !! e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                s = /(html|body)/i.test(i[0].tagName);
            return {
                top: n.top + this.offset.relative.top * r + this.offset.parent.top * r - (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : s ? 0 : i.scrollTop()) * r,
                left: n.left + this.offset.relative.left * r + this.offset.parent.left * r - (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : s ? 0 : i.scrollLeft()) * r
            }
        },
        _generatePosition: function(t) {
            var n, r, i = this.options,
                s = t.pageX,
                o = t.pageY,
                u = this.cssPosition !== "absolute" || this.scrollParent[0] !== document && !! e.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                a = /(html|body)/i.test(u[0].tagName);
            return this.cssPosition === "relative" && (this.scrollParent[0] === document || this.scrollParent[0] === this.offsetParent[0]) && (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (t.pageX - this.offset.click.left < this.containment[0] && (s = this.containment[0] + this.offset.click.left), t.pageY - this.offset.click.top < this.containment[1] && (o = this.containment[1] + this.offset.click.top), t.pageX - this.offset.click.left > this.containment[2] && (s = this.containment[2] + this.offset.click.left), t.pageY - this.offset.click.top > this.containment[3] && (o = this.containment[3] + this.offset.click.top)), i.grid && (n = this.originalPageY + Math.round((o - this.originalPageY) / i.grid[1]) * i.grid[1], o = this.containment ? n - this.offset.click.top >= this.containment[1] && n - this.offset.click.top <= this.containment[3] ? n : n - this.offset.click.top >= this.containment[1] ? n - i.grid[1] : n + i.grid[1] : n, r = this.originalPageX + Math.round((s - this.originalPageX) / i.grid[0]) * i.grid[0], s = this.containment ? r - this.offset.click.left >= this.containment[0] && r - this.offset.click.left <= this.containment[2] ? r : r - this.offset.click.left >= this.containment[0] ? r - i.grid[0] : r + i.grid[0] : r)), {
                top: o - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (this.cssPosition === "fixed" ? -this.scrollParent.scrollTop() : a ? 0 : u.scrollTop()),
                left: s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (this.cssPosition === "fixed" ? -this.scrollParent.scrollLeft() : a ? 0 : u.scrollLeft())
            }
        },
        _rearrange: function(e, t, n, r) {
            n ? n[0].appendChild(this.placeholder[0]) : t.item[0].parentNode.insertBefore(this.placeholder[0], this.direction === "down" ? t.item[0] : t.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
            var i = this.counter;
            this._delay(function() {
                i === this.counter && this.refreshPositions(!r)
            })
        },
        _clear: function(t, n) {
            this.reverting = !1;
            var r, i = [];
            !this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null;
            if (this.helper[0] === this.currentItem[0]) {
                for (r in this._storedCSS)
                    if (this._storedCSS[r] === "auto" || this._storedCSS[r] === "static") this._storedCSS[r] = "";
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            this.fromOutside && !n && i.push(function(e) {
                this._trigger("receive", e, this._uiHash(this.fromOutside))
            }), (this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent !== this.currentItem.parent()[0]) && !n && i.push(function(e) {
                this._trigger("update", e, this._uiHash())
            }), this !== this.currentContainer && (n || (i.push(function(e) {
                this._trigger("remove", e, this._uiHash())
            }), i.push(function(e) {
                return function(t) {
                    e._trigger("receive", t, this._uiHash(this))
                }
            }.call(this, this.currentContainer)), i.push(function(e) {
                return function(t) {
                    e._trigger("update", t, this._uiHash(this))
                }
            }.call(this, this.currentContainer))));
            for (r = this.containers.length - 1; r >= 0; r--) n || i.push(function(e) {
                return function(t) {
                    e._trigger("deactivate", t, this._uiHash(this))
                }
            }.call(this, this.containers[r])), this.containers[r].containerCache.over && (i.push(function(e) {
                return function(t) {
                    e._trigger("out", t, this._uiHash(this))
                }
            }.call(this, this.containers[r])), this.containers[r].containerCache.over = 0);
            this._storedCursor && e("body").css("cursor", this._storedCursor), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", this._storedZIndex === "auto" ? "" : this._storedZIndex), this.dragging = !1;
            if (this.cancelHelperRemoval) {
                if (!n) {
                    this._trigger("beforeStop", t, this._uiHash());
                    for (r = 0; r < i.length; r++) i[r].call(this, t);
                    this._trigger("stop", t, this._uiHash())
                }
                return this.fromOutside = !1, !1
            }
            n || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null;
            if (!n) {
                for (r = 0; r < i.length; r++) i[r].call(this, t);
                this._trigger("stop", t, this._uiHash())
            }
            return this.fromOutside = !1, !0
        },
        _trigger: function() {
            e.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
        },
        _uiHash: function(t) {
            var n = t || this;
            return {
                helper: n.helper,
                placeholder: n.placeholder || e([]),
                position: n.position,
                originalPosition: n.originalPosition,
                offset: n.positionAbs,
                item: n.currentItem,
                sender: t ? t.element : null
            }
        }
    })
})(jQuery);
(function(e, t) {
    var n = 0;
    e.widget("ui.autocomplete", {
        version: "1.10.1",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        pending: 0,
        _create: function() {
            var t, n, r, i = this.element[0].nodeName.toLowerCase(),
                s = i === "textarea",
                o = i === "input";
            this.isMultiLine = s ? !0 : o ? !1 : this.element.prop("isContentEditable"), this.valueMethod = this.element[s || o ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
                keydown: function(i) {
                    if (this.element.prop("readOnly")) {
                        t = !0, r = !0, n = !0;
                        return
                    }
                    t = !1, r = !1, n = !1;
                    var s = e.ui.keyCode;
                    switch (i.keyCode) {
                        case s.PAGE_UP:
                            t = !0, this._move("previousPage", i);
                            break;
                        case s.PAGE_DOWN:
                            t = !0, this._move("nextPage", i);
                            break;
                        case s.UP:
                            t = !0, this._keyEvent("previous", i);
                            break;
                        case s.DOWN:
                            t = !0, this._keyEvent("next", i);
                            break;
                        case s.ENTER:
                        case s.NUMPAD_ENTER:
                            this.menu.active && (t = !0, i.preventDefault(), this.menu.select(i));
                            break;
                        case s.TAB:
                            this.menu.active && this.menu.select(i);
                            break;
                        case s.ESCAPE:
                            this.menu.element.is(":visible") && (this._value(this.term), this.close(i), i.preventDefault());
                            break;
                        default:
                            n = !0, this._searchTimeout(i)
                    }
                },
                keypress: function(r) {
                    if (t) {
                        t = !1, r.preventDefault();
                        return
                    }
                    if (n) return;
                    var i = e.ui.keyCode;
                    switch (r.keyCode) {
                        case i.PAGE_UP:
                            this._move("previousPage", r);
                            break;
                        case i.PAGE_DOWN:
                            this._move("nextPage", r);
                            break;
                        case i.UP:
                            this._keyEvent("previous", r);
                            break;
                        case i.DOWN:
                            this._keyEvent("next", r)
                    }
                },
                input: function(e) {
                    if (r) {
                        r = !1, e.preventDefault();
                        return
                    }
                    this._searchTimeout(e)
                },
                focus: function() {
                    this.selectedItem = null, this.previous = this._value()
                },
                blur: function(e) {
                    if (this.cancelBlur) {
                        delete this.cancelBlur;
                        return
                    }
                    clearTimeout(this.searching), this.close(e), this._change(e)
                }
            }), this._initSource(), this.menu = e("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                input: e(),
                role: null
            }).hide().data("ui-menu"), this._on(this.menu.element, {
                mousedown: function(t) {
                    t.preventDefault(), this.cancelBlur = !0, this._delay(function() {
                        delete this.cancelBlur
                    });
                    var n = this.menu.element[0];
                    e(t.target).closest(".ui-menu-item").length || this._delay(function() {
                        var t = this;
                        this.document.one("mousedown", function(r) {
                            r.target !== t.element[0] && r.target !== n && !e.contains(n, r.target) && t.close()
                        })
                    })
                },
                menufocus: function(t, n) {
                    if (this.isNewMenu) {
                        this.isNewMenu = !1;
                        if (t.originalEvent && /^mouse/.test(t.originalEvent.type)) {
                            this.menu.blur(), this.document.one("mousemove", function() {
                                e(t.target).trigger(t.originalEvent)
                            });
                            return
                        }
                    }
                    var r = n.item.data("ui-autocomplete-item");
                    !1 !== this._trigger("focus", t, {
                        item: r
                    }) ? t.originalEvent && /^key/.test(t.originalEvent.type) && this._value(r.value) : this.liveRegion.text(r.value)
                },
                menuselect: function(e, t) {
                    var n = t.item.data("ui-autocomplete-item"),
                        r = this.previous;
                    this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = r, this._delay(function() {
                        this.previous = r, this.selectedItem = n
                    })), !1 !== this._trigger("select", e, {
                        item: n
                    }) && this._value(n.value), this.term = this._value(), this.close(e), this.selectedItem = n
                }
            }), this.liveRegion = e("<span>", {
                role: "status",
                "aria-live": "polite"
            }).addClass("ui-helper-hidden-accessible").insertAfter(this.element), this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function() {
            clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
        },
        _setOption: function(e, t) {
            this._super(e, t), e === "source" && this._initSource(), e === "appendTo" && this.menu.element.appendTo(this._appendTo()), e === "disabled" && t && this.xhr && this.xhr.abort()
        },
        _appendTo: function() {
            var t = this.options.appendTo;
            return t && (t = t.jquery || t.nodeType ? e(t) : this.document.find(t).eq(0)), t || (t = this.element.closest(".ui-front")), t.length || (t = this.document[0].body), t
        },
        _initSource: function() {
            var t, n, r = this;
            e.isArray(this.options.source) ? (t = this.options.source, this.source = function(n, r) {
                r(e.ui.autocomplete.filter(t, n.term))
            }) : typeof this.options.source == "string" ? (n = this.options.source, this.source = function(t, i) {
                r.xhr && r.xhr.abort(), r.xhr = e.ajax({
                    url: n,
                    data: t,
                    dataType: "json",
                    success: function(e) {
                        i(e)
                    },
                    error: function() {
                        i([])
                    }
                })
            }) : this.source = this.options.source
        },
        _searchTimeout: function(e) {
            clearTimeout(this.searching), this.searching = this._delay(function() {
                this.term !== this._value() && (this.selectedItem = null, this.search(null, e))
            }, this.options.delay)
        },
        search: function(e, t) {
            e = e != null ? e : this._value(), this.term = this._value();
            if (e.length < this.options.minLength) return this.close(t);
            if (this._trigger("search", t) === !1) return;
            return this._search(e)
        },
        _search: function(e) {
            this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
                term: e
            }, this._response())
        },
        _response: function() {
            var e = this,
                t = ++n;
            return function(r) {
                t === n && e.__response(r), e.pending--, e.pending || e.element.removeClass("ui-autocomplete-loading")
            }
        },
        __response: function(e) {
            e && (e = this._normalize(e)), this._trigger("response", null, {
                content: e
            }), !this.options.disabled && e && e.length && !this.cancelSearch ? (this._suggest(e), this._trigger("open")) : this._close()
        },
        close: function(e) {
            this.cancelSearch = !0, this._close(e)
        },
        _close: function(e) {
            this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", e))
        },
        _change: function(e) {
            this.previous !== this._value() && this._trigger("change", e, {
                item: this.selectedItem
            })
        },
        _normalize: function(t) {
            return t.length && t[0].label && t[0].value ? t : e.map(t, function(t) {
                return typeof t == "string" ? {
                    label: t,
                    value: t
                } : e.extend({
                    label: t.label || t.value,
                    value: t.value || t.label
                }, t)
            })
        },
        _suggest: function(t) {
            var n = this.menu.element.empty();
            this._renderMenu(n, t), this.menu.refresh(), n.show(), this._resizeMenu(), n.position(e.extend({
                of: this.element
            }, this.options.position)), this.options.autoFocus && this.menu.next()
        },
        _resizeMenu: function() {
            var e = this.menu.element;
            e.outerWidth(Math.max(e.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function(t, n) {
            var r = this;
            e.each(n, function(e, n) {
                r._renderItemData(t, n)
            })
        },
        _renderItemData: function(e, t) {
            return this._renderItem(e, t).data("ui-autocomplete-item", t)
        },
        _renderItem: function(t, n) {
            return e("<li>").append(e("<a>").text(n.label)).appendTo(t)
        },
        _move: function(e, t) {
            if (!this.menu.element.is(":visible")) {
                this.search(null, t);
                return
            }
            if (this.menu.isFirstItem() && /^previous/.test(e) || this.menu.isLastItem() && /^next/.test(e)) {
                this._value(this.term), this.menu.blur();
                return
            }
            this.menu[e](t)
        },
        widget: function() {
            return this.menu.element
        },
        _value: function() {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function(e, t) {
            if (!this.isMultiLine || this.menu.element.is(":visible")) this._move(e, t), t.preventDefault()
        }
    }), e.extend(e.ui.autocomplete, {
        escapeRegex: function(e) {
            return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function(t, n) {
            var r = new RegExp(e.ui.autocomplete.escapeRegex(n), "i");
            return e.grep(t, function(e) {
                return r.test(e.label || e.value || e)
            })
        }
    }), e.widget("ui.autocomplete", e.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function(e) {
                    return e + (e > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        },
        __response: function(e) {
            var t;
            this._superApply(arguments);
            if (this.options.disabled || this.cancelSearch) return;
            e && e.length ? t = this.options.messages.results(e.length) : t = this.options.messages.noResults, this.liveRegion.text(t)
        }
    })
})(jQuery);
(function(e, t) {
    e.widget("ui.menu", {
        version: "1.10.1",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            menus: "ul",
            position: {
                my: "left top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function() {
            this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !! this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }).bind("click" + this.eventNamespace, e.proxy(function(e) {
                this.options.disabled && e.preventDefault()
            }, this)), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
                "mousedown .ui-menu-item > a": function(e) {
                    e.preventDefault()
                },
                "click .ui-state-disabled > a": function(e) {
                    e.preventDefault()
                },
                "click .ui-menu-item:has(a)": function(t) {
                    var n = e(t.target).closest(".ui-menu-item");
                    !this.mouseHandled && n.not(".ui-state-disabled").length && (this.mouseHandled = !0, this.select(t), n.has(".ui-menu").length ? this.expand(t) : this.element.is(":focus") || (this.element.trigger("focus", [!0]), this.active && this.active.parents(".ui-menu").length === 1 && clearTimeout(this.timer)))
                },
                "mouseenter .ui-menu-item": function(t) {
                    var n = e(t.currentTarget);
                    n.siblings().children(".ui-state-active").removeClass("ui-state-active"), this.focus(t, n)
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function(e, t) {
                    var n = this.active || this.element.children(".ui-menu-item").eq(0);
                    t || this.focus(e, n)
                },
                blur: function(t) {
                    this._delay(function() {
                        e.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(t)
                    })
                },
                keydown: "_keydown"
            }), this.refresh(), this._on(this.document, {
                click: function(t) {
                    e(t.target).closest(".ui-menu").length || this.collapseAll(t), this.mouseHandled = !1
                }
            })
        },
        _destroy: function() {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                var t = e(this);
                t.data("ui-menu-submenu-carat") && t.remove()
            }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function(t) {
            function a(e) {
                return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            }
            var n, r, i, s, o, u = !0;
            switch (t.keyCode) {
                case e.ui.keyCode.PAGE_UP:
                    this.previousPage(t);
                    break;
                case e.ui.keyCode.PAGE_DOWN:
                    this.nextPage(t);
                    break;
                case e.ui.keyCode.HOME:
                    this._move("first", "first", t);
                    break;
                case e.ui.keyCode.END:
                    this._move("last", "last", t);
                    break;
                case e.ui.keyCode.UP:
                    this.previous(t);
                    break;
                case e.ui.keyCode.DOWN:
                    this.next(t);
                    break;
                case e.ui.keyCode.LEFT:
                    this.collapse(t);
                    break;
                case e.ui.keyCode.RIGHT:
                    this.active && !this.active.is(".ui-state-disabled") && this.expand(t);
                    break;
                case e.ui.keyCode.ENTER:
                case e.ui.keyCode.SPACE:
                    this._activate(t);
                    break;
                case e.ui.keyCode.ESCAPE:
                    this.collapse(t);
                    break;
                default:
                    u = !1, r = this.previousFilter || "", i = String.fromCharCode(t.keyCode), s = !1, clearTimeout(this.filterTimer), i === r ? s = !0 : i = r + i, o = new RegExp("^" + a(i), "i"), n = this.activeMenu.children(".ui-menu-item").filter(function() {
                        return o.test(e(this).children("a").text())
                    }), n = s && n.index(this.active.next()) !== -1 ? this.active.nextAll(".ui-menu-item") : n, n.length || (i = String.fromCharCode(t.keyCode), o = new RegExp("^" + a(i), "i"), n = this.activeMenu.children(".ui-menu-item").filter(function() {
                        return o.test(e(this).children("a").text())
                    })), n.length ? (this.focus(t, n), n.length > 1 ? (this.previousFilter = i, this.filterTimer = this._delay(function() {
                        delete this.previousFilter
                    }, 1e3)) : delete this.previousFilter) : delete this.previousFilter
            }
            u && t.preventDefault()
        },
        _activate: function(e) {
            this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(e) : this.select(e))
        },
        refresh: function() {
            var t, n = this.options.icons.submenu,
                r = this.element.find(this.options.menus);
            r.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function() {
                var t = e(this),
                    r = t.prev("a"),
                    i = e("<span>").addClass("ui-menu-icon ui-icon " + n).data("ui-menu-submenu-carat", !0);
                r.attr("aria-haspopup", "true").prepend(i), t.attr("aria-labelledby", r.attr("id"))
            }), t = r.add(this.element), t.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                tabIndex: -1,
                role: this._itemRole()
            }), t.children(":not(.ui-menu-item)").each(function() {
                var t = e(this);
                /[^\-\u2014\u2013\s]/.test(t.text()) || t.addClass("ui-widget-content ui-menu-divider")
            }), t.children(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !e.contains(this.element[0], this.active[0]) && this.blur()
        },
        _itemRole: function() {
            return {
                menu: "menuitem",
                listbox: "option"
            }[this.options.role]
        },
        _setOption: function(e, t) {
            e === "icons" && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(t.submenu), this._super(e, t)
        },
        focus: function(e, t) {
            var n, r;
            this.blur(e, e && e.type === "focus"), this._scrollIntoView(t), this.active = t.first(), r = this.active.children("a").addClass("ui-state-focus"), this.options.role && this.element.attr("aria-activedescendant", r.attr("id")), this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"), e && e.type === "keydown" ? this._close() : this.timer = this._delay(function() {
                this._close()
            }, this.delay), n = t.children(".ui-menu"), n.length && /^mouse/.test(e.type) && this._startOpening(n), this.activeMenu = t.parent(), this._trigger("focus", e, {
                item: t
            })
        },
        _scrollIntoView: function(t) {
            var n, r, i, s, o, u;
            this._hasScroll() && (n = parseFloat(e.css(this.activeMenu[0], "borderTopWidth")) || 0, r = parseFloat(e.css(this.activeMenu[0], "paddingTop")) || 0, i = t.offset().top - this.activeMenu.offset().top - n - r, s = this.activeMenu.scrollTop(), o = this.activeMenu.height(), u = t.height(), i < 0 ? this.activeMenu.scrollTop(s + i) : i + u > o && this.activeMenu.scrollTop(s + i - o + u))
        },
        blur: function(e, t) {
            t || clearTimeout(this.timer);
            if (!this.active) return;
            this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", e, {
                item: this.active
            })
        },
        _startOpening: function(e) {
            clearTimeout(this.timer);
            if (e.attr("aria-hidden") !== "true") return;
            this.timer = this._delay(function() {
                this._close(), this._open(e)
            }, this.delay)
        },
        _open: function(t) {
            var n = e.extend({
                of: this.active
            }, this.options.position);
            clearTimeout(this.timer), this.element.find(".ui-menu").not(t.parents(".ui-menu")).hide().attr("aria-hidden", "true"), t.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(n)
        },
        collapseAll: function(t, n) {
            clearTimeout(this.timer), this.timer = this._delay(function() {
                var r = n ? this.element : e(t && t.target).closest(this.element.find(".ui-menu"));
                r.length || (r = this.element), this._close(r), this.blur(t), this.activeMenu = r
            }, this.delay)
        },
        _close: function(e) {
            e || (e = this.active ? this.active.parent() : this.element), e.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
        },
        collapse: function(e) {
            var t = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            t && t.length && (this._close(), this.focus(e, t))
        },
        expand: function(e) {
            var t = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
            t && t.length && (this._open(t.parent()), this._delay(function() {
                this.focus(e, t)
            }))
        },
        next: function(e) {
            this._move("next", "first", e)
        },
        previous: function(e) {
            this._move("prev", "last", e)
        },
        isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function(e, t, n) {
            var r;
            this.active && (e === "first" || e === "last" ? r = this.active[e === "first" ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : r = this.active[e + "All"](".ui-menu-item").eq(0));
            if (!r || !r.length || !this.active) r = this.activeMenu.children(".ui-menu-item")[t]();
            this.focus(n, r)
        },
        nextPage: function(t) {
            var n, r, i;
            if (!this.active) {
                this.next(t);
                return
            }
            if (this.isLastItem()) return;
            this._hasScroll() ? (r = this.active.offset().top, i = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                return n = e(this), n.offset().top - r - i < 0
            }), this.focus(t, n)) : this.focus(t, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())
        },
        previousPage: function(t) {
            var n, r, i;
            if (!this.active) {
                this.next(t);
                return
            }
            if (this.isFirstItem()) return;
            this._hasScroll() ? (r = this.active.offset().top, i = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                return n = e(this), n.offset().top - r + i > 0
            }), this.focus(t, n)) : this.focus(t, this.activeMenu.children(".ui-menu-item").first())
        },
        _hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function(t) {
            this.active = this.active || e(t.target).closest(".ui-menu-item");
            var n = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(t, !0), this._trigger("select", t, n)
        }
    })
})(jQuery);




/*
 * INFORMATION
 * -----------------------------------
 * Owner:       jquery.webspirited.com
 * Developer:   Matthew Hailwood
 *
 * Modified by: Zach Snow
 * -----------------------------------
 */

(function($) {
    $.widget("ui.tagit", {

        // default options
        options: {
            //Maps directly to the jQuery-ui Autocomplete option
            tagSource: [],
            //What keys should trigger the completion of a tag
            triggerKeys: ['enter', 'space', 'comma', 'tab'],
            //array method for setting initial tags
            initialTags: [],
            //minimum length of tags
            minLength: 1,
            //should an html select be rendered to allow for normal form submission
            select: false,
            //if false only tags from `tagSource` are able to be entered
            allowNewTags: true,
            //should tag and Tag be treated as identical
            caseSensitive: false,
            //should tags be drag-and-drop sortable?
            //true: entire tag is draggable
            //'handle': a handle is rendered which is draggable
            sortable: false,
            //color to highlight text when a duplicate tag is entered
            highlightOnExistColor: '#0F0',
            //empty search on focus
            emptySearch: true,
            //callback function for when tags are changed
            //tagValue: value of tag that was changed
            //action e.g. removed, added, sorted
            tagsChanged: function(tagValue, action, element) {;
            },
            maxTags: undefined,
            //should 'paste' event trigger 'blur', thus potentially adding a new tag
            // (true for backwards compatibility)
            blurOnPaste: true
        },

        _splitAt: /\ |,/g,
        _existingAtIndex: 0,
        _keys: {
            backspace: [8],
            enter: [13],
            space: [32],
            comma: [44, 188],
            tab: [9]
        },

        _sortable: {
            sorting: -1
        },

        //initialization function
        _create: function() {

            var self = this;
            this.tagsArray = [];
            this.timer = null;

            //add class "tagit" for theming
            this.element.addClass("tagit");

            //add any initial tags added through html to the array
            this.element.children('li').each(function() {
                var tag = $(this);
                var tagValue = tag.attr('tagValue') || tag.data('value');
                self.options.initialTags.push({
                    label: tag.text(),
                    value: (tagValue ? tagValue : tag.text())
                });
            });

            //setup split according to the trigger keys
            self._splitAt = null;
            if ($.inArray('space', self.options.triggerKeys) > 0 && $.inArray('comma', self.options.triggerKeys) > 0)
                self._splitAt = /\ |,/g;
            else if ($.inArray('space', self.options.triggerKeys) > 0)
                self._splitAt = /\ /g;
            else if ($.inArray('comma', self.options.triggerKeys) > 0)
                self._splitAt = /,/g;

            //add the html input
            this.element.html('<li class="tagit-new"><input class="tagit-input" type="text" /></li>');

            this.input = this.element.find(".tagit-input");

            //setup click handler
            $(this.element).click(function(e) {
                if ($(e.target).hasClass('tagit-close')) {
                    // Removes a tag when the little 'x' is clicked.
                    var parent = $(e.target).parent();

                    var tag = self.tagsArray[parent.index()];

                    tag.element.remove();
                    self._popTag(tag);
                } else {
                    self.input.focus();
                    if (self.options.emptySearch && $(e.target).hasClass('tagit-input') && self.input.val() == '' && self.input.autocomplete != undefined) {
                        self.input.autocomplete('search');
                    }
                }
            });

            //setup autocomplete handler
            var os = this.options.select;
            this.options.appendTo = this.element;
            this.options.source = this.options.tagSource;
            this.options.select = function(event, ui) {
                self.input.data('autoCompleteTag', true);
                clearTimeout(self.timer);
                if (self.options.maxTags !== undefined && self.tagsArray.length == self.options.maxTags) {
                    self.input.val("");
                } else {
                    if (ui.item.label === undefined)
                        self._addTag(ui.item.value);
                    else
                        self._addTag(ui.item.label, ui.item.value);
                }

                return false;
            },

            this.options.focus = function(event, ui) {
                if (ui.item.label !== undefined && /^key/.test(event.originalEvent.originalEvent.type)) {
                    self.input.val(ui.item.label);
                    self.input.data('value', ui.item.value);
                    return false;
                }
            };
            this.options.autoFocus = !this.options.allowNewTags;
            this.input.autocomplete(this.options);
            this.options.select = os;

            //setup keydown handler
            this.input.keydown(function(e) {
                var lastLi = self.element.children(".tagit-choice:last");
                if (e.which == self._keys.backspace)
                    return self._backspace(lastLi);

                if (self._isInitKey(e.which) && !(self._isTabKey(e.which) && this.value == '' && !self.input.data('autoCompleteTag'))) {
                    e.preventDefault();

                    self.input.data('autoCompleteTag', false);

                    if (!self.options.allowNewTags || (self.options.maxTags !== undefined && self.tagsArray.length == self.options.maxTags)) {
                        self.input.val("");
                    } else if (self.options.allowNewTags && $(this).val().length >= self.options.minLength) {
                        self._addTag($(this).val());
                    }
                }

                if (self.options.maxLength !== undefined && self.input.val().length == self.options.maxLength) {
                    e.preventDefault();
                }

                if (lastLi.hasClass('selected'))
                    lastLi.removeClass('selected');

                self.lastKey = e.which;
            });

            this.input.bind("paste", function(e) {
                if (self.options.blurOnPaste) {
                    var input = $(this);
                    self.timer = setTimeout(function() {
                        input.blur();
                    }, 0);
                }
            });

            //setup blur handler
            this.input.blur(function(e) {
                self.currentLabel = $(this).val();
                self.currentValue = $(this).data('value');
                if (self.options.allowNewTags) {
                    self.timer = setTimeout(function() {
                        self._addTag(self.currentLabel, self.currentValue);
                        self.currentValue = '';
                        self.currentLabel = '';
                    }, 400);
                }
                $(this).val('').removeData('value');
                return false;
            });

            //define missing trim function for strings
            if (!String.prototype.trim) {
                String.prototype.trim = function() {
                    return this.replace(/^\s+|\s+$/g, '');
                };
            }

            if (this.options.select) {
                this.select = $('<select class="tagit-hiddenSelect" name="' +
                    (this.element.attr('name') || this.element.data('name')) +
                    '" multiple="multiple"></select>');
                this.element.after(this.select);
            }
            this._initialTags();

            //setup sortable handler
            if (self.options.sortable !== false) {

                var soptions = {
                    items: '.tagit-choice',
                    containment: 'parent',
                    opacity: 0.6,
                    tolerance: 'pointer',
                    start: function(event, ui) {
                        self._sortable.tag = $(ui.item);
                        self._sortable.origIndex = self._sortable.tag.index();
                    },
                    update: function(event, ui) {
                        self._sortable.newIndex = self._sortable.tag.index();
                        self._moveTag(self._sortable.origIndex, self._sortable.newIndex);
                        if (self.options.tagsChanged) {
                            var tag = self.tagsArray[self._sortable.newIndex];
                            self.options.tagsChanged(tag.value, 'moved', tag.element);
                        }
                    }
                };

                if (self.options.sortable == 'handle') {
                    soptions.handle = 'a.ui-icon';
                    soptions.cursor = 'move';
                }

                self.element.sortable(soptions);
            }

        },

        _popSelect: function(tag) {
            $('option:eq(' + tag.index + ')', this.select).remove();
            this.select.change();
        },

        _addSelect: function(tag) {
            this.select.append('<option selected="selected" value="' + tag.value + '">' + tag.label + '</option>');
            this.select.change();
        },

        _popTag: function(tag) {

            //are we removing the last tag or a specific tag?
            if (tag === undefined)
                tag = this.tagsArray.pop();
            else
                this.tagsArray.splice(tag.index, 1);


            //maintain the indexes
            for (var ind in this.tagsArray)
                this.tagsArray[ind].index = ind;

            if (this.options.select)
                this._popSelect(tag);
            if (this.options.tagsChanged)
                this.options.tagsChanged(tag.value || tag.label, 'popped', tag);
            return;
        },

        _addTag: function(label, value) {
            this.input.autocomplete();
            this.input.autocomplete('close').val("");

            //are we trying to add a tag that should be split?
            if (this._splitAt && label.search(this._splitAt) > 0) {
                var result = label.split(this._splitAt);
                for (var i = 0; i < result.length; i++)
                    this._addTag(result[i], value);
                return;
            }

            label = label.replace(/,+$/, "").trim();

            if (label == "")
                return false;

            if (!this.options.caseSensitive) {
                label = label ? label.toLowerCase() : label;
                value = value ? value.toLowerCase() : value;
            }

            var tagExists = this._exists(label, value);
            if (tagExists !== false) {
                this._highlightExisting(tagExists);
                return false;
            }

            var tag = this.tag(label, value);
            tag.element = $('<li class="tagit-choice"' + (value !== undefined ? ' tagValue="' + value + '"' : '') + '>' + (this.options.sortable == 'handle' ? '<a class="ui-icon ui-icon-grip-dotted-vertical" style="float:left"></a>' : '') + label + '<a class="tagit-close">x</a></li>');
            tag.element.insertBefore(this.input.parent());
            this.tagsArray.push(tag);

            this.input.val("");

            if (this.options.select)
                this._addSelect(tag);
            if (this.options.tagsChanged)
                this.options.tagsChanged(tag.label, 'added', tag.element);
            return true;
        },

        _exists: function(label, value) {
            if (this.tagsArray.length == 0)
                return false;

            label = this._lowerIfCaseInsensitive(label);
            value = this._lowerIfCaseInsensitive(value);

            for (var ind in this.tagsArray) {
                if (this._lowerIfCaseInsensitive(this.tagsArray[ind].label) == label) {
                    if (value !== undefined) {
                        if (this._lowerIfCaseInsensitive(this.tagsArray[ind].value) == value)
                            return ind;
                    } else {
                        return ind;
                    }
                }
            }

            return false;
        },

        _highlightExisting: function(index) {
            if (this.options.highlightOnExistColor === undefined)
                return;
            var tag = this.tagsArray[index];
            tag.element.stop();

            var initialColor = tag.element.css('color');
            tag.element.animate({
                color: this.options.highlightOnExistColor
            }, 100).animate({
                'color': initialColor
            }, 800);
        },

        _isInitKey: function(keyCode) {
            var keyName = "";
            for (var key in this._keys)
                if ($.inArray(keyCode, this._keys[key]) != -1)
                    keyName = key;

            if ($.inArray(keyName, this.options.triggerKeys) != -1)
                return true;
            return false;
        },

        _isTabKey: function(keyCode) {
            var tabKeys = this._keys['tab'];
            return $.inArray(keyCode, tabKeys) > -1;
        },

        _removeTag: function() {
            this._popTag();
            this.element.children(".tagit-choice:last").remove();
        },

        _backspace: function(li) {
            if (this.input.val() == "") {
                // When backspace is pressed, the last tag is deleted.
                if (this.lastKey == this._keys.backspace) {
                    this._popTag();
                    li.remove();
                    this.lastKey = null;
                } else {
                    li.addClass('selected');
                    this.lastKey = this._keys.backspace;
                }
            }
            return true;
        },

        _initialTags: function() {
            var input = this;
            var _temp;
            if (this.options.tagsChanged)
                _temp = this.options.tagsChanged;
            this.options.tagsChanged = null;

            if (this.options.initialTags.length != 0) {
                $(this.options.initialTags).each(function(i, element) {
                    if (typeof(element) == "object")
                        input._addTag(element.label, element.value);
                    else
                        input._addTag(element);
                });
            }
            this.options.tagsChanged = _temp;
        },

        _lowerIfCaseInsensitive: function(inp) {

            if (inp === undefined || typeof(inp) != typeof("a"))
                return inp;

            if (this.options.caseSensitive)
                return inp;

            return inp.toLowerCase();

        },

        _moveTag: function(old_index, new_index) {
            this.tagsArray.splice(new_index, 0, this.tagsArray.splice(old_index, 1)[0]);
            for (var ind in this.tagsArray)
                this.tagsArray[ind].index = ind;

            if (this.options.select) {
                $('option:eq(' + old_index + ')', this.select).insertBefore($('option:eq(' + new_index + ')', this.select));
            }
        },
        tags: function() {
            return this.tagsArray;
        },

        destroy: function() {
            $.Widget.prototype.destroy.apply(this, arguments); // default destroy
            this.tagsArray = [];
        },

        reset: function() {
            this.element.find(".tagit-choice").remove();
            this.tagsArray = [];
            if (this.options.select) {
                this.select.children().remove();
                this.select.change();
            }
            this._initialTags();
            if (this.options.tagsChanged)
                this.options.tagsChanged(null, 'reset', null);
        },

        fill: function(tags) {

            if (tags !== undefined)
                this.options.initialTags = tags;
            this.reset();
        },

        add: function(label, value) {
            if (typeof(label) == "object")
                return this._addTag(label.label, label.value);
            else
                return this._addTag(label, value);
        },

        autocomplete: function() {
            return this.input.data("autocomplete");
        },

        tag: function(label, value, element) {
            var self = this;
            return {
                label: label,
                value: (value === undefined ? label : value),
                element: element,
                index: self.tagsArray.length
            };
        },

        remove: function(label, value) {
            if (this.tagsArray.length == 0)
                return false;

            label = this._lowerIfCaseInsensitive(label);
            value = this._lowerIfCaseInsensitive(value);

            for (var i = 0; i < this.tagsArray.length; i++) {
                if (this._lowerIfCaseInsensitive(this.tagsArray[i].value) == value || this._lowerIfCaseInsensitive(this.tagsArray[i].label) == label) {
                    break;
                }
            }

            if (i >= 0 && i < this.tagsArray.length) {
                var tag = this.tagsArray[i];
                tag.element.remove();
                this._popTag(tag);
                return true;
            }
            return false;
        }
    });
})(jQuery);
