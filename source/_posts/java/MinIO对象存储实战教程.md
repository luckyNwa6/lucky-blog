---
title: MinIO使用
cover: https://imgs.luckynwa.top/profile/yys/334.webp
description: 沉舟侧畔千帆过，病树前头万木春
categories: 后端
tags: Middleware
comments: true
abbrlink: java6
summary: >-
  本文详细介绍如何在Spring Boot项目中集成MinIO对象存储服务。内容涵盖MinIO的基础配置、创建桶、上传文件、删除文件、生成签名URL等常用操作，并提供完整的封装使用方案，包括配置类、服务接口及实现类，帮助开发者快速上手MinIO文件管理。
date: 2024-09-05 04:57:52
---

# 基础使用

## 1. 创建配置类

```java
@Configuration
public class MinIOConfig {
    @Bean
    public MinioClient minioClient() {
        return MinioClient.builder()
                .endpoint("http://47.98.230.128:9000")
                .credentials("minioadmin", "minioadmin")
                .build();
    }
}
```

## 2. 引入pom依赖

```xml
<!--minio依赖-->
<dependency>
    <groupId>io.minio</groupId>
    <artifactId>minio</artifactId>
    <version>8.2.1</version>
</dependency>
```

## 3. 测试类

查看实例是否连接成功

```java
@Resource
private MinioClient minioClient;

System.out.println(minioClient);
```

查看桶是否存在，返回值布尔

```java
minioClient.bucketExists(BucketExistsArgs.builder().bucket("lucky").build());
```

创建桶，无返回值

```java
minioClient.makeBucket(MakeBucketArgs.builder().bucket("test").build());
```

查看全部有权访问的桶

```java
List<Bucket> buckets = minioClient.listBuckets();
buckets.forEach(bucket -> {
    System.out.println("name: " + bucket.name() + "；creationDate: " + bucket.creationDate());
});
```

删除桶，无返回值

```java
minioClient.removeBucket(RemoveBucketArgs.builder().bucket("test").build());
```

上传文件到桶中

```java
File file = new File("D:\\load\\W200H1009.png");
FileInputStream stream = new FileInputStream(file);
ObjectWriteResponse response = minioClient.putObject(PutObjectArgs.builder()
        .bucket("lucky") // 指定上传的桶
        .object("my-test.png") // 上传到桶中之后的文件叫啥名字
        // 文件流，文件大小，分片大小（通常为 -1，自动推断，若手动填写，必须在 5M -5G 之间）
        .stream(stream, file.length(), -1)
        .build());
```

minio支持自动建文件夹比如a/b/my-test2.jpg，会创建2层

```java
ObjectWriteResponse response = minioClient.uploadObject(UploadObjectArgs.builder()
        .bucket("public-readonly-file")
        .object("my-test2.jpg")
        .filename("D:\\load\\W200H1009.png")
        .build());
```

查找文件，不存在则报异常

```java
StatObjectResponse response = minioClient.statObject(StatObjectArgs.builder()
        .bucket("lucky") // 查询的桶名
        .object("my-test.png") // 文件名字
        .build());
System.out.println(response);
```

GET生成可访问的签名 url 地址, Put生成的是上传链接前端通过上传链接去上传

```java
String url = minioClient.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
        .bucket("lucky")
        .object("my-test.png")
        .method(Method.GET)
        .build());
System.out.println(url);
```

删除桶中的文件

```java
minioClient.removeObject(RemoveObjectArgs.builder()
        .bucket("lucky")
        .object("my-test.png")
        .build());
```

公开 url 访问权限

- 桶权限改成public，不推荐，任何人不使用用户名和密码认证，都可以对该桶的文件信息上传，下载和删除
- 使用 makeBucket 创建桶后，使用 setBucketPolicy 设置访问策略，用户只读权限

```java
String bucketName = "public-readonly-file";
// 创建桶
minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
// 需要的就是这一串代码访问策略
String policyJsonString = "{\"Version\":\"2024-07-11\",\"Statement\":[{\"Sid\":\"PublicRead\",\"Effect\":\"Allow\",\"Principal\":{\"AWS\":\"*\"},\"Action\":[\"s3:GetObject\"],\"Resource\":[\"arn:aws:s3:::" + bucketName + "/*\"]}]}";
minioClient.setBucketPolicy(SetBucketPolicyArgs.builder()
        .bucket(bucketName)
        .config(policyJsonString)
        .build());
```

创完之后去（6-2）上传了一张

