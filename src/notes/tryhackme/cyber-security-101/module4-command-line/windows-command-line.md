| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Windows / Command Line |
| **Difficulty** | Beginner |
| **Time** | ~45 Minutes |
| **Module** | Command Line |

---

## Objective

This room teaches the essential Windows Command Prompt (`cmd.exe`) commands used to gather system information, configure and troubleshoot networking, manage files and folders, and control running processes. It also connects each command to how a security professional would use it during enumeration and investigation.

By the end of this room you will be able to:

- Explain the difference between a GUI and a CLI and why the CLI is often preferred
- Connect to a remote Windows machine over SSH
- Read system details with `set`, `ver`, and `systeminfo`
- Troubleshoot networking with `ipconfig`, `ping`, `tracert`, `nslookup`, and `netstat`
- Navigate and manage files with `cd`, `dir`, `tree`, `mkdir`, `rmdir`, `type`, `more`, `copy`, `move`, `del`, and `erase`
- List and terminate processes with `tasklist` and `taskkill`
- Run maintenance commands such as `chkdsk`, `driverquery`, and `sfc /scannow`
- Control system power with the `shutdown` command

---

## Task 1 — Introduction to Windows Command Line

A **Command-Line Interface (CLI)** lets you interact with an operating system by typing commands instead of clicking through a graphical interface. Windows provides the **Command Prompt**, whose executable is the default traditional command-line interpreter:

```cmd
cmd.exe
```

The Windows Command Line can display system information, inspect environment variables, check and troubleshoot network configuration, perform DNS lookups, view network connections, navigate directories, manage files and folders, view and terminate running processes, check disks and system files, and restart or shut down the system.

The TryHackMe answer for the default command line interpreter in the Windows environment is `cmd.exe`.

---

## Task 2 — GUI vs CLI

A **GUI (Graphical User Interface)** lets users interact through windows, icons, buttons, menus, and the mouse. It is generally easier for beginners.

A **CLI (Command-Line Interface)** lets users interact by typing commands. Instead of navigating through multiple GUI menus to find an IP address, you can retrieve it directly:

```cmd
ipconfig
```

| Interface | Interaction | Best for |
|-----------|-------------|----------|
| **GUI** | Windows, icons, buttons, menus, mouse | Beginners and visual tasks |
| **CLI** | Typed commands | Speed, automation, remote and low-resource systems |

---

## Task 3 — Why Use a CLI?

### Speed and Efficiency

Once you are familiar with the commands, many administrative tasks can be performed much faster than clicking through menus. A single command such as `ipconfig` immediately displays network information.

### Lower Resource Usage

CLI applications generally consume fewer resources than graphical applications, which makes them useful for servers, cloud systems, low-resource machines, remote systems, and IoT devices.

### Automation

Commands can be placed inside batch files, scripts, and automated workflows, which makes repetitive tasks easy to automate.

### Remote Management

CLI tools are extremely useful for managing systems remotely. A common example is **SSH**, which can be used to remotely manage servers, routers, Linux systems, Windows systems, and IoT devices.

> **Tip:** The CLI shines wherever a GUI is unavailable or too heavy, such as headless servers, cloud instances, and remote sessions where every resource counts.

---

## Task 4 — Windows Command Prompt

The Windows Command Prompt executable is `cmd.exe`. When it opens, the prompt shows the current working location:

```text
C:\>
```

As you move into folders, the prompt updates to reflect the current directory:

```text
C:\Users\strategos>
```

This means the current directory is `C:\Users\strategos`.

---

## Task 5 — Connecting to Windows via SSH

The TryHackMe lab lets you connect to the target Windows machine over SSH. The general syntax specifies a username and the target IP address:

```cmd
ssh username@IP_ADDRESS
```

For example:

```cmd
ssh user@10.49.137.184
```

On the first connection, SSH may ask whether you want to continue connecting. Answer `yes`, then provide the password. The typical workflow is:

1. Open the AttackBox terminal.
2. Run the SSH command.
3. Accept the host key if prompted.
4. Enter the password.
5. Access the remote Windows command line.

---

## Task 6 — Basic System Information

### set — Display Environment Variables

```cmd
set
```

The `set` command displays Windows environment variables such as `ALLUSERSPROFILE`, `LOGNAME`, `NUMBER_OF_PROCESSORS`, `OS`, and `Path`. One important variable is the `Path`, which lists the directories where Windows searches for executable commands:

