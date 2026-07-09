---
title: Neo4j 部署指南
cover: https://imgs.luckynwa.top/profile/yys/1.webp
description: 沉舟侧畔千帆过，病树前头万木春
categories: 人工智能
tags: Docker
comments: true
abbrlink: ai2l7a3
summary: >-
  本文介绍通过 Docker 部署 Neo4j 的完整流程，包括镜像拉取、数据目录创建与权限设置、容器启动命令及持久化卷挂载，同时启用 graph-data-science 插件，确保图数据库在容器中稳定运行。
date: 2025-06-15 10:30:00
---

## 简介

Neo4j 是一款基于图结构的 NoSQL 数据库，以节点、关系和属性的方式存储数据，擅长处理社交网络、知识图谱、推荐系统等高度关联的数据查询场景。相比传统关系型数据库，Neo4j 在多层关联查询中性能优势显著，支持 Cypher 查询语言，并提供丰富的可视化工具和插件生态。

## 拉取镜像

```shell
docker pull swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/neo4j:latest
```

拉取完成后重命名镜像：

```shell
docker tag swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/neo4j:latest docker.io/neo4j:latest
```

## 创建数据目录

```shell
mkdir -p /opt/neo4j_data/{data,logs,conf,import,plugins}
# 将目录的所有者改为 UID 7474（这是 Neo4j 容器内的默认用户ID）
chown -R 7474:7474 /opt/neo4j_data
```

## 启动容器

```shell
docker run -d \
  --name neo4j \
  -p 7474:7474 -p 7687:7687 \
  -v /opt/neo4j_data/data:/data \
  -v /opt/neo4j_data/logs:/logs \
  -v /opt/neo4j_data/conf:/var/lib/neo4j/conf \
  -v /opt/neo4j_data/import:/var/lib/neo4j/import \
  -v /opt/neo4j_data/plugins:/var/lib/neo4j/plugins \
  -e NEO4J_PLUGINS='["graph-data-science"]' \
  -e NEO4J_dbms_security_procedures_unrestricted=gds.* \
  -e NEO4J_AUTH=neo4j/neo4j123456 \
  neo4j:latest
```

查看日志：

```shell
docker logs -f neo4j
```
