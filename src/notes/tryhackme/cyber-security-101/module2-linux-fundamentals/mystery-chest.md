| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Linux / Bonus Revision |
| **Difficulty** | Beginner |
| **Time** | ~15 Minutes |
| **Module** | Linux Fundamentals |

---

## Objective

This Mystery Chest is a **bonus revision vault** for the entire Linux Fundamentals module. It gathers the most-used commands, the permission model, and quick-recall cheat sheets into one place so you can revise fast before a lab, an exam, or an interview.

Use it as a lookup reference — everything here was covered across Parts 1, 2, and 3.

---

## Command Reference — Navigation

| Command | Purpose |
|---------|---------|
| `pwd` | Print the current working directory. |
| `ls` | List directory contents (`-a` hidden, `-l` long). |
| `cd` | Change directory (`cd ..` moves up one level). |
| `cat` | Print a file's contents. |
| `echo` | Print text to the screen. |
| `whoami` | Show the current username. |

---

## Command Reference — Files and Search

| Command | Purpose |
|---------|---------|
| `touch` | Create an empty file. |
| `mkdir` | Create a directory. |
| `cp` | Copy a file or directory. |
| `mv` | Move or rename a file. |
| `rm` | Remove a file (`rm -r` for directories). |
| `find` | Locate files by name, type, or size. |
| `grep` | Search for text patterns inside files. |
| `file` | Identify a file's true type. |

---

## Command Reference — System and Automation

| Command | Purpose |
|---------|---------|
| `ps` / `top` | View running processes. |
| `kill` | Stop a process by PID. |
| `systemctl` | Manage services (start, stop, status, enable). |
| `crontab -e` | Edit scheduled cron jobs. |
| `apt` | Install and update software (Debian/Ubuntu). |
| `wget` / `scp` | Download files / copy files over SSH. |

---

## The Permission Model

A long listing shows a ten-character permission string:

```
-  rwx  r-x  r--
│   │    │    │
│   │    │    └── Others: read
│   │    └─────── Group:  read + execute
│   └──────────── Owner:  read + write + execute
└──────────────── Type:   file (d = directory)
```

| Symbol | Meaning |
|--------|---------|
| `r` | Read. |
| `w` | Write. |
| `x` | Execute. |
| `d` | Directory (first character). |

> **Security relevance:** Overly permissive files — especially world-writable scripts owned by root — are a classic route to privilege escalation.

---

## Shell Operators

| Operator | Purpose |
|----------|---------|
| `>` | Redirect output to a file (overwrite). |
| `>>` | Redirect output to a file (append). |
| `|` | Pipe output into another command. |
| `&` | Run a command in the background. |
| `&&` | Run the next command only if the first succeeds. |

---

## Important Directories

| Path | Contents |
|------|----------|
| `/` | The root of the filesystem. |
| `/home` | User home directories. |
| `/etc` | System configuration files. |
| `/var/log` | System and application logs. |
| `/tmp` | Temporary files (often world-writable). |

---

## Investigation Workflow

Tying the module together, a first-response check on a Linux host follows a natural order:

```
whoami / pwd    →  establish context
        │
        ▼
ps aux / top    →  what is running
        │
        ▼
crontab -l      →  scheduled persistence
        │
        ▼
/var/log        →  what happened
```

---

## Quick Revision

| Concept | Recall |
|---------|--------|
| Navigation | `pwd`, `ls`, `cd`, `cat` |
| File management | `touch`, `mkdir`, `cp`, `mv`, `rm` |
| Searching | `find` (files), `grep` (text) |
| Processes | `ps`, `top`, `kill`, `systemctl` |
| Automation | cron + `crontab -e` |
| Software | `apt update` then `apt install` |

**Key idea:** Know where you are, what is running, and where the evidence lives — the rest is just the right command at the right moment.

---

## 30-Second Revision

- Navigate with `pwd`, `ls`, `cd`, and read files with `cat`.
- Manage files with `touch`, `mkdir`, `cp`, `mv`, and `rm`.
- Locate files with `find` and search their contents with `grep`.
- Control programs with `ps`, `top`, `kill`, and `systemctl`.
- Automate with cron and manage software with `apt`.
- Permissions (r/w/x for owner, group, others) decide who can act on each file.

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. Which command shows your current directory?** | `pwd`. |
| **Q2. How do you search for text inside files?** | Use `grep`, for example `grep "error" log.txt`. |
| **Q3. What does `rwx` mean for a file's owner?** | The owner can read, write, and execute the file. |
| **Q4. Which directory holds system logs?** | `/var/log`. |
| **Q5. How do you list every running process on the system?** | `ps aux`. |

## Final Takeaway

The Mystery Chest is your one-page memory aid for **Linux Fundamentals**. Skim it before any Linux task: the commands, the **permission model**, and the **key directories** here cover the vast majority of what you will do on a **Linux machine**, whether you are building, defending, or investigating.
