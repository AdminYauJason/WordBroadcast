"use weex:vue";

if (typeof Promise !== 'undefined' && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor
    return this.then(
      value => promise.resolve(callback()).then(() => value),
      reason => promise.resolve(callback()).then(() => {
        throw reason
      })
    )
  }
};

if (typeof uni !== 'undefined' && uni && uni.requireGlobal) {
  const global = uni.requireGlobal()
  ArrayBuffer = global.ArrayBuffer
  Int8Array = global.Int8Array
  Uint8Array = global.Uint8Array
  Uint8ClampedArray = global.Uint8ClampedArray
  Int16Array = global.Int16Array
  Uint16Array = global.Uint16Array
  Int32Array = global.Int32Array
  Uint32Array = global.Uint32Array
  Float32Array = global.Float32Array
  Float64Array = global.Float64Array
  BigInt64Array = global.BigInt64Array
  BigUint64Array = global.BigUint64Array
};


(()=>{var x=Object.create;var u=Object.defineProperty;var v=Object.getOwnPropertyDescriptor;var _=Object.getOwnPropertyNames;var w=Object.getPrototypeOf,y=Object.prototype.hasOwnProperty;var b=(a,t)=>()=>(t||a((t={exports:{}}).exports,t),t.exports);var h=(a,t,o,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of _(t))!y.call(a,i)&&i!==o&&u(a,i,{get:()=>t[i],enumerable:!(n=v(t,i))||n.enumerable});return a};var k=(a,t,o)=>(o=a!=null?x(w(a)):{},h(t||!a||!a.__esModule?u(o,"default",{value:a,enumerable:!0}):o,a));var d=b((V,m)=>{m.exports=Vue});var e=k(d());var g=(a,t)=>{let o=a.__vccOpts||a;for(let[n,i]of t)o[n]=i;return o};var B={h5:{url:"https://uni-starter.dcloud.net.cn",openApp:{}},mp:{weixin:{id:""}},about:{appName:"uni-starter",logo:"/static/logo.png",company:"\u5317\u4EACxx\u7F51\u7EDC\u6280\u672F\u6709\u9650\u516C\u53F8",slogan:"\u4E91\u7AEF\u4E00\u4F53\u5E94\u7528\u5FEB\u901F\u5F00\u53D1\u6A21\u7248",download:"https://itunes.apple.com/cn/app/hello-uni-app/id1417078253?mt=8",version:"1.0.0"},download:{ios:"https://itunes.apple.com/cn/app/hello-uni-app/id1417078253?mt=8",android:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-97fca9f2-41f6-449f-a35e-3f135d4c3875/6d754387-a6c3-48ed-8ad2-e8f39b40fc01.apk"},marketId:{ios:"",android:""},i18n:{enable:!1}},C={page:{"":{paddingTop:80,paddingRight:30,paddingBottom:80,paddingLeft:30}},title:{"":{fontSize:18,lineHeight:30,marginBottom:20}},"flex-r":{"":{flexDirection:"row",flexWrap:"wrap"}},"text-item":{"":{marginBottom:5}},tl:{"":{fontSize:14,lineHeight:20}},hl:{"":{color:"#007AFF"}},service:{"":{fontSize:16,lineHeight:20,marginTop:20}},confirm:{"":{marginTop:50,flexDirection:"row"}},"btn-privacy":{"":{flex:1}},"btn-disagree":{"":{marginLeft:20}}},{about:f}=B,T={data(){return{}},onLoad(){this._canBack=!1},onBackPress(){return!this._canBack},methods:{openprotocol(a){uni.navigateTo({url:"/uni_modules/uni-id-pages/pages/common/webview/webview?url="+f.agreements[0].url})},openPrivacyPolicy(a){uni.navigateTo({url:"/uni_modules/uni-id-pages/pages/common/webview/webview?url="+f.agreements[1].url})},agree(a){uni.setStorageSync("userprotocol",1),this._canBack=!0,setTimeout(()=>{uni.navigateBack({animationDuration:0})},100)},disagree(){plus.runtime.quit()}}};function P(a,t,o,n,i,s){let p=(0,e.resolveComponent)("button");return(0,e.openBlock)(),(0,e.createElementBlock)("scroll-view",{scrollY:!0,showScrollbar:!0,enableBackToTop:!0,bubble:"true",style:{flexDirection:"column"}},[(0,e.createElementVNode)("view",{class:"page"},[(0,e.createElementVNode)("view",null,[(0,e.createElementVNode)("u-text",{class:"title"},"\u4E2A\u4EBA\u4FE1\u606F\u4FDD\u62A4\u6307\u5F15")]),(0,e.createElementVNode)("view",{class:"text-item"},[(0,e.createElementVNode)("u-text",{class:"tl"},"1.\u5728\u6D4F\u89C8\u4F7F\u7528\u65F6\uFF0C\u6211\u4EEC\u4F1A\u6536\u96C6\u3001\u4F7F\u7528\u8BBE\u5907\u6807\u8BC6\u4FE1\u606F\u7528\u4E8E\u63A8\u8350\u3002")]),(0,e.createElementVNode)("view",{class:"text-item"},[(0,e.createElementVNode)("u-text",{class:"tl"},"2.\u6211\u4EEC\u53EF\u80FD\u4F1A\u7533\u8BF7\u4F4D\u7F6E\u6743\u9650\uFF0C\u7528\u4E8E\u6F14\u793A uni-app \u7684\u5730\u56FE\u3001\u5B9A\u4F4D\u80FD\u529B\u3002")]),(0,e.createElementVNode)("view",{class:"text-item"},[(0,e.createElementVNode)("u-text",{class:"tl"},"3.\u4F60\u53EF\u4EE5\u67E5\u770B\u5B8C\u6574\u7248")]),(0,e.createElementVNode)("view",{class:"text-item flex-r"},[(0,e.createElementVNode)("u-text",{class:"tl hl",onClick:t[0]||(t[0]=(...r)=>s.openprotocol&&s.openprotocol(...r))},"\u300A\u7528\u6237\u534F\u8BAE\u300B"),(0,e.createElementVNode)("u-text",{class:"tl"}," \u548C "),(0,e.createElementVNode)("u-text",{class:"tl hl",onClick:t[1]||(t[1]=(...r)=>s.openPrivacyPolicy&&s.openPrivacyPolicy(...r))},"\u300A\u9690\u79C1\u653F\u7B56\u300B")]),(0,e.createElementVNode)("view",{class:"text-item"},[(0,e.createElementVNode)("u-text",{class:"tl"},"\u4EE5\u4FBF\u4E86\u89E3\u6211\u4EEC\u6536\u96C6\u3001\u4F7F\u7528\u3001\u5171\u4EAB\u3001\u5B58\u50A8\u4FE1\u606F\u7684\u60C5\u51B5\uFF0C\u4EE5\u53CA\u5BF9\u4FE1\u606F\u7684\u4FDD\u62A4\u63AA\u65BD\u3002")]),(0,e.createElementVNode)("view",{class:"text-item"},[(0,e.createElementVNode)("u-text",{class:"service"},"\u5982\u679C\u4F60\u540C\u610F\u8BF7\u70B9\u51FB\u4E0B\u9762\u7684\u6309\u94AE\u4EE5\u63A5\u53D7\u6211\u4EEC\u7684\u670D\u52A1")]),(0,e.createElementVNode)("view",{class:"text-item confirm"},[(0,e.createVNode)(p,{class:"btn-privacy",type:"primary",onClick:s.agree},{default:(0,e.withCtx)(()=>[(0,e.createTextVNode)("\u540C\u610F")]),_:1},8,["onClick"]),(0,e.createVNode)(p,{class:"btn-privacy btn-disagree",onClick:s.disagree},{default:(0,e.withCtx)(()=>[(0,e.createTextVNode)("\u6682\u4E0D\u4F7F\u7528")]),_:1},8,["onClick"])]),(0,e.createElementVNode)("view",{class:"exit-area"})])])}var l=g(T,[["render",P],["styles",[C]]]);var c=plus.webview.currentWebview();if(c){let a=parseInt(c.id),t="pages/uni-agree/uni-agree",o={};try{o=JSON.parse(c.__query__)}catch(i){}l.mpType="page";let n=Vue.createPageApp(l,{$store:getApp({allowDefault:!0}).$store,__pageId:a,__pagePath:t,__pageQuery:o});n.provide("__globalStyles",Vue.useCssStyles([...__uniConfig.styles,...l.styles||[]])),n.mount("#root")}})();
