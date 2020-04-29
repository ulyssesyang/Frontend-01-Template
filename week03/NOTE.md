# 每周总结可以写在这里

## JavaScript | 表达式，类型准换

- convertStringToNumber
    function convertStringToNumber(string, n = 10) {
    let chars = string.split('');
    let number = 0;
    let i = 0;

    while (i < chars.length && chars[i] != '.') {
        number = number * n;
        number = number + chars[i].codePointAt(0) - '0'.codePointAt(0);
        i ++;
    }

    if (chars[i] == '.') {
        i ++;
    }

    let fraction = 1;
    while (i < chars.length) {
        fraction = fraction / n;
        number   = number + ( chars[i].codePointAt(0) - '0'.codePointAt(0) ) * fraction;
        i ++;
    }
    return number;
}

- convertNumberToString
    function convertNumberToString(number, n = 10) {
    let integer  = Math.floor(number);
    let fraction = number - integer;
    let string   = integer ? '' : '0';

    while (integer > 0) {
        string  = String(integer % n) + string;
        integer = Math.floor(integer / n);
    }

    if (fraction) {
        string = string + '.';
        while (fraction) {
            fraction = fraction * n;
            string   = string + Math.floor(fraction);
            fraction = fraction - Math.floor(fraction);
        }
    }

    return string;
}

## JavaScript | 语句，对象

### 找出 JavaScript 标准里所有的对象，分析有哪些对象是我们无法实现出来的，这些对象都有哪些特性

- 内置对象类
  - 当脚本或者模块开始执行的时候，提供运行时词法分析环境用的全局对象
  - 这类对象在执行上下文创建之前就被创建了
  - 没有[[Construct]]内置方法，因此，该对象不能使用new进行创建
  - 没有[[Call]]内置方法，因此，不能作为函数调用
  - 具有[[Prototype]]，特殊执行用的
  - 还带有其他特殊额外属性
- 属性类（3种）
  - Infinity
  - NaN
  - undefined
- 方法函数类（6种）
  - eval
  - isFinite
  - isNaN
  - parseFloat
  - parseInt
  - URI handling functions
- 构造函数类（34种）
  - Array
  - ArrayBuffer
  - Boolean
  - DataView
  - Date
  - Error
  - EvalError
  - Float32Array
  - Float64Array
  - Function
  - 
- 其他类型（4种）
  - Atomics
  - JSON
  - Math
  - Reflect
