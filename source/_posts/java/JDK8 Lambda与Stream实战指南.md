---
title: JDK8 Lambda与Stream实战指南
description: 吾生也有涯，而知也无涯
cover: /img/lunbo/483.webp
categories: 后端
tags: Java
comments: true
abbrlink: java2
summary: >-
  本文详细介绍JDK8核心新特性，重点讲解Lambda表达式和Stream流的使用。Lambda通过函数式接口实现代码简化，文章通过Runnable线程创建、Comparator集合排序、Consumer消费处理、BiConsumer双参处理、自定义接口及Lambda优化代码等多个案例，展示Lambda如何替代匿名内部类使代码更简洁。同时介绍了方法引用的四种形式及函数式接口概念。Stream流部分涵盖流的创建方式、filter筛选、map映射、flatMap扁平化、reduce聚合、sorted排序等核心操作，以及stream与parallelStream的区别。通过大量实战代码示例，帮助开发者快速掌握JDK8函数式编程核心思想和应用场景，提升开发效率。
date: 2025-08-08 09:17:06
---

## 常用遍历

```java
products.stream().forEach(System.out::println);          // 遍历打印对象，products是列表
Arrays.stream(strArray).forEach(System.out::println);    // 数组遍历打印每一项
```

## Lambda 表达式

Lambda 表达式是 JDK8 引入的函数式编程特性，使用时必须满足：

1. 必须有且仅有一个抽象方法的接口（函数式接口）
2. Lambda 体中调用方法的参数列表与返回值类型，要与函数式接口中抽象方法的参数列表和返回值类型保持一致
3. 若 Lambda 参数列表中的第一个参数是实例方法的调用者，而第二个参数是实例方法的参数时，可以使用 `ClassName::method` 形式
4. JDK 里的 Runnable、Comparator、Consumer、BiConsumer 接口满足条件，自定义接口只要满足也可以使用

**Lambda 表达式语法：**

```
(参数列表) -> {重写方法的代码};
```

- `()` 里面需要参数就写上，没有则不写，多个参数用逗号隔开
- `->`：传参符号
- `{}`：重写接口的抽象方法的方法体

### 案例 1：Runnable 线程创建

Runnable 是一个接口，传统方式需要重写 run 方法，使用 Lambda 可以简化代码：

```java
public class Lambda {
    public static void main(String[] args) {
        // 匿名内部类方式
        new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName() + "线程的实现方法2");
            }
        }).start();

        // Lambda 方式（单行代码可省略大括号）
        new Thread(() -> System.out.println(Thread.currentThread().getName() + "牛逼的Lambda")).start();
    }
}
```

### 案例 2：Comparator 集合排序

需要一个实体类：

```java
package com.nwa;

public class Entity {
    private String name;
    private int age;

    public Entity() {}

    public Entity(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    @Override
    public String toString() {
        return "Entity{name='" + name + "', age=" + age + '}';
    }
}
```

如果在实体类中实现 `Comparable<Entity>` 接口，可以直接调用 `Collections.sort(entities)` 进行排序：

```java
implements Comparable<Entity>

@Override
public int compareTo(Entity other) {
    return Integer.compare(this.age, other.age);
}

// 调用
Collections.sort(entities);  // 从小到大排序
```

**排序方式对比：**

```java
package com.nwa;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

public class Lambda2 {
    public static void main(String[] args) {
        ArrayList<Entity> entities = new ArrayList<>();
        entities.add(new Entity("小A", 19));
        entities.add(new Entity("小B", 29));
        entities.add(new Entity("小C", 22));

        // 方式1：匿名内部类
        Collections.sort(entities, new Comparator<Entity>() {
            @Override
            public int compare(Entity entity1, Entity entity2) {
                return entity1.getAge() - entity2.getAge();
            }
        });

        // 方式2：Lambda表达式
        Collections.sort(entities, (entity1, entity2) -> entity1.getAge() - entity2.getAge());

        // 方式3：方法引用（最简洁）
        Collections.sort(entities, Comparator.comparingInt(Entity::getAge));

        for (Entity entity : entities) {
            System.out.println(entity);
        }
    }
}
```

