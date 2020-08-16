# 每周总结可以写在这里

## Dev Tools

### Server

- build:
  - [webpack](https://github.com/webpack/webpack)
  - [babel](https://babeljs.io/docs/en/usage)
  - [vue: @vue/compiler-sfc](https://github.com/vuejs/vue-next/tree/master/packages/compiler-sfc)
  - jsx
  - postcss
- watch
  - [fsevent](https://github.com/fsevents/fsevents/)
- [mock](https://www.npmjs.com/package/mock)
- http: ws
  
### client

- debugger
  - [how vscode js debugger work](https://nodejs.org/en/docs/guides/debugging-getting-started/)
    - nodejs run debugger server which is in the same process with v8
    - vscode as client app communicate with node debugger server with ws server
  - [browser dev-tool](https://developers.google.com/web/tools/chrome-devtools)
    - chrome devtools protocol
    - debugger.getScriptSource: check source file
- [source map](https://developers.google.com/web/tools/chrome-devtools/javascript/source-maps)
  - [Source Map Revision 3 Proposal](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/preview#heading=h.1ce2c87bpj24)

## test

### unit test

- mocha

### test coverage report

- [nyc](https://www.npmjs.com/package/nyc)