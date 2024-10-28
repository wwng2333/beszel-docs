# 入门指南

Beszel 支持通过 Docker 或二进制文件安装。

## Docker

待完成

::: code-group

```yaml [docker-compose.yml]
# 使用 docker compose up -d 运行
services:
  beszel:
    image: 'henrygd/beszel'
    container_name: 'beszel'
    restart: unless-stopped
    ports:
      - '8090:8090'
    volumes:
      - ./beszel_data:/beszel_data
```

```bash [docker run]
mkdir -p ./beszel_data && \
docker run -d \
  -v ./beszel_data:/beszel_data \
  -p 8090:8090 \
  henrygd/beszel
```

:::

## 二进制文件

::: tip
这是一个提示。
:::

待完成
