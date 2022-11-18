# 第一部分

## vue 双向数据绑定的原理？

::: info 扩展问题

- 谈谈你对 Vue 框架响应式的理解？
:::

vue2 是采用数据劫持结合**发布者-订阅者模式**的方式，通过`Object.defineProperty()`来劫持各个属性的`setter`，`getter`，在数据变动时发布消息给订阅者，触发相应的监听回调。

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.69ej7dwiihg0.webp)

具体步骤：

- 第一步： 对需要 observe 的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和getter。此后给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。

- 第二步： compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知就更新视图。

- 第三步： Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是:

  - 在自身实例化时往属性订阅器(dep)里面添加自己
  - 自身必须有一个 update() 方法
  - 待属性变动 dep.notice() 通知时，能调用自身的 update() 方法，并触发 Compile 中绑定的回调。

- 第四步：MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化， 通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新； 视图交互变化(input) -> 数据 model 变更的双向绑定效果。

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.68xslsonino0.webp)

::: info
`v-model` 本质上是 `v-on`(`@input`等) 和 `v-bind` 结合使用的语法糖。参见[v-model | Vue.js 技术揭秘](https://ustbhuangyi.github.io/vue-analysis/v2/extend/v-model.html)。

```js
<input v-bind:value="message" v-on:input="message=$event.target.value">
```

:::

::: tip Vue3 中的双向绑定
在Vue3中，已经使用了 `Proxy API` 代替 `Object.defineProperty`。这只是对 Reactivity 的部分做了改进，总体的双向绑定的原理并不会变化。双向绑定就是视图和数据的双向联动，其中最为重要的部分就是数据是如何响应式的引起视图的更新的。这一部分在上述 `Observer`、`Watcher`和`Compiler`的关系中已经讲的很清楚了。

比较值得注意的是，可能大家会疑惑这种双向绑定的更新关系为什么不会造成更新循环？这是因为大家潜移默化间引起对的**视图引起数据更新**的误解，事实上，由 `Event listener` 所驱动的事件系统是间接通过数据来更新视图的，也就是说我们在 `input` 中输入数据所造成的更新需要由 vue 的事件系统所接管（不是原生事件系统所接管！），然后走”数据->视图“的更新过程。也就是说这种双向绑定并不是可循环传导的闭环，而是一种响应性意义上的闭环。

Vue 中的双向绑定和 React 中的基于 state 和事件回调的”双向绑定“实际上是大有区别的，虽然从效果上来看差不多。从严格意义上来说，React 没有”响应性“的概念！Vue 中的 VM 是一个很标准的响应式系统，但是 React 中的响应式是不是标准的响应式。React 更倾向于是”时间和状态驱动“的”响应式“，state 在两次渲染之间是完全静态的，而时间回调只是驱动状态更新和重新渲染的一种方式而已。
:::

## vue2 的生命周期有哪些？

::: info 扩展问题

- 谈谈你对 Vue2 生命周期的理解？
- 你如何理解组件的生命周期？
- 谈谈你对前端框架使用生命周期的看法？
:::

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.2y19ojqsvhm0.webp)

vue 实例从创建到销毁的过程就是生命周期，也就是从开始创建、初始化数据、编译模板、挂载DOM -> 渲染、更新 -> 渲染、准备销毁、销毁等一系列过程。vue 的生命周期常见的主要分为4 大阶段 8 大钩子函数，另外三个生命周期函数不常用：`keep-alive` 主要用于保留组件状态或避免重新渲染。`activated` 只有在 `keep-alive` 组件激活时调用；`deactivated` 只有在 `keep-alive` 组件停用时调用；`errorCaptured` 当捕获一个来自子孙组件的错误时被调用，此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串，此钩子可以返回 false 以阻止该错误继续向上传播。

- 创建前/后：在beforeCreate生命周期函数执行的时候，data 和 method 还没有初始化；在created 生命周期函数执行的时候，data 和 method 已经初始化完成；
- 挂载前/后：在beforeMount 生命周期函数执行的时候，已经编译好了模版字符串、但还没有真正渲染到页面中去；在mounted 生命周期函数执行的时候，已经渲染完，可以看到页面。
- 更新前/后：在beforeUpdate生命周期函数执行的时候，已经可以拿到最新的数据，但还没渲染到视图中去；在updated生命周期函数执行的时候，已经把更新后的数据渲染到视图中去了。
- 销毁前/后：在beforeDestroy 生命周期函数执行的时候，实例进入准备销毁的阶段，此时 data、methods、指令等还是可用状态；在destroyed生命周期函数执行的时候，实例已经完成销毁、此时data、methods、指令等都不可用。

