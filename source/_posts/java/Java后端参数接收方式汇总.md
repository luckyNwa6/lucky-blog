---
title: Java后端参数接收方式汇总
description: 业精于勤，荒于嬉；行成于思，毁于随
cover: https://imgs.luckynwa.top/openApi/lucky/yys/445
categories: 后端
tags: Java
comments: true
abbrlink: java4
summary: >-
  本篇文章详细介绍了后端代码接收和解析前端请求参数的多种方法，包括GET和POST请求的不同处理方式。文章从基础的URL参数传参、请求体JSON解析、表单数据处理等角度出发，具体讲解了使用@RequestParam、@RequestBody、@PathVariable等注解接收参数的原理和注意事项，例如参数名匹配、必填设置、默认值处理等。同时展示了传统方式如HttpServletRequest获取参数，以及RESTful风格传参和复杂场景如Map接收参数、JSON对象解析、权限校验、日志记录等实际应用示例，涵盖了Spring MVC中常见的参数接收技术和相关框架集成方法，帮助开发者理解并选择适合不同场景的参数处理方式。
date: 2023-08-22 06:50:40
---

# 前言

在后端开发中，正确接收和解析前端传来的参数是基础且关键的环节。本文将详细介绍 Spring MVC 中常见的参数接收方式，帮助开发者根据实际场景选择最合适的方案。

# 基础概念

**请求数据格式**

- 对于 GET 方法，会将数据转换为 query string。例如 `{ name: 'name', age: 18 }` 转换后的结果是 `name=name&age=18`。

- 对于 POST 方法且 `header['content-type']` 为 `application/json` 的数据，会进行 JSON 序列化。

- 对于 POST 方法且 `header['content-type']` 为 `application/x-www-form-urlencoded` 的数据，会将数据转换为 query string。

**前端传递注意事项**

如果前端是 POST 请求，后端直接指定请求字段，那么前端发送的需要 qs 包装一下：

```javascript
this.$qs.stringify({ acc: this.form.acc, pwd: this.form.pwd })
```

# 方法一：简单参数传参

```java
@RequestMapping("/method01")
public String method01(String name, Integer age, Double mon) {
    User user = new User();
    user.setName(name);
    user.setAge(age);
    user.setMoney(mon);
    return JSON.toJSONString(user);
}
```

这种方式接收的是 `method01?name=zhangsan&age=15&mon=20.0` 格式的传参，并且要求参数名与 URL 地址中携带的参数名完全一致。

这种形式传参与请求方式无关，GET、POST、PUT 等皆可使用。

# 方法二：@RequestParam 注解

```java
@RequestMapping(value = "/method02")
public String method02(@RequestParam("name") String name,
                       @RequestParam("age") Integer age,
                       @RequestParam(value = "money", required = false) Double mon) {
    User user = new User();
    user.setName(name);
    user.setAge(age);
    user.setMoney(mon);
    return JSON.toJSONString(user);
}
```

方式原理上与第一种一致，都是接收请求 URL 地址中的参数，所以与请求方式无关。

这种方式注解中的 value 值会去映射请求 URL 中的同名参数取参然后赋值给加注解的形参，所以注解中的参数名必须与 URL 中一致，而方法形参名可以根据自身需求灵活变更。

**注意事项**

- 加此注解的 `required` 属性默认为 `true`，也就是接收请求时会根据 value 去 URL 寻找同名参数，如果没找到会报错。
- 所以如果有某一参数可能不传的情况，需要将 `required` 属性设为 `false`。

# 方法三：@RequestBody JSON 接收

```java
@RequestMapping(value = "/method03")
public String method03(@RequestBody User user) {
    return JSON.toJSONString(user);
}
```

`@RequestBody` 则是接收请求体中的 JSON 字符串参数直接映射实体对象，所以 body 类型必须是 JSON 字符串。

**注意事项**

- 实体类中的属性名称必须与 JSON 串中的参数 key 名称完全一致，不同名参数无法正确接收。
- 通常 GET 请求通过 URL 携带参数可以根据 URL 作为 key 缓存资源，常用的静态资源服务器都是这种原理，如果参数在 body 中这种方式就失效了。
- 适用于 POST 请求携带 body 参数。

# 方法四：实体类直接接收

