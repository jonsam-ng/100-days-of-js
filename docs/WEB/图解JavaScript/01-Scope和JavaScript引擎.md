# 图解JavaScript之作用域与JavaScript引擎

<Badges :content="[{type: 'tip', text:'JavaScript'}]" />

## 目录

[[TOC]]

## 作用域与作用域链

现在该讲作用域链了。在本文中，我假设你了解执行上下文的基础知识。😃

我们来看看如下代码：

```js
const name = "Lydia"
const age = 21
const city = "San Francisco"

function getPersonInfo() {
  const name = "Sarah"
  const age = 22

  return `${name} is ${age} and lives in ${city}`
}

console.log(getPersonInfo())
```

我们在调用`getPersonInfo()`函数，该函数返回一个字符串，其中包含`name`、`age`和`city`变量的值：`Sarah is 22 and lives in San Francisco`。不过，`getPersonInfo()`函数并没有包含名为`city`的变量，它是如何知道`city`的值的呢？

首先，内存空间是为不同的上下文设置的。我们有默认的**全局上下文（global context）**（在浏览器中是`window`，在Node中是`global`），以及针对已被调用的`getPersonInfo()`函数的**本地上下文（local context）**。每个上下文还有一个**作用域链（scope chain）** 。

对于`getPersonInfo()`函数，作用域链看起来像这样：

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--57Tstr0c--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/89b9buizhevs0jf6djyn.png)

作用域链就是对对象的“引用链”（chain of references），这些对象包含对在该执行上下文（execution context）中可引用的值（和其他作用域）的引用。（⛓：“嘿，这些都是你可以在此执行上下文中引用的值”）。作用域链是在创建执行上下文时创建的，这意味着它是在运行时（runtime）创建的！

但是，在本文中，我一般不会讨论活动对象（Activation Object）或执行上下文（execution context），我们只关注作用域！在如下的示例中，执行上下文中的键/值对表示作用域链中含有的对变量的引用。

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--3L9mEScA--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/iala2et7bg9bgdj4c2lg.png)

全局执行上下文的作用域链有对3个变量的引用：值为`Lydia`的`name`，值为`21`的`age`，以及值为`San Francisco`的`city`。在本地执行上下文中，有对2个变量的引用：值为`Sarah`的`name`，以及值为`22`的`age`。

当我们试图访问`getPersonInfo()`函数中的变量时，引擎会首先检查本地作用域链（local scope chain）。

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--e_017_sT--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/xn17f0t54acz8tiq7122.gif)

本地作用域链中有对`name`和`age`的引用！`name`的值为`Sarah`，`age`的值为`22`。但是现在，试图访问`city`时候会发生什么？

为了找到`city`的值，引擎会沿着作用域链向下找。引擎不会轻易放弃：它会努力在本地作用域引用的外层作用域中找到变量`city`的值，在本例中，外层作用域是 **global对象** 。

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--uE5KEpLT--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/z9iclg23rmbpts7meoq6.gif)

在全局执行上下文中，我们声明了变量`city`，其值为`San Francisco`，因此全局执行上下文中有一个对变量`city`的引用。现在我们有了该变量的值，函数`getPersonInfo()`就可以返回字符串`Sarah is 22 and lives in San Francisco` 🎉。

我们可以沿着作用域链向**下**找，但是不能沿着作用域链向**上**找。好吧，这可能会令人困惑，因为有人说的是向**上**而不是向 **下** ，所以我要重新表述一下：向**外层**作用域方向找，而不是向更内层作用域方向找。我喜欢将这用图形表示为一种瀑布：

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--mJn1OY2F--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/doq46yc6nuiam51evy44.png)

甚至更深：

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--ymRwRgkB--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/rece2zj4pb4w1fn56q5k.png)

下面我们以这段代码为示例。

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--HQ8cmkNI--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/0z6342b72f3n6v6ufafk.png)

代码几乎是一样的，不过有一个很大的不同点：现在我们只在`getPersonInfo()`函数中声明了`city`变量，但在全局作用域中没有声明。我们没有调用`getPersonInfo()`函数，因此也没有创建本地执行上下文。但是，我们试图在全局执行上下文中访问`name`、`age`和`city`的值。

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--bqIqLoUF--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/f3wvlo4c3gqf3mve1g0n.gif)

然后它就抛出了一个`ReferenceError`错误！在全局作用域中找不到一个对变量`city`的引用，也没有可以查找的外层作用域，并且它**不能**沿着作用域向**上**查找。

这样，我们就可以把作用域作为**保护变量并重用变量名**的一种方法。

除了全局和本地作用域，还有一个**块作用域**（block scope）。用`let`或者`const`关键字声明的变量的作用域为**最接近的大括号**（`{``}`）。

```js
const age = 21

function checkAge() {
  if (age < 21) {
    const message = "You cannot drink!"
    return message
  } else {
    const message = "You can drink!"
    return message
  }
}
```

可以把作用域用图形表示为：

