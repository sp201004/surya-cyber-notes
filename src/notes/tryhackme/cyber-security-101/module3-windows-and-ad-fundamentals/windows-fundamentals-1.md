| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Windows / Fundamentals |
| **Difficulty** | Beginner |
| **Time** | ~40 Minutes |
| **Module** | Windows and AD Fundamentals |

---

## Objective

This room is the first step into the world of **Microsoft Windows**. Windows powers a huge share of personal computers, corporate workstations, and enterprise servers, which is exactly why it is such a common target for attackers. Learning how Windows is organised is foundational for both administration and cybersecurity.

By the end of Windows Fundamentals 1 you will be able to:

- Recognise the common Windows editions and why they matter
- Navigate the Windows Desktop and its GUI components
- Explain the NTFS file system, its permissions, and Alternate Data Streams
- Understand the Windows and System32 directories and environment variables
- Manage user accounts, profiles, groups, and apply least privilege
- Describe User Account Control (UAC), Settings, Control Panel, and Task Manager

---

## Task 1 — Windows Editions

**Microsoft Windows** is one of the most widely used operating systems in the world. It provides a graphical environment for running applications, managing files, configuring hardware, connecting to networks, managing users, and applying security settings.

Microsoft ships different editions tuned for different environments:

| Edition | Typical Use |
|---------|-------------|
| **Windows Home** | Consumer and personal computers. |
| **Windows Pro** | Small business and power users. |
| **Windows Enterprise** | Large organisations with advanced management. |
| **Windows Education** | Academic institutions. |
| **Windows Server** | Servers, domain controllers, and infrastructure. |

Professional, Enterprise, and Server editions generally unlock more advanced functionality for business, networking, security, and domain environments.

### Why Editions Matter in Cybersecurity

The edition running on an endpoint determines which security and administrative features are available, such as Group Policy, domain membership, remote administration, and encryption. During assessments or investigations, identifying the OS version and edition helps establish the attack surface, available security features, possible vulnerabilities, and applicable patches.

> **Security relevance:** Knowing the exact Windows edition tells an analyst which defensive controls and management features exist on a host, which directly shapes both attack and defence planning.

---

## Task 2 — The Desktop (GUI)

**GUI** stands for **Graphical User Interface**. It lets users interact with the operating system through graphical elements such as windows, icons, buttons, menus, and dialog boxes instead of relying entirely on the command line. The Windows Desktop is the primary graphical workspace shown after login.

### Main Desktop Components

| Component | Purpose |
|-----------|---------|
| **Desktop** | The main workspace holding files, folders, shortcuts, and the Recycle Bin. |
| **Start Menu** | Access to installed apps, utilities, settings, search, and power options. |
| **Search Box** | Quickly locate applications, files, settings, and admin tools. |
| **Task View** | Overview of open windows for switching between them. |
| **Taskbar** | Quick access to Start, Search, Task View, and running/pinned apps. |
| **Notification Area** | Also called the **System Tray**; shows system status icons. |

### Running vs Pinned Applications

When an application is opened, its icon appears on the Taskbar. When it is closed, that icon normally disappears — unless the application has been **pinned**, in which case the icon stays available for quick launching.

Hovering over a Taskbar icon can display a preview thumbnail, tooltip, or open-window preview, making it easier to switch between running applications.

### Taskbar Configuration

Taskbar components (Search, Task View, Notification Area, buttons, and pinned apps) can be enabled, disabled, hidden, or customised through **Taskbar Settings**.

> **Tip:** The GUI is still valuable in security work. During enumeration and incident response, an analyst can visually inspect running applications, logged-in users, network status, and desktop artefacts that hint at user activity.

### TryHackMe Answers — Task 2

- To hide or disable the Search box, the correct selection is **Hidden**.
- To hide or disable the Task View button, toggle **Show Task View button**.
- Besides Clock and Network, the other icon shown in the Notification Area is the **Action Center**.

---

## Task 3 — Introduction to Windows

Windows is an operating system developed by Microsoft that acts as an interface between users, applications, and hardware. It manages key resources such as CPU, memory, storage, files, devices, processes, user accounts, and network connections.

Cybersecurity professionals frequently interact with Windows to investigate processes, analyse user accounts, inspect permissions, review network configuration, and detect malicious activity.

