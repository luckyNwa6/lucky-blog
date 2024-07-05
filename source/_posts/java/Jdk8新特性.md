---
title: Jkd8新特性
description: Lambda和Stream流相关的学习笔记
cover: 'https://imgs.luckynwa.top/blog/javaNewIcon.png'
categories: Java
tags: JDk8
sticky: 99
comments: false
abbrlink: 34077
date: 2023-07-18 13:32:28
swiper_index: 66
swiper_description: 'Lambda和Stream流相关的学习笔记'
---

<div class="ai-container">
  <div class="ai-header">
        <img style='margin: 0 5px !important; ' src="https://imgs.luckynwa.top/blog/robot.svg" alt="icon" />
        <span style="color: white">AI摘要<a class="random-post-start" href="javascript:printLucky(myTextValue);"><i class="fa-solid fa-arrow-rotate-right" style='color:white;font-size:14px;margin-left:2px'></i></a></span>
        <div class="ai-right">
          <span>BingAI</span>
        </div>
  </div>
      <div class="ai-content">
        <p id="ai-post"></p>
      </div>
</div>
<link rel="stylesheet" type="text/css" href="https://imgs.luckynwa.top/jscss/ai.css">
<script src = "/js/ai.js"></script>
<script  type="text/javascript">  
  var myTextValue = '这篇文章提供了Jdk8的新特性';
  document.addEventListener("DOMContentLoaded", function() {
    printLucky(myTextValue);
  });
  console.log('-----------------------------这是页面清除缓存后，ai启动回答')
</script>

# 常用

```java
  products.stream().forEach(System.out::println);          //直接遍历打印这个对象，products是列表
  Arrays.stream(strArray).forEach(System.out::println)     //数组遍历打印每一项   类要toString
```

# Lambda

1. 使用 Lambda 必须**有且仅有一个抽象方法的接口(函数式接口)**
   　　 2. lambda 体中调用方法的参数列表与返回值类型，要与函数式接口中抽象方法的函数列表和返回值类型保持一致！
   　　 3. 若 lambda 参数列表中的第一个参数是实例方法的调用者，而第二个参数是实例方法的参数时，可以使用 ClassName::method 看案 4
   　　 4. JDK 里的 Runnable 、Comparator、Consumer、BiConsumer 接口满足 1 的条件，自定义接口要是满足也可以使用它

## 案例 1(Runnable )

Runnable 是一个接口，当一个类 implements 它的时候，必须去重写它的 run 方法，这样太麻烦了，所以有了匿名内部类，jdk8 后面有了更简单的 Lambda，这个接口里面就一个抽象类满足它，所以才能直接用。

Lambda 表达式的为：

```
(参数列表) -> {重写方法的代码};
```

- ()里面需要参数就写上，没有则不写，用逗号隔开
- ->:传参
- {}:重写接口的抽象方法的方法体

正常{System.out.println(Thread.currentThread().getName()+"牛逼的 Lambda")},不过也可以省略{}

```java
public class Lambda {
    public static void main(String[] args){
       new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName()+"线程的实现方法2");
            }
        }).start();
        new Thread(() -> System.out.println(Thread.currentThread().getName()+"牛逼的Lambda")).start();
    }
}

```

## 案例 2(Comparator)

需要一个实体类

```java
package com.nwa;

/**
 * @Author Lucky友人a
 * @Date 2023/7/17 -15:47
 */
public class Entity {
    private String name;
    private int age;

    public Entity() {

    }

    public Entity(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "Entity{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}

```

如果是排序的话也可以直接在实体

```java
  implements Comparable<Entity>

    @Override
    public int compareTo(Entity other) {
        if (this.age < other.age) {
            return -1; // 当前对象的年龄小于其他对象的年龄，返回负整数
        } else if (this.age > other.age) {
            return 1; // 当前对象的年龄大于其他对象的年龄，返回正整数
        } else {
            return 0; // 当前对象的年龄等于其他对象的年龄，返回零
        }
    }

调用的时候
        ArrayList<Entity> entities = new ArrayList<>();
        entities.add(new Entity("小A", 19));
        entities.add(new Entity("小B", 29));
        entities.add(new Entity("小C", 22));
        Collections.sort(entities);    //就从小到大排序了
        for (Entity entity : entities) {
            System.out.println(entity);
        }

```

如果你有一个数组需要进行排序，使用 `Arrays.sort` 是更好的选择；如果你有一个集合对象需要进行排序，使用 `Collections.sort` 更加方便

