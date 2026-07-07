---
title: Vite项目框架搭建
cover: https://cloud.luckynwa.top/profile/yys/62.webp
description: 学而不思则罔，思而不学则殆
categories: 前端
tags: Vue
comments: true
abbrlink: front11
summary: >-
  本教程详细介绍如何使用Vite搭建Vue3+TypeScript后台管理系统模板。涵盖环境配置、pnpm包管理工具使用、ESLint代码校验、Prettier代码格式化、Stylelint样式检查、Husky Git钩子、Commitlint提交规范等完整工程化配置。同时集成Element Plus UI组件库、SVG图标封装、Sass预处理器、Axios网络请求封装、环境变量配置等核心功能。通过本教程可快速搭建规范化的Vue3项目开发环境，提升团队协作效率和代码质量。
date: 2025-02-10 09:59:36
---

## 1、搭建后台管理系统模板

### 环境准备

- node v16.20.1
- pnpm 8.10.2

### 初始化项目

本项目使用vite进行构建，vite官方中文文档参考：[cn.vitejs.dev/guide/](https://cn.vitejs.dev/guide/)

**pnpm:performant npm，意味"高性能的npm"。pnpm由npm/yarn衍生而来，解决了npm/yarn内部潜在的bug，极大的优化了性能，扩展了使用场景。被誉为"最先进的包管理工具"**

pnpm安装指令

```shell
npm i -g pnpm
```

项目初始化命令:

```shell
pnpm create vite
选
y  回车
vue 回车  ts  回车
cd luckyWeb
pnpm i
npm run dev
```

运行完毕项目跑在http://127.0.0.1:5173

### 项目配置

#### eslint配置

**eslint中文官网:http://eslint.cn/**

ESLint最初是由[Nicholas C. Zakas](http://nczonline.net/)于2013年6月创建的开源项目。它的目标是提供一个插件化的**javascript代码检测工具**

首先安装eslint

```shell
pnpm i eslint@8.57.0 -D
```

生成配置文件.eslint.cjs

```shell
npx eslint --init
```

**.eslint.cjs配置如下**

```js
module.exports = {
  //运行环境
  env: {
    browser: true, //浏览器端
    es2021: true, //es2021
  },
  //规则继承
  extends: [
    //全部规则默认是关闭的,这个配置项开启推荐规则,推荐规则参照文档
    //比如:函数不能重名、对象不能出现重复key
    "eslint:recommended",
    //vue3语法规则
    "plugin:vue/vue3-essential",
    //ts语法规则
    "plugin:@typescript-eslint/recommended",
  ],
  //要为特定类型的文件指定处理器
  overrides: [],
  //指定解析器:解析器
  //Esprima 默认解析器
  //Babel-ESLint babel解析器
  //@typescript-eslint/parser ts解析器
  parser: "@typescript-eslint/parser",
  //指定解析器选项
  parserOptions: {
    ecmaVersion: "latest", //校验ECMA最新版本
    sourceType: "module", //设置为"script"（默认），或者"module"代码在ECMAScript模块中
  },
  //ESLint支持使用第三方插件。在使用插件之前，您必须使用npm安装它
  //该eslint-plugin-前缀可以从插件名称被省略
  plugins: ["vue", "@typescript-eslint"],
  //eslint规则
  rules: {},
};
```

**vue3环境代码校验插件**

安装指令

```shell
pnpm install -D eslint-plugin-import@2.29.1 eslint-plugin-vue@9.22.0 eslint-plugin-node@11.1.0 eslint-plugin-prettier@5.1.3 eslint-config-prettier@9.1.0 eslint-plugin-node@11.1.0 @babel/eslint-parser@7.23.10
```

修改.eslintrc.cjs配置文件

```js
// @see https://eslint.bootcss.com/docs/rules/

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  /* 指定如何解析语法 */
  parser: "vue-eslint-parser",
  /** 优先级低于 parse 的语法解析配置 */
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    parser: "@typescript-eslint/parser",
    jsxPragma: "React",
    ecmaFeatures: {
      jsx: true,
    },
  },
  /* 继承已有的规则 */
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-essential",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["vue", "@typescript-eslint"],
  /*
   * "off" 或 0    ==>  关闭规则
   * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
   * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
   */
  rules: {
    // eslint（https://eslint.bootcss.com/docs/rules/）
    "no-var": "error", // 要求使用 let 或 const 而不是 var
    "no-multiple-empty-lines": ["warn", { max: 1 }], // 不允许多个空行
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-unexpected-multiline": "error", // 禁止空余的多行
    "no-useless-escape": "off", // 禁止不必要的转义字符

    // typeScript (https://typescript-eslint.io/rules)
    "@typescript-eslint/no-unused-vars": "error", // 禁止定义未使用的变量
    "@typescript-eslint/prefer-ts-expect-error": "error", // 禁止使用 @ts-ignore
    "@typescript-eslint/no-explicit-any": "off", // 禁止使用 any 类型
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-namespace": "off", // 禁止使用自定义 TypeScript 模块和命名空间。
    "@typescript-eslint/semi": "off",

    // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
    "vue/multi-word-component-names": "off", // 要求组件名称始终为 "-" 链接的单词
    "vue/script-setup-uses-vars": "error", // 防止<script setup>使用的变量<template>被标记为未使用
    "vue/no-mutating-props": "off", // 不允许组件 prop的改变
    "vue/attribute-hyphenation": "off", // 对模板中的自定义组件强制执行属性命名样式
  },
};
```

**.eslintignore文件**

```
dist
node_modules
```

**运行脚本**

package.json新增两个运行脚本

```json
"scripts": {
    "lint": "eslint src",
    "fix": "eslint src --fix"
}
```

#### prettier配置

有了eslint，为什么还要有prettier？eslint针对的是javascript，他是一个检测工具，包含js语法以及少部分格式问题，在eslint看来，语法对了就能保证代码正常运行，格式问题属于其次；

而prettier属于格式化工具，它看不惯格式不统一，所以它就把eslint没干好的事接着干，另外，prettier支持包含js在内的多种语言。

总结起来，**eslint和prettier这俩兄弟一个保证js代码质量，一个保证代码美观。**

新增.prettierrc.cjs

```js
module.exports = {
  singleQuote: true, // 使用单引号
  tabWidth: 2, // 缩进字节数
  printWidth: 140, // 超过最大值换行
  htmlWhitespaceSensitivity: "ignore", //处理 HTML 文件时忽略空格敏感度,闭合标签>新行问题
  semi: false, // 结尾不用分号
  useTabs: false, // 启用tab取代空格符缩进，默认为false
  bracketSpacing: true, // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
  trailingComma: "es5", // 每个键值对后面是否一定有尾随逗号，默认es5，保持默认即可
  quoteProps: "as-needed", // 给对象里的属性名是否要加上引号，默认为as-needed，即根据需要决定，如果不加引号会报错则加，否则不加
  arrowParens: "avoid", //箭头函数只有一个参数的时候可以忽略括号
  endOfLine: "auto", // 文件换行格式 LF/CRLF
};
```

新增.prettierignore忽略文件

```
/dist/*
/html/*
.local
/node_modules/**
**/*.svg
**/*.sh
/public/*
```

npm run lint去检测语法，如果出现不规范格式

npm run fix修改

#### stylelint配置

[stylelint](https://stylelint.io/)为css的lint工具。可格式化css代码，检查css语法错误与不合理的写法，指定css书写顺序等。

我们的项目中使用scss作为预处理器，安装以下依赖：

```shell
pnpm add sass@1.71.1 sass-loader stylelint postcss postcss-scss postcss-html stylelint-config-prettier stylelint-config-recess-order stylelint-config-recommended-scss stylelint-config-standard stylelint-config-standard-vue stylelint-scss stylelint-order stylelint-config-standard-scss -D
```

新增`.stylelintrc.cjs`配置文件

**官网:https://stylelint.bootcss.com/**

```js
// @see https://stylelint.bootcss.com/

module.exports = {
  extends: [
    "stylelint-config-standard", // 配置stylelint拓展插件
    "stylelint-config-html/vue", // 配置 vue 中 template 样式格式化
    "stylelint-config-standard-scss", // 配置stylelint scss插件
    "stylelint-config-recommended-vue/scss", // 配置 vue 中 scss 样式格式化
    "stylelint-config-recess-order", // 配置stylelint css属性书写顺序插件,
    "stylelint-config-prettier", // 配置stylelint和prettier兼容
  ],
  overrides: [
    {
      files: ["**/*.(scss|css|vue|html)"],
      customSyntax: "postcss-scss",
    },
    {
      files: ["**/*.(html|vue)"],
      customSyntax: "postcss-html",
    },
  ],
  ignoreFiles: [
    "**/*.js",
    "**/*.jsx",
    "**/*.tsx",
    "**/*.ts",
    "**/*.json",
    "**/*.md",
    "**/*.yaml",
  ],
  /**
   * null  => 关闭该规则
   * always => 必须
   */
  rules: {
    "value-keyword-case": null, // 在 css 中使用 v-bind，不报错
    "no-descending-specificity": null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    "function-url-quotes": "always", // 要求或禁止 URL 的引号 "always(必须加上引号)"|"never(没有引号)"
    "no-empty-source": null, // 关闭禁止空源码
    "selector-class-pattern": null, // 关闭强制选择器类名的格式
    "property-no-unknown": null, // 禁止未知的属性(true 为不允许)
    "block-opening-brace-space-before": "always", //大括号之前必须有一个空格或不能有空白符
    "value-no-vendor-prefix": null, // 关闭 属性值前缀 --webkit-box
    "property-no-vendor-prefix": null, // 关闭 属性前缀 -webkit-mask
    "selector-pseudo-class-no-unknown": [
      // 不允许未知的选择器
      true,
      {
        ignorePseudoClasses: ["global", "v-deep", "deep"], // 忽略属性，修改element默认样式的时候能使用到
      },
    ],
  },
};
```

新增.stylelintignore忽略文件

```
/node_modules/*
/dist/*
/html/*
/public/*
```

运行脚本

```json
"scripts": {
    "lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"
}
```

最后配置统一的prettier来格式化我们的js和css，html代码

```json
"scripts": {
    "dev": "vite --open",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    "clean": "npx rimraf node_modules",
    "clean:cache": "npx rimraf node_modules/.cache",
    "i": "pnpm install",
    "lint": "eslint src",
    "fix": "eslint src --fix",
    "format": "prettier --write \"./**/*.{html,vue,ts,js,json,md}\"",
    "lint:eslint": "eslint src/**/*.{ts,vue} --cache --fix",
    "lint:style": "stylelint src/**/*.{css,scss,vue} --cache --fix"
}
```

**当我们运行`pnpm run format`的时候，会把代码直接格式化**

tsconfig.node.json内容修改

```json
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

tsconfig.json改

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "moduleResolution": "Node",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": ["ESNext", "DOM"],
    "skipLibCheck": true,
    "noEmit": true,
    "allowJs": true,
    "types": ["jquery"],
    "baseUrl": "./", // 解析非相对模块的基地址，默认是当前目录
    "paths": {
      //路径映射，相对于baseUrl
      "@/*": ["src/*"]
    }
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "@/typings/auto-imports.d.ts" // vue自带的ref，watch自动引入加这个防止爆红
  ],
  "references": [
    {
      "path": "./tsconfig.node.json"
    }
  ]
}
```

#### husky配置

在上面我们已经集成好了我们代码校验工具，但是需要每次手动的去执行命令才会格式化我们的代码。如果有人没有格式化就提交了远程仓库中，那这个规范就没什么用。所以我们需要强制让开发人员按照代码规范来提交。

要做到这件事情，就需要利用husky在代码提交之前触发git hook(git在客户端的钩子)，然后执行`pnpm run format`来自动的格式化我们的代码。

安装`husky`

```shell
pnpm install -D husky@8.0.0
```

先去.gitignore文件

```cobol
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
# .vscode/*  上传，里面配置结合插件用
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

#自动生成

src/typings/components.d.ts
src/typings/auto-imports.d.ts
```

去新建github仓库并同步代码，上传完毕后执行

```shell
npx husky-init
```

会在根目录下生成个一个.husky目录，在这个目录下面会有一个pre-commit文件，这个文件里面的命令在我们执行commit的时候就会执行

在`.husky/pre-commit`文件添加如下命令：

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm run format && pnpm run fix

git add .
```

当我们对代码进行commit操作的时候，就会执行命令，对代码进行格式化，然后再提交。

#### commitlint配置

对于我们的commit信息，也是有统一规范的，不能随便写，要让每个人都按照统一的标准来执行，我们可以利用**commitlint**来实现。

安装包

```shell
pnpm add @commitlint/config-conventional @commitlint/cli -D
```

新建`commitlint.config.cjs`，然后添加下面的代码：

```js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  // 校验规则
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能 feature
        "fix", // 修复 bug
        "docs", // 文档注释
        "style", // 代码格式(不影响代码运行的变动)
        "refactor", // 重构(既不增加新功能，也不是修复bug)
        "perf", // 性能优化
        "test", // 增加测试
        "chore", // 构建过程或辅助工具的变动
        "revert", // 回退
        "build", // 打包
      ],
    ],
    "type-case": [0],
    "type-empty": [0],
    "scope-empty": [0],
    "scope-case": [0],
    "subject-full-stop": [0, "never"],
    "subject-case": [0, "never"],
    "header-max-length": [0, "always", 72],
  },
};
```

在`package.json`中配置scripts命令

```json
{
  "scripts": {
    "commitlint": "commitlint --config commitlint.config.cjs -e -V"
  }
}
```

在.husky下新增commit-msg文件，删除\_文件夹后

```shell
npx husky add .husky/commit-msg
```

内容

```shell
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

