module.exports = (function(e) {
  var t = {};
  function r(n) {
    if (t[n]) return t[n].exports;
    var a = t[n] = { i: n, l: !1, exports: {} };
    return e[n].call(a.exports, a, a.exports, r), a.l = !0, a.exports;
  }
  return r.m = e, r.c = t, r.d = function(e, t, n) {
    r.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
  }, r.r = function(e) {
    'undefined' != typeof Symbol &&
      Symbol.toStringTag &&
      Object.defineProperty(e, Symbol.toStringTag, {
        value: 'Module'
      }), Object.defineProperty(e, '__esModule', { value: !0 });
  }, r.t = function(e, t) {
    if ((1 & t && (e = r(e)), 8 & t)) return e;
    if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
    var n = Object.create(null);
    if (
      (r.r(n), Object.defineProperty(n, 'default', {
        enumerable: !0,
        value: e
      }), 2 & t && 'string' != typeof e)
    )
      for (var a in e)
        r.d(
          n,
          a,
          (function(t) {
            return e[t];
          }).bind(null, a)
        );
    return n;
  }, r.n = function(e) {
    var t = e && e.__esModule ? (function() {
        return e.default;
      }) : (function() {
        return e;
      });
    return r.d(t, 'a', t), t;
  }, r.o = function(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, r.p = '', r(r.s = 'tjUo');
})({
  '16Al': function(e, t, r) {
    'use strict';
    var n = r('WbBG');
    function a() {
    }
    e.exports = function() {
      function e(e, t, r, a, l, u) {
        if (u !== n) {
          var o = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types'
          );
          throw (o.name = 'Invariant Violation', o);
        }
      }
      function t() {
        return e;
      }
      e.isRequired = e;
      var r = {
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
      return r.checkPropTypes = a, r.PropTypes = r, r;
    };
  },
  '17x9': function(e, t, r) {
    e.exports = r('16Al')();
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
  LbaS: function(e, t, r) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var n = o(r('cDcd')), a = o(r('17x9')), l = o(r('TSYQ')), u = o(r('qoB/'));
    function o(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var i = function(e) {
      var t,
        r,
        a,
        o = e.id,
        i = e.label,
        c = e.checked,
        s = e.onChange,
        f = e.theme,
        d = e.toggleFirst,
        p = e.disabled;
      return n.default.createElement(
        'div',
        { className: (0, l.default)(u.default.checkInput, f.checkInput) },
        n.default.createElement(
          'label',
          {
            className: (0, l.default)(
              u.default.switch,
              (t = {}, r = u.default.toggleFirst, a = d, r in t
                ? Object.defineProperty(t, r, {
                  value: a,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0
                })
                : t[r] = a, t),
              f.switch
            ),
            htmlFor: o
          },
          n.default.createElement('input', {
            id: o,
            type: 'checkbox',
            checked: c,
            onChange: s,
            className: u.default.checkbox,
            disabled: p
          }),
          n.default.createElement(
            'span',
            { className: (0, l.default)(u.default.label, f.label) },
            i
          ),
          n.default.createElement('div', {
            className: (0, l.default)(
              u.default.slider,
              u.default.round,
              f.slider
            )
          })
        )
      );
    };
    i.propTypes = {
      id: a.default.string,
      className: a.default.string,
      label: a.default.string,
      checked: a.default.bool,
      disabled: a.default.bool,
      onChange: a.default.func,
      toggleFirst: a.default.bool,
      theme: a.default.object
    }, i.defaultProps = { id: Math.random().toString(36).substring(2, 15), theme: {} }, t.default = i;
  },
  TSYQ: function(e, t, r) {
    var n;
    !(function() {
      'use strict';
      var r = ({}).hasOwnProperty;
      function a() {
        for (var e = [], t = 0; t < arguments.length; t++) {
          var n = arguments[t];
          if (n) {
            var l = typeof n;
            if ('string' === l || 'number' === l) e.push(n);
            else if (Array.isArray(n) && n.length) {
              var u = a.apply(null, n);
              u && e.push(u);
            } else if ('object' === l)
              for (var o in n)
                r.call(n, o) && n[o] && e.push(o);
          }
        }
        return e.join(' ');
      }
      void 0 !== e && e.exports
        ? (a.default = a, e.exports = a)
        : void 0 === (n = (function() {
            return a;
          }).apply(t, [])) || (e.exports = n);
    })();
  },
  WbBG: function(e, t, r) {
    'use strict';
    e.exports = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
  },
  cDcd: function(e, t) {
    e.exports = require('react');
  },
  kb7i: function(e, t, r) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var n = (function() {
      function e(e, t) {
        for (var r = 0; r < t.length; r++) {
          var n = t[r];
          n.enumerable = n.enumerable || !1, n.configurable = !0, 'value' in
            n &&
            (n.writable = !0), Object.defineProperty(e, n.key, n);
        }
      }
      return function(t, r, n) {
        return r && e(t.prototype, r), n && e(t, n), t;
      };
    })(),
      a = r('cDcd'),
      l = c(a),
      u = c(r('17x9')),
      o = c(r('TSYQ')),
      i = c(r('5xLi'));
    function c(e) {
      return e && e.__esModule ? e : { default: e };
    }
    var s = (function(e) {
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
      })(t, a.PureComponent), n(t, [
        {
          key: 'render',
          value: function() {
            var e = this.props,
              t = e.title,
              r = e.children,
              n = e.subtitle,
              a = e.theme;
            return l.default.createElement(
              'div',
              { className: (0, o.default)(i.default.card, a.card) },
              l.default.createElement('div', { className: i.default.data }, r),
              l.default.createElement(
                'div',
                { className: i.default.contentContainer },
                t &&
                  l.default.createElement(
                    'p',
                    { className: (0, o.default)(i.default.title, a.title) },
                    t
                  ),
                n &&
                  l.default.createElement(
                    'p',
                    {
                      className: (0, o.default)(i.default.subtitle, a.subtitle)
                    },
                    n
                  )
              )
            );
          }
        }
      ]), t;
    })();
    s.propTypes = {
      title: u.default.string,
      subtitle: u.default.string,
      children: u.default.node.isRequired,
      theme: u.default.shape({
        card: u.default.string,
        title: u.default.string,
        subtitle: u.default.string
      })
    }, s.defaultProps = { theme: {}, title: '', subtitle: '' }, t.default = s;
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
  tjUo: function(e, t, r) {
    'use strict';
    Object.defineProperty(t, '__esModule', { value: !0 });
    var n = r('kb7i');
    Object.defineProperty(t, 'Card', {
      enumerable: !0,
      get: function() {
        return l(n).default;
      }
    });
    var a = r('LbaS');
    function l(e) {
      return e && e.__esModule ? e : { default: e };
    }
    Object.defineProperty(t, 'CheckInput', {
      enumerable: !0,
      get: function() {
        return l(a).default;
      }
    });
  }
});
