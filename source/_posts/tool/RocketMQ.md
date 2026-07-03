---
title: RocketMQ
cover: https://imgs.luckynwa.top/openApi/lucky/yys/364
description: 工欲善其事，必先利其器
categories: 工具
tags: RocketMQ
comments: true
abbrlink: 21584
summary: >-
  本文介绍 RocketMQ 4.9.3 的安装配置与启动方法，包括 NameServer 和 Broker 的启动命令、JVM 内存参数调整，帮助开发者快速搭建消息队列本地开发环境。
date: 2022-01-01 11:22:21
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