```java
@RequestMapping(value = "/method04")
public String method04(User user) {
    return JSON.toJSONString(user);
}
```

这种方式要求请求中的参数名与实体中的属性名一致即可自动映射到实体属性中。

**支持的传参方式**

- 支持 URL 拼接的多个 params 传参
- 支持 POST 请求的 form 类型传参（form-data、x-www-form-urlencoded）
- 不支持 JSON 传参

# 方法五：HttpServletRequest 获取

```java
@RequestMapping("/method05")
public String method05(HttpServletRequest request) {
    User user = new User();
    user.setName(request.getParameter("name"));
    user.setAge(Integer.valueOf(request.getParameter("age")));
    user.setMoney(Double.parseDouble(request.getParameter("money")));
    return JSON.toJSONString(user);
}
```

传统的接收参数方式，可以接收 URL params 传参，支持 POST form 类型传参，不支持 JSON 传参。

**注意事项**

- 如果请求中未传递指定名称的参数，取参时会报错，需要做好空值处理。

# 方法六：@PathVariable RESTful 风格

```java
@RequestMapping(value = {"/method06/{name}/{age}/{money}", "/method06/{name}/{money}"})
public String method06(@PathVariable("name") String name,
                       @PathVariable(value = "age", required = false) Integer age,
                       @PathVariable("money") Double money) {
    User user = new User();
    user.setName(name);
    user.setMoney(money);
    user.setAge(age);
    return JSON.toJSONString(user);
}
```

通过 `@PathVariable` 实现 RESTful 风格传参，直接将参数拼接到 URL 地址中，支持 GET、POST、PUT、DELETE 等多种请求。

**注意事项**

- `required` 属性默认为 `true`，不传递参数会报错。
- 如果出现某个参数未传递的情况，可以通过设置 `required` 属性为 `false` 并设置多个 value 字符串的形式实现。

# 方法七：Map 接收查询参数

```java
@GetMapping("/list")
@RequiresPermissions("sys:config:list")
public R list(@RequestParam Map<String, Object> params) {
    PageUtils page = sysConfigService.queryPage(params);
    return R.ok().put("page", page);
}
```

适用于接收不确定数量的查询参数，常用于分页查询等场景。通过 `@RequestParam Map` 可以灵活获取所有传递的参数。

# 方法八：路径参数与权限校验

```java
@GetMapping("/info/{id}")
@RequiresPermissions("sys:config:info")
public R info(@PathVariable("id") Long id) {
    SysConfigEntity config = sysConfigService.getById(id);
    return R.ok().put("config", config);
}
```

结合 `@PathVariable` 获取路径参数，并使用 `@RequiresPermissions` 进行权限校验，是实际项目中常见的写法。

# 方法九：JSON 实体接收与参数校验

```java
@SysLog("保存配置")
@PostMapping("/save")
@RequiresPermissions("sys:config:save")
public R save(@RequestBody SysConfigEntity config) {
    ValidatorUtils.validateEntity(config);
    sysConfigService.saveConfig(config);
    return R.ok();
}
```

使用 `@RequestBody` 接收 JSON 实体，配合参数校验工具和日志注解，是保存数据的标准写法。

# 方法十：JSONObject 灵活接收

```xml
<dependency>
    <groupId>com.alibaba.fastjson2</groupId>
    <artifactId>fastjson2</artifactId>
    <version>2.0.7</version>
</dependency>
```

```java
@PostMapping("/login")
public ResultVO loginHome(@RequestBody JSONObject obj) {
    String userAcc = obj.getString("userAcc");
    String userPwd = obj.getString("userPwd");
    return indexService.login(userAcc, userPwd);
}
```

当请求参数结构不固定或需要动态获取字段时，可以使用 `JSONObject` 接收，然后通过 `getString`、`getList` 等方法灵活取值。

# 总结

Spring MVC 提供了丰富的参数接收方式，开发者应根据实际场景选择合适的方法：

- 简单键值对传参优先使用 `@RequestParam`
- JSON 数据接收使用 `@RequestBody`
- RESTful 风格使用 `@PathVariable`
- 灵活场景可使用 `Map` 或 `JSONObject`

掌握这些方法能够帮助开发者更加高效地处理前后端数据交互，提升代码的可读性和可维护性。
