# GPU Monitoring (binary agent only)

> [!IMPORTANT] Binary agent only
> To monitor GPUs , you **must use the binary agent** and have `nvidia-smi` (Nvidia) or `rocm-smi` (AMD) installed on the system.

#### Make sure <code>rocm-smi</code> is accessible

Installing `rocm-smi-lib` on Arch and Debian places the `rocm-smi` binary in `/opt/rocm`. If this isn't in the `PATH` of the user running `beszel-agent`, symlink to `/usr/local/bin`:

>

```bash
sudo ln -s /opt/rocm/bin/rocm-smi /usr/local/bin/rocm-smi
```

## Nvidia Jetson

Nvidia Jetson devices are not compatible with `nvidia-smi`, so you need to install `tegrastats` on the system instead.

## Intel GPUs

I don't own an Intel based device, so I probably won't be able to add Intel support.

It should be a somewhat similar implementation to the others using `xpu-smi`. If you'd like to try contributing, please reply to [issue #262](https://github.com/henrygd/beszel/issues/262).
