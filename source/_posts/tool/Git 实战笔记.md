---
title: Git 实战笔记
cover: https://imgs.luckynwa.top/profile/yys/116.webp
description: 俱怀逸兴壮思飞，欲上青天揽明月
categories: 工具
tags: Git
comments: true
abbrlink: tool1
summary: >-
  本文系统介绍 Git 版本控制工具的使用方法。从工作区、暂存区、仓库三级结构出发，详细讲解环境配置（用户名设置、SSH密钥生成与绑定）、核心命令（文件操作、分支管理、远程协作、版本回退）、日常开发工作流程，以及代理环境下常见的443连接超时和SSH端口22被封问题的排查与解决，适合 Git 初学者系统学习与快速上手。

date: 2023-07-01 07:30:33
---

# Git 基础概念

## 工作区域

Git 管理的三个核心区域（`.git` 文件夹内是暂存区和仓库）：

```
工作区  ──git add──▶  暂存区  ──git commit──▶  Git 仓库
(编写代码)            (临时存放)                (最终提交)
```

| 区域         | 说明                               |
| ------------ | ---------------------------------- |
| **工作区**   | 项目文件夹，日常编写代码的地方     |
| **暂存区**   | 已完成工作的临时存放区域，等待提交 |
| **Git 仓库** | 最终提交的区域，记录所有版本历史   |

## 文件状态

工作区文件的四种状态：

| 状态   | 说明               | 标识                             |
| ------ | ------------------ | -------------------------------- |
| 未跟踪 | 未被 Git 管理      | 红色 `??`                        |
| 未修改 | 已被管理，无改动   | -                                |
| 已修改 | 工作区和仓库不一样 | 红色 `M`，`git add` 后变绿色 `M` |
| 已暂存 | 已执行 `git add`   | 绿色 `M`                         |

# 环境配置

## 基础配置

安装 Git 后，桌面空白处右键打开 Git Bash：

```shell
# 设置默认主分支为 main（默认是 master）
git config --global init.defaultBranch main

# 设置用户信息（按需选择）
git config --global user.name "luckyNwa"
git config --global user.email "1656213092@qq.com"

# 查看配置
git config user.name
git config user.email
```

## SSH 配置

SSH 方式无需每次输入密码，推荐使用。

### 步骤一：生成密钥

```shell
ssh-keygen -t rsa -b 4096 -C "你的邮箱@qq.com"
ssh-keygen -t rsa -b 4096 -C "1656213092@qq.com"
# 连续回车 3 次，密钥生成在 C:\Users\Administrator\.ssh 目录，打开 id_rsa.pub 复制里面内容
```

### 步骤二：添加公钥到 GitHub

1. 登录 GitHub → 头像 → Settings → SSH and GPG keys → New SSH key
2. 粘贴公钥，Title 随意填写

### 步骤三：验证连接

```shell
ssh -T git@github.com
# 输入 yes，看到欢迎信息即成功
```

### 同时配置 Gitee 和 GitHub

删除 `.ssh` 目录后重新生成密钥，然后：

1. 将 `id_rsa.pub` 内容分别添加到：
   - Gitee: https://gitee.com/profile/sshkeys
   - GitHub: https://github.com/settings/keys

2. 验证两个平台：

   ```shell
   ssh -T git@gitee.com
   ssh -T git@github.com
   ```

# 常用指令

## 初始化项目

```shell
git init                              # 初始化 Git 仓库
git remote add origin git@github.com:用户名/仓库名.git  # 关联远程仓库
git push -u origin main               # 首次推送并关联分支
```

## 文件操作

```shell
git status                            # 查看状态
git status -s                         # 简洁模式查看状态
git add 文件名.后缀                    # 添加指定文件到暂存区
git add .                             # 添加所有文件到暂存区
git commit -m "备注信息"               # 提交到本地仓库
git commit -a -m "备注信息"            # 跳过暂存区，直接提交（已跟踪文件）
```

