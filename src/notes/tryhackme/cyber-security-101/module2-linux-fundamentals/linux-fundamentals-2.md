| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Linux / Command Line |
| **Difficulty** | Beginner |
| **Time** | ~35 Minutes |
| **Module** | Linux Fundamentals |

---

## Objective

Part 2 builds directly on the navigation skills from Part 1. Now you will start **shaping** the system: using flags to change how commands behave, searching for files and text, manipulating files, and understanding how Linux controls who can do what.

By the end of Part 2 you will be able to:

- Use flags and switches to extend commands
- Create, copy, move, and delete files and directories
- Search the filesystem with `find` and text with `grep`
- Read and reason about Linux permissions

---

## Task 1 — Flags and Switches

Most commands accept **flags** (also called switches) that change their behaviour. Flags usually start with a dash.

### Extending ls

```
user@tryhackme:~$ ls -a
.  ..  .hidden  Documents  notes.txt
```

```
user@tryhackme:~$ ls -l
-rw-r--r-- 1 user user  220 Jul 10 09:14 notes.txt
drwxr-xr-x 2 user user 4096 Jul 10 09:10 Documents
```

Common `ls` flags:

| Flag | Effect |
|------|--------|
| `-a` | Show hidden files (names starting with `.`). |
| `-l` | Long listing with permissions, owner, size, and date. |
| `-h` | Human-readable file sizes (used with `-l`). |
| `-R` | List directories recursively. |

> **Tip:** Discover a command's flags with its manual page — `man ls` — or a quick summary with `ls --help`.

---

## Task 2 — Filesystem Interaction Continued

Now that you can list files, you can create and manage them.

### Creating Files and Directories

| Command | Purpose |
|---------|---------|
| `touch` | Create an empty file. |
| `mkdir` | Create a new directory. |

```
user@tryhackme:~$ touch report.txt
user@tryhackme:~$ mkdir evidence
user@tryhackme:~$ ls
evidence  report.txt
```

### Copying, Moving, and Removing

| Command | Purpose |
|---------|---------|
| `cp` | Copy a file or directory. |
| `mv` | Move or rename a file. |
| `rm` | Remove a file (`rm -r` for directories). |

```
user@tryhackme:~$ cp report.txt backup.txt
user@tryhackme:~$ mv report.txt evidence/report.txt
user@tryhackme:~$ rm backup.txt
```

> **Warning:** `rm` does not use a recycle bin. Deleted files are gone immediately, so double-check paths before running `rm -r`.

### Inspecting a File's Type

The `file` command tells you what a file actually is, regardless of its extension:

```
user@tryhackme:~$ file evidence/report.txt
evidence/report.txt: ASCII text
```

---

## Task 3 — Searching for Files

### find — Locating Files

The `find` command walks the filesystem looking for files that match your criteria:

```
user@tryhackme:~$ find /home -name "*.txt"
/home/user/notes.txt
/home/user/evidence/report.txt
```

Useful `find` options:

| Option | Purpose |
|--------|---------|
| `-name` | Match by filename (supports wildcards). |
| `-type f` | Match files only. |
| `-type d` | Match directories only. |
| `-size +10M` | Match files larger than 10 MB. |

### grep — Searching Inside Files

The `grep` command searches for text **within** files:

```
user@tryhackme:~$ grep "password" config.txt
db_password=supersecret
```

> **Analyst note:** `find` answers "where is the file?" while `grep` answers "which file contains this text?". Together they are two of the most-used commands in any investigation.

---

## Task 4 — An Introduction to Shell Operators

Operators let you combine and redirect commands:

| Operator | Purpose | Example |
|----------|---------|---------|
| `&` | Run a command in the background. | `./scan &` |
| `&&` | Run the next command only if the first succeeds. | `mkdir logs && cd logs` |
| `>` | Redirect output to a file (overwrite). | `echo hi > file.txt` |
| `>>` | Redirect output to a file (append). | `echo hi >> file.txt` |
| `|` | Pipe one command's output into another. | `cat file.txt \| grep error` |

```
user@tryhackme:~$ echo "First line" > log.txt
user@tryhackme:~$ echo "Second line" >> log.txt
user@tryhackme:~$ cat log.txt
First line
Second line
```

