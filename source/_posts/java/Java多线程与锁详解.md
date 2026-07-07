---
title: Java多线程与锁详解
description: 生当作人杰，死亦为鬼雄
cover: https://cloud.luckynwa.top/profile/yys/193.webp
categories: 后端
tags: Java
comments: true
abbrlink: java5
summary: >-
  本文总结了Java多线程与锁的核心知识。详解synchronized两种加锁方式（代码块锁共享对象、实例方法锁this）及wait/notify机制。讲解线程创建方式、生命周期、常用方法。锁的部分涵盖锁的六大分类（乐观/悲观、独占/共享、公平/非公平、可重入、自旋/阻塞、偏向/轻量/重量）、synchronized底层原理（Monitor、Mark Word、锁升级）、volatile可见性与有序性、CAS原子操作、Lock接口（ReentrantLock、ReadWriteLock）与AQS原理。面试篇精选synchronized与Lock区别、volatile原理、线程池参数与执行流程、死锁条件与避免、ThreadLocal原理等高频考点。
date: 2024-08-29 08:48:13
---

## synchronized关键字

`synchronized` 是 Java 中用于实现线程同步的关键字。它可以用于修饰代码块或方法，确保在同一时间只有一个线程可以访问被 `synchronized` 修饰的代码块或方法。

任何一个对象都有"一把锁"

### 加锁地方1：同步代码块

synchronized 写在块级内容上的格式：

```java
synchronized(多线程共享对象) {
    线程同步代码块
}
// 共享的一般是 this，指的是这个类的实例
```

### 加锁地方2：实例方法

synchronized 出现在实例方法上，一定锁的是 `this`

### 执行流程

1. 假设 t1 和 t2 线程并发，开始执行时肯定有一个先一个后
2. 假设 t1 先执行，遇到 synchronized，自动找"后面共享对象"的对象锁，找到后占有这把锁，执行同步代码块，直到代码结束才释放锁
3. 假设 t1 已经占有锁，t2 也遇到 synchronized，也会去占有这把锁，但锁被 t1 占有，t2 只能在外面等待，直到 t1 执行结束归还锁
4. 这样就达到了线程排队执行

### 静态方法加锁

```java
public static synchronized void method() {
    // 锁的是当前类的Class对象，而不是this
}
```

## wait和notify

wait 和 notify 方法**不是线程对象的方法**，是 java 中任何一个对象都有的方法，因为这两个方法是 `Object类中自带` 的

```java
// 线程1执行
synchronized(lock) {
    while(condition不满足) {
        lock.wait();    // 释放锁，进入等待队列
    }
    // 执行业务逻辑
}

// 线程2执行
synchronized(lock) {
    // 修改condition
    lock.notify();     // 唤醒等待队列中的一个线程
    // 或 lock.notifyAll(); 唤醒所有等待线程
}
```

**注意**：wait和notify必须在synchronized块内调用，否则会抛出IllegalMonitorStateException

## 线程基础

### 线程的创建方式

```java
// 1. 继承Thread
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("线程执行");
    }
}
new MyThread().start();

// 2. 实现Runnable（推荐）
Runnable task = () -> System.out.println("线程执行");
new Thread(task).start();

// 3. 实现Callable + FutureTask（有返回值）
Callable<Integer> callable = () -> {
    Thread.sleep(1000);
    return 100;
};
FutureTask<Integer> future = new FutureTask<>(callable);
new Thread(future).start();
Integer result = future.get();  // 阻塞获取结果

// 4. 线程池（推荐）
ExecutorService executor = Executors.newFixedThreadPool(5);
executor.submit(() -> System.out.println("线程执行"));
executor.shutdown();
```

### 线程生命周期

```
新建（New）→ 就绪（Runnable）→ 运行（Running）→ 死亡（Dead）
                  ↓                    ↓
                阻塞（Blocked）←-------→
```

- **新建**：new Thread()后进入新建状态
- **就绪**：调用start()后进入就绪状态，等待CPU调度
- **运行**：获得CPU时间片，执行run()方法
- **阻塞**：sleep()、wait()、等待锁等进入阻塞状态
- **死亡**：run()执行完毕或异常退出

### Thread常用方法

| 方法               | 说明                           |
| ------------------ | ------------------------------ |
| `sleep(long ms)`   | 当前线程休眠指定毫秒，不释放锁 |
| `join()`           | 等待该线程执行完毕             |
| `yield()`          | 让出CPU时间片，回到就绪状态    |
| `interrupt()`      | 中断线程                       |
| `setPriority(int)` | 设置线程优先级（1-10）         |
| `isAlive()`        | 判断线程是否存活               |

