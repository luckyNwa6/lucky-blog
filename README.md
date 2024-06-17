# Hexo 项目

## 🐑 使用

Yarn 1.22.4 管理依赖包

Node 16.20.1

GitHub clone 项目后：

去 package 中删除 hexo-all-minifier 这个依赖

```shell
yarn
```

按下 F5 运行成功,ctrl +c 退出

```shell
yarn add hexo-all-minifier@0.5.7
```

F5 启动

重装依赖步骤如下:

删除 node 包

```shell
npm install -g rimraf

npm run clean
```

再删除 yarn.lock

去 package 中删除 hexo-all-minifier 这个依赖

安装依赖包并启动

```shell
yarn

yarn serve
```

运行完 ctrl +c 退出

最后装它（资源压缩）并启动

```shell
yarn add hexo-all-minifier@0.5.7

npm run dev
```

## 🚀Bug

部署到服务器文档密码有问题

```shell
yarn add hexo-blog-encrypt@3.1.9
```
