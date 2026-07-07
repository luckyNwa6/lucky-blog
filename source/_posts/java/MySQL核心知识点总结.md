---
title: MySQL核心知识点总结
description: 春风得意马蹄疾，一日看尽长安花
cover: https://imgs.luckynwa.top/profile/yys/296.webp
categories: 后端
tags: Mysql
comments: true
abbrlink: java7
summary: >-
  本文系统总结了MySQL核心知识。基础篇涵盖存储单位与各类数据类型的区别。操作篇详解CRUD语法、多表查询、聚合函数及开窗函数等进阶技巧。进阶篇深入讲解六大范式理论并通过案例说明拆表优化。索引篇分析回表原理、覆盖索引与索引失效场景。面试篇重点攻克COUNT优化、SQL性能优化、锁机制、事务隔离级别、MVCC原理及主从复制等高频面试题，适合系统学习与面试准备。
date: 2023-09-12 08:11:17
---

# 常用以及总结

设计数据库时候：

一个汉字占 3 个字节，varchar(255)最多存 85 汉字

理论上可以存 255 字符、如果是中文字符(占 2 个字节)，127 个中文字符

位（bit）：数据存储的最小单位。每个二进制数字 0 或者 1 就是 1 个位；

字节（byte）： 8 个位构成一个字节；即：1 byte (字节)= 8 bit(位)；

字符：是指计算机中使用的字母、数字、字和符号。

int 是整型而且有 4 个字节=32 位，并且符号位占一位，它有自己的范围-2^31，2^31-1 即

[-2147483648,2147483647] 有 10 位 如果数字超过它的最大值，手机号 是 11 位，共五个字节(11 位)则用 long 类型或者 String

# 数据类型

## int

int(11)、tinyint(4) 、smallint(6)、mediumint(9)、bigint(20) 整形选个合适长度，不改它

varchar(255)、char(1) 这边需要根据需求改长度，这里的长度是字符，255 就是可以存 255 个字符

_tip：括号里面是它的默认长度也是固定长度，比如 int 是默认长度你有一个值 199，这个长度小于 3 所以它会填 0 来补充 00000000199_

## char

char 是一个是固定长度,varchar 是可变长度

为了提高 char 类型的性能，可以采取以下措施：

- 使用 char 类型的等值查询，避免使用模糊查询。

- 避免使用过长的 char 类型，尽量选择合适的长度。

- 将 char 类型的列设置为 NOT NULL，以提高查询速度。

- 将 char 类型的列设置为索引，以提高查询速度。

从空间上考虑，用 varchar 合适；从效率上考虑，用 char 合适，关键是根据实际情况找到权衡点，所有当需要大量查询需求的时候，用 char。当对于保存数据量过大的需求时，为了节省储存空间用 varchar。

## text

没有默认长度，最大长度为 65,535(2 的 16 次方–1)字符的 TEXT 列。

Text 主要是用来存放非二进制的文本，如论坛帖子,题目，或者百度知道的问题和回答之类。TEXT 列不能有默认值，存储或检索过程中，不存在大小写转换，后面如果指定长度，不会报错误，但是这个长度是不起作用的，意思就是你插入数据的时候，超过你指定的长度还是可以正常插入。其实可以总结为用来储存大批量的文本信息的时候，使用 TEXT。

## 日期

datetime 显示 YYYY-MM-DD HH:MM:SS'格式显示 日期时间

date 只有日期

time 只有时间

timestamp 列类型可以使用它自动地用当前的日期和时间标记 INSERT 或 UPDATE 的操作。

它有 2 个属性值 CURRENT_TIMESTAMP 和 ON UPDATE CURRENT_TIMESTAMP

# 数据库操作

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

# 六大范式

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

# 常用语法

## 对数据库的操作

```sql
show databases;                      -- 查看所有的数据库
create database test;                -- 创建一个叫test的数据库
drop database test;                  -- 删除一个叫test的数据库
show create database 库名;           -- 查看创建库的详细信息
use test;                            -- 选中库，建表之前必须要选择数据库
```

## 表的操作

```sql
show tables;                         -- 在选中的数据库之中查看所有的表
create table 表名 (字段1 类型, 字段2 类型);
desc 表名;                           -- 查看所在的表的字段
drop table 表名;                     -- 删除表
show create table 表名;              -- 查看创建表的详细信息
```