## 锁的分类大全

### 按乐观/悲观分类

| 类型   | 说明                           | 代表                        |
| ------ | ------------------------------ | --------------------------- |
| 悲观锁 | 假设会发生冲突，每次访问都加锁 | synchronized、ReentrantLock |
| 乐观锁 | 假设不会冲突，更新时才检查     | CAS、版本号机制             |

### 按独占/共享分类

| 类型   | 说明                   | 代表                                               |
| ------ | ---------------------- | -------------------------------------------------- |
| 独占锁 | 一次只能被一个线程持有 | synchronized、ReentrantLock                        |
| 共享锁 | 可以被多个线程同时持有 | ReadDownLatch、CountDownLatch、ReadWriteLock的读锁 |

### 按公平/非公平分类

| 类型     | 说明                   | 代表                               |
| -------- | ---------------------- | ---------------------------------- |
| 公平锁   | 按照线程请求顺序获取锁 | ReentrantLock(true)                |
| 非公平锁 | 线程可以插队获取锁     | synchronized、ReentrantLock(false) |

### 按可重入/不可重入分类

| 类型       | 说明                         | 代表                        |
| ---------- | ---------------------------- | --------------------------- |
| 可重入锁   | 同一线程可以多次获取同一把锁 | synchronized、ReentrantLock |
| 不可重入锁 | 同一线程不能重复获取         | 自旋锁（部分实现）          |

### 按自旋/阻塞分类

| 类型   | 说明                 | 代表                                  |
| ------ | -------------------- | ------------------------------------- |
| 自旋锁 | 获取不到锁时循环重试 | CAS、TicketLock                       |
| 阻塞锁 | 获取不到锁时线程挂起 | synchronized（重量级）、ReentrantLock |

### 按偏向/轻量/重量分类（synchronized升级）

| 锁状态   | 适用场景       | 实现方式                  |
| -------- | -------------- | ------------------------- |
| 偏向锁   | 单线程访问     | 在Mark Word中记录线程ID   |
| 轻量级锁 | 线程交替访问   | CAS + Mark Word复制到栈帧 |
| 重量级锁 | 多线程同时竞争 | Monitor监视器锁           |

## 锁机制详解

### synchronized底层原理

synchronized基于**Monitor监视器锁**实现：

- 每个对象都有一个关联的Monitor
- 进入同步块时，执行monitorenter指令，获取Monitor
- 退出同步块时，执行monitorexit指令，释放Monitor

**对象头Mark Word结构**（64位JVM）：

| 锁状态   | Mark Word内容             | 标志位 |
| -------- | ------------------------- | ------ |
| 无锁     | hashCode + 分代年龄       | 01     |
| 偏向锁   | 线程ID + epoch + 分代年龄 | 01     |
| 轻量级锁 | 指向栈中锁记录的指针      | 00     |
| 重量级锁 | 指向Monitor的指针         | 10     |
| GC标记   | 空                        | 11     |

### 锁升级过程

**无锁 → 偏向锁 → 轻量级锁 → 重量级锁**（只能升级不能降级）

1. **偏向锁**：只有一个线程访问时，在Mark Word中记录线程ID，下次同一线程访问时无需竞争
2. **轻量级锁**：多个线程交替访问时，通过CAS将Mark Word复制到线程栈帧中
3. **重量级锁**：多个线程同时访问时，膨胀为重量级锁，未获取锁的线程阻塞等待

### volatile关键字

```java
private volatile boolean flag = true;
```

**特性**：

- **可见性**：一个线程修改后，其他线程立即可见
- **有序性**：禁止指令重排序
- **不保证原子性**：如i++不是原子操作

**底层原理**：通过内存屏障（Memory Barrier）实现，写操作后会刷新到主内存，读操作会从主内存读取

### CAS（Compare And Swap）

CAS是一种无锁的原子操作，包含三个操作数：

- **V**：要更新的变量
- **E**：预期值
- **N**：新值

只有V == E时，才将V更新为N，否则不更新。AtomicInteger等原子类底层使用CAS

**CAS问题**：

- **ABA问题**：值从A改为B再改回A，CAS会认为没变化。解决：使用AtomicStampedReference添加版本号
- **自旋开销**：竞争激烈时，CAS会一直自旋消耗CPU
- **只能保证一个变量的原子操作**

### Lock接口

```java
ReentrantLock lock = new ReentrantLock();
lock.lock();
try {
    // 业务逻辑
} finally {
    lock.unlock();
}
```

