# Hub Installation

Beszel supports installation via Docker/ Podman or single binary file.

::: tip
Check the [Getting Started](./getting-started.md) guide if you're setting up Beszel for the first time.
:::

## Docker or Podman

All methods will start the Beszel service on port `8090` and mount the `./beszel_data` directory for persistent storage.

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

## Binary

There are multiple ways to install using binary files. You can choose one of the methods below that you prefer.

### 1. Quick script (Linux)

Use the command below to download and run our `install-hub.sh` script. This will install the latest binary and create a systemd service to keep it running after reboot.

- `-u` : Uninstall
- `-p <port>` : Specify a port number (default: 8090)

```bash
curl -sL https://raw.githubusercontent.com/henrygd/beszel/main/supplemental/scripts/install-hub.sh -o install-hub.sh && chmod +x install-hub.sh && ./install-hub.sh
```

### 2. Manual Download and Startup

::: details Click to expand/collapse

#### Download

Download the latest binary from [releases](https://github.com/henrygd/beszel/releases) that matches your server's CPU architecture and run it manually. However, you will need to create a service manually to keep it running after reboot.

```bash
curl -sL "https://github.com/henrygd/beszel/releases/latest/download/beszel_$(uname -s)_$(uname -m | sed 's/x86_64/amd64/' | sed 's/armv7l/arm/' | sed 's/aarch64/arm64/').tar.gz" | tar -xz -O beszel | tee ./beszel >/dev/null && chmod +x beszel
```

#### Start the hub

```bash
./beszel serve --http "0.0.0.0:8090"
```

#### Update the hub

```bash
./beszel update
```

:::

### 3. Manual Compile and Startup

::: details Click to expand/collapse

#### Compile

See [Compiling](./compiling.md) for information on how to compile the hub yourself.

#### Start the hub

```bash
./beszel serve --http "0.0.0.0:8090"
```

#### Update the hub

```bash
./beszel update
```

:::
