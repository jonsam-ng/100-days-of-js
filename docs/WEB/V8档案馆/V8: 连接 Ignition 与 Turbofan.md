# V8: 连接 Ignition 与 Turbofan

## 目录

[[TOC]]

## 原文

<Pdf src="/v8/V8_ Hooking up the Ignition to the Turbofan.pdf" />

## Ignition + Turbofan pipeline

为什么做个新的 pipeline？

- 减少内存使用量

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.6g6x5se4frw0.webp)

- 减少启动时间

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.lki4m6ephow.webp)

parsing 和 compiling 总共占用总时间的33%。

- 降低复杂性

### Compiler Pipeline (2008)

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.20cza8gv1r40.webp)

2008 Full-Codegen：

- 具有隐藏类（hidden classes）和内联缓存（inline caching），快速遍历 AST 的 JIT 编译器（AST-walking JIT compiler ）
- 缺点：无优化的即时编译（non-optimizing JIT）

2008年，此时是将源代码直接编译为机器码，因此称之为 `Full-Codegen`；JIT编译器还不够成熟，没有优化的及时编译，生成半优化的代码。

### Compiler Pipeline (2010)

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.7l5wtuczsb40.webp)

2010 – Crankshaft：

- 使用类型反馈和去优化（deoptimization），优化即时编译器（Optimizing JIT compiler）。
- 缺点：不能扩展到现代 JavaScript，严重依赖去优化，有限的静态类型分析（limited static type analysis），与 Codegen 紧密耦合（tightly coupled to Codegen），高移植开销（high porting overhead）。

2010年使用 Crankshaft 的 V8 有了优化编译器，同时有了去优化的概念，但是 Crankshaft 的优化存在一定的局限性。

### Compiler Pipeline (2015)

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.11l0dcuuyrv4.webp)

2015 – TurboFan

用类型和范围分析（type-and-range analysis）优化即时编译器，节点海（sea of nodes）。

### Compiler Pipeline (2016)

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.2ntl6lqyw3k.webp)

2016年，在 Crankshaft 和 TurboFan（涡轮增压器风扇）的基础上，出现了 Ignition（点火, 点燃） ，其中 Ignition 将不同于 Full-codegen，Ignition 将 AST 转换为字节码，而 TurboFan 将字节码转换为机器码。

### Compiler Pipeline (Svelte Devices)

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.1zts2eu7t9og.webp)

### Compiler Pipeline (2017)

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.5d83rdxwgko0.webp)

显然在 2017 年之后，Ignition 和 TurboFan 成为了主线，而 Full-codegen 和 Crankshaft 则被淘汰。在 Parser 将 source code 转换为 AST 之后，随后的 Compiler 工作就交给了 Ignition 和 TurboFan，Ignition 将 AST 转化为 Bytecode，Bytecode 将被优化，随后 TurboFan 将 Bytecode 转化为 Native Code。

## Bytecode 到 graph

### Ignition 到 Turbofan

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.3t94xnsttby0.webp)

在这里我们可以看到源代码文本在经过 Ignition 的编译下变成字节码，并且子节点在 TurboFan 中被构建为“节点海”。

### 字节码对简化节点图构建的限制

- 始终选择字节码
- 作用域良好的基本块
  - 异常处理程序覆盖单个线性范围的字节码
- 没有不可约（irreducible）控制流
- 单个反向分支到循环报头
- 以循环闭合形式寄存器

### 字节码的静态分析

- 构建图之前的字节码预分析
  - 活性分析(用于去优化框架状态)
  - 环路分配分析(对于环路的缺陷)
- 不要生成无用节点
  - 避免内存过载（每个节点40+字节）
  - 避免节点遍历

### 活性分析

- 基本块的预先迭代遍历
  - 在图形构建过程中创建活动映射和状态值节点
  - 之后基于活性重新创建状态值节点
- 现在迭代遍历字节码数组
  - 只创建一次状态值节点

### 解决复杂控制(生成器)

- Javascript生成器可以在任意点生成（yield）表达式
  - 会引入不可约控制流
  - 解决方案:在开头和循环头的隐藏tokens上转换为switch语句
  - 结果:Turbofan不需要知道任何关于generator控制流程的知识

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.6ytglgjefcg0.webp)

### 解决复杂控制(try-finally)

- try-finally异常处理器
  - 根据触发finally块的内容不同，以不同方式退出(fall-through, return或throw)
  - 解决方法:在finally块的末尾的switch语句
  - 结果:Turbofan不需要知道任何关于try-finally控制流的信息

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.12gwuscc9wow.webp)

## 性能结果

### 代码内存使用（真实的网站）

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.26j7ojd6vhds.webp)

### Ignition vs Full-Codegen

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.18u1dqriv9b4.webp)

### Octane Performance

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.7bqi8f08iug0.webp)

### 时间花在了哪里（真实的网站）

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.4ctg7c5pona0.webp)

## 总结

- Ignition + Turbofan 是 V8 的未来
- 对字节码的限制可以简化优化的图创建
- 针对现实世界的优化暴露了不同的权衡

## 参考

- [V8: Hooking up the Ignition to the Turbofan - Google Slides](https://docs.google.com/presentation/d/1chhN90uB8yPaIhx_h2M3lPyxPgdPmkADqSNAoXYQiVE/edit#slide=id.g1357e6d1a4_0_58)
