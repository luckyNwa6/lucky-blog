---
title: AI数学预备知识
cover: https://imgs.luckynwa.top/openApi/lucky/yys/389
description: 路漫漫其修远兮，吾将上下而求索
categories: 人工智能
tags: Python
comments: true
abbrlink: math001
summary: >-
  本文系统梳理了深度学习所需的核心数学基础知识，涵盖标量、向量、矩阵、张量四大数据结构，详细讲解了向量加法、内积、模长、夹角余弦等运算，以及矩阵加法、乘法、Hadamard乘法、转置等操作。导数部分从直观理解出发，通过速度类比解释瞬时变化率的概念，并系统介绍了幂函数求导、常数求导、线性函数求导、乘积法则、商法则、链式法则等核心求导规则。最后介绍了标准差的计算方法，为理解模型训练中的损失评估提供统计基础。全文以清晰的公式推导和实例演示，帮助读者建立扎实的数学直觉。
date: 2026-03-27 10:30:00
---

## 标量（Scalar）

标量就是一个单独的数。
例如：1、3.14、-5

## 向量（Vector）

向量是一维数组，通常表示为列向量：

$$
\begin{bmatrix}
x_1 \\
x_2 \\
\vdots \\
x_n
\end{bmatrix}
$$

向量可理解为空间中的点，每个元素对应不同坐标轴的坐标。

向量中有多少个元素，就叫几维向量。

例如：

$$
[1,2,3,4]
$$

### 向量加法

要求两个向量维度相同。

交换律：

$$
A + B = B + A
$$

示例：

$$
[1,2] + [3,4] = [4,6]
$$

### 向量内积（点积）

要求两个向量维度相同。

定义：

$$
A \cdot B = x_1 y_1 + x_2 y_2 + \cdots + x_n y_n
$$

交换律：

$$
A \cdot B = B \cdot A
$$

示例：

$$
[1,2] \cdot [3,4] = 1 \cdot 3 + 2 \cdot 4 = 11
$$

### 向量的模（长度）

定义：

$$
\|A\| = \sqrt{x_1^2 + x_2^2 + \cdots + x_n^2}
$$

### 向量夹角的余弦值

要求两个向量维度相同。

定义：

$$
\cos \theta = \frac{A \cdot B}{\|A\| \cdot \|B\|}
$$

## 矩阵（Matrix）

矩阵是一个二维数组，每个元素为标量，可通过行号和列号索引。

### 矩阵加法

要求两个矩阵维度相同。

$$
\begin{bmatrix}
1 & 2\\
3 & 4
\end{bmatrix}
+
\begin{bmatrix}
4 & 2\\
3 & 1
\end{bmatrix}
=
\begin{bmatrix}
5 & 4\\
6 & 5
\end{bmatrix}
$$

### 矩阵乘法（点积矩阵乘法）

**前提**

左矩阵 A 的列数等于右矩阵 B 的行数

设：

$$
A=\begin{pmatrix}
a & b \\
c & d
\end{pmatrix},
\quad
B=\begin{pmatrix}
e & f \\
g & h
\end{pmatrix}
$$

则：

$$
A \times B =
\begin{pmatrix}
ae+bg & af+bh \\
ce+dg & cf+dh
\end{pmatrix}
$$

$$
A=
\begin{pmatrix}
a&b&c\\d&e&f\\g&h&i
\end{pmatrix},\quad
B=
\begin{pmatrix}
j&k&l\\m&n&o\\p&q&r
\end{pmatrix}
$$

$$
AB =
\begin{pmatrix}
aj+bm+cp & ak+bn+cq & al+bo+cr \\
dj+em+fp & dk+en+fq & dl+eo+fr \\
gj+hm+ip & gk+hn+iq & gl+ho+ir
\end{pmatrix}
$$

矩阵 A 是 2 行 3 列 2×3

```
| 1  2  3 |
| 4  5  6 |
```

矩阵 B 是 3 行 2 列 3×2

```
| 1  2 |
| 3  4 |
| 5  6 |
```

结果 C= A × B = 2×2

计算过程：

```
第 1 行 × 第 1 列：     1*1 + 2*3 + 3*5 = 1 + 6 + 15 = 22
第 1 行 × 第 2 列：     1*2 + 2*4 + 3*6 = 2 + 8 + 18 = 28
第 2 行 × 第 1 列：     4*1 + 5*3 + 6*5 = 4 + 15 + 30 = 49
第 2 行 × 第 2 列：     4*2 + 5*4 + 6*6 = 8 + 20 + 36 = 64
最终结果：
| 22  28 |
| 49  64 |
```

**性质**

不满足交换律：

$$
A \cdot B \ne B \cdot A
$$

满足分配律：

$$
A(B + C) = AB + AC
$$

满足结合律：

$$
A(BC) = (AB)C
$$

### Hadamard 乘法（逐元素乘）

要求两个矩阵形状一致。

示例：

$$
\begin{bmatrix}
1 & 2 \\
3 & 4
\end{bmatrix}
\circ
\begin{bmatrix}
1 & 2 \\
0 & -1
\end{bmatrix}
=
\begin{bmatrix}
1 & 4 \\
0 & -4
\end{bmatrix}
$$

### 矩阵转置（Transpose）

行列互换。

