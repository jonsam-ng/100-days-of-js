import{_ as h,c as o,b as t,w as r,d as e,e as n,a as l,r as a,o as u}from"./app.dc06ddf5.js";const g=JSON.parse('{"title":"\u961F\u5217","description":"","frontmatter":{},"headers":[],"relativePath":"DSA/\u6570\u636E\u7ED3\u6784/00-\u961F\u5217.md","lastUpdated":1664378243000}'),_={name:"DSA/\u6570\u636E\u7ED3\u6784/00-\u961F\u5217.md"},c=e("h1",{id:"\u961F\u5217",tabindex:"-1"},[n("\u961F\u5217 "),e("a",{class:"header-anchor",href:"#\u961F\u5217","aria-hidden":"true"},"#")],-1),d=e("h2",{id:"mindmap",tabindex:"-1"},[n("MindMap "),e("a",{class:"header-anchor",href:"#mindmap","aria-hidden":"true"},"#")],-1),m=e("h2",{id:"\u666E\u901A\u961F\u5217\uFF08\u6570\u7EC4\u5B9E\u73B0\uFF09",tabindex:"-1"},[n("\u666E\u901A\u961F\u5217\uFF08\u6570\u7EC4\u5B9E\u73B0\uFF09 "),e("a",{class:"header-anchor",href:"#\u666E\u901A\u961F\u5217\uFF08\u6570\u7EC4\u5B9E\u73B0\uFF09","aria-hidden":"true"},"#")],-1),p=e("pre",null,`class Queue {
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
`,-1),y=l("",7);function A(S,v,b,x,E,J){const i=a("XMindViewer"),s=a("RunCode");return u(),o("div",null,[c,d,t(i,{src:"/mind/\u6570\u636E\u7ED3\u6784\u4E4B\u961F\u5217.xmind"}),m,t(s,{type:"js"},{default:r(()=>[p]),_:1}),f,t(s,{type:"js"},{default:r(()=>[q]),_:1}),y])}const T=h(_,[["render",A]]);export{g as __pageData,T as default};