访问http://47.98.230.128:29000/public-readonly-file/my-test2.jpg

有点牛逼！！！

完整测试代码如下：

```java
package com.nwa;

import io.minio.MinioClient;
import io.minio.ObjectWriteResponse;
import io.minio.PutObjectArgs;
import io.minio.errors.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

/**
 * @Author Lucky友人a
 * @Date 2024/7/11 -15:06
 */
@RunWith(SpringRunner.class)
@SpringBootTest
public class MinioTest {

    @Resource
    private MinioClient minioClient;

    @Test
    public void minioTest() throws ServerException, InsufficientDataException, ErrorResponseException, IOException, NoSuchAlgorithmException, InvalidKeyException, InvalidResponseException, XmlParserException, InternalException {
        //System.out.println(minioClient);//打印是否有这个实例
        //  minioClient.bucketExists(BucketExistsArgs.builder().bucket("lucky").build());//查看是否存在，返回值布尔
        //  minioClient.makeBucket(MakeBucketArgs.builder().bucket("test").build());//创建桶，无返回值
        //查看全部有权访问的桶
//        List<Bucket> buckets = minioClient.listBuckets();
//        buckets.forEach(bucket -> {
//            System.out.println("name: " + bucket.name() + "；creationDate: " + bucket.creationDate());
//        });
        // minioClient.removeBucket(RemoveBucketArgs.builder().bucket("test").build()); //删除桶，无返回值
        //上传文件到桶中、常用方法1
        File file = new File("D:\\load\\W200H1009.png");
        FileInputStream stream = new FileInputStream(file);
        ObjectWriteResponse response = minioClient.putObject(PutObjectArgs.builder()
                .bucket("lucky") // 指定上传的桶
                .object("my-test.png") // 上传到桶中之后的文件叫啥名字
                // 文件流，文件大小，分片大小（通常为 -1，自动推断，若手动填写，必须在 5M -5G 之间）
                .stream(stream, file.length(), -1)
                .build());
        //新方法，minio支持自动建文件夹比如a/b/my-test2.jpg，会创建2层
//        ObjectWriteResponse response = minioClient.uploadObject(UploadObjectArgs.builder()
//                .bucket("public-readonly-file")
//                .object("my-test2.jpg")
//                .filename("D:\\load\\W200H1009.png")
//                .build());
//查不到该文件，会直接报异常，所以 statObject 是肯定可以正常返回数据的
//        StatObjectResponse response = minioClient.statObject(StatObjectArgs.builder()
//                .bucket("lucky") // 查询的桶名
//                .object("my-test.png") // 文件名字
//                .build());
//        System.out.println(response);
//GET生成可访问的签名 url 地址, Put生成的是上传链接前端通过上传链接去上传
//        String url = minioClient.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
//                .bucket("lucky")
//                .object("my-test.png")
//                .method(Method.GET)
//                .build());
//        System.out.println(url);

//删除桶中的文件
//        minioClient.removeObject(RemoveObjectArgs.builder()
//                .bucket("lucky")
//                .object("my-test.png")
//                .build());
//公开 url 访问权限
        //1、桶权限改成public，不推荐，任何人不使用用户名和密码认证，都可以对该桶的文件信息上传，下载和删除
        //2、使用 makeBucket 创建桶后，使用 setBucketPolicy 设置访问策略，用户只读权限
//        String bucketName = "public-readonly-file";
//// 创建桶
//        minioClient.makeBucket(MakeBucketArgs.builder().bucket(bucketName).build());
//// 需要的就是这一串代码访问策略
//        String policyJsonString = "{\"Version\":\"2024-07-11\",\"Statement\":[{\"Sid\":\"PublicRead\",\"Effect\":\"Allow\",\"Principal\":{\"AWS\":\"*\"},\"Action\":[\"s3:GetObject\"],\"Resource\":[\"arn:aws:s3:::" + bucketName + "/*\"]}]}";
//        minioClient.setBucketPolicy(SetBucketPolicyArgs.builder()
//                .bucket(bucketName)
//                .config(policyJsonString)
//                .build());//去上面上传了一张 通过http://47.98.230.128:29000/public-readonly-file/my-test2.jpg访问有点牛逼
//
//
    }
}
```

# 封装使用

简单封装使用

（1）yml配置

