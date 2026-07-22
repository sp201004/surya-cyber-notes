| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Windows / PowerShell |
| **Difficulty** | Beginner |
| **Time** | ~50 Minutes |
| **Module** | Command Line |

---

## Objective

Windows PowerShell is a cross-platform task automation solution built from a command-line shell, a scripting language, and a configuration management framework. What sets it apart from traditional shells is that it works with **objects** rather than plain text, so structured data (properties and methods) flows intact through the pipeline instead of being parsed and reparsed as strings.

By the end of this room you will be able to:

- Explain what PowerShell is and why it was created
- Describe PowerShell's object-oriented model and how it differs from text-based shells
- Read and write cmdlets using the **Verb-Noun** convention
- Discover commands and read help with `Get-Command`, `Get-Help`, and `Get-Alias`
- Find and install modules with `Find-Module` and `Install-Module`
- Navigate and manage the file system (`Get-ChildItem`, `Set-Location`, `New-Item`, `Remove-Item`, `Copy-Item`, `Move-Item`, `Get-Content`)
- Build pipelines that sort, filter, and select objects
- Retrieve system, user, and network information
- Perform real-time analysis of processes, services, connections, hashes, and alternate data streams
- Understand PowerShell's role in blue-team, red-team, and administration work, plus scripting and `Invoke-Command`

---

## Task 1 — Introduction

PowerShell is a powerful command-line shell and scripting environment developed by Microsoft. It is used for system administration, task automation, configuration management, file and network administration, remote system management, and — the focus of this room — security monitoring, incident response, threat hunting, and penetration testing.

Microsoft defines PowerShell as a cross-platform task automation solution made up of a command-line shell, a scripting language, and a configuration management framework. Those four pillars combine into a single tool:

```text
PowerShell
│
├── Command-Line Shell
├── Scripting Language
├── Task Automation
└── Configuration Management
```

Originally designed for Windows administration, modern PowerShell (PowerShell Core) is open source and cross-platform, running on Windows, macOS, and Linux.

### Why PowerShell Was Created

Traditional Windows administration relied on `cmd.exe` and batch files (`.bat`), which became insufficient for increasingly complex enterprise environments. Windows needed a tool capable of advanced automation, working with modern Windows APIs, managing structured system data, and interacting deeply with Windows components. In the early 2000s Microsoft engineer **Jeffrey Snover** recognised that Unix treated system information largely as text, while Windows relied on structured data, APIs, objects, and .NET components — so simply porting Unix tools was not enough. PowerShell was released in 2006 as an object-oriented shell with deep Windows integration, and PowerShell Core followed in 2016 as an open-source, cross-platform release.

> **Tip:** The single most important idea in this room is that PowerShell is object-oriented. Keep that lens on every cmdlet you learn.

---

## Task 2 — What Is PowerShell

The biggest conceptual difference between PowerShell and many traditional shells is its use of **objects**. An object represents something that bundles together data and behaviour:

| Component | Meaning |
|-----------|---------|
| **Properties** | Characteristics or data describing the object (its state). |
| **Methods** | Actions or functions the object can perform. |

A real-world analogy is a car object with properties such as `Color`, `Model`, and `FuelLevel`, and methods such as `Drive()`, `HonkHorn()`, and `Refuel()`. In PowerShell, objects can represent files, directories, processes, services, users, network connections, and IP addresses. A file object, for instance, exposes:

| File object | Examples |
|-------------|----------|
| **Properties** | `Name`, `Length`, `Extension`, `LastWriteTime` |
| **Methods** | `Copy`, `Delete`, `Move` |

### Traditional Shell vs PowerShell

Traditional command-line tools pass **plain text** from one command to the next, so each command must re-parse the text:

```text
Command → Plain Text → Next Command
```

PowerShell passes **objects** through the pipeline, preserving structure:

```text
Cmdlet → Object → Pipeline → Cmdlet
             │
             ├── Properties
             └── Methods
```

Because objects survive the pipeline, later cmdlets can work directly with properties such as `Name`, `Length`, `Extension`, `ProcessName`, `Status`, and `OwningProcess` without any text parsing.

> **Security relevance:** Structured objects make PowerShell precise for investigations — you can filter processes by a numeric property or correlate a TCP connection to its owning process without fragile string manipulation.

The advanced approach used to develop PowerShell is described as **object-oriented**, which is the TryHackMe answer for this task.

---

## Task 3 — PowerShell Basics

