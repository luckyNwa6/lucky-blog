---
title: Linux命令速查手册
description: 路虽远，行则将至；事虽难，做则必成
cover: https://imgs.luckynwa.top/profile/yys/487.webp
categories: 工具
tags: Doc
comments: true
abbrlink: tool5
summary: >-
  本文系统总结了Linux常用命令。基础指令涵盖ls查看文件、cd切换目录、pwd查看路径、mkdir创建目录、touch创建文件、cat/more查看内容、cp复制、mv移动重命名、rm删除等文件操作。进阶内容包括find文件查找、grep文本过滤与统计、重定向与管道符、wc行数统计。还介绍了vim编辑器三种模式及快捷键、tar压缩解压命令，以及systemctl服务管理、chmod权限修改、进程管理、日志查看等运维常用命令，适合初学者入门与日常开发使用。
date: 2025-07-29 03:33:09
---

## 查看路径下的文件和文件夹名称

- `-a` 显示隐藏文件
- `-l` 列表展示
- `-h` 显示文件大小

```shell
ls -lah
```

## 切换工作目录

`cd /` 根目录，`..` 上一级，`-` 回退，`~` 也是根目录

```shell
cd 路径
```

## 查看当前工作目录

```shell
pwd
```

## 相对路径和绝对路径

绝对路径：从 `/` 根目录开始

```shell
cd /nwa/joplin
```

相对路径：在当前目录下直接写

```shell
cd joplin
```

## 创建目录

`-p` 递归创建整条路径

```shell
mkdir luckytextdir
mkdir -p luckyt/hha/text/zzz
```

## 创建文件

```shell
touch 1.txt
```

## 查看文件内容

`cat` 一次性全部展示文件内容

```shell
cat docker-compose.yml
```

`more` 可以分页查看，空格向下翻页，回车换行，q退出，b往前翻

```shell
more docker-compose.yml
```

## 复制文件

`-r` 复制文件夹时使用，表示递归

```shell
cp 1.txt 2.txt
cp 1.txt /nwa/luckytextdir
cp -a /nwa/frp .              # 复制目录至当前目录
```

## 移动文件或文件夹

直接移动到当前路径有改名的效果

```shell
mv 1.txt 11.txt
mv 1.txt /nwa/luckytextdir/22.txt
mv old_dir new_dir            # 重命名/移动目录
```

## 删除

`-r` 删除文件夹，`-f` 强制删除不提示确认

```shell
rm 1.txt
rm -r -f luckyt
rm *.txt
rm -rf *                      # 当前目录全删
rm -rf /*                     # 根目录全删（禁用）
```

## 内置命令查找

查找命令的本体位置

```shell
which mkdir
```

## 查找文件

```shell
find / -name "python"         # 根目录查找
find ./ -name '*.yml'         # 当前路径通配符查找
find / -size +10M             # 查找大于10M的文件
```

## 切换root用户

```shell
sudo su -
```

## 读取文件并过滤内容

```shell
grep 'nginx' docker-compose.yml           # 过滤包含nginx的行
grep ^A pwd.txt                           # 查找以A开头的内容
```

## 内容输入到文件

`>` 覆盖写入，`>>` 追加写入

```shell
echo "abcdd" > 1.txt
ls -l /usr/bin > 2.txt                    # 输出转存到文件
echo "我当前的工作目录：`pwd`"
```

## 查看文件尾部内容

`-f` 持续跟踪，`-10` 显示行数（默认10行）

```shell
tail -f 1.txt
```

## 数量统计

- `-c` 统计bytes数量
- `-m` 统计字符数量
- `-l` 统计行数
- `-w` 统计单词数量

1个英文对应一个字节，1个字节8个比特，1个utf8中文3个字节

```shell
wc -c 1.txt
```

## 管道符

`|` 将左边命令的结果作为右边命令的输入

```shell
cat 1.txt | grep '好'
cat 1.txt | grep '好' | wc -l           # 统计包含"好"的行数
ls /usr/bin | wc -w
```

## 联网安装软件

Debian/Ubuntu 用 `apt`，CentOS 用 `yum`，`-y` 不提示确认

```shell
apt install vim
apt remove vim -y
yum install -y vim
```

## 文本编辑

vi 旧版，vim 新版，vim兼容vi全部功能

**三种模式**：

- 命令模式：按 `i` 进入输入模式
- 输入模式：按 `esc` 回退命令模式
- 底线命令模式：`:wq` 保存退出，`:q!` 不保存退出，`:w` 只保存

```shell
vim hello.txt
```

**命令模式快捷键**：

- `/搜索内容` 进入搜索模式，n向下搜，N向上搜
- `p` 粘贴，`yy` 复制当前行，`u` 撤销，`gg` 跳首行，`G` 跳尾行
- `i` 当前位置进入输入，`a` 光标后进入输入

## 压缩

- `-c` 创建压缩包
- `-x` 解压
- `-v` 显示过程
- `-f` 指定文件名
- `-z` 使用gzip算法（针对.tar.gz文件）

```shell
tar -zcvf lucky.tar.gz *.txt
tar -zxvf lucky.tar.gz
tar -cvf lucky.tar *.txt
tar -xvf lucky.tar
```

## 运维常用命令

```shell
# 服务管理
sudo systemctl restart network          # 重启网络
docker compose up -d                    # 启动服务
docker-compose down                     # 停止服务

# 内存查看
free -m

# 权限修改
chmod 777 文件名                         # 最高权限

# 进程管理
ps -aux | grep java | grep -v grep      # 排除grep查看java进程
kill -9 pid                             # 强制关闭进程
```

## 日志查看

```shell
# 查找异常并显示后50行
grep -A 50 "java.lang.NullPointerException" xxx.log

# 显示前后行数（A=After, B=Before, C=上下行）
grep -A 50 "java.lang.NullPointerException" xxx.log | less

# 实时监控日志
tail -f a.log | grep -A 50 "java.lang.NullPointerException"

# 忽略大小写
grep -i "Exception" a.log

# 查找所有.log文件中的内容（显示文件名）
grep -H -A 50 "java.lang.NullPointerException" *.log

# 处理.gz压缩日志
zgrep -H -A 50 "java.lang.NullPointerException" *.gz

# 统计异常出现次数
grep -c "java.lang.NullPointerException" a.log

# 递归查找包含内容的文件
grep -rl "要查的内容" *

# 进入文件查看前后100行
grep -n -C 100 "要查内容" xxx.log
```

```shell
# less分页查看
less xx.log
/关键字     # 搜索
n下一个     # N上一个
q退出
```
