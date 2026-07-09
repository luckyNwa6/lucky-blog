---
title: 企业级Docker监控体系搭建
cover: https://imgs.luckynwa.top/profile/yys/555.webp
description: 星星之火，可以燎原
categories: 工具
tags: Docker
comments: true
abbrlink: tool356
summary: >-
  本文介绍了基于 Docker 环境搭建完整监控体系的全过程，包括 cAdvisor 用于容器级监控、Node Exporter 用于主机级指标采集、Prometheus 作为核心监控系统进行数据汇聚与告警规则管理、AlertManager 负责告警去重分组与邮件通知、Grafana 提供可视化看板展示。文章详细给出了各组件的 Dockerfile 编写、容器启动命令、配置文件编写及访问地址，适合运维人员快速上手部署。
date: 2024-03-27 10:30:33
---

## cAdvisor 6060

cAdvisor（Container Advisor）是 Google 开源的容器监控工具，能够实时采集 Docker 的 CPU、内存、网络、文件系统等资源使用指标，并提供 Web UI 和 API 接口，是 Prometheus 生态中容器级监控的核心组件。

浏览器打开 https://github.com/google/cadvisor/releases/download/v0.46.0/cadvisor-v0.46.0-linux-amd64 ，自动下载文件。

上传到 `/nwa/cAdvisor` 文件夹下，并新建 Dockerfile 文件，内容如下：

```Dockerfile
# ubuntu作为基础镜像
FROM ubuntu:latest
LABEL cadvisor 0.46.0
# 将下载的二进制文件复制到容器里
COPY ./cadvisor-v0.46.0-linux-amd64 /usr/bin/cadvisor
# 赋予权限
RUN chmod +x /usr/bin/cadvisor
# 指定程序入口，这里使用ENTERYPOINT而不使用CMD的原因是cadvisor启动时有很多的启动参数，
# 使用CMD会需要指定太多参数，不够简洁。
ENTRYPOINT ["/usr/bin/cadvisor"]
```

构建镜像：

```shell
cd /nwa/cAdvisor
docker build -t cadvisor:0.46.0 .
```

运行容器：

```shell
docker run \
--volume=/:/rootfs:ro \
--volume=/var/run:/var/run:ro \
--volume=/sys:/sys:ro \
--volume=/var/lib/docker/:/var/lib/docker:ro \
--volume=/dev/disk/:/dev/disk:ro \
--publish=6060:8080 \
--detach=true \
--name=cadvisor \
--userns=host \
--privileged \
--device=/dev/kmsg \
cadvisor:0.46.0
```

数据公开指标：`http://ip:6060/metrics`

使用 Prometheus 监控 cAdvisor。

## Node Exporter 9100

Node Exporter 是 Prometheus 官方提供的主机指标采集器，用于收集物理机或虚拟机的 CPU、内存、磁盘、网络等硬件和操作系统层面的运行指标，是 Prometheus 主机级监控的核心组件。

默认端口为 9100，改了端口发现无法访问。

```shell
# 安装Node Exporter 来收集硬件信息

docker run -d \
--net="host" \
--pid="host" \
--userns="host" \
-v "/:/host:ro,rslave" \
--name node_exporter \
quay.io/prometheus/node-exporter:latest \
--path.rootfs=/host


docker run -d \
--net="host" \
--pid="host" \
--userns="host" \
-v "/:/host:ro,rslave" \
--name node_exporter \
registry.cn-hangzhou.aliyuncs.com/lucky-warehouse/node-exporter \
--path.rootfs=/host


docker logs node_exporter  # 查看日志
```

访问地址：`http://ip:9100/metrics`

可补充指令（在 `/host` 后面补充）：

```shell
\
--collector.disable-defaults \
--collector.arp --collector.bcache
```

`collector.` 启用指标，`--no-collector.` 禁用指标，`--collector.disable-defaults` 禁用所有默认启用的指标。

## Prometheus 6061

Prometheus 是一款开源的监控告警系统，具备灵活的多维数据模型和强大的 PromQL 查询语言，支持自动服务发现和拉取式指标采集，是整个监控体系的核心调度中枢。

在 `/nwa/prometheus` 下新建 `prometheus.yml`：

```yaml
global:
  # 每20s获取一次数据指标
  scrape_interval: 20s
  # 获取数据超时时长 10s
  scrape_timeout: 10s
  # 规则评估评率，即计算指标是否有触发规则的计算频率
  evaluation_interval: 20s

# 规则文件，从所有匹配的文件中读取规则和警报
rule_files:
  - 'alertRule.yml'
  # - "recordRule.yml"

# 采集配置列表
scrape_configs:
  - job_name: 'cadvisor'
    static_configs:
      - targets:
          - ip:6060

  - job_name: 'node'
    static_configs:
      - targets:
          - ip:9100 #服务器1配置
          - ip:9101 #小主机配置
  - job_name: 'prometheus'
    static_configs:
      - targets:
          - ip:6061
  # - job_name: 'minio-job'
  # metrics_path: /minio/prometheus/metrics
  #   scheme: http
  #static_configs:
  #   - targets: ['ip:9000']

# 报警管理
alerting:
  alertmanagers:
    - static_configs:
        - targets: ['ip:6062']
```

