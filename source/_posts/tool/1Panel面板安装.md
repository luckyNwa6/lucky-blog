---
title: 1Panel面板安装
cover: https://imgs.luckynwa.top/profile/yys/75.webp
description: 问渠那得清如许，为有源头活水来
categories: 工具
tags: Tool
comments: true
abbrlink: tool337
summary: >-
  本文介绍了1Panel服务器面板的安装方法，包括一键安装脚本、Ubuntu环境下的Docker预装步骤，以及面板端口、安全入口等基本配置信息。同时整理了1Panel的常用CLI指令，如服务状态查看、启停、重启、用户信息获取、版本查看及数据恢复等操作。
date: 2026-07-10 11:22:21
---

## 简介

1Panel 是一款现代化的 Linux 服务器运维管理面板，提供可视化的 Web 界面，支持一键部署网站、数据库、Docker 容器等，简化服务器日常管理操作。

官网 https://1panel.cn/

## 安装

云服务器安装它

```shell
curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh -o quick_start.sh && sh quick_start.sh
```

Ubuntu环境下先装docker

```shell
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
systemctl enable docker
systemctl start docker
docker -v

bash -c "$(curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh)"
```

端口设置 33333

安全入口 19990327

面板用户 luckyNwa

密码Nw..

访问

http://IP:33333/19990327

卸载

```shell
1pctl uninstall
```

其他指令

```shell
1pctl status        查看 1Panel 服务运行状态
1pctl start         启动 1Panel 服务
1pctl stop          停止 1Panel 服务
1pctl restart       重启 1Panel 服务
1pctl uninstall     卸载 1Panel 服务
1pctl user-info     获取 1Panel 用户信息
1pctl listen-ip     切换 1Panel 监听 IP
1pctl version       查看 1Panel 版本信息
1pctl update        修改 1Panel 系统信息
1pctl reset         重置 1Panel 系统信息
1pctl restore       恢复 1Panel 服务及数据
```

参考文档 https://1panel.cn/docs/installation/cli/