```text
Path=C:\Windows\system32;C:\Windows;...
```

When you type a command, Windows checks the locations listed in the PATH to find the executable.

### ver — Display Windows Version

```cmd
ver
```

This displays the operating system version, which is useful for quickly identifying the Windows build:

```text
Microsoft Windows [Version 10.0.17763.1821]
```

### systeminfo — Detailed System Information

```cmd
systeminfo
```

This displays detailed information about the system, including host name, OS name, OS version, manufacturer, configuration, build type, processor and memory information, boot time, network information, and installed updates:

```text
Host Name:       WIN-SRV-2019
OS Name:         Microsoft Windows Server 2019 Datacenter
OS Version:      10.0.17763
```

It is useful during system administration, troubleshooting, security auditing, and enumeration.

### Viewing Long Command Output

Some commands generate large amounts of output. You can pipe that output to `more` and read it one page at a time:

```cmd
command | more
```

For example:

```cmd
driverquery | more
```

Use the spacebar to move to the next page, Enter to move one line, and CTRL + C to exit.

### help — Command Help

```cmd
help
```

This provides help information for Windows commands. For many commands, you can also append the `/?` switch:

```cmd
tasklist /?
```

### cls — Clear the Screen

```cmd
cls
```

This clears the Command Prompt screen, similar to `clear` on Linux.

> **Security relevance:** During enumeration, `systeminfo` reveals the OS build and patch level, which helps identify missing updates and potential vulnerabilities on a target host.

In the TryHackMe lab, the OS version of the Windows VM is `10.0.20348.2655` and the hostname is `WINSRV2022-CORE`.

---

## Task 7 — Network Configuration & Troubleshooting

Windows provides several important networking commands: `ipconfig`, `ping`, `tracert`, `nslookup`, and `netstat`.

### ipconfig — Network Configuration

```cmd
ipconfig
```

This displays basic network configuration such as the IPv4 address, IPv6 address, subnet mask, and default gateway:

```text
IPv4 Address : 10.10.230.237
Subnet Mask  : 255.255.0.0
Default Gateway : 10.10.0.1
```

### ipconfig /all — Detailed Network Configuration

```cmd
ipconfig /all
```

This displays detailed adapter information, including the description, physical address (MAC), DHCP status, IPv4 and IPv6 addresses, subnet mask, default gateway, DHCP server, DNS servers, and lease information:

```text
Physical Address : 02-B7-DF-1D-0D-99
DHCP Enabled     : Yes
IPv4 Address     : 10.10.230.237
Default Gateway  : 10.10.0.1
DNS Servers      : 10.0.0.2
```

To find the MAC address, run `ipconfig /all` and look for the **Physical Address** field. The TryHackMe answer for looking up the server's physical address is `ipconfig /all`.

### ping — Test Network Connectivity

```cmd
ping example.com
```

`ping` sends ICMP Echo Request packets to a target and waits for responses. It helps determine whether the target is reachable, whether connectivity exists, whether packet loss is occurring, and whether latency is high:

```text
Reply from 93.184.215.14: bytes=32 time=78ms TTL=52
Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)
```

### tracert — Trace Network Route

`tracert` stands for Trace Route and displays the path packets take through routers before reaching the destination. Each router along the route is called a **hop**:

```cmd
tracert example.com
```

It uses the IP packet's **TTL (Time To Live)** behaviour to discover intermediate routers, and is useful for troubleshooting, identifying routing problems, finding where connectivity fails, and understanding the network path. A `Request timed out.` line does not always mean the route is broken, because some routers simply do not respond to traceroute probes.

### nslookup — DNS Lookup

```cmd
nslookup example.com
```

This resolves a domain name into an IP address:

```text
Name: example.com
Address: 93.184.215.14
```

You can also query a specific DNS server instead of the system default:

```cmd
nslookup example.com 1.1.1.1
```

This is useful for DNS troubleshooting, testing different DNS servers, and checking domain resolution.

### netstat — Network Connections

```cmd
netstat
```

This displays current network connections with the protocol, local address, foreign address, and state. A state of `ESTABLISHED` means an active connection exists:

```text
TCP  10.10.230.237:22  10.11.81.126:53486  ESTABLISHED
```

Useful `netstat` options can be combined:

