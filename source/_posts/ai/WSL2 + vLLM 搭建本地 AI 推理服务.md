---
title: WSL2 + vLLM 搭建本地 AI 推理服务
cover: https://imgs.luckynwa.top/openApi/lucky/yys/206
description: 粗缯大布裹生涯，腹有诗书气自华
categories: 人工智能
tags: Ops
comments: true
abbrlink: ai5
summary: >-
  本文记录了在 Windows 上通过 WSL2 部署 vLLM 推理服务的完整流程。首先在管理员 PowerShell 中启用 WSL2 功能并安装 Ubuntu，随后配置 SSH 远程连接与端口转发。接着安装 Miniconda 创建 Python 3.10 环境，部署 vLLM 0.8.5 并下载 Qwen3-4B-Instruct 模型进行推理服务搭建。同时详细说明了 Embedding 和 Reranker 服务的部署方法，包括模型下载、服务启动以及通过 systemd 实现开机自启的配置。最后通过端口转发和防火墙规则将服务映射到宿主机，方便局域网访问。
date: 2025-09-29 03:38:44
---

# WSL2 和 vLLM 部署指南

用 **管理员 PowerShell**

```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

重启电脑

```powershell
wsl --set-default-version 2
wsl --update
wsl --status
```

安装 Ubuntu（不开科学也挺快）

```powershell
wsl --install -d Ubuntu
```

过后创建号：`lucky` / `221...`

更新系统

```bash
sudo apt update
sudo apt upgrade -y
```

#临时用管理员

```bash
sudo -i
```

## 安装 Miniconda

```bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh     # 一直回车 或 yes
```

生效

```bash
source ~/.bashrc
```

验证

```bash
conda --version
```

## 配置 SSH

```bash
sudo apt install openssh-server -y
sudo service ssh start
service ssh status
passwd        # 221...
```

端口转发到 2222（管理员 PowerShell）

```powershell
netsh interface portproxy add v4tov4 listenport=2222 listenaddress=0.0.0.0 connectport=22 connectaddress=172.24.212.8
```

开防火墙

```powershell
netsh advfirewall firewall add rule name="WSL SSH" dir=in action=allow protocol=TCP localport=2222
```

测试

```bash
ssh lucky@127.0.0.1 -p 2222
```

## 配置 root SSH 登录

```bash
sudo -i
passwd root     # 也改成 221..
nano /etc/ssh/sshd_config
```

#不去找注释了，直接新增下面2行

```
PermitRootLogin yes
PasswordAuthentication yes
```

#保存退出 重启

```
Ctrl + O
Enter
Ctrl + X
```

```bash
service ssh restart
```

## 修复终端提示符过长

```bash
unset PROMPT_COMMAND
echo 'unset PROMPT_COMMAND' >> ~/.bashrc
```

## 安装 Python 3.10 环境

```bash
conda tos accept --override-channels --channel https://repo.anaconda.com/pkgs/main
conda tos accept --override-channels --channel https://repo.anaconda.com/pkgs/r
conda remove -n vllm --all -y         # 移除环境
conda create -n vllm python=3.10 -y   # 安装环境
conda activate vllm
pip install -U pip
```

```bash
apt-get update
apt-get install -y gcc
```

## 安装 vLLM 依赖

指定版本，因为我的显卡3080的驱动不支持太新的pytorch版本，安装vllm自动安装pytorch

```bash
pip install vllm==0.8.5
pip show vllm
pip install transformers==4.51.1 --force-reinstall
pip install numpy==2.0.2 --force-reinstall
pip install --force-reinstall \
  fastapi==0.110.0 \
  starlette==0.36.3 \
  prometheus-fastapi-instrumentator==7.0.0
```

## 配置模型下载路径

```bash
mkdir -p /nwa/hf_models
chmod -R 777 /nwa/hf_models
export HF_HOME=/nwa/hf_models
echo 'export HF_HOME=/nwa/hf_models' >> ~/.bashrc
source ~/.bashrc
echo $HF_HOME
# 设置国内镜像就不用科学下载了
export HF_ENDPOINT=https://hf-mirror.com
```

## 检查 GPU 环境

```bash
apt install -y nvidia-utils-560
nvidia-smi
python -c "import torch; print(torch.version.cuda)"
python -c "import torch; print(torch.backends.cuda.is_built())"
```

## 下载模型

### 方法一：HuggingFace 官方源

```bash
pip install -U huggingface_hub
huggingface-cli download Qwen/Qwen3-4B-Instruct-2507 \
  --local-dir /nwa/hf_models/Qwen3-4B-Instruct-2507 \
  --resume-download \
  --local-dir-use-symlinks False
```

### 方法二：ModelScope 国内源

```bash
pip install modelscope -U
modelscope download --model Qwen/Qwen3-4B-Instruct-2507 \
  --local_dir /nwa/hf_models/Qwen3-4B-Instruct-2507
