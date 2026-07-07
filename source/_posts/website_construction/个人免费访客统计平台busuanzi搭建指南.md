---
title: 个人免费访客统计平台busuanzi搭建指南
cover: https://cloud.luckynwa.top/profile/yys/364.webp
description: 不积跬步，无以至千里
categories: 网站搭建
tags: Docker
comments: true
abbrlink: tool224
summary: >-
  busuanzi是一款轻量级的访客统计工具，本文介绍如何在服务器上搭建个人专属的busuanzi统计平台。通过Docker Compose部署Redis和busuanzi服务，配合Nginx反向代理实现域名访问。文章详细说明了Nginx的SSL证书配置、Docker容器编排配置以及相关环境变量的设置，最后给出了Hexo主题中集成busuanzi统计代码的方法，帮助博主快速搭建属于自己的访客统计系统。
date: 2025-01-01 11:22:21
---

## NG配置

```nginx
server {
    listen       80;
    listen  [::]:80;
    server_name  busuanzi.luckynwa.top;
    charset utf-8;
    listen  443 ssl;
    ssl_certificate /etc/nginx/cert/busuanzi.luckynwa.top.cer;   #证书文件路径
    ssl_certificate_key /etc/nginx/cert/busuanzi.luckynwa.top.key;      #证书私钥文件路径

    #请按照以下协议配置
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location /{
        charset utf-8;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://120.26.80.35:28080/;
    }
        location /api/api{
        charset utf-8;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://ip:28080/api;
    }
}
```

## Docker Compose配置

/nwa/busuanzi/docker-compose.yaml 新建它 28080端口开发

```yaml
version: '3.8'

services:
  redis:
    image: 'registry.cn-hangzhou.aliyuncs.com/lucky-warehouse/redis:alpine'
    volumes:
      - ./data/redis:/data

  bsz:
    image: 'registry.cn-hangzhou.aliyuncs.com/lucky-warehouse/busuanzi:v2.8.10'
    ports:
      - '28080:8080' # 修改映射到宿主机的端口 host:container
    volumes:
      - ./data/bsz:/app/expose
    links:
      - redis
    depends_on:
      - redis
    environment:
      WEB_LOG: true # 是否开启日志
      WEB_DEBUG: false # 是否开启debug模式
      WEB_CORS: '*' # 跨域访问
      BSZ_EXPIRE: 0 # 统计数据过期时间 单位秒, 请输入整数 (无任何访问, 超过这个时间后, 统计数据将被清空, 0为不过期)
      BSZ_SECRET: 'bsz' # 签名密钥 // 请设置为任意长度的随机值
      API_SERVER: https:\/\/busuanzi.luckynwa.top\/api # 填写你的 API 地址 需要转译 (即 用 `\/` 替代 `/`)
      REDIS_ADDRESS: redis:6379 # redis 地址
      BSZ_PATHSTYLE: true
      BSZ_ENCRYPT: MD516
```

## 启动服务

去shell那安装它

```shell
cd /nwa/busuanzi

docker-compose up -d
```

## Hexo主题集成

参考api https://gitee.com/soxft/busuanzi/wikis/api

搜

```
          default
            if theme.busuanzi.page_pv
              +pvBlock('','post-meta-pv-cv','')
                span#busuanzi_value_page_pv
      else if theme.busuanzi.page_pv
        +pvBlock('','post-meta-pv-cv','')
          span#busuanzi_value_page_pv

         去除_value

         .item-count#busuanzi_value_site_uv   也是
```
