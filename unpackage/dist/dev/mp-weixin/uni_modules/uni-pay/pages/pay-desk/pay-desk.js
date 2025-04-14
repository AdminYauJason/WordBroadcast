"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      options: {
        total_fee: ""
      },
      insideData: {},
      // uni-pay组件mounted事件获得的数据
      adpid: "",
      // 广告id
      return_url: "",
      // 支付成功后点击查看订单跳转的订单详情页面地址
      main_color: ""
      // 支付成功页面的主色调
    };
  },
  // 监听 - 页面每次【加载时】执行(如：前进)
  onLoad(options = {}) {
    options = JSON.parse(decodeURI(options.options));
    this.options = options;
  },
  // 监听 - 页面【首次渲染完成时】执行。注意如果渲染速度快，会在页面进入动画完成前触发
  onReady() {
  },
  // 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
  onShow() {
  },
  // 监听 - 页面每次【隐藏时】执行(如：返回)
  onHide() {
  },
  // 函数
  methods: {
    // 监听 - 支付组件加载完毕事件
    onMounted(insideData) {
      this.insideData = insideData;
    },
    // 发起支付
    createOrder(provider) {
      Object.assign(this.options, provider);
      this.$refs.uniPay.createOrder(this.options);
    },
    // 监听事件 - 支付成功
    onSuccess(res) {
      console.log("success: ", res);
      if (res.user_order_success) {
        common_vendor.index.redirectTo({
          url: `/uni_modules/uni-pay/pages/success/success?out_trade_no=${res.out_trade_no}&order_no=${res.pay_order.order_no}&pay_date=${res.pay_order.pay_date}&total_fee=${res.pay_order.total_fee}&adpid=${this.adpid}&return_url=${this.return_url}&main_color=${this.main_color}`
        });
      }
    }
  },
  // 监听器
  watch: {},
  // 计算属性
  computed: {}
};
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_pay2 = common_vendor.resolveComponent("uni-pay");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_pay2)();
}
const _easycom_uni_list_item = () => "../../../uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni-list/components/uni-list/uni-list.js";
const _easycom_uni_pay = () => "../../components/uni-pay/uni-pay.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_pay)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.insideData && $data.insideData.currentProviders
  }, $data.insideData && $data.insideData.currentProviders ? common_vendor.e({
    b: common_vendor.t(($data.options.total_fee / 100).toFixed(2)),
    c: $data.insideData.currentProviders.indexOf("wxpay") > -1
  }, $data.insideData.currentProviders.indexOf("wxpay") > -1 ? {
    d: common_vendor.o(($event) => $options.createOrder({
      provider: "wxpay"
    })),
    e: common_vendor.p({
      thumb: $data.insideData.images.wxpay,
      title: "微信支付",
      clickable: true,
      link: true
    })
  } : {}) : {}, {
    f: common_vendor.sr("uniPay", "52f4fa89-2"),
    g: common_vendor.o($options.onMounted),
    h: common_vendor.o($options.onSuccess),
    i: common_vendor.p({
      ["to-success-page"]: false
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-52f4fa89"]]);
wx.createPage(MiniProgramPage);
