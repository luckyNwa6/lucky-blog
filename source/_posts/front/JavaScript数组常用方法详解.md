---
title: JavaScript数组常用方法详解
description: 千里之行，始于足下
categories: 前端
cover: https://imgs.luckynwa.top/profile/yys/213.webp
tags: JavaScript
comments: true
abbrlink: front7
summary: >-
  本文详细介绍了 JavaScript 中数组的常用方法，包括 push、pop、unshift、shift、reverse、sort、splice、concat、join、slice 等改变和不改变原数组的方法，以及 indexOf、lastIndexOf 查找方法。文章还深入讲解了 for...in、for...of、forEach、map、every、some、find、filter、reduce 等数组遍历和处理方法，通过丰富的代码示例展示了每个方法的特点和使用场景，帮助开发者全面掌握数组操作技巧。
date: 2024-11-12 02:44:34
---

## 前言

数组方法参数说明：

- `item`：每个元素值（必填）
- `index`：索引（可选）
- `arr`：当前数组（可选）

推荐使用 VSCode 插件 **Quokka.js**，可以直接在 js 文件中显示运行结果。

## 常规方法

> 以下方法中，标注 **改变原数组** 的方法会直接修改原数组

### 改变原数组的方法

| 方法        | 作用         | 返回值         |
| ----------- | ------------ | -------------- |
| `push()`    | 末尾添加数据 | 数组的长度     |
| `pop()`     | 末尾删除数据 | 删除的那个数据 |
| `unshift()` | 头部添加数据 | 数组的长度     |
| `shift()`   | 头部删除数据 | 删除的那个数据 |
| `reverse()` | 翻转数组     | 翻转好的数组   |
| `sort()`    | 排序         | 排序后的数组   |

```javascript
// sort() 排序示例
var myArray = [1, 0, 44, 3]
myArray.sort() // 没变化，正序
myArray.sort((a, b) => {
  return a - b
}) // 从小到大
myArray.sort((a, b) => {
  return b - a
}) // 从大到小
console.log(myArray)
```

```javascript
// splice() 截取数组示例
var arr = [1, 0, 44, 3]
var res = arr.splice(1, 2) // 参数1:开始索引, 参数2:截取个数
console.log(res) // [0, 44]
console.log(arr) // [1, 3]

// splice() 替换数组示例
var arr2 = [1, 2, 3, 4, 5, 6]
arr2.splice(0, arr2.length, ...arr) // 参数1表示开始索引,参数2表示多少个，后续可以无数个要插入的数据，这里用解构上面数组插入
console.log(arr2) // [1, 3]
```

### 不改变原数组的方法

| 方法       | 作用           | 返回值   |
| ---------- | -------------- | -------- |
| `concat()` | 合并数组       | 新的数组 |
| `join()`   | 数组转字符串   | 字符串   |
| `slice()`  | 截取数组一部分 | 新的数组 |

```javascript
// concat() 合并数组示例
var arr = [1, 0, 44, 3]
var res = arr.concat(1, 2) //参数1表示开始索引,参数2表示截取2个
console.log(res)
console.log(arr) // [1, 0, 44, 3]

// join() 数组转字符串示例
var arr = [1, 0, 44, 3]
var res = arr.join('-')
console.log(res) // '1-0-44-3'

// slice() 截取数组示例（左闭合右开）
var arr = [1, 0, 44, 3]
var res = arr.slice(1, 2)
console.log(res) // [0]
```

### 查找方法

```javascript
// indexOf() 从左查找
var arr = [1, 0, 44, 3]
arr.indexOf(44) // 返回索引 2
arr.indexOf(100) // 不存在返回 -1

// lastIndexOf() 从右查找
arr.lastIndexOf(44) // 返回索引 2

dmeo1(字符串中含-)
      if(s.indexof('-')>0){
   		let parts= s.split('-')   切割成数组
   		parts[parts.length-1] //获取最后一个的值
	 }
```