修改表结构：

```sql
alter table 表名 modify 字段 字段类型;                    -- 修改字段类型
alter table 表名 add 字段 字段类型;                       -- 添加新的字段
alter table 表名 add 字段 字段类型 after 字段;            -- 添加字段并指定位置
alter table 表名 drop 字段名;                             -- 删除表字段
alter table 表名 change 原字段名字 新的字段名字 字段类型;  -- 修改指定的字段
```

## 增

```sql
insert into 表名[(字段1，字段2，…)] values('值1','值2',…);

-- 1.1 不指定字段（很少用）
insert into 表名 values(值1，值2，…);

-- 1.2 指定字段（较常用）
insert into 表名(字段1，字段2…) values(值1，值2，…);

-- 1.3 批量插入
insert into 表名(字段1，字段2…) values(值1，值2，…),(值1，值2，…),(值1，值2，…);
```

## 删

```sql
delete from 表名 where 条件;
-- 注意：where 条件必须加，否则数据会被全部删除
```

## 改

```sql
update 表名 set 字段1 = 值1, 字段2 = 值2 where 条件;
```

## 查

```sql
select * from 表名;                          -- 查询表中的所有数据
select 字段 from 表名;                       -- 指定数据查询
select 字段 from 表名 where 条件;            -- 根据条件查询（最常用）
```

## where语句

关系：>,<,>=,<=,!=

逻辑：or或, and并且

区间：id between 4 and 6 ;闭区间，包含边界

## 多表查询

### 内连接

```sql
-- 隐式内连接
select username,name from user,goods where user.gid=goods.gid;

-- 显示内连接
select username from user inner join goods on user.gid=goods.gid;
```

### 外连接

```sql
-- 左连接：包含所有的左边表中的记录以及右边表中没有和他匹配的记录
select * from user left join goods on user.gid=goods.gid;

-- 右连接
select * from user right join goods on user.gid=goods.gid;
```

### 子查询

```sql
select * from user where gid in(select gid from goods);
```

### 联合查询

```sql
select * from user left join goods on user.gid=goods.gid
union
select * from user right join goods on user.gid=goods.gid;

-- 两个表同时更新
update user u, goods g set u.gid=12, g.price=1 where u.id=2 and u.gid=g.gid;
```

# 进阶查询

## 基础查询

```sql
-- 全表查询
select * from student;

-- 选择查询
select name, gender from students;

-- 别名
select name as 员工姓名, position as 职位名称 from employees;

-- 常量和运算
select order_id, unit_price, quantity, unit_price * quantity as total_amount from orders;
```

## 条件查询

```sql
-- where
select name, price, stock from products where stock <= 20;

-- 运算符
select name, age, salary from employees where name != '小张';

-- 空值
select name, age from employees where hire_date is null;  -- 还有IS NOT NULL

-- 模糊查询
select name, age, position from employees where name like '%张%';

-- 逻辑运算
select name, age, salary from employees where name like '%李%' and age < 30;
```

## 去重与排序

```sql
-- 去重
select distinct class_id from students;

-- 排序 默认升序（ASC）或降序（DESC）
select name, score from students order by score desc;
```

## 分页

```sql
-- LIMIT 后只跟一个整数，表示要截断的数据条数（一次获取几条）
select task_name, due_date from tasks limit 2;

-- LIMIT 后跟 2 个整数，依次表示所从第几条数据开始、一次获取几条 索引0开始
select task_name, due_date from tasks limit 2, 2;
```

## 条件分支

```sql
SELECT
  name,
  CASE WHEN (name = '鸡哥') THEN '会' ELSE '不会' END AS can_rap
FROM
  student;
```

## 内置函数

```sql
-- 时间函数
SELECT DATE() AS current_date;        -- 获取当前日期
SELECT DATETIME() AS current_datetime; -- 获取当前日期时间
SELECT TIME() AS current_time;        -- 获取当前时间

-- 字符串处理  UPPER转大写 LENGTH获长度 LOWER转小写
SELECT name, UPPER(name) AS upper_name FROM employees;
```

## 聚合函数

COUNT：计算指定列的行数或非空值的数量。

