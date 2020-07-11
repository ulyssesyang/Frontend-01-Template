# week13 总结

## Proxy 与双向绑定

根据MDN定义：The Proxy object enables you to create a proxy for another object, which can intercept and redefine fundamental operations for that object. 也是就是说Proxy可以改变对象的底层运作。因此，对于需要原生JS对象，进行修改或者添加功能，Proxy很好的工具，经常被各种基础库使用。Proxy也因此被称为JS元编程的利器。

### example of list of traps

由于Proxy对JS对象的截断操作，这些截断函数也称为traps。

````JS
var proxy = new Proxy(object, {
  get: function (oTarget, sKey) {
    return oTarget[sKey] || oTarget.getItem(sKey) || undefined;
  },
  set: function (oTarget, sKey, vValue) {
    if (sKey in oTarget) { return false; }
    return oTarget.setItem(sKey, vValue);
  },
  deleteProperty: function (oTarget, sKey) {
    if (sKey in oTarget) { return false; }
    return oTarget.removeItem(sKey);
  },
  enumerate: function (oTarget, sKey) {
    return oTarget.keys();
  },
  ownKeys: function (oTarget, sKey) {
    return oTarget.keys();
  },
  has: function (oTarget, sKey) {
    return sKey in oTarget || oTarget.hasItem(sKey);
  },
  defineProperty: function (oTarget, sKey, oDesc) {
    if (oDesc && 'value' in oDesc) { oTarget.setItem(sKey, oDesc.value); }
    return oTarget;
  },
  getOwnPropertyDescriptor: function (oTarget, sKey) {
    var vValue = oTarget.getItem(sKey);
    return vValue ? {
      value: vValue,
      writable: true,
      enumerable: true,
      configurable: false
    } : undefined;
  },
})
````

### 案例

#### 修改返回值

通过get 截断函数，修改对象的返回值。

````JS

const handler = {
  get: function(obj, prop) {
    return prop in obj ?
      obj[prop] :
      37;
  }
};

const p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;

console.log(p.a, p.b); 
//  1, undefined

console.log('c' in p, p.c); 
//  false, 37

````

#### 传送数据 No-op forwarding proxy

需要注意的是，该功能只能适用于JS的原生对象，不能用于类似于浏览器原生对象，例如DOM元素。

````JS

const target = {};
const p = new Proxy(target, {});

p.a = 37;
//  operation forwarded to the target

console.log(target.a);
//  37
//  (The operation has been properly forwarded!)
````

#### 验证 Validation

利用set 截断函数，可以进行特殊的对象值验证

````JS
let validator = {
  set: function(obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // The default behavior to store the value
    obj[prop] = value;

    // Indicate success
    return true;
  }
};

const person = new Proxy({}, validator);

person.age = 100;
console.log(person.age); // 100
person.age = 'young';    // Throws an exception
person.age = 300;        // Throws an exception
````

#### Extending constructor

通过 construct 和 apply 截断函数，可以实现构造函数的扩展。这个类似ES6的class extend功能。

````JS
function extend(sup, base) {
  var descriptor = Object.getOwnPropertyDescriptor(
    base.prototype, 'constructor'
  );
  base.prototype = Object.create(sup.prototype);
  var handler = {
    construct: function(target, args) {
      var obj = Object.create(base.prototype);
      this.apply(target, obj, args);
      return obj;
    },
    apply: function(target, that, args) {
      sup.apply(that, args);
      base.apply(that, args);
    }
  };
  var proxy = new Proxy(base, handler);
  descriptor.value = proxy;
  Object.defineProperty(base.prototype, 'constructor', descriptor);
  return proxy;
}

var Person = function(name) {
  this.name = name;
};

var Boy = extend(Person, function(name, age) {
  this.age = age;
});

Boy.prototype.gender = 'M';

var Peter = new Boy('Peter', 13);

console.log(Peter.gender);  // "M"
console.log(Peter.name);    // "Peter"
console.log(Peter.age);     // 13
````

#### 操作DOM节点

通过 set 截断函数，可以实现完全不同元素的toggle效果

````JS
let view = new Proxy({
  selected: null
},
{
  set: function(obj, prop, newval) {
    let oldval = obj[prop];

    if (prop === 'selected') {
      if (oldval) {
        oldval.setAttribute('aria-selected', 'false');
      }
      if (newval) {
        newval.setAttribute('aria-selected', 'true');
      }
    }

    // The default behavior to store the value
    obj[prop] = newval;

    // Indicate success
    return true;
  }
});

let i1 = view.selected = document.getElementById('item-1');  //giving error here, i1 is null
console.log(i1.getAttribute('aria-selected')); 
//  'true'

let i2 = view.selected = document.getElementById('item-2');
console.log(i1.getAttribute('aria-selected')); 
//  'false'

console.log(i2.getAttribute('aria-selected')); 
//  'true'
Note: even if selected: !null, then giving oldval.setAttribute is not a function
````

#### Value correction and an extra property

通过 get 和 set 截断函数，实现值修改，并原对象属性

#### Finding an array item object by its property

 可以不用Object.defineProperties来定义对象

### 对proxy对象进行恢复 Revocable Proxy

Proxy对象可以通过`revocable()`方法，对对象进行恢复，并对proxy的操作关闭。

### 参考

-[Brendan Eich: Proxies are Awesome](https://www.youtube.com/watch?v=sClk6aB_CPk)
-[Meta programming](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Meta_programming)

## [Range编程示例](./draggable.html)

## 前端组件化

组件化概念是基于常用的代码复用和功能属性的封装。

### 概念

相对于后端组件化的难点，web components需要解决不同语言体系，涵盖了UI视觉、数据、业务三大方面的逻辑。总的来说，可以分三大技术方法：

- Custom elements
- Shadow DOM
- HTML templates

### 结构特征

除了普通对象属性外，组件还有有一些特殊属性特征

- properties
- methods
- inherit
- attribute
- config & state
- event
- lifecycle
- children

### 常见component的代码结构

````JS
class MyComponent {
        constructor(config) {

        }
        get prop1() {

        }

        set prop1() {

        }

        setAtrribute(attr) {

        }

        getAttribute(attr, value) {
        }

        get children() {

        }

        set children() {

        }

        mounted() {

        }

        render() {
        }
    }

    let myComponent = new MyComponent();
````
