"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      liveRecords: []
      // 存放直播记录的数据
    };
  },
  onLoad() {
    this.fetchLiveRecords();
  },
  methods: {
    // 获取直播记录
    async fetchLiveRecords() {
      try {
        const userPhone = "用户手机号";
        const db = common_vendor.Ys.database();
        const res = await db.collection("live_record").where({ userPhone }).get();
        if (res.result.data) {
          this.liveRecords = res.result.data;
        }
      } catch (error) {
        console.error("获取直播记录失败:", error);
      }
    },
    // 格式化时间
    formatTime(date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.liveRecords, (record, k0, i0) => {
      return {
        a: common_vendor.t(record.liveRoomId),
        b: common_vendor.t($options.formatTime(record.startTime)),
        c: record._id
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