SUM：计算指定列的数值之和。

AVG：计算指定列的数值平均值。

MAX：找出指定列的最大值。

MIN：找出指定列的最小值。

```sql
SELECT COUNT(*) AS order_num FROM orders;
SELECT COUNT(DISTINCT customer_id) AS customer_num FROM orders;  -- 订单表中不同客户的数量
```

## 分组与过滤

```sql
-- 单|多字段分组
SELECT customer_id FROM orders GROUP BY customer_id, product_id;

-- having 子句
-- WHERE 子句用于在分组之前进行过滤，而 HAVING 子句用于在分组之后进行过滤
SELECT customer_id, COUNT(order_id) AS order_num    -- 查询订单数超过 1 的客户
FROM orders
GROUP BY customer_id
HAVING COUNT(order_id) > 1;
```

## 关联查询

### CROSS JOIN

CROSS JOIN 是一种简单的关联查询，不需要任何条件来匹配行，它直接将左表的每一行与右表的每一行进行组合，返回的结果是两个表的笛卡尔积

```sql
SELECT e.emp_name, e.salary, d.department, d.manager
FROM employees e
CROSS JOIN departments d;

-- 等价于
SELECT e.emp_name, e.salary, d.department, d.manager
FROM employees e, departments d;
```

### INNER JOIN

INNER JOIN 只返回两个表中满足关联条件的交集部分，即在两个表中都存在的匹配行

```sql
SELECT e.emp_name, e.salary, e.department, d.manager
FROM employees e
JOIN departments d ON e.department = d.department;
```

### OUTER JOIN

OUTER JOIN 中，包括 LEFT OUTER JOIN 和 RIGHT OUTER JOIN 两种类型，它们分别表示查询左表和右表的所有行（即使没有被匹配），再加上满足条件的交集部分

```sql
SELECT e.emp_name, e.salary, e.department, d.manager
FROM employees e
LEFT JOIN departments d ON e.department = d.department;
```

## 子查询

子查询是指在一个查询语句内部嵌套另一个完整的查询语句，内层查询被称为子查询。子查询可以用于获取更复杂的查询结果或者用于过滤数据

```sql
-- 订单总金额 > 200 的客户的姓名和城市信息
SELECT name, city
FROM customers
WHERE customer_id IN (
    SELECT DISTINCT customer_id
    FROM orders
    WHERE total_amount > 200
);
```

### EXISTS

子查询中的一种特殊类型是 "exists" 子查询，用于检查主查询的结果集是否存在满足条件的记录，它返回布尔值（True 或 False），而不返回实际的数据

```sql
-- 存在订单的客户姓名和订单金额
SELECT name, total_amount
FROM customers
WHERE EXISTS (
    SELECT 1
    FROM orders
    WHERE orders.customer_id = customers.customer_id
);
```

## 组合查询

UNION 两个或多个查询的结果集合并，并去除重复的行；UNION ALL 全部保留

```sql
SELECT name, age, department FROM table1
UNION
SELECT name, age, department FROM table2;
```

## 开窗函数

开窗函数可以与聚合函数（如 SUM、AVG、COUNT 等）结合使用，但与普通聚合函数不同，开窗函数不会导致结果集的行数减少

将开窗函数想象成一种 "透视镜"，它能够将我们聚焦在某个特定的分组，同时还能看到整体的全景

### SUM OVER

```sql
-- 每个客户的订单总金额，并显示每个订单的详细信息
SELECT
    order_id,
    customer_id,
    order_date,
    total_amount,
    SUM(total_amount) OVER (PARTITION BY customer_id) AS customer_total_amount
FROM
    orders;
```

### RANK

Rank 开窗函数的常见用法是在查询结果中查找前几名（Top N）或排名最高的行

```sql
-- 每个客户的订单按照订单金额降序排名，并显示每个订单的详细信息
SELECT
    order_id,
    customer_id,
    order_date,
    total_amount,
    RANK() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS customer_rank
FROM
    orders;
```

PARTITION BY 子句可选，用于指定分组列；ORDER BY 子句用于指定排序列及排序方式

### ROW_NUMBER

Row_Number 函数为每一行都分配一个唯一的整数值，不管是否存在并列（相同排序值）的情况。每一行都有一个唯一的行号，从 1 开始连续递增