### Launching PowerShell

PowerShell can be launched several ways: from the Start Menu (search `powershell`), the Run dialog (`Win + R`, type `powershell`), the File Explorer address bar, Task Manager (**File → Run new task**), or from an existing Command Prompt session.

```powershell
powershell
```

Once it starts, the prompt changes to something like the following, where `PS` stands for PowerShell:

```text
PS C:\Users\captain>
```

### Verb-Noun Syntax

PowerShell commands are called **cmdlets** (pronounced "command-lets"). They follow a consistent `Verb-Noun` naming convention, where the verb is the action and the noun is the object being acted upon:

| Cmdlet | Verb (action) | Noun (object) | Purpose |
|--------|---------------|---------------|---------|
| **Get-Content** | Get | Content | Retrieves the contents of a file. |
| **Set-Location** | Set | Location | Changes the current working directory. |
| **Get-Process** | Get | Process | Lists running processes. |
| **Remove-Item** | Remove | Item | Deletes a file or directory. |

This predictable structure means you can often guess a cmdlet's name, and it makes discovery straightforward.

### Get-Command — Discovering Commands

`Get-Command` lists available cmdlets, functions, aliases, and scripts. It is one of the most important commands when exploring PowerShell.

```powershell
Get-Command
```

You can filter by command type or search with the `*` wildcard, which matches any sequence of characters:

```powershell
Get-Command -CommandType "Function"
Get-Command -Name Get*
Get-Command -Name Set*
Get-Command -Name Remove*
```

Retrieving every command that starts with the verb `Remove` is done with `Get-Command -Name Remove*`, which is the TryHackMe answer for that question.

### Get-Help — Learning Command Usage

PowerShell has a built-in help system. `Get-Help` explains a cmdlet's name, synopsis, syntax, description, related links, and remarks.

```powershell
Get-Help Get-Date
```

Switches control the depth of help returned:

| Switch | Shows |
|--------|-------|
| **-Examples** | Practical usage examples for the cmdlet. |
| **-Detailed** | Parameter descriptions plus examples. |
| **-Full** | Complete technical help. |
| **-Online** | Opens the online documentation page. |

```powershell
Get-Help Get-Date -Examples
Get-Help Get-Date -Detailed
Get-Help Get-Date -Full
Get-Help Get-Date -Online
```

Retrieving example usage for creating a local user is done with `Get-Help New-LocalUser -Examples`, which is the TryHackMe answer for that question.

### Get-Alias — Shortcuts for Familiar Commands

Aliases are alternative names for cmdlets, easing the transition for users familiar with CMD or Unix shells.

```powershell
Get-Alias
```

| Alias | Actual cmdlet |
|-------|---------------|
| **dir** | Get-ChildItem |
| **cd** | Set-Location |
| **cat** | Get-Content |
| **echo** | Write-Output |
| **%** | ForEach-Object |
| **?** | Where-Object |

The cmdlet that has `echo` as an alias is **Write-Output**, which is the TryHackMe answer for that question.

> **Tip:** Aliases are convenient at the prompt, but use full cmdlet names in scripts and documentation for clarity.

### Finding and Installing Modules

PowerShell functionality is extended with **modules**, which bundle cmdlets, functions, scripts, and other resources. `Find-Module` searches online repositories such as the PowerShell Gallery, and `Install-Module` installs them.

```powershell
Find-Module -Name "PowerShell*"
Install-Module -Name "PowerShellGet"
```

Once installed, the cmdlets contained in a module become available.

> **Warning:** Online repository operations require an active internet connection, and installing modules from untrusted sources can introduce risk — review a module before installing it.

---

## Task 4 — Navigating the File System and Working with Files

PowerShell provides object-based cmdlets for browsing and managing files and directories. Many map directly to familiar CMD and Linux commands.

### Get-ChildItem — Listing Items

`Get-ChildItem` lists files and directories, equivalent to `dir` in CMD and `ls` in Linux.

```powershell
Get-ChildItem
Get-ChildItem -Path C:\Users
```

Listing the contents of `C:\Users` is done with `Get-ChildItem -Path C:\Users`, and in the lab it displays **4** items — both TryHackMe answers for this task.

### Set-Location — Changing Directory

`Set-Location` changes the working directory, equivalent to `cd`.

```powershell
Set-Location -Path ".\Documents"
```

### New-Item — Creating Files and Directories

Unlike traditional CLIs that use separate commands, PowerShell uses `New-Item` for both, controlled by the `-ItemType` parameter.