```java
package com.nwa;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

/**
 * @Author Lucky友人a
 * @Date 2023/7/17 -15:45
 */
public class Lambda2 {

    public static void main(String[] args) {
        ArrayList<Entity> entities = new ArrayList<>();
        entities.add(new Entity("小A", 19));
        entities.add(new Entity("小B", 29));
        entities.add(new Entity("小C", 22));
		//匿名内部类
        Collections.sort(entities, new Comparator<Entity>() {
            @Override
            public int compare(Entity entity1, Entity entity2) {
                // 实现自定义的比较逻辑
                // 返回负整数、零或正整数，表示entity1小于、等于或大于entity2
                return  entity1.getAge()-entity2.getAge();
            }
        });
//也是从小到大比较排序
       //lambda表达式
        Collections.sort(entities, (entity1, entity2) ->{return  entity1.getAge()-entity2.getAge();});

       //简化1
        Collections.sort(entities, (entity1, entity2) ->entity1.getAge()-entity2.getAge());

        //继续简化
         Collections.sort(entities, Comparator.comparingInt(Entity::getAge));

        for (Entity entity : entities) {
            System.out.println(entity);
        }
    }
}

```

1. `Comparator.comparingInt`：这是一个静态方法，用于创建一个比较器对象，它会根据指定的属性或键提取对象的整数值进行比较。
2. `Entity::getAge`：这是一种方法引用的写法，表示使用实体对象的 `getAge()` 方法来提取整数值进行比较。

因此，`Comparator.comparingInt(Entity::getAge)` 所做的是创建一个比较器，通过调用实体对象的 `getAge()` 方法来提取它们的年龄属性，并以整数方式进行比较。

在 `Collections.sort(entities, ...)` 中，`entities` 是要排序的集合对象，`Comparator.comparingInt(Entity::getAge)` 则是用于指定排序的比较器。这样，`Collections.sort` 就会根据实体对象的年龄属性对集合中的元素进行排序。

```
List<Integer> numbers = new ArrayList<>();
numbers.add(5);
numbers.add(2);
numbers.add(8);
numbers.add(1);

Comparator<Integer> cpt2 = (x, y) -> Integer.compare(x, y);
Collections.sort(numbers, cpt2);

System.out.println(numbers);  // 输出结果：[1, 2, 5, 8]
```

## 案例 3(Consumer)

Consumer 是一个接口，它属于 Java 8 中的函数式接口之一。在 Java 中，函数式接口指的是只包含一个抽象方法的接口。

`Consumer` 接口定义了一个名为 `accept` 的抽象方法，该方法接受一个输入参数，并不返回任何结果。它可以用于执行操作，通常是对输入进行处理或消费。

```java
Consumer<String> printConsumer = (str) -> System.out.println(str);
printConsumer.accept("Hello, World!");

Consumer<Integer> squareConsumer = (num) -> {
    int square = num * num;
    System.out.println(square);
};
squareConsumer.accept(5);


List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

// 使用 Lambda 表达式创建 Consumer 对象，并在 forEach 中使用
names.forEach(name -> System.out.println("Hello, " + name));

// 使用方法引用创建 Consumer 对象，并在 forEach 中使用
Consumer<String> greetingConsumer = System.out::println;
names.forEach(greetingConsumer);


Hello, World!
25

Hello, Alice
Hello, Bob
Hello, Charlie
Alice
Bob
Charlie

```

## 案例 4(BiConsumer)

```java
package com.nwa;
import java.util.function.BiConsumer;

public class Example {
    public void greet(String name, String greeting) {
        System.out.println(name + ", " + greeting + "!");
    }

    public static void main(String[] args) {
        Example example = new Example();
//        BiConsumer<String, String> greeter = (name, greeting) -> example.greet(name, greeting);
        BiConsumer<String, String> greeter = example::greet;
        greeter.accept("Hello", "lucky");
    }
}

Hello, lucky!

可以这样玩
        BiFunction<Integer, Integer, Integer> biFun = (x, y) -> Integer.compare(x, y);
        BiFunction<Integer, Integer, Integer> biFun2 = Integer::compare;
        Integer result = biFun2.apply(300, 200);
        System.out.println(result);
// 方法引用-类名::实例方法名
        BiFunction<String, String, Boolean> fun1 = (str1, str2) -> str1.equals(str2);
        BiFunction<String, String, Boolean> fun2 = String::equals;
        Boolean result2 = fun2.apply("hello", "world");
        System.out.println(result2);
// 数组引用
        Function<Integer, String[]> fun = (x) -> new String[x];
        Function<Integer, String[]> fun3 = String[]::new;
        String[] strArray = fun3.apply(2);
        // 1使用 Arrays.fill 方法给数组赋值
        Arrays.fill(strArray, "Hello");
        // 2使用循环遍历逐个赋值
        for (int i = 0; i < strArray.length; i++) {
            strArray[i] = "Hello" + i;
        }
        Arrays.stream(strArray).forEach(System.out::println);

1
false
Hello
Hello

        Supplier<Entity> sup = () -> new Entity();
        System.out.println(sup.get());
//延迟获取对象sup.get() 方法调用这个 Supplier 实例，会执行 Lambda 表达式 () -> new Entity()

```

