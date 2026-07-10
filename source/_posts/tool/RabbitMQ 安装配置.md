---
title: RabbitMQ 安装配置
cover: https://imgs.luckynwa.top/profile/yys/635.webp
description: 锲而不舍，金石可镂
categories: 工具
tags: Middleware
comments: true
abbrlink: toolmq332
summary: >-
  本文详细介绍了在Windows系统上安装和配置RabbitMQ消息队列的完整步骤。RabbitMQ是一个开源的消息代理软件，实现了高级消息队列协议（AMQP），用于在分布式系统中存储和转发消息。文章从erlang运行环境的安装开始，依次讲解了环境变量配置、服务验证、管理插件启用等关键环节。通过本教程，读者可以快速在本地搭建RabbitMQ服务，并通过Web管理界面监控消息队列的运行状态，包括连接数、通道、交换机、队列等核心组件的管理。
date: 2023-09-16 03:30:11
---

# 简介

RabbitMQ是一个开源的消息代理软件（也称消息中间件），实现了高级消息队列协议（AMQP）。它接受并转发消息，可以用来解耦分布式系统中的各个组件，实现异步通信、流量削峰、消息路由等功能。RabbitMQ支持多种消息模式，包括发布/订阅、点对点、路由等，广泛应用于微服务架构和企业级系统中。

# 安装

**erlang Windows下载地址：** https://github.com/erlang/otp/releases/download/OTP-25.0.2/otp_win64_25.0.2.exe

**RabbitMQ Windows下载地址：** [exe](https://github.com/rabbitmq/rabbitmq-server/releases/download/v3.10.5/rabbitmq-server-3.10.5.exe)

> 先装 erlang 再装 RabbitMQ

## 环境变量配置

安装完成后需要配置系统环境变量：

| 变量名          | 值                                   |
| --------------- | ------------------------------------ |
| `ERLANG_HOME`   | `D:\soft\Erlang OTP`                 |
| `RABBITMQ_HOME` | `D:\soft\rmq\rabbitmq_server-3.10.5` |

编辑 `Path` 变量，添加以下内容：

```text
%ERLANG_HOME%\bin
%RABBITMQ_HOME%\sbin
```

## 验证安装

打开命令提示符，依次执行以下命令验证安装是否成功：

```bash
erl
rabbitmqctl status
```

## 配置RabbitMQ管理界面

在命令提示符中执行以下命令启用管理插件：

```bash
rabbitmq-plugins enable rabbitmq_management
```

启用后访问：**http://localhost:15672/**

**用户名和密码：** `guest` / `guest`

## 管理界面功能说明

| 功能模块    | 说明                                                       |
| ----------- | ---------------------------------------------------------- |
| Overview    | 概述。包括消息数、集群节点、端口等信息                     |
| Connections | 查看连接情况。包括生产者和消费者                           |
| Channels    | 通道。建立连接之后，会形成通道，消息的投递取决于建立的通道 |
| Exchanges   | 交换机。用来实现消息的路由                                 |
| Queues      | 队列。消息存放在队列中，等待消费，消费后会被移除队列       |
| Admin       | 用户和虚拟主机的管理面板                                   |
