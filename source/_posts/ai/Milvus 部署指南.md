---
title: Milvus 部署指南
cover: https://imgs.luckynwa.top/profile/yys/355.webp
description: 山重水复疑无路，柳暗花明又一村
categories: 人工智能
tags: Docker
comments: true
abbrlink: ail9c5
summary: >-
  本文介绍通过 Docker Compose 部署 Milvus Standalone 模式的完整配置，包含 etcd 元数据存储、MinIO 对象存储依赖、健康检查、数据持久化卷挂载及 Attu 图形化管理工具的搭建方法。
date: 2025-08-10 09:15:00
---

## 简介

Milvus 是一款开源的向量数据库，专为 AI 应用中的向量相似性检索而设计。它支持多种向量索引类型（如 IVF_FLAT、HNSW、DiskANN），能够高效处理亿级向量的检索任务，广泛应用于图像识别、自然语言处理、推荐系统等场景。Milvus 采用存算分离架构，依赖 etcd 存储元数据、MinIO 存储数据文件。

> 先开科学，Ubuntu 可以直接访问 Win 的代理。

## 拉取镜像

```shell
docker pull quay.io/coreos/etcd:v3.5.5
docker pull minio/minio:RELEASE.2023-03-20T20-16-18Z
docker pull milvusdb/milvus:v2.3.12
```

## docker-compose.yml

```yaml
version: '3.5'

services:
  etcd:
    container_name: milvus-etcd
    image: quay.io/coreos/etcd:v3.5.5
    restart: unless-stopped
    environment:
      ETCD_AUTO_COMPACTION_MODE: revision
      ETCD_AUTO_COMPACTION_RETENTION: '1000'
      ETCD_QUOTA_BACKEND_BYTES: '4294967296'
      ETCD_SNAPSHOT_COUNT: '50000'
    command: >
      etcd
      --advertise-client-urls=http://etcd:2379
      --listen-client-urls=http://0.0.0.0:2379
      --data-dir=/etcd
    volumes:
      - ./volumes/etcd:/etcd
    healthcheck:
      test: ['CMD', 'etcdctl', 'endpoint', 'health']
      interval: 30s
      timeout: 20s
      retries: 3

  minio:
    container_name: milvus-minio
    image: minio/minio:RELEASE.2023-03-20T20-16-18Z
    restart: unless-stopped
    environment:
      MINIO_ACCESS_KEY: minioadmin
      MINIO_SECRET_KEY: minioadmin
    command: >
      minio server /minio_data
      --console-address ":9001"
    volumes:
      - ./volumes/minio:/minio_data
    # 不向宿主机暴露任何端口，仅供 Docker 网络内部访问
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:9000/minio/health/live']
      interval: 30s
      timeout: 20s
      retries: 3

  standalone:
    container_name: milvus-standalone
    image: milvusdb/milvus:v2.3.12
    restart: unless-stopped
    command: ['milvus', 'run', 'standalone']
    security_opt:
      - seccomp:unconfined
    environment:
      ETCD_ENDPOINTS: etcd:2379
      MINIO_ADDRESS: minio:9000
      MINIO_ACCESS_KEY: minioadmin
      MINIO_SECRET_KEY: minioadmin
    volumes:
      - ./volumes/milvus:/var/lib/milvus
    ports:
      # Milvus gRPC
      - '19530:19530'
      # Milvus HTTP / Health
      - '9095:9091'
    depends_on:
      - etcd
      - minio
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:9091/healthz']
      interval: 30s
      start_period: 90s
      timeout: 20s
      retries: 3

networks:
  default:
    name: milvus
```

## 启动服务

```shell
docker-compose up -d
```

## 部署 Attu 管理工具

Attu 是 Milvus 的图形化管理工具，方便对 Milvus 进行可视化操作。

```shell
docker run -d \
  --name attu \
  --restart unless-stopped \
  --network milvus \
  -p 19531:3000 \
  -e MILVUS_URL=milvus-standalone:19530 \
  zilliz/attu:v2.3.9
```

> 暴露端口：19530、19531、9095

## 参考文档

[Milvus 官方文档](https://milvus.io/docs/zh/quickstart.md)
