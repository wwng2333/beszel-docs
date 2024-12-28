# GPU 监控

Beszel 可以监控 GPU 使用率、温度和功耗。

::: warning
仅适用于二进制代理
Docker 代理不支持 GPU 监控。您 **必须使用二进制代理**.
:::

## AMD GPU

Beszel 使用 `rocm-smi` 监控 AMD GPU。该工具必须安装在系统上。

#### 确保可以访问 `rocm-smi`

在 Arch 和 Debian 上安装 `rocm-smi-lib` 会将 `rocm-smi` 二进制文件放置在 `/opt/rocm` 中。如果该目录不在运行 `beszel-agent` 的用户的 `PATH` 环境变量中，请将其符号链接到 `/usr/local/bin`:

```bash
sudo ln -s /opt/rocm/bin/rocm-smi /usr/local/bin/rocm-smi
```

## Nvidia GPU

Beszel 使用 `nvidia-smi` 监控 Nvidia GPU。该工具必须安装在系统上。

## Nvidia Jetson

Jetson 不兼容 `nvidia-smi`，目前也不受支持。

应该可以使用 `tegrastats` 获取使用情况和系统功耗。我将尝试在未来添加对此的支持。

## Intel GPU

由于以下两个原因，目前不支持英特尔显卡：

1. 我没有可用于测试的英特尔显卡。
2. 似乎没有像 `nvidia-smi` 这样可以直接获取利用率和内存使用情况的简单工具。

有关更多信息，请参阅 [issue #262](https://github.com/henrygd/beszel/issues/262)。