`alertRule.yml`：

```yaml
#配置规则
groups:
  - name: server-alarm
    rules:
      - alert: 'InstanceDown'
        expr: up == 0
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: '{{ $labels.instance }}'
          description: '{{ $labels.instance }} of job {{ $labels.job }} has been down for more than 1 minutes.'
```

应用程序监控，如果应用程序挂了，触发邮件发送开发人员。

`alertmanager.yml` 配置文件如果测试服务是在阿里云，需要将 25 端口（被禁用）改成其它的：

```yaml
global:
  smtp_smarthost: 'smtp.126.com:25' # SMTP服务器地址和端口
  smtp_from: 'nwa123456789@126.com' # 显示在邮件"发件人"字段中的地址
  smtp_auth_username: 'nwa123456789@126.com' # STMP认证时使用的用户名
  smtp_auth_password: 'xxxx' # SMTP认证时使用的密码，不是密码
  smtp_require_tls: false # SMTP服务器是否需要TLS加密

route:
  receiver: 'email' # 发送告警通知的收件人，和下面的接受者名称匹配
  group_wait: 10s # 在发送前等待各个警报的时间
  group_interval: 30s # 相同警报名称的警报发送间隔
  repeat_interval: 10m # 重复发送警报的时间间隔
  group_by: ['server-alarm'] # 根据警报名分组告警接收者

# 告警接收者
receivers:
  - name: 'email' # 接收者名称
    email_configs:
      - to: '2428284043@qq.com' # 接收告警邮件的收件人
```

启动 Prometheus：

```shell
docker run -itd --name prometheus -p 6061:9090 \
-v /nwa/prometheus:/etc/prometheus \
prom/prometheus --config.file=/etc/prometheus/prometheus.yml --web.enable-lifecycle


curl -X POST http://ip:6061/-/reload    # 热更新配置文件

docker logs prometheus  # 查看日志

docker rm -f prometheus
```

访问地址：`http://ip:6061`

## AlertManager 6062

AlertManager 是 Prometheus 生态中的告警管理组件，负责接收 Prometheus 触发的告警，对其进行去重、分组、路由和抑制，并通过邮件、钉钉、Webhook 等方式将告警通知推送给相关人员。

- **去重**：对同时触发的多个相同的警报去重
- **分组**：同一个组的所有警报信息将被合并为一个警报通知，避免一次性接收大量的警告通知
- **路由**：可根据情况配置路由，通知不同角色的运维人员
- **抑制**：当某一个警告发出后，可以停止重复发送由此警告引发的其他警告
- **静默**：被静默的标签将不会进行警告通知

创建挂载目录 config 和 template，赋予权限：

```shell
chmod -R 777 /nwa/prometheus/config
chmod -R 777 /nwa/prometheus/template
```

启动报警管理器：

```shell
docker run --name alertmanager -d -p 6062:9093 quay.io/prometheus/alertmanager:latest

docker run -d --name alertmanager -p 6062:9093  -v /nwa/prometheus/alertmanager.yml:/etc/alertmanager/alertmanager.yml quay.io/prometheus/alertmanager:latest


prom/alertmanager
```

访问 `http://ip:6062` 可查看报警信息。

## Grafana 6063

Grafana 是一款开源的数据可视化平台，支持对接 Prometheus、MySQL、Elasticsearch 等多种数据源，提供丰富的图表组件和仪表板模板，能够将监控数据以直观的图形化方式展示。

用户名：admin，默认密码：admin。

```shell
docker run -d -p 6063:3000 --name=grafana -v /var/lib/grafana grafana/grafana-enterprise
```

访问地址：`http://ip:6063`

改密码：`Nwa@7..`

设置路径：Home → Administration → General → Default preferences → 中文，插件下载 Prometheus，地址 `http://ip:6061`，然后创建仪表板 → 导入仪表板 8919 加载 → 源选普罗米修斯。193 是 Docker 的大屏。

## 总结

cAdvisor、Node Exporter 和 Prometheus 是在云原生环境中非常常用的监控工具，它们各自有着独特的功能和优势，结合使用可以构建强大、全面的监控系统。

**cAdvisor：**

- 优势：cAdvisor 提供了对 **Docker 容器的详细**监控，包括 CPU 使用率、内存使用情况、网络流量、文件系统使用情况等，能够准确地监控容器的资源利用情况和性能指标。
- 限制：cAdvisor 在大规模集群中监控能力受到限制，对于复杂的监控需求不够灵活。

**Node Exporter：**

- 优势：Node Exporter 能够**监控物理机或虚拟机的资源**使用情况，包括 CPU、内存、磁盘、网络等，为 Prometheus 提供了丰富的主机级监控指标。
- 限制：Node Exporter 主要面向物理机和虚拟机，对于容器化环境的监控支持相对较弱。

**Prometheus：**

- 优势：Prometheus 是一款强大的开源监控系统，具有多维数据模型、灵活的查询语言和强大的数据可视化能力，能够实时监控和调查大规模云原生环境中的监控数据。
- 限制：在极端大规模和高并发场景下，Prometheus 会遇到一些性能问题。
