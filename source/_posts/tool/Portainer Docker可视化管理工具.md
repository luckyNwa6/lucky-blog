---
title: Portainer Docker可视化管理工具
cover: https://imgs.luckynwa.top/profile/yys/258.webp
description: 古之立大事者，不惟有超世之才，亦必有坚忍不拔之志
categories: 工具
tags: Docker
comments: true
abbrlink: toolPortainer317
summary: >-
  Portainer是一款轻量级的Docker可视化管理工具，提供Web界面来管理Docker环境。本文介绍了Portainer的安装方法，包括拉取镜像、汉化配置以及容器部署步骤，帮助用户快速搭建一个中文界面的Docker管理平台。
date: 2023-01-21 11:22:21
---

## 简介

Portainer是一款轻量级的Docker可视化管理工具，提供Web界面来管理Docker环境。通过Portainer可以直观地管理容器、镜像、网络和卷等Docker资源，无需记忆复杂的命令行指令。

## 安装

拉取镜像

```shell
docker pull registry.cn-hangzhou.aliyuncs.com/lucky-warehouse/portainer-ce:2.9.1
```

汉化文件地址 https://github.com/eysp/public/releases/tag/public

中文 上传public-public.tar.gz到/nwa/docker/portainer下

解压

```shell
tar -zvxf public-public.tar.gz
mv public-public public
```

安装容器

```shell
docker run -d --restart=always \
--name="portainer" \
-p 9209:9000 \
-v /var/run/docker.sock:/var/run/docker.sock \
-v portainer_data:/data \
-v /nwa/docker/portainer/public:/public \
registry.cn-hangzhou.aliyuncs.com/lucky-warehouse/portainer-ce:2.9.1
```

访问地址：http://47.98.230.128:9209

密码：Nw..
