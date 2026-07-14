## Contents

- [Why Linux is the Backbone of Cybersecurity](#why-linux-is-the-backbone-of-cybersecurity)
- [Brief History — How Linux Was Born](#brief-history--how-linux-was-born)
- [Linux Architecture — Six Layers](#linux-architecture--six-layers)
- [Linux Distributions — Security Analyst's Map](#linux-distributions--security-analysts-map)
- [Package Managers — Installing & Updating Software](#package-managers--installing--updating-software)
- [The Linux Shell — Types & Identification](#the-linux-shell--types--identification)
- [Standard Streams — stdin, stdout, stderr](#standard-streams--stdin-stdout-stderr)
- [Essential Terminal Keyboard Shortcuts](#essential-terminal-keyboard-shortcuts)

## Why Linux is the Backbone of Cybersecurity

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

## Brief History — How Linux Was Born

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
  +--------------------------------------------------+
```

## Linux Architecture — Six Layers

> **KEY CONCEPT: The Request Flow**
> Every action in Linux cascades sequentially through these layers:
> USER ->  APPLICATION  ->  SHELL  ->  FHS  ->  KERNEL  ->  HARDWARE

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
  +-----------------------------------------------------------+
  | The master filing system. Standardizes WHERE everything   |
  | lives on disk:                                            |
  |  /       = root (top of everything)                       |
  |  /home   = user personal directories                      |
  |  /bin    = essential binary executables (core commands)   |
  |  /etc    = system-wide configuration files                |
  |  /var    = variable data: logs, databases, email          |
  |  /tmp    = temporary files (loose permissions -- a target)|
  |  /usr    = user programs and libraries                    |
  +-----------------------------------------------------------+
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

## Linux Distributions — Security Analyst's Map

> **NOTE: What is a Distro?**
> Because the Linux kernel is open-source, anyone can package it with different tools and create their own OS.
> A Distribution (distro/flavor) = Linux kernel + pre-selected applications + package manager + desktop environment.
> Analogy: The kernel is a car engine. Different manufacturers build sports cars, buses, and trucks around the same engine.

> **LINUX DISTRO FAMILY TREE**
> **LINUX DISTRO FAMILY TREE (Security Focus):**
> **LINUX KERNEL (core, open-source)**
> **|**

```
        +------------------------- DEBIAN FAMILY -----------------------------+
        |         |                        |                  |               |
        |    [UBUNTU]               [KALI LINUX]         [PARROT OS]          |
        |    User-friendly.         Penetration        Security-focused.      |
        |    Cloud & enterprise.    testing &          Forensics + pentesting |
        |    Excellent GUI.         forensics.            with friendly GUI.  |
        |    Industry standard.     Run in VM!                                |
        |
        +--------------------------- RED HAT FAMILY --------------------------+
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

## Package Managers — Installing & Updating Software

> **NOTE: What is a Package?**
> Linux software is distributed as PACKAGES -- compressed archives containing all files, libraries, and metadata an application needs.
> DEPENDENCIES: Other packages or libraries that your app requires to run. Package managers resolve these automatically.
> SECURITY IMPORTANCE: Running 'apt update && apt upgrade' applies ALL available security patches to every installed package.
> Not updating = leaving known vulnerabilities permanently open. This is equivalent to not patching.

| **Family** | **Core Manager** | **File Extension** | **CLI Tool** | **Install Command Example** |
| --- | --- | --- | --- | --- |
| **Debian (Kali, Ubuntu, Parrot)** | dpkg | .deb | APT (Advanced Package Tool) | sudo apt install wireshark |
| **Red Hat (RHEL, AlmaLinux)** | RPM | .rpm | YUM / DNF | sudo yum install nmap |

```bash
APT ESSENTIAL COMMANDS:

sudo apt update              # Refresh package lists from repositories
sudo apt upgrade             # Install all available security patches
sudo apt install [package]   # Install a new application
sudo apt remove [package]    # Remove an application
apt search [keyword]         # Search for packages by name/description
apt show [package]           # Show detailed info about a package

# SECURITY WORKFLOW -- Run these regularly:
sudo apt update && sudo apt upgrade -y
# This single command fetches and installs ALL pending security patches.
```

## The Linux Shell — Types & Identification

| **Shell** | **Full Name** | **Prompt Symbol** | **Key Characteristics** |
| --- | --- | --- | --- |
| **Bash** | Bourne-Again Shell | $ | Default for most Linux distros. THE standard for security scripting, log automation, and Bash scripting. Most tutorials and courses use Bash. |
| **Zsh** | Z Shell | % | Highly customizable. Interactive features like better tab completion and spell correction. Popular with developers (Oh My Zsh framework). |
| **Csh / Tcsh** | C Shell / Enhanced C Shell | % | Syntax resembles the C programming language. Less common in security work. Legacy systems. |
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

## Standard Streams — stdin, stdout, stderr

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

## Essential Terminal Keyboard Shortcuts

| **Shortcut** | **What It Does** | **When to Use It** |
| --- | --- | --- |
| **CTRL + C** | TERMINATE the current running command/process immediately. | Process hangs, script runs forever, accidentally started long operation you need to cancel. MOST IMPORTANT shortcut. |
| **CTRL + Z** | SUSPEND (pause) the current process. Send it to background. | Temporarily stop a process without killing it. Use 'fg' to bring it back. |
| **CTRL + L  or  clear** | Clear the terminal screen. Start fresh visually. | Screen is cluttered with output. Cursor stays in same session -- history is not deleted. |
| **CTRL + A** | Move cursor to the BEGINNING of the current line. | You need to edit the start of a long command without retyping it. |
| **CTRL + E** | Move cursor to the END of the current line. | You need to add text at the end of a partially edited command. |
| **Up / Down Arrow** | Scroll through command HISTORY. Up = previous. Down = next. | Repeat a recently used command. Avoid retyping long commands. |
| **Tab** | AUTO-COMPLETE command names, file paths, and directory names. | You know the first few characters. Tab fills in the rest. Double-Tab shows all options. |
| **CTRL + R** | SEARCH command history interactively. Type partial command to find it. | Find a command you used last week without scrolling through hundreds of history entries. |

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| **Who created Linux and what is its license?** | Linus Torvalds created the kernel (1991). GNU tools by Richard Stallman. Combined as GNU/Linux. Licensed under GPL -- free to use, modify, and distribute. |
| **Name the 6 Linux architecture layers.** | User -> Application -> Shell -> FHS -> Kernel -> Hardware. Each layer passes instructions to the one below it. |
| **What is the Kernel's job?** | Manages process scheduling, RAM allocation, hardware drivers, system calls, and security enforcement. It is the core engine of the OS. |
| **Kali Linux vs. Ubuntu?** | Kali: penetration testing/forensics, pre-loaded with offensive tools, run in VM. Ubuntu: user-friendly, general use/cloud, nothing pre-installed. |
| **APT vs. YUM?** | APT: Debian family (Kali, Ubuntu). YUM/DNF: Red Hat family (RHEL, AlmaLinux). Both install packages and auto-resolve dependencies. |
| **What does CTRL+C do?** | Terminates the currently running command/process. The most critical terminal shortcut for cancelling hanging scripts. |
| **$ vs. # in the prompt?** | $ = regular user (limited permissions). # = root/superuser (maximum privileges -- every command has full system access). |
| **What is stdin/stdout/stderr?** | stdin: your typed input. stdout: successful command output shown on screen. stderr: error messages. All three can be redirected to files. |
