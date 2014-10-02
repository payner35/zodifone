/*	
 * jQuery mmenu v4.5.5
 * @requires jQuery 1.7.0 or later
 *
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * Licensed under the MIT license:
 * http://en.wikipedia.org/wiki/MIT_License
 */
! function(e) {
    function n(n, s, t) {
        if (t) return "object" != typeof n && (n = {}), n;
        n = e.extend(!0, {}, e[a].defaults, n);
        for (var i = ["position", "zposition", "modal", "moveBackground"], o = 0, l = i.length; l > o; o++) "undefined" != typeof n[i[o]] && (e[a].deprecated('The option "' + i[o] + '"', "offCanvas." + i[o]), n.offCanvas = n.offCanvas || {}, n.offCanvas[i[o]] = n[i[o]]);
        return n
    }

    function s(n) {
        n = e.extend(!0, {}, e[a].configuration, n);
        for (var s = ["panel", "list", "selected", "label", "spacer"], t = 0, i = s.length; i > t; t++) "undefined" != typeof n[s[t] + "Class"] && (e[a].deprecated('The configuration option "' + s[t] + 'Class"', "classNames." + s[t]), n.classNames[s[t]] = n[s[t] + "Class"]);
        if ("undefined" != typeof n.counterClass && (e[a].deprecated('The configuration option "counterClass"', "classNames.counters.counter"), n.classNames.counters = n.classNames.counters || {}, n.classNames.counters.counter = n.counterClass), "undefined" != typeof n.collapsedClass && (e[a].deprecated('The configuration option "collapsedClass"', "classNames.labels.collapsed"), n.classNames.labels = n.classNames.labels || {}, n.classNames.labels.collapsed = n.collapsedClass), "undefined" != typeof n.header)
            for (var s = ["panelHeader", "panelNext", "panelPrev"], t = 0, i = s.length; i > t; t++) "undefined" != typeof n.header[s[t] + "Class"] && (e[a].deprecated('The configuration option "header.' + s[t] + 'Class"', "classNames.header." + s[t]), n.classNames.header = n.classNames.header || {}, n.classNames.header[s[t]] = n.header[s[t] + "Class"]);
        for (var s = ["pageNodetype", "pageSelector", "menuWrapperSelector", "menuInjectMethod"], t = 0, i = s.length; i > t; t++) "undefined" != typeof n[s[t]] && (e[a].deprecated('The configuration option "' + s[t] + '"', "offCanvas." + s[t]), n.offCanvas = n.offCanvas || {}, n.offCanvas[s[t]] = n[s[t]]);
        return n
    }

    function t() {
        r = !0, c.$wndw = e(window), c.$html = e("html"), c.$body = e("body"), e.each([o, l, d], function(e, n) {
            n.add = function(e) {
                e = e.split(" ");
                for (var s in e) n[e[s]] = n.mm(e[s])
            }
        }), o.mm = function(e) {
            return "mm-" + e
        }, o.add("wrapper menu inline panel nopanel list nolist subtitle selected label spacer current highest hidden opened subopened subopen fullsubopen subclose"), o.umm = function(e) {
            return "mm-" == e.slice(0, 3) && (e = e.slice(3)), e
        }, l.mm = function(e) {
            return "mm-" + e
        }, l.add("parent"), d.mm = function(e) {
            return e + ".mm"
        }, d.add("toggle open close setSelected transitionend webkitTransitionEnd mousedown mouseup touchstart touchmove touchend scroll resize click keydown keyup"), e[a]._c = o, e[a]._d = l, e[a]._e = d, e[a].glbl = c
    }
    var a = "mmenu",
        i = "4.5.5";
    if (!e[a]) {
        var o = {},
            l = {},
            d = {},
            r = !1,
            c = {
                $wndw: null,
                $html: null,
                $body: null
            };
        e[a] = function(e, s, t) {
            return this.$menu = e, this.opts = s, this.conf = t, this.vars = {}, this.opts = n(this.opts, this.conf, this.$menu), this._initMenu(), this._init(this.$menu.children(this.conf.panelNodetype)), this
        }, e[a].version = i, e[a].addons = [], e[a].uniqueId = 0, e[a].defaults = {
            classes: "",
            slidingSubmenus: !0,
            onClick: {
                setSelected: !0
            }
        }, e[a].configuration = {
            panelNodetype: "ul, ol, div",
            transitionDuration: 400,
            openingInterval: 25,
            classNames: {
                panel: "Panel",
                selected: "Selected",
                label: "Label",
                spacer: "Spacer"
            }
        }, e[a].prototype = {
            _init: function(n) {
                n = n.not("." + o.nopanel), n = this._initPanels(n), n = this._initLinks(n), n = this._bindCustomEvents(n);
                for (var s = 0; s < e[a].addons.length; s++) "function" == typeof this["_init_" + e[a].addons[s]] && this["_init_" + e[a].addons[s]](n);
                this._update()
            },
            _initMenu: function() {
                this.opts.offCanvas && this.conf.clone && (this.$menu = this.$menu.clone(!0), this.$menu.add(this.$menu.find("*")).filter("[id]").each(function() {
                    e(this).attr("id", o.mm(e(this).attr("id")))
                })), this.$menu.contents().each(function() {
                    3 == e(this)[0].nodeType && e(this).remove()
                }), this.$menu.parent().addClass(o.wrapper);
                var n = [o.menu];
                n.push(o.mm(this.opts.slidingSubmenus ? "horizontal" : "vertical")), this.opts.classes && n.push(this.opts.classes), this.$menu.addClass(n.join(" "))
            },
            _initPanels: function(n) {
                var s = this;
                this.__findAddBack(n, "ul, ol").not("." + o.nolist).addClass(o.list);
                var t = this.__findAddBack(n, "." + o.list).find("> li");
                this.__refactorClass(t, this.conf.classNames.selected, "selected"), this.__refactorClass(t, this.conf.classNames.label, "label"), this.__refactorClass(t, this.conf.classNames.spacer, "spacer"), t.off(d.setSelected).on(d.setSelected, function(n, s) {
                    n.stopPropagation(), t.removeClass(o.selected), "boolean" != typeof s && (s = !0), s && e(this).addClass(o.selected)
                }), this.__refactorClass(this.__findAddBack(n, "." + this.conf.classNames.panel), this.conf.classNames.panel, "panel"), n.add(this.__findAddBack(n, "." + o.list).children().children().filter(this.conf.panelNodetype).not("." + o.nopanel)).addClass(o.panel);
                var a = this.__findAddBack(n, "." + o.panel),
                    i = e("." + o.panel, this.$menu);
                a.each(function() {
                    var n = e(this),
                        t = n.attr("id") || s.__getUniqueId();
                    n.attr("id", t)
                }), a.each(function() {
                    var n = e(this),
                        t = n.is("ul, ol") ? n : n.find("ul ,ol").first(),
                        a = n.parent(),
                        i = a.find("> a, > span"),
                        d = a.closest("." + o.panel);
                    if (a.parent().is("." + o.list)) {
                        n.data(l.parent, a);
                        var r = e('<a class="' + o.subopen + '" href="#' + n.attr("id") + '" />').insertBefore(i);
                        i.is("a") || r.addClass(o.fullsubopen), s.opts.slidingSubmenus && t.prepend('<li class="' + o.subtitle + '"><a class="' + o.subclose + '" href="#' + d.attr("id") + '">' + i.text() + "</a></li>")
                    }
                });
                var r = this.opts.slidingSubmenus ? d.open : d.toggle;
                if (i.each(function() {
                    var n = e(this),
                        s = n.attr("id");
                    e('a[href="#' + s + '"]', i).off(d.click).on(d.click, function(e) {
                        e.preventDefault(), n.trigger(r)
                    })
                }), this.opts.slidingSubmenus) {
                    var c = this.__findAddBack(n, "." + o.list).find("> li." + o.selected);
                    c.parents("li").removeClass(o.selected).end().add(c.parents("li")).each(function() {
                        var n = e(this),
                            s = n.find("> ." + o.panel);
                        s.length && (n.parents("." + o.panel).addClass(o.subopened), s.addClass(o.opened))
                    }).closest("." + o.panel).addClass(o.opened).parents("." + o.panel).addClass(o.subopened)
                } else {
                    var c = e("li." + o.selected, i);
                    c.parents("li").removeClass(o.selected).end().add(c.parents("li")).addClass(o.opened)
                }
                var u = i.filter("." + o.opened);
                return u.length || (u = a.first()), u.addClass(o.opened).last().addClass(o.current), this.opts.slidingSubmenus && a.not(u.last()).addClass(o.hidden).end().appendTo(this.$menu), a
            },
            _initLinks: function(n) {
                var s = this;
                return this.__findAddBack(n, "." + o.list).find("> li > a").not("." + o.subopen).not("." + o.subclose).not('[rel="external"]').not('[target="_blank"]').off(d.click).on(d.click, function(n) {
                    var t = e(this),
                        a = t.attr("href") || "";
                    s.__valueOrFn(s.opts.onClick.setSelected, t) && t.parent().trigger(d.setSelected);
                    var i = s.__valueOrFn(s.opts.onClick.preventDefault, t, "#" == a.slice(0, 1));
                    i && n.preventDefault(), s.__valueOrFn(s.opts.onClick.blockUI, t, !i) && c.$html.addClass(o.blocking), s.__valueOrFn(s.opts.onClick.close, t, i) && s.$menu.triggerHandler(d.close)
                }), n
            },
            _bindCustomEvents: function(n) {
                var s = this;
                return n.off(d.toggle + " " + d.open + " " + d.close).on(d.toggle + " " + d.open + " " + d.close, function(e) {
                    e.stopPropagation()
                }), this.opts.slidingSubmenus ? n.on(d.open, function() {
                    return s._openSubmenuHorizontal(e(this))
                }) : n.on(d.toggle, function() {
                    var n = e(this);
                    return n.triggerHandler(n.parent().hasClass(o.opened) ? d.close : d.open)
                }).on(d.open, function() {
                        return e(this).parent().addClass(o.opened), "open"
                    }).on(d.close, function() {
                        return e(this).parent().removeClass(o.opened), "close"
                    }), n
            },
            _openSubmenuHorizontal: function(n) {
                if (n.hasClass(o.current)) return !1;
                var s = e("." + o.panel, this.$menu),
                    t = s.filter("." + o.current);
                return s.removeClass(o.highest).removeClass(o.current).not(n).not(t).addClass(o.hidden), n.hasClass(o.opened) ? t.addClass(o.highest).removeClass(o.opened).removeClass(o.subopened) : (n.addClass(o.highest), t.addClass(o.subopened)), n.removeClass(o.hidden).addClass(o.current), setTimeout(function() {
                    n.removeClass(o.subopened).addClass(o.opened)
                }, this.conf.openingInterval), "open"
            },
            _update: function(e) {
                if (this.updates || (this.updates = []), "function" == typeof e) this.updates.push(e);
                else
                    for (var n = 0, s = this.updates.length; s > n; n++) this.updates[n].call(this, e)
            },
            __valueOrFn: function(e, n, s) {
                return "function" == typeof e ? e.call(n[0]) : "undefined" == typeof e && "undefined" != typeof s ? s : e
            },
            __refactorClass: function(e, n, s) {
                e.filter("." + n).removeClass(n).addClass(o[s])
            },
            __findAddBack: function(e, n) {
                return e.find(n).add(e.filter(n))
            },
            __transitionend: function(e, n, s) {
                var t = !1,
                    a = function() {
                        t || n.call(e[0]), t = !0
                    };
                e.one(d.transitionend, a), e.one(d.webkitTransitionEnd, a), setTimeout(a, 1.1 * s)
            },
            __getUniqueId: function() {
                return o.mm(e[a].uniqueId++)
            }
        }, e.fn[a] = function(i, o) {
            return r || t(), i = n(i, o), o = s(o), this.each(function() {
                var n = e(this);
                n.data(a) || n.data(a, new e[a](n, i, o))
            })
        }, e[a].support = {
            touch: "ontouchstart" in window.document
        }, e[a].debug = function() {}, e[a].deprecated = function(e, n) {
            "undefined" != typeof console && "undefined" != typeof console.warn && console.warn("MMENU: " + e + " is deprecated, use " + n + " instead.")
        }
    }
}(jQuery);
/*	
 * jQuery mmenu offCanvas addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
! function(e) {
    function o(o) {
        return ("top" == o.position || "bottom" == o.position) && ("back" == o.zposition || "next" == o.zposition) && (e[s].deprecated('Using position "' + o.position + '" in combination with zposition "' + o.zposition + '"', 'zposition "front"'), o.zposition = "front"), o
    }

    function t(e) {
        return "string" != typeof e.pageSelector && (e.pageSelector = "> " + e.pageNodetype), e
    }

    function n() {
        c = !0, p = e[s]._c, a = e[s]._d, r = e[s]._e, p.add("offcanvas modal background opening blocker page"), a.add("style"), r.add("opening opened closing closed setPage"), l = e[s].glbl, l.$allMenus = (l.$allMenus || e()).add(this.$menu), l.$wndw.on(r.keydown, function(e) {
            return l.$html.hasClass(p.opened) && 9 == e.keyCode ? (e.preventDefault(), !1) : void 0
        });
        var o = 0;
        l.$wndw.on(r.resize, function(e, t) {
            if (t || l.$html.hasClass(p.opened)) {
                var n = l.$wndw.height();
                (t || n != o) && (o = n, l.$page.css("minHeight", n))
            }
        })
    }
    var s = "mmenu",
        i = "offCanvas";
    e[s].prototype["_init_" + i] = function() {
        if (this.opts[i] && !this.vars[i + "_added"]) {
            this.vars[i + "_added"] = !0, c || n(), this.opts[i] = o(this.opts[i]), this.conf[i] = t(this.conf[i]);
            var e = this.opts[i],
                s = this.conf[i],
                a = [p.offcanvas];
            "boolean" != typeof this.vars.opened && (this.vars.opened = !1), "left" != e.position && a.push(p.mm(e.position)), "back" != e.zposition && a.push(p.mm(e.zposition)), this.$menu.addClass(a.join(" ")).parent().removeClass(p.wrapper), this[i + "_initPage"](l.$page), this[i + "_initBlocker"](), this[i + "_initOpenClose"](), this[i + "_bindCustomEvents"](), this.$menu[s.menuInjectMethod + "To"](s.menuWrapperSelector)
        }
    }, e[s].addons.push(i), e[s].defaults[i] = {
        position: "left",
        zposition: "back",
        modal: !1,
        moveBackground: !0
    }, e[s].configuration[i] = {
        pageNodetype: "div",
        pageSelector: null,
        menuWrapperSelector: "body",
        menuInjectMethod: "prepend"
    }, e[s].prototype.open = function() {
        if (this.vars.opened) return !1;
        var e = this;
        return this._openSetup(), setTimeout(function() {
            e._openFinish()
        }, this.conf.openingInterval), "open"
    }, e[s].prototype._openSetup = function() {
        l.$allMenus.not(this.$menu).trigger(r.close), l.$page.data(a.style, l.$page.attr("style") || ""), l.$wndw.trigger(r.resize, [!0]);
        var e = [p.opened];
        this.opts[i].modal && e.push(p.modal), this.opts[i].moveBackground && e.push(p.background), "left" != this.opts[i].position && e.push(p.mm(this.opts[i].position)), "back" != this.opts[i].zposition && e.push(p.mm(this.opts[i].zposition)), this.opts.classes && e.push(this.opts.classes), l.$html.addClass(e.join(" ")), this.vars.opened = !0, this.$menu.addClass(p.current + " " + p.opened)
    }, e[s].prototype._openFinish = function() {
        var e = this;
        this.__transitionend(l.$page, function() {
            e.$menu.trigger(r.opened)
        }, this.conf.transitionDuration), l.$html.addClass(p.opening), this.$menu.trigger(r.opening)
    }, e[s].prototype.close = function() {
        if (!this.vars.opened) return !1;
        var e = this;
        return this.__transitionend(l.$page, function() {
            e.$menu.removeClass(p.current).removeClass(p.opened), l.$html.removeClass(p.opened).removeClass(p.modal).removeClass(p.background).removeClass(p.mm(e.opts[i].position)).removeClass(p.mm(e.opts[i].zposition)), e.opts.classes && l.$html.removeClass(e.opts.classes), l.$page.attr("style", l.$page.data(a.style)), e.vars.opened = !1, e.$menu.trigger(r.closed)
        }, this.conf.transitionDuration), l.$html.removeClass(p.opening), this.$menu.trigger(r.closing), "close"
    }, e[s].prototype[i + "_initBlocker"] = function() {
        var o = this;
        l.$blck || (l.$blck = e('<div id="' + p.blocker + '" />').appendTo(l.$body)), l.$blck.off(r.touchstart).on(r.touchstart, function(e) {
            e.preventDefault(), e.stopPropagation(), l.$blck.trigger(r.mousedown)
        }).on(r.mousedown, function(e) {
                e.preventDefault(), l.$html.hasClass(p.modal) || o.close()
            })
    }, e[s].prototype[i + "_initPage"] = function(o) {
        o || (o = e(this.conf[i].pageSelector, l.$body), o.length > 1 && (e[s].debug("Multiple nodes found for the page-node, all nodes are wrapped in one <" + this.conf[i].pageNodetype + ">."), o = o.wrapAll("<" + this.conf[i].pageNodetype + " />").parent())), o.addClass(p.page), l.$page = o
    }, e[s].prototype[i + "_initOpenClose"] = function() {
        var o = this,
            t = this.$menu.attr("id");
        t && t.length && (this.conf.clone && (t = p.umm(t)), e('a[href="#' + t + '"]').off(r.click).on(r.click, function(e) {
            e.preventDefault(), o.open()
        }));
        var t = l.$page.attr("id");
        t && t.length && e('a[href="#' + t + '"]').on(r.click, function(e) {
            e.preventDefault(), o.close()
        })
    }, e[s].prototype[i + "_bindCustomEvents"] = function() {
        var e = this,
            o = r.open + " " + r.opening + " " + r.opened + " " + r.close + " " + r.closing + " " + r.closed + " " + r.setPage;
        this.$menu.off(o).on(o, function(e) {
            e.stopPropagation()
        }), this.$menu.on(r.open, function() {
            e.open()
        }).on(r.close, function() {
                e.close()
            }).on(r.setPage, function(o, t) {
                e[i + "_initPage"](t), e[i + "_initOpenClose"]()
            })
    };
    var p, a, r, l, c = !1
}(jQuery);