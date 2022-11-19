# TurboFan的故事

## 目录

[[TOC]]

对我来说，二月是一个激动人心且非常非常忙碌的月份。正如您可能听说的那样，我们终于宣布将在 Chrome 59 中启动Ignition+TurboFan 管道（pipeline）。因此，尽管来晚了，而且实际上还没有赶上 2 月，但我还是想花点时间回顾一下 TurboFan 的故事。请记住，您在这里阅读的所有内容都是我的个人观点，并不代表 V8、Chrome 或 Google 的观点。

自从我们在 2013 年开始（考虑）TurboFan 以来已经快 3.5 年了。从那时起世界发生了很大变化，V8也 发生了很大变化。从那以后我改变了很多。我对 JavaScript、Web 和 Node.js 的心智模型发生了显著变化。TurboFan 开发的这个故事与我个人的发展密切相关，因此这里可能严重偏向于我自己的观点。

2013 年底，当我加入 TurboFan 项目时，我们坚信我们必须解决 Crankshaft 的代码生成问题，并对 JavaScript 代码进行更复杂的峰值性能优化（peak performance optimizations）。我们的大部分发现基于我们在某些基准测试（如[Octane](https://developers.google.com/octane)和基于[asm.js](http://asmjs.org/)的应用程序调查）中命中的 JavaScript 代码，但也基于来自重要网页（如Google 地图）的发现. 这些被认为是真实世界性能的良好代理，因为它们对优化编译器施加了很大压力。回想起来，我们大错特错了。虽然 Octane 中的各种测试确实可以从更智能的编译器中获益，但现实情况是，对于绝大多数网站而言，优化编译器（speculative optimizations）并不重要，甚至会损害性能 ⸺ 因为推测优化是有代价的 ⸺特别是在页面加载期间，尤其是在移动设备上。

但在 TurboFan 开发的第一年，我们几乎没有意识到现实世界的担忧。我们最初的目标是构建一个完整的语言优化编译器，它在像 asm.js 这样的代码上表现非常出色⸺ Crankshaft 从未真正发挥过的这两个领域。在 Chrome 41 中，我们为 asm.js 代码提供了 TurboFan 。TurboFan 的这个初始版本已经包含了很多智能。我们基本上通过更通用的方法达到了 Firefox 级别的 asm.js 性能。大多数针对快速算术的基于类型的优化在通用 JavaScript 中同样有效。从我个人的角度来看，当时的 TurboFan 优化编译器可能是我们拥有的最漂亮的版本，也是我能想象的唯一版本（JavaScript 编译器）。“节点海”（[sea of nodes](http://grothoff.org/christian/teaching/2007/3353/papers/click95simple.pdf)）的方法可能是有道理的（尽管当时它已经显示出它的弱点）。在接下来的几个月里，我们试图找到渐进的方法，将 TurboFan 变成一个可行的、通用的 Crankshaft 替代品。但是我们努力寻找另一个可以独立处理的 JavaScript 子集，类似于我们开始使用 asm.js 的方式。

在 2015 年年中，我们开始意识到 TurboFan 可能实际上解决了我们没有的问题，我们可能需要回到绘图板来弄清楚为什么 V8 在野外挣扎。那时我们并没有真正参与社区，当开发人员向我提出问题时，我个人的反应通常是消极的，并且沿着“你的 JavaScript 做奇怪的事情”的思路，随着时间的推移变成“如果你的代码在 V8 中很慢，你写的代码很慢”留在人们的印象中。所以退后一步，试图了解全貌，我慢慢意识到很多痛苦都源于 V8 的性能悬崖（performance cliffs）。换句话说，我们过分关注峰值性能（peak performance）案例，基线性能（baseline performance）是一个盲点。

这种缺乏平衡导致了高度不可预测的性能。例如，当 JavaScript 代码遵循某种模式时 ⸺ 避免各种[性能杀手](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers)，保持一切单态（monomorphic），限制热门函数（hot functions）的数量 ⸺ 您将能够从 V8 中榨取出色的性能，在类似代码上轻松击败 Java 性能。但是，一旦您离开这条令人敬畏的性能线，您通常会立即从陡峭的悬崖上掉下来。

V8一直像这个悬崖。如果你注意，那么它是惊人的和美丽的。但如果你不这样做，你就会从悬崖上掉下来，那你就完蛋了。过去100 倍的性能差异并不少见。在这些悬崖中，Crankshaft 中的`arguments`对象的处理可能是人们最常撞到的，也是最令人沮丧的。Crankshaft 中的基本假设是`arguments`对象不会逃逸（escape），因此 Crankshaft 不需要具体化实际的 JavaScript `arguments`对象，而是可以从激活记录（activation record）中获取参数。所以，换句话说，没有安全（safety）。全有或全无。让我们考虑一下这个简单的调度（dispatching）逻辑：

```js
var callbacks = [
  function sloppy() {},
  function strict() {
    "use strict";
  }
];

function dispatch() {
  for (var l = callbacks.length, i = 0; i < l; ++i) {
    callbacks[i].apply(null, arguments);
  }
}

for (var i = 0; i < 100000; ++i) {
  dispatch(1, 2, 3, 4, 5);
}
```

天真地看，它似乎遵循 Crankshaft 中`arguments`对象的规则：在`dispatch`中我们只将`arguments`与[`Function.prototype.apply`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)一起使用。然而，在node中运行这个简单的`example.js`告诉我们在`dispatch`中所有优化都被禁用：

```bash
$ node --trace-opt example.js
...
[marking 0x353f56bcd659 <JS Function dispatch (SharedFunctionInfo 0x187ffee58fc9)> for optimized recompilation, reason: small function, ICs with typeinfo: 6/7 (85%), generic ICs: 0/7 (0%)]
[compiling method 0x353f56bcd659 <JS Function dispatch (SharedFunctionInfo 0x187ffee58fc9)> using Crankshaft]
[disabled optimization for 0x167a24a58fc9 <SharedFunctionInfo dispatch>, reason: Bad value context for arguments value]
```

是因为臭名昭著的[Bad value context for arguments value](https://gist.github.com/Hypercubed/89808f3051101a1a97f3) 的原因。那么，这里的问题是什么？尽管代码遵循了`arguments`对象的规则，但它还是跌落了性能悬崖。真正的原因非常微妙：Crankshaft 只能在知道 `fn.apply` 是 [`Function.prototype.apply`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 的情况下进行优化 `fn.apply(receiver,arguments)`，并且它只知道单态`fn.apply`属性访问。也就是说，`fn`，映射在 V8 术语中 ⸺ 必须始终具有完全相同的隐藏类（hidden class）。但是`callbacks[0]`和`callbacks[1]`有不同的映射（maps），因为`callbacks[0]`是宽松模式（sloppy mode）函数，而`callbacks[1]`是严格模式（strict mode ）函数：

```bash
$ cat example2.js
var callbacks = [
  function sloppy() {},
  function strict() { "use strict"; }
];
console.log(%HaveSameMap(callbacks[0], callbacks[1]));
$ node --allow-natives-syntax example2.js
false
```

另一方面，TurboFan 愉快地优化了 `dispatch`（使用[最新的 Node.js LKGR](https://medium.com/@bmeurer/help-us-test-the-future-of-node-js-6079900566f)）：

```bash
$ node --trace-opt --future example.js
[marking 0x20fa7d04cee9 <JS Function dispatch (SharedFunctionInfo 0x27431e85d299)> for optimized recompilation, reason: small function, ICs with typeinfo: 6/6 (100%), generic ICs: 0/6 (0%)]
[compiling method 0x20fa7d04cee9 <JS Function dispatch (SharedFunctionInfo 0x27431e85d299)> using TurboFan]
[optimizing 0x1c22925834d9 <JS Function dispatch (SharedFunctionInfo 0x27431e85d299)> - took 0.526, 0.513, 0.069 ms]
[completed optimizing 0x1c22925834d9 <JS Function dispatch (SharedFunctionInfo 0x27431e85d299)>]
...
```

在这个简单的例子中，性能差异已经是 **2.5 倍** ，TurboFan 甚至还没有生成很棒的代码。因此，您只是因为面临两个极端的选择而遭受性能打击：快路径（fast path）与慢路径（slow path）。而 V8 过去对快路径的关注往往导致慢路径变得更慢，例如，因为你为跟踪反馈（tracking feedback）付出了更多的代价，你需要在一些快速的情况下生成几乎完美的代码，或者仅仅是因为你不得不回退更多检查以到达慢路径。

再退一步：如果 TurboFan 应该帮助我们，那么它也必须对慢路径做些事情。我们认为我们必须解决两件事才能实现这一目标：

1. 拓宽快路径。
2. 改进慢路径。

拓宽快路径对于确保 JavaScript 引擎花费在尝试优化代码上的资源实际得到回报至关重要。例如，收集类型反馈和测量（profile）函数直到它变热（hot），然后才意识到它以不受支持的方式使用 `arguments`，这完全是浪费资源。TurboFan 优化编译器的既定目标是支持完整的语言，并始终收回成本。在新世界中，从 Ignition 升级到 TurboFan 总是在执行速度方面取得胜利。从这个意义上说，TurboFan 是一种 *更好的 Crankshaft* 。

但这本身并没有真正帮助，特别是因为 TurboFan 编译比 Crankshaft 更昂贵（你真的必须承认 Crankshaft 的令人敬畏的引擎工作（engineering work），它仍然作为[Dart](https://www.dartlang.org/)引擎的核心部分闪耀光芒）。事实上，在许多情况下，仅用 TurboFan 替换 Crankshaft 会严重影响现实世界的性能。随着我们进入一个大部分网络流量来自移动设备的世界，并且越来越多的这些设备是低端 Android 设备，真实世界的性能开始严重损害 V8 和 Chrome。在这个世界上，页面加载时间和低负载 ⸺ 内存和执行方面 ⸺ 是成功的关键。例如，我们发现在典型 Web 应用程序中 **30%** 的托管内存被代码（Code）对象所使用：

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.46gputsatro0.webp)

资料来源：[V8: Hooking up the Ignition to the TurboFan](https://docs.google.com/presentation/d/1chhN90uB8yPaIhx_h2M3lPyxPgdPmkADqSNAoXYQiVE/edit#slide=id.g1453eb7f19_1_108)，BlinkOn 7 会议，@rossmcilroy和@leszekswirski。

这意味着VM 占用了 **30%的内存用于其内部执行支持。** 好多啊！这些代码对象中的绝大多数来自 Full-Codegen 和[IC（内联缓存）](https://en.wikipedia.org/wiki/Inline_caching)系统。传统上 V8 通过 Full-Codegen 编译器为其执行的每个函数生成机器代码。这意味着即使该函数在页面加载期间仅执行一次或两次，我们仍会为其生成一个代码对象（Code object）。这些代码对象曾经非常庞大，因为 Full-Codegen 并没有真正应用任何认真的优化（它应该尽可能快地生成代码）。我们过去为此添加了缓解措施，例如代码老化机制（code aging mechanism），其中 GC（垃圾收集器）最终会为在特定时间段内未执行的函数核对代码对象。

但即使采取了这些缓解措施，为函数生成的代码开销仍然很大。TurboFan 优化编译器在这里根本帮不上忙。但事实证明，一些聪明的工程师发现我们可以重用 TurboFan 管道的实际代码生成部分来构建[Ignition 解释器](https://docs.google.com/document/d/11T2CRex9hXxoJwbYqVQ32yIPMh0uouUZLdyrtmMoL44)，这大大减少了代码内存开销。除此之外，它还改善了页面加载时间并有助于减轻解析开销，因为 TurboFan 优化编译器在开始优化时不再需要重新解析函数源代码，而是可以[直接从解释器的字节码进行优化](https://docs.google.com/presentation/d/1eF3gub1ToNtUKPsnPeIThaJUi7cpucmBYp3aWuZJcVA/edit#slide=id.g1c373bc8f0_0_8)。

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.75su84xikv40.webp)

资料来源：V8：[将 Ignition 连接到 TurboFan](https://docs.google.com/presentation/d/1chhN90uB8yPaIhx_h2M3lPyxPgdPmkADqSNAoXYQiVE/edit#slide=id.g1453eb7f19_5_539)，BlinkOn 7 会议，@rossmcilroy和@leszekswirski。

解释器（interpreter）是 V8 的一大胜利。但它对页面加载时间和基准性能的影响总体上并不乐观。慢路径的问题，尤其是在 IC（内联缓存）系统中，即使使用 Ignition（和 TurboFan）也仍然存在。这里的一个关键观察结果是，传统的方法是使用专用代码存根（dedicated code stubs）（所谓的处理程序，handlers）来处理各种映射（maps）（隐藏类）的组合和名称以加速属性访问，这种方法无法扩展。例如，对于 V8 执行的每个属性访问 `o.x`，它会为 `o` 的每个映射生成一个 Code 对象，它检查是否`o`还有这个映射，如果有，则根据映射（map）加载值`x`。因此，有关对象的知识以及如何获取属性值的方式被编码在微小的代码对象中。这对一般代码内存开销贡献很大，并且在[指令缓存](https://en.wikipedia.org/wiki/Cache_memory#Instruction_and_data_cache)（instruction cache）利用率方面也相当昂贵。但更糟糕的是，V8 必须为至少执行两次的每个属性访问生成这些代码对象（我们已经通过在第一次执行时不这样做来减轻开销）。

某些网页会花费大量时间在页面加载期间仅生成这些属性访问处理程序（property access handlers）。同样，替换优化编译器根本无济于事，但我们能够概括为 Ignition 引入的基于 TurboFan 的代码生成架构，也能够将其用于代码存根。这使我们能够重构 IC 系统以从处理程序代码对象转向数据驱动的方法，其中如何加载或存储属性的信息通过数据格式和基于 TurboFan 的代码存根（即`LoadIC`，`StoreIC`等）读取此格式并执行适当的操作，利用新的数据结构，即所谓的 FeedbackVector，它现在附加到每个函数并负责记录和管理所有执行反馈，这是加速 JavaScript 执行所必需的。

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.49txdxpwrc60.webp)

这大大减少了页面加载期间的执行开销，也显着减少了（微小的）代码对象的数量。我们在 TurboFan 代码生成架构之上构建的新抽象机制称为`CodeStubAssembler`，它提供基于 C++ 的 DSL（领域特定语言）以高度可移植的方式生成机器代码。使用这个可移植的汇编器，我们可以生成高效的代码来处理 JavaScript 领域中的部分慢路径，而无需转到 C++ 运行时（这是真正的慢路径）。

V8 中还有第三个领域，传统上它遭受[不可预测（基线）性能](https://www.youtube.com/watch?v=OP8jdbcDfaA&feature=youtu.be&t=955)的困扰：JavaScript 语言定义的内置函数（builtins）。这些是库函数，例如[`Object.create`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create),[`Function.prototype.bind`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)或[`String.prototype.charCodeAt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)。传统上，这些是通过自托管 JavaScript（self-hosted JavaScript）、手写机器代码（V8 支持的九种架构中的每一种）、Crankshaft 中的部分快路径和 C++ 运行时回退（fallbacks）的拙劣组合实现的。这不仅是正确性、稳定性和安全性错误的严重来源，而且还是导致性能普遍不可预测的主要因素之一。

::: tip
参考扩展中视频： Unorthodox Performance。
:::

例如，`Object.create`在一个简单的微基准测试中使用通常会提供相当不错的性能，但一旦它进入一个真正的应用程序，你有几个不同的库在使用它，从而向它提供相互矛盾的反馈，性能就会显着下降，而这个反馈污染（feedback pollution）导致使用结果对象的函数性能下降。如今`Object.create`是所谓的 TurboFan 内置（builtin），基于该`CodeStubAssembler`技术，并提供可预测的、体面的性能，或多或少独立于用途。

另一个典型的例子是`Function.prototype.bind`，这是一个非常流行的切入点，将糟糕的内置性能（builtin performance）归咎于 V8（即[John-David Dalton](https://twitter.com/jdalton)习惯于指出 V8 中绑定函数（bound functions）的糟糕性能……他是对的）。`Function.prototype.bind`两年前在V8中的实现基本是这样的：

```js
// ES6 9.2.3.2 Function.prototype.bind(thisArg , ...args)
function FunctionBind(this_arg) { // Length is 1.
  if (!IS_CALLABLE(this)) throw MakeTypeError(kFunctionBind);

  var boundFunction = function () {
    // Poison .arguments and .caller, but is otherwise not detectable.
    "use strict";
    // This function must not use any object literals (Object, Array, RegExp),
    // since the literals-array is being used to store the bound data.
    if (!IS_UNDEFINED(new.target)) {
      return %NewObjectFromBound(boundFunction);
    }
    var bindings = %BoundFunctionGetBindings(boundFunction);

    var argc = %_ArgumentsLength();
    if (argc == 0) {
      return %Apply(bindings[0], bindings[1], bindings, 2, bindings.length - 2);
    }
    if (bindings.length === 2) {
      return %Apply(bindings[0], bindings[1], arguments, 0, argc);
    }
    var bound_argc = bindings.length - 2;
    var argv = new InternalArray(bound_argc + argc);
    for (var i = 0; i < bound_argc; i++) {
      argv[i] = bindings[i + 2];
    }
    for (var j = 0; j < argc; j++) {
      argv[i++] = %_Arguments(j);
    }
    return %Apply(bindings[0], bindings[1], argv, 0, bound_argc + argc);
  };

  var proto = %_GetPrototype(this);  // in ES6 9.4.1.3 BoundFunctionCreate

  var new_length = 0;
  if (ObjectGetOwnPropertyDescriptor(this, "length") !== UNDEFINED) {
    var old_length = this.length;
    if (IS_NUMBER(old_length)) {
      var argc = %_ArgumentsLength();
      if (argc > 0) argc--;  // Don't count the thisArg as parameter.
      new_length = TO_INTEGER(old_length) - argc;
      if (new_length < 0) new_length = 0;
    }
  }

  // This runtime function finds any remaining arguments on the stack,
  // so we don't pass the arguments object.
  var result = %FunctionBindArguments(boundFunction, this, this_arg,
                                      new_length, proto);

  var name = this.name;
  var bound_name = IS_STRING(name) ? name : "";
  %DefineDataPropertyUnchecked(result, "name", "bound " + bound_name,
                               DONT_ENUM | READ_ONLY);

  // We already have caller and arguments properties on functions,
  // which are non-configurable. It therefore makes no sence to
  // try to redefine these as defined by the spec. The spec says
  // that bind should make these throw a TypeError if get or set
  // is called and make them non-enumerable and non-configurable.
  // To be consistent with our normal functions we leave this as it is.
  // TODO(lrn): Do set these to be thrower.
  return result;
}
```

请注意，这`%Foo`是一种特殊的内部语法，意味着`Foo`在 C++ 运行时调用函数，而`%_Bar`是一种特殊的内部语法，用于内联于`Bar`. 我把它作为练习留给读者，让他们弄清楚为什么这段代码会很慢，因为跨越边界到 C++ 运行时的成本非常高（您也可以[在此处](http://benediktmeurer.de/2015/12/25/a-new-approach-to-function-prototype-bind/)阅读相关内容）。只需以更明智的方式重写此内置函数（最初完全基于单个 C++ 实现）并为绑定函数提供更简单的实现即可产生 **60,000%** 的改进。当`Function.prototype.bind`内置函数（builtin）本身被移植到`CodeStubAssembler`，最终的性能提升得以实现。

另一个例子是 V8 中的 Promise 实现，它遭受了很多苦难，尽管 V8 提供原生 Promise 实现已经有一段时间了，但人们实际上更愿意使用 polyfill。通过将 Promise 实现移植到`CodeStubAssembler`，我们能够将 Promise 和 async/await 加速 **500%** 。

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.66kmfps98w80.webp)

来源：[V8 5.7 版](https://v8.dev/blog/v8-release-57)。

因此，尽管它是整个 TurboFan 故事中最著名的组件，但实际的优化编译器只是谜题（puzzle）的一部分，而且根据您的看法，它甚至不是最重要的部分。下面是当前 TurboFan 代码生成架构的粗略草图。许多这些部件今天已经在 Chrome 中上线。例如，很多内置程序（builtins）已经使用 TurboFan 很长一段时间了，自[Chrome 53](https://v8project.blogspot.de/2016/08/firing-up-ignition-interpreter.html)以来，Ignition 已为低端 Android 设备启用，并且大部分数据驱动的 IC 工作已经可用。因此，完整管道的最终启动可能是整个 TurboFan 故事中最重要的事件，但在某种意义上它只是锦上添花。

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.40qqc2gqui00.webp)

就我个人而言，这仅仅是个开始，因为新架构为 JavaScript 开启了一个可能优化的全新世界。推进优化[`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)内置函数（例如[`Array.prototype.map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)、[`Array.prototype.forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)）并最终能够将它们内联到 TurboFan 优化代码中将是令人兴奋的，这在 Crankshaft 中或多或少是不可能的，原因有几个。我也很期待进一步提高新 ES2015+ 语言特性性能的方法。

让我非常高兴的一件事是，在过去的时间里，让新人使用 TurboFan 技术比尝试让新人使用 Crankshaft、Full-Codegen、自托管 JavaScript、手写机器代码和 C++ 运行时的奇怪组合要愉快得多。

## 视频

- Benedikt Meurer: A Tale of TurboFan: Four years that changed V8 forever（原作者的演讲视频）

YouTube：[Benedikt Meurer: A Tale of TurboFan: Four years that changed V8 forever](https://www.youtube.com/watch?v=cvybnv79Sek)

<Bilibili id="av83595492" />

- Slides: [A Tale Of TurboFan (JSKongress Nov '17) - Google Slides](https://docs.google.com/presentation/d/1UXR1H2elTdAYJJ0Eed7lUctCVUserav9sAYSidxp8YE/edit#slide=id.p)

Important Sliders：

How do v8 works?

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.4f3o15ie2vq0.webp)

Unified code generation architecture:

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.2do7cy5c6yhw.webp)

TurboFan Optimizing Compiler:

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.10jealfbmiuo.webp)

- John-David Dalton - Unorthodox Performance

<Bilibili id="BV19P411g7GH" />

Youtube：[John-David Dalton - Unorthodox Performance [ ThunderPlains 2015 ] - YouTube](https://www.youtube.com/watch?v=OP8jdbcDfaA)

## 参考

- [Optimization killers · petkaantonov/bluebird Wiki](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers)
- [vhf/v8-bailout-reasons: A list of Crankshaft bailout reasons with examples](https://github.com/vhf/v8-bailout-reasons)

::: warning 版权声明
本文翻译自[V8: Behind the Scenes (February Edition feat. A tale of TurboFan)](https://benediktmeurer.de/2017/03/01/v8-behind-the-scenes-february-edition)，所有版权归原作者所有。
:::
