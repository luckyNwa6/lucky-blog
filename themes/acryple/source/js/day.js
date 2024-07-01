var d = new Date()
m = d.getMonth() + 1
dd = d.getDate()
y = d.getFullYear()
//cookie函数

function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10)
      break
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
      break
    default:
      return 0
      break
  }
}

//节假日
if (m == 1 && dd == 1) {
  //元旦节
  console.log(y.toString() + '年元旦快乐！')
  if (sessionStorage.getItem('isPopupWindow') != '1') {
    Swal.fire(y.toString() + '年元旦快乐！')
    sessionStorage.setItem('isPopupWindow', '1')
  }
}

l = [
  '震惊！微软让Minecraft Java免费了！',
  'Minecraft竟然违背Mojang的原则发布2.0！',
  '非常抱歉，因为不可控原因，博客将于明天停止运营，再见',
  '好消息，日本没了！',
  '美国垮了，背后原因竟是时刻心心念念想着祖国的川普！',
  '微软垮了！',
  '？！',
]
console.log(m, dd)
if (m == 4 && dd == 1) {
  //愚人节，随机谎话
  console.log(l[randomNum(0, l.length - 1)])
  if (sessionStorage.getItem('isPopupWindow') != '1') {
    Swal.fire(l[randomNum(0, l.length - 1)])
    sessionStorage.setItem('isPopupWindow', '1')
  }
}
if (m == 5 && dd == 1) {
  //劳动节
  console.log('劳动节快乐！为助力各行各业发展辛勤工作的人们致敬！')
  if (sessionStorage.getItem('isPopupWindow') != '1') {
    Swal.fire('劳动节快乐！为助力各行各业发展辛勤工作的人们致敬！')
    sessionStorage.setItem('isPopupWindow', '1')
  }
}

if (m == 6 && dd == 1) {
  //儿童节
  console.log('各位小朋友们，儿童节快乐！')
  if (sessionStorage.getItem('isPopupWindow') != '1') {
    Swal.fire('各位小朋友们，儿童节快乐！')
    sessionStorage.setItem('isPopupWindow', '1')
  }
}

//传统节日部分
var lunar = calendarFormatter.solar2lunar()
//农历采用汉字计算，防止出现闰月导致问题
if (
  (lunar['IMonthCn'] == '正月' && lunar['IDayCn'] == '初六') ||
  (lunar['IMonthCn'] == '正月' && lunar['IDayCn'] == '初五') ||
  (lunar['IMonthCn'] == '正月' && lunar['IDayCn'] == '初四') ||
  (lunar['IMonthCn'] == '正月' && lunar['IDayCn'] == '初三') ||
  (lunar['IMonthCn'] == '正月' && lunar['IDayCn'] == '初二') ||
  (lunar['IMonthCn'] == '正月' && lunar['IDayCn'] == '初一') ||
  (lunar['IMonthCn'] == '腊月' && lunar['IDayCn'] == '三十') ||
  (lunar['IMonthCn'] == '腊月' && lunar['IDayCn'] == '廿九')
) {
  //春节，本来只有大年三十到初六，但是有时候除夕是大年二十九，所以也加上了
  console.log(y.toString() + '年新年快乐！')
  if (sessionStorage.getItem('isPopupWindow') != '1') {
    Swal.fire(y.toString() + '年新年快乐！')
    sessionStorage.setItem('isPopupWindow', '1')
  }
}
if (lunar['IMonthCn'] == '正月' && lunar['IDayCn'] == '十五') {
  //元宵节
  console.log('元宵节快乐！')
  if (sessionStorage.getItem('isPopupWindow') != '1') {
    Swal.fire('元宵节快乐！')
    sessionStorage.setItem('isPopupWindow', '1')
  }
}
if (lunar['IMonthCn'] == '正月' && lunar['IDayCn'] == '十五') {
  //元宵节
  console.log('元宵节快乐！')
  if (sessionStorage.getItem('isPopupWindow') != '1') {
    Swal.fire('元宵节快乐！')
    sessionStorage.setItem('isPopupWindow', '1')
  }
}
if (lunar['IMonthCn'] == '五月' && lunar['IDayCn'] == '初五') {
  //端午节
  console.log('端午节快乐！')
  if (sessionStorage.getItem('isPopupWindow') != '1') {
    Swal.fire('端午节快乐！')
    sessionStorage.setItem('isPopupWindow', '1')
  }
}

if (lunar['IMonthCn'] == '八月' && lunar['IDayCn'] == '十五') {
  //中秋节
  console.log('中秋节快乐！')
  if (sessionStorage.getItem('isPopupWindow') != '1') {
    Swal.fire('中秋节快乐！')
    sessionStorage.setItem('isPopupWindow', '1')
  }
}
//国庆节
if (m == 10 && dd <= 5) {
  console.log('祖国' + (y - 1949).toString() + '岁生日快乐！')
  if (sessionStorage.getItem('isPopupWindow') != '1') {
    Swal.fire('祖国' + (y - 1949).toString() + '岁生日快乐！')
    sessionStorage.setItem('isPopupWindow', '1')
  }
}
