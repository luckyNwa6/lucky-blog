document.oncopy = function () {
  Snackbar.show({
    text: "复制成功！",
    pos: "top-right",
    onActionClick: function (element) {
      window.open("/license");
    },
    actionText: "查看博客声明",
  });
};
document.onkeydown = function (event) {
  event = event || window.event;
  if (event.keyCode == 123) {
    Snackbar.show({
      text: "已打开开发者模式！",
      pos: "top-right",
      onActionClick: function (element) {
        window.open("/license");
      },
      actionText: "查看博客声明",
    });
  }
};