| Option | Displays |
|--------|----------|
| `-a` | Active connections and listening ports |
| `-b` | The executable associated with each connection or port |
| `-o` | The Process ID (PID) for each connection |
| `-n` | Addresses and port numbers numerically |

Combining them shows connections, listening ports, executables, PIDs, and numeric addresses at once:

```cmd
netstat -abon
```

Example output for a listening service:

```text
TCP  0.0.0.0:22  0.0.0.0:0  LISTENING  2116
[sshd.exe]
```

This tells us port 22 is in the `LISTENING` state, owned by PID 2116, belonging to the `sshd.exe` process.

> **Security relevance:** `netstat -abon` links open ports and active connections to the processes and PIDs behind them, which is central to spotting backdoors, unexpected listeners, and suspicious outbound traffic.

In the TryHackMe lab, the service listening on port 135 is `RpcSs`, and the service listening on port 3389 is `TermService` — port 3389 is commonly associated with **RDP (Remote Desktop Protocol)**.

---

## Task 8 — File and Disk Management

The core file and directory commands are `cd`, `dir`, `tree`, `mkdir`, `rmdir`, `type`, `more`, `copy`, `move`, `del`, and `erase`.

### cd — Current and Change Directory

Running `cd` with no arguments displays the current directory, similar to `pwd` on Linux:

```cmd
cd
```

```text
C:\Users\strategos
```

To change into a folder, pass its name; to move up one level, use `..`:

```cmd
cd Users
cd ..
```

### dir — List Directory Contents

```cmd
dir
```

This lists files and directories in the current location, similar to `ls` on Linux. Two useful switches extend it:

| Command | Purpose |
|---------|---------|
| `dir` | List files and directories in the current location |
| `dir /a` | Include hidden and system files |
| `dir /s` | Recursively list files in the current directory and all subdirectories |

`dir /a` is useful during system investigation and security enumeration because it reveals hidden and system files, while `dir /s` helps search through directory structures.

### tree — Display Directory Tree

```cmd
tree
```

This displays directories and subdirectories visually, which helps you understand the folder hierarchy:

```text
C:.
├── Desktop
├── Documents
├── Downloads
├── Music
├── Pictures
└── Videos
```

### mkdir and rmdir — Create and Remove Directories

`mkdir` means Make Directory and `rmdir` means Remove Directory:

```cmd
mkdir backup_files
rmdir backup_files
```

### type — Display Text File Contents

```cmd
type test.txt
```

This displays the entire contents of a text file directly in the terminal, which is useful when the file is relatively small.

### more — Read Long Text Files

```cmd
more file.txt
```

This is useful when a text file is too long to fit on one terminal screen. Press the spacebar to move one page and Enter to move one line. `more` can also page through long command output:

```cmd
systeminfo | more
```

### copy — Copy Files

```cmd
copy test.txt test2.txt
```

This creates a copy of `test.txt` named `test2.txt`. You can also copy into another folder:

```cmd
copy test.txt C:\Backup\
```

### move — Move Files

```cmd
move test2.txt ..
```

This moves `test2.txt` to the parent directory. The `move` command can also relocate files to any other folder.

### del and erase — Delete Files

Both `del` and `erase` delete the specified file:

```cmd
del test.txt
erase test2.txt
```

### Wildcards

The wildcard character `*` can represent multiple matching files. For example, copy every Markdown file into a folder:

```cmd
copy *.md C:\Markdown
```

Other examples list or delete groups of files by extension:

```cmd
dir *.txt
del *.log
```

> **Warning:** Destructive wildcard commands such as `del *.log` act on every matching file at once, so double-check the pattern and current directory before running them.

In the TryHackMe lab, the file contents found in `C:\Treasure\Hunt` are `THM{CLI_POWER}`.

---

## Task 9 — Task and Process Management

Windows processes can be managed from the command line using `tasklist` and `taskkill`.

### tasklist — List Running Processes

```cmd
tasklist
```

This displays running processes with the Image Name, PID, Session Name, Session Number, and Memory Usage:

```text
Image Name      PID
sshd.exe        2116
services.exe    584
lsass.exe       592
svchost.exe     704
```

PID means **Process ID** — every running process has a PID used to identify it. View the available options and filters with:

```cmd
tasklist /?
```

### Filtering Running Processes

You can filter processes by attribute using the `/FI` switch:

```cmd
tasklist /FI "imagename eq sshd.exe"
```

