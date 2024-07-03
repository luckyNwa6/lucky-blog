---
title: RuleAv规则引擎与Validation
description: 参数校验
cover: "https://imgs.luckynwa.top/blog/ruleIcon.png"
categories: Java
tags: Java
comments: false
abbrlink: 57942
date: 2023-10-11 13:32:22
---

# 规则引擎

依赖

```XML
        <!--规则引擎AviatorScript-->
        <dependency>
            <groupId>com.googlecode.aviator</groupId>
            <artifactId>aviator</artifactId>
            <version>5.3.3</version>
        </dependency>
```

封装成 bean

```JAVA
package com.nwa.config;

import com.googlecode.aviator.AviatorEvaluator;
import lombok.Data;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import com.googlecode.aviator.Expression;

import java.io.IOException;
import java.util.Map;

/**
 * @Author Lucky友人a
 * @Date 2023/8/31 -14:09
 */
@Component
@Data
public class RuleAv{
    private  Expression exp;
    public RuleAv() {
        try {
            String scriptPath = new ClassPathResource("script/photoController.av").getPath();
            exp = AviatorEvaluator.getInstance().compileScript(scriptPath);
        } catch (IOException e) {
            System.out.println("Error loading script file: " + e.getMessage());
        }
    }


}

```

注入

```JAVA
 @Resource
 private RuleAv ruleAv;

       Map<String, Object> context=new HashMap<>();//传入参数
        context.put("acc",acc);
        Boolean flag =(Boolean) ruleAv.getExp().execute(context);
        if (!flag) {
            return R.error("格式有误！");
        }
```

脚本位置放在项目 src\main\resources 下面新建文件夹 script，文件名 photoController.av

```js
let regex = /^[a-zA-Z]{5,10}$/;
println(regex);
return (acc = ~regex);
```

demo----测试类

```java
package com.nwa.other;

import com.googlecode.aviator.AviatorEvaluator;
import com.googlecode.aviator.Expression;
import org.junit.Test;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


/**
 * @Author Lucky友人a
 * @Date 2023/8/10 -19:17
 */
public class RuleDemo {
    @Test
    public void testHello() throws Exception {

        //AviatorScript脚本的运行，分为两步，编译和执行
        //编译支持编译脚本文件和脚本文本，分别使用compileScript和compile方法。
        //编译产生的  Expression 对象，最终都是调用 execute() 方法执行。
        //这里有个重要能力，execute 方法可以接受一个变量列表组成的 map，来注入执行的上下文
        //获取路径
        ClassPathResource resource = new ClassPathResource("script/rule.av");
        String scriptPath = resource.getPath();
        //编译
        Expression exp = AviatorEvaluator.getInstance().compileScript(scriptPath);//compileScripti编译路径脚本
        //执行
        exp.execute();

        //定义脚本
        String script2 = "println(\"Hello, AviatorScript!\");";
        //编译
        Expression exp2 = AviatorEvaluator.getInstance().compile(script2); //compile编译自定义脚本
        //执行
        exp2.execute();

//-----------------------------------------------
        String expression = "a-(b-c) > 100";
        Expression compiledExp = AviatorEvaluator.compile(expression);
//上下文
        double a = 100.3, b = 45, c = -199.100;
        Map<String, Object> context = new HashMap<>();
        context.put("a", a);
        context.put("b", b);
        context.put("c", c);
//通过注入的上下文执行
        Boolean result = (Boolean) compiledExp.execute(context);
        System.out.println(result);
    }

    @Test
    public void demo2() throws IOException {

        Expression exp = AviatorEvaluator.getInstance().compileScript(new ClassPathResource("script/rule.av").getPath()); //获取规则
        Map<String, Object> context = new HashMap<>();//传入参数
        context.put("amount", 1000);
        context.put("rating", 2);
        //通过注入的上下文执行
        String result = (String) exp.execute(context);
        System.out.println(result);
        //它还能解析一个实例对象，脚本里直接调用testBeanIns.print(testBean);这个实例的print的方法
//        AviatorEvaluator.addInstanceFunctions("testBeanIns", TestBean.class);
//        Expression exp = AviatorEvaluator.getInstance().compileScript("example.av", true);//true是开启缓存
//        Map<String, Object> env = new HashMap<String, Object>();
//        env.put("testBean", testBean);
//        exp.execute(env);
    }

    @Test
    public void fun88() throws IOException {
        Expression exp = AviatorEvaluator.getInstance().compileScript(new ClassPathResource("script/rule.av").getPath()); //获取规则
        Map<String, Object> context = new HashMap<>();//传入参数
        context.put("acc", "lucky");
        Boolean result = (Boolean) exp.execute(context);
        System.out.println(result);
    }
}

```

# Spring Validation

https://blog.51cto.com/u_15964717/6093652

如果 spring-boot 版本小于 2.3.x，spring-boot-starter-web 会自动传入 hibernate-validator 依赖；

如果 spring-boot 版本大于 2.3.x，则需要手动引入依赖：

```xml
        <dependency>
            <groupId>org.hibernate</groupId>
            <artifactId>hibernate-validator</artifactId>
            <version>6.0.18.Final</version>
        </dependency>
```

参数异常即中断

