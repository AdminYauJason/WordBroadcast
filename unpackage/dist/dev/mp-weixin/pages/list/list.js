"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      featureList: [
        { icon: "💬", title: "自动生成", description: "智能生成符合场景的直播话术" },
        { icon: "🎨", title: "个性化定制", description: "根据主播需求量身打造" },
        { icon: "📈", title: "互动提升", description: "增加观众互动，活跃氛围" }
      ],
      stepList: [
        { icon: "1️⃣", title: "选择场景", description: "选择适合的直播场景" },
        { icon: "2️⃣", title: "输入需求", description: "输入商品和受众信息" },
        { icon: "3️⃣", title: "生成话术", description: "点击生成，即刻获得精彩话术" }
      ]
    };
  },
  methods: {
    startUsing() {
      common_vendor.index.navigateTo({
        url: "/pages/generate-speech/generate-speech"
        // 引导用户至生成话术的页面
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.featureList, (feature, index, i0) => {
      return {
        a: common_vendor.t(feature.icon),
        b: common_vendor.t(feature.title),
        c: common_vendor.t(feature.description),
        d: index
      };
    }),
    b: common_vendor.f($data.stepList, (step, index, i0) => {
      return {
        a: common_vendor.t(step.icon),
        b: common_vendor.t(step.title),
        c: common_vendor.t(step.description),
        d: index
      };
    }),
    c: common_vendor.o((...args) => $options.startUsing && $options.startUsing(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-96c6bf44"]]);
wx.createPage(MiniProgramPage);
