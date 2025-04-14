"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "auth",
  setup(__props) {
    const loading = common_vendor.ref(false);
    const handleAuth = async () => {
      var _a;
      if (loading.value)
        return;
      loading.value = true;
      try {
        const [error, authRes] = await common_vendor.index.showModal({
          title: "授权提示",
          content: "是否允许获取您的用户信息？"
        });
        if (error || !authRes.confirm) {
          throw new Error("用户拒绝授权");
        }
        const [loginErr, loginRes] = await common_vendor.index.login({
          provider: "weixin"
        });
        if (loginErr) {
          throw new Error("登录失败");
        }
        const [userErr, userRes] = await common_vendor.index.getUserProfile({
          desc: "用于完善用户资料",
          lang: "zh_CN"
        });
        if (userErr) {
          throw new Error("获取用户信息失败");
        }
        const [cloudErr, cloudRes] = await common_vendor.Ys.callFunction({
          name: "login",
          data: {
            code: loginRes.code,
            userInfo: userRes.userInfo
          }
        });
        if (cloudErr || !cloudRes.result.success) {
          throw new Error(((_a = cloudRes == null ? void 0 : cloudRes.result) == null ? void 0 : _a.message) || "服务器登录失败");
        }
        common_vendor.index.setStorageSync("userInfo", userRes.userInfo);
        if (cloudRes.result.token) {
          common_vendor.index.setStorageSync("token", cloudRes.result.token);
        }
        common_vendor.index.showToast({
          title: "登录成功",
          icon: "success"
        });
        const eventChannel = getOpenerEventChannel();
        eventChannel.emit("loginSuccess", userRes.userInfo);
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      } catch (error) {
        console.error("授权登录失败:", error);
        common_vendor.index.showToast({
          title: error.message || "授权登录失败",
          icon: "none"
        });
      } finally {
        loading.value = false;
      }
    };
    const handleCancel = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.o(handleAuth),
        c: common_vendor.o(handleCancel)
      };
    };
  }
};
wx.createPage(_sfc_main);
