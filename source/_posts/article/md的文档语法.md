---
title: Typora常用语法
description: Markerdown使用相关的学习笔记
cover: https://imgs.luckynwa.top/profile/blog/markerDownIcon.png
categories: 文档
tags: Typora
abbrlink: 2645
comments: true
summary: >-
  启动小维AI摘要模块⚡……运算完成！这篇文章介绍了Typora这款Markdown编辑器的常用语法，包括文本格式设置如加粗、倾斜及加粗斜体的实现方式，通过星号或下划线组合输入或使用快捷键Ctrl+B和Ctrl-I快速操作；支持直接拖入图片展示及通过链接地址插入网络图片，也讲解了如何创建可点击跳转的超链接并支持Ctrl+点击跳转功能；详细说明了代码区域的插入方法，使用三个反引号加语言类型标识实现代码高亮；列举了无序列表的创建方式，通过加号、减号或星号加空格实现；还提到通过冒号加表情关键词输入表情符号，如:smile:；此外，文章还介绍了通过[TOC]生成标题目录的方法以及一些特殊功能如QQ群跳转和嵌套表格的使用，整体覆盖了Typora日常使用中的基础和进阶语法要点。
date: 2022-10-24 15:32:28
---

# Typora 常用语法

- **加粗**

```
**粗体** 或 __粗体__
```

选中文字 Ctrl+B **加粗**

- _倾斜_

```
*斜体* 或 _斜体_
```

选中文字 Ctrl+I 倾斜

- **_加粗斜体_**

  ```
  ***加粗斜体***
  ```

- **图片展示**

直接拖图片进来

```
![]() 小括号里面是图片的链接可以是图床里面的地址
![图片1](/1.jpg '这是描述内联的')
![](https://imgs.luckynwa.top/profile/blog/loading.gif) 效果如下
```

![](https://imgs.luckynwa.top/profile/blog/loading.gif)

- **链接跳转**

```
[ctrl+点击跳转](https://WWW.baidu.com)
[百度](https://www.baidu.com/ "www.baidu.com")
```

[ctrl+点击跳转](https://WWW.baidu.com)

[百度](https://www.baidu.com/ 'www.baidu.com')

- **代码区域**

````javascript
   ```+回车即可在内容区编辑内容  右下角选择语言
   const a= 'luckyNwa'
````

- **创建无序列**

  ```
  + 、- 、\* （后面加空格）   这些小标题前面球就是
  ```

- **表情**

  ```
  ：+单词字母 如 :smile:
  ```

  :smile:

![](C:\Users\FF\Desktop\favicon.png)

- 标题生成目录

  ```
  [TOC]
  ```

- qq 群跳转

  前面是图，后面是跳转链接

  ```
  [![加入QQ群](https://img.shields.io/badge/已满-167385320-blue.svg)](https://jq.qq.com/?_wv=1027&k=SWCtLnMz)
  ```

[![加入QQ群](https://img.shields.io/badge/已满-167385320-blue.svg)](https://jq.qq.com/?_wv=1027&k=SWCtLnMz)

- 嵌套表格

<table>
    <tr>
        <td><img src="https://oscimg.oschina.net/oscnet/cd1f90be5f2684f4560c9519c0f2a232ee8.jpg"/></td>
    </tr>
...
</table>