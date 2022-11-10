# JavaScript工作原理：优化解析效率

## 目录

[[TOC]]

编写高效率的 JavaScript ，其中一个关键就是要理解它的工作原理。编写高效代码的方法数不胜数，例如，你可以编写[对编译器友好的 JavaScript 代码](https://blog.logrocket.com/how-javascript-works-optimizing-the-v8-compiler-for-efficiency/)，从而避免[将一行简单代码的运行速度拖慢 7 倍](https://www.freecodecamp.org/news/javascript-essentials-why-you-should-know-how-the-engine-works-c2cc0d321553/)。

本文我们会专注讲解可以最小化 Javascript 代码解析时间的优化方法。我们进一步缩小范围，只讨论 V8 这一驱动 [Electron](https://electronjs.org/)， [Node.js](https://nodejs.org/en/) 和 [Google Chrome](https://www.google.com/chrome/) 的 JS 引擎。为了理解这些对解析友好的优化方法，我们还得先讨论 JavaScript 的解析过程，在深入理解代码解析过程的基础上，再对三个编写更高速 JavaScript 的技巧进行一一概述。

先简单回顾一下 JavaScript 执行的三个阶段。

1. 从源代码到语法树 —— 解析器从源码中生成一棵 [抽象语法树](https://en.wikipedia.org/wiki/Abstract_syntax_tree)。
2. 从语法树到字节码 —— V8 的解释器 [Ignition](https://v8.dev/docs/ignition) 从语法树中生成字节码，（[在 2017 年之前](https://docs.google.com/presentation/d/1chhN90uB8yPaIhx_h2M3lPyxPgdPmkADqSNAoXYQiVE/edit#slide=id.g18d89eb289_1_362) 并没有该步骤，具体可以看 [这篇文章](https://blog.sessionstack.com/how-javascript-works-inside-the-v8-engine-5-tips-on-how-to-write-optimized-code-ac089e62b12e)）。
3. 从字节码到机器码 —— V8 的编译器 [TurboFan](https://v8.dev/docs/turbofan) 从字节码中生成图，用高度优化的机器码替代字节码部分。

上述的第二和第三阶段 [涉及到了 JavaScript 的编译](/WEB/进击的V8/08-JavaScript工作原理：V8编译器的优化提效)。在这篇文章中，我们将重点介绍第一阶段并解释该阶段对编写高效 JavaScript 的影响。我们会按照从左到右、从上到下的顺序介绍解析管道（parsing pipeline），该管道接受源代码并生成一棵语法树。

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.55kel7ib5hs0.webp)

抽象语法树（AST）。它是在解析器（图中蓝色部分）中创建的。

## 扫描器

源代码首先被分解成 chunk，每个 chunk 都可能采用不同的编码（encoding），稍后会有一个字符流（stream）将所有 chunk 的编码统一为 [UTF-16](https://www.wikiwand.com/zh/UTF-16)。

在解析之前，扫描器（Scanner）会将 UTF-16 字符流分解成 token。token 是脚本中具有语义（semantic meaning）的一段最小单元（smallest unit）。有不同类型的 token，包括空白符（whitespace，用于 [自动插入分号](https://tc39.es/ecma262/#sec-automatic-semicolon-insertion)，automatic semicolon insertion）、标识符（identifiers）、关键字（keywords）以及代理对（surrogate pairs，仅当代理对无法被识别为其它东西时才会结合成标识符）。这些 token 之后被送往预解析器（preparser）中，接着再送往解析器（parser）。

::: tip Surrogate Pair
Surrogate Pair是UTF-16中用于扩展字符而使用的编码方式，是一种采用四个字节(两个UTF-16编码)来表示一个字符。参见[surrogate pair\_百度百科](https://baike.baidu.com/item/surrogate%20pair)。
:::

## 预解析器

预解析器（preparser）的工作量是最少的，只要跳过传入的源代码并开启懒解析（lazy parsing）（而不是全解析（eager parsing））即可。预解析器确保输入的源代码包含有效语法，并生成足够的信息来正确地编译外部函数（outer function）。这个准备好的函数稍后将按需编译。

## 解析

解析器接收到扫描器生成的 token 后，现在需要生成一个供编译器使用的中间表示（intermediate representation）。

首先我们来讨论解析树（parse trees）。解析树，或者说 [具体语法树（CST，concrete syntax tree）](https://en.wikipedia.org/wiki/Parse_tree)将源语法表示为一棵树。每个叶子节点都是一个 token，而每个中间节点则表示一个语法规则（grammar rule）。在英语里，语法规指的是名词（noun）、主语（subject）等，而在编程里，语法规则指的是一个表达式（expression）。不过，解析树的大小随着程序大小会增长得很快。

相反，[抽象语法树](https://en.wikipedia.org/wiki/Abstract_syntax_tree) （abstract syntax tree，AST）要更加简洁。每个中间节点表示一个结构，比如一个减法运算（`-`），并且**这棵树并没有展示源代码的所有细节**。例如，由括号（parentheses）定义的分组是蕴含在树的结构中的。另外，标点符号（punctuation）、分隔符（delimiters）以及空白符（whitespace）都被省略了。你可以在 [这里](https://ruslanspivak.com/lsbasi-part7/) 了解更多 AST 和 CST 的区别。

::: tip AST 和 CST 的区别
可以总结一些解析树和抽象语法树的不同之处:

- AST不含有语法细节，比如冒号、括号、分号
- AST会压缩单继承节点
- 操作符会变成内部节点，不再会以叶子节点出现在树的末端。

有了抽象语法树，我们基于它可以**建立清晰的代码描述**，非常**有利于后续阶段的修改、变换**。
参见[AST系列(一): 抽象语法树为什么抽象 - 知乎](https://zhuanlan.zhihu.com/p/102385477)。
:::

接下来我们将重点放在 AST 上。以下面用 JavaScript 编写的斐波那契程序为例：

```js
function fib(n) {
  if (n <= 1) return n;
  return fib(n-1) + fib(n-2);
}
```

下面的 JSON 文件就是对应的[抽象语法](https://gist.github.com/alvinwan/845fd8ecbb559124271bfdc7bf4491f6)了。这是用 [AST Explorer](https://astexplorer.net/#/gist/638ea8b192e66137d361988bc7772f39/81a762666377d6bb1853d79409378b9f0233b67d) 生成的。（如果你不熟悉这个，可以点击这里来详细了解 [如何阅读 JSON 格式的 AST](https://blog.logrocket.com/using-typescript-transforms-to-enrich-runtime-code-3fd2863221ed/)）。

```json
{
  "type": "Program",
  "start": 0,
  "end": 73,
  "body": [
    {
      "type": "FunctionDeclaration",
      "start": 0,
      "end": 73,
      "id": {
        "type": "Identifier",
        "start": 9,
        "end": 12,
        "name": "fib"
      },
      "expression": false,
      "generator": false,
      "async": false,
      "params": [
        {
          "type": "Identifier",
          "start": 13,
          "end": 14,
          "name": "n"
        }
      ],
      "body": {
        "type": "BlockStatement",
        "start": 16,
        "end": 73,
        "body": [
          {
            "type": "IfStatement",
            "start": 20,
            "end": 41,
            "test": {
              "type": "BinaryExpression",
              "start": 24,
              "end": 30,
              "left": {
                "type": "Identifier",
                "start": 24,
                "end": 25,
                "name": "n"
              },
              "operator": "<=",
              "right": {
                "type": "Literal",
                "start": 29,
                "end": 30,
                "value": 1,
                "raw": "1"
              }
            },
            "consequent": {
              "type": "ReturnStatement",
              "start": 32,
              "end": 41,
              "argument": {
                "type": "Identifier",
                "start": 39,
                "end": 40,
                "name": "n"
              }
            },
            "alternate": null
          },
          {
            "type": "ReturnStatement",
            "start": 44,
            "end": 71,
            "argument": {
              "type": "BinaryExpression",
              "start": 51,
              "end": 70,
              "left": {
                "type": "CallExpression",
                "start": 51,
                "end": 59,
                "callee": {
                  "type": "Identifier",
                  "start": 51,
                  "end": 54,
                  "name": "fib"
                },
                "arguments": [
                  {
                    "type": "BinaryExpression",
                    "start": 55,
                    "end": 58,
                    "left": {
                      "type": "Identifier",
                      "start": 55,
                      "end": 56,
                      "name": "n"
                    },
                    "operator": "-",
                    "right": {
                      "type": "Literal",
                      "start": 57,
                      "end": 58,
                      "value": 1,
                      "raw": "1"
                    }
                  }
                ]
              },
              "operator": "+",
              "right": {
                "type": "CallExpression",
                "start": 62,
                "end": 70,
                "callee": {
                  "type": "Identifier",
                  "start": 62,
                  "end": 65,
                  "name": "fib"
                },
                "arguments": [
                  {
                    "type": "BinaryExpression",
                    "start": 66,
                    "end": 69,
                    "left": {
                      "type": "Identifier",
                      "start": 66,
                      "end": 67,
                      "name": "n"
                    },
                    "operator": "-",
                    "right": {
                      "type": "Literal",
                      "start": 68,
                      "end": 69,
                      "value": 2,
                      "raw": "2"
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    }
  ],
  "sourceType": "module"
}
```

上面代码的要点是，每个非叶子节点都是一个运算符（operator），而每个叶子节点都是操作数（operands）。这棵语法树稍后将作为输入传给 JavaScript 接着要执行的两个阶段。

## 三个技巧优化你的 JavaScript

下面罗列的技巧清单中，我会省略那些已经广泛使用的技巧，例如缩减（minifying）代码来最大化信息密度（information density），从而使扫描器更具有时效性（time-efficient）。另外，我也会跳过那些适用范围很小的建议，例如避免使用非 ASCII 字符（non-ASCII characters）。

提高解析性能的方法数不胜数，让我们着眼于其中适用范围最广泛的方法吧。

### 1.尽可能交给 worker 线程延迟执行

主线程被阻塞（blocking）会导致用户交互（user interaction）的延迟，所以应该尽可能减少（offloaded）主线程上的工作。关键就是要识别并避免会导致主线程中某些任务长时间运行（long-running tasks）的解析行为。

这种启发式（heuristic）超出了解析器的优化范围。例如，用户控制的 JavaScript 代码段可以使用 [web workers](https://blog.logrocket.com/using-webworkers-for-safe-concurrent-javascript-3f33da4eb0b2/) 达到相同的效果。你可以阅读 [实时处理应用](https://blog.logrocket.com/real-time-processing-web-workers/) 和 [在 angular 中使用 web workers](https://blog.logrocket.com/how-to-execute-a-function-with-a-web-worker-on-a-different-thread-in-angular/) 来了解更多信息。

#### 避免使用大量的内联脚本

内联脚本（inline scripts）是在主线程中处理的，根据之前的说法，应该尽量避免这样做。事实上，除了异步（asynchronous）和延迟加载（deferred loads）之外，任何 JavaScript 的加载都会阻塞主线程。

#### 避免嵌套外层函数

懒编译（Lazy compilation）也是发生在主线程上的。不过，如果处理得当的话，懒解析可以加快启动速度（startup time）。想要[强制进行全解析](https://blog.sessionstack.com/how-javascript-works-parsing-abstract-syntax-trees-asts-5-tips-on-how-to-minimize-parse-time-abfcf7e8a0c8)的话，可以使用诸如 [optimize.js](https://github.com/nolanlawson/optimize-js)（已经不维护）这样的工具来决定进行全解析（eager parsing）或者懒解析（lazy parsing）。

参考：[Blazingly fast parsing, part 2: lazy parsing · V8](https://v8.dev/blog/preparser#pife)

#### 分解超过 100kB 的文件

将大文件分解成小文件以最大化并行脚本的加载速度（parallelized script loading）。“[2019 年 JavaScript 的性能开销](https://v8.dev/blog/cost-of-javascript-2019#impact)”一文比较了 Facebook 网站和 Reddit 网站的文件大小。前者通过在 300 多个请求中拆分大约 6MB 的 JavaScript ，成功将解析和编译工作在主线程上的占比控制到 30%；相反，Reddit 的主线程上进行解析和编译工作的达到了将近 80%。

### 2. 使用 JSON 而不是对象字面量 —— 偶尔

在 JavaScript 中，解析 JSON 比解析对象字面量（object literals）来得更加高效。 [parsing benchmark](https://github.com/GoogleChromeLabs/json-parse-benchmark) 已经证实了这一点。在不同的主流 JavaScript 执行引擎中分别解析一个 8MB 大小的文件，前者的解析速度最高可以提升 2 倍。

[2019 年谷歌开发者大会](https://youtu.be/ff4fgQxPaO0) 也讨论过 JSON 解析如此高效的两个原因：

1. JSON 是单字符串 token，而对象字面量可能包含大量的嵌套对象和 token；
2. 语法对上下文是敏感的（context-sensitive）。解析器逐字检查源代码，并不知道某个代码块是一个对象字面量。而左大括号不仅可以表明它是一个对象字面量，还可以表明它是一个解构对象（object destructuring）或者箭头函数（arrow function）。

不过，值得注意的是，`JSON.parse` 同样会阻塞主线程。对于超过 1MB 的文件，可以使用 [FlatBuffers](https://google.github.io/flatbuffers/flatbuffers_guide_use_javascript.html) [提高解析效率](https://engineering.fb.com/android/improving-facebook-s-performance-on-android-with-flatbuffers/)。

参考：

- [what is the difference between json and javascript object.](https://www.cnblogs.com/malaikuangren/archive/2013/03/12/2956831.html)

### 3. 最大化代码缓存

最后，你可以通过完全规避（sidestepping）解析来提高解析效率。对于服务端编译来说， [WebAssembly](https://blog.logrocket.com/webassembly-how-and-why-559b7f96cd71/) (WASM)是个不错的选择。然而，它没办法替代 JavaScript。对于 JS，更合适的方法是最大化代码缓存。

值得注意的是，缓存并不是任何时候都生效的。在执行结束之前编译的任何代码都会被缓存 —— 这意味着处理器（handlers）、监听器（listeners）等不会被缓存。为了最大化代码缓存，你必须最大化执行结束之前编译的代码数量。其中一个方法就是使用立即执行函数（IIFE，Invoked Immediately Function Expression）启发式（heuristics）：解析器会通过启发式的方法标识出这些 IIFE 函数，它们会在稍后立即被编译。因此，使用启发式的方法可以确保一个函数在脚本执行结束之前被编译。

此外，缓存是基于单个脚本（per-script）执行的。这意味着更新脚本将会使缓存失效。V8 团队建议可以[分割](https://v8.dev/blog/code-caching-for-devs#split)脚本或者[合并](https://v8.dev/blog/code-caching-for-devs#merge)脚本，从而实现代码缓存。但是，这两个建议是互相矛盾的。你可以阅读“[JavaScript 开发中的代码缓存](https://v8.dev/blog/code-caching-for-devs)”来了解更多代码缓存相关的信息。

## 结论

解析时间的优化涉及延迟解析至 worker 线程以及通过最大化缓存来避免完全解析。理解了 V8 的解析机制后，我们也能推断出上面没有提到的其它优化方法。

下面给出了更多了解解析机制的资源，这个机制通常来说同时适用于 V8 和 JavaScript 的解析。

- [V8 文档](https://v8.dev/docs)
- [V8 博客](https://v8.dev/blog)
- [V8-perf](https://github.com/thlorenz/v8-perf)

## 参考

- [How JavaScript works: Optimizing for parsing efficiency - LogRocket Blog](https://blog.logrocket.com/how-javascript-works-optimizing-for-parsing-efficiency/)

::: warning 版权声明
本文翻译自[How JavaScript works: Optimizing for parsing efficiency](https://blog.logrocket.com/how-javascript-works-optimizing-for-parsing-efficiency/)，版权归原作者所有。
:::
