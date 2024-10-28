# What is Beszel?

Beszel is a lightweight server monitoring platform that includes Docker statistics, historical data, and alert functions.

It has a friendly web interface, simple configuration, and is ready to use out of the box. It supports automatic backup, multi-user, OAuth authentication, and API access.

## Architecture

Beszel consists of two main components: the hub and the agent.

- **Hub:** A web application that provides a dashboard for viewing and managing connected systems. Built on [PocketBase](https://pocketbase.io/).

- **Agent:** Runs on each system you want to monitor, creating a minimal SSH server to communicate system metrics to the hub.
