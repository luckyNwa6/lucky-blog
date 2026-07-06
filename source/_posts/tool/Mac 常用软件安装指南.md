---
title: Mac 常用软件安装指南
cover: https://imgs.luckynwa.top/openApi/lucky/yys/490
description: 朝闻道，夕死可矣
categories: 工具
tags: Tool
comments: true
abbrlink: tool6
summary: >-
  Homebrew 是 macOS 上的包管理器，可以方便地安装和管理各种软件。本文介绍了如何安装 Homebrew，以及使用 Homebrew 安装 Git、Maven、NVM 等常用开发工具的方法和步骤。
date: 2025-01-05 07:45:01
---

Homebrew 是 macOS 的一个包管理器，使用 Homebrew 安装各种软件。

## 安装 Homebrew

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

安装完成后，配置环境变量：

```shell
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zshrc
source ~/.zshrc
```

## Git

```shell
brew install git
git --version  # 应显示最新版本（如 git version 2.42.0）
```

> 优点：版本最新，后续更新方便（`brew upgrade git`）

## Maven

```shell
brew install maven
mvn -v
```

## NVM

```shell
brew install nvm
mkdir ~/.nvm
vim ~/.bash_profile
```

在 `~/.bash_profile` 中添加以下内容：

```shell
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

使配置生效并安装 Node.js：

```shell
source ~/.bash_profile
nvm -v
nvm install 20.12.2
```

TODO
