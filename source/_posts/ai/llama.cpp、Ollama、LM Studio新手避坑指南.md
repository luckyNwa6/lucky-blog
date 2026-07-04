---
title: llama.cpp、Ollama、LM Studio新手避坑指南
cover: https://imgs.luckynwa.top/openApi/lucky/yys/19
description: 黑发不知勤学早，白首方悔读书迟
categories: 人工智能
tags: tool
comments: true
abbrlink: ai7
summary: >-
  记录本地部署大模型的完整流程：Ollama快速上手与第三方模型加载、llama.cpp的CUDA版本选择与编译、
  Qwen/Gemma等模型在不同显卡（4080/3080/N100）上的性能测试对比，
  以及LM Studio安装使用和大模型客户端推荐。附带常用命令与配置参考。
date: 2024-07-13 00:51:15
---

# 简介

 llama.cpp 是"底层推理引擎"，Ollama 和 LM Studio 均是基于它封装的上层应用，Ollama 是"命令行版"，LM Studio 是"图形界面版"，三者本质都是让你在自己电脑上跑大模型，只是封装层级不同。

# Ollama

Ollama是一个开源的大型语言模型服务工具，它帮助用户快速在本地运行大模型。

**除了要搭建服务给别人调用，否则不推荐使用！**

官网下载安装包：https://ollama.com/

1、默认是安装到C盘的，改N盘，N:\AI\Ollama新建它
2、将OLLAMA的安装包放在N:\AI\Ollama下
3、路径CMD回车
`OllamaSetup.exe /DIR=N:\AI\OLLAMA`

设置它，创建N:\AI\Ollama\models放模型

首先看显卡性能、6g显存-->qwen:4b 无显存-->qwen:0.5b

ollama https://github.com/ollama/ollama

个人登录 https://ollama.com/luckyNwa，能领取免费的cloud模型使用

查看模型库qwen2

https://ollama.com/library/qwen2

装了半小时

```bash
ollama list

N100 无显卡
ollama run qwen:0.5b
ollama run qwen3.5:cloud    云端有免费额度
ollama run qwen3.5:397b-cloud

ollama run gemma-4-26b-local
ollama rm gemma-4-26b-local     移除模型
```

## API

访问地址：`http://ip:11434/api/generate`

```json
{
  "model": "qwen:0.5b",
  "prompt": "你是谁?"
}
```

返回 JSON 对象流。

