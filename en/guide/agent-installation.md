# Agent Installation

Beszel Agent supports installation via Docker / Podman container or single binary file.

::: tip
Check the [Getting Started](./getting-started.md) guide if you're setting up Beszel for the first time.
:::

## Requirements

If the agent and hub are on different hosts, you may need to update the firewall on your agent system to allow incoming TCP connections on the agent's port.

Alternatively, you can use software like Wireguard or Cloudflare Tunnel ([instructions](https://github.com/henrygd/beszel/discussions/250)) to securely bypass the firewall.

## Using the Hub

The `docker-compose.yml` or binary install command is provided for copy/paste in the hub's web UI when adding a new system.

<a href="/image/add-system-2.png" target="_blank">
  <img src="/image/add-system-2.png" height="482" width="946" alt="Add system dialog" />
</a>

## Docker or Podman

::: tip
Preconfigured `docker-compose.yml` content can be copied the hub's web UI when adding a new system, so in most cases you do not need to set this up manually.
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

The agent must use host network mode to access network interface metrics, which automatically exposes the port. Change the port using an environment variable if needed.

If you don't need network stats, you can remove that line from the compose file and map the port manually.

:::

## Binary

There are multiple ways to install the binary. Choose your preference below.

### 1. Quick script (Linux)

::: tip
A preconfigured command can be copied in the hub's web UI when adding a new system, so in most cases you do not need to run this command manually.
:::

This command downloads and runs our `install-agent.sh` script.

The script installs the latest binary and creates a systemd service to keep it running after reboot. You may optionally enable automatic daily updates.

- `-p` : Port
- `-k` : Public Key (enclose in quotes)

```bash
curl -sL https://raw.githubusercontent.com/henrygd/beszel/main/supplemental/scripts/install-agent.sh -o  install-agent.sh && chmod +x install-agent.sh && ./install-agent.sh
```

### 2. Manual download and start

::: details Click to expand/collapse

#### Download the binary

Download the latest binary from [releases](https://github.com/henrygd/beszel/releases) that matches your server's OS / architecture.

```bash
curl -sL "https://github.com/henrygd/beszel/releases/latest/download/beszel-agent_$(uname -s)_$(uname -m | sed 's/x86_64/amd64/' | sed 's/armv7l/arm/' | sed 's/aarch64/arm64/').tar.gz" | tar -xz -O beszel-agent | tee ./beszel-agent >/dev/null && chmod +x beszel-agent
```

#### Start the agent

- `PORT` : Port
- `KEY` : Public Key

```bash
PORT=45876 KEY="<public key>" ./beszel-agent
```

#### Update the agent

```bash
./beszel-agent update
```

#### Create a service (optional)

If your system uses systemd, you can create a service to keep the hub running after reboot.

1. Create a service file in `/etc/systemd/system/beszel-agent.service`.

```ini
[Unit]
Description=Beszel Agent Service
After=network.target

[Service]
Environment="PORT=$PORT"
Environment="KEY=$KEY"
# Environment="EXTRA_FILESYSTEMS=sdb"
Restart=always
RestartSec=5
ExecStart={/path/to/working/directory}/beszel-agent

[Install]
WantedBy=multi-user.target
```

2. Enable and start the service.

```bash
sudo systemctl daemon-reload
sudo systemctl enable beszel-agent.service
sudo systemctl start beszel-agent.service
```

:::

### 3. Manual compile and start

:::: details Click to expand/collapse

#### Compile

See [Compiling](./compiling.md) for information on how to compile the hub yourself.

#### Start the agent

- `PORT` : Port
- `KEY` : Public Key

```bash
PORT=45876 KEY="<public key>" ./beszel-agent
```

#### Update the agent

```bash
./beszel-agent update
```

#### Create a service (optional)

If your system uses systemd, you can create a service to keep the hub running after reboot.

1. Create a service file in `/etc/systemd/system/beszel-agent.service`.

```ini
[Unit]
Description=Beszel Agent Service
After=network.target

[Service]
Environment="PORT=$PORT"
Environment="KEY=$KEY"
# Environment="EXTRA_FILESYSTEMS=sdb"
Restart=always
RestartSec=5
ExecStart={/path/to/working/directory}/beszel-agent

[Install]
WantedBy=multi-user.target
```

2. Enable and start the service.

```bash
sudo systemctl daemon-reload
sudo systemctl enable beszel-agent.service
sudo systemctl start beszel-agent.service
```

::::
