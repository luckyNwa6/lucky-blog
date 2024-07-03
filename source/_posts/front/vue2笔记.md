---
title: Vue2学习笔记
description: Vue 使用相关的学习笔记
cover: "https://imgs.luckynwa.top/blog/vueEleIcon.png"
categories: Front
tags: Vue
sticky: 1
comments: false
abbrlink: 41150
date: 2022-06-14 13:32:28
---

# 环境以及文件说明

环境：node-v14.0.0 终端打开 node -v 查看版本
软件：VsCode(其他) and HbuilderX(uniapp 使用)

脚手架搭建：
(1)先安装 node.js(必装,官网下载)
vue-cli 是 npm 上的一个-g 全局包（只要装一次）
(2)npm install -g cnpm --registry=https://registry.npmmirror.com
国内镜像下载快一点，最好用 yarn（亚），其次 cnpm，这些指令在终端运行
(3)cnpm install -g @vue/cli 安完这里，以后想创项目直接走第四步
(4)vue create 项目的名称

1.node_modules 文件夹：项目依赖文件
2.public 文件夹：放置静态资源（图片），webpack 在打包时会原封不动的打包到 dist 文件夹中。
3.src 文件夹（程序员源代码文件夹）：
3.1 assets 文件夹：放置静态资源比如 logo（多个组件共用的静态资源），在 webpack 打包时会把静态资源当成模块打包到 JS 文件中
3.2 components：放置非路由组件（全局组件）
3.3 APP.vue：唯一的根组件
3.4 main.js：程序入口文件，整个程序中最先执行的文件
3.5 router: 路由配置
3.6 store: vuex 配置
4.babel.config.js：配置文件（与 babel 相关），一般不去修改
5.package.json：相当于项目的身份证，配置信息，记录项目叫做什么、项目中有哪些依赖、项目怎么运行，
6.package-lock.json：可以删除，是一个缓存文件,锁定版本
7.README.md：说明性文件
8.views: 放页面

**-S 和-D 说明**

npm install jquery –S 命令，安装 –S 和–sava 完全一样，安装到 dependencies 节点下，不加也是默认这个地方,发布上线产品
npm install webpack@5.42.1 -D
@指定版本 -D 放在 devDependencies 节点，这个节点只是开发用到

# 常见指令

```shell
Ctrl+C  终端停止服务按2次
npm install  或npm i   安装所有安装包,一般用于使用他人项目前
npm uninstall 包名 -g   卸载全局的包
npm i 插件名 版本和节点看情况
npm run build   打包vue项目
npm run serve/dev  运行vue项目 具体指令看package.json里

yarn  安装全部包
yarn add  **
yarn remove **
```

# Vue 的使用和渲染指令

2 个特点：
数据驱动视图：使用 vue 的页面，vue 会监听数据的变化，从而自动重新渲染页面的结构
不过这个是单向的数据绑定类似 v-bind 简写:
双向数据绑定：主要用于表单数据绑定，让开发者不需要操作 Dom 前提下自动把用户填写的内容同步到数据源中

MVVM
model(页面渲染需要的数据源) view(视图即当前页面渲染的 dom 结构) viewModel(即 vue 说 vm 方便一点,核心)

指令：
v-text 渲染文本内容 标签属性名,值对应数据源里面

`{{}} 插值表达式 常用，类似<p>{{name}}</p> name 也是对应数据源里的,然后渲染`

v-html 把 html 标签的数据源渲染出来 属性名

v-bind 简写 ： 这就是数据驱动视图 它用来绑定属性名 如 :placeholder="tips"
就能把 placeholder 这个属性名动态绑定给数据源 tips

v-on 简写 @ 事件绑定 原生 DOM 对象有 onclick、oninput... 对应@click
或 v-on:click

v-model 数据双向绑定 一般用于 input 文本框、select 下拉框
属于它的 3 修饰符.number 输入值转数值类型 .trim 过滤首尾空白字符 .lazy 在 change 而非 input 更新

事件修饰符
<a href="某网站" @click.prevent="onLink">跳</a> 阻止 a 默认跳转行为
还能阻止表单的提交
.stop 阻止冒泡 .once 绑定事件只触发 1 次

v-if 指令会动态地创建或移除 DOM 元素，从而控制元素在页面上的显示与隐藏；
v-show 指令 style=“display: none;” 样式，从而控制元素的显示与隐藏；
v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。因此：
如果需要非常频繁地切换，则使用 v-show 较好
如果在运行时条件很少改变，则使用 v-if 较好

v-if
v-else -if
v-else 就类似 java 里的 if 语句

v-for 常用的列表渲染指令 (item, index) in items :key="item.id"
index 索引可选 key 唯一性 items 一般是列表
建议使用 v-for 指令时一定要指定 key 的值（既提升性能、又防止列表状态紊乱）

==运算符：只判断 2 边值是否相等，不判断类型
===运算符：类型和值都必须等

```shell
methods:{
        searchMusic:function(){
            var that=this;
            axios.get('https://autumnfish.cn/search?keywords='+that.query)
            //注意这里正常人用的都是+this.query
            //1.上面var that = this 此时他们指向是一样的，下面还会具体讲解-->
            .then(function(res){
                console.log(res)
                that.musicList = res.result.songs
                console.log(that.musicList)
                //2.下面分点讲解
                console.log(this.musiclist)
                //3.
            }),function(){
                console.log(err)
            }
        }
    }
```

this：在 js 中，this 用以指代当前对象，但是 this 随着程序进行，所处环境不同，也是会一直变化的（important）
这时候我们发现找不到 this 所指的对象了，之前说过 this 会发生变化，在这里 this 就是指向的函数的回调，不是之前挂载的 app, 所以在这一层是找不到 musiclist 的。 换一个角度解释，this 代表父函数，如果在子函数还用 this，this 的指向就变成子函数，that 是用来存储指向的。
所以用箭头函数 箭头函数没有自己的 this，它的 this 是继承而来，默认指向在定义它时所处的对象(宿主对象)。

# Vue 传值

## **父向子传值: 自定义属性**

```js

父组件:
<Son :msg="faMsg" ></Son>
data(){
  return{
    faMsg:'这是父组件的数据噢'
  }
}
子组件:
在p标签里可以直接{{msg}}使用
props:['msg'] 写在和data()同级
方法中拿值：this.$props.msg
```

## **子向父传值: 自定义事件**

```js
子组件：
比如点击了一个按钮触发下面方法
add(){
  this.count+=1
  this.$emit('addchange',this.cont)
}
父组件:
<Son @addchange="getNum"></Son>
methods：{
  getNum(val){
  console.log(val);
  }
}
```

## **兄弟传值：EventBus**

```js

新建一个文件夹叫eventBus.js
import Vue from 'vue'
let bus = new Vue()
Vue.prototype.$eventBus = bus
export default bus

兄弟A 和B都引入这个js
都要import bus from './eventBus.js'
  接收方mounted
    bus.$on('share', (val) => {
      console.log(val);
    })

    发送方 放一个方法里
    bus.$emit('share', this.msg)

```

## **路由传值**

```js
路由也能传值 通过 params传参通过name
this.$router.push({
          name: 'particulars',
          params: {
            id: id
          }
      })
对应路由
{
     path: '/particulars',
     name: 'particulars',
     component: particulars
   }
子接收
this.$route.params.id


http://192.168.15.115/ui?type=x6   这种
this.$route.query.type    拿值


```

# VueX

安装

```JS
npm i vuex
```

1、state: vuex 的基本数据，用来存储变量；
2、getters: 从基本数据（state）派生的数据，相当于 state 的计算属性；
3、mutations: 提交更新数据的方法，必须是同步的(如果需要异步使用 action)。每个 mutation 都有一个字符串的事件类型（type）和一个回调函数（handler）。
回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数，提交载荷作为第二个参数。
4、action: 和 mutation 的功能大致相同，不同之处在于 ①Action 提交的是 mutation，而不是直接变更状态，②Action 可以包含任意异步操作。
5、modules: 模块化 vuex，可以让每一个模块拥有自己的 state、mutation、action、 getters，使得结构非常清晰，方便管理。

store 文件夹下 新建 modules/user.js

