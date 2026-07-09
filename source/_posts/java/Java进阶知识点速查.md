---
title: Java进阶知识点速查
cover: https://imgs.luckynwa.top/profile/yys/806.webp
description: 青，取之于蓝，而青于蓝
categories: 后端
tags: Java
comments: true
abbrlink: java562
summary: >-
  本文整理了Java进阶核心面试题，涵盖数据结构与集合框架、JVM内存模型、数据库基础与范式设计、Spring核心注解与AOP、JDBC与连接池、IO流、网络编程、多线程等高频面试知识点，适合面试前快速复习。
date: 2024-01-01 11:22:21
---

## 一、数据结构

Java 的 `java.util` 包中提供了许多数据结构的实现，配合集合框架进行理解。

### Q1：Java 中常见的数据结构有哪些？

- **数组（Array）**：固定大小，存储相同类型的元素，需要一块连续的内存空间来存储元素，而这块内存空间的大小是根据元素类型确定的。随机访问时具有高效性（连续的内存空间 O(1) 的时间复杂度内访问任何元素；预先计算索引，无需遍历；现代计算机体系结构中的缓存系统通常会以缓存行为单位，访问一个元素时候很可能获取相邻的元素，提高了访问效率）

- **列表（List）**：动态数组，可变大小，如 ArrayList 和 LinkedList
- **集合（Set）**：用于存储不重复的元素，常见的实现有 HashSet 和 TreeSet
- **映射（Map）**：用于存储键值对，常见的实现有 HashMap 和 TreeMap
- **栈（Stack）**：后进先出（LIFO）的数据结构，只允许在栈顶进行插入和删除操作
- **队列（Queue）**：先进先出（FIFO）的数据结构，可以在队尾进行插入操作，在队首进行删除操作。Java 提供了 Queue 接口以及其实现类，如 LinkedList 和 PriorityQueue
- **树（Tree）**：层次结构的数据结构，由节点和边组成。Java 提供了多种树的实现，如二叉树、红黑树等
- **图（Graph）**：由节点和边组成的非线性数据结构，用于表示元素之间的关系。Java 提供了图的实现，如有向图和无向图

### Q2：ArrayList 和 LinkedList 的区别？

**ArrayList：**

- **特点：** 动态数组，可变大小
- **优点：** 高效的随机访问和快速尾部插入
- **缺点：** 中间插入和删除相对较慢

**LinkedList：**

- **特点：** 双向链表，元素之间通过指针连接
- **优点：** 插入和删除元素高效，迭代器性能好
- **缺点：** 随机访问相对较慢

### Q3：HashSet 和 TreeSet 的区别？

```java
Set<String> hashSet = new HashSet<>();
Set<Integer> treeSet = new TreeSet<>();
```

**HashSet：**

- **特点：** 无序集合，基于 HashMap 实现
- **优点：** 高效的查找和插入操作
- **缺点：** 不保证顺序

**TreeSet：**

- **特点：** 有序集合，底层基于红黑树实现，不允许重复元素
- **优点：** 提供自动排序功能，适用于需要按顺序存储元素的场景
- **缺点：** 性能相对较差，不允许插入 null 元素

### Q4：HashMap 和 TreeMap 的区别？

```java
Map<String, Integer> hashMap = new HashMap<>();
Map<String, Integer> treeMap = new TreeMap<>();
```

**HashMap：**

- **特点：** 基于哈希表实现的键值对存储结构
- **优点：** 高效的查找、插入和删除操作
- **缺点：** 无序，不保证顺序

**TreeMap：**

- **特点：** 基于红黑树实现的有序键值对存储结构
- **优点：** 有序，支持按照键的顺序遍历
- **缺点：** 插入和删除相对较慢

### Q5：什么是栈（Stack）？有什么特点？

栈（Stack）是一种线性数据结构，它按照后进先出（Last In, First Out，LIFO）的原则管理元素。在栈中，新元素被添加到栈的顶部，而只能从栈的顶部移除元素。这就意味着最后添加的元素是第一个被移除的。

```java
Stack<Integer> stack = new Stack<>();
```

### Q6：什么是堆（Heap）？

堆（Heap）是优先队列的基础，可以实现最大堆和最小堆。

```java
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
```

### Q7：TreeNode 的基本结构是什么？

Java 提供了 TreeNode 类型，可以用于构建二叉树等数据结构。

