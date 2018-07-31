module.exports = (function(e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var o = t[r] = { i: r, l: !1, exports: {} };
    return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
  }
  return n.m = e, n.c = t, n.d = function(e, t, r) {
    n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
  }, n.r = function(e) {
    'undefined' != typeof Symbol &&
      Symbol.toStringTag &&
      Object.defineProperty(e, Symbol.toStringTag, {
        value: 'Module'
      }), Object.defineProperty(e, '__esModule', { value: !0 });
  }, n.t = function(e, t) {
    if ((1 & t && (e = n(e)), 8 & t)) return e;
    if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
    var r = Object.create(null);
    if (
      (n.r(r), Object.defineProperty(r, 'default', {
        enumerable: !0,
        value: e
      }), 2 & t && 'string' != typeof e)
    )
      for (var o in e)
        n.d(
          r,
          o,
          (function(t) {
            return e[t];
          }).bind(null, o)
        );
    return r;
  }, n.n = function(e) {
    var t = e && e.__esModule ? (function() {
        return e.default;
      }) : (function() {
        return e;
      });
    return n.d(t, 'a', t), t;
  }, n.o = function(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, n.p = '', n(n.s = 'tjUo');
})({
  '0wEy': function(e, t, n) {
    'use strict';
    function r(e) {
      return e && e.__esModule ? e.default : e;
    }
    t.__esModule = !0;
    var o = n('xCC/');
    t.Motion = r(o);
    var i = n('unm8');
    t.StaggeredMotion = r(i);
    var a = n('p9CH');
    t.TransitionMotion = r(a);
    var u = n('tYRH');
    t.spring = r(u);
    var l = n('LQNH');
    t.presets = r(l);
    var s = n('u461');
    t.stripStyle = r(s);
    var c = n('MEvW');
    t.reorderKeys = r(c);
  },
  '16Al': function(e, t, n) {
    'use strict';
    var r = n('WbBG');
    function o() {
    }
    e.exports = function() {
      function e(e, t, n, o, i, a) {
        if (a !== r) {
          var u = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types'
          );
          throw (u.name = 'Invariant Violation', u);
        }
      }
      function t() {
        return e;
      }
      e.isRequired = e;
      var n = {
        array: e,
        bool: e,
        func: e,
        number: e,
        object: e,
        string: e,
        symbol: e,
        any: e,
        arrayOf: t,
        element: e,
        instanceOf: t,
        node: e,
        objectOf: t,
        oneOf: t,
        oneOfType: t,
        shape: t,
        exact: t
      };
      return n.checkPropTypes = o, n.PropTypes = n, n;
    };
  },
  '17x9': function(e, t, n) {
    e.exports = n('16Al')();
  },
  '4BeY': function(e, t, n) {
    (function(t) {
      var n;
      n = function() {
        'use strict';
        var e = function(e) {
          var t = e.id, n = e.viewBox, r = e.content;
          this.id = t, this.viewBox = n, this.content = r;
        };
        e.prototype.stringify = function() {
          return this.content;
        }, e.prototype.toString = function() {
          return this.stringify();
        }, e.prototype.destroy = function() {
          var e = this;
          [ 'id', 'viewBox', 'content' ].forEach(function(t) {
            return delete e[t];
          });
        };
        'undefined' != typeof window
          ? window
          : void 0 !== t || 'undefined' != typeof self && self;
        function n(e, t) {
          return e(t = { exports: {} }, t.exports), t.exports;
        }
        var r = n(function(e, t) {
          e.exports = (function() {
            function e(e) {
              var t = e && 'object' == typeof e;
              return t &&
                '[object RegExp]' !== Object.prototype.toString.call(e) &&
                '[object Date]' !== Object.prototype.toString.call(e);
            }
            function t(t, n) {
              var o, i = n && !0 === n.clone;
              return i && e(t)
                ? r((o = t, Array.isArray(o) ? [] : {}), t, n)
                : t;
            }
            function n(n, o, i) {
              var a = n.slice();
              return o.forEach(function(o, u) {
                void 0 === a[u]
                  ? a[u] = t(o, i)
                  : e(o)
                    ? a[u] = r(n[u], o, i)
                    : -1 === n.indexOf(o) && a.push(t(o, i));
              }), a;
            }
            function r(o, i, a) {
              var u = Array.isArray(i),
                l = a || { arrayMerge: n },
                s = l.arrayMerge || n;
              return u
                ? Array.isArray(o) ? s(o, i, a) : t(i, a)
                : (function(n, o, i) {
                  var a = {};
                  return e(n) && Object.keys(n).forEach(function(e) {
                      a[e] = t(n[e], i);
                    }), Object.keys(o).forEach(function(u) {
                    e(o[u]) && n[u]
                      ? a[u] = r(n[u], o[u], i)
                      : a[u] = t(o[u], i);
                  }), a;
                })(o, i, a);
            }
            return r.all = function(e, t) {
              if (!Array.isArray(e) || e.length < 2)
                throw new Error(
                  'first argument should be an array with at least two elements'
                );
              return e.reduce(function(e, n) {
                return r(e, n, t);
              });
            }, r;
          })();
        }),
          o = n(function(e, t) {
            t.default = {
              svg: { name: 'xmlns', uri: 'http://www.w3.org/2000/svg' },
              xlink: {
                name: 'xmlns:xlink',
                uri: 'http://www.w3.org/1999/xlink'
              }
            }, e.exports = t.default;
          }),
          i = o.svg,
          a = o.xlink,
          u = {};
        u[i.name] = i.uri, u[a.name] = a.uri;
        var l = function(e, t) {
          return void 0 === e && (e = ''), '<svg ' + (function(e) {
              return Object.keys(e).map(function(t) {
                return t + '="' + e[t].toString().replace(/"/g, '&quot;') + '"';
              }).join(' ');
            })(r(u, t || {})) + '>' + e + '</svg>';
        };
        return (function(e) {
          function t() {
            e.apply(this, arguments);
          }
          e &&
            (t.__proto__ = e), t.prototype = Object.create(e && e.prototype), t.prototype.constructor = t;
          var n = { isMounted: {} };
          return n.isMounted.get = function() {
            return !!this.node;
          }, t.createFromExistingNode = function(e) {
            return new t({
              id: e.getAttribute('id'),
              viewBox: e.getAttribute('viewBox'),
              content: e.outerHTML
            });
          }, t.prototype.destroy = function() {
            this.isMounted && this.unmount(), e.prototype.destroy.call(this);
          }, t.prototype.mount = function(e) {
            if (this.isMounted) return this.node;
            var t = 'string' == typeof e ? document.querySelector(e) : e,
              n = this.render();
            return this.node = n, t.appendChild(n), n;
          }, t.prototype.render = function() {
            var e = this.stringify();
            return (function(e) {
              var t = !!document.importNode,
                n = new DOMParser().parseFromString(
                  e,
                  'image/svg+xml'
                ).documentElement;
              return t ? document.importNode(n, !0) : n;
            })(l(e)).childNodes[0];
          }, t.prototype.unmount = function() {
            this.node.parentNode.removeChild(this.node);
          }, Object.defineProperties(t.prototype, n), t;
        })(e);
      }, e.exports = n();
    }).call(this, n('yLpj'));
  },
  '5xLi': function(e, t) {
    e.exports = {
      card: 'cw__card-styles_card',
      data: 'cw__card-styles_data',
      contentContainer: 'cw__card-styles_contentContainer',
      title: 'cw__card-styles_title',
      subtitle: 'cw__card-styles_subtitle'
    };
  },
  '8oxB': function(e, t) {
    var n, r, o = e.exports = {};
    function i() {
      throw new Error('setTimeout has not been defined');
    }
    function a() {
      throw new Error('clearTimeout has not been defined');
    }
    function u(e) {
      if (n === setTimeout) return setTimeout(e, 0);
      if ((n === i || !n) && setTimeout)
        return n = setTimeout, setTimeout(e, 0);
      try {
        return n(e, 0);
      } catch (t) {
        try {
          return n.call(null, e, 0);
        } catch (t) {
          return n.call(this, e, 0);
        }
      }
    }
    !(function() {
      try {
        n = 'function' == typeof setTimeout ? setTimeout : i;
      } catch (e) {
        n = i;
      }
      try {
        r = 'function' == typeof clearTimeout ? clearTimeout : a;
      } catch (e) {
        r = a;
      }
    })();
    var l, s = [], c = !1, f = -1;
    function d() {
      c && l && (c = !1, l.length ? s = l.concat(s) : f = -1, s.length && p());
    }
    function p() {
      if (!c) {
        var e = u(d);
        c = !0;
        for (var t = s.length; t; ) {
          for (l = s, s = []; ++f < t; ) l && l[f].run();
          f = -1, t = s.length;
        }
        l = null, c = !1, (function(e) {
          if (r === clearTimeout) return clearTimeout(e);
          if ((r === a || !r) && clearTimeout)
            return r = clearTimeout, clearTimeout(e);
          try {
            r(e);
          } catch (t) {
            try {
              return r.call(null, e);
            } catch (t) {
              return r.call(this, e);
            }
          }
        })(e);
      }
    }
    function y(e, t) {
      this.fun = e, this.array = t;
    }
    function h() {
    }
    o.nextTick = function(e) {
      var t = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++)
          t[n - 1] = arguments[n];
      s.push(new y(e, t)), 1 !== s.length || c || u(p);
    }, y.prototype.run = function() {
      this.fun.apply(null, this.array);
    }, o.title = 'browser', o.browser = !0, o.env = {}, o.argv = [], o.version = '', o.versions = {}, o.on = h, o.addListener = h, o.once = h, o.off = h, o.removeListener = h, o.removeAllListeners = h, o.emit = h, o.prependListener = h, o.prependOnceListener = h, o.listeners = function(e) {
      return [];
    }, o.binding = function(e) {
      throw new Error('process.binding is not supported');
    }, o.cwd = function() {
      return '/';
    }, o.chdir = function(e) {
      throw new Error('process.chdir is not supported');
    }, o.umask = function() {
      return 0;
    };
  },
  BHqK: function(e, t) {
    e.exports = {
      accordion: 'cw__accordion-styles_accordion',
      header: 'cw__accordion-styles_header',
      title: 'cw__accordion-styles_title',
      subHeader: 'cw__accordion-styles_subHeader',
      iconArrow: 'cw__accordion-styles_iconArrow',
      isOpen: 'cw__accordion-styles_isOpen'
    };
  },
  Hq9u: function(e, t, n) {
    'use strict';
    n.r(t);
    var r = n('4BeY'),
      o = n.n(r),
      i = n('IaFt'),
      a = n.n(i),
      u = new o.a({
        id: 'dropdown-arrow',
        use: 'dropdown-arrow-usage',
        viewBox: '0 0 55 32',
        content: '<symbol viewBox="0 0 55 32" id="dropdown-arrow">\n<title>dropdown-arrow</title>\n<path d="M23.455 30.26l-18.73-18.73c-1.977-1.977-2.035-5.144-0.105-7.074s5.097-1.872 7.074 0.105l15.672 15.672 15.672-15.672c1.977-1.977 5.144-2.035 7.074-0.105s1.872 5.097-0.105 7.074l-18.73 18.73c-1.053 1.053-2.477 1.59-3.911 1.511-1.434 0.080-2.859-0.458-3.911-1.511z" />\n</symbol>'
      });
    a.a.add(u);
    t.default = u;
  },
  IaFt: function(e, t, n) {
    (function(t) {
      var n;
      n = function() {
        'use strict';
        'undefined' != typeof window
          ? window
          : void 0 !== t || 'undefined' != typeof self && self;
        function e(e, t) {
          return e(t = { exports: {} }, t.exports), t.exports;
        }
        var n = e(function(e, t) {
          e.exports = (function() {
            function e(e) {
              var t = e && 'object' == typeof e;
              return t &&
                '[object RegExp]' !== Object.prototype.toString.call(e) &&
                '[object Date]' !== Object.prototype.toString.call(e);
            }
            function t(t, n) {
              var o, i = n && !0 === n.clone;
              return i && e(t)
                ? r((o = t, Array.isArray(o) ? [] : {}), t, n)
                : t;
            }
            function n(n, o, i) {
              var a = n.slice();
              return o.forEach(function(o, u) {
                void 0 === a[u]
                  ? a[u] = t(o, i)
                  : e(o)
                    ? a[u] = r(n[u], o, i)
                    : -1 === n.indexOf(o) && a.push(t(o, i));
              }), a;
            }
            function r(o, i, a) {
              var u = Array.isArray(i),
                l = a || { arrayMerge: n },
                s = l.arrayMerge || n;
              return u
                ? Array.isArray(o) ? s(o, i, a) : t(i, a)
                : (function(n, o, i) {
                  var a = {};
                  return e(n) && Object.keys(n).forEach(function(e) {
                      a[e] = t(n[e], i);
                    }), Object.keys(o).forEach(function(u) {
                    e(o[u]) && n[u]
                      ? a[u] = r(n[u], o[u], i)
                      : a[u] = t(o[u], i);
                  }), a;
                })(o, i, a);
            }
            return r.all = function(e, t) {
              if (!Array.isArray(e) || e.length < 2)
                throw new Error(
                  'first argument should be an array with at least two elements'
                );
              return e.reduce(function(e, n) {
                return r(e, n, t);
              });
            }, r;
          })();
        });
        var r = e(function(e, t) {
          t.default = {
            svg: { name: 'xmlns', uri: 'http://www.w3.org/2000/svg' },
            xlink: { name: 'xmlns:xlink', uri: 'http://www.w3.org/1999/xlink' }
          }, e.exports = t.default;
        }),
          o = r.svg,
          i = r.xlink,
          a = {};
        a[o.name] = o.uri, a[i.name] = i.uri;
        var u,
          l = function(e, t) {
            return void 0 === e && (e = ''), '<svg ' + (function(e) {
                return Object.keys(e).map(function(t) {
                  return t +
                    '="' +
                    e[t].toString().replace(/"/g, '&quot;') +
                    '"';
                }).join(' ');
              })(n(a, t || {})) + '>' + e + '</svg>';
          },
          s = r.svg,
          c = r.xlink,
          f = {
            attrs: (u = {
              style: [ 'position: absolute', 'width: 0', 'height: 0' ].join(
                '; '
              )
            }, u[s.name] = s.uri, u[c.name] = c.uri, u)
          },
          d = function(e) {
            this.config = n(f, e || {}), this.symbols = [];
          };
        d.prototype.add = function(e) {
          var t = this.symbols, n = this.find(e.id);
          return n ? (t[t.indexOf(n)] = e, !1) : (t.push(e), !0);
        }, d.prototype.remove = function(e) {
          var t = this.symbols, n = this.find(e);
          return !!n && (t.splice(t.indexOf(n), 1), n.destroy(), !0);
        }, d.prototype.find = function(e) {
          return this.symbols.filter(function(t) {
            return t.id === e;
          })[0] || null;
        }, d.prototype.has = function(e) {
          return null !== this.find(e);
        }, d.prototype.stringify = function() {
          var e = this.config.attrs,
            t = this.symbols.map(function(e) {
              return e.stringify();
            }).join('');
          return l(t, e);
        }, d.prototype.toString = function() {
          return this.stringify();
        }, d.prototype.destroy = function() {
          this.symbols.forEach(function(e) {
            return e.destroy();
          });
        };
        var p = function(e) {
          var t = e.id, n = e.viewBox, r = e.content;
          this.id = t, this.viewBox = n, this.content = r;
        };
        p.prototype.stringify = function() {
          return this.content;
        }, p.prototype.toString = function() {
          return this.stringify();
        }, p.prototype.destroy = function() {
          var e = this;
          [ 'id', 'viewBox', 'content' ].forEach(function(t) {
            return delete e[t];
          });
        };
        var y = function(e) {
          var t = !!document.importNode,
            n = new DOMParser().parseFromString(
              e,
              'image/svg+xml'
            ).documentElement;
          return t ? document.importNode(n, !0) : n;
        },
          h = (function(e) {
            function t() {
              e.apply(this, arguments);
            }
            e && (t.__proto__ = e), t.prototype = Object.create(
              e && e.prototype
            ), t.prototype.constructor = t;
            var n = { isMounted: {} };
            return n.isMounted.get = function() {
              return !!this.node;
            }, t.createFromExistingNode = function(e) {
              return new t({
                id: e.getAttribute('id'),
                viewBox: e.getAttribute('viewBox'),
                content: e.outerHTML
              });
            }, t.prototype.destroy = function() {
              this.isMounted && this.unmount(), e.prototype.destroy.call(this);
            }, t.prototype.mount = function(e) {
              if (this.isMounted) return this.node;
              var t = 'string' == typeof e ? document.querySelector(e) : e,
                n = this.render();
              return this.node = n, t.appendChild(n), n;
            }, t.prototype.render = function() {
              var e = this.stringify();
              return y(l(e)).childNodes[0];
            }, t.prototype.unmount = function() {
              this.node.parentNode.removeChild(this.node);
            }, Object.defineProperties(t.prototype, n), t;
          })(p),
          m = {
            autoConfigure: !0,
            mountTo: 'body',
            syncUrlsWithBaseTag: !1,
            listenLocationChangeEvent: !0,
            locationChangeEvent: 'locationChange',
            locationChangeAngularEmitter: !1,
            usagesToUpdate: 'use[*|href]',
            moveGradientsOutsideSymbol: !1
          },
          v = function(e) {
            return Array.prototype.slice.call(e, 0);
          },
          g = navigator.userAgent,
          b = {
            isChrome: /chrome/i.test(g),
            isFirefox: /firefox/i.test(g),
            isIE: /msie/i.test(g) || /trident/i.test(g),
            isEdge: /edge/i.test(g)
          },
          w = function(e) {
            var t = [];
            return v(e.querySelectorAll('style')).forEach(function(e) {
              e.textContent += '', t.push(e);
            }), t;
          },
          _ = function(e) {
            return (e || window.location.href).split('#')[0];
          },
          O = function(e) {
            angular.module('ng').run([
              '$rootScope',
              function(t) {
                t.$on('$locationChangeSuccess', function(t, n, r) {
                  var o, i, a;
                  o = e, i = { oldUrl: r, newUrl: n }, (a = document.createEvent('CustomEvent')).initCustomEvent(o, !1, !1, i), window.dispatchEvent(a);
                });
              }
            ]);
          },
          S = function(e, t) {
            return void 0 === t &&
              (t = 'linearGradient, radialGradient, pattern'), v(
              e.querySelectorAll('symbol')
            ).forEach(function(e) {
              v(e.querySelectorAll(t)).forEach(function(t) {
                e.parentNode.insertBefore(t, e);
              });
            }), e;
          };
        var T = r.xlink.uri, x = 'xlink:href', P = /[{}|\\\^\[\]`"<>]/g;
        function j(e) {
          return e.replace(P, function(e) {
            return '%' + e[0].charCodeAt(0).toString(16).toUpperCase();
          });
        }
        var E,
          k = [
            'clipPath',
            'colorProfile',
            'src',
            'cursor',
            'fill',
            'filter',
            'marker',
            'markerStart',
            'markerMid',
            'markerEnd',
            'mask',
            'stroke',
            'style'
          ],
          I = k.map(function(e) {
            return '[' + e + ']';
          }).join(','),
          C = function(e, t, n, r) {
            var o = j(n), i = j(r);
            (function(e, t) {
              return v(e).reduce(
                function(e, n) {
                  if (!n.attributes) return e;
                  var r = v(n.attributes), o = t ? r.filter(t) : r;
                  return e.concat(o);
                },
                []
              );
            })(e.querySelectorAll(I), function(e) {
              var t = e.localName, n = e.value;
              return -1 !== k.indexOf(t) && -1 !== n.indexOf('url(' + o);
            }).forEach(function(e) {
              return e.value = e.value.replace(o, i);
            }), (function(e, t, n) {
              v(e).forEach(function(e) {
                var r = e.getAttribute(x);
                if (r && 0 === r.indexOf(t)) {
                  var o = r.replace(t, n);
                  e.setAttributeNS(T, x, o);
                }
              });
            })(t, o, i);
          },
          M = { MOUNT: 'mount', SYMBOL_MOUNT: 'symbol_mount' },
          N = (function(e) {
            function t(t) {
              var r = this;
              void 0 === t && (t = {}), e.call(this, n(m, t));
              var o,
                i = (o = o || Object.create(null), {
                  on: function(e, t) {
                    (o[e] || (o[e] = [])).push(t);
                  },
                  off: function(e, t) {
                    o[e] && o[e].splice(o[e].indexOf(t) >>> 0, 1);
                  },
                  emit: function(e, t) {
                    (o[e] || []).map(function(e) {
                      e(t);
                    }), (o['*'] || []).map(function(n) {
                      n(e, t);
                    });
                  }
                });
              this._emitter = i, this.node = null;
              var a = this.config;
              if (
                (a.autoConfigure &&
                  this._autoConfigure(t), a.syncUrlsWithBaseTag)
              ) {
                var u = document.getElementsByTagName('base')[0].getAttribute(
                  'href'
                );
                i.on(M.MOUNT, function() {
                  return r.updateUrls('#', u);
                });
              }
              var l = this._handleLocationChange.bind(this);
              this._handleLocationChange = l, a.listenLocationChangeEvent &&
                window.addEventListener(
                  a.locationChangeEvent,
                  l
                ), a.locationChangeAngularEmitter &&
                O(a.locationChangeEvent), i.on(M.MOUNT, function(e) {
                a.moveGradientsOutsideSymbol && S(e);
              }), i.on(M.SYMBOL_MOUNT, function(e) {
                a.moveGradientsOutsideSymbol &&
                  S(e.parentNode), (b.isIE || b.isEdge) && w(e);
              });
            }
            e && (t.__proto__ = e), t.prototype = Object.create(
              e && e.prototype
            ), t.prototype.constructor = t;
            var r = { isMounted: {} };
            return r.isMounted.get = function() {
              return !!this.node;
            }, t.prototype._autoConfigure = function(e) {
              var t = this.config;
              void 0 === e.syncUrlsWithBaseTag &&
                (t.syncUrlsWithBaseTag = void 0 !==
                  document.getElementsByTagName(
                    'base'
                  )[0]), void 0 === e.locationChangeAngularEmitter && (t.locationChangeAngularEmitter = 'angular' in window), void 0 === e.moveGradientsOutsideSymbol && (t.moveGradientsOutsideSymbol = b.isFirefox);
            }, t.prototype._handleLocationChange = function(e) {
              var t = e.detail, n = t.oldUrl, r = t.newUrl;
              this.updateUrls(n, r);
            }, t.prototype.add = function(t) {
              var n = e.prototype.add.call(this, t);
              return this.isMounted &&
                n &&
                (t.mount(this.node), this._emitter.emit(
                  M.SYMBOL_MOUNT,
                  t.node
                )), n;
            }, t.prototype.attach = function(e) {
              var t = this, n = this;
              if (n.isMounted) return n.node;
              var r = 'string' == typeof e ? document.querySelector(e) : e;
              return n.node = r, this.symbols.forEach(function(e) {
                e.mount(n.node), t._emitter.emit(M.SYMBOL_MOUNT, e.node);
              }), v(r.querySelectorAll('symbol')).forEach(function(e) {
                var t = h.createFromExistingNode(e);
                t.node = e, n.add(t);
              }), this._emitter.emit(M.MOUNT, r), r;
            }, t.prototype.destroy = function() {
              var e = this.config, t = this.symbols, n = this._emitter;
              t.forEach(function(e) {
                return e.destroy();
              }), n.off(
                '*'
              ), window.removeEventListener(e.locationChangeEvent, this._handleLocationChange), this.isMounted && this.unmount();
            }, t.prototype.mount = function(e, t) {
              void 0 === e &&
                (e = this.config.mountTo), void 0 === t && (t = !1);
              if (this.isMounted) return this.node;
              var n = 'string' == typeof e ? document.querySelector(e) : e,
                r = this.render();
              return this.node = r, t && n.childNodes[0] ? n.insertBefore(r, n.childNodes[0]) : n.appendChild(r), this._emitter.emit(M.MOUNT, r), r;
            }, t.prototype.render = function() {
              return y(this.stringify());
            }, t.prototype.unmount = function() {
              this.node.parentNode.removeChild(this.node);
            }, t.prototype.updateUrls = function(e, t) {
              if (!this.isMounted) return !1;
              var n = document.querySelectorAll(this.config.usagesToUpdate);
              return C(this.node, n, _(e) + '#', _(t) + '#'), !0;
            }, Object.defineProperties(t.prototype, r), t;
          })(d),
          A = e(function(e) {
            var t, n, r, o;
            e.exports = (n = [], r = document, (o = (r.documentElement.doScroll
              ? /^loaded|^c/
              : /^loaded|^i|^c/).test(r.readyState)) ||
              r.addEventListener(
                'DOMContentLoaded',
                t = function() {
                  for (
                    r.removeEventListener('DOMContentLoaded', t), o = 1;
                    t = n.shift();
                    
                  ) t();
                }
              ), function(e) {
              o ? setTimeout(e, 0) : n.push(e);
            });
          });
        !!window.__SVG_SPRITE__
          ? E = window.__SVG_SPRITE__
          : (E = new N({
            attrs: { id: '__SVG_SPRITE_NODE__' }
          }), window.__SVG_SPRITE__ = E);
        var R = function() {
          var e = document.getElementById('__SVG_SPRITE_NODE__');
          e ? E.attach(e) : E.mount(document.body, !0);
        };
        return document.body ? R() : A(R), E;
      }, e.exports = n();
    }).call(this, n('yLpj'));
  },
  LQNH: function(e, t, n) {
    'use strict';
    t.__esModule = !0, t.default = { noWobble: { stiffness: 170, damping: 26 }, gentle: { stiffness: 120, damping: 14 }, wobbly: { stiffness: 180, damping: 12 }, stiff: { stiffness: 210, damping: 20 } }, e.exports = t.default;
  },
  LbaS: function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r = u(n('cDcd')), o = u(n('17x9')), i = u(n('TSYQ')), a = u(n('qoB/'));
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var l = function(e) {
      var t,
        n,
        o,
        u = e.id,
        l = e.label,
        s = e.checked,
        c = e.onChange,
        f = e.theme,
        d = e.toggleFirst,
        p = e.disabled;
      return r.default.createElement(
        'div',
        { className: (0, i.default)(a.default.checkInput, f.checkInput) },
        r.default.createElement(
          'label',
          {
            className: (0, i.default)(
              a.default.switch,
              (t = {}, n = a.default.toggleFirst, o = d, n in t
                ? Object.defineProperty(t, n, {
                  value: o,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0
                })
                : t[n] = o, t),
              f.switch
            ),
            htmlFor: u
          },
          r.default.createElement('input', {
            id: u,
            type: 'checkbox',
            checked: s,
            onChange: c,
            className: a.default.checkbox,
            disabled: p
          }),
          r.default.createElement(
            'span',
            { className: (0, i.default)(a.default.label, f.label) },
            l
          ),
          r.default.createElement('div', {
            className: (0, i.default)(
              a.default.slider,
              a.default.round,
              f.slider
            )
          })
        )
      );
    };
    l.propTypes = {
      id: o.default.string,
      label: o.default.string,
      checked: o.default.bool,
      disabled: o.default.bool,
      onChange: o.default.func.isRequired,
      toggleFirst: o.default.bool,
      theme: o.default.object
    }, l.defaultProps = { id: Math.random().toString(36).substring(2, 15), theme: {}, label: '', checked: !1, disabled: !1, toggleFirst: !1 }, t.default = l;
  },
  MEvW: function(e, t, n) {
    'use strict';
    t.__esModule = !0, t.default = function() {
      0;
    };
    e.exports = t.default;
  },
  Pgy6: function(e, t, n) {
    'use strict';
    var r = n('rfF1').Collapse, o = n('Tc0e').UnmountClosed;
    o.Collapse = r, o.UnmountClosed = o, e.exports = o;
  },
  QRQV: function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r = l(n('cDcd')),
      o = l(n('17x9')),
      i = l(n('TSYQ')),
      a = l(n('pPZQ')),
      u = l(n('v9XE'));
    function l(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var s = function(e) {
      var t = e.icon,
        n = e.theme,
        o = e.onClick,
        u = (0, i.default)(a.default.icon, o ? a.default.cursor : '', n.icon);
      return r.default.createElement(
        'svg',
        { className: u, viewBox: t.viewBox, onClick: o },
        r.default.createElement('use', { xlinkHref: '#' + t.id })
      );
    };
    s.propTypes = {
      icon: o.default.object,
      theme: o.default.shape({ icon: o.default.string }),
      onClick: o.default.func
    }, s.defaultProps = {
      theme: {},
      onClick: function() {
      },
      icon: u.default
    }, t.default = s;
  },
  TSYQ: function(e, t, n) {
    var r;
    !(function() {
      'use strict';
      var n = ({}).hasOwnProperty;
      function o() {
        for (var e = [], t = 0; t < arguments.length; t++) {
          var r = arguments[t];
          if (r) {
            var i = typeof r;
            if ('string' === i || 'number' === i) e.push(r);
            else if (Array.isArray(r) && r.length) {
              var a = o.apply(null, r);
              a && e.push(a);
            } else if ('object' === i)
              for (var u in r)
                n.call(r, u) && r[u] && e.push(u);
          }
        }
        return e.join(' ');
      }
      void 0 !== e && e.exports
        ? (o.default = o, e.exports = o)
        : void 0 === (r = (function() {
            return o;
          }).apply(t, [])) || (e.exports = r);
    })();
  },
  Tc0e: function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', {
      value: !0
    }), t.UnmountClosed = void 0;
    var r = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      },
      o = (function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in
              r &&
              (r.writable = !0), Object.defineProperty(e, r.key, r);
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })(),
      i = l(n('cDcd')),
      a = l(n('17x9')),
      u = n('rfF1');
    function l(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (t.UnmountClosed = (function(e) {
      function t(e) {
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function');
        })(this, t);
        var n = (function(e, t) {
          if (!e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
        })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
        return n.componentWillReceiveProps = function(e) {
          var t = e.isOpened;
          !n.props.isOpened &&
            t &&
            n.setState({ forceInitialAnimation: !0, shouldUnmount: !1 });
        }, n.onRest = function() {
          var e = n.props, t = e.isOpened, r = e.onRest;
          t ||
            n.setState({ shouldUnmount: !0 }), r && r.apply(void 0, arguments);
        }, n.state = {
          shouldUnmount: !n.props.isOpened,
          forceInitialAnimation: !n.props.isOpened
        }, n;
      }
      return (function(e, t) {
        if ('function' != typeof t && null !== t)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof t
          );
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
      })(t, i.default.PureComponent), o(t, [
        {
          key: 'render',
          value: function() {
            var e = this.props,
              t = e.isOpened,
              n = (e.onRest, (function(e, t) {
                var n = {};
                for (var r in e)
                  t.indexOf(r) >= 0 ||
                    Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
                return n;
              })(e, [ 'isOpened', 'onRest' ])),
              o = this.state,
              a = o.forceInitialAnimation;
            return o.shouldUnmount
              ? null
              : i.default.createElement(
                u.Collapse,
                r(
                  {
                    forceInitialAnimation: a,
                    isOpened: t,
                    onRest: this.onRest
                  },
                  n
                )
              );
          }
        }
      ]), t;
    })()).propTypes = {
      isOpened: a.default.bool.isRequired,
      onRest: a.default.func
    };
  },
  WbBG: function(e, t, n) {
    'use strict';
    e.exports = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  },
  Z6NN: function(e, t, n) {
    'use strict';
    t.__esModule = !0, t.default = function(e) {
      var t = {};
      for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = 0);
      return t;
    }, e.exports = t.default;
  },
  bQgK: function(e, t, n) {
    (function(t) {
      (function() {
        var n, r, o;
        'undefined' != typeof performance &&
          null !== performance &&
          performance.now
          ? e.exports = function() {
            return performance.now();
          }
          : void 0 !== t && null !== t && t.hrtime ? (e.exports = function() {
              return (n() - o) / 1e6;
            }, r = t.hrtime, o = (n = function() {
              var e;
              return 1e9 * (e = r())[0] + e[1];
            })()) : Date.now ? (e.exports = function() {
                return Date.now() - o;
              }, o = Date.now()) : (e.exports = function() {
                return new Date().getTime() - o;
              }, o = new Date().getTime());
      }).call(this);
    }).call(this, n('8oxB'));
  },
  cDcd: function(e, t) {
    e.exports = require('react');
  },
  eDuE: function(e, t, n) {
    (function(t) {
      (function() {
        var n, r, o, i, a, u;
        'undefined' != typeof performance &&
          null !== performance &&
          performance.now
          ? e.exports = function() {
            return performance.now();
          }
          : void 0 !== t && null !== t && t.hrtime ? (e.exports = function() {
              return (n() - a) / 1e6;
            }, r = t.hrtime, i = (n = function() {
              var e;
              return 1e9 * (e = r())[0] + e[1];
            })(), u = 1e9 *
              t.uptime(), a = i - u) : Date.now ? (e.exports = function() {
                return Date.now() - o;
              }, o = Date.now()) : (e.exports = function() {
                return new Date().getTime() - o;
              }, o = new Date().getTime());
      }).call(this);
    }).call(this, n('8oxB'));
  },
  fXKH: function(e, t, n) {
    'use strict';
    t.__esModule = !0, t.default = function(e, t, n, o, i, a, u) {
      var l = n + ((-i) * (t - o) + (-a) * n) * e, s = t + l * e;
      if (Math.abs(l) < u && Math.abs(s - o) < u) return r[0] = o, r[1] = 0, r;
      return r[0] = s, r[1] = l, r;
    };
    var r = [ 0, 0 ];
    e.exports = t.default;
  },
  kXpG: function(e, t, n) {
    'use strict';
    t.__esModule = !0, t.default = function(e, t, n) {
      for (var r in t) if (Object.prototype.hasOwnProperty.call(t, r)) {
          if (0 !== n[r]) return !1;
          var o = 'number' == typeof t[r] ? t[r] : t[r].val;
          if (e[r] !== o) return !1;
        }
      return !0;
    }, e.exports = t.default;
  },
  kb7i: function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r = (function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in
            r &&
            (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }
      return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    })(),
      o = n('cDcd'),
      i = s(o),
      a = s(n('17x9')),
      u = s(n('TSYQ')),
      l = s(n('5xLi'));
    function s(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var c = (function(e) {
      function t() {
        return (function(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function');
        })(this, t), (function(e, t) {
          if (!e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
        })(
          this,
          (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
        );
      }
      return (function(e, t) {
        if ('function' != typeof t && null !== t)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof t
          );
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : e.__proto__ = t);
      })(t, o.PureComponent), r(t, [
        {
          key: 'render',
          value: function() {
            var e = this.props,
              t = e.title,
              n = e.children,
              r = e.subtitle,
              o = e.theme;
            return i.default.createElement(
              'div',
              { className: (0, u.default)(l.default.card, o.card) },
              i.default.createElement('div', { className: l.default.data }, n),
              i.default.createElement(
                'div',
                { className: l.default.contentContainer },
                t &&
                  i.default.createElement(
                    'p',
                    { className: (0, u.default)(l.default.title, o.title) },
                    t
                  ),
                r &&
                  i.default.createElement(
                    'p',
                    {
                      className: (0, u.default)(l.default.subtitle, o.subtitle)
                    },
                    r
                  )
              )
            );
          }
        }
      ]), t;
    })();
    c.propTypes = {
      title: a.default.string,
      subtitle: a.default.string,
      children: a.default.node.isRequired,
      theme: a.default.shape({
        card: a.default.string,
        title: a.default.string,
        subtitle: a.default.string
      })
    }, c.defaultProps = { theme: {}, title: '', subtitle: '' }, t.default = c;
  },
  p9CH: function(e, t, n) {
    'use strict';
    t.__esModule = !0;
    var r = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      },
      o = (function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in
              r &&
              (r.writable = !0), Object.defineProperty(e, r.key, r);
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })();
    function i(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var a = i(n('Z6NN')),
      u = i(n('u461')),
      l = i(n('fXKH')),
      s = i(n('pwmp')),
      c = i(n('bQgK')),
      f = i(n('xEkU')),
      d = i(n('kXpG')),
      p = i(n('cDcd')),
      y = i(n('17x9')),
      h = 1e3 / 60;
    function m(e, t, n) {
      var r = t;
      return null == r ? e.map(function(e, t) {
          return { key: e.key, data: e.data, style: n[t] };
        }) : e.map(function(e, t) {
          for (
            var o = 0;
            o < r.length;
            o++
          ) if (r[o].key === e.key) return { key: r[o].key, data: r[o].data, style: n[t] };
          return { key: e.key, data: e.data, style: n[t] };
        });
    }
    function v(e, t, n, r, o, i, u, l, c) {
      for (var f = s.default(r, o, function(e, r) {
          var o = t(r);
          return null == o
            ? (n({ key: r.key, data: r.data }), null)
            : d.default(i[e], o, u[e])
              ? (n({ key: r.key, data: r.data }), null)
              : { key: r.key, data: r.data, style: o };
        }),
          p = [],
          y = [],
          h = [],
          m = [],
          v = 0; v < f.length; v++) {
        for (
          var g = f[v], b = null, w = 0;
          w < r.length;
          w++
        ) if (r[w].key === g.key) {
            b = w;
            break;
          }
        if (null == b) {
          var _ = e(g);
          p[v] = _, h[v] = _;
          var O = a.default(g.style);
          y[v] = O, m[v] = O;
        } else p[v] = i[b], h[v] = l[b], y[v] = u[b], m[v] = c[b];
      }
      return [ f, p, y, h, m ];
    }
    var g = (function(e) {
      function t(n) {
        var o = this;
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function');
        })(this, t), e.call(
          this,
          n
        ), this.unmounting = !1, this.animationID = null, this.prevTime = 0, this.accumulatedTime = 0, this.unreadPropStyles = null, this.clearUnreadPropStyle = function(
          e
        ) {
          for (
            var t = v(
              o.props.willEnter,
              o.props.willLeave,
              o.props.didLeave,
              o.state.mergedPropsStyles,
              e,
              o.state.currentStyles,
              o.state.currentVelocities,
              o.state.lastIdealStyles,
              o.state.lastIdealVelocities
            ),
              n = t[0],
              i = t[1],
              a = t[2],
              u = t[3],
              l = t[4],
              s = 0;
            s < e.length;
            s++
          ) {
            var c = e[s].style, f = !1;
            for (var d in c)
              if (Object.prototype.hasOwnProperty.call(c, d)) {
                var p = c[d];
                'number' == typeof p &&
                  (f ||
                    (f = !0, i[s] = r({}, i[s]), a[s] = r({}, a[s]), u[s] = r(
                      {},
                      u[s]
                    ), l[s] = r({}, l[s]), n[s] = {
                      key: n[s].key,
                      data: n[s].data,
                      style: r({}, n[s].style)
                    }), i[s][d] = p, a[s][d] = 0, u[s][d] = p, l[s][d] = 0, n[s].style[d] = p);
              }
          }
          o.setState({
            currentStyles: i,
            currentVelocities: a,
            mergedPropsStyles: n,
            lastIdealStyles: u,
            lastIdealVelocities: l
          });
        }, this.startAnimationIfNecessary = function() {
          o.unmounting || (o.animationID = f.default(function(e) {
              if (!o.unmounting) {
                var t = o.props.styles,
                  n = 'function' == typeof t
                    ? t(
                      m(
                        o.state.mergedPropsStyles,
                        o.unreadPropStyles,
                        o.state.lastIdealStyles
                      )
                    )
                    : t;
                if ((function(e, t, n, r) {
                    if (r.length !== t.length) return !1;
                    for (
                      var o = 0;
                      o < r.length;
                      o++
                    ) if (r[o].key !== t[o].key) return !1;
                    for (
                      o = 0;
                      o < r.length;
                      o++
                    ) if (!d.default(e[o], t[o].style, n[o])) return !1;
                    return !0;
                  })(
                    o.state.currentStyles,
                    n,
                    o.state.currentVelocities,
                    o.state.mergedPropsStyles
                  )) return o.animationID = null, void (o.accumulatedTime = 0);
                var r = e || c.default(), i = r - o.prevTime;
                if (
                  (o.prevTime = r, o.accumulatedTime = o.accumulatedTime +
                    i, o.accumulatedTime > 10 * h &&
                    (o.accumulatedTime = 0), 0 === o.accumulatedTime)
                )
                  return o.animationID = null, void o.startAnimationIfNecessary();
                for (
                  var a = (o.accumulatedTime -
                    Math.floor(o.accumulatedTime / h) * h) /
                    h,
                    u = Math.floor(o.accumulatedTime / h),
                    s = v(
                      o.props.willEnter,
                      o.props.willLeave,
                      o.props.didLeave,
                      o.state.mergedPropsStyles,
                      n,
                      o.state.currentStyles,
                      o.state.currentVelocities,
                      o.state.lastIdealStyles,
                      o.state.lastIdealVelocities
                    ),
                    f = s[0],
                    p = s[1],
                    y = s[2],
                    g = s[3],
                    b = s[4],
                    w = 0;
                  w < f.length;
                  w++
                ) {
                  var _ = f[w].style, O = {}, S = {}, T = {}, x = {};
                  for (var P in _) if (Object.prototype.hasOwnProperty.call(_, P)) {
                      var j = _[P];
                      if ('number' == typeof j)
                        O[P] = j, S[P] = 0, T[P] = j, x[P] = 0;
                      else {
                        for (var E = g[w][P], k = b[w][P], I = 0; I < u; I++) {
                          var C = l.default(
                            h / 1e3,
                            E,
                            k,
                            j.val,
                            j.stiffness,
                            j.damping,
                            j.precision
                          );
                          E = C[0], k = C[1];
                        }
                        var M = l.default(
                          h / 1e3,
                          E,
                          k,
                          j.val,
                          j.stiffness,
                          j.damping,
                          j.precision
                        ),
                          N = M[0],
                          A = M[1];
                        O[P] = E + (N - E) * a, S[P] = k +
                          (A - k) * a, T[P] = E, x[P] = k;
                      }
                    }
                  g[w] = T, b[w] = x, p[w] = O, y[w] = S;
                }
                o.animationID = null, o.accumulatedTime -= u * h, o.setState({ currentStyles: p, currentVelocities: y, lastIdealStyles: g, lastIdealVelocities: b, mergedPropsStyles: f }), o.unreadPropStyles = null, o.startAnimationIfNecessary();
              }
            }));
        }, this.state = this.defaultState();
      }
      return (function(e, t) {
        if ('function' != typeof t && null !== t)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof t
          );
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : e.__proto__ = t);
      })(t, e), o(t, null, [
        {
          key: 'propTypes',
          value: {
            defaultStyles: y.default.arrayOf(
              y.default.shape({
                key: y.default.string.isRequired,
                data: y.default.any,
                style: y.default.objectOf(y.default.number).isRequired
              })
            ),
            styles: y.default.oneOfType([
              y.default.func,
              y.default.arrayOf(
                y.default.shape({
                  key: y.default.string.isRequired,
                  data: y.default.any,
                  style: y.default.objectOf(
                    y.default.oneOfType([ y.default.number, y.default.object ])
                  ).isRequired
                })
              )
            ]).isRequired,
            children: y.default.func.isRequired,
            willEnter: y.default.func,
            willLeave: y.default.func,
            didLeave: y.default.func
          },
          enumerable: !0
        },
        {
          key: 'defaultProps',
          value: {
            willEnter: function(e) {
              return u.default(e.style);
            },
            willLeave: function() {
              return null;
            },
            didLeave: function() {
            }
          },
          enumerable: !0
        }
      ]), t.prototype.defaultState = function() {
        var e = this.props,
          t = e.defaultStyles,
          n = e.styles,
          r = e.willEnter,
          o = e.willLeave,
          i = e.didLeave,
          l = 'function' == typeof n ? n(t) : n,
          s = void 0;
        s = null == t ? l : t.map(function(e) {
            for (
              var t = 0;
              t < l.length;
              t++
            ) if (l[t].key === e.key) return l[t];
            return e;
          });
        var c = null == t ? l.map(function(e) {
            return u.default(e.style);
          }) : t.map(function(e) {
            return u.default(e.style);
          }),
          f = null == t ? l.map(function(e) {
              return a.default(e.style);
            }) : t.map(function(e) {
              return a.default(e.style);
            }),
          d = v(r, o, i, s, l, c, f, c, f),
          p = d[0];
        return {
          currentStyles: d[1],
          currentVelocities: d[2],
          lastIdealStyles: d[3],
          lastIdealVelocities: d[4],
          mergedPropsStyles: p
        };
      }, t.prototype.componentDidMount = function() {
        this.prevTime = c.default(), this.startAnimationIfNecessary();
      }, t.prototype.componentWillReceiveProps = function(e) {
        this.unreadPropStyles &&
          this.clearUnreadPropStyle(this.unreadPropStyles);
        var t = e.styles;
        this.unreadPropStyles = 'function' == typeof t
          ? t(
            m(
              this.state.mergedPropsStyles,
              this.unreadPropStyles,
              this.state.lastIdealStyles
            )
          )
          : t, null == this.animationID && (this.prevTime = c.default(), this.startAnimationIfNecessary());
      }, t.prototype.componentWillUnmount = function() {
        this.unmounting = !0, null != this.animationID && (f.default.cancel(this.animationID), this.animationID = null);
      }, t.prototype.render = function() {
        var e = m(
          this.state.mergedPropsStyles,
          this.unreadPropStyles,
          this.state.currentStyles
        ),
          t = this.props.children(e);
        return t && p.default.Children.only(t);
      }, t;
    })(p.default.Component);
    t.default = g, e.exports = t.default;
  },
  pPZQ: function(e, t) {
    e.exports = {
      icon: 'cw__icon-styles_icon',
      cursor: 'cw__icon-styles_cursor'
    };
  },
  pwmp: function(e, t, n) {
    'use strict';
    t.__esModule = !0, t.default = function(e, t, n) {
      for (var r = {}, o = 0; o < e.length; o++) r[e[o].key] = o;
      for (var i = {}, o = 0; o < t.length; o++) i[t[o].key] = o;
      for (var a = [], o = 0; o < t.length; o++) a[o] = t[o];
      for (
        var o = 0;
        o < e.length;
        o++
      ) if (!Object.prototype.hasOwnProperty.call(i, e[o].key)) {
          var u = n(o, e[o]);
          null != u && a.push(u);
        }
      return a.sort(function(e, n) {
        var o = i[e.key], a = i[n.key], u = r[e.key], l = r[n.key];
        if (null != o && null != a) return i[e.key] - i[n.key];
        if (null != u && null != l) return r[e.key] - r[n.key];
        if (null != o) {
          for (var s = 0; s < t.length; s++) {
            var c = t[s].key;
            if (Object.prototype.hasOwnProperty.call(r, c)) {
              if (o < i[c] && l > r[c]) return -1;
              if (o > i[c] && l < r[c]) return 1;
            }
          }
          return 1;
        }
        for (var s = 0; s < t.length; s++) {
          var c = t[s].key;
          if (Object.prototype.hasOwnProperty.call(r, c)) {
            if (a < i[c] && u > r[c]) return 1;
            if (a > i[c] && u < r[c]) return -1;
          }
        }
        return -1;
      });
    }, e.exports = t.default;
  },
  'qoB/': function(e, t) {
    e.exports = {
      switch: 'cw__check-input-styles_switch',
      slider: 'cw__check-input-styles_slider',
      toggleFirst: 'cw__check-input-styles_toggleFirst',
      label: 'cw__check-input-styles_label',
      round: 'cw__check-input-styles_round'
    };
  },
  rfF1: function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 }), t.Collapse = void 0;
    var r = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      },
      o = (function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in
              r &&
              (r.writable = !0), Object.defineProperty(e, r.key, r);
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })(),
      i = l(n('cDcd')),
      a = l(n('17x9')),
      u = n('0wEy');
    function l(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var s = 'IDLING',
      c = function() {
        return null;
      },
      f = t.Collapse = (function(e) {
        function t(e) {
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function');
          })(this, t);
          var n = (function(e, t) {
            if (!e)
              throw new ReferenceError(
                "this hasn't been initialised - super() hasn't been called"
              );
            return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
          })(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
          return d.call(n), n.state = { currentState: s, from: 0, to: 0 }, n;
        }
        return (function(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' +
                typeof t
            );
          e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t);
        })(t, i.default.PureComponent), o(t, [
          {
            key: 'componentDidMount',
            value: function() {
              var e = this.props,
                t = e.isOpened,
                n = e.forceInitialAnimation,
                r = e.onRest;
              if (t) {
                var o = this.getTo();
                if (n) {
                  var i = this.wrapper.clientHeight;
                  this.setState({ currentState: 'RESIZING', from: i, to: o });
                } else this.setState({ currentState: s, from: o, to: o });
              }
              r();
            }
          },
          {
            key: 'componentWillReceiveProps',
            value: function(e) {
              e.hasNestedCollapse
                ? e.isOpened !== this.props.isOpened &&
                  this.setState({ currentState: 'WAITING' })
                : this.state.currentState === s &&
                  (e.isOpened || this.props.isOpened) &&
                  this.setState({ currentState: 'WAITING' });
            }
          },
          {
            key: 'componentDidUpdate',
            value: function(e, t) {
              var n = this.props, r = n.isOpened, o = n.onRest, i = n.onMeasure;
              if (this.state.currentState !== s) {
                t.to !== this.state.to &&
                  i({ height: this.state.to, width: this.content.clientWidth });
                var a = this.wrapper.clientHeight, u = r ? this.getTo() : 0;
                a === u
                  ? 'RESTING' !== this.state.currentState &&
                    'WAITING' !== this.state.currentState ||
                    this.setState({ currentState: s, from: a, to: u })
                  : this.setState({ currentState: 'RESIZING', from: a, to: u });
              } else o();
            }
          },
          {
            key: 'componentWillUnmount',
            value: function() {
              cancelAnimationFrame(this.raf);
            }
          },
          {
            key: 'render',
            value: function() {
              return i.default.createElement(
                u.Motion,
                r({}, this.getMotionProps(), {
                  onRest: this.onRest,
                  children: this.renderContent
                })
              );
            }
          }
        ]), t;
      })();
    f.propTypes = {
      isOpened: a.default.bool.isRequired,
      springConfig: a.default.objectOf(a.default.number),
      forceInitialAnimation: a.default.bool,
      hasNestedCollapse: a.default.bool,
      fixedHeight: a.default.number,
      theme: a.default.objectOf(a.default.string),
      style: a.default.object,
      onRender: a.default.func,
      onRest: a.default.func,
      onMeasure: a.default.func,
      children: a.default.node.isRequired
    }, f.defaultProps = { forceInitialAnimation: !1, hasNestedCollapse: !1, fixedHeight: -1, style: {}, theme: { collapse: 'ReactCollapse--collapse', content: 'ReactCollapse--content' }, onRender: c, onRest: c, onMeasure: c };
    var d = function() {
      var e = this;
      this.onContentRef = function(t) {
        e.content = t;
      }, this.onWrapperRef = function(t) {
        e.wrapper = t;
      }, this.onRest = function() {
        e.raf = requestAnimationFrame(e.setResting);
      }, this.setResting = function() {
        e.setState({ currentState: 'RESTING' });
      }, this.getTo = function() {
        var t = e.props.fixedHeight;
        return t > -1 ? t : e.content.clientHeight;
      }, this.getWrapperStyle = function(t) {
        if (e.state.currentState === s && e.state.to) {
          var n = e.props.fixedHeight;
          return n > -1
            ? { overflow: 'hidden', height: n }
            : { height: 'auto' };
        }
        return 'WAITING' !== e.state.currentState || e.state.to
          ? { overflow: 'hidden', height: Math.max(0, t) }
          : { overflow: 'hidden', height: 0 };
      }, this.getMotionProps = function() {
        var t = e.props.springConfig;
        return e.state.currentState === s
          ? {
            defaultStyle: { height: e.state.to },
            style: { height: e.state.to }
          }
          : {
            defaultStyle: { height: e.state.from },
            style: { height: (0, u.spring)(e.state.to, r({ precision: 1 }, t)) }
          };
      }, this.renderContent = function(t) {
        var n = t.height,
          o = e.props,
          a = (o.isOpened, o.springConfig, o.forceInitialAnimation, o.hasNestedCollapse, o.fixedHeight, o.theme),
          u = o.style,
          l = o.onRender,
          s = (o.onRest, o.onMeasure, o.children),
          c = (function(e, t) {
            var n = {};
            for (var r in e)
              t.indexOf(r) >= 0 ||
                Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]);
            return n;
          })(o, [
            'isOpened',
            'springConfig',
            'forceInitialAnimation',
            'hasNestedCollapse',
            'fixedHeight',
            'theme',
            'style',
            'onRender',
            'onRest',
            'onMeasure',
            'children'
          ]),
          f = e.state;
        return l({
          current: n,
          from: f.from,
          to: f.to
        }), i.default.createElement('div', r({ ref: e.onWrapperRef, className: a.collapse, style: r({}, e.getWrapperStyle(Math.max(0, n)), u) }, c), i.default.createElement('div', { ref: e.onContentRef, className: a.content }, s));
      };
    };
  },
  't1/T': function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r = (function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in
            r &&
            (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }
      return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    })(),
      o = n('cDcd'),
      i = d(o),
      a = d(n('17x9')),
      u = n('Pgy6'),
      l = d(n('TSYQ')),
      s = d(n('QRQV')),
      c = d(n('Hq9u')),
      f = d(n('BHqK'));
    function d(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var p = (function(e) {
      function t() {
        return (function(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function');
        })(this, t), (function(e, t) {
          if (!e)
            throw new ReferenceError(
              "this hasn't been initialised - super() hasn't been called"
            );
          return !t || 'object' != typeof t && 'function' != typeof t ? e : t;
        })(
          this,
          (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
        );
      }
      return (function(e, t) {
        if ('function' != typeof t && null !== t)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof t
          );
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : e.__proto__ = t);
      })(t, o.PureComponent), r(t, [
        {
          key: 'render',
          value: function() {
            var e = this.props,
              t = e.data,
              n = e.theme,
              r = e.handleOnClick,
              o = e.openSlug,
              a = e.children,
              d = e.isChild,
              p = e.hasNestedCollapse;
            return i.default.createElement(
              'div',
              { className: n.wrapper },
              t && t.length > 0 && t.map(function(e, y) {
                  var h = 0 === y;
                  if (o) if ('none' !== o) {
                      var m = t.some(function(e) {
                        return e.slug === o;
                      });
                      h = o === e.slug || 0 === y && !m;
                    } else h = !1;
                  var v,
                    g,
                    b,
                    w = e.parent ? e.parent.name + ' | ' + e.title : e.title;
                  return i.default.createElement(
                    'section',
                    {
                      key: e.slug + '-' + e.title,
                      className: (0, l.default)(
                        f.default.accordion,
                        n.accordion
                      )
                    },
                    i.default.createElement(
                      'button',
                      {
                        type: 'button',
                        className: (0, l.default)(
                          f.default.header,
                          d ? f.default.subHeader : ''
                        ),
                        onClick: function() {
                          return r(e.slug, h);
                        }
                      },
                      i.default.createElement(
                        'div',
                        { className: f.default.layout },
                        i.default.createElement(
                          'div',
                          { className: f.default.title },
                          w,
                          i.default.createElement(s.default, {
                            icon: c.default,
                            className: (0, l.default)(
                              f.default.iconArrow,
                              (v = {}, g = f.default.isOpen, b = h, g in v
                                ? Object.defineProperty(v, g, {
                                  value: b,
                                  enumerable: !0,
                                  configurable: !0,
                                  writable: !0
                                })
                                : v[g] = b, v)
                            )
                          })
                        )
                      )
                    ),
                    i.default.createElement(
                      u.Collapse,
                      { isOpened: h, hasNestedCollapse: p },
                      h && i.default.createElement(
                          'div',
                          null,
                          i.default.Children.map(a, function(e, t) {
                            return t === y ? e : null;
                          })
                        )
                    )
                  );
                })
            );
          }
        }
      ]), t;
    })();
    p.propTypes = {
      openSlug: a.default.string,
      handleOnClick: a.default.func,
      data: a.default.arrayOf(
        a.default.shape({
          title: a.default.string,
          slug: a.default.string,
          definitions: a.default.array
        })
      ),
      children: a.default.node,
      isChild: a.default.bool,
      hasNestedCollapse: a.default.bool,
      theme: a.default.shape({
        wrapper: a.default.string,
        accordion: a.default.string
      })
    }, p.defaultProps = {
      data: [],
      theme: {},
      openSlug: '',
      children: null,
      handleOnClick: function() {
      },
      hasNestedCollapse: !1,
      isChild: !1
    }, t.default = p;
  },
  tYRH: function(e, t, n) {
    'use strict';
    t.__esModule = !0;
    var r = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      };
    t.default = function(e, t) {
      return r({}, u, t, { val: e });
    };
    var o,
      i = n('LQNH'),
      a = (o = i) && o.__esModule ? o : { default: o },
      u = r({}, a.default.noWobble, { precision: .01 });
    e.exports = t.default;
  },
  tjUo: function(e, t, n) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var r = n('t1/T');
    Object.defineProperty(t, 'Accordion', {
      enumerable: !0,
      get: function() {
        return u(r).default;
      }
    });
    var o = n('kb7i');
    Object.defineProperty(t, 'Card', {
      enumerable: !0,
      get: function() {
        return u(o).default;
      }
    });
    var i = n('LbaS');
    Object.defineProperty(t, 'CheckInput', {
      enumerable: !0,
      get: function() {
        return u(i).default;
      }
    });
    var a = n('QRQV');
    function u(e) {
      return e && e.__esModule ? e : { default: e };
    }
    Object.defineProperty(t, 'Icon', {
      enumerable: !0,
      get: function() {
        return u(a).default;
      }
    });
  },
  u461: function(e, t, n) {
    'use strict';
    t.__esModule = !0, t.default = function(e) {
      var t = {};
      for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = 'number' == typeof e[n] ? e[n] : e[n].val);
      return t;
    }, e.exports = t.default;
  },
  unm8: function(e, t, n) {
    'use strict';
    t.__esModule = !0;
    var r = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      },
      o = (function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in
              r &&
              (r.writable = !0), Object.defineProperty(e, r.key, r);
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })();
    function i(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var a = i(n('Z6NN')),
      u = i(n('u461')),
      l = i(n('fXKH')),
      s = i(n('bQgK')),
      c = i(n('xEkU')),
      f = i(n('kXpG')),
      d = i(n('cDcd')),
      p = i(n('17x9')),
      y = 1e3 / 60;
    var h = (function(e) {
      function t(n) {
        var o = this;
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError('Cannot call a class as a function');
        })(this, t), e.call(
          this,
          n
        ), this.animationID = null, this.prevTime = 0, this.accumulatedTime = 0, this.unreadPropStyles = null, this.clearUnreadPropStyle = function(
          e
        ) {
          for (
            var t = o.state,
              n = t.currentStyles,
              i = t.currentVelocities,
              a = t.lastIdealStyles,
              u = t.lastIdealVelocities,
              l = !1,
              s = 0;
            s < e.length;
            s++
          ) {
            var c = e[s], f = !1;
            for (var d in c)
              if (Object.prototype.hasOwnProperty.call(c, d)) {
                var p = c[d];
                'number' == typeof p &&
                  (f ||
                    (f = !0, l = !0, n[s] = r({}, n[s]), i[s] = r(
                      {},
                      i[s]
                    ), a[s] = r({}, a[s]), u[s] = r(
                      {},
                      u[s]
                    )), n[s][d] = p, i[s][d] = 0, a[s][d] = p, u[s][d] = 0);
              }
          }
          l &&
            o.setState({
              currentStyles: n,
              currentVelocities: i,
              lastIdealStyles: a,
              lastIdealVelocities: u
            });
        }, this.startAnimationIfNecessary = function() {
          o.animationID = c.default(function(e) {
            var t = o.props.styles(o.state.lastIdealStyles);
            if ((function(e, t, n) {
                for (
                  var r = 0;
                  r < e.length;
                  r++
                ) if (!f.default(e[r], t[r], n[r])) return !1;
                return !0;
              })(
                o.state.currentStyles,
                t,
                o.state.currentVelocities
              )) return o.animationID = null, void (o.accumulatedTime = 0);
            var n = e || s.default(), r = n - o.prevTime;
            if (
              (o.prevTime = n, o.accumulatedTime = o.accumulatedTime +
                r, o.accumulatedTime > 10 * y && (o.accumulatedTime = 0), 0 ===
                o.accumulatedTime)
            )
              return o.animationID = null, void o.startAnimationIfNecessary();
            for (
              var i = (o.accumulatedTime -
                Math.floor(o.accumulatedTime / y) * y) /
                y,
                a = Math.floor(o.accumulatedTime / y),
                u = [],
                c = [],
                d = [],
                p = [],
                h = 0;
              h < t.length;
              h++
            ) {
              var m = t[h], v = {}, g = {}, b = {}, w = {};
              for (var _ in m) if (Object.prototype.hasOwnProperty.call(m, _)) {
                  var O = m[_];
                  if ('number' == typeof O)
                    v[_] = O, g[_] = 0, b[_] = O, w[_] = 0;
                  else {
                    for (
                      var S = o.state.lastIdealStyles[h][_],
                        T = o.state.lastIdealVelocities[h][_],
                        x = 0;
                      x < a;
                      x++
                    ) {
                      var P = l.default(
                        y / 1e3,
                        S,
                        T,
                        O.val,
                        O.stiffness,
                        O.damping,
                        O.precision
                      );
                      S = P[0], T = P[1];
                    }
                    var j = l.default(
                      y / 1e3,
                      S,
                      T,
                      O.val,
                      O.stiffness,
                      O.damping,
                      O.precision
                    ),
                      E = j[0],
                      k = j[1];
                    v[_] = S + (E - S) * i, g[_] = T +
                      (k - T) * i, b[_] = S, w[_] = T;
                  }
                }
              d[h] = v, p[h] = g, u[h] = b, c[h] = w;
            }
            o.animationID = null, o.accumulatedTime -= a * y, o.setState({ currentStyles: d, currentVelocities: p, lastIdealStyles: u, lastIdealVelocities: c }), o.unreadPropStyles = null, o.startAnimationIfNecessary();
          });
        }, this.state = this.defaultState();
      }
      return (function(e, t) {
        if ('function' != typeof t && null !== t)
          throw new TypeError(
            'Super expression must either be null or a function, not ' +
              typeof t
          );
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : e.__proto__ = t);
      })(t, e), o(t, null, [
        {
          key: 'propTypes',
          value: {
            defaultStyles: p.default.arrayOf(
              p.default.objectOf(p.default.number)
            ),
            styles: p.default.func.isRequired,
            children: p.default.func.isRequired
          },
          enumerable: !0
        }
      ]), t.prototype.defaultState = function() {
        var e = this.props,
          t = e.defaultStyles,
          n = e.styles,
          r = t || n().map(u.default),
          o = r.map(function(e) {
            return a.default(e);
          });
        return {
          currentStyles: r,
          currentVelocities: o,
          lastIdealStyles: r,
          lastIdealVelocities: o
        };
      }, t.prototype.componentDidMount = function() {
        this.prevTime = s.default(), this.startAnimationIfNecessary();
      }, t.prototype.componentWillReceiveProps = function(e) {
        null != this.unreadPropStyles &&
          this.clearUnreadPropStyle(
            this.unreadPropStyles
          ), this.unreadPropStyles = e.styles(this.state.lastIdealStyles), null == this.animationID && (this.prevTime = s.default(), this.startAnimationIfNecessary());
      }, t.prototype.componentWillUnmount = function() {
        null != this.animationID &&
          (c.default.cancel(this.animationID), this.animationID = null);
      }, t.prototype.render = function() {
        var e = this.props.children(this.state.currentStyles);
        return e && d.default.Children.only(e);
      }, t;
    })(d.default.Component);
    t.default = h, e.exports = t.default;
  },
  v9XE: function(e, t, n) {
    'use strict';
    n.r(t);
    var r = n('4BeY'),
      o = n.n(r),
      i = n('IaFt'),
      a = n.n(i),
      u = new o.a({
        id: 'info',
        use: 'info-usage',
        viewBox: '0 0 34 32',
        content: '<symbol viewBox="0 0 34 32" id="info">\n<title>info</title>\n<path d="M17.034-0.007c4.4 0 8.162 1.562 11.287 4.688s4.688 6.887 4.688 11.288c0 4.4-1.563 8.163-4.688 11.288s-6.887 4.688-11.288 4.688c-4.4 0-8.162-1.563-11.287-4.688s-4.688-6.887-4.688-11.287c0-4.4 1.562-8.162 4.688-11.287s6.887-4.688 11.287-4.688zM16.995 3.129c-3.526 0-6.54 1.252-9.044 3.756s-3.756 5.519-3.756 9.044c0 3.526 1.252 6.54 3.756 9.044s5.519 3.756 9.044 3.756c3.526 0 6.54-1.252 9.044-3.756s3.756-5.519 3.756-9.044c0-3.526-1.252-6.54-3.756-9.044s-5.519-3.756-9.044-3.756zM19.192 9.593c0 1.178-0.955 2.133-2.133 2.133s-2.133-0.955-2.133-2.133c0-1.178 0.955-2.133 2.133-2.133s2.133 0.955 2.133 2.133zM19.192 23.46c0 1.178-0.955 2.133-2.133 2.133s-2.133-0.955-2.133-2.133v-7.467c0-1.178 0.955-2.133 2.133-2.133s2.133 0.955 2.133 2.133v7.467z" />\n</symbol>'
      });
    a.a.add(u);
    t.default = u;
  },
  'xCC/': function(e, t, n) {
    'use strict';
    t.__esModule = !0;
    var r = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      },
      o = (function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, 'value' in
              r &&
              (r.writable = !0), Object.defineProperty(e, r.key, r);
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })();
    function i(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var a = i(n('Z6NN')),
      u = i(n('u461')),
      l = i(n('fXKH')),
      s = i(n('bQgK')),
      c = i(n('xEkU')),
      f = i(n('kXpG')),
      d = i(n('cDcd')),
      p = i(n('17x9')),
      y = 1e3 / 60,
      h = (function(e) {
        function t(n) {
          var o = this;
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function');
          })(this, t), e.call(
            this,
            n
          ), this.wasAnimating = !1, this.animationID = null, this.prevTime = 0, this.accumulatedTime = 0, this.unreadPropStyle = null, this.clearUnreadPropStyle = function(
            e
          ) {
            var t = !1,
              n = o.state,
              i = n.currentStyle,
              a = n.currentVelocity,
              u = n.lastIdealStyle,
              l = n.lastIdealVelocity;
            for (var s in e)
              if (Object.prototype.hasOwnProperty.call(e, s)) {
                var c = e[s];
                'number' == typeof c &&
                  (t ||
                    (t = !0, i = r({}, i), a = r({}, a), u = r({}, u), l = r(
                      {},
                      l
                    )), i[s] = c, a[s] = 0, u[s] = c, l[s] = 0);
              }
            t &&
              o.setState({
                currentStyle: i,
                currentVelocity: a,
                lastIdealStyle: u,
                lastIdealVelocity: l
              });
          }, this.startAnimationIfNecessary = function() {
            o.animationID = c.default(function(e) {
              var t = o.props.style;
              if (f.default(o.state.currentStyle, t, o.state.currentVelocity))
                return o.wasAnimating &&
                  o.props.onRest &&
                  o.props.onRest(), o.animationID = null, o.wasAnimating = !1, void (o.accumulatedTime = 0);
              o.wasAnimating = !0;
              var n = e || s.default(), r = n - o.prevTime;
              if (
                (o.prevTime = n, o.accumulatedTime = o.accumulatedTime +
                  r, o.accumulatedTime > 10 * y &&
                  (o.accumulatedTime = 0), 0 === o.accumulatedTime)
              )
                return o.animationID = null, void o.startAnimationIfNecessary();
              var i = (o.accumulatedTime -
                Math.floor(o.accumulatedTime / y) * y) /
                y,
                a = Math.floor(o.accumulatedTime / y),
                u = {},
                c = {},
                d = {},
                p = {};
              for (var h in t) if (Object.prototype.hasOwnProperty.call(t, h)) {
                  var m = t[h];
                  if ('number' == typeof m)
                    d[h] = m, p[h] = 0, u[h] = m, c[h] = 0;
                  else {
                    for (
                      var v = o.state.lastIdealStyle[h],
                        g = o.state.lastIdealVelocity[h],
                        b = 0;
                      b < a;
                      b++
                    ) {
                      var w = l.default(
                        y / 1e3,
                        v,
                        g,
                        m.val,
                        m.stiffness,
                        m.damping,
                        m.precision
                      );
                      v = w[0], g = w[1];
                    }
                    var _ = l.default(
                      y / 1e3,
                      v,
                      g,
                      m.val,
                      m.stiffness,
                      m.damping,
                      m.precision
                    ),
                      O = _[0],
                      S = _[1];
                    d[h] = v + (O - v) * i, p[h] = g +
                      (S - g) * i, u[h] = v, c[h] = g;
                  }
                }
              o.animationID = null, o.accumulatedTime -= a * y, o.setState({ currentStyle: d, currentVelocity: p, lastIdealStyle: u, lastIdealVelocity: c }), o.unreadPropStyle = null, o.startAnimationIfNecessary();
            });
          }, this.state = this.defaultState();
        }
        return (function(e, t) {
          if ('function' != typeof t && null !== t)
            throw new TypeError(
              'Super expression must either be null or a function, not ' +
                typeof t
            );
          e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), t &&
            (Object.setPrototypeOf
              ? Object.setPrototypeOf(e, t)
              : e.__proto__ = t);
        })(t, e), o(t, null, [
          {
            key: 'propTypes',
            value: {
              defaultStyle: p.default.objectOf(p.default.number),
              style: p.default.objectOf(
                p.default.oneOfType([ p.default.number, p.default.object ])
              ).isRequired,
              children: p.default.func.isRequired,
              onRest: p.default.func
            },
            enumerable: !0
          }
        ]), t.prototype.defaultState = function() {
          var e = this.props,
            t = e.defaultStyle,
            n = e.style,
            r = t || u.default(n),
            o = a.default(r);
          return {
            currentStyle: r,
            currentVelocity: o,
            lastIdealStyle: r,
            lastIdealVelocity: o
          };
        }, t.prototype.componentDidMount = function() {
          this.prevTime = s.default(), this.startAnimationIfNecessary();
        }, t.prototype.componentWillReceiveProps = function(e) {
          null != this.unreadPropStyle &&
            this.clearUnreadPropStyle(
              this.unreadPropStyle
            ), this.unreadPropStyle = e.style, null == this.animationID && (this.prevTime = s.default(), this.startAnimationIfNecessary());
        }, t.prototype.componentWillUnmount = function() {
          null != this.animationID &&
            (c.default.cancel(this.animationID), this.animationID = null);
        }, t.prototype.render = function() {
          var e = this.props.children(this.state.currentStyle);
          return e && d.default.Children.only(e);
        }, t;
      })(d.default.Component);
    t.default = h, e.exports = t.default;
  },
  xEkU: function(e, t, n) {
    (function(t) {
      for (
        var r = n('eDuE'),
          o = 'undefined' == typeof window ? t : window,
          i = [ 'moz', 'webkit' ],
          a = 'AnimationFrame',
          u = o['request' + a],
          l = o['cancel' + a] || o['cancelRequest' + a],
          s = 0;
        !u && s < i.length;
        s++
      ) u = o[i[s] + 'Request' + a], l = o[i[s] + 'Cancel' + a] || o[i[s] + 'CancelRequest' + a];
      if (!u || !l) {
        var c = 0, f = 0, d = [];
        u = function(e) {
          if (0 === d.length) {
            var t = r(), n = Math.max(0, 1e3 / 60 - (t - c));
            c = n + t, setTimeout(
              function() {
                var e = d.slice(0);
                d.length = 0;
                for (var t = 0; t < e.length; t++)
                  if (!e[t].cancelled) try {
                      e[t].callback(c);
                    } catch (e) {
                      setTimeout(
                        function() {
                          throw e;
                        },
                        0
                      );
                    }
              },
              Math.round(n)
            );
          }
          return d.push({ handle: ++f, callback: e, cancelled: !1 }), f;
        }, l = function(e) {
          for (
            var t = 0;
            t < d.length;
            t++
          ) d[t].handle === e && (d[t].cancelled = !0);
        };
      }
      e.exports = function(e) {
        return u.call(o, e);
      }, e.exports.cancel = function() {
        l.apply(o, arguments);
      }, e.exports.polyfill = function(e) {
        e || (e = o), e.requestAnimationFrame = u, e.cancelAnimationFrame = l;
      };
    }).call(this, n('yLpj'));
  },
  yLpj: function(e, t) {
    var n;
    n = (function() {
      return this;
    })();
    try {
      n = n || Function('return this')() || (0, eval)('this');
    } catch (e) {
      'object' == typeof window && (n = window);
    }
    e.exports = n;
  }
});
