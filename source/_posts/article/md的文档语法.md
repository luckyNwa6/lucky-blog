---
title: Typora常用语法
description: Markerdown使用相关的学习笔记
cover: https://imgs.luckynwa.top/profile/blog/markerDownIcon.png
categories: 文档
tags: Typora
abbrlink: 2645
comments: true
summary: >-
  这里是码农观测站，这篇文章主要介绍了Typora这款Markdown编辑器的常用语法和操作技巧，包括如何使用加粗（**粗体**或Ctrl+B）、倾斜（*斜体*或Ctrl+I）以及加粗斜体（***加粗斜体***）等文本格式设置方法；还讲解了插入图片（直接拖入或使用链接）、创建超链接（ctrl+点击跳转）、编写代码块（```+语言选择）、制作无序列表（+、-、*后加空格）、添加表情符号（:smile:）、生成目录（[TOC]）等实用功能，同时也提及了表格嵌套等高级用法，帮助用户快速掌握Typora的基本操作和高效写作技巧。
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