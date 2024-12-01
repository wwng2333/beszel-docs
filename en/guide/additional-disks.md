# Monitoring additional disks, partitions, or remote mounts

The method for adding additional disks differs depending on your deployment method.

The charts will use the name of the device or partition if available, and fall back to the folder name. You will not get I/O stats for network mounted drives.

> [!TIP] Finding device information
> Use `lsblk` to find the names and mount points of your partitions. If you have trouble, set `LOG_LEVEL=debug` and check the agent logs.

## Docker

Mount a folder from the target filesystem in the container's `/extra-filesystems` directory. For example:

```yaml
volumes:
  - /mnt/disk1/.beszel:/extra-filesystems/sdb1:ro
  - /dev/mmcblk0/.beszel:/extra-filesystems/mmcblk0:ro
```

## Binary

Set the `EXTRA_FILESYSTEMS` environment variable to a comma-separated list of devices, partitions, or mount points to monitor. For example:

```bash
EXTRA_FILESYSTEMS="sdb,sdc1,mmcblk0,/mnt/network-share"
```
