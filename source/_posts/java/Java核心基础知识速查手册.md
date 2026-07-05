---
title: Java基础入门笔记
cover: https://imgs.luckynwa.top/openApi/lucky/yys/364
description: 路漫漫其修远兮，吾将上下而求索；千淘万漉虽辛苦，吹尽狂沙始到金。
categories: 后端
tags: Java
comments: true
abbrlink: jva382
summary: >-
  本文是Java基础知识的学习笔记，涵盖环境配置、IDEA快捷键、命名规范、数据类型与类型转换、运算符、条件与循环语句、数组的使用、函数方法、面向对象（封装、继承、多态）、接口、包装类、修饰符、枚举类、IO流（File类、字节流、字符流、缓冲流、转换流）、异常处理以及常用API（Random、Scanner、Date、Calendar、Math、String、StringBuffer/StringBuilder）等内容，配有丰富的代码示例和实际运行效果说明，适合Java初学者系统学习和快速查阅。
date: 2023-08-10 14:12:00
---

## 环境

安装JDK8并配置环境变量

jvm+核心类库=jre

jre+开发工具=jdk

Java基础运行流程，代码从上到下，从左往右，只运行一次

桌面--->新建文件夹--->新建记事本--->打开编写代码

```java
public class Hello{
 	public static void main(String[] args){
		System.out.println("Hello luckyNwa ");
	}
}
```

--->修改记事本名称为 Hello.java ---->路径栏输入cmd回车出现终端---->

```shell
javac Hello.java
```

---->生成class文件--->运行

```shell
java Hello
```

过程：源文件A.java--->javac编译--->A.class--->java运行到JVM中

在打印中加入中文发现乱码，解决

文件改成ANSI格式另存覆盖原来的utf-8 或者在javac那指令改成如下

```shell
javac -encoding UTF-8 Hello.java
```

![](https://imgs.luckynwa.top/profile/mdS/java1.png)

## IDEA的快捷键

ctrl+/ 单行注释

/\*\*回车 文档注释

/\* \*/ 多行注释

shift+ctrl+enter 光标到下一行，也可以补齐;

mian 生成入口函数

alt +enter 用于前面的变量定义 比如 new Scanner(System.in);

ctrl+n 查类的说明文档 比如Math类

fori 回车直接打出循环 数组a.for回车 foreach快捷键

shift+tab 向前退一格

ctrl+alt+t 可以添for while try catch 等

## 命名规范

标识符（变量）规则：由字母，数字，下划线和$组成，不能以数字开头 ，不能用关键字

业内规定：

类：首字母大写，驼峰命名法

包：小写字母组成，域名倒置

变量/方法：首字母小写，驼峰命名法，需要语义化，见名知意

常量：全部大写字母，单词之间下划线隔开 要加个final修饰，不可改变

关键字：Java官方用掉的名字

## 数据类型

数据类型分为基本数据类型和引用数据类型(复合数据类型)

**基本数据类型（四类八型)**

整数类型: byte 8 short 16 int(默认) 32 long 64 数字是位数

浮点类型: float 32 单精度 double(默认) 64 双精度 float范围比long大因为它是小数的。浮点数不能用来表示精确的值，如货币

字符型: char 只有这用单引号，其他基本都是双引号 char letter = 'A';

布尔型 Boolean: true false(默认)

**引用数据类型**

它们是通过类来定义的。Java 中的引用数据类型包括：

- 类
- 接口
- 数组

复合数据类型有无数种，自带方法和属性，如String、Scanner、Random等

基本数据类型在内存中存储实际的值，而引用数据类型则存储对对象的引用（即内存地址）。在使用基本数据类型时，实际的值直接存储在变量中，而在使用引用数据类型时，变量存储的是对象的引用，对象本身存储在堆内存

**数据类型转换**

低的变高，是自动转换；高的变低必须强转，会精度损失

浮点转整需要舍弃小数位

byte到double 从低到高，byte 类型是 8 位，最大值为127，所以当 int 强制转换为 byte 类型时，值 128 时候就会导致溢出

```java
低  ------------------------------------>  高

byte,short,char—> int —> long—> float —> double
int i =128;
byte b = (byte)i;
```

float型转换为double型

```java
float f1=100.00f;
Float F1=new Float(f1);
double d1=F1.doubleValue();//F1.doubleValue()为Float类的返回double值型的方法
```

简单类型的变量转换为相应的包装类，可以利用包装类的构造函数。即：Boolean(boolean value)、Character(char value)、Integer(int value)、Long(long value)、Float(float value)、Double(double value)

而在各个包装类中，总有形为××Value()的方法，来得到其对应的简单类型数据

**补充**

string 转 int

- 传入字符串返回整形、这是Integer的静态方法、不会产生多余对象、会抛异常

  ```java
  int i=Integer.parseInt(s)
  ```

- Integer.valueOf (s) 相当于 new Integer (Integer.parseInt (s))， 返回一个Integer类型，也会抛异常，会多出一个对象，.intValue()获取其对应的基本类型值

  ```java
  int i = Integer.valueOf(s).intValue();
  int i = Integer.valueOf(s)                会自动拆箱这样写就行了
  ```

int 转String

- 类似

  ```java
  		String s1 = String.valueOf(i);        //第一种
  		String s2 = Integer.toString(i);      //第二种
  		String s3 = "" + i;                   //第三种
  ```

## 运算符

- 算术运算符

  +、-、\*、/、% 、++、-- （%取余5%2=1）

- 关系运算符

  == 、!=、>、<、>=、<=

- 位运算符

  ＆ |(计算二进制的，用处少)

  7 二进制过程---> 7/2 =3 1 3/2=1 1 1/2= 1 0111 7的二进制结果倒着余数 111

  9 二进制过程---> 9/2=4 1 4/2=2 0 2/2=1 0 1/2= 1 1001 结果倒着余数 1001

  0001 7&9结果1 &必须2个是1才是1

- 逻辑运算符

  &&（逻辑与，2真才真，也叫短路运算符，1假则不会继续下个判断了） 、||(逻辑或，1真就真)、 !(逻辑非)

- 赋值运算符

  =、+=，-=..（c-=a 等价于 c=c-a 其他同理）

- 条件运算符

  条件运算符也被称为三元运算符。该运算符有3个操作数，并且需要判断布尔表达式的值。该运算符的主要是决定哪个值应该赋值给变量。

```java
    int a = 10;
    int b = 20;
    int max = a < b ? b : a;  //10<20所以将b的值给max否则a，就是三元运算符
```

## 条件

Java 中的条件语句允许 程序 **根据条件的不同执行不同的代码块**

```java
if(布尔表达式 1){
   //如果布尔表达式 1的值为true执行代码
}else if(布尔表达式 2){
   //如果布尔表达式 2的值为true执行代码
}else if(布尔表达式 3){
   //如果布尔表达式 3的值为true执行代码
}else {
   //如果以上布尔表达式都不为true执行代码
}
```

上面可以各种用

**switch case**

判断一个变量与一系列值中某个值是否相等，每个值称为一个分支。

```java
switch(expression){
    case value :
       //语句
       break; //可选
    case value :
       //语句
       break; //可选
    //你可以有任意数量的case语句
    default : //可选
       //语句
}
```

```java
public class Test {
   public static void main(String args[]){
      int i = 2;
      switch(i){
         case 0:
            System.out.println("0");
         case 1:
            System.out.println("1");
         case 2:
            System.out.println("2");
         default:
            System.out.println("default");
      }
   }
}
```

匹配成功后，从当前 case 开始，后续所有 case 的值都会输出

2
default

如果i是6，都匹配不到则返回默认的default里的值，一般匹配到就break打断了

## 循环

Java中有三种主要的循环结构：

- **while** 循环

  只要布尔表达式为 true，循环就会一直执行下去。

  ```java
  while( 布尔表达式 ) {
    //循环内容
  }
  ```

- **do…while** 循环

  do…while 循环和 while 循环相似，不同的是，do…while 循环至少会执行一次。

  ```java
  do {
         //代码语句
  }while(布尔表达式);

  ```

- **for** 循环

  for循环执行的次数是在执行前就确定的

  ```java
  for(初始化; 布尔表达式; 更新) {
      //代码语句
  }
  ```

java5引入foreach--->数组的增强型 for 循环 数组a.for回车快速生成

```java
for(声明语句 : 表达式)
{
   //代码句子
}
```

```java
public class Demo1 {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40, 50};
        for (int item : numbers) {
            System.out.println(item);
        }
    }
}
```

**配合的关键字**

break主要用于停止，整个循环语句或者 switch 语句，循环语句后面的代码还会运行

continue用于循环里面让程序跳过当前循环，立刻进入下一次的循环

return用于返回方法类型指定的值也可以是对象，还能可以结束后面代码的执行

```java
public class Demo1 {
    public static void main(String[] args) {
        int[] numbers = {10, 20, 30, 40, 50};
        for (int item : numbers) {
//            if (item == 10) {
//                continue;//跳过当前满足的条件,继续循环          ---->20,30,40,50,哈哈
//            }
            System.out.print(item);
            System.out.print(",");
            if (item == 10) {
//                break;//满足条件时候跳出循环，循环后面的哈哈还是打印---->10,哈哈
                return;//直接返回,不执行后续代码                  ---->10
            }
        }
        System.out.println("哈哈");
    }
}
```

**总结**

for和while都被称为前置判断循环 do..while是后置判断循环

while和do while都属于不确定次数的循环语句

for 是属于确定次数的循环语句

## 数组

数组的创建

入口函数那是推荐main(String[] args) 或者写main(String args[])

声明

```java
dataType[] arrayRefVar;   // 首选的方法
或
dataType arrayRefVar[];  // 效果相同，但不是首选方法
arrayRefVar = new dataType[arraySize];
```

创建数组

```java
dataType[] arrayRefVar = new dataType[arraySize];  //动态声明
dataType[] arrayRefVar = new dataType[]{value0, value1, ..., valuek};//用的少，使用1、3
dataType[] arrayRefVar = {value0, value1, ..., valuek}; //静态声明方式
```

**一维数组**

```java
public class Demo1 {
    public static void main(String[] args) {
        // 数组大小
        int size = 5;
        double[] myList = new double[size];
        myList[0] = 5.6;
        myList[1] = 4.5;
        myList[2] = 3.3;
        myList[3] = 13.2;
        myList[4] = 4.0;
        // 计算所有元素的总和
        double total = 0;
        for (int i = 0; i < size; i++) {
            total += myList[i];
        }
        System.out.println("总和为： " + total);
        // 查找最大元素
        double max = myList[0];
        for (int i = 1; i < myList.length; i++) {
            if (myList[i] > max) max = myList[i];
        }
        System.out.println("Max is " + max);
        System.out.println("-------------------");
        int[] arr = {1, 2, 3, 4, 5};
        for (int x : arr) {  //这里x只是变量名
            System.out.println(x);//如果里面还有一个循环int y ：x
        }
    }
}

```

**二维数组**

```java
type[][] typeName = new type[typeLength1][typeLength2];
```

type 可以为基本数据类型和复合数据类型，typeLength1 和 typeLength2 必须为正整数，typeLength1 为行数，typeLength2 为列数

```java
int[][] a = new int[2][3];
```

a 可以看成一个两行三列的数组

```java
public class Demo1 {
    public static void main(String[] args) {
        String[][] s = new String[2][];
        s[0] = new String[2];
        s[1] = new String[3];
        s[0][0] = new String("Good");
        s[0][1] = new String("Luck");
        s[1][0] = new String("to");
        s[1][1] = new String("you");
        s[1][2] = new String("!");
//        System.out.println(s[0][1]);//Lucky
        for (String[] strings : s) {
            for (String string : strings) {
                System.out.print(string.concat("\t"));
            }
        }
    }
}
```

```java
public class Demo1 {
    public static void main(String[] args) {
        String[] stu1 = {"张三", "Jx202211", "男", "22"};
        String[] stu2 = {"李四", "Jx202212", "女", "21"};
        String[] stu3 = {"王五", "Jx202213", "男", "25"};
        String[] stu4 = {"小六", "Jx202214", "女", "20"};
        String[][] stu = {stu1, stu2, stu3, stu4};
        for (int i = 0; i < stu.length; i++) {
            for (int j = 0; j < stu[i].length; j++) {
                System.out.print(stu[i][j] + "\t");
            }
            System.out.println();
        }
    }
}
```

## 函数(方法)

函数是一段具备特定功能的、高度封装的代码块

函数声明:

```java
修饰符 返回值类型 方法名(参数类型 参数名){
    ...
    方法体
    ...
    return 返回值;
}
```

1、修饰符 public static 公开的 静态的
2、返回值类 void 表返回值为null，就不需要return，其他都需要
3、函数名 小驼峰命名
4、参数列表  
5、方法体 要执行的代码块

