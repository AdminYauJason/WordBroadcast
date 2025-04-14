"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      features: [
        {
          icon: "🎯",
          title: "智能话术",
          desc: "一键生成吸引人的直播话术"
        },
        {
          icon: "✨",
          title: "场景模板",
          desc: "丰富的直播场景话术模板"
        },
        {
          icon: "🎨",
          title: "个性定制",
          desc: "根据商品特点智能匹配话术"
        }
      ]
    };
  },
  methods: {
    startExperience() {
      common_vendor.index.switchTab({
        url: "/pages/grid/grid"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f(20, (n, k0, i0) => {
      return {
        a: n
      };
    }),
    b: common_vendor.f($data.features, (feature, index, i0) => {
      return {
        a: common_vendor.t(feature.icon),
        b: common_vendor.t(feature.title),
        c: common_vendor.t(feature.desc),
        d: index,
        e: index * 0.2 + "s"
      };
    }),
    c: common_vendor.o((...args) => $options.startExperience && $options.startExperience(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
