---
title: RocketMQ 环境搭建与代码示例
description: 黄沙百战穿金甲，不破楼兰终不还
cover: https://cloud.luckynwa.top/profile/yys/444.webp
categories: 工具
tags: Middleware
abbrlink: tool11
comments: true
summary: >-
  本文介绍了RocketMQ的简单实现过程，包括4.9.3版本的环境安装配置、JVM参数调整、NameServer和Broker启动步骤，以及Spring Boot集成rocketmq-spring-boot-starter依赖，配置name-server地址、生产者和消费者group，最后给出消费者监听topic和生产者发送消息的完整代码示例，便于快速上手RocketMQ基本使用。
date: 2023-09-09 04:34:07
---

## 1、安装和配置

**版本**: rocketmq-4.9.3

设置环境变量：

```
ROCKETMQ_HOME = E:\LuckySoft\rocketmq-4.9.3
```

**修改JVM内存参数**

进入 bin 目录，修改 `runserver.cmd` 和 `runbroker.cmd` 中的 JAVA_OPT 参数，根据本地机器配置调整内存大小：

```shell
# 修改前（默认配置）
rem set "JAVA_OPT=%JAVA_OPT% -server -Xms2g -Xmx2g -Xmn1g"

# 修改后（本地开发环境）
set "JAVA_OPT=%JAVA_OPT% -server -Xms256m -Xmx512m"
```

## 2、启动服务

**启动 NameServer**

直接运行 bin 目录下的 `mqnamesrv.cmd`

**启动 Broker**

打开 cmd 终端，执行以下命令连接到 NameServer：

```shell
bin>mqbroker.cmd -n localhost:9876
```

## 3、Spring Boot 集成代码

**引入依赖**

```xml
<dependency>
    <groupId>org.apache.rocketmq</groupId>
    <artifactId>rocketmq-spring-boot-starter</artifactId>
    <version>2.0.4</version>
</dependency>
```

**配置 application.yml**

```yml
rocketmq:
  name-server: 127.0.0.1:9876
  producer:
    group: producer-demo1
  consumer:
    group: consumer-demo1
```

**消费者示例**

```java
package com.nwa.Lis;

import com.nwa.aop.SysLog;
import org.apache.rocketmq.spring.annotation.RocketMQMessageListener;
import org.apache.rocketmq.spring.core.RocketMQListener;
import org.springframework.stereotype.Component;

/**
 * @Author Lucky友人a
 * @Date 2023/2/27 -13:03
 */
@RocketMQMessageListener(topic = "rocket-send1", consumerGroup = "${rocketmq.consumer.group}")
@Component
public class RocketConsumerListener implements RocketMQListener<String> {
    @Override
    @SysLog(operationType = "接收", operationName = "接收,并展示", value = "200")
    public void onMessage(String s) {
        System.out.println("consumer 收到消息：" + s);
    }
}
```

**生产者示例**

```java
package com.nwa.controller;

import com.nwa.aop.SysLog;
import org.apache.rocketmq.spring.core.RocketMQTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

/**
 * @Author Lucky友人a
 * @Date 2023/2/27 -13:02
 */
@RestController
@RequestMapping("/rocket/producer")
public class RocketProducerHandler {

    @Resource
    private RocketMQTemplate rocketMQTemplate;

    @SysLog(operationType = "用户操作", operationName = "发送,并展示", value = "200")
    @RequestMapping("/send")
    public String send() {
        for (int i = 0; i < 10; i++) {
            rocketMQTemplate.convertAndSend("rocket-send1", "rocket-testA-" + i);
        }
        return "send ok";
    }
}
```
