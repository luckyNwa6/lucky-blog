---
title: NumPy 矩阵运算速查手册
cover: https://cloud.luckynwa.top/profile/yys/139.webp
description: 欲穷千里目，更上一层楼
categories: 人工智能
tags: Doc
comments: true
abbrlink: ai3222
summary: >-
  NumPy 是 Python 科学计算的基础库，本文涵盖 ndarray 的创建方式（列表转换、arange、随机生成、等比等差数列）、矩阵运算（加减乘、点乘、幂）、常用数学函数、矩阵属性、形状操作、索引、拼接、线性代数、随机模块、类型转换及读写文件等内容，并附带常用技巧示例。
date: 2025-11-01 11:22:21
---

# 简介

numpy一般用来定义矩阵并调用里面的方法

```py
import numpy as np

arr1 = np.arange(15).reshape(3, 5)  # 创建ndarray对象
print(arr1)
print("*" * 20)
print(f'np的轴：{arr1.ndim}')  # 2
print(f'np的维度：{arr1.shape}')  # 3行5列
print(f'np的元素类型：{arr1.dtype}')  # int32
print(f'np的元素个数：{arr1.size}')  # 15
print(f'np的元素字节数：{arr1.itemsize}')  # 4   32除8
print(f'np的元素类型：{type(arr1)}')  # <class 'numpy.ndarray'>
print("*" * 20)

# 矩阵运算

arr2 = np.array([10, 20, 30, 40])
arr3 = np.arange(4)  # 都是一行四列
print(arr2)
print(arr3)

print(arr2 + arr3)
print(arr2 - arr3)
print("*" * 20)
# 矩阵的乘法，行列数一致
arr4 = np.array([[1, 2, 3], [4, 5, 6]])
arr5 = np.array([[1, 2, 3], [4, 5, 6]])
print(arr4 * arr5)
print(np.multiply(arr4, arr5))  # 这2个结果一样都是相乘
print("*" * 20)
# 矩阵乘，行列数不一致，需要a的列和b的行一致
arr4 = np.array([[1, 2, 3], [4, 5, 6]])
arr5 = np.array([[9, 8], [6, 5], [3, 2]])
print(np.dot(arr4, arr5))
print(arr4.dot(arr5))
print(arr4 @ arr5)  # 这3效果一致

```

# 常见的创建方式

把py列表转ndarray类型

```py
# 把py列表转ndarray对象
import numpy as np

my_list = [11, 22, 33, 55, 67]
print(type(my_list))

arr2 = np.array(my_list)
print(arr2)
print(type(arr2))
```

arange(起始,结束,步长,dtype=类型)函数创建ndarray类型 类似py的range()函数

```py
arr3 = np.arange(0, 10, 2, dtype=np.float32) #指定np的类型，有int32 int64等
print(arr3)
print(type(arr3))
print(f'元素的类型：{arr3.dtype}')
# [0. 2. 4. 6. 8.]
# <class 'numpy.ndarray'>
# 元素的类型：float32
```

random.rand() 生成 包左不包右 随机小数矩阵

randint(起始，结束，size=（行，列）)

```py
print("*" * 20)
arr4 = np.random.rand(3, 5)
print(arr4)

print("*" * 20)
arr5 = np.random.randint(3, 5, size=(2, 6)) #2行3列   范围3-4，包左不包右，随机整数
print(arr5)
```

等比/等差数列

开始和结束点都是10的幂,base指定2为底数

```py
arr3 = np.logspace(0, 0, 10)
print(arr3)

arr4 = np.logspace(0, 1, 10, base=2)  # 等比数列
print(arr4)

arr5 = np.linspace(1, 10, 10) # 等差数列浮点型   ,endpoint= False 不包含结束值, dtype=np.int32指定类型
print(arr5)

```

# 排序函数

```python
import numpy as np

arr1 = np.array([12, 2, 33, 14, 5])

print(arr1)

arr2 = np.sort(arr1)  # 这样不修改原来数组
print("*" * 20)
print(arr1)
print(arr2)

arr1.sort()  # 这样直接修改原来数组
print(arr1)
```

# 类型转换

```py
import numpy as np

arr1 = np.arange(0, 10, 2, dtype=np.int64)
print(arr1)
print(type(arr1))

arr2 = arr1.astype(np.float64)
print(arr2)
print(type(arr2))
```

# 常用方法速查

| 方法                | 示例                          | 说明               |
| ------------------- | ----------------------------- | ------------------ |
| np.array()          | np.array([1,2,3])             | 从 Python 列表创建 |
| np.zeros()          | np.zeros((2,3))               | 创建全 0 矩阵      |
| np.ones()           | np.ones((3,3))                | 创建全 1 矩阵      |
| np.eye()            | np.eye(3)                     | 单位矩阵           |
| np.full()           | np.full((2,2),7)              | 指定值填充         |
| np.arange()         | np.arange(0,10,2)             | 生成等差序列       |
| np.linspace()       | np.linspace(0,1,5)            | 生成等间隔序列     |
| np.random.rand()    | np.random.rand(2,3)           | 0~1均匀分布随机数  |
| np.random.randn()   | np.random.randn(2,3)          | 标准正态分布       |
| np.random.randint() | np.random.randint(0,10,(2,2)) | 随机整数矩阵       |

