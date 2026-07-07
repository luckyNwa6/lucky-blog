---
title: Nacos
cover: https://cloud.luckynwa.top/profile/yys/327.webp
description: 时人不识凌云木，直待凌云始道高
categories: 工具
tags: Middleware
comments: true
abbrlink: tool9
summary: >-
  本文介绍 Nacos 1.4.1 的安装配置与启动方法，包括单机模式设置、启动命令、访问地址和默认账号密码，帮助开发者快速搭建服务注册与配置中心本地环境。
date: 2024-08-26 03:19:26
---

# 启动配置

Nacos 是 1.4.1 版本。

修改 `startup.cmd` 配置：

```
set MODE="standalone"
```

移动文件夹的不需要配置，直接打开 `D:\bgsoft\nacos\bin` 里的 `startup.cmd` 即可启动。

- **访问地址：** http://localhost:8848/nacos/index.html
- **账号：** `nacos`
- **密码：** `nacos`

> ⚠️ 2.2.0 以及之前都有漏洞，这个版本只适合单机。
