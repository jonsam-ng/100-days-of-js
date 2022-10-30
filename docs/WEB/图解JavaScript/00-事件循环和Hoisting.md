# 图解JavaScript之事件循环和变量提升

## 目录

[[TOC]]

## 事件循环

**事件循环（Event Loop）** ，是每个JS开发者都会接触到的概念，但是刚接触时可能会存在各种疑惑。我是一个视觉型学习者，所以打算通过gif动图的可视化形式帮助大家理解它。

首先我们来看看，什么是事件循环，我们为什么要了解它呢？

众所周知，JavaScript是 **单线程（single-threaded）** 的，也就是同一时间只能运行一个任务。一般情况下这并没有什么问题，但是假如我们要运行一个耗时30秒的任务，我们就得等待30秒后才能执行下一个任务（这30秒期间，JavaScript占用了主线程（main thread），我们什么都不能做，包括页面也是卡死（stuck）状态）。现在是2019年，没有人想要一个缓慢的、反应慢的网站。

好在浏览器向我们提供了JS引擎不具备的特性：`Web API`。`Web API`包括`DOM API`、`定时器`（setTimeout）、`HTTP请求`等特性，可以帮助我们实现**异步、非阻塞**（async, non-blocking）的行为。

当我们调用一个函数时，函数会被放入一个叫做 **调用栈** （call stack，也叫执行上下文栈）的地方。调用栈是JS引擎的一部分，并非浏览器特有的。调用栈是一个 *栈数据结构* （stack），具有*后进先出*的特点（Last in, first out. LIFO）。当函数执行完毕返回时，会被弹出调用栈。

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--44yasyNX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gid1.6.gif)

图例中的`respond`函数返回一个`setTimeout`函数调用，`setTimeout`函数是`Web API`提供给我们的功能：它允许我们**延迟执行一个任务而不用阻塞主线程**。`setTimeout`被调用时，我们传入的回调函数，即箭头函数`() => { return 'hey' }`会被传递给`Web API`处理，然后`setTimeout`和`respond`依次执行完毕出栈。

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--d_n4m4HH--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif2.1.gif)

在`Web API`中会执行定时器，定时间隔就是我们传入`setTimeout`的第二个参数，也就是1000ms。计时结束后回调函数并不会立即进入调用栈（call stack）执行，而是会被加入一个叫做 **任务队列（Task Queue）** 的地方。

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--MewGMdte--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif3.1.gif)

看到这里，有些人可能会疑惑：1000ms之后，回调竟然没有放入调用栈执行，而是被放入了任务队列，那什么时候被执行呢？不要急，既然是一个队列，那就要进行排队。

接下来就是我们期待已久，万众瞩目的 **事件循环（Event Loop）** 闪亮登场的时刻了。Event Loop的工作就是连接任务队列和调用栈（connecting the queue with the call stack），当调用栈中的任务均执行完毕出栈，调用栈为空时，Event Loop会检查任务队列中是否存在等待执行的任务，如果存在，则取出队列中第一个任务，放入调用栈。

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--b2BtLfdz--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif4.gif)

我们的回调函数被放入调用栈中，执行完毕，返回其返回值，然后被弹出调用栈。

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--NYOknEYi--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif5.gif)

### 小练习

阅读一时爽，但只有通过反复练习，将其变为自己的东西后才会一直爽。我们来做个小练习检测下学习成果，看看下面代码输出什么：

```js
const foo = () => console.log('First');
const bar = () => setTimeout(() => console.log('Second'), 500);
const baz = () => console.log('Third');

bar();
foo();
baz();
```

相信大家都可以轻松给出正确答案。我们一起来看下这段代码运行时发生了什么：

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--BLtCLQcd--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif14.1.gif)

1. `bar`被调用，返回`setTimeout`的调用；
2. 传入`setTimeout`的回调被传递给`Web API`处理，`setTimeout`执行完毕出栈，`bar`执行完毕出栈；
3. 定时器开始运行，同时主线程中`foo`被调用，打印`First`，`foo`执行完毕出栈；
4. `baz`被调用，打印`Third`，`baz`执行完毕出栈；
5. 500ms后定时器运行完毕，回调函数被放入任务队列；
6. Event Loop检测到调用栈为空，从任务队列中取出回调函数放入调用栈；
7. 回调函数被执行，打印`Second`，执行完毕出栈。

