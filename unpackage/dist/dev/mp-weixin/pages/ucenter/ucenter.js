"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniUpgradeCenterApp_utils_callCheckVersion = require("../../uni_modules/uni-upgrade-center-app/utils/call-check-version.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
const db = common_vendor.Ys.database();
const _sfc_main = {
  data() {
    return {
      ucenterList: [
        [
          {
            "title": this.$t("mine.readArticles"),
            "to": "/pages/grid/grid",
            "icon": "flag"
          },
          {
            "title": this.$t("mine.myScore"),
            "to": "",
            "event": "getScore",
            "icon": "paperplane"
          }
        ],
        [{
          "title": this.$t("mine.feedback"),
          "to": "/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback",
          "icon": "help"
        }, {
          "title": this.$t("mine.settings"),
          "to": "/pages/ucenter/settings/settings",
          "icon": "gear"
        }]
      ],
      listStyles: {
        "height": "150rpx",
        "width": "150rpx",
        "border": {
          "color": "#eee",
          "width": "1px",
          "style": "solid",
          "radius": "100%"
        }
      }
    };
  },
  onLoad() {
  },
  onShow() {
  },
  computed: {
    userInfo() {
      return uni_modules_uniIdPages_common_store.store.userInfo;
    },
    hasLogin() {
      return uni_modules_uniIdPages_common_store.store.hasLogin;
    },
    appConfig() {
      return getApp().globalData.config;
    }
  },
  methods: {
    navigateToWallet() {
      if (!this.hasLogin) {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "none"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/wallet/wallet"
      });
    },
    toSettings() {
      common_vendor.index.navigateTo({
        url: "/pages/ucenter/settings/settings"
      });
    },
    ucenterListClick(item) {
      if (!item.to && item.event) {
        this[item.event]();
      } else if (item.to) {
        common_vendor.index.switchTab({
          url: item.to,
          fail: () => {
            common_vendor.index.navigateTo({ url: item.to });
          }
        });
      }
    },
    async checkVersion() {
      let res = await uni_modules_uniUpgradeCenterApp_utils_callCheckVersion.callCheckVersion();
      console.log(res);
      if (res.result.code > 0)
        ;
      else {
        common_vendor.index.showToast({
          title: res.result.message,
          icon: "none"
        });
      }
    },
    toUserInfo() {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/userinfo"
      });
    },
    gotoMarket() {
    },
    getScore() {
      if (!this.userInfo)
        return common_vendor.index.showToast({
          title: this.$t("mine.checkScore"),
          icon: "none"
        });
      common_vendor.index.showLoading({
        mask: true
      });
      db.collection("uni-id-scores").where('"user_id" == $env.uid').field("score,balance").orderBy("create_date", "desc").limit(1).get().then((res) => {
        console.log(res);
        const data = res.result.data[0];
        let msg = "";
        msg = data ? this.$t("mine.currentScore") + data.balance : this.$t("mine.noScore");
        common_vendor.index.showToast({
          title: msg,
          icon: "none"
        });
      }).finally(() => {
        common_vendor.index.hideLoading();
      });
    },
    async share() {
      let { result } = await db.collection("uni-id-users").where("'_id' == $cloudEnv_uid").field("my_invite_code").get();
      let myInviteCode = result.data[0].my_invite_code;
      if (!myInviteCode) {
        return common_vendor.index.showToast({
          title: "请检查uni-config-center中uni-id配置，是否已启用 autoSetInviteCode",
          icon: "none"
        });
      }
      console.log({ myInviteCode });
      let {
        title,
        summary,
        imageUrl,
        href
      } = this.appConfig.shareInvite || {};
      uniShare.share({
        provider: ["weixin", "sinaweibo", "qq"],
        scenes: ["WXSceneSession", "WXSceneTimeline", "SinaWeibo", "QQ"],
        type: 0,
        href: href || location.origin + "/#/pages/ucenter/login-page/login-page?code=" + myInviteCode,
        title,
        summary,
        imageUrl
      });
    }
  }
};
if (!Array) {
  const _easycom_cloud_image2 = common_vendor.resolveComponent("cloud-image");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_cloud_image2 + _easycom_uni_icons2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_cloud_image = () => "../../uni_modules/uni-id-pages/components/cloud-image/cloud-image.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_cloud_image + _easycom_uni_icons + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.hasLogin && $options.userInfo.avatar_file && $options.userInfo.avatar_file.url
  }, $options.hasLogin && $options.userInfo.avatar_file && $options.userInfo.avatar_file.url ? {
    b: common_vendor.p({
      width: "160rpx",
      height: "160rpx",
      src: $options.userInfo.avatar_file.url
    })
  } : {
    c: common_vendor.p({
      color: "#ffffff",
      size: "50",
      type: "person-filled"
    })
  }, {
    d: common_vendor.o((...args) => $options.toUserInfo && $options.toUserInfo(...args)),
    e: common_vendor.t($options.hasLogin ? $options.userInfo.nickname || $options.userInfo.username || $options.userInfo.mobile : _ctx.$t("mine.notLogged")),
    f: common_vendor.o((...args) => $options.navigateToWallet && $options.navigateToWallet(...args)),
    g: common_vendor.t($options.userInfo.balance || 0),
    h: common_vendor.f($data.ucenterList, (sublist, index, i0) => {
      return {
        a: common_vendor.f(sublist, (item, i, i1) => {
          return common_vendor.e({
            a: item.showBadge
          }, item.showBadge ? {
            b: common_vendor.t(item.rightText)
          } : {}, {
            c: i,
            d: common_vendor.o(($event) => $options.ucenterListClick(item), i),
            e: "b6546e32-3-" + i0 + "-" + i1 + "," + ("b6546e32-2-" + i0),
            f: common_vendor.p({
              title: item.title,
              link: true,
              rightText: item.rightText,
              clickable: true,
              to: item.to,
              ["show-extra-icon"]: true,
              extraIcon: {
                type: item.icon,
                color: "#666"
              }
            })
          });
        }),
        b: index,
        c: "b6546e32-2-" + i0
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-b6546e32"]]);
wx.createPage(MiniProgramPage);
