# 每周总结可以写在这里

## 用 G6 antv 可视化 Realm 中的所有对象

- [本地运行文件]('./objects_antv.html‘)
- [codesandbox云端运行](https://codesandbox.io/s/fancy-frost-j6dro)

## browser客户端与服务端通信的几种方式

### browser地址栏

- 可视化地址输入
- GET请求方式
- 每次请求刷新整个页面
- 可以通过`omnibox`等api，进行功能扩充

### XMLHttpRequest

- 按需请求服务端资源
- 默认事件响应：onload/onerror/onprogress/...
- 支持addEventListener API进行事件响应（目前大部分主流浏览器）
- 无需刷新页面
- 在AJAX中大量使用

### EventSource

- 和服务端单向接受信息或者事件数据流
- 常见于php服务端

### WebSocket

- 和服务端进行双向数据流

### fetch

- 根据网络通信，提供一套通用的Request/Response对象，可以对res/req进行处理和修改
- 额外提供Cache API/service workers等特殊API（甚至将来需要的API）
- 处理CORS/HTTP origin header语义相关，例如，可以针对没有CORS设置的服务端，进行no-cors请求
- 流式响应（大部分主流browser已经支持）
- 返回对象为Promise
  - 不能根据http的error status（如404/500）进行reject，而是正常处理(ok status被设为false)
  - 只有网络故障或者请求不能完成
- 不能接受cross-site的cookie
- 除非在`init option`中设置好credentials（目前默认为same-origin），否则不能发送cookies

## 模拟browser端的简单Request

### 思路

- 用nodejs内置的net库，接受服务器端请求
- 根据http protocol的特点，对响应进行处理
- 用状态机机制，处理不同的状态

### [模拟项目toy-browser](/week05/toy-browser/)

### 参考

- [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- [An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview)
- [Hypertext Transfer Protocol -- HTTP/1.1](https://tools.ietf.org/html/rfc2616)
