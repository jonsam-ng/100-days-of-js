if(!self.define){let s,e={};const l=(l,n)=>(l=new URL(l+".js",n).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(n,i)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const d=s=>l(s,r),t={module:{uri:r},exports:u,require:d};e[r]=Promise.all(n.map((s=>t[s]||d(s)))).then((s=>(i(...s),u)))}}define(["./workbox-74eda642"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/app.4f3d34f9.js",revision:null},{url:"assets/chunks/_virtual_my-module.f6562f39.js",revision:null},{url:"assets/chunks/vue.runtime.esm-bundler.19df276b.js",revision:null},{url:"assets/chunks/vue3-pdf-embed.7e7edf9b.js",revision:null},{url:"assets/chunks/vue3-video-player.common.1ae1fc3f.js",revision:null},{url:"assets/CS_开始上手.md.87c7d5d2.js",revision:null},{url:"assets/CS_开始上手.md.87c7d5d2.lean.js",revision:null},{url:"assets/CS_网络原理_0-开始阅读.md.e33a031b.js",revision:null},{url:"assets/CS_网络原理_0-开始阅读.md.e33a031b.lean.js",revision:null},{url:"assets/CS_网络原理_00-计算机网络原理之概述.md.86dee69d.js",revision:null},{url:"assets/CS_网络原理_00-计算机网络原理之概述.md.86dee69d.lean.js",revision:null},{url:"assets/CS_网络原理_01-计算机网络原理之物理层.md.0854f97c.js",revision:null},{url:"assets/CS_网络原理_01-计算机网络原理之物理层.md.0854f97c.lean.js",revision:null},{url:"assets/CS_网络原理_02-计算机网络原理之数据链路层.md.5c03019e.js",revision:null},{url:"assets/CS_网络原理_02-计算机网络原理之数据链路层.md.5c03019e.lean.js",revision:null},{url:"assets/CS_网络原理_03-计算机网络原理之网络层.md.4fbcd167.js",revision:null},{url:"assets/CS_网络原理_03-计算机网络原理之网络层.md.4fbcd167.lean.js",revision:null},{url:"assets/CS_网络原理_04-计算机网络原理之传输层.md.b139b037.js",revision:null},{url:"assets/CS_网络原理_04-计算机网络原理之传输层.md.b139b037.lean.js",revision:null},{url:"assets/CS_网络原理_05-计算机网络原理之应用层.md.3908983b.js",revision:null},{url:"assets/CS_网络原理_05-计算机网络原理之应用层.md.3908983b.lean.js",revision:null},{url:"assets/index.md.000ea017.js",revision:null},{url:"assets/index.md.000ea017.lean.js",revision:null},{url:"assets/style.81b12df7.css",revision:null},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"f787b74f5a7f224daf25d23c76054eb3"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