## 数组遍历方法

### for...in

遍历数组的**索引**（字符串型数字），会遍历所有可枚举属性，一般用于遍历对象。

```javascript
var myArray = [1, 2]
myArray.name = 'name数组'
for (var index in myArray) {
  console.log('字符串型数字:', index) // '0' '1' '2'
  console.log(myArray[index]) // 1, 2, "name数组"
}
```

### for...of

遍历数组的**元素值**。

```javascript
let arr = [
  { name: '张三', age: 23 },
  { name: '张三', age: 25 },
]

for (let cont of arr) {
  console.log(cont) // {name:'张三',age:23},{name:'张三',age:25}
}
```

### forEach

不返回新数组，返回 undefined。不适合中止或跳出循环的情况，可直接修改原数组。

```javascript
const aa = [1, 2, 3, 4, 5, 6]
const a = aa.forEach((item, index, arr) => {
  console.log(item, index, arr)
  arr[index] = 2 * item
})
console.log(a) // undefined
console.log(aa) // [2, 4, 6, 8, 10, 12]
```

### map

返回一个新的数组，遍历中没值返回 undefined，原数组不改变。

```javascript
const bb = [1, 2, 3, 4, , 6]
const b = bb.map((item, index, arr) => {
  console.log(item)
  return 2 * item
})
const c = bb.map((v) => v * 2)
console.log(b) // [2, 4, 6, 8, undefined, 12]
console.log(bb) // [1, 2, 3, 4, undefined, 6]
console.log(c) // [2, 4, 6, 8, undefined, 12]
```

### every

返回布尔值，表示数组中所有元素是否都满足条件。顺序遍历，如果有一个不满足就打断并返回 false。

```javascript
const cc = [11, 2, 3, 4, 5, 6]
const c = cc.every((v) => {
  console.log(v) // 11, 2
  return v > 2
})
console.log(c) // false
```

### some

返回布尔值，表示数组中是否存在满足条件的元素。顺序遍历，找到就马上返回 true，不再继续。

```javascript
const dd = [1, 2, 3, 4, 5, 6]
const d = dd.some((v) => {
  console.log(v) // 1, 2, 3
  return v > 2
})
console.log(d) // true
```

### find

返回数组中第一个满足条件的元素，都不满足则返回 undefined。findIndex 方法类似，返回索引，没找到则返回 -1。

```javascript
const ee = [1, 2, 3, 4, 5, 6]
const e = ee.find((v) => v > 3)
console.log(e) // 4
```

### filter

返回一个新的数组，包含所有满足条件的元素。

```javascript
const ff = [1, 2, 3, 4, 5, 6]
const f = ff.filter((v) => v > 3)
console.log(f) // [4, 5, 6]
```

### reduce

返回一个值，通过将数组中的每个值（从左到右）应用 reducer 函数于初始值（或前一个结果）而计算得出。

参数说明：

- `accumulator`：累加值，是上次返回的结果（必填）
- `currentValue`：当前元素（必填）
- `initValue`：初始值（可选），如果没有提供，则使用数组的第一个元素

```javascript
const gg = [1, 2, 3]
const initValue = 0
const g = gg.reduce((accumulator, currentValue, index, arr) => {
  console.log(accumulator, currentValue) // [0,1], [1,2], [3,3]
  return accumulator + currentValue
}, initValue)
console.log(g) // 6
```

## 总结

| 方法      | 作用       | 返回值    |
| --------- | ---------- | --------- |
| `forEach` | 遍历数组   | undefined |
| `map`     | 映射转换   | 新数组    |
| `every`   | 全部满足   | 布尔值    |
| `some`    | 存在满足   | 布尔值    |
| `find`    | 查找第一个 | 元素值    |
| `filter`  | 过滤筛选   | 新数组    |
| `reduce`  | 累加计算   | 计算结果  |
