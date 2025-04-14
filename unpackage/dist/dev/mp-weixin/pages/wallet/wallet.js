"use strict";
const common_vendor = require("../../common/vendor.js");
const db = common_vendor.Ys.database();
const _sfc_main = {
  data() {
    return {
      userInfo: {},
      customAmount: "",
      transactions: [],
      selectedPayMethod: "wxpay",
      loading: false,
      paymentMethods: [
        {
          id: "wxpay",
          name: "微信支付",
          icon: "/static/wallet/wxpay.png"
        },
        {
          id: "alipay",
          name: "支付宝",
          icon: "/static/wallet/alipay.png"
        }
      ]
    };
  },
  computed: {
    canRecharge() {
      const amount = Number(this.customAmount);
      return amount >= 1 && amount <= 5e4;
    }
  },
  onLoad() {
    this.getUserInfo();
    this.getTransactions();
  },
  onPullDownRefresh() {
    Promise.all([
      this.getUserInfo(),
      this.getTransactions()
    ]).finally(() => {
      common_vendor.index.stopPullDownRefresh();
    });
  },
  methods: {
    async getUserInfo() {
      try {
        const { result } = await db.collection("uni-id-users").where("'_id' == $cloudEnv_uid").field("balance").get();
        if (result.data.length > 0) {
          this.userInfo = result.data[0];
        }
      } catch (e) {
        console.error(e);
        common_vendor.index.showToast({
          title: "获取用户信息失败",
          icon: "none"
        });
      }
    },
    async getTransactions() {
      try {
        const { result } = await db.collection("transactions").where("'user_id' == $cloudEnv_uid").orderBy("createTime", "desc").limit(5).get();
        this.transactions = result.data;
      } catch (e) {
        console.error(e);
        common_vendor.index.showToast({
          title: "获取交易记录失败",
          icon: "none"
        });
      }
    },
    selectPayMethod(methodId) {
      this.selectedPayMethod = methodId;
    },
    showRechargePopup() {
      this.$refs.rechargePopup.open();
    },
    closeRechargePopup() {
      this.$refs.rechargePopup.close();
      this.resetRechargeForm();
    },
    resetRechargeForm() {
      this.customAmount = "";
      this.selectedPayMethod = "wxpay";
    },
    handleAmountInput(e) {
      const value = e.detail.value;
      this.customAmount = value.replace(/[^\d.]/g, "").replace(/\.{2,}/g, ".").replace(/^(\d+)\.(\d\d).*$/, "$1.$2");
    },
    async confirmRecharge() {
      const amount = Number(this.customAmount);
      if (!amount) {
        common_vendor.index.showToast({
          title: "请输入充值金额",
          icon: "none"
        });
        return;
      }
      try {
        this.loading = true;
        common_vendor.index.showLoading({
          title: "请求支付中..."
        });
        const { result } = await common_vendor.Ys.callFunction({
          name: "recharge",
          data: {
            amount,
            payMethod: this.selectedPayMethod
          }
        });
        if (result.code === 0) {
          if (this.selectedPayMethod === "wxpay") {
            await this.processWxPay(result.payInfo);
          } else {
            await this.processAliPay(result.payInfo);
          }
        } else {
          throw new Error(result.message);
        }
      } catch (e) {
        console.error(e);
        common_vendor.index.showToast({
          title: "支付失败：" + e.message,
          icon: "none"
        });
      } finally {
        common_vendor.index.hideLoading();
        this.loading = false;
        this.closeRechargePopup();
      }
    },
    processWxPay(payInfo) {
      return new Promise((resolve, reject) => {
        common_vendor.index.requestPayment({
          provider: "wxpay",
          ...payInfo,
          success: (res) => {
            common_vendor.index.showToast({
              title: "充值成功",
              icon: "success"
            });
            this.getUserInfo();
            this.getTransactions();
            resolve(res);
          },
          fail: (err) => {
            reject(new Error("支付取消或失败"));
          }
        });
      });
    },
    processAliPay(payInfo) {
      return new Promise((resolve, reject) => {
        common_vendor.index.requestPayment({
          provider: "alipay",
          ...payInfo,
          success: (res) => {
            common_vendor.index.showToast({
              title: "充值成功",
              icon: "success"
            });
            this.getUserInfo();
            this.getTransactions();
            resolve(res);
          },
          fail: (err) => {
            reject(new Error("支付取消或失败"));
          }
        });
      });
    },
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    },
    navigateToFullHistory() {
      common_vendor.index.navigateTo({
        url: "/pages/wallet/transaction-history"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.userInfo.balance || "0.00"),
    b: common_vendor.o((...args) => $options.showRechargePopup && $options.showRechargePopup(...args)),
    c: common_vendor.o((...args) => $options.navigateToFullHistory && $options.navigateToFullHistory(...args)),
    d: $data.transactions.length === 0
  }, $data.transactions.length === 0 ? {
    e: common_vendor.p({
      type: "info",
      size: "48",
      color: "#999"
    })
  } : {
    f: common_vendor.f($data.transactions, (item, index, i0) => {
      return {
        a: common_vendor.t(item.type),
        b: common_vendor.t($options.formatDate(item.createTime)),
        c: common_vendor.t(item.amount > 0 ? "+" : ""),
        d: common_vendor.t(item.amount),
        e: common_vendor.n(item.amount > 0 ? "income" : "expense"),
        f: index
      };
    })
  }, {
    g: common_vendor.p({
      type: "close",
      size: "20",
      color: "#666"
    }),
    h: common_vendor.o((...args) => $options.closeRechargePopup && $options.closeRechargePopup(...args)),
    i: common_vendor.o([($event) => $data.customAmount = $event.detail.value, (...args) => $options.handleAmountInput && $options.handleAmountInput(...args)]),
    j: $data.customAmount,
    k: common_vendor.f($data.paymentMethods, (method, k0, i0) => {
      return common_vendor.e({
        a: method.icon,
        b: common_vendor.t(method.name),
        c: $data.selectedPayMethod === method.id
      }, $data.selectedPayMethod === method.id ? {
        d: "4c380209-3-" + i0 + ",4c380209-1",
        e: common_vendor.p({
          type: "checkmarkempty",
          size: "20",
          color: "#07c160"
        })
      } : {}, {
        f: method.id,
        g: $data.selectedPayMethod === method.id ? 1 : "",
        h: common_vendor.o(($event) => $options.selectPayMethod(method.id), method.id)
      });
    }),
    l: common_vendor.o((...args) => $options.confirmRecharge && $options.confirmRecharge(...args)),
    m: !$options.canRecharge || $data.loading,
    n: $data.loading,
    o: common_vendor.sr("rechargePopup", "4c380209-1"),
    p: common_vendor.p({
      type: "bottom"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-4c380209"]]);
wx.createPage(MiniProgramPage);