`Comparator.comparingInt(Entity::getAge)` 说明：

- `Comparator.comparingInt`：静态方法，用于创建一个比较器对象
- `Entity::getAge`：方法引用，使用实体对象的 `getAge()` 方法来提取整数值进行比较

### 案例 3：Consumer 消费处理

Consumer 是一个函数式接口，定义了 `accept` 方法接受输入参数，不返回结果：

```java
// 打印字符串
Consumer<String> printConsumer = (str) -> System.out.println(str);
printConsumer.accept("Hello, World!");

// 计算平方
Consumer<Integer> squareConsumer = (num) -> {
    int square = num * num;
    System.out.println(square);
};
squareConsumer.accept(5);

// 遍历集合
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
names.forEach(name -> System.out.println("Hello, " + name));

// 方法引用方式
Consumer<String> greetingConsumer = System.out::println;
names.forEach(greetingConsumer);
```

### 案例 4：BiConsumer 双参处理

```java
package com.nwa;

import java.util.function.BiConsumer;

public class Example {
    public void greet(String name, String greeting) {
        System.out.println(name + ", " + greeting + "!");
    }

    public static void main(String[] args) {
        Example example = new Example();
        BiConsumer<String, String> greeter = example::greet;
        greeter.accept("Hello", "lucky");
    }
}
```

**其他函数式接口示例：**

```java
// BiFunction 比较
BiFunction<Integer, Integer, Integer> biFun = Integer::compare;
System.out.println(biFun.apply(300, 200));  // 1

// 方法引用 - 类名::实例方法名
BiFunction<String, String, Boolean> fun2 = String::equals;
System.out.println(fun2.apply("hello", "world"));  // false

// 数组引用
Function<Integer, String[]> fun3 = String[]::new;
String[] strArray = fun3.apply(2);
Arrays.fill(strArray, "Hello");
Arrays.stream(strArray).forEach(System.out::println);

// Supplier 延迟获取对象
Supplier<Entity> sup = () -> new Entity();
System.out.println(sup.get());
```

### 案例 5：自定义函数式接口

```java
// 定义接口
public interface Counter {
    int sum(int a, int b);
}

// 使用
public class Lambda3 {
    public static void main(String[] args) {
        Cal(1, 2, (a, b) -> a + b);
    }

    public static void Cal(int a, int b, Counter c) {
        int sum = c.sum(a, b);
        System.out.println(sum);
    }
}
```

### 案例 6：Lambda 优化代码

商城筛选商品（价格小于 6666）：

```java
// 传统方式 - 每次需求变更都要新增方法
public List<Product> filterProductByPrice(List<Product> list) {
    List<Product> prods = new ArrayList<>();
    for (Product product : list) {
        if (product.getPrice() < 6666) {
            prods.add(product);
        }
    }
    return prods;
}
```

**使用自定义接口优化：**

```java
// 定义接口
public interface MyPredicate<T> {
    boolean test(T t);
}

// 使用
public class Demo {
    public static void main(String[] args) {
        ArrayList<Product> products = new ArrayList<>();
        products.add(new Product(1555));
        products.add(new Product(8555));
        products.add(new Product(10555));

        // 匿名内部类方式
        List<Product> filter = Demo.filter(products, new MyPredicate<Product>() {
            @Override
            public boolean test(Product product) {
                return product.getPrice() < 6666;
            }
        });

        // Lambda方式
        List<Product> filter2 = Demo.filter(products, product -> product.getPrice() < 6666);
        filter2.stream().forEach(System.out::println);

        // Stream流方式（一步到位）
        products.stream()
                .filter(p -> p.getPrice() < 6666)
                .limit(2)
                .forEach(System.out::println);
    }

    public static List<Product> filter(List<Product> list, MyPredicate<Product> mp) {
        List<Product> prods = new ArrayList<>();
        for (Product prod : list) {
            if (mp.test(prod)) {
                prods.add(prod);
            }
        }
        return prods;
    }
}
```

