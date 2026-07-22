| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Linux / Command Line |
| **Difficulty** | Beginner |
| **Time** | ~40 Minutes |
| **Module** | Linux Fundamentals |

---

## Objective

Part 3 is where Linux starts to feel like a real working environment. You will edit files without leaving the terminal, move data between machines, manage running programs, schedule automated tasks, and keep software up to date.

By the end of Part 3 you will be able to:

- Edit files with terminal text editors
- Transfer files and run quick utilities
- Manage processes and services
- Schedule tasks with cron and install software with a package manager

---

## Task 1 — Terminal Text Editors

Servers rarely have a graphical editor, so editing files in the terminal is essential.

### nano — The Beginner-Friendly Editor

```
user@tryhackme:~$ nano notes.txt
```

`nano` opens a simple full-screen editor. Common shortcuts appear at the bottom:

| Shortcut | Action |
|----------|--------|
| `Ctrl + O` | Save (write out) the file. |
| `Ctrl + X` | Exit nano. |
| `Ctrl + W` | Search within the file. |
| `Ctrl + K` | Cut the current line. |

### vim — The Powerful Editor

`vim` is more capable but has a learning curve. It works in modes:

| Mode | Purpose |
|------|---------|
| **Normal** | Navigate and run commands (the default). |
| **Insert** | Type text (enter with `i`). |
| **Command** | Save and quit (enter with `:`). |

To save and quit vim, press `Esc`, then type `:wq` and press Enter.

> **Tip:** If you ever get stuck inside vim, press `Esc`, then type `:q!` and Enter to quit without saving.

---

## Task 2 — General/Useful Utilities

Linux ships with small utilities that solve everyday problems, especially moving files between machines.

### wget — Download From the Web

```
user@tryhackme:~$ wget https://example.com/tool.sh
```

### scp — Secure Copy Over SSH

`scp` copies files between machines over an encrypted SSH connection:

```
user@tryhackme:~$ scp file.txt user@10.10.10.5:/home/user/
```

### Serving Files With Python

You can turn any directory into a quick web server to share files:

```
user@tryhackme:~$ python3 -m http.server 8000
Serving HTTP on 0.0.0.0 port 8000 ...
```

| Utility | Purpose |
|---------|---------|
| `wget` | Download files over HTTP/HTTPS. |
| `scp` | Copy files securely between hosts over SSH. |
| `python3 -m http.server` | Serve the current directory over HTTP. |

---

## Task 3 — Processes 101

A **process** is a running program. Linux gives every process a unique **PID** (Process ID).

### Viewing Processes

| Command | Purpose |
|---------|---------|
| `ps` | List processes for the current session. |
| `ps aux` | List every process on the system. |
| `top` | Live, updating view of processes and resource usage. |

```
user@tryhackme:~$ ps
  PID TTY          TIME CMD
 2143 pts/0    00:00:00 bash
 2210 pts/0    00:00:00 ps
```

### Managing Processes

The `kill` command stops a process by its PID:

```
user@tryhackme:~$ kill 2143
```

| Signal | Command | Effect |
|--------|---------|--------|
| `SIGTERM` | `kill PID` | Politely asks the process to stop. |
| `SIGKILL` | `kill -9 PID` | Forcefully terminates the process. |

### Managing Services With systemctl

Long-running background programs are called **services** (or daemons) and are managed with `systemctl`:

```
user@tryhackme:~$ systemctl start apache2
user@tryhackme:~$ systemctl status apache2
```

| Action | Command |
|--------|---------|
| Start a service | `systemctl start <name>` |
| Stop a service | `systemctl stop <name>` |
| Check status | `systemctl status <name>` |
| Enable at boot | `systemctl enable <name>` |

---

## Task 4 — Maintaining Your System: Automation

The **cron** system runs commands automatically on a schedule. Schedules live in a **crontab** file.

### The Crontab Format

A crontab line has five time fields followed by the command:

```
┌─────── minute (0–59)
│ ┌───── hour (0–23)
│ │ ┌─── day of month (1–31)
│ │ │ ┌─ month (1–12)
│ │ │ │ ┌ day of week (0–6)
│ │ │ │ │
* * * * *  command_to_run
```

Edit your crontab with:

```
user@tryhackme:~$ crontab -e
```

Example — run a backup script every day at 2 AM:

```
0 2 * * * /home/user/backup.sh
```

| Field | Range | Meaning |
|-------|-------|---------|
| **Minute** | 0–59 | Minute of the hour. |
| **Hour** | 0–23 | Hour of the day. |
| **Day of month** | 1–31 | Day of the month. |
| **Month** | 1–12 | Month of the year. |
| **Day of week** | 0–6 | Day of the week (0 = Sunday). |

