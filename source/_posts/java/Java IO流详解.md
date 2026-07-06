---
title: Java IO流详解
cover: https://imgs.luckynwa.top/openApi/lucky/yys/369
description: 知己知彼，百战不殆
categories: 后端
tags: Java
comments: true
abbrlink: java3
summary: >-
  启动小维AI摘要模块⚡……运算完成！本文系统讲解Java IO流的核心概念与实际应用。首先介绍IO流的基本分类，包括输入流与输出流的区别，字节流与字符流的各自适用场景，以及字符流由字节流加编码表构成的原理。随后深入讲解File类的使用，涵盖文件创建、删除、目录遍历等常用操作，并通过多个代码示例演示FileInputStream、FileOutputStream的字节流读写，FileReader、FileWriter的字符流操作，以及缓冲流BufferedInputStream、BufferedOutputStream提升IO效率的原理与实践。最后介绍转换流InputStreamReader、OutputStreamWriter在不同编码间的桥梁作用，帮助开发者解决Windows与Linux系统间的乱码问题，是Java IO编程入门与进阶的全面指南。
date: 2024-08-15 02:37:39
---

# 概念

IO 流：按照流动的方向，以内存为基准，分为输入 input 和输出 output，即流向内存是输入流，流出内存是输出流

进行IO操作前需要明确四个关键点：

1. 明确要操作的数据是数据源还是数据目的（读还是写）
2. 明确要操作的设备上的数据是字节还是文本
3. 明确数据所在的具体设备
4. 明确是否需要额外功能（转换流、高效流等）

输入流（读数据）、输出流（写数据）

## 分类

| 类型   | 输入流      | 输出流       |
| ------ | ----------- | ------------ |
| 字节流 | InputStream | OutputStream |
| 字符流 | Reader      | Writer       |

字符流的由来：因为数据编码的不同，字节流直接读中文会乱码。字符流 = 字节流 + 编码表

1 个字符 = 2 个字节

- 字节流适合读取视频、音乐、图片等二进制文件
- 字符流适合读取纯文本文件

# File 类

java.io.File 类是专门对文件进行操作的类，只能对文件本身进行操作，不能对文件进行读和写（输入和输出）

File 类构造方法不会检验文件或文件夹是否真实存在，无论该路径下是否存在文件或目录，都不影响 File 对象的创建。

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
        // 就算文件1.txt不存在也不影响file对象的创建
        File f = new File("C:\\Users\\FF\\Desktop\\1.txt");
        if (!f.exists()) {
            System.out.println("是否创建:" + f.createNewFile()); // true 如果没有文件则创建并返回true
        }
        System.out.println("是否创建:" + f.createNewFile());  // 已经存在，所以就false了
        System.out.println("文件绝对路径:" + f.getAbsolutePath());
        System.out.println("文件构造路径:" + f.getPath());
        System.out.println("文件名称:" + f.getName());
        System.out.println("文件长度:" + f.length() + "字节");
        System.out.println("文件:" + f.isFile());
        System.out.println("目录:" + f.isDirectory());
    }

    @Test
    public void testDemo2() {
        // 目录的创建（使用相对路径）
        File f2 = new File("newDira");
        System.out.println("是否存在:" + f2.exists());  // false
        System.out.println("是否创建:" + f2.mkdir());    // true
        System.out.println("是否存在:" + f2.exists());  // true

        // 创建多级目录
        File f3 = new File("newDira\\newDirb");
        System.out.println(f3.mkdir());     // false，mkdir只能创建单层目录
        System.out.println(f3.mkdirs());    // true，mkdirs可以创建多级目录

        // 删除：目录必须为空才能删除
        System.out.println(f2.delete());    // false，目录不为空
        System.out.println(f3.delete());    // true，删除最底层目录
    }

    @Test
    public void demo3() {
        File file = new File("E:\\other\\study\\学习sp\\实用篇");
        printFile(file);
    }

    /**
     * 递归遍历目录下所有文件
     */
    public static void printFile(File file) {
        if (!file.isDirectory()) {
            return;
        }
        File[] files = file.listFiles();
        for (File f : files) {
            if (f.isDirectory()) {
                printFile(f);
            } else {
                System.out.println(f.getName());
            }
        }
    }
}
```

# IO 流详解

数据流向内存就是输入流，流出内存就是输出流

## FileOutputStream

```java
FileOutputStream outputStream = new FileOutputStream("abc.txt");
```

创建输出流对象时做了三件事：

1. 调用系统功能去创建文件（输出流对象才会自动创建）
2. 创建 outputStream 对象
3. 把 outputStream 对象指向这个文件

注意事项：

- 创建输出流对象时，如果没有这个文件，会创建该文件
- 如果有这个文件，会清空这个文件的数据
- 创建输入流对象时，文件不存在则会抛出 FileNotFoundException

追加数据构造方法：

- `public FileOutputStream(File file, boolean append)`
- `public FileOutputStream(String name, boolean append)` — true 表示追加数据

换行符说明：

- Windows 系统：回车+换行 `\r\n`
- Unix 系统：换行 `\n`
- Mac 系统（OS X 起）：换行 `\n`

## FileInputStream

流进内存的，输入流

```java
// 逐字节读取
int b;
while ((b = fis.read()) != -1) {
    System.out.print((char) b);
}

