---
title: JavaScript对象操作详解
description: 锲而不舍，金石可镂
categories: 前端
cover: https://cloud.luckynwa.top/profile/yys/371.webp
tags: JavaScript
comments: true
abbrlink: front6
summary: >-
  本文详细介绍了 JavaScript 中对象操作的核心知识。首先讲解了浅拷贝和深拷贝的概念区别，提供了 JSON.parse、lodash cloneDeep 和递归实现三种深拷贝方案，以及扩展运算符、Object.assign、slice、concat 四种浅拷贝方法。然后介绍了 Object.keys、Object.values、Object.entries、Object.fromEntries 等常用方法的使用，包括遍历对象、获取键值对、对象与数组互转等操作。最后通过代码示例演示了 Object.assign 的深浅拷贝特性及扩展运算符的使用。
date: 2024-11-05 11:40:50
---

## 前言

**浅拷贝：** 创建一个新对象，但只复制了原始对象的第一层属性，而不是递归地复制整个对象的所有嵌套属性。新对象中的嵌套对象仍然是原始对象中嵌套对象的引用，修改新对象中的嵌套对象会影响原始对象。

**深拷贝：** 创建一个全新的对象，同时递归地复制原始对象中的所有嵌套对象，使得新对象和原始对象完全独立，彼此不会互相影响。

**理解：** 一个对象只有一层而且没有引用类型（对象|数组）时，用浅拷贝的方法效果和深拷贝是一样的，因为对于基本数据类型（如数字、字符串等），新对象会复制它们的值而不是引用。

## 深拷贝实现

### 方法一：JSON.parse

```javascript
let target = { name: '小艾' }
let source = { age: 20 }
let deepClone = JSON.parse(JSON.stringify(target)) // 深拷贝
target.name = '小羊'
console.log(target) // { name: '小羊' }
console.log(deepClone) // { name: '小艾' }
```

### 方法二：lodash 的 cloneDeep

```javascript
import _ from 'lodash'
const deepClone = _.cloneDeep(obj)
```

### 方法三：递归实现

```javascript
export function deepClone(obj) {
  const _toString = Object.prototype.toString

  // null, undefined, non-object, function
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  // DOM Node
  if (obj.nodeType && 'cloneNode' in obj) {
    return obj.cloneNode(true)
  }

  // Date
  if (_toString.call(obj) === '[object Date]') {
    return new Date(obj.getTime())
  }

  // RegExp
  if (_toString.call(obj) === '[object RegExp]') {
    const flags = []
    if (obj.global) flags.push('g')
    if (obj.multiline) flags.push('m')
    if (obj.ignoreCase) flags.push('i')
    return new RegExp(obj.source, flags.join(''))
  }

  const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {}

  for (const key in obj) {
    result[key] = deepClone(obj[key])
  }

  return result
}
```

## 浅拷贝实现

### 方法一：扩展运算符

```javascript
const original = { a: 1, b: 2 }
const shallowCopy = { ...original }
```

### 方法二：Object.assign()

```javascript
const original = { a: 1, b: 2 }
const shallowCopy = Object.assign({}, original)
```

### 方法三：Array.prototype.slice()（适用于数组）

```javascript
const originalArray = [1, 2, 3]
const shallowCopyArray = originalArray.slice()
```

### 方法四：Array.prototype.concat()（适用于数组）

```javascript
const originalArray = [1, 2, 3]
const shallowCopyArray = originalArray.concat()
```

## Object.keys | values

`Object.values` 传入对象，返回对象 value 的数组集。

`Object.keys` 传入对象，返回对象 key 的数组集。

```javascript
const obj = {
  id: '1',
  name: '小维',
}

// 使用 Object.keys 遍历
const temp1 = []
Object.keys(obj).forEach((key) => {
  console.log(key) // 'id', 'name'
  console.log(obj[key]) // '1', '小维'
  temp1.push(obj[key])
})

// 使用 Object.values 获取
const temp2 = Object.values(obj)
console.log(temp2) // ['1', '小维']
console.log(temp1) // ['1', '小维']
console.log(Object.keys(obj)) // ['id', 'name']
```

这两个方法还能处理数组和字符串，`keys` 返回索引，`values` 返回每个值拆开的数组。

