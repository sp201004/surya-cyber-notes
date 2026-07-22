| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Windows / Security |
| **Difficulty** | Beginner |
| **Time** | ~40 Minutes |
| **Module** | Windows and AD Fundamentals |

---

## Objective

Windows Fundamentals 3 is a tour of the security features baked into Microsoft Windows. Where the first two rooms covered the desktop, file system, and system administration tools, this room focuses entirely on how Windows defends itself.

By the end of this room you will be able to:

- Explain how Windows Update and Patch Tuesday keep systems protected
- Navigate Windows Security and read its status indicators
- Use Microsoft Defender Antivirus scan options and protection settings
- Understand the firewall profiles, SmartScreen, and exploit mitigations
- Describe hardware-backed protections like TPM, BitLocker, and Core Isolation
- Recognise how VSS, ransomware, and Living Off The Land fit into Defense in Depth

---

## Task 1 — Introduction

This room focuses on the built-in security features available in Microsoft Windows. The earlier rooms in the module laid the groundwork:

| Room | Focus areas |
|------|-------------|
| **Windows Fundamentals 1** | Windows Desktop, File System, User Account Control (UAC), Control Panel, Windows Settings, Task Manager |
| **Windows Fundamentals 2** | System Configuration, Advanced System Settings, Computer Management, System Information, Resource Monitor, Command Prompt, Registry Editor |
| **Windows Fundamentals 3** | Windows security features (this room) |

The technologies covered here work together to protect the operating system, applications, user files, network connections, credentials, storage devices, and overall system integrity.

> **Tip:** Start the attached lab machine before working through the tasks — several answers come directly from inspecting the VM's Windows Security settings.

---

## Task 2 — Windows Updates

### What is Windows Update?

**Windows Update** is a Microsoft service that delivers security updates, vulnerability patches, bug fixes, feature enhancements, driver updates, and Microsoft Defender updates.

Keeping Windows updated matters because vulnerabilities discovered in the operating system can be exploited by attackers. Regular patching reduces the attack surface and protects against known vulnerabilities.

### Patch Tuesday

Microsoft traditionally releases many of its security updates on the **second Tuesday of every month**, commonly known as **Patch Tuesday**. Critical updates do not always wait for that date — if a vulnerability is urgent, Microsoft may release a fix immediately through Windows Update.

### Accessing Windows Update

Windows Update is normally reached through **Settings → Update & Security → Windows Update**, and can also be opened from the Run dialog or Command Prompt:

```cmd
control /name Microsoft.WindowsUpdate
```

### Managed Updates in the Enterprise

In corporate environments you may see the message "Some settings are managed by your organization", meaning update behaviour is controlled centrally. These policies are typically enforced with:

| Mechanism | Role |
|-----------|------|
| **Group Policy** | Central Windows configuration for domain-joined machines. |
| **Mobile Device Management (MDM)** | Manages devices, including update policies. |
| **Enterprise management solutions** | Broader deployment and compliance control. |

Administrators can control when updates install, whether automatic updates are enabled, restart behaviour, and deployment policies.

### Windows Update Options

| Option | Purpose |
|--------|---------|
| **Check for Updates** | Manually search for available updates. |
| **Pause Updates** | Temporarily prevent updates from installing. |
| **Change Active Hours** | Define working hours so Windows avoids restarting then. |
| **View Update History** | Show previously installed updates for troubleshooting and patch verification. |
| **Advanced Options** | Additional Windows Update controls. |

Some updates require a restart, offering options such as restart now, schedule the restart, or restart outside active hours. Modern Windows makes it hard to permanently ignore critical updates — they may be postponed, but important patches are eventually applied to maintain security.

> **Security relevance:** Unpatched systems are a major risk. Attackers routinely exploit known vulnerabilities, outdated software, and missing patches. Regular patching means fewer vulnerabilities, a smaller attack surface, and better security overall.

**TryHackMe answer:** The two definition updates in the attached VM were installed on **5/3/2021**.

---

## Task 3 — Windows Security

### What is Windows Security?

**Windows Security** is the central interface for managing built-in Windows protections. It gives a single view of the security status, protection mechanisms, device health, and recommended actions.

### Protection Areas

| Area | What it protects |
|------|------------------|
| **Virus & Threat Protection** | Guards against viruses, malware, ransomware, and other malicious software. |
| **Firewall & Network Protection** | Controls traffic entering and leaving the computer. |
| **App & Browser Control** | Protects against malicious apps, suspicious files, phishing sites, and dangerous downloads. |
| **Device Security** | Reports on hardware-based protections such as Core Isolation, Memory Integrity, and TPM. |

