# 每周总结

## Range API

### 修改操作

- appendChild
- insertBefore
- removeChild
- replaceChild

### 调用Range

- range.setStart
- range.setEnd
- range.setStartBefore
- range.setEndBefore
- range.setStartAfter
- range.setEndAfter
- range.selectNode
- range.selectNodeContents

````javascript
// <div id='a'>1211413<span>3242342</span></div>
const element1 = document.getElementById('a').childNodes[0];
const element2 = document.getElementById('a').childNodes[1].childNodes[0];
const range = new Range();
range.setStart(element, 3);
range.setEnd(element, 6);

const range = document.getSelection().getRangeAt(0);

// 根据设置的位置后，可以进行精细的节点内容切除
const fragment = range.extractContents();
range.insertNode(document.createTextNode('aaa'));

````

### 【例子】把元素的所有子元素进行逆序

- [代码](./reverse.html)
- 通过Range api可以把整个子元素提取，进行逆序操作，再整体插入，从而减少dom tree重绘

### 使用场景

- 操作复杂节点
- rich text editor

## CSSOM

### document.styleSheets

- 只有当HTML创建了style标签节点后，才有stylesheets全局对象
- CSSStyleSheet
  - cssRules
  - insertRule
  - removeRule

### window.getComputedStyle(element, pseudoElement)

### window窗口操作

````javascript

const childWindow = window.open('about:blank', '_blank', 'width=100,height=100,left=100,top=100');
childWindow.moveBy(-50, -50);
childWindow.scrollBy(0, 30);
````

## 所有API
