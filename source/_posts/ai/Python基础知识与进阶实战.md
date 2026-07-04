---
title: Python基础知识与进阶实战
cover: https://imgs.luckynwa.top/openApi/lucky/yys/53
description: 长风破浪会有时，直挂云帆济沧海
categories: 人工智能
tags: Python
comments: true
abbrlink: ai3
summary: >-
  本文整理了Python学习的核心知识点，涵盖基础语法（标识符、数据类型、运算符、字符串操作、条件与循环语句）、内置数据结构（列表、元组、集合、字典）的使用方法与区别。深入讲解了函数定义、闭包、装饰器、深浅拷贝、正则表达式等进阶内容。面向对象部分包含封装、继承、多态、抽象类及property属性。网络编程涉及socket通信、多进程与多线程及互斥锁机制。此外还包括迭代器与生成器、爬虫（Xpath解析）、数据分析（Pandas、Matplotlib）以及FastAPI框架的基础应用。
date: 2024-06-15 02:25:34
---

# 基础语法

## 标识符

- 第一个字符必须是字母表中字母或下划线 **\_** 。
- 标识符的其他的部分由字母、数字和下划线组成。
- 标识符对大小写敏感。
- Python3 版本支持中文作为标识符

```python
import keyword
print(keyword.kwlist)
```

```
['False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return', 'try', 'while', 'with', 'yield']
```

Python 自带的标识符（变量），变量不需要声明类型，可以同时为多个变量赋值：`a, b = 1, 2`，也可以 `a = b = c = 1` 同时赋值。

## 标准数据类型

Python3 中常见的数据类型有：

- **Number（数字类型）** int、float、bool、complex（复数）

  ```python
  a, b, c, d = 20, 5.5, True, 4+3j
  print(type(a), type(b), type(c), type(d))
  isinstance(a, int)
  ```

- **String（字符串）**

- **bool（布尔类型）**

  `True == 1`、`False == 0` 会返回 `True`

- **List（列表）**
- **Tuple（元组）**
- **Set（集合）**
- **Dictionary（字典）**

Python3 的六个标准数据类型中：

- **不可变数据（3个）：** Number（数字）、String（字符串）、Tuple（元组）
- **可变数据（3个）：** List（列表）、Dictionary（字典）、Set（集合）

此外还有高级数据类型，如字节数组类型 `bytes`。

## 运算符

```python
>>> 5 + 4  # 加法
9
>>> 4.3 - 2  # 减法
2.3
>>> 3 * 7  # 乘法 优先级2
21
>>> 2 / 4  # 除法，得到一个浮点数 优先级3
0.5
>>> 2 // 4  # 除法，得到一个整数 优先级4
0
>>> 17 % 3  # 取余
2
>>> 2 ** 5  # 乘方 优先级1
32
```

```python
X = int(input("输入X值:"))
Y = int(input("输入Y值:"))  # 记得转换，默认字符串相加
print(X + Y)
```

> float 类型会有精度损失，计算机底层基于二进制，二进制无法准确表示所有小数，因此涉及浮点数运算会损失精度。

```python
# ==  !=  >  <  >=            比较运算符
# +=  num += 2 等效于 num = num + 2
# -=
# and  or  not 取反           逻辑运算符
# in                          包括字符串，列表或元组
# not in
# is                          查看是否引用同一对象
# is not
```

## 注释

- 单行注释以 **#** 开头
- 多行注释可以用多个 **#** 号，还有 **'''** 和 **"""**

## 行与缩进

Python 最具特色的就是使用缩进来表示代码块，不需要使用大括号 `{}`。

如果语句很长，可以使用反斜杠 `\` 来实现多行语句。在 `[]`、`{}`、`()` 中的多行语句，不需要使用反斜杠。

```python
total = item_one + \
        item_two + \
        item_three

total = ['item_one', 'item_two', 'item_three',
        'item_four', 'item_five']
```

## 字符串

不可修改，有序性，可迭代性。

字符串截取的语法格式：

```
变量[头下标:尾下标]
```

从0开始，左闭右开。转义符 `\`。

```python
str = '123456789'

print(str)                 # 输出字符串
print(str[0:-1])           # 输出第一个到倒数第二个的所有字符
print(str[0])              # 输出字符串第一个字符
print(str[2:5])            # 输出从第三个开始到第六个的字符（不包含）
print(str[2:])             # 输出从第三个开始后的所有字符
print(str[1:5:2])          # 输出从第二个开始到第五个且每隔一个的字符（步长为2）
print(str * 2)             # 输出字符串两次
print(str + '你好')         # 连接字符串
print(str[-1:-7:-1])       # 987654 反转
print('hello\nrunoob')     # 使用反斜杠(\)+n转义特殊字符
print(r'hello\nrunoob')    # 在字符串前面添加一个r，表示原始字符串，不会发生转义
```

字符串格式化 `%f` 浮点数：

```python
name = '小米'
age = 10
num = 11.2356
print("my name is" + name + "age=>", str(age))  # 这里相加需要转str类型
print("我叫%s今年%d岁!" % (name, age))

name = input("请输入名称")
print(f"我叫{name}")  # 推荐这种写法

print(f"分数：{num:.1f}")  # 保留一位小数
print(round(num, 1))

print("网站名：{name}, 地址 {url}".format(name="菜鸟教程", url="www.runoob.com"))

# 通过字典设置参数
site = {"name": "菜鸟教程", "url": "www.runoob.com"}
print("网站名：{name}, 地址 {url}".format(**site))

# 通过列表索引设置参数
my_list = ['菜鸟教程', 'www.runoob.com']
print("网站名：{0[0]}, 地址 {0[1]}".format(my_list))  # "0" 是必须的
```

数字格式化 `{:.0f}` 不带小数，`{:.2%}` 百分比格式：

```python
print("{:.2f}".format(3.1415926))
```

字符串内建函数（参考 https://www.runoob.com/python/python-strings.html ）：

| 方法           | 说明                                                       |
| -------------- | ---------------------------------------------------------- |
| `find()`       | 传入查找的子字符串，返回第一次出现的索引位置，找不到返回-1 |
| `count()`      | 统计子字符串在字符串中出现的次数并返回                     |
| `upper()`      | 字符串全转大写                                             |
| `lower()`      | 字符串全转小写                                             |
| `split()`      | 将字符串按指定分隔符分割成列表                             |
| `strip()`      | 去除字符串两端的空字符串或指定字符                         |
| `replace()`    | 将指定的字串转新的                                         |
| `startswith()` | 检查是否以这个参数开头，并返回布尔值                       |

## 条件语句

任何非0和非空（null）值为 true，0 或者 null 为 false。

if 语句的判断条件可以用 `>`、`<`、`==`、`>=`、`<=` 来表示其关系。

```python
if 判断条件:
    执行语句
else:
    执行语句

if 判断条件1:
    执行语句1
elif 判断条件2:
    执行语句2
elif 判断条件3:
    执行语句3
else:
    执行语句4

# match-case（Python 3.10+）
day = int(input("请输入天数:"))
match day:
    case 1:
        print("是星期一")
    case 2:
        print("是星期二")
    case 3:
        print("是星期三")
    case 4:
        print("是星期四")
    case 5:
        print("是星期五")
    case 6:
        print("是星期六")
    case 7:
        print("是星期日")
    case _:  # 匹配其他情况
        print("输入错误")
```

## 循环语句

### while 循环

```python
while 判断条件:
    执行语句

count = 0
while count < 5:
    print(count, " is less than 5")
    count = count + 1
else:
    print(count, " is not less than 5")

# 计算1到100之间偶数的累加和
sum = 0
i = 1
while i <= 100:
    if i % 2 == 0:
        sum += i
    i += 1
print("1到100之间偶数的累加和为:", sum)

# 猜数字游戏
import random
rand_num = random.randint(1, 10)  # 生成1-10之间的随机整数，包含10

while True:
    num = int(input('请输入你猜的数字:'))
    if num > rand_num:
        print('太大了，重新输入')
    elif num < rand_num:
        print('太小了，重新输入')
    else:
        print('恭喜你猜对了')
        print('游戏结束,随机值是:', rand_num)
        break
```

### for 循环

```python
# range 用法
range(end)            # 获取从0开始，不含end本身
range(start, end)     # 从start开始，不含end
range(start, end, step)
range(0, 10, 2)       # 0,2,4,6,8

# 计算1到100之间偶数的累加和
sum = 0
for i in range(2, 101, 2):
    sum += i
print("1到100之间偶数的累加和为:", sum)

# 遍历字符串和列表
for letter in 'Python':
    print("当前字母: %s" % letter)

fruits = ['apple', 'banana', 'orange', 'peach']
for fruit in fruits:
    print(fruit)
print('-----------------')
for index in range(len(fruits)):
    print('当前水果: %s' % fruits[index])

# 嵌套循环 - 打印矩形
w = 10; h = 5
for i in range(h):
    for j in range(w):
        print('*', end='')  # end=''表示不换行
    print('')

# 九九乘法表
for i in range(1, 10):
    for j in range(1, i + 1):
        print('%d*%d=%d ' % (i, j, i * j), end='\t')
    print('')
```

- `break` — 跳出整个循环
- `continue` — 结束当前循环，继续下一个循环
- `return` — 从函数返回

## List（列表）

列表是写在方括号 `[]` 之间、用逗号分隔开的元素列表，可以重复、可以修改、有序。列表截取语法同字符串。

```python
list = ['abcd', 786, 2.23, 'runoob', 70.2]  # 定义一个列表
tinylist = [123, 'runoob']

print(list)            # 打印整个列表
print(list[0])         # 打印列表的第一个元素
print(list[1:3])       # 打印列表第二到第四个元素（不包含第四个元素）
print(list[1:4:2])     # 打印列表第二到第五个元素间隔1个位置
print(list[2:])        # 打印列表从第三个元素开始到末尾
print(list[0:4:1])     # 等价于 list[:4:1]  list[:4:]  list[:4]
print(tinylist * 2)    # 打印tinylist列表两次
print(list + tinylist)  # 打印两个列表拼接在一起的结果
```

```python
list = []                    # 空列表
list.append('Google')        # 使用 append() 添加元素到列表尾部
list.append('Runoob')

del list[1]                  # 删除指定索引的元素

# 常用方法
list.count(obj)              # 统计某个元素在列表中出现的次数
list.insert(index, obj)      # 将对象插入列表  list.insert(0, 666)
list.pop([index=-1])         # 移除列表中的一个元素（默认最后一个元素），并返回该元素的值
list.remove(obj)             # 移除列表中某个值的第一个匹配项
list.reverse()               # 反向列表中元素
list.sort()                  # 对列表进行排序，需要一样的数据类型
sum(num_list)/len(num_list)  # 求平均值
min(num_list)
max(num_list)
```

合并列表并去重：

```python
# 方式1：遍历追加（消耗性能）
for i in b:
    a.append(i)

# 方式2：解包（推荐）
a_new = [*a, *b]  # 或者直接 a + b

# 列表推导式
# 求1-20的平方
num_list = [i**2 for i in range(1, 21)]

# 从一个数字列表提取所有偶数，并计算平方组成新的列表
num_list1 = [i**2 for i in num_list if i % 2 == 0]
```

## Tuple（元组）

元组与列表类似，但不允许修改值。元组中只包含一个元素时，需要在元素后面添加逗号。元组中的元素值不允许删除，但可以使用 `del` 语句删除整个元组。

```python
tuple = ('abcd', 786, 2.23, 'runoob', 70.2)
t2 = ()
t3 = tuple()  # 3种定义方式
tinytuple = (123,)
print(tuple)              # 输出完整元组
print(tuple[0])           # 输出元组的第一个元素
print(tuple[1:3])         # 输出从第二个元素开始到第三个元素
print(tuple[2:])          # 输出从第三个元素开始的所有元素
print(tinytuple * 2)      # 输出两次元组
print(tuple + tinytuple)  # 连接元组

# 组包和解包
t1 = 1, 4, 5, 2            # 组包，不加括号也行，也是元组
a, b, c, d = t1            # 解包，将元组每一项都对应赋值

x, *y, z = t1  # x=1, y=[4,5], z=2  *是扩展解包，来处理不确定的元素

# 变量交换（无需第三个变量）
a, b = b, a  # 组包 + 解包，一一对应赋值
```

> 只有 `count()` 和 `index()` 方法。

## Set（集合）

创建一个**空集合**必须用 `set()` 而不是 `{}`，因为 `{}` 是用来创建一个空字典。

集合是一种**无序**、可变的数据类型，用于存储唯一的元素。

```python
sites = {'Google', 'Taobao', 'Runoob', 'Facebook', 'Zhihu', 'Baidu'}
print(sites)  # 输出集合，重复的元素被自动去掉

# 成员测试
if 'Runoob' in sites:
    print('Runoob 在集合中')
else:
    print('Runoob 不在集合中')

# 集合运算
a = set('abracadabra')
b = set('alacazam')

print(a)
print(a - b)  # a 和 b 的差集
print(a | b)  # a 和 b 的并集
print(a & b)  # a 和 b 的交集
print(a ^ b)  # a 和 b 中不同时存在的元素
```

常用方法：

| 方法             | 说明                                          |
| ---------------- | --------------------------------------------- |
| `add()`          | 添加元素到集合，随机位置                      |
| `remove()`       | 移除指定元素，不存在则报错                    |
| `pop()`          | 随机删除一个元素，并返回                      |
| `clear()`        | 清空集合                                      |
| `union()`        | 求并集，全部并去重，`\|` 也行                 |
| `intersection()` | 求交集，相交的部分，`s1 & s2 & s3` 也能求交集 |
| `difference()`   | 求差集，存在s2但不存在于s3                    |

```python
# 差集示例
s2.difference(s3)  # s2{1,2,3,4} s3{2,3,4,5} 结果{1}
s2 - s1  # 也是求差集

# 集合推导式
{s for s in s2 if s not in s3}

# 统计元素出现次数
a_set = {'韩立', '紫林', '温岭'}
b_set = {'通天', '紫林', '温岭'}
c_set = {'韩立', '通天', '温岭'}
all_set = a_set | b_set | c_set
all_list = [*a_set, *b_set, *c_set]
print(all_list)
for i in all_set:
    print(f"{i} 出现了次数{all_list.count(i)}")
```

## Dictionary（字典）

字典是一种映射类型，用 `{}` 标识，是一个无序的 **键(key) : 值(value)** 的集合。

键(key) 必须是唯一的而且是不可变类型（字符串、int、float、tuple），不能重复（如果重复后面覆盖前面），可修改。

```python
dict = {}
dict2 = dict()
tinydict = {'name': 'runoob', 'code': 1, 'site': 'www.runoob.com'}
# 上面都是定义字典

dict['one'] = "1 - 菜鸟教程"
dict[2] = "2 - 菜鸟工具"

print(dict['one'])       # 输出键为 'one' 的值
print(dict[2])           # 输出键为 2 的值
print(tinydict)          # 输出完整的字典
print(tinydict.keys())   # 输出所有键
print(tinydict.values()) # 输出所有值
tinydict['name'] = 'wei'  # 更新

del tinydict['name']     # 删除键是'name'的条目
tinydict.clear()         # 清空字典所有条目
del tinydict             # 删除字典
```

添加和修改语法一样：`dict['one'] = "1 - 菜鸟教程"`，不存在则新加，存在则修改。

| 操作           | 方法                                      |
| -------------- | ----------------------------------------- |
| 删除           | `字典名称.pop(key)` / `del 字典名称[key]` |
| 查找           | `字典名称[key]` / `字典名称.get(key)`     |
| 获取全部key    | `字典名称.keys()` 类型 dict_keys          |
| 获取全部value  | `字典名称.values()` 类型 dict_values      |
| 获取全部键值对 | `字典名称.items()`                        |

| 特性     | 字符串 (str) | 列表 (list)        | 元组 (tuple) | 集合 (set)   | 字典 (dict) |
| -------- | ------------ | ------------------ | ------------ | ------------ | ----------- |
| 有序性   | 有序         | 有序               | 有序         | 无序         | 有序 (3.7+) |
| 重复元素 | 允许         | 允许               | 允许         | 不允许       | key 不允许  |
| 可变性   | 不可变       | 可变               | 不可变       | 可变         | 可变        |
| 索引访问 | 支持         | 支持               | 支持         | 不支持       | 不支持      |
| 切片操作 | 支持         | 支持               | 支持         | 不支持       | 不支持      |
| 使用场景 | 文本处理     | 有序可重复数据集合 | 固定数据记录 | 去重数据集合 | 键值对      |

## 方法（函数）

函数必须先定义，再去调用。**def** 关键词开头，后接函数标识符名称和圆括号 `()`，以冒号起始，并且缩进。

```python
# 定义函数
def 函数名(参数列表):
    函数体
    ...
    return 返回值  # 多个返回值逗号，元组去解包即可

# 调用
函数名(参数)


def printinfo(name, age=18):
    """
    该函数用来格式化人物信息
    :param name: 人名
    :param age: 年龄
    :return: 返回值为空
    """
    print("Name: ", name)
    print("Age ", age)
    return

# 调用printinfo函数
printinfo(age=50, name="miki")  # 关键字参数，位置参数就默认顺序传进去，混用必须先位置参数再关键字
printinfo("LUCKY")  # 默认参数的值如果没有传入，则使用函数里的默认值
```

函数的嵌套调用遵循栈结构，后进先出 LIFO。每次调用函数时，会把该函数压入栈中（push），函数执行完毕后从栈中弹出（pop），类似于"子弹夹"一层层往上压，最上面的先被取出。

```python
def function_a():
    print("a ... before")
    function_b()
    print("a ... after")

def function_b():
    print("b ... before")
    function_c()
    print("b ... after")

def function_c():
    print("c ...")

function_a()

# 输出：
# a ... before
# b ... before
# c ...
# b ... after
# a ... after
```

`global` 关键字在函数里使用，明确这个变量和外面那个同名变量是全局变量，这样函数里面修改外面的值。没有这个关键字，各赋各的。

不定长参数 `*args` -> 元组：

```python
def calc_data(*args, **kwargs):  # **kwargs 传进来是封装成字典的类型
    "求最大值，最小值，平均数"
    max_data = max(args)
    min_data = min(args)
    avg_data = sum(args) / len(args)
    if kwargs.get('round'):
        avg_data = round(avg_data, kwargs.get('round'))
    return max_data, min_data, avg_data

# 调用
print(calc_data(70, 66, 50.2123, 30, round=1, count=0))
```

函数的参数类型除了普通参数（数字、布尔、字符串、列表、元组、集合、字典等），还能是函数：

```python
def add(a, b):
    return a + b
def subtract(a, b):
    return a - b
