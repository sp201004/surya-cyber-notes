## Contents

- [Operating Systems: Introduction](#operating-systems-introduction)
- [Final Revision & Interview Guide](#final-revision-&-interview-guide)
- [Windows Basics](#windows-basics)
- [Final 1-Minute Revision](#final-1-minute-revision)
- [# Linux CLI Basics](##-linux-cli-basics)
- [# Windows CLI Basics](##-windows-cli-basics)
- [Unknown](#unknown)
- [Quick Revision](#quick-revision)
- [One Shot Revision](#one-shot-revision)
- [TryHackMe Answers](#tryhackme-answers)

> **Bonus Notes**: This is a centralized collection of all quick revision sections, memory tricks, and THM answers from the entire Operating Systems module.

## Operating Systems: Introduction 

## Operating Systems: Introduction 

# Final Revision & Interview Guide
---

## Windows Basics 

# Final 1-Minute Revision
- Windows is a GUI-based operating system.
- Authentication verifies user identity.
- Guest < Standard < Administrator.
- Desktop is the primary workspace.
- Start Menu launches apps and settings.
- File Explorer manages files and folders.
- Windows Update installs security patches.
- Applications can be installed via Microsoft Store or `.exe`/`.msi` installers.
- Windows Settings is the modern configuration tool.
- Control Panel is the legacy administration interface.
- Task Manager monitors processes and system performance.
- Windows Security protects against malware.
- Windows Defender Firewall filters network traffic.
- EICAR is a safe antivirus test file.

---

---

## # Linux CLI Basics 

## # Windows CLI Basics 

## # Windows CLI Basics 

## # Windows CLI Basics 

## Unknown

## Quick Revision

```
Operating System

↓

Invisible Manager

↓

User
↓

Applications
↓

Operating System
↓

Hardware

Kernel Space → Hardware Access

User Space → Applications

Applications
↓

System Calls
↓

Kernel

OS Responsibilities

✔ Process

✔ Memory

✔ File

✔ User

✔ Device

✔ Security
```

---

---

```
Windows Administration

│

├── Windows Update

├── Install Apps

├── Remove Apps

├── Windows Settings

├── Control Panel

├── Task Manager

├── Windows Security

├── Virus Scan

├── Windows Defender Firewall

└── Secure Windows
```

---

 CMD = Windows Command Line

 cd = Change Directory

 dir = List Files

 dir /a = Show Hidden Files

 dir /s = Search File

 type = Read File

 Hidden Files ≠ Secret Files

 SOC Analysts always inspect hidden files.

---

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

---

```
Operating System
        │
        ▼
Controls Hardware
        │
        ▼
Stores Sensitive Data
        │
        ▼
Needs Security
        │
        ▼
CIA Triad
│
├── Confidentiality
├── Integrity
└── Availability
        │
        ▼
Weak Passwords
Weak Permissions
Malware
        │
        ▼
SSH Login
whoami
ls
cat
history
su
        │
        ▼
Root Access
```

---

---

## One Shot Revision

```
Operating System

↓

GUI
CLI

↓

Desktop

Windows

macOS

Linux

↓

Server

Windows Server

Ubuntu Server

Red Hat

↓

Mobile

Android

iOS

↓

Embedded

OpenWRT

Ubuntu Core

↓

Cloud

Amazon Linux

Ubuntu Server

↓

Container

Alpine

Flatcar

↓

Kernel

↓

Hardware
```

---

```
Operating System

↓

Bridge Between

User

↓

Applications

↓

Kernel

↓

Hardware

Responsibilities

↓

✔ Process

✔ Memory

✔ Files

✔ Users

✔ Devices

✔ Security

Interfaces

↓

GUI

CLI

Operating Systems

↓

Desktop

↓

Windows

macOS

Linux

↓

Server

↓

Ubuntu

Red Hat

Windows Server

↓

Mobile

↓

Android

iOS

↓

Embedded

↓

OpenWRT

FreeRTOS

↓

Cloud

↓

Amazon Linux

Ubuntu Server

↓

Containers

↓

Alpine

Flatcar

```

---

```
pwd

↓

Current Directory

------------------

ls

↓

List Files

------------------

ls -l

↓

Detailed List

------------------

ls -al

↓

Hidden Files

------------------

cd

↓

Change Directory

------------------

cd ..

↓

Back

------------------

find

↓

Search

------------------

cat

↓

Read File

------------------

whoami

↓

Current User

------------------

uname

↓

OS Name

------------------

uname -a

↓

Kernel Info

------------------

df -h

↓

Disk Usage

------------------

/etc

↓

Configurations

------------------

os-release

↓

Linux Version
```

---

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

| Task | Answer |
|-------|--------|
| Kernel access | Kernel Space |
| Authentication & Permissions | User Management |
| Ubuntu MATE Version | 1.26.2 |
| RAM | 1.9 GiB |
| Filesystem | ext4 |
| User Directories | 3 |
| Flag | THM{new_pc_for_free!} |

---

---

---

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

---