pnpm commitlint
```

当我们commit提交信息时，就不能再随意写了，必须是git commit -m 'fix: xxx'符合类型的才可以，**需要注意的是类型的后面需要用英文的:，并且冒号后面是需要空一格的，这个是不能省略的**

#### 强制pnpm包管理

团队开发项目的时候，需要统一包管理器工具,因为不同包管理器工具下载同一个依赖,可能版本不一样,导致项目出现bug问题,因此包管理器工具需要统一管理！！！

在根目录创建`scritps/preinstall.js`文件，添加下面的内容

```js
if (!/pnpm/.test(process.env.npm_execpath || "")) {
  console.warn(
    `[33mThis repository must using pnpm as the package manager ` +
      ` for scripts to work properly.[39m\n`,
  );
  process.exit(1);
}
```

配置命令

```json
"scripts": {
    "preinstall": "node ./scripts/preinstall.js"
}
```

**当我们使用npm或者yarn来安装包的时候，就会报错了。原理就是在install的时候会触发preinstall（npm提供的生命周期钩子）这个文件里面的代码。**

## 2、项目集成

### 集成element-plus

硅谷甄选运营平台,UI组件库采用的element-plus，因此需要集成element-plus插件！！！

官网地址:https://element-plus.gitee.io/zh-CN/

```shell
pnpm install element-plus@2.5.6 @element-plus/icons-vue@2.3.1
```

**入口文件main.ts全局安装element-plus,element-plus默认支持语言英语设置为中文**

```js
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
app.use(ElementPlus, {
  locale: zhCn,
});
```

**Element Plus全局组件类型声明**

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["element-plus/global"]
  }
}
```

