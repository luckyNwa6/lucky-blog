---
title: 雷池WAF社区版部署指南
cover: https://imgs.luckynwa.top/profile/yys/29.webp
description: 千里之堤，溃于蚁穴
categories: 工具
tags: Docker
comments: true
abbrlink: toolWaf12
summary: >-
  本文介绍雷池（SafeLine）WAF社区版的Docker部署方法。雷池是长亭科技耗时近10年打造的Web应用防火墙，核心检测能力由智能语义分析算法驱动，工作在应用层，对HTTP/HTTPS协议的Web系统有良好的防护效果。文章从Docker环境准备、镜像加载、compose配置、环境变量生成到容器启动和管理后台访问，给出了完整的安装步骤，并结合多服务器和单服务器两种实际场景，说明了雷池作为反向代理的工作流程和流量过滤原理。
date: 2026-07-09 11:22:21
---

## 简介

雷池（SafeLine）是长亭科技耗时近 10 年倾情打造的 WAF，核心检测能力由智能语义分析算法驱动。

[官方文档点击跳转](https://help.waf-ce.chaitin.cn/node/01973fc6-df0f-7650-bafa-8ed8d2fc2bc1)

WAF 是 Web Application Firewall 的缩写，也被称为 Web 应用防火墙。

区别于传统防火墙，WAF 工作在应用层，对基于 HTTP/HTTPS 协议的 Web 系统有着更好的防护效果，使其免于受到黑客的攻击。

## 安装

本文章采用Docker安装
最低资源需求：1 核 CPU / 1 GB 内存 / 5 GB 磁盘

下载 [雷池社区版镜像包](https://demo.waf-ce.chaitin.cn/image.tar.gz)

并传输到需要安装雷池的服务器上，我新增了/nwa/leichi目录，执行以下命令加载镜像

```shell
cd /nwa/leichi
cat leichi.tar.gz | gzip -d | docker load
```

shell中执行以下命令创建并进入雷池安装目录

```shell
mkdir -p safeline && cd safeline   # 创建 safeline 目录并且进入
```

新建compose.yaml在 safeline 目录中

```yml
networks:
  safeline-ce:
    name: safeline-ce
    driver: bridge
    ipam:
      driver: default
      config:
        - gateway: ${SUBNET_PREFIX:?SUBNET_PREFIX required}.1
          subnet: ${SUBNET_PREFIX}.0/24
    driver_opts:
      com.docker.network.bridge.name: safeline-ce

services:
  postgres:
    container_name: safeline-pg
    restart: always
    image: swr.cn-east-3.myhuaweicloud.com/chaitin-safeline/postgres:15.2
    volumes:
      - ${SAFELINE_DIR}/resources/postgres/data:/var/lib/postgresql/data
      - /etc/localtime:/etc/localtime:ro
    environment:
      - POSTGRES_USER=safeline-ce
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD:?postgres password required}
    networks:
      safeline-ce:
        ipv4_address: ${SUBNET_PREFIX}.2
    command: [postgres, -c, max_connections=600]
    healthcheck:
      test: pg_isready -U safeline-ce -d safeline-ce
  mgt:
    container_name: safeline-mgt
    restart: always
    image: ${IMAGE_PREFIX}/safeline-mgt:${IMAGE_TAG:?image tag required}
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - ${SAFELINE_DIR}/resources/mgt:/app/data
    ports:
      - ${MGT_PORT:-9443}:1443
    healthcheck:
      test: curl -k -f https://localhost:1443/api/open/health
    environment:
      - MGT_PG=postgres://safeline-ce:${POSTGRES_PASSWORD}@safeline-pg/safeline-ce?sslmode=disable
    depends_on:
      - postgres
      - fvm
    dns:
      - 119.29.29.29
      - 223.5.5.5
      - 180.76.76.76
      - 1.2.4.8
      - 114.114.114.114
      - 8.8.8.8
    logging:
      options:
        max-size: '100m'
        max-file: '10'
    networks:
      safeline-ce:
        ipv4_address: ${SUBNET_PREFIX}.4
  detect:
    container_name: safeline-detector
    restart: always
    image: ${IMAGE_PREFIX}/safeline-detector:${IMAGE_TAG}
    volumes:
      - ${SAFELINE_DIR}/resources/detector:/resources/detector
      - ${SAFELINE_DIR}/logs/detector:/logs/detector
      - /etc/localtime:/etc/localtime:ro
    environment:
      - LOG_DIR=/logs/detector
    networks:
      safeline-ce:
        ipv4_address: ${SUBNET_PREFIX}.5
  mario:
    container_name: safeline-mario
    restart: always
    image: ${IMAGE_PREFIX}/safeline-mario:${IMAGE_TAG}
    volumes:
      - ${SAFELINE_DIR}/resources/mario:/resources/mario
      - ${SAFELINE_DIR}/logs/mario:/logs/mario
      - /etc/localtime:/etc/localtime:ro
    environment:
      - LOG_DIR=/logs/mario
      - GOGC=100
      - DATABASE_URL=postgres://safeline-ce:${POSTGRES_PASSWORD}@safeline-pg/safeline-ce
    logging:
      options:
        max-size: '100m'
        max-file: '10'
    networks:
      safeline-ce:
        ipv4_address: ${SUBNET_PREFIX}.6
  tengine:
    container_name: safeline-tengine
    restart: always
    image: ${IMAGE_PREFIX}/safeline-tengine:${IMAGE_TAG}
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /etc/resolv.conf:/etc/resolv.conf:ro
      - ${SAFELINE_DIR}/resources/nginx:/etc/nginx
      - ${SAFELINE_DIR}/resources/detector:/resources/detector
      - ${SAFELINE_DIR}/logs/nginx:/var/log/nginx
      - ${SAFELINE_DIR}/resources/cache:/usr/local/nginx/cache
    environment:
      - TCD_MGT_API=https://${SUBNET_PREFIX}.4:1443/api/open/publish/server
      - TCD_SNSERVER=${SUBNET_PREFIX}.5:8000
      # deprecated
      - SNSERVER_ADDR=${SUBNET_PREFIX}.5:8000
    ulimits:
      nofile: 131072
    network_mode: host
  luigi:
    container_name: safeline-luigi
    restart: always
    image: ${IMAGE_PREFIX}/safeline-luigi:${IMAGE_TAG}
    environment:
      - MGT_IP=${SUBNET_PREFIX}.4
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - ${SAFELINE_DIR}/resources/luigi:/app/data
    logging:
      options:
        max-size: '100m'
        max-file: '10'
    depends_on:
      - detect
      - mgt
    networks:
      safeline-ce:
        ipv4_address: ${SUBNET_PREFIX}.7
  fvm:
    container_name: safeline-fvm
    restart: always
    image: ${IMAGE_PREFIX}/safeline-fvm:${IMAGE_TAG}
    volumes:
      - /etc/localtime:/etc/localtime:ro
    logging:
      options:
        max-size: '100m'
        max-file: '10'
    networks:
      safeline-ce:
        ipv4_address: ${SUBNET_PREFIX}.8
  bridge:
    container_name: safeline-bridge
    restart: always
    image: ${IMAGE_PREFIX}/safeline-bridge:${IMAGE_TAG}
    command:
      - /app/bridge
      - serve
      - -n
      - unix
      - -a
      - /app/run/safeline.sock
    volumes:
      - /etc/localtime:/etc/localtime:ro
      - /var/run:/app/run
    logging:
      options:
        max-size: '100m'
        max-file: '10'
    networks:
      safeline-ce:
        ipv4_address: ${SUBNET_PREFIX}.9
    depends_on:
      - mgt
```

复制并shell执行以下命令，生成雷池运行所需的相关环境变量

```shell
cat >> .env <<EOF
SAFELINE_DIR=$(pwd)
IMAGE_TAG=latest
MGT_PORT=9443
POSTGRES_PASSWORD=$(LC_ALL=C tr -dc A-Za-z0-9 </dev/urandom | head -c 32)
SUBNET_PREFIX=172.22.222
IMAGE_PREFIX=chaitin
EOF
```

```shell
docker compose up -d #生成容器

docker compose down # 停止并移除所有容器

docker exec safeline-mgt resetadmin 查看账号密码
```

云服务器打开9443端口

https://ip:9443

登录，认证手机下载一个auth这种的扫一下

![4759605d59a79ffcab06529b572ae7e2](https://cloud.luckynwa.top/profile/2026/07/09/3a325718bc35498d90690ed2abd237b0.png)

添加站点

![c361a448187ca829987fcd4861ff5d1a](https://cloud.luckynwa.top/profile/2026/07/09/47e5b643002d402789acf39be91aed56.png)

它是作为反向代理来使用的默认是80我也不会改，说下它的工作场景

用户A访问域名正常没雷池------>NG----->自己的网站展示
用户A访问域名正常-------->雷池------>NG----->自己的网站展示

流量就通过雷池的过滤把正常的返回给我们自己的NG上防止sql注入等危害

## 场景

我现在2台服务器，1台N用来部署雷池，1台M是专门弄网站的，M里2个NG，一个80,一个9091
现在上面的配置输入

- 80
  上游服务器 如下
  http://M的ip:9091
  用户A访问域名正常---->NG80解析域名代理-------->雷池------>NG9091----->自己的网站展示
  由于我域名解析在NG80就懒得换别的方式了

如果就1台服务器，80给雷池，NG在9091端口，雷池那443证书给上，就可以少掉一个代理，用户直接到雷池再到NG
