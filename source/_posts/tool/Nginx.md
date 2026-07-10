---
title: Nginx
cover: https://imgs.luckynwa.top/profile/yys/312.webp
description: 天生我材必有用，千金散尽还复来
categories: 工具
tags: Docker
comments: true
abbrlink: toolnginx356
summary: >-
  本文介绍了Nginx的Docker部署、负载均衡配置及Linux手动编译安装。通过Docker快速启动Nginx容器并挂载配置文件实现多站点托管，利用二级域名配置多个前端项目访问。使用upstream配置实现负载均衡，将请求分发到多个后端服务器。同时详细说明了在Linux系统上手动下载、编译安装Nginx的完整步骤，以及使用httpsok工具实现SSL证书的自动续期。
date: 2026-02-01 11:22:21
---

## 简介

Nginx是一个高性能的Web服务器和反向代理服务器，常用于托管静态网站、负载均衡和反向代理。

## Docker部署

初学1个ng一个服务，后续一个ng多个服务，通过二级域名解决

**直接安装，没镜像自动装最新**

```shell
docker run --name nginx01 -p 9091:80 -d nginx
```

访问 http://IP:9091/

**创建linux下的目录**

```shell
/nwa/nginx
```

**复制nginx容器内的配置到挂载目录**

```shell
docker cp nginx01:/etc/nginx/  /nwa/nginx/
docker cp nginx01:/usr/share/nginx/html  /nwa/nginx
docker cp nginx01:/var/log/nginx  /nwa/nginx/log
```

**安装新的nginx，顺便将其配置文件挂载到刚刚这个目录**

```shell
docker run --name nginx80 -p 80:80 -v /nwa/nginx/html:/usr/share/nginx/html -v /nwa/nginx/nginx/nginx.conf:/etc/nginx/nginx.conf -v /nwa/nginx/nginx/conf.d:/etc/nginx/conf.d -d nginx
```

/nwa/nginxBlog/html下新建myblog，mypic，myui 文件夹

**nginx01配置完就没用了，删除**

```shell
docker stop nginx01
docker rm nginx01
```

**配置多站点**

修改/nwa/nginx/nginx/conf.d