This searches for processes whose Image Name equals `sshd.exe`:

```text
sshd.exe    2116
sshd.exe    2712
sshd.exe    4752
```

The TryHackMe answer for finding the running processes related to `notepad.exe` is:

```cmd
tasklist /FI "imagename eq notepad.exe"
```

### taskkill — Terminate a Process

If you know a process's PID, you can terminate it with `taskkill`:

```cmd
taskkill /PID 4567
```

The TryHackMe answer for killing the process with PID 1516 is:

```cmd
taskkill /PID 1516
```

> **Security relevance:** Listing and filtering processes helps identify suspicious or unexpected executables, and terminating a malicious process by PID is a common containment step during incident response.

---

## Task 10 — Additional Useful Commands

### chkdsk — Check Disk

```cmd
chkdsk
```

This checks the file system and disk volumes for file system errors, disk errors, and bad sectors, and is commonly used for disk troubleshooting.

### driverquery — Installed Drivers

```cmd
driverquery
```

This displays a list of installed device drivers. Because the output can be long, pipe it through `more`:

```cmd
driverquery | more
```

It is useful for system administration, driver troubleshooting, and system enumeration.

### sfc /scannow — System File Checker

```cmd
sfc /scannow
```

SFC means **System File Checker**. It scans protected Windows system files for corruption and attempts to repair them.

### Getting Command Help

Most Windows commands support the `/?` switch, which is extremely useful when you forget the syntax or available options:

```cmd
tasklist /?
shutdown /?
ipconfig /?
```

---

## Task 11 — Shutdown Commands

Windows provides the `shutdown` command for controlling system power operations.

| Command | Switch meaning | Action |
|---------|----------------|--------|
| `shutdown /s` | Shutdown | Shut down the system |
| `shutdown /r` | Restart | Restart the system |
| `shutdown /a` | Abort | Cancel a pending shutdown or restart |

```cmd
shutdown /s
shutdown /r
shutdown /a
```

The TryHackMe answer for restarting a system is `shutdown /r`, and the answer for aborting a scheduled shutdown is `shutdown /a`.

---

## Task 12 — Cybersecurity Perspective

Windows command-line knowledge matters in cybersecurity because security professionals frequently work without relying on a GUI, especially on servers and remote systems. During system enumeration, a handful of commands can reveal important information about a target:

| Command | Reveals |
|---------|---------|
| `systeminfo` | Operating system and host information |
| `ipconfig /all` | Network interfaces, IP addresses, DNS, and MAC addresses |
| `netstat -abon` | Active connections, listening ports, processes, and PIDs |
| `tasklist` | Running processes |
| `dir /a` | Hidden and system files |
| `tracert` | Network route information |
| `nslookup` | DNS information |

These commands support defensive security, incident response, system administration, troubleshooting, authorized penetration testing, and Windows enumeration.

> **Security relevance:** The same built-in commands administrators use for daily management are the ones defenders use to investigate incidents and attackers use to enumerate a host, so fluency with them serves both sides of security work.

---

## Quick Revision

| Task | Command | Purpose |
|------|---------|---------|
| System info | `systeminfo` | Detailed OS, host, and build information |
| Windows version | `ver` | Quick OS version and build |
| Network config | `ipconfig /all` | IP, DNS, gateway, and MAC address |
| Connectivity | `ping` | Test whether a target is reachable |
| Route trace | `tracert` | Show the path packets take through routers |
| DNS lookup | `nslookup` | Resolve a domain to an IP address |
| Connections | `netstat -abon` | Ports, connections, executables, and PIDs |
| Directory listing | `dir /a` | List files including hidden and system files |
| Processes | `tasklist` | List running processes with their PIDs |
| Kill process | `taskkill /PID` | Terminate a process by its Process ID |

**Key idea:** Windows exposes a compact set of built-in commands that cover system information, networking, file management, and process control — the same commands drive administration, troubleshooting, and security enumeration.

---

## 30-Second Revision

