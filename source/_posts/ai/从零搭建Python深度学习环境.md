---
title: 从零搭建Python深度学习环境
description: 读书不觉已春深，一寸光阴一寸金
categories: 人工智能
cover: https://imgs.luckynwa.top/openApi/lucky/yys/75
tags: Python
comments: true
sticky: 37
abbrlink: ai6
summary: >-
  本文系统讲解了 Conda 的常用操作，包括环境创建、激活、删除、安装与卸载包的方法，并展示了 Windows 与 Mac 下的包查询方式。内容进一步说明了如何使用 Miniconda 创建 Python 3.12 环境、配置系统环境变量，以及在 Pycharm 中绑定 Conda 环境。文章还整理了深度学习常用库（如 Numpy、Pandas、Jieba、Matplotlib、Scikit-learn、Transformers、Peft、FastAPI、Pytorch、Gensim 等）的安装命令、版本要求与注意事项。最后对 Anaconda 与 Miniconda 作出对比，阐述它们在体积、灵活性、依赖管理方式上的差异，为用户从零搭建 Python 与深度学习开发环境提供了一条清晰完整的指导路径。
date: 2026-02-06 09:30:03
---

## conda 常用命令

**环境说明：**

- `env_name`：创建的环境名称（如 `py312`）
- `package_name`：需要安装的包名（如 `numpy`）

```shell
# 查看所有环境
conda env list

# 进入某个py环境
conda activate env_name

# 退出当前py环境
conda deactivate

# 删除指定的py环境
conda remove -n env_name --all

# 删除Anaconda镜像源并恢复默认
conda config --remove-key channels

# 查看当前环境下是否安装了指定的包
conda list | findstr 指定的包名       # win
conda list | grep 指定的包名          # Mac

# 查看指定环境下是否安装了指定的包
conda list -n env_name | findstr 指定的包名     # win
conda list -n env_name | grep 指定的包名        # Mac

# 安装需要的第三方包（库）【进入到py虚拟环境下】
conda install package_name          # 安装最新版
conda install package_name==版本号   # 安装指定版本

# conda安装不成功时，尝试pip命令
pip install package_name==版本号 -i 源链接

# 卸载指定的包（库）【进入到py虚拟环境下】
conda uninstall package_name
pip uninstall package_name         # 通过pip安装的包卸载
```

**常用镜像源：**

- 清华源：`https://pypi.tuna.tsinghua.edu.cn/simple`
- 阿里源：`https://mirrors.aliyun.com/pypi/simple`

## 创建 py 环境

```shell
# 打开cmd创建python版本号为3.12的虚拟环境
conda create -n py312 python=3.12         # 输入：y，回车

# 激活环境
conda activate py312

# 退出当前环境
conda deactivate

# 删除指定的py环境
conda remove -n py312 --all

# 安装Jupyter相关包
pip install jupyterlab
pip install notebook
python -m notebook                        # 浏览器中打开Jupyter Notebook
```

## 软件安装

### Miniconda

**安装步骤：**

1. 新建文件夹 D:\soft\miniconda3
2. 安装 `Miniconda3-py312_24.9.2-0-Windows-x86_64.exe`，默认下一步即可

WIN+R 输入 cmd

```shell
conda init
conda info
先配置下面，记得创建文件夹cdataenv\pkgs 和 envs
conda config --add pkgs_dirs D:\soft2\cdataenv\pkgs
conda config --add envs_dirs D:\soft2\cdataenv\envs

pip config set global.cache-dir D:\soft2\cdataenv\pip_cache
setx PIP_CACHE_DIR D:\soft2\cdataenv\pip_cache
set PIP_CACHE_DIR=D:\soft2\cdataenv\pip_cache


conda create -n py312 python=3.12         输入：y，回车
conda create -n py310 python=3.10


conda activate py312
(py312) C:\Users\Administrator>where python
C:\Users\Administrator\.conda\envs\py312\python.exe

如果上面配置好了还是在c盘就问ai
解决D:\soft\miniconda3我安装在这，为什么c盘里.conda占用12.6，我希望放这下D:\soft2\cdataenv
```

### Pycharm

**作用：** 用于编写 python 代码，运行课程中的代码

