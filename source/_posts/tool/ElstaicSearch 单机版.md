---
title: ElstaicSearch 单机版
cover: https://imgs.luckynwa.top/profile/yys/355.webp
description: 学而无友，则孤陋而寡闻
categories: 工具
tags: Docker
comments: true
abbrlink: tool001
summary: >-
  本文介绍如何使用Docker部署ElasticSearch单机版，包括ES和Kibana容器的安装、网络配置、IK分词器的在线和离线安装方法，以及扩展词汇的配置步骤。
date: 2023-05-01 21:12:22
---

## 简介

docker安装 单机版 ，虚拟机内存低于3g别装

## ElasticSearch

```shell
docker pull elasticsearch:7.12.1

# AI用的这个版本 可以存向量
docker pull registry.cn-hangzhou.aliyuncs.com/lucky-warehouse/elasticsearch:8.12.2
```

因为我们还需要部署kibana容器，因此需要让es和kibana容器互联。这里先创建一个网络：

```shell
docker network create es-net
```

部署ES 7.12.1版本

```shell
docker run -d --name es \
  -e "ES_JAVA_OPTS=-Xms512m -Xmx512m" \
  -e "discovery.type=single-node" \
  -v es-data:/usr/share/elasticsearch/data \
  -v es-plugins:/usr/share/elasticsearch/plugins \
  --privileged \
  --network es-net \
  -p 9200:9200 -p 9300:9300 \
  elasticsearch:7.12.1

# 删除数据卷 (这将清空所有索引数据)
docker volume rm es-data

# 删除插件卷 (推荐一起删，防止旧插件残留)
docker volume rm es-plugins
```

部署ES 8.12.2版本（ 升级版本需要清理掉旧的插件）

```shell
docker run -d --name es \
  -e "ES_JAVA_OPTS=-Xms1g -Xmx1g" \
  -e "discovery.type=single-node" \
  -e "xpack.security.enabled=false" \
  -e "xpack.security.http.ssl.enabled=false" \
  -v es-data:/usr/share/elasticsearch/data \
  -v es-plugins:/usr/share/elasticsearch/plugins \
  --privileged \
  --network es-net \
  -p 9200:9200 -p 9300:9300 \
  registry.cn-hangzhou.aliyuncs.com/lucky-warehouse/elasticsearch:8.12.2
```

**参数说明**

- -e "ES_JAVA_OPTS=-Xms512m -Xmx512m"：内存大小
- -e "discovery.type=single-node"：非集群模式
- -v es-data:/usr/share/elasticsearch/data：挂载逻辑卷，绑定es的数据目录
- -v es-logs:/usr/share/elasticsearch/logs：挂载逻辑卷，绑定es的日志目录
- -v es-plugins:/usr/share/elasticsearch/plugins：挂载逻辑卷，绑定es的插件目录
- --privileged：授予逻辑卷访问权
- --network es-net：加入一个名为es-net的网络中
- -p 9200:9200：端口映射配置

访问地址：http://localhost:9200 本地

**补充es-data位置查看**

```shell
# 查看所有数据卷
docker volume ls

# 查看数据卷详细信息卷
docker volume inspect es-data
```

发现存放在宿主机的 "Mountpoint": "/var/lib/docker/volumes/es-data/\_data"，去宿主机 /var/lib/docker/volumes 下面查看

## Kibana

kibana可以给我们提供一个elasticsearch的可视化界面，便于我们学习

```shell
# ES 7.12.1版本
docker run -d --name kibana \
  -e ELASTICSEARCH_HOSTS=http://es:9200 \
  --network=es-net \
  -p 5601:5601 \
  kibana:7.12.1

# ES 8.12.2版本
docker run -d --name kibana \
  -e ELASTICSEARCH_HOSTS=http://es:9200 \
  --network=es-net \
  -p 5601:5601 \
  registry.cn-hangzhou.aliyuncs.com/lucky-warehouse/kibana:8.12.2
```

启动很慢，查看启动日志

```shell
docker logs -f kibana
```

访问地址：http://localhost:5601

## 设置中文

```shell
# ES 7.12.1版本
docker exec -it kibana /bin/bash
cd config
vi kibana.yml
# 文件末尾添加
i18n.locale: "zh-CN"
esc键
:wq
exit
docker restart kibana

# ES 8.12.2版本（没有vi指令）
docker exec kibana sh -c 'echo "" >> /usr/share/kibana/config/kibana.yml && echo "i18n.locale: \"zh-CN\"" >> /usr/share/kibana/config/kibana.yml'
docker restart kibana
```

## 安装IK分词器

**默认的es无法理解中文含义**

### 在线安装

```shell
docker exec -it es /bin/bash

# 在线下载并安装
./bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.12.1/elasticsearch-analysis-ik-7.12.1.zip

# 退出
exit

# 重启容器
docker restart es

# 查看插件列表
elasticsearch-plugin list
```

### 离线安装

宿主机 /var/lib/docker/volumes/es-plugins/\_data 下，将 E:\other\装机必备软件\SSSS开发相关 下的ik分词器文件夹直接拖动到上面路径

```shell
# 重启容器
docker restart es

# 查看es日志
docker logs es | grep analysis-ik
```

## 扩展词汇

/var/lib/docker/volumes/es-plugins/\_data/ik/config 下打开 IKAnalyzer.cfg.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE properties SYSTEM "http://java.sun.com/dtd/properties.dtd">
<properties>
    <comment>IK Analyzer 扩展配置</comment>
    <!--用户可以在这里配置自己的扩展字典.添加下面ext.dic -->
    <entry key="ext_dict">ext.dic</entry>
    <!--用户可以在这里配置自己的扩展停止词字典-->
    <entry key="ext_stopwords"></entry>
    <!--用户可以在这里配置远程扩展字典 -->
    <!-- <entry key="remote_ext_dict">words_location</entry> -->
    <!--用户可以在这里配置远程扩展停止词字典-->
    <!-- <entry key="remote_ext_stopwords">words_location</entry> -->
</properties>
```

复制 quantifier.dic 并粘贴然后重命名为 ext.dic，先清空再输入自定义的，就是一行行列出每个词即可

**注意：当前文件的编码必须是 UTF-8 格式，严禁使用Windows记事本编辑**

```text
永远滴神
奥力给
```
