---
title: Vercel一键部署AI聊天助手
cover: https://cloud.luckynwa.top/profile/yys/384.webp
description: 粉骨碎身浑不怕，要留清白在人间
categories: 网站搭建
tags: Tool
comments: true
abbrlink: website_construction2
swiper_index: 68
swiper_description: 长风破浪会有时，直挂云帆济沧海
summary: >-
  本文详细介绍如何基于开源项目ChatGPT-Next-Web搭建私人AI聊天助手。通过Vercel平台一键部署，配置API密钥和访问密码即可使用。讲解了如何配置自定义域名，通过Vercel添加二级域名并设置DNS解析，实现专属域名访问。
date: 2025-11-08 04:42:42
---

# 项目简介

> 基于开源项目 [ChatGPT-Next-Web](https://github.com/Yidadaa/ChatGPT-Next-Web) 搭建的私人 ChatGPT 聊天应用，支持自定义域名访问。

# 搭建步骤

## （1）获取源码并部署

访问开源项目仓库：https://github.com/Yidadaa/ChatGPT-Next-Web

在页面下方找到 **Deploy** 按钮，点击进入 Vercel 平台进行部署：

![image-20240709102430639](https://cdn.jsdelivr.net/gh/luckyNwa/lucky-pic-bed@main/img/image-20240709102430639.png)

## （2）配置环境变量

- **项目名称**：可自定义，如 `lucky-next-chat`
- **OPENAI_API_KEY**：ChatGPT 的 API 密钥（可通过淘宝购买）
- **CODE**：网站访问密码

![image-20240709104449387](https://cdn.jsdelivr.net/gh/luckyNwa/lucky-pic-bed@main/img/image-20240709104449387.png)

## （3）完成部署

点击 **Deploy** 后，等待片刻直到显示 `Congratulations!`，然后点击继续。

> Vercel 管理地址：https://vercel.com/luckynwa6/chat-gpt-next-web

## （4）配置自定义域名

**Vercel 添加域名：**

进入 **Settings → Domains → Add**，输入你的二级域名（如 `chat.luckynwa.top`）

**DNS 解析配置：**

前往你的域名服务商（如 DNSPod），添加域名解析记录：

> DNSPod 管理地址：https://console.dnspod.cn/dns/luckynwa.top/record

## （5）更新密钥

如果需要更换 API Key 或密码，进入 Vercel 项目的 **Settings → Environment Variables** 进行修改。

> 修改后需要重新部署才能生效

# 最终访问

配置完成后，通过你的域名即可访问：

https://chat.luckynwa.top/#/
