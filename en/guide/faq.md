# FAQ / Troubleshooting

## Agent is not connecting

Assuming the agent is running, the connection is probably being blocked by a firewall. You have two options:

1. Add an inbound rule to the agent system's firewall(s) to allow TCP connections to the port. Check any active firewalls, like iptables, and your cloud provider's firewall settings if applicable.
2. Alternatively, use software like [WireGuard](https://www.wireguard.com/), [Cloudflare Tunnel](https://www.cloudflare.com/products/tunnel/), or [Tailscale](https://tailscale.com/) to securely bypass your firewall.

You can test connectivity by running `telnet <agent-ip> <port>`.

## Connecting the hub and agent on the same system using Docker

If using host network mode for the agent but not the hub, add your system using the hostname `host.docker.internal`, which resolves to the internal IP address used by the host. See the [example docker-compose.yml](/supplemental/docker/same-system/docker-compose.yml).

If using host network mode for both, you can use `localhost` as the hostname.

Otherwise, use the agent's `container_name` as the hostname if both are in the same Docker network.

## Finding the correct filesystem

Specify the filesystem/device/partition for root disk stats using the `FILESYSTEM` environment variable.

If not set, the agent will try to find the partition mounted on `/` and use that. This may not work correctly in a container, so it's recommended to set this value. Use one of the following methods to find the correct filesystem:

- Run `lsblk` and choose an option under "NAME."
- Run `df -h` and choose an option under "Filesystem."
- Run `sudo fdisk -l` and choose an option under "Device."

## Docker container charts are empty or missing

If container charts show empty data or don't appear at all, you may need to enable cgroup memory accounting. To verify, run `docker stats`. If that shows zero memory usage, follow this guide to fix the issue:

<https://akashrajpurohit.com/blog/resolving-missing-memory-stats-in-docker-stats-on-raspberry-pi/>

## Docker Containers Are Not Populating Reliably

Try upgrading your Docker version on the agent system. This issue was observed on a machine running version 24 and was resolved by upgrading to version 27.

## Month / week records are not populating reliably

Records for longer time periods are created by averaging stats from shorter periods. The agent must run uninterrupted for a full set of data to populate these records.

Pausing/unpausing the agent for longer than one minute will result in incomplete data, resetting the timing for the current interval.
