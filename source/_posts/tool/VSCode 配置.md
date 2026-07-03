---
title: VSCode 配置
cover: https://imgs.luckynwa.top/openApi/lucky/yys/364
description: 工欲善其事，必先利其器
categories: 工具
tags: VSCode
comments: true
abbrlink: 36258
summary: >-
  本文详细介绍 VSCode 的安装卸载、插件推荐、Vue3 插件配置、settings.json 自定义、头部注释自动生成等实用技巧，帮助前端开发者快速搭建高效的开发环境。
date: 2022-01-01 11:22:21
---

# 安装

直接安装软件包，记得添加到 Win 资源管理器（右键文件可以用它打开）。

1. 设置 → 搜 `Update mode` → `default` 改成 `none`
2. 搜 `update` → 取消第一个后台更新
3. 弄完再去安装语言插件，再重启 VSCode

**新版本：** `VSCodeUserSetup-x64-1.127.0`，使用 GitHub `luckyNwa6` 登录

# 卸载

1. 卸载软件
2. 删除 `C:\Users\用户名\.vscode` 文件夹
3. `Win+R` 输入 `%appdata%`，找到 `Code` 和 `Visual Studio Setup` 文件夹删除

# 推荐插件

| 插件名                        | 说明                                                                  |
| ----------------------------- | --------------------------------------------------------------------- |
| **Chinese (Simplified)**      | 简体中文，去设置里搜缩略图关掉                                        |
| **Atom One Dark Theme**       | 颜色主题                                                              |
| **vscode-icons**              | 文件夹图标                                                            |
| **:emojisense:**              | 代码中输入 `:smile_cat:` → 😸                                         |
| **Auto Close Tag**            | 键入开始标记自动插入结束标记                                          |
| **Auto Rename Tag**           | 同步修改 HTML/XML 标签                                                |
| **Live Server**               | 快速启动本地服务，自动监听                                            |
| **Image Preview**             | 鼠标悬停图片地址查看图片                                              |
| **Code Spell Checker**        | 拼写检查器，配合驼峰大小写                                            |
| **Vetur**                     | 语法高亮、智能感知、Emmet 等（Vue2）                                  |
| **Quokka.js**                 | 练习 JS，`Ctrl+Shift+P` 输入 Quokka 找到 newFile，设置快捷键 `Ctrl+N` |
| **vue-component**             | template 输入组件名称自动导入                                         |
| **CodeSnap**                  | 选中代码右键使用，代码截图更美观                                      |
| **IntelliCode**               | 代码智能提示                                                          |
| **Path Intellisense**         | 路径提示                                                              |
| **Prettier**                  | 前端代码格式化，记得使用最后的配置                                    |
| **vue-format**                | Vue2 格式化插件（Vue3 会删除 setup），快捷键 `Ctrl+Alt+P`             |
| **Bracket Pair Colorizer**    | 彩虹 `{}`，被弃用也装，比内置的好                                     |
| **Highlight Matching Tag**    | 突出标签                                                              |
| **Markdown Preview Enhanced** | MD 文档预览，右键 MPE 打开                                            |
| **Codelf**                    | 变量起名神器，变量名右键打开                                          |
| **Turbo Console Log**         | 点击变量生成 `console.log`，默认 `Ctrl+Alt+L` 改成 `Ctrl+Shift+R`     |
| **Vue Peek**                  | 快速跳转到组件、模块定义的文件                                        |
| **Git Graph**                 | 可视化版本控制插件                                                    |
| **GitLens**                   | 代码行上显示 Git 提交信息                                             |
| **Git History**               | 查看 Git 提交历史记录                                                 |
| **Git Blame**                 | 轻量的提交信息查看                                                    |
| **koroFileHeader**            | 头部注释自动生成，快捷键 `Alt+/`                                      |
| **Jest Runner**               | 测试用，加上 debugger 点右键                                          |
| **vue-helper**                | 左键点击方法能跳转                                                    |
| **会了吧**                    | 帮助看懂英文                                                          |

**VSCode 快捷键参考：** https://www.bilibili.com/read/cv9699783/

## 自定义快捷键

| 原快捷键     | 改为               | 说明                                            |
| ------------ | ------------------ | ----------------------------------------------- |
| `Ctrl+Enter` | `Ctrl+Shift+Enter` | 换行                                            |
| `Ctrl+.`     | `Ctrl+.`           | i18n 插件提取文案，选中中文再快捷键直接回车生成 |

# settings.json 配置

