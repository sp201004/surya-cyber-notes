**GOOGLE CYBERSECURITY CERTIFICATE**

**Course 4**

**Tools of the Trade:**

**Linux and SQL**

**Study Notes | Modules 1 – 4**

Deep Understanding Edition | With Diagrams, Command Cards & Real-World Examples

| **Module** | **Title** | **Topics Covered** |
| --- | --- | --- |
| Module 1 | Introduction to Operating Systems | What is an OS · Boot Process · GUI vs CLI · Virtualization · Legacy OS |
| Module 2 | The Linux Operating System | Linux Architecture · Distros · Shell Types · Package Managers · stdin/stdout/stderr |
| Module 3 | Linux Commands in the Bash Shell | Navigation · File Ops · Permissions · User Mgmt · grep/find/pipe · Getting Help |
| Module 4 | Relational Databases and SQL | Databases · Primary/Foreign Keys · SELECT/FROM · WHERE · JOINs · Aggregate Functions |

**MODULE 1**

# Introduction to Operating Systems

## 1.1 What is an Operating System?

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
  |  Translates requests into hardware instructions.       |
  |  Manages CPU, RAM, storage, and all I/O devices.       |
  +-------------------------------------------------------+
              |  (commands)
              v
  +-------------------------------------------------------+
  |  HARDWARE  (CPU, RAM, Hard Drive, NIC, GPU)           |
  |  Executes instructions and returns results.            |
  +-------------------------------------------------------+

  RESTAURANT ANALOGY:
  User = Customer (places order)
  Application = Menu (structured request format)
  OS = Waiter (translates order, coordinates kitchen)
  Hardware = Kitchen (actually cooks the food)
```

## 1.2 Comparing Major Operating Systems

| **OS** | **Type** | **Year** | **Key Security Relevance** |
| --- | --- | --- | --- |
| **Windows** | Closed-source proprietary | 1985 | Most widely targeted OS due to massive market share. Analysts must understand Windows attack surfaces (Registry, Group Policy, Active Directory). |
| **macOS** | Partially open-source (open kernel) | 1984 | Apple's OS. Open-source Darwin kernel (XNU). Increasingly targeted as enterprise adoption grows. Features Gatekeeper and XProtect as built-in defences. |
| **Linux** | Completely open-source | 1991 | THE backbone of cybersecurity. Powers 96%+ of servers worldwide. Security-focused distros (Kali, Parrot) are essential analyst tools. Highly customizable. |
| **ChromeOS** | Partially open-source | 2011 | Derived from Chromium OS. Sandboxed architecture -- each browser tab is isolated. Very small attack surface. Popular in education. |
| **Android** | Open-source (AOSP) | 2008 | Mobile OS. Open-source but fragmented -- thousands of device manufacturers delay security patches. Frequent target of mobile malware. |
| **iOS** | Partially open-source | 2007 | Apple mobile OS. Closed hardware+software ecosystem. Very controlled app distribution. Significantly fewer malware incidents than Android. |

## 1.3 The Danger of Legacy Operating Systems

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

## 1.4 The Boot Process — Sequence & Security

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
  | (e.g., GRUB on Linux, Windows Boot Manager).    |
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

## 1.5 The 4-Part Task Cycle

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

## 1.6 Resource Management — The OS as Conductor

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

## 1.7 Virtualization Technology

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

  Each VM believes it IS the physical machine -- complete isolation.
  If VM 1 (Kali) is infected with malware: VM 2 and VM 3 are unaffected.
  If VM 1 is destroyed: delete the VM file and spin up a fresh one in minutes.

  HYPERVISOR TYPES:
  Type 1 (Bare-metal): Runs directly on hardware. No host OS underneath.
    Examples: VMware ESXi, Microsoft Hyper-V, Xen, KVM (Linux built-in)
    More secure. Used in cloud data centers and enterprise servers.
  Type 2 (Hosted): Runs inside a host OS.
    Examples: VirtualBox, VMware Workstation
    Easier for personal use. Less secure (must secure host OS too).
```

| **Virtualization Use Case** | **How It Works** | **Security Benefit** |
| --- | --- | --- |
| **Malware Sandboxing** | Open suspicious file inside an isolated VM. Observe what it does. | VM is destroyed if malware runs. Physical machine is completely safe. Evidence gathered safely. |
| **Penetration Testing Lab** | Run Kali Linux in VM alongside production OS. | Powerful offensive tools isolated from main system. Reset VM after each test exercise. |
| **OS Testing & Patching** | Test patches on VM clone of production server before live deployment. | Identify patch conflicts or failures without impacting real services. |
| **Multi-OS Efficiency** | Run 5 different OS environments on one physical laptop simultaneously. | No need for separate hardware per OS. Reduces cost and equipment sprawl. |
| **Incident Response** | Restore a clean VM snapshot after malware infection. | Full system recovery in minutes rather than hours of manual reinstallation. |

## 1.8 GUI vs. CLI — The Security Analyst's Choice

> **GUI vs. CLI — Feature Comparison**  
> **GUI (Graphical User Interface)      CLI (Command-Line Interface)**

```
  +--------------------------------+  +-----------------------------+
  | Visual: windows, icons, menus  |  | Text-based: typed commands  |
  | One action at a time           |  | Multiple commands chained   |
  | Mouse-driven navigation        |  | Keyboard-driven only        |
  | Intuitive for beginners        |  | Steeper learning curve      |
  | Limited automation capability  |  | Infinite automation power   |
  | Actions NOT logged by default  |  | ALL commands AUTO-LOGGED    |
  +--------------------------------+  +-----------------------------+

  EXAMPLE: Moving 1000 files from one folder to another:

  GUI method: Click file 1, Shift+click file 1000,
              drag to new folder. ~2 minutes, error-prone.

  CLI method: mv /source/*.jpg /destination/
              Done instantly. One line. Zero errors.

  WHY ANALYSTS USE CLI ALMOST EXCLUSIVELY:
  1. Speed: Complex operations done in seconds.
  2. Automation: Scripts run thousands of operations unattended.
  3. History: Every command is recorded in ~/.bash_history
     Forensic investigators read this to trace what an
     attacker DID on a compromised system step by step.
  4. Remote Access: SSH gives full CLI access to servers anywhere.
     No GUI needed to manage a server 10,000 km away.
```

## 1.9 Module 1 Quick Review

| **Question** | **Answer** |
| --- | --- |
| **What does an OS do?** | Bridges user and hardware. Translates human actions into binary hardware instructions. Manages CPU, RAM, storage, and I/O resources. |
| **What is a Legacy OS risk?** | No more security patches. New vulnerabilities discovered after end-of-support are permanently unfixed. Attackers actively target known legacy OS exploits. |
| **BIOS vs. UEFI?** | BIOS: older (pre-2007), 16-bit, limited security. UEFI: modern, 64-bit, Secure Boot feature, faster, supports larger disks. |
| **What is a Hypervisor?** | Software that creates and manages Virtual Machines. Type 1 (bare-metal, more secure) runs directly on hardware. Type 2 (hosted) runs inside an OS. |
| **Why do analysts prefer CLI over GUI?** | Speed of complex operations, infinite automation via scripts, automatic command history logging (forensics), and full remote server management via SSH. |
| **What does the bash history file provide forensically?** | A complete record of every command typed in the terminal. Incident responders use it to reconstruct exactly what steps an attacker took after compromising a system. |
| **What is the 4-part task cycle?** | User -> Application -> OS -> Hardware -> (back up). Every computer action follows this loop. Malware can intercept at any layer. |

**MODULE 2**

# The Linux Operating System

## 2.1 Why Linux is the Backbone of Cybersecurity

> **KEY CONCEPT: Core Importance**
> Linux is not just another OS -- it IS the cybersecurity profession.
> 
> * 96%+ of the world's top 1 million web servers run Linux.
> * All major cloud infrastructure (AWS, GCP, Azure) runs on Linux underneath.
> * Security-focused distros (Kali Linux, Parrot OS) are built on Linux.
> * Every major security tool (Wireshark, Metasploit, Nmap, tcpdump) runs natively on Linux.
> * SIEM servers, IDS/IPS systems, and forensic workstations are Linux-based.
> 
> As a security analyst, you WILL use Linux daily for:
> * Log analysis: reading system logs to investigate incidents.
> * IAM auditing: reviewing file permissions and user access privileges.
> * Penetration testing: launching security assessment tools.
> * Digital forensics: analyzing disk images and memory dumps after attacks.

## 2.2 Brief History — How Linux Was Born

> **LINUX HISTORY — From GNU to Modern Distros**  
> **1983: Richard Stallman starts the GNU Project**

```
  +--------------------------------------------------+
  | Goal: Create a completely FREE, open-source OS   |
  | Result: Complete set of utilities and tools BUT  |
  |         no working kernel yet.                   |
  +--------------------------------------------------+
              |
              v
  1991: Linus Torvalds writes the Linux Kernel
  +--------------------------------------------------+
  | Finnish university student Linus Torvalds builds |
  | the missing piece: the OS kernel.                |
  | He releases it publicly under GPL license.       |
  +--------------------------------------------------+
              |
              v
  GNU + Linux Kernel = Complete OS
  +--------------------------------------------------+
  | GNU tools + Linux kernel = a full working OS.    |
  | GNU Public License (GPL): Anyone can freely use, |
  | modify, distribute, and build upon the code.     |
  | This openness is WHY it powers the internet.     |
  +--------------------------------------------------+
              |
              v
  Today: Thousands of Linux distributions exist
  +--------------------------------------------------+
  | Any developer can take the kernel and build a    |
  | custom OS around it for any purpose:             |
  | servers, phones, cars, medical devices,          |
  | security workstations, supercomputers.           |
```

## 2.3 Linux Architecture — Six Layers

> **KEY CONCEPT: The Request Flow**
> Every action in Linux cascades sequentially through these layers:
> **USER ->  APPLICATION**  **->  SHELL  ->  FHS  ->  KERNEL  ->  HARDWARE**

> **LINUX ARCHITECTURE — All 6 Layers**  
> **LAYER 1: USER**

```
  +----------------------------------------------------------+
  | The human operator. Linux is MULTI-USER: multiple        |
  | accounts can work simultaneously and independently.      |
  | Root = superuser (admin). Regular users = restricted.    |
  +----------------------------------------------------------+
              |
              v
  LAYER 2: APPLICATIONS
  +----------------------------------------------------------+
  | Programs executing specific tasks:                       |
  | nano (text editor), nmap (network scanner), grep (search)|
  | Wireshark, Metasploit, tcpdump, Autopsy, Firefox         |
  +----------------------------------------------------------+
              |
              v
  LAYER 3: THE SHELL (Command-Line Interpreter)
  +----------------------------------------------------------+
  | Receives your typed commands. Translates human text      |
  | into OS instructions. Sends to FHS and kernel.           |
  | Types: Bash (default), Zsh, C shell, Fish, Ksh           |
  +----------------------------------------------------------+
              |
              v
  LAYER 4: FILESYSTEM HIERARCHY STANDARD (FHS)
  +----------------------------------------------------------+
  | The master filing system. Standardizes WHERE everything  |
  | lives on disk:                                            |
  |  /       = root (top of everything)                      |
  |  /home   = user personal directories                     |
  |  /bin    = essential binary executables (core commands)  |
  |  /etc    = system-wide configuration files               |
  |  /var    = variable data: logs, databases, email         |
  |  /tmp    = temporary files (loose permissions -- a target)|
  |  /usr    = user programs and libraries                   |
  +----------------------------------------------------------+
              |
              v
  LAYER 5: THE KERNEL
  +----------------------------------------------------------+
  | The core engine. Manages:                                |
  | * Process scheduling (which app gets CPU time when)      |
  | * Memory management (RAM allocation per process)         |
  | * Hardware drivers (communication with physical devices) |
  | * System calls (applications request services via kernel)|
  | * Security enforcement (permissions, namespaces)         |
  +----------------------------------------------------------+
              |
              v
  
LAYER 6: HARDWARE
  +----------------------------------------------------------+
  | Internal: CPU, RAM, Hard Drive, NIC, GPU (on motherboard)|
  | Peripheral: Monitor, Keyboard, Mouse, Printer, USB       |
  +----------------------------------------------------------+
```

## 2.4 Linux Distributions — Security Analyst's Map

> **NOTE: What is a Distro?**
> Because the Linux kernel is open-source, anyone can package it with different tools and create their own OS.
> A Distribution (distro/flavor) = Linux kernel + pre-selected applications + package manager + desktop environment.
> Analogy: The kernel is a car engine. Different manufacturers build sports cars, buses, and trucks around the same engine.

> **LINUX DISTRO FAMILY TREE**  
> **LINUX DISTRO FAMILY TREE (Security Focus):**  
> **LINUX KERNEL (core, open-source)**  
> **|**

```
        +------ DEBIAN FAMILY ------------------+
        |         |                             |
        |    [UBUNTU]              [KALI LINUX]  [PARROT OS]
        |    User-friendly.         Penetration   Security-focused.
        |    Cloud & enterprise.    testing &     Forensics + pentesting
        |    Excellent GUI.         forensics.    with friendly GUI.
        |    Industry standard.     Run in VM!
        |
        +------ RED HAT FAMILY -----------------+
                  |                             |
             [RHEL]                        [AlmaLinux]
             Red Hat Enterprise Linux.      Free RHEL replacement.
             Paid subscription.             Enterprise servers.
             Corporate live support.        Drop-in CentOS successor.
```

| **Distro** | **Family** | **Cost** | **Primary Use Case** | **Pre-installed Security Tools** |
| --- | --- | --- | --- | --- |
| **Kali Linux** | Debian | Free | Penetration testing, digital forensics, CTF competitions. | Metasploit, Burp Suite, Nmap, Wireshark, John the Ripper, Autopsy, Aircrack-ng, tcpdump, Hydra |
| **Parrot OS** | Debian | Free | Security research, privacy, forensics -- with user-friendly desktop. | Same as Kali but with lighter resource footprint and better GUI experience. |
| **Ubuntu** | Debian | Free | General use, cloud servers, enterprise desktops, development. | Basic (add tools via apt). Excellent for learning Linux and hosting security tools. |
| **RHEL** | Red Hat | Paid subscription | Large enterprise production servers requiring vendor support. | Enterprise-grade hardening tools, SELinux enforcing mode, audit daemon. |
| **AlmaLinux** | Red Hat | Free | Enterprise servers needing RHEL compatibility without cost. | SELinux, audit tools, same package ecosystem as RHEL. |

> **IMPORTANT: Best Practice: Always Run Kali in a VM**
> Kali Linux comes pre-loaded with powerful OFFENSIVE tools (Metasploit, password crackers, network scanners).
> Running Kali as your main OS means those tools are always present and could be triggered accidentally.
> Always run Kali INSIDE a Virtual Machine on your main OS:
> * If a test goes wrong, delete the VM -- your host machine is unaffected.
> * Prevents accidental execution of offensive tools on unauthorized targets.
> * Keeps your personal files separate from test environments.
> * VM snapshots let you reset to a clean state between engagements.

## 2.5 Package Managers — Installing & Updating Software

> **NOTE: What is a Package?**
> Linux software is distributed as PACKAGES -- compressed archives containing all files, libraries, and metadata an application needs.
> DEPENDENCIES: Other packages or libraries that your app requires to run. Package managers resolve these automatically.
> SECURITY IMPORTANCE: Running 'apt update && apt upgrade' applies ALL available security patches to every installed package.
> Not updating = leaving known vulnerabilities permanently open. This is equivalent to not patching.

| **Family** | **Core Manager** | **File Extension** | **CLI Tool** | **Install Command Example** |
| --- | --- | --- | --- | --- |
| **Debian (Kali, Ubuntu, Parrot)** | dpkg |   .deb | APT (Advanced Package Tool) | sudo apt install wireshark |
| **Red Hat (RHEL,** **AlmaLinux)** | RPM |   .rpm | YUM / DNF | sudo yum install nmap |

> **APT PACKAGE MANAGER — Essential Commands**
> **APT ESSENTIAL COMMANDS:**
> 
> **sudo** **apt update**              # Refresh package lists from repositories
> **sudo** **apt upgrade**             # Install all available security patches
> **sudo** **apt install [package]**   # Install a new application
> **sudo** **apt remove [package]**    # Remove an application
> **apt search [keyword]**         # Search for packages by name/description
> **apt show [package**]           # Show detailed info about a package
> 
> **SECURITY WORKFLOW -- Run these regularly:**
> **sudo** **apt update &&** **sudo** **apt upgrade -y**
> This single command fetches and installs ALL pending security patches.

## 2.6 The Linux Shell — Types & Identification

| **Shell** | **Full Name** | **Prompt Symbol** | **Key Characteristics** |
| --- | --- | --- | --- |
| **Bash** | Bourne-Again Shell | $ | Default for most Linux distros. THE standard for security scripting, log automation, and Bash scripting. Most tutorials and courses use Bash. |
| **Zsh** | Z Shell | % | Highly customizable. Interactive features like better tab completion and spell correction. Popular with developers (Oh My Zsh framework). |
| **Csh** **/** **Tcsh** | C Shell / Enhanced C Shell | % | Syntax resembles the C programming language. Less common in security work. Legacy systems. |
| **Ksh** | Korn Shell | $ | Combines Bash and Csh features. Found on some enterprise UNIX/Linux systems. |
| **Fish** | Friendly Interactive Shell | > | Beginner-friendly auto-suggestions. Not POSIX compliant -- scripts may not transfer to other shells. |

> **TIP: Reading Your Shell Prompt**  
> **The prompt tells you critical context BEFORE you type any command:**  
> **analyst@linux-server:/home/analyst$**  
> **|       |             |            |**

```
  |       |             |            +-- $ means regular user (Bash/Ksh)
  |       |             +-- Current working directory
  |       +-- Hostname (machine name)
  +-- Username

  root@linux-server:/# 
  |                  |
  |                  +-- # means ROOT USER (superuser -- maximum privileges)
  +-- 'root' username

  IMPORTANT: When prompt shows # you have ROOT access.
  Every command runs with maximum system privileges.
  A typo could permanently damage the system. Double-check everything.
```

## 2.7 Standard Streams — stdin, stdout, stderr

> **STANDARD STREAMS — stdin / stdout / stderr**  
> **EVERY terminal interaction uses THREE data streams:**

```
  +-----------------+      +------------------+      +-------------------+
  |   stdin (0)     |      |    THE SHELL     |      |   stdout (1)      |
  | Standard Input  | ---> | Processes your   | ---> | Standard Output   |
  |                 |      | command          |      | Successful result |
  | Source: Keyboard|      +------------------+      | shown on screen   |
  | or piped output |              |                 +---------+---------+
  +-----------------+              |                            |
                                   | (if error)                 v
                                   v                   Can be redirected:
                          +------------------+        command > file.txt
                          |   stderr (2)     |        (writes stdout to file)
                          | Standard Error   |
                          | Error messages   |
                          | shown on screen  |
                          +------------------+
                          Can be redirected:
                          command 2> errors.txt

  EXAMPLES:
  $ echo hello                   # stdin: 'echo hello'
  hello                          # stdout: 'hello' printed to screen

  $ eco hello                    # stdin: 'eco hello' (typo)
  command not found: eco         # stderr: error message displayed

  $ ls /etc > etc_list.txt       # stdout REDIRECTED to file, not screen
  $ ls /fakedir 2> errors.txt    # stderr REDIRECTED to file
```

## 2.8 Essential Terminal Keyboard Shortcuts

| **Shortcut** | **What It Does** | **When to Use It** |
| --- | --- | --- |
| **CTRL + C** | TERMINATE the current running command/process immediately. | Process hangs, script runs forever, accidentally started long operation you need to cancel. MOST IMPORTANT shortcut. |
| **CTRL + Z** | SUSPEND (pause) the current process. Send it to background. | Temporarily stop a process without killing it. Use 'fg' to bring it back. |
| **CTRL +** **L  or**  **clear** | Clear the terminal screen. Start fresh visually. | Screen is cluttered with output. Cursor stays in same session -- history is not deleted. |
| **CTRL + A** | Move cursor to the BEGINNING of the current line. | You need to edit the start of a long command without retyping it. |
| **CTRL + E** | Move cursor to the END of the current line. | You need to add text at the end of a partially edited command. |
| **Up / Down Arrow** | Scroll through command HISTORY. Up = previous. Down = next. | Repeat a recently used command. Avoid retyping long commands. |
| **Tab** | AUTO-COMPLETE command names, file paths, and directory names. | You know the first few characters. Tab fills in the rest. Double-Tab shows all options. |
| **CTRL + R** | SEARCH command history interactively. Type partial command to find it. | Find a command you used last week without scrolling through hundreds of history entries. |

## 2.9 Module 2 Quick Review

| **Question** | **Answer** |
| --- | --- |
| **Who created Linux and what is its license?** | Linus Torvalds created the kernel (1991). GNU tools by Richard Stallman. Combined as GNU/Linux. Licensed under GPL -- free to use, modify, and distribute. |
| **Name the 6 Linux architecture layers.** | User -> Application -> Shell -> FHS -> Kernel -> Hardware. Each layer passes instructions to the one below it. |
| **What is the Kernel's job?** | Manages process scheduling, RAM allocation, hardware drivers, system calls, and security enforcement. It is the core engine of the OS. |
| **Kali Linux vs. Ubuntu?** | Kali: penetration testing/forensics, pre-loaded with offensive tools, run in VM. Ubuntu: user-friendly, general use/cloud, nothing pre-installed. |
| **APT vs. YUM?** | APT: Debian family (Kali, Ubuntu). YUM/DNF: Red Hat family (RHEL, AlmaLinux). Both install packages and auto-resolve dependencies. |
| **What does CTRL+C do?** | Terminates the currently running command/process. The most critical terminal shortcut for cancelling hanging scripts. |
| **$** **vs. #** **in the prompt?** | $ = regular user (limited permissions). # = root/superuser (maximum privileges -- every command has full system access). |
| **What is stdin/stdout/stderr?** | stdin: your typed input. stdout: successful command output shown on screen. stderr: error messages. All three can be redirected to files. |

**MODULE 3**

# Linux Commands in the Bash Shell

## 3.1 The Filesystem Hierarchy Standard (FHS)

> **IMPORTANT: Golden Rule: Linux is 100% Case-Sensitive**
> 'Desktop' and 'desktop' are TWO COMPLETELY DIFFERENT directories.
> 'Report.txt' and 'report.txt' are TWO DIFFERENT files.
> This is a constant source of errors for beginners. Always check your case.

> **FHS DIRECTORY TREE — Full Structure**  
> **LINUX FILESYSTEM TREE (FHS):**  
> **/ (Root -- top of everything. Every file lives under here.)**  
> **|**

