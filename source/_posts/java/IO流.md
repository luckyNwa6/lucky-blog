---
title: IO流
cover: "https://luckynwa.top/mypic/blog/ioIcon.png"
description: IO流相关的学习笔记
categories: Java
tags: IO
comments: false
abbrlink: 13712
date: 2023-08-10 11:22:21
---

# 概念

IO 流：按照流动的方向，以内存为基准，分为输入 input 和输出 output ，即流向内存是输入流，流出内存的输出流

（1）明确要操作的数据是数据源还是数据目的(也就是要读还是要写)
（2）明确要操作的设备上的数据是字节还是文本
（3）明确数据所在的具体设备
（4）明确是否需要额外功能（比如是否需要转换流、高效流等）

输入流（读数据）、输出流（写数据）

分类：

1.字节流：字节流又分为字节输入流、字节输出流 2.字符流：字符流由分为字符输入流、字符输出流

字符流的由来：因为数据编码的不同，字节流直接读中文会乱码 字符流 = 字节流 + 编码表

# File 类

java.io.File 类是专门对文件进行操作的类，只能对文件本身进行操作，不能对文件进行读和写也就是输入和输出

File 类构造方法不会给你检验这个文件或文件夹是否真实存在，因此无论该路径下是否存在文件或者目录，都不影响 File 对象的创建。

下面一个测试类

```JAVA
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

# IO 流

数据流向内存就是输入流，流出内存就是输出流，根据数据的类型分为

字节流和字符流，如名字的为单位

字节流对应的输入流 InputStream 输出流 OutputStream

字符流对应的输入流 Reader 输出流 Writer

超类（父类）以这四个名称结尾都是它的子类

比如常见的 FileInputStream 文件输入流

1 个字符=2 个字节

字节流适合读取视频、音乐、图片等二进制文件，字符流比较适合读取纯文本文件

字节流可以传输任意文件数据。在操作流的时候，我们要时刻明确，无论使用什么样的流对象，底层传输的始终为二进制数据

## FileOutputStream

```java
FileOutputStream outputStream = new FileOutputStream("abc.txt");
这行代码做了下面的事情
1、调用系统功能去创建文件【输出流对象才会自动创建】
2、创建outputStream对象
3、把foutputStream对象指向这个文件
```

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

## FileInputStream

流进内存的，输入流

1、 **FileInputStream(File file)**： 通过打开与实际文件的连接来创建一个 FileInputStream ，该文件由文件系统中的 File 对象 file 命名。
2、 **FileInputStream(String name)**： 通过打开与实际文件的连接来创建一个 FileInputStream ，该文件由文件系统中的路径名 name 命名。

当你创建一个输入流对象时，必须传一个文件路径。该路径下，如果没有该文件,会抛出 FileNotFoundException

使用字节数组读取：read(byte[] b) 效率更高

```JAVA
            int len = 0 ;
            byte[] bys = new byte[1024];
            while ((len = inputStream.read(bys)) != -1) {
                System.out.println(new String(bys,0,len));//len输出有效的字节数
```

## Reader

字符输入流的所有类的超类 输入流

## FileWriter

写出字符到文件的便利类 输出流

//关闭资源时,与 FileOutputStream 不同。 如果不关闭,数据只是保存到缓冲区，并未保存到文件。

// fw.close();

关闭 close 和刷新 flush
因为内置缓冲区的原因，如果不关闭输出流，无法写出字符到文件中。但是关闭的流对象，是无法继续写出数据的。如果我们既想写出数据，又想继续使用流，就需要 flush 方法了。

flush ：刷新缓冲区，流对象可以继续使用。清空缓冲区的数据流
close:先刷新缓冲区，然后通知系统释放资源。流对象不可以再被使用了。

## 缓冲流

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

## 转换流

简单一点的说就是：

编码:字符(能看懂的)–字节(看不懂的)

解码:字节(看不懂的)–>字符(能看懂的)

```
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

```
InputStreamReader isr = new InputStreamReader(new FileInputStream("in.txt"));
InputStreamReader isr2 = new InputStreamReader(new FileInputStream("in.txt") , "GBK");
```

**OutputStreamWriter**同理

# 案例 1

```JAVA
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

# 案例 2

```JAVA
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
