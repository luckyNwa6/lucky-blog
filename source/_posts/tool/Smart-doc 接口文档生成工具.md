---
title: Smart-doc 接口文档生成工具
cover: https://imgs.luckynwa.top/profile/yys/421.webp
description: 世界以痛吻我，要我报之以歌
categories: 工具
tags: Java
comments: true
abbrlink: toolSmart388
summary: >-
  Smart-doc 是一款 Java 接口文档生成工具，无需使用任何注解侵入业务代码中，通过解析代码注释来自动生成 API 文档。
  使用时需要在 resource 目录下创建 smart-doc.json 配置文件，支持设置服务器地址、路径前缀、文档样式等参数。
  通过配置 allInOne 参数可以控制生成单个或多个文档文件，createDebugPage 参数可生成带调试功能的接口文档。
  在项目的 pom.xml 中添加 smart-doc-maven-plugin 插件后，即可通过 Maven 命令快速生成 HTML 格式的接口文档。
date: 2022-12-09 10:30:00
---

## 简介

smart-doc 是一款Java接口文档生成工具，不会使用任何注解侵入业务代码中

**注意：我们项目中的类、方法、属性，都必须使用文档注释！**

## 配置文件

resource 目录下新建一个 smart-doc.json

```json
{
  "serverUrl": "http://localhost:8080",
  "pathPrefix": "",
  "allInOne": true,
  "outPath": "D://projectDoc",
  "style": "xt256",
  "createDebugPage": false,
  "revisionLogs": [
    {
      "version": "1.0",
      "revisionTime": "2023-11-09 10:30",
      "status": "创建",
      "author": "luckyNwa",
      "remarks": "xxx管理系统"
    }
  ]
}
```

## 配置说明

- `allInOne`: 设为 true 时生成单个 index.html 文件；设为 false 时生成 api.html、dict.html 和 error.html 多个文件
- `createDebugPage`: 设为 true 后，双击 smart-doc:html 选项可生成带接口调用功能的文档，双击 debug-all.html 即可使用

## 高级配置

```json
{
  "isStrict": false, // 严格的注释检查，当缺少注释或注释不规范时无法生成文档，默认 false
  "style": "xt256", // 基于 highlight.js 的代码高亮设置
  "pathPrefix": "/ffee-wiring", // 请求的 api 前缀
  "showAuthor": true, // 是否显示接口作者名称，默认是 true
  "requestFieldToUnderline": true, // 自动将驼峰入参字段在文档中转为下划线格式
  "responseFieldToUnderline": true, // 自动将驼峰出参字段在文档中转为下划线格式
  "inlineEnum": true, // 设置为 true 会将枚举详情展示到参数表中，默认 false
  "ignoreRequestParams": [
    "org.springframework.ui.ModelMap" // 忽略请求参数对象
  ],
  "requestHeaders": [
    {
      "name": "token", // 请求头名称
      "type": "string", // 请求头类型
      "desc": "desc", // 请求头描述信息
      "value": "token 请求头的值", // 不设置默认 null
      "required": false, // 是否必须
      "since": "-", // 什么版本添加的改请求头
      "pathPatterns": "/app/test/**",
      "excludePathPatterns": "/app/page/**"
    }
  ]
}
```

## Maven 插件配置

在 pom.xml 文件的 plugins 标签中添加：

```xml
<plugin>
    <groupId>com.github.shalousun</groupId>
    <artifactId>smart-doc-maven-plugin</artifactId>
    <version>2.6.4</version>
    <configuration>
        <configFile>./src/main/resources/smart-doc.json</configFile>
        <projectName>员工系统接口文档</projectName>
    </configuration>
</plugin>
```

## 生成文档

项目右侧的 maven 打开，查找这个插件，双击 smart-doc:html 就可以生成 html 格式的接口文档