希望本文能帮助你对事件循环有一个初步的了解，最重要的是了解某些错误/行为的原理，以便有效地搜索正确的术语并最终找到答案。

## 变量提升

什么是变量提升？

::: tip Hoisting（变量提升）
变量提升（Hoisting）被认为是，Javascript 中执行上下文（特别是创建和执行阶段）工作方式的一种认识。在 ECMAScript® 2015 Language Specification 之前的 JavaScript 文档中找不到变量提升（Hoisting）这个词。不过，需要注意的是，开始时，这个概念可能比较难理解，甚至恼人。

例如，从概念的字面意义上说，“变量提升”意味着变量和函数的声明会在物理层面移动到代码的最前面，但这么说并不准确。实际上变量和函数声明在代码里的位置是不会动的，而是在编译阶段被放入内存中。

参照[Hoisting（变量提升） - 术语表 | ](MDNhttps://developer.mozilla.org/zh-CN/docs/Glossary/Hoisting)
:::

变量提升是每个JS开发人员都听说过的术语之一，因为你在搜索引擎上搜索烦人的错误，并且最终到StackOverflow上查找时，有人会告诉你这个错误是因为 **变量提升（hoisting）** 导致的。那么，什么是变量提升呢？

如果你是JavaScript新手，那么你可能已经遇到过一些怪异的行为，比如，有些变量的值会偶然是`undefined`、抛出了`ReferenceError`错误，等等。变量提升经常被解释为**将变量和函数放到文件的顶部**（putting variables and functions to the top of the file）。不过，尽管变量提升可能看起来像这样，但是背后并非如此😃。

当JS引擎获取我们的脚本时，它要做的第一件事情就是为我们代码中的数据**设置内存**（setting up memory）。这时候没有执行任何代码，仅仅是在为执行准备好一切。函数声明和变量的存储方式是不同的。函数存储的是**对整个函数的一个引用（reference）**。

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--lLfiCbTX--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif7.gif)

对变量来说，就有所不同了。ES6引入了两个新关键字来声明变量：`let`和`const`。用`let`或者`const`关键字声明的变量被存储的时候是**未被初始化的**（uninitialized）。

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--vRtKMspn--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif8.gif)

用`var`关键字声明的变量以默认值`undefined`存储。

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--zvlaEaAo--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif9.gif)

现在创建阶段已经完成，我们可以实际执行代码。下面我们来看看，如果在文件头部声明函数或者任何变量之前，有三条`console.log`语句的时候，会发生什么。

既然函数存储的是对整个函数代码的一个引用，那么我们甚至可以在创建他们的代码行之前调用他们！ 🔥

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--nk1taOke--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif16.gif)

当我们在一个用`var`关键字声明的变量的变量声明之前引用该变量时，它只会返回存储的默认值`undefined`！不过，这样做有时候会导致不可预期的行为。大多数情况下，这意味着你无意中（unintentionally）引用了它（你可能并不想它的值为`undefined`）😬。

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--2nai6XPr--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif17.gif)

为了防止我们像在用`var`关键字声明变量时那样一不小心就引用了一个`undefined`变量，只要我们试图访问**未被初始化**的变量时，就都会抛出一个`ReferenceError`错误。变量实际声明之前的“区域”称为 **暂时性死区**（temporal dead zone）：就不让我们在变量初始化之前引用该变量（这也包括ES6 class！）。

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--VVPlWhGC--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif18.gif)

当引擎通过我们实际声明变量的行时，内存中的值就被我们实际声明它们的值覆盖。

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--LGEaCMkS--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://devtolydiahallie.s3-us-west-1.amazonaws.com/gif12.gif)

搞定！ 🎉下面我们快速回顾一下：

* 在执行代码之前，将函数和变量存储在内存中以用于执行上下文（execution context）。这称为 **变量提升（hoisting）** 。
* 函数被存储为一个对整个函数的引用（reference），用`var`关键字声明的变量的值为`undefined`，而用`let`和`const`关键字声明的变量的值为`uninitialized`。

希望本文能让你搞清楚 **变量提升（hoisting）** 这个术语。
