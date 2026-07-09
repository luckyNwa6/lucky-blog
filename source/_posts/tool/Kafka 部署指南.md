---
title: Kafka 部署指南
cover: https://imgs.luckynwa.top/profile/yys/125.webp
description: 莫愁前路无知己，天下谁人不识君
categories: 工具
tags: Docker
comments: true
abbrlink: tool8b1
summary: >-
  本文介绍通过 Docker Compose 部署 Kafka 单节点集群（KRaft 模式）的完整配置，包括 broker 与 controller 角色设定、监听地址映射、KRaft 仲裁配置，以及 Kafka UI 可视化管理界面的搭建方法。
date: 2024-07-20 14:00:00
---

# Kafka Docker Compose 部署

Apache Kafka 是一个分布式流处理平台，最初由 LinkedIn 开发，用于处理高吞吐量的实时数据流。Kafka 以发布-订阅模式运作，支持消息持久化、多副本容错和水平扩展，广泛应用于日志收集、实时监控、事件驱动架构和微服务间通信等场景。

## 架构说明

A 机器（Python 消费者/生产者）→ B 机器（192.168.31.31）→ B 机器虚拟机（Docker Kafka + Kafka UI）

> B 机器的地址变化记得修改配置中的 IP。

## docker-compose.yml

```yaml
version: '3.8'

services:
  kafka:
    image: swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/apache/kafka:4.2.0
    container_name: kafka
    ports:
      - '9092:9092'
      - '9093:9093'
    environment:
      # ===== 基础角色 =====
      KAFKA_NODE_ID: 1
      KAFKA_PROCESS_ROLES: broker,controller

      # ===== 监听地址（容器内部用 0.0.0.0）=====
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9092,CONTROLLER://0.0.0.0:9093

      # ⭐ 核心：对外只暴露一个"真实可访问地址"
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://192.168.31.31:9092

      # ===== KRaft 配置 =====
      KAFKA_CONTROLLER_QUORUM_VOTERS: 1@kafka:9093
      KAFKA_CONTROLLER_LISTENER_NAMES: CONTROLLER

      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT

      # ===== 简化配置（单节点必须）=====
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
    networks:
      - kafka-net
    restart: unless-stopped

  kafka-ui:
    image: swr.cn-north-4.myhuaweicloud.com/ddn-k8s/docker.io/provectuslabs/kafka-ui:latest
    container_name: kafka-ui
    ports:
      - '9091:8080'
    environment:
      KAFKA_CLUSTERS_0_NAME: local
      # ⭐ 必须用"宿主机可访问地址"
      KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: 192.168.31.31:9092
    depends_on:
      - kafka
    networks:
      - kafka-net
    restart: unless-stopped

networks:
  kafka-net:
    driver: bridge
```

## 启动服务

```shell
docker-compose up -d
```

Kafka UI 访问地址：`http://<宿主机IP>:9091`
