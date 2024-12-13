# Agent Installation

Beszel Agent supports installation via Docker / Podman container or single binary file.

<!-- [[toc]] -->

## Requirements

If the agent and hub are on different hosts, you may need to update the firewall on your agent system to allow incoming TCP connections on the agent's port.

Alternatively, you can use software like Wireguard or Cloudflare Tunnel ([instructions](https://github.com/henrygd/beszel/discussions/250)) to securely bypass the firewall.

## Using the Hub

The `docker-compose.yml` or binary install command is provided for copy/paste in the hub's web UI when adding a new system.

<div style="display: flex;">
    <img src="/image/agent-1.webp" width="50%" />
    <img src="/image/agent-2.webp" width="50%" />
</div>

## Docker or Podman

::: tip Connecting to agent on the same host as the hub
todo
:::

::: code-group

```yaml [docker-compose.yml]
services:
  beszel-agent:
    image: henrygd/beszel-agent
    container_name: beszel-agent
    restart: unless-stopped
    network_mode: host
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      # monitor other disks / partitions by mounting a folder in /extra-filesystems
      # - /mnt/disk1/.beszel:/extra-filesystems/disk1:ro
    environment:
      PORT: 45876
      KEY: '<public key>'
```

```bash [docker run]
docker run -d \
  --name beszel-agent \
  --network host \
  --restart unless-stopped \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -e KEY="<public key>" \
  -e PORT=45876 \
  henrygd/beszel-agent:latest
```

```bash [podman run]
podman run -d \
  --name beszel-agent \
  --network host \
  --restart unless-stopped \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -e KEY="<public key>" \
  -e PORT=45876 \
  docker.io/henrygd/beszel-agent:latest
```

### Why host network mode?

The agent must use host network mode to access network interface stats, which automatically exposes the port. Change the port using an environment variable if needed.

If you don't need network stats, remove that line from the compose file and map the port manually.

:::

## Binary

There are multiple ways to install using binary files. You can choose one of the methods below that you prefer.

### 1. Quick script

- `-p` : Port
- `-k` : Public Key

```bash
curl -sL https://raw.githubusercontent.com/henrygd/beszel/main/supplemental/scripts/install-agent.sh -o  install-agent.sh && chmod +x install-agent.sh && ./install-agent.sh -p <port> -k "<public key>"
```

### 2. Manual Download and Startup

<details>
  <summary>Click to expand/collapse</summary>

Download the latest binary from [releases](https://github.com/henrygd/beszel/releases) that matches your server's CPU architecture and run it manually. However, you will need to create a service manually to keep it running.

```bash
curl -sL "https://github.com/henrygd/beszel/releases/latest/download/beszel-agent_$(uname -s)_$(uname -m | sed 's/x86_64/amd64/' | sed 's/armv7l/arm/' | sed 's/aarch64/arm64/').tar.gz" | tar -xz -O beszel-agent | tee ./beszel-agent >/dev/null && chmod +x beszel-agent
```

Running the agent directly:

- `PROT` : Port
- `KEY` : Public Key

```bash
PORT=<port> KEY="<public key>" ./beszel-agent
```

</details>

### 3. Build and Startup

<details>
  <summary>Click to expand/collapse</summary>

Beszel are written in Go, so you can easily build them yourself, or cross-compile for different platforms. Please [install Go](https://go.dev/doc/install) first if you haven't already.

#### 1. Git clone & Prepare dependencies

```bash
git clone https://github.com/henrygd/beszel.git
cd beszel && go mod tidy
```

### 4. Build

```bash
cd beszel/cmd/agent
CGO_ENABLED=0 go build -ldflags "-w -s" .
```

:::tip
If you need to run on different platforms, you can cross-compile using the `GOOS` and `GOARCH` environment variables.

For example, to build for FreeBSD ARM64:

```bash
GOOS=freebsd GOARCH=arm64 CGO_ENABLED=0 go build -ldflags "-w -s" .
```

You can see a list of valid options by running `go tool dist list`.
:::

#### 4. Running the agent directly

> You will need to create a service manually to keep it running.

- `PROT` : Port
- `KEY` : Public Key

```bash
PORT=<port> KEY="<public key>" ./beszel-agent
```

</details>
