# Security

The hub and agent communicate over SSH, so they don't need to be exposed to the internet. Even if you place an external auth gateway, such as Authelia, in front of the hub, it won't disrupt or break the connection between the hub and agent.

When the hub is started for the first time, it generates an ED25519 key pair.

The agent's SSH server is configured to accept connections using this key only. It does not provide a pseudo-terminal or accept input, so it's impossible to execute commands on the agent even if your private key is compromised.

## Reporting a Vulnerability

If you find a vulnerability in the latest version, please [submit a private advisory](https://github.com/henrygd/beszel/security/advisories/new).

If it's low severity (use best judgement) you may open an issue instead of an advisory.

## Network requirements

This is a list of ports and remote hosts that Beszel communicates with, based on the default configuration. Using SMTP for email or S3 for backups will require connections to other hosts.

### Agent

#### Incoming

| Port  | Purpose                                        |
| ----- | ---------------------------------------------- |
| 45876 | Allows the hub to connect to the agent via SSH |

#### Outgoing

| Remote host | Port | Purpose                                               |
| ----------- | ---- | ----------------------------------------------------- |
| github.com  | 443  | Check / download updates (not needed if using Docker) |

### Hub

#### Incoming

| Port | Purpose                   |
| ---- | ------------------------- |
| 8090 | HTTP access to the web UI |

#### Outgoing

| Remote host | Port  | Purpose                                               |
| ----------- | ----- | ----------------------------------------------------- |
| agents      | 45876 | SSH connection to your agents                         |
| github.com  | 443   | Check / download updates (not needed if using Docker) |