```

## 部署 vLLM 推理服务

### 直接从线上下载部署

```bash
vllm serve Qwen/Qwen2.5-7B-Instruct \
  --host 0.0.0.0 \
  --port 9089
```

### 用已下载的模型部署（推荐）

```bash
vllm serve /nwa/hf_models/Qwen3-4B-Instruct-2507 \
  --host 0.0.0.0 \
  --port 9089 \
  --dtype half \
  --kv-cache-dtype fp8 \
  --max-model-len 1024 \
  --gpu-memory-utilization 0.99 \
  --enforce-eager \
  --trust-remote-code
```

切换到 root 并激活环境

```bash
su - root
conda activate vllm
```

## 映射 vLLM 端口到宿主机

管理员执行

```powershell
netsh interface portproxy add v4tov4 listenport=9089 listenaddress=0.0.0.0 connectport=9089 connectaddress=172.24.212.8
netsh advfirewall firewall add rule name="vllm-9089" dir=in action=allow protocol=TCP localport=9089
```

# Embedding 和 Reranker 部署

## 创建环境并安装依赖

```bash
conda create -n embedding python=3.10 -y

conda activate embedding
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple   # 配置pip默认阿里云镜像
export VLLM_USE_MODELSCOPE=True
pip install modelscope
pip install vllm==0.8.5
pip show vllm
pip install transformers==4.51.1 --force-reinstall
pip install numpy==2.0.2 --force-reinstall
pip install --force-reinstall \
  fastapi==0.110.0 \
  starlette==0.36.3 \
  prometheus-fastapi-instrumentator==7.0.0
```

## 下载 Embedding 模型

```bash
modelscope download --model Qwen/Qwen3-Embedding-0.6B \
  --local_dir /nwa/hf_models/Qwen3-Embedding-0.6B
```

## 启动 Embedding 服务

```bash
conda activate embedding
vllm serve --task embed /nwa/hf_models/Qwen3-Embedding-0.6B --host 0.0.0.0 --port 8000
```

验证：`localhost:8000/v1/models`

映射到宿主机

```powershell
netsh interface portproxy add v4tov4 listenport=8000 listenaddress=0.0.0.0 connectport=8000 connectaddress=172.24.212.8
netsh advfirewall firewall add rule name="embedding-8000" dir=in action=allow protocol=TCP localport=8000
```

## 下载 Reranker 模型

```bash
modelscope download --model BAAI/bge-reranker-base \
  --local_dir /nwa/hf_models/BAAI/bge-reranker-base
```

## 启动 Reranker 服务

```bash
vllm serve /nwa/hf_models/BAAI/bge-reranker-base --task score --host 0.0.0.0 --port 7999
```

验证：`localhost:7999/v1/models`

映射到宿主机

```powershell
netsh interface portproxy add v4tov4 listenport=7999 listenaddress=0.0.0.0 connectport=7999 connectaddress=172.24.212.8
netsh advfirewall firewall add rule name="embedding-7999" dir=in action=allow protocol=TCP localport=7999
```

## 改造为 systemd 自动启动服务

### 服务一：Embedding

```bash
sudo nano /etc/systemd/system/vllm-embedding.service
```

```ini
[Unit]
Description=vLLM Embedding Server
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=root
WorkingDirectory=/root

ExecStart=/root/miniconda3/envs/embedding/bin/vllm serve \
    /nwa/hf_models/Qwen3-Embedding-0.6B \
    --task embed \
    --host 0.0.0.0 \
    --port 8000

Restart=always
RestartSec=5

Environment="PATH=/root/miniconda3/envs/embedding/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
Environment="PYTHONUNBUFFERED=1"

[Install]
WantedBy=multi-user.target
```

### 服务二：Reranker

```bash
sudo nano /etc/systemd/system/vllm-reranker.service
```

```ini
[Unit]
Description=vLLM Reranker Server
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=root
WorkingDirectory=/root

ExecStart=/root/miniconda3/envs/embedding/bin/vllm serve \
    /nwa/hf_models/BAAI/bge-reranker-base \
    --task score \
    --host 0.0.0.0 \
    --port 7999

Restart=always
RestartSec=5

Environment="PATH=/root/miniconda3/envs/embedding/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
Environment="PYTHONUNBUFFERED=1"

[Install]
WantedBy=multi-user.target
```

### 启用并启动服务

```bash
sudo systemctl daemon-reload

sudo systemctl enable vllm-embedding
sudo systemctl enable vllm-reranker

sudo systemctl start vllm-embedding
sudo systemctl start vllm-reranker
```

查看状态

```bash
systemctl status vllm-embedding
systemctl status vllm-reranker
```

查看日志

```bash
journalctl -u vllm-embedding -f
journalctl -u vllm-reranker -f
```
