function printLucky(content) {
  // console.log('-----------------------------手动点击刷新按钮，ai启动回答')
  $('#ai-post').empty() // 清空元素的内容
  printAi(content)
}

function printAi(content) {
  var stringA = $('#ai-post')

  if (stringA.text().length >= content.length) {
    // 退出递归
    return
  } else {
    // stringA 仍然比 content 短，进入下一次等待和递归
    setTimeout(() => {
      stringA.text(stringA.text() + content.charAt(stringA.text().length))
      printAi(content)
    }, 100)
  }
}

printLucky('哈哈，这里是Ai摘要辣，需要本文章的摘要，请点击刷新按钮查看！')
