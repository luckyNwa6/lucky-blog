---
title: Torna API文档管理平台搭建
cover: https://imgs.luckynwa.top/profile/yys/55.webp
description: 积土成山，风雨兴焉
categories: 工具
tags: Docker
comments: true
abbrlink: toolTorna358
summary: >
  本文详细介绍了 Torna API 文档管理平台的搭建过程。Torna 是一个开源的接口文档管理系统，
  支持 Swagger、Postman 等多种格式导入，提供在线调试、文档分享等功能。文章从 Docker 环境
  入手，讲解了数据库要求（MySQL 8.2.0+）、镜像拉取、配置文件下载与修改、容器启动等步骤，
  并附带了完整的配置参数说明，帮助开发者快速搭建私有化的 API 文档管理平台。
date: 2022-01-01 11:22:21
---

# 简介

Torna 是一个开源的接口文档管理系统，支持 Swagger、Postman、Apifox 等多种格式的文档导入，在线调试接口，提供文档分享和权限管理功能，帮助团队高效管理和协作 API 文档。

## 安装

数据库需要 MySQL 8.2.0 及以上版本，5.7 版本不支持。

官方文档：https://torna.cn/

### 拉取镜像

```bash
docker pull registry.cn-hangzhou.aliyuncs.com/tanghc/torna:1.23.2
```

### 下载配置文件

```bash
yum -y install wget

mkdir /nwa/torna && wget https://gitee.com/durcframework/torna/raw/master/install/application.properties -O /nwa/torna/application.properties
```

### 修改配置

```bash
vim /nwa/torna/application.properties
```

修改数据库连接配置，MySQL 8.x 版本可以正常使用。

### 启动容器

```bash
docker run --name torna \
  -p 7700:7700 \
  -e JAVA_OPTS="-server -Xms512m -Xmx512m" \
  -v /nwa/torna/application.properties:/torna/config/application.properties \
  -d registry.cn-hangzhou.aliyuncs.com/tanghc/torna:1.23.2
```

记得开放 7700 端口。

### 访问地址

- 内网：http://192.168.56.10:7700
- 外网：http://47.98.230.128:7700

默认账号：admin，密码：123456

## 配置说明

`application.properties` 配置文件参数：

```properties
# 服务端口
server.port=7700

# 数据库连接配置
mysql.host=47.98.230.128:23308
mysql.schema=torna
mysql.username=root
mysql.password=027027

# 允许注册
torna.register.enable=true
# jwt有效期，即多少天内不用再次登录
torna.jwt.timeout-days=365
# jwt秘钥，可使用UUID，确保唯一性即可
torna.jwt.secret=CHezCvjte^WHy5^#MqSVx9A%6.F$eV
# 创建后台用户初始admin密码123456
# 没啥软用 torna.user.initial-password=027027
# 日志文件路径
logging.file.name=log/server.log

# 单文件大小限制
spring.servlet.multipart.max-file-size=20MB
# 总请求量大小限制
spring.servlet.multipart.max-request-size=100MB

# 推送是否允许相同文件夹名称
torna.push.allow-same-folder=true
# 推送打印内容
torna.push.print-content=false

# 返回参数表格需要隐藏的列，多个用逗号隔开
# 列选项：required,maxLength
torna.view-config.response-hidden-columns=required,maxLength
# 初始排序值
torna.view-config.init-order=10000
```
