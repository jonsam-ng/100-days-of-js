# 第一部分

## 循环列表为什么要添加key？

::: info 扩展问题

- 为什么Vue中v-for需要绑定key属性？
- 为什么React中列表渲染需要添加key属性？
- 列表渲染中key属性有什么作用？为什么？
:::

渲染列表时添加key属性是基于VDOM的视图框架的共同属性，其主要目的是为了**重用VNode**（虚拟节点）。React和Vue框架都是基于VDOM的框架，无论是React中JSX中的for循环渲染列表，还是Vue中`v-for`指令需要绑定key属性，都是为了复用列表节点，以提升细粒度渲染更新的效率。

列表渲染往往伴随着大量的节点的增加、删除和更新操作，但是其中大部分重新渲染是可以通过节点复用来避免的。为什么复用节点如此重要？因为对于VDOM而言，提升效率最显著的方法就是提升DIFF算法的效率，提升DIFF算法的效率的最好方法就是复用节点。虽然虚拟节点的新建成本相对较低，但是虚拟节点反映在DOM上的更新则成本较高，毕竟更低的DOM更新成本是视图框架性能的直接指标。

列表在节点中具有特殊性，因为长列表往往带来较大的DIFF面积，同时列表的增删、更新操作较为频繁，这是节点渲染的性能瓶颈之一。但是只要对节点进行较好的追踪和复用，往往能够大大降低列表更新的成本。`key`属性是视图框架内部追踪节点的重要手段，`key`值相同，视图框架则认为是同一节点，因此可以相应的精准的做细粒度更新。同时，如果`key`值紊乱，则可能在列表更新时出现意想不到的问题，例如列表顺序紊乱、复杂节点的状态丢失、节点焦点丢失等问题。因此，为每一个节点维护业务相关的、唯一的`key`值是保证程序的正确性和稳定性的重要环节。

::: info Vue通过 key 管理状态
Vue 默认按照“就地更新”的策略来更新通过 `v-for` 渲染的元素列表。当数据项的顺序改变时，Vue 不会随之移动 DOM 元素的顺序，而是就地更新每个元素，确保它们在原本指定的索引位置上渲染。

默认模式是高效的，但**只适用于列表渲染输出的结果不依赖子组件状态或者临时 DOM 状态 (例如表单输入值) 的情况**。

为了给 Vue 一个提示，以便它可以**跟踪每个节点的标识**，从而**重用和重新排序现有的元素**，你需要为每个元素对应的块提供一个唯一的 key 属性。

参见：[列表渲染 | Vue.js](https://cn.vuejs.org/guide/essentials/list.html#maintaining-state-with-key)
:::

::: tip React中DIFF算法和key属性的原理
参见：[reconcileChildrenArray](https://source.jonsam.site/react/tour/react-reconciliation-5/#reconcilechildrenarray)。

有趣的是，SolidJS 中[`<For>`](https://www.solidjs.com/docs/latest/api#for)并不需要key值，Github中有相应的讨论，参见[How to specify key in \<For\> each？](https://github.com/solidjs/solid/discussions/366)
:::

扩展：

- [基于 VDOM 的框架之特性](https://source.jonsam.site/solid/render/render-by-jsx/#%E5%9F%BA%E4%BA%8E-vdom-%E7%9A%84%E6%A1%86%E6%9E%B6%E4%B9%8B%E7%89%B9%E6%80%A7)