```json
{
  "update.enableWindowsBackgroundUpdates": false,
  "update.mode": "none",
  "workbench.colorTheme": "Atom One Dark",
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.bracketPairColorization.enabled": true,
  "editor.guides.bracketPairs": "active",
  "extensions.ignoreRecommendations": true,
  "workbench.iconTheme": "vscode-icons",
  "workbench.startupEditor": "none",
  "bracket-pair-colorizer-2.depreciation-notice": false,
  "editor.minimap.enabled": false,
  "vetur.ignoreProjectWarning": true,
  "path-intellisense.mappings": {
    "@": "${workspaceRoot}/src"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "workbench.editor.enablePreview": false,
  "workbench.editor.wrapTabs": true,
  "explorer.confirmDelete": false,
  "security.workspace.trust.untrustedFiles": "open",
  "editor.fontSize": 18,
  "liveServer.settings.donotVerifyTags": true,
  "explorer.confirmDragAndDrop": false,
  "Codegeex.Comment.LanguagePreference": "zh-CN",
  "Codegeex.Privacy": false,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.tabSize": 2,
  "editor.tokenColorCustomizations": {
    "comments": "#6A9955",
    "keywords": "#ff55ff",
    "variables": "#5eccf8",
    "strings": "#CE9178",
    "functions": "#DCDCAA",
    "numbers": "#00eeff",
    "types": "#55bbff",
    "textMateRules": [
      {
        "scope": "string.quoted.double",
        "settings": {
          "foreground": "#9CDCFE"
        }
      }
    ]
  },
  "workbench.editor.untitled.hint": "hidden",
  "git.enableSmartCommit": true,
  "git.confirmSync": false,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "javascript.updateImportsOnFileMove.enabled": "always",
  "editor.maxTokenizationLineLength": 1.1111111111111111e22,
  "fileheader.customMade": {
    "Author": "LuckyNwa⭐️",
    "Date": "Do not edit",
    "FilePath": "Do not edit",
    "LastEditTime": "Do not edit",
    "Description": ""
  },
  "fileheader.cursorMode": {
    "description": "",
    "param": "",
    "return": ""
  },
  "fileheader.configObj": {
    "autoAdd": true,
    "autoAddLine": 2,
    "designAddHead": false,
    "headDesignName": "grassHorse2",
    "headDesign": false,
    "prohibitAutoAdd": ["json", "md", "vue", ".cjs", ".conf", ".yaml", ".d.ts", ".scss", ".svg", ".ts"],
    "prohibitItemAutoAdd": ["test_vue"],
    "moveCursor": true,
    "dateFormat": "YYYY-MM-DD HH:mm:ss",
    "folderBlacklist": ["node_modules", "vite.config.ts", "vite.config.js", "main.js", "main.ts"]
  },
  "explorer.compactFolders": false,
  "notebook.compactView": false
}
```

# Vue3 插件

> ⚠️ 记得禁用或删除 Vetur，不然会爆红很多地方

| 插件名                            | 说明                           |
| --------------------------------- | ------------------------------ |
| **Vue VSCode Snippets**           | 新 Vue 文件输入 `vbase` 选模板 |
| **TypeScript Vue Plugin (Volar)** | 用于 TypeScript 的 Vue 插件    |
| **Vue Language Features (Volar)** | Vue3.0 语法支持                |
| **WindiCSS IntelliSense**         | 自动完成、语法高亮、代码折叠   |
| **Iconify IntelliSense**          | Iconify 预览和搜索             |
| **i18n Ally**                     | 国际化智能提示                 |
| **Stylelint**                     | CSS 格式化                     |
| **Prettier**                      | 代码格式化                     |
| **ESLint**                        | 脚本代码检查                   |
| **DotENV**                        | `.env` 文件高亮                |

# 头部注释插件配置

先商店下载 [koroFileHeader](https://marketplace.visualstudio.com/items?itemName=OBKoro1.korofileheader)。

配置路径：VSCode 左下角齿轮 → 设置 → 搜 `fileheader.customMade` → 点击在 settings.json 中编辑

```json
{
  "fileheader.customMade": {
    "Author": "NWA",
    "Date": "Do not edit",
    "FilePath": "Do not edit",
    "LastEditors": "git config user.name",
    "LastEditTime": "Do not edit"
  },
  "fileheader.configObj": {
    "designAddHead": true,
    "headDesignName": "grassHorse2",
    "headDesign": true,
    "prohibitAutoAdd": ["json", "md"],
    "prohibitItemAutoAdd": ["test_vue"],
    "autoAddLine": 100,
    "folderBlacklist": ["node_modules"]
  }
}
```

## 图案可选代码

```
random            随机
buddhalImg        佛祖
buddhalImgSay     佛祖+佛曰
buddhalSay        佛曰
totemDragon       龙图腾
belle             美女
coderSong         程序员之歌
loitumaGirl       甩葱少女
keyboardAll       全键盘
keyboardSmall     小键盘
totemWestDragon   喷火龙
jesus             耶稣
dog               狗
grassHorse        草泥马
grassHorse2       草泥马2
totemBat          蝙蝠
```
