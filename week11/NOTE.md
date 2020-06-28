# 编程训练

## 异步编程

### [红绿灯问题](traffic-light.html)

要求：按照绿灯亮10秒，黄灯亮2秒，红灯亮5秒的顺序，无限循环
实现方案有：

- setTimeout
- promise
- async/await
- generator

### [寻路问题](path-finder.html)

- 利用queue数据结构，进行广度优先搜索
- 利用stack数据结构，进行深度优先搜索
- 利用sorted数组，保证每次返回值为最优路径（每次都重新计算与终点的直线距离）
- 利用binaryHeap，保证每次返回值为最优路径

## 正则表达式函数

- match
- replace
- exec
- test
