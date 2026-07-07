---
title: CSS选择器详解与使用技巧
description: 不畏浮云遮望眼，自缘身在最高层
categories: 前端
cover: https://cloud.luckynwa.top/profile/yys/323.webp
tags: Css
comments: true
abbrlink: front1
summary: >-
  本文系统介绍了 CSS 选择器的优先级规则，从默认继承到 !important 的完整层级。文章通过 Vue 组件示例详细讲解了标签选择器、类选择器、ID 选择器、属性选择器等基础选择器的使用，深入解析了子代选择器、后代选择器、并集选择器、交集选择器等复合选择器的应用场景。特别介绍了深度选择器在修改第三方组件样式时的重要性，包括 ::v-deep、:deep() 和 >>> 的使用方法。最后提供了常用的水平垂直居中方案，包括绝对定位和 flex 布局两种方式。
date: 2023-10-01 02:40:10
---

## 前言

**选择器优先级：**

默认(继承) < 通配符选择器 < 标签选择器 < 类选择器 < ID选择器 < 行内样式 < !important

## 选择器示例

```html
<template>
  <div>
    <exitButton />
    <h3 class="mt-2">UnoCss的使用</h3>
    <p class="w-125 bg-pink h-25 text-5 rounded-full">
      直接类里就是样式，原子化Css确实不错
    </p>
    <p class="h-[10px] mt-[30px]">
      指定高度和margin-top，配合vs插件 WindiCSS IntelliSense使用
    </p>
    <p class="text-[20px] mt-4">
      文本20大小，不指定则X4，比如mt-4就是margin-top:16px
    </p>
    <br />
    <el-button type="success"
      >深度选择器使用 >>> ::v-deep /deep/ :deep()</el-button
    >
    <br />
    <h3 class="mt-2">其他选择器的使用</h3>
    <span>标签选择器aqua</span>
    <div class="cls">
      类选择器blueviolet
      <span>类子代，如果span有声明颜色则使用申明的，否则继承cls颜色aqua</span>
    </div>
    <div id="id1">id选择器red</div>
    <hr />
    <h3 class="mt-2">复合选择器的使用</h3>
    <div class="clsF">
      <p class="children1">
        子代选择器 和 后代选择器
        <span>
          你干嘛1
          <span>
            你干嘛2
            <span>你干嘛3</span>
          </span>
        </span>
      </p>
      <p class="clsB1">并集选择器1</p>
      <p class="clsB2">并集选择器2</p>
      <p class="clsB1 clsJ2 clsJ1">交集选择器</p>
      <p class="hoverT">伪类选择器</p>
    </div>
    <input type="text" />
  </div>
</template>

<style lang="scss" scoped>
  // 属性选择器：[type]、[type^=a]、[title$=a]
  // 包含这个属性以属性值a开头、以a结尾
  [type="text"] {
    color: blue;
  }

  // 结构伪类选择器
  .clsF > p:first-child {
    color: skyblue !important;
  }

  .clsF > p:nth-child(2n) {
    color: red !important;
  }

  .clsF > p:last-child {
    color: skyblue !important;
  }

  // 伪类选择器：鼠标悬停变红
  .hoverT:hover {
    color: crimson;
  }

  // 交集选择器：多个类名无空格
  .clsJ2.clsJ1 {
    font-weight: 600;
    background: green;
  }

  .clsJ2 {
    background: gray !important;
  }

  // 并集选择器
  .clsB2,
  .clsB1 {
    background: pink;
  }

  // 子代选择器
  .clsF > .children1 {
    font-weight: 800;
  }

  // 后代选择器
  .clsF span {
    color: chartreuse;
  }

  // 标签选择器
  span {
    color: aqua;
  }

  // 类选择器
  .cls {
    color: blueviolet;
  }

  // ID选择器
  #id1 {
    color: red;
  }

  // 通配符选择器
  * {
    font-size: 20px;
  }

  // 深度选择器
  :deep(.el-button > span) {
    color: pink;
  }
</style>
```

## 深度选择器

深度选择器用于修改第三方组件（如 Element-UI）的内部样式。当 `<style>` 使用 `scoped` 时，不加深度选择器则无法修改子组件的样式。

```css
// Vue2 写法
::v-deep(.el-button > span) {
  color: green;
}

// Vue3 写法
:deep(.el-button > span) {
  color: green;
}

// Vue2 另一种写法
::v-deep .dv-scroll-board .header {
  margin-bottom: 15px;
}
```

**使用方式：**

- `.el-form >>> .el-form-item__error`（Vue2）
- `::v-deep`（Vue2）
- `:deep()`（Vue3 推荐）

## 常用居中方式

![flex居中示意图](https://imgs.luckynwa.top/profile/mdS/cssCenter.png)

### 方案一：绝对定位

子绝父相，通过 `transform` 实现居中。

```html
<div style="position: relative; width: 100%; height: 600px; background: pink">
  <div
    style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
  >
    测试
  </div>
</div>
```

### 方案二：Flex 布局

使用 Flexbox 实现居中，代码更简洁。

```html
<div
  style="display: flex; justify-content: center; align-items: center; width: 100%; height: 600px; background: pink"
>
  <div style="background-color: green">测试</div>
</div>
```
