## Contents

- [Overview](#overview)
- [Hardware vs Software vs Operating System](#hardware-vs-software-vs-operating-system)
- [CIA Triad](#cia-triad)
- [1. Confidentiality](#1-confidentiality)
- [2. Integrity](#2-integrity)
- [3. Availability](#3-availability)
- [Common Security Weaknesses](#common-security-weaknesses)
- [Authentication](#authentication)
- [Something You Know](#something-you-know)
- [Something You Have](#something-you-have)
- [Something You Are](#something-you-are)
- [Weak Passwords](#weak-passwords)
- [Strong Password Rules](#strong-password-rules)
- [Password Best Practices](#password-best-practices)
- [Principle of Least Privilege](#principle-of-least-privilege)
- [Weak File Permissions](#weak-file-permissions)
- [Malicious Programs (Malware)](#malicious-programs-malware)
- [Virus](#virus)
- [Worm](#worm)
- [Trojan Horse](#trojan-horse)
- [Ransomware](#ransomware)
- [Spyware](#spyware)
- [Practical Attack Scenario](#practical-attack-scenario)
- [Step 1](#step-1)
- [Step 2](#step-2)
- [Step 3](#step-3)
- [Important SSH Note](#important-ssh-note)
- [Verify Logged User](#verify-logged-user)
- [List Files](#list-files)
- [Read File](#read-file)
- [Command History](#command-history)
- [Other Users](#other-users)
- [Password Guessing](#password-guessing)
- [Switching Users](#switching-users)
- [Root Account](#root-account)
- [Root Password](#root-password)
- [Reading Flag](#reading-flag)
- [Commands Learned](#commands-learned)
- [Important Linux Commands Cheat Sheet](#important-linux-commands-cheat-sheet)
- [Interview Questions](#interview-questions)
- [Quick Revision](#quick-revision)
- [Final Summary](#final-summary)

---

# Overview
Operating System (OS) Security focuses on protecting an operating system from unauthorized access, attacks, malware, and data loss.

The Operating System acts as a bridge between:

- Hardware
- Applications
- Users

Without an OS, software cannot communicate with computer hardware.

---

# Hardware vs Software vs Operating System
```
+----------------------------+
|        Applications        |
| Chrome | VS Code | Office  |
+----------------------------+
             ▲
             │
+----------------------------+
|      Operating System      |
| Windows | Linux | macOS    |
+----------------------------+
             ▲
             │
+----------------------------+
|         Hardware           |
| CPU RAM HDD SSD Keyboard   |
+----------------------------+
```

**Hardware**
- Physical components
- CPU
- RAM
- Motherboard
- SSD/HDD
- Keyboard
- Mouse
- Monitor

**Software**
- Programs
- Chrome
- Firefox
- Office
- VS Code
- Games

**Operating System**

**Examples**

**Desktop**
- Windows
- Linux
- macOS

**Mobile**
- Android
- iOS

**Server**
- Windows Server
- Linux
- IBM AIX
- Oracle Solaris

---

# Why Operating System Security Matters
**Your OS stores:**

- Personal files
- Photos
- Videos
- Emails
- Passwords
- Banking information
- Office documents
- University work

**If compromised:**

- Data can be stolen
- Files can be modified
- Files can be deleted
- System can become unusable

---

# CIA Triad
The three pillars of Cyber Security

```
          Confidentiality
                ▲
               / \
              /   \
             /     \
Integrity -------- Availability
```

---

## 1. Confidentiality
**Meaning:**

Only authorized people should access data.

**Examples:**

 Password Protected Files
 Bank Accounts
 Medical Records
 Company Documents

**Attack Examples:**

- Password Theft
- Data Leakage
- Spyware

---

## 2. Integrity
**Meaning:**

Data should never be modified without authorization.

**Examples:**

**Changing**

```
Salary = ₹50000
↓
Salary = ₹5
```

Integrity has been broken.

**Attack Examples:**

- File Modification
- Database Tampering
- Malware

---

## 3. Availability
**Meaning:**

Systems should always remain available.

**Examples:**

- Websites
- Banking Apps
- Email
- Hospital Systems

**Attack Examples:**

- Ransomware
- DDoS Attack
- Disk Failure

---

# Common Security Weaknesses
1. Weak Passwords
2. Weak File Permissions
3. Malware

---

# Authentication
Authentication means verifying your identity.

There are three factors.

---

## Something You Know
**Examples:**

- Password
- PIN
- Passphrase

---

## Something You Have
**Examples:**

- Phone
- Smart Card
- OTP Token
- Security Key

---

## Something You Are
**Examples:**

- Fingerprint
- Face Recognition
- Retina Scan

---

# Weak Passwords
Weak passwords are easy to guess.

**Common Examples:**

```
123456
123456789
qwerty
password
111111
12345678
abc123
1234567
password1
12345
1234567890
123123
000000
iloveyou
1234
1q2w3e4r5t
qwertyuiop
123
monkey
dragon
```

These passwords appear in dictionary attacks and leaked password databases.

---

# Strong Password Rules
**Use**

 Uppercase Letters
 Lowercase Letters
 Numbers
 Symbols
Minimum
12–16 Characters

**Examples:**

```
LearnM00r
```

**Avoid**

- Birthdays
- Phone Numbers
- Names
- Keyboard Patterns

**Examples:**

**Bad**

```
qwerty
123456
dragon
```

**Good**

```
TryHack!2026
```

---

# Password Best Practices
 Use Different Passwords
 Use Password Manager
 Enable MFA
 Never Share Passwords
 Never Reuse Passwords

---

# Principle of Least Privilege
Definition
Users should receive only the permissions necessary to perform their work.
Never give Administrator or Root access unless required.

**Benefits**

- Better Security
- Less Damage
- Reduced Risk

---

# Weak File Permissions
**Poor permissions allow attackers to**

- Read Files
- Modify Files
- Delete Files

**Weak permissions affect**

- Confidentiality
- Integrity

---

# Malicious Programs (Malware)
Malware is software created to damage or control systems.

**Types**

---

## Virus
Attaches to files.

Needs user execution.

---

## Worm
Spreads automatically through networks.

---

## Trojan Horse
Looks legitimate.

Actually installs malicious code.

**Example**

**Fake Game Installer**

↓

**Installs Backdoor**

---

## Ransomware
Encrypts files.

Victim cannot access data.

Attacker demands ransom.

**Targets**

**Availability**

---

## Spyware
**Secretly collects**

- Passwords
- Browsing History
- Personal Data

**Targets**

**Confidentiality**

---

# Practical Attack Scenario
Goal

Gain unauthorized access to a Linux machine.

---

## Step 1
Start

**AttackBox**

+

**Lab Machine**

---

## Step 2
Open Terminal

---

## Step 3
Connect using SSH

**Syntax**

```bash
ssh username@IP
```

**Example**

```bash
ssh sammie@10.10.10.10
```

**Password**

```
dragon
```

**First Connection**

```
Are you sure you want to continue connecting?

yes
```

SSH stores the server fingerprint inside

```
known_hosts
```

---

# Important SSH Note
While typing passwords

Nothing appears.

**No**

```
*
```

**No**

```
•
```

**No**

**Characters**

This is normal.

---

# Verify Logged User
Command

```bash
whoami
```

**Purpose**

Displays current username.

**Example**

```bash
sammie
```

---

# List Files
Command

```bash
ls
```

**Purpose**

Lists directory contents.

**Example**

```bash
country.txt
draft.md
icon.png
password.txt
profile.jpg
```

---

# Read File
Command

```bash
cat filename
```

**Example**

```bash
cat draft.md
```

**Output**

```
Reusing passwords means
your password becomes exposed
if another service is hacked.
```

---

# Command History
Command

```bash
history
```

**Purpose**

Displays previously executed commands.

**Useful for**

- Investigations
- Forensics
- Finding Mistakes
- Recovering Commands

---

# Other Users
Users Found

```
johnny
linda
```

---

# Password Guessing
Example

```bash
ssh johnny@IP
```

**Password**

```
abc123
```

---

# Switching Users
Command

```bash
su - username
```

**Example**

```bash
su - root
```

**Purpose**

Become another user.

---

# Root Account
Linux Administrator

```
root
```

**Windows Equivalent**

```
Administrator
```

**Root has**

**Full Access**

 Can Read Every File

**Can Modify Everything**

---

# Root Password
Example

```
happyHack!NG
```

---

# Reading Flag
Command

```bash
cat flag.txt
```

**Example Output**

```
THM{YouGotRoot}
```

---

# Commands Learned
Current User

```bash
whoami
```

**SSH Login**

```bash
ssh username@IP
```

**List Files**

```bash
ls
```

**Read File**

```bash
cat filename
```

**Command History**

```bash
history
```

**Switch User**

```bash
su - username
```

---

# Important Linux Commands Cheat Sheet
Current User

```bash
whoami
```

**Current Directory**

```bash
pwd
```

**List Files**

```bash
ls
```

**Hidden Files**

```bash
ls -la
```

**Read File**

```bash
cat file
```

**Change Directory**

```bash
cd folder
```

**Clear Terminal**

```bash
clear
```

**Show History**

```bash
history
```

**SSH Login**

```bash
ssh user@IP
```

**Switch User**

```bash
su - user
```

**Exit**

```bash
exit
```

---

## Interview Questions

Q1. What is an Operating System?

An Operating System is software that manages computer hardware and provides services to applications.

---

Q2. What is the CIA Triad?

- Confidentiality
- Integrity
- Availability

---

Q3. What are the three authentication factors?

- Something you know
- Something you have
- Something you are

---

Q4. What is SSH?

SSH (Secure Shell) is a secure protocol used to remotely access another machine over an encrypted connection.

---

Q5. Difference between Root and Administrator?

Linux:
```
root
```

Windows:
```
Administrator
```

Both have complete system privileges.

---

Q6. Which command shows the current logged-in user?

```bash
whoami
```

---

Q7. Which command lists files?

```bash
ls
```

---

Q8. Which command displays file contents?

```bash
cat filename
```

---

Q9. Which command displays previously executed commands?

```bash
history
```

---

Q10. Which command switches to another user?

```bash
su - username
```

## Quick Revision

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

## Final Summary

 Operating System controls hardware.

 OS stores valuable personal and business data.

 CIA Triad is the foundation of cybersecurity.

 Weak passwords are the easiest attack vector.

 Always follow Least Privilege.

 Malware can affect Confidentiality, Integrity, and Availability.

 SSH provides secure remote login.

 Linux root is equivalent to Windows Administrator.

 Learn basic Linux commands before penetration testing.

---