```
  +-- /home       User personal directories
  |     +-- /home/analyst     Your home directory (you start here)
  |     +-- /home/alice       Another user's home
  |
  +-- /bin        Core binary commands (ls, cat, chmod, grep)
  |
  +-- /etc        System-wide configuration files
  |               (network config, user passwords, services)
  |
  +-- /var        Variable data that changes frequently
  |     +-- /var/log          System and application log files
  |     +-- /var/mail         Email storage
  |
  +-- /tmp        Temporary files (cleared on reboot)
  |               SECURITY NOTE: World-writable. Malware often
  |               writes here. Monitor /tmp closely.
  |
  +-- /usr        User programs and libraries
  |     +-- /usr/bin          Most user-installed commands
  |     +-- /usr/lib          Shared libraries
  |
  +-- /root       Root user's home directory (NOT /home/root)
  |
  +-- /proc       Virtual filesystem -- live kernel/process info
                  (not real files on disk, generated in memory)
```

| **Path Type** | **Definition** | **Example** |
| --- | --- | --- |
| **Absolute Path** | Starts from root (/). Works from ANY directory. Always unambiguous. |   /home/analyst/logs/access.txt |
| **Relative Path** | Starts from your CURRENT directory. Shorter but context-dependent. | If you are in /home/analyst: just use logs/access.txt |
|   **~  (Tilde)** | Shortcut for your home directory. Expands to /home/username. |   cd ~ is same as cd /home/analyst |
|   **.  (Single dot)** | Represents the CURRENT directory. |   ./script.sh runs script in current folder |
|   **.. (Double dot)** | Represents the PARENT directory (one level up). |   cd .. moves from /home/analyst to /home |

## 3.2 Navigation Commands

> **pwd** **—  Print** **Working Directory — shows your exact current location**
> **Syntax:** pwd
> **$** **pwd**   →  /home/analyst/projects  (you are HERE)

> **ls** **— List — shows contents of a directory**
> **Syntax:** ls [options] [directory]
> **$ ls**   → Lists files and folders in current directory
> **$ ls /etc**   → Lists contents of /etc (absolute path)
> **$ ls -a**   → Lists ALL files including HIDDEN files (names starting with .)
> **$ ls -l**   → **Long** **format:** permissions, owner, group, size, date, name
> **$ ls -la**   → **Combined:** ALL files in LONG format (most useful for security)
> **$ ls -l /var/log**   → Long listing of /var/log directory

> **EXAMPLE: Reading ls -l Output**  
> **-rw-r--r-- 1 analyst security 4096 May 15 09:32 report.txt**  
> **|          | |       |        |    |              |**

```
  |          | |       |        |    |              +-- Filename
  |          | |       |        |    +-- Date last modified
  |          | |       |        +-- File size in bytes
  |          | |       +-- Group name
  |          | +-- Owner (username)
  |          +-- Number of hard links
  +-- Permission string (see Section 3.6 for full explanation)
```

> **cd** **— Change Directory — move to a different folder**
> **Syntax:** cd [destination]
> **$ cd logs**   → Move into 'logs' folder (relative path)
> **$ cd /etc**   → Move to /etc (absolute path)
> **$ cd** **..**   → Go UP one level to parent directory
> **$ cd ~**   → Go directly to your home directory
> **$ cd -**   → Go back to the PREVIOUS directory you were in
> **$ cd /var/log/apache2**   → Move directly to apache2 logs (absolute)

## 3.3 Reading File Contents

> **cat** **— Concatenate — dumps entire file contents to screen**
> **Syntax:** cat [file]
> **$ cat report.txt**   → Prints entire file. Good for SHORT files.
> **$ cat file1.txt file2.txt**   → Prints both files one after the other
> **$ cat /etc/passwd**   → Reads the user account file (analyst use case)

> **head /** **tail** **— Show** **first (head) or last (tail) N lines of a file (default: 10 lines)**
> **Syntax:** head/tail [-n N] [file]
> **$ head access.log**   → Shows first 10 lines of access log
> **$ tail access.log**   → Shows last 10 lines (most recent entries)
> **$ tail -n 20 syslog**   → Shows last 20 lines
> **$ tail -f /var/log/syslog**   → FOLLOW mode: shows new lines in REAL-TIME as they are written

> **TIP: tail -f for Live Log Monitoring**
> tail -f /var/log/auth.log
> The -f (follow) flag makes tail CONTINUOUSLY update as new lines are written to the file.
> Security use: Monitor authentication logs LIVE during a suspected brute-force attack.
> Every failed or successful login attempt appears on screen in real-time as it happens.
> Press CTRL+C to stop following.

> **less** **— View large files one page at a time — prevents screen flooding**
> **Syntax:** less [file]
> **$ less massive_access.log**   → Opens file for paged reading
> **$**    →    Spacebar: next page, b: previous page,  q: quit,  /search: search in file

## 3.4 Managing Directories and Files

| **Command** | **Syntax** | **What It Does** | **Key Notes** |
| --- | --- | --- | --- |
| **mkdir** | mkdir [name] | Creates a new directory (folder). |   mkdir drafts  \|  mkdir -p a/b/c (creates nested dirs) |
| **rmdir** | rmdir [name] | Deletes an EMPTY directory. | Safety feature: ONLY works if dir is empty. Use rm -r for non-empty. |
| **touch** | touch [filename] | Creates a new EMPTY file. |   touch report.txt  \|  Also updates file timestamp if file exists. |
| **rm** | rm [file] | Permanently DELETES a file. NO recycle bin. |   rm report.txt  \|  rm -r folder (recursively delete folder + contents)  \|  WARNING: rm -rf / destroys everything! |
| **cp** | cp [source] [dest] | Copies a file or directory. |   cp report.txt /backup/  \|  cp -r folder/ /backup/ (recursive for dirs) |
| **mv** | mv [source] [dest] | Moves file OR renames it (same dir). |   mv old.txt /archive/  (move)  \|  mv old.txt new.txt (rename) |
| **nano** | nano [file] | Opens beginner-friendly text editor. |   CTRL+O = Save  \|  CTRL+X = Exit  \|  CTRL+W = Search  \|  CTRL+K = Cut line |

### Output Redirection — Writing Command Output to Files

> **OUTPUT REDIRECTION — > vs >>**
> **OVERWRITE (>):** Replaces entire file content
> echo 'Incident detected at 14:32' > incident_log.txt
> ls **/etc** > etc_contents.txt
> 
> **APPEND (>>):** Adds to END of file without deleting existing content
> echo 'Follow-up action taken at 15:00' >> incident_log.txt
> **ps** aux >> running_processes.txt
> 
> **REDIRECT + CREATE:** If file doesn't exist, both > and >> create it.
> 
> **ANALOGY:**
> > is like CTRL+A then DELETE then type (wipes everything, starts fresh)
> >> is like pressing END then Enter then type (adds to the bottom)

## 3.5 Finding and Filtering Data

> **KEY CONCEPT: The Analyst's Core Task**
> Security analysts spend enormous time finding specific information inside massive datasets.
> Typical scenario: A 50GB log file has 50 million lines. You need lines containing one specific IP address.
> Manual reading is impossible. grep, find, and pipe are the tools that make this feasible.

> **grep** **— Search INSIDE files for lines matching a pattern — prints matching lines only**
> **Syntax:** grep [options] 'pattern' [file]
> **$ grep 'ERROR' system.log**   → Find all error lines in system.log
> **$ grep 'FAILED' /var/log/auth.log**   → Find all failed login attempts
> **$ grep -i** **'error' system.log**   → -i = case-insensitive (matches ERROR, Error, error)
> **$ grep -r 'password' /etc**   → -r = search recursively in ALL files under /etc
> **$ grep -n 'ERROR' system.log**   → -n = show LINE NUMBERS next to matches
> **$ grep -v 'INFO' system.log**   → -v = INVERT: show lines that do NOT contain 'INFO'
> **$ grep '192.168.1.100' access.log**   → Find all requests from a specific IP address
> **$ grep -c 'FAILED'** **auth.log**   → -c = count how many lines matched (no output of lines)

> **|** **— PIPE — sends output of first command as input to second command**
> **Syntax:** command1 | command2
> **$ ls /etc** **| grep 'network'**   → List /etc then filter for 'network' in filenames
> **$** **ps** **aux | grep 'apache'**   → Show running processes then find apache processes
> **$ cat auth.log | grep 'FAILED' | grep '192.168.1.50'**   → **multi-filter:** find failed logins FROM specific IP
> **$ ls -l | grep '^d'**   → List only DIRECTORIES (entries starting with 'd')
> **$ history | grep 'sudo'**   → Find all previously used sudo commands

