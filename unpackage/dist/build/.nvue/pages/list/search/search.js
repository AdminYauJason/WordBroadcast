import { shallowRef, ref, getCurrentInstance, openBlock, createElementBlock, normalizeStyle, toDisplayString, resolveDynamicComponent, createElementVNode, renderSlot, createVNode, createCommentVNode, onMounted, normalizeClass, resolveComponent, createBlock, Fragment, renderList, withCtx } from "vue";
import { _ as _export_sfc } from "../../../_plugin-vue_export-helper.js";
/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn$1 = (val, key) => hasOwnProperty$1.call(val, key);
const UNI_SSR = "__uniSSR";
const UNI_SSR_DATA = "data";
const UNI_SSR_GLOBAL_DATA = "globalData";
function getSSRDataType() {
  return getCurrentInstance() ? UNI_SSR_DATA : UNI_SSR_GLOBAL_DATA;
}
function assertKey(key, shallow = false) {
  if (!key) {
    throw new Error(`${shallow ? "shallowSsrRef" : "ssrRef"}: You must provide a key.`);
  }
}
const ssrClientRef = (value, key, shallow = false) => {
  const valRef = shallow ? shallowRef(value) : ref(value);
  if (typeof window === "undefined") {
    return valRef;
  }
  const __uniSSR = window[UNI_SSR];
  if (!__uniSSR) {
    return valRef;
  }
  const type = getSSRDataType();
  assertKey(key, shallow);
  if (hasOwn$1(__uniSSR[type], key)) {
    valRef.value = __uniSSR[type][key];
    if (type === UNI_SSR_DATA) {
      delete __uniSSR[type][key];
    }
  }
  return valRef;
};
const ssrRef = (value, key) => {
  return ssrClientRef(value, key);
};
const shallowSsrRef = (value, key) => {
  return ssrClientRef(value, key, true);
};
function formatAppLog(type, filename, ...args) {
  if (uni.__log__) {
    uni.__log__(type, filename, ...args);
  } else {
    console[type].apply(console, [...args, filename]);
  }
}
function resolveEasycom(component, easycom) {
  return typeof component === "string" ? easycom : component;
}
const pages = [
  {
    path: "pages/launch/launch",
    style: {
      navigationStyle: "custom"
    }
  },
  {
    path: "pages/home_page/home_page",
    style: {
      enablePullDownRefresh: false,
      navigationStyle: "custom"
    }
  },
  {
    path: "pages/grid/grid",
    style: {
      navigationStyle: "custom"
    }
  },
  {
    path: "pages/list/search/search",
    style: {
      navigationBarTitleText: "搜索"
    }
  },
  {
    path: "pages/list/detail",
    style: {
      navigationBarTitleText: "直播助手"
    }
  },
  {
    path: "pages/ucenter/ucenter",
    style: {
      navigationStyle: "custom"
    }
  },
  {
    path: "pages/uni-agree/uni-agree",
    style: {
      navigationStyle: "custom",
      "app-plus": {
        popGesture: "none"
      }
    }
  },
  {
    path: "pages/ucenter/settings/settings",
    style: {
      navigationBarTitleText: "设置"
    }
  },
  {
    path: "pages/ucenter/about/about",
    style: {
      navigationBarTitleText: "关于",
      "app-plus": {
        titleNView: {
          buttons: [
            {
              type: "share"
            }
          ]
        }
      }
    }
  },
  {
    path: "uni_modules/uni-upgrade-center-app/pages/upgrade-popup",
    style: {
      disableScroll: true,
      "app-plus": {
        backgroundColorTop: "transparent",
        background: "transparent",
        titleNView: false,
        scrollIndicator: false,
        popGesture: "none",
        animationType: "fade-in",
        animationDuration: 200
      }
    }
  },
  {
    path: "pages/ucenter/invite/invite",
    style: {
      navigationStyle: "custom",
      enablePullDownRefresh: false
    }
  },
  {
    path: "uni_modules/uni-pay/pages/success/success",
    style: {
      backgroundColor: "#F8F8F8",
      navigationBarTitleText: "支付成功"
    }
  },
  {
    path: "uni_modules/uni-pay/pages/ad-interactive-webview/ad-interactive-webview",
    style: {
      backgroundColor: "#F8F8F8",
      navigationBarTitleText: "ad"
    }
  },
  {
    path: "uni_modules/uni-pay/pages/pay-desk/pay-desk",
    style: {
      backgroundColor: "#F8F8F8",
      navigationBarTitleText: "收银台"
    }
  },
  {
    path: "pages/Robot/Robot",
    style: {
      navigationBarTitleText: "我的Robot"
    }
  },
  {
    path: "pages/list/list",
    style: {
      enablePullDownRefresh: true,
      navigationStyle: "custom"
    }
  },
  {
    path: "pages/confirm/confirm",
    style: {
      navigationBarTitleText: "确认页面"
    }
  },
  {
    path: "pages/live_record/live_record",
    style: {
      navigationBarTitleText: "我的直播记录"
    }
  },
  {
    path: "pages/wallet/wallet",
    style: {
      navigationBarTitleText: "我的钱包"
    }
  },
  {
    path: "pages/auth/auth",
    style: {
      navigationBarTitleText: "授权登录",
      navigationBarBackgroundColor: "#ffffff",
      navigationBarTextStyle: "black"
    }
  }
];
const subPackages = [
  {
    root: "uni_modules/uni-feedback",
    pages: [
      {
        path: "pages/opendb-feedback/opendb-feedback",
        style: {
          navigationBarTitleText: "意见反馈",
          enablePullDownRefresh: false
        }
      }
    ]
  },
  {
    root: "uni_modules/uni-id-pages/pages",
    pages: [
      {
        path: "userinfo/userinfo",
        style: {
          navigationBarTitleText: "个人资料"
        }
      },
      {
        path: "userinfo/realname-verify/realname-verify",
        style: {
          enablePullDownRefresh: false,
          navigationBarTitleText: "实名认证"
        }
      },
      {
        path: "login/login-withoutpwd"
      },
      {
        path: "login/login-withpwd"
      },
      {
        path: "userinfo/deactivate/deactivate",
        style: {
          navigationBarTitleText: "注销账号"
        }
      },
      {
        path: "userinfo/bind-mobile/bind-mobile",
        style: {
          navigationBarTitleText: "绑定手机号码"
        }
      },
      {
        path: "login/login-smscode",
        style: {
          navigationBarTitleText: "手机验证码登录"
        }
      },
      {
        path: "register/register",
        style: {
          navigationBarTitleText: "注册"
        }
      },
      {
        path: "retrieve/retrieve",
        style: {
          navigationBarTitleText: "重置密码"
        }
      },
      {
        path: "common/webview/webview",
        style: {
          enablePullDownRefresh: false,
          navigationBarTitleText: ""
        }
      },
      {
        path: "userinfo/change_pwd/change_pwd",
        style: {
          enablePullDownRefresh: false,
          navigationBarTitleText: "修改密码"
        }
      },
      {
        path: "register/register-by-email",
        style: {
          navigationBarTitleText: "邮箱验证码注册"
        }
      },
      {
        path: "retrieve/retrieve-by-email",
        style: {
          navigationBarTitleText: "通过邮箱重置密码"
        }
      },
      {
        path: "userinfo/set-pwd/set-pwd",
        style: {
          enablePullDownRefresh: false,
          navigationBarTitleText: "设置密码"
        }
      }
    ]
  }
];
const globalStyle = {
  navigationBarTextStyle: "black",
  navigationBarTitleText: "我的Robot",
  navigationBarBackgroundColor: "#FFFFFF",
  backgroundColor: "#F8F8F8",
  enablePullDownRefresh: false,
  rpxCalcMaxDeviceWidth: 375,
  rpxCalcBaseDeviceWidth: 375
};
const tabBar = {
  color: "#7A7E83",
  selectedColor: "#007AFF",
  borderStyle: "black",
  backgroundColor: "#FFFFFF",
  list: [
    {
      pagePath: "pages/home_page/home_page",
      iconPath: "static/tabbar/list.png",
      selectedIconPath: "static/tabbar/list_active.png",
      text: "主页"
    },
    {
      pagePath: "pages/grid/grid",
      iconPath: "static/tabbar/grid.png",
      selectedIconPath: "static/tabbar/grid_active.png",
      text: "话术生成"
    },
    {
      pagePath: "pages/ucenter/ucenter",
      iconPath: "static/tabbar/me.png",
      selectedIconPath: "static/tabbar/me_active.png",
      text: "我的"
    }
  ]
};
const uniIdRouter = {
  loginPage: "uni_modules/uni-id-pages/pages/login/login-withoutpwd",
  needLogin: [
    "/uni_modules/uni-id-pages/pages/userinfo/userinfo"
  ],
  resToLogin: true
};
const e = {
  pages,
  subPackages,
  globalStyle,
  tabBar,
  uniIdRouter
};
var define_process_env_UNI_SECURE_NETWORK_CONFIG_default = [];
function t$2(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
function n(e2, t2, n2) {
  return e2(n2 = { path: t2, exports: {}, require: function(e3, t3) {
    return function() {
      throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
    }(null == t3 && n2.path);
  } }, n2.exports), n2.exports;
}
var s = n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = n2 || function(e3, t3) {
    var n3 = Object.create || /* @__PURE__ */ function() {
      function e4() {
      }
      return function(t4) {
        var n4;
        return e4.prototype = t4, n4 = new e4(), e4.prototype = null, n4;
      };
    }(), s2 = {}, r2 = s2.lib = {}, i2 = r2.Base = { extend: function(e4) {
      var t4 = n3(this);
      return e4 && t4.mixIn(e4), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
        t4.$super.init.apply(this, arguments);
      }), t4.init.prototype = t4, t4.$super = this, t4;
    }, create: function() {
      var e4 = this.extend();
      return e4.init.apply(e4, arguments), e4;
    }, init: function() {
    }, mixIn: function(e4) {
      for (var t4 in e4)
        e4.hasOwnProperty(t4) && (this[t4] = e4[t4]);
      e4.hasOwnProperty("toString") && (this.toString = e4.toString);
    }, clone: function() {
      return this.init.prototype.extend(this);
    } }, o2 = r2.WordArray = i2.extend({ init: function(e4, n4) {
      e4 = this.words = e4 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e4.length;
    }, toString: function(e4) {
      return (e4 || c2).stringify(this);
    }, concat: function(e4) {
      var t4 = this.words, n4 = e4.words, s3 = this.sigBytes, r3 = e4.sigBytes;
      if (this.clamp(), s3 % 4)
        for (var i3 = 0; i3 < r3; i3++) {
          var o3 = n4[i3 >>> 2] >>> 24 - i3 % 4 * 8 & 255;
          t4[s3 + i3 >>> 2] |= o3 << 24 - (s3 + i3) % 4 * 8;
        }
      else
        for (i3 = 0; i3 < r3; i3 += 4)
          t4[s3 + i3 >>> 2] = n4[i3 >>> 2];
      return this.sigBytes += r3, this;
    }, clamp: function() {
      var t4 = this.words, n4 = this.sigBytes;
      t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e3.ceil(n4 / 4);
    }, clone: function() {
      var e4 = i2.clone.call(this);
      return e4.words = this.words.slice(0), e4;
    }, random: function(t4) {
      for (var n4, s3 = [], r3 = function(t5) {
        var n5 = 987654321, s4 = 4294967295;
        return function() {
          var r4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
          return r4 /= 4294967296, (r4 += 0.5) * (e3.random() > 0.5 ? 1 : -1);
        };
      }, i3 = 0; i3 < t4; i3 += 4) {
        var a3 = r3(4294967296 * (n4 || e3.random()));
        n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
      }
      return new o2.init(s3, t4);
    } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e4) {
      for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
        var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
        s3.push((i3 >>> 4).toString(16)), s3.push((15 & i3).toString(16));
      }
      return s3.join("");
    }, parse: function(e4) {
      for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
        n4[s3 >>> 3] |= parseInt(e4.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
      return new o2.init(n4, t4 / 2);
    } }, u2 = a2.Latin1 = { stringify: function(e4) {
      for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
        var i3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
        s3.push(String.fromCharCode(i3));
      }
      return s3.join("");
    }, parse: function(e4) {
      for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3++)
        n4[s3 >>> 2] |= (255 & e4.charCodeAt(s3)) << 24 - s3 % 4 * 8;
      return new o2.init(n4, t4);
    } }, h2 = a2.Utf8 = { stringify: function(e4) {
      try {
        return decodeURIComponent(escape(u2.stringify(e4)));
      } catch (e5) {
        throw new Error("Malformed UTF-8 data");
      }
    }, parse: function(e4) {
      return u2.parse(unescape(encodeURIComponent(e4)));
    } }, l2 = r2.BufferedBlockAlgorithm = i2.extend({ reset: function() {
      this._data = new o2.init(), this._nDataBytes = 0;
    }, _append: function(e4) {
      "string" == typeof e4 && (e4 = h2.parse(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
    }, _process: function(t4) {
      var n4 = this._data, s3 = n4.words, r3 = n4.sigBytes, i3 = this.blockSize, a3 = r3 / (4 * i3), c3 = (a3 = t4 ? e3.ceil(a3) : e3.max((0 | a3) - this._minBufferSize, 0)) * i3, u3 = e3.min(4 * c3, r3);
      if (c3) {
        for (var h3 = 0; h3 < c3; h3 += i3)
          this._doProcessBlock(s3, h3);
        var l3 = s3.splice(0, c3);
        n4.sigBytes -= u3;
      }
      return new o2.init(l3, u3);
    }, clone: function() {
      var e4 = i2.clone.call(this);
      return e4._data = this._data.clone(), e4;
    }, _minBufferSize: 0 });
    r2.Hasher = l2.extend({ cfg: i2.extend(), init: function(e4) {
      this.cfg = this.cfg.extend(e4), this.reset();
    }, reset: function() {
      l2.reset.call(this), this._doReset();
    }, update: function(e4) {
      return this._append(e4), this._process(), this;
    }, finalize: function(e4) {
      return e4 && this._append(e4), this._doFinalize();
    }, blockSize: 16, _createHelper: function(e4) {
      return function(t4, n4) {
        return new e4.init(n4).finalize(t4);
      };
    }, _createHmacHelper: function(e4) {
      return function(t4, n4) {
        return new d2.HMAC.init(e4, n4).finalize(t4);
      };
    } });
    var d2 = s2.algo = {};
    return s2;
  }(Math), n2);
}), r = s, i = (n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = r, function(e3) {
    var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [];
    !function() {
      for (var t4 = 0; t4 < 64; t4++)
        a2[t4] = 4294967296 * e3.abs(e3.sin(t4 + 1)) | 0;
    }();
    var c2 = o2.MD5 = i2.extend({ _doReset: function() {
      this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878]);
    }, _doProcessBlock: function(e4, t4) {
      for (var n3 = 0; n3 < 16; n3++) {
        var s3 = t4 + n3, r3 = e4[s3];
        e4[s3] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8);
      }
      var i3 = this._hash.words, o3 = e4[t4 + 0], c3 = e4[t4 + 1], p2 = e4[t4 + 2], f2 = e4[t4 + 3], g2 = e4[t4 + 4], m2 = e4[t4 + 5], y2 = e4[t4 + 6], _2 = e4[t4 + 7], w2 = e4[t4 + 8], v2 = e4[t4 + 9], I2 = e4[t4 + 10], S2 = e4[t4 + 11], T2 = e4[t4 + 12], b2 = e4[t4 + 13], E2 = e4[t4 + 14], k2 = e4[t4 + 15], P2 = i3[0], C2 = i3[1], A2 = i3[2], O2 = i3[3];
      P2 = u2(P2, C2, A2, O2, o3, 7, a2[0]), O2 = u2(O2, P2, C2, A2, c3, 12, a2[1]), A2 = u2(A2, O2, P2, C2, p2, 17, a2[2]), C2 = u2(C2, A2, O2, P2, f2, 22, a2[3]), P2 = u2(P2, C2, A2, O2, g2, 7, a2[4]), O2 = u2(O2, P2, C2, A2, m2, 12, a2[5]), A2 = u2(A2, O2, P2, C2, y2, 17, a2[6]), C2 = u2(C2, A2, O2, P2, _2, 22, a2[7]), P2 = u2(P2, C2, A2, O2, w2, 7, a2[8]), O2 = u2(O2, P2, C2, A2, v2, 12, a2[9]), A2 = u2(A2, O2, P2, C2, I2, 17, a2[10]), C2 = u2(C2, A2, O2, P2, S2, 22, a2[11]), P2 = u2(P2, C2, A2, O2, T2, 7, a2[12]), O2 = u2(O2, P2, C2, A2, b2, 12, a2[13]), A2 = u2(A2, O2, P2, C2, E2, 17, a2[14]), P2 = h2(P2, C2 = u2(C2, A2, O2, P2, k2, 22, a2[15]), A2, O2, c3, 5, a2[16]), O2 = h2(O2, P2, C2, A2, y2, 9, a2[17]), A2 = h2(A2, O2, P2, C2, S2, 14, a2[18]), C2 = h2(C2, A2, O2, P2, o3, 20, a2[19]), P2 = h2(P2, C2, A2, O2, m2, 5, a2[20]), O2 = h2(O2, P2, C2, A2, I2, 9, a2[21]), A2 = h2(A2, O2, P2, C2, k2, 14, a2[22]), C2 = h2(C2, A2, O2, P2, g2, 20, a2[23]), P2 = h2(P2, C2, A2, O2, v2, 5, a2[24]), O2 = h2(O2, P2, C2, A2, E2, 9, a2[25]), A2 = h2(A2, O2, P2, C2, f2, 14, a2[26]), C2 = h2(C2, A2, O2, P2, w2, 20, a2[27]), P2 = h2(P2, C2, A2, O2, b2, 5, a2[28]), O2 = h2(O2, P2, C2, A2, p2, 9, a2[29]), A2 = h2(A2, O2, P2, C2, _2, 14, a2[30]), P2 = l2(P2, C2 = h2(C2, A2, O2, P2, T2, 20, a2[31]), A2, O2, m2, 4, a2[32]), O2 = l2(O2, P2, C2, A2, w2, 11, a2[33]), A2 = l2(A2, O2, P2, C2, S2, 16, a2[34]), C2 = l2(C2, A2, O2, P2, E2, 23, a2[35]), P2 = l2(P2, C2, A2, O2, c3, 4, a2[36]), O2 = l2(O2, P2, C2, A2, g2, 11, a2[37]), A2 = l2(A2, O2, P2, C2, _2, 16, a2[38]), C2 = l2(C2, A2, O2, P2, I2, 23, a2[39]), P2 = l2(P2, C2, A2, O2, b2, 4, a2[40]), O2 = l2(O2, P2, C2, A2, o3, 11, a2[41]), A2 = l2(A2, O2, P2, C2, f2, 16, a2[42]), C2 = l2(C2, A2, O2, P2, y2, 23, a2[43]), P2 = l2(P2, C2, A2, O2, v2, 4, a2[44]), O2 = l2(O2, P2, C2, A2, T2, 11, a2[45]), A2 = l2(A2, O2, P2, C2, k2, 16, a2[46]), P2 = d2(P2, C2 = l2(C2, A2, O2, P2, p2, 23, a2[47]), A2, O2, o3, 6, a2[48]), O2 = d2(O2, P2, C2, A2, _2, 10, a2[49]), A2 = d2(A2, O2, P2, C2, E2, 15, a2[50]), C2 = d2(C2, A2, O2, P2, m2, 21, a2[51]), P2 = d2(P2, C2, A2, O2, T2, 6, a2[52]), O2 = d2(O2, P2, C2, A2, f2, 10, a2[53]), A2 = d2(A2, O2, P2, C2, I2, 15, a2[54]), C2 = d2(C2, A2, O2, P2, c3, 21, a2[55]), P2 = d2(P2, C2, A2, O2, w2, 6, a2[56]), O2 = d2(O2, P2, C2, A2, k2, 10, a2[57]), A2 = d2(A2, O2, P2, C2, y2, 15, a2[58]), C2 = d2(C2, A2, O2, P2, b2, 21, a2[59]), P2 = d2(P2, C2, A2, O2, g2, 6, a2[60]), O2 = d2(O2, P2, C2, A2, S2, 10, a2[61]), A2 = d2(A2, O2, P2, C2, p2, 15, a2[62]), C2 = d2(C2, A2, O2, P2, v2, 21, a2[63]), i3[0] = i3[0] + P2 | 0, i3[1] = i3[1] + C2 | 0, i3[2] = i3[2] + A2 | 0, i3[3] = i3[3] + O2 | 0;
    }, _doFinalize: function() {
      var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
      n3[r3 >>> 5] |= 128 << 24 - r3 % 32;
      var i3 = e3.floor(s3 / 4294967296), o3 = s3;
      n3[15 + (r3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), n3[14 + (r3 + 64 >>> 9 << 4)] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
      for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
        var h3 = c3[u3];
        c3[u3] = 16711935 & (h3 << 8 | h3 >>> 24) | 4278255360 & (h3 << 24 | h3 >>> 8);
      }
      return a3;
    }, clone: function() {
      var e4 = i2.clone.call(this);
      return e4._hash = this._hash.clone(), e4;
    } });
    function u2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (t4 & n3 | ~t4 & s3) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    function h2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (t4 & s3 | n3 & ~s3) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    function l2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (t4 ^ n3 ^ s3) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    function d2(e4, t4, n3, s3, r3, i3, o3) {
      var a3 = e4 + (n3 ^ (t4 | ~s3)) + r3 + o3;
      return (a3 << i3 | a3 >>> 32 - i3) + t4;
    }
    t3.MD5 = i2._createHelper(c2), t3.HmacMD5 = i2._createHmacHelper(c2);
  }(Math), n2.MD5);
}), n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = r, void function() {
    var e3 = n2, t3 = e3.lib.Base, s2 = e3.enc.Utf8;
    e3.algo.HMAC = t3.extend({ init: function(e4, t4) {
      e4 = this._hasher = new e4.init(), "string" == typeof t4 && (t4 = s2.parse(t4));
      var n3 = e4.blockSize, r2 = 4 * n3;
      t4.sigBytes > r2 && (t4 = e4.finalize(t4)), t4.clamp();
      for (var i2 = this._oKey = t4.clone(), o2 = this._iKey = t4.clone(), a2 = i2.words, c2 = o2.words, u2 = 0; u2 < n3; u2++)
        a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
      i2.sigBytes = o2.sigBytes = r2, this.reset();
    }, reset: function() {
      var e4 = this._hasher;
      e4.reset(), e4.update(this._iKey);
    }, update: function(e4) {
      return this._hasher.update(e4), this;
    }, finalize: function(e4) {
      var t4 = this._hasher, n3 = t4.finalize(e4);
      return t4.reset(), t4.finalize(this._oKey.clone().concat(n3));
    } });
  }());
}), n(function(e2, t2) {
  e2.exports = r.HmacMD5;
})), o = n(function(e2, t2) {
  e2.exports = r.enc.Utf8;
}), a = n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = r, function() {
    var e3 = n2, t3 = e3.lib.WordArray;
    function s2(e4, n3, s3) {
      for (var r2 = [], i2 = 0, o2 = 0; o2 < n3; o2++)
        if (o2 % 4) {
          var a2 = s3[e4.charCodeAt(o2 - 1)] << o2 % 4 * 2, c2 = s3[e4.charCodeAt(o2)] >>> 6 - o2 % 4 * 2;
          r2[i2 >>> 2] |= (a2 | c2) << 24 - i2 % 4 * 8, i2++;
        }
      return t3.create(r2, i2);
    }
    e3.enc.Base64 = { stringify: function(e4) {
      var t4 = e4.words, n3 = e4.sigBytes, s3 = this._map;
      e4.clamp();
      for (var r2 = [], i2 = 0; i2 < n3; i2 += 3)
        for (var o2 = (t4[i2 >>> 2] >>> 24 - i2 % 4 * 8 & 255) << 16 | (t4[i2 + 1 >>> 2] >>> 24 - (i2 + 1) % 4 * 8 & 255) << 8 | t4[i2 + 2 >>> 2] >>> 24 - (i2 + 2) % 4 * 8 & 255, a2 = 0; a2 < 4 && i2 + 0.75 * a2 < n3; a2++)
          r2.push(s3.charAt(o2 >>> 6 * (3 - a2) & 63));
      var c2 = s3.charAt(64);
      if (c2)
        for (; r2.length % 4; )
          r2.push(c2);
      return r2.join("");
    }, parse: function(e4) {
      var t4 = e4.length, n3 = this._map, r2 = this._reverseMap;
      if (!r2) {
        r2 = this._reverseMap = [];
        for (var i2 = 0; i2 < n3.length; i2++)
          r2[n3.charCodeAt(i2)] = i2;
      }
      var o2 = n3.charAt(64);
      if (o2) {
        var a2 = e4.indexOf(o2);
        -1 !== a2 && (t4 = a2);
      }
      return s2(e4, t4, r2);
    }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" };
  }(), n2.enc.Base64);
});
const c = "uni_id_token", u = "uni_id_token_expired", h = "uniIdToken", l = { DEFAULT: "FUNCTION", FUNCTION: "FUNCTION", OBJECT: "OBJECT", CLIENT_DB: "CLIENT_DB" }, d = "pending", p = "fulfilled", f = "rejected";
function g(e2) {
  return Object.prototype.toString.call(e2).slice(8, -1).toLowerCase();
}
function m(e2) {
  return "object" === g(e2);
}
function y(e2) {
  return "function" == typeof e2;
}
function _(e2) {
  return function() {
    try {
      return e2.apply(e2, arguments);
    } catch (e3) {
      console.error(e3);
    }
  };
}
const w = "REJECTED", v = "NOT_PENDING";
class I {
  constructor({ createPromise: e2, retryRule: t2 = w } = {}) {
    this.createPromise = e2, this.status = null, this.promise = null, this.retryRule = t2;
  }
  get needRetry() {
    if (!this.status)
      return true;
    switch (this.retryRule) {
      case w:
        return this.status === f;
      case v:
        return this.status !== d;
    }
  }
  exec() {
    return this.needRetry ? (this.status = d, this.promise = this.createPromise().then((e2) => (this.status = p, Promise.resolve(e2)), (e2) => (this.status = f, Promise.reject(e2))), this.promise) : this.promise;
  }
}
class S {
  constructor() {
    this._callback = {};
  }
  addListener(e2, t2) {
    this._callback[e2] || (this._callback[e2] = []), this._callback[e2].push(t2);
  }
  on(e2, t2) {
    return this.addListener(e2, t2);
  }
  removeListener(e2, t2) {
    if (!t2)
      throw new Error('The "listener" argument must be of type function. Received undefined');
    const n2 = this._callback[e2];
    if (!n2)
      return;
    const s2 = function(e3, t3) {
      for (let n3 = e3.length - 1; n3 >= 0; n3--)
        if (e3[n3] === t3)
          return n3;
      return -1;
    }(n2, t2);
    n2.splice(s2, 1);
  }
  off(e2, t2) {
    return this.removeListener(e2, t2);
  }
  removeAllListener(e2) {
    delete this._callback[e2];
  }
  emit(e2, ...t2) {
    const n2 = this._callback[e2];
    if (n2)
      for (let e3 = 0; e3 < n2.length; e3++)
        n2[e3](...t2);
  }
}
function T(e2) {
  return e2 && "string" == typeof e2 ? JSON.parse(e2) : e2;
}
const b = false, E = "app", P = T(define_process_env_UNI_SECURE_NETWORK_CONFIG_default), C = E;
T("");
const O = T('[{"provider":"aliyun","spaceName":"live-agent","spaceId":"mp-2f9390ec-7ecb-48a2-9e47-e99a53037e27","clientSecret":"V0qIAEe36jSG4uDyjnH33w==","endpoint":"https://api.next.bspapp.com"}]') || [];
let N = "";
try {
  N = "__UNI__D091391";
} catch (e2) {
}
let R, L = {};
function U(e2, t2 = {}) {
  var n2, s2;
  return n2 = L, s2 = e2, Object.prototype.hasOwnProperty.call(n2, s2) || (L[e2] = t2), L[e2];
}
function D() {
  return R || (R = function() {
    if ("undefined" != typeof globalThis)
      return globalThis;
    if ("undefined" != typeof self)
      return self;
    if ("undefined" != typeof window)
      return window;
    function e2() {
      return this;
    }
    return void 0 !== e2() ? e2() : new Function("return this")();
  }(), R);
}
L = uni._globalUniCloudObj ? uni._globalUniCloudObj : uni._globalUniCloudObj = {};
const M = ["invoke", "success", "fail", "complete"], q = U("_globalUniCloudInterceptor");
function F(e2, t2) {
  q[e2] || (q[e2] = {}), m(t2) && Object.keys(t2).forEach((n2) => {
    M.indexOf(n2) > -1 && function(e3, t3, n3) {
      let s2 = q[e3][t3];
      s2 || (s2 = q[e3][t3] = []), -1 === s2.indexOf(n3) && y(n3) && s2.push(n3);
    }(e2, n2, t2[n2]);
  });
}
function K(e2, t2) {
  q[e2] || (q[e2] = {}), m(t2) ? Object.keys(t2).forEach((n2) => {
    M.indexOf(n2) > -1 && function(e3, t3, n3) {
      const s2 = q[e3][t3];
      if (!s2)
        return;
      const r2 = s2.indexOf(n3);
      r2 > -1 && s2.splice(r2, 1);
    }(e2, n2, t2[n2]);
  }) : delete q[e2];
}
function j(e2, t2) {
  return e2 && 0 !== e2.length ? e2.reduce((e3, n2) => e3.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
}
function $(e2, t2) {
  return q[e2] && q[e2][t2] || [];
}
function B(e2) {
  F("callObject", e2);
}
const W = U("_globalUniCloudListener"), H = { RESPONSE: "response", NEED_LOGIN: "needLogin", REFRESH_TOKEN: "refreshToken" }, J = { CLIENT_DB: "clientdb", CLOUD_FUNCTION: "cloudfunction", CLOUD_OBJECT: "cloudobject" };
function z(e2) {
  return W[e2] || (W[e2] = []), W[e2];
}
function V(e2, t2) {
  const n2 = z(e2);
  n2.includes(t2) || n2.push(t2);
}
function G(e2, t2) {
  const n2 = z(e2), s2 = n2.indexOf(t2);
  -1 !== s2 && n2.splice(s2, 1);
}
function Y(e2, t2) {
  const n2 = z(e2);
  for (let e3 = 0; e3 < n2.length; e3++) {
    (0, n2[e3])(t2);
  }
}
let Q, X = false;
function Z() {
  return Q || (Q = new Promise((e2) => {
    X && e2(), function t2() {
      if ("function" == typeof getCurrentPages) {
        const t3 = getCurrentPages();
        t3 && t3[0] && (X = true, e2());
      }
      X || setTimeout(() => {
        t2();
      }, 30);
    }();
  }), Q);
}
function ee(e2) {
  const t2 = {};
  for (const n2 in e2) {
    const s2 = e2[n2];
    y(s2) && (t2[n2] = _(s2));
  }
  return t2;
}
class te extends Error {
  constructor(e2) {
    super(e2.message), this.errMsg = e2.message || e2.errMsg || "unknown system error", this.code = this.errCode = e2.code || e2.errCode || "SYSTEM_ERROR", this.errSubject = this.subject = e2.subject || e2.errSubject, this.cause = e2.cause, this.requestId = e2.requestId;
  }
  toJson(e2 = 0) {
    if (!(e2 >= 10))
      return e2++, { errCode: this.errCode, errMsg: this.errMsg, errSubject: this.errSubject, cause: this.cause && this.cause.toJson ? this.cause.toJson(e2) : this.cause };
  }
}
var ne = { request: (e2) => uni.request(e2), uploadFile: (e2) => uni.uploadFile(e2), setStorageSync: (e2, t2) => uni.setStorageSync(e2, t2), getStorageSync: (e2) => uni.getStorageSync(e2), removeStorageSync: (e2) => uni.removeStorageSync(e2), clearStorageSync: () => uni.clearStorageSync(), connectSocket: (e2) => uni.connectSocket(e2) };
function se(e2) {
  return e2 && se(e2.__v_raw) || e2;
}
function re() {
  return { token: ne.getStorageSync(c) || ne.getStorageSync(h), tokenExpired: ne.getStorageSync(u) };
}
function ie({ token: e2, tokenExpired: t2 } = {}) {
  e2 && ne.setStorageSync(c, e2), t2 && ne.setStorageSync(u, t2);
}
let oe, ae;
function ce() {
  return oe || (oe = uni.getSystemInfoSync()), oe;
}
function ue() {
  let e2, t2;
  try {
    if (uni.getLaunchOptionsSync) {
      if (uni.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
        return;
      const { scene: n2, channel: s2 } = uni.getLaunchOptionsSync();
      e2 = s2, t2 = n2;
    }
  } catch (e3) {
  }
  return { channel: e2, scene: t2 };
}
let he = {};
function le() {
  const e2 = uni.getLocale && uni.getLocale() || "en";
  if (ae)
    return { ...he, ...ae, locale: e2, LOCALE: e2 };
  const t2 = ce(), { deviceId: n2, osName: s2, uniPlatform: r2, appId: i2 } = t2, o2 = ["appId", "appLanguage", "appName", "appVersion", "appVersionCode", "appWgtVersion", "browserName", "browserVersion", "deviceBrand", "deviceId", "deviceModel", "deviceType", "osName", "osVersion", "romName", "romVersion", "ua", "hostName", "hostVersion", "uniPlatform", "uniRuntimeVersion", "uniRuntimeVersionCode", "uniCompilerVersion", "uniCompilerVersionCode"];
  for (const e3 in t2)
    Object.hasOwnProperty.call(t2, e3) && -1 === o2.indexOf(e3) && delete t2[e3];
  return ae = { PLATFORM: r2, OS: s2, APPID: i2, DEVICEID: n2, ...ue(), ...t2 }, { ...he, ...ae, locale: e2, LOCALE: e2 };
}
var de = { sign: function(e2, t2) {
  let n2 = "";
  return Object.keys(e2).sort().forEach(function(t3) {
    e2[t3] && (n2 = n2 + "&" + t3 + "=" + e2[t3]);
  }), n2 = n2.slice(1), i(n2, t2).toString();
}, wrappedRequest: function(e2, t2) {
  return new Promise((n2, s2) => {
    t2(Object.assign(e2, { complete(e3) {
      e3 || (e3 = {});
      const t3 = e3.data && e3.data.header && e3.data.header["x-serverless-request-id"] || e3.header && e3.header["request-id"];
      if (!e3.statusCode || e3.statusCode >= 400) {
        const n3 = e3.data && e3.data.error && e3.data.error.code || "SYS_ERR", r3 = e3.data && e3.data.error && e3.data.error.message || e3.errMsg || "request:fail";
        return s2(new te({ code: n3, message: r3, requestId: t3 }));
      }
      const r2 = e3.data;
      if (r2.error)
        return s2(new te({ code: r2.error.code, message: r2.error.message, requestId: t3 }));
      r2.result = r2.data, r2.requestId = t3, delete r2.data, n2(r2);
    } }));
  });
}, toBase64: function(e2) {
  return a.stringify(o.parse(e2));
} };
var pe = class {
  constructor(e2) {
    ["spaceId", "clientSecret"].forEach((t2) => {
      if (!Object.prototype.hasOwnProperty.call(e2, t2))
        throw new Error(`${t2} required`);
    }), this.config = Object.assign({}, { endpoint: 0 === e2.spaceId.indexOf("mp-") ? "https://api.next.bspapp.com" : "https://api.bspapp.com" }, e2), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = ne, this._getAccessTokenPromiseHub = new I({ createPromise: () => this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e3) => {
      if (!e3.result || !e3.result.accessToken)
        throw new te({ code: "AUTH_FAILED", message: "获取accessToken失败" });
      this.setAccessToken(e3.result.accessToken);
    }), retryRule: v });
  }
  get hasAccessToken() {
    return !!this.accessToken;
  }
  setAccessToken(e2) {
    this.accessToken = e2;
  }
  requestWrapped(e2) {
    return de.wrappedRequest(e2, this.adapter.request);
  }
  requestAuth(e2) {
    return this.requestWrapped(e2);
  }
  request(e2, t2) {
    return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e2) : this.requestWrapped(e2).catch((t3) => new Promise((e3, n2) => {
      !t3 || "GATEWAY_INVALID_TOKEN" !== t3.code && "InvalidParameter.InvalidToken" !== t3.code ? n2(t3) : e3();
    }).then(() => this.getAccessToken()).then(() => {
      const t4 = this.rebuildRequest(e2);
      return this.request(t4, true);
    })) : this.getAccessToken().then(() => {
      const t3 = this.rebuildRequest(e2);
      return this.request(t3, true);
    }));
  }
  rebuildRequest(e2) {
    const t2 = Object.assign({}, e2);
    return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = de.sign(t2.data, this.config.clientSecret), t2;
  }
  setupRequest(e2, t2) {
    const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
    return "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = de.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
  }
  getAccessToken() {
    return this._getAccessTokenPromiseHub.exec();
  }
  async authorize() {
    await this.getAccessToken();
  }
  callFunction(e2) {
    const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
    return this.request({ ...this.setupRequest(t2), timeout: e2.timeout });
  }
  getOSSUploadOptionsFromPath(e2) {
    const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
    return this.request(this.setupRequest(t2));
  }
  uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: i2 }) {
    return new Promise((o2, a2) => {
      const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e3) {
        e3 && e3.statusCode < 400 ? o2(e3) : a2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }, fail(e3) {
        a2(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
      } });
      "function" == typeof i2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
        i2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
      });
    });
  }
  reportOSSUpload(e2) {
    const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
    return this.request(this.setupRequest(t2));
  }
  async uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", cloudPathAsRealPath: s2 = false, onUploadProgress: r2, config: i2 }) {
    if ("string" !== g(t2))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
    if (!(t2 = t2.trim()))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
    if (/:\/\//.test(t2))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath不合法" });
    const o2 = i2 && i2.envType || this.config.envType;
    if (s2 && ("/" !== t2[0] && (t2 = "/" + t2), t2.indexOf("\\") > -1))
      throw new te({ code: "INVALID_PARAM", message: "使用cloudPath作为路径时，cloudPath不可包含“\\”" });
    const a2 = (await this.getOSSUploadOptionsFromPath({ env: o2, filename: s2 ? t2.split("/").pop() : t2, fileId: s2 ? t2 : void 0 })).result, c2 = "https://" + a2.cdnDomain + "/" + a2.ossPath, { securityToken: u2, accessKeyId: h2, signature: l2, host: d2, ossPath: p2, id: f2, policy: m2, ossCallbackUrl: y2 } = a2, _2 = { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: h2, Signature: l2, host: d2, id: f2, key: p2, policy: m2, success_action_status: 200 };
    if (u2 && (_2["x-oss-security-token"] = u2), y2) {
      const e3 = JSON.stringify({ callbackUrl: y2, callbackBody: JSON.stringify({ fileId: f2, spaceId: this.config.spaceId }), callbackBodyType: "application/json" });
      _2.callback = de.toBase64(e3);
    }
    const w2 = { url: "https://" + a2.host, formData: _2, fileName: "file", name: "file", filePath: e2, fileType: n2 };
    if (await this.uploadFileToOSS(Object.assign({}, w2, { onUploadProgress: r2 })), y2)
      return { success: true, filePath: e2, fileID: c2 };
    if ((await this.reportOSSUpload({ id: f2 })).success)
      return { success: true, filePath: e2, fileID: c2 };
    throw new te({ code: "UPLOAD_FAILED", message: "文件上传失败" });
  }
  getTempFileURL({ fileList: e2 } = {}) {
    return new Promise((t2, n2) => {
      Array.isArray(e2) && 0 !== e2.length || n2(new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" })), t2({ fileList: e2.map((e3) => ({ fileID: e3, tempFileURL: e3 })) });
    });
  }
  async getFileInfo({ fileList: e2 } = {}) {
    if (!Array.isArray(e2) || 0 === e2.length)
      throw new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
    const t2 = { method: "serverless.file.resource.info", params: JSON.stringify({ id: e2.map((e3) => e3.split("?")[0]).join(",") }) };
    return { fileList: (await this.request(this.setupRequest(t2))).result };
  }
};
var fe = { init(e2) {
  const t2 = new pe(e2), n2 = { signInAnonymously: function() {
    return t2.authorize();
  }, getLoginState: function() {
    return Promise.resolve(false);
  } };
  return t2.auth = function() {
    return n2;
  }, t2.customAuth = t2.auth, t2;
} };
const ge = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
var me;
!function(e2) {
  e2.local = "local", e2.none = "none", e2.session = "session";
}(me || (me = {}));
var ye = function() {
}, _e = n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = r, function(e3) {
    var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, i2 = s2.Hasher, o2 = t3.algo, a2 = [], c2 = [];
    !function() {
      function t4(t5) {
        for (var n4 = e3.sqrt(t5), s4 = 2; s4 <= n4; s4++)
          if (!(t5 % s4))
            return false;
        return true;
      }
      function n3(e4) {
        return 4294967296 * (e4 - (0 | e4)) | 0;
      }
      for (var s3 = 2, r3 = 0; r3 < 64; )
        t4(s3) && (r3 < 8 && (a2[r3] = n3(e3.pow(s3, 0.5))), c2[r3] = n3(e3.pow(s3, 1 / 3)), r3++), s3++;
    }();
    var u2 = [], h2 = o2.SHA256 = i2.extend({ _doReset: function() {
      this._hash = new r2.init(a2.slice(0));
    }, _doProcessBlock: function(e4, t4) {
      for (var n3 = this._hash.words, s3 = n3[0], r3 = n3[1], i3 = n3[2], o3 = n3[3], a3 = n3[4], h3 = n3[5], l2 = n3[6], d2 = n3[7], p2 = 0; p2 < 64; p2++) {
        if (p2 < 16)
          u2[p2] = 0 | e4[t4 + p2];
        else {
          var f2 = u2[p2 - 15], g2 = (f2 << 25 | f2 >>> 7) ^ (f2 << 14 | f2 >>> 18) ^ f2 >>> 3, m2 = u2[p2 - 2], y2 = (m2 << 15 | m2 >>> 17) ^ (m2 << 13 | m2 >>> 19) ^ m2 >>> 10;
          u2[p2] = g2 + u2[p2 - 7] + y2 + u2[p2 - 16];
        }
        var _2 = s3 & r3 ^ s3 & i3 ^ r3 & i3, w2 = (s3 << 30 | s3 >>> 2) ^ (s3 << 19 | s3 >>> 13) ^ (s3 << 10 | s3 >>> 22), v2 = d2 + ((a3 << 26 | a3 >>> 6) ^ (a3 << 21 | a3 >>> 11) ^ (a3 << 7 | a3 >>> 25)) + (a3 & h3 ^ ~a3 & l2) + c2[p2] + u2[p2];
        d2 = l2, l2 = h3, h3 = a3, a3 = o3 + v2 | 0, o3 = i3, i3 = r3, r3 = s3, s3 = v2 + (w2 + _2) | 0;
      }
      n3[0] = n3[0] + s3 | 0, n3[1] = n3[1] + r3 | 0, n3[2] = n3[2] + i3 | 0, n3[3] = n3[3] + o3 | 0, n3[4] = n3[4] + a3 | 0, n3[5] = n3[5] + h3 | 0, n3[6] = n3[6] + l2 | 0, n3[7] = n3[7] + d2 | 0;
    }, _doFinalize: function() {
      var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
      return n3[r3 >>> 5] |= 128 << 24 - r3 % 32, n3[14 + (r3 + 64 >>> 9 << 4)] = e3.floor(s3 / 4294967296), n3[15 + (r3 + 64 >>> 9 << 4)] = s3, t4.sigBytes = 4 * n3.length, this._process(), this._hash;
    }, clone: function() {
      var e4 = i2.clone.call(this);
      return e4._hash = this._hash.clone(), e4;
    } });
    t3.SHA256 = i2._createHelper(h2), t3.HmacSHA256 = i2._createHmacHelper(h2);
  }(Math), n2.SHA256);
}), we = _e, ve = n(function(e2, t2) {
  e2.exports = r.HmacSHA256;
});
const Ie = () => {
  let e2;
  if (!Promise) {
    e2 = () => {
    }, e2.promise = {};
    const t3 = () => {
      throw new te({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
    };
    return Object.defineProperty(e2.promise, "then", { get: t3 }), Object.defineProperty(e2.promise, "catch", { get: t3 }), e2;
  }
  const t2 = new Promise((t3, n2) => {
    e2 = (e3, s2) => e3 ? n2(e3) : t3(s2);
  });
  return e2.promise = t2, e2;
};
function Se(e2) {
  return void 0 === e2;
}
function Te(e2) {
  return "[object Null]" === Object.prototype.toString.call(e2);
}
function be(e2 = "") {
  return e2.replace(/([\s\S]+)\s+(请前往云开发AI小助手查看问题：.*)/, "$1");
}
function Ee(e2 = 32) {
  const t2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let n2 = "";
  for (let s2 = 0; s2 < e2; s2++)
    n2 += t2.charAt(Math.floor(62 * Math.random()));
  return n2;
}
var ke;
function Pe(e2) {
  const t2 = (n2 = e2, "[object Array]" === Object.prototype.toString.call(n2) ? e2 : [e2]);
  var n2;
  for (const e3 of t2) {
    const { isMatch: t3, genAdapter: n3, runtime: s2 } = e3;
    if (t3())
      return { adapter: n3(), runtime: s2 };
  }
}
!function(e2) {
  e2.WEB = "web", e2.WX_MP = "wx_mp";
}(ke || (ke = {}));
const Ce = { adapter: null, runtime: void 0 }, Ae = ["anonymousUuidKey"];
class Oe extends ye {
  constructor() {
    super(), Ce.adapter.root.tcbObject || (Ce.adapter.root.tcbObject = {});
  }
  setItem(e2, t2) {
    Ce.adapter.root.tcbObject[e2] = t2;
  }
  getItem(e2) {
    return Ce.adapter.root.tcbObject[e2];
  }
  removeItem(e2) {
    delete Ce.adapter.root.tcbObject[e2];
  }
  clear() {
    delete Ce.adapter.root.tcbObject;
  }
}
function xe(e2, t2) {
  switch (e2) {
    case "local":
      return t2.localStorage || new Oe();
    case "none":
      return new Oe();
    default:
      return t2.sessionStorage || new Oe();
  }
}
class Ne {
  constructor(e2) {
    if (!this._storage) {
      this._persistence = Ce.adapter.primaryStorage || e2.persistence, this._storage = xe(this._persistence, Ce.adapter);
      const t2 = `access_token_${e2.env}`, n2 = `access_token_expire_${e2.env}`, s2 = `refresh_token_${e2.env}`, r2 = `anonymous_uuid_${e2.env}`, i2 = `login_type_${e2.env}`, o2 = "device_id", a2 = `token_type_${e2.env}`, c2 = `user_info_${e2.env}`;
      this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: r2, loginTypeKey: i2, userInfoKey: c2, deviceIdKey: o2, tokenTypeKey: a2 };
    }
  }
  updatePersistence(e2) {
    if (e2 === this._persistence)
      return;
    const t2 = "local" === this._persistence;
    this._persistence = e2;
    const n2 = xe(e2, Ce.adapter);
    for (const e3 in this.keys) {
      const s2 = this.keys[e3];
      if (t2 && Ae.includes(e3))
        continue;
      const r2 = this._storage.getItem(s2);
      Se(r2) || Te(r2) || (n2.setItem(s2, r2), this._storage.removeItem(s2));
    }
    this._storage = n2;
  }
  setStore(e2, t2, n2) {
    if (!this._storage)
      return;
    const s2 = { version: n2 || "localCachev1", content: t2 }, r2 = JSON.stringify(s2);
    try {
      this._storage.setItem(e2, r2);
    } catch (e3) {
      throw e3;
    }
  }
  getStore(e2, t2) {
    try {
      if (!this._storage)
        return;
    } catch (e3) {
      return "";
    }
    t2 = t2 || "localCachev1";
    const n2 = this._storage.getItem(e2);
    if (!n2)
      return "";
    if (n2.indexOf(t2) >= 0) {
      return JSON.parse(n2).content;
    }
    return "";
  }
  removeStore(e2) {
    this._storage.removeItem(e2);
  }
}
const Re = {}, Le = {};
function Ue(e2) {
  return Re[e2];
}
class De {
  constructor(e2, t2) {
    this.data = t2 || null, this.name = e2;
  }
}
class Me extends De {
  constructor(e2, t2) {
    super("error", { error: e2, data: t2 }), this.error = e2;
  }
}
const qe = new class {
  constructor() {
    this._listeners = {};
  }
  on(e2, t2) {
    return function(e3, t3, n2) {
      n2[e3] = n2[e3] || [], n2[e3].push(t3);
    }(e2, t2, this._listeners), this;
  }
  off(e2, t2) {
    return function(e3, t3, n2) {
      if (n2 && n2[e3]) {
        const s2 = n2[e3].indexOf(t3);
        -1 !== s2 && n2[e3].splice(s2, 1);
      }
    }(e2, t2, this._listeners), this;
  }
  fire(e2, t2) {
    if (e2 instanceof Me)
      return console.error(e2.error), this;
    const n2 = "string" == typeof e2 ? new De(e2, t2 || {}) : e2;
    const s2 = n2.name;
    if (this._listens(s2)) {
      n2.target = this;
      const e3 = this._listeners[s2] ? [...this._listeners[s2]] : [];
      for (const t3 of e3)
        t3.call(this, n2);
    }
    return this;
  }
  _listens(e2) {
    return this._listeners[e2] && this._listeners[e2].length > 0;
  }
}();
function Fe(e2, t2) {
  qe.on(e2, t2);
}
function Ke(e2, t2 = {}) {
  qe.fire(e2, t2);
}
function je(e2, t2) {
  qe.off(e2, t2);
}
const $e = "loginStateChanged", Be = "loginStateExpire", We = "loginTypeChanged", He = "anonymousConverted", Je = "refreshAccessToken";
var ze;
!function(e2) {
  e2.ANONYMOUS = "ANONYMOUS", e2.WECHAT = "WECHAT", e2.WECHAT_PUBLIC = "WECHAT-PUBLIC", e2.WECHAT_OPEN = "WECHAT-OPEN", e2.CUSTOM = "CUSTOM", e2.EMAIL = "EMAIL", e2.USERNAME = "USERNAME", e2.NULL = "NULL";
}(ze || (ze = {}));
class Ve {
  constructor() {
    this._fnPromiseMap = /* @__PURE__ */ new Map();
  }
  async run(e2, t2) {
    let n2 = this._fnPromiseMap.get(e2);
    return n2 || (n2 = new Promise(async (n3, s2) => {
      try {
        await this._runIdlePromise();
        const e3 = t2();
        n3(await e3);
      } catch (e3) {
        s2(e3);
      } finally {
        this._fnPromiseMap.delete(e2);
      }
    }), this._fnPromiseMap.set(e2, n2)), n2;
  }
  _runIdlePromise() {
    return Promise.resolve();
  }
}
class Ge {
  constructor(e2) {
    this._singlePromise = new Ve(), this._cache = Ue(e2.env), this._baseURL = `https://${e2.env}.ap-shanghai.tcb-api.tencentcloudapi.com`, this._reqClass = new Ce.adapter.reqClass({ timeout: e2.timeout, timeoutMsg: `请求在${e2.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] });
  }
  _getDeviceId() {
    if (this._deviceID)
      return this._deviceID;
    const { deviceIdKey: e2 } = this._cache.keys;
    let t2 = this._cache.getStore(e2);
    return "string" == typeof t2 && t2.length >= 16 && t2.length <= 48 || (t2 = Ee(), this._cache.setStore(e2, t2)), this._deviceID = t2, t2;
  }
  async _request(e2, t2, n2 = {}) {
    const s2 = { "x-request-id": Ee(), "x-device-id": this._getDeviceId() };
    if (n2.withAccessToken) {
      const { tokenTypeKey: e3 } = this._cache.keys, t3 = await this.getAccessToken(), n3 = this._cache.getStore(e3);
      s2.authorization = `${n3} ${t3}`;
    }
    return this._reqClass["get" === n2.method ? "get" : "post"]({ url: `${this._baseURL}${e2}`, data: t2, headers: s2 });
  }
  async _fetchAccessToken() {
    const { loginTypeKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2, tokenTypeKey: s2 } = this._cache.keys, r2 = this._cache.getStore(e2);
    if (r2 && r2 !== ze.ANONYMOUS)
      throw new te({ code: "INVALID_OPERATION", message: "非匿名登录不支持刷新 access token" });
    const i2 = await this._singlePromise.run("fetchAccessToken", async () => (await this._request("/auth/v1/signin/anonymously", {}, { method: "post" })).data), { access_token: o2, expires_in: a2, token_type: c2 } = i2;
    return this._cache.setStore(s2, c2), this._cache.setStore(t2, o2), this._cache.setStore(n2, Date.now() + 1e3 * a2), o2;
  }
  isAccessTokenExpired(e2, t2) {
    let n2 = true;
    return e2 && t2 && (n2 = t2 < Date.now()), n2;
  }
  async getAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2), s2 = this._cache.getStore(t2);
    return this.isAccessTokenExpired(n2, s2) ? this._fetchAccessToken() : n2;
  }
  async refreshAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2, loginTypeKey: n2 } = this._cache.keys;
    return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.setStore(n2, ze.ANONYMOUS), this.getAccessToken();
  }
  async getUserInfo() {
    return this._singlePromise.run("getUserInfo", async () => (await this._request("/auth/v1/user/me", {}, { withAccessToken: true, method: "get" })).data);
  }
}
const Ye = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], Qe = { "X-SDK-Version": "1.3.5" };
function Xe(e2, t2, n2) {
  const s2 = e2[t2];
  e2[t2] = function(t3) {
    const r2 = {}, i2 = {};
    n2.forEach((n3) => {
      const { data: s3, headers: o3 } = n3.call(e2, t3);
      Object.assign(r2, s3), Object.assign(i2, o3);
    });
    const o2 = t3.data;
    return o2 && (() => {
      var e3;
      if (e3 = o2, "[object FormData]" !== Object.prototype.toString.call(e3))
        t3.data = { ...o2, ...r2 };
      else
        for (const e4 in r2)
          o2.append(e4, r2[e4]);
    })(), t3.headers = { ...t3.headers || {}, ...i2 }, s2.call(e2, t3);
  };
}
function Ze() {
  const e2 = Math.random().toString(16).slice(2);
  return { data: { seqId: e2 }, headers: { ...Qe, "x-seqid": e2 } };
}
class et {
  constructor(e2 = {}) {
    var t2;
    this.config = e2, this._reqClass = new Ce.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `请求在${this.config.timeout / 1e3}s内未完成，已中断`, restrictedMethods: ["post"] }), this._cache = Ue(this.config.env), this._localCache = (t2 = this.config.env, Le[t2]), this.oauth = new Ge(this.config), Xe(this._reqClass, "post", [Ze]), Xe(this._reqClass, "upload", [Ze]), Xe(this._reqClass, "download", [Ze]);
  }
  async post(e2) {
    return await this._reqClass.post(e2);
  }
  async upload(e2) {
    return await this._reqClass.upload(e2);
  }
  async download(e2) {
    return await this._reqClass.download(e2);
  }
  async refreshAccessToken() {
    let e2, t2;
    this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
    try {
      e2 = await this._refreshAccessTokenPromise;
    } catch (e3) {
      t2 = e3;
    }
    if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
      throw t2;
    return e2;
  }
  async _refreshAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: r2 } = this._cache.keys;
    this._cache.removeStore(e2), this._cache.removeStore(t2);
    let i2 = this._cache.getStore(n2);
    if (!i2)
      throw new te({ message: "未登录CloudBase" });
    const o2 = { refresh_token: i2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", o2);
    if (a2.data.code) {
      const { code: e3 } = a2.data;
      if ("SIGN_PARAM_INVALID" === e3 || "REFRESH_TOKEN_EXPIRED" === e3 || "INVALID_REFRESH_TOKEN" === e3) {
        if (this._cache.getStore(s2) === ze.ANONYMOUS && "INVALID_REFRESH_TOKEN" === e3) {
          const e4 = this._cache.getStore(r2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e4, refresh_token: t3 });
          return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
        }
        Ke(Be), this._cache.removeStore(n2);
      }
      throw new te({ code: a2.data.code, message: `刷新access token失败：${a2.data.code}` });
    }
    if (a2.data.access_token)
      return Ke(Je), this._cache.setStore(e2, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
    a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
  }
  async getAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
    if (!this._cache.getStore(n2))
      throw new te({ message: "refresh token不存在，登录状态异常" });
    let s2 = this._cache.getStore(e2), r2 = this._cache.getStore(t2), i2 = true;
    return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, r2) && (i2 = false), (!s2 || !r2 || r2 < Date.now()) && i2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: r2 };
  }
  async request(e2, t2, n2) {
    const s2 = `x-tcb-trace_${this.config.env}`;
    let r2 = "application/x-www-form-urlencoded";
    const i2 = { action: e2, env: this.config.env, dataVersion: "2019-08-16", ...t2 };
    let o2;
    if (-1 === Ye.indexOf(e2) && (this._cache.keys, i2.access_token = await this.oauth.getAccessToken()), "storage.uploadFile" === e2) {
      o2 = new FormData();
      for (let e3 in o2)
        o2.hasOwnProperty(e3) && void 0 !== o2[e3] && o2.append(e3, i2[e3]);
      r2 = "multipart/form-data";
    } else {
      r2 = "application/json", o2 = {};
      for (let e3 in i2)
        void 0 !== i2[e3] && (o2[e3] = i2[e3]);
    }
    let a2 = { headers: { "content-type": r2 } };
    n2 && n2.timeout && (a2.timeout = n2.timeout), n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
    const c2 = this._localCache.getStore(s2);
    c2 && (a2.headers["X-TCB-Trace"] = c2);
    const { parse: u2, inQuery: h2, search: l2 } = t2;
    let d2 = { env: this.config.env };
    u2 && (d2.parse = true), h2 && (d2 = { ...h2, ...d2 });
    let p2 = function(e3, t3, n3 = {}) {
      const s3 = /\?/.test(t3);
      let r3 = "";
      for (let e4 in n3)
        "" === r3 ? !s3 && (t3 += "?") : r3 += "&", r3 += `${e4}=${encodeURIComponent(n3[e4])}`;
      return /^http(s)?\:\/\//.test(t3 += r3) ? t3 : `${e3}${t3}`;
    }(ge, "//tcb-api.tencentcloudapi.com/web", d2);
    l2 && (p2 += l2);
    const f2 = await this.post({ url: p2, data: o2, ...a2 }), g2 = f2.header && f2.header["x-tcb-trace"];
    if (g2 && this._localCache.setStore(s2, g2), 200 !== Number(f2.status) && 200 !== Number(f2.statusCode) || !f2.data)
      throw new te({ code: "NETWORK_ERROR", message: "network request error" });
    return f2;
  }
  async send(e2, t2 = {}, n2 = {}) {
    const s2 = await this.request(e2, t2, { ...n2, onUploadProgress: t2.onUploadProgress });
    if (("ACCESS_TOKEN_DISABLED" === s2.data.code || "ACCESS_TOKEN_EXPIRED" === s2.data.code) && -1 === Ye.indexOf(e2)) {
      await this.oauth.refreshAccessToken();
      const s3 = await this.request(e2, t2, { ...n2, onUploadProgress: t2.onUploadProgress });
      if (s3.data.code)
        throw new te({ code: s3.data.code, message: be(s3.data.message) });
      return s3.data;
    }
    if (s2.data.code)
      throw new te({ code: s2.data.code, message: be(s2.data.message) });
    return s2.data;
  }
  setRefreshToken(e2) {
    const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
  }
}
const tt = {};
function nt(e2) {
  return tt[e2];
}
class st {
  constructor(e2) {
    this.config = e2, this._cache = Ue(e2.env), this._request = nt(e2.env);
  }
  setRefreshToken(e2) {
    const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
  }
  setAccessToken(e2, t2) {
    const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
    this._cache.setStore(n2, e2), this._cache.setStore(s2, t2);
  }
  async refreshUserInfo() {
    const { data: e2 } = await this._request.send("auth.getUserInfo", {});
    return this.setLocalUserInfo(e2), e2;
  }
  setLocalUserInfo(e2) {
    const { userInfoKey: t2 } = this._cache.keys;
    this._cache.setStore(t2, e2);
  }
}
class rt {
  constructor(e2) {
    if (!e2)
      throw new te({ code: "PARAM_ERROR", message: "envId is not defined" });
    this._envId = e2, this._cache = Ue(this._envId), this._request = nt(this._envId), this.setUserInfo();
  }
  linkWithTicket(e2) {
    if ("string" != typeof e2)
      throw new te({ code: "PARAM_ERROR", message: "ticket must be string" });
    return this._request.send("auth.linkWithTicket", { ticket: e2 });
  }
  linkWithRedirect(e2) {
    e2.signInWithRedirect();
  }
  updatePassword(e2, t2) {
    return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e2 });
  }
  updateEmail(e2) {
    return this._request.send("auth.updateEmail", { newEmail: e2 });
  }
  updateUsername(e2) {
    if ("string" != typeof e2)
      throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
    return this._request.send("auth.updateUsername", { username: e2 });
  }
  async getLinkedUidList() {
    const { data: e2 } = await this._request.send("auth.getLinkedUidList", {});
    let t2 = false;
    const { users: n2 } = e2;
    return n2.forEach((e3) => {
      e3.wxOpenId && e3.wxPublicId && (t2 = true);
    }), { users: n2, hasPrimaryUid: t2 };
  }
  setPrimaryUid(e2) {
    return this._request.send("auth.setPrimaryUid", { uid: e2 });
  }
  unlink(e2) {
    return this._request.send("auth.unlink", { platform: e2 });
  }
  async update(e2) {
    const { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 } = e2, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: i2, city: o2 });
    this.setLocalUserInfo(a2);
  }
  async refresh() {
    const e2 = await this._request.oauth.getUserInfo();
    return this.setLocalUserInfo(e2), e2;
  }
  setUserInfo() {
    const { userInfoKey: e2 } = this._cache.keys, t2 = this._cache.getStore(e2);
    ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e3) => {
      this[e3] = t2[e3];
    }), this.location = { country: t2.country, province: t2.province, city: t2.city };
  }
  setLocalUserInfo(e2) {
    const { userInfoKey: t2 } = this._cache.keys;
    this._cache.setStore(t2, e2), this.setUserInfo();
  }
}
class it {
  constructor(e2) {
    if (!e2)
      throw new te({ code: "PARAM_ERROR", message: "envId is not defined" });
    this._cache = Ue(e2);
    const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, r2 = this._cache.getStore(t2), i2 = this._cache.getStore(n2), o2 = this._cache.getStore(s2);
    this.credential = { refreshToken: r2, accessToken: i2, accessTokenExpire: o2 }, this.user = new rt(e2);
  }
  get isAnonymousAuth() {
    return this.loginType === ze.ANONYMOUS;
  }
  get isCustomAuth() {
    return this.loginType === ze.CUSTOM;
  }
  get isWeixinAuth() {
    return this.loginType === ze.WECHAT || this.loginType === ze.WECHAT_OPEN || this.loginType === ze.WECHAT_PUBLIC;
  }
  get loginType() {
    return this._cache.getStore(this._cache.keys.loginTypeKey);
  }
}
class ot extends st {
  async signIn() {
    this._cache.updatePersistence("local"), await this._request.oauth.getAccessToken(), Ke($e), Ke(We, { env: this.config.env, loginType: ze.ANONYMOUS, persistence: "local" });
    const e2 = new it(this.config.env);
    return await e2.user.refresh(), e2;
  }
  async linkAndRetrieveDataWithTicket(e2) {
    const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), i2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: r2, ticket: e2 });
    if (i2.refresh_token)
      return this._clearAnonymousUUID(), this.setRefreshToken(i2.refresh_token), await this._request.refreshAccessToken(), Ke(He, { env: this.config.env }), Ke(We, { loginType: ze.CUSTOM, persistence: "local" }), { credential: { refreshToken: i2.refresh_token } };
    throw new te({ message: "匿名转化失败" });
  }
  _setAnonymousUUID(e2) {
    const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.setStore(t2, e2), this._cache.setStore(n2, ze.ANONYMOUS);
  }
  _clearAnonymousUUID() {
    this._cache.removeStore(this._cache.keys.anonymousUuidKey);
  }
}
class at extends st {
  async signIn(e2) {
    if ("string" != typeof e2)
      throw new te({ code: "PARAM_ERROR", message: "ticket must be a string" });
    const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e2, refresh_token: this._cache.getStore(t2) || "" });
    if (n2.refresh_token)
      return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), Ke($e), Ke(We, { env: this.config.env, loginType: ze.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new it(this.config.env);
    throw new te({ message: "自定义登录失败" });
  }
}
class ct extends st {
  async signIn(e2, t2) {
    if ("string" != typeof e2)
      throw new te({ code: "PARAM_ERROR", message: "email must be a string" });
    const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token: i2, access_token_expire: o2 } = s2;
    if (r2)
      return this.setRefreshToken(r2), i2 && o2 ? this.setAccessToken(i2, o2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Ke($e), Ke(We, { env: this.config.env, loginType: ze.EMAIL, persistence: this.config.persistence }), new it(this.config.env);
    throw s2.code ? new te({ code: s2.code, message: `邮箱登录失败: ${s2.message}` }) : new te({ message: "邮箱登录失败" });
  }
  async activate(e2) {
    return this._request.send("auth.activateEndUserMail", { token: e2 });
  }
  async resetPasswordWithToken(e2, t2) {
    return this._request.send("auth.resetPasswordWithToken", { token: e2, newPassword: t2 });
  }
}
class ut extends st {
  async signIn(e2, t2) {
    if ("string" != typeof e2)
      throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
    "string" != typeof t2 && (t2 = "", console.warn("password is empty"));
    const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: ze.USERNAME, username: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token_expire: i2, access_token: o2 } = s2;
    if (r2)
      return this.setRefreshToken(r2), o2 && i2 ? this.setAccessToken(o2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Ke($e), Ke(We, { env: this.config.env, loginType: ze.USERNAME, persistence: this.config.persistence }), new it(this.config.env);
    throw s2.code ? new te({ code: s2.code, message: `用户名密码登录失败: ${s2.message}` }) : new te({ message: "用户名密码登录失败" });
  }
}
class ht {
  constructor(e2) {
    this.config = e2, this._cache = Ue(e2.env), this._request = nt(e2.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), Fe(We, this._onLoginTypeChanged);
  }
  get currentUser() {
    const e2 = this.hasLoginState();
    return e2 && e2.user || null;
  }
  get loginType() {
    return this._cache.getStore(this._cache.keys.loginTypeKey);
  }
  anonymousAuthProvider() {
    return new ot(this.config);
  }
  customAuthProvider() {
    return new at(this.config);
  }
  emailAuthProvider() {
    return new ct(this.config);
  }
  usernameAuthProvider() {
    return new ut(this.config);
  }
  async signInAnonymously() {
    return new ot(this.config).signIn();
  }
  async signInWithEmailAndPassword(e2, t2) {
    return new ct(this.config).signIn(e2, t2);
  }
  signInWithUsernameAndPassword(e2, t2) {
    return new ut(this.config).signIn(e2, t2);
  }
  async linkAndRetrieveDataWithTicket(e2) {
    this._anonymousAuthProvider || (this._anonymousAuthProvider = new ot(this.config)), Fe(He, this._onAnonymousConverted);
    return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e2);
  }
  async signOut() {
    if (this.loginType === ze.ANONYMOUS)
      throw new te({ message: "匿名用户不支持登出操作" });
    const { refreshTokenKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e2);
    if (!s2)
      return;
    const r2 = await this._request.send("auth.logout", { refresh_token: s2 });
    return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.removeStore(n2), Ke($e), Ke(We, { env: this.config.env, loginType: ze.NULL, persistence: this.config.persistence }), r2;
  }
  async signUpWithEmailAndPassword(e2, t2) {
    return this._request.send("auth.signUpWithEmailAndPassword", { email: e2, password: t2 });
  }
  async sendPasswordResetEmail(e2) {
    return this._request.send("auth.sendPasswordResetEmail", { email: e2 });
  }
  onLoginStateChanged(e2) {
    Fe($e, () => {
      const t3 = this.hasLoginState();
      e2.call(this, t3);
    });
    const t2 = this.hasLoginState();
    e2.call(this, t2);
  }
  onLoginStateExpired(e2) {
    Fe(Be, e2.bind(this));
  }
  onAccessTokenRefreshed(e2) {
    Fe(Je, e2.bind(this));
  }
  onAnonymousConverted(e2) {
    Fe(He, e2.bind(this));
  }
  onLoginTypeChanged(e2) {
    Fe(We, () => {
      const t2 = this.hasLoginState();
      e2.call(this, t2);
    });
  }
  async getAccessToken() {
    return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
  }
  hasLoginState() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2), s2 = this._cache.getStore(t2);
    return this._request.oauth.isAccessTokenExpired(n2, s2) ? null : new it(this.config.env);
  }
  async isUsernameRegistered(e2) {
    if ("string" != typeof e2)
      throw new te({ code: "PARAM_ERROR", message: "username must be a string" });
    const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e2 });
    return t2 && t2.isRegistered;
  }
  getLoginState() {
    return Promise.resolve(this.hasLoginState());
  }
  async signInWithTicket(e2) {
    return new at(this.config).signIn(e2);
  }
  shouldRefreshAccessToken(e2) {
    this._request._shouldRefreshAccessTokenHook = e2.bind(this);
  }
  getUserInfo() {
    return this._request.send("auth.getUserInfo", {}).then((e2) => e2.code ? e2 : { ...e2.data, requestId: e2.seqId });
  }
  getAuthHeader() {
    const { refreshTokenKey: e2, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2);
    return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
  }
  _onAnonymousConverted(e2) {
    const { env: t2 } = e2.data;
    t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
  }
  _onLoginTypeChanged(e2) {
    const { loginType: t2, persistence: n2, env: s2 } = e2.data;
    s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
  }
}
const lt = function(e2, t2) {
  t2 = t2 || Ie();
  const n2 = nt(this.config.env), { cloudPath: s2, filePath: r2, onUploadProgress: i2, fileType: o2 = "image" } = e2;
  return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
    const { data: { url: a2, authorization: c2, token: u2, fileId: h2, cosFileId: l2 }, requestId: d2 } = e3, p2 = { key: s2, signature: c2, "x-cos-meta-fileid": l2, success_action_status: "201", "x-cos-security-token": u2 };
    n2.upload({ url: a2, data: p2, file: r2, name: s2, fileType: o2, onUploadProgress: i2 }).then((e4) => {
      201 === e4.statusCode ? t2(null, { fileID: h2, requestId: d2 }) : t2(new te({ code: "STORAGE_REQUEST_FAIL", message: `STORAGE_REQUEST_FAIL: ${e4.data}` }));
    }).catch((e4) => {
      t2(e4);
    });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, dt = function(e2, t2) {
  t2 = t2 || Ie();
  const n2 = nt(this.config.env), { cloudPath: s2 } = e2;
  return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
    t2(null, e3);
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, pt = function({ fileList: e2 }, t2) {
  if (t2 = t2 || Ie(), !e2 || !Array.isArray(e2))
    return { code: "INVALID_PARAM", message: "fileList必须是非空的数组" };
  for (let t3 of e2)
    if (!t3 || "string" != typeof t3)
      return { code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" };
  const n2 = { fileid_list: e2 };
  return nt(this.config.env).send("storage.batchDeleteFile", n2).then((e3) => {
    e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.delete_list, requestId: e3.requestId });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, ft = function({ fileList: e2 }, t2) {
  t2 = t2 || Ie(), e2 && Array.isArray(e2) || t2(null, { code: "INVALID_PARAM", message: "fileList必须是非空的数组" });
  let n2 = [];
  for (let s3 of e2)
    "object" == typeof s3 ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是包含fileID和maxAge的对象" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : "string" == typeof s3 ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList的元素必须是字符串" });
  const s2 = { file_list: n2 };
  return nt(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e3) => {
    e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.download_list, requestId: e3.requestId });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, gt = async function({ fileID: e2 }, t2) {
  const n2 = (await ft.call(this, { fileList: [{ fileID: e2, maxAge: 600 }] })).fileList[0];
  if ("SUCCESS" !== n2.code)
    return t2 ? t2(n2) : new Promise((e3) => {
      e3(n2);
    });
  const s2 = nt(this.config.env);
  let r2 = n2.download_url;
  if (r2 = encodeURI(r2), !t2)
    return s2.download({ url: r2 });
  t2(await s2.download({ url: r2 }));
}, mt = function({ name: e2, data: t2, query: n2, parse: s2, search: r2, timeout: i2 }, o2) {
  const a2 = o2 || Ie();
  let c2;
  try {
    c2 = t2 ? JSON.stringify(t2) : "";
  } catch (e3) {
    return Promise.reject(e3);
  }
  if (!e2)
    return Promise.reject(new te({ code: "PARAM_ERROR", message: "函数名不能为空" }));
  const u2 = { inQuery: n2, parse: s2, search: r2, function_name: e2, request_data: c2 };
  return nt(this.config.env).send("functions.invokeFunction", u2, { timeout: i2 }).then((e3) => {
    if (e3.code)
      a2(null, e3);
    else {
      let t3 = e3.data.response_data;
      if (s2)
        a2(null, { result: t3, requestId: e3.requestId });
      else
        try {
          t3 = JSON.parse(e3.data.response_data), a2(null, { result: t3, requestId: e3.requestId });
        } catch (e4) {
          a2(new te({ message: "response data must be json" }));
        }
    }
    return a2.promise;
  }).catch((e3) => {
    a2(e3);
  }), a2.promise;
}, yt = { timeout: 15e3, persistence: "session" }, _t = 6e5, wt = {};
class vt {
  constructor(e2) {
    this.config = e2 || this.config, this.authObj = void 0;
  }
  init(e2) {
    switch (Ce.adapter || (this.requestClient = new Ce.adapter.reqClass({ timeout: e2.timeout || 5e3, timeoutMsg: `请求在${(e2.timeout || 5e3) / 1e3}s内未完成，已中断` })), this.config = { ...yt, ...e2 }, true) {
      case this.config.timeout > _t:
        console.warn("timeout大于可配置上限[10分钟]，已重置为上限数值"), this.config.timeout = _t;
        break;
      case this.config.timeout < 100:
        console.warn("timeout小于可配置下限[100ms]，已重置为下限数值"), this.config.timeout = 100;
    }
    return new vt(this.config);
  }
  auth({ persistence: e2 } = {}) {
    if (this.authObj)
      return this.authObj;
    const t2 = e2 || Ce.adapter.primaryStorage || yt.persistence;
    var n2;
    return t2 !== this.config.persistence && (this.config.persistence = t2), function(e3) {
      const { env: t3 } = e3;
      Re[t3] = new Ne(e3), Le[t3] = new Ne({ ...e3, persistence: "local" });
    }(this.config), n2 = this.config, tt[n2.env] = new et(n2), this.authObj = new ht(this.config), this.authObj;
  }
  on(e2, t2) {
    return Fe.apply(this, [e2, t2]);
  }
  off(e2, t2) {
    return je.apply(this, [e2, t2]);
  }
  callFunction(e2, t2) {
    return mt.apply(this, [e2, t2]);
  }
  deleteFile(e2, t2) {
    return pt.apply(this, [e2, t2]);
  }
  getTempFileURL(e2, t2) {
    return ft.apply(this, [e2, t2]);
  }
  downloadFile(e2, t2) {
    return gt.apply(this, [e2, t2]);
  }
  uploadFile(e2, t2) {
    return lt.apply(this, [e2, t2]);
  }
  getUploadMetadata(e2, t2) {
    return dt.apply(this, [e2, t2]);
  }
  registerExtension(e2) {
    wt[e2.name] = e2;
  }
  async invokeExtension(e2, t2) {
    const n2 = wt[e2];
    if (!n2)
      throw new te({ message: `扩展${e2} 必须先注册` });
    return await n2.invoke(t2, this);
  }
  useAdapters(e2) {
    const { adapter: t2, runtime: n2 } = Pe(e2) || {};
    t2 && (Ce.adapter = t2), n2 && (Ce.runtime = n2);
  }
}
var It = new vt();
function St(e2, t2, n2) {
  void 0 === n2 && (n2 = {});
  var s2 = /\?/.test(t2), r2 = "";
  for (var i2 in n2)
    "" === r2 ? !s2 && (t2 += "?") : r2 += "&", r2 += i2 + "=" + encodeURIComponent(n2[i2]);
  return /^http(s)?:\/\//.test(t2 += r2) ? t2 : "" + e2 + t2;
}
class Tt {
  get(e2) {
    const { url: t2, data: n2, headers: s2, timeout: r2 } = e2;
    return new Promise((e3, i2) => {
      ne.request({ url: St("https:", t2), data: n2, method: "GET", header: s2, timeout: r2, success(t3) {
        e3(t3);
      }, fail(e4) {
        i2(e4);
      } });
    });
  }
  post(e2) {
    const { url: t2, data: n2, headers: s2, timeout: r2 } = e2;
    return new Promise((e3, i2) => {
      ne.request({ url: St("https:", t2), data: n2, method: "POST", header: s2, timeout: r2, success(t3) {
        e3(t3);
      }, fail(e4) {
        i2(e4);
      } });
    });
  }
  upload(e2) {
    return new Promise((t2, n2) => {
      const { url: s2, file: r2, data: i2, headers: o2, fileType: a2 } = e2, c2 = ne.uploadFile({ url: St("https:", s2), name: "file", formData: Object.assign({}, i2), filePath: r2, fileType: a2, header: o2, success(e3) {
        const n3 = { statusCode: e3.statusCode, data: e3.data || {} };
        200 === e3.statusCode && i2.success_action_status && (n3.statusCode = parseInt(i2.success_action_status, 10)), t2(n3);
      }, fail(e3) {
        n2(new Error(e3.errMsg || "uploadFile:fail"));
      } });
      "function" == typeof e2.onUploadProgress && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((t3) => {
        e2.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
      });
    });
  }
}
const bt = { setItem(e2, t2) {
  ne.setStorageSync(e2, t2);
}, getItem: (e2) => ne.getStorageSync(e2), removeItem(e2) {
  ne.removeStorageSync(e2);
}, clear() {
  ne.clearStorageSync();
} };
var Et = { genAdapter: function() {
  return { root: {}, reqClass: Tt, localStorage: bt, primaryStorage: "local" };
}, isMatch: function() {
  return true;
}, runtime: "uni_app" };
It.useAdapters(Et);
const kt = It, Pt = kt.init;
kt.init = function(e2) {
  e2.env = e2.spaceId;
  const t2 = Pt.call(this, e2);
  t2.config.provider = "tencent", t2.config.spaceId = e2.spaceId;
  const n2 = t2.auth;
  return t2.auth = function(e3) {
    const t3 = n2.call(this, e3);
    return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e4) => {
      var n3;
      t3[e4] = (n3 = t3[e4], function(e5) {
        e5 = e5 || {};
        const { success: t4, fail: s2, complete: r2 } = ee(e5);
        if (!(t4 || s2 || r2))
          return n3.call(this, e5);
        n3.call(this, e5).then((e6) => {
          t4 && t4(e6), r2 && r2(e6);
        }, (e6) => {
          s2 && s2(e6), r2 && r2(e6);
        });
      }).bind(t3);
    }), t3;
  }, t2.customAuth = t2.auth, t2;
};
var Ct = kt;
async function At(e2, t2) {
  const n2 = `http://${e2}:${t2}/system/ping`;
  try {
    const e3 = await (s2 = { url: n2, timeout: 500 }, new Promise((e4, t3) => {
      ne.request({ ...s2, success(t4) {
        e4(t4);
      }, fail(e5) {
        t3(e5);
      } });
    }));
    return !(!e3.data || 0 !== e3.data.code);
  } catch (e3) {
    return false;
  }
  var s2;
}
async function Ot(e2, t2) {
  let n2;
  for (let s2 = 0; s2 < e2.length; s2++) {
    const r2 = e2[s2];
    if (await At(r2, t2)) {
      n2 = r2;
      break;
    }
  }
  return { address: n2, port: t2 };
}
const xt = { "serverless.file.resource.generateProximalSign": "storage/generate-proximal-sign", "serverless.file.resource.report": "storage/report", "serverless.file.resource.delete": "storage/delete", "serverless.file.resource.getTempFileURL": "storage/get-temp-file-url" };
var Nt = class {
  constructor(e2) {
    if (["spaceId", "clientSecret"].forEach((t2) => {
      if (!Object.prototype.hasOwnProperty.call(e2, t2))
        throw new Error(`${t2} required`);
    }), !e2.endpoint)
      throw new Error("集群空间未配置ApiEndpoint，配置后需要重新关联服务空间后生效");
    this.config = Object.assign({}, e2), this.config.provider = "dcloud", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.adapter = ne;
  }
  async request(e2, t2 = true) {
    return e2 = this.setupRequest(e2), Promise.resolve().then(() => de.wrappedRequest(e2, this.adapter.request));
  }
  requestLocal(e2) {
    return new Promise((t2, n2) => {
      this.adapter.request(Object.assign(e2, { complete(e3) {
        if (e3 || (e3 = {}), !e3.statusCode || e3.statusCode >= 400) {
          const t3 = e3.data && e3.data.code || "SYS_ERR", s2 = e3.data && e3.data.message || "request:fail";
          return n2(new te({ code: t3, message: s2 }));
        }
        t2({ success: true, result: e3.data });
      } }));
    });
  }
  setupRequest(e2) {
    const t2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), n2 = { "Content-Type": "application/json" };
    n2["x-serverless-sign"] = de.sign(t2, this.config.clientSecret);
    const s2 = le();
    n2["x-client-info"] = encodeURIComponent(JSON.stringify(s2));
    const { token: r2 } = re();
    return n2["x-client-token"] = r2, { url: this.config.requestUrl, method: "POST", data: t2, dataType: "json", header: JSON.parse(JSON.stringify(n2)) };
  }
  async setupLocalRequest(e2) {
    const t2 = le(), { token: n2 } = re(), s2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now(), clientInfo: t2, token: n2 }), { address: r2, servePort: i2 } = this.__dev__ && this.__dev__.debugInfo || {}, { address: o2 } = await Ot(r2, i2);
    return { url: `http://${o2}:${i2}/${xt[e2.method]}`, method: "POST", data: s2, dataType: "json", header: JSON.parse(JSON.stringify({ "Content-Type": "application/json" })) };
  }
  callFunction(e2) {
    const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
    return this.request(t2, false);
  }
  getUploadFileOptions(e2) {
    const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
    return this.request(t2);
  }
  reportUploadFile(e2) {
    const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
    return this.request(t2);
  }
  uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
    if (!t2)
      throw new te({ code: "CLOUDPATH_REQUIRED", message: "cloudPath不可为空" });
    let r2;
    return this.getUploadFileOptions({ cloudPath: t2 }).then((t3) => {
      const { url: i2, formData: o2, name: a2 } = t3.result;
      return r2 = t3.result.fileUrl, new Promise((t4, r3) => {
        const c2 = this.adapter.uploadFile({ url: i2, formData: o2, name: a2, filePath: e2, fileType: n2, success(e3) {
          e3 && e3.statusCode < 400 ? t4(e3) : r3(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
        }, fail(e3) {
          r3(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
        } });
        "function" == typeof s2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
          s2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
        });
      });
    }).then(() => this.reportUploadFile({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
      t3.success ? n3({ success: true, filePath: e2, fileID: r2 }) : s3(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
    }));
  }
  deleteFile({ fileList: e2 }) {
    const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e2 }) };
    return this.request(t2).then((e3) => {
      if (e3.success)
        return e3.result;
      throw new te({ code: "DELETE_FILE_FAILED", message: "删除文件失败" });
    });
  }
  getTempFileURL({ fileList: e2, maxAge: t2 } = {}) {
    if (!Array.isArray(e2) || 0 === e2.length)
      throw new te({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
    const n2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e2, maxAge: t2 }) };
    return this.request(n2).then((e3) => {
      if (e3.success)
        return { fileList: e3.result.fileList.map((e4) => ({ fileID: e4.fileID, tempFileURL: e4.tempFileURL })) };
      throw new te({ code: "GET_TEMP_FILE_URL_FAILED", message: "获取临时文件链接失败" });
    });
  }
};
var Rt = { init(e2) {
  const t2 = new Nt(e2), n2 = { signInAnonymously: function() {
    return Promise.resolve();
  }, getLoginState: function() {
    return Promise.resolve(false);
  } };
  return t2.auth = function() {
    return n2;
  }, t2.customAuth = t2.auth, t2;
} }, Lt = n(function(e2, t2) {
  e2.exports = r.enc.Hex;
});
function Ut() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e2) {
    var t2 = 16 * Math.random() | 0;
    return ("x" === e2 ? t2 : 3 & t2 | 8).toString(16);
  });
}
function Dt(e2 = "", t2 = {}) {
  const { data: n2, functionName: s2, method: r2, headers: i2, signHeaderKeys: o2 = [], config: a2 } = t2, c2 = String(Date.now()), u2 = Ut(), h2 = Object.assign({}, i2, { "x-from-app-id": a2.spaceAppId, "x-from-env-id": a2.spaceId, "x-to-env-id": a2.spaceId, "x-from-instance-id": c2, "x-from-function-name": s2, "x-client-timestamp": c2, "x-alipay-source": "client", "x-request-id": u2, "x-alipay-callid": u2, "x-trace-id": u2 }), l2 = ["x-from-app-id", "x-from-env-id", "x-to-env-id", "x-from-instance-id", "x-from-function-name", "x-client-timestamp"].concat(o2), [d2 = "", p2 = ""] = e2.split("?") || [], f2 = function(e3) {
    const t3 = "HMAC-SHA256", n3 = e3.signedHeaders.join(";"), s3 = e3.signedHeaders.map((t4) => `${t4.toLowerCase()}:${e3.headers[t4]}
`).join(""), r3 = we(e3.body).toString(Lt), i3 = `${e3.method.toUpperCase()}
${e3.path}
${e3.query}
${s3}
${n3}
${r3}
`, o3 = we(i3).toString(Lt), a3 = `${t3}
${e3.timestamp}
${o3}
`, c3 = ve(a3, e3.secretKey).toString(Lt);
    return `${t3} Credential=${e3.secretId}, SignedHeaders=${n3}, Signature=${c3}`;
  }({ path: d2, query: p2, method: r2, headers: h2, timestamp: c2, body: JSON.stringify(n2), secretId: a2.accessKey, secretKey: a2.secretKey, signedHeaders: l2.sort() });
  return { url: `${a2.endpoint}${e2}`, headers: Object.assign({}, h2, { Authorization: f2 }) };
}
function Mt({ url: e2, data: t2, method: n2 = "POST", headers: s2 = {}, timeout: r2 }) {
  return new Promise((i2, o2) => {
    ne.request({ url: e2, method: n2, data: "object" == typeof t2 ? JSON.stringify(t2) : t2, header: s2, dataType: "json", timeout: r2, complete: (e3 = {}) => {
      const t3 = s2["x-trace-id"] || "";
      if (!e3.statusCode || e3.statusCode >= 400) {
        const { message: n3, errMsg: s3, trace_id: r3 } = e3.data || {};
        return o2(new te({ code: "SYS_ERR", message: n3 || s3 || "request:fail", requestId: r3 || t3 }));
      }
      i2({ status: e3.statusCode, data: e3.data, headers: e3.header, requestId: t3 });
    } });
  });
}
function qt(e2, t2) {
  const { path: n2, data: s2, method: r2 = "GET" } = e2, { url: i2, headers: o2 } = Dt(n2, { functionName: "", data: s2, method: r2, headers: { "x-alipay-cloud-mode": "oss", "x-data-api-type": "oss", "x-expire-timestamp": Date.now() + 6e4 }, signHeaderKeys: ["x-data-api-type", "x-expire-timestamp"], config: t2 });
  return Mt({ url: i2, data: s2, method: r2, headers: o2 }).then((e3) => {
    const t3 = e3.data || {};
    if (!t3.success)
      throw new te({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
    return t3.data || {};
  }).catch((e3) => {
    throw new te({ code: e3.errCode, message: e3.errMsg, requestId: e3.requestId });
  });
}
function Ft(e2 = "") {
  const t2 = e2.trim().replace(/^cloud:\/\//, ""), n2 = t2.indexOf("/");
  if (n2 <= 0)
    throw new te({ code: "INVALID_PARAM", message: "fileID不合法" });
  const s2 = t2.substring(0, n2), r2 = t2.substring(n2 + 1);
  return s2 !== this.config.spaceId && console.warn("file ".concat(e2, " does not belong to env ").concat(this.config.spaceId)), r2;
}
function Kt(e2 = "") {
  return "cloud://".concat(this.config.spaceId, "/").concat(e2.replace(/^\/+/, ""));
}
class jt {
  constructor(e2) {
    this.config = e2;
  }
  signedURL(e2, t2 = {}) {
    const n2 = `/ws/function/${e2}`, s2 = this.config.wsEndpoint.replace(/^ws(s)?:\/\//, ""), r2 = Object.assign({}, t2, { accessKeyId: this.config.accessKey, signatureNonce: Ut(), timestamp: "" + Date.now() }), i2 = [n2, ["accessKeyId", "authorization", "signatureNonce", "timestamp"].sort().map(function(e3) {
      return r2[e3] ? "".concat(e3, "=").concat(r2[e3]) : null;
    }).filter(Boolean).join("&"), `host:${s2}`].join("\n"), o2 = ["HMAC-SHA256", we(i2).toString(Lt)].join("\n"), a2 = ve(o2, this.config.secretKey).toString(Lt), c2 = Object.keys(r2).map((e3) => `${e3}=${encodeURIComponent(r2[e3])}`).join("&");
    return `${this.config.wsEndpoint}${n2}?${c2}&signature=${a2}`;
  }
}
var $t = class {
  constructor(e2) {
    if (["spaceId", "spaceAppId", "accessKey", "secretKey"].forEach((t2) => {
      if (!Object.prototype.hasOwnProperty.call(e2, t2))
        throw new Error(`${t2} required`);
    }), e2.endpoint) {
      if ("string" != typeof e2.endpoint)
        throw new Error("endpoint must be string");
      if (!/^https:\/\//.test(e2.endpoint))
        throw new Error("endpoint must start with https://");
      e2.endpoint = e2.endpoint.replace(/\/$/, "");
    }
    this.config = Object.assign({}, e2, { endpoint: e2.endpoint || `https://${e2.spaceId}.api-hz.cloudbasefunction.cn`, wsEndpoint: e2.wsEndpoint || `wss://${e2.spaceId}.api-hz.cloudbasefunction.cn` }), this._websocket = new jt(this.config);
  }
  callFunction(e2) {
    return function(e3, t2) {
      const { name: n2, data: s2, async: r2 = false, timeout: i2 } = e3, o2 = "POST", a2 = { "x-to-function-name": n2 };
      r2 && (a2["x-function-invoke-type"] = "async");
      const { url: c2, headers: u2 } = Dt("/functions/invokeFunction", { functionName: n2, data: s2, method: o2, headers: a2, signHeaderKeys: ["x-to-function-name"], config: t2 });
      return Mt({ url: c2, data: s2, method: o2, headers: u2, timeout: i2 }).then((e4) => {
        let t3 = 0;
        if (r2) {
          const n3 = e4.data || {};
          t3 = "200" === n3.errCode ? 0 : n3.errCode, e4.data = n3.data || {}, e4.errMsg = n3.errMsg;
        }
        if (0 !== t3)
          throw new te({ code: t3, message: e4.errMsg, requestId: e4.requestId });
        return { errCode: t3, success: 0 === t3, requestId: e4.requestId, result: e4.data };
      }).catch((e4) => {
        throw new te({ code: e4.errCode, message: e4.errMsg, requestId: e4.requestId });
      });
    }(e2, this.config);
  }
  uploadFileToOSS({ url: e2, filePath: t2, fileType: n2, formData: s2, onUploadProgress: r2 }) {
    return new Promise((i2, o2) => {
      const a2 = ne.uploadFile({ url: e2, filePath: t2, fileType: n2, formData: s2, name: "file", success(e3) {
        e3 && e3.statusCode < 400 ? i2(e3) : o2(new te({ code: "UPLOAD_FAILED", message: "文件上传失败" }));
      }, fail(e3) {
        o2(new te({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "文件上传失败" }));
      } });
      "function" == typeof r2 && a2 && "function" == typeof a2.onProgressUpdate && a2.onProgressUpdate((e3) => {
        r2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
      });
    });
  }
  async uploadFile({ filePath: e2, cloudPath: t2 = "", fileType: n2 = "image", onUploadProgress: s2 }) {
    if ("string" !== g(t2))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath必须为字符串类型" });
    if (!(t2 = t2.trim()))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath不可为空" });
    if (/:\/\//.test(t2))
      throw new te({ code: "INVALID_PARAM", message: "cloudPath不合法" });
    const r2 = await qt({ path: "/".concat(t2.replace(/^\//, ""), "?post_url") }, this.config), { file_id: i2, upload_url: o2, form_data: a2 } = r2, c2 = a2 && a2.reduce((e3, t3) => (e3[t3.key] = t3.value, e3), {});
    return this.uploadFileToOSS({ url: o2, filePath: e2, fileType: n2, formData: c2, onUploadProgress: s2 }).then(() => ({ fileID: i2 }));
  }
  async getTempFileURL({ fileList: e2 }) {
    return new Promise((t2, n2) => {
      (!e2 || e2.length < 0) && t2({ code: "INVALID_PARAM", message: "fileList不能为空数组" }), e2.length > 50 && t2({ code: "INVALID_PARAM", message: "fileList数组长度不能超过50" });
      const s2 = [];
      for (const n3 of e2) {
        let e3;
        "string" !== g(n3) && t2({ code: "INVALID_PARAM", message: "fileList的元素必须是非空的字符串" });
        try {
          e3 = Ft.call(this, n3);
        } catch (t3) {
          console.warn(t3.errCode, t3.errMsg), e3 = n3;
        }
        s2.push({ file_id: e3, expire: 600 });
      }
      qt({ path: "/?download_url", data: { file_list: s2 }, method: "POST" }, this.config).then((e3) => {
        const { file_list: n3 = [] } = e3;
        t2({ fileList: n3.map((e4) => ({ fileID: Kt.call(this, e4.file_id), tempFileURL: e4.download_url })) });
      }).catch((e3) => n2(e3));
    });
  }
  async connectWebSocket(e2) {
    const { name: t2, query: n2 } = e2;
    return ne.connectSocket({ url: this._websocket.signedURL(t2, n2), complete: () => {
    } });
  }
};
var Bt = { init: (e2) => {
  e2.provider = "alipay";
  const t2 = new $t(e2);
  return t2.auth = function() {
    return { signInAnonymously: function() {
      return Promise.resolve();
    }, getLoginState: function() {
      return Promise.resolve(true);
    } };
  }, t2;
} };
function Wt({ data: e2 }) {
  let t2;
  t2 = le();
  const n2 = JSON.parse(JSON.stringify(e2 || {}));
  if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
    const { token: e3 } = re();
    e3 && (n2.uniIdToken = e3);
  }
  return n2;
}
const Jt = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "，云函数[{functionName}]在云端不存在，请检查此云函数名称是否正确以及该云函数是否已上传到服务空间", mode: "append" }];
var zt = /[\\^$.*+?()[\]{}|]/g, Vt = RegExp(zt.source);
function Gt(e2, t2, n2) {
  return e2.replace(new RegExp((s2 = t2) && Vt.test(s2) ? s2.replace(zt, "\\$&") : s2, "g"), n2);
  var s2;
}
const Yt = { NONE: "none", REQUEST: "request", RESPONSE: "response", BOTH: "both" }, Qt = "_globalUniCloudStatus", Xt = "_globalUniCloudSecureNetworkCache__{spaceId}";
const Un = "uni-secure-network", Dn = { SYSTEM_ERROR: { code: 2e4, message: "System error" }, APP_INFO_INVALID: { code: 20101, message: "Invalid client" }, GET_ENCRYPT_KEY_FAILED: { code: 20102, message: "Get encrypt key failed" } };
function qn(e2) {
  const { errSubject: t2, subject: n2, errCode: s2, errMsg: r2, code: i2, message: o2, cause: a2 } = e2 || {};
  return new te({ subject: t2 || n2 || Un, code: s2 || i2 || Dn.SYSTEM_ERROR.code, message: r2 || o2, cause: a2 });
}
let Kn;
function Hn({ secretType: e2 } = {}) {
  return e2 === Yt.REQUEST || e2 === Yt.RESPONSE || e2 === Yt.BOTH;
}
function Jn({ name: e2, data: t2 = {} } = {}) {
  return "DCloud-clientDB" === e2 && "encryption" === t2.redirectTo && "getAppClientKey" === t2.action;
}
function zn({ provider: e2, spaceId: t2, functionName: n2 } = {}) {
  const { appId: s2, uniPlatform: r2, osName: i2 } = ce();
  let o2 = r2;
  "app" === r2 && (o2 = i2);
  const a2 = function({ provider: e3, spaceId: t3 } = {}) {
    const n3 = P;
    if (!n3)
      return {};
    e3 = /* @__PURE__ */ function(e4) {
      return "tencent" === e4 ? "tcb" : e4;
    }(e3);
    const s3 = n3.find((n4) => n4.provider === e3 && n4.spaceId === t3);
    return s3 && s3.config;
  }({ provider: e2, spaceId: t2 });
  if (!a2 || !a2.accessControl || !a2.accessControl.enable)
    return false;
  const c2 = a2.accessControl.function || {}, u2 = Object.keys(c2);
  if (0 === u2.length)
    return true;
  const h2 = function(e3, t3) {
    let n3, s3, r3;
    for (let i3 = 0; i3 < e3.length; i3++) {
      const o3 = e3[i3];
      o3 !== t3 ? "*" !== o3 ? o3.split(",").map((e4) => e4.trim()).indexOf(t3) > -1 && (s3 = o3) : r3 = o3 : n3 = o3;
    }
    return n3 || s3 || r3;
  }(u2, n2);
  if (!h2)
    return false;
  if ((c2[h2] || []).find((e3 = {}) => e3.appId === s2 && (e3.platform || "").toLowerCase() === o2.toLowerCase()))
    return true;
  throw console.error(`此应用[appId: ${s2}, platform: ${o2}]不在云端配置的允许访问的应用列表内，参考：https://uniapp.dcloud.net.cn/uniCloud/secure-network.html#verify-client`), qn(Dn.APP_INFO_INVALID);
}
function Vn({ functionName: e2, result: t2, logPvd: n2 }) {
}
function Gn(e2) {
  const t2 = e2.callFunction, n2 = function(n3) {
    const s2 = n3.name;
    n3.data = Wt.call(e2, { data: n3.data });
    const r2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb", alipay: "alipay", dcloud: "dcloud" }[this.config.provider], i2 = Hn(n3), o2 = Jn(n3), a2 = i2 || o2;
    return t2.call(this, n3).then((e3) => (e3.errCode = 0, !a2 && Vn.call(this, { functionName: s2, result: e3, logPvd: r2 }), Promise.resolve(e3)), (e3) => (!a2 && Vn.call(this, { functionName: s2, result: e3, logPvd: r2 }), e3 && e3.message && (e3.message = function({ message: e4 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
      for (let s3 = 0; s3 < n4.length; s3++) {
        const { rule: r3, content: i3, mode: o3 } = n4[s3], a3 = e4.match(r3);
        if (!a3)
          continue;
        let c2 = i3;
        for (let e5 = 1; e5 < a3.length; e5++)
          c2 = Gt(c2, `{$${e5}}`, a3[e5]);
        for (const e5 in t3)
          c2 = Gt(c2, `{${e5}}`, t3[e5]);
        return "replace" === o3 ? c2 : e4 + c2;
      }
      return e4;
    }({ message: `[${n3.name}]: ${e3.message}`, formatter: Jt, extraInfo: { functionName: s2 } })), Promise.reject(e3)));
  };
  e2.callFunction = function(t3) {
    const { provider: s2, spaceId: r2 } = e2.config, i2 = t3.name;
    let o2, a2;
    if (t3.data = t3.data || {}, o2 = n2, o2 = o2.bind(e2), Jn(t3))
      a2 = n2.call(e2, t3);
    else if (Hn(t3)) {
      a2 = new Kn({ secretType: t3.secretType, uniCloudIns: e2 }).wrapEncryptDataCallFunction(n2.bind(e2))(t3);
    } else if (zn({ provider: s2, spaceId: r2, functionName: i2 })) {
      a2 = new Kn({ secretType: t3.secretType, uniCloudIns: e2 }).wrapVerifyClientCallFunction(n2.bind(e2))(t3);
    } else
      a2 = o2(t3);
    return Object.defineProperty(a2, "result", { get: () => (console.warn("当前返回结果为Promise类型，不可直接访问其result属性，详情请参考：https://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), a2.then((e3) => ("undefined" != typeof UTSJSONObject && (e3.result = new UTSJSONObject(e3.result)), e3));
  };
}
Kn = class {
  constructor() {
    throw qn({ message: `Platform ${C} is not enabled, please check whether secure network module is enabled in your manifest.json` });
  }
};
const Yn = Symbol("CLIENT_DB_INTERNAL");
function Qn(e2, t2) {
  return e2.then = "DoNotReturnProxyWithAFunctionNamedThen", e2._internalType = Yn, e2.inspect = null, e2.__v_raw = void 0, new Proxy(e2, { get(e3, n2, s2) {
    if ("_uniClient" === n2)
      return null;
    if ("symbol" == typeof n2)
      return e3[n2];
    if (n2 in e3 || "string" != typeof n2) {
      const t3 = e3[n2];
      return "function" == typeof t3 ? t3.bind(e3) : t3;
    }
    return t2.get(e3, n2, s2);
  } });
}
function Xn(e2) {
  return { on: (t2, n2) => {
    e2[t2] = e2[t2] || [], e2[t2].indexOf(n2) > -1 || e2[t2].push(n2);
  }, off: (t2, n2) => {
    e2[t2] = e2[t2] || [];
    const s2 = e2[t2].indexOf(n2);
    -1 !== s2 && e2[t2].splice(s2, 1);
  } };
}
const Zn = ["db.Geo", "db.command", "command.aggregate"];
function es$1(e2, t2) {
  return Zn.indexOf(`${e2}.${t2}`) > -1;
}
function ts(e2) {
  switch (g(e2 = se(e2))) {
    case "array":
      return e2.map((e3) => ts(e3));
    case "object":
      return e2._internalType === Yn || Object.keys(e2).forEach((t2) => {
        e2[t2] = ts(e2[t2]);
      }), e2;
    case "regexp":
      return { $regexp: { source: e2.source, flags: e2.flags } };
    case "date":
      return { $date: e2.toISOString() };
    default:
      return e2;
  }
}
function ns(e2) {
  return e2 && e2.content && e2.content.$method;
}
class ss {
  constructor(e2, t2, n2) {
    this.content = e2, this.prevStage = t2 || null, this.udb = null, this._database = n2;
  }
  toJSON() {
    let e2 = this;
    const t2 = [e2.content];
    for (; e2.prevStage; )
      e2 = e2.prevStage, t2.push(e2.content);
    return { $db: t2.reverse().map((e3) => ({ $method: e3.$method, $param: ts(e3.$param) })) };
  }
  toString() {
    return JSON.stringify(this.toJSON());
  }
  getAction() {
    const e2 = this.toJSON().$db.find((e3) => "action" === e3.$method);
    return e2 && e2.$param && e2.$param[0];
  }
  getCommand() {
    return { $db: this.toJSON().$db.filter((e2) => "action" !== e2.$method) };
  }
  get isAggregate() {
    let e2 = this;
    for (; e2; ) {
      const t2 = ns(e2), n2 = ns(e2.prevStage);
      if ("aggregate" === t2 && "collection" === n2 || "pipeline" === t2)
        return true;
      e2 = e2.prevStage;
    }
    return false;
  }
  get isCommand() {
    let e2 = this;
    for (; e2; ) {
      if ("command" === ns(e2))
        return true;
      e2 = e2.prevStage;
    }
    return false;
  }
  get isAggregateCommand() {
    let e2 = this;
    for (; e2; ) {
      const t2 = ns(e2), n2 = ns(e2.prevStage);
      if ("aggregate" === t2 && "command" === n2)
        return true;
      e2 = e2.prevStage;
    }
    return false;
  }
  getNextStageFn(e2) {
    const t2 = this;
    return function() {
      return rs({ $method: e2, $param: ts(Array.from(arguments)) }, t2, t2._database);
    };
  }
  get count() {
    return this.isAggregate ? this.getNextStageFn("count") : function() {
      return this._send("count", Array.from(arguments));
    };
  }
  get remove() {
    return this.isCommand ? this.getNextStageFn("remove") : function() {
      return this._send("remove", Array.from(arguments));
    };
  }
  get() {
    return this._send("get", Array.from(arguments));
  }
  get add() {
    return this.isCommand ? this.getNextStageFn("add") : function() {
      return this._send("add", Array.from(arguments));
    };
  }
  update() {
    return this._send("update", Array.from(arguments));
  }
  end() {
    return this._send("end", Array.from(arguments));
  }
  get set() {
    return this.isCommand ? this.getNextStageFn("set") : function() {
      throw new Error("JQL禁止使用set方法");
    };
  }
  _send(e2, t2) {
    const n2 = this.getAction(), s2 = this.getCommand();
    if (s2.$db.push({ $method: e2, $param: ts(t2) }), b)
      ;
    return this._database._callCloudFunction({ action: n2, command: s2 });
  }
}
function rs(e2, t2, n2) {
  return Qn(new ss(e2, t2, n2), { get(e3, t3) {
    let s2 = "db";
    return e3 && e3.content && (s2 = e3.content.$method), es$1(s2, t3) ? rs({ $method: t3 }, e3, n2) : function() {
      return rs({ $method: t3, $param: ts(Array.from(arguments)) }, e3, n2);
    };
  } });
}
function is({ path: e2, method: t2 }) {
  return class {
    constructor() {
      this.param = Array.from(arguments);
    }
    toJSON() {
      return { $newDb: [...e2.map((e3) => ({ $method: e3 })), { $method: t2, $param: this.param }] };
    }
    toString() {
      return JSON.stringify(this.toJSON());
    }
  };
}
class os {
  constructor({ uniClient: e2 = {}, isJQL: t2 = false } = {}) {
    this._uniClient = e2, this._authCallBacks = {}, this._dbCallBacks = {}, e2._isDefault && (this._dbCallBacks = U("_globalUniCloudDatabaseCallback")), t2 || (this.auth = Xn(this._authCallBacks)), this._isJQL = t2, Object.assign(this, Xn(this._dbCallBacks)), this.env = Qn({}, { get: (e3, t3) => ({ $env: t3 }) }), this.Geo = Qn({}, { get: (e3, t3) => is({ path: ["Geo"], method: t3 }) }), this.serverDate = is({ path: [], method: "serverDate" }), this.RegExp = is({ path: [], method: "RegExp" });
  }
  getCloudEnv(e2) {
    if ("string" != typeof e2 || !e2.trim())
      throw new Error("getCloudEnv参数错误");
    return { $env: e2.replace("$cloudEnv_", "") };
  }
  _callback(e2, t2) {
    const n2 = this._dbCallBacks;
    n2[e2] && n2[e2].forEach((e3) => {
      e3(...t2);
    });
  }
  _callbackAuth(e2, t2) {
    const n2 = this._authCallBacks;
    n2[e2] && n2[e2].forEach((e3) => {
      e3(...t2);
    });
  }
  multiSend() {
    const e2 = Array.from(arguments), t2 = e2.map((e3) => {
      const t3 = e3.getAction(), n2 = e3.getCommand();
      if ("getTemp" !== n2.$db[n2.$db.length - 1].$method)
        throw new Error("multiSend只支持子命令内使用getTemp");
      return { action: t3, command: n2 };
    });
    return this._callCloudFunction({ multiCommand: t2, queryList: e2 });
  }
}
function as(e2, t2 = {}) {
  return Qn(new e2(t2), { get: (e3, t3) => es$1("db", t3) ? rs({ $method: t3 }, null, e3) : function() {
    return rs({ $method: t3, $param: ts(Array.from(arguments)) }, null, e3);
  } });
}
class cs extends os {
  _parseResult(e2) {
    return this._isJQL ? e2.result : e2;
  }
  _callCloudFunction({ action: e2, command: t2, multiCommand: n2, queryList: s2 }) {
    function r2(e3, t3) {
      if (n2 && s2)
        for (let n3 = 0; n3 < s2.length; n3++) {
          const r3 = s2[n3];
          r3.udb && "function" == typeof r3.udb.setResult && (t3 ? r3.udb.setResult(t3) : r3.udb.setResult(e3.result.dataList[n3]));
        }
    }
    const i2 = this, o2 = this._isJQL ? "databaseForJQL" : "database";
    function a2(e3) {
      return i2._callback("error", [e3]), j($(o2, "fail"), e3).then(() => j($(o2, "complete"), e3)).then(() => (r2(null, e3), Y(H.RESPONSE, { type: J.CLIENT_DB, content: e3 }), Promise.reject(e3)));
    }
    const c2 = j($(o2, "invoke")), u2 = this._uniClient;
    return c2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: l.CLIENT_DB, data: { action: e2, command: t2, multiCommand: n2 } })).then((e3) => {
      const { code: t3, message: n3, token: s3, tokenExpired: c3, systemInfo: u3 = [] } = e3.result;
      if (u3)
        for (let e4 = 0; e4 < u3.length; e4++) {
          const { level: t4, message: n4, detail: s4 } = u3[e4];
          let r3 = "[System Info]" + n4;
          s4 && (r3 = `${r3}
详细信息：${s4}`), (console["warn" === t4 ? "error" : t4] || console.log)(r3);
        }
      if (t3) {
        return a2(new te({ code: t3, message: n3, requestId: e3.requestId }));
      }
      e3.result.errCode = e3.result.errCode || e3.result.code, e3.result.errMsg = e3.result.errMsg || e3.result.message, s3 && c3 && (ie({ token: s3, tokenExpired: c3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: c3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: c3 }]), Y(H.REFRESH_TOKEN, { token: s3, tokenExpired: c3 }));
      const h2 = [{ prop: "affectedDocs", tips: "affectedDocs不再推荐使用，请使用inserted/deleted/updated/data.length替代" }, { prop: "code", tips: "code不再推荐使用，请使用errCode替代" }, { prop: "message", tips: "message不再推荐使用，请使用errMsg替代" }];
      for (let t4 = 0; t4 < h2.length; t4++) {
        const { prop: n4, tips: s4 } = h2[t4];
        if (n4 in e3.result) {
          const t5 = e3.result[n4];
          Object.defineProperty(e3.result, n4, { get: () => (console.warn(s4), t5) });
        }
      }
      return function(e4) {
        return j($(o2, "success"), e4).then(() => j($(o2, "complete"), e4)).then(() => {
          r2(e4, null);
          const t4 = i2._parseResult(e4);
          return Y(H.RESPONSE, { type: J.CLIENT_DB, content: t4 }), Promise.resolve(t4);
        });
      }(e3);
    }, (e3) => {
      /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e3.message) && console.warn("clientDB未初始化，请在web控制台保存一次schema以开启clientDB");
      return a2(new te({ code: e3.code || "SYSTEM_ERROR", message: e3.message, requestId: e3.requestId }));
    });
  }
}
const us = "token无效，跳转登录页面", hs = "token过期，跳转登录页面", ls = { TOKEN_INVALID_TOKEN_EXPIRED: hs, TOKEN_INVALID_INVALID_CLIENTID: us, TOKEN_INVALID: us, TOKEN_INVALID_WRONG_TOKEN: us, TOKEN_INVALID_ANONYMOUS_USER: us }, ds = { "uni-id-token-expired": hs, "uni-id-check-token-failed": us, "uni-id-token-not-exist": us, "uni-id-check-device-feature-failed": us };
function ps(e2, t2) {
  let n2 = "";
  return n2 = e2 ? `${e2}/${t2}` : t2, n2.replace(/^\//, "");
}
function fs(e2 = [], t2 = "") {
  const n2 = [], s2 = [];
  return e2.forEach((e3) => {
    true === e3.needLogin ? n2.push(ps(t2, e3.path)) : false === e3.needLogin && s2.push(ps(t2, e3.path));
  }), { needLoginPage: n2, notNeedLoginPage: s2 };
}
function gs(e2) {
  return e2.split("?")[0].replace(/^\//, "");
}
function ms() {
  return function(e2) {
    let t2 = e2 && e2.$page && e2.$page.fullPath || "";
    return t2 ? ("/" !== t2.charAt(0) && (t2 = "/" + t2), t2) : t2;
  }(function() {
    const e2 = getCurrentPages();
    return e2[e2.length - 1];
  }());
}
function ys() {
  return gs(ms());
}
function _s(e2 = "", t2 = {}) {
  if (!e2)
    return false;
  if (!(t2 && t2.list && t2.list.length))
    return false;
  const n2 = t2.list, s2 = gs(e2);
  return n2.some((e3) => e3.pagePath === s2);
}
const ws = !!e.uniIdRouter;
const { loginPage: vs, routerNeedLogin: Is, resToLogin: Ss, needLoginPage: Ts, notNeedLoginPage: bs, loginPageInTabBar: Es } = function({ pages: t2 = [], subPackages: n2 = [], uniIdRouter: s2 = {}, tabBar: r2 = {} } = e) {
  const { loginPage: i2, needLogin: o2 = [], resToLogin: a2 = true } = s2, { needLoginPage: c2, notNeedLoginPage: u2 } = fs(t2), { needLoginPage: h2, notNeedLoginPage: l2 } = function(e2 = []) {
    const t3 = [], n3 = [];
    return e2.forEach((e3) => {
      const { root: s3, pages: r3 = [] } = e3, { needLoginPage: i3, notNeedLoginPage: o3 } = fs(r3, s3);
      t3.push(...i3), n3.push(...o3);
    }), { needLoginPage: t3, notNeedLoginPage: n3 };
  }(n2);
  return { loginPage: i2, routerNeedLogin: o2, resToLogin: a2, needLoginPage: [...c2, ...h2], notNeedLoginPage: [...u2, ...l2], loginPageInTabBar: _s(i2, r2) };
}();
if (Ts.indexOf(vs) > -1)
  throw new Error(`Login page [${vs}] should not be "needLogin", please check your pages.json`);
function ks(e2) {
  const t2 = ys();
  if ("/" === e2.charAt(0))
    return e2;
  const [n2, s2] = e2.split("?"), r2 = n2.replace(/^\//, "").split("/"), i2 = t2.split("/");
  i2.pop();
  for (let e3 = 0; e3 < r2.length; e3++) {
    const t3 = r2[e3];
    ".." === t3 ? i2.pop() : "." !== t3 && i2.push(t3);
  }
  return "" === i2[0] && i2.shift(), "/" + i2.join("/") + (s2 ? "?" + s2 : "");
}
function Ps(e2) {
  const t2 = gs(ks(e2));
  return !(bs.indexOf(t2) > -1) && (Ts.indexOf(t2) > -1 || Is.some((t3) => function(e3, t4) {
    return new RegExp(t4).test(e3);
  }(e2, t3)));
}
function Cs({ redirect: e2 }) {
  const t2 = gs(e2), n2 = gs(vs);
  return ys() !== n2 && t2 !== n2;
}
function As({ api: e2, redirect: t2 } = {}) {
  if (!t2 || !Cs({ redirect: t2 }))
    return;
  const n2 = function(e3, t3) {
    return "/" !== e3.charAt(0) && (e3 = "/" + e3), t3 ? e3.indexOf("?") > -1 ? e3 + `&uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3 + `?uniIdRedirectUrl=${encodeURIComponent(t3)}` : e3;
  }(vs, t2);
  Es ? "navigateTo" !== e2 && "redirectTo" !== e2 || (e2 = "switchTab") : "switchTab" === e2 && (e2 = "navigateTo");
  const s2 = { navigateTo: uni.navigateTo, redirectTo: uni.redirectTo, switchTab: uni.switchTab, reLaunch: uni.reLaunch };
  setTimeout(() => {
    s2[e2]({ url: n2 });
  }, 0);
}
function Os({ url: e2 } = {}) {
  const t2 = { abortLoginPageJump: false, autoToLoginPage: false }, n2 = function() {
    const { token: e3, tokenExpired: t3 } = re();
    let n3;
    if (e3) {
      if (t3 < Date.now()) {
        const e4 = "uni-id-token-expired";
        n3 = { errCode: e4, errMsg: ds[e4] };
      }
    } else {
      const e4 = "uni-id-check-token-failed";
      n3 = { errCode: e4, errMsg: ds[e4] };
    }
    return n3;
  }();
  if (Ps(e2) && n2) {
    n2.uniIdRedirectUrl = e2;
    if (z(H.NEED_LOGIN).length > 0)
      return setTimeout(() => {
        Y(H.NEED_LOGIN, n2);
      }, 0), t2.abortLoginPageJump = true, t2;
    t2.autoToLoginPage = true;
  }
  return t2;
}
function xs() {
  !function() {
    const e3 = ms(), { abortLoginPageJump: t2, autoToLoginPage: n2 } = Os({ url: e3 });
    t2 || n2 && As({ api: "redirectTo", redirect: e3 });
  }();
  const e2 = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
  for (let t2 = 0; t2 < e2.length; t2++) {
    const n2 = e2[t2];
    uni.addInterceptor(n2, { invoke(e3) {
      const { abortLoginPageJump: t3, autoToLoginPage: s2 } = Os({ url: e3.url });
      return t3 ? e3 : s2 ? (As({ api: n2, redirect: ks(e3.url) }), false) : e3;
    } });
  }
}
function Ns() {
  this.onResponse((e2) => {
    const { type: t2, content: n2 } = e2;
    let s2 = false;
    switch (t2) {
      case "cloudobject":
        s2 = function(e3) {
          if ("object" != typeof e3)
            return false;
          const { errCode: t3 } = e3 || {};
          return t3 in ds;
        }(n2);
        break;
      case "clientdb":
        s2 = function(e3) {
          if ("object" != typeof e3)
            return false;
          const { errCode: t3 } = e3 || {};
          return t3 in ls;
        }(n2);
    }
    s2 && function(e3 = {}) {
      const t3 = z(H.NEED_LOGIN);
      Z().then(() => {
        const n3 = ms();
        if (n3 && Cs({ redirect: n3 }))
          return t3.length > 0 ? Y(H.NEED_LOGIN, Object.assign({ uniIdRedirectUrl: n3 }, e3)) : void (vs && As({ api: "navigateTo", redirect: n3 }));
      });
    }(n2);
  });
}
function Rs(e2) {
  !function(e3) {
    e3.onResponse = function(e4) {
      V(H.RESPONSE, e4);
    }, e3.offResponse = function(e4) {
      G(H.RESPONSE, e4);
    };
  }(e2), function(e3) {
    e3.onNeedLogin = function(e4) {
      V(H.NEED_LOGIN, e4);
    }, e3.offNeedLogin = function(e4) {
      G(H.NEED_LOGIN, e4);
    }, ws && (U(Qt).needLoginInit || (U(Qt).needLoginInit = true, Z().then(() => {
      xs.call(e3);
    }), Ss && Ns.call(e3)));
  }(e2), function(e3) {
    e3.onRefreshToken = function(e4) {
      V(H.REFRESH_TOKEN, e4);
    }, e3.offRefreshToken = function(e4) {
      G(H.REFRESH_TOKEN, e4);
    };
  }(e2);
}
let Ls;
const Us = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", Ds = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
function Ms() {
  const e2 = re().token || "", t2 = e2.split(".");
  if (!e2 || 3 !== t2.length)
    return { uid: null, role: [], permission: [], tokenExpired: 0 };
  let n2;
  try {
    n2 = JSON.parse((s2 = t2[1], decodeURIComponent(Ls(s2).split("").map(function(e3) {
      return "%" + ("00" + e3.charCodeAt(0).toString(16)).slice(-2);
    }).join(""))));
  } catch (e3) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + e3.message);
  }
  var s2;
  return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
}
Ls = "function" != typeof atob ? function(e2) {
  if (e2 = String(e2).replace(/[\t\n\f\r ]+/g, ""), !Ds.test(e2))
    throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
  var t2;
  e2 += "==".slice(2 - (3 & e2.length));
  for (var n2, s2, r2 = "", i2 = 0; i2 < e2.length; )
    t2 = Us.indexOf(e2.charAt(i2++)) << 18 | Us.indexOf(e2.charAt(i2++)) << 12 | (n2 = Us.indexOf(e2.charAt(i2++))) << 6 | (s2 = Us.indexOf(e2.charAt(i2++))), r2 += 64 === n2 ? String.fromCharCode(t2 >> 16 & 255) : 64 === s2 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
  return r2;
} : atob;
var qs = n(function(e2, t2) {
  Object.defineProperty(t2, "__esModule", { value: true });
  const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
  function r2(e3, t3) {
    return e3.tempFiles.forEach((e4, n3) => {
      e4.name || (e4.name = e4.path.substring(e4.path.lastIndexOf("/") + 1)), t3 && (e4.fileType = t3), e4.cloudPath = Date.now() + "_" + n3 + e4.name.substring(e4.name.lastIndexOf("."));
    }), e3.tempFilePaths || (e3.tempFilePaths = e3.tempFiles.map((e4) => e4.path)), e3;
  }
  function i2(e3, t3, { onChooseFile: s3, onUploadProgress: r3 }) {
    return t3.then((e4) => {
      if (s3) {
        const t4 = s3(e4);
        if (void 0 !== t4)
          return Promise.resolve(t4).then((t5) => void 0 === t5 ? e4 : t5);
      }
      return e4;
    }).then((t4) => false === t4 ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e4, t5, s4 = 5, r4) {
      (t5 = Object.assign({}, t5)).errMsg = n2;
      const i3 = t5.tempFiles, o2 = i3.length;
      let a2 = 0;
      return new Promise((n3) => {
        for (; a2 < s4; )
          c2();
        function c2() {
          const s5 = a2++;
          if (s5 >= o2)
            return void (!i3.find((e5) => !e5.url && !e5.errMsg) && n3(t5));
          const u2 = i3[s5];
          e4.uploadFile({ provider: u2.provider, filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, cloudPathAsRealPath: u2.cloudPathAsRealPath, onUploadProgress(e5) {
            e5.index = s5, e5.tempFile = u2, e5.tempFilePath = u2.path, r4 && r4(e5);
          } }).then((e5) => {
            u2.url = e5.fileID, s5 < o2 && c2();
          }).catch((e5) => {
            u2.errMsg = e5.errMsg || e5.message, s5 < o2 && c2();
          });
        }
      });
    }(e3, t4, 5, r3));
  }
  t2.initChooseAndUploadFile = function(e3) {
    return function(t3 = { type: "all" }) {
      return "image" === t3.type ? i2(e3, function(e4) {
        const { count: t4, sizeType: n3, sourceType: i3 = ["album", "camera"], extension: o2 } = e4;
        return new Promise((e5, a2) => {
          uni.chooseImage({ count: t4, sizeType: n3, sourceType: i3, extension: o2, success(t5) {
            e5(r2(t5, "image"));
          }, fail(e6) {
            a2({ errMsg: e6.errMsg.replace("chooseImage:fail", s2) });
          } });
        });
      }(t3), t3) : "video" === t3.type ? i2(e3, function(e4) {
        const { camera: t4, compressed: n3, maxDuration: i3, sourceType: o2 = ["album", "camera"], extension: a2 } = e4;
        return new Promise((e5, c2) => {
          uni.chooseVideo({ camera: t4, compressed: n3, maxDuration: i3, sourceType: o2, extension: a2, success(t5) {
            const { tempFilePath: n4, duration: s3, size: i4, height: o3, width: a3 } = t5;
            e5(r2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: i4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: o3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
          }, fail(e6) {
            c2({ errMsg: e6.errMsg.replace("chooseVideo:fail", s2) });
          } });
        });
      }(t3), t3) : i2(e3, function(e4) {
        const { count: t4, extension: n3 } = e4;
        return new Promise((e5, i3) => {
          let o2 = uni.chooseFile;
          if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (o2 = wx.chooseMessageFile), "function" != typeof o2)
            return i3({ errMsg: s2 + " 请指定 type 类型，该平台仅支持选择 image 或 video。" });
          o2({ type: "all", count: t4, extension: n3, success(t5) {
            e5(r2(t5));
          }, fail(e6) {
            i3({ errMsg: e6.errMsg.replace("chooseFile:fail", s2) });
          } });
        });
      }(t3), t3);
    };
  };
}), Fs = t$2(qs);
const Ks = { auto: "auto", onready: "onready", manual: "manual" };
function js(e2) {
  return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {}, mixinDatacomError: null }), created() {
    this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
      var e3 = [];
      return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
        e3.push(this[t2]);
      }), e3;
    }, (e3, t2) => {
      if (this.loadtime === Ks.manual)
        return;
      let n2 = false;
      const s2 = [];
      for (let r2 = 2; r2 < e3.length; r2++)
        e3[r2] !== t2[r2] && (s2.push(e3[r2]), n2 = true);
      e3[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
    });
  }, methods: { onMixinDatacomPropsChange(e3, t2) {
  }, mixinDatacomEasyGet({ getone: e3 = false, success: t2, fail: n2 } = {}) {
    this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomError = null, this.mixinDatacomGet().then((n3) => {
      this.mixinDatacomLoading = false;
      const { data: s2, count: r2 } = n3.result;
      this.getcount && (this.mixinDatacomPage.count = r2), this.mixinDatacomHasMore = s2.length < this.pageSize;
      const i2 = e3 ? s2.length ? s2[0] : void 0 : s2;
      this.mixinDatacomResData = i2, t2 && t2(i2);
    }).catch((e4) => {
      this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e4, this.mixinDatacomError = e4, n2 && n2(e4);
    }));
  }, mixinDatacomGet(t2 = {}) {
    let n2;
    t2 = t2 || {}, n2 = "undefined" != typeof __uniX && __uniX ? e2.databaseForJQL(this.spaceInfo) : e2.database(this.spaceInfo);
    const s2 = t2.action || this.action;
    s2 && (n2 = n2.action(s2));
    const r2 = t2.collection || this.collection;
    n2 = Array.isArray(r2) ? n2.collection(...r2) : n2.collection(r2);
    const i2 = t2.where || this.where;
    i2 && Object.keys(i2).length && (n2 = n2.where(i2));
    const o2 = t2.field || this.field;
    o2 && (n2 = n2.field(o2));
    const a2 = t2.foreignKey || this.foreignKey;
    a2 && (n2 = n2.foreignKey(a2));
    const c2 = t2.groupby || this.groupby;
    c2 && (n2 = n2.groupBy(c2));
    const u2 = t2.groupField || this.groupField;
    u2 && (n2 = n2.groupField(u2));
    true === (void 0 !== t2.distinct ? t2.distinct : this.distinct) && (n2 = n2.distinct());
    const h2 = t2.orderby || this.orderby;
    h2 && (n2 = n2.orderBy(h2));
    const l2 = void 0 !== t2.pageCurrent ? t2.pageCurrent : this.mixinDatacomPage.current, d2 = void 0 !== t2.pageSize ? t2.pageSize : this.mixinDatacomPage.size, p2 = void 0 !== t2.getcount ? t2.getcount : this.getcount, f2 = void 0 !== t2.gettree ? t2.gettree : this.gettree, g2 = void 0 !== t2.gettreepath ? t2.gettreepath : this.gettreepath, m2 = { getCount: p2 }, y2 = { limitLevel: void 0 !== t2.limitlevel ? t2.limitlevel : this.limitlevel, startWith: void 0 !== t2.startwith ? t2.startwith : this.startwith };
    return f2 && (m2.getTree = y2), g2 && (m2.getTreePath = y2), n2 = n2.skip(d2 * (l2 - 1)).limit(d2).get(m2), n2;
  } } };
}
function $s(e2) {
  return function(t2, n2 = {}) {
    n2 = function(e3, t3 = {}) {
      return e3.customUI = t3.customUI || e3.customUI, e3.parseSystemError = t3.parseSystemError || e3.parseSystemError, Object.assign(e3.loadingOptions, t3.loadingOptions), Object.assign(e3.errorOptions, t3.errorOptions), "object" == typeof t3.secretMethods && (e3.secretMethods = t3.secretMethods), e3;
    }({ customUI: false, loadingOptions: { title: "加载中...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
    const { customUI: s2, loadingOptions: r2, errorOptions: i2, parseSystemError: o2 } = n2, a2 = !s2;
    return new Proxy({}, { get(s3, c2) {
      switch (c2) {
        case "toString":
          return "[object UniCloudObject]";
        case "toJSON":
          return {};
      }
      return function({ fn: e3, interceptorName: t3, getCallbackArgs: n3 } = {}) {
        return async function(...s4) {
          const r3 = n3 ? n3({ params: s4 }) : {};
          let i3, o3;
          try {
            return await j($(t3, "invoke"), { ...r3 }), i3 = await e3(...s4), await j($(t3, "success"), { ...r3, result: i3 }), i3;
          } catch (e4) {
            throw o3 = e4, await j($(t3, "fail"), { ...r3, error: o3 }), o3;
          } finally {
            await j($(t3, "complete"), o3 ? { ...r3, error: o3 } : { ...r3, result: i3 });
          }
        };
      }({ fn: async function s4(...u2) {
        let h2;
        a2 && uni.showLoading({ title: r2.title, mask: r2.mask });
        const d2 = { name: t2, type: l.OBJECT, data: { method: c2, params: u2 } };
        "object" == typeof n2.secretMethods && function(e3, t3) {
          const n3 = t3.data.method, s5 = e3.secretMethods || {}, r3 = s5[n3] || s5["*"];
          r3 && (t3.secretType = r3);
        }(n2, d2);
        let p2 = false;
        try {
          h2 = await e2.callFunction(d2);
        } catch (e3) {
          p2 = true, h2 = { result: new te(e3) };
        }
        const { errSubject: f2, errCode: g2, errMsg: m2, newToken: y2 } = h2.result || {};
        if (a2 && uni.hideLoading(), y2 && y2.token && y2.tokenExpired && (ie(y2), Y(H.REFRESH_TOKEN, { ...y2 })), g2) {
          let e3 = m2;
          if (p2 && o2) {
            e3 = (await o2({ objectName: t2, methodName: c2, params: u2, errSubject: f2, errCode: g2, errMsg: m2 })).errMsg || m2;
          }
          if (a2)
            if ("toast" === i2.type)
              uni.showToast({ title: e3, icon: "none" });
            else {
              if ("modal" !== i2.type)
                throw new Error(`Invalid errorOptions.type: ${i2.type}`);
              {
                const { confirm: t3 } = await async function({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3 } = {}) {
                  return new Promise((i3, o3) => {
                    uni.showModal({ title: e4, content: t4, showCancel: n4, cancelText: s5, confirmText: r3, success(e5) {
                      i3(e5);
                    }, fail() {
                      i3({ confirm: false, cancel: true });
                    } });
                  });
                }({ title: "提示", content: e3, showCancel: i2.retry, cancelText: "取消", confirmText: i2.retry ? "重试" : "确定" });
                if (i2.retry && t3)
                  return s4(...u2);
              }
            }
          const n3 = new te({ subject: f2, code: g2, message: m2, requestId: h2.requestId });
          throw n3.detail = h2.result, Y(H.RESPONSE, { type: J.CLOUD_OBJECT, content: n3 }), n3;
        }
        return Y(H.RESPONSE, { type: J.CLOUD_OBJECT, content: h2.result }), h2.result;
      }, interceptorName: "callObject", getCallbackArgs: function({ params: e3 } = {}) {
        return { objectName: t2, methodName: c2, params: e3 };
      } });
    } });
  };
}
function Bs(e2) {
  return U(Xt.replace("{spaceId}", e2.config.spaceId));
}
async function Ws({ openid: e2, callLoginByWeixin: t2 = false } = {}) {
  Bs(this);
  throw new Error(`[SecureNetwork] API \`initSecureNetworkByWeixin\` is not supported on platform \`${C}\``);
}
async function Hs(e2) {
  const t2 = Bs(this);
  return t2.initPromise || (t2.initPromise = Ws.call(this, e2).then((e3) => e3).catch((e3) => {
    throw delete t2.initPromise, e3;
  })), t2.initPromise;
}
function Js(e2) {
  return function({ openid: t2, callLoginByWeixin: n2 = false } = {}) {
    return Hs.call(e2, { openid: t2, callLoginByWeixin: n2 });
  };
}
function zs(e2) {
  !function(e3) {
    he = e3;
  }(e2);
}
function Vs(e2) {
  const t2 = { getSystemInfo: uni.getSystemInfo, getPushClientId: uni.getPushClientId };
  return function(n2) {
    return new Promise((s2, r2) => {
      t2[e2]({ ...n2, success(e3) {
        s2(e3);
      }, fail(e3) {
        r2(e3);
      } });
    });
  };
}
class Gs extends S {
  constructor() {
    super(), this._uniPushMessageCallback = this._receivePushMessage.bind(this), this._currentMessageId = -1, this._payloadQueue = [];
  }
  init() {
    return Promise.all([Vs("getSystemInfo")(), Vs("getPushClientId")()]).then(([{ appId: e2 } = {}, { cid: t2 } = {}] = []) => {
      if (!e2)
        throw new Error("Invalid appId, please check the manifest.json file");
      if (!t2)
        throw new Error("Invalid push client id");
      this._appId = e2, this._pushClientId = t2, this._seqId = Date.now() + "-" + Math.floor(9e5 * Math.random() + 1e5), this.emit("open"), this._initMessageListener();
    }, (e2) => {
      throw this.emit("error", e2), this.close(), e2;
    });
  }
  async open() {
    return this.init();
  }
  _isUniCloudSSE(e2) {
    if ("receive" !== e2.type)
      return false;
    const t2 = e2 && e2.data && e2.data.payload;
    return !(!t2 || "UNI_CLOUD_SSE" !== t2.channel || t2.seqId !== this._seqId);
  }
  _receivePushMessage(e2) {
    if (!this._isUniCloudSSE(e2))
      return;
    const t2 = e2 && e2.data && e2.data.payload, { action: n2, messageId: s2, message: r2 } = t2;
    this._payloadQueue.push({ action: n2, messageId: s2, message: r2 }), this._consumMessage();
  }
  _consumMessage() {
    for (; ; ) {
      const e2 = this._payloadQueue.find((e3) => e3.messageId === this._currentMessageId + 1);
      if (!e2)
        break;
      this._currentMessageId++, this._parseMessagePayload(e2);
    }
  }
  _parseMessagePayload(e2) {
    const { action: t2, messageId: n2, message: s2 } = e2;
    "end" === t2 ? this._end({ messageId: n2, message: s2 }) : "message" === t2 && this._appendMessage({ messageId: n2, message: s2 });
  }
  _appendMessage({ messageId: e2, message: t2 } = {}) {
    this.emit("message", t2);
  }
  _end({ messageId: e2, message: t2 } = {}) {
    this.emit("end", t2), this.close();
  }
  _initMessageListener() {
    uni.onPushMessage(this._uniPushMessageCallback);
  }
  _destroy() {
    uni.offPushMessage(this._uniPushMessageCallback);
  }
  toJSON() {
    return { appId: this._appId, pushClientId: this._pushClientId, seqId: this._seqId };
  }
  close() {
    this._destroy(), this.emit("close");
  }
}
function Qs(e2) {
  e2._initPromiseHub || (e2._initPromiseHub = new I({ createPromise: function() {
    let t2 = Promise.resolve();
    var n2;
    n2 = 1, t2 = new Promise((e3) => {
      setTimeout(() => {
        e3();
      }, n2);
    });
    const s2 = e2.auth();
    return t2.then(() => s2.getLoginState()).then((e3) => e3 ? Promise.resolve() : s2.signInAnonymously());
  } }));
}
const Xs = { tcb: Ct, tencent: Ct, aliyun: fe, private: Rt, dcloud: Rt, alipay: Bt };
let Zs = new class {
  init(e2) {
    let t2 = {};
    const n2 = Xs[e2.provider];
    if (!n2)
      throw new Error("未提供正确的provider参数");
    t2 = n2.init(e2), Qs(t2), Gn(t2), function(e3) {
      const t3 = e3.uploadFile;
      e3.uploadFile = function(e4) {
        return t3.call(this, e4);
      };
    }(t2), function(e3) {
      e3.database = function(t3) {
        if (t3 && Object.keys(t3).length > 0)
          return e3.init(t3).database();
        if (this._database)
          return this._database;
        const n3 = as(cs, { uniClient: e3 });
        return this._database = n3, n3;
      }, e3.databaseForJQL = function(t3) {
        if (t3 && Object.keys(t3).length > 0)
          return e3.init(t3).databaseForJQL();
        if (this._databaseForJQL)
          return this._databaseForJQL;
        const n3 = as(cs, { uniClient: e3, isJQL: true });
        return this._databaseForJQL = n3, n3;
      };
    }(t2), function(e3) {
      e3.getCurrentUserInfo = Ms, e3.chooseAndUploadFile = Fs.initChooseAndUploadFile(e3), Object.assign(e3, { get mixinDatacom() {
        return js(e3);
      } }), e3.SSEChannel = Gs, e3.initSecureNetworkByWeixin = Js(e3), e3.setCustomClientInfo = zs, e3.importObject = $s(e3);
    }(t2);
    return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e3) => {
      if (!t2[e3])
        return;
      const n3 = t2[e3];
      t2[e3] = function() {
        return n3.apply(t2, Array.from(arguments));
      }, t2[e3] = (/* @__PURE__ */ function(e4, t3) {
        return function(n4) {
          let s2 = false;
          if ("callFunction" === t3) {
            const e5 = n4 && n4.type || l.DEFAULT;
            s2 = e5 !== l.DEFAULT;
          }
          const r2 = "callFunction" === t3 && !s2, i2 = this._initPromiseHub.exec();
          n4 = n4 || {};
          const { success: o2, fail: a2, complete: c2 } = ee(n4), u2 = i2.then(() => s2 ? Promise.resolve() : j($(t3, "invoke"), n4)).then(() => e4.call(this, n4)).then((e5) => s2 ? Promise.resolve(e5) : j($(t3, "success"), e5).then(() => j($(t3, "complete"), e5)).then(() => (r2 && Y(H.RESPONSE, { type: J.CLOUD_FUNCTION, content: e5 }), Promise.resolve(e5))), (e5) => s2 ? Promise.reject(e5) : j($(t3, "fail"), e5).then(() => j($(t3, "complete"), e5)).then(() => (Y(H.RESPONSE, { type: J.CLOUD_FUNCTION, content: e5 }), Promise.reject(e5))));
          if (!(o2 || a2 || c2))
            return u2;
          u2.then((e5) => {
            o2 && o2(e5), c2 && c2(e5), r2 && Y(H.RESPONSE, { type: J.CLOUD_FUNCTION, content: e5 });
          }, (e5) => {
            a2 && a2(e5), c2 && c2(e5), r2 && Y(H.RESPONSE, { type: J.CLOUD_FUNCTION, content: e5 });
          });
        };
      }(t2[e3], e3)).bind(t2);
    }), t2.init = this.init, t2;
  }
}();
(() => {
  const e2 = O;
  let t2 = {};
  if (e2 && 1 === e2.length)
    t2 = e2[0], Zs = Zs.init(t2), Zs._isDefault = true;
  else {
    const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
    let n2;
    n2 = e2 && e2.length > 0 ? "应用有多个服务空间，请通过uniCloud.init方法指定要使用的服务空间" : "应用未关联服务空间，请在uniCloud目录右键关联服务空间", t3.forEach((e3) => {
      Zs[e3] = function() {
        return console.error(n2), Promise.reject(new te({ code: "SYS_ERR", message: n2 }));
      };
    });
  }
  if (Object.assign(Zs, { get mixinDatacom() {
    return js(Zs);
  } }), Rs(Zs), Zs.addInterceptor = F, Zs.removeInterceptor = K, Zs.interceptObject = B, uni.__uniCloud = Zs, "app" === C) {
    const e3 = D();
    e3.uniCloud = Zs, e3.UniCloudError = te;
  }
})();
var er = Zs;
const fontData = [
  {
    "font_class": "arrow-down",
    "unicode": ""
  },
  {
    "font_class": "arrow-left",
    "unicode": ""
  },
  {
    "font_class": "arrow-right",
    "unicode": ""
  },
  {
    "font_class": "arrow-up",
    "unicode": ""
  },
  {
    "font_class": "auth",
    "unicode": ""
  },
  {
    "font_class": "auth-filled",
    "unicode": ""
  },
  {
    "font_class": "back",
    "unicode": ""
  },
  {
    "font_class": "bars",
    "unicode": ""
  },
  {
    "font_class": "calendar",
    "unicode": ""
  },
  {
    "font_class": "calendar-filled",
    "unicode": ""
  },
  {
    "font_class": "camera",
    "unicode": ""
  },
  {
    "font_class": "camera-filled",
    "unicode": ""
  },
  {
    "font_class": "cart",
    "unicode": ""
  },
  {
    "font_class": "cart-filled",
    "unicode": ""
  },
  {
    "font_class": "chat",
    "unicode": ""
  },
  {
    "font_class": "chat-filled",
    "unicode": ""
  },
  {
    "font_class": "chatboxes",
    "unicode": ""
  },
  {
    "font_class": "chatboxes-filled",
    "unicode": ""
  },
  {
    "font_class": "chatbubble",
    "unicode": ""
  },
  {
    "font_class": "chatbubble-filled",
    "unicode": ""
  },
  {
    "font_class": "checkbox",
    "unicode": ""
  },
  {
    "font_class": "checkbox-filled",
    "unicode": ""
  },
  {
    "font_class": "checkmarkempty",
    "unicode": ""
  },
  {
    "font_class": "circle",
    "unicode": ""
  },
  {
    "font_class": "circle-filled",
    "unicode": ""
  },
  {
    "font_class": "clear",
    "unicode": ""
  },
  {
    "font_class": "close",
    "unicode": ""
  },
  {
    "font_class": "closeempty",
    "unicode": ""
  },
  {
    "font_class": "cloud-download",
    "unicode": ""
  },
  {
    "font_class": "cloud-download-filled",
    "unicode": ""
  },
  {
    "font_class": "cloud-upload",
    "unicode": ""
  },
  {
    "font_class": "cloud-upload-filled",
    "unicode": ""
  },
  {
    "font_class": "color",
    "unicode": ""
  },
  {
    "font_class": "color-filled",
    "unicode": ""
  },
  {
    "font_class": "compose",
    "unicode": ""
  },
  {
    "font_class": "contact",
    "unicode": ""
  },
  {
    "font_class": "contact-filled",
    "unicode": ""
  },
  {
    "font_class": "down",
    "unicode": ""
  },
  {
    "font_class": "bottom",
    "unicode": ""
  },
  {
    "font_class": "download",
    "unicode": ""
  },
  {
    "font_class": "download-filled",
    "unicode": ""
  },
  {
    "font_class": "email",
    "unicode": ""
  },
  {
    "font_class": "email-filled",
    "unicode": ""
  },
  {
    "font_class": "eye",
    "unicode": ""
  },
  {
    "font_class": "eye-filled",
    "unicode": ""
  },
  {
    "font_class": "eye-slash",
    "unicode": ""
  },
  {
    "font_class": "eye-slash-filled",
    "unicode": ""
  },
  {
    "font_class": "fire",
    "unicode": ""
  },
  {
    "font_class": "fire-filled",
    "unicode": ""
  },
  {
    "font_class": "flag",
    "unicode": ""
  },
  {
    "font_class": "flag-filled",
    "unicode": ""
  },
  {
    "font_class": "folder-add",
    "unicode": ""
  },
  {
    "font_class": "folder-add-filled",
    "unicode": ""
  },
  {
    "font_class": "font",
    "unicode": ""
  },
  {
    "font_class": "forward",
    "unicode": ""
  },
  {
    "font_class": "gear",
    "unicode": ""
  },
  {
    "font_class": "gear-filled",
    "unicode": ""
  },
  {
    "font_class": "gift",
    "unicode": ""
  },
  {
    "font_class": "gift-filled",
    "unicode": ""
  },
  {
    "font_class": "hand-down",
    "unicode": ""
  },
  {
    "font_class": "hand-down-filled",
    "unicode": ""
  },
  {
    "font_class": "hand-up",
    "unicode": ""
  },
  {
    "font_class": "hand-up-filled",
    "unicode": ""
  },
  {
    "font_class": "headphones",
    "unicode": ""
  },
  {
    "font_class": "heart",
    "unicode": ""
  },
  {
    "font_class": "heart-filled",
    "unicode": ""
  },
  {
    "font_class": "help",
    "unicode": ""
  },
  {
    "font_class": "help-filled",
    "unicode": ""
  },
  {
    "font_class": "home",
    "unicode": ""
  },
  {
    "font_class": "home-filled",
    "unicode": ""
  },
  {
    "font_class": "image",
    "unicode": ""
  },
  {
    "font_class": "image-filled",
    "unicode": ""
  },
  {
    "font_class": "images",
    "unicode": ""
  },
  {
    "font_class": "images-filled",
    "unicode": ""
  },
  {
    "font_class": "info",
    "unicode": ""
  },
  {
    "font_class": "info-filled",
    "unicode": ""
  },
  {
    "font_class": "left",
    "unicode": ""
  },
  {
    "font_class": "link",
    "unicode": ""
  },
  {
    "font_class": "list",
    "unicode": ""
  },
  {
    "font_class": "location",
    "unicode": ""
  },
  {
    "font_class": "location-filled",
    "unicode": ""
  },
  {
    "font_class": "locked",
    "unicode": ""
  },
  {
    "font_class": "locked-filled",
    "unicode": ""
  },
  {
    "font_class": "loop",
    "unicode": ""
  },
  {
    "font_class": "mail-open",
    "unicode": ""
  },
  {
    "font_class": "mail-open-filled",
    "unicode": ""
  },
  {
    "font_class": "map",
    "unicode": ""
  },
  {
    "font_class": "map-filled",
    "unicode": ""
  },
  {
    "font_class": "map-pin",
    "unicode": ""
  },
  {
    "font_class": "map-pin-ellipse",
    "unicode": ""
  },
  {
    "font_class": "medal",
    "unicode": ""
  },
  {
    "font_class": "medal-filled",
    "unicode": ""
  },
  {
    "font_class": "mic",
    "unicode": ""
  },
  {
    "font_class": "mic-filled",
    "unicode": ""
  },
  {
    "font_class": "micoff",
    "unicode": ""
  },
  {
    "font_class": "micoff-filled",
    "unicode": ""
  },
  {
    "font_class": "minus",
    "unicode": ""
  },
  {
    "font_class": "minus-filled",
    "unicode": ""
  },
  {
    "font_class": "more",
    "unicode": ""
  },
  {
    "font_class": "more-filled",
    "unicode": ""
  },
  {
    "font_class": "navigate",
    "unicode": ""
  },
  {
    "font_class": "navigate-filled",
    "unicode": ""
  },
  {
    "font_class": "notification",
    "unicode": ""
  },
  {
    "font_class": "notification-filled",
    "unicode": ""
  },
  {
    "font_class": "paperclip",
    "unicode": ""
  },
  {
    "font_class": "paperplane",
    "unicode": ""
  },
  {
    "font_class": "paperplane-filled",
    "unicode": ""
  },
  {
    "font_class": "person",
    "unicode": ""
  },
  {
    "font_class": "person-filled",
    "unicode": ""
  },
  {
    "font_class": "personadd",
    "unicode": ""
  },
  {
    "font_class": "personadd-filled",
    "unicode": ""
  },
  {
    "font_class": "personadd-filled-copy",
    "unicode": ""
  },
  {
    "font_class": "phone",
    "unicode": ""
  },
  {
    "font_class": "phone-filled",
    "unicode": ""
  },
  {
    "font_class": "plus",
    "unicode": ""
  },
  {
    "font_class": "plus-filled",
    "unicode": ""
  },
  {
    "font_class": "plusempty",
    "unicode": ""
  },
  {
    "font_class": "pulldown",
    "unicode": ""
  },
  {
    "font_class": "pyq",
    "unicode": ""
  },
  {
    "font_class": "qq",
    "unicode": ""
  },
  {
    "font_class": "redo",
    "unicode": ""
  },
  {
    "font_class": "redo-filled",
    "unicode": ""
  },
  {
    "font_class": "refresh",
    "unicode": ""
  },
  {
    "font_class": "refresh-filled",
    "unicode": ""
  },
  {
    "font_class": "refreshempty",
    "unicode": ""
  },
  {
    "font_class": "reload",
    "unicode": ""
  },
  {
    "font_class": "right",
    "unicode": ""
  },
  {
    "font_class": "scan",
    "unicode": ""
  },
  {
    "font_class": "search",
    "unicode": ""
  },
  {
    "font_class": "settings",
    "unicode": ""
  },
  {
    "font_class": "settings-filled",
    "unicode": ""
  },
  {
    "font_class": "shop",
    "unicode": ""
  },
  {
    "font_class": "shop-filled",
    "unicode": ""
  },
  {
    "font_class": "smallcircle",
    "unicode": ""
  },
  {
    "font_class": "smallcircle-filled",
    "unicode": ""
  },
  {
    "font_class": "sound",
    "unicode": ""
  },
  {
    "font_class": "sound-filled",
    "unicode": ""
  },
  {
    "font_class": "spinner-cycle",
    "unicode": ""
  },
  {
    "font_class": "staff",
    "unicode": ""
  },
  {
    "font_class": "staff-filled",
    "unicode": ""
  },
  {
    "font_class": "star",
    "unicode": ""
  },
  {
    "font_class": "star-filled",
    "unicode": ""
  },
  {
    "font_class": "starhalf",
    "unicode": ""
  },
  {
    "font_class": "trash",
    "unicode": ""
  },
  {
    "font_class": "trash-filled",
    "unicode": ""
  },
  {
    "font_class": "tune",
    "unicode": ""
  },
  {
    "font_class": "tune-filled",
    "unicode": ""
  },
  {
    "font_class": "undo",
    "unicode": ""
  },
  {
    "font_class": "undo-filled",
    "unicode": ""
  },
  {
    "font_class": "up",
    "unicode": ""
  },
  {
    "font_class": "top",
    "unicode": ""
  },
  {
    "font_class": "upload",
    "unicode": ""
  },
  {
    "font_class": "upload-filled",
    "unicode": ""
  },
  {
    "font_class": "videocam",
    "unicode": ""
  },
  {
    "font_class": "videocam-filled",
    "unicode": ""
  },
  {
    "font_class": "vip",
    "unicode": ""
  },
  {
    "font_class": "vip-filled",
    "unicode": ""
  },
  {
    "font_class": "wallet",
    "unicode": ""
  },
  {
    "font_class": "wallet-filled",
    "unicode": ""
  },
  {
    "font_class": "weibo",
    "unicode": ""
  },
  {
    "font_class": "weixin",
    "unicode": ""
  }
];
const iconUrl = "/assets/uniicons.32e978a5.ttf";
const _style_0$5 = { "uni-icons": { "": { "fontFamily": "uniicons", "textDecoration": "none", "textAlign": "center" } } };
const getVal = (val) => {
  const reg = /^[0-9]*$/g;
  return typeof val === "number" || reg.test(val) ? val + "px" : val;
};
var domModule = weex.requireModule("dom");
domModule.addRule("fontFace", {
  "fontFamily": "uniicons",
  "src": "url('" + iconUrl + "')"
});
const _sfc_main$6 = {
  name: "UniIcons",
  emits: ["click"],
  props: {
    type: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#333333"
    },
    size: {
      type: [Number, String],
      default: 16
    },
    customPrefix: {
      type: String,
      default: ""
    },
    fontFamily: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      icons: fontData
    };
  },
  computed: {
    unicode() {
      let code = this.icons.find((v2) => v2.font_class === this.type);
      if (code) {
        return code.unicode;
      }
      return "";
    },
    iconSize() {
      return getVal(this.size);
    },
    styleObj() {
      if (this.fontFamily !== "") {
        return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
      }
      return `color: ${this.color}; font-size: ${this.iconSize};`;
    }
  },
  methods: {
    _onClick() {
      this.$emit("click");
    }
  }
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("u-text", {
    style: normalizeStyle($options.styleObj),
    class: "uni-icons",
    onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
  }, toDisplayString($options.unicode), 5);
}
const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["styles", [_style_0$5]]]);
const isObject = (val) => val !== null && typeof val === "object";
const defaultDelimiters = ["{", "}"];
class BaseFormatter {
  constructor() {
    this._caches = /* @__PURE__ */ Object.create(null);
  }
  interpolate(message, values, delimiters = defaultDelimiters) {
    if (!values) {
      return [message];
    }
    let tokens = this._caches[message];
    if (!tokens) {
      tokens = parse(message, delimiters);
      this._caches[message] = tokens;
    }
    return compile(tokens, values);
  }
}
const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, [startDelimiter, endDelimiter]) {
  const tokens = [];
  let position = 0;
  let text = "";
  while (position < format.length) {
    let char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: "text", value: text });
      }
      text = "";
      let sub = "";
      char = format[position++];
      while (char !== void 0 && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      const isClosed = char === endDelimiter;
      const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
      tokens.push({ value: sub, type });
    } else {
      text += char;
    }
  }
  text && tokens.push({ type: "text", value: text });
  return tokens;
}
function compile(tokens, values) {
  const compiled = [];
  let index = 0;
  const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
  if (mode === "unknown") {
    return compiled;
  }
  while (index < tokens.length) {
    const token = tokens[index];
    switch (token.type) {
      case "text":
        compiled.push(token.value);
        break;
      case "list":
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case "named":
        if (mode === "named") {
          compiled.push(values[token.value]);
        }
        break;
    }
    index++;
  }
  return compiled;
}
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages2) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  if (messages2 && messages2[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages2 && Object.keys(messages2).length > 0) {
    locales = Object.keys(messages2);
  }
  const lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
class I18n {
  constructor({ locale, fallbackLocale, messages: messages2, watcher, formater: formater2 }) {
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater2 || defaultFormatter;
    this.messages = messages2 || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  setLocale(locale) {
    const oldLocale = this.locale;
    this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
    if (!this.messages[this.locale]) {
      this.messages[this.locale] = {};
    }
    this.message = this.messages[this.locale];
    if (oldLocale !== this.locale) {
      this.watchers.forEach((watcher) => {
        watcher(this.locale, oldLocale);
      });
    }
  }
  getLocale() {
    return this.locale;
  }
  watchLocale(fn) {
    const index = this.watchers.push(fn) - 1;
    return () => {
      this.watchers.splice(index, 1);
    };
  }
  add(locale, message, override = true) {
    const curMessages = this.messages[locale];
    if (curMessages) {
      if (override) {
        Object.assign(curMessages, message);
      } else {
        Object.keys(message).forEach((key) => {
          if (!hasOwn(curMessages, key)) {
            curMessages[key] = message[key];
          }
        });
      }
    } else {
      this.messages[locale] = message;
    }
  }
  f(message, values, delimiters) {
    return this.formater.interpolate(message, values, delimiters).join("");
  }
  t(key, locale, values) {
    let message = this.message;
    if (typeof locale === "string") {
      locale = normalizeLocale(locale, this.messages);
      locale && (message = this.messages[locale]);
    } else {
      values = locale;
    }
    if (!hasOwn(message, key)) {
      console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
      return key;
    }
    return this.formater.interpolate(message[key], values).join("");
  }
}
function watchAppLocale(appVm, i18n) {
  if (appVm.$watchLocale) {
    appVm.$watchLocale((newLocale) => {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(() => appVm.$locale, (newLocale) => {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== "undefined" && uni.getLocale) {
    return uni.getLocale();
  }
  if (typeof global !== "undefined" && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale, messages2 = {}, fallbackLocale, watcher) {
  if (typeof locale !== "string") {
    const options = [
      messages2,
      locale
    ];
    locale = options[0];
    messages2 = options[1];
  }
  if (typeof locale !== "string") {
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== "string") {
    fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  const i18n = new I18n({
    locale,
    fallbackLocale,
    messages: messages2,
    watcher
  });
  let t2 = (key, values) => {
    if (typeof getApp !== "function") {
      t2 = function(key2, values2) {
        return i18n.t(key2, values2);
      };
    } else {
      let isWatchedAppLocale = false;
      t2 = function(key2, values2) {
        const appVm = getApp().$vm;
        if (appVm) {
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key2, values2);
      };
    }
    return t2(key, values);
  };
  return {
    i18n,
    f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t(key, values) {
      return t2(key, values);
    },
    add(locale2, message, override = true) {
      return i18n.add(locale2, message, override);
    },
    watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale() {
      return i18n.getLocale();
    },
    setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
const en$1 = {
  "uni-search-bar.cancel": "cancel",
  "uni-search-bar.placeholder": "Search enter content"
};
const zhHans$1 = {
  "uni-search-bar.cancel": "取消",
  "uni-search-bar.placeholder": "请输入搜索内容"
};
const zhHant$1 = {
  "uni-search-bar.cancel": "取消",
  "uni-search-bar.placeholder": "請輸入搜索內容"
};
const messages$1 = {
  en: en$1,
  "zh-Hans": zhHans$1,
  "zh-Hant": zhHant$1
};
const _style_0$4 = { "uni-searchbar": { "": { "flexDirection": "row", "position": "relative", "paddingTop": 10, "paddingRight": 10, "paddingBottom": 10, "paddingLeft": 10 } }, "uni-searchbar__box": { "": { "overflow": "hidden", "position": "relative", "flex": 1, "justifyContent": "center", "flexDirection": "row", "alignItems": "center", "height": 36, "paddingTop": 5, "paddingRight": 8, "paddingBottom": 5, "paddingLeft": 0 } }, "uni-searchbar__box-icon-search": { "": { "flexDirection": "row", "paddingTop": 0, "paddingRight": 8, "paddingBottom": 0, "paddingLeft": 8, "justifyContent": "center", "alignItems": "center", "color": "#B3B3B3" } }, "uni-searchbar__box-search-input": { "": { "flex": 1, "fontSize": 14, "color": "#333333" } }, "uni-searchbar__box-icon-clear": { "": { "alignItems": "center", "lineHeight": 24, "paddingLeft": 8 } }, "uni-searchbar__text-placeholder": { "": { "fontSize": 14, "color": "#B3B3B3", "marginLeft": 5 } }, "uni-searchbar__cancel": { "": { "paddingLeft": 10, "lineHeight": 36, "fontSize": 14, "color": "#333333" } } };
const {
  t: t$1
} = initVueI18n(messages$1);
const _sfc_main$5 = {
  name: "UniSearchBar",
  emits: ["input", "update:modelValue", "clear", "cancel", "confirm", "blur", "focus"],
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    radius: {
      type: [Number, String],
      default: 5
    },
    clearButton: {
      type: String,
      default: "auto"
    },
    cancelButton: {
      type: String,
      default: "auto"
    },
    cancelText: {
      type: String,
      default: ""
    },
    bgColor: {
      type: String,
      default: "#F8F8F8"
    },
    maxlength: {
      type: [Number, String],
      default: 100
    },
    value: {
      type: [Number, String],
      default: ""
    },
    modelValue: {
      type: [Number, String],
      default: ""
    },
    focus: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      showSync: false,
      searchVal: ""
    };
  },
  computed: {
    cancelTextI18n() {
      return this.cancelText || t$1("uni-search-bar.cancel");
    },
    placeholderText() {
      return this.placeholder || t$1("uni-search-bar.placeholder");
    }
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(newVal) {
        this.searchVal = newVal;
        if (newVal) {
          this.show = true;
        }
      }
    },
    focus: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          if (this.readonly)
            return;
          this.show = true;
          this.$nextTick(() => {
            this.showSync = true;
          });
        }
      }
    },
    searchVal(newVal, oldVal) {
      this.$emit("input", newVal);
      this.$emit("update:modelValue", newVal);
    }
  },
  methods: {
    searchClick() {
      if (this.readonly)
        return;
      if (this.show) {
        return;
      }
      this.show = true;
      this.$nextTick(() => {
        this.showSync = true;
      });
    },
    clear() {
      this.$emit("clear", {
        value: this.searchVal
      });
      this.searchVal = "";
    },
    cancel() {
      if (this.readonly)
        return;
      this.$emit("cancel", {
        value: this.searchVal
      });
      this.searchVal = "";
      this.show = false;
      this.showSync = false;
      plus.key.hideSoftKeybord();
    },
    confirm() {
      plus.key.hideSoftKeybord();
      this.$emit("confirm", {
        value: this.searchVal
      });
    },
    blur() {
      plus.key.hideSoftKeybord();
      this.$emit("blur", {
        value: this.searchVal
      });
    },
    emitFocus(e2) {
      this.$emit("focus", e2.detail);
    }
  }
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_uni_icons = resolveEasycom(resolveDynamicComponent("uni-icons"), __easycom_0);
  return openBlock(), createElementBlock("view", {
    class: "uni-searchbar",
    renderWhole: true
  }, [
    createElementVNode("view", {
      style: normalizeStyle({ borderRadius: $props.radius + "px", backgroundColor: $props.bgColor }),
      class: "uni-searchbar__box",
      onClick: _cache[5] || (_cache[5] = (...args) => $options.searchClick && $options.searchClick(...args))
    }, [
      createElementVNode("view", { class: "uni-searchbar__box-icon-search" }, [
        renderSlot(_ctx.$slots, "searchIcon", {}, () => [
          createVNode(_component_uni_icons, {
            color: "#c0c4cc",
            size: "18",
            type: "search"
          })
        ])
      ]),
      $data.show || $data.searchVal ? (openBlock(), createElementBlock("u-input", {
        key: 0,
        focus: $data.showSync,
        disabled: $props.readonly,
        placeholder: $options.placeholderText,
        maxlength: $props.maxlength,
        class: "uni-searchbar__box-search-input",
        confirmType: "search",
        type: "text",
        modelValue: $data.searchVal,
        onInput: _cache[0] || (_cache[0] = ($event) => $data.searchVal = $event.detail.value),
        onConfirm: _cache[1] || (_cache[1] = (...args) => $options.confirm && $options.confirm(...args)),
        onBlur: _cache[2] || (_cache[2] = (...args) => $options.blur && $options.blur(...args)),
        onFocus: _cache[3] || (_cache[3] = (...args) => $options.emitFocus && $options.emitFocus(...args))
      }, null, 40, ["focus", "disabled", "placeholder", "maxlength", "modelValue"])) : (openBlock(), createElementBlock("u-text", {
        key: 1,
        class: "uni-searchbar__text-placeholder"
      }, toDisplayString($props.placeholder), 1)),
      $data.show && ($props.clearButton === "always" || $props.clearButton === "auto" && $data.searchVal !== "") && !$props.readonly ? (openBlock(), createElementBlock("view", {
        key: 2,
        class: "uni-searchbar__box-icon-clear",
        onClick: _cache[4] || (_cache[4] = (...args) => $options.clear && $options.clear(...args))
      }, [
        renderSlot(_ctx.$slots, "clearIcon", {}, () => [
          createVNode(_component_uni_icons, {
            color: "#c0c4cc",
            size: "20",
            type: "clear"
          })
        ])
      ])) : createCommentVNode("", true)
    ], 4),
    $props.cancelButton === "always" || $data.show && $props.cancelButton === "auto" ? (openBlock(), createElementBlock("u-text", {
      key: 0,
      onClick: _cache[6] || (_cache[6] = (...args) => $options.cancel && $options.cancel(...args)),
      class: "uni-searchbar__cancel"
    }, toDisplayString($options.cancelTextI18n), 1)) : createCommentVNode("", true)
  ]);
}
const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["styles", [_style_0$4]]]);
const en = {
  "uniCloud.component.add.success": "Success",
  "uniCloud.component.update.success": "Success",
  "uniCloud.component.remove.showModal.title": "Tips",
  "uniCloud.component.remove.showModal.content": "是否删除该数据"
};
const es = {
  "uniCloud.component.add.success": "新增成功",
  "uniCloud.component.update.success": "修改成功",
  "uniCloud.component.remove.showModal.title": "提示",
  "uniCloud.component.remove.showModal.content": "是否删除该数据"
};
const fr = {
  "uniCloud.component.add.success": "新增成功",
  "uniCloud.component.update.success": "修改成功",
  "uniCloud.component.remove.showModal.title": "提示",
  "uniCloud.component.remove.showModal.content": "是否删除该数据"
};
const zhHans = {
  "uniCloud.component.add.success": "新增成功",
  "uniCloud.component.update.success": "修改成功",
  "uniCloud.component.remove.showModal.title": "提示",
  "uniCloud.component.remove.showModal.content": "是否删除该数据"
};
const zhHant = {
  "uniCloud.component.add.success": "新增成功",
  "uniCloud.component.update.success": "修改成功",
  "uniCloud.component.remove.showModal.title": "提示",
  "uniCloud.component.remove.showModal.content": "是否刪除數據"
};
const messages = {
  en,
  es,
  fr,
  "zh-Hans": zhHans,
  "zh-Hant": zhHant
};
const isArray = Array.isArray;
const { t } = initVueI18n(messages);
const events = {
  load: "load",
  error: "error"
};
const pageMode = {
  add: "add",
  replace: "replace"
};
const loadMode = {
  auto: "auto",
  onready: "onready",
  manual: "manual"
};
const attrs = [
  "pageCurrent",
  "pageSize",
  "collection",
  "action",
  "field",
  "getcount",
  "orderby",
  "where",
  "groupby",
  "groupField",
  "distinct"
];
const _sfc_main$4 = {
  name: "UniClouddb",
  setup(props) {
    const dataListRef = props.ssrKey ? props.getone ? shallowSsrRef(void 0, props.ssrKey) : ssrRef([], props.ssrKey) : props.getone ? shallowSsrRef(void 0, "Fr0Bix7QXnuHb5bm+Yxeuw==") : ssrRef([], "V8fF9aQ8CzvIBD+E9MCQJA==");
    const instance = getCurrentInstance();
    onMounted(() => {
      if ((!dataListRef.value || dataListRef.value.length === 0) && !props.manual && props.loadtime === loadMode.auto) {
        instance.proxy.loadData();
      }
    });
    return { dataList: dataListRef };
  },
  // 服务端serverPrefetch生命周期，用于服务端加载数据，等将来全端支持Suspense时，可以采用 Suspense + async setup 来实现一版
  async serverPrefetch() {
    if (!this.manual && this.loadtime === loadMode.auto) {
      return this.loadData();
    }
  },
  props: {
    options: {
      type: [Object, Array],
      default() {
        return {};
      }
    },
    spaceInfo: {
      type: Object,
      default() {
        return {};
      }
    },
    collection: {
      type: [String, Array],
      default: ""
    },
    action: {
      type: String,
      default: ""
    },
    field: {
      type: String,
      default: ""
    },
    orderby: {
      type: String,
      default: ""
    },
    where: {
      type: [String, Object],
      default: ""
    },
    pageData: {
      type: String,
      default: "add"
    },
    pageCurrent: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 20
    },
    getcount: {
      type: [Boolean, String],
      default: false
    },
    getone: {
      type: [Boolean, String],
      default: false
    },
    gettree: {
      type: [Boolean, String, Object],
      default: false
    },
    gettreepath: {
      type: [Boolean, String],
      default: false
    },
    startwith: {
      type: String,
      default: ""
    },
    limitlevel: {
      type: Number,
      default: 10
    },
    groupby: {
      type: String,
      default: ""
    },
    groupField: {
      type: String,
      default: ""
    },
    distinct: {
      type: [Boolean, String],
      default: false
    },
    pageIndistinct: {
      type: [Boolean, String],
      default: false
    },
    foreignKey: {
      type: String,
      default: ""
    },
    loadtime: {
      type: String,
      default: "auto"
    },
    manual: {
      type: Boolean,
      default: false
    },
    ssrKey: {
      type: [String, Number],
      default: ""
    }
  },
  data() {
    return {
      loading: false,
      hasMore: false,
      paginationInternal: {},
      errorMessage: ""
    };
  },
  computed: {
    collectionArgs() {
      return isArray(this.collection) ? this.collection : [this.collection];
    },
    isLookup() {
      return isArray(this.collection) && this.collection.length > 1 || typeof this.collection === "string" && this.collection.indexOf(",") > -1;
    },
    mainCollection() {
      if (typeof this.collection === "string") {
        return this.collection.split(",")[0];
      }
      const mainQuery = JSON.parse(JSON.stringify(this.collection[0]));
      return mainQuery.$db[0].$param[0];
    }
  },
  created() {
    this._isEnded = false;
    this.paginationInternal = {
      current: this.pageCurrent,
      size: this.pageSize,
      count: 0
    };
    this.$watch(() => {
      var al = [];
      attrs.forEach((key) => {
        al.push(this[key]);
      });
      return al;
    }, (newValue, oldValue) => {
      this.paginationInternal.size = this.pageSize;
      if (newValue[0] !== oldValue[0]) {
        this.paginationInternal.current = this.pageCurrent;
      }
      if (this.loadtime === loadMode.manual) {
        return;
      }
      let needReset = false;
      for (let i2 = 2; i2 < newValue.length; i2++) {
        if (newValue[i2] !== oldValue[i2]) {
          needReset = true;
          break;
        }
      }
      if (needReset) {
        this.clear();
        this.reset();
      }
      this._execLoadData();
    });
  },
  methods: {
    loadData(args1, args2) {
      let callback = null;
      let clear = false;
      if (typeof args1 === "object") {
        if (args1.clear) {
          if (this.pageData === pageMode.replace) {
            this.clear();
          } else {
            clear = args1.clear;
          }
          this.reset();
        }
        if (args1.current !== void 0) {
          this.paginationInternal.current = args1.current;
        }
        if (typeof args2 === "function") {
          callback = args2;
        }
      } else if (typeof args1 === "function") {
        callback = args1;
      }
      return this._execLoadData(callback, clear);
    },
    loadMore() {
      if (this._isEnded || this.loading) {
        return;
      }
      if (this.pageData === pageMode.add) {
        this.paginationInternal.current++;
      }
      this._execLoadData();
    },
    refresh() {
      this.clear();
      this._execLoadData();
    },
    clear() {
      this._isEnded = false;
      this.dataList = [];
    },
    reset() {
      this.paginationInternal.current = 1;
    },
    add(value, {
      action,
      showToast = true,
      toastTitle,
      success,
      fail,
      complete,
      needConfirm = true,
      needLoading = true,
      loadingTitle = ""
    } = {}) {
      if (needLoading) {
        uni.showLoading({
          title: loadingTitle
        });
      }
      let db = er.database(this.spaceInfo);
      if (action) {
        db = db.action(action);
      }
      db.collection(this.mainCollection).add(value).then((res) => {
        success && success(res);
        if (showToast) {
          uni.showToast({
            title: toastTitle || t("uniCloud.component.add.success")
          });
        }
      }).catch((err) => {
        fail && fail(err);
        if (needConfirm) {
          uni.showModal({
            content: err.message,
            showCancel: false
          });
        }
      }).finally(() => {
        if (needLoading) {
          uni.hideLoading();
        }
        complete && complete();
      });
    },
    remove(id, {
      action,
      success,
      fail,
      complete,
      confirmTitle,
      confirmContent,
      needConfirm = true,
      needLoading = true,
      loadingTitle = ""
    } = {}) {
      if (!id || !id.length) {
        return;
      }
      if (!needConfirm) {
        this._execRemove(id, action, success, fail, complete, needConfirm, needLoading, loadingTitle);
        return;
      }
      uni.showModal({
        title: confirmTitle || t("uniCloud.component.remove.showModal.title"),
        content: confirmContent || t("uniCloud.component.remove.showModal.content"),
        showCancel: true,
        success: (res) => {
          if (!res.confirm) {
            return;
          }
          this._execRemove(id, action, success, fail, complete, needConfirm, needLoading, loadingTitle);
        }
      });
    },
    update(id, value, {
      action,
      showToast = true,
      toastTitle,
      success,
      fail,
      complete,
      needConfirm = true,
      needLoading = true,
      loadingTitle = ""
    } = {}) {
      if (needLoading) {
        uni.showLoading({
          title: loadingTitle
        });
      }
      let db = er.database(this.spaceInfo);
      if (action) {
        db = db.action(action);
      }
      return db.collection(this.mainCollection).doc(id).update(value).then((res) => {
        success && success(res);
        if (showToast) {
          uni.showToast({
            title: toastTitle || t("uniCloud.component.update.success")
          });
        }
      }).catch((err) => {
        fail && fail(err);
        if (needConfirm) {
          uni.showModal({
            content: err.message,
            showCancel: false
          });
        }
      }).finally(() => {
        if (needLoading) {
          uni.hideLoading();
        }
        complete && complete();
      });
    },
    getTemp(isTemp = true) {
      let db = er.database(this.spaceInfo);
      if (this.action) {
        db = db.action(this.action);
      }
      db = db.collection(...this.collectionArgs);
      if (this.foreignKey) {
        db = db.foreignKey(this.foreignKey);
      }
      if (!(!this.where || !Object.keys(this.where).length)) {
        db = db.where(this.where);
      }
      if (this.field) {
        db = db.field(this.field);
      }
      if (this.groupby) {
        db = db.groupBy(this.groupby);
      }
      if (this.groupField) {
        db = db.groupField(this.groupField);
      }
      if (this.distinct === true) {
        db = db.distinct();
      }
      if (this.orderby) {
        db = db.orderBy(this.orderby);
      }
      const {
        current,
        size
      } = this.paginationInternal;
      const getOptions = {};
      if (this.getcount) {
        getOptions.getCount = this.getcount;
      }
      const treeOptions = {
        limitLevel: this.limitlevel,
        startWith: this.startwith
      };
      if (this.gettree) {
        getOptions.getTree = treeOptions;
      }
      if (this.gettreepath) {
        getOptions.getTreePath = treeOptions;
      }
      db = db.skip(size * (current - 1)).limit(size);
      if (isTemp) {
        db = db.getTemp(getOptions);
        db.udb = this;
      } else {
        db = db.get(getOptions);
      }
      return db;
    },
    setResult(result) {
      if (result.code === 0) {
        this._execLoadDataSuccess(result);
      } else {
        this._execLoadDataFail(new Error(result.message));
      }
    },
    _execLoadData(callback, clear) {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.errorMessage = "";
      return this._getExec().then((res) => {
        this.loading = false;
        this._execLoadDataSuccess(res.result, callback, clear);
      }).catch((err) => {
        this.loading = false;
        this._execLoadDataFail(err, callback);
      });
    },
    _execLoadDataSuccess(result, callback, clear) {
      const {
        data,
        count
      } = result;
      this._isEnded = count !== void 0 ? this.paginationInternal.current * this.paginationInternal.size >= count : data.length < this.pageSize;
      this.hasMore = !this._isEnded;
      const data2 = this.getone ? data.length ? data[0] : void 0 : data;
      if (this.getcount) {
        this.paginationInternal.count = count;
      }
      callback && callback(data2, this._isEnded, this.paginationInternal);
      this._dispatchEvent(events.load, data2);
      if (this.getone || this.pageData === pageMode.replace) {
        this.dataList = data2;
      } else {
        if (clear) {
          this.dataList = data2;
        } else {
          this.dataList.push(...data2);
        }
      }
    },
    _execLoadDataFail(err, callback) {
      this.errorMessage = err;
      callback && callback();
      this.$emit(events.error, err);
    },
    _getExec() {
      return this.getTemp(false);
    },
    _execRemove(id, action, success, fail, complete, needConfirm, needLoading, loadingTitle) {
      if (!this.collection || !id) {
        return;
      }
      const ids = isArray(id) ? id : [id];
      if (!ids.length) {
        return;
      }
      if (needLoading) {
        uni.showLoading({
          mask: true,
          title: loadingTitle
        });
      }
      const db = er.database(this.spaceInfo);
      const dbCmd = db.command;
      let exec = db;
      if (action) {
        exec = exec.action(action);
      }
      exec.collection(this.mainCollection).where({
        _id: dbCmd.in(ids)
      }).remove().then((res) => {
        success && success(res.result);
        if (this.pageData === pageMode.replace) {
          this.refresh();
        } else {
          this.removeData(ids);
        }
      }).catch((err) => {
        fail && fail(err);
        if (needConfirm) {
          uni.showModal({
            content: err.message,
            showCancel: false
          });
        }
      }).finally(() => {
        if (needLoading) {
          uni.hideLoading();
        }
        complete && complete();
      });
    },
    removeData(ids) {
      const il = ids.slice(0);
      const dl = this.dataList;
      for (let i2 = dl.length - 1; i2 >= 0; i2--) {
        const index = il.indexOf(dl[i2]._id);
        if (index >= 0) {
          dl.splice(i2, 1);
          il.splice(index, 1);
        }
      }
    },
    _dispatchEvent(type, data) {
      if (this._changeDataFunction) {
        this._changeDataFunction(data, this._isEnded, this.paginationInternal);
      } else {
        this.$emit(type, data, this._isEnded, this.paginationInternal);
      }
    }
  }
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", { renderWhole: true }, [
    renderSlot(_ctx.$slots, "default", {
      options: $props.options,
      data: $setup.dataList,
      pagination: $data.paginationInternal,
      loading: $data.loading,
      hasMore: $data.hasMore,
      error: $data.errorMessage
    })
  ]);
}
const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4]]);
const _style_0$3 = { "uni-badge--x": { "": { "position": "relative" } }, "uni-badge--absolute": { "": { "position": "absolute" } }, "uni-badge--small": { "": { "transform": "scale(0.8)", "transformOrigin": "center center" } }, "uni-badge": { "": { "justifyContent": "center", "flexDirection": "row", "height": 20, "paddingTop": 0, "paddingRight": 4, "paddingBottom": 0, "paddingLeft": 4, "lineHeight": 18, "color": "#ffffff", "borderRadius": 100, "backgroundColor": "rgba(0,0,0,0)", "borderWidth": 1, "borderStyle": "solid", "borderColor": "#ffffff", "textAlign": "center", "fontFamily": '"Helvetica Neue", Helvetica, sans-serif', "fontSize": 12 } }, "uni-badge--info": { "": { "color": "#ffffff", "backgroundColor": "#909399" } }, "uni-badge--primary": { "": { "backgroundColor": "#2979ff" } }, "uni-badge--success": { "": { "backgroundColor": "#4cd964" } }, "uni-badge--warning": { "": { "backgroundColor": "#f0ad4e" } }, "uni-badge--error": { "": { "backgroundColor": "#dd524d" } }, "uni-badge--inverted": { "": { "paddingTop": 0, "paddingRight": 5, "paddingBottom": 0, "paddingLeft": 0, "color": "#909399" } }, "uni-badge--info-inverted": { "": { "color": "#909399", "backgroundColor": "rgba(0,0,0,0)" } }, "uni-badge--primary-inverted": { "": { "color": "#2979ff", "backgroundColor": "rgba(0,0,0,0)" } }, "uni-badge--success-inverted": { "": { "color": "#4cd964", "backgroundColor": "rgba(0,0,0,0)" } }, "uni-badge--warning-inverted": { "": { "color": "#f0ad4e", "backgroundColor": "rgba(0,0,0,0)" } }, "uni-badge--error-inverted": { "": { "color": "#dd524d", "backgroundColor": "rgba(0,0,0,0)" } } };
const _sfc_main$3 = {
  name: "UniBadge",
  emits: ["click"],
  props: {
    type: {
      type: String,
      default: "error"
    },
    inverted: {
      type: Boolean,
      default: false
    },
    isDot: {
      type: Boolean,
      default: false
    },
    maxNum: {
      type: Number,
      default: 99
    },
    absolute: {
      type: String,
      default: ""
    },
    offset: {
      type: Array,
      default() {
        return [0, 0];
      }
    },
    text: {
      type: [String, Number],
      default: ""
    },
    size: {
      type: String,
      default: "small"
    },
    customStyle: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    width() {
      return String(this.text).length * 8 + 12;
    },
    classNames() {
      const {
        inverted,
        type,
        size,
        absolute
      } = this;
      return [
        inverted ? "uni-badge--" + type + "-inverted" : "",
        "uni-badge--" + type,
        "uni-badge--" + size,
        absolute ? "uni-badge--absolute" : ""
      ].join(" ");
    },
    positionStyle() {
      if (!this.absolute)
        return {};
      let w2 = this.width / 2, h2 = 10;
      if (this.isDot) {
        w2 = 5;
        h2 = 5;
      }
      const x = `${-w2 + this.offset[0]}px`;
      const y2 = `${-h2 + this.offset[1]}px`;
      const whiteList = {
        rightTop: {
          right: x,
          top: y2
        },
        rightBottom: {
          right: x,
          bottom: y2
        },
        leftBottom: {
          left: x,
          bottom: y2
        },
        leftTop: {
          left: x,
          top: y2
        }
      };
      const match = whiteList[this.absolute];
      return match ? match : whiteList["rightTop"];
    },
    dotStyle() {
      if (!this.isDot)
        return {};
      return {
        width: "10px",
        minWidth: "0",
        height: "10px",
        padding: "0",
        borderRadius: "10px"
      };
    },
    displayValue() {
      const {
        isDot,
        text,
        maxNum
      } = this;
      return isDot ? "" : Number(text) > maxNum ? `${maxNum}+` : text;
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("view", {
    class: "uni-badge--x",
    renderWhole: true
  }, [
    renderSlot(_ctx.$slots, "default"),
    $props.text ? (openBlock(), createElementBlock("u-text", {
      key: 0,
      class: normalizeClass([$options.classNames, "uni-badge"]),
      style: normalizeStyle([$options.positionStyle, $props.customStyle, $options.dotStyle]),
      onClick: _cache[0] || (_cache[0] = ($event) => $options.onClick())
    }, toDisplayString($options.displayValue), 7)) : createCommentVNode("", true)
  ]);
}
const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["styles", [_style_0$3]]]);
const _style_0$2 = { "uni-list-item": { "": { "fontSize": 16, "position": "relative", "justifyContent": "space-between", "alignItems": "center", "backgroundColor": "#ffffff", "flexDirection": "row" } }, "uni-list-item--disabled": { "": { "opacity": 0.3 } }, "uni-list-item--hover": { "": { "backgroundColor": "#f1f1f1" } }, "uni-list-item__container": { "": { "position": "relative", "flexDirection": "row", "paddingTop": 12, "paddingRight": 15, "paddingBottom": 12, "paddingLeft": 15, "flex": 1, "overflow": "hidden" } }, "container--right": { "": { "paddingRight": 0 } }, "uni-list--border": { "": { "position": "absolute", "top": 0, "right": 0, "left": 0, "borderTopColor": "#e5e5e5", "borderTopStyle": "solid", "borderTopWidth": 0.5 } }, "uni-list-item__content": { "": { "paddingRight": 8, "flex": 1, "color": "#3b4144", "flexDirection": "column", "justifyContent": "space-between", "overflow": "hidden" } }, "uni-list-item__content--center": { "": { "justifyContent": "center" } }, "uni-list-item__content-title": { "": { "fontSize": 14, "color": "#3b4144", "overflow": "hidden" } }, "uni-list-item__content-note": { "": { "marginTop": "6rpx", "color": "#999999", "fontSize": 12, "overflow": "hidden" } }, "uni-list-item__extra": { "": { "flexDirection": "row", "justifyContent": "flex-end", "alignItems": "center" } }, "uni-list-item__header": { "": { "flexDirection": "row", "alignItems": "center" } }, "uni-list-item__icon": { "": { "marginRight": "18rpx", "flexDirection": "row", "justifyContent": "center", "alignItems": "center" } }, "uni-list-item__icon-img": { "": { "height": 26, "width": 26, "marginRight": 10 } }, "uni-icon-wrapper": { "": { "alignItems": "center", "paddingTop": 0, "paddingRight": 10, "paddingBottom": 0, "paddingLeft": 10 } }, "flex--direction": { "": { "flexDirection": "column" } }, "uni-list--lg": { "": { "height": 40, "width": 40 } }, "uni-list--base": { "": { "height": 26, "width": 26 } }, "uni-list--sm": { "": { "height": 20, "width": 20 } }, "uni-list-item__extra-text": { "": { "color": "#999999", "fontSize": 12 } }, "uni-ellipsis-1": { "": { "lines": 1, "textOverflow": "ellipsis" } }, "uni-ellipsis-2": { "": { "lines": 2, "textOverflow": "ellipsis" } } };
const _sfc_main$2 = {
  name: "UniListItem",
  emits: ["click", "switchChange"],
  props: {
    direction: {
      type: String,
      default: "row"
    },
    title: {
      type: String,
      default: ""
    },
    note: {
      type: String,
      default: ""
    },
    ellipsis: {
      type: [Number, String],
      default: 0
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    clickable: {
      type: Boolean,
      default: false
    },
    showArrow: {
      type: [Boolean, String],
      default: false
    },
    link: {
      type: [Boolean, String],
      default: false
    },
    to: {
      type: String,
      default: ""
    },
    showBadge: {
      type: [Boolean, String],
      default: false
    },
    showSwitch: {
      type: [Boolean, String],
      default: false
    },
    switchChecked: {
      type: [Boolean, String],
      default: false
    },
    badgeText: {
      type: String,
      default: ""
    },
    badgeType: {
      type: String,
      default: "success"
    },
    badgeStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    rightText: {
      type: String,
      default: ""
    },
    thumb: {
      type: String,
      default: ""
    },
    thumbSize: {
      type: String,
      default: "base"
    },
    showExtraIcon: {
      type: [Boolean, String],
      default: false
    },
    extraIcon: {
      type: Object,
      default() {
        return {
          type: "",
          color: "#000000",
          size: 20,
          customPrefix: ""
        };
      }
    },
    border: {
      type: Boolean,
      default: true
    },
    customStyle: {
      type: Object,
      default() {
        return {
          padding: "",
          backgroundColor: "#FFFFFF"
        };
      }
    },
    keepScrollPosition: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    "customStyle.padding": {
      handler(padding) {
        if (typeof padding == "number") {
          padding += "";
        }
        let paddingArr = padding.split(" ");
        if (paddingArr.length === 1) {
          const allPadding = paddingArr[0];
          this.padding = {
            "top": allPadding,
            "right": allPadding,
            "bottom": allPadding,
            "left": allPadding
          };
        } else if (paddingArr.length === 2) {
          const [verticalPadding, horizontalPadding] = paddingArr;
          this.padding = {
            "top": verticalPadding,
            "right": horizontalPadding,
            "bottom": verticalPadding,
            "left": horizontalPadding
          };
        } else if (paddingArr.length === 4) {
          const [topPadding, rightPadding, bottomPadding, leftPadding] = paddingArr;
          this.padding = {
            "top": topPadding,
            "right": rightPadding,
            "bottom": bottomPadding,
            "left": leftPadding
          };
        }
      },
      immediate: true
    }
  },
  // inject: ['list'],
  data() {
    return {
      isFirstChild: false,
      padding: {
        top: "",
        right: "",
        bottom: "",
        left: ""
      }
    };
  },
  mounted() {
    this.list = this.getForm();
    if (this.list) {
      if (!this.list.firstChildAppend) {
        this.list.firstChildAppend = true;
        this.isFirstChild = true;
      }
    }
  },
  methods: {
    /**
     * 获取父元素实例
     */
    getForm(name = "uniList") {
      let parent = this.$parent;
      let parentName = parent.$options.name;
      while (parentName !== name) {
        parent = parent.$parent;
        if (!parent)
          return false;
        parentName = parent.$options.name;
      }
      return parent;
    },
    onClick() {
      if (this.to !== "") {
        this.openPage();
        return;
      }
      if (this.clickable || this.link) {
        this.$emit("click", {
          data: {}
        });
      }
    },
    onSwitchChange(e2) {
      this.$emit("switchChange", e2.detail);
    },
    openPage() {
      if (["navigateTo", "redirectTo", "reLaunch", "switchTab"].indexOf(this.link) !== -1) {
        this.pageApi(this.link);
      } else {
        this.pageApi("navigateTo");
      }
    },
    pageApi(api) {
      let callback = {
        url: this.to,
        success: (res) => {
          this.$emit("click", {
            data: res
          });
        },
        fail: (err) => {
          this.$emit("click", {
            data: err
          });
        }
      };
      switch (api) {
        case "navigateTo":
          uni.navigateTo(callback);
          break;
        case "redirectTo":
          uni.redirectTo(callback);
          break;
        case "reLaunch":
          uni.reLaunch(callback);
          break;
        case "switchTab":
          uni.switchTab(callback);
          break;
        default:
          uni.navigateTo(callback);
      }
    }
  }
};
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_uni_icons = resolveEasycom(resolveDynamicComponent("uni-icons"), __easycom_0);
  const _component_uni_badge = resolveEasycom(resolveDynamicComponent("uni-badge"), __easycom_1);
  const _component_switch = resolveComponent("switch");
  return openBlock(), createElementBlock("cell", { keepScrollPosition: $props.keepScrollPosition }, [
    createElementVNode("view", {
      class: normalizeClass([{ "uni-list-item--disabled": $props.disabled }, "uni-list-item"]),
      style: normalizeStyle({ "background-color": $props.customStyle.backgroundColor }),
      hoverClass: !$props.clickable && !$props.link || $props.disabled || $props.showSwitch ? "" : "uni-list-item--hover",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      !$data.isFirstChild ? (openBlock(), createElementBlock("view", {
        key: 0,
        class: normalizeClass(["border--left", { "uni-list--border": $props.border }])
      }, null, 2)) : createCommentVNode("", true),
      createElementVNode("view", {
        class: normalizeClass(["uni-list-item__container", { "container--right": $props.showArrow || $props.link, "flex--direction": $props.direction === "column" }]),
        style: normalizeStyle({ paddingTop: $data.padding.top, paddingLeft: $data.padding.left, paddingRight: $data.padding.right, paddingBottom: $data.padding.bottom })
      }, [
        renderSlot(_ctx.$slots, "header", {}, () => [
          createElementVNode("view", { class: "uni-list-item__header" }, [
            $props.thumb ? (openBlock(), createElementBlock("view", {
              key: 0,
              class: "uni-list-item__icon"
            }, [
              createElementVNode("u-image", {
                src: $props.thumb,
                class: normalizeClass(["uni-list-item__icon-img", ["uni-list--" + $props.thumbSize]])
              }, null, 10, ["src"])
            ])) : $props.showExtraIcon ? (openBlock(), createElementBlock("view", {
              key: 1,
              class: "uni-list-item__icon"
            }, [
              createVNode(_component_uni_icons, {
                customPrefix: $props.extraIcon.customPrefix,
                color: $props.extraIcon.color,
                size: $props.extraIcon.size,
                type: $props.extraIcon.type
              }, null, 8, ["customPrefix", "color", "size", "type"])
            ])) : createCommentVNode("", true)
          ])
        ]),
        renderSlot(_ctx.$slots, "body", {}, () => [
          createElementVNode("view", {
            class: normalizeClass(["uni-list-item__content", { "uni-list-item__content--center": $props.thumb || $props.showExtraIcon || $props.showBadge || $props.showSwitch }])
          }, [
            $props.title ? (openBlock(), createElementBlock("u-text", {
              key: 0,
              class: normalizeClass(["uni-list-item__content-title", [$props.ellipsis !== 0 && $props.ellipsis <= 2 ? "uni-ellipsis-" + $props.ellipsis : ""]])
            }, toDisplayString($props.title), 3)) : createCommentVNode("", true),
            $props.note ? (openBlock(), createElementBlock("u-text", {
              key: 1,
              class: "uni-list-item__content-note"
            }, toDisplayString($props.note), 1)) : createCommentVNode("", true)
          ], 2)
        ]),
        renderSlot(_ctx.$slots, "footer", {}, () => [
          $props.rightText || $props.showBadge || $props.showSwitch ? (openBlock(), createElementBlock("view", {
            key: 0,
            class: normalizeClass(["uni-list-item__extra", { "flex--justify": $props.direction === "column" }])
          }, [
            $props.rightText ? (openBlock(), createElementBlock("u-text", {
              key: 0,
              class: "uni-list-item__extra-text"
            }, toDisplayString($props.rightText), 1)) : createCommentVNode("", true),
            $props.showBadge ? (openBlock(), createBlock(_component_uni_badge, {
              key: 1,
              type: $props.badgeType,
              text: $props.badgeText,
              "custom-style": $props.badgeStyle
            }, null, 8, ["type", "text", "custom-style"])) : createCommentVNode("", true),
            $props.showSwitch ? (openBlock(), createBlock(_component_switch, {
              key: 2,
              disabled: $props.disabled,
              checked: $props.switchChecked,
              onChange: $options.onSwitchChange
            }, null, 8, ["disabled", "checked", "onChange"])) : createCommentVNode("", true)
          ], 2)) : createCommentVNode("", true)
        ])
      ], 6),
      $props.showArrow || $props.link ? (openBlock(), createBlock(_component_uni_icons, {
        key: 1,
        size: 16,
        class: "uni-icon-wrapper",
        color: "#bbb",
        type: "arrowright"
      })) : createCommentVNode("", true)
    ], 14, ["hoverClass"])
  ], 8, ["keepScrollPosition"]);
}
const __easycom_3 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["styles", [_style_0$2]]]);
const _style_0$1 = { "uni-list": { "": { "backgroundColor": "#ffffff", "position": "relative", "flexDirection": "column" } }, "uni-list--border": { "": { "position": "relative", "borderTopColor": "#e5e5e5", "borderTopStyle": "solid", "borderTopWidth": 0.5, "borderBottomColor": "#e5e5e5", "borderBottomStyle": "solid", "borderBottomWidth": 0.5, "zIndex": -1 } } };
const _sfc_main$1 = {
  name: "uniList",
  "mp-weixin": {
    options: {
      multipleSlots: false
    }
  },
  props: {
    stackFromEnd: {
      type: Boolean,
      default: false
    },
    enableBackToTop: {
      type: [Boolean, String],
      default: false
    },
    scrollY: {
      type: [Boolean, String],
      default: false
    },
    border: {
      type: Boolean,
      default: true
    },
    renderReverse: {
      type: Boolean,
      default: false
    }
  },
  // provide() {
  // 	return {
  // 		list: this
  // 	};
  // },
  created() {
    this.firstChildAppend = false;
  },
  methods: {
    loadMore(e2) {
      this.$emit("scrolltolower");
    },
    scroll(e2) {
      this.$emit("scroll", e2);
    }
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("list", {
    bounce: false,
    scrollable: true,
    showScrollbar: "",
    renderReverse: $props.renderReverse,
    onScroll: _cache[0] || (_cache[0] = (...args) => $options.scroll && $options.scroll(...args)),
    class: normalizeClass(["uni-list", { "uni-list--border": $props.border }]),
    enableBackToTop: $props.enableBackToTop,
    loadmoreoffset: "15"
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 42, ["renderReverse", "enableBackToTop"]);
}
const __easycom_4 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["styles", [_style_0$1]]]);
const _style_0 = { "status-bar": { "": { "backgroundColor": "#ffffff" } }, "container": { "": { "flex": 1, "backgroundColor": "#f7f7f7" } }, "search-body": { "": { "backgroundColor": "#ffffff", "borderBottomRightRadius": 10, "borderBottomLeftRadius": 10 } }, "flex-center": { "": { "justifyContent": "center", "alignItems": "center" } }, "flex-row": { "": { "flexDirection": "row" } }, "uni-searchbar": { "": { "paddingLeft": 0 } }, "uni-searchbar__box": { "": { "borderWidth": 0 } }, "uni-input-placeholder": { "": { "fontSize": "28rpx" } }, "search-container": { "": { "height": 52, "flexDirection": "column", "justifyContent": "center", "alignItems": "center", "position": "relative", "backgroundColor": "#ffffff" } }, "search-container-bar": { "": { "flexDirection": "row", "justifyContent": "center", "alignItems": "center", "position": "absolute", "top": 0, "left": 0, "right": 0 } }, "search-associative": { "": { "position": "absolute", "top": 52, "left": 0, "right": 0, "bottom": 0, "backgroundColor": "#ffffff", "marginTop": "10rpx", "paddingLeft": "10rpx", "paddingRight": "10rpx" } }, "search-icons": { "": { "paddingTop": "16rpx", "paddingRight": "16rpx", "paddingBottom": "16rpx", "paddingLeft": "16rpx" } }, "word-display": { "": { "fontSize": "26rpx", "color": "#666666" } }, "word-container": { "": { "paddingTop": "20rpx", "paddingRight": "20rpx", "paddingBottom": "20rpx", "paddingLeft": "20rpx" } }, "word-container_header": { "": { "height": "72rpx", "lineHeight": "72rpx", "flexDirection": "row", "justifyContent": "space-between", "alignItems": "center" } }, "word-container_header-text": { "": { "color": "#3e3e3e", "fontSize": "30rpx", "fontWeight": "bold" } }, "word-container_body": { "": { "flexWrap": "wrap", "flexDirection": "row" } }, "word-container_body-text": { "": { "fontSize": "26rpx", "color": "#666666", "justifyContent": "center", "alignItems": "center", "backgroundColor": "#f6f6f6", "paddingTop": "10rpx", "paddingRight": "20rpx", "paddingBottom": "10rpx", "paddingLeft": "20rpx", "marginTop": "20rpx", "marginRight": "30rpx", "marginBottom": 0, "marginLeft": 0, "borderRadius": "30rpx", "textAlign": "center" } }, "word-container_body-info": { "": { "flex": 1, "textAlign": "center", "fontSize": "26rpx", "color": "#808080", "marginTop": "20rpx" } } };
const searchLogDbName = "opendb-search-log";
const mallGoodsDbName = "opendb-news-articles";
const associativeSearchField = "title";
const associativeField = "_id,title";
const localSearchListKey = "__local_search_history";
const arrUnique = (arr) => {
  for (let i2 = arr.length - 1; i2 >= 0; i2--) {
    const curIndex = arr.indexOf(arr[i2]);
    const lastIndex = arr.lastIndexOf(arr[i2]);
    curIndex != lastIndex && arr.splice(lastIndex, 1);
  }
  return arr;
};
function debounce(fn, interval, isFirstAutoRun) {
  var _self = fn;
  var timer = null;
  var first = true;
  if (isFirstAutoRun) {
    _self();
  }
  return function() {
    var args = arguments;
    var _me = this;
    if (first) {
      first = false;
      _self.apply(_me, args);
    }
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      clearTimeout(timer);
      timer = null;
      _self.apply(_me, args);
    }, interval || 200);
  };
}
const _sfc_main = {
  data() {
    return {
      mallGoodsDbName,
      searchLogDbName,
      statusBarHeight: "0px",
      localSearchList: uni.getStorageSync(localSearchListKey),
      localSearchListDel: false,
      netHotListIsHide: false,
      searchText: "",
      iconColor: "#999999",
      associativeList: [],
      keyBoardPopup: false,
      hotWorld: "DCloud",
      //	搜索热词，如果没有输入即回车，则搜索热词，但是不会加入搜索记录
      focus: true,
      //	是否自动聚焦
      speechEngine: "iFly"
      //	语音识别引擎 iFly 讯飞 baidu 百度
    };
  },
  created() {
    this.db = er.database();
    this.searchLogDb = this.db.collection(this.searchLogDbName);
    this.mallGoodsDb = this.db.collection(this.mallGoodsDbName);
    uni.onKeyboardHeightChange((res) => {
      this.keyBoardPopup = res.height !== 0;
    });
    this.searchText = getApp().globalData.searchText;
  },
  computed: {
    associativeShow() {
      return this.searchText && this.associativeList.length;
    }
  },
  onLoad() {
    this.statusBarHeight = `${uni.getSystemInfoSync().statusBarHeight}px`;
  },
  methods: {
    clear(res) {
      formatAppLog("log", "at pages/list/search/search.nvue:172", "res: ", res);
    },
    confirm(res) {
      this.search(res.value);
    },
    cancel(res) {
      uni.hideKeyboard();
      this.searchText = "";
      this.loadList();
    },
    search(value) {
      if (!value && !this.hotWorld) {
        return;
      }
      if (value) {
        if (this.searchText !== value) {
          this.searchText = value;
        }
        this.localSearchListManage(value);
        this.searchLogDbAdd(value);
      } else if (this.hotWorld) {
        this.searchText = this.hotWorld;
      }
      uni.hideKeyboard();
      this.loadList(this.searchText);
    },
    localSearchListManage(word) {
      let list = uni.getStorageSync(localSearchListKey);
      if (list.length) {
        this.localSearchList.unshift(word);
        arrUnique(this.localSearchList);
        if (this.localSearchList.length > 10) {
          this.localSearchList.pop();
        }
      } else {
        this.localSearchList = [word];
      }
      uni.setStorageSync(localSearchListKey, this.localSearchList);
    },
    LocalSearchListClear() {
      uni.showModal({
        content: "确认清空搜索历史吗",
        confirmText: "删除",
        confirmColor: "red",
        cancelColor: "#808080",
        success: (res) => {
          if (res.confirm) {
            this.localSearchListDel = false;
            this.localSearchList = [];
            uni.removeStorageSync(localSearchListKey);
          }
        }
      });
    },
    LocalSearchlistItemClick(word, index) {
      if (this.localSearchListDel) {
        this.localSearchList.splice(index, 1);
        uni.setStorageSync(localSearchListKey, this.localSearchList);
        if (!this.localSearchList.length) {
          this.localSearchListDel = false;
        }
        return;
      }
      this.search(word);
    },
    searchHotRefresh() {
      this.$refs.udb.refresh();
    },
    speech() {
      plus.speech.startRecognize({
        engine: this.speechEngine,
        punctuation: false,
        // 标点符号 
        timeout: 1e4
      }, (word) => {
        word = word instanceof Array ? word[0] : word;
        this.search(word);
      }, (err) => {
        formatAppLog("error", "at pages/list/search/search.nvue:254", "语音识别错误: ", err);
      });
    },
    searchLogDbAdd(value) {
      this.getDeviceId().then((device_id) => {
        this.searchLogDb.add({
          // user_id: device_id,
          device_id,
          content: value,
          create_date: Date.now()
        });
      });
    },
    getDeviceId() {
      return new Promise((resolve, reject) => {
        const uniId = uni.getStorageSync("uni_id");
        if (!uniId) {
          plus.device.getInfo({
            success: (deviceInfo) => {
              resolve(deviceInfo.uuid);
            },
            fail: () => {
              resolve(uni.getSystemInfoSync().system + "_" + Math.random().toString(36).substr(2));
            }
          });
        } else {
          resolve(uniId);
        }
      });
    },
    associativeClick(item) {
      formatAppLog("log", "at pages/list/search/search.nvue:297", "associativeClick: ", item);
      this.loadList(item.title);
    },
    loadList(text = "") {
      getApp().globalData.searchText = text;
      uni.switchTab({
        url: "/pages/list/list"
      });
    },
    backPage() {
      uni.navigateBack();
    }
  },
  watch: {
    searchText: debounce(function(value) {
      if (value) {
        this.mallGoodsDb.where({
          [associativeSearchField]: new RegExp(value, "gi")
        }).field(associativeField).get().then((res) => {
          this.associativeList = res.result.data;
        });
      } else {
        this.associativeList.length = 0;
        getApp().globalData.searchText = "";
      }
    }, 100)
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_uni_icons = resolveEasycom(resolveDynamicComponent("uni-icons"), __easycom_0);
  const _component_uni_search_bar = resolveEasycom(resolveDynamicComponent("uni-search-bar"), __easycom_1$1);
  const _component_unicloud_db = resolveEasycom(resolveDynamicComponent("unicloud-db"), __easycom_2);
  const _component_uni_list_item = resolveEasycom(resolveDynamicComponent("uni-list-item"), __easycom_3);
  const _component_uni_list = resolveEasycom(resolveDynamicComponent("uni-list"), __easycom_4);
  return openBlock(), createElementBlock("scroll-view", {
    scrollY: true,
    showScrollbar: true,
    enableBackToTop: true,
    bubble: "true",
    style: { flexDirection: "column" }
  }, [
    createElementVNode("view", { class: "container" }, [
      createElementVNode("view", { class: "search-container" }, [
        createElementVNode("view", { class: "search-container-bar" }, [
          createVNode(_component_uni_icons, {
            class: "search-icons",
            color: $data.iconColor,
            size: "22",
            type: "mic-filled",
            onClick: $options.speech
          }, null, 8, ["color", "onClick"]),
          createVNode(_component_uni_search_bar, {
            ref: "searchBar",
            style: { "flex": "1" },
            radius: "100",
            modelValue: $data.searchText,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.searchText = $event),
            focus: $data.focus,
            placeholder: $data.hotWorld,
            clearButton: "auto",
            cancelButton: "always",
            onClear: $options.clear,
            onConfirm: $options.confirm,
            onCancel: $options.cancel
          }, null, 8, ["modelValue", "focus", "placeholder", "onClear", "onConfirm", "onCancel"])
        ])
      ]),
      createElementVNode("view", { class: "search-body" }, [
        $data.localSearchList.length ? (openBlock(), createElementBlock("view", {
          key: 0,
          class: "word-container"
        }, [
          createElementVNode("view", { class: "word-container_header" }, [
            createElementVNode("u-text", { class: "word-container_header-text" }, "搜索历史"),
            !$data.localSearchListDel ? (openBlock(), createBlock(_component_uni_icons, {
              key: 0,
              onClick: _cache[1] || (_cache[1] = ($event) => $data.localSearchListDel = true),
              class: "search-icons",
              style: { "padding-right": "0" },
              color: $data.iconColor,
              size: "18",
              type: "trash"
            }, null, 8, ["color"])) : (openBlock(), createElementBlock("view", {
              key: 1,
              class: "flex-center flex-row",
              style: { "font-weight": "500", "justify-content": "space-between" }
            }, [
              createElementVNode("u-text", {
                style: { "font-size": "22rpx", "color": "#666", "padding-top": "4rpx", "padding-bottom": "4rpx", "padding-right": "20rpx" },
                onClick: _cache[2] || (_cache[2] = (...args) => $options.LocalSearchListClear && $options.LocalSearchListClear(...args))
              }, "全部删除"),
              createElementVNode("u-text", {
                style: { "font-size": "22rpx", "color": "#c0402b", "padding-top": "4rpx", "padding-bottom": "4rpx", "padding-left": "20rpx" },
                onClick: _cache[3] || (_cache[3] = ($event) => $data.localSearchListDel = false)
              }, "完成")
            ]))
          ]),
          createElementVNode("view", { class: "word-container_body" }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList($data.localSearchList, (word, index) => {
              return openBlock(), createElementBlock("view", {
                class: "flex-center flex-row word-container_body-text",
                key: index,
                onClick: ($event) => $options.LocalSearchlistItemClick(word, index)
              }, [
                (openBlock(), createElementBlock("u-text", {
                  class: "word-display",
                  key: word
                }, toDisplayString(word), 1)),
                $data.localSearchListDel ? (openBlock(), createBlock(_component_uni_icons, {
                  key: 0,
                  size: "12",
                  type: "closeempty"
                })) : createCommentVNode("", true)
              ], 8, ["onClick"]);
            }), 128))
          ])
        ])) : createCommentVNode("", true),
        createElementVNode("view", { class: "word-container" }, [
          createElementVNode("view", { class: "word-container_header" }, [
            createElementVNode("view", { class: "flex-center flex-row" }, [
              createElementVNode("u-text", { class: "word-container_header-text" }, "搜索发现"),
              !$data.netHotListIsHide ? (openBlock(), createBlock(_component_uni_icons, {
                key: 0,
                class: "search-icons",
                color: $data.iconColor,
                size: "14",
                type: "reload",
                onClick: $options.searchHotRefresh
              }, null, 8, ["color", "onClick"])) : createCommentVNode("", true)
            ]),
            createVNode(_component_uni_icons, {
              class: "search-icons",
              style: { "padding-right": "0" },
              color: $data.iconColor,
              size: "18",
              type: $data.netHotListIsHide ? "eye-slash" : "eye",
              onClick: _cache[4] || (_cache[4] = ($event) => $data.netHotListIsHide = !$data.netHotListIsHide)
            }, null, 8, ["color", "type"])
          ]),
          createVNode(_component_unicloud_db, {
            ref: "udb",
            field: "content",
            collection: "opendb-search-hot",
            orderby: "create_date desc,count desc",
            "page-data": "replace",
            "page-size": 10
          }, {
            default: withCtx(({ data, loading, error, options }) => [
              loading && !$data.netHotListIsHide ? (openBlock(), createElementBlock("u-text", {
                key: 0,
                class: "word-container_body-info"
              }, "正在加载...")) : (openBlock(), createElementBlock("view", {
                key: 1,
                class: "word-container_body"
              }, [
                !$data.netHotListIsHide ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  error ? (openBlock(), createElementBlock("u-text", {
                    key: 0,
                    class: "word-container_body-info"
                  }, toDisplayString(error.message), 1)) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(data, (word, index) => {
                    return openBlock(), createElementBlock("u-text", {
                      class: "word-container_body-text",
                      key: index,
                      onClick: ($event) => $options.search(word.content)
                    }, toDisplayString(word.content), 9, ["onClick"]);
                  }), 128))
                ], 64)) : (openBlock(), createElementBlock("view", {
                  key: 1,
                  style: { "flex": "1" }
                }, [
                  createElementVNode("u-text", { class: "word-container_body-info" }, "当前搜索发现已隐藏")
                ]))
              ]))
            ]),
            _: 1
          }, 512)
        ])
      ]),
      $options.associativeShow ? (openBlock(), createElementBlock("view", {
        key: 0,
        class: "search-associative"
      }, [
        createVNode(_component_uni_list, null, {
          default: withCtx(() => [
            (openBlock(true), createElementBlock(Fragment, null, renderList($data.associativeList, (item, index) => {
              return openBlock(), createBlock(_component_uni_list_item, {
                key: item._id,
                ellipsis: 1,
                title: item.name,
                onClick: ($event) => $options.associativeClick(item),
                "show-extra-icon": "",
                clickable: "",
                "extra-icon": { size: 18, color: $data.iconColor, type: "search" }
              }, null, 8, ["title", "onClick", "extra-icon"]);
            }), 128))
          ]),
          _: 1
        })
      ])) : createCommentVNode("", true)
    ])
  ]);
}
const search = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["styles", [_style_0]]]);
export {
  search as default
};
