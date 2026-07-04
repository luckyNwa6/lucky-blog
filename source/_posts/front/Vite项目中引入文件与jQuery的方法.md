---
title: Vite项目中引入文件与jQuery的方法
description: 知之者不如好之者，好之者不如乐之者
categories: 前端
cover: https://imgs.luckynwa.top/openApi/lucky/yys/211
tags: Vue
comments: true
abbrlink: front10
summary: >-
  本文介绍了在 Vite 构建的 Vue3 项目中引入本地图片和 jQuery 的方法。针对 Vite 项目没有 require 命令的问题，提供了两种引入图片的方案：静态引入和使用 new URL 动态引入。同时讲解了在芋道框架中遇到 import.meta.url 返回包含查询参数的完整 URL 导致路径拼接错误的解决方案。最后介绍了在 Vue2 项目中安装和全局声明 jQuery 的步骤，以便第三方验证码组件等依赖 jQuery 的场景使用。
date: 2023-12-03 08:37:32
---

## 前言

在 Vite 构建的 Vue3 项目中，没有 require 命令去动态引入本地图片，本文提供相应的解决方案。

## 引入图片方法

### 方式一：静态引入

无法动态引入，适用于固定图片。

```html
<template>
  <img :src="emptyImage" class="h-50 w-50" />
</template>

<script setup>
  import emptyImage from '@/assets/home/yd_4.png'
</script>
```

### 方式二：动态引入

使用 `new URL` 配合 `import.meta.url` 实现动态引入，支持 `v-for` 获取动态路径。

```html
<template>
  <img :src="getFilePath('yd_4.png')" />
</template>

<script setup>
  const getFilePath = (url: string) => {
    let imgH = new URL(`/src/assets/home/${url}`, import.meta.url).href
    return imgH
  }
</script>
```

### 芋道框架解决方案

在芋道框架中使用上面的方案会出现 `undefined`，因为 `import.meta.url` 返回的是包含查询参数的完整 URL，可能导致路径拼接错误。

**解决方案：** 使用 `window.location` 获取当前页面的 URL 路径。

```javascript
getFilePath(url) {
  let img = new URL(`/src/assets/images/${url}`, window.location.href).href;
  return img;
}
```

## 引入 jQuery

Vue2 项目由于第三方验证码组件需要 jQuery。

### 安装

```shell
npm i jquery -S
```

### 全局声明（main.js）

```javascript
import $ from 'jquery' // 本地有也可以这样：import $ from '@/assets/captcha/js/jquery.min.js'
window.jQuery = $
window.$ = $
```

声明完成后就可以直接全局使用了。

### 验证是否成功

新建一个 Vue 文件，打印 jQuery 对象即可验证。

```javascript
console.log(jQuery)
```