配置完毕可以测试element-plus组件与图标的使用。

### src别名的配置

在开发项目的时候文件与文件关系可能很复杂，因此我们需要给src文件夹配置一个别名！！！

```js
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve("./src"), // 相对路径别名配置，使用 @ 代替 src
    },
  },
});
```

### 环境变量的配置

**项目开发过程中，至少会经历开发环境、测试环境和生产环境(即正式环境)三个阶段。不同阶段请求的状态(如接口地址等)不尽相同，若手动切换接口地址是相当繁琐且易出错的。于是环境变量配置的需求就应运而生，我们只需做简单的配置，把环境状态切换的工作交给代码。**

- **开发环境（development）**：顾名思义，开发使用的环境，每位开发人员在自己的dev分支上干活，开发到一定程度，同事会合并代码，进行联调。

- **测试环境（testing）**：测试同事干活的环境啦，一般会由测试同事自己来部署，然后在此环境进行测试

- **生产环境（production）**：生产环境是指正式提供对外服务的，一般会关掉错误报告，打开错误日志。(正式提供给客户使用的环境。)

注意:一般情况下，一个环境对应一台服务器,也有的公司开发与测试环境是一台服务器！！！

项目根目录分别添加开发、生产和测试环境的文件!

```
.env.development
.env.production
.env.test
```

