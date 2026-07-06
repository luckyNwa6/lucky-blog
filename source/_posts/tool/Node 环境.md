---
title: Node 环境
cover: https://imgs.luckynwa.top/openApi/lucky/yys/264
description: 宣父犹能畏后生，丈夫未可轻年少
categories: 工具
tags: Vue
sticky: 27
comments: true
abbrlink: tool10
summary: >-
  本文介绍 Nvm 多版本 Node.js 管理工具的安装配置，以及 Node.js 的环境变量设置、镜像源配置、全局包安装等常用操作，帮助开发者快速搭建前端开发环境。
date: 2024-09-02 10:42:54
---

## 简介

Nvm（Node Version Manager）是一款用于管理 Node.js 版本的工具，可以轻松地在一个系统中切换和安装多个 Node.js 版本。**现在只推荐用它来管理 Node**，因为不同的项目可能需要不同版本。

## 卸载已有的 Node

```shell
node -v      # 查看当前版本
```

能卸载卸载，不能则手动删除以下目录：

```
C:\Program Files (x86)\Nodejs
C:\Program Files\Nodejs
C:\Users\用户名\AppData\Roaming\npm
C:\Users\用户名\AppData\Roaming\npm-cache
```

再去删除环境变量，然后查看版本确认已清除。

## 安装 Nvm

> Nvm 文件夹不需要手动建，nodejs 文件夹要建。

- 安装路径：`D:\soft\nvm`
- Node 资源路径：`D:\soft\nodejs`

## 常用命令

| 命令                         | 说明                            |
| ---------------------------- | ------------------------------- |
| `nvm install <version>`      | 安装指定版本的 Node.js          |
| `nvm use <version>`          | 切换到指定版本的 Node.js        |
| `nvm ls`                     | 列出已安装的所有 Node.js 版本   |
| `nvm alias <name> <version>` | 给指定版本创建别名              |
| `nvm run <version> <script>` | 在指定版本下运行脚本            |
| `nvm current`                | 显示当前正在使用的 Node.js 版本 |
| `nvm uninstall <version>`    | 卸载指定版本的 Node.js          |

## 实际使用示例

```shell
nvm install 16.20.1
nvm install 14.0.0
nvm use 14.0.0

nvm install 14.17.6       # 人人前端最少需要的版本
nvm use 14.17.6

nvm install 18.16.1
nvm install 24.13.0

node -v

npm config set registry https://registry.npmmirror.com      # 国内镜像

npm config set registry https://registry.npmjs.org          # 重置镜像为官网

nvm use 16.20.1
nvm use 18.16.1
```

## VSCode 使用 pnpm 报错解决

在 VSCode 终端运行：

```shell
Get-ExecutionPolicy          # 发现 Restricted 不允许运行任何脚本文件
Set-ExecutionPolicy RemoteSigned   # 允许运行本地创建的脚本
```

## node-sass 安装问题

遇到 node-sass 无法安装，切 14 版本：

```shell
npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
```
