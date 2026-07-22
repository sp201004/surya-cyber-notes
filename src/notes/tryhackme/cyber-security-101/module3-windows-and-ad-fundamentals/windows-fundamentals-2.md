| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Windows / Fundamentals |
| **Difficulty** | Beginner |
| **Time** | ~40 Minutes |
| **Module** | Windows and AD Fundamentals |

---

## Objective

Windows Fundamentals 2 builds on Part 1 and introduces the built-in tools used to configure, monitor, troubleshoot, and manage a Windows system. Many of these utilities are reached through the **System Configuration** tool (`msconfig`), but each can also be launched directly.

By the end of this room you will be able to:

- Use System Configuration (`msconfig`) and understand its tabs
- Configure User Account Control (UAC) and explain its security levels
- Navigate Computer Management, its System Tools, Storage, and Services
- Read System Information with `msinfo32` and inspect environment variables
- Monitor live system usage with Resource Monitor (`resmon`)
- Run core Command Prompt commands for enumeration
- Understand the Windows Registry and its root keys

---

## Task 1 — Introduction

Windows ships with several built-in utilities for configuring the OS, managing hardware, monitoring resources, managing services, troubleshooting, viewing logs, managing storage, and configuring security.

Many administrative tools are reachable through the System Configuration utility, while others can be launched directly using their executable or `.msc` command:

```cmd
msconfig
compmgmt.msc
msinfo32.exe
resmon.exe
regedt32.exe
```

Understanding these tools matters for both Windows administration and cybersecurity investigation, because the same legitimate tools are used by administrators and abused by attackers.

---

## Task 2 — System Configuration (msconfig)

The **System Configuration** utility, known as `msconfig`, is an advanced troubleshooting tool used to diagnose Windows startup and configuration problems.

```cmd
msconfig
```

> **Warning:** System Configuration is an advanced tool. Changing boot or service options carelessly can leave Windows unable to start normally.

### The msconfig Tabs

| Tab | Purpose |
|-----|---------|
| **General** | Controls how Windows starts (startup mode selection). |
| **Boot** | Boot process options, including Safe boot. |
| **Services** | Lists installed Windows services for troubleshooting. |
| **Startup** | Startup applications (now largely handled in Task Manager). |
| **Tools** | Shortcuts to administrative utilities. |

### General Tab — Startup Modes

| Mode | What it loads |
|------|---------------|
| **Normal Startup** | Loads all device drivers and services. |
| **Diagnostic Startup** | Loads only basic devices and services; useful for troubleshooting. |
| **Selective Startup** | Gives finer control over which components load at startup. |

### Boot Tab

The Boot tab provides options for the Windows boot process. The important option is **Safe boot**, which starts Windows with a limited set of drivers, services, and applications to help diagnose problems caused by third-party software or drivers.

### Services Tab

A **service** is a special application that normally runs in the background, handling tasks such as networking, system monitoring, authentication, updates, logging, and remote access. The Services tab helps identify problematic services during troubleshooting.

> **Warning:** Disabling important Windows services may cause system instability.

### Startup Tab

The Startup section relates to applications configured to launch when Windows boots or a user logs in. On modern Windows, startup application management is handled through **Task Manager → Startup**.

### Tools Tab

The Tools tab provides shortcuts to administrative utilities such as About Windows, Change UAC Settings, Computer Management, System Information, Resource Monitor, Command Prompt, and Registry Editor. Each of these can also be launched directly without opening `msconfig`.

---

## Task 3 — Change UAC Settings

**UAC (User Account Control)** is a Windows security feature designed to prevent unauthorized system-level changes. When an application attempts an administrative action, Windows may display a UAC prompt asking for confirmation or administrator credentials.

> **Security relevance:** Completely disabling UAC is generally not recommended because it removes an important barrier against unauthorized administrative changes.

### UAC Security Levels

The UAC slider has four levels, from most to least protective:

| Level | Behaviour |
|-------|-----------|
| **Always Notify** | Notifies for both application changes and your own Windows settings changes; dims the desktop using Secure Desktop. |
| **Notify for Apps** | Notifies when applications try to make changes, but not when you change Windows settings. This is generally the default. |
| **Notify Without Dimming** | Same as Notify for Apps but the desktop does not dim, so the prompt has less isolation from other applications. |
| **Never Notify** | Disables UAC notifications entirely; provides the least protection. |

