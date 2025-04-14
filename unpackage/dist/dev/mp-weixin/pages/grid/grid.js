"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
const _sfc_main = {
  __name: "grid",
  setup(__props) {
    const productInfo = common_vendor.ref("");
    const roomId = common_vendor.ref("");
    const isValid = common_vendor.ref(false);
    const userPhone = common_vendor.ref("");
    if (uni_modules_uniIdPages_common_store.store.hasLogin) {
      console.log("用户已登录");
    } else {
      console.log("用户未登录");
    }
    const getPhone = () => {
      return uni_modules_uniIdPages_common_store.store.hasLogin ? uni_modules_uniIdPages_common_store.store.userInfo.mobile : "0";
    };
    common_vendor.watch(roomId, (newVal) => {
      let numbers = newVal.replace(/\D/g, "").slice(0, 19);
      if (numbers !== newVal)
        roomId.value = numbers;
      isValid.value = numbers.length === 19;
    });
    const handleConfirm = async () => {
      if (!isValid.value) {
        common_vendor.index.showToast({ title: "请输入 19 位房间ID", icon: "none" });
        return;
      }
      if (!userPhone.value) {
        userPhone.value = getPhone();
        if (userPhone.value === "0") {
          common_vendor.index.showToast({ title: "请先获取手机号", icon: "none" });
          return;
        }
      }
      try {
        const { success, message } = await submitToCloud();
        if (success) {
          common_vendor.index.showToast({ title: "提交成功", icon: "success", duration: 2e3 });
          clearForm();
          common_vendor.index.navigateTo({ url: "/pages/confirm/confirm" });
        } else {
          common_vendor.index.showToast({ title: message || "提交失败", icon: "none" });
        }
      } catch (error) {
        common_vendor.index.showToast({ title: error.message || "提交失败", icon: "none" });
        console.error("提交失败:", error);
      }
    };
    const submitToCloud = async () => {
      return await common_vendor.Ys.callFunction({
        name: "submitliverecord",
        data: {
          roomId: roomId.value,
          userPhone: userPhone.value,
          productInfo: productInfo.value
        }
      });
    };
    const clearForm = () => {
      productInfo.value = "";
      roomId.value = "";
      userPhone.value = "";
    };
    return (_ctx, _cache) => {
      return {
        a: -1,
        b: productInfo.value,
        c: common_vendor.o(($event) => productInfo.value = $event.detail.value),
        d: roomId.value,
        e: common_vendor.o(($event) => roomId.value = $event.detail.value),
        f: common_vendor.n({
          "confirm_button_active": isValid.value
        }),
        g: common_vendor.o(handleConfirm),
        h: !isValid.value
      };
    };
  }
};
wx.createPage(_sfc_main);
