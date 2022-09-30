import{_ as h,c as l,b as a,w as _,a as m,d as e,e as t,r as n,o as p}from"./app.bf206fd3.js";const M=JSON.parse('{"title":"\u793A\u4F8B","description":"","frontmatter":{},"headers":[],"relativePath":"\u793A\u4F8B.md","lastUpdated":1664530177000}'),u={name:"\u793A\u4F8B.md"},f=m("",4),b=e("ul",null,[e("li",null,"\u5FBD\u6807\u7EC4")],-1),x=e("h3",{id:"pdf-\u9605\u8BFB",tabindex:"-1"},[t("PDF \u9605\u8BFB "),e("a",{class:"header-anchor",href:"#pdf-\u9605\u8BFB","aria-hidden":"true"},"#")],-1),v=e("h3",{id:"video-\u64AD\u653E",tabindex:"-1"},[t("Video \u64AD\u653E "),e("a",{class:"header-anchor",href:"#video-\u64AD\u653E","aria-hidden":"true"},"#")],-1),g=e("p",null,[e("video",{src:"https://static.smartisanos.cn/common/video/smartisan-tnt-jianguo.mp4",class:"h5-video","data-media":"",controls:""},[t(" Your browser does not support playing HTML5 video. You can "),e("a",{href:"https://static.smartisanos.cn/common/video/smartisan-tnt-jianguo.mp4",download:""},"download the file"),t(" instead. Here is a description of the content: video ")])],-1),w=e("h3",{id:"runcode-\u8FD0\u884C\u4EE3\u7801",tabindex:"-1"},[t("RunCode \u8FD0\u884C\u4EE3\u7801 "),e("a",{class:"header-anchor",href:"#runcode-\u8FD0\u884C\u4EE3\u7801","aria-hidden":"true"},"#")],-1),V=e("pre",null,`var name = 'global';
var obj = {
    name: 'local',
    foo: function(){
        this.name = 'foo';
    }.bind(window)
};
var bar = new obj.foo();
setTimeout(function() {
    console.log(window.name);
}, 0);
console.log(bar.name);
  
var bar3 = bar2 = bar;
bar2.name = 'foo2';
console.log(bar3.name);
`,-1),T=e("h3",{id:"xmind-\u9884\u89C8",tabindex:"-1"},[t("XMind \u9884\u89C8 "),e("a",{class:"header-anchor",href:"#xmind-\u9884\u89C8","aria-hidden":"true"},"#")],-1);function B(P,y,C,S,j,N){const o=n("Badge"),d=n("Badges"),s=n("Pdf"),i=n("VideoPlayer"),r=n("RunCode"),c=n("XMindViewer");return p(),l("div",null,[f,a(o,{type:"tip",text:"\u5FBD\u6807"}),a(o,{type:"tip",text:"\u4E0A\u5FBD\u6807",vertical:"top"}),a(o,{type:"tip",text:"\u4E0B\u5FBD\u6807",vertical:"bottom"}),b,a(d,{content:[{text:"Vue"},{text:"React"},{text:"SolidJS"}]}),x,a(s,{src:"/\u97E9\u7ACB\u521A\u8BA1\u7B97\u673A\u7F51\u7EDC/\u7B2C01\u7AE0 \u4ECB\u7ECD\u8BA1\u7B97\u673A\u7F51\u7EDC.pdf"}),v,a(i,{src:"https://static.smartisanos.cn/common/video/smartisan-tnt-jianguo.mp4"}),g,w,a(r,{type:"js"},{default:_(()=>[V]),_:1}),T,a(c,{src:"/mind/vue\u6E90\u7801\u6D41\u7A0B.xmind"})])}const $=h(u,[["render",B]]);export{M as __pageData,$ as default};