文件内容

```env
# 变量必须以 VITE_ 为前缀才能暴露给外部读取
NODE_ENV = 'development'
VITE_APP_TITLE = '硅谷甄选运营平台'
VITE_APP_BASE_API = '/dev-api'
```

```env
NODE_ENV = 'production'
VITE_APP_TITLE = '硅谷甄选运营平台'
VITE_APP_BASE_API = '/prod-api'
```

```env
# 变量必须以 VITE_ 为前缀才能暴露给外部读取
NODE_ENV = 'test'
VITE_APP_TITLE = '硅谷甄选运营平台'
VITE_APP_BASE_API = '/test-api'
```

通过import.meta.env获取环境变量

### SVG图标配置

在开发项目的时候经常会用到svg矢量图,而且我们使用SVG以后，页面上加载的不再是图片资源,

这对页面性能来说是个很大的提升，而且我们SVG文件比img要小的很多，放在项目中几乎不占用资源。

**安装各种插件**

```shell
pnpm install vite-plugin-svg-icons@2.0.1 -D unplugin-auto-import@0.17.5 unocss@0.58.5 unplugin-icons@0.18.5 unplugin-vue-components@0.26.0 mockjs@1.1.0 vite-plugin-mock@2.9.6 vite-plugin-progress@0.0.7 @intlify/unplugin-vue-i18n@2.0.0
```

