---
title: Es6特性
description: es6的常见特性
cover: 'https://imgs.luckynwa.top/blog/es6Icon.png'
categories: 前端
tags: Es6
comments: true
abbrlink: 30769
date: 2021-06-27 22:32:48
---

# const 和 let

ES6 推荐使用 let 声明局部变量，相比之前的 var（无论声明在何处，都会被视为声明在函数的最顶部），let 具有块级作用域（即在使用 let 的那一对大括号 {}内起作用），可以避免变量提升和污染全局作用域的问题。

const 则用来声明常量，即一旦赋值就不能再改变。const 也具有块级作用域，并且必须在声明时就初始化。const 适合用来定义不会改变的值，如 PI、URL 等。

```js
// 使用var
var a = 1
if (true) {
  var a = 2 // 这里会覆盖上面的a
}
console.log(a) // 输出2

// 使用let
let b = 1
if (true) {
  let b = 2 // 这里不会影响外面的b
}
console.log(b) // 输出1

// 使用const
const PI = 3.14
PI = 3.15 // 报错：Assignment to constant variable.

const URL = 'https://www.bing.com'
URL = 'https://www.google.com' // 报错：Assignment to constant variable.
```

# **解构赋值**

解构赋值是一种从数组或对象中提取数据并赋值给变量的简洁写法。它可以减少代码量，提高可读性，并且支持默认值、嵌套结构、别名等特性。

```js
// 数组解构：按照数组元素位置对应赋值给变量
let [f, g, h] = [1, 2, 3]
console.log(f) // 1
console.log(g) // 2
console.log(h) // 3

// 对象解构：按照对象属性名对应赋值给同名变量（也可以使用别名）
let { name, age } = { name: 'Alice', age: 18 }
console.log(name) // Alice
console.log(age) // 18

let { name: i, age: j } = { name: 'Bob', age: 19 }
console.log(i) // Bob
console.log(j) //19

// 默认值：如果没有匹配到相应的数据，则使用默认值（如果有）
let [k, l = 0] = [1]
console.log(k) //1
console.log(l) //0

let { m = 0, n = 0 } = { m: 1 }
console.log(m) //1
console.log(n) //0
// 嵌套结构：可以解构嵌套的数组或对象
let [o, [p, q]] = [1, [2, 3]]
console.log(o) // 1
console.log(p) // 2
console.log(q) // 3

let {
  r: { s, t },
} = { r: { s: 4, t: 5 } }
console.log(s) // 4
console.log(t) // 5

// 解构赋值的应用场景：交换变量、函数参数、返回值等
let u = 6
let v = 7
;[u, v] = [v, u] // 不需要使用临时变量来交换u和v的值
console.log(u) // 7
console.log(v) // 6

function foo([x, y]) {
  return x + y
}
console.log(foo([8, 9])) //17

function bar() {
  return [10, 11]
}
let [w, z] = bar()
console.log(w) //10
console.log(z) //11
```

# 箭头函数

箭头函数是一种使用 => 符号定义函数的简洁写法 。它可以省略 function 关键字、参数括号、返回值括号等，使得代码更加简洁和清晰。箭头函数还有一个重要的特性，就是它不会改变 this 的指向，即箭头函数内部的 this 始终指向定义时所在的对象。

```js
// 普通函数和箭头函数的对比
function add(x, y) {
  return x + y
}

let add = (x, y) => x + y // 省略了 function 关键字、参数括号、返回值括号

// 如果只有一个参数，可以省略参数括号；如果没有参数，必须使用空括号
let square = (x) => x * x

let hello = () => console.log('Hello')

// 如果有多条语句，需要使用大括号包裹，并且显式返回（如果需要）
let max = (x, y) => {
  if (x > y) {
    return x
  } else {
    return y
  }
}

// 箭头函数不会改变 this 的指向，即箭头函数内部的 this 始终指向定义时所在的对象
let obj = {
  name: 'Alice',
  sayHi: function () {
    console.log(this.name) // Alice
    setTimeout(function () {
      console.log(this.name) // undefined （因为setTimeout中的this指向window）
    }, 1000)
    setTimeout(() => {
      console.log(this.name) // Alice （因为箭头函数中的this指向obj）
    }, 1000)
  },
}
obj.sayHi()

//
var obj = {
  name: 'John',
  sayHello: function () {
    var that = this //用它就可以拿到obj
    setTimeout(function () {
      console.log('Hello, ' + that.name)
    }, 1000)
  },
}
obj.sayHello()
```

# 模板字符串

模板字符串是一种使用反引号 `` 包裹字符串，并且支持插入变量或表达式的新语法 。它可以避免使用 + 号连接字符串和变量，并且支持多行字符串和标签模板等特性。

