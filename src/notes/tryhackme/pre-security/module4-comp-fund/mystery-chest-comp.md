## Contents

- [Contents](#contents)
- [Inside a Computer System](#inside-a-computer-system)
- [Computer Types](#computer-types)
- [Client-Server Basics](#client-server-basics)
- [Virtualisation Basics](#virtualisation-basics)
- [Cloud Computing Fundamentals](#cloud-computing-fundamentals)
- [Quick Revision](#quick-revision)

> **Module:** Computer Fundamentals
> **Course:** Pre Security
> **Platform:** TryHackMe
> **Status:** Module Completed

---

## Contents
- [Inside a Computer System](#inside-a-computer-system)
- [Computer Types](#computer-types)
- [Client-Server Basics](#client-server-basics)
- [Virtualisation Basics](#virtualisation-basics)
- [Cloud Computing Fundamentals](#cloud-computing-fundamentals)
- [Module Summary](#module-summary)

---

## Inside a Computer System
 Motherboard connects all components.

 CPU executes instructions.

 RAM stores temporary data.

 SSD/HDD store permanent data.

 GPU renders graphics.

 PSU powers the computer.

 Network Adapter enables communication.

 Input devices send data.

 Output devices display results.

 UEFI initializes hardware.

 POST checks hardware health.

 Bootloader loads the Operating System.

 Boot sequence must complete successfully before the OS starts.

---

## Computer Types
 Computers exist everywhere, not just on desks.

 Laptops prioritize portability.

 Desktops prioritize sustained performance.

 Workstations prioritize precision and reliability.

 Servers provide services to multiple users.

 Smartphones are powerful pocket computers.

 Tablets provide touch-first computing.

 IoT devices communicate over networks.

 Embedded computers quietly control machines.

 Every computer is designed for a specific purpose.

---

## Client-Server Basics
 Client requests

**Server responds**

 Protocol = Communication rules

 DNS = Name → IP

 Port = Service Identifier

 HTTP = Web Protocol

 HTTPS = Secure HTTP

**HTTP is Stateless**

**Cookies maintain sessions**

**GET retrieves data**

**POST sends data**

 Developer Tools → Network tab shows requests and responses

 URL = Scheme + Host + Path

---

## Virtualisation Basics
 Virtualization runs multiple VMs on one physical server.

 Hypervisor creates, manages and allocates resources to VMs.

 Type 1 Hypervisor runs directly on hardware (production).

 Type 2 Hypervisor runs on a Host OS (learning, labs).

 VMs have their own OS — stronger isolation, heavier.

 Containers share the Host Kernel — lighter, faster.

 Docker is the most popular container platform.

 VM management involves monitoring states, resources and host health.

 Virtualization saves cost through better hardware utilization.

---

## Cloud Computing Fundamentals
 Cloud computing delivers computing resources over the internet.

 Three service models: IaaS, PaaS, SaaS.

 Three deployment models: Public, Private, Hybrid.

 Cloud Regions provide geographic redundancy.

 Availability Zones protect against data center failure.

 Cloud billing is pay-as-you-go.

 Major providers: AWS, Azure, GCP.

---

## Quick Revision

```
Computer Fundamentals
        │
        ├── Inside a Computer System
        │     Hardware → Boot Process → OS
        │
        ├── Computer Types
        │     8 Types → Trade-offs → Purpose
        │
        ├── Client-Server Basics
        │     Client → Server → Protocol → Port → DNS → HTTP
        │
        ├── Virtualisation Basics
        │     Physical Server → Hypervisor → VMs → Containers
        │
        └── Cloud Computing Fundamentals
              On-demand → IaaS/PaaS/SaaS → Regions → Billing
```

> **Congratulations! **
>
> You have completed **Module 4 — Computer Fundamentals**. You now understand the hardware, networking, virtualization, and cloud foundations that power modern IT infrastructure.
