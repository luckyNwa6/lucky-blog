---
title: RAG 学习笔记
cover: https://cloud.luckynwa.top/profile/yys/364.webp
description: 路漫漫其修远兮，吾将上下而求索
categories: 人工智能
tags: Python
comments: true
abbrlink: rag732
summary: >-
  RAG（检索增强生成）是一种将检索系统与大语言模型结合的技术方案，通过从知识库中检索相关文档再交给LLM生成回答，有效解决了大模型幻觉和私有数据缺失的问题。本文从RAG的原理、分块策略、双路检索（BM25稀疏+BGE稠密）、RRF融合算法、重排序、Prompt构造到大模型调用，完整梳理了RAG系统的架构与实现。核心流程包括：PDF读取→文本分块→向量化→多路检索→融合重排→LLM生成。文中还总结了文档乱码、颗粒度控制、检索准确率、查询重写等常见问题及解决方案，适合RAG入门学习与实践参考。
date: 2026-04-06 14:30:00
---

## 什么是 RAG？

RAG = Retrieval-Augmented Generation
中文：**检索增强生成**

一句话理解：

> 先从资料中"查答案"，再让大模型"根据资料作答"。

## 为什么需要 RAG？

企业内部的资料，大模型不一定有，所以会出现乱说

还有不可能把几百页的说明书给大模型的，这样开销很大

大模型有两个问题：

1. 会胡编（幻觉 hallucination）
2. 不知道私有数据

RAG 解决方式：

```
问题
 ↓
去知识库查资料
 ↓
把资料交给大模型
 ↓
大模型根据资料回答
```

## RAG 整体流程

**离线阶段：** 文档解析 → Chunk 切分 → Embedding 向量化 → 向量入库

**在线阶段：** 用户问题 Embedding → 语义缓存匹配 → Milvus 向量检索 + BM25 混合召回 → Reranker 精排 → Prompt 拼接 → 大模型生成答案

```
┌──────────────────────────────────────────────────────────────────────┐
│                          离 线 阶 段                                  │
│                                                                      │
│  PDF 文档解析                                                         │
│       ↓                                                              │
│  文本分片（Chunking）  按段落/章节字数等，LLM有上下文长度限制              │
│       ↓                                                              │
│  Embedding  将文字翻译为高维度向量，语义相近则空间距离就近                 │
│       ↓                                                              │
│  向量数据库（Milvus）  存储 向量 + 原始文本的对照表                      │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│                          在 线 阶 段                                  │
│                                                                      │
│  用户提问                                                             │
│       ↓                                                              │
│  Embedding 向量化                                                     │
│       ↓                                                              │
│  语义缓存匹配  ──命中──→  直接返回缓存答案                              │
│       ↓ 未命中                                                        │
│  双路检索召回                                                          │
│  ┌──────────────────────────┐  ┌──────────────────────────┐           │
│  │    BM25 稀疏检索          │  │    BGE 稠密检索           │           │
│  │                          │  │                          │           │
│  │  用户查询                 │  │  用户查询                 │           │
│  │    ↓                     │  │    ↓                     │           │
│  │  分词 → 词频统计（TF）     │  │  BGE 模型 Embedding       │           │
│  │    ↓                     │  │    ↓                     │           │
│  │  逆文档频率（IDF）计算     │  │  生成查询向量 Q            │           │
│  │    ↓                     │  │    ↓                     │           │
│  │  TF × IDF 得分            │  │  ANN 索引检索（HNSW/IVF） │           │
│  │    ↓                     │  │  余弦相似度计算 cos(Q,D)   │           │
│  │  按关键词匹配度排序        │  │    ↓                     │           │
│  │    ↓                     │  │  按语义相似度排序          │           │
│  │  返回 Top-K 候选文档      │  │  返回 Top-K 候选文档      │           │
│  └──────────┬───────────────┘  └──────────┬───────────────┘           │
│             └──────────┬──────────────────┘                           │
│                  ↓                                                    │
│          RRF 融合算法（Reciprocal Rank Fusion）                        │
│                  ↓                                                    │
│          Reranker 精排（bge-reranker-base）                            │
│                  ↓                                                    │
│          构造 Prompt（角色设定 + 规则 + 检索资料 + 问题）                 │
│                  ↓                                                    │
│          调用大模型（GLM）                                              │
│                  ↓                                                    │
│          生成答案                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

## 常见问题与解决方案

1. 文档解析出现乱码，表格行错位 → OCR + 人工复核
2. 颗粒度问题 → 切太大噪音太多，太小语义丢失
3. 检索准确率 → 加入混合检索 + rerank
4. 用户提问模糊性 → 比如问"货没了去补"，需要查询重写（Query Rewrite）后再去搜索

大模型选型和评估标准：

1. 推理能力
2. 指令遵循能力
3. 防幻觉能力

进阶方案：GraphRAG 和 Agentic RAG

## 分块策略

`chunk_size`：256 / 512 / 1024（token 或字节）

`chunk_overlap`：10%~20% 相邻块重叠部分，防止语意断裂

**策略：**

**基础分块：** 固定长度、递归字符（首选，按优先级分隔符递归切分 `\n\n` → `\n` → `" "`，能保留句子完整性）、按句切分

**结构感知：** HTML、Markdown、对话格式

**语义/主题：** 向量相似度

**高级策略：** 小-大分块、代理分块（让模型切分，成本很高）

**复杂文档最佳实践：** 采用混合分块，可以先按结构粗切，再语义/递归细切，做命中率测试

**建议：**

| 场景          | 推荐方式                                       |
| ------------- | ---------------------------------------------- |
| 通用文本      | 递归字符分块（RecursiveCharacterTextSplitter） |
| Markdown 文档 | MarkdownHeaderTextSplitter                     |
| HTML 页面     | HTMLHeaderTextSplitter                         |
| 追求最高精度  | SemanticChunker（成本高）                      |
| 代码文件      | 按函数/类切分，保留完整结构                    |

### LangChain 分块伪代码

```python
from langchain.text_splitter import (
    RecursiveCharacterTextSplitter,
    CharacterTextSplitter,
    MarkdownHeaderTextSplitter,
    HTMLHeaderTextSplitter,
)