```powershell
New-Item -Path ".\captain-cabin\captain-wardrobe" -ItemType "Directory"
New-Item -Path ".\captain-cabin\captain-wardrobe\captain-boots.txt" -ItemType "File"
```

### Remove-Item, Copy-Item, Move-Item

A single cmdlet handles each operation for both files and directories:

```powershell
Remove-Item -Path ".\captain-boots.txt"
Remove-Item -Path ".\captain-wardrobe"
Copy-Item -Path .\captain-hat.txt -Destination .\captain-hat2.txt
Move-Item -Path .\captain-hat.txt -Destination .\captain-cabin
```

### Get-Content — Reading Files

`Get-Content` reads a file's contents, equivalent to `type` in CMD and `cat` in Linux.

```powershell
Get-Content -Path ".\captain-hat.txt"
```

The PowerShell alternative to the `type` command is **Get-Content**, which is the TryHackMe answer for that question.

### File Management Command Map

| Task | PowerShell | CMD / Linux |
|------|-----------|-------------|
| **List files** | `Get-ChildItem` | `dir` / `ls` |
| **Change directory** | `Set-Location` | `cd` |
| **Create item** | `New-Item` | `mkdir` / `touch` |
| **Delete item** | `Remove-Item` | `del` / `rmdir` |
| **Copy item** | `Copy-Item` | `copy` / `cp` |
| **Move item** | `Move-Item` | `move` / `mv` |
| **Read file** | `Get-Content` | `type` / `cat` |

---

## Task 5 — Piping, Filtering, and Sorting Data

Piping sends the output of one command into another using the `|` symbol. Crucially, PowerShell pipelines pass **objects**, not plain text, so the object's properties and methods remain available to subsequent cmdlets.

```text
Get-ChildItem
      │
      │ File objects (not text)
      ▼
Sort-Object Length
      │
      ▼
Files sorted by size
```

### Sort-Object — Sorting

`Sort-Object` orders objects by a chosen property, ascending by default or descending with `-Descending`.

```powershell
Get-ChildItem | Sort-Object Length
Get-ChildItem | Sort-Object Length -Descending
```

### Where-Object — Filtering

`Where-Object` keeps only the objects that match a condition. Because objects carry their properties, filtering is exact.

```powershell
Get-ChildItem | Where-Object -Property "Extension" -eq ".txt"
Get-ChildItem | Where-Object -Property Length -gt 100
```

Retrieving items in the current directory whose size is greater than 100 is done with `Get-ChildItem | Where-Object -Property Length -gt 100`, which is the TryHackMe answer for this task.

### Comparison Operators

| Operator | Meaning |
|----------|---------|
| **-eq** | Equal to |
| **-ne** | Not equal to |
| **-gt** | Greater than |
| **-ge** | Greater than or equal to |
| **-lt** | Less than |
| **-le** | Less than or equal to |
| **-like** | Wildcard pattern matching |

The `-like` operator performs wildcard pattern matching. For example, matching names that start with `ship` (such as `ship-flag.txt`, `ship.txt`, and `shipping.log`):

```powershell
Get-ChildItem | Where-Object -Property "Name" -like "ship*"
```

### Select-Object — Choosing Properties

`Select-Object` limits which properties are displayed or how many objects are returned.

```powershell
Get-ChildItem | Select-Object Name,Length
Get-ChildItem | Select-Object -First 1
```

### Combining Cmdlets

The real power of the object pipeline appears when cmdlets are chained. To find the largest file, list items, sort by size descending, then take the first:

```powershell
Get-ChildItem | Sort-Object Length -Descending | Select-Object -First 1
```

### Select-String — Searching Inside Files

`Select-String` searches for text patterns inside files, similar to `grep` in Linux and `findstr` in CMD, and it supports regular expressions.

```powershell
Select-String -Path ".\captain-hat.txt" -Pattern "hat"
```

> **Security relevance:** `Select-String` is a workhorse for log analysis, threat hunting, and incident response — finding suspicious strings and extracting indicators of compromise from files and logs.

---

## Task 6 — System and Network Information

### Get-ComputerInfo — System Details

`Get-ComputerInfo` retrieves detailed, structured system information covering the operating system, Windows version and edition, installation details, hardware, BIOS, and system configuration. It is the richer counterpart to the traditional `systeminfo` command.

```powershell
Get-ComputerInfo
```

### Get-LocalUser — Local Accounts

