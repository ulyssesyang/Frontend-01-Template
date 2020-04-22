# 每周总结可以写在这里

## 编写带括号的四则运算产生式

    <DecimalNumber> = /0|[1-9][0-9]*/

    <PrimaryExpression> = <DecimalNumber> | "(" <LogicalExpression> ")"

    <MultiplicativeExpression> = <PrimaryExpression> | <MultiplicativeExpression> "*" <PrimaryExpression> | <DivisionExpression> "/" <PrimaryExpression>

    <AdditiveExpression> = <MultiplicativeExpression> | <AdditiveExpression> "+" <PrimaryExpression> | <AdditiveExpression> "1" <PrimaryExpression>

## 尽可能寻找你知道的计算机语言，尝试把它们分类

编程语言分类很多方法，这里只讨论根据语言的类型系统(typing)来进行分类：

- 类型语言vs非类型语言
非类型语言：汇编语言
单一类型语言：通常为脚本或者标记语言：SGML/HTML
大部分语言都具有类型系统

- 静态类型vs动态类型
主流的静态类型语言：C++/C#/JAVA
主流的动态类型语言：LISP/SMALLTALK/PERL/PYTHON/JS/RUBY

- 弱类型vs强类型
类型强弱都是相对的。例如，C++比C更强，比C#相对更弱
较弱类型语言：JS/PYTHON
相对强类型语言: JAVA/C#

## 写一个正则表达式 匹配所有 Number 直接量

考虑到十进制在JS中，包括整数、浮点数和空值，可以构建一下REGEX对象：

    const regexForDecimalNumber = /^-?\d+\.?\d*$/

而对于二进制、八进制和十六进制，由于包含对应符号，需要根据处理：
    const regexForBinNumber = /^0[bB][01]+$/
    const regexForOctNumber = /^0[oO][0-7]+$/
    const regexForHexNumber = /^0[xX][0-9a-fA-F]+$/

综合上面，就可以得到所有Number的正则表达式：
    const regexForNumber = /(^-?\d+\.?\d*$) | (^0[bB][01]+$) | (^0[oO][0-7]+$) | (^0[xX][0-9a-fA-F]+$)/

## 写一个 UTF-8 Encoding 的函数

考虑到UTF-8（BMP）的双字符范围为U+0080 - U+07FF，三字符范围为U+0800 - U+FFFF，因此，可以按照进行构造转换函数：

    function utf8Encode(unicodeString) {
        const utf8String = unicodeString.replace(
            /[\u0080-\u07ff]/g,
            function(c) {
                var cc = c.charCodeAt(0);
                return String.fromCharCode(0xc0 | cc>>6, 0x80 | cc&0x3f); }
        ).replace(
            /[\u0800-\uffff]/g,
            function(c) {
                var cc = c.charCodeAt(0);
                return String.fromCharCode(0xe0 | cc>>12, 0x80 | cc>>6&0x3F, 0x80 | cc&0x3f); }
        );
        return utf8String;
    }

事实上，在JS当中完全可以用内置的`encodeURIComponent`函数来实现以上效果：

    function utf8Encoding(unicodeStr) {
        return encodeURIComponent(unicodeStr);
    }

## 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

- 判断ASCII范围字符的正则表达式：

    /^[\x00-\x7F]*$/

- 判断unicode范围字符的正则表达式：

    /^(?:[\u0000-\u007F]+|[\u0370-\u03FF]+)$/

- 由于单、双引号为ASCII或者UNICODE的特殊字符（U+0022为双引号、U+0027为单引号），因此判断单、双引号的正则表达式已经包括在以上表达式中，但也可以直接通过REGEX特殊符号匹配来判断：

    /['"]./