## Stream 流

`Stream` 将要处理的元素集合看作一种流，在流的过程中借助 `Stream API` 对流中的元素进行操作，如筛选、排序、聚合等。

**stream 和 parallelStream 的区别：**

- `stream`：顺序流，由主线程按顺序对流执行操作
- `parallelStream`：并行流，多线程处理后合并成顺序流，效率更高

**Optional 类**：可以为 null 的容器对象，`isPresent()` 判断值是否存在，`get()` 获取对象。

### 案例 1：流的创建

```java
package com.nwa;

import java.util.*;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class Stream1 {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("a", "b", "c");

        // 创建顺序流和并行流
        Stream<String> stream = list.stream();
        Stream<String> parallelStream = list.parallelStream();

        // 从数组创建
        int[] array = {1, 3, 5, 6, 8};
        IntStream stream3 = Arrays.stream(array);

        // 无限流 - iterate（初始值0，每次+3，取前4个）
        Stream<Integer> stream2 = Stream.iterate(0, x -> x + 3).limit(4);
        stream2.forEach(System.out::println);

        // 无限流 - generate（随机数，取前3个）
        Stream<Double> stream4 = Stream.generate(Math::random).limit(3);
        stream4.forEach(System.out::println);

        // 顺序流转并行流
        List<Integer> list2 = Arrays.asList(1, 2, 3, 8, 9, 11);
        Optional<Integer> findFirst = list2.stream().parallel().filter(x -> x > 6).findFirst();
        System.out.println("第一个大于6的是：" + findFirst);
    }
}
```

### 案例 2：Stream 常用操作

