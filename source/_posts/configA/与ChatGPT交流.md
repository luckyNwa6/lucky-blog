---
title: NextChat搭建
cover: https://imgs.luckynwa.top/openApi/lucky/yys/285
description: 长风破浪会有时，直挂云帆济沧海
categories: 网站搭建
tags: ChatGPT
comments: true
abbrlink: 41570
swiper_index: 67
swiper_description: 基于开源NextChat搭建私人ChatGPT 助手
summary: >-
  启动小维AI摘要模块⚡……运算完成！这篇文章详细介绍了如何搭建基于开源项目ChatGPT-Next-Web的NextChat聊天应用，首先从GitHub获取开源代码并使用Vercel平台进行部署，部署过程中需要填写OPENAI_API_KEY即ChatGPT的API密钥（可通过淘宝购买或自行申请国外虚拟信用卡获取，但后者成本较高且流程复杂，推荐使用有免费额度的方案）和访问网站的密码CODE，部署成功后会获得Vercel提供的访问链接，接着通过Vercel的域名管理功能添加自定义二级域名如chat.luckynwa.top，并在DNS服务商如DNSPod处完成域名解析配置，最终通过配置好的二级域名访问聊天应用，同时文章也提到当前获取API密钥的难度增加，官方不再提供免费试用额度，需自行解决密钥问题，此外访问某些服务可能需要科学上网。
date: 2023-06-01 11:22:21
updated: 2024-07-03 10:32:48
---

# 搭建

开源地址 https://github.com/Yidadaa/ChatGPT-Next-Web

下拉有个 Deploy 点击进入 Vercle 网站，部署它这个开源项目

![image-20240709102430639](https://cdn.jsdelivr.net/gh/luckyNwa/lucky-pic-bed@main/img/image-20240709102430639.png)

项目名称随便改，lucky-next-chat，点击 crate，再传入 OPENAI_API_KEY （chatgpt 的 key(tb 买一个)）的值和 CODE（网站使用它的密码）

![image-20240709104449387](https://cdn.jsdelivr.net/gh/luckyNwa/lucky-pic-bed@main/img/image-20240709104449387.png)

Deploy

等一段时间 Congratulations!然后点继续

https://vercel.com/luckynwa6/chat-gpt-next-web

去配置 2 级域名 Settings ---Domains----Add-----chat.luckynwa.top

去 vercel 里的 Settings ----Environment 里修改 key 值和密码，提问的时候要是密码错误，刷新机器人

https://console.dnspod.cn/dns/luckynwa.top/record里设置2级域名

https://chat.luckynwa.top/#/ 域名访问

# 问题

Key 不好获取，以前的官网注册送 5 美刀的 key 额度，现在没有，只能去淘宝买，或者自己弄个外国的虚拟信用卡

虚拟信用卡很贵、开卡就要 10 美元、还得冲 20-30 美刀并且有一定的手续费

推荐用它免费 3.5、其他只有一定额度后面充钱，不冲也行

需科学 https://poe.com/chat/2dweys7v7k9pjotniya