### Opening UAC Settings

```cmd
UserAccountControlSettings.exe
```

The TryHackMe answer for the command to open User Account Control Settings is `UserAccountControlSettings.exe`.

---

## Task 4 — Computer Management

Computer Management is a centralized administrative console, opened with:

```cmd
compmgmt.msc
```

It contains three primary sections:

```
Computer Management
│
├── System Tools
├── Storage
└── Services and Applications
```

### System Tools

```
System Tools
│
├── Task Scheduler
├── Event Viewer
├── Shared Folders
├── Local Users and Groups
├── Performance
└── Device Manager
```

#### Task Scheduler

Task Scheduler lets users and administrators create tasks that Windows runs automatically. A scheduled task can run applications, scripts, or commands, triggered at system startup, at user login or logoff, at a specific time, on a recurring schedule, or on certain system events. Tasks appear under the **Task Scheduler Library**, and a simple task is created with **Actions → Create Basic Task**.

> **Security relevance:** Attackers abuse scheduled tasks for persistence, automated malware execution, and running payloads after reboot. Defenders should inspect unusual scheduled tasks during investigations.

#### Event Viewer

Event Viewer displays events recorded by Windows and applications, acting as an **audit trail**. It is useful for troubleshooting, security monitoring, incident investigation, identifying failures, and tracking authentication activity. Its window has three panes: a left pane with a tree of log providers, a middle pane showing events and details, and a right pane with available actions.

Windows event types:

| Event Type | Meaning |
|-----------|---------|
| **Error** | A significant problem, such as a service or driver failure. |
| **Warning** | A potential future problem, such as low disk space. |
| **Information** | Successful operation of an application, driver, or service. |
| **Success Audit** | A successful audited security event, such as a successful login. |
| **Failure Audit** | A failed audited security event, such as a failed access attempt. |

Standard Windows logs:

| Log | Contents |
|-----|----------|
| **Application** | Events generated by applications (e.g. application or database errors). |
| **Security** | Login attempts, resource access, and file access auditing. |
| **System** | Events from Windows components (driver failures, service failures, startup problems). |
| **Custom Logs** | Application-defined logs that control log size, ACLs, and event organization. |

> **Security relevance:** Security logs may reveal failed and successful logins, privilege changes, account activity, and service creation, making Event Viewer central to forensics, incident response, and threat hunting.

#### Shared Folders

Shared Folders displays resources shared over the network across three views: **Shares**, **Sessions**, and **Open Files**. Default administrative shares may include `C$`, `ADMIN$`, and `IPC$`, where the `$` symbol marks a **hidden share**. Sessions shows connected users, and Open Files shows files currently accessed by them.

> **Security relevance:** Misconfigured shares can expose sensitive data, so review share and NTFS permissions, hidden administrative shares, active sessions, and open files.

#### Local Users and Groups

Local users and groups are managed with `lusrmgr.msc`, allowing administrators to manage local users, local groups, and group memberships.

#### Performance Monitor

Performance Monitor, opened with `perfmon`, displays system performance data in real time or from saved log files. It helps troubleshoot CPU, memory, disk, and network problems as well as system bottlenecks.

#### Device Manager

Device Manager lets administrators view and configure installed hardware such as disk drives, display adapters, keyboards, monitors, network adapters, and processors. It can view, enable, or disable devices and troubleshoot or update drivers.

### Storage — Disk Management

The Storage section includes Windows Server Backup and **Disk Management**, the room's main focus. Disk Management performs advanced storage operations: setting up a new drive, creating, extending, or shrinking partitions, formatting volumes, and assigning or changing drive letters (for example, `E:`). It provides a graphical view of physical disks, partitions, volumes, file systems, and free space.

### Services and Applications

The Services console displays each service's Display Name, Status, Startup Type, and Log On As account. Right-clicking a service and selecting **Properties** reveals more detail, including the service name, description, path to executable, startup type, and status.

Service startup types:

| Startup Type | Behaviour |
|--------------|-----------|
| **Automatic** | Starts automatically when the system boots. |
| **Manual** | Starts only when a user or another process triggers it. |
| **Disabled** | Prevented from running. |

