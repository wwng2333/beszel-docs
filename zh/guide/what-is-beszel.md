# 什么是 Beszel？

Beszel 是一个轻量级的服务器监控平台，包含 Docker 统计数据、历史数据和告警功能。

它具有友好的网页界面、简单的配置，开箱即用。支持自动备份、多用户、OAuth 认证和 API 访问。

## 架构

Beszel 由两个主要组件组成：hub 和 agent。

- **Hub：** 一个提供仪表盘用于查看和管理已连接系统的 Web 应用程序。基于 [PocketBase](https://pocketbase.io/) 构建。

- **Agent：** 运行在每个您想要监控的系统上，创建一个最小化的 SSH 服务器以将系统指标传输给 hub。