```properties
server {
    listen       80;
    listen  [::]:80;
    server_name  WWW.luckynwa.top;

    location / {
        root   /usr/share/nginx/html/myblog;
        index  index.html index.htm;
    }
    location /HomeAdmin {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://47.98.230.128:8081/HomeAdmin;  # 转发请求给 Tomcat 端口
    }
    location /HomeClient {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://47.98.230.128:8081/HomeClient;  # 转发请求给 Tomcat 端口
    }
    location /mypic {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://47.98.230.128:3737/;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
server {
    listen       80;
    listen  [::]:80;
    server_name  myui.luckynwa.top;

    location / {
        root   /usr/share/nginx/html/myui;
        index  index.html index.htm;
    }


    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}


server {
    listen       80;
    listen  [::]:80;
    server_name  mypic.luckynwa.top;

    location / {
        root   /usr/share/nginx/html/mypic;
        index  index.html index.htm;
    }

   location /api {
        proxy_pass http://47.98.230.128:3737/;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

**重载配置**

```shell
docker exec -it nginx80 bash
nginx -t  会提示成功
nginx -s reload  再加载配置文件
```

## 负载均衡

Nginx 实现负载均衡的原理是将进入的客户端请求分发到多个后端服务器，以达到请求的平衡分配和提高整体系统性能的目的。

使用**keepalived**管理两台 nginx，如果一台 nginx 挂了，可以切另一台 nginx

即用户访问一个域名时候，会代理到不同的后端服务器上，比如一个后端服务有 97、98、99

address：后端服务器的地址。可以是 **IP 地址或域名**。

parameters：可选的参数，用于调整负载均衡的行为。

weight：定义服务器的权重，默认为 1。权重越高，Nginx 会将更多的请求发送到该服务器。

```shell
server backend1.example.com weight=2;
```

max_fails：可选参数，定义服务器允许的最大失败次数，默认为 1。
fail_timeout：可选参数，定义服务器的故障超时时间，默认为 10s。
backup：可选参数，标记服务器为备份服务器。只有当所有其他服务器都不可用时，才会将请求发送到备份服务器。
down：可选参数，标记服务器为下线状态，不接收请求。

**用 pic项目 的后端来做一个负载均衡单体项目测试**，首先修改弄 3 个端口 3738，3739，3740 并打成 jar 包，部署到服务器并运行

java -jar lucky38.jar --spring.profiles.active=prod

java -jar lucky39.jar --spring.profiles.active=prod

java -jar lucky40.jar --spring.profiles.active=prod

修改 nginx 配置文件/nwa/nginx/nginx/conf.d 下的以 conf 后缀文件,2 个配置点

原先

```nginx
server {
    listen       80;
    listen  [::]:80;
    server_name  mypic.luckynwa.top;

    location / {
        root   /usr/share/nginx/html/mypic;
        index  index.html index.htm;
    }

   location /api {
        proxy_pass http://162.14.96.81:3737/;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

修改

```nginx
upstream nwa {      #配置1,对应后端端口
          server 162.14.96.81:3738;
          server 162.14.96.81:3739;
          server 162.14.96.81:3740;
    }
server {
    listen       80;
    listen  [::]:80;
    server_name  mypic.luckynwa.top;

    location / {
        root   /usr/share/nginx/html/mypic;
        index  index.html index.htm;
    }

   location /api {
        proxy_pass http://nwa/;#反向代理 配置2
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

重新加载配置

```shell
    docker exec -it nginx01 bash
    nginx -t  会提示成功
    nginx -s reload  再加载配置文件
```

测试成功！端口请求成功负载均衡 😆

## Linux部署

为什么我突然要搞这个部署？因为我发现有个自动申请证书和自动续的网站，需要这种

联网下载nginx安装包，去/nwa下新建linux文件夹

再linux下新建nginx文件夹

**下载nginx安装包**

```shell
cd /nwa/linux
wget -c http://nginx.org/download/nginx-1.24.0.tar.gz
```

如果没有wget指令先下载

```shell
yum install -y wget
```

**安装nginx所需要的依赖包**

```shell
yum install -y gcc-c++ zlib zlib-devel openssl openssl-devel pcre pcre-devel
```

**解压安装包**

```shell
tar -zxvf nginx-1.24.0.tar.gz
```

**进入nginx-1.24.0目录**

```shell
cd /nwa/linux/nginx-1.24.0
```

**执行配置脚本，--prefix是指定安装目录**

```shell
./configure --prefix=/nwa/linux/nginx --with-http_ssl_module --with-http_v2_module --with-http_gzip_static_module --with-stream
```

**编译安装**

```shell
make
make install
```

**启动/停止/重载nginx**

启动

```shell
/nwa/linux/nginx/sbin/nginx -c /nwa/linux/nginx/conf/nginx.conf
```

停止

```shell
/nwa/linux/nginx/sbin/nginx -s stop
```

重载

```shell
/nwa/linux/nginx/sbin/nginx -s reload
```

退出

```shell
/nwa/linux/nginx/sbin/nginx -s quit
```

**查询nginx是否启动**

```shell
ps -ef | grep nginx
```

配置映射的位置/nwa/linux/nginx/conf/nginx.conf

## 安装 SLL 证书（不包续）

先去阿里那把证书下载下来

https://yundun.console.aliyun.com/?spm=5176.swas-next_server-detail-legacy.top-nav.4.7c664ad8wasY0s&p=cas#/certExtend/free/cn-hangzhou

这里申请，记得把域名前缀也写上，几个项目就申请几个就行了，阿里不让白嫖通配符证书！，www、mypic、myui 开头的，把证书下载解压，pem 改 cer 后缀

终版的 nginx 配置

需要把前面安装的 nginx 删了，在把挂载到主机的 nginx 文件夹先改个名称

```shell
mkdir /nwa/nginx/html -p
mkdir /nwa/nginx/log -p
mkdir /nwa/nginx/cert -p
```

先运行一次容器（为了拷贝配置文件）

```shell
docker run -p 80:80 --name  nginx80   -v /mydata/nginx/html:/usr/share/nginx/html -v /mydata/nginx/logs:/var/log/nginx  -d nginx
```

```shell
docker container cp nginx80:/etc/nginx /nwa/nginx/           # 容器内的配置文件拷贝到指定目录
```

/nwa/nginx/ 目录下，修改文件名称，把nginx改为 conf

```shell
docker rm -f  nginx80                          移除
```

挂载这些目录

```shell
docker run -p 80:80 -p 443:443 --name nginx80  -v /nwa/nginx/html:/usr/share/nginx/html -v /nwa/nginx/logs:/var/log/nginx  -v /nwa/nginx/conf:/etc/nginx -v /nwa/nginx/cert:/etc/nginx/cert -d nginx
```

写配置文件/nwa/nginx/conf/conf.d 下

上传阿里那下载的nginx ssl证书，其中pem改crt后缀上传到/nwa/nginx/cert下，网站页面上传到/nwa/nginx/html下

```shell
docker exec -it nginx80 bash

nginx -t  会提示成功
nginx -s reload  再加载配置文件
```

https://luckynwa.top/ 成功！😀

```nginx
server {
    listen       80;
    listen  [::]:80;
    server_name  www.luckynwa.top;

    listen 443 ssl;    #表示监听443端口即https
    ssl_certificate /etc/nginx/cert/www.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/www.luckynwa.top.key;      #证书私钥文件路径
    ssl_session_timeout 5m;                                         #5分钟session会话保持
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;


    location / {
        root   /usr/share/nginx/html/myblog;
        index  index.html index.htm;
    }
    location /HomeAdmin {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://47.98.230.128:8081/HomeAdmin;  # 转发请求给 Tomcat 端口
    }
    location /HomeClient {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://47.98.230.128:8081/HomeClient;  # 转发请求给 Tomcat 端口
    }
    location /mypic {
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://47.98.230.128:3737/;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}


server {
    listen       80;
    listen  [::]:80;
    server_name  myui.luckynwa.top;

    listen 443 ssl;    #表示监听443端口即https
    ssl_certificate /etc/nginx/cert/myui.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/myui.luckynwa.top.key;      #证书私钥文件路径
    ssl_session_timeout 5m;                                         #5分钟session会话保持
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location / {
        root   /usr/share/nginx/html/myui;
        index  index.html index.htm;
    }


    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}


server {
    listen       80;
    listen  [::]:80;
    server_name  mypic.luckynwa.top;

    listen 443 ssl;    #表示监听443端口即https
    ssl_certificate /etc/nginx/cert/mypic.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/mypic.luckynwa.top.key;      #证书私钥文件路径
    ssl_session_timeout 5m;                                         #5分钟session会话保持
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location / {
        root   /usr/share/nginx/html/mypic;
        index  index.html index.htm;
    }
    location /api {
        proxy_pass http://47.98.230.128:3737/;
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

## 安装 SLL 证书（包续）

教程看这：https://httpsok.com/doc/course/deploy-to-nginx.html

```
curl -s https://get.httpsok.com/ | bash -s kTgrbof0dtuIdkIA28k7
```

结果

```shell
Nginx executable path: /nwa/linux/nginx/sbin/nginx
2025-11-05 10:00:59 Create directory /root/.httpsok success.
2025-11-05 10:00:59 Create directory /root/.httpsok/backups success.
2025-11-05 10:00:59 os-name: CentOS Linux 7 (Core)
2025-11-05 10:00:59 version: nginx/1.24.0
2025-11-05 10:00:59 nginx-config: /nwa/linux/nginx/conf/nginx.conf
2025-11-05 10:00:59 nginx-config-home: /nwa/linux/nginx/conf
2025-11-05 10:00:59 nginx-bin: /nwa/linux/nginx/sbin/nginx
2025-11-05 10:00:59 httpsok-uuid: 4E1F7BBB-DE8A-4EEB-B331-426DE5BD79B4

Httpsok make SSL easy.     https://httpsok.com/
version: 1.18.3
TraceID: 7fe07e61b9cddf19328004b67a5dc634

2025-11-05 10:01:00 save token kTgrbof0dtuIdkIA28k7 to /root/.httpsok/token
2025-11-05 10:01:00 Installing httpsok.
2025-11-05 10:01:00 Install httpsok complete.
no crontab for root
2025-11-05 10:01:00 Installing cron job.
no crontab for root
2025-11-05 10:01:00 Install cron job complete.
2025-11-05 10:01:00 Installing alias
2025-11-05 10:01:00 Found profile: /root/.bashrc
2025-11-05 10:01:00 Installing alias to '/root/.bashrc'
2025-11-05 10:01:00 OK, Close and reopen your terminal to start using httpsok
nginx: the configuration file /nwa/linux/nginx/conf/nginx.conf syntax is ok
nginx: configuration file /nwa/linux/nginx/conf/nginx.conf test is successful
2025-11-05 10:01:01 Checking SSL certificate, please wait a moment(证书检测中请稍等...).

2025-11-05 10:01:03 DNS check pass(DNS检查通过)
2025-11-05 10:01:04 1154164c445e4cea /nwa/nginx/cert/_.luckynwa.top.cer Cert valid(证书有效)
2025-11-05 10:01:04 701ef1feafeb439c /nwa/nginx/cert/_.luckynwa.top.cer Cert valid(证书有效)
2025-11-05 10:01:04 e82d750743c741b5 /nwa/nginx/cert/_.luckynwa.top.cer Cert valid(证书有效)
2025-11-05 10:01:05 fa510629e8594858 /nwa/nginx/cert/_.luckynwa.top.cer Cert valid(证书有效)
2025-11-05 10:01:05 ff1544d1ffb2437d /nwa/nginx/cert/_.luckynwa.top.cer Cert valid(证书有效)
2025-11-05 10:01:05 9c48019f41f242c3 /nwa/nginx/cert/_.luckynwa.top.cer Cert valid(证书有效)
2025-11-05 10:01:05 7d0261b41c3c4b37 /nwa/nginx/cert/_.luckynwa.top.cer Cert valid(证书有效)

2025-11-05 10:01:05 Nginx reload needless(无需重载).
```

https://httpsok.com/console/deploy

## 备份

### NG配置（旧）

首先在一个 nginx 上，这个监控着 80 端口，其次需要有域名

域名有 1 级、2 级

比如 luckynwa.top 和头部加入 www 都是指向一个位置，这是 1 级

把 www 改成别的，就是二级域名，每个 serve 都是一个服务

配置ng80，证书配置也可以参考，80配置了证书和代理，然后91那查看具体文件位置

```nginx
server {
    listen       80;
    listen  [::]:80;
    server_name  www.luckynwa.top;
    charset utf-8;
    listen 443 ssl;    #表示监听443端口即https
    ssl_certificate /etc/nginx/cert/www.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/www.luckynwa.top.key;      #证书私钥文件路径
    ssl_session_timeout 5m;                                         #5分钟session会话保持
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://106.53.76.173;  # 新增的反向代理层
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

}

server {
    listen       80;
    listen  [::]:80;
    server_name  myui.luckynwa.top;
    listen 443 ssl;    #表示监听443端口即https
    ssl_certificate /etc/nginx/cert/myui.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/myui.luckynwa.top.key;      #证书私钥文件路径
    ssl_session_timeout 5m;                                         #5分钟session会话保持
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://106.53.76.173;  # 新增的反向代理层
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

server {
    listen       80;
    listen  [::]:80;
    server_name  mytool.luckynwa.top;
    listen 443 ssl;    #表示监听443端口即https
    ssl_certificate /etc/nginx/cert/mytool.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/mytool.luckynwa.top.key;      #证书私钥文件路径
    ssl_session_timeout 5m;                                         #5分钟session会话保持
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://106.53.76.173;  # 新增的反向代理层
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

}

server {
    listen       80;
    listen  [::]:80;
    server_name  myvue.luckynwa.top;
    listen 443 ssl;    #表示监听443端口即https
    ssl_certificate /etc/nginx/cert/myvue.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/myvue.luckynwa.top.key;      #证书私钥文件路径
    ssl_session_timeout 5m;                                         #5分钟session会话保持
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://106.53.76.173;  # 新增的反向代理层
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

}
server {
    listen       80;
    listen  [::]:80;
    server_name  mypic.luckynwa.top;
    listen 443 ssl;    #表示监听443端口即https
    ssl_certificate /etc/nginx/cert/mypic.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/mypic.luckynwa.top.key;      #证书私钥文件路径
    ssl_session_timeout 5m;                                         #5分钟session会话保持
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location /proxyApi {
        proxy_pass http://106.53.76.173:10086/luckyAdmin/;  #人人上传需要走的代理

    }

    location / {
        proxy_pass http://IP:9091;  # 新增的反向代理层
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

}


server {
    listen  443 ssl;
    server_name  twikoo.luckynwa.top;

    ssl_certificate /etc/nginx/cert/twikoo.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/twikoo.luckynwa.top.key;      #证书私钥文件路径

    # ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;

    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers  HIGH:!ADH:!EXPORT56:RC4+RSA:+MEDIUM;
    ssl_prefer_server_ciphers  on;

    location / {
        proxy_pass http://IP:3737;#建议这种写法，和主域名保持一致
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

}

server {
    listen       80;
    listen  [::]:80;
    server_name  imgs.luckynwa.top;
    charset utf-8;
    listen  443 ssl;
    ssl_certificate /etc/nginx/cert/imgs.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/imgs.luckynwa.top.key;      #证书私钥文件路径

    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location /{
        charset utf-8;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://106.53.76.173:10086/luckyAdmin/;
    }
}

server {
    listen       80;
    listen  [::]:80;
    server_name  gpt.luckynwa.top;
    charset utf-8;
    listen  443 ssl;
    ssl_certificate /etc/nginx/cert/gpt.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/gpt.luckynwa.top.key;      #证书私钥文件路径

    # ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;

    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers  HIGH:!ADH:!EXPORT56:RC4+RSA:+MEDIUM;
    ssl_prefer_server_ciphers  on;

    location / {
        proxy_pass http://IP:18080/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

}

```

ng91

```nginx
server {
    listen       80;
    listen  [::]:80;
    server_name  www.luckynwa.top;
    charset utf-8;

    location / {
        root   /usr/share/nginx/html/myblog;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}

server {
    listen       80;
    listen  [::]:80;
    server_name  mypic.luckynwa.top;
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";
    client_max_body_size 100M;


    location / {
        root   /usr/share/nginx/html/mypic;
        try_files $uri $uri/ /index.html;
        index  index.html index.gz;
    }


    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}

server {
    listen       80;
    listen  [::]:80;
    server_name  myui.luckynwa.top;

    location / {
        root   /usr/share/nginx/html/myui;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}


server {
    listen       80;
    listen  [::]:80;
    server_name  mytool.luckynwa.top;
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";
    client_max_body_size 100M;

    location / {
        root   /usr/share/nginx/html/mytool;
        index  index.html index.htm;

    }
  #解决带基础路径的问题
   location /lucky-tools/ {
		  	  rewrite ^/lucky-tools/(.*)$ /$1 break;
   			 root  /usr/share/nginx/html/mytool;
  		 	 try_files $uri $uri/ /index.html;
   }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}

server {
    listen       80;
    listen  [::]:80;
    server_name  myvue.luckynwa.top;
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";
    client_max_body_size 100M;

    location / {
        root   /usr/share/nginx/html/myvue;
        index  index.html index.htm;

    }
  #解决带基础路径的问题
   location /lucky-vue/ {
		  	  rewrite ^/lucky-vue/(.*)$ /$1 break;
   			 root  /usr/share/nginx/html/myvue;
  		 	 try_files $uri $uri/ /index.html;
   }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}


```

使用单个ng80

```nginx
server {
    listen       80;
    listen  [::]:80;
    server_name  www.luckynwa.top;
    charset utf-8;
    listen 443 ssl;    #表示监听443端口即https
    ssl_certificate /etc/nginx/cert/www.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/www.luckynwa.top.key;      #证书私钥文件路径
    ssl_session_timeout 5m;                                         #5分钟session会话保持
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location / {
        root   /usr/share/nginx/html/blog;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}

server {
    listen       80;
    listen  [::]:80;
    server_name  admin.luckynwa.top;
    listen 443 ssl;    #表示监听443端口即https
    ssl_certificate /etc/nginx/cert/admin.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/admin.luckynwa.top.key;      #证书私钥文件路径
    ssl_session_timeout 5m;                                         #5分钟session会话保持
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";
    client_max_body_size 100M;
    location /proxyApi {
        proxy_pass http://IP:10086/luckyAdmin/;  #人人上传需要走的代理

    }

    location / {
        root   /usr/share/nginx/html/admin;
        try_files $uri $uri/ /index.html;
        index  index.html index.gz;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}

server {
    listen       80;
    listen  [::]:80;
    server_name  myvue.luckynwa.top;
    listen 443 ssl;    #表示监听443端口即https
    ssl_certificate /etc/nginx/cert/myvue.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/myvue.luckynwa.top.key;      #证书私钥文件路径
    ssl_session_timeout 5m;                                         #5分钟session会话保持
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";
    client_max_body_size 100M;
    location / {
        root   /usr/share/nginx/html/myvue;
        index  index.html index.htm;
    }
    #解决带基础路径的问题
    location /lucky-vue/ {
		  	 rewrite ^/lucky-vue/(.*)$ /$1 break;
   			 root  /usr/share/nginx/html/myvue;
  		 	 try_files $uri $uri/ /index.html;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}

server {
    listen       80;
    listen  [::]:80;
    server_name  mytool.luckynwa.top;
    listen 443 ssl;    #表示监听443端口即https
    ssl_certificate /etc/nginx/cert/mytool.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/mytool.luckynwa.top.key;      #证书私钥文件路径
    ssl_session_timeout 5m;                                         #5分钟session会话保持
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";
    client_max_body_size 100M;
    location / {
        root   /usr/share/nginx/html/mytool;
        index  index.html index.htm;
    }
    #解决带基础路径的问题
    location /lucky-tools/ {
		  	 rewrite ^/lucky-tools/(.*)$ /$1 break;
   			 root  /usr/share/nginx/html/mytool;
  		 	 try_files $uri $uri/ /index.html;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}


server {
    listen       80;
    listen  [::]:80;
    server_name  imgs.luckynwa.top;
    charset utf-8;
    listen  443 ssl;
    ssl_certificate /etc/nginx/cert/imgs.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/imgs.luckynwa.top.key;      #证书私钥文件路径

    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location /{
        charset utf-8;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://IP:10086/luckyAdmin/;
    }
}


server {
    listen       80;
    listen  [::]:80;
    server_name  maxkb.luckynwa.top;
    charset utf-8;
    listen  443 ssl;
    ssl_certificate /etc/nginx/cert/maxkb.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/maxkb.luckynwa.top.key;      #证书私钥文件路径

    # ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;

    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers  HIGH:!ADH:!EXPORT56:RC4+RSA:+MEDIUM;
    ssl_prefer_server_ciphers  on;

    location / {
        proxy_pass http://IP:18080/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

}
```

参考

```nginx
limit_req_zone $binary_remote_addr zone=test:10m rate=70r/s;  #限流

server {
    listen       80;
    listen  [::]:80;
    server_name  www.luckynwa.top;
    charset utf-8;
    listen 443 ssl;    #表示监听443端口即https
    ssl_certificate /etc/nginx/cert/www.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/www.luckynwa.top.key;      #证书私钥文件路径
    ssl_session_timeout 5m;                                         #5分钟session会话保持
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    limit_rate 512k;

    location / {
 	limit_req zone=test burst=70 nodelay;
        root   /usr/share/nginx/html/myblog;
        index  index.html index.htm;
    }

    location /mypic {                   #静态资源根目录
	charset utf-8;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://47.98.230.128:10086/luckyAdmin/;  
    }
    location /staticLucky {            #部署项目的cdn加速的目录
        proxy_pass http://47.98.230.128:10086/luckyAdmin/cdnFolder;
	}
    location /proxyApi {              #后端接口
        proxy_pass http://47.98.230.128:10086/luckyAdmin/;
	}
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}

server {
    listen       80;
    listen  [::]:80;
    server_name  myui.luckynwa.top;

    listen 443 ssl;    #表示监听443端口即https
    ssl_certificate /etc/nginx/cert/myui.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/myui.luckynwa.top.key;      #证书私钥文件路径
    ssl_session_timeout 5m;                                         #5分钟session会话保持
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location / {
        root   /usr/share/nginx/html/myui;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}


  
server {
    listen       80;
    listen  [::]:80;
    server_name  mypic.luckynwa.top;                    
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";
    client_max_body_size 100M;
    listen 443 ssl;    #表示监听443端口即https
    ssl_certificate /etc/nginx/cert/mypic.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/mypic.luckynwa.top.key;      #证书私钥文件路径
    ssl_session_timeout 5m;                                         #5分钟session会话保持
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location / {
        root   /usr/share/nginx/html/mypic;
        index  index.html index.htm;
    }   

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}

server {
    listen       80;
    listen  [::]:80;
    server_name  mycode.luckynwa.top;

    listen 443 ssl;    #表示监听443端口即https
    ssl_certificate /etc/nginx/cert/mycode.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/mycode.luckynwa.top.key;      #证书私钥文件路径
    ssl_session_timeout 5m;                                         #5分钟session会话保持
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://47.98.230.128:10087/index.html;
    }

    location /js {
        proxy_pass http://47.98.230.128:10087/js;
    }
    location /css {
        proxy_pass http://47.98.230.128:10087/css;
    }
    location /fonts {
        proxy_pass http://47.98.230.128:10087/fonts;
    }
    location /plugins {
        proxy_pass http://47.98.230.128:10087/plugins;
    }
    location /libs {
        proxy_pass http://47.98.230.128:10087/libs;
    }
    location /favicon.ico {
        proxy_pass http://47.98.230.128:10087/favicon.ico;
    }

    location /generator.html {
        proxy_pass http://47.98.230.128:10087/generator.html;
    }
    location /main.html {
        proxy_pass http://47.98.230.128:10087/main.html;
    }
    location /sys/generator {
        proxy_pass http://47.98.230.128:10087/sys/generator;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

### NG配置（雷池）

(1)用户---->ng1 80---->雷池--->ng2 9091---->成功访问 （以前用的这个）

(2)用户---->雷池--->ng1 80---->成功访问   域名要解析到雷池的地址

(3)用户---->cloudflare--->ng--->成功访问   域名要解析到cloudflare  （使用中）

创建目录结构

```bash
mkdir /nwa/nginx91/html -p
mkdir /nwa/nginx91/log -p
mkdir /nwa/nginx91/cert -p
```

运行临时容器拷贝配置

先运行一次容器（为了拷贝配置文件）

```bash
docker run --name nginx91 -p 9091:80 -d nginx
```

复制nginx容器内的配置到挂载目录

```bash
docker cp nginx91:/etc/nginx/ /nwa/nginx91/
docker cp nginx91:/usr/share/nginx/html /nwa/nginx91
docker cp nginx91:/var/log/nginx /nwa/nginx91/log
```

安装新的nginx并挂载配置

```bash
docker run --name nginx80 -p 80:80 -v /nwa/nginx/html:/usr/share/nginx/html -v /nwa/nginx/nginx/nginx.conf:/etc/nginx/nginx.conf -v /nwa/nginx/nginx/conf.d:/etc/nginx/conf.d -d nginx
```

修改目录结构

/nwa/nginx91/ 目录下，修改文件名称，把nginx改为 conf

```bash
docker rm -f nginx91
```

挂载目录启动容器

```bash
docker run -p 9091:80 --name nginx91 -v /nwa/nginx91/html:/usr/share/nginx/html -v /nwa/nginx91/logs:/var/log/nginx -v /nwa/nginx91/conf:/etc/nginx -v /nwa/nginx91/cert:/etc/nginx/cert -d nginx
```

进入容器验证

```bash
docker exec -it nginx80 bash
docker exec -it nginx91 bash
```

测试并重载配置

```bash
nginx -t
nginx -s reload
```

**ng1 80**

```nginx
server {
    listen       80;
    listen  [::]:80;
    server_name  www.luckynwa.top;
    charset utf-8;
    listen 443 ssl;    #表示监听443端口即https
    ssl_certificate /etc/nginx/cert/www.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/www.luckynwa.top.key;      #证书私钥文件路径
    ssl_session_timeout 5m;                                         #5分钟session会话保持
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://106.53.76.173;  # 新增的反向代理层
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

}

server {
    listen       80;
    listen  [::]:80;
    server_name  myui.luckynwa.top;
    listen 443 ssl;    #表示监听443端口即https
    ssl_certificate /etc/nginx/cert/myui.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/myui.luckynwa.top.key;      #证书私钥文件路径
    ssl_session_timeout 5m;                                         #5分钟session会话保持
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://106.53.76.173;  # 新增的反向代理层
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}

server {
    listen       80;
    listen  [::]:80;
    server_name  mytool.luckynwa.top;
    listen 443 ssl;    #表示监听443端口即https
    ssl_certificate /etc/nginx/cert/mytool.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/mytool.luckynwa.top.key;      #证书私钥文件路径
    ssl_session_timeout 5m;                                         #5分钟session会话保持
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://106.53.76.173;  # 新增的反向代理层
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

}
  
server {
    listen       80;
    listen  [::]:80;
    server_name  myvue.luckynwa.top;
    listen 443 ssl;    #表示监听443端口即https
    ssl_certificate /etc/nginx/cert/myvue.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/myvue.luckynwa.top.key;      #证书私钥文件路径
    ssl_session_timeout 5m;                                         #5分钟session会话保持
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://106.53.76.173;  # 新增的反向代理层
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

}
server {
    listen       80;
    listen  [::]:80;
    server_name  mypic.luckynwa.top;                    
    listen 443 ssl;    #表示监听443端口即https
    ssl_certificate /etc/nginx/cert/mypic.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/mypic.luckynwa.top.key;      #证书私钥文件路径
    ssl_session_timeout 5m;                                         #5分钟session会话保持
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location /proxyApi {
        proxy_pass http://106.53.76.173:10086/luckyAdmin/;  #人人上传需要走的代理

    }

    location / {
        proxy_pass http://106.53.76.173;  # 新增的反向代理层
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

}

server {
    listen       80;
    listen  [::]:80;
    server_name  mycode.luckynwa.top;
    listen 443 ssl;    #表示监听443端口即https
    ssl_certificate /etc/nginx/cert/mycode.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/mycode.luckynwa.top.key;      #证书私钥文件路径
    ssl_session_timeout 5m;                                         #5分钟session会话保持
    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://106.53.76.173;  # 新增的反向代理层
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

}

server {
    listen  443 ssl;
    server_name  twikoo.luckynwa.top;

    ssl_certificate /etc/nginx/cert/twikoo.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/twikoo.luckynwa.top.key;      #证书私钥文件路径

    # ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    
    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers  HIGH:!ADH:!EXPORT56:RC4+RSA:+MEDIUM;
    ssl_prefer_server_ciphers  on;

    location / {
        proxy_pass http://47.98.230.128:3737;#建议这种写法，和主域名保持一致
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
        
}

server {
    listen       80;
    listen  [::]:80;
    server_name  imgs.luckynwa.top;
    charset utf-8;
    listen  443 ssl;
    ssl_certificate /etc/nginx/cert/imgs.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/imgs.luckynwa.top.key;      #证书私钥文件路径

    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location /{
        charset utf-8;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://106.53.76.173:10086/luckyAdmin/;  
    }     
}

server {
    listen       80;
    listen  [::]:80;
    server_name  gpt.luckynwa.top;
    charset utf-8;
    listen  443 ssl;
    ssl_certificate /etc/nginx/cert/gpt.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/gpt.luckynwa.top.key;      #证书私钥文件路径

    # ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    
    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers  HIGH:!ADH:!EXPORT56:RC4+RSA:+MEDIUM;
    ssl_prefer_server_ciphers  on;

    location / {
        proxy_pass http://47.98.230.128:18080/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
        
}
```

**ng9091**

```nginx

server {
    listen       80;
    listen  [::]:80;
    server_name  www.luckynwa.top;
    charset utf-8;

    location / {
        root   /usr/share/nginx/html/myblog;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}

server {
    listen       80;
    listen  [::]:80;
    server_name  mypic.luckynwa.top;                    
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";
    client_max_body_size 100M;


    location / {
        root   /usr/share/nginx/html/mypic;
        index  index.html index.htm;
    }   


    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

}

server {
    listen       80;
    listen  [::]:80;
    server_name  myui.luckynwa.top;

    location / {
        root   /usr/share/nginx/html/myui;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}


server {
    listen       80;
    listen  [::]:80;
    server_name  mytool.luckynwa.top;
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";
    client_max_body_size 100M;

    location / {
        root   /usr/share/nginx/html/mytool;
        index  index.html index.htm;

    }
  #解决带基础路径的问题
   location /lucky-tools/ {
		  	  rewrite ^/lucky-tools/(.*)$ /$1 break;
   			 root  /usr/share/nginx/html/mytool;
  		 	 try_files $uri $uri/ /index.html;
   }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
  
server {
    listen       80;
    listen  [::]:80;
    server_name  myvue.luckynwa.top;
    gzip on;
    gzip_min_length 1k;
    gzip_comp_level 9;
    gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";
    client_max_body_size 100M;

    location / {
        root   /usr/share/nginx/html/myvue;
        index  index.html index.htm;

    }
  #解决带基础路径的问题
   location /lucky-vue/ {
		  	  rewrite ^/lucky-vue/(.*)$ /$1 break;
   			 root  /usr/share/nginx/html/myvue;
  		 	 try_files $uri $uri/ /index.html;
   }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}


server {
    listen       80;
    listen  [::]:80;
    server_name  mycode.luckynwa.top;

    location / {
        proxy_pass http://47.98.230.128:10087/index.html;
    }

    location /js {
        proxy_pass http://47.98.230.128:10087/js;
    }
    location /css {
        proxy_pass http://47.98.230.128:10087/css;
    }
    location /fonts {
        proxy_pass http://47.98.230.128:10087/fonts;
    }
    location /plugins {
        proxy_pass http://47.98.230.128:10087/plugins;
    }
    location /libs {
        proxy_pass http://47.98.230.128:10087/libs;
    }
    location /favicon.ico {
        proxy_pass http://47.98.230.128:10087/favicon.ico;
    }

    location /generator.html {
        proxy_pass http://47.98.230.128:10087/generator.html;
    }
    location /main.html {
        proxy_pass http://47.98.230.128:10087/main.html;
    }
    location /sys/generator {
        proxy_pass http://47.98.230.128:10087/sys/generator;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

### NG配置（新）

linux下的ng配置，做了自动续费域名

```nginx
user  nobody;
worker_processes  1;

events {
    worker_connections 1024;
}

http {
    include       mime.types;
    default_type  application/octet-stream;

    sendfile        on;
    keepalive_timeout 65;

    # ========================
    # 🚀 GZIP 全局优化版（只保留一份）
    # ========================
    gzip on;

    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_min_length 1k;

    gzip_types
        text/plain
        text/css
        text/javascript
        application/javascript
        application/json
        application/xml
        application/xml+rss
        application/x-javascript
        application/x-httpd-php
        image/svg+xml
        font/opentype
        application/x-font-ttf;

    gzip_disable "MSIE [1-6]\.";

    # ========================
    # 日志
    # ========================
    access_log  /nwa/linux/nginx/logs/access.log;
    error_log   /nwa/linux/nginx/logs/error.log;

    # ========================
    # HTTP -> HTTPS
    # ========================
    server {
        listen 80;
        listen [::]:80;
        server_name www.luckynwa.top blog.luckynwa.top admin.luckynwa.top admin17.luckynwa.top vue.luckynwa.top tool.luckynwa.top imgs.luckynwa.top busuanzi.luckynwa.top;

        location / {
            return 301 https://$host$request_uri;
        }
    }

    # ========================
    # www → index 目录
    # ========================
    server {
        listen 443 ssl;
        server_name www.luckynwa.top;

        ssl_certificate     /nwa/nginx/cert/_.luckynwa.top.cer;
        ssl_certificate_key /nwa/nginx/cert/_.luckynwa.top.key;

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers on;

        location / {
            root /nwa/nginx/html/index;
            index index.html index.htm;
            try_files $uri $uri/ /index.html;
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root /usr/share/nginx/html;
        }
    }

    # ========================
    # blog.luckynwa.top
    # ========================
    server {
        listen 443 ssl;
        server_name blog.luckynwa.top;

        ssl_certificate     /nwa/nginx/cert/_.luckynwa.top.cer;
        ssl_certificate_key /nwa/nginx/cert/_.luckynwa.top.key;

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers on;

        location / {
            root /nwa/nginx/html/blog;
            index index.html index.htm;
            try_files $uri $uri/ /index.html;
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root /usr/share/nginx/html;
        }
    }

    # ========================
    # admin
    # ========================
    server {
        listen 443 ssl;
        server_name admin.luckynwa.top;

        ssl_certificate     /nwa/nginx/cert/_.luckynwa.top.cer;
        ssl_certificate_key /nwa/nginx/cert/_.luckynwa.top.key;

        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers on;

        client_max_body_size 100M;

        location /proxyApi {
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_pass https://IP:10086/luckyAdmin;
        }

        location /admin-api {
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_pass http://IP:48080/admin-api;
        }

        location / {
            root /nwa/nginx/html/admin;
            try_files $uri $uri/ /index.html;
            index index.html;
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
            root /usr/share/nginx/html;
        }
    }

    # ========================
    # admin17
    # ========================
    server {
        listen 443 ssl;
        server_name admin17.luckynwa.top;

        ssl_certificate     /nwa/nginx/cert/_.luckynwa.top.cer;
        ssl_certificate_key /nwa/nginx/cert/_.luckynwa.top.key;

        client_max_body_size 100M;

        location /admin-api {
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_pass http://IP:48080/admin-api;
        }

        location / {
            root /nwa/nginx/html/admin17;
            try_files $uri $uri/ /index.html;
            index index.html;
        }
    }

    # ========================
    # vue
    # ========================
    server {
        listen 443 ssl;
        server_name vue.luckynwa.top;

        ssl_certificate     /nwa/nginx/cert/_.luckynwa.top.cer;
        ssl_certificate_key /nwa/nginx/cert/_.luckynwa.top.key;

        client_max_body_size 100M;

        location / {
            root /nwa/nginx/html/myvue;
            index index.html;
        }

        location /lucky-vue/ {
            rewrite ^/lucky-vue/(.*)$ /$1 break;
            root /nwa/nginx/html/myvue;
            try_files $uri $uri/ /index.html;
        }
    }

    # ========================
    # tool
    # ========================
    server {
        listen 443 ssl;
        server_name tool.luckynwa.top;

        ssl_certificate     /nwa/nginx/cert/_.luckynwa.top.cer;
        ssl_certificate_key /nwa/nginx/cert/_.luckynwa.top.key;

        client_max_body_size 100M;

        location / {
            root /nwa/nginx/html/mytool;
            index index.html;
        }

        location /lucky-tools/ {
            rewrite ^/lucky-tools/(.*)$ /$1 break;
            root /nwa/nginx/html/mytool;
            try_files $uri $uri/ /index.html;
        }
    }

    # ========================
    # imgs 代理
    # ========================
    server {
        listen 443 ssl;
        server_name imgs.luckynwa.top;

        ssl_certificate     /nwa/nginx/cert/_.luckynwa.top.cer;
        ssl_certificate_key /nwa/nginx/cert/_.luckynwa.top.key;

        location / {
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_pass https://IP:10086/luckyAdmin/;
        }
    }

    # ========================
    # busuanzi
    # ========================
    server {
        listen 443 ssl;
        server_name busuanzi.luckynwa.top;

        ssl_certificate     /nwa/nginx/cert/_.luckynwa.top.cer;
        ssl_certificate_key /nwa/nginx/cert/_.luckynwa.top.key;

        location / {
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_pass http://IP:28080/;
        }

        location /api/api {
            proxy_pass http://IP:28080/api;
        }
    }
    # ========================
    # rag
    # ========================
    server {
        listen 443 ssl;
        server_name rag.luckynwa.top;

        ssl_certificate     /nwa/nginx/cert/_.luckynwa.top.cer;
        ssl_certificate_key /nwa/nginx/cert/_.luckynwa.top.key;

        location /api {
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_pass http://IP:18000;
        }

        location / {
            root /nwa/nginx/html/rag;
            try_files $uri $uri/ /index.html;
            index index.html;
        }
    }
}

```

## 运维

```shell
/nwa/linux/nginx/sbin/nginx -s reload
```