```sql
-- 每个客户的订单按照订单金额降序排列，并且分配一个 row_number 编号
SELECT
    order_id,
    customer_id,
    order_date,
    total_amount,
    ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY total_amount DESC) AS row_number
FROM
    orders;
```

### LAG / LEAD

Lag 函数用于获取当前行之前的某一列的值。Lead 函数用于获取当前行之后的某一列的值。

```sql
LAG(column_name, offset, default_value) OVER (PARTITION BY partition_column ORDER BY sort_column)
-- column_name：要获取值的列名
-- offset：表示要向上偏移的行数。例如，offset为1表示获取上一行的值
-- default_value：可选参数，用于指定当没有前一行时的默认值
```

```sql
-- 查询每个学生的考试日期和上一次考试的成绩，以及下一次考试的成绩
SELECT
    student_id,
    exam_date,
    score,
    LAG(score, 1, NULL) OVER (PARTITION BY student_id ORDER BY exam_date) AS previous_score,
    LEAD(score, 1, NULL) OVER (PARTITION BY student_id ORDER BY exam_date) AS next_score
FROM
    scores;
```

## 实战案例

### 英雄胜率统计

```sql
-- 统计每个英雄定位的胜率（胜利场次/总场次*100）
-- 只显示对局数大于等于5场的英雄定位
SELECT
    hero_role,
    ROUND(SUM(CASE WHEN game_result = '胜利' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) || '%' AS win_rate,
    ROUND(AVG((kills + assists) * 1.0 / CASE WHEN deaths = 0 THEN 1 ELSE deaths END), 2) AS avg_kda,
    COUNT(*) AS total_matches
FROM
    game_matches
GROUP BY
    hero_role
HAVING
    COUNT(*) >= 5
ORDER BY
    ROUND(SUM(CASE WHEN game_result = '胜利' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1) DESC;
```

### 股票交易分析

```sql
SELECT
    sector,
    ROUND(SUM(quantity * price_per_share), 2) AS total_amount,
    COUNT(*) AS transaction_count,
    ROUND(AVG(price_per_share), 2) AS avg_price,
    CONCAT(ROUND(SUM(CASE WHEN transaction_type = '买入' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1), '%') AS buy_ratio,
    CONCAT(ROUND(SUM(CASE WHEN investor_type = '机构' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 1), '%') AS institution_ratio,
    ROUND(AVG(commission_fee), 2) AS avg_commission,
    (
        SELECT stock_name
        FROM stock_transactions s2
        WHERE s2.sector = stock_transactions.sector
        GROUP BY stock_name
        ORDER BY SUM(quantity * price_per_share) DESC
        LIMIT 1
    ) AS top_stock,
    CONCAT(ROUND((MAX(price_per_share) - MIN(price_per_share)) * 100.0 / AVG(price_per_share), 1), '%') AS volatility
FROM
    stock_transactions
GROUP BY
    sector
ORDER BY
    total_amount DESC;
```

# 索引

## 回表

### 为什么会回表

- **主键索引（聚集索引）**：InnoDB 的叶子节点存储了整行数据，不需要回表。
- **非主键索引（辅助索引/二级索引）**：叶子节点只存了索引列和主键列，要查其他列就必须回表

```sql
CREATE TABLE stock_transactions (
    transaction_id INT PRIMARY KEY,
    investor_id INT,
    sector VARCHAR(20),
    quantity INT,
    price_per_share DECIMAL(10,2),
    commission_fee DECIMAL(10,2)
);
CREATE INDEX idx_investor_id ON stock_transactions(investor_id);
```

查询：

```sql
SELECT sector, quantity
FROM stock_transactions
WHERE investor_id = 123;
```

idx_investor_id 是二级索引，只包含 investor_id 和 transaction_id（主键）

查询过程：

1. 用 idx_investor_id 找到 transaction_id（索引列 + 主键）
2. 再回表去 stock_transactions 表找到 sector 和 quantity
3. 这个访问表的过程就叫回表

### 如何避免回表

1. **查询的字段都在索引中** - 不需要访问表数据，直接从索引返回

