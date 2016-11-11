! function(a) {

    "use strict";

    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)

}(function(a) {

    "use strict";



    function b(a) {

        if (a instanceof Date) return a;

        if (String(a).match(g)) return String(a).match(/^[0-9]*$/) && (a = Number(a)), String(a).match(/\-/) && (a = String(a).replace(/\-/g, "/")), new Date(a);

        throw new Error("Couldn't cast `" + a + "` to a date object.")

    }



    function c(a) {

        return function(b) {

            var c = b.match(/%(-|!)?[A-Z]{1}(:[^;]+;)?/gi);

            if (c)

                for (var e = 0, f = c.length; f > e; ++e) {

                    var g = c[e].match(/%(-|!)?([a-zA-Z]{1})(:[^;]+;)?/),

                        i = new RegExp(g[0]),

                        j = g[1] || "",

                        k = g[3] || "",

                        l = null;

                    g = g[2], h.hasOwnProperty(g) && (l = h[g], l = Number(a[l])), null !== l && ("!" === j && (l = d(k, l)), "" === j && 10 > l && (l = "0" + l.toString()), b = b.replace(i, l.toString()))

                }

            return b = b.replace(/%%/, "%")

        }

    }



    function d(a, b) {

        var c = "s",

            d = "";

        return a && (a = a.replace(/(:|;|\s)/gi, "").split(/\,/), 1 === a.length ? c = a[0] : (d = a[0], c = a[1])), 1 === Math.abs(b) ? d : c

    }

    var e = 100,

        f = [],

        g = [];

    g.push(/^[0-9]*$/.source), g.push(/([0-9]{1,2}\/){2}[0-9]{4}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g.push(/[0-9]{4}([\/\-][0-9]{1,2}){2}( [0-9]{1,2}(:[0-9]{2}){2})?/.source), g = new RegExp(g.join("|"));

    var h = {

            Y: "years",

            m: "months",

            w: "weeks",

            d: "days",

            D: "totalDays",

            H: "hours",

            M: "minutes",

            S: "seconds"

        },

        i = function(b, c, d) {

            this.el = b, this.$el = a(b), this.interval = null, this.offset = {}, this.instanceNumber = f.length, f.push(this), this.$el.data("countdown-instance", this.instanceNumber), d && (this.$el.on("update.countdown", d), this.$el.on("stoped.countdown", d), this.$el.on("finish.countdown", d)), this.setFinalDate(c), this.start()

        };

    a.extend(i.prototype, {

        start: function() {

            null !== this.interval && clearInterval(this.interval);

            var a = this;

            this.update(), this.interval = setInterval(function() {

                a.update.call(a)

            }, e)

        },

        stop: function() {

            clearInterval(this.interval), this.interval = null, this.dispatchEvent("stoped")

        },

        pause: function() {

            this.stop.call(this)

        },

        resume: function() {

            this.start.call(this)

        },

        remove: function() {

            this.stop(), f[this.instanceNumber] = null, delete this.$el.data().countdownInstance

        },

        setFinalDate: function(a) {

            this.finalDate = b(a)

        },

        update: function() {

            return 0 === this.$el.closest("html").length ? void this.remove() : (this.totalSecsLeft = this.finalDate.getTime() - (new Date).getTime(), this.totalSecsLeft = Math.ceil(this.totalSecsLeft / 1e3), this.totalSecsLeft = this.totalSecsLeft < 0 ? 0 : this.totalSecsLeft, this.offset = {

                seconds: this.totalSecsLeft % 60,

                minutes: Math.floor(this.totalSecsLeft / 60) % 60,

                hours: Math.floor(this.totalSecsLeft / 60 / 60) % 24,

                days: Math.floor(this.totalSecsLeft / 60 / 60 / 24) % 7,

                totalDays: Math.floor(this.totalSecsLeft / 60 / 60 / 24),

                weeks: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 7),

                months: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 30),

                years: Math.floor(this.totalSecsLeft / 60 / 60 / 24 / 365)

            }, void(0 === this.totalSecsLeft ? (this.stop(), this.dispatchEvent("finish")) : this.dispatchEvent("update")))

        },

        dispatchEvent: function(b) {

            var d = a.Event(b + ".countdown");

            d.finalDate = this.finalDate, d.offset = a.extend({}, this.offset), d.strftime = c(this.offset), this.$el.trigger(d)

        }

    }), a.fn.countdown = function() {

        var b = Array.prototype.slice.call(arguments, 0);

        return this.each(function() {

            var c = a(this).data("countdown-instance");

            if (void 0 !== c) {

                var d = f[c],

                    e = b[0];

                i.prototype.hasOwnProperty(e) ? d[e].apply(d, b.slice(1)) : null === String(e).match(/^[$A-Z_][0-9A-Z_$]*$/i) ? (d.setFinalDate.call(d, e), d.start()) : a.error("Method %s does not exist on jQuery.countdown".replace(/\%s/gi, e))

            } else new i(this, b[0], b[1])

        })

    }

}),

