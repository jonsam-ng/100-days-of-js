# 第一部分

## async await 是什么？它有哪些作用？

::: info 扩展问题

- 你怎么看”回调地狱“问题？怎么解决？为什么？
- async await 有哪些优点和缺陷？
- await/async 的原理是什么？
:::

async await 是es7里面的新语法，它的作用就是 async 用于声明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。它可以很好的替代 promise 中的 then。

async 函数返回一个 Promise 对象，可以使用 then 方法添加回调函数。当函数执行的时候，一旦遇到 await 就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。

::: tip
async 和 await 对于解决”回调地狱“问题十分有效，其本质是 Promise 的语法糖。但是其本身也存在一些问题，一种就是 `await` 和 `async` 的连续传播问题，原因是 `await` 只能用在 `async` 函数中；另外一种就是顶层 `await` 问题（破坏了前述的规则），这种问题目前已经被解决，参见[javascript - How can I use async/await at the top level? - Stack Overflow](https://stackoverflow.com/questions/46515764/how-can-i-use-async-await-at-the-top-level)。

> The await operator is used to wait for a Promise and get its fulfillment value. It can only be used inside an async function or **at the top level of a module**.参见[await - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#top_level_await)。

另外需要注意的是，async/await 并不是用来替代 Promise的。请注意，只在适当的场合使用它，因为它会阻塞函数中其余部分代码的执行，使函数的执行效果变为类似于同步执行。对 async/await 的过分依赖（源于async/await的传播性）会牺牲掉 Promise 异步的特性，是程序丢失掉异步的高效，降低程序的执行效率。最为需要注意的一个问题便是，不该 `await` 的方法就不要 `await`。
:::

::: tip await/async 的原理
`async/await` 最鲜明的特点就是：在 `async` 函数中，`await` 使得函数有了”暂停“和”继续“的意味。这恰恰是生成器的特点，只是生成器要更加的强大。`async/await` 为什么会有这样的特点呢？其原理还是 Promise。

在 `async` 函数中，主线程在遇到 `await` 之后，会将 `await` 的任务和该函数中剩余的部分包装为一个 Promise，并将这个 Promise 推入到微任务队列中，然后主线程就从该 `async` 函数中返回了，继续执行剩余的代码。当程序堆栈为空时（主线程空闲），主线程会从微任务队列中取出前述的 Promise 任务进行执行（前提是该 Promise 不是 pending状态，即 `await` 的任务已经完成，否则就推迟到下一次主线程回调）。由此可见 `await` 之前的代码的执行行为是正常的，而后续的执行其实是 Promise 的再包装，`async/await` 实际上是 Promise 的语法糖。详见[图解JavaScript之Promises和Async/Await](/WEB/%E5%9B%BE%E8%A7%A3JavaScript/04-Promises%E5%92%8CAsync&Await#async-await)。

Promise 才应该是主角。”回调地狱“固然是问题，但是这不应该是”回调“的锅。”回调“在很大程度上提升了JavaScript的生产力，同时也是函数式编程一大利器。我们应该充分发挥 Promise 的效率，利用好事件循环和微任务，在这个方面，`single-spa` 给我们提供了很好的范例，参见[微前端基础与 single-spa 初探](https://source.jonsam.site/slides/#/3)。
:::

## 怎么配置使用async/await？

`async/await` 是ES7标准中的新特性。如果是使用React官方的脚手架（Create React App）创建的项目，就可以直接使用。如果是在自己搭建的webpack配置的项目中使用，可能会遇到 `regeneratorRuntime is not defined` 的异常错误。那么我们就需要引入babel，并在babel中配置使用 `async/await`。可以利用babel的 `@babel/transform-runtime` 插件来转换其成为浏览器支持的语法，虽然没有性能的提升，但对于代码编写体验要更好。

配置过程（支持Babel 7）：

安装依赖：

```bash
npm install --save @babel/runtime 
npm install --save-dev @babel/plugin-transform-runtime
```

配置 `.babelrc` 文件：

```js
{
    "presets": ["@babel/preset-env"],
    "plugins": [
        ["@babel/transform-runtime"]
    ]
}
```

参考：

- [[Solved] Babel ReferenceError: regeneratorRuntime is not defined](https://exerror.com/babel-referenceerror-regeneratorruntime-is-not-defined/)。

## 常用的数组方法有哪些？

::: info 扩展问题

- JavaScript中数组是什么原理？
- JavaScript中的数组为什么能够自动扩容？具体是怎么自动扩容的？
- JavaScript中的数组是以怎样的数据结构储存的？
- 怎么样提升数组的存取效率？为什么？
- JavaScript中的数组是如何存取的？
- 聊一聊你对JavaScript的数组的理解，它的高效体现在哪？有哪些缺陷？
- JavaScript数组中某个数组方法的原理是什么？
:::

常用的数组方法，略。参见：[Array - JavaScript | MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array#%E6%8F%8F%E8%BF%B0)。

::: tip JavaScript中数组的原理
JavaScript中的数组和编译型语言，如Java、C++中的数组完全不是同一个概念。JavaScript中的数组是一个及其复杂的数据结构，其本质是Object。如下：

```js
Array.prototype.__proto__ === Object.prototype // true
```

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.396b9fg46vw0.webp)

数组在 V8 中是 `FixedArray`，数组元素称之为 `element`。在 `Object` 中，对象的属性必须是 String，如果不是 String 需要转化为 String。Number 和 Symbol 在作为属性时便是如此。由此，如果属性是可以转成数组的，如数字 1 或者字符 `1`，则存为 Element，否则就存为 Property。Properties 以非连续内存储存，因此不可以下标取值；Elements 以连续内存储存，因此可以下标取值。另外 Elements 有 length 属性。因此，Array 的本质是 Object，同时 Array 继承（原型链继承不同于传统继承，此处指的是Object在 Array 原型链的上游）自 Object。

Array 的数据结构：

我们可能注意到了JavaScript中的Array和传统Array相比具有如下神奇的特性：

- 不需要初始化长度，数组具有动态扩容机制。
- 不需要限定元素类型，数组元素支持动态类型。

大家可能会觉得这是动态语言的特征，但是其背后的原理是什么呢？

JavaScript的数组分为快数组和慢数组，其中快数组是具有动态扩容机制的真正的数组，其内存是连续存储的，访问速度较快；慢数组则是 HashMap，这对于稀疏数组比较有效，节省了存储空间，但是牺牲了访问速度。在 Array 中，未填充值的元素称之为 Hole（空洞），打印出来往往是 `empty`（注意，不是指 `undefined`）。很显然，如果 Array 较为稀疏，即 Hole 比较多，使用慢数组比较有效率，毕竟内存代价也是比较昂贵的；反之，当 Array 较为紧密时，即 Hole 比较少，使用快速组则能够充分发挥数组快速访问的特性。V8 中很好的平衡了数组中空间和时间占用的开销，帮助我们自动的进行快慢数组的切换。

注意，快慢数组的切换是有一定复制元素的成本的，因此，我们应该减少这种情况频繁地发生。

快数组是如何存取的？快数组可以通过下标快速存取。

慢数组是如何存取的？慢数组中的哈希表是通过数组模拟的。在存值时，首先key值经过哈希处理和一定的变换机制（取低两位）找到该元素的起始存放位置，如果该位置是空的，则直接存放在该位置，如果该位置已经被占用，则继续向后寻找，直到找到一个空位置进行存储；在取值时，同样方法找到该元素的起始查找位置，匹配 key 值并且不断向后查找，直至找到该元素。
:::

## 什么是原型链？

::: info 扩展问题

- 原型链的原理是什么？
- 为什么使用原型链？有什么好处？
- 原型链继承和经典继承有什么不同？
:::

每一个实例对象上有一个 `__proto__` 属性，指向构造函数的原型对象，构造函数的原型对象（prototype）也是一个对象， 也有 `__proto__` 属性，这样一层一层往上找的过程就形成了原型链。

::: tip 原型链的历史渊源和原理
早些年间浏览器只能浏览网页内容，而不能进行用户交互，交互主要靠服务器，因此给服务器造成了过载。JavaScript和DOM/BOM的出现就是为了解决**浏览器交互性**问题而生的。

JavaScript的设计思想收到了当时流行的Java的影响，采用了**对象和继承的机制**（这对于CPP来说也是比较友好的），但是重新设计了继承机制。这种继承机制的灵感来源于Java 和 JS 两者都有**构造函数**的共同点，**构造函数即为实例对象的构造对象**。

这其中存在的问题就是实例对象间**无法共享公共属性**，因此要设计一个对象专门用来**存储对象共享的属性**，即为**原型对象**。原型继承机制给构造函数增加`prototype`属性以指向原型对象，把**所有实例对象共享的属性和方法**都放在原型对象中，**不需要共享的属性和方法放在构造函数中**。实例对象通过构造函数创建时，其`__proto__`属性就会指向原型对象。这种通过原型建立起来的属性和方法的继承关系即为原型链。

实例对象通过原型链继承其上游的原型对象的属性和方法。实例对象的属性被应用时，先从实例对象自身查找该属性，如果无法找到，就依原型继承关系向原型链上游查找，找到原型链的尽头 —— `Object.prototype.__proto__===null`。

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/oxygen-space/image.3slsu8co0mo0.webp)

其中：`Foo` 为构造对象，`Foo.prototype` 为 `Foo` 的原型对象，`b` 和 `c` 为 `Foo` 的实例对象。原型关系如下：

```js
b.__proto__ === c.__proto__ === Foo.prototype
Foo.__proto__ === Function.prototype
Foo.prototype.__proto__ === Object.prototype
Function.__proto__ === Object.prototype
Object.__proto__ === null
```

其规律为：`继承者.__proto__===被继承者.prototype`。参见：[图解JavaScript之原型继承](/WEB/%E5%9B%BE%E8%A7%A3JavaScript/02-%E5%8E%9F%E5%9E%8B%E7%BB%A7%E6%89%BF#%E4%B8%89%E7%A7%8D%E4%B8%8D%E5%90%8C%E7%B1%BB%E5%9E%8B%E7%9A%84%E5%8E%9F%E5%9E%8B%E7%BB%A7%E6%89%BF)
:::

::: tip 原型链查找的效率问题
了解原型继承和属性查找的工作方式对开发者来说很重要，但也是必不可少的，因为它对JavaScript的性能影响很重要。正如V8的文档中提到的，大多数JavaScript引擎使用类似字典的数据结构来存储对象属性。因此，每个属性的访问都需要在该数据结构中进行动态查找该属性。这种方法使得在JavaScript中访问属性通常比访问Java和Smalltalk等编程语言中的实例变量慢得多。参见[Javascript Prototype & Scope Chains: What You Need to Know](https://www.toptal.com/javascript/javascript-prototypes-scopes-and-performance-what-you-need-to-know)。

但是也不必太担心，因为在大多数情况下，在实例对象上可以命中属性。即使需要查找原型链，其速度也不会对程序的性能造成显著的影响。

参见：

- [oop - Why use chained prototype inheritance in javascript?](https://stackoverflow.com/questions/7294276/why-use-chained-prototype-inheritance-in-javascript)
:::

参考：

JavaScript为什么使用原型链？相比于CBP（class-based programming）实现的OOP，prototype-based programming（PBP）有什么优势和缺陷？

- [Why JavaScript is an OOP Language (Even Though It Doesn’t Have Classes)](https://medium.com/background-thread/why-javascript-is-an-oop-language-even-though-it-doesnt-have-classes-92a4e202176f)

经典继承与原型继承的区别？

- [经典继承与原型继承](/WEB/%E5%9B%BE%E8%A7%A3JavaScript/02-%E5%8E%9F%E5%9E%8B%E7%BB%A7%E6%89%BF#%E7%BB%8F%E5%85%B8%E7%BB%A7%E6%89%BF%E4%B8%8E%E5%8E%9F%E5%9E%8B%E7%BB%A7%E6%89%BF)

关于原型链的一些有趣的问题：

- [javascript - Why is prototype function 40x slower than the default declared function? - Stack Overflow](https://stackoverflow.com/questions/9528087/why-is-prototype-function-40x-slower-than-the-default-declared-function)
- [javascript - Defining methods via prototype vs using this in the constructor - really a performance difference? - Stack Overflow](https://stackoverflow.com/questions/12180790/defining-methods-via-prototype-vs-using-this-in-the-constructor-really-a-perfo)

## 什么是闭包？手写一个闭包函数？闭包有哪些优缺点？

::: info 扩展问题

- 闭包的原理是什么？
- 你对闭包有什么理解？
- 你所知道闭包有哪些应用？
:::

闭包（closure）指有权访问另一个函数作用域中变量的函数。简单理解就是 ，一个作用域可以访问另外一个函数内部的局部变量。例如：

```js
function fn() {
  var num = 10
  function fun() {
    console.log(num)
  }
  return fun
}
var f = fn()
f()
```

特点：从内部函数访问外部函数的作用域；容易造成内层泄露，因为闭包中的局部变量永远不会被回收。

::: info 闭包
[闭包](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)（closure）是一个函数以及其捆绑的周边环境状态（lexical environment，词法环境）的引用的组合。换而言之，闭包让开发者可以从内部函数访问外部函数的作用域。在 JavaScript 中，闭包会随着函数的创建而被同时创建。

性能考量：

如果不是某些特定任务需要使用闭包，在其它函数中创建函数是不明智的，因为**闭包在处理速度和内存消耗方面对脚本性能具有负面影响**。

例如，在创建新的对象或者类时，方法通常应该关联于对象的原型，而不是定义到对象的构造器中。原因是这将导致每次构造器被调用时，方法都会被重新赋值一次（也就是说，对于每个对象的创建，方法都会被重新赋值）。
:::

::: tip 闭包的应用场景

- [用闭包模拟私有方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures#%E7%94%A8%E9%97%AD%E5%8C%85%E6%A8%A1%E6%8B%9F%E7%A7%81%E6%9C%89%E6%96%B9%E6%B3%95)：如常用的防抖和节流函数。
- 利用闭包编写组件。React 中的函数式组件（FC）正是利用了闭包”共享作用域“的特性。组件的状态（State和Context）和属性（Props）是通过闭包分发的。React在渲染组件时执行闭包，保证了组件中的状态和行为不会被泄露和污染。当然，应用中大量的组件也会带来一定的性能负担。参见[基于属性和状态的单向数据流的模型](https://source.jonsam.site/react/tour/dr-1/#%E5%9F%BA%E4%BA%8E%E5%B1%9E%E6%80%A7%E5%92%8C%E7%8A%B6%E6%80%81%E7%9A%84%E5%8D%95%E5%90%91%E6%95%B0%E6%8D%AE%E6%B5%81%E7%9A%84%E6%A8%A1%E5%9E%8B)。
- 闭包陷阱：在React中经常会遇到闭包陷阱，尤其在`useEffect`中。由于React不支持自动解析副作用的依赖，因此很多函数不得不放到`useEffect`内部，导致经常出现意想不到的闭包问题。解决闭包问题的常见方法是使用 `useRef`。
:::

## 常见的继承有哪些？

### 原型链继承

特点：

- 实例可继承的属性有：实例的构造函数的属性，父类构造函数属性，父类原型的属性。

缺点：

- 新实例无法向父类构造函数传参。
- 继承单一。
- 所有新实例都会共享父类实例的属性。

```js
function SuperType(){
  this.colors = ["red", "blue", "green"];
}
function SubType(){}

SubType.prototype = new SuperType();
```

### 借用构造函数继承

重点： 用 `.call()` 和 `.apply()` 将父类构造函数引入子类函数。

特点：

- 只继承了父类构造函数的属性，没有继承父类原型的属性。
- 可以继承多个构造函数属性。（解决了原型链继承缺点 1、2、3）
- 在子实例中可向父实例传参。

缺点：

- 只能继承父类构造函数的属性。
- 无法实现构造函数的复用。
- 每个新实例都有父类构造函数的副本冗余。

```js
function  SuperType(){
    this.color=["red","green","blue"];
}
function  SubType(){
    //继承自SuperType
    SuperType.call(this);
}
```

### 组合继承

组合原型链继承和借用构造函数继承的方法。

重点：结合了两种模式的优点，可以传参和复用。

特点：

- 可以继承父类原型上的属性，可以传参，可复用。
- 每个新实例引入的构造函数属性是私有的。

缺点： 调用了两次父类构造函数（耗内存），子类的构造函数会代替原型上的那个父类构造函数。

```js
function SuperType(name){
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
  alert(this.name);
};

function SubType(name, age){
  // 继承属性
  // 第二次调用SuperType()
  SuperType.call(this, name);
  this.age = age;
}

// 继承方法
// 构建原型链
// 第一次调用SuperType()
SubType.prototype = new SuperType(); 
// 重写SubType.prototype的constructor属性，指向自己的构造函数SubType
SubType.prototype.constructor = SubType; 
SubType.prototype.sayAge = function(){
    alert(this.age);
};
```

### 原型式继承

重点： 用一个函数包装一个对象，然后返回这个函数的调用，这个函数就变成了个可以随意增添属性的实例或对象。object.create()就是这个原理。

特点： 类似于复制一个对象，用函数来包装。

缺点：

- 所有实例都会继承原型上的属性。
- 无法实现复用。

```js
// ES5中存在Object.create()的方法，能够代替此方法。
function create(obj){
  function F(){}
  F.prototype = obj;
  return new F();
}
```

### class 类实现继承

通过 extends 和 super 实现继承。

### 寄生式继承

重点： 在原型式继承的基础上，增强对象，返回构造函数。

优点： 没有创建自定义类型，因为只是套了个壳子返回对象，这个函数顺理成章就成了创建的新对象。

缺点： 没用到原型，无法复用。

```js
function createObject(original){
  var clone = create(original); // 通过调用 object() 函数创建一个新对象
  clone.sayHi = function(){  // 以某种方式来增强对象
    alert("hi");
  };
  return clone; // 返回这个对象
}
```

::: tip ES5继承和ES6继承的区别
ES5的继承是先创建子类的实例对象，然后再将父类的方法添加到this上（Parent.call(this)）。

ES6的继承是先创建父类的实例对象this，然后再用子类的构造函数修改this。因为子类没有自己的this对象，所以必须先调用父类的super()方法，否则新建实例报错。
:::

参见：

- [JavaScript常用八种继承方案 - 掘金](https://juejin.cn/post/6844903696111763470)
- [ES6 与 ES5 继承的区别 - 掘金](https://juejin.cn/post/6844903924015120397)

## 你如何实现ES6的Class？

::: info 扩展问题

- Class 的原理是什么？如何实现？
:::

实现代码如下：

```js
const isFunction = (n) => typeof n === "function";
const extendProperties = (base, extend, cb) => {
 for (let p in extend) {
  if (extend.hasOwnProperty(p)) {
   if (isFunction(cb)) {
    cb(p);
   } else {
    base.prototype[p] = extend[p];
   }
  }
 }
 return base;
};

const Class = (() => {
 function create(properties, parent) {
  function _instance() {
   if (isFunction(this.initialize)) this.initialize.apply(this, arguments);
  }
  function polymorph(thisFunction, parentFunction) {
   return function () {
    this.__parent = parentFunction;
    const output = thisFunction.apply(this, arguments);
    delete this.__parent;
    return output;
   };
  }
  if (parent) {
   _instance.prototype = new parent.constructor();
   extendProperties(_instance, parent);
  }

  extendProperties(_instance, properties, (p) => {
   _instance.prototype[p] =
    parent && isFunction(parent[p])
     ? polymorph(properties[p], parent[p])
     : properties[p];
  });

  _instance.extend = function extend(properties) {
   return create(properties, this.prototype);
  };

  return _instance;
 }
 return { create };
})();
```

测试代码如下：

```js
var Accommodation = Class.create({
 isLocked: true,
 isAlarmed: true,
 lock: function () {
  this.isLocked = true;
 },
 unlock: function () {
  this.isLocked = false;
 },
 initialize: function () {
  this.unlock();
 },
});

var House = Accommodation.extend({
 floors: 2,
 lock() {
  console.log("Number of floors locked:" + this.floors);
 },
});

var myAccommodation = new Accommodation();
console.log(myAccommodation instanceof Accommodation); // true
console.log(myAccommodation instanceof House); // false

var myHouse = new House();
console.log(myHouse instanceof House); // true
console.log(myHouse instanceof Accommodation); // true

console.log(myHouse.isLocked); // false
myHouse.lock(); // Number of floors locked:2
console.log(myHouse.isLocked); // false
```

参见：

- [自己写ES6的Class - 掘金](https://juejin.cn/post/7012129761044463629)

## es6 有哪些新特性？

ES6的新特性现在已经不是那么“新”了，参照[ES6 入门教程](https://es6.ruanyifeng.com/)。

## cookie 、localStorage 、 sessionStorage 之间有什么区别？

参见：

- [https://www.xyass.com/blogs/cookies-and-localstorage-and-sessionstorage-a-detailed-explanation-and](https://www.xyass.com/blogs/cookies-and-localstorage-and-sessionstorage-a-detailed-explanation-and)
- [Difference Between Local Storage, Session Storage And Cookies - GeeksforGeeks](https://www.geeksforgeeks.org/difference-between-local-storage-session-storage-and-cookies/)

## this 的指向有哪些？

总结一下：

- 普通函数中的 this 指向 window
- 定时器中的 this 指向 window
- 箭头函数中 this 指向取决于外部环境
- 事件中的 this 指向事件的调用者
- 构造函数中 this 和原型对象中的 this，都是指向构造函数 new 出来实例对象
- 类 class 中的 this 指向由 constructor 构造器 new 出来的实例对象
- 自调用函数中的 this 指向 window

## 谈谈你平时都用了哪些方法进行性能优化？

## js 的执行机制是怎么样的？

js 是一个单线程、异步、非阻塞 I/O 模型、 event loop 事件循环的执行机制

所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。

同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务。异步 任务指的是，不进入主线程、而进入"任务队列"（task queue）的任务，只有"任务队列"通知主线程， 某个异步任务可以执行了，该任务才会进入主线程执行。

## 如何判断数据类型？各有什么优缺点？

## symbol的原理是什么？

## promise 是什么？它有哪些作用？

## 箭头函数有哪些特征？它的原理是什么？

## BFC 是什么？

BFC（会计格式化上下文），一个创建了新的 BFC 的盒子是独立布局的，盒子内元素的布局不会影响盒 子外面的元素。在同一个 BFC 中的两个相邻的盒子在垂直方向发生 margin 重叠的问题。

BFC 是值浏览器中创建了一个独立的渲染区域，该区域内所有元素的布局不会影响到区域外元素的布 局，这个渲染区域只对块级元素起作用。

## call、apply、bind 三者的异同？

共同点 : 都可以改变 this 指向;

不同点: call 和 apply 会调用函数, 并且改变函数内部 this 指向. call 和 apply传递的参数不一样,call 传递参数使用逗号隔开,apply 使用数组传递 bind 不会调用函数, 可以改变函 数内部 this 指向. 应用场景

- call 经常做继承.
- apply 经常跟数组有关系. 比如借助于数学对象实现数组最大值最小值
- bind 不调用函数,但是还想改变 this 指向. 比如改变定时器内部的 this 指向。
