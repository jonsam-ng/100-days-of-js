if(!self.define){let s,e={};const l=(l,n)=>(l=new URL(l+".js",n).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(n,i)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const d=s=>l(s,r),t={module:{uri:r},exports:u,require:d};e[r]=Promise.all(n.map((s=>t[s]||d(s)))).then((s=>(i(...s),u)))}}define(["./workbox-74eda642"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/app.868bbc50.js",revision:null},{url:"assets/chunks/_virtual_my-module.e934515d.js",revision:null},{url:"assets/chunks/vue.runtime.esm-bundler.073fd05c.js",revision:null},{url:"assets/chunks/vue3-pdf-embed.3a4ad55f.js",revision:null},{url:"assets/chunks/vue3-video-player.common.27264d07.js",revision:null},{url:"assets/CS_开始上手.md.42011ea1.js",revision:null},{url:"assets/CS_开始上手.md.42011ea1.lean.js",revision:null},{url:"assets/CS_网络原理_0-开始阅读.md.f46650a6.js",revision:null},{url:"assets/CS_网络原理_0-开始阅读.md.f46650a6.lean.js",revision:null},{url:"assets/CS_网络原理_00-计算机网络原理之概述.md.25ce09c6.js",revision:null},{url:"assets/CS_网络原理_00-计算机网络原理之概述.md.25ce09c6.lean.js",revision:null},{url:"assets/CS_网络原理_01-计算机网络原理之物理层.md.06d6bd98.js",revision:null},{url:"assets/CS_网络原理_01-计算机网络原理之物理层.md.06d6bd98.lean.js",revision:null},{url:"assets/CS_网络原理_02-计算机网络原理之数据链路层.md.aad0b4f9.js",revision:null},{url:"assets/CS_网络原理_02-计算机网络原理之数据链路层.md.aad0b4f9.lean.js",revision:null},{url:"assets/CS_网络原理_03-计算机网络原理之网络层.md.6cd68fba.js",revision:null},{url:"assets/CS_网络原理_03-计算机网络原理之网络层.md.6cd68fba.lean.js",revision:null},{url:"assets/index.md.69b33941.js",revision:null},{url:"assets/index.md.69b33941.lean.js",revision:null},{url:"assets/style.9adc9e3d.css",revision:null},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"f787b74f5a7f224daf25d23c76054eb3"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
