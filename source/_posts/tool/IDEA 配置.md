---
title: IDEA 配置
cover: https://imgs.luckynwa.top/openApi/lucky/yys/355
description: 仰天大笑出门去，我辈岂是蓬蒿人
categories: 工具
tags: Tool
comments: true
abbrlink: tool2
summary:: >-
  本文详细介绍 IntelliJ IDEA 的安装激活、插件配置、代码格式化、热部署、字体编码等常用设置，帮助开发者快速搭建高效的 Java 开发环境。
date: 2023-07-08 05:41:22
---

# 安装与激活

**安装路径：** `D:\soft\IntelliJ IDEA 2023.2.1`

1. 将 `jetbra` 里面的文件复制到安装目录下
2. 正常安装 IDEA，选择同样的目录
3. 勾选必要选项，文件夹右键那个记得勾，**别重启**
4. 右键管理员运行 `D:\soft\IntelliJ IDEA 2023.2.1\jetbra\scripts\install-all-users.vbs`，出现 `done` 即成功
5. 验证环境变量：

```shell
echo %IDEA_VM_OPTIONS%
# 结果：D:\soft\IntelliJ IDEA 2023.2.1\jetbra\vmoptions\idea.vmoptions
```

6. 打开 IDEA，选择 **Activation code** 激活

<details>
<summary>激活码（点击展开）</summary>

```
6G5NXCPJZB-eyJsaWNlbnNlSWQiOiI2RzVOWENQSlpCIiwibGljZW5zZWVOYW1lIjoic2lnbnVwIHNjb290ZXIiLCJhc3NpZ25lZU5hbWUiOiIiLCJhc3NpZ25lZUVtYWlsIjoiIiwibGljZW5zZVJlc3RyaWN0aW9uIjoiIiwiY2hlY2tDb25jdXJyZW50VXNlIjpmYWxzZSwicHJvZHVjdHMiOlt7ImNvZGUiOiJQU0kiLCJmYWxsYmFja0RhdGUiOiIyMDI1LTA4LTAxIiwicGFpZFVwVG8iOiIyMDI1LTA4LTAxIiwiZXh0ZW5kZWQiOnRydWV9LHsiY29kZSI6IlBEQiIsImZhbGxiYWNrRGF0ZSI6IjIwMjUtMDgtMDEiLCJwYWlkVXBUbyI6IjIwMjUtMDgtMDEiLCJleHRlbmRlZCI6dHJ1ZX0seyJjb2RlIjoiSUkiLCJmYWxsYmFja0RhdGUiOiIyMDI1LTA4LTAxIiwicGFpZFVwVG8iOiIyMDI1LTA4LTAxIiwiZXh0ZW5kZWQiOmZhbHNlfSx7ImNvZGUiOiJQUEMiLCJmYWxsYmFja0RhdGUiOiIyMDI1LTA4LTAxIiwicGFpZFVwVG8iOiIyMDI1LTA4LTAxIiwiZXh0ZW5kZWQiOnRydWV9LHsiY29kZSI6IlBHTyIsImZhbGxiYWNrRGF0ZSI6IjIwMjUtMDgtMDEiLCJwYWlkVXBUbyI6IjIwMjUtMDgtMDEiLCJleHRlbmRlZCI6dHJ1ZX0seyJjb2RlIjoiUFNXIiwiZmFsbGJhY2tEYXRlIjoiMjAyNS0wOC0wMSIsInBhaWRVcFRvIjoiMjAyNS0wOC0wMSIsImV4dGVuZGVkIjp0cnVlfSx7ImNvZGUiOiJQV1MiLCJmYWxsYmFja0RhdGUiOiIyMDI1LTA4LTAxIiwicGFpZFVwVG8iOiIyMDI1LTA4LTAxIiwiZXh0ZW5kZWQiOnRydWV9LHsiY29kZSI6IlBQUyIsImZhbGxiYWNrRGF0ZSI6IjIwMjUtMDgtMDEiLCJwYWlkVXBUbyI6IjIwMjUtMDgtMDEiLCJleHRlbmRlZCI6dHJ1ZX0seyJjb2RlIjoiUFJCIiwiZmFsbGJhY2tEYXRlIjoiMjAyNS0wOC0wMSIsInBhaWRVcFRvIjoiMjAyNS0wOC0wMSIsImV4dGVuZGVkIjp0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
```

</details>

# 插件配置

新版自带很多插件，看着关闭，留下数据库、Maven、Spring 相关等。

- **UI 风格：** UI Options 里第一列全部勾选，第二列勾选前和后

# 保存并自动格式化代码

`Settings` → `Save Actions` → 勾选 **Reformat code** 和 **Optimize imports**

# 自动编译与热部署

1. `Settings` → `Compiler` → 勾选图中 2 个选项
2. 勾选 `Allow auto-make to start even if developed application is currently running`
3. 2023 版 IDEA 再引入依赖即可热部署：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <scope>runtime</scope>
</dependency>
```

切换到别的软件，就开始热部署了 🙂

![热部署配置](http://imgs.luckynwa.top/profile/mdS/2fc4d2d3139d44cd9e9d4dbed7477d55.png)

# 设置头文件自动生成

`Settings` → `Editor` → `File and Code Templates` → 配置完新建一个类就有效果了：

```java
/**
 @Author Lucky友人a
 @Date ${DATE} -${TIME}
 */