```js
// 使用模板字符串插入变量或表达式，用 ${} 包裹即可（注意是反引号而不是单引号）
let name = 'Bob'
let age = 19
let message = `Hello ${name}, you are ${age} years old.`
console.log(message)

// 使用模板字符串可以直接换行，不需要使用 \n 或者 + 号连接多行字符串
let poem = `Do not go gentle into that good night,
Old age should burn and rave at close of day;
Rage, rage against the dying of the light.`
console.log(poem)

// 使用标签模板可以自定义模板字符串的处理方式（标签是一个函数名）
function tag(strings, ...values) {
  let result = ''
  for (let i = 0; i < strings.length; i++) {
    result += strings[i]
    if (i < values.length) {
      result += values[i].toUpperCase() // 将变量转为大写
    }
  }
  return result
}

let name = 'Alice'
let message = tag`Hello ${name}, how are you?` // 使用tag函数处理模板字符串
console.log(message) // Hello ALICE, how are you?
```

# 默认参数、剩余参数和展开运算符

ES6 提供了一些新的语法，可以让函数的参数更加灵活和方便。默认参数可以让函数在没有传入参数或传入 undefined 时，使用预设的默认值。剩余参数可以让函数接收任意数量的参数，并将它们存储在一个数组中。展开运算符可以将一个数组或对象展开为多个元素或属性，用于函数调用、数组合并、对象复制等场景。

```js
// 默认参数：在函数定义时，给参数赋予默认值（如果没有传入或传入undefined）
function add(x = 0, y = 0) {
  return x + y
}
console.log(add()) // 0
console.log(add(1)) // 1
console.log(add(1, 2)) // 3
console.log(add(1, undefined)) // 1

// 剩余参数：在函数定义时，使用 ... 符号表示剩余的所有参数，并将它们存储在一个数组中（必须是最后一个参数）
function sum(...numbers) {
  let result = 0
  for (let number of numbers) {
    result += number
  }
  return result
}
console.log(sum()) // 0
console.log(sum(1)) // 1
console.log(sum(1, 2)) // 3
console.log(sum(1, 2, 3)) // 6

// 展开运算符：在函数调用时，使用 ... 符号将一个数组或对象展开为多个元素或属性（相当于逐个传入）
let arr = [4, 5, 6]
console.log(sum(...arr)) // 15 （相当于sum(4,5,6)）

// 展开运算符也可以用于数组合并、对象复制等场景
let arr1 = [1, 2]
let arr2 = [3, ...arr] // [3,4,5,6]
let obj1 = { name: 'Alice' }
let obj2 = { ...obj1 } // {name: "Alice"}
```

# 类和继承

ES6 提供了一种新的语法，可以让 JavaScript 支持类和继承这两个面向对象编程的重要概念。类是一种定义对象属性和方法的模板，可以通过 new 关键字创建类的实例。继承是一种让子类拥有父类属性和方法的机制，可以通过 extends 和 super 关键字实现。

```js
// 定义一个类：使用 class 关键字，并且提供一个 constructor 方法作为构造函数（初始化实例属性）
class Person {
  constructor(name, age) {
    this.name = name // this 指向实例对象
    this.age = age
  }

  // 定义类的方法：直接在类中写函数名和函数体（不需要使用 function 关键字）
  sayHi() {
    console.log(`Hello ${this.name}, you are ${this.age} years old.`)
  }
}

// 创建类的实例：使用 new 关键字，并且传入构造函数所需的参数
let alice = new Person('Alice', 18)
alice.sayHi() // Hello Alice, you are 18 years old.

// 定义一个子类：使用 extends 关键字继承父类，并且可以重写或新增属性和方法
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age) // 使用 super 关键字调用父类的构造函数（必须在子类构造函数中第一行执行）
    this.grade = grade // 子类可以新增自己的属性
  }

  // 子类可以重写或新增父类的方法
  sayHi() {
    console.log(`Hello ${this.name}, you are ${this.age} years old and in grade ${this.grade}.`)
  }

  study() {
    console.log(`${this.name} is studying hard.`)
  }
}

// 创建子类的实例：使用 new 关键字，并且传入构造函数所需的参数（包括父类和子类的参数）
let bob = new Student('Bob', 19, 12)
bob.sayHi() // Hello Bob, you are 19 years old and in grade 12.
bob.study() // Bob is studying hard.
```

# Promise 和 async/await

Promise 是一种用于处理异步操作的对象，它表示一个未来可能完成或失败的事件。Promise 有三种状态：pending（等待）、fulfilled（成功）、rejected（失败）。Promise 可以通过 then 方法添加成功或失败时执行的回调函数，也可以通过 catch 方法添加失败时执行的回调函数。Promise 还可以通过 all 和 race 方法组合多个 Promise 对象。

