import{_ as h,c as o,b as t,w as r,d as e,e as n,a as l,r as a,o as u}from"./app.bd0aef6f.js";const g=JSON.parse('{"title":"\u961F\u5217","description":"","frontmatter":{},"headers":[],"relativePath":"DSA/\u6570\u636E\u7ED3\u6784/00-\u961F\u5217.md","lastUpdated":1665305320000}'),_={name:"DSA/\u6570\u636E\u7ED3\u6784/00-\u961F\u5217.md"},c=e("h1",{id:"\u961F\u5217",tabindex:"-1"},[n("\u961F\u5217 "),e("a",{class:"header-anchor",href:"#\u961F\u5217","aria-hidden":"true"},"#")],-1),d=e("h2",{id:"mindmap",tabindex:"-1"},[n("MindMap "),e("a",{class:"header-anchor",href:"#mindmap","aria-hidden":"true"},"#")],-1),m=e("h2",{id:"\u666E\u901A\u961F\u5217\uFF08\u6570\u7EC4\u5B9E\u73B0\uFF09",tabindex:"-1"},[n("\u666E\u901A\u961F\u5217\uFF08\u6570\u7EC4\u5B9E\u73B0\uFF09 "),e("a",{class:"header-anchor",href:"#\u666E\u901A\u961F\u5217\uFF08\u6570\u7EC4\u5B9E\u73B0\uFF09","aria-hidden":"true"},"#")],-1),p=e("pre",null,`class Queue {
 constructor(elements) {
  this.fromArray(Array.isArray(elements) ? elements : []);
 }

 enqueue(ele) {
  this._elements.push(ele);
  return this;
 }

 dequeue() {
  const front = this.front();
  if (!front) return front;
  this._offset += 1;
  if (this._offset * 2 > this._elements.length) {
   this._elements = this.toArray();
   this._offset = 0;
  }
  return front;
 }

 front() {
  return this.isEmpty() ? null : this._elements[this._offset];
 }

 rear() {
  return this.isEmpty() ? null : this._elements[this._elements.length - 1];
 }

 size() {
  return this._elements.length - this._offset;
 }

 isEmpty() {
  return this.size() === 0;
 }

 toArray() {
  return this._elements.slice(this._offset);
 }

 fromArray(elements) {
  this._elements = elements;
  this._offset = 0;
  return this;
 }

 clone() {
  return new Queue(this.toArray());
 }

 clear() {
  this._elements = [];
  this._offset = 0;
 }
}

const q = new Queue([1, 2, 3]);
q.enqueue(4);
q.dequeue();
console.log("==>", {
 q: q.toArray(),
 f: q.front(),
 r: q.rear(),
 s: q.size(),
 isEmpty: q.isEmpty(),
 _e: q._elements,
});
`,-1),f=e("h2",{id:"\u4F7F\u7528-push-\u548C-shift-\u7684\u6570\u7EC4\u5B9E\u73B0",tabindex:"-1"},[n("\u4F7F\u7528 push \u548C shift \u7684\u6570\u7EC4\u5B9E\u73B0 "),e("a",{class:"header-anchor",href:"#\u4F7F\u7528-push-\u548C-shift-\u7684\u6570\u7EC4\u5B9E\u73B0","aria-hidden":"true"},"#")],-1),q=e("pre",null,`class SimpleQueue {
 constructor(elements) {
  this._elements = Array.isArray(elements) ? elements : [];
 }

 enqueue(ele) {
  this._elements.push(ele);
  return this;
 }

 dequeue() {
  return this._elements.shift();
 }

 front() {
  return this.isEmpty() ? null : this._elements[0];
 }

 rear() {
  return this.isEmpty() ? null : this._elements[this._elements.length - 1];
 }

 size() {
  return this._elements.length;
 }

 isEmpty() {
  return this.size() === 0;
 }

 toArray() {
  return this._elements;
 }

 clone() {
  return new SimpleQueue(this.toArray());
 }

 clear() {
  this._elements = [];
 }
}

const q = new SimpleQueue([1, 2, 3]);
q.enqueue(4);
q.dequeue();
console.log("==>", {
 q: q.toArray(),
 f: q.front(),
 r: q.rear(),
 s: q.size(),
 isEmpty: q.isEmpty(),
 _e: q._elements,
});
`,-1),y=l('<h2 id="javascript-\u6570\u7EC4\u7684\u5E95\u5C42\u539F\u7406" tabindex="-1">JavaScript \u6570\u7EC4\u7684\u5E95\u5C42\u539F\u7406 <a class="header-anchor" href="#javascript-\u6570\u7EC4\u7684\u5E95\u5C42\u539F\u7406" aria-hidden="true">#</a></h2><p>\u4F20\u7EDF\u610F\u4E49\u4E0A\u7684\u6570\u7EC4\u6709 3 \u4E2A\u91CD\u8981\u6982\u5FF5\uFF1A\u8FDE\u7EED\u5185\u5B58\u3001\u56FA\u5B9A\u957F\u5EA6\u3001\u76F8\u540C\u7684\u6570\u636E\u7C7B\u578B\uFF0C\u53C2\u7167 Java\u3001CPP \u4E2D\u7684\u6570\u7EC4\u3002\u5B9E\u9645\u4E0A JavaScript \u7684\u6570\u7EC4\u5E76\u4E0D\u7B26\u5408\u4E0A\u8FF0\u7684\u6982\u5FF5\u3002\u56E0\u6B64\uFF0CJavaScript \u7684 \u201C\u6570\u7EC4\u201D \u672C\u8D28\u4E0A\u5E76\u4E0D\u662F\u6570\u7EC4\u3002\u4E8B\u5B9E\u4E0A JSArray \u7EE7\u627F\u81EA JSObject\uFF0C\u4E5F\u5C31\u662F\u8BF4\uFF0C\u6570\u7EC4\u662F\u4E00\u4E2A\u7279\u6B8A\u7684\u5BF9\u8C61\u3002\u6570\u7EC4\u5185\u90E8\u662F\u7531\u5FEB\u6570\u7EC4\uFF08FixedArray\uFF09\u548C\u6162\u6570\u7EC4\uFF08HashTable\uFF09\u6765\u5B9E\u73B0\u7684\uFF0C\u5FEB\u6570\u7EC4\u4E2D\u6709\u52A8\u6001\u6570\u7EC4\u7684\u6269\u5BB9\u548C\u6536\u7F29\u673A\u5236\uFF0C\u5F53\u6570\u7EC4\u4E2D holes\uFF08\u7A7A\u6D1E\uFF09 \u5BF9\u8C61\u8FC7\u591A\u65F6\uFF0C\u5C31\u4F1A\u5C06\u5FEB\u6570\u7EC4\u8F6C\u6362\u4E3A\u6162\u6570\u7EC4\u3002\u6162\u6570\u7EC4\u662F\u4E00\u79CD\u54C8\u5E0C\u8868\u7684\u5185\u5B58\u5F62\u5F0F\uFF0C\u7531\u4E8E\u5185\u5B58\u662F\u975E\u8FDE\u7EED\u7684\uFF0C\u5176\u6548\u7387\u4F1A\u6BD4\u5FEB\u6570\u7EC4\u4F4E\u3002</p><p>JavaScript \u7684\u6570\u7EC4\u662F V8 \u5728\u5E95\u5C42\u5B9E\u73B0\u4E0A\u505A\u4E86\u4E00\u5C42\u5C01\u88C5\uFF0C\u4F7F\u7528\u4E24\u79CD\u6570\u636E\u7ED3\u6784\u5B9E\u73B0\u6570\u7EC4\uFF0C\u901A\u8FC7\u65F6\u95F4\u548C\u7A7A\u95F4\u7EAC\u5EA6\u7684\u53D6\u820D\uFF0C\u4F18\u5316\u6570\u7EC4\u7684\u6027\u80FD\u3002</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>\u7531\u4E8E JavaScript \u4E2D\u7684\u6570\u636E\u7ED3\u6784\u5927\u591A\u5728 V8 \u5F15\u64CE\u4E2D\u505A\u4E86\u8FDB\u4E00\u6B65\u7684\u5C01\u88C5\uFF0C\u56E0\u6B64\u5728\u5B9E\u73B0\u90E8\u5206\u6570\u636E\u7ED3\u6784\u65F6\uFF0CJavaScript \u5F80\u5F80\u6709\u66F4\u4E3A\u7B80\u5355\u7684\u5B9E\u73B0\u65B9\u6CD5\u3002</p></div><p>\u53C2\u8003\uFF1A</p><ul><li><a href="https://juejin.cn/post/6844903943638794248" target="_blank" rel="noreferrer">\u63A2\u7A76 JS V8 \u5F15\u64CE\u4E0B\u7684 \u201C\u6570\u7EC4\u201D \u5E95\u5C42\u5B9E\u73B0</a></li><li><a href="https://zhuanlan.zhihu.com/p/26388217" target="_blank" rel="noreferrer">\u4ECE Chrome \u6E90\u7801\u770B JS Array \u7684\u5B9E\u73B0</a></li></ul><h2 id="\u4F18\u5148\u7EA7\u961F\u5217" tabindex="-1">\u4F18\u5148\u7EA7\u961F\u5217 <a class="header-anchor" href="#\u4F18\u5148\u7EA7\u961F\u5217" aria-hidden="true">#</a></h2>',7);function A(S,v,b,x,E,J){const i=a("XMindViewer"),s=a("RunCode");return u(),o("div",null,[c,d,t(i,{src:"/mind/\u6570\u636E\u7ED3\u6784\u4E4B\u961F\u5217.xmind"}),m,t(s,{type:"js"},{default:r(()=>[p]),_:1}),f,t(s,{type:"js"},{default:r(()=>[q]),_:1}),y])}const T=h(_,[["render",A]]);export{g as __pageData,T as default};
