| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Linux / Command Line |
| **Difficulty** | Beginner |
| **Time** | ~30 Minutes |
| **Module** | Linux Fundamentals |

---

## Objective

This room is the first step into the world of **Linux**. Linux powers a huge portion of the servers, security tools, and infrastructure you will ever touch, so learning to move around it confidently is one of the highest-value skills in cybersecurity.

By the end of Part 1 you will be able to:

- Explain what Linux is and where it is used
- Interact with a Linux machine through the terminal
- Run your first commands to explore the system
- Read and move around the Linux filesystem

---

## Task 1 — What is Linux?

**Linux** is a family of open-source operating systems built on the Linux kernel. Unlike a single product, "Linux" describes many **distributions** (distros) that share the same core but package it differently.

Common distributions include:

- Ubuntu
- Debian
- Kali Linux
- CentOS / Red Hat
- Alpine

### Why Linux Matters in Cyber Security

Linux is everywhere an analyst or attacker looks:

| Area | Why Linux is used |
|------|-------------------|
| **Servers** | Most web servers and cloud workloads run Linux. |
| **Security tooling** | Kali and Parrot ship hundreds of offensive tools. |
| **IoT & embedded** | Routers, cameras, and appliances run stripped-down Linux. |
| **Cloud** | The majority of cloud instances are Linux-based. |

> **Remember:** Windows hides the system behind a graphical interface. Linux gives you the terminal — direct, scriptable control over the machine.

---

## Task 2 — Interacting with Your First Linux Machine

Most of your work in Linux happens in the **terminal**, a text interface where you type commands and read their output. The program that interprets those commands is called the **shell** (commonly Bash).

A typical prompt looks like this:

```
user@tryhackme:~$
```

Reading the prompt from left to right:

| Part | Meaning |
|------|---------|
| `user` | The account you are logged in as. |
| `tryhackme` | The hostname of the machine. |
| `~` | Your current directory (`~` means your home folder). |
| `$` | You are a normal user (`#` would mean root). |

---

## Task 3 — Running Your First Commands

Commands are small programs. You type the command name, press Enter, and read the result.

### echo — Print Text

The `echo` command outputs whatever text you give it:

```
user@tryhackme:~$ echo Hello Friend!
Hello Friend!
```

### whoami — Who Am I?

The `whoami` command prints the username of the current user:

```
user@tryhackme:~$ whoami
tryhackme
```

> **Tip:** `whoami` is one of the first commands you run after gaining access to a machine — it tells you exactly which account's privileges you hold.

---

## Task 4 — Interacting With the Filesystem

The Linux filesystem is a tree of directories starting at the root, written as `/`. A handful of commands let you explore it.

### Core Navigation Commands

| Command | Purpose |
|---------|---------|
| `ls` | List the contents of a directory. |
| `cd` | Change directory. |
| `pwd` | Print the current working directory. |
| `cat` | Print the contents of a file. |

### ls — Listing Files

```
user@tryhackme:~$ ls
Documents  Pictures  notes.txt  todo.txt
```

### cd — Changing Directory

```
user@tryhackme:~$ cd Documents
user@tryhackme:~/Documents$
```

### pwd — Where Am I?

```
user@tryhackme:~/Documents$ pwd
/home/tryhackme/Documents
```

### cat — Reading a File

```
user@tryhackme:~$ cat todo.txt
Learn Linux
Practice commands
```

---

## Navigating the Filesystem

The path you take through directories can be visualised as a tree:

```
/
│
├── home
│    └── tryhackme
│         ├── Documents
│         ├── Pictures
│         └── notes.txt
│
├── etc
└── var
```

Every file has a **path**. An **absolute path** starts from `/` (e.g. `/home/tryhackme/notes.txt`), while a **relative path** is based on where you currently are.

---

## Real-World Example

A SOC analyst logs into a compromised web server over SSH:

```
Analyst connects via SSH
        │
        ▼
Runs whoami  →  confirms account
        │
        ▼
Runs pwd     →  locates current directory
        │
        ▼
Runs ls      →  lists suspicious files
        │
        ▼
Runs cat     →  reads a malicious script
```

Every one of these steps uses the exact commands you just learned. Basic navigation is the foundation of every investigation.

---

## Common Mistakes

| Mistake | Reality |
|---------|---------|
| Expecting a graphical desktop | Most Linux servers are terminal-only. |
| Confusing `~` and `/` | `~` is your home folder; `/` is the system root. |
| Forgetting Linux is case-sensitive | `Notes.txt` and `notes.txt` are different files. |
| Guessing your location | Run `pwd` instead of assuming. |

---

## Quick Revision

| Command | What it does |
|---------|--------------|
| `echo` | Prints text to the screen. |
| `whoami` | Shows the current username. |
| `ls` | Lists files and directories. |
| `cd` | Moves into another directory. |
| `pwd` | Prints your current location. |
| `cat` | Displays the contents of a file. |

**Key idea:** The terminal is your control panel. Learn to read the prompt, know where you are with `pwd`, and explore with `ls` and `cd`.

---

## 30-Second Revision

- Linux is an open-source operating system with many distributions built on the Linux kernel.
- The terminal runs a shell (Bash) that interprets the commands you type.
- The prompt tells you your user, hostname, location, and privilege level.
- `echo` prints text; `whoami` shows your user.
- `ls`, `cd`, `pwd`, and `cat` are the core filesystem navigation commands.
- Linux paths start at the root `/`; `~` is a shortcut for your home directory.

---

## Cheat Sheet

| Command | Example | Result |
|---------|---------|--------|
| `echo` | `echo Hello` | Prints `Hello`. |
| `whoami` | `whoami` | Prints your username. |
| `ls` | `ls` | Lists the current directory. |
| `cd` | `cd Documents` | Enters `Documents`. |
| `pwd` | `pwd` | Prints the full current path. |
| `cat` | `cat notes.txt` | Prints the file contents. |

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is Linux?** | Linux is a family of open-source operating systems built on the Linux kernel, packaged into distributions such as Ubuntu, Debian, and Kali. |
| **Q2. What is the difference between the terminal and the shell?** | The terminal is the text interface you type into; the shell (such as Bash) is the program that interprets and runs your commands. |
| **Q3. Which command shows the current user?** | `whoami`. |
| **Q4. How do you find out which directory you are currently in?** | Run `pwd` (print working directory). |
| **Q5. What does `~` represent in a Linux path?** | It is a shortcut for the current user's home directory. |

## Final Takeaway

Part 1 is about confidence at the **prompt**. Once you can **log in**, read the prompt, and move around with `ls`, `cd`, `pwd`, and `cat`, the rest of **Linux** becomes far less intimidating. These **commands** are the bedrock of every task that follows.
