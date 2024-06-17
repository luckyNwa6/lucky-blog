---
title: RocketMq 知识点以及环境搭建
description: RocketMq 使用相关的学习笔记
cover: "https://luckynwa.top/mypic/blog/rocketMqIcon.png"
categories: Java
tags: RocketMq
abbrlink: 32867
comments: false
date: 2022-11-14 13:32:28
---

1、安装和配置

```
环境变量
ROCKETMQ_HOME
E:\LuckySoft\rocketmq-4.9.3

版本:rocketmq-4.9.3c

bin目录，修改runserver.cmd的JAVA_OPT为，大小可自己调整
rem set "JAVA_OPT=%JAVA_OPT% -server -Xms2g -Xmx2g -Xmn1g"
set "JAVA_OPT=%JAVA_OPT% -server -Xms256m -Xmx512m"

修改runbroker.cmd的JAVA_OPT为，大小可自己调整
rem set "JAVA_OPT=%JAVA_OPT% -server -Xms2g -Xmx2g -Xmn1g"
set "JAVA_OPT=%JAVA_OPT% -server -Xms256m -Xmx512m"


```

2、启动

```
直接运行bin下mqnamesrv.cmd
再bin下目录cmd打开，输入下面命令
bin>mqbroker.cmd -n localhost:9876

```

3、代码

```
   <dependency>
        <groupId>org.apache.rocketmq</groupId>
        <artifactId>rocketmq-spring-boot-starter</artifactId>
        <version>2.0.4</version>
    </dependency>
```

```
rocketmq:          #很奇怪前面没有和spring同级都能跑
  name-server: 127.0.0.1:9876
  producer:
    group: producer-demo1
  consumer:
    group: consumer-demo1

```

```
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

```
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