function(a) {

    "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)

}(function(a) {

    function b(b, d) {

        var e, f, g, h = b.nodeName.toLowerCase();

        return "area" === h ? (e = b.parentNode, f = e.name, !(!b.href || !f || "map" !== e.nodeName.toLowerCase()) && (g = a("img[usemap='#" + f + "']")[0], !!g && c(g))) : (/^(input|select|textarea|button|object)$/.test(h) ? !b.disabled : "a" === h ? b.href || d : d) && c(b)

    }



    function c(b) {

        return a.expr.filters.visible(b) && !a(b).parents().addBack().filter(function() {

            return "hidden" === a.css(this, "visibility")

        }).length

    }

    a.ui = a.ui || {}, a.extend(a.ui, {

        version: "1.11.4",

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

            PAGE_DOWN: 34,

            PAGE_UP: 33,

            PERIOD: 190,

            RIGHT: 39,

            SPACE: 32,

            TAB: 9,

            UP: 38

        }

    }), a.fn.extend({

        scrollParent: function(b) {

            var c = this.css("position"),

                d = "absolute" === c,

                e = b ? /(auto|scroll|hidden)/ : /(auto|scroll)/,

                f = this.parents().filter(function() {

                    var b = a(this);

                    return (!d || "static" !== b.css("position")) && e.test(b.css("overflow") + b.css("overflow-y") + b.css("overflow-x"))

                }).eq(0);

            return "fixed" !== c && f.length ? f : a(this[0].ownerDocument || document)

        },

        uniqueId: function() {

            var a = 0;

            return function() {

                return this.each(function() {

                    this.id || (this.id = "ui-id-" + ++a)

                })

            }

        }(),

        removeUniqueId: function() {

            return this.each(function() {

                /^ui-id-\d+$/.test(this.id) && a(this).removeAttr("id")

            })

        }

    }), a.extend(a.expr[":"], {

        data: a.expr.createPseudo ? a.expr.createPseudo(function(b) {

            return function(c) {

                return !!a.data(c, b)

            }

        }) : function(b, c, d) {

            return !!a.data(b, d[3])

        },

        focusable: function(c) {

            return b(c, !isNaN(a.attr(c, "tabindex")))

        },

        tabbable: function(c) {

            var d = a.attr(c, "tabindex"),

                e = isNaN(d);

            return (e || d >= 0) && b(c, !e)

        }

    }), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function(b, c) {

        function d(b, c, d, f) {

            return a.each(e, function() {

                c -= parseFloat(a.css(b, "padding" + this)) || 0, d && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0), f && (c -= parseFloat(a.css(b, "margin" + this)) || 0)

            }), c

        }

        var e = "Width" === c ? ["Left", "Right"] : ["Top", "Bottom"],

            f = c.toLowerCase(),

            g = {

                innerWidth: a.fn.innerWidth,

                innerHeight: a.fn.innerHeight,

                outerWidth: a.fn.outerWidth,

                outerHeight: a.fn.outerHeight

            };

        a.fn["inner" + c] = function(b) {

            return void 0 === b ? g["inner" + c].call(this) : this.each(function() {

                a(this).css(f, d(this, b) + "px")

            })

        }, a.fn["outer" + c] = function(b, e) {

            return "number" != typeof b ? g["outer" + c].call(this, b) : this.each(function() {

                a(this).css(f, d(this, b, !0, e) + "px")

            })

        }

    }), a.fn.addBack || (a.fn.addBack = function(a) {

        return this.add(null == a ? this.prevObject : this.prevObject.filter(a))

    }), a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = function(b) {

        return function(c) {

            return arguments.length ? b.call(this, a.camelCase(c)) : b.call(this)

        }

    }(a.fn.removeData)), a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), a.fn.extend({

        focus: function(b) {

            return function(c, d) {

                return "number" == typeof c ? this.each(function() {

                    var b = this;

                    setTimeout(function() {

                        a(b).focus(), d && d.call(b)

                    }, c)

                }) : b.apply(this, arguments)

            }

        }(a.fn.focus),

        disableSelection: function() {

            var a = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown";

            return function() {

                return this.bind(a + ".ui-disableSelection", function(a) {

                    a.preventDefault()

                })

            }

        }(),

        enableSelection: function() {

            return this.unbind(".ui-disableSelection")

        },

        zIndex: function(b) {

            if (void 0 !== b) return this.css("zIndex", b);

            if (this.length)

                for (var c, d, e = a(this[0]); e.length && e[0] !== document;) {

                    if (c = e.css("position"), ("absolute" === c || "relative" === c || "fixed" === c) && (d = parseInt(e.css("zIndex"), 10), !isNaN(d) && 0 !== d)) return d;

                    e = e.parent()

                }

            return 0

        }

    }), a.ui.plugin = {

        add: function(b, c, d) {

            var e, f = a.ui[b].prototype;

            for (e in d) f.plugins[e] = f.plugins[e] || [], f.plugins[e].push([c, d[e]])

        },

        call: function(a, b, c, d) {

            var e, f = a.plugins[b];

            if (f && (d || a.element[0].parentNode && 11 !== a.element[0].parentNode.nodeType))

                for (e = 0; f.length > e; e++) a.options[f[e][0]] && f[e][1].apply(a.element, c)

        }

    };

    var d = 0,

        e = Array.prototype.slice;

    a.cleanData = function(b) {

        return function(c) {

            var d, e, f;

            for (f = 0; null != (e = c[f]); f++) try {

                d = a._data(e, "events"), d && d.remove && a(e).triggerHandler("remove")

            } catch (a) {}

            b(c)

        }

    }(a.cleanData), a.widget = function(b, c, d) {

        var e, f, g, h, i = {},

            j = b.split(".")[0];

        return b = b.split(".")[1], e = j + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][e.toLowerCase()] = function(b) {

            return !!a.data(b, e)

        }, a[j] = a[j] || {}, f = a[j][b], g = a[j][b] = function(a, b) {

            return this._createWidget ? void(arguments.length && this._createWidget(a, b)) : new g(a, b)

        }, a.extend(g, f, {

            version: d.version,

            _proto: a.extend({}, d),

            _childConstructors: []

        }), h = new c, h.options = a.widget.extend({}, h.options), a.each(d, function(b, d) {

            return a.isFunction(d) ? void(i[b] = function() {

                var a = function() {

                        return c.prototype[b].apply(this, arguments)

                    },

                    e = function(a) {

                        return c.prototype[b].apply(this, a)

                    };

                return function() {

                    var b, c = this._super,

                        f = this._superApply;

                    return this._super = a, this._superApply = e, b = d.apply(this, arguments), this._super = c, this._superApply = f, b

                }

            }()) : void(i[b] = d)

        }), g.prototype = a.widget.extend(h, {

            widgetEventPrefix: f ? h.widgetEventPrefix || b : b

        }, i, {

            constructor: g,

            namespace: j,

            widgetName: b,

            widgetFullName: e

        }), f ? (a.each(f._childConstructors, function(b, c) {

            var d = c.prototype;

            a.widget(d.namespace + "." + d.widgetName, g, c._proto)

        }), delete f._childConstructors) : c._childConstructors.push(g), a.widget.bridge(b, g), g

    }, a.widget.extend = function(b) {

        for (var c, d, f = e.call(arguments, 1), g = 0, h = f.length; h > g; g++)

            for (c in f[g]) d = f[g][c], f[g].hasOwnProperty(c) && void 0 !== d && (b[c] = a.isPlainObject(d) ? a.isPlainObject(b[c]) ? a.widget.extend({}, b[c], d) : a.widget.extend({}, d) : d);

        return b

    }, a.widget.bridge = function(b, c) {

        var d = c.prototype.widgetFullName || b;

        a.fn[b] = function(f) {

            var g = "string" == typeof f,

                h = e.call(arguments, 1),

                i = this;

            return g ? this.each(function() {

                var c, e = a.data(this, d);

                return "instance" === f ? (i = e, !1) : e ? a.isFunction(e[f]) && "_" !== f.charAt(0) ? (c = e[f].apply(e, h), c !== e && void 0 !== c ? (i = c && c.jquery ? i.pushStack(c.get()) : c, !1) : void 0) : a.error("no such method '" + f + "' for " + b + " widget instance") : a.error("cannot call methods on " + b + " prior to initialization; attempted to call method '" + f + "'")

            }) : (h.length && (f = a.widget.extend.apply(null, [f].concat(h))), this.each(function() {

                var b = a.data(this, d);

                b ? (b.option(f || {}), b._init && b._init()) : a.data(this, d, new c(f, this))

            })), i

        }

    }, a.Widget = function() {}, a.Widget._childConstructors = [], a.Widget.prototype = {

        widgetName: "widget",

        widgetEventPrefix: "",

        defaultElement: "<div>",

        options: {

            disabled: !1,

            create: null

        },

        _createWidget: function(b, c) {

            c = a(c || this.defaultElement || this)[0], this.element = a(c), this.uuid = d++, this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = a(), this.hoverable = a(), this.focusable = a(), c !== this && (a.data(c, this.widgetFullName, this), this._on(!0, this.element, {

                remove: function(a) {

                    a.target === c && this.destroy()

                }

            }), this.document = a(c.style ? c.ownerDocument : c.document || c), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)), this.options = a.widget.extend({}, this.options, this._getCreateOptions(), b), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()

        },

        _getCreateOptions: a.noop,

        _getCreateEventData: a.noop,

        _create: a.noop,

        _init: a.noop,

        destroy: function() {

            this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")

        },

        _destroy: a.noop,

        widget: function() {

            return this.element

        },

        option: function(b, c) {

            var d, e, f, g = b;

            if (0 === arguments.length) return a.widget.extend({}, this.options);

            if ("string" == typeof b)

                if (g = {}, d = b.split("."), b = d.shift(), d.length) {

                    for (e = g[b] = a.widget.extend({}, this.options[b]), f = 0; d.length - 1 > f; f++) e[d[f]] = e[d[f]] || {}, e = e[d[f]];

                    if (b = d.pop(), 1 === arguments.length) return void 0 === e[b] ? null : e[b];

                    e[b] = c

                } else {

                    if (1 === arguments.length) return void 0 === this.options[b] ? null : this.options[b];

                    g[b] = c

                }

            return this._setOptions(g), this

        },

        _setOptions: function(a) {

            var b;

            for (b in a) this._setOption(b, a[b]);

            return this

        },

        _setOption: function(a, b) {

            return this.options[a] = b, "disabled" === a && (this.widget().toggleClass(this.widgetFullName + "-disabled", !!b), b && (this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"))), this

        },

        enable: function() {

            return this._setOptions({

                disabled: !1

            })

        },

        disable: function() {

            return this._setOptions({

                disabled: !0

            })

        },

        _on: function(b, c, d) {

            var e, f = this;

            "boolean" != typeof b && (d = c, c = b, b = !1), d ? (c = e = a(c), this.bindings = this.bindings.add(c)) : (d = c, c = this.element, e = this.widget()), a.each(d, function(d, g) {

                function h() {

                    return b || f.options.disabled !== !0 && !a(this).hasClass("ui-state-disabled") ? ("string" == typeof g ? f[g] : g).apply(f, arguments) : void 0

                }

                "string" != typeof g && (h.guid = g.guid = g.guid || h.guid || a.guid++);

                var i = d.match(/^([\w:-]*)\s*(.*)$/),

                    j = i[1] + f.eventNamespace,

                    k = i[2];

                k ? e.delegate(k, j, h) : c.bind(j, h)

            })

        },

        _off: function(b, c) {

            c = (c || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, b.unbind(c).undelegate(c), this.bindings = a(this.bindings.not(b).get()), this.focusable = a(this.focusable.not(b).get()), this.hoverable = a(this.hoverable.not(b).get())

        },

        _delay: function(a, b) {

            function c() {

                return ("string" == typeof a ? d[a] : a).apply(d, arguments)

            }

            var d = this;

            return setTimeout(c, b || 0)

        },

        _hoverable: function(b) {

            this.hoverable = this.hoverable.add(b), this._on(b, {

                mouseenter: function(b) {

                    a(b.currentTarget).addClass("ui-state-hover")

                },

                mouseleave: function(b) {

                    a(b.currentTarget).removeClass("ui-state-hover")

                }

            })

        },

        _focusable: function(b) {

            this.focusable = this.focusable.add(b), this._on(b, {

                focusin: function(b) {

                    a(b.currentTarget).addClass("ui-state-focus")

                },

                focusout: function(b) {

                    a(b.currentTarget).removeClass("ui-state-focus")

                }

            })

        },

        _trigger: function(b, c, d) {

            var e, f, g = this.options[b];

            if (d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent)

                for (e in f) e in c || (c[e] = f[e]);

            return this.element.trigger(c, d), !(a.isFunction(g) && g.apply(this.element[0], [c].concat(d)) === !1 || c.isDefaultPrevented())

        }

    }, a.each({

        show: "fadeIn",

        hide: "fadeOut"

    }, function(b, c) {

        a.Widget.prototype["_" + b] = function(d, e, f) {

            "string" == typeof e && (e = {

                effect: e

            });

            var g, h = e ? e === !0 || "number" == typeof e ? c : e.effect || c : b;

            e = e || {}, "number" == typeof e && (e = {

                duration: e

            }), g = !a.isEmptyObject(e), e.complete = f, e.delay && d.delay(e.delay), g && a.effects && a.effects.effect[h] ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function(c) {

                a(this)[b](), f && f.call(d[0]), c()

            })

        }

    }), a.widget;

    var f = !1;

    a(document).mouseup(function() {

        f = !1

    }), a.widget("ui.mouse", {

        version: "1.11.4",

        options: {

            cancel: "input,textarea,button,select,option",

            distance: 1,

            delay: 0

        },

        _mouseInit: function() {

            var b = this;

            this.element.bind("mousedown." + this.widgetName, function(a) {

                return b._mouseDown(a)

            }).bind("click." + this.widgetName, function(c) {

                return !0 === a.data(c.target, b.widgetName + ".preventClickEvent") ? (a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1) : void 0

            }), this.started = !1

        },

        _mouseDestroy: function() {

            this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)

        },

        _mouseDown: function(b) {

            if (!f) {

                this._mouseMoved = !1, this._mouseStarted && this._mouseUp(b), this._mouseDownEvent = b;

                var c = this,

                    d = 1 === b.which,

                    e = !("string" != typeof this.options.cancel || !b.target.nodeName) && a(b.target).closest(this.options.cancel).length;

                return !(d && !e && this._mouseCapture(b)) || (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {

                    c.mouseDelayMet = !0

                }, this.options.delay)), this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(b) !== !1, !this._mouseStarted) ? (b.preventDefault(), !0) : (!0 === a.data(b.target, this.widgetName + ".preventClickEvent") && a.removeData(b.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(a) {

                    return c._mouseMove(a)

                }, this._mouseUpDelegate = function(a) {

                    return c._mouseUp(a)

                }, this.document.bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), b.preventDefault(), f = !0, !0))

            }

        },

        _mouseMove: function(b) {

            if (this._mouseMoved) {

                if (a.ui.ie && (!document.documentMode || 9 > document.documentMode) && !b.button) return this._mouseUp(b);

                if (!b.which) return this._mouseUp(b)

            }

            return (b.which || b.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted)

        },

        _mouseUp: function(b) {

            return this.document.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, b.target === this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b)), f = !1, !1

        },

        _mouseDistanceMet: function(a) {

            return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance

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

    }), a.widget("ui.slider", a.ui.mouse, {

        version: "1.11.4",

        widgetEventPrefix: "slide",

        options: {

            animate: !1,

            distance: 0,

            max: 100,

            min: 0,

            orientation: "horizontal",

            range: !1,

            step: 1,

            value: 0,

            values: null,

            change: null,

            slide: null,

            start: null,

            stop: null

        },

        numPages: 5,

        _create: function() {

            this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1

        },

        _refresh: function() {

            this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()

        },

        _createHandles: function() {

            var b, c, d = this.options,

                e = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),

                f = "<span class='ui-slider-handle ui-state-default ui-corner-all' tabindex='0'></span>",

                g = [];

            for (c = d.values && d.values.length || 1, e.length > c && (e.slice(c).remove(), e = e.slice(0, c)), b = e.length; c > b; b++) g.push(f);

            this.handles = e.add(a(g.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function(b) {

                a(this).data("ui-slider-handle-index", b)

            })

        },

        _createRange: function() {

            var b = this.options,

                c = "";

            b.range ? (b.range === !0 && (b.values ? b.values.length && 2 !== b.values.length ? b.values = [b.values[0], b.values[0]] : a.isArray(b.values) && (b.values = b.values.slice(0)) : b.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({

                left: "",

                bottom: ""

            }) : (this.range = a("<div></div>").appendTo(this.element), c = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(c + ("min" === b.range || "max" === b.range ? " ui-slider-range-" + b.range : ""))) : (this.range && this.range.remove(), this.range = null)

        },

        _setupEvents: function() {

            this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles)

        },

        _destroy: function() {

            this.handles.remove(), this.range && this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()

        },

        _mouseCapture: function(b) {

            var c, d, e, f, g, h, i, j, k = this,

                l = this.options;

            return !l.disabled && (this.elementSize = {

                width: this.element.outerWidth(),

                height: this.element.outerHeight()

            }, this.elementOffset = this.element.offset(), c = {

                x: b.pageX,

                y: b.pageY

            }, d = this._normValueFromMouse(c), e = this._valueMax() - this._valueMin() + 1, this.handles.each(function(b) {

                var c = Math.abs(d - k.values(b));

                (e > c || e === c && (b === k._lastChangedValue || k.values(b) === l.min)) && (e = c, f = a(this), g = b)

            }), h = this._start(b, g), h !== !1 && (this._mouseSliding = !0, this._handleIndex = g, f.addClass("ui-state-active").focus(), i = f.offset(), j = !a(b.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = j ? {

                left: 0,

                top: 0

            } : {

                left: b.pageX - i.left - f.width() / 2,

                top: b.pageY - i.top - f.height() / 2 - (parseInt(f.css("borderTopWidth"), 10) || 0) - (parseInt(f.css("borderBottomWidth"), 10) || 0) + (parseInt(f.css("marginTop"), 10) || 0)

            }, this.handles.hasClass("ui-state-hover") || this._slide(b, g, d), this._animateOff = !0, !0))

        },

        _mouseStart: function() {

            return !0

        },

        _mouseDrag: function(a) {

            var b = {

                    x: a.pageX,

                    y: a.pageY

                },

                c = this._normValueFromMouse(b);

            return this._slide(a, this._handleIndex, c), !1

        },

        _mouseStop: function(a) {

            return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(a, this._handleIndex), this._change(a, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1

        },

        _detectOrientation: function() {

            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"

        },

        _normValueFromMouse: function(a) {

            var b, c, d, e, f;

            return "horizontal" === this.orientation ? (b = this.elementSize.width, c = a.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (b = this.elementSize.height, c = a.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), d = c / b, d > 1 && (d = 1), 0 > d && (d = 0), "vertical" === this.orientation && (d = 1 - d), e = this._valueMax() - this._valueMin(), f = this._valueMin() + d * e, this._trimAlignValue(f)

        },

        _start: function(a, b) {

            var c = {

                handle: this.handles[b],

                value: this.value()

            };

            return this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("start", a, c)

        },

        _slide: function(a, b, c) {

            var d, e, f;

            this.options.values && this.options.values.length ? (d = this.values(b ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === b && c > d || 1 === b && d > c) && (c = d), c !== this.values(b) && (e = this.values(), e[b] = c, f = this._trigger("slide", a, {

                handle: this.handles[b],

                value: c,

                values: e

            }), d = this.values(b ? 0 : 1), f !== !1 && this.values(b, c))) : c !== this.value() && (f = this._trigger("slide", a, {

                handle: this.handles[b],

                value: c

            }), f !== !1 && this.value(c))

        },

        _stop: function(a, b) {

            var c = {

                handle: this.handles[b],

                value: this.value()

            };

            this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("stop", a, c)

        },

        _change: function(a, b) {

            if (!this._keySliding && !this._mouseSliding) {

                var c = {

                    handle: this.handles[b],

                    value: this.value()

                };

                this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._lastChangedValue = b, this._trigger("change", a, c)

            }

        },

        value: function(a) {

            return arguments.length ? (this.options.value = this._trimAlignValue(a), this._refreshValue(), void this._change(null, 0)) : this._value()

        },

        values: function(b, c) {

            var d, e, f;

            if (arguments.length > 1) return this.options.values[b] = this._trimAlignValue(c), this._refreshValue(), void this._change(null, b);

            if (!arguments.length) return this._values();

            if (!a.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(b) : this.value();

            for (d = this.options.values, e = arguments[0], f = 0; d.length > f; f += 1) d[f] = this._trimAlignValue(e[f]), this._change(null, f);

            this._refreshValue()

        },

        _setOption: function(b, c) {

            var d, e = 0;

            switch ("range" === b && this.options.range === !0 && ("min" === c ? (this.options.value = this._values(0), this.options.values = null) : "max" === c && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), a.isArray(this.options.values) && (e = this.options.values.length), "disabled" === b && this.element.toggleClass("ui-state-disabled", !!c), this._super(b, c), b) {

                case "orientation":

                    this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue(), this.handles.css("horizontal" === c ? "bottom" : "left", "");

                    break;

                case "value":

                    this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;

                    break;

                case "values":

                    for (this._animateOff = !0, this._refreshValue(), d = 0; e > d; d += 1) this._change(null, d);

                    this._animateOff = !1;

                    break;

                case "step":

                case "min":

                case "max":

                    this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1;

                    break;

                case "range":

                    this._animateOff = !0, this._refresh(), this._animateOff = !1

            }

        },

        _value: function() {

            var a = this.options.value;

            return a = this._trimAlignValue(a)

        },

        _values: function(a) {

            var b, c, d;

            if (arguments.length) return b = this.options.values[a], b = this._trimAlignValue(b);

            if (this.options.values && this.options.values.length) {

                for (c = this.options.values.slice(), d = 0; c.length > d; d += 1) c[d] = this._trimAlignValue(c[d]);

                return c

            }

            return []

        },

        _trimAlignValue: function(a) {

            if (this._valueMin() >= a) return this._valueMin();

            if (a >= this._valueMax()) return this._valueMax();

            var b = this.options.step > 0 ? this.options.step : 1,

                c = (a - this._valueMin()) % b,

                d = a - c;

            return 2 * Math.abs(c) >= b && (d += c > 0 ? b : -b), parseFloat(d.toFixed(5))

        },

        _calculateNewMax: function() {

            var a = this.options.max,

                b = this._valueMin(),

                c = this.options.step,

                d = Math.floor(+(a - b).toFixed(this._precision()) / c) * c;

            a = d + b, this.max = parseFloat(a.toFixed(this._precision()))

        },

        _precision: function() {

            var a = this._precisionOf(this.options.step);

            return null !== this.options.min && (a = Math.max(a, this._precisionOf(this.options.min))), a

        },

        _precisionOf: function(a) {

            var b = "" + a,

                c = b.indexOf(".");

            return -1 === c ? 0 : b.length - c - 1

        },

        _valueMin: function() {

            return this.options.min

        },

        _valueMax: function() {

            return this.max

        },

        _refreshValue: function() {

            var b, c, d, e, f, g = this.options.range,

                h = this.options,

                i = this,

                j = !this._animateOff && h.animate,

                k = {};

            this.options.values && this.options.values.length ? this.handles.each(function(d) {

                c = 100 * ((i.values(d) - i._valueMin()) / (i._valueMax() - i._valueMin())), k["horizontal" === i.orientation ? "left" : "bottom"] = c + "%", a(this).stop(1, 1)[j ? "animate" : "css"](k, h.animate), i.options.range === !0 && ("horizontal" === i.orientation ? (0 === d && i.range.stop(1, 1)[j ? "animate" : "css"]({

                    left: c + "%"

                }, h.animate), 1 === d && i.range[j ? "animate" : "css"]({

                    width: c - b + "%"

                }, {

                    queue: !1,

                    duration: h.animate

                })) : (0 === d && i.range.stop(1, 1)[j ? "animate" : "css"]({

                    bottom: c + "%"

                }, h.animate), 1 === d && i.range[j ? "animate" : "css"]({

                    height: c - b + "%"

                }, {

                    queue: !1,

                    duration: h.animate

                }))), b = c

            }) : (d = this.value(), e = this._valueMin(), f = this._valueMax(), c = f !== e ? 100 * ((d - e) / (f - e)) : 0, k["horizontal" === this.orientation ? "left" : "bottom"] = c + "%", this.handle.stop(1, 1)[j ? "animate" : "css"](k, h.animate), "min" === g && "horizontal" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({

                width: c + "%"

            }, h.animate), "max" === g && "horizontal" === this.orientation && this.range[j ? "animate" : "css"]({

                width: 100 - c + "%"

            }, {

                queue: !1,

                duration: h.animate

            }), "min" === g && "vertical" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({

                height: c + "%"

            }, h.animate), "max" === g && "vertical" === this.orientation && this.range[j ? "animate" : "css"]({

                height: 100 - c + "%"

            }, {

                queue: !1,

                duration: h.animate

            }))

        },

        _handleEvents: {

            keydown: function(b) {

                var c, d, e, f, g = a(b.target).data("ui-slider-handle-index");

                switch (b.keyCode) {

                    case a.ui.keyCode.HOME:

                    case a.ui.keyCode.END:

                    case a.ui.keyCode.PAGE_UP:

                    case a.ui.keyCode.PAGE_DOWN:

                    case a.ui.keyCode.UP:

                    case a.ui.keyCode.RIGHT:

                    case a.ui.keyCode.DOWN:

                    case a.ui.keyCode.LEFT:

                        if (b.preventDefault(), !this._keySliding && (this._keySliding = !0, a(b.target).addClass("ui-state-active"), c = this._start(b, g), c === !1)) return

                }

                switch (f = this.options.step, d = e = this.options.values && this.options.values.length ? this.values(g) : this.value(), b.keyCode) {

                    case a.ui.keyCode.HOME:

                        e = this._valueMin();

                        break;

                    case a.ui.keyCode.END:

                        e = this._valueMax();

                        break;

                    case a.ui.keyCode.PAGE_UP:

                        e = this._trimAlignValue(d + (this._valueMax() - this._valueMin()) / this.numPages);

                        break;

                    case a.ui.keyCode.PAGE_DOWN:

                        e = this._trimAlignValue(d - (this._valueMax() - this._valueMin()) / this.numPages);

                        break;

                    case a.ui.keyCode.UP:

                    case a.ui.keyCode.RIGHT:

                        if (d === this._valueMax()) return;

                        e = this._trimAlignValue(d + f);

                        break;

                    case a.ui.keyCode.DOWN:

                    case a.ui.keyCode.LEFT:

                        if (d === this._valueMin()) return;

                        e = this._trimAlignValue(d - f)

                }

                this._slide(b, g, e)

            },

            keyup: function(b) {

                var c = a(b.target).data("ui-slider-handle-index");

                this._keySliding && (this._keySliding = !1, this._stop(b, c), this._change(b, c), a(b.target).removeClass("ui-state-active"))

            }

        }

    })

}),

function(a) {

    "use strict";

    a.fn.meanmenu = function(b) {

        var c = {

            meanMenuTarget: jQuery(this),

            meanMenuContainer: ".mobile-menu-area .container",

            meanMenuClose: "X",

            meanMenuCloseSize: "18px",

            meanMenuOpen: "<span /><span /><span />",

            meanRevealPosition: "right",

            meanRevealPositionDistance: "0",

            meanRevealColour: "",

            meanScreenWidth: "991",

            meanNavPush: "",

            meanShowChildren: !0,

            meanExpandableChildren: !0,

            meanExpand: "+",

            meanContract: "-",

            meanRemoveAttrs: !1,

            onePage: !1,

            meanDisplay: "block",

            removeElements: ""

        };

        b = a.extend(c, b);

        var d = window.innerWidth || document.documentElement.clientWidth;

        return this.each(function() {

            var a = b.meanMenuTarget,

                c = b.meanMenuContainer,

                e = b.meanMenuClose,

                f = b.meanMenuCloseSize,

                g = b.meanMenuOpen,

                h = b.meanRevealPosition,

                i = b.meanRevealPositionDistance,

                j = b.meanRevealColour,

                k = b.meanScreenWidth,

                l = b.meanNavPush,

                m = ".meanmenu-reveal",

                n = b.meanShowChildren,

                o = b.meanExpandableChildren,

                p = b.meanExpand,

                q = b.meanContract,

                r = b.meanRemoveAttrs,

                s = b.onePage,

                t = b.meanDisplay,

                u = b.removeElements,

                v = !1;

            (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/Blackberry/i) || navigator.userAgent.match(/Windows Phone/i)) && (v = !0), (navigator.userAgent.match(/MSIE 8/i) || navigator.userAgent.match(/MSIE 7/i)) && jQuery("html").css("overflow-y", "scroll");

            var w = "",

                x = function() {

                    if ("center" === h) {

                        var a = window.innerWidth || document.documentElement.clientWidth,

                            b = a / 2 - 22 + "px";

                        w = "left:" + b + ";right:auto;", v ? jQuery(".meanmenu-reveal").animate({

                            left: b

                        }) : jQuery(".meanmenu-reveal").css("left", b)

                    }

                },

                y = !1,

                z = !1;

            "right" === h && (w = "right:" + i + ";left:auto;"), "left" === h && (w = "left:" + i + ";right:auto;"), x();

            var A = "",

                B = function() {

                    jQuery(A).is(".meanmenu-reveal.meanclose") ? A.html(e) : A.html(g)

                },

                C = function() {

                    jQuery(".mean-bar,.mean-push").remove(), jQuery(c).removeClass("mean-container"), jQuery(a).css("display", t), y = !1, z = !1, jQuery(u).removeClass("mean-remove")

                },

                D = function() {

                    var b = "background:" + j + ";color:" + j + ";" + w;

                    if (k >= d) {

                        jQuery(u).addClass("mean-remove"), z = !0, jQuery(c).addClass("mean-container"), jQuery(".mean-container").prepend('<div class="mean-bar"><a href="#nav" class="meanmenu-reveal" style="' + b + '">Show Navigation</a><nav class="mean-nav"></nav></div>');

                        var e = jQuery(a).html();

                        jQuery(".mean-nav").html(e), r && jQuery("nav.mean-nav ul, nav.mean-nav ul *").each(function() {

                            jQuery(this).is(".mean-remove") ? jQuery(this).attr("class", "mean-remove") : jQuery(this).removeAttr("class"), jQuery(this).removeAttr("id")

                        }), jQuery(a).before('<div class="mean-push" />'), jQuery(".mean-push").css("margin-top", l), jQuery(a).hide(), jQuery(".meanmenu-reveal").show(), jQuery(m).html(g), A = jQuery(m), jQuery(".mean-nav ul").hide(), n ? o ? (jQuery(".mean-nav ul ul").each(function() {

                            jQuery(this).children().length && jQuery(this, "li:first").parent().append('<a class="mean-expand" href="#" style="font-size: ' + f + '">' + p + "</a>")

                        }), jQuery(".mean-expand").on("click", function(a) {

                            a.preventDefault(), jQuery(this).hasClass("mean-clicked") ? (jQuery(this).text(p), jQuery(this).prev("ul").slideUp(300, function() {})) : (jQuery(this).text(q), jQuery(this).prev("ul").slideDown(300, function() {})), jQuery(this).toggleClass("mean-clicked")

                        })) : jQuery(".mean-nav ul ul").show() : jQuery(".mean-nav ul ul").hide(), jQuery(".mean-nav ul li").last().addClass("mean-last"), A.removeClass("meanclose"), jQuery(A).click(function(a) {

                            a.preventDefault(), y === !1 ? (A.css("text-align", "center"), A.css("text-indent", "0"), A.css("font-size", f), jQuery(".mean-nav ul:first").slideDown(), y = !0) : (jQuery(".mean-nav ul:first").slideUp(), y = !1), A.toggleClass("meanclose"), B(), jQuery(u).addClass("mean-remove")

                        }), s && jQuery(".mean-nav ul > li > a:first-child").on("click", function() {

                            jQuery(".mean-nav ul:first").slideUp(), y = !1, jQuery(A).toggleClass("meanclose").html(g)

                        })

                    } else C()

                };

            v || jQuery(window).resize(function() {

                d = window.innerWidth || document.documentElement.clientWidth, C(), k >= d ? (D(), x()) : C()

            }), jQuery(window).resize(function() {

                d = window.innerWidth || document.documentElement.clientWidth, v ? (x(), k >= d ? z === !1 && D() : C()) : (C(), k >= d && (D(), x()))

            }), D()

        })

    }

}(jQuery), "function" != typeof Object.create && (Object.create = function(a) {

        function b() {}

        return b.prototype = a, new b

    }),

    function(a, b, c) {

        var d = {

            init: function(b, c) {

                this.$elem = a(c), this.options = a.extend({}, a.fn.owlCarousel.options, this.$elem.data(), b), this.userOptions = b, this.loadContent()

            },

            loadContent: function() {

                function b(a) {

                    var b, c = "";

                    if ("function" == typeof d.options.jsonSuccess) d.options.jsonSuccess.apply(this, [a]);

                    else {

                        for (b in a.owl) a.owl.hasOwnProperty(b) && (c += a.owl[b].item);

                        d.$elem.html(c)

                    }

                    d.logIn()

                }

                var c, d = this;

                "function" == typeof d.options.beforeInit && d.options.beforeInit.apply(this, [d.$elem]), "string" == typeof d.options.jsonPath ? (c = d.options.jsonPath, a.getJSON(c, b)) : d.logIn()

            },

            logIn: function() {

                this.$elem.data("owl-originalStyles", this.$elem.attr("style")), this.$elem.data("owl-originalClasses", this.$elem.attr("class")),

                    this.$elem.css({

                        opacity: 0

                    }), this.orignalItems = this.options.items, this.checkBrowser(), this.wrapperWidth = 0, this.checkVisible = null, this.setVars()

            },

            setVars: function() {

                return 0 !== this.$elem.children().length && (this.baseClass(), this.eventTypes(), this.$userItems = this.$elem.children(), this.itemsAmount = this.$userItems.length, this.wrapItems(), this.$owlItems = this.$elem.find(".owl-item"), this.$owlWrapper = this.$elem.find(".owl-wrapper"), this.playDirection = "next", this.prevItem = 0, this.prevArr = [0], this.currentItem = 0, this.customEvents(), void this.onStartup())

            },

            onStartup: function() {

                this.updateItems(), this.calculateAll(), this.buildControls(), this.updateControls(), this.response(), this.moveEvents(), this.stopOnHover(), this.owlStatus(), !1 !== this.options.transitionStyle && this.transitionTypes(this.options.transitionStyle), !0 === this.options.autoPlay && (this.options.autoPlay = 5e3), this.play(), this.$elem.find(".owl-wrapper").css("display", "block"), this.$elem.is(":visible") ? this.$elem.css("opacity", 1) : this.watchVisibility(), this.onstartup = !1, this.eachMoveUpdate(), "function" == typeof this.options.afterInit && this.options.afterInit.apply(this, [this.$elem])

            },

            eachMoveUpdate: function() {

                !0 === this.options.lazyLoad && this.lazyLoad(), !0 === this.options.autoHeight && this.autoHeight(), this.onVisibleItems(), "function" == typeof this.options.afterAction && this.options.afterAction.apply(this, [this.$elem])

            },

            updateVars: function() {

                "function" == typeof this.options.beforeUpdate && this.options.beforeUpdate.apply(this, [this.$elem]), this.watchVisibility(), this.updateItems(), this.calculateAll(), this.updatePosition(), this.updateControls(), this.eachMoveUpdate(), "function" == typeof this.options.afterUpdate && this.options.afterUpdate.apply(this, [this.$elem])

            },

            reload: function() {

                var a = this;

                b.setTimeout(function() {

                    a.updateVars()

                }, 0)

            },

            watchVisibility: function() {

                var a = this;

                return !1 === a.$elem.is(":visible") && (a.$elem.css({

                    opacity: 0

                }), b.clearInterval(a.autoPlayInterval), b.clearInterval(a.checkVisible), void(a.checkVisible = b.setInterval(function() {

                    a.$elem.is(":visible") && (a.reload(), a.$elem.animate({

                        opacity: 1

                    }, 200), b.clearInterval(a.checkVisible))

                }, 500)))

            },

            wrapItems: function() {

                this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>'), this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'), this.wrapperOuter = this.$elem.find(".owl-wrapper-outer"), this.$elem.css("display", "block")

            },

            baseClass: function() {

                var a = this.$elem.hasClass(this.options.baseClass),

                    b = this.$elem.hasClass(this.options.theme);

                a || this.$elem.addClass(this.options.baseClass), b || this.$elem.addClass(this.options.theme)

            },

            updateItems: function() {

                var b, c;

                if (!1 === this.options.responsive) return !1;

                if (!0 === this.options.singleItem) return this.options.items = this.orignalItems = 1, this.options.itemsCustom = !1, this.options.itemsDesktop = !1, this.options.itemsDesktopSmall = !1, this.options.itemsTablet = !1, this.options.itemsTabletSmall = !1, this.options.itemsMobile = !1;

                if (b = a(this.options.responsiveBaseWidth).width(), b > (this.options.itemsDesktop[0] || this.orignalItems) && (this.options.items = this.orignalItems), !1 !== this.options.itemsCustom)

                    for (this.options.itemsCustom.sort(function(a, b) {

                            return a[0] - b[0]

                        }), c = 0; c < this.options.itemsCustom.length; c += 1) this.options.itemsCustom[c][0] <= b && (this.options.items = this.options.itemsCustom[c][1]);

                else b <= this.options.itemsDesktop[0] && !1 !== this.options.itemsDesktop && (this.options.items = this.options.itemsDesktop[1]), b <= this.options.itemsDesktopSmall[0] && !1 !== this.options.itemsDesktopSmall && (this.options.items = this.options.itemsDesktopSmall[1]), b <= this.options.itemsTablet[0] && !1 !== this.options.itemsTablet && (this.options.items = this.options.itemsTablet[1]), b <= this.options.itemsTabletSmall[0] && !1 !== this.options.itemsTabletSmall && (this.options.items = this.options.itemsTabletSmall[1]), b <= this.options.itemsMobile[0] && !1 !== this.options.itemsMobile && (this.options.items = this.options.itemsMobile[1]);

                this.options.items > this.itemsAmount && !0 === this.options.itemsScaleUp && (this.options.items = this.itemsAmount)

            },

            response: function() {

                var c, d, e = this;

                return !0 === e.options.responsive && (d = a(b).width(), e.resizer = function() {

                    a(b).width() !== d && (!1 !== e.options.autoPlay && b.clearInterval(e.autoPlayInterval), b.clearTimeout(c), c = b.setTimeout(function() {

                        d = a(b).width(), e.updateVars()

                    }, e.options.responsiveRefreshRate))

                }, void a(b).resize(e.resizer))

            },

            updatePosition: function() {

                this.jumpTo(this.currentItem), !1 !== this.options.autoPlay && this.checkAp()

            },

            appendItemsSizes: function() {

                var b = this,

                    c = 0,

                    d = b.itemsAmount - b.options.items;

                b.$owlItems.each(function(e) {

                    var f = a(this);

                    f.css({

                        width: b.itemWidth

                    }).data("owl-item", Number(e)), (0 === e % b.options.items || e === d) && (e > d || (c += 1)), f.data("owl-roundPages", c)

                })

            },

            appendWrapperSizes: function() {

                this.$owlWrapper.css({

                    width: this.$owlItems.length * this.itemWidth * 2,

                    left: 0

                }), this.appendItemsSizes()

            },

            calculateAll: function() {

                this.calculateWidth(), this.appendWrapperSizes(), this.loops(), this.max()

            },

            calculateWidth: function() {

                this.itemWidth = Math.round(this.$elem.width() / this.options.items)

            },

            max: function() {

                var a = -1 * (this.itemsAmount * this.itemWidth - this.options.items * this.itemWidth);

                return this.options.items > this.itemsAmount ? this.maximumPixels = a = this.maximumItem = 0 : (this.maximumItem = this.itemsAmount - this.options.items, this.maximumPixels = a), a

            },

            min: function() {

                return 0

            },

            loops: function() {

                var b, c, d = 0,

                    e = 0;

                for (this.positionsInArray = [0], this.pagesInArray = [], b = 0; b < this.itemsAmount; b += 1) e += this.itemWidth, this.positionsInArray.push(-e), !0 === this.options.scrollPerPage && (c = a(this.$owlItems[b]), c = c.data("owl-roundPages"), c !== d && (this.pagesInArray[d] = this.positionsInArray[b], d = c))

            },

            buildControls: function() {

                (!0 === this.options.navigation || !0 === this.options.pagination) && (this.owlControls = a('<div class="owl-controls"/>').toggleClass("clickable", !this.browser.isTouch).appendTo(this.$elem)), !0 === this.options.pagination && this.buildPagination(), !0 === this.options.navigation && this.buildButtons()

            },

            buildButtons: function() {

                var b = this,

                    c = a('<div class="owl-buttons"/>');

                b.owlControls.append(c), b.buttonPrev = a("<div/>", {

                    class: "owl-prev",

                    html: b.options.navigationText[0] || ""

                }), b.buttonNext = a("<div/>", {

                    class: "owl-next",

                    html: b.options.navigationText[1] || ""

                }), c.append(b.buttonPrev).append(b.buttonNext), c.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(a) {

                    a.preventDefault()

                }), c.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(c) {

                    c.preventDefault(), a(this).hasClass("owl-next") ? b.next() : b.prev()

                })

            },

            buildPagination: function() {

                var b = this;

                b.paginationWrapper = a('<div class="owl-pagination"/>'), b.owlControls.append(b.paginationWrapper), b.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(c) {

                    c.preventDefault(), Number(a(this).data("owl-page")) !== b.currentItem && b.goTo(Number(a(this).data("owl-page")), !0)

                })

            },

            updatePagination: function() {

                var b, c, d, e, f, g;

                if (!1 === this.options.pagination) return !1;

                for (this.paginationWrapper.html(""), b = 0, c = this.itemsAmount - this.itemsAmount % this.options.items, e = 0; e < this.itemsAmount; e += 1) 0 === e % this.options.items && (b += 1, c === e && (d = this.itemsAmount - this.options.items), f = a("<div/>", {

                    class: "owl-page"

                }), g = a("<span></span>", {

                    text: !0 === this.options.paginationNumbers ? b : "",

                    class: !0 === this.options.paginationNumbers ? "owl-numbers" : ""

                }), f.append(g), f.data("owl-page", c === e ? d : e), f.data("owl-roundPages", b), this.paginationWrapper.append(f));

                this.checkPagination()

            },

            checkPagination: function() {

                var b = this;

                return !1 !== b.options.pagination && void b.paginationWrapper.find(".owl-page").each(function() {

                    a(this).data("owl-roundPages") === a(b.$owlItems[b.currentItem]).data("owl-roundPages") && (b.paginationWrapper.find(".owl-page").removeClass("active"), a(this).addClass("active"))

                })

            },

            checkNavigation: function() {

                return !1 !== this.options.navigation && void(!1 === this.options.rewindNav && (0 === this.currentItem && 0 === this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.addClass("disabled")) : 0 === this.currentItem && 0 !== this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.removeClass("disabled")) : this.currentItem === this.maximumItem ? (this.buttonPrev.removeClass("disabled"), this.buttonNext.addClass("disabled")) : 0 !== this.currentItem && this.currentItem !== this.maximumItem && (this.buttonPrev.removeClass("disabled"), this.buttonNext.removeClass("disabled"))))

            },

            updateControls: function() {

                this.updatePagination(), this.checkNavigation(), this.owlControls && (this.options.items >= this.itemsAmount ? this.owlControls.hide() : this.owlControls.show())

            },

            destroyControls: function() {

                this.owlControls && this.owlControls.remove()

            },

            next: function(a) {

                if (this.isTransition) return !1;

                if (this.currentItem += !0 === this.options.scrollPerPage ? this.options.items : 1, this.currentItem > this.maximumItem + (!0 === this.options.scrollPerPage ? this.options.items - 1 : 0)) {

                    if (!0 !== this.options.rewindNav) return this.currentItem = this.maximumItem, !1;

                    this.currentItem = 0, a = "rewind"

                }

                this.goTo(this.currentItem, a)

            },

            prev: function(a) {

                if (this.isTransition) return !1;

                if (this.currentItem = !0 === this.options.scrollPerPage && 0 < this.currentItem && this.currentItem < this.options.items ? 0 : this.currentItem - (!0 === this.options.scrollPerPage ? this.options.items : 1), 0 > this.currentItem) {

                    if (!0 !== this.options.rewindNav) return this.currentItem = 0, !1;

                    this.currentItem = this.maximumItem, a = "rewind"

                }

                this.goTo(this.currentItem, a)

            },

            goTo: function(a, c, d) {

                var e = this;

                return !e.isTransition && ("function" == typeof e.options.beforeMove && e.options.beforeMove.apply(this, [e.$elem]), a >= e.maximumItem ? a = e.maximumItem : 0 >= a && (a = 0), e.currentItem = e.owl.currentItem = a, !1 !== e.options.transitionStyle && "drag" !== d && 1 === e.options.items && !0 === e.browser.support3d ? (e.swapSpeed(0), !0 === e.browser.support3d ? e.transition3d(e.positionsInArray[a]) : e.css2slide(e.positionsInArray[a], 1), e.afterGo(), e.singleItemTransition(), !1) : (a = e.positionsInArray[a], !0 === e.browser.support3d ? (e.isCss3Finish = !1, !0 === c ? (e.swapSpeed("paginationSpeed"), b.setTimeout(function() {

                    e.isCss3Finish = !0

                }, e.options.paginationSpeed)) : "rewind" === c ? (e.swapSpeed(e.options.rewindSpeed), b.setTimeout(function() {

                    e.isCss3Finish = !0

                }, e.options.rewindSpeed)) : (e.swapSpeed("slideSpeed"), b.setTimeout(function() {

                    e.isCss3Finish = !0

                }, e.options.slideSpeed)), e.transition3d(a)) : !0 === c ? e.css2slide(a, e.options.paginationSpeed) : "rewind" === c ? e.css2slide(a, e.options.rewindSpeed) : e.css2slide(a, e.options.slideSpeed), void e.afterGo()))

            },

            jumpTo: function(a) {

                "function" == typeof this.options.beforeMove && this.options.beforeMove.apply(this, [this.$elem]), a >= this.maximumItem || -1 === a ? a = this.maximumItem : 0 >= a && (a = 0), this.swapSpeed(0), !0 === this.browser.support3d ? this.transition3d(this.positionsInArray[a]) : this.css2slide(this.positionsInArray[a], 1), this.currentItem = this.owl.currentItem = a, this.afterGo()

            },

            afterGo: function() {

                this.prevArr.push(this.currentItem), this.prevItem = this.owl.prevItem = this.prevArr[this.prevArr.length - 2], this.prevArr.shift(0), this.prevItem !== this.currentItem && (this.checkPagination(), this.checkNavigation(), this.eachMoveUpdate(), !1 !== this.options.autoPlay && this.checkAp()), "function" == typeof this.options.afterMove && this.prevItem !== this.currentItem && this.options.afterMove.apply(this, [this.$elem])

            },

            stop: function() {

                this.apStatus = "stop", b.clearInterval(this.autoPlayInterval)

            },

            checkAp: function() {

                "stop" !== this.apStatus && this.play()

            },

            play: function() {

                var a = this;

                return a.apStatus = "play", !1 !== a.options.autoPlay && (b.clearInterval(a.autoPlayInterval), void(a.autoPlayInterval = b.setInterval(function() {

                    a.next(!0)

                }, a.options.autoPlay)))

            },

            swapSpeed: function(a) {

                "slideSpeed" === a ? this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)) : "paginationSpeed" === a ? this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)) : "string" != typeof a && this.$owlWrapper.css(this.addCssSpeed(a))

            },

            addCssSpeed: function(a) {

                return {

                    "-webkit-transition": "all " + a + "ms ease",

                    "-moz-transition": "all " + a + "ms ease",

                    "-o-transition": "all " + a + "ms ease",

                    transition: "all " + a + "ms ease"

                }

            },

            removeTransition: function() {

                return {

                    "-webkit-transition": "",

                    "-moz-transition": "",

                    "-o-transition": "",

                    transition: ""

                }

            },

            doTranslate: function(a) {

                return {

                    "-webkit-transform": "translate3d(" + a + "px, 0px, 0px)",

                    "-moz-transform": "translate3d(" + a + "px, 0px, 0px)",

                    "-o-transform": "translate3d(" + a + "px, 0px, 0px)",

                    "-ms-transform": "translate3d(" + a + "px, 0px, 0px)",

                    transform: "translate3d(" + a + "px, 0px,0px)"

                }

            },

            transition3d: function(a) {

                this.$owlWrapper.css(this.doTranslate(a))

            },

            css2move: function(a) {

                this.$owlWrapper.css({

                    left: a

                })

            },

            css2slide: function(a, b) {

                var c = this;

                c.isCssFinish = !1, c.$owlWrapper.stop(!0, !0).animate({

                    left: a

                }, {

                    duration: b || c.options.slideSpeed,

                    complete: function() {

                        c.isCssFinish = !0

                    }

                })

            },

            checkBrowser: function() {

                var a = c.createElement("div");

                a.style.cssText = "  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)", a = a.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g), this.browser = {

                    support3d: null !== a && 1 === a.length,

                    isTouch: "ontouchstart" in b || b.navigator.msMaxTouchPoints

                }

            },

            moveEvents: function() {

                (!1 !== this.options.mouseDrag || !1 !== this.options.touchDrag) && (this.gestures(), this.disabledEvents())

            },

            eventTypes: function() {

                var a = ["s", "e", "x"];

                this.ev_types = {}, !0 === this.options.mouseDrag && !0 === this.options.touchDrag ? a = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] : !1 === this.options.mouseDrag && !0 === this.options.touchDrag ? a = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : !0 === this.options.mouseDrag && !1 === this.options.touchDrag && (a = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]), this.ev_types.start = a[0], this.ev_types.move = a[1], this.ev_types.end = a[2]

            },

            disabledEvents: function() {

                this.$elem.on("dragstart.owl", function(a) {

                    a.preventDefault()

                }), this.$elem.on("mousedown.disableTextSelect", function(b) {

                    return a(b.target).is("input, textarea, select, option")

                })

            },

            gestures: function() {

                function d(a) {

                    if (void 0 !== a.touches) return {

                        x: a.touches[0].pageX,

                        y: a.touches[0].pageY

                    };

                    if (void 0 === a.touches) {

                        if (void 0 !== a.pageX) return {

                            x: a.pageX,

                            y: a.pageY

                        };

                        if (void 0 === a.pageX) return {

                            x: a.clientX,

                            y: a.clientY

                        }

                    }

                }



                function e(b) {

                    "on" === b ? (a(c).on(h.ev_types.move, f), a(c).on(h.ev_types.end, g)) : "off" === b && (a(c).off(h.ev_types.move), a(c).off(h.ev_types.end))

                }



                function f(e) {

                    e = e.originalEvent || e || b.event, h.newPosX = d(e).x - i.offsetX, h.newPosY = d(e).y - i.offsetY, h.newRelativeX = h.newPosX - i.relativePos, "function" == typeof h.options.startDragging && !0 !== i.dragging && 0 !== h.newRelativeX && (i.dragging = !0, h.options.startDragging.apply(h, [h.$elem])), (8 < h.newRelativeX || -8 > h.newRelativeX) && !0 === h.browser.isTouch && (void 0 !== e.preventDefault ? e.preventDefault() : e.returnValue = !1, i.sliding = !0), (10 < h.newPosY || -10 > h.newPosY) && !1 === i.sliding && a(c).off("touchmove.owl"), h.newPosX = Math.max(Math.min(h.newPosX, h.newRelativeX / 5), h.maximumPixels + h.newRelativeX / 5), !0 === h.browser.support3d ? h.transition3d(h.newPosX) : h.css2move(h.newPosX)

                }



                function g(c) {

                    c = c.originalEvent || c || b.event;

                    var d;

                    c.target = c.target || c.srcElement, i.dragging = !1, !0 !== h.browser.isTouch && h.$owlWrapper.removeClass("grabbing"), h.dragDirection = 0 > h.newRelativeX ? h.owl.dragDirection = "left" : h.owl.dragDirection = "right", 0 !== h.newRelativeX && (d = h.getNewPosition(), h.goTo(d, !1, "drag"), i.targetElement === c.target && !0 !== h.browser.isTouch && (a(c.target).on("click.disable", function(b) {

                        b.stopImmediatePropagation(), b.stopPropagation(), b.preventDefault(), a(b.target).off("click.disable")

                    }), c = a._data(c.target, "events").click, d = c.pop(), c.splice(0, 0, d))), e("off")

                }

                var h = this,

                    i = {

                        offsetX: 0,

                        offsetY: 0,

                        baseElWidth: 0,

                        relativePos: 0,

                        position: null,

                        minSwipe: null,

                        maxSwipe: null,

                        sliding: null,

                        dargging: null,

                        targetElement: null

                    };

                h.isCssFinish = !0, h.$elem.on(h.ev_types.start, ".owl-wrapper", function(c) {

                    c = c.originalEvent || c || b.event;

                    var f;

                    if (3 === c.which) return !1;

                    if (!(h.itemsAmount <= h.options.items)) {

                        if (!1 === h.isCssFinish && !h.options.dragBeforeAnimFinish || !1 === h.isCss3Finish && !h.options.dragBeforeAnimFinish) return !1;

                        !1 !== h.options.autoPlay && b.clearInterval(h.autoPlayInterval), !0 === h.browser.isTouch || h.$owlWrapper.hasClass("grabbing") || h.$owlWrapper.addClass("grabbing"), h.newPosX = 0, h.newRelativeX = 0, a(this).css(h.removeTransition()), f = a(this).position(), i.relativePos = f.left, i.offsetX = d(c).x - f.left, i.offsetY = d(c).y - f.top, e("on"), i.sliding = !1, i.targetElement = c.target || c.srcElement

                    }

                })

            },

            getNewPosition: function() {

                var a = this.closestItem();

                return a > this.maximumItem ? a = this.currentItem = this.maximumItem : 0 <= this.newPosX && (this.currentItem = a = 0), a

            },

            closestItem: function() {

                var b = this,

                    c = !0 === b.options.scrollPerPage ? b.pagesInArray : b.positionsInArray,

                    d = b.newPosX,

                    e = null;

                return a.each(c, function(f, g) {

                    d - b.itemWidth / 20 > c[f + 1] && d - b.itemWidth / 20 < g && "left" === b.moveDirection() ? (e = g, b.currentItem = !0 === b.options.scrollPerPage ? a.inArray(e, b.positionsInArray) : f) : d + b.itemWidth / 20 < g && d + b.itemWidth / 20 > (c[f + 1] || c[f] - b.itemWidth) && "right" === b.moveDirection() && (!0 === b.options.scrollPerPage ? (e = c[f + 1] || c[c.length - 1], b.currentItem = a.inArray(e, b.positionsInArray)) : (e = c[f + 1], b.currentItem = f + 1))

                }), b.currentItem

            },

            moveDirection: function() {

                var a;

                return 0 > this.newRelativeX ? (a = "right", this.playDirection = "next") : (a = "left", this.playDirection = "prev"), a

            },

            customEvents: function() {

                var a = this;

                a.$elem.on("owl.next", function() {

                    a.next()

                }), a.$elem.on("owl.prev", function() {

                    a.prev()

                }), a.$elem.on("owl.play", function(b, c) {

                    a.options.autoPlay = c, a.play(), a.hoverStatus = "play"

                }), a.$elem.on("owl.stop", function() {

                    a.stop(), a.hoverStatus = "stop"

                }), a.$elem.on("owl.goTo", function(b, c) {

                    a.goTo(c)

                }), a.$elem.on("owl.jumpTo", function(b, c) {

                    a.jumpTo(c)

                })

            },

            stopOnHover: function() {

                var a = this;

                !0 === a.options.stopOnHover && !0 !== a.browser.isTouch && !1 !== a.options.autoPlay && (a.$elem.on("mouseover", function() {

                    a.stop()

                }), a.$elem.on("mouseout", function() {

                    "stop" !== a.hoverStatus && a.play()

                }))

            },

            lazyLoad: function() {

                var b, c, d, e, f;

                if (!1 === this.options.lazyLoad) return !1;

                for (b = 0; b < this.itemsAmount; b += 1) c = a(this.$owlItems[b]), "loaded" !== c.data("owl-loaded") && (d = c.data("owl-item"), e = c.find(".lazyOwl"), "string" != typeof e.data("src") ? c.data("owl-loaded", "loaded") : (void 0 === c.data("owl-loaded") && (e.hide(), c.addClass("loading").data("owl-loaded", "checked")), (f = !0 !== this.options.lazyFollow || d >= this.currentItem) && d < this.currentItem + this.options.items && e.length && this.lazyPreload(c, e)))

            },

            lazyPreload: function(a, c) {

                function d() {

                    a.data("owl-loaded", "loaded").removeClass("loading"), c.removeAttr("data-src"), "fade" === g.options.lazyEffect ? c.fadeIn(400) : c.show(), "function" == typeof g.options.afterLazyLoad && g.options.afterLazyLoad.apply(this, [g.$elem])

                }



                function e() {

                    h += 1, g.completeImg(c.get(0)) || !0 === f ? d() : 100 >= h ? b.setTimeout(e, 100) : d()

                }

                var f, g = this,

                    h = 0;

                "DIV" === c.prop("tagName") ? (c.css("background-image", "url(" + c.data("src") + ")"), f = !0) : c[0].src = c.data("src"), e()

            },

            autoHeight: function() {

                function c() {

                    var c = a(f.$owlItems[f.currentItem]).height();

                    f.wrapperOuter.css("height", c + "px"), f.wrapperOuter.hasClass("autoHeight") || b.setTimeout(function() {

                        f.wrapperOuter.addClass("autoHeight")

                    }, 0)

                }



                function d() {

                    e += 1, f.completeImg(g.get(0)) ? c() : 100 >= e ? b.setTimeout(d, 100) : f.wrapperOuter.css("height", "")

                }

                var e, f = this,

                    g = a(f.$owlItems[f.currentItem]).find("img");

                void 0 !== g.get(0) ? (e = 0, d()) : c()

            },

            completeImg: function(a) {

                return !(!a.complete || "undefined" != typeof a.naturalWidth && 0 === a.naturalWidth)

            },

            onVisibleItems: function() {

                var b;

                for (!0 === this.options.addClassActive && this.$owlItems.removeClass("active"), this.visibleItems = [], b = this.currentItem; b < this.currentItem + this.options.items; b += 1) this.visibleItems.push(b), !0 === this.options.addClassActive && a(this.$owlItems[b]).addClass("active");

                this.owl.visibleItems = this.visibleItems

            },

            transitionTypes: function(a) {

                this.outClass = "owl-" + a + "-out", this.inClass = "owl-" + a + "-in"

            },

            singleItemTransition: function() {

                var a = this,

                    b = a.outClass,

                    c = a.inClass,

                    d = a.$owlItems.eq(a.currentItem),

                    e = a.$owlItems.eq(a.prevItem),

                    f = Math.abs(a.positionsInArray[a.currentItem]) + a.positionsInArray[a.prevItem],

                    g = Math.abs(a.positionsInArray[a.currentItem]) + a.itemWidth / 2;

                a.isTransition = !0, a.$owlWrapper.addClass("owl-origin").css({

                    "-webkit-transform-origin": g + "px",

                    "-moz-perspective-origin": g + "px",

                    "perspective-origin": g + "px"

                }), e.css({

                    position: "relative",

                    left: f + "px"

                }).addClass(b).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function() {

                    a.endPrev = !0, e.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"), a.clearTransStyle(e, b)

                }), d.addClass(c).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function() {

                    a.endCurrent = !0, d.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend"), a.clearTransStyle(d, c)

                })

            },

            clearTransStyle: function(a, b) {

                a.css({

                    position: "",

                    left: ""

                }).removeClass(b), this.endPrev && this.endCurrent && (this.$owlWrapper.removeClass("owl-origin"), this.isTransition = this.endCurrent = this.endPrev = !1)

            },

            owlStatus: function() {

                this.owl = {

                    userOptions: this.userOptions,

                    baseElement: this.$elem,

                    userItems: this.$userItems,

                    owlItems: this.$owlItems,

                    currentItem: this.currentItem,

                    prevItem: this.prevItem,

                    visibleItems: this.visibleItems,

                    isTouch: this.browser.isTouch,

                    browser: this.browser,

                    dragDirection: this.dragDirection

                }

            },

            clearEvents: function() {

                this.$elem.off(".owl owl mousedown.disableTextSelect"), a(c).off(".owl owl"), a(b).off("resize", this.resizer)

            },

            unWrap: function() {

                0 !== this.$elem.children().length && (this.$owlWrapper.unwrap(), this.$userItems.unwrap().unwrap(), this.owlControls && this.owlControls.remove()), this.clearEvents(), this.$elem.attr("style", this.$elem.data("owl-originalStyles") || "").attr("class", this.$elem.data("owl-originalClasses"))

            },

            destroy: function() {

                this.stop(), b.clearInterval(this.checkVisible), this.unWrap(), this.$elem.removeData()

            },

            reinit: function(b) {

                b = a.extend({}, this.userOptions, b), this.unWrap(), this.init(b, this.$elem)

            },

            addItem: function(a, b) {

                var c;

                return !!a && (0 === this.$elem.children().length ? (this.$elem.append(a), this.setVars(), !1) : (this.unWrap(), c = void 0 === b || -1 === b ? -1 : b, c >= this.$userItems.length || -1 === c ? this.$userItems.eq(-1).after(a) : this.$userItems.eq(c).before(a), void this.setVars()))

            },

            removeItem: function(a) {

                return 0 !== this.$elem.children().length && (a = void 0 === a || -1 === a ? -1 : a, this.unWrap(), this.$userItems.eq(a).remove(), void this.setVars())

            }

        };

        a.fn.owlCarousel = function(b) {

            return this.each(function() {

                if (!0 === a(this).data("owl-init")) return !1;

                a(this).data("owl-init", !0);

                var c = Object.create(d);

                c.init(b, this), a.data(this, "owlCarousel", c)

            })

        }, a.fn.owlCarousel.options = {

            items: 5,

            itemsCustom: !1,

            itemsDesktop: [1199, 4],

            itemsDesktopSmall: [979, 3],

            itemsTablet: [768, 2],

            itemsTabletSmall: !1,

            itemsMobile: [479, 1],

            singleItem: !1,

            itemsScaleUp: !1,

            slideSpeed: 200,

            paginationSpeed: 800,

            rewindSpeed: 1e3,

            autoPlay: !1,

            stopOnHover: !1,

            navigation: !1,

            navigationText: ["prev", "next"],

            rewindNav: !0,

            scrollPerPage: !1,

            pagination: !0,

            paginationNumbers: !1,

            responsive: !0,

            responsiveRefreshRate: 200,

            responsiveBaseWidth: b,

            baseClass: "owl-carousel",

            theme: "owl-theme",

            lazyLoad: !1,

            lazyFollow: !0,

            lazyEffect: "fade",

            autoHeight: !1,

            jsonPath: !1,

            jsonSuccess: !1,

            dragBeforeAnimFinish: !0,

            mouseDrag: !0,

            touchDrag: !0,

            addClassActive: !1,

            transitionStyle: !1,

            beforeUpdate: !1,

            afterUpdate: !1,

            beforeInit: !1,

            afterInit: !1,

            beforeMove: !1,

            afterMove: !1,

            afterAction: !1,

            startDragging: !1,

            afterLazyLoad: !1

        }

    }(jQuery, window, document),

    function() {

        for (var a, b = function() {}, c = ["assert", "clear", "count", "debug", "dir", "dirxml", "error", "exception", "group", "groupCollapsed", "groupEnd", "info", "log", "markTimeline", "profile", "profileEnd", "table", "time", "timeEnd", "timeline", "timelineEnd", "timeStamp", "trace", "warn"], d = c.length, e = window.console = window.console || {}; d--;) a = c[d], e[a] || (e[a] = b)

    }(), ! function(a, b, c) {

        "use strict";

        a.fn.scrollUp = function(b) {

            a.data(c.body, "scrollUp") || (a.data(c.body, "scrollUp", !0), a.fn.scrollUp.init(b))

        }, a.fn.scrollUp.init = function(d) {

            var e, f, g, h, i, j, k, l = a.fn.scrollUp.settings = a.extend({}, a.fn.scrollUp.defaults, d),

                m = !1;

            switch (k = l.scrollTrigger ? a(l.scrollTrigger) : a("<a/>", {

                id: l.scrollName,

                href: "#top"

            }), l.scrollTitle && k.attr("title", l.scrollTitle), k.appendTo("body"), l.scrollImg || l.scrollTrigger || k.html(l.scrollText), k.css({

                display: "none",

                position: "fixed",

                zIndex: l.zIndex

            }), l.activeOverlay && a("<div/>", {

                id: l.scrollName + "-active"

            }).css({

                position: "absolute",

                top: l.scrollDistance + "px",

                width: "100%",

                borderTop: "1px dotted" + l.activeOverlay,

                zIndex: l.zIndex

            }).appendTo("body"), l.animation) {

                case "fade":

                    e = "fadeIn", f = "fadeOut", g = l.animationSpeed;

                    break;

                case "slide":

                    e = "slideDown", f = "slideUp", g = l.animationSpeed;

                    break;

                default:

                    e = "show", f = "hide", g = 0

            }

            h = "top" === l.scrollFrom ? l.scrollDistance : a(c).height() - a(b).height() - l.scrollDistance, i = a(b).scroll(function() {

                a(b).scrollTop() > h ? m || (k[e](g), m = !0) : m && (k[f](g), m = !1)

            }), l.scrollTarget ? "number" == typeof l.scrollTarget ? j = l.scrollTarget : "string" == typeof l.scrollTarget && (j = Math.floor(a(l.scrollTarget).offset().top)) : j = 0, k.click(function(b) {

                b.preventDefault(), a("html, body").animate({

                    scrollTop: j

                }, l.scrollSpeed, l.easingType)

            })

        }, a.fn.scrollUp.defaults = {

            scrollName: "scrollUp",

            scrollDistance: 300,

            scrollFrom: "top",

            scrollSpeed: 300,

            easingType: "linear",

            animation: "fade",

            animationSpeed: 200,

            scrollTrigger: !1,

            scrollTarget: !1,

            scrollText: "Scroll to top",

            scrollTitle: !1,

            scrollImg: !1,

            activeOverlay: !1,

            zIndex: 2147483647

        }, a.fn.scrollUp.destroy = function(d) {

            a.removeData(c.body, "scrollUp"), a("#" + a.fn.scrollUp.settings.scrollName).remove(), a("#" + a.fn.scrollUp.settings.scrollName + "-active").remove(), a.fn.jquery.split(".")[1] >= 7 ? a(b).off("scroll", d) : a(b).unbind("scroll", d)

        }, a.scrollUp = a.fn.scrollUp

    }(jQuery, window, document),

    function() {

        var a, b, c, d, e, f = function(a, b) {

                return function() {

                    return a.apply(b, arguments)

                }

            },

            g = [].indexOf || function(a) {

                for (var b = 0, c = this.length; c > b; b++)

                    if (b in this && this[b] === a) return b;

                return -1

            };

        b = function() {

            function a() {}

            return a.prototype.extend = function(a, b) {

                var c, d;

                for (c in b) d = b[c], null == a[c] && (a[c] = d);

                return a

            }, a.prototype.isMobile = function(a) {

                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)

            }, a.prototype.createEvent = function(a, b, c, d) {

                var e;

                return null == b && (b = !1), null == c && (c = !1), null == d && (d = null), null != document.createEvent ? (e = document.createEvent("CustomEvent"), e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(), e.eventType = a) : e.eventName = a, e

            }, a.prototype.emitEvent = function(a, b) {

                return null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) ? a["on" + b]() : void 0

            }, a.prototype.addEvent = function(a, b, c) {

                return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c

            }, a.prototype.removeEvent = function(a, b, c) {

                return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b]

            }, a.prototype.innerHeight = function() {

                return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight

            }, a

        }(), c = this.WeakMap || this.MozWeakMap || (c = function() {

            function a() {

                this.keys = [], this.values = []

            }

            return a.prototype.get = function(a) {

                var b, c, d, e, f;

                for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)

                    if (c = f[b], c === a) return this.values[b]

            }, a.prototype.set = function(a, b) {

                var c, d, e, f, g;

                for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)

                    if (d = g[c], d === a) return void(this.values[c] = b);

                return this.keys.push(a), this.values.push(b)

            }, a

        }()), a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function() {

            function a() {

                "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.")

            }

            return a.notSupported = !0, a.prototype.observe = function() {}, a

        }()), d = this.getComputedStyle || function(a) {

            return this.getPropertyValue = function(b) {

                var c;

                return "float" === b && (b = "styleFloat"), e.test(b) && b.replace(e, function(a, b) {

                    return b.toUpperCase()

                }), (null != (c = a.currentStyle) ? c[b] : void 0) || null

            }, this

        }, e = /(\-([a-z]){1})/g, this.WOW = function() {

            function e(a) {

                null == a && (a = {}), this.scrollCallback = f(this.scrollCallback, this), this.scrollHandler = f(this.scrollHandler, this), this.resetAnimation = f(this.resetAnimation, this), this.start = f(this.start, this), this.scrolled = !0, this.config = this.util().extend(a, this.defaults), null != a.scrollContainer && (this.config.scrollContainer = document.querySelector(a.scrollContainer)), this.animationNameCache = new c, this.wowEvent = this.util().createEvent(this.config.boxClass)

            }

            return e.prototype.defaults = {

                    boxClass: "wow",

                    animateClass: "animated",

                    offset: 0,

                    mobile: !0,

                    live: !0,

                    callback: null,

                    scrollContainer: null

                }, e.prototype.init = function() {

                    var a;

                    return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []

                }, e.prototype.start = function() {

                    var b, c, d, e;

                    if (this.stopped = !1, this.boxes = function() {

                            var a, c, d, e;

                            for (d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);

                            return e

                        }.call(this), this.all = function() {

                            var a, c, d, e;

                            for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);

                            return e

                        }.call(this), this.boxes.length)

                        if (this.disabled()) this.resetStyle();

                        else

                            for (e = this.boxes, c = 0, d = e.length; d > c; c++) b = e[c], this.applyStyle(b, !0);

                    return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new a(function(a) {

                        return function(b) {

                            var c, d, e, f, g;

                            for (g = [], c = 0, d = b.length; d > c; c++) f = b[c], g.push(function() {

                                var a, b, c, d;

                                for (c = f.addedNodes || [], d = [], a = 0, b = c.length; b > a; a++) e = c[a], d.push(this.doSync(e));

                                return d

                            }.call(a));

                            return g

                        }

                    }(this)).observe(document.body, {

                        childList: !0,

                        subtree: !0

                    }) : void 0

                }, e.prototype.stop = function() {

                    return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0

                }, e.prototype.sync = function() {

                    return a.notSupported ? this.doSync(this.element) : void 0

                }, e.prototype.doSync = function(a) {

                    var b, c, d, e, f;

                    if (null == a && (a = this.element), 1 === a.nodeType) {

                        for (a = a.parentNode || a, e = a.querySelectorAll("." + this.config.boxClass), f = [], c = 0, d = e.length; d > c; c++) b = e[c], g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), f.push(this.scrolled = !0)) : f.push(void 0);

                        return f

                    }

                }, e.prototype.show = function(a) {

                    return this.applyStyle(a), a.className = a.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(a), this.util().emitEvent(a, this.wowEvent), this.util().addEvent(a, "animationend", this.resetAnimation), this.util().addEvent(a, "oanimationend", this.resetAnimation), this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation), a

                }, e.prototype.applyStyle = function(a, b) {

                    var c, d, e;

                    return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), e = a.getAttribute("data-wow-iteration"), this.animate(function(f) {

                        return function() {

                            return f.customStyle(a, b, d, c, e)

                        }

                    }(this))

                }, e.prototype.animate = function() {

                    return "requestAnimationFrame" in window ? function(a) {

                        return window.requestAnimationFrame(a)

                    } : function(a) {

                        return a()

                    }

                }(), e.prototype.resetStyle = function() {

                    var a, b, c, d, e;

                    for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(a.style.visibility = "visible");

                    return e

                }, e.prototype.resetAnimation = function(a) {

                    var b;

                    return a.type.toLowerCase().indexOf("animationend") >= 0 ? (b = a.target || a.srcElement, b.className = b.className.replace(this.config.animateClass, "").trim()) : void 0

                }, e.prototype.customStyle = function(a, b, c, d, e) {

                    return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, {

                        animationDuration: c

                    }), d && this.vendorSet(a.style, {

                        animationDelay: d

                    }), e && this.vendorSet(a.style, {

                        animationIterationCount: e

                    }), this.vendorSet(a.style, {

                        animationName: b ? "none" : this.cachedAnimationName(a)

                    }), a

                }, e.prototype.vendors = ["moz", "webkit"], e.prototype.vendorSet = function(a, b) {

                    var c, d, e, f;

                    d = [];

                    for (c in b) e = b[c], a["" + c] = e, d.push(function() {

                        var b, d, g, h;

                        for (g = this.vendors, h = [], b = 0, d = g.length; d > b; b++) f = g[b], h.push(a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = e);

                        return h

                    }.call(this));

                    return d

                },

                e.prototype.vendorCSS = function(a, b) {

                    var c, e, f, g, h, i;

                    for (h = d(a), g = h.getPropertyCSSValue(b), f = this.vendors, c = 0, e = f.length; e > c; c++) i = f[c], g = g || h.getPropertyCSSValue("-" + i + "-" + b);

                    return g

                }, e.prototype.animationName = function(a) {

                    var b;

                    try {

                        b = this.vendorCSS(a, "animation-name").cssText

                    } catch (c) {

                        b = d(a).getPropertyValue("animation-name")

                    }

                    return "none" === b ? "" : b

                }, e.prototype.cacheAnimationName = function(a) {

                    return this.animationNameCache.set(a, this.animationName(a))

                }, e.prototype.cachedAnimationName = function(a) {

                    return this.animationNameCache.get(a)

                }, e.prototype.scrollHandler = function() {

                    return this.scrolled = !0

                }, e.prototype.scrollCallback = function() {

                    var a;

                    return !this.scrolled || (this.scrolled = !1, this.boxes = function() {

                        var b, c, d, e;

                        for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));

                        return e

                    }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()

                }, e.prototype.offsetTop = function(a) {

                    for (var b; void 0 === a.offsetTop;) a = a.parentNode;

                    for (b = a.offsetTop; a = a.offsetParent;) b += a.offsetTop;

                    return b

                }, e.prototype.isVisible = function(a) {

                    var b, c, d, e, f;

                    return c = a.getAttribute("data-wow-offset") || this.config.offset, f = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, d = this.offsetTop(a), b = d + a.clientHeight, e >= d && b >= f

                }, e.prototype.util = function() {

                    return null != this._util ? this._util : this._util = new b

                }, e.prototype.disabled = function() {

                    return !this.config.mobile && this.util().isMobile(navigator.userAgent)

                }, e

        }()

    }.call(this),

    function(a) {

        var b = function(b, c) {

            var d = a.extend({}, a.fn.nivoSlider.defaults, c),

                e = {

                    currentSlide: 0,

                    currentImage: "",

                    totalSlides: 0,

                    running: !1,

                    paused: !1,

                    stop: !1,

                    controlNavEl: !1

                },

                f = a(b);

            f.data("nivo:vars", e).addClass("nivoSlider");

            var g = f.children();

            g.each(function() {

                var b = a(this),

                    c = "";

                b.is("img") || (b.is("a") && (b.addClass("nivo-imageLink"), c = b), b = b.find("img:first"));

                var d = 0 === d ? b.attr("width") : b.width(),

                    f = 0 === f ? b.attr("height") : b.height();

                "" !== c && c.css("display", "none"), b.css("display", "none"), e.totalSlides++

            }), d.randomStart && (d.startSlide = Math.floor(Math.random() * e.totalSlides)), d.startSlide > 0 && (d.startSlide >= e.totalSlides && (d.startSlide = e.totalSlides - 1), e.currentSlide = d.startSlide), a(g[e.currentSlide]).is("img") ? e.currentImage = a(g[e.currentSlide]) : e.currentImage = a(g[e.currentSlide]).find("img:first"), a(g[e.currentSlide]).is("a") && a(g[e.currentSlide]).css("display", "block");

            var h = a("<img/>").addClass("nivo-main-image");

            h.attr("src", e.currentImage.attr("src")).show(), f.append(h), a(window).resize(function() {

                f.children("img").width(f.width()), h.attr("src", e.currentImage.attr("src")), h.stop().height("auto"), a(".nivo-slice").remove(), a(".nivo-box").remove()

            }), f.append(a('<div class="nivo-caption"></div>'));

            var i = function(b) {

                var c = a(".nivo-caption", f);

                if ("" != e.currentImage.attr("title") && void 0 != e.currentImage.attr("title")) {

                    var d = e.currentImage.attr("title");

                    "#" == d.substr(0, 1) && (d = a(d).html()), "block" == c.css("display") ? setTimeout(function() {

                        c.html(d)

                    }, b.animSpeed) : (c.html(d), c.stop().fadeIn(b.animSpeed))

                } else c.stop().fadeOut(b.animSpeed)

            };

            i(d);

            var j = 0;

            if (!d.manualAdvance && g.length > 1 && (j = setInterval(function() {

                    o(f, g, d, !1)

                }, d.pauseTime)), d.directionNav && (f.append('<div class="nivo-directionNav"><a class="nivo-prevNav">' + d.prevText + '</a><a class="nivo-nextNav">' + d.nextText + "</a></div>"), a(f).on("click", "a.nivo-prevNav", function() {

                    return !e.running && (clearInterval(j), j = "", e.currentSlide -= 2, void o(f, g, d, "prev"))

                }), a(f).on("click", "a.nivo-nextNav", function() {

                    return !e.running && (clearInterval(j), j = "", void o(f, g, d, "next"))

                })), d.controlNav) {

                e.controlNavEl = a('<div class="nivo-controlNav"></div>'), f.after(e.controlNavEl);

                for (var k = 0; k < g.length; k++)

                    if (d.controlNavThumbs) {

                        e.controlNavEl.addClass("nivo-thumbs-enabled");

                        var l = g.eq(k);

                        l.is("img") || (l = l.find("img:first")), l.attr("data-thumb") && e.controlNavEl.append('<a class="nivo-control" rel="' + k + '"><img src="' + l.attr("data-thumb") + '" alt="" /></a>')

                    } else e.controlNavEl.append('<a class="nivo-control" rel="' + k + '">' + (k + 1) + "</a>");

                a("a:eq(" + e.currentSlide + ")", e.controlNavEl).addClass("active"), a("a", e.controlNavEl).bind("click", function() {

                    return !e.running && (!a(this).hasClass("active") && (clearInterval(j), j = "", h.attr("src", e.currentImage.attr("src")), e.currentSlide = a(this).attr("rel") - 1, void o(f, g, d, "control")))

                })

            }

            d.pauseOnHover && f.hover(function() {

                e.paused = !0, clearInterval(j), j = ""

            }, function() {

                e.paused = !1, "" !== j || d.manualAdvance || (j = setInterval(function() {

                    o(f, g, d, !1)

                }, d.pauseTime))

            }), f.bind("nivo:animFinished", function() {

                h.attr("src", e.currentImage.attr("src")), e.running = !1, a(g).each(function() {

                    a(this).is("a") && a(this).css("display", "none")

                }), a(g[e.currentSlide]).is("a") && a(g[e.currentSlide]).css("display", "block"), "" !== j || e.paused || d.manualAdvance || (j = setInterval(function() {

                    o(f, g, d, !1)

                }, d.pauseTime)), d.afterChange.call(this)

            });

            var m = function(b, c, d) {

                    a(d.currentImage).parent().is("a") && a(d.currentImage).parent().css("display", "block"), a('img[src="' + d.currentImage.attr("src") + '"]', b).not(".nivo-main-image,.nivo-control img").width(b.width()).css("visibility", "hidden").show();

                    for (var e = a('img[src="' + d.currentImage.attr("src") + '"]', b).not(".nivo-main-image,.nivo-control img").parent().is("a") ? a('img[src="' + d.currentImage.attr("src") + '"]', b).not(".nivo-main-image,.nivo-control img").parent().height() : a('img[src="' + d.currentImage.attr("src") + '"]', b).not(".nivo-main-image,.nivo-control img").height(), f = 0; f < c.slices; f++) {

                        var g = Math.round(b.width() / c.slices);

                        f === c.slices - 1 ? b.append(a('<div class="nivo-slice" name="' + f + '"><img src="' + d.currentImage.attr("src") + '" style="position:absolute; width:' + b.width() + "px; height:auto; display:block !important; top:0; left:-" + (g + f * g - g) + 'px;" /></div>').css({

                            left: g * f + "px",

                            width: b.width() - g * f + "px",

                            height: e + "px",

                            opacity: "0",

                            overflow: "hidden"

                        })) : b.append(a('<div class="nivo-slice" name="' + f + '"><img src="' + d.currentImage.attr("src") + '" style="position:absolute; width:' + b.width() + "px; height:auto; display:block !important; top:0; left:-" + (g + f * g - g) + 'px;" /></div>').css({

                            left: g * f + "px",

                            width: g + "px",

                            height: e + "px",

                            opacity: "0",

                            overflow: "hidden"

                        }))

                    }

                    a(".nivo-slice", b).height(e), h.stop().animate({

                        height: a(d.currentImage).height()

                    }, c.animSpeed)

                },

                n = function(b, c, d) {

                    a(d.currentImage).parent().is("a") && a(d.currentImage).parent().css("display", "block"), a('img[src="' + d.currentImage.attr("src") + '"]', b).not(".nivo-main-image,.nivo-control img").width(b.width()).css("visibility", "hidden").show();

                    for (var e = Math.round(b.width() / c.boxCols), f = Math.round(a('img[src="' + d.currentImage.attr("src") + '"]', b).not(".nivo-main-image,.nivo-control img").height() / c.boxRows), g = 0; g < c.boxRows; g++)

                        for (var i = 0; i < c.boxCols; i++) i === c.boxCols - 1 ? (b.append(a('<div class="nivo-box" name="' + i + '" rel="' + g + '"><img src="' + d.currentImage.attr("src") + '" style="position:absolute; width:' + b.width() + "px; height:auto; display:block; top:-" + f * g + "px; left:-" + e * i + 'px;" /></div>').css({

                            opacity: 0,

                            left: e * i + "px",

                            top: f * g + "px",

                            width: b.width() - e * i + "px"

                        })), a('.nivo-box[name="' + i + '"]', b).height(a('.nivo-box[name="' + i + '"] img', b).height() + "px")) : (b.append(a('<div class="nivo-box" name="' + i + '" rel="' + g + '"><img src="' + d.currentImage.attr("src") + '" style="position:absolute; width:' + b.width() + "px; height:auto; display:block; top:-" + f * g + "px; left:-" + e * i + 'px;" /></div>').css({

                            opacity: 0,

                            left: e * i + "px",

                            top: f * g + "px",

                            width: e + "px"

                        })), a('.nivo-box[name="' + i + '"]', b).height(a('.nivo-box[name="' + i + '"] img', b).height() + "px"));

                    h.stop().animate({

                        height: a(d.currentImage).height()

                    }, c.animSpeed)

                },

                o = function(b, c, d, e) {

                    var f = b.data("nivo:vars");

                    if (f && f.currentSlide === f.totalSlides - 1 && d.lastSlide.call(this), (!f || f.stop) && !e) return !1;

                    d.beforeChange.call(this), e ? ("prev" === e && h.attr("src", f.currentImage.attr("src")), "next" === e && h.attr("src", f.currentImage.attr("src"))) : h.attr("src", f.currentImage.attr("src")), f.currentSlide++, f.currentSlide === f.totalSlides && (f.currentSlide = 0, d.slideshowEnd.call(this)), f.currentSlide < 0 && (f.currentSlide = f.totalSlides - 1), a(c[f.currentSlide]).is("img") ? f.currentImage = a(c[f.currentSlide]) : f.currentImage = a(c[f.currentSlide]).find("img:first"), d.controlNav && (a("a", f.controlNavEl).removeClass("active"), a("a:eq(" + f.currentSlide + ")", f.controlNavEl).addClass("active")), i(d), a(".nivo-slice", b).remove(), a(".nivo-box", b).remove();

                    var g = d.effect,

                        j = "";

                    "random" === d.effect && (j = new Array("sliceDownRight", "sliceDownLeft", "sliceUpRight", "sliceUpLeft", "sliceUpDown", "sliceUpDownLeft", "fold", "fade", "boxRandom", "boxRain", "boxRainReverse", "boxRainGrow", "boxRainGrowReverse"), g = j[Math.floor(Math.random() * (j.length + 1))], void 0 === g && (g = "fade")), -1 !== d.effect.indexOf(",") && (j = d.effect.split(","), g = j[Math.floor(Math.random() * j.length)], void 0 === g && (g = "fade")), f.currentImage.attr("data-transition") && (g = f.currentImage.attr("data-transition")), f.running = !0;

                    var k = 0,

                        l = 0,

                        o = "",

                        q = "",

                        r = "",

                        s = "";

                    if ("sliceDown" === g || "sliceDownRight" === g || "sliceDownLeft" === g) m(b, d, f), k = 0, l = 0, o = a(".nivo-slice", b), "sliceDownLeft" === g && (o = a(".nivo-slice", b)._reverse()), o.each(function() {

                        var c = a(this);

                        c.css({

                            top: "0px"

                        }), l === d.slices - 1 ? setTimeout(function() {

                            c.animate({

                                opacity: "1.0"

                            }, d.animSpeed, "", function() {

                                b.trigger("nivo:animFinished")

                            })

                        }, 100 + k) : setTimeout(function() {

                            c.animate({

                                opacity: "1.0"

                            }, d.animSpeed)

                        }, 100 + k), k += 50, l++

                    });

                    else if ("sliceUp" === g || "sliceUpRight" === g || "sliceUpLeft" === g) m(b, d, f), k = 0, l = 0, o = a(".nivo-slice", b), "sliceUpLeft" === g && (o = a(".nivo-slice", b)._reverse()), o.each(function() {

                        var c = a(this);

                        c.css({

                            bottom: "0px"

                        }), l === d.slices - 1 ? setTimeout(function() {

                            c.animate({

                                opacity: "1.0"

                            }, d.animSpeed, "", function() {

                                b.trigger("nivo:animFinished")

                            })

                        }, 100 + k) : setTimeout(function() {

                            c.animate({

                                opacity: "1.0"

                            }, d.animSpeed)

                        }, 100 + k), k += 50, l++

                    });

                    else if ("sliceUpDown" === g || "sliceUpDownRight" === g || "sliceUpDownLeft" === g) {

                        m(b, d, f), k = 0, l = 0;

                        var t = 0;

                        o = a(".nivo-slice", b), "sliceUpDownLeft" === g && (o = a(".nivo-slice", b)._reverse()), o.each(function() {

                            var c = a(this);

                            0 === l ? (c.css("top", "0px"), l++) : (c.css("bottom", "0px"), l = 0), t === d.slices - 1 ? setTimeout(function() {

                                c.animate({

                                    opacity: "1.0"

                                }, d.animSpeed, "", function() {

                                    b.trigger("nivo:animFinished")

                                })

                            }, 100 + k) : setTimeout(function() {

                                c.animate({

                                    opacity: "1.0"

                                }, d.animSpeed)

                            }, 100 + k), k += 50, t++

                        })

                    } else if ("fold" === g) m(b, d, f), k = 0, l = 0, a(".nivo-slice", b).each(function() {

                        var c = a(this),

                            e = c.width();

                        c.css({

                            top: "0px",

                            width: "0px"

                        }), l === d.slices - 1 ? setTimeout(function() {

                            c.animate({

                                width: e,

                                opacity: "1.0"

                            }, d.animSpeed, "", function() {

                                b.trigger("nivo:animFinished")

                            })

                        }, 100 + k) : setTimeout(function() {

                            c.animate({

                                width: e,

                                opacity: "1.0"

                            }, d.animSpeed)

                        }, 100 + k), k += 50, l++

                    });

                    else if ("fade" === g) m(b, d, f), q = a(".nivo-slice:first", b), q.css({

                        width: b.width() + "px"

                    }), q.animate({

                        opacity: "1.0"

                    }, 2 * d.animSpeed, "", function() {

                        b.trigger("nivo:animFinished")

                    });

                    else if ("slideInRight" === g) m(b, d, f), q = a(".nivo-slice:first", b), q.css({

                        width: "0px",

                        opacity: "1"

                    }), q.animate({

                        width: b.width() + "px"

                    }, 2 * d.animSpeed, "", function() {

                        b.trigger("nivo:animFinished")

                    });

                    else if ("slideInLeft" === g) m(b, d, f), q = a(".nivo-slice:first", b), q.css({

                        width: "0px",

                        opacity: "1",

                        left: "",

                        right: "0px"

                    }), q.animate({

                        width: b.width() + "px"

                    }, 2 * d.animSpeed, "", function() {

                        q.css({

                            left: "0px",

                            right: ""

                        }), b.trigger("nivo:animFinished")

                    });

                    else if ("boxRandom" === g) n(b, d, f), r = d.boxCols * d.boxRows, l = 0, k = 0, s = p(a(".nivo-box", b)), s.each(function() {

                        var c = a(this);

                        l === r - 1 ? setTimeout(function() {

                            c.animate({

                                opacity: "1"

                            }, d.animSpeed, "", function() {

                                b.trigger("nivo:animFinished")

                            })

                        }, 100 + k) : setTimeout(function() {

                            c.animate({

                                opacity: "1"

                            }, d.animSpeed)

                        }, 100 + k), k += 20, l++

                    });

                    else if ("boxRain" === g || "boxRainReverse" === g || "boxRainGrow" === g || "boxRainGrowReverse" === g) {

                        n(b, d, f), r = d.boxCols * d.boxRows, l = 0, k = 0;

                        var u = 0,

                            v = 0,

                            w = [];

                        w[u] = [], s = a(".nivo-box", b), ("boxRainReverse" === g || "boxRainGrowReverse" === g) && (s = a(".nivo-box", b)._reverse()), s.each(function() {

                            w[u][v] = a(this), v++, v === d.boxCols && (u++, v = 0, w[u] = [])

                        });

                        for (var x = 0; x < 2 * d.boxCols; x++) {

                            for (var y = x, z = 0; z < d.boxRows; z++) y >= 0 && y < d.boxCols && (! function(c, e, f, h, i) {

                                var j = a(w[c][e]),

                                    k = j.width(),

                                    l = j.height();

                                ("boxRainGrow" === g || "boxRainGrowReverse" === g) && j.width(0).height(0), h === i - 1 ? setTimeout(function() {

                                    j.animate({

                                        opacity: "1",

                                        width: k,

                                        height: l

                                    }, d.animSpeed / 1.3, "", function() {

                                        b.trigger("nivo:animFinished")

                                    })

                                }, 100 + f) : setTimeout(function() {

                                    j.animate({

                                        opacity: "1",

                                        width: k,

                                        height: l

                                    }, d.animSpeed / 1.3)

                                }, 100 + f)

                            }(z, y, k, l, r), l++), y--;

                            k += 100

                        }

                    }

                },

                p = function(a) {

                    for (var b, c, d = a.length; d; b = parseInt(Math.random() * d, 10), c = a[--d], a[d] = a[b], a[b] = c);

                    return a

                },

                q = function(a) {

                    this.console && "undefined" != typeof console.log && console.log(a)

                };

            return this.stop = function() {

                a(b).data("nivo:vars").stop || (a(b).data("nivo:vars").stop = !0, q("Stop Slider"))

            }, this.start = function() {

                a(b).data("nivo:vars").stop && (a(b).data("nivo:vars").stop = !1, q("Start Slider"))

            }, d.afterLoad.call(this), this

        };

        a.fn.nivoSlider = function(c) {

            return this.each(function(d, e) {

                var f = a(this);

                if (f.data("nivoslider")) return f.data("nivoslider");

                var g = new b(this, c);

                f.data("nivoslider", g)

            })

        }, a.fn.nivoSlider.defaults = {

            effect: "random",

            slices: 15,

            boxCols: 8,

            boxRows: 4,

            animSpeed: 500,

            pauseTime: 3e3,

            startSlide: 0,

            directionNav: !0,

            controlNav: !0,

            controlNavThumbs: !1,

            pauseOnHover: !0,

            manualAdvance: !1,

            prevText: "<",

            nextText: ">",

            randomStart: !1,

            beforeChange: function() {},

            afterChange: function() {},

            slideshowEnd: function() {},

            lastSlide: function() {},

            afterLoad: function() {}

        }, a.fn._reverse = [].reverse

    }(jQuery);