> **Security relevance:** Attackers may create or modify services for persistence and privileged execution, so investigators should check the service name, executable path, startup type, account, and current status.

### Windows Management Instrumentation (WMI)

**WMI (Windows Management Instrumentation)** lets scripting languages such as VBScript and Windows PowerShell manage Windows computers locally or remotely. Microsoft also provided a command-line interface called **WMIC (Windows Management Instrumentation Command-line)**, which has been deprecated in newer versions of Windows; PowerShell is now used instead.

### Task 4 Answers

The command to open Computer Management is `compmgmt.msc`. The `npcapwatchdog` scheduled task is set to run **at system startup**, and the hidden shared folder is named `sh4r3dF0Ld3r`.

---

## Task 5 — System Information

Windows provides a built-in information utility:

```cmd
msinfo32.exe
```

Microsoft System Information collects detailed information about hardware, system components, and the software environment, which is useful for diagnosing problems. The System Summary is divided into three major areas:

```
System Summary
│
├── Hardware Resources
├── Components
└── Software Environment
```

| Section | Contents |
|---------|----------|
| **System Summary** | General technical info: OS name, OS version, system name, processor, installed memory, system model. |
| **Hardware Resources** | Low-level hardware info such as DMA, I/O, IRQs, and memory; intended for advanced users. |
| **Components** | Hardware devices installed on the system (display, network, storage, USB, and more). |
| **Software Environment** | Software and OS configuration, including drivers, environment variables, running tasks, loaded modules, and services. |

### Environment Variables

Environment variables store information about the operating system environment, such as OS paths, temporary directories, processor information, and user profile locations. Applications can query them to locate important system resources instead of hardcoding paths.

| Variable | Meaning |
|----------|---------|
| `%WINDIR%` | The Windows installation directory. |
| `%SystemRoot%` | The Windows system root path. |
| `%TEMP%` / `%TMP%` | Temporary directories. |
| `%USERPROFILE%` | The current user's profile location. |
| `%PATH%` | Directories searched for executables. |
| `ComSpec` | The command-line interpreter path. |

Environment variables are divided into **User Variables** (which apply to the current user, e.g. `Path`, `TEMP`, `TMP`) and **System Variables** (which apply system-wide, e.g. `ComSpec`, `OS`, `Path`, `PATHEXT`, `PROCESSOR_ARCHITECTURE`).

In the TryHackMe lab, the `ComSpec` variable resolves to:

```text
%SystemRoot%\system32\cmd.exe
```

`msinfo32` also includes a search bar. You can search for information such as an IP address and enable **Search selected category only** to narrow the results.

### Task 5 Answers

The command to open System Information is `msinfo32.exe`. The value listed under System Name is `THM-WINFUN2`, and the value for the `ComSpec` environment variable is `%SystemRoot%\system32\cmd.exe`.

---

## Task 6 — Resource Monitor

Resource Monitor is a utility for monitoring live system resource usage:

```cmd
resmon.exe
```

It provides per-process and aggregate information across four areas, each with a dedicated tab in addition to the Overview tab:

| Tab | Information shown |
|-----|-------------------|
| **CPU** | Processes, services, CPU usage, threads, handles, and modules. |
| **Memory** | Physical memory, usage, hard faults, commit, working sets, and shareable/private memory. |
| **Disk** | Processes with disk activity, read/write speed, total I/O, files accessed, and response time. |
| **Network** | Processes with network activity, TCP connections, and listening ports. |

The Network tab is especially useful for identifying active connections, remote IP addresses, local and remote ports, listening services, and network-intensive processes.

> **Security relevance:** Resource Monitor can surface suspicious processes, unexpected network connections, unusual listening ports, and abnormal CPU, disk, or memory use, though dedicated security tools are usually needed for deeper threat analysis.

### Task 6 Answer

The command to open Resource Monitor is `resmon.exe`.

---

## Task 7 — Command Prompt

The Windows Command Prompt (`cmd`) predates graphical interfaces and is still used for system administration, troubleshooting, networking, file management, user management, and information gathering.

### Basic Commands

```cmd
hostname
```

Displays the computer's hostname:

```text
THM-WINFUN2
```

```cmd
whoami
```

Displays the currently logged-in user, useful for determining the current security context:

```text
thm-winfun2\administrator
```

```cmd
ipconfig
```

Displays network configuration such as the IPv4 address, IPv6 address, subnet mask, default gateway, and network adapter. For detailed configuration, use:

```cmd
ipconfig /all
```

Most commands provide built-in help using the `/?` switch, which shows syntax, parameters, and options:

```cmd
ipconfig /?
```

To clear the screen:

```cmd
cls
```

### netstat

The `netstat` command displays protocol statistics and current TCP/IP network connections:

```cmd
netstat
```

Its output includes the protocol, local address, foreign address, and connection state (for example `ESTABLISHED`, `LISTENING`, or `TIME_WAIT`). Useful parameters:

| Option | Purpose |
|--------|---------|
| `-a` | Display all connections and listening ports. |
| `-b` | Display the executable involved in creating each connection. |
| `-n` | Display addresses and port numbers numerically. |
| `-o` | Display the owning process ID (PID). |

A commonly useful combination during investigations correlates connections with process IDs:

```cmd
netstat -ano
```

### net

The `net` command manages Windows network resources. Running it alone lists available subcommands such as `ACCOUNTS`, `GROUP`, `LOCALGROUP`, `SESSION`, `SHARE`, `START`, `STOP`, `USE`, `USER`, and `VIEW`:

```cmd
net
```

Detailed help is not obtained with `net /?`; instead use `net help`, and add a subcommand for specific help:

```cmd
net help
net help user
net help localgroup
net help share
net help session
```

`net user` manages local user accounts.

> **Security relevance:** Commands like `whoami`, `hostname`, `ipconfig /all`, `netstat -ano`, `net user`, `net localgroup`, and `net share` reveal computer identity, current user, network configuration, active connections, and local users, groups, and shares during enumeration and incident response.

### Task 7 Answers

In System Configuration, the full command for Internet Protocol Configuration is:

```text
C:\Windows\System32\cmd.exe /k %windir%\system32\ipconfig.exe
```

To show detailed information for the `ipconfig` command, use `ipconfig /all`.

---

## Task 8 — Registry Editor

The Windows Registry is a central hierarchical database that stores the information needed to configure the operating system, user profiles, applications, and hardware devices. Windows continually references it during normal operation.

The Registry can hold information about user profiles, installed applications, file associations, folder settings, application icons, hardware configuration, ports in use, and system configuration.

> **Warning:** The Registry is intended for advanced users and administrators. Incorrect modifications can break applications, cause instability, or prevent Windows from functioning correctly.

The graphical editor is opened with `regedit`, and the TryHackMe answer for the executable is:

```cmd
regedt32.exe
```

### Registry Root Keys

```
Computer
│
├── HKEY_CLASSES_ROOT
├── HKEY_CURRENT_USER
├── HKEY_LOCAL_MACHINE
├── HKEY_USERS
└── HKEY_CURRENT_CONFIG
```

| Root Key | Contents |
|----------|----------|
| **HKEY_CLASSES_ROOT (HKCR)** | File associations, registered applications, and COM objects. |
| **HKEY_CURRENT_USER (HKCU)** | Settings for the currently logged-in user, such as desktop and software preferences. |
| **HKEY_LOCAL_MACHINE (HKLM)** | System-wide configuration: installed software, hardware, services, and security. |
| **HKEY_USERS (HKU)** | User profiles loaded on the system. |
| **HKEY_CURRENT_CONFIG (HKCC)** | Information about the currently used hardware profile. |

> **Security relevance:** Attackers modify Registry keys for persistence, startup execution, and security control changes, so Registry analysis is common in malware analysis, incident response, digital forensics, and threat hunting.

### Task 8 Answer

The command to open Registry Editor is `regedt32.exe`.

---

## Task 9 — Conclusion

This room covered the Windows utilities reachable from the System Configuration (`msconfig`) Tools section. Most can also be launched directly:

```cmd
UserAccountControlSettings.exe
compmgmt.msc
msinfo32.exe
resmon.exe
cmd.exe
regedt32.exe
```

Several can also be found through the Start Menu under **Windows Administrative Tools** and **Windows System**. Knowing these built-in tools is valuable for both administrators and defenders, since the same legitimate utilities support administration, troubleshooting, enumeration, and security investigation.

