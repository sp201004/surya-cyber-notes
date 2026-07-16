## Contents

- [What is an Operating System?](#what-is-an-operating-system)
- [Comparing Major Operating Systems](#comparing-major-operating-systems)
- [The Danger of Legacy Operating Systems](#the-danger-of-legacy-operating-systems)
- [The Boot Process — Sequence & Security](#the-boot-process--sequence--security)
- [The 4-Part Task Cycle](#the-4-part-task-cycle)
- [Resource Management — The OS as Conductor](#resource-management--the-os-as-conductor)
- [Virtualization Technology](#virtualization-technology)
- [GUI vs. CLI — The Security Analyst's Choice](#gui-vs-cli--the-security-analysts-choice)

## What is an Operating System?

> **KEY CONCEPT: Core Definition**
> An Operating System (OS) is the core software that bridges the gap between the USER and the physical HARDWARE.
> Computers only speak binary (0s and 1s). The OS translates your human actions into binary commands the hardware can execute.
> Without an OS, you would need to write raw binary instructions to open a file -- completely impractical.

> **COMPUTER SYSTEM LAYERS — User to Hardware**
> **THREE LAYERS OF EVERY COMPUTER SYSTEM:**

```
  +-------------------------------------------------------+
  |  USER  (You, the human)                               |
  +-------------------------------------------------------+
              |  (gives instructions to)
              v
  +-------------------------------------------------------+
  |  APPLICATION  (browser, text editor, security tool)  |
  +-------------------------------------------------------+
              |  (requests services from)
              v
  +-------------------------------------------------------+
  |  OPERATING SYSTEM  (Windows / Linux / macOS)          |
  |  Translates requests into hardware instructions.      |
  |  Manages CPU, RAM, storage, and all I/O devices.      |
  +-------------------------------------------------------+
              |  (commands)
              v
  +-------------------------------------------------------+
  |  HARDWARE  (CPU, RAM, Hard Drive, NIC, GPU)           |
  |  Executes instructions and returns results.           |
  +-------------------------------------------------------+

  RESTAURANT ANALOGY:
  User = Customer (places order)
  Application = Menu (structured request format)
  OS = Waiter (translates order, coordinates kitchen)
  Hardware = Kitchen (actually cooks the food)
```

## Comparing Major Operating Systems

| **OS** | **Type** | **Year** | **Key Security Relevance** |
| --- | --- | --- | --- |
| **Windows** | Closed-source proprietary | 1985 | Most widely targeted OS due to massive market share. Analysts must understand Windows attack surfaces (Registry, Group Policy, Active Directory). |
| **macOS** | Partially open-source (open kernel) | 1984 | Apple's OS. Open-source Darwin kernel (XNU). Increasingly targeted as enterprise adoption grows. Features Gatekeeper and XProtect as built-in defences. |
| **Linux** | Completely open-source | 1991 | THE backbone of cybersecurity. Powers 96%+ of servers worldwide. Security-focused distros (Kali, Parrot) are essential analyst tools. Highly customizable. |
| **ChromeOS** | Partially open-source | 2011 | Derived from Chromium OS. Sandboxed architecture -- each browser tab is isolated. Very small attack surface. Popular in education. |
| **Android** | Open-source (AOSP) | 2008 | Mobile OS. Open-source but fragmented -- thousands of device manufacturers delay security patches. Frequent target of mobile malware. |
| **iOS** | Partially open-source | 2007 | Apple mobile OS. Closed hardware+software ecosystem. Very controlled app distribution. Significantly fewer malware incidents than Android. |

## The Danger of Legacy Operating Systems

> **IMPORTANT: What is a Legacy OS?**
> A Legacy OS is an outdated operating system an organization still uses, typically because their specialized equipment or custom software is not compatible with modern systems.
> 
> THE SECURITY PROBLEM:
> When a vendor officially ends support for an OS, they stop releasing security patches.
> Any new vulnerability discovered after that date stays PERMANENTLY UNFIXED.
> Attackers actively scan for legacy OS signatures because they are permanently exploitable.
> 
> Real Example: Windows XP reached end-of-life in April 2014. The WannaCry ransomware (May 2017) specifically targeted unpatched Windows XP systems.
> Hospitals and manufacturing plants still running XP were devastated -- some could not provide patient care for days.
> 
> Mitigation (when upgrade is impossible):
> * Air-gap: physically disconnect the legacy system from all networks.
> * Strict network segmentation: isolate it behind multiple firewalls.
> * Disable all unused ports and services on the machine.
> * Compensating controls: monitor it 24/7 with IDS and SIEM.

## The Boot Process — Sequence & Security

> **BOOT PROCESS — 4-Step Sequence with Security Notes**
> **BOOT SEQUENCE: What happens when you press the power button**
> **STEP 1: POWER ON**

```
  +--------------------------------------------------+
  | Electrical signal sent to motherboard.           |
  | CPU wakes up and loads firmware from ROM chip.   |
  +--------------------------------------------------+
              |
              v
  STEP 2: FIRMWARE ACTIVATES (BIOS or UEFI)
  +--------------------------------------------------+
  | BIOS  (pre-2007): Basic Input/Output System.     |
  |   * Older standard. 16-bit. Limited security.    |
  |   * Vulnerable to BIOS rootkit attacks.          |
  | UEFI  (modern): Unified Extensible Firmware      |
  |   Interface. 64-bit. Enhanced features:          |
  |   * Secure Boot: verifies bootloader signature.  |
  |   * Faster startup. Larger disk support.         |
  +--------------------------------------------------+
              |  Firmware runs Power-On Self-Test (POST)
              |  to verify hardware is functioning.
              v
  STEP 3: BOOTLOADER LOADS
  +--------------------------------------------------+
  | Firmware locates and launches the Bootloader     |
  | (e.g., GRUB on Linux, Windows Boot Manager).     |
  | Bootloader knows where the OS is stored.         |
  +--------------------------------------------------+
              |
              v
  STEP 4: OS INITIALIZES
  +--------------------------------------------------+
  | Bootloader loads the OS kernel into RAM.         |
  | OS initializes drivers, mounts storage, starts   |
  | services, and presents the login screen.         |
  +--------------------------------------------------+

  SECURITY RISK: Traditional antivirus does NOT scan firmware.
  Advanced attackers plant malware IN the BIOS/UEFI chip.
  This malware SURVIVES complete hard drive wipes and OS reinstalls.
  Defence: UEFI Secure Boot + firmware integrity monitoring.
```

## The 4-Part Task Cycle

> **NOTE: How Every Computer Action Works**
> Every task on a computer -- from clicking a button to saving a file -- follows this exact communication loop:

> **4-PART TASK CYCLE — How Every Action Flows**
> **USER --> APPLICATION --> OPERATING SYSTEM --> HARDWARE --> (back up)**
> **EXAMPLE: You save a document in Microsoft Word**

```
  +-----------------------------------------------------------+
  |                                                           |
  |  1. USER presses CTRL+S                                   |
  |                |                                          |
  |                v                                          |
  |  2. APPLICATION (Word) receives save command.             |
  |     Sends request to OS: 'Write this data to disk.'       |
  |                |                                          |
  |                v                                          |
  |  3. OS (Windows/Linux) interprets the request.            |
  |     Checks file permissions. Determines disk location.    |
  |     Sends write instruction to storage hardware driver.   |
  |                |                                          |
  |                v                                          |
  |  4. HARDWARE (hard drive) writes the bytes.               |
  |     Sends confirmation back up through OS to App.         |
  |     Word displays the 'Saved' checkmark.                  |
  |                                                           |
  +-----------------------------------------------------------+

  SECURITY CONTEXT: Malware can intercept this cycle at ANY step:
  * At Application level: ransomware encrypts before writing to disk.
  * At OS level: rootkit intercepts OS calls to hide malicious files.
  * At Hardware level: firmware implants survive complete reinstalls.
```

## Resource Management — The OS as Conductor

> **NOTE: What Resources Does the OS Manage?**
> The OS constantly balances FOUR key hardware resources among ALL running programs simultaneously:
> 
> CPU (Central Processing Unit): The brain. Runs calculations and logic. Limited cores = limited parallel tasks.
> RAM (Random Access Memory): Short-term workspace. Very fast but small. Cleared when powered off.
> Storage (HDD/SSD): Long-term memory. Slower but persistent. Files stay after shutdown.
> I/O Bandwidth: Data flowing to/from devices (network, keyboard, screen, USB drives).
> 
> SECURITY APPLICATION -- Task Manager as Investigation Tool:
> If a computer is suddenly very slow, an analyst opens Task Manager (Windows) or 'top'/'htop' (Linux).
> Example finding: An unknown process 'svchost32.exe' is consuming 95% of CPU with no user activity.
> Normal processes don't behave this way. This is a strong indicator of malware running a crypto-miner,
> exfiltrating data, or participating in a DDoS botnet -- all without the user's knowledge.

## Virtualization Technology

> **VIRTUALIZATION — Physical Machine with Three VMs**
> **PHYSICAL MACHINE (Host)            VIRTUAL MACHINES (Guests)**

```
  +--------------------------+
  | Physical Hardware:       |
  | CPU: 8 cores             |   +----------+  +----------+  +----------+
  | RAM: 32 GB               |   |  VM 1    |  |  VM 2    |  |  VM 3    |
  | SSD: 1 TB                |   | Kali     |  | Ubuntu   |  | Windows  |
  +--------------------------+   | Linux    |  | Server   |  | 10       |
  | HYPERVISOR (KVM/VMware)  |   | 8GB RAM  |  | 8GB RAM  |  | 8GB RAM  |
  | Allocates resources to   |   | 2 cores  |  | 2 cores  |  | 2 cores  |
  | each VM independently.   |   +----------+  +----------+  +----------+
  +--------------------------+
```

Each VM believes it IS the physical machine -- complete isolation. If VM 1 (Kali) is infected with malware: VM 2 and VM 3 are unaffected. If VM 1 is destroyed: delete the VM file and spin up a fresh one in minutes.

**HYPERVISOR TYPES:**

- **Type 1 (Bare-metal):** Runs directly on hardware. No host OS underneath. Examples: VMware ESXi, Microsoft Hyper-V, Xen, KVM (Linux built-in). More secure. Used in cloud data centers and enterprise servers.
- **Type 2 (Hosted):** Runs inside a host OS. Examples: VirtualBox, VMware Workstation. Easier for personal use. Less secure (must secure host OS too).

| **Virtualization Use Case** | **How It Works** | **Security Benefit** |
| --- | --- | --- |
| **Malware Sandboxing** | Open suspicious file inside an isolated VM. Observe what it does. | VM is destroyed if malware runs. Physical machine is completely safe. Evidence gathered safely. |
| **Penetration Testing Lab** | Run Kali Linux in VM alongside production OS. | Powerful offensive tools isolated from main system. Reset VM after each test exercise. |
| **OS Testing & Patching** | Test patches on VM clone of production server before live deployment. | Identify patch conflicts or failures without impacting real services. |
| **Multi-OS Efficiency** | Run 5 different OS environments on one physical laptop simultaneously. | No need for separate hardware per OS. Reduces cost and equipment sprawl. |
| **Incident Response** | Restore a clean VM snapshot after malware infection. | Full system recovery in minutes rather than hours of manual reinstallation. |

## GUI vs. CLI — The Security Analyst's Choice

> **GUI vs. CLI — Feature Comparison**

| **GUI (Graphical User Interface)** | **CLI (Command-Line Interface)** |
| --- | --- |
| Visual: windows, icons, menus | Text-based: typed commands |
| One action at a time | Multiple commands chained |
| Mouse-driven navigation | Keyboard-driven only |
| Intuitive for beginners | Steeper learning curve |
| Limited automation capability | Infinite automation power |
| Actions NOT logged by default | ALL commands AUTO-LOGGED |

**EXAMPLE: Moving 1000 files from one folder to another:**

- **GUI method:** Click file 1, Shift+click file 1000, drag to new folder. ~2 minutes, error-prone.
- **CLI method:** `mv /source/*.jpg /destination/` — Done instantly. One line. Zero errors.

**WHY ANALYSTS USE CLI ALMOST EXCLUSIVELY:**

1. **Speed:** Complex operations done in seconds.
2. **Automation:** Scripts run thousands of operations unattended.
3. **History:** Every command is recorded in `~/.bash_history`. Forensic investigators read this to trace what an attacker DID on a compromised system step by step.
4. **Remote Access:** SSH gives full CLI access to servers anywhere. No GUI needed to manage a server 10,000 km away.

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| **What does an OS do?** | Bridges user and hardware. Translates human actions into binary hardware instructions. Manages CPU, RAM, storage, and I/O resources. |
| **What is a Legacy OS risk?** | No more security patches. New vulnerabilities discovered after end-of-support are permanently unfixed. Attackers actively target known legacy OS exploits. |
| **BIOS vs. UEFI?** | BIOS: older (pre-2007), 16-bit, limited security. UEFI: modern, 64-bit, Secure Boot feature, faster, supports larger disks. |
| **What is a Hypervisor?** | Software that creates and manages Virtual Machines. Type 1 (bare-metal, more secure) runs directly on hardware. Type 2 (hosted) runs inside an OS. |
| **Why do analysts prefer CLI over GUI?** | Speed of complex operations, infinite automation via scripts, automatic command history logging (forensics), and full remote server management via SSH. |
| **What does the bash history file provide forensically?** | A complete record of every command typed in the terminal. Incident responders use it to reconstruct exactly what steps an attacker took after compromising a system. |
| **What is the 4-part task cycle?** | User -> Application -> OS -> Hardware -> (back up). Every computer action follows this loop. Malware can intercept at any layer. |