### Remote Desktop Protocol (RDP)

**RDP** stands for **Remote Desktop Protocol** — a Microsoft protocol used to remotely access and interact with a Windows system through a graphical desktop session. It is commonly used by system administrators, IT support, remote employees, and security professionals.

If RDP is exposed or poorly secured, attackers may attempt credential attacks, brute-force attacks, unauthorized remote access, and lateral movement. Recommended protections:

| Control | Benefit |
|---------|---------|
| **Strong authentication** | Resists credential guessing. |
| **Network Level Authentication (NLA)** | Requires auth before a session starts. |
| **Firewall rules / restricted access** | Limits who can reach RDP. |
| **VPN access** | Keeps RDP off the public Internet. |
| **Account lockout policies** | Slows brute-force attempts. |
| **Multi-factor authentication** | Adds a second verification factor. |

> **Warning:** Exposed or weakly secured RDP is one of the most common initial access vectors used by attackers, so it should never be left open to the Internet without hardening.

### The Run Dialog and MSC Files

The Windows **Run dialog** offers a fast way to launch applications, administrative utilities, management consoles, system tools, and specific files or folders. Many admin tools open directly by their command name.

Windows management consoles use the `.msc` extension, standing for **Microsoft Management Console** snap-in files. For example, the following command opens the Local Users and Groups Management console:

```text
lusrmgr.msc
```

---

## Task 4 — The File System

A file system defines how data is stored, organised, accessed, managed, and protected on a storage device. Windows has supported several file systems over time, including **FAT16**, **FAT32**, and **HPFS**, but modern installations primarily use **NTFS**.

### NTFS

**NTFS** stands for **New Technology File System**, the primary file system used by modern Windows. Compared with older systems like FAT, it adds reliability, security, permissions, large-file support, compression, and encryption.

NTFS is a **journaling file system** — it tracks changes in a journal/log so it can recover and maintain consistency after a crash, power failure, or unexpected shutdown.

| Feature | Detail |
|---------|--------|
| **Large file support** | Handles individual files larger than 4 GB (FAT32 caps near 4 GB). |
| **Permissions** | Access control for files and folders. |
| **Compression** | Reduces the storage space files consume. |
| **Encryption (EFS)** | Encrypting File System protects file contents from unauthorized access. |

### NTFS Permissions

| Permission | What it allows |
|------------|----------------|
| **Read** | View file and folder contents. |
| **Write** | Write data, create files, and add subfolders where permitted. |
| **Read & Execute** | Read contents and run executable files. |
| **List Folder Contents** | View files and subfolders (folder-focused, similar to Read & Execute). |
| **Modify** | Read, write, execute, and delete files and folders. |
| **Full Control** | Highest standard access, including changing permissions. |

Permissions are viewed by right-clicking a file or folder, then following:

```text
Right-click File/Folder > Properties > Security
```

> **Security relevance:** Incorrect permissions create real risk. If a low-privileged user can modify a file executed by a privileged service, that misconfiguration may contribute to a privilege escalation path.

### Alternate Data Streams (ADS)

**ADS** stands for **Alternate Data Streams**, an NTFS feature that lets a single file contain multiple data streams. Every file has at least a primary stream, commonly represented as `$DATA`, and additional streams can be attached.

File Explorer does not display these extra streams, so data can exist inside a file without being obvious. ADS is legitimate NTFS functionality, but attackers and malware may abuse it to hide data or conceal malicious content. Windows also uses ADS to store **Mark of the Web (MOTW)** metadata, marking files that originated from the Internet so extra security checks can be applied.

### TryHackMe Answer — Task 4

NTFS stands for **New Technology File System**.

---

## Task 5 — The Windows\System32 Folders

Windows is traditionally installed in `C:\Windows`, but it does not have to live on the `C:` drive — the location can vary by configuration. Rather than hardcoding a path, Windows exposes an environment variable that references the installation directory.

| Path / Variable | Purpose |
|-----------------|---------|
| **`C:\Windows`** | Default Windows installation directory. |
| **`%windir%`** | Environment variable that resolves to the Windows directory. |
| **`C:\Windows\System32`** | Critical system directory. |
| **`%windir%\System32`** | System32 referenced via the environment variable. |

