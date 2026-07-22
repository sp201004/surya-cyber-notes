| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Windows / Bonus Revision |
| **Difficulty** | Beginner |
| **Time** | ~15 Minutes |
| **Module** | Windows and AD Fundamentals |

---

## Objective

This Mystery Chest is a **bonus revision vault** for the entire Windows and AD Fundamentals module. It consolidates the most-used commands, key paths, the NTFS permission model, built-in security features, and Active Directory essentials into one place so you can revise fast before a lab, an exam, or an interview.

Use it as a lookup reference — everything here was covered across the four rooms: Windows Fundamentals, Windows utilities and the command line, core Windows security, and Active Directory basics.

---

## Command Reference — CMD & PowerShell

| Command | Purpose |
|---------|---------|
| `hostname` | Show the computer's hostname. |
| `whoami` | Show the current user. |
| `ipconfig` | Show network configuration. |
| `ipconfig /all` | Show detailed network configuration. |
| `netstat` | List active network connections. |
| `netstat -ano` | List connections with owning process IDs. |
| `net help` | Show help for the `net` command. |
| `net help user` | Show help for the `net user` command. |
| `cls` | Clear the Command Prompt screen. |
| `command /?` | Show help for a given command. |

A few of the most-used utilities in this module:

```cmd
hostname
whoami
ipconfig /all
netstat -ano
```

Two useful PowerShell commands for managing Active Directory users:

```powershell
Set-ADAccountPassword sophie -Reset -NewPassword (Read-Host -AsSecureString -Prompt 'New Password') -Verbose
Set-ADUser -ChangePasswordAtLogon $true -Identity sophie -Verbose
```

Force an immediate Group Policy refresh:

```powershell
gpupdate /force
```

---

## Management Consoles & Tools

| Tool / Command | Purpose |
|----------------|---------|
| `msconfig` | System Configuration — startup, boot, and service management. |
| `UserAccountControlSettings.exe` | Change User Account Control (UAC) settings. |
| `compmgmt.msc` | Computer Management — system tools, storage, services. |
| `lusrmgr.msc` | Local Users and Groups Management. |
| `perfmon` | Performance Monitor. |
| `msinfo32.exe` | System Information. |
| `resmon.exe` | Resource Monitor (CPU, memory, disk, network). |
| `cmd.exe` | Command Prompt. |
| `regedit` / `regedt32.exe` | Registry Editor. |
| `WF.msc` | Windows Defender Firewall with Advanced Security. |
| `control /name Microsoft.WindowsUpdate` | Open Windows Update settings. |
| `Ctrl + Shift + Esc` | Open Task Manager. |

> **Security relevance:** Most of these are legitimate built-in tools. Attackers using Living Off The Land techniques abuse exactly these utilities because they are trusted and already present on every Windows host.

---

## Important Windows Paths & Environment Variables

| Path / Variable | Contents |
|-----------------|----------|
| `C:\Windows` | Default Windows installation directory. |
| `%windir%` | Environment variable referencing the Windows directory. |
| `C:\Windows\System32` | Critical system directory holding core components and utilities. |
| `%windir%\System32` | Environment-variable-based System32 path. |
| `C:\Users` | Default location containing user profiles. |
| `C:\Users\<username>` | An individual user's profile directory. |
| `%SystemRoot%\system32\cmd.exe` | The `ComSpec` command interpreter value. |

The Windows Registry is organised into five main hives:

```text
HKEY_CLASSES_ROOT
HKEY_CURRENT_USER
HKEY_LOCAL_MACHINE
HKEY_USERS
HKEY_CURRENT_CONFIG
```

---

## NTFS Permissions

NTFS (New Technology File System) is the primary modern Windows file system. It is a journaling file system, supports files larger than 4 GB, and supports permissions, compression, and EFS encryption.

| Permission | Meaning |
|------------|---------|
| Full Control | Complete control over the file or folder. |
| Modify | Read, write, and delete. |
| Read & Execute | Read and run the file. |
| List Folder Contents | View folder contents. |
| Read | View the file or folder. |
| Write | Add data to the file or folder. |