```sql
CREATE INDEX idx_sector_quantity_investor
    ON stock_transactions(investor_id, sector, quantity);

SELECT sector, quantity
FROM stock_transactions
WHERE investor_id = 123;
-- 现在索引已经覆盖查询字段，不会回表
```

2. **选择性高的索引 + 合理联合索引** - 可以减少回表的次数，对大表性能提升明显

### 小结

- **回表** = 使用二级索引时，为了获取非索引列数据，需要访问主表
- **影响**：增加 I/O，查询慢
- **优化方法**：尽量用覆盖索引，让索引包含所有查询列

InnoDB 主键就是聚簇索引，辅助索引是非聚簇索引，回表是非聚簇索引的代价

## 什么时候索引反而降低性能

1. **小表查询**：全表扫描比索引更快
2. **选择性低**：列重复值多，索引命中率低
3. **频繁写操作**：INSERT/UPDATE/DELETE，每次都要维护索引
4. **索引列做函数运算**：索引失效，增加查询成本
5. **LIKE 前置通配符**：`LIKE '%abc'` 索引无效

记忆法：**索引是为了加速读，代价是写与存储**。

# 面试题精选

## COUNT(1)、COUNT(\*)、COUNT(列) 区别与优化

### 区别

| 写法      | 含义                        | NULL值 |
| --------- | --------------------------- | ------ |
| COUNT(\*) | 统计总行数，包含NULL        | 包含   |
| COUNT(1)  | 等同于COUNT(\*)，统计总行数 | 包含   |
| COUNT(列) | 统计该列非NULL的行数        | 不包含 |

### 性能对比

- **COUNT(\*)** 和 **COUNT(1)**：MySQL优化器会自动选择最小的索引树来遍历，性能基本相同
- **COUNT(列)**：需要判断该列是否为NULL，如果列上没有索引，还会触发全表扫描

### 优化建议

```sql
-- 慢：需要检查name列是否为NULL
SELECT COUNT(name) FROM users;

-- 快：直接统计行数
SELECT COUNT(*) FROM users;

-- 如果业务需要统计非NULL值，给列加NOT NULL约束
ALTER TABLE users MODIFY name VARCHAR(50) NOT NULL;
```

**结论**：优先使用 `COUNT(*)`，性能最好且语义最清晰

## SQL优化

### 1. 避免SELECT \*

```sql
-- 慢：返回所有列，浪费IO
SELECT * FROM orders WHERE user_id = 100;

-- 快：只查需要的列
SELECT order_id, amount, create_time FROM orders WHERE user_id = 100;
```

### 2. 小表驱动大表

```sql
-- 慢：大表在前，用IN
SELECT * FROM orders WHERE user_id IN (SELECT id FROM users WHERE status = 1);

-- 快：小表驱动大表，用EXISTS
SELECT * FROM orders o WHERE EXISTS (
    SELECT 1 FROM users u WHERE u.id = o.user_id AND u.status = 1
);
```

### 3. 避免索引失效

```sql
-- 索引失效的常见情况：

-- 1. 对索引列做函数运算
SELECT * FROM users WHERE YEAR(create_time) = 2024;   -- 失效
SELECT * FROM users WHERE create_time >= '2024-01-01'  -- 生效
  AND create_time < '2025-01-01';

-- 2. 隐式类型转换
SELECT * FROM users WHERE phone = 13800138000;  -- 失效（phone是字符串）
SELECT * FROM users WHERE phone = '13800138000'; -- 生效

-- 3. LIKE左模糊
SELECT * FROM users WHERE name LIKE '%张';   -- 失效
SELECT * FROM users WHERE name LIKE '张%';   -- 生效

-- 4. OR连接非索引列
SELECT * FROM users WHERE id = 1 OR name = '张三'; -- 如果name无索引则失效
```

### 4. 分页优化

```sql
-- 慢：OFFSET越大越慢
SELECT * FROM orders ORDER BY id LIMIT 1000000, 10;

-- 快：游标分页（记住上一页最后一条的id）
SELECT * FROM orders WHERE id > 1000000 ORDER BY id LIMIT 10;

-- 或者子查询优化
SELECT * FROM orders WHERE id >= (
    SELECT id FROM orders ORDER BY id LIMIT 1000000, 1
) ORDER BY id LIMIT 10;
```

