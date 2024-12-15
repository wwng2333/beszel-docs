# Getting started

For background information, see the [What is Beszel?](./what-is-beszel.md) page.

## 1. Install the Hub

Beszel supports installation via Docker/ Podman or single binary file.

- [Docker / Podman](./install-hub#docker-or-podman)
- [Binary](./install-hub#binary)

<div style="height: 1px; margin: -5px 0 0"></div>

::: details Click to view complete `docker-compose.yml` config including local agent

The following example should work out of the box.

In step 3, use `host.docker.internal` as the **Host / IP** value.

Remember to update the `KEY` value with your public key, then run `docker compose up -d` again.

::: code-group

```yaml [docker-compose.yml]
services:
  beszel:
    image: henrygd/beszel:latest
    container_name: beszel
    restart: unless-stopped
    extra_hosts:
      - host.docker.internal:host-gateway
    ports:
      - 8090:8090
    volumes:
      - ./beszel_data:/beszel_data

  beszel-agent:
    image: henrygd/beszel-agent:latest
    container_name: beszel-agent
    restart: unless-stopped
    network_mode: host
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
    environment:
      PORT: 45876
      # Do not remove quotes around the key
      KEY: 'UPDATE WITH YOUR PUBLIC KEY (copy from "Add system" dialog)'
```

:::

## 2. Create an admin user

After starting the hub, navigate to http://localhost:8090 or your chosen address.

You will be prompted to create an account:

[![Screenshot of user creation form](/image/admin-creation.png)](/image/admin-creation.png)

## 3. Configure your first system

Click the **Add System** button in the top right corner to open the system creation dialog. We're using the local system in this example, but you may use a remote agent instead.

Do not click the **Add System** button inside the dialog until you've started up the agent.

[![Screenshot of system creation form](/image/add-system.png)](/image/add-system.png)

## 4. Start the agent

:::: details Docker instructions

> [!TIP] NOTE
> If you prefer to set up containers in a different way, please feel free to do so.

1. Copy the `docker-compose.yml` content from the **Add System** dialog.

2. Create a directory somewhere to store the agent's `docker-compose.yml` file.

```bash
mkdir beszel-agent
cd beszel-agent
```

3. Create a `docker-compose.yml` file and paste in the content provided in the **Add System** dialog.

::: code-group

```bash [nano]
nano docker-compose.yml
```

```bash [vim]
vim docker-compose.yml
```

```bash [emacs]
emacs docker-compose.yml
```

```bash [vscode]
code docker-compose.yml
```

:::

4. Start the agent.

```bash
docker compose up -d
```

::::

:::: details Binary instructions
::: warning The install script is for Linux only
If you use a different OS, please manually download and run the correct binary for your system. See the [Agent Installation](./install-agent.md#binary) page or the [Compiling](./compiling.md) page for more information.
:::

1. Copy the binary install command from the **Add System** dialog.

2. Open a terminal and run the command.

This will download the correct binary, create a user called `beszel`, and start the agent. It also creates a service to keep it running after reboot, and optionally enables automatic daily updates.
::::

## 5. Finish adding the system

Now that the agent is running, click the **Add System** button in the dialog.

You will see the new system in table. If it flips to green, you're good to go.

[![Screenshot of system creation form](/image/new-system.png)](/image/new-system.png)

If it changes to red, check the [Common Issues](./common-issues.md) page.
