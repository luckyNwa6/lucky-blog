---
title: Zookeeper
cover: https://imgs.luckynwa.top/profile/yys/355.webp
description: 路漫漫其修远兮，吾将上下而求索
categories: 工具
tags: Docker
comments: true
abbrlink: tool002
summary: >-
  本文介绍Zookeeper分布式协调服务的安装配置方法，详细说明四种znode节点类型（永久、临时、序列化）的区别，以及Zookeeper Java客户端的基本API使用方法，包括创建节点、监听事件、CRUD操作等。
date: 2022-08-01 01:02:21
---

## 简介

ZooKeeper是一个功能强大的分布式协调服务，可以用于构建和管理分布式系统。它提供了一致性、可靠性和高效性的分布式协调机制，可以应用于领导者选举、配置管理、命名服务、分布式锁等各种分布式应用场景。

## 安装部署

1. 将 E:\other\装机必备软件\SSSS开发相关 下的安装包拖动到 /nwa 目录下

2. 解压并重命名

```shell
cd /nwa
tar -zxvf zookeeper-3.7.0-bin.tar.gz
mv apache-zookeeper-3.7.0-bin/ zookeeper
```

3. 创建数据目录

```shell
cd /nwa/zookeeper
mkdir data
```

4. 配置文件

```shell
cd /nwa/zookeeper/conf
cp zoo_sample.cfg zoo.cfg
vim zoo.cfg
```

修改 dataDir 参数为：/nwa/zookeeper/data，保存退出

5. 启动服务

```shell
cd /nwa/zookeeper/bin
./zkServer.sh start
```

常用命令：

| 命令                  | 说明       |
| --------------------- | ---------- |
| ./zkServer.sh start   | 启动       |
| ./zkServer.sh stop    | 停止       |
| ./zkServer.sh restart | 重启       |
| ./zkServer.sh status  | 查看状态   |
| ./zkCli.sh            | 进入客户端 |

## 节点类型

Zookeeper提供一个多层级的节点命名空间（节点称为znode），每个节点都用一个以斜杠（/）分隔的路径表示，而且每个节点都有父节点（根节点除外），非常类似于文件系统。并且每个节点都是唯一的。

znode节点有四种类型：

- PERSISTENT：永久节点。客户端与zookeeper断开连接后，该节点依旧存在
- EPHEMERAL：临时节点。客户端与zookeeper断开连接后，该节点被删除
- PERSISTENT_SEQUENTIAL：永久节点、序列化。客户端与zookeeper断开连接后，该节点依旧存在，只是Zookeeper给该节点名称进行顺序编号
- EPHEMERAL_SEQUENTIAL：临时节点、序列化。客户端与zookeeper断开连接后，该节点被删除，只是Zookeeper给该节点名称进行顺序编号

## 创建节点示例

```shell
[zk: localhost:2181(CONNECTED) 0] create /aa test  # 创建持久化节点
Created /aa

[zk: localhost:2181(CONNECTED) 1] create -s /bb test  # 创建持久序列化节点
Created /bb0000000001

[zk: localhost:2181(CONNECTED) 2] create -e /cc test  # 创建临时节点
Created /cc

[zk: localhost:2181(CONNECTED) 3] create -e -s /dd test  # 创建临时序列化节点
Created /dd0000000003

[zk: localhost:2181(CONNECTED) 4] ls /  # 查看某个节点下的子节点
[aa, bb0000000001, cc, dd0000000003, zookeeper]

[zk: localhost:2181(CONNECTED) 5] stat /  # 查看某个节点的状态
cZxid = 0x0
ctime = Thu Jan 01 08:00:00 CST 1970
mZxid = 0x0
mtime = Thu Jan 01 08:00:00 CST 1970
pZxid = 0x5
cversion = 3
dataVersion = 0
aclVersion = 0
ephemeralOwner = 0x0
dataLength = 0
numChildren = 5

[zk: localhost:2181(CONNECTED) 6] get /aa  # 查看某个节点的内容
test

[zk: localhost:2181(CONNECTED) 11] delete /distributed  # 删除某个节点

[zk: localhost:2181(CONNECTED) 7] ls /  # 再次查看
[bb0000000001, cc, dd0000000003, zookeeper]
```

## 事件监听

在读取数据时，我们可以同时对节点设置事件监听，当节点数据或结构变化时，zookeeper会通知客户端。当前zookeeper针对节点的监听有如下四种事件：

1. 节点创建：stat -w /xx
   - 当/xx节点创建时：NodeCreated

2. 节点删除：stat -w /xx
   - 当/xx节点删除时：NodeDeleted

3. 节点数据修改：get -w /xx
   - 当/xx节点数据发生变化时：NodeDataChanged

4. 子节点变更：ls -w /xx
   - 当/xx节点的子节点创建或者删除时：NodeChildChanged

## Java客户端

ZooKeeper的java客户端有：原生客户端、ZkClient、Curator框架（类似于redisson，有很多功能性封装）

### 引入依赖

```xml
<dependency>
    <groupId>org.apache.zookeeper</groupId>
    <artifactId>zookeeper</artifactId>
    <version>3.7.0</version>
</dependency>
```

### 常用API

```java
public class ZkTest {

    public static void main(String[] args) throws KeeperException, InterruptedException {

        // 获取zookeeper链接
        CountDownLatch countDownLatch = new CountDownLatch(1);
        ZooKeeper zooKeeper = null;
        try {
            zooKeeper = new ZooKeeper("172.16.116.100:2181", 30000, new Watcher() {
                @Override
                public void process(WatchedEvent event) {
                    if (Event.KeeperState.SyncConnected.equals(event.getState())
                            && Event.EventType.None.equals(event.getType())) {
                        System.out.println("获取链接成功。。。。。。" + event);
                        countDownLatch.countDown();
                    }
                }
            });

            countDownLatch.await();
        } catch (Exception e) {
            e.printStackTrace();
        }

        // 创建一个节点
        // 参数：1-节点路径 2-节点内容 3-节点的访问权限 4-节点类型
        // OPEN_ACL_UNSAFE：任何人可以操作该节点
        // CREATOR_ALL_ACL：创建者拥有所有访问权限
        // READ_ACL_UNSAFE: 任何人都可以读取该节点
        zooKeeper.create("/test", "haha~~".getBytes(), ZooDefs.Ids.OPEN_ACL_UNSAFE, CreateMode.EPHEMERAL);

        // 判断节点是否存在
        Stat stat = zooKeeper.exists("/test", true);
        if (stat != null){
            System.out.println("当前节点存在！" + stat.getVersion());
        } else {
            System.out.println("当前节点不存在！");
        }

        // 判断节点是否存在，同时添加监听
        zooKeeper.exists("/test", event -> {
        });

        // 获取一个节点的数据
        byte[] data = zooKeeper.getData("/atguigu/ss0000000001", false, null);
        System.out.println(new String(data));

        // 查询一个节点的所有子节点
        List<String> children = zooKeeper.getChildren("/test", false);
        System.out.println(children);

        // 更新
        zooKeeper.setData("/test", "wawa...".getBytes(), stat.getVersion());

        // 删除一个节点
        //zooKeeper.delete("/test", -1);

        if (zooKeeper != null){
            zooKeeper.close();
        }
    }
}
```