> **Security relevance:** Attackers abuse cron for **persistence** — a hidden cron job can silently re-launch malware after every reboot. Reviewing crontabs is a standard part of incident response.

---

## Task 5 — Maintaining Your System: Package Management

A **package manager** installs, updates, and removes software. On Debian and Ubuntu that manager is `apt`.

```
user@tryhackme:~$ sudo apt update
user@tryhackme:~$ sudo apt install nmap
```

| Command | Purpose |
|---------|---------|
| `apt update` | Refresh the list of available packages. |
| `apt upgrade` | Install available updates. |
| `apt install <pkg>` | Install a package. |
| `apt remove <pkg>` | Remove a package. |

> **Tip:** Always run `apt update` before `apt install` so you fetch the latest version and dependency information.

---

## Task 6 — Maintaining Your System: Logs

Linux records events in **log files**, most of which live under `/var/log`. Logs are the first place a defender looks after an incident.

| Log | Contents |
|-----|----------|
| `/var/log/syslog` | General system messages. |
| `/var/log/auth.log` | Authentication and login events. |
| `/var/log/apache2/` | Web server access and error logs. |

```
user@tryhackme:~$ cat /var/log/auth.log
Jul 10 09:14:02 tryhackme sshd[2143]: Accepted password for user from 10.10.10.5
```

> **Analyst note:** Failed and successful logins in `auth.log` are a goldmine for spotting brute-force attempts and unauthorised access.

---

## Real-World Example

An attacker who gains a foothold on a Linux host typically:

```
Downloads a tool with wget
        │
        ▼
Runs it as a background process
        │
        ▼
Adds a cron job for persistence
        │
        ▼
Clears traces in /var/log
```

A defender reverses the same steps — inspecting processes, crontabs, and logs — using the exact commands taught in this room.

---

## Common Mistakes

| Mistake | Reality |
|---------|---------|
| Getting trapped in vim | Press `Esc` then `:q!` to quit without saving. |
| Running `apt install` without `apt update` | You may install an outdated version. |
| Using `kill -9` first | Try a normal `kill` before forcing with `-9`. |
| Ignoring `/var/log` | Logs often hold the clearest evidence of an attack. |

---

## Quick Revision

| Area | Key tools |
|------|-----------|
| **Editing** | `nano`, `vim` |
| **Transfer** | `wget`, `scp`, `python3 -m http.server` |
| **Processes** | `ps`, `top`, `kill`, `systemctl` |
| **Automation** | `crontab -e`, cron schedule fields |
| **Software** | `apt update`, `apt install` |
| **Logs** | `/var/log/syslog`, `/var/log/auth.log` |

**Key idea:** A working Linux operator can edit files, move data, manage what is running, automate repetitive tasks, and read the logs that explain what happened.

---

## 30-Second Revision

- `nano` is beginner-friendly; `vim` is powerful and mode-based (`:wq` to save and quit).
- `wget` downloads files, `scp` copies over SSH, and Python can serve a directory over HTTP.
- Processes have PIDs; view them with `ps`/`top` and stop them with `kill`.
- `systemctl` manages long-running services (start, stop, status, enable).
- cron schedules automated jobs; attackers abuse it for persistence.
- `apt` installs and updates software; logs under `/var/log` record system events.

---

## Cheat Sheet

| Command | Example | Result |
|---------|---------|--------|
| `nano` | `nano file.txt` | Opens the nano editor. |
| `wget` | `wget http://x/tool` | Downloads a file. |
| `scp` | `scp f user@ip:/path` | Copies a file over SSH. |
| `ps aux` | `ps aux` | Lists all processes. |
| `kill` | `kill 2143` | Stops a process by PID. |
| `systemctl` | `systemctl status ssh` | Shows a service's state. |
| `crontab -e` | `crontab -e` | Edits scheduled jobs. |
| `apt install` | `sudo apt install nmap` | Installs a package. |

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. How do you save and quit in vim?** | Press `Esc` to return to normal mode, then type `:wq` and press Enter. |
| **Q2. What is the difference between `wget` and `scp`?** | `wget` downloads files over HTTP/HTTPS from the web, while `scp` copies files securely between machines over SSH. |
| **Q3. What is a PID?** | A Process ID — a unique number Linux assigns to each running process. |
| **Q4. What does `systemctl` manage?** | Long-running background services (daemons), letting you start, stop, enable, and check their status. |
| **Q5. Why do attackers use cron jobs?** | For persistence — a scheduled job can silently relaunch malware after reboots or at set intervals. |
| **Q6. Where are most Linux logs stored?** | Under the `/var/log` directory, including `syslog` and `auth.log`. |

## Final Takeaway

Part 3 completes the Linux Fundamentals journey. With editing, file transfer, process and service control, scheduling, package management, and log analysis under your belt, you can operate and investigate a Linux machine end to end — exactly what defenders and attackers do every day.