> **TIP: Pipe Analogy**
> Think of pipe as a physical plumbing pipe:
> First command produces water (output). Pipe carries that water. Second command receives and filters it.
> You can chain MULTIPLE pipes:
> cat access.log | grep 'POST' | grep '500' | grep '2024-05-15'
> = Find all HTTP POST requests that returned a 500 error on May 15, 2024
> Each pipe narrows the dataset further -- from millions of lines to exactly what you need.

> **find** **— Search the FILESYSTEM for files/directories matching conditions**
> **Syntax:** find [path] [criteria]
> **$ find /home -name '*.log'**   → Find all .log files under /home
> **$ find / -name 'secret.txt'**   → Search entire filesystem for secret.txt (case-sensitive)
> **$ find / -iname** **'secret.txt'**   → -iname = case-INSENSITIVE search
> **$ find /var/log -mtime** **-3**   → Files MODIFIED in the last 3 days
> **$ find /tmp** **-mtime** **-1**   → Files modified in the last 1 day in /tmp (check for recent malware drops)
> **$ find / -perm -4000**   → Find SUID files (potential privilege escalation targets)
> **$ find / -size +100M**   → Find files larger than 100 MB (data exfiltration indicator)
> **$ find /home -user analyst**   → Find all files owned by user 'analyst'

## 3.6 Permissions and Security (Authorization)

> **KEY CONCEPT: Principle of Least Privilege**
> Users should have ONLY the exact access they need to do their jobs -- nothing more.
> This is the most fundamental security principle applied at the filesystem level.
> Example: A web server process should be able to READ website files but NOT WRITE to them.
> If the web server is compromised, the attacker cannot modify website content.

### Understanding the 10-Character Permission String

> **PERMISSION STRING — Full Breakdown**  
> **PERMISSION STRING FORMAT from ls -l:**  
> **drwxrwxrwx**  
> **|   |   |   |**

```
  |   |   |   +-- OTHER permissions (positions 8-10: everyone else)
  |   |   +------- GROUP permissions (positions 5-7: file's group)
  |   +----------- USER/OWNER permissions (positions 2-4)
  +--------------- FILE TYPE (position 1)

  POSITION 1 -- FILE TYPE:
  -  = Regular file
  d  = Directory
  l  = Symbolic link (shortcut)

  PERMISSION LETTERS (positions 2-10):
  r  = Read    (value: 4)
  w  = Write   (value: 2)
  x  = Execute (value: 1)
  -  = Permission NOT granted (value: 0)

  FULL EXAMPLES:
  -rw-r--r--  = Regular file. Owner can read+write. Group can read. Others can read.
  drwxr-xr-x  = Directory. Owner can rwx. Group can r-x. Others can r-x.
  -rwx------  = File. Owner can do everything. Group and Others have ZERO access.
  -rwxrwxrwx  = World-writable file. DANGEROUS: anyone can read, modify, execute.
```

### Numeric (Octal) Permission Notation

> **OCTAL PERMISSIONS — Number to Letter Translation**  
> **Each permission group (owner/group/other) converts to a number:**  
> **r=4, w=2, x=1, -=0**  
> **rwx = 4+2+1 = 7   (full access)**  
> **rw- = 4+2+0 = 6   (read + write, no execute)**  
> **r-x = 4+0+1 = 5   (read + execute, no write)**  
> **r-- = 4+0+0 = 4   (read only)**  
> **--- = 0+0+0 = 0   (no access)**  
> **COMMON PERMISSION SETS:**  
> **chmod 755 script.sh   =  rwxr-xr-x  (owner full, others read+execute)**  
> **chmod 644 report.txt  =  rw-r--r--  (owner read+write, others read only)**

```
  chmod 600 private.key =  rw-------  (ONLY owner can read+write -- SSH keys)
  chmod 700 script.sh   =  rwx------  (ONLY owner can do anything)
  chmod 777 file.txt    =  rwxrwxrwx  (world-writable -- AVOID in production)
```

> **chmod**  **—**  **Change file permissions (read/write/execute for user/group/other)**
> **Syntax:** chmod [who][+/-/=][permissions] [file]   OR   chmod [octal] [file]
> **$** **chmod** **g+w** **reports.txt**   →  ADD write permission for GROUP
> **$** **chmod** **o-rwx** **secret.txt**   →  REMOVE all permissions from OTHERS
> **$** **chmod** **u+x** **script.sh**   →  ADD execute permission for OWNER (to run a script)
> **$** **chmod** **u=rwx,g=r,o=r pub.txt**   →  SET exactly: owner full, group read-only, others read-only
> **$** **chmod** **755 deploy.sh**   →  Octal: owner rwx, group r-x, others r-x
> **$** **chmod** **600** **~/.ssh/id_rsa**   →  SSH private key: ONLY owner can read/write -- required by SSH
> **$** **chmod** **777 /tmp/test.txt**   →  World-writable -- AVOID (security risk)

> **chown** **— Change file owner and/or group (requires** **sudo)**
> **Syntax:** chown [user]: [group] [file]
> **$** **sudo** **chown** **alice** **data.txt**   → Transfer ownership to user 'alice'
> **$** **sudo** **chown** **:hr_team** **data.txt**   →  Change GROUP to 'hr_team' (colon prefix = group)
> **$** **sudo** **chown** **alice:hr_team** **data.txt**   → Change BOTH owner to alice AND group to hr_team
> **$** **sudo** **chown** **-R analyst /var/log/app**   → Recursively change all files in folder

## 3.7 User Management (Authentication)

> **IMPORTANT:** **sudo** **— Super User Do**
> **Logging in DIRECTLY as root is a massive security risk:**
> * Every command runs with unlimited power -- a typo can destroy the system.
> * Root login creates no user-level accountability (who did what?).
> * Root account is the #1 brute-force target.
> 
> sudo is the correct approach: grants ROOT privileges for ONE specific command only.
> After the command, privileges revert to normal user level automatically.
> sudo logs EVERY elevated command to /var/log/auth.log -- full accountability.
> 
> sudo apt update          (run apt as root for this one command only)
> sudo chmod 600 key.pem   (change permissions with root authority)

> **useradd**  **—**  **Create a new user account**
> **Syntax:** sudo useradd [options] [username]
> **$** **sudo** **useradd** **jsmith**   →  Create basic user account (no home dir by default on some systems)
> **$** **sudo** **useradd** **-m** **jsmith**   →  -m: create home directory /home/jsmith automatically
> **$** **sudo** **useradd** **-g security** **jsmith**   →  -g: set PRIMARY group to 'security'
> **$** **sudo** **useradd** **-G** **admin,finance** **jsmith**   →  -G: add to SUPPLEMENTAL groups 'admin' and 'finance'
> **$** **sudo** **useradd** **-g security -G** **admin,finance** **-m** **jsmith**   →  Full creation: home dir + primary + supplemental groups

> **usermod**  **—**  **Modify an existing user account's settings**
> **Syntax:** sudo usermod [options] [username]
> **$** **sudo** **usermod** **-aG** **marketing** **jsmith**   →  APPEND to group 'marketing' (the -a flag is CRITICAL)
> **$** **sudo** **usermod** **-L** **jsmith**   →  -L: LOCK account (user cannot login -- for departing employees)
> **$** **sudo** **usermod** **-U** **jsmith**   →  -U: UNLOCK a previously locked account
> **$** **sudo** **usermod** **-g** **developers** **jsmith**   →  Change PRIMARY group to 'developers'

> **IMPORTANT: CRITICAL: Always use -a with -G**
> WRONG: sudo usermod -G marketing jsmith
> This REPLACES all secondary groups with ONLY 'marketing'.
> If jsmith was in admin, finance, devops -- all gone instantly.
> 
> CORRECT: sudo usermod -aG marketing jsmith
> The -a flag means APPEND -- adds marketing WITHOUT removing existing groups.
> This is one of the most common and most damaging Linux user management mistakes.

> **userdel**  **—**  **Delete a user account from the system**
> **Syntax:** sudo userdel [options] [username]
> **$** **sudo** **userdel** **jsmith**   →  Delete user account. Home directory and files are PRESERVED.
> **$** **sudo** **userdel** **-r** **jsmith**   →  -r: Delete user AND permanently wipe home directory + mail spool.

### Viewing User and Group Information

> **USER INFORMATION COMMANDS**
> **id [username]**          # Show user's UID, GID, and all group memberships
> **id** **jsmith**              # Output: uid=1001(jsmith) gid=1001(security) groups=...
> 
> **whoami**                 # Show CURRENT user's username
> 
> **cat /etc/passwd**        # List ALL user accounts on the system
> # **Format:** username:x:UID:GID:comment:home:shell
> # **Example:** analyst:x:1000:1000:Analyst User:/home/analyst:/bin/bash
> 
> **cat /etc/group**         # List ALL groups and their members
> # **Format:** groupname:x:GID:member1,member2
> 
> **cat /etc/shadow**        # Hashed passwords (requires sudo -- security sensitive)

## 3.8 Getting Help in Linux

> **man**  **—**  **Manual pages — complete official documentation for any command**
> **Syntax:** man [command]
> **$ man ls**   →  Open full manual for the ls command (use q to quit)
> **$ man** **chmod**   →  Read all chmod options and usage examples
> **$ man grep**   →  Comprehensive grep documentation with all flags
> **$ man -k 'user'**   →  Search all manuals for keyword 'user' (same as apropos)

> **whatis**  **—**  **One-line summary of what a command does**
> **Syntax:** whatis [command]
> **$** **whatis** **cat**   →  Output: concatenate files and print on the standard output
> **$** **whatis** **chmod**   →  Output: change file mode bits
> **$** **whatis** **grep**   →  Output: print lines that match patterns

> **apropos**  **—**  **Search ALL man pages for a keyword — use when you forgot the command name**
> **Syntax:** apropos [-a] [keyword(s)]
> **$ apropos password**   →  Find all commands related to password management
> **$ apropos -a change password**   →  Find commands related to BOTH 'change' AND 'password'
> **$ apropos network**   →  Find all network-related commands and tools
> **$ apropos -a list user**   →  Find commands for listing user information

## 3.9 Complete Command Quick-Reference Card

### Navigation & File Reading

