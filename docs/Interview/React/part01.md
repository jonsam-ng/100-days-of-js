# 第一部分

## 循环列表为什么要添加key？

::: info 扩展问题

- 为什么Vue中v-for需要绑定key属性？
- 为什么React中列表渲染需要添加key属性？
- 列表渲染中key属性有什么作用？为什么？
:::

Keys 是 React 用于追踪列表中元素被修改、添加或者移除的**辅助标识**。

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
- [列表 & Key – React](https://zh-hans.reactjs.org/docs/lists-and-keys.html#keys)
- [Understanding React's key prop](https://kentcdodds.com/blog/understanding-reacts-key-prop)
- [Index as a key is an anti-pattern | Robin Pokorny](https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/)

## React的严格模式如何使用，有什么用处？

StrictMode 是一个用来突出显示应用程序中潜在问题的工具。与 Fragment 一样，StrictMode **不会渲染任何可见的 UI**。它为**其后代元素触发额外的检查和警告**。 可以为应用程序的任何部分启用严格模式。StrictMode 目前有助于：

- 识别**不安全的生命周期**
- 关于使用过时字符串 ref API 的警告
- 关于使用**废弃的 findDOMNode 方法**的警告
- 检测**意外的副作用**
- 检测过时的 context API

```jsx
<React.StrictMode>        
  <App />
</React.StrictMode>   
```

## React必须使用JSX吗？

::: info 扩展问题

- React 为什么使用JSX?
:::

React 推荐但是并不强制要求使用 JSX。所谓 JSX（或者 TSX） 和 SFC 等只是组织组件的一种风格和方式，并不与视图框架绑定。React不一定使用 JSX（只需要转成createElement语法支持的JS文件即可。），但是JSX与React的内在渲染逻辑逻辑更搭配；Vue也可以使用 JSX，在 Vue3 中使用 Composition API 和 JSX 也很常用，比如 [vueComponent/ant-design-vue](https://github.com/vueComponent/ant-design-vue)。

React 为什么使用JSX?

- 功能上：构建 UI的方式。
- 思想上：渲染逻辑本质上与 UI 逻辑内在耦合。

参见[React 为什么使用JSX?](https://source.jonsam.site/react/tour/dr-1/#react-%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BD%BF%E7%94%A8-jsx)

## 为什么 React 17 之前需要显式引入 React，17 版本就不需要了呢？

参考：[为什么 React 17 之前需要显式引入 React，17 版本就不需要了呢？](https://source.jonsam.site/react/tour/react-basic-element/#%E6%89%A9%E5%B1%95)

## React.Children.map(children)和 `children.map` 有什么区别？

::: info 扩展问题

- `React.Children.map`的原理是什么？
:::

children 是一个 `ReactNodeList` 类型，类似于伪数组，在map时不会对为 `null` 或者 `undefined` 的数据进行处理，而 `React.Children.map` 中的map可以处理 `React.Children` 为 `null` 或者 `undefined` 的情况。

![image](https://cdn.staticaly.com/gh/jonsam-ng/image-hosting@master/2022/image.4idtodosm6c0.webp)

之所以要对 `React.Children` 为 `null` 或者 `undefined` 的情况进行处理，是因为 ReactNode 的类型包含了`null` 或者 `undefined`，参见：[ReactElement、JSX.Element 和 ReactNode 的区别](https://source.jonsam.site/react/tour/react-basic-children/#%E6%89%A9%E5%B1%95)

```ts
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
```

::: warning `children.map`是否处理`null`和`undefined`?

我编写了如下测试代码，发现 `children.map` 同样处理了 `null` 和 `undefined`。猜测如上的说法可能有误，如果 children 的原型是 `Array`，map 应该会处理 `null` 和 `undefined`，而不处理 `empty`。

```jsx
const Light = (props) => {
 const { children } = props;
 children.map((n) => {
  console.log("==>", { n });
 });
 useEffect(() => {
  console.log("==> children：", children);
  console.log("==> children type：", typeof children);
 }, []);
 return null;
};

function App(props: { children: ReactNode }) {
 console.log("==>", "render");
 return (
  <div className="App">
   <Light>
    <h1>111</h1>
    <span>222</span>
    {null}
    {undefined}
   </Light>
  </div>
 );
}

// output:
// ==> {n: {…}}
// App.jsx:8 ==> {n: {…}}
// App.jsx:8 ==> {n: null}
// App.jsx:8 ==> {n: undefined}
```

我认为`React.Children.map`和`children.map`两者的最大区别应该是 `Children.map` 会对 children 做扁平化的 map，即对内层的数组进行拉平。（参见[了解JavaScript中的伪数组](https://juejin.cn/post/6966525287110541348)中的源码）需要注意的是，`React.Children.map` 并不会对 `Fragment` 进行拉平。网络上的说法可能有误。
:::

::: tip 伪数组
JavaScript中存在有一种数组称为伪数组。经常见到的伪数组有函数的 `arguments` 对象、`document.querySelectorAll` 等获取的 `NodeList` 类（NodeList本身具有forEach方法）等。

伪数组并不是数组，它没有继承 `Array.prototype`，但是它“看起来像数组”，它本身没有数组的标准方法，但是它可以复用这些标准方法。只有concat方法是不通用的，对于一个伪数组，concat方法会将其作为一个整体连接起来。

参见：[了解JavaScript中的伪数组](https://juejin.cn/post/6966525287110541348)
:::

参见：

- [`React.Children.map`的原理是什么？](https://source.jonsam.site/react/tour/react-basic-children/#map)

## React 中的高阶组件运用了什么设计模式？

高阶组件（HOC）是 React 中用于**复用组件逻辑**的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。具体而言，**高阶组件是参数为组件，返回值为新组件的函数**。参见：[高阶组件 – React](https://zh-hans.reactjs.org/docs/higher-order-components.html)。高阶组件可以用于类组件，也可以用于函数式组件。通常以`withXXX`命名。

React 使用高阶组件代替 mixins 用于**解决横切关注点相关的问题**。参见[Mixins Considered Harmful](https://zh-hans.reactjs.org/blog/2016/07/13/mixins-considered-harmful.html)。

示例：

```jsx
function withWindowWidth(BaseComponent) {
  class DerivedClass extends React.Component {
    state = {
      windowWidth: window.innerWidth,
    }
    onResize = () => {
      this.setState({
        windowWidth: window.innerWidth,
      })
    }
    componentDidMount() {
      window.addEventListener('resize', this.onResize)
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.onResize);
    }
    render() {
      return <BaseComponent {...this.props} {...this.state}/>
    }
  }
  return DerivedClass;
}
const MyComponent = (props) => {
  return <div>Window width is: {props.windowWidth}</div>
};
export default withWindowWidth(MyComponent);
```

高阶组件使用了装饰器设计模式。装饰器模式（Decorator Pattern）允许向一个现有的对象添加新的功能，同时又不改变其结构。这种类型的设计模式属于结构型模式，它是作为现有的类的一个包装。参考：[装饰器模式 - 设计模式](http://docs.jonsam.site/project-5/doc-100/)。

## 类组件和函数组件有何不同？

::: info 扩展问题

- 从原理的角度剖析类组件和函数组件的异同？
- 为什么在React中可以混合使用类组件和函数式组件？
:::

### 在React16.8版本之前

在 React 16.8版本（引入钩子）之前，使用基于类的组件来创建需要维护**内部状态**和**生命周期**的组件。基于类的组件是 ES6 类，它继承了 React 的 Component 类，并且至少**实现了render()方法**。函数组件是**无状态的**，**返回要呈现的输出**，渲染 UI 只依赖于 props。函数式组件比类组件更简单、更具性能。

### 在React16.8版本之后

<!-- TODO -->

参考：

- [Functional vs Class-Components in React | Medium](https://djoech.medium.com/functional-vs-class-components-in-react-231e3fbd7108)
- [Functional Components vs Class Components in React](https://www.freecodecamp.org/news/functional-components-vs-class-components-in-react/)

## 为什么调用 setState 而不是直接改变 state？

::: info 扩展问题

- 从原理的角度谈一谈直接修改state会出现什么问题？
- React中直接修改state是否能够更新视图？为什么？
- React 中setState后是如何更新到视图的？这个过程需要注意什么问题？
- 为什么在大多数情况下setState更新视图是异步的？
:::

如果您尝试直接改变组件的状态，React 将无法得知它需要重新渲染组件。通过使用setState()方法，React 可以更新组件的UI。

<!-- TODO -->
