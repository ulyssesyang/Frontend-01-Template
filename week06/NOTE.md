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
