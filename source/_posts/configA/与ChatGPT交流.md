---
title: NextChat搭建
cover: 'https://imgs.luckynwa.top/blog/chatGPTIcon2.png'
description: 基于开源NextChat搭建私人ChatGPT 助手
categories: 网站搭建
tags: ChatGPT
comments: true
abbrlink: 41570
date: 2023-06-01 11:22:21
updated: 2024-07-03 10:32:48
swiper_index: 67
swiper_description: '基于开源NextChat搭建私人ChatGPT 助手'
---

# 搭建

开源地址 https://github.com/Yidadaa/ChatGPT-Next-Web 

下拉有个 Deploy 点击进入Vercle网站，部署它这个开源项目

![image-20240709102430639](https://cdn.jsdelivr.net/gh/luckyNwa/lucky-pic-bed@main/img/image-20240709102430639.png)

项目名称随便改，lucky-next-chat，点击crate，再传入 OPENAI_API_KEY （chatgpt 的 key(tb 买一个)）的值和 CODE（网站使用它的密码）

![image-20240709104449387](https://cdn.jsdelivr.net/gh/luckyNwa/lucky-pic-bed@main/img/image-20240709104449387.png)

Deploy

等一段时间 Congratulations!然后点继续

https://vercel.com/luckynwa6/chat-gpt-next-web

去配置 2 级域名 Settings ---Domains----Add-----chat.luckynwa.top

去 vercel 里的 Settings ----Environment 里修改 key 值和密码，提问的时候要是密码错误，刷新机器人

https://console.dnspod.cn/dns/luckynwa.top/record里设置2级域名

https://chat.luckynwa.top/#/ 域名访问

# 问题

Key不好获取，以前的官网注册送5美刀的key额度，现在没有，只能去淘宝买，或者自己弄个外国的虚拟信用卡

虚拟信用卡很贵、开卡就要10美元、还得冲20-30美刀并且有一定的手续费

推荐用它免费3.5、其他只有一定额度后面充钱，不冲也行

需科学 https://poe.com/chat/2dweys7v7k9pjotniya
