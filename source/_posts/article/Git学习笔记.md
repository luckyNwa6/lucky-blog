---
title: Git 的使用
cover: 'https://imgs.luckynwa.top/blog/gitIcon.png'
description: Git 相关的学习笔记
categories: 后端
tags: Git
comments: true
abbrlink: 6724
date: 2022-01-01 11:22:21
swiper_index: 4
swiper_description: 'Git 相关的学习笔记'
---

git 软件链接：https://pan.baidu.com/s/1XaG8mcIjMwNtlC1w_FLyMg?pwd=6666
提取码：6666
--来自百度网盘超级会员 V1 的分享 git 软件，默认安装就行

# 前言

工作区：处理工作区域 ，状态四种如下

- 未被 git 管理

  未跟踪(2 个红？？)

- 已被管理里 3 种
  未修改
  已修改（工作区文件和仓库不一样,红色 M，放入暂存区变绿 M）
  已暂存(git add)

(2)暂存区：已完成工作的临时存放区域，等待被提交

(3)git 仓库： 最终提交的区域(git commit -m "这里是备注")

# 配置

## 简单配置

下载完并安装后，桌面空白右键 git bash 打开 git 终端，想要 main 主分支设置如下，默认 master

```shell
git config --global init.defaultBranch main
```

换成自己的账号名和邮箱、本人号多

```shell
git config --global user.name "luckyNwa"
git config --global user.email "1656213092@qq.com"
git config --global user.email "2428284043@qq.com"
git config --global user.email "luckywei015@gmail.com"
git config --global user.name "luckyWeiNi"
```

查看是否配置

```shell
git config user.name
git config user.email
```

需要的项目用 git 管理、进入项目文件夹根目录，右键，打开 git bash，输入

```shell
git init
```

初始化项目

查当前目录状态

```shell
git status  或者加个 -s  发现是未跟踪文件是2个红？？
```

加入缓存区

```shell
git add 文件名带后缀   或   git add .  全部文件都添加
```

提交到本地仓库

```shell
git commit -m "这里是备注"
```

一般都是要切换分支了，如果配了 main 推 GitHub 就不需要

```shell
git branch -M main
```

关联远程 GitHub 仓库|这是 ssh 关联(不需要每次都验证)、记得先去下面配置了

```shell
git remote add origin git@github.com:luckyaaaa/springcloud-demo.git
```

推送到 GitHub 仓库

```shell
git push -u origin main
```

后续本地文件新增或者修改、先加入暂存区、再提交到本地、再推送到远程即可

```shell
git add .
git commit -m "feat: 新增了登录功能辣"
git push
```

## SSH 配置

1、打开 git bash 粘贴下面代码，邮箱记得改自己的、把下面其他一行改自己的邮箱即可

```SHELL
ssh-keygen -t rsa -b 4096 -C "1656213092@qq.com"
ssh-keygen -t rsa -b 4096 -C "2428284043@qq.com"
ssh-keygen -t rsa -b 4096 -C "luckywei015@gmail.com"
```

然后回车 3 次 生成文件在 C:\Users\Administrator\\.ssh 中打开 id_rsa.pub 复制里面内容

2、登录 github 点头像-setting-ssh and... -New SSH key

将刚刚复制的粘贴到 key 对应文本框 在 title 文本框里任意写一个名称

3、在 bash 里输入

```SHELL
ssh -T git@github.com
```

在输入 yes 就会欢迎，配置成功

需要码云和 GitHub 都配置，则删除 C:\Users\Administrator\.ssh 目录，重新生成 ssh-keygen

```shell
pub文件，将内容复制到gitee和github的ssh中保存
https://gitee.com/profile/sshkeys
https://github.com/settings/keys

ssh -T git@gitee.com
ssh -T git@github.com
都yes成功
```

# 常用指令

指令记忆比较麻烦、一般都是直接用 vscode 或者 idea 直接可视化的去管理这些

VsCode 推荐安装 Git Blame | Git History | Git Graph 用来查看记录

Idea2023.2.1 自带一堆插件、git 相关的只留下 git 即可、**切记** 遇到过留下 GitHub 然后就是推送不了

```shell
git rm --cached components.d.ts   已经被Git追踪,添加到gitignore还不够、需要移除
git clone -b 分支名 地址            克隆分支的代码到本地
git commit -a -m "备注"            直接从工作区->git仓库
git rm -f 文件名                   git仓库和工作区同时移除 查看这个文件状态可以看到是D
git rm --cached 文件名             只从git仓库移除，工作区会保留 将不在跟踪 还需要push一下远程也删
git log                           查看历史记录
git clone -b 分支名 地址            克隆分支的代码到本地
git status -s                     查看状态

分支相关
git branch                         查看git仓库所有分支 *表当前
git branch 新分支名称                基于当前所处分支创建，此时新分支代码和当前分支一样
git checkout 分支名称                切换分支
git checkout -b 分支名称             创建并切换到该分支
git checkout master                切换到主分支再合并其他分支
git merge                           合并分支
git branch -d 分支名称               删除指定分支,需要在别的分支上
git remote show origin              查看远程仓库所有的分支列表
git checkout 远程分支名称             将远程的分支下载到本地  也可以是提交的哈希记录
git pull                            将远程分支最新代码拉取到本地
git push origin --delete 远程分支名称  删除远程分支 把--delete换-D强制删除
git remote update origin --prune     远程更新分支同步最新
git reset --mixed 版本号             默认方式，回退到某个版本，只保留源码，回退commit和index信息
git reset --soft 版本号              回退到某个版本，只回退了commit的信息，不会恢复到index file一级
git reset --hard 版本号              彻底回退到某个版本，本地的源码也会变为某个版本的内容
```

# 注意

码云使用记得看清主分支以及推送的源，master 和 oringin

如果远程仓库创建时候带 md 文档，可以通过强推去关联或者克隆下来再推送

```shell
git init
git remote add origin git@github.com:luckyNwa/test.git
git add .
git commit -m 'feat: new1'
git pull origin main --allow-unrelated-historie
git push -u origin main
```