// 使用字节数组读取（效率更高）
int len;
byte[] bys = new byte[1024];
while ((len = fis.read(bys)) != -1) {
    System.out.println(new String(bys, 0, len));
}
```

## FileWriter

写出字符到文件的便利类（输出流）

关闭 close 和刷新 flush 的区别：

- flush：刷新缓冲区，流对象可以继续使用
- close：先刷新缓冲区，然后通知系统释放资源，流对象不可再使用

如果不关闭输出流，数据只是保存到缓冲区，并未保存到文件。

## 缓冲流

缓冲流原理：

1. 使用底层流对象从具体设备上获取数据，存储到缓冲区数组内
2. 通过缓冲区的 read() 方法获取具体字符数据，提高效率
3. readLine() 功能：读取到换行符时，将临时存储的数据转成字符串返回

在创建流对象时，会创建一个内置的默认大小的缓冲区数组，通过缓冲区读写，减少系统 IO 次数，从而提高读写效率。

| 类型       | 输入流              | 输出流               |
| ---------- | ------------------- | -------------------- |
| 字节缓冲流 | BufferedInputStream | BufferedOutputStream |
| 字符缓冲流 | BufferedReader      | BufferedWriter       |

BufferedReader 特有方法：

- `public String readLine()` — 读一行数据，读取到最后返回 null

BufferedWriter 特有方法：

- `public void newLine()` — 换行，由系统属性定义符号

## 转换流

编码与解码：

- 编码：字符（能看懂的）→ 字节（看不懂的）`String → byte[]`
- 解码：字节（看不懂的）→ 字符（能看懂的）`byte[] → String`

```java
// 通过指定的字符集解码字节数组
new String(byte[] bytes, String charsetName)

// 使用指定的字符集合把字符串编码为字节数组
byte[] getBytes(String charsetName)
```

转换流 java.io.InputStreamReader 是 Reader 的子类，从字节流到字符流的桥梁。它读取字节，并使用指定的字符集将其解码为字符。

```java
// 使用默认字符集
InputStreamReader isr = new InputStreamReader(new FileInputStream("in.txt"));

// 指定GBK编码
InputStreamReader isr2 = new InputStreamReader(new FileInputStream("in.txt"), "GBK");
```

# 实战案例

## 字节流写入

```java
// 写出字节
FileOutputStream fos = new FileOutputStream("a.txt", true); // true追加数据
fos.write(97);                        // 写出单个字节，97对应'a'
fos.write("我要吃汉堡".getBytes());    // 写出字节数组
fos.close();

// 写出指定长度字节数组
FileOutputStream fos2 = new FileOutputStream("a2.txt");
byte[] b = "abcde".getBytes();
fos2.write(b, 2, 2);  // 从索引2开始，写出2个字节，即"cd"
fos2.close();

// 写出字节数组并换行
FileOutputStream fos3 = new FileOutputStream("fos.txt");
byte[] words = {97, 98, 99, 100, 101};
for (int i = 0; i < words.length; i++) {
    fos3.write(words[i]);
    fos3.write("\r\n".getBytes());
}
fos3.close();
```

## 图片复制

```java
FileInputStream fis = new FileInputStream("C:\\Users\\FF\\Desktop\\6.png");
FileOutputStream fos = new FileOutputStream("1.png");
byte[] b = new byte[1024];
int len;
while ((len = fis.read(b)) != -1) {
    fos.write(b, 0, len);
}
fos.close();
fis.close();
```

## 字符流复制文本

```java
FileWriter fileWriter = new FileWriter("66.md");
FileReader fileReader = new FileReader("E:\\后端代码接收解析.md");
char[] c = new char[1024];
int len;
while ((len = fileReader.read(c)) != -1) {
    fileWriter.write(c, 0, len);
}
fileWriter.flush();
fileWriter.close();
fileReader.close();
```

## 缓冲流效率对比

```java
// 普通流复制（约33000毫秒）
FileOutputStream fos = new FileOutputStream("ps2015.zip");
FileInputStream fis = new FileInputStream("E:\\other\\装机必备软件\\必备软件\\ps2015.zip");
byte[] bytes = new byte[1024];
int len;
while ((len = fis.read(bytes)) != -1) {
    fos.write(bytes, 0, len);
}
fis.close();
fos.close();

// 缓冲流复制（约4314毫秒）
BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream("ps2015.zip"));
BufferedInputStream bis = new BufferedInputStream(new FileInputStream("E:\\other\\装机必备软件\\必备软件\\ps2015.zip"));
byte[] bytes2 = new byte[1024];
int len2;
while ((len2 = bis.read(bytes2)) != -1) {
    bos.write(bytes2, 0, len2);
}
bis.close();
bos.close();
```

## BufferedReader 读取一行

```java
BufferedReader br = new BufferedReader(new FileReader("b.txt"));
String len;
while ((len = br.readLine()) != null) {
    System.out.println(len);
}
br.close();
```

## 转换流解决乱码

```java
// 文件为GBK编码，使用UTF-8读取会乱码
String fileName = "C:\\Users\\FF\\Desktop\\1.txt";

// 默认UTF8编码读取（乱码）
InputStreamReader isr = new InputStreamReader(new FileInputStream(fileName));

// 指定GBK编码读取（正常）
InputStreamReader isr2 = new InputStreamReader(new FileInputStream(fileName), "GBK");

int read;
while ((read = isr2.read()) != -1) {
    System.out.print((char) read);
}
isr2.close();
```
