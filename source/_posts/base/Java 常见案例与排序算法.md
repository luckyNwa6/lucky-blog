---
title: Java 常见案例与排序算法
cover: https://cloud.luckynwa.top/profile/yys/428.webp
description: 古人学问无遗力，少壮工夫老始成
categories: 编程基础
tags: Algorithm
comments: true
abbrlink: base1
summary: >-
  本文整理了Java入门基础案例与经典排序算法的实现。入门部分包括九九乘法表的四种输出形式、星星图案打印、完数判断、斐波那契数列、水仙花数、阶乘计算、回文数判断以及最大最小值查找等内容。算法部分详细介绍了时间复杂度的概念与分析方法，以及冒泡排序、选择排序、插入排序、归并排序、希尔排序、快速排序、堆排序和基数排序八大经典排序算法的基本思路与Java实现代码，每个算法均附有详细的代码注释和原理说明。
date: 2023-09-01 09:01:16
---

# 入门案例

## 九九乘法表

![](https://cloud.luckynwa.top/profile/mdS/javaS1.png)

实现如下：

```java
public class Demo1 {
    public static void main(String[] args) {
        for (int i = 1; i <= 9; i++) {  //控制行,从1开始循环
            for (int j = 1; j <= i; j++) { //控制每行对应的数
                System.out.print(i + "*" + j + "=" + i * j + "\t");
            }
            //第一次循环i是1 j也是1 结果1*1=1    这是图1第一种
            //第二次循环i是2  j是1和2 结果2*1=2  2*2=4
            //第三次循环i是3  j是1、2、3 结果3*1=3    3*2=6  3*3=9
            //同理
            System.out.println();//每次循环完换行
        }
    }
}
```

![](https://cloud.luckynwa.top/profile/mdS/javaS2.png)

实现如下：

```java
public class Demo1 {
    public static void main(String[] args) {
        for (int i = 9; i >= 1; i--) {  //控制行,从9开始循环
            for (int j = 1; j <= i; j++) { //控制每行对应的数
                System.out.print(i + "*" + j + "=" + i * j + "\t");
            }
            //第一次循环i是9 j也是1到9  9*1 9*2....   这是第二图
            //第二次循环i是8  j是1到8
            //同理
            System.out.println();//每次循环完换行
        }
    }
}
```

![](https://cloud.luckynwa.top/profile/mdS/javaS3.png)

实现如下：

```java
public class Demo1 {//发现是第二图从第二行开始往右边移动2个\t(制表符差不多空格的意思),只要再j循环的**上面**先弄空白就会把它挤到右边
    public static void main(String[] args) {
        for (int i = 9; i >= 1; i--) {  //控制行,从9开始循环
            for (int m = 1; m <= 9 - i; m++) {
                System.out.print("\t\t");//控制每行对应的数
                //第一次i=9的时候m是false不运行
                //第二次i=8的时候m是1，运行一次
                //i=7，运行2次 同理 关键是9-i要想到
            }
            for (int j = 1; j <= i; j++) { //控制每行对应的数
                System.out.print(i + "*" + j + "=" + i * j + "\t");
            }
            //第一次循环i是9 j也是1到9
            //第二次循环i是8  j是1到8
            //同理
            System.out.println();//每次循环完换行
        }
    }
}
```

![](https://cloud.luckynwa.top/profile/mdS/javaS4.png)

发现第一行是1，第二行是2 说明i是从1开始的，那个空白第一行有8个，所以循环从9开始，因为不等于i，所以第一次就循环8次空格，就可以把数字挤到右边去了

```java
public class Demo1 {
    public static void main(String[] args) {
        for (int i = 1; i <= 9; i++) {  //控制行,从9开始循环
            for (int m = 9; m > i; m--) {
                System.out.print("\t\t");//控制每行对应的数
                //第一次i=1的时候m循环8次
                //第二次i=2的时m循环7次
                //同理
            }
            for (int j = 1; j <= i; j++) { //控制每行对应的数
                System.out.print(i + "*" + j + "=" + i * j + "\t");
            }
            //第一次循环i是1 j也是1到1
            //第二次循环i是2  j是1和2
            //同理
            System.out.println();//每次循环完换行

        }
    }
}
```

## 星星

![image-20260704161127840](https://cloud.luckynwa.top/profile/2026/07/04/image-20260704161127840_20260704161129A005.png)

(1)

```java
public class Demo1 {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {//i控制行，共5行
            for (int j = 5; j > i; j--) {//j控制每一行的数量
                System.out.print("m");//用m代替空格先测试，如果正确变空格
                //i=1 j=4,3,2,1 输出4个m
                //i=2 j循环3次m 同理
            }
            for (int k = 1; k <= 5; k++) {
                System.out.print("*");
                //K控制每行多少个 都是5个
            }
            System.out.println();
        }
    }
}
```

(2)

```java
public class Demo1 {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {//i控制行，共5行
            for (int j = 5; j > i; j--) {//j控制每一行的数量
                System.out.print("m");//用m代替空格先测试，如果正确变空格
                //i=1 j=4,3,2,1 输出4个m
                //i=2 j循环3次m 同理
            }
            for (int k = 1; k <= (2 * i) - 1; k++) {
                System.out.print("*");
                //i=1 k=1
                //i=2 K=3同理，3就是循环了3次*
            }
            System.out.println();
        }
    }
}
```

(3)第三题的思路：发现和第二图加倒三角 那我们只要再画一个倒的三角就行，在2图的基础上

```java
public class Demo1 {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {//i控制行，共5行
            for (int j = 5; j > i; j--) {//j控制每一行的数量
                System.out.print("m");//用m代替空格先测试，如果正确变空格
                //i=1 j=4,3,2,1 输出4个m
                //i=2 j循环3次m 同理
            }
            for (int k = 1; k <= (2 * i) - 1; k++) {
                System.out.print("*");
                //i=1 k=1
                //i=2 K=3同理，3就是循环了3次*
            }
            System.out.println();
        }//下面新的循环是控制倒的三角
        for (int ii = 4; ii >= 1; ii--) {  //ii控制行，共4行,倒3角有4行
            for (int jj = 1; jj <= 5 - ii; jj++) {//jj控制每一行的数量
                System.out.print("m");
                //发现ii=4时候 jj循环1次 ii=3 jj循环2次
            }
            for (int kk = 1; kk <= (2 * ii) - 1; kk++) {
                System.out.print("*");
                //ii=4 kk=7 就是7颗*
                //ii=3 Kk=3同理，3就是循环了3次*
            }
            System.out.println();
        }
    }
}

```

(4-1)思路：再上个代码改，可以考虑先画靠近m的那几个*,再画空格，然后再画最右边的*即可

```java
public class Demo1 {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {//i控制行，共5行
            for (int j = 5; j > i; j--) {//j控制每一行的数量
                System.out.print("m");//用m代替空格先测试，如果正确变空格
                //i=1 j=4,3,2,1 输出4个m
                //i=2 j循环3次m 同理
            }
            for (int k = i; k == i; k++) {//即每次循环画1次
                System.out.print("*");
                //前面画完空格 再接1颗*即可
            }
            for (int m = 2; m < 2 * i - 1; m++) {
                System.out.print(" ");//这是空格的规律从第二行开始
                //i=1,不运行 i=2 2<3  第二行只循环1次空格
            }
            if (i > 1) {
                for (int kk = i; kk == i; kk++) {
                    System.out.print("*");
                    //因为第一行已经有了。所以第二行开始
                }
            }
            System.out.println();
        }//下面新的循环是控制倒的三角，同理
        for (int ii = 4; ii >= 1; ii--) {  //ii控制行，共4行,倒3角有4行
            for (int jj = 1; jj <= 5 - ii; jj++) {//jj控制每一行的数量
                System.out.print("m");
                //发现ii=4时候 jj循环1次 ii=3 jj循环2次
            }
            for (int kk = ii; kk <= ii; kk++) {
                System.out.print("*");
            }
            for (int m = 2; m < 2 * ii - 1; m++) {
                System.out.print(" ");
            }
            if (ii > 1) {
                for (int kk = ii; kk <= ii; kk++) {
                    System.out.print("*");
                }
            }
            System.out.println();
        }
    }
}

```

(4-2)更简单的方法

```java
public class Demo1 {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {//i控制行，共5行
            for (int j = 5; j > i; j--) {//j控制每一行的数量
                System.out.print(" ");//用m代替空格先测试，如果正确变空格
                //i=1 j=4,3,2,1 输出4个m
                //i=2 j循环3次m 同理
            }
            for (int m = 1; m <= 2 * i - 1; m++) {
                if (m == 1 || m == 2 * i - 1) {
                    System.out.print("*");//这是直接来判断开头和结尾
                    //i=1 m=1 进判断 循环1次*
                    //i=2 m=1,2,3 正常循环3次 进判断，1时候打印*，m==2*2-1==3 所以m=2时候是空格 3时候才是*
                } else {
                    System.out.print(" ");
                }
            }
            System.out.println();
        }//下面新的循环是控制倒的三角，同理
        for (int ii = 4; ii >= 1; ii--) {  //ii控制行，共4行,倒3角有4行
            for (int jj = 1; jj <= 5 - ii; jj++) {
                System.out.print(" ");
            }
            for (int m = 1; m <= 2 * ii - 1; m++) {
                if (m == 1 || m == 2 * ii - 1) {
                    System.out.print("*");
                } else {
                    System.out.print(" ");
                }
            }
            System.out.println();
        }
    }
}
```

(5)在第四图的基础上改一下就可以

```java
public class Demo1 {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {//i控制行，共5行
            for (int j = 5; j > i; j--) {//j控制每一行的数量
                System.out.print(" ");//用m代替空格先测试，如果正确变空格
                //i=1 j=4,3,2,1 输出4个m
                //i=2 j循环3次m 同理
            }
            for (int m = 1; m <= 2 * i - 1; m++) {
                if (m == 1 || m == 2 * i - 1 || i == 5) {
                    System.out.print("*");//这是直接来判断开头和结尾
                    //i=1 m=1 进判断 循环1次*
                    //i=2 m=1,2,3 正常循环3次 进判断，1时候打印*，m==2*2-1==3 所以m=2时候是空格 3时候才是*
                    //补一个i==5就行了,就直接打印9颗，m<=9
                } else {
                    System.out.print(" ");
                }
            }
            System.out.println();
        }
    }
}
```

## 完数

输入一个数，判断这个数是不是完数
完数：一个数恰好等于它的除了它本身之外所有因数之和，这个数就称为“完数”。
例如：6的因数有：1、2、3；由于6=1+2+3，所以6是完数。

6是完数
28是完数
496是完数

```java
public class Demo1 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入一个整数:");
        int a = scanner.nextInt();
        int sum = 0;
        for (int i = 1; i < a; i++) {
            if (a % i == 0) {
                sum += i;
                System.out.println(i);
            }
        }
        if (sum == a) {
            System.out.println(a + "是完数");
        } else {
            System.out.println(a + "不是完数");
        }
        demo();//多余的测试一下100到999有多少个完数
    }

    public static void demo() {
        for (int a = 100; a < 1000; a++) {
            int sum = 0;
            for (int i = 1; i < a; i++) {
                if (a % i == 0) {
                    sum += i;
                }
            }
            if (sum == a) {
                System.out.println("100到999之间的完数有：" + a);
            }
        }
    }
}
```

## 斐波纳契数列（Fibonacci series）

两个元素的总和确定了下一个数 1 1 2 3 5 8

```java
public class Demo1 {
    public static void main(String[] args) {
        int b = 1;
        int a = 0;
        for (int m = 1; m < 6; m++) {
            System.out.print(a + "\t" + b + "\t");
            a = a + b;
            b = a + b;
        }
    }
}
```

## 水仙花数

水仙花数必须是3位数，它的每个位上的数字的 3次幂之和等于它本身。例如：1^3 + 5^3+ 3^3 = 153

水仙花数共有4个：153，370，371，407；

```java
public class Demo1 {
    public static void main(String[] args) {
        for (int a = 100; a < 1000; a++) {
            int b = a / 100;  //百位
            int c = a % 10;   //个位
            int d = a / 10 % 10;//十位 a == Math.pow(b,3) +  Math.pow(c,3) +  Math.pow(d,3)
            if (a == b * b * b + c * c * c + d * d * d) {
                System.out.println(a + "这是水仙数");
            }
        }
    }
}
```

```java
public class Demo1 {
    public static void main(String[] args) {
        try {
            Scanner scanner = new Scanner(System.in);
            System.out.print("请输入一个三位的正整数：");//判断输入的是否是水仙数
            int a = scanner.nextInt();
            int b = a / 100;  //百位
            int c = a % 10;   //个位
            int d = a / 10 % 10;//十位
            if (a == b * b * b + c * c * c + d * d * d) {
                System.out.println(a + "这是水仙数");
            } else {
                System.out.println(a + "不是水仙数");
            }
        } catch (Exception e) {
            System.out.println("您的输入有误!");
        }
    }
}
```

## 阶乘

```java
public class Demo1 {
    public static void main(String[] args) {
        long sum = 0;
        int n = 6;
        for (int i = 1; i <= n; i += 2) {  //这里求1！+3！+5！
            long temp = 1;
            for (int j = 1; j <= i; j++) {
                temp *= j;
            }
            sum = sum + temp;
        }
        System.out.println("1！+3！+5！= " + sum);
    }
}
```

```java
public class Demo1 {
    public static void main(String[] args) {
        int sum = 0;
        int i = 1;
        for (int j = 1; j <= 5; j++) {
            i *= j;
            sum += i;
        }
        System.out.println("1到5的阶乘和:" + sum);
    }
}
```

## 回文数

输入一个数 如121 反过来也是一样 1221 也是

```java
public class Demo1 {
    public static void main(String[] args) {
        try {
            Scanner scanner = new Scanner(System.in);
            System.out.println("请输入一个数：");
            int i = scanner.nextInt();
            int temp = i;
            int num = 0;
            while (i != 0) {
                int ge = i % 10;
                i = i / 10;
                num = num * 10 + ge;
            }
            if (temp == num) {
                System.out.println("这是回文数");
            } else {
                System.out.println("这不是回文数");
            }
        } catch (Exception e) {
            System.out.println("输入有误!");
        }
    }
}
```

## 输入10个数，输出最大值和最小值

```java
public class Demo1 {
    public static void main(String[] args) {
        getMaxAndMin();
    }
    public static void getMaxAndMin() {
        try {
            Scanner sc = new Scanner(System.in);
            System.out.println("请输入第1个数：");
            //把第一次输入的数字赋给max和min
            int num1 = sc.nextInt();
            int max = num1;
            int min = num1;
            int count = 2;
            while (count <= 10) {
                System.out.println("请输入第" + count + "个数字：");
                int numx = sc.nextInt();
                if (numx > max) {
                    max = numx;//比最大的值还大
                } else if (numx < min) {
                    min = numx;//比最小的值还小
                }
                count++;
            }
            System.out.println("最大值：" + max + ", 最小值：" + min);
        } catch (Exception e) {
            System.out.println("输入错误，请重新输入！！！");
            getMaxAndMin();
        }
    }
}
```

优化

```java
public class Demo1 {
    public static void main(String[] args) {
        getMaxAndMin();
    }

    public static void getMaxAndMin() {
        try {
            Scanner sc = new Scanner(System.in);
            System.out.println("请输入第1个数：");
            //把第一次输入的数字赋给max和min
            int num1 = sc.nextInt();

            int max = num1;
            int min = num1;
            int count = 2;
            while (count <= 3) {
                try {
                    System.out.println("请输入第" + count + "个数字：");
                    int numx = sc.nextInt();
                    if (numx > max) {
                        max = numx;//比最大的值还大
                    } else if (numx < min) {
                        min = numx;//比最小的值还小
                    }
                    count++;
                } catch (Exception e) {
                    System.out.println("输入错误，请重新输入！！！");
                    sc = new Scanner(System.in);
                }
            }
            System.out.println("最大值：" + max + ", 最小值：" + min);
        } catch (Exception e) {
            System.out.println("输入错误，请重新输入！！！");
            getMaxAndMin();
        }
    }
}
```

# 时间复杂度

O(1)：常数时间复杂度，表示算法的执行时间不随输入规模变化而变化。比如数组访问操作，无论数组大小为多少，其访问时间都是O(1)。

O(log n)：对数时间复杂度，表示算法的执行时间与输入规模呈对数关系。比如二分查找算法，每次能够将搜索区间缩小一半，所以时间复杂度为O(log n)。

O(n)：线性时间复杂度，表示算法的执行时间与输入规模呈线性关系。比如顺序查找算法，需要逐个比较所有元素，所以时间复杂度为O(n)。

O(n log n)：常见的排序算法时间复杂度都为O(n log n)，包括快速排序、归并排序等。

O(n^2)：平方时间复杂度，表示算法的执行时间与输入规模呈平方关系。比如冒泡排序、插入排序、选择排序等。

具体分析：

```java
    @Test
    public void fun1() {
        int n = 100;
        for (int i = 0; i < n; i++) {
            System.out.println("lucky");
        }

    }
```

第一眼肯定看不出算法的运行时间，而且n的值可能1000000

现在我们把每一条语句的执行时间都看做是一样的，记为一个**时间单元**

① 初始化int i和n，花费两个时间单元 n=100来理解

②i<n(最后一次也要比较)，花费n+1个时间单元

③打印和i++两条语句，花费2\*n个时间单元

共3n+3的时间单元 也就是数学的线性关系 当值越大+3就可以忽略变3n

T(n)来标识程序消耗的时间

T(n)=n+1 忽略常数项 T(n)~n

T(n)=n+n^2 忽略低阶项 T(n)~n^2

T(n)=3n 忽略最高阶的系数 T(n)~n

所谓的**时间复杂度**：只关心问题规模n趋于无穷时函数对结果影响最大的项，最高次项

时间复杂度越低越好。时间复杂度表示算法的执行时间与输入规模之间的增长关系，通常用大 O 表示法表示。较低的时间复杂度意味着算法在处理大规模问题时更高效。当涉及大规模数据处理或复杂计算时，拥有较低的时间复杂度可以极大地提高算法的执行效率和性能。因此，更低的时间复杂度通常是我们追求的目标。然而，时间复杂度并不是唯一考虑的因素。还要综合考虑其他因素，如空间复杂度、算法的可读性、代码的可维护性等。有时候，在时间复杂度较低的算法之间进行选择时，我们也需要权衡其他因素，以找到最适合特定问题和实际需求的解决方案。

简化后的值就是时间复杂度了下面那个，如刚刚上面那个O(f(n))

T(n)=3n+3 简化 T(n)~f(n)=n 记做O(n)

![时间复杂度](https://cloud.luckynwa.top/profile/mdS/shijianfuzdu.png)

一、得出运行时间的函数 二、对函数进行简化

准确地说O代表了运行时间函数的一个渐进上界，即**T(n)在数量级上小于等于f(n)**

```java
        int n = 100;
        System.out.println(n);
```

像这种只运行一次，时间复杂度就是O(1)

一般循环看最内层打印的规律即可，n增加线性增加直接O(n)

嵌套循环2层，时间复杂度就是O(n^2) 内层语句随n的增加呈现2次函数的规律

对数函数趋势是随着自变量增大，因变量增长越慢 log

```java
        int sum = 1;
        while (sum < n) {
            sum *= 2;
        }
```

while循环的条件是 `sum < n`，每次循环中sum都会乘以2。我们可以观察到，在循环中，**sum的值会以指数级别增长**，直到sum不小于n为止。 假设起始时 `sum = 1`，循环在 sum 不超过 n 的情况下进行。 第一次循环，sum变为2，第二次循环，sum变为4，以此类推，直到 sum 不小于 n。 由于每次循环中 sum 都会乘以2，因此循环次数为 log2(n)。也就是说，**循环次数与 n 的大小呈对数关系**。 因此，该代码的时间复杂度为 O(log n)

# 经典排序算法

1、冒泡排序 2、选择排序 3、插入排序 4、归并排序 5、希尔排序 6、快速排序 7、堆排序 8、基数排序

## 冒泡排序

基本思路： 就比如数组里面[3,1,6,2,5] 就是两两比较，首先3 1比较3大则3到右边，3 6比较6大，6本身右边则不变，同理6 2

第一轮遍历：3 1 6 2 5 -> 1 3 6 2 5 -> 1 3 6 2 5 -> 1 3 2 6 5 -> 1 3 2 5 6

第二轮遍历：1 3 2 5 6 -> 1 2 3 5 6 -> 1 2 3 5 6

经过两轮遍历后，数组已经排序完成

冒泡排序的时间复杂度是O(n^2)，其中n是数组的长度。尽管冒泡排序是一种简单的排序算法，但对于小规模的数据集，它仍然是一个可行的选择

**分析**

从开始第一对到结尾的最后一对----->最后的元素是最大的数

--->除了最后一个，最多需要进行length-1

首先肯定要明确是双重for循环，因为数组从0开始，所以int i=0，i< arr.length - 1是因为两个比较肯定少1轮，外循环确定，每一次外循环后内循环次数会在 arr.length - 1基础上再-i次

内循环只要判断相邻大小互换即可

![冒泡](https://cloud.luckynwa.top/profile/mdS/maopao.gif)

```java
public class Demo1 {
    public static void main(String[] args) {
        int[] arr = new int[]{3, 1, 6, 2, 5};
        for (int i = 0; i < arr.length - 1; i++) {
            for (int j = 0; j < arr.length - 1 - i; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];//为什么不直接覆盖 arr[j + 1]=arr[j]，这样arr[j + 1]值就没了需要临时存一个
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
        for (int item : arr) {
            System.out.print(item + "\t");
        }
    }
}
```

优化：如果一个数组已经是完全有序的情况下，冒泡排序法仍然会进行逐轮的比较，这无疑是浪费性能的行为

当冒泡的比较中，有一轮如果没有发生交换，则可以确定当前数组已经完全有序，后面的轮数完全不必在进行

```java
public class Demo1 {
    public static void main(String[] args) {
        int[] arr = new int[]{3, 1, 6, 2, 5};
        Boolean Sort = false;//定义一个开关
        for (int i = 0; i < arr.length - 1; i++) {
            if (!Sort) {
                Sort = true;
                for (int j = 0; j < arr.length - 1 - i; j++) {
                    if (arr[j] > arr[j + 1]) {
                        int temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                        Sort = false;//说明这一轮有交换
                    }
                }
            } else {
                break;//停止循环
            }
        }
        for (int item : arr) {
            System.out.print(item + "\t");
        }
    }
}
```

## 选择排序

基本思路：通过一轮比较，选出最小的那个元素的下标，然后和第一个元素进行交换，第一个元素的位置就可以确定。数组11, 2, 33, 24, 15

第一次遍历，找到最小元素2，将其与第一个元素11交换位置：2 11 33 24 15

第二次遍历，找到最小元素11，不需要交换位置：2 11 33 24 15

第三次遍历，找到最小元素15，将其与第三个元素33交换位置：2 11 15 24 33

第四次遍历，找到最小元素24，将其与第四个元素33交换位置：2 11 15 24 33

经过四次遍历后，数组已经排序完成

```java
public class Demo1 {
    public static void main(String[] args) {
        int[] arr = new int[]{11, 2, 33, 24, 15};
        for (int i = 0; i < arr.length - 1; i++) {
            int k = i;
            for (int j = k + 1; j < arr.length; j++) {
                if (arr[j] < arr[k]) {
                    k = j;
                }
            }
            if (k != i) {
                int t = arr[k];
                arr[k] = arr[i];
                arr[i] = t;
            }
        }
        for (int m = 0; m < arr.length; m++) {
            System.out.print(arr[m] + "\t");
        }
    }
}
```

- 选择排序比较的轮数和冒泡排序比较的轮数是一样的
- K表示当前最小值的下标，当前是第几轮，k就先代表第几个元素的下标，然后依次和后面的元素进行比较，如果发现比k位置元素小的元素时，改变k的下标，这样一轮过后k代表的位置就是本轮最小的元素，和i进行交换即可
- 如果一轮过后k==i，则说明i本来就是最小的元素，则无需交换提高性能。

## 插入排序

假设一个数组已经基本有序，则这个时候插入排序就是一个不错的选择。插入排序是先保证左边元素是基本有序的，然后将后面的元素依次和左边元素进行比较，如果比较到一个比自己小的元素时就可以停止比较了，因为左边已经呈现有序状态，找到比自己小的元素时，就不用再往后比较了，对数组[11, 2, 33, 24, 15]

初始状态：11 | 2 33 24 15

第一次插入：2 11 | 33 24 15

第二次插入：2 11 33 | 24 15

第三次插入：2 11 24 33 | 15

第四次插入：2 11 15 24 33 |

已排序部分的初始状态只有一个元素，即数组的第一个元素。在这个例子中，已排序部分为 11 |右边都是未排序的

在插入排序的每一次迭代中，算法从未排序部分中取出一个元素，并将其插入到已排序部分的适当位置

```java
public class Demo1 {
    public static void main(String[] args) {
        int[] arr = new int[]{11, 2, 33, 24, 15};
        for (int i = 0; i < arr.length; i++) {
            //arr[j]~arr[j-1]
            for (int j = i; j > 0; j--) {
                if (arr[j] < arr[j - 1]) {
                    int t = arr[j];
                    arr[j] = arr[j - 1];
                    arr[j - 1] = t;
                } else {
                    break;
                }
            }
        }
        for (int m = 0; m < arr.length; m++) {
            System.out.print(arr[m] + "\t");
        }
    }
}
```

- 插入排序的轮数和冒泡排序一样，但是i从1开始，因为我们假设第一个元素已经是呈现有序状态了。

- 内部循环依次从当前位置开始，和前面元素进行比较，如果找到了比自己小的元素，则停止比较，直接退出本轮比较，进行下一轮比较

## 归并排序

它采用分治法的思想，将待排序的数组不断地划分为较小的子数组，然后通过合并操作将子数组排序，最终得到一个有序的数组

```java
public class Demo1 {
    public static void main(String[] args) {
        int[] arr = {11, 2, 33, 24, 15};
        mergeSort(arr);
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }

    public static void mergeSort(int[] arr) {
        if (arr == null || arr.length <= 1) {
            return;
        }

        int[] temp = new int[arr.length];
        mergeSort(arr, temp, 0, arr.length - 1);
    }

    private static void mergeSort(int[] arr, int[] temp, int left, int right) {
        if (left >= right) {
            return;
        }

        int mid = (left + right) / 2;
        mergeSort(arr, temp, left, mid);
        mergeSort(arr, temp, mid + 1, right);
        merge(arr, temp, left, mid, right);
    }

    private static void merge(int[] arr, int[] temp, int left, int mid, int right) {
        int i = left;
        int j = mid + 1;
        int k = left;

        while (i <= mid && j <= right) {
            if (arr[i] <= arr[j]) {
                temp[k++] = arr[i++];
            } else {
                temp[k++] = arr[j++];
            }
        }

        while (i <= mid) {
            temp[k++] = arr[i++];
        }

        while (j <= right) {
            temp[k++] = arr[j++];
        }

        for (int m = left; m <= right; m++) {
            arr[m] = temp[m];
        }
    }
}
```

## 希尔排序

基于插入排序的排序算法，它通过将原始数组分割成多个较小的子数组来改进插入排序的性能

希尔排序的核心思想是通过比较和交换相距一定间隔的元素来实现部分排序，逐步减小间隔直至为1，最后进行一次完整的插入排序

```java
public class Demo1 {
    public static void main(String[] args) {
        int[] arr = {11, 2, 33, 24, 15};
        shellSort(arr);
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }

    public static void shellSort(int[] arr) {
        if (arr == null || arr.length <= 1) {
            return;
        }

        int n = arr.length;
        int gap = n / 2; // 初始间隔

        while (gap > 0) {
            for (int i = gap; i < n; i++) {
                int temp = arr[i];
                int j = i;

                while (j >= gap && arr[j - gap] > temp) {
                    arr[j] = arr[j - gap];
                    j -= gap;
                }

                arr[j] = temp;
            }

            gap = gap / 2; // 缩小间隔
        }
    }
}
```

在方法中，我们首先检查数组的长度是否小于等于1，如果是，则直接返回，无需排序。

然后，我们定义了变量 `n` 来表示数组的长度，并初始化变量 `gap` 为 `n / 2`，即初始间隔。接下来，我们进入一个循环，当间隔 `gap` 大于0时，执行循环体内的操作。

在循环体内，我们使用插入排序的思想对每个间隔进行排序。我们从 `gap` 开始，依次遍历数组中的元素。对于当前位置 `i`，我们将其与其对应间隔位置 `i - gap` 的元素进行比较。如果间隔位置的元素较大，则将其后移 `gap` 个位置，并继续向前比较，直到找到合适的位置插入当前元素。

最后，我们将当前元素插入到合适的位置，并重复上述过程直到遍历完整个��组。

随着循环的进行，间隔 `gap` 逐步减小，直到为1，此时进行最后一次完整的插入排序。排序完成后，数组中的元素就按照从小到大的顺序排列。

希尔排序的优点是相对于插入排序来说，它可以更快地对部分有序的数组进行排序，但其实现相对复杂一些。

## 快速排序

它通过选取一个基准元素，将数组中的元素分为两部分，一部分小于基准元素，一部分大于基准元素，然后对两部分分别进行递归排序，最终完成整个数组的排序

```java
public class Demo1 {
    public static void main(String[] args) {
        int[] arr = {11, 2, 33, 24, 15};
        quickSort(arr, 0, arr.length - 1);
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }

    public static void quickSort(int[] arr, int low, int high) {
        if (arr == null || arr.length <= 1 || low >= high) {
            return;
        }
        // 分区操作，返回基准元素的索引
        int pivotIndex = partition(arr, low, high);
        // 对左半部分进行递归排序
        quickSort(arr, low, pivotIndex - 1);
        // 对右半部分进行递归排序
        quickSort(arr, pivotIndex + 1, high);
    }

    private static int partition(int[] arr, int low, int high) {
        // 选择第一个元素作为基准元素
        int pivot = arr[low];
        // 初始化左右指针
        int left = low;
        int right = high;
        while (left < right) {
            // 从右边开始，找到第一个小于基准元素的元素
            while (left < right && arr[right] >= pivot) {
                right--;
            }
            // 从左边开始，找到第一个大于基准元素的元素
            while (left < right && arr[left] <= pivot) {
                left++;
            }
            // 交换左右指针指向的元素
            if (left < right) {
                swap(arr, left, right);
            }
        }
        // 将基准元素放到正确的位置
        swap(arr, low, left);
        // 返回基准元素的索引
        return left;
    }

    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
```

我们首先定义了快速排序的方法 `quickSort`。在方法中，我们首先检查数组的长度是否小于等于1或者低位索引 `low` 是否大于等于高位索引 `high`，如果是，则直接返回，无需排序

然后，我们调用 `partition` 方法对当前的子数组进行分区操作，得到基准元素的索引 `pivotIndex`

接着，我们对基准元素左边的子数组进行递归调用快速排序，即 `quickSort(arr, low, pivotIndex - 1)`，对左半部分进行排序

然后，我们对基准元素右边的子数组进行递归调用快速排序，即 `quickSort(arr, pivotIndex + 1, high)`，对右半部分进行排序

最后，我们通过交换元素的方式将基准元素放到正确的位置，完成分区操作

在 `partition` 方法中，我们选择第一个元素作为基准元素 `pivot`，然后初始化左指针 `left` 为 `low`，右指针 `right` 为`high`

接下来，我们使用左右指针的方式进行分区操作。我们从右边开始，找到第一个小于基准元素的元素，然后从左边开始，找到第一个大于基准元素的元素，然后交换这两个元素。重复这个过程，直到左指针大于或等于右指针

最后，将基准元素放到正确的位置，即将基准元素与左指针指向的元素进行交换

最后，我们返回基准元素的索引 `left`，作为分区操作的结果

快速排序的核心思想是分治法，通过不断地分区操作将数组分解成较小的子数组，然后对子数组进行递归排序。相较于其他排序算法，快速排序的平均时间复杂度为 O(nlogn)，具有较好的性能

## 堆排序

一种基于二叉堆数据结构的排序算法，它利用堆的性质进行排序操作。堆排序分为两个主要步骤：建堆和排序

基本思路：

1. **建堆**：将待排序的数组看作是一个完全二叉树，并根据元素的大小构建一个最大堆或最小堆。最大堆的性质是父节点的值大于或等于其子节点的值，最小堆的性质则相反。建堆的过程可以从最后一个非叶子节点开始，依次向上调整堆的结构，使得每个父节点的值都大于或等于（或小于或等于）其子节点的值。
2. **排序**：将堆顶元素与堆的最后一个元素交换位置，然后将剩余元素重新调整为一个新的堆。重复这个过程，每次将堆中的最大（或最小）元素放到数组的末尾，直到堆中只剩下一个元素为止。

```java
public class Demo1 {
    public static void main(String[] args) {
        int[] arr = {11, 2, 33, 24, 15};
        heapSort(arr);
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }

    public static void heapSort(int[] arr) {
        if (arr == null || arr.length <= 1) {
            return;
        }

        int n = arr.length;

        // 建堆，从最后一个非叶子节点开始向下调整堆
        for (int i = n / 2 - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }

        // 排序，每次将堆顶元素与堆的最后一个元素交换，并重新调整堆
        for (int i = n - 1; i >= 0; i--) {
            swap(arr, 0, i); // 将堆顶元素与当前最后一个元素交换
            heapify(arr, i, 0); // 重新调整堆
        }
    }

    private static void heapify(int[] arr, int n, int i) {
        int largest = i; // 当前节点的索引
        int left = 2 * i + 1; // 左子节点的索引
        int right = 2 * i + 2; // 右子节点的索引

        // 找到左右子节点中较大的节点
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }

        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }

        // 如果最大节点不是当前节点，则交换它们，并递归调整交换后的子树
        if (largest != i) {
            swap(arr, i, largest);
            heapify(arr, n, largest);
        }
    }

    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}
```

首先定义了堆排序的方法 `heapSort`。在方法中，我们首先检查数组的长度是否小于等于1，如果是，则直接返回，无需排序

然后，我们获取数组的长度 `n`

接下来，我们利用 `heapify` 方法从最后一个非叶子节点开始，向下调整堆的结构，使得满足堆的性质

然后，我们进行排序操作。每次将堆顶元素与堆的最后一个元素交换位置，并将剩余元素重新调整为一个新的堆。重复这个过程，每次交换后的堆规模减小，直到堆中只剩下一个元素，排序完成

在 `heapify` 方法中，我们首先将数组中的第 `i` 个元素作为当前节点 `largest`，并获取其左子节点 `left` 和右子节点 `right` 的索引

然后，我们比较当前节点与其左右子节点的值，将较大（或较小）的节点的索引赋值给 `largest`

如果 `largest` 不等于 `i`，即当前节点不是最大（或最小）节点，则交换当前节点与 `largest` 节点的值，并递归调用 `heapify` 方法调整交换后的子树。

最后，我们通过 `swap` 方法实现元素交换的操作

堆排序的时间复杂度是 O(nlogn)，其中 n 是数组的长度。堆排序具有不稳定性，因为在调整堆的过程中，可能会改变相同元素的相对顺序。然而，堆排序的优点是不需要额外的空间，可以原地排序

## 基数排序

是一种非比较性的排序算法，它根据元素的每个位上的值来进行排序。基数排序适用于待排序元素为非负整数的情况

基本思路：

1. **确定排序的位数**：首先确定待排序元素中最大值的位数，假设为 d。这样我们就需要进行 d 轮排序操作
2. **按位进行排序**：从最低位开始，依次对每一位进行排序。可以使用稳定的排序算法，例如计数排序或桶排序，对每一位进行排序。排序的过程可以从最低位到最高位，也可以从最高位到最低位
3. **合并结果**：经过 d 轮排序后，最终得到的排序结果就是有序的

```java
public class Demo1 {
    public static void main(String[] args) {
        int[] arr = {170, 45, 75, 90, 802, 24, 2, 66};
        radixSort(arr);
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }

    public static void radixSort(int[] arr) {
        if (arr == null || arr.length <= 1) {
            return;
        }

        int max = getMax(arr); // 获取数组中的最大值

        // 从最低位到最高位进行排序
        for (int exp = 1; max / exp > 0; exp *= 10) {
            countingSort(arr, exp);
        }
    }

    private static int getMax(int[] arr) {
        int max = arr[0];
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
        }
        return max;
    }

    private static void countingSort(int[] arr, int exp) {
        int n = arr.length;
        int[] output = new int[n]; // 存储排序结果的临时数组
        int[] count = new int[10]; // 计数数组，用于统计每个数字出现的次数

        // 统计每个数字出现的次数
        for (int i = 0; i < n; i++) {
            count[(arr[i] / exp) % 10]++;
        }

        // 对计数数组进行累加，得到每个数字的正确位置
        for (int i = 1; i < 10; i++) {
            count[i] += count[i - 1];
        }

        // 从后往前遍历原数组，根据计数数组将元素放到正确的位置
        for (int i = n - 1; i >= 0; i--) {
            output[count[(arr[i] / exp) % 10] - 1] = arr[i];
            count[(arr[i] / exp) % 10]--;
        }

        // 将排序结果复制回原数组
        for (int i = 0; i < n; i++) {
            arr[i] = output[i];
        }
    }
}
```

首先定义了基数排序的方法 `radixSort`。在方法中，我们首先获取待排序数组中的最大值 `max`，以确定需要进行多少轮排序

然后，我们使用 `countingSort` 方法对每一位进行排序。`countingSort` 方法使用计数排序的思想，先创建一个临时数组 `output` 来存储排序结果，再创建一个计数数组 `count` 来统计每个数字出现的次数

在 `countingSort` 方法中，我们首先遍历原数组，统计每个数字出现的次数，并存储在 `count` 数组中

然后，我们对计数数组进行累加操作，得到每个数字的正确位置

接下来，我们从后往前遍历原数组，根据计数数组将每个元素放到正确的位置上

最后，我们将排序结果复制回原数组

在 `radixSort` 方法中，我们使用循环来进行多轮排序，每次将排序的位数乘以 10（即 exp \*= 10）

基数排序的时间复杂度是 O(d \* (n + k))，其中 d 是最大值的位数，n 是数组的长度，k 是基数的大小（这里是 10）。基数排序的空间复杂度是 O(n+k)，其中 n 是数组的长度，k 是基数的大小。基数排序是一种稳定的排序算法

需要注意的是，基数排序适用于待排序元素为非负整数的情况。对于其他类型的数据，可以通过映射为非负整数来进行基数排序
