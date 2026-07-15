## Contents

- [Learning Objectives](#learning-objectives)
- [Introduction](#introduction)
- [Operating System (OS)](#operating-system-os)
- [What is an Operating System?](#what-is-an-operating-system)
- [Definition](#definition)
- [Simple Definition](#simple-definition)
- [Where Does the OS Sit?](#where-does-the-os-sit)
- [Why Do We Need an Operating System?](#why-do-we-need-an-operating-system)
- [Real World Analogy — Airport](#real-world-analogy-—-airport)
- [Airport Components](#airport-components)
- [Why is the OS Called the "Invisible Manager"?](#why-is-the-os-called-the-"invisible-manager")
- [Core Responsibilities of an Operating System](#core-responsibilities-of-an-operating-system)
- [Privilege Levels](#privilege-levels)
- [Kernel Space](#kernel-space)
- [User Space](#user-space)
- [Why Separate Kernel and User Space?](#why-separate-kernel-and-user-space)
- [Kernel vs User Space](#kernel-vs-user-space)
- [System Calls](#system-calls)
- [System Call](#system-call)
- [Common System Calls](#common-system-calls)
- [Operating System Responsibilities](#operating-system-responsibilities)
- [1. Process Management](#1-process-management)
- [2. Memory Management](#2-memory-management)
- [3. File System Management](#3-file-system-management)
- [4. User Management](#4-user-management)
- [5. Device Management](#5-device-management)
- [Operating System Security](#operating-system-security)
- [Authentication](#authentication)
- [Permissions](#permissions)
- [Isolation](#isolation)
- [System Protection](#system-protection)
- [Remember OS Duties](#remember-os-duties)
- [Kernel vs User](#kernel-vs-user)
- [Why do applications need an OS?](#why-do-applications-need-an-os)
- [What is Kernel Space?](#what-is-kernel-space)
- [What is User Space?](#what-is-user-space)
- [What is a System Call?](#what-is-a-system-call)
- [Why is Kernel/User separation important?](#why-is-kernel/user-separation-important)
- [Name five responsibilities of an OS.](#name-five-responsibilities-of-an-os)
- [OS Interfaces](#os-interfaces)
- [Graphical User Interface (GUI)](#graphical-user-interface-gui)
- [GUI Components](#gui-components)
- [Advantages of GUI](#advantages-of-gui)
- [Disadvantages](#disadvantages)
- [Command Line Interface (CLI)](#command-line-interface-cli)
- [CLI Workflow](#cli-workflow)
- [Why Professionals Prefer CLI](#why-professionals-prefer-cli)
- [Common Linux Commands](#common-linux-commands)
- [GUI vs CLI](#gui-vs-cli)
- [Operating System Landscape](#operating-system-landscape)
- [Desktop Operating Systems](#desktop-operating-systems)
- [Windows](#windows)
- [macOS](#macos)
- [Linux Desktop](#linux-desktop)
- [Server Operating Systems](#server-operating-systems)
- [Mobile Operating Systems](#mobile-operating-systems)
- [Android](#android)
- [iOS](#ios)
- [Embedded Operating Systems](#embedded-operating-systems)
- [Real-Time Operating Systems (RTOS)](#real-time-operating-systems-rtos)
- [Cloud & Virtual Operating Systems](#cloud-&-virtual-operating-systems)
- [Container Operating Systems](#container-operating-systems)
- [Why So Many Operating Systems?](#why-so-many-operating-systems)
- [Practical Investigation](#practical-investigation)
- [Task 2](#task-2)
- [Task 3](#task-3)
- [Important Terminology](#important-terminology)
- [What is GUI?](#what-is-gui)
- [What is CLI?](#what-is-cli)
- [Why do servers often avoid GUI?](#why-do-servers-often-avoid-gui)
- [What is Linux?](#what-is-linux)
- [Difference between Desktop and Server OS?](#difference-between-desktop-and-server-os)
- [What is Embedded Linux?](#what-is-embedded-linux)
- [What is RTOS?](#what-is-rtos)
- [Common Mistakes](#common-mistakes)
- [OS Types](#os-types)
- [Linux Family](#linux-family)
- [Final Revision & Interview Guide](#final-revision-&-interview-guide)
- [Important Commands (Preview)](#important-commands-preview)
- [Navigation](#navigation)
- [File Management](#file-management)
- [Viewing Files](#viewing-files)
- [System Information](#system-information)
- [Important Terminology](#important-terminology)
- [Kernel](#kernel)
- [Process](#process)
- [Thread](#thread)
- [File System](#file-system)
- [Device Driver](#device-driver)
- [Authorization](#authorization)
- [Mind Map](#mind-map)
- [Complete Architecture](#complete-architecture)
- [PMFUDS](#pmfuds)
- [KUSH](#kush)
- [GUI](#gui)
- [CLI](#cli)
- [Operating System Types](#operating-system-types)
- [Why do we need an OS?](#why-do-we-need-an-os)
- [What is a Kernel?](#what-is-a-kernel)
- [Difference between Kernel Space and User Space?](#difference-between-kernel-space-and-user-space)
- [Explain Process Management.](#explain-process-management)
- [Explain Memory Management.](#explain-memory-management)
- [Explain File Management.](#explain-file-management)
- [Explain Device Management.](#explain-device-management)
- [GUI vs CLI?](#gui-vs-cli)
- [Why do servers mostly use CLI?](#why-do-servers-mostly-use-cli)
- [Name major Operating Systems.](#name-major-operating-systems)
- [Why is Linux popular for Servers?](#why-is-linux-popular-for-servers)
- [Common Mistakes](#common-mistakes)
- [Memory Tricks](#memory-tricks)
- [Quick Revision](#quick-revision)
- [One Shot Revision](#one-shot-revision)
- [TryHackMe Answers](#tryhackme-answers)
- [Final Summary](#final-summary)

> A professional, interview-oriented study guide covering Operating System fundamentals, architecture, privilege levels, and core responsibilities.

---

# Learning Objectives
By the end of this room you should be able to:

- Understand what an Operating System (OS) is.
- Explain the responsibilities of an OS.
- Differentiate Kernel Space and User Space.
- Understand how applications communicate with hardware.
- Learn major Operating System responsibilities.
- Understand why operating systems are essential.
- Prepare for Windows/Linux modules.

---

# Introduction
Whenever you switch on your laptop...

 Browser opens.
 Music starts.
 Wi-Fi connects.
 Files appear.
 USB works.

Everything feels automatic.

But...

**Who coordinates all of this?**

The answer is:

# Operating System (OS)
Without an Operating System...

 CPU wouldn't know which application to execute.

 RAM wouldn't know which process owns memory.

 Hard disk couldn't organize files.

 Devices couldn't communicate properly.

The Operating System is the invisible manager that coordinates everything.

---

# What is an Operating System?

## Definition
An **Operating System (OS)** is the core system software that acts as an intermediary between:

- User
- Applications
- Computer Hardware

It manages all computer resources efficiently and safely.

---

## Simple Definition
> The Operating System is the software that controls the entire computer.

Without it...

Applications cannot directly use

- CPU
- RAM
- Hard Disk
- Keyboard
- Mouse
- Network
- GPU

The OS manages everything on their behalf.

---

# Where Does the OS Sit?
```
             USER
               │
               ▼
      +----------------+
      |  Applications  |
      +----------------+
               │
               ▼
      +----------------+
      | Operating Sys. |
      +----------------+
               │
               ▼
      +----------------+
      |   Hardware     |
      +----------------+
```

Think of it as a translator.

```
Human
   │
   ▼
Applications
   │
   ▼
Operating System
   │
   ▼
CPU / RAM / Disk / Devices
```

---

# Why Do We Need an Operating System?
Imagine a computer **without** an OS.

Every application would have to control:

- CPU
- RAM
- Keyboard
- Mouse
- SSD
- Printer
- GPU
- Network Card

directly.

Example:

Chrome wants RAM.

Spotify wants RAM.

VS Code wants RAM.

Game wants RAM.

Who decides?

Without an OS...

```
Chrome  ─┐
Spotify ─┼──────► RAM
VSCode ──┤
Game ────┘

Chaos.
```

The Operating System solves this problem.

```
Chrome
Spotify
VSCode
Game
      │
      ▼
Operating System
      │
      ▼
Allocates RAM Fairly
```

---

# Real World Analogy — Airport
TryHackMe compares an OS to an Airport.

Let's expand it.

```
Airport
Passengers
↓
Airlines
↓
Air Traffic Control
↓
Runway
```

Computer equivalent

```
User
↓
Applications
↓
Operating System
↓
Hardware
```

---

## Airport Components
| Airport | Computer |
|----------|----------|
| Passengers | Users |
| Airlines | Applications |
| Air Traffic Control | Operating System |
| Runway | CPU |
| Fuel System | Power Supply |
| Storage Hangars | Hard Disk |
| Aircraft | Running Processes |

The Air Traffic Control decides

- Which plane lands
- Which plane takes off
- Runway allocation
- Prevent collisions

Similarly...

The Operating System decides

- Which process runs
- Which gets memory
- Which accesses hardware
- Which gets CPU time

---

# Why is the OS Called the "Invisible Manager"?
Users interact with applications.

Applications interact with the Operating System.

The Operating System interacts with hardware.

Users never directly communicate with hardware.

```
User
 │
 ▼
Chrome
 │
 ▼
Operating System
 │
 ▼
CPU
RAM
SSD
Network
```

---

# Core Responsibilities of an Operating System
```
Operating System
│
├── Process Management
├── Memory Management
├── File Management
├── Device Management
├── User Management
├── Security
├── Scheduling
├── Resource Allocation
└── Hardware Communication
```

---

# Privilege Levels
Modern Operating Systems divide execution into two major areas.

```
Computer

│
├── Kernel Space
│
└── User Space
```

This separation prevents applications from damaging the entire system.

---

# Kernel Space
Kernel Space is the most privileged area.

It has unrestricted access to:

- CPU
- RAM
- Drivers
- Storage
- Hardware
- Devices

Everything critical happens here.

```
Kernel Space

CPU ✔

RAM ✔

Disk ✔

Drivers ✔

Hardware ✔
```

Examples

- Process Scheduler
- Memory Manager
- File System
- Device Drivers
- Network Stack

---

# User Space
Applications execute here.

Examples

- Chrome
- Firefox
- VS Code
- Discord
- Spotify
- Games

Applications cannot directly access hardware.

Instead...

```
Chrome
↓
System Call
↓
Kernel
↓
CPU
```

This protects the operating system from crashes.

---

# Why Separate Kernel and User Space?
Suppose Chrome crashes.

If Chrome had direct hardware access...

```
Chrome Crash
↓
Entire Operating System Crash
```

With User Space...

```
Chrome Crash
↓
Chrome Closes
↓
Operating System Continues Running
```

Huge security advantage.

---

# Kernel vs User Space
| Kernel Space | User Space |
|---------------|------------|
| Full Hardware Access | No Direct Hardware Access |
| Runs Kernel | Runs Applications |
| Highly Privileged | Restricted |
| Controls CPU | Requests CPU |
| Controls Memory | Uses Allocated Memory |
| Fast | Safer |

---

# System Calls
Applications cannot directly talk to hardware.

Instead they ask the Operating System.

This request is called a:

# System Call
Example

```
Application

Open File

↓

System Call

↓

Kernel

↓

Disk

↓

Return Data
```

---

## Common System Calls
- Open File
- Read File
- Write File
- Create Process
- Allocate Memory
- Connect Network
- Close File

---

# Operating System Responsibilities
---

# 1. Process Management
A Process = Running Program

Examples

```
Chrome

Spotify

Discord

VS Code

Game
```

The Operating System

 Creates processes

 Schedules CPU

 Switches between tasks

 Terminates finished processes

---

Example

```
CPU

│
├── Chrome
├── Spotify
├── VS Code
└── Discord
```

The OS rapidly switches CPU time between them.

This creates multitasking.

---

# 2. Memory Management
RAM is limited.

Example

```
RAM = 8 GB

Chrome = 2 GB

Game = 4 GB

VS Code = 1 GB

Spotify = 500 MB
```

OS responsibilities

 Allocate RAM

 Free RAM

 Protect Memory

 Virtual Memory

Without memory management...

Applications would overwrite each other's memory.

---

# 3. File System Management
Organizes

```
Disk

↓

Folders

↓

Files

↓

Permissions

↓

Metadata
```

Handles

- File Names
- Directories
- Read/Write
- Delete
- Permissions
- Timestamps

Examples

```
Documents/

Pictures/

Downloads/

Music/

Videos/
```

---

# 4. User Management
Supports multiple users.

```
PC

│
├── Alice
├── Bob
└── Admin
```

Responsibilities

 Login

 Passwords

 Permissions

 Authentication

 Access Control

---

# 5. Device Management
Every hardware device needs a driver.

```
Printer

↓

Driver

↓

Operating System

↓

Application
```

Supported devices

- Keyboard
- Mouse
- GPU
- Webcam
- Printer
- USB
- Bluetooth
- Wi-Fi

---

# Operating System Security
Even before Antivirus...

The OS already protects the computer.

Major Security Features

```
Operating System Security

│
├── Authentication
├── Permissions
├── Isolation
└── System Protection
```

---

## Authentication
Verifies user identity.

Examples

- Password
- PIN
- Fingerprint
- Face Unlock

---

## Permissions
Determines what users or applications can do.

```
Read

Write

Execute
```

Example

```
student

Cannot Delete

System Files
```

---

## Isolation
Applications run separately.

```
Chrome

VS Code

Spotify

Discord
```

Each has isolated memory.

One crash won't affect others.

---

## System Protection
Protects

- System Files
- Kernel
- Drivers
- Registry
- Critical Settings

against unauthorized changes.

---

## Remember OS Duties
```
PMFUDS

P → Process

M → Memory

F → File

U → User

D → Device

S → Security
```

---

## Kernel vs User
```
Kernel = KING 👑

User = Guest 🙋
```

KING controls everything.

Guests must ask permission.

---

## System Call
Remember

```
Application

↓

Request

↓

Kernel

↓

Hardware
```

Applications NEVER touch hardware directly.

---

### What is an Operating System?
System software that manages computer hardware, software resources, and provides services to applications.

---

### Why do applications need an OS?
Because applications cannot safely communicate directly with hardware.

---

### What is Kernel Space?
The privileged area where the kernel executes with unrestricted access to hardware.

---

### What is User Space?
The protected area where applications execute without direct hardware access.

---

### What is a System Call?
A mechanism through which applications request services from the operating system kernel.

---

### Why is Kernel/User separation important?
- Security
- Stability
- Reliability
- Process Isolation

---

### Name five responsibilities of an OS.
- Process Management
- Memory Management
- File Management
- User Management
- Device Management

---

# OS Interfaces
There are two primary ways users interact with an Operating System.

```
Operating System
│
├── GUI (Graphical User Interface)
│
└── CLI (Command Line Interface)
```

Although both interact with the same Operating System,
they provide different user experiences.

---

# Graphical User Interface (GUI)
GUI is the interface most users use every day.

Examples:

- Windows Desktop
- macOS Finder
- Ubuntu Desktop
- Android Home Screen
- iPhone Interface

Instead of typing commands...

Users interact using

- Mouse
- Touch
- Icons
- Buttons
- Windows
- Menus

---

## GUI Components
```
Desktop
│
├── Icons
├── Taskbar
├── Start Menu
├── File Explorer
├── Windows
└── Settings
```

Example

```
Click Folder

↓

Open Documents

↓

Open File
```

Everything is visual.

---

# Advantages of GUI
 Easy to learn

 User friendly

 Visual navigation

 Great for beginners

 Supports drag & drop

---

# Disadvantages
 Slower than CLI

 Uses more RAM

 Less automation

 Limited control

---

# Command Line Interface (CLI)
CLI is a text-based interface.

Instead of clicking...

Users type commands.

Example

```bash
ls

pwd

cd

mkdir notes

cat file.txt
```

The Operating System interprets every command.

---

## CLI Workflow
```
User

↓

Command

↓

Shell

↓

Operating System

↓

Hardware
```

---

## Why Professionals Prefer CLI
 Faster

 Precise

 Scriptable

 Automation

 Remote Administration

 Better for servers

---

## Common Linux Commands
```bash
pwd

ls

cd

mkdir

touch

cp

mv

rm

cat

grep
```

---

## GUI vs CLI
| GUI | CLI |
|------|------|
| Mouse | Keyboard |
| Easy | Requires Practice |
| Beginner Friendly | Powerful |
| Slower | Faster |
| More RAM | Less RAM |
| Limited Automation | Highly Automated |

---

# Operating System Landscape
Operating Systems are designed for different environments.

```
Operating Systems
│
├── Desktop
├── Server
├── Mobile
├── Embedded
└── Cloud / Virtual
```

Every Operating System is optimized for a specific purpose.

---

# Desktop Operating Systems
Designed for personal computers.

Typical Uses

- Browsing
- Office Work
- Gaming
- Development
- Multimedia

Examples

```
Windows

macOS

Linux Desktop
```

Characteristics

 Rich GUI

 Multi-tasking

 User Friendly

 Multimedia Support

---

# Windows
Most widely used desktop operating system.

Developed by Microsoft.

Popular Versions

```
Windows 10

Windows 11
```

Uses

- Personal Computers
- Gaming
- Office
- Development

Advantages

 Huge software ecosystem

 Gaming support

 Driver compatibility

Disadvantages

 Paid License

 Malware target

---

# macOS
Developed by Apple.

Runs only on Apple hardware.

Examples

```
Sonoma

Sequoia

Tahoe
```

Advantages

 Stable

 Excellent UI

 Secure

 Great developer tools

Disadvantages

 Expensive Hardware

 Limited gaming

---

# Linux Desktop
Linux is NOT one Operating System.

It is a family of distributions.

Examples

```
Ubuntu

Debian

Fedora

Linux Mint

Arch Linux
```

Advantages

 Free

 Open Source

 Secure

 Highly Customizable

 Excellent for Programming

Disadvantages

 Smaller commercial software ecosystem

---

# Server Operating Systems
Servers prioritize

- Stability
- Security
- Uptime
- Performance

instead of appearance.

Examples

```
Windows Server

Ubuntu Server

Debian

Red Hat

CentOS
```

Characteristics

 Multi-user

 Remote Access

 High Availability

 Usually No GUI

---

# Mobile Operating Systems
Designed for

- Phones
- Tablets
- Smart Devices

Examples

```
Android

iOS
```

Characteristics

 Touch Interface

 Battery Optimization

 Secure App Isolation

 Sensors Integration

---

# Android
Developed by Google.

Based on Linux Kernel.

Runs on

- Samsung
- Pixel
- OnePlus
- Xiaomi

Advantages

 Highly Customizable

 Open Ecosystem

---

# iOS
Developed by Apple.

Runs on

- iPhone

- iPad

Advantages

 High Security

 Smooth Performance

 Controlled Ecosystem

---

# Embedded Operating Systems
Used in devices with dedicated functions.

Examples

```
Routers

Cars

Smart TVs

ATMs

Medical Devices

Industrial Machines
```

Examples of Embedded OS

```
OpenWRT

Yocto

Ubuntu Core
```

Characteristics

 Lightweight

 Low Power

 Stable

---

# Real-Time Operating Systems (RTOS)
Special Operating Systems for time-critical applications.

Examples

```
Aircraft

Missile Systems

Robotics

Medical Equipment
```

Popular RTOS

```
FreeRTOS

VxWorks

QNX
```

---

# Cloud & Virtual Operating Systems
Used in

- AWS
- Azure
- Google Cloud

Examples

```
Ubuntu Server

Amazon Linux

Rocky Linux
```

Characteristics

 Lightweight

 Highly Scalable

 Virtualized

---

# Container Operating Systems
Containers package

Application

+

Dependencies

without requiring an entire virtual machine.

Examples

```
Alpine Linux

Flatcar Linux

Bottlerocket
```

Advantages

 Small Size

 Fast Deployment

 Efficient

---

# Why So Many Operating Systems?
Different devices require different Operating Systems.

```
Laptop

↓

Desktop OS

Phone

↓

Mobile OS

Router

↓

Embedded OS

Cloud

↓

Server OS
```

There is no "one OS for everything."

---

# Practical Investigation
TryHackMe provides an Ubuntu virtual machine.

Tasks performed

 Open About This Computer

 View System Monitor

 View Hardware

 Inspect File System

 Browse Home Directory

 Find Note

---

## Task 2
Kernel Space with unrestricted access

```
Kernel Space
```

---

User Accounts & Authentication

```
User Management
```

---

Ubuntu MATE Version

```
1.26.2
```

---

RAM Installed

```
1.9 GiB
```

---

## Task 3
Filesystem Type

```
ext4
```

---

Number of User Directories

```
3
```

---

Flag

```
THM{new_pc_for_free!}
```

---

# Important Terminology
| Term | Meaning |
|------|----------|
| Operating System | Core software managing hardware and software resources |
| Kernel | Core component of the OS |
| User Space | Area where applications execute |
| Kernel Space | Privileged area with direct hardware access |
| GUI | Graphical User Interface |
| CLI | Command Line Interface |
| System Call | Request made by applications to the kernel |
| Process | Running program |
| Driver | Software allowing hardware communication |
| File System | Organizes data on storage devices |

---

## What is GUI?
A graphical interface allowing users to interact through icons, menus and windows.

---

## What is CLI?
A text-based interface where commands are typed to interact with the operating system.

---

## Why do servers often avoid GUI?
Because GUI consumes more RAM and CPU resources.

Servers prioritize performance and stability.

---

## What is Linux?
An open-source family of operating systems based on the Linux Kernel.

---

## Difference between Desktop and Server OS?
Desktop focuses on user experience.

Server focuses on performance, uptime and reliability.

---

## What is Embedded Linux?
A lightweight Linux distribution designed for specialized devices.

---

## What is RTOS?
A Real-Time Operating System designed for applications requiring guaranteed response times.

---

# Common Mistakes
 Thinking Linux is one OS.

 Linux is a family of distributions.

---

 Thinking GUI is always better.

 GUI is easier, CLI is more powerful.

---

 Assuming all operating systems are identical.

 Every OS is designed for different workloads.

---

 Believing servers require GUI.

 Most production servers run headless.

---

## OS Types
```
Desktop

Server

Mobile

Embedded

Cloud

Remember

DSMEC
```

---

## GUI vs CLI
```
GUI

Click

Visual

Easy

CLI

Type

Powerful

Fast
```

---

## Linux Family
```
Ubuntu

Debian

Fedora

Arch

Mint
```

---

# Final Revision & Interview Guide
---

# Important Commands (Preview)
Although this room doesn't teach CLI commands in detail, you'll encounter these in the next rooms.

## Navigation
```bash
pwd        # Print current directory
ls         # List files/directories
cd         # Change directory
```

## File Management
```bash
touch file.txt
mkdir notes
cp source destination
mv old new
rm file.txt
```

## Viewing Files
```bash
cat file.txt
less file.txt
head file.txt
tail file.txt
```

## System Information
```bash
uname -a
hostname
whoami
id
```

Remember:

GUI = Click

CLI = Type

---

# Important Terminology

## Operating System (OS)
Software responsible for managing hardware, software, users, memory, storage and devices.

---

## Kernel
The core of an operating system.

Responsible for:

- CPU Scheduling
- Memory Allocation
- Hardware Communication
- Device Drivers
- System Calls

---

## User Space
Where user applications execute.

Examples:

- Chrome
- Firefox
- VS Code
- Spotify

Applications cannot directly access hardware.

---

## Kernel Space
Highly privileged area.

Can directly access:

- CPU
- RAM
- Storage
- Network
- Hardware

---

## Process
A program currently running in memory.

Example

```
chrome.exe

firefox

spotify

code
```

---

## Thread
A lightweight unit of execution inside a process.

Example

```
Chrome

├── UI Thread

├── Rendering Thread

└── Network Thread
```

---

## File System
Organizes files on storage devices.

Examples

```
NTFS

ext4

FAT32

APFS

exFAT
```

---

## Device Driver
Software allowing Operating System and Hardware to communicate.

Examples

```
Printer Driver

GPU Driver

Audio Driver

Wi-Fi Driver
```

---

## Authentication
Verifying identity.

Examples

```
Password

PIN

Fingerprint

Face Unlock
```

---

## Authorization
Determines what an authenticated user is allowed to do.

Example

```
Login ✔

Delete System File ❌
```

---

## Permissions
Control

```
Read

Write

Execute
```

---

# Mind Map
```
Operating System

│

├── User

├── Applications

├── Kernel

│

├── Process Management

├── Memory Management

├── File Management

├── User Management

├── Device Management

└── Security

       │

       ├── Authentication

       ├── Permissions

       ├── Isolation

       └── Protection
```

---

# Complete Architecture
```
                 USER

                   │

                   ▼

          Applications

                   │

             System Calls

                   │

                   ▼

+--------------------------------+

|          KERNEL SPACE          |

|--------------------------------|

| Process Manager                |

| Memory Manager                 |

| Scheduler                      |

| Drivers                        |

| File System                    |

| Network Stack                  |

+--------------------------------+

                   │

                   ▼

+--------------------------------+

|           HARDWARE             |

|--------------------------------|

| CPU                            |

| RAM                            |

| SSD                            |

| GPU                            |

| Network Card                   |

| USB Devices                    |

+--------------------------------+
```

---

## PMFUDS
Remember OS responsibilities

```
P → Process

M → Memory

F → File

U → User

D → Device

S → Security
```

---

## KUSH
Remember privilege levels

```
Kernel

↓

Unlimited

System

Hardware
```

Kernel = Unlimited Access

---

## GUI
```
Graphical

User

Interface
```

Click Everything.

---

## CLI
```
Command

Line

Interface
```

Type Everything.

---

## Operating System Types
```
Desktop

↓

Server

↓

Mobile

↓

Embedded

↓

Cloud

Remember

DSMEC
```

---

## What is an Operating System?
An Operating System is system software that manages computer hardware and software resources while providing services to applications.

---

## Why do we need an OS?
Without an Operating System:

- Programs cannot communicate with hardware.
- Memory cannot be managed.
- CPU scheduling cannot occur.
- Devices cannot work together.

---

## What is a Kernel?
The kernel is the core component of an Operating System responsible for hardware management and resource allocation.

---

## Difference between Kernel Space and User Space?
| Kernel Space | User Space |
|--------------|------------|
| Full Hardware Access | Restricted Access |
| Highly Privileged | Limited Privileges |
| Runs Kernel Code | Runs Applications |

---

## What is a System Call?
A controlled request made by an application to the kernel for hardware or system services.

---

## Explain Process Management.
The OS creates, schedules, pauses, resumes, and terminates processes while allocating CPU time.

---

## Explain Memory Management.
The OS allocates RAM, protects process memory, frees unused memory, and manages virtual memory.

---

## Explain File Management.
Responsible for:

- Files
- Directories
- Permissions
- Storage
- Metadata

---

## Explain Device Management.
Handles communication between hardware and applications using drivers.

---

## GUI vs CLI?
| GUI | CLI |
|------|------|
| Mouse | Keyboard |
| Beginner Friendly | Professional |
| Slower | Faster |
| Visual | Text Based |

---

## Why do servers mostly use CLI?
Because CLI:

- Uses fewer resources
- Is faster
- Supports automation
- Works remotely

---

## Name major Operating Systems.
Desktop

- Windows
- macOS
- Linux

Mobile

- Android
- iOS

Servers

- Ubuntu Server
- Red Hat
- Windows Server

Embedded

- OpenWRT
- FreeRTOS

---

## Why is Linux popular for Servers?
- Stable
- Secure
- Free
- Open Source
- Lightweight

---

# Common Mistakes
 Thinking Kernel = Operating System

 Kernel is only one component of the OS.

---

 Thinking Linux is one Operating System

 Linux consists of many distributions.

---

 Assuming GUI is always better

 GUI is easier.

CLI is faster.

---

 Thinking Applications access hardware directly.

 They use System Calls.

---

 Assuming every device runs Windows.

 Phones, routers, TVs, servers and IoT devices all use different Operating Systems.

---

## Memory Tricks

```
GUI

See

Click

Done

CLI

Think

Type

Execute
```

---

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

## Final Summary

An Operating System is the bridge between users, applications, and hardware. Whether it's Windows on a laptop, Linux on a server, Android on a phone, or an RTOS inside an aircraft, every OS exists to manage resources efficiently, securely, and reliably.

The Operating System is the foundation of every computing device. It acts as the bridge between users, applications, and hardware while managing processes, memory, files, devices, and security. Understanding how an OS works is one of the most important fundamentals in cybersecurity because every attack, defense, and forensic investigation ultimately interacts with the operating system.

---
