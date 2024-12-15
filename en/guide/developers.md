# Developer Guide

Thanks for your interest in contributing to Beszel!

Contributions are welcome, but it's a good idea to check with us first in a discussion or issue if you plan on doing anything significant.

## Prerequisites

- Go 1.23+ (for making changes in the Go code)
- Bun 1.1+ or Node 18+ (for making changes in the Admin UI)

If you haven't already, you can fork the main repository and clone your fork so that you can work locally:

```bash
git clone https://github.com/your_username/beszel.git
```

> [!IMPORTANT]
> It is recommended to create a new branch from master for each of your bugfixes and features.
> This is required if you are planning to submit multiple PRs in order to keep the changes separate for review until they eventually get merged.

## Development environment

There are three processes that need to be started in order to work on the project:

1. The hub - Go
2. The agent - Go
3. The web UI - (JavaScript / Vite)

There are `make` commands to start each of these processes (run in `/beszel`).

```bash
# Start the hub
make dev-hub
# Start the agent
KEY="..." make dev-agent
# Start the web UI
make dev-server
```

Alternatively, you can start all processes at once with combined output:

```bash
KEY="..." make -j dev
```

::: tip
If [`entr`](https://github.com/eradman/entr) is installed on your system, the hub and agent will automatically rebuild when you make changes to the code.
:::