**在`vite.config.ts`中配置插件**

```js
import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { viteMockServe } from "vite-plugin-mock";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import progress from "vite-plugin-progress";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import IconsResolver from "unplugin-icons/resolver";

const pathSrc = path.resolve(__dirname, "src");

export default defineConfig(({ command, mode }) => {
  //获取各种环境下的对应的变量
  let env = loadEnv(mode, process.cwd());
  return {
    base: "/", // 在生产中服务时的基本公共路径
    publicDir: "public", // 静态资源服务的文件夹, 默认"public"
    build: {
      outDir: "dist",
    },
    //--------------------------------------
    resolve: {
      alias: {
        "@": pathSrc, // 相对路径别名配置，使用 @ 代替 src
      },
    },
    //--------------------------------------
    css: {
      // CSS 预处理器,全局的scss格式如下往下面加即可
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: `
              @use "./src/styles/variable.scss" as * ;
              @use '@/styles/ff-cloud/index.scss' as *;
              `,
        },
      },
    },
    //---------------------------------------
    plugins: [
      vue(),
      progress({
        format: "Building :bar :percent",
        total: 200,
        width: 60,
        complete: "",
        incomplete: "",
      }),
      UnoCSS({}),
      //---------------------------------------
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: [
          "vue",
          "@vueuse/core",
          "vue-router",
          {
            "@/hooks/web/useMessage": ["useMessage"], //这样每个vue页都导入
          },
        ],
        // dts: '/auto-import.d.ts',
        eslintrc: {
          enabled: false, //  Default `false`
          filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver({
            importStyle: "sass",
          }),
          IconsResolver({
            prefix: "Icon",
          }), // 自动导入图标组件
        ],
        vueTemplate: true, // 是否在 vue 模板中自动导入
        dts: path.resolve(pathSrc, "typings", "auto-imports.d.ts"), //自动导包的存放路径
      }),
      //---------------------------------------
      Components({
        resolvers: [
          IconsResolver({
            enabledCollections: ["ep"], //@iconify-json/ep 是 Element Plus 的图标库
          }),
          ElementPlusResolver(), // 自动导入 Element Plus 组件
        ],
        // dirs: ['src/components'], //自动导入这个目录下的组件.下面这个也会包含这个
        dts: path.resolve(pathSrc, "typings", "components.d.ts"),
      }),
      //---------------------------------------
      Icons({
        autoInstall: true, // 自动安装图标库
      }),
      //---------------------------------------
      VueI18nPlugin({
        runtimeOnly: true,
        compositionOnly: true,
        include: [resolve(__dirname, "src/locales/**")],
      }),
      //---------------------------------------
      createSvgIconsPlugin({
        // 阿里icon就放icons下了
        iconDirs: [path.resolve(process.cwd(), "src/assets/icons")],
        symbolId: "icon-[dir]-[name]",
      }),
      //---------------------------------------
      viteMockServe({
        localEnabled: command === "serve", //保证开发阶段可以使用mock接口
        // localEnabled: false, //开发关闭
        prodEnabled: true, //mock生产接口开关
      }),
    ],
    //代理跨域
    server: {
      port: 8000,
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //获取数据的服务器地址设置
          target: env.VITE_SERVE,
          //需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) => {
            return path.replace(new RegExp("^" + env.VITE_APP_BASE_API), "");
          },
        },
        [env.VITE_APP_BASE_API_YZM]: {
          //获取数据的服务器地址设置
          target: env.VITE_SERVE_YZM,
          //需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) => {
            return path.replace(
              new RegExp("^" + env.VITE_APP_BASE_API_YZM),
              "",
            );
          },
        },
      },
    },
    optimizeDeps: {
      include: [
        "vue",
        "vue-router",
        "pinia",
        "axios",
        "element-plus/es/utils/index.mjs",
        "element-plus/es/components/form/style/css",
        "element-plus/es/components/form-item/style/css",
        "element-plus/es/components/button/style/css",
        "element-plus/es/components/input/style/css",
        "element-plus/es/components/input-number/style/css",
        "element-plus/es/components/switch/style/css",
        "element-plus/es/components/upload/style/css",
        "element-plus/es/components/menu/style/css",
        "element-plus/es/components/col/style/css",
        "element-plus/es/components/icon/style/css",
        "element-plus/es/components/row/style/css",
        "element-plus/es/components/tag/style/css",
        "element-plus/es/components/dialog/style/css",
        "element-plus/es/components/loading/style/css",
        "element-plus/es/components/radio/style/css",
        "element-plus/es/components/radio-group/style/css",
        "element-plus/es/components/popover/style/css",
        "element-plus/es/components/scrollbar/style/css",
        "element-plus/es/components/tooltip/style/css",
        "element-plus/es/components/dropdown/style/css",
        "element-plus/es/components/dropdown-menu/style/css",
        "element-plus/es/components/dropdown-item/style/css",
        "element-plus/es/components/sub-menu/style/css",
        "element-plus/es/components/menu-item/style/css",
        "element-plus/es/components/divider/style/css",
        "element-plus/es/components/card/style/css",
        "element-plus/es/components/link/style/css",
        "element-plus/es/components/breadcrumb/style/css",
        "element-plus/es/components/breadcrumb-item/style/css",
        "element-plus/es/components/table/style/css",
        "element-plus/es/components/tree-select/style/css",
        "element-plus/es/components/table-column/style/css",
        "element-plus/es/components/select/style/css",
        "element-plus/es/components/option/style/css",
        "element-plus/es/components/pagination/style/css",
        "element-plus/es/components/tree/style/css",
        "element-plus/es/components/alert/style/css",
        "@vueuse/core",
        "echarts",
        "vue-i18n",
        "jquery",
        "lodash-es",
        "nprogress",
        "dayjs",
        "sass",
        "qs",
      ],
    },
  };
});
```