`Get-LocalUser` lists local user accounts along with properties such as `Name`, `Enabled`, and `Description`.

```powershell
Get-LocalUser
```

> **Security relevance:** Enumerating local users helps auditors and responders spot unexpected or unauthorised accounts during security audits and incident response.

### Get-NetIPConfiguration — Network Configuration

`Get-NetIPConfiguration` returns detailed network configuration — interface, interface index, IPv4 and IPv6 addresses, default gateway, DNS server, and network profile. It is the counterpart to `ipconfig`.

```powershell
Get-NetIPConfiguration
```

### Get-NetIPAddress — Configured IP Addresses

`Get-NetIPAddress` displays configured IP addresses, including IPv4, IPv6, and loopback addresses in both active and inactive states.

```powershell
Get-NetIPAddress
```

Common properties returned include `IPAddress`, `InterfaceIndex`, `InterfaceAlias`, `AddressFamily`, `Type`, `PrefixLength`, and `AddressState`.

---

## Task 7 — Real-Time System Analysis

PowerShell can retrieve dynamic, live system information — running processes, services, active network connections, file hashes, and alternate data streams — which makes it valuable for defensive investigation.

### Get-Process — Running Processes

`Get-Process` lists currently running processes with properties such as `Handles`, `PM(K)`, `WS(K)`, `CPU(s)`, `Id`, and `ProcessName`.

```powershell
Get-Process
```

> **Security relevance:** Process listings support malware analysis and incident response by helping identify suspicious or unexpected processes.

### Get-Service — Services

`Get-Service` lists services and their state (`Running`, `Stopped`, or `Paused`), showing `Status`, `Name`, and `DisplayName`.

```powershell
Get-Service
```

> **Security relevance:** Reviewing services helps detect suspicious services and persistence mechanisms during forensic analysis.

### Get-NetTCPConnection — Active TCP Connections

`Get-NetTCPConnection` shows active TCP connections and listening ports, with properties including `LocalAddress`, `LocalPort`, `RemoteAddress`, `RemotePort`, `State`, and `OwningProcess`. Connection states include `Listen`, `Established`, and `TimeWait`.

```powershell
Get-NetTCPConnection
```

The property that contains process information for a TCP connection is **OwningProcess**, which is the TryHackMe answer for that question. It identifies the process behind a connection, so a suspicious outbound connection can be correlated with `Get-Process` to reveal the responsible program.

### Get-FileHash — File Integrity

`Get-FileHash` computes a cryptographic hash of a file, generating **SHA256** by default, and returns the `Algorithm`, `Hash`, and `Path`.

```powershell
Get-FileHash -Path .\ship-flag.txt
```

The concept is simple: hash a file now and later, then compare. Identical hashes mean the file is unchanged; different hashes mean it was modified.

```text
Original File → Hash A
Later File    → Hash B

Hash A == Hash B?
      ├── Yes → File likely unchanged
      └── No  → File has changed
```

In the lab, the hash of the treasure file is `71FC5EC11C2497A32F8F08E61399687D90ABE6E204D2964DF589543A613F3E08`, which is the TryHackMe answer for that question.

> **Security relevance:** Hashing verifies file integrity, detects tampering, compares malware samples, and supports threat hunting and incident response.

### Alternate Data Streams (ADS)

NTFS supports **Alternate Data Streams**, which attach extra data to a file without it appearing in the file's normal contents. Streams are inspected with `Get-Item` and the `-Stream` parameter:

```powershell
Get-Item -Path "C:\House\house_log.txt" -Stream *
```

Example output lists the streams attached to the file:

```text
:$DATA
housinginfo
```

The `:$DATA` stream is the default stream holding the normal file contents and is not an additional hidden ADS. A named stream such as `house_log.txt:housinginfo` is an extra stream (`housinginfo`) attached to the file. In this room, the tampered service identified during analysis is named `p1r4t3-s-compass`, which is the TryHackMe answer for that question.

> **Security relevance:** Attackers abuse ADS to hide data, conceal scripts, and store malicious content with reduced visibility, so ADS inspection matters in incident response, digital forensics, and threat hunting.

---

## Task 8 — Scripting

Scripting is the process of writing a series of commands into a text file and executing them together. PowerShell scripts use the `.ps1` extension. Instead of typing the same commands repeatedly, you store them in a script and run the whole sequence at once.

```text
script.ps1
├── Command 1
├── Command 2
├── Command 3
└── Command 4
```

