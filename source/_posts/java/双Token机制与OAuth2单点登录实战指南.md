---
title: 双Token机制与OAuth2单点登录实战指南
description: 大鹏一日同风起，扶摇直上九万里
cover: https://cloud.luckynwa.top/profile/yys/67.webp
categories: 后端
tags: Token
comments: true
abbrlink: java8
summary: >-
  本文深入解析网络通信中Token（令牌）的核心机制与安全设计。Token作为身份验证和授权访问的凭证，通过加密签名保障信息安全，但过长的过期时间会带来安全风险。为平衡安全性与用户体验，引入双Token机制：accessToken用于频繁请求且过期时间短，refreshToken用于获取新accessToken且不易被滥用。文章详细介绍了双Token的工作流程、三种需要重新登录的场景、响应拦截器处理token过期的代码实现，以及基于OAuth2的单点登录与鉴权原理，为构建安全高效的认证体系提供完整解决方案。
date: 2025-01-19 00:53:54
---

# 双 Token

## 什么是 Token

Token（令牌）是在网络通信中用于验证身份和授权访问的一种机制。它是一串随机生成的字符串，用于标识用户的身份信息和权限。服务器可以根据令牌对用户进行身份鉴别，确保请求的合法性。令牌可以包含用户的权限信息，服务器可以根据令牌中的权限信息进行授权访问控制。令牌可以具有加密和签名等安全机制，保证信息的机密性和完整性。这样即使令牌被截获，也不能被篡改或者伪造。

## 为什么需要双 Token

假如 token 没有过期时间或者过期很长，那么显然 token 被劫持还是不安全的，token 就失去了意义。

所以这时候大家肯定都想：那么把 token 过期时间设置的短一点就行啦？

是的，一般来讲 accessToken 的过期时间应该要短一点，但是这时候对于用户来讲就麻烦了。

因为 token 过期就意味着要重新登录，想象下你正浏览的好好的，突然让你掉线了并且要求你重新登录，心里肯定是想骂人的。

## 什么时候需要用户重新登录

主要有三种情况：

1. 用户长时间无操作，也可以定义为不活跃用户，就会被自动踢下，自动重定向到登录页面，超时时间可以自定义设置
2. token 失效，通常是双 token 都失效后，会要求重新登录获取新的双 token
3. 当检测到有风险的时候，可以要求重新登录，获取 token

## 双 Token 机制详解

因此这时候就可以使用双 token 的设计，当两个 token 都过期了再要求用户重新登录。对于 refreshToken，它只用来获取 accessToken，不会频繁被用于请求；对于 accessToken，它过期时间非常短，即使被拦截了解密也需要时间，而 token 本身也很快过期，因此这样的设计更加安全。

### Token 类型对比

| 特性     | accessToken       | refreshToken                    |
| -------- | ----------------- | ------------------------------- |
| 用途     | 访问受保护资源    | 刷新 accessToken                |
| 过期时间 | 短（15-30分钟）   | 长（7-30天）                    |
| 使用频率 | 频繁（每次请求）  | 低频（仅在 accessToken 过期时） |
| 存储位置 | 内存/localStorage | HttpOnly Cookie                 |
| 泄露风险 | 高（频繁传输）    | 低（仅特定接口使用）            |

### 双 Token 工作流程

```
用户登录 → 服务器返回 accessToken + refreshToken
    ↓
携带 accessToken 请求接口
    ↓
accessToken 有效 → 正常返回数据
    ↓
accessToken 过期 → 携带 refreshToken 请求刷新接口
    ↓
refreshToken 有效 → 返回新的 accessToken
    ↓
refreshToken 过期 → 跳转登录页，要求重新登录
```

## 响应拦截器处理 Token 过期

推荐在响应拦截器中拦截，后端判断 token 返回过期后，调用刷新 token 接口：

```javascript
// 请求拦截
http.interceptors.request.use(
  (config) => {
    config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
    config.headers['language'] = localStorage.getItem('language') // 请求头带上中英文切换
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截
http.interceptors.response.use(
  (response) => {
    if (response.data && response.data.code === 401) {
      // 401, token失效
      clearLoginInfo()
      router.push({ name: 'login' })
    }
    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)
```

### 完善的双 Token 刷新实现