```java
package com.nwa.config;

import org.hibernate.validator.HibernateValidator;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.beanvalidation.MethodValidationPostProcessor;

import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;


/**
 * web参数验证配置
 *
 * @author luckyNwa
 * @date 2023/10/20
 */
@Configuration
public class WebParamValidateConfig {
    @Bean
    public Validator validator() {
        ValidatorFactory validatorFactory = Validation.byProvider(HibernateValidator.class)
                .configure()
                .failFast(true)   //只要出现校验失败的情况，就立即结束校验，不再进行后续的
                .buildValidatorFactory();
        return validatorFactory.getValidator();
    }

    @Bean
    public MethodValidationPostProcessor methodValidationPostProcessor() {
        MethodValidationPostProcessor methodValidationPostProcessor = new MethodValidationPostProcessor();
        methodValidationPostProcessor.setValidator(validator());
        return methodValidationPostProcessor;
    }
}
```

自定义异常处理器

```JAVA
package com.nwa.common.exception;

import com.nwa.common.untils.Constant;
import com.nwa.common.untils.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import javax.validation.ConstraintViolationException;

/**
 * 处理自定义异常
 *
 * @author luckyNwa
 * @date 2023/10/16
 */
@RestControllerAdvice
@EnableWebMvc  //开启这个和配置mvc才能自定义404页面信息返回
@Slf4j
public class RRExceptionHandler {
    @ExceptionHandler(LukcyException.class)//继承运行时异常
    public R handleRRException(LukcyException e) {
        R r = new R();
        r.put("code", e.getCode());
        r.put("msg", e.getMessage());
        return r;
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public R noHandlerFoundException(Exception e) {
        log.error("路径不存在，请检查接口是否正确," + e.getMessage());
        return R.error(404, "路径不存在，请检查接口是否正确");
    }

    @ExceptionHandler(DuplicateKeyException.class)
    public R duplicateKeyException(DuplicateKeyException e) {
        log.error("数据库中已存在该记录" + e.getMessage());
        return R.error(400, "数据库中已存在该记录");
    }


//    @ExceptionHandler(HttpMessageNotReadableException.class)
//    @ResponseBody
//    public R HttpMessageNotReadableExceptionHandler(HttpMessageNotReadableException e) {
//        log.error(e.getMessage());
//        return R.error(Constant.VALIDATOR_ERROR, Constant.PARAM_ERROR);
//    }

    /**
     * 处理请求参数格式错误 @RequestBody上使用@Valid 实体上使用@NotNull等，验证失败后抛出的异常是MethodArgumentNotValidException异常
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseBody
    public R methodArgumentNotValidException(MethodArgumentNotValidException e) {
        log.error(e.getBindingResult().getFieldError().getDefaultMessage());
        return R.error(Constant.VALIDATOR_ERROR, e.getBindingResult().getFieldError().getDefaultMessage());
    }


    /**
     * 处理Get请求中 使用@Valid 验证路径中请求实体校验失败后抛出的异常
     */
    @ExceptionHandler(BindException.class)
    @ResponseBody
    public R BindExceptionHandler(BindException e) {
        log.error(e.getBindingResult().getFieldError().getDefaultMessage());
        return R.error(Constant.VALIDATOR_ERROR, e.getBindingResult().getFieldError().getDefaultMessage());
    }

    /**
     * 处理请求参数格式错误 @RequestParam上validate失败后抛出的异常是ConstraintViolationException
     */
    @ExceptionHandler(ConstraintViolationException.class)
    @ResponseBody
    public R ConstraintViolationExceptionHandler(ConstraintViolationException e) {
        log.error(e.getMessage());
        return R.error(Constant.VALIDATOR_ERROR, e.getMessage());
    }


    @ExceptionHandler(Exception.class)//最大的异常处理
    public R handleException(Exception e) {
        log.error(e.getMessage());
        return R.error();
    }
}

```

```JAVA
package com.nwa.common.exception;

public class LukcyException extends RuntimeException {
    private static final long serialVersionUID = 1L;

    private String msg;
    private int code = 400;

    public LukcyException(String msg) {
        super(msg);
        this.msg = msg;
    }

    public LukcyException(String msg, Throwable e) {
        super(msg, e);
        this.msg = msg;
    }

    public LukcyException(String msg, int code) {
        super(msg);
        this.msg = msg;
        this.code = code;
    }

    public LukcyException(String msg, int code, Throwable e) {
        super(msg, e);
        this.msg = msg;
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }


}

```

返回类

```JAVA
package com.nwa.common.untils;

import java.util.HashMap;
import java.util.Map;

/**
 * 返回数据
 */
public class R extends HashMap<String, Object> {
    private static final long serialVersionUID = 1L;

    public R() {
        put("code", 200);
        put("msg", "数据返回成功!");
    }

    public static R error() {
        return error(500, "未知异常，请联系管理员");
    }

    public static R error(String msg) {
        return error(400, msg);
    }

    public static R error(int code, String msg) {
        R r = new R();
        r.put("code", code);
        r.put("msg", msg);
        return r;
    }

    public static R ok(String msg) {
        R r = new R();
        r.put("msg", msg);
        return r;
    }

    public static R ok(Map<String, Object> map) {
        R r = new R();
        r.putAll(map);
        return r;
    }

    public static R ok() {
        return new R();
    }

    public R put(String key, Object value) {
        super.put(key, value);
        return this;
    }
}

```

分组

```JAVA
 @NotEmpty(message = "添加课程名称不能为空",groups={ValidationGroups.Inster.class})
 @NotEmpty(message = "修改课程名称不能为空",groups={ValidationGroups.Update.class})
 @ApiModelProperty(value = "课程名称", required = true)
 private String name;
```

```JAVA
public class ValidationGroups {

 //用于添加校验
 public interface Inster{};
 //用于修改校验
 public interface Update{};
 public interface Delete{};

}
```

调用在 Controller 方法上，选择方式

```java
@Validated(ValidationGroups.Inster.class)
```
