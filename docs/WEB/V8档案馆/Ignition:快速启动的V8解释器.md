# Ignition:快速启动的V8解释器

## 目录

[[TOC]]

## 原文

<Pdf src="/v8/Ignition_ Jump-starting an Interpreter for V8.pdf" />

## 为什么我们钟情于JavaScript

- Web的语言
- 程序由源代码发布，paring 和 compiling 必须足够快
- 无类型：变量和属性都没有类型，值是由类型
- 基于原型链的 object 模型
- 闭包（closures）带来的函数式特性
- 一些有趣的功能
  - Eval()支持在函数中动态执行运行时生成的语句
  - 奇怪的作用域（scoping）规则
  - 默认值和隐式类型转换
  - ...

### 简单示例

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.7hccvkzv4bs0.webp)

### 语义一瞥

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.176679bow940.webp)

### 万物皆函数

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.4ujoz52jyia0.webp)

### 除非存在闭包

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.2cs7bwgaqnwg.webp)

### 有趣的 eval()

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.1lxz5cskdco0.webp)

## V8方法

### V8 历史

省略。

### Full-Codegen简述

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.5jwnh11guaw0.webp)

### Hidden Classes

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.yydwru79l40.webp)

### Inline Caches (ICs)

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.3oqyt297zrs0.webp)

### Crankshaft一瞥

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.4h1dokawnr00.webp)

### Deoptimization - 永远有个备用方案

- 在推测优化之前插入反优化点

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.5ax013i3kq40.webp)

- Crankshaft需要为反优化点重建一个堆帧来模拟Full-Codegen的执行

### TurburFan - 另一个Optimizing Compiler？

Crankshaft 很好，但是有一些缺点：

- 无法扩展到全部的现代的JavaScript
  - try-catch, for-of, generators, async/await
- 高度依赖于deoptimization
  - 性能缺陷和反优化循环
- 受限的类型分析和传播
  - 不适合asm.js风格的优化
- 和Full-codegen紧耦合
- 高移植（porting）负载

### TurboFan

- 节点海（Sea of Nodes）
  - 放宽大多数操作的求值顺序(值边)
  - CFG的骨架(控制边)和状态操作(副作用边)
  - 提供更好的冗余代码消除和更多的代码移动
- 三级IR
  - JavaScript：JavaScript过载的操作符
  - 简化:虚拟机操作，如分配、数字运算等
  - 机器:机器级操作，例如int32加法

### Sea of Nodes

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.15zjcesboeow.webp)

## 把解释器改装成移动的引擎

### 为什么需要解释

参见：[V8:连接Ignition与Turbofan](/WEB/V8%E6%A1%A3%E6%A1%88%E9%A6%86/V8:%E8%BF%9E%E6%8E%A5Ignition%E4%B8%8ETurbofan)

### Ignition的目标

- 减少内存使用量
  - 编译为字节码比机器码小4x。
  - 减少总共的代码内存占用2x。
- 减少启动时间
  - 更快的编译为字节码
  - 减少延迟编译的重新解析，优化重新编译
- 降低复杂性
  - 字节码作为真实的来源
  - 简化编译管道

### Ignition的挑战

- 不能降低性能
- 在9种CPU架构上100%支持JavaScript。
- 与V8运行时结合（类型反馈、object 模型、GC等等）。
- 支持debugger和实时编辑
- 支持两种pipelines（Crankshaft和TurboFan）

### Ignition的设计决策

- 聚焦于降低代码体积
  - 间接线程字节码分发
  - 累加器作为隐式输入/输出
- 仍然保持足够快的数速度
  - 使用宏汇编语言（体系结构无关的）的手工编码
  - 寄存器机器
- 字节码可以直接用于构建TurboFan图
  - 字节码是唯一数据源
  - 更简单的去优化执行模型

### Ignition字节码

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.3tbljw7w5xm0.webp)

### Ignition Bytecode Pipeline

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.4yudpffu6ps0.webp)

### 构建Ignition解释器

- C++编写
  - Need trampolines between Interpreted and JITed functions
  - Can’t interoperate with fast code-stubs
- 手工编写的汇编代码
  - 需要适配9种架构
- 以TurboFan Compiler为后端
  - 宏汇编一次编写
  - 自由的架构特定指令选择优化
  - 与现有代码存根（code-stubs）的相对轻松的互操作性

### TurboFan Pipeline

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.4kuqjlu0bkm0.webp)

## 总结

- JavaScript 很难
- V8 很复杂
- 解释器(有时)可以击败JIT……但这需要很多工作!

## Ignition Bytecodes

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.503vcy51qa40.webp)

## 参考

- [DLS Keynote: Ignition: Jump-starting an Interpreter for V8 - Google Slides](https://docs.google.com/presentation/d/1HgDDXBYqCJNasBKBDf9szap1j4q4wnSHhOYpaNy5mHU/edit#slide=id.g1357e6d1a4_0_58)
