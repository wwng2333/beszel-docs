# GPU Monitoring

Beszel can monitor GPU usage, temperature, and power draw.

::: warning Binary agent only
The Docker agent does not support GPU monitoring. You **must use the binary agent**.
:::

## AMD GPUs

Beszel uses `rocm-smi` to monitor AMD GPUs. This must be installed on the system.

#### Make sure <code>rocm-smi</code> is accessible

Installing `rocm-smi-lib` on Arch and Debian places the `rocm-smi` binary in `/opt/rocm`. If this isn't in the `PATH` of the user running `beszel-agent`, symlink to `/usr/local/bin`:

```bash
sudo ln -s /opt/rocm/bin/rocm-smi /usr/local/bin/rocm-smi
```

## Nvidia GPUs

Beszel uses `nvidia-smi` to monitor Nvidia GPUs. This must be installed on the system.

## Nvidia Jetson

Jetson is not compatible with `nvidia-smi` and not currently supported.

It should be possible to get usage and system power using `tegrastats`. I will try to add support for this in the future.

## Intel GPUs

Intel GPUs are not currently supported for two reasons:

1. I don't have an Intel GPU to test with.
2. There doesn't seem to be a straightforward utility like `nvidia-smi` to get utilization and memory usage.

Please see [issue #262](https://github.com/henrygd/beszel/issues/262) for more information.