## 案例 5(自定义接口)

```java
public interface Counter {
    int sum(int a,int b);
}


public class Lambda3 {
    public static void main(String[] args) {
        Cal(1,2,(a,b)->a+b); //这是有返回值的，给了下面sum变量,然后打印了出来
    }

    public static void Cal(int a, int b, Counter c) {
        int sum = c.sum(a, b);
        System.out.println(sum);
    }
}

```

## 案例 6(优化代码)

在商城浏览商品时，会进行有条件的筛选，例如价格小于 6666

```
// 价格大于6666
public  List<Product> filterProductByPrice(List<Product> list){
    List<Product> prods = new ArrayList<>();
    for (Product product : list){
        if (product.getPrice() < 6666){
            prods.add(product);
        }
    }
    return prods;
 }
```

每次变更一下需求，都需要新增一个方法，如果这个过滤方法有几百行，如何进行优化

用上自定义接口的思想

首先定义一个接口

```
public interface MyPredicate <T> {
    boolean test(T t);
}
```

写个 Demo 测试

```java
package com.nwa;
import java.util.ArrayList;
import java.util.List;
/**
 * @Author Lucky友人a
 * @Date 2023/7/17 -18:39
 */
public class Demo {
    public static void main(String[] args){
        ArrayList<Product> products = new ArrayList<>();
        products.add(new Product(1555));
        products.add(new Product(8555));
        products.add(new Product(10555));
//        products.stream().forEach(System.out::println);   //这里流的方式，不懂后面会说,可以用foreach
        List<Product> filter = Demo.filter(products, new MyPredicate<Product>() {  //匿名内部类，熟悉吧
            @Override
            public boolean test(Product product) {
                return product.getPrice()<6666;
            }
        });

        List<Product> filter = Demo.filter(products, product -> product.getPrice()<6666);//简化成这个
        filter.stream().forEach(System.out::println);

        //或者直接一步到位,limit限制输出2条,filter是流里的，不是自己的方法也能用
                products.stream().
                filter((p) -> p.getPrice() <6666)
                .limit(2)
                .forEach(System.out::println);
    }
 public   static   List<Product> filter(List<Product> list,MyPredicate<Product> mp){
        List<Product> prods = new ArrayList<>();
        for (Product prod : list){
            if (mp.test(prod)){
                prods.add(prod);
            }
        }
        return prods;
    }

}

```

# Stream

`Stream`将要处理的元素集合看作一种流，在流的过程中，借助`Stream API`对流中的元素进行操作，比如：筛选、排序、聚合等

**`stream`和`parallelStream`的简单区分：** `stream`是顺序流，由主线程按顺序对流执行操作，而`parallelStream`是并行流，如果说顺序流是一个一个筛选，那么并行就是中间拆开，多线程去筛选需要的，再去合并成顺序流，效率比较高。如筛选集合中的偶数

`Optional`类是一个可以为`null`的容器对象。如果值存在则`isPresent()`方法会返回`true`，调用`get()`方法会返回该对象。

### 案例 1

