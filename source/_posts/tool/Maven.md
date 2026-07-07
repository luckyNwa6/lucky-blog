---
title: Maven 环境
cover: https://imgs.luckynwa.top/profile/yys/130.webp
description: 欲穷千里目，更上一层楼
categories: 工具
tags: Maven
comments: true
abbrlink: tool7
summary: >-
  本文介绍 Apache Maven 的安装配置、环境变量设置、阿里云镜像源配置以及 JDK 8 默认编译版本设置，帮助开发者快速搭建 Java 项目构建工具环境。
date: 2023-08-12 02:02:07
---

# 安装配置

直接将解压好的文件复制到 `D:\bgsoft` 下面（下载镜像源和本地仓库地址都在 `conf/settings.xml` 里写好了）。

**新建环境变量 `MAVEN_HOME`：**

```
D:\bgsoft\apache-maven-3.6.3
```

**编辑 `Path`，添加：**

```
%MAVEN_HOME%\bin
```

# 验证

```shell
mvn -version
```

# settings.xml 配置

```xml
<?xml version="1.0" encoding="UTF-8"?>

<!--
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->

<!--
 | This is the configuration file for Maven. It can be specified at two levels:
 |
 |  1. User Level. This settings.xml file provides configuration for a single user,
 |                 and is normally provided in ${user.home}/.m2/settings.xml.
 |
 |                 NOTE: This location can be overridden with the CLI option:
 |
 |                 -s /path/to/user/settings.xml
 |
 |  2. Global Level. This settings.xml file provides configuration for all Maven
 |                 users on a machine (assuming they're all using the same Maven
 |                 installation). It's normally provided in
 |                 ${maven.conf}/settings.xml.
 |
 |                 NOTE: This location can be overridden with the CLI option:
 |
 |                 -gs /path/to/global/settings.xml
 |
 | The sections in this sample file are intended to give you a running start at
 | getting the most out of your Maven installation. Where appropriate, the default
 | values (values used when the setting is not specified) are provided.
 |
 |-->
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">

  <localRepository>D:\bgsoft\apache-maven-3.6.3\repository</localRepository>
  <pluginGroups>
  </pluginGroups>
  <proxies>
  </proxies>
  <servers>
  </servers>

  <mirrors>

   <mirror>
      <id>alimaven</id>
      <name>aliyun maven</name>
      <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
      <mirrorOf>central</mirrorOf>
    </mirror>

  </mirrors>

<profiles>
    <!-- 在 profiles 标签中 添加 profile 标签内容 明确新建项目 默认 JDK 为 1.8-->
	<profile>
        <id>JDK8</id>
        <activation>
            <activeByDefault>true</activeByDefault>
            <jdk>1.8</jdk>
        </activation>
        <properties>
            <maven.compiler.source>1.8</maven.compiler.source>
            <maven.compiler.target>1.8</maven.compiler.target>
            <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
        </properties>
    </profile>
</profiles>
<!-- 添加的  profile 生效 -->
<activeProfiles>
	<activeProfile>JDK8</activeProfile>
</activeProfiles>

</settings>
```
