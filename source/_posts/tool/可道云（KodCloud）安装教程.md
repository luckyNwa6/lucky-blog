---
title: 可道云（KodCloud）安装教程
cover: https://imgs.luckynwa.top/profile/yys/814.webp
description: 问渠那得清如许，为有源头活水来
categories: 工具
tags: Docker
comments: true
abbrlink: tool889
summary: >-
  本文介绍了可道云（KodCloud）的两种Docker安装方案。方案一为简单安装，直接使用docker pull拉取镜像，配合docker run命令快速部署，支持设置Redis和MySQL，可配置SSL证书。方案二使用docker-compose编排，包含MariaDB数据库、Redis缓存和可道云应用三个服务，提供完整的环境变量配置文件，适合需要数据库支持的生产环境部署。两种方案均支持自定义端口和持久化目录。
date: 2026-06-01 11:22:21
---

# 简介

​ 可道云是一款基于Web的私有云存储和文档管理平台，类似于Nextcloud/ ownCloud。支持在线预览文档、图片、视频等文件，提供文件上传下载、分享、协作等功能。

# 安装

## 方案1

单独设置redis和mysql

```bash
docker pull kodcloud/kodbox
docker pull registry.cn-hangzhou.aliyuncs.com/lucky-warehouse/kodbox:latest
```

创建文件夹 /nwa/docker/kodcloud

```bash
docker run -d --name kodcloud -p 8787:80 -v /nwa/docker/kodcloud/:/var/www/html --restart=always registry.cn-hangzhou.aliyuncs.com/lucky-warehouse/kodbox:latest
```

开源地址：https://github.com/KodCloud-dev/docker || https://github.com/KodCloud-dev/docker?tab=readme-ov-file

admin 221..

有ssl证书，则使用
证书格式必须是 fullchain.pem privkey.pem

```bash
docker run -d -p 443:443  -v "你的证书目录":/etc/nginx/ssl --name kodbox kodcloud/kodbox
```

## 方案2

cd /nwa/docker
下存放db.env文件如下和docker-compose.yml文件

运行

```bash
docker-compose up -d
```

db.env

```yaml
MYSQL_PASSWORD=nwa666
MYSQL_DATABASE=kodbox
MYSQL_USER=kodbox
```

docker-compose.yml

```yaml
version: '3.1'

services:
  db:
    image: mariadb:10.6
    restart: always
    command: --transaction-isolation=READ-COMMITTED --log-bin=binlog --binlog-format=ROW
    volumes:
      - './db:/var/lib/mysql' #./db是数据库持久化目录，可以修改
    environment:
      - MYSQL_ROOT_PASSWORD=nwa666
      - MARIADB_AUTO_UPGRADE=1
      - MARIADB_DISABLE_UPGRADE_BACKUP=1
    env_file:
      - db.env

  app:
    image: kodcloud/kodbox
    restart: always
    ports:
      - 80:80 #左边80是使用端口，可以修改
    volumes:
      - './site:/var/www/html' #./site是站点目录位置，可以修改
    environment:
      - MYSQL_HOST=db
      - REDIS_HOST=redis
    env_file:
      - db.env
    depends_on:
      - db
      - redis

  redis:
    image: redis:alpine
    restart: always
```