| **Command** | **Purpose** | **Key Options** |
| --- | --- | --- |
| **pwd** | Show current directory | (no options needed) |
| **ls** | List directory contents | -a (all/hidden), -l (long format), -la (both combined) |
| **cd [path]** | Change directory | .. (up), ~ (home), / (root), - (previous) |
| **cat [file]** | Print entire file | Combine files: cat file1 file2 |
| **head [file]** | First N lines (default 10) | -n 5 (show 5 lines) |
| **tail [file]** | Last N lines (default 10) | -n 5 (show 5 lines), -f (follow live output) |
| **less [file]** | Paged file viewing | Spacebar=next, q=quit, /=search |

### File & Directory Management

| **Command** | **Purpose** | **Key Example** |
| --- | --- | --- |
| **mkdir** **[name]** | Create directory | mkdir reports  \|  mkdir -p a/b/c |
| **rmdir** **[name]** | Remove EMPTY directory | rmdir oldreports |
| **touch [name]** | Create empty file | touch incident.txt |
| **rm [file]** | Delete file (permanent) | rm report.txt  \|  rm -r folder/  (use with caution) |
| **cp [src] [dst]** | Copy file or directory | cp file.txt /backup/  \|  cp -r folder/ /backup/ |
| **mv [src] [dst]** | Move or rename | mv old.txt /archive/  \|  mv old.txt new.txt |
| **nano [file]** | Text editor | CTRL+O save, CTRL+X exit, CTRL+W search |
| **echo 'text' > file** | Write to file (overwrite) | echo 'start' > log.txt |
| **echo 'text' >> file** | Append to file | echo 'more' >> log.txt |

### Finding & Filtering

| **Command** | **Purpose** | **Key Example** |
| --- | --- | --- |
| **grep** **'pattern' file** | Search inside file for text | grep 'ERROR' sys.log  \|  grep -i -r 'password' /etc |
| **cmd1 \| cmd2** | Pipe output to next command | ls /etc \| grep 'conf'  \|  cat auth.log \| grep 'FAILED' |
| **find [path] [criteria]** | Find files on filesystem | find /tmp -mtime -1  \|  find / -name '*.log' |

### Permissions

| **Command** | **Purpose** | **Key Example** |
| --- | --- | --- |
| **ls -l** | View permissions | drwxr-xr-x  (d=dir, rwx=owner, r-x=group, r-x=others) |
| **chmod** **[mode] file** | Change permissions | chmod 600 key.pem  \|  chmod g+w report.txt |
| **chown** **[user:grp] file** | Change owner/group | sudo chown alice:team data.txt |

### User Management

| **Command** | **Purpose** | **Key Example** |
| --- | --- | --- |
| **sudo** **[command]** | Run as root (one command only) | sudo apt update  \|  sudo chmod 600 key |
| **useradd** **[options] user** | Create user | sudo useradd -m -g security jsmith |
| **usermod** **[options] user** | Modify user | sudo usermod -aG marketing jsmith  \|  -L (lock) |
| **userdel** **[-r] user** | Delete user | sudo userdel -r jsmith (-r removes home dir) |
| **id [user]** | View user's groups/UID | id jsmith |
| **whoami** | Show current username | (no options) |

### Getting Help

| **Command** | **Purpose** | **Key Example** |
| --- | --- | --- |
| **man [cmd]** | Full manual page | man chmod  (q to quit) |
| **whatis** **[cmd]** | One-line description | whatis grep |
| **apropos** **[keyword]** | Find command by keyword | apropos password  \|  apropos -a change password |

## 3.10 Complete Course 4 Glossary

