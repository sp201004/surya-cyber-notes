## Contents

- [Contents](#contents)
- [Objective](#objective)
- [Learning Outcome](#learning-outcome)
- [Classification of Computers](#classification-of-computers)
- [1. Laptop](#1-laptop)
- [2. Desktop](#2-desktop)
- [Laptop vs Desktop](#laptop-vs-desktop)
- [3. Workstation](#3-workstation)
- [Desktop vs Workstation](#desktop-vs-workstation)
- [4. Server](#4-server)
- [Server Responsibilities](#server-responsibilities)
- [Server vs Desktop](#server-vs-desktop)
- [5. Smartphone](#5-smartphone)
- [6. Tablet](#6-tablet)
- [Smartphone vs Tablet](#smartphone-vs-tablet)
- [7. IoT Device](#7-iot-device)
- [IoT Workflow](#iot-workflow)
- [8. Embedded Computer](#8-embedded-computer)
- [Embedded Computer Workflow](#embedded-computer-workflow)
- [IoT vs Embedded](#iot-vs-embedded)
- [Why Different Computer Types Exist](#why-different-computer-types-exist)
- [Trade-Offs](#trade-offs)
- [Examples](#examples)
- [Hidden Computers Around Us](#hidden-computers-around-us)
- [Decision Tree](#decision-tree)
- [Important Terms](#important-terms)
- [Common MCQs](#common-mcqs)
- [THM Answers](#thm-answers)
- [Interview Questions](#interview-questions)
- [Memory Tricks](#memory-tricks)
- [Final Summary](#final-summary)

> **Platform:** TryHackMe
> **Path:** Pre Security → Computer Fundamentals → Computer Types
> **Difficulty:** Easy
> **Status:** Completed

---

## Contents
- [Objective](#objective)
- [Learning Outcome](#learning-outcome)
- [Classification of Computers](#classification-of-computers)
- [1. Laptop](#1-laptop)
- [2. Desktop](#2-desktop)
- [3. Workstation](#3-workstation)
- [4. Server](#4-server)
- [5. Smartphone](#5-smartphone)
- [6. Tablet](#6-tablet)
- [7. IoT Device](#7-iot-device)
- [8. Embedded Computer](#8-embedded-computer)
- [Why Different Computer Types Exist](#why-different-computer-types-exist)
- [Hidden Computers Around Us](#hidden-computers-around-us)
- [Decision Tree](#decision-tree)
- [Important Terms](#important-terms)
- [Interview Questions](#interview-questions)
- [Common MCQs](#common-mcqs)
- [Memory Trick](#memory-trick)
- [THM Answers](#thm-answers)
- [Key Takeaways](#key-takeaways)

---

## Objective
Learn:

- Different types of computers
- Where computers exist in daily life
- Difference between Laptop, Desktop, Workstation and Server
- Smartphone vs Tablet
- IoT Devices
- Embedded Computers
- Why different computer types exist

---

## Learning Outcome
 Computers are everywhere.

 Not every computer has a screen.

 Different computers are designed for different purposes.

**Every design is a trade-off between**

- Performance
- Cost
- Power Consumption
- Portability
- Reliability

---

## Classification of Computers
```
                    Computer
                        │
      ┌─────────────────┼──────────────────┐
      │                 │                  │
 Personal          Enterprise        Hidden Computers
      │                 │                  │
Laptop/Desktop     Server          IoT / Embedded
      │
      ├──────────────┐
      │              │
 Smartphone       Tablet
```

---

## 1. Laptop
Portable personal computer.

**Features**

**Built-in screen**

**Built-in keyboard**

**Battery powered**

**Lightweight**

**Purpose**

**Daily computing**

**Examples**

- Office work
- Programming
- Browsing
- College

**Advantages**

- Portable
- Battery backup
- Compact

**Disadvantages**

- Limited cooling
- Lower performance than desktop
- Harder to upgrade

---

## 2. Desktop
Fixed-location computer.

**Features**

**Separate monitor**

**Keyboard**

**Mouse**

**Uses wall power**

**Purpose**

Long-term performance.

**Advantages**

- Better cooling
- Higher performance
- Easier upgrades
- Cheaper than laptops with same specs

**Disadvantages**

- Not portable

---

### Laptop vs Desktop
| Laptop | Desktop |
|---------|----------|
| Portable | Fixed |
| Battery | Wall Power |
| Smaller | Larger |
| Limited Cooling | Better Cooling |
| Hard to Upgrade | Easy Upgrade |

---

## 3. Workstation
Professional-grade computer.

Looks similar to desktop BUT uses specialized hardware.

**Designed for**

- Engineering
- CAD
- Scientific Computing
- 3D Rendering
- AI
- Video Editing

**Characteristics**

**High reliability**

**Error correction**

**Powerful CPU**

**Professional GPU**

**Large RAM**

**Priority:** Accuracy → Reliability → Long-running workloads

---

### Desktop vs Workstation
| Desktop | Workstation |
|-----------|-------------|
| Everyday use | Professional use |
| Gaming | Engineering |
| Standard hardware | Specialized hardware |
| Normal reliability | High reliability |

---

## 4. Server
**Purpose**

Provides services over a network.

**Usually**

**No monitor**

**No keyboard**

**Runs 24×7**

**Examples**

- Web Server
- Database Server
- File Server
- Mail Server
- DNS Server

**Characteristics**

- Multiple users
- High uptime
- Redundant power
- RAID storage

**Examples:** Google, Amazon, Microsoft Azure, University servers

---

### Server Responsibilities
```
Client Request
↓
Server Processes
↓
Response Sent
```

---

### Server vs Desktop
| Desktop | Server |
|-----------|---------|
| Single user | Multiple users |
| Personal work | Network services |
| Occasionally ON | Runs continuously |

---

## 5. Smartphone
Pocket-sized computer.

**Features**

**CPU**

**RAM**

**Storage**

**Operating System**

**Internet**

**Sensors**

**Examples:** Android, iPhone

**Purpose:** Portable computing.

---

## 6. Tablet
Larger touch-screen computer.

**Features**

**Bigger display**

**Touch-first interface**

**Battery powered**

**Examples**

- iPad
- Samsung Galaxy Tab

**Uses**

- Reading
- Drawing
- Entertainment
- Education

---

### Smartphone vs Tablet
| Smartphone | Tablet |
|--------------|---------|
| Small | Large |
| Calling | Mostly media/productivity |
| Pocket-sized | Bag-sized |

---

## 7. IoT Device
IoT = Internet of Things

**Definition**

Network-connected devices with a specific purpose.

**Characteristics**

**Internet connectivity**

**Sends data**

**Receives commands**

**Usually automatic**

**Examples**

- Smart Doorbell
- Smart Watch
- Thermostat
- Fitness Tracker
- Smart Bulb
- Smart TV
- Smart Fridge

**Purpose:** Automation → Remote control → Monitoring

---

### IoT Workflow
```
Sensor
↓
Collect Data
↓
Internet
↓
Cloud
↓
User App
```

---

## 8. Embedded Computer
Tiny computer inside another machine.

**Purpose**

Perform one dedicated task.

**Usually**

**Invisible**

**Small**

**Low power**

**Reliable**

**Examples**

- Coffee Machine
- Washing Machine
- Microwave
- Car ECU
- Door Sensor
- Traffic Lights
- Elevator Controller

> Most people never notice these computers.

---

### Embedded Computer Workflow
```
Sensor
↓
Microcontroller
↓
Decision
↓
Motor / Output
```

---

### IoT vs Embedded
| IoT | Embedded |
|------|-----------|
| Connected to Internet | May not have Internet |
| Remote control | Local control |
| Sends data | Works internally |
| Smart devices | Hidden controllers |

**Example**

- Smart Doorbell → IoT
- Coffee Machine Controller → Embedded Computer

---

## Why Different Computer Types Exist
No single computer can do everything perfectly.

Every design involves trade-offs.

---

### Trade-Offs
```
Portability → Less Cooling → Lower Performance

Higher Reliability → Higher Cost

Always ON → Higher Power Usage

Purpose → Specific Hardware
```

---

### Examples
```
Laptop → Portable
Desktop → Performance
Workstation → Precision
Server → Continuous Service
IoT → Automation
Embedded → Hidden Control
```

---

## Hidden Computers Around Us
 Smart TV · Smart Fridge · Smart Watch · Robot Vacuum · WiFi Router · Thermostat · Smart Speaker · Security Camera · Smart Door · Car · ATM · Coffee Machine · Elevator · Traffic Signal · Printer · Washing Machine

---

## Decision Tree
```
Need portability?
↓ Laptop

Need gaming or office?
↓ Desktop

Need professional engineering?
↓ Workstation

Need to serve many users?
↓ Server

Need automation?
↓ IoT

Need hidden controller?
↓ Embedded Computer
```

---

## Important Terms
| Term | Meaning |
|------|---------|
| Laptop | Portable personal computer |
| Desktop | Fixed-location personal computer |
| Workstation | Professional computer for precision tasks |
| Server | Provides services over a network |
| Smartphone | Pocket-sized computer |
| Tablet | Touch-first portable computer |
| IoT | Internet-connected smart device |
| Embedded Computer | Computer built into another machine |

---

## Common MCQs
 Portable everyday computer → Laptop

 High-performance fixed computer → Desktop

 Precision engineering computer → Workstation

 Multiple-user network computer → Server

 Pocket-sized computer → Smartphone

 Touch-first larger device → Tablet

 Internet-connected smart device → IoT Device

 Hidden controller inside another machine → Embedded Computer

---

## THM Answers
| Task | Answer |
|------|--------|
| Task 2 | `Server` |
| Task 2 | `Workstation` |
| Task 3 | `Smartphone` |
| Task 3 | `Embedded Computer` |
| Task 4 Flag | `THM{8_computer_types}` |

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q. Difference between Desktop and Workstation?** | Workstations use specialized hardware and prioritize reliability. |
| **Q. Why don't servers need monitors?** | They are managed remotely. |
| **Q. What is an IoT device?** | A network-connected device performing a specific task. |
| **Q. Difference between IoT and Embedded?** | IoT connects to the Internet. Embedded computers may never connect. |
| **Q. Why are laptops slower than desktops?** | Limited cooling and power constraints. |
| **Q. What computer is inside a coffee machine?** | Embedded Computer. |
| **Q. Why do servers use redundancy?** | To avoid downtime. |
| **Q. Which computer runs 24×7?** | Server. |
| **Q. Which computer is best for CAD?** | Workstation. |

## Memory Tricks

```
Laptop → Personal Work
Desktop → Performance
Workstation → Professional
Server → Service
Smartphone → Pocket
Tablet → Touch
IoT → Internet
Embedded → Hidden
```

> Mnemonic: **Lazy Developers Work Seriously Through Intelligent Engineering**
>
> (Laptop → Desktop → Workstation → Server → Smartphone → Tablet → IoT → Embedded)

---

## Final Summary

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