更多 API 查看：[Ollama API 文档](https://github.com/ollama/ollama/blob/main/docs/api.md)

## 环境变量配置

如果想将本地运行的模型外网或局域网访问，则需要去配置 **环境变量**

修改 IP 访问：

```shell
OLLAMA_HOST=0.0.0.0:11434
```

修改跨域访问：

```shell
OLLAMA_ORIGINS=*
```

> 否则访问会出现 403，再关闭 Ollama 重启即可，笔记本防火墙需要关闭。

修改 GPU 释放：

```shell
OLLAMA_KEEP_ALIVE=2m
```

> 默认是 5m，降低 GPU 占用。

修改模型位置：

```shell
OLLAMA_MODELS=D:\lucky\OllamaModels
```

改完关闭进程，再 cmd 启动：

```shell
ollama run qwen:0.5b
```

## 使用docker安装

```shell
docker pull registry.cn-hangzhou.aliyuncs.com/lucky-warehouse/ollama

docker run -d -v /nwa/ollama:/root/.ollama -p 11434:11434 --privileged=true --name ollama registry.cn-hangzhou.aliyuncs.com/lucky-warehouse/ollama

docker exec -it ollama ollama run qwen:0.5b
```

### 进入容器操作

```shell
docker exec -it ollama bash
ollama run qwen:0.5b
export OLLAMA_HOST=0.0.0.0:11434
```

> 搞半天没啥软用，端口忘记穿透了

### 网络配置

发现在 1Panel 中的 IP 地址是 `172.17.0.5`，每次重启容器会变，需要注意。分析之后发现都存于 `172.17.0.1` 这个网关下，填这个就行了。而且 MaxKB（看另一篇文章） 也是这个地址，可以直接输入它在 MaxKB 中：

```shell
http://172.17.0.5:11434
```

# llama.cpp

llama.cpp的Github地址：[Releases · ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp/releases)

N:\AI\llama.cpp下安装2个llama.cpp，一个12版本一个13版本的 , 13需要比较新的驱动和显卡

复制C:\Program Files\NVIDIA GPU Computing Toolkit\ 到文件夹地址上并查看当前cuda工具包的版本====CUDA\v12.2的

发现是12的，下载12的[Release b8828 · ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp/releases/tag/b8828?utm_source=chatgpt.com) 8828版本稳定点

下载13的去https://developer.nvidia.com/cuda-downloads?target_os=Windows&target_arch=x86_64&target_version=10&target_type=exe_local

需要会开科学上网

```bash
nvcc --version   当前使用版本
nvidia-smi
```

```bash
cmd 路径 N:\AI\llama.cpp\cuda12

.\llama-cli.exe -m ..\models\ZL-Qwen3.6-35B-MOE-FP4.gguf -ngl 100 --color auto --reasoning off
```

异常 回答速度 [ Prompt: 43.8 t/s | Generation: 10.9 t/s ]

正常速度 [ Prompt: 133.5 t/s | Generation: 21.4 t/s ] 4080 16g显存，这个混合专家模型18.4GB

去N:\AI\llama.cpp\cuda12下cmd运行

```bash
.\llama-bench.exe --list-devices    输入这个查看cuda有没有用上
```

结果：

```text
N:\AI\llama.cpp\cuda12>.\llama-bench.exe --list-devices
ggml_cuda_init: found 1 CUDA devices (Total VRAM: 16375 MiB):
  Device 0: NVIDIA GeForce RTX 4080, compute capability 8.9, VMM: yes, VRAM: 16375 MiB
load_backend: loaded CUDA backend from N:\AI\llama.cpp\cuda12\ggml-cuda.dll
load_backend: loaded RPC backend from N:\AI\llama.cpp\cuda12\ggml-rpc.dll
load_backend: loaded CPU backend from N:\AI\llama.cpp\cuda12\ggml-cpu-alderlake.dll
Available devices:
  CUDA0: NVIDIA GeForce RTX 4080 (16375 MiB, 15048 MiB free)
```

测试拉满这个12g模型，显卡对应token速度

```bash
.\llama-bench.exe -m ..\models\gemma-4-26B-A4B-it-UD-IQ4_NL\gemma-4-26B-A4B-it-UD-IQ4_NL\gemma-4-26B-A4B-it-UD-IQ4_NL.gguf -ngl 100
```

cuda版本没对上用cpu运行结果如下：

```text
N:\AI\llama.cpp\cuda12>.\llama-bench.exe -m ..\models\gemma-4-26B-A4B-it-UD-IQ4_NL\gemma-4-26B-A4B-it-UD-IQ4_NL\gemma-4-26B-A4B-it-UD-IQ4_NL.gguf -ngl 100

load_backend: loaded RPC backend from N:\AI\llama\llama-b8827-bin-win-cuda-13.1-x64\ggml-rpc.dll
load_backend: loaded CPU backend from N:\AI\llama\llama-b8827-bin-win-cuda-13.1-x64\ggml-cpu-alderlake.dll
| model                          |       size |     params | backend    | threads |            test |                  t/s |
| ------------------------------ | ---------: | ---------: | ---------- | ------: | --------------: | -------------------: |
| gemma4 ?B IQ4_NL - 4.5 bpw     |  12.48 GiB |    25.23 B | CPU        |      16 |           pp512 |         52.06 ± 0.09 |
| gemma4 ?B IQ4_NL - 4.5 bpw     |  12.48 GiB |    25.23 B | CPU        |      16 |           tg128 |         10.69 ± 0.10 |

build: fcc750875 (8828)
```

显卡加载正常：

```text
N:\AI\llama.cpp\cuda12>.\llama-bench.exe -m ..\models\gemma-4-26B-A4B-it-UD-IQ4_NL\gemma-4-26B-A4B-it-UD-IQ4_NL\gemma-4-26B-A4B-it-UD-IQ4_NL.gguf -ngl 100
ggml_cuda_init: found 1 CUDA devices (Total VRAM: 16375 MiB):
  Device 0: NVIDIA GeForce RTX 4080, compute capability 8.9, VMM: yes, VRAM: 16375 MiB
load_backend: loaded CUDA backend from N:\AI\llama.cpp\cuda12\ggml-cuda.dll
load_backend: loaded RPC backend from N:\AI\llama.cpp\cuda12\ggml-rpc.dll
load_backend: loaded CPU backend from N:\AI\llama.cpp\cuda12\ggml-cpu-alderlake.dll
| model                          |       size |     params | backend    | ngl |            test |                  t/s |
| ------------------------------ | ---------: | ---------: | ---------- | --: | --------------: | -------------------: |
| gemma4 26B.A4B IQ4_NL - 4.5 bpw |  12.48 GiB |    25.23 B | CUDA       | 100 |           pp512 |     5417.02 ± 110.14 |
| gemma4 26B.A4B IQ4_NL - 4.5 bpw |  12.48 GiB |    25.23 B | CUDA       | 100 |           tg128 |        131.50 ± 0.50 |

build: fcc750875 (8828)
```

4080 16G显存结果：

```text
N:\AI\llama.cpp\cuda12>.\llama-bench.exe -m ..\models\Qwen3-14B-Q4_K_M.gguf -ngl 100
ggml_cuda_init: found 1 CUDA devices (Total VRAM: 16375 MiB):
  Device 0: NVIDIA GeForce RTX 4080, compute capability 8.9, VMM: yes, VRAM: 16375 MiB
load_backend: loaded CUDA backend from N:\AI\llama.cpp\cuda12\ggml-cuda.dll
load_backend: loaded RPC backend from N:\AI\llama.cpp\cuda12\ggml-rpc.dll
load_backend: loaded CPU backend from N:\AI\llama.cpp\cuda12\ggml-cpu-alderlake.dll
| model                          |       size |     params | backend    | ngl |            test |                  t/s |
| ------------------------------ | ---------: | ---------: | ---------- | --: | --------------: | -------------------: |
| qwen3 14B Q4_K - Medium        |   8.38 GiB |    14.77 B | CUDA       | 100 |           pp512 |     3866.13 ± 125.80 |
| qwen3 14B Q4_K - Medium        |   8.38 GiB |    14.77 B | CUDA       | 100 |           tg128 |         66.49 ± 0.03 |

build: fcc750875 (8828)
```

3080 10Gx显存结果：

```text
D:\AI\llama.cpp\cuda12>.\llama-bench.exe -m ..\models\Qwen3-14B-Q4_K_M.gguf -ngl 100
ggml_cuda_init: found 1 CUDA devices (Total VRAM: 10239 MiB):
  Device 0: NVIDIA GeForce RTX 3080, compute capability 8.6, VMM: yes, VRAM: 10239 MiB
load_backend: loaded CUDA backend from D:\AI\llama.cpp\cuda12\ggml-cuda.dll
load_backend: loaded RPC backend from D:\AI\llama.cpp\cuda12\ggml-rpc.dll
load_backend: loaded CPU backend from D:\AI\llama.cpp\cuda12\ggml-cpu-zen4.dll
| model                          |       size |     params | backend    | ngl |            test |                  t/s |
| ------------------------------ | ---------: | ---------: | ---------- | --: | --------------: | -------------------: |
| qwen3 14B Q4_K - Medium        |   8.38 GiB |    14.77 B | CUDA       | 100 |           pp512 |      2341.71 ± 48.03 |
| qwen3 14B Q4_K - Medium        |   8.38 GiB |    14.77 B | CUDA       | 100 |           tg128 |         65.09 ± 0.76 |

build: fcc750875 (8828)
```

16G显存跑下面

```bash
.\llama-server.exe -m N:\AI\llama.cpp\models\gemma-4-26B-A4B-it-UD-IQ4_NL\gemma-4-26B-A4B-it-UD-IQ4_NL\gemma-4-26B-A4B-it-UD-IQ4_NL.gguf -ngl 100 -c 16384 -ctk q8_0 -ctv q8_0

.\llama-server.exe -m "N:\AI\llama.cpp\models\Qwen3-Coder-30B-A3B-Instruct-Q3_K_M\Qwen3-Coder-30B-A3B-Instruct-Q3_K_M\Qwen3-Coder-30B-A3B-Instruct-Q3_K_M.gguf" -ngl 100 -c 16384 -ctk q8_0 -ctv q8_0
```

10G显存跑

```bash
.\llama-server.exe -m "..\models\Qwen3-14B-Q4_K_M.gguf" -ngl 999 -c 4096 -ctk q4_0 -ctv q4_0 -fa on --host 0.0.0.0 --port 8080

3080、4080跑这个模型都 59 t/s
```

http://127.0.0.1:8080

# LM Studio

它就是一个"本地版 ChatGPT"——你可以把各种开源大模型下载到电脑上，断网也能用，而且所有数据都不上传云端，完全隐私安全

https://lmstudio.ai

安装进入自动llama.cpp-win-x86_64-nvidia-cuda12-avx2 (2.13.0)这个比较慢，开科学虚拟卡模式

# 模型下载

[国内模型库（ModelScope）](https://www.modelscope.cn/models)

[gemma-4-26B-A4B-it-GGUF · 模型库](https://www.modelscope.cn/models/unsloth/gemma-4-26B-A4B-it-GGUF?utm_source=copilot.com)

页面的右边有4bit的，Q4量化的，可以在4080显卡16g显存下跑，下载放到N:\AI\llama.cpp\models\gemma-4-26B-A4B-it-UD-IQ4_NL\gemma-4-26B-A4B-it-UD-IQ4_NL下

**别装了，ollama太拉了，就是llamcpp套一层壳的，速度还比llamcpp慢，用lm studio和llamcpp折腾玩耍大模型**

新建Modelfile

```text
FROM ./gemma-4-26B-A4B-it-UD-IQ4_NL.gguf
TEMPLATE """{{ .Prompt }}"""
```

cmd 进入这个路径

```bash
ollama create gemma-4-26b-local -f Modelfile
```

出现success 即可

需要科学上网：[国外模型库（huggingface）](https://huggingface.co/models)



# AI 大模型客户端

连接用户与大模型之间的"桥梁"或"遥控器"，自身不包含大模型，需要搭配后端服务使用

## Lobe Chat

Lobe Chat是一个可以本地部署的、支持多模型的 AI 聊天客户端，类似于一个"万能 AI 遥控器"，把各种大模型整合到一个界面里统一管理

```shell
docker run -d -p 3210:3210 -e OLLAMA_PROXY_URL=http://host.docker.internal:11434 lobehub/lobe-chat
```

去设置那语言模型，只勾选 Ollama，模型列表只留下 `deepseek-r1:7b`，再检查默认助手（模型就选 `deepseek-r1:7b`）只能使用。

## Cherry Studio（使用中）

Cherry Studio 是一款全能型 AI 助手桌面客户端,能把各种大模型统一接入的"AI 工作台

直接去官网下载win版本，配置一下，开箱即用

https://cherry-ai.com

## 其他

| 层级                 | 工具                         |
| -------------------- | ---------------------------- |
| 纯聊天界面           | Chatbox、NextChat            |
| 聊天 + 多模型管理    | LobeChat、Cherry Studio      |
| 聊天 + 知识库 + 插件 | Open WebUI、AnythingLLM      |
| 本地模型运行器       | Ollama、LM Studio、llama.cpp |
