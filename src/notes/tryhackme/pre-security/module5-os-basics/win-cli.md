## Contents

- [Learning Objectives](#learning-objectives)
- [Storyline](#storyline)
- [Windows Command Prompt (CMD)](#windows-command-prompt-cmd)
- [Why Cybersecurity Professionals Use CMD](#why-cybersecurity-professionals-use-cmd)
- [Windows File System](#windows-file-system)
- [Current Working Directory](#current-working-directory)
- [Command : cd](#command--cd)
- [Command : dir](#command--dir)
- [Hidden Files](#hidden-files)
- [Moving Through Directories](#moving-through-directories)
- [Searching Files](#searching-files)
- [Reading Files](#reading-files)
- [Workflow Used in This Room](#workflow-used-in-this-room)
- [Real World Example](#real-world-example)
- [Important Commands Learned](#important-commands-learned)
- [Linux vs Windows](#linux-vs-windows)
- [System Information Commands](#system-information-commands)
- [Command : whoami](#command--whoami)
- [Purpose](#purpose)
- [Syntax](#syntax)
- [Example](#example)
- [Why is it Important?](#why-is-it-important)
- [Real World Usage](#real-world-usage)
- [Command : hostname](#command--hostname)
- [Why Hostname Matters?](#why-hostname-matters)
- [Command : systeminfo](#command--systeminfo)
- [Output Includes](#output-includes)
- [Information Collected](#information-collected)
- [Why Cybersecurity Uses systeminfo](#why-cybersecurity-uses-systeminfo)
- [Command : ipconfig](#command--ipconfig)
- [Important Fields](#important-fields)
- [IPv4 Address](#ipv4-address)
- [Subnet Mask](#subnet-mask)
- [Default Gateway](#default-gateway)
- [ipconfig /all](#ipconfig-/all)
- [Why Network Information Matters?](#why-network-information-matters)
- [Windows Investigation Workflow](#windows-investigation-workflow)
- [Mini Investigation](#mini-investigation)
- [Windows Networking Basics](#windows-networking-basics)
- [Important Windows Directories](#important-windows-directories)
- [C:\Windows](#c\windows)
- [C:\Users](#c\users)
- [C:\Program Files](#c\program-files)
- [C:\ProgramData](#c\programdata)
- [C:\Temp](#c\temp)
- [Windows vs Linux Commands](#windows-vs-linux-commands)
- [What does whoami do?](#what-does-whoami-do)
- [Difference between hostname and whoami?](#difference-between-hostname-and-whoami)
- [What information does systeminfo provide?](#what-information-does-systeminfo-provide)
- [Why use ipconfig?](#why-use-ipconfig)
- [Difference between ipconfig and ipconfig /all?](#difference-between-ipconfig-and-ipconfig-/all)
- [Environment Variables](#environment-variables)
- [Common Environment Variables](#common-environment-variables)
- [Why Environment Variables Matter](#why-environment-variables-matter)
- [Useful CMD Commands](#useful-cmd-commands)
- [cls](#cls)
- [echo](#echo)
- [tree](#tree)
- [help](#help)
- [exit](#exit)
- [Command Workflow](#command-workflow)
- [Windows CLI Investigation Workflow](#windows-cli-investigation-workflow)
- [Cybersecurity Applications](#cybersecurity-applications)
- [Example Investigation](#example-investigation)
- [Windows CMD Cheat Sheet](#windows-cmd-cheat-sheet)
- [Navigation](#navigation)
- [User Information](#user-information)
- [Operating System](#operating-system)
- [Networking](#networking)
- [Utility Commands](#utility-commands)
- [Important Directories](#important-directories)
- [What is CMD?](#what-is-cmd)
- [Difference between dir and dir /a?](#difference-between-dir-and-dir-/a)
- [What does systeminfo display?](#what-does-systeminfo-display)
- [Why use hostname?](#why-use-hostname)
- [Why is ipconfig important?](#why-is-ipconfig-important)
- [Why are hidden files important?](#why-are-hidden-files-important)
- [Common Mistakes](#common-mistakes)
- [Memory Tricks](#memory-tricks)
- [Quick Revision](#quick-revision)
- [One Shot Revision](#one-shot-revision)
- [TryHackMe Answers](#tryhackme-answers)
- [Final Summary](#final-summary)

> **Room:** Windows CLI Basics
> **Platform:** TryHackMe
> **Difficulty:** Easy
> **Category:** Windows Fundamentals | Command Line | Cybersecurity Basics

---

# Learning Objectives
By the end of this room you will learn how to:

- Navigate Windows using CMD
- Move between directories
- View files and folders
- Show hidden files
- Search files without knowing their location
- Read file contents
- Gather system information
- Understand basic networking information

These commands are used daily by:

- SOC Analysts
- DFIR Analysts
- Malware Analysts
- System Administrators
- Penetration Testers
- Help Desk Engineers

---

# Storyline
Day 2 of your internship.

Your supervisor now wants you to use a Windows machine instead of Linux.

Mission:

 Find files
 Navigate folders
 Read files
 Collect system information

Exactly what real analysts do every day.

---

# Windows Command Prompt (CMD)
CMD is Windows' built-in command line interface.

Instead of clicking folders, you type commands.

Example:

```cmd
dir
cd Desktop
whoami
hostname
systeminfo
ipconfig
```

---

# Why Cybersecurity Professionals Use CMD
GUI is easy.

But GUI cannot always show everything.

Attackers hide files.

Malware hides folders.

Analysts need complete visibility.

CMD provides:

- Faster navigation
- Better control
- Hidden file visibility
- Easy automation
- Script execution

---

# Windows File System
Windows stores data in drives.

Usually:

```text
C:\
```

Inside C drive:

```
C:\
│
├── Windows
├── Program Files
├── Users
├── ProgramData
└── Temp
```

Most user files are inside

```
C:\Users\<username>
```

**Example**

```
C:\Users\Administrator
```

---

# Current Working Directory
Current folder where CMD is working.

**Example**

```
C:\Users\Administrator>
```

Everything you do starts here.

---

# Command : cd
Meaning

```
Change Directory
```

**Purpose**

Move from one folder to another.

**Syntax**

```cmd
cd folder_name
```

**Example**

```cmd
cd Desktop
```

**Result**

```
C:\Users\Administrator\Desktop>
```

---

**Go Back**

```cmd
cd ..
```

**Example**

```
C:\Users\Administrator\Desktop>
↓
cd ..
↓
C:\Users\Administrator>
```

---

Go Directly to Drive

```cmd
C:
```

or

```cmd
D:
```

---

# Command : dir
Meaning

```
Directory Listing
```

**Shows**

- Files
- Folders
- Size
- Date
- Time

**Syntax**

```cmd
dir
```

**Example**

```cmd
C:\Users\Administrator>dir
```

**Output**

```
Desktop
Documents
Downloads
Music
Pictures
Videos
```

---

**Understanding dir Output**

```
<DIR>
```

means

**Directory**

**Example**

```
<DIR> Desktop
```

means

Desktop is a folder.

**Files don't have**

```
<DIR>
```

---

# Hidden Files
Windows hides many important folders.

**Examples**

```
AppData
ProgramData
.logs
.research
```

These are hidden by default.

To see hidden files

```cmd
dir /a
```

**Option**

```
/a
```

means

Show ALL files.

**Including**

- Hidden
- System
- Read-only

---

**Example**

```cmd
dir /a
```

**Output**

```
.logs
AppData
ProgramData
```

---

Why Hidden Files Matter

**Attackers often hide**

- Malware
- Backdoors
- Scripts
- Persistence files

SOC analysts always inspect hidden folders.

---

# Moving Through Directories
Example

```cmd
cd Documents
```

**Current location**

```
C:\Users\Administrator
```

**After command**

```
C:\Users\Administrator\Documents
```

**Return**

```cmd
cd ..
```

---

# Searching Files
Suppose

**You know**

```
task_brief.txt
```

But don't know where it is.

Instead of checking every folder

**Use**

```cmd
dir /s task_brief.txt
```

**Meaning**

```
/s
```

Search recursively.

Entire current directory tree.

---

**Example**

```cmd
dir /s task_brief.txt
```

**Output**

```
Directory of
C:\Users\Administrator\Documents\Notes
task_brief.txt
```

Now you know exactly where it is.

---

# Reading Files
Windows command

```cmd
type filename
```

**Example**

```cmd
type task_brief.txt
```

**Output**

```
Welcome Analyst
Find the hostname
Find the Windows Version
Find the IP Address
```

**Equivalent Linux command**

```bash
cat task_brief.txt
```

---

# Workflow Used in This Room
Find file

↓

```cmd
dir /s task_brief.txt
```

↓

**Navigate**

```cmd
cd path
```

↓

**Verify**

```cmd
dir
```

↓

**Read**

```cmd
type task_brief.txt
```

---

# Real World Example
SOC receives alert

```
Suspicious Script Found
```

Only filename is known

```
payload.ps1
```

**Analyst runs**

```cmd
dir /s payload.ps1
```

**Finds file**

↓

**Reads it**

```cmd
type payload.ps1
```

↓

Starts investigation.

---

# Important Commands Learned
| Command | Purpose |
|----------|----------|
| cd | Change directory |
| cd .. | Go back one folder |
| dir | List files |
| dir /a | Show hidden files |
| dir /s filename | Search file recursively |
| type filename | Read file |

---

# Linux vs Windows 
| Linux | Windows |
|---------|----------|
| pwd | cd |
| ls | dir |
| ls -a | dir /a |
| cd | cd |
| find | dir /s |
| cat | type |

---

# System Information Commands
One of the first tasks during a penetration test or incident response is **enumeration**.

Enumeration means collecting as much information about the target system as possible.

Typical questions include:

- Who am I?
- Which computer is this?
- Which Windows version is installed?
- What is the hostname?
- What is the IP address?
- What hardware is available?

Windows provides built-in commands to answer these questions.

---

# Command : whoami

## Purpose
Displays the username of the currently logged-in account.

---

## Syntax
```cmd
whoami
```

---

## Example
```cmd
C:\Users\Administrator>whoami
```

**Output**

```text
desktop-01\administrator
```

---

## Why is it Important?
**During penetration testing you must know**

- Current user
- Privilege level
- Domain user
- Local account

**Example**

```
NT AUTHORITY\SYSTEM
```

means highest privilege.

---

## Real World Usage
Before running privilege escalation tools

```cmd
whoami
```

**Always verify**

- Current account
- User context

---

# Command : hostname

## Purpose
Displays the computer name.

---

## Syntax
```cmd
hostname
```

---

## Example
```cmd
hostname
```

**Output**

```text
TryHackMe-PC
```

---

## Why Hostname Matters?
**Helps identify**

- Servers
- Workstations
- Domain Computers
- Virtual Machines

SOC analysts use hostnames to identify infected devices.

---

# Command : systeminfo

## Purpose
Displays complete operating system information.

Think of it as

```
About This PC
+
Hardware
+
Windows Version
+
Network
+
Updates
```

all in one command.

---

## Syntax
```cmd
systeminfo
```

---

## Output Includes
```
Host Name
OS Name
OS Version
System Type
Processor
RAM
Domain
BIOS
Hotfixes
Boot Time
Network Adapter
```

---

## Example
```cmd
systeminfo
```

**Output**

```text
Host Name
TRYHACKME
OS Name
Microsoft Windows Server 2019
System Type
x64-based PC
Total Physical Memory
4096 MB
```

---

# Information Collected
```
Computer
↓
Hostname
↓
Operating System
↓
Architecture
↓
Installed RAM
↓
CPU
↓
Updates
↓
Domain
↓
Boot Time
```

---

## Why Cybersecurity Uses systeminfo
Security professionals use it to

**Detect OS Version**

**Find Patch Level**

**Identify Vulnerabilities**

**Match Exploits**

**Verify Architecture**

---

## Example
Suppose

Exploit only works on

```
Windows Server 2016
```

**Run**

```cmd
systeminfo
```

**If output says**

```
Windows Server 2019
```

Different exploit required.

---

# Command : ipconfig

## Purpose
Shows network configuration.

---

## Syntax
```cmd
ipconfig
```

---

## Example
```cmd
ipconfig
```

**Output**

```text
Ethernet Adapter
IPv4 Address
192.168.1.25
Subnet Mask
255.255.255.0
Default Gateway
192.168.1.1
```

---

# Important Fields

## IPv4 Address
Example

```
192.168.1.25
```

Your computer's address.

---

## Subnet Mask
Example

```
255.255.255.0
```

Defines network size.

---

## Default Gateway
Example

```
192.168.1.1
```

Router.

Used to reach the Internet.

---

# ipconfig /all
Shows additional information.

**Syntax**

```cmd
ipconfig /all
```

**Displays**

- MAC Address
- DNS Servers
- DHCP Status
- Lease Time
- Physical Address
- Adapter Information

---

# Why Network Information Matters?
**Attackers collect**

- IP Address
- Gateway
- DNS
- MAC Address

**Defenders verify**

- Network Configuration
- Rogue Devices
- Incorrect Settings

---

# Windows Investigation Workflow
```
Start Investigation
        │
        ▼
whoami
(Current User)
        │
        ▼
hostname
(System Name)
        │
        ▼
systeminfo
(OS Details)
        │
        ▼
ipconfig
(Network Details)
        │
        ▼
Start Analysis
```

---

# Mini Investigation
Question

Who is logged in?

```cmd
whoami
```

↓

**Need Computer Name**

```cmd
hostname
```

↓

**Need Windows Version**

```cmd
systeminfo
```

↓

**Need IP Address**

```cmd
ipconfig
```

Mission Complete.

---

# Real World Example
SOC receives alert

```
Possible Malware
Host Unknown
```

**First commands**

```cmd
whoami
hostname
systeminfo
ipconfig
```

Within seconds analyst knows

 User
 Computer
 Windows Version
 IP Address
 Architecture

---

# Windows Networking Basics
```
Computer
│
├── Hostname
├── IP Address
├── Gateway
├── DNS
└── MAC Address
```

All can be identified using

```cmd
ipconfig /all
```

---

# Important Windows Directories
```
C:\
│
├── Windows
├── Users
├── Program Files
├── ProgramData
├── Temp
└── PerfLogs
```

---

## C:\Windows
Contains Windows operating system files.

---

## C:\Users
Contains user profiles.

**Example**

```
Administrator
John
Alice
```

---

## C:\Program Files
Installed applications.

---

## C:\ProgramData
Stores application data shared by all users.

Often hidden.

---

## C:\Temp
Temporary files.

**Frequently used by**

- Installers
- Malware
- Scripts

---

# Windows vs Linux Commands
| Linux | Windows CMD | Purpose |
|---------|-------------|---------|
| whoami | whoami | Current User |
| hostname | hostname | Computer Name |
| uname -a | systeminfo | OS Information |
| ip addr | ipconfig | Network Information |
| df -h | systeminfo | Storage/System Details |
| cat | type | Read File |
| ls | dir | List Files |
| pwd | cd | Current Directory |

---

### What does whoami do?
Displays the current logged-in user.

---

### Difference between hostname and whoami?
hostname → Computer Name

whoami → Current User

---

### What information does systeminfo provide?
Operating System, RAM, CPU, Architecture, Hotfixes, Boot Time, Domain, Network Adapter.

---

### Why use ipconfig?
To identify IP configuration including IPv4 address, subnet mask, and default gateway.

---

### Difference between ipconfig and ipconfig /all?
| ipconfig | ipconfig /all |
|-----------|---------------|
| Basic network info | Complete adapter details |
| IP Address | IP + MAC + DNS + DHCP + Lease Info |

---

# Environment Variables
Environment Variables are predefined values that Windows uses to locate important files and folders.

Instead of typing the complete path

```
C:\Users\Administrator
```

**Windows allows**

```
%USERPROFILE%
```

---

## Common Environment Variables
| Variable | Points To |
|-----------|-----------|
| `%USERPROFILE%` | Current User Profile |
| `%USERNAME%` | Current Username |
| `%COMPUTERNAME%` | Computer Name |
| `%TEMP%` | Temporary Files |
| `%WINDIR%` | Windows Directory |
| `%SYSTEMROOT%` | Windows Installation Folder |
| `%APPDATA%` | Roaming Application Data |
| `%PROGRAMFILES%` | Installed Applications |

---

## Example
```cmd
echo %USERNAME%
```

**Output**

```text
Administrator
```

---

```cmd
echo %COMPUTERNAME%
```

**Output**

```text
TRYHACKME
```

---

```cmd
echo %USERPROFILE%
```

**Output**

```text
C:\Users\Administrator
```

---

# Why Environment Variables Matter
Cybersecurity professionals use them because

**Scripts become portable**

 Malware often stores files in `%TEMP%`

 Attackers hide payloads in `%APPDATA%`

 Incident responders investigate these folders first

---

# Useful CMD Commands
---

## cls
Clear terminal screen.

```cmd
cls
```

---

## echo
Display text.

```cmd
echo Hello World
```

**Output**

```text
Hello World
```

---

## tree
Displays folder hierarchy.

```cmd
tree
```

**Example**

```
C:\
├── Users
├── Windows
├── Program Files
└── Temp
```

---

## help
Shows available CMD commands.

```cmd
help
```

---

## exit
Close Command Prompt.

```cmd
exit
```

---

# Command Workflow
```
Start CMD
      │
      ▼
whoami
      │
      ▼
hostname
      │
      ▼
systeminfo
      │
      ▼
ipconfig
      │
      ▼
dir
      │
      ▼
type
      │
      ▼
Investigation Complete
```

---

# Windows CLI Investigation Workflow
Imagine you login to a suspicious Windows machine.

**First commands**

```cmd
whoami
```

↓

Who am I?

---

```cmd
hostname
```

↓

Which computer?

---

```cmd
systeminfo
```

↓

**Operating System**

**RAM**

**Architecture**

**Hotfixes**

---

```cmd
ipconfig
```

↓

**Network Information**

---

```cmd
dir
```

↓

**Files**

---

```cmd
dir /a
```

↓

**Hidden Files**

---

```cmd
dir /s secret.txt
```

↓

**Locate File**

---

```cmd
type secret.txt
```

↓

**Read Evidence**

Mission Complete.

---

# Cybersecurity Applications
Windows CMD is heavily used in

 Incident Response
 Malware Analysis
 Digital Forensics
 Threat Hunting
 Blue Team Operations
 Active Directory
 Windows Administration
 Penetration Testing

---

# Example Investigation
SOC receives an alert.

```
Suspicious Script Executed
```

**Only information available**

```
Filename
update.ps1
```

**Investigation**

```cmd
whoami
hostname
systeminfo
ipconfig
dir /s update.ps1
type update.ps1
```

**Within minutes analyst identifies**

- User
- Host
- Windows Version
- Network
- Script Contents

---

# Windows CMD Cheat Sheet

## Navigation
```cmd
cd
```

**Change directory**

---

```cmd
cd ..
```

**Go back**

---

```cmd
dir
```

**List files**

---

```cmd
dir /a
```

**Show hidden files**

---

```cmd
dir /s filename
```

**Search recursively**

---

## Reading Files
```cmd
type filename
```

**Read file**

---

## User Information
```cmd
whoami
```

**Current user**

---

```cmd
hostname
```

**Computer name**

---

## Operating System
```cmd
systeminfo
```

**System information**

---

## Networking
```cmd
ipconfig
```

**IP configuration**

---

```cmd
ipconfig /all
```

**Detailed adapter information**

---

## Utility Commands
```cmd
cls
```

**Clear screen**

---

```cmd
tree
```

**Directory tree**

---

```cmd
echo
```

**Print text**

---

```cmd
help
```

**Show commands**

---

```cmd
exit
```

**Close CMD**

---

# Linux vs Windows
| Linux | Windows CMD |
|---------|-------------|
| pwd | cd |
| ls | dir |
| ls -a | dir /a |
| find | dir /s |
| cat | type |
| whoami | whoami |
| uname -a | systeminfo |
| hostname | hostname |
| ip addr | ipconfig |
| clear | cls |

---

# Important Directories
```
C:\
│
├── Windows
├── Users
├── Program Files
├── ProgramData
├── Temp
└── PerfLogs
```

---

## What is CMD?
Command Prompt is Windows' command-line interpreter used to execute commands and automate administrative tasks.

---

## Difference between dir and dir /a?
| dir | dir /a |
|------|---------|
| Visible files | Visible + Hidden files |

---

## What does systeminfo display?
- Windows Version
- RAM
- CPU
- Boot Time
- Domain
- Hotfixes
- Architecture

---

## Why use hostname?
To identify the computer on a network.

---

## Why is ipconfig important?
**It helps identify**

- IPv4 Address
- Gateway
- DNS
- Network Adapter

---

## Why are hidden files important?
Attackers often store malware or persistence files inside hidden directories.

---

# Common Mistakes
 Using Administrator account for daily tasks.

 Use standard user whenever possible.

---

 Ignoring hidden files.

 Always inspect hidden directories.

---

 Forgetting environment variables.

 They simplify navigation and scripting.

---

 Running unknown batch files.

 Inspect them using `type` before execution.

---

## Memory Tricks

```
whoami
↓
Who?

----------------

hostname
↓
Which Computer?

----------------

systeminfo
↓
Everything

----------------

ipconfig
↓
Network
```

---

```
cd
↓
Change Directory

----------------

dir
↓
Directory

----------------

type
↓
Read File

----------------

whoami
↓
Current User

----------------

hostname
↓
Computer Name

----------------

systeminfo
↓
Everything

----------------

ipconfig
↓
Network
```

---

## Quick Revision

 CMD = Windows Command Line
 cd = Change Directory
 dir = List Files
 dir /a = Show Hidden Files
 dir /s = Search File
 type = Read File
 Hidden Files ≠ Secret Files
 SOC Analysts always inspect hidden files.

---

> **Room:** Windows CLI Basics
> **Platform:** TryHackMe
> **Module:** Windows Fundamentals

---

 whoami → Current User

 hostname → Computer Name

 systeminfo → Complete Windows Information

 ipconfig → Network Configuration

 ipconfig /all → Detailed Network Information

 C:\Windows → OS Files

 C:\Users → User Profiles

 C:\Program Files → Installed Software

 C:\ProgramData → Shared Application Data

 C:\Temp → Temporary Files

---

> **Room:** Windows CLI Basics
> **Platform:** TryHackMe
> **Module:** Windows Fundamentals

---

## One Shot Revision

```
Windows CLI
        │
        ▼
Navigation
│
├── cd
├── dir
├── dir /a
├── dir /s
└── type
        │
        ▼
System Enumeration
│
├── whoami
├── hostname
├── systeminfo
└── ipconfig
        │
        ▼
Environment Variables
│
├── %USERNAME%
├── %USERPROFILE%
├── %TEMP%
├── %APPDATA%
└── %WINDIR%
        │
        ▼
Investigation
↓
User
↓
Host
↓
OS
↓
Network
↓
Files
↓
Evidence
↓
Report
```

---

## TryHackMe Answers

| Question | Answer |
|----------|--------|
| Hidden file location | `.secret` / hidden folder (lab specific) |
| Hostname | TRYHACKME *(or lab hostname shown by `hostname`)* |
| Current User | Administrator |
| Windows Version | Windows Server 2019 |
| IP Address | Use `ipconfig` output from the lab |
| Flag | *(Use the exact flag shown in your room after completing the tasks.)* |

> **Note:** Some values (hostname, IP address, final flag) may vary depending on the TryHackMe instance. Record the values shown in your own VM.

---

## Final Summary

By completing **Windows CLI Basics**, you learned how to:

- Navigate Windows using CMD.
- List and search files and folders.
- Display hidden files.
- Read file contents.
- Identify the current user and computer.
- Collect operating system information.
- Gather network configuration.
- Use environment variables.
- Perform basic Windows system enumeration.

These skills are essential for:

- SOC Analysts
- Incident Responders
- Malware Analysts
- System Administrators
- Penetration Testers
- Windows Cloud Administrators

---