$$
\begin{bmatrix}
1 & 2 \\
3 & 4
\end{bmatrix}^T
=
\begin{bmatrix}
1 & 3 \\
2 & 4
\end{bmatrix}
$$

例如：

$$
3 \times 2 \rightarrow 2 \times 3
$$

### 向量与矩阵转换

**reshape**

$$
[1,2,3,4]
\rightarrow
\begin{bmatrix}
1 & 2\\
3 & 4
\end{bmatrix}
$$

$$
[1,2,3,4,5,6]
\rightarrow
\begin{bmatrix}
1 & 2\\
3 & 4\\
5 & 6
\end{bmatrix}
$$

**flatten**

$$
\begin{bmatrix}
1 & 2\\
3 & 4\\
5 & 6
\end{bmatrix}
\rightarrow
[1,2,3,4,5,6]
$$

## 张量（Tensor）

矩阵是二维，张量是多维数据结构。

示例：

3 个 2×2 矩阵：

$$
3\times2\times2
$$

4 个 3×2×2 张量：

$$
4\times3\times2\times2
$$

在深度学习中，输入、输出、中间结果几乎都是张量。

## 导数（Derivative）

- 如果函数是位置，导数就是速度

- 如果函数是距离变化，导数就是变化速度

- 函数曲线上某点的导数 = 该点切线斜率

- 变化方向（正增长还是负增长）

- 变化快慢（增长多快）

- 曲线斜率（图像有多陡）

如果没有导数，你看不出未来趋势。
有了导数，你能预测变化、做优化、画切线、做智能算法。

$$
f'(x_0) = \lim_{\Delta x \to 0} \frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}
$$

> 函数在某个点x下标0的导数，就是函数值变化量与自变量变化量的比值，当变化量趋于无穷小

**导数的直观理解（速度类比）**

想象你站在某条路上的一个位置：

$$
x_0
$$

你想知道此刻你的 **瞬时速度**（也就是导数）。

你不能直接问"现在速度是多少"，
因为你只知道 **位置**，不是 **速度**

**1. 走一点点距离**

向前走一小段距离：

$$
\Delta x
$$

**2. 看位置变化多少**

计算位置的变化：

$$
f(x_0 + \Delta x) - f(x_0)
$$

**3. 求平均速度**

平均速度 = 路程变化 / 时间变化：

$$
\frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}
$$

**4. 但我们要的是"瞬时速度"！**

平均速度不够，我们想知道 **这一瞬间的速度**！

怎么办？

让这段"时间"越来越短：

$$
\Delta x \to 0
$$

**5. 当时间趋近 0，平均速度变成瞬时速度**

于是得到：

$$
f'(x_0) = \lim_{\Delta x \to 0}
\frac{f(x_0 + \Delta x) - f(x_0)}{\Delta x}
$$

### 幂函数求导

公式：$(x^n)' = n x^{n-1}$

案例：$f(x) = x^2$ 求导
解：$f'(x)=2x$

### 常数求导

公式：$(c)' = 0$

案例：$f(x)=5$
不管怎么移动 x，y 都不变，没变化 → 变化速度=0
解：$f'(x)=0$

### 线性函数求导

公式：$(ax+b)' = a$

案例：$f(x)=3x+1$
线性函数求导=斜率
解：$f'(x)=3$

### 乘积法则

公式：$(f(x)g(x))'=f'(x)g(x)+f(x)g'(x)$

案例：$f(x)=x,\; g(x)=x^2$
前导后不导 + 前不导后导
解：$(x \cdot x^2)'$
$(x \cdot x^2)' = 1 \cdot x^2 + x \cdot 2x$
化简：$(x \cdot x^2)' = x^2 + 2x^2 = 3x^2$

### 商法则

$$
\text{公式：}\left(\frac{f(x)}{g(x)}\right)' = \frac{f'(x)g(x)-f(x)g'(x)}{[g(x)]^2}
$$

求导：$\left(\frac{x}{x^2}\right)'$

$f(x)=x,\; g(x)=x^2,\quad f'(x)=1,\; g'(x)=2x$

代入商法则：

$$
\left(\frac{x}{x^2}\right)' = \frac{1 \cdot x^2 - x \cdot 2x}{(x^2)^2} = \frac{x^2 - 2x^2}{x^4} = \frac{-x^2}{x^4} = -\frac{1}{x^2}
$$

### 链式法则

$$
\text{公式：}\left(f(g(x))\right)' = f'(g(x)) \cdot g'(x)
$$

案例：$y = (3x+1)^2$

外层 $f(u)=u^2,\quad$ 内层 $u=3x+1$
外层先导，把 u 是内层带进去，再乘内层导数
$f'(u)=2u,\quad u'=3$
$y' = 2(3x+1) \cdot 3$
$y' = 6(3x+1)$，$y' = 18x+6$，$y' = 18x+6$

## 标准差

数据：[2, 4, 6]

**1. 平均值：**

$$
\mu = (2 + 4 + 6) / 3 = 4
$$

**2. 差值平方：**

$$
(2-4)^2 = 4,\quad (4-4)^2 = 0,\quad (6-4)^2 = 4
$$

**3. 方差：**

$$
\sigma^2 = (4 + 0 + 4) / 3 = 8/3
$$

**4. 标准差：**

$$
\sigma = \sqrt{8/3} \approx 1.63
$$
