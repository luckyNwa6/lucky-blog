---
title: Windows下Jenkins安装与配置指南
cover: https://imgs.luckynwa.top/profile/yys/810.webp
description: 老骥伏枥，志在千里；烈士暮年，壮心不已
categories: 工具
tags: Tool
comments: true
abbrlink: tool223
summary: >-
  本文详细介绍了在Windows系统下安装和配置Jenkins的完整步骤。首先通过Jenkins安装包进行基础安装，将安装目录设置在D:\soft\jenkins下，端口配置为18082，并指定Java环境为JDK11。随后讲解了如何将Jenkins从系统服务改为手动启动，以及如何迁移默认的Jenkins配置文件夹到自定义路径。文章重点展示了jenkins.xml配置文件的完整内容，包括JVM参数设置、端口配置、日志管理模式以及异常处理等关键配置项。最后说明了启动服务后的插件安装和首次登录的相关注意事项。适用于需要在Windows服务器上搭建Jenkins环境的开发人员和运维人员参考使用。
date: 2023-07-09 10:30:00
---

## 简介

Jenkins是一款开源的自动化服务器，广泛应用于CI/CD（持续集成/持续部署）流程中。

## 安装

安装jenkins.msi，D:\soft下新建jenkins，安装到这。Logon Type就选第一个，端口18082，Java环境就选C盘的JDK11（当时安装最低都要11了），然后继续即可，完成。

## 服务配置

任务管理器--->服务--->jenkins--->打开服务--->关闭，改成手动开启，应用。

## 文件迁移

将C盘下的隐藏文件夹中的ProgramData下的Jenkins文件夹剪切移动到D:\soft\jenkins下，并将里面的文件拉到根目录，并删除jenkins文件夹。

## 配置文件修改

修改jenkins.xml文件，直接用下面就行，端口也可以在下面改：

```xml
<!--
The MIT License

Copyright (c) 2004-2017, Sun Microsystems, Inc., Kohsuke Kawaguchi, Oleg Nenashev, and other Jenkins contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
-->
<!--
  Windows service definition for Jenkins.

  To uninstall, run "jenkins.exe stop" to stop the service, then "jenkins.exe uninstall" to uninstall the service.
  Both commands don't produce any output if the execution is successful.
-->
<service>
  <id>jenkins</id>
  <name>Jenkins</name>
  <description>This service runs Jenkins automation server.</description>
  <env name="JENKINS_HOME" value=".jenkins"/>
  <!--
    if you'd like to run Jenkins with a specific version of Java, specify a full path to java.exe.
    The following value assumes that you have java in your PATH.
  -->
  <executable>C:\Program Files\Java\jdk-11\bin\java.exe</executable>
  <arguments>-Xrs -Xmx256m -Dhudson.lifecycle=hudson.lifecycle.WindowsServiceLifecycle -jar "jenkins.war" --httpPort=18082 --webroot="war"</arguments>
  <!--
    interactive flag causes the empty black Java window to be displayed.
    I'm still debugging this.
  <interactive />
  -->
  <logmode>rotate</logmode>

  <onfailure action="restart"/>

  <!--
    In the case WinSW gets terminated and leaks the process, we want to abort
    these runaway JAR processes on startup to prevent corruption of JENKINS_HOME.
    So this extension is enabled by default.
  -->
  <extensions>
    <!-- This is a sample configuration for the RunawayProcessKiller extension. -->
    <extension enabled="true" className="winsw.Plugins.RunawayProcessKiller.RunawayProcessKillerExtension" id="killOnStartup">
      <pidfile>%BASE%\jenkins.pid</pidfile>
      <stopTimeout>10000</stopTimeout>
      <stopParentFirst>false</stopParentFirst>
    </extension>
  </extensions>

  <!-- See the referenced examples for more options -->

</service>

```

## 启动与访问

启动服务，很多插件科学上网、首次密码在D:\soft\jenkins\.jenkins\secrets下init....，首次就新人安装就行了。

访问地址：http://localhost:18082/