Environment variables let applications and scripts reference important locations without assuming a fixed path, improving compatibility when Windows is installed elsewhere.

### The System32 Directory

`C:\Windows\System32` holds critical system files, executables, DLLs, administrative utilities, and system components. Deleting, replacing, or incorrectly modifying files here can break Windows features, cause application failures, or prevent the system from booting correctly.

> **Security relevance:** Attackers may abuse legitimate System32 binaries, masquerade malware as trusted system files, or exploit weak permissions. When judging whether a process is legitimate, consider its name, location, digital signature, hash, parent process, and command-line arguments.

### TryHackMe Answer — Task 5

The system variable for the Windows folder is **`%windir%`**.

---

## Task 6 — User Accounts, Profiles, and Permissions

Windows supports multiple user accounts on the same system, keeping files, settings, permissions, desktops, and profiles separate. The two common local account types are:

| Account Type | Privileges |
|--------------|------------|
| **Administrator** | Elevated: install/remove software, create and manage users and groups, change system settings, perform privileged actions. |
| **Standard User** | Restricted: works with their own files and apps; needs admin approval or credentials for privileged changes. |

Separating these account types reduces the impact of user mistakes, malicious software, and unauthorized system changes.

### Principle of Least Privilege

The **Principle of Least Privilege (PoLP)** states that a user should receive only the permissions necessary to perform their tasks. An employee who only browses the web, uses office apps, and reads documents does not need permanent local Administrator rights. Limiting privileges reduces the impact of malware infections, account compromise, accidental changes, and insider threats.

### Local Users and Groups

Windows provides a dedicated console for managing local users and groups, opened from the Run dialog:

```text
lusrmgr.msc
```

The console has two main sections — **Users** (local accounts on the machine) and **Groups** (local security groups). Groups simplify permission management: create a group, assign permissions to it, then add users to inherit those permissions.

A user can belong to one or many groups. Common examples include **Administrators**, **Users**, and **Remote Desktop Users**.

> **Security relevance:** Analysts enumerate group memberships to gauge an account's power. Membership in `Administrators` implies admin rights, while `Remote Desktop Users` may allow remote logon via RDP depending on configuration.

### User Profiles

Windows creates a profile for each user, generally stored under `C:\Users` (for example, `C:\Users\Max`). The profile is normally created on the user's first login and contains folders such as Desktop, Documents, Downloads, Music, and Pictures.

These directories are important during incident response, malware analysis, forensics, threat hunting, and penetration testing. The Downloads folder is especially useful when investigating potentially malicious files obtained from external sources.

### Built-in Accounts

Windows includes built-in accounts such as **Guest**, intended for limited guest access. Unused or misconfigured built-in accounts can increase the attack surface, so they should be reviewed and configured appropriately.

### TryHackMe Answers — Task 6

- The other user account is **`tryhackmebilly`**.
- That user is a member of **Remote Desktop Users** and **Users**.
- The built-in account for guest access is **`Guest`**.
- The account description is **`window$Fun1!`**.

---

## Task 7 — User Account Control (UAC)

**UAC** stands for **User Account Control**, a Windows security feature that reduces the risk of performing everyday activities with elevated administrative privileges. It helps prevent unauthorized or accidental system-level changes and stops malicious applications from silently gaining elevated privileges.

### Why UAC is Needed

Administrator accounts can install software, modify system settings, manage users, and change security configurations. If every application ran with full admin rights automatically, malware executed by the user could inherit those privileges. UAC introduces an approval or credential step before certain privileged operations proceed.

### How UAC Behaves

| Scenario | UAC Behaviour |
|----------|---------------|
| **Administrator user** | Apps do not run fully elevated by default; a confirmation prompt appears when elevation is needed. |
| **Standard user** | Privileged actions require valid administrator credentials before continuing. |
| **Authorization denied** | The privileged operation does not proceed. |

Some applications and settings display a **Shield icon**, indicating that performing the operation may require administrative elevation.

### TryHackMe Answer — Task 7

UAC stands for **User Account Control**.

---

## Task 8 — Settings and the Control Panel

Windows offers two configuration interfaces that overlap but serve slightly different roles.

| Interface | Character |
|-----------|-----------|
| **Settings** | Modern interface with common options and user-friendly navigation. |
| **Control Panel** | Traditional interface with legacy and more detailed configuration options. |