View permissions through `Right-click > Properties > Security`.

> **Security relevance:** Incorrect or overly permissive NTFS permissions are a classic route to privilege escalation. Alternate Data Streams (ADS) are legitimate NTFS functionality but can be abused by malware to conceal data, and Windows uses ADS metadata to mark files downloaded from the internet.

---

## Windows Security Features

| Feature | Purpose |
|---------|---------|
| Windows Update | Installs security patches and updates (Patch Tuesday = second Tuesday each month). |
| Windows Security | Central security management interface. |
| Microsoft Defender Antivirus | Malware and virus protection. |
| Real-Time Protection | Continuously monitors for threats. |
| Controlled Folder Access | Helps protect files against ransomware. |
| SmartScreen | Protects against suspicious apps, files, phishing, and downloads. |
| Exploit Protection | DEP, CFG, and ASLR make exploitation harder. |
| Core Isolation / Memory Integrity | Virtualization-based protection against code injection. |
| TPM | Trusted Platform Module — hardware-backed cryptographic security. |
| BitLocker | Drive encryption; hardware-backed when paired with a TPM. |
| VSS | Volume Shadow Copy Service — point-in-time snapshots for recovery. |

Defender offers three scan types:

| Scan | Coverage |
|------|----------|
| Quick Scan | Common malware locations. |
| Full Scan | All files and running programs. |
| Custom Scan | Selected locations only. |

The Windows Firewall applies one of three profiles depending on network trust:

| Profile | Network Type |
|---------|--------------|
| Domain | Domain-connected corporate network. |
| Private | Trusted home or work network. |
| Public | Untrusted public networks (e.g. airport Wi-Fi). |

> **Security relevance:** On a system without a compatible TPM, BitLocker can store its startup key on removable media. Ransomware often deletes shadow copies before encrypting files, so offline or off-site backups are the reliable defence rather than local restore points alone.

---

## Active Directory Essentials

| Term | Meaning |
|------|---------|
| **AD** | Active Directory — centralized identity, computer, and policy management. |
| **AD DS** | Active Directory Domain Services. |
| **DC** | Domain Controller — authenticates users and computers, hosts AD DS, enforces policy. |
| **OU** | Organizational Unit — organises objects, allows GPO application, supports delegation. |
| **GPO** | Group Policy Object — centrally enforces configuration for computers and users. |
| **SYSVOL** | Network share used to distribute Group Policy. |
| **Delegation** | Granting specific administrative privileges without full Domain Admin rights. |
| **Tree** | Domains sharing a common namespace. |
| **Forest** | A collection of one or more trees. |
| **Trust** | Relationship enabling cross-domain authentication. |

Domain user login uses the `DOMAIN\username` format:

```text
THM\phillip
THM\sophie
THM\Mark
```

A GPO splits into a Computer Configuration and a User Configuration, and is distributed to clients through `SYSVOL`.

The AD hierarchy, from the top down:

```text
FOREST
│
├── TREE 1
│   │
│   ├── Root Domain
│   ├── Child Domain
│   └── Child Domain
│
└── TREE 2
    │
    ├── Root Domain
    ├── Child Domain
    └── Child Domain
```

> **Security relevance:** A trust relationship enables authentication across domains, but it does not automatically grant access to all resources — permissions still control what a user can actually reach.

---

## Authentication — Kerberos vs NetNTLM

| Aspect | Kerberos | NetNTLM |
|--------|----------|---------|
| Type | Modern ticket-based authentication. | Legacy challenge-response authentication. |
| Status | Preferred in modern Windows domains. | Kept mainly for legacy compatibility. |
| Credentials | Uses TGTs and service tickets. | Password itself is never transmitted. |

Key Kerberos components:

| Term | Meaning |
|------|---------|
| **KDC** | Key Distribution Center — issues Kerberos tickets. |
| **TGT** | Ticket Granting Ticket — used to request additional tickets. |
| **TGS** | Service ticket — used to access a specific service. |
| **SPN** | Service Principal Name — identifies a service. |

