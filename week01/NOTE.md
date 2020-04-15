# 每周总结可以写在这里

## 课前准备

### 5 道「自我测评」题目

在开课之前尝试回答这 5 个问题：

1.编写一个 DOM 编辑器：可以自由地操作一个 iframe（空白）中的 DOM 结构，包括增、删、移动。

Inline frames, like `<frame>` elements, are included in the window.frames pseudo-array.

With the DOM `HTMLIframeElement` object, scripts can access the window object of the framed resource via the contentWindow property. The contentDocument property refers to the document inside the `<iframe>` , same as contentWindow.document.

From the inside of a frame, a script can get a reference to its parent window with window.parent.

Script access to a frame's content is subject to the same-origin policy. Scripts cannot access most properties in other window objects if the script was loaded from a different origin, including scripts inside a frame accessing the frame's parent. Cross-origin communication can be achieved using Window.postMessage().

    <iframe src="same_domain.com/page.htm" id="iframe" onload="access()”/>

    function access() {
    var iframe = document.getElementById("iframe");
    var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
    console.log(innerDoc.body);
    }

Manipulate DOM with native JS:

    // Create a DOM element
    var el = document.createElement('div');
    el.innerHTML = ' <p> Hello World! </p> ';

    // Replace a DOM element
    var el = document.querySelector('div');
    var newEl = document.createElement('p');
    newEl.innerHTML = 'Hello World!';
    el.parentNode.replaceChild(newEl, el);

    // Removing an element
    var el = document.querySelector('div');
    el.parentNode.removeChild(el);

2.讲讲 position float display 各有哪些取值，它们互相之间会如何影响？

- Display
The display CSS property sets whether an element is treated as a block or inline element and the layout used for its children, such as flow layout, grid or flex.

- Normal flow
Inline items are laid out in the same way as the letters in words in text, one after the other across the available space until there is no more room, then starting a new line below. Block items stack vertically, like paragraphs and like the items in a bulleted list. Normal flow also includes relative positioning of block or inline items, and run-in boxes.

- Float
A floated item is taken out of the normal flow and shifted to the left or right as far as possible in the space available. Other content then flows alongside the floated item. The float property may have one of three values: . Absolutely positioned or fixed items cannot be floated. Other elements normally flow around floated items, unless they are prevented from doing so by their clear property.

- positioning
Positioning allows you to take elements out of the normal document layout flow, and make them behave differently, for example sitting on top of one another, or always remaining in the same place inside the browser viewport.

- Absolute positioning
An absolutely positioned item has no place in, and no effect on, the normal flow of other items. It occupies its assigned position in its container independently of other items.

3.JavaScript 启动后，内存中有多少个对象？如何用代码来获得这些信息？

4.HTML 的中，如何写一个值为 “a”=‘b’ 的属性值？

5.编写一个快速排序代码，并且用动画演示它的过程。

## 预习内容

## 重学 | 学习方法

• 关于前端，你会什么？
• 关于前端，你不会什么？

编程能力，解决难得问题；刻意练习；
架构能力，解决大的问题；带有目的读源代码，参与开源项目；
工程能力，解决人的问题；
学习就是痛苦的事，训练营就是帮助应付痛苦。

• 学习方法 - 整理法
顺序关系学习，例如学习编译原理
组合关系学习，例如学习CSS规则
维度关系学习，例如JS
分类关系学习，例如CSS简单选择器

• 学习方法 - 完备性
避免出现盲区
利用mind map工具
HTML标签学习
权威性w3.org
完备性whatwg.org
文档性mdn

• 学习方法 - 追溯法
源头，例如，closure概念，通过wikipedia, google scholar
标准和文档，例如, w3.org, mdn, msdn, apple developer
大师，Tim Berners Lee, Brendan Eich, Bjame Stroustrup

## 重学 | 构建知识体系

[前端开发知识图谱](https://www.yuque.com/docs/share/87fe3f2b-8062-415d-afcc-d687b0a2f17d?#) (更新中。。。)

## 重学 | 工程体系
