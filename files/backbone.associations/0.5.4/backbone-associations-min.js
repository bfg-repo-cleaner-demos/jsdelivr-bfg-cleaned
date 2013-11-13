(function () {
    var z = this, f, e, w, p, u, v, C, s, D, E, F, q;
    "undefined" !== typeof exports ? (f = require("underscore"), e = require("backbone"), "undefined" !== typeof module && module.exports && (module.exports = e), exports = e) : (f = z._, e = z.Backbone);
    w = e.Model;
    p = e.Collection;
    u = w.prototype;
    v = p.prototype;
    C = "change add remove reset sort destroy".split(" ");
    E = ["reset", "sort"];
    e.Associations = {VERSION: "0.5.4"};
    var G = function () {
        return q
    }, A = function (a) {
        if (!f.isString(a) || 1 > f.size(a))a = ".";
        q = a;
        D = RegExp("[\\" + q + "\\[\\]]+", "g");
        F = RegExp("[^\\" +
            q + "\\[\\]]+", "g")
    };
    try {
        Object.defineProperty(e.Associations, "SEPARATOR", {enumerable: !0, get: G, set: A})
    } catch (J) {
    }
    e.Associations.Many = e.Many = "Many";
    e.Associations.One = e.One = "One";
    e.Associations.Self = e.Self = "Self";
    e.Associations.SEPARATOR = ".";
    e.Associations.getSeparator = G;
    e.Associations.setSeparator = A;
    A();
    s = e.AssociatedModel = e.Associations.AssociatedModel = w.extend({relations: void 0, _proxyCalls: void 0, get: function (a) {
        var c = u.get.call(this, a);
        return c ? c : this._getAttr.apply(this, arguments)
    }, set: function (a, c, d) {
        var b;
        f.isObject(a) || null == a ? (b = a, d = c) : (b = {}, b[a] = c);
        a = this._set(b, d);
        this._processPendingEvents();
        return a
    }, _set: function (a, c) {
        var d, b, H, g, e = this;
        if (!a)return this;
        for (d in a)if (b || (b = {}), d.match(D)) {
            var n = B(d);
            g = f.initial(n);
            n = n[n.length - 1];
            g = this.get(g);
            g instanceof s && (g = b[g.cid] || (b[g.cid] = {model: g, data: {}}), g.data[n] = a[d])
        } else g = b[this.cid] || (b[this.cid] = {model: this, data: {}}), g.data[d] = a[d];
        if (b)for (H in b)g = b[H], this._setAttr.call(g.model, g.data, c) || (e = !1); else e = this._setAttr.call(this,
            a, c);
        return e
    }, _setAttr: function (a, c) {
        var d;
        c || (c = {});
        if (c.unset)for (d in a)a[d] = void 0;
        this.parents = this.parents || [];
        this.relations && f.each(this.relations, function (b) {
            var d = b.key, g = b.relatedModel, m = b.collectionType, n = b.map, k = this.attributes[d], l = k && k.idAttribute, h, t, r, q = !1;
            !g || g.prototype instanceof w || (g = f.isFunction(g) ? g.call(this, b, a) : g);
            g && f.isString(g) && (g = g === e.Self ? this.constructor : x(g));
            m && f.isString(m) && (m = x(m));
            n && f.isString(n) && (n = x(n));
            t = b.options ? f.extend({}, b.options, c) : c;
            if (!g && !m)throw Error("specify either a relatedModel or collectionType");
            if (a[d]) {
                h = f.result(a, d);
                h = n ? n.call(this, h, m ? m : g) : h;
                if (b.type === e.Many) {
                    if (m && !m.prototype instanceof p)throw Error("collectionType must inherit from Backbone.Collection");
                    k ? (k._deferEvents = !0, k[t.reset ? "reset" : "set"](h instanceof p ? h.models : h, t), b = k) : (q = !0, h instanceof p ? b = h : (b = m ? new m : this._createCollection(g), b[t.reset ? "reset" : "set"](h, t)))
                } else if (b.type === e.One) {
                    if (!g)throw Error("specify a relatedModel for Backbone.One type");
                    if (!(g.prototype instanceof e.AssociatedModel))throw Error("specify an AssociatedModel for Backbone.One type");
                    b = h instanceof s ? h : new g(h, t);
                    k && b.attributes[l] && k.attributes[l] === b.attributes[l] ? (k._deferEvents = !0, k._set(h instanceof s ? h.attributes : h, t), b = k) : q = !0
                } else throw Error("type attribute must be specified and have the values Backbone.One or Backbone.Many");
                r = a[d] = b;
                if (q || r && !r._proxyCallback)r._proxyCallback = function () {
                    return this._bubbleEvent.call(this, d, r, arguments)
                }, r.on("all", r._proxyCallback, this)
            }
            a.hasOwnProperty(d) && (k = a[d], l = this.attributes[d], k ? (k.parents = k.parents || [], -1 == f.indexOf(k.parents,
                this) && k.parents.push(this)) : l && 0 < l.parents.length && (l.parents = f.difference(l.parents, [this]), l._proxyCallback && l.off("all", l._proxyCallback, this)))
        }, this);
        return u.set.call(this, a, c)
    }, _bubbleEvent: function (a, c, d) {
        var b = d[0].split(":"), e = b[0], g = "nested-change" == d[0], m = d[1], n = d[2], k = -1, l = c._proxyCalls, h, t = -1 !== f.indexOf(C, e);
        if (!g) {
            1 < f.size(b) && (h = b[1]);
            -1 !== f.indexOf(E, e) && (n = m);
            if (c instanceof p && t && m) {
                var r = B(h), u = f.initial(r);
                (b = c.find(function (a) {
                    if (m === a)return!0;
                    if (!a)return!1;
                    var b = a.get(u);
                    if ((b instanceof s || b instanceof p) && m === b)return!0;
                    b = a.get(r);
                    if ((b instanceof s || b instanceof p) && m === b || b instanceof p && n && n === b)return!0
                })) && (k = c.indexOf(b))
            }
            h = a + (-1 === k || "change" !== e && !h ? "" : "[" + k + "]") + (h ? q + h : "");
            if (/\[\*\]/g.test(h))return this;
            b = h.replace(/\[\d+\]/g, "[*]");
            k = [];
            k.push.apply(k, d);
            k[0] = e + ":" + h;
            l = c._proxyCalls = l || {};
            if (this._isEventAvailable.call(this, l, h))return this;
            l[h] = !0;
            "change" === e && (this._previousAttributes[a] = c._previousAttributes, this.changed[a] = c);
            this.trigger.apply(this,
                k);
            "change" === e && this.get(h) != d[2] && (a = ["nested-change", h, d[1]], d[2] && a.push(d[2]), this.trigger.apply(this, a));
            l && h && delete l[h];
            h !== b && (k[0] = e + ":" + b, this.trigger.apply(this, k));
            return this
        }
    }, _isEventAvailable: function (a, c) {
        return f.find(a, function (a, b) {
            return-1 !== c.indexOf(b, c.length - b.length)
        })
    }, _createCollection: function (a) {
        var c = a;
        f.isString(c) && (c = x(c));
        if (c && c.prototype instanceof s || f.isFunction(c))a = new p, a.model = c; else throw Error("type must inherit from Backbone.AssociatedModel");
        return a
    },
        _processPendingEvents: function () {
            this._processedEvents || (this._processedEvents = !0, this._deferEvents = !1, f.each(this._pendingEvents, function (a) {
                a.c.trigger.apply(a.c, a.a)
            }), this._pendingEvents = [], f.each(this.relations, function (a) {
                (a = this.attributes[a.key]) && a._processPendingEvents()
            }, this), delete this._processedEvents)
        }, trigger: function (a) {
            this._deferEvents ? (this._pendingEvents = this._pendingEvents || [], this._pendingEvents.push({c: this, a: arguments})) : u.trigger.apply(this, arguments)
        }, toJSON: function (a) {
            var c =
            {}, d;
            c[this.idAttribute] = this.id;
            this.visited || (this.visited = !0, c = u.toJSON.apply(this, arguments), this.relations && f.each(this.relations, function (b) {
                var e = this.attributes[b.key];
                e && (d = e.toJSON ? e.toJSON(a) : e, c[b.key] = f.isArray(d) ? f.compact(d) : d)
            }, this), delete this.visited);
            return c
        }, clone: function () {
            return new this.constructor(this.toJSON())
        }, cleanup: function () {
            f.each(this.relations, function (a) {
                (a = this.attributes[a.key]) && (a.parents = f.difference(a.parents, [this]))
            }, this);
            this.off()
        }, _getAttr: function (a) {
            var c =
                this;
            a = B(a);
            var d, b;
            if (!(1 > f.size(a))) {
                for (b = 0; b < a.length; b++) {
                    d = a[b];
                    if (!c)break;
                    c = c instanceof p ? isNaN(d) ? void 0 : c.at(d) : c.attributes[d]
                }
                return c
            }
        }});
    var B = function (a) {
        return"" === a ? [""] : f.isString(a) ? a.match(F) : a || []
    }, x = function (a) {
        return f.reduce(a.split(q), function (a, d) {
            return a[d]
        }, z)
    }, I = function (a, c, d) {
        var b, e;
        f.find(a, function (a) {
            if (b = f.find(a.relations, function (b) {
                return a.get(b.key) === c
            }, this))return e = a, !0
        }, this);
        return b && b.map ? b.map.call(e, d, c) : d
    }, y = {};
    f.each(["set", "remove", "reset"],
        function (a) {
            y[a] = p.prototype[a];
            v[a] = function (c, d) {
                this.model.prototype instanceof s && this.parents && (arguments[0] = I(this.parents, this, c));
                return y[a].apply(this, arguments)
            }
        });
    y.trigger = v.trigger;
    v.trigger = function (a) {
        this._deferEvents ? (this._pendingEvents = this._pendingEvents || [], this._pendingEvents.push({c: this, a: arguments})) : y.trigger.apply(this, arguments)
    };
    v._processPendingEvents = s.prototype._processPendingEvents
}).call(this);
