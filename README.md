# 博客

## 🐑 分支

main-------->Heox（框架）+ButterFly（主题）+Valine（评论）简单配置实现的博客站 v1

lucky-------->Heox（框架）+Acryple（主题）+Twikoo（私部署评论） 博客站 V2 基于[大佬的开源项目](https://github.com/LYXOfficial/Hexo-theme-Acryple)进行 2 次配置开发 [大佬地址](https://blog.yaria.top/)

lucky-------->Heox（框架）+安知鱼（主题） [文档](https://docs.anheyu.com/initall.html)

## 🐶 开发环境

node 16 | 18

包管理采用 yarn | npm

## 🐯 提交规范

代码提交，严格按照如下规范:

| 类型     | 描述                     |
| -------- | ------------------------ |
| feat     | 新功能                   |
| fix      | 修补 bug                 |
| docs     | 文档                     |
| style    | 格式方面的优化           |
| refactor | 重构                     |
| test     | 测试                     |
| chore    | 构建过程或辅助工具的变动 |

比如修复一个 bug 必须是

fix: 修复 bug

中间有:后面有空格

## 🚀 注意事项

**博客 v1**

拉取---去 package 中删除 hexo-all-minifier 这个依赖

```
yarn
```

按下 F5 启动项目 ctrl +c 退出

```
yarn add hexo-all-minifier@0.5.7
```

删除 node 包

```
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

**博客 v2**

可能需要装 hexo

```shell
hexo version   爆红就是缺少

npm install hexo-cli -g
```

## ⭐️ 部署

- 博客 v1 部署了多份

  （1）首先是本地开发时候直接将打包后的文件上传到 GitHub 上直接部署，防止源码泄露 https://luckynwa6.github.io

  （2）开源部署，当前项目直接上传到 Github 上，通过 Action 自动化部署 https://luckynwa6.github.io/lucky-blog/

  （3）[Vercle](https://vercel.com/luckynwa6s-projects)部署，通过导入 Github 中的项目去部署 https://lucky-blog.vercel.app/
  而且只要 GitHub 代码改变他也会自动更新

- 博客 v2 只部署了 1 份 , 由于部署到 Github 上/后面多一个名称，就算了

  通过 Github 的 Action，CICD 直接部署到了我自己的私有云服务器中 https://luckynwa.top