#### svg封装为全局组件

因为项目很多模块需要使用图标,因此把它封装为全局组件！！！

**在src/components目录下创建一个SvgIcon组件:代表如下**

```vue
<template>
  <div>
    <svg :style="{ width: width, height: height }">
      <use :xlink:href="prefix + name" :fill="color"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
defineProps({
  //xlink:href属性值的前缀
  prefix: {
    type: String,
    default: "#icon-",
  },
  //svg矢量图的名字
  name: String,
  //svg图标的颜色
  color: {
    type: String,
    default: "",
  },
  //svg宽度
  width: {
    type: String,
    default: "16px",
  },
  //svg高度
  height: {
    type: String,
    default: "16px",
  },
});
</script>
<style scoped></style>
```

在src文件夹目录下创建一个index.ts文件：用于注册components文件夹内部全部全局组件！！！

```js
import SvgIcon from './SvgIcon/index.vue';
import type { App, Component } from 'vue';
const components: { [name: string]: Component } = { SvgIcon };
export default {
    install(app: App) {
        Object.keys(components).forEach((key: string) => {
            app.component(key, components[key]);
        })
    }
}
```

在入口文件引入src/index.ts文件,通过app.use方法安装自定义插件

```js
import gloablComponent from "./components/index";
app.use(gloablComponent);
```