```java
class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int x) { val = x; }
}
```

## 二、集合框架

### Q8：Java 集合框架的体系结构是怎样的？

整个集合框架围绕一组标准接口而设计。你可以直接使用这些接口的标准实现，诸如 `LinkedList`、`HashSet` 和 `TreeSet` 等。

![](https://imgs.luckynwa.top/profile/mdS/java10.png)

**Collection** 接口有 3 种子类型，List、Set 和 Queue，再下面是一些抽象类，最后是具体实现类，常用的有 `ArrayList`、`LinkedList`、`HashSet`、`LinkedHashSet`、`HashMap`、`LinkedHashMap` 等。

- **接口：** 是代表集合的抽象数据类型。例如 Collection、List、Set、Map 等。之所以定义多个接口，是为了以不同的方式操作集合对象
- **实现（类）：** 是集合接口的具体实现。从本质上讲，它们是可重复使用的数据结构，例如：ArrayList、LinkedList、HashSet、HashMap
- **算法：** 是实现集合接口的对象里的方法执行的一些有用的计算，例如：搜索和排序，这些算法实现了多态，那是因为相同的方法可以在相似的接口上有着不同的实现

### Q9：Collections 和 Collection 有什么区别？

- **Collection** 是集合接口，List、Set、Queue 都继承自它
- **Collections** 是工具类，提供了对集合进行排序、遍历等各种算法实现

## 三、日志

### Q10：SpringBoot 默认的日志组合是什么？

**SpringBoot 默认 SLF4J + LogBack 的组合。**

```java
public class LuckyTest {
    private static final Logger logger = Logger.getLogger(Main.class.getName());
    @Test
    public void test1() {
        // 设置日志级别为 SEVERE，只输出比警告级别更严重的日志消息
        logger.setLevel(Level.SEVERE);

        // 输出不同级别的日志消息
        logger.severe("This is a severe message.");   // 输出
        logger.warning("This is a warning message."); // 不输出
        logger.info("This is an info message.");       // 不输出
    }
}
```

### Q11：如何通过 Yml 配置日志生成到本地？

```yaml
logging:
  file: D:/lucky.log # 不指定的情况下默认生成在项目根目录，按照配置生成所需的日志名称
  path: output/logs # 按照默认的名称spring.log，生成到指定路径及日志。
```

## 四、JVM

### Q12：JVM 中堆与栈的区别？

- **寄存器：** 最快的存储区，由编译器根据需求进行分配，我们在程序中无法控制
- **栈：** 存放基本类型的变量数据和对象的引用，对象本身不存放在栈中，而存放在堆（new 出来的对象）或者常量池中（字符串常量存放在常量池中）
- **堆：** 存放所有 new 出来的对象
- **静态域（属于方法区）：** 存放静态成员（static 定义的）
- **常量池（属于方法区）：** 存放字符串常量和基本类型常量（public static final）
- **非 RAM 存储：** 硬盘等永久存储空间

普通数据类型里的变量名放在栈里面，数据放堆里面。

## 五、字节与数据库

### Q13：字节和位的关系是什么？

1 字节（byte）= 8 位（bit）。数据存储是以字节为单位，数据传输大多是以位为单位。

### Q14：MySQL 中 int 类型的长度是多少？

int 永远是 4 字节也就是 32 位，TINYINT 是 1 字节。int 存储数值的范围是：-2^31 至 2^31-1（即 -2147483648 至 2147483647 之间的所有正负整数），所以 int 是不需要指定长度的。

varchar 里的长度是字节也是最大字节，会自适应实际的长度。正常一个汉字占 2 个字节可能是 4，一个字母占 1 字节不分大小写。

### Q15：SQL 的基本操作有哪些？

```sql
-- 查
SELECT * FROM 表名 WHERE 条件
-- 删
DELETE FROM 表名 WHERE 条件
-- 改
UPDATE 表名 SET 字段1=对应值1,..  WHERE 条件
-- 增
INSERT INTO 表名(字段1,字段2..) VALUES(对应值1,对应值2...)
```

查和删不加条件，则全部查找、删除；增也可以不加字段，直接 values 对应上值也行，而且也可以插入多条，直接 values 后面再逗号继续插入值。多表查的时候有共同的字段，需要声明一下是哪个表里面的。MySQL 里运行不区分大小写，尽量都大写。

`HAVING` 是分组之后加的条件。

### Q16：数据库有哪些分类？

- **关系型数据库**（表格的方式，表和表的关系）：MySQL、Oracle
- **对象数据库**：SE
- **键值对数据库**：Redis、HBase、Hadoop

按数据容量分类：大（Oracle）、中（MySQL）、小（Excel、Access、SQLite）

### Q17：SQL 的分类有哪些？

- **DDL（数据定义语言）：** 用来创建表、删除表、修改表（视图、触发器）等，如 create
- **DML（数据操作语言）：** insert、update、delete
- **DCL（数据控制语言）：** use database、权限赋值、超级管理员、root 用户

## 六、六大范式

### Q18：什么是数据库的第一范式（1NF）？

第一范式强调属性的原子性，即属性不可再分。**不允许表中还有表**，一个字段只存储一项信息。

比如学生表中，字段"家庭地址"包含省市区这些值，这些值也可以看出一张表，所以不满足 1NF。

### Q19：什么是第二范式（2NF）？

第二范式就是在第一范式的基础上，属性完全依赖于主键。即消除非主属性对码的部分函数依赖。

```
学号 姓名  课程  班级 分数
1    小嗯  语文  1班  99
1    小嗯  数学  1班  98
2    小维  语文  2班  97
2    小维  科学  2班  100
```

可以看出：(课程) → (分数)，(学号) → (姓名, 班级)。其中 **学号和课程组成主键**，这属于部分函数依赖，不满足 2NF，需要拆成 2 张表即可满足。

**关键概念：**

1. **元组：** 表中的一行就是一个元组
2. **码：** 一个表中，可以唯一决定一个元组的属性"集合"
3. **主属性：** 码里面的属性就是主属性
4. **部分函数依赖：** 比如 Z=X+Y，输入一个 X 不知道 Y 无法得到 Z，而 Z=X 就是部分函数依赖

### Q20：什么是第三范式（3NF）？

第三范式在 2NF 的基础上，消除了非主属性对于码的传递函数依赖。即如果存在非主属性对于码的传递函数依赖，则不符合 3NF。

```
订单id  商品id  商品尺寸
1        1      22
```

可以看出主键订单 id 满足第二范式，但商品 id 依赖订单 id，商品尺寸依赖商品 id，属于传递函数依赖，不满足 3NF。分成 2 张表即可满足。

## 七、Spring

### Q21：Spring 是什么？

Spring 是轻量级企业应用开发框架，是 IoC 和 AOP 的容器框架，全能具备 MVC 三层功能，不替换任何框架而是来整合 N 框架。

### Q22：Spring 中常用的注解有哪些？

- **`@Component`：** 类似于给需要注解这个的类 new 了一下，可以给 `('变量名')` 默认小驼峰
- **`@Controller`：** 收发功能，@Component+
- **`@Service`：** @Component+

### Q23：什么是自定义注解？

`@interface` 形式（`public @interface A`），没有 `@` 的时候是接口，有 `@` 时候只能裸这种形式，自动继承了 `java.lang.annotation.Annotation` 接口，这是自定义了一个注解 A。

### Q24：注解相关的元注解有哪些？

- **`@Target`：** 说明了 Annotation 所修饰的对象范围，取值有：CONSTRUCTOR（构造器）、FIELD（域）、LOCAL_VARIABLE（局部变量）、METHOD（方法）、PACKAGE（包）、PARAMETER（参数）、TYPE（类、接口或 enum 声明）
- **`@Documented`：** 修饰的注解生成 JavaDoc 文档时会显示
- **`@Retention`：** 注解的生命周期，SOURCE < CLASS < RUNTIME
- **`@Retention(RetentionPolicy.RUNTIME)`：** 注解不仅被保存到 class 文件中，JVM 加载 class 文件之后仍然存在

### Q25：AOP 的核心注解有哪些？

- **`@Aspect`：** 标识为一个切面供容器读取，作用于类
- **`@Pointcut`：** 切入点，就是带有通知的连接点
- **`@Before`：** 前置通知
- **`@AfterThrowing`：** 异常抛出通知
- **`@After`：** 后置通知
- **`@AfterReturning`：** 后置增强，执行顺序在 @After 之后
- **`@Around`：** 环绕通知

### Q26：AOP 的使用场景有哪些？切点表达式怎么写？

**使用场景：** 异常、安全、日志、权限、事务

**位置：** 前置、后置、环绕、异常、最终

**切点表达式：**

```java
execution(public * *(..))              // 任意的公共方法
execution(* set*(..))                  // 以 set 开头的所有方法
execution(* com.LoggerApply.*(..))     // com.LoggerApply 这个类里的所有方法
execution(* com.annotation.*.*(..))    // com.annotation 包下的所有类的所有方法
execution(* com.annotation..*.*(..))   // com.annotation 包及子包下所有类的所有方法
execution(* com.annotation..*.*(String,?,Long))  // 有三个参数，第一个 String，第二个任意，第三个 Long
```

## 八、配置类与 YAML

### Q27：如何通过 @ConfigurationProperties 读取 yml 配置？

**application.yml 配置：**

```yaml
lucky:
  jwt:
    secret: xxxxxxxxxxxxxxxxxxx
```

**配置类：**

```java
@ConfigurationProperties(prefix = "lucky.jwt")
@Component
@Data
@AllArgsConstructor
@NoArgsConstructor
public class YamlConfig {
    private String secret;

    public String generateToken() {
        return secret;
    }
}
```

### Q28：如何在单元测试中读取配置？

```java
@Slf4j                        // 日志注解
@RunWith(SpringRunner.class)   // 获取上下文
@SpringBootTest               // SpringBoot 测试注解
public class ReadConfig {
    @Autowired
    private YamlConfig yamlConfig;

    @Test
    public void fun1() {
        String secret = yamlConfig.getSecret();
        System.out.println(secret);
    }
}
```

### Q29：如何通过工具类读取 YAML 配置？

**依赖：**

```xml
<dependency>
    <groupId>org.yaml</groupId>
    <artifactId>snakeyaml</artifactId>
    <version>1.29</version>
</dependency>
```

**工具类（单例模式）：**

```java
public class YamlUtils {
    private static YamlUtils instance;
    private Map<String, Object> jwtConfig;

    private YamlUtils() {
        loadConfig();
    }

    public static synchronized YamlUtils getInstance() {
        if (instance == null) {
            instance = new YamlUtils();
        }
        return instance;
    }

    private void loadConfig() {
        Yaml yaml = new Yaml();
        try (InputStream inputStream = YamlUtils.class.getClassLoader().getResourceAsStream("application.yml")) {
            Map<String, Object> config = yaml.load(inputStream);
            Map<String, Object> customConfig = (Map<String, Object>) config.get("custom");
            jwtConfig = (Map<String, Object>) customConfig.get("jwt");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getJwtSecret() {
        return (String) jwtConfig.get("secret");
    }

    public int getJwtExpireDate() {
        return (int) jwtConfig.get("expire");
    }
}
```

**调用：**

```java
YamlUtils config = YamlUtils.getInstance();
String tokenSecret = config.getJwtSecret();
Integer expireDate = config.getJwtExpireDate();
```

## 九、JDBC

### Q30：JDBC 是什么？如何使用？

JDBC 是 Java 处理数据库的一种技术，其中包含大量的类和接口等 API，及连接 DB 驱动程序。

**使用步骤：**

1. 加载驱动，得到连接（不同数据库有不同的驱动类）
2. 建立连接
3. 编写 SQL 语句
4. 得到执行者对象
5. 执行：查询返回虚拟的表，增删改返回行数（int 即可）
6. 处理结果
7. 释放资源

## 十、连接池

### Q31：什么是连接池？为什么需要连接池？

自己的程序如果用户量大，都会进行 JDBC 操作，性能很低，需要优化。解决方案：预先建立多个连接（conn），有需要自己从池中获取。若只有一个 conn，无法满足应用使用，要排队，响应速度慢。多建几个 conn 就是连接池，这是池化的概念。

**流程：**

1. 建立 10 个连接
2. 从连接池获得 conn
3. 操作结束后，将 conn 返回给连接池

空闲时连接对象就是浪费，可设置 6 个活动、4 个不活动。

### Q32：什么是单例模式？在连接池中有什么应用？

一个应用里只要一个对象，性能提升。不能 new → 构造方法设为 private，提供一个共有方法返回对象，这就是单例模式。

第三方连接池有 c3p0、dbcp。

## 十一、IO 流

### Q33：什么是 IO 流？

IO 流就是指读写文件的技术。I 是 input 输入流，O 是 output 输出流，用一句话记忆就是：**输入到内存再从内存输出到硬盘**。针对的是内存而言。

### Q34：如何查找文件夹里的所有文件？

```java
public class Test {
    public static void main(String[] args) {
        String path = "D:\\workspace";
        File file = new File(path);
        printFile(file);
    }

    public static void printFile(File file) {
        File[] files = file.listFiles();
        for (File a : files) {
            if (a.isFile()) {
                System.out.println(a.getName());
            } else {
                printFile(a);
            }
        }
    }
}
```

### Q35：如何实现文件拷贝？

```java
public class Test {
    public static void main(String[] args) {
        try {
            File file1 = new File("D:\\workspace\\a.txt");  // 源文件
            long flen = file1.length();
            System.out.println("源文件的大小是" + flen + "字节");
            FileInputStream fis = new FileInputStream(file1);
            File file2 = new File("D:\\workspace\\b.txt");  // 复制到的地方
            FileOutputStream fos = new FileOutputStream(file2);
            byte[] bytes = new byte[1024];  // 1兆1兆传
            int len = 0;
            long readSize = 0;

            while ((len = fis.read(bytes)) != -1) {  // -1 就是最后一个结束
                fos.write(bytes, 0, len);  // 比如一个文件是 1024*8+244，那么 len 就是 244
                fos.flush();  // 强制输出，推送数据
                readSize += len;
                if (readSize == flen) {
                    break;
                }
            }
            System.out.println("读的大小" + readSize + "字节");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

## 十二、网络编程

### Q36：什么是协议、IP 和端口？

- **协议：** 双方约定好的规则
- **HTTP：** 默认端口 80
- **FTP：** 默认端口 21（文件传输）
- **Telnet：** 默认端口 22（网络聊天）
- **SMTP/POP3：** 邮件

### Q37：Socket 是什么？客户端和服务端分别用什么？

客户端用 `Socket` 发送数据，服务端用 `ServerSocket`，本机地址可以用 `127.0.0.1` 或 `localhost`。

Socket 此类实现客户端套接字（也可以就叫"套接字"），套接字是两台机器间通信的端点。

### Q38：TCP 三次握手和四次挥手是什么？

**三次握手：**

1. Client 发送 SYN 500 → Server
2. Server 发送 SYN 600 + ACK 确认号 500+1 给客户端
3. 客户端再发 ACK 600+1 给服务器

**四次挥手：** qq 正在下载东西，点击关闭发送给服务器，服务器发出一个提示框正在下载东西是否确定退出，点确定后，服务器再关闭一下其他东西，再发送可以关闭了，客户端发关闭了。

### Q39：字符串拼接有什么性能问题？

字符串拼接很浪费资源，每个字符串相加就是一个对象开辟，可以使用 `StringBuffer` 和 `StringBuilder` 类解决性能问题（不解决拼接问题）。JSON 数据格式作为通讯协议。

`JSONObject cannot be cast to com.nwa.bean.Tbaccount` 异常：不能强制转换，必须是继承关系的类。

## 十三、多线程

### Q40：线程的实现方法有哪些？

```java
extends Thread
implements Runnable
implements Callable
```

### Q41：线程的状态有哪些？

新建 `new` → 就绪 `start` → 运行 `run` → 死亡 `stop` → 等待 `wait`（对应唤醒 `notify`）→ 挂起 `suspend`（对应恢复 `resume`，已被反对）→ 睡眠 `sleep`

`t.start()` 线程启动处于就绪状态（不是 run，只有 CPU 分配到才运行）。

运行中的线程会出现阻塞问题：IO 非 IO 阻塞（sleep、wait 等待/唤醒、挂起 suspend/恢复 resume）。

### Q42：什么是线程安全问题？

面试题线程安全，讲买票场景：模拟 3 个人连续购买 10 张票，每买一张耗时 1-3s，假设一共 5 张票。全局和静态变量引起线程安全问题。

### Q43：什么是生产者-消费者模型？

生产者-消费者模型：仓库状态满时消费者消费，空时生产者生产。

- **仓库类：** 状态 1/0、货物编号、入库/出库
- **消费者类：** 消费（到仓库取货——出库）
- **生产者类：** 生产（给仓库入库）
