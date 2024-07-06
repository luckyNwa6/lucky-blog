---
title: LayUi记录贴
description: 前端遇到的bug记录
cover: 'https://imgs.luckynwa.top/blog/layUiIcon.png'
categories: Front
tags: LayUi
comments: true
abbrlink: 36841
date: 2023-09-18 13:32:28
---

# LayUi_bug---操作栏低分辨率下按钮点击无效

bug 出现的原因：

在低分辨率下，太多的按钮会缩起来，出现...,当点击...弹出按钮框，但是点击按钮却没有效果，是因为这个框已经不是表格里的东西了，所以照常的去监听表格的事件就没有效果了，可以通过给这个按钮添加值的传递，当点击时候，将这个值变为全局的值，这样外部访问这个弹出框就能拿到值

解决

HTML

```HTML
          <table id="tableGrid" lay-filter="tableGrid">
            <script type="text/html" id="table-operate-barDemo">
              <a class="layui-btn layui-btn-normal layui-btn-xs" security="" lay-event="edit">{{i18nLang["i18n.security.编辑"]}}</a>
              <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">{{i18nLang["i18n.security.删除"]}}</a>
              <a class="layui-btn layui-btn-xs" lay-event="auth">{{i18nLang["i18n.security.菜单权限"]}}</a>
            </script>
          </table>
```

JS-->模板

```JS

{
            title: i18nLang['i18n.security.操作'],
            unresize: true,
            align: 'center',
            fixed: 'right',

            width: '20%',
            templet: function (d) {
              //自定义显示内容
              var strCheck = ''
              layui.use(['security'], function () {
                var $ = layui.$,
                  security = layui.security
                if (security.checkAuth('角色管理修改') && name != d.name) {
                  strCheck += '<a class="layui-btn layui-btn-normal layui-btn-xs" lay-event="edit" data-row=\'' + JSON.stringify(d) + "'>" + i18nLang['i18n.security.编辑'] + '</a>'
                }
                if (security.checkAuth('角色管理删除') && name != d.name) {
                  strCheck += '<a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del" data-row=\'' + JSON.stringify(d) + "'>" + i18nLang['i18n.security.删除'] + '</a>'
                }
                if (security.checkAuth('角色管理权限菜单') && name != d.name) {
                  strCheck += '<a class="layui-btn  layui-btn-xs" lay-event="auth" data-row=\'' + JSON.stringify(d) + "'>" + i18nLang['i18n.security.菜单权限'] + '</a>'
                }
              })

              return strCheck
            },
          },
```

Js-方法

```js
var currentRowData = null //存放一行的data值,设置为全局

function setCurrentRowData(rowData) {
  currentRowData = rowData
}

function bindEventListeners() {
  // 解绑之前的事件监听器
  $('body').off('click', '[lay-event="edit"]')
  $('body').off('click', '[lay-event="del"]')
  $('body').off('click', '[lay-event="auth"]')

  // 绑定新的事件监听器
  $('body').on('click', '[lay-event="edit"]', function () {
    var rowData = $(this).data('row')
    setCurrentRowData(rowData)
    location.hash = '/security/role/edit/uid=' + currentRowData.id
  })

  $('body').on('click', '[lay-event="del"]', function () {
    var rowData = $(this).data('row')
    setCurrentRowData(rowData)
    layer.confirm(
      i18nLang['i18n.security.确认删除?'],
      {
        btn: [i18nLang['i18n.security.确定'], i18nLang['i18n.security.取消']],
        title: i18nLang['i18n.layui.信息'],
      },
      function (index) {
        admin.req({
          type: 'DELETE',
          url: '/console/security/role/delete?id=' + currentRowData.id,
          success: function (data) {
            if (data.code == 0) {
              layer.msg(
                data.message,
                {
                  anim: 0,
                },
                function () {
                  table.reload('tableGrid')
                },
              )
            } else {
              layer.msg(data.message, {
                icon: 0,
              })
            }
          },
        })
        layer.close(index)
      },
    )
  })

  $('body').on('click', '[lay-event="auth"]', function () {
    var rowData = $(this).data('row')
    setCurrentRowData(rowData)
    location.hash = '/security/role/auth/uid=' + currentRowData.id
  })
}

// 初次绑定事件监听器
bindEventListeners()

// 假设在切换页面时调用以下函数重新绑定事件监听器
function switchPage() {
  // 解绑旧的事件监听器并绑定新的事件监听器
  bindEventListeners()
}
```

# LayUi 功能---全选包含全部页面数据

思路：当点击全选时候，后端会返回 ids，就是要选中的行，每次表格渲染的时候会去先获取一下 id 和 ids 进行比较，如果一样就是选中的状态，如果加入条件，需要再复制一下 done 后面的到搜索那的重载表格，而且分页页数走这个里面的重载表格，需要再之前将下面 3 个变量值清空