| **Term** | **Definition** |
| --- | --- |
| **Absolute file path** | The complete file path starting from root (/). Works from any location. Example: /home/analyst/logs/access.txt |
| **APT (Advanced Package Tool)** | CLI package management tool for Debian-based systems (Ubuntu, Kali). Installs, updates, and removes software. Command: apt install/update/upgrade/remove. |
| **Application** | A program that performs a specific task (browser, text editor, nmap, Wireshark). |
| **Argument (Linux)** | Specific information provided to a command telling it what to act on. Example: in 'cat report.txt', 'report.txt' is the argument. |
| **Authentication** | The process of verifying who someone is before granting access to a system. |
| **Authorization** | The process of determining what a verified user is allowed to access or do on a system. |
| **Bash** | Bourne-Again Shell. The default shell in most Linux distributions. Standard for security scripting and automation. |
| **BIOS** | Basic Input/Output System. Older firmware (pre-2007) that initializes hardware on boot. Replaced by UEFI on modern systems. |
| **Bootloader** | Software that loads the operating system into memory during the boot process. Examples: GRUB (Linux), Windows Boot Manager. |
| **CLI** | Command-Line Interface. Text-based interface for interacting with the OS. Preferred by security analysts for speed, automation, and forensic history. |
| **chmod** | Change Mode. Linux command for modifying file permissions (read/write/execute) for owner, group, and others. |
| **chown** | Change Owner. Linux command for transferring file ownership to a different user or group. |
| **CPU** | Central Processing Unit. The main processor executing all computations and logic in a computer. |
| **Directory** | A container in the filesystem that organizes and stores files and other directories (equivalent to a folder). |
| **Distribution (Distro)** | A complete Linux operating system built around the Linux kernel with specific pre-installed tools and interfaces (Kali, Ubuntu, RHEL, etc.). |
| **FHS** | Filesystem Hierarchy Standard. The standardized directory structure all Linux systems follow, defining where specific types of files live (/bin, /etc, /var, /home, etc.). |
| **File path** | The location of a file or directory in the filesystem. Can be absolute (from root) or relative (from current directory). |
| **Filtering** | Selecting only data that matches a specified condition. Core analyst skill using grep, find, and pipes. |
| **grep** | Global Regular Expression Print. Command that searches inside files for lines matching a specified text pattern. Core analysis tool. |
| **GUI** | Graphical User Interface. Visual interface using windows, icons, and menus. Intuitive but limited for security work compared to CLI. |
| **Hard Drive** | Hardware component for long-term (persistent) storage. Data survives power cycles. Slower than RAM but much larger capacity. |
| **Hardware** | Physical components of a computer: CPU, RAM, hard drive, NIC, GPU, and peripheral devices. |
| **Hypervisor** | Software that creates and manages Virtual Machines on a physical host. Type 1 (bare-metal): ESXi, KVM, Hyper-V. Type 2 (hosted): VirtualBox, VMware Workstation. |
| **Kali Linux** | Debian-based Linux distribution purpose-built for penetration testing and digital forensics. Pre-loaded with security tools. Always run in a VM. |
| **Kernel** | The core engine of the Linux OS. Manages process scheduling, RAM allocation, hardware drivers, and system security enforcement. |
| **KVM** | Kernel-based Virtual Machine. Open-source hypervisor built directly into the Linux kernel. Used in enterprise cloud infrastructure. |
| **Legacy OS** | An outdated operating system still in use, no longer receiving security patches. Permanently vulnerable to any newly discovered exploits. |
| **Linux** | Open-source operating system created by Linus Torvalds (1991). Powers 96%+ of web servers. THE foundation of cybersecurity tooling. |
| **nano** | A simple, beginner-friendly command-line text editor. CTRL+O saves, CTRL+X exits. |
| **Operating System (OS)** | Core software bridging user and hardware. Translates human actions into binary hardware instructions. Manages all computer resources. |
| **Options (flags)** | Modifiers added to commands (usually starting with -) that change behavior. Example: ls -la adds 'all' and 'long format' to ls. |
| **Package** | A compressed archive containing an application's files, metadata, and dependency information for installation on Linux. |
| **Package Manager** | A tool that automates installing, updating, and removing software packages while automatically resolving dependencies (APT, YUM, dpkg, RPM). |
| **Permissions** | The access rights (read/write/execute) granted to the owner, group, and others for a specific file or directory. |
| **Pipe** **( \|** **)** | A shell operator that takes the output of one command and feeds it directly as input to the next command. Enables complex multi-step filtering. |
| **Principle of Least Privilege** | Users and processes should have ONLY the minimum access required to perform their function -- nothing more. Limits blast radius of compromise. |
| **RAM** | Random Access Memory. Short-term, high-speed workspace. Cleared completely when power is off. OS uses it for running processes. |
| **Relative file path** | A file path starting from the current working directory (not from root). Shorter but context-dependent. |
| **Root directory** **( /** **)** | The topmost directory in the Linux filesystem. Every single file and directory on the system exists somewhere under root. |
| **Root user** | The superuser account with unlimited system privileges. The # prompt indicates root. Should only be accessed via sudo, not direct login. |
| **Shell** | The command-line interpreter that receives typed commands and translates them into OS instructions. Bash is the standard. |
| **Standard error (stderr)** | Stream 2. Error messages returned when a command fails. Can be redirected with 2>. |
| **Standard input (stdin)** | Stream 0. Data entering the shell, typically from keyboard input or piped command output. |
| **Standard output (stdout)** | Stream 1. Successful command output displayed on screen. Can be redirected with > or >>. |
| **sudo** | Super User Do. Executes a single command with root privileges. Logs all usage to /var/log/auth.log. Safer than direct root login. |
| **UEFI** | Unified Extensible Firmware Interface. Modern replacement for BIOS. Supports Secure Boot, larger disks, faster boot times, enhanced security. |
| **Ubuntu** | User-friendly Debian-based Linux distribution. Widely used in cloud computing, enterprise desktops, and development environments. |
| **useradd** | Linux command for creating new user accounts. Key options: -m (create home dir), -g (primary group), -G (supplemental groups). |
| **userdel** | Linux command for deleting user accounts. -r flag also removes home directory and mail spool. |
| **usermod** | Linux command for modifying existing user accounts. -aG (append to groups), -L (lock), -U (unlock). |
| **Virtual Machine (VM)** | A software-defined computer running inside a physical host machine. Fully isolated from host and other VMs. Essential for safe malware analysis. |
| **Virtualization** | Using software to create virtual representations of physical hardware. Enables multiple OS environments on a single physical machine. |
| **whatis** | Command providing a one-line description of another command. Quick reference without opening full manual. |
| **World-writable file** | A file that ANY user on the system can read, write, or execute. Represented by rwxrwxrwx permissions. Security risk -- should be avoided. |

## 3.11 Complete Flashcard Review — All Modules

| **Question** | **Answer** |
| --- | --- |
| **What does an OS do?** | Bridges user and hardware. Translates human actions into binary machine instructions. Manages CPU, RAM, storage, and I/O resources for all running programs. |
| **GUI vs. CLI for security?** | CLI preferred: faster for complex operations, scriptable for automation, auto-logs all commands in bash_history (forensics), full remote server management via SSH. |
| **What is a hypervisor?** | Software creating/managing Virtual Machines. Type 1 (bare-metal, e.g., KVM, ESXi) runs directly on hardware. Type 2 (hosted, e.g., VirtualBox) runs inside an OS. |
| **Why run Kali in a VM?** | Kali has powerful offensive tools. If test fails or malware runs, delete VM -- host is safe. Snapshot before each exercise for clean reset. Keeps offensive tools isolated. |
| **Name 6 Linux architecture layers.** | User -> Application -> Shell -> FHS -> Kernel -> Hardware (top to bottom, each passes to the one below). |
| **What does the Kernel do?** | Core OS engine: manages process scheduling (CPU time), RAM allocation, hardware drivers, security enforcement, and handles system calls from applications. |
| **APT vs. YUM?** | APT: Debian family (Kali, Ubuntu, Parrot). YUM/DNF: Red Hat family (RHEL, AlmaLinux, CentOS). Both auto-resolve dependencies. sudo apt update && apt upgrade patches all. |
| **$** **vs. #** **in prompt?** | $ = regular user (limited privileges). # = root/superuser (unlimited privileges -- every command has full system access, caution required). |
| **stdin,** **stdout, stderr?** | stdin (0): input to shell. stdout (1): successful output to screen (redirect with >). stderr (2): error messages (redirect with 2>). |
| **What does** **pwd** **do?** | Print Working Directory -- shows your exact current location in the filesystem. Always run it if you are unsure where you are. |
| **ls -la vs ls?** | ls: basic listing. ls -l: long format with permissions, owner, size, date. ls -a: includes hidden files (dot-files). ls -la: combines both. |
| **Absolute vs. relative path?** | Absolute: starts from / (root), works from anywhere (e.g., /home/analyst/logs). Relative: starts from current directory (e.g., logs/access.txt). |
| **What does tail -f do?** | Follow mode: continuously displays NEW lines added to a file in real-time. Used to watch live logs during an active incident. Stop with CTRL+C. |
| **grep vs. find?** | grep: searches INSIDE files for text patterns. find: searches the FILESYSTEM for files/directories by name, date, size, permissions, etc. |
| **What does pipe** **( \|** **) do?** | Sends output of first command as input to second command. Enables chained filtering. E.g., cat auth.log \| grep 'FAILED' \| grep '10.0.0.5' |
| **Explain -rw-r--r--** | Regular file (-). Owner: read+write. Group: read only. Others: read only. In octal: 644. |
| **chmod** **600** **key.pem** **-- what does this mean?** | Owner can read+write (6=rw). Group has NO access (0). Others have NO access (0). Required for SSH private keys -- SSH will refuse to use a key with wider permissions. |
| **sudo** **vs. root login?** | sudo: executes ONE command as root, then reverts. Logged to auth.log. Root login: every command has max power. No per-command accountability. Root brute-forced more. |
| **Why -a flag matters in** **usermod** **-aG?** | Without -a: ALL existing supplemental groups are REPLACED by the new one. With -aG: new group is APPENDED, existing groups preserved. Forgetting -a causes accidental privilege removal. |
| **userdel** **vs.** **userdel** **-r?** | userdel: removes account but PRESERVES home directory and files. userdel -r: removes account AND permanently deletes home directory and mail spool. |
| **man vs. apropos vs.** **whatis?** | man [cmd]: full detailed manual page. whatis [cmd]: one-line description. apropos [keyword]: search all man pages for keyword (when you forgot the command name). |
| **What is /tmp** **and why is it a security concern?** | Temporary file storage, cleared on reboot. Often has loose (world-writable) permissions. Malware frequently drops payloads here because any process can write to it. Monitor closely. |
| **What does grep -r do?** | Recursively search all files in a directory and its subdirectories for a pattern. grep -r 'password' /etc searches every config file under /etc for the word 'password'. |
| **How does > differ from >>?** | > overwrites the entire file content with new output. >> appends new output to the END of the file without deleting existing content. |
| **What is the Principle of Least Privilege?** | Users and processes receive ONLY the minimum access required for their specific task. Limits the damage a compromised account or process can do. Applied via file permissions and user groups. |

# Relational Databases and SQL

## 4.1 What is a Database?

> **KEY CONCEPT: Database vs. Spreadsheet**
> A database is an organized collection of information designed for multiple simultaneous users, massive data volumes, and complex queries.
> 
> Spreadsheet (Google Sheets/Excel): Single user or small team. Small data. Simple calculations.
> Database (SQL): Many concurrent users. Millions of rows. Complex filtering, joining, and analysis.
> 
> Security Analyst Context: Security logs can contain MILLIONS of events per day.
> A database lets you write one SQL query and instantly find the 3 suspicious login events
> out of 5 million records -- in seconds. Manually scanning a spreadsheet would take days.

> **RELATIONAL DATABASE — Tables, Primary Keys, Foreign Keys**  
> **RELATIONAL DATABASE STRUCTURE:**  
> **TABLE: employees                    TABLE: machines**

```
  +-----------+----------+---------+  +-----------+-------------------+----------+
  |employee_id| username |device_id|  | device_id | operating_system  | username |
  |(PK)       |          |(FK)     |  | (PK)      |                   |          |
  +-----------+----------+---------+  +-----------+-------------------+----------+
  | 1001      | jsmith   | D-104   |  | D-104     | Windows 10        | jsmith   |
  | 1002      | agarcia  | D-207   |  | D-207     | macOS 13          | agarcia  |
  | 1003      | tchen    | NULL    |  | D-350     | Ubuntu 22.04      | NULL     |
  +-----------+----------+---------+  +-----------+-------------------+----------+
                    |                         ^
                    +----[device_id FK]-------+ (Foreign Key connects the two tables)

  PRIMARY KEY (PK): Unique identifier. No duplicates. No NULL. One per table.
  FOREIGN KEY (FK): Links to another table's PK. CAN have duplicates and NULLs.
  A table can have ONE Primary Key but MULTIPLE Foreign Keys.
```

## 4.2 Introduction to SQL

> **NOTE: What is SQL?**
> SQL (Structured Query Language) is the standard language for creating, querying, and managing relational databases.
> A QUERY is a formal request asking the database to return specific data.
> 
> **Security analysts use SQL to:**
> * Find all login attempts from a specific IP address in a 50M-row log table.
> * Identify machines missing a critical security patch.
> * Find all accounts with admin privileges that should not have them.
> * Cross-reference suspicious devices with their assigned employees.

| **Feature** | **Linux Filtering (grep/find)** | **SQL Filtering (SELECT/WHERE)** |
| --- | --- | --- |
| **Data Structure** | Free-form unstructured text files (.log, .txt). No defined columns. | Structured rows and columns in tables. Every field has a defined type. |
| **Joining Sources** | Cannot natively cross-reference between separate files. | JOIN multiple tables together to combine related data in one query. |
| **Best Use Case** | Web server dumps errors into a raw text log file. | Authentication events stored in a managed database (MySQL, PostgreSQL). |
| **Example** | grep 'FAILED' /var/log/auth.log | SELECT * FROM log_in_attempts WHERE success = 0; |

## 4.3 Basic SQL Queries — SELECT & FROM

> **TIP: Golden Syntax Rules**
> 1. Keywords in ALL CAPS: Not required, but universal best practice for readability.
> 2. Semicolon at end: Always end queries with ; to signal the statement is complete.
> 3. Case-insensitive: SQL keywords work in any case, but data values are often case-sensitive.

> **SELECT & FROM — Basic Query Syntax**
> **BASIC QUERY STRUCTURE:**
> 
> SELECT  column1, column2        <-- WHAT columns to return
> FROM    table_name;             <-- WHERE to get the data
> 
> SELECT *                        <-- * wildcard = ALL columns
> FROM    log_in_attempts;
> 
> **REAL ANALYST EXAMPLES:**
> 
> **-- Get employee IDs and their assigned device IDs:**
> SELECT employee_id, device_id
> FROM employees;
> 
> **-- Get everything from the login attempts log:**
> SELECT *
> FROM log_in_attempts;
> 
> **-- Get just usernames from** **employees** **table:**
> SELECT username
> FROM employees;

## 4.4 Filtering with WHERE Clause

> **KEY CONCEPT: What is WHERE?**
> WHERE adds a condition to your query -- only rows matching the condition are returned.
> Without WHERE: database returns ALL millions of rows.
> With WHERE: database returns only the rows you actually need.

### Data Types & Quoting Rules

| **Data Type** | **Description** | **Quotation Rule** | **Example Value** |
| --- | --- | --- | --- |
| **String** | Text characters, names, IDs. | MUST use single quotes |   'USA'  \|  'analyst10'  \|  'Windows 10' |
| **Date / Time** | Dates and timestamps. | MUST use single quotes |   '2023-01-31'  \|  '18:00'  \|  '2024-05-15 09:30' |
| **Numeric** | Numbers for calculation/comparison. | NEVER use quotes |   42  \|  18.00  \|  0  \|  1 |

### Comparison Operators

| **Operator** | **Meaning** | **Example** |
| --- | --- | --- |
| **=** | Exactly equal to | WHERE country = 'USA' |
| **<>  or**  **!=** | Not equal to | WHERE status <> 'active' |
| **>** | Greater than / Later than | WHERE time > '18:00' |
| **<** | Less than / Earlier than | WHERE login_count < 5 |
| **>=** | Greater than OR equal to | WHERE age >= 18 |
| **<=** | Less than OR equal to | WHERE priority_score <= 3 |

> **WHERE CLAUSE — Real Security Query Examples**
> **WHERE EXAMPLES (Real Security Analyst Queries):**
> 
> **-- Find all login attempts AFTER business hours (6PM):**
> SELECT *
> FROM log_in_attempts
> WHERE time > '18:00';
> 
> **-- Find all machines NOT running Windows:**
> SELECT *
> FROM machines
> WHERE operating_system <> 'Windows 10';
> 
> **-- Find all employees in department 'Sales':**
> SELECT *
> FROM employees
> WHERE department = 'Sales';
> 
> **-- Find failed logins (success = 0 means failed):**
> SELECT *
> FROM log_in_attempts
> WHERE success = 0;

### Pattern Matching with LIKE

> **NOTE**
> Use LIKE when you know PART of the value but not the exact full string.
> 
> WILDCARDS:
> %  (Percent)    = Substitutes ANY number of characters (zero or more).
> _ (Underscore) = Substitutes EXACTLY ONE character.

> **LIKE OPERATOR — Pattern Matching with % and _**
> **LIKE PATTERN EXAMPLES:**
> 
> **-- Find all offices in the East building (East-120, East-290, East-450):**
> SELECT *
> FROM employees
> WHERE office LIKE 'East%';
> -- 'East%' = starts with 'East', followed by ANYTHING
> 
> **-- Find emails at any** **gmail** **address:**
> SELECT *
> FROM users
> WHERE email LIKE '%@gmail.com';
> -- '%@gmail.com' = ANYTHING before @gmail.com
> 
> **-- Find states starting with N followed by exactly ONE character (NY, NJ, NV):**
> SELECT *
> FROM locations
> WHERE state LIKE 'N_';
> -- 'N_' = N + exactly 1 character
> 
> **-- Find usernames containing 'admin' anywhere in the name:**
> SELECT *
> FROM employees
> WHERE username LIKE '%admin%';
> -- '%admin%' = ANYTHING before AND after 'admin'

## 4.5 Advanced Filtering — Logical Operators

> **KEY CONCEPT: Real Security Questions Need Multiple Conditions**
> Single WHERE conditions are often too broad. Logical operators combine conditions:
> AND = BOTH conditions must be true (narrows results)
> OR   = EITHER condition can be true (broadens results)
> NOT = EXCLUDE records matching a condition

> **LOGICAL OPERATORS — AND, OR, NOT, BETWEEN**  
> **AND OPERATOR -- Both conditions must be TRUE simultaneously:**  
> **-- Find failed logins (success=0) from outside the USA:**  
> **SELECT ***  
> **FROM log_in_attempts**  
> **WHERE success = 0**  
> **AND country <> 'USA';**  
> **-- Find machines in Finance department running Windows 10:**  
> **SELECT ***  
> **FROM machines**  
> **WHERE department = 'Finance'**  
> **AND operating_system = 'Windows 10';**

```
  -------------------------------------------------------
  OR OPERATOR -- Either condition can be TRUE:

  -- Find logins from Canada OR USA:
  SELECT *
  FROM log_in_attempts
  WHERE country = 'Canada'
  OR country = 'USA';

  -- Find machines running Windows 7 OR Windows XP (EOL / dangerous):
  SELECT *
  FROM machines
  WHERE operating_system = 'Windows 7'
  OR operating_system = 'Windows XP';

  -------------------------------------------------------
  NOT OPERATOR -- Exclude matching records:

  -- Find all employees NOT in the IT department:
  SELECT *
  FROM employees
  WHERE NOT department = 'IT';

  BETWEEN OPERATOR -- Range filtering (inclusive on both ends):

  -- Find machines with patches applied between two dates:
  SELECT *
  FROM machines
  WHERE OS_patch_date BETWEEN '2021-03-01' AND '2021-09-01';

  -- Find employees hired between 2020 and 2022:
  SELECT *
  FROM employees
  WHERE hire_year BETWEEN 2020 AND 2022;
```

## 4.6 Sorting & Aggregate Functions

> **ORDER BY — Sorting Query Results**
> **ORDER BY -- Sort results by a column:**
> 
> **-- Sort employees alphabetically by last name (A to Z):**
> SELECT *
> FROM employees
> ORDER BY last_name ASC;     -- ASC = Ascending (A-Z, 0-9, oldest-newest)
> 
> **-- Sort login attempts newest first:**
> SELECT *
> FROM log_in_attempts
> ORDER BY login_date DESC;   -- DESC = Descending (Z-A, 9-0, newest-oldest)
> 
> **-- Sort by multiple columns (department first, then last name within dept):**
> SELECT *
> FROM employees
> ORDER BY department ASC, last_name ASC;

### Aggregate Functions — Math on Entire Columns

| **Function** | **What It Returns** | **Security Analyst Example** |
| --- | --- | --- |
| **COUNT (column)** | Total number of rows (records) in the result. | COUNT(*) to see how many login attempts happened today. |
| **AVG (column)** | Average (mean) value of a numeric column. | AVG(session_duration) to find average time attackers spent on the system. |
| **SUM (column)** | Total sum of all values in a numeric column. | SUM(bytes_transferred) to detect large data exfiltration by total volume. |
| **MIN (column)** | Smallest value in a numeric or date column. | MIN(patch_date) to find the oldest unpatched machine on the network. |
| **MAX (column)** | Largest value in a numeric or date column. | MAX(failed_attempts) to find the account being brute-forced most aggressively. |

> **AGGREGATE FUNCTIONS — Count, Average, Sum**
> **AGGREGATE FUNCTION EXAMPLES:**
> 
> **-- Count total login attempts today:**
> SELECT COUNT(*)
> FROM log_in_attempts
> WHERE login_date = '2024-05-15';
> 
> **-- Count how many FAILED logins:**
> SELECT COUNT(event_id)
> FROM log_in_attempts
> WHERE success = 0;
> 
> **-- Find average number of** **login** **attempts per user:**
> SELECT AVG(login_count)
> FROM log_in_attempts;

## 4.7 Joining Tables — The Most Powerful SQL Feature

> **KEY CONCEPT: Why JOIN?**
> Security data is rarely in one table. Employee info is in 'employees'. Device info is in 'machines'. Login events are in 'log_in_attempts'.
> To answer, 'Which employee owns the machine that had suspicious logins?' you MUST JOIN tables.
> 
> SYNTAX RULE: When two tables share a column name (e.g., both have 'device_id'),
> specify the table using dot notation: employees.device_id vs machines.device_id
> Without this, SQL does not know which table's column you mean.

> **FOUR JOIN TYPES — Visual Explanation**  
> **THE FOUR JOIN TYPES -- VISUAL COMPARISON:**  
> **TABLE A (employees)    TABLE B (machines)**

```
  +-------+              +-------+
  | D-101 |              | D-101 | <- matched in both
  | D-102 |              | D-102 | <- matched in both
  | D-103 | (no machine) | D-350 | <- only in machines
  +-------+              +-------+

  INNER JOIN: Only rows with MATCH in BOTH tables
  Result: D-101, D-102  (D-103 excluded, D-350 excluded)

  LEFT JOIN: ALL rows from LEFT table + matches from right
  Result: D-101, D-102, D-103 (D-103 has NULL for machine columns)

  RIGHT JOIN: ALL rows from RIGHT table + matches from left
  Result: D-101, D-102, D-350 (D-350 has NULL for employee columns)

  FULL OUTER JOIN: ALL rows from BOTH tables
  Result: D-101, D-102, D-103, D-350 (NULLs where no match)
```

| **JOIN Type** | **Returns** | **Security Analyst Use Case** | **NULL Behavior** |
| --- | --- | --- | --- |
| **INNER JOIN** | Only rows with a MATCH in BOTH tables. | Find employees who HAVE assigned machines -- exclude employees with no device and unassigned machines. | No NULLs from the join condition. All rows have matching data. |
| **LEFT JOIN** | ALL rows from LEFT table + matching rows from right (NULLs for no match). | Get ALL employees and show their machine info -- employees with no machine show NULL. Identifies employees without assigned devices. | Right table columns show NULL when no match found in right table. |
| **RIGHT JOIN** | ALL rows from RIGHT table + matching rows from left (NULLs for no match). | Get ALL machines and show assigned employee -- unassigned machines (D-350) show NULL. Identifies rogue or untracked devices. | Left table columns show NULL when no match found in left table. |
| **FULL OUTER JOIN** | ALL rows from BOTH tables merged. Matches where possible. | Complete picture: every employee and every machine. Identifies both employees without devices AND devices without employees. | Both sides can have NULL where no match exists. |

> **JOIN SYNTAX — All Four Types with Real Examples**
> **JOIN SYNTAX EXAMPLES:**
> 
> **-- INNER JOIN: Only employees with matched machines:**
> SELECT username, operating_system, device_id
> FROM employees
> INNER JOIN machines ON employees.device_id = machines.device_id;
> 
> **-- LEFT JOIN: All employees, show machine info where available:**
> SELECT employees.employee_id, employees.username,
> machines.operating_system
> FROM employees
> LEFT JOIN machines ON employees.device_id = machines.device_id;
> 
> **-- RIGHT JOIN: All machines, show assigned employee:**
> SELECT machines.device_id, machines.operating_system,
> employees.username
> FROM employees
> RIGHT JOIN machines ON employees.device_id = machines.device_id;
> 
> 
> 
> **-- FULL OUTER JOIN: Everything from both tables:**
> SELECT *
> FROM employees
> FULL OUTER JOIN machines ON employees.device_id = machines.device_id;
> 
> **-- COMBINING JOIN + WHERE (most real queries do this):**
> **-- Find all failed logins and the employee's department:**
> SELECT log_in_attempts.username, employees.department,
> log_in_attempts.time, log_in_attempts.country
> FROM log_in_attempts
> INNER JOIN employees ON log_in_attempts.username = employees.username
> WHERE log_in_attempts.success = 0
> AND log_in_attempts.country <> 'USA';

## 4.8 Complete SQL Query Structure

> **COMPLETE SQL QUERY STRUCTURE — All Clauses in Order**
> **FULL QUERY ANATOMY (all clauses in correct order):**
> 
> SELECT   column1, column2, COUNT(*)
> FROM     primary_table
> INNER JOIN secondary_table ON primary_table.key = secondary_table.key
> WHERE    condition1 = 'value'
> AND      condition2 > 0
> OR       condition3 LIKE '%pattern%'
> ORDER BY column1 ASC
> LIMIT    100;
> 
> **CLAUSE ORDER IS MANDATORY -- always in this sequence:**
> 1. SELECT  (what columns)
> 2. FROM    (which table)
> 3. JOIN    (add another table)
> 4. WHERE   (filter rows)
> 5. ORDER BY (sort results)
> 6. LIMIT   (max rows to return)
> 
> **REAL COMPREHENSIVE SECURITY QUERY:**
> -- Find all failed logins after 6PM from outside USA,
> -- with the employee's department, sorted by time:
> 
> SELECT log_in_attempts.username,
> log_in_attempts.time,
> log_in_attempts.country,
> employees.department
> FROM log_in_attempts
> INNER JOIN employees
> ON log_in_attempts.username = employees.username
> WHERE log_in_attempts.success = 0
> AND log_in_attempts.time > '18:00'
> AND log_in_attempts.country <> 'USA'
> ORDER BY log_in_attempts.time DESC;

## 4.9 SQL Quick-Reference Cheat Sheet

| **Clause / Operator** | **Syntax** | **Purpose** | **Example** |
| --- | --- | --- | --- |
| **SELECT** | SELECT col1, col2 FROM table | Choose which columns to return. | SELECT username, time FROM log_in_attempts; |
| **SELECT *** | SELECT * FROM table | Return ALL columns. | SELECT * FROM employees; |
| **WHERE** | WHERE column = 'value' | Filter rows by condition. | WHERE country = 'USA' |
| **LIKE + %** | WHERE col LIKE 'East%' | Match pattern: % = any chars. | WHERE office LIKE 'East%' |
| **LIKE + _** | WHERE col LIKE 'N_' | Match pattern: _ = one char. | WHERE state LIKE 'N_' |
| **AND** | WHERE cond1 AND cond2 | BOTH conditions must be true. | WHERE success = 0 AND country <> 'USA' |
| **OR** | WHERE cond1 OR cond2 | EITHER condition can be true. | WHERE country = 'CA' OR country = 'USA' |
| **NOT** | WHERE NOT column = 'val' | Exclude matching records. | WHERE NOT department = 'IT' |
| **BETWEEN** | WHERE col BETWEEN a AND b | Inclusive range filter. | WHERE date BETWEEN '2024-01-01' AND '2024-12-31' |
| **ORDER BY ASC** | ORDER BY column ASC | Sort A-Z / oldest-newest. | ORDER BY last_name ASC |
| **ORDER BY DESC** | ORDER BY column DESC | Sort Z-A / newest-oldest. | ORDER BY login_time DESC |
| **COUNT()** | SELECT COUNT(col) FROM table | Count number of rows. | SELECT COUNT(*) FROM log_in_attempts |
| **AVG()** | SELECT AVG(col) FROM table | Average of numeric column. | SELECT AVG(session_duration) FROM sessions |
| **SUM()** | SELECT SUM(col) FROM table | Total sum of numeric column. | SELECT SUM(bytes) FROM transfers |
| **INNER JOIN** | FROM t1 INNER JOIN t2 ON t1.key=t2.key | Rows matching in BOTH tables. | employees INNER JOIN machines ON employees.device_id = machines.device_id |
| **LEFT JOIN** | FROM t1 LEFT JOIN t2 ON t1.key=t2.key | All left + matching right. | employees LEFT JOIN machines ON employees.device_id = machines.device_id |
| **RIGHT JOIN** | FROM t1 RIGHT JOIN t2 ON t1.key=t2.key | Matching left + all right. | employees RIGHT JOIN machines ON employees.device_id = machines.device_id |
| **FULL OUTER JOIN** | FROM t1 FULL OUTER JOIN t2 ON t1.key=t2.key | All rows from BOTH tables. | employees FULL OUTER JOIN machines ON employees.device_id = machines.device_id |

## 4.10 Module 4 Glossary

| **Term** | **Definition** |
| --- | --- |
| **ASC** | Ascending sort order. A-Z for text, oldest-to-newest for dates, 0-9 for numbers. |
| **BETWEEN** | SQL operator filtering rows within a specified range (inclusive of both boundary values). |
| **COUNT ()** | Aggregate function returning the total number of rows in a query result. |
| **Database** | An organized collection of information or data, designed for efficient storage and retrieval. |
| **Date/Time Data** | Data representing dates or timestamps. Must be wrapped in single quotes in SQL queries. |
| **DESC** | Descending sort order. Z-A for text, newest-to-oldest for dates, 9-0 for numbers. |
| **Filtering** | Selecting only data records that match a specified condition (using WHERE in SQL). |
| **Foreign Key (FK)** | A column in one table that references the Primary Key of another table. Creates the link between tables. Can have duplicates and NULL values. |
| **FULL OUTER JOIN** | Returns ALL records from both tables. Matches where possible, fills unmatched rows with NULL. |
| **INNER JOIN** | Returns only records that have a matching value in BOTH joined tables. |
| **LEFT JOIN** | Returns ALL records from the left table plus matching records from the right table (NULLs where no right match). |
| **LIKE** | SQL operator used with wildcards (% and _) to search for patterns within text values. |
| **Log** | A record of events occurring within an organization's systems. Often stored in databases for SQL analysis. |
| **NULL** | The absence of any value in a database field. Represents unknown or missing data (not zero, not empty string). |
| **Numeric Data** | Data consisting of numbers. Never wrapped in quotes in SQL queries. Used for mathematical comparisons. |
| **ORDER BY** | SQL clause that sorts query results by one or more columns in ascending (ASC) or descending (DESC) order. |
| **Operator** | A symbol or keyword representing an operation in SQL (=, <>, >, <, LIKE, AND, OR, NOT, BETWEEN). |
| **Primary Key (PK)** | A column where every row has a unique, non-NULL value. Uniquely identifies each record in a table. One per table. |
| **Query** | A formal request for specific data from a database, written in SQL. |
| **Relational Database** | A structured database containing tables that are connected (related) to each other via Primary and Foreign Keys. |
| **RIGHT JOIN** | Returns ALL records from the right table plus matching records from the left table (NULLs where no left match). |
| **SQL** | Structured Query Language. Standard programming language for creating, querying, and managing relational databases. |
| **String Data** | Data consisting of text characters. Must always be wrapped in single quotes in SQL queries. |
| **SUM ()** | Aggregate function returning the total sum of all values in a numeric column. |
| **AVG ()** | Aggregate function returning the mathematical average (mean) of all values in a numeric column. |
| **Wildcard** | A special character substituting for other characters in LIKE patterns. % = any number of chars. _ = exactly one char. |

## 4.11 Complete Course 4 Flashcard Review

| **Question** | **Answer** |
| --- | --- |
| **What does an OS do?** | Bridges user and hardware. Translates human actions into binary hardware instructions. Manages CPU, RAM, storage, and I/O for all running programs. |
| **BIOS vs. UEFI?** | BIOS: older (pre-2007), basic, limited security. UEFI: modern, 64-bit, Secure Boot, faster, supports large disks. Advanced malware targets firmware -- survives OS wipes. |
| **GUI vs. CLI for security?** | CLI preferred: faster, scriptable for automation, auto-logs ALL commands in bash_history (forensics), full remote server management via SSH. |
| **What does a hypervisor do?** | Creates and manages Virtual Machines. Type 1 (bare-metal): KVM, ESXi. Type 2 (hosted): VirtualBox. Each VM is isolated -- malware in one VM cannot reach others. |
| **Linux architecture layers?** | User -> Application -> Shell -> FHS -> Kernel -> Hardware. Each passes instructions to the layer below it. |
| **Kali Linux vs. Ubuntu?** | Kali: penetration testing/forensics, pre-loaded offensive tools, run in VM. Ubuntu: user-friendly, general use/cloud, clean install. |
| **APT vs. YUM?** | APT: Debian family (Kali, Ubuntu). YUM/DNF: Red Hat family (RHEL, AlmaLinux). Both auto-resolve dependencies and apply security patches. |
| **$ vs. # in prompt?** | $ = regular user (limited). # = root/superuser (maximum privileges -- all commands have full system access). Always be extra careful with #. |
| **stdin/stdout/stderr?** | stdin (0): your typed input. stdout (1): successful output on screen (redirect with >). stderr (2): error messages (redirect with 2>). |
| **ls -la output?** | ls: basic list. -l: long format (permissions, owner, size, date). -a: include hidden files (dot-files). -la: combined -- most useful for security. |
| **chmod** **600** **key.pem?** | Owner: read+write (6=rw). Group: NO access (0). Others: NO access (0). SSH requires private keys to have exactly these permissions. |
| **sudo** **vs. root login?** | sudo: one command with root privileges, then reverts. Logged to auth.log. Root login: every command at max power. No per-command accountability. Avoid direct root. |
| **-aG** **in** **usermod?** | WITHOUT -a: ALL existing secondary groups REPLACED by new one (dangerous!). WITH -aG: new group APPENDED, all existing groups preserved. |
| **userdel** **vs.** **userdel** **-r?** | userdel: removes account, PRESERVES home directory. userdel -r: removes account AND permanently deletes home directory and files. |
| **grep vs. find?** | grep: searches INSIDE file content for text patterns. find: searches the FILESYSTEM for files by name, date, size, permissions, etc. |
| **What does pipe** **( \|** **) do?** | Passes output of first command as input to second command. Chain for multi-step filtering: cat auth.log \| grep 'FAILED' \| grep '192.168.1.5' |
| **Absolute vs. relative path?** | Absolute: starts from / root, works from anywhere (/home/analyst/logs). Relative: starts from current directory (logs/access.txt). |
| **What is a Primary Key?** | A column with a unique, non-NULL value in EVERY row. Uniquely identifies each record. One per table. Example: employee_id. |
| **Primary Key vs. Foreign Key?** | Primary Key: unique identifier within its own table. Foreign Key: references another table's PK. Creates the link between tables. Can have duplicates/NULLs. |
| **SQL vs. Linux for filtering?** | SQL: structured data in tables, can JOIN multiple tables, best for database logs. Linux grep/find: unstructured text files, cannot cross-reference files. |
| **SELECT * FROM employees?** | Returns ALL columns from every row in the employees table. * wildcard = all columns. Semicolon required to end the statement. |
| **LIKE 'East%' vs. LIKE 'N_'?** | East% = starts with 'East' followed by ANY characters (0 or more). N_ = starts with N followed by EXACTLY ONE character. |
| **AND vs. OR operator?** | AND: BOTH conditions must be true (narrows results). OR: EITHER condition can be true (broadens results). |
| **INNER JOIN vs. LEFT JOIN?** | INNER JOIN: only rows matching in BOTH tables. LEFT JOIN: ALL rows from left table + matching from right (NULLs where no match). Use LEFT JOIN to find employees without machines. |
| **FULL OUTER JOIN?** | Returns ALL rows from BOTH tables. Matches where possible. NULL fills unmatched sides. Use to get complete picture of employees AND machines with no exclusions. |

> **Course 4 Complete!**  
> **Tools of the Trade: Linux and SQL**  
> **Topics Mastered: OS Fundamentals * Boot Process * GUI vs CLI * Virtualization**  
> **Linux Architecture  *  Distros  *  Shell Types  *  stdin/stdout/stderr  *  Package Managers**  
> **Navigation * File Ops * Permissions * User Management * grep/find/pipe**  
> **Relational Databases * SQL Queries * WHERE Filtering * JOINs * Aggregates**  
> **Next: Course 5 -- Assets, Threats & Vulnerabilities -->**
