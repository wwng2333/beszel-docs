# Hub 安装

Beszel 支持通过 Docker/ Podman 或单个二进制文件进行安装。

::: tip 提示
如果您是首次设置 Beszel，请查看 [开始使用](./getting-started.md) 指南。
:::

## Docker 或 Podman

所有方法都将在端口 `8090` 上启动 Beszel 服务，并挂载 `./beszel_data` 目录用于持久存储。

::: code-group

```yaml [docker-compose.yml]
services:
  beszel:
    image: henrygd/beszel
    container_name: beszel
    restart: unless-stopped
    ports:
      - 8090:8090
    volumes:
      - ./beszel_data:/beszel_data
```

```bash [docker run]
mkdir -p ./beszel_data && \
docker run -d \
  --name beszel \
  --restart=unless-stopped \
  -v ./beszel_data:/beszel_data \
  -p 8090:8090 \
  henrygd/beszel
```

```bash [podman run]
mkdir -p ./beszel_data && \
podman run -d \
  --name beszel \
  --restart=unless-stopped \
  -v ./beszel_data:/beszel_data \
  -p 8090:8090 \
  docker.io/henrygd/beszel
```

:::

## 二进制文件

安装二进制文件有多种方法。 请选择您喜欢的方式。

### 1. 快速脚本 (Linux)

此命令下载并运行我们的 install-hub.sh 脚本。该脚本将安装最新二进制文件并创建 systemd 服务，使其在重新启动后继续运行。

- `-u` : 卸载
- `-p <port>` : 指定端口号（默认: 8090）

```bash
curl -sL https://raw.githubusercontent.com/henrygd/beszel/main/supplemental/scripts/install-hub.sh -o install-hub.sh && chmod +x install-hub.sh && ./install-hub.sh
```

### 2. 手动下载和启动

::: details 点击展开/收起

#### 下载

从 [releases](https://github.com/henrygd/beszel/releases) 下载匹配您服务器 CPU 架构的最新二进制文件，并手动运行它。您需要手动创建一个服务才能使其在重新启动后继续运行。

```bash
curl -sL "https://github.com/henrygd/beszel/releases/latest/download/beszel_$(uname -s)_$(uname -m | sed 's/x86_64/amd64/' | sed 's/armv7l/arm/' | sed 's/aarch64/arm64/').tar.gz" | tar -xz -O beszel | tee ./beszel >/dev/null && chmod +x beszel
```

#### 启动中心

```bash
./beszel serve --http "0.0.0.0:8090"
```

#### 更新中心

```bash
./beszel update
```

#### 创建服务（可选）

如果您的系统使用 systemd，则可以创建一个服务来使中心在重新启动后继续运行。

1. 在 /etc/systemd/system/beszel.service 中创建一个服务文件。

```ini
[Unit]
Description=Beszel Hub
After=network.target

[Service]
Type=simple
Restart=always
RestartSec=3
User=root
WorkingDirectory={/path/to/working/directory}
ExecStart={/path/to/working/directory}/beszel serve --http "0.0.0.0:8090"

[Install]
WantedBy=multi-user.target
```

2. 启用并启动服务。

```bash
sudo systemctl daemon-reload
sudo systemctl enable beszel.service
sudo systemctl start beszel.service
```

:::

### 3. 手动编译和启动

::: details 点击展开/收起

#### 编译

请参阅 [编译](./compiling.md) 了解有关如何自己编译中心的更多信息。

#### 启动中心

```bash
./beszel serve --http "0.0.0.0:8090"
```

#### 更新中心

```bash
./beszel update
```

#### 创建服务（可选）

如果您的系统使用 systemd，则可以创建一个服务来使中心在重新启动后继续运行。

1. 在 `/etc/systemd/system/beszel.service` 中创建一个服务文件。

```ini
[Unit]
Description=Beszel Hub
After=network.target

[Service]
Type=simple
Restart=always
RestartSec=5
User=root
WorkingDirectory={/path/to/working/directory}
ExecStart={/path/to/working/directory}/beszel serve --http "0.0.0.0:8090"

[Install]
WantedBy=multi-user.target
```

2. 启用并启动服务。

```bash
sudo systemctl daemon-reload
sudo systemctl enable beszel.service
sudo systemctl start beszel.service
```

:::