```java
package com.nwa;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import java.util.stream.Stream;

/**
 * @Author Lucky友人a
 * @Date 2023/7/18 -16:08
 */
public class Stream1 {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("a", "b", "c");

// 创建一个顺序流
     //   Stream<String> stream = list.stream();
// 创建一个并行流
    //    Stream<String> parallelStream = list.parallelStream();

        int[] array={1,3,5,6,8};
        IntStream stream3= Arrays.stream(array);

       // Stream<Integer> stream = Stream.of(1, 2, 3, 4, 5, 6);
//Stream.iterate(0, (x) -> x + 3) 创建了一个无限长度的流。初始值为 0，每次迭代时通过 (x) -> x + 3 将上一个元素加 3 来生成下一个元素。
// 然后，使用 .limit(4) 限制流的大小为4，只保留前四个元素
        Stream<Integer> stream2 = Stream.iterate(0, (x) -> x + 3).limit(4);
        stream2.forEach(System.out::println);

//Stream.generate(Math::random) 创建了一个无限长度的流，其中每个元素都是由 Math.random() 生成的随机数。
//然后，.limit(3) 限制了流的大小为3，只保留前三个元素
        Stream<Double> stream4 = Stream.generate(Math::random).limit(3);
        stream4.forEach(System.out::println);

        //通过parallel()把顺序流转换成并行流
        List<Integer> list2 = Arrays.asList(1, 2, 3,8,9,11);
        Optional<Integer> findFirst = list2.stream().parallel().filter(x->x>6).findFirst();
        System.out.println("第一个大于6的是"+findFirst);

    }
}


```

## 案例 2