```js
// 设置全局变量以保存选中行信息(仅需要id的话在你的业务位置调用ids即可，数据格式是int数组)
var ids = new Array()

// 存储所有选中的数据(需要行内全量数据在你的业务位置调用lists即可，数据格式是对象集合)
var lists = new Array()

// 保存当前页全部数据id，点击全选时使用
var tableIds = new Array()

var test1

//第一个实例
table.render({
  elem: '#tableGrid',
  height: 620,
  url: '/console/marketing/userPricing/page', //数据接口
  page: true, //开启分页
  // , skin: 'line' //行边框风格
  even: false, //开启隔行背景
  size: 'lg',
  cols: [
    [
      //表头
      {
        title: '',
        type: 'checkbox',
        width: 80,
      },
      {
        title: i18nLang['i18n.marketing.序号'],
        type: 'numbers',
        width: 80,
      },
      {
        field: 'c_code',
        title: i18nLang['i18n.marketing.用户编码'],
        minWidth: 120,
        templet: function (data) {
          return data['c_code'] || '--'
        },
      },
      {
        title: i18nLang['i18n.marketing.操作'],
        unresize: true,
        align: 'center',
        fixed: 'right',
        width: 100,
        toolbar: '#table-operate-barDemo',
      },
    ],
  ],
  limit: 5,
  autoSort: false,
  limits: [5, 25, 50, 100, 200],
  done: function (res, curr, count) {
    // 设置当前页全部数据id到全局变量,这里接收一下后端的res用来后面看看有没有接受到
    test1 = res

    tableIds = res.data.map(function (value) {
      return value.id
    })
    // 将返回的数据里的对象中的id和ids数组里的值进行比较，如果有则是选中
    $.each(res.data, function (idx, val) {
      if (ids.indexOf(val.id) > -1) {
        val['LAY_CHECKED'] = 'true'
        //找到对应数据改变勾选样式，呈现出选中效果
        let index = val['LAY_TABLE_INDEX']
        $('tr[data-index=' + index + '] input[type="checkbox"]').click()
        form.render('checkbox') //刷新checkbox选择框渲染
      }
    })
    // 获取表格勾选状态，全选中时设置全选框选中
    let checkStatus = table.checkStatus('tableGrid')
    if (checkStatus.isAll) {
      $('.layui-table-header th[data-field="0"] input[type="checkbox"]').prop('checked', true)
      form.render('checkbox') //刷新checkbox选择框渲染
    }
  },
})

//使用on监听checkbox选中状态并进行处理
table.on('checkbox(tableGrid)', function (obj) {
  // console.log('🚀 ~ file: index.html:370 ~ 后端返回的对象:', test1)
  // console.log('🚀 ~ file: index.html:505 ~ lists:', lists)
  // console.log('🚀 ~ file: index.html:503 ~ ids:', ids)
  if (obj.checked == true) {
    if (obj.type == 'one') {
      console.log('单选')
      ids.push(obj.data.id)
      lists.push(obj.data)
      console.log('🚀 ~ file: index.html:503 ~ ids:', ids)
      console.log('🚀 ~ file: index.html:505 ~ lists:', lists)
    } else {
      console.log('全选') //这里全选时候获取后端的ids数组，这样下一页点击，它也会被勾选，因为会进行值比较再勾选
      admin.req({
        url: '/console/marketing/userPricing/queryAllDeviceId',
        type: 'GET',
        dataType: 'JSON',
        async: false,
        success: function (res) {
          if (res.code === 0 && res.data) {
            ids = res.data
          }
        },
      })
      for (let i = 0; i < tableIds.length; i++) {
        //当全选之前选中了部分行进行判断，避免重复
        if (ids.indexOf(tableIds[i]) == -1) {
          ids.push(tableIds[i])
          var checkStatus = table.checkStatus('layuiReload') //layuiReload 为table声明的id
          lists.push(checkStatus.data[i])
        }
      }
      console.log('🚀 ~ file: index.html:503 ~ ids:', ids)
      console.log('🚀 ~ file: index.html:505 ~ lists:', lists)
    }
  } else {
    if (obj.type == 'one') {
      console.log('取消单选')
      let i = ids.length
      while (i--) {
        if (ids[i] == obj.data.id) {
          ids.splice(i, 1)
          lists.splice(i, 1)
        }
      }
      console.log('🚀 ~ file: index.html:503 ~ ids:', ids)
      console.log('🚀 ~ file: index.html:505 ~ lists:', lists)
    } else {
      console.log('取消全选')
      let i = ids.length
      while (i--) {
        if (tableIds.indexOf(ids[i]) != -1) {
          ids.splice(i, 1)
          lists.splice(i, 1)
        }
      }
      ids = []
      console.log('🚀 ~ file: index.html:503 ~ ids:', ids)
      console.log('🚀 ~ file: index.html:505 ~ lists:', lists)
    }
  }
})
```

# LayUi 功能---导出所有页数据

## 方法 1

直接通过前端就将数据全部导出，第一次得到表格数据时候，顺便把总页数得到，后面按导出时候，限制数量就是最大的总页数，一次请求

```HTML
     <button id="export" class="layui-btn layui-btn-primary" i18n="i18n.archives.导出">导出</button>
```

```JS
    var tableDataCount = 0          //第一步
    table.render({
      elem: '#tableGrid',
	  ...
      done: function (res, curr, count) {
        tableDataCount = count //记录所有数据数量          第二步
      },
    })
```

```JS
    //添加监听   第三步
        $('#export').on('click', function () {
          // exportFile("tableGrid", i18nLang["i18n.dma.区域漏损分析"]);   //当页导出
          table.reload('tableGrid', {
            page: 1,
            limit: tableDataCount, //加载所有数据
            title: i18nLang['i18n.dma.区域漏损分析'],
            done: function () {
              //导出所有数据
              //table.exportFile('tableGrid', false, 'xlsx')  //这样能批量导出不过不能修改里面的字段是否隐藏
              //恢复数据分页显示
              exportFile("tableGrid", i18nLang["i18n.dma.区域漏损分析"]);    //自定义导出的方法
              table.reload('tableGrid', {
                page: 1,
                limit: 25,
                done: function (res, curr, count) {
                  tableDataCount = count
                },
              })
            },
          })
        })
```