```java
package com.nwa;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class Stream2 {
    public static void main(String[] args) {
        List<Person> personList = new ArrayList<>();
        personList.add(new Person("Tom", 8900, 23, "male", "New York"));
        personList.add(new Person("Jack", 7000, 25, "male", "Washington"));
        personList.add(new Person("Lily", 7800, 21, "female", "Washington"));
        personList.add(new Person("Anni", 8200, 24, "female", "New York"));
        personList.add(new Person("Owen", 9500, 25, "male", "New York"));
        personList.add(new Person("Alisa", 7900, 26, "female", "New York"));

        fun1();
        fun2();
        fun3();
        fun4(personList);
        fun5(personList);
        fun6();
        fun7(personList);
    }

    // 遍历/匹配
    public static void fun1() {
        List<Integer> list = Arrays.asList(7, 6, 9, 3, 8, 2, 1);

        list.stream().filter(x -> x > 6).forEach(System.out::println);
        Optional<Integer> findFirst = list.stream().filter(x -> x > 6).findFirst();
        Optional<Integer> findAny = list.parallelStream().filter(x -> x > 6).findAny();
        boolean anyMatch = list.stream().anyMatch(x -> x > 6);

        System.out.println("匹配第一个值：" + findFirst.get());
        System.out.println("匹配任意一个值：" + findAny.get());
        System.out.println("是否存在大于6的值：" + anyMatch);
    }

    // 聚合 max/min
    public static void fun2() {
        List<String> list = Arrays.asList("adnm", "admmt", "pot", "xbangd", "weoujgsd");
        Optional<String> max = list.stream().max(Comparator.comparing(String::length));
        System.out.println("最长的字符串：" + max.get());
    }

    // 排序
    public static void fun3() {
        List<Integer> list = Arrays.asList(7, 6, 9, 4, 11, 6);
        Optional<Integer> max = list.stream().max(Integer::compareTo);
        Optional<Integer> min = list.stream().max((o1, o2) -> o2 - o1);
        System.out.println("自然排序的最大值：" + max.get());
        System.out.println("自定义排序的最小值：" + min.get());
    }

    // 统计
    public static void fun4(List<Person> personList) {
        Optional<Person> max = personList.stream().max(Comparator.comparingInt(Person::getSalary));
        System.out.println("员工薪资最大值：" + max.get().getSalary());

        List<Integer> list = Arrays.asList(7, 6, 4, 8, 2, 11, 9);
        long count = list.stream().filter(x -> x > 6).count();
        System.out.println("list中大于6的元素个数：" + count);
    }

    // 映射 map/flatMap
    public static void fun5(List<Person> personList) {
        // 英文字符串转大写，整数+3
        String[] strArr = {"abcd", "bcdd", "defde", "fTr"};
        List<String> strList = Arrays.stream(strArr).map(String::toUpperCase).collect(Collectors.toList());
        List<Integer> intList = Arrays.asList(1, 3, 5, 7, 9, 11);
        List<Integer> intListNew = intList.stream().map(x -> x + 3).collect(Collectors.toList());
        System.out.println("每个元素大写：" + strList);
        System.out.println("每个元素+3：" + intListNew);

        // 不改变原集合的方式（new 新对象）
        List<Person> personListNew = personList.stream().map(person -> {
            Person personNew = new Person(person.getName(), 0, 0, null, null);
            personNew.setSalary(person.getSalary() + 10000);
            return personNew;
        }).collect(Collectors.toList());
        System.out.println("改动前：" + personList.get(0).getSalary());
        System.out.println("改动后：" + personListNew.get(0).getSalary());

        // 改变原集合的方式（直接操作原对象）
        List<Person> personListNew2 = personList.stream().map(person -> {
            person.setSalary(person.getSalary() + 10000);
            return person;
        }).collect(Collectors.toList());
    }

    // flatMap 扁平化
    public static void fun6() {
        List<String> list = Arrays.asList("m-k-l-a", "1,3,5,7");
        List<String> listNew = list.stream().flatMap(s -> {
            String[] split = s.split("-");
            return Arrays.stream(split);
        }).collect(Collectors.toList());

        System.out.println("处理前：" + list);
        System.out.println("处理后：" + listNew);
    }

    // reduce 聚合
    public static void fun7(List<Person> personList) {
        // 求工资之和
        Optional<Integer> sumSalary = personList.stream().map(Person::getSalary).reduce(Integer::sum);
        Integer sumSalary2 = personList.stream().reduce(0, (sum, p) -> sum += p.getSalary(), Integer::sum);

        // 求最高工资
        Integer maxSalary = personList.stream().reduce(0, (max, p) -> max > p.getSalary() ? max : p.getSalary(), Integer::max);
        Integer maxSalary2 = personList.stream().map(Person::getSalary).reduce(Integer::max).get();

        System.out.println("工资之和：" + sumSalary.get() + "," + sumSalary2);
        System.out.println("最高工资：" + maxSalary + "," + maxSalary2);
    }
}
```

**Person 类：**

```java
package com.nwa;

public class Person {
    private String name;
    private int salary;
    private int age;
    private String sex;
    private String area;

    public Person() {}

    public Person(String name, int salary, int age, String sex, String area) {
        this.name = name;
        this.salary = salary;
        this.age = age;
        this.sex = sex;
        this.area = area;
    }

    public Person(String name, int salary, String sex, String area) {
        this.name = name;
        this.salary = salary;
        this.sex = sex;
        this.area = area;
    }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getSalary() { return salary; }
    public void setSalary(int salary) { this.salary = salary; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    public String getSex() { return sex; }
    public void setSex(String sex) { this.sex = sex; }
    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }

    @Override
    public String toString() {
        return "Person{name='" + name + "', salary=" + salary + ", age=" + age + ", sex='" + sex + "', area='" + area + "'}";
    }
}
```
