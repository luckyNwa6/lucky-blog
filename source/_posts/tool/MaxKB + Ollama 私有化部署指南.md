---
title: MaxKB 私有化部署：快速搭建本地知识库问答系统
cover: /img/lunbo/713.webp
description: 世上无难事，只怕有心人
categories: 人工智能
tags: Ops
comments: true
abbrlink: 58234
summary: >-
  本文记录了 MaxKB 在 Docker 环境下的完整部署流程。从镜像拉取、容器运行到访问配置，逐步指导如何搭建私有化问答系统。文章重点介绍了模型配置、创建应用、设置提示词与开场白等关键步骤，实现基于知识库的精准问答。同时讲解了如何创建知识库、上传文档并关联大模型，让 AI 助手能够根据专属资料回答问题。最后展示了第三方嵌入功能，可将对话界面直接集成到前端项目中。整个过程简单易上手，适合个人或小团队快速搭建专属知识库问答助手。
date: 2026-07-04 10:00:00
---

# MaxKB 部署

## 环境准备

打开桌面版的 Docker，直接 cmd 运行即可。MaxKBv1.3.0 的 logo 是吸附的，推荐使用该版本。

## 镜像拉取

```shell
docker pull registry.cn-hangzhou.aliyuncs.com/lucky-warehouse/maxkb
docker pull registry.cn-hangzhou.aliyuncs.com/lucky-warehouse/maxkb:v1.3.0
```

## 容器运行

```shell
docker run -d --restart=always --name=maxkb -p 18080:8080 -v ~/.maxkb:/var/lib/postgresql/data registry.cn-hangzhou.aliyuncs.com/lucky-warehouse/maxkb:v1.3.0
```

## 访问地址

- 本地访问：`http://localhost:18080`

## 默认账号

```
admin
MaxKB@123..
```

# 模型配置

## 添加模型

登录--->系统设置---> 模型设置 ---> 添加 Ollama：

- 名称：qwen0.5b
- 类型：大语言模型
- 模型：`qwen0.5b`，如果没有则通过 `ollama list` 把 name 复制出来即可

## API 域名

需要先内网穿透出来或者解除 IP 限制才能访问到宿主机，可以去看下我ollama那篇文章

| 环境                | 地址                                 |
| ------------------- | ------------------------------------ |
| Docker 桌面版       | `http://host.docker.internal:11434/` |
| 宿主机查看          | `http://localhost:11434`             |
| 内网穿透外网 Ollama | `http://ip:11434`                    |

API Key 随便填

# 创建应用

应用 -> 创建应用

应用名称：lucky-gpt

应用描述：基于N100小主机，部署的无显卡qwen:0.5小模型

应用类型：简单配置（新手）

**提示词**

我弄了一个mysql的知识库，所以提示词可以下面这样写

```shell
# 角色
你是后端开发领域的专家，精通mysql数据库相关知识。
# 回答要求
- 请严格根据下面[已知信息]来回答用户的[问题]
- 禁止使用任何你自己的知识
- 请使用能让小白听懂的语言回答
- 如果[已知信息]中没有答案，请回复："抱歉，关于您的问题，我暂时没有找到相关信息，建议联系人工客服。"
# 已知信息
{data}
# 用户问题
{question}
```

（1）勾选多轮对话

（2）选择前面配置的AI模型

（3）问题优化也勾选（后续搭建知识库的话）

**开场白**

```shell
您好！我是小维的 MySQL 数据库专家。精通数据库架构设计和理论知识。

我可以为您提供以下帮助：
- 请解释什么是回表？
- 主从复制的原理？
- ACID特性是什么？
```

然后右边直接输入问题，即可调用自己部署的本地大模型

# 第三方调用

点概览，可以查看演示，访问限制等

支持嵌入到第三方应用中，很好用，直接复制到对应项目的前端页面中即可

![image-20260704202116882](https://imgs.luckynwa.top/profile/2026/07/04/image-20260704202116882_20260704202117A007.png)

# 创建知识库

导航那点击知识库---->创建---->输入名称---->描述---->通用型---->上传文件最好是md格式的

看到列表里的文件状态是成功即可，...的设置里可以改这个

![image-20260704204230785](https://imgs.luckynwa.top/profile/2026/07/04/image-20260704204230785_20260704204231A008.png)

再去给自己的大模型关联上知识库：

配置参考如下：

![image-20260704204338734](https://imgs.luckynwa.top/profile/2026/07/04/image-20260704204338734_20260704204339A009.png)

![image-20260704201542011](https://imgs.luckynwa.top/profile/2026/07/04/image-20260704201542011_20260704201542A006.png)

![image-20260704204422203](https://imgs.luckynwa.top/profile/2026/07/04/image-20260704204422203_20260704204422A010.png)