```javascript
let isRefreshing = false
let requests = []

http.interceptors.response.use(
  (response) => {
    const { code } = response.data

    if (code === 401) {
      if (!isRefreshing) {
        isRefreshing = true

        // 调用刷新 token 接口
        return http
          .post('/auth/refresh', {
            refreshToken: getRefreshToken(),
          })
          .then((res) => {
            const { accessToken, refreshToken } = res.data
            setAccessToken(accessToken)
            setRefreshToken(refreshToken)

            // 重新执行之前失败的请求
            requests.forEach((cb) => cb(accessToken))
            requests = []

            // 重新执行当前请求
            return http(response.config)
          })
          .catch((err) => {
            // 刷新失败，跳转登录页
            clearLoginInfo()
            router.push({ name: 'login' })
            return Promise.reject(err)
          })
          .finally(() => {
            isRefreshing = false
          })
      }

      // 正在刷新中，将请求加入队列
      return new Promise((resolve) => {
        requests.push((token) => {
          response.config.headers['token'] = token
          resolve(http(response.config))
        })
      })
    }

    return response
  },
  (error) => {
    return Promise.reject(error)
  },
)
```

# 基于 OAuth2 的单点登录及鉴权

## OAuth2 简介

OAuth2 是一个授权框架，允许第三方应用在不暴露用户密码的情况下，获得用户资源的访问权限。它通过令牌（Token）机制实现授权，是目前最流行的单点登录（SSO）解决方案之一。

## OAuth2 四种授权模式

### 1. 授权码模式（Authorization Code）

最安全、最常用的模式，适用于有后端的 Web 应用：

```
用户 → 第三方应用 → 授权服务器
    ↓
用户授权 → 返回授权码（code）
    ↓
第三方应用 → 用授权码换取 access_token
    ↓
获得 access_token → 访问用户资源
```

### 2. 隐式模式（Implicit）

简化版授权码模式，适用于纯前端应用（如 SPA）：

```
用户 → 前端应用 → 授权服务器
    ↓
用户授权 → 直接返回 access_token（无授权码环节）
    ↓
前端应用 → 使用 access_token 访问资源
```

### 3. 密码模式（Resource Owner Password Credentials）

适用于高度信任的第三方应用：

```
用户 → 提供用户名密码 → 第三方应用
    ↓
第三方应用 → 用用户名密码向授权服务器换取 access_token
    ↓
获得 access_token → 访问用户资源
```

### 4. 客户端凭证模式（Client Credentials）

适用于机器对机器（M2M）的授权：

```
第三方应用 → 直接向授权服务器申请 token
    ↓
提供 client_id 和 client_secret
    ↓
获得 access_token → 访问资源
```

## 单点登录（SSO）原理

单点登录允许用户在多个应用系统中，只需登录一次就可以访问所有相互信任的应用系统。

### SSO 工作流程

```
用户 → 访问应用A → 未登录 → 重定向到SSO认证中心
    ↓
用户输入账号密码 → SSO认证中心验证
    ↓
验证通过 → 返回 Ticket 给应用A
    ↓
应用A → 携带 Ticket 向SSO验证 → 获取用户信息
    ↓
用户登录应用A → 访问应用B → 未登录 → 重定向到SSO认证中心
    ↓
SSO检测到已登录 → 直接返回 Ticket 给应用B
    ↓
应用B → 携带 Ticket 向SSO验证 → 获取用户信息
    ↓
用户无需再次登录 → 访问应用B成功
```

## JWT（JSON Web Token）

JWT 是 OAuth2 中常用的令牌格式，由三部分组成：

```
Header.Payload.Signature

Header: {
  "alg": "HS256",
  "typ": "JWT"
}

Payload: {
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "exp": 1516242622
}

Signature: HMACSHA256(base64(header) + "." + base64(payload), secret)
```

### JWT vs Session

| 特性     | JWT                | Session              |
| -------- | ------------------ | -------------------- |
| 存储位置 | 客户端             | 服务器               |
| 扩展性   | 无状态，易于分布式 | 有状态，需要共享存储 |
| 性能     | 无需查询数据库     | 需要查询数据库       |
| 安全性   | 可被篡改（需签名） | 依赖服务器安全       |
| 跨域     | 天然支持           | 需要特殊配置         |

## OAuth2 安全最佳实践

1. **使用 HTTPS**：所有 OAuth2 通信都应使用 HTTPS，防止令牌在传输过程中被窃取
2. **短期令牌**：access_token 应设置较短的过期时间（如15分钟）
3. **刷新令牌轮换**：每次使用 refresh_token 时，都应返回一个新的 refresh_token
4. **令牌绑定**：将令牌与特定客户端或设备绑定，防止令牌被盗用
5. **最小权限原则**：只申请必要的权限范围（scope）
6. **安全存储**：refresh_token 应存储在 HttpOnly Cookie 中，防止 XSS 攻击
