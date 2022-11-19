# JavaScript工作原理：V8编译器的优化提效

## 目录

[[TOC]]

## 前言

理解JavaScript的工作原理是写出高效JavaScript代码的关键。

忘记那些无关紧要的毫秒级改进：错误地使用对象属性可能导致简单的[一行代码速度降低7倍](https://www.freecodecamp.org/news/javascript-essentials-why-you-should-know-how-the-engine-works-c2cc0d321553/)。

考虑到JavaScript在软件堆栈所有级别中的普遍性，即使不是所有级别的基础设施，也可能会出现微不足道的减速，而不仅仅是网站的菜单动画。

有许多的方法来编写高效的JavasScript代码，但在这篇文章里面，我们将着重介绍编译器友好的优化方法，这意味着源代码使编译器优化变得简单有效。

我们将把讨论范围缩小到V8，即支持electron、node.js和google chrome的JavaScript引擎。为了理解编译器友好的优化，我们首先需要讨论JavaScript是如何编译的。

JavaScript在V8中的执行可以分为三个阶段：

* 源代码到抽象语法树（Source to syntax tree）：解析器将源代码生成抽象语法树(AST，abstract syntax tree)
* 抽象语法树到字节码（Syntax tree to bytecode）：V8的解释器[Ignition](https://v8.dev/docs/ignition)从抽象语法树生成字节码。请注意，生成字节码这一步在[2017年以前是没有的](https://docs.google.com/presentation/d/1chhN90uB8yPaIhx_h2M3lPyxPgdPmkADqSNAoXYQiVE/edit#slide=id.g18d89eb289_1_362)。2017年之前的V8可以参考[How JavaScript works: inside the V8 engine + 5 tips on how to write optimized code](https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e)。
* 字节码到机器码（Bytecode to machine code）：V8的编译器[TurboFan](https://v8.dev/docs/turbofan)从字节码生成图，用高度优化的机器代码替换字节码的部分。

第一个阶段超出了本文的范围，但是第二个和第三个阶段对编写优化的JavaScript有直接的影响。

我们将讨论这些优化方法以及代码如何利用（或[滥用](https://github.com/davidmarkclements/v8-perf)）这些优化。通过了解JavaScript执行的基础知识，您不仅可以理解这些性能方面的建议，还可以学习如何发现自己的一些优化点。

实际上，第二和第三阶段是紧密耦合的。这两个阶段在即时（just-in-time，JIT）范式（paradigm）中运行。为了理解JIT的重要性，我们将研究以前将源代码转换为机器代码的方法。

## Just-in-Time (JIT) 范式

为了执行任意一段程序，计算机必须将源代码转换成机器可以运行的代码。

有两种方法可以进行转换。

* 第一种选择是使用解释器（interpreter）。解释器可以有效地逐行翻译和执行。
* 第二种方法是使用编译器（compiler）。编译器在执行之前立即将所有源代码转换为机器语言。

下面，我们将阐述两种方法的优点和缺点。

### 解释器的优点、缺点

解释器使用**read-eval-print loop** (REPL，交互式解释器)的方式工作 —— 这种方式有许多的优点：

* 易于实现和理解
* 及时反馈
* 更合适的编程环境

然而，这些好处是以缓慢执行为代价的：

* eval的开销，而不是运行机器代码。
* 无法跨程序的对各个部分进行优化。

更正式地说，解释器在处理不同的代码段时不能识别重复的工作。如果你通过解释器运行同一行代码100次，解释器将翻译并执行同一行代码100次，没有必要地重新翻译了99次。

总结一下，解释器简单、启动快，但是执行慢。

### 编译器的优点、缺点

编译器会在执行前翻译所有的源代码。

随着复杂性的增加，编译器可以进行**全局优化**（global optimizations）（例如，为重复的代码行共享机器代码）。这为编译器提供了比解释器唯一的优势 —— 更快的执行时间。

总结一下，编译器是复杂的、启动慢，但是执行快。

### 即时编译(JIT)

[即时编译器](https://en.wikipedia.org/wiki/Just-in-time_compilation)（just-in-time compiler）尝试结合了解释器和编译器的优点，使代码转换和执行都变得更快。

::: tip 即时编译
在计算机技术中，即时编译（英语：just-in-time compilation，缩写为JIT；又译及时编译、实时编译），也称为动态翻译或**运行时编译**，是一种执行计算机代码的方法，这种方法涉及在程序执行过程中（在**执行期**）而不是在执行之前进行编译。通常，这包括源代码或更常见的**字节码到机器码的转换**，然后直接执行。实现JIT编译器的系统通常会不断地**分析正在执行的代码**，并确定代码的某些部分，在这些部分中，编译或重新编译所获得的加速将超过编译该代码的开销。参考[即时编译 - Wikiwand](https://www.wikiwand.com/zh-hans/%E5%8D%B3%E6%99%82%E7%B7%A8%E8%AD%AF)
:::

基本思想是避免重复转换（retranslation）。首先，分析器（profiler）会通过解释器先跑一遍代码。在代码执行期间，分析器会跟踪运行几次的温代码段（warm code segments）和运行很多次的热代码段（hot code segments）。

JIT将温代码片段发送给基线编译器（baseline compiler），尽可能的复用编译后的代码。

JIT同时将热代码片段发送给优化编译器（optimizing compiler）。优化编译器使用解释器收集的信息来进行假设（assumptions），并且基于这些假设进行优化（例如，对象属性总是以特定的顺序出现）。

但是，如果这些假设无效，优化编译器将执行去优化（deoptimization），丢弃优化的代码。

优化和去优化的过程是昂贵的。由此产生了一类JavaScript的优化方法，下面将详细描述。

JIT需要存储优化的机器代码（storing optimized machine code）和分析器的执行信息（profiler’s execution information）等，自然会引入内存开销。尽管这一点无法通过优化的JavaScript来改善，但促进了V8的解释器（Ignition）的诞生。

## V8的编译

V8的解释器（Ignition）和编译器（TurboFan）执行以下功能：

* 解释器将抽象语法树（AST）转换为字节码。字节码队列随后会被执行，并且通过内联缓存（inline caches，参见[深入了解V8](/WEB/%E8%BF%9B%E5%87%BB%E7%9A%84V8/00-%E6%B7%B1%E5%85%A5%E4%BA%86%E8%A7%A3V8#inline-caching%EF%BC%88%E5%86%85%E8%81%94%E7%BC%93%E5%AD%98%EF%BC%89)）收集反馈。这些反馈会被解释器本身用于随后的解析（interpretation），同时，编译器会利用这些反馈来做推测性的优化（speculative optimization）。
* 编译器根据反馈将字节码转换为特定于体系结构的机器码（architecture-specific machine code），从而推测性地优化字节码。

### V8的解释器 - Ignition

JIT编译器引出了内存消耗的开销。Ignition通过实现三个目标来解决这个问题：减少内存使用、减少启动时间和降低复杂性。（参考[DLS Keynote: Ignition: Jump-starting an Interpreter for V8](https://docs.google.com/presentation/d/1HgDDXBYqCJNasBKBDf9szap1j4q4wnSHhOYpaNy5mHU/edit#slide=id.g1453eb7f19_0_359)）

这三个目标都是通过将AST转换为字节码并在程序执行期间收集反馈来实现的。

* 字节码被当做源代码对待，省去了在编译期间重新解析JavaScript的需要。这意味着使用字节码，TurboFan的去优化过程（deoptimization）不再需要原始的代码了。
* 作为基于程序执行反馈的优化示例，**内联缓存**允许V8优化对具有相同类型参数的函数的重复调用。具体来说，**内联缓存存储函数的输入类型**。类型越少，需要的类型检查（type checks）就越少。减少类型检查的数量可以显著提高性能。

::: tip 内联注解
内联注解是编译注解，编译注解其实就是在编译时进行一些特殊的操作，能让编译器支持特殊的操作。

* @inline：标记编译器内联；
* @noinline：标记编译器不要内联，防止因优化器过于智能而过度优化，反而伤害效能。

参见：[React 源码漂流记：React 调和器核心源码解读（三） | Fancy Front End](https://source.jonsam.site/react/tour/react-reconciliation-3/#workloopsync)
:::

AST和字节码都会暴露给TurboFan（optimizing compiler）。

### V8的编译器 - TurboFan

在2008年发布时，V8引擎最初直接将源代码编译为机器代码，跳过了中间字节码表示（intermediate bytecode representation）。在发布时，V8就比竞争对手快了10倍，每次编译[Google London keynote (Mcllroy, Oct ’16）](https://docs.google.com/presentation/d/1HgDDXBYqCJNasBKBDf9szap1j4q4wnSHhOYpaNy5mHU/edit#slide=id.g17d335048f_1_1903)。

然而，到今天，TurboFan接受了Ignition的字节码，比它发布的时候（2008）快了10倍。V8的编译器经过了一系列的迭代：

* 2008 – Full-Codegen
  * 具有隐藏类（hidden classes）和内联缓存（inline caching），快速遍历AST的JIT编译器（AST-walking JIT compiler ）
  * 缺点：无优化的即时编译（non-optimizing JIT）
* 2010 – Crankshaft
  * 使用类型反馈和去优化（deoptimization），优化即时编译器（Optimizing JIT compiler）。
  * 缺点: 不能扩展到现代JavaScript，严重依赖去优化，有限的静态类型分析（limited static type analysis），与Codegen紧密耦合（tightly coupled to Codegen），高移植开销（high porting overhead）。
* 2015 – TurboFan
  * 用类型和范围分析（type-and-range analysis）优化即时编译器，节点海（sea of nodes）。

根据Google慕尼黑技术讲座（Titzer，3月16号），TurboFan优化了峰值性能（peak performance）、静态类型信息使用（static type information usage）、编译器前端、中间和后端分离以及可测试性（testability）。最终沉淀出一个关键的贡献："节点海"（sea (or soup) of nodes）。

在节点海中，节点表示计算（computation），边表示依赖关系（dependencies）。

与[控制流图](https://en.wikipedia.org/wiki/Control-flow_graph)（CFG，Control Flow Graph）不同的是，节点海可以放宽大多数操作的评估顺序。与CGF一样，有状态操作的控制边和效果边在需要时会约束执行顺序。

Titzer进一步完善了这个定义，使之成为一个节点汤（a soup of nodes），其中控制流子图（control flow subgraphs）进一步放宽。这提供了许多优点—例如，这避免了冗余代码的消除（redundant code elimination）。

通过自下而上或自上而下的图转换（graph transformations），图缩减（Graph reductions）被应用于这一系列节点（soup of nodes）。

TurboFan遵循4个步骤将字节码转换为机器码。请注意，以下管道中的优化是根据Ignition的反馈执行的。

* 将程序表示为JavaScript操作符（operators）。（例如：JSAdd）
* 将程序表示为中间运算符（Intermediate operators）。（虚拟机级别的操作符（VM-level operators）；不可知的数字表示（agnostic to number representation），例如：NumberAdd）
* 将程序表示为机器操作符（Machine operators ）。（与机器指令（machine instructions）相对应，例如：Int32Add）
* 使用顺序约束（order constraints）安排执行顺序。创建一个传统的控制流图（CFG）。

TurboFan的运行时JIT风格的编译和优化（JIT-style compilations and optimizations）意味着V8从源代码到机器代码的转换结束了。

## 如何优化你的JavaScript

TurboFan的优化通过减轻糟糕的JavaScript的影响来提高JavaScript的网络性能。然而，了解这些优化可以提供进一步的加速。

下面是利用V8中的优化来提高性能的7个技巧。前四个重点是减少去优化（reducing deoptimization）。

### Tip1: 在构造函数中声明对象属性

更改对象属性会产生新的隐藏类（hidden classes）。以[Google I/O 2012](https://www.youtube.com/watch?v=UJPdhx5zTaw&feature=youtu.be&t=12m18s)中的以下示例为例。

```js
class Point {
 constructor(x, y) {
   this.x = x;
   this.y = y;
 }
}

var p1 = new Point(11, 22);  // hidden class Point created
var p2 = new Point(33, 44);

p1.z = 55;  // another hidden class Point created
```

正如你所见，p1和p2现在有不同的隐藏类了。这阻碍了TurboFan的优化尝试：具体来说，任何接受Point对象的方法现在都是去优化的。

所有这些函数都使用两个隐藏类重新优化。对对象形状（shape）的任何修改都是如此。

### Tip2:  保持对象属性不变

更改对象属性的顺序会导致产生新的隐藏类，因为对象形状（object shape）中是包含顺序的。

```js
const a1 = { a: 1 };  # hidden class a1 created
a1.b = 3;

const a2 = { b: 3 };  # different hidden class a2 created
a2.a = 1;
```

上面的代码中，a1和a2有不同的隐藏类。修复顺序允许编译器重用同一个隐藏类。因为添加的字段（包括顺序）用于生成隐藏类的id。

### Tip3：修复函数参数类型

函数根据特定参数位置的值类型更改对象形状。如果此类型发生更改，则函数将去优化并重新优化。

在看到四种不同的对象形状后，该函数会变成megamorphic（易变的），TurboFan将不会再尝试优化这个函数。

看下面这个例子：

```js
function add(x, y) {
 return x + y
}

add(1, 2);  # monomorphic
add("a", "b");  # polymorphic
add(true, false);
add([], []);
add({}, {});  # megamorphic
```

第9行过后，TurboFan将不会再优化add这个函数。

### Tip4：在脚本作用域中声明类

不要在函数作用域中声明类。以下面这个例子为例：

```js
function createPoint(x, y) {
 class Point {
   constructor(x, y) {
     this.x = x;
     this.y = y;
  }
}
 return new Point(x, y);
}

function length(point) {
 ...
}
```

每一次createPoint这个函数被调用的时候，一个新的Point原型会被创建。

**每一个新的原型都对应着一个新的对象形状**，所以每一次length函数都会看到一个新的point的对象形状。

跟之前一样，当看到4个不同的对象形状的时候，函数会变得megamorphic，TurboFan将不会再尝试优化length函数。

在脚本作用域（script scope）中声明class Point，我们可以避免每一次调用createPoint的时候，生成不同的对象形状。

下一个tip是V8引擎里的奇淫巧技。

### Tip5：使用`for…in`

这是V8引擎中的一个怪异行为（quirk）。这一特性之前包含在最初的Crankshaft里面，后来被移植到了Ignition and Turbofan.

`for…in`循环比函数迭代（functional iteration）、带箭头函数的函数迭代和for循环中的object.keys快4-6倍。

接下来两个Tip是对之前两种说法的反驳。由于现代V8引擎的改变，这两种说法已经不成立了。

### Tip6：无关字符不影响性能

Crankshaft过去是使用一个**函数的字节数**来决定是否内联一个函数的。而TurboFan是建立在AST上的，他**使用AST节点的数量来决定函数的大小**。

**因此，无关的字符，比如空白，注释，变量名长度，函数签名等，不会影响函数的性能。**

### Tip7：Try/catch/finally 不是毁灭性的

Try代码块以前容易出现高昂的优化-**去优化周期**（deoptimization cycles）。如今，**当在Try块中调用函数时，turbofan不再显示出显著的性能影响。**

## 结论

总之，优化方法通常集中在减少去优化（reducing deoptimization）和避免不可优化的megamorphic函数上（avoiding unoptimizable megamorphic functions）。

通过对V8引擎框架的理解，我们还可以推断出上面没有列出的其他优化方法，并尽可能重用方法来利用内联。现在您已经了解了JavaScript编译及其对日常JavaScript使用的影响。

## 参考

* [How JavaScript works: Optimizing the V8 compiler for efficiency - LogRocket Blog](https://blog.logrocket.com/how-javascript-works-optimizing-the-v8-compiler-for-efficiency/)

::: warning 版权声明
本文翻译自[How JavaScript works: Optimizing the V8 compiler for efficiency](https://blog.logrocket.com/how-javascript-works-optimizing-the-v8-compiler-for-efficiency/)，版权归原作者所有。
:::