Some Windows versions also display **Account Protection**, **Device Performance & Health**, and **Family Options**.

### Status Indicators

| Colour | Meaning |
|--------|---------|
| **Green** | The device is sufficiently protected; no action required. |
| **Yellow** | A security recommendation needs review. |
| **Red** | A security problem requires immediate attention. |

**TryHackMe answer:** In the VM, the area needing immediate attention is **Virus & threat protection**.

---

## Task 4 — Virus & Threat Protection

The **Virus & Threat Protection** section manages Microsoft Defender Antivirus. It divides into **Current Threats** and **Virus & Threat Protection Settings**.

### Scan Options

| Scan type | What it covers |
|-----------|----------------|
| **Quick Scan** | Fast scan of locations where malware is commonly found; good for routine checks. |
| **Full Scan** | Scans all files, running programs, and storage locations; comprehensive but may take over an hour. |
| **Custom Scan** | Scans user-selected files, folders, or locations when you suspect a specific area. |

### Threat History

| Item | Meaning |
|------|---------|
| **Last Scan** | Details of the most recent Microsoft Defender scan. |
| **Quarantined Threats** | Malicious files isolated so they cannot execute, and eventually removable. |
| **Allowed Threats** | Items flagged as potentially malicious but manually permitted by the user. |

> **Warning:** Allowing a detected threat is dangerous. Only permit an item if you are completely certain it is safe, otherwise malicious code may be free to run.

### Protection Settings

| Setting | Purpose |
|---------|---------|
| **Real-Time Protection** | Continuously monitors the system to stop malware installing, running, or modifying the system. Should stay enabled. |
| **Cloud-Delivered Protection** | Uses Microsoft's cloud intelligence for faster detection and better coverage of new malware. |
| **Automatic Sample Submission** | Sends suspicious files to Microsoft for analysis, improving detection for everyone. |
| **Controlled Folder Access** | Lets only trusted applications modify protected folders — a key defence against ransomware. |
| **Exclusions** | Skips selected files, folders, or processes during scans. |
| **Notifications** | Alerts about security events, device health, and detected threats. |

### Controlled Folder Access Logic

When Controlled Folder Access is enabled, each application requesting to modify a protected folder is checked:

```
Application
    ↓
Trusted?
  /    \
Yes     No
 ↓       ↓
Allow   Block
```

Controlled Folder Access requires real-time protection to function properly.

> **Warning:** Exclusions create risk. An attacker who learns an excluded directory could place malicious files there to evade scanning, so only add exclusions when genuinely necessary (for example, to resolve a false positive).

### Keeping Defender Current

Microsoft Defender relies on threat intelligence and malware definitions. Users can select **Check for updates** to refresh definitions, and an individual file or folder can be scanned on demand by right-clicking it and choosing **Scan with Microsoft Defender**.

**TryHackMe answer:** The feature turned off that Windows notifies you to turn on is **Real-time protection**.

---

## Task 5 — Firewall & Network Protection

### What is a Firewall?

A firewall controls network traffic entering and leaving a device. Communication flows through ports, and the firewall decides which traffic is allowed or blocked — much like a security guard controlling access to a building.

```
Network Traffic
      ↓
   Firewall
   /      \
Allowed   Blocked
   ↓         ↓
System    Dropped
```

### Windows Defender Firewall Profiles

Windows includes a built-in **Windows Defender Firewall** that applies different profiles depending on the network environment.

| Profile | Typical environment |
|---------|---------------------|
| **Domain** | Applies when the computer can authenticate to a Domain Controller; common in Active Directory enterprises. |
| **Private** | Trusted networks such as a home or office network; the computer may be more discoverable. |
| **Public** | Untrusted networks such as airport, cafe, or hotel Wi-Fi; should use stricter settings. |

Each profile offers options to turn the firewall on or off, block incoming connections, and configure allowed applications.

> **Warning:** The Windows Defender Firewall should normally remain enabled. Disabling it exposes the device to unwanted inbound and outbound traffic.

### Allowing an App Through the Firewall

Windows can permit specific applications to communicate through the firewall on a per-profile basis. An app may be allowed on **Private** networks yet blocked on **Public** ones, giving granular control over network access.

### Advanced Security

Advanced firewall settings give detailed control over traffic:

| Component | Role |
|-----------|------|
| **Inbound Rules** | Control connections entering the computer (Internet → Computer). |
| **Outbound Rules** | Control connections leaving the computer (Computer → Internet). |
| **Connection Security Rules** | Secure communication between computers, using technologies such as IPsec to authenticate and protect traffic. |
| **Monitoring** | Lets administrators review active firewall rules and security configuration. |

