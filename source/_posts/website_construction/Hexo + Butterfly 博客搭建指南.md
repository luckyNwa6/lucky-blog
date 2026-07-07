---
title: Hexo + Butterfly 博客搭建指南
description: 千锤万凿出深山，烈火焚烧若等闲
cover: https://cloud.luckynwa.top/profile/yys/964.webp
categories: 网站搭建
tags: Tool
comments: true
abbrlink: website_construction1
swiper_index: 67
swiper_description: 千里之行始于足下，九层之台起于累土
summary: >-
  本文详细介绍了如何使用Hexo框架配合butterfly主题快速搭建一个美观的个人博客网站。首先讲解了环境准备，包括安装Node.js、Git和VS Code；接着指导创建Hexo项目并本地预览；随后介绍了将博客部署到GitHub Pages和Vercel的完整流程。重点讲解了butterfly主题的安装与配置，涵盖渲染器安装、URL优化、本地搜索功能等实用插件。
date: 2024-01-01 10:32:48
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