![image](https://res.cloudinary.com/practicaldev/image/fetch/s--t-azbfm3--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/75n1vpm7z4d8924cnvje.png)

这里我们有一个全局作用域，一个函数作用域和两个块作用域。我们能两次声明变量`message`，因为该变量的作用域范围是大括号内。

下面快速回顾一下：

* 作用域链是在当前**执行上下文**中**可访问值**的一个**引用链**。
* 作用域使得在作用域链向下更深层次定义和重用变量名成为可能，因为变量名只能沿着作用域向下找，而不能向上找。

## JavaScript Engine

JavaScript很酷，但是机器是如何才能真正理解我们所编写的代码呢？作为JavaScript开发人员，我们通常不必自己处理编译器。不过，一定要了解JavaScript引擎的基础知识，看看它如何处理我们对人类友好的JS代码，并将其转换成机器可以理解的东西！🥳

> 请注意：这篇文章主要基于Node.js和基于Chromium的浏览器使用的V8引擎。

HTML解析器遇到`script`标记，代码从 **网络** 、**缓存**或已装好的**service worker**加载。响应是把请求的脚本作为 **字节流** ，由字节流解码器负责！**字节流解码器**在下载字节流时对其进行解码。

[![](https://img-blog.csdnimg.cn/20200813165910401.png)](https://cdn.nlark.com/yuque/0/2020/gif/331906/1596188095277-399fc5e7-777b-4fa9-a8e9-76705ff4cd0a.gif)

字节流解码器从被解码的字节流中创建 **标记（token）** 。比如，`0066`解码为`f`，`0075`解码为`u`，`006e`解码为`n`，`0063`解码为`c`，`0074`解码为`t`，`0069`解码为`i`，`006f`解码为`o`，`006e`解码为`n`，后面跟一个空格。这不就是我们代码中写的`function`么！这是JavaScript中的一个保留关键字，会创建一个标记，并发送给解析器（和_预解析器_，这在gif中没有介绍，但稍后会解释）。字节流的其余部分也是这样的。

[![](https://img-blog.csdnimg.cn/20200813165910856.png)](https://cdn.nlark.com/yuque/0/2020/gif/331906/1596188096969-67c977a5-8389-49fd-b865-17f36199598c.gif)

引擎使用两个解析器： **预解析器（Pre-Parser）** 和 **解析器（Parser）** 。为了减少加载网站所需的时间，引擎尝试避免解析不需要立即执行的代码。预处理器处理稍后可能使用的代码，而解析器处理立即需要的代码！如果某个函数只在用户单击按钮后才被调用，那么就没有必要立即编译这段代码来加载到网站。如果用户最终单击按钮并需要这段代码，它才被发送到解析器。

解析器根据从字节流解码器接收的标记创建节点，并用这些节点创建一个抽象语法树或AST（Abstract Syntax Tree）。🌳

[![](https://img-blog.csdnimg.cn/20200813165911474.png)](https://cdn.nlark.com/yuque/0/2020/gif/331906/1596188096880-6880eb4e-34bb-4a6e-8765-2dffe3469670.gif)

接下来，该 **解释器（Interpreter）** 出场了！ 解释器遍历AST，并根据AST所包含的信息生成 **字节码** 。字节码生成完毕后，会删除AST，以清除内存空间。最后，我们就有了一些机器可以处理的东西了！🎉

[![](https://img-blog.csdnimg.cn/20200813165911950.png)

尽管字节码很快，但是它还可以更快点。随着此字节码运行，会生成一些信息。它可以检测某些行为是否经常发生，以及所使用的数据类型。可能我们已经调用了某个函数几十次数：该对它进行优化，让它运行得更快了！🏃🏽‍♀️

字节码与生成的类型反馈一起，被发送到 **优化编译器** 。优化编译器获取字节码和类型反馈，并从中生成高度优化过的机器码。  🚀

[![](https://img-blog.csdnimg.cn/20200813165912841.png)

JavaScript是一种动态类型的语言，这意味着数据的类型可以不断变化。如果JavaScript引擎每次都得检查某个值是哪种数据类型，那就会非常慢。

为了减少解释代码所需的时间，优化过的机器码仅处理在执行字节码时引擎已经见过的情况。如果我们反复使用某段反复返回**相同**数据类型代码，那么就可以简单地重新使用经过优化的机器码以加快处理速度。不过，由于JavaScript是动态类型的，所以可能会发生同样的代码突然返回不同类型的数据的情况。如果发生这种情况，引擎就会对机器码进行非最佳化，并且会退回到解释生成的字节码。

假如某个函数被调用了100次，并且到目前为止一直返回相同的值，引擎就会假设在第101次调用它时还将返回该值。

假设我们有如下函数`sum`，（到目前为止）每次都使用数值作为参数来调用它：

[![](https://img-blog.csdnimg.cn/20200813165913304.png)](https://cdn.nlark.com/yuque/0/2020/png/331906/1596188092957-6527f554-1caf-41a0-8923-a54ad62b24ef.png)

这段代码会返回数字`3`！ 下次调用它时，引擎就会假定我们再次使用两个数值对其进行调用。

如果是这样，就无需进行动态查找，而只需重用优化过的机器码就可以了。否则，如果假设不正确，它将恢复为原始字节码，而不是优化过的机器码。

比如，下一次调用它时，我们传递的是字符串而不是数字。由于JavaScript是动态类型的，所以我们可以做到这一点而没有任何错误！

[![](https://img-blog.csdnimg.cn/20200813165913740.png)](https://cdn.nlark.com/yuque/0/2020/png/331906/1596188092956-5bf25105-7ab6-4df8-b661-661b4a3dd386.png)

这意味着数字`2`会被强制转换为字符串，并且函数将返回字符串`12`。引擎会回过来执行解释过的字节码，并更新类型反馈。

---

希望这篇文章对您有用！ 😊当然，我在这篇文章中没有涉及引擎的很多部分（JS堆、调用栈等），我稍后可能会涉及！ 如果您对JavaScript的内部机制感兴趣，我绝对鼓励您自己开始做一些研究，V8是开源的，并且有一些不错的文档说明其工作原理！🤖

[V8 Docs](https://v8.dev/) || [V8 Github](https://github.com/v8/v8) || [Chrome University 2018: Life Of A Script](https://www.youtube.com/watch?v=voDhHPNMEzg&t=729s%3Cbr%3E%0A)