Open the advanced console with:

```cmd
WF.msc
```

This launches **Windows Defender Firewall with Advanced Security**.

**TryHackMe answer:** On airport Wi-Fi, the active profile will most likely be the **Public network** profile.

---

## Task 6 — App & Browser Control

The **App & Browser Control** section manages technologies that protect users from malicious applications and web-based threats. The key technology is **Microsoft Defender SmartScreen**.

### Microsoft Defender SmartScreen

SmartScreen checks applications and files downloaded from the web and helps protect against phishing websites, malware websites, malicious applications, suspicious downloads, and unrecognised applications.

| SmartScreen setting | Behaviour |
|---------------------|-----------|
| **Block** | Prevents suspicious applications or files from running. |
| **Warn** | Displays a warning before allowing execution. |
| **Off** | Disables SmartScreen protection. |

> **Warning:** Turning SmartScreen off reduces protection against potentially malicious applications and downloads. When an unrecognised app tries to run, Windows shows a "Windows protected your PC" prompt so the user can decide whether to continue.

### Exploit Protection

Exploit Protection is built into modern Windows and defends applications and the OS against common exploitation techniques, offering both system-wide and program-specific settings.

| Mitigation | How it helps |
|------------|--------------|
| **Control Flow Guard (CFG)** | Validates indirect function calls to block control-flow hijacking, stopping execution from jumping to unexpected locations. |
| **Data Execution Prevention (DEP)** | Prevents code from executing in memory regions meant only for data, blocking certain memory-corruption exploits. |
| **Address Space Layout Randomization (ASLR)** | Randomises memory locations for executables, libraries, and system components so attackers cannot predict addresses. Options include Mandatory ASLR and Bottom-up ASLR. |

DEP's protection works by refusing execution attempts against data-only memory:

```
Memory Page
    ↓
Data Only
    ↓
Code Execution Attempt
    ↓
   BLOCK
```

> **Tip:** Unless you understand the security impact, keep the default Exploit Protection settings. Incorrect changes can reduce security or cause application compatibility problems.

---

## Task 7 — Device Security

The **Device Security** section reports on hardware-based security features, including Core Isolation, Memory Integrity, the Security Processor, and the Trusted Platform Module.

### Core Isolation and Memory Integrity

| Feature | What it does |
|---------|--------------|
| **Core Isolation** | Uses Virtualization-Based Security (VBS) to isolate critical parts of Windows in a protected environment, separated from the normal OS. |
| **Memory Integrity** | Part of Core Isolation; uses VBS to stop malicious code being injected into high-security kernel processes. |

Memory Integrity establishes an isolation boundary between the everyday operating system and sensitive kernel operations:

```
Normal OS Environment
        │
        │ Isolation Boundary
        ↓
Protected Security Environment
```

### Trusted Platform Module (TPM)

Windows may use a hardware security processor known as the **Trusted Platform Module (TPM)** — a secure cryptographic processor designed for hardware-based security operations.

TPM capabilities include:

- Cryptographic operations
- Secure key storage
- Device integrity verification
- Hardware-backed authentication
- Encryption support

The TPM includes physical mechanisms that make it resistant to tampering. Because cryptographic keys stored purely in software could be extracted if the OS is compromised, the TPM keeps them in hardware-protected storage:

```
Sensitive Keys
     ↓
    TPM
     ↓
Hardware Protected Storage
```

**TryHackMe answer:** The TPM is the **Trusted Platform Module**.

---

## Task 8 — BitLocker

### What is BitLocker?

**BitLocker Drive Encryption** is a Windows data-protection technology that encrypts storage drives to prevent unauthorised access. It defends against data exposure caused by lost computers, stolen computers, removed hard drives, and improperly decommissioned systems.

Without disk encryption, a stolen drive can simply be read on another machine; with BitLocker, the data stays encrypted:

```
Attacker removes drive          Attacker removes drive
        ↓                               ↓
Connects to another computer    Data remains encrypted
        ↓                               ↓
Reads stored files              Encryption key required
                                        ↓
                                Unauthorized access prevented
```

### BitLocker with a TPM

BitLocker is stronger when paired with a TPM, which securely stores the cryptographic information BitLocker uses and can verify the computer was not tampered with while offline.

| Configuration | Result |
|---------------|--------|
| **BitLocker + TPM 1.2 or later** | Hardware-backed, stronger data protection. |
| **BitLocker without a compatible TPM** | Uses a removable drive holding a startup key. |

