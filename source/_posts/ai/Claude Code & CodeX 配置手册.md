---
title: Claude Code & CodeX 配置手册
cover: https://cloud.luckynwa.top/profile/yys/385.webp
description: 千淘万漉虽辛苦，吹尽狂沙始到金
categories: 人工智能
tags: Ops
comments: true
abbrlink: ai1
summary: >-
  本文介绍了两款主流AI编程助手的配置与使用方法。Claude Code是Anthropic推出的终端原生AI编程工具，支持通过cc-switch管理配置，可接入小米AI的token plan，并集成到VSCode中使用。CodeX是OpenAI的命令行编程工具，支持GPT-5.2-codex模型，具备全权限访问能力。文章详细说明了安装步骤、配置方法和实用技巧，帮助开发者快速上手AI辅助编程。
date: 2026-03-01 05:44:01
---

## Claude Code

Claude Code是Anthropic打造的**终端原生AI编程工具**

### 环境要求

NodeJS 18.0+，推荐使用 v24.13.0

### 安装配置

推荐使用 [cc-switch](https://github.com/farion1231/cc-switch/releases/tag/v3.12.2) 统一管理配置

```bash
npm config set registry https://registry.npmmirror.com/    #设置国内镜像源

# 全局安装最新稳定版
npm install -g @anthropic-ai/claude-code

# 验证安装成功（显示版本号即生效）
claude --version
```

### Token Plan 配置

直接去 `C:\Users\Administrator\.claude` 下编辑 `settings.json`，配置小米AI的token plan即可

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "tp-c7p5iymh5lh28eg4e4f1hn2iyw1y????",
    "ANTHROPIC_BASE_URL": "https://token-plan-cn.xiaomimimo.com/anthropic",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "mimo-v2.5-pro",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "mimo-v2.5-pro",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "mimo-v2.5-pro",
    "ANTHROPIC_MODEL": "mimo-v2.5-pro",
    "CLAUDE_CODE_EFFORT_LEVEL": "max"
  },
  "skipWebFetchPreflight": true
}
```

### 启动验证

终端输入 `claude` 后确定，能看到以下信息说明配置成功：

```
│   mimo-v2.5-pro ·API Usage Billing   │ Auto mode is now available for Max subscribers when using Opus 4.7
│        C:\Users\Administrator
```

### VSCode 集成

去VSCode插件市场搜索 **Claude Code** 集成，就能直接在VSCode上开发

### 常用命令

```bash
/context    # 查看上下文用量，如果携带太多可以采用压缩
/compact    # 压缩上下文
```

> **记忆与上下文的区别：** 记忆可以跨越对话，上下文不行

### 技能配置

这是全局的技能配置路径：`C:\Users\Administrator\.claude\skills` 下创建技能文件夹和它对应的 `SKILL.md`

项目级技能配置：`.claude/skills/技能文件夹名/SKILL.md`

创建子agents：`.claude/agents/tester.md`（测试专家）

## CodeX

### 环境要求

用 NodeJS v24.13.0

### 安装

```bash
npm install -g @openai/codex

codex --version
```

> **注意：** 以前要是装过有缓存，可能请求超时，直接删除 `C:\Users\Administrator\.codex` 文件夹即可

### 使用步骤

1. 创建一个空的文件夹项目，用来给codex表演，cmd进入这个文件夹

2. 输入 `/` 去修改默认配置，model选最新的 `gpt-5.2-codex`，effort 选 `xhigh`

3. 继续输入 `/`，permissions 选 `full access`，给它全部权限

4. 输入 `/init` 就能生成一个md文档

### 示例任务

以下是一个完整的项目开发示例：

```
我打算做一个新的电影评分软件，基本实现电影评分和评论功能，你需要完成整个项目的完整开发，并且部署上线，你需要抓取豆瓣上正在上线的电影，自动更新，这是一个完整的项目，你负责全部流程，最终交付给我部署后的网址，你可以利用相关部署的skills来帮助你，如果没有你自己搜索并下载使用，再交付前，你肉眼检查，没啥问题再给我
```
