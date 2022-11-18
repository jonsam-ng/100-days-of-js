# 第一部分

## 什么是 MVVM、MVC 模型？

### 什么是MVC和MVVM

::: info 扩展问题

- 结合框架，谈谈你对 MVC 和 MVVM 的理解？
- 你如何在项目中运行 MVC 和 MVVM？
:::

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.1x9tba30pckg.webp)

::: info 分层思想
MVC 确实是分层思想的体现，但是分层思想往往有更多的体现。分层思想在分解大问题、同时兼顾模块之间的流通性这一点上很有效。分层思想在计算机科学中有很多的体现，比如OSI网络的7层模型、服务端的业务分层（接入层、业务层、数据层等，注意这与[DDD](https://www.wikiwand.com/zh-hans/%E9%A0%98%E5%9F%9F%E9%A9%85%E5%8B%95%E8%A8%AD%E8%A8%88)的领域模型不同，分层往往是竖向的，领域常常是横向的）、网络请求中常用的洋葱模式等。
:::

::: warning MVC 在项目中的应用
MVC 在项目中的应用实际上要比上述描述的更为复杂。一个 Controller 往往描述一类相关的业务处理或者同领域的处理（项目较小的情况下），Model 层之上往往还有一个 Service 层，以便对 Model 的交互进行基于业务无关的聚合。在这一点上，[EggJS](https://github.com/eggjs/egg) 可以处理的很规范。可以从 EggJS 标准的[目录结构](https://www.eggjs.org/basics/structure)取了解企业项目中是如何实践MVC。

```js
egg-project
├── package.json
├── app.js (optional)
├── agent.js (optional)
├── app
|   ├── router.js
│   ├── controller
│   |   └── home.js
│   ├── service (optional)
│   |   └── user.js
│   ├── middleware (optional)
│   |   └── response_time.js
│   ├── schedule (optional)
│   |   └── my_task.js
│   ├── public (optional)
│   |   └── reset.css
│   ├── view (optional)
│   |   └── home.tpl
│   └── extend (optional)
│       ├── helper.js (optional)
│       ├── request.js (optional)
│       ├── response.js (optional)
│       ├── context.js (optional)
│       ├── application.js (optional)
│       └── agent.js (optional)
├── config
|   ├── plugin.js
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.test.js (optional)
|   ├── config.local.js (optional)
|   └── config.unittest.js (optional)
└── test
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js
```

另外，随着前后端分离趋势的流行，现在更多的项目已经去除了 View 层，如果从大前端的角度去思考这一现象，我们可以说，View 已经分离成了“大前端”，其实这也是分层思想日益深入改革的侧面体现。

注意：MVC只是一种模型范式，不是固定不变的“模板”。在业务需求需要时，我们可以随时“扩展”、“删改”这种结构，以便使我们的工程更加符合业务开发需求。
:::

MVVM：MVVM 即 Model-View-ViewModel，(模型-视图-控制器)它是一种双向数据绑定的模式， 用 viewModel 来建立起 model 数据层和 view 视图层的连接，数据改变会影响视图，视图改变会影响数据。

关于MVC和MVVM我们其实可以有更加深入的理解：

### 什么是 View 和 Model?

View 表征视图，是**数据以某种方式下的呈现**，Model 表征模型（数据），是**数据以某种方式下的存储和持久化**。

在 MVC 中，我们通常以 HTML 、HTML 模板（由模板引擎所驱动）、响应式组件和应用（由前端声明式的框架如 Vue、React 等所驱动）来作为 View 的部分，这通常应用于 SSR（服务端渲染） 的场景。而将现实世界中的实体（如 OOP 中的对象或者 DDD 中的领域实体）由逻辑模型映射到数据存储中的具体的数据结构（如 MySQL 中的数据表的条目），这一部分由逻辑模型到物理模型的转换我们称之为 Model 部分。如ORM 正是属于这一领域。

由于 SPA 和前后端分离架构的流行，SSR 中常用的 MVC 被分离到客户端和服务端两个部分中，其中 Model 和 Controller 仍然保留在服务端，以 RESTful 的方式（或者其他方式）呈现，而 View 则被分隔在客户端，由各种的视图渲染框架封装为声明式的组件结构和响应式的视图更新的渲染方式。由此原因，MVVM 的概念便就此诞生。

::: warning 元框架SSR的复兴
近几年来，各种元框架（元框架是框架组合的框架，元框架基于各种底层流行框架二次开发，解决业务中更多上层开发问题，元的概念可以参考”元搜索引擎“）又流行了起来，如基于 React 的 [NextJS](https://nextjs.org/) 和基于 Vue 的 [NuxtJS](https://nuxtjs.org/) 等。元框架在[2022年的 ViteConf](https://www.bilibili.com/video/BV1ne4y1i7uy/) 上成为重要的议题之一，获得了广泛的关注。更多内容可以参考[What Is a JavaScript Meta-Framework?](https://www.ombulabs.com/blog/javascript/what-is-a-javascript-meta-framework.html)
:::

在 MVVM 中（以 Vue 为例），框架更多的是对 VM（即 ViewModel）的部分做了封装（主要是 Reactivity 的部分），此时 View 的部分则抽象为框架对应用的视图渲染（或者说浏览器所呈现的 UI 界面，即 paint），这部分可以是 Vue 中基于 SFC 的 `template` 标签中的模板模型，也可以是 React 中的基于 JSX 的模型，总之这都是UI 框架对于组件的视图的逻辑表现的表征和定义。Model 的部分则抽象为组件生命周期之中的数据的来源，例如组件挂载或者点击事件中的接口请求、从本地存储中获取数据、从 websocket 中读取数据等。

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.6p75vdnhs9s0.webp)

### 什么是 Controller?

Controller 或者 MVVM 中的 VM 是 View 和 Model 沟通的桥梁。

在 MVC 中，任何 Model 中的数据都要通过 controller 的处理以传递给 View，**Controller 关注的是业务本身**，**而 Model 关注的是数据本身**，因此两者分别位于简洁架构（clean architecture）中的领域层和适配器层，因此通常而言，两者中还有一层服务层（Service）的封装，用于对数据做业务无关的结构化的处理。View 中的数据也需要通过 Controller 传递到 Model 进行相应的鉴权、处理、存储等服务，如form 表单标签的 action 属性将表单的内容发送给 controller 进行处理。

在 MVVM 中也很类似，只不过要更为抽象一些。以 Vue 为例，ViewModel 最大的功能是实现了双向绑定，即**视图和数据的双向更新**。视图中的数据的变化将通过 VM 中的事件系统或响应式系统（如 v-model）（或者组件的生命周期钩子）回调相应的处理函数，这些处理函数将对数据做进一步的处理（更常见的是发送请求给服务端）。同理的，当组件的生命周期或者处理函数请求到一些数据（通常是向服务端请求数据），这些数据会被交给 VM 的响应式系统做处理，响应式系统将对视图做细粒度的更新。

### View 和 Model 的关系

**视图依赖于数据（视图呈现，即视图的静态表现），同时视图也产生数据（视图的响应性和交互性，即视图的动态表现）。**

**从生产者和消费者的角度来看，View 和 Model 可以互为生产者和消费者。这也是两者可以双向绑定的逻辑原因。**

那么 View 和 Model 两者之间是如何双向跨越的呢？从 Model 和 View，我们通常称之为 “渲染（render）”、脱水(hydration)。从 View 和 Model，我们通常称之为 “副作用（effect）”（通常来说，副作用的概念可能要比Model更宽泛，参见React中[useEffect](https://zh-hans.reactjs.org/docs/hooks-reference.html#useeffect)，或者SolidJS中[createEffect](https://www.solidjs.com/docs/latest/api#createeffect)），这种“副作用”通常是以组件的生命周期或者事件系统的响应为“时机”的。

### 从简洁架构看View 和 Model 的关系

从简洁架构来看，View 和 Model 分别位于**适配器层和领域层**，其核心内涵分别为**业务服务和领域实体**。参见下图：

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.3rs2c7yoxp00.webp)

注意：在简洁架构中，并不将 ORM、数据库之类的数据存储划分到 Model 层，而是将之视为视图层的基础设施，这对于分布式的存储服务更具有友好性。以上仅对简洁架构和 MVC 做类似，对不能以偏概全。

从 Web 服务到 DB 的双向跨越实际上更类似于洋葱模型（参见[koa洋葱模型解析](https://github.com/qiuyaofan/Blog/issues/3)，洋葱模型广泛用于中间件、网络框架中，如 koa、axios 等），中间要跨越应用层和领域层。这也是简洁模型带给我们的新的模型分析思路。

参见我的这一篇回答：[View 是如何改变 Model 的？ - 知乎](https://www.zhihu.com/question/557763619/answer/2709059931)
