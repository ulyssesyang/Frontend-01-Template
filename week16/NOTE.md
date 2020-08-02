# 每周总结可以写在这里

## 手势效果实现

### 手势操作的挑战

- touch event vs mouse event
- scroll
- compatible

### 实现单指手势操作

- Tap
- Pan
- Flick
- Press

### touch events vs mouse events

由于鼠标事件和触动事件都是继承于同一父事件接口事件(UIEvent)。鼠标事件和触动事件都属于用户接口事件(UIEvent)。相对来讲，鼠标事件所支持的事件较少，常用事件有单击(click)、双击(dbclick)、鼠标键上(mouseup)和鼠标键下(mousedown) 。其他一些更具体的事件例如拖拽事件(DragEvent)和鼠标滑轮事件(WheelEvent)都是基于鼠标事件的扩充。由于要支持复杂的多少操作和响应，touch events api则相对复杂庞大的多。

参考：
- [mouse events](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent)
- [touch events](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events)

### [通过状态转移和touch events api的组合实现手势事件](./gesture/gesture.js)
