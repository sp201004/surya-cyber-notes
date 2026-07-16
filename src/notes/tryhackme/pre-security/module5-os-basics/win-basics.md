## Contents

- [Configuring & Securing Windows](#configuring-&-securing-windows)
- [Windows Update](#windows-update)
- [Purpose](#purpose)
- [Location](#location)
- [Update Process](#update-process)
- [Types of Updates](#types-of-updates)
- [Security Updates](#security-updates)
- [Feature Updates](#feature-updates)
- [Quality Updates](#quality-updates)
- [Driver Updates](#driver-updates)
- [Why Updates Matter](#why-updates-matter)
- [Updating Applications](#updating-applications)
- [Built-in Applications](#built-in-applications)
- [Third-party Applications](#third-party-applications)
- [Common Update Methods](#common-update-methods)
- [Installing Applications](#installing-applications)
- [Microsoft Store](#microsoft-store)
- [Internet Installation](#internet-installation)
- [Installation Steps](#installation-steps)
- [Lab Installation](#lab-installation)
- [Installation Flag](#installation-flag)
- [Uninstalling Applications](#uninstalling-applications)
- [Methods](#methods)
- [Windows Settings](#windows-settings)
- [Control Panel](#control-panel)
- [Application Uninstaller](#application-uninstaller)
- [Access](#access)
- [Categories](#categories)
- [Important Sections](#important-sections)
- [System](#system)
- [Devices](#devices)
- [Apps](#apps)
- [Accounts](#accounts)
- [Network](#network)
- [Update & Security](#update-&-security)
- [Lab Question](#lab-question)
- [Difference](#difference)
- [Task Manager](#task-manager)
- [Open](#open)
- [Tabs](#tabs)
- [Processes](#processes)
- [Performance](#performance)
- [Users](#users)
- [Details](#details)
- [Services](#services)
- [Why Task Manager?](#why-task-manager)
- [Windows Security](#windows-security)
- [Main Components](#main-components)
- [Virus & Threat Protection](#virus-&-threat-protection)
- [Scan Types](#scan-types)
- [Quick Scan](#quick-scan)
- [Full Scan](#full-scan)
- [Custom Scan](#custom-scan)
- [Offline Scan](#offline-scan)
- [Custom Scan (Lab)](#custom-scan-lab)
- [Test Malware](#test-malware)
- [EICAR File](#eicar-file)
- [Lab Answer](#lab-answer)
- [Windows Defender Firewall](#windows-defender-firewall)
- [Network Profiles](#network-profiles)
- [Domain](#domain)
- [Private](#private)
- [Public](#public)
- [Firewall Components](#firewall-components)
- [Inbound Rules](#inbound-rules)
- [Outbound Rules](#outbound-rules)
- [Allowed Applications](#allowed-applications)
- [Best Practice](#best-practice)
- [Important Lab Answers](#important-lab-answers)
- [Windows Security Flow](#windows-security-flow)
- [Common Windows Administrative Tools](#common-windows-administrative-tools)
- [What is Windows Update?](#what-is-windows-update)
- [Difference between Settings and Control Panel?](#difference-between-settings-and-control-panel)
- [What is Task Manager?](#what-is-task-manager)
- [What is Windows Defender?](#what-is-windows-defender)
- [What is Windows Defender Firewall?](#what-is-windows-defender-firewall)
- [What is EICAR?](#what-is-eicar)
- [Common Mistakes](#common-mistakes)
- [Full Room Mind Map](#full-room-mind-map)
- [Final 1-Minute Revision](#final-1-minute-revision)
- [Room Completed](#room-completed)
- [Quick Revision](#quick-revision)

> Covers Windows Updates, Application Management, Windows Settings, Control Panel, Task Manager, Windows Security, Windows Defender Firewall and Final Revision.

---

# Configuring & Securing Windows
**Windows provides built-in tools to**

- Keep the OS updated
- Install/Remove software
- Configure system settings
- Monitor performance
- Protect against malware
- Secure the network

```
Windows Administration
│
├── Windows Update
├── Applications
├── Windows Settings
├── Control Panel
├── Task Manager
├── Windows Security
└── Windows Defender Firewall
```

---

# Windows Update

## Purpose
**Windows Update downloads and installs**

- Security patches
- Bug fixes
- Performance improvements
- Feature updates
- Driver updates

Keeping Windows updated reduces vulnerabilities.

---

## Location
```
Settings
↓
Update & Security
↓
Windows Update
```

---

## Update Process
```
Check for Updates
↓
Download
↓
Install
↓
Restart
↓
Updated System
```

---

## Types of Updates

### Security Updates
Fix vulnerabilities.

---

### Feature Updates
Introduce new Windows features.

---

### Quality Updates
Fix bugs and improve stability.

---

### Driver Updates
Update hardware drivers.

---

## Why Updates Matter
 Fix security flaws

**Improve stability**

**Increase performance**

**Add new features**

**Improve compatibility**

---

# Updating Applications
Windows applications update differently depending on where they were installed.

---

## Built-in Applications
Usually update automatically.

**Examples**

- Calculator
- Paint
- Notepad

---

## Third-party Applications
**Usually update using**

- Built-in updater
- Download new installer
- Microsoft Store

---

## Common Update Methods
```
Application
↓
Check Updates
↓
Download
↓
Install
↓
Restart (if required)
```

---

# Installing Applications
Applications can be installed from multiple sources.

---

## Microsoft Store
Safest installation method.

**Advantages**

- Trusted applications
- Automatic updates
- Easy installation

---

## Internet Installation
Applications downloaded directly from vendors.

**Common installer formats**

```
.exe

.msi
```

---

## Installation Steps
```
Download Installer
↓
Run Installer
↓
Accept License
↓
Choose Location
↓
Install
↓
Finish
```

---

## Lab Installation
Installer Used

```
TryHatMeWelcome
```

---

## Installation Flag
```
THM{your_first_day!}
```

---

# Uninstalling Applications
Applications can be removed using multiple methods.

---

## Methods

### Windows Settings
```
Settings
↓
Apps
↓
Apps & Features
↓
Select Application
↓
Uninstall
```

---

### Control Panel
```
Control Panel
↓
Programs
↓
Uninstall Program
```

---

### Application Uninstaller
Many programs provide their own uninstall wizard.

---

# Windows Settings
Windows Settings is the modern configuration interface.

---

## Access
```
Windows + I
or
Start Menu
↓
Settings
```

---

## Categories
```
Settings
│
├── System
├── Devices
├── Network & Internet
├── Personalization
├── Apps
├── Accounts
├── Time & Language
├── Gaming
├── Ease of Access
├── Privacy
└── Update & Security
```

---

## Important Sections

### System
Display

**Sound**

**Notifications**

**Power**

**Storage**

---

### Devices
Bluetooth

**Printers**

**Mouse**

**USB**

---

### Apps
Install

**Modify**

**Uninstall**

**Default Apps**

---

### Accounts
Users

**Passwords**

**Sign-in options**

---

### Network
Wi-Fi

**Ethernet**

**VPN**

**Proxy**

---

### Update & Security
Windows Update

**Recovery**

**Backup**

**Windows Security**

---

## Lab Question
Country / Region

```
United States
```

---

# Control Panel
Control Panel is the legacy Windows administration tool.

Although Settings replaces many options, Control Panel is still heavily used.

---

## Access
```
Start
↓
Control Panel
```

---

## Categories
```
Control Panel
│
├── System and Security
├── Network and Internet
├── Hardware and Sound
├── Programs
├── User Accounts
├── Appearance
├── Clock and Region
└── Ease of Access
```

---

## Difference
| Windows Settings | Control Panel |
|------------------|--------------|
| Modern | Legacy |
| Easier | More Advanced |
| Windows 10/11 | Older Windows |

---

# Task Manager
Task Manager monitors running applications and system resources.

---

## Open
```
Ctrl + Shift + Esc
```

or

```
Ctrl + Alt + Delete
↓
Task Manager
```

---

## Tabs

### Processes
**Shows**

- Running apps
- Background processes

---

### Performance
**Displays**

- CPU
- Memory
- Disk
- Network
- GPU

---

### Users
Shows logged-in users.

**Lab Answer**

```
Administrator
```

---

### Details
Advanced process information.

**Includes**

- PID
- Priority
- Memory Usage

---

### Services
Displays Windows services.

**Can**

- Start
- Stop
- Restart

---

## Why Task Manager?
Useful for

**Ending frozen apps**

**Monitoring CPU**

**Monitoring RAM**

**Detecting malware**

**Viewing startup impact**

---

# Windows Security
Windows Security is Microsoft's built-in security suite.

---

## Main Components
```
Windows Security
│
├── Virus & Threat Protection
├── Firewall & Network Protection
├── App & Browser Control
└── Device Security
```

---

## Virus & Threat Protection
**Protects against**

- Malware
- Viruses
- Trojans
- Worms
- Ransomware

---

## Scan Types

### Quick Scan
Scans common malware locations.

---

### Full Scan
Scans entire computer.

---

### Custom Scan
Scans selected folders.

---

### Offline Scan
Runs before Windows boots.

Useful against persistent malware.

---

# Custom Scan (Lab)
Steps

```
Windows Security
↓
Virus & Threat Protection
↓
Scan Options
↓
Custom Scan
↓
Select Folder
↓
TryHackMe Onboarding
```

---

## Test Malware
Windows Security detects

```
Virus:DOS/EICAR_Test_File
```

This is **NOT** a real virus.

It is a safe test file used to verify antivirus software.

---

## EICAR File
Purpose

Test antivirus detection.

Used worldwide by security professionals.

---

## Lab Answer
Affected file

```
tryhatmemaldoc.txt
```

---

# Windows Defender Firewall
Firewall controls incoming and outgoing network traffic.

---

## Purpose
**Protects against**

- Unauthorized access
- Network attacks
- Malicious connections

---

## Network Profiles

### Domain
Organization network.

---

### Private
Trusted network.

**Example**

**Home Wi-Fi**

---

### Public
Untrusted network.

**Example**

**Airport Wi-Fi**

**Coffee Shop**

**Hotel**

---

## Firewall Components
```
Firewall
│
├── Inbound Rules
├── Outbound Rules
├── Connection Security Rules
├── Monitoring
└── Allowed Applications
```

---

## Inbound Rules
Control incoming traffic.

---

## Outbound Rules
Control outgoing traffic.

---

## Allowed Applications
Applications allowed through firewall.

---

## Best Practice
Never disable Windows Defender Firewall unless necessary.

---

# Important Lab Answers
| Question | Answer |
|----------|--------|
| Installation Flag | THM{your_first_day!} |
| Region | United States |
| Logged-in User | Administrator |
| Malware File | tryhatmemaldoc.txt |

---

# Windows Security Flow
```
Internet
↓
Firewall
↓
Windows Defender
↓
Virus Scan
↓
Threat Detection
↓
Quarantine
↓
Safe System
```

---

# Common Windows Administrative Tools
```
Task Manager
↓
Control Panel
↓
Windows Settings
↓
Windows Security
↓
Windows Update
↓
File Explorer
```

---

## What is Windows Update?
Windows Update downloads and installs security patches, bug fixes, drivers, and feature updates.

---

## Difference between Settings and Control Panel?
Settings is the modern management interface.

Control Panel is the legacy administration interface.

---

## What is Task Manager?
A utility used to monitor processes, system performance, users, and services.

---

## What is Windows Defender?
Microsoft's built-in antivirus solution.

---

## What is Windows Defender Firewall?
A firewall that filters network traffic and blocks unauthorized access.

---

## What is EICAR?
A harmless antivirus test file used to verify malware detection.

---

# Common Mistakes
 Never disable antivirus permanently.

 Never disable firewall without reason.

 Avoid installing software from unknown websites.

 Do not ignore Windows Updates.

 Do not run everything as Administrator.

---

# Full Room Mind Map
```
Windows Basics
│
├── Windows GUI
├── Authentication
│      ├── Guest
│      ├── Standard
│      └── Administrator
├── Desktop
│      ├── Icons
│      ├── Taskbar
│      └── Start Menu
├── Built-in Apps
│      ├── Calculator
│      ├── Notepad
│      ├── Paint
│      └── File Explorer
├── System Information
├── File Management
├── Windows Update
├── Applications
├── Settings
├── Control Panel
├── Task Manager
├── Windows Security
│      ├── Virus Protection
│      ├── Firewall
│      ├── Device Security
│      └── Browser Protection
└── Windows Defender Firewall
```

---

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

# Room Completed
After completing **Windows Basics**, you now understand:

- Windows interface navigation
- User authentication
- Desktop and taskbar usage
- File and folder management
- System information
- Windows Settings
- Control Panel
- Installing and uninstalling applications
- Windows Update
- Task Manager
- Windows Security
- Windows Defender Firewall

These concepts form the foundation for Windows system administration, SOC analysis, malware analysis, Active Directory, and penetration testing.

```
Next Recommended Rooms

Windows CLI Basics
        ↓
Linux CLI Basics
        ↓
Windows Fundamentals
        ↓
Windows Privilege Escalation
        ↓
Active Directory Basics
```

## Quick Revision

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
