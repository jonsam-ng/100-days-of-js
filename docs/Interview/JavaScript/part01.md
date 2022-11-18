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
- V8为什么使用原型链？相比于OOP有什么好处？
- 原型链继承和普通继承有什么不同？
:::

每一个实例对象上有一个 `__proto__` 属性，指向构造函数的原型对象，构造函数的原型对象（prototype）也是一个对象， 也有 `__proto__` 属性，这样一层一层往上找的过程就形成了原型链。
