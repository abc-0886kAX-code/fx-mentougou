/*!
 * shp涓巊eojson浜掕浆宸ュ叿绫�
 * 鐗堟湰淇℃伅锛歷1.1.0, hash鍊�: f1fedbbd6a7748f49116
 * 缂栬瘧鏃ユ湡锛�2022-11-17 21:29:55
 * 鐗堟潈鎵€鏈夛細Copyright by 鏈ㄩ仴 https://github.com/muyao1987/shp-geojson
 *
 */
!(function (t, e) {
    "object" == typeof exports && "object" == typeof module ? (module.exports = e()) : "function" == typeof define && define.amd ? define("shpUtil", [], e) : "object" == typeof exports ? (exports.shpUtil = e()) : (t.shpUtil = e());
})(window, function () {
    return (function (t) {
        var e = {};
        function i(r) {
            if (e[r]) return e[r].exports;
            var s = (e[r] = { i: r, l: !1, exports: {} });
            return t[r].call(s.exports, s, s.exports, i), (s.l = !0), s.exports;
        }
        return (
            (i.m = t),
            (i.c = e),
            (i.d = function (t, e, r) {
                i.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
            }),
            (i.r = function (t) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(t, "__esModule", { value: !0 });
            }),
            (i.t = function (t, e) {
                if ((1 & e && (t = i(t)), 8 & e)) return t;
                if (4 & e && "object" == typeof t && t && t.__esModule) return t;
                var r = Object.create(null);
                if ((i.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: t }), 2 & e && "string" != typeof t))
                    for (var s in t)
                        i.d(
                            r,
                            s,
                            function (e) {
                                return t[e];
                            }.bind(null, s)
                        );
                return r;
            }),
            (i.n = function (t) {
                var e =
                    t && t.__esModule
                        ? function () {
                              return t.default;
                          }
                        : function () {
                              return t;
                          };
                return i.d(e, "a", e), e;
            }),
            (i.o = function (t, e) {
                return Object.prototype.hasOwnProperty.call(t, e);
            }),
            (i.p = ""),
            i((i.s = 6))
        );
    })([
        function (t, e) {
            var i;
            i = (function () {
                return this;
            })();
            try {
                i = i || new Function("return this")();
            } catch (t) {
                "object" == typeof window && (i = window);
            }
            t.exports = i;
        },
        function (t, e, i) {
            "use strict";
            (function (e) {
                let r = i(27);
                r.default && (r = r.default);
                const s = i(7),
                    n = i(15),
                    a = i(18),
                    o = i(19),
                    h = i(4),
                    u = i(26),
                    l = i(2).Buffer,
                    c = e.URL,
                    f = new u({ max: 20 });
                function d(t) {
                    if (!t) throw new Error("forgot to pass buffer");
                    return l.isBuffer(t) ? t : p(t) ? l.from(t) : p(t.buffer) ? (1 === t.BYTES_PER_ELEMENT ? l.from(t) : l.from(t.buffer)) : void 0;
                }
                function p(t) {
                    return t instanceof e.ArrayBuffer || "[object ArrayBuffer]" === Object.prototype.toString.call(t);
                }
                function m(t, e, i) {
                    return "string" == typeof t && f.has(t)
                        ? h.resolve(f.get(t))
                        : m.getShapefile(t, e, i).then(function (e) {
                              return "string" == typeof t && f.set(t, e), e;
                          });
                }
                (m.combine = function ([t, e]) {
                    const i = { type: "FeatureCollection", features: [] };
                    let r = 0;
                    const s = t.length;
                    for (e || (e = []); r < s; ) i.features.push({ type: "Feature", geometry: t[r], properties: e[r] || {} }), r++;
                    return i;
                }),
                    (m.parseZip = async function (t, e, i) {
                        let n;
                        t = d(t);
                        const h = await s(t),
                            u = [];
                        for (n in ((e = e || []), h))
                            -1 === n.indexOf("__MACOSX") &&
                                ("shp" === n.slice(-3).toLowerCase()
                                    ? (u.push(n.slice(0, -4)), (h[n.slice(0, -3) + n.slice(-3).toLowerCase()] = h[n]))
                                    : "prj" === n.slice(-3).toLowerCase()
                                    ? (h[n.slice(0, -3) + n.slice(-3).toLowerCase()] = r(h[n]))
                                    : "json" === n.slice(-4).toLowerCase() || e.indexOf(n.split(".").pop()) > -1
                                    ? u.push(n.slice(0, -3) + n.slice(-3).toLowerCase())
                                    : ("dbf" !== n.slice(-3).toLowerCase() && "cpg" !== n.slice(-3).toLowerCase()) || (h[n.slice(0, -3) + n.slice(-3).toLowerCase()] = h[n]));
                        if (!u.length) throw new Error("no layers founds");
                        const l = u.map(function (t) {
                            let r, s;
                            const n = t.lastIndexOf(".");
                            return (
                                n > -1 && t.slice(n).indexOf("json") > -1
                                    ? ((r = JSON.parse(h[t])), (r.fileName = t.slice(0, n)))
                                    : e.indexOf(t.slice(n + 1)) > -1
                                    ? ((r = h[t]), (r.fileName = t))
                                    : (h[t + ".dbf"] && (s = o(h[t + ".dbf"], i || h[t + ".cpg"])), (r = m.combine([a(h[t + ".shp"], h[t + ".prj"]), s])), (r.fileName = t)),
                                r
                            );
                        });
                        return 1 === l.length ? l[0] : l;
                    });
                const g = async (t) => {
                        const e = await h.all([n(t, "shp"), n(t, "prj")]);
                        let i = !1;
                        try {
                            e[1] && (i = r(e[1]));
                        } catch (t) {
                            i = !1;
                        }
                        return a(e[0], i);
                    },
                    _ = async (t) => {
                        const [e, i] = await h.all([n(t, "dbf"), n(t, "cpg")]);
                        if (e) return o(e, i);
                    };
                (m.getShapefile = async function (t, e, i) {
                    if ("string" != typeof t) return m.parseZip(t, e, i);
                    if (((t, e) => new c(t).pathname.slice(-4).toLowerCase() === e)(t, ".zip"))
                        return (async function (t, e, i) {
                            const r = await n(t);
                            return m.parseZip(r, e, i);
                        })(t, e, i);
                    const r = await h.all([g(t), _(t)]);
                    return m.combine(r);
                }),
                    (m.parseShp = function (t, e) {
                        if (((t = d(t)), l.isBuffer(e) && (e = e.toString()), "string" == typeof e))
                            try {
                                e = r(e);
                            } catch (t) {
                                e = !1;
                            }
                        return a(t, e);
                    }),
                    (m.parseDbf = function (t, e) {
                        return (t = d(t)), o(t, e);
                    }),
                    (t.exports = m);
            }).call(this, i(0));
        },
        function (t, e, i) {
            "use strict";
            (function (t) {
                /*!
                 * The buffer module from node.js, for the browser.
                 *
                 * @author   Feross Aboukhadijeh <http://feross.org>
                 * @license  MIT
                 */
                var r = i(9),
                    s = i(10),
                    n = i(11);
                function a() {
                    return h.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
                }
                function o(t, e) {
                    if (a() < e) throw new RangeError("Invalid typed array length");
                    return h.TYPED_ARRAY_SUPPORT ? ((t = new Uint8Array(e)).__proto__ = h.prototype) : (null === t && (t = new h(e)), (t.length = e)), t;
                }
                function h(t, e, i) {
                    if (!(h.TYPED_ARRAY_SUPPORT || this instanceof h)) return new h(t, e, i);
                    if ("number" == typeof t) {
                        if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
                        return c(this, t);
                    }
                    return u(this, t, e, i);
                }
                function u(t, e, i, r) {
                    if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
                    return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer
                        ? (function (t, e, i, r) {
                              if ((e.byteLength, i < 0 || e.byteLength < i)) throw new RangeError("'offset' is out of bounds");
                              if (e.byteLength < i + (r || 0)) throw new RangeError("'length' is out of bounds");
                              e = void 0 === i && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, i) : new Uint8Array(e, i, r);
                              h.TYPED_ARRAY_SUPPORT ? ((t = e).__proto__ = h.prototype) : (t = f(t, e));
                              return t;
                          })(t, e, i, r)
                        : "string" == typeof e
                        ? (function (t, e, i) {
                              ("string" == typeof i && "" !== i) || (i = "utf8");
                              if (!h.isEncoding(i)) throw new TypeError('"encoding" must be a valid string encoding');
                              var r = 0 | p(e, i),
                                  s = (t = o(t, r)).write(e, i);
                              s !== r && (t = t.slice(0, s));
                              return t;
                          })(t, e, i)
                        : (function (t, e) {
                              if (h.isBuffer(e)) {
                                  var i = 0 | d(e.length);
                                  return 0 === (t = o(t, i)).length || e.copy(t, 0, 0, i), t;
                              }
                              if (e) {
                                  if (("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer) || "length" in e) return "number" != typeof e.length || (r = e.length) != r ? o(t, 0) : f(t, e);
                                  if ("Buffer" === e.type && n(e.data)) return f(t, e.data);
                              }
                              var r;
                              throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
                          })(t, e);
                }
                function l(t) {
                    if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
                    if (t < 0) throw new RangeError('"size" argument must not be negative');
                }
                function c(t, e) {
                    if ((l(e), (t = o(t, e < 0 ? 0 : 0 | d(e))), !h.TYPED_ARRAY_SUPPORT)) for (var i = 0; i < e; ++i) t[i] = 0;
                    return t;
                }
                function f(t, e) {
                    var i = e.length < 0 ? 0 : 0 | d(e.length);
                    t = o(t, i);
                    for (var r = 0; r < i; r += 1) t[r] = 255 & e[r];
                    return t;
                }
                function d(t) {
                    if (t >= a()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + a().toString(16) + " bytes");
                    return 0 | t;
                }
                function p(t, e) {
                    if (h.isBuffer(t)) return t.length;
                    if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
                    "string" != typeof t && (t = "" + t);
                    var i = t.length;
                    if (0 === i) return 0;
                    for (var r = !1; ; )
                        switch (e) {
                            case "ascii":
                            case "latin1":
                            case "binary":
                                return i;
                            case "utf8":
                            case "utf-8":
                            case void 0:
                                return U(t).length;
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return 2 * i;
                            case "hex":
                                return i >>> 1;
                            case "base64":
                                return F(t).length;
                            default:
                                if (r) return U(t).length;
                                (e = ("" + e).toLowerCase()), (r = !0);
                        }
                }
                function m(t, e, i) {
                    var r = !1;
                    if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return "";
                    if (((void 0 === i || i > this.length) && (i = this.length), i <= 0)) return "";
                    if ((i >>>= 0) <= (e >>>= 0)) return "";
                    for (t || (t = "utf8"); ; )
                        switch (t) {
                            case "hex":
                                return I(this, e, i);
                            case "utf8":
                            case "utf-8":
                                return E(this, e, i);
                            case "ascii":
                                return C(this, e, i);
                            case "latin1":
                            case "binary":
                                return A(this, e, i);
                            case "base64":
                                return S(this, e, i);
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return O(this, e, i);
                            default:
                                if (r) throw new TypeError("Unknown encoding: " + t);
                                (t = (t + "").toLowerCase()), (r = !0);
                        }
                }
                function g(t, e, i) {
                    var r = t[e];
                    (t[e] = t[i]), (t[i] = r);
                }
                function _(t, e, i, r, s) {
                    if (0 === t.length) return -1;
                    if (("string" == typeof i ? ((r = i), (i = 0)) : i > 2147483647 ? (i = 2147483647) : i < -2147483648 && (i = -2147483648), (i = +i), isNaN(i) && (i = s ? 0 : t.length - 1), i < 0 && (i = t.length + i), i >= t.length)) {
                        if (s) return -1;
                        i = t.length - 1;
                    } else if (i < 0) {
                        if (!s) return -1;
                        i = 0;
                    }
                    if (("string" == typeof e && (e = h.from(e, r)), h.isBuffer(e))) return 0 === e.length ? -1 : y(t, e, i, r, s);
                    if ("number" == typeof e) return (e &= 255), h.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? (s ? Uint8Array.prototype.indexOf.call(t, e, i) : Uint8Array.prototype.lastIndexOf.call(t, e, i)) : y(t, [e], i, r, s);
                    throw new TypeError("val must be string, number or Buffer");
                }
                function y(t, e, i, r, s) {
                    var n,
                        a = 1,
                        o = t.length,
                        h = e.length;
                    if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
                        if (t.length < 2 || e.length < 2) return -1;
                        (a = 2), (o /= 2), (h /= 2), (i /= 2);
                    }
                    function u(t, e) {
                        return 1 === a ? t[e] : t.readUInt16BE(e * a);
                    }
                    if (s) {
                        var l = -1;
                        for (n = i; n < o; n++)
                            if (u(t, n) === u(e, -1 === l ? 0 : n - l)) {
                                if ((-1 === l && (l = n), n - l + 1 === h)) return l * a;
                            } else -1 !== l && (n -= n - l), (l = -1);
                    } else
                        for (i + h > o && (i = o - h), n = i; n >= 0; n--) {
                            for (var c = !0, f = 0; f < h; f++)
                                if (u(t, n + f) !== u(e, f)) {
                                    c = !1;
                                    break;
                                }
                            if (c) return n;
                        }
                    return -1;
                }
                function v(t, e, i, r) {
                    i = Number(i) || 0;
                    var s = t.length - i;
                    r ? (r = Number(r)) > s && (r = s) : (r = s);
                    var n = e.length;
                    if (n % 2 != 0) throw new TypeError("Invalid hex string");
                    r > n / 2 && (r = n / 2);
                    for (var a = 0; a < r; ++a) {
                        var o = parseInt(e.substr(2 * a, 2), 16);
                        if (isNaN(o)) return a;
                        t[i + a] = o;
                    }
                    return a;
                }
                function b(t, e, i, r) {
                    return q(U(e, t.length - i), t, i, r);
                }
                function w(t, e, i, r) {
                    return q(
                        (function (t) {
                            for (var e = [], i = 0; i < t.length; ++i) e.push(255 & t.charCodeAt(i));
                            return e;
                        })(e),
                        t,
                        i,
                        r
                    );
                }
                function M(t, e, i, r) {
                    return w(t, e, i, r);
                }
                function x(t, e, i, r) {
                    return q(F(e), t, i, r);
                }
                function k(t, e, i, r) {
                    return q(
                        (function (t, e) {
                            for (var i, r, s, n = [], a = 0; a < t.length && !((e -= 2) < 0); ++a) (i = t.charCodeAt(a)), (r = i >> 8), (s = i % 256), n.push(s), n.push(r);
                            return n;
                        })(e, t.length - i),
                        t,
                        i,
                        r
                    );
                }
                function S(t, e, i) {
                    return 0 === e && i === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, i));
                }
                function E(t, e, i) {
                    i = Math.min(t.length, i);
                    for (var r = [], s = e; s < i; ) {
                        var n,
                            a,
                            o,
                            h,
                            u = t[s],
                            l = null,
                            c = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
                        if (s + c <= i)
                            switch (c) {
                                case 1:
                                    u < 128 && (l = u);
                                    break;
                                case 2:
                                    128 == (192 & (n = t[s + 1])) && (h = ((31 & u) << 6) | (63 & n)) > 127 && (l = h);
                                    break;
                                case 3:
                                    (n = t[s + 1]), (a = t[s + 2]), 128 == (192 & n) && 128 == (192 & a) && (h = ((15 & u) << 12) | ((63 & n) << 6) | (63 & a)) > 2047 && (h < 55296 || h > 57343) && (l = h);
                                    break;
                                case 4:
                                    (n = t[s + 1]), (a = t[s + 2]), (o = t[s + 3]), 128 == (192 & n) && 128 == (192 & a) && 128 == (192 & o) && (h = ((15 & u) << 18) | ((63 & n) << 12) | ((63 & a) << 6) | (63 & o)) > 65535 && h < 1114112 && (l = h);
                            }
                        null === l ? ((l = 65533), (c = 1)) : l > 65535 && ((l -= 65536), r.push(((l >>> 10) & 1023) | 55296), (l = 56320 | (1023 & l))), r.push(l), (s += c);
                    }
                    return (function (t) {
                        var e = t.length;
                        if (e <= 4096) return String.fromCharCode.apply(String, t);
                        var i = "",
                            r = 0;
                        for (; r < e; ) i += String.fromCharCode.apply(String, t.slice(r, (r += 4096)));
                        return i;
                    })(r);
                }
                (e.Buffer = h),
                    (e.SlowBuffer = function (t) {
                        +t != t && (t = 0);
                        return h.alloc(+t);
                    }),
                    (e.INSPECT_MAX_BYTES = 50),
                    (h.TYPED_ARRAY_SUPPORT =
                        void 0 !== t.TYPED_ARRAY_SUPPORT
                            ? t.TYPED_ARRAY_SUPPORT
                            : (function () {
                                  try {
                                      var t = new Uint8Array(1);
                                      return (
                                          (t.__proto__ = {
                                              __proto__: Uint8Array.prototype,
                                              foo: function () {
                                                  return 42;
                                              },
                                          }),
                                          42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength
                                      );
                                  } catch (t) {
                                      return !1;
                                  }
                              })()),
                    (e.kMaxLength = a()),
                    (h.poolSize = 8192),
                    (h._augment = function (t) {
                        return (t.__proto__ = h.prototype), t;
                    }),
                    (h.from = function (t, e, i) {
                        return u(null, t, e, i);
                    }),
                    h.TYPED_ARRAY_SUPPORT && ((h.prototype.__proto__ = Uint8Array.prototype), (h.__proto__ = Uint8Array), "undefined" != typeof Symbol && Symbol.species && h[Symbol.species] === h && Object.defineProperty(h, Symbol.species, { value: null, configurable: !0 })),
                    (h.alloc = function (t, e, i) {
                        return (function (t, e, i, r) {
                            return l(e), e <= 0 ? o(t, e) : void 0 !== i ? ("string" == typeof r ? o(t, e).fill(i, r) : o(t, e).fill(i)) : o(t, e);
                        })(null, t, e, i);
                    }),
                    (h.allocUnsafe = function (t) {
                        return c(null, t);
                    }),
                    (h.allocUnsafeSlow = function (t) {
                        return c(null, t);
                    }),
                    (h.isBuffer = function (t) {
                        return !(null == t || !t._isBuffer);
                    }),
                    (h.compare = function (t, e) {
                        if (!h.isBuffer(t) || !h.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
                        if (t === e) return 0;
                        for (var i = t.length, r = e.length, s = 0, n = Math.min(i, r); s < n; ++s)
                            if (t[s] !== e[s]) {
                                (i = t[s]), (r = e[s]);
                                break;
                            }
                        return i < r ? -1 : r < i ? 1 : 0;
                    }),
                    (h.isEncoding = function (t) {
                        switch (String(t).toLowerCase()) {
                            case "hex":
                            case "utf8":
                            case "utf-8":
                            case "ascii":
                            case "latin1":
                            case "binary":
                            case "base64":
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                                return !0;
                            default:
                                return !1;
                        }
                    }),
                    (h.concat = function (t, e) {
                        if (!n(t)) throw new TypeError('"list" argument must be an Array of Buffers');
                        if (0 === t.length) return h.alloc(0);
                        var i;
                        if (void 0 === e) for (e = 0, i = 0; i < t.length; ++i) e += t[i].length;
                        var r = h.allocUnsafe(e),
                            s = 0;
                        for (i = 0; i < t.length; ++i) {
                            var a = t[i];
                            if (!h.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');
                            a.copy(r, s), (s += a.length);
                        }
                        return r;
                    }),
                    (h.byteLength = p),
                    (h.prototype._isBuffer = !0),
                    (h.prototype.swap16 = function () {
                        var t = this.length;
                        if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
                        for (var e = 0; e < t; e += 2) g(this, e, e + 1);
                        return this;
                    }),
                    (h.prototype.swap32 = function () {
                        var t = this.length;
                        if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
                        for (var e = 0; e < t; e += 4) g(this, e, e + 3), g(this, e + 1, e + 2);
                        return this;
                    }),
                    (h.prototype.swap64 = function () {
                        var t = this.length;
                        if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
                        for (var e = 0; e < t; e += 8) g(this, e, e + 7), g(this, e + 1, e + 6), g(this, e + 2, e + 5), g(this, e + 3, e + 4);
                        return this;
                    }),
                    (h.prototype.toString = function () {
                        var t = 0 | this.length;
                        return 0 === t ? "" : 0 === arguments.length ? E(this, 0, t) : m.apply(this, arguments);
                    }),
                    (h.prototype.equals = function (t) {
                        if (!h.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                        return this === t || 0 === h.compare(this, t);
                    }),
                    (h.prototype.inspect = function () {
                        var t = "",
                            i = e.INSPECT_MAX_BYTES;
                        return this.length > 0 && ((t = this.toString("hex", 0, i).match(/.{2}/g).join(" ")), this.length > i && (t += " ... ")), "<Buffer " + t + ">";
                    }),
                    (h.prototype.compare = function (t, e, i, r, s) {
                        if (!h.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
                        if ((void 0 === e && (e = 0), void 0 === i && (i = t ? t.length : 0), void 0 === r && (r = 0), void 0 === s && (s = this.length), e < 0 || i > t.length || r < 0 || s > this.length)) throw new RangeError("out of range index");
                        if (r >= s && e >= i) return 0;
                        if (r >= s) return -1;
                        if (e >= i) return 1;
                        if (this === t) return 0;
                        for (var n = (s >>>= 0) - (r >>>= 0), a = (i >>>= 0) - (e >>>= 0), o = Math.min(n, a), u = this.slice(r, s), l = t.slice(e, i), c = 0; c < o; ++c)
                            if (u[c] !== l[c]) {
                                (n = u[c]), (a = l[c]);
                                break;
                            }
                        return n < a ? -1 : a < n ? 1 : 0;
                    }),
                    (h.prototype.includes = function (t, e, i) {
                        return -1 !== this.indexOf(t, e, i);
                    }),
                    (h.prototype.indexOf = function (t, e, i) {
                        return _(this, t, e, i, !0);
                    }),
                    (h.prototype.lastIndexOf = function (t, e, i) {
                        return _(this, t, e, i, !1);
                    }),
                    (h.prototype.write = function (t, e, i, r) {
                        if (void 0 === e) (r = "utf8"), (i = this.length), (e = 0);
                        else if (void 0 === i && "string" == typeof e) (r = e), (i = this.length), (e = 0);
                        else {
                            if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                            (e |= 0), isFinite(i) ? ((i |= 0), void 0 === r && (r = "utf8")) : ((r = i), (i = void 0));
                        }
                        var s = this.length - e;
                        if (((void 0 === i || i > s) && (i = s), (t.length > 0 && (i < 0 || e < 0)) || e > this.length)) throw new RangeError("Attempt to write outside buffer bounds");
                        r || (r = "utf8");
                        for (var n = !1; ; )
                            switch (r) {
                                case "hex":
                                    return v(this, t, e, i);
                                case "utf8":
                                case "utf-8":
                                    return b(this, t, e, i);
                                case "ascii":
                                    return w(this, t, e, i);
                                case "latin1":
                                case "binary":
                                    return M(this, t, e, i);
                                case "base64":
                                    return x(this, t, e, i);
                                case "ucs2":
                                case "ucs-2":
                                case "utf16le":
                                case "utf-16le":
                                    return k(this, t, e, i);
                                default:
                                    if (n) throw new TypeError("Unknown encoding: " + r);
                                    (r = ("" + r).toLowerCase()), (n = !0);
                            }
                    }),
                    (h.prototype.toJSON = function () {
                        return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
                    });
                function C(t, e, i) {
                    var r = "";
                    i = Math.min(t.length, i);
                    for (var s = e; s < i; ++s) r += String.fromCharCode(127 & t[s]);
                    return r;
                }
                function A(t, e, i) {
                    var r = "";
                    i = Math.min(t.length, i);
                    for (var s = e; s < i; ++s) r += String.fromCharCode(t[s]);
                    return r;
                }
                function I(t, e, i) {
                    var r = t.length;
                    (!e || e < 0) && (e = 0), (!i || i < 0 || i > r) && (i = r);
                    for (var s = "", n = e; n < i; ++n) s += j(t[n]);
                    return s;
                }
                function O(t, e, i) {
                    for (var r = t.slice(e, i), s = "", n = 0; n < r.length; n += 2) s += String.fromCharCode(r[n] + 256 * r[n + 1]);
                    return s;
                }
                function T(t, e, i) {
                    if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
                    if (t + e > i) throw new RangeError("Trying to access beyond buffer length");
                }
                function z(t, e, i, r, s, n) {
                    if (!h.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
                    if (e > s || e < n) throw new RangeError('"value" argument is out of bounds');
                    if (i + r > t.length) throw new RangeError("Index out of range");
                }
                function P(t, e, i, r) {
                    e < 0 && (e = 65535 + e + 1);
                    for (var s = 0, n = Math.min(t.length - i, 2); s < n; ++s) t[i + s] = (e & (255 << (8 * (r ? s : 1 - s)))) >>> (8 * (r ? s : 1 - s));
                }
                function N(t, e, i, r) {
                    e < 0 && (e = 4294967295 + e + 1);
                    for (var s = 0, n = Math.min(t.length - i, 4); s < n; ++s) t[i + s] = (e >>> (8 * (r ? s : 3 - s))) & 255;
                }
                function L(t, e, i, r, s, n) {
                    if (i + r > t.length) throw new RangeError("Index out of range");
                    if (i < 0) throw new RangeError("Index out of range");
                }
                function R(t, e, i, r, n) {
                    return n || L(t, 0, i, 4), s.write(t, e, i, r, 23, 4), i + 4;
                }
                function B(t, e, i, r, n) {
                    return n || L(t, 0, i, 8), s.write(t, e, i, r, 52, 8), i + 8;
                }
                (h.prototype.slice = function (t, e) {
                    var i,
                        r = this.length;
                    if (((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), (e = void 0 === e ? r : ~~e) < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t), h.TYPED_ARRAY_SUPPORT)) (i = this.subarray(t, e)).__proto__ = h.prototype;
                    else {
                        var s = e - t;
                        i = new h(s, void 0);
                        for (var n = 0; n < s; ++n) i[n] = this[n + t];
                    }
                    return i;
                }),
                    (h.prototype.readUIntLE = function (t, e, i) {
                        (t |= 0), (e |= 0), i || T(t, e, this.length);
                        for (var r = this[t], s = 1, n = 0; ++n < e && (s *= 256); ) r += this[t + n] * s;
                        return r;
                    }),
                    (h.prototype.readUIntBE = function (t, e, i) {
                        (t |= 0), (e |= 0), i || T(t, e, this.length);
                        for (var r = this[t + --e], s = 1; e > 0 && (s *= 256); ) r += this[t + --e] * s;
                        return r;
                    }),
                    (h.prototype.readUInt8 = function (t, e) {
                        return e || T(t, 1, this.length), this[t];
                    }),
                    (h.prototype.readUInt16LE = function (t, e) {
                        return e || T(t, 2, this.length), this[t] | (this[t + 1] << 8);
                    }),
                    (h.prototype.readUInt16BE = function (t, e) {
                        return e || T(t, 2, this.length), (this[t] << 8) | this[t + 1];
                    }),
                    (h.prototype.readUInt32LE = function (t, e) {
                        return e || T(t, 4, this.length), (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) + 16777216 * this[t + 3];
                    }),
                    (h.prototype.readUInt32BE = function (t, e) {
                        return e || T(t, 4, this.length), 16777216 * this[t] + ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]);
                    }),
                    (h.prototype.readIntLE = function (t, e, i) {
                        (t |= 0), (e |= 0), i || T(t, e, this.length);
                        for (var r = this[t], s = 1, n = 0; ++n < e && (s *= 256); ) r += this[t + n] * s;
                        return r >= (s *= 128) && (r -= Math.pow(2, 8 * e)), r;
                    }),
                    (h.prototype.readIntBE = function (t, e, i) {
                        (t |= 0), (e |= 0), i || T(t, e, this.length);
                        for (var r = e, s = 1, n = this[t + --r]; r > 0 && (s *= 256); ) n += this[t + --r] * s;
                        return n >= (s *= 128) && (n -= Math.pow(2, 8 * e)), n;
                    }),
                    (h.prototype.readInt8 = function (t, e) {
                        return e || T(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
                    }),
                    (h.prototype.readInt16LE = function (t, e) {
                        e || T(t, 2, this.length);
                        var i = this[t] | (this[t + 1] << 8);
                        return 32768 & i ? 4294901760 | i : i;
                    }),
                    (h.prototype.readInt16BE = function (t, e) {
                        e || T(t, 2, this.length);
                        var i = this[t + 1] | (this[t] << 8);
                        return 32768 & i ? 4294901760 | i : i;
                    }),
                    (h.prototype.readInt32LE = function (t, e) {
                        return e || T(t, 4, this.length), this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24);
                    }),
                    (h.prototype.readInt32BE = function (t, e) {
                        return e || T(t, 4, this.length), (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3];
                    }),
                    (h.prototype.readFloatLE = function (t, e) {
                        return e || T(t, 4, this.length), s.read(this, t, !0, 23, 4);
                    }),
                    (h.prototype.readFloatBE = function (t, e) {
                        return e || T(t, 4, this.length), s.read(this, t, !1, 23, 4);
                    }),
                    (h.prototype.readDoubleLE = function (t, e) {
                        return e || T(t, 8, this.length), s.read(this, t, !0, 52, 8);
                    }),
                    (h.prototype.readDoubleBE = function (t, e) {
                        return e || T(t, 8, this.length), s.read(this, t, !1, 52, 8);
                    }),
                    (h.prototype.writeUIntLE = function (t, e, i, r) {
                        ((t = +t), (e |= 0), (i |= 0), r) || z(this, t, e, i, Math.pow(2, 8 * i) - 1, 0);
                        var s = 1,
                            n = 0;
                        for (this[e] = 255 & t; ++n < i && (s *= 256); ) this[e + n] = (t / s) & 255;
                        return e + i;
                    }),
                    (h.prototype.writeUIntBE = function (t, e, i, r) {
                        ((t = +t), (e |= 0), (i |= 0), r) || z(this, t, e, i, Math.pow(2, 8 * i) - 1, 0);
                        var s = i - 1,
                            n = 1;
                        for (this[e + s] = 255 & t; --s >= 0 && (n *= 256); ) this[e + s] = (t / n) & 255;
                        return e + i;
                    }),
                    (h.prototype.writeUInt8 = function (t, e, i) {
                        return (t = +t), (e |= 0), i || z(this, t, e, 1, 255, 0), h.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), (this[e] = 255 & t), e + 1;
                    }),
                    (h.prototype.writeUInt16LE = function (t, e, i) {
                        return (t = +t), (e |= 0), i || z(this, t, e, 2, 65535, 0), h.TYPED_ARRAY_SUPPORT ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8)) : P(this, t, e, !0), e + 2;
                    }),
                    (h.prototype.writeUInt16BE = function (t, e, i) {
                        return (t = +t), (e |= 0), i || z(this, t, e, 2, 65535, 0), h.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t)) : P(this, t, e, !1), e + 2;
                    }),
                    (h.prototype.writeUInt32LE = function (t, e, i) {
                        return (t = +t), (e |= 0), i || z(this, t, e, 4, 4294967295, 0), h.TYPED_ARRAY_SUPPORT ? ((this[e + 3] = t >>> 24), (this[e + 2] = t >>> 16), (this[e + 1] = t >>> 8), (this[e] = 255 & t)) : N(this, t, e, !0), e + 4;
                    }),
                    (h.prototype.writeUInt32BE = function (t, e, i) {
                        return (t = +t), (e |= 0), i || z(this, t, e, 4, 4294967295, 0), h.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 24), (this[e + 1] = t >>> 16), (this[e + 2] = t >>> 8), (this[e + 3] = 255 & t)) : N(this, t, e, !1), e + 4;
                    }),
                    (h.prototype.writeIntLE = function (t, e, i, r) {
                        if (((t = +t), (e |= 0), !r)) {
                            var s = Math.pow(2, 8 * i - 1);
                            z(this, t, e, i, s - 1, -s);
                        }
                        var n = 0,
                            a = 1,
                            o = 0;
                        for (this[e] = 255 & t; ++n < i && (a *= 256); ) t < 0 && 0 === o && 0 !== this[e + n - 1] && (o = 1), (this[e + n] = (((t / a) >> 0) - o) & 255);
                        return e + i;
                    }),
                    (h.prototype.writeIntBE = function (t, e, i, r) {
                        if (((t = +t), (e |= 0), !r)) {
                            var s = Math.pow(2, 8 * i - 1);
                            z(this, t, e, i, s - 1, -s);
                        }
                        var n = i - 1,
                            a = 1,
                            o = 0;
                        for (this[e + n] = 255 & t; --n >= 0 && (a *= 256); ) t < 0 && 0 === o && 0 !== this[e + n + 1] && (o = 1), (this[e + n] = (((t / a) >> 0) - o) & 255);
                        return e + i;
                    }),
                    (h.prototype.writeInt8 = function (t, e, i) {
                        return (t = +t), (e |= 0), i || z(this, t, e, 1, 127, -128), h.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), (this[e] = 255 & t), e + 1;
                    }),
                    (h.prototype.writeInt16LE = function (t, e, i) {
                        return (t = +t), (e |= 0), i || z(this, t, e, 2, 32767, -32768), h.TYPED_ARRAY_SUPPORT ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8)) : P(this, t, e, !0), e + 2;
                    }),
                    (h.prototype.writeInt16BE = function (t, e, i) {
                        return (t = +t), (e |= 0), i || z(this, t, e, 2, 32767, -32768), h.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t)) : P(this, t, e, !1), e + 2;
                    }),
                    (h.prototype.writeInt32LE = function (t, e, i) {
                        return (t = +t), (e |= 0), i || z(this, t, e, 4, 2147483647, -2147483648), h.TYPED_ARRAY_SUPPORT ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8), (this[e + 2] = t >>> 16), (this[e + 3] = t >>> 24)) : N(this, t, e, !0), e + 4;
                    }),
                    (h.prototype.writeInt32BE = function (t, e, i) {
                        return (t = +t), (e |= 0), i || z(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), h.TYPED_ARRAY_SUPPORT ? ((this[e] = t >>> 24), (this[e + 1] = t >>> 16), (this[e + 2] = t >>> 8), (this[e + 3] = 255 & t)) : N(this, t, e, !1), e + 4;
                    }),
                    (h.prototype.writeFloatLE = function (t, e, i) {
                        return R(this, t, e, !0, i);
                    }),
                    (h.prototype.writeFloatBE = function (t, e, i) {
                        return R(this, t, e, !1, i);
                    }),
                    (h.prototype.writeDoubleLE = function (t, e, i) {
                        return B(this, t, e, !0, i);
                    }),
                    (h.prototype.writeDoubleBE = function (t, e, i) {
                        return B(this, t, e, !1, i);
                    }),
                    (h.prototype.copy = function (t, e, i, r) {
                        if ((i || (i = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < i && (r = i), r === i)) return 0;
                        if (0 === t.length || 0 === this.length) return 0;
                        if (e < 0) throw new RangeError("targetStart out of bounds");
                        if (i < 0 || i >= this.length) throw new RangeError("sourceStart out of bounds");
                        if (r < 0) throw new RangeError("sourceEnd out of bounds");
                        r > this.length && (r = this.length), t.length - e < r - i && (r = t.length - e + i);
                        var s,
                            n = r - i;
                        if (this === t && i < e && e < r) for (s = n - 1; s >= 0; --s) t[s + e] = this[s + i];
                        else if (n < 1e3 || !h.TYPED_ARRAY_SUPPORT) for (s = 0; s < n; ++s) t[s + e] = this[s + i];
                        else Uint8Array.prototype.set.call(t, this.subarray(i, i + n), e);
                        return n;
                    }),
                    (h.prototype.fill = function (t, e, i, r) {
                        if ("string" == typeof t) {
                            if (("string" == typeof e ? ((r = e), (e = 0), (i = this.length)) : "string" == typeof i && ((r = i), (i = this.length)), 1 === t.length)) {
                                var s = t.charCodeAt(0);
                                s < 256 && (t = s);
                            }
                            if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
                            if ("string" == typeof r && !h.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
                        } else "number" == typeof t && (t &= 255);
                        if (e < 0 || this.length < e || this.length < i) throw new RangeError("Out of range index");
                        if (i <= e) return this;
                        var n;
                        if (((e >>>= 0), (i = void 0 === i ? this.length : i >>> 0), t || (t = 0), "number" == typeof t)) for (n = e; n < i; ++n) this[n] = t;
                        else {
                            var a = h.isBuffer(t) ? t : U(new h(t, r).toString()),
                                o = a.length;
                            for (n = 0; n < i - e; ++n) this[n + e] = a[n % o];
                        }
                        return this;
                    });
                var D = /[^+\/0-9A-Za-z-_]/g;
                function j(t) {
                    return t < 16 ? "0" + t.toString(16) : t.toString(16);
                }
                function U(t, e) {
                    var i;
                    e = e || 1 / 0;
                    for (var r = t.length, s = null, n = [], a = 0; a < r; ++a) {
                        if ((i = t.charCodeAt(a)) > 55295 && i < 57344) {
                            if (!s) {
                                if (i > 56319) {
                                    (e -= 3) > -1 && n.push(239, 191, 189);
                                    continue;
                                }
                                if (a + 1 === r) {
                                    (e -= 3) > -1 && n.push(239, 191, 189);
                                    continue;
                                }
                                s = i;
                                continue;
                            }
                            if (i < 56320) {
                                (e -= 3) > -1 && n.push(239, 191, 189), (s = i);
                                continue;
                            }
                            i = 65536 + (((s - 55296) << 10) | (i - 56320));
                        } else s && (e -= 3) > -1 && n.push(239, 191, 189);
                        if (((s = null), i < 128)) {
                            if ((e -= 1) < 0) break;
                            n.push(i);
                        } else if (i < 2048) {
                            if ((e -= 2) < 0) break;
                            n.push((i >> 6) | 192, (63 & i) | 128);
                        } else if (i < 65536) {
                            if ((e -= 3) < 0) break;
                            n.push((i >> 12) | 224, ((i >> 6) & 63) | 128, (63 & i) | 128);
                        } else {
                            if (!(i < 1114112)) throw new Error("Invalid code point");
                            if ((e -= 4) < 0) break;
                            n.push((i >> 18) | 240, ((i >> 12) & 63) | 128, ((i >> 6) & 63) | 128, (63 & i) | 128);
                        }
                    }
                    return n;
                }
                function F(t) {
                    return r.toByteArray(
                        (function (t) {
                            if (
                                (t = (function (t) {
                                    return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
                                })(t).replace(D, "")).length < 2
                            )
                                return "";
                            for (; t.length % 4 != 0; ) t += "=";
                            return t;
                        })(t)
                    );
                }
                function q(t, e, i, r) {
                    for (var s = 0; s < r && !(s + i >= e.length || s >= t.length); ++s) e[s + i] = t[s];
                    return s;
                }
            }).call(this, i(0));
        },
        function (t, e) {
            var i,
                r,
                s = (t.exports = {});
            function n() {
                throw new Error("setTimeout has not been defined");
            }
            function a() {
                throw new Error("clearTimeout has not been defined");
            }
            function o(t) {
                if (i === setTimeout) return setTimeout(t, 0);
                if ((i === n || !i) && setTimeout) return (i = setTimeout), setTimeout(t, 0);
                try {
                    return i(t, 0);
                } catch (e) {
                    try {
                        return i.call(null, t, 0);
                    } catch (e) {
                        return i.call(this, t, 0);
                    }
                }
            }
            !(function () {
                try {
                    i = "function" == typeof setTimeout ? setTimeout : n;
                } catch (t) {
                    i = n;
                }
                try {
                    r = "function" == typeof clearTimeout ? clearTimeout : a;
                } catch (t) {
                    r = a;
                }
            })();
            var h,
                u = [],
                l = !1,
                c = -1;
            function f() {
                l && h && ((l = !1), h.length ? (u = h.concat(u)) : (c = -1), u.length && d());
            }
            function d() {
                if (!l) {
                    var t = o(f);
                    l = !0;
                    for (var e = u.length; e; ) {
                        for (h = u, u = []; ++c < e; ) h && h[c].run();
                        (c = -1), (e = u.length);
                    }
                    (h = null),
                        (l = !1),
                        (function (t) {
                            if (r === clearTimeout) return clearTimeout(t);
                            if ((r === a || !r) && clearTimeout) return (r = clearTimeout), clearTimeout(t);
                            try {
                                r(t);
                            } catch (e) {
                                try {
                                    return r.call(null, t);
                                } catch (e) {
                                    return r.call(this, t);
                                }
                            }
                        })(t);
                }
            }
            function p(t, e) {
                (this.fun = t), (this.array = e);
            }
            function m() {}
            (s.nextTick = function (t) {
                var e = new Array(arguments.length - 1);
                if (arguments.length > 1) for (var i = 1; i < arguments.length; i++) e[i - 1] = arguments[i];
                u.push(new p(t, e)), 1 !== u.length || l || o(d);
            }),
                (p.prototype.run = function () {
                    this.fun.apply(null, this.array);
                }),
                (s.title = "browser"),
                (s.browser = !0),
                (s.env = {}),
                (s.argv = []),
                (s.version = ""),
                (s.versions = {}),
                (s.on = m),
                (s.addListener = m),
                (s.once = m),
                (s.off = m),
                (s.removeListener = m),
                (s.removeAllListeners = m),
                (s.emit = m),
                (s.prependListener = m),
                (s.prependOnceListener = m),
                (s.listeners = function (t) {
                    return [];
                }),
                (s.binding = function (t) {
                    throw new Error("process.binding is not supported");
                }),
                (s.cwd = function () {
                    return "/";
                }),
                (s.chdir = function (t) {
                    throw new Error("process.chdir is not supported");
                }),
                (s.umask = function () {
                    return 0;
                });
        },
        function (t, e, i) {
            "use strict";
            var r = i(17);
            function s() {}
            var n = {},
                a = ["REJECTED"],
                o = ["FULFILLED"],
                h = ["PENDING"];
            function u(t) {
                if ("function" != typeof t) throw new TypeError("resolver must be a function");
                (this.state = h), (this.queue = []), (this.outcome = void 0), t !== s && d(this, t);
            }
            function l(t, e, i) {
                (this.promise = t), "function" == typeof e && ((this.onFulfilled = e), (this.callFulfilled = this.otherCallFulfilled)), "function" == typeof i && ((this.onRejected = i), (this.callRejected = this.otherCallRejected));
            }
            function c(t, e, i) {
                r(function () {
                    var r;
                    try {
                        r = e(i);
                    } catch (e) {
                        return n.reject(t, e);
                    }
                    r === t ? n.reject(t, new TypeError("Cannot resolve promise with itself")) : n.resolve(t, r);
                });
            }
            function f(t) {
                var e = t && t.then;
                if (t && ("object" == typeof t || "function" == typeof t) && "function" == typeof e)
                    return function () {
                        e.apply(t, arguments);
                    };
            }
            function d(t, e) {
                var i = !1;
                function r(e) {
                    i || ((i = !0), n.reject(t, e));
                }
                function s(e) {
                    i || ((i = !0), n.resolve(t, e));
                }
                var a = p(function () {
                    e(s, r);
                });
                "error" === a.status && r(a.value);
            }
            function p(t, e) {
                var i = {};
                try {
                    (i.value = t(e)), (i.status = "success");
                } catch (t) {
                    (i.status = "error"), (i.value = t);
                }
                return i;
            }
            (t.exports = u),
                (u.prototype.finally = function (t) {
                    if ("function" != typeof t) return this;
                    var e = this.constructor;
                    return this.then(
                        function (i) {
                            return e.resolve(t()).then(function () {
                                return i;
                            });
                        },
                        function (i) {
                            return e.resolve(t()).then(function () {
                                throw i;
                            });
                        }
                    );
                }),
                (u.prototype.catch = function (t) {
                    return this.then(null, t);
                }),
                (u.prototype.then = function (t, e) {
                    if (("function" != typeof t && this.state === o) || ("function" != typeof e && this.state === a)) return this;
                    var i = new this.constructor(s);
                    this.state !== h ? c(i, this.state === o ? t : e, this.outcome) : this.queue.push(new l(i, t, e));
                    return i;
                }),
                (l.prototype.callFulfilled = function (t) {
                    n.resolve(this.promise, t);
                }),
                (l.prototype.otherCallFulfilled = function (t) {
                    c(this.promise, this.onFulfilled, t);
                }),
                (l.prototype.callRejected = function (t) {
                    n.reject(this.promise, t);
                }),
                (l.prototype.otherCallRejected = function (t) {
                    c(this.promise, this.onRejected, t);
                }),
                (n.resolve = function (t, e) {
                    var i = p(f, e);
                    if ("error" === i.status) return n.reject(t, i.value);
                    var r = i.value;
                    if (r) d(t, r);
                    else {
                        (t.state = o), (t.outcome = e);
                        for (var s = -1, a = t.queue.length; ++s < a; ) t.queue[s].callFulfilled(e);
                    }
                    return t;
                }),
                (n.reject = function (t, e) {
                    (t.state = a), (t.outcome = e);
                    for (var i = -1, r = t.queue.length; ++i < r; ) t.queue[i].callRejected(e);
                    return t;
                }),
                (u.resolve = function (t) {
                    if (t instanceof this) return t;
                    return n.resolve(new this(s), t);
                }),
                (u.reject = function (t) {
                    var e = new this(s);
                    return n.reject(e, t);
                }),
                (u.all = function (t) {
                    var e = this;
                    if ("[object Array]" !== Object.prototype.toString.call(t)) return this.reject(new TypeError("must be an array"));
                    var i = t.length,
                        r = !1;
                    if (!i) return this.resolve([]);
                    var a = new Array(i),
                        o = 0,
                        h = -1,
                        u = new this(s);
                    for (; ++h < i; ) l(t[h], h);
                    return u;
                    function l(t, s) {
                        e.resolve(t).then(
                            function (t) {
                                (a[s] = t), ++o !== i || r || ((r = !0), n.resolve(u, a));
                            },
                            function (t) {
                                r || ((r = !0), n.reject(u, t));
                            }
                        );
                    }
                }),
                (u.race = function (t) {
                    var e = this;
                    if ("[object Array]" !== Object.prototype.toString.call(t)) return this.reject(new TypeError("must be an array"));
                    var i = t.length,
                        r = !1;
                    if (!i) return this.resolve([]);
                    var a = -1,
                        o = new this(s);
                    for (; ++a < i; )
                        (h = t[a]),
                            e.resolve(h).then(
                                function (t) {
                                    r || ((r = !0), n.resolve(o, t));
                                },
                                function (t) {
                                    r || ((r = !0), n.reject(o, t));
                                }
                            );
                    var h;
                    return o;
                });
        },
        function (t, e, i) {
            (function (e) {
                const i = e.URL;
                t.exports = (t, e) => {
                    if (!e) return t;
                    const r = new i(t);
                    return (r.pathname = `${r.pathname}.${e}`), r.href;
                };
            }).call(this, i(0));
        },
        function (t, e, i) {
            "use strict";
            i.r(e),
                i.d(e, "toGeoJSON", function () {
                    return n;
                }),
                i.d(e, "parseShp", function () {
                    return a;
                }),
                i.d(e, "parseDbf", function () {
                    return o;
                }),
                i.d(e, "parseZip", function () {
                    return h;
                }),
                i.d(e, "getShapefile", function () {
                    return u;
                }),
                i.d(e, "combine", function () {
                    return l;
                });
            var r = i(1),
                s = i.n(r);
            function n(t, e, i) {
                return s()(t, e, i);
            }
            function a(t, e) {
                return t.parseShp(t, e);
            }
            function o(t, e) {
                return s.a.parseDbf(t, e);
            }
            function h(t, e, i) {
                return s.a.parseZip(t, e, i);
            }
            function u(t, e, i) {
                return s.a.getShapefile(t, e, i);
            }
            function l(t) {
                return s.a.combine(t);
            }
        },
        function (t, e, i) {
            "use strict";
            const r = i(8);
            t.exports = async (t) => {
                const e = new r();
                await e.loadAsync(t);
                const i = e.file(/.+/),
                    s = {};
                return (
                    await Promise.all(
                        i.map(async (t) => {
                            let e;
                            (e = "shp" === t.name.slice(-3).toLowerCase() || "dbf" === t.name.slice(-3).toLowerCase() ? await t.async("nodebuffer") : await t.async("text")), (s[t.name] = e);
                        })
                    ),
                    s
                );
            };
        },
        function (t, e, i) {
            (function (e, r, s, n) {
                t.exports = (function t(e, r, s) {
                    function n(o, h) {
                        if (!r[o]) {
                            if (!e[o]) {
                                if (!h && i(14)) return (void 0)(o, !0);
                                if (a) return a(o, !0);
                                var u = new Error("Cannot find module '" + o + "'");
                                throw ((u.code = "MODULE_NOT_FOUND"), u);
                            }
                            var l = (r[o] = { exports: {} });
                            e[o][0].call(
                                l.exports,
                                function (t) {
                                    return n(e[o][1][t] || t);
                                },
                                l,
                                l.exports,
                                t,
                                e,
                                r,
                                s
                            );
                        }
                        return r[o].exports;
                    }
                    for (var a = !1, o = 0; o < s.length; o++) n(s[o]);
                    return n;
                })(
                    {
                        1: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("./utils"),
                                    s = t("./support"),
                                    n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                                (i.encode = function (t) {
                                    for (var e, i, s, a, o, h, u, l = [], c = 0, f = t.length, d = f, p = "string" !== r.getTypeOf(t); c < t.length; )
                                        (d = f - c),
                                            (s = p ? ((e = t[c++]), (i = c < f ? t[c++] : 0), c < f ? t[c++] : 0) : ((e = t.charCodeAt(c++)), (i = c < f ? t.charCodeAt(c++) : 0), c < f ? t.charCodeAt(c++) : 0)),
                                            (a = e >> 2),
                                            (o = ((3 & e) << 4) | (i >> 4)),
                                            (h = 1 < d ? ((15 & i) << 2) | (s >> 6) : 64),
                                            (u = 2 < d ? 63 & s : 64),
                                            l.push(n.charAt(a) + n.charAt(o) + n.charAt(h) + n.charAt(u));
                                    return l.join("");
                                }),
                                    (i.decode = function (t) {
                                        var e,
                                            i,
                                            r,
                                            a,
                                            o,
                                            h,
                                            u = 0,
                                            l = 0,
                                            c = "data:";
                                        if (t.substr(0, c.length) === c) throw new Error("Invalid base64 input, it looks like a data url.");
                                        var f,
                                            d = (3 * (t = t.replace(/[^A-Za-z0-9+/=]/g, "")).length) / 4;
                                        if ((t.charAt(t.length - 1) === n.charAt(64) && d--, t.charAt(t.length - 2) === n.charAt(64) && d--, d % 1 != 0)) throw new Error("Invalid base64 input, bad content length.");
                                        for (f = s.uint8array ? new Uint8Array(0 | d) : new Array(0 | d); u < t.length; )
                                            (e = (n.indexOf(t.charAt(u++)) << 2) | ((a = n.indexOf(t.charAt(u++))) >> 4)),
                                                (i = ((15 & a) << 4) | ((o = n.indexOf(t.charAt(u++))) >> 2)),
                                                (r = ((3 & o) << 6) | (h = n.indexOf(t.charAt(u++)))),
                                                (f[l++] = e),
                                                64 !== o && (f[l++] = i),
                                                64 !== h && (f[l++] = r);
                                        return f;
                                    });
                            },
                            { "./support": 30, "./utils": 32 },
                        ],
                        2: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("./external"),
                                    s = t("./stream/DataWorker"),
                                    n = t("./stream/Crc32Probe"),
                                    a = t("./stream/DataLengthProbe");
                                function o(t, e, i, r, s) {
                                    (this.compressedSize = t), (this.uncompressedSize = e), (this.crc32 = i), (this.compression = r), (this.compressedContent = s);
                                }
                                (o.prototype = {
                                    getContentWorker: function () {
                                        var t = new s(r.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")),
                                            e = this;
                                        return (
                                            t.on("end", function () {
                                                if (this.streamInfo.data_length !== e.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
                                            }),
                                            t
                                        );
                                    },
                                    getCompressedWorker: function () {
                                        return new s(r.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
                                    },
                                }),
                                    (o.createWorkerFrom = function (t, e, i) {
                                        return t.pipe(new n()).pipe(new a("uncompressedSize")).pipe(e.compressWorker(i)).pipe(new a("compressedSize")).withStreamInfo("compression", e);
                                    }),
                                    (e.exports = o);
                            },
                            { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 },
                        ],
                        3: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("./stream/GenericWorker");
                                (i.STORE = {
                                    magic: "\0\0",
                                    compressWorker: function () {
                                        return new r("STORE compression");
                                    },
                                    uncompressWorker: function () {
                                        return new r("STORE decompression");
                                    },
                                }),
                                    (i.DEFLATE = t("./flate"));
                            },
                            { "./flate": 7, "./stream/GenericWorker": 28 },
                        ],
                        4: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("./utils"),
                                    s = (function () {
                                        for (var t, e = [], i = 0; i < 256; i++) {
                                            t = i;
                                            for (var r = 0; r < 8; r++) t = 1 & t ? 3988292384 ^ (t >>> 1) : t >>> 1;
                                            e[i] = t;
                                        }
                                        return e;
                                    })();
                                e.exports = function (t, e) {
                                    return void 0 !== t && t.length
                                        ? "string" !== r.getTypeOf(t)
                                            ? (function (t, e, i, r) {
                                                  var n = s,
                                                      a = 0 + i;
                                                  t ^= -1;
                                                  for (var o = 0; o < a; o++) t = (t >>> 8) ^ n[255 & (t ^ e[o])];
                                                  return -1 ^ t;
                                              })(0 | e, t, t.length)
                                            : (function (t, e, i, r) {
                                                  var n = s,
                                                      a = 0 + i;
                                                  t ^= -1;
                                                  for (var o = 0; o < a; o++) t = (t >>> 8) ^ n[255 & (t ^ e.charCodeAt(o))];
                                                  return -1 ^ t;
                                              })(0 | e, t, t.length)
                                        : 0;
                                };
                            },
                            { "./utils": 32 },
                        ],
                        5: [
                            function (t, e, i) {
                                "use strict";
                                (i.base64 = !1), (i.binary = !1), (i.dir = !1), (i.createFolders = !0), (i.date = null), (i.compression = null), (i.compressionOptions = null), (i.comment = null), (i.unixPermissions = null), (i.dosPermissions = null);
                            },
                            {},
                        ],
                        6: [
                            function (t, e, i) {
                                "use strict";
                                var r;
                                (r = "undefined" != typeof Promise ? Promise : t("lie")), (e.exports = { Promise: r });
                            },
                            { lie: 37 },
                        ],
                        7: [
                            function (t, e, i) {
                                "use strict";
                                var r = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array,
                                    s = t("pako"),
                                    n = t("./utils"),
                                    a = t("./stream/GenericWorker"),
                                    o = r ? "uint8array" : "array";
                                function h(t, e) {
                                    a.call(this, "FlateWorker/" + t), (this._pako = null), (this._pakoAction = t), (this._pakoOptions = e), (this.meta = {});
                                }
                                (i.magic = "\b\0"),
                                    n.inherits(h, a),
                                    (h.prototype.processChunk = function (t) {
                                        (this.meta = t.meta), null === this._pako && this._createPako(), this._pako.push(n.transformTo(o, t.data), !1);
                                    }),
                                    (h.prototype.flush = function () {
                                        a.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], !0);
                                    }),
                                    (h.prototype.cleanUp = function () {
                                        a.prototype.cleanUp.call(this), (this._pako = null);
                                    }),
                                    (h.prototype._createPako = function () {
                                        this._pako = new s[this._pakoAction]({ raw: !0, level: this._pakoOptions.level || -1 });
                                        var t = this;
                                        this._pako.onData = function (e) {
                                            t.push({ data: e, meta: t.meta });
                                        };
                                    }),
                                    (i.compressWorker = function (t) {
                                        return new h("Deflate", t);
                                    }),
                                    (i.uncompressWorker = function () {
                                        return new h("Inflate", {});
                                    });
                            },
                            { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 },
                        ],
                        8: [
                            function (t, e, i) {
                                "use strict";
                                function r(t, e) {
                                    var i,
                                        r = "";
                                    for (i = 0; i < e; i++) (r += String.fromCharCode(255 & t)), (t >>>= 8);
                                    return r;
                                }
                                function s(t, e, i, s, a, l) {
                                    var c,
                                        f,
                                        d = t.file,
                                        p = t.compression,
                                        m = l !== o.utf8encode,
                                        g = n.transformTo("string", l(d.name)),
                                        _ = n.transformTo("string", o.utf8encode(d.name)),
                                        y = d.comment,
                                        v = n.transformTo("string", l(y)),
                                        b = n.transformTo("string", o.utf8encode(y)),
                                        w = _.length !== d.name.length,
                                        M = b.length !== y.length,
                                        x = "",
                                        k = "",
                                        S = "",
                                        E = d.dir,
                                        C = d.date,
                                        A = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
                                    (e && !i) || ((A.crc32 = t.crc32), (A.compressedSize = t.compressedSize), (A.uncompressedSize = t.uncompressedSize));
                                    var I = 0;
                                    e && (I |= 8), m || (!w && !M) || (I |= 2048);
                                    var O = 0,
                                        T = 0;
                                    E && (O |= 16),
                                        "UNIX" === a
                                            ? ((T = 798),
                                              (O |= (function (t, e) {
                                                  var i = t;
                                                  return t || (i = e ? 16893 : 33204), (65535 & i) << 16;
                                              })(d.unixPermissions, E)))
                                            : ((T = 20),
                                              (O |= (function (t) {
                                                  return 63 & (t || 0);
                                              })(d.dosPermissions))),
                                        (c = C.getUTCHours()),
                                        (c <<= 6),
                                        (c |= C.getUTCMinutes()),
                                        (c <<= 5),
                                        (c |= C.getUTCSeconds() / 2),
                                        (f = C.getUTCFullYear() - 1980),
                                        (f <<= 4),
                                        (f |= C.getUTCMonth() + 1),
                                        (f <<= 5),
                                        (f |= C.getUTCDate()),
                                        w && ((k = r(1, 1) + r(h(g), 4) + _), (x += "up" + r(k.length, 2) + k)),
                                        M && ((S = r(1, 1) + r(h(v), 4) + b), (x += "uc" + r(S.length, 2) + S));
                                    var z = "";
                                    return (
                                        (z += "\n\0"),
                                        (z += r(I, 2)),
                                        (z += p.magic),
                                        (z += r(c, 2)),
                                        (z += r(f, 2)),
                                        (z += r(A.crc32, 4)),
                                        (z += r(A.compressedSize, 4)),
                                        (z += r(A.uncompressedSize, 4)),
                                        (z += r(g.length, 2)),
                                        (z += r(x.length, 2)),
                                        { fileRecord: u.LOCAL_FILE_HEADER + z + g + x, dirRecord: u.CENTRAL_FILE_HEADER + r(T, 2) + z + r(v.length, 2) + "\0\0\0\0" + r(O, 4) + r(s, 4) + g + x + v }
                                    );
                                }
                                var n = t("../utils"),
                                    a = t("../stream/GenericWorker"),
                                    o = t("../utf8"),
                                    h = t("../crc32"),
                                    u = t("../signature");
                                function l(t, e, i, r) {
                                    a.call(this, "ZipFileWorker"),
                                        (this.bytesWritten = 0),
                                        (this.zipComment = e),
                                        (this.zipPlatform = i),
                                        (this.encodeFileName = r),
                                        (this.streamFiles = t),
                                        (this.accumulate = !1),
                                        (this.contentBuffer = []),
                                        (this.dirRecords = []),
                                        (this.currentSourceOffset = 0),
                                        (this.entriesCount = 0),
                                        (this.currentFile = null),
                                        (this._sources = []);
                                }
                                n.inherits(l, a),
                                    (l.prototype.push = function (t) {
                                        var e = t.meta.percent || 0,
                                            i = this.entriesCount,
                                            r = this._sources.length;
                                        this.accumulate ? this.contentBuffer.push(t) : ((this.bytesWritten += t.data.length), a.prototype.push.call(this, { data: t.data, meta: { currentFile: this.currentFile, percent: i ? (e + 100 * (i - r - 1)) / i : 100 } }));
                                    }),
                                    (l.prototype.openedSource = function (t) {
                                        (this.currentSourceOffset = this.bytesWritten), (this.currentFile = t.file.name);
                                        var e = this.streamFiles && !t.file.dir;
                                        if (e) {
                                            var i = s(t, e, !1, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                                            this.push({ data: i.fileRecord, meta: { percent: 0 } });
                                        } else this.accumulate = !0;
                                    }),
                                    (l.prototype.closedSource = function (t) {
                                        this.accumulate = !1;
                                        var e = this.streamFiles && !t.file.dir,
                                            i = s(t, e, !0, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
                                        if ((this.dirRecords.push(i.dirRecord), e))
                                            this.push({
                                                data: (function (t) {
                                                    return u.DATA_DESCRIPTOR + r(t.crc32, 4) + r(t.compressedSize, 4) + r(t.uncompressedSize, 4);
                                                })(t),
                                                meta: { percent: 100 },
                                            });
                                        else for (this.push({ data: i.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
                                        this.currentFile = null;
                                    }),
                                    (l.prototype.flush = function () {
                                        for (var t = this.bytesWritten, e = 0; e < this.dirRecords.length; e++) this.push({ data: this.dirRecords[e], meta: { percent: 100 } });
                                        var i = this.bytesWritten - t,
                                            s = (function (t, e, i, s, a) {
                                                var o = n.transformTo("string", a(s));
                                                return u.CENTRAL_DIRECTORY_END + "\0\0\0\0" + r(t, 2) + r(t, 2) + r(e, 4) + r(i, 4) + r(o.length, 2) + o;
                                            })(this.dirRecords.length, i, t, this.zipComment, this.encodeFileName);
                                        this.push({ data: s, meta: { percent: 100 } });
                                    }),
                                    (l.prototype.prepareNextSource = function () {
                                        (this.previous = this._sources.shift()), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
                                    }),
                                    (l.prototype.registerPrevious = function (t) {
                                        this._sources.push(t);
                                        var e = this;
                                        return (
                                            t.on("data", function (t) {
                                                e.processChunk(t);
                                            }),
                                            t.on("end", function () {
                                                e.closedSource(e.previous.streamInfo), e._sources.length ? e.prepareNextSource() : e.end();
                                            }),
                                            t.on("error", function (t) {
                                                e.error(t);
                                            }),
                                            this
                                        );
                                    }),
                                    (l.prototype.resume = function () {
                                        return !!a.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), !0) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), !0));
                                    }),
                                    (l.prototype.error = function (t) {
                                        var e = this._sources;
                                        if (!a.prototype.error.call(this, t)) return !1;
                                        for (var i = 0; i < e.length; i++)
                                            try {
                                                e[i].error(t);
                                            } catch (t) {}
                                        return !0;
                                    }),
                                    (l.prototype.lock = function () {
                                        a.prototype.lock.call(this);
                                        for (var t = this._sources, e = 0; e < t.length; e++) t[e].lock();
                                    }),
                                    (e.exports = l);
                            },
                            { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 },
                        ],
                        9: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("../compressions"),
                                    s = t("./ZipFileWorker");
                                i.generateWorker = function (t, e, i) {
                                    var n = new s(e.streamFiles, i, e.platform, e.encodeFileName),
                                        a = 0;
                                    try {
                                        t.forEach(function (t, i) {
                                            a++;
                                            var s = (function (t, e) {
                                                    var i = t || e,
                                                        s = r[i];
                                                    if (!s) throw new Error(i + " is not a valid compression method !");
                                                    return s;
                                                })(i.options.compression, e.compression),
                                                o = i.options.compressionOptions || e.compressionOptions || {},
                                                h = i.dir,
                                                u = i.date;
                                            i._compressWorker(s, o)
                                                .withStreamInfo("file", { name: t, dir: h, date: u, comment: i.comment || "", unixPermissions: i.unixPermissions, dosPermissions: i.dosPermissions })
                                                .pipe(n);
                                        }),
                                            (n.entriesCount = a);
                                    } catch (t) {
                                        n.error(t);
                                    }
                                    return n;
                                };
                            },
                            { "../compressions": 3, "./ZipFileWorker": 8 },
                        ],
                        10: [
                            function (t, e, i) {
                                "use strict";
                                function r() {
                                    if (!(this instanceof r)) return new r();
                                    if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
                                    (this.files = Object.create(null)),
                                        (this.comment = null),
                                        (this.root = ""),
                                        (this.clone = function () {
                                            var t = new r();
                                            for (var e in this) "function" != typeof this[e] && (t[e] = this[e]);
                                            return t;
                                        });
                                }
                                ((r.prototype = t("./object")).loadAsync = t("./load")),
                                    (r.support = t("./support")),
                                    (r.defaults = t("./defaults")),
                                    (r.version = "3.10.1"),
                                    (r.loadAsync = function (t, e) {
                                        return new r().loadAsync(t, e);
                                    }),
                                    (r.external = t("./external")),
                                    (e.exports = r);
                            },
                            { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 },
                        ],
                        11: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("./utils"),
                                    s = t("./external"),
                                    n = t("./utf8"),
                                    a = t("./zipEntries"),
                                    o = t("./stream/Crc32Probe"),
                                    h = t("./nodejsUtils");
                                function u(t) {
                                    return new s.Promise(function (e, i) {
                                        var r = t.decompressed.getContentWorker().pipe(new o());
                                        r.on("error", function (t) {
                                            i(t);
                                        })
                                            .on("end", function () {
                                                r.streamInfo.crc32 !== t.decompressed.crc32 ? i(new Error("Corrupted zip : CRC32 mismatch")) : e();
                                            })
                                            .resume();
                                    });
                                }
                                e.exports = function (t, e) {
                                    var i = this;
                                    return (
                                        (e = r.extend(e || {}, { base64: !1, checkCRC32: !1, optimizedBinaryString: !1, createFolders: !1, decodeFileName: n.utf8decode })),
                                        h.isNode && h.isStream(t)
                                            ? s.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file."))
                                            : r
                                                  .prepareContent("the loaded zip file", t, !0, e.optimizedBinaryString, e.base64)
                                                  .then(function (t) {
                                                      var i = new a(e);
                                                      return i.load(t), i;
                                                  })
                                                  .then(function (t) {
                                                      var i = [s.Promise.resolve(t)],
                                                          r = t.files;
                                                      if (e.checkCRC32) for (var n = 0; n < r.length; n++) i.push(u(r[n]));
                                                      return s.Promise.all(i);
                                                  })
                                                  .then(function (t) {
                                                      for (var s = t.shift(), n = s.files, a = 0; a < n.length; a++) {
                                                          var o = n[a],
                                                              h = o.fileNameStr,
                                                              u = r.resolve(o.fileNameStr);
                                                          i.file(u, o.decompressed, {
                                                              binary: !0,
                                                              optimizedBinaryString: !0,
                                                              date: o.date,
                                                              dir: o.dir,
                                                              comment: o.fileCommentStr.length ? o.fileCommentStr : null,
                                                              unixPermissions: o.unixPermissions,
                                                              dosPermissions: o.dosPermissions,
                                                              createFolders: e.createFolders,
                                                          }),
                                                              o.dir || (i.file(u).unsafeOriginalName = h);
                                                      }
                                                      return s.zipComment.length && (i.comment = s.zipComment), i;
                                                  })
                                    );
                                };
                            },
                            { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 },
                        ],
                        12: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("../utils"),
                                    s = t("../stream/GenericWorker");
                                function n(t, e) {
                                    s.call(this, "Nodejs stream input adapter for " + t), (this._upstreamEnded = !1), this._bindStream(e);
                                }
                                r.inherits(n, s),
                                    (n.prototype._bindStream = function (t) {
                                        var e = this;
                                        (this._stream = t).pause(),
                                            t
                                                .on("data", function (t) {
                                                    e.push({ data: t, meta: { percent: 0 } });
                                                })
                                                .on("error", function (t) {
                                                    e.isPaused ? (this.generatedError = t) : e.error(t);
                                                })
                                                .on("end", function () {
                                                    e.isPaused ? (e._upstreamEnded = !0) : e.end();
                                                });
                                    }),
                                    (n.prototype.pause = function () {
                                        return !!s.prototype.pause.call(this) && (this._stream.pause(), !0);
                                    }),
                                    (n.prototype.resume = function () {
                                        return !!s.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), !0);
                                    }),
                                    (e.exports = n);
                            },
                            { "../stream/GenericWorker": 28, "../utils": 32 },
                        ],
                        13: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("readable-stream").Readable;
                                function s(t, e, i) {
                                    r.call(this, e), (this._helper = t);
                                    var s = this;
                                    t.on("data", function (t, e) {
                                        s.push(t) || s._helper.pause(), i && i(e);
                                    })
                                        .on("error", function (t) {
                                            s.emit("error", t);
                                        })
                                        .on("end", function () {
                                            s.push(null);
                                        });
                                }
                                t("../utils").inherits(s, r),
                                    (s.prototype._read = function () {
                                        this._helper.resume();
                                    }),
                                    (e.exports = s);
                            },
                            { "../utils": 32, "readable-stream": 16 },
                        ],
                        14: [
                            function (t, i, r) {
                                "use strict";
                                i.exports = {
                                    isNode: void 0 !== e,
                                    newBufferFrom: function (t, i) {
                                        if (e.from && e.from !== Uint8Array.from) return e.from(t, i);
                                        if ("number" == typeof t) throw new Error('The "data" argument must not be a number');
                                        return new e(t, i);
                                    },
                                    allocBuffer: function (t) {
                                        if (e.alloc) return e.alloc(t);
                                        var i = new e(t);
                                        return i.fill(0), i;
                                    },
                                    isBuffer: function (t) {
                                        return e.isBuffer(t);
                                    },
                                    isStream: function (t) {
                                        return t && "function" == typeof t.on && "function" == typeof t.pause && "function" == typeof t.resume;
                                    },
                                };
                            },
                            {},
                        ],
                        15: [
                            function (t, e, i) {
                                "use strict";
                                function r(t, e, i) {
                                    var r,
                                        s = n.getTypeOf(e),
                                        o = n.extend(i || {}, h);
                                    (o.date = o.date || new Date()),
                                        null !== o.compression && (o.compression = o.compression.toUpperCase()),
                                        "string" == typeof o.unixPermissions && (o.unixPermissions = parseInt(o.unixPermissions, 8)),
                                        o.unixPermissions && 16384 & o.unixPermissions && (o.dir = !0),
                                        o.dosPermissions && 16 & o.dosPermissions && (o.dir = !0),
                                        o.dir && (t = m(t)),
                                        o.createFolders && (r = p(t)) && g.call(this, r, !0);
                                    var c,
                                        _ = "string" === s && !1 === o.binary && !1 === o.base64;
                                    (i && void 0 !== i.binary) || (o.binary = !_),
                                        ((e instanceof u && 0 === e.uncompressedSize) || o.dir || !e || 0 === e.length) && ((o.base64 = !1), (o.binary = !0), (e = ""), (o.compression = "STORE"), (s = "string")),
                                        (c = e instanceof u || e instanceof a ? e : f.isNode && f.isStream(e) ? new d(t, e) : n.prepareContent(t, e, o.binary, o.optimizedBinaryString, o.base64));
                                    var y = new l(t, c, o);
                                    this.files[t] = y;
                                }
                                var s = t("./utf8"),
                                    n = t("./utils"),
                                    a = t("./stream/GenericWorker"),
                                    o = t("./stream/StreamHelper"),
                                    h = t("./defaults"),
                                    u = t("./compressedObject"),
                                    l = t("./zipObject"),
                                    c = t("./generate"),
                                    f = t("./nodejsUtils"),
                                    d = t("./nodejs/NodejsStreamInputAdapter"),
                                    p = function (t) {
                                        "/" === t.slice(-1) && (t = t.substring(0, t.length - 1));
                                        var e = t.lastIndexOf("/");
                                        return 0 < e ? t.substring(0, e) : "";
                                    },
                                    m = function (t) {
                                        return "/" !== t.slice(-1) && (t += "/"), t;
                                    },
                                    g = function (t, e) {
                                        return (e = void 0 !== e ? e : h.createFolders), (t = m(t)), this.files[t] || r.call(this, t, null, { dir: !0, createFolders: e }), this.files[t];
                                    };
                                function _(t) {
                                    return "[object RegExp]" === Object.prototype.toString.call(t);
                                }
                                var y = {
                                    load: function () {
                                        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
                                    },
                                    forEach: function (t) {
                                        var e, i, r;
                                        for (e in this.files) (r = this.files[e]), (i = e.slice(this.root.length, e.length)) && e.slice(0, this.root.length) === this.root && t(i, r);
                                    },
                                    filter: function (t) {
                                        var e = [];
                                        return (
                                            this.forEach(function (i, r) {
                                                t(i, r) && e.push(r);
                                            }),
                                            e
                                        );
                                    },
                                    file: function (t, e, i) {
                                        if (1 !== arguments.length) return (t = this.root + t), r.call(this, t, e, i), this;
                                        if (_(t)) {
                                            var s = t;
                                            return this.filter(function (t, e) {
                                                return !e.dir && s.test(t);
                                            });
                                        }
                                        var n = this.files[this.root + t];
                                        return n && !n.dir ? n : null;
                                    },
                                    folder: function (t) {
                                        if (!t) return this;
                                        if (_(t))
                                            return this.filter(function (e, i) {
                                                return i.dir && t.test(e);
                                            });
                                        var e = this.root + t,
                                            i = g.call(this, e),
                                            r = this.clone();
                                        return (r.root = i.name), r;
                                    },
                                    remove: function (t) {
                                        t = this.root + t;
                                        var e = this.files[t];
                                        if ((e || ("/" !== t.slice(-1) && (t += "/"), (e = this.files[t])), e && !e.dir)) delete this.files[t];
                                        else
                                            for (
                                                var i = this.filter(function (e, i) {
                                                        return i.name.slice(0, t.length) === t;
                                                    }),
                                                    r = 0;
                                                r < i.length;
                                                r++
                                            )
                                                delete this.files[i[r].name];
                                        return this;
                                    },
                                    generate: function () {
                                        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
                                    },
                                    generateInternalStream: function (t) {
                                        var e,
                                            i = {};
                                        try {
                                            if (
                                                (((i = n.extend(t || {}, { streamFiles: !1, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: s.utf8encode })).type = i.type.toLowerCase()),
                                                (i.compression = i.compression.toUpperCase()),
                                                "binarystring" === i.type && (i.type = "string"),
                                                !i.type)
                                            )
                                                throw new Error("No output type specified.");
                                            n.checkSupport(i.type), ("darwin" !== i.platform && "freebsd" !== i.platform && "linux" !== i.platform && "sunos" !== i.platform) || (i.platform = "UNIX"), "win32" === i.platform && (i.platform = "DOS");
                                            var r = i.comment || this.comment || "";
                                            e = c.generateWorker(this, i, r);
                                        } catch (t) {
                                            (e = new a("error")).error(t);
                                        }
                                        return new o(e, i.type || "string", i.mimeType);
                                    },
                                    generateAsync: function (t, e) {
                                        return this.generateInternalStream(t).accumulate(e);
                                    },
                                    generateNodeStream: function (t, e) {
                                        return (t = t || {}).type || (t.type = "nodebuffer"), this.generateInternalStream(t).toNodejsStream(e);
                                    },
                                };
                                e.exports = y;
                            },
                            { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 },
                        ],
                        16: [
                            function (t, e, i) {
                                "use strict";
                                e.exports = t("stream");
                            },
                            { stream: void 0 },
                        ],
                        17: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("./DataReader");
                                function s(t) {
                                    r.call(this, t);
                                    for (var e = 0; e < this.data.length; e++) t[e] = 255 & t[e];
                                }
                                t("../utils").inherits(s, r),
                                    (s.prototype.byteAt = function (t) {
                                        return this.data[this.zero + t];
                                    }),
                                    (s.prototype.lastIndexOfSignature = function (t) {
                                        for (var e = t.charCodeAt(0), i = t.charCodeAt(1), r = t.charCodeAt(2), s = t.charCodeAt(3), n = this.length - 4; 0 <= n; --n) if (this.data[n] === e && this.data[n + 1] === i && this.data[n + 2] === r && this.data[n + 3] === s) return n - this.zero;
                                        return -1;
                                    }),
                                    (s.prototype.readAndCheckSignature = function (t) {
                                        var e = t.charCodeAt(0),
                                            i = t.charCodeAt(1),
                                            r = t.charCodeAt(2),
                                            s = t.charCodeAt(3),
                                            n = this.readData(4);
                                        return e === n[0] && i === n[1] && r === n[2] && s === n[3];
                                    }),
                                    (s.prototype.readData = function (t) {
                                        if ((this.checkOffset(t), 0 === t)) return [];
                                        var e = this.data.slice(this.zero + this.index, this.zero + this.index + t);
                                        return (this.index += t), e;
                                    }),
                                    (e.exports = s);
                            },
                            { "../utils": 32, "./DataReader": 18 },
                        ],
                        18: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("../utils");
                                function s(t) {
                                    (this.data = t), (this.length = t.length), (this.index = 0), (this.zero = 0);
                                }
                                (s.prototype = {
                                    checkOffset: function (t) {
                                        this.checkIndex(this.index + t);
                                    },
                                    checkIndex: function (t) {
                                        if (this.length < this.zero + t || t < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + t + "). Corrupted zip ?");
                                    },
                                    setIndex: function (t) {
                                        this.checkIndex(t), (this.index = t);
                                    },
                                    skip: function (t) {
                                        this.setIndex(this.index + t);
                                    },
                                    byteAt: function () {},
                                    readInt: function (t) {
                                        var e,
                                            i = 0;
                                        for (this.checkOffset(t), e = this.index + t - 1; e >= this.index; e--) i = (i << 8) + this.byteAt(e);
                                        return (this.index += t), i;
                                    },
                                    readString: function (t) {
                                        return r.transformTo("string", this.readData(t));
                                    },
                                    readData: function () {},
                                    lastIndexOfSignature: function () {},
                                    readAndCheckSignature: function () {},
                                    readDate: function () {
                                        var t = this.readInt(4);
                                        return new Date(Date.UTC(1980 + ((t >> 25) & 127), ((t >> 21) & 15) - 1, (t >> 16) & 31, (t >> 11) & 31, (t >> 5) & 63, (31 & t) << 1));
                                    },
                                }),
                                    (e.exports = s);
                            },
                            { "../utils": 32 },
                        ],
                        19: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("./Uint8ArrayReader");
                                function s(t) {
                                    r.call(this, t);
                                }
                                t("../utils").inherits(s, r),
                                    (s.prototype.readData = function (t) {
                                        this.checkOffset(t);
                                        var e = this.data.slice(this.zero + this.index, this.zero + this.index + t);
                                        return (this.index += t), e;
                                    }),
                                    (e.exports = s);
                            },
                            { "../utils": 32, "./Uint8ArrayReader": 21 },
                        ],
                        20: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("./DataReader");
                                function s(t) {
                                    r.call(this, t);
                                }
                                t("../utils").inherits(s, r),
                                    (s.prototype.byteAt = function (t) {
                                        return this.data.charCodeAt(this.zero + t);
                                    }),
                                    (s.prototype.lastIndexOfSignature = function (t) {
                                        return this.data.lastIndexOf(t) - this.zero;
                                    }),
                                    (s.prototype.readAndCheckSignature = function (t) {
                                        return t === this.readData(4);
                                    }),
                                    (s.prototype.readData = function (t) {
                                        this.checkOffset(t);
                                        var e = this.data.slice(this.zero + this.index, this.zero + this.index + t);
                                        return (this.index += t), e;
                                    }),
                                    (e.exports = s);
                            },
                            { "../utils": 32, "./DataReader": 18 },
                        ],
                        21: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("./ArrayReader");
                                function s(t) {
                                    r.call(this, t);
                                }
                                t("../utils").inherits(s, r),
                                    (s.prototype.readData = function (t) {
                                        if ((this.checkOffset(t), 0 === t)) return new Uint8Array(0);
                                        var e = this.data.subarray(this.zero + this.index, this.zero + this.index + t);
                                        return (this.index += t), e;
                                    }),
                                    (e.exports = s);
                            },
                            { "../utils": 32, "./ArrayReader": 17 },
                        ],
                        22: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("../utils"),
                                    s = t("../support"),
                                    n = t("./ArrayReader"),
                                    a = t("./StringReader"),
                                    o = t("./NodeBufferReader"),
                                    h = t("./Uint8ArrayReader");
                                e.exports = function (t) {
                                    var e = r.getTypeOf(t);
                                    return r.checkSupport(e), "string" !== e || s.uint8array ? ("nodebuffer" === e ? new o(t) : s.uint8array ? new h(r.transformTo("uint8array", t)) : new n(r.transformTo("array", t))) : new a(t);
                                };
                            },
                            { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 },
                        ],
                        23: [
                            function (t, e, i) {
                                "use strict";
                                (i.LOCAL_FILE_HEADER = "PK"), (i.CENTRAL_FILE_HEADER = "PK"), (i.CENTRAL_DIRECTORY_END = "PK"), (i.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK"), (i.ZIP64_CENTRAL_DIRECTORY_END = "PK"), (i.DATA_DESCRIPTOR = "PK\b");
                            },
                            {},
                        ],
                        24: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("./GenericWorker"),
                                    s = t("../utils");
                                function n(t) {
                                    r.call(this, "ConvertWorker to " + t), (this.destType = t);
                                }
                                s.inherits(n, r),
                                    (n.prototype.processChunk = function (t) {
                                        this.push({ data: s.transformTo(this.destType, t.data), meta: t.meta });
                                    }),
                                    (e.exports = n);
                            },
                            { "../utils": 32, "./GenericWorker": 28 },
                        ],
                        25: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("./GenericWorker"),
                                    s = t("../crc32");
                                function n() {
                                    r.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
                                }
                                t("../utils").inherits(n, r),
                                    (n.prototype.processChunk = function (t) {
                                        (this.streamInfo.crc32 = s(t.data, this.streamInfo.crc32 || 0)), this.push(t);
                                    }),
                                    (e.exports = n);
                            },
                            { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 },
                        ],
                        26: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("../utils"),
                                    s = t("./GenericWorker");
                                function n(t) {
                                    s.call(this, "DataLengthProbe for " + t), (this.propName = t), this.withStreamInfo(t, 0);
                                }
                                r.inherits(n, s),
                                    (n.prototype.processChunk = function (t) {
                                        if (t) {
                                            var e = this.streamInfo[this.propName] || 0;
                                            this.streamInfo[this.propName] = e + t.data.length;
                                        }
                                        s.prototype.processChunk.call(this, t);
                                    }),
                                    (e.exports = n);
                            },
                            { "../utils": 32, "./GenericWorker": 28 },
                        ],
                        27: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("../utils"),
                                    s = t("./GenericWorker");
                                function n(t) {
                                    s.call(this, "DataWorker");
                                    var e = this;
                                    (this.dataIsReady = !1),
                                        (this.index = 0),
                                        (this.max = 0),
                                        (this.data = null),
                                        (this.type = ""),
                                        (this._tickScheduled = !1),
                                        t.then(
                                            function (t) {
                                                (e.dataIsReady = !0), (e.data = t), (e.max = (t && t.length) || 0), (e.type = r.getTypeOf(t)), e.isPaused || e._tickAndRepeat();
                                            },
                                            function (t) {
                                                e.error(t);
                                            }
                                        );
                                }
                                r.inherits(n, s),
                                    (n.prototype.cleanUp = function () {
                                        s.prototype.cleanUp.call(this), (this.data = null);
                                    }),
                                    (n.prototype.resume = function () {
                                        return !!s.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && ((this._tickScheduled = !0), r.delay(this._tickAndRepeat, [], this)), !0);
                                    }),
                                    (n.prototype._tickAndRepeat = function () {
                                        (this._tickScheduled = !1), this.isPaused || this.isFinished || (this._tick(), this.isFinished || (r.delay(this._tickAndRepeat, [], this), (this._tickScheduled = !0)));
                                    }),
                                    (n.prototype._tick = function () {
                                        if (this.isPaused || this.isFinished) return !1;
                                        var t = null,
                                            e = Math.min(this.max, this.index + 16384);
                                        if (this.index >= this.max) return this.end();
                                        switch (this.type) {
                                            case "string":
                                                t = this.data.substring(this.index, e);
                                                break;
                                            case "uint8array":
                                                t = this.data.subarray(this.index, e);
                                                break;
                                            case "array":
                                            case "nodebuffer":
                                                t = this.data.slice(this.index, e);
                                        }
                                        return (this.index = e), this.push({ data: t, meta: { percent: this.max ? (this.index / this.max) * 100 : 0 } });
                                    }),
                                    (e.exports = n);
                            },
                            { "../utils": 32, "./GenericWorker": 28 },
                        ],
                        28: [
                            function (t, e, i) {
                                "use strict";
                                function r(t) {
                                    (this.name = t || "default"), (this.streamInfo = {}), (this.generatedError = null), (this.extraStreamInfo = {}), (this.isPaused = !0), (this.isFinished = !1), (this.isLocked = !1), (this._listeners = { data: [], end: [], error: [] }), (this.previous = null);
                                }
                                (r.prototype = {
                                    push: function (t) {
                                        this.emit("data", t);
                                    },
                                    end: function () {
                                        if (this.isFinished) return !1;
                                        this.flush();
                                        try {
                                            this.emit("end"), this.cleanUp(), (this.isFinished = !0);
                                        } catch (t) {
                                            this.emit("error", t);
                                        }
                                        return !0;
                                    },
                                    error: function (t) {
                                        return !this.isFinished && (this.isPaused ? (this.generatedError = t) : ((this.isFinished = !0), this.emit("error", t), this.previous && this.previous.error(t), this.cleanUp()), !0);
                                    },
                                    on: function (t, e) {
                                        return this._listeners[t].push(e), this;
                                    },
                                    cleanUp: function () {
                                        (this.streamInfo = this.generatedError = this.extraStreamInfo = null), (this._listeners = []);
                                    },
                                    emit: function (t, e) {
                                        if (this._listeners[t]) for (var i = 0; i < this._listeners[t].length; i++) this._listeners[t][i].call(this, e);
                                    },
                                    pipe: function (t) {
                                        return t.registerPrevious(this);
                                    },
                                    registerPrevious: function (t) {
                                        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
                                        (this.streamInfo = t.streamInfo), this.mergeStreamInfo(), (this.previous = t);
                                        var e = this;
                                        return (
                                            t.on("data", function (t) {
                                                e.processChunk(t);
                                            }),
                                            t.on("end", function () {
                                                e.end();
                                            }),
                                            t.on("error", function (t) {
                                                e.error(t);
                                            }),
                                            this
                                        );
                                    },
                                    pause: function () {
                                        return !this.isPaused && !this.isFinished && ((this.isPaused = !0), this.previous && this.previous.pause(), !0);
                                    },
                                    resume: function () {
                                        if (!this.isPaused || this.isFinished) return !1;
                                        var t = (this.isPaused = !1);
                                        return this.generatedError && (this.error(this.generatedError), (t = !0)), this.previous && this.previous.resume(), !t;
                                    },
                                    flush: function () {},
                                    processChunk: function (t) {
                                        this.push(t);
                                    },
                                    withStreamInfo: function (t, e) {
                                        return (this.extraStreamInfo[t] = e), this.mergeStreamInfo(), this;
                                    },
                                    mergeStreamInfo: function () {
                                        for (var t in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, t) && (this.streamInfo[t] = this.extraStreamInfo[t]);
                                    },
                                    lock: function () {
                                        if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
                                        (this.isLocked = !0), this.previous && this.previous.lock();
                                    },
                                    toString: function () {
                                        var t = "Worker " + this.name;
                                        return this.previous ? this.previous + " -> " + t : t;
                                    },
                                }),
                                    (e.exports = r);
                            },
                            {},
                        ],
                        29: [
                            function (t, i, r) {
                                "use strict";
                                var s = t("../utils"),
                                    n = t("./ConvertWorker"),
                                    a = t("./GenericWorker"),
                                    o = t("../base64"),
                                    h = t("../support"),
                                    u = t("../external"),
                                    l = null;
                                if (h.nodestream)
                                    try {
                                        l = t("../nodejs/NodejsStreamOutputAdapter");
                                    } catch (t) {}
                                function c(t, e, i) {
                                    var r = e;
                                    switch (e) {
                                        case "blob":
                                        case "arraybuffer":
                                            r = "uint8array";
                                            break;
                                        case "base64":
                                            r = "string";
                                    }
                                    try {
                                        (this._internalType = r), (this._outputType = e), (this._mimeType = i), s.checkSupport(r), (this._worker = t.pipe(new n(r))), t.lock();
                                    } catch (t) {
                                        (this._worker = new a("error")), this._worker.error(t);
                                    }
                                }
                                (c.prototype = {
                                    accumulate: function (t) {
                                        return (function (t, i) {
                                            return new u.Promise(function (r, n) {
                                                var a = [],
                                                    h = t._internalType,
                                                    u = t._outputType,
                                                    l = t._mimeType;
                                                t.on("data", function (t, e) {
                                                    a.push(t), i && i(e);
                                                })
                                                    .on("error", function (t) {
                                                        (a = []), n(t);
                                                    })
                                                    .on("end", function () {
                                                        try {
                                                            var t = (function (t, e, i) {
                                                                switch (t) {
                                                                    case "blob":
                                                                        return s.newBlob(s.transformTo("arraybuffer", e), i);
                                                                    case "base64":
                                                                        return o.encode(e);
                                                                    default:
                                                                        return s.transformTo(t, e);
                                                                }
                                                            })(
                                                                u,
                                                                (function (t, i) {
                                                                    var r,
                                                                        s = 0,
                                                                        n = null,
                                                                        a = 0;
                                                                    for (r = 0; r < i.length; r++) a += i[r].length;
                                                                    switch (t) {
                                                                        case "string":
                                                                            return i.join("");
                                                                        case "array":
                                                                            return Array.prototype.concat.apply([], i);
                                                                        case "uint8array":
                                                                            for (n = new Uint8Array(a), r = 0; r < i.length; r++) n.set(i[r], s), (s += i[r].length);
                                                                            return n;
                                                                        case "nodebuffer":
                                                                            return e.concat(i);
                                                                        default:
                                                                            throw new Error("concat : unsupported type '" + t + "'");
                                                                    }
                                                                })(h, a),
                                                                l
                                                            );
                                                            r(t);
                                                        } catch (t) {
                                                            n(t);
                                                        }
                                                        a = [];
                                                    })
                                                    .resume();
                                            });
                                        })(this, t);
                                    },
                                    on: function (t, e) {
                                        var i = this;
                                        return (
                                            "data" === t
                                                ? this._worker.on(t, function (t) {
                                                      e.call(i, t.data, t.meta);
                                                  })
                                                : this._worker.on(t, function () {
                                                      s.delay(e, arguments, i);
                                                  }),
                                            this
                                        );
                                    },
                                    resume: function () {
                                        return s.delay(this._worker.resume, [], this._worker), this;
                                    },
                                    pause: function () {
                                        return this._worker.pause(), this;
                                    },
                                    toNodejsStream: function (t) {
                                        if ((s.checkSupport("nodestream"), "nodebuffer" !== this._outputType)) throw new Error(this._outputType + " is not supported by this method");
                                        return new l(this, { objectMode: "nodebuffer" !== this._outputType }, t);
                                    },
                                }),
                                    (i.exports = c);
                            },
                            { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 },
                        ],
                        30: [
                            function (t, i, r) {
                                "use strict";
                                if (((r.base64 = !0), (r.array = !0), (r.string = !0), (r.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array), (r.nodebuffer = void 0 !== e), (r.uint8array = "undefined" != typeof Uint8Array), "undefined" == typeof ArrayBuffer))
                                    r.blob = !1;
                                else {
                                    var s = new ArrayBuffer(0);
                                    try {
                                        r.blob = 0 === new Blob([s], { type: "application/zip" }).size;
                                    } catch (t) {
                                        try {
                                            var n = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                                            n.append(s), (r.blob = 0 === n.getBlob("application/zip").size);
                                        } catch (t) {
                                            r.blob = !1;
                                        }
                                    }
                                }
                                try {
                                    r.nodestream = !!t("readable-stream").Readable;
                                } catch (t) {
                                    r.nodestream = !1;
                                }
                            },
                            { "readable-stream": 16 },
                        ],
                        31: [
                            function (t, e, i) {
                                "use strict";
                                for (var r = t("./utils"), s = t("./support"), n = t("./nodejsUtils"), a = t("./stream/GenericWorker"), o = new Array(256), h = 0; h < 256; h++) o[h] = 252 <= h ? 6 : 248 <= h ? 5 : 240 <= h ? 4 : 224 <= h ? 3 : 192 <= h ? 2 : 1;
                                function u() {
                                    a.call(this, "utf-8 decode"), (this.leftOver = null);
                                }
                                function l() {
                                    a.call(this, "utf-8 encode");
                                }
                                (o[254] = o[254] = 1),
                                    (i.utf8encode = function (t) {
                                        return s.nodebuffer
                                            ? n.newBufferFrom(t, "utf-8")
                                            : (function (t) {
                                                  var e,
                                                      i,
                                                      r,
                                                      n,
                                                      a,
                                                      o = t.length,
                                                      h = 0;
                                                  for (n = 0; n < o; n++) 55296 == (64512 & (i = t.charCodeAt(n))) && n + 1 < o && 56320 == (64512 & (r = t.charCodeAt(n + 1))) && ((i = 65536 + ((i - 55296) << 10) + (r - 56320)), n++), (h += i < 128 ? 1 : i < 2048 ? 2 : i < 65536 ? 3 : 4);
                                                  for (e = s.uint8array ? new Uint8Array(h) : new Array(h), n = a = 0; a < h; n++)
                                                      55296 == (64512 & (i = t.charCodeAt(n))) && n + 1 < o && 56320 == (64512 & (r = t.charCodeAt(n + 1))) && ((i = 65536 + ((i - 55296) << 10) + (r - 56320)), n++),
                                                          i < 128 ? (e[a++] = i) : (i < 2048 ? (e[a++] = 192 | (i >>> 6)) : (i < 65536 ? (e[a++] = 224 | (i >>> 12)) : ((e[a++] = 240 | (i >>> 18)), (e[a++] = 128 | ((i >>> 12) & 63))), (e[a++] = 128 | ((i >>> 6) & 63))), (e[a++] = 128 | (63 & i)));
                                                  return e;
                                              })(t);
                                    }),
                                    (i.utf8decode = function (t) {
                                        return s.nodebuffer
                                            ? r.transformTo("nodebuffer", t).toString("utf-8")
                                            : (function (t) {
                                                  var e,
                                                      i,
                                                      s,
                                                      n,
                                                      a = t.length,
                                                      h = new Array(2 * a);
                                                  for (e = i = 0; e < a; )
                                                      if ((s = t[e++]) < 128) h[i++] = s;
                                                      else if (4 < (n = o[s])) (h[i++] = 65533), (e += n - 1);
                                                      else {
                                                          for (s &= 2 === n ? 31 : 3 === n ? 15 : 7; 1 < n && e < a; ) (s = (s << 6) | (63 & t[e++])), n--;
                                                          1 < n ? (h[i++] = 65533) : s < 65536 ? (h[i++] = s) : ((s -= 65536), (h[i++] = 55296 | ((s >> 10) & 1023)), (h[i++] = 56320 | (1023 & s)));
                                                      }
                                                  return h.length !== i && (h.subarray ? (h = h.subarray(0, i)) : (h.length = i)), r.applyFromCharCode(h);
                                              })((t = r.transformTo(s.uint8array ? "uint8array" : "array", t)));
                                    }),
                                    r.inherits(u, a),
                                    (u.prototype.processChunk = function (t) {
                                        var e = r.transformTo(s.uint8array ? "uint8array" : "array", t.data);
                                        if (this.leftOver && this.leftOver.length) {
                                            if (s.uint8array) {
                                                var n = e;
                                                (e = new Uint8Array(n.length + this.leftOver.length)).set(this.leftOver, 0), e.set(n, this.leftOver.length);
                                            } else e = this.leftOver.concat(e);
                                            this.leftOver = null;
                                        }
                                        var a = (function (t, e) {
                                                var i;
                                                for ((e = e || t.length) > t.length && (e = t.length), i = e - 1; 0 <= i && 128 == (192 & t[i]); ) i--;
                                                return i < 0 || 0 === i ? e : i + o[t[i]] > e ? i : e;
                                            })(e),
                                            h = e;
                                        a !== e.length && (s.uint8array ? ((h = e.subarray(0, a)), (this.leftOver = e.subarray(a, e.length))) : ((h = e.slice(0, a)), (this.leftOver = e.slice(a, e.length)))), this.push({ data: i.utf8decode(h), meta: t.meta });
                                    }),
                                    (u.prototype.flush = function () {
                                        this.leftOver && this.leftOver.length && (this.push({ data: i.utf8decode(this.leftOver), meta: {} }), (this.leftOver = null));
                                    }),
                                    (i.Utf8DecodeWorker = u),
                                    r.inherits(l, a),
                                    (l.prototype.processChunk = function (t) {
                                        this.push({ data: i.utf8encode(t.data), meta: t.meta });
                                    }),
                                    (i.Utf8EncodeWorker = l);
                            },
                            { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 },
                        ],
                        32: [
                            function (t, e, i) {
                                "use strict";
                                var s = t("./support"),
                                    n = t("./base64"),
                                    a = t("./nodejsUtils"),
                                    o = t("./external");
                                function h(t) {
                                    return t;
                                }
                                function u(t, e) {
                                    for (var i = 0; i < t.length; ++i) e[i] = 255 & t.charCodeAt(i);
                                    return e;
                                }
                                t("setimmediate"),
                                    (i.newBlob = function (t, e) {
                                        i.checkSupport("blob");
                                        try {
                                            return new Blob([t], { type: e });
                                        } catch (i) {
                                            try {
                                                var r = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                                                return r.append(t), r.getBlob(e);
                                            } catch (t) {
                                                throw new Error("Bug : can't construct the Blob.");
                                            }
                                        }
                                    });
                                var l = {
                                    stringifyByChunk: function (t, e, i) {
                                        var r = [],
                                            s = 0,
                                            n = t.length;
                                        if (n <= i) return String.fromCharCode.apply(null, t);
                                        for (; s < n; ) "array" === e || "nodebuffer" === e ? r.push(String.fromCharCode.apply(null, t.slice(s, Math.min(s + i, n)))) : r.push(String.fromCharCode.apply(null, t.subarray(s, Math.min(s + i, n)))), (s += i);
                                        return r.join("");
                                    },
                                    stringifyByChar: function (t) {
                                        for (var e = "", i = 0; i < t.length; i++) e += String.fromCharCode(t[i]);
                                        return e;
                                    },
                                    applyCanBeUsed: {
                                        uint8array: (function () {
                                            try {
                                                return s.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length;
                                            } catch (t) {
                                                return !1;
                                            }
                                        })(),
                                        nodebuffer: (function () {
                                            try {
                                                return s.nodebuffer && 1 === String.fromCharCode.apply(null, a.allocBuffer(1)).length;
                                            } catch (t) {
                                                return !1;
                                            }
                                        })(),
                                    },
                                };
                                function c(t) {
                                    var e = 65536,
                                        r = i.getTypeOf(t),
                                        s = !0;
                                    if (("uint8array" === r ? (s = l.applyCanBeUsed.uint8array) : "nodebuffer" === r && (s = l.applyCanBeUsed.nodebuffer), s))
                                        for (; 1 < e; )
                                            try {
                                                return l.stringifyByChunk(t, r, e);
                                            } catch (t) {
                                                e = Math.floor(e / 2);
                                            }
                                    return l.stringifyByChar(t);
                                }
                                function f(t, e) {
                                    for (var i = 0; i < t.length; i++) e[i] = t[i];
                                    return e;
                                }
                                i.applyFromCharCode = c;
                                var d = {};
                                (d.string = {
                                    string: h,
                                    array: function (t) {
                                        return u(t, new Array(t.length));
                                    },
                                    arraybuffer: function (t) {
                                        return d.string.uint8array(t).buffer;
                                    },
                                    uint8array: function (t) {
                                        return u(t, new Uint8Array(t.length));
                                    },
                                    nodebuffer: function (t) {
                                        return u(t, a.allocBuffer(t.length));
                                    },
                                }),
                                    (d.array = {
                                        string: c,
                                        array: h,
                                        arraybuffer: function (t) {
                                            return new Uint8Array(t).buffer;
                                        },
                                        uint8array: function (t) {
                                            return new Uint8Array(t);
                                        },
                                        nodebuffer: function (t) {
                                            return a.newBufferFrom(t);
                                        },
                                    }),
                                    (d.arraybuffer = {
                                        string: function (t) {
                                            return c(new Uint8Array(t));
                                        },
                                        array: function (t) {
                                            return f(new Uint8Array(t), new Array(t.byteLength));
                                        },
                                        arraybuffer: h,
                                        uint8array: function (t) {
                                            return new Uint8Array(t);
                                        },
                                        nodebuffer: function (t) {
                                            return a.newBufferFrom(new Uint8Array(t));
                                        },
                                    }),
                                    (d.uint8array = {
                                        string: c,
                                        array: function (t) {
                                            return f(t, new Array(t.length));
                                        },
                                        arraybuffer: function (t) {
                                            return t.buffer;
                                        },
                                        uint8array: h,
                                        nodebuffer: function (t) {
                                            return a.newBufferFrom(t);
                                        },
                                    }),
                                    (d.nodebuffer = {
                                        string: c,
                                        array: function (t) {
                                            return f(t, new Array(t.length));
                                        },
                                        arraybuffer: function (t) {
                                            return d.nodebuffer.uint8array(t).buffer;
                                        },
                                        uint8array: function (t) {
                                            return f(t, new Uint8Array(t.length));
                                        },
                                        nodebuffer: h,
                                    }),
                                    (i.transformTo = function (t, e) {
                                        if (((e = e || ""), !t)) return e;
                                        i.checkSupport(t);
                                        var r = i.getTypeOf(e);
                                        return d[r][t](e);
                                    }),
                                    (i.resolve = function (t) {
                                        for (var e = t.split("/"), i = [], r = 0; r < e.length; r++) {
                                            var s = e[r];
                                            "." === s || ("" === s && 0 !== r && r !== e.length - 1) || (".." === s ? i.pop() : i.push(s));
                                        }
                                        return i.join("/");
                                    }),
                                    (i.getTypeOf = function (t) {
                                        return "string" == typeof t
                                            ? "string"
                                            : "[object Array]" === Object.prototype.toString.call(t)
                                            ? "array"
                                            : s.nodebuffer && a.isBuffer(t)
                                            ? "nodebuffer"
                                            : s.uint8array && t instanceof Uint8Array
                                            ? "uint8array"
                                            : s.arraybuffer && t instanceof ArrayBuffer
                                            ? "arraybuffer"
                                            : void 0;
                                    }),
                                    (i.checkSupport = function (t) {
                                        if (!s[t.toLowerCase()]) throw new Error(t + " is not supported by this platform");
                                    }),
                                    (i.MAX_VALUE_16BITS = 65535),
                                    (i.MAX_VALUE_32BITS = -1),
                                    (i.pretty = function (t) {
                                        var e,
                                            i,
                                            r = "";
                                        for (i = 0; i < (t || "").length; i++) r += "\\x" + ((e = t.charCodeAt(i)) < 16 ? "0" : "") + e.toString(16).toUpperCase();
                                        return r;
                                    }),
                                    (i.delay = function (t, e, i) {
                                        r(function () {
                                            t.apply(i || null, e || []);
                                        });
                                    }),
                                    (i.inherits = function (t, e) {
                                        function i() {}
                                        (i.prototype = e.prototype), (t.prototype = new i());
                                    }),
                                    (i.extend = function () {
                                        var t,
                                            e,
                                            i = {};
                                        for (t = 0; t < arguments.length; t++) for (e in arguments[t]) Object.prototype.hasOwnProperty.call(arguments[t], e) && void 0 === i[e] && (i[e] = arguments[t][e]);
                                        return i;
                                    }),
                                    (i.prepareContent = function (t, e, r, a, h) {
                                        return o.Promise.resolve(e)
                                            .then(function (t) {
                                                return s.blob && (t instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(t))) && "undefined" != typeof FileReader
                                                    ? new o.Promise(function (e, i) {
                                                          var r = new FileReader();
                                                          (r.onload = function (t) {
                                                              e(t.target.result);
                                                          }),
                                                              (r.onerror = function (t) {
                                                                  i(t.target.error);
                                                              }),
                                                              r.readAsArrayBuffer(t);
                                                      })
                                                    : t;
                                            })
                                            .then(function (e) {
                                                var l = i.getTypeOf(e);
                                                return l
                                                    ? ("arraybuffer" === l
                                                          ? (e = i.transformTo("uint8array", e))
                                                          : "string" === l &&
                                                            (h
                                                                ? (e = n.decode(e))
                                                                : r &&
                                                                  !0 !== a &&
                                                                  (e = (function (t) {
                                                                      return u(t, s.uint8array ? new Uint8Array(t.length) : new Array(t.length));
                                                                  })(e))),
                                                      e)
                                                    : o.Promise.reject(new Error("Can't read the data of '" + t + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
                                            });
                                    });
                            },
                            { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 },
                        ],
                        33: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("./reader/readerFor"),
                                    s = t("./utils"),
                                    n = t("./signature"),
                                    a = t("./zipEntry"),
                                    o = t("./support");
                                function h(t) {
                                    (this.files = []), (this.loadOptions = t);
                                }
                                (h.prototype = {
                                    checkSignature: function (t) {
                                        if (!this.reader.readAndCheckSignature(t)) {
                                            this.reader.index -= 4;
                                            var e = this.reader.readString(4);
                                            throw new Error("Corrupted zip or bug: unexpected signature (" + s.pretty(e) + ", expected " + s.pretty(t) + ")");
                                        }
                                    },
                                    isSignature: function (t, e) {
                                        var i = this.reader.index;
                                        this.reader.setIndex(t);
                                        var r = this.reader.readString(4) === e;
                                        return this.reader.setIndex(i), r;
                                    },
                                    readBlockEndOfCentral: function () {
                                        (this.diskNumber = this.reader.readInt(2)),
                                            (this.diskWithCentralDirStart = this.reader.readInt(2)),
                                            (this.centralDirRecordsOnThisDisk = this.reader.readInt(2)),
                                            (this.centralDirRecords = this.reader.readInt(2)),
                                            (this.centralDirSize = this.reader.readInt(4)),
                                            (this.centralDirOffset = this.reader.readInt(4)),
                                            (this.zipCommentLength = this.reader.readInt(2));
                                        var t = this.reader.readData(this.zipCommentLength),
                                            e = o.uint8array ? "uint8array" : "array",
                                            i = s.transformTo(e, t);
                                        this.zipComment = this.loadOptions.decodeFileName(i);
                                    },
                                    readBlockZip64EndOfCentral: function () {
                                        (this.zip64EndOfCentralSize = this.reader.readInt(8)),
                                            this.reader.skip(4),
                                            (this.diskNumber = this.reader.readInt(4)),
                                            (this.diskWithCentralDirStart = this.reader.readInt(4)),
                                            (this.centralDirRecordsOnThisDisk = this.reader.readInt(8)),
                                            (this.centralDirRecords = this.reader.readInt(8)),
                                            (this.centralDirSize = this.reader.readInt(8)),
                                            (this.centralDirOffset = this.reader.readInt(8)),
                                            (this.zip64ExtensibleData = {});
                                        for (var t, e, i, r = this.zip64EndOfCentralSize - 44; 0 < r; ) (t = this.reader.readInt(2)), (e = this.reader.readInt(4)), (i = this.reader.readData(e)), (this.zip64ExtensibleData[t] = { id: t, length: e, value: i });
                                    },
                                    readBlockZip64EndOfCentralLocator: function () {
                                        if (((this.diskWithZip64CentralDirStart = this.reader.readInt(4)), (this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8)), (this.disksCount = this.reader.readInt(4)), 1 < this.disksCount)) throw new Error("Multi-volumes zip are not supported");
                                    },
                                    readLocalFiles: function () {
                                        var t, e;
                                        for (t = 0; t < this.files.length; t++) (e = this.files[t]), this.reader.setIndex(e.localHeaderOffset), this.checkSignature(n.LOCAL_FILE_HEADER), e.readLocalPart(this.reader), e.handleUTF8(), e.processAttributes();
                                    },
                                    readCentralDir: function () {
                                        var t;
                                        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(n.CENTRAL_FILE_HEADER); ) (t = new a({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(t);
                                        if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
                                    },
                                    readEndOfCentral: function () {
                                        var t = this.reader.lastIndexOfSignature(n.CENTRAL_DIRECTORY_END);
                                        if (t < 0)
                                            throw this.isSignature(0, n.LOCAL_FILE_HEADER)
                                                ? new Error("Corrupted zip: can't find end of central directory")
                                                : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
                                        this.reader.setIndex(t);
                                        var e = t;
                                        if (
                                            (this.checkSignature(n.CENTRAL_DIRECTORY_END),
                                            this.readBlockEndOfCentral(),
                                            this.diskNumber === s.MAX_VALUE_16BITS ||
                                                this.diskWithCentralDirStart === s.MAX_VALUE_16BITS ||
                                                this.centralDirRecordsOnThisDisk === s.MAX_VALUE_16BITS ||
                                                this.centralDirRecords === s.MAX_VALUE_16BITS ||
                                                this.centralDirSize === s.MAX_VALUE_32BITS ||
                                                this.centralDirOffset === s.MAX_VALUE_32BITS)
                                        ) {
                                            if (((this.zip64 = !0), (t = this.reader.lastIndexOfSignature(n.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
                                            if (
                                                (this.reader.setIndex(t),
                                                this.checkSignature(n.ZIP64_CENTRAL_DIRECTORY_LOCATOR),
                                                this.readBlockZip64EndOfCentralLocator(),
                                                !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, n.ZIP64_CENTRAL_DIRECTORY_END) && ((this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(n.ZIP64_CENTRAL_DIRECTORY_END)), this.relativeOffsetEndOfZip64CentralDir < 0))
                                            )
                                                throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
                                            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(n.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
                                        }
                                        var i = this.centralDirOffset + this.centralDirSize;
                                        this.zip64 && ((i += 20), (i += 12 + this.zip64EndOfCentralSize));
                                        var r = e - i;
                                        if (0 < r) this.isSignature(e, n.CENTRAL_FILE_HEADER) || (this.reader.zero = r);
                                        else if (r < 0) throw new Error("Corrupted zip: missing " + Math.abs(r) + " bytes.");
                                    },
                                    prepareReader: function (t) {
                                        this.reader = r(t);
                                    },
                                    load: function (t) {
                                        this.prepareReader(t), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
                                    },
                                }),
                                    (e.exports = h);
                            },
                            { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 },
                        ],
                        34: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("./reader/readerFor"),
                                    s = t("./utils"),
                                    n = t("./compressedObject"),
                                    a = t("./crc32"),
                                    o = t("./utf8"),
                                    h = t("./compressions"),
                                    u = t("./support");
                                function l(t, e) {
                                    (this.options = t), (this.loadOptions = e);
                                }
                                (l.prototype = {
                                    isEncrypted: function () {
                                        return 1 == (1 & this.bitFlag);
                                    },
                                    useUTF8: function () {
                                        return 2048 == (2048 & this.bitFlag);
                                    },
                                    readLocalPart: function (t) {
                                        var e, i;
                                        if ((t.skip(22), (this.fileNameLength = t.readInt(2)), (i = t.readInt(2)), (this.fileName = t.readData(this.fileNameLength)), t.skip(i), -1 === this.compressedSize || -1 === this.uncompressedSize))
                                            throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
                                        if (
                                            null ===
                                            (e = (function (t) {
                                                for (var e in h) if (Object.prototype.hasOwnProperty.call(h, e) && h[e].magic === t) return h[e];
                                                return null;
                                            })(this.compressionMethod))
                                        )
                                            throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
                                        this.decompressed = new n(this.compressedSize, this.uncompressedSize, this.crc32, e, t.readData(this.compressedSize));
                                    },
                                    readCentralPart: function (t) {
                                        (this.versionMadeBy = t.readInt(2)), t.skip(2), (this.bitFlag = t.readInt(2)), (this.compressionMethod = t.readString(2)), (this.date = t.readDate()), (this.crc32 = t.readInt(4)), (this.compressedSize = t.readInt(4)), (this.uncompressedSize = t.readInt(4));
                                        var e = t.readInt(2);
                                        if (
                                            ((this.extraFieldsLength = t.readInt(2)),
                                            (this.fileCommentLength = t.readInt(2)),
                                            (this.diskNumberStart = t.readInt(2)),
                                            (this.internalFileAttributes = t.readInt(2)),
                                            (this.externalFileAttributes = t.readInt(4)),
                                            (this.localHeaderOffset = t.readInt(4)),
                                            this.isEncrypted())
                                        )
                                            throw new Error("Encrypted zip are not supported");
                                        t.skip(e), this.readExtraFields(t), this.parseZIP64ExtraField(t), (this.fileComment = t.readData(this.fileCommentLength));
                                    },
                                    processAttributes: function () {
                                        (this.unixPermissions = null), (this.dosPermissions = null);
                                        var t = this.versionMadeBy >> 8;
                                        (this.dir = !!(16 & this.externalFileAttributes)),
                                            0 == t && (this.dosPermissions = 63 & this.externalFileAttributes),
                                            3 == t && (this.unixPermissions = (this.externalFileAttributes >> 16) & 65535),
                                            this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = !0);
                                    },
                                    parseZIP64ExtraField: function () {
                                        if (this.extraFields[1]) {
                                            var t = r(this.extraFields[1].value);
                                            this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = t.readInt(8)),
                                                this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = t.readInt(8)),
                                                this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = t.readInt(8)),
                                                this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = t.readInt(4));
                                        }
                                    },
                                    readExtraFields: function (t) {
                                        var e,
                                            i,
                                            r,
                                            s = t.index + this.extraFieldsLength;
                                        for (this.extraFields || (this.extraFields = {}); t.index + 4 < s; ) (e = t.readInt(2)), (i = t.readInt(2)), (r = t.readData(i)), (this.extraFields[e] = { id: e, length: i, value: r });
                                        t.setIndex(s);
                                    },
                                    handleUTF8: function () {
                                        var t = u.uint8array ? "uint8array" : "array";
                                        if (this.useUTF8()) (this.fileNameStr = o.utf8decode(this.fileName)), (this.fileCommentStr = o.utf8decode(this.fileComment));
                                        else {
                                            var e = this.findExtraFieldUnicodePath();
                                            if (null !== e) this.fileNameStr = e;
                                            else {
                                                var i = s.transformTo(t, this.fileName);
                                                this.fileNameStr = this.loadOptions.decodeFileName(i);
                                            }
                                            var r = this.findExtraFieldUnicodeComment();
                                            if (null !== r) this.fileCommentStr = r;
                                            else {
                                                var n = s.transformTo(t, this.fileComment);
                                                this.fileCommentStr = this.loadOptions.decodeFileName(n);
                                            }
                                        }
                                    },
                                    findExtraFieldUnicodePath: function () {
                                        var t = this.extraFields[28789];
                                        if (t) {
                                            var e = r(t.value);
                                            return 1 !== e.readInt(1) || a(this.fileName) !== e.readInt(4) ? null : o.utf8decode(e.readData(t.length - 5));
                                        }
                                        return null;
                                    },
                                    findExtraFieldUnicodeComment: function () {
                                        var t = this.extraFields[25461];
                                        if (t) {
                                            var e = r(t.value);
                                            return 1 !== e.readInt(1) || a(this.fileComment) !== e.readInt(4) ? null : o.utf8decode(e.readData(t.length - 5));
                                        }
                                        return null;
                                    },
                                }),
                                    (e.exports = l);
                            },
                            { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 },
                        ],
                        35: [
                            function (t, e, i) {
                                "use strict";
                                function r(t, e, i) {
                                    (this.name = t),
                                        (this.dir = i.dir),
                                        (this.date = i.date),
                                        (this.comment = i.comment),
                                        (this.unixPermissions = i.unixPermissions),
                                        (this.dosPermissions = i.dosPermissions),
                                        (this._data = e),
                                        (this._dataBinary = i.binary),
                                        (this.options = { compression: i.compression, compressionOptions: i.compressionOptions });
                                }
                                var s = t("./stream/StreamHelper"),
                                    n = t("./stream/DataWorker"),
                                    a = t("./utf8"),
                                    o = t("./compressedObject"),
                                    h = t("./stream/GenericWorker");
                                r.prototype = {
                                    internalStream: function (t) {
                                        var e = null,
                                            i = "string";
                                        try {
                                            if (!t) throw new Error("No output type specified.");
                                            var r = "string" === (i = t.toLowerCase()) || "text" === i;
                                            ("binarystring" !== i && "text" !== i) || (i = "string"), (e = this._decompressWorker());
                                            var n = !this._dataBinary;
                                            n && !r && (e = e.pipe(new a.Utf8EncodeWorker())), !n && r && (e = e.pipe(new a.Utf8DecodeWorker()));
                                        } catch (t) {
                                            (e = new h("error")).error(t);
                                        }
                                        return new s(e, i, "");
                                    },
                                    async: function (t, e) {
                                        return this.internalStream(t).accumulate(e);
                                    },
                                    nodeStream: function (t, e) {
                                        return this.internalStream(t || "nodebuffer").toNodejsStream(e);
                                    },
                                    _compressWorker: function (t, e) {
                                        if (this._data instanceof o && this._data.compression.magic === t.magic) return this._data.getCompressedWorker();
                                        var i = this._decompressWorker();
                                        return this._dataBinary || (i = i.pipe(new a.Utf8EncodeWorker())), o.createWorkerFrom(i, t, e);
                                    },
                                    _decompressWorker: function () {
                                        return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof h ? this._data : new n(this._data);
                                    },
                                };
                                for (
                                    var u = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"],
                                        l = function () {
                                            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
                                        },
                                        c = 0;
                                    c < u.length;
                                    c++
                                )
                                    r.prototype[u[c]] = l;
                                e.exports = r;
                            },
                            { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 },
                        ],
                        36: [
                            function (t, e, i) {
                                (function (t) {
                                    "use strict";
                                    var i,
                                        r,
                                        s = t.MutationObserver || t.WebKitMutationObserver;
                                    if (s) {
                                        var n = 0,
                                            a = new s(l),
                                            o = t.document.createTextNode("");
                                        a.observe(o, { characterData: !0 }),
                                            (i = function () {
                                                o.data = n = ++n % 2;
                                            });
                                    } else if (t.setImmediate || void 0 === t.MessageChannel)
                                        i =
                                            "document" in t && "onreadystatechange" in t.document.createElement("script")
                                                ? function () {
                                                      var e = t.document.createElement("script");
                                                      (e.onreadystatechange = function () {
                                                          l(), (e.onreadystatechange = null), e.parentNode.removeChild(e), (e = null);
                                                      }),
                                                          t.document.documentElement.appendChild(e);
                                                  }
                                                : function () {
                                                      setTimeout(l, 0);
                                                  };
                                    else {
                                        var h = new t.MessageChannel();
                                        (h.port1.onmessage = l),
                                            (i = function () {
                                                h.port2.postMessage(0);
                                            });
                                    }
                                    var u = [];
                                    function l() {
                                        var t, e;
                                        r = !0;
                                        for (var i = u.length; i; ) {
                                            for (e = u, u = [], t = -1; ++t < i; ) e[t]();
                                            i = u.length;
                                        }
                                        r = !1;
                                    }
                                    e.exports = function (t) {
                                        1 !== u.push(t) || r || i();
                                    };
                                }).call(this, void 0 !== s ? s : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
                            },
                            {},
                        ],
                        37: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("immediate");
                                function s() {}
                                var n = {},
                                    a = ["REJECTED"],
                                    o = ["FULFILLED"],
                                    h = ["PENDING"];
                                function u(t) {
                                    if ("function" != typeof t) throw new TypeError("resolver must be a function");
                                    (this.state = h), (this.queue = []), (this.outcome = void 0), t !== s && d(this, t);
                                }
                                function l(t, e, i) {
                                    (this.promise = t), "function" == typeof e && ((this.onFulfilled = e), (this.callFulfilled = this.otherCallFulfilled)), "function" == typeof i && ((this.onRejected = i), (this.callRejected = this.otherCallRejected));
                                }
                                function c(t, e, i) {
                                    r(function () {
                                        var r;
                                        try {
                                            r = e(i);
                                        } catch (r) {
                                            return n.reject(t, r);
                                        }
                                        r === t ? n.reject(t, new TypeError("Cannot resolve promise with itself")) : n.resolve(t, r);
                                    });
                                }
                                function f(t) {
                                    var e = t && t.then;
                                    if (t && ("object" == typeof t || "function" == typeof t) && "function" == typeof e)
                                        return function () {
                                            e.apply(t, arguments);
                                        };
                                }
                                function d(t, e) {
                                    var i = !1;
                                    function r(e) {
                                        i || ((i = !0), n.reject(t, e));
                                    }
                                    function s(e) {
                                        i || ((i = !0), n.resolve(t, e));
                                    }
                                    var a = p(function () {
                                        e(s, r);
                                    });
                                    "error" === a.status && r(a.value);
                                }
                                function p(t, e) {
                                    var i = {};
                                    try {
                                        (i.value = t(e)), (i.status = "success");
                                    } catch (t) {
                                        (i.status = "error"), (i.value = t);
                                    }
                                    return i;
                                }
                                ((e.exports = u).prototype.finally = function (t) {
                                    if ("function" != typeof t) return this;
                                    var e = this.constructor;
                                    return this.then(
                                        function (i) {
                                            return e.resolve(t()).then(function () {
                                                return i;
                                            });
                                        },
                                        function (i) {
                                            return e.resolve(t()).then(function () {
                                                throw i;
                                            });
                                        }
                                    );
                                }),
                                    (u.prototype.catch = function (t) {
                                        return this.then(null, t);
                                    }),
                                    (u.prototype.then = function (t, e) {
                                        if (("function" != typeof t && this.state === o) || ("function" != typeof e && this.state === a)) return this;
                                        var i = new this.constructor(s);
                                        return this.state !== h ? c(i, this.state === o ? t : e, this.outcome) : this.queue.push(new l(i, t, e)), i;
                                    }),
                                    (l.prototype.callFulfilled = function (t) {
                                        n.resolve(this.promise, t);
                                    }),
                                    (l.prototype.otherCallFulfilled = function (t) {
                                        c(this.promise, this.onFulfilled, t);
                                    }),
                                    (l.prototype.callRejected = function (t) {
                                        n.reject(this.promise, t);
                                    }),
                                    (l.prototype.otherCallRejected = function (t) {
                                        c(this.promise, this.onRejected, t);
                                    }),
                                    (n.resolve = function (t, e) {
                                        var i = p(f, e);
                                        if ("error" === i.status) return n.reject(t, i.value);
                                        var r = i.value;
                                        if (r) d(t, r);
                                        else {
                                            (t.state = o), (t.outcome = e);
                                            for (var s = -1, a = t.queue.length; ++s < a; ) t.queue[s].callFulfilled(e);
                                        }
                                        return t;
                                    }),
                                    (n.reject = function (t, e) {
                                        (t.state = a), (t.outcome = e);
                                        for (var i = -1, r = t.queue.length; ++i < r; ) t.queue[i].callRejected(e);
                                        return t;
                                    }),
                                    (u.resolve = function (t) {
                                        return t instanceof this ? t : n.resolve(new this(s), t);
                                    }),
                                    (u.reject = function (t) {
                                        var e = new this(s);
                                        return n.reject(e, t);
                                    }),
                                    (u.all = function (t) {
                                        var e = this;
                                        if ("[object Array]" !== Object.prototype.toString.call(t)) return this.reject(new TypeError("must be an array"));
                                        var i = t.length,
                                            r = !1;
                                        if (!i) return this.resolve([]);
                                        for (var a = new Array(i), o = 0, h = -1, u = new this(s); ++h < i; ) l(t[h], h);
                                        return u;
                                        function l(t, s) {
                                            e.resolve(t).then(
                                                function (t) {
                                                    (a[s] = t), ++o !== i || r || ((r = !0), n.resolve(u, a));
                                                },
                                                function (t) {
                                                    r || ((r = !0), n.reject(u, t));
                                                }
                                            );
                                        }
                                    }),
                                    (u.race = function (t) {
                                        if ("[object Array]" !== Object.prototype.toString.call(t)) return this.reject(new TypeError("must be an array"));
                                        var e = t.length,
                                            i = !1;
                                        if (!e) return this.resolve([]);
                                        for (var r, a = -1, o = new this(s); ++a < e; )
                                            (r = t[a]),
                                                this.resolve(r).then(
                                                    function (t) {
                                                        i || ((i = !0), n.resolve(o, t));
                                                    },
                                                    function (t) {
                                                        i || ((i = !0), n.reject(o, t));
                                                    }
                                                );
                                        return o;
                                    });
                            },
                            { immediate: 36 },
                        ],
                        38: [
                            function (t, e, i) {
                                "use strict";
                                var r = {};
                                (0, t("./lib/utils/common").assign)(r, t("./lib/deflate"), t("./lib/inflate"), t("./lib/zlib/constants")), (e.exports = r);
                            },
                            { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 },
                        ],
                        39: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("./zlib/deflate"),
                                    s = t("./utils/common"),
                                    n = t("./utils/strings"),
                                    a = t("./zlib/messages"),
                                    o = t("./zlib/zstream"),
                                    h = Object.prototype.toString;
                                function u(t) {
                                    if (!(this instanceof u)) return new u(t);
                                    this.options = s.assign({ level: -1, method: 8, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: 0, to: "" }, t || {});
                                    var e = this.options;
                                    e.raw && 0 < e.windowBits ? (e.windowBits = -e.windowBits) : e.gzip && 0 < e.windowBits && e.windowBits < 16 && (e.windowBits += 16), (this.err = 0), (this.msg = ""), (this.ended = !1), (this.chunks = []), (this.strm = new o()), (this.strm.avail_out = 0);
                                    var i = r.deflateInit2(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy);
                                    if (0 !== i) throw new Error(a[i]);
                                    if ((e.header && r.deflateSetHeader(this.strm, e.header), e.dictionary)) {
                                        var l;
                                        if (((l = "string" == typeof e.dictionary ? n.string2buf(e.dictionary) : "[object ArrayBuffer]" === h.call(e.dictionary) ? new Uint8Array(e.dictionary) : e.dictionary), 0 !== (i = r.deflateSetDictionary(this.strm, l)))) throw new Error(a[i]);
                                        this._dict_set = !0;
                                    }
                                }
                                function l(t, e) {
                                    var i = new u(e);
                                    if ((i.push(t, !0), i.err)) throw i.msg || a[i.err];
                                    return i.result;
                                }
                                (u.prototype.push = function (t, e) {
                                    var i,
                                        a,
                                        o = this.strm,
                                        u = this.options.chunkSize;
                                    if (this.ended) return !1;
                                    (a = e === ~~e ? e : !0 === e ? 4 : 0), "string" == typeof t ? (o.input = n.string2buf(t)) : "[object ArrayBuffer]" === h.call(t) ? (o.input = new Uint8Array(t)) : (o.input = t), (o.next_in = 0), (o.avail_in = o.input.length);
                                    do {
                                        if ((0 === o.avail_out && ((o.output = new s.Buf8(u)), (o.next_out = 0), (o.avail_out = u)), 1 !== (i = r.deflate(o, a)) && 0 !== i)) return this.onEnd(i), !(this.ended = !0);
                                        (0 !== o.avail_out && (0 !== o.avail_in || (4 !== a && 2 !== a))) || ("string" === this.options.to ? this.onData(n.buf2binstring(s.shrinkBuf(o.output, o.next_out))) : this.onData(s.shrinkBuf(o.output, o.next_out)));
                                    } while ((0 < o.avail_in || 0 === o.avail_out) && 1 !== i);
                                    return 4 === a ? ((i = r.deflateEnd(this.strm)), this.onEnd(i), (this.ended = !0), 0 === i) : 2 !== a || (this.onEnd(0), !(o.avail_out = 0));
                                }),
                                    (u.prototype.onData = function (t) {
                                        this.chunks.push(t);
                                    }),
                                    (u.prototype.onEnd = function (t) {
                                        0 === t && ("string" === this.options.to ? (this.result = this.chunks.join("")) : (this.result = s.flattenChunks(this.chunks))), (this.chunks = []), (this.err = t), (this.msg = this.strm.msg);
                                    }),
                                    (i.Deflate = u),
                                    (i.deflate = l),
                                    (i.deflateRaw = function (t, e) {
                                        return ((e = e || {}).raw = !0), l(t, e);
                                    }),
                                    (i.gzip = function (t, e) {
                                        return ((e = e || {}).gzip = !0), l(t, e);
                                    });
                            },
                            { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 },
                        ],
                        40: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("./zlib/inflate"),
                                    s = t("./utils/common"),
                                    n = t("./utils/strings"),
                                    a = t("./zlib/constants"),
                                    o = t("./zlib/messages"),
                                    h = t("./zlib/zstream"),
                                    u = t("./zlib/gzheader"),
                                    l = Object.prototype.toString;
                                function c(t) {
                                    if (!(this instanceof c)) return new c(t);
                                    this.options = s.assign({ chunkSize: 16384, windowBits: 0, to: "" }, t || {});
                                    var e = this.options;
                                    e.raw && 0 <= e.windowBits && e.windowBits < 16 && ((e.windowBits = -e.windowBits), 0 === e.windowBits && (e.windowBits = -15)),
                                        !(0 <= e.windowBits && e.windowBits < 16) || (t && t.windowBits) || (e.windowBits += 32),
                                        15 < e.windowBits && e.windowBits < 48 && 0 == (15 & e.windowBits) && (e.windowBits |= 15),
                                        (this.err = 0),
                                        (this.msg = ""),
                                        (this.ended = !1),
                                        (this.chunks = []),
                                        (this.strm = new h()),
                                        (this.strm.avail_out = 0);
                                    var i = r.inflateInit2(this.strm, e.windowBits);
                                    if (i !== a.Z_OK) throw new Error(o[i]);
                                    (this.header = new u()), r.inflateGetHeader(this.strm, this.header);
                                }
                                function f(t, e) {
                                    var i = new c(e);
                                    if ((i.push(t, !0), i.err)) throw i.msg || o[i.err];
                                    return i.result;
                                }
                                (c.prototype.push = function (t, e) {
                                    var i,
                                        o,
                                        h,
                                        u,
                                        c,
                                        f,
                                        d = this.strm,
                                        p = this.options.chunkSize,
                                        m = this.options.dictionary,
                                        g = !1;
                                    if (this.ended) return !1;
                                    (o = e === ~~e ? e : !0 === e ? a.Z_FINISH : a.Z_NO_FLUSH), "string" == typeof t ? (d.input = n.binstring2buf(t)) : "[object ArrayBuffer]" === l.call(t) ? (d.input = new Uint8Array(t)) : (d.input = t), (d.next_in = 0), (d.avail_in = d.input.length);
                                    do {
                                        if (
                                            (0 === d.avail_out && ((d.output = new s.Buf8(p)), (d.next_out = 0), (d.avail_out = p)),
                                            (i = r.inflate(d, a.Z_NO_FLUSH)) === a.Z_NEED_DICT && m && ((f = "string" == typeof m ? n.string2buf(m) : "[object ArrayBuffer]" === l.call(m) ? new Uint8Array(m) : m), (i = r.inflateSetDictionary(this.strm, f))),
                                            i === a.Z_BUF_ERROR && !0 === g && ((i = a.Z_OK), (g = !1)),
                                            i !== a.Z_STREAM_END && i !== a.Z_OK)
                                        )
                                            return this.onEnd(i), !(this.ended = !0);
                                        d.next_out &&
                                            ((0 !== d.avail_out && i !== a.Z_STREAM_END && (0 !== d.avail_in || (o !== a.Z_FINISH && o !== a.Z_SYNC_FLUSH))) ||
                                                ("string" === this.options.to
                                                    ? ((h = n.utf8border(d.output, d.next_out)), (u = d.next_out - h), (c = n.buf2string(d.output, h)), (d.next_out = u), (d.avail_out = p - u), u && s.arraySet(d.output, d.output, h, u, 0), this.onData(c))
                                                    : this.onData(s.shrinkBuf(d.output, d.next_out)))),
                                            0 === d.avail_in && 0 === d.avail_out && (g = !0);
                                    } while ((0 < d.avail_in || 0 === d.avail_out) && i !== a.Z_STREAM_END);
                                    return i === a.Z_STREAM_END && (o = a.Z_FINISH), o === a.Z_FINISH ? ((i = r.inflateEnd(this.strm)), this.onEnd(i), (this.ended = !0), i === a.Z_OK) : o !== a.Z_SYNC_FLUSH || (this.onEnd(a.Z_OK), !(d.avail_out = 0));
                                }),
                                    (c.prototype.onData = function (t) {
                                        this.chunks.push(t);
                                    }),
                                    (c.prototype.onEnd = function (t) {
                                        t === a.Z_OK && ("string" === this.options.to ? (this.result = this.chunks.join("")) : (this.result = s.flattenChunks(this.chunks))), (this.chunks = []), (this.err = t), (this.msg = this.strm.msg);
                                    }),
                                    (i.Inflate = c),
                                    (i.inflate = f),
                                    (i.inflateRaw = function (t, e) {
                                        return ((e = e || {}).raw = !0), f(t, e);
                                    }),
                                    (i.ungzip = f);
                            },
                            { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 },
                        ],
                        41: [
                            function (t, e, i) {
                                "use strict";
                                var r = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
                                (i.assign = function (t) {
                                    for (var e = Array.prototype.slice.call(arguments, 1); e.length; ) {
                                        var i = e.shift();
                                        if (i) {
                                            if ("object" != typeof i) throw new TypeError(i + "must be non-object");
                                            for (var r in i) i.hasOwnProperty(r) && (t[r] = i[r]);
                                        }
                                    }
                                    return t;
                                }),
                                    (i.shrinkBuf = function (t, e) {
                                        return t.length === e ? t : t.subarray ? t.subarray(0, e) : ((t.length = e), t);
                                    });
                                var s = {
                                        arraySet: function (t, e, i, r, s) {
                                            if (e.subarray && t.subarray) t.set(e.subarray(i, i + r), s);
                                            else for (var n = 0; n < r; n++) t[s + n] = e[i + n];
                                        },
                                        flattenChunks: function (t) {
                                            var e, i, r, s, n, a;
                                            for (e = r = 0, i = t.length; e < i; e++) r += t[e].length;
                                            for (a = new Uint8Array(r), e = s = 0, i = t.length; e < i; e++) (n = t[e]), a.set(n, s), (s += n.length);
                                            return a;
                                        },
                                    },
                                    n = {
                                        arraySet: function (t, e, i, r, s) {
                                            for (var n = 0; n < r; n++) t[s + n] = e[i + n];
                                        },
                                        flattenChunks: function (t) {
                                            return [].concat.apply([], t);
                                        },
                                    };
                                (i.setTyped = function (t) {
                                    t ? ((i.Buf8 = Uint8Array), (i.Buf16 = Uint16Array), (i.Buf32 = Int32Array), i.assign(i, s)) : ((i.Buf8 = Array), (i.Buf16 = Array), (i.Buf32 = Array), i.assign(i, n));
                                }),
                                    i.setTyped(r);
                            },
                            {},
                        ],
                        42: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("./common"),
                                    s = !0,
                                    n = !0;
                                try {
                                    String.fromCharCode.apply(null, [0]);
                                } catch (t) {
                                    s = !1;
                                }
                                try {
                                    String.fromCharCode.apply(null, new Uint8Array(1));
                                } catch (t) {
                                    n = !1;
                                }
                                for (var a = new r.Buf8(256), o = 0; o < 256; o++) a[o] = 252 <= o ? 6 : 248 <= o ? 5 : 240 <= o ? 4 : 224 <= o ? 3 : 192 <= o ? 2 : 1;
                                function h(t, e) {
                                    if (e < 65537 && ((t.subarray && n) || (!t.subarray && s))) return String.fromCharCode.apply(null, r.shrinkBuf(t, e));
                                    for (var i = "", a = 0; a < e; a++) i += String.fromCharCode(t[a]);
                                    return i;
                                }
                                (a[254] = a[254] = 1),
                                    (i.string2buf = function (t) {
                                        var e,
                                            i,
                                            s,
                                            n,
                                            a,
                                            o = t.length,
                                            h = 0;
                                        for (n = 0; n < o; n++) 55296 == (64512 & (i = t.charCodeAt(n))) && n + 1 < o && 56320 == (64512 & (s = t.charCodeAt(n + 1))) && ((i = 65536 + ((i - 55296) << 10) + (s - 56320)), n++), (h += i < 128 ? 1 : i < 2048 ? 2 : i < 65536 ? 3 : 4);
                                        for (e = new r.Buf8(h), n = a = 0; a < h; n++)
                                            55296 == (64512 & (i = t.charCodeAt(n))) && n + 1 < o && 56320 == (64512 & (s = t.charCodeAt(n + 1))) && ((i = 65536 + ((i - 55296) << 10) + (s - 56320)), n++),
                                                i < 128 ? (e[a++] = i) : (i < 2048 ? (e[a++] = 192 | (i >>> 6)) : (i < 65536 ? (e[a++] = 224 | (i >>> 12)) : ((e[a++] = 240 | (i >>> 18)), (e[a++] = 128 | ((i >>> 12) & 63))), (e[a++] = 128 | ((i >>> 6) & 63))), (e[a++] = 128 | (63 & i)));
                                        return e;
                                    }),
                                    (i.buf2binstring = function (t) {
                                        return h(t, t.length);
                                    }),
                                    (i.binstring2buf = function (t) {
                                        for (var e = new r.Buf8(t.length), i = 0, s = e.length; i < s; i++) e[i] = t.charCodeAt(i);
                                        return e;
                                    }),
                                    (i.buf2string = function (t, e) {
                                        var i,
                                            r,
                                            s,
                                            n,
                                            o = e || t.length,
                                            u = new Array(2 * o);
                                        for (i = r = 0; i < o; )
                                            if ((s = t[i++]) < 128) u[r++] = s;
                                            else if (4 < (n = a[s])) (u[r++] = 65533), (i += n - 1);
                                            else {
                                                for (s &= 2 === n ? 31 : 3 === n ? 15 : 7; 1 < n && i < o; ) (s = (s << 6) | (63 & t[i++])), n--;
                                                1 < n ? (u[r++] = 65533) : s < 65536 ? (u[r++] = s) : ((s -= 65536), (u[r++] = 55296 | ((s >> 10) & 1023)), (u[r++] = 56320 | (1023 & s)));
                                            }
                                        return h(u, r);
                                    }),
                                    (i.utf8border = function (t, e) {
                                        var i;
                                        for ((e = e || t.length) > t.length && (e = t.length), i = e - 1; 0 <= i && 128 == (192 & t[i]); ) i--;
                                        return i < 0 || 0 === i ? e : i + a[t[i]] > e ? i : e;
                                    });
                            },
                            { "./common": 41 },
                        ],
                        43: [
                            function (t, e, i) {
                                "use strict";
                                e.exports = function (t, e, i, r) {
                                    for (var s = (65535 & t) | 0, n = ((t >>> 16) & 65535) | 0, a = 0; 0 !== i; ) {
                                        for (i -= a = 2e3 < i ? 2e3 : i; (n = (n + (s = (s + e[r++]) | 0)) | 0), --a; );
                                        (s %= 65521), (n %= 65521);
                                    }
                                    return s | (n << 16) | 0;
                                };
                            },
                            {},
                        ],
                        44: [
                            function (t, e, i) {
                                "use strict";
                                e.exports = {
                                    Z_NO_FLUSH: 0,
                                    Z_PARTIAL_FLUSH: 1,
                                    Z_SYNC_FLUSH: 2,
                                    Z_FULL_FLUSH: 3,
                                    Z_FINISH: 4,
                                    Z_BLOCK: 5,
                                    Z_TREES: 6,
                                    Z_OK: 0,
                                    Z_STREAM_END: 1,
                                    Z_NEED_DICT: 2,
                                    Z_ERRNO: -1,
                                    Z_STREAM_ERROR: -2,
                                    Z_DATA_ERROR: -3,
                                    Z_BUF_ERROR: -5,
                                    Z_NO_COMPRESSION: 0,
                                    Z_BEST_SPEED: 1,
                                    Z_BEST_COMPRESSION: 9,
                                    Z_DEFAULT_COMPRESSION: -1,
                                    Z_FILTERED: 1,
                                    Z_HUFFMAN_ONLY: 2,
                                    Z_RLE: 3,
                                    Z_FIXED: 4,
                                    Z_DEFAULT_STRATEGY: 0,
                                    Z_BINARY: 0,
                                    Z_TEXT: 1,
                                    Z_UNKNOWN: 2,
                                    Z_DEFLATED: 8,
                                };
                            },
                            {},
                        ],
                        45: [
                            function (t, e, i) {
                                "use strict";
                                var r = (function () {
                                    for (var t, e = [], i = 0; i < 256; i++) {
                                        t = i;
                                        for (var r = 0; r < 8; r++) t = 1 & t ? 3988292384 ^ (t >>> 1) : t >>> 1;
                                        e[i] = t;
                                    }
                                    return e;
                                })();
                                e.exports = function (t, e, i, s) {
                                    var n = r,
                                        a = s + i;
                                    t ^= -1;
                                    for (var o = s; o < a; o++) t = (t >>> 8) ^ n[255 & (t ^ e[o])];
                                    return -1 ^ t;
                                };
                            },
                            {},
                        ],
                        46: [
                            function (t, e, i) {
                                "use strict";
                                var r,
                                    s = t("../utils/common"),
                                    n = t("./trees"),
                                    a = t("./adler32"),
                                    o = t("./crc32"),
                                    h = t("./messages"),
                                    u = -2,
                                    l = 258,
                                    c = 262,
                                    f = 113;
                                function d(t, e) {
                                    return (t.msg = h[e]), e;
                                }
                                function p(t) {
                                    return (t << 1) - (4 < t ? 9 : 0);
                                }
                                function m(t) {
                                    for (var e = t.length; 0 <= --e; ) t[e] = 0;
                                }
                                function g(t) {
                                    var e = t.state,
                                        i = e.pending;
                                    i > t.avail_out && (i = t.avail_out), 0 !== i && (s.arraySet(t.output, e.pending_buf, e.pending_out, i, t.next_out), (t.next_out += i), (e.pending_out += i), (t.total_out += i), (t.avail_out -= i), (e.pending -= i), 0 === e.pending && (e.pending_out = 0));
                                }
                                function _(t, e) {
                                    n._tr_flush_block(t, 0 <= t.block_start ? t.block_start : -1, t.strstart - t.block_start, e), (t.block_start = t.strstart), g(t.strm);
                                }
                                function y(t, e) {
                                    t.pending_buf[t.pending++] = e;
                                }
                                function v(t, e) {
                                    (t.pending_buf[t.pending++] = (e >>> 8) & 255), (t.pending_buf[t.pending++] = 255 & e);
                                }
                                function b(t, e) {
                                    var i,
                                        r,
                                        s = t.max_chain_length,
                                        n = t.strstart,
                                        a = t.prev_length,
                                        o = t.nice_match,
                                        h = t.strstart > t.w_size - c ? t.strstart - (t.w_size - c) : 0,
                                        u = t.window,
                                        f = t.w_mask,
                                        d = t.prev,
                                        p = t.strstart + l,
                                        m = u[n + a - 1],
                                        g = u[n + a];
                                    t.prev_length >= t.good_match && (s >>= 2), o > t.lookahead && (o = t.lookahead);
                                    do {
                                        if (u[(i = e) + a] === g && u[i + a - 1] === m && u[i] === u[n] && u[++i] === u[n + 1]) {
                                            (n += 2), i++;
                                            do {} while (u[++n] === u[++i] && u[++n] === u[++i] && u[++n] === u[++i] && u[++n] === u[++i] && u[++n] === u[++i] && u[++n] === u[++i] && u[++n] === u[++i] && u[++n] === u[++i] && n < p);
                                            if (((r = l - (p - n)), (n = p - l), a < r)) {
                                                if (((t.match_start = e), o <= (a = r))) break;
                                                (m = u[n + a - 1]), (g = u[n + a]);
                                            }
                                        }
                                    } while ((e = d[e & f]) > h && 0 != --s);
                                    return a <= t.lookahead ? a : t.lookahead;
                                }
                                function w(t) {
                                    var e,
                                        i,
                                        r,
                                        n,
                                        h,
                                        u,
                                        l,
                                        f,
                                        d,
                                        p,
                                        m = t.w_size;
                                    do {
                                        if (((n = t.window_size - t.lookahead - t.strstart), t.strstart >= m + (m - c))) {
                                            for (s.arraySet(t.window, t.window, m, m, 0), t.match_start -= m, t.strstart -= m, t.block_start -= m, e = i = t.hash_size; (r = t.head[--e]), (t.head[e] = m <= r ? r - m : 0), --i; );
                                            for (e = i = m; (r = t.prev[--e]), (t.prev[e] = m <= r ? r - m : 0), --i; );
                                            n += m;
                                        }
                                        if (0 === t.strm.avail_in) break;
                                        if (
                                            ((u = t.strm),
                                            (l = t.window),
                                            (f = t.strstart + t.lookahead),
                                            (p = void 0),
                                            (d = n) < (p = u.avail_in) && (p = d),
                                            (i = 0 === p ? 0 : ((u.avail_in -= p), s.arraySet(l, u.input, u.next_in, p, f), 1 === u.state.wrap ? (u.adler = a(u.adler, l, p, f)) : 2 === u.state.wrap && (u.adler = o(u.adler, l, p, f)), (u.next_in += p), (u.total_in += p), p)),
                                            (t.lookahead += i),
                                            t.lookahead + t.insert >= 3)
                                        )
                                            for (
                                                h = t.strstart - t.insert, t.ins_h = t.window[h], t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[h + 1]) & t.hash_mask;
                                                t.insert && ((t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[h + 3 - 1]) & t.hash_mask), (t.prev[h & t.w_mask] = t.head[t.ins_h]), (t.head[t.ins_h] = h), h++, t.insert--, !(t.lookahead + t.insert < 3));

                                            );
                                    } while (t.lookahead < c && 0 !== t.strm.avail_in);
                                }
                                function M(t, e) {
                                    for (var i, r; ; ) {
                                        if (t.lookahead < c) {
                                            if ((w(t), t.lookahead < c && 0 === e)) return 1;
                                            if (0 === t.lookahead) break;
                                        }
                                        if (
                                            ((i = 0),
                                            t.lookahead >= 3 && ((t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + 3 - 1]) & t.hash_mask), (i = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]), (t.head[t.ins_h] = t.strstart)),
                                            0 !== i && t.strstart - i <= t.w_size - c && (t.match_length = b(t, i)),
                                            t.match_length >= 3)
                                        )
                                            if (((r = n._tr_tally(t, t.strstart - t.match_start, t.match_length - 3)), (t.lookahead -= t.match_length), t.match_length <= t.max_lazy_match && t.lookahead >= 3)) {
                                                for (t.match_length--; t.strstart++, (t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + 3 - 1]) & t.hash_mask), (i = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]), (t.head[t.ins_h] = t.strstart), 0 != --t.match_length; );
                                                t.strstart++;
                                            } else (t.strstart += t.match_length), (t.match_length = 0), (t.ins_h = t.window[t.strstart]), (t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + 1]) & t.hash_mask);
                                        else (r = n._tr_tally(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++;
                                        if (r && (_(t, !1), 0 === t.strm.avail_out)) return 1;
                                    }
                                    return (t.insert = t.strstart < 2 ? t.strstart : 2), 4 === e ? (_(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (_(t, !1), 0 === t.strm.avail_out) ? 1 : 2;
                                }
                                function x(t, e) {
                                    for (var i, r, s; ; ) {
                                        if (t.lookahead < c) {
                                            if ((w(t), t.lookahead < c && 0 === e)) return 1;
                                            if (0 === t.lookahead) break;
                                        }
                                        if (
                                            ((i = 0),
                                            t.lookahead >= 3 && ((t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + 3 - 1]) & t.hash_mask), (i = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]), (t.head[t.ins_h] = t.strstart)),
                                            (t.prev_length = t.match_length),
                                            (t.prev_match = t.match_start),
                                            (t.match_length = 2),
                                            0 !== i && t.prev_length < t.max_lazy_match && t.strstart - i <= t.w_size - c && ((t.match_length = b(t, i)), t.match_length <= 5 && (1 === t.strategy || (3 === t.match_length && 4096 < t.strstart - t.match_start)) && (t.match_length = 2)),
                                            t.prev_length >= 3 && t.match_length <= t.prev_length)
                                        ) {
                                            for (
                                                s = t.strstart + t.lookahead - 3, r = n._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - 3), t.lookahead -= t.prev_length - 1, t.prev_length -= 2;
                                                ++t.strstart <= s && ((t.ins_h = ((t.ins_h << t.hash_shift) ^ t.window[t.strstart + 3 - 1]) & t.hash_mask), (i = t.prev[t.strstart & t.w_mask] = t.head[t.ins_h]), (t.head[t.ins_h] = t.strstart)), 0 != --t.prev_length;

                                            );
                                            if (((t.match_available = 0), (t.match_length = 2), t.strstart++, r && (_(t, !1), 0 === t.strm.avail_out))) return 1;
                                        } else if (t.match_available) {
                                            if (((r = n._tr_tally(t, 0, t.window[t.strstart - 1])) && _(t, !1), t.strstart++, t.lookahead--, 0 === t.strm.avail_out)) return 1;
                                        } else (t.match_available = 1), t.strstart++, t.lookahead--;
                                    }
                                    return t.match_available && ((r = n._tr_tally(t, 0, t.window[t.strstart - 1])), (t.match_available = 0)), (t.insert = t.strstart < 2 ? t.strstart : 2), 4 === e ? (_(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (_(t, !1), 0 === t.strm.avail_out) ? 1 : 2;
                                }
                                function k(t, e, i, r, s) {
                                    (this.good_length = t), (this.max_lazy = e), (this.nice_length = i), (this.max_chain = r), (this.func = s);
                                }
                                function S() {
                                    (this.strm = null),
                                        (this.status = 0),
                                        (this.pending_buf = null),
                                        (this.pending_buf_size = 0),
                                        (this.pending_out = 0),
                                        (this.pending = 0),
                                        (this.wrap = 0),
                                        (this.gzhead = null),
                                        (this.gzindex = 0),
                                        (this.method = 8),
                                        (this.last_flush = -1),
                                        (this.w_size = 0),
                                        (this.w_bits = 0),
                                        (this.w_mask = 0),
                                        (this.window = null),
                                        (this.window_size = 0),
                                        (this.prev = null),
                                        (this.head = null),
                                        (this.ins_h = 0),
                                        (this.hash_size = 0),
                                        (this.hash_bits = 0),
                                        (this.hash_mask = 0),
                                        (this.hash_shift = 0),
                                        (this.block_start = 0),
                                        (this.match_length = 0),
                                        (this.prev_match = 0),
                                        (this.match_available = 0),
                                        (this.strstart = 0),
                                        (this.match_start = 0),
                                        (this.lookahead = 0),
                                        (this.prev_length = 0),
                                        (this.max_chain_length = 0),
                                        (this.max_lazy_match = 0),
                                        (this.level = 0),
                                        (this.strategy = 0),
                                        (this.good_match = 0),
                                        (this.nice_match = 0),
                                        (this.dyn_ltree = new s.Buf16(1146)),
                                        (this.dyn_dtree = new s.Buf16(122)),
                                        (this.bl_tree = new s.Buf16(78)),
                                        m(this.dyn_ltree),
                                        m(this.dyn_dtree),
                                        m(this.bl_tree),
                                        (this.l_desc = null),
                                        (this.d_desc = null),
                                        (this.bl_desc = null),
                                        (this.bl_count = new s.Buf16(16)),
                                        (this.heap = new s.Buf16(573)),
                                        m(this.heap),
                                        (this.heap_len = 0),
                                        (this.heap_max = 0),
                                        (this.depth = new s.Buf16(573)),
                                        m(this.depth),
                                        (this.l_buf = 0),
                                        (this.lit_bufsize = 0),
                                        (this.last_lit = 0),
                                        (this.d_buf = 0),
                                        (this.opt_len = 0),
                                        (this.static_len = 0),
                                        (this.matches = 0),
                                        (this.insert = 0),
                                        (this.bi_buf = 0),
                                        (this.bi_valid = 0);
                                }
                                function E(t) {
                                    var e;
                                    return t && t.state
                                        ? ((t.total_in = t.total_out = 0), (t.data_type = 2), ((e = t.state).pending = 0), (e.pending_out = 0), e.wrap < 0 && (e.wrap = -e.wrap), (e.status = e.wrap ? 42 : f), (t.adler = 2 === e.wrap ? 0 : 1), (e.last_flush = 0), n._tr_init(e), 0)
                                        : d(t, u);
                                }
                                function C(t) {
                                    var e = E(t);
                                    return (
                                        0 === e &&
                                            (function (t) {
                                                (t.window_size = 2 * t.w_size),
                                                    m(t.head),
                                                    (t.max_lazy_match = r[t.level].max_lazy),
                                                    (t.good_match = r[t.level].good_length),
                                                    (t.nice_match = r[t.level].nice_length),
                                                    (t.max_chain_length = r[t.level].max_chain),
                                                    (t.strstart = 0),
                                                    (t.block_start = 0),
                                                    (t.lookahead = 0),
                                                    (t.insert = 0),
                                                    (t.match_length = t.prev_length = 2),
                                                    (t.match_available = 0),
                                                    (t.ins_h = 0);
                                            })(t.state),
                                        e
                                    );
                                }
                                function A(t, e, i, r, n, a) {
                                    if (!t) return u;
                                    var o = 1;
                                    if ((-1 === e && (e = 6), r < 0 ? ((o = 0), (r = -r)) : 15 < r && ((o = 2), (r -= 16)), n < 1 || 9 < n || 8 !== i || r < 8 || 15 < r || e < 0 || 9 < e || a < 0 || 4 < a)) return d(t, u);
                                    8 === r && (r = 9);
                                    var h = new S();
                                    return (
                                        ((t.state = h).strm = t),
                                        (h.wrap = o),
                                        (h.gzhead = null),
                                        (h.w_bits = r),
                                        (h.w_size = 1 << h.w_bits),
                                        (h.w_mask = h.w_size - 1),
                                        (h.hash_bits = n + 7),
                                        (h.hash_size = 1 << h.hash_bits),
                                        (h.hash_mask = h.hash_size - 1),
                                        (h.hash_shift = ~~((h.hash_bits + 3 - 1) / 3)),
                                        (h.window = new s.Buf8(2 * h.w_size)),
                                        (h.head = new s.Buf16(h.hash_size)),
                                        (h.prev = new s.Buf16(h.w_size)),
                                        (h.lit_bufsize = 1 << (n + 6)),
                                        (h.pending_buf_size = 4 * h.lit_bufsize),
                                        (h.pending_buf = new s.Buf8(h.pending_buf_size)),
                                        (h.d_buf = 1 * h.lit_bufsize),
                                        (h.l_buf = 3 * h.lit_bufsize),
                                        (h.level = e),
                                        (h.strategy = a),
                                        (h.method = i),
                                        C(t)
                                    );
                                }
                                (r = [
                                    new k(0, 0, 0, 0, function (t, e) {
                                        var i = 65535;
                                        for (i > t.pending_buf_size - 5 && (i = t.pending_buf_size - 5); ; ) {
                                            if (t.lookahead <= 1) {
                                                if ((w(t), 0 === t.lookahead && 0 === e)) return 1;
                                                if (0 === t.lookahead) break;
                                            }
                                            (t.strstart += t.lookahead), (t.lookahead = 0);
                                            var r = t.block_start + i;
                                            if ((0 === t.strstart || t.strstart >= r) && ((t.lookahead = t.strstart - r), (t.strstart = r), _(t, !1), 0 === t.strm.avail_out)) return 1;
                                            if (t.strstart - t.block_start >= t.w_size - c && (_(t, !1), 0 === t.strm.avail_out)) return 1;
                                        }
                                        return (t.insert = 0), 4 === e ? (_(t, !0), 0 === t.strm.avail_out ? 3 : 4) : (t.strstart > t.block_start && (_(t, !1), t.strm.avail_out), 1);
                                    }),
                                    new k(4, 4, 8, 4, M),
                                    new k(4, 5, 16, 8, M),
                                    new k(4, 6, 32, 32, M),
                                    new k(4, 4, 16, 16, x),
                                    new k(8, 16, 32, 32, x),
                                    new k(8, 16, 128, 128, x),
                                    new k(8, 32, 128, 256, x),
                                    new k(32, 128, 258, 1024, x),
                                    new k(32, 258, 258, 4096, x),
                                ]),
                                    (i.deflateInit = function (t, e) {
                                        return A(t, e, 8, 15, 8, 0);
                                    }),
                                    (i.deflateInit2 = A),
                                    (i.deflateReset = C),
                                    (i.deflateResetKeep = E),
                                    (i.deflateSetHeader = function (t, e) {
                                        return t && t.state ? (2 !== t.state.wrap ? u : ((t.state.gzhead = e), 0)) : u;
                                    }),
                                    (i.deflate = function (t, e) {
                                        var i, s, a, h;
                                        if (!t || !t.state || 5 < e || e < 0) return t ? d(t, u) : u;
                                        if (((s = t.state), !t.output || (!t.input && 0 !== t.avail_in) || (666 === s.status && 4 !== e))) return d(t, 0 === t.avail_out ? -5 : u);
                                        if (((s.strm = t), (i = s.last_flush), (s.last_flush = e), 42 === s.status))
                                            if (2 === s.wrap)
                                                (t.adler = 0),
                                                    y(s, 31),
                                                    y(s, 139),
                                                    y(s, 8),
                                                    s.gzhead
                                                        ? (y(s, (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (s.gzhead.extra ? 4 : 0) + (s.gzhead.name ? 8 : 0) + (s.gzhead.comment ? 16 : 0)),
                                                          y(s, 255 & s.gzhead.time),
                                                          y(s, (s.gzhead.time >> 8) & 255),
                                                          y(s, (s.gzhead.time >> 16) & 255),
                                                          y(s, (s.gzhead.time >> 24) & 255),
                                                          y(s, 9 === s.level ? 2 : 2 <= s.strategy || s.level < 2 ? 4 : 0),
                                                          y(s, 255 & s.gzhead.os),
                                                          s.gzhead.extra && s.gzhead.extra.length && (y(s, 255 & s.gzhead.extra.length), y(s, (s.gzhead.extra.length >> 8) & 255)),
                                                          s.gzhead.hcrc && (t.adler = o(t.adler, s.pending_buf, s.pending, 0)),
                                                          (s.gzindex = 0),
                                                          (s.status = 69))
                                                        : (y(s, 0), y(s, 0), y(s, 0), y(s, 0), y(s, 0), y(s, 9 === s.level ? 2 : 2 <= s.strategy || s.level < 2 ? 4 : 0), y(s, 3), (s.status = f));
                                            else {
                                                var c = (8 + ((s.w_bits - 8) << 4)) << 8;
                                                (c |= (2 <= s.strategy || s.level < 2 ? 0 : s.level < 6 ? 1 : 6 === s.level ? 2 : 3) << 6), 0 !== s.strstart && (c |= 32), (c += 31 - (c % 31)), (s.status = f), v(s, c), 0 !== s.strstart && (v(s, t.adler >>> 16), v(s, 65535 & t.adler)), (t.adler = 1);
                                            }
                                        if (69 === s.status)
                                            if (s.gzhead.extra) {
                                                for (
                                                    a = s.pending;
                                                    s.gzindex < (65535 & s.gzhead.extra.length) && (s.pending !== s.pending_buf_size || (s.gzhead.hcrc && s.pending > a && (t.adler = o(t.adler, s.pending_buf, s.pending - a, a)), g(t), (a = s.pending), s.pending !== s.pending_buf_size));

                                                )
                                                    y(s, 255 & s.gzhead.extra[s.gzindex]), s.gzindex++;
                                                s.gzhead.hcrc && s.pending > a && (t.adler = o(t.adler, s.pending_buf, s.pending - a, a)), s.gzindex === s.gzhead.extra.length && ((s.gzindex = 0), (s.status = 73));
                                            } else s.status = 73;
                                        if (73 === s.status)
                                            if (s.gzhead.name) {
                                                a = s.pending;
                                                do {
                                                    if (s.pending === s.pending_buf_size && (s.gzhead.hcrc && s.pending > a && (t.adler = o(t.adler, s.pending_buf, s.pending - a, a)), g(t), (a = s.pending), s.pending === s.pending_buf_size)) {
                                                        h = 1;
                                                        break;
                                                    }
                                                    (h = s.gzindex < s.gzhead.name.length ? 255 & s.gzhead.name.charCodeAt(s.gzindex++) : 0), y(s, h);
                                                } while (0 !== h);
                                                s.gzhead.hcrc && s.pending > a && (t.adler = o(t.adler, s.pending_buf, s.pending - a, a)), 0 === h && ((s.gzindex = 0), (s.status = 91));
                                            } else s.status = 91;
                                        if (91 === s.status)
                                            if (s.gzhead.comment) {
                                                a = s.pending;
                                                do {
                                                    if (s.pending === s.pending_buf_size && (s.gzhead.hcrc && s.pending > a && (t.adler = o(t.adler, s.pending_buf, s.pending - a, a)), g(t), (a = s.pending), s.pending === s.pending_buf_size)) {
                                                        h = 1;
                                                        break;
                                                    }
                                                    (h = s.gzindex < s.gzhead.comment.length ? 255 & s.gzhead.comment.charCodeAt(s.gzindex++) : 0), y(s, h);
                                                } while (0 !== h);
                                                s.gzhead.hcrc && s.pending > a && (t.adler = o(t.adler, s.pending_buf, s.pending - a, a)), 0 === h && (s.status = 103);
                                            } else s.status = 103;
                                        if ((103 === s.status && (s.gzhead.hcrc ? (s.pending + 2 > s.pending_buf_size && g(t), s.pending + 2 <= s.pending_buf_size && (y(s, 255 & t.adler), y(s, (t.adler >> 8) & 255), (t.adler = 0), (s.status = f))) : (s.status = f)), 0 !== s.pending)) {
                                            if ((g(t), 0 === t.avail_out)) return (s.last_flush = -1), 0;
                                        } else if (0 === t.avail_in && p(e) <= p(i) && 4 !== e) return d(t, -5);
                                        if (666 === s.status && 0 !== t.avail_in) return d(t, -5);
                                        if (0 !== t.avail_in || 0 !== s.lookahead || (0 !== e && 666 !== s.status)) {
                                            var b =
                                                2 === s.strategy
                                                    ? (function (t, e) {
                                                          for (var i; ; ) {
                                                              if (0 === t.lookahead && (w(t), 0 === t.lookahead)) {
                                                                  if (0 === e) return 1;
                                                                  break;
                                                              }
                                                              if (((t.match_length = 0), (i = n._tr_tally(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++, i && (_(t, !1), 0 === t.strm.avail_out))) return 1;
                                                          }
                                                          return (t.insert = 0), 4 === e ? (_(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (_(t, !1), 0 === t.strm.avail_out) ? 1 : 2;
                                                      })(s, e)
                                                    : 3 === s.strategy
                                                    ? (function (t, e) {
                                                          for (var i, r, s, a, o = t.window; ; ) {
                                                              if (t.lookahead <= l) {
                                                                  if ((w(t), t.lookahead <= l && 0 === e)) return 1;
                                                                  if (0 === t.lookahead) break;
                                                              }
                                                              if (((t.match_length = 0), t.lookahead >= 3 && 0 < t.strstart && (r = o[(s = t.strstart - 1)]) === o[++s] && r === o[++s] && r === o[++s])) {
                                                                  a = t.strstart + l;
                                                                  do {} while (r === o[++s] && r === o[++s] && r === o[++s] && r === o[++s] && r === o[++s] && r === o[++s] && r === o[++s] && r === o[++s] && s < a);
                                                                  (t.match_length = l - (a - s)), t.match_length > t.lookahead && (t.match_length = t.lookahead);
                                                              }
                                                              if (
                                                                  (t.match_length >= 3
                                                                      ? ((i = n._tr_tally(t, 1, t.match_length - 3)), (t.lookahead -= t.match_length), (t.strstart += t.match_length), (t.match_length = 0))
                                                                      : ((i = n._tr_tally(t, 0, t.window[t.strstart])), t.lookahead--, t.strstart++),
                                                                  i && (_(t, !1), 0 === t.strm.avail_out))
                                                              )
                                                                  return 1;
                                                          }
                                                          return (t.insert = 0), 4 === e ? (_(t, !0), 0 === t.strm.avail_out ? 3 : 4) : t.last_lit && (_(t, !1), 0 === t.strm.avail_out) ? 1 : 2;
                                                      })(s, e)
                                                    : r[s.level].func(s, e);
                                            if (((3 !== b && 4 !== b) || (s.status = 666), 1 === b || 3 === b)) return 0 === t.avail_out && (s.last_flush = -1), 0;
                                            if (2 === b && (1 === e ? n._tr_align(s) : 5 !== e && (n._tr_stored_block(s, 0, 0, !1), 3 === e && (m(s.head), 0 === s.lookahead && ((s.strstart = 0), (s.block_start = 0), (s.insert = 0)))), g(t), 0 === t.avail_out)) return (s.last_flush = -1), 0;
                                        }
                                        return 4 !== e
                                            ? 0
                                            : s.wrap <= 0
                                            ? 1
                                            : (2 === s.wrap
                                                  ? (y(s, 255 & t.adler), y(s, (t.adler >> 8) & 255), y(s, (t.adler >> 16) & 255), y(s, (t.adler >> 24) & 255), y(s, 255 & t.total_in), y(s, (t.total_in >> 8) & 255), y(s, (t.total_in >> 16) & 255), y(s, (t.total_in >> 24) & 255))
                                                  : (v(s, t.adler >>> 16), v(s, 65535 & t.adler)),
                                              g(t),
                                              0 < s.wrap && (s.wrap = -s.wrap),
                                              0 !== s.pending ? 0 : 1);
                                    }),
                                    (i.deflateEnd = function (t) {
                                        var e;
                                        return t && t.state ? (42 !== (e = t.state.status) && 69 !== e && 73 !== e && 91 !== e && 103 !== e && e !== f && 666 !== e ? d(t, u) : ((t.state = null), e === f ? d(t, -3) : 0)) : u;
                                    }),
                                    (i.deflateSetDictionary = function (t, e) {
                                        var i,
                                            r,
                                            n,
                                            o,
                                            h,
                                            l,
                                            c,
                                            f,
                                            d = e.length;
                                        if (!t || !t.state) return u;
                                        if (2 === (o = (i = t.state).wrap) || (1 === o && 42 !== i.status) || i.lookahead) return u;
                                        for (
                                            1 === o && (t.adler = a(t.adler, e, d, 0)),
                                                i.wrap = 0,
                                                d >= i.w_size && (0 === o && (m(i.head), (i.strstart = 0), (i.block_start = 0), (i.insert = 0)), (f = new s.Buf8(i.w_size)), s.arraySet(f, e, d - i.w_size, i.w_size, 0), (e = f), (d = i.w_size)),
                                                h = t.avail_in,
                                                l = t.next_in,
                                                c = t.input,
                                                t.avail_in = d,
                                                t.next_in = 0,
                                                t.input = e,
                                                w(i);
                                            i.lookahead >= 3;

                                        ) {
                                            for (r = i.strstart, n = i.lookahead - 2; (i.ins_h = ((i.ins_h << i.hash_shift) ^ i.window[r + 3 - 1]) & i.hash_mask), (i.prev[r & i.w_mask] = i.head[i.ins_h]), (i.head[i.ins_h] = r), r++, --n; );
                                            (i.strstart = r), (i.lookahead = 2), w(i);
                                        }
                                        return (i.strstart += i.lookahead), (i.block_start = i.strstart), (i.insert = i.lookahead), (i.lookahead = 0), (i.match_length = i.prev_length = 2), (i.match_available = 0), (t.next_in = l), (t.input = c), (t.avail_in = h), (i.wrap = o), 0;
                                    }),
                                    (i.deflateInfo = "pako deflate (from Nodeca project)");
                            },
                            { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 },
                        ],
                        47: [
                            function (t, e, i) {
                                "use strict";
                                e.exports = function () {
                                    (this.text = 0), (this.time = 0), (this.xflags = 0), (this.os = 0), (this.extra = null), (this.extra_len = 0), (this.name = ""), (this.comment = ""), (this.hcrc = 0), (this.done = !1);
                                };
                            },
                            {},
                        ],
                        48: [
                            function (t, e, i) {
                                "use strict";
                                e.exports = function (t, e) {
                                    var i, r, s, n, a, o, h, u, l, c, f, d, p, m, g, _, y, v, b, w, M, x, k, S, E;
                                    (i = t.state),
                                        (r = t.next_in),
                                        (S = t.input),
                                        (s = r + (t.avail_in - 5)),
                                        (n = t.next_out),
                                        (E = t.output),
                                        (a = n - (e - t.avail_out)),
                                        (o = n + (t.avail_out - 257)),
                                        (h = i.dmax),
                                        (u = i.wsize),
                                        (l = i.whave),
                                        (c = i.wnext),
                                        (f = i.window),
                                        (d = i.hold),
                                        (p = i.bits),
                                        (m = i.lencode),
                                        (g = i.distcode),
                                        (_ = (1 << i.lenbits) - 1),
                                        (y = (1 << i.distbits) - 1);
                                    t: do {
                                        p < 15 && ((d += S[r++] << p), (p += 8), (d += S[r++] << p), (p += 8)), (v = m[d & _]);
                                        e: for (;;) {
                                            if (((d >>>= b = v >>> 24), (p -= b), 0 == (b = (v >>> 16) & 255))) E[n++] = 65535 & v;
                                            else {
                                                if (!(16 & b)) {
                                                    if (0 == (64 & b)) {
                                                        v = m[(65535 & v) + (d & ((1 << b) - 1))];
                                                        continue e;
                                                    }
                                                    if (32 & b) {
                                                        i.mode = 12;
                                                        break t;
                                                    }
                                                    (t.msg = "invalid literal/length code"), (i.mode = 30);
                                                    break t;
                                                }
                                                (w = 65535 & v), (b &= 15) && (p < b && ((d += S[r++] << p), (p += 8)), (w += d & ((1 << b) - 1)), (d >>>= b), (p -= b)), p < 15 && ((d += S[r++] << p), (p += 8), (d += S[r++] << p), (p += 8)), (v = g[d & y]);
                                                i: for (;;) {
                                                    if (((d >>>= b = v >>> 24), (p -= b), !(16 & (b = (v >>> 16) & 255)))) {
                                                        if (0 == (64 & b)) {
                                                            v = g[(65535 & v) + (d & ((1 << b) - 1))];
                                                            continue i;
                                                        }
                                                        (t.msg = "invalid distance code"), (i.mode = 30);
                                                        break t;
                                                    }
                                                    if (((M = 65535 & v), p < (b &= 15) && ((d += S[r++] << p), (p += 8) < b && ((d += S[r++] << p), (p += 8))), h < (M += d & ((1 << b) - 1)))) {
                                                        (t.msg = "invalid distance too far back"), (i.mode = 30);
                                                        break t;
                                                    }
                                                    if (((d >>>= b), (p -= b), (b = n - a) < M)) {
                                                        if (l < (b = M - b) && i.sane) {
                                                            (t.msg = "invalid distance too far back"), (i.mode = 30);
                                                            break t;
                                                        }
                                                        if (((k = f), (x = 0) === c)) {
                                                            if (((x += u - b), b < w)) {
                                                                for (w -= b; (E[n++] = f[x++]), --b; );
                                                                (x = n - M), (k = E);
                                                            }
                                                        } else if (c < b) {
                                                            if (((x += u + c - b), (b -= c) < w)) {
                                                                for (w -= b; (E[n++] = f[x++]), --b; );
                                                                if (((x = 0), c < w)) {
                                                                    for (w -= b = c; (E[n++] = f[x++]), --b; );
                                                                    (x = n - M), (k = E);
                                                                }
                                                            }
                                                        } else if (((x += c - b), b < w)) {
                                                            for (w -= b; (E[n++] = f[x++]), --b; );
                                                            (x = n - M), (k = E);
                                                        }
                                                        for (; 2 < w; ) (E[n++] = k[x++]), (E[n++] = k[x++]), (E[n++] = k[x++]), (w -= 3);
                                                        w && ((E[n++] = k[x++]), 1 < w && (E[n++] = k[x++]));
                                                    } else {
                                                        for (x = n - M; (E[n++] = E[x++]), (E[n++] = E[x++]), (E[n++] = E[x++]), 2 < (w -= 3); );
                                                        w && ((E[n++] = E[x++]), 1 < w && (E[n++] = E[x++]));
                                                    }
                                                    break;
                                                }
                                            }
                                            break;
                                        }
                                    } while (r < s && n < o);
                                    (r -= w = p >> 3), (d &= (1 << (p -= w << 3)) - 1), (t.next_in = r), (t.next_out = n), (t.avail_in = r < s ? s - r + 5 : 5 - (r - s)), (t.avail_out = n < o ? o - n + 257 : 257 - (n - o)), (i.hold = d), (i.bits = p);
                                };
                            },
                            {},
                        ],
                        49: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("../utils/common"),
                                    s = t("./adler32"),
                                    n = t("./crc32"),
                                    a = t("./inffast"),
                                    o = t("./inftrees"),
                                    h = -2;
                                function u(t) {
                                    return ((t >>> 24) & 255) + ((t >>> 8) & 65280) + ((65280 & t) << 8) + ((255 & t) << 24);
                                }
                                function l() {
                                    (this.mode = 0),
                                        (this.last = !1),
                                        (this.wrap = 0),
                                        (this.havedict = !1),
                                        (this.flags = 0),
                                        (this.dmax = 0),
                                        (this.check = 0),
                                        (this.total = 0),
                                        (this.head = null),
                                        (this.wbits = 0),
                                        (this.wsize = 0),
                                        (this.whave = 0),
                                        (this.wnext = 0),
                                        (this.window = null),
                                        (this.hold = 0),
                                        (this.bits = 0),
                                        (this.length = 0),
                                        (this.offset = 0),
                                        (this.extra = 0),
                                        (this.lencode = null),
                                        (this.distcode = null),
                                        (this.lenbits = 0),
                                        (this.distbits = 0),
                                        (this.ncode = 0),
                                        (this.nlen = 0),
                                        (this.ndist = 0),
                                        (this.have = 0),
                                        (this.next = null),
                                        (this.lens = new r.Buf16(320)),
                                        (this.work = new r.Buf16(288)),
                                        (this.lendyn = null),
                                        (this.distdyn = null),
                                        (this.sane = 0),
                                        (this.back = 0),
                                        (this.was = 0);
                                }
                                function c(t) {
                                    var e;
                                    return t && t.state
                                        ? ((e = t.state),
                                          (t.total_in = t.total_out = e.total = 0),
                                          (t.msg = ""),
                                          e.wrap && (t.adler = 1 & e.wrap),
                                          (e.mode = 1),
                                          (e.last = 0),
                                          (e.havedict = 0),
                                          (e.dmax = 32768),
                                          (e.head = null),
                                          (e.hold = 0),
                                          (e.bits = 0),
                                          (e.lencode = e.lendyn = new r.Buf32(852)),
                                          (e.distcode = e.distdyn = new r.Buf32(592)),
                                          (e.sane = 1),
                                          (e.back = -1),
                                          0)
                                        : h;
                                }
                                function f(t) {
                                    var e;
                                    return t && t.state ? (((e = t.state).wsize = 0), (e.whave = 0), (e.wnext = 0), c(t)) : h;
                                }
                                function d(t, e) {
                                    var i, r;
                                    return t && t.state ? ((r = t.state), e < 0 ? ((i = 0), (e = -e)) : ((i = 1 + (e >> 4)), e < 48 && (e &= 15)), e && (e < 8 || 15 < e) ? h : (null !== r.window && r.wbits !== e && (r.window = null), (r.wrap = i), (r.wbits = e), f(t))) : h;
                                }
                                function p(t, e) {
                                    var i, r;
                                    return t ? ((r = new l()), ((t.state = r).window = null), 0 !== (i = d(t, e)) && (t.state = null), i) : h;
                                }
                                var m,
                                    g,
                                    _ = !0;
                                function y(t) {
                                    if (_) {
                                        var e;
                                        for (m = new r.Buf32(512), g = new r.Buf32(32), e = 0; e < 144; ) t.lens[e++] = 8;
                                        for (; e < 256; ) t.lens[e++] = 9;
                                        for (; e < 280; ) t.lens[e++] = 7;
                                        for (; e < 288; ) t.lens[e++] = 8;
                                        for (o(1, t.lens, 0, 288, m, 0, t.work, { bits: 9 }), e = 0; e < 32; ) t.lens[e++] = 5;
                                        o(2, t.lens, 0, 32, g, 0, t.work, { bits: 5 }), (_ = !1);
                                    }
                                    (t.lencode = m), (t.lenbits = 9), (t.distcode = g), (t.distbits = 5);
                                }
                                function v(t, e, i, s) {
                                    var n,
                                        a = t.state;
                                    return (
                                        null === a.window && ((a.wsize = 1 << a.wbits), (a.wnext = 0), (a.whave = 0), (a.window = new r.Buf8(a.wsize))),
                                        s >= a.wsize
                                            ? (r.arraySet(a.window, e, i - a.wsize, a.wsize, 0), (a.wnext = 0), (a.whave = a.wsize))
                                            : (s < (n = a.wsize - a.wnext) && (n = s),
                                              r.arraySet(a.window, e, i - s, n, a.wnext),
                                              (s -= n) ? (r.arraySet(a.window, e, i - s, s, 0), (a.wnext = s), (a.whave = a.wsize)) : ((a.wnext += n), a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += n))),
                                        0
                                    );
                                }
                                (i.inflateReset = f),
                                    (i.inflateReset2 = d),
                                    (i.inflateResetKeep = c),
                                    (i.inflateInit = function (t) {
                                        return p(t, 15);
                                    }),
                                    (i.inflateInit2 = p),
                                    (i.inflate = function (t, e) {
                                        var i,
                                            l,
                                            c,
                                            f,
                                            d,
                                            p,
                                            m,
                                            g,
                                            _,
                                            b,
                                            w,
                                            M,
                                            x,
                                            k,
                                            S,
                                            E,
                                            C,
                                            A,
                                            I,
                                            O,
                                            T,
                                            z,
                                            P,
                                            N,
                                            L = 0,
                                            R = new r.Buf8(4),
                                            B = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                                        if (!t || !t.state || !t.output || (!t.input && 0 !== t.avail_in)) return h;
                                        12 === (i = t.state).mode && (i.mode = 13), (d = t.next_out), (c = t.output), (m = t.avail_out), (f = t.next_in), (l = t.input), (p = t.avail_in), (g = i.hold), (_ = i.bits), (b = p), (w = m), (z = 0);
                                        t: for (;;)
                                            switch (i.mode) {
                                                case 1:
                                                    if (0 === i.wrap) {
                                                        i.mode = 13;
                                                        break;
                                                    }
                                                    for (; _ < 16; ) {
                                                        if (0 === p) break t;
                                                        p--, (g += l[f++] << _), (_ += 8);
                                                    }
                                                    if (2 & i.wrap && 35615 === g) {
                                                        (R[(i.check = 0)] = 255 & g), (R[1] = (g >>> 8) & 255), (i.check = n(i.check, R, 2, 0)), (_ = g = 0), (i.mode = 2);
                                                        break;
                                                    }
                                                    if (((i.flags = 0), i.head && (i.head.done = !1), !(1 & i.wrap) || (((255 & g) << 8) + (g >> 8)) % 31)) {
                                                        (t.msg = "incorrect header check"), (i.mode = 30);
                                                        break;
                                                    }
                                                    if (8 != (15 & g)) {
                                                        (t.msg = "unknown compression method"), (i.mode = 30);
                                                        break;
                                                    }
                                                    if (((_ -= 4), (T = 8 + (15 & (g >>>= 4))), 0 === i.wbits)) i.wbits = T;
                                                    else if (T > i.wbits) {
                                                        (t.msg = "invalid window size"), (i.mode = 30);
                                                        break;
                                                    }
                                                    (i.dmax = 1 << T), (t.adler = i.check = 1), (i.mode = 512 & g ? 10 : 12), (_ = g = 0);
                                                    break;
                                                case 2:
                                                    for (; _ < 16; ) {
                                                        if (0 === p) break t;
                                                        p--, (g += l[f++] << _), (_ += 8);
                                                    }
                                                    if (((i.flags = g), 8 != (255 & i.flags))) {
                                                        (t.msg = "unknown compression method"), (i.mode = 30);
                                                        break;
                                                    }
                                                    if (57344 & i.flags) {
                                                        (t.msg = "unknown header flags set"), (i.mode = 30);
                                                        break;
                                                    }
                                                    i.head && (i.head.text = (g >> 8) & 1), 512 & i.flags && ((R[0] = 255 & g), (R[1] = (g >>> 8) & 255), (i.check = n(i.check, R, 2, 0))), (_ = g = 0), (i.mode = 3);
                                                case 3:
                                                    for (; _ < 32; ) {
                                                        if (0 === p) break t;
                                                        p--, (g += l[f++] << _), (_ += 8);
                                                    }
                                                    i.head && (i.head.time = g), 512 & i.flags && ((R[0] = 255 & g), (R[1] = (g >>> 8) & 255), (R[2] = (g >>> 16) & 255), (R[3] = (g >>> 24) & 255), (i.check = n(i.check, R, 4, 0))), (_ = g = 0), (i.mode = 4);
                                                case 4:
                                                    for (; _ < 16; ) {
                                                        if (0 === p) break t;
                                                        p--, (g += l[f++] << _), (_ += 8);
                                                    }
                                                    i.head && ((i.head.xflags = 255 & g), (i.head.os = g >> 8)), 512 & i.flags && ((R[0] = 255 & g), (R[1] = (g >>> 8) & 255), (i.check = n(i.check, R, 2, 0))), (_ = g = 0), (i.mode = 5);
                                                case 5:
                                                    if (1024 & i.flags) {
                                                        for (; _ < 16; ) {
                                                            if (0 === p) break t;
                                                            p--, (g += l[f++] << _), (_ += 8);
                                                        }
                                                        (i.length = g), i.head && (i.head.extra_len = g), 512 & i.flags && ((R[0] = 255 & g), (R[1] = (g >>> 8) & 255), (i.check = n(i.check, R, 2, 0))), (_ = g = 0);
                                                    } else i.head && (i.head.extra = null);
                                                    i.mode = 6;
                                                case 6:
                                                    if (
                                                        1024 & i.flags &&
                                                        (p < (M = i.length) && (M = p),
                                                        M && (i.head && ((T = i.head.extra_len - i.length), i.head.extra || (i.head.extra = new Array(i.head.extra_len)), r.arraySet(i.head.extra, l, f, M, T)), 512 & i.flags && (i.check = n(i.check, l, M, f)), (p -= M), (f += M), (i.length -= M)),
                                                        i.length)
                                                    )
                                                        break t;
                                                    (i.length = 0), (i.mode = 7);
                                                case 7:
                                                    if (2048 & i.flags) {
                                                        if (0 === p) break t;
                                                        for (M = 0; (T = l[f + M++]), i.head && T && i.length < 65536 && (i.head.name += String.fromCharCode(T)), T && M < p; );
                                                        if ((512 & i.flags && (i.check = n(i.check, l, M, f)), (p -= M), (f += M), T)) break t;
                                                    } else i.head && (i.head.name = null);
                                                    (i.length = 0), (i.mode = 8);
                                                case 8:
                                                    if (4096 & i.flags) {
                                                        if (0 === p) break t;
                                                        for (M = 0; (T = l[f + M++]), i.head && T && i.length < 65536 && (i.head.comment += String.fromCharCode(T)), T && M < p; );
                                                        if ((512 & i.flags && (i.check = n(i.check, l, M, f)), (p -= M), (f += M), T)) break t;
                                                    } else i.head && (i.head.comment = null);
                                                    i.mode = 9;
                                                case 9:
                                                    if (512 & i.flags) {
                                                        for (; _ < 16; ) {
                                                            if (0 === p) break t;
                                                            p--, (g += l[f++] << _), (_ += 8);
                                                        }
                                                        if (g !== (65535 & i.check)) {
                                                            (t.msg = "header crc mismatch"), (i.mode = 30);
                                                            break;
                                                        }
                                                        _ = g = 0;
                                                    }
                                                    i.head && ((i.head.hcrc = (i.flags >> 9) & 1), (i.head.done = !0)), (t.adler = i.check = 0), (i.mode = 12);
                                                    break;
                                                case 10:
                                                    for (; _ < 32; ) {
                                                        if (0 === p) break t;
                                                        p--, (g += l[f++] << _), (_ += 8);
                                                    }
                                                    (t.adler = i.check = u(g)), (_ = g = 0), (i.mode = 11);
                                                case 11:
                                                    if (0 === i.havedict) return (t.next_out = d), (t.avail_out = m), (t.next_in = f), (t.avail_in = p), (i.hold = g), (i.bits = _), 2;
                                                    (t.adler = i.check = 1), (i.mode = 12);
                                                case 12:
                                                    if (5 === e || 6 === e) break t;
                                                case 13:
                                                    if (i.last) {
                                                        (g >>>= 7 & _), (_ -= 7 & _), (i.mode = 27);
                                                        break;
                                                    }
                                                    for (; _ < 3; ) {
                                                        if (0 === p) break t;
                                                        p--, (g += l[f++] << _), (_ += 8);
                                                    }
                                                    switch (((i.last = 1 & g), (_ -= 1), 3 & (g >>>= 1))) {
                                                        case 0:
                                                            i.mode = 14;
                                                            break;
                                                        case 1:
                                                            if ((y(i), (i.mode = 20), 6 !== e)) break;
                                                            (g >>>= 2), (_ -= 2);
                                                            break t;
                                                        case 2:
                                                            i.mode = 17;
                                                            break;
                                                        case 3:
                                                            (t.msg = "invalid block type"), (i.mode = 30);
                                                    }
                                                    (g >>>= 2), (_ -= 2);
                                                    break;
                                                case 14:
                                                    for (g >>>= 7 & _, _ -= 7 & _; _ < 32; ) {
                                                        if (0 === p) break t;
                                                        p--, (g += l[f++] << _), (_ += 8);
                                                    }
                                                    if ((65535 & g) != ((g >>> 16) ^ 65535)) {
                                                        (t.msg = "invalid stored block lengths"), (i.mode = 30);
                                                        break;
                                                    }
                                                    if (((i.length = 65535 & g), (_ = g = 0), (i.mode = 15), 6 === e)) break t;
                                                case 15:
                                                    i.mode = 16;
                                                case 16:
                                                    if ((M = i.length)) {
                                                        if ((p < M && (M = p), m < M && (M = m), 0 === M)) break t;
                                                        r.arraySet(c, l, f, M, d), (p -= M), (f += M), (m -= M), (d += M), (i.length -= M);
                                                        break;
                                                    }
                                                    i.mode = 12;
                                                    break;
                                                case 17:
                                                    for (; _ < 14; ) {
                                                        if (0 === p) break t;
                                                        p--, (g += l[f++] << _), (_ += 8);
                                                    }
                                                    if (((i.nlen = 257 + (31 & g)), (g >>>= 5), (_ -= 5), (i.ndist = 1 + (31 & g)), (g >>>= 5), (_ -= 5), (i.ncode = 4 + (15 & g)), (g >>>= 4), (_ -= 4), 286 < i.nlen || 30 < i.ndist)) {
                                                        (t.msg = "too many length or distance symbols"), (i.mode = 30);
                                                        break;
                                                    }
                                                    (i.have = 0), (i.mode = 18);
                                                case 18:
                                                    for (; i.have < i.ncode; ) {
                                                        for (; _ < 3; ) {
                                                            if (0 === p) break t;
                                                            p--, (g += l[f++] << _), (_ += 8);
                                                        }
                                                        (i.lens[B[i.have++]] = 7 & g), (g >>>= 3), (_ -= 3);
                                                    }
                                                    for (; i.have < 19; ) i.lens[B[i.have++]] = 0;
                                                    if (((i.lencode = i.lendyn), (i.lenbits = 7), (P = { bits: i.lenbits }), (z = o(0, i.lens, 0, 19, i.lencode, 0, i.work, P)), (i.lenbits = P.bits), z)) {
                                                        (t.msg = "invalid code lengths set"), (i.mode = 30);
                                                        break;
                                                    }
                                                    (i.have = 0), (i.mode = 19);
                                                case 19:
                                                    for (; i.have < i.nlen + i.ndist; ) {
                                                        for (; (E = ((L = i.lencode[g & ((1 << i.lenbits) - 1)]) >>> 16) & 255), (C = 65535 & L), !((S = L >>> 24) <= _); ) {
                                                            if (0 === p) break t;
                                                            p--, (g += l[f++] << _), (_ += 8);
                                                        }
                                                        if (C < 16) (g >>>= S), (_ -= S), (i.lens[i.have++] = C);
                                                        else {
                                                            if (16 === C) {
                                                                for (N = S + 2; _ < N; ) {
                                                                    if (0 === p) break t;
                                                                    p--, (g += l[f++] << _), (_ += 8);
                                                                }
                                                                if (((g >>>= S), (_ -= S), 0 === i.have)) {
                                                                    (t.msg = "invalid bit length repeat"), (i.mode = 30);
                                                                    break;
                                                                }
                                                                (T = i.lens[i.have - 1]), (M = 3 + (3 & g)), (g >>>= 2), (_ -= 2);
                                                            } else if (17 === C) {
                                                                for (N = S + 3; _ < N; ) {
                                                                    if (0 === p) break t;
                                                                    p--, (g += l[f++] << _), (_ += 8);
                                                                }
                                                                (_ -= S), (T = 0), (M = 3 + (7 & (g >>>= S))), (g >>>= 3), (_ -= 3);
                                                            } else {
                                                                for (N = S + 7; _ < N; ) {
                                                                    if (0 === p) break t;
                                                                    p--, (g += l[f++] << _), (_ += 8);
                                                                }
                                                                (_ -= S), (T = 0), (M = 11 + (127 & (g >>>= S))), (g >>>= 7), (_ -= 7);
                                                            }
                                                            if (i.have + M > i.nlen + i.ndist) {
                                                                (t.msg = "invalid bit length repeat"), (i.mode = 30);
                                                                break;
                                                            }
                                                            for (; M--; ) i.lens[i.have++] = T;
                                                        }
                                                    }
                                                    if (30 === i.mode) break;
                                                    if (0 === i.lens[256]) {
                                                        (t.msg = "invalid code -- missing end-of-block"), (i.mode = 30);
                                                        break;
                                                    }
                                                    if (((i.lenbits = 9), (P = { bits: i.lenbits }), (z = o(1, i.lens, 0, i.nlen, i.lencode, 0, i.work, P)), (i.lenbits = P.bits), z)) {
                                                        (t.msg = "invalid literal/lengths set"), (i.mode = 30);
                                                        break;
                                                    }
                                                    if (((i.distbits = 6), (i.distcode = i.distdyn), (P = { bits: i.distbits }), (z = o(2, i.lens, i.nlen, i.ndist, i.distcode, 0, i.work, P)), (i.distbits = P.bits), z)) {
                                                        (t.msg = "invalid distances set"), (i.mode = 30);
                                                        break;
                                                    }
                                                    if (((i.mode = 20), 6 === e)) break t;
                                                case 20:
                                                    i.mode = 21;
                                                case 21:
                                                    if (6 <= p && 258 <= m) {
                                                        (t.next_out = d),
                                                            (t.avail_out = m),
                                                            (t.next_in = f),
                                                            (t.avail_in = p),
                                                            (i.hold = g),
                                                            (i.bits = _),
                                                            a(t, w),
                                                            (d = t.next_out),
                                                            (c = t.output),
                                                            (m = t.avail_out),
                                                            (f = t.next_in),
                                                            (l = t.input),
                                                            (p = t.avail_in),
                                                            (g = i.hold),
                                                            (_ = i.bits),
                                                            12 === i.mode && (i.back = -1);
                                                        break;
                                                    }
                                                    for (i.back = 0; (E = ((L = i.lencode[g & ((1 << i.lenbits) - 1)]) >>> 16) & 255), (C = 65535 & L), !((S = L >>> 24) <= _); ) {
                                                        if (0 === p) break t;
                                                        p--, (g += l[f++] << _), (_ += 8);
                                                    }
                                                    if (E && 0 == (240 & E)) {
                                                        for (A = S, I = E, O = C; (E = ((L = i.lencode[O + ((g & ((1 << (A + I)) - 1)) >> A)]) >>> 16) & 255), (C = 65535 & L), !(A + (S = L >>> 24) <= _); ) {
                                                            if (0 === p) break t;
                                                            p--, (g += l[f++] << _), (_ += 8);
                                                        }
                                                        (g >>>= A), (_ -= A), (i.back += A);
                                                    }
                                                    if (((g >>>= S), (_ -= S), (i.back += S), (i.length = C), 0 === E)) {
                                                        i.mode = 26;
                                                        break;
                                                    }
                                                    if (32 & E) {
                                                        (i.back = -1), (i.mode = 12);
                                                        break;
                                                    }
                                                    if (64 & E) {
                                                        (t.msg = "invalid literal/length code"), (i.mode = 30);
                                                        break;
                                                    }
                                                    (i.extra = 15 & E), (i.mode = 22);
                                                case 22:
                                                    if (i.extra) {
                                                        for (N = i.extra; _ < N; ) {
                                                            if (0 === p) break t;
                                                            p--, (g += l[f++] << _), (_ += 8);
                                                        }
                                                        (i.length += g & ((1 << i.extra) - 1)), (g >>>= i.extra), (_ -= i.extra), (i.back += i.extra);
                                                    }
                                                    (i.was = i.length), (i.mode = 23);
                                                case 23:
                                                    for (; (E = ((L = i.distcode[g & ((1 << i.distbits) - 1)]) >>> 16) & 255), (C = 65535 & L), !((S = L >>> 24) <= _); ) {
                                                        if (0 === p) break t;
                                                        p--, (g += l[f++] << _), (_ += 8);
                                                    }
                                                    if (0 == (240 & E)) {
                                                        for (A = S, I = E, O = C; (E = ((L = i.distcode[O + ((g & ((1 << (A + I)) - 1)) >> A)]) >>> 16) & 255), (C = 65535 & L), !(A + (S = L >>> 24) <= _); ) {
                                                            if (0 === p) break t;
                                                            p--, (g += l[f++] << _), (_ += 8);
                                                        }
                                                        (g >>>= A), (_ -= A), (i.back += A);
                                                    }
                                                    if (((g >>>= S), (_ -= S), (i.back += S), 64 & E)) {
                                                        (t.msg = "invalid distance code"), (i.mode = 30);
                                                        break;
                                                    }
                                                    (i.offset = C), (i.extra = 15 & E), (i.mode = 24);
                                                case 24:
                                                    if (i.extra) {
                                                        for (N = i.extra; _ < N; ) {
                                                            if (0 === p) break t;
                                                            p--, (g += l[f++] << _), (_ += 8);
                                                        }
                                                        (i.offset += g & ((1 << i.extra) - 1)), (g >>>= i.extra), (_ -= i.extra), (i.back += i.extra);
                                                    }
                                                    if (i.offset > i.dmax) {
                                                        (t.msg = "invalid distance too far back"), (i.mode = 30);
                                                        break;
                                                    }
                                                    i.mode = 25;
                                                case 25:
                                                    if (0 === m) break t;
                                                    if (((M = w - m), i.offset > M)) {
                                                        if ((M = i.offset - M) > i.whave && i.sane) {
                                                            (t.msg = "invalid distance too far back"), (i.mode = 30);
                                                            break;
                                                        }
                                                        (x = M > i.wnext ? ((M -= i.wnext), i.wsize - M) : i.wnext - M), M > i.length && (M = i.length), (k = i.window);
                                                    } else (k = c), (x = d - i.offset), (M = i.length);
                                                    for (m < M && (M = m), m -= M, i.length -= M; (c[d++] = k[x++]), --M; );
                                                    0 === i.length && (i.mode = 21);
                                                    break;
                                                case 26:
                                                    if (0 === m) break t;
                                                    (c[d++] = i.length), m--, (i.mode = 21);
                                                    break;
                                                case 27:
                                                    if (i.wrap) {
                                                        for (; _ < 32; ) {
                                                            if (0 === p) break t;
                                                            p--, (g |= l[f++] << _), (_ += 8);
                                                        }
                                                        if (((w -= m), (t.total_out += w), (i.total += w), w && (t.adler = i.check = i.flags ? n(i.check, c, w, d - w) : s(i.check, c, w, d - w)), (w = m), (i.flags ? g : u(g)) !== i.check)) {
                                                            (t.msg = "incorrect data check"), (i.mode = 30);
                                                            break;
                                                        }
                                                        _ = g = 0;
                                                    }
                                                    i.mode = 28;
                                                case 28:
                                                    if (i.wrap && i.flags) {
                                                        for (; _ < 32; ) {
                                                            if (0 === p) break t;
                                                            p--, (g += l[f++] << _), (_ += 8);
                                                        }
                                                        if (g !== (4294967295 & i.total)) {
                                                            (t.msg = "incorrect length check"), (i.mode = 30);
                                                            break;
                                                        }
                                                        _ = g = 0;
                                                    }
                                                    i.mode = 29;
                                                case 29:
                                                    z = 1;
                                                    break t;
                                                case 30:
                                                    z = -3;
                                                    break t;
                                                case 31:
                                                    return -4;
                                                case 32:
                                                default:
                                                    return h;
                                            }
                                        return (
                                            (t.next_out = d),
                                            (t.avail_out = m),
                                            (t.next_in = f),
                                            (t.avail_in = p),
                                            (i.hold = g),
                                            (i.bits = _),
                                            (i.wsize || (w !== t.avail_out && i.mode < 30 && (i.mode < 27 || 4 !== e))) && v(t, t.output, t.next_out, w - t.avail_out)
                                                ? ((i.mode = 31), -4)
                                                : ((b -= t.avail_in),
                                                  (w -= t.avail_out),
                                                  (t.total_in += b),
                                                  (t.total_out += w),
                                                  (i.total += w),
                                                  i.wrap && w && (t.adler = i.check = i.flags ? n(i.check, c, w, t.next_out - w) : s(i.check, c, w, t.next_out - w)),
                                                  (t.data_type = i.bits + (i.last ? 64 : 0) + (12 === i.mode ? 128 : 0) + (20 === i.mode || 15 === i.mode ? 256 : 0)),
                                                  ((0 == b && 0 === w) || 4 === e) && 0 === z && (z = -5),
                                                  z)
                                        );
                                    }),
                                    (i.inflateEnd = function (t) {
                                        if (!t || !t.state) return h;
                                        var e = t.state;
                                        return e.window && (e.window = null), (t.state = null), 0;
                                    }),
                                    (i.inflateGetHeader = function (t, e) {
                                        var i;
                                        return t && t.state ? (0 == (2 & (i = t.state).wrap) ? h : (((i.head = e).done = !1), 0)) : h;
                                    }),
                                    (i.inflateSetDictionary = function (t, e) {
                                        var i,
                                            r = e.length;
                                        return t && t.state ? (0 !== (i = t.state).wrap && 11 !== i.mode ? h : 11 === i.mode && s(1, e, r, 0) !== i.check ? -3 : v(t, e, r, r) ? ((i.mode = 31), -4) : ((i.havedict = 1), 0)) : h;
                                    }),
                                    (i.inflateInfo = "pako inflate (from Nodeca project)");
                            },
                            { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 },
                        ],
                        50: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("../utils/common"),
                                    s = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
                                    n = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
                                    a = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
                                    o = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
                                e.exports = function (t, e, i, h, u, l, c, f) {
                                    var d,
                                        p,
                                        m,
                                        g,
                                        _,
                                        y,
                                        v,
                                        b,
                                        w,
                                        M = f.bits,
                                        x = 0,
                                        k = 0,
                                        S = 0,
                                        E = 0,
                                        C = 0,
                                        A = 0,
                                        I = 0,
                                        O = 0,
                                        T = 0,
                                        z = 0,
                                        P = null,
                                        N = 0,
                                        L = new r.Buf16(16),
                                        R = new r.Buf16(16),
                                        B = null,
                                        D = 0;
                                    for (x = 0; x <= 15; x++) L[x] = 0;
                                    for (k = 0; k < h; k++) L[e[i + k]]++;
                                    for (C = M, E = 15; 1 <= E && 0 === L[E]; E--);
                                    if ((E < C && (C = E), 0 === E)) return (u[l++] = 20971520), (u[l++] = 20971520), (f.bits = 1), 0;
                                    for (S = 1; S < E && 0 === L[S]; S++);
                                    for (C < S && (C = S), x = O = 1; x <= 15; x++) if (((O <<= 1), (O -= L[x]) < 0)) return -1;
                                    if (0 < O && (0 === t || 1 !== E)) return -1;
                                    for (R[1] = 0, x = 1; x < 15; x++) R[x + 1] = R[x] + L[x];
                                    for (k = 0; k < h; k++) 0 !== e[i + k] && (c[R[e[i + k]]++] = k);
                                    if (((y = 0 === t ? ((P = B = c), 19) : 1 === t ? ((P = s), (N -= 257), (B = n), (D -= 257), 256) : ((P = a), (B = o), -1)), (x = S), (_ = l), (I = k = z = 0), (m = -1), (g = (T = 1 << (A = C)) - 1), (1 === t && 852 < T) || (2 === t && 592 < T))) return 1;
                                    for (;;) {
                                        for (v = x - I, w = c[k] < y ? ((b = 0), c[k]) : c[k] > y ? ((b = B[D + c[k]]), P[N + c[k]]) : ((b = 96), 0), d = 1 << (x - I), S = p = 1 << A; (u[_ + (z >> I) + (p -= d)] = (v << 24) | (b << 16) | w | 0), 0 !== p; );
                                        for (d = 1 << (x - 1); z & d; ) d >>= 1;
                                        if ((0 !== d ? ((z &= d - 1), (z += d)) : (z = 0), k++, 0 == --L[x])) {
                                            if (x === E) break;
                                            x = e[i + c[k]];
                                        }
                                        if (C < x && (z & g) !== m) {
                                            for (0 === I && (I = C), _ += S, O = 1 << (A = x - I); A + I < E && !((O -= L[A + I]) <= 0); ) A++, (O <<= 1);
                                            if (((T += 1 << A), (1 === t && 852 < T) || (2 === t && 592 < T))) return 1;
                                            u[(m = z & g)] = (C << 24) | (A << 16) | (_ - l) | 0;
                                        }
                                    }
                                    return 0 !== z && (u[_ + z] = ((x - I) << 24) | (64 << 16) | 0), (f.bits = C), 0;
                                };
                            },
                            { "../utils/common": 41 },
                        ],
                        51: [
                            function (t, e, i) {
                                "use strict";
                                e.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
                            },
                            {},
                        ],
                        52: [
                            function (t, e, i) {
                                "use strict";
                                var r = t("../utils/common");
                                function s(t) {
                                    for (var e = t.length; 0 <= --e; ) t[e] = 0;
                                }
                                var n = 256,
                                    a = 286,
                                    o = 30,
                                    h = 15,
                                    u = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0],
                                    l = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
                                    c = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7],
                                    f = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
                                    d = new Array(576);
                                s(d);
                                var p = new Array(60);
                                s(p);
                                var m = new Array(512);
                                s(m);
                                var g = new Array(256);
                                s(g);
                                var _ = new Array(29);
                                s(_);
                                var y,
                                    v,
                                    b,
                                    w = new Array(o);
                                function M(t, e, i, r, s) {
                                    (this.static_tree = t), (this.extra_bits = e), (this.extra_base = i), (this.elems = r), (this.max_length = s), (this.has_stree = t && t.length);
                                }
                                function x(t, e) {
                                    (this.dyn_tree = t), (this.max_code = 0), (this.stat_desc = e);
                                }
                                function k(t) {
                                    return t < 256 ? m[t] : m[256 + (t >>> 7)];
                                }
                                function S(t, e) {
                                    (t.pending_buf[t.pending++] = 255 & e), (t.pending_buf[t.pending++] = (e >>> 8) & 255);
                                }
                                function E(t, e, i) {
                                    t.bi_valid > 16 - i ? ((t.bi_buf |= (e << t.bi_valid) & 65535), S(t, t.bi_buf), (t.bi_buf = e >> (16 - t.bi_valid)), (t.bi_valid += i - 16)) : ((t.bi_buf |= (e << t.bi_valid) & 65535), (t.bi_valid += i));
                                }
                                function C(t, e, i) {
                                    E(t, i[2 * e], i[2 * e + 1]);
                                }
                                function A(t, e) {
                                    for (var i = 0; (i |= 1 & t), (t >>>= 1), (i <<= 1), 0 < --e; );
                                    return i >>> 1;
                                }
                                function I(t, e, i) {
                                    var r,
                                        s,
                                        n = new Array(16),
                                        a = 0;
                                    for (r = 1; r <= h; r++) n[r] = a = (a + i[r - 1]) << 1;
                                    for (s = 0; s <= e; s++) {
                                        var o = t[2 * s + 1];
                                        0 !== o && (t[2 * s] = A(n[o]++, o));
                                    }
                                }
                                function O(t) {
                                    var e;
                                    for (e = 0; e < a; e++) t.dyn_ltree[2 * e] = 0;
                                    for (e = 0; e < o; e++) t.dyn_dtree[2 * e] = 0;
                                    for (e = 0; e < 19; e++) t.bl_tree[2 * e] = 0;
                                    (t.dyn_ltree[512] = 1), (t.opt_len = t.static_len = 0), (t.last_lit = t.matches = 0);
                                }
                                function T(t) {
                                    8 < t.bi_valid ? S(t, t.bi_buf) : 0 < t.bi_valid && (t.pending_buf[t.pending++] = t.bi_buf), (t.bi_buf = 0), (t.bi_valid = 0);
                                }
                                function z(t, e, i, r) {
                                    var s = 2 * e,
                                        n = 2 * i;
                                    return t[s] < t[n] || (t[s] === t[n] && r[e] <= r[i]);
                                }
                                function P(t, e, i) {
                                    for (var r = t.heap[i], s = i << 1; s <= t.heap_len && (s < t.heap_len && z(e, t.heap[s + 1], t.heap[s], t.depth) && s++, !z(e, r, t.heap[s], t.depth)); ) (t.heap[i] = t.heap[s]), (i = s), (s <<= 1);
                                    t.heap[i] = r;
                                }
                                function N(t, e, i) {
                                    var r,
                                        s,
                                        a,
                                        o,
                                        h = 0;
                                    if (0 !== t.last_lit)
                                        for (
                                            ;
                                            (r = (t.pending_buf[t.d_buf + 2 * h] << 8) | t.pending_buf[t.d_buf + 2 * h + 1]),
                                                (s = t.pending_buf[t.l_buf + h]),
                                                h++,
                                                0 === r ? C(t, s, e) : (C(t, (a = g[s]) + n + 1, e), 0 !== (o = u[a]) && E(t, (s -= _[a]), o), C(t, (a = k(--r)), i), 0 !== (o = l[a]) && E(t, (r -= w[a]), o)),
                                                h < t.last_lit;

                                        );
                                    C(t, 256, e);
                                }
                                function L(t, e) {
                                    var i,
                                        r,
                                        s,
                                        n = e.dyn_tree,
                                        a = e.stat_desc.static_tree,
                                        o = e.stat_desc.has_stree,
                                        u = e.stat_desc.elems,
                                        l = -1;
                                    for (t.heap_len = 0, t.heap_max = 573, i = 0; i < u; i++) 0 !== n[2 * i] ? ((t.heap[++t.heap_len] = l = i), (t.depth[i] = 0)) : (n[2 * i + 1] = 0);
                                    for (; t.heap_len < 2; ) (n[2 * (s = t.heap[++t.heap_len] = l < 2 ? ++l : 0)] = 1), (t.depth[s] = 0), t.opt_len--, o && (t.static_len -= a[2 * s + 1]);
                                    for (e.max_code = l, i = t.heap_len >> 1; 1 <= i; i--) P(t, n, i);
                                    for (
                                        s = u;
                                        (i = t.heap[1]),
                                            (t.heap[1] = t.heap[t.heap_len--]),
                                            P(t, n, 1),
                                            (r = t.heap[1]),
                                            (t.heap[--t.heap_max] = i),
                                            (t.heap[--t.heap_max] = r),
                                            (n[2 * s] = n[2 * i] + n[2 * r]),
                                            (t.depth[s] = (t.depth[i] >= t.depth[r] ? t.depth[i] : t.depth[r]) + 1),
                                            (n[2 * i + 1] = n[2 * r + 1] = s),
                                            (t.heap[1] = s++),
                                            P(t, n, 1),
                                            2 <= t.heap_len;

                                    );
                                    (t.heap[--t.heap_max] = t.heap[1]),
                                        (function (t, e) {
                                            var i,
                                                r,
                                                s,
                                                n,
                                                a,
                                                o,
                                                u = e.dyn_tree,
                                                l = e.max_code,
                                                c = e.stat_desc.static_tree,
                                                f = e.stat_desc.has_stree,
                                                d = e.stat_desc.extra_bits,
                                                p = e.stat_desc.extra_base,
                                                m = e.stat_desc.max_length,
                                                g = 0;
                                            for (n = 0; n <= h; n++) t.bl_count[n] = 0;
                                            for (u[2 * t.heap[t.heap_max] + 1] = 0, i = t.heap_max + 1; i < 573; i++)
                                                m < (n = u[2 * u[2 * (r = t.heap[i]) + 1] + 1] + 1) && ((n = m), g++), (u[2 * r + 1] = n), l < r || (t.bl_count[n]++, (a = 0), p <= r && (a = d[r - p]), (o = u[2 * r]), (t.opt_len += o * (n + a)), f && (t.static_len += o * (c[2 * r + 1] + a)));
                                            if (0 !== g) {
                                                do {
                                                    for (n = m - 1; 0 === t.bl_count[n]; ) n--;
                                                    t.bl_count[n]--, (t.bl_count[n + 1] += 2), t.bl_count[m]--, (g -= 2);
                                                } while (0 < g);
                                                for (n = m; 0 !== n; n--) for (r = t.bl_count[n]; 0 !== r; ) l < (s = t.heap[--i]) || (u[2 * s + 1] !== n && ((t.opt_len += (n - u[2 * s + 1]) * u[2 * s]), (u[2 * s + 1] = n)), r--);
                                            }
                                        })(t, e),
                                        I(n, l, t.bl_count);
                                }
                                function R(t, e, i) {
                                    var r,
                                        s,
                                        n = -1,
                                        a = e[1],
                                        o = 0,
                                        h = 7,
                                        u = 4;
                                    for (0 === a && ((h = 138), (u = 3)), e[2 * (i + 1) + 1] = 65535, r = 0; r <= i; r++)
                                        (s = a),
                                            (a = e[2 * (r + 1) + 1]),
                                            (++o < h && s === a) || (o < u ? (t.bl_tree[2 * s] += o) : 0 !== s ? (s !== n && t.bl_tree[2 * s]++, t.bl_tree[32]++) : o <= 10 ? t.bl_tree[34]++ : t.bl_tree[36]++, (n = s), (u = (o = 0) === a ? ((h = 138), 3) : s === a ? ((h = 6), 3) : ((h = 7), 4)));
                                }
                                function B(t, e, i) {
                                    var r,
                                        s,
                                        n = -1,
                                        a = e[1],
                                        o = 0,
                                        h = 7,
                                        u = 4;
                                    for (0 === a && ((h = 138), (u = 3)), r = 0; r <= i; r++)
                                        if (((s = a), (a = e[2 * (r + 1) + 1]), !(++o < h && s === a))) {
                                            if (o < u) for (; C(t, s, t.bl_tree), 0 != --o; );
                                            else 0 !== s ? (s !== n && (C(t, s, t.bl_tree), o--), C(t, 16, t.bl_tree), E(t, o - 3, 2)) : o <= 10 ? (C(t, 17, t.bl_tree), E(t, o - 3, 3)) : (C(t, 18, t.bl_tree), E(t, o - 11, 7));
                                            (n = s), (u = (o = 0) === a ? ((h = 138), 3) : s === a ? ((h = 6), 3) : ((h = 7), 4));
                                        }
                                }
                                s(w);
                                var D = !1;
                                function j(t, e, i, s) {
                                    E(t, 0 + (s ? 1 : 0), 3),
                                        (function (t, e, i, s) {
                                            T(t), S(t, i), S(t, ~i), r.arraySet(t.pending_buf, t.window, e, i, t.pending), (t.pending += i);
                                        })(t, e, i);
                                }
                                (i._tr_init = function (t) {
                                    D ||
                                        ((function () {
                                            var t,
                                                e,
                                                i,
                                                r,
                                                s,
                                                n = new Array(16);
                                            for (r = i = 0; r < 28; r++) for (_[r] = i, t = 0; t < 1 << u[r]; t++) g[i++] = r;
                                            for (g[i - 1] = r, r = s = 0; r < 16; r++) for (w[r] = s, t = 0; t < 1 << l[r]; t++) m[s++] = r;
                                            for (s >>= 7; r < o; r++) for (w[r] = s << 7, t = 0; t < 1 << (l[r] - 7); t++) m[256 + s++] = r;
                                            for (e = 0; e <= h; e++) n[e] = 0;
                                            for (t = 0; t <= 143; ) (d[2 * t + 1] = 8), t++, n[8]++;
                                            for (; t <= 255; ) (d[2 * t + 1] = 9), t++, n[9]++;
                                            for (; t <= 279; ) (d[2 * t + 1] = 7), t++, n[7]++;
                                            for (; t <= 287; ) (d[2 * t + 1] = 8), t++, n[8]++;
                                            for (I(d, 287, n), t = 0; t < o; t++) (p[2 * t + 1] = 5), (p[2 * t] = A(t, 5));
                                            (y = new M(d, u, 257, a, h)), (v = new M(p, l, 0, o, h)), (b = new M(new Array(0), c, 0, 19, 7));
                                        })(),
                                        (D = !0)),
                                        (t.l_desc = new x(t.dyn_ltree, y)),
                                        (t.d_desc = new x(t.dyn_dtree, v)),
                                        (t.bl_desc = new x(t.bl_tree, b)),
                                        (t.bi_buf = 0),
                                        (t.bi_valid = 0),
                                        O(t);
                                }),
                                    (i._tr_stored_block = j),
                                    (i._tr_flush_block = function (t, e, i, r) {
                                        var s,
                                            a,
                                            o = 0;
                                        0 < t.level
                                            ? (2 === t.strm.data_type &&
                                                  (t.strm.data_type = (function (t) {
                                                      var e,
                                                          i = 4093624447;
                                                      for (e = 0; e <= 31; e++, i >>>= 1) if (1 & i && 0 !== t.dyn_ltree[2 * e]) return 0;
                                                      if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26]) return 1;
                                                      for (e = 32; e < n; e++) if (0 !== t.dyn_ltree[2 * e]) return 1;
                                                      return 0;
                                                  })(t)),
                                              L(t, t.l_desc),
                                              L(t, t.d_desc),
                                              (o = (function (t) {
                                                  var e;
                                                  for (R(t, t.dyn_ltree, t.l_desc.max_code), R(t, t.dyn_dtree, t.d_desc.max_code), L(t, t.bl_desc), e = 18; 3 <= e && 0 === t.bl_tree[2 * f[e] + 1]; e--);
                                                  return (t.opt_len += 3 * (e + 1) + 5 + 5 + 4), e;
                                              })(t)),
                                              (s = (t.opt_len + 3 + 7) >>> 3),
                                              (a = (t.static_len + 3 + 7) >>> 3) <= s && (s = a))
                                            : (s = a = i + 5),
                                            i + 4 <= s && -1 !== e
                                                ? j(t, e, i, r)
                                                : 4 === t.strategy || a === s
                                                ? (E(t, 2 + (r ? 1 : 0), 3), N(t, d, p))
                                                : (E(t, 4 + (r ? 1 : 0), 3),
                                                  (function (t, e, i, r) {
                                                      var s;
                                                      for (E(t, e - 257, 5), E(t, i - 1, 5), E(t, r - 4, 4), s = 0; s < r; s++) E(t, t.bl_tree[2 * f[s] + 1], 3);
                                                      B(t, t.dyn_ltree, e - 1), B(t, t.dyn_dtree, i - 1);
                                                  })(t, t.l_desc.max_code + 1, t.d_desc.max_code + 1, o + 1),
                                                  N(t, t.dyn_ltree, t.dyn_dtree)),
                                            O(t),
                                            r && T(t);
                                    }),
                                    (i._tr_tally = function (t, e, i) {
                                        return (
                                            (t.pending_buf[t.d_buf + 2 * t.last_lit] = (e >>> 8) & 255),
                                            (t.pending_buf[t.d_buf + 2 * t.last_lit + 1] = 255 & e),
                                            (t.pending_buf[t.l_buf + t.last_lit] = 255 & i),
                                            t.last_lit++,
                                            0 === e ? t.dyn_ltree[2 * i]++ : (t.matches++, e--, t.dyn_ltree[2 * (g[i] + n + 1)]++, t.dyn_dtree[2 * k(e)]++),
                                            t.last_lit === t.lit_bufsize - 1
                                        );
                                    }),
                                    (i._tr_align = function (t) {
                                        E(t, 2, 3),
                                            C(t, 256, d),
                                            (function (t) {
                                                16 === t.bi_valid ? (S(t, t.bi_buf), (t.bi_buf = 0), (t.bi_valid = 0)) : 8 <= t.bi_valid && ((t.pending_buf[t.pending++] = 255 & t.bi_buf), (t.bi_buf >>= 8), (t.bi_valid -= 8));
                                            })(t);
                                    });
                            },
                            { "../utils/common": 41 },
                        ],
                        53: [
                            function (t, e, i) {
                                "use strict";
                                e.exports = function () {
                                    (this.input = null), (this.next_in = 0), (this.avail_in = 0), (this.total_in = 0), (this.output = null), (this.next_out = 0), (this.avail_out = 0), (this.total_out = 0), (this.msg = ""), (this.state = null), (this.data_type = 2), (this.adler = 0);
                                };
                            },
                            {},
                        ],
                        54: [
                            function (t, e, i) {
                                (function (t) {
                                    !(function (t, e) {
                                        "use strict";
                                        if (!t.setImmediate) {
                                            var i,
                                                r,
                                                s,
                                                a,
                                                o = 1,
                                                h = {},
                                                u = !1,
                                                l = t.document,
                                                c = Object.getPrototypeOf && Object.getPrototypeOf(t);
                                            (c = c && c.setTimeout ? c : t),
                                                (i =
                                                    "[object process]" === {}.toString.call(t.process)
                                                        ? function (t) {
                                                              n.nextTick(function () {
                                                                  d(t);
                                                              });
                                                          }
                                                        : (function () {
                                                              if (t.postMessage && !t.importScripts) {
                                                                  var e = !0,
                                                                      i = t.onmessage;
                                                                  return (
                                                                      (t.onmessage = function () {
                                                                          e = !1;
                                                                      }),
                                                                      t.postMessage("", "*"),
                                                                      (t.onmessage = i),
                                                                      e
                                                                  );
                                                              }
                                                          })()
                                                        ? ((a = "setImmediate$" + Math.random() + "$"),
                                                          t.addEventListener ? t.addEventListener("message", p, !1) : t.attachEvent("onmessage", p),
                                                          function (e) {
                                                              t.postMessage(a + e, "*");
                                                          })
                                                        : t.MessageChannel
                                                        ? (((s = new MessageChannel()).port1.onmessage = function (t) {
                                                              d(t.data);
                                                          }),
                                                          function (t) {
                                                              s.port2.postMessage(t);
                                                          })
                                                        : l && "onreadystatechange" in l.createElement("script")
                                                        ? ((r = l.documentElement),
                                                          function (t) {
                                                              var e = l.createElement("script");
                                                              (e.onreadystatechange = function () {
                                                                  d(t), (e.onreadystatechange = null), r.removeChild(e), (e = null);
                                                              }),
                                                                  r.appendChild(e);
                                                          })
                                                        : function (t) {
                                                              setTimeout(d, 0, t);
                                                          }),
                                                (c.setImmediate = function (t) {
                                                    "function" != typeof t && (t = new Function("" + t));
                                                    for (var e = new Array(arguments.length - 1), r = 0; r < e.length; r++) e[r] = arguments[r + 1];
                                                    var s = { callback: t, args: e };
                                                    return (h[o] = s), i(o), o++;
                                                }),
                                                (c.clearImmediate = f);
                                        }
                                        function f(t) {
                                            delete h[t];
                                        }
                                        function d(t) {
                                            if (u) setTimeout(d, 0, t);
                                            else {
                                                var e = h[t];
                                                if (e) {
                                                    u = !0;
                                                    try {
                                                        !(function (t) {
                                                            var e = t.callback,
                                                                i = t.args;
                                                            switch (i.length) {
                                                                case 0:
                                                                    e();
                                                                    break;
                                                                case 1:
                                                                    e(i[0]);
                                                                    break;
                                                                case 2:
                                                                    e(i[0], i[1]);
                                                                    break;
                                                                case 3:
                                                                    e(i[0], i[1], i[2]);
                                                                    break;
                                                                default:
                                                                    e.apply(void 0, i);
                                                            }
                                                        })(e);
                                                    } finally {
                                                        f(t), (u = !1);
                                                    }
                                                }
                                            }
                                        }
                                        function p(e) {
                                            e.source === t && "string" == typeof e.data && 0 === e.data.indexOf(a) && d(+e.data.slice(a.length));
                                        }
                                    })("undefined" == typeof self ? (void 0 === t ? this : t) : self);
                                }).call(this, void 0 !== s ? s : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
                            },
                            {},
                        ],
                    },
                    {},
                    [10]
                )(10);
            }).call(this, i(2).Buffer, i(12).setImmediate, i(0), i(3));
        },
        function (t, e, i) {
            "use strict";
            (e.byteLength = function (t) {
                var e = u(t),
                    i = e[0],
                    r = e[1];
                return (3 * (i + r)) / 4 - r;
            }),
                (e.toByteArray = function (t) {
                    var e,
                        i,
                        r = u(t),
                        a = r[0],
                        o = r[1],
                        h = new n(
                            (function (t, e, i) {
                                return (3 * (e + i)) / 4 - i;
                            })(0, a, o)
                        ),
                        l = 0,
                        c = o > 0 ? a - 4 : a;
                    for (i = 0; i < c; i += 4) (e = (s[t.charCodeAt(i)] << 18) | (s[t.charCodeAt(i + 1)] << 12) | (s[t.charCodeAt(i + 2)] << 6) | s[t.charCodeAt(i + 3)]), (h[l++] = (e >> 16) & 255), (h[l++] = (e >> 8) & 255), (h[l++] = 255 & e);
                    2 === o && ((e = (s[t.charCodeAt(i)] << 2) | (s[t.charCodeAt(i + 1)] >> 4)), (h[l++] = 255 & e));
                    1 === o && ((e = (s[t.charCodeAt(i)] << 10) | (s[t.charCodeAt(i + 1)] << 4) | (s[t.charCodeAt(i + 2)] >> 2)), (h[l++] = (e >> 8) & 255), (h[l++] = 255 & e));
                    return h;
                }),
                (e.fromByteArray = function (t) {
                    for (var e, i = t.length, s = i % 3, n = [], a = 0, o = i - s; a < o; a += 16383) n.push(l(t, a, a + 16383 > o ? o : a + 16383));
                    1 === s ? ((e = t[i - 1]), n.push(r[e >> 2] + r[(e << 4) & 63] + "==")) : 2 === s && ((e = (t[i - 2] << 8) + t[i - 1]), n.push(r[e >> 10] + r[(e >> 4) & 63] + r[(e << 2) & 63] + "="));
                    return n.join("");
                });
            for (var r = [], s = [], n = "undefined" != typeof Uint8Array ? Uint8Array : Array, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", o = 0, h = a.length; o < h; ++o) (r[o] = a[o]), (s[a.charCodeAt(o)] = o);
            function u(t) {
                var e = t.length;
                if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
                var i = t.indexOf("=");
                return -1 === i && (i = e), [i, i === e ? 0 : 4 - (i % 4)];
            }
            function l(t, e, i) {
                for (var s, n, a = [], o = e; o < i; o += 3) (s = ((t[o] << 16) & 16711680) + ((t[o + 1] << 8) & 65280) + (255 & t[o + 2])), a.push(r[((n = s) >> 18) & 63] + r[(n >> 12) & 63] + r[(n >> 6) & 63] + r[63 & n]);
                return a.join("");
            }
            (s["-".charCodeAt(0)] = 62), (s["_".charCodeAt(0)] = 63);
        },
        function (t, e) {
            /*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
            (e.read = function (t, e, i, r, s) {
                var n,
                    a,
                    o = 8 * s - r - 1,
                    h = (1 << o) - 1,
                    u = h >> 1,
                    l = -7,
                    c = i ? s - 1 : 0,
                    f = i ? -1 : 1,
                    d = t[e + c];
                for (c += f, n = d & ((1 << -l) - 1), d >>= -l, l += o; l > 0; n = 256 * n + t[e + c], c += f, l -= 8);
                for (a = n & ((1 << -l) - 1), n >>= -l, l += r; l > 0; a = 256 * a + t[e + c], c += f, l -= 8);
                if (0 === n) n = 1 - u;
                else {
                    if (n === h) return a ? NaN : (1 / 0) * (d ? -1 : 1);
                    (a += Math.pow(2, r)), (n -= u);
                }
                return (d ? -1 : 1) * a * Math.pow(2, n - r);
            }),
                (e.write = function (t, e, i, r, s, n) {
                    var a,
                        o,
                        h,
                        u = 8 * n - s - 1,
                        l = (1 << u) - 1,
                        c = l >> 1,
                        f = 23 === s ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
                        d = r ? 0 : n - 1,
                        p = r ? 1 : -1,
                        m = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
                    for (
                        e = Math.abs(e),
                            isNaN(e) || e === 1 / 0
                                ? ((o = isNaN(e) ? 1 : 0), (a = l))
                                : ((a = Math.floor(Math.log(e) / Math.LN2)),
                                  e * (h = Math.pow(2, -a)) < 1 && (a--, (h *= 2)),
                                  (e += a + c >= 1 ? f / h : f * Math.pow(2, 1 - c)) * h >= 2 && (a++, (h /= 2)),
                                  a + c >= l ? ((o = 0), (a = l)) : a + c >= 1 ? ((o = (e * h - 1) * Math.pow(2, s)), (a += c)) : ((o = e * Math.pow(2, c - 1) * Math.pow(2, s)), (a = 0)));
                        s >= 8;
                        t[i + d] = 255 & o, d += p, o /= 256, s -= 8
                    );
                    for (a = (a << s) | o, u += s; u > 0; t[i + d] = 255 & a, d += p, a /= 256, u -= 8);
                    t[i + d - p] |= 128 * m;
                });
        },
        function (t, e) {
            var i = {}.toString;
            t.exports =
                Array.isArray ||
                function (t) {
                    return "[object Array]" == i.call(t);
                };
        },
        function (t, e, i) {
            (function (t) {
                var r = (void 0 !== t && t) || ("undefined" != typeof self && self) || window,
                    s = Function.prototype.apply;
                function n(t, e) {
                    (this._id = t), (this._clearFn = e);
                }
                (e.setTimeout = function () {
                    return new n(s.call(setTimeout, r, arguments), clearTimeout);
                }),
                    (e.setInterval = function () {
                        return new n(s.call(setInterval, r, arguments), clearInterval);
                    }),
                    (e.clearTimeout = e.clearInterval =
                        function (t) {
                            t && t.close();
                        }),
                    (n.prototype.unref = n.prototype.ref = function () {}),
                    (n.prototype.close = function () {
                        this._clearFn.call(r, this._id);
                    }),
                    (e.enroll = function (t, e) {
                        clearTimeout(t._idleTimeoutId), (t._idleTimeout = e);
                    }),
                    (e.unenroll = function (t) {
                        clearTimeout(t._idleTimeoutId), (t._idleTimeout = -1);
                    }),
                    (e._unrefActive = e.active =
                        function (t) {
                            clearTimeout(t._idleTimeoutId);
                            var e = t._idleTimeout;
                            e >= 0 &&
                                (t._idleTimeoutId = setTimeout(function () {
                                    t._onTimeout && t._onTimeout();
                                }, e));
                        }),
                    i(13),
                    (e.setImmediate = ("undefined" != typeof self && self.setImmediate) || (void 0 !== t && t.setImmediate) || (this && this.setImmediate)),
                    (e.clearImmediate = ("undefined" != typeof self && self.clearImmediate) || (void 0 !== t && t.clearImmediate) || (this && this.clearImmediate));
            }).call(this, i(0));
        },
        function (t, e, i) {
            (function (t, e) {
                !(function (t, i) {
                    "use strict";
                    if (!t.setImmediate) {
                        var r,
                            s,
                            n,
                            a,
                            o,
                            h = 1,
                            u = {},
                            l = !1,
                            c = t.document,
                            f = Object.getPrototypeOf && Object.getPrototypeOf(t);
                        (f = f && f.setTimeout ? f : t),
                            "[object process]" === {}.toString.call(t.process)
                                ? (r = function (t) {
                                      e.nextTick(function () {
                                          p(t);
                                      });
                                  })
                                : !(function () {
                                      if (t.postMessage && !t.importScripts) {
                                          var e = !0,
                                              i = t.onmessage;
                                          return (
                                              (t.onmessage = function () {
                                                  e = !1;
                                              }),
                                              t.postMessage("", "*"),
                                              (t.onmessage = i),
                                              e
                                          );
                                      }
                                  })()
                                ? t.MessageChannel
                                    ? (((n = new MessageChannel()).port1.onmessage = function (t) {
                                          p(t.data);
                                      }),
                                      (r = function (t) {
                                          n.port2.postMessage(t);
                                      }))
                                    : c && "onreadystatechange" in c.createElement("script")
                                    ? ((s = c.documentElement),
                                      (r = function (t) {
                                          var e = c.createElement("script");
                                          (e.onreadystatechange = function () {
                                              p(t), (e.onreadystatechange = null), s.removeChild(e), (e = null);
                                          }),
                                              s.appendChild(e);
                                      }))
                                    : (r = function (t) {
                                          setTimeout(p, 0, t);
                                      })
                                : ((a = "setImmediate$" + Math.random() + "$"),
                                  (o = function (e) {
                                      e.source === t && "string" == typeof e.data && 0 === e.data.indexOf(a) && p(+e.data.slice(a.length));
                                  }),
                                  t.addEventListener ? t.addEventListener("message", o, !1) : t.attachEvent("onmessage", o),
                                  (r = function (e) {
                                      t.postMessage(a + e, "*");
                                  })),
                            (f.setImmediate = function (t) {
                                "function" != typeof t && (t = new Function("" + t));
                                for (var e = new Array(arguments.length - 1), i = 0; i < e.length; i++) e[i] = arguments[i + 1];
                                var s = { callback: t, args: e };
                                return (u[h] = s), r(h), h++;
                            }),
                            (f.clearImmediate = d);
                    }
                    function d(t) {
                        delete u[t];
                    }
                    function p(t) {
                        if (l) setTimeout(p, 0, t);
                        else {
                            var e = u[t];
                            if (e) {
                                l = !0;
                                try {
                                    !(function (t) {
                                        var e = t.callback,
                                            i = t.args;
                                        switch (i.length) {
                                            case 0:
                                                e();
                                                break;
                                            case 1:
                                                e(i[0]);
                                                break;
                                            case 2:
                                                e(i[0], i[1]);
                                                break;
                                            case 3:
                                                e(i[0], i[1], i[2]);
                                                break;
                                            default:
                                                e.apply(void 0, i);
                                        }
                                    })(e);
                                } finally {
                                    d(t), (l = !1);
                                }
                            }
                        }
                    }
                })("undefined" == typeof self ? (void 0 === t ? this : t) : self);
            }).call(this, i(0), i(3));
        },
        function (t, e) {
            function i(t) {
                var e = new Error("Cannot find module '" + t + "'");
                throw ((e.code = "MODULE_NOT_FOUND"), e);
            }
            (i.keys = function () {
                return [];
            }),
                (i.resolve = i),
                (t.exports = i),
                (i.id = 14);
        },
        function (t, e, i) {
            "use strict";
            (function (e) {
                const r = i(16),
                    s = i(5),
                    n = i(2).Buffer;
                t.exports = async function (t, i) {
                    if (!e.fetch) return r(t, i);
                    const a = s(t, i),
                        o = "prj" === i || "cpg" === i;
                    try {
                        const t = await fetch(a);
                        if (t.status > 399) throw new Error(t.statusText);
                        if (o) return t.text();
                        const e = await t.arrayBuffer();
                        return n.from(e);
                    } catch (t) {
                        if ((console.log("ERROR", t, i), o || "dbf" === i)) return !1;
                        throw t;
                    }
                };
            }).call(this, i(0));
        },
        function (t, e, i) {
            "use strict";
            const r = i(4),
                s = i(5),
                n = i(2).Buffer;
            t.exports = function (t, e) {
                return new r(function (i, r) {
                    const a = s(t, e),
                        o = new XMLHttpRequest();
                    o.open("GET", a, !0),
                        "prj" !== e && "cpg" !== e && (o.responseType = "arraybuffer"),
                        o.addEventListener(
                            "load",
                            function () {
                                return o.status > 399 ? ("prj" === e || "cpg" === e ? i(!1) : r(new Error(o.status))) : i("prj" !== e && "cpg" !== e ? n.from(o.response) : o.response);
                            },
                            !1
                        ),
                        o.send();
                });
            };
        },
        function (t, e, i) {
            "use strict";
            (function (e) {
                var i,
                    r,
                    s = e.MutationObserver || e.WebKitMutationObserver;
                if (s) {
                    var n = 0,
                        a = new s(l),
                        o = e.document.createTextNode("");
                    a.observe(o, { characterData: !0 }),
                        (i = function () {
                            o.data = n = ++n % 2;
                        });
                } else if (e.setImmediate || void 0 === e.MessageChannel)
                    i =
                        "document" in e && "onreadystatechange" in e.document.createElement("script")
                            ? function () {
                                  var t = e.document.createElement("script");
                                  (t.onreadystatechange = function () {
                                      l(), (t.onreadystatechange = null), t.parentNode.removeChild(t), (t = null);
                                  }),
                                      e.document.documentElement.appendChild(t);
                              }
                            : function () {
                                  setTimeout(l, 0);
                              };
                else {
                    var h = new e.MessageChannel();
                    (h.port1.onmessage = l),
                        (i = function () {
                            h.port2.postMessage(0);
                        });
                }
                var u = [];
                function l() {
                    var t, e;
                    r = !0;
                    for (var i = u.length; i; ) {
                        for (e = u, u = [], t = -1; ++t < i; ) e[t]();
                        i = u.length;
                    }
                    r = !1;
                }
                t.exports = function (t) {
                    1 !== u.push(t) || r || i();
                };
            }).call(this, i(0));
        },
        function (t, e, i) {
            "use strict";
            function r(t, e) {
                return (
                    !(function (t) {
                        let e = 0,
                            i = 1;
                        const r = t.length;
                        let s, n;
                        for (; i < r; ) (s = n || t[0]), (n = t[i]), (e += (n[0] - s[0]) * (n[1] + s[1])), i++;
                        return e > 0;
                    })(e) && t.length
                        ? t[t.length - 1].push(e)
                        : t.push([e]),
                    t
                );
            }
            (n.prototype.parsePoint = function (t) {
                return { type: "Point", coordinates: this.parseCoord(t, 0) };
            }),
                (n.prototype.parseZPoint = function (t) {
                    const e = this.parsePoint(t);
                    return e.coordinates.push(t.readDoubleLE(16)), e;
                }),
                (n.prototype.parsePointArray = function (t, e, i) {
                    const r = [];
                    let s = 0;
                    for (; s < i; ) r.push(this.parseCoord(t, e)), (e += 16), s++;
                    return r;
                }),
                (n.prototype.parseZPointArray = function (t, e, i, r) {
                    let s = 0;
                    for (; s < i; ) r[s].push(t.readDoubleLE(e)), s++, (e += 8);
                    return r;
                }),
                (n.prototype.parseArrayGroup = function (t, e, i, r, s) {
                    const n = [];
                    let a,
                        o,
                        h = 0,
                        u = 0;
                    for (; h < r; ) h++, (i += 4), (a = u), (u = h === r ? s : t.readInt32LE(i)), (o = u - a), o && (n.push(this.parsePointArray(t, e, o)), (e += o << 4));
                    return n;
                }),
                (n.prototype.parseZArrayGroup = function (t, e, i, r) {
                    let s = 0;
                    for (; s < i; ) (r[s] = this.parseZPointArray(t, e, r[s].length, r[s])), (e += r[s].length << 3), s++;
                    return r;
                }),
                (n.prototype.parseMultiPoint = function (t) {
                    const e = {},
                        i = t.readInt32LE(32, !0);
                    if (!i) return null;
                    const r = this.parseCoord(t, 0),
                        s = this.parseCoord(t, 16);
                    e.bbox = [r[0], r[1], s[0], s[1]];
                    return 1 === i ? ((e.type = "Point"), (e.coordinates = this.parseCoord(t, 36))) : ((e.type = "MultiPoint"), (e.coordinates = this.parsePointArray(t, 36, i))), e;
                }),
                (n.prototype.parseZMultiPoint = function (t) {
                    const e = this.parseMultiPoint(t);
                    if (!e) return null;
                    let i;
                    if ("Point" === e.type) return e.coordinates.push(t.readDoubleLE(72)), e;
                    i = e.coordinates.length;
                    const r = 52 + (i << 4);
                    return (e.coordinates = this.parseZPointArray(t, r, i, e.coordinates)), e;
                }),
                (n.prototype.parsePolyline = function (t) {
                    const e = {},
                        i = t.readInt32LE(32);
                    if (!i) return null;
                    const r = this.parseCoord(t, 0),
                        s = this.parseCoord(t, 16);
                    e.bbox = [r[0], r[1], s[0], s[1]];
                    const n = t.readInt32LE(36);
                    let a, o;
                    return 1 === i ? ((e.type = "LineString"), (a = 44), (e.coordinates = this.parsePointArray(t, a, n))) : ((e.type = "MultiLineString"), (a = 40 + (i << 2)), (o = 40), (e.coordinates = this.parseArrayGroup(t, a, 40, i, n))), e;
                }),
                (n.prototype.parseZPolyline = function (t) {
                    const e = this.parsePolyline(t);
                    if (!e) return null;
                    const i = e.coordinates.length;
                    let r;
                    if ("LineString" === e.type) return (r = 60 + (i << 4)), (e.coordinates = this.parseZPointArray(t, r, i, e.coordinates)), e;
                    return (
                        (r =
                            56 +
                            (e.coordinates.reduce(function (t, e) {
                                return t + e.length;
                            }, 0) <<
                                4) +
                            (i << 2)),
                        (e.coordinates = this.parseZArrayGroup(t, r, i, e.coordinates)),
                        e
                    );
                }),
                (n.prototype.polyFuncs = function (t) {
                    return t ? ("LineString" === t.type ? ((t.type = "Polygon"), (t.coordinates = [t.coordinates]), t) : ((t.coordinates = t.coordinates.reduce(r, [])), 1 === t.coordinates.length ? ((t.type = "Polygon"), (t.coordinates = t.coordinates[0]), t) : ((t.type = "MultiPolygon"), t))) : t;
                }),
                (n.prototype.parsePolygon = function (t) {
                    return this.polyFuncs(this.parsePolyline(t));
                }),
                (n.prototype.parseZPolygon = function (t) {
                    return this.polyFuncs(this.parseZPolyline(t));
                });
            const s = { 1: "parsePoint", 3: "parsePolyline", 5: "parsePolygon", 8: "parseMultiPoint", 11: "parseZPoint", 13: "parseZPolyline", 15: "parseZPolygon", 18: "parseZMultiPoint" };
            function n(t, e) {
                if (!(this instanceof n)) return new n(t, e);
                (this.buffer = t), (this.headers = this.parseHeader()), this.headers.length < this.buffer.byteLength && (this.buffer = this.buffer.slice(0, this.headers.length)), this.shpFuncs(e), (this.rows = this.getRows());
            }
            (n.prototype.shpFuncs = function (t) {
                let e = this.headers.shpCode;
                if ((e > 20 && (e -= 20), !(e in s))) throw new Error("I don't know that shp type");
                var i;
                (this.parseFunc = this[s[e]]),
                    (this.parseCoord = (i = t)
                        ? function (t, e) {
                              const r = [t.readDoubleLE(e), t.readDoubleLE(e + 8)];
                              return i.inverse(r);
                          }
                        : function (t, e) {
                              return [t.readDoubleLE(e), t.readDoubleLE(e + 8)];
                          });
            }),
                (n.prototype.getShpCode = function () {
                    return this.parseHeader().shpCode;
                }),
                (n.prototype.parseHeader = function () {
                    const t = this.buffer.slice(0, 100);
                    return { length: t.readInt32BE(24) << 1, version: t.readInt32LE(28), shpCode: t.readInt32LE(32), bbox: [t.readDoubleLE(36), t.readDoubleLE(44), t.readDoubleLE(52), t.readDoubleLE(52)] };
                }),
                (n.prototype.getRows = function () {
                    let t = 100;
                    const e = this.buffer.byteLength,
                        i = [];
                    let r;
                    for (; t < e && ((r = this.getRow(t)), r); ) (t += 8), (t += r.len), r.type ? i.push(this.parseFunc(r.data)) : i.push(null);
                    return i;
                }),
                (n.prototype.getRow = function (t) {
                    const e = this.buffer.slice(t, t + 12),
                        i = e.readInt32BE(4) << 1,
                        r = e.readInt32BE(0);
                    return 0 === i ? { id: r, len: i, type: 0 } : { id: r, len: i, data: this.buffer.slice(t + 12, t + i + 8), type: e.readInt32LE(8) };
                }),
                (t.exports = function (t, e) {
                    return new n(t, e).rows;
                });
        },
        function (t, e, i) {
            var r = i(20);
            function s(t, e, i, r, s) {
                var n = s(t.slice(e, e + i));
                switch (r) {
                    case "N":
                    case "F":
                    case "O":
                        return parseFloat(n, 10);
                    case "D":
                        return new Date(n.slice(0, 4), parseInt(n.slice(4, 6), 10) - 1, n.slice(6, 8));
                    case "L":
                        return "y" === n.toLowerCase() || "t" === n.toLowerCase();
                    default:
                        return n;
                }
            }
            function n(t, e, i, r) {
                for (var n, a, o = {}, h = 0, u = i.length; h < u; ) (n = s(t, e, (a = i[h]).len, a.dataType, r)), (e += a.len), void 0 !== n && (o[a.name] = n), h++;
                return o;
            }
            t.exports = function (t, e) {
                for (
                    var i = r(e),
                        s = (function (t) {
                            var e = {};
                            return (e.lastUpdated = new Date(t.readUInt8(1) + 1900, t.readUInt8(2), t.readUInt8(3))), (e.records = t.readUInt32LE(4)), (e.headerLen = t.readUInt16LE(8)), (e.recLen = t.readUInt16LE(10)), e;
                        })(t),
                        a = (function (t, e, i) {
                            for (var r = [], s = 32; s < e && (r.push({ name: i(t.slice(s, s + 11)), dataType: String.fromCharCode(t.readUInt8(s + 11)), len: t.readUInt8(s + 16), decimal: t.readUInt8(s + 17) }), 13 !== t.readUInt8(s + 32)); ) s += 32;
                            return r;
                        })(t, s.headerLen - 1, i),
                        o = 2 + ((a.length + 1) << 5),
                        h = s.recLen,
                        u = s.records,
                        l = [];
                    u;

                )
                    l.push(n(t, o, a, i)), (o += h), u--;
                return l;
            };
        },
        function (t, e, i) {
            i(21);
            var r = i(24).StringDecoder;
            function s(t) {
                var e = new r();
                return (e.write(t) + e.end()).replace(/\0/g, "").trim();
            }
            t.exports = function t(e, i) {
                if (!e) return s;
                try {
                    new TextDecoder(e.trim());
                } catch (a) {
                    var r = n.exec(e);
                    return r && !i ? t("windows-" + r[1], !0) : s;
                }
                return function (t) {
                    var i = new TextDecoder(e);
                    return (i.decode(t, { stream: !0 }) + i.decode()).replace(/\0/g, "").trim();
                };
            };
            var n = /^(?:ANSI\s)?(\d+)$/m;
        },
        function (t, e, i) {
            t.exports = i(22);
        },
        function (t, e, i) {
            !(function (e) {
                "use strict";
                function r(t, e, i) {
                    return e <= t && t <= i;
                }
                t.exports && !e["encoding-indexes"] && i(23);
                var s = Math.floor;
                function n(t) {
                    if (void 0 === t) return {};
                    if (t === Object(t)) return t;
                    throw TypeError("Could not convert argument to dictionary");
                }
                function a(t) {
                    return 0 <= t && t <= 127;
                }
                var o = a;
                function h(t) {
                    (this.tokens = [].slice.call(t)), this.tokens.reverse();
                }
                h.prototype = {
                    endOfStream: function () {
                        return !this.tokens.length;
                    },
                    read: function () {
                        return this.tokens.length ? this.tokens.pop() : -1;
                    },
                    prepend: function (t) {
                        if (Array.isArray(t)) for (var e = t; e.length; ) this.tokens.push(e.pop());
                        else this.tokens.push(t);
                    },
                    push: function (t) {
                        if (Array.isArray(t)) for (var e = t; e.length; ) this.tokens.unshift(e.shift());
                        else this.tokens.unshift(t);
                    },
                };
                function u(t, e) {
                    if (t) throw TypeError("Decoder error");
                    return e || 65533;
                }
                function l(t) {
                    throw TypeError("The code point " + t + " could not be encoded.");
                }
                function c(t) {
                    return (t = String(t).trim().toLowerCase()), Object.prototype.hasOwnProperty.call(d, t) ? d[t] : null;
                }
                var f = [
                        { encodings: [{ labels: ["unicode-1-1-utf-8", "utf-8", "utf8"], name: "UTF-8" }], heading: "The Encoding" },
                        {
                            encodings: [
                                { labels: ["866", "cp866", "csibm866", "ibm866"], name: "IBM866" },
                                { labels: ["csisolatin2", "iso-8859-2", "iso-ir-101", "iso8859-2", "iso88592", "iso_8859-2", "iso_8859-2:1987", "l2", "latin2"], name: "ISO-8859-2" },
                                { labels: ["csisolatin3", "iso-8859-3", "iso-ir-109", "iso8859-3", "iso88593", "iso_8859-3", "iso_8859-3:1988", "l3", "latin3"], name: "ISO-8859-3" },
                                { labels: ["csisolatin4", "iso-8859-4", "iso-ir-110", "iso8859-4", "iso88594", "iso_8859-4", "iso_8859-4:1988", "l4", "latin4"], name: "ISO-8859-4" },
                                { labels: ["csisolatincyrillic", "cyrillic", "iso-8859-5", "iso-ir-144", "iso8859-5", "iso88595", "iso_8859-5", "iso_8859-5:1988"], name: "ISO-8859-5" },
                                { labels: ["arabic", "asmo-708", "csiso88596e", "csiso88596i", "csisolatinarabic", "ecma-114", "iso-8859-6", "iso-8859-6-e", "iso-8859-6-i", "iso-ir-127", "iso8859-6", "iso88596", "iso_8859-6", "iso_8859-6:1987"], name: "ISO-8859-6" },
                                { labels: ["csisolatingreek", "ecma-118", "elot_928", "greek", "greek8", "iso-8859-7", "iso-ir-126", "iso8859-7", "iso88597", "iso_8859-7", "iso_8859-7:1987", "sun_eu_greek"], name: "ISO-8859-7" },
                                { labels: ["csiso88598e", "csisolatinhebrew", "hebrew", "iso-8859-8", "iso-8859-8-e", "iso-ir-138", "iso8859-8", "iso88598", "iso_8859-8", "iso_8859-8:1988", "visual"], name: "ISO-8859-8" },
                                { labels: ["csiso88598i", "iso-8859-8-i", "logical"], name: "ISO-8859-8-I" },
                                { labels: ["csisolatin6", "iso-8859-10", "iso-ir-157", "iso8859-10", "iso885910", "l6", "latin6"], name: "ISO-8859-10" },
                                { labels: ["iso-8859-13", "iso8859-13", "iso885913"], name: "ISO-8859-13" },
                                { labels: ["iso-8859-14", "iso8859-14", "iso885914"], name: "ISO-8859-14" },
                                { labels: ["csisolatin9", "iso-8859-15", "iso8859-15", "iso885915", "iso_8859-15", "l9"], name: "ISO-8859-15" },
                                { labels: ["iso-8859-16"], name: "ISO-8859-16" },
                                { labels: ["cskoi8r", "koi", "koi8", "koi8-r", "koi8_r"], name: "KOI8-R" },
                                { labels: ["koi8-ru", "koi8-u"], name: "KOI8-U" },
                                { labels: ["csmacintosh", "mac", "macintosh", "x-mac-roman"], name: "macintosh" },
                                { labels: ["dos-874", "iso-8859-11", "iso8859-11", "iso885911", "tis-620", "windows-874"], name: "windows-874" },
                                { labels: ["cp1250", "windows-1250", "x-cp1250"], name: "windows-1250" },
                                { labels: ["cp1251", "windows-1251", "x-cp1251"], name: "windows-1251" },
                                { labels: ["ansi_x3.4-1968", "ascii", "cp1252", "cp819", "csisolatin1", "ibm819", "iso-8859-1", "iso-ir-100", "iso8859-1", "iso88591", "iso_8859-1", "iso_8859-1:1987", "l1", "latin1", "us-ascii", "windows-1252", "x-cp1252"], name: "windows-1252" },
                                { labels: ["cp1253", "windows-1253", "x-cp1253"], name: "windows-1253" },
                                { labels: ["cp1254", "csisolatin5", "iso-8859-9", "iso-ir-148", "iso8859-9", "iso88599", "iso_8859-9", "iso_8859-9:1989", "l5", "latin5", "windows-1254", "x-cp1254"], name: "windows-1254" },
                                { labels: ["cp1255", "windows-1255", "x-cp1255"], name: "windows-1255" },
                                { labels: ["cp1256", "windows-1256", "x-cp1256"], name: "windows-1256" },
                                { labels: ["cp1257", "windows-1257", "x-cp1257"], name: "windows-1257" },
                                { labels: ["cp1258", "windows-1258", "x-cp1258"], name: "windows-1258" },
                                { labels: ["x-mac-cyrillic", "x-mac-ukrainian"], name: "x-mac-cyrillic" },
                            ],
                            heading: "Legacy single-byte encodings",
                        },
                        {
                            encodings: [
                                { labels: ["chinese", "csgb2312", "csiso58gb231280", "gb2312", "gb_2312", "gb_2312-80", "gbk", "iso-ir-58", "x-gbk"], name: "GBK" },
                                { labels: ["gb18030"], name: "gb18030" },
                            ],
                            heading: "Legacy multi-byte Chinese (simplified) encodings",
                        },
                        { encodings: [{ labels: ["big5", "big5-hkscs", "cn-big5", "csbig5", "x-x-big5"], name: "Big5" }], heading: "Legacy multi-byte Chinese (traditional) encodings" },
                        {
                            encodings: [
                                { labels: ["cseucpkdfmtjapanese", "euc-jp", "x-euc-jp"], name: "EUC-JP" },
                                { labels: ["csiso2022jp", "iso-2022-jp"], name: "ISO-2022-JP" },
                                { labels: ["csshiftjis", "ms932", "ms_kanji", "shift-jis", "shift_jis", "sjis", "windows-31j", "x-sjis"], name: "Shift_JIS" },
                            ],
                            heading: "Legacy multi-byte Japanese encodings",
                        },
                        { encodings: [{ labels: ["cseuckr", "csksc56011987", "euc-kr", "iso-ir-149", "korean", "ks_c_5601-1987", "ks_c_5601-1989", "ksc5601", "ksc_5601", "windows-949"], name: "EUC-KR" }], heading: "Legacy multi-byte Korean encodings" },
                        {
                            encodings: [
                                { labels: ["csiso2022kr", "hz-gb-2312", "iso-2022-cn", "iso-2022-cn-ext", "iso-2022-kr"], name: "replacement" },
                                { labels: ["utf-16be"], name: "UTF-16BE" },
                                { labels: ["utf-16", "utf-16le"], name: "UTF-16LE" },
                                { labels: ["x-user-defined"], name: "x-user-defined" },
                            ],
                            heading: "Legacy miscellaneous encodings",
                        },
                    ],
                    d = {};
                f.forEach(function (t) {
                    t.encodings.forEach(function (t) {
                        t.labels.forEach(function (e) {
                            d[e] = t;
                        });
                    });
                });
                var p,
                    m,
                    g = {},
                    _ = {};
                function y(t, e) {
                    return (e && e[t]) || null;
                }
                function v(t, e) {
                    var i = e.indexOf(t);
                    return -1 === i ? null : i;
                }
                function b(t) {
                    if (!("encoding-indexes" in e)) throw Error("Indexes missing. Did you forget to include encoding-indexes.js first?");
                    return e["encoding-indexes"][t];
                }
                function w(t, e) {
                    if (!(this instanceof w)) throw TypeError("Called as a function. Did you forget 'new'?");
                    (t = void 0 !== t ? String(t) : "utf-8"), (e = n(e)), (this._encoding = null), (this._decoder = null), (this._ignoreBOM = !1), (this._BOMseen = !1), (this._error_mode = "replacement"), (this._do_not_flush = !1);
                    var i = c(t);
                    if (null === i || "replacement" === i.name) throw RangeError("Unknown encoding: " + t);
                    if (!_[i.name]) throw Error("Decoder not present. Did you forget to include encoding-indexes.js first?");
                    return (
                        (this._encoding = i),
                        Boolean(e.fatal) && (this._error_mode = "fatal"),
                        Boolean(e.ignoreBOM) && (this._ignoreBOM = !0),
                        Object.defineProperty || ((this.encoding = this._encoding.name.toLowerCase()), (this.fatal = "fatal" === this._error_mode), (this.ignoreBOM = this._ignoreBOM)),
                        this
                    );
                }
                function M(t, i) {
                    if (!(this instanceof M)) throw TypeError("Called as a function. Did you forget 'new'?");
                    (i = n(i)), (this._encoding = null), (this._encoder = null), (this._do_not_flush = !1), (this._fatal = Boolean(i.fatal) ? "fatal" : "replacement");
                    if (Boolean(i.NONSTANDARD_allowLegacyEncoding)) {
                        var r = c((t = void 0 !== t ? String(t) : "utf-8"));
                        if (null === r || "replacement" === r.name) throw RangeError("Unknown encoding: " + t);
                        if (!g[r.name]) throw Error("Encoder not present. Did you forget to include encoding-indexes.js first?");
                        this._encoding = r;
                    } else (this._encoding = c("utf-8")), void 0 !== t && "console" in e && console.warn("TextEncoder constructor called with encoding label, which is ignored.");
                    return Object.defineProperty || (this.encoding = this._encoding.name.toLowerCase()), this;
                }
                function x(t) {
                    var e = t.fatal,
                        i = 0,
                        s = 0,
                        n = 0,
                        a = 128,
                        o = 191;
                    this.handler = function (t, h) {
                        if (-1 === h && 0 !== n) return (n = 0), u(e);
                        if (-1 === h) return -1;
                        if (0 === n) {
                            if (r(h, 0, 127)) return h;
                            if (r(h, 194, 223)) (n = 1), (i = 31 & h);
                            else if (r(h, 224, 239)) 224 === h && (a = 160), 237 === h && (o = 159), (n = 2), (i = 15 & h);
                            else {
                                if (!r(h, 240, 244)) return u(e);
                                240 === h && (a = 144), 244 === h && (o = 143), (n = 3), (i = 7 & h);
                            }
                            return null;
                        }
                        if (!r(h, a, o)) return (i = n = s = 0), (a = 128), (o = 191), t.prepend(h), u(e);
                        if (((a = 128), (o = 191), (i = (i << 6) | (63 & h)), (s += 1) !== n)) return null;
                        var l = i;
                        return (i = n = s = 0), l;
                    };
                }
                function k(t) {
                    t.fatal;
                    this.handler = function (t, e) {
                        if (-1 === e) return -1;
                        if (o(e)) return e;
                        var i, s;
                        r(e, 128, 2047) ? ((i = 1), (s = 192)) : r(e, 2048, 65535) ? ((i = 2), (s = 224)) : r(e, 65536, 1114111) && ((i = 3), (s = 240));
                        for (var n = [(e >> (6 * i)) + s]; i > 0; ) {
                            var a = e >> (6 * (i - 1));
                            n.push(128 | (63 & a)), (i -= 1);
                        }
                        return n;
                    };
                }
                function S(t, e) {
                    var i = e.fatal;
                    this.handler = function (e, r) {
                        if (-1 === r) return -1;
                        if (a(r)) return r;
                        var s = t[r - 128];
                        return null === s ? u(i) : s;
                    };
                }
                function E(t, e) {
                    e.fatal;
                    this.handler = function (e, i) {
                        if (-1 === i) return -1;
                        if (o(i)) return i;
                        var r = v(i, t);
                        return null === r && l(i), r + 128;
                    };
                }
                function C(t) {
                    var e = t.fatal,
                        i = 0,
                        s = 0,
                        n = 0;
                    this.handler = function (t, o) {
                        if (-1 === o && 0 === i && 0 === s && 0 === n) return -1;
                        var h;
                        if ((-1 !== o || (0 === i && 0 === s && 0 === n) || ((i = 0), (s = 0), (n = 0), u(e)), 0 !== n)) {
                            (h = null),
                                r(o, 48, 57) &&
                                    (h = (function (t) {
                                        if ((t > 39419 && t < 189e3) || t > 1237575) return null;
                                        if (7457 === t) return 59335;
                                        var e,
                                            i = 0,
                                            r = 0,
                                            s = b("gb18030-ranges");
                                        for (e = 0; e < s.length; ++e) {
                                            var n = s[e];
                                            if (!(n[0] <= t)) break;
                                            (i = n[0]), (r = n[1]);
                                        }
                                        return r + t - i;
                                    })(10 * (126 * (10 * (i - 129) + s - 48) + n - 129) + o - 48));
                            var l = [s, n, o];
                            return (i = 0), (s = 0), (n = 0), null === h ? (t.prepend(l), u(e)) : h;
                        }
                        if (0 !== s) return r(o, 129, 254) ? ((n = o), null) : (t.prepend([s, o]), (i = 0), (s = 0), u(e));
                        if (0 !== i) {
                            if (r(o, 48, 57)) return (s = o), null;
                            var c = i,
                                f = null;
                            i = 0;
                            var d = o < 127 ? 64 : 65;
                            return (r(o, 64, 126) || r(o, 128, 254)) && (f = 190 * (c - 129) + (o - d)), null === (h = null === f ? null : y(f, b("gb18030"))) && a(o) && t.prepend(o), null === h ? u(e) : h;
                        }
                        return a(o) ? o : 128 === o ? 8364 : r(o, 129, 254) ? ((i = o), null) : u(e);
                    };
                }
                function A(t, e) {
                    t.fatal;
                    this.handler = function (t, i) {
                        if (-1 === i) return -1;
                        if (o(i)) return i;
                        if (58853 === i) return l(i);
                        if (e && 8364 === i) return 128;
                        var r = v(i, b("gb18030"));
                        if (null !== r) {
                            var n = r % 190;
                            return [s(r / 190) + 129, n + (n < 63 ? 64 : 65)];
                        }
                        if (e) return l(i);
                        r = (function (t) {
                            if (59335 === t) return 7457;
                            var e,
                                i = 0,
                                r = 0,
                                s = b("gb18030-ranges");
                            for (e = 0; e < s.length; ++e) {
                                var n = s[e];
                                if (!(n[1] <= t)) break;
                                (i = n[1]), (r = n[0]);
                            }
                            return r + t - i;
                        })(i);
                        var a = s(r / 10 / 126 / 10),
                            h = s((r -= 10 * a * 126 * 10) / 10 / 126),
                            u = s((r -= 10 * h * 126) / 10);
                        return [a + 129, h + 48, u + 129, r - 10 * u + 48];
                    };
                }
                function I(t) {
                    var e = t.fatal,
                        i = 0;
                    this.handler = function (t, s) {
                        if (-1 === s && 0 !== i) return (i = 0), u(e);
                        if (-1 === s && 0 === i) return -1;
                        if (0 !== i) {
                            var n = i,
                                o = null;
                            i = 0;
                            var h = s < 127 ? 64 : 98;
                            switch (((r(s, 64, 126) || r(s, 161, 254)) && (o = 157 * (n - 129) + (s - h)), o)) {
                                case 1133:
                                    return [202, 772];
                                case 1135:
                                    return [202, 780];
                                case 1164:
                                    return [234, 772];
                                case 1166:
                                    return [234, 780];
                            }
                            var l = null === o ? null : y(o, b("big5"));
                            return null === l && a(s) && t.prepend(s), null === l ? u(e) : l;
                        }
                        return a(s) ? s : r(s, 129, 254) ? ((i = s), null) : u(e);
                    };
                }
                function O(t) {
                    t.fatal;
                    this.handler = function (t, e) {
                        if (-1 === e) return -1;
                        if (o(e)) return e;
                        var i = (function (t) {
                            var e = (m =
                                m ||
                                b("big5").map(function (t, e) {
                                    return e < 5024 ? null : t;
                                }));
                            return 9552 === t || 9566 === t || 9569 === t || 9578 === t || 21313 === t || 21317 === t ? e.lastIndexOf(t) : v(t, e);
                        })(e);
                        if (null === i) return l(e);
                        var r = s(i / 157) + 129;
                        if (r < 161) return l(e);
                        var n = i % 157;
                        return [r, n + (n < 63 ? 64 : 98)];
                    };
                }
                function T(t) {
                    var e = t.fatal,
                        i = !1,
                        s = 0;
                    this.handler = function (t, n) {
                        if (-1 === n && 0 !== s) return (s = 0), u(e);
                        if (-1 === n && 0 === s) return -1;
                        if (142 === s && r(n, 161, 223)) return (s = 0), 65216 + n;
                        if (143 === s && r(n, 161, 254)) return (i = !0), (s = n), null;
                        if (0 !== s) {
                            var o = s;
                            s = 0;
                            var h = null;
                            return r(o, 161, 254) && r(n, 161, 254) && (h = y(94 * (o - 161) + (n - 161), b(i ? "jis0212" : "jis0208"))), (i = !1), r(n, 161, 254) || t.prepend(n), null === h ? u(e) : h;
                        }
                        return a(n) ? n : 142 === n || 143 === n || r(n, 161, 254) ? ((s = n), null) : u(e);
                    };
                }
                function z(t) {
                    t.fatal;
                    this.handler = function (t, e) {
                        if (-1 === e) return -1;
                        if (o(e)) return e;
                        if (165 === e) return 92;
                        if (8254 === e) return 126;
                        if (r(e, 65377, 65439)) return [142, e - 65377 + 161];
                        8722 === e && (e = 65293);
                        var i = v(e, b("jis0208"));
                        return null === i ? l(e) : [s(i / 94) + 161, (i % 94) + 161];
                    };
                }
                function P(t) {
                    var e = t.fatal,
                        i = 0,
                        s = 1,
                        n = 2,
                        a = 3,
                        o = 4,
                        h = 5,
                        l = 6,
                        c = i,
                        f = i,
                        d = 0,
                        p = !1;
                    this.handler = function (t, m) {
                        switch (c) {
                            default:
                            case i:
                                return 27 === m ? ((c = h), null) : r(m, 0, 127) && 14 !== m && 15 !== m && 27 !== m ? ((p = !1), m) : -1 === m ? -1 : ((p = !1), u(e));
                            case s:
                                return 27 === m ? ((c = h), null) : 92 === m ? ((p = !1), 165) : 126 === m ? ((p = !1), 8254) : r(m, 0, 127) && 14 !== m && 15 !== m && 27 !== m && 92 !== m && 126 !== m ? ((p = !1), m) : -1 === m ? -1 : ((p = !1), u(e));
                            case n:
                                return 27 === m ? ((c = h), null) : r(m, 33, 95) ? ((p = !1), 65344 + m) : -1 === m ? -1 : ((p = !1), u(e));
                            case a:
                                return 27 === m ? ((c = h), null) : r(m, 33, 126) ? ((p = !1), (d = m), (c = o), null) : -1 === m ? -1 : ((p = !1), u(e));
                            case o:
                                if (27 === m) return (c = h), u(e);
                                if (r(m, 33, 126)) {
                                    c = a;
                                    var g = y(94 * (d - 33) + m - 33, b("jis0208"));
                                    return null === g ? u(e) : g;
                                }
                                return -1 === m ? ((c = a), t.prepend(m), u(e)) : ((c = a), u(e));
                            case h:
                                return 36 === m || 40 === m ? ((d = m), (c = l), null) : (t.prepend(m), (p = !1), (c = f), u(e));
                            case l:
                                var _ = d;
                                d = 0;
                                var v = null;
                                if ((40 === _ && 66 === m && (v = i), 40 === _ && 74 === m && (v = s), 40 === _ && 73 === m && (v = n), 36 !== _ || (64 !== m && 66 !== m) || (v = a), null !== v)) {
                                    c = c = v;
                                    var w = p;
                                    return (p = !0), w ? u(e) : null;
                                }
                                return t.prepend([_, m]), (p = !1), (c = f), u(e);
                        }
                    };
                }
                function N(t) {
                    t.fatal;
                    var e = 0,
                        i = 1,
                        r = 2,
                        n = e;
                    this.handler = function (t, a) {
                        if (-1 === a && n !== e) return t.prepend(a), (n = e), [27, 40, 66];
                        if (-1 === a && n === e) return -1;
                        if (!((n !== e && n !== i) || (14 !== a && 15 !== a && 27 !== a))) return l(65533);
                        if (n === e && o(a)) return a;
                        if (n === i && ((o(a) && 92 !== a && 126 !== a) || 165 == a || 8254 == a)) {
                            if (o(a)) return a;
                            if (165 === a) return 92;
                            if (8254 === a) return 126;
                        }
                        if (o(a) && n !== e) return t.prepend(a), (n = e), [27, 40, 66];
                        if ((165 === a || 8254 === a) && n !== i) return t.prepend(a), (n = i), [27, 40, 74];
                        8722 === a && (a = 65293);
                        var h = v(a, b("jis0208"));
                        return null === h ? l(a) : n !== r ? (t.prepend(a), (n = r), [27, 36, 66]) : [s(h / 94) + 33, (h % 94) + 33];
                    };
                }
                function L(t) {
                    var e = t.fatal,
                        i = 0;
                    this.handler = function (t, s) {
                        if (-1 === s && 0 !== i) return (i = 0), u(e);
                        if (-1 === s && 0 === i) return -1;
                        if (0 !== i) {
                            var n = i,
                                o = null;
                            i = 0;
                            var h = s < 127 ? 64 : 65,
                                l = n < 160 ? 129 : 193;
                            if (((r(s, 64, 126) || r(s, 128, 252)) && (o = 188 * (n - l) + s - h), r(o, 8836, 10715))) return 48508 + o;
                            var c = null === o ? null : y(o, b("jis0208"));
                            return null === c && a(s) && t.prepend(s), null === c ? u(e) : c;
                        }
                        return a(s) || 128 === s ? s : r(s, 161, 223) ? 65216 + s : r(s, 129, 159) || r(s, 224, 252) ? ((i = s), null) : u(e);
                    };
                }
                function R(t) {
                    t.fatal;
                    this.handler = function (t, e) {
                        if (-1 === e) return -1;
                        if (o(e) || 128 === e) return e;
                        if (165 === e) return 92;
                        if (8254 === e) return 126;
                        if (r(e, 65377, 65439)) return e - 65377 + 161;
                        8722 === e && (e = 65293);
                        var i = (function (t) {
                            return (p =
                                p ||
                                b("jis0208").map(function (t, e) {
                                    return r(e, 8272, 8835) ? null : t;
                                })).indexOf(t);
                        })(e);
                        if (null === i) return l(e);
                        var n = s(i / 188),
                            a = i % 188;
                        return [n + (n < 31 ? 129 : 193), a + (a < 63 ? 64 : 65)];
                    };
                }
                function B(t) {
                    var e = t.fatal,
                        i = 0;
                    this.handler = function (t, s) {
                        if (-1 === s && 0 !== i) return (i = 0), u(e);
                        if (-1 === s && 0 === i) return -1;
                        if (0 !== i) {
                            var n = i,
                                o = null;
                            (i = 0), r(s, 65, 254) && (o = 190 * (n - 129) + (s - 65));
                            var h = null === o ? null : y(o, b("euc-kr"));
                            return null === o && a(s) && t.prepend(s), null === h ? u(e) : h;
                        }
                        return a(s) ? s : r(s, 129, 254) ? ((i = s), null) : u(e);
                    };
                }
                function D(t) {
                    t.fatal;
                    this.handler = function (t, e) {
                        if (-1 === e) return -1;
                        if (o(e)) return e;
                        var i = v(e, b("euc-kr"));
                        return null === i ? l(e) : [s(i / 190) + 129, (i % 190) + 65];
                    };
                }
                function j(t, e) {
                    var i = t >> 8,
                        r = 255 & t;
                    return e ? [i, r] : [r, i];
                }
                function U(t, e) {
                    var i = e.fatal,
                        s = null,
                        n = null;
                    this.handler = function (e, a) {
                        if (-1 === a && (null !== s || null !== n)) return u(i);
                        if (-1 === a && null === s && null === n) return -1;
                        if (null === s) return (s = a), null;
                        var o;
                        if (((o = t ? (s << 8) + a : (a << 8) + s), (s = null), null !== n)) {
                            var h = n;
                            return (n = null), r(o, 56320, 57343) ? 65536 + 1024 * (h - 55296) + (o - 56320) : (e.prepend(j(o, t)), u(i));
                        }
                        return r(o, 55296, 56319) ? ((n = o), null) : r(o, 56320, 57343) ? u(i) : o;
                    };
                }
                function F(t, e) {
                    e.fatal;
                    this.handler = function (e, i) {
                        if (-1 === i) return -1;
                        if (r(i, 0, 65535)) return j(i, t);
                        var s = j(55296 + ((i - 65536) >> 10), t),
                            n = j(56320 + ((i - 65536) & 1023), t);
                        return s.concat(n);
                    };
                }
                function q(t) {
                    t.fatal;
                    this.handler = function (t, e) {
                        return -1 === e ? -1 : a(e) ? e : 63360 + e - 128;
                    };
                }
                function G(t) {
                    t.fatal;
                    this.handler = function (t, e) {
                        return -1 === e ? -1 : o(e) ? e : r(e, 63360, 63487) ? e - 63360 + 128 : l(e);
                    };
                }
                Object.defineProperty &&
                    (Object.defineProperty(w.prototype, "encoding", {
                        get: function () {
                            return this._encoding.name.toLowerCase();
                        },
                    }),
                    Object.defineProperty(w.prototype, "fatal", {
                        get: function () {
                            return "fatal" === this._error_mode;
                        },
                    }),
                    Object.defineProperty(w.prototype, "ignoreBOM", {
                        get: function () {
                            return this._ignoreBOM;
                        },
                    })),
                    (w.prototype.decode = function (t, e) {
                        var i;
                        (i = "object" == typeof t && t instanceof ArrayBuffer ? new Uint8Array(t) : "object" == typeof t && "buffer" in t && t.buffer instanceof ArrayBuffer ? new Uint8Array(t.buffer, t.byteOffset, t.byteLength) : new Uint8Array(0)),
                            (e = n(e)),
                            this._do_not_flush || ((this._decoder = _[this._encoding.name]({ fatal: "fatal" === this._error_mode })), (this._BOMseen = !1)),
                            (this._do_not_flush = Boolean(e.stream));
                        for (var r, s = new h(i), a = []; ; ) {
                            var o = s.read();
                            if (-1 === o) break;
                            if (-1 === (r = this._decoder.handler(s, o))) break;
                            null !== r && (Array.isArray(r) ? a.push.apply(a, r) : a.push(r));
                        }
                        if (!this._do_not_flush) {
                            do {
                                if (-1 === (r = this._decoder.handler(s, s.read()))) break;
                                null !== r && (Array.isArray(r) ? a.push.apply(a, r) : a.push(r));
                            } while (!s.endOfStream());
                            this._decoder = null;
                        }
                        return function (t) {
                            var e, i;
                            return (
                                (e = ["UTF-8", "UTF-16LE", "UTF-16BE"]),
                                (i = this._encoding.name),
                                -1 === e.indexOf(i) || this._ignoreBOM || this._BOMseen || (t.length > 0 && 65279 === t[0] ? ((this._BOMseen = !0), t.shift()) : t.length > 0 && (this._BOMseen = !0)),
                                (function (t) {
                                    for (var e = "", i = 0; i < t.length; ++i) {
                                        var r = t[i];
                                        r <= 65535 ? (e += String.fromCharCode(r)) : ((r -= 65536), (e += String.fromCharCode(55296 + (r >> 10), 56320 + (1023 & r))));
                                    }
                                    return e;
                                })(t)
                            );
                        }.call(this, a);
                    }),
                    Object.defineProperty &&
                        Object.defineProperty(M.prototype, "encoding", {
                            get: function () {
                                return this._encoding.name.toLowerCase();
                            },
                        }),
                    (M.prototype.encode = function (t, e) {
                        (t = void 0 === t ? "" : String(t)), (e = n(e)), this._do_not_flush || (this._encoder = g[this._encoding.name]({ fatal: "fatal" === this._fatal })), (this._do_not_flush = Boolean(e.stream));
                        for (
                            var i,
                                r = new h(
                                    (function (t) {
                                        for (var e = String(t), i = e.length, r = 0, s = []; r < i; ) {
                                            var n = e.charCodeAt(r);
                                            if (n < 55296 || n > 57343) s.push(n);
                                            else if (56320 <= n && n <= 57343) s.push(65533);
                                            else if (55296 <= n && n <= 56319)
                                                if (r === i - 1) s.push(65533);
                                                else {
                                                    var a = e.charCodeAt(r + 1);
                                                    if (56320 <= a && a <= 57343) {
                                                        var o = 1023 & n,
                                                            h = 1023 & a;
                                                        s.push(65536 + (o << 10) + h), (r += 1);
                                                    } else s.push(65533);
                                                }
                                            r += 1;
                                        }
                                        return s;
                                    })(t)
                                ),
                                s = [];
                            ;

                        ) {
                            var a = r.read();
                            if (-1 === a) break;
                            if (-1 === (i = this._encoder.handler(r, a))) break;
                            Array.isArray(i) ? s.push.apply(s, i) : s.push(i);
                        }
                        if (!this._do_not_flush) {
                            for (; -1 !== (i = this._encoder.handler(r, r.read())); ) Array.isArray(i) ? s.push.apply(s, i) : s.push(i);
                            this._encoder = null;
                        }
                        return new Uint8Array(s);
                    }),
                    (g["UTF-8"] = function (t) {
                        return new k(t);
                    }),
                    (_["UTF-8"] = function (t) {
                        return new x(t);
                    }),
                    "encoding-indexes" in e &&
                        f.forEach(function (t) {
                            "Legacy single-byte encodings" === t.heading &&
                                t.encodings.forEach(function (t) {
                                    var e = t.name,
                                        i = b(e.toLowerCase());
                                    (_[e] = function (t) {
                                        return new S(i, t);
                                    }),
                                        (g[e] = function (t) {
                                            return new E(i, t);
                                        });
                                });
                        }),
                    (_.GBK = function (t) {
                        return new C(t);
                    }),
                    (g.GBK = function (t) {
                        return new A(t, !0);
                    }),
                    (g.gb18030 = function (t) {
                        return new A(t);
                    }),
                    (_.gb18030 = function (t) {
                        return new C(t);
                    }),
                    (g.Big5 = function (t) {
                        return new O(t);
                    }),
                    (_.Big5 = function (t) {
                        return new I(t);
                    }),
                    (g["EUC-JP"] = function (t) {
                        return new z(t);
                    }),
                    (_["EUC-JP"] = function (t) {
                        return new T(t);
                    }),
                    (g["ISO-2022-JP"] = function (t) {
                        return new N(t);
                    }),
                    (_["ISO-2022-JP"] = function (t) {
                        return new P(t);
                    }),
                    (g.Shift_JIS = function (t) {
                        return new R(t);
                    }),
                    (_.Shift_JIS = function (t) {
                        return new L(t);
                    }),
                    (g["EUC-KR"] = function (t) {
                        return new D(t);
                    }),
                    (_["EUC-KR"] = function (t) {
                        return new B(t);
                    }),
                    (g["UTF-16BE"] = function (t) {
                        return new F(!0, t);
                    }),
                    (_["UTF-16BE"] = function (t) {
                        return new U(!0, t);
                    }),
                    (g["UTF-16LE"] = function (t) {
                        return new F(!1, t);
                    }),
                    (_["UTF-16LE"] = function (t) {
                        return new U(!1, t);
                    }),
                    (g["x-user-defined"] = function (t) {
                        return new G(t);
                    }),
                    (_["x-user-defined"] = function (t) {
                        return new q(t);
                    }),
                    e.TextEncoder || (e.TextEncoder = M),
                    e.TextDecoder || (e.TextDecoder = w),
                    t.exports && (t.exports = { TextEncoder: e.TextEncoder, TextDecoder: e.TextDecoder, EncodingIndexes: e["encoding-indexes"] });
            })(this || {});
        },
        function (t, e) {},
        function (t, e, i) {
            "use strict";
            var r = i(25).Buffer,
                s =
                    r.isEncoding ||
                    function (t) {
                        switch ((t = "" + t) && t.toLowerCase()) {
                            case "hex":
                            case "utf8":
                            case "utf-8":
                            case "ascii":
                            case "binary":
                            case "base64":
                            case "ucs2":
                            case "ucs-2":
                            case "utf16le":
                            case "utf-16le":
                            case "raw":
                                return !0;
                            default:
                                return !1;
                        }
                    };
            function n(t) {
                var e;
                switch (
                    ((this.encoding = (function (t) {
                        var e = (function (t) {
                            if (!t) return "utf8";
                            for (var e; ; )
                                switch (t) {
                                    case "utf8":
                                    case "utf-8":
                                        return "utf8";
                                    case "ucs2":
                                    case "ucs-2":
                                    case "utf16le":
                                    case "utf-16le":
                                        return "utf16le";
                                    case "latin1":
                                    case "binary":
                                        return "latin1";
                                    case "base64":
                                    case "ascii":
                                    case "hex":
                                        return t;
                                    default:
                                        if (e) return;
                                        (t = ("" + t).toLowerCase()), (e = !0);
                                }
                        })(t);
                        if ("string" != typeof e && (r.isEncoding === s || !s(t))) throw new Error("Unknown encoding: " + t);
                        return e || t;
                    })(t)),
                    this.encoding)
                ) {
                    case "utf16le":
                        (this.text = h), (this.end = u), (e = 4);
                        break;
                    case "utf8":
                        (this.fillLast = o), (e = 4);
                        break;
                    case "base64":
                        (this.text = l), (this.end = c), (e = 3);
                        break;
                    default:
                        return (this.write = f), void (this.end = d);
                }
                (this.lastNeed = 0), (this.lastTotal = 0), (this.lastChar = r.allocUnsafe(e));
            }
            function a(t) {
                return t <= 127 ? 0 : t >> 5 == 6 ? 2 : t >> 4 == 14 ? 3 : t >> 3 == 30 ? 4 : t >> 6 == 2 ? -1 : -2;
            }
            function o(t) {
                var e = this.lastTotal - this.lastNeed,
                    i = (function (t, e, i) {
                        if (128 != (192 & e[0])) return (t.lastNeed = 0), "锟�";
                        if (t.lastNeed > 1 && e.length > 1) {
                            if (128 != (192 & e[1])) return (t.lastNeed = 1), "锟�";
                            if (t.lastNeed > 2 && e.length > 2 && 128 != (192 & e[2])) return (t.lastNeed = 2), "锟�";
                        }
                    })(this, t);
                return void 0 !== i ? i : this.lastNeed <= t.length ? (t.copy(this.lastChar, e, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (t.copy(this.lastChar, e, 0, t.length), void (this.lastNeed -= t.length));
            }
            function h(t, e) {
                if ((t.length - e) % 2 == 0) {
                    var i = t.toString("utf16le", e);
                    if (i) {
                        var r = i.charCodeAt(i.length - 1);
                        if (r >= 55296 && r <= 56319) return (this.lastNeed = 2), (this.lastTotal = 4), (this.lastChar[0] = t[t.length - 2]), (this.lastChar[1] = t[t.length - 1]), i.slice(0, -1);
                    }
                    return i;
                }
                return (this.lastNeed = 1), (this.lastTotal = 2), (this.lastChar[0] = t[t.length - 1]), t.toString("utf16le", e, t.length - 1);
            }
            function u(t) {
                var e = t && t.length ? this.write(t) : "";
                if (this.lastNeed) {
                    var i = this.lastTotal - this.lastNeed;
                    return e + this.lastChar.toString("utf16le", 0, i);
                }
                return e;
            }
            function l(t, e) {
                var i = (t.length - e) % 3;
                return 0 === i ? t.toString("base64", e) : ((this.lastNeed = 3 - i), (this.lastTotal = 3), 1 === i ? (this.lastChar[0] = t[t.length - 1]) : ((this.lastChar[0] = t[t.length - 2]), (this.lastChar[1] = t[t.length - 1])), t.toString("base64", e, t.length - i));
            }
            function c(t) {
                var e = t && t.length ? this.write(t) : "";
                return this.lastNeed ? e + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : e;
            }
            function f(t) {
                return t.toString(this.encoding);
            }
            function d(t) {
                return t && t.length ? this.write(t) : "";
            }
            (e.StringDecoder = n),
                (n.prototype.write = function (t) {
                    if (0 === t.length) return "";
                    var e, i;
                    if (this.lastNeed) {
                        if (void 0 === (e = this.fillLast(t))) return "";
                        (i = this.lastNeed), (this.lastNeed = 0);
                    } else i = 0;
                    return i < t.length ? (e ? e + this.text(t, i) : this.text(t, i)) : e || "";
                }),
                (n.prototype.end = function (t) {
                    var e = t && t.length ? this.write(t) : "";
                    return this.lastNeed ? e + "锟�" : e;
                }),
                (n.prototype.text = function (t, e) {
                    var i = (function (t, e, i) {
                        var r = e.length - 1;
                        if (r < i) return 0;
                        var s = a(e[r]);
                        if (s >= 0) return s > 0 && (t.lastNeed = s - 1), s;
                        if (--r < i || -2 === s) return 0;
                        if ((s = a(e[r])) >= 0) return s > 0 && (t.lastNeed = s - 2), s;
                        if (--r < i || -2 === s) return 0;
                        if ((s = a(e[r])) >= 0) return s > 0 && (2 === s ? (s = 0) : (t.lastNeed = s - 3)), s;
                        return 0;
                    })(this, t, e);
                    if (!this.lastNeed) return t.toString("utf8", e);
                    this.lastTotal = i;
                    var r = t.length - (i - this.lastNeed);
                    return t.copy(this.lastChar, 0, r), t.toString("utf8", e, r);
                }),
                (n.prototype.fillLast = function (t) {
                    if (this.lastNeed <= t.length) return t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
                    t.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, t.length), (this.lastNeed -= t.length);
                });
        },
        function (t, e, i) {
            var r = i(2),
                s = r.Buffer;
            function n(t, e) {
                for (var i in t) e[i] = t[i];
            }
            function a(t, e, i) {
                return s(t, e, i);
            }
            s.from && s.alloc && s.allocUnsafe && s.allocUnsafeSlow ? (t.exports = r) : (n(r, e), (e.Buffer = a)),
                n(s, a),
                (a.from = function (t, e, i) {
                    if ("number" == typeof t) throw new TypeError("Argument must not be a number");
                    return s(t, e, i);
                }),
                (a.alloc = function (t, e, i) {
                    if ("number" != typeof t) throw new TypeError("Argument must be a number");
                    var r = s(t);
                    return void 0 !== e ? ("string" == typeof i ? r.fill(e, i) : r.fill(e)) : r.fill(0), r;
                }),
                (a.allocUnsafe = function (t) {
                    if ("number" != typeof t) throw new TypeError("Argument must be a number");
                    return s(t);
                }),
                (a.allocUnsafeSlow = function (t) {
                    if ("number" != typeof t) throw new TypeError("Argument must be a number");
                    return r.SlowBuffer(t);
                });
        },
        function (t, e, i) {
            (function (e) {
                const i = "object" == typeof performance && performance && "function" == typeof performance.now ? performance : Date,
                    r =
                        "function" == typeof AbortController
                            ? AbortController
                            : class {
                                  constructor() {
                                      this.signal = new a();
                                  }
                                  abort() {
                                      this.signal.dispatchEvent("abort");
                                  }
                              },
                    s = "function" == typeof AbortSignal,
                    n = "function" == typeof r.AbortSignal,
                    a = s
                        ? AbortSignal
                        : n
                        ? r.AbortController
                        : class {
                              constructor() {
                                  (this.aborted = !1), (this._listeners = []);
                              }
                              dispatchEvent(t) {
                                  if ("abort" === t) {
                                      this.aborted = !0;
                                      const e = { type: t, target: this };
                                      this.onabort(e), this._listeners.forEach((t) => t(e), this);
                                  }
                              }
                              onabort() {}
                              addEventListener(t, e) {
                                  "abort" === t && this._listeners.push(e);
                              }
                              removeEventListener(t, e) {
                                  "abort" === t && (this._listeners = this._listeners.filter((t) => t !== e));
                              }
                          },
                    o = new Set(),
                    h = (t, e) => {
                        const i = "LRU_CACHE_OPTION_" + t;
                        c(i) && f(i, t + " option", "options." + e, _);
                    },
                    u = (t, e) => {
                        const i = "LRU_CACHE_METHOD_" + t;
                        if (c(i)) {
                            const { prototype: r } = _,
                                { get: s } = Object.getOwnPropertyDescriptor(r, t);
                            f(i, t + " method", `cache.${e}()`, s);
                        }
                    },
                    l = (...t) => {
                        "object" == typeof e && e && "function" == typeof e.emitWarning ? e.emitWarning(...t) : console.error(...t);
                    },
                    c = (t) => !o.has(t),
                    f = (t, e, i, r) => {
                        o.add(t);
                        l(`The ${e} is deprecated. Please use ${i} instead.`, "DeprecationWarning", t, r);
                    },
                    d = (t) => t && t === Math.floor(t) && t > 0 && isFinite(t),
                    p = (t) => (d(t) ? (t <= Math.pow(2, 8) ? Uint8Array : t <= Math.pow(2, 16) ? Uint16Array : t <= Math.pow(2, 32) ? Uint32Array : t <= Number.MAX_SAFE_INTEGER ? m : null) : null);
                class m extends Array {
                    constructor(t) {
                        super(t), this.fill(0);
                    }
                }
                class g {
                    constructor(t) {
                        if (0 === t) return [];
                        const e = p(t);
                        (this.heap = new e(t)), (this.length = 0);
                    }
                    push(t) {
                        this.heap[this.length++] = t;
                    }
                    pop() {
                        return this.heap[--this.length];
                    }
                }
                class _ {
                    constructor(t = {}) {
                        const {
                                max: e = 0,
                                ttl: i,
                                ttlResolution: r = 1,
                                ttlAutopurge: s,
                                updateAgeOnGet: n,
                                updateAgeOnHas: a,
                                allowStale: u,
                                dispose: f,
                                disposeAfter: m,
                                noDisposeOnSet: y,
                                noUpdateTTL: v,
                                maxSize: b = 0,
                                maxEntrySize: w = 0,
                                sizeCalculation: M,
                                fetchMethod: x,
                                fetchContext: k,
                                noDeleteOnFetchRejection: S,
                                noDeleteOnStaleGet: E,
                            } = t,
                            { length: C, maxAge: A, stale: I } = t instanceof _ ? {} : t;
                        if (0 !== e && !d(e)) throw new TypeError("max option must be a nonnegative integer");
                        const O = e ? p(e) : Array;
                        if (!O) throw new Error("invalid max value: " + e);
                        if (((this.max = e), (this.maxSize = b), (this.maxEntrySize = w || this.maxSize), (this.sizeCalculation = M || C), this.sizeCalculation)) {
                            if (!this.maxSize && !this.maxEntrySize) throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
                            if ("function" != typeof this.sizeCalculation) throw new TypeError("sizeCalculation set to non-function");
                        }
                        if (((this.fetchMethod = x || null), this.fetchMethod && "function" != typeof this.fetchMethod)) throw new TypeError("fetchMethod must be a function if specified");
                        if (((this.fetchContext = k), !this.fetchMethod && void 0 !== k)) throw new TypeError("cannot set fetchContext without fetchMethod");
                        if (
                            ((this.keyMap = new Map()),
                            (this.keyList = new Array(e).fill(null)),
                            (this.valList = new Array(e).fill(null)),
                            (this.next = new O(e)),
                            (this.prev = new O(e)),
                            (this.head = 0),
                            (this.tail = 0),
                            (this.free = new g(e)),
                            (this.initialFill = 1),
                            (this.size = 0),
                            "function" == typeof f && (this.dispose = f),
                            "function" == typeof m ? ((this.disposeAfter = m), (this.disposed = [])) : ((this.disposeAfter = null), (this.disposed = null)),
                            (this.noDisposeOnSet = !!y),
                            (this.noUpdateTTL = !!v),
                            (this.noDeleteOnFetchRejection = !!S),
                            0 !== this.maxEntrySize)
                        ) {
                            if (0 !== this.maxSize && !d(this.maxSize)) throw new TypeError("maxSize must be a positive integer if specified");
                            if (!d(this.maxEntrySize)) throw new TypeError("maxEntrySize must be a positive integer if specified");
                            this.initializeSizeTracking();
                        }
                        if (((this.allowStale = !!u || !!I), (this.noDeleteOnStaleGet = !!E), (this.updateAgeOnGet = !!n), (this.updateAgeOnHas = !!a), (this.ttlResolution = d(r) || 0 === r ? r : 1), (this.ttlAutopurge = !!s), (this.ttl = i || A || 0), this.ttl)) {
                            if (!d(this.ttl)) throw new TypeError("ttl must be a positive integer if specified");
                            this.initializeTTLTracking();
                        }
                        if (0 === this.max && 0 === this.ttl && 0 === this.maxSize) throw new TypeError("At least one of max, maxSize, or ttl is required");
                        if (!this.ttlAutopurge && !this.max && !this.maxSize) {
                            const t = "LRU_CACHE_UNBOUNDED";
                            if (c(t)) {
                                o.add(t);
                                l("TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.", "UnboundedCacheWarning", t, _);
                            }
                        }
                        I && h("stale", "allowStale"), A && h("maxAge", "ttl"), C && h("length", "sizeCalculation");
                    }
                    getRemainingTTL(t) {
                        return this.has(t, { updateAgeOnHas: !1 }) ? 1 / 0 : 0;
                    }
                    initializeTTLTracking() {
                        (this.ttls = new m(this.max)),
                            (this.starts = new m(this.max)),
                            (this.setItemTTL = (t, e, r = i.now()) => {
                                if (((this.starts[t] = 0 !== e ? r : 0), (this.ttls[t] = e), 0 !== e && this.ttlAutopurge)) {
                                    const i = setTimeout(() => {
                                        this.isStale(t) && this.delete(this.keyList[t]);
                                    }, e + 1);
                                    i.unref && i.unref();
                                }
                            }),
                            (this.updateItemAge = (t) => {
                                this.starts[t] = 0 !== this.ttls[t] ? i.now() : 0;
                            });
                        let t = 0;
                        const e = () => {
                            const e = i.now();
                            if (this.ttlResolution > 0) {
                                t = e;
                                const i = setTimeout(() => (t = 0), this.ttlResolution);
                                i.unref && i.unref();
                            }
                            return e;
                        };
                        (this.getRemainingTTL = (i) => {
                            const r = this.keyMap.get(i);
                            return void 0 === r ? 0 : 0 === this.ttls[r] || 0 === this.starts[r] ? 1 / 0 : this.starts[r] + this.ttls[r] - (t || e());
                        }),
                            (this.isStale = (i) => 0 !== this.ttls[i] && 0 !== this.starts[i] && (t || e()) - this.starts[i] > this.ttls[i]);
                    }
                    updateItemAge(t) {}
                    setItemTTL(t, e, i) {}
                    isStale(t) {
                        return !1;
                    }
                    initializeSizeTracking() {
                        (this.calculatedSize = 0),
                            (this.sizes = new m(this.max)),
                            (this.removeItemSize = (t) => {
                                (this.calculatedSize -= this.sizes[t]), (this.sizes[t] = 0);
                            }),
                            (this.requireSize = (t, e, i, r) => {
                                if (this.isBackgroundFetch(e)) return 0;
                                if (!d(i)) {
                                    if (!r) throw new TypeError("invalid size value (must be positive integer)");
                                    if ("function" != typeof r) throw new TypeError("sizeCalculation must be a function");
                                    if (((i = r(e, t)), !d(i))) throw new TypeError("sizeCalculation return invalid (expect positive integer)");
                                }
                                return i;
                            }),
                            (this.addItemSize = (t, e) => {
                                if (((this.sizes[t] = e), this.maxSize)) {
                                    const e = this.maxSize - this.sizes[t];
                                    for (; this.calculatedSize > e; ) this.evict(!0);
                                }
                                this.calculatedSize += this.sizes[t];
                            });
                    }
                    removeItemSize(t) {}
                    addItemSize(t, e) {}
                    requireSize(t, e, i, r) {
                        if (i || r) throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
                    }
                    *indexes({ allowStale: t = this.allowStale } = {}) {
                        if (this.size) for (let e = this.tail; this.isValidIndex(e) && ((!t && this.isStale(e)) || (yield e), e !== this.head); ) e = this.prev[e];
                    }
                    *rindexes({ allowStale: t = this.allowStale } = {}) {
                        if (this.size) for (let e = this.head; this.isValidIndex(e) && ((!t && this.isStale(e)) || (yield e), e !== this.tail); ) e = this.next[e];
                    }
                    isValidIndex(t) {
                        return this.keyMap.get(this.keyList[t]) === t;
                    }
                    *entries() {
                        for (const t of this.indexes()) yield [this.keyList[t], this.valList[t]];
                    }
                    *rentries() {
                        for (const t of this.rindexes()) yield [this.keyList[t], this.valList[t]];
                    }
                    *keys() {
                        for (const t of this.indexes()) yield this.keyList[t];
                    }
                    *rkeys() {
                        for (const t of this.rindexes()) yield this.keyList[t];
                    }
                    *values() {
                        for (const t of this.indexes()) yield this.valList[t];
                    }
                    *rvalues() {
                        for (const t of this.rindexes()) yield this.valList[t];
                    }
                    [Symbol.iterator]() {
                        return this.entries();
                    }
                    find(t, e = {}) {
                        for (const i of this.indexes()) if (t(this.valList[i], this.keyList[i], this)) return this.get(this.keyList[i], e);
                    }
                    forEach(t, e = this) {
                        for (const i of this.indexes()) t.call(e, this.valList[i], this.keyList[i], this);
                    }
                    rforEach(t, e = this) {
                        for (const i of this.rindexes()) t.call(e, this.valList[i], this.keyList[i], this);
                    }
                    get prune() {
                        return u("prune", "purgeStale"), this.purgeStale;
                    }
                    purgeStale() {
                        let t = !1;
                        for (const e of this.rindexes({ allowStale: !0 })) this.isStale(e) && (this.delete(this.keyList[e]), (t = !0));
                        return t;
                    }
                    dump() {
                        const t = [];
                        for (const e of this.indexes({ allowStale: !0 })) {
                            const r = this.keyList[e],
                                s = this.valList[e],
                                n = { value: this.isBackgroundFetch(s) ? s.__staleWhileFetching : s };
                            if (this.ttls) {
                                n.ttl = this.ttls[e];
                                const t = i.now() - this.starts[e];
                                n.start = Math.floor(Date.now() - t);
                            }
                            this.sizes && (n.size = this.sizes[e]), t.unshift([r, n]);
                        }
                        return t;
                    }
                    load(t) {
                        this.clear();
                        for (const [e, r] of t) {
                            if (r.start) {
                                const t = Date.now() - r.start;
                                r.start = i.now() - t;
                            }
                            this.set(e, r.value, r);
                        }
                    }
                    dispose(t, e, i) {}
                    set(t, e, { ttl: i = this.ttl, start: r, noDisposeOnSet: s = this.noDisposeOnSet, size: n = 0, sizeCalculation: a = this.sizeCalculation, noUpdateTTL: o = this.noUpdateTTL } = {}) {
                        if (((n = this.requireSize(t, e, n, a)), this.maxEntrySize && n > this.maxEntrySize)) return this.delete(t), this;
                        let h = 0 === this.size ? void 0 : this.keyMap.get(t);
                        if (void 0 === h) (h = this.newIndex()), (this.keyList[h] = t), (this.valList[h] = e), this.keyMap.set(t, h), (this.next[this.tail] = h), (this.prev[h] = this.tail), (this.tail = h), this.size++, this.addItemSize(h, n), (o = !1);
                        else {
                            const i = this.valList[h];
                            e !== i && (this.isBackgroundFetch(i) ? i.__abortController.abort() : s || (this.dispose(i, t, "set"), this.disposeAfter && this.disposed.push([i, t, "set"])), this.removeItemSize(h), (this.valList[h] = e), this.addItemSize(h, n)), this.moveToTail(h);
                        }
                        if ((0 === i || 0 !== this.ttl || this.ttls || this.initializeTTLTracking(), o || this.setItemTTL(h, i, r), this.disposeAfter)) for (; this.disposed.length; ) this.disposeAfter(...this.disposed.shift());
                        return this;
                    }
                    newIndex() {
                        return 0 === this.size ? this.tail : this.size === this.max && 0 !== this.max ? this.evict(!1) : 0 !== this.free.length ? this.free.pop() : this.initialFill++;
                    }
                    pop() {
                        if (this.size) {
                            const t = this.valList[this.head];
                            return this.evict(!0), t;
                        }
                    }
                    evict(t) {
                        const e = this.head,
                            i = this.keyList[e],
                            r = this.valList[e];
                        return (
                            this.isBackgroundFetch(r) ? r.__abortController.abort() : (this.dispose(r, i, "evict"), this.disposeAfter && this.disposed.push([r, i, "evict"])),
                            this.removeItemSize(e),
                            t && ((this.keyList[e] = null), (this.valList[e] = null), this.free.push(e)),
                            (this.head = this.next[e]),
                            this.keyMap.delete(i),
                            this.size--,
                            e
                        );
                    }
                    has(t, { updateAgeOnHas: e = this.updateAgeOnHas } = {}) {
                        const i = this.keyMap.get(t);
                        return void 0 !== i && !this.isStale(i) && (e && this.updateItemAge(i), !0);
                    }
                    peek(t, { allowStale: e = this.allowStale } = {}) {
                        const i = this.keyMap.get(t);
                        if (void 0 !== i && (e || !this.isStale(i))) {
                            const t = this.valList[i];
                            return this.isBackgroundFetch(t) ? t.__staleWhileFetching : t;
                        }
                    }
                    backgroundFetch(t, e, i, s) {
                        const n = void 0 === e ? void 0 : this.valList[e];
                        if (this.isBackgroundFetch(n)) return n;
                        const a = new r(),
                            o = { signal: a.signal, options: i, context: s },
                            h = new Promise((e) => e(this.fetchMethod(t, n, o))).then(
                                (e) => (a.signal.aborted || this.set(t, e, o.options), e),
                                (r) => {
                                    if (this.valList[e] === h) {
                                        !i.noDeleteOnFetchRejection || void 0 === h.__staleWhileFetching ? this.delete(t) : (this.valList[e] = h.__staleWhileFetching);
                                    }
                                    if (h.__returned === h) throw r;
                                }
                            );
                        return (h.__abortController = a), (h.__staleWhileFetching = n), (h.__returned = null), void 0 === e ? (this.set(t, h, o.options), (e = this.keyMap.get(t))) : (this.valList[e] = h), h;
                    }
                    isBackgroundFetch(t) {
                        return t && "object" == typeof t && "function" == typeof t.then && Object.prototype.hasOwnProperty.call(t, "__staleWhileFetching") && Object.prototype.hasOwnProperty.call(t, "__returned") && (t.__returned === t || null === t.__returned);
                    }
                    async fetch(
                        t,
                        {
                            allowStale: e = this.allowStale,
                            updateAgeOnGet: i = this.updateAgeOnGet,
                            noDeleteOnStaleGet: r = this.noDeleteOnStaleGet,
                            ttl: s = this.ttl,
                            noDisposeOnSet: n = this.noDisposeOnSet,
                            size: a = 0,
                            sizeCalculation: o = this.sizeCalculation,
                            noUpdateTTL: h = this.noUpdateTTL,
                            noDeleteOnFetchRejection: u = this.noDeleteOnFetchRejection,
                            fetchContext: l = this.fetchContext,
                            forceRefresh: c = !1,
                        } = {}
                    ) {
                        if (!this.fetchMethod) return this.get(t, { allowStale: e, updateAgeOnGet: i, noDeleteOnStaleGet: r });
                        const f = { allowStale: e, updateAgeOnGet: i, noDeleteOnStaleGet: r, ttl: s, noDisposeOnSet: n, size: a, sizeCalculation: o, noUpdateTTL: h, noDeleteOnFetchRejection: u };
                        let d = this.keyMap.get(t);
                        if (void 0 === d) {
                            const e = this.backgroundFetch(t, d, f, l);
                            return (e.__returned = e);
                        }
                        {
                            const r = this.valList[d];
                            if (this.isBackgroundFetch(r)) return e && void 0 !== r.__staleWhileFetching ? r.__staleWhileFetching : (r.__returned = r);
                            if (!c && !this.isStale(d)) return this.moveToTail(d), i && this.updateItemAge(d), r;
                            const s = this.backgroundFetch(t, d, f, l);
                            return e && void 0 !== s.__staleWhileFetching ? s.__staleWhileFetching : (s.__returned = s);
                        }
                    }
                    get(t, { allowStale: e = this.allowStale, updateAgeOnGet: i = this.updateAgeOnGet, noDeleteOnStaleGet: r = this.noDeleteOnStaleGet } = {}) {
                        const s = this.keyMap.get(t);
                        if (void 0 !== s) {
                            const n = this.valList[s],
                                a = this.isBackgroundFetch(n);
                            if (this.isStale(s)) return a ? (e ? n.__staleWhileFetching : void 0) : (r || this.delete(t), e ? n : void 0);
                            if (a) return;
                            return this.moveToTail(s), i && this.updateItemAge(s), n;
                        }
                    }
                    connect(t, e) {
                        (this.prev[e] = t), (this.next[t] = e);
                    }
                    moveToTail(t) {
                        t !== this.tail && (t === this.head ? (this.head = this.next[t]) : this.connect(this.prev[t], this.next[t]), this.connect(this.tail, t), (this.tail = t));
                    }
                    get del() {
                        return u("del", "delete"), this.delete;
                    }
                    delete(t) {
                        let e = !1;
                        if (0 !== this.size) {
                            const i = this.keyMap.get(t);
                            if (void 0 !== i)
                                if (((e = !0), 1 === this.size)) this.clear();
                                else {
                                    this.removeItemSize(i);
                                    const e = this.valList[i];
                                    this.isBackgroundFetch(e) ? e.__abortController.abort() : (this.dispose(e, t, "delete"), this.disposeAfter && this.disposed.push([e, t, "delete"])),
                                        this.keyMap.delete(t),
                                        (this.keyList[i] = null),
                                        (this.valList[i] = null),
                                        i === this.tail ? (this.tail = this.prev[i]) : i === this.head ? (this.head = this.next[i]) : ((this.next[this.prev[i]] = this.next[i]), (this.prev[this.next[i]] = this.prev[i])),
                                        this.size--,
                                        this.free.push(i);
                                }
                        }
                        if (this.disposed) for (; this.disposed.length; ) this.disposeAfter(...this.disposed.shift());
                        return e;
                    }
                    clear() {
                        for (const t of this.rindexes({ allowStale: !0 })) {
                            const e = this.valList[t];
                            if (this.isBackgroundFetch(e)) e.__abortController.abort();
                            else {
                                const i = this.keyList[t];
                                this.dispose(e, i, "delete"), this.disposeAfter && this.disposed.push([e, i, "delete"]);
                            }
                        }
                        if (
                            (this.keyMap.clear(),
                            this.valList.fill(null),
                            this.keyList.fill(null),
                            this.ttls && (this.ttls.fill(0), this.starts.fill(0)),
                            this.sizes && this.sizes.fill(0),
                            (this.head = 0),
                            (this.tail = 0),
                            (this.initialFill = 1),
                            (this.free.length = 0),
                            (this.calculatedSize = 0),
                            (this.size = 0),
                            this.disposed)
                        )
                            for (; this.disposed.length; ) this.disposeAfter(...this.disposed.shift());
                    }
                    get reset() {
                        return u("reset", "clear"), this.clear;
                    }
                    get length() {
                        return (
                            ((t, e) => {
                                const i = "LRU_CACHE_PROPERTY_" + t;
                                if (c(i)) {
                                    const { prototype: r } = _,
                                        { get: s } = Object.getOwnPropertyDescriptor(r, t);
                                    f(i, t + " property", "cache." + e, s);
                                }
                            })("length", "size"),
                            this.size
                        );
                    }
                    static get AbortController() {
                        return r;
                    }
                    static get AbortSignal() {
                        return a;
                    }
                }
                t.exports = _;
            }).call(this, i(3));
        },
        function (t, e, i) {
            "use strict";
            i.r(e);
            var r = 484813681109536e-20,
                s = Math.PI / 2,
                n = 0.017453292519943295,
                a = 57.29577951308232,
                o = Math.PI / 4,
                h = 2 * Math.PI,
                u = 3.14159265359,
                l = {
                    greenwich: 0,
                    lisbon: -9.131906111111,
                    paris: 2.337229166667,
                    bogota: -74.080916666667,
                    madrid: -3.687938888889,
                    rome: 12.452333333333,
                    bern: 7.439583333333,
                    jakarta: 106.807719444444,
                    ferro: -17.666666666667,
                    brussels: 4.367975,
                    stockholm: 18.058277777778,
                    athens: 23.7163375,
                    oslo: 10.722916666667,
                },
                c = { ft: { to_meter: 0.3048 }, "us-ft": { to_meter: 1200 / 3937 } },
                f = /[\s_\-\/\(\)]/g;
            function d(t, e) {
                if (t[e]) return t[e];
                for (var i, r = Object.keys(t), s = e.toLowerCase().replace(f, ""), n = -1; ++n < r.length; ) if ((i = r[n]).toLowerCase().replace(f, "") === s) return t[i];
            }
            var p = function (t) {
                    var e,
                        i,
                        r,
                        s = {},
                        a = t
                            .split("+")
                            .map(function (t) {
                                return t.trim();
                            })
                            .filter(function (t) {
                                return t;
                            })
                            .reduce(function (t, e) {
                                var i = e.split("=");
                                return i.push(!0), (t[i[0].toLowerCase()] = i[1]), t;
                            }, {}),
                        o = {
                            proj: "projName",
                            datum: "datumCode",
                            rf: function (t) {
                                s.rf = parseFloat(t);
                            },
                            lat_0: function (t) {
                                s.lat0 = t * n;
                            },
                            lat_1: function (t) {
                                s.lat1 = t * n;
                            },
                            lat_2: function (t) {
                                s.lat2 = t * n;
                            },
                            lat_ts: function (t) {
                                s.lat_ts = t * n;
                            },
                            lon_0: function (t) {
                                s.long0 = t * n;
                            },
                            lon_1: function (t) {
                                s.long1 = t * n;
                            },
                            lon_2: function (t) {
                                s.long2 = t * n;
                            },
                            alpha: function (t) {
                                s.alpha = parseFloat(t) * n;
                            },
                            gamma: function (t) {
                                s.rectified_grid_angle = parseFloat(t);
                            },
                            lonc: function (t) {
                                s.longc = t * n;
                            },
                            x_0: function (t) {
                                s.x0 = parseFloat(t);
                            },
                            y_0: function (t) {
                                s.y0 = parseFloat(t);
                            },
                            k_0: function (t) {
                                s.k0 = parseFloat(t);
                            },
                            k: function (t) {
                                s.k0 = parseFloat(t);
                            },
                            a: function (t) {
                                s.a = parseFloat(t);
                            },
                            b: function (t) {
                                s.b = parseFloat(t);
                            },
                            r_a: function () {
                                s.R_A = !0;
                            },
                            zone: function (t) {
                                s.zone = parseInt(t, 10);
                            },
                            south: function () {
                                s.utmSouth = !0;
                            },
                            towgs84: function (t) {
                                s.datum_params = t.split(",").map(function (t) {
                                    return parseFloat(t);
                                });
                            },
                            to_meter: function (t) {
                                s.to_meter = parseFloat(t);
                            },
                            units: function (t) {
                                s.units = t;
                                var e = d(c, t);
                                e && (s.to_meter = e.to_meter);
                            },
                            from_greenwich: function (t) {
                                s.from_greenwich = t * n;
                            },
                            pm: function (t) {
                                var e = d(l, t);
                                s.from_greenwich = (e || parseFloat(t)) * n;
                            },
                            nadgrids: function (t) {
                                "@null" === t ? (s.datumCode = "none") : (s.nadgrids = t);
                            },
                            axis: function (t) {
                                3 === t.length && -1 !== "ewnsud".indexOf(t.substr(0, 1)) && -1 !== "ewnsud".indexOf(t.substr(1, 1)) && -1 !== "ewnsud".indexOf(t.substr(2, 1)) && (s.axis = t);
                            },
                            approx: function () {
                                s.approx = !0;
                            },
                        };
                    for (e in a) (i = a[e]), e in o ? ("function" == typeof (r = o[e]) ? r(i) : (s[r] = i)) : (s[e] = i);
                    return "string" == typeof s.datumCode && "WGS84" !== s.datumCode && (s.datumCode = s.datumCode.toLowerCase()), s;
                },
                m = function (t) {
                    return new w(t).output();
                },
                g = /\s/,
                _ = /[A-Za-z]/,
                y = /[A-Za-z84_]/,
                v = /[,\]]/,
                b = /[\d\.E\-\+]/;
            function w(t) {
                if ("string" != typeof t) throw new Error("not a string");
                (this.text = t.trim()), (this.level = 0), (this.place = 0), (this.root = null), (this.stack = []), (this.currentObject = null), (this.state = 1);
            }
            function M(t, e, i) {
                Array.isArray(e) && (i.unshift(e), (e = null));
                var r = e ? {} : t,
                    s = i.reduce(function (t, e) {
                        return x(e, t), t;
                    }, r);
                e && (t[e] = s);
            }
            function x(t, e) {
                if (Array.isArray(t)) {
                    var i = t.shift();
                    if (("PARAMETER" === i && (i = t.shift()), 1 === t.length)) return Array.isArray(t[0]) ? ((e[i] = {}), void x(t[0], e[i])) : void (e[i] = t[0]);
                    if (t.length)
                        if ("TOWGS84" !== i) {
                            if ("AXIS" === i) return i in e || (e[i] = []), void e[i].push(t);
                            var r;
                            switch ((Array.isArray(i) || (e[i] = {}), i)) {
                                case "UNIT":
                                case "PRIMEM":
                                case "VERT_DATUM":
                                    return (e[i] = { name: t[0].toLowerCase(), convert: t[1] }), void (3 === t.length && x(t[2], e[i]));
                                case "SPHEROID":
                                case "ELLIPSOID":
                                    return (e[i] = { name: t[0], a: t[1], rf: t[2] }), void (4 === t.length && x(t[3], e[i]));
                                case "PROJECTEDCRS":
                                case "PROJCRS":
                                case "GEOGCS":
                                case "GEOCCS":
                                case "PROJCS":
                                case "LOCAL_CS":
                                case "GEODCRS":
                                case "GEODETICCRS":
                                case "GEODETICDATUM":
                                case "EDATUM":
                                case "ENGINEERINGDATUM":
                                case "VERT_CS":
                                case "VERTCRS":
                                case "VERTICALCRS":
                                case "COMPD_CS":
                                case "COMPOUNDCRS":
                                case "ENGINEERINGCRS":
                                case "ENGCRS":
                                case "FITTED_CS":
                                case "LOCAL_DATUM":
                                case "DATUM":
                                    return (t[0] = ["name", t[0]]), void M(e, i, t);
                                default:
                                    for (r = -1; ++r < t.length; ) if (!Array.isArray(t[r])) return x(t, e[i]);
                                    return M(e, i, t);
                            }
                        } else e[i] = t;
                    else e[i] = !0;
                } else e[t] = !0;
            }
            (w.prototype.readCharicter = function () {
                var t = this.text[this.place++];
                if (4 !== this.state)
                    for (; g.test(t); ) {
                        if (this.place >= this.text.length) return;
                        t = this.text[this.place++];
                    }
                switch (this.state) {
                    case 1:
                        return this.neutral(t);
                    case 2:
                        return this.keyword(t);
                    case 4:
                        return this.quoted(t);
                    case 5:
                        return this.afterquote(t);
                    case 3:
                        return this.number(t);
                    case -1:
                        return;
                }
            }),
                (w.prototype.afterquote = function (t) {
                    if ('"' === t) return (this.word += '"'), void (this.state = 4);
                    if (v.test(t)) return (this.word = this.word.trim()), void this.afterItem(t);
                    throw new Error("havn't handled \"" + t + '" in afterquote yet, index ' + this.place);
                }),
                (w.prototype.afterItem = function (t) {
                    return "," === t
                        ? (null !== this.word && this.currentObject.push(this.word), (this.word = null), void (this.state = 1))
                        : "]" === t
                        ? (this.level--, null !== this.word && (this.currentObject.push(this.word), (this.word = null)), (this.state = 1), (this.currentObject = this.stack.pop()), void (this.currentObject || (this.state = -1)))
                        : void 0;
                }),
                (w.prototype.number = function (t) {
                    if (!b.test(t)) {
                        if (v.test(t)) return (this.word = parseFloat(this.word)), void this.afterItem(t);
                        throw new Error("havn't handled \"" + t + '" in number yet, index ' + this.place);
                    }
                    this.word += t;
                }),
                (w.prototype.quoted = function (t) {
                    '"' !== t ? (this.word += t) : (this.state = 5);
                }),
                (w.prototype.keyword = function (t) {
                    if (y.test(t)) this.word += t;
                    else {
                        if ("[" === t) {
                            var e = [];
                            return e.push(this.word), this.level++, null === this.root ? (this.root = e) : this.currentObject.push(e), this.stack.push(this.currentObject), (this.currentObject = e), void (this.state = 1);
                        }
                        if (!v.test(t)) throw new Error("havn't handled \"" + t + '" in keyword yet, index ' + this.place);
                        this.afterItem(t);
                    }
                }),
                (w.prototype.neutral = function (t) {
                    if (_.test(t)) return (this.word = t), void (this.state = 2);
                    if ('"' === t) return (this.word = ""), void (this.state = 4);
                    if (b.test(t)) return (this.word = t), void (this.state = 3);
                    if (!v.test(t)) throw new Error("havn't handled \"" + t + '" in neutral yet, index ' + this.place);
                    this.afterItem(t);
                }),
                (w.prototype.output = function () {
                    for (; this.place < this.text.length; ) this.readCharicter();
                    if (-1 === this.state) return this.root;
                    throw new Error('unable to parse string "' + this.text + '". State is ' + this.state);
                });
            function k(t) {
                return 0.017453292519943295 * t;
            }
            var S = function (t) {
                var e = m(t),
                    i = e.shift(),
                    r = e.shift();
                e.unshift(["name", r]), e.unshift(["type", i]);
                var s = {};
                return (
                    x(e, s),
                    (function (t) {
                        if (("GEOGCS" === t.type ? (t.projName = "longlat") : "LOCAL_CS" === t.type ? ((t.projName = "identity"), (t.local = !0)) : "object" == typeof t.PROJECTION ? (t.projName = Object.keys(t.PROJECTION)[0]) : (t.projName = t.PROJECTION), t.AXIS)) {
                            for (var e = "", i = 0, r = t.AXIS.length; i < r; ++i) {
                                var s = [t.AXIS[i][0].toLowerCase(), t.AXIS[i][1].toLowerCase()];
                                -1 !== s[0].indexOf("north") || (("y" === s[0] || "lat" === s[0]) && "north" === s[1])
                                    ? (e += "n")
                                    : -1 !== s[0].indexOf("south") || (("y" === s[0] || "lat" === s[0]) && "south" === s[1])
                                    ? (e += "s")
                                    : -1 !== s[0].indexOf("east") || (("x" === s[0] || "lon" === s[0]) && "east" === s[1])
                                    ? (e += "e")
                                    : (-1 === s[0].indexOf("west") && (("x" !== s[0] && "lon" !== s[0]) || "west" !== s[1])) || (e += "w");
                            }
                            2 === e.length && (e += "u"), 3 === e.length && (t.axis = e);
                        }
                        t.UNIT && ((t.units = t.UNIT.name.toLowerCase()), "metre" === t.units && (t.units = "meter"), t.UNIT.convert && ("GEOGCS" === t.type ? t.DATUM && t.DATUM.SPHEROID && (t.to_meter = t.UNIT.convert * t.DATUM.SPHEROID.a) : (t.to_meter = t.UNIT.convert)));
                        var n = t.GEOGCS;
                        function a(e) {
                            return e * (t.to_meter || 1);
                        }
                        "GEOGCS" === t.type && (n = t),
                            n &&
                                (n.DATUM ? (t.datumCode = n.DATUM.name.toLowerCase()) : (t.datumCode = n.name.toLowerCase()),
                                "d_" === t.datumCode.slice(0, 2) && (t.datumCode = t.datumCode.slice(2)),
                                ("new_zealand_geodetic_datum_1949" !== t.datumCode && "new_zealand_1949" !== t.datumCode) || (t.datumCode = "nzgd49"),
                                ("wgs_1984" !== t.datumCode && "world_geodetic_system_1984" !== t.datumCode) || ("Mercator_Auxiliary_Sphere" === t.PROJECTION && (t.sphere = !0), (t.datumCode = "wgs84")),
                                "_ferro" === t.datumCode.slice(-6) && (t.datumCode = t.datumCode.slice(0, -6)),
                                "_jakarta" === t.datumCode.slice(-8) && (t.datumCode = t.datumCode.slice(0, -8)),
                                ~t.datumCode.indexOf("belge") && (t.datumCode = "rnb72"),
                                n.DATUM &&
                                    n.DATUM.SPHEROID &&
                                    ((t.ellps = n.DATUM.SPHEROID.name.replace("_19", "").replace(/[Cc]larke\_18/, "clrk")), "international" === t.ellps.toLowerCase().slice(0, 13) && (t.ellps = "intl"), (t.a = n.DATUM.SPHEROID.a), (t.rf = parseFloat(n.DATUM.SPHEROID.rf, 10))),
                                n.DATUM && n.DATUM.TOWGS84 && (t.datum_params = n.DATUM.TOWGS84),
                                ~t.datumCode.indexOf("osgb_1936") && (t.datumCode = "osgb36"),
                                ~t.datumCode.indexOf("osni_1952") && (t.datumCode = "osni52"),
                                (~t.datumCode.indexOf("tm65") || ~t.datumCode.indexOf("geodetic_datum_of_1965")) && (t.datumCode = "ire65"),
                                "ch1903+" === t.datumCode && (t.datumCode = "ch1903"),
                                ~t.datumCode.indexOf("israel") && (t.datumCode = "isr93")),
                            t.b && !isFinite(t.b) && (t.b = t.a),
                            [
                                ["standard_parallel_1", "Standard_Parallel_1"],
                                ["standard_parallel_1", "Latitude of 1st standard parallel"],
                                ["standard_parallel_2", "Standard_Parallel_2"],
                                ["standard_parallel_2", "Latitude of 2nd standard parallel"],
                                ["false_easting", "False_Easting"],
                                ["false_easting", "False easting"],
                                ["false-easting", "Easting at false origin"],
                                ["false_northing", "False_Northing"],
                                ["false_northing", "False northing"],
                                ["false_northing", "Northing at false origin"],
                                ["central_meridian", "Central_Meridian"],
                                ["central_meridian", "Longitude of natural origin"],
                                ["central_meridian", "Longitude of false origin"],
                                ["latitude_of_origin", "Latitude_Of_Origin"],
                                ["latitude_of_origin", "Central_Parallel"],
                                ["latitude_of_origin", "Latitude of natural origin"],
                                ["latitude_of_origin", "Latitude of false origin"],
                                ["scale_factor", "Scale_Factor"],
                                ["k0", "scale_factor"],
                                ["latitude_of_center", "Latitude_Of_Center"],
                                ["latitude_of_center", "Latitude_of_center"],
                                ["lat0", "latitude_of_center", k],
                                ["longitude_of_center", "Longitude_Of_Center"],
                                ["longitude_of_center", "Longitude_of_center"],
                                ["longc", "longitude_of_center", k],
                                ["x0", "false_easting", a],
                                ["y0", "false_northing", a],
                                ["long0", "central_meridian", k],
                                ["lat0", "latitude_of_origin", k],
                                ["lat0", "standard_parallel_1", k],
                                ["lat1", "standard_parallel_1", k],
                                ["lat2", "standard_parallel_2", k],
                                ["azimuth", "Azimuth"],
                                ["alpha", "azimuth", k],
                                ["srsCode", "name"],
                            ].forEach(function (e) {
                                return (i = t), (s = (r = e)[0]), (n = r[1]), void (!(s in i) && n in i && ((i[s] = i[n]), 3 === r.length && (i[s] = r[2](i[s]))));
                                var i, r, s, n;
                            }),
                            t.long0 || !t.longc || ("Albers_Conic_Equal_Area" !== t.projName && "Lambert_Azimuthal_Equal_Area" !== t.projName) || (t.long0 = t.longc),
                            t.lat_ts || !t.lat1 || ("Stereographic_South_Pole" !== t.projName && "Polar Stereographic (variant B)" !== t.projName) || ((t.lat0 = k(t.lat1 > 0 ? 90 : -90)), (t.lat_ts = t.lat1));
                    })(s),
                    s
                );
            };
            function E(t) {
                var e = this;
                if (2 === arguments.length) {
                    var i = arguments[1];
                    "string" == typeof i ? ("+" === i.charAt(0) ? (E[t] = p(arguments[1])) : (E[t] = S(arguments[1]))) : (E[t] = i);
                } else if (1 === arguments.length) {
                    if (Array.isArray(t))
                        return t.map(function (t) {
                            Array.isArray(t) ? E.apply(e, t) : E(t);
                        });
                    if ("string" == typeof t) {
                        if (t in E) return E[t];
                    } else "EPSG" in t ? (E["EPSG:" + t.EPSG] = t) : "ESRI" in t ? (E["ESRI:" + t.ESRI] = t) : "IAU2000" in t ? (E["IAU2000:" + t.IAU2000] = t) : console.log(t);
                    return;
                }
            }
            !(function (t) {
                t("EPSG:4326", "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees"),
                    t("EPSG:4269", "+title=NAD83 (long/lat) +proj=longlat +a=6378137.0 +b=6356752.31414036 +ellps=GRS80 +datum=NAD83 +units=degrees"),
                    t("EPSG:3857", "+title=WGS 84 / Pseudo-Mercator +proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs"),
                    (t.WGS84 = t["EPSG:4326"]),
                    (t["EPSG:3785"] = t["EPSG:3857"]),
                    (t.GOOGLE = t["EPSG:3857"]),
                    (t["EPSG:900913"] = t["EPSG:3857"]),
                    (t["EPSG:102113"] = t["EPSG:3857"]);
            })(E);
            var C = E;
            var A = ["PROJECTEDCRS", "PROJCRS", "GEOGCS", "GEOCCS", "PROJCS", "LOCAL_CS", "GEODCRS", "GEODETICCRS", "GEODETICDATUM", "ENGCRS", "ENGINEERINGCRS"];
            var I = ["3857", "900913", "3785", "102113"];
            var O = function (t) {
                    if (
                        !(function (t) {
                            return "string" == typeof t;
                        })(t)
                    )
                        return t;
                    if (
                        (function (t) {
                            return t in C;
                        })(t)
                    )
                        return C[t];
                    if (
                        (function (t) {
                            return A.some(function (e) {
                                return t.indexOf(e) > -1;
                            });
                        })(t)
                    ) {
                        var e = S(t);
                        if (
                            (function (t) {
                                var e = d(t, "authority");
                                if (e) {
                                    var i = d(e, "epsg");
                                    return i && I.indexOf(i) > -1;
                                }
                            })(e)
                        )
                            return C["EPSG:3857"];
                        var i = (function (t) {
                            var e = d(t, "extension");
                            if (e) return d(e, "proj4");
                        })(e);
                        return i ? p(i) : e;
                    }
                    return (function (t) {
                        return "+" === t[0];
                    })(t)
                        ? p(t)
                        : void 0;
                },
                T = function (t, e) {
                    var i, r;
                    if (((t = t || {}), !e)) return t;
                    for (r in e) void 0 !== (i = e[r]) && (t[r] = i);
                    return t;
                },
                z = function (t, e, i) {
                    var r = t * e;
                    return i / Math.sqrt(1 - r * r);
                },
                P = function (t) {
                    return t < 0 ? -1 : 1;
                },
                N = function (t) {
                    return Math.abs(t) <= u ? t : t - P(t) * h;
                },
                L = function (t, e, i) {
                    var r = t * i,
                        n = 0.5 * t;
                    return (r = Math.pow((1 - r) / (1 + r), n)), Math.tan(0.5 * (s - e)) / r;
                },
                R = function (t, e) {
                    for (var i, r, n = 0.5 * t, a = s - 2 * Math.atan(e), o = 0; o <= 15; o++) if (((i = t * Math.sin(a)), (a += r = s - 2 * Math.atan(e * Math.pow((1 - i) / (1 + i), n)) - a), Math.abs(r) <= 1e-10)) return a;
                    return -9999;
                };
            function B(t) {
                return t;
            }
            var D = [
                    {
                        init: function () {
                            var t = this.b / this.a;
                            (this.es = 1 - t * t),
                                "x0" in this || (this.x0 = 0),
                                "y0" in this || (this.y0 = 0),
                                (this.e = Math.sqrt(this.es)),
                                this.lat_ts ? (this.sphere ? (this.k0 = Math.cos(this.lat_ts)) : (this.k0 = z(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)))) : this.k0 || (this.k ? (this.k0 = this.k) : (this.k0 = 1));
                        },
                        forward: function (t) {
                            var e,
                                i,
                                r = t.x,
                                n = t.y;
                            if (n * a > 90 && n * a < -90 && r * a > 180 && r * a < -180) return null;
                            if (Math.abs(Math.abs(n) - s) <= 1e-10) return null;
                            if (this.sphere) (e = this.x0 + this.a * this.k0 * N(r - this.long0)), (i = this.y0 + this.a * this.k0 * Math.log(Math.tan(o + 0.5 * n)));
                            else {
                                var h = Math.sin(n),
                                    u = L(this.e, n, h);
                                (e = this.x0 + this.a * this.k0 * N(r - this.long0)), (i = this.y0 - this.a * this.k0 * Math.log(u));
                            }
                            return (t.x = e), (t.y = i), t;
                        },
                        inverse: function (t) {
                            var e,
                                i,
                                r = t.x - this.x0,
                                n = t.y - this.y0;
                            if (this.sphere) i = s - 2 * Math.atan(Math.exp(-n / (this.a * this.k0)));
                            else {
                                var a = Math.exp(-n / (this.a * this.k0));
                                if (-9999 === (i = R(this.e, a))) return null;
                            }
                            return (e = N(this.long0 + r / (this.a * this.k0))), (t.x = e), (t.y = i), t;
                        },
                        names: ["Mercator", "Popular Visualisation Pseudo Mercator", "Mercator_1SP", "Mercator_Auxiliary_Sphere", "merc"],
                    },
                    { init: function () {}, forward: B, inverse: B, names: ["longlat", "identity"] },
                ],
                j = {},
                U = [];
            function F(t, e) {
                var i = U.length;
                return t.names
                    ? ((U[i] = t),
                      t.names.forEach(function (t) {
                          j[t.toLowerCase()] = i;
                      }),
                      this)
                    : (console.log(e), !0);
            }
            var q = {
                    start: function () {
                        D.forEach(F);
                    },
                    add: F,
                    get: function (t) {
                        if (!t) return !1;
                        var e = t.toLowerCase();
                        return void 0 !== j[e] && U[j[e]] ? U[j[e]] : void 0;
                    },
                },
                G = {
                    MERIT: { a: 6378137, rf: 298.257, ellipseName: "MERIT 1983" },
                    SGS85: { a: 6378136, rf: 298.257, ellipseName: "Soviet Geodetic System 85" },
                    GRS80: { a: 6378137, rf: 298.257222101, ellipseName: "GRS 1980(IUGG, 1980)" },
                    IAU76: { a: 6378140, rf: 298.257, ellipseName: "IAU 1976" },
                    airy: { a: 6377563.396, b: 6356256.91, ellipseName: "Airy 1830" },
                    APL4: { a: 6378137, rf: 298.25, ellipseName: "Appl. Physics. 1965" },
                    NWL9D: { a: 6378145, rf: 298.25, ellipseName: "Naval Weapons Lab., 1965" },
                    mod_airy: { a: 6377340.189, b: 6356034.446, ellipseName: "Modified Airy" },
                    andrae: { a: 6377104.43, rf: 300, ellipseName: "Andrae 1876 (Den., Iclnd.)" },
                    aust_SA: { a: 6378160, rf: 298.25, ellipseName: "Australian Natl & S. Amer. 1969" },
                    GRS67: { a: 6378160, rf: 298.247167427, ellipseName: "GRS 67(IUGG 1967)" },
                    bessel: { a: 6377397.155, rf: 299.1528128, ellipseName: "Bessel 1841" },
                    bess_nam: { a: 6377483.865, rf: 299.1528128, ellipseName: "Bessel 1841 (Namibia)" },
                    clrk66: { a: 6378206.4, b: 6356583.8, ellipseName: "Clarke 1866" },
                    clrk80: { a: 6378249.145, rf: 293.4663, ellipseName: "Clarke 1880 mod." },
                    clrk58: { a: 6378293.645208759, rf: 294.2606763692654, ellipseName: "Clarke 1858" },
                    CPM: { a: 6375738.7, rf: 334.29, ellipseName: "Comm. des Poids et Mesures 1799" },
                    delmbr: { a: 6376428, rf: 311.5, ellipseName: "Delambre 1810 (Belgium)" },
                    engelis: { a: 6378136.05, rf: 298.2566, ellipseName: "Engelis 1985" },
                    evrst30: { a: 6377276.345, rf: 300.8017, ellipseName: "Everest 1830" },
                    evrst48: { a: 6377304.063, rf: 300.8017, ellipseName: "Everest 1948" },
                    evrst56: { a: 6377301.243, rf: 300.8017, ellipseName: "Everest 1956" },
                    evrst69: { a: 6377295.664, rf: 300.8017, ellipseName: "Everest 1969" },
                    evrstSS: { a: 6377298.556, rf: 300.8017, ellipseName: "Everest (Sabah & Sarawak)" },
                    fschr60: { a: 6378166, rf: 298.3, ellipseName: "Fischer (Mercury Datum) 1960" },
                    fschr60m: { a: 6378155, rf: 298.3, ellipseName: "Fischer 1960" },
                    fschr68: { a: 6378150, rf: 298.3, ellipseName: "Fischer 1968" },
                    helmert: { a: 6378200, rf: 298.3, ellipseName: "Helmert 1906" },
                    hough: { a: 6378270, rf: 297, ellipseName: "Hough" },
                    intl: { a: 6378388, rf: 297, ellipseName: "International 1909 (Hayford)" },
                    kaula: { a: 6378163, rf: 298.24, ellipseName: "Kaula 1961" },
                    lerch: { a: 6378139, rf: 298.257, ellipseName: "Lerch 1979" },
                    mprts: { a: 6397300, rf: 191, ellipseName: "Maupertius 1738" },
                    new_intl: { a: 6378157.5, b: 6356772.2, ellipseName: "New International 1967" },
                    plessis: { a: 6376523, rf: 6355863, ellipseName: "Plessis 1817 (France)" },
                    krass: { a: 6378245, rf: 298.3, ellipseName: "Krassovsky, 1942" },
                    SEasia: { a: 6378155, b: 6356773.3205, ellipseName: "Southeast Asia" },
                    walbeck: { a: 6376896, b: 6355834.8467, ellipseName: "Walbeck" },
                    WGS60: { a: 6378165, rf: 298.3, ellipseName: "WGS 60" },
                    WGS66: { a: 6378145, rf: 298.25, ellipseName: "WGS 66" },
                    WGS7: { a: 6378135, rf: 298.26, ellipseName: "WGS 72" },
                },
                W = (G.WGS84 = { a: 6378137, rf: 298.257223563, ellipseName: "WGS 84" });
            G.sphere = { a: 6370997, b: 6370997, ellipseName: "Normal Sphere (r=6370997)" };
            var Z = {};
            (Z.wgs84 = { towgs84: "0,0,0", ellipse: "WGS84", datumName: "WGS84" }),
                (Z.ch1903 = { towgs84: "674.374,15.056,405.346", ellipse: "bessel", datumName: "swiss" }),
                (Z.ggrs87 = { towgs84: "-199.87,74.79,246.62", ellipse: "GRS80", datumName: "Greek_Geodetic_Reference_System_1987" }),
                (Z.nad83 = { towgs84: "0,0,0", ellipse: "GRS80", datumName: "North_American_Datum_1983" }),
                (Z.nad27 = { nadgrids: "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat", ellipse: "clrk66", datumName: "North_American_Datum_1927" }),
                (Z.potsdam = { towgs84: "598.1,73.7,418.2,0.202,0.045,-2.455,6.7", ellipse: "bessel", datumName: "Potsdam Rauenberg 1950 DHDN" }),
                (Z.carthage = { towgs84: "-263.0,6.0,431.0", ellipse: "clark80", datumName: "Carthage 1934 Tunisia" }),
                (Z.hermannskogel = { towgs84: "577.326,90.129,463.919,5.137,1.474,5.297,2.4232", ellipse: "bessel", datumName: "Hermannskogel" }),
                (Z.osni52 = { towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15", ellipse: "airy", datumName: "Irish National" }),
                (Z.ire65 = { towgs84: "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15", ellipse: "mod_airy", datumName: "Ireland 1965" }),
                (Z.rassadiran = { towgs84: "-133.63,-157.5,-158.62", ellipse: "intl", datumName: "Rassadiran" }),
                (Z.nzgd49 = { towgs84: "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993", ellipse: "intl", datumName: "New Zealand Geodetic Datum 1949" }),
                (Z.osgb36 = { towgs84: "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894", ellipse: "airy", datumName: "Airy 1830" }),
                (Z.s_jtsk = { towgs84: "589,76,480", ellipse: "bessel", datumName: "S-JTSK (Ferro)" }),
                (Z.beduaram = { towgs84: "-106,-87,188", ellipse: "clrk80", datumName: "Beduaram" }),
                (Z.gunung_segara = { towgs84: "-403,684,41", ellipse: "bessel", datumName: "Gunung Segara Jakarta" }),
                (Z.rnb72 = { towgs84: "106.869,-52.2978,103.724,-0.33657,0.456955,-1.84218,1", ellipse: "intl", datumName: "Reseau National Belge 1972" });
            var H = function (t, e, i, s, n, a, o) {
                    var h = {};
                    return (
                        (h.datum_type = void 0 === t || "none" === t ? 5 : 4),
                        e &&
                            ((h.datum_params = e.map(parseFloat)),
                            (0 === h.datum_params[0] && 0 === h.datum_params[1] && 0 === h.datum_params[2]) || (h.datum_type = 1),
                            h.datum_params.length > 3 &&
                                ((0 === h.datum_params[3] && 0 === h.datum_params[4] && 0 === h.datum_params[5] && 0 === h.datum_params[6]) || ((h.datum_type = 2), (h.datum_params[3] *= r), (h.datum_params[4] *= r), (h.datum_params[5] *= r), (h.datum_params[6] = h.datum_params[6] / 1e6 + 1)))),
                        o && ((h.datum_type = 3), (h.grids = o)),
                        (h.a = i),
                        (h.b = s),
                        (h.es = n),
                        (h.ep2 = a),
                        h
                    );
                },
                Y = {};
            function X(t) {
                if (0 === t.length) return null;
                var e = "@" === t[0];
                return e && (t = t.slice(1)), "null" === t ? { name: "null", mandatory: !e, grid: null, isNull: !0 } : { name: t, mandatory: !e, grid: Y[t] || null, isNull: !1 };
            }
            function J(t) {
                return ((t / 3600) * Math.PI) / 180;
            }
            function K(t, e, i) {
                return String.fromCharCode.apply(null, new Uint8Array(t.buffer.slice(e, i)));
            }
            function Q(t) {
                return t.map(function (t) {
                    return [J(t.longitudeShift), J(t.latitudeShift)];
                });
            }
            function V(t, e, i) {
                return {
                    name: K(t, e + 8, e + 16).trim(),
                    parent: K(t, e + 24, e + 24 + 8).trim(),
                    lowerLatitude: t.getFloat64(e + 72, i),
                    upperLatitude: t.getFloat64(e + 88, i),
                    lowerLongitude: t.getFloat64(e + 104, i),
                    upperLongitude: t.getFloat64(e + 120, i),
                    latitudeInterval: t.getFloat64(e + 136, i),
                    longitudeInterval: t.getFloat64(e + 152, i),
                    gridNodeCount: t.getInt32(e + 168, i),
                };
            }
            function $(t, e, i, r) {
                for (var s = e + 176, n = [], a = 0; a < i.gridNodeCount; a++) {
                    var o = { latitudeShift: t.getFloat32(s + 16 * a, r), longitudeShift: t.getFloat32(s + 16 * a + 4, r), latitudeAccuracy: t.getFloat32(s + 16 * a + 8, r), longitudeAccuracy: t.getFloat32(s + 16 * a + 12, r) };
                    n.push(o);
                }
                return n;
            }
            function tt(t, e) {
                if (!(this instanceof tt)) return new tt(t);
                e =
                    e ||
                    function (t) {
                        if (t) throw t;
                    };
                var i = O(t);
                if ("object" == typeof i) {
                    var r = tt.projections.get(i.projName);
                    if (r) {
                        if (i.datumCode && "none" !== i.datumCode) {
                            var s = d(Z, i.datumCode);
                            s && ((i.datum_params = i.datum_params || (s.towgs84 ? s.towgs84.split(",") : null)), (i.ellps = s.ellipse), (i.datumName = s.datumName ? s.datumName : i.datumCode));
                        }
                        (i.k0 = i.k0 || 1), (i.axis = i.axis || "enu"), (i.ellps = i.ellps || "wgs84"), (i.lat1 = i.lat1 || i.lat0);
                        var n,
                            a,
                            o,
                            h,
                            u,
                            l,
                            c,
                            f = (function (t, e, i, r, s) {
                                if (!t) {
                                    var n = d(G, r);
                                    n || (n = W), (t = n.a), (e = n.b), (i = n.rf);
                                }
                                return i && !e && (e = (1 - 1 / i) * t), (0 === i || Math.abs(t - e) < 1e-10) && ((s = !0), (e = t)), { a: t, b: e, rf: i, sphere: s };
                            })(i.a, i.b, i.rf, i.ellps, i.sphere),
                            p = ((n = f.a), (a = f.b), f.rf, (o = i.R_A), (l = ((h = n * n) - (u = a * a)) / h), (c = 0), o ? ((h = (n *= 1 - l * (0.16666666666666666 + l * (0.04722222222222222 + 0.022156084656084655 * l))) * n), (l = 0)) : (c = Math.sqrt(l)), { es: l, e: c, ep2: (h - u) / u }),
                            m = (function (t) {
                                return void 0 === t ? null : t.split(",").map(X);
                            })(i.nadgrids),
                            g = i.datum || H(i.datumCode, i.datum_params, f.a, f.b, p.es, p.ep2, m);
                        T(this, i), T(this, r), (this.a = f.a), (this.b = f.b), (this.rf = f.rf), (this.sphere = f.sphere), (this.es = p.es), (this.e = p.e), (this.ep2 = p.ep2), (this.datum = g), this.init(), e(null, this);
                    } else e(t);
                } else e(t);
            }
            (tt.projections = q), tt.projections.start();
            var et = tt;
            function it(t, e, i) {
                var r,
                    n,
                    a,
                    o,
                    h = t.x,
                    u = t.y,
                    l = t.z ? t.z : 0;
                if (u < -s && u > -1.001 * s) u = -s;
                else if (u > s && u < 1.001 * s) u = s;
                else {
                    if (u < -s) return { x: -1 / 0, y: -1 / 0, z: t.z };
                    if (u > s) return { x: 1 / 0, y: 1 / 0, z: t.z };
                }
                return h > Math.PI && (h -= 2 * Math.PI), (n = Math.sin(u)), (o = Math.cos(u)), (a = n * n), { x: ((r = i / Math.sqrt(1 - e * a)) + l) * o * Math.cos(h), y: (r + l) * o * Math.sin(h), z: (r * (1 - e) + l) * n };
            }
            function rt(t, e, i, r) {
                var n,
                    a,
                    o,
                    h,
                    u,
                    l,
                    c,
                    f,
                    d,
                    p,
                    m,
                    g,
                    _,
                    y,
                    v,
                    b = t.x,
                    w = t.y,
                    M = t.z ? t.z : 0;
                if (((n = Math.sqrt(b * b + w * w)), (a = Math.sqrt(b * b + w * w + M * M)), n / i < 1e-12)) {
                    if (((y = 0), a / i < 1e-12)) return s, (v = -r), { x: t.x, y: t.y, z: t.z };
                } else y = Math.atan2(w, b);
                (o = M / a), (f = (h = n / a) * (1 - e) * (u = 1 / Math.sqrt(1 - e * (2 - e) * h * h))), (d = o * u), (_ = 0);
                do {
                    _++, (l = (e * (c = i / Math.sqrt(1 - e * d * d))) / (c + (v = n * f + M * d - c * (1 - e * d * d)))), (g = (m = o * (u = 1 / Math.sqrt(1 - l * (2 - l) * h * h))) * f - (p = h * (1 - l) * u) * d), (f = p), (d = m);
                } while (g * g > 1e-24 && _ < 30);
                return { x: y, y: Math.atan(m / Math.abs(p)), z: v };
            }
            function st(t) {
                return 1 === t || 2 === t;
            }
            var nt = function (t, e, i) {
                if (
                    (function (t, e) {
                        return (
                            t.datum_type === e.datum_type &&
                            !(t.a !== e.a || Math.abs(t.es - e.es) > 5e-11) &&
                            (1 === t.datum_type
                                ? t.datum_params[0] === e.datum_params[0] && t.datum_params[1] === e.datum_params[1] && t.datum_params[2] === e.datum_params[2]
                                : 2 !== t.datum_type ||
                                  (t.datum_params[0] === e.datum_params[0] &&
                                      t.datum_params[1] === e.datum_params[1] &&
                                      t.datum_params[2] === e.datum_params[2] &&
                                      t.datum_params[3] === e.datum_params[3] &&
                                      t.datum_params[4] === e.datum_params[4] &&
                                      t.datum_params[5] === e.datum_params[5] &&
                                      t.datum_params[6] === e.datum_params[6]))
                        );
                    })(t, e)
                )
                    return i;
                if (5 === t.datum_type || 5 === e.datum_type) return i;
                var r = t.a,
                    s = t.es;
                if (3 === t.datum_type) {
                    if (0 !== at(t, !1, i)) return;
                    (r = 6378137), (s = 0.0066943799901413165);
                }
                var n = e.a,
                    a = e.b,
                    o = e.es;
                if ((3 === e.datum_type && ((n = 6378137), (a = 6356752.314), (o = 0.0066943799901413165)), s === o && r === n && !st(t.datum_type) && !st(e.datum_type))) return i;
                if (
                    ((i = it(i, s, r)),
                    st(t.datum_type) &&
                        (i = (function (t, e, i) {
                            if (1 === e) return { x: t.x + i[0], y: t.y + i[1], z: t.z + i[2] };
                            if (2 === e) {
                                var r = i[0],
                                    s = i[1],
                                    n = i[2],
                                    a = i[3],
                                    o = i[4],
                                    h = i[5],
                                    u = i[6];
                                return { x: u * (t.x - h * t.y + o * t.z) + r, y: u * (h * t.x + t.y - a * t.z) + s, z: u * (-o * t.x + a * t.y + t.z) + n };
                            }
                        })(i, t.datum_type, t.datum_params)),
                    st(e.datum_type) &&
                        (i = (function (t, e, i) {
                            if (1 === e) return { x: t.x - i[0], y: t.y - i[1], z: t.z - i[2] };
                            if (2 === e) {
                                var r = i[0],
                                    s = i[1],
                                    n = i[2],
                                    a = i[3],
                                    o = i[4],
                                    h = i[5],
                                    u = i[6],
                                    l = (t.x - r) / u,
                                    c = (t.y - s) / u,
                                    f = (t.z - n) / u;
                                return { x: l + h * c - o * f, y: -h * l + c + a * f, z: o * l - a * c + f };
                            }
                        })(i, e.datum_type, e.datum_params)),
                    (i = rt(i, o, n, a)),
                    3 === e.datum_type) &&
                    0 !== at(e, !0, i)
                )
                    return;
                return i;
            };
            function at(t, e, i) {
                if (null === t.grids || 0 === t.grids.length) return console.log("Grid shift grids not found"), -1;
                for (var r = { x: -i.x, y: i.y }, s = { x: Number.NaN, y: Number.NaN }, n = [], o = 0; o < t.grids.length; o++) {
                    var h = t.grids[o];
                    if ((n.push(h.name), h.isNull)) {
                        s = r;
                        break;
                    }
                    if ((h.mandatory, null !== h.grid)) {
                        var u = h.grid.subgrids[0],
                            l = (Math.abs(u.del[1]) + Math.abs(u.del[0])) / 1e4,
                            c = u.ll[0] - l,
                            f = u.ll[1] - l,
                            d = u.ll[0] + (u.lim[0] - 1) * u.del[0] + l,
                            p = u.ll[1] + (u.lim[1] - 1) * u.del[1] + l;
                        if (!(f > r.y || c > r.x || p < r.y || d < r.x || ((s = ot(r, e, u)), isNaN(s.x)))) break;
                    } else if (h.mandatory) return console.log("Unable to find mandatory grid '" + h.name + "'"), -1;
                }
                return isNaN(s.x) ? (console.log("Failed to find a grid shift table for location '" + -r.x * a + " " + r.y * a + " tried: '" + n + "'"), -1) : ((i.x = -s.x), (i.y = s.y), 0);
            }
            function ot(t, e, i) {
                var r = { x: Number.NaN, y: Number.NaN };
                if (isNaN(t.x)) return r;
                var s = { x: t.x, y: t.y };
                (s.x -= i.ll[0]), (s.y -= i.ll[1]), (s.x = N(s.x - Math.PI) + Math.PI);
                var n = ht(s, i);
                if (e) {
                    if (isNaN(n.x)) return r;
                    (n.x = s.x - n.x), (n.y = s.y - n.y);
                    var a,
                        o,
                        h = 9;
                    do {
                        if (((o = ht(n, i)), isNaN(o.x))) {
                            console.log("Inverse grid shift iteration failed, presumably at grid edge.  Using first approximation.");
                            break;
                        }
                        (a = { x: s.x - (o.x + n.x), y: s.y - (o.y + n.y) }), (n.x += a.x), (n.y += a.y);
                    } while (h-- && Math.abs(a.x) > 1e-12 && Math.abs(a.y) > 1e-12);
                    if (h < 0) return console.log("Inverse grid shift iterator failed to converge."), r;
                    (r.x = N(n.x + i.ll[0])), (r.y = n.y + i.ll[1]);
                } else isNaN(n.x) || ((r.x = t.x + n.x), (r.y = t.y + n.y));
                return r;
            }
            function ht(t, e) {
                var i,
                    r = { x: t.x / e.del[0], y: t.y / e.del[1] },
                    s = Math.floor(r.x),
                    n = Math.floor(r.y),
                    a = r.x - 1 * s,
                    o = r.y - 1 * n,
                    h = { x: Number.NaN, y: Number.NaN };
                if (s < 0 || s >= e.lim[0]) return h;
                if (n < 0 || n >= e.lim[1]) return h;
                i = n * e.lim[0] + s;
                var u = e.cvs[i][0],
                    l = e.cvs[i][1];
                i++;
                var c = e.cvs[i][0],
                    f = e.cvs[i][1];
                i += e.lim[0];
                var d = e.cvs[i][0],
                    p = e.cvs[i][1];
                i--;
                var m = e.cvs[i][0],
                    g = e.cvs[i][1],
                    _ = a * o,
                    y = a * (1 - o),
                    v = (1 - a) * (1 - o),
                    b = (1 - a) * o;
                return (h.x = v * u + y * c + b * m + _ * d), (h.y = v * l + y * f + b * g + _ * p), h;
            }
            var ut = function (t, e, i) {
                    var r,
                        s,
                        n,
                        a = i.x,
                        o = i.y,
                        h = i.z || 0,
                        u = {};
                    for (n = 0; n < 3; n++)
                        if (!e || 2 !== n || void 0 !== i.z)
                            switch ((0 === n ? ((r = a), (s = -1 !== "ew".indexOf(t.axis[n]) ? "x" : "y")) : 1 === n ? ((r = o), (s = -1 !== "ns".indexOf(t.axis[n]) ? "y" : "x")) : ((r = h), (s = "z")), t.axis[n])) {
                                case "e":
                                    u[s] = r;
                                    break;
                                case "w":
                                    u[s] = -r;
                                    break;
                                case "n":
                                    u[s] = r;
                                    break;
                                case "s":
                                    u[s] = -r;
                                    break;
                                case "u":
                                    void 0 !== i[s] && (u.z = r);
                                    break;
                                case "d":
                                    void 0 !== i[s] && (u.z = -r);
                                    break;
                                default:
                                    return null;
                            }
                    return u;
                },
                lt = function (t) {
                    var e = { x: t[0], y: t[1] };
                    return t.length > 2 && (e.z = t[2]), t.length > 3 && (e.m = t[3]), e;
                };
            function ct(t) {
                if ("function" == typeof Number.isFinite) {
                    if (Number.isFinite(t)) return;
                    throw new TypeError("coordinates must be finite numbers");
                }
                if ("number" != typeof t || t != t || !isFinite(t)) throw new TypeError("coordinates must be finite numbers");
            }
            function ft(t, e, i, r) {
                var s;
                if (
                    (Array.isArray(i) && (i = lt(i)),
                    (function (t) {
                        ct(t.x), ct(t.y);
                    })(i),
                    t.datum &&
                        e.datum &&
                        (function (t, e) {
                            return ((1 === t.datum.datum_type || 2 === t.datum.datum_type) && "WGS84" !== e.datumCode) || ((1 === e.datum.datum_type || 2 === e.datum.datum_type) && "WGS84" !== t.datumCode);
                        })(t, e) &&
                        ((i = ft(t, (s = new et("WGS84")), i, r)), (t = s)),
                    r && "enu" !== t.axis && (i = ut(t, !1, i)),
                    "longlat" === t.projName)
                )
                    i = { x: i.x * n, y: i.y * n, z: i.z || 0 };
                else if ((t.to_meter && (i = { x: i.x * t.to_meter, y: i.y * t.to_meter, z: i.z || 0 }), !(i = t.inverse(i)))) return;
                if ((t.from_greenwich && (i.x += t.from_greenwich), (i = nt(t.datum, e.datum, i))))
                    return (
                        e.from_greenwich && (i = { x: i.x - e.from_greenwich, y: i.y, z: i.z || 0 }),
                        "longlat" === e.projName ? (i = { x: i.x * a, y: i.y * a, z: i.z || 0 }) : ((i = e.forward(i)), e.to_meter && (i = { x: i.x / e.to_meter, y: i.y / e.to_meter, z: i.z || 0 })),
                        r && "enu" !== e.axis ? ut(e, !0, i) : i
                    );
            }
            var dt = et("WGS84");
            function pt(t, e, i, r) {
                var s, n, a;
                return Array.isArray(i)
                    ? ((s = ft(t, e, i, r) || { x: NaN, y: NaN }),
                      i.length > 2 ? ((void 0 !== t.name && "geocent" === t.name) || (void 0 !== e.name && "geocent" === e.name) ? ("number" == typeof s.z ? [s.x, s.y, s.z].concat(i.splice(3)) : [s.x, s.y, i[2]].concat(i.splice(3))) : [s.x, s.y].concat(i.splice(2))) : [s.x, s.y])
                    : ((n = ft(t, e, i, r)),
                      2 === (a = Object.keys(i)).length ||
                          a.forEach(function (r) {
                              if ((void 0 !== t.name && "geocent" === t.name) || (void 0 !== e.name && "geocent" === e.name)) {
                                  if ("x" === r || "y" === r || "z" === r) return;
                              } else if ("x" === r || "y" === r) return;
                              n[r] = i[r];
                          }),
                      n);
            }
            function mt(t) {
                return t instanceof et ? t : t.oProj ? t.oProj : et(t);
            }
            var gt = function (t, e, i) {
                    t = mt(t);
                    var r,
                        s = !1;
                    return (
                        void 0 === e ? ((e = t), (t = dt), (s = !0)) : (void 0 !== e.x || Array.isArray(e)) && ((i = e), (e = t), (t = dt), (s = !0)),
                        (e = mt(e)),
                        i
                            ? pt(t, e, i)
                            : ((r = {
                                  forward: function (i, r) {
                                      return pt(t, e, i, r);
                                  },
                                  inverse: function (i, r) {
                                      return pt(e, t, i, r);
                                  },
                              }),
                              s && (r.oProj = e),
                              r)
                    );
                },
                _t = 73,
                yt = 79,
                vt = {
                    forward: bt,
                    inverse: function (t) {
                        var e = kt(Ct(t.toUpperCase()));
                        if (e.lat && e.lon) return [e.lon, e.lat, e.lon, e.lat];
                        return [e.left, e.bottom, e.right, e.top];
                    },
                    toPoint: wt,
                };
            function bt(t, e) {
                return (
                    (e = e || 5),
                    (function (t, e) {
                        var i = "00000" + t.easting,
                            r = "00000" + t.northing;
                        return (
                            t.zoneNumber +
                            t.zoneLetter +
                            ((d = t.easting),
                            (p = t.northing),
                            (m = t.zoneNumber),
                            (g = Et(m)),
                            (_ = Math.floor(d / 1e5)),
                            (y = Math.floor(p / 1e5) % 20),
                            (s = _),
                            (n = y),
                            (a = g),
                            (o = a - 1),
                            (h = "AJSAJS".charCodeAt(o)),
                            (u = "AFAFAF".charCodeAt(o)),
                            (l = h + s - 1),
                            (c = u + n),
                            (f = !1),
                            l > 90 && ((l = l - 90 + 65 - 1), (f = !0)),
                            (l === _t || (h < _t && l > _t) || ((l > _t || h < _t) && f)) && l++,
                            (l === yt || (h < yt && l > yt) || ((l > yt || h < yt) && f)) && ++l === _t && l++,
                            l > 90 && (l = l - 90 + 65 - 1),
                            c > 86 ? ((c = c - 86 + 65 - 1), (f = !0)) : (f = !1),
                            (c === _t || (u < _t && c > _t) || ((c > _t || u < _t) && f)) && c++,
                            (c === yt || (u < yt && c > yt) || ((c > yt || u < yt) && f)) && ++c === _t && c++,
                            c > 86 && (c = c - 86 + 65 - 1),
                            String.fromCharCode(l) + String.fromCharCode(c)) +
                            i.substr(i.length - 5, e) +
                            r.substr(r.length - 5, e)
                        );
                        var s, n, a, o, h, u, l, c, f;
                        var d, p, m, g, _, y;
                    })(
                        (function (t) {
                            var e,
                                i,
                                r,
                                s,
                                n,
                                a,
                                o,
                                h = t.lat,
                                u = t.lon,
                                l = 6378137,
                                c = Mt(h),
                                f = Mt(u);
                            (o = Math.floor((u + 180) / 6) + 1), 180 === u && (o = 60);
                            h >= 56 && h < 64 && u >= 3 && u < 12 && (o = 32);
                            h >= 72 && h < 84 && (u >= 0 && u < 9 ? (o = 31) : u >= 9 && u < 21 ? (o = 33) : u >= 21 && u < 33 ? (o = 35) : u >= 33 && u < 42 && (o = 37));
                            (a = Mt(6 * (o - 1) - 180 + 3)),
                                0.006739496752268451,
                                (e = l / Math.sqrt(1 - 0.00669438 * Math.sin(c) * Math.sin(c))),
                                (i = Math.tan(c) * Math.tan(c)),
                                (r = 0.006739496752268451 * Math.cos(c) * Math.cos(c)),
                                (s = Math.cos(c) * (f - a)),
                                (n = l * (0.9983242984503243 * c - 0.002514607064228144 * Math.sin(2 * c) + 2639046602129982e-21 * Math.sin(4 * c) - 3.418046101696858e-9 * Math.sin(6 * c)));
                            var d = 0.9996 * e * (s + ((1 - i + r) * s * s * s) / 6 + ((5 - 18 * i + i * i + 72 * r - 0.39089081163157013) * s * s * s * s * s) / 120) + 5e5,
                                p = 0.9996 * (n + e * Math.tan(c) * ((s * s) / 2 + ((5 - i + 9 * r + 4 * r * r) * s * s * s * s) / 24 + ((61 - 58 * i + i * i + 600 * r - 2.2240339282485886) * s * s * s * s * s * s) / 720));
                            h < 0 && (p += 1e7);
                            return { northing: Math.round(p), easting: Math.round(d), zoneNumber: o, zoneLetter: St(h) };
                        })({ lat: t[1], lon: t[0] }),
                        e
                    )
                );
            }
            function wt(t) {
                var e = kt(Ct(t.toUpperCase()));
                return e.lat && e.lon ? [e.lon, e.lat] : [(e.left + e.right) / 2, (e.top + e.bottom) / 2];
            }
            function Mt(t) {
                return t * (Math.PI / 180);
            }
            function xt(t) {
                return (t / Math.PI) * 180;
            }
            function kt(t) {
                var e = t.northing,
                    i = t.easting,
                    r = t.zoneLetter,
                    s = t.zoneNumber;
                if (s < 0 || s > 60) return null;
                var n,
                    a,
                    o,
                    h,
                    u,
                    l,
                    c,
                    f,
                    d = 6378137,
                    p = (1 - Math.sqrt(0.99330562)) / (1 + Math.sqrt(0.99330562)),
                    m = i - 5e5,
                    g = e;
                r < "N" && (g -= 1e7),
                    (l = 6 * (s - 1) - 180 + 3),
                    (f = (c = g / 0.9996 / 6367449.145945056) + ((3 * p) / 2 - (27 * p * p * p) / 32) * Math.sin(2 * c) + ((21 * p * p) / 16 - (55 * p * p * p * p) / 32) * Math.sin(4 * c) + ((151 * p * p * p) / 96) * Math.sin(6 * c)),
                    (n = d / Math.sqrt(1 - 0.00669438 * Math.sin(f) * Math.sin(f))),
                    (a = Math.tan(f) * Math.tan(f)),
                    (o = 0.006739496752268451 * Math.cos(f) * Math.cos(f)),
                    (h = (0.99330562 * d) / Math.pow(1 - 0.00669438 * Math.sin(f) * Math.sin(f), 1.5)),
                    (u = m / (0.9996 * n));
                var _ = f - ((n * Math.tan(f)) / h) * ((u * u) / 2 - ((5 + 3 * a + 10 * o - 4 * o * o - 0.06065547077041606) * u * u * u * u) / 24 + ((61 + 90 * a + 298 * o + 45 * a * a - 1.6983531815716497 - 3 * o * o) * u * u * u * u * u * u) / 720);
                _ = xt(_);
                var y,
                    v = (u - ((1 + 2 * a + o) * u * u * u) / 6 + ((5 - 2 * o + 28 * a - 3 * o * o + 0.05391597401814761 + 24 * a * a) * u * u * u * u * u) / 120) / Math.cos(f);
                if (((v = l + xt(v)), t.accuracy)) {
                    var b = kt({ northing: t.northing + t.accuracy, easting: t.easting + t.accuracy, zoneLetter: t.zoneLetter, zoneNumber: t.zoneNumber });
                    y = { top: b.lat, right: b.lon, bottom: _, left: v };
                } else y = { lat: _, lon: v };
                return y;
            }
            function St(t) {
                var e = "Z";
                return (
                    84 >= t && t >= 72
                        ? (e = "X")
                        : 72 > t && t >= 64
                        ? (e = "W")
                        : 64 > t && t >= 56
                        ? (e = "V")
                        : 56 > t && t >= 48
                        ? (e = "U")
                        : 48 > t && t >= 40
                        ? (e = "T")
                        : 40 > t && t >= 32
                        ? (e = "S")
                        : 32 > t && t >= 24
                        ? (e = "R")
                        : 24 > t && t >= 16
                        ? (e = "Q")
                        : 16 > t && t >= 8
                        ? (e = "P")
                        : 8 > t && t >= 0
                        ? (e = "N")
                        : 0 > t && t >= -8
                        ? (e = "M")
                        : -8 > t && t >= -16
                        ? (e = "L")
                        : -16 > t && t >= -24
                        ? (e = "K")
                        : -24 > t && t >= -32
                        ? (e = "J")
                        : -32 > t && t >= -40
                        ? (e = "H")
                        : -40 > t && t >= -48
                        ? (e = "G")
                        : -48 > t && t >= -56
                        ? (e = "F")
                        : -56 > t && t >= -64
                        ? (e = "E")
                        : -64 > t && t >= -72
                        ? (e = "D")
                        : -72 > t && t >= -80 && (e = "C"),
                    e
                );
            }
            function Et(t) {
                var e = t % 6;
                return 0 === e && (e = 6), e;
            }
            function Ct(t) {
                if (t && 0 === t.length) throw "MGRSPoint coverting from nothing";
                for (var e, i = t.length, r = null, s = "", n = 0; !/[A-Z]/.test((e = t.charAt(n))); ) {
                    if (n >= 2) throw "MGRSPoint bad conversion from: " + t;
                    (s += e), n++;
                }
                var a = parseInt(s, 10);
                if (0 === n || n + 3 > i) throw "MGRSPoint bad conversion from: " + t;
                var o = t.charAt(n++);
                if (o <= "A" || "B" === o || "Y" === o || o >= "Z" || "I" === o || "O" === o) throw "MGRSPoint zone letter " + o + " not handled: " + t;
                r = t.substring(n, (n += 2));
                for (
                    var h = Et(a),
                        u = (function (t, e) {
                            var i = "AJSAJS".charCodeAt(e - 1),
                                r = 1e5,
                                s = !1;
                            for (; i !== t.charCodeAt(0); ) {
                                if ((++i === _t && i++, i === yt && i++, i > 90)) {
                                    if (s) throw "Bad character: " + t;
                                    (i = 65), (s = !0);
                                }
                                r += 1e5;
                            }
                            return r;
                        })(r.charAt(0), h),
                        l = (function (t, e) {
                            if (t > "V") throw "MGRSPoint given invalid Northing " + t;
                            var i = "AFAFAF".charCodeAt(e - 1),
                                r = 0,
                                s = !1;
                            for (; i !== t.charCodeAt(0); ) {
                                if ((++i === _t && i++, i === yt && i++, i > 86)) {
                                    if (s) throw "Bad character: " + t;
                                    (i = 65), (s = !0);
                                }
                                r += 1e5;
                            }
                            return r;
                        })(r.charAt(1), h);
                    l < At(o);

                )
                    l += 2e6;
                var c = i - n;
                if (c % 2 != 0) throw "MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + t;
                var f,
                    d,
                    p,
                    m = c / 2,
                    g = 0,
                    _ = 0;
                return m > 0 && ((f = 1e5 / Math.pow(10, m)), (d = t.substring(n, n + m)), (g = parseFloat(d) * f), (p = t.substring(n + m)), (_ = parseFloat(p) * f)), { easting: g + u, northing: _ + l, zoneLetter: o, zoneNumber: a, accuracy: f };
            }
            function At(t) {
                var e;
                switch (t) {
                    case "C":
                        e = 11e5;
                        break;
                    case "D":
                        e = 2e6;
                        break;
                    case "E":
                        e = 28e5;
                        break;
                    case "F":
                        e = 37e5;
                        break;
                    case "G":
                        e = 46e5;
                        break;
                    case "H":
                        e = 55e5;
                        break;
                    case "J":
                        e = 64e5;
                        break;
                    case "K":
                        e = 73e5;
                        break;
                    case "L":
                        e = 82e5;
                        break;
                    case "M":
                        e = 91e5;
                        break;
                    case "N":
                        e = 0;
                        break;
                    case "P":
                        e = 8e5;
                        break;
                    case "Q":
                        e = 17e5;
                        break;
                    case "R":
                        e = 26e5;
                        break;
                    case "S":
                        e = 35e5;
                        break;
                    case "T":
                        e = 44e5;
                        break;
                    case "U":
                        e = 53e5;
                        break;
                    case "V":
                        e = 62e5;
                        break;
                    case "W":
                        e = 7e6;
                        break;
                    case "X":
                        e = 79e5;
                        break;
                    default:
                        e = -1;
                }
                if (e >= 0) return e;
                throw "Invalid zone letter: " + t;
            }
            function It(t, e, i) {
                if (!(this instanceof It)) return new It(t, e, i);
                if (Array.isArray(t)) (this.x = t[0]), (this.y = t[1]), (this.z = t[2] || 0);
                else if ("object" == typeof t) (this.x = t.x), (this.y = t.y), (this.z = t.z || 0);
                else if ("string" == typeof t && void 0 === e) {
                    var r = t.split(",");
                    (this.x = parseFloat(r[0], 10)), (this.y = parseFloat(r[1], 10)), (this.z = parseFloat(r[2], 10) || 0);
                } else (this.x = t), (this.y = e), (this.z = i || 0);
                console.warn("proj4.Point will be removed in version 3, use proj4.toPoint");
            }
            (It.fromMGRS = function (t) {
                return new It(wt(t));
            }),
                (It.prototype.toMGRS = function (t) {
                    return bt([this.x, this.y], t);
                });
            var Ot = It,
                Tt = 0.01068115234375,
                zt = function (t) {
                    var e = [];
                    (e[0] = 1 - t * (0.25 + t * (0.046875 + t * (0.01953125 + t * Tt)))), (e[1] = t * (0.75 - t * (0.046875 + t * (0.01953125 + t * Tt))));
                    var i = t * t;
                    return (e[2] = i * (0.46875 - t * (0.013020833333333334 + 0.007120768229166667 * t))), (i *= t), (e[3] = i * (0.3645833333333333 - 0.005696614583333333 * t)), (e[4] = i * t * 0.3076171875), e;
                },
                Pt = function (t, e, i, r) {
                    return (i *= e), (e *= e), r[0] * t - i * (r[1] + e * (r[2] + e * (r[3] + e * r[4])));
                },
                Nt = function (t, e, i) {
                    for (var r = 1 / (1 - e), s = t, n = 20; n; --n) {
                        var a = Math.sin(s),
                            o = 1 - e * a * a;
                        if (((s -= o = (Pt(s, a, Math.cos(s), i) - t) * (o * Math.sqrt(o)) * r), Math.abs(o) < 1e-10)) return s;
                    }
                    return s;
                };
            var Lt = {
                    init: function () {
                        (this.x0 = void 0 !== this.x0 ? this.x0 : 0),
                            (this.y0 = void 0 !== this.y0 ? this.y0 : 0),
                            (this.long0 = void 0 !== this.long0 ? this.long0 : 0),
                            (this.lat0 = void 0 !== this.lat0 ? this.lat0 : 0),
                            this.es && ((this.en = zt(this.es)), (this.ml0 = Pt(this.lat0, Math.sin(this.lat0), Math.cos(this.lat0), this.en)));
                    },
                    forward: function (t) {
                        var e,
                            i,
                            r,
                            s = t.x,
                            n = t.y,
                            a = N(s - this.long0),
                            o = Math.sin(n),
                            h = Math.cos(n);
                        if (this.es) {
                            var u = h * a,
                                l = Math.pow(u, 2),
                                c = this.ep2 * Math.pow(h, 2),
                                f = Math.pow(c, 2),
                                d = Math.abs(h) > 1e-10 ? Math.tan(n) : 0,
                                p = Math.pow(d, 2),
                                m = Math.pow(p, 2);
                            (e = 1 - this.es * Math.pow(o, 2)), (u /= Math.sqrt(e));
                            var g = Pt(n, o, h, this.en);
                            (i = this.a * (this.k0 * u * (1 + (l / 6) * (1 - p + c + (l / 20) * (5 - 18 * p + m + 14 * c - 58 * p * c + (l / 42) * (61 + 179 * m - m * p - 479 * p))))) + this.x0),
                                (r = this.a * (this.k0 * (g - this.ml0 + ((o * a * u) / 2) * (1 + (l / 12) * (5 - p + 9 * c + 4 * f + (l / 30) * (61 + m - 58 * p + 270 * c - 330 * p * c + (l / 56) * (1385 + 543 * m - m * p - 3111 * p)))))) + this.y0);
                        } else {
                            var _ = h * Math.sin(a);
                            if (Math.abs(Math.abs(_) - 1) < 1e-10) return 93;
                            if (((i = 0.5 * this.a * this.k0 * Math.log((1 + _) / (1 - _)) + this.x0), (r = (h * Math.cos(a)) / Math.sqrt(1 - Math.pow(_, 2))), (_ = Math.abs(r)) >= 1)) {
                                if (_ - 1 > 1e-10) return 93;
                                r = 0;
                            } else r = Math.acos(r);
                            n < 0 && (r = -r), (r = this.a * this.k0 * (r - this.lat0) + this.y0);
                        }
                        return (t.x = i), (t.y = r), t;
                    },
                    inverse: function (t) {
                        var e,
                            i,
                            r,
                            n,
                            a = (t.x - this.x0) * (1 / this.a),
                            o = (t.y - this.y0) * (1 / this.a);
                        if (this.es)
                            if (((e = this.ml0 + o / this.k0), (i = Nt(e, this.es, this.en)), Math.abs(i) < s)) {
                                var h = Math.sin(i),
                                    u = Math.cos(i),
                                    l = Math.abs(u) > 1e-10 ? Math.tan(i) : 0,
                                    c = this.ep2 * Math.pow(u, 2),
                                    f = Math.pow(c, 2),
                                    d = Math.pow(l, 2),
                                    p = Math.pow(d, 2);
                                e = 1 - this.es * Math.pow(h, 2);
                                var m = (a * Math.sqrt(e)) / this.k0,
                                    g = Math.pow(m, 2);
                                (r = i - (((e *= l) * g) / (1 - this.es)) * 0.5 * (1 - (g / 12) * (5 + 3 * d - 9 * c * d + c - 4 * f - (g / 30) * (61 + 90 * d - 252 * c * d + 45 * p + 46 * c - (g / 56) * (1385 + 3633 * d + 4095 * p + 1574 * p * d))))),
                                    (n = N(this.long0 + (m * (1 - (g / 6) * (1 + 2 * d + c - (g / 20) * (5 + 28 * d + 24 * p + 8 * c * d + 6 * c - (g / 42) * (61 + 662 * d + 1320 * p + 720 * p * d))))) / u));
                            } else (r = s * P(o)), (n = 0);
                        else {
                            var _ = Math.exp(a / this.k0),
                                y = 0.5 * (_ - 1 / _),
                                v = this.lat0 + o / this.k0,
                                b = Math.cos(v);
                            (e = Math.sqrt((1 - Math.pow(b, 2)) / (1 + Math.pow(y, 2)))), (r = Math.asin(e)), o < 0 && (r = -r), (n = 0 === y && 0 === b ? 0 : N(Math.atan2(y, b) + this.long0));
                        }
                        return (t.x = n), (t.y = r), t;
                    },
                    names: ["Fast_Transverse_Mercator", "Fast Transverse Mercator"],
                },
                Rt = function (t) {
                    var e = Math.exp(t);
                    return (e = (e - 1 / e) / 2);
                },
                Bt = function (t, e) {
                    (t = Math.abs(t)), (e = Math.abs(e));
                    var i = Math.max(t, e),
                        r = Math.min(t, e) / (i || 1);
                    return i * Math.sqrt(1 + Math.pow(r, 2));
                },
                Dt = function (t) {
                    var e = Math.abs(t);
                    return (
                        (e = (function (t) {
                            var e = 1 + t,
                                i = e - 1;
                            return 0 === i ? t : (t * Math.log(e)) / i;
                        })(e * (1 + e / (Bt(1, e) + 1)))),
                        t < 0 ? -e : e
                    );
                },
                jt = function (t, e) {
                    for (var i, r = 2 * Math.cos(2 * e), s = t.length - 1, n = t[s], a = 0; --s >= 0; ) (i = r * n - a + t[s]), (a = n), (n = i);
                    return e + i * Math.sin(2 * e);
                },
                Ut = function (t, e, i) {
                    for (
                        var r,
                            s,
                            n = Math.sin(e),
                            a = Math.cos(e),
                            o = Rt(i),
                            h = (function (t) {
                                var e = Math.exp(t);
                                return (e = (e + 1 / e) / 2);
                            })(i),
                            u = 2 * a * h,
                            l = -2 * n * o,
                            c = t.length - 1,
                            f = t[c],
                            d = 0,
                            p = 0,
                            m = 0;
                        --c >= 0;

                    )
                        (r = p), (s = d), (f = u * (p = f) - r - l * (d = m) + t[c]), (m = l * p - s + u * d);
                    return [(u = n * h) * f - (l = a * o) * m, u * m + l * f];
                };
            var Ft = {
                init: function () {
                    if (!this.approx && (isNaN(this.es) || this.es <= 0)) throw new Error('Incorrect elliptical usage. Try using the +approx option in the proj string, or PROJECTION["Fast_Transverse_Mercator"] in the WKT.');
                    this.approx && (Lt.init.apply(this), (this.forward = Lt.forward), (this.inverse = Lt.inverse)),
                        (this.x0 = void 0 !== this.x0 ? this.x0 : 0),
                        (this.y0 = void 0 !== this.y0 ? this.y0 : 0),
                        (this.long0 = void 0 !== this.long0 ? this.long0 : 0),
                        (this.lat0 = void 0 !== this.lat0 ? this.lat0 : 0),
                        (this.cgb = []),
                        (this.cbg = []),
                        (this.utg = []),
                        (this.gtu = []);
                    var t = this.es / (1 + Math.sqrt(1 - this.es)),
                        e = t / (2 - t),
                        i = e;
                    (this.cgb[0] = e * (2 + e * (-2 / 3 + e * (e * (116 / 45 + e * (26 / 45 + e * (-2854 / 675))) - 2)))),
                        (this.cbg[0] = e * (e * (2 / 3 + e * (4 / 3 + e * (-82 / 45 + e * (32 / 45 + e * (4642 / 4725))))) - 2)),
                        (i *= e),
                        (this.cgb[1] = i * (7 / 3 + e * (e * (-227 / 45 + e * (2704 / 315 + e * (2323 / 945))) - 1.6))),
                        (this.cbg[1] = i * (5 / 3 + e * (-16 / 15 + e * (-13 / 9 + e * (904 / 315 + e * (-1522 / 945)))))),
                        (i *= e),
                        (this.cgb[2] = i * (56 / 15 + e * (-136 / 35 + e * (-1262 / 105 + e * (73814 / 2835))))),
                        (this.cbg[2] = i * (-26 / 15 + e * (34 / 21 + e * (1.6 + e * (-12686 / 2835))))),
                        (i *= e),
                        (this.cgb[3] = i * (4279 / 630 + e * (-332 / 35 + e * (-399572 / 14175)))),
                        (this.cbg[3] = i * (1237 / 630 + e * (e * (-24832 / 14175) - 2.4))),
                        (i *= e),
                        (this.cgb[4] = i * (4174 / 315 + e * (-144838 / 6237))),
                        (this.cbg[4] = i * (-734 / 315 + e * (109598 / 31185))),
                        (i *= e),
                        (this.cgb[5] = i * (601676 / 22275)),
                        (this.cbg[5] = i * (444337 / 155925)),
                        (i = Math.pow(e, 2)),
                        (this.Qn = (this.k0 / (1 + e)) * (1 + i * (1 / 4 + i * (1 / 64 + i / 256)))),
                        (this.utg[0] = e * (e * (2 / 3 + e * (-37 / 96 + e * (1 / 360 + e * (81 / 512 + e * (-96199 / 604800))))) - 0.5)),
                        (this.gtu[0] = e * (0.5 + e * (-2 / 3 + e * (5 / 16 + e * (41 / 180 + e * (-127 / 288 + e * (7891 / 37800))))))),
                        (this.utg[1] = i * (-1 / 48 + e * (-1 / 15 + e * (437 / 1440 + e * (-46 / 105 + e * (1118711 / 3870720)))))),
                        (this.gtu[1] = i * (13 / 48 + e * (e * (557 / 1440 + e * (281 / 630 + e * (-1983433 / 1935360))) - 0.6))),
                        (i *= e),
                        (this.utg[2] = i * (-17 / 480 + e * (37 / 840 + e * (209 / 4480 + e * (-5569 / 90720))))),
                        (this.gtu[2] = i * (61 / 240 + e * (-103 / 140 + e * (15061 / 26880 + e * (167603 / 181440))))),
                        (i *= e),
                        (this.utg[3] = i * (-4397 / 161280 + e * (11 / 504 + e * (830251 / 7257600)))),
                        (this.gtu[3] = i * (49561 / 161280 + e * (-179 / 168 + e * (6601661 / 7257600)))),
                        (i *= e),
                        (this.utg[4] = i * (-4583 / 161280 + e * (108847 / 3991680))),
                        (this.gtu[4] = i * (34729 / 80640 + e * (-3418889 / 1995840))),
                        (i *= e),
                        (this.utg[5] = i * (-20648693 / 638668800)),
                        (this.gtu[5] = 0.6650675310896665 * i);
                    var r = jt(this.cbg, this.lat0);
                    this.Zb =
                        -this.Qn *
                        (r +
                            (function (t, e) {
                                for (var i, r = 2 * Math.cos(e), s = t.length - 1, n = t[s], a = 0; --s >= 0; ) (i = r * n - a + t[s]), (a = n), (n = i);
                                return Math.sin(e) * i;
                            })(this.gtu, 2 * r));
                },
                forward: function (t) {
                    var e = N(t.x - this.long0),
                        i = t.y;
                    i = jt(this.cbg, i);
                    var r = Math.sin(i),
                        s = Math.cos(i),
                        n = Math.sin(e),
                        a = Math.cos(e);
                    (i = Math.atan2(r, a * s)), (e = Math.atan2(n * s, Bt(r, s * a))), (e = Dt(Math.tan(e)));
                    var o,
                        h,
                        u = Ut(this.gtu, 2 * i, 2 * e);
                    return (i += u[0]), (e += u[1]), Math.abs(e) <= 2.623395162778 ? ((o = this.a * (this.Qn * e) + this.x0), (h = this.a * (this.Qn * i + this.Zb) + this.y0)) : ((o = 1 / 0), (h = 1 / 0)), (t.x = o), (t.y = h), t;
                },
                inverse: function (t) {
                    var e,
                        i,
                        r = (t.x - this.x0) * (1 / this.a),
                        s = (t.y - this.y0) * (1 / this.a);
                    if (((s = (s - this.Zb) / this.Qn), (r /= this.Qn), Math.abs(r) <= 2.623395162778)) {
                        var n = Ut(this.utg, 2 * s, 2 * r);
                        (s += n[0]), (r += n[1]), (r = Math.atan(Rt(r)));
                        var a = Math.sin(s),
                            o = Math.cos(s),
                            h = Math.sin(r),
                            u = Math.cos(r);
                        (s = Math.atan2(a * u, Bt(h, u * o))), (r = Math.atan2(h, u * o)), (e = N(r + this.long0)), (i = jt(this.cgb, s));
                    } else (e = 1 / 0), (i = 1 / 0);
                    return (t.x = e), (t.y = i), t;
                },
                names: ["Extended_Transverse_Mercator", "Extended Transverse Mercator", "etmerc", "Transverse_Mercator", "Transverse Mercator", "tmerc"],
            };
            var qt = {
                    init: function () {
                        var t = (function (t, e) {
                            if (void 0 === t) {
                                if ((t = Math.floor((30 * (N(e) + Math.PI)) / Math.PI) + 1) < 0) return 0;
                                if (t > 60) return 60;
                            }
                            return t;
                        })(this.zone, this.long0);
                        if (void 0 === t) throw new Error("unknown utm zone");
                        (this.lat0 = 0), (this.long0 = (6 * Math.abs(t) - 183) * n), (this.x0 = 5e5), (this.y0 = this.utmSouth ? 1e7 : 0), (this.k0 = 0.9996), Ft.init.apply(this), (this.forward = Ft.forward), (this.inverse = Ft.inverse);
                    },
                    names: ["Universal Transverse Mercator System", "utm"],
                    dependsOn: "etmerc",
                },
                Gt = function (t, e) {
                    return Math.pow((1 - t) / (1 + t), e);
                };
            var Wt = {
                init: function () {
                    var t = Math.sin(this.lat0),
                        e = Math.cos(this.lat0);
                    (e *= e),
                        (this.rc = Math.sqrt(1 - this.es) / (1 - this.es * t * t)),
                        (this.C = Math.sqrt(1 + (this.es * e * e) / (1 - this.es))),
                        (this.phic0 = Math.asin(t / this.C)),
                        (this.ratexp = 0.5 * this.C * this.e),
                        (this.K = Math.tan(0.5 * this.phic0 + o) / (Math.pow(Math.tan(0.5 * this.lat0 + o), this.C) * Gt(this.e * t, this.ratexp)));
                },
                forward: function (t) {
                    var e = t.x,
                        i = t.y;
                    return (t.y = 2 * Math.atan(this.K * Math.pow(Math.tan(0.5 * i + o), this.C) * Gt(this.e * Math.sin(i), this.ratexp)) - s), (t.x = this.C * e), t;
                },
                inverse: function (t) {
                    for (var e = t.x / this.C, i = t.y, r = Math.pow(Math.tan(0.5 * i + o) / this.K, 1 / this.C), n = 20; n > 0 && ((i = 2 * Math.atan(r * Gt(this.e * Math.sin(t.y), -0.5 * this.e)) - s), !(Math.abs(i - t.y) < 1e-14)); --n) t.y = i;
                    return n ? ((t.x = e), (t.y = i), t) : null;
                },
                names: ["gauss"],
            };
            var Zt = {
                init: function () {
                    Wt.init.apply(this), this.rc && ((this.sinc0 = Math.sin(this.phic0)), (this.cosc0 = Math.cos(this.phic0)), (this.R2 = 2 * this.rc), this.title || (this.title = "Oblique Stereographic Alternative"));
                },
                forward: function (t) {
                    var e, i, r, s;
                    return (
                        (t.x = N(t.x - this.long0)),
                        Wt.forward.apply(this, [t]),
                        (e = Math.sin(t.y)),
                        (i = Math.cos(t.y)),
                        (r = Math.cos(t.x)),
                        (s = (this.k0 * this.R2) / (1 + this.sinc0 * e + this.cosc0 * i * r)),
                        (t.x = s * i * Math.sin(t.x)),
                        (t.y = s * (this.cosc0 * e - this.sinc0 * i * r)),
                        (t.x = this.a * t.x + this.x0),
                        (t.y = this.a * t.y + this.y0),
                        t
                    );
                },
                inverse: function (t) {
                    var e, i, r, s, n;
                    if (((t.x = (t.x - this.x0) / this.a), (t.y = (t.y - this.y0) / this.a), (t.x /= this.k0), (t.y /= this.k0), (n = Math.sqrt(t.x * t.x + t.y * t.y)))) {
                        var a = 2 * Math.atan2(n, this.R2);
                        (e = Math.sin(a)), (i = Math.cos(a)), (s = Math.asin(i * this.sinc0 + (t.y * e * this.cosc0) / n)), (r = Math.atan2(t.x * e, n * this.cosc0 * i - t.y * this.sinc0 * e));
                    } else (s = this.phic0), (r = 0);
                    return (t.x = r), (t.y = s), Wt.inverse.apply(this, [t]), (t.x = N(t.x + this.long0)), t;
                },
                names: ["Stereographic_North_Pole", "Oblique_Stereographic", "Polar_Stereographic", "sterea", "Oblique Stereographic Alternative", "Double_Stereographic"],
            };
            var Ht = {
                init: function () {
                    (this.coslat0 = Math.cos(this.lat0)),
                        (this.sinlat0 = Math.sin(this.lat0)),
                        this.sphere
                            ? 1 === this.k0 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= 1e-10 && (this.k0 = 0.5 * (1 + P(this.lat0) * Math.sin(this.lat_ts)))
                            : (Math.abs(this.coslat0) <= 1e-10 && (this.lat0 > 0 ? (this.con = 1) : (this.con = -1)),
                              (this.cons = Math.sqrt(Math.pow(1 + this.e, 1 + this.e) * Math.pow(1 - this.e, 1 - this.e))),
                              1 === this.k0 && !isNaN(this.lat_ts) && Math.abs(this.coslat0) <= 1e-10 && (this.k0 = (0.5 * this.cons * z(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts))) / L(this.e, this.con * this.lat_ts, this.con * Math.sin(this.lat_ts))),
                              (this.ms1 = z(this.e, this.sinlat0, this.coslat0)),
                              (this.X0 = 2 * Math.atan(this.ssfn_(this.lat0, this.sinlat0, this.e)) - s),
                              (this.cosX0 = Math.cos(this.X0)),
                              (this.sinX0 = Math.sin(this.X0)));
                },
                forward: function (t) {
                    var e,
                        i,
                        r,
                        n,
                        a,
                        o,
                        h = t.x,
                        u = t.y,
                        l = Math.sin(u),
                        c = Math.cos(u),
                        f = N(h - this.long0);
                    return Math.abs(Math.abs(h - this.long0) - Math.PI) <= 1e-10 && Math.abs(u + this.lat0) <= 1e-10
                        ? ((t.x = NaN), (t.y = NaN), t)
                        : this.sphere
                        ? ((e = (2 * this.k0) / (1 + this.sinlat0 * l + this.coslat0 * c * Math.cos(f))), (t.x = this.a * e * c * Math.sin(f) + this.x0), (t.y = this.a * e * (this.coslat0 * l - this.sinlat0 * c * Math.cos(f)) + this.y0), t)
                        : ((i = 2 * Math.atan(this.ssfn_(u, l, this.e)) - s),
                          (n = Math.cos(i)),
                          (r = Math.sin(i)),
                          Math.abs(this.coslat0) <= 1e-10
                              ? ((a = L(this.e, u * this.con, this.con * l)), (o = (2 * this.a * this.k0 * a) / this.cons), (t.x = this.x0 + o * Math.sin(h - this.long0)), (t.y = this.y0 - this.con * o * Math.cos(h - this.long0)), t)
                              : (Math.abs(this.sinlat0) < 1e-10
                                    ? ((e = (2 * this.a * this.k0) / (1 + n * Math.cos(f))), (t.y = e * r))
                                    : ((e = (2 * this.a * this.k0 * this.ms1) / (this.cosX0 * (1 + this.sinX0 * r + this.cosX0 * n * Math.cos(f)))), (t.y = e * (this.cosX0 * r - this.sinX0 * n * Math.cos(f)) + this.y0)),
                                (t.x = e * n * Math.sin(f) + this.x0),
                                t));
                },
                inverse: function (t) {
                    var e, i, r, n, a;
                    (t.x -= this.x0), (t.y -= this.y0);
                    var o = Math.sqrt(t.x * t.x + t.y * t.y);
                    if (this.sphere) {
                        var h = 2 * Math.atan(o / (2 * this.a * this.k0));
                        return (
                            (e = this.long0),
                            (i = this.lat0),
                            o <= 1e-10
                                ? ((t.x = e), (t.y = i), t)
                                : ((i = Math.asin(Math.cos(h) * this.sinlat0 + (t.y * Math.sin(h) * this.coslat0) / o)),
                                  (e = Math.abs(this.coslat0) < 1e-10 ? (this.lat0 > 0 ? N(this.long0 + Math.atan2(t.x, -1 * t.y)) : N(this.long0 + Math.atan2(t.x, t.y))) : N(this.long0 + Math.atan2(t.x * Math.sin(h), o * this.coslat0 * Math.cos(h) - t.y * this.sinlat0 * Math.sin(h)))),
                                  (t.x = e),
                                  (t.y = i),
                                  t)
                        );
                    }
                    if (Math.abs(this.coslat0) <= 1e-10) {
                        if (o <= 1e-10) return (i = this.lat0), (e = this.long0), (t.x = e), (t.y = i), t;
                        (t.x *= this.con), (t.y *= this.con), (r = (o * this.cons) / (2 * this.a * this.k0)), (i = this.con * R(this.e, r)), (e = this.con * N(this.con * this.long0 + Math.atan2(t.x, -1 * t.y)));
                    } else
                        (n = 2 * Math.atan((o * this.cosX0) / (2 * this.a * this.k0 * this.ms1))),
                            (e = this.long0),
                            o <= 1e-10 ? (a = this.X0) : ((a = Math.asin(Math.cos(n) * this.sinX0 + (t.y * Math.sin(n) * this.cosX0) / o)), (e = N(this.long0 + Math.atan2(t.x * Math.sin(n), o * this.cosX0 * Math.cos(n) - t.y * this.sinX0 * Math.sin(n))))),
                            (i = -1 * R(this.e, Math.tan(0.5 * (s + a))));
                    return (t.x = e), (t.y = i), t;
                },
                names: ["stere", "Stereographic_South_Pole", "Polar Stereographic (variant B)"],
                ssfn_: function (t, e, i) {
                    return (e *= i), Math.tan(0.5 * (s + t)) * Math.pow((1 - e) / (1 + e), 0.5 * i);
                },
            };
            var Yt = {
                init: function () {
                    var t = this.lat0;
                    this.lambda0 = this.long0;
                    var e = Math.sin(t),
                        i = this.a,
                        r = 1 / this.rf,
                        s = 2 * r - Math.pow(r, 2),
                        n = (this.e = Math.sqrt(s));
                    (this.R = (this.k0 * i * Math.sqrt(1 - s)) / (1 - s * Math.pow(e, 2))), (this.alpha = Math.sqrt(1 + (s / (1 - s)) * Math.pow(Math.cos(t), 4))), (this.b0 = Math.asin(e / this.alpha));
                    var a = Math.log(Math.tan(Math.PI / 4 + this.b0 / 2)),
                        o = Math.log(Math.tan(Math.PI / 4 + t / 2)),
                        h = Math.log((1 + n * e) / (1 - n * e));
                    this.K = a - this.alpha * o + ((this.alpha * n) / 2) * h;
                },
                forward: function (t) {
                    var e = Math.log(Math.tan(Math.PI / 4 - t.y / 2)),
                        i = (this.e / 2) * Math.log((1 + this.e * Math.sin(t.y)) / (1 - this.e * Math.sin(t.y))),
                        r = -this.alpha * (e + i) + this.K,
                        s = 2 * (Math.atan(Math.exp(r)) - Math.PI / 4),
                        n = this.alpha * (t.x - this.lambda0),
                        a = Math.atan(Math.sin(n) / (Math.sin(this.b0) * Math.tan(s) + Math.cos(this.b0) * Math.cos(n))),
                        o = Math.asin(Math.cos(this.b0) * Math.sin(s) - Math.sin(this.b0) * Math.cos(s) * Math.cos(n));
                    return (t.y = (this.R / 2) * Math.log((1 + Math.sin(o)) / (1 - Math.sin(o))) + this.y0), (t.x = this.R * a + this.x0), t;
                },
                inverse: function (t) {
                    for (
                        var e = t.x - this.x0,
                            i = t.y - this.y0,
                            r = e / this.R,
                            s = 2 * (Math.atan(Math.exp(i / this.R)) - Math.PI / 4),
                            n = Math.asin(Math.cos(this.b0) * Math.sin(s) + Math.sin(this.b0) * Math.cos(s) * Math.cos(r)),
                            a = Math.atan(Math.sin(r) / (Math.cos(this.b0) * Math.cos(r) - Math.sin(this.b0) * Math.tan(s))),
                            o = this.lambda0 + a / this.alpha,
                            h = 0,
                            u = n,
                            l = -1e3,
                            c = 0;
                        Math.abs(u - l) > 1e-7;

                    ) {
                        if (++c > 20) return;
                        (h = (1 / this.alpha) * (Math.log(Math.tan(Math.PI / 4 + n / 2)) - this.K) + this.e * Math.log(Math.tan(Math.PI / 4 + Math.asin(this.e * Math.sin(u)) / 2))), (l = u), (u = 2 * Math.atan(Math.exp(h)) - Math.PI / 2);
                    }
                    return (t.x = o), (t.y = u), t;
                },
                names: ["somerc"],
            };
            var Xt = {
                init: function () {
                    var t,
                        e,
                        i,
                        r,
                        a,
                        u,
                        l,
                        c,
                        f,
                        d,
                        p,
                        m,
                        g,
                        _ = 0,
                        y = 0,
                        v = 0,
                        b = 0,
                        w = 0,
                        M = 0,
                        x = 0;
                    (this.no_off = ((g = "object" == typeof (m = this).PROJECTION ? Object.keys(m.PROJECTION)[0] : m.PROJECTION), "no_uoff" in m || "no_off" in m || -1 !== ["Hotine_Oblique_Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin"].indexOf(g))), (this.no_rot = "no_rot" in this);
                    var k = !1;
                    "alpha" in this && (k = !0);
                    var S = !1;
                    if (("rectified_grid_angle" in this && (S = !0), k && (x = this.alpha), S && (_ = this.rectified_grid_angle * n), k || S)) y = this.longc;
                    else if (((v = this.long1), (w = this.lat1), (b = this.long2), (M = this.lat2), Math.abs(w - M) <= 1e-7 || (t = Math.abs(w)) <= 1e-7 || Math.abs(t - s) <= 1e-7 || Math.abs(Math.abs(this.lat0) - s) <= 1e-7 || Math.abs(Math.abs(M) - s) <= 1e-7)) throw new Error();
                    var E = 1 - this.es;
                    (e = Math.sqrt(E)),
                        Math.abs(this.lat0) > 1e-10
                            ? ((c = Math.sin(this.lat0)),
                              (i = Math.cos(this.lat0)),
                              (t = 1 - this.es * c * c),
                              (this.B = i * i),
                              (this.B = Math.sqrt(1 + (this.es * this.B * this.B) / E)),
                              (this.A = (this.B * this.k0 * e) / t),
                              (a = (r = (this.B * e) / (i * Math.sqrt(t))) * r - 1) <= 0 ? (a = 0) : ((a = Math.sqrt(a)), this.lat0 < 0 && (a = -a)),
                              (this.E = a += r),
                              (this.E *= Math.pow(L(this.e, this.lat0, c), this.B)))
                            : ((this.B = 1 / e), (this.A = this.k0), (this.E = r = a = 1)),
                        k || S
                            ? (k ? ((p = Math.asin(Math.sin(x) / r)), S || (_ = x)) : ((p = _), (x = Math.asin(r * Math.sin(p)))), (this.lam0 = y - Math.asin(0.5 * (a - 1 / a) * Math.tan(p)) / this.B))
                            : ((u = Math.pow(L(this.e, w, Math.sin(w)), this.B)),
                              (l = Math.pow(L(this.e, M, Math.sin(M)), this.B)),
                              (a = this.E / u),
                              (f = (l - u) / (l + u)),
                              (d = ((d = this.E * this.E) - l * u) / (d + l * u)),
                              (t = v - b) < -Math.pi ? (b -= h) : t > Math.pi && (b += h),
                              (this.lam0 = N(0.5 * (v + b) - Math.atan((d * Math.tan(0.5 * this.B * (v - b))) / f) / this.B)),
                              (p = Math.atan((2 * Math.sin(this.B * N(v - this.lam0))) / (a - 1 / a))),
                              (_ = x = Math.asin(r * Math.sin(p)))),
                        (this.singam = Math.sin(p)),
                        (this.cosgam = Math.cos(p)),
                        (this.sinrot = Math.sin(_)),
                        (this.cosrot = Math.cos(_)),
                        (this.rB = 1 / this.B),
                        (this.ArB = this.A * this.rB),
                        (this.BrA = 1 / this.ArB),
                        this.A,
                        this.B,
                        this.no_off ? (this.u_0 = 0) : ((this.u_0 = Math.abs(this.ArB * Math.atan(Math.sqrt(r * r - 1) / Math.cos(x)))), this.lat0 < 0 && (this.u_0 = -this.u_0)),
                        (a = 0.5 * p),
                        (this.v_pole_n = this.ArB * Math.log(Math.tan(o - a))),
                        (this.v_pole_s = this.ArB * Math.log(Math.tan(o + a)));
                },
                forward: function (t) {
                    var e,
                        i,
                        r,
                        n,
                        a,
                        o,
                        h,
                        u,
                        l = {};
                    if (((t.x = t.x - this.lam0), Math.abs(Math.abs(t.y) - s) > 1e-10)) {
                        if (((e = 0.5 * ((a = this.E / Math.pow(L(this.e, t.y, Math.sin(t.y)), this.B)) - (o = 1 / a))), (i = 0.5 * (a + o)), (n = Math.sin(this.B * t.x)), (r = (e * this.singam - n * this.cosgam) / i), Math.abs(Math.abs(r) - 1) < 1e-10)) throw new Error();
                        (u = 0.5 * this.ArB * Math.log((1 - r) / (1 + r))), (o = Math.cos(this.B * t.x)), (h = Math.abs(o) < 1e-7 ? this.A * t.x : this.ArB * Math.atan2(e * this.cosgam + n * this.singam, o));
                    } else (u = t.y > 0 ? this.v_pole_n : this.v_pole_s), (h = this.ArB * t.y);
                    return this.no_rot ? ((l.x = h), (l.y = u)) : ((h -= this.u_0), (l.x = u * this.cosrot + h * this.sinrot), (l.y = h * this.cosrot - u * this.sinrot)), (l.x = this.a * l.x + this.x0), (l.y = this.a * l.y + this.y0), l;
                },
                inverse: function (t) {
                    var e,
                        i,
                        r,
                        n,
                        a,
                        o,
                        h,
                        u = {};
                    if (
                        ((t.x = (t.x - this.x0) * (1 / this.a)),
                        (t.y = (t.y - this.y0) * (1 / this.a)),
                        this.no_rot ? ((i = t.y), (e = t.x)) : ((i = t.x * this.cosrot - t.y * this.sinrot), (e = t.y * this.cosrot + t.x * this.sinrot + this.u_0)),
                        (n = 0.5 * ((r = Math.exp(-this.BrA * i)) - 1 / r)),
                        (a = 0.5 * (r + 1 / r)),
                        (h = ((o = Math.sin(this.BrA * e)) * this.cosgam + n * this.singam) / a),
                        Math.abs(Math.abs(h) - 1) < 1e-10)
                    )
                        (u.x = 0), (u.y = h < 0 ? -s : s);
                    else {
                        if (((u.y = this.E / Math.sqrt((1 + h) / (1 - h))), (u.y = R(this.e, Math.pow(u.y, 1 / this.B))), u.y === 1 / 0)) throw new Error();
                        u.x = -this.rB * Math.atan2(n * this.cosgam - o * this.singam, Math.cos(this.BrA * e));
                    }
                    return (u.x += this.lam0), u;
                },
                names: ["Hotine_Oblique_Mercator", "Hotine Oblique Mercator", "Hotine_Oblique_Mercator_Azimuth_Natural_Origin", "Hotine_Oblique_Mercator_Two_Point_Natural_Origin", "Hotine_Oblique_Mercator_Azimuth_Center", "Oblique_Mercator", "omerc"],
            };
            var Jt = {
                init: function () {
                    if ((this.lat2 || (this.lat2 = this.lat1), this.k0 || (this.k0 = 1), (this.x0 = this.x0 || 0), (this.y0 = this.y0 || 0), !(Math.abs(this.lat1 + this.lat2) < 1e-10))) {
                        var t = this.b / this.a;
                        this.e = Math.sqrt(1 - t * t);
                        var e = Math.sin(this.lat1),
                            i = Math.cos(this.lat1),
                            r = z(this.e, e, i),
                            s = L(this.e, this.lat1, e),
                            n = Math.sin(this.lat2),
                            a = Math.cos(this.lat2),
                            o = z(this.e, n, a),
                            h = L(this.e, this.lat2, n),
                            u = L(this.e, this.lat0, Math.sin(this.lat0));
                        Math.abs(this.lat1 - this.lat2) > 1e-10 ? (this.ns = Math.log(r / o) / Math.log(s / h)) : (this.ns = e),
                            isNaN(this.ns) && (this.ns = e),
                            (this.f0 = r / (this.ns * Math.pow(s, this.ns))),
                            (this.rh = this.a * this.f0 * Math.pow(u, this.ns)),
                            this.title || (this.title = "Lambert Conformal Conic");
                    }
                },
                forward: function (t) {
                    var e = t.x,
                        i = t.y;
                    Math.abs(2 * Math.abs(i) - Math.PI) <= 1e-10 && (i = P(i) * (s - 2e-10));
                    var r,
                        n,
                        a = Math.abs(Math.abs(i) - s);
                    if (a > 1e-10) (r = L(this.e, i, Math.sin(i))), (n = this.a * this.f0 * Math.pow(r, this.ns));
                    else {
                        if ((a = i * this.ns) <= 0) return null;
                        n = 0;
                    }
                    var o = this.ns * N(e - this.long0);
                    return (t.x = this.k0 * (n * Math.sin(o)) + this.x0), (t.y = this.k0 * (this.rh - n * Math.cos(o)) + this.y0), t;
                },
                inverse: function (t) {
                    var e,
                        i,
                        r,
                        n,
                        a,
                        o = (t.x - this.x0) / this.k0,
                        h = this.rh - (t.y - this.y0) / this.k0;
                    this.ns > 0 ? ((e = Math.sqrt(o * o + h * h)), (i = 1)) : ((e = -Math.sqrt(o * o + h * h)), (i = -1));
                    var u = 0;
                    if ((0 !== e && (u = Math.atan2(i * o, i * h)), 0 !== e || this.ns > 0)) {
                        if (((i = 1 / this.ns), (r = Math.pow(e / (this.a * this.f0), i)), -9999 === (n = R(this.e, r)))) return null;
                    } else n = -s;
                    return (a = N(u / this.ns + this.long0)), (t.x = a), (t.y = n), t;
                },
                names: ["Lambert Tangential Conformal Conic Projection", "Lambert_Conformal_Conic", "Lambert_Conformal_Conic_1SP", "Lambert_Conformal_Conic_2SP", "lcc", "Lambert Conic Conformal (1SP)", "Lambert Conic Conformal (2SP)"],
            };
            var Kt = {
                    init: function () {
                        (this.a = 6377397.155),
                            (this.es = 0.006674372230614),
                            (this.e = Math.sqrt(this.es)),
                            this.lat0 || (this.lat0 = 0.863937979737193),
                            this.long0 || (this.long0 = 0.4334234309119251),
                            this.k0 || (this.k0 = 0.9999),
                            (this.s45 = 0.785398163397448),
                            (this.s90 = 2 * this.s45),
                            (this.fi0 = this.lat0),
                            (this.e2 = this.es),
                            (this.e = Math.sqrt(this.e2)),
                            (this.alfa = Math.sqrt(1 + (this.e2 * Math.pow(Math.cos(this.fi0), 4)) / (1 - this.e2))),
                            (this.uq = 1.04216856380474),
                            (this.u0 = Math.asin(Math.sin(this.fi0) / this.alfa)),
                            (this.g = Math.pow((1 + this.e * Math.sin(this.fi0)) / (1 - this.e * Math.sin(this.fi0)), (this.alfa * this.e) / 2)),
                            (this.k = (Math.tan(this.u0 / 2 + this.s45) / Math.pow(Math.tan(this.fi0 / 2 + this.s45), this.alfa)) * this.g),
                            (this.k1 = this.k0),
                            (this.n0 = (this.a * Math.sqrt(1 - this.e2)) / (1 - this.e2 * Math.pow(Math.sin(this.fi0), 2))),
                            (this.s0 = 1.37008346281555),
                            (this.n = Math.sin(this.s0)),
                            (this.ro0 = (this.k1 * this.n0) / Math.tan(this.s0)),
                            (this.ad = this.s90 - this.uq);
                    },
                    forward: function (t) {
                        var e,
                            i,
                            r,
                            s,
                            n,
                            a,
                            o,
                            h = t.x,
                            u = t.y,
                            l = N(h - this.long0);
                        return (
                            (e = Math.pow((1 + this.e * Math.sin(u)) / (1 - this.e * Math.sin(u)), (this.alfa * this.e) / 2)),
                            (i = 2 * (Math.atan((this.k * Math.pow(Math.tan(u / 2 + this.s45), this.alfa)) / e) - this.s45)),
                            (r = -l * this.alfa),
                            (s = Math.asin(Math.cos(this.ad) * Math.sin(i) + Math.sin(this.ad) * Math.cos(i) * Math.cos(r))),
                            (n = Math.asin((Math.cos(i) * Math.sin(r)) / Math.cos(s))),
                            (a = this.n * n),
                            (o = (this.ro0 * Math.pow(Math.tan(this.s0 / 2 + this.s45), this.n)) / Math.pow(Math.tan(s / 2 + this.s45), this.n)),
                            (t.y = (o * Math.cos(a)) / 1),
                            (t.x = (o * Math.sin(a)) / 1),
                            this.czech || ((t.y *= -1), (t.x *= -1)),
                            t
                        );
                    },
                    inverse: function (t) {
                        var e,
                            i,
                            r,
                            s,
                            n,
                            a,
                            o,
                            h = t.x;
                        (t.x = t.y),
                            (t.y = h),
                            this.czech || ((t.y *= -1), (t.x *= -1)),
                            (n = Math.sqrt(t.x * t.x + t.y * t.y)),
                            (s = Math.atan2(t.y, t.x) / Math.sin(this.s0)),
                            (r = 2 * (Math.atan(Math.pow(this.ro0 / n, 1 / this.n) * Math.tan(this.s0 / 2 + this.s45)) - this.s45)),
                            (e = Math.asin(Math.cos(this.ad) * Math.sin(r) - Math.sin(this.ad) * Math.cos(r) * Math.cos(s))),
                            (i = Math.asin((Math.cos(r) * Math.sin(s)) / Math.cos(e))),
                            (t.x = this.long0 - i / this.alfa),
                            (a = e),
                            (o = 0);
                        var u = 0;
                        do {
                            (t.y = 2 * (Math.atan(Math.pow(this.k, -1 / this.alfa) * Math.pow(Math.tan(e / 2 + this.s45), 1 / this.alfa) * Math.pow((1 + this.e * Math.sin(a)) / (1 - this.e * Math.sin(a)), this.e / 2)) - this.s45)), Math.abs(a - t.y) < 1e-10 && (o = 1), (a = t.y), (u += 1);
                        } while (0 === o && u < 15);
                        return u >= 15 ? null : t;
                    },
                    names: ["Krovak", "krovak"],
                },
                Qt = function (t, e, i, r, s) {
                    return t * s - e * Math.sin(2 * s) + i * Math.sin(4 * s) - r * Math.sin(6 * s);
                },
                Vt = function (t) {
                    return 1 - 0.25 * t * (1 + (t / 16) * (3 + 1.25 * t));
                },
                $t = function (t) {
                    return 0.375 * t * (1 + 0.25 * t * (1 + 0.46875 * t));
                },
                te = function (t) {
                    return 0.05859375 * t * t * (1 + 0.75 * t);
                },
                ee = function (t) {
                    return t * t * t * (35 / 3072);
                },
                ie = function (t, e, i) {
                    var r = e * i;
                    return t / Math.sqrt(1 - r * r);
                },
                re = function (t) {
                    return Math.abs(t) < s ? t : t - P(t) * Math.PI;
                },
                se = function (t, e, i, r, s) {
                    var n, a;
                    n = t / e;
                    for (var o = 0; o < 15; o++) if (((n += a = (t - (e * n - i * Math.sin(2 * n) + r * Math.sin(4 * n) - s * Math.sin(6 * n))) / (e - 2 * i * Math.cos(2 * n) + 4 * r * Math.cos(4 * n) - 6 * s * Math.cos(6 * n))), Math.abs(a) <= 1e-10)) return n;
                    return NaN;
                };
            var ne = {
                    init: function () {
                        this.sphere || ((this.e0 = Vt(this.es)), (this.e1 = $t(this.es)), (this.e2 = te(this.es)), (this.e3 = ee(this.es)), (this.ml0 = this.a * Qt(this.e0, this.e1, this.e2, this.e3, this.lat0)));
                    },
                    forward: function (t) {
                        var e,
                            i,
                            r = t.x,
                            s = t.y;
                        if (((r = N(r - this.long0)), this.sphere)) (e = this.a * Math.asin(Math.cos(s) * Math.sin(r))), (i = this.a * (Math.atan2(Math.tan(s), Math.cos(r)) - this.lat0));
                        else {
                            var n = Math.sin(s),
                                a = Math.cos(s),
                                o = ie(this.a, this.e, n),
                                h = Math.tan(s) * Math.tan(s),
                                u = r * Math.cos(s),
                                l = u * u,
                                c = (this.es * a * a) / (1 - this.es);
                            (e = o * u * (1 - l * h * (1 / 6 - ((8 - h + 8 * c) * l) / 120))), (i = this.a * Qt(this.e0, this.e1, this.e2, this.e3, s) - this.ml0 + ((o * n) / a) * l * (0.5 + ((5 - h + 6 * c) * l) / 24));
                        }
                        return (t.x = e + this.x0), (t.y = i + this.y0), t;
                    },
                    inverse: function (t) {
                        (t.x -= this.x0), (t.y -= this.y0);
                        var e,
                            i,
                            r = t.x / this.a,
                            n = t.y / this.a;
                        if (this.sphere) {
                            var a = n + this.lat0;
                            (e = Math.asin(Math.sin(a) * Math.cos(r))), (i = Math.atan2(Math.tan(r), Math.cos(a)));
                        } else {
                            var o = this.ml0 / this.a + n,
                                h = se(o, this.e0, this.e1, this.e2, this.e3);
                            if (Math.abs(Math.abs(h) - s) <= 1e-10) return (t.x = this.long0), (t.y = s), n < 0 && (t.y *= -1), t;
                            var u = ie(this.a, this.e, Math.sin(h)),
                                l = ((u * u * u) / this.a / this.a) * (1 - this.es),
                                c = Math.pow(Math.tan(h), 2),
                                f = (r * this.a) / u,
                                d = f * f;
                            (e = h - ((u * Math.tan(h)) / l) * f * f * (0.5 - ((1 + 3 * c) * f * f) / 24)), (i = (f * (1 - d * (c / 3 + ((1 + 3 * c) * c * d) / 15))) / Math.cos(h));
                        }
                        return (t.x = N(i + this.long0)), (t.y = re(e)), t;
                    },
                    names: ["Cassini", "Cassini_Soldner", "cass"],
                },
                ae = function (t, e) {
                    var i;
                    return t > 1e-7 ? (1 - t * t) * (e / (1 - (i = t * e) * i) - (0.5 / t) * Math.log((1 - i) / (1 + i))) : 2 * e;
                };
            var oe = {
                    init: function () {
                        var t,
                            e = Math.abs(this.lat0);
                        if ((Math.abs(e - s) < 1e-10 ? (this.mode = this.lat0 < 0 ? this.S_POLE : this.N_POLE) : Math.abs(e) < 1e-10 ? (this.mode = this.EQUIT) : (this.mode = this.OBLIQ), this.es > 0))
                            switch (
                                ((this.qp = ae(this.e, 1)),
                                (this.mmf = 0.5 / (1 - this.es)),
                                (this.apa = (function (t) {
                                    var e,
                                        i = [];
                                    return (i[0] = 0.3333333333333333 * t), (e = t * t), (i[0] += 0.17222222222222222 * e), (i[1] = 0.06388888888888888 * e), (e *= t), (i[0] += 0.10257936507936508 * e), (i[1] += 0.0664021164021164 * e), (i[2] = 0.016415012942191543 * e), i;
                                })(this.es)),
                                this.mode)
                            ) {
                                case this.N_POLE:
                                case this.S_POLE:
                                    this.dd = 1;
                                    break;
                                case this.EQUIT:
                                    (this.rq = Math.sqrt(0.5 * this.qp)), (this.dd = 1 / this.rq), (this.xmf = 1), (this.ymf = 0.5 * this.qp);
                                    break;
                                case this.OBLIQ:
                                    (this.rq = Math.sqrt(0.5 * this.qp)),
                                        (t = Math.sin(this.lat0)),
                                        (this.sinb1 = ae(this.e, t) / this.qp),
                                        (this.cosb1 = Math.sqrt(1 - this.sinb1 * this.sinb1)),
                                        (this.dd = Math.cos(this.lat0) / (Math.sqrt(1 - this.es * t * t) * this.rq * this.cosb1)),
                                        (this.ymf = (this.xmf = this.rq) / this.dd),
                                        (this.xmf *= this.dd);
                            }
                        else this.mode === this.OBLIQ && ((this.sinph0 = Math.sin(this.lat0)), (this.cosph0 = Math.cos(this.lat0)));
                    },
                    forward: function (t) {
                        var e,
                            i,
                            r,
                            n,
                            a,
                            h,
                            u,
                            l,
                            c,
                            f,
                            d = t.x,
                            p = t.y;
                        if (((d = N(d - this.long0)), this.sphere)) {
                            if (((a = Math.sin(p)), (f = Math.cos(p)), (r = Math.cos(d)), this.mode === this.OBLIQ || this.mode === this.EQUIT)) {
                                if ((i = this.mode === this.EQUIT ? 1 + f * r : 1 + this.sinph0 * a + this.cosph0 * f * r) <= 1e-10) return null;
                                (e = (i = Math.sqrt(2 / i)) * f * Math.sin(d)), (i *= this.mode === this.EQUIT ? a : this.cosph0 * a - this.sinph0 * f * r);
                            } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
                                if ((this.mode === this.N_POLE && (r = -r), Math.abs(p + this.lat0) < 1e-10)) return null;
                                (i = o - 0.5 * p), (e = (i = 2 * (this.mode === this.S_POLE ? Math.cos(i) : Math.sin(i))) * Math.sin(d)), (i *= r);
                            }
                        } else {
                            switch (((u = 0), (l = 0), (c = 0), (r = Math.cos(d)), (n = Math.sin(d)), (a = Math.sin(p)), (h = ae(this.e, a)), (this.mode !== this.OBLIQ && this.mode !== this.EQUIT) || ((u = h / this.qp), (l = Math.sqrt(1 - u * u))), this.mode)) {
                                case this.OBLIQ:
                                    c = 1 + this.sinb1 * u + this.cosb1 * l * r;
                                    break;
                                case this.EQUIT:
                                    c = 1 + l * r;
                                    break;
                                case this.N_POLE:
                                    (c = s + p), (h = this.qp - h);
                                    break;
                                case this.S_POLE:
                                    (c = p - s), (h = this.qp + h);
                            }
                            if (Math.abs(c) < 1e-10) return null;
                            switch (this.mode) {
                                case this.OBLIQ:
                                case this.EQUIT:
                                    (c = Math.sqrt(2 / c)), (i = this.mode === this.OBLIQ ? this.ymf * c * (this.cosb1 * u - this.sinb1 * l * r) : (c = Math.sqrt(2 / (1 + l * r))) * u * this.ymf), (e = this.xmf * c * l * n);
                                    break;
                                case this.N_POLE:
                                case this.S_POLE:
                                    h >= 0 ? ((e = (c = Math.sqrt(h)) * n), (i = r * (this.mode === this.S_POLE ? c : -c))) : (e = i = 0);
                            }
                        }
                        return (t.x = this.a * e + this.x0), (t.y = this.a * i + this.y0), t;
                    },
                    inverse: function (t) {
                        (t.x -= this.x0), (t.y -= this.y0);
                        var e,
                            i,
                            r,
                            n,
                            a,
                            o,
                            h,
                            u,
                            l,
                            c,
                            f = t.x / this.a,
                            d = t.y / this.a;
                        if (this.sphere) {
                            var p,
                                m = 0,
                                g = 0;
                            if ((i = 0.5 * (p = Math.sqrt(f * f + d * d))) > 1) return null;
                            switch (((i = 2 * Math.asin(i)), (this.mode !== this.OBLIQ && this.mode !== this.EQUIT) || ((g = Math.sin(i)), (m = Math.cos(i))), this.mode)) {
                                case this.EQUIT:
                                    (i = Math.abs(p) <= 1e-10 ? 0 : Math.asin((d * g) / p)), (f *= g), (d = m * p);
                                    break;
                                case this.OBLIQ:
                                    (i = Math.abs(p) <= 1e-10 ? this.lat0 : Math.asin(m * this.sinph0 + (d * g * this.cosph0) / p)), (f *= g * this.cosph0), (d = (m - Math.sin(i) * this.sinph0) * p);
                                    break;
                                case this.N_POLE:
                                    (d = -d), (i = s - i);
                                    break;
                                case this.S_POLE:
                                    i -= s;
                            }
                            e = 0 !== d || (this.mode !== this.EQUIT && this.mode !== this.OBLIQ) ? Math.atan2(f, d) : 0;
                        } else {
                            if (((h = 0), this.mode === this.OBLIQ || this.mode === this.EQUIT)) {
                                if (((f /= this.dd), (d *= this.dd), (o = Math.sqrt(f * f + d * d)) < 1e-10)) return (t.x = this.long0), (t.y = this.lat0), t;
                                (n = 2 * Math.asin((0.5 * o) / this.rq)),
                                    (r = Math.cos(n)),
                                    (f *= n = Math.sin(n)),
                                    this.mode === this.OBLIQ ? ((h = r * this.sinb1 + (d * n * this.cosb1) / o), (a = this.qp * h), (d = o * this.cosb1 * r - d * this.sinb1 * n)) : ((h = (d * n) / o), (a = this.qp * h), (d = o * r));
                            } else if (this.mode === this.N_POLE || this.mode === this.S_POLE) {
                                if ((this.mode === this.N_POLE && (d = -d), !(a = f * f + d * d))) return (t.x = this.long0), (t.y = this.lat0), t;
                                (h = 1 - a / this.qp), this.mode === this.S_POLE && (h = -h);
                            }
                            (e = Math.atan2(f, d)), (u = Math.asin(h)), (l = this.apa), (c = u + u), (i = u + l[0] * Math.sin(c) + l[1] * Math.sin(c + c) + l[2] * Math.sin(c + c + c));
                        }
                        return (t.x = N(this.long0 + e)), (t.y = i), t;
                    },
                    names: ["Lambert Azimuthal Equal Area", "Lambert_Azimuthal_Equal_Area", "laea"],
                    S_POLE: 1,
                    N_POLE: 2,
                    EQUIT: 3,
                    OBLIQ: 4,
                },
                he = function (t) {
                    return Math.abs(t) > 1 && (t = t > 1 ? 1 : -1), Math.asin(t);
                };
            var ue = {
                init: function () {
                    Math.abs(this.lat1 + this.lat2) < 1e-10 ||
                        ((this.temp = this.b / this.a),
                        (this.es = 1 - Math.pow(this.temp, 2)),
                        (this.e3 = Math.sqrt(this.es)),
                        (this.sin_po = Math.sin(this.lat1)),
                        (this.cos_po = Math.cos(this.lat1)),
                        (this.t1 = this.sin_po),
                        (this.con = this.sin_po),
                        (this.ms1 = z(this.e3, this.sin_po, this.cos_po)),
                        (this.qs1 = ae(this.e3, this.sin_po, this.cos_po)),
                        (this.sin_po = Math.sin(this.lat2)),
                        (this.cos_po = Math.cos(this.lat2)),
                        (this.t2 = this.sin_po),
                        (this.ms2 = z(this.e3, this.sin_po, this.cos_po)),
                        (this.qs2 = ae(this.e3, this.sin_po, this.cos_po)),
                        (this.sin_po = Math.sin(this.lat0)),
                        (this.cos_po = Math.cos(this.lat0)),
                        (this.t3 = this.sin_po),
                        (this.qs0 = ae(this.e3, this.sin_po, this.cos_po)),
                        Math.abs(this.lat1 - this.lat2) > 1e-10 ? (this.ns0 = (this.ms1 * this.ms1 - this.ms2 * this.ms2) / (this.qs2 - this.qs1)) : (this.ns0 = this.con),
                        (this.c = this.ms1 * this.ms1 + this.ns0 * this.qs1),
                        (this.rh = (this.a * Math.sqrt(this.c - this.ns0 * this.qs0)) / this.ns0));
                },
                forward: function (t) {
                    var e = t.x,
                        i = t.y;
                    (this.sin_phi = Math.sin(i)), (this.cos_phi = Math.cos(i));
                    var r = ae(this.e3, this.sin_phi, this.cos_phi),
                        s = (this.a * Math.sqrt(this.c - this.ns0 * r)) / this.ns0,
                        n = this.ns0 * N(e - this.long0),
                        a = s * Math.sin(n) + this.x0,
                        o = this.rh - s * Math.cos(n) + this.y0;
                    return (t.x = a), (t.y = o), t;
                },
                inverse: function (t) {
                    var e, i, r, s, n, a;
                    return (
                        (t.x -= this.x0),
                        (t.y = this.rh - t.y + this.y0),
                        this.ns0 >= 0 ? ((e = Math.sqrt(t.x * t.x + t.y * t.y)), (r = 1)) : ((e = -Math.sqrt(t.x * t.x + t.y * t.y)), (r = -1)),
                        (s = 0),
                        0 !== e && (s = Math.atan2(r * t.x, r * t.y)),
                        (r = (e * this.ns0) / this.a),
                        this.sphere ? (a = Math.asin((this.c - r * r) / (2 * this.ns0))) : ((i = (this.c - r * r) / this.ns0), (a = this.phi1z(this.e3, i))),
                        (n = N(s / this.ns0 + this.long0)),
                        (t.x = n),
                        (t.y = a),
                        t
                    );
                },
                names: ["Albers_Conic_Equal_Area", "Albers", "aea"],
                phi1z: function (t, e) {
                    var i,
                        r,
                        s,
                        n,
                        a = he(0.5 * e);
                    if (t < 1e-10) return a;
                    for (var o = t * t, h = 1; h <= 25; h++) if (((a += n = ((0.5 * (s = 1 - (r = t * (i = Math.sin(a))) * r) * s) / Math.cos(a)) * (e / (1 - o) - i / s + (0.5 / t) * Math.log((1 - r) / (1 + r)))), Math.abs(n) <= 1e-7)) return a;
                    return null;
                },
            };
            var le = {
                init: function () {
                    (this.sin_p14 = Math.sin(this.lat0)), (this.cos_p14 = Math.cos(this.lat0)), (this.infinity_dist = 1e3 * this.a), (this.rc = 1);
                },
                forward: function (t) {
                    var e,
                        i,
                        r,
                        s,
                        n,
                        a,
                        o,
                        h = t.x,
                        u = t.y;
                    return (
                        (r = N(h - this.long0)),
                        (e = Math.sin(u)),
                        (i = Math.cos(u)),
                        (s = Math.cos(r)),
                        1,
                        (n = this.sin_p14 * e + this.cos_p14 * i * s) > 0 || Math.abs(n) <= 1e-10
                            ? ((a = this.x0 + (1 * this.a * i * Math.sin(r)) / n), (o = this.y0 + (1 * this.a * (this.cos_p14 * e - this.sin_p14 * i * s)) / n))
                            : ((a = this.x0 + this.infinity_dist * i * Math.sin(r)), (o = this.y0 + this.infinity_dist * (this.cos_p14 * e - this.sin_p14 * i * s))),
                        (t.x = a),
                        (t.y = o),
                        t
                    );
                },
                inverse: function (t) {
                    var e, i, r, s, n, a;
                    return (
                        (t.x = (t.x - this.x0) / this.a),
                        (t.y = (t.y - this.y0) / this.a),
                        (t.x /= this.k0),
                        (t.y /= this.k0),
                        (e = Math.sqrt(t.x * t.x + t.y * t.y))
                            ? ((s = Math.atan2(e, this.rc)), (i = Math.sin(s)), (r = Math.cos(s)), (a = he(r * this.sin_p14 + (t.y * i * this.cos_p14) / e)), (n = Math.atan2(t.x * i, e * this.cos_p14 * r - t.y * this.sin_p14 * i)), (n = N(this.long0 + n)))
                            : ((a = this.phic0), (n = 0)),
                        (t.x = n),
                        (t.y = a),
                        t
                    );
                },
                names: ["gnom"],
            };
            var ce = {
                init: function () {
                    this.sphere || (this.k0 = z(this.e, Math.sin(this.lat_ts), Math.cos(this.lat_ts)));
                },
                forward: function (t) {
                    var e,
                        i,
                        r = t.x,
                        s = t.y,
                        n = N(r - this.long0);
                    if (this.sphere) (e = this.x0 + this.a * n * Math.cos(this.lat_ts)), (i = this.y0 + (this.a * Math.sin(s)) / Math.cos(this.lat_ts));
                    else {
                        var a = ae(this.e, Math.sin(s));
                        (e = this.x0 + this.a * this.k0 * n), (i = this.y0 + (this.a * a * 0.5) / this.k0);
                    }
                    return (t.x = e), (t.y = i), t;
                },
                inverse: function (t) {
                    var e, i;
                    return (
                        (t.x -= this.x0),
                        (t.y -= this.y0),
                        this.sphere
                            ? ((e = N(this.long0 + t.x / this.a / Math.cos(this.lat_ts))), (i = Math.asin((t.y / this.a) * Math.cos(this.lat_ts))))
                            : ((i = (function (t, e) {
                                  var i = 1 - ((1 - t * t) / (2 * t)) * Math.log((1 - t) / (1 + t));
                                  if (Math.abs(Math.abs(e) - i) < 1e-6) return e < 0 ? -1 * s : s;
                                  for (var r, n, a, o, h = Math.asin(0.5 * e), u = 0; u < 30; u++)
                                      if (((n = Math.sin(h)), (a = Math.cos(h)), (o = t * n), (h += r = (Math.pow(1 - o * o, 2) / (2 * a)) * (e / (1 - t * t) - n / (1 - o * o) + (0.5 / t) * Math.log((1 - o) / (1 + o)))), Math.abs(r) <= 1e-10)) return h;
                                  return NaN;
                              })(this.e, (2 * t.y * this.k0) / this.a)),
                              (e = N(this.long0 + t.x / (this.a * this.k0)))),
                        (t.x = e),
                        (t.y = i),
                        t
                    );
                },
                names: ["cea"],
            };
            var fe = {
                init: function () {
                    (this.x0 = this.x0 || 0), (this.y0 = this.y0 || 0), (this.lat0 = this.lat0 || 0), (this.long0 = this.long0 || 0), (this.lat_ts = this.lat_ts || 0), (this.title = this.title || "Equidistant Cylindrical (Plate Carre)"), (this.rc = Math.cos(this.lat_ts));
                },
                forward: function (t) {
                    var e = t.x,
                        i = t.y,
                        r = N(e - this.long0),
                        s = re(i - this.lat0);
                    return (t.x = this.x0 + this.a * r * this.rc), (t.y = this.y0 + this.a * s), t;
                },
                inverse: function (t) {
                    var e = t.x,
                        i = t.y;
                    return (t.x = N(this.long0 + (e - this.x0) / (this.a * this.rc))), (t.y = re(this.lat0 + (i - this.y0) / this.a)), t;
                },
                names: ["Equirectangular", "Equidistant_Cylindrical", "eqc"],
            };
            var de = {
                init: function () {
                    (this.temp = this.b / this.a), (this.es = 1 - Math.pow(this.temp, 2)), (this.e = Math.sqrt(this.es)), (this.e0 = Vt(this.es)), (this.e1 = $t(this.es)), (this.e2 = te(this.es)), (this.e3 = ee(this.es)), (this.ml0 = this.a * Qt(this.e0, this.e1, this.e2, this.e3, this.lat0));
                },
                forward: function (t) {
                    var e,
                        i,
                        r,
                        s = t.x,
                        n = t.y,
                        a = N(s - this.long0);
                    if (((r = a * Math.sin(n)), this.sphere)) Math.abs(n) <= 1e-10 ? ((e = this.a * a), (i = -1 * this.a * this.lat0)) : ((e = (this.a * Math.sin(r)) / Math.tan(n)), (i = this.a * (re(n - this.lat0) + (1 - Math.cos(r)) / Math.tan(n))));
                    else if (Math.abs(n) <= 1e-10) (e = this.a * a), (i = -1 * this.ml0);
                    else {
                        var o = ie(this.a, this.e, Math.sin(n)) / Math.tan(n);
                        (e = o * Math.sin(r)), (i = this.a * Qt(this.e0, this.e1, this.e2, this.e3, n) - this.ml0 + o * (1 - Math.cos(r)));
                    }
                    return (t.x = e + this.x0), (t.y = i + this.y0), t;
                },
                inverse: function (t) {
                    var e, i, r, s, n, a, o, h, u;
                    if (((r = t.x - this.x0), (s = t.y - this.y0), this.sphere))
                        if (Math.abs(s + this.a * this.lat0) <= 1e-10) (e = N(r / this.a + this.long0)), (i = 0);
                        else {
                            var l;
                            for (a = this.lat0 + s / this.a, o = (r * r) / this.a / this.a + a * a, h = a, n = 20; n; --n)
                                if (((h += u = (-1 * (a * (h * (l = Math.tan(h)) + 1) - h - 0.5 * (h * h + o) * l)) / ((h - a) / l - 1)), Math.abs(u) <= 1e-10)) {
                                    i = h;
                                    break;
                                }
                            e = N(this.long0 + Math.asin((r * Math.tan(h)) / this.a) / Math.sin(i));
                        }
                    else if (Math.abs(s + this.ml0) <= 1e-10) (i = 0), (e = N(this.long0 + r / this.a));
                    else {
                        var c, f, d, p, m;
                        for (a = (this.ml0 + s) / this.a, o = (r * r) / this.a / this.a + a * a, h = a, n = 20; n; --n)
                            if (
                                ((m = this.e * Math.sin(h)),
                                (c = Math.sqrt(1 - m * m) * Math.tan(h)),
                                (f = this.a * Qt(this.e0, this.e1, this.e2, this.e3, h)),
                                (d = this.e0 - 2 * this.e1 * Math.cos(2 * h) + 4 * this.e2 * Math.cos(4 * h) - 6 * this.e3 * Math.cos(6 * h)),
                                (h -= u = (a * (c * (p = f / this.a) + 1) - p - 0.5 * c * (p * p + o)) / ((this.es * Math.sin(2 * h) * (p * p + o - 2 * a * p)) / (4 * c) + (a - p) * (c * d - 2 / Math.sin(2 * h)) - d)),
                                Math.abs(u) <= 1e-10)
                            ) {
                                i = h;
                                break;
                            }
                        (c = Math.sqrt(1 - this.es * Math.pow(Math.sin(i), 2)) * Math.tan(i)), (e = N(this.long0 + Math.asin((r * c) / this.a) / Math.sin(i)));
                    }
                    return (t.x = e), (t.y = i), t;
                },
                names: ["Polyconic", "poly"],
            };
            var pe = {
                init: function () {
                    (this.A = []),
                        (this.A[1] = 0.6399175073),
                        (this.A[2] = -0.1358797613),
                        (this.A[3] = 0.063294409),
                        (this.A[4] = -0.02526853),
                        (this.A[5] = 0.0117879),
                        (this.A[6] = -0.0055161),
                        (this.A[7] = 0.0026906),
                        (this.A[8] = -0.001333),
                        (this.A[9] = 67e-5),
                        (this.A[10] = -34e-5),
                        (this.B_re = []),
                        (this.B_im = []),
                        (this.B_re[1] = 0.7557853228),
                        (this.B_im[1] = 0),
                        (this.B_re[2] = 0.249204646),
                        (this.B_im[2] = 0.003371507),
                        (this.B_re[3] = -0.001541739),
                        (this.B_im[3] = 0.04105856),
                        (this.B_re[4] = -0.10162907),
                        (this.B_im[4] = 0.01727609),
                        (this.B_re[5] = -0.26623489),
                        (this.B_im[5] = -0.36249218),
                        (this.B_re[6] = -0.6870983),
                        (this.B_im[6] = -1.1651967),
                        (this.C_re = []),
                        (this.C_im = []),
                        (this.C_re[1] = 1.3231270439),
                        (this.C_im[1] = 0),
                        (this.C_re[2] = -0.577245789),
                        (this.C_im[2] = -0.007809598),
                        (this.C_re[3] = 0.508307513),
                        (this.C_im[3] = -0.112208952),
                        (this.C_re[4] = -0.15094762),
                        (this.C_im[4] = 0.18200602),
                        (this.C_re[5] = 1.01418179),
                        (this.C_im[5] = 1.64497696),
                        (this.C_re[6] = 1.9660549),
                        (this.C_im[6] = 2.5127645),
                        (this.D = []),
                        (this.D[1] = 1.5627014243),
                        (this.D[2] = 0.5185406398),
                        (this.D[3] = -0.03333098),
                        (this.D[4] = -0.1052906),
                        (this.D[5] = -0.0368594),
                        (this.D[6] = 0.007317),
                        (this.D[7] = 0.0122),
                        (this.D[8] = 0.00394),
                        (this.D[9] = -0.0013);
                },
                forward: function (t) {
                    var e,
                        i = t.x,
                        s = t.y - this.lat0,
                        n = i - this.long0,
                        a = (s / r) * 1e-5,
                        o = n,
                        h = 1,
                        u = 0;
                    for (e = 1; e <= 10; e++) (h *= a), (u += this.A[e] * h);
                    var l,
                        c = u,
                        f = o,
                        d = 1,
                        p = 0,
                        m = 0,
                        g = 0;
                    for (e = 1; e <= 6; e++) (l = p * c + d * f), (d = d * c - p * f), (p = l), (m = m + this.B_re[e] * d - this.B_im[e] * p), (g = g + this.B_im[e] * d + this.B_re[e] * p);
                    return (t.x = g * this.a + this.x0), (t.y = m * this.a + this.y0), t;
                },
                inverse: function (t) {
                    var e,
                        i,
                        s = t.x,
                        n = t.y,
                        a = s - this.x0,
                        o = (n - this.y0) / this.a,
                        h = a / this.a,
                        u = 1,
                        l = 0,
                        c = 0,
                        f = 0;
                    for (e = 1; e <= 6; e++) (i = l * o + u * h), (u = u * o - l * h), (l = i), (c = c + this.C_re[e] * u - this.C_im[e] * l), (f = f + this.C_im[e] * u + this.C_re[e] * l);
                    for (var d = 0; d < this.iterations; d++) {
                        var p,
                            m = c,
                            g = f,
                            _ = o,
                            y = h;
                        for (e = 2; e <= 6; e++) (p = g * c + m * f), (m = m * c - g * f), (g = p), (_ += (e - 1) * (this.B_re[e] * m - this.B_im[e] * g)), (y += (e - 1) * (this.B_im[e] * m + this.B_re[e] * g));
                        (m = 1), (g = 0);
                        var v = this.B_re[1],
                            b = this.B_im[1];
                        for (e = 2; e <= 6; e++) (p = g * c + m * f), (m = m * c - g * f), (g = p), (v += e * (this.B_re[e] * m - this.B_im[e] * g)), (b += e * (this.B_im[e] * m + this.B_re[e] * g));
                        var w = v * v + b * b;
                        (c = (_ * v + y * b) / w), (f = (y * v - _ * b) / w);
                    }
                    var M = c,
                        x = f,
                        k = 1,
                        S = 0;
                    for (e = 1; e <= 9; e++) (k *= M), (S += this.D[e] * k);
                    var E = this.lat0 + S * r * 1e5,
                        C = this.long0 + x;
                    return (t.x = C), (t.y = E), t;
                },
                names: ["New_Zealand_Map_Grid", "nzmg"],
            };
            var me = {
                init: function () {},
                forward: function (t) {
                    var e = t.x,
                        i = t.y,
                        r = N(e - this.long0),
                        s = this.x0 + this.a * r,
                        n = this.y0 + this.a * Math.log(Math.tan(Math.PI / 4 + i / 2.5)) * 1.25;
                    return (t.x = s), (t.y = n), t;
                },
                inverse: function (t) {
                    (t.x -= this.x0), (t.y -= this.y0);
                    var e = N(this.long0 + t.x / this.a),
                        i = 2.5 * (Math.atan(Math.exp((0.8 * t.y) / this.a)) - Math.PI / 4);
                    return (t.x = e), (t.y = i), t;
                },
                names: ["Miller_Cylindrical", "mill"],
            };
            var ge = {
                init: function () {
                    this.sphere ? ((this.n = 1), (this.m = 0), (this.es = 0), (this.C_y = Math.sqrt((this.m + 1) / this.n)), (this.C_x = this.C_y / (this.m + 1))) : (this.en = zt(this.es));
                },
                forward: function (t) {
                    var e,
                        i,
                        r = t.x,
                        s = t.y;
                    if (((r = N(r - this.long0)), this.sphere)) {
                        if (this.m)
                            for (var n = this.n * Math.sin(s), a = 20; a; --a) {
                                var o = (this.m * s + Math.sin(s) - n) / (this.m + Math.cos(s));
                                if (((s -= o), Math.abs(o) < 1e-10)) break;
                            }
                        else s = 1 !== this.n ? Math.asin(this.n * Math.sin(s)) : s;
                        (e = this.a * this.C_x * r * (this.m + Math.cos(s))), (i = this.a * this.C_y * s);
                    } else {
                        var h = Math.sin(s),
                            u = Math.cos(s);
                        (i = this.a * Pt(s, h, u, this.en)), (e = (this.a * r * u) / Math.sqrt(1 - this.es * h * h));
                    }
                    return (t.x = e), (t.y = i), t;
                },
                inverse: function (t) {
                    var e, i, r, n;
                    return (
                        (t.x -= this.x0),
                        (r = t.x / this.a),
                        (t.y -= this.y0),
                        (e = t.y / this.a),
                        this.sphere
                            ? ((e /= this.C_y), (r /= this.C_x * (this.m + Math.cos(e))), this.m ? (e = he((this.m * e + Math.sin(e)) / this.n)) : 1 !== this.n && (e = he(Math.sin(e) / this.n)), (r = N(r + this.long0)), (e = re(e)))
                            : ((e = Nt(t.y / this.a, this.es, this.en)), (n = Math.abs(e)) < s ? ((n = Math.sin(e)), (i = this.long0 + (t.x * Math.sqrt(1 - this.es * n * n)) / (this.a * Math.cos(e))), (r = N(i))) : n - 1e-10 < s && (r = this.long0)),
                        (t.x = r),
                        (t.y = e),
                        t
                    );
                },
                names: ["Sinusoidal", "sinu"],
            };
            var _e = {
                init: function () {},
                forward: function (t) {
                    for (var e = t.x, i = t.y, r = N(e - this.long0), s = i, n = Math.PI * Math.sin(i); ; ) {
                        var a = -(s + Math.sin(s) - n) / (1 + Math.cos(s));
                        if (((s += a), Math.abs(a) < 1e-10)) break;
                    }
                    (s /= 2), Math.PI / 2 - Math.abs(i) < 1e-10 && (r = 0);
                    var o = 0.900316316158 * this.a * r * Math.cos(s) + this.x0,
                        h = 1.4142135623731 * this.a * Math.sin(s) + this.y0;
                    return (t.x = o), (t.y = h), t;
                },
                inverse: function (t) {
                    var e, i;
                    (t.x -= this.x0), (t.y -= this.y0), (i = t.y / (1.4142135623731 * this.a)), Math.abs(i) > 0.999999999999 && (i = 0.999999999999), (e = Math.asin(i));
                    var r = N(this.long0 + t.x / (0.900316316158 * this.a * Math.cos(e)));
                    r < -Math.PI && (r = -Math.PI), r > Math.PI && (r = Math.PI), (i = (2 * e + Math.sin(2 * e)) / Math.PI), Math.abs(i) > 1 && (i = 1);
                    var s = Math.asin(i);
                    return (t.x = r), (t.y = s), t;
                },
                names: ["Mollweide", "moll"],
            };
            var ye = {
                init: function () {
                    Math.abs(this.lat1 + this.lat2) < 1e-10 ||
                        ((this.lat2 = this.lat2 || this.lat1),
                        (this.temp = this.b / this.a),
                        (this.es = 1 - Math.pow(this.temp, 2)),
                        (this.e = Math.sqrt(this.es)),
                        (this.e0 = Vt(this.es)),
                        (this.e1 = $t(this.es)),
                        (this.e2 = te(this.es)),
                        (this.e3 = ee(this.es)),
                        (this.sinphi = Math.sin(this.lat1)),
                        (this.cosphi = Math.cos(this.lat1)),
                        (this.ms1 = z(this.e, this.sinphi, this.cosphi)),
                        (this.ml1 = Qt(this.e0, this.e1, this.e2, this.e3, this.lat1)),
                        Math.abs(this.lat1 - this.lat2) < 1e-10
                            ? (this.ns = this.sinphi)
                            : ((this.sinphi = Math.sin(this.lat2)), (this.cosphi = Math.cos(this.lat2)), (this.ms2 = z(this.e, this.sinphi, this.cosphi)), (this.ml2 = Qt(this.e0, this.e1, this.e2, this.e3, this.lat2)), (this.ns = (this.ms1 - this.ms2) / (this.ml2 - this.ml1))),
                        (this.g = this.ml1 + this.ms1 / this.ns),
                        (this.ml0 = Qt(this.e0, this.e1, this.e2, this.e3, this.lat0)),
                        (this.rh = this.a * (this.g - this.ml0)));
                },
                forward: function (t) {
                    var e,
                        i = t.x,
                        r = t.y;
                    if (this.sphere) e = this.a * (this.g - r);
                    else {
                        var s = Qt(this.e0, this.e1, this.e2, this.e3, r);
                        e = this.a * (this.g - s);
                    }
                    var n = this.ns * N(i - this.long0),
                        a = this.x0 + e * Math.sin(n),
                        o = this.y0 + this.rh - e * Math.cos(n);
                    return (t.x = a), (t.y = o), t;
                },
                inverse: function (t) {
                    var e, i, r, s;
                    (t.x -= this.x0), (t.y = this.rh - t.y + this.y0), this.ns >= 0 ? ((i = Math.sqrt(t.x * t.x + t.y * t.y)), (e = 1)) : ((i = -Math.sqrt(t.x * t.x + t.y * t.y)), (e = -1));
                    var n = 0;
                    if ((0 !== i && (n = Math.atan2(e * t.x, e * t.y)), this.sphere)) return (s = N(this.long0 + n / this.ns)), (r = re(this.g - i / this.a)), (t.x = s), (t.y = r), t;
                    var a = this.g - i / this.a;
                    return (r = se(a, this.e0, this.e1, this.e2, this.e3)), (s = N(this.long0 + n / this.ns)), (t.x = s), (t.y = r), t;
                },
                names: ["Equidistant_Conic", "eqdc"],
            };
            var ve = {
                init: function () {
                    this.R = this.a;
                },
                forward: function (t) {
                    var e,
                        i,
                        r = t.x,
                        n = t.y,
                        a = N(r - this.long0);
                    Math.abs(n) <= 1e-10 && ((e = this.x0 + this.R * a), (i = this.y0));
                    var o = he(2 * Math.abs(n / Math.PI));
                    (Math.abs(a) <= 1e-10 || Math.abs(Math.abs(n) - s) <= 1e-10) && ((e = this.x0), (i = n >= 0 ? this.y0 + Math.PI * this.R * Math.tan(0.5 * o) : this.y0 + Math.PI * this.R * -Math.tan(0.5 * o)));
                    var h = 0.5 * Math.abs(Math.PI / a - a / Math.PI),
                        u = h * h,
                        l = Math.sin(o),
                        c = Math.cos(o),
                        f = c / (l + c - 1),
                        d = f * f,
                        p = f * (2 / l - 1),
                        m = p * p,
                        g = (Math.PI * this.R * (h * (f - m) + Math.sqrt(u * (f - m) * (f - m) - (m + u) * (d - m)))) / (m + u);
                    a < 0 && (g = -g), (e = this.x0 + g);
                    var _ = u + f;
                    return (g = (Math.PI * this.R * (p * _ - h * Math.sqrt((m + u) * (u + 1) - _ * _))) / (m + u)), (i = n >= 0 ? this.y0 + g : this.y0 - g), (t.x = e), (t.y = i), t;
                },
                inverse: function (t) {
                    var e, i, r, s, n, a, o, h, u, l, c, f;
                    return (
                        (t.x -= this.x0),
                        (t.y -= this.y0),
                        (c = Math.PI * this.R),
                        (n = (r = t.x / c) * r + (s = t.y / c) * s),
                        (c = (3 * ((s * s) / (h = -2 * (a = -Math.abs(s) * (1 + n)) + 1 + 2 * s * s + n * n) + ((2 * (o = a - 2 * s * s + r * r) * o * o) / h / h / h - (9 * a * o) / h / h) / 27)) / (u = (a - (o * o) / 3 / h) / h) / (l = 2 * Math.sqrt(-u / 3))),
                        Math.abs(c) > 1 && (c = c >= 0 ? 1 : -1),
                        (f = Math.acos(c) / 3),
                        (i = t.y >= 0 ? (-l * Math.cos(f + Math.PI / 3) - o / 3 / h) * Math.PI : -(-l * Math.cos(f + Math.PI / 3) - o / 3 / h) * Math.PI),
                        (e = Math.abs(r) < 1e-10 ? this.long0 : N(this.long0 + (Math.PI * (n - 1 + Math.sqrt(1 + 2 * (r * r - s * s) + n * n))) / 2 / r)),
                        (t.x = e),
                        (t.y = i),
                        t
                    );
                },
                names: ["Van_der_Grinten_I", "VanDerGrinten", "vandg"],
            };
            var be = {
                init: function () {
                    (this.sin_p12 = Math.sin(this.lat0)), (this.cos_p12 = Math.cos(this.lat0));
                },
                forward: function (t) {
                    var e,
                        i,
                        r,
                        n,
                        a,
                        o,
                        h,
                        u,
                        l,
                        c,
                        f,
                        d,
                        p,
                        m,
                        g,
                        _,
                        y,
                        v,
                        b,
                        w,
                        M,
                        x,
                        k = t.x,
                        S = t.y,
                        E = Math.sin(t.y),
                        C = Math.cos(t.y),
                        A = N(k - this.long0);
                    return this.sphere
                        ? Math.abs(this.sin_p12 - 1) <= 1e-10
                            ? ((t.x = this.x0 + this.a * (s - S) * Math.sin(A)), (t.y = this.y0 - this.a * (s - S) * Math.cos(A)), t)
                            : Math.abs(this.sin_p12 + 1) <= 1e-10
                            ? ((t.x = this.x0 + this.a * (s + S) * Math.sin(A)), (t.y = this.y0 + this.a * (s + S) * Math.cos(A)), t)
                            : ((v = this.sin_p12 * E + this.cos_p12 * C * Math.cos(A)), (y = (_ = Math.acos(v)) ? _ / Math.sin(_) : 1), (t.x = this.x0 + this.a * y * C * Math.sin(A)), (t.y = this.y0 + this.a * y * (this.cos_p12 * E - this.sin_p12 * C * Math.cos(A))), t)
                        : ((e = Vt(this.es)),
                          (i = $t(this.es)),
                          (r = te(this.es)),
                          (n = ee(this.es)),
                          Math.abs(this.sin_p12 - 1) <= 1e-10
                              ? ((a = this.a * Qt(e, i, r, n, s)), (o = this.a * Qt(e, i, r, n, S)), (t.x = this.x0 + (a - o) * Math.sin(A)), (t.y = this.y0 - (a - o) * Math.cos(A)), t)
                              : Math.abs(this.sin_p12 + 1) <= 1e-10
                              ? ((a = this.a * Qt(e, i, r, n, s)), (o = this.a * Qt(e, i, r, n, S)), (t.x = this.x0 + (a + o) * Math.sin(A)), (t.y = this.y0 + (a + o) * Math.cos(A)), t)
                              : ((h = E / C),
                                (u = ie(this.a, this.e, this.sin_p12)),
                                (l = ie(this.a, this.e, E)),
                                (c = Math.atan((1 - this.es) * h + (this.es * u * this.sin_p12) / (l * C))),
                                (b =
                                    0 === (f = Math.atan2(Math.sin(A), this.cos_p12 * Math.tan(c) - this.sin_p12 * Math.cos(A)))
                                        ? Math.asin(this.cos_p12 * Math.sin(c) - this.sin_p12 * Math.cos(c))
                                        : Math.abs(Math.abs(f) - Math.PI) <= 1e-10
                                        ? -Math.asin(this.cos_p12 * Math.sin(c) - this.sin_p12 * Math.cos(c))
                                        : Math.asin((Math.sin(A) * Math.cos(c)) / Math.sin(f))),
                                (d = (this.e * this.sin_p12) / Math.sqrt(1 - this.es)),
                                (_ = u * b * (1 - ((w = b * b) * (g = (p = (this.e * this.cos_p12 * Math.cos(f)) / Math.sqrt(1 - this.es)) * p) * (1 - g)) / 6 + ((M = w * b) / 8) * (m = d * p) * (1 - 2 * g) + ((x = M * b) / 120) * (g * (4 - 7 * g) - 3 * d * d * (1 - 7 * g)) - ((x * b) / 48) * m)),
                                (t.x = this.x0 + _ * Math.sin(f)),
                                (t.y = this.y0 + _ * Math.cos(f)),
                                t));
                },
                inverse: function (t) {
                    var e, i, r, n, a, o, h, u, l, c, f, d, p, m, g, _, y, v, b, w, M, x, k;
                    if (((t.x -= this.x0), (t.y -= this.y0), this.sphere)) {
                        if ((e = Math.sqrt(t.x * t.x + t.y * t.y)) > 2 * s * this.a) return;
                        return (
                            (i = e / this.a),
                            (r = Math.sin(i)),
                            (n = Math.cos(i)),
                            (a = this.long0),
                            Math.abs(e) <= 1e-10
                                ? (o = this.lat0)
                                : ((o = he(n * this.sin_p12 + (t.y * r * this.cos_p12) / e)),
                                  (h = Math.abs(this.lat0) - s),
                                  (a = Math.abs(h) <= 1e-10 ? (this.lat0 >= 0 ? N(this.long0 + Math.atan2(t.x, -t.y)) : N(this.long0 - Math.atan2(-t.x, t.y))) : N(this.long0 + Math.atan2(t.x * r, e * this.cos_p12 * n - t.y * this.sin_p12 * r)))),
                            (t.x = a),
                            (t.y = o),
                            t
                        );
                    }
                    return (
                        (u = Vt(this.es)),
                        (l = $t(this.es)),
                        (c = te(this.es)),
                        (f = ee(this.es)),
                        Math.abs(this.sin_p12 - 1) <= 1e-10
                            ? ((d = this.a * Qt(u, l, c, f, s)), (e = Math.sqrt(t.x * t.x + t.y * t.y)), (o = se((d - e) / this.a, u, l, c, f)), (a = N(this.long0 + Math.atan2(t.x, -1 * t.y))), (t.x = a), (t.y = o), t)
                            : Math.abs(this.sin_p12 + 1) <= 1e-10
                            ? ((d = this.a * Qt(u, l, c, f, s)), (e = Math.sqrt(t.x * t.x + t.y * t.y)), (o = se((e - d) / this.a, u, l, c, f)), (a = N(this.long0 + Math.atan2(t.x, t.y))), (t.x = a), (t.y = o), t)
                            : ((e = Math.sqrt(t.x * t.x + t.y * t.y)),
                              (g = Math.atan2(t.x, t.y)),
                              (p = ie(this.a, this.e, this.sin_p12)),
                              (_ = Math.cos(g)),
                              (v = (-(y = this.e * this.cos_p12 * _) * y) / (1 - this.es)),
                              (b = (3 * this.es * (1 - v) * this.sin_p12 * this.cos_p12 * _) / (1 - this.es)),
                              (x = 1 - (v * (M = (w = e / p) - (v * (1 + v) * Math.pow(w, 3)) / 6 - (b * (1 + 3 * v) * Math.pow(w, 4)) / 24) * M) / 2 - (w * M * M * M) / 6),
                              (m = Math.asin(this.sin_p12 * Math.cos(M) + this.cos_p12 * Math.sin(M) * _)),
                              (a = N(this.long0 + Math.asin((Math.sin(g) * Math.sin(M)) / Math.cos(m)))),
                              (k = Math.sin(m)),
                              (o = Math.atan2((k - this.es * x * this.sin_p12) * Math.tan(m), k * (1 - this.es))),
                              (t.x = a),
                              (t.y = o),
                              t)
                    );
                },
                names: ["Azimuthal_Equidistant", "aeqd"],
            };
            var we = {
                    init: function () {
                        (this.sin_p14 = Math.sin(this.lat0)), (this.cos_p14 = Math.cos(this.lat0));
                    },
                    forward: function (t) {
                        var e,
                            i,
                            r,
                            s,
                            n,
                            a,
                            o,
                            h = t.x,
                            u = t.y;
                        return (
                            (r = N(h - this.long0)),
                            (e = Math.sin(u)),
                            (i = Math.cos(u)),
                            (s = Math.cos(r)),
                            1,
                            ((n = this.sin_p14 * e + this.cos_p14 * i * s) > 0 || Math.abs(n) <= 1e-10) && ((a = 1 * this.a * i * Math.sin(r)), (o = this.y0 + 1 * this.a * (this.cos_p14 * e - this.sin_p14 * i * s))),
                            (t.x = a),
                            (t.y = o),
                            t
                        );
                    },
                    inverse: function (t) {
                        var e, i, r, n, a, o, h;
                        return (
                            (t.x -= this.x0),
                            (t.y -= this.y0),
                            (e = Math.sqrt(t.x * t.x + t.y * t.y)),
                            (i = he(e / this.a)),
                            (r = Math.sin(i)),
                            (n = Math.cos(i)),
                            (o = this.long0),
                            Math.abs(e) <= 1e-10
                                ? ((h = this.lat0), (t.x = o), (t.y = h), t)
                                : ((h = he(n * this.sin_p14 + (t.y * r * this.cos_p14) / e)),
                                  (a = Math.abs(this.lat0) - s),
                                  Math.abs(a) <= 1e-10
                                      ? ((o = this.lat0 >= 0 ? N(this.long0 + Math.atan2(t.x, -t.y)) : N(this.long0 - Math.atan2(-t.x, t.y))), (t.x = o), (t.y = h), t)
                                      : ((o = N(this.long0 + Math.atan2(t.x * r, e * this.cos_p14 * n - t.y * this.sin_p14 * r))), (t.x = o), (t.y = h), t))
                        );
                    },
                    names: ["ortho"],
                },
                Me = 1,
                xe = 2,
                ke = 3,
                Se = 4,
                Ee = 5,
                Ce = 6,
                Ae = 1,
                Ie = 2,
                Oe = 3,
                Te = 4;
            function ze(t, e, i, r) {
                var n;
                return t < 1e-10 ? ((r.value = Ae), (n = 0)) : ((n = Math.atan2(e, i)), Math.abs(n) <= o ? (r.value = Ae) : n > o && n <= s + o ? ((r.value = Ie), (n -= s)) : n > s + o || n <= -(s + o) ? ((r.value = Oe), (n = n >= 0 ? n - u : n + u)) : ((r.value = Te), (n += s))), n;
            }
            function Pe(t, e) {
                var i = t + e;
                return i < -u ? (i += h) : i > +u && (i -= h), i;
            }
            var Ne = {
                    init: function () {
                        (this.x0 = this.x0 || 0),
                            (this.y0 = this.y0 || 0),
                            (this.lat0 = this.lat0 || 0),
                            (this.long0 = this.long0 || 0),
                            (this.lat_ts = this.lat_ts || 0),
                            (this.title = this.title || "Quadrilateralized Spherical Cube"),
                            this.lat0 >= s - o / 2 ? (this.face = Ee) : this.lat0 <= -(s - o / 2) ? (this.face = Ce) : Math.abs(this.long0) <= o ? (this.face = Me) : Math.abs(this.long0) <= s + o ? (this.face = this.long0 > 0 ? xe : Se) : (this.face = ke),
                            0 !== this.es && ((this.one_minus_f = 1 - (this.a - this.b) / this.a), (this.one_minus_f_squared = this.one_minus_f * this.one_minus_f));
                    },
                    forward: function (t) {
                        var e,
                            i,
                            r,
                            n,
                            a,
                            h,
                            l = { x: 0, y: 0 },
                            c = { value: 0 };
                        if (((t.x -= this.long0), (e = 0 !== this.es ? Math.atan(this.one_minus_f_squared * Math.tan(t.y)) : t.y), (i = t.x), this.face === Ee))
                            (n = s - e), i >= o && i <= s + o ? ((c.value = Ae), (r = i - s)) : i > s + o || i <= -(s + o) ? ((c.value = Ie), (r = i > 0 ? i - u : i + u)) : i > -(s + o) && i <= -o ? ((c.value = Oe), (r = i + s)) : ((c.value = Te), (r = i));
                        else if (this.face === Ce) (n = s + e), i >= o && i <= s + o ? ((c.value = Ae), (r = -i + s)) : i < o && i >= -o ? ((c.value = Ie), (r = -i)) : i < -o && i >= -(s + o) ? ((c.value = Oe), (r = -i - s)) : ((c.value = Te), (r = i > 0 ? -i + u : -i - u));
                        else {
                            var f, d, p, m, g, _;
                            this.face === xe ? (i = Pe(i, +s)) : this.face === ke ? (i = Pe(i, +u)) : this.face === Se && (i = Pe(i, -s)),
                                (m = Math.sin(e)),
                                (g = Math.cos(e)),
                                (_ = Math.sin(i)),
                                (f = g * Math.cos(i)),
                                (d = g * _),
                                (p = m),
                                this.face === Me
                                    ? (r = ze((n = Math.acos(f)), p, d, c))
                                    : this.face === xe
                                    ? (r = ze((n = Math.acos(d)), p, -f, c))
                                    : this.face === ke
                                    ? (r = ze((n = Math.acos(-f)), p, -d, c))
                                    : this.face === Se
                                    ? (r = ze((n = Math.acos(-d)), p, f, c))
                                    : ((n = r = 0), (c.value = Ae));
                        }
                        return (
                            (h = Math.atan((12 / u) * (r + Math.acos(Math.sin(r) * Math.cos(o)) - s))),
                            (a = Math.sqrt((1 - Math.cos(n)) / (Math.cos(h) * Math.cos(h)) / (1 - Math.cos(Math.atan(1 / Math.cos(r)))))),
                            c.value === Ie ? (h += s) : c.value === Oe ? (h += u) : c.value === Te && (h += 1.5 * u),
                            (l.x = a * Math.cos(h)),
                            (l.y = a * Math.sin(h)),
                            (l.x = l.x * this.a + this.x0),
                            (l.y = l.y * this.a + this.y0),
                            (t.x = l.x),
                            (t.y = l.y),
                            t
                        );
                    },
                    inverse: function (t) {
                        var e,
                            i,
                            r,
                            n,
                            a,
                            o,
                            h,
                            l,
                            c,
                            f,
                            d,
                            p,
                            m = { lam: 0, phi: 0 },
                            g = { value: 0 };
                        if (
                            ((t.x = (t.x - this.x0) / this.a),
                            (t.y = (t.y - this.y0) / this.a),
                            (i = Math.atan(Math.sqrt(t.x * t.x + t.y * t.y))),
                            (e = Math.atan2(t.y, t.x)),
                            t.x >= 0 && t.x >= Math.abs(t.y) ? (g.value = Ae) : t.y >= 0 && t.y >= Math.abs(t.x) ? ((g.value = Ie), (e -= s)) : t.x < 0 && -t.x >= Math.abs(t.y) ? ((g.value = Oe), (e = e < 0 ? e + u : e - u)) : ((g.value = Te), (e += s)),
                            (c = (u / 12) * Math.tan(e)),
                            (a = Math.sin(c) / (Math.cos(c) - 1 / Math.sqrt(2))),
                            (o = Math.atan(a)),
                            (h = 1 - (r = Math.cos(e)) * r * (n = Math.tan(i)) * n * (1 - Math.cos(Math.atan(1 / Math.cos(o))))) < -1 ? (h = -1) : h > 1 && (h = 1),
                            this.face === Ee)
                        )
                            (l = Math.acos(h)), (m.phi = s - l), g.value === Ae ? (m.lam = o + s) : g.value === Ie ? (m.lam = o < 0 ? o + u : o - u) : g.value === Oe ? (m.lam = o - s) : (m.lam = o);
                        else if (this.face === Ce) (l = Math.acos(h)), (m.phi = l - s), g.value === Ae ? (m.lam = -o + s) : g.value === Ie ? (m.lam = -o) : g.value === Oe ? (m.lam = -o - s) : (m.lam = o < 0 ? -o - u : -o + u);
                        else {
                            var _, y, v;
                            (c = (_ = h) * _),
                                (y = (c += (v = c >= 1 ? 0 : Math.sqrt(1 - c) * Math.sin(o)) * v) >= 1 ? 0 : Math.sqrt(1 - c)),
                                g.value === Ie ? ((c = y), (y = -v), (v = c)) : g.value === Oe ? ((y = -y), (v = -v)) : g.value === Te && ((c = y), (y = v), (v = -c)),
                                this.face === xe ? ((c = _), (_ = -y), (y = c)) : this.face === ke ? ((_ = -_), (y = -y)) : this.face === Se && ((c = _), (_ = y), (y = -c)),
                                (m.phi = Math.acos(-v) - s),
                                (m.lam = Math.atan2(y, _)),
                                this.face === xe ? (m.lam = Pe(m.lam, -s)) : this.face === ke ? (m.lam = Pe(m.lam, -u)) : this.face === Se && (m.lam = Pe(m.lam, +s));
                        }
                        return (
                            0 !== this.es && ((f = m.phi < 0 ? 1 : 0), (d = Math.tan(m.phi)), (p = this.b / Math.sqrt(d * d + this.one_minus_f_squared)), (m.phi = Math.atan(Math.sqrt(this.a * this.a - p * p) / (this.one_minus_f * p))), f && (m.phi = -m.phi)),
                            (m.lam += this.long0),
                            (t.x = m.lam),
                            (t.y = m.phi),
                            t
                        );
                    },
                    names: ["Quadrilateralized Spherical Cube", "Quadrilateralized_Spherical_Cube", "qsc"],
                },
                Le = [
                    [1, 22199e-21, -715515e-10, 31103e-10],
                    [0.9986, -482243e-9, -24897e-9, -13309e-10],
                    [0.9954, -83103e-8, -448605e-10, -9.86701e-7],
                    [0.99, -0.00135364, -59661e-9, 36777e-10],
                    [0.9822, -0.00167442, -449547e-11, -572411e-11],
                    [0.973, -0.00214868, -903571e-10, 1.8736e-8],
                    [0.96, -0.00305085, -900761e-10, 164917e-11],
                    [0.9427, -0.00382792, -653386e-10, -26154e-10],
                    [0.9216, -0.00467746, -10457e-8, 481243e-11],
                    [0.8962, -0.00536223, -323831e-10, -543432e-11],
                    [0.8679, -0.00609363, -113898e-9, 332484e-11],
                    [0.835, -0.00698325, -640253e-10, 9.34959e-7],
                    [0.7986, -0.00755338, -500009e-10, 9.35324e-7],
                    [0.7597, -0.00798324, -35971e-9, -227626e-11],
                    [0.7186, -0.00851367, -701149e-10, -86303e-10],
                    [0.6732, -0.00986209, -199569e-9, 191974e-10],
                    [0.6213, -0.010418, 883923e-10, 624051e-11],
                    [0.5722, -0.00906601, 182e-6, 624051e-11],
                    [0.5322, -0.00677797, 275608e-9, 624051e-11],
                ],
                Re = [
                    [-520417e-23, 0.0124, 121431e-23, -845284e-16],
                    [0.062, 0.0124, -1.26793e-9, 4.22642e-10],
                    [0.124, 0.0124, 5.07171e-9, -1.60604e-9],
                    [0.186, 0.0123999, -1.90189e-8, 6.00152e-9],
                    [0.248, 0.0124002, 7.10039e-8, -2.24e-8],
                    [0.31, 0.0123992, -2.64997e-7, 8.35986e-8],
                    [0.372, 0.0124029, 9.88983e-7, -3.11994e-7],
                    [0.434, 0.0123893, -369093e-11, -4.35621e-7],
                    [0.4958, 0.0123198, -102252e-10, -3.45523e-7],
                    [0.5571, 0.0121916, -154081e-10, -5.82288e-7],
                    [0.6176, 0.0119938, -241424e-10, -5.25327e-7],
                    [0.6769, 0.011713, -320223e-10, -5.16405e-7],
                    [0.7346, 0.0113541, -397684e-10, -6.09052e-7],
                    [0.7903, 0.0109107, -489042e-10, -104739e-11],
                    [0.8435, 0.0103431, -64615e-9, -1.40374e-9],
                    [0.8936, 0.00969686, -64636e-9, -8547e-9],
                    [0.9394, 0.00840947, -192841e-9, -42106e-10],
                    [0.9761, 0.00616527, -256e-6, -42106e-10],
                    [1, 0.00328947, -319159e-9, -42106e-10],
                ],
                Be = a / 5,
                De = function (t, e) {
                    return t[0] + e * (t[1] + e * (t[2] + e * t[3]));
                };
            var je = {
                init: function () {
                    (this.x0 = this.x0 || 0), (this.y0 = this.y0 || 0), (this.long0 = this.long0 || 0), (this.es = 0), (this.title = this.title || "Robinson");
                },
                forward: function (t) {
                    var e = N(t.x - this.long0),
                        i = Math.abs(t.y),
                        r = Math.floor(i * Be);
                    r < 0 ? (r = 0) : r >= 18 && (r = 17);
                    var s = { x: De(Le[r], (i = a * (i - 0.08726646259971647 * r))) * e, y: De(Re[r], i) };
                    return t.y < 0 && (s.y = -s.y), (s.x = s.x * this.a * 0.8487 + this.x0), (s.y = s.y * this.a * 1.3523 + this.y0), s;
                },
                inverse: function (t) {
                    var e = { x: (t.x - this.x0) / (0.8487 * this.a), y: Math.abs(t.y - this.y0) / (1.3523 * this.a) };
                    if (e.y >= 1) (e.x /= Le[18][0]), (e.y = t.y < 0 ? -s : s);
                    else {
                        var i = Math.floor(18 * e.y);
                        for (i < 0 ? (i = 0) : i >= 18 && (i = 17); ; )
                            if (Re[i][0] > e.y) --i;
                            else {
                                if (!(Re[i + 1][0] <= e.y)) break;
                                ++i;
                            }
                        var r = Re[i],
                            a = (5 * (e.y - r[0])) / (Re[i + 1][0] - r[0]);
                        (a = (function (t, e, i, r) {
                            for (var s = e; r; --r) {
                                var n = t(s);
                                if (((s -= n), Math.abs(n) < i)) break;
                            }
                            return s;
                        })(
                            function (t) {
                                return (
                                    (De(r, t) - e.y) /
                                    (function (t, e) {
                                        return t[1] + e * (2 * t[2] + 3 * e * t[3]);
                                    })(r, t)
                                );
                            },
                            a,
                            1e-10,
                            100
                        )),
                            (e.x /= De(Le[i], a)),
                            (e.y = (5 * i + a) * n),
                            t.y < 0 && (e.y = -e.y);
                    }
                    return (e.x = N(e.x + this.long0)), e;
                },
                names: ["Robinson", "robin"],
            };
            var Ue = {
                    init: function () {
                        this.name = "geocent";
                    },
                    forward: function (t) {
                        return it(t, this.es, this.a);
                    },
                    inverse: function (t) {
                        return rt(t, this.es, this.a, this.b);
                    },
                    names: ["Geocentric", "geocentric", "geocent", "Geocent"],
                },
                Fe = 0,
                qe = 1,
                Ge = 2,
                We = 3,
                Ze = { h: { def: 1e5, num: !0 }, azi: { def: 0, num: !0, degrees: !0 }, tilt: { def: 0, num: !0, degrees: !0 }, long0: { def: 0, num: !0 }, lat0: { def: 0, num: !0 } };
            var He = {
                init: function () {
                    if (
                        (Object.keys(Ze).forEach(
                            function (t) {
                                if (void 0 === this[t]) this[t] = Ze[t].def;
                                else {
                                    if (Ze[t].num && isNaN(this[t])) throw new Error("Invalid parameter value, must be numeric " + t + " = " + this[t]);
                                    Ze[t].num && (this[t] = parseFloat(this[t]));
                                }
                                Ze[t].degrees && (this[t] = this[t] * n);
                            }.bind(this)
                        ),
                        Math.abs(Math.abs(this.lat0) - s) < 1e-10 ? (this.mode = this.lat0 < 0 ? qe : Fe) : Math.abs(this.lat0) < 1e-10 ? (this.mode = Ge) : ((this.mode = We), (this.sinph0 = Math.sin(this.lat0)), (this.cosph0 = Math.cos(this.lat0))),
                        (this.pn1 = this.h / this.a),
                        this.pn1 <= 0 || this.pn1 > 1e10)
                    )
                        throw new Error("Invalid height");
                    (this.p = 1 + this.pn1), (this.rp = 1 / this.p), (this.h1 = 1 / this.pn1), (this.pfact = (this.p + 1) * this.h1), (this.es = 0);
                    var t = this.tilt,
                        e = this.azi;
                    (this.cg = Math.cos(e)), (this.sg = Math.sin(e)), (this.cw = Math.cos(t)), (this.sw = Math.sin(t));
                },
                forward: function (t) {
                    t.x -= this.long0;
                    var e,
                        i,
                        r,
                        s,
                        n = Math.sin(t.y),
                        a = Math.cos(t.y),
                        o = Math.cos(t.x);
                    switch (this.mode) {
                        case We:
                            i = this.sinph0 * n + this.cosph0 * a * o;
                            break;
                        case Ge:
                            i = a * o;
                            break;
                        case qe:
                            i = -n;
                            break;
                        case Fe:
                            i = n;
                    }
                    switch (((e = (i = this.pn1 / (this.p - i)) * a * Math.sin(t.x)), this.mode)) {
                        case We:
                            i *= this.cosph0 * n - this.sinph0 * a * o;
                            break;
                        case Ge:
                            i *= n;
                            break;
                        case Fe:
                            i *= -a * o;
                            break;
                        case qe:
                            i *= a * o;
                    }
                    return (s = 1 / ((r = i * this.cg + e * this.sg) * this.sw * this.h1 + this.cw)), (e = (e * this.cg - i * this.sg) * this.cw * s), (i = r * s), (t.x = e * this.a), (t.y = i * this.a), t;
                },
                inverse: function (t) {
                    (t.x /= this.a), (t.y /= this.a);
                    var e,
                        i,
                        r,
                        s = { x: t.x, y: t.y };
                    (r = 1 / (this.pn1 - t.y * this.sw)), (e = this.pn1 * t.x * r), (i = this.pn1 * t.y * this.cw * r), (t.x = e * this.cg + i * this.sg), (t.y = i * this.cg - e * this.sg);
                    var n = Bt(t.x, t.y);
                    if (Math.abs(n) < 1e-10) (s.x = 0), (s.y = t.y);
                    else {
                        var a, o;
                        switch (((o = 1 - n * n * this.pfact), (o = (this.p - Math.sqrt(o)) / (this.pn1 / n + n / this.pn1)), (a = Math.sqrt(1 - o * o)), this.mode)) {
                            case We:
                                (s.y = Math.asin(a * this.sinph0 + (t.y * o * this.cosph0) / n)), (t.y = (a - this.sinph0 * Math.sin(s.y)) * n), (t.x *= o * this.cosph0);
                                break;
                            case Ge:
                                (s.y = Math.asin((t.y * o) / n)), (t.y = a * n), (t.x *= o);
                                break;
                            case Fe:
                                (s.y = Math.asin(a)), (t.y = -t.y);
                                break;
                            case qe:
                                s.y = -Math.asin(a);
                        }
                        s.x = Math.atan2(t.x, t.y);
                    }
                    return (t.x = s.x + this.long0), (t.y = s.y), t;
                },
                names: ["Tilted_Perspective", "tpers"],
            };
            var Ye,
                Xe = {
                    init: function () {
                        if (((this.flip_axis = "x" === this.sweep ? 1 : 0), (this.h = Number(this.h)), (this.radius_g_1 = this.h / this.a), this.radius_g_1 <= 0 || this.radius_g_1 > 1e10)) throw new Error();
                        if (((this.radius_g = 1 + this.radius_g_1), (this.C = this.radius_g * this.radius_g - 1), 0 !== this.es)) {
                            var t = 1 - this.es,
                                e = 1 / t;
                            (this.radius_p = Math.sqrt(t)), (this.radius_p2 = t), (this.radius_p_inv2 = e), (this.shape = "ellipse");
                        } else (this.radius_p = 1), (this.radius_p2 = 1), (this.radius_p_inv2 = 1), (this.shape = "sphere");
                        this.title || (this.title = "Geostationary Satellite View");
                    },
                    forward: function (t) {
                        var e,
                            i,
                            r,
                            s,
                            n = t.x,
                            a = t.y;
                        if (((n -= this.long0), "ellipse" === this.shape)) {
                            a = Math.atan(this.radius_p2 * Math.tan(a));
                            var o = this.radius_p / Bt(this.radius_p * Math.cos(a), Math.sin(a));
                            if (((i = o * Math.cos(n) * Math.cos(a)), (r = o * Math.sin(n) * Math.cos(a)), (s = o * Math.sin(a)), (this.radius_g - i) * i - r * r - s * s * this.radius_p_inv2 < 0)) return (t.x = Number.NaN), (t.y = Number.NaN), t;
                            (e = this.radius_g - i), this.flip_axis ? ((t.x = this.radius_g_1 * Math.atan(r / Bt(s, e))), (t.y = this.radius_g_1 * Math.atan(s / e))) : ((t.x = this.radius_g_1 * Math.atan(r / e)), (t.y = this.radius_g_1 * Math.atan(s / Bt(r, e))));
                        } else
                            "sphere" === this.shape &&
                                ((e = Math.cos(a)),
                                (i = Math.cos(n) * e),
                                (r = Math.sin(n) * e),
                                (s = Math.sin(a)),
                                (e = this.radius_g - i),
                                this.flip_axis ? ((t.x = this.radius_g_1 * Math.atan(r / Bt(s, e))), (t.y = this.radius_g_1 * Math.atan(s / e))) : ((t.x = this.radius_g_1 * Math.atan(r / e)), (t.y = this.radius_g_1 * Math.atan(s / Bt(r, e)))));
                        return (t.x = t.x * this.a), (t.y = t.y * this.a), t;
                    },
                    inverse: function (t) {
                        var e,
                            i,
                            r,
                            s,
                            n = -1,
                            a = 0,
                            o = 0;
                        if (((t.x = t.x / this.a), (t.y = t.y / this.a), "ellipse" === this.shape)) {
                            this.flip_axis ? ((o = Math.tan(t.y / this.radius_g_1)), (a = Math.tan(t.x / this.radius_g_1) * Bt(1, o))) : ((a = Math.tan(t.x / this.radius_g_1)), (o = Math.tan(t.y / this.radius_g_1) * Bt(1, a)));
                            var h = o / this.radius_p;
                            if (((e = a * a + h * h + n * n), (r = (i = 2 * this.radius_g * n) * i - 4 * e * this.C) < 0)) return (t.x = Number.NaN), (t.y = Number.NaN), t;
                            (s = (-i - Math.sqrt(r)) / (2 * e)), (n = this.radius_g + s * n), (a *= s), (o *= s), (t.x = Math.atan2(a, n)), (t.y = Math.atan((o * Math.cos(t.x)) / n)), (t.y = Math.atan(this.radius_p_inv2 * Math.tan(t.y)));
                        } else if ("sphere" === this.shape) {
                            if (
                                (this.flip_axis ? ((o = Math.tan(t.y / this.radius_g_1)), (a = Math.tan(t.x / this.radius_g_1) * Math.sqrt(1 + o * o))) : ((a = Math.tan(t.x / this.radius_g_1)), (o = Math.tan(t.y / this.radius_g_1) * Math.sqrt(1 + a * a))),
                                (e = a * a + o * o + n * n),
                                (r = (i = 2 * this.radius_g * n) * i - 4 * e * this.C) < 0)
                            )
                                return (t.x = Number.NaN), (t.y = Number.NaN), t;
                            (s = (-i - Math.sqrt(r)) / (2 * e)), (n = this.radius_g + s * n), (a *= s), (o *= s), (t.x = Math.atan2(a, n)), (t.y = Math.atan((o * Math.cos(t.x)) / n));
                        }
                        return (t.x = t.x + this.long0), t;
                    },
                    names: ["Geostationary Satellite View", "Geostationary_Satellite", "geos"],
                };
            (gt.defaultDatum = "WGS84"),
                (gt.Proj = et),
                (gt.WGS84 = new gt.Proj("WGS84")),
                (gt.Point = Ot),
                (gt.toPoint = lt),
                (gt.defs = C),
                (gt.nadgrid = function (t, e) {
                    var i = new DataView(e),
                        r = (function (t) {
                            var e = t.getInt32(8, !1);
                            if (11 === e) return !1;
                            11 !== (e = t.getInt32(8, !0)) && console.warn("Failed to detect nadgrid endian-ness, defaulting to little-endian");
                            return !0;
                        })(i),
                        s = (function (t, e) {
                            return {
                                nFields: t.getInt32(8, e),
                                nSubgridFields: t.getInt32(24, e),
                                nSubgrids: t.getInt32(40, e),
                                shiftType: K(t, 56, 64).trim(),
                                fromSemiMajorAxis: t.getFloat64(120, e),
                                fromSemiMinorAxis: t.getFloat64(136, e),
                                toSemiMajorAxis: t.getFloat64(152, e),
                                toSemiMinorAxis: t.getFloat64(168, e),
                            };
                        })(i, r);
                    s.nSubgrids > 1 && console.log("Only single NTv2 subgrids are currently supported, subsequent sub grids are ignored");
                    var n = {
                        header: s,
                        subgrids: (function (t, e, i) {
                            for (var r = [], s = 0; s < e.nSubgrids; s++) {
                                var n = V(t, 176, i),
                                    a = $(t, 176, n, i),
                                    o = Math.round(1 + (n.upperLongitude - n.lowerLongitude) / n.longitudeInterval),
                                    h = Math.round(1 + (n.upperLatitude - n.lowerLatitude) / n.latitudeInterval);
                                r.push({ ll: [J(n.lowerLongitude), J(n.lowerLatitude)], del: [J(n.longitudeInterval), J(n.latitudeInterval)], lim: [o, h], count: n.gridNodeCount, cvs: Q(a) });
                            }
                            return r;
                        })(i, s, r),
                    };
                    return (Y[t] = n), n;
                }),
                (gt.transform = ft),
                (gt.mgrs = vt),
                (gt.version = "__VERSION__"),
                (Ye = gt).Proj.projections.add(Lt),
                Ye.Proj.projections.add(Ft),
                Ye.Proj.projections.add(qt),
                Ye.Proj.projections.add(Zt),
                Ye.Proj.projections.add(Ht),
                Ye.Proj.projections.add(Yt),
                Ye.Proj.projections.add(Xt),
                Ye.Proj.projections.add(Jt),
                Ye.Proj.projections.add(Kt),
                Ye.Proj.projections.add(ne),
                Ye.Proj.projections.add(oe),
                Ye.Proj.projections.add(ue),
                Ye.Proj.projections.add(le),
                Ye.Proj.projections.add(ce),
                Ye.Proj.projections.add(fe),
                Ye.Proj.projections.add(de),
                Ye.Proj.projections.add(pe),
                Ye.Proj.projections.add(me),
                Ye.Proj.projections.add(ge),
                Ye.Proj.projections.add(_e),
                Ye.Proj.projections.add(ye),
                Ye.Proj.projections.add(ve),
                Ye.Proj.projections.add(be),
                Ye.Proj.projections.add(we),
                Ye.Proj.projections.add(Ne),
                Ye.Proj.projections.add(je),
                Ye.Proj.projections.add(Ue),
                Ye.Proj.projections.add(He),
                Ye.Proj.projections.add(Xe);
            e.default = gt;
        },
    ]);
});