#### 矩阵运算

| 方法             | 示例     | 说明           |
| ---------------- | -------- | -------------- |
| 加法             | A + B    | 按元素         |
| 减法             | A - B    | 按元素         |
| 乘法（逐元素）   | A \* B   | 向量化操作     |
| 点乘（矩阵乘法） | A.dot(B) | 或 np.dot(A,B) |
| 点乘（运算符）   | A @ B    | 同矩阵乘法     |
| 幂               | A \*\* 2 | 每个元素平方   |
| 取反             | -A       | 每个元素取负   |

示例：

```python
A = np.array([[1,2],[3,4]])
B = np.array([[5,6],[7,8]])
C = A @ B
```

#### 常用数学函数

| 函数       | 示例          | 说明     |
| ---------- | ------------- | -------- |
| np.sum()   | np.sum(A)     | 求和     |
| np.mean()  | np.mean(A)    | 均值     |
| np.max()   | np.max(A)     | 最大值   |
| np.min()   | np.min(A)     | 最小值   |
| np.std()   | np.std(A)     | 标准差   |
| np.sqrt()  | np.sqrt(A)    | 开根号   |
| np.exp()   | np.exp(A)     | e^x      |
| np.log()   | np.log(A)     | ln(x)    |
| np.sin()   | np.sin(A)     | 正弦     |
| np.cos()   | np.cos(A)     | 余弦     |
| np.abs()   | np.abs(A)     | 绝对值   |
| np.round() | np.round(A,2) | 保留小数 |

#### 矩阵属性

| 表达式  | 说明     |
| ------- | -------- |
| A.shape | 形状     |
| A.ndim  | 维度     |
| A.size  | 元素总数 |
| A.dtype | 数据类型 |
| A.T     | 转置     |
| A.real  | 实部     |
| A.imag  | 虚部     |

#### 形状操作（Reshape / Flatten）

| 方法        | 示例           | 说明           |
| ----------- | -------------- | -------------- |
| reshape()   | A.reshape(3,2) | 改形状         |
| flatten()   | A.flatten()    | 展平为 1D      |
| ravel()     | A.ravel()      | 展平（更快）   |
| resize()    | A.resize(2,3)  | 直接修改原数组 |
| transpose() | A.transpose()  | 转置           |

示例：

```python
A = np.array([[1,2],[3,4],[5,6]])
A.reshape(2,3)
```

#### 索引操作

普通索引

```python
A[0,1]     # 第一行第二列
A[:,1]     # 所有行，第2列
A[1,:]     # 第2行，所有列
A[0:2, :]  # 前两行
```

布尔索引

```python
A[A > 0]
```

#### 拼接操作（Concatenate / Stack）

| 方法             | 示例                          | 说明         |
| ---------------- | ----------------------------- | ------------ |
| np.concatenate() | np.concatenate([A,B], axis=0) | 合并数组     |
| np.hstack()      | np.hstack([A,B])              | 水平拼接     |
| np.vstack()      | np.vstack([A,B])              | 垂直拼接     |
| np.stack()       | np.stack([A,B], axis=0)       | 新增维度堆叠 |

#### 线性代数

| 方法              | 示例                 | 说明             |
| ----------------- | -------------------- | ---------------- |
| np.linalg.inv()   | np.linalg.inv(A)     | 逆矩阵           |
| np.linalg.det()   | np.linalg.det(A)     | 行列式           |
| np.linalg.eig()   | np.linalg.eig(A)     | 特征值、特征向量 |
| np.linalg.norm()  | np.linalg.norm(A)    | 范数             |
| np.linalg.solve() | np.linalg.solve(A,b) | 解方程：Ax=b     |

示例：

```python
A = np.array([[1,2],[3,4]])
inv = np.linalg.inv(A)
```

#### 随机模块

| 方法                | 示例                          | 说明         |
| ------------------- | ----------------------------- | ------------ |
| np.random.seed()    | np.random.seed(0)             | 设置随机种子 |
| np.random.rand()    | np.random.rand(2,3)           | 均匀分布     |
| np.random.randn()   | np.random.randn(2,3)          | 正态分布     |
| np.random.randint() | np.random.randint(0,10,(2,2)) | 随机整数     |
| np.random.shuffle() | np.random.shuffle(A)          | 原地洗牌     |

#### 类型转换

| 方法     | 示例                 | 说明         |
| -------- | -------------------- | ------------ |
| astype() | A.astype(np.float32) | 转换数据类型 |

#### 读写文件

| 方法         | 示例                  | 说明       |
| ------------ | --------------------- | ---------- |
| np.save()    | np.save('a.npy',A)    | 保存二进制 |
| np.load()    | np.load('a.npy')      | 读取二进制 |
| np.savetxt() | np.savetxt('a.txt',A) | 保存文本   |
| np.loadtxt() | np.loadtxt('a.txt')   | 读取文本   |

#### 常见小技巧

1. 快速生成单位矩阵

```python
np.eye(4)
```

2. 生成一个 10x10 的随机矩阵

```python
np.random.randn(10,10)
```

3. 快速查看数据统计信息

```python
A.min(), A.max(), A.mean(), A.std()
```

4. 比较两个矩阵是否相等

```python
np.allclose(A, B)
```