- [Win版下载（专业版）](https://download.jetbrains.com/python/pycharm-professional-2024.1.3.exe)
- [Mac M4版下载](https://download.jetbrains.com/python/pycharm-community-2024.1.3-aarch64.dmg)

激活码参考：pycharm 激活码

## 深度学习环境配置

> 打开 cmd，进入需要的 py 环境：`conda activate py312`

### Numpy

**作用：** 用于科学计算，提供了高性能的多维数组对象和丰富的数学函数

```shell
pip install numpy==1.26.4 -i https://pypi.tuna.tsinghua.edu.cn/simple
```

> 当清华源下载失败时，可尝试更换为阿里源、别开代理

### Pandas

**作用：** 用于数据分析，提供了灵活的数据结构（如 DataFrame），使数据清洗和分析变得简单高效

```shell
pip install pandas==2.2.2 -i https://pypi.tuna.tsinghua.edu.cn/simple
```

### Mineru

**作用：** 开源的，用于复杂PDF 文档解析和转换 的工具。它的核心目标是将 PDF 文档高效、准确地转换为易于编辑和阅读的Markdown 格式

```shell
pip install --upgrade pip -i https://mirrors.aliyun.com/pypi/simple
pip install uv -i https://mirrors.aliyun.com/pypi/simple
uv pip install -U "mineru[core]" -i https://mirrors.aliyun.com/pypi/simple
```

**使用方法**

- 命令行使用 （离线使用）

```commandline
mineru -p <input_path> -o <output_path>
```

- fastapi 部署 （部署为服务，在线使用）

```commandline
mineru-api --host 0.0.0.0 --port 8000 --allow-public-http-client
```

### Jieba

**作用：** jieba 是一个专门用于中文文本分词的 Python 库，可以将连续的中文字符切分为有意义的词语

```shell
pip install jieba -i https://pypi.tuna.tsinghua.edu.cn/simple
```

### Matplotlib

**作用：** 用于数据可视化，能够创建静态、动态和交互式图表

```shell
pip install matplotlib==3.9.2 -i https://pypi.tuna.tsinghua.edu.cn/simple
```

### Scikit-learn

**作用：** 提供了简单高效的数据挖掘和数据分析工具，支持多种机器学习算法

```shell
pip install Scikit-learn==1.5.1 -i https://pypi.tuna.tsinghua.edu.cn/simple
```

### Peft

**作用：** 模型微调

```shell
pip install peft==0.15.0 -i https://pypi.tuna.tsinghua.edu.cn/simple
```

### Transformers

**作用：** 通过自注意力机制和位置编码，实现对序列数据的高效处理

```shell
pip install transformers==4.56.2 -i https://pypi.tuna.tsinghua.edu.cn/simple
```

### FastAPI

**作用：** 现代、快速（高性能）的 Python Web 框架，用于构建 API

```shell
# Win命令
pip install fastapi[standard] -i https://pypi.tuna.tsinghua.edu.cn/simple
# Mac命令
pip install fastapi -i https://pypi.tuna.tsinghua.edu.cn/simple
```

### Mypy

**作用：** 静态类型检查工具，它使用 Python 的类型提示（Type Hints）来检查代码中的类型错误

```shell
pip install mypy -i https://pypi.tuna.tsinghua.edu.cn/simple
```

### Pytorch

**作用：** 深度学习领域的顶级框架，提供了构建和训练神经网络的工具

**CPU 版本安装：**

```shell
# 进入虚拟环境
conda activate py312

# 安装CPU版本torch
python -m pip install torch==2.6.0 -i https://pypi.tuna.tsinghua.edu.cn/simple/

# 测试是否安装成功
python
>>> import torch
>>> print(torch.__version__)
# 返回：2.6.0+cpu 代表安装成功


# 安装GPU版本torch
# 进入py312环境
pip uninstall torch torchvision torchaudio -y
# cmd执行
nvidia-smi    # 发现cuda版本12.7    3060笔记本电脑和4060ti主机
# 3060-4080的GPU版本 个人的2台电脑，控制驱动版本
pip install torch==2.6.0 torchvision torchaudio --index-url https://download.pytorch.org/whl/cu124
# 5070ti的GPU版本
pip install torch==2.11.0 torchvision torchaudio --index-url https://download.pytorch.org/whl/cu128

import torch
print(torch.cuda.is_available())
print(torch.cuda.get_device_name(0))
print(torch.cuda.current_device())
print(torch.cuda.get_device_capability())
```

### Gensim

**作用：** 用于主题建模和文本相似性计算

```shell
# 在线安装（推荐）
conda activate py312
pip install gensim -i https://pypi.tuna.tsinghua.edu.cn/simple

# 离线安装
# 1. 访问 https://pypi.org/project/gensim/
# 2. 点击 Release history → 选择版本 → Download files
# 3. 下载对应的 .whl 文件（如 gensim-4.2.0-cp38-cp38-win_amd64.whl）
# 4. 进入 whl 文件所在目录，执行：
pip install gensim-4.2.0-cp38-cp38-win_amd64.whl
```

## Anaconda 与 Miniconda 对比

### Anaconda

Anaconda 是一个开源的 Python 和 R 编程语言发行版，专为科学计算和数据科学设计。它简化了包管理和部署，自身包含了 python 解释器，不需要额外安装 Python SDK。

**主要特点：**

- 包含了 Conda 包管理器，可以轻松安装、更新、管理和卸载 Python 包和依赖项
- 多版本支持：可以在同一系统上管理和切换不同版本的 Python 和包
- 默认安装了大量常用的包，适合需要快速搭建数据科学和机器学习环境的用户
- 提供了 Anaconda Navigator 图形界面，用户可以轻松管理包和环境

**缺点：**

- 安装包较大（几百兆到几个 GB），占用较多的磁盘空间
- 更新和维护所有包的版本不如手动安装的方式灵活

### Miniconda

Miniconda 是 Anaconda 的一个精简版本，它仅包含 Conda 包管理器及其依赖项，用户可以根据需要安装其他包。

**优点：**

- 轻量级：安装包小，安装速度快，占用磁盘空间少
- 灵活性：用户可以根据自己的需求安装需要的包

**缺点：**

- 初始安装后需要手动安装所需的包，适合有一定经验的用户
- 不包含 Anaconda Navigator 图形界面，所有操作需要通过命令行完成

**总结：** Miniconda 提供了与 Anaconda 同样的功能，但以更轻量和灵活的方式实现，所以安装 Anaconda 和 Miniconda 都是可以的。

## Pycharm 配置 conda 环境

```shell
文件 → 设置 → 项目 → python 解释器 → 添加解释器 → Conda 环境 → 使用现有环境 → 选文件路径 D:\soft\miniconda3\Scripts\conda.exe → 加载环境 → 下拉选择需要的虚拟环境确定即可
```

```shell
PyCharm →File → Settings → Tools → Terminal → Shell path 查看终端，默认进入这个环境

cmd.exe /K "D:\soft\miniconda3\condabin\conda.bat activate py312"
```

### 激活码

```
EUWT4EE9X2-eyJsaWNlbnNlSWQiOiJFVVdUNEVFOVgyIiwibGljZW5zZWVOYW1lIjoic2lnbnVwIHNjb290ZXIiLCJhc3NpZ25lZU5hbWUiOiIiLCJhc3NpZ25lZUVtYWlsIjoiIiwibGljZW5zZVJlc3RyaWN0aW9uIjoiIiwiY2hlY2tDb25jdXJyZW50VXNlIjpmYWxzZSwicHJvZHVjdHMiOlt7ImNvZGUiOiJQU0kiLCJmYWxsYmFja0RhdGUiOiIyMDI1LTA4LTAxIiwicGFpZFVwVG8iOiIyMDI1LTA4LTAxIiwiZXh0ZW5kZWQiOnRydWV9LHsiY29kZSI6IlBDIiwiZmFsbGJhY2tEYXRlIjoiMjAyNS0wOC0wMSIsInBhaWRVcFRvIjoiMjAyNS0wOC0wMSIsImV4dGVuZGVkIjpmYWxzZX0seyJjb2RlIjoiUFBDIiwiZmFsbGJhY2tEYXRlIjoiMjAyNS0wOC0wMSIsInBhaWRVcFRvIjoiMjAyNS0wOC0wMSIsImV4dGVuZGVkIjp0cnVlfSx7ImNvZGUiOiJQV1MiLCJmYWxsYmFja0RhdGUiOiIyMDI1LTA4LTAxIiwicGFpZFVwVG8iOiIyMDI1LTA4LTAxIiwiZXh0ZW5kZWQiOnRydWV9LHsiY29kZSI6IlBDV01QIiwiZmFsbGJhY2tEYXRlIjoiMjAyNS0wOC0wMSIsInBhaWRVcFRvIjoiMjAyNS0wOC0wMSIsImV4dGVuZGVkIjp0cnVlfV0sIm1ldGFkYXRhIjoiMDEyMDIyMDkwMlBTQU4wMDAwMDUiLCJoYXNoIjoiVFJJQUw6MzUzOTQ0NTE3IiwiZ3JhY2VQZXJpb2REYXlzIjo3LCJhdXRvUHJvbG9uZ2F0ZWQiOmZhbHNlLCJpc0F1dG9Qcm9sb25nYXRlZCI6ZmFsc2V9-FT9l1nyyF9EyNmlelrLP9rGtugZ6sEs3CkYIKqGgSi608LIamge623nLLjI8f6O4EdbCfjJcPXLxklUe1O/5ASO3JnbPFUBYUEebCWZPgPfIdjw7hfA1PsGUdw1SBvh4BEWCMVVJWVtc9ktE+gQ8ldugYjXs0s34xaWjjfolJn2V4f4lnnCv0pikF7Ig/Bsyd/8bsySBJ54Uy9dkEsBUFJzqYSfR7Z/xsrACGFgq96ZsifnAnnOvfGbRX8Q8IIu0zDbNh7smxOwrz2odmL72UaU51A5YaOcPSXRM9uyqCnSp/ENLzkQa/B9RNO+VA7kCsj3MlJWJp5Sotn5spyV+gA==-MIIETDCCAjSgAwIBAgIBDTANBgkqhkiG9w0BAQsFADAYMRYwFAYDVQQDDA1KZXRQcm9maWxlIENBMB4XDTIwMTAxOTA5MDU1M1oXDTIyMTAyMTA5MDU1M1owHzEdMBsGA1UEAwwUcHJvZDJ5LWZyb20tMjAyMDEwMTkwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCUlaUFc1wf+CfY9wzFWEL2euKQ5nswqb57V8QZG7d7RoR6rwYUIXseTOAFq210oMEe++LCjzKDuqwDfsyhgDNTgZBPAaC4vUU2oy+XR+Fq8nBixWIsH668HeOnRK6RRhsr0rJzRB95aZ3EAPzBuQ2qPaNGm17pAX0Rd6MPRgjp75IWwI9eA6aMEdPQEVN7uyOtM5zSsjoj79Lbu1fjShOnQZuJcsV8tqnayeFkNzv2LTOlofU/Tbx502Ro073gGjoeRzNvrynAP03pL486P3KCAyiNPhDs2z8/COMrxRlZW5mfzo0xsK0dQGNH3UoG/9RVwHG4eS8LFpMTR9oetHZBAgMBAAGjgZkwgZYwCQYDVR0TBAIwADAdBgNVHQ4EFgQUJNoRIpb1hUHAk0foMSNM9MCEAv8wSAYDVR0jBEEwP4AUo562SGdCEjZBvW3gubSgUouX8bOhHKQaMBgxFjAUBgNVBAMMDUpldFByb2ZpbGUgQ0GCCQDSbLGDsoN54TATBgNVHSUEDDAKBggrBgEFBQcDATALBgNVHQ8EBAMCBaAwDQYJKoZIhvcNAQELBQADggIBABqRoNGxAQct9dQUFK8xqhiZaYPd30TlmCmSAaGJ0eBpvkVeqA2jGYhAQRqFiAlFC63JKvWvRZO1iRuWCEfUMkdqQ9VQPXziE/BlsOIgrL6RlJfuFcEZ8TK3syIfIGQZNCxYhLLUuet2HE6LJYPQ5c0jH4kDooRpcVZ4rBxNwddpctUO2te9UU5/FjhioZQsPvd92qOTsV+8Cyl2fvNhNKD1Uu9ff5AkVIQn4JU23ozdB/R5oUlebwaTE6WZNBs+TA/qPj+5/we9NH71WRB0hqUoLI2AKKyiPw++FtN4Su1vsdDlrAzDj9ILjpjJKA1ImuVcG329/WTYIKysZ1CWK3zATg9BeCUPAV1pQy8ToXOq+RSYen6winZ2OO93eyHv2Iw5kbn1dqfBw1BuTE29V2FJKicJSu8iEOpfoafwJISXmz1wnnWL3V/0NxTulfWsXugOoLfv0ZIBP1xH9kmf22jjQ2JiHhQZP7ZDsreRrOeIQ/c4yR8IQvMLfC0WKQqrHu5ZzXTH4NO3CwGWSlTY74kE91zXB5mwWAx1jig+UXYc2w4RkVhy0//lOmVya/PEepuuTTI4+UJwC7qbVlh5zfhj8oTNUXgN0AOc+Q0/WFPl1aw5VV/VrO8FCoB15lFVlpKaQ1Yh+DVU8ke+rt9Th0BCHXe0uZOEmH0nOnH/0onD
```