**ReentrantLock vs synchronized**：

| 特性     | synchronized | ReentrantLock   |
| -------- | ------------ | --------------- |
| 加锁方式 | 自动获取释放 | 手动lock/unlock |
| 公平性   | 非公平       | 可选公平/非公平 |
| 可中断   | 不可中断     | 可中断          |
| 条件变量 | 1个          | 多个Condition   |
| 底层实现 | JVM层面      | API层面（AQS）  |

### 读写锁（ReadWriteLock）

```java
ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();
rwLock.readLock().lock();     // 读锁：多个线程可同时持有
rwLock.writeLock().lock();    // 写锁：独占锁
```

**读写规则**：

- 读锁与读锁：兼容
- 读锁与写锁：互斥
- 写锁与写锁：互斥

## 线程池

### 核心参数

```java
ThreadPoolExecutor pool = new ThreadPoolExecutor(
    corePoolSize,      // 核心线程数
    maximumPoolSize,   // 最大线程数
    keepAliveTime,     // 空闲线程存活时间
    TimeUnit.SECONDS,  // 时间单位
    workQueue,         // 任务队列
    threadFactory,     // 线程工厂
    handler            // 拒绝策略
);
```

### 执行流程

```
提交任务 → 核心线程是否满？
              ↓ 否              ↓ 是
         创建核心线程执行    任务队列是否满？
                               ↓ 否              ↓ 是
                          加入队列等待      线程池是否满？
                                             ↓ 否              ↓ 是
                                        创建非核心线程    执行拒绝策略
```

### 常用线程池

```java
Executors.newFixedThreadPool(n);      // 固定线程数
Executors.newSingleThreadExecutor();  // 单线程
Executors.newCachedThreadPool();      // 缓存线程（按需创建）
Executors.newScheduledThreadPool(n);  // 定时线程池
```

**注意**：阿里规约建议使用ThreadPoolExecutor手动创建线程池，避免OOM

### 拒绝策略

| 策略                | 说明                 |
| ------------------- | -------------------- |
| AbortPolicy         | 抛出异常（默认）     |
| CallerRunsPolicy    | 由调用线程执行       |
| DiscardPolicy       | 静默丢弃             |
| DiscardOldestPolicy | 丢弃队列中最老的任务 |

## 面试题精选

### 1. synchronized和Lock的区别？

- synchronized是JVM层面的关键字，Lock是API层面的类
- synchronized自动释放锁，Lock需要手动unlock（建议在finally中释放）
- synchronized非公平锁，Lock可选公平/非公平
- synchronized不可中断，Lock可中断
- synchronized只有一个等待队列，Lock支持多个Condition
- synchronized底层是Monitor，Lock底层是AQS

### 2. volatile的底层原理？

volatile通过内存屏障实现：

- 写操作后插入StoreStore和StoreLoad屏障，确保写操作对其他线程可见
- 读操作前插入LoadLoad和LoadStore屏障，确保读取最新值
- 禁止指令重排序

### 3. 线程池参数怎么设置？

- **CPU密集型**：核心线程数 = CPU核数 + 1
- **IO密集型**：核心线程数 = CPU核数 \* 2 或 CPU核数 / (1 - 阻塞系数)
- **混合型**：根据任务类型调整，可通过压测确定

### 4. 死锁的条件和避免？

**四个必要条件**：

- 互斥条件：资源一次只能被一个线程持有
- 持有并等待：线程持有资源并等待其他资源
- 不可剥夺：已获取的资源不能被强制剥夺
- 循环等待：线程之间形成资源的循环等待链

**避免方法**：

- 固定加锁顺序
- 使用超时锁（tryLock）
- 避免嵌套锁
- 申请资源时一次性申请所有需要的资源

### 5. ThreadLocal原理？

每个线程都有一个ThreadLocalMap，以ThreadLocal对象为key，存储线程的本地变量。ThreadLocal的get/set操作实际是对当前线程的ThreadLocalMap进行操作。

**内存泄漏问题**：ThreadLocalMap的key是弱引用，value是强引用，GC后key为null但value还在。建议使用后调用remove()方法清理。

### 6. AQS（队列同步器）原理？

AQS是Lock的底层框架，维护一个state变量和一个CLH队列：

- state = 0表示锁空闲，state > 0表示锁被占用
- 获取锁时，通过CAS修改state，失败则加入CLH队列排队
- 释放锁时，修改state并唤醒队列中的下一个线程

ReentrantLock、ReentrantReadWriteLock、CountDownLatch等都基于AQS实现。