---

## Quick Revision

| Utility | Command | Used for |
|---------|---------|----------|
| System Configuration | `msconfig` | Startup, boot, and service troubleshooting. |
| UAC Settings | `UserAccountControlSettings.exe` | Preventing unauthorized administrative changes. |
| Computer Management | `compmgmt.msc` | System Tools, Storage, Services in one console. |
| System Information | `msinfo32.exe` | Hardware, components, software environment. |
| Resource Monitor | `resmon.exe` | Live CPU, memory, disk, and network usage. |
| Registry Editor | `regedit` / `regedt32.exe` | Viewing and editing the Windows Registry. |

**Key idea:** Windows exposes a consistent set of built-in tools for configuration, monitoring, and troubleshooting — mastering them serves administration and security investigation equally.

---

## 30-Second Revision

- `msconfig` diagnoses startup and boot problems through General, Boot, Services, Startup, and Tools tabs.
- UAC has four levels: Always Notify, Notify for Apps (default), Notify Without Dimming, and Never Notify.
- Computer Management (`compmgmt.msc`) groups System Tools, Storage, and Services and Applications.
- Task Scheduler, Event Viewer, Shared Folders, and Services are all common attacker persistence and defender investigation points.
- `msinfo32` reports hardware and software details; environment variables like `ComSpec` and `%WINDIR%` store system paths.
- Resource Monitor (`resmon`) shows live CPU, memory, disk, and network usage per process.
- Core CMD commands: `hostname`, `whoami`, `ipconfig /all`, `netstat -ano`, `net user`.
- The Registry has five root keys and is a frequent target for persistence.

---

## Cheat Sheet

| Purpose | Command |
|---------|---------|
| System Configuration | `msconfig` |
| UAC Settings | `UserAccountControlSettings.exe` |
| Computer Management | `compmgmt.msc` |
| Local Users and Groups | `lusrmgr.msc` |
| Performance Monitor | `perfmon` |
| System Information | `msinfo32.exe` |
| Resource Monitor | `resmon.exe` |
| Command Prompt | `cmd.exe` |
| Registry Editor | `regedit` / `regedt32.exe` |
| Show hostname | `hostname` |
| Show current user | `whoami` |
| Network configuration | `ipconfig` |
| Detailed network config | `ipconfig /all` |
| Command help | `command /?` |
| Clear the screen | `cls` |
| Network connections | `netstat` |
| Connections with PID | `netstat -ano` |
| net command help | `net help` |
| net user help | `net help user` |

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is `msconfig` used for?** | System Configuration is an advanced troubleshooting tool that diagnoses Windows startup and configuration problems through its General, Boot, Services, Startup, and Tools tabs. |
| **Q2. What are the four UAC levels?** | Always Notify, Notify for Apps (the default), Notify Without Dimming, and Never Notify — ranging from the most protective to the least. |
| **Q3. What three sections does Computer Management contain?** | System Tools, Storage, and Services and Applications. |
| **Q4. Why is Event Viewer important in cybersecurity?** | It provides an audit trail of system, security, and application events — such as failed and successful logins and service creation — which is essential for forensics, incident response, and threat hunting. |
| **Q5. What does the `$` mean in a share name like `C$`?** | It indicates a hidden administrative share that is not displayed in normal network browsing. |
| **Q6. What are the three service startup types?** | Automatic (starts at boot), Manual (starts on demand), and Disabled (prevented from running). |
| **Q7. What does `netstat -ano` show?** | All connections and listening ports with numeric addresses and the owning process ID, letting you correlate connections with processes. |
| **Q8. What are the five Registry root keys?** | HKEY_CLASSES_ROOT, HKEY_CURRENT_USER, HKEY_LOCAL_MACHINE, HKEY_USERS, and HKEY_CURRENT_CONFIG. |

## Final Takeaway

Windows Fundamentals 2 turns the built-in administrative toolset into practical knowledge: configuring startup with `msconfig`, controlling privilege with UAC, managing the system through Computer Management, reading system detail with `msinfo32`, watching live activity with `resmon`, enumerating from the Command Prompt, and understanding the Registry. These are the same legitimate tools defenders use to investigate incidents and attackers abuse for persistence, so fluency with them is foundational for both administration and security work.
