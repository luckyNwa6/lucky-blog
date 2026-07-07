---
title: RocketMQ
cover: https://imgs.luckynwa.top/profile/yys/236.webp
description: 男儿何不带吴钩，收取关山五十州
categories: 工具
tags: Middleware
comments: true
abbrlink: tool12
summary: >-
  本文介绍 RocketMQ 4.9.3 的安装配置与启动方法，包括 NameServer 和 Broker 的启动命令、JVM 内存参数调整，帮助开发者快速搭建消息队列本地开发环境。
date: 2023-09-16 03:40:11
---

# 安装

移动包到 `D:\bgsoft\rocketmq-4.9.3`

1. 运行 `bin` 下 `mqnamesrv.cmd`
2. 在 `bin` 目录下打开 CMD，输入：

```shell
mqbroker.cmd -n localhost:9876
```

# 配置修改（文件夹中已配置）

**修改 `bin/runserver.cmd` 的 `JAVA_OPT`：**

```shell
rem set "JAVA_OPT=%JAVA_OPT% -server -Xms2g -Xmx2g -Xmn1g"
set "JAVA_OPT=%JAVA_OPT% -server -Xms256m -Xmx512m"
```

**修改 `bin/runbroker.cmd` 的 `JAVA_OPT`：**

```shell
rem set "JAVA_OPT=%JAVA_OPT% -server -Xms2g -Xmx2g -Xmn1g"
set "JAVA_OPT=%JAVA_OPT% -server -Xms256m -Xmx512m"
```
