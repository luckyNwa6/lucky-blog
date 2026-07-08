---
title: 图床搭建与 CDN 加速指南
description: 咬定青山不放松，立根原在破岩中
cover: /img/lunbo/306.webp
categories: 网站搭建
tags: Tool
abbrlink: website_construction3
comments: true
swiper_index: 66
swiper_description: 工欲善其事，必先利其器
summary: >-
  本文详细介绍了四种图床搭建方法及其管理工具的使用。首先讲解了通过 GitHub 创建公开仓库并配置 Personal access tokens 来搭建图床，同时可将仓库同步到 Vercel 配置二级域名访问。接着介绍了使用 PicGo 工具管理上传图片并与 Typora 绑定，需注意 GitHub 仓库分支必须为 main 且大小不超过 1G 以避免封号风险。其次通过 npm 方式搭建图床，包括注册 npm 账号、配置仓库、使用 GitHub Actions 自动发布包并更新版本号。还提到利用 Cloudflare Pages 连接 GitHub 创建图床。最后介绍了多种 CDN 加速访问方式如 jsdelivr、unpkg 等回源引用图片的方法，涵盖从基础搭建到高级加速的全流程操作细节及注意事项。
date: 2024-01-15 07:44:29
---

# 前言

本章节讲解图床的搭建、管理图片工具以及如何访问图片。

# GitHub 图床

## 创建仓库

1. 在 GitHub 创建一个仓库，记得勾选**公开**和 **md 文档**
2. 访问 https://github.com/settings/apps
3. 点击 **Personal access tokens** → **Tokens** → **New personal access token (classic)**
4. 时间选择**永久过期**，勾选 `repo` 再生成
5. 保存好 token 等会用

> 💡 也可以将这个仓库同步到 Vercel，再配置一个二级域名进行访问

# PicGo

管理上传的图片工具，结合 Typora 使用。

- **下载地址：** https://github.com/Molunerfinn/PicGo/releases/tag/v2.3.1

下载并启用，如果不能启动，右键勾起兼容模式，管理员身份启动。

## 配置

