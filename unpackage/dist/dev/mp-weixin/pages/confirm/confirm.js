"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
const _sfc_main = {
  setup() {
    const userphone = common_vendor.ref("");
    const getphone = () => {
      return uni_modules_uniIdPages_common_store.store.userInfo.mobile;
    };
    userphone.value = getphone();
    const fetchLiveRecordData = async () => {
      try {
        const res = await common_vendor.Ys.callFunction({
          name: "getliveRecordData",
          data: {
            userphone: userphone.value
          }
        });
        if (res.result.success) {
          console.log("获取的直播记录数据:", res.result.data);
        } else {
          console.error("获取数据失败:", res.result.message);
        }
      } catch (error) {
        console.error("调用云函数失败:", error);
      }
    };
    const handleStart = async () => {
      try {
        const phoneNumber = uni_modules_uniIdPages_common_store.store.userInfo.mobile;
        if (!phoneNumber) {
          throw new Error("未获取到用户手机号");
        }
        console.log("用户手机号:", phoneNumber);
        common_vendor.index.navigateTo({
          url: "/pages/Robot/Robot"
        });
      } catch (error) {
        console.error("处理登录失败:", error);
        common_vendor.index.showToast({
          title: "登录失败，请重试",
          icon: "none"
        });
      }
    };
    common_vendor.onMounted(() => {
      fetchLiveRecordData();
    });
    return {
      handleStart
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $setup.handleStart && $setup.handleStart(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-eec36e84"]]);
wx.createPage(MiniProgramPage);