On systems without a compatible TPM, a removable drive can hold a **Startup Key** that must be present during boot to unlock the BitLocker-protected drive.

**TryHackMe answer:** On systems without TPM version 1.2 or later, the removable drive contains the **Startup key**.

---

## Task 9 — Volume Shadow Copy Service (VSS)

### What is VSS?

The **Volume Shadow Copy Service (VSS)** coordinates the creation of consistent shadow copies of data. A shadow copy — also called a snapshot or point-in-time copy — can be used for backup, recovery, and restore operations.

```
Original Data
    │
    ├── Snapshot at 10:00 AM
    │
    ├── Snapshot at 12:00 PM
    │
    └── Current Data
```

If files are modified or deleted, an earlier snapshot may be used to recover them. Volume Shadow Copies are stored inside the **System Volume Information** folder on drives where protection is enabled.

### System Protection and Restore Points

When VSS and **System Protection** are enabled, Windows can create a restore point, perform System Restore, configure restore settings, and delete restore points.

Restore points capture system state at a point in time and can help recover from incorrect system changes, software installation problems, driver issues, and certain configuration problems.

### VSS and Ransomware

Because shadow copies can let victims restore files after destructive events, ransomware often targets them:

```
Ransomware Infection
       ↓
Delete Shadow Copies
       ↓
Encrypt Files
       ↓
Victim Cannot Easily Restore Data
```

> **Security relevance:** Relying only on local shadow copies is not enough. Organisations should maintain offline backups, off-site backups, and properly protected backup infrastructure so ransomware cannot destroy every copy at once.

**TryHackMe answer:** VSS stands for **Volume Shadow Copy Service**.

---

## Task 10 — Conclusion

Windows ships with several built-in technologies that improve system security. This room covered Windows Update, Windows Security, Microsoft Defender Antivirus, Virus & Threat Protection, Real-Time Protection, Ransomware Protection, Windows Defender Firewall and its profiles, SmartScreen, Exploit Protection, Core Isolation, Memory Integrity, TPM, BitLocker, and the Volume Shadow Copy Service.

Together these layers form a single security posture:

```
┌─────────────────────────────┐
│       Windows Security      │
├─────────────────────────────┤
│ Windows Update              │
│ Microsoft Defender          │
│ Windows Defender Firewall   │
│ SmartScreen                 │
│ Exploit Protection          │
│ Core Isolation              │
│ TPM                         │
│ BitLocker                   │
│ VSS / Restore Points        │
└─────────────────────────────┘
```

This layered approach is called **Defense in Depth** — security never depends on a single mechanism, because multiple layers work together.

### Living Off The Land (LOTL)

A key concept raised in this room is **Living Off The Land**. Instead of installing obvious malicious tools, attackers abuse legitimate, built-in Windows utilities already present on a victim's machine.

```
Attacker Gains Access
       ↓
Uses Legitimate Windows Tools
       ↓
Performs Malicious Actions
       ↓
Attempts to Blend With Normal Activity
```

Because the tools are genuine Windows components, detection becomes harder. For defenders this means:

- Legitimate tools can still be abused
- Process behaviour should be monitored
- Command-line activity should be logged
- Unusual administrative activity should be investigated
- Monitoring should focus on behaviour, not only filenames

**TryHackMe answers:** Tasks 1, 6, and 10 are read-only — **no answer needed**.

---

## Real-World Example

A ransomware operator who lands on an unpatched, poorly configured Windows host typically:

```
Exploits a missing security patch
        │
        ▼
Uses built-in tools (LOTL) to stay hidden
        │
        ▼
Deletes Volume Shadow Copies
        │
        ▼
Encrypts user files and demands payment
```

Every layer in this room breaks that chain — patching closes the entry point, Defender and SmartScreen catch the payload, behaviour monitoring exposes LOTL activity, and off-site backups defeat the shadow-copy deletion.

---

## Common Mistakes

| Mistake | Reality |
|---------|---------|
| Disabling Real-Time Protection | Leaves the system unmonitored; keep it enabled. |
| Turning off SmartScreen | Removes protection against unrecognised and phishing threats. |
| Adding broad Defender exclusions | Attackers can hide malware inside excluded paths. |
| Trusting only local restore points | Ransomware deletes shadow copies; keep offline/off-site backups. |
| Running BitLocker without a TPM and losing the startup key | The drive cannot be unlocked at boot. |

---

## Quick Revision