# 1. 递归字符分块（首选）
splitter = RecursiveCharacterTextSplitter(
    chunk_size=512,       # 每块最大长度
    chunk_overlap=50,     # 相邻块重叠
    separators=["\n\n", "\n", "。", "！", "？", " "],  # 按优先级递归切分
    length_function=len,  # 按字符数计算
)
chunks = splitter.split_text(document)

# 2. 固定长度分块
splitter = CharacterTextSplitter(
    chunk_size=256,
    chunk_overlap=20,
    separator="\n",       # 尽量在换行处切
)
chunks = splitter.split_text(document)

# 3. Markdown 结构感知分块
headers_to_split = [
    ("#", "h1"),
    ("##", "h2"),
    ("###", "h3"),
]
splitter = MarkdownHeaderTextSplitter(headers_to_split=headers_to_split)
# 按标题层级拆分，每个 chunk 自带标题元数据
docs = splitter.split_text(markdown_text)

# 4. HTML 结构感知分块
headers_to_split = [("h1", "Header 1"), ("h2", "Header 2")]
splitter = HTMLHeaderTextSplitter(headers_to_split=headers_to_split)
docs = splitter.split_text(html_text)

# 5. 语义分块（需要 embedding 模型）
from langchain_experimental.text_splitter import SemanticChunker
from langchain_openai import OpenAIEmbeddings

splitter = SemanticChunker(
    OpenAIEmbeddings(),
    breakpoint_threshold_type="percentile",  # 按相似度百分位切
)
docs = splitter.split_text(document)
```

## 检索策略

1. **假想性文档嵌入：** 让 LLM 生成理想答案，再去向量化检索
2. **混合搜索：** 先通过向量相似度找到相近的，再 BM25 稀疏检索锁定匹配结构，加权融合结果合并，向量 0.6，关键词 0.4
3. **多子问题检索：** 让大语言模型生成多个语义等价的子问题，再去查，然后用 RAG-Fusion 的 RRF 算法对多个查询结果进行打分重排，强调共识文档——就是多个评委都打分了就是它了
4. **抽象+具体双路：** 用户问的过具体，可以让 LLM 抽象问题，将 2 个都拿去检索，既抓细节，又抓背景
