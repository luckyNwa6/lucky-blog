---
title: Vue静态网站生成器：VitePress与VuePress实战指南
cover: https://imgs.luckynwa.top/openApi/lucky/yys/364
description: 详细介绍VitePress和VuePress的安装配置方法，包括环境要求、初始化步骤和常见问题解决
categories: 网站搭建
tags: Vue
comments: true
abbrlink: tool223S
summary: >-
  本文介绍VitePress和VuePress两个Vue.js静态网站生成器的安装配置方法。VitePress要求Node.js v18.16.1以上版本，通过pnpm安装，适合部署静态博客和前端文档；VuePress要求Node.js v16.14以上版本，提供完整的初始化和配置步骤，适合搭建公司UI组件库。文章包含常见问题解决方案，如Node版本过低导致的启动失败问题，以及VSCode中pnpm运行权限设置。
date: 2022-01-01 11:22:21
---

# VitePress

## 介绍

VitePress是Vue.js驱动的静态网站生成器。

**环境要求：** 最少Node.js v18.16.1版本

> node安装与配置看我的其他文章

## 安装配置

1. 新建一个文件夹叫VitePress，cmd打开后输入：

```shell
pnpm add -D vitepress
pnpm vitepress init
```

2. 其他配置查看本仓库项目和官网进行2次配置

**参考链接：**

- 官网：https://vitepress.dev/reference/default-theme-home-page

用来部署静态博客或者前端文档很不错

![image-20260705154825453](https://imgs.luckynwa.top/profile/2026/07/05/image-20260705154825453_20260705154826A015.png)

![image-20260705154917198](https://imgs.luckynwa.top/profile/2026/07/05/image-20260705154917198_20260705154917A016.png)

# VuePress

## 介绍

VuePress是Vue.js驱动的静态网站生成器。

**环境要求：** 最少Node.js v16.14版本

> node安装与配置看别的文章

## 安装配置

1. 新建一个文件夹叫vuepress，cmd打开后输入：

```shell
pnpm init    对包管理器进行初始化
pnpm add -D vuepress   安装vuepress的本地依赖

mkdir docs && echo '# Hello VuePress' > docs/README.md  创建你的第一篇文档
```

2. 在package.json里修改成下面的：

```json
{
  "name": "lucky",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "vuepress": "^1.9.9"
  }
}
```

3. 在本地服务器启动：

```shell
pnpm docs:dev
```

可以搭建公司的UI组件库

![image-20260705152448812](https://imgs.luckynwa.top/profile/2026/07/05/image-20260705152448812_20260705152449A014.png)

![image-20260705152353176](https://imgs.luckynwa.top/profile/2026/07/05/image-20260705152353176_20260705152353A013.png)

## 常见问题

**无法启动解决方案：**

正常Node.js 16版本就不会有问题的，如果遇到启动失败，尝试以下命令：

```shell
set NODE_OPTIONS=--openssl-legacy-provider && vuepress dev docs
```

配置放入启动那也行，一般是node版本太低了。

**VSCode中pnpm运行问题：**

如果VSCode不能运行pnpm，去管理员终端运行这个：

```shell
set-ExecutionPolicy RemoteSigned
```

## 访问地址

启动成功后访问：http://localhost:8080/