```js
(1)index.js文件夹配置如下

import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
Vue.use(Vuex)
export default new Vuex.Store({
  strict: true,
  modules: {
    user
  }
})

(2)main.js也要声明

import store from './store'
new Vue({
  store,
  render: (h) => h(App)
}).$mount('#app')

(3)user.js

export default {
  state: {
    user: '', // 登录的用户
  },
  getters: {
    getUser(state) {
      return state.user
    }
  },
  mutations: {
    setUser(state, data) {
      state.user = data
    }
  },
  actions: {
    setUser({ commit }, data) {
      commit('setUser', data)
    }
  }
}

(4)使用

（11）{{$store.state.user}}   this.$store.getters.getUser

（22）Vuex规定必须通过mutation修改数据，不可以直接通过store修改状态数据

import { mapActions } from "vuex"; //通过这个设置值
import { mapGetters } from "vuex"; //通过这个获取值
  computed: {    //计算属性
    ...mapGetters(["getUser"])
  },
  watch: {   //监听vuex里的值变化
    // 获取vuex的登录状态
    getUser: function(val) {
      if (val === "") {          // 用户没有登录
      } else {}}},
  methods: {
  需要给user赋值时候直接this.setUser(值),拿调用this.getUser()
    ...mapActions(["setUser"]),
    }


```

# 浏览器存储数据