Scripting saves time, reduces human error, automates repetitive tasks, processes large amounts of data, manages multiple systems, and automates security operations.

### PowerShell Across Security Roles

PowerShell serves defensive teams, offensive teams, and administrators alike:

| Role | Typical PowerShell uses |
|------|-------------------------|
| **Blue Team** | Incident response, threat hunting, malware analysis, log analysis, IOC extraction, security monitoring. |
| **Red Team** | System enumeration, remote administration, security testing, and automation (on authorised systems). |
| **System Administration** | Configuration management, integrity checks, network management, remote administration, security policy automation. |

### Invoke-Command — Remote Execution

`Invoke-Command` runs commands or scripts on local or remote computers when the environment is configured and the user is authorised. Its key parameters are `-ComputerName` (the remote host), `-Credential` (authentication), `-ScriptBlock` (inline commands), and `-FilePath` (a script file).

```powershell
Get-Help Invoke-Command -Examples
Invoke-Command -FilePath C:\scripts\test.ps1 -ComputerName Server01
Invoke-Command -ComputerName Server01 -Credential Domain01\User01 -ScriptBlock { Get-Culture }
```

Running `Get-Service` remotely on `RoyalFortune` is done with the following, which is the TryHackMe answer for this task:

```powershell
Invoke-Command -ComputerName RoyalFortune -ScriptBlock { Get-Service }
```

> **Warning:** Remote execution should only be performed on systems you own or are explicitly authorised to manage.

---

## Task 9 — Conclusion

PowerShell is far more than a replacement for `cmd.exe`. Its object-oriented design gives deep, structured visibility into Windows, and its pipeline lets you discover, filter, and analyse system state with precision. A security analyst can enumerate a suspicious host by chaining the cmdlets learned here: check running processes with `Get-Process`, look for rogue services with `Get-Service`, map communication with `Get-NetTCPConnection`, trace a connection to its `OwningProcess`, fingerprint files with `Get-FileHash`, reveal hidden `Get-Item -Stream *` data, list accounts with `Get-LocalUser`, and hunt patterns with `Select-String`. The same capabilities that make PowerShell excellent for administration also make it central to both defensive and offensive security work.

---

## Quick Revision

| Area | Key cmdlets | Purpose |
|------|-------------|---------|
| **Discovery** | `Get-Command`, `Get-Help`, `Get-Alias` | Find commands and learn how to use them. |
| **Modules** | `Find-Module`, `Install-Module` | Extend PowerShell with new cmdlets. |
| **File system** | `Get-ChildItem`, `Set-Location`, `New-Item`, `Remove-Item`, `Copy-Item`, `Move-Item`, `Get-Content` | Browse and manage files and directories. |
| **Pipeline** | `Sort-Object`, `Where-Object`, `Select-Object`, `Select-String` | Sort, filter, select, and search objects. |
| **System / network** | `Get-ComputerInfo`, `Get-LocalUser`, `Get-NetIPConfiguration`, `Get-NetIPAddress` | Enumerate system and network configuration. |
| **Real-time analysis** | `Get-Process`, `Get-Service`, `Get-NetTCPConnection`, `Get-FileHash`, `Get-Item -Stream *` | Investigate live system state. |
| **Remote** | `Invoke-Command` | Run commands on remote hosts. |

**Key idea:** PowerShell passes structured objects (with properties and methods) through the `Verb-Noun` pipeline, so you filter and analyse system state precisely instead of parsing text.

---

## 30-Second Revision

- PowerShell is a cross-platform shell, scripting language, and configuration framework that is **object-oriented**.
- Cmdlets follow the **Verb-Noun** convention (e.g. `Get-Process`, `Set-Location`).
- `Get-Command`, `Get-Help`, and `Get-Alias` discover commands and explain their usage.
- The pipeline `|` passes objects, so properties and methods remain available to later cmdlets.
- `Sort-Object`, `Where-Object`, `Select-Object`, and `Select-String` sort, filter, select, and search.
- Comparison operators: `-eq`, `-ne`, `-gt`, `-ge`, `-lt`, `-le`, and `-like` (wildcards).
- System and network visibility comes from `Get-ComputerInfo`, `Get-LocalUser`, `Get-NetIPConfiguration`, and `Get-NetIPAddress`.
- Live analysis uses `Get-Process`, `Get-Service`, `Get-NetTCPConnection` (`OwningProcess`), `Get-FileHash`, and `Get-Item -Stream *`.
- Scripts use the `.ps1` extension, and `Invoke-Command` runs commands remotely.

