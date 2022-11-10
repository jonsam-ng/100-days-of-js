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

## 参考

- [V8: Hooking up the Ignition to the Turbofan - Google Slides](https://docs.google.com/presentation/d/1chhN90uB8yPaIhx_h2M3lPyxPgdPmkADqSNAoXYQiVE/edit#slide=id.g1357e6d1a4_0_58)