### 5. 批量插入

```sql
-- 慢：逐条插入
INSERT INTO users(name, age) VALUES('张三', 20);
INSERT INTO users(name, age) VALUES('李四', 22);
INSERT INTO users(name, age) VALUES('王五', 25);

-- 快：批量插入
INSERT INTO users(name, age) VALUES
('张三', 20),
('李四', 22),
('王五', 25);
```

### 6. 使用EXPLAIN分析

```sql
EXPLAIN SELECT * FROM orders WHERE user_id = 100;
```

重点关注：

- **type**：const > eq_ref > ref > range > index > ALL
- **key**：实际使用的索引
- **rows**：预估扫描行数
- **Extra**：Using index（覆盖索引）、Using filesort（文件排序需优化）

## 锁机制

### 锁的分类

| 类型   | 说明                             |
| ------ | -------------------------------- |
| 全局锁 | 锁定整个数据库，用于全库备份     |
| 表级锁 | 锁定整张表，MyISAM使用           |
| 行级锁 | 锁定某一行，InnoDB使用，粒度最小 |

### 行锁类型

1. **记录锁（Record Lock）**：锁定单行记录
2. **间隙锁（Gap Lock）**：锁定索引记录之间的间隙，防止幻读
3. **临键锁（Next-Key Lock）**：记录锁 + 间隙锁，InnoDB默认锁类型

### 死锁

```sql
-- 死锁场景：两个事务互相等待对方释放锁
-- 事务A
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;  -- 锁住id=1
UPDATE accounts SET balance = balance + 100 WHERE id = 2;  -- 等待id=2的锁

-- 事务B（同时执行）
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 2;  -- 锁住id=2
UPDATE accounts SET balance = balance + 100 WHERE id = 1;  -- 等待id=1的锁
-- 死锁！
```

### 如何避免死锁

1. **固定加锁顺序**：所有事务按相同顺序访问表和行
2. **缩小事务范围**：减少持锁时间
3. **使用低隔离级别**：在允许的情况下使用READ COMMITTED
4. **添加合理索引**：避免行锁升级为表锁
5. **设置锁等待超时**：`innodb_lock_wait_timeout=50`

### 查看锁信息

```sql
-- 查看当前锁等待
SELECT * FROM information_schema.INNODB_LOCK_WAITS;

-- 查看正在持有的锁
SELECT * FROM information_schema.INNODB_LOCKS;

-- 查看事务
SHOW ENGINE INNODB STATUS;
```

## 事务

### ACID特性

- **A（原子性）**：事务要么全部成功，要么全部回滚
- **C（一致性）**：事务前后数据保持一致
- **I（隔离性）**：并发事务之间互不干扰
- **D（持久性）**：事务提交后数据永久保存

### 隔离级别

| 级别                    | 脏读 | 不可重复读 | 幻读 |
| ----------------------- | ---- | ---------- | ---- |
| READ UNCOMMITTED        | 有   | 有         | 有   |
| READ COMMITTED          | 无   | 有         | 有   |
| REPEATABLE READ（默认） | 无   | 无         | 有   |
| SERIALIZABLE            | 无   | 无         | 无   |

### MVCC（多版本并发控制）

InnoDB在REPEATABLE READ级别下，通过MVCC解决脏读和不可重复读：

- 每行数据有两个隐藏列：`DB_TRX_ID`（事务ID）、`DB_ROLL_PTR`（回滚指针）
- 事务启动时生成**ReadView**，包含活跃事务列表
- 读取数据时，根据ReadView判断版本可见性
- 实现**快照读**，不需要加锁

## 主从复制

### 原理

1. **Master**将数据变更记录到**Binlog**（二进制日志）
2. **Slave**的**IO线程**请求Master的Binlog，写入本地**Relay Log**
3. **Slave**的**SQL线程**读取Relay Log，重放数据变更

### 复制方式

- **异步复制**：Master不等待Slave确认（默认）
- **半同步复制**：Master至少等待一个Slave确认收到Binlog
- **全同步复制**：Master等待所有Slave确认（性能差）

### 常见问题

- **主从延迟**：Slave单线程重放、网络延迟、大事务
- **解决方案**：并行复制、读写分离、强制走主库
