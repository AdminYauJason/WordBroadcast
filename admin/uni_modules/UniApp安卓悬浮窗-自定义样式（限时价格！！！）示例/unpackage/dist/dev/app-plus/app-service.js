if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function requireNativePlugin(name) {
    return weex.requireModule(name);
  }
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const LinFloatWeb = requireNativePlugin("Lin-Float-Webview");
  const _sfc_main$1 = {
    data() {
      return {
        templeteList: [{
          title: "window效果",
          fileName: "index",
          size: [250, 300]
        }, {
          title: "功能选择效果",
          fileName: "radio",
          size: [286, 96]
        }, {
          title: "开关效果1",
          fileName: "switch1",
          size: [101, 42]
        }, {
          title: "悬浮输入框",
          fileName: "input",
          size: [230, 48]
        }, {
          title: "开关效果3",
          fileName: "switch3",
          size: [60, 34]
        }, {
          title: "开关效果",
          fileName: "switch",
          size: [98, 56]
        }, {
          title: "开关效果4",
          fileName: "toggle",
          size: [150, 75]
        }, {
          title: "旋转的地球",
          fileName: "earth",
          size: [100, 100]
        }, {
          title: "音量调节示例",
          fileName: "range",
          size: [134, 129]
        }]
      };
    },
    onLoad() {
      LinFloatWeb.applyPermission(() => {
        LinFloatWeb.create({
          url: this.generateUrl("/static/template/index.html"),
          // url地址
          id: "window",
          // 悬浮窗的标识，用于区分多悬浮窗显示, 只显示一个悬浮窗时可不传，默认：window
          html: "",
          // html内容：可选（如果有传入url参数则会在页面追加html内容）
          javaScript: "",
          // 悬浮窗页面的js脚本
          css: "html, body { padding: 0; margin: 0; }",
          // 悬浮窗页面的样式
          data: {},
          // 向网页传递数据，网页内 可用 getData((data) => __f__('log','at pages/float-webview/float-webview.vue:126','data: ', data)) 接受数据
          x: 50,
          // 悬浮窗的初始位置
          y: 500,
          // 悬浮窗的初始位置
          width: 200,
          // 悬浮窗宽度 单位：px
          height: 250,
          // 悬浮窗高度 单位：px
          toolbar: false,
          // 是否悬浮窗显示工具条
          dragType: 2,
          // 设置悬浮窗的拖动类型 1：不可拖拽，2：随意拖拽，3：吸边拖拽
          transparent: true
          // 悬浮窗背景是否透明
        }, (msg) => {
          formatAppLog("log", "at pages/float-webview/float-webview.vue:136", msg);
          uni.showToast({
            icon: "none",
            title: JSON.stringify(msg)
          });
        });
        LinFloatWeb.create({
          id: "test",
          html: `<h1>我是第二个悬浮窗</h1>
					<p>我的背景默认是透明的</p>`,
          css: "",
          javaScript: `getData((data) => document.querySelector('body').innerHTML = '接收的的数据：'+data)`,
          width: 250,
          height: 300,
          toolbar: true,
          transparent: false
        }, (msg) => {
          formatAppLog("log", "at pages/float-webview/float-webview.vue:153", msg);
          uni.showToast({
            icon: "none",
            title: JSON.stringify(msg)
          });
        });
      }, () => formatAppLog("log", "at pages/float-webview/float-webview.vue:160", "未取得权限"));
    },
    methods: {
      generateUrl(path = "") {
        return "file://" + plus.io.convertLocalFileSystemURL("_www" + path);
      },
      toggle(id = "") {
        LinFloatWeb.toggle(id);
      },
      show(id = "") {
        LinFloatWeb.show(id);
      },
      hide(id = "") {
        LinFloatWeb.hide(id);
      },
      destroy(id = "") {
        LinFloatWeb.destroy(id);
      },
      update(params = {}) {
        params = !Object.keys(params).length ? {
          // id: '',
          x: 100,
          y: 100,
          width: 100,
          height: 100,
          dragType: 2
          // css: `html {background: red;}`,
          // html: '',
          // javaScript: `document.querySelector('body').style.background='red';`,
          // url: 'file://'+ plus.io.convertLocalFileSystemURL('_www/static/html/index.html')
          // data: {},
        } : params;
        LinFloatWeb.update(params, (res) => {
          formatAppLog("log", "at pages/float-webview/float-webview.vue:204", "update: ", res);
        });
      },
      evalJS(js, id = "") {
        LinFloatWeb.evalJS(js, id);
      },
      exeFunc() {
        LinFloatWeb.exeFunc(`Android.toggle('window')`);
      },
      reload(id = "") {
        LinFloatWeb.reload(id);
      },
      changeURL(url, id = "") {
        LinFloatWeb.changeURL(url, id);
      },
      setDragType(type = 2) {
        this.update({
          dragType: type
        });
      },
      setFocusable(isAllow = false) {
        LinFloatWeb.setFocusable(isAllow);
      },
      // 更新位置
      template(fileName, width, height) {
        this.show();
        this.update({
          url: this.generateUrl("/static/template/" + fileName + ".html"),
          width,
          height
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "container" }, [
      vue.createElementVNode("view", { class: "caption" }, [
        vue.createElementVNode("text", null, "悬浮窗控制")
      ]),
      vue.createElementVNode("view", {
        class: "caption",
        style: { "width": "100%", "font-size": "30rpx" }
      }, [
        vue.createElementVNode("text", null, "显示隐藏")
      ]),
      vue.createElementVNode("button", {
        type: "warn",
        onClick: _cache[0] || (_cache[0] = ($event) => $options.toggle())
      }, "切换悬浮窗的显示与隐藏"),
      vue.createElementVNode("view", { class: "row-btn side-btn" }, [
        vue.createElementVNode("button", {
          type: "primary",
          size: "mini",
          onClick: _cache[1] || (_cache[1] = ($event) => $options.show())
        }, "显示"),
        vue.createElementVNode("button", {
          type: "warn",
          size: "mini",
          onClick: _cache[2] || (_cache[2] = ($event) => $options.hide())
        }, "隐藏"),
        vue.createElementVNode("button", {
          type: "primary",
          size: "mini",
          onClick: _cache[3] || (_cache[3] = ($event) => $options.destroy())
        }, "销毁")
      ]),
      vue.createElementVNode("view", {
        class: "caption",
        style: { "width": "100%", "font-size": "30rpx" }
      }, [
        vue.createElementVNode("text", null, "拖拽方式")
      ]),
      vue.createElementVNode("view", { class: "row-btn side-btn" }, [
        vue.createElementVNode("button", {
          type: "warn",
          size: "mini",
          onClick: _cache[4] || (_cache[4] = ($event) => $options.setDragType(1))
        }, "不可拖拽"),
        vue.createElementVNode("button", {
          type: "primary",
          size: "mini",
          onClick: _cache[5] || (_cache[5] = ($event) => $options.setDragType(2))
        }, "随意拖拽"),
        vue.createElementVNode("button", {
          type: "primary",
          size: "mini",
          onClick: _cache[6] || (_cache[6] = ($event) => $options.setDragType(3))
        }, "吸边拖拽")
      ]),
      vue.createElementVNode("view", {
        class: "caption",
        style: { "width": "100%", "font-size": "30rpx" }
      }, [
        vue.createElementVNode("text", null, "修改悬浮窗内容")
      ]),
      vue.createElementVNode("button", {
        type: "primary",
        size: "mini",
        onClick: _cache[7] || (_cache[7] = ($event) => $options.show("test"))
      }, "打开第二个悬浮窗"),
      vue.createElementVNode("view", { class: "row-btn" }, [
        vue.createElementVNode("button", {
          type: "warn",
          size: "mini",
          onClick: _cache[8] || (_cache[8] = ($event) => {
            $options.evalJS(`document.querySelector('body').innerHTML = '执行了,清空页面html';`, "test");
            $options.show("test");
          })
        }, "向悬浮窗注入JS代码"),
        vue.createElementVNode("button", {
          type: "warn",
          size: "mini",
          onClick: _cache[9] || (_cache[9] = ($event) => {
            $options.update({
              id: "test",
              css: "html {background: red}"
            });
            $options.show("test");
          })
        }, "修改悬浮窗css样式"),
        vue.createElementVNode("button", {
          type: "primary",
          size: "mini",
          onClick: _cache[10] || (_cache[10] = ($event) => {
            $options.changeURL("https://api.lincq.cn/app/index.html", "test");
            $options.show("test");
          })
        }, "打开一个网页窗口"),
        vue.createElementVNode("button", {
          type: "primary",
          size: "mini",
          onClick: _cache[11] || (_cache[11] = ($event) => {
            $options.update({
              id: "test",
              data: { msg: "点击了 “向悬浮窗传递数据”" }
            });
            $options.show("test");
          })
        }, "向悬浮窗传递数据"),
        vue.createElementVNode("button", {
          type: "primary",
          size: "mini",
          onClick: _cache[12] || (_cache[12] = ($event) => {
            $options.update({
              id: "test",
              width: 200,
              height: 200
            });
            $options.show("test");
          })
        }, "修改悬浮窗的大小"),
        vue.createElementVNode("button", {
          type: "primary",
          size: "mini",
          onClick: _cache[13] || (_cache[13] = ($event) => {
            $options.update({
              id: "test",
              x: 100,
              y: 100
            });
            $options.show("test");
          })
        }, "修改悬浮窗的位置")
      ]),
      vue.createElementVNode("view", { class: "caption" }, [
        vue.createElementVNode("text", null, "悬浮窗效果")
      ]),
      vue.createElementVNode("view", { class: "row-btn" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.templeteList, (item, index) => {
            return vue.openBlock(), vue.createElementBlock("button", {
              type: "primary",
              size: "mini",
              onClick: ($event) => $options.template(item.fileName, ...item.size)
            }, vue.toDisplayString(item.title || "效果" + (index + 1)), 9, ["onClick"]);
          }),
          256
          /* UNKEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const PagesFloatWebviewFloatWebview = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "C:/liveagent/Live_Agent/Agent/UniApp安卓悬浮窗-自定义样式（限时价格！！！）示例/pages/float-webview/float-webview.vue"]]);
  __definePage("pages/float-webview/float-webview", PagesFloatWebviewFloatWebview);
  const _sfc_main = {
    onLaunch: function() {
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:6", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:9", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "C:/liveagent/Live_Agent/Agent/UniApp安卓悬浮窗-自定义样式（限时价格！！！）示例/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