Windows continues to move functionality from Control Panel into Settings, but both are still encountered during administration and security work. The two are interconnected — for example, `Settings > Network & Internet > Change adapter options` opens the classic **Network Connections** interface.

### Viewing Installed Applications

Installed software can be reviewed through the following path, which lists the application name, publisher, and version:

```text
Control Panel > Programs > Programs and Features
```

> **Security relevance:** Reviewing installed software helps identify outdated, vulnerable, unauthorized, or unwanted programs. The more software installed, the larger the attack surface if applications are outdated or insecurely configured.

Because GUI access may not always be available on remote or large-scale systems, security professionals should also be comfortable with command-line and PowerShell administration, which is easier to automate.

### Windows Defender Firewall

One notable Control Panel option is **Windows Defender Firewall**, a host-based control that filters network traffic against configured rules. It can restrict unauthorized inbound connections, unwanted communication, and access to exposed services — especially important when a service such as RDP is enabled.

### TryHackMe Answer — Task 8

With Control Panel View set to Small icons, the last setting shown is **Windows Defender Firewall**.

---

## Task 9 — Task Manager

**Task Manager** is a built-in utility for monitoring and managing running applications, processes, CPU and memory usage, and overall system performance. It gives visibility into what is currently running on the system.

It can be opened by right-clicking the Taskbar and selecting **Task Manager**, or directly with the keyboard shortcut:

```text
Ctrl + Shift + Esc
```

Task Manager may open in a simplified view; clicking **More details** reveals the full interface with its key tabs.

| Tab | Shows |
|-----|-------|
| **Processes** | Running apps, background processes, and Windows processes with CPU/memory usage. |
| **Performance** | CPU, memory, disk, and network utilization. |
| **Users** | Currently logged-in users and their resource usage. |
| **Details** | Detailed per-process information for investigations. |
| **Services** | Windows services, which often run in the background and start automatically. |

Services matter greatly in administration, privilege escalation analysis, and persistence investigation.

> **Security relevance:** Task Manager helps spot suspicious processes, unusual resource usage, logged-in users, and running services, but it is not enough for advanced malware analysis. Malware may hide activity, mimic legitimate names, or inject into trusted processes, so analysts also use PowerShell, Process Explorer, Sysinternals, EDR, SIEM, and forensic tools.

### Investigating a Suspicious Process

A process name alone is never enough to judge legitimacy. Ask:

- What is the process name and executable path?
- Who started it and under what user account?
- What is its parent process?
- What command-line arguments were used?
- Is the executable digitally signed, and is its hash known-malicious?
- Is it making suspicious network connections?

### TryHackMe Answer — Task 9

The keyboard shortcut to open Task Manager is **`Ctrl + Shift + Esc`**.

---

## Task 10 — Conclusion

Windows Fundamentals 1 introduced foundational concepts important for both administration and cybersecurity: Windows editions, the Desktop GUI, the Windows operating system and RDP, NTFS with file permissions and Alternate Data Streams, the Windows and System32 directories, user accounts, profiles and groups, User Account Control, Settings, Control Panel, and Task Manager.

Future Windows Fundamentals modules build on this with topics such as the Management Console, Windows security tools, Windows Defender, the Windows Firewall, and additional administrative tools.

> **Tip:** After finishing a TryHackMe lab, terminate the virtual machine when it is no longer needed so lab resources do not keep running.

---

## Quick Revision

| Concept | Key Fact |
|---------|----------|
| **Editions** | Home, Pro, Enterprise, Education, Server — each exposes different features. |
| **GUI** | Graphical User Interface; Desktop, Start, Search, Task View, Taskbar, Notification Area. |
| **NTFS** | New Technology File System — journaling, permissions, compression, EFS encryption. |
| **ADS** | Alternate Data Streams — extra hidden streams inside NTFS files. |
| **System32** | `C:\Windows\System32`, referenced via `%windir%`, holds critical system files. |
| **PoLP** | Principle of Least Privilege — grant only the permissions needed. |
| **UAC** | User Account Control — approval/credential step before privileged actions. |

**Key idea:** Windows organises everything — files, users, privileges, and processes — through structures you can inspect, and understanding those structures is the foundation of Windows security work.

---

## 30-Second Revision

