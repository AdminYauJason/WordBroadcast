"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
const MESSAGE_INTERVAL = 2e3;
const _sfc_main = {
  __name: "Robot",
  setup(__props) {
    const LinFloatWeb = common_vendor.index.requireNativePlugin("Lin-Float-Webview");
    const messages = common_vendor.ref([]);
    const scrollTop = common_vendor.ref(0);
    const isApiActivated = common_vendor.ref(false);
    let interval = null;
    const userphone = common_vendor.ref("");
    const liveInfo = common_vendor.ref(null);
    const apiState = common_vendor.ref({
      speakingOutput: "",
      tokens: 0,
      isProcessing: false,
      error: null
    });
    const generateId = () => Date.now() + Math.random().toString(36).substr(2, 9);
    const getPhone = () => {
      return uni_modules_uniIdPages_common_store.store.userInfo.mobile;
    };
    const fetchLiveInfo = async () => {
      try {
        const res = await common_vendor.Ys.callFunction({
          name: "getliveRecordData",
          data: {
            userphone: userphone.value
          }
        });
        if (res.result.success && res.result.data) {
          const latestRecord = Array.isArray(res.result.data) ? res.result.data[0] : res.result.data;
          liveInfo.value = {
            roomId: latestRecord.roomId,
            productInfo: latestRecord.productInfo
          };
          console.log("获取到直播间信息:", liveInfo.value);
          return true;
        } else {
          console.error("获取数据失败:", res.result.message);
          apiState.value.error = "未找到直播间信息";
          return false;
        }
      } catch (error) {
        console.error("调用云函数失败:", error);
        apiState.value.error = "获取直播间信息失败";
        return false;
      }
    };
    const activateApi = async () => {
      if (!liveInfo.value)
        return false;
      try {
        apiState.value.isProcessing = true;
        apiState.value.error = null;
        const res = await common_vendor.index.request({
          url: "http://47.102.98.100:8089/api/live/realtimeAnalysis",
          method: "post",
          data: {
            roomId: liveInfo.value.roomId,
            productInfo: liveInfo.value.productInfo
          }
        });
        if (res.statusCode === 200) {
          isApiActivated.value = true;
          console.log("API激活成功");
          return true;
        }
        apiState.value.error = "API激活失败";
        return false;
      } catch (error) {
        console.error("API激活失败:", error);
        apiState.value.error = "API激活请求失败";
        return false;
      } finally {
        apiState.value.isProcessing = false;
      }
    };
    const getAiScript = async () => {
      if (!liveInfo.value)
        return null;
      try {
        apiState.value.isProcessing = true;
        apiState.value.error = null;
        const res = await common_vendor.index.request({
          url: "http://47.102.98.100:8089/api/live/realtimeAnalysis",
          method: "post",
          data: {
            roomId: liveInfo.value.roomId,
            productInfo: liveInfo.value.productInfo
          }
        });
        if (res.statusCode === 200 && res.data) {
          apiState.value.speakingOutput = res.data.speakingOutput;
          apiState.value.tokens = res.data.tokens;
          return res.data.speakingOutput;
        }
        apiState.value.error = "获取AI话术失败";
        return null;
      } catch (error) {
        console.error("获取AI话术失败:", error);
        apiState.value.error = "AI话术请求失败";
        return null;
      } finally {
        apiState.value.isProcessing = false;
      }
    };
    const initSystem = async () => {
      userphone.value = getPhone();
      if (!userphone.value) {
        apiState.value.error = "未获取到用户手机号";
        return false;
      }
      const hasLiveInfo = await fetchLiveInfo();
      if (!hasLiveInfo)
        return false;
      const isActivated = await activateApi();
      return isActivated;
    };
    const generateMessages = async () => {
      if (apiState.value.isProcessing)
        return;
      if (!isApiActivated.value) {
        const initialized = await initSystem();
        if (!initialized)
          return;
      }
      const aiScript = await getAiScript();
      if (!aiScript)
        return;
      const newMessage = {
        id: generateId(),
        text: aiScript,
        isUser: false,
        timestamp: Date.now(),
        tokens: apiState.value.tokens
      };
      messages.value.push(newMessage);
      common_vendor.nextTick$1(() => {
        scrollTop.value = messages.value.length * 100;
      });
    };
    const startMessageGenerator = () => {
      interval = setInterval(generateMessages, MESSAGE_INTERVAL);
    };
    const openFloatingWindow = async () => {
      try {
        await new Promise((resolve, reject) => {
          LinFloatWeb.applyPermission(resolve, reject);
        });
        const baseUrl = plus.io.convertLocalFileSystemURL("./././static/webview.html");
        LinFloatWeb.create({
          url: `file://${baseUrl}`,
          width: 300,
          height: 200,
          x: common_vendor.index.getSystemInfoSync().windowWidth - 350,
          y: common_vendor.index.getSystemInfoSync().windowHeight - 450,
          dragType: 2,
          transparent: true
        }, (msg) => {
          console.log("悬浮窗创建成功:", msg);
          LinFloatWeb.show();
        });
      } catch (error) {
        console.error("创建悬浮窗失败:", error);
        common_vendor.index.showToast({
          title: "无法创建悬浮窗,请检查权限",
          icon: "none"
        });
      }
    };
    common_vendor.onMounted(async () => {
      const initialized = await initSystem();
      if (initialized) {
        startMessageGenerator();
      } else {
        common_vendor.index.showToast({
          title: apiState.value.error || "系统初始化失败",
          icon: "none"
        });
      }
    });
    common_vendor.onUnmounted(() => {
      if (interval) {
        clearInterval(interval);
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.f(messages.value, (message, index, i0) => {
          return common_vendor.e({
            a: !message.isUser
          }, !message.isUser ? {
            b: common_assets._imports_0
          } : {}, {
            c: common_vendor.t(message.text),
            d: message.isUser ? 1 : "",
            e: message.id || index,
            f: common_vendor.n(message.isUser ? "user-message" : "robot-message")
          });
        }),
        c: scrollTop.value,
        d: common_vendor.o(openFloatingWindow)
      };
    };
  }
};
wx.createPage(_sfc_main);
