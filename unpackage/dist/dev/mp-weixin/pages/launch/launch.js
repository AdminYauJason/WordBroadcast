"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      letters: ["P", "r", "o", "m", "p", "t", "P", "a", "l"],
      progress: 0,
      timer: null
    };
  },
  onReady() {
    this.startProgress();
  },
  methods: {
    startProgress() {
      this.timer = setInterval(() => {
        if (this.progress < 100) {
          this.progress += 2;
        } else {
          clearInterval(this.timer);
          this.navigateToMain();
        }
      }, 60);
    },
    navigateToMain() {
      setTimeout(() => {
        common_vendor.index.reLaunch({
          url: "/pages/main/main"
        });
      }, 500);
    }
  },
  onUnload() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.letters, (letter, index, i0) => {
      return {
        a: common_vendor.t(letter),
        b: index,
        c: `${index * 0.15}s`
      };
    }),
    b: `${$data.progress}%`
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-82d34b09"]]);
wx.createPage(MiniProgramPage);