## 文件删除

```shell
git rm 文件名                          # 从仓库和工作区同时删除
git rm --cached 文件名                 # 只从仓库移除，保留工作区文件
git rm --cached components.d.ts       # 移除已追踪的文件（配合 .gitignore 使用）
```

## 分支管理

```shell
git branch                            # 查看所有分支（* 标记当前分支）
git branch 新分支名                    # 创建新分支（基于当前分支）
git checkout 分支名                    # 切换分支
git checkout -b 分支名                 # 创建并切换到新分支
git checkout master                   # 切换到主分支
git merge 分支名                       # 合并指定分支到当前分支
git branch -d 分支名                   # 删除本地分支（需先切换到其他分支）
```

## 远程仓库

```shell
git remote show origin                # 查看远程仓库信息
git remote update origin --prune      # 同步远程分支（删除已不存在的分支）
git clone 地址                         # 克隆仓库
git clone -b 分支名 地址               # 克隆指定分支
git pull                              # 拉取远程最新代码
git push                              # 推送到远程
git push origin --delete 远程分支名    # 删除远程分支（-D 强制删除）
git checkout 远程分支名                # 将远程分支检出到本地
```

## 版本回退

```shell
git log                               # 查看提交历史
git reset --mixed 版本号               # 默认：回退 commit 和 index，保留源码
git reset --soft 版本号                # 仅回退 commit，保留 index 和源码
git reset --hard 版本号                # 彻底回退，源码也恢复到指定版本
```

# 工作流程

## 日常开发流程

```shell
# 1. 修改代码后
git add .
git commit -m "feat: 新增功能描述"
git push

# 2. 切换分支开发
git checkout -b feature/新功能
# ... 开发完成 ...
git checkout main
git merge feature/新功能
git push
```

## 关联已有远程仓库

当远程仓库已有内容（如 README.md）时：

```shell
git init
git remote add origin git@github.com:用户名/仓库名.git
git add .
git commit -m "feat: 初始提交"
git pull origin main --allow-unrelated-histories
git push -u origin main
```

# 常见问题

## GitHub 443 连接超时

**报错：**

```
Failed to connect to github.com port 443 after 21104 ms: Timed out
```

**原因：** 使用了代理，但 Git 未配置代理

**解决：**

```shell
git config --global http.proxy 127.0.0.1:7890
git config --global https.proxy 127.0.0.1:7890
```

## SSH 连接 GitHub 报 Connection closed

**报错：**

```
Connection closed by 127.0.0.1 port 22
```

**原因：** 代理封禁了 GitHub 端口 22 的连接

**解决：**

1. 重新生成 SSH 密钥

   ```shell
   git config user.email  # 确认邮箱正确
   ssh-keygen -t rsa -b 4096 -C "你的邮箱@qq.com"
   ```

2. 将新公钥添加到 GitHub

3. 在 `C:\Users\Administrator\.ssh` 目录下创建 `config` 文件（无后缀），内容：

   ```
   Host github.com
   Hostname ssh.github.com
   Port 443
   ```

4. 验证连接：

   ```shell
   ssh -T git@github.com
   ```

# 开发工具推荐

## VSCode 插件

- **Git Blame** - 查看每行代码的最后修改者
- **Git History** - 查看文件修改历史
- **Git Graph** - 可视化分支图

## IntelliJ IDEA

2023.2.1 版本自带 Git 插件，只需保留 Git 相关插件即可。

> ⚠️ **注意：** 遇到过保留 GitHub 插件导致无法推送的问题

# 注意事项

1. **Gitee 使用** - 注意区分主分支名称（master/main）和远程源（origin）
2. **远程仓库已有内容** - 使用 `--allow-unrelated-histories` 拉取后再推送
3. **删除已追踪文件** - 仅修改 `.gitignore` 不够，需执行 `git rm --cached` 移除追踪
