---
title: Tomcat 部署
cover: https://imgs.luckynwa.top/profile/yys/235.webp
description: 天将降大任于斯人也，必先苦其心志
categories: 工具
tags: Docker
comments: true
abbrlink: tomcat001
summary: >-
  本文详细介绍 Docker 环境下安装 Tomcat 8 的完整流程。从拉取镜像、运行容器开始，讲解如何解决 webapps 空目录问题，以及如何安装 vim 编辑器。重点介绍 Tomcat Manager App 的配置方法，包括修改 tomcat-users.xml 设置用户权限，配置 context.xml 开放访问限制，最终实现通过 Web 界面管理部署的应用。
date: 2023-09-23 07:01:36
---

## 简介

Apache Tomcat 是开源 Java Web 应用服务器，它实现了对 Servlet、JSP（Java Server Pages）的支持。Tomcat 本质上是一个轻量级的应用服务器，主要用于运行 Java 编写的 Web 应用程序。

**主要用途：**

- 部署和运行 Java Web 应用（JSP、Servlet）
- 作为 Web 服务器处理 HTTP 请求
- 提供 Manager App 管理界面，方便部署和管理应用
- 开发和测试环境中运行 Java 项目

**常见应用场景：**

- Java 项目的开发调试环境
- 中小型网站的生产环境部署
- Spring Boot 等框架的内嵌服务器（Tomcat 是默认内嵌服务器）

## 运行容器

```shell
docker pull tomcat:8

docker run --name tomcat8 -p 8081:8080 -d tomcat:8
```

`--name` 给容器起名字，`-p` 主机端口:容器内部端口，`-d` 后台运行。

## 进入容器

```shell
docker exec -it tomcat8 bash
```

## 解决 webapps 空目录问题

进入容器后，Tomcat 默认的 webapps 目录为空，需要将 webapps.dist 复制过来：

```shell
rm -r webapps
mv webapps.dist/ webapps
```

此时访问 `http://luckynwa.top:8081/` 即可看到页面，但无法访问 Manager App，需修改配置。

```shell
cd conf
```

## 安装 vim 编辑器

Docker 是基于 Linux 的，vim 是其命令，需要安装：

```shell
apt-get update
apt-get install vim
clear
```

`clear` 用于清空页面。

## 配置 Tomcat 用户权限

编辑 `tomcat-users.xml`：

```shell
vim tomcat-users.xml
```

键盘按下 `i` 进入编辑模式，解除 3 行注释并修改：

```xml
<role rolename="tomcat"/>
<role rolename="manager-gui"/>
<user username="tomcat" password="tomcat" roles="manager-gui"/>
<!--
<user username="both" password="<must-be-changed>" roles="tomcat,role1"/>
<user username="role1" password="<must-be-changed>" roles="role1"/>
-->
</tomcat-users>
```

编辑完成后按 `ESC`，输入 `:wq` 保存退出。

## 配置 Manager App 访问权限

退出容器后重新进入：

```shell
exit
docker exec -it tomcat8 bash
cd webapps/manager/META-INF
vim context.xml
```

按 `i` 编辑，修改为：

```xml
allow="127\.\d+\.\d+\.\d+|::1|0:0:0:0:0:0:0:1|\d+\.\d+\.\d+\.\d+" />
```

## 重启并访问

```shell
docker restart tomcat8
```

访问 Manager App：

- 地址：`http://ip:8081/manager/html`
- 账号密码：tomcat
