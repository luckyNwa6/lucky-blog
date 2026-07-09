---
title: Joplin 笔记管理工具搭建
cover: https://imgs.luckynwa.top/profile/yys/135.webp
description: 人生自古谁无死，留取丹心照汗青
categories: 工具
tags: Docker
comments: true
abbrlink: tool222
summary: >-
  Joplin是一个开源的笔记管理工具，支持端到端加密，可通过自建服务器实现多设备同步。
  本文介绍如何使用Docker Compose部署Joplin Server，包括配置PostgreSQL数据库、
  设置容器端口映射、配置基础URL等步骤。部署完成后通过浏览器访问Joplin Server，
  并在桌面客户端中配置同步设置，实现笔记的云端备份和跨设备同步。
date: 2022-01-01 11:22:21
---

## 简介

Joplin是一款开源的笔记管理工具，支持Markdown格式和端到端加密，可通过自建服务器实现多设备同步。

官网：[Joplin](https://joplinapp.org/download/#joplin-app-for-desktop)

## 部署步骤

新建文件夹 `/nwa/joplin`，在其中创建 `docker-compose.yml` 配置文件。如需更换外部端口，修改 `22301` 即可，并在防火墙中开放该端口。

```yaml
services:
  db:
    image: postgres:13.1
    volumes:
      - ./data/postgres:/var/lib/postgresql/data
    ports:
      - '5432:5432'
    restart: unless-stopped
    environment:
      - POSTGRES_PASSWORD=lucky
      - POSTGRES_USER=lucky
      - POSTGRES_DB=lucky

  app:
    image: registry.cn-hangzhou.aliyuncs.com/lucky-warehouse/server:latest
    depends_on:
      - db
    ports:
      - '22301:22300'
    restart: unless-stopped
    environment:
      - APP_PORT=22300
      - APP_BASE_URL=http://ip:22301/
      - DB_CLIENT=pg
      - POSTGRES_PASSWORD=lucky
      - POSTGRES_DATABASE=lucky
      - POSTGRES_USER=lucky
      - POSTGRES_PORT=5432
      - POSTGRES_HOST=db
```

执行启动命令：

```shell
cd /nwa/joplin
docker compose up -d
```

## 访问地址

- 地址：http://IP:22300`（暴露22300端口）

## 默认账号

- 用户名：admin@localhost
- 默认密码：admin

## 客户端配置

在Joplin桌面版中，进入 **工具 → 选项 → 同步**：

1. 将同步目标选为 **Joplin Server**
2. 设置服务器路径：`http://IP:22300`
3. 填写用户名和密码
