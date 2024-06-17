---
title: ElasticSearch
description: ElasticSearch相关的学习笔记
cover: "https://luckynwa.top/mypic/blog/elasticSearchIcon.png"
categories: Java
tags: ES
comments: false
abbrlink: 6184
date: 2023-07-20 13:32:28
---

# 入门

[Elasticsearch 硬核入门教程（2022 最全）*elasticsearch 教程*小熊学 Java 的博客-CSDN 博客](https://blog.csdn.net/Y_hanxiong/article/details/127261296)

版本 elasticsearch-7.0.0 太高会不支持 jkd8

- 运行软件目录下的 bin 文件夹下的 elasticsearch.bat

* `9300` 端口为 Elastic s earch 集群间组件的通信端口，
* `9200` 端口为浏览器访问的 http 协议 RESTful 端口。

- 浏览器运行[localhost:9200](http://localhost:9200/)

- 出现"tagline": "You Know, for Search"就成功

概念类比：

![图片1](http://120.26.80.35:3737/mdS/es.png )

 Elasticsearch 7.X 中 , Type 的概念已经被删除了

## 索引操作

### 创建索引

用 postman 软件进行下面操作

put 请求下面链接即可无参

http://127.0.0.1:9200/start

返回

```json
{
    "acknowledged": true,
    "shards_acknowledged": true,
    "index": "start"
}

 " 【响应结果】 : true, # true 操作成功
 "shards_ 【分片结果】 : true, # 分片操作成功
 " 【索引名称】 : "
 # 注意：创建索引库的分片数默认 1 片，在 7.0.0 之前的 Elasticsearch 版本中，默认 5 片
```

### 查看索引

向 ES 服务器发 GET 请求 http://127.0.0.1:9200/_cat/indices?v

这里请求路径中的 \_cat 表示查看的意思， indices 表示索引，所以整体含义就是查看当前 ES 服务器中的所有索引，就好像 MySQL 中的 show tables ,返回

```
health status index uuid                   pri rep docs.count docs.deleted store.size pri.store.size
yellow open   start 9cGmSfZ_TxyUiI1Gl9BiAw   1   1          0            0       230b           230b

```

![Snipaste_2023-07-20_10-01-23](http://120.26.80.35:3737/mdS/Snipaste_2023-07-20_10-01-23.png)

### 查看单个索引

GET 请求 http://127.0.0.1:9200/start

```JSON
{
    "start": {
        "aliases": {},
        "mappings": {},
        "settings": {
            "index": {
                "creation_date": "1689818229673",
                "number_of_shards": "1",
                "number_of_replicas": "1",
                "uuid": "9cGmSfZ_TxyUiI1Gl9BiAw",
                "version": {
                    "created": "7000099"
                },
                "provided_name": "start"
            }
        }
    }
}


解析
 {
     "start"【索引名】: {
         "aliases"【别名】: {},
         "mappings"【映射】: {},
         "settings"【设置】: {
             "index"【设置-索引】: {
                 "routing": {
                     "allocation": {
                         "include": {
                             "_tier_preference": "data_content"
                         }
                     }
                 },
                 "number_of_shards"【设置-索引-主分片数量】: "1",
                 "provided_name"【名称】: "start",
                 "creation_date"【创建时间】: "1624440317651",
                 "number_of_replicas"【设置-索引-副分片数量】: "1",
                 "uuid"【唯一标识】: "5tI3rmvvQsKJISZ8GDR-YQ",
                 "version"【设置-索引-版本】: {
                     "created": "7130299"
                 }
             }
         }
     }
 }
```

### 删除索引

发 DELETE 请求 http://127.0.0.1:9200/start

## 文档操作

### 创建文档

档可以类比为关系型数据库中的表数据，添加的数据格式为 JSON 格式

在 Postman 中，向 ES 服务器发 POST 请求 http://127.0.0.1:9200/start/doc

如果想要自定义唯一性标识，需要在创建时指定http://127.0.0.1:9200/start/doc/1

需要 body---->row---->json

```json
{
    "title":"小米手机",
    "category":"小米",
    "images":"www.xiaobear.cn",
    "price":36666.00
}

返回结果
{
    "_index": "start",
    "_type": "doc",
    "_id": "LopVcYkBQUfrnphKjG1q",
    "_version": 1,
    "result": "created",
    "_shards": {
        "total": 2,
        "successful": 1,
        "failed": 0
    },
    "_seq_no": 0,
    "_primary_term": 2
}
```

```
解析
 {
     "_index"【索引】: "start",
     "_type"【类型-文档】: "doc",
     "_id"【唯一标识】: "iY9GOHoBucAyibLJ1Bbq",#可以类比为 MySQL 中的主键，随机生成
     "_version"【版本号】: 1,
     "result"【结果】: "created", #这里的 create 表示创建成功
     "_shards"【分片】: {
         "total"【分片-总数】: 2,
         "successful"【分片-成功】: 1,
         "failed"【分片-s】: 0
     },
     "_seq_no": 1,
     "_primary_term": 1
 }
```

### 修改文档

POST 请求 http://127.0.0.1:9200/start/_doc/1

如果请求体变化，会将原有的数据内容覆盖 在 Postman 中，并且版本变化

### 修改字段

POST 请求 http://127.0.0.1:9200/start/_update/1

```
 {
 "doc": {
     "price":5000.00
     }
 }
```

### 查看文档

根据唯一性标识，查询文档数据，文档数据已经更新

GET 请求 http://127.0.0.1:9200/start/_doc/1

### 删除文档

ES 服务器发 DELETE 请求 http://127.0.0.1:9200/start/_doc/1

一般删除数据都是根据文档的唯一性标识进行删除，实际操作时，也可以根据条件对多条数据进行删除

POST 请求 http://127.0.0.1:9200/start/_delete_by_query 这个是按条件删除

```json
{
  "query": {
    "match": {
      "price": 3999.0
    }
  }
}
```

## 映射操作

有了索引库，等于有了数据库中的 database 。

接下来就需要建索引库(index)中的映射了，类似于数据库 (database)中的表结构 (table)。创建数据库表需要设置字段名称，类型，长度，约束等；索引库也一样，需要知道这个类型下有哪些字段，每个字段有哪些约束信息，这就叫做映射 (mapping)。

### 创建映射

先创建索引才能映射，http://localhost:9200/user PUT 请求

```
{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 1
  },
  "mappings": {
    "properties": {
      "name": {
        "type": "text"
      },
      "age": {
        "type": "integer"
      }
    }
  }
}

```

PUT 请求http://127.0.0.1:9200/user/_mapping

```json
{
  "properties": {
    "name": {
      "type": "text",
      "index": true
    },
    "sex": {
      "type": "keyword",
      "index": true
    },
    "phone": {
      "type": "keyword",
      "index": false
    }
  }
}
```

映射数据说明

```
字段名：任意填写，下面指定许多属性，例如： title 、 subtitle 、 images 、 price

type ：类型 Elasticsearch 中支持的数据类型非常丰富，说几个关键的：

基本数据类型：long 、 integer 、 short 、 byte 、 double 、 float 、 half_float

浮点数的高精度类型：scaled_float

text：可分词

keyword：不可分词，数据会作为完整字段进行匹配

String 类型，又分两种：

Numerical ：数值类型，分两类

Date ：日期类型

Array ：数组类型

Object ：对象

index ：是否索引，默认为 true ，也就是说你不进行任何配置，所有字段都会被索引。

true：字段会被索引，则可以用来进行搜索

false：字段不会被索引，不能用来搜索

store ：是否将数据进行独立存储，默认为 false

原始的文本会存储在_source 里面，默认情况下其他提取出来的字段都不是独立存储的，是从 _source 里面提取出来的。当然你也可以独立的存储某个字段，只要设置"store": true 即可，获取独立存储的字段要比从 _source 中解析快得多，但是也会占用更多的空间，所以要根据实际业务需求来设置。

analyzer ：分词器，这里的 ik_max_word 即使用 ik 分词器

```

### 查看映射

在 Postman 中，向 ES 服务器发 GET 请求http://127.0.0.1:9200/user/_mapping

### 索引映射关联

PUT 请求 http://127.0.0.1:9200/user1

## Idea 操作

```xml
        <dependency>
            <groupId>org.elasticsearch.client</groupId>
            <artifactId>elasticsearch-rest-high-level-client</artifactId>
            <version>6.6.2</version>
            <exclusions>
                <exclusion>
                    <groupId>org.elasticsearch</groupId>
                    <artifactId>elasticsearch</artifactId>
                </exclusion>
            </exclusions>
        </dependency>

        <dependency>
            <groupId>org.elasticsearch</groupId>
            <artifactId>elasticsearch</artifactId>
            <version>6.6.2</version>
        </dependency>
```

创建单元测试类

```JAVA
public class ElstaicSearch {
    @Test
    public void fun1() throws IOException {
        //9200 端口为 Elastic s earch 的 Web 通信端口 localhost 为启动 ES 服务的主机名
        RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost",9200)));
        client.close();

    }
}

```

没有任何输出或报错信息即是成功

### 创建索引

```java
        //9200 端口为 Elastic s earch 的 Web 通信端口 localhost 为启动 ES 服务的主机名
        RestHighLevelClient client = new RestHighLevelClient(
                RestClient.builder(new HttpHost("localhost",9200)));
        //创建索引
        CreateIndexRequest request = new CreateIndexRequest("pic");
        CreateIndexResponse response = client.indices().create(request, RequestOptions.DEFAULT);
        //创建索引的响应状态
        boolean acknowledged = response.isAcknowledged();
        System.out.println("响应状态为：" + acknowledged);
        client.close();
```

### 查询

```JAVA
        //查询索引
        GetIndexRequest request = new GetIndexRequest().indices("pic");
        GetIndexResponse response = client.indices().get(request, RequestOptions.DEFAULT);
        //查询索引的响应状态
        System.out.println(response);
        System.out.println(response.getSettings());
        System.out.println(response.getAliases());
        System.out.println(response.getMappings());
        client.close();
```

# 项目

## 创建索引

在kibana的可视化下的开发工具里运行

进入http://192.168.56.10:5601/app/management/kibana/spaces

点击D---->看到索引管理

```JSON
PUT /course-publish

{
  "settings": {
    "number_of_shards": 1,
    "number_of_replicas": 0
  },
  "mappings": {
    "properties": {
      "id": {
        "type": "keyword"
      },
      "companyId": {
        "type": "keyword"
      },
      "companyName": {
        "analyzer": "ik_max_word",
        "search_analyzer": "ik_smart",
        "type": "text"
      },
      "name": {
        "analyzer": "ik_max_word",
        "search_analyzer": "ik_smart",
        "type": "text"
      },
      "users": {
        "index": false,
        "type": "text"
      },
      "tags": {
        "analyzer": "ik_max_word",
        "search_analyzer": "ik_smart",
        "type": "text"
      },
      "mt": {
        "type": "keyword"
      },
      "mtName": {
        "type": "keyword"
      },
      "st": {
        "type": "keyword"
      },
      "stName": {
        "type": "keyword"
      },
      "grade": {
        "type": "keyword"
      },
      "teachmode": {
        "type": "keyword"
      },
      "pic": {
        "index": false,
        "type": "text"
      },
      "description": {
        "analyzer": "ik_max_word",
        "search_analyzer": "ik_smart",
        "type": "text"
      },
      "createDate": {
        "format": "yyyy-MM-dd HH:mm:ss",
        "type": "date"
      },
      "status": {
        "type": "keyword"
      },
      "remark": {
        "index": false,
        "type": "text"
      },
      "charge": {
        "type": "keyword"
      },
      "price": {
        "type": "scaled_float",
        "scaling_factor": 100
      },
      "originalPrice": {
        "type": "scaled_float",
        "scaling_factor": 100
      },
      "validDays": {
        "type": "integer"
      }
    }
  }
}
```



## 删除索引

```json
DELETE /course-publish
```

## 查询索引

```json
 GET /_cat/indices?v                     查询所有的索引
 GET /course-publish/_mapping            查询course-publish的索引结构
 GET course-publish                      查询单个索引
```

## 创建文档

```json
POST /course-publish/_doc/103
{
  "charge" : "201001",
  "companyId" : 100000,
  "companyName" : "北京黑马程序",
  "createDate" : "2022-09-25 09:36:11",
  "description" : "HTML/CSS",
  "grade" : "204001",
  "id" : 102,
  "mt" : "1-1",
  "mtName" : "前端开发",
  "name" : "Html参考大全",
  "originalPrice" : 200.0,
  "pic" : "/mediafiles/2022/09/20/e726b71ba99c70e8c9d2850c2a7019d7.jpg",
  "price" : 100.0,
  "remark" : "没有备注",
  "st" : "1-1-1",
  "stName" : "HTML/CSS",
  "status" : "203002",
  "tags" : "没有标签",
  "teachmode" : "200002",
  "validDays" : 222
}
```

查

```
GET /course-publish/_doc/103
```

## 更新文档

更新文档分为全量更新和局部更新。

全量更新是指先删除再更新，语法如下：

```json
PUT /course-publish/_doc/103 { "字段1": "值1",   "字段2": "值2",   // ... 略 } 
```

局部更新语法如下：

```SHELL
POST /{索引库名}/_update/文档id {   "doc": { "字段名": "新的值",  } }
```

## **删除文档**

删除文档将从索引中删除文档的记录。

语法如下：

```shell
 DELETE /{索引库名}/_doc/id值
```