![PicGo配置](https://cdn.jsdelivr.net/gh/luckyNwa6/lucky-pic-bed@main/img/20240630112936.png)

配置示例：

```
仓库名：luckyNwa/lucky-pic-bed
分支：main
路径：img/
自定义域名：https://cdn.jsdelivr.net/gh/luckyNwa/lucky-pic-bed@main
```

## 注意事项

- **自定义域名格式：** `https://cdn.jsdelivr.net/gh/[GitHub用户名]/[仓库名]@main`
- **分支必须填 `@main`**，否则默认使用 master 分支，会导致图片上传失败
- **picgo-server 端口：** PicGo 设置 → 设置 Server → `36677`
- **仓库大小限制：** GitHub 图床仓库大小不能超过 1G，超过后会有人工审核，轻则删库重则封号

# Typora

Typora 支持粘贴或拖入图片时自动上传到图床，这里用了脚本将图片传到自己的服务器。

## 配置步骤

1. 打开 `文件` → `偏好设置` → `图像`
2. **上传服务** 选择 `Custom Command`
3. **命令** 填写上传脚本路径：

```
D:\workspace\java\lucky-admin2\lucky-api-v2\bin\upload_prod.bat
```

> 💡 配置完成后，插入图片时会自动调用脚本上传并返回图床链接，无需手动处理图片托管。

# npm 图床

采用提交到 GitHub，让 GitHub Actions 自动打包到 npm，通过加速访问 npm 里的资源。

## 注册与登录

1. 去 [npm 官网](https://www.npmjs.com/) 注册账号并绑定邮箱
2. 拉取上面 GitHub 仓库，进入根目录，CMD 执行：

```shell
npm config set registry https://registry.npmjs.org
npm adduser   # 仅第一次使用需要添加用户，浏览器验证
npm login     # 非第一次使用直接登录即可，浏览器验证
```

## 初始化与发布

运行 npm 初始化指令，把整个图床仓库打包，按照指示进行配置。

> ⚠️ 需要事先确认包名没有和别人已发布的包重复，可以在 npm 官网搜索，搜不到说明还没被占用。

```shell
npm init      # 绑定 npm 仓库，配置唯一包名、版本、作者名
npm publish   # 提交
```

![npm配置](https://cdn.jsdelivr.net/gh/luckyNwa6/lucky-pic-bed@main/img/bedConfig.jpg)

## GitHub Actions 自动发布

每次本地 `npm publish` 需要架梯子且耗时，交给 GitHub Actions 自动完成。

### 1. 获取 npm Token

npm 官网 → 头像 → Access Tokens → Generate New Token → 勾选 **Automation**

> 💡 Token 只会显示这一次，务必保存好

### 2. 配置 GitHub Secrets

在 GitHub 图床仓库设置项里添加一个名为 `NPM_TOKEN` 的 secrets，把 npm 的 Access Token 输入进去。

### 3. 添加 GitHub Actions

新增文件 `.github/workflows/autopublish.yml`：

```yml
name: Node.js Package
on:
  push:
    branches:
      - main

jobs:
  publish-npm:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: '12.x'
          registry-url: https://registry.npmjs.org/
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{secrets.npm_token}}
```

### 4. 更新与提交

```shell
# 将更改提交
git add .
git commit -m "npm publish"
# 更新 package 版本号
npm version patch
# 推送至 GitHub 触发 action
git push
```

> ⚠️ 此处四行指令顺序严格。每次更新 npm 图床都需要先修改 `package.json` 里的 version。`npm version patch` 会将末尾版本号 +1（如 0.0.1 → 0.0.2）。大版本更新还是需要手动改的。

# Cloudflare 图床

先去GitHub上fork，https://github.com/MarSeventh/CloudFlare-ImgBed

再去[Cloudflare 官网](https://dash.cloudflare.com/) 用luckywei015@gmail.com|1656213092@qq.com登录，密码N..@

![image-20260706173327016](https://imgs.luckynwa.top/profile/2026/07/06/image-20260706173327016_20260706173328A001.png)

开始使用，导入现有Git存储库，开始使用，连接GitHub

(1)找到 **Pages** → 创建 → 连接到 GitHub

(2)登录发现往下看，可以选择仓库，选刚刚fork过来的那个

```shell
npm install      构建命令

frontend-dist    输出目录
```

![image-20260706173927373](https://imgs.luckynwa.top/profile/2026/07/06/image-20260706173927373_20260706173928A002.png)

保存并部署

![image-20260706174132156](https://imgs.luckynwa.top/profile/2026/07/06/image-20260706174132156_20260706174132A003.png)

命名空间：cloud

再去worker 和pages下找到项目里的设置，去绑定这个kv空间

![image-20260706174355941](https://imgs.luckynwa.top/profile/2026/07/06/image-20260706174355941_20260706174356A004.png)

变量名：img_url (必须是这个)

再去部署--->最下面下面...，重新部署

再去存储和数据库那，点击R2存储里概述，闲鱼买了个邮箱转移的，不然没卡绑定

桶名字：cloud 创建

再去和绑定kv一样，绑定-->添加，R2，变量名：cloudR2

重新部署，等待部署完，点击域名查看

![image-20260706194341275](https://imgs.luckynwa.top/profile/2026/07/06/image-20260706194341275_20260706194343A005.png)

上传不了，服了，还是用java弄一个吧，集成到自己的后台管理系统里

R2对象存储的 跨域策略：

```json
[
  {
    "AllowedOrigins": ["*"],
    "AllowedMethods": ["GET", "PUT", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

**还是不加了，感觉影响自己使用**

安全性
└── 安全规则

创建规则：非中国访问观察

表达式

```json
(ip.geoip.country ne "CN" and not http.host in {
"nextchat.luckynwa.top"
"tw.luckynwa.top"
"lobechat.luckynwa.top"
"calendar.luckynwa.top"
"imgs.luckynwa.top"
"imgs.luckynwa.top"
})
```

外国人访问要走机器人认证

# 回源加速

提交完就可以访问了，国内有 CDN 加速访问 [jsdelivr 官网](https://www.jsdelivr.com/)

## jsdelivr + npm

```
https://cdn.jsdelivr.net/npm/lucky-img/img/lucky675.png
```

指定版本：

```
https://cdn.jsdelivr.net/npm/lucky-img@1.0.0/img/lucky675.png
```

## jsdelivr + GitHub

```
https://cdn.jsdelivr.net/gh/luckyNwa6/lucky-pic-bed@main/pic/Somewhere.jpg
```

## unpkg 回源 npm

```
https://unpkg.com/lucky-img@1.0.0/pic/Somewhere.jpg
```

## 其他 CDN 回源

| CDN                    | 格式                                                    | 说明                     |
| ---------------------- | ------------------------------------------------------- | ------------------------ |
| **npm.onmicrosoft.cn** | `https://npm.onmicrosoft.cn/:package@:version/:file`    | 推荐使用                 |
| **npm.elemecdn.com**   | `https://npm.elemecdn.com/:package@:version/:file`      | 百度出品，网宿国内节点   |
| **code.bdstatic.com**  | `https://code.bdstatic.com/npm/:package@:version/:file` | 饿了么出品，网宿国内节点 |
| **unpkg.com**          | `https://unpkg.com/:package@:version/:file`             | 香港节点                 |

> ⚠️ Cloudflare Pages 回源在国内访问不稳定，推荐使用 `npm.onmicrosoft.cn` 回源。

## 效果展示

![效果](https://cdn.jsdelivr.net/npm/lucky-img/pic/Somewhere.jpg)
