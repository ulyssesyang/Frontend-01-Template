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