::: tip 如何理解组件的生命周期
此处的生命周期的概念必须依赖于组件，包括编写代码时的思维方式也不能脱离组件。生命周期就是对事物发展的过程进行阶段的划分，对于每个细分的过程允许外界扩展甚至改变事物发展的行为方式，但是无法改变发展周期本身。实现生命周期是对复杂的任务的一种细分、扩展并且降低复杂性的有效方法。

实现生命周期的常用方法就是钩子（Hook，注意这里的Hook和React中的Hooks不同）机制。在某些静态的切面点注册（插入）一系列的包含各种逻辑的钩子函数。我们甚至可以控制钩子函数的执行行为，比如同步执行、异步执行、Waterfall、Bail、Loop等，参见[Tapable | Fancy Front End](https://source.jonsam.site/webpack/tapable/api/#%E6%A6%82%E5%BF%B5)。

使用钩子函数可以极大地提升程序的灵活性、可扩展性，降低任务的复杂性。但是也会带来一些问题，比如不可预测的程序执行行为（比如错误的钩子使用）、较高的学习成本（用户需要对每种钩子的特点、习性进行了解）、代码结构的复杂度增加、维护成本升高、可读性差。

目前大多前端框架仍然使用（或者兼容）生命周期的方法，如 Vue3兼容 Vue2的生命周期、React Class Component类组件的生命周期。
:::

::: tip 我对前端框架使用生命周期的看法
尽管现在大多前端框架仍然保留或者兼容了生命周期的语法和API，我认为其流行度正在逐渐消退。从产品的角度来讲，其实用户不应该关注所谓组件的生命周期，用户应该将关注点放到数据本身上来。React 在实践这一点上做出了很好的典范，React Hooks 首次试图以”副作用“来取代我们基于生命周期的思维方法。副作用是什么，副作用是一系列具有风险性、不确认性和复杂性的操作，这种操作往往是危险的，因为我们无法确保”副作用“操作能给你期望的结果。我们利用钩子将这些不确定的”副作用“插入到生命周期的各个环节之中无疑是危险的。这就是正在使用生命周期的框架所面临的风险。

React 意识到这个问题，`useEffect` 和 `useLayoutEffect` 试图从”副作用“的角度来解决这个问题。用户将”副作用“通过上述API委托给React，React 则根据”副作用“的依赖选择合适的时机进行处理，因此用户将摆脱生命周期的桎梏（注意，React无法自动追踪依赖是React自身的问题，稍后会说明这一点）。`useEffect`将”副作用“放在渲染后的调度器第一次回调时执行，`useLayoutEffect`则将”副作用“放在本次渲染的`Commit`阶段的`Layout`步骤之后同步执行（多用于三方库）。可见`useEffect`足以解决各种副作用的场景，这也是 React Hooks 的一大亮点。

尽管React `useEffect` 有诸多问题，比如自动追踪依赖问题，我认为这是由React的内部机制的特殊性导致的，因为React没有真正的 Reactivity，所以实现自动依赖追踪比较复杂。但是有了这个很好的开始，”副作用“的概念正在被其他的框架所发掘，在 Vue3 的 Composition API 中，[`watchEffect`](https://vuejs.org/api/reactivity-core.html#watcheffect) 这样的API被开放出来。可以参照下面的示例代码：

```js
watchEffect(async (onCleanup) => {
  const { response, cancel } = doAsyncWork(id.value)
  // `cancel` will be called if `id` changes
  // so that previous pending request will be cancelled
  // if not yet completed
  onCleanup(cancel)
  data.value = await response
})
```

Vue3、SolidJS、Svelte 等这样的具有纯正响应式系统的框架可以轻易的实践这一点。另外，Vue3 和 React 中的”副作用“和”响应式“其实还是在组件框框之内的，因为 state（ref、reactive）是组件的状态，而副作用由于依赖项的缘故也不得不依赖于组件。而更激进的 SolidJS 则是完全打破了这两点限制，其状态可以不依附于组件（成为了共享的状态），”副作用“亦然。这是 SolidJS 的一大特点，也是我看好 SolidJS 的原因之一，参见[Vanishing Components](https://www.solidjs.com/guides/getting-started#2-vanishing-components)。
:::

## v-if 和 v-show 有什么区别？

v-if 是“真正”的条件渲染，因为它会确保在**切换过程中条件块内的事件监听器和子组件适当地被销毁和重建**， 操作的实际上是 dom 元素的创建或销毁。

v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地**基于 CSS 进行切换**， 它操作的是display:none/block属性。

一般来说， v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 v-show 较好； 如果在运行时条件很少改变，则使用 v-if 较好。
