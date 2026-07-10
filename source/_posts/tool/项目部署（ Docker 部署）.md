---
title: 项目部署（ Docker 部署）
cover: https://imgs.luckynwa.top/profile/yys/567.webp
description: 千里之行，始于足下
categories: 工具
tags: Docker
comments: true
abbrlink: tooldocker557
summary: >-
  本文介绍如何通过 IntelliJ IDEA 的 Docker 插件实现项目的自动部署。首先配置云服务器的 Docker 守护进程监听 TCP 端口，然后在 IDEA 中安装 Docker 插件并配置连接。接着在 Maven 项目中引入 Docker 插件依赖，创建 Dockerfile 文件定义镜像构建规则。最后通过 Maven 打包自动生成 Docker 镜像，并在 IDEA 中直接创建容器完成部署。整个流程实现了从代码到容器化部署的自动化。
date: 2023-09-23 07:17:36
---

## 配置 Docker 守护进程

用宝塔打开找到路径 `/usr/lib/systemd/system` 下的 `docker.service` 文件编辑它

搜 `ExecStart`

原

```SHELL
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock
```

改

```SHELL
ExecStart=/usr/bin/dockerd -H fd:// --containerd=/run/containerd/containerd.sock -H tcp://0.0.0.0:23756 -H unix://var/run/docker.sock
```

去 shell 那输入，重新加载 docker 的配置

```SHELL
systemctl daemon-reload

systemctl restart docker
```

再去安全那开发端口 23756 同步到外部云也开发

## IDEA 配置 Docker 插件

idea 安装插件 docker 并打开编辑配置它，选 tcp 里 socket

```SHELL
tcp://162.14.96.81:23756
```

连接即可！感觉这个端口有点危险，换一个比较好

## Maven 引入依赖

引入依赖，**镜像名称必须是小写**

```XML
<build>
    <plugins>
        <!-- docker配置-->
        <!-- docker插件-->
        <plugin>
            <groupId>com.spotify</groupId>
            <artifactId>docker-maven-plugin</artifactId>
            <version>0.4.13</version>
            <dependencies>
                <dependency>
                    <groupId>javax.activation</groupId>
                    <artifactId>activation</artifactId>
                    <version>1.1</version>
                </dependency>
            </dependencies>

            <configuration>
                <!-- 远程Docker的地址 -->
                <dockerHost>http://162.14.96.81:23756</dockerHost>
                <!-- 镜像名称、前缀、项目名 -->
                <imageName>sxl/${project.artifactId}</imageName>
                <!-- Dockerfile的位置 -->
                <dockerDirectory>src/main/docker</dockerDirectory>
                <resources>
                    <resource>
                        <targetPath>/</targetPath>
                        <!-- 表示的target文件夹 -->
                        <directory>${project.build.directory}</directory>
                        <!-- 表示打出来的JAR包-->
                        <include>${project.build.finalName}.jar</include>
                    </resource>
                </resources>
            </configuration>
            <executions>
                <execution>
                    <id>build-image</id>
                    <!--将插件绑定在package这个phase上。也就是说，用户只需执行mvn package ，就会自动执行mvn docker:build-->
                    <phase>package</phase>
                    <goals>
                        <goal>build</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```

## 创建 Dockerfile

在 `src/main/docker` 下创建文件 `Dockerfile`

```dockerfile
FROM openjdk:8-jre
# java版本，最好使用openjdk，而不是类似于Java:1.8 这种。
# 原因我也不知。
COPY *.jar /app.jar
# 执行创建app.jar
EXPOSE 10086
# 向外暴露的接口，最好与项目yml文件中的端口一致
ENTRYPOINT ["java","-jar","app.jar"]
# 执行启动命令java -jar
```

## 构建与部署

再去右侧 maven 树那边

项目下的 Lifecycle 中 `package`

去控制台里的 docker 插件中查看 images 中就能发现多了一个自己项目的镜像

右键项目镜像 --> 创建容器 --> 名字看着来 --> 最好是点击 Modify options 中的 Run options

然后输入名称 以及运行参数

```SHELL
-d -p 10086:10086
```

Run 起来，这个后端项目的端口记得也去开放一下

## 更新部署

如果是更新代码，删除掉 docker 里生成的项目镜像和它的缓存镜像，去 package 一下，再右键项目镜像，创建它即可