```javascript
const str = 'abcde'
const arr = ['a', 'b', 'c', 'd', 'e']
console.log(Object.keys(str)) // ['0', '1', '2', '3', '4']
console.log(Object.values(str)) // ['a', 'b', 'c', 'd', 'e']
console.log(Object.keys(arr)) // ['0', '1', '2', '3', '4']
console.log(Object.values(arr)) // ['a', 'b', 'c', 'd', 'e']
```

## Object.assign

`Object.assign(target, source_1, ···)` 将后面的值赋值给前面的，并返回一个新的对象。

```javascript
let target = { name: '小艾 ' }
let source = { age: 20 } //就一层对象是深拷贝,如果里面还有{},那么就是浅拷贝
let obj1 = Object.assign(target, source)
console.log(source) //{ age: 20}
console.log(obj1) //{name: '小艾 ', age: 20}
source.name = '小维'
let obj2 = Object.assign(target, source) // 如果目标对象和源对象有同名属性，则后面的属性会覆盖前面的属性
console.log(obj2) //{name: '小维', age: 20}
console.log(obj1) //{name: '小维', age: 20}
console.log(target) //{name: '小维', age: 20}
```

### 测试值变化

```javascript
const objN = {
  name: '坤',
  age: 24,
  info: {
    test: 'zz',
  },
}
const test = {
  kun: 'ngm',
}
const newObjN = Object.assign(test, objN) //将objN中的属性值赋值给test，并返回新的对象newObjN
console.log(test)
console.log(newObjN)
test.age = 26
objN.age = 25
console.log(newObjN) //浅跟随test的值变化，age为26
test.info.test = 'NN' //会影响原来的，所以是浅拷贝
console.log(objN)
console.log(newObjN)
console.log(test)

const original = { a: 1, b: 2, info: { name: '小维' }, arr: [1, 2, 3] }
const shallowCopy = { ...original }
console.log(shallowCopy)
// shallowCopy.arr = [3, 5] //不触发,引用地址变化
shallowCopy.arr[0] = 34 //修改新的会影响原来的，触发浅拷贝
console.log(original)
console.log(shallowCopy)
```

### 扩展运算符测试

```javascript
const original = { a: 1, b: 2, info: { name: '小维' }, arr: [1, 2, 3] }
const shallowCopy = { ...original }

// shallowCopy.arr = [3, 5]  // 不触发，引用地址变化
shallowCopy.arr[0] = 34 // 修改新的会影响原来的，触发浅拷贝
console.log(original)
console.log(shallowCopy)
```

## Object.entries | fromEntries

`Object.entries` 将对象拆成数组，数组里包含多个小数组，每个小数组包含对象的 key 和 value。

`Object.fromEntries` 将上面的格式还原为对象。

```javascript
let target = { name: '小艾 ', age: 20 }
let source = { age: 20 }
const obj3 = {
  name: 'LUCKY',
  age: 20,
}
const arrLucky = Object.entries(obj3)
console.log(arrLucky) //[['name', 'LUCKY'], ['age', 20]]
//将上面这种转对象 适合将 Map 结构转为对象
const obj4 = Object.fromEntries(arrLucky)
console.log(obj4) //{name: 'LUCKY', age: 20}
//删除属性
delete obj3.name
console.log(obj3) //{age: 20}
let { name, ...params } = target //除了name属性以外的target对象中的所有其他属性
console.log(params) //{age: 20}

//Object.assign 测试值变化
const objN = {
  name: '坤',
  age: 24,
  info: {
    test: 'zz',
  },
}
const test = {
  kun: 'ngm',
}
const newObjN = Object.assign(test, objN)
objN.age = 25
test.age = 26
test.info.test = 'NN'
console.log(objN, newObjN, test) //发现age无法影响objN的值
console.log(objN, newObjN, test) //发现info里的test影响objN的值

const original = { a: 1, b: 2, info: { name: '小维' }, arr: [1, 2, 3] }

const shallowCopy = { ...original }
// shallowCopy.arr = [3, 5] //不触发,引用地址变化
shallowCopy.arr[0] = 34 //这样才会触发浅拷贝
console.log(shallowCopy, original)
```
