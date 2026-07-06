---
title: JavaScript日期格式转换方法详解
description: 天行健，君子以自强不息
categories: 前端
cover: https://imgs.luckynwa.top/openApi/lucky/yys/232
tags: JavaScript
comments: true
abbrlink: front8
summary: >-
  本文总结了 JavaScript 中日期格式转换的两种常用方法。高级版使用 Day.js 库，介绍了安装、全局引入以及常见用法，包括获取时间戳、格式化日期、计算时间差等操作。初级版介绍了原生 JavaScript 的日期转换方法，通过 Date 对象手动拼接字符串，实现了日期数组和单个日期字符串的格式化，以及时间戳到日期字符串的转换。两种方法各有优势，Day.js 更简洁易用，原生方法则无需依赖第三方库。
date: 2023-11-19 08:46:32
---

## 前言

日期转换在项目中经常需要使用，本文总结两种常用的时间转换方法。

## 高级版：Day.js

Day.js 是一个极简的 JavaScript 库，可以为现代浏览器解析、验证、操作和显示日期和时间。

[Day.js 中文网](https://dayjs.fenxianglu.cn/category/manipulate.html#%E5%A2%9E%E5%8A%A0)

### 安装

```shell
npm i dayjs
```

### 全局引入（Vue 2）

```javascript
import dayjs from 'dayjs'
Vue.prototype.dayjs = dayjs
```

### 使用示例

```html
<template>
  <div></div>
</template>

<script>
  export default {
    methods: {
      init() {
        // 基础调用
        var nowTime0 = this.dayjs().unix() // 时间戳（秒）
        var nowTime2 = this.dayjs().format('YYYY/MM/DD') // 年月日格式化
        var nowTime3 = this.dayjs().format('YYYY-MM-DD HH:mm:ss') // 年月日时分秒
        var nowTime4 = this.dayjs().valueOf() // 时间戳（毫秒）

        // 获取当天的开始和结束时间
        const nowStartDay = this.dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss.SSS')
        const nowEndDay = this.dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss.SSS')

        // 计算时间差
        const date1 = this.dayjs('2023-01-10')
        const date2 = this.dayjs('2023-11-10')
        const diffDay = date2.diff(date1, 'd') // 时间差（天）

        // 时间戳转日期格式
        const convertTime1 = this.dayjs(1706753478000).format('YYYY-MM-DD HH:mm')

        // 日期字符串格式化
        const convertTime2 = this.dayjs('2024/01/29 08:55:18').format('YYYY-MM-DD HH:mm')
      },
    },
    created() {
      this.init()
    },
  }
</script>
```

## 初级版：原生 JavaScript

### 日期数组转换

将后端传来的日期数组：

```javascript
;['2024/01/29 08:55:18', '2024/01/29 09:55:18', '2024/01/29 10:11:18']
```

转为：

```javascript
;['2024-01-29 08:55', '2024-01-29 09:55', '2024-01-29 10:11']
```

```javascript
convertDateTimeFormat(arr) {
  var tempArr = arr.map(function (dateTime) {
    var date = new Date(dateTime)
    var formattedDateTime =
      date.getFullYear() + '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
      ('0' + date.getDate()).slice(-2) + ' ' +
      ('0' + date.getHours()).slice(-2) + ':' +
      ('0' + date.getMinutes()).slice(-2)
    return formattedDateTime
  })
  return tempArr
}
```

### 单个日期字符串转换

输入：

```javascript
'2024/01/29 08:55:18'
```

输出：

```javascript
'2024-01-29 08:55'
```

```javascript
convertDateTimeFormat(dateTime) {
  var date = new Date(dateTime)
  var formattedDateTime =
    date.getFullYear() + '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
    ('0' + date.getDate()).slice(-2) + ' ' +
    ('0' + date.getHours()).slice(-2) + ':' +
    ('0' + date.getMinutes()).slice(-2)
  return formattedDateTime
}
```

### 时间戳转换

输入：

```javascript
var curveTimestamp = 1706753478000
```

输出：

```javascript
'2024-02-01 10:11'
```

```javascript
convertDateTimeFormat(timestamp) {
  var date = new Date(timestamp)
  var formattedDateTime =
    date.getFullYear() + '-' +
    ('0' + (date.getMonth() + 1)).slice(-2) + '-' +
    ('0' + date.getDate()).slice(-2) + ' ' +
    ('0' + date.getHours()).slice(-2) + ':' +
    ('0' + date.getMinutes()).slice(-2)
  return formattedDateTime
}
```
