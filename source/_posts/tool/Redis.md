---
title: Redis
cover: https://imgs.luckynwa.top/profile/yys/808.webp
description: 锲而舍之，朽木不折；锲而不舍，金石可镂
categories: 工具
tags: Docker
comments: true
abbrlink: f3aRedis
summary: >-
  本文详细介绍Redis在Docker环境中的部署与配置。通过docker run命令快速创建Redis容器，挂载配置文件和数据目录实现持久化存储，并对myredis.conf配置文件进行逐项解读，涵盖端口设置、密码认证、RDB/AOF持久化策略、内存管理及网络优化等关键参数，帮助用户快速搭建稳定可靠的Redis服务。
date: 2023-06-15 10:30:00
---

## 简介

Redis（Remote Dictionary Server）是一款开源的高性能键值存储数据库，支持字符串、哈希、列表、集合、有序集合等多种数据结构，广泛用于缓存、消息队列、会话管理等场景。

## 创建配置目录

在Linux中创建以下目录结构：

```shell
/nwa/redis/myredis/data
```

将 `myredis.conf` 放在 `data` 同级目录下，先放配置文件再进行后续操作。

## 启动Redis容器

```shell
docker run --restart=always \
  --log-opt max-size=100m \
  --log-opt max-file=2 \
  -p 6379:6379 \
  --name myredis \
  -v /nwa/redis/myredis/myredis.conf:/etc/redis/redis.conf \
  -v /nwa/redis/myredis/data:/data \
  -d redis redis-server /etc/redis/redis.conf --appendonly yes --requirepass 123456
```

**参数说明：**

| 参数                          | 说明                                                                          |
| ----------------------------- | ----------------------------------------------------------------------------- |
| `--restart=always`            | 总是开机启动                                                                  |
| `--log-opt max-size/max-file` | 日志大小与数量限制                                                            |
| `-p 6379:6379`                | 将6379端口映射出去                                                            |
| `--name myredis`              | 容器名称                                                                      |
| `-v`                          | 数据卷挂载（配置文件 + 数据目录）                                             |
| `-d redis`                    | 后台启动Redis                                                                 |
| `redis-server ...`            | 以配置文件启动，加载容器内 `/etc/redis/redis.conf`（即挂载的 `myredis.conf`） |
| `--appendonly yes`            | 开启Redis持久化                                                               |
| `--requirepass 123456`        | 设置访问密码                                                                  |

## 查看日志并进入CLI

```shell
# 查看最近30分钟日志
docker logs --since 30m myredis

# 进入redis-cli
docker exec -it myredis redis-cli
```

> 由于设置了密码，连接后需先执行 `auth 123456` 认证，再用 `config get requirepass` 查看密码配置。

## 配置文件 myredis.conf

```yml
# bind 192.168.1.100 10.0.0.1
# bind 127.0.0.1 ::1
# bind 127.0.0.1

protected-mode no
port 6379
tcp-backlog 511
requirepass 123456
timeout 0
tcp-keepalive 300
daemonize no
supervised no
pidfile /var/run/redis_6379.pid
loglevel notice
logfile ""
databases 30
always-show-logo yes

# RDB持久化
save 900 1
save 300 10
save 60 10000
stop-writes-on-bgsave-error yes
rdbcompression yes
rdbchecksum yes
dbfilename dump.rdb
dir ./

# 副本配置
replica-serve-stale-data yes
replica-read-only yes
repl-diskless-sync no
repl-disable-tcp-nodelay no
replica-priority 100

# 内存淘汰
lazyfree-lazy-eviction no
lazyfree-lazy-expire no
lazyfree-lazy-server-del no
replica-lazy-flush no

# AOF持久化
appendonly yes
appendfilename "appendonly.aof"
no-appendfsync-on-rewrite no
auto-aof-rewrite-percentage 100
auto-aof-rewrite-min-size 64mb
aof-load-truncated yes
aof-use-rdb-preamble yes

# Lua脚本
lua-time-limit 5000

# 慢日志
slowlog-max-len 128

# 事件通知
notify-keyspace-events ""

# 数据结构优化
hash-max-ziplist-entries 512
hash-max-ziplist-value 64
list-max-ziplist-size -2
list-compress-depth 0
set-max-intset-entries 512
zset-max-ziplist-entries 128
zset-max-ziplist-value 64
hll-sparse-max-bytes 3000
stream-node-max-bytes 4096
stream-node-max-entries 100

# 性能
activerehashing yes
hz 10
dynamic-hz yes
aof-rewrite-incremental-fsync yes
rdb-save-incremental-fsync yes
```