The Kerberos flow, from first request to service access:

```text
Client
  │  request TGT
  ▼
KDC ── issues TGT ──► Client
                        │  request TGS
                        ▼
                      KDC ── issues TGS ──► Client
                                              │  present TGS
                                              ▼
                                           Service
```

---

## Important Abbreviations

| Abbreviation | Full Form |
|--------------|-----------|
| GUI | Graphical User Interface. |
| RDP | Remote Desktop Protocol. |
| NTFS | New Technology File System. |
| UAC | User Account Control. |
| ADS | Alternate Data Streams. |
| EFS | Encrypting File System. |
| MOTW | Mark of the Web. |
| PoLP | Principle of Least Privilege. |
| CFG | Control Flow Guard. |
| DEP | Data Execution Prevention. |
| ASLR | Address Space Layout Randomization. |
| TPM | Trusted Platform Module. |
| VSS | Volume Shadow Copy Service. |

---

## Quick Revision

| Concept | Recall |
|---------|--------|
| Identity commands | `hostname`, `whoami` |
| Network commands | `ipconfig /all`, `netstat -ano` |
| Consoles | `compmgmt.msc`, `lusrmgr.msc`, `msinfo32.exe`, `resmon.exe` |
| File system | NTFS — journaling, >4 GB files, permissions, EFS, ADS |
| Defence layers | Defender, Firewall, SmartScreen, TPM, BitLocker, VSS |
| AD building blocks | AD DS, DC, OU, GPO, SYSVOL |
| Authentication | Kerberos (tickets) vs NetNTLM (challenge-response) |
| Group Policy refresh | `gpupdate /force` |

**Key idea:** Know the built-in tools, respect the principle of least privilege, and understand how AD ties identity, policy, and authentication together — that covers most day-to-day Windows work.

---

## 30-Second Revision

- Confirm context with `whoami` and `hostname`, inspect the network with `ipconfig /all` and `netstat -ano`.
- NTFS is a journaling file system supporting large files, permissions, compression, EFS, and Alternate Data Streams.
- Follow the Principle of Least Privilege; UAC guards against unauthorized privileged changes.
- Windows security is layered: Updates, Defender, Firewall profiles, SmartScreen, Exploit Protection, TPM, BitLocker, and VSS.
- Active Directory centralises identity; Domain Controllers authenticate, OUs organise, and GPOs enforce configuration through SYSVOL.
- Kerberos (ticket-based, TGT/TGS/KDC) is preferred; NetNTLM (challenge-response) remains for legacy compatibility.
- A Forest holds trees, a Tree holds domains sharing a namespace, and trusts enable — but do not guarantee — cross-domain access.

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What does the Principle of Least Privilege mean on Windows?** | Users and accounts should receive only the permissions required for their tasks, reducing the impact of a compromised account. |
| **Q2. What is the difference between Kerberos and NetNTLM?** | Kerberos is modern ticket-based authentication using TGTs and service tickets, while NetNTLM is legacy challenge-response authentication kept for compatibility. Neither transmits the password directly. |
| **Q3. Which firewall profile applies on untrusted airport Wi-Fi?** | The Public profile, which applies stricter rules for untrusted networks. |
| **Q4. What is a Domain Controller responsible for?** | It hosts AD DS, authenticates users and computers, manages domain objects, and enforces domain policies. |
| **Q5. Why do offline backups matter against ransomware?** | Ransomware often deletes Volume Shadow Copies before encrypting files, so local restore points may be gone — offline or off-site backups are the reliable recovery path. |

## Final Takeaway

The Mystery Chest is your one-page memory aid for **Windows and AD Fundamentals**. Skim it before any Windows task: the commands, paths, **permission model**, **security features**, and **Active Directory** concepts here cover the vast majority of what you will meet on a Windows machine or in a **domain environment**, whether you are administering, defending, or investigating.
