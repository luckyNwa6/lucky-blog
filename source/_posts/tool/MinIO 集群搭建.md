---
title: MinIO 集群搭建
cover: https://imgs.luckynwa.top/profile/yys/678.webp
description: 长风破浪会有时，直挂云帆济沧海
categories: 工具
tags: Docker
comments: true
abbrlink: tool773
summary: >-
  MinIO 是一款热门、轻量、开源的对象存储方案，完美兼容 AWS S3 协议，友好支持 K8s，专为 AI 等云原生工作负载而设计。
  本文记录了 MinIO 集群的搭建过程，使用 Docker Compose 部署 4 个 MinIO 实例并搭配 Nginx 反向代理实现负载均衡，
  涵盖配置文件编写、集群启动、访问地址及基本使用说明。
date: 2023-11-11 11:22:21
---

## 简介

MinIO 是一款热门、轻量、开源的对象存储方案，完美兼容 AWS S3 协议，友好支持 K8s。MinIO 是专为 AI 等云原生工作负载而设计的，可以为高性能的云原生数据机器学习、大数据分析、海量存储的基础架构等提供数据工作负载。

## 安装

在 `/nwa/minio` 下新建 `docker-compose.yml`：

```yaml
version: '3.7'

# 所有容器通用的设置和配置
x-minio-common: &minio-common
  image: minio/minio
  command: server --console-address ":9001" http://minio{1...4}/data
  expose:
    - '9000'
  environment:
    MINIO_PROMETHEUS_AUTH_TYPE: public
    MINIO_PROMETHEUS_URL: http://106.53.76.173:6061 #普罗米修斯的地址
    MINIO_PROMETHEUS_JOB_ID: minio-job #普罗米修斯里它的名称
    MINIO_ROOT_USER: minioadmin
    MINIO_ROOT_PASSWORD: Nwa741741
  healthcheck:
    test: ['CMD', 'curl', '-f', 'http://localhost:9000/minio/health/live']
    interval: 30s
    timeout: 20s
    retries: 3

# 启动4个docker容器运行minio服务器实例
# 使用nginx反向代理9000端口，负载均衡, 你可以通过9001、9002、9003、9004端口访问它们的web console
services:
  minio1:
    <<: *minio-common
    hostname: minio1
    ports:
      - '9001:9001'
    volumes:
      - ./data/data1:/data

  minio2:
    <<: *minio-common
    hostname: minio2
    ports:
      - '9002:9001'
    volumes:
      - ./data/data2:/data

  minio3:
    <<: *minio-common
    hostname: minio3
    ports:
      - '9003:9001'
    volumes:
      - ./data/data3:/data

  minio4:
    <<: *minio-common
    hostname: minio4
    ports:
      - '9004:9001'
    volumes:
      - ./data/data4:/data

  nginx:
    image: nginx:1.19.2-alpine
    hostname: nginx
    volumes:
      - ./config/nginx.conf:/etc/nginx/nginx.conf:ro
    ports:
      - '9000:9000'
    depends_on:
      - minio1
      - minio2
      - minio3
      - minio4
```

## 配置 Nginx 反向代理

在 `/nwa/minio/config` 下新建 `nginx.conf`：

```nginx
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;

events {
    worker_connections  4096;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;
    sendfile        on;
    keepalive_timeout  65;

    # include /etc/nginx/conf.d/*.conf;

    upstream minio {
        server minio1:9000;
        server minio2:9000;
        server minio3:9000;
        server minio4:9000;
    }

    server {
        listen       9000;
        listen  [::]:9000;
        server_name  localhost;

        # To allow special characters in headers
        ignore_invalid_headers off;
        # Allow any size file to be uploaded.
        # Set to a value such as 1000m; to restrict file size to a specific value
        client_max_body_size 0;
        # To disable buffering
        proxy_buffering off;

        location / {
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;

            proxy_connect_timeout 300;
            # Default is HTTP/1, keepalive is only enabled in HTTP/1.1
            proxy_http_version 1.1;
            proxy_set_header Connection "";
            chunked_transfer_encoding off;

            proxy_pass http://minio;
        }
    }
}
```

## 启动集群

在 minio 文件夹下新建终端，启动它：

```shell
cd /nwa/minio
docker-compose up -d
```

## 端口说明

端口打开 5 个，9000-9004。9000 是 Nginx，其他 4 个是 MinIO 实例的。

## 访问地址

- http://ip:9001/login

用户名：`minioadmin`
密码：`Nwa741741`

## 赋予启动脚本权限

```shell
sudo chmod +x /nwa/minio/docker-start.sh
```

## 常见问题

虚拟机启动时 MinIO 是关闭状态，需要重新启动：

```shell
cd /nwa/minio
docker-compose up -d
```

## 使用说明

登录后，去 users 配置新增一个 access key、密钥及权限（后面要用），再去建个桶 `lucky`，点击设置改 public，去 IDEA 导入依赖。

修改 `docker-compose.yml` 后使其生效：

```shell
docker-compose up --force-recreate -d
```
