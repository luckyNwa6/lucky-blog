---
title: Token
description: 深入理解token的使用
cover: "https://imgs.luckynwa.top/blog/tokenIcon.png"
categories: Java
tags: Token
comments: false
abbrlink: 53014
date: 2023-09-27 23:32:28
---

# 双 token

Token（令牌）是在网络通信中用于验证身份和授权访问的一种机制。它是一串随机生成的字符串，用于标识用户的身份信息和权限。服务器可以根据令牌对用户进行身份鉴别，确保请求的合法性。令牌可以包含用户的权限信息，服务器可以根据令牌中的权限信息进行授权访问控制。令牌可以具有加密和签名等安全机制，保证信息的机密性和完整性。这样即使令牌被截获，也不能被篡改或者伪造。

假如 token 没有过期时间或者过期很长，那么显然 token 被劫持还是不安全的，token 就失去了意义。

所以这时候大家肯定都想：那么把 token 过期时间设置的短一点就行啦？

是的，一般来讲 accessToken 的过期时间应该要短一点，但是这时候对于用户来讲就麻烦了。

因为 token 过期就意味着要重新登录，想象下你正浏览的好好的，突然让你掉线了并且要求你重新登录，心里肯定是想骂人的。

什么时候需要用户重新登录？

主要有三种情况：

1.用户长时间无操作，也可以定义未不活跃用户，就会被自动踢下，自动重定向到登录页面，超时时间可以自定义设置；
2.token 失效，通常是双 token 都失效后，会要求重新登录获取新的双 token； 3.当检测到有风险的时候，可以要求重新登录，获取 token；

因此这时候就可以使用双 token 的设计，当两个 token 都过期了再要求用户重新登录，对于 refreshToken，它只用来获取 accessToken,不会频繁被用于请求，对于 accessToken，它过期时间非常短，即使被拦截了解密也需要时间，而 token 本身也很快过期，因此这样的设计更加安全。

推荐做响应拦截器中拦截，后端判断 token 返回过期后，调用刷新 token 接口

```JS
/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
  config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
  config.headers['language'] = localStorage.getItem("language") // 请求头带上中英文切换
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
  if (response.data && response.data.code === 401) { // 401, token失效
    clearLoginInfo()
    router.push({ name: 'login' })
  }
  return response
}, error => {
  return Promise.reject(error)
})

```

# 基于 oauth2 的单点登录及鉴权