```java



package com.nwa;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @Author Lucky友人a
 * @Date 2023/7/18 -16:34
 */
public class Stream2 {
    public static void main(String[] args) {
        List<Person> personList = new ArrayList<Person>();
        personList.add(new Person("Tom", 8900, 23, "male", "New York"));
        personList.add(new Person("Jack", 7000, 25, "male", "Washington"));
        personList.add(new Person("Lily", 7800, 21, "female", "Washington"));
        personList.add(new Person("Anni", 8200, 24, "female", "New York"));
        personList.add(new Person("Owen", 9500, 25, "male", "New York"));
        personList.add(new Person("Alisa", 7900, 26, "female", "New York"));
//
//        List<String> fiterList = personList.stream().filter(x -> x.getSalary() > 8000).map(Person::getName)
//                .collect(Collectors.toList());
//        System.out.print("薪资高于8000美元的员工：" + fiterList);
//        fun1();
//        fun2();
//        fun3();
//        fun4(personList);
//        fun5(personList);
//        fun6();
        fun7(personList);
    }


    public static void fun1() {
        List<Integer> list = Arrays.asList(7, 6, 9, 3, 8, 2, 1);
        //foreach/find/match  遍历/匹配
        // 遍历输出符合条件的元素
        list.stream().filter(x -> x > 6).forEach(System.out::println);
        // 匹配第一个
        Optional<Integer> findFirst = list.stream().filter(x -> x > 6).findFirst();
        // 匹配任意（适用于并行流）
        Optional<Integer> findAny = list.parallelStream().filter(x -> x > 6).findAny();
        // 是否包含符合特定条件的元素
        boolean anyMatch = list.stream().anyMatch(x -> x > 6);
        System.out.println("匹配第一个值：" + findFirst.get());
        System.out.println("匹配任意一个值：" + findAny.get());
        System.out.println("是否存在大于6的值：" + anyMatch);

    }

    public static void fun2() {
        //聚合max/min/count
        List<String> list = Arrays.asList("adnm", "admmt", "pot", "xbangd", "weoujgsd");
        Optional<String> max = list.stream().max(Comparator.comparing(String::length));
        System.out.println("最长的字符串：" + max.get());
    }

    public static void fun3() {
        List<Integer> list = Arrays.asList(7, 6, 9, 4, 11, 6);
        // 自然排序
        Optional<Integer> max = list.stream().max(Integer::compareTo);
        // 自定义排序（从小到大排序）
        Optional<Integer> min = list.stream().max((o1, o2) -> o2 - o1);
        System.out.println("自然排序的最大值：" + max.get());
        System.out.println("自定义排序的最小值：" + min.get());
    }

    public static void fun4(List<Person> personList) {


        Optional<Person> max = personList.stream().max(Comparator.comparingInt(Person::getSalary));
        System.out.println("员工薪资最大值：" + max.get().getSalary());


        List<Integer> list = Arrays.asList(7, 6, 4, 8, 2, 11, 9);
        long count = list.stream().filter(x -> x > 6).count();
        System.out.println("list中大于6的元素个数：" + count);
    }

    public static void fun5(List<Person> personList) {
        //映射
//     map：接收一个函数作为参数，该函数会被应用到每个元素上，并将其映射成一个新的元素。
//     flatMap：接收一个函数作为参数，将流中的每个值都换成另一个流，然后把所有流连接成一个流。
        //英文字符串数组的元素全部改为大写。整数数组每个元素+3。
        String[] strArr = {"abcd", "bcdd", "defde", "fTr"};
        List<String> strList = Arrays.stream(strArr).map(String::toUpperCase).collect(Collectors.toList());
        List<Integer> intList = Arrays.asList(1, 3, 5, 7, 9, 11);
        List<Integer> intListNew = intList.stream().map(x -> x + 3).collect(Collectors.toList());
        System.out.println("每个元素大写：" + strList);
        System.out.println("每个元素+3：" + intListNew);


        // 不改变原来员工集合的方式，new了新的，没有修改原来的值
        List<Person> personListNew = personList.stream().map(person -> {
            Person personNew = new Person(person.getName(), 0, 0, null, null);
            personNew.setSalary(person.getSalary() + 10000);
            return personNew;
        }).collect(Collectors.toList());
        System.out.println("一次改动前：" + personList.get(0).getName() + "-->" + personList.get(0).getSalary());
        System.out.println("一次改动后：" + personListNew.get(0).getName() + "-->" + personListNew.get(0).getSalary());

        // 改变原来员工集合的方式,直接操作了原来的类，给他重新赋值了
        List<Person> personListNew2 = personList.stream().map(person -> {
            person.setSalary(person.getSalary() + 10000);
            return person;
        }).collect(Collectors.toList());
        System.out.println("二次改动前：" + personList.get(0).getName() + "-->" + personListNew.get(0).getSalary());
        System.out.println("二次改动后：" + personListNew2.get(0).getName() + "-->" + personListNew.get(0).getSalary());
    }

    public static void fun6() {

        List<String> list = Arrays.asList("m-k-l-a", "1,3,5,7");
        List<String> listNew = list.stream().flatMap(s -> {
            // 将每个元素转换成一个stream
            String[] split = s.split("-");
            Stream<String> s2 = Arrays.stream(split);
            return s2;
        }).collect(Collectors.toList());

        System.out.println("处理前的集合：" + list);
        System.out.println("处理后的集合：" + listNew);
//        处理前的集合：[m-k-l-a, 1,3,5,7]
//        处理后的集合：[m, k, l, a, 1,3,5,7]

    }

    public static void fun7(List<Person> personList) {
        // 求工资之和方式1：
        Optional<Integer> sumSalary = personList.stream().map(Person::getSalary).reduce(Integer::sum);
        // 求工资之和方式2：
        Integer sumSalary2 = personList.stream().reduce(0, (sum, p) -> sum += p.getSalary(),
                (sum1, sum2) -> sum1 + sum2);
        // 求工资之和方式3：
        Integer sumSalary3 = personList.stream().reduce(0, (sum, p) -> sum += p.getSalary(), Integer::sum);

        // 求最高工资方式1：
        Integer maxSalary = personList.stream().reduce(0, (max, p) -> max > p.getSalary() ? max : p.getSalary(),
                Integer::max);
        // 求最高工资方式2：
        Integer maxSalary2 = personList.stream().reduce(0, (max, p) -> max > p.getSalary() ? max : p.getSalary(),
                (max1, max2) -> max1 > max2 ? max1 : max2);
        // 求最高工资方式3：
        Integer maxSalary3 = personList.stream().map(Person::getSalary).reduce(Integer::max).get();

        System.out.println("工资之和：" + sumSalary.get() + "," + sumSalary2 + "," + sumSalary3);
        System.out.println("最高工资：" + maxSalary + "," + maxSalary2 + "," + maxSalary3);


    }
}


```

Person 类

```java
package com.nwa;

/**
 * @Author Lucky友人a
 * @Date 2023/7/18 -16:33
 */
public class Person {
    private String name;  // 姓名
    private int salary; // 薪资
    private int age; // 年龄
    private String sex; //性别
    private String area;  // 地区

    public Person(String name, int salary, int age, String sex, String area) {
        this.name = name;
        this.salary = salary;
        this.age = age;
        this.sex = sex;
        this.area = area;
    }

    public Person() {

    }

    public Person(String name, int salary, String sex, String area) {
        this.name = name;
        this.salary = salary;
        this.sex = sex;
        this.area = area;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", salary=" + salary +
                ", age=" + age +
                ", sex='" + sex + '\'' +
                ", area='" + area + '\'' +
                '}';
    }
}

```