1. Cookie：浏览器关闭后，cookie 仍然存在，因此用户可以保持登录状态，容易受到[CSRF](https://so.csdn.net/so/search?q=CSRF&spm=1001.2101.3001.7020)（跨站请求伪造）攻击

2. SessionStorage：它只在当前会话中存在，当用户关闭浏览器后，sessionStorage 中的数据将被清除。这种方式的缺点是，如果用户在浏览器中打开新的标签页或窗口，那么新的页面将无法访问 sessionStorage 中的数据

3. LocalStorage：将 token 存储在 localStorage 中的优点是，即使在浏览器关闭后，localStorage 中的数据仍然存在，因此用户可以保持登录状态。此外，localStorage 中的数据可以在同一浏览器的所有标签页和窗口中共享。然而，localStorage 的缺点是容易受到 XSS（跨站脚本）攻击。

```js
(1)vue项目中
*****localStorage

let user = JSON.stringify(res.data.user)   字符串转成json格式
localStorage.setItem('user', user) 存
localStorage.getItem("user")   读取
JSON.parse(localStorage.getItem("user"))  json转为对象格式才能.出来，重点
localStorage.setItem("user", ""); 设为空
localStorage.removeItem('user')  //移除


*****sessionStorage

sessionStorage.setItem('token', data.token) 字符串格式不需要转
sessionStorage.getItem('token')   可以直接这样读,因为只存了一个token字符串
sessionStorage.setItem('ADMIN', JSON.stringify(data)) 存
sessionStorage.removeItem('user') 删


*****cookie

"vue-cookie": "^1.1.4",
import VueCookie from "vue-cookie"
Vue.use(VueCookie);

在request.js中发起请求拦截器里添加,记得先引入Vue
    config.headers["picToken"] = Vue.cookie.get("picToken"); // 请求头带上token
    return config;

this.$cookie.set("picToken", data.token);
this.$cookie.get('picToken')

(2)uniapp中

//存储token,只需要存字符串即可
uni.setStorageSync('token', res.data.data.token);  同步存
uni.setStorageSync('userInfo', JSON.stringify(res.data.data));

uni.clearStorageSync();  删
const obj=JSON.parse(uni.getStorageSync('userInfo')); 读

// 将字符串转json格式存本地
this.setUser(res.data.data);//存vuex里不需要转json,默认转对象,np
this.setToken(res.data.data.token);

其他地方vuex拿值
import { mapGetters } from 'vuex';
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    getMyMsg() { //不用转都能拿到
      getMyMsgs(this.getUser.userId).then(res => {
        console.log(this.getUser.token);
        this.myMsg = res.data.data;
      });
    }
  },

```

# vue2 过滤器使用

```js
import moment from 'moment';

Vue.filter('dateFormat', function (value, format) {
  return moment(value).format(format)
})

使用方法：
{{time | dateFormat('YYYY-MM-DD HH:mm:ss')}}


```

# 富文本编辑使用

vue2 去安装 sass ，node 版本最高支持 14.0
先卸载本来可能安装的

```shell
npm uninstall node-sass
npm uninstall sass-load
再删除node_modules文件夹


npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass
然后执行npm install node-sass
npm i sass-load即可
```

# 请求封装

```js
import axios from "axios";
import router from "../router";

const request = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json;charset=utf-8";

    // config.headers['token'] = user.token;  // 设置请求头
    //取出sessionStorage里面缓存的用户信息
    let userJson = sessionStorage.getItem("user");
    if (!userJson) {
      router.push("/login");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
  (response) => {
    let res = response.data;
    // 如果是返回的文件
    if (response.config.responseType === "blob") {
      return res;
    }
    // 兼容服务端返回的字符串数据
    if (typeof res === "string") {
      res = res ? JSON.parse(res) : res;
    }
    return res;
  },
  (error) => {
    console.log("err" + error); // for debug
    return Promise.reject(error);
  }
);

export default request;
```

# 生命周期

`new Vue()`之后，分别经过了以上几个阶段，分别是**1 初始化阶段**，**2 模板编译阶段**，**3 挂载阶段**，**4 更新阶段**，**5 销毁阶段**

1、首先做一些初始化操作，主要是设置一些私有属性到 vue 实例中。运行生命周期钩子函数 beforeCreate

进入注入流程，处理属性，computed，methods，data，provide，inject，最后使用代理模式将这些属性挂载到实例中。运行生命周期钩子函数 created

2、生成`render`函数：如果有配置，直接使用配置的`render`函数，如果没有，使用运行时编译器，把模板编译成`render`函数

3、运行生命周期钩子函数 beforeMount，传入一个函数 updeteCompontent，该函数会运行 render 函数，并把 render 函数的返回结果作为参数给\_updete 函数执行。
在执行 render 函数的过程中会搜集所有依赖，将来依赖发生变换时会出现执行 updateCompontent 函数。在执行\_update 的过程中，会触发 patch 函数，由于目前还没有就的虚拟 DOM 树，因此直接为当前的虚拟 DOM 树的每一个节点生成对应 elm 属性，即真实 DOM。如果遇到创建一个组件实例的 vnode，则会进入组件实例化流程，该流程同 vue 实例流程，同上初始化阶段，编译阶段，挂载阶段。最终会把创建好的组件实例挂载到 vnode 的 compontentInstance 属性中，以便复用。运行生命周期钩子函数 mounted
4、运行生命周期钩子函数 beforeUpdate。在执行 render 函数的过程中，会先去掉之前的依赖，重新收集新的依赖，将来依赖发生变化时出现运行 updateCompontent 函数。在执行 update 函数的过程中，会触发 patch 函数，对比新旧两棵 DOM 树：

当对比两棵 DOM 树的节点的时候，有两种情况，分别：

普通 html 节点

普通 html 节点的对比会导致真实节点被创建，删除，移动，更新

组件节点

组件节点的对比会导致组件被创建，删除，移动，更新。

a）组件节点创建的时，进入组件实例化流程，同上初始化阶段，编译阶段，挂载阶段。

b）当旧组件节点删除时，会调用旧组件的$destroy方法删除组件，该方法会触发生命周期钩子函数beforeDestroy，然后递归调用组件的$destroy 方法，然后出发生命周期钩子函数 destroyed

c）当组件更新时，相当于组件的 updateCompontent 函数被重新触发，进入渲染流程，同更新阶段

运行生命周期钩子函数 updated
5、当组件销毁的时候，会调用组件的`$destroy`方法删除组件，该方法会调用`beforeDestroy`和`destroyed`方法

生命周期都是方法：

```js
 beforeCreate() {
    console.log("A beforeCreate");
  },
  created() {
    console.log("A created");
  },
  beforeMount() {
    console.log("A beforeMount");
  },
  mounted() {
    console.log("A mounted");
  },
  beforeUpdate() {
    console.log("A beforeUpdate");
  },
  updated() {
    console.log("A updated");
  },
  beforeDestroy() {
    console.log("A beforeDestroy");
  },
  destroyed() {
    console.log("A destroyed");
  },



methods:{

}

data() {
    return {

    };
  },

activated() {


}
 watch: {
    check() {
      this.flag.check = this.check;
    },

  },
```

# 引入样式或者 js

```js
@import './assets/css/index.css';  //本地

@import url('https://at.alicdn.com/t/c/font_4406297_ebaqc2j4n1e.css'); //外部


import { yh } from '@/assets/js/yinHua.js'
  created() {
    yh
  }
```

# 遇到的问题

1、如果后端传过来的值
有转义符号，则需要前端转 2 次 JSON.parse()，第一次转完是字符串格式，还不能点出来数据，因为是字符串
