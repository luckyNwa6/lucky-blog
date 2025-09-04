---
title: RocketMq简单实现
description: RocketMq 使用相关的笔记
# cover: https://imgs.luckynwa.top/profile/blog/rocketMqIcon.png
categories: 后端
tags: RocketMq
abbrlink: 32867
comments: true
summary: >-
  启动小维AI摘要模块⚡……运算完成！这篇文章介绍了RocketMQ的简单实现过程，包括环境安装配置、启动步骤及代码示例，首先讲解了RocketMQ
  4.9.3版本的下载与环境变量设置，需修改bin目录下runserver.cmd和runbroker.cmd中的JAVA_OPT参数以调整JVM内存大小，接着描述了如何通过运行mqnamesrv.cmd启动NameServer，再通过mqbroker.cmd连接至9876端口启动Broker，然后在项目中引入rocketmq-spring-boot-starter依赖，并配置name-server地址及生产者和消费者的group信息，最后给出了消费者和生产者的代码示例，消费者通过RocketMQListener监听指定topic接收消息并打印，生产者则通过RocketMQTemplate向指定topic发送多条测试消息，整体流程清晰，便于快速上手RocketMQ的基本使用。
date: 2022-11-14 13:32:28
---

1、安装和配置

环境变量

```shell
ROCKETMQ_HOME
E:\LuckySoft\rocketmq-4.9.3
```

版本:rocketmq-4.9.3

bin 目录，修改 runserver.cmd 的 JAVA_OPT 为 和 修改 runbroker.cmd 的 JAVA_OPT 大小可自己调整

```shell

rem set "JAVA_OPT=%JAVA_OPT% -server -Xms2g -Xmx2g -Xmn1g"
set "JAVA_OPT=%JAVA_OPT% -server -Xms256m -Xmx512m"


rem set "JAVA_OPT=%JAVA_OPT% -server -Xms2g -Xmx2g -Xmn1g"
set "JAVA_OPT=%JAVA_OPT% -server -Xms256m -Xmx512m"
```

2、启动

直接运行 bin 下 mqnamesrv.cmd
再 bin 下目录 cmd 打开，输入下面命令

```shell
bin>mqbroker.cmd -n localhost:9876
```

3、代码

```xml
   <dependency>
        <groupId>org.apache.rocketmq</groupId>
        <artifactId>rocketmq-spring-boot-starter</artifactId>
        <version>2.0.4</version>
    </dependency>
```

```yml
rocketmq: #很奇怪前面没有和spring同级都能跑
  name-server: 127.0.0.1:9876
  producer:
    group: producer-demo1
  consumer:
    group: consumer-demo1
```

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

@RocketMQMessageListener(topic = "rocket-send1",consumerGroup ="${rocketmq.consumer.group}")
@Component
public class RocketConsumerListener implements RocketMQListener<String> {
    @Override
    @SysLog(operationType = "接收",operationName = "接收,并展示",value = "200")
    public void onMessage(String s) {
        System.out.println("consumer 收到消息：" + s);
    }
}

```

```java
package com.nwa.controller;

import com.nwa.aop.SysLog;
import org.apache.rocketmq.spring.core.RocketMQTemplate;
import org.springframework.beans.factory.annotation.Autowired;
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
    @SysLog(operationType = "用户操作",operationName = "发送,并展示",value = "200")
    @RequestMapping("/send")
    public String send(){

        for(int i=0;i<10;i++){
            rocketMQTemplate.convertAndSend("rocket-send1","rocket-testA-"+i);
        }

        return "send ok";
    }
}
```