async/await 是一种基于 Promise 的新语法，可以让异步操作更加简洁和清晰。async 是一个修饰符，用于声明一个异步函数，该函数返回一个 Promise 对象。await 是一个运算符，用于等待一个 Promise 对象的结果，只能在异步函数中使用。

```js
// 创建一个Promise对象：使用 new 关键字，并且传入一个执行器函数（该函数接收两个参数：resolve和reject）
let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // 模拟一个异步操作
    let num = Math.random() // 随机生成一个0到1之间的数
    if (num > 0.5) {
      resolve(num) // 如果大于0.5，则表示成功，调用resolve并传入结果
    } else {
      reject(num) // 如果小于等于0.5，则表示失败，调用reject并传入结果
    }
  }, 1000)
})

// 使用 then 方法添加成功或失败时执行的回调函数（可以链式调用）
promise
  .then((value) => {
    console.log(`Success: ${value}`) // 如果Promise状态变为fulfilled，打印成功的结果
    return value * 2 // 可以返回一个新的值，传递给下一个then
  })
  .then((value) => {
    console.log(`Double: ${value}`) // 打印上一个then返回的值乘以2
  })
  .catch((reason) => {
    console.log(`Fail: ${reason}`) // 如果Promise状态变为rejected，打印失败的结果
  })

// 使用 Promise.all 方法组合多个Promise对象，返回一个新的Promise对象，该对象在所有Promise都成功时成功，否则失败
let promise1 = Promise.resolve(1) // 创建一个立即成功的Promise对象
let promise2 = Promise.resolve(2)
let promise3 = Promise.resolve(3)

let promise4 = Promise.all([promise1, promise2, promise3]) // 组合三个Promise对象

promise4
  .then((values) => {
    console.log(values) // [1,2,3] （如果所有Promise都成功，打印一个包含所有结果的数组）
  })
  .catch((reason) => {
    console.log(reason) // 如果有任何一个Promise失败，打印失败的结果
  })

// 使用 Promise.race 方法组合多个Promise对象，返回一个新的Promise对象，该对象在任何一个Promise完成时完成（无论成功或失败）
let promise5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(5)
  }, 500) // 0.5秒后成功
})
let promise6 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(6)
  }, 1000) // 1秒后失败
})

let promise7 = Promise.race([promise5, promise6]) // 组合两个Promise对象

promise7
  .then((value) => {
    console.log(value) // 5 （如果有任何一个Promise先成功，打印成功的结果）
  })
  .catch((reason) => {
    console.log(reason) // 如果有任何一个Promise先失败，打印失败的结果
  })

// 使用 async/await 语法简化异步操作（需要在函数前加上 async 关键字，并且在等待的地方加上 await 关键字）
async function test() {
  try {
    let value = await promise // 等待promise对象的结果（如果成功，赋值给value；如果失败，抛出异常）
    console.log(`Success: ${value}`) // 如果成功，打印结果
  } catch (error) {
    console.log(`Fail: ${error}`) // 如果失败，打印错误
  }
}

test() // 调用异步函数
```

# 模块化

模块化是一种将代码分割为不同的文件或模块的方法，可以提高代码的可读性、可维护性和复用性。ES6 提供了一种原生的模块化语法，可以让 JavaScript 支持导入和导出模块。导入模块使用 import 关键字，导出模块使用 export 关键字。

```js
// 创建一个名为 math.js 的模块文件，并且导出两个函数：add 和 multiply
export function add(x, y) {
  return x + y
}

export function multiply(x, y) {
  return x * y
}

// 在另一个文件中，使用 import 关键字导入 math.js 模块，并且使用它们
import { add, multiply } from './math.js' // 导入指定的函数（需要使用花括号）
console.log(add(1, 2)) // 3
console.log(multiply(2, 3)) // 6

// 可以使用 as 关键字给导入或导出的函数起别名
import { add as plus, multiply as times } from './math.js' // 导入并重命名函数
console.log(plus(1, 2)) // 3
console.log(times(2, 3)) // 6

export { add as plus, multiply as times } // 导出并重命名函数

// 可以使用 * 符号导入或导出所有的函数（需要起一个别名）
import * as math from './math.js' // 导入所有函数并起一个别名为math
console.log(math.add(1, 2)) // 3
console.log(math.multiply(2, 3)) // 6

export * from './math.js' // 导出所有函数

// 可以使用 default 关键字指定一个默认的导出（只能有一个，默认导出不需要花括号）
export default function subtract(x, y) {
  return x - y
}

import subtract from './math.js' // 导入默认导出（不需要花括号）
console.log(subtract(5, 4)) // 1
```

# 迭代器和生成器

