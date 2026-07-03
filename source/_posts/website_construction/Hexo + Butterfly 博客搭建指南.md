---
title: Hexo + Butterfly 博客搭建指南
description: 千里之行始于足下，九层之台起于累土
cover: https://imgs.luckynwa.top/openApi/lucky/yys/366
categories: 网站搭建
tags: Hexo
comments: true
abbrlink: 17956
summary: >-
  本文详细介绍了如何使用Hexo框架配合butterfly主题快速搭建一个美观的个人博客网站。首先讲解了环境准备，包括安装Node.js、Git和VS Code；接着指导创建Hexo项目并本地预览；随后介绍了将博客部署到GitHub Pages和Vercel的完整流程。重点讲解了butterfly主题的安装与配置，涵盖渲染器安装、URL优化、本地搜索功能等实用插件。此外还分享了twikoo评论系统的集成方案，包括Docker部署、Nginx反向代理配置和QQ邮箱通知设置。全程实操，适合初学者按步骤搭建自己的博客。
date: 2021-12-27 17:32:48
updated: 2024-07-03 20:32:48
---

# 准备

用 Hexo 框架可以快速搭建一个博客网站，再配合 butterfly 主题可以搭建出较为好看的页面，需遵循它的配置。

安装 `node`、`git`、`vscode`可以本站查找安装攻略

# 创建博客

桌面新建文件夹 `blog`，进入根目录 cmd 打开终端，安装 hexo 脚手架：

```shell
hexo version               # 查看版本
npm install hexo-cli -g    # 没装则运行
```

初始化项目：

```shell
hexo init
```

等待完成，生成本地页面：

```shell
hexo s
```

浏览器访问 http://localhost:4000/ 即可看到本地版。

# 部署博客

## GitHub

去 Github 新建仓库 `luckyNwa.github.io`，必须这个格式，第一个名称改自己的 GitHub 名称。

打开 `_config.yml` 最后一行改成下面：

```yaml
# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy:
  type: git
  repository: git@github.com:luckyNwa/luckyNwa.github.io.git
  branch: main
```

在 `blog` 文件夹路径 cmd 打开终端，安装自动部署发布工具：

```shell
npm install hexo-deployer-git --save
```

生成页面并上传到 GitHub：

```shell
hexo g    # 生成静态文件
hexo d    # 部署到远程
```

访问 https://luckynwa.github.io/ （需要等它部署几分钟）。

## Vercel

官网 https://vercel.com/ 用 GitHub 登录即可。

点击 new 一个项目，找到刚刚那个博客导入，点部署，它会分配一个二级域名免费用，也可以绑定自己的国内域名。

示例地址：https://lucky-blog.vercel.app/

# 安装主题

## 常用指令

```shell
hexo cl                        # 清除缓存
hexo g                         # 生成静态文件
hexo s                         # 本地预览 → http://localhost:4000/
hexo d                         # 同步远程
hexo cl && hexo g && hexo s    # 多合一生成到本地
hexo new post "博客搭建笔记"    # 创建文章
hexo new page categories       # 创建页面
hexo version                   # 查看版本
```

## package.json 脚本说明

```json
{
  "scripts": {
    "iNode18": "npm install",
    "dev": "hexo clean && hexo generate && hexo server",
    "server": "hexo clean && hexo generate && hexo server",
    "build": "hexo generate",
    "deploy": "hexo deploy",
    "clean": "npx rimraf node_modules"
  }
}
```

- `iNode18` / `clean` → 安装依赖、删除依赖
- `dev` / `server` → 运行，同时删除缓存重新生成
- `build` → 打包
- `deploy` → 推送到 GitHub

## Butterfly 主题

- 中文文档：https://butterfly.js.org/ （最好科学上网）
- 开源地址：https://github.com/jerryc127/hexo-theme-butterfly

### 安装主题

```shell
git clone -b master https://github.com/jerryc127/hexo-theme-butterfly.git themes/butterfly
```

打开 `_config.yml` 修改主题：

```yaml
theme: butterfly
```

> **重要**：`_config.yml` 同级别创建 `_config.butterfly.yml`，把 `themes/butterfly` 文件夹下的 config 内容复制进去，删除 `_config.landscape.yml`。

### 安装渲染器

```shell
npm install hexo-renderer-pug hexo-renderer-stylus --save
```

### URL 优化

安装 abbrlink 插件：

```shell
npm install hexo-abbrlink --save
```

`_config.yml` 找到 `permalink` 修改：

```yaml
# 原始
permalink: :year/:month/:day/:title/

# 修改为
permalink: post/:abbrlink.html
abbrlink:
  alg: crc32
  rep: hex
```

### 本地搜索

安装搜索插件：

```shell
npm i hexo-generator-search --save
```

`_config.yml` 下新增：

```yaml
# 本地搜索
search:
  path: search.xml
  field: all
  content: true
```

主题配置 `_config.butterfly.yml` 中，`local_search` 下两个值都设为 `true`。

# 问题

## VS Code 中不能启动项目

```powershell
get-ExecutionPolicy          # 必须是 RemoteSigned 才行
set-ExecutionPolicy RemoteSigned   # 不是则运行这条
```

# Twikoo 评论系统

由于 Docker 大部分镜像源被封，使用了阿里云做代理，用 Docker 部署评论系统：

```shell
docker run --name twikoo \
  -e TWIKOO_THROTTLE=1000 \
  -p 3737:8080 \
  -v ${PWD}/data:/app/data \
  -d registry.cn-hangzhou.aliyuncs.com/lucky-warehouse/twikoo
```

博客主题配置中修改如下：

```yaml
twikoo:
  envId: http://xxxxxx:3737/
  region:
  visitor: true
  option:
```

`use` 也选它，上面连接去浏览器输入有东西出来就配置好了。

## Nginx 反向代理

必须申请一个二级域名，不然会出现跨域情况。

`twikoo.luckynwa.top` 的 Nginx 配置如下（必须带上 IP，不然 tw 设置无法查看访问者具体位置）：

```nginx
server {
    listen  443 ssl;
    server_name  twikoo.luckynwa.top;

    ssl_certificate /etc/nginx/cert/twikoo.luckynwa.top.cer;
    ssl_certificate_key /etc/nginx/cert/twikoo.luckynwa.top.key;

    ssl_session_timeout  5m;

    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers  HIGH:!ADH:!EXPORT56:RC4+RSA:+MEDIUM;
    ssl_prefer_server_ciphers  on;

    location / {
        proxy_pass http://xxxxxx:3737;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 邮箱通知

控制面板在项目中的留言区，可以设置各种功能，比如留言时 QQ 邮箱通知提醒。

QQ 邮箱开启 SMTP 服务，授权码记得保存，配置到控制面板中即可。
