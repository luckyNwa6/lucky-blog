function printLucky(content) {
  // var content = "99999999999999999999999999999999999911111111111"
  $("#ai-post").empty(); // 清空元素的内容
  printAi(content);
}

function printAi(content) {
  var stringA = $("#ai-post");

  if (stringA.text().length >= content.length) {
    // 退出递归
    return;
  } else {
    // stringA 仍然比 content 短，进入下一次等待和递归
    setTimeout(() => {
      stringA.text(stringA.text() + content.charAt(stringA.text().length));
      printAi(content);
    }, 100);
  }
}

// printLucky("Hello, World!"); // 传入要打印的内容