![](https://imgs.luckynwa.top/profile/mdS/java1.png)

```java
public class Demo1 {
    public static void main(String[] args) {
        Demo1.nPrintln("lucky", 2);//正常静态方法调用-->类名.方法名称()
        Demo1 demo1 = new Demo1();//如果不是静态在类上需要new出来再.
        System.out.println("最大值是" + demo1.max(1, 2));
        System.out.println("最大值是" + demo1.max(11.2, 32.2));
        printMax(new double[]{1, 2, 3});//在本类中可以直接调用，无需类名
        printMax(new double[]{});
    }

    public static void nPrintln(String message, int n) {
        for (int i = 0; i < n; i++) {
            System.out.println(message);
        }
    }

    public int max(int num1, int num2) {
        return num1 > num2 ? num1 : num2;
    }

    public Double max(Double num1, Double num2) {
        return num1 > num2 ? num1 : num2;
    }

    public static void printMax(double... numbers) {//JDK 1.5 开始，Java支持传递同类型的可变参数给一个方法
        if (numbers.length == 0) {                  //在指定参数类型后加一个省略号...，传了个数组过来
            System.out.println("No argument passed");
            return;
        }
        double result = numbers[0];
        for (int i = 1; i < numbers.length; i++) {
            if (numbers[i] > result) {
                result = numbers[i];
            }
        }
        System.out.println("The max value is " + result);
    }
}
```

形参与实参：函数声明里就是形参，而调用那里输入则是实参

返回值：看声明里返回值类，void则没有返回值，如int则返回整型n，如果是类，返回一个对象类

函数的递归：即函数里调用函数自己

变量作用域：方法内声明的变量（局部变量），方法外不可用

方法重载：同一类中方法名相同，参数数量和类型不同。构造方法（对象里的）就可以利用重载

## 对象

世界万物皆对象，对象的特点是属性、对象的行为是方法，对象的行为必须是自发的

特征

- 封装
- 继承
- 多态

### 封装

私有化属性并设置公有的get、set方法 IDEA右键--->生成---选择需要的

封装可以被认为是一个保护屏障，防止该类的代码和数据被外部类定义的代码随机访问

比如该类是公开的属性，那么外部new这个对象时候便可以直接.属性去修改，现在我们封装了它无法直接修改需要调用set方法去修改，比如年龄想修改1000岁是不正常的，我们便可以再set方法中加逻辑

```java
public class Lucky {
    private String name;

    public Lucky() {					//默认存在这个空构造

    }

    public Lucky(String name) {			//方法的重载
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override                 //方法的重写，原来是打印这个对象的引用地址
    public String toString() {//下面的值
        return "Lucky{" +
                "name='" + name + '\'' +
                '}';
    }
}
```

```java
public class Demo1 {
    public static void main(String[] args) {
        Lucky name = new Lucky("小维");
        System.out.println(name);
        Lucky name2 = new Lucky();
        name2.setName("小米");
        System.out.println(name2);
    }
}
```

结果：

Lucky{name='小维'}
Lucky{name='小米'}

**this** 关键字是为了解决实例变量（private String name）和局部变量（setName(String name)中的name变量）之间发生的同名的冲突

### 构造函数

**是一个没有返回值，并且函数名和类型相同的函数**，在对象实例化的一瞬间就会执行，利用构造函数的参数，对属性进行赋值

### 继承

继承就是子类继承父类的属性和方法 苹果是水果可以继承水果类 食草动物是动物可以继承动物类

必须满足is-a关系 父类更通用 子类更具体

![](https://imgs.luckynwa.top/profile/mdS/java8.png)

关键字是extends 写在类名后面

一个类只能继承一个抽象类， 继承不可滥用，牵一发而动全身，父类改变一次，其他全部受到影响，即耦合性过高，

继承一般继承Java官方的类

```java
class 父类 {
}

class 子类 extends 父类 {
}
```

现在有3个类如下

```java
public class Penguin {
    private String name;
    private int id;

    public Penguin(String myName, int myid) {
        name = myName;
        id = myid;
    }

    public void eat() {
        System.out.println(name + "正在吃");
    }

    public void sleep() {
        System.out.println(name + "正在睡");
    }

    public void introduction() {
        System.out.println("大家好！我是" + id + "号" + name + ".");
    }
}
```

```java
public class Mouse {
    private String name;
    private int id;

    public Mouse(String myName, int myid) {
        name = myName;
        id = myid;
    }

    public void eat() {
        System.out.println(name + "正在吃");
    }

    public void sleep() {
        System.out.println(name + "正在睡");
    }

    public void introduction() {
        System.out.println("大家好！我是" + id + "号" + name + ".");
    }
}
```

```java
public class Demo1 {
    public static void main(String[] args) {
        Penguin penguin = new Penguin("企鹅", 1);
        penguin.eat();
        penguin.sleep();
        penguin.introduction();
        Mouse mouse = new Mouse("老鼠", 2);
        mouse.eat();
        mouse.sleep();
        mouse.introduction();
    }
}
```

会发现代码存在重复，导致代码量大且臃肿，而且维护性不高(主要表现是后期需要修改的时候，需要修改很多的代码，容易出错)

要从根本上解决这两段代码的问题，就需要继承，将两段代码中相同的部分提取出来组成 一个父类

```java
public class Animal {
    private String name;
    private int id;
    public Animal(String myName, int myid) {
        name = myName;
        id = myid;
    }
    public void eat(){
        System.out.println(name+"正在吃");
    }
    public void sleep(){
        System.out.println(name+"正在睡");
    }
    public void introduction() {
        System.out.println("大家好！我是"         + id + "号" + name + ".");
    }
}
```

改造子类，extends单继承，子类只能有一个父类，可以多重继承比如a给b继承，b给c继承，没用过。子类不继承父类的构造器

```java
public class Penguin  extends Animal{
    public Penguin(String myName, int myid) {
        super(myName, myid);
    }
}
```

```java
public class Mouse extends Animal {
    public Mouse(String myName, int myid) {
        super(myName, myid);//调用父类的构造并传入参数
    }
}
```

**关键字 super** ：放在代码里 用来子类给父类的构造函数的参数传参，还能调用父类的方法 ，不过继承就有父方法了

如果父类构造器没有参数，则在子类的构造器中不需要使用 **super** 关键字调用父类构造器，系统会自动调用父类的无参构造器

**继承关系下**

首先，会调用父类的构造函数。如果子类构造函数的第一行没有显式调用父类构造函数（通过 `super()`），则会自动调用父类的无参构造函数。如果父类没有无参构造函数，并且子类没有显式调用父类的其他构造函数，则编译器会报错

然后，执行父类的构造函数体

接着，再执行子类的构造函数。如果子类构造函数的第一行没有显式调用其他构造函数（通过 `this()` 或 `super()`），则会自动调用父类的无参构造函数，然后执行子类的构造函数体

最后，执行子类的构造函数体

**重写（Override）**

子类定义了一个与其父类中具有相同名称、参数列表和返回类型的方法，并且子类方法的实现覆盖了父类方法的实现。 **即外壳不变，核心重写！**

父类的方法，子类写的一模一样，最终执行的是子类的方法

重写规则：修饰符不能强于父类，返回值类型、方法名、参数列表必须一样

**重载(overloading)**

在一个类里面，方法名字相同，而参数不同。返回类型可以相同也可以不同

### 多态

多态指同一个事物能呈现出多种形态的能力 多态是**继承的一种体现**

方法重载是一个类的多态性表现,而方法重写是子类与父类的一种多态性表现

多态就是同一个接口，使用不同的实例而执行不同操作

多态存在的三个必要条件：

- 继承
- 重写
- 父类引用指向子类对象：**Parent p = new Child();**

![](https://imgs.luckynwa.top/profile/mdS/java9.png)

AnimalT能呈现出多种形态的能力

当使用多态方式调用方法时，首先检查父类中是否有该方法，如果没有，则编译错误；如果有，再去调用子类的同名方法

```java
public class Demo1 {
    public static void main(String[] args) {
        AnimalT a = new Lion();//父类引用指向子类对象,执行的是子类的方法，这就是多态   向上转型
        a.eat();
        a.sleep();
    }
}
// 动物类 AnimalT.java
abstract class AnimalT {
    abstract void eat();
    abstract void sleep();

}
// 狮子类 Lion.java
class Lion extends AnimalT {
    public void eat() {
        System.out.println("狮子吃");
    }
    public void sleep() {
        System.out.println("狮子睡");
    }
}
// 老虎类 Tiger.java
class Tiger extends AnimalT {
    public void eat() {
        System.out.println("老虎吃");
    }
    public void sleep() {
        System.out.println("老虎睡");
    }
}
```

```java
class Animal {
    public void makeSound() {
        System.out.println("动物发出声音");
    }
}

class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("狗发出汪汪声");
    }
}

class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("猫发出喵喵声");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal animal1 = new Dog(); // 使用父类引用指向子类对象
        Animal animal2 = new Cat(); // 使用父类引用指向另一个子类对象

        animal1.makeSound(); // 调用被重写的方法，输出：狗发出汪汪声
        animal2.makeSound(); // 调用被重写的方法，输出：猫发出喵喵声
    }
}
```

这就是多态的体现，通过父类的引用调用被子类重写的方法

### 接口

接口并不是类，类描述对象的属性和方法。接口则包含类要实现的方法

接口无法被实例化，但是可以被实现。一个实现接口的类，必须实现接口内所描述的所有方法，否则就必须声明为抽象类

接口：没有方法体的方法的集合

- 接口中每一个方法也是隐式抽象的,接口中的方法会被隐式的指定为 **public abstract**（JDK8后default也行，其他修饰符会报错）
- JDK 1.8 以后，接口里可以有静态方法和方法体

**implements关键字**

使用 implements 关键字可以变相的使java具有多继承的特性，使用范围为类继承接口的情况，可以同时继承多个接口（接口跟接口之间采用逗号分隔）

```java
public interface A {              //定义A接口interface关键字
     void eat();
     void sleep();
}

public interface B {               //定义B接口
     void show();
}

public class C implements A,B {    //实现类 需要全部实现接口中的方法
}
```

有方法体的方法 被称为 实例方法

没方法体的方法 被称为 抽象方法

### 包装类

所有的包装类**（Integer、Long、Byte、Double、Float、Short）**都是抽象类 Number 的子类

![](https://imgs.luckynwa.top/profile/mdS/java2.png)

这种由编译器特别支持的包装称为装箱，所以当内置数据类型被当作对象使用的时候，编译器会把内置类型装箱为包装类。相似的，编译器也可以把一个对象拆箱为内置类型。Number 类属于 java.lang 包

```java
public class Test{
   public static void main(String[] args){
      Integer x = 5; // x 被赋为整型值时，由于x是一个对象，所以编译器要对x进行装箱
      x =  x + 10;   //为了使x能进行加运算，所以要对x进行拆箱
      System.out.println(x);
   }
}
```

### 修饰符

#### 访问控制修饰符

Java中，可以使用访问控制符来保护对类、变量、方法和构造方法的访问。Java 支持 4 种不同的访问权限。

- **default** (无修饰）: 本类、同一包的类可见
- **private** : 私有的 能且仅能在本类中使用 **注意：不能修饰类（private class Demo1 ）错误**
- **public** : 对所有类可见。使用对象：类、接口、变量、方法
- **protected** : 本类、子类、同一包的类可见 **注意：不能修饰类（外部类）**

#### static

static 关键字用来声明独立于对象的静态变量，无论一个类实例化多少对象，它的静态变量只有一份拷贝。 静态变量也被称为类变量。局部变量不能被声明为 static 变量

static 关键字用来声明独立于对象的静态方法。静态方法不能使用类的非静态变量。静态方法从参数列表得到数据，然后计算这些数据

它的特性:只会在类加载的时候执行一次。

#### final

final 表示"最后的、最终的"含义，变量一旦赋值后，不能被重新赋值。被 final 修饰的**实例**变量必须显式指定初始值

final修饰类中的属性或者变量 无论属性是基本类型还是引用类型，final所起的作用都是变量里面存放的"值"不能变，这个值，对于基本类型来说，变量里面放的就是实实在在的值，而引用类型变量里面放的是个地址，所以用final修饰引用类型变量指的是它里面的地址不能变，并不是说这个地址所指向的对象或数组的内容不可以变，这个一定要注意

final 修饰符通常和 static 修饰符一起使用来创建类常量。

```java
public class MyClass {
    public static int count = 0;                 //静态变量
    public static final int MAX_SIZE = 100;      // 使用大写蛇形命名法 常量
}
```

访问

```java
MyClass.count = 10; // 通过类名访问
MyClass obj = new MyClass();
obj.count = 20; // 通过实例名访问
```

**final 属性** 声明变量时可以不赋值，而且一旦赋值就不能被修改了,用来new的那个对象里有final修饰的属性那个属性必须赋值

**final 方法** 可以被子类继承，但是不能被子类重写。声明 final 方法的主要目的是防止该方法的内容被修改

**final 类** 不能被继承

#### abstract（抽象类）

抽象类不能用来实例化对象

一个类不能同时被 abstract 和 final 修饰。如果一个类包含抽象方法，那么该类一定要声明为抽象类，否则将出现编译错误

抽象类可以包含抽象方法和非抽象方法

```java
abstract class Caravan{  //被abstract修饰就是抽象类
   private double price;
   private String model;
   private String year;
   public abstract void goFast(); //抽象方法
   public abstract void changeColor();
}
```

抽象方法是一种没有任何实现的方法，该方法的具体实现由子类提供

抽象方法不能被声明成 final 和 static

如果一个类包含抽象方法，那么该类必须声明为抽象类。抽象类可以不包含抽象方法

继承抽象类的子类必须实现父类的所有抽象方法，除非该子类也必须声明为抽象类

构造方法，类方法（用 static 修饰的方法）不能声明为抽象方法

抽象方法的声明以分号结尾，例如：**public abstract sample();**

```java
public abstract class SuperClass{
    abstract void m(); //抽象方法
}

class SubClass extends SuperClass{
     //实现抽象方法
      void m(){
          .........
      }
}
```

#### synchronized

synchronized 关键字声明的方法同一时间只能被一个线程访问。synchronized 修饰符可以应用于四个访问修饰符。

```java
public synchronized void showDetails(){
.......
}
```

#### 枚举类

枚举是一个特殊的类，一般表示一组常量，比如一年的 4 个季节，一年的 12 个月份，一个星期的 7 天，方向有东南西北等--->场景：颜色（红黄蓝绿...）、星期、反射做多个oss桶时候

常量类是指一组声明为静态的、不可改变的常量变量，它们通常用于定义一些全局性的常量，如数学常数π、还有一些不变的值，项目中必定有一个常量类，final关键字，表示这些变量不能被修改---> 场景：分页的当前页、限制页数、返回的数据成功、失败...

Java 枚举类使用 enum 关键字来定义，各个常量使用逗号 **,** 来分割

```java
enum Color {
    RED, GREEN, BLUE;
    private Color()    // 构造函数只能使用 private 访问修饰符，所以外部无法调用
    {
        System.out.println("Constructor called for : " + this.toString());
    }
    public void colorInfo() {//枚举既可以包含具体方法，也可以包含抽象方法。 如果枚举类具有抽象方法，则枚举类的每个实例都必须实现它
        System.out.println("枚举的方法");
    }
}
```

每个枚举都是通过 Class 在内部实现的，且所有的枚举值都是 public static final 的，所以可以 类名.名称

- values() 返回枚举类中所有的值。
- ordinal()方法可以找到每个枚举常量的索引，就像数组索引一样。
- valueOf()方法返回指定字符串值的枚举常量。

```java
public class Demo1 {
    public static void main(String[] args) {
        Color c1 = Color.RED;
        System.out.println(c1);
        for (Color myVar : Color.values()) {
            System.out.println(myVar);
        }
        // ------------------------------------------------
        Color myVar = Color.BLUE;
        switch (myVar) {
            case RED:
                System.out.println("红色");
                break;
            case GREEN:
                System.out.println("绿色");
                break;
            case BLUE:
                System.out.println("蓝色");
                break;
        }
        // ------------------------------------------------
        Color[] arr = Color.values();
        // 迭代枚举
        for (Color col : arr) {
            // 查看索引
            System.out.println(col + " at index " + col.ordinal());
        }
        // 使用 valueOf() 返回枚举常量，不存在的会报错 IllegalArgumentException
        System.out.println(Color.valueOf("RED"));
        // ------------------------------------------------
        Color green = Color.GREEN;//下面2个结果一样
        green.colorInfo();
        Color red = Color.RED;
        red.colorInfo();
    }
}
```

工作中的写法1

```java
public enum ErrorCode {
    OK(0) {
        public String getDescription() {
            return "成功";
        }
    },
    ERROR_A(100) {
        public String getDescription() {
            return "错误A";
        }
    },
    ERROR_B(200) {
        public String getDescription() {
            return "错误B";
        }
    };                            //分号
    private int code;
    // 构造方法：enum的构造方法只能被声明为private权限或不声明权限
    private ErrorCode(int number) { // 构造方法
        this.code = number;
    }
    public int getCode() { // 普通方法
        return code;
    } // 普通方法
    public abstract String getDescription(); // 抽象方法
}
```

写法2 效果和调用一样

```java
public enum ErrorCodeEn {
    OK(0, "成功"),
    ERROR_A(100, "错误A"),
    ERROR_B(200, "错误B");
    ErrorCodeEn(int number, String description) {
        this.code = number;
        this.description = description;
    }
    private int code;
    private String description;
    public int getCode() {
        return code;
    }
    public String getDescription() {
        return description;
    }
}
```

```java
public class Demo1 {
    public static void main(String[] args) {
        // 获取枚举常量的值
        System.out.println(ErrorCodeEn.OK.getCode()); // 输出: 0
        System.out.println(ErrorCodeEn.ERROR_A.getCode()); // 输出: 100
        System.out.println(ErrorCodeEn.ERROR_B.getCode()); // 输出: 200
        // 获取枚举常量的描述
        System.out.println(ErrorCodeEn.OK.getDescription()); // 输出: 成功
        System.out.println(ErrorCodeEn.ERROR_A.getDescription()); // 输出: 错误A
        System.out.println(ErrorCodeEn.ERROR_B.getDescription()); // 输出: 错误B

    }
}
```

### 补充

**面向对象与面向过程区别**

面向过程：只关注事情本身的完成，不关注谁去做，就像大象塞进冰箱，不管是谁把冰箱打开，谁把大象弄进去

面向对象：更多关注 谁去做事情 各有各的好处

**对象的生命周期**

对象的出生：一旦被声明被赋值之后 对象即出现

对象的销毁：当该对象没有被指向 就会被自动销毁

String a；这是空，没有对象，所以没有出生和销毁

## IO流

IO 流：按照流动的方向，以内存为基准，分为输入 input 和输出 output ，即流向内存是输入流，流出内存的输出流

（1）明确要操作的数据是数据源还是数据目的(也就是要读还是要写)
（2）明确要操作的设备上的数据是字节还是文本
（3）明确数据所在的具体设备
（4）明确是否需要额外功能（比如是否需要转换流、高效流等）

输入流（读数据 硬盘---->内存）、输出流（写数据 内存--->硬盘）

分类：

1.字节流：字节流又分为字节输入流、字节输出流 2.字符流：字符流由分为字符输入流、字符输出流

字符流的由来：因为数据编码的不同，字节流直接读中文会乱码 字符流 = 字节流 + 编码表

数据流向内存就是输入流，流出内存就是输出流，根据数据的类型分为

字节流和字符流，如名字的为单位

字节流对应的输入流 InputStream 输出流 OutputStream

字符流对应的输入流 Reader 输出流 Writer

超类（父类）以这四个名称结尾都是它的子类

比如常见的 FileInputStream 文件输入流

1 个字符=2 个字节

字节流适合读取视频、音乐、图片等二进制文件，字符流比较适合读取纯文本文件

字节流可以传输任意文件数据。在操作流的时候，我们要时刻明确，无论使用什么样的流对象，底层传输的始终为二进制数据

### File 类

java.io.File 类是专门对文件进行操作的类，只能对文件本身进行操作，不能对文件进行读和写也就是输入和输出

File 类构造方法不会给你检验这个文件或文件夹是否真实存在，因此无论该路径下是否存在文件或者目录，都不影响 File 对象的创建。

下面一个测试类

```java
package com.nwa;

import org.junit.Test;


import java.io.*;

/**
 * @Author Lucky友人a
 * @Date 2023/8/10 -10:34
 */
public class FileDemo {
    @Test
    public void fun1() throws IOException {
        File f = new File("C:\\Users\\FF\\Desktop\\1.txt");  //就算文件1.txt不存在也不影响file对象的创建
        if (!f.exists()) {
                System.out.println("是否创建:"+f.createNewFile()); // true 如果没有文件则创建并返回true
        }
        System.out.println("是否创建:"+f.createNewFile());  //已经存在，所以就false了
        System.out.println("文件绝对路径:"+f.getAbsolutePath());//文件绝对路径:C:\Users\FF\Desktop\1.txt
        System.out.println("文件构造路径:"+f.getPath());        //文件构造路径:C:\Users\FF\Desktop\1.txt
        System.out.println("文件名称:"+f.getName());          //文件名称:1.txt
        System.out.println("文件长度:"+f.length()+"字节");
        // 判断是文件还是目录
        System.out.println("文件:"+f.isFile());
        System.out.println("目录:"+f.isDirectory());
        //一个路径下全部文件名,先将字符串转目录
//        String path = "D:\\workspace";
//        File file = new File(path);
//        printFile(file);
    }
//结果1   传进的file不一样结果不一样，如果是绝对位置那么构造啥的都是绝对的
//    是否创建:false
//    文件绝对路径:C:\Users\FF\Desktop\1.txt
//    文件构造路径:C:\Users\FF\Desktop\1.txt
//    文件名称:1.txt
//    文件长度:0字节
//    文件:true
//    目录:false


//结果2 如果是直接1.txt则会相对这个项目来创建这个文件
//    是否创建:true
//    是否创建:false
//    文件绝对路径:E:\LuckyWorckSpace\lucky_api\1.txt
//    文件构造路径:1.txt
//    文件名称:1.txt
//    文件长度:0字节
//    文件:true
//    目录:false
    @Test
    public void testDemo2() {   //目录的创建等,使用相对这个项目下的目录来测试了
        // 目录的创建
        File f2= new File("newDira");
//        System.out.println("是否存在:"+f2.exists());// false
//        System.out.println("是否创建:"+f2.mkdir());	//  这个是创建的意思，并返回true
//        System.out.println("是否存在:"+f2.exists());// true
        // 创建多级目录
//        File f3= new File("newDira\\newDirb");
//        System.out.println(f3.mkdir());// false，没有加s指南创建单层的目录
        File f4= new File("newDira\\newDirb");
  //      System.out.println(f4.mkdirs());// true,可以创建多级别的目录

        // 文件和目录的删除  delete方法，如果此File表示目录，则目录必须为空才能删除。
      //  System.out.println(f2.delete());// true
   //     System.out.println(f4.delete());// false如果是删除多层目录只能删除最底层的比如这个的newDirb目录，外newDira没有删掉
    }

    @Test
    public void demo3() {
        File file = new File("E:\\other\\study\\学习sp\\实用篇");
        printFile(file);
    }
    public  static void printFile(File file) {
//        //获取当前目录下的文件以及文件夹的名称。
//        File[] files = file.listFiles();
//        for (File a:files) {
//
//            if (a.isFile()) {
//                System.out.println( a.getName());
//            }else {
//                printFile(a);
//            }
//        }

//        //下面的只获取一层，上面是里面全部获取
//        String[] names = file.list();
//        for(String name : names){
//            System.out.println(name);
//        }
//        //获取当前目录下的文件以及文件夹对象，只要拿到了文件对象，那么就可以获取更多信息
//        File[] files = file.listFiles(); //listFiles指定的必须是目录。否则容易引发返回数组为null，出现NullPointerException异常
//        for (File fi : files) {
//            System.out.println(fi);
//        }

//        递归全部
        //1、判断传入的是否是目录
        if(!file.isDirectory()){
            //不是目录直接退出
            return;
        }
        //已经确保了传入的file是目录
        File[] files = file.listFiles();
        //遍历files
        for (File f: files) {
            //如果该目录下文件还是个文件夹就再进行递归遍历其子目录
            if(f.isDirectory()){
                //递归
                printFile(f);
            }else {
                //如果该目录下文件是个文件，则打印对应的名字
                System.out.println(f.getName());
            }

        }
    }


    public static void demo2(){
         //从d盘下的a.txt文件拷贝到另个盘下
        try {
            File file1 = new File("D:\\workspace\\a.txt");//这是源文件
            long flen=file1.length();
            System.out.println("源文件的大小是"+flen+"字节");
            FileInputStream fis = new FileInputStream(file1);
            File file2 = new File("D:\\workspace\\b.txt");//这是复制到的地方
            FileOutputStream fos = new FileOutputStream(file2);
            byte[] bytes = new byte[1024]; //这是1兆1兆传
            int len = 0;
            long readSize=0;
            while ((len = fis.read(bytes)) != -1) {//-1就是最后一个结束
                fos.write(bytes,0,len); //比如一个文件是1024*8+244，那么len就是244
                fos.flush();//强制输出，推送数据
                readSize+=len;
                if (readSize== flen) {
                    break;
                }
            }
            System.out.println("读的大小"+readSize+"字节");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public static void demo1() {
        File file = new File("E:\\1.txt");
        File file1 = new File("E:\\222.txt");
        try {
            FileInputStream fis = new FileInputStream(file);
            FileOutputStream fos = new FileOutputStream(file1);
            BufferedInputStream bis = new BufferedInputStream(fis);
            byte[] bytes = new byte[1024];
            while (bis.read(bytes) != -1) {
                fos.write(bytes);
                fos.flush();
                System.out.println("aaaa");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}

```

### FileOutputStream

```java
FileOutputStream outputStream = new FileOutputStream("abc.txt");
```

这行代码做了下面的事情
1、调用系统功能去创建文件【输出流对象才会自动创建】
2、创建outputStream对象
3、把foutputStream对象指向这个文件

创建输出流对象的时候，系统会自动去对应位置创建对应文件，而创建输出流对象的时候，文件不存在则会报 FileNotFoundException 异常，也就是系统找不到指定的文件异常。

当你创建一个流对象时，必须直接或者间接传入一个文件路径。比如现在我们创建一个 FileOutputStream 流对象，在该路径下，如果没有这个文件，会创建该文件。如果有这个文件，会清空这个文件的数据

**为什么是输入流呢**

1、因为流是相对于内存来说的，现在 abc.txt 就是要保存到磁盘里面的文本，就是说从内存---->磁盘，那必须是输出流，用 FileWrite 和 FileOutputStream 都可以

2、传入路径时候是它的一种构造方法，不会继续写到文本中，所以用它的另外的构造函数即可解决这个问题。

- public FileOutputStream(File file, boolean append) 一般不需要用这个，因为文件创建，输出流自动会帮我们生成，没必要多此一举暂时

- public FileOutputStream(String name, boolean append) true 表示追加数据

Windows 系统里，每行结尾是 回车+换行 ，即\r\n；
Unix 系统里，每行结尾只有 换行 ，即\n；
Mac 系统里，每行结尾是 回车 ，即\r。从 Mac OS X 开始与 Linux 统一。

### FileInputStream

流进内存的，输入流

1、 **FileInputStream(File file)**： 通过打开与实际文件的连接来创建一个 FileInputStream ，该文件由文件系统中的 File 对象 file 命名。
2、 **FileInputStream(String name)**： 通过打开与实际文件的连接来创建一个 FileInputStream ，该文件由文件系统中的路径名 name 命名。

当你创建一个输入流对象时，必须传一个文件路径。该路径下，如果没有该文件,会抛出 FileNotFoundException

使用字节数组读取：read(byte[] b) 效率更高

```java
            int len = 0 ;
            byte[] bys = new byte[1024];
            while ((len = inputStream.read(bys)) != -1) {
                System.out.println(new String(bys,0,len));//len输出有效的字节数
```

### Reader

字符输入流的所有类的超类 输入流

### FileWriter

写出字符到文件的便利类 输出流

//关闭资源时,与 FileOutputStream 不同。 如果不关闭,数据只是保存到缓冲区，并未保存到文件。

// fw.close();

关闭 close 和刷新 flush
因为内置缓冲区的原因，如果不关闭输出流，无法写出字符到文件中。但是关闭的流对象，是无法继续写出数据的。如果我们既想写出数据，又想继续使用流，就需要 flush 方法了。

flush ：刷新缓冲区，流对象可以继续使用。清空缓冲区的数据流
close:先刷新缓冲区，然后通知系统释放资源。流对象不可以再被使用了。

### 缓冲流

1、使用了底层流对象从具体设备上获取数据，并将数据存储到缓冲区的数组内。
2、通过缓冲区的 read()方法从缓冲区获取具体的字符数据，这样就提高了效率。
3、如果用 read 方法读取字符数据，并存储到另一个容器中，直到读取到了换行符时，将另一个容器临时存储的数据转成字符串返回，就形成了 readLine()功能。

也就是说在创建流对象时，会创建一个内置的默认大小的缓冲区数组，通过缓冲区读写，减少系统 IO 次数，从而提高读写的效率。

缓冲书写格式为 BufferedXxx，按照数据类型分类：

**字节缓冲流**：BufferedInputStream，BufferedOutputStream
**字符缓冲流**：BufferedReader，BufferedWriter
构造方法
**public BufferedInputStream(InputStream in)** ：创建一个新的缓冲输入流，注意参数类型为 InputStream。
**public BufferedOutputStream(OutputStream out)**： 创建一个新的缓冲输出流，注意参数类型为 OutputStream。

**BufferedReader：public String readLine()**: 读一行数据。 读取到最后返回 null,就这个特别一点，判断条件都需要修改了
**BufferedWriter：public void newLine()**: 换行,由系统属性定义符号。

### 转换流

简单一点的说就是：

编码:字符(能看懂的)–字节(看不懂的)

解码:字节(看不懂的)–>字符(能看懂的)

```java
String(byte[] bytes, String charsetName):通过指定的字符集解码字节数组
byte[] getBytes(String charsetName):使用指定的字符集合把字符串编码为字节数组

编码:把看得懂的变成看不懂的
String -- byte[]

解码:把看不懂的变成看得懂的
byte[] -- String
```

字符集 Charset：也叫编码表。是一个系统支持的所有字符的集合，包括各国家文字、标点符号、图形符号、数字等。

在 java 开发工具 IDEA 中，使用 FileReader 读取项目中的文本文件。由于 IDEA 的设置，都是默认的 UTF-8 编码，所以没有任何问题。但是，当读取 Windows 系统中创建的文本文件时，由于 Windows 系统的默认是 GBK 编码，就会出现乱码。

转换流 java.io.InputStreamReader，是 Reader 的子类，从字面意思可以看出它是从字节流到字符流的桥梁。它读取字节，并使用指定的字符集将其解码为字符。它的字符集可以由名称指定，也可以接受平台的默认字符集。

构造方法
**InputStreamReader(InputStream in)**: 创建一个使用默认字符集的字符流。
**InputStreamReader(InputStream in, String charsetName)**: 创建一个指定字符集的字符流。

构造代码如下：

```java
InputStreamReader isr = new InputStreamReader(new FileInputStream("in.txt"));
InputStreamReader isr2 = new InputStreamReader(new FileInputStream("in.txt") , "GBK");
```

**OutputStreamWriter**同理

#### 案例 1

```java
package com.nwa;

import org.junit.Test;


import java.io.*;

/**
 * @Author Lucky友人a
 * @Date 2023/8/10 -10:34
 */
public class FileDemo {
    @Test
    public void fun1() throws IOException {
        File f = new File("C:\\Users\\FF\\Desktop\\1.txt");  //就算文件1.txt不存在也不影响file对象的创建
        if (!f.exists()) {
                System.out.println("是否创建:"+f.createNewFile()); // true 如果没有文件则创建并返回true
        }
        System.out.println("是否创建:"+f.createNewFile());  //已经存在，所以就false了
        System.out.println("文件绝对路径:"+f.getAbsolutePath());//文件绝对路径:C:\Users\FF\Desktop\1.txt
        System.out.println("文件构造路径:"+f.getPath());        //文件构造路径:C:\Users\FF\Desktop\1.txt
        System.out.println("文件名称:"+f.getName());          //文件名称:1.txt
        System.out.println("文件长度:"+f.length()+"字节");
        // 判断是文件还是目录
        System.out.println("文件:"+f.isFile());
        System.out.println("目录:"+f.isDirectory());
        //一个路径下全部文件名,先将字符串转目录
//        String path = "D:\\workspace";
//        File file = new File(path);
//        printFile(file);
    }
//结果1   传进的file不一样结果不一样，如果是绝对位置那么构造啥的都是绝对的
//    是否创建:false
//    文件绝对路径:C:\Users\FF\Desktop\1.txt
//    文件构造路径:C:\Users\FF\Desktop\1.txt
//    文件名称:1.txt
//    文件长度:0字节
//    文件:true
//    目录:false


//结果2 如果是直接1.txt则会相对这个项目来创建这个文件
//    是否创建:true
//    是否创建:false
//    文件绝对路径:E:\LuckyWorckSpace\lucky_api\1.txt
//    文件构造路径:1.txt
//    文件名称:1.txt
//    文件长度:0字节
//    文件:true
//    目录:false
    @Test
    public void testDemo2() {   //目录的创建等,使用相对这个项目下的目录来测试了
        // 目录的创建
        File f2= new File("newDira");
//        System.out.println("是否存在:"+f2.exists());// false
//        System.out.println("是否创建:"+f2.mkdir());	//  这个是创建的意思，并返回true
//        System.out.println("是否存在:"+f2.exists());// true
        // 创建多级目录
//        File f3= new File("newDira\\newDirb");
//        System.out.println(f3.mkdir());// false，没有加s指南创建单层的目录
        File f4= new File("newDira\\newDirb");
  //      System.out.println(f4.mkdirs());// true,可以创建多级别的目录

        // 文件和目录的删除  delete方法，如果此File表示目录，则目录必须为空才能删除。
      //  System.out.println(f2.delete());// true
   //     System.out.println(f4.delete());// false如果是删除多层目录只能删除最底层的比如这个的newDirb目录，外newDira没有删掉
    }

    @Test
    public void demo3() {
        File file = new File("E:\\other\\study\\学习sp\\实用篇");
        printFile(file);
    }
    public  static void printFile(File file) {
//        //获取当前目录下的文件以及文件夹的名称。
//        File[] files = file.listFiles();
//        for (File a:files) {
//
//            if (a.isFile()) {
//                System.out.println( a.getName());
//            }else {
//                printFile(a);
//            }
//        }

//        //下面的只获取一层，上面是里面全部获取
//        String[] names = file.list();
//        for(String name : names){
//            System.out.println(name);
//        }
//        //获取当前目录下的文件以及文件夹对象，只要拿到了文件对象，那么就可以获取更多信息
//        File[] files = file.listFiles(); //listFiles指定的必须是目录。否则容易引发返回数组为null，出现NullPointerException异常
//        for (File fi : files) {
//            System.out.println(fi);
//        }

//        递归全部
        //1、判断传入的是否是目录
        if(!file.isDirectory()){
            //不是目录直接退出
            return;
        }
        //已经确保了传入的file是目录
        File[] files = file.listFiles();
        //遍历files
        for (File f: files) {
            //如果该目录下文件还是个文件夹就再进行递归遍历其子目录
            if(f.isDirectory()){
                //递归
                printFile(f);
            }else {
                //如果该目录下文件是个文件，则打印对应的名字
                System.out.println(f.getName());
            }

        }
    }


    public static void demo2(){
         //从d盘下的a.txt文件拷贝到另个盘下
        try {
            File file1 = new File("D:\\workspace\\a.txt");//这是源文件
            long flen=file1.length();
            System.out.println("源文件的大小是"+flen+"字节");
            FileInputStream fis = new FileInputStream(file1);
            File file2 = new File("D:\\workspace\\b.txt");//这是复制到的地方
            FileOutputStream fos = new FileOutputStream(file2);
            byte[] bytes = new byte[1024]; //这是1兆1兆传
            int len = 0;
            long readSize=0;
            while ((len = fis.read(bytes)) != -1) {//-1就是最后一个结束
                fos.write(bytes,0,len); //比如一个文件是1024*8+244，那么len就是244
                fos.flush();//强制输出，推送数据
                readSize+=len;
                if (readSize== flen) {
                    break;
                }
            }
            System.out.println("读的大小"+readSize+"字节");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    public static void demo1() {
        File file = new File("E:\\1.txt");
        File file1 = new File("E:\\222.txt");
        try {
            FileInputStream fis = new FileInputStream(file);
            FileOutputStream fos = new FileOutputStream(file1);
            BufferedInputStream bis = new BufferedInputStream(fis);
            byte[] bytes = new byte[1024];
            while (bis.read(bytes) != -1) {
                fos.write(bytes);
                fos.flush();
                System.out.println("aaaa");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}

```

#### 案例 2

```java
package com.nwa;

import org.junit.Test;
import org.omg.CORBA.PUBLIC_MEMBER;

import java.io.*;

/**
 * @Author Lucky友人a
 * @Date 2023/8/10 -14:14
 */
public class IoDemo {
    @Test
    public void demo1() throws IOException {
        //public void write(int b)
        //public void write(byte[] b)
        //public void write(byte[] b,int off,int len)  //从`off`索引开始，`len`个字节
        //构造方法中加入true即可追加数据，否则就是清空了
        FileOutputStream fos = new FileOutputStream("a.txt", true);//输出流，如果没有文件则帮忙创，有的话清空里面数据
        fos.write(97);//对于内存里流向本地磁盘，所以是输出流，而且会帮忙创建文件，并写入数据,所以才会清空
        fos.write(("我要吃汉堡").getBytes());
        fos.close();
        //a我要吃汉堡    97字节对于的是小写的a，字符串这个是转字节了
        FileWriter fileWriter = new FileWriter("b.txt");
        fileWriter.write("ss");//这个可以直接写入
        fileWriter.close();

        //写出指定长度字节数组：write(byte[] b, int off, int len) ,每次写出从off索引开始，len个字节
        // 使用文件名称创建流对象
        FileOutputStream fos2 = new FileOutputStream("a2.txt");
        // 字符串转换为字节数组
        byte[] b = "abcde".getBytes();
        // 写出从索引2开始，2个字节。索引2是c，两个字节，也就是cd。
        fos2.write(b, 2, 2);
        // 关闭资源
        fos2.close();
    }

    @Test
    public void delTxt() {
        new File("a.txt").delete();
    }

    @Test
    public void arrDemo() throws IOException {
        // 使用文件名称创建流对象
        FileOutputStream fos = new FileOutputStream("fos.txt");
        // 定义字节数组
        byte[] words = {97, 98, 99, 100, 101};
        // 遍历数组
        for (int i = 0; i < words.length; i++) {
            // 写出一个字节
            fos.write(words[i]);
            // 写出一个换行, 换行符号转成数组写出
            fos.write("\r\n".getBytes());
        }
        // 关闭资源
        fos.close();
    }

    @Test
    public void inputS() throws IOException {
        // 使用File对象创建流对象
        File file = new File("a2.txt");//这个文本中只有cd2个字符
        FileInputStream fis = new FileInputStream(file);//我把a.txt删了它就找不到了报错
//        int read = fis.read();
//        System.out.println((char)read);//不加char的话会转数字那种99---c
//        int read1 = fis.read();//继续读取下一个字符
//        System.out.println((char)read1);
//        int read2 = fis.read();//如果是最后一个字符，它会返回-1,通过-1知道到底了
//        System.out.println(read2);
//        fis.close();
        //改进版1
//        int b;
//        while ((b = fis.read()) != -1) {
//            System.out.println((char)b);
//        }
//        fis.close();
        //改进版2将文本里的值变成的abced，一次读取2个，结果出现了abcded
        //1 a  b  2  c  d  3e  d  因为没替换就流着了，要解决一下改进3
        // 定义变量，作为有效个数
//        int len;
//        // 定义字节数组，作为装字节数据的容器
//        byte[] b = new byte[2];
//        // 循环读取
//        while (( len= fis.read(b))!=-1) {
//            // 每次读取后,把数组变成字符串打印
//            System.out.println(new String(b));
//        }
        // 关闭资源
        //  fis.close();
//        改进3
        int len;
        // 定义字节数组，作为装字节数据的容器
        byte[] b = new byte[2];
        // 循环读取
        while ((len = fis.read(b)) != -1) {
            // 每次读取后,把数组变成字符串打印
            System.out.println(new String(b, 0, len));//len是每次读取有效的个数
        }
        // 关闭资源
        fis.close();
    }

    @Test
    public void copyPic() throws IOException {//将本地图片复制到项目下面
        FileInputStream fis = new FileInputStream("C:\\Users\\FF\\Desktop\\6.png");//输入流到内存
        FileOutputStream fos = new FileOutputStream("1.png");//内存输出到项目下面
        byte[] b = new byte[1024];
        int len;
        while ((len = fis.read(b)) != -1) {
            fos.write(b, 0, len);
        }
        fos.close();
        fis.close();
    }

    @Test
    public void readI() throws IOException {
        FileInputStream fis = new FileInputStream("1.txt");//输入流。文本中是中文你是大聪明，正常字节流去解析会乱码
        int len;
        byte[] bytes = new byte[1024];
        while ((len = fis.read(bytes)) != -1) {
            System.out.println((char) len);  //乱码
            System.out.print(new String(bytes, 0, len));//String里自带了utf8解码所以可以。不过比较麻烦直接字符流解决
        }
        //下面用字符流
        FileReader fr = new FileReader("1.txt");
        int len2;
        while ((len2 = fr.read()) != -1) {
            System.out.print((char) len2);
        }
    }

    @Test
    public void copyText() throws  IOException{
        FileWriter fileWriter = new FileWriter("66.md");
        FileReader fileReader = new FileReader("E:\\后端代码接收解析.md");
        char[] c=new char[1024];
        int len;
        while ((len = fileReader.read(c)) != -1) {
            fileWriter.write(c, 0, len);

        }
        fileWriter.flush();//清空缓冲区的数据流
        fileWriter.close();
        fileReader.close();
    }
    //下面开始测试缓存流的速度效率,1是正常，2是加入缓存

    @Test
    public void Buff1() throws  IOException{
        long start = System.currentTimeMillis();
        FileOutputStream fos = new FileOutputStream("ps2015.zip");
        FileInputStream fis = new FileInputStream("E:\\other\\装机必备软件\\必备软件\\ps2015.zip");
        byte[] bytes = new byte[1024];
        int len;
        while ((len = fis.read(bytes)) != -1) {
            fos.write(bytes, 0, len);
        }
        fis.close();
        fos.close();
        // 记录结束时间
        long end = System.currentTimeMillis();
        System.out.println("普通流复制时间:"+(end - start)+" 毫秒");//33000
    }
    @Test
    public void Buff2() throws  IOException{
        long start = System.currentTimeMillis();
        BufferedOutputStream fos =new   BufferedOutputStream(new FileOutputStream("ps2015.zip")) ;
        BufferedInputStream fis =new BufferedInputStream(new FileInputStream("E:\\other\\装机必备软件\\必备软件\\ps2015.zip")) ;
        byte[] bytes = new byte[1024];
        int len;
        while ((len = fis.read(bytes)) != -1) {
            fos.write(bytes, 0, len);
        }
        fis.close();
        fos.close();
        // 记录结束时间
        long end = System.currentTimeMillis();
        System.out.println("缓冲流复制时间:"+(end - start)+" 毫秒");//缓冲流复制时间:4314 毫秒
    }

    @Test
    public void BuffRead() throws IOException {
        BufferedReader br = new BufferedReader(new FileReader("b.txt"));//       两个黄鹂鸣翠柳，一行白鹭上青天。 窗含西岭千秋雪，门泊东吴万里船。
        System.out.println(br.readLine()); // 读取一行的
        String len=null;
        while ((len = br.readLine()) != null) {
            System.out.println((len));
        }
        br.close();
    }

    @Test
    public void transform() throws IOException{
        // 定义文件路径,文件为gbk编码
        String FileName = "C:\\Users\\FF\\Desktop\\1.txt";
        // 创建流对象,默认UTF8编码
        InputStreamReader isr = new InputStreamReader(new FileInputStream(FileName));
        // 创建流对象,指定GBK编码
        InputStreamReader isr2 = new InputStreamReader(new FileInputStream(FileName) , "GBK");
        // 定义变量,保存字符
        int read;
        // 使用默认编码字符流读取,乱码
        while ((read = isr.read()) != -1) {
            System.out.print((char)read);
        }
        isr.close();

        // 使用指定编码字符流读取,正常解析
        while ((read = isr2.read()) != -1) {
            System.out.print((char)read); //如果这个txt默认是ANSI编码就需要GBK就不会乱码，如果本身就utf就不需要编码了
        }
        isr2.close();
    }


}

```

## 异常处理

异常处理是一种重要的编程概念，用于处理程序执行过程中可能出现的错误或异常情况

必须捕获的异常，包括`Exception`及其子类，但不包括`RuntimeException`及其子类，这种类型的异常称为Checked Exception

不需要捕获的异常，包括`Error`及其子类，`RuntimeException`及其子类

- 数值类型的格式错误------------NumberFormatException
- 要打开的文件不存在------------FileNotFoundException
- 空指针------------NullPointerException------------对某个`null`的对象调用方法或字段
- 数组索引越界------------ArrayIndexOutOfBoundsException
- 数据库表不存在
- 向方法传递了一个不合法或不正确的参数
- 无法加载某个Class------------NoClassDefFoundError
- 栈溢出------------StackOverflowError

**错误：** 错误不是异常，而是脱离程序员控制的问题，错误在代码中通常被忽略。例如，当栈溢出时，一个错误就发生了，它们在编译也检查不到的

所有的异常类是从 java.lang.Exception 类继承的子类。

Exception 类是 Throwable 类的子类。除了Exception类外，Throwable还有一个子类Error

异常类有两个主要的子类：IOException 类和 RuntimeException 类

![](https://imgs.luckynwa.top/profile/mdS/java7.png)

### 捕获异常

如果不捕获异常，就需要抛出异常，直到有人捕获或者最高一级

使用 try 和 catch 关键字可以捕获异常。try/catch 代码块放在异常可能发生的地方。ctrl+alt+t

throws 是写在类那里--------------------throw 是直接在方法里面抛出

try/catch代码块中的代码称为保护代码，使用 try/catch 的语法如下：

```java
try
{
   // 程序代码
}catch(ExceptionName e1)
{
   //Catch 块
}

```

**throw** 关键字用于在代码中抛出异常，而 **throws** 关键字用于在方法声明中指定可能会抛出的异常类型

当方法内部throws抛出指定类型的异常时，该异常会被传递给调用该方法的代码，并在该代码中处理异常。

```java
public class Demo1 {
    public static void main(String[] args) {
//        Scanner scanner = new Scanner(System.in);
//        scanner = null;
//        scanner.next();                                               //空指针java.lang.NullPointerException

//        int[] a = new int[]{1, 2};
//        System.out.println(a[2]);                                     //数组索引越界java.lang.ArrayIndexOutOfBoundsException

//        try {
//            System.out.println(11 / 0);                               //0不能为除数java.lang.ArithmeticException异常
//        } catch (ArithmeticException e) {
//            System.out.println("捕获到了0不能为除数的异常");//这里抛出了运行时异常
//        } catch (Exception e) {//最大异常,上面捕获了下面就捕获了
//            throw new RuntimeException(e); //这里抛出了运行时异常
//        } finally {
//            System.out.println("这里必运行,一般用来关闭");
//        }

//        checkNumber(-1);//非法参数异常IllegalArgumentException
        try {
            //  readFile("D:\\1.txt");//去d盘新建1.txt,内容随便写点
            readFile("D:\\1.txt");//没找到就会有异常
            System.out.println("找到了");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    public static void checkNumber(int num) {
        if (num < 0) {
            throw new IllegalArgumentException("Number must be positive");//当代码执行到某个条件下无法继续正常执行时，可以使用 throw 关键字抛出异常，以告知调用者当前代码的执行状态
        }
    }

    public static void readFile(String filePath) throws IOException {// 包含了文件没找到异常，如果还有其他异常,隔开继续写
        BufferedReader reader = new BufferedReader(new FileReader(filePath));
        String line = reader.readLine();
        while (line != null) {
            System.out.println(line);
            line = reader.readLine();
        }
        reader.close();
    }
}

```

JDK7 之后，Java 新增的 **try-with-resource** 语法结构，旨在自动管理资源，确保资源在使用后能够及时关闭，避免资源泄露 。

```java
try (resource declaration) {
  // 使用的资源
} catch (ExceptionType e1) {
  // 异常块
}
```

```java
public class Demo1 {
    public static void main(String[] args) {
        String line;
        try (BufferedReader br = new BufferedReader(new FileReader("test.txt"))) {//如果多个;隔开继续new
            while ((line = br.readLine()) != null) {
                System.out.println("Line =>" + line);
            }
        } catch (IOException e) {
            System.out.println("IOException in try block =>" + e.getMessage());
        }
    }
}
```

结果：IOException in try block =>test.txt (系统找不到指定的文件。)

```java
public class Demo1 {
    public static void main(String[] args) {
        BufferedReader br = null;
        String line;
        try {
            System.out.println("Entering try block");
            br = new BufferedReader(new FileReader("test.txt"));
            while ((line = br.readLine()) != null) {
                System.out.println("Line =>" + line);
            }
        } catch (IOException e) {
            System.out.println("IOException in try block =>" + e.getMessage());
        } finally {//比较繁琐
            System.out.println("Entering finally block");
            try {
                if (br != null) {
                    br.close();
                }
            } catch (IOException e) {
                System.out.println("IOException in finally block =>" + e.getMessage());
            }
        }
    }
}
```

### 全局异常处理器

在应用程序中，当抛出异常时，如果没有特定的异常处理器来处理该异常，就会尝试使用全局异常处理器来处理

```java
@RestControllerAdvice
public class RRExceptionHandler {
	private Logger logger = LoggerFactory.getLogger(getClass());
	/**
	 * 处理自定义异常
	 */
	@ExceptionHandler(RRException.class)
	public R handleRRException(RRException e){
		R r = new R();
		r.put("code", e.getCode());
		r.put("msg", e.getMessage());

		return r;
	}
	@ExceptionHandler(NoHandlerFoundException.class)
	public R handlerNoFoundException(Exception e) {
		logger.error(e.getMessage(), e);
		return R.error(404, "路径不存在，请检查路径是否正确");
	}
	@ExceptionHandler(DuplicateKeyException.class)
	public R handleDuplicateKeyException(DuplicateKeyException e){
		logger.error(e.getMessage(), e);
		return R.error("数据库中已存在该记录");
	}
	@ExceptionHandler(AuthorizationException.class)
	public R handleAuthorizationException(AuthorizationException e){
		logger.error(e.getMessage(), e);
		return R.error("没有权限，请联系管理员授权");
	}
	@ExceptionHandler(Exception.class)
	public R handleException(Exception e){
		logger.error(e.getMessage(), e);
		return R.error();
	}
}
```

自定义异常类

```java
public class RRException extends RuntimeException {
	private static final long serialVersionUID = 1L;
    private String msg;
    private int code = 500;

    public RRException(String msg) {
		super(msg);
		this.msg = msg;
	}
	public RRException(String msg, Throwable e) {
		super(msg, e);
		this.msg = msg;
	}
	public RRException(String msg, int code) {
		super(msg);
		this.msg = msg;
		this.code = code;
	}
	public RRException(String msg, int code, Throwable e) {
		super(msg, e);
		this.msg = msg;
		this.code = code;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
}
```

## API

### Random（常用）

获取随机数

```java
public class Demo1 {
    public static void main(String[] args) {
        Random random = new Random(); //new出这个对象
        int randomValue1 = random.nextInt(2);  //调用这个对象的方法 范围是0~1的整数
        System.out.println(randomValue1);
        int randomValue2 = random.nextInt(90) + 10;//范围是10-99的整数
        System.out.println(randomValue2);
        int randomValue3 = random.nextInt(1000) - 500;//范围-500~500,500取不到
        System.out.println(randomValue3);
    }
}
```

### Scanner

获取控制台输入的值

```java
public class Demo1 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入名称:");
        String name = scanner.nextLine();
        System.out.println("请输入密码:");
        String pwd = scanner.nextLine();
        System.out.println(name + "--左名称右密码--" + pwd);
        System.out.println("请输入整数n:");
        int i = 0;
        if (scanner.hasNextInt()) {                        //加个判断防止异常，还有hasNextDouble等
            i = scanner.nextInt();                         // 判断输入的是否是整数
            System.out.println("整数数据：" + i);
        } else {
            System.out.println("输入的不是整数！");           // 输入错误的信息
        }
        System.out.println("i为" + i);
        scanner.close();                                   //用完就关闭
    }
}

```

### Date

java.util 包提供了 Date 类来封装当前的日期和时间。 Date 类提供两个构造函数来实例化 Date 对象

```java
public class Demo1 {
    public static void main(String[] args) {
        Date date = new Date();
        // 参考https://www.runoob.com/java/java-date-time.html
        System.out.printf("全部日期和时间信息：%tc%n", date);
        System.out.printf("年-月-日格式：%tF%n", date);
        System.out.printf("月/日/年格式：%tD%n", date);
        System.out.printf("HH:MM:SS PM格式（12时制）：%tr%n", date);
        System.out.printf("HH:MM:SS格式（24时制）：%tT%n", date);
        System.out.printf("HH:MM格式（24时制）：%tR%n", date);
        System.out.printf("%tY-%tm-%td %tH:%tM:%tS %tZ%n", date, date, date, date, date, date, date);
        System.out.println("-----------------------------------");
        Date dNow = new Date();
        //yyyy 是完整的公元年，MM 是月份，dd 是日期HH:mm:ss 是时、分、秒 SSS毫秒
        SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss:SSS");
        String format = ft.format(dNow);
        System.out.println("当前时间为: " + format);//当前时间为: 2024-06-12 04:59:08:803
    }
}
```

### Calendar

Calendar类是一个抽象类，在实际使用时实现特定的子类的对象，创建对象的过程对程序员来说是透明的，只需要使用getInstance方法创建即可

我们如何才能设置和获取日期数据的特定部分呢，比如说小时，日，或者分钟? 我们又如何在日期的这些部分加上或者减去值呢? 答案是使用Calendar 类

```java
public class Demo1 {
    public static void main(String[] args) {
        String months[] = {
                "Jan", "Feb", "Mar", "Apr",
                "May", "Jun", "Jul", "Aug",
                "Sep", "Oct", "Nov", "Dec"};

        int year;
        // 初始化 Gregorian 日历
        // 使用当前时间和日期
        // 默认为本地时间和时区
        GregorianCalendar gcalendar = new GregorianCalendar();
        // 显示当前时间和日期信息
        System.out.print("Date: ");
        System.out.print(months[gcalendar.get(Calendar.MONTH)]);
        System.out.print(" " + gcalendar.get(Calendar.DATE) + " ");
        System.out.println(year = gcalendar.get(Calendar.YEAR));
        System.out.print("Time: ");
        System.out.print(gcalendar.get(Calendar.HOUR) + ":");
        System.out.print(gcalendar.get(Calendar.MINUTE) + ":");
        System.out.println(gcalendar.get(Calendar.SECOND));

        // 测试当前年份是否为闰年
        if (gcalendar.isLeapYear(year)) {
            System.out.println("当前年份是闰年");
        } else {
            System.out.println("当前年份不是闰年");
        }
    }
}
```

### Math

Java 的 Math 包含了用于执行基本数学运算的属性和方法，如初等指数、对数、平方根和三角函数

Math 的方法都被定义为 static 形式，通过 Math 类可以在主函数中直接调用

```java
public class Test {
    public static void main (String []args)
    {
            System.out.println("返回两个参数中的最大值：" + Math.max(1, 2));
            System.out.println("返回两个参数中的最小值：" + Math.min(0, 3));
            System.out.println("60度的正切值：" + Math.tan(Math.PI / 3));
            System.out.println("1的反正切值： " + Math.atan(1));
            System.out.println("π/2的角度值：" + Math.toDegrees(Math.PI / 2));
            System.out.println(Math.PI);
    }
}
```

### String

String 类是不可改变的final修饰，所以你一旦创建了 String 对象，那它的值就无法改变

如果需要对字符串做很多修改，那么应该选择使用 StringBuffer & StringBuilder 类

String 创建的字符串存储在公共池中，而 new 创建的字符串对象在堆上

```java
public class Demo1 {
    public static void main(String[] args) {
        String s1 = "Runoob";                       // String 直接创建
        String s2 = "Runoob";                       // String 直接创建
        String s3 = s1;                             // 相同引用
        String s4 = new String("Runoob");    // String 对象创建
        String s5 = new String("Runoob");    // String 对象创建
        System.out.println(s1 == s2);
        System.out.println(s1 == s3);           //s1、s2、s3都是直接创建，都指向同一个公共池里的值和对象
        System.out.println(s1.equals(s3));      //true    值肯定相等、并且都在公共池中
        System.out.println(s4 == s5);           //false   这个比较是对象引用，2个不同对象在不同堆中，值相同
        System.out.println(s4.equals(s5));      //true    这个比较的是值
    }
}
```

![](https://imgs.luckynwa.top/profile/mdS/java4.png)

```java
public class Demo1 {
    public static void main(String[] args) {
        String str = "Hello World";
        System.out.println(str.length());                          //结果11，返回字符串的长度空格和！都算，用于不确定字符串长度时候
        System.out.println(str.charAt(1));                         //e，返回字符串1的位置，从0开始，长度是str的长度-1，可用于验证码的实现
        System.out.println(str.indexOf("h"));                      //-1，查找这个字符，没查到则返回-1
        System.out.println(str.indexOf("o"));                      //4，查找第一个，并返回索引值
        System.out.println(str.substring(4));            //o World,字符串的截取 从下标4开始
        System.out.println(str.substring(4, str.length() - 2));    //o Wor,[4,9)参数1是开始位置 参数2是结束，左闭右开
        System.out.println(str.toLowerCase());                     //全部转小写
        System.out.println(str.toUpperCase());                     //全部转大写
        String[] split = str.split(" ");
        //Hello
        //World
        //根据空格切割
        for (int i = 0; i < split.length; i++) {
            System.out.println(split[i]);
        }
        System.out.println("-----------------------------------");
        String str1 = "Hello1 World2";
        System.out.println(str1.indexOf("1", 4));    //5，查的必须是字符串类型，第二次参数是开始位置，这是正向搜、4，5刚好就是1返回5
        System.out.println(str1.lastIndexOf("l"));            //10,查找最后一个l，并返回它的索引值
        System.out.println(str1.lastIndexOf("l", 11));//10,11是d，然后开始反向搜到l直接返回索引
        System.out.println("-----------------------------------");
        System.out.println("abc".compareTo("abcde"));              //-2，返回整型，比较对应字符的大小(ASCII码顺序)
        System.out.println("abc".compareTo("abc"));                //0，相同返回0
        System.out.println("12789".compareTo("123"));              //4,回字符串长度,比较7和3返回4
        System.out.println("abc".equals("a"));                     //false，判断2个字符串是否相等，需要完全一样
        System.out.println("abc".equals("abc"));                   //True
        System.out.println("abc".equalsIgnoreCase("ABC"));   //true,忽略大小写
        System.out.println("abc".concat("derfg"));                   //abcderfg 字符串拼接，用+也可以
        System.out.println("nnnwa".replace("n", "g"));  //gggwa,替换所有n，第一个参数是需要被替换的，第二个是替换的
        System.out.printf("浮点型变量的值为 " +
                "%f, 整型变量的值为 " +
                " %d, 字符串变量的值为 " +
                "is %s", 1.12f, 16, "LuckyNwa");
        System.out.println("nwa".contains("nw"));                        //true，包含它返回布尔值，顺序有影响
        System.out.println("nwa".endsWith("a"));                         //true，包含它返回布尔值，测试是否以字符a结尾
        System.out.println("  hello world  ".trim());                    //hello world,去除前后空格，不去中间

    }
}

```

https://www.runoob.com/java/java-string.html 参考这

**总结**

length方法使用地方特别多，比如数组遍历时候就需要，字符串同，不知道长度可以直接用这方法获取

s="aascsaxaca";它的下标就是0到s.length()-1

indexOf可以用来查询是否存在，返回值为-1则不存在，也可以查询这个字符串第一次出现的地方

charAt方法可用于验证码的实现，把验证码需要的字符串存在一个变量里，通过charAt(new Random().nextInt(codeBox.length()))来获取随机字符

trim方法去首尾空格，用于登录时候输入有空格的把空格直接去掉，用的范围也挺广 以及split用的很多,可以根据空格，-等分割

isEmpty判断是否为空

### StringBuffer 和 StringBuilder

和 String 类不同的是，StringBuffer 和 StringBuilder 类的对象能够被多次的修改，并且不产生新的未使用对象

StringBuilder 类在 Java 5 中被提出，StringBuilder不是线程安全，StringBuffer 线程安全

由于 StringBuilder 相较于 StringBuffer 有速度优势，所以多数情况下建议使用 StringBuilder 类

```java
public class Demo1 {
    public static void main(String[] args) {
        StringBuilder sb;
        sb = new StringBuilder(10);
        sb.append("Runoob..");
        System.out.println(sb);
        sb.append("!");
        System.out.println(sb);
        sb.insert(8, "Java");
        System.out.println(sb);
        sb.delete(5, 8);
        System.out.println(sb);
        StringBuilder luckyNwa = new StringBuilder("LuckyNwa");
        luckyNwa.append("你好啊");
        System.out.println(luckyNwa);
    }
}
```

![](https://imgs.luckynwa.top/profile/mdS/java5.png)

## 其他

### 转义序列

前面有反斜杠（\）的字符代表转义字符，它对编译器来说是有特殊含义的

列表展示了Java的转义序列：

![](https://imgs.luckynwa.top/profile/mdS/java3.png)
