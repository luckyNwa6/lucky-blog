---
title: Mysql知识点
description: Mysql使用相关的学习笔记
cover: "https://imgs.luckynwa.top/blog/mysqlIcon2.png"
categories: Java
tags: Mysql
comments: false
abbrlink: 29614
date: 2022-04-19 11:22:21
---

## 常用以及总结

设计数据库时候：

一个汉字占 3 个字节，varchar(255)最多存 85 汉字

理论上可以存 255 字符、如果是中文字符(占 2 个字节)，127 个中文字符

位（bit）：数据存储的最小单位。每个二进制数字 0 或者 1 就是 1 个位；

字节（byte）： 8 个位构成一个字节；即：1 byte (字节)= 8 bit(位)；

字符：是指计算机中使用的字母、数字、字和符号。

int 是整型而且有 4 个字节=32 位，并且符号位占一位，它有自己的范围-2^31，2^31-1 即

[-2147483648,2147483647] 有 10 位 如果数字超过它的最大值，手机号 是 11 位，共五个字节(11 位)则用 long 类型或者 String

## 数据类型

###### int

int(11)、tinyint(4) 、smallint(6)、mediumint(9)、bigint(20) 整形选个合适长度，不改它

varchar(255)、char(1) 这边需要根据需求改长度，这里的长度是字符，255 就是可以存 255 个字符

_tip：括号里面是它的默认长度也是固定长度，比如 int 是默认长度你有一个值 199，这个长度小于 3 所以它会填 0 来补充 00000000199_

###### char

char 是一个是固定长度,varchar 是可变长度

为了提高 char 类型的性能，可以采取以下措施：

- 使用 char 类型的等值查询，避免使用模糊查询。

- 避免使用过长的 char 类型，尽量选择合适的长度。

- 将 char 类型的列设置为 NOT NULL，以提高查询速度。

- 将 char 类型的列设置为索引，以提高查询速度。

​ 从空间上考虑，用 varchar 合适；从效率上考虑，用 char 合适，关键是根据实际情况找到权衡点，所有当需要大量查询需求的时候，用 char。当对于保存数据量过大的需求时，为了节省储存空间用 varchar。

###### text

没有默认长度，最大长度为 65,535(2 的 16 次方–1)字符的 TEXT 列。

Text 主要是用来存放非二进制的文本，如论坛帖子,题目，或者百度知道的问题和回答之类。TEXT 列不能有默认值，存储或检索过程中，不存在大小写转换，后面如果指定长度，不会报错误，但是这个长度是不起作用的，意思就是你插入数据的时候，超过你指定的长度还是可以正常插入。其实可以总结为用来储存大批量的文本信息的时候，使用 TEXT。

###### 日期

datetime 显示 YYYY-MM-DD HH:MM:SS'格式显示 日期时间

date 只有日期

time 只有时间

timestamp 列类型可以使用它自动地用当前的日期和时间标记 INSERT 或 UPDATE 的操作。

它有 2 个属性值 CURRENT_TIMESTAMP 和 ON UPDATE CURRENT_TIMESTAMP

## 数据库操作

（创建 Create、检索 Retrieve、更改 Update、删除 Delete）

```
查：select * from 表名 where 条件
删：delect from 表名 where 条件
改：update 表名 set 字段1=对应值1，..  where 条件
增：insert into 表名(字段1,字段2..) values(对应值1,对应值2...)
```

查和删不加条件，则全部查找、删除；

增也可以不加字段 1、...，直接 values 对应上值也行，而且也可以插入多条，直接 values 后面再逗号继续插入值

多表查的时候有共同的字段，需要声明一下是哪个表里面的.

mysql 里运行不区分大小写，尽量都大写

-- (默认升序 asc 数据条从上到下递增 降序 desc)

HAVING 是分组之后加的条件

## 六大范式

英文 Normal form

第一范式（1NF）、第二范式（2NF）、第三范式（3NF）、巴斯-科德范式（BCNF）、第四范式(4NF）和第五范式（5NF，又称完美范式）。满足最低要求的范式是第一范式（1NF）。在第一范式的基础上进一步满足更多规范要求的称为第二范式（2NF），其余范式以次类推。一般数据库只需满足第三范式(3NF）。

**第一范式（1NF）**：强调属性的原子性。即属性不可再分。

比如：学生表中

id 学生姓名 学生学号 学生人数 手机号 符合

id 学生姓名 学生（学生学号 学生人数） 手机号 不符合

再比如一个字段家庭地址，那肯定有省市区这些值，这些值也可以看出一张表，所以不满足，**不允许表中还有表**，一个字段只存储一项信息

**第二范式（2NF）**：第二范式就是在第一范式的基础上属性完全依赖于主键。也可以说是在第一范式的基础上，消除了非主属性对码的部分函数依赖。

比如：学生表中

```
学号 姓名  课程  班级 分数
1    小嗯  语文  1班  99
1    小嗯  数学  1班  98
2    小维  语文  2班  97
2    小维  科学  2班  100
```

可以看出(课程) → (分数)
(学号) → (姓名, 班级)

1.元组：表中的一行就是一个元组。

2.码:一个表中,可以唯一决定一个元组的属性"集合"。假设 k 为表中的某个属性,在 k 确定的情况下,这个表中的其他属性都可以确定,那么 k 就叫做候选码，也叫码。

(学号，课程)这个属性组就叫做码。

3.主属性:码里面的属性就是主属性。

4.部分函数依赖：比如上表中**学号和课程组成主键**已经不满足 2NF，那么你必须知道这 2 个的值才能知道后面列对应的值，就像 Z=X+Y 一样，你输入一个 X 不知道 Y 无法得到 Z，而 Z=X，Z=Y 就是部分函数依赖。而且这张表数据冗余，可以分成 2 张表

```
学号 课程 分数                  学号  姓名  班级
1    语文  99                   1    小嗯  1班
1    数学  98                   2    小维  2班
2    语文  97
2    科学  100
```

上面 2 张表属性都完全依赖于主键学号，这就是第二范式

**第三范式（3NF）**： 在 2NF 的基础上，消除了非主属性对于码的传递函数依赖。即，如果存在非主属性对于码的传递函数依赖,则不符合 3NF。

```
订单id  商品id  商品尺寸
1        1      22
```

可以看出主键订单 id，满足第二范式，商品 id 依赖订单 id，商品尺寸依赖商品 id，所以不满足第三范式，分成下面 2 张表即可满足

```
订单id  商品id            商品id   商品尺寸
1        1                 1        22
```

再比如有字段 学号 学生 系名称 系主任 ，可以看出系名称依赖学号，系主任依赖系名称，像上面拆成 2 表即可
