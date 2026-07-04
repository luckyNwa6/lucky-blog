---
title: JavaScript防抖与节流详解
description: 学如逆水行舟，不进则退
categories: 前端
cover: https://imgs.luckynwa.top/openApi/lucky/yys/242
tags: js
comments: true
abbrlink: front9
summary: >-
  本文详细介绍了 JavaScript 中防抖和节流两种性能优化技术。防抖用于限制连续触发事件的执行频率，只在最后一次触发后延迟执行，适用于输入框搜索、图表 tooltip 回显等场景。节流用于限制函数执行频率，确保一段时间内只执行一次，适用于窗口滚动、鼠标点击等频繁触发的事件。文章提供了 Vue 中的防抖实现方法，以及监听 echarts tooltip 事件和 input 输入框的实际案例，同时给出了通用的节流函数实现。
date: 2023-11-26 07:56:53
---

## 前言

当涉及到处理频繁触发的事件或函数时，防抖和节流是两种常用的技术，用于优化性能和改善用户体验。

## 防抖

防抖用于限制连续触发的事件的执行频率。当一个事件被触发时，防抖会延迟一定的时间执行对应的处理函数。如果在延迟时间内再次触发了同样的事件，那么之前的延迟执行将被取消，重新开始计时。

**总结：在单位时间内频繁触发事件，只有最后一次生效**

**应用场景：**

- 用户在输入框输入字符时，全部输入完成才发送请求
- 鼠标悬浮在图表时，将 ToolsTip 里的数据回显到头部（避免多次请求后端接口）

### Vue 中实现防抖

```javascript
// 防抖方法，传入函数和延迟
debounce(fn, delay) {
  let timer = null;              // 默认是空
  return function () {
    if (timer) {                 // 如果存在则
      clearTimeout(timer);       // 清空定时器
    }
    timer = setTimeout(() => {   // 赋值定时器
      fn();
    }, delay);
  };
}
```

### 监听 echarts 的 tooltip 事件

```javascript
let charts = document.getElementById('line_charts')
let myChart = this.$echarts.init(charts)
myChart.on(
  'showTip',
  this.debounce(() => {
    that.getData()
  }, 2000),
)
```

### 监听 input 输入框

```javascript
const inputDOM = document.getElementById('input')

function debounce(fn, delay) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn()
    }, delay)
  }
}

inputDOM.addEventListener(
  'input',
  debounce(() => {
    console.log('发送请求')
  }, 500),
)
```

## 节流

节流是一种限制函数执行频率的技术。它可以确保在某个时间段内，函数不会被连续触发执行，而是以一定的时间间隔执行。

**总结：一段时间内只执行一次**

**应用场景：**

- 验证码刷新
- 窗口滚动
- 鼠标点击等频繁触发的事件

### 通用节流函数

```javascript
// 节流：一段时间内只执行一次
// 第一次执行 cd 为 true，执行定时器
// 快速第二次进入时，由于定时器还没有结束，cd 为 true，所以不执行
// 等待定时器结束，cd 为 false，执行新一轮
function throttle(fn, delay) {
  let cd = false
  return function () {
    if (cd) {
      console.log('节流中')
      return false
    }
    cd = true
    setTimeout(() => {
      fn()
      cd = false
    }, delay)
  }
}
```
