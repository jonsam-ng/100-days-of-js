if(!self.define){let s,e={};const l=(l,n)=>(l=new URL(l+".js",n).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(n,r)=>{const i=s||("document"in self?document.currentScript.src:"")||location.href;if(e[i])return;let a={};const u=s=>l(s,i),t={module:{uri:i},exports:a,require:u};e[i]=Promise.all(n.map((s=>t[s]||u(s)))).then((s=>(r(...s),a)))}}define(["./workbox-74eda642"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.precacheAndRoute([{url:"assets/app.e2f67299.js",revision:null},{url:"assets/chunks/gitalk.ea005027.js",revision:null},{url:"assets/chunks/index.cfa69757.js",revision:null},{url:"assets/chunks/virtual_search-data.f030c8ba.js",revision:null},{url:"assets/chunks/vue-codemirror.esm.8c985051.js",revision:null},{url:"assets/chunks/vue.runtime.esm-bundler.b034a404.js",revision:null},{url:"assets/chunks/vue3-pdf-embed.54b82bf3.js",revision:null},{url:"assets/chunks/vue3-video-player.common.7bfe99ef.js",revision:null},{url:"assets/CS_0-开始上手.md.30801e1f.js",revision:null},{url:"assets/CS_0-开始上手.md.30801e1f.lean.js",revision:null},{url:"assets/CS_01-VIM操作表.md.7e7ea154.js",revision:null},{url:"assets/CS_01-VIM操作表.md.7e7ea154.lean.js",revision:null},{url:"assets/CS_02-Emoji For Markdown.md.cfb17748.js",revision:null},{url:"assets/CS_02-Emoji For Markdown.md.cfb17748.lean.js",revision:null},{url:"assets/CS_Linux Kernel_0-开始阅读.md.796342aa.js",revision:null},{url:"assets/CS_Linux Kernel_0-开始阅读.md.796342aa.lean.js",revision:null},{url:"assets/CS_操作系统_0-开始阅读.md.aa308347.js",revision:null},{url:"assets/CS_操作系统_0-开始阅读.md.aa308347.lean.js",revision:null},{url:"assets/CS_操作系统_00-操作系统原理之概述.md.681acfdf.js",revision:null},{url:"assets/CS_操作系统_00-操作系统原理之概述.md.681acfdf.lean.js",revision:null},{url:"assets/CS_操作系统_01-操作系统原理之进程与线程.md.3ca6005f.js",revision:null},{url:"assets/CS_操作系统_01-操作系统原理之进程与线程.md.3ca6005f.lean.js",revision:null},{url:"assets/CS_操作系统_02-操作系统原理之CPU调度.md.dfd5722f.js",revision:null},{url:"assets/CS_操作系统_02-操作系统原理之CPU调度.md.dfd5722f.lean.js",revision:null},{url:"assets/CS_操作系统_03-操作系统原理之调度算法.md.81b5ca2b.js",revision:null},{url:"assets/CS_操作系统_03-操作系统原理之调度算法.md.81b5ca2b.lean.js",revision:null},{url:"assets/CS_操作系统_04-操作系统原理之进程同步.md.9573cd68.js",revision:null},{url:"assets/CS_操作系统_04-操作系统原理之进程同步.md.9573cd68.lean.js",revision:null},{url:"assets/CS_操作系统_05-操作系统原理之死锁.md.174d0963.js",revision:null},{url:"assets/CS_操作系统_05-操作系统原理之死锁.md.174d0963.lean.js",revision:null},{url:"assets/CS_操作系统_06-操作系统原理之内存管理.md.7319332c.js",revision:null},{url:"assets/CS_操作系统_06-操作系统原理之内存管理.md.7319332c.lean.js",revision:null},{url:"assets/CS_操作系统_07-操作系统原理之文件系统.md.866281dd.js",revision:null},{url:"assets/CS_操作系统_07-操作系统原理之文件系统.md.866281dd.lean.js",revision:null},{url:"assets/CS_操作系统_08-操作系统原理之磁盘调度.md.2c2ad3a0.js",revision:null},{url:"assets/CS_操作系统_08-操作系统原理之磁盘调度.md.2c2ad3a0.lean.js",revision:null},{url:"assets/CS_网络原理_0-开始阅读.md.dffa0a3e.js",revision:null},{url:"assets/CS_网络原理_0-开始阅读.md.dffa0a3e.lean.js",revision:null},{url:"assets/CS_网络原理_00-计算机网络原理之概述.md.9e90ab4e.js",revision:null},{url:"assets/CS_网络原理_00-计算机网络原理之概述.md.9e90ab4e.lean.js",revision:null},{url:"assets/CS_网络原理_01-计算机网络原理之物理层.md.9e4baeb9.js",revision:null},{url:"assets/CS_网络原理_01-计算机网络原理之物理层.md.9e4baeb9.lean.js",revision:null},{url:"assets/CS_网络原理_02-计算机网络原理之数据链路层.md.648cfd44.js",revision:null},{url:"assets/CS_网络原理_02-计算机网络原理之数据链路层.md.648cfd44.lean.js",revision:null},{url:"assets/CS_网络原理_03-计算机网络原理之网络层.md.5adcebed.js",revision:null},{url:"assets/CS_网络原理_03-计算机网络原理之网络层.md.5adcebed.lean.js",revision:null},{url:"assets/CS_网络原理_04-计算机网络原理之传输层.md.0d9454a6.js",revision:null},{url:"assets/CS_网络原理_04-计算机网络原理之传输层.md.0d9454a6.lean.js",revision:null},{url:"assets/CS_网络原理_05-计算机网络原理之应用层.md.5e6299d1.js",revision:null},{url:"assets/CS_网络原理_05-计算机网络原理之应用层.md.5e6299d1.lean.js",revision:null},{url:"assets/DSA_0-开始上手.md.fb6b4621.js",revision:null},{url:"assets/DSA_0-开始上手.md.fb6b4621.lean.js",revision:null},{url:"assets/DSA_数据结构_0-开始阅读.md.babe8b03.js",revision:null},{url:"assets/DSA_数据结构_0-开始阅读.md.babe8b03.lean.js",revision:null},{url:"assets/DSA_数据结构_00-队列.md.8785b219.js",revision:null},{url:"assets/DSA_数据结构_00-队列.md.8785b219.lean.js",revision:null},{url:"assets/index.md.932bfcfb.js",revision:null},{url:"assets/index.md.932bfcfb.lean.js",revision:null},{url:"assets/Interview_0-开始上手.md.af5cdec3.js",revision:null},{url:"assets/Interview_0-开始上手.md.af5cdec3.lean.js",revision:null},{url:"assets/Interview_CS_part01.md.84af0e44.js",revision:null},{url:"assets/Interview_CS_part01.md.84af0e44.lean.js",revision:null},{url:"assets/Interview_CSS_part01.md.826e1555.js",revision:null},{url:"assets/Interview_CSS_part01.md.826e1555.lean.js",revision:null},{url:"assets/Interview_DSA_part01.md.ca7632f7.js",revision:null},{url:"assets/Interview_DSA_part01.md.ca7632f7.lean.js",revision:null},{url:"assets/Interview_HTML_part01.md.bccbb2a7.js",revision:null},{url:"assets/Interview_HTML_part01.md.bccbb2a7.lean.js",revision:null},{url:"assets/Interview_JavaScript_part01.md.0fb2e93e.js",revision:null},{url:"assets/Interview_JavaScript_part01.md.0fb2e93e.lean.js",revision:null},{url:"assets/Interview_Linux_part01.md.fc161697.js",revision:null},{url:"assets/Interview_Linux_part01.md.fc161697.lean.js",revision:null},{url:"assets/Interview_Node_part01.md.f73d676a.js",revision:null},{url:"assets/Interview_Node_part01.md.f73d676a.lean.js",revision:null},{url:"assets/Interview_React_part01.md.71b0edac.js",revision:null},{url:"assets/Interview_React_part01.md.71b0edac.lean.js",revision:null},{url:"assets/Interview_ToolChain_part01.md.689c909b.js",revision:null},{url:"assets/Interview_ToolChain_part01.md.689c909b.lean.js",revision:null},{url:"assets/Interview_TypeScript _part01.md.163b6156.js",revision:null},{url:"assets/Interview_TypeScript _part01.md.163b6156.lean.js",revision:null},{url:"assets/Interview_Vue_part01.md.fba2ea55.js",revision:null},{url:"assets/Interview_Vue_part01.md.fba2ea55.lean.js",revision:null},{url:"assets/Interview_设计模式_part01.md.4cc78b05.js",revision:null},{url:"assets/Interview_设计模式_part01.md.4cc78b05.lean.js",revision:null},{url:"assets/style.2d90f177.css",revision:null},{url:"assets/WEB_0-开始上手.md.21d165f3.js",revision:null},{url:"assets/WEB_0-开始上手.md.21d165f3.lean.js",revision:null},{url:"assets/WEB_01-前端源码研读.md.7360ac82.js",revision:null},{url:"assets/WEB_01-前端源码研读.md.7360ac82.lean.js",revision:null},{url:"assets/WEB_02-浏览器渲染原理.md.d33990e9.js",revision:null},{url:"assets/WEB_02-浏览器渲染原理.md.d33990e9.lean.js",revision:null},{url:"assets/WEB_03-构建组件库.md.379b2b05.js",revision:null},{url:"assets/WEB_03-构建组件库.md.379b2b05.lean.js",revision:null},{url:"assets/WEB_V8档案馆_0-开始阅读.md.99b13314.js",revision:null},{url:"assets/WEB_V8档案馆_0-开始阅读.md.99b13314.lean.js",revision:null},{url:"assets/WEB_V8档案馆_1-关于.md.4de1b92d.js",revision:null},{url:"assets/WEB_V8档案馆_1-关于.md.4de1b92d.lean.js",revision:null},{url:"assets/WEB_V8档案馆_Ignition_V8解释器.md.d09e8133.js",revision:null},{url:"assets/WEB_V8档案馆_Ignition_V8解释器.md.d09e8133.lean.js",revision:null},{url:"assets/WEB_V8档案馆_Ignition_寄存器等值优化.md.41ea6f36.js",revision:null},{url:"assets/WEB_V8档案馆_Ignition_寄存器等值优化.md.41ea6f36.lean.js",revision:null},{url:"assets/WEB_V8档案馆_Ignition_快速启动的V8解释器.md.0f7b4409.js",revision:null},{url:"assets/WEB_V8档案馆_Ignition_快速启动的V8解释器.md.0f7b4409.lean.js",revision:null},{url:"assets/WEB_V8档案馆_Ignition设计文档.md.3296cbd6.js",revision:null},{url:"assets/WEB_V8档案馆_Ignition设计文档.md.3296cbd6.lean.js",revision:null},{url:"assets/WEB_V8档案馆_TurboFan的故事.md.6823d895.js",revision:null},{url:"assets/WEB_V8档案馆_TurboFan的故事.md.6823d895.lean.js",revision:null},{url:"assets/WEB_V8档案馆_V8_连接Ignition与Turbofan.md.58c6cd5f.js",revision:null},{url:"assets/WEB_V8档案馆_V8_连接Ignition与Turbofan.md.58c6cd5f.lean.js",revision:null},{url:"assets/WEB_V8档案馆_V8性能优化杀手.md.ad34b319.js",revision:null},{url:"assets/WEB_V8档案馆_V8性能优化杀手.md.ad34b319.lean.js",revision:null},{url:"assets/WEB_V8档案馆_理解V8的字节码.md.b52583af.js",revision:null},{url:"assets/WEB_V8档案馆_理解V8的字节码.md.b52583af.lean.js",revision:null},{url:"assets/WEB_图解JavaScript_0-开始阅读.md.0f4b2904.js",revision:null},{url:"assets/WEB_图解JavaScript_0-开始阅读.md.0f4b2904.lean.js",revision:null},{url:"assets/WEB_图解JavaScript_00-事件循环和Hoisting.md.5b9c2108.js",revision:null},{url:"assets/WEB_图解JavaScript_00-事件循环和Hoisting.md.5b9c2108.lean.js",revision:null},{url:"assets/WEB_图解JavaScript_01-Scope和JavaScript引擎.md.7b9cd9c6.js",revision:null},{url:"assets/WEB_图解JavaScript_01-Scope和JavaScript引擎.md.7b9cd9c6.lean.js",revision:null},{url:"assets/WEB_图解JavaScript_02-原型继承.md.d3536543.js",revision:null},{url:"assets/WEB_图解JavaScript_02-原型继承.md.d3536543.lean.js",revision:null},{url:"assets/WEB_图解JavaScript_03-生成器和迭代器.md.76b3afa6.js",revision:null},{url:"assets/WEB_图解JavaScript_03-生成器和迭代器.md.76b3afa6.lean.js",revision:null},{url:"assets/WEB_图解JavaScript_04-Promises和Async_Await.md.09440506.js",revision:null},{url:"assets/WEB_图解JavaScript_04-Promises和Async_Await.md.09440506.lean.js",revision:null},{url:"assets/WEB_进击的V8_0-开始阅读.md.ba0cfa1c.js",revision:null},{url:"assets/WEB_进击的V8_0-开始阅读.md.ba0cfa1c.lean.js",revision:null},{url:"assets/WEB_进击的V8_00-深入了解V8.md.62f637d1.js",revision:null},{url:"assets/WEB_进击的V8_00-深入了解V8.md.62f637d1.lean.js",revision:null},{url:"assets/WEB_进击的V8_01-清晰易懂的现代编程语言内存管理.md.a8d9d538.js",revision:null},{url:"assets/WEB_进击的V8_01-清晰易懂的现代编程语言内存管理.md.a8d9d538.lean.js",revision:null},{url:"assets/WEB_进击的V8_02-可视化讲解V8引擎中内存管理.md.7ff6ccb8.js",revision:null},{url:"assets/WEB_进击的V8_02-可视化讲解V8引擎中内存管理.md.7ff6ccb8.lean.js",revision:null},{url:"assets/WEB_进击的V8_03-V8 之旅_Full Compiler.md.5b597d7f.js",revision:null},{url:"assets/WEB_进击的V8_03-V8 之旅_Full Compiler.md.5b597d7f.lean.js",revision:null},{url:"assets/WEB_进击的V8_04-V8 之旅_对象表示.md.ebb7adcc.js",revision:null},{url:"assets/WEB_进击的V8_04-V8 之旅_对象表示.md.ebb7adcc.lean.js",revision:null},{url:"assets/WEB_进击的V8_05-V8 之旅_优化编译器Crankshaft.md.91635ac6.js",revision:null},{url:"assets/WEB_进击的V8_05-V8 之旅_优化编译器Crankshaft.md.91635ac6.lean.js",revision:null},{url:"assets/WEB_进击的V8_06-V8 之旅_垃圾回收器.md.0836e14f.js",revision:null},{url:"assets/WEB_进击的V8_06-V8 之旅_垃圾回收器.md.0836e14f.lean.js",revision:null},{url:"assets/WEB_进击的V8_07-JavaScript工作原理_优化解析效率.md.33cab043.js",revision:null},{url:"assets/WEB_进击的V8_07-JavaScript工作原理_优化解析效率.md.33cab043.lean.js",revision:null},{url:"assets/WEB_进击的V8_08-JavaScript工作原理_V8编译器的优化提效.md.2c960950.js",revision:null},{url:"assets/WEB_进击的V8_08-JavaScript工作原理_V8编译器的优化提效.md.2c960950.lean.js",revision:null},{url:"assets/WEB_进击的V8_7种编译器的核心概念与算法.md.fbb2b144.js",revision:null},{url:"assets/WEB_进击的V8_7种编译器的核心概念与算法.md.fbb2b144.lean.js",revision:null},{url:"assets/关于.md.34c3c62c.js",revision:null},{url:"assets/关于.md.34c3c62c.lean.js",revision:null},{url:"assets/示例.md.b60af52f.js",revision:null},{url:"assets/示例.md.b60af52f.lean.js",revision:null},{url:"browser-internal/assets/player/pdfjs/pdf_worker.js",revision:"8340eae5ed4206855c68f0324ffcee09"},{url:"browser-internal/index.html",revision:"8790e88f802298cfd73e23a62e2e1d41"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"f787b74f5a7f224daf25d23c76054eb3"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
