# 其他磁盘

您可以使用 Beszel 监控磁盘、分区或远程挂载。

图表将使用设备或分区的名称（如果可用），否则将回退到目录名。您将无法获得网络挂载驱动器的 I/O 统计信息。

::: tip 查找设备信息
使用 `lsblk` 命令查找分区的名称和挂载点。

如果遇到问题，请在代理上设置 `LOG_LEVEL=debug` 并检查日志中以 `DEBUG Disk partitions` 和 `DEBUG Disk I/O diskstats` 开头的行。

:::
配置会根据您的部署方式而异。

## Docker 代理

在容器的 `/extra-filesystems` 目录中挂载目标文件系统中的文件夹：

```yaml
volumes:
  - /mnt/disk1/.beszel:/extra-filesystems/sdb1:ro # 只读模式
  - /dev/mmcblk0/.beszel:/extra-filesystems/mmcblk0:ro # 只读模式
```

::: tip 提示
如果您可以看到磁盘使用情况但看不到 I/O（加密设备常见），您可以使用挂载目录名指定用于 I/O 的设备。这应该是 `/proc/diskstats` 中的条目。有关详细信息，请参阅 [0.7.3 发布说明](https://github.com/henrygd/beszel/releases/tag/v0.7.3)。
:::

## 二进制代理

将 `EXTRA_FILESYSTEMS` 环境变量设置为要监视的设备、分区或挂载点的逗号分隔列表。例如：

::: code-group

```bash [bash]
EXTRA_FILESYSTEMS="sdb,sdc1,mmcblk0,/mnt/network-share" KEY="..." ./beszel-agent
```

```ini [beszel-agent.service]
[Service]
Environment="EXTRA_FILESYSTEMS=sdb,sdc1,mmcblk0,/mnt/network-share"
```

:::