---

## Task 5 — Permissions 101

Every file and directory in Linux has an **owner**, a **group**, and a set of **permissions** describing who can read, write, or execute it.

### Reading a Permission String

Look again at a long listing:

```
-rw-r--r-- 1 user staff 220 Jul 10 09:14 notes.txt
```

The first ten characters break down as:

| Section | Characters | Meaning |
|---------|-----------|---------|
| **Type** | `-` | File (`d` = directory). |
| **Owner** | `rw-` | Owner can read and write. |
| **Group** | `r--` | Group can read only. |
| **Others** | `r--` | Everyone else can read only. |

### Permission Types

| Symbol | Meaning |
|--------|---------|
| `r` | Read. |
| `w` | Write. |
| `x` | Execute. |

> **Security relevance:** Misconfigured permissions are a classic privilege-escalation path. A world-writable script owned by root can let an ordinary user run code as root.

---

## Permissions at a Glance

```
-  rw-  r--  r--
│   │    │    │
│   │    │    └── Others: read
│   │    └─────── Group:  read
│   └──────────── Owner:  read + write
└──────────────── Type:   file
```

---

## Common Mistakes

| Mistake | Reality |
|---------|---------|
| Running `rm -r` on the wrong path | Deletion is permanent; verify with `pwd` and `ls` first. |
| Confusing `find` and `grep` | `find` locates files; `grep` searches inside them. |
| Using `>` when you meant `>>` | `>` overwrites the file; `>>` appends to it. |
| Ignoring permission strings | The first character shows the type, not a permission. |

---

## Quick Revision

| Command | What it does |
|---------|--------------|
| `touch` | Creates an empty file. |
| `mkdir` | Creates a directory. |
| `cp` / `mv` / `rm` | Copies, moves/renames, and removes files. |
| `find` | Locates files across the filesystem. |
| `grep` | Searches for text inside files. |
| `file` | Identifies a file's real type. |

**Key idea:** Flags customise commands, operators chain them together, and permissions decide who is allowed to act on each file.

---

## 30-Second Revision

- Flags such as `-a`, `-l`, and `-h` change how a command behaves.
- `touch` and `mkdir` create files and directories; `cp`, `mv`, and `rm` manage them.
- `find` locates files by name, type, or size; `grep` searches for text inside files.
- Operators `>`, `>>`, `|`, `&`, and `&&` redirect and combine commands.
- Every file has an owner, a group, and read/write/execute permissions.
- Misconfigured permissions are a common privilege-escalation risk.

---

## Cheat Sheet

| Command | Example | Result |
|---------|---------|--------|
| `ls -la` | `ls -la` | Long listing including hidden files. |
| `touch` | `touch a.txt` | Creates an empty file. |
| `mkdir` | `mkdir logs` | Creates a directory. |
| `cp` | `cp a.txt b.txt` | Copies `a.txt` to `b.txt`. |
| `mv` | `mv a.txt logs/` | Moves `a.txt` into `logs`. |
| `rm` | `rm a.txt` | Deletes `a.txt`. |
| `find` | `find / -name "*.conf"` | Finds config files. |
| `grep` | `grep "error" log.txt` | Finds lines containing `error`. |

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is a flag in a Linux command?** | A flag (or switch) is an option, usually prefixed with a dash, that changes how a command behaves — for example `ls -a` reveals hidden files. |
| **Q2. What is the difference between `find` and `grep`?** | `find` searches the filesystem for files matching criteria such as name or size, while `grep` searches for text patterns inside files. |
| **Q3. What does the `>>` operator do?** | It redirects a command's output to a file, appending to the existing contents rather than overwriting them. |
| **Q4. What do the letters `r`, `w`, and `x` mean in a permission string?** | Read, write, and execute respectively. |
| **Q5. Why are file permissions important for security?** | Incorrect permissions, such as a world-writable file owned by root, can allow an attacker to escalate privileges. |

## Final Takeaway

Part 2 turns you from a visitor into an operator. You can now create and manage files, hunt for data with `find` and `grep`, chain commands with operators, and read the permission model that governs the whole system — the same permission model attackers probe for weaknesses.
