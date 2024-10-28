# Getting started

Beszel supports installation via Docker or using binaries.

## Docker

todo

::: code-group

```yaml [docker-compose.yml]
# Run with docker compose up -d
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

## Binary

::: tip
This is a tip.
:::

todo
