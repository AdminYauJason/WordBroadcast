"use strict";
const common_vendor = require("../../../../common/vendor.js");
const uni_modules_uniPay_js_sdk_js_sdk = require("../../js_sdk/js_sdk.js");
const uniPayCo = common_vendor.Ys.importObject("uni-pay-co");
var myOpenid;
const _sfc_main = {
  name: "uni-pay",
  emits: ["success", "cancel", "fail", "create", "mounted", "qrcode"],
  props: {
    /**
     * Banner广告位id
     */
    adpid: {
      Type: String,
      default: ""
    },
    /**
     * 是否自动跳转到插件内置的支付成功页面（具有看广告功能，可以增加开发者收益）默认true
     */
    toSuccessPage: {
      Type: Boolean,
      default: true
    },
    /**
     * 支付成功后，点击查看订单按钮时跳转的页面地址
     */
    returnUrl: {
      Type: String,
      default: ""
    },
    /**
     * 支付结果页主色调，默认支付宝小程序为#108ee9，其他端均为#01be6e
     * 建议：绿色系 #01be6e 蓝色系 #108ee9 咖啡色 #816a4e 粉红 #fe4070 橙黄 #ffac0c 橘黄 #ff7100
     */
    mainColor: {
      Type: String,
      default: ""
    },
    /**
     * 收银台模式
     * mobile 手机版
     * pc 电脑版
     */
    mode: {
      Type: String,
      default: ""
    },
    /**
     * PC收银台模式时，展示的logo
     */
    logo: {
      Type: String,
      default: "/static/logo.png"
    },
    /**
     * 收银台高度（默认70vh）
     */
    height: {
      Type: [String],
      default: "70vh"
    },
    /**
     * 是否打印运行过程日志
     */
    debug: {
      Type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 支付参数
      options: {},
      // 支付云对象返回结果
      res: {},
      images: {
        wxpay: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAABC9JREFUeF7tWk1a20AMlUzv0bDr13AAYAOcpLCBcoqQU1DYEE6C2QAHIP26q3sPPOqniU2cZMYj+SeGxN5kEXlm9ObpjaQxwpY/uOX+Qw9Az4AtR6APgS0nQC+CfQi0FQLfrvcHXwAGPP4bQMK/fy5f7O9HehphwPfb/dOIogEhHQHBcamDCDESPoIxMQPTNSi1ABj+OrwDpNMaO5og4P2bMZOugFADwNTewWhU0/FVzAgnKZnxuoFQAbB3vX9MET7U2PHgq4R09vv8ZRI0bMhADMDw9uAhGN8NLQrWyAYRAGt1PgcRIU5TOms7JIIAdOL8nElJauikTRBKAdi7ObwioFFTzHaMw3mBzRV8DwKOXy+ertpagxcAq/YR/g2d6TlNrUDu4EiiE0Why4T1rgyINoXRC4DgjE+mF8+7RYAkp4RrRyVztRUKTgCkuz89fz4pAiB5z7WbklBrKxScAEgWxI6joZPXy5c4B0H0nkPdhzcHFIxxhHgZ8OA7AgMnAMObA479UnF6H5twQpF5RBMdibPDvB4AAAL6IZ0rNbTb9IngAyC8IwJ0K5okQBgzqFEKSV4wcXg17bxl8fIiJXFc0bHAgYLjYlHEFaZlVUQDoAIbcVZaN1VRrgAgUfImASiKW6Yh4pAohmHVQqpLABI0dMYiKhJPCeoV0ueuQsDmEJrkSeJ/bqNJnOqfApqVzWznzrdYWkvzhnUDYGnPKLTdV5gpfLiOqJUIaTefF8RKH6wxtAOX2IdA8NcCmmRItmBLfVF5jRBnR58kGQtWlGUJlBeAxpQ5A4eFKTu/ufLzPQv1f2mRRDiZ/nyyYwYrypI0OlQOc/9PsgshDsh2v+BUwTFnD3K5DglVlD4WlDZEsqywNgiK2F9gQBkLi7EtyV59WhBsiTURCjy5QZMgYRn9cxbZWgCQ+IKlnH2sFQYTURHmCYMgAJaKs9aYPkXNXGK6QhQdt9xeC4UhTC+eV/wVASASmrKj6IMA4NIBMQDsX1VN4IlbuU0K7vmiQS0G5EOpmiW6I1Dpjtp8pYc5yxYVj0RtXcMJcwDFSiqYLh2x+QgqAJwnAuEEydxbkZtdj+fKPVfwbPIq7KngqvMVX4WoAmDBAcH9HTMmXw23s0LJSlPOOsZx0l8VAu/0Fzjuc2Td3aY5zf1VoZgBvPgmvuhoIrFSMSXQThcDoJo0YLxGLfBSv5IINgVC1XxCOb/oZrkTBtRJqkQgKG6ROgPgPbGq/6HVIiYK51WngAj5ikbBhoZi3FALbHmozhlQXFChTc75g6wRM2ufzb9N/IwMcG0wg8HZJf9HBF/tFZnBBBH+cW/BpBDnd4XLDNJcon4oBiiY7jS194mEI0IaSz+12ygAclSYEcXvFsqA3UgANEzqAdCgtYm2PQM2cVc1PvUM0KC1ibY9AzZxVzU+bT0D/gPs/oxfcUEcJAAAAABJRU5ErkJggg==",
        alipay: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA2FJREFUeF7tmU122jAQx2cMB2hp9yULeK+naHISwhJyiIRDBJaQkwRO0fdgEWff0h4ANH0yFc+m+hhbckKNvJUsaX76z4ckhAv/8MLthwggKuDCCUQXuHABxCAYXSC6wIUTiC7wFgL4MPveTaj9optrO+696ya8yeQRQFRAdIEYAxoVBD/PNtdCwHWpDIJwr+1PMCk1DgAkCSx/jHrLsv/p+lfKAp3HzQOYDAqxKtcYBJPtXe/B1Y3TXgmATGst0WIrgAC7JmBINOQsNN8HE0zfVQFlFxzrgFgHNLQOkNJuQ7vrcgkS1CXEua5fgnDj+l+172CX/h59Tbn9Of0qBUE1cGe2ngPhLWeiEH0krFDBT63HC8Cnx/VtFuFDfgl90UOldDvuX4WcSo7lBSD0YuR4H6ebZwRNkRUw9xdSah1G+IzZmW5IW7ERDX/e9Rc+YwerBEMvQo1nrhfqkf/ZuYCxxK5J/t4AjkFQBi71CXxFoFSWq2XTlkn+AndXodNf5SwgT4J7gnttoNL6BqUEmCZET/tkvzQZYj5g1Sf/0goIkfcJYIkEK5HsFnkYnen6BXQptUb5lwJgMz4zCihXD/BqAwVDuoy+Uqx399kACrkZaYECVjY5qxJZXpoQwrcDHB6UghfVvPssAMo35W4R7oZVg5EMmAJxUCZ2CNzfVJ2Pm6qdleDBNwFClaHZdRrQAEhWe25VSPCuAMo1tnQhdIzMNUixfDYBqAOGVQEKQB15OFMCwXPV3QsFww7g73E39Pudr/Gn0EyplQPXCkBF/5AKsBtPKRA+AdKAEx/0BhYLL9nHFkhZLiBvbkOcxFzG5wPtoe7gBUrrTiMttqO+8ebZCkAtWErs17jHvrrSLcj+lkCpKeV5g/ABIA05lqgVM4Er2nPhZgev7DHGnToLG+ALIC9budgWwoRzyuMUPlzj8waVBuELIFOB5iksi7xIKQh8PS4wu8/j+a3vBScbRAgABVfg5BZbH6SFgP0kVIl7UCjNja4RCkAGwecaPLDhp4yNsSYkADlp/mncdNLLu8fpud9XQK7//wERGoBrAefSfgRBsLI9pTtPg+diUNV1yLuJypVg1Un/p/8arwDXZkQALkJNb48KaPoOu+yLCnARanp7VEDTd9hlX1SAi1DT2/8AaakVXysj5qkAAAAASUVORK5CYII="
      },
      originalRroviders: ["wxpay", "alipay"],
      currentProviders: ["wxpay", "alipay"],
      openid: ""
    };
  },
  async mounted() {
    let code;
    let res;
    if (!myOpenid) {
      code = await this.getCode();
      res = await this.getOpenid({
        provider: "wxpay",
        code
      });
      if (res) {
        myOpenid = res.openid;
        this.openid = res.openid;
      }
    }
    this.originalRroviders = ["wxpay"];
    this.currentProviders = JSON.parse(JSON.stringify(this.originalRroviders));
    this.$emit("mounted", {
      images: this.images,
      originalRroviders: this.originalRroviders,
      currentProviders: this.currentProviders
    });
  },
  methods: {
    // 发起支付 - 打开支付选项弹窗
    async open(options = {}) {
      if (options.provider) {
        let providers = [];
        this.originalRroviders.map((item, index) => {
          if (options.provider.indexOf(item) > -1) {
            providers.push(item);
          }
        });
        this.currentProviders = providers;
        delete options.provider;
      } else {
        this.currentProviders = JSON.parse(JSON.stringify(this.originalRroviders));
      }
      this.options = options;
      if (this.currentProviders.length === 1) {
        this.createOrder({ provider: this.currentProviders[0] });
      } else {
        if (this.modeCom === "pc") {
          this._pcChooseProvider(this.currentProviders[0]);
        }
        this.openPopup("payPopup");
      }
    },
    // 创建支付
    async createOrder(data = {}) {
      let { options } = this;
      Object.assign(options, data);
      if (options.provider === "appleiap") {
        return this._appleiapCreateOrder(options);
      }
      let createOrderData = {
        provider: options.provider,
        total_fee: options.total_fee,
        openid: myOpenid,
        order_no: options.order_no,
        out_trade_no: options.out_trade_no,
        description: options.description,
        type: options.type,
        qr_code: options.qr_code,
        custom: options.custom,
        other: options.other,
        wxpay_virtual: options.wxpay_virtual
        // 微信小程序虚拟支付需要
      };
      if (myOpenid) {
        createOrderData.openid = myOpenid;
      }
      try {
        let res = await uniPayCo.createOrder(createOrderData);
        if (!res.errCode) {
          this.$emit("create", res);
          if (res.qr_code && !options.cancel_popup) {
            this.res = res;
            if (this.modeCom === "pc") {
              this.openPopup("payPopup");
              this._pcChooseProvider(options.provider);
            } else {
              this.openPopup("qrcodePopup");
            }
          } else {
            this.orderPayment(res);
          }
        } else {
          this.$emit("fail", res);
        }
      } catch (err) {
        this.$emit("fail", err);
      }
    },
    // 调起支付
    orderPayment(res) {
      this.res = res;
      if (res.qr_code) {
        this.$emit("qrcode", res);
      } else if (res.order) {
        if (res.provider === "wxpay-virtual") {
          common_vendor.index.requestVirtualPayment({
            ...res.order,
            success: (res2) => {
              this._getOrder();
            },
            fail: (err) => {
              if (err.errMsg.indexOf("fail cancel") == -1) {
                console.error("uni.requestVirtualPayment:fail", err);
                this.$emit("fail", err);
              } else {
                this.$emit("cancel", err);
              }
            }
          });
        } else {
          common_vendor.index.requestPayment({
            ...res.order,
            ...res.order,
            success: (res2) => {
              this._getOrder();
            },
            fail: (err) => {
              if (err.errMsg.indexOf("fail cancel") == -1) {
                console.error("uni.requestPayment:fail", err);
                this.$emit("fail", err);
              } else {
                this.$emit("cancel", err);
              }
            }
          });
        }
      }
    },
    // 打开弹窗
    openPopup(name) {
      if (!this.$refs[name].showPopup)
        this.$refs[name].open();
    },
    // 关闭弹窗
    closePopup(name) {
      this.$refs[name].close();
    },
    // 查询订单（查询支付情况）
    async getOrder(data = {}) {
      try {
        let res = await uniPayCo.getOrder(data);
        if (typeof data.success === "function")
          data.success(res);
        return res;
      } catch (err) {
        if (typeof data.fail === "function")
          data.fail(err);
      }
    },
    // 发起退款（此接口需要admin角色才可以访问）
    async refund(data = {}) {
      try {
        let res = await uniPayCo.refund(data);
        if (typeof data.success === "function")
          data.success(res);
        return res;
      } catch (err) {
        if (typeof data.fail === "function")
          data.fail(err);
      }
    },
    // 查询退款（查询退款情况）
    async getRefund(data = {}) {
      try {
        let res = await uniPayCo.getRefund(data);
        if (typeof data.success === "function")
          data.success(res);
        return res;
      } catch (err) {
        if (typeof data.fail === "function")
          data.fail(err);
      }
    },
    // 关闭订单
    async closeOrder(data = {}) {
      try {
        let res = await uniPayCo.closeOrder(data);
        if (typeof data.success === "function")
          data.success(res);
        return res;
      } catch (err) {
        if (typeof data.fail === "function")
          data.fail(err);
      }
    },
    // 获取支持的支付供应商
    async getPayProviderFromCloud(data = {}) {
      try {
        let res = await uniPayCo.getPayProviderFromCloud(data);
        if (typeof data.success === "function")
          data.success(res);
        return res;
      } catch (err) {
        if (typeof data.fail === "function")
          data.fail(err);
      }
    },
    // 获取支付配置内的appid（主要用于获取获取微信公众号的appid，用以获取code）
    async getProviderAppId(data = {}) {
      try {
        let res = await uniPayCo.getProviderAppId(data);
        if (typeof data.success === "function")
          data.success(res);
        return res;
      } catch (err) {
        if (typeof data.fail === "function")
          data.fail(err);
      }
    },
    // 根据code获取openid
    async getOpenid(data = {}) {
      try {
        let res = await uniPayCo.getOpenid(data);
        if (typeof data.success === "function")
          data.success(res);
        return res;
      } catch (err) {
        if (typeof data.fail === "function")
          data.fail(err);
      }
    },
    // 验证iosIap苹果内购支付凭据
    async verifyReceiptFromAppleiap(data = {}) {
      try {
        let res = await uniPayCo.verifyReceiptFromAppleiap(data);
        if (typeof data.success === "function")
          data.success(res);
        return res;
      } catch (err) {
        if (typeof data.fail === "function")
          data.fail(err);
      }
    },
    // 获取code
    async getCode() {
      return uni_modules_uniPay_js_sdk_js_sdk.util.getWeixinCode();
    },
    // 支付成功后的逻辑
    paySuccess(res = {}) {
      this.closePopup("payPopup");
      this.closePopup("payConfirmPopup");
      this.clearQrcode();
      if (this.toSuccessPage) {
        this.pageToSuccess(res);
      }
      this.$emit("success", res);
    },
    pageToSuccess(res) {
      if (this.modeCom !== "pc") {
        common_vendor.index.navigateTo({
          url: `/uni_modules/uni-pay/pages/success/success?out_trade_no=${res.out_trade_no}&order_no=${res.pay_order.order_no}&pay_date=${res.pay_order.pay_date}&total_fee=${res.pay_order.total_fee}&adpid=${this.adpid}&return_url=${this.returnUrl}&main_color=${this.mainColor}`
        });
      } else {
        if (this.returnUrl) {
          let url = this.returnUrl + `?out_trade_no=${res.out_trade_no}&order_no=${res.pay_order.order_no}`;
          if (url.indexOf("/") !== 0)
            url = `/${url}`;
          common_vendor.index.navigateTo({
            url
          });
        }
      }
    },
    // 监听 - 关闭二维码弹窗
    clearQrcode() {
      this.res.codeUrl = "";
      this.res.qr_code_image = "";
    },
    // 内部函数查询支付状态
    async _getOrder() {
      this.getOrder({
        out_trade_no: this.res.out_trade_no,
        await_notify: true,
        success: (res) => {
          if (res.has_paid) {
            this.closePopup("qrcodePopup");
            this.paySuccess(res);
          }
        }
      });
    },
    // 重新发起支付
    _afreshPayment() {
      this.orderPayment(this.res);
    },
    // pc版弹窗选择支付方式
    _pcChooseProvider(provider) {
      if (provider === this.options.provider) {
        return;
      }
      return this.createOrder({ provider });
    },
    // ios内购支付逻辑
    async _appleiapCreateOrder(options) {
      let appleiap = new appleiapSdk.Iap({
        // products为苹果开发者后台的商品id数组
        products: [options.productid]
      });
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      await appleiap.init();
      let productList = await appleiap.getProduct();
      let productInfo = productList[0];
      options.total_fee = productInfo.price * 100;
      options.description = productInfo.description;
      let createOrderData = {
        provider: options.provider,
        total_fee: options.total_fee,
        order_no: options.order_no,
        out_trade_no: options.out_trade_no,
        description: options.description,
        type: options.type,
        custom: options.custom
      };
      let res = await uniPayCo.createOrder(createOrderData);
      if (res.errCode === 0) {
        this.$emit("create", res);
        this.res = res;
        common_vendor.index.showLoading({
          title: "支付请求中..."
        });
        try {
          if (this.debug)
            console.log("正在请求苹果服务器", options.productid, res.out_trade_no);
          let requestPaymentRes = await appleiap.requestPayment({
            productid: options.productid,
            username: res.out_trade_no
          });
          if (this.debug)
            console.log("用户支付成功", requestPaymentRes);
          common_vendor.index.showLoading({
            title: "正在处理支付结果..."
          });
          if (!requestPaymentRes.payment.username) {
            requestPaymentRes.payment.username = this.getAppleiapUserName(requestPaymentRes);
          }
          if (!requestPaymentRes.payment.username) {
            await appleiap.finishTransaction(requestPaymentRes);
            common_vendor.index.hideLoading();
            console.log(`您可能已支付成功，但很抱歉丢单了，请联系客服处理。`, requestPaymentRes);
            return false;
          }
          this.addAppleiapOrder(requestPaymentRes);
          let verifyRes = await this.verifyReceiptFromAppleiap({
            out_trade_no: requestPaymentRes.payment.username,
            transaction_receipt: requestPaymentRes.transactionReceipt,
            transaction_identifier: requestPaymentRes.transactionIdentifier
          });
          if (verifyRes.errCode === 0) {
            await appleiap.finishTransaction(requestPaymentRes);
            this.removeAppleiapOrder(requestPaymentRes);
            common_vendor.index.hideLoading();
            this.paySuccess(verifyRes);
          }
        } catch (err) {
          let code = err.errCode || err.code;
          if (code === 2) {
            if (this.debug)
              console.log("用户取消支付");
            this.$emit("cancel", err);
          } else {
            console.error("appleiapCreateOrder:fail", err);
            this.$emit("fail", err);
          }
          common_vendor.index.hideLoading();
        }
      }
    },
    // ios内购支付漏单重试
    async appleiapRestore() {
      common_vendor.index.showLoading({
        title: "检测支付环境..."
      });
      let appleiap = new appleiapSdk.Iap();
      await appleiap.init();
      try {
        if (this.debug)
          console.log("正在查询是否有漏单信息");
        const transactions = await appleiap.restoreCompletedTransactions({
          username: ""
        });
        if (this.debug)
          console.log("漏单查询结果：" + (transactions.length === 0 ? "未漏单" : "有漏单"), transactions);
        if (!transactions.length) {
          return;
        }
        for (let i = 0; i < transactions.length; i++) {
          let requestPaymentRes = transactions[i];
          switch (requestPaymentRes.transactionState) {
            case appleiapSdk.IapTransactionState.purchased:
              if (!requestPaymentRes.payment.username) {
                requestPaymentRes.payment.username = this.getAppleiapUserName(requestPaymentRes);
              }
              if (!requestPaymentRes.payment.username) {
                await appleiap.finishTransaction(requestPaymentRes);
                console.log(`您可能已支付成功，但很抱歉丢单了，请联系客服处理。`, requestPaymentRes);
                continue;
              }
              console.log("requestPaymentRes: ", requestPaymentRes);
              let verifyRes = await this.verifyReceiptFromAppleiap({
                out_trade_no: requestPaymentRes.payment.username,
                transaction_receipt: requestPaymentRes.transactionReceipt,
                transaction_identifier: requestPaymentRes.transactionIdentifier
              });
              console.log("verifyRes: ", verifyRes);
              if (verifyRes.errCode === 0) {
                console.log("完结订单：" + requestPaymentRes.payment.username);
                await appleiap.finishTransaction(requestPaymentRes);
                this.removeAppleiapOrder(requestPaymentRes);
              }
              break;
            case appleiapSdk.IapTransactionState.failed:
              await appleiap.finishTransaction(requestPaymentRes);
              break;
            default:
              break;
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        common_vendor.index.hideLoading();
      }
    },
    // 保存ios内购订单至本地缓存（丢单时可找回username）
    addAppleiapOrder(requestPaymentRes) {
      let key = "uni-pay-appleiap-order";
      let list = common_vendor.index.getStorageSync(key) || [];
      list.push(requestPaymentRes);
      common_vendor.index.setStorageSync(key, list);
    },
    // 从本地缓存中根据订单信息获取username
    getAppleiapUserName(requestPaymentRes) {
      let key = "uni-pay-appleiap-order";
      let list = common_vendor.index.getStorageSync(key) || [];
      let info = list.find((item) => {
        return item.transactionIdentifier === requestPaymentRes.transactionIdentifier && item.transactionDate === requestPaymentRes.transactionDate;
      });
      let username = info && info.payment && info.payment.username;
      return username;
    },
    // 从本地缓存中删除ios内购订单
    removeAppleiapOrder(requestPaymentRes) {
      let key = "uni-pay-appleiap-order";
      let list = common_vendor.index.getStorageSync(key) || [];
      let index = list.findIndex((item) => {
        return item.transactionIdentifier === requestPaymentRes.transactionIdentifier && item.transactionDate === requestPaymentRes.transactionDate;
      });
      if (index > -1) {
        list.splice(index, 1);
      }
      common_vendor.index.setStorageSync(key, list);
    }
  },
  watch: {},
  computed: {
    modeCom() {
      if (this.mode)
        return this.mode;
      let systemInfo = common_vendor.index.getSystemInfoSync();
      return systemInfo && systemInfo.deviceType === "pc" ? "pc" : "mobile";
    }
  }
};
if (!Array) {
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_popup2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_popup = () => "../../../uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_list_item = () => "../../../uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_popup + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.modeCom === "pc"
  }, $options.modeCom === "pc" ? common_vendor.e({
    b: $data.res.qr_code_image,
    c: common_vendor.t(($data.options.total_fee / 100).toFixed(2)),
    d: $data.res.qr_code_image
  }, $data.res.qr_code_image ? {
    e: common_vendor.o(($event) => $options._getOrder())
  } : {}, {
    f: $data.currentProviders.indexOf("wxpay") > -1
  }, $data.currentProviders.indexOf("wxpay") > -1 ? {
    g: $data.images.wxpay,
    h: common_vendor.n($data.options.provider == "wxpay" ? "active" : ""),
    i: common_vendor.o(($event) => $options._pcChooseProvider("wxpay"))
  } : {}, {
    j: $data.currentProviders.indexOf("alipay") > -1
  }, $data.currentProviders.indexOf("alipay") > -1 ? {
    k: $data.images.alipay,
    l: common_vendor.n($data.options.provider == "alipay" ? "active" : ""),
    m: common_vendor.o(($event) => $options._pcChooseProvider("alipay"))
  } : {}, {
    n: $props.logo,
    o: common_vendor.sr("payPopup", "9aa540bd-0"),
    p: common_vendor.p({
      type: "center",
      ["safe-area"]: false
    })
  }) : common_vendor.e({
    q: common_vendor.t(($data.options.total_fee / 100).toFixed(2)),
    r: $data.currentProviders.indexOf("wxpay") > -1
  }, $data.currentProviders.indexOf("wxpay") > -1 ? {
    s: common_vendor.o(($event) => $options.createOrder({
      provider: "wxpay"
    })),
    t: common_vendor.p({
      thumb: $data.images.wxpay,
      title: "微信支付",
      clickable: true,
      link: true
    })
  } : {}, {
    v: common_vendor.s("min-height: " + $props.height + ";"),
    w: common_vendor.sr("payPopup", "9aa540bd-1"),
    x: common_vendor.p({
      type: "bottom",
      ["safe-area"]: false
    })
  }), {
    y: $data.res.qr_code_image,
    z: common_vendor.t(($data.options.total_fee / 100).toFixed(2)),
    A: $data.options.provider == "wxpay"
  }, $data.options.provider == "wxpay" ? {} : $data.options.provider == "alipay" ? {} : {}, {
    B: $data.options.provider == "alipay",
    C: common_vendor.o(($event) => $options._getOrder()),
    D: common_vendor.o(($event) => $options.closePopup("qrcodePopup")),
    E: common_vendor.sr("qrcodePopup", "9aa540bd-4"),
    F: common_vendor.o($options.clearQrcode),
    G: common_vendor.p({
      type: "center",
      ["safe-area"]: false,
      animation: false,
      ["mask-click"]: false
    }),
    H: common_vendor.o(($event) => $options._getOrder()),
    I: common_vendor.o(($event) => $options._afreshPayment()),
    J: common_vendor.o(($event) => $options.closePopup("payConfirmPopup")),
    K: common_vendor.sr("payConfirmPopup", "9aa540bd-5"),
    L: common_vendor.p({
      type: "center",
      ["safe-area"]: false,
      animation: false,
      ["mask-click"]: false
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9aa540bd"]]);
wx.createComponent(Component);