| Area | Key point |
|------|-----------|
| **Windows Update** | Delivers patches; Patch Tuesday is the second Tuesday monthly. |
| **Windows Security** | Central hub with green/yellow/red status indicators. |
| **Defender Antivirus** | Quick, Full, and Custom scans; quarantine isolates threats. |
| **Firewall** | Domain, Private, and Public profiles; `WF.msc` for advanced rules. |
| **App & Browser Control** | SmartScreen plus DEP, CFG, and ASLR exploit mitigations. |
| **Device Security** | Core Isolation, Memory Integrity, and TPM. |
| **Data protection** | BitLocker encrypts drives; VSS enables restore points. |

**Key idea:** Windows security is not one feature but many overlapping layers — updates, antivirus, firewall, exploit mitigations, hardware protections, and backups — combined into Defense in Depth.

---

## 30-Second Revision

- Windows Update patches vulnerabilities; Patch Tuesday is the second Tuesday of each month.
- Windows Security is the central dashboard; red means immediate action is needed.
- Microsoft Defender offers Quick, Full, and Custom scans, and quarantines threats.
- Keep Real-Time Protection on; Controlled Folder Access defends against ransomware.
- Firewall profiles are Domain, Private, and Public — untrusted Wi-Fi uses Public.
- SmartScreen blocks suspicious apps; DEP, CFG, and ASLR make exploitation harder.
- TPM stores keys in hardware; BitLocker encrypts drives (stronger with TPM).
- VSS creates restore points; ransomware deletes shadow copies, so keep off-site backups.

---

## Cheat Sheet

| Feature / Command | Purpose |
|-------------------|---------|
| `control /name Microsoft.WindowsUpdate` | Opens Windows Update settings. |
| **Patch Tuesday** | Second Tuesday of each month for scheduled updates. |
| **Windows Security** | Central interface for built-in protections. |
| **Quick / Full / Custom Scan** | Defender scans of common spots / everything / selected areas. |
| **Quarantine** | Isolates detected threats from execution. |
| **Controlled Folder Access** | Protects folders against ransomware. |
| `WF.msc` | Windows Defender Firewall with Advanced Security. |
| **Domain / Private / Public** | Firewall profiles for corporate / trusted / untrusted networks. |
| **Inbound / Outbound Rules** | Control incoming / outgoing traffic. |
| **SmartScreen** | Blocks suspicious apps, files, phishing, and downloads. |
| **CFG / DEP / ASLR** | Exploit mitigations built into Windows. |
| **Core Isolation / Memory Integrity** | Virtualization-based protection of kernel processes. |
| **TPM** | Hardware cryptographic processor for secure key storage. |
| **BitLocker** | Full-drive encryption (startup key without a TPM). |
| **VSS / Shadow Copy** | Point-in-time snapshots stored in System Volume Information. |

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is Patch Tuesday?** | The second Tuesday of each month, when Microsoft traditionally releases many security updates. Urgent fixes can still ship outside this schedule. |
| **Q2. Why should Real-Time Protection stay enabled?** | It continuously monitors the system, stopping malware from installing, running, or modifying files as it happens rather than only during scheduled scans. |
| **Q3. What are the three Windows Defender Firewall profiles?** | Domain (authenticated to a Domain Controller), Private (trusted home or office networks), and Public (untrusted networks such as airport or cafe Wi-Fi). |
| **Q4. What do CFG, DEP, and ASLR do?** | They are exploit mitigations: CFG validates indirect calls to block control-flow hijacking, DEP stops code executing in data-only memory, and ASLR randomises memory addresses to make exploitation unpredictable. |
| **Q5. Why is BitLocker stronger with a TPM?** | The TPM stores BitLocker's cryptographic keys in tamper-resistant hardware and can verify the machine has not been altered offline, keeping keys out of easily accessible software storage. |
| **Q6. Why does ransomware delete Volume Shadow Copies?** | Shadow copies let victims restore files, so ransomware removes them before encrypting data to prevent easy recovery — which is why off-site and offline backups matter. |
| **Q7. What is Living Off The Land?** | An attacker technique that abuses legitimate, built-in Windows tools to perform malicious actions and blend in with normal activity, making detection harder. |

## Final Takeaway

Windows Fundamentals 3 shows that a hardened Windows system is not protected by a single switch but by many cooperating layers: timely updates, **Microsoft Defender Antivirus**, the **firewall**, **SmartScreen** and exploit mitigations, hardware-backed features like **TPM** and **BitLocker**, and recovery options such as **VSS**. Understanding how each layer works — and how attackers try to bypass them through unpatched flaws, disabled protections, shadow-copy deletion, and **Living Off The Land** — is the essence of **Defense in Depth** and the foundation for both defending and assessing real Windows environments.
