---
title: 项目部署（ jar 和 war 包部署）
cover: https://imgs.luckynwa.top/profile/yys/379.webp
description: 纸上得来终觉浅，绝知此事要躬行
categories: 工具
tags: Tool
comments: true
abbrlink: tooljarwar222
summary: >-
  本文介绍在 Linux 服务器上部署 Java 应用的两种方式：war 包部署到 Tomcat 和 jar 包直接运行。
  涵盖了 Tomcat 的两种部署方法（webapps 自动解压和 manager 页面上传），jar 包的后台运行、进程管理、
  远程调试配置，以及常用的 Docker Nginx 操作命令。适用于需要在云服务器上发布 Java Web 服务的开发者。
date: 2023-09-23 07:11:36
---

## 常用指令

不断执行 && 远程debugger项目

```shell
nohup java -Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=5005,suspend=n -jar lucky-api.jar --spring.profiles.active=prod &
```

查看java进程

```shell
ps -aux | grep java | grep -v grep
```

关闭进程

```shell
kill -9 进程id
```

## 服务器Java环境安装

```shell
yum list java-1.8*
yum install java-1.8.0-openjdk

java -version

sudo yum remove java-1.8.0-openjdk
sudo yum remove java-1.8.0-openjdk java-1.8.0-openjdk-headless
```

## Tomcat 部署

**方法1：webapps 直接部署**

war包直接放在tomcat的webapps目录下，当tomcat能运行的时候，会自动解压，再去访问自己war的那个地址。比如 HomeAdmin.war 放在那里，http://162.14.96.81:8080/HomeAdmin/ 这样就能直接访问。记得打开端口和防火墙。

**方法2：manager 页面部署**

配置文件看Tomcat部署文章。http://162.14.96.81:8081/manager/html 打开，并且再要部署的war文件那个选择文件按钮，点击上传war，访问方式依旧和1一样。

## jar 包部署

jar包只需要安装好jdk，然后放在云文件夹的/www/root下新建一个文件夹myproject来装，比如C/S架构的服务器就可以直接放这里不断的去运行它。打开这个的终端 `java -jar 文件名.jar` 这个只能运行到终端没关闭，想不断运行则输入

```shell
nohup java -jar xxx.jar   # 这行输入即可关闭终端，也会一直保留，下面几行不用输入
```

**jar 包后台运行**

```shell
ctrl+z                 # 挂起到后台
bg                     # 后台执行
ctrl+d                 # 退出当前但程序还在

java -jar xxx.jar      # 只当前运行，关掉终端即关闭
```

**关闭进程**

记得双开宝塔

```shell
ps -aux | grep java

ps -aux | grep java | grep -v grep          # 排除 grep java 进程
```

找到

`root       978 31.6 14.5 3067424 298600 ?      Sl   09:23   0:12 java -jar           myspringboot.jar`

这个978就是pid

```shell
kill -9 978
```

**jar 包启动命令**

```shell
cd /nwa/staticPhotos

nohup java -jar lucky-api.jar --spring.profiles.active=prod &

# 远程debugger 注意包名5005打开 idea开启一个jvm调试配置ip端口即可
nohup java -Xdebug -Xrunjdwp:server=y,transport=dt_socket,address=5005,suspend=n -jar lucky-api.jar --spring.profiles.active=prod &
```