```js
function exportFile(id, fileName) {
  //根据传入tableID获取表头
  var headers = $('div[lay-id=' + id + '] .layui-table-box table').get(0)
  var htrs = Array.from(headers.querySelectorAll('tr'))
  var titles = {}
  for (var j = 0; j < htrs.length; j++) {
    var hths = Array.from(htrs[j].querySelectorAll('th'))
    for (var i = 0; i < hths.length; i++) {
      var clazz = hths[i].getAttributeNode('class').value
      var fieldNode = hths[i].dataset.field
      //   console.log(fieldNode);
      if (
        clazz != ' layui-table-col-special' &&
        clazz != 'layui-hide' &&
        fieldNode != 'checkbox' &&
        fieldNode != 'operate' &&
        fieldNode != 'warningState'
      ) {
        //排除居左、居右、隐藏字段
        //排除复选框、操作栏
        //修改:默认字段data-field+i,兼容部分数据表格中不存在data-field值的问题
        titles['data-field' + i] = hths[i].innerText
      }
    }
  }
  //根据传入tableID获取table内容
  var bodys = $('div[lay-id=' + id + '] .layui-table-box table').get(1)
  var btrs = Array.from(bodys.querySelectorAll('tr'))
  var bodysArr = new Array()
  for (var j = 0; j < btrs.length; j++) {
    var contents = {}
    var btds = Array.from(btrs[j].querySelectorAll('td'))
    for (var i = 0; i < btds.length; i++) {
      for (var key in titles) {
        //修改:默认字段data-field+i,兼容部分数据表格中不存在data-field值的问题
        var field = 'data-field' + i
        if (field === key) {
          //根据表头字段获取table内容字段
          contents[field] = btds[i].innerText
        }
      }
    }
    bodysArr.push(contents)
  }
  //将标题行置顶添加到数组
  bodysArr.unshift(titles)
  //导出excel
  LAY_EXCEL.exportExcel(
    {
      sheet1: bodysArr,
    },
    fileName + new Date().toLocaleString() + '.xlsx',
    'xlsx',
  )
}
```

## 方法 2

```JS
 search

let params = {
        consumerTypeId: $("select[name='consumerTypeId']").val(),
        deviceCode: $("input[name='deviceCode']").val(),
        consumerName: $("input[name='consumerName']").val(),
        consumerCode: $("input[name='consumerCode']").val(),
        state: $("select[name='state']").val(),
       areaCode: areaCode,
      }
      allExport(params, '/console/bill/chargeOff/billManageExport', i18nLang['i18n.collect.账单管理'], setter)
```

点击按钮请求后端接口，后端将表格数据传过来,封装了请求的方法，传入搜索的参数、url、文件名、setter 即可，全局可调用这个方法

```JS
/**
 * 格式转化
 * {name: 'zs', age: 18} => name=zs&age=18
 * @param {Object} params 参数对象
 */
function stringify(params) {
  return Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&')
}

function allExport(params, url, fileName, setter) {
  let exportParams = stringify(params)
  // console.log('导出参数', exportParams)
  // // 1. 创建 xhr 对象
  const xhr = new XMLHttpRequest()
  // 2. 调用 open 函数
  xhr.open('GET', setter.serverUrl + url + '?' + exportParams, true)
  // 3. 设置 Content-Type 属性（固定写法）
  // Content-Type: multipart/form-data;
  xhr.setRequestHeader('Content-Type', 'application/vnd.ms-excel;charset=UTF-8')
  xhr.setRequestHeader('X-Auth-Token', layui.data(setter.tableName)[setter.request.tokenName])
  //4. 定义responseType='blob', 是读取文件成功的关键，这样设置可以解决下载文件乱码的问题
  xhr.responseType = 'blob'
  xhr.onreadystatechange = function () {
    console.log(xhr.readyState, xhr.status)
    if (xhr.readyState === 4 && xhr.status === 200) {
      // var responseText = xhr.responseText; 不能使用这个获取结果
      //返回二进制数据流
      // console.log(responseText);
      // console.log('成功了吗', xhr)
      // console.log(xhr.response)
      const blob = new Blob([xhr.response], { type: 'application/vnd.ms-excel;charset=UTF-8' })
      const blobUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.download = fileName
      a.href = blobUrl
      a.click()
    }
  }
  // 4. 调用 send 函数发送携带的数据
  xhr.send()
}

```

# LayUi 功能---中英文不生效

在表格渲染完后想插入一段 html，中英文不生效

获取中英文状态

```JS
    //获取语言,放到全局工具类里了
    function getCookieValue(cookieName) {
      var name = cookieName + '='
      var decodedCookie = decodeURIComponent(document.cookie)
      var cookieArray = decodedCookie.split(';')

      for (var i = 0; i < cookieArray.length; i++) {
        var cookie = cookieArray[i].trim()

        if (cookie.indexOf(name) === 0) {
          return cookie.substring(name.length, cookie.length)
        }
      }

      return ''
    }
```

```JS

      done: function (res, curr, count) {
        tableDataCount = count //记录所有数据数量
        var lan = getCookieValue('grycan.cn.bLang')
        var tableTitle = '' // 表格标题文本
        var endTitle = ''
        if (lan === 'en') {
          tableTitle = 'Total(CNY):'
          endTitle = '(Excluding pending execution)'
        } else {
          tableTitle = '合计实收金额(元):'
          endTitle = '(不包含待执行)'
        }
        setTimeout(function () {
          $('.layui-table-page>div').append('<div >' + tableTitle + res.totalPaidInAmount + endTitle + '</div>')
        }, 20)
      },
    })
```

# LayUi 功能---处理表格数据

在 templet 里处理数据并返回给表格里的数据

