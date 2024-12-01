# Monitoring additional disks, partitions, or remote mounts

The method for adding additional disks differs depending on your deployment method.

Use `lsblk` to find the names and mount points of your partitions. If you have trouble, check the agent logs.

> Note: The charts will use the name of the device or partition if available, and fall back to the folder name. You will not get I/O stats for network mounted drives.