def multiply(a, b):
    return a * b
def divide(a, b):
    return a / b
def calc(x, y, oper):
    return oper(x, y)

print(calc(1, 2, multiply))
```

匿名函数 `lambda`，如果是单行表达式并只在一个地方使用，考虑用这个：

```python
lambda 参数列表: 函数体

hh = lambda: print('hello world')  # 无参数
hh()

add = lambda arg1, arg2: arg1 + arg2  # 默认有return
print(add(1, 2))

# 排序示例
data_list = ['c++', 'python', 'java', 'javascript', 'php', 'c']
data_list.sort(key=lambda item: len(item), reverse=True)
print(data_list)
# 按字符串长度排序，从长到短
```

递归：函数自己调用自己。求 n 的阶乘（5的阶乘为 5×4×3×2×1），规律 `f(n) = n * f(n-1)`。

```python
def jc(n):
    if n == 1:
        return 1
    else:
        return n * jc(n - 1)

res = jc(3)
print(res)
```

## 类型注解

用来提示变量类型：

```python
a: int = 10
score: float = 90.5
hobby: str = '篮球'
flag: bool = True
pic: None = None
names: list[str | int] = ['张三', '李四', '王五']
phones: list[str] = ['13800000000', '13900000000', '13700000000']
options: dict[str, int] = {'age': 18, 'hobby': 1}
goods: tuple[str, str, int] = ('apple', 'orange', 1)
```

## 模块导入

在 Python 用 `import` 或者 `from...import` 来导入相应的模块。

| 方式         | 格式                                                              |
| ------------ | ----------------------------------------------------------------- |
| 导入整个模块 | `import somemodule`                                               |
| 起别名       | `import random as rd`                                             |
| 导入某个函数 | `from somemodule import somefunction`                             |
| 导入多个函数 | `from somemodule import firstfunc, secondfunc, thirdfunc as tunc` |
| 导入全部函数 | `from a import *`                                                 |

`*` 导入的并不一定是 a 里的全部功能，如果 a 定义了 `__all__` 变量，就是列表里的功能，没有则全部：

```python
__all__ = ['fun1', 'fun2', pi]
```

如果 a 引入 b，b 里面有测试代码也会执行。可以在 b 里将测试代码放在：

```python
if __name__ == '__main__':
    log.test()
```

> b 里面 `__name__` 是 `'__main__'`，如果 a 运行引入，`__name__` 值是 b.py

包：本质是一个文件夹，里面有很多 py 文件，文件夹下有 `__init__.py` 文件（空文件即可）。

```python
import 包名.somemodule
from 包名.somemodule import somefunction
```

## 日期和时间

```python
import time

ticks = time.time()
print("当前时间戳为:", ticks)

