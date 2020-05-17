# 每周总结可以写在这里

## 有限状态机

### 概念

- 每个状态都是一个机器
  - 计算、储存、输出
  - 输入都是一致的
  - 每个机器本身没有状态，如纯函数
- 根据确定下个状态分类
  - 都有确定的下个状态：Moore
  - 根据输入决定下个状态：Mealy

### 常用应用场景

- 处理字符串
- 算法

### 使用有限状态机处理字符串

- JS中的Mealy有限状态机

```javascript
    // 每个函数为一个状态
    function state(input) {
        // 处理每个状态的逻辑代码
        return next; // 返回值作为下个状态
    }

    // 调用状态机
    while(input) {
        // 获取输入
        state = state(input); //把状态机的返回值作为下一个状态
    }
```

- 练习
  - [match字符串是否包含`abc`](/week06/match/match_abc.js)
  - [match字符串是否包含`abcabx`](/week06/match/match_abcabx.js)
  - [match字符串是否包含`abababx`](/week06/match/match_abababx.js)

- 深入学习
  - [字符串KMP算法](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm)
  - 用有限状态机实现等效KMP算法

## HTML的解析

### 分离HTML parser逻辑

### 创建状态机

- 使用FSM来实现HTML的分析
- HTML标准规定了HTML的状态

### 解析标签

- 涉及标签：开始标签、结束标签、自封闭标签
- 没有涉及属性

### 创建元素

- 在状态机中，除了状态迁移，还加入了业务逻辑
- 在标签结束状态提交标签token

### 创建属性

- 属性值分为单引号、双引号、无引号
- 处理和标签类似
- 属性结束时，需要把属性加到标签token上

### 构建DOM树

- 利用栈来构造标签DOM树
- 遇到开始标签时创建元素并入栈，遇到结束标签时候出栈
- 自封闭节点可视为入栈后立即出栈
- 任何元素的父元素为其入栈前的栈顶

### 文本节点

- 文本节点与自封闭标签处理类似
- 多个文本节点需要合并

### 参考

- [HTML Data state](https://html.spec.whatwg.org/multipage/parsing.html#data-state)
- [Parsing HTML documents](https://html.spec.whatwg.org/multipage/parsing.html#tagopen-state)
- [The "in select" insertion mode](https://html.spec.whatwg.org/multipage/parsing.html#parsing-main-inselect)

## CSS Computing

### 环境准备

- 使用开源库[css](https://github.com/reworkcss/css)

### 准备CSS规则

- 遇到style标签时候，对CSS规则进行保存
- 调用CSS Parser来分析CSS规则
- 研究分析CSS规则的格式

### 添加调用

- 创建一个元素后，立即计算CSS
- 理论上，当分析一个元素时，所以CSS规则已经收集完毕
- 在真实浏览器中，可能遇到写在body的style标签，需要重新CSS计算

### 获取父元素序列

- 在computeCSS函数中，必须知道元素的所有父元素才能判断元素与规则是否匹配
- 从上一步骤的stack中，可以获取本元素所有的父元素
- 由于首先获取的是”当前元素“，所以我们获得和计算父元素匹配的顺序是从内向外

### 拆分选择器

- 选择器要从当前元素向外排列
- 复杂选择器拆成针对单个元素的选择器，用循环匹配父元素队列

### 计算选择器与元素匹配

- 根据选择器的类型和元素属性，计算是否与当前元素匹配
- 实现了三种基本选择器
- 实际的浏览器中需要处理复合选择器

### 生成computed属性

- 一旦选择匹配，就应用选择器到元素上，形成computedStyle

### 确定规则覆盖关系

- CSS规则根据CSS Specificity和后来优先规则进行覆盖
- CSS Specificity是一个四元组：[inline, #id, class name, 伪类、标签等其他元素]，越左边权重越高
- 一个CSS规则的Specificity是根据包含的简单选择器相加而成
