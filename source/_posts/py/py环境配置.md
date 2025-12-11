---
title: python环境配置
description: 工欲善其事，必先利其器
categories: 工具
tags: Java
comments: true
abbrlink: 12121
summary: >-
  启动小维AI摘要模块⚡……运算完成！这篇文章系统讲解了 Conda 的常用操作，包括环境创建、激活、删除、安装与卸载包的方法，并展示了 Windows 与 Mac 下的包查询方式。内容进一步说明了如何使用 Miniconda 创建 Python 3.12 环境、配置系统环境变量，以及在 Pycharm 中绑定 Conda 环境。文章还整理了深度学习常用库（如 Numpy、Pandas、Jieba、Matplotlib、Scikit-learn、Transformers、Peft、FastAPI、Pytorch、Gensim 等）的安装命令、版本要求与注意事项。最后对 Anaconda 与 Miniconda 作出对比，阐述它们在体积、灵活性、依赖管理方式上的差异，为用户从零搭建 Python 与深度学习开发环境提供了一条清晰完整的指导路径。
date: 2025-11-11 20:32:28
---

## conda 常用命令

- env_name：指的是创建的环境名称

  - 假设创建的环境名为：py312，在执行命令时，把`env_name`替换为`py312`

- package_name：指的是需要安装的包名

  - 假设安装的包名为`numpy`，在执行命令时，把`package_name`替换为`numpy`

```shell
查看当前环境下是否安装了指定的包
conda env list                      查看所有环境

conda activate env_name             进入某个py环境

conda deactivate                    退出当前py环境

conda remove -n env_name --all      删除指定的py环境

conda config --remove-key channels  删除Anaconda镜像源并恢复默认

---查看当前环境下是否安装了指定的包
conda list | findstr 指定的包名       win
conda list | grep 指定的包名          Mac

---查看指定环境下是否安装了指定的包
conda list -n env_name | findstr 指定的包名     win
conda list -n env_name | grep 指定的包名        Mac

---安装需要的第三方包（库）【进入到py虚拟环境下】
conda install package_name          【这种方式的安装，默认安装最新版】

conda install package_name==版本号   【安装指定版本号的包】

conda安装不成功时，尝试pip命令（把conda替换成pip）

pip install package_name==版本号 -i 源链接

源链接1： https://pypi.tuna.tsinghua.edu.cn/simple
源链接2： https://mirrors.aliyun.com/pypi/simple

---卸载指定的包（库）【进入到py虚拟环境下】
conda uninstall package_name

pip uninstall package_name         通过pip安装的包卸载
```

## 创建 py 环境

```shell
打开cmd创建python版本号为3.12的虚拟环境

conda create -n py312 python=3.12         输入：y，回车

激活这个环境出现...init ..   输入 conda ini 不行就重开cmd窗口
conda activate py312

conda deactivate                          退出当前环境

conda remove -n py312 --all               删除指定的py环境

pip install jupyterlab                    后续再验证一下这个包

pip install notebook

python -m notebook                        浏览器中打开Jupyter Notebook的界面
```

## 软件安装

### Miniconda

安装 Miniconda3-py312_24.9.2-0-Windows-x86_64.exe 默认下一步即可 安装目录下面

新建文件夹 D:\soft\miniconda3

**配置 Miniconda 环境变量**

右键此电脑，点击属性 -> 高级系统设置 -> 环境变量 -> 系统变量 -> Path，选中编辑

**一次增加一条以下配置项**

```shell
D:\soft\miniconda3
D:\soft\miniconda3\Scripts
D:\soft\miniconda3\Library\bin
```

**确定\*3，环境变量设置完毕**

WIN+R 输入 cmd 回车

```shell
conda info
```

看到

```shell
     active environment : None
       user config file : C:\Users\Administrator\.condarc
 populated config files : D:\soft\miniconda3\.condarc
          conda version : 24.9.2
```

...即可

### Pycharm

**作用：** 用于编写 python 代码，运行课程中的代码

[win 版点击下载专业版](https://download.jetbrains.com/python/pycharm-professional-2024.1.3.exe)

[mac M4](https://download.jetbrains.com/python/pycharm-community-2024.1.3-aarch64.dmg)

使用本文章 说明---> pycharm 激活码

## 深度学习环境配置

- **anaconda 创建 py 环境：**

> 打开 cmd，进入（激活）需要的 py 环境：`conda activate 环境名`
> 以 py312 环境为例：`conda activate py312`

### Numpy

- **作用：** 用于科学计算，提供了高性能的多维数组对象和丰富的数学函数

  ```
  pip install numpy==1.26.4 -i https://pypi.tuna.tsinghua.edu.cn/simple
  ```

> **当使用清华源下载失败时，可尝试更换为阿里源、别开代理** > **清华源：** `https://pypi.tuna.tsinghua.edu.cn/simple` > **阿里源：** `https://mirrors.aliyun.com/pypi/simple`

### Pandas

- **作用：** 用于数据分析，提供了灵活的数据结构（如 DataFrame），使数据清洗和分析变得简单高效

- **命令：**

  ```
  pip install pandas==2.2.2 -i https://pypi.tuna.tsinghua.edu.cn/simple
  ```

### Jieba

- **作用：** jieba 是一个专门用于中文文本分词的 Python 库,可以将连续的中文字符切分为有意义的词语

- **命令**：

  ```
  pip install jieba -i https://pypi.tuna.tsinghua.edu.cn/simple
  ```

### Matplotlib

- **作用：** 用于数据可视化，能够创建静态、动态和交互式图表

- **命令** ：

  ```
  pip install matplotlib==3.9.2 -i https://pypi.tuna.tsinghua.edu.cn/simple
  ```

### Scikit-learn

- **作用：** 提供了简单高效的数据挖掘和数据分析工具，支持多种机器学习算法

- **命令：**

  ```
  pip install Scikit-learn==1.5.1 -i https://pypi.tuna.tsinghua.edu.cn/simple
  ```

### Peft

- **作用：** 模型微调

- **命令：**

  ```
  pip install peft==0.15.0 -i https://pypi.tuna.tsinghua.edu.cn/simple
  ```

### transformers

- **作用：** 通过自注意力机制和位置编码，实现对序列数据的高效处理

- **命令：**

  ```
  pip install transformers==4.56.2 -i https://pypi.tuna.tsinghua.edu.cn/simple
  ```

### fastapi[standard]

- **作用**： 现代、快速（高性能）的 Python Web 框架，用于构建 API

- **命令**：

  ```
  pip install fastapi[standard] -i https://pypi.tuna.tsinghua.edu.cn/simple   Win命令
  pip install fastapi -i https://pypi.tuna.tsinghua.edu.cn/simple             Mac命令
  ```

### mypy

- **作用**： 静态类型检查工具，它使用 Python 的类型提示（Type Hints）来检查代码中的类型错误。

- **命令**：

  ```
  pip install mypy -i https://pypi.tuna.tsinghua.edu.cn/simple
  ```

### Pytorch

- **作用：** 深度学习领域的顶级框架，提供了构建和训练神经网络的工具

- **安装文档：**

  ```
  torch安装分为两种，一种是CPU安装方式，一种是GPU安装方式，两者取其一

  安装CPU版本torch
  python版本：python 3.12【注意：安装torch，python必须为64位】

  CPU Only方式安装：

  打开cmd/终端，进入到对应的虚拟环境中：conda activate py312
  命令：
  python -m pip install torch==2.6.0 -i https://pypi.tuna.tsinghua.edu.cn/simple/
  注意：

  有些Mac电脑最高只能安装2.2.2版本的torch，所以提示版本问题时，将2.6.0改为2.2.2
  安装其他版本的torch，只需要将版本号2.6.0更改为其他版本号，同时注意库之间的依赖关系

  测试是否安装成功，输入python，回车，进入到python的shell中

  复制粘贴以下代码：
  import torch
  # __version__：左右各两个"_"
  print(torch.__version__)
  # 如果返回：2.6.0+cpu代表安装成功，Mac电脑只显示2.6.0，是正常的
  注意：图只是作为输出Torch版本演示使用，版本号 不必和图中完全一致，正常会输出安装的版本号

  CPU版pytorch安装成功，测试完成之后，输入：exit()，回车，退出python的交互窗口

  安装GPU版本torch
  安装cuda和cudnn注意事项
  1、判断自己的显卡可不可以，例如GTX960mx，只要后面有mx的都不建议安装，mx250，mx350 同样不建议
  2、如果自己的显卡在GTX1080ti或者更高版本，首先在conda环境中安装 gpu版本的Pytorch
  3、在环境中conda list下，就会有你需要安装的cudnn与cuda版本链接，去官网下载对应版本安装即可
  4、显卡驱动版本与CUDA的版本对应关系：
  https://docs.nvidia.com/cuda/cuda-toolkit-release-notes/index.html

  cuda版安装步骤：
  1、检查cuda版本：nvidia-smi，可以看到CUDA Version版本
  2、打开torch官网安装页面（https://pytorch.org/get-started/previous-versions），选择与cuda匹配的torch版本
  3、选择完成之后，激活对应的py环境，运行torch

  具体torch安装步骤参考：https://blog.csdn.net/2301_80350862/article/details/150612499
  注意：gpu版torch参考文章中，可以忽略已安装过的软件，直接从【CUDA安装】开始往下看
  ```

### Gensim

- **作用：** 用于主题建模和文本相似性计算

- **安装文档：**

  ```
  gensim 4.0.0 不再支持 Python 2.7, 如果必须使用 Python 2.7，请安装gensim 3.8.3

  安装gensim时，python版本不一致，所需的gensim版本不一定一致，具体需要查看官网文档

  本地python环境（conda）
  python = 3.12

  在线安装gensim【推荐】
  使用的环境为py312
  conda activate py312

  安装命令：
  pip install gensim -i https://pypi.tuna.tsinghua.edu.cn/simple
  返回：Successfully installed gensim-x.x.x, 代表安装成功


  离线安装gensim

  打开网站https://pypi.org/project/

  输入gensim, 选择第一个搜索结果

  点击Release history, 点击需要安装的版本

  点击Download files, 选择合适的whl文件下载到本地

      示例：gensim-4.2.0-cp38-cp38-win_amd64.whl

      gensim-4.2.0：代表gensim的版本为4.2.0

      cp38：代表cpython的版本为3.8

      win_amd64：代表windows 64位系统

  进入到whl文件所在目录，在此处打开cmd

  使用：pip install gensim-4.2.0-cp38-cp38-win_amd64.whl(后面的gensim-xxx-xxx, 可以使用Tab键补全)
  ```

## 说明

### Anaconda

Anaconda 是一个开源的 Python 和 R 编程语言发行版，专为科学计算和数据科学设计

它简化了包管理和部署，提供了一个方便的环境来进行数分析、机器学习以及科学计算

自身包含了 python 解释器，不需要额外的安装 Python SDK

**主要特点**

Anaconda 包含了 Conda 包管理器，可以轻松安装、更新、管理和卸载 Python 包和依赖项

1. 多版本支持：可以在同一系统上管理和切换不同版本的 Python 和包

**优点**

**默认安装了大量常用的包，适合需要快速搭建数据科学和机器学习环境的用户**

**提供了 Anaconda Navigator 图形界面，用户可以轻松管理包和环境，启动 Jupyter Notebook 等工具**

**缺点**

**安装包大：Anaconda 的安装包较大（几百兆到几个 GB），占用较多的磁盘空间**

**包版本更新：由于包含了大量的包，更新和维护所有包的版本不如手动安装的方式灵活**

### Miniconda

自身包含了 python 解释器，不需要额外的安装 Python SDK

Miniconda 是 Anaconda 的一个精简版本，它仅包含 Conda 包管理器及其依赖项，用户可以根据需要安装其他包

Miniconda 的目标是提供一个最小化的安装选项，以便用户可以自定义自己的包环境

**优点**

1. **轻量级：安装包小，安装速度快，占用磁盘空间少**

1. **灵活性：用户可以根据自己的需求安装需要的包，而不是安装一大堆可能用不到的包**

**缺点**

1. **初始安装后需要手动安装所需的包，适合有一定经验的用户**

1. **不包含 Anaconda Navigator 图形界面，所有操作需要通过命令行完成**

总结：Miniconda 提供了与 Anaconda 同样的功能，但以更轻量和灵活的方式实现，所以安装 Anaconda 和 Miniconda 都是可以的

### pycharm 激活码

```shell
EUWT4EE9X2-eyJsaWNlbnNlSWQiOiJFVVdUNEVFOVgyIiwibGljZW5zZWVOYW1lIjoic2lnbnVwIHNjb290ZXIiLCJhc3NpZ25lZU5hbWUiOiIiLCJhc3NpZ25lZUVtYWlsIjoiIiwibGljZW5zZVJlc3RyaWN0aW9uIjoiIiwiY2hlY2tDb25jdXJyZW50VXNlIjpmYWxzZSwicHJvZHVjdHMiOlt7ImNvZGUiOiJQU0kiLCJmYWxsYmFja0RhdGUiOiIyMDI1LTA4LTAxIiwicGFpZFVwVG8iOiIyMDI1LTA4LTAxIiwiZXh0ZW5kZWQiOnRydWV9LHsiY29kZSI6IlBDIiwiZmFsbGJhY2tEYXRlIjoiMjAyNS0wOC0wMSIsInBhaWRVcFRvIjoiMjAyNS0wOC0wMSIsImV4dGVuZGVkIjpmYWxzZX0seyJjb2RlIjoiUFBDIiwiZmFsbGJhY2tEYXRlIjoiMjAyNS0wOC0wMSIsInBhaWRVcFRvIjoiMjAyNS0wOC0wMSIsImV4dGVuZGVkIjp0cnVlfSx7ImNvZGUiOiJQV1MiLCJmYWxsYmFja0RhdGUiOiIyMDI1LTA4LTAxIiwicGFpZFVwVG8iOiIyMDI1LTA4LTAxIiwiZXh0ZW5kZWQiOnRydWV9LHsiY29kZSI6IlBDV01QIiwiZmFsbGJhY2tEYXRlIjoiMjAyNS0wOC0wMSIsInBhaWRVcFRvIjoiMjAyNS0wOC0wMSIsImV4dGVuZGVkIjp0cnVlfV0sIm1ldGFkYXRhIjoiMDEyMDIyMDkwMlBTQU4wMDAwMDUiLCJoYXNoIjoiVFJJQUw6MzUzOTQ0NTE3IiwiZ3JhY2VQZXJpb2REYXlzIjo3LCJhdXRvUHJvbG9uZ2F0ZWQiOmZhbHNlLCJpc0F1dG9Qcm9sb25nYXRlZCI6ZmFsc2V9-FT9l1nyyF9EyNmlelrLP9rGtugZ6sEs3CkYIKqGgSi608LIamge623nLLjI8f6O4EdbCfjJcPXLxklUe1O/5ASO3JnbPFUBYUEebCWZPgPfIdjw7hfA1PsGUdw1SBvh4BEWCMVVJWVtc9ktE+gQ8ldugYjXs0s34xaWjjfolJn2V4f4lnnCv0pikF7Ig/Bsyd/8bsySBJ54Uy9dkEsBUFJzqYSfR7Z/xsrACGFgq96ZsifnAnnOvfGbRX8Q8IIu0zDbNh7smxOwrz2odmL72UaU51A5YaOcPSXRM9uyqCnSp/ENLzkQa/B9RNO+VA7kCsj3MlJWJp5Sotn5spyV+gA==-MIIETDCCAjSgAwIBAgIBDTANBgkqhkiG9w0BAQsFADAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBMB4XDTIwMTAxOTA5MDU1M1oXDTIyMTAyMTA5MDU1M1owHzEdMBsGA1UEAwwUcHJvZDJ5LWZyb20tMjAyMDEwMTkwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCUlaUFc1wf+CfY9wzFWEL2euKQ5nswqb57V8QZG7d7RoR6rwYUIXseTOAFq210oMEe++LCjzKDuqwDfsyhgDNTgZBPAaC4vUU2oy+XR+Fq8nBixWIsH668HeOnRK6RRhsr0rJzRB95aZ3EAPzBuQ2qPaNGm17pAX0Rd6MPRgjp75IWwI9eA6aMEdPQEVN7uyOtM5zSsjoj79Lbu1fjShOnQZuJcsV8tqnayeFkNzv2LTOlofU/Tbx502Ro073gGjoeRzNvrynAP03pL486P3KCAyiNPhDs2z8/COMrxRlZW5mfzo0xsK0dQGNH3UoG/9RVwHG4eS8LFpMTR9oetHZBAgMBAAGjgZkwgZYwCQYDVR0TBAIwADAdBgNVHQ4EFgQUJNoRIpb1hUHAk0foMSNM9MCEAv8wSAYDVR0jBEEwP4AUo562SGdCEjZBvW3gubSgUouX8bOhHKQaMBgxFjAUBgNVBAMMDUpldFByb2ZpbGUgQ0GCCQDSbLGDsoN54TATBgNVHSUEDDAKBggrBgEFBQcDATALBgNVHQ8EBAMCBaAwDQYJKoZIhvcNAQELBQADggIBABqRoNGxAQct9dQUFK8xqhiZaYPd30TlmCmSAaGJ0eBpvkVeqA2jGYhAQRqFiAlFC63JKvWvRZO1iRuWCEfUMkdqQ9VQPXziE/BlsOIgrL6RlJfuFcEZ8TK3syIfIGQZNCxYhLLUuet2HE6LJYPQ5c0jH4kDooRpcVZ4rBxNwddpctUO2te9UU5/FjhioZQsPvd92qOTsV+8Cyl2fvNhNKD1Uu9ff5AkVIQn4JU23ozdB/R5oUlebwaTE6WZNBs+TA/qPj+5/we9NH71WRB0hqUoLI2AKKyiPw++FtN4Su1vsdDlrAzDj9ILjpjJKA1ImuVcG329/WTYIKysZ1CWK3zATg9BeCUPAV1pQy8ToXOq+RSYen6winZ2OO93eyHv2Iw5kbn1dqfBw1BuTE29V2FJKicJSu8iEOpfoafwJISXmz1wnnWL3V/0NxTulfWsXugOoLfv0ZIBP1xH9kmf22jjQ2JiHhQZP7ZDsreRrOeIQ/c4yR8IQvMLfC0WKQqrHu5ZzXTH4NO3CwGWSlTY74kE91zXB5mwWAx1jig+UXYc2w4RkVhy0//lOmVya/PEepuuTTI4+UJwC7qbVlh5zfhj8oTNUXgN0AOc+Q0/WFPl1aw5VV/VrO8FCoB15lFVlpKaQ1Yh+DVU8ke+rt9Th0BCHXe0uZOEmH0nOnH/0onD
```

### Pycharm 配置 conda 环境

```shell
文件---->设置---->项目---->python 解释器---->添加解释器---->Conda 环境---->

使用现有环境---->选文件路径 D:\soft\miniconda3\Scripts\conda.exe---->加载环境---->下拉选择需要的虚拟环境确定即可
```