# 格式化成 2016-03-20 11:45:39 形式
print(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
# 格式化成 Sat Mar 28 22:24:24 2016 形式
print(time.strftime("%a %b %d %H:%M:%S %Y", time.localtime()))

# 将格式字符串转换为时间戳
a = "Sat Mar 28 22:24:24 2016"
print(time.mktime(time.strptime(a, "%a %b %d %H:%M:%S %Y")))

import calendar
cal = calendar.month(2024, 8)
print("以下输出2024年8月份的日历:", cal)
print(calendar.isleap(2024))  # 闰年返回True，否则为False
```

## 文件I/O

**open 函数** — 创建一个 file 对象，相关的方法才可以调用它进行读写。

`w` 覆盖内容，`a` 追加内容，文件不存在会自动创建。

```python
# 推荐用 with 语句，自动关闭文件
with open("古诗.txt", 'w', encoding='utf-8') as f:
    f.write("静夜思（李白）\n")
    f.write("窗前明月光,\n")
    f.write("疑是地上霜.\n")
    f.write("举头望明月,\n")
    f.write("低头思故乡.\n")
```

## 异常

也称 bug，程序运行过程中的错误，它会中断程序的正常执行逻辑。

```python
try:
    print('我是'[3])
except NameError as e:
    print('变量不存在，异常信息是', e)
except ZeroDivisionError as e:
    print('除数不能为0，异常信息是', e)
except IndexError as e:
    print('索引超出范围，异常信息是', e)
except Exception as e:  # 捕获所有异常
    print('其他异常，异常信息是', e)
finally:  # 无论是否有异常，都会执行finally中的代码
    print('资源释放')
```

异常传递就是异常在函数调用中层层上报的过程，直到有人处理它，或者程序崩溃。

```python
def function_a():
    print("a ... before")
    function_b()
    print("a ... after")

def function_b():
    print("b ... before")
    function_c()
    print("b ... after")

def function_c():
    print(myname)  # 异常一层一层抛出

if __name__ == '__main__':
    try:
        function_a()
    except NameError as e:
        print('程序运行错误，请联系管理员，错误信息是', e)
```

## 类（面向对象）

遵循大驼峰命名法。

```python
# 定义类（不推荐动态添加属性）
class Car:
    pass

# 实例化对象
new_car = Car()

# 动态添加属性
new_car.color = 'red'
new_car.price = 1000000
new_car.brand = 'Benz'
print(new_car.color)
# 查看对象的属性，以字典形式展示
print(new_car.__dict__)
```

```python
class Car:
    # 类属性，类名.属性名，所有实例对象都共享
    wheel = 4

    def __init__(self, color, price, brand):  # 魔法方法，自动调用
        # 实例属性，实例名.属性名
        self.color = color
        self.price = price
        self.brand = brand

    def running(self):
        print('我是一个车')
        print('我是一个', self.brand, '车')

    # 魔法方法 __xxx__ 特殊方法，py会在合适时机自动调用
    def __str__(self) -> str:
        return f'我是一个{self.brand}车'

    def __eq__(self, value: object) -> bool:
        return self.brand == value.brand and self.price == value.price and self.color == value.color

    def __lt__(self, value: object) -> bool:
        return self.price < value.price

# 实例化对象
new_car = Car('red', 100, 'Benz')
new_car.running()
new_car2 = Car('red', 100, 'Benz')
print(new_car)           # 默认是地址，重写了__str__方法
print(new_car2)
print(new_car2 == new_car)  # 默认是地址比较，所以2个不相等
print(new_car.__dict__)

new_car3 = Car('red', 1200, 'Benz')
print(new_car3 < new_car2)
```

```python
class Employee:
    '所有员工的基类'
    empCount = 0

    def __init__(self, name, salary):
        self.name = name
        self.salary = salary
        Employee.empCount += 1

    def displayCount(self):
        print("Total Employee %d" % Employee.empCount)

    def displayEmployee(self):
        print("Name : ", self.name, ", Salary: ", self.salary)

    def __del__(self):
        class_name = self.__class__.__name__
        print(class_name, "销毁")

    def parentMethod(self):
        print('调用父类方法')


class Child(Employee):  # 定义子类
    def __init__(self):
        print("调用子类构造方法")

    def childMethod(self):
        print('调用子类方法')


# 创建 Employee 类的对象
emp1 = Employee("Zara", 2000)
emp2 = Employee("Manni", 5000)
emp1.displayEmployee()
emp2.displayEmployee()
print("Total Employee %d" % Employee.empCount)
print(getattr(emp1, 'name'))

print("Employee.__doc__:", Employee.__doc__)
print("Employee.__name__:", Employee.__name__)
print("Employee.__module__:", Employee.__module__)
print("Employee.__bases__:", Employee.__bases__)
print("Employee.__dict__:", Employee.__dict__)

c = Child()
c.childMethod()
c.parentMethod()
```

| 方法                            | 说明                             |
| ------------------------------- | -------------------------------- |
| `getattr(obj, name[, default])` | 访问对象的属性                   |
| `hasattr(obj, name)`            | 检查是否存在一个属性             |
| `setattr(obj, name, value)`     | 设置一个属性，不存在则创建新属性 |
| `delattr(obj, name)`            | 删除属性                         |

| 属性         | 说明                     |
| ------------ | ------------------------ |
| `__dict__`   | 类的属性（包含一个字典） |
| `__doc__`    | 类的文档字符串           |
| `__name__`   | 类名                     |
| `__module__` | 类定义所在的模块         |
| `__bases__`  | 类的所有父类构成元素     |

### 封装

把数据和操作数据的方法都放一起，形成一个类，并隐藏内部的实现细节（私有属性、私有方法），只对外暴露必要的方法（公共属性、公共方法）。

```python
class Car:
    def __init__(self, color, model, brand, c_owner):
        self.color = color
        self.model = model
        self.brand = brand
        self.__owner = c_owner  # __下划线 私有属性

    def running(self):
        print(f'{self.brand}{self.model}正在启动....')

    def __control_fuel(self):  # __下划线 私有方法
        print(f'{self.brand}{self.model}正在控制油门...S')


if __name__ == '__main__':
    car = Car('red', 'GLB', 'Benz', 'lucky')
    print(car.brand)
    # python中没有真正的私有机制，默认的调用不行，再加个类名点就可以了
    print(car._Car__owner)
    car.running()
```

### 继承

子类继承父类，可以获取到父类的属性和方法（非私有），所有类都有一个父类 Object。

```python
class 子类(父类):
    pass
```

子类想重写父类方法，直接写个一样即可。如果需要调用父类的方法，可以通过 `父类名.方法名(self)` / `super().方法名()` 来调用。

```python
class Car:
    def __init__(self, color, model, brand, c_owner):
        self.color = color
        self.model = model
        self.brand = brand
        self.__owner = c_owner

    def running(self):
        print(f'{self.brand}{self.model}正在启动....（模板）')

    def __control_fuel(self):
        print(f'{self.brand}{self.model}正在控制油门...S')


class FuelCar(Car):
    def __init__(self, color, model, brand, c_owner, fuel_type):
        super().__init__(color, model, brand, c_owner)  # 继承
        self.fuel_type = fuel_type

    def running(self):  # 方法重写
        # super().running()  # 调用父类的方法  方式1
        Car.running(self)  # 调用父类方法  方式2
        print(f'{self.brand}{self.model}正在启动....S')
        print(f'{self.brand}{self.model}正在启动油门...S')


class ElectricCar(Car):
    pass


if __name__ == '__main__':
    c1 = FuelCar('red', 100, 'Benz', 'lucky', 'gas')
    c1.running()
    c2 = ElectricCar('red', 100, 'Benz', 'lucky')
    c2.running()
```

一个类继承了多个父类的情况，默认使用第一个父类中的同名属性或方法。

```python
print(类名.__mro__)  # 查看执行属性
print(类名.mro())    # 同上
```

### 多态

多态指的是同一个方法，有不同的形态、行为、表现。

```python
class Car:
    def __init__(self, color, model, brand):
        self.color = color
        self.model = model
        self.brand = brand

    def running(self):
        print(f'{self.brand}{self.model}正在启动....（模板）')


class FuelCar(Car):
    def charge(self):
        print(f'{self.brand}{self.model}正在加油')


class ElectricCar(Car):
    def charge(self):
        print(f'{self.brand}{self.model}正在充电')


def handle_charge(car: Car):
    car.charge()


if __name__ == '__main__':
    handle_charge(FuelCar('red', 100, 'Benz'))
    handle_charge(ElectricCar('red', 100, 'Benz'))
```

Python 中的多态不依赖继承（Java 依赖），Python 中只要它走起来像鸭子，叫起来像鸭子，就是鸭子 —— **鸭子类型**，关注对象的行为，而不是类。

```python
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def swimming(self):
        print(f'{self.age} 岁的 {self.name} 正在游泳...')

class Duck:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def swimming(self):
        print(f'{self.age} 岁的 {self.name} 正在游泳...')

class Pig:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    def swimming(self):
        print(f'{self.age} 岁的 {self.name} 正在游泳...')

def go_swimming(duck):
    duck.swimming()

# 测试代码
if __name__ == '__main__':
    go_swimming(Dog("旺财", 4))
    go_swimming(Duck("唐老鸭", 2))
    go_swimming(Pig("佩奇", 1))

# 输出：
# 4 岁的 旺财 正在游泳...
# 2 岁的 唐老鸭 正在游泳...
# 1 岁的 佩奇 正在游泳...
```

**抽象类** — 只能被继承，不能被实例化，作用是规定子类必须实现哪些方法，强制子类必须遵守统一代码规范。抽象类要继承 abc 模块中的 ABC 类（Abstract Base Class）。

```python
from abc import ABC, abstractmethod

class Car(ABC):
    @abstractmethod  # 这个必须在子类中实现
    def fun(self):
        ...
```

**静态方法和类方法** — 类方法是类所拥有的方法，需要使用装饰器 `@classmethod` 来标识。

```python
class Student:
    school = '学校啊'

    @classmethod
    def show(cls):
        print(cls.school)  # cls指向这个实例

    @staticmethod
    def show2():
        print('静态方法')
```

property 属性可以把函数当变量来用。方式1：装饰器；方式2：类属性。

```python
class Student:
    def __init__(self):
        self.__age = 20

    @property
    def age(self):
        return self.__age

    @age.setter
    def age(self, age):
        self.__age = age

    # 方式2
    # def get_age(self):
    #     return self.__age
    # def set_age(self, age):
    #     self.__age = age
    # age = property(get_age, set_age)

if __name__ == '__main__':
    s = Student()
    s.age = 18  # 使用property设置年龄
    print(s.age)  # 使用property获取年龄
```

## 闭包

使用外部函数变量的内部函数称为闭包。作用：外部函数执行完毕，内部函数依旧可以使用外部函数的变量。

函数名 -> 对象；函数名() -> 调用函数返回值。

**条件：**

1. 外部函数**嵌套**内部函数
2. 内部函数**引用**外部函数的变量
3. **返回**内部函数名（对象）

`global`：声明全局变量。`nonlocal`：内部函数可以修改外部函数的变量值。

```python
def fn_outer(num1):
    def fn_inner(num2):  # 有嵌套
        sum = num1 + num2  # 有引用
        print("sum", sum)
    return fn_inner  # 返回内层函数

fn = fn_outer(30)  # 调用外层函数，返回内层函数
fn(20)

fn_outer(40)(46)  # 直接调用外层函数，返回内层函数，再调用内层函数

def fn_outer2():
    a = 100
    def fn_inner():
        nonlocal a  # 内部修改a的值
        a = a + 1
        print("a", a)
    return fn_inner

fn2 = fn_outer2()
fn2()
fn2()

# 输出：
# sum 50
# sum 86
# a 101
# a 102
```

## 装饰器

不改变原有函数的基础上，给原有函数增加额外的功能。本质是个闭包函数，特点多了一个有额外功能。

装饰器的内部函数格式要和被装饰的原函数一致。多个装饰器装饰1个原函数，用 `@` 来装饰，从上到下执行。装饰器只能有1个参数，如果有2个，外部再套一层。

```python
def cheke_login(fn_name):
    def fn_inner():  # 内部函数 无参
        print("检查登录")  # 有额外功能
        fn_name()
    return fn_inner


@cheke_login  # 调用方式1
def comment():  # 被装饰的函数 无参
    print("发布评论")

comment()
print("-----------------")
cheke_login(comment)()  # 调用方式2


def mydecorator(fn_name):
    def fn_inner(*args, **kwargs):
        print("努力计算中。。。")
        return fn_name(*args, **kwargs)
    return fn_inner

@mydecorator
def calc_data(*args, **kwargs):
    print(args)
    print(kwargs)
    return sum(args) + sum(kwargs.values())

result = calc_data(1, 2, 3, num=22)
print(result)
```

```python
# 实现加减的装饰器
def out(flag):
    def mydecorator(fn_name):
        def fn_inner(a, b):
            if flag == "+":
                print("进行加法")
            elif flag == "-":
                print("进行减法")
            return fn_name(a, b)
        return fn_inner
    return mydecorator

@out("+")
def fn_add(a, b):
    return a + b

@out("-")
def fn_sub(a, b):
    return a - b

print(fn_add(10, 20))
print(fn_sub(100, 20))
```

## 深拷贝和浅拷贝

- **浅拷贝**：只拷贝了最外围的对象本身，元素内部只拷贝了一个引用
- **深拷贝**：拷贝所有层

使用 `copy` 模块的 `copy()` 和 `deepcopy()`。

> 深浅拷贝针对不可变类型如元组，和普通用法一样，不会开新空间。

## 正则表达式

用来匹配字符串中符合规则的字符序列，就是一种匹配工具。

参考工具：https://luckynwa6.github.io/lucky-tools/lucky-regular

| 表达式     | 描述                                             |
| ---------- | ------------------------------------------------ |
| 普通字符   | 字母、数字、汉字及大多数字符，直接匹配自身       |
| `.`        | 匹配任意一个字符（除 `\n`）                      |
| `\d`       | 匹配数字 0-9                                     |
| `\D`       | 匹配非数字                                       |
| `\w`       | 匹配单词字符，即 a-z、A-Z、0-9、\_、其他语言字符 |
| `\W`       | 匹配非单词字符 ,.@$                              |
| `[aeiou]`  | 匹配其中的任何单个字符                           |
| `[^aeiou]` | 求反，匹配不在字符列表中的任何单个字符           |
| `[0-5]`    | 表示范围                                         |

---

| 表达式  | 描述                                 |
| ------- | ------------------------------------ |
| `*`     | 出现任意次（0次或无数次）            |
| `+`     | 至少出现1次（1次或无数次）           |
| `?`     | 至多出现一次（0次或1次）             |
| `{m}`   | 出现 m 次                            |
| `{m,}`  | 至少出现 m 次                        |
| `{m,n}` | 出现 m 到 n 次                       |
| `\|`    | 或的意思，匹配左右任意一个表达式     |
| `()`    | 分组，将括号里的多个字符视为一个单元 |
| `^`     | 匹配字符串开头                       |
| `$`     | 匹配字符串结尾                       |

```python
import re

s1 = "18809090000是我的手机号，188开头的，以00结尾的；我的另一个手机号是15500008888，两个QQ号分别是1259989092和13809091293821，邮箱为python666@163.com"

# 常用匹配
print(re.findall(r"188\d{8}", s1))
print(re.findall(r"155\d{6,10}", s1))
print(re.findall(pattern=r"1[38]\d{8}", string=s1))
print(re.findall(pattern=r"1[3-9]\d{8}", string=s1))
print(re.findall(pattern=r"^1[3-9]\d{9}", string=s1))
print(re.findall(pattern=r"^1[3-9]\d{9}$", string=s1))

s2 = "现在的时间是2026-02-06 10:05:25，今天的天气还可以，气温是28度"
print(re.findall(pattern=r"\d{4}-\d{2}-\d{2}", string=s2))
print(re.findall(pattern=r"(\d{4})-(\d{2})-(\d{2})", string=s2))
# 结果：
# ['2026-02-06']
# [('2026', '02', '06')]
```

```python
import re

# 匹配邮箱（163/126/qq的邮箱，字母下划线4-20）
email = '1656213092@qq.com'
result = re.match(r'(^[a-zA-Z0-9]{4,20})@(163|126|qq)\.com$', email)
print(result.group() if result else '未匹配')
print(result.group(1))  # () 包起来就是分组了，可以通过索引拿值
print(result.group(2))

# 匹配手机号
phone = '13850694839'
result2 = re.match(r'1[3-9]\d{9}', phone)
print(f'匹配的值为：{result2.group()}' if result2 else '未匹配')
```

## 网络编程和多线程

服务器给客户端发送消息，客户端给出回执信息。

> 英文字母、数字、特殊符号都只占1个字节，中文在 gbk 中占2个字节，在 utf-8 里是3个字节。

### socket 通信

服务端：

```python
import socket

# 创建服务器socket对象，指定地址族为IPv4，套类型为TCP
server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# 绑定服务器地址和端口
server_socket.bind(('127.0.0.1', 10087))
# 设置最大连接数
server_socket.listen(5)
# 等待客户端连接
accept_socket, client_info = server_socket.accept()
# 给客户端发送数据
accept_socket.send(b"hello client")
# 接收客户端发送的数据
client_data = accept_socket.recv(1024).decode('utf-8')
print(f'服务端接受的数据来自{client_info}为：{client_data}')

# 关闭连接
accept_socket.close()
```

客户端：

```python
import socket

# 发送信息给服务器
client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
client_socket.connect(('127.0.0.1', 10087))
client_data = client_socket.recv(1024).decode('utf-8')
print(f'客户端接受的数据为：{client_data}')
client_socket.send('socket很好玩'.encode('utf-8'))
client_socket.close()
```

### 多进程

- **多任务**：同一时间内执行多个任务
- **并发**：在一段时间内，交替执行任务（单核只能并发）
- **并行**：在一段时间内，真正的同时一起执行多个任务

进程之间不共享全局变量。

```python
import multiprocessing
import time
import os

def listen_music():
    for i in range(1, 11):
        time.sleep(0.1)
        print(f'听音乐第{i}首')
    print(f'进程pid为{os.getpid()}')

def write_code():
    for i in range(1, 11):
        time.sleep(0.1)
        print(f'敲代码第{i}行')
    print(f'进程pid为{os.getpid()}')

def swimming(name, num):
    for i in range(1, num + 1):
        time.sleep(0.1)
        print(f'{name}游泳第{i}次')

p1 = multiprocessing.Process(target=listen_music)
p2 = multiprocessing.Process(target=write_code)
p3 = multiprocessing.Process(target=swimming, kwargs={'name': '张三', 'num': 3})
p4 = multiprocessing.Process(target=swimming, args=('李四', 3))

if __name__ == '__main__':
    print(f'main进程pid为{os.getpid()}')
    p1.start()
    p2.start()
    p3.start()
    p4.start()
    time.sleep(1)
    print('main进程结束了')
```

### 多线程

线程依附**进程**执行，是 cpu 调度的基本单元。同一进程的线程数据可以共享全局变量，会出现互斥锁问题。线程之间是无序的，主线程会等待所有子线程执行结束再结束。

```python
import threading
import time
import os

def listen_music():
    for i in range(1, 11):
        time.sleep(0.1)
        print(f'听音乐第{i}首')
    print(f'线程名：{threading.current_thread().name}, 进程pid：{os.getpid()}')

def write_code():
    for i in range(1, 11):
        time.sleep(0.1)
        print(f'敲代码第{i}行')
    print(f'线程名：{threading.current_thread().name}, 进程pid：{os.getpid()}')

# daemon=True 表示子线程，主线程结束时自动结束
t1 = threading.Thread(target=listen_music, name='听音乐线程', daemon=True)
t2 = threading.Thread(target=write_code, name='敲代码线程', daemon=True)

if __name__ == '__main__':
    print(f'main线程名：{threading.current_thread().name}, 进程pid：{os.getpid()}')
    t1.start()
    t2.start()
```

### 互斥锁

使用互斥锁要在合适的时机释放，否则可能出现**死锁**（等待对方释放锁，对面不释放）或**锁不住**的情况（2把锁或以上导致互斥失效）。

```python
import threading

# 全局变量
global_num = 0
# 创建互斥锁
lock = threading.Lock()

def target_fun1():
    global global_num
    lock.acquire()
    for i in range(1000000):
        global_num += 1
    lock.release()  # 如果这里注释，1先抢到线程，就会出现死锁
    print(f'线程1全局变量值：{global_num}')

def target_fun2():
    lock.acquire()
    global global_num
    for i in range(2000000):
        global_num += 1
    lock.release()
    print(f'线程2全局变量值：{global_num}')

if __name__ == '__main__':
    t1 = threading.Thread(target=target_fun1, name='线程1')
    t2 = threading.Thread(target=target_fun2, name='线程2')
    t1.start()
    t2.start()
```

## 迭代器

Python 中的一种对象，用于数据集合中逐个访问元素，而不需要暴露数据集合的底层实现。适用于支持迭代的数据类型（列表、元组等），range 函数就是一个迭代器。

```python
# 隐藏底层逻辑，让用户更方便
# 惰性加载，只在需要时才加载数据

class MyIterator:
    def __init__(self, start, end):
        self.current_value = start
        self.end = end

    def __iter__(self):  # 1
        return self

    def __next__(self):  # 2 实现这2个方法就是迭代器
        if self.current_value >= self.end:
            raise StopIteration  # 停止迭代
        self.current_value += 1
        return self.current_value - 1

for i in MyIterator(1, 10):
    print(i)

my_iter = MyIterator(5, 15)
print(next(my_iter))
print(next(my_iter))
print(next(my_iter))
```

## 生成器

基于数据规则，一部分在生成一部分，而不是一下生成完所有，节省大量的内存。推导式写法 | `yield` 关键字。

```python
# 生成1-10的整数
my_generator = (i for i in range(1, 11))
print(type(my_generator))  # <class 'generator'>
for i in my_generator:
    print(i)

# 生成1-10的偶数
my_generator = (i for i in range(1, 11) if i % 2 == 0)
print(next(my_generator))  # 2
print(next(my_generator))  # 4
for i in my_generator:
    print(i)  # 6 8 10

# 对比列表推导式和生成器的内存占用
my_list = [i for i in range(10000000)]
my_gt3 = (i for i in range(10000000))
import sys
print('mylist内存占用', sys.getsizeof(my_list))  # 89095160
print('mygt3内存占用', sys.getsizeof(my_gt3))    # 104  类似懒汉模式

# yield
def my_generator():
    for i in range(1, 11):
        yield i

def my_generator2():
    return [i for i in range(1, 11)]

print(next(my_generator()))
print(my_generator2())
```

# AI应用

提示词工程：

1. 给大模型设定角色与能力
2. 明确核心请求与任务
3. 按步骤拆解复杂任务
4. 指定风格与语气
5. 明确要求输出格式
6. 提供输入输出的实例

## streamlit

用于快速开发 Python 代码构建 web 网页的 py 库。

```python
streamlit run xxx.py
```

# 爬虫

网站根目录存放一个 `robots.txt`，君子协议 robots 协议，告诉爬虫哪些页面可以抓取，哪些不行。

csv 是一个简单通用的文本文件格式，用来存储表格数据，可以直接使用 excel 打开。格式逗号隔开，命名 `xxx.csv`，另存为编码 ansi。

```csv
姓名,性别,年龄
小维,男,18
小李,男,12
```

| 指令        | 值                                        | 说明             |
| ----------- | ----------------------------------------- | ---------------- |
| User-agent  | `*`                                       | 适用于所有爬虫   |
| Disallow    | `/wp-admin/`                              | 禁止访问后台目录 |
| Allow       | `/wp-admin/admin-ajax.php`                | 允许异步接口访问 |
| Sitemap     | `https://www.tiobe.com/sitemap_index.xml` | 指定网站地图位置 |
| Crawl-delay | `5`                                       | 爬取间隔5秒      |

https://www.baidu.com/robots.txt — 全部都不让爬。

https://www.tiobe.com/robots.txt — 不能爬取后台，其他都行。

## Xpath

用来解析 html、xml，快速定位特定元素、属性或文本，索引从1开始就是第一个标签。

```python
pip install lxml
```

| 表达式            | 描述                 | 样例                               |
| ----------------- | -------------------- | ---------------------------------- |
| `/`               | 从根节点的直接子元素 | `/html/body/div/h1`                |
| `//`              | 从任意位置选择节点   | `//h1`                             |
| `.`               | 当前节点下查找       | `./a`、`./*/a`                     |
| `[n]`             | 选择第 n 个元素      | `//p[2]`                           |
| `[last()]`        | 选择最后一个元素     | `//p[last()]` 也能 `//p[last()-1]` |
| `[@attr]`         | 选择有该属性的元素   | `//p[@color]` 或 `//p[@class]`     |
| `[@attr='value']` | 属性值等于指定值     | `//p[@color='red']`                |
| `*`               | 匹配任何元素节点     | `//body/div/*`                     |
| `@*`              | 匹配元素的任何属性   | `//body/div/a/@*`                  |
| `text()`          | 获取文本内容         | `//div/p/text()`                   |

### 热门语言榜单

```python
import requests
from lxml import html

# 先爬取页面，保存到本地，再去本地解析它，避免爬虫被封
# url = 'https://www.tiobe.com/tiobe-index/'
# response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
# with open('./pages/tiobe.html', 'w', encoding='utf-8') as f:
#     f.write(response.text)

with open('./pages/tiobe.html', 'r', encoding='utf-8') as f:
    html_text = f.read()
    document = html.fromstring(html_text)

    # 解析表头
    tb_head = document.xpath('//*[@id="top20"]/thead/tr/th/text()')
    tb_head.remove('Change')
    print(tb_head)

    with open('./pages/tiobe.csv', 'w', encoding='utf-8') as f:
        f.write(','.join(tb_head) + '\n')

    # 解析表格
    tr_list = document.xpath('//table[@id="top20"]/tbody/tr')
    for tr in tr_list:
        td_list = tr.xpath('./td/text()')
        print(td_list)
        with open('./pages/tiobe.csv', 'a', encoding='utf-8') as f:
            f.write(','.join(td_list) + '\n')

# 推荐用csv模块来操作csv
import csv

with open('./pages/demoCsv.csv', 'w', encoding='utf-8', newline='') as f:
    writer = csv.DictWriter(f, ['name', 'age', 'sex'])
    writer.writeheader()
    writer.writerow({'name': '张三', 'age': 18, 'sex': '男'})
    writer.writerow({'name': '李四', 'age': 28, 'sex': '男'})
    writer.writerow({'name': '王五', 'age': 48, 'sex': '男'})

with open('./pages/demoCsv.csv', 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(row)
```

### 高分电影top100

https://www.themoviedb.org/robots.txt — 发现列举的 agent 是不让爬的，个人可以。

# 数据分析

**数据收集** -> **数据清洗处理** -> **数据分析** -> **数据可视化**

Pandas：订单号一样需去重，处理缺失值 NaN，处理异常值（单价是负的），日期格式一致性。

## Pandas

核心 DataFrame（类似表格）和 Series（示例：Name列）。

```python
pip install pandas==2.2.2
```

| index | Name  | Age | Sex    |
| ----: | ----- | --: | ------ |
|     0 | Jay   |  18 | male   |
|     1 | Leo   |  22 | male   |
|     2 | Lily  |  25 | female |
|     3 | Jerry |  19 | male   |
|     4 | Cici  |  21 | female |

## Matplotlib

用于 Python 创建静态、动画和交互式可视化。

```python
pip install matplotlib==3.9.2
```

# FastAPI

现代、快速、高性能的 Python web 框架，用来搭建 api 服务接口。

```python
from fastapi import FastAPI
app = FastAPI()

@app.get('/')
def index():
    return {'message': 'hello world'}

@app.get('/user')
def user():
    return [{'id': 1, 'name': 'lucky'}, {'id': 2, 'name': 'lucky2'}, {'id': 3, 'name': 'lucky3'}]
```

运行方式2种：

```python
# 方式1：命令行
fastapi dev .\fastapi入门.py

# 方式2：代码中直接运行
if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
```

**REST 风格**：URL 定义资源，动词描述操作。

| 方法   | 说明 |
| ------ | ---- |
| GET    | 查询 |
| POST   | 新增 |
| PUT    | 修改 |
| DELETE | 删除 |
