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


(()=>{var i=Object.create;var a=Object.defineProperty;var f=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var y=Object.getPrototypeOf,g=Object.prototype.hasOwnProperty;var b=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);var d=(e,t,o,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of m(t))!g.call(e,r)&&r!==o&&a(e,r,{get:()=>t[r],enumerable:!(s=f(t,r))||s.enumerable});return e};var w=(e,t,o)=>(o=e!=null?i(y(e)):{},d(t||!e||!e.__esModule?a(o,"default",{value:e,enumerable:!0}):o,e));var _=b((S,n)=>{n.exports=Vue});var l=w(_());var u=(e,t)=>{let o=e.__vccOpts||e;for(let[s,r]of t)o[s]=r;return o};var x={},v={};function $(e,t,o,s,r,h){return(0,l.openBlock)(),(0,l.createElementBlock)("scroll-view",{scrollY:!0,showScrollbar:!0,enableBackToTop:!0,bubble:"true",style:{flexDirection:"column"}},[(0,l.createElementVNode)("u-text",null," <\u4F60\u597D ")])}var p=u(v,[["render",$],["styles",[x]]]);var c=plus.webview.currentWebview();if(c){let e=parseInt(c.id),t="pages/list/list",o={};try{o=JSON.parse(c.__query__)}catch(r){}p.mpType="page";let s=Vue.createPageApp(p,{$store:getApp({allowDefault:!0}).$store,__pageId:e,__pagePath:t,__pageQuery:o});s.provide("__globalStyles",Vue.useCssStyles([...__uniConfig.styles,...p.styles||[]])),s.mount("#root")}})();
