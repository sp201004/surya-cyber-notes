| | |
|---|---|
| **Module** | Network Fundamentals |
| **Room** | Intro to LAN |
| **Difficulty** | Easy |
| **Status** | Completed |

#### Learning Objectives
After completing this room you should understand:
- What a LAN is
- Devices used to build a LAN
- Hubs vs Switches vs Routers
- What Subnetting is
- ARP (Address Resolution Protocol)
- DHCP (Dynamic Host Configuration Protocol)

#### What is a LAN? (LAN = Local Area Network)
A **LAN** is a network of devices in a single physical location (like a home, school, or office).

```text
[ PC 1 ] ───┐
            ├─── [ Switch ] ─── [ Router ] ─── Internet
[ PC 2 ] ───┘
```

#### LAN Hardware

##### 1. Network Interface Card (NIC)
Every device needs a NIC to connect to a network. It can be:
- Wired (Ethernet port)
- Wireless (Wi-Fi chip)

##### 2. Ethernet Cables
Used to connect devices physically.
- **Speed:** Can range from 10 Mbps up to 100 Gbps+ (e.g., Cat5e, Cat6, Cat7).

##### 3. Hubs
- Legacy (old) device.
- Unintelligent: When it receives data, it sends (broadcasts) it to **everyone** on the network.
- High traffic and security risks.

##### 4. Switches
- Intelligent device.
- Keeps a **MAC Address Table** showing which device is connected to which port.
- When it receives data, it reads the destination MAC and sends it **only** to that specific device.

##### 5. Routers
- Used to connect different networks (e.g., connects your LAN to the public Internet).
- Works with IP Addresses.

#### How do devices get IP Addresses?

##### DHCP (Dynamic Host Configuration Protocol)
Automatically assigns IP addresses to devices when they connect.

```text
[ Client ] 🚀 DISCOVER (Broadcast) ──> [ DHCP Server ]
[ Client ] <── OFFER (Unicast) ──────── [ DHCP Server ]
[ Client ] 🚀 REQUEST (Broadcast) ───> [ DHCP Server ]
[ Client ] <── ACK (Unicast) ────────── [ DHCP Server ]
```

**Four steps (DORA):**
1. **Discover** — Client asks: "Is there a DHCP server?"
2. **Offer** — Server says: "Here is an IP address you can use."
3. **Request** — Client says: "I would like to take that IP."
4. **Acknowledge (ACK)** — Server says: "All set, it is yours."

#### How do devices find each other?

##### ARP (Address Resolution Protocol)
Used to find a device's **MAC Address** when only its **IP Address** is known.

```text
[ Sender ] ── Who has 192.168.1.5? Tell 192.168.1.2 ──> (Broadcast)
[ Target ] <── I have 192.168.1.5, my MAC is aa:bb:cc... ─ (Unicast)
```

- **ARP Request** — Broadcasted to everyone: "Who has IP 192.168.1.5?"
- **ARP Reply** — Unicast reply from the target: "I have that IP, my MAC is aa:bb:cc:dd:ee:ff."

#### Subnetting
Subnetting splits a large network into smaller, manageable subnets to improve:
- Security
- Network Performance
- Management

##### Subnet Mask
Helps determine which part of an IP address is the Network ID and which is the Host ID. Example: `255.255.255.0`.

##### DORA Steps
| Step | Action |
|---|---|
| **D**iscover | Client searches |
| **O**ffer | Server offers IP |
| **R**equest | Client requests IP |
| **A**cknowledge | Server confirms IP |

## Contents

- [Learning Objectives](#learning-objectives)
- [What is a LAN? (LAN = Local Area Network)](#what-is-a-lan-lan-=-local-area-network)
- [LAN Hardware](#lan-hardware)
- [1. Network Interface Card (NIC)](#1-network-interface-card-nic)
- [2. Ethernet Cables](#2-ethernet-cables)
- [3. Hubs](#3-hubs)
- [4. Switches](#4-switches)
- [5. Routers](#5-routers)
- [How do devices get IP Addresses?](#how-do-devices-get-ip-addresses)
- [DHCP (Dynamic Host Configuration Protocol)](#dhcp-dynamic-host-configuration-protocol)
- [How do devices find each other?](#how-do-devices-find-each-other)
- [ARP (Address Resolution Protocol)](#arp-address-resolution-protocol)
- [Subnetting](#subnetting)
- [Subnet Mask](#subnet-mask)
- [DORA Steps](#dora-steps)
- [Interview Questions](#interview-questions)
- [Memory Tricks](#memory-tricks)
- [Quick Revision](#quick-revision)
- [Final Summary](#final-summary)

## Interview Questions

| Question | Answer |
|---|---|
| **Hub vs Switch?** | Feature — Hub — Switch<br>Intelligence — None — High<br>Data Delivery — Broadcasts to all — Sends to destination only<br>Security — Low — High |
| **What is the purpose of ARP?** | Translates a known IP address to a physical MAC address so local communication can happen. |
| **Explain DHCP DORA.** | It is the four-step process (Discover, Offer, Request, Acknowledge) used by DHCP to dynamically lease IP configurations to clients. |
| **Why do we subnet?** | To reduce network congestion, improve security boundaries, and prevent broadcast storms. |

## Memory Tricks

```text
LAN Components
│
├── Hardware
│   ├── NIC
│   ├── Hub (Broadcast)
│   ├── Switch (Unicast, MAC table)
│   └── Router (IP routing)
│
└── Protocols
    ├── DHCP (IP lease: DORA)
    ├── ARP (IP -> MAC lookup)
    └── Subnetting (Network division)
```

## Quick Revision

| Device/Protocol | Key Feature |
|---|---|
| LAN | Private local network |
| Switch | Intelligent local sender (uses MAC) |
| Hub | Unintelligent local sender (broadcasts) |
| Router | Connects networks (uses IP) |
| DHCP | Assigns IPs automatically (DORA) |
| ARP | Translates IP to MAC address |
| Subnetting | Splits large networks |

## Final Summary

- A LAN connects devices within a limited physical area.
- Switches forward local traffic intelligently using MAC addresses, while legacy Hubs broadcast everything.
- Routers forward traffic between different networks using IP addresses.
- DHCP dynamically assigns network settings using the DORA process.
- ARP resolves IP addresses to physical MAC addresses.
- Subnetting improves network security and efficiency by breaking networks into smaller segments.
