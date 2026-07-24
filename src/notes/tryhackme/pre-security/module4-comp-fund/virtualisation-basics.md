## Contents

- [Contents](#contents)
- [Why Virtualization?](#why-virtualization)
- [What is Virtualization?](#what-is-virtualization)
- [Why Virtualization Was Needed](#why-virtualization-was-needed)
- [Building Analogy](#building-analogy)
- [Mapping Analogy](#mapping-analogy)
- [Hypervisor](#hypervisor)
- [Virtual Machine (VM)](#virtual-machine-vm)
- [Key Advantages](#key-advantages)
- [Important THM Answers](#important-thm-answers)
- [Hypervisor Types](#hypervisor-types)
- [Type 1 Hypervisor (Bare Metal)](#type-1-hypervisor-bare-metal)
- [Type 2 Hypervisor (Hosted)](#type-2-hypervisor-hosted)
- [Type 1 vs Type 2](#type-1-vs-type-2)
- [THM Practical Answer](#thm-practical-answer)
- [Lab Machine (Virtual Machine)](#lab-machine-virtual-machine)
- [Why Use Virtual Machines?](#why-use-virtual-machines)
- [Containers](#containers)
- [Container Characteristics](#container-characteristics)
- [Docker](#docker)
- [VM vs Container](#vm-vs-container)
- [Which One Should I Use?](#which-one-should-i-use)
- [Architecture](#architecture)
- [Managing Virtual Machines (THM Practical)](#managing-virtual-machines-thm-practical)
- [Virtualization Dashboard](#virtualization-dashboard)
- [VM States](#vm-states)
- [THM Practical — Mail Server Issue](#thm-practical-—-mail-server-issue)
- [Common VM Actions](#common-vm-actions)
- [Creating a Virtual Machine](#creating-a-virtual-machine)
- [VM Resource Allocation](#vm-resource-allocation)
- [Host Monitoring](#host-monitoring)
- [Reading Host Health](#reading-host-health)
- [What Should Administrator Check?](#what-should-administrator-check)
- [THM Task Answers](#thm-task-answers)
- [Practical Workflow](#practical-workflow)
- [Administrator Responsibilities](#administrator-responsibilities)
- [Important Metrics](#important-metrics)
- [Key Terminology](#key-terminology)
- [Benefits of Virtualization](#benefits-of-virtualization)
- [Complete Architecture](#complete-architecture)
- [Complete Flow](#complete-flow)
- [What is a Hypervisor?](#what-is-a-hypervisor)
- [Difference between VM and Container?](#difference-between-vm-and-container)
- [Difference between Type 1 and Type 2 Hypervisor?](#difference-between-type-1-and-type-2-hypervisor)
- [Why is Virtualization important?](#why-is-virtualization-important)
- [What is Docker?](#what-is-docker)
- [One Page Revision](#one-page-revision)
- [Interview Questions](#interview-questions)
- [Memory Tricks](#memory-tricks)
- [Quick Revision](#quick-revision)

> **Platform:** TryHackMe
> **Path:** Pre Security → Computer Fundamentals → Virtualization Basics
> **Difficulty:** Easy
> **Status:** Completed
> **Notes by:** Surya Pratap Singh

---

## Contents
- [Why Virtualization?](#why-virtualization)
- [What is Virtualization?](#what-is-virtualization)
- [Building Analogy](#building-analogy)
- [Hypervisor](#hypervisor)
- [Virtual Machine (VM)](#virtual-machine-vm)
- [Key Advantages](#key-advantages)
- [Hypervisor Types](#hypervisor-types)
- [Type 1 vs Type 2](#type-1-vs-type-2)
- [Lab Machine (Virtual Machine)](#lab-machine-virtual-machine)
- [Containers](#containers)
- [Docker](#docker)
- [VM vs Container](#vm-vs-container)
- [Managing Virtual Machines (THM Practical)](#managing-virtual-machines-thm-practical)
- [VM States](#vm-states)
- [Creating a Virtual Machine](#creating-a-virtual-machine)
- [Host Monitoring](#host-monitoring)
- [Key Terminology](#key-terminology)
- [Benefits of Virtualization](#benefits-of-virtualization)
- [Complete Architecture](#complete-architecture)
- [Interview Questions](#interview-questions)
- [Memory Trick](#memory-trick)
- [One Page Revision](#one-page-revision)

---

## Why Virtualization?
Before virtualization:

```
1 Physical Server
        │
        ▼
   1 Application

(One Server = One Application)
```

**Problems:**

- Expensive hardware
- High electricity cost
- Low resource utilization (5–20%)
- Difficult scaling
- Slow deployment
- Wasted CPU, RAM & Storage

**Example:**

```
Server 1 → Website
Server 2 → Database
Server 3 → Email
Server 4 → Internal App

= 4 Physical Servers
= High Cost
```

---

## What is Virtualization?
Virtualization allows **multiple virtual computers (VMs)** to run on a **single physical server**.

```
            Physical Server
                 │
              Hypervisor
        ┌────────┼────────┐
        │        │        │
      VM1      VM2      VM3
```

**Benefits**

- Better hardware utilization
- Lower cost
- Faster deployment
- Easy scaling
- Isolation
- Better security

---

### Why Virtualization Was Needed
**Old approach**

```
1 Server
      │
      ▼
1 Application
```

Problems: Expensive, Resource wastage, Hard to manage, Difficult upgrades

**New approach**

```
1 Powerful Server
        │
        ▼
    Hypervisor
        │
 ┌──────┼──────┐
 VM1   VM2   VM3
```

Multiple applications now share the same hardware safely.

---

## Building Analogy
Imagine one person living in a 10-floor building.

```
Building
│
├── Floor 1 → Used
├── Floor 2 → Empty
├── Floor 3 → Empty
├── Floor 4 → Empty
└── Remaining Floors Empty
```

Problems: Huge waste, Expensive, Inefficient

---

Now divide the building into apartments.

```
Building
│
├── Apartment A
├── Apartment B
├── Apartment C
└── Apartment D
```

Each apartment has: Own room, Own privacy, Own applications

**Shared:** Electricity, Water, Security, Lift

> Cheaper & More Efficient

---

### Mapping Analogy
| Building Example | Virtualization |
|-----------------|---------------|
| Building | Physical Server |
| Apartments | Virtual Machines |
| Tenants | Applications / OS |
| Building Manager | Hypervisor |

---

## Hypervisor
**Definition**

A Hypervisor is software that creates, manages and controls Virtual Machines.

It divides one physical computer into multiple virtual computers.

```
Physical Server
        │
        ▼
 Hypervisor
        │
 ┌──────┼──────┐
 VM1   VM2   VM3
```

**Responsibilities**

- Allocate CPU
- Allocate RAM
- Allocate Storage
- Allocate Network
- Start VM
- Stop VM
- Restart VM
- Clone VM
- Delete VM
- Isolation between VMs

---

## Virtual Machine (VM)
A VM behaves like a real computer.

Each VM has its own:

- CPU
- RAM
- Disk
- Network
- Operating System

**Example**

```
VM 1
├── Windows
├── 4 CPU
├── 8GB RAM
└── 100GB Disk

VM 2
├── Linux
├── 2 CPU
├── 4GB RAM
└── 50GB Disk
```

Both run on one physical machine.

---

## Key Advantages
 **Better Resource Utilization**

```
Old
CPU Usage
████░░░░░░ 10%

New
CPU Usage
████████░░ 80%
```

 **Cost Saving**

Less hardware → Less electricity → Less maintenance → Less cooling

---

 **Isolation**

If one VM crashes:

```
VM1 ❌
VM2 ✅
VM3 ✅
```

Others continue running.

---

 **Scalability**

Need more resources? Increase VM CPU/RAM instead of buying a new server.

---

### Important THM Answers
**Q. What does virtualization enable multiple applications to share?**

Answer: `physical server`

---

**Q. What software manages resources for lab machines?**

Answer: `hypervisor`

---

## Hypervisor Types
Hypervisors are divided into **two major types**.

```
                 Hypervisor
                     │
        ┌────────────┴────────────┐
        │                         │
     Type 1                  Type 2
(Bare Metal)             (Hosted)
```

---

### Type 1 Hypervisor (Bare Metal)
Runs **directly on physical hardware**.

```
Applications
      │
Guest Operating System
      │
Hypervisor
      │
Physical Hardware
```

**Characteristics**

- High performance
- Enterprise grade
- Low overhead
- Better security
- Used in production

**Examples**

- VMware ESXi
- Microsoft Hyper-V Server
- Xen
- KVM

**Best Use Cases**

- Data Centers
- Cloud Providers
- Production Servers
- Database Servers

**Advantages**

 Fast · Stable · Secure · Efficient Resource Usage

**Disadvantages**

 More difficult to configure · Requires dedicated hardware

---

### Type 2 Hypervisor (Hosted)
Runs **inside an existing Operating System**.

```
Applications
      │
Guest Operating System
      │
Hypervisor
      │
Host Operating System
      │
Physical Hardware
```

**Characteristics**

- Easy to install
- Perfect for learning
- Slightly slower
- Depends on Host OS

**Examples**

- Oracle VirtualBox
- VMware Workstation
- VMware Fusion
- Parallels Desktop

**Best Use Cases**

- Learning
- Home Labs
- Malware Analysis
- Software Testing
- Kali Linux Practice

**Advantages**

 Beginner Friendly · Quick Setup · Great for Cyber Security Labs

**Disadvantages**

 Lower performance · Host OS failure affects VMs

---

## Type 1 vs Type 2
| Feature | Type 1 | Type 2 |
|----------|--------|--------|
| Runs On | Hardware | Host OS |
| Speed | Very Fast | Slower |
| Security | High | Medium |
| Production | Yes | No |
| Home Lab | No | Yes |
| Learning | Limited | Excellent |

**Memory Trick**

```
Type 1

Hardware
   ↓
Hypervisor
   ↓
VMs

--------------

Type 2

Hardware
   ↓
Operating System
   ↓
Hypervisor
   ↓
VMs
```

---

### THM Practical Answer
**Q. Which Hypervisor should a student use for Cyber Security labs?**

Answer: `Type 2`

---

## Lab Machine (Virtual Machine)
A Lab Machine (VM) is a complete virtual computer.

Each VM has:

- Virtual CPU
- Virtual RAM
- Virtual Disk
- Virtual Network
- Own Operating System

**Example**

```
VM 1
├── Ubuntu
├── 4 CPU
├── 8GB RAM
└── 100GB Disk

VM 2
├── Kali Linux
├── 2 CPU
├── 4GB RAM
└── 60GB Disk

VM 3
├── Windows Server
├── 8 CPU
├── 16GB RAM
└── 500GB Disk
```

All share one Physical Server.

---

### Why Use Virtual Machines?
**Example 1:** Need Kali Linux? Instead of buying another laptop → Create Kali VM.

**Example 2:** Need Windows? → Create Windows VM.

**Example 3:** Need Malware Testing? → Create isolated VM → Delete after testing.

**Advantages**

 Isolation · Snapshot Support · Multiple Operating Systems · Easy Recovery · Safe Malware Analysis

---

## Containers
Containers are **lightweight isolated environments**.

Unlike Virtual Machines, they **share the Host Operating System Kernel**.

```
Physical Server
        │
 Host Operating System
        │
 Container Engine
        │
 ┌──────┬──────┬──────┐
 │ C1   │ C2   │ C3   │
 └──────┴──────┴──────┘
```

---

### Container Characteristics
- Lightweight
- Starts in seconds
- Uses very little RAM
- Shares Host Kernel
- Perfect for Microservices
- Easy deployment

---

## Docker
Docker is the most popular container platform.

**Responsibilities**

- Build Containers
- Run Containers
- Stop Containers
- Share Containers
- Manage Images

**Popular Commands**

```bash
docker pull nginx
docker run nginx
docker ps
docker stop <id>
docker rm <id>
docker images
```

---

## VM vs Container
| Feature | VM | Container |
|----------|----|-----------|
| OS | Own OS | Shared Host OS |
| Boot Time | Minutes | Seconds |
| Size | GB | MB |
| Performance | Lower | Higher |
| Isolation | Strong | Medium |
| Resource Usage | High | Low |

**Diagram**

```
Virtual Machine

Physical Server
      │
Hypervisor
      │
Guest OS
      │
Application

----------------------

Container

Physical Server
      │
Host OS
      │
Docker
      │
Application
```

---

### Which One Should I Use?
```
Need complete Operating System?      → Use Virtual Machine
Need one application?                → Use Container
Need Malware Analysis?               → Virtual Machine
Need Web Application Deployment?     → Container
Need Learning Linux?                 → Virtual Machine
Need Microservices?                  → Container
```

---

### THM Practical Answer
**Q. Company wants multiple small applications in one lab machine.**

Answer: `containers`

---

### Architecture
```
                Physical Server
                      │
                 Hypervisor
          ┌───────────┴───────────┐
          │                       │
    Virtual Machine A      Virtual Machine B
                                   │
                          ┌────────┴────────┐
                          │                 │
                    Container A      Container B
```

---

## Managing Virtual Machines (THM Practical)
After learning virtualization, you'll often use a **Virtualization Manager** to monitor, create and manage Virtual Machines (VMs).

A Virtualization Manager provides:

- Overall virtualization status
- VM management
- Host monitoring
- Resource usage
- Start/Stop/Restart/Delete VMs

---

### Virtualization Dashboard
A typical dashboard contains three sections.

```
+------------------------------------------------------+
|                   Virtualization                     |
+------------------------------------------------------+

Summary
│
├── Overall Health
├── Running VMs
└── Alerts

Lab Machines
│
├── Running
├── Stopped
├── Error
└── Resource Usage

Hosts
│
├── CPU
├── RAM
├── Storage
└── Network
```

---

## VM States
A Virtual Machine can exist in several states.

```
🟢 Running    — Application is active.
⚪ Stopped    — Powered Off.
🔴 Error      — VM failed. Needs troubleshooting or restart.
```

---

### THM Practical — Mail Server Issue
Virtual Machine: `Mail-SERVER`

Current Status: `ERROR`

**Solution**

```
Click Restart Button
↓
VM Starts Again
↓
Status becomes Running
```

---

### Common VM Actions
| Action | Purpose |
|---------|----------|
| ▶ Start | Power On VM |
| ■ Stop | Shutdown VM |
| ↻ Restart | Reboot VM |
| Delete | Remove VM |

---

## Creating a Virtual Machine
```
Click Create VM
↓
Provide:
  Name
  CPU Cores
  RAM
  Disk Size
```

**Example**

```
Name:   Marketing-VM
CPU:    4
RAM:    8 GB
Disk:   100 GB
```

→ Click `Create VM` → VM Added Successfully

**Newly Created VM**

```
Marketing-VM
Status:  Stopped
CPU:     4
RAM:     8 GB
Disk:    100 GB
```

---

### VM Resource Allocation
Every Virtual Machine receives dedicated resources.

```
Physical Server
  CPU, RAM, Storage, Network
        │
  Hypervisor
        │
    VM
      CPU
      RAM
      Disk
      IP Address
```

---

## Host Monitoring
Besides VMs, administrators also monitor Physical Hosts.

**Example 1**

```
Host:     HV-PROD-01
CPU:      45%
RAM:      68%
Storage:  72%
VMs:      3
Status:   Connected
```

**Example 2**

```
Host:     HV-PROD-02
CPU:      98%
RAM:      90%
Storage:  95%
VMs:      8
Status:   Connected
```

> Almost Full — Needs Attention

**Example 3**

```
Host:     HV-BACKUP-01
CPU:      0%
RAM:      0%
Storage:  30%
VMs:      0
Status:   Disconnected
```

---

### Reading Host Health
| Status | Threshold |
|--------|-----------|
| Good | CPU < 70%, RAM < 70%, Storage < 80% |
| Warning | CPU > 90%, RAM > 90%, Storage > 90% |
| Critical | Disconnected, Server Offline, Hardware Failure |

---

### What Should Administrator Check?
 Running VMs · Offline Hosts · CPU Usage · RAM Usage · Storage Usage · Uptime · Alerts

---

### THM Task Answers
| Question | Answer |
|----------|--------|
| Longest Running VM | `Monitoring-SYS` |
| Highest Memory Usage | `DB-Cluster-01` |
| Running VMs after fixing Mail-SERVER | `8` |
| Physical Host with most VMs | `HV-PROD-02` |

---

### Practical Workflow
```
Open Dashboard
        │
Check Alerts
        │
Find Error VM
        │
Restart VM
        │
Verify Running
        │
Monitor Host Resources
        │
Create New VM
        │
Assign Resources
        │
Done
```

---

### Administrator Responsibilities
**Daily Tasks**

```
Monitor Servers
Monitor VMs
Restart Failed VMs
Allocate Resources
Create New VMs
Delete Old VMs
Monitor Performance
Generate Reports
```

---

### Important Metrics
| Metric | Meaning |
|--------|---------|
| CPU Usage | Processing Power |
| RAM Usage | Memory Consumption |
| Storage | Disk Space |
| Network | Traffic |
| Uptime | How long VM has been running |

---

## Key Terminology
| Term | Definition |
|------|------------|
| Virtualization | Running multiple Virtual Machines on one Physical Server |
| Hypervisor | Software that creates and manages Virtual Machines |
| Virtual Machine (VM) | A complete virtual computer with its own Operating System |
| Container | A lightweight isolated environment that shares the Host Kernel |
| Container Image | Template used to create Containers |
| Network Port | Logical communication endpoint (e.g. HTTP `80`, HTTPS `443`, SSH `22`) |

---

## Benefits of Virtualization
 Cost Saving · Better Hardware Utilization · Faster Deployment · Isolation · Better Security · Flexibility · Scalability · Portability · Centralized Management

---

## Complete Architecture
```
                    Physical Server
                           │
                    Hypervisor
          ┌────────────────┼────────────────┐
          │                │                │
      VM (Linux)      VM (Windows)      VM (Kali)
          │                │
     Docker Engine          │
          │
     ┌────┴────┐
     │         │
 Container   Container
```

---

### Complete Flow
```
Physical Server
↓
Hypervisor
↓
Virtual Machines
↓
Operating Systems
↓
Applications
↓
Containers (Optional)
↓
Users
```

---

### What is Virtualization?
Technology that allows multiple Virtual Machines to run on a single Physical Server.

---

### What is a Hypervisor?
Software responsible for creating, managing and allocating resources to VMs.

---

### Difference between VM and Container?
| VM | Container |
|----|-----------|
| Own Operating System | Shares Host Kernel |
| More Secure | Lightweight |
| Heavy | Faster |

---

### Difference between Type 1 and Type 2 Hypervisor?
- **Type 1:** Runs directly on hardware.
- **Type 2:** Runs on Host Operating System.

---

### Why is Virtualization important?
- Better utilization
- Lower cost
- Easy scaling
- Isolation
- High availability

---

### What is Docker?
Container platform used to build, deploy and manage Containers.

---

## One Page Revision
```
One Physical Server → Hypervisor → Virtual Machines → Containers → Applications

=========================

Type 1:  Hardware → Hypervisor → VMs
Type 2:  Hardware → Host OS → Hypervisor → VMs

=========================

VM:        Own OS, Heavy, Better Isolation
Container: Shared Kernel, Lightweight, Fast

=========================

Advantages:
✔ Cost Saving
✔ Better Resource Usage
✔ Scalability
✔ Isolation
✔ Security
✔ Flexibility
✔ Centralized Management

=========================

Popular Hypervisors:
VMware ESXi, VirtualBox, Hyper-V,
VMware Workstation, KVM, Xen

Popular Container Platform:
Docker
```

---

## Interview Questions

| Question | Answer |
| --- | --- |
| **What is Virtualization?** | Running multiple Virtual Machines on one physical computer. |
| **Why is virtualization important?** | Cost reduction<br>Better utilization<br>Isolation<br>Easy scaling<br>Faster deployment |
| **What is a Hypervisor?** | Software that creates and manages VMs. |
| **Difference between Physical Server and VM?** | Physical Server → Real Hardware<br>VM → Software-based computer running on Hypervisor |

## Memory Tricks

**The virtualization stack (PHVCA):** Physical Server → Hypervisor → Virtual Machine → Container → Application.

- **P**hysical Server — the real hardware.
- **H**ypervisor — software that creates and runs VMs on that hardware.
- **V**irtual Machine — a software-based computer running on the hypervisor.
- **C**ontainer — a lightweight, app-focused alternative to a full VM.
- **A**pplication — what actually runs for the user.

> Remember: One Physical Server → Many Virtual Machines → Maximum Resource Utilization.

> **Congratulations! **
>
> You have completed the **TryHackMe - Virtualization Basics** room. These notes are optimized for **quick revision, interviews, certifications (Security+, RHCSA, AWS, Azure, GCP)**, and future DevOps/Cyber Security learning.

## Quick Revision

```
Virtualization → Hypervisor → Virtual Machines → Applications
```

---