```

![头文件配置](http://imgs.luckynwa.top/profile/mdS/beb3718241de46edb65d6318bb41cc8d.png)

# 滚轮设置编辑区字体大小

`Settings` → `Editor` → `General` → 勾选 `Change font size with Ctrl+Mouse Wheel`

> ⚠️ 临时生效，第二次进入会恢复默认

![滚轮字体设置](http://imgs.luckynwa.top/profile/mdS/716b4cb25e7846b183789a8fe9929f37.png)

# 自动导包

`Settings` → `Editor` → `General` → `Auto Import`

- 上面：自动导包
- 下面：自动删除无用包

![自动导包](http://imgs.luckynwa.top/profile/mdS/b6b87225fce343e581a931e8598e7fa8.png)

# 显示行号和方法的分隔符

`Settings` → `Editor` → `General` → `Appearance`

![行号设置](http://imgs.luckynwa.top/profile/mdS/901142a1dfc5430eb280aff4f1bd0ca7.png)

# 设置鼠标悬浮提示

`Settings` → `Editor` → `General` → `Code Completion` → 勾选显示标题功能

![悬浮提示](http://imgs.luckynwa.top/profile/mdS/0fe541133367443db67f435fa38b4f09.png)

# 忽略字母大小写的提示

`Settings` → `Editor` → `General` → `Code Completion` → 取消勾选 `Match case`

![忽略大小写](http://imgs.luckynwa.top/profile/mdS/e6c08d5733cd4b65ab0678fdebf07a07.png)

# 设置编码

`Settings` → `Editor` → `File Encodings` → 全部设置为 `UTF-8`，影响 i18n 里中文，必配，BOM 勾选也记得。

![编码设置](http://imgs.luckynwa.top/profile/mdS/63b5b37ebdec4731b6c8378569275851.png)

# 取消 Tab 页单行显示

`Settings` → `Editor` → `General` → `Editor Tabs`

2023 版 IDEA 选择单选 **Multiple rows**

![Tab设置](http://imgs.luckynwa.top/profile/mdS/5fe98091ba9246ee8f48156bfcc16687.png)

# 设置字体、字体大小、行间距

`Settings` → `Editor` → `Font`

![字体设置](http://imgs.luckynwa.top/profile/mdS/85de093acf034b0da65581b18c330e06.png)

# 推荐插件

| 插件名                                    | 说明                                                                                                                                            |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Lombok**                                | `@Data` 注解插件                                                                                                                                |
| **MybatisX**                              | 快速定位实现类以及方法在 XML 的位置                                                                                                             |
| **Rainbow Brackets**                      | 不同颜色 `{}`，设置里搜 `disable when` 取消掉 1000 那个；Round Brackets 中 5 颜色：`E8BA36` `46A97B` `E594D2` `8F8BFF` `A938D7`                 |
| **Dark Purple Theme**                     | 主题，`Appearance` + `Color Scheme` 里导入 `luckyColor.icls` 样式；不满意在 `Language Defaults` 中修改，其中 `Semantic Highlighting` 是参数颜色 |
| **Translation**                           | 3.5.6 翻译，选择百度，5w 字符内免费                                                                                                             |
| **GenerateAllSetter**                     | `A a = new A();` 右键 `a` → `Alt+Enter` → 选 set                                                                                                |
| **Mybatis Log Free**                      | 恢复 MyBatis SQL 日志到可执行 SQL，Tools 里打开；需开启日志：`log-impl: org.apache.ibatis.logging.stdout.StdOutImpl`                            |
| **JUnit4 Parallel Runner**                | 不然测试类不能运行                                                                                                                              |
| **Compiler**                              | 相关插件记得开                                                                                                                                  |
| **CamelCase**                             | `Shift+Alt+U` 大小写转换，支持驼峰与下划线                                                                                                      |
| **Get Emoji / Yet Another Emoji Support** | MD 文件输入 `:` + 图标名，emoji 参考 https://gitmoji.dev/                                                                                       |
| **Background Image Plus**                 | 给代码加背景图，`Appearance` → `Background Image` → `Opacity` 透明度                                                                            |
| **Easy Javadoc**                          | 生成代码注释，`Ctrl+/`，设置快捷键 `Alt+/`                                                                                                      |
| **SonarLint**                             | 代码规范检查                                                                                                                                    |
| **TONGYI Lingma**                         | 代码 AI 助手，批量注释，提示功能 Tab 键输入                                                                                                     |
| **Chinese**                               | 中文包必装                                                                                                                                      |
| **Nyan Progress Bar**                     | 进度条变成彩虹猫                                                                                                                                |
| **Grep Console**                          | 改变控制台日志颜色                                                                                                                              |
| **Batch Scripts Support**                 | `.bat` 脚本支持                                                                                                                                 |

> 💡 禁用 GitHub 插件只留一个 Git 插件；插件网络要是用代理记得开启。

# 新项目设置

`File` → `New Projects Setup` → `Settings for New Projects`

- Maven 路径配置一下
- 保存自动格式化配置
