---
title: Twikoo 评论系统搭建：Docker 与 Vercel+MongoDB 两种方案
cover: https://imgs.luckynwa.top/openApi/lucky/yys/364
description: 使用 Docker 部署 Twikoo 评论系统，配置 Nginx 反向代理与邮箱通知
categories: 网站搭建
tags: Twikoo
comments: true
abbrlink: tool839
summary: >-
  本文介绍 Twikoo 评论系统的两种部署方案：Docker 部署需通过阿里云代理拉取镜像，配合 Nginx 反向代理解决跨域问题，并配置 X-Real-IP 获取访客位置；Vercel + MongoDB 方案只需在 MongoDB Cloud 创建数据库，复制连接字符串填入 Vercel 环境变量即可一键部署，国内访问需配置自定义域名。此外还介绍了 QQ 邮箱 SMTP 通知的开启方法。
date: 2022-01-01 11:22:21
---

# Docker部署

```shell
docker run --name twikoo \
  -e TWIKOO_THROTTLE=1000 \
  -p 3737:8080 \
  -v ${PWD}/data:/app/data \
  -d registry.cn-hangzhou.aliyuncs.com/lucky-warehouse/twikoo
```

博客主题配置中修改如下：

```yaml
twikoo:
  envId: http://xxxxxx:3737/
  region:
  visitor: true
  option:
```

`use` 也选它，上面连接去浏览器输入有东西出来就配置好了。

## Nginx 反向代理

必须申请一个二级域名，不然会出现跨域情况。

`twikoo.luckynwa.top` 的 Nginx 配置如下（必须带上 IP，不然 tw 设置无法查看访问者具体位置）：

```nginx
server {
    listen  443 ssl;
    server_name  twikoo.luckynwa.top;

    ssl_certificate /etc/nginx/cert/twikoo.luckynwa.top.cer;
    ssl_certificate_key /etc/nginx/cert/twikoo.luckynwa.top.key;

    ssl_session_timeout  5m;

    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers  HIGH:!ADH:!EXPORT56:RC4+RSA:+MEDIUM;
    ssl_prefer_server_ciphers  on;

    location / {
        proxy_pass http://xxxxxx:3737;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```



# Vercel+MongoDB部署（使用中）

打开https://cloud.mongodb.com/注册并登录

使用n165.. gmail的谷歌账号登录

1. 点左侧 **Database Access**，添加一个数据库用户（设好用户名和密码）
2. 点左侧 **Network Access**，添加 IP 为 `0.0.0.0/0`（允许所有 IP 访问）
3. 回到 **Database** 页面，点击你的集群 -> **Connect** -> **Connect your application**
4. 复制下面，替换密码

```
mongodb+srv://n1656213092:第二步设的密码@cluster0.5x5rf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

打开我的GitHub的这个仓库，https://github.com/luckyNwa6/twikoo，Fork这仓库

点击以下链接将Twikoo一键部署到Vercel：

https://vercel.com/import/project?template=https://github.com/imaegoo/twikoo/tree/main/src/server/vercel-min

进入`Settings - Environment Variables`页面。
新建一个NAME为`MONGODB_URI`;VALUE为`复制里的信息`

进入`Deployments`界面，点击右边的竖三点，点击`Redeploy`

提示 100 运行正常就可以了，得配置域名国内才能访问

![image-20260705200259539](https://imgs.luckynwa.top/profile/2026/07/05/image-20260705200259539_20260705200301A036.png)

# 邮箱通知

控制面板在项目中的留言区，可以设置各种功能，比如留言时 QQ 邮箱通知提醒

默认在--昵称--输入admin 展示这个设置 现在昵称这个LuckyNwa 展示设置，密7...

![image-20260705191529997](https://imgs.luckynwa.top/profile/2026/07/05/image-20260705191529997_20260705191531A035.png)

QQ 邮箱开启 SMTP 服务，授权码记得保存，配置到控制面板中即可。

默认twikoo数据文件会在/root/data中 db0.json是评论信息 其他是系统配置的json
