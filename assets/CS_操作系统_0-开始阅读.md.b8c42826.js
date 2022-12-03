import{_ as l,c as s,d as e,a as t,b as r,o,r as i}from"./app.52d2fe99.js";const C=JSON.parse('{"title":"\u64CD\u4F5C\u7CFB\u7EDF\uFF1A\u5F00\u59CB\u9605\u8BFB","description":"","frontmatter":{},"headers":[],"relativePath":"CS/\u64CD\u4F5C\u7CFB\u7EDF/0-\u5F00\u59CB\u9605\u8BFB.md","lastUpdated":1670043312000}'),h={name:"CS/\u64CD\u4F5C\u7CFB\u7EDF/0-\u5F00\u59CB\u9605\u8BFB.md"},c=t('<h1 id="\u64CD\u4F5C\u7CFB\u7EDF-\u5F00\u59CB\u9605\u8BFB" tabindex="-1">\u64CD\u4F5C\u7CFB\u7EDF\uFF1A\u5F00\u59CB\u9605\u8BFB <a class="header-anchor" href="#\u64CD\u4F5C\u7CFB\u7EDF-\u5F00\u59CB\u9605\u8BFB" aria-hidden="true">#</a></h1><h2 id="\u63CF\u8FF0" tabindex="-1">\u63CF\u8FF0 <a class="header-anchor" href="#\u63CF\u8FF0" aria-hidden="true">#</a></h2><p>\u672C\u8BDD\u9898\u6DB5\u76D6\u4E86\u64CD\u4F5C\u7CFB\u7EDF\u7684\u529F\u80FD\u3001\u8BBE\u8BA1\u548C\u5404\u90E8\u5206\u7684\u6574\u5408\u3002</p><ul><li>\u9996\u5148\u4ECB\u7ECD\u4E86\u4E0E\u64CD\u4F5C\u7CFB\u7EDF\u76F8\u5173\u7684\u6240\u6709\u91CD\u8981\u6982\u5FF5\uFF0C\u5305\u62EC\u8FDB\u7A0B\u63A7\u5236\uFF08process control\uFF09\u3001I/O\u3001\u8D44\u6E90\u5206\u914D\uFF08resource allocation\uFF09\u3001\u6587\u4EF6\u3001\u865A\u62DF\u5185\u5B58\uFF08virtual memory\uFF09\u3001\u5185\u5B58\u3001\u6B7B\u9501\u3001\u8BBF\u95EE\u63A7\u5236\uFF08access control\uFF09\u548C\u4E92\u65A5\uFF08mutual exclusion\uFF09\u3002</li><li>\u7B2C\u4E8C\u9636\u6BB5\u7740\u773C\u4E8E\u8FDB\u7A0B\u7684\u6240\u6709\u65B9\u9762\uFF1A\u72B6\u6001\uFF08state\uFF09\u3001\u5C42\u6B21\uFF08hierachies\uFF09\u3001\u7EBF\u7A0B\u3001\u5185\u5B58\u7BA1\u7406\u3001\u8FDB\u7A0B\u8C03\u5EA6\u3001\u540C\u6B65\uFF08synchronization\uFF09\u3001\u5904\u7406\u5668\u5408\u4F5C\u548C\u4FE1\u53F7\uFF08semaphores\uFF09\u3002</li><li>\u4E0B\u4E00\u9636\u6BB5\u4F4D\u64CD\u4F5C\u7CFB\u7EDF\u8BBE\u8BA1\u4E2D\u51FA\u73B0\u7684\u4E00\u4E9B\u95EE\u9898\uFF0C\u5982\u6B7B\u9501\u3001\u6D3B\u9501\uFF08livelock\uFF09\u3001\u9965\u997F\uFF08starvation\uFF09\u4EE5\u53CA\u9632\u6B62\u6216\u5904\u7406\u8FD9\u4E9B\u95EE\u9898\u7684\u65B9\u6CD5\u3002</li><li>\u7B2C\u56DB\u9636\u6BB5\u5904\u7406\u5185\u5B58\u7BA1\u7406\u548C\u5B58\u50A8\u5206\u914D\uFF0C\u5305\u62EC\u865A\u62DF\u5185\u5B58\u3002</li><li>\u7B2C\u4E94\u9636\u6BB5\u4E3A I/O\uFF0C\u5305\u62EC\u8BBE\u5907\u63A7\u5236\u5668\u3001\u8BBE\u5907\u9A71\u52A8\u7A0B\u5E8F\u3001\u5185\u5B58\u6620\u5C04 I/O\u3001DMA \u548C\u5B57\u7B26 I/O\uFF08character I/O\uFF09\u3002</li></ul><h2 id="\u5173\u952E\u8BCD" tabindex="-1">\u5173\u952E\u8BCD <a class="header-anchor" href="#\u5173\u952E\u8BCD" aria-hidden="true">#</a></h2><p>\u64CD\u4F5C\u7CFB\u7EDF\u3001\u8FDB\u7A0B\u63A7\u5236\u3001I/O\u3001\u8D44\u6E90\u5206\u914D\u3001\u6587\u4EF6\u3001\u865A\u62DF\u5185\u5B58\u3001\u5185\u5B58\u7BA1\u7406\u3001\u5206\u9875\u3001\u5206\u6BB5\u3001\u6B7B\u9501\u3001\u6D3B\u9501\u3001\u9965\u997F\u3001\u8BBF\u95EE\u63A7\u5236\u3001\u4E92\u65A5\u3001\u7EBF\u7A0B\u3001\u8C03\u5EA6\u7B97\u6CD5\u3001\u591A\u7A0B\u5E8F\u8BBE\u8BA1\u3001\u4FE1\u53F7\u91CF\u3001\u8BBE\u5907\u9A71\u52A8\u7A0B\u5E8F\u3001\u8BBE\u5907\u63A7\u5236\u5668\u3001\u5B57\u7B26 I/O\u3002</p><h2 id="linux\u5185\u6838\u539F\u7406" tabindex="-1">Linux \u5185\u6838\u539F\u7406 <a class="header-anchor" href="#linux\u5185\u6838\u539F\u7406" aria-hidden="true">#</a></h2><ul><li><a href="https://github.com/0xAX/linux-insides" target="_blank" rel="noreferrer">0xAX/linux-insides: A little bit about a linux kernel</a></li><li><a href="https://github.com/MintCN/linux-insides-zh" target="_blank" rel="noreferrer">MintCN/linux-insides-zh: Linux \u5185\u6838\u63ED\u79D8</a></li><li><a href="https://github.com/yifengyou/linux-0.12" target="_blank" rel="noreferrer">yifengyou/linux-0.12: \u8D75\u70AF\u8001\u5E08\u300Alinux-0.12 \u5185\u6838\u5B8C\u5168\u5256\u6790\u300B\u8BFB\u4E66\u7B14\u8BB0\u53CA linux-0.12 \u6CE8\u91CA\u6E90\u7801</a></li><li><a href="https://github.com/ljrcore/LearningLinuxKernel" target="_blank" rel="noreferrer">ljrcore/LearningLinuxKernel: \u548C\u6211\u4E00\u8D77\u5B66\u4E60 Linux \u5185\u6838\u5427</a></li><li><a href="https://github.com/sunym1993/flash-linux0.11-talk" target="_blank" rel="noreferrer">sunym1993/flash-linux0.11-talk: \u4F60\u7BA1\u8FD9\u7834\u73A9\u610F\u53EB\u64CD\u4F5C\u7CFB\u7EDF\u6E90\u7801 \u2014 \u50CF\u5C0F\u8BF4\u4E00\u6837\u54C1\u8BFB Linux 0.11 \u6838\u5FC3\u4EE3\u7801</a></li><li><a href="https://github.com/mit-pdos/xv6-riscv" target="_blank" rel="noreferrer">mit-pdos/xv6-riscv: Xv6 for RISC-V</a></li></ul><h2 id="\u8D44\u6E90" tabindex="-1">\u8D44\u6E90 <a class="header-anchor" href="#\u8D44\u6E90" aria-hidden="true">#</a></h2><h3 id="\u89C6\u9891\u8D44\u6E90" tabindex="-1">\u89C6\u9891\u8D44\u6E90 <a class="header-anchor" href="#\u89C6\u9891\u8D44\u6E90" aria-hidden="true">#</a></h3><ul><li>\u6E05\u534E\u5927\u5B66\u64CD\u4F5C\u7CFB\u7EDF\u539F\u7406\u8BFE\u7A0B</li></ul>',11),d=r("ul",null,[r("li",null,"Linux \u64CD\u4F5C\u7CFB\u7EDF\uFF08\u53CC\u8BED\uFF09")],-1),u=r("ul",null,[r("li",null,"\u9EBB\u7701\u7406\u5DE5\u5927\u5B66\uFF1A\u5206\u5E03\u5F0F\u64CD\u4F5C\u7CFB\u7EDF\u539F\u7406")],-1),p=t('<h3 id="\u4E66\u7C4D\u8D44\u6E90" tabindex="-1">\u4E66\u7C4D\u8D44\u6E90 <a class="header-anchor" href="#\u4E66\u7C4D\u8D44\u6E90" aria-hidden="true">#</a></h3><ul><li><a href="https://ox.jonsam.site/book/e7b697/" target="_blank" rel="noreferrer">\u73B0\u4EE3\u64CD\u4F5C\u7CFB\u7EDF\uFF08\u7B2C\u4E09\u7248\uFF09\u4E2D\u6587\u7248 | \u6C27\u6C14\u7A7A\u95F4</a></li><li><a href="https://ox.jonsam.site/book/0e2c74/" target="_blank" rel="noreferrer">Linux \u7CFB\u7EDF\u7BA1\u7406\u6280\u672F\u624B\u518C (\u7B2C\u4E8C\u7248) | \u6C27\u6C14\u7A7A\u95F4</a></li><li><a href="https://ox.jonsam.site/book/177a42/" target="_blank" rel="noreferrer">Linux \u5185\u6838\u7CBE\u9AD3\uFF1A\u7CBE\u901A Linux \u5185\u6838\u5FC5\u4F1A\u7684 75 \u4E2A\u7EDD\u6280 | \u6C27\u6C14\u7A7A\u95F4</a></li><li><a href="https://ox.jonsam.site/book/410dc4/" target="_blank" rel="noreferrer">\u9E1F\u54E5\u7684 Linux \u79C1\u623F\u83DC - \u57FA\u7840\u5B66\u4E60\u7BC7 (\u7B2C\u56DB\u7248) | \u6C27\u6C14\u7A7A\u95F4</a></li><li><a href="https://ox.jonsam.site/book/567c84/" target="_blank" rel="noreferrer">Linux:Unix \u8BBE\u8BA1\u601D\u60F3 | \u6C27\u6C14\u7A7A\u95F4</a></li><li><a href="https://ox.jonsam.site/book/a248d6/" target="_blank" rel="noreferrer">Linux \u5185\u6838\u8BBE\u8BA1\u4E0E\u5B9E\u73B0 | \u6C27\u6C14\u7A7A\u95F4</a></li></ul><h3 id="operating-system-principles-and-implementation" tabindex="-1">Operating System Principles And Implementation <a class="header-anchor" href="#operating-system-principles-and-implementation" aria-hidden="true">#</a></h3><p>\u3010\u4E2D\u56FD\u79D1\u5B66\u6280\u672F\u5927\u5B66\u3011\u3010\u9648\u9999\u5170\u3011\u64CD\u4F5C\u7CFB\u7EDF\u539F\u7406\u4E0E\u5B9E\u73B0\uFF1A</p>',4),_=t('<ul><li>\u5B98\u7F51\uFF1A<a href="http://staff.ustc.edu.cn/~xlanchen/OperatingSystemConcepts2019Spring/OperatingSystem2019Spring.htm" target="_blank" rel="noreferrer">OperatingSystemPrinciplesAndImplementationFall2016</a></li><li>PPT: <a href="https://github.com/jonsam-ng/100-day-of-js-enhance/blob/master/docs/public/%E9%99%88%E9%A6%99%E5%85%B0-%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E7%8E%B0/1_introduction_CS.pdf" target="_blank" rel="noreferrer">100-day-of-js-enhance/1_introduction_CS.pdf</a></li></ul><h2 id="\u6269\u5C55" tabindex="-1">\u6269\u5C55 <a class="header-anchor" href="#\u6269\u5C55" aria-hidden="true">#</a></h2><h2 id="\u53C2\u8003" tabindex="-1">\u53C2\u8003 <a class="header-anchor" href="#\u53C2\u8003" aria-hidden="true">#</a></h2><ul><li><a href="https://www.geeksforgeeks.org/operating-systems/?ref=lbp" target="_blank" rel="noreferrer">Operating Systems - GeeksforGeeks</a></li><li><a href="https://nptel.ac.in/courses/106108101" target="_blank" rel="noreferrer">NPTEL</a></li><li><a href="https://www.includehelp.com/operating-systems/" target="_blank" rel="noreferrer">Operating Systems Tutorial, Articles - IncludeHelp</a></li><li><a href="https://www.javatpoint.com/os-tutorial" target="_blank" rel="noreferrer">Learn Operating System (OS) Tutorial - javatpoint</a></li><li><a href="https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/" target="_blank" rel="noreferrer">Operating Systems: Course Notes Main Page</a></li><li><a href="https://www.gatevidyalay.com/operating-system/" target="_blank" rel="noreferrer">Operating System Notes | Gate Vidyalay</a></li><li><a href="https://www.youtube.com/channel/UC3GFmxeJmhRfK0hyWLIqsPg" target="_blank" rel="noreferrer">TechGuiders - YouTube</a></li><li><a href="http://gauss.ececs.uc.edu/Courses/c4029/" target="_blank" rel="noreferrer">Operating Systems Home</a></li><li><a href="http://gauss.ececs.uc.edu/Courses/c4029/code/" target="_blank" rel="noreferrer">Index of /Courses/c4029/code</a></li><li><a href="http://staff.ustc.edu.cn/~xlanchen/OperatingSystemConcepts2019Spring/OperatingSystem2019Spring.htm" target="_blank" rel="noreferrer">OperatingSystemPrinciplesAndImplementationFall2016</a></li><li><a href="https://educatech.in/category/os/page/3/" target="_blank" rel="noreferrer">OS Archives - Page 3 of 14 - Educate</a></li></ul>',4);function f(g,m,b,x,k,y){const a=i("Bilibili"),n=i("Pdf");return o(),s("div",null,[c,e(a,{id:"BV1uW411f72n"}),d,e(a,{id:"BV1bf4y147PZ"}),u,e(a,{id:"av45207204"}),p,e(n,{src:"/\u9648\u9999\u5170-\u64CD\u4F5C\u7CFB\u7EDF\u539F\u7406\u4E0E\u5B9E\u73B0/1_introduction_CS.pdf"}),_])}const O=l(h,[["render",f]]);export{C as __pageData,O as default};