---

## Cheat Sheet

| Cmdlet | Purpose |
|--------|---------|
| `Get-Command` | List available cmdlets, functions, aliases, and scripts. |
| `Get-Command -Name Remove*` | Find commands starting with a verb using a wildcard. |
| `Get-Help <Cmdlet> -Examples` | Show usage examples for a cmdlet. |
| `Get-Alias` | List command aliases (e.g. `echo` → `Write-Output`). |
| `Find-Module` / `Install-Module` | Search for and install modules. |
| `Get-ChildItem` | List files and directories (`dir` / `ls`). |
| `Set-Location` | Change the current directory (`cd`). |
| `New-Item -ItemType File\|Directory` | Create a file or directory. |
| `Remove-Item` | Delete a file or directory. |
| `Copy-Item` / `Move-Item` | Copy or move items. |
| `Get-Content` | Read file contents (`type` / `cat`). |
| `Sort-Object` | Sort objects by a property. |
| `Where-Object` | Filter objects by a condition. |
| `Select-Object` | Choose properties or limit results. |
| `Select-String` | Search for patterns inside files (`grep` / `findstr`). |
| `Get-ComputerInfo` | Detailed system information (`systeminfo`). |
| `Get-LocalUser` | List local user accounts. |
| `Get-NetIPConfiguration` / `Get-NetIPAddress` | Network configuration and IP addresses (`ipconfig`). |
| `Get-Process` | List running processes. |
| `Get-Service` | List services and their state. |
| `Get-NetTCPConnection` | List active TCP connections and listening ports. |
| `Get-FileHash` | Compute a file's hash (SHA256 by default). |
| `Get-Item -Stream *` | Inspect NTFS alternate data streams. |
| `Invoke-Command` | Run commands or scripts on remote computers. |

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What makes PowerShell fundamentally different from traditional shells?** | PowerShell is object-oriented. Instead of passing plain text between commands, its pipeline passes structured objects that carry properties and methods, so later cmdlets can work with data directly without text parsing. |
| **Q2. What is the Verb-Noun convention?** | Cmdlets are named as an action followed by the object it acts on — for example `Get-Process`, `Set-Location`, or `Remove-Item`. The predictable structure makes cmdlets easy to guess and discover. |
| **Q3. How do you discover commands and learn how to use them?** | `Get-Command` lists available cmdlets, functions, aliases, and scripts (and supports wildcards like `Get-Command -Name Remove*`), while `Get-Help <Cmdlet> -Examples` shows practical usage. |
| **Q4. What is the difference between Where-Object and Select-Object?** | `Where-Object` filters which objects pass through the pipeline based on a condition, while `Select-Object` chooses which properties are displayed or limits how many objects are returned. |
| **Q5. Why is OwningProcess important in Get-NetTCPConnection output?** | It identifies the process behind a TCP connection, letting an analyst correlate a suspicious connection with `Get-Process` to find the responsible program — key for investigating potential backdoors or malware communication. |
| **Q6. What does Get-FileHash do and why does it matter for security?** | It computes a file's cryptographic hash (SHA256 by default). Comparing hashes over time detects tampering, verifies integrity, and helps compare or identify malware samples. |
| **Q7. What are Alternate Data Streams and how do you inspect them?** | ADS are additional NTFS streams attached to a file that do not appear in its normal contents. They are inspected with `Get-Item -Path <file> -Stream *`; attackers abuse them to hide data or scripts. |
| **Q8. What does Invoke-Command do?** | It runs commands or scripts on local or remote computers using parameters such as `-ComputerName`, `-Credential`, `-ScriptBlock`, and `-FilePath`, enabling authorised remote administration and testing. |

## Final Takeaway

Windows PowerShell turns Windows administration into an object-oriented, pipeline-driven experience. Cmdlets follow a predictable `Verb-Noun` pattern, discovery tools like `Get-Command` and `Get-Help` make the shell self-documenting, and the pipeline passes structured objects that can be sorted, filtered, selected, and searched with precision. That same structure gives security professionals deep visibility into processes, services, network connections, file integrity, hidden data streams, and user accounts — the building blocks of enumeration, incident response, and threat hunting. Combined with scripting (`.ps1`) and remote execution via `Invoke-Command`, PowerShell is an essential tool for administrators, blue teams, and authorised red teams working in Windows environments.
