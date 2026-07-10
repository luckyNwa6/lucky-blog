---
title: 国内Docker镜像下载慢？四种解决方案任你选
cover: https://imgs.luckynwa.top/profile/yys/503.webp
description: 有志者事竟成，破釜沉舟
categories: 工具
tags: Docker
comments: true
abbrlink: tooldockerconfig222
summary: >-
  本文介绍四种解决Docker镜像拉取问题的方法。方法一直接修改daemon.json配置阿里云镜像源，操作简单快捷。方法二使用Render等第三方镜像源，也可咨询AI获取华为等其他镜像源信息。方法三通过阿里云容器镜像服务配合GitHub Actions实现镜像自动同步，支持私有仓库、指定架构，适合有更高需求的用户。方法四开启科学上网的虚拟网卡（TUN）模式，直接访问Docker官网。每种方法都配有详细的操作步骤，适合不同场景选择使用。
date: 2026-02-11 11:22:21
---

## 方法1：配置阿里云镜像源

推荐指数 ⭐

- 编辑配置文件

```shell
sudo vim /etc/docker/daemon.json
```

- 添加镜像源配置

```json
{
  "registry-mirrors": ["https://mezaoeag.mirror.aliyuncs.com"]
}
```

- 查询docker信息

```shell
docker info
```

- 重启docker服务

```shell
sudo systemctl daemon-reload
sudo systemctl restart docker
```

- 测试拉取镜像

```shell
time docker pull node:latest
time docker pull tomcat:8
```

## 方法2：使用第三方镜像源

推荐指数 ⭐

可以问下GPt，huawei有没有这块的镜像，它会去查

或者下面Render 750h每个月实例时间

- 编辑配置文件

```shell
vim /etc/docker/daemon.json
```

- 添加镜像源配置

```json
{
  "registry-mirrors": ["https://hub-latest-ffbe.onrender.com"],
  "log-opts": {
    "max-size": "100m",
    "max-file": "5"
  }
}
```

- 测试拉取镜像

```shell
docker pull hub-latest-ffbe.onrender.com/library/tomcat:8
```

## 方法3：阿里云容器镜像服务+GitHub Actions

推荐指数 ⭐⭐⭐

### 登录阿里云容器镜像服务

https://cr.console.aliyun.com/

- 启用个人实例，创建一个命名空间（lucky-warehouse）
- 查看访问凭证–>获取环境变量

| 配置项                           | 值                                |
| -------------------------------- | --------------------------------- |
| 用户名（ALIYUN_REGISTRY_USER）   | aliyun3947408954                  |
| 密码（ALIYUN_REGISTRY_PASSWORD） | 你的密码                          |
| 仓库地址（ALIYUN_REGISTRY）      | registry.cn-hangzhou.aliyuncs.com |

- 登录阿里云容器镜像服务

```shell
sudo docker login --username=aliyun3947408954 registry.cn-hangzhou.aliyuncs.com
```

### 配置GitHub仓库

GitHub上fork这个项目：https://github.com/tech-shrimp/docker_image_pusher

启用Github Action功能（就是pages那里开启）

进入 Settings -> Secret and variables -> Actions -> New Repository secret

将上一步的四个值配置成环境变量：

```shell
ALIYUN_NAME_SPACE
ALIYUN_REGISTRY_USER
ALIYUN_REGISTRY_PASSWORD
ALIYUN_REGISTRY
```

### 添加镜像

打开images.txt文件，添加镜像可以加tag，也可以不用（默认latest）

```shell
nginx
quay.io/prometheus/node-exporter:latest
#支持私库
k8s.gcr.io/kube-state-metrics/kube-state-metrics:v2.0.0
xhofe/alist:latest
#支持指定架构
--platform=linux/arm64 xiaoyaliu/alist
```

- 可添加 --platform=xxxxx 的参数指定镜像架构
- 可使用 k8s.gcr.io/kube-state-metrics/kube-state-metrics 格式指定私库
- 可使用 #开头作为注释
- 文件提交后，自动进入Github Action构建

### 拉取镜像

回到阿里云，镜像仓库，点击任意镜像，可查看镜像状态。（可以改成公开，拉取镜像免登录）

```shell
docker pull registry.cn-hangzhou.aliyuncs.com/lucky-warehouse/node-exporter
```

## 方法4：科学上网

推荐指数 ⭐⭐⭐⭐⭐

虚拟卡（TUN）模式打开，虚拟机的网络就能访问Docker官网，如果不行，就是服务器版本不支持，太老了
