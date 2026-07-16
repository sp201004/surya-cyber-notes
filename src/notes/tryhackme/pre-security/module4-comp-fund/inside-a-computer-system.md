## Contents

- [Contents](#contents)
- [Objective](#objective)
- [Computer = Human Body Analogy](#computer-=-human-body-analogy)
- [Computer Architecture](#computer-architecture)
- [Components](#components)
- [1. Motherboard](#1-motherboard)
- [2. CPU (Central Processing Unit)](#2-cpu-central-processing-unit)
- [3. RAM (Random Access Memory)](#3-ram-random-access-memory)
- [4. Storage](#4-storage)
- [HDD](#hdd)
- [SSD](#ssd)
- [SSD vs HDD](#ssd-vs-hdd)
- [Interfaces](#interfaces)
- [5. Network Adapter](#5-network-adapter)
- [6. PSU (Power Supply Unit)](#6-psu-power-supply-unit)
- [7. Graphics Card (GPU)](#7-graphics-card-gpu)
- [8. Input Devices](#8-input-devices)
- [9. Output Devices](#9-output-devices)
- [Complete Boot Process](#complete-boot-process)
- [Step 1 — Power Button](#step-1-—-power-button)
- [Step 2 — Firmware Starts](#step-2-—-firmware-starts)
- [BIOS vs UEFI](#bios-vs-uefi)
- [Step 3 — POST](#step-3-—-post)
- [Step 4 — Select Boot Device](#step-4-—-select-boot-device)
- [Step 5 — Bootloader](#step-5-—-bootloader)
- [Operating System Starts](#operating-system-starts)
- [Complete Boot Flow](#complete-boot-flow)
- [Important Terms](#important-terms)
- [Common MCQs](#common-mcqs)
- [Flags](#flags)
- [Interview Questions](#interview-questions)
- [Memory Tricks](#memory-tricks)
- [Final Summary](#final-summary)

> **Platform:** TryHackMe
> **Path:** Pre Security → Computer Fundamentals → Inside a Computer System
> **Difficulty:** Easy
> **Status:** Completed

---

## Contents
- [Objective](#objective)
- [Computer = Human Body Analogy](#computer--human-body-analogy)
- [Computer Architecture](#computer-architecture)
- [Components](#components)
- [Complete Boot Process](#complete-boot-process)
- [BIOS vs UEFI](#bios-vs-uefi)
- [Important Terms](#important-terms)
- [Interview Questions](#interview-questions)
- [Common MCQs](#common-mcqs)
- [Memory Trick](#memory-trick)
- [Flags](#flags)
- [Key Takeaways](#key-takeaways)

---

## Objective
Understand:

- Main hardware components of a computer
- Purpose of each component
- Complete boot process
- Difference between BIOS and UEFI
- How Operating System starts

---

## Computer = Human Body Analogy
| Computer Component | Human Body |
|--------------------|------------|
| Motherboard | Skeleton + Nervous System |
| CPU | Brain |
| RAM | Short-term Memory |
| HDD / SSD | Long-term Memory |
| GPU | Visual Cortex |
| PSU | Heart + Lungs |
| Network Adapter | Vocal Cords |
| Input Devices | Human Senses |
| Output Devices | Speech / Actions |

---

## Computer Architecture
```
                    USER
                      │
         ┌────────────┴────────────┐
         │                         │
   Input Devices             Output Devices
         │                         ▲
         ▼                         │
   ┌────────────────────────────────────┐
   │              CPU                   │
   └────────────────────────────────────┘
          ▲             ▲
          │             │
         RAM         Graphics Card
          │
          ▼
   HDD / SSD (Storage)

           ▲
           │
     Motherboard
           │
           ▼
          PSU

           │
           ▼
     Network Adapter
```

---

## Components
---

### 1. Motherboard
**Purpose**

- Main circuit board
- Connects every component
- Allows communication between hardware

**Responsibilities**

- Houses CPU socket
- RAM slots
- PCIe slots
- SATA connectors
- NVMe slots
- USB controllers

> Think of it as "The highway connecting every component."

---

### 2. CPU (Central Processing Unit)
**Purpose**

Brain of computer.

**Responsible for**

- Processing instructions
- Arithmetic calculations
- Logic operations
- Decision making

**CPU performs**

```
Fetch
↓
Decode
↓
Execute
```

**Clock speed**

Measured in `GHz`

More GHz = More instructions per second

---

### 3. RAM (Random Access Memory)
Temporary memory.

**Stores**

- Running applications
- Active data
- Operating system

**Characteristics**

**Extremely fast**

**Volatile**

**Meaning**

```
Power OFF
↓
Everything inside RAM disappears.
```

> Analogy: Working desk.

---

### 4. Storage
Permanent storage.

#### HDD
Hard Disk Drive

Uses spinning magnetic disks.

**Advantages**

- Cheap
- Large capacity

**Disadvantages**

- Slow
- Mechanical
- Can fail physically

---

#### SSD
Solid State Drive

Uses flash memory.

**Advantages**

- Very fast
- Silent
- Low power
- Shock resistant

**Disadvantages**

- Costlier

---

#### SSD vs HDD
| SSD | HDD |
|------|------|
| Fast | Slow |
| Silent | Noisy |
| Flash memory | Magnetic disk |
| Durable | Mechanical |
| Expensive | Cheap |

---

#### Interfaces
`SATA` ≈ 550 MB/s

`NVMe` ≈ 3500–7000 MB/s

---

### 5. Network Adapter
**Purpose**

**Allows communication with**

- Internet
- Routers
- Switches
- Other computers

**Types**

- Ethernet
- Wi-Fi

Usually connected through `PCI Express`

**Functions**

- Sends packets
- Receives packets
- Converts data to signals

---

### 6. PSU (Power Supply Unit)
**Purpose**

Supplies electricity.

**Converts**

```
AC
↓
DC
```

**Provides power to**

- Motherboard
- CPU
- GPU
- Storage
- Fans

> Without PSU → Computer cannot start.

---

### 7. Graphics Card (GPU)
**Purpose**

Processes graphics.

**Responsible for**

- Images
- Videos
- Games
- 3D rendering
- AI workloads

**Output** → Monitor

**Connected using** `PCI Express`

Modern GPUs have dedicated VRAM.

---

### 8. Input Devices
Used to send data.

**Examples**

- Keyboard
- Mouse
- Microphone
- Scanner
- Webcam

---

### 9. Output Devices
Receive processed information.

**Examples**

- Monitor
- Printer
- Speaker
- Projector

---

## Complete Boot Process
Boot = Starting a computer.

**Sequence**

```
Power Button
↓
PSU supplies electricity
↓
UEFI / BIOS starts
↓
POST
↓
Boot Device Selection
↓
Bootloader
↓
Operating System
```

---

### Step 1 — Power Button
```
Press Power Button
↓
Signal sent
↓
PSU starts
↓
Electricity flows
```

---

### Step 2 — Firmware Starts
- **Modern:** `UEFI`
- **Old:** `BIOS`

**Responsibilities**

- Initialize hardware
- Detect components
- Configure devices
- Prepare boot

---

### BIOS vs UEFI
| BIOS | UEFI |
|-------|------|
| Older | Modern |
| Limited | Advanced |
| MBR | GPT |
| Slower | Faster |
| No Secure Boot | Secure Boot |

> UEFI replaced BIOS.

---

### Step 3 — POST
**Power-On Self Test**

**Purpose** — Checks:

**CPU**

**RAM**

**Keyboard**

**Storage**

**Hardware**

```
If something fails
↓
Beeps
↓
Error messages
↓
Boot stops
```

---

### Step 4 — Select Boot Device
UEFI follows Boot Priority.

**Example**

1. SSD
2. HDD
3. USB
4. Network

> If SSD contains OS → SSD selected.

---

### Step 5 — Bootloader
**Examples**

- **Windows:** Boot Manager
- **Linux:** GRUB

**Responsibilities**

```
Locate Operating System
↓
Load OS into RAM
↓
Transfer control
↓
Operating System starts
```

---

### Operating System Starts
```
Kernel loads
↓
Drivers load
↓
Services start
↓
Login Screen appears
↓
User logs in
```

---

### Complete Boot Flow
```
Power Button
↓
PSU
↓
UEFI / BIOS
↓
POST
↓
Boot Device
↓
Bootloader
↓
Kernel
↓
Operating System
↓
Desktop
```

---

## Important Terms
| Term | Meaning |
|------|---------|
| CPU | Processes instructions |
| RAM | Temporary memory |
| Storage | Permanent memory |
| Motherboard | Connects everything |
| GPU | Processes graphics |
| PSU | Supplies electricity |
| Network Adapter | Provides networking |
| Bootloader | Loads Operating System |
| Kernel | Core of Operating System |
| POST | Hardware self test |
| UEFI | Modern firmware |
| BIOS | Legacy firmware |

---

## Common MCQs
 Network Adapter → Communicate with other computers.

 PSU → Supply electrical power.

 GPU → Process graphics.

 Input/Output → Send and receive data.

 UEFI → Initialize hardware.

 POST → Check hardware.

 Boot Device → Selected according to boot priority.

 Bootloader → Loads OS into RAM.

---

## Flags
| Task | Flag |
|------|------|
| Task 2 | `THM{4llpccomp0n3nts1d3nt1f13d}` |
| Task 3 | `THM{pc5ucce55fully5t4rt3d}` |

---

## Interview Questions

**Q. Why is RAM called volatile memory?**

Because data disappears after power loss.

---

**Q. Why is SSD faster?**

No moving parts. Uses flash memory.

---

**Q. Difference between HDD and SSD?**

SSD uses flash memory. HDD uses rotating disks.

---

**Q. Why do we need PSU?**

Supplies electrical power.

---

**Q. What is POST?**

Hardware diagnostic test performed during boot.

---

**Q. What is Bootloader?**

Loads Operating System into RAM.

---

**Q. Difference between BIOS and UEFI?**

UEFI is modern, faster, secure and supports GPT.

---

**Q. Which component performs calculations?**

`CPU`

---

**Q. Which component renders graphics?**

`GPU`

---

**Q. Which component stores data permanently?**

`SSD` / `HDD`

---

**Q. What chooses boot device?**

`UEFI` / `BIOS`

---

## Memory Tricks

Computer Startup:

```
Press
↓
Firmware
↓
POST
↓
Boot Device
↓
Bootloader
↓
Operating System
```

> Mnemonic: **Please Find Proper Boot Before Operating**

---

## Final Summary

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