### 集成sass

我们目前在组件内部已经可以使用scss样式,因为在配置styleLint工具的时候，项目当中已经安装过sass sass-loader,因此我们再组件内可以使用scss语法！！！需要加上lang="scss"

```vue
<style scoped lang="scss"></style>
```

接下来我们为项目添加一些全局的样式

在src/styles目录下创建一个index.scss文件，当然项目中需要用到清除默认样式，因此在index.scss引入reset.scss

```scss
@import reset.scss;
```

在入口文件引入

```js
import "@/styles";
```

但是你会发现在src/styles/index.scss全局样式文件中没有办法使用$变量.因此需要给项目中引入全局变量$。

在style/variable.scss创建一个variable.scss文件！

在vite.config.ts文件配置如下:

```js
export default defineConfig((config) => {
	css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/styles/variable.scss";',
        },
      },
    },
	}
}
```

**`@import "./src/styles/variable.less";`后面的`;`不要忘记，不然会报错**!

配置完毕你会发现scss提供这些全局变量可以在组件样式中使用了！！！

**安装axios**

```shell
pnpm install axios@1.6.7
```

最后通过axios测试接口！！！

### axios二次封装

在开发项目的时候避免不了与后端进行交互,因此我们需要使用axios插件实现发送网络请求。在开发项目的时候我们经常会把axios进行二次封装。

目的:

- 使用请求拦截器，可以在请求拦截器中处理一些业务(开始进度条、请求头携带公共参数)
- 使用响应拦截器，可以在响应拦截器中处理一些业务(进度条结束、简化服务器返回的数据、处理http网络错误)

在根目录下创建utils/request.ts

```js
import axios from "axios";
import { ElMessage } from "element-plus";
//创建axios实例
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});
//请求拦截器
request.interceptors.request.use((config) => {
  return config;
});
//响应拦截器
request.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    //处理网络错误
    let msg = "";
    let status = error.response.status;
    switch (status) {
      case 401:
        msg = "token过期";
        break;
      case 403:
        msg = "无权访问";
        break;
      case 404:
        msg = "请求地址错误";
        break;
      case 500:
        msg = "服务器出现问题";
        break;
      default:
        msg = "无网络";
    }
    ElMessage({
      type: "error",
      message: msg,
    });
    return Promise.reject(error);
  },
);
export default request;
```

### API接口统一管理

在开发项目的时候,接口可能很多需要统一管理。在src目录下去创建api文件夹去统一管理项目的接口；

比如:下面方式

```js
//统一管理咱们项目用户相关的接口
import request from '@/utils/request'
import type {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from './type'

//项目用户相关的请求地址
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

//登录接口
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)

//获取用户信息
export const reqUserInfo = () =>
  request.get<any, userInfoResponseData>(API.USERINFO_URL)

//退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
```

## 3、补充

### 常用依赖安装

```shell
# 自动导入的vue里的ref watch 等
pnpm i -D unplugin-auto-import

# 自动引入组件 少了import {}...
pnpm i unplugin-vue-components -D

pnpm i unplugin-icons -D

pnpm i @vueuse/core@4.9.0 lodash-es pinia@2.1.7 vue-router@4.3.0 vue-i18n@9.10.1

# 进度条
pnpm i nprogress

# 打包进度条
pnpm i vite-plugin-progress -D

# 带颜色
pnpm i picocolors -D

pnpm i moment

pnpm i copy-to-clipboard

pnpm i echarts@5.2.2
```

参考链接: https://www.jb51.net/article/252596.htm