```yaml
minio:
  #accessKey ,secretKey值的获取在配置accessKey步骤体现
  accessKey: luckynwa.top
  secretKey: f4e2e52034348f86b67cde581c0f9eb5[luckynwa.top]
  # 存放文件的桶
  bucket: lucky
  # 访问路径
  endpoint: http://47.98.230.128:9000
  readPath: http://47.98.230.128:9000
  servlet:
    multipart:
      max-file-size: 200MB
      max-request-size: 200MB
```

（2）yml类

```java
package com.nwa.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.io.Serializable;

/**
 * @Author Lucky友人a
 * @Date 2024/7/11 -16:27
 */
@Data
@ConfigurationProperties(prefix = "minio")
public class MinIOYml implements Serializable {

    private String accessKey;

    private String secretKey;

    private String bucket;

    private String endpoint;

    private String readPath;

}
```

（3）读取配置类

```java
package com.nwa.config;

import io.minio.MinioClient;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Data
@Configuration
@EnableConfigurationProperties({MinIOYml.class})

public class MinIOConfig {

    @Autowired
    private MinIOYml minIOYml;

    @Bean
    public MinioClient buildMinioClient() {
        return MinioClient
                .builder()
                .credentials(minIOYml.getAccessKey(), minIOYml.getSecretKey())
                .endpoint(minIOYml.getEndpoint())
                .build();
    }
}
```

（4）MinIO处理接口

```java
package com.nwa.modules.bed.service;

import com.nwa.common.utils.R;

import java.io.InputStream;

public interface MinIOService {


    /**
     * 上传图片文件
     *
     * @param prefix      文件前缀
     * @param filename    文件名
     * @param inputStream 文件流
     * @return 文件全路径
     */
    public String uploadImgFile(String prefix, String filename, InputStream inputStream);

    /**
     * 上传html文件
     *
     * @param prefix      文件前缀
     * @param filename    文件名
     * @param inputStream 文件流
     * @return 文件全路径
     */
    public String uploadHtmlFile(String prefix, String filename, InputStream inputStream);

    /**
     * 删除文件
     *
     * @param pathUrl 文件全路径
     */
    public R delete(String pathUrl);

    /**
     * 下载文件
     *
     * @param pathUrl 文件全路径
     * @return
     */
    public byte[] downLoadFile(String pathUrl);

}
```

（5）MinIO接口实现类