```js
table.render({
  where: where,
  elem: '#account-table-toolbar',
  height: 530,
  url: '/console/bill/...',
  title: i18nLang['i18n.collect.AAAA'],
  toolbar: false,
  parseData: function (res) {
    //渲染表格之前拿到的数据，也可以在这做假数据
    return {
      code: res.data.page.code, //解析接口状态

      data: res.data.page.data, //解析数据列表
      count: res.data.page.count,
      totalPaidInAmount: res.data.totalPaidInAmount,
      msg: res.message,
    }
  },
  cols: [
    [
      {
        type: 'checkbox',
        fixed: 'left',
      },
      {
        field: 'totalAmount',
        title: i18nLang['i18n.collect.结算金额'],
        width: 170,
        templet: function (res) {
          return res.totalAmount ? (res.totalAmount / 100).toFixed(2) : ''
        },
      },
      {
        field: 'billState',
        title: i18nLang['i18n.collect.账单状态'],
        width: 120,
        templet: function (res) {
          if (res.balanceState == 1) {
            return res.billState == 0 ? i18nLang['i18n.collect.未欠费'] : i18nLang['i18n.collect.欠费']
          } else {
            return i18nLang['i18n.collect.未结算']
          }
        },
      },
      {
        field: 'surplusAmount',
        title: i18nLang['i18n.revenue.余额(元)'],
        templet: function (data) {
          if (!data.surplusAmount || data.surplusAmount === '') {
            return '-'
          } else {
            return parseFloat(data.surplusAmount).toFixed(2)
          }
        },
      },
      {
        fixed: 'right',
        title: i18nLang['i18n.collect.操作'],
        unresize: true,
        toolbar: '#account-table-toolbar-barDemo',
        width: 130,
      },
    ],
  ],
  initSort: {
    field: 'period',
    type: 'desc', //'asc'desc
  },
  page: true,
  limit: 25,
  autoSort: false,
  limits: [25, 50, 100, 200],
  done: function (res, curr, count) {
    tableDataCount = count //记录所有数据数量
    count || this.elem.next('.layui-table-view').find('.layui-table-header').css('display', 'inline-block')
    count || this.elem.next('.layui-table-view').find('.layui-table-box').css('overflow-x', 'auto')
  },
})
```

# 常用工具类

模拟点击

$('#select-payment').trigger('click');

时间戳

