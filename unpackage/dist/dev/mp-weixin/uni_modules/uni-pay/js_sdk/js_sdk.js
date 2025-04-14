"use strict";
const common_vendor = require("../../../common/vendor.js");
var util = {};
util.getWeixinCode = function() {
  return new Promise((resolve, reject) => {
    common_vendor.index.login({
      provider: "weixin",
      success(res) {
        resolve(res.code);
      },
      fail(err) {
        reject(new Error("获取微信code失败"));
      }
    });
  });
};
util.getAlipayCode = function() {
};
util.checkPlatform = function() {
};
util.getH5Env = function() {
  let ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger" && ua.match(/miniprogram/i) == "miniprogram") {
    return "mp-weixin";
  }
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return "h5-weixin";
  }
  if (ua.match(/alipay/i) == "alipay" && ua.match(/miniprogram/i) == "miniprogram") {
    return "mp-alipay";
  }
  if (ua.match(/alipay/i) == "alipay") {
    return "h5-alipay";
  }
  return "h5";
};
util.timeFormat = function(time, fmt = "yyyy-MM-dd hh:mm:ss", targetTimezone = 8) {
  try {
    if (!time) {
      return "";
    }
    if (typeof time === "string" && !isNaN(time))
      time = Number(time);
    let date;
    if (typeof time === "number") {
      if (time.toString().length == 10)
        time *= 1e3;
      date = new Date(time);
    } else {
      date = time;
    }
    const dif = date.getTimezoneOffset();
    const timeDif = dif * 60 * 1e3 + targetTimezone * 60 * 60 * 1e3;
    const east8time = date.getTime() + timeDif;
    date = new Date(east8time);
    let opt = {
      "M+": date.getMonth() + 1,
      //月份
      "d+": date.getDate(),
      //日
      "h+": date.getHours(),
      //小时
      "m+": date.getMinutes(),
      //分
      "s+": date.getSeconds(),
      //秒
      "q+": Math.floor((date.getMonth() + 3) / 3),
      //季度
      "S": date.getMilliseconds()
      //毫秒
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in opt) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? opt[k] : ("00" + opt[k]).substr(("" + opt[k]).length));
      }
    }
    return fmt;
  } catch (err) {
    return time;
  }
};
exports.util = util;