迭代器是一种遵循迭代协议的对象，可以按照一定的顺序访问一个集合中的元素。迭代器有一个 next 方法，每次调用返回一个包含 value 和 done 属性的对象，value 表示当前元素的值，done 表示是否还有更多元素。ES6 提供了一种新的语法 for...of 循环，可以方便地遍历迭代器。

生成器是一种特殊的函数，可以返回一个迭代器对象，并且可以在函数体内使用 yield 关键字暂停和恢复执行。生成器使用 function\* 关键字声明，并且可以接收参数。

```js
// 创建一个迭代器对象：使用 Symbol.iterator 符号作为属性名，并且返回一个具有 next 方法的对象
let iterator = {
  [Symbol.iterator]() {
    let i = 0
    return {
      next() {
        if (i < 5) {
          return { value: i++, done: false } // 返回当前元素的值和状态
        } else {
          return { done: true } // 返回结束状态
        }
      },
    }
  },
}

// 使用 for...of 循环遍历迭代器对象（不需要调用 next 方法）
for (let value of iterator) {
  console.log(value) // 0 1 2 3 4
}

// 创建一个生成器函数：使用 function* 关键字，并且在函数体内使用 yield 关键字暂停和恢复执行
function* generator(n) {
  for (let i = 0; i < n; i++) {
    yield i // 每次遇到 yield 关键字，返回当前值并暂停执行，直到下一次调用 next 方法
  }
}

// 调用生成器函数返回一个迭代器对象（可以传入参数）
let iter = generator(5)

// 使用 for...of 循环遍历迭代器对象（不需要调用 next 方法）
for (let value of iter) {
  console.log(value) // 0 1 2 3 4
}
```

# Map 和 Set

Map 和 Set 是两种新的数据结构，可以提供更高效和灵活的存储和操作方式。Map 是一种类似于对象的集合，但是它可以使用任意类型的值作为键（而不仅仅是字符串）。Set 是一种类似于数组的集合，但是它只存储唯一的值（不会出现重复）。

```js
// 创建一个Map对象：使用 new 关键字，并且可以传入一个可迭代的数组作为初始值（每个元素是一个键值对数组）
let map = new Map([
  ['name', 'Alice'],
  ['age', 18],
])

// 使用 set 方法添加或修改键值对（可以使用任意类型的值作为键）
map.set('gender', 'female')
map.set(true, 'yes')
map.set([1, 2], 'array')

// 使用 get 方法根据键获取对应的值（如果不存在，返回 undefined）
console.log(map.get('name')) // Alice
console.log(map.get(true)) // yes
console.log(map.get([1, 2])) // undefined （因为数组是引用类型，不相等）

// 使用 has 方法判断是否存在某个键
console.log(map.has('age')) // true
console.log(map.has('grade')) // false

// 使用 delete 方法删除某个键值对（返回一个布尔值表示是否删除成功）
console.log(map.delete('age')) // true
console.log(map.delete('age')) // false

// 使用 size 属性获取Map中的元素个数
console.log(map.size) // 4

// 使用 clear 方法清空Map中的所有元素
map.clear()
console.log(map.size) // 0

// 创建一个Set对象：使用 new 关键字，并且可以传入一个可迭代的数组作为初始值（重复的元素会被忽略）
let set = new Set([1, 2, 3, 4, 4])

// 使用 add 方法添加元素（如果已经存在，不会重复添加）
set.add(5)
set.add(4)

// 使用 has 方法判断是否存在某个元素
console.log(set.has(3)) // true
console.log(set.has(6)) // false

// 使用 delete 方法删除某个元素（返回一个布尔值表示是否删除成功）
console.log(set.delete(2)) // true
console.log(set.delete(2)) // false

// 使用 size 属性获取Set中的元素个数
console.log(set.size) // 5
// 使用 clear 方法清空Set中的所有元素
set.clear()
console.log(set.size) // 0

// Map和Set都是可迭代的对象，可以使用 for...of 循环或扩展运算符遍历它们
let map = new Map([
  ['name', 'Alice'],
  ['age', 18],
])
let set = new Set([1, 2, 3])

// 使用 for...of 循环遍历Map或Set（Map的每个元素是一个键值对数组，Set的每个元素是一个值）
for (let [key, value] of map) {
  console.log(`${key}: ${value}`) // name: Alice  age: 18
}

for (let value of set) {
  console.log(value) // 1 2 3
}

// 使用扩展运算符将Map或Set转换为数组（Map的每个元素是一个键值对数组，Set的每个元素是一个值）
let mapArr = [...map]
console.log(mapArr) // [["name","Alice"],["age",18]]

let setArr = [...set]
console.log(setArr) // [1,2,3]
```
