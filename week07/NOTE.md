# 每周总结可以写在这里

## CSS Layout Computing

### CSS Layout Solution

- [Normal Flow](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Normal_Flow)
- [Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox)
- [Grids](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Grids)
- [Houdini](https://developer.mozilla.org/en-US/docs/Web/Houdini)

### 基于Flexbox的Layout准备

- flex direction: row / column
- Main Axis: width x left->right / height y top->bottom
- Cross Axis: height y top->bottom / width x left->right

### 收集元素进行（就是元素分为几行）

- 根据主轴尺寸，把元素分别进行
- 如果设置了no-wrap，则把所以元素都放进第一行

### 计算主轴

- 找出所以flex元素
- 把主轴方向的剩余尺寸按比例分配给这些元素
- 若剩余空间为负数，所有flex元素为0，等比压缩剩余元素

### 计算cross轴

- 根据每行中最大元素尺寸，计算行高
- 根据行高flex-align和item-align，确定元素具体位置

## CSS Rendering （DOM TREE -> BITMAP）

### 绘制单个元素

- 绘制需要依赖图形环境(e.g. npm images package)
- 绘制在一个viewport上进行
- 与绘制相关属性：background-color,border,background-image等

### 绘制dom

- 对dom上的元素进行递归，循环绘制

## CSS基本语法和机制

### CSS简化版本 - CSS2.1的语法

- [Appendix G. Grammar of CSS 2.1](https://www.w3.org/TR/CSS21/grammar.html)
- [CSS Syntax Module Level 3](https://www.w3.org/TR/css-syntax-3/)

### CSS总体结构

- @charset
- @import
- rules
  - @media
  - @page
  - rule

### CSS @rule

- MDN
- 手机淘宝的flexible设计与实现

### CSS rule的结构

- Selector
  - [Selectors Level 3](https://www.w3.org/TR/selectors-3/)
  - [Selectors Level 4](https://www.w3.org/TR/selectors-4/)
- Key
  - properties
  - variables: [CSS Custom Properties for Cascading Variables Module Level 1](https://www.w3.org/TR/css-variables/)
- Value: [CSS Values and Units Module Level 4](https://www.w3.org/TR/css-values-4/)

### 从W3C收集CSS标准

- [W3C CSS](https://www.w3.org/TR/?tag=css)
- 收集标准：

```javascript
var lis = document.getElementById("container").children

var standards = [];

for(let li of lis) {
    if(li.getAttribute('data-tag').match(/css/))
        standards.push({
            name:li.children[1].innerText,
            url:li.children[1].children[0].href
        })
}
console.log(standards)
```

- 收集 CSS 属性相关标准：

```javascript
let iframe = document.createElement("iframe");
document.body.innerHTML = "";
document.body.appendChild(iframe);

function happen(element, event){
    return new Promise(function(resolve){
        let handler = () => {
            resolve();
            element.removeEventListener(event, handler);
        }
        element.addEventListener(event, handler);
    })
}
void async function(){
    for(let standard of standards) {
        iframe.src = standard.url;
        console.log(standard.name);
        await happen(iframe, "load");
    }
}();
```
