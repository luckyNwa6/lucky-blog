---
title: Maven依赖和工具类
description: 少壮不努力，老大徒伤悲
cover: https://imgs.luckynwa.top/profile/yys/818.webp
categories: 工具
tags: Maven
comments: true
abbrlink: tool8
summary: >-
  这篇文章整理了Java开发中常用的Maven依赖和工具类代码，涵盖Lombok简化开发、单元测试、Fastjson2数据处理、
  PageHelper分页、JWT身份验证、MD5加密、MyBatis代码生成、AOP日志记录、Swagger和Knife4j接口文档等核心功能，
  提供即拿即用的代码模板和配置参考，帮助开发者快速搭建项目基础架构。
date: 2023-08-19 03:34:54
---

# Maven 依赖汇总

## Lombok

用处：一个注解完成大量的 get、set 操作，推荐用 properties 标签管理版本

```xml
<properties>
    <lombok.version>1.18.4</lombok.version>
</properties>

<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>${lombok.version}</version>
</dependency>
```

## 单元测试

springboot 中直接引入 starter-test 即可

```xml
<!-- 包含junit4.12，没有它无法调用springboot上下文对象 -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>

<!-- 仅调用junit，不涉及项目模块 -->
<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.12</version>
    <scope>test</scope>
</dependency>
```

## Fastjson2

推荐使用 2 版本

```xml
<dependency>
    <groupId>com.alibaba.fastjson2</groupId>
    <artifactId>fastjson2</artifactId>
    <version>2.0.7</version>
</dependency>
```

## PageHelper 分页

```xml
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper-spring-boot-starter</artifactId>
    <version>1.4.0</version>
</dependency>
```

## JWT Token

```xml
<dependency>
    <groupId>com.auth0</groupId>
    <artifactId>java-jwt</artifactId>
    <version>3.10.3</version>
</dependency>

<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.1</version>
</dependency>
```

## MD5 加密

```xml
<dependency>
    <groupId>commons-codec</groupId>
    <artifactId>commons-codec</artifactId>
</dependency>
```

## MyBatis 代码生成器

```xml
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-generator</artifactId>
    <version>3.5.1</version>
</dependency>

<dependency>
    <groupId>org.freemarker</groupId>
    <artifactId>freemarker</artifactId>
    <version>2.3.30</version>
</dependency>

<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus</artifactId>
    <version>3.4.3.4</version>
</dependency>
```

## AOP 日志

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

## Swagger2

```xml
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>2.9.2</version>
</dependency>

<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>2.9.2</version>
</dependency>

<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>swagger-bootstrap-ui</artifactId>
    <version>1.9.6</version>
</dependency>
```

## Knife4j

```xml
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>2.0.9</version>
</dependency>
```

---

# 工具类代码

## JWTUtils - Token 工具

```java
package com.nwa.until;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JWTUtils {
    private static final long EXPIRE_DATE = 30 * 610 * 100000;
    private static final String TOKEN_SECRET = "LuckyNWA666";

    // 生成 Token
    public static String token(String username, String password) {
        try {
            Date date = new Date(System.currentTimeMillis() + EXPIRE_DATE);
            Algorithm algorithm = Algorithm.HMAC256(TOKEN_SECRET);
            Map<String, Object> header = new HashMap<>();
            header.put("typ", "JWT");
            header.put("alg", "HS256");
            return JWT.create()
                    .withHeader(header)
                    .withClaim("username", username)
                    .withClaim("password", password)
                    .withExpiresAt(date)
                    .sign(algorithm);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // 验证 Token
    public static boolean verify(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(TOKEN_SECRET);
            JWTVerifier verifier = JWT.require(algorithm).build();
            verifier.verify(token);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
```

## MD5Utils - 加密工具

```java
package com.nwa.until;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class MD5Utils {
    public static String md5(String pwd) {
        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            md5.update(pwd.getBytes());
            return new BigInteger(1, md5.digest()).toString(16);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        return null;
    }
}
```

## CodeGenerator - 代码生成器

