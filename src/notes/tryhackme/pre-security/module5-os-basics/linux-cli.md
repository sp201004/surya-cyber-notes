## Contents

- [Objective](#objective)
- [What is Linux?](#what-is-linux)
- [What is CLI?](#what-is-cli)
- [Why Cybersecurity Professionals Prefer CLI](#why-cybersecurity-professionals-prefer-cli)
- [Terminal Structure](#terminal-structure)
- [→ Root User](#→-root-user)
- [Linux Filesystem](#linux-filesystem)
- [Home Directory](#home-directory)
- [Command 1 — pwd](#command-1-—-pwd)
- [Command 2 — ls](#command-2-—-ls)
- [ls -l](#ls--l)
- [ls -al](#ls--al)
- [Hidden Files](#hidden-files)
- [Command 3 — cd](#command-3-—-cd)
- [Move Back](#move-back)
- [Move Home](#move-home)
- [Useful Shortcuts](#useful-shortcuts)
- [Command 4 — find](#command-4-—-find)
- [Why find is Important?](#why-find-is-important)
- [Command 5 — cat](#command-5-—-cat)
- [Common cat Examples](#common-cat-examples)
- [Mini Workflow](#mini-workflow)
- [Real World Example](#real-world-example)
- [Important Commands Learned](#important-commands-learned)
- [Investigating the System](#investigating-the-system)
- [Command 6 — whoami](#command-6-—-whoami)
- [Real World Usage](#real-world-usage)
- [Related Commands](#related-commands)
- [Command 7 — uname](#command-7-—-uname)
- [uname -a](#uname--a)
- [Breakdown](#breakdown)
- [Why is uname Useful?](#why-is-uname-useful)
- [Command 8 — df](#command-8-—-df)
- [Example](#example)
- [Why df -h?](#why-df--h)
- [The /etc Directory](#the-/etc-directory)
- [Important Files](#important-files)
- [Reading System Files](#reading-system-files)
- [Important Fields](#important-fields)
- [Why os-release?](#why-os-release)
- [Practical Workflow](#practical-workflow)
- [Mini Challenge (TryHackMe)](#mini-challenge-tryhackme)
- [Cybersecurity Example](#cybersecurity-example)
- [Command Cheat Sheet](#command-cheat-sheet)
- [Q1. Difference between uname and uname -a?](#q1-difference-between-uname-and-uname--a)
- [Q2. Why use df -h instead of df?](#q2-why-use-df--h-instead-of-df)
- [Q3. Which directory stores Linux configuration files?](#q3-which-directory-stores-linux-configuration-files)
- [Q4. Which file stores Linux distribution details?](#q4-which-file-stores-linux-distribution-details)
- [Important Linux Directories](#important-linux-directories)
- [Most Important Directories for Cybersecurity](#most-important-directories-for-cybersecurity)
- [/etc](#/etc)
- [/var](#/var)
- [/home](#/home)
- [/tmp](#/tmp)
- [/root](#/root)
- [/proc](#/proc)
- [Complete Command Cheat Sheet](#complete-command-cheat-sheet)
- [Navigation](#navigation)
- [Searching](#searching)
- [Reading Files](#reading-files)
- [User Information](#user-information)
- [Operating System](#operating-system)
- [Storage](#storage)
- [Useful Workflow](#useful-workflow)
- [Real World Scenario](#real-world-scenario)
- [Common Beginner Mistakes](#common-beginner-mistakes)
- [Cybersecurity Applications](#cybersecurity-applications)
- [Commands Used Daily by Ethical Hackers](#commands-used-daily-by-ethical-hackers)
- [Important Files to Remember](#important-files-to-remember)
- [Task 1](#task-1)
- [Task 2](#task-2)
- [Task 3](#task-3)
- [Q1. What is the purpose of `pwd`?](#q1-what-is-the-purpose-of-`pwd`)
- [Q2. Difference between `ls` and `ls -al`?](#q2-difference-between-`ls`-and-`ls--al`)
- [Q3. What does `whoami` return?](#q3-what-does-`whoami`-return)
- [Q4. What is the difference between `uname` and `cat /etc/os-release`?](#q4-what-is-the-difference-between-`uname`-and-`cat-/etc/os-release`)
- [Q5. Why is `df -h` preferred over `df`?](#q5-why-is-`df--h`-preferred-over-`df`)
- [Linux CLI Basics Complete!](#linux-cli-basics-complete!)
- [Interview Questions](#interview-questions)
- [Memory Tricks](#memory-tricks)
- [Quick Revision](#quick-revision)
- [One Shot Revision](#one-shot-revision)
- [TryHackMe Answers](#tryhackme-answers)
- [Final Summary](#final-summary)

> Room: Linux CLI Basics
> Platform: TryHackMe
> Difficulty: Beginner
> Module: Operating Systems Basics

---

# Objective
Learn the fundamentals of the Linux Command Line Interface (CLI), navigate the filesystem, locate files, read file contents, and gather system information.

---

# What is Linux?
Linux is an **open-source operating system** widely used in:

- Servers
- Cloud Computing
- Cybersecurity
- Networking
- Embedded Devices
- Android
- Supercomputers

More than **90% of web servers** run Linux.

---

# What is CLI?
CLI = **Command Line Interface**

Instead of clicking buttons, you type commands.

Example:

**GUI**

```
📁 Click Folder
```

**CLI**

```bash
cd Documents
```

---

# Why Cybersecurity Professionals Prefer CLI
 Faster

**Lightweight**

**Automation**

**Remote Management (SSH)**

**Powerful**

 Most security tools run inside Terminal

Examples:

- Nmap
- Wireshark CLI
- Metasploit
- Burp Suite CLI
- Hydra
- Gobuster
- John the Ripper

---

# Terminal Structure
Example

```bash
ubuntu@tryhackme:~$
```

**Breakdown**

```
ubuntu        → Username

tryhackme     → Hostname

~             → Home Directory

$             → Normal User

#             → Root User
```

---

# Linux Filesystem
Everything starts from

```
/
```

**Example**

```
/
├── home
│
├── etc
│
├── var
│
├── usr
│
├── tmp
│
├── root
│
└── opt
```

Unlike Windows,

**Windows**

```
C:\Users\Surya\
```

**Linux**

```
/home/ubuntu/
```

---

# Home Directory
Every user gets one.

**Example**

```bash
/home/ubuntu
```

**Shortcut**

```
~
```

**Example**

```bash
cd ~

pwd
```

**Output**

```
/home/ubuntu
```

---

# Command 1 — pwd
Meaning

```
Print Working Directory
```

**Purpose**

Shows your current location.

**Syntax**

```bash
pwd
```

**Example**

```bash
ubuntu@tryhackme:~$ pwd
```

**Output**

```text
/home/ubuntu
```

Think of it as

> "Where am I?"

---

# Command 2 — ls
Meaning

```
List
```

**Purpose**

Shows files and folders.

**Syntax**

```bash
ls
```

**Example**

```bash
ls
```

**Output**

```text
Desktop
Documents
Downloads
Music
Pictures
```

---

# ls -l
Meaning

**Long Listing**

**Syntax**

```bash
ls -l
```

**Shows**

- Permissions
- Owner
- Group
- Size
- Date
- Name

**Example**

```bash
drwxr-xr-x
```

**Breakdown**

```
d
```

**Directory**

```
r
```

**Read**

```
w
```

**Write**

```
x
```

**Execute**

---

# ls -al
Shows

**Hidden Files**

**Detailed View**

**Syntax**

```bash
ls -al
```

**Example**

```bash
ls -al
```

**Output**

```text
.
..
.bashrc
.profile
.cache
```

---

# Hidden Files
Hidden files begin with

```
.
```

**Examples**

```
.bashrc
.profile
.gitignore
.cache
```

**Purpose**

- Configuration
- Settings
- Environment Variables

---

# Command 3 — cd
Meaning

```
Change Directory
```

Move between folders.

**Example**

```bash
cd Documents
```

**Current**

```
/home/ubuntu
```

**After**

```
/home/ubuntu/Documents
```

**Verify**

```bash
pwd
```

---

# Move Back
```bash
cd ..
```

**Example**

**Before**

```
/home/ubuntu/Documents
```

**After**

```
/home/ubuntu
```

---

# Move Home
```bash
cd
```

**OR**

```bash
cd ~
```

---

# Useful Shortcuts
Current Directory

```
.
```

**Parent Directory**

```
..
```

**Home Directory**

```
~
```

**Root Directory**

```
/
```

---

# Command 4 — find
Purpose

Search files and folders.

**Syntax**

```bash
find <location> -name <filename>
```

**Example**

```bash
find ~ -name mission_brief.txt
```

**Output**

```text
/home/ubuntu/Documents/research/archive/mission_brief.txt
```

**Meaning**

**Search**

```
Home Directory
```

↓

**Find**

```
mission_brief.txt
```

↓

**Return**

```
Full Path
```

---

# Why find is Important?
Cybersecurity uses it for

**Finding Logs**

**Malware**

**Password Files**

**Configurations**

**Scripts**

**Example**

```bash
find / -name passwd
```

```bash
find / -name "*.log"
```

```bash
find / -name "*.conf"
```

---

# Command 5 — cat
Meaning

**Concatenate**

**Usually used to**

Read files.

**Syntax**

```bash
cat filename
```

**Example**

```bash
cat mission_brief.txt
```

**Output**

```text
Collect
Kernel Version
Disk Space
Linux Distribution
```

---

# Common cat Examples
Read

```bash
cat notes.txt
```

**Read Config**

```bash
cat /etc/os-release
```

**Read Password File**

```bash
cat /etc/passwd
```

---

# Mini Workflow
```
Need Current Folder?
↓
pwd
↓
Need Files?
↓
ls
↓
Need Folder?
↓
cd FolderName
↓
Need Search?
↓
find
↓
Need Read?
↓
cat filename
```

---

# Real World Example
Scenario

A SOC Analyst receives:

```
Suspicious file:

malware.sh
```

**Steps**

```bash
pwd

ls

find ~ -name malware.sh

cd Downloads

cat malware.sh
```

**Done**

---

# Important Commands Learned
| Command | Purpose |
|----------|----------|
| pwd | Show Current Directory |
| ls | List Files |
| ls -l | Detailed List |
| ls -al | Show Hidden Files |
| cd | Change Directory |
| cd .. | Go Back |
| cd ~ | Home Directory |
| find | Search Files |
| cat | Read File |

---

# Investigating the System
After learning basic navigation, the next step is gathering
system information.

As a Cybersecurity Professional, you should know:

 Who is logged in

**Operating System**

**Kernel Version**

**Disk Usage**

**Linux Distribution**

**Configuration Files**

---

# Command 6 — whoami
Meaning

```
Who Am I
```

**Purpose**

Displays the username of the currently logged-in user.

**Syntax**

```bash
whoami
```

**Example**

```bash
ubuntu@tryhackme:~$ whoami
```

**Output**

```text
ubuntu
```

---

## Real World Usage
**Useful for**

- SSH Sessions
- Privilege Escalation
- Scripting
- User Verification

**Example**

```bash
whoami
```

**Output**

```text
root
```

**Means**

You have root privileges.

---

## Related Commands
Current User

```bash
whoami
```

**Current UID**

```bash
id
```

**Logged-in Users**

```bash
who
```

---

# Command 7 — uname
Meaning

```
Unix Name
```

**Purpose**

Shows operating system information.

**Syntax**

```bash
uname
```

**Example**

```bash
uname
```

**Output**

```text
Linux
```

**Only displays**

```
Operating System Name
```

---

# uname -a
Meaning

```
All Information
```

**Syntax**

```bash
uname -a
```

**Example**

```bash
Linux tryhackme 6.14.0-1018-aws x86_64 GNU/Linux
```

---

## Breakdown
```
Linux
```

**Operating System**

---

```
tryhackme
```

**Hostname**

---

```
6.14.0-1018-aws
```

**Kernel Version**

---

```
x86_64
```

**CPU Architecture**

(64-bit)

---

```
GNU/Linux
```

**Operating System Type**

---

## Why is uname Useful?
Cybersecurity professionals use it to know

**OS**

**Kernel**

**Architecture**

**Exploit Compatibility**

**Vulnerability Matching**

**Example**

Suppose an exploit only works on

```
Linux Kernel 5.x
```

**Run**

```bash
uname -a
```

**If kernel is**

```
6.x
```

The exploit may fail.

---

# Command 8 — df
Meaning

```
Disk Free
```

**Purpose**

Shows disk usage.

**Syntax**

```bash
df
```

**Human Readable**

```bash
df -h
```

---

## Example
```bash
df -h
```

**Output**

```text
Filesystem
Size
Used
Avail
Use%
Mounted
```

**Example**

```text
Filesystem      Size Used Avail Use%
/dev/root        70G 12G 58G 17%
```

---

## Breakdown
```
70G
```

**Total Space**

---

```
12G
```

**Used**

---

```
58G
```

**Available**

---

```
17%
```

**Disk Usage**

---

## Why df -h?
Without

```bash
df
```

**Output**

```
62914560000
```

Hard to read.

**With**

```bash
df -h
```

**Output**

```
58G
```

Easy.

---

# The /etc Directory
Linux stores most configuration files inside

```
/etc
```

**Navigate**

```bash
cd /etc
```

**View**

```bash
ls
```

**Example**

```
hosts
passwd
shadow
fstab
os-release
hostname
resolv.conf
```

---

## Important Files
| File | Purpose |
|-------|----------|
| passwd | User Accounts |
| shadow | Password Hashes |
| hosts | Local DNS |
| hostname | Computer Name |
| fstab | Mounted Drives |
| os-release | Linux Distribution |

---

# Reading System Files
Read

```bash
cat os-release
```

**Output**

```text
NAME="Ubuntu"
VERSION="24.04 LTS"
```

---

## Important Fields
```
NAME
```

**Operating System Name**

---

```
VERSION
```

**OS Version**

---

```
PRETTY_NAME
```

**Complete Version Name**

---

```
ID
```

**Distribution ID**

---

```
VERSION_CODENAME
```

**Ubuntu Codename**

**Example**

```
noble
```

---

# Why os-release?
It provides more accurate distribution information than

```bash
uname
```

**Because**

```
uname
↓
Kernel Information
```

while

```
os-release
↓
Distribution Information
```

---

# Practical Workflow
Need System Info?
↓
Current User

```bash
whoami
```

↓

**Kernel**

```bash
uname -a
```

↓

**Disk**

```bash
df -h
```

↓

**Distribution**

```bash
cat /etc/os-release
```

---

# Mini Challenge (TryHackMe)
Task

**Locate**

```
day1_report.txt
```

**Steps**

**Search**

```bash
find ~ -name day1_report.txt
```

**Go to directory**

```bash
cd <directory>
```

**Verify**

```bash
ls
```

**Read**

```bash
cat day1_report.txt
```

---

# Cybersecurity Example
Incident Response

**Need to know**

```
Current User
```

↓

```bash
whoami
```

**Need**

```
Kernel Version
```

↓

```bash
uname -a
```

**Need**

```
Disk Space
```

↓

```bash
df -h
```

**Need**

```
OS Version
```

↓

```bash
cat /etc/os-release
```

Everything collected.

---

# Command Cheat Sheet
```bash
whoami
```

**Current User**

---

```bash
uname
```

**OS Name**

---

```bash
uname -a
```

**Complete Kernel Information**

---

```bash
df -h
```

**Human-readable Disk Usage**

---

```bash
cd /etc
```

**Open Configuration Directory**

---

```bash
ls
```

**List Files**

---

```bash
cat os-release
```

**Read Distribution Information**

---

## Q1. Difference between uname and uname -a?
Answer

```
uname
↓
Only OS Name

Linux
```

```
uname -a
↓
Complete System Information
```

---

## Q2. Why use df -h instead of df?
Answer

**Because**

```
-h
↓
Human Readable
```

**Displays**

```
KB
MB
GB
```

instead of raw bytes.

---

## Q3. Which directory stores Linux configuration files?
Answer

```
/etc
```

---

## Q4. Which file stores Linux distribution details?
Answer

```text
/etc/os-release
```

---

# Important Linux Directories
```
/
│
├── bin        → Essential user commands
├── boot       → Boot loader files
├── dev        → Device files
├── etc        → Configuration files
├── home       → User home directories
├── lib        → Shared libraries
├── media      → Mounted USB/CD
├── mnt        → Temporary mount point
├── opt        → Optional software
├── proc       → Process information
├── root       → Root user's home
├── run        → Runtime data
├── sbin       → System commands
├── srv        → Service data
├── sys        → Kernel information
├── tmp        → Temporary files
├── usr        → Applications & binaries
├── var        → Logs & variable data
└── lost+found → Recovered files
```

---

# Most Important Directories for Cybersecurity

## /etc
Configuration Files

**Examples**

```
passwd
shadow
hosts
hostname
fstab
os-release
```

---

## /var
Stores

```
Logs
Cache
Mail
Databases
```

**Examples**

```
/var/log
```

**Important during**

- Incident Response
- Log Analysis
- Forensics

---

## /home
User Data

**Example**

```
/home/ubuntu
```

**Contains**

```
Downloads
Desktop
Documents
Pictures
```

---

## /tmp
Temporary Files

**Often abused by**

- Malware
- Attackers
- Shell Scripts

Always investigate.

---

## /root
Home Directory of

```
Root User
```

Normal users cannot access it.

---

## /proc
Virtual Filesystem

**Contains**

- Running Processes
- CPU Information
- Memory Information

**Example**

```bash
cat /proc/cpuinfo
```

---

# Complete Command Cheat Sheet

## Navigation
```bash
pwd
```

**Show Current Directory**

---

```bash
ls
```

**List Files**

---

```bash
ls -l
```

**Detailed List**

---

```bash
ls -al
```

Detailed + Hidden Files

---

```bash
cd folder
```

**Enter Folder**

---

```bash
cd ..
```

**Go Back**

---

```bash
cd ~
```

**Home Directory**

---

# Searching
```bash
find ~ -name file.txt
```

**Search File**

---

```bash
find / -name "*.conf"
```

**Find Config Files**

---

```bash
find / -name "*.log"
```

**Find Logs**

---

# Reading Files
```bash
cat filename
```

**Read File**

---

```bash
cat /etc/os-release
```

**Read Linux Version**

---

```bash
cat /etc/passwd
```

**Read Users**

---

# User Information
```bash
whoami
```

**Current User**

---

```bash
id
```

**UID & Groups**

---

```bash
who
```

**Logged-in Users**

---

# Operating System
```bash
uname
```

**OS Name**

---

```bash
uname -a
```

**Complete System Information**

---

# Storage
```bash
df -h
```

**Disk Usage**

---

# Useful Workflow
Need File?

↓

```bash
find
```

↓

Need Folder?

↓

```bash
cd
```

↓

Need List?

↓

```bash
ls
```

↓

Need Read?

↓

```bash
cat
```

↓

Need User?

↓

```bash
whoami
```

↓

Need OS?

↓

```bash
uname -a
```

↓

Need Disk?

↓

```bash
df -h
```

---

# Real World Scenario
Suppose

You login to a Linux Server.

**First commands**

```bash
whoami
```

Know current user.

↓

```bash
pwd
```

Know current location.

↓

```bash
ls
```

View files.

↓

```bash
uname -a
```

Know kernel version.

↓

```bash
df -h
```

Check storage.

↓

```bash
cat /etc/os-release
```

Know Linux Distribution.

↓

```bash
find / -name secrets.txt
```

Search file.

Mission Complete.

---

# Common Beginner Mistakes
 Forgetting spaces

**Wrong**

```bash
cdDocuments
```

**Correct**

```bash
cd Documents
```

---

**Wrong Path**

**Wrong**

```bash
cd Downloads/Documents
```

**Correct**

```bash
cd ~/Downloads/Documents
```

---

**Forgetting**

```
..
```

to move back.

---

**Running**

```bash
find /
```

instead of

```bash
find ~
```

Search becomes very slow.

---

# Cybersecurity Applications
Linux CLI is used in

**Penetration Testing**

**Malware Analysis**

**Digital Forensics**

**SOC Operations**

**Threat Hunting**

**Cloud Security**

**DevOps**

**Incident Response**

---

# Commands Used Daily by Ethical Hackers
```bash
pwd
```

```bash
ls
```

```bash
cd
```

```bash
find
```

```bash
cat
```

```bash
grep
```

```bash
chmod
```

```bash
chown
```

```bash
sudo
```

```bash
ssh
```

```bash
scp
```

```bash
curl
```

```bash
wget
```

```bash
ping
```

```bash
netstat
```

```bash
ss
```

```bash
ps
```

```bash
top
```

---

# Important Files to Remember
```
/etc/passwd
/etc/shadow
/etc/hosts
/etc/os-release
/var/log
/home/
/tmp
```

---

## Task 1
CLI

```
command-line interface
```

---

## Task 2
Mission File

```
/home/ubuntu/Documents/research/archive/mission_brief.txt
```

**Flag**

```
MISSION-FOUND
```

---

## Task 3
Current User

```
ubuntu
```

**Kernel Version**

```
6.14.0-1018-aws
```

**Free Disk Space**

```
58G
```

day1_report.txt

```
END-OF-DAY1
```

---

### Q1. What is the purpose of `pwd`?
Shows the current working directory.

---

### Q2. Difference between `ls` and `ls -al`?
- `ls` → Lists visible files.
- `ls -al` → Lists all files (including hidden) with detailed information.

---

### Q3. What does `whoami` return?
The username of the currently logged-in user.

---

### Q4. What is the difference between `uname` and `cat /etc/os-release`?
- `uname` → Kernel/OS information.
- `os-release` → Linux distribution details.

---

### Q5. Why is `df -h` preferred over `df`?
Because `-h` displays storage in a human-readable format (KB, MB, GB).

---

## Linux CLI Basics Complete!
You now have a strong foundation in Linux terminal navigation and essential commands. Mastering these basics will make advanced cybersecurity tasks significantly easier.

## Interview Questions

Q. What does pwd do?

**Answer**

Shows current working directory.

---

Q. Difference between ls and ls -l?

**Answer**

ls

Only names.

ls -l

Detailed information.

---

Q. Why do hidden files start with "."?

Because Linux treats dot-prefixed files as configuration files.

---

## Memory Tricks

```
pwd
↓
Where Am I?

ls
↓
What's Here?

cd
↓
Go There

find
↓
Search

cat
↓
Read
```

---

```
whoami
↓
Who?

```

```
uname
↓
What OS?

```

```
df -h
↓
How Much Disk?

```

```
os-release
↓
Which Linux?
```

---

```
pwd
↓
Present Working Directory

------------------

ls
↓
List Stuff

------------------

cd
↓
Change Directory

------------------

cat
↓
Read File

------------------

find
↓
Search File

------------------

whoami
↓
Current User

------------------

uname
↓
Operating System

------------------

df
↓
Disk Free
```

---

## Quick Revision

**Linux CLI**

**Terminal**

**Filesystem**

 pwd

 ls

 ls -l

 ls -al

**Hidden Files**

 cd

 cd ..

 find

 cat

---

**Part 2 — System Information (`whoami`, `uname`, `df -h`, `/etc`, `os-release`) + Real-world usage + Interview Notes**

---

 whoami

 uname

 uname -a

 df -h

 /etc

 os-release

**Linux Distribution**

**Kernel Version**

**Disk Information**

**System Investigation**

---

**Part 3 — Complete Linux CLI Cheat Sheet + Important Directories + Real-world Commands + One-Shot Revision + TryHackMe Answers**

---

## One Shot Revision

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

## TryHackMe Answers

## Final Summary

 Linux CLI is faster than GUI.

 Everything in Linux is treated as a file.

 Most cybersecurity tools rely heavily on the terminal.

 Learn navigation first before advanced tools.

 Practice commands daily to build speed.

---

This room introduced the core Linux CLI skills required for cybersecurity:

- Understanding the Linux terminal
- Navigating the filesystem
- Working with directories
- Searching for files
- Reading file contents
- Viewing user information
- Gathering system details
- Checking storage usage
- Reading Linux distribution information
- Solving simple investigation tasks using terminal commands

These commands form the foundation for future topics such as:

- Linux Privilege Escalation
- File Permissions
- Bash Scripting
- Networking
- Log Analysis
- Digital Forensics
- Penetration Testing
- Incident Response
- SOC Operations

---
