---
title: Java 环境
cover: https://imgs.luckynwa.top/openApi/lucky/yys/180
description: 读书破万卷，下笔如有神
categories: 工具
tags: Doc
comments: true
abbrlink: tool4
summary: >-
  本文介绍 JDK 8、JDK 11 的安装配置与环境变量设置，包括 JAVA_HOME、CLASSPATH、Path 配置以及多版本切换方法，帮助开发者快速搭建 Java 开发环境。
date: 2023-07-22 10:21:57
---

# JDK 8

## 安装与环境变量

1. 先装 JDK，默认安装即可
2. 配置环境变量：`此电脑` 右键 → 属性 → 高级系统设置 → 环境变量

**新建 `JAVA_HOME`：**

```
C:\Program Files\Java\jdk1.8.0_271
```

**新建 `CLASSPATH`：**

```
.;%JAVA_HOME%\lib;%JAVA_HOME%\lib\tools.jar
```

**编辑 `Path`，新增：**

```
%JAVA_HOME%\bin
```

## 验证

```shell
java -version        # java version "1.8.0_271"
javac
```

# JDK 11

## 安装

直接安装 `jdk-11.0.22_windows-x64_bin.exe`，默认装即可。如果是 zip 也解压到 `C:\Program Files\Java` 下。

此时有 3 个文件夹：`jdk-11`、`jdk1.8.0_271`、`jre1.8.0_271`

## 环境变量配置

`此电脑` → 属性 → 高级系统设置 → 环境变量

**新建变量（严格按下面）：**

```
JAVA11_HOME    C:\Program Files\Java\jdk-11
JAVA8_HOME     C:\Program Files\Java\jdk1.8.0_271
```

**修改 `JAVA_HOME` 变量值：**

```
%JAVA11_HOME%      # 想要哪个改哪个
```

**`CLASSPATH` 没有则新建：**

```
.;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;%JAVA_HOME%\lib;
```

**编辑 `Path`，将 `%JAVA_HOME%\bin` 移动到最前面。**

## 验证

```shell
java -version
```
