---
title: Tomcat 环境
cover: https://imgs.luckynwa.top/profile/yys/463.webp
description: 苟利国家生死以，岂因祸福避趋之
categories: 工具
tags: Tool
comments: true
abbrlink: tool13
summary: >-
  本文介绍 Apache Tomcat 8.5.83 的安装配置、环境变量设置、乱码问题修复、WAR 包部署以及 IDEA 中使用本地 Tomcat 的方法，帮助开发者快速搭建 Java Web 服务器环境。
date: 2023-09-23 07:01:33
---

# 环境变量配置

版本：`apache-tomcat-8.5.83`

新建环境变量：

```
CATALINA_HOME    D:\bgsoft\apache-tomcat-8.5.83
CATALINA_BASE    D:\bgsoft\apache-tomcat-8.5.83
```

`Path` 中添加：

```
%CATALINA_HOME%\bin
```

# 乱码问题修复

修改 `D:\bgsoft\apache-tomcat-8.5.83\conf\logging.properties`

第 47 行：

```
java.util.logging.ConsoleHandler.encoding = UTF-8
```

改为：

```
java.util.logging.ConsoleHandler.encoding = GBK
```

# 启动与访问

去 `bin` 目录 CMD 运行 `startup.bat` 打开服务器，浏览器访问：

```
http://localhost:8080/
```

# 部署 WAR 包

- 将 WAR 包放在 `D:\bgsoft\apache-tomcat-8.5.83\webapps` 中
- 访问 `http://localhost:8080/luckyNwa`（后面是 WAR 的名称）
- 静态页面：`http://localhost:8080/luckyDemo/goodsTb.html`
- 也可以上传 WAR 包到 Tomcat 服务器，点击 `Manager App`，输入账号 `root` 密码 `123456`

# IDEA 使用本地 Tomcat

IDEA 上面点编辑 → `+` → 找到 Tomcat 本地 → Name 起个名 → Deployment 选择 Artifact 的项目编译 WAR → 确定即可运行。