- `cmd.exe` is the default Windows command-line interpreter.
- `set` shows environment variables (including `Path`); `ver` shows the version; `systeminfo` shows full system detail.
- `ipconfig /all` reveals MAC, DNS, and DHCP details; `ping` tests reachability; `tracert` maps the route.
- `nslookup` resolves DNS names; `netstat -abon` correlates ports, connections, processes, and PIDs.
- `cd`, `dir`, `tree`, `mkdir`, and `rmdir` handle directory navigation and creation.
- `type`, `more`, `copy`, `move`, `del`, and `erase` handle files; `*` is the wildcard.
- `tasklist` lists processes and `taskkill /PID` terminates them.
- `chkdsk`, `driverquery`, and `sfc /scannow` maintain disks and system files; `shutdown /s`, `/r`, and `/a` control power; `/?` shows help.

---

## Cheat Sheet

### System Information

| Command | Purpose |
|---------|---------|
| `set` | Display environment variables |
| `ver` | Display Windows version |
| `systeminfo` | Display detailed system information |
| `help` | Display command help |
| `cls` | Clear the terminal screen |
| `command /?` | Display help for a specific command |
| `command \| more` | View long output page by page |

### Networking

| Command | Purpose |
|---------|---------|
| `ipconfig` | Basic network configuration |
| `ipconfig /all` | Detailed config including MAC and DNS |
| `ping target` | Test network connectivity |
| `tracert target` | Trace the network path to a destination |
| `nslookup domain` | Perform a DNS lookup |
| `nslookup domain DNS_SERVER` | Query a specific DNS server |
| `netstat` | Display active network connections |
| `netstat -abon` | Connections, ports, executables, and PIDs |

### File and Directory Management

| Command | Purpose |
|---------|---------|
| `cd` / `cd directory` / `cd ..` | Show, change, or go up a directory |
| `dir` / `dir /a` / `dir /s` | List files, include hidden, or recurse |
| `tree` | Display the directory hierarchy |
| `mkdir folder` / `rmdir folder` | Create or remove a directory |
| `type file.txt` | Display file contents |
| `copy` / `move` | Copy or move a file |
| `del` / `erase` | Delete a file |
| `*.extension` | Match multiple files with a wildcard |

### Processes, Maintenance, and Power

| Command | Purpose |
|---------|---------|
| `tasklist` | List running processes |
| `tasklist /FI "imagename eq process.exe"` | Filter processes by image name |
| `taskkill /PID PID` | Terminate a process by PID |
| `chkdsk` | Check disks and file system |
| `driverquery` | Display installed device drivers |
| `sfc /scannow` | Scan and repair corrupted system files |
| `shutdown /s` / `/r` / `/a` | Shut down, restart, or abort |

---

## Interview Questions

**Q1. What is the default command-line interpreter in Windows?**
`cmd.exe`, the traditional Windows Command Prompt, launched from its executable of the same name.

**Q2. How do you find a machine's MAC address from the command line?**
Run `ipconfig /all` and read the **Physical Address** field for the relevant adapter.

**Q3. What is the difference between `ping` and `tracert`?**
`ping` tests whether a target is reachable using ICMP Echo Requests, while `tracert` maps each router hop along the path to the destination using the packet's TTL behaviour.

**Q4. Why is `netstat -abon` useful in an investigation?**
It combines active connections, listening ports, the associated executables, the owning PIDs, and numeric addresses, letting you tie suspicious network activity to a specific process.

**Q5. How do you find and stop a specific process from the CLI?**
Filter with `tasklist /FI "imagename eq process.exe"` to find the PID, then terminate it with `taskkill /PID <pid>`.

**Q6. What does `sfc /scannow` do?**
System File Checker scans protected Windows system files for corruption and attempts to repair them.

**Q7. How do you cancel a shutdown that has already been scheduled?**
Run `shutdown /a`, where `/a` aborts the pending shutdown or restart.

**Q8. How can you get help for a command you don't remember the syntax for?**
Append the `/?` switch to the command, for example `ipconfig /?`, or run `help` for general command help.

---

## Final Takeaway

The Windows Command Line turns a small, dependable set of commands into a complete toolkit for working with a system without a GUI. `set`, `ver`, and `systeminfo` describe the machine; `ipconfig`, `ping`, `tracert`, `nslookup`, and `netstat` diagnose the network; `cd`, `dir`, `tree`, `mkdir`, `rmdir`, `type`, `more`, `copy`, `move`, `del`, and `erase` manage files; and `tasklist` with `taskkill` control processes, backed by maintenance and power commands like `chkdsk`, `sfc /scannow`, and `shutdown`. Because these are the same utilities used for administration, troubleshooting, and security enumeration, fluency with them is a foundational skill for anyone working on or defending Windows systems.