```java
package com.nwa.until;

import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.OutputFile;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;

import java.util.Collections;

public class CodeGenerator {
    public static void main(String[] args) {
        FastAutoGenerator.create("jdbc:mysql://127.0.0.1:3306/weeklydb?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC", "root", "123456")
                .globalConfig(builder -> {
                    builder.author("luckyNwa")
                            .enableSwagger()
                            .fileOverride()
                            .outputDir(System.getProperty("user.dir") + "/src/main/java");
                })
                .packageConfig(builder -> {
                    builder.parent("com.nwa")
                            .moduleName("")
                            .pathInfo(Collections.singletonMap(OutputFile.mapperXml, System.getProperty("user.dir") + "/src/main/resources/mapper"));
                })
                .strategyConfig(builder -> {
                    builder.addInclude("tb_weeks")
                            .addTablePrefix("tb_", "sys_");
                })
                .templateEngine(new FreemarkerTemplateEngine())
                .execute();
    }
}
```

## SwaggerConfig - Swagger 配置

```java
package com.nwa.until;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    @Bean
    public Docket docket() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.nwa.controller"))
                .build()
                .securitySchemes(security());
    }

    private ApiInfo apiInfo() {
        Contact luckyNWA = new Contact("luckyNWA", "www.nwa.com", "1656213092@qq.com");
        return new ApiInfo(
                "小维的API接口说明",
                "此文档详细说明了小维前后端项目端口规范",
                "v1.0",
                "www.nwa.com",
                luckyNWA,
                "apache 2.0",
                "www.nwa.com",
                new ArrayList()
        );
    }

    private List<ApiKey> security() {
        ArrayList<ApiKey> list = new ArrayList<>();
        list.add(new ApiKey("token", "token", "header"));
        return list;
    }
}
```

## Knife4jConfiguration - Knife4j 配置

```java
package com.nwa.config;

import com.github.xiaoymin.knife4j.spring.extension.OpenApiExtensionResolver;
import io.swagger.annotations.ApiOperation;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2WebMvc;

import java.util.List;

import static com.github.xiaoymin.knife4j.core.util.CollectionUtils.newArrayList;

@Configuration
@AllArgsConstructor
@EnableSwagger2WebMvc
public class Knife4jConfiguration {
    private final OpenApiExtensionResolver openApiExtensionResolver;

    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo())
                .select()
                .apis(RequestHandlerSelectors.withMethodAnnotation(ApiOperation.class))
                .paths(PathSelectors.any())
                .build()
                .extensions(openApiExtensionResolver.buildSettingExtensions())
                .securitySchemes(security());
    }

    private List<ApiKey> security() {
        return newArrayList(new ApiKey("Token", "token", "header"));
    }

    private ApiInfo apiInfo() {
        Contact luckyNWA = new Contact("luckyNWA", "http://luckynwa.top", "1656213092@qq.com");
        return new ApiInfoBuilder()
                .title("小维的API接口说明")
                .description("多个应用系统之间的身份验证和访问控制的接口")
                .termsOfServiceUrl("http://luckynwa.top")
                .version("1.0")
                .contact(luckyNWA)
                .license("apache 2.0")
                .build();
    }
}
```

## CheckTokenInterceptor - Token 拦截器

```java
package com.nwa.until;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nwa.bean.ResultVO;
import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Component
public class CheckTokenInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {
        String method = request.getMethod();
        if ("OPTIONS".equalsIgnoreCase(method)) {
            return true;
        }
        String token = request.getHeader("token");
        if (token == null) {
            ResultVO resultVO = new ResultVO(ResStatus.FAIL, "请先登录", null);
            doResponse(response, resultVO);
        } else {
            try {
                return JWTUtils.verify(token);
            } catch (ExpiredJwtException e) {
                doResponse(response, new ResultVO(ResStatus.FAIL, "登录过期", null));
            } catch (UnsupportedJwtException e) {
                doResponse(response, new ResultVO(ResStatus.FAIL, "token不合法", null));
            } catch (Exception e) {
                doResponse(response, new ResultVO(ResStatus.FAIL, "请先登录", null));
            }
        }
        return false;
    }

    private void doResponse(HttpServletResponse response, ResultVO resultVO) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        PrintWriter out = response.getWriter();
        out.println(new ObjectMapper().writeValueAsString(resultVO));
        out.flush();
        out.close();
    }
}
```

## SysLog - 自定义日志注解

```java
package com.nwa.aop;

import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface SysLog {
    String operationType() default "";
    String operationName() default "";
    String value() default "";
}
```

## SysLogA - AOP 日志切面

