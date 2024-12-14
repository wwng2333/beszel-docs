# What is Beszel?

Beszel is a lightweight server monitoring platform that includes Docker statistics, historical data, and alert functions.

It has a friendly web interface, simple configuration, and is ready to use out of the box. It supports automatic backup, multi-user, OAuth authentication, and API access.

<div style="display: flex; flex-wrap: wrap; gap: .5em; margin: 1.6em 0 -.3em; min-height:20px">
  <a href="https://hub.docker.com/r/henrygd/beszel-agent" target="_blank">
    <img src="https://img.shields.io/docker/image-size/henrygd/beszel-agent/0.6.0?logo=docker&label=agent%20image%20size" alt="Hub Docker Image Size" />
  </a>
  <a href="https://hub.docker.com/r/henrygd/beszel" target="_blank">
    <img src="https://img.shields.io/docker/image-size/henrygd/beszel/0.1.0?logo=docker&label=hub%20image%20size" alt="Agent Docker Image Size" />
  </a>
  <a href="https://crowdin.com/project/beszel" target="_blank">
    <img src="https://badges.crowdin.net/beszel/localized.svg" alt="" />
  </a>
</div>

## Features

- **Lightweight**: Smaller and less resource-intensive than leading solutions.
- **Simple**: Easy setup, no need for public internet exposure.
- **Docker stats**: Tracks CPU, memory, and network usage history for each container.
- **Alerts**: Configurable alerts for CPU, memory, disk, bandwidth, temperature, and status.
- **Multi-user**: Users manage their own systems. Admins can share systems across users.
- **OAuth / OIDC**: Supports many OAuth2 providers. Password auth can be disabled.
- **Automatic backups**: Save and restore data from disk or S3-compatible storage.
- **REST API**: Use or update your data in your own scripts and applications.

## Architecture

Beszel consists of two main components: the **hub** and the **agent**.

- **Hub**: A web application built on [PocketBase](https://pocketbase.io/) that provides a dashboard for viewing and managing connected systems.

- **Agent**: Runs on each system you want to monitor, creating a minimal SSH server to communicate system metrics to the hub.

## Screenshots

[![Dashboard](/image/dashboard.png)](/image/dashboard.png)

[![System page](/image/system.png)](/image/system.png)

<!-- [![Alerts](/image/alerts.png)](/image/alerts.png) -->

[![Notification Settings](/image/settings-notifications.png)](/image/settings-notifications.png)

## Supported metrics

- **CPU usage** - Host system and Docker / Podman containers.
- **Memory usage** - Host system and containers. Includes swap and ZFS ARC.
- **Disk usage** - Host system. Supports multiple partitions and devices.
- **Disk I/O** - Host system. Supports multiple partitions and devices.
- **Network usage** - Host system and containers.
- **Temperature** - Host system sensors.
- **GPU usage / temperature / power draw** - Nvidia and AMD only. Must use binary agent.
