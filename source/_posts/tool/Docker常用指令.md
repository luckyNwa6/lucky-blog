---
title: Docker常用指令
cover: https://imgs.luckynwa.top/profile/yys/147.webp
description: 路漫漫其修远兮，吾将上下而求索
categories: 工具
tags: Docker
comments: true
abbrlink: tooldocker22223
summary: >-
  本文整理了Docker的常用命令，包括容器管理（查看、启动、停止、删除）、镜像管理（搜索、下载、删除）、日志查看、容器进入、开机自启设置等实用操作，是Docker运维的速查手册。
date: 2026-02-02 11:22:21
---

## 容器管理命令

```shell
docker ps                        查看正在运行的容器
docker ps -a                     查看所有的容器
docker ps -a -q                  查看所有容器ID
docker start 容器id              启动容器
docker restart 容器id            重启容器
docker stop 容器id               停止当前正在运行的容器
docker kill 容器id               强制停止当前容器
docker rm 容器id                 删除指定的容器（不能删除正在运行的容器）
docker rm -f 容器id              强制删除指定容器
docker rm -f $(docker ps -aq)    删除所有的容器
docker ps -a -q|xargs docker rm  删除所有的容器
```

## 镜像管理命令

```shell
docker images                    查看已安装的镜像
docker pull                      下载镜像
docker search                    搜索镜像
docker rmi -f 镜像id             强制删除指定镜像
docker rmi -f 镜像id 镜像id 镜像id    删除多个镜像
docker rmi -f $(docker images -aq)   删除全部镜像
```

## 容器操作命令

```shell
docker exec -it 容器id bash      进入容器
docker logs -f 容器名称          查看容器运行的日志
```

## 系统管理命令

```shell
docker info                      显示docker的系统信息（包括镜像和容器的数量）
docker --help                    帮助命令（查看所有的命令）
```

## 开机自启管理

```shell
docker update --restart=no $(docker ps -a -q)        全部容器都禁止开机自启
docker update --restart=always $(docker ps -a -q)    全部容器都允许开机自启
docker update 容器名称 --restart=always               启用指定容器开机自启
docker update 容器名称 --restart=no                   禁止指定容器开机自启
```
