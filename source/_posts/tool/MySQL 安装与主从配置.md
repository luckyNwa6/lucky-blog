---
title: MySQL 安装与主从配置
cover: https://imgs.luckynwa.top/profile/yys/395.webp
description: 不经一番寒彻骨，怎得梅花扑鼻香
categories: 工具
tags: Docker
comments: true
abbrlink: mysql001
summary: >-
  本文详细介绍 Docker 环境下 MySQL 的安装配置，包括 MySQL 5.7 和 8.0 版本的安装方法、Navicat 远程连接服务器的配置步骤、以及 MySQL 主从复制的完整搭建流程。涵盖常见问题如 1251 加密错误的解决方案、最大连接数设置、主从同步故障排除等实用技巧。
date: 2024-05-01 11:22:21
---

# MYSQL安装

## 安装 MySQL 5.7

```shell
docker run -id --name mysql -p 3307:3306  -e MYSQL_ROOT_PASSWORD=123456 mysql:5.7.17

docker update mysql --restart=always     # 开机自启
```

- `3307:3306`：映射容器服务 docker 的 3306 端口到宿主机（linux 系统）的 3307 端口，外部主机可以直接通过 宿主机ip:3307 访问到 MySQL 的服务
- 把云服务器的防火墙 3307 端口打开

## 查看 MySQL 版本

```shell
docker ps -a
docker start 9d04478b1b1b
docker exec -it 9d04478b1b1b bash     # 进入容器
mysql -h localhost -u root -p123456   # 登录
select version();
```

## 安装 MySQL 8.0

```shell
docker run -id --name mysql8 -p 3308:3306  -e MYSQL_ROOT_PASSWORD=123456  mysql

docker update mysql8 --restart=always
```

## 遇到1251 错误

报 1251 错误原因：mysql8 之前的版本中加密规则是 `mysql_native_password`

而在 mysql8 之后，加密规则是 `caching_sha2_password`

先查看正在运行的容器 id，接着进入这个查看的容器（不进入会发现 mysql 找不到）：

```shell
# (1) 查看
docker ps -a

# (2) 进入这个查看的容器
docker exec -it CONTAINER ID bash

# (3) 因为无法输入密码，直接这样登录即可
mysql -h localhost -u root -p123456

# (4) 使用数据库
use mysql

# (5) 查看 root
select user,host from user where user='root';

# (6) 对远程连接进行授权
GRANT ALL ON *.* TO 'root'@'%';

# (7) 更改密码的加密规则
ALTER USER 'root'@'%' IDENTIFIED BY '123456' PASSWORD EXPIRE NEVER;

# (8) 更改 root 的密码
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';

# (9) 刷新权限，再次用客户端连接即可
flush privileges;
```

## 设置 MySQL 最大连接数

### 方法 1（重启失效）

```shell
docker exec -it mysql-master bash
mysql -h localhost -u root -p123456
set GLOBAL max_connections=5202;
```

### 方法 2

在 `/nwa/mysql5.7/master/mysql` 下 `mysql.cnf` 末尾添加（效果好像不行）：

```ini
[mysqld]
max_connections=5202
```

去 Navicat 查看：

```sql
show VARIABLES like 'max_conn';
```

# Navicat 远程连接服务器失败

```shell
systemctl stop firewalld
systemctl disable firewalld

docker exec -it mysql bash
mysql -h localhost -u root -p123456
```

输入授权语句：

```sql
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '123456' WITH GRANT OPTION;

FLUSH PRIVILEGES;
```

# MySQL 主从配置

## 第一步：安装主从数据库

```shell
# 主数据库
docker run -itd --name mysql-master -p 3309:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql:5.7.17;

# 从数据库
docker run -itd --name mysql-slave -p 3310:3306 -e MYSQL_ROOT_PASSWORD=123456 mysql:5.7.17;
```

## 第二步：Navicat 连接主数据库并授权

打开 Navicat 连接上面 2 个，再打开主的数据库，执行：

```sql
CREATE user nwa@'%' IDENTIFIED by '123456'; -- 创建用户，% 表示任何人都有权限访问
GRANT REPLICATION SLAVE ON *.* TO nwa@'%'; -- 赋予权限是从数据库的权限，能新建任何数据表
FLUSH PRIVILEGES; -- 刷新生效
SHOW GRANTS for nwa@'%'; -- 查看拥有权限
```

## 第三步：修改主数据库配置

复制配置文件到外面修改，修改完再复制回去：

```shell
docker cp mysql-master:/etc/mysql /nwa/mysql5.7/master/
mysql --help | grep my.cnf
```

修改 `/nwa/mysql5.7/master/mysql/mysql.conf.d/` 里 cnf 结尾的文件，配置如下（重点最后 2 行）：

```ini
[mysqld]
pid-file  = /var/run/mysqld/mysqld.pid
socket    = /var/run/mysqld/mysqld.sock
datadir   = /var/lib/mysql
#log-error  = /var/log/mysql/error.log
# By default we only accept connections from localhost
#bind-address = 127.0.0.1
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0
server-id     = 100
log-bin     = mysql-bin
```

修改完成后复制回去：

```shell
docker cp /nwa/mysql5.7/master/mysql/mysql.conf.d/mysqld.cnf mysql-master:/etc/mysql/mysql.conf.d/
```

验证修改是否生效：

```shell
docker exec -it mysql-master bash
cd /etc/mysql/mysql.conf.d
cat mysqld.cnf
```

## 第四步：修改从数据库配置

同理设置从数据库，先复制，再修改，再复制：

```shell
docker cp mysql-slave:/etc/mysql /nwa/mysql5.7/slave/
```

修改配置文件（server-id 改为 101）：

```ini
server-id     = 101
log-bin     = mysql-bin
```

复制到容器里：

```shell
docker cp /nwa/mysql5.7/slave/mysql/mysql.conf.d/mysqld.cnf mysql-slave:/etc/mysql/mysql.conf.d/
```

## 第五步：重启数据库并设置开机自启

```shell
docker restart mysql-master
docker restart mysql-slave
docker update mysql-master --restart=always
docker update mysql-slave --restart=always
```

## 第六步：配置主从同步

以上 docker 里面主从设置完毕，再打开 Navicat 设置从数据库：

```sql
STOP SLAVE;

CHANGE MASTER TO
MASTER_HOST='47.98.230.128',    -- 宿主机ip
MASTER_PORT=3309,               -- mysql-master 映射到宿主机的端口
MASTER_USER='nwa',              -- 用户名
MASTER_PASSWORD='123456';

START SLAVE;                    -- 启动从数据库
SHOW SLAVE status;              -- 检测从数据库状态
```

注意：这个宿主机 ip 看着点。

IO running 和 SQL running 必须 2 个都是 Yes。

接下来主数据库创建表，从也会同步了。

## 常见问题

数据要用 sql 语句去删，别直接删除行，不然数据就不能同步了！

如果状态里 `Slave_SQL_Running` 是 no，则在 Navicat 从数据库查询：

```sql
stop slave;
SET GLOBAL SQL_SLAVE_SKIP_COUNTER=1;
START SLAVE;
SHOW SLAVE status; -- 检测从数据库状态
```

## 修改密码

```shell
docker exec -it mysql bash
docker exec -it mysql-master bash
docker exec -it mysql-slave bash
mysql -h localhost -u root -p123456
```

```sql
set password for root@localhost = password('123456'); -- 这是只改本地，远程选下面
set password for 'root'@'%' =password('123456');
flush privileges;
```