```java
package com.nwa.modules.bed.service.impl;

/**
 * @Author Lucky友人a
 * @Date 2024/7/12 -10:46
 */


import com.nwa.common.utils.R;
import com.nwa.config.MinIOConfig;
import com.nwa.config.MinIOYml;
import com.nwa.modules.bed.service.MinIOService;
import io.minio.GetObjectArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.RemoveObjectArgs;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Import;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.annotation.Resource;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@Slf4j
@EnableConfigurationProperties(MinIOYml.class)
@Import(MinIOConfig.class)
public class MinIOServiceImpl implements MinIOService {

    @Resource
    private MinioClient minioClient;

    @Autowired
    private MinIOYml minIOYml;

    private final static String separator = "/";

    /**
     * 文件前缀为空则用当前时间
     *
     * @param dirPath
     * @param filename yyyy/mm/dd/file.jpg
     * @return
     */
    public String builderFilePath(String dirPath, String filename) {
        StringBuilder stringBuilder = new StringBuilder(50);
        if (!StringUtils.isEmpty(dirPath)) {
            stringBuilder.append(dirPath).append(separator);
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy/MM/dd");
        String todayStr = sdf.format(new Date());
        stringBuilder.append(todayStr).append(separator);
        stringBuilder.append(filename);
        return stringBuilder.toString();
    }

    /**
     * 上传图片文件
     *
     * @param prefix      文件前缀
     * @param filename    文件名
     * @param inputStream 文件流
     * @return 文件全路径
     */
    @Override
    public String uploadImgFile(String prefix, String filename, InputStream inputStream) {
        String filePath = builderFilePath(prefix, filename);
        try {
            PutObjectArgs putObjectArgs = PutObjectArgs.builder()
                    .object(filePath)
                    .contentType("image/jpg")
                    .bucket(minIOYml.getBucket()).stream(inputStream, inputStream.available(), -1)
                    .build();
            minioClient.putObject(putObjectArgs);
            StringBuilder urlPath = new StringBuilder(minIOYml.getReadPath());
            urlPath.append(separator + minIOYml.getBucket());
            urlPath.append(separator);
            urlPath.append(filePath);
            return urlPath.toString();
        } catch (Exception ex) {
            log.error("minio put file error.", ex);
            throw new RuntimeException("上传文件失败");
        }
    }

    /**
     * 上传html文件
     *
     * @param prefix      文件前缀
     * @param filename    文件名
     * @param inputStream 文件流
     * @return 文件全路径
     */
    @Override
    public String uploadHtmlFile(String prefix, String filename, InputStream inputStream) {
        String filePath = builderFilePath(prefix, filename);
        try {
            PutObjectArgs putObjectArgs = PutObjectArgs.builder()
                    .object(filePath)
                    .contentType("text/html")
                    .bucket(minIOYml.getBucket()).stream(inputStream, inputStream.available(), -1)
                    .build();
            minioClient.putObject(putObjectArgs);
            StringBuilder urlPath = new StringBuilder(minIOYml.getReadPath());
            urlPath.append(separator + minIOYml.getBucket());
            urlPath.append(separator);
            urlPath.append(filePath);
            return urlPath.toString();
        } catch (Exception ex) {
            log.error("minio put file error.", ex);
            ex.printStackTrace();
            throw new RuntimeException("上传文件失败");
        }
    }

    /**
     * 删除文件
     * 文件全路径
     *
     * @param pathUrl http://47.98.230.128:9000/public-readonly-file/my-test2.jpg
     */
    @Override
    public R delete(String pathUrl) {
        String key = pathUrl.replace(minIOYml.getEndpoint() + "/", "");
        int index = key.indexOf(separator);
        String bucket = key.substring(0, index);
        String filePath = key.substring(index + 1);
        // 删除Objects
        RemoveObjectArgs removeObjectArgs = RemoveObjectArgs.builder().bucket(bucket).object(filePath).build();
        try {
            minioClient.removeObject(removeObjectArgs);
            return R.ok("删除成功");
        } catch (Exception e) {
            log.error("minio remove file error.  pathUrl:{}", pathUrl);
            e.printStackTrace();
            return R.ok("删除失败");
        }

    }


    /**
     * 下载文件
     *
     * @param pathUrl http://47.98.230.128:9000/lucky/pic/W200H1002.png 文件全路径
     * @return 文件流
     */
    @Override
    public byte[] downLoadFile(String pathUrl) {
        String key = pathUrl.replace(minIOYml.getEndpoint() + "/", "");
        int index = key.indexOf(separator);
        String bucket = key.substring(0, index);
        String filePath = key.substring(index + 1);
        InputStream inputStream = null;
        try {
            inputStream = minioClient.getObject(GetObjectArgs.builder().bucket(minIOYml.getBucket()).object(filePath).build());
        } catch (Exception e) {
            log.error("minio down file error.  pathUrl:{}", pathUrl);
            e.printStackTrace();
        }

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        byte[] buff = new byte[100];
        int rc = 0;
        while (true) {
            try {
                if (!((rc = inputStream.read(buff, 0, 100)) > 0)) break;
            } catch (IOException e) {
                e.printStackTrace();
            }
            byteArrayOutputStream.write(buff, 0, rc);
        }
        return byteArrayOutputStream.toByteArray();
    }
}
```

（6）MinIO调用

```java
@Resource
MinIOServiceImpl minIOFileStorageService;

@ApiOperation("上传到MinIO")
@PostMapping("/fileupload")
public R minIo(MultipartFile multipartFile) {
    // 检查multipartFile是否为空
    if (multipartFile == null || multipartFile.isEmpty()) {
        return R.error("文件为空，无法处理");
    }
    try (InputStream inputStream = multipartFile.getInputStream()) {  // 将MultipartFile转换为InputStream
        // 上传到MinIO服务器
        // 这里的文件名可以生成随机的名称，防止重复
        String url = minIOFileStorageService.uploadImgFile("testjpg", "test1.jpg", inputStream);
        return R.ok(url);
    } catch (IOException e) {
        // 处理异常，可能是getInputStream()失败
        return R.error("获取InputStream失败：" + e.getMessage());
    }
}

@ApiOperation("删除MinIO文件")
@PostMapping("/deleteMinIoFile")
public R deleteMinIoFile(String pathUrl) {
    return minIOFileStorageService.delete(pathUrl);
}

@ApiOperation("下载MinIO文件")
@GetMapping("/downLoadMinIOFile")
public byte[] downLoadMinIOFile(String pathUrl) {
    return minIOFileStorageService.downLoadFile(pathUrl);
}
```

# 其他

我采用人人框架为后台，将采取策略模式，将MinIO兼容进桶中
