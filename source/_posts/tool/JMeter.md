---
title: JMeter
cover: https://cloud.luckynwa.top/profile/yys/105.webp
description: 少年辛苦终身事，莫向光阴惰寸功
categories: 工具
tags: Tool
comments: true
abbrlink: tool3
summary: >-
  本文介绍 JMeter 压力测试工具的使用方法，包括线程组配置、HTTP 请求设置、监听器添加、吞吐量查看等操作步骤，帮助开发者快速上手接口性能测试。
date: 2023-07-15 09:37:29
---

# 简介

Apache JMeter 是一款开源的压力测试工具，主要用于对 Web 应用、API 接口进行性能测试和负载测试。通过模拟大量并发用户访问，可以测量系统的吞吐量、响应时间、错误率等关键指标。

# 使用步骤

1. 进入 `bin` → 点击 `jmeter.bat`（本版本自带汉化）
2. 测试计划右键 → 添加线程 → 线程组
3. 线程组右键 → 取样器 → HTTP 请求
   - 协议：`http` 或 `https`
   - IP：`localhost` 或其他
   - 端口：对应端口
   - 路径：接口路径
4. 测试计划右键 → 添加 → 监听器 → 查看结果树 / 汇总报告

# 详细步骤

1. 添加线程组：测试计划 → 右键 → Add → Thread → 线程组
2. 线程数 1000，Ramp-Up 启动时间 10s，循环 10 = 访问 1w 次
3. 右键线程组 → 添加 Sampler（取样器）→ HTTP 请求
4. 填写协议（http）、IP、端口、路径、编码 UTF-8，有参数填参数
5. 右键 HTTP 请求 → 添加监听器 → 查看结果树和汇总报告，`ThroughPut` 是吞吐量（每秒请求次数）
6. 点击绿色运行按钮