- GUI stands for Graphical User Interface; the Taskbar's Notification Area is also called the System Tray.
- NTFS is the modern Windows file system: journaling, permissions, large-file support, compression, and EFS encryption.
- NTFS permissions are Full Control, Modify, Read & Execute, List Folder Contents, Read, and Write.
- Alternate Data Streams hide extra data inside files and store Mark of the Web metadata for downloaded files.
- `C:\Windows` is the default install directory, referenced by `%windir%`; System32 holds critical system files.
- Accounts are Administrator or Standard User; follow the Principle of Least Privilege and enumerate groups with `lusrmgr.msc`.
- User profiles live under `C:\Users`; UAC requires approval or credentials before privileged operations.
- Task Manager opens with `Ctrl + Shift + Esc`; RDP must be hardened because it is a common attack vector.

---

## Cheat Sheet

| Command / Path / Shortcut | Purpose |
|---------------------------|---------|
| **`C:\Windows`** | Default Windows installation directory. |
| **`%windir%`** | Environment variable pointing to the Windows directory. |
| **`C:\Windows\System32`** | Critical Windows system directory. |
| **`%windir%\System32`** | System32 via the Windows environment variable. |
| **`C:\Users`** | Default location for user profiles. |
| **`C:\Users\<username>`** | An individual user's profile directory. |
| **`lusrmgr.msc`** | Opens Local Users and Groups Management. |
| **`Right-click > Properties > Security`** | View NTFS file/folder permissions. |
| **`Ctrl + Shift + Esc`** | Open Task Manager. |
| **`Control Panel > Programs > Programs and Features`** | View installed applications. |
| **`Settings > Network & Internet > Change adapter options`** | Access network adapter configuration. |

**Abbreviations:** NTFS = New Technology File System · ADS = Alternate Data Streams · EFS = Encrypting File System · MOTW = Mark of the Web · PoLP = Principle of Least Privilege · UAC = User Account Control · RDP = Remote Desktop Protocol · GUI = Graphical User Interface.

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What does GUI stand for?** | Graphical User Interface — a way to interact with the OS through graphical elements instead of only the command line. |
| **Q2. What is the difference between a running and a pinned Taskbar application?** | A running application's icon normally disappears when it is closed, while a pinned application's icon remains available for quick launching. |
| **Q3. What is another name for the Notification Area?** | The System Tray. |
| **Q4. What is RDP and why does it matter in cybersecurity?** | RDP (Remote Desktop Protocol) provides remote graphical access to Windows systems. Poorly secured or exposed RDP can be targeted for credential attacks, unauthorized access, and lateral movement. |
| **Q5. What does `lusrmgr.msc` open?** | The Local Users and Groups Management console. |
| **Q6. What is NTFS and why is it called a journaling file system?** | NTFS (New Technology File System) is the primary modern Windows file system. It is journaling because it keeps a log of file system changes to help recover and maintain consistency after failures. |
| **Q7. What are the main NTFS permissions?** | Full Control, Modify, Read & Execute, List Folder Contents, Read, and Write. |
| **Q8. What are Alternate Data Streams and why do they matter?** | ADS is an NTFS feature allowing additional data streams inside a file. It is legitimate functionality but can be abused by malware to conceal data. |
| **Q9. What is `%windir%` and what is System32?** | `%windir%` is an environment variable pointing to the Windows installation directory. System32 (`C:\Windows\System32`) is a critical directory holding key OS files, executables, libraries, and utilities. |
| **Q10. What is the Principle of Least Privilege?** | Granting users and processes only the minimum permissions required to perform their legitimate tasks. |
| **Q11. What is UAC?** | User Account Control — a mechanism that prompts for approval or administrator credentials before certain privileged operations proceed. |
| **Q12. What keyboard shortcut opens Task Manager, and why is it useful?** | `Ctrl + Shift + Esc`. It provides basic visibility into processes, resource usage, logged-in users, and services for initial system investigation. |

## Final Takeaway

Windows Fundamentals 1 is about building a mental map of how Windows is put together — its editions, **GUI**, **file system**, directories, accounts, and core management tools. Once you can read the Desktop, understand **NTFS permissions** and **ADS**, enumerate users and groups, and reason about **UAC** and running processes, you have the groundwork every later Windows and **Active Directory** topic depends on.
