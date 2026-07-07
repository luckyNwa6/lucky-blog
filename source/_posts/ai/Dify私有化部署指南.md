---
title: Dify 私有化部署指南
cover: https://imgs.luckynwa.top/profile/yys/515.webp
description: 宝剑锋从磨砺出，梅花香自苦寒来
categories: 人工智能
tags: Ops
comments: true
abbrlink: ai2
summary: >-
  Dify 是一款开源的 LLM 应用开发平台，支持快速搭建和部署 AI 应用。本文介绍如何使用 Docker Compose 在服务器上快速部署 Dify，包括环境准备、镜像拉取、服务启动及初始化配置等完整流程，帮助开发者快速搭建私有化的 AI 应用开发环境。
date: 2025-06-08 11:48:45
---

## 简介

Dify 是一个开源的 LLM 应用开发平台，提供从 Agent 构建到 AI workflow 编排、RAG 检索、模型管理、可观测性等能力，帮助开发者快速搭建和部署生产级的 AI 应用。本文将介绍如何使用 Docker Compose 进行本地部署。

## 环境准备

首先安装基础依赖工具：

```bash
apt install -y jq
```

## 获取项目代码

```bash
git clone --branch "$(curl -s https://api.github.com/repos/langgenius/dify/releases/latest | jq -r .tag_name)" https://github.com/langgenius/dify.git
```

## 初始化配置

```bash
cd dify/docker
cp .env.example .env
```

## 拉取 Docker 镜像

> ⚠️ 服务器需要配置代理才能访问 Docker Hub，建议先完成代理配置。

```bash
docker pull redis:6-alpine
docker pull postgres:15-alpine
docker pull langgenius/dify-api:1.13.2
docker pull langgenius/dify-web:1.13.2
docker pull semitechnologies/weaviate:1.27.0
docker pull ubuntu/squid:latest
docker pull nginx:latest
docker pull busybox:latest
docker pull langgenius/dify-plugin-daemon:0.5.4-local
docker pull langgenius/dify-sandbox:0.2.12
```

## 启动服务

```bash
docker compose up -d
```

## 访问服务

服务默认使用 80 端口，以下为映射后的访问地址：

- 本地访问：http://localhost/install
- 内网访问：http://127.0.0.1:20080/install
- 外网访问：http://ip:20080

内外穿透到外网，首次访问需要设置管理员账号。1656... luckyNwa Nwa..

## 注意事项

- 下载模型插件时需要开启代理
- 确保服务器防火墙已开放对应端口
