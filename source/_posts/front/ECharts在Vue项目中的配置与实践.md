---
title: ECharts在Vue项目中的配置与实践
cover: https://imgs.luckynwa.top/profile/yys/205.webp
description: 博观而约取，厚积而薄发
categories: 前端
tags: ECharts
comments: true
abbrlink: front2
summary: >-
  本文详细介绍了ECharts在Vue2和Vue3项目中的使用方法，涵盖ECharts 5.x的引入方式变更、Vue应用的创建与安装、简单图表的配置示例、组件封装与配置项抽离，以及图表在窗口缩放时的自适应处理方案。通过实际代码示例，帮助开发者快速掌握ECharts在不同Vue版本中的最佳实践，提升图表开发效率。内容包括选项式和组合式两种写法，以及液位/流量等实际业务场景的封装示例。
date: 2025-04-08 06:59:18
---

## 前言

本章节将记录 echarts 在项目中的常见配置，以便提高开发速度。

echarts 4.x（以下简称 `v4`）升级到 echarts 5.x（以下简称 `v5`），`v5` 仍然带来了一些非兼容改动，需要特别关注，`v5` 不再支持 IE8 浏览器，过渡动画的增强。

[官网配置项点我跳转](https://echarts.apache.org/zh/option.html#xAxis.id')

## 创建一个 Vue 应用

在 HTML 中定义一个 `<div>` 节点，并且通过 CSS 使得该节点具有宽度和高度。初始化图表的时候，传入该节点，图表的大小默认即为该节点的大小。

环境：Node16 和 Node18 (nvm 来管理)

开发工具: VSCode

代码: 直接从本人的 Github 上拉取
Vue3 模板

```shell
git clone -b test https://github.com/luckyNwa6/luckyVue3Template.git
```

Vue2 模板

```shell
git clone -b test https://github.com/luckyNwa6/luckyVue2Template.git
```

## 安装

vue2模板

```shell
yarn   安装全部依赖
yarn remove  echarts
```

vue3模板

```shell
pnpm i
pnpm uninstall echarts
```

可选版本

```shell
npm install echarts --save
yarn add echarts
pnpm install echarts@4.9.0 --save
```

## 引用 ECharts

如果使用者在 `v4` 中这样引用了 echarts：

```js
import echarts from 'echarts'
// 或者按需引入
import echarts from 'echarts/lib/echarts'
```

这两种方式，`v5` 中不再支持了。

使用者需要如下更改代码解决这个问题

```js
import * as echarts from 'echarts'
// 按需引入
import * as echarts from 'echarts/lib/echarts'
```

## 简单图表案例

本章节将实现一个简单的图表案例，并解析其中的具体配置

### Demo

选项式

```js
<template>
  <div>
    <div id="lucky" style="width: 600px; height: 600px"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      myChart: null,
      dataX: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'], //x轴的数据
      seriesValue: [5, 20, 36, 10, 10, 20], //X轴对应的数据
    }
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      this.myChart = echarts.init(document.getElementById('lucky')) // 基于准备好的dom要有宽度，初始化echarts实例
      // 指定图表的配置项和数据，不管折线图、柱状图、饼图等都需要配置，后续抽离封装
      var option = {
        title: {
          text: 'ECharts 入门示例',
        },
        tooltip: {},
        legend: {
          data: ['销量'],
        },
        xAxis: {
          data: this.dataX,
        },
        yAxis: {

        },
        series: [
          {
            name: '销量', //数据中对应的名称
            type: 'bar', //柱状图
            data: this.seriesValue,
          },
        ],
      }
      // 使用刚指定的配置项和数据显示图表，后续有点击事件
      this.myChart.setOption(option)
    },
  },
}
</script>
```

组合式

```js
const chart = ref(null)
const chartId = 'productType' + Math.round(Math.random() * 10000)

chart.value = echarts.init(document.getElementById(chartId))

chart.value.setOption(option, true)
```

## 组件封装

封装可以考虑多种的情况，是否是全局都有、还是一个模块下面有，可以封装一个vue组件、传入配置项来显示需要的图表，或者抽离配置项单独去定制。

### 简单封装

场景是某个模块下需要 液位/流量、水质等配置图表，参数如下：

- 悬浮框 --> 定制里面的属性展示（如果不抽离需要传更多的值）
- 图表缩放 --> 可以不用，直接在这写死，默认图表都是需要这个的
- 水平数据 --> X轴的label展示
- 纵轴数据 --> X轴值对应的Y轴数据
- 图表实例
- 另个垂直数据

```js
// 液位/流量的配置项--------------------------------------------------------------------------------
export const liquidFlowOpt = (tooltip, dataZoom, curveHorizontal, liquidVerticalData, echarts, flowVerticalData) => {
  return {
    grid: {
      left: '7%', //图表距离左边
      right: '6%',
      containLabel: true, //grid 区域是否包含坐标轴的刻度标签
    },
    legend: [
      //图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
      {
        data: [
          {
            name: '液位',
            icon: 'rect', //长方形的
          },
        ],
        itemWidth: 11, //宽
        itemHeight: 2, //高
        top: '4%', //距离上方
        left: '45%', //距离左
        textStyle: {
          //文字样式
          color: '#2C3542 ',
          // fontWeight: "normal",
          fontSize: 12,
          fontFamily: 'PingFang SC Arial, Helvetica, sans-serif', // 设置字体类型为 Arial、Helvetica 或 sans-serif 中的一种
        },
      },
      {
        data: [
          {
            name: '流量',
            icon: 'rect',
          },
        ],
        itemWidth: 11,
        itemHeight: 2,
        top: '4%',
        left: '55%',
        textStyle: {
          color: '#2C3542 ',
          // fontWeight: "normal",
          fontSize: 12,
          fontFamily: 'PingFang SC Arial, Helvetica, sans-serif', // 设置字体类型为 Arial、Helvetica 或 sans-serif 中的一种
        },
      },
    ],
    tooltip: tooltip, //悬浮提示
    dataZoom: dataZoom, //缩放
    //x轴
    xAxis: {
      data: curveHorizontal,
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          // 设置x轴颜色
          color: '#FFFFFF',
        },
      },
      axisLabel: {
        color: '#999999 ', //坐标轴的文本颜色
      },
    },
    //y轴没有显式设置，根据值自动生成y轴
    yAxis: [
      {
        name: '指标：液位(m)',
        nameGap: 25, // 设置纵轴名称距离轴线的距离为 25 像素
        min: function (v) {
          //如果没数据时候默认展示的纵轴
          console.log(v)
          if (v.min == Infinity) {
            console.log(22222)
            return 0
          }
          return v.min
        },
        // offset: -30,
        max: function (v) {
          console.log(v)
          if (v.max == -Infinity) {
            console.log(1111)
            return 1.5
          }
          return v.max
        },
        type: 'value',
        position: 'left',
        axisTick: {
          show: false, //坐标轴刻度|隐藏
        },
        // alignTicks: true,  //开启该配置项自动对齐刻度,刻度都隐藏了就没有必要了
        axisLine: {
          //纵轴文字,就是0 3 6 9 12 14
          show: false,
          lineStyle: {
            color: '#999999',
          },
        },
        splitLine: {
          show: true, //隐藏纵轴的横线
          lineStyle: {
            color: '#DCDFE6 ',
            type: 'dashed',
          },
        },
        axisLabel: {
          formatter: '{value} ',
        },
      },
      {
        name: '指标：流量(m³/s)',
        nameGap: 25, // 设置纵轴名称距离轴线的距离为 25 像素
        min: function (v) {
          console.log(v)
          if (v.min == Infinity) {
            return 0
          }
          return v.min
        },
        max: function (v) {
          console.log(v)
          if (v.max == -Infinity) {
            return 100
          }
          return v.max
        },
        // interval: 3,
        axisTick: {
          show: false, // 设置 axisTick 的 show 属性为 false
        },
        type: 'value',
        position: 'right',
        // alignTicks: true,
        splitLine: {
          show: true, //隐藏纵轴的横线
          lineStyle: {
            color: '#DCDFE6',
            type: 'dashed',
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#999999',
          },
        },
        axisLabel: {
          formatter: '{value} ',
        },
      },
    ],

    //数据-data是最终要显示的数据
    series: [
      {
        name: '液位',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        smooth: true,
        color: '#1d72f1',
        areaStyle: {
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是'true'，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: '#e5f5fe',
                },
                {
                  offset: 0.6,
                  color: '#e0f4fe',
                },
                {
                  offset: 1,
                  color: '#dcf3fe',
                },
              ],
              false,
            ),
          },
        },
        data: liquidVerticalData,
        showSymbol: true,
        symbolSize: 6,
        lineStyle: {
          width: 3, // 设置线的粗细，这里设置为 3
        },
      },
      {
        name: '流量',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        smooth: true,
        yAxisIndex: 1,
        color: '#00dbd5',
        areaStyle: {
          normal: {
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是'true'，则该四个值是绝对像素位置。
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: '#fcfefe',
                },
                {
                  offset: 0.6,
                  color: '#d6f4fa',
                },
                {
                  offset: 1,
                  color: '#ccf7f6',
                },
              ],
              false,
            ),
          },
        },
        data: flowVerticalData,
        // showSymbol: flowVerticalData.length == 1 ? true : false,
        showSymbol: true,
        symbolSize: 6,
        lineStyle: {
          width: 3, // 设置线的粗细，这里设置为 3
        },
      },
    ],
  }
}
```

调用

```js
var that = this
let dataZoom = deepClone(this.echartOptions.dataZoom)
//Todo 液位/流量图表的Tooltip 有时间可以再封装
let liquidFlowTooltip = {
  trigger: 'axis',
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  confine: true,
  formatter: function (params) {
    // console.log(params);
    var relVal = ''
    var time = ''
    let qId = ''
    for (var i = 0, l = params.length; i < l; i++) {
      if (i === 0) {
        relVal +=
          '<span style="display:inline-block;margin-right:5px;width:1px;"></span>' + that.chartShowTime[params[i].dataIndex] + '<br/>'
        time = that.curveDateTime[params[i].dataIndex]
        qId = that.curveIdList[params[i].dataIndex]
      }
      relVal +=
        '<span style="display:inline-block;padding-bottom:20px;width:1px;"></span> <span style="display:inline-block;margin-right:5px;margin-bottom:4px;border-radius:10px;width:13px;height:3px;background-color:' +
        params[i].color +
        '"></span>' +
        params[i].seriesName +
        '：' +
        (params[i].value || '-') +
        getUnit(params[i].seriesName, params[i].value) +
        '<br/>'
    }
    that.queryTime = time
    that.queryID = qId
    return relVal
  },
  // 添加以下样式
  textStyle: {
    fontSize: 14,
    color: '#FFFFFF ',
    margin: 20,
  },
  extraCssText: 'max-width: 300px; padding: 12px;',
}
var option1 = liquidFlowOpt(
  liquidFlowTooltip,
  dataZoom,
  this.curveHorizontal,
  this.liquidVerticalData,
  this.$echarts,
  this.flowVerticalData,
)

//初始化ehcharts实例
let charts = document.getElementById('line_charts')
this.myChart = this.$echarts.init(charts) //这是全局注册了
this.myChart.setOption(option1)
```

### 组件抽离

图表组件

```vue
<template>
  <div ref="chart" />
</template>

<script>
export default {
  name: 'EChartsChart',
  props: {
    option: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    // 在组件销毁前销毁图表实例，释放资源
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  },
  methods: {
    initChart() {
      // 在mounted钩子函数中初始化图表
      this.chart = this.$echarts.init(this.$refs.chart)
      this.chart.setOption(this.option)
    },
  },
}
</script>
```

配置项抽离，应该要类似简单封装那配置项用方法导出，更智能

```js
export const option7 = {
  color: [
    '#ff2600',
    '#ffc000',
    '#00ad4e',
    '#0073c2',
    '#165868',
    '#e76f00',
    '#316194',
    '#723761',
    '#00b2f1',
    '#4d6022',
    '#4b83bf',
    '#f9c813',
    '#0176c0',
  ], // 柱状图颜色列表
  tooltip: {
    // 鼠标悬浮时的提示框配置
    trigger: 'axis', // 触发类型为坐标轴
    transitionDuration: 0, // 提示框动画过渡时间
    formatter: function (params, ticket, callback) {
      // 提示框内容格式化函数
      var res = ''
      for (var i = 0, l = params.length; i < l; i++) {
        res += '' + params[i].seriesName + ' : ' + params[i].value + '<br>' // 拼接系列名称和对应的数值
      }
      return res
    },
    axisPointer: {
      type: 'line',
      lineStyle: {
        type: 'dashed',
        color: '#ffff00',
      },
    },
  },
  toolbox: {
    show: true, // 显示工具栏
    feature: {
      mark: {
        show: true,
      },
    },
  },
  grid: {
    borderWidth: 0, // 网格边框宽度
    top: '40', // 上边距
    left: '30', // 左边距
    right: '10', // 右边距
    bottom: '40', // 下边距

    color: '#fff', // 文字颜色
  },
  xAxis: [
    {
      type: 'category', // 类目轴
      axisTick: {
        show: false, // 不显示刻度线
      },
      axisLine: {
        show: false, // 不显示轴线
        lineStyle: {
          color: '#868c96', // 轴线颜色
        },
      },
      axisLabel: {
        interval: 0, // 强制显示所有类目
        fontSize: 14, // 字体大小
        formatter: function (value) {
          var ret = '' // 拼接加\n返回的类目项
          var maxLength = 2 // 每项显示文字个数
          var valLength = value.length // X轴类目项的文字个数
          var rowN = Math.ceil(valLength / maxLength) // 类目项需要换行的行数
          if (rowN > 1) {
            // 如果类目项的文字大于3,
            for (var i = 0; i < rowN; i++) {
              var temp = '' // 每次截取的字符串
              var start = i * maxLength // 开始截取的位置
              var end = start + maxLength // 结束截取的位置
              // 这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
              temp = value.substring(start, end) + '\n'
              ret += temp // 凭借最终的字符串
            }
            return ret
          } else {
            return value
          }
        },
      },
      splitArea: {
        show: false,
      },
      data: ['电力部门', '水利部门', '海外部门', '物联网', '消防部门', '平台研发', '其他'], // X轴数据
      splitLine: {
        show: false,
      },
    },
  ],
  yAxis: [
    {
      type: 'value', // 数值轴
      offset: -14, // 偏移量
      splitLine: {
        show: false, // 不显示分隔线
      },
      axisLine: {
        show: false, // 不显示轴线
        lineStyle: {
          color: '#868c96', // 轴线颜色
        },
      },
      axisTick: {
        show: false, // 不显示刻度线
      },
      axisLabel: {
        interval: 0, // 强制显示所有标签
        fontSize: 14, // 字体大小
      },
      splitArea: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: '共享次数', // 系列名称
      type: 'bar', // 柱状图
      data: [2912, 3991, 4621, 3941, 3313, 6631, 5543, 4463, 6541, 3381], // 数据
      itemStyle: {
        color: function (params) {
          // 柱状图颜色
          var colorList = [
            '#ff2600',
            '#ffc000',
            '#00ad4e',
            '#0073c2',
            '#165868',
            '#e76f00',
            '#316194',
            '#723761',
            '#00b2f1',
            '#4d6022',
            '#4b83bf',
            '#f9c813',
            '#0176c0',
          ]
          return colorList[params.dataIndex]
        },
      },
      barWidth: 14, // 柱状图宽度
      label: {
        show: true, // 显示标签
        position: 'top', // 标签位置

        color: '#ffc72b', // 标签文字颜色
        fontSize: 10, // 标签文字大小
      },
    },
    {
      name: '折线', // 系列名称
      type: 'line', // 折线图
      itemStyle: {
        color: '#d3d5fd', // 折线颜色
      },
      data: [2912, 3991, 4621, 3941, 3313, 6631, 5543, 4463, 6541, 3381], // 数据
    },
  ],
}
```

调用

```js
  <EChartsChart :option="option7" style="width: 100%; height: 300px" />

  import { option7 } from '@/components/echarts/option7.js'
  import EChartsChart from '@/components/echarts/EChartsChart.vue'

  components: {EChartsChart },//data同级
  created() {
    this.option7 = option7
  }
```

## 图表自适应

很多时候我们后台管理系统可以收缩，然后就导致了图表变形的情况，这个时候我们就需要给图表加入自适应功能。

### Vue2自适应

引入第三方库

```shell
npm i resize-detector@0.3.0
npm i lodash@4.17.21
```

新增mixins-resize.js

```js
import { addListener, removeListener } from 'resize-detector'
import _ from 'lodash'

export default {
  mounted() {
    const { onResize } = this
    this.__resizeHandler = _.debounce(() => {
      if (typeof onResize === 'function') onResize()
    }, 100)

    this.$nextTick(() => {
      addListener(this.$el, this.__resizeHandler)
    })
  },
  beforeDestroy() {
    removeListener(this.$el, this.__resizeHandler)
  },
}
```

在图表vue中使用

```js
import ResizeMixins from '@/views/common/mixins-resize.js'
import echarts from 'echarts'

  mixins: [ResizeMixins],//混入和data同级

  methods: {
    //自适应分辨率
    onResize() {
      this.myChart && this.myChart.resize()   //myChart图表实例，就是渲染dom-id
      // this.$refs.swiper1 && this.$refs.swiper1.resize();
    },
  }
```

详细可以查看Vue模板中的具体实现结果。

### Vue3自适应

组合式写法

```js
import * as echarts from 'echarts'
import { useDebounceFn } from '@vueuse/core' //vue配置文件做了自动按需导入,这句可有可无

// 窗口自适应并开启过渡动画
const resize = () => {
  if (chart.value) {
    chart.value.resize({ animation: { duration: 300 } })
  }
}
// 自适应防抖优化
const debouncedResize = useDebounceFn(resize, 500, { maxWait: 800 })

onMounted(() => {
  initData()
  nextTick(() => {
    window.addEventListener('resize', debouncedResize)
  })
})

onBeforeUnmount(() => {
  if (chart.value) {
    chart.value.dispose()
    chart.value = null
    window.removeEventListener('resize', debouncedResize)
  }
})
```
