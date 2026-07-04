---
title: Flex弹性布局详解
description: 立志欲坚不欲锐，成功在久不在速
categories: 前端
cover: https://imgs.luckynwa.top/openApi/lucky/yys/222
tags: css
comments: true
abbrlink: front5
summary: >-
  本文详细介绍了 Flex 弹性布局的核心概念和使用方法。首先讲解了 Flex 的基础概念，包括 flex 容器、flex 项目、主轴和交叉轴等。然后介绍了容器属性，如 flex-direction、flex-wrap、justify-content 等，用于控制子元素的排列方式。最后讲解了项目属性，如 flex-grow、flex-shrink、flex-basis 和 flex 简写属性，用于控制单个子元素在容器中的空间分配。文章配有详细的示意图和代码示例，帮助开发者快速掌握 Flex 布局的使用技巧。
date: 2023-10-29 10:36:04
---

## 前言

Flex 是 Flexible Box 的缩写，即弹性布局。

## 基础概念

- **flex 容器**（flex container）：开启 Flex 布局的父元素
- **flex 项目**（flex item）：容器的子元素
- **主轴**（main axis）：默认水平方向
- **交叉轴**（cross axis）：默认垂直方向
- **占用主轴空间**（main size）
- **占用交叉轴空间**（cross size）

Flex 布局发生在父和子容器之间，父一旦被声明为 Flex 布局（flex 容器），它的所有子元素自动成为容器成员（flex 项目）。

项目（flex 项目）默认是沿主轴 X 方向排列的，单个项目占据主轴的空间称之为 main size，占据交叉 Y 轴的空间称之为 cross size。

## 容器属性

![flex容器属性](https://imgs.luckynwa.top/profile/mdS/flex1.png)

```css
.box {
  display: flex;
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

**垂直换行：** `flex-direction: column` 加 `flex-wrap: wrap`，如果有 2 列，就从 1 列开始从上到下，多了就第二列

![flex布局示例1](https://imgs.luckynwa.top/profile/mdS/flex2.png)

![flex布局示例2](https://imgs.luckynwa.top/profile/mdS/flex3.png)

**justify-content 属性说明：**

- `space-between`：项目两端对齐，项目之间的间距相同
- `space-around`：项目间距相同，两端也会有间距

## 项目属性

![flex项目属性](https://imgs.luckynwa.top/profile/mdS/flex4.png)

### flex-grow

定义项目的放大比例，默认为 0，即如果存在剩余空间，也不放大。

### flex-shrink

定义项目的缩小比例，默认为 1，即如果空间不足，该项目将缩小。负值对该属性无效。如果 `flex-shrink` 值为 0，表示该项目不收缩。

### flex-basis

定义在分配多余空间之前，项目占据的**主轴空间**（main size）。浏览器根据这个属性，计算主轴是否有多余空间。默认值为 `auto`，即项目的本来大小。

### flex 简写属性

`flex` 是 `flex-grow`、`flex-shrink` 和 `flex-basis` 的简写，默认值为 `0 1 auto`。

```css
flex: auto    /* 相当于 flex: 1 1 auto */
flex: none    /* 相当于 flex: 0 0 auto */
```

**等分布局示例：**

给 3 个子 div 设置不同的 flex 值：

```css
/* 均分宽度，B 占一半 */
A: flex: 1
B: flex: 2
C: flex: 1
```