```java
package com.nwa.aop;

import com.nwa.bean.Client;
import com.nwa.service.impl.SysLogService;
import com.nwa.until.ClientInfoUtil;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;
import java.util.Date;

@Slf4j
@Aspect
@Component
public class SysLogA {
    @Resource
    private SysLogService sysLogService;

    @Pointcut("execution(* com.nwa.controller.IndexController.*(..))")
    public void logPointCut() {
    }

    @After("logPointCut()")
    public void logTest(JoinPoint joinPoint) throws Exception {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String browser = ClientInfoUtil.getBrowserInfo(request);
        String os = ClientInfoUtil.getOperatingSystem(request);
        String ip = ClientInfoUtil.getIP(request);

        try {
            MethodSignature signature = (MethodSignature) joinPoint.getSignature();
            Method method = signature.getMethod();
            SysLog sysLog = method.getAnnotation(SysLog.class);

            Client client1 = new Client();
            client1.setCreateBy(sysLog.operationType());
            client1.setRequestIp(ip);
            client1.setLogTip(sysLog.operationName());
            client1.setLogSys(os);
            client1.setLogBrowser(browser);
            client1.setCreateDate(new Date());
            sysLogService.save(client1);
        } catch (Exception e) {
            log.error("==后置通知异常==");
            log.error("异常信息:{}------" + e.getMessage());
            throw e;
        }
    }
}
```

---

# 配置参考

## 拦截器配置

```java
package com.nwa.until;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {
    @Autowired
    private CheckTokenInterceptor checkTokenInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(checkTokenInterceptor)
                .addPathPatterns("/home/**")
                .excludePathPatterns("/index/**", "/home/getLogList",
                        "/swagger-ui/**", "/swagger2.html", "/doc.html");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**").addResourceLocations("classpath:/static/");
        registry.addResourceHandler("swagger-ui.html")
                .addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("doc.html")
                .addResourceLocations("classpath:/META-INF/resources/");
    }
}
```

## Knife4j YML 配置

```yaml
knife4j:
  enable: true
  production: false
  basic:
    enable: false
    username: test
    password: 123
  setting:
    enableSearch: false
    enableHomeCustom: true
    homeCustomLocation: classpath:markdown/home.md
```

## 前端 Token 配置

```javascript
// 登录后保存 token
window.sessionStorage.setItem('token', data.token)

// 请求拦截器自动携带
request.interceptors.request.use(
  (config) => {
    config.headers.token = window.sessionStorage.getItem('token')
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)
```

---

# 使用示例

## Lombok 实体类

```java
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Client {
    private int userAcc;
    private String userPwd;
}
```

## 单元测试

```java
import lombok.extern.slf4j.Slf4j;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.annotation.Resource;

@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest
public class TestWiring {
    @Resource
    private DeviceTopoService deviceTopoService;

    @Test
    public void fun1() {
        DeviceTopoEntity info = deviceTopoService.getById(1);
        log.info(String.valueOf(info));
    }
}
```

## PageHelper 分页

```java
@Override
public ResultVO getMyWeekList(String months, String id, int page, int limit) {
    PageHelper.startPage(page, limit);
    List<Client> clientS = adHomeMapper.getMyWeekList(months, id);
    if (clientS != null) {
        PageInfo<Client> pageInfo = new PageInfo<>(clientS, 3);
        int count = (int) pageInfo.getTotal();
        return new ResultVO(ResStatus.OK, "列表信息返回成功!", count, clientS);
    }
    return resultVO;
}
```

## Fastjson2 接收参数

```java
@PostMapping("/login")
public ResultVO loginHome(@RequestBody JSONObject obj) {
    String userAcc = obj.getString("userAcc");
    String userPwd = obj.getString("userPwd");
    return indexService.login(userAcc, userPwd);
}
```

## Swagger 注解

```java
// 控制器类
@Api(value = "提供了后台主页面的各种接口", tags = "后台主页面接口")

// 控制器方法
@ApiOperation("修改密码")
@ApiImplicitParams({
    @ApiImplicitParam(dataType = "string", name = "userAcc", value = "账号", required = true),
    @ApiImplicitParam(dataType = "string", name = "newPassword", value = "新密码", required = true),
})
@PutMapping("/modifyPwd")

// 实体类
@ApiModel(value = "周报里面的实体", description = "封装的周报对象")
@ApiModelProperty("用户id")
```