```js
/**
 * @Author: glq
 * @Date:   2021-08-02 15:41:56
 * @Last Modified by: glq
 * @Last Modified time: 2023-08-30 17:40:38
 */
/**
 * 时间戳格式化函数
 * @param  {int}    timestamp 时间戳
 * @return {string}           格式化的时间字符串
 */
function timeStampToString(timestamp) {
  if (timestamp == null) {
    return ''
  }
  var date = new Date(timestamp)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate()
  d = d < 10 ? '0' + d : d
  var h = date.getHours()
  h = h < 10 ? '0' + h : h
  var M = date.getMinutes()
  M = M < 10 ? '0' + M : M
  var str = y + '-' + m + '-' + d + ' ' + h + ':' + M
  return str
}
function dateStampToString(timestamp) {
  // console.log("ffff",timestamp)
  if (timestamp == null) {
    return ''
  }
  var date = new Date(timestamp)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate()
  d = d < 10 ? '0' + d : d
  var h = date.getHours()
  h = h < 10 ? '0' + h : h
  var M = date.getMinutes()
  M = M < 10 ? '0' + M : M
  var str = y + '-' + m + '-' + d
  return str
}
function timesStampToString(timestamp) {
  if (timestamp == null) {
    return ''
  }
  var date = new Date(timestamp)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  var d = date.getDate()
  d = d < 10 ? '0' + d : d
  var h = date.getHours()
  h = h < 10 ? '0' + h : h
  var M = date.getMinutes()
  M = M < 10 ? '0' + M : M
  var s = date.getSeconds()
  s = s < 10 ? '0' + s : s
  var str = y + '-' + m + '-' + d + ' ' + h + ':' + M + ':' + s
  return str
}

function getHierarchy(admin, url) {
  //   console.log("getHierarchy", admin, url);
  //获取导航栏
  admin.req({
    type: 'POST',
    url: '/console/security/menu/getHierarchy',
    data: {
      uri: url,
    },
    success: function (data) {
      var data = data.data
      for (var i = 0; i < data.length; i++) {
        $('#resourcesList').append('<span lay-separator>/</span><a>' + data[i] + '</a>')
      }
    },
  })
}

/**
 * 获取用水户类型
 * @param admin
 * @param form
 */
function getConsumerType(admin, form) {
  admin.req({
    url: '/console/archives/consumerType/list',
    type: 'get',
    success: function (json) {
      var data = json.data
      var select_html = '<option value="" > ' + i18nLang['i18n.collect.用户类型'] + '</option>'
      for (var x in data) {
        var option_html = "<option value='" + data[x]['id'] + "'>" + data[x]['name'] + '</option>'
        select_html = select_html + option_html
      }
      $("select[name='consumerTypeId']").html(select_html)
      form.render('select')
    },
  })
}

/**
 *
 * 公共打印函数
 * @param css  打印页面样式
 * @param html 打印页面内容
 */
function word_print(css, html) {
  //判断iframe是否存在，不存在则创建ifr
  console.log('print-iframe===3=')
  var iframe = document.getElementById('print-iframe')
  console.log('print-iframe==2=')
  if (!iframe) {
    console.log('print-iframe===1=')
    iframe = document.createElement('IFRAME')
    var doc = null
    iframe.setAttribute('id', 'print-iframe')
    iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;')
    document.body.appendChild(iframe)
    doc = iframe.contentWindow.document
    //这里可以自定义样式
    doc.write('<style>' + css + '</style>')
    doc.write('<div>' + html + '</div>')
    doc.close()
    iframe.contentWindow.focus()
  }
  iframe.contentWindow.print()
  //清除历史打印记录
  document.body.removeChild(iframe)
}

/**
 * 表格导出
 * @param id
 * @param fileName
 */
function exportFile(id, fileName) {
  //根据传入tableID获取表头
  var headers = $('div[lay-id=' + id + '] .layui-table-box table').get(0)
  var htrs = Array.from(headers.querySelectorAll('tr'))
  var titles = {}
  for (var j = 0; j < htrs.length; j++) {
    var hths = Array.from(htrs[j].querySelectorAll('th'))
    for (var i = 0; i < hths.length; i++) {
      var clazz = hths[i].getAttributeNode('class').value
      var fieldNode = hths[i].dataset.field
      //   console.log(fieldNode);
      if (
        clazz != ' layui-table-col-special' &&
        clazz != 'layui-hide' &&
        fieldNode != 'checkbox' &&
        fieldNode != 'operate' &&
        fieldNode != 'warningState'
      ) {
        //排除居左、居右、隐藏字段
        //排除复选框、操作栏
        //修改:默认字段data-field+i,兼容部分数据表格中不存在data-field值的问题
        titles['data-field' + i] = hths[i].innerText
      }
    }
  }
  //根据传入tableID获取table内容
  var bodys = $('div[lay-id=' + id + '] .layui-table-box table').get(1)
  var btrs = Array.from(bodys.querySelectorAll('tr'))
  var bodysArr = new Array()
  for (var j = 0; j < btrs.length; j++) {
    var contents = {}
    var btds = Array.from(btrs[j].querySelectorAll('td'))
    for (var i = 0; i < btds.length; i++) {
      for (var key in titles) {
        //修改:默认字段data-field+i,兼容部分数据表格中不存在data-field值的问题
        var field = 'data-field' + i
        if (field === key) {
          //根据表头字段获取table内容字段
          contents[field] = btds[i].innerText
        }
      }
    }
    bodysArr.push(contents)
  }
  //将标题行置顶添加到数组
  bodysArr.unshift(titles)
  //导出excel
  LAY_EXCEL.exportExcel(
    {
      sheet1: bodysArr,
    },
    fileName + new Date().toLocaleString() + '.xlsx',
    'xlsx',
  )
}
/**
 * 表格导出多个
 * @param id
 * @param fileName
 */
function exportFiles(id, fileName) {
  //根据传入tableID获取表头
  var headers = $('div[id=' + id + '] .layui-table-box table').get(0) //$("div[id=" + id + "] .layui-table-box table").get(0);
  var titles = {}
  var htrs = Array.from(headers.querySelectorAll('tr'))

  var row = htrs.length
  for (var j = 0; j < htrs.length; j++) {
    var hths = Array.from(htrs[j].querySelectorAll('th'))
    for (var i = 0; i < hths.length; i++) {
      var clazz = hths[i].getAttributeNode('class').value
      var fieldNode = hths[i].dataset.field
      console.log(fieldNode)
      if (clazz != ' layui-table-col-special' && clazz != 'layui-hide' && fieldNode != 'checkbox' && fieldNode != 'operate') {
        //排除居左、居右、隐藏字段
        //排除复选框、操作栏
        //修改:默认字段data-field+i,兼容部分数据表格中不存在data-field值的问题
        titles['data-field' + i] = hths[i].innerText
      }
    }
  }

  //根据传入tableID获取table内容
  var bodys = $('div[id=' + id + '] .layui-table-box table').get(1) //.get(1);
  var btrs = Array.from(bodys.querySelectorAll('tr'))
  var bodysArr = new Array()
  row += btrs.length
  for (var j = 0; j < btrs.length; j++) {
    var contents = {}
    var btds = Array.from(btrs[j].querySelectorAll('td'))

    for (var i = 0; i < btds.length; i++) {
      for (var key in titles) {
        console.log('i+row', i + row)
        //修改:默认字段data-field+i,兼容部分数据表格中不存在data-field值的问题
        var field = 'data-field' + i
        if (field === key) {
          //根据表头字段获取table内容字段
          contents[field] = btds[i].innerText
        }
      }
    }
    bodysArr.push(contents)
  }

  var headers2 = $('div[id=' + id + '] .layui-table-box table').get(2)
  var titles2 = {}
  var htrs2 = Array.from(headers2.querySelectorAll('tr'))
  row += htrs2.length
  for (var j = 0; j < htrs2.length; j++) {
    var hths = Array.from(htrs2[j].querySelectorAll('th'))
    for (var i = 0; i < hths.length; i++) {
      var clazz = hths[i].getAttributeNode('class').value
      var fieldNode = hths[i].dataset.field
      console.log(fieldNode)
      if (clazz != ' layui-table-col-special' && clazz != 'layui-hide' && fieldNode != 'checkbox' && fieldNode != 'operate') {
        //排除居左、居右、隐藏字段
        //排除复选框、操作栏
        //修改:默认字段data-field+i,兼容部分数据表格中不存在data-field值的问题
        titles2['data-field' + i] = hths[i].innerText
      }
    }
  }

  //根据传入tableID获取table内容
  var bodys2 = $('div[id=' + id + '] .layui-table-box table').get(3) //.get(1);
  var btrs2 = Array.from(bodys2.querySelectorAll('tr'))
  var bodysArr2 = new Array()
  row += btrs2.length
  for (var j = 0; j < btrs2.length; j++) {
    var contents = {}
    var btds = Array.from(btrs2[j].querySelectorAll('td'))

    for (var i = 0; i < btds.length; i++) {
      for (var key in titles) {
        //修改:默认字段data-field+i,兼容部分数据表格中不存在data-field值的问题
        var field = 'data-field' + i
        if (field === key) {
          //根据表头字段获取table内容字段
          contents[field] = btds[i].innerText
        }
      }
    }
    bodysArr2.push(contents)
  }
  // console.log("tr====",row)
  //将标题行置顶添加到数组
  bodysArr.unshift(titles)
  bodysArr2.unshift(titles2)
  // bodysArr.push();
  // console.log(bodysArr.concat(bodysArr2));
  // console.log(bodysArr,"[...bodysArr,bodysArr2]:",[...bodysArr,...JSON.parse(JSON.stringify(bodysArr2))])
  //导出excel
  LAY_EXCEL.exportExcel(
    {
      sheet1: bodysArr.concat(bodysArr2),
    },
    fileName + new Date().toLocaleString() + '.xlsx',
    'xlsx',
  )
}
//判空
function isNull(val) {
  if (val == null || typeof val == 'undefined' || val == '') return true
  return false
}
/**
 * 获取本周的第一天
 * 返回格式: YYYY-mm-dd
 *    例子: 当日为: 2020-11-27
 *      返回日期为: 2020-11-23
 * */
function getCurrentWeekFirstDay() {
  let date = new Date()
  let weekFirstDay = new Date(date - (date.getDay() - 1) * 86400000)
  let firstMonth = Number(weekFirstDay.getMonth()) + 1

  if (firstMonth < 10) {
    firstMonth = '0' + firstMonth
  }
  let weekFirstDays = weekFirstDay.getDate()
  if (weekFirstDays < 10) {
    weekFirstDays = '0' + weekFirstDays
  }
  return weekFirstDay.getFullYear() + '-' + firstMonth + '-' + weekFirstDays
}

/**
 * 获取本周的最后一天
 * 返回格式: YYYY-mm-dd
 *    例子: 当日为: 2020-11-27
 *      返回日期为: 2020-11-29
 * */
function getCurrentWeekLastDay() {
  let date = new Date()
  let weekFirstDay = new Date(date - (date.getDay() - 1) * 86400000)
  let weekLastDay = new Date((weekFirstDay / 1000 + 6 * 86400) * 1000)
  let lastMonth = Number(weekLastDay.getMonth()) + 1
  if (lastMonth < 10) {
    lastMonth = '0' + lastMonth
  }
  let weekLastDays = weekLastDay.getDate()
  if (weekLastDays < 10) {
    weekLastDays = '0' + weekLastDays
  }
  return weekFirstDay.getFullYear() + '-' + lastMonth + '-' + weekLastDays
}
//格式化月和日为MM、dd
function formatDate(value) {
  if (value < 10) {
    value = '0' + value
  }
  return value
}
/**
 * 根据 年份 和 季度  获取 季度 第一天 和 季度 最后 一天
 * @param year
 * @param quarter
 */
function getQuartorStartDate(year, quarter) {
  let startMonth = 1
  if (quarter == 1) {
    startMonth = 1
  } else if (quarter == 2) {
    startMonth = 4
  } else if (quarter == 3) {
    startMonth = 7
  } else if (quarter == 4) {
    startMonth = 10
  }
  let endMonth = startMonth + 2
  if (quarter == 0) {
    endMonth = 12
  }
  const startDate = year + '-' + formatDate(startMonth) + '-01'
  const endDate = year + '-' + formatDate(endMonth) + '-' + new Date(year, endMonth, 0).getDate()
  // console.log(startDate,endDate)
  return [startDate, endDate]
}

//获取当前时间
function genTime(opt) {
  let now = new Date()
  let year = now.getFullYear()
  let mth = now.getMonth()
  let day = now.getDate()
  let month = mth + 1
  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  let str
  if (opt == 'day') {
    str = year + '-' + month + '-' + day
  } else if (opt == 'week') {
    str = getCurrentWeekFirstDay() + '~' + getCurrentWeekLastDay()
  } else if (opt == 'month') {
    str = year + '-' + month
  } else if (opt == 'quarter') {
    if (mth < 3) {
      str = year + ' - 1' + i18nLang['i18n.report.季']
    } else if (mth < 6) {
      str = year + ' - 2' + i18nLang['i18n.report.季']
    } else if (mth < 9) {
      str = year + ' - 3' + i18nLang['i18n.report.季']
    } else if (mth < 12) {
      str = year + ' - 4' + i18nLang['i18n.report.季']
    }
  } else if (opt == 'year') {
    str = year
  }
  return str
}

/**
 * 时间格式转换
 * @param date 时间值
 * @param type 时间类型
 */

function getStartEndTime(date, type) {
  if (date) {
    if (type == 'day') {
      var startTime = new Date(date)
      var endTime = new Date(date)
    } else if (type == 'week') {
      var arr = date.split('~')
      var first = arr[0]
      var last = arr[1]
      var startTime = new Date(first)
      var endTime = new Date(last)
    } else if (type == 'month') {
      var arr = date.split('-')
      var year = arr[0]
      var month = arr[1]
      var startTime = new Date(year, month - 1, 1) //这个月的第一天
      var currentMonth = startTime.getMonth() //取得月份数
      var endTime = new Date(startTime.getFullYear(), currentMonth + 1, 0) //是0而不是-1
    } else if (type == 'quarter') {
      var year = date.slice(0, 4)
      var quarter = date.slice(7, 8)
      var arr = getQuartorStartDate(year, quarter)
      var first = arr[0]
      var last = arr[1]
      var startTime = new Date(first)
      var endTime = new Date(last)
    } else if (type == 'year') {
      var startTime = new Date(date)
      var endTime = new Date(date, 12, 0)
    } else {
    }
    startTime.setHours(0)
    startTime.setMinutes(0)
    startTime.setSeconds(0)
    startTime.setMilliseconds(0)
    endTime.setHours(23)
    endTime.setMinutes(59)
    endTime.setSeconds(59)
    endTime.setMilliseconds(999)

    return {
      startAt: startTime.getTime(),
      endAt: endTime.getTime(),
    }
  } else {
    return {
      startAt: '',
      endAt: '',
    }
  }
}
function getStartEndTime2(date, type) {
  if (date) {
    if (type == 'day') {
      var startTime = new Date(date)
      var endTime = new Date(date)
    } else if (type == 'week') {
      var arr = date.split('~')
      var first = arr[0]
      var last = arr[1]
      var startTime = new Date(first)
      var endTime = new Date(last)
    } else if (type == 'month') {
      var arr = date.split('-')
      var year = arr[0]
      var month = arr[1]
      var startTime = new Date(year, month - 1, 1) //这个月的第一天
      var currentMonth = startTime.getMonth() //取得月份数
      var endTime = new Date(startTime.getFullYear(), currentMonth + 1, 0) //是0而不是-1
    } else if (type == 'quarter') {
      var year = date.slice(0, 4)
      var quarter = date.slice(5, 6)
      var arr = getQuartorStartDate(year, quarter)
      var first = arr[0]
      var last = arr[1]
      var startTime = new Date(first)
      var endTime = new Date(last)
    } else if (type == 'year') {
      var startTime = new Date(date)
      var endTime = new Date(date, 12, 0)
    } else {
    }
    startTime.setHours(0)
    startTime.setMinutes(0)
    startTime.setSeconds(0)
    startTime.setMilliseconds(0)
    endTime.setHours(23)
    endTime.setMinutes(59)
    endTime.setSeconds(59)
    endTime.setMilliseconds(999)

    return {
      startAt: startTime.getTime(),
      endAt: endTime.getTime(),
    }
  } else {
    return {
      startAt: '',
      endAt: '',
    }
  }
}

// 周选择
function weekDone(value, date, endDate, ele) {
  if (value != '' && value.length > 0) {
    let today = new Date(value.substring(0, 10))
    let weekday = today.getDay()
    let monday
    let sunday
    if (weekday == 0) {
      monday = new Date(1000 * 60 * 60 * 24 * (weekday - 6) + today.getTime())
    } else {
      monday = new Date(1000 * 60 * 60 * 24 * (1 - weekday) + today.getTime())
    }
    if (weekday == 0) {
      sunday = today
    } else {
      sunday = new Date(1000 * 60 * 60 * 24 * (7 - weekday) + today.getTime())
    }
    let month = monday.getMonth() + 1
    if (month < 10) {
      month = '0' + month
    }
    let day1 = monday.getDate()
    if (day1 < 10) {
      day1 = '0' + day1
    }
    let start = '' + monday.getFullYear() + '-' + month + '-' + day1
    let month2 = sunday.getMonth() + 1
    if (month2 < 10) {
      month2 = '0' + month2
    }
    let day2 = sunday.getDate()
    if (day2 < 10) {
      day2 = '0' + day2
    }
    let end = '' + sunday.getFullYear() + '-' + month2 + '-' + day2
    ele.val(start + '~' + end)
  } else {
    ele.val('')
  }
}
// 季度选择
function seasonReady(value, date, endDate, ele) {
  console.log('季度选择')
  var ren = function (thiz) {
    var mls = thiz.find('.laydate-month-list')
    mls.each(function (i, e) {
      $(this)
        .find('li')
        .each(function (inx, ele) {
          var cx = ele.innerHTML
          if (inx < 4) {
            ele.innerHTML = cx.replace(/月/g, i18nLang['i18n.collection.季度'])
            if (cx == 'Jan') ele.innerHTML = 'first'
            if (cx == 'Feb') ele.innerHTML = 'second'
            if (cx == 'Mar') ele.innerHTML = '3rd'
            if (cx == 'Apr') ele.innerHTML = 'fourth'
          } else {
            ele.style.display = 'none'
          }
        })
    })
  }
  var hd = $('#layui-laydate' + ele.attr('lay-key'))
  if (hd.length > 0) {
    hd.click(function () {
      ren($(this))
    })
  }
  ren(hd)
}
function seasonDone(value, date, endDate, ele) {
  console.log('季度选择seasonDone')
  if (!isNull(date) && date.month > 0 && date.month < 5) {
    ele.attr('startDate', date.year + '-' + date.month)
  } else {
    ele.attr('startDate', '')
  }
  if (!isNull(endDate) && endDate.month > 0 && endDate.month < 5) {
    ele.attr('endDate', endDate.year + '-' + endDate.month)
  } else {
    ele.attr('endDate', '')
  }
}

function setpage() {
  var height = window.innerHeight
  if (height < 600) {
    return ['60%', '70%']
  } else {
    return ['60%', '84%']
  }
}
function setmin() {
  var height = window.innerHeight
  if (height < 600) {
    return ['600px', '70%']
  } else {
    return ['600px', '84%']
  }
}
function setmin2() {
  var height = window.innerHeight
  if (height < 600) {
    return ['700px', '70%']
  } else {
    return ['700px', '84%']
  }
}
//判断是否为空
function validatenull(val) {
  if (val instanceof Array) {
    if (val.length === 0) return true
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true
  } else {
    if (val === 'null' || val === null || val === 'undefined' || val === undefined || val === '') return true
    return false
  }
  return false
}
//身份证
function cardIdVal(value) {
  var result = true
  var msg = ''
  var city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 ',
  }
  if (!validatenull(value)) {
    console.log('ffff', value)
    if (value.length === 18) {
      if (!value || !/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
        msg = '证件号码格式错误'
      } else if (!city[value.substr(0, 2)]) {
        msg = '地址编码错误'
      } else {
        // 18位身份证需要验证最后一位校验位
        value = value.split('')
        // ∑(ai×Wi)(mod 11)
        // 加权因子
        const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
        // 校验位
        const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2, 'x']
        let sum = 0
        let ai = 0
        let wi = 0
        for (let i = 0; i < 17; i++) {
          ai = value[i]
          wi = factor[i]
          sum += ai * wi
        }
        const last = parity[sum % 11]
        if (parity[sum % 11] !== value[17]) {
          msg = '证件号码校验位错误'
        } else {
          result = false
        }
      }
    } else {
      msg = '证件号码长度不为18位'
    }
  } else {
    msg = '证件号码不能为空'
  }
  // list.push(result);
  // list.push(msg);
  return msg
}
//获取最近7天
function getSeventh() {
  let days = []
  let date = new Date()
  for (let i = 0; i <= 144; i += 24) {
    //144是前六天的小时数
    let dateItem = new Date(date.getTime() - i * 60 * 60 * 1000) //使用当天时间戳减去以前的时间毫秒（小时*分*秒*毫秒）
    let y = dateItem.getFullYear() //获取年份
    let m = dateItem.getMonth() + 1 //获取月份js月份从0开始，需要+1
    let d = dateItem.getDate() //获取日期
    m = addDate0(m) //给为单数的月份补零
    d = addDate0(d) //给为单数的日期补零
    let valueItem = y + '-' + m + '-' + d //组合
    days.push(valueItem) //添加至数组
  }
  console.log('最近七天日期：', days)

  return days
}

//给日期加0
function addDate0(time) {
  if (time.toString().length == 1) {
    time = '0' + time.toString()
  }
  return time
}

// 近3个月
function getLast3Month() {
  var now = new Date()
  var year = now.getFullYear()
  var month = now.getMonth() + 1 //0-11表示1-12月
  var day = now.getDate()
  var dateObj = {}
  dateObj.now = year + '-' + month + '-' + day
  var nowMonthDay = new Date(year, month, 0).getDate() //当前月的总天数
  if (month - 3 <= 0) {
    //如果是1、2、3月，年数往前推一年
    var last3MonthDay = new Date(year - 1, 12 - (3 - parseInt(month)), 0).getDate() //3个月前所在月的总天数
    if (last3MonthDay < day) {
      //3个月前所在月的总天数小于现在的天日期
      dateObj.last = year - 1 + '-' + (12 - (3 - month)) + '-' + last3MonthDay
    } else {
      dateObj.last = year - 1 + '-' + (12 - (3 - month)) + '-' + day
    }
  } else {
    var last3MonthDay = new Date(year, parseInt(month) - 3, 0).getDate() //3个月前所在月的总天数
    if (last3MonthDay < day) {
      //3个月前所在月的总天数小于现在的天日期
      if (day < nowMonthDay) {
        //当前天日期小于当前月总天数,2月份比较特殊的月份
        dateObj.last = year + '-' + (month - 3) + '-' + (last3MonthDay - (nowMonthDay - day))
      } else {
        dateObj.last = year + '-' + (month - 3) + '-' + last3MonthDay
      }
    } else {
      dateObj.last = year + '-' + (month - 3) + '-' + day
    }
  }
  return dateObj
}
// 近一个月
function getLastMonth() {
  var now = new Date()
  var year = now.getFullYear()
  var month = now.getMonth() + 1 //0-11表示1-12月
  var day = now.getDate()
  var dateObj = {}
  dateObj.now = year + '-' + month + '-' + day
  var nowMonthDay = new Date(year, month, 0).getDate() //当前月的总天数
  if (month - 1 <= 0) {
    //如果是1月，年数往前推一年<br>
    dateObj.last = year - 1 + '-' + 12 + '-' + day
  } else {
    var lastMonthDay = new Date(year, parseInt(month) - 1, 0).getDate()
    if (lastMonthDay < day) {
      //1个月前所在月的总天数小于现在的天日期
      if (day < nowMonthDay) {
        //当前天日期小于当前月总天数
        dateObj.last = year + '-' + (month - 1) + '-' + (lastMonthDay - (nowMonthDay - day))
      } else {
        dateObj.last = year + '-' + (month - 1) + '-' + lastMonthDay
      }
    } else {
      dateObj.last = year + '-' + (month - 1) + '-' + day
    }
  }
  return dateObj
}
// 近一周
function getLastWeek() {
  var now = new Date()
  var year = now.getFullYear()
  var month = now.getMonth() + 1 //0-11表示1-12月
  var day = now.getDate()
  var dateObj = {}
  dateObj.now = year + '-' + month + '-' + day
  if (day - 7 <= 0) {
    //如果在当月7日之前
    var lastMonthDay = new Date(year, parseInt(month) - 1, 0).getDate() //1周前所在月的总天数
    if (month - 1 <= 0) {
      //如果在当年的1月份
      dateObj.last = year - 1 + '-' + 12 + '-' + (31 - (7 - day))
    } else {
      dateObj.last = year + '-' + (month - 1) + '-' + (lastMonthDay - (7 - day))
    }
  } else {
    dateObj.last = year + '-' + month + '-' + (day - 7)
  }
  return dateObj
}
//获取语言
function getCookieValue(cookieName) {
  var name = cookieName + '='
  var decodedCookie = decodeURIComponent(document.cookie)
  var cookieArray = decodedCookie.split(';')

  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i].trim()

    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length)
    }
  }

  return ''
}
/**
 * 格式转化
 * {name: 'zs', age: 18} => name=zs&age=18
 * @param {Object} params 参数对象
 */
function stringify(params) {
  return Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&')
}

function allExport(params, url, fileName, setter) {
  let exportParams = stringify(params)
  // console.log('导出参数', exportParams)
  // // 1. 创建 xhr 对象
  const xhr = new XMLHttpRequest()
  // 2. 调用 open 函数
  xhr.open('GET', setter.serverUrl + url + '?' + exportParams, true)
  // 3. 设置 Content-Type 属性（固定写法）
  // Content-Type: multipart/form-data;
  xhr.setRequestHeader('Content-Type', 'application/vnd.ms-excel;charset=UTF-8')
  xhr.setRequestHeader('X-Auth-Token', layui.data(setter.tableName)[setter.request.tokenName])
  //4. 定义responseType='blob', 是读取文件成功的关键，这样设置可以解决下载文件乱码的问题
  xhr.responseType = 'blob'
  xhr.onreadystatechange = function () {
    console.log(xhr.readyState, xhr.status)
    if (xhr.readyState === 4 && xhr.status === 200) {
      // var responseText = xhr.responseText; 不能使用这个获取结果
      //返回二进制数据流
      // console.log(responseText);
      // console.log('成功了吗', xhr)
      // console.log(xhr.response)
      const blob = new Blob([xhr.response], {
        type: 'application/vnd.ms-excel;charset=UTF-8',
      })
      const blobUrl = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.download = fileName
      a.href = blobUrl
      a.click()
    }
  }
  // 4. 调用 send 函数发送携带的数据
  xhr.send()
}
```
