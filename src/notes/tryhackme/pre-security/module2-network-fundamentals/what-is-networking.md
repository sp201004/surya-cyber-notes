| | |
|---|---|
| **Module** | Network Fundamentals |
| **Room** | What is Networking? |
| **Difficulty** | Easy |
| **Status** | Completed |

#### Learning Objectives
After completing this room you should understand:
- What a network is
- What the Internet is
- Public vs Private Networks
- IP Addresses
- MAC Addresses
- IPv4 vs IPv6
- ICMP & Ping
- Device Identification

#### What is a Network?
A **network** is simply two or more devices connected together so they can communicate and share resources.

**Examples outside computing:** Friendship circles · Electricity Grid · Road Transportation · Postal Service · Mobile Networks

**In computing, devices can include:** Laptop · Desktop · Smartphone · Server · Printer · CCTV Camera · Router · IoT Devices

```text
      Alice
     /     \
   Bob ---- Jim

All devices are connected = One Network
```

#### What is the Internet?
The **Internet** is the world's largest network — made up of millions of smaller networks connected together.

```text
Home Network
       \
Office Network ---- Internet ---- University Network
       /
School Network
```

##### History
- **ARPANET** — Created in the late 1960s, funded by the U.S. Department of Defense; the first large computer network.
- **World Wide Web (WWW)** — Invented by **Tim Berners-Lee**; made information sharing much easier.

#### Types of Networks
**Private Network** — Used inside a home, office, school, or company.
```text
Laptop
  |
Router
  |
Phone
```

**Public Network** — Accessible through the Internet.
```text
Home Router
    |
Internet
    |
Google · YouTube · GitHub
```

#### Device Identification
Every device needs an identity. Like humans have a name and fingerprint, computers have:
- IP Address
- MAC Address

#### IP Address (IP = Internet Protocol)
Used to identify a device on a network.
```text
192 . 168 . 1 . 1
 |     |    |   |
Octet Octet Octet Octet
```
- Split into four parts called **Octets**.
- Each octet ranges from **0 – 255**.

##### IPv4
- Example: `192.168.1.15`
- 32-bit · 4 Octets · ~4.3 Billion Addresses

##### IPv6
- Example: `2a00:22c4:a531:c500:425f:cce6:c36b:f64d`
- 128-bit · Massive Address Space · Designed to replace IPv4
- **Advantages:** More addresses · Better efficiency · Future-proof

#### Public vs Private IP
**Private IP** — Used inside a local network; cannot be accessed directly from the Internet.
```text
192.168.x.x
10.x.x.x
172.16.x.x – 172.31.x.x
```

**Public IP** — Given by your ISP; used to communicate on the Internet. Example: `86.157.52.21`

#### MAC Address (MAC = Media Access Control)
A unique hardware address assigned to a network interface.
```text
Vendor ID | Device ID
a4:c3:f0  | 85:ac:2d
```
Example: `a4:c3:f0:85:ac:2d`

**MAC Spoofing** — A MAC address can be changed temporarily. Uses: testing · penetration testing · bypassing weak MAC filtering.

#### Protocols
Protocols are rules that allow devices from different manufacturers to communicate. Examples: **TCP, UDP, HTTP, HTTPS, ICMP, DNS**. Without protocols, devices would not understand each other.

#### Ping
Ping checks whether another device is reachable. It uses **ICMP (Internet Control Message Protocol)**.
```bash
ping 10.10.10.10
ping google.com
```
Ping provides: Connectivity · Packet Loss · Latency (Response Time).
```text
Reply from 10.10.10.10 time=2 ms
```
Lower response time = faster connection.

##### Key acronyms
| Acronym | Meaning |
|---|---|
| IP | Internet Protocol |
| MAC | Media Access Control |
| ICMP | Internet Control Message Protocol |

## Contents

- [Learning Objectives](#learning-objectives)
- [What is a Network?](#what-is-a-network)
- [What is the Internet?](#what-is-the-internet)
- [History](#history)
- [Types of Networks](#types-of-networks)
- [Device Identification](#device-identification)
- [IP Address (IP = Internet Protocol)](#ip-address-ip-=-internet-protocol)
- [IPv4](#ipv4)
- [IPv6](#ipv6)
- [Public vs Private IP](#public-vs-private-ip)
- [MAC Address (MAC = Media Access Control)](#mac-address-mac-=-media-access-control)
- [Protocols](#protocols)
- [Ping](#ping)
- [Key acronyms](#key-acronyms)
- [Interview Questions](#interview-questions)
- [Memory Tricks](#memory-tricks)
- [Quick Revision](#quick-revision)
- [Final Summary](#final-summary)

## Interview Questions

| Question | Answer |
|---|---|
| **What is a Network?** | Two or more connected devices that communicate and share resources. |
| **What is the Internet?** | A global collection of interconnected networks. |
| **Public vs Private IP?** | Private IP — Public IP<br>Local Network — Internet<br>Not Routable — Routable<br>Free — Provided by ISP |
| **IP vs MAC Address?** | IP Address — MAC Address<br>Logical Address — Physical Address<br>Can Change — Usually Permanent<br>Used for Routing — Used on Local Network |
| **Why is IPv6 needed?** | IPv4 addresses are limited; IPv6 provides a vastly larger address space and improved networking features. |

## Memory Tricks

```text
Network
│
├── Internet
├── Device Identification
│   ├── IP Address
│   └── MAC Address
├── IP Types
│   ├── Private
│   └── Public
├── Versions
│   ├── IPv4
│   └── IPv6
└── Connectivity
    └── Ping (ICMP)
```

## Quick Revision

| Topic | Remember |
|---|---|
| Network | Connected devices |
| Internet | Network of Networks |
| Private IP | Local communication |
| Public IP | Internet communication |
| IP Address | Logical Address |
| MAC Address | Physical Address |
| IPv4 | 32-bit |
| IPv6 | 128-bit |
| Ping | Connectivity Test |
| ICMP | Ping Protocol |

## Final Summary

- A **network** is a collection of connected devices.
- The **Internet** is a network of networks.
- Devices are identified using IP and **MAC addresses**.
- **Private IPs** are used within local networks; **Public IPs** communicate over the Internet.
- **IPv6** addresses the limitations of **IPv4**.
- **Protocols** standardize communication between devices.
- Ping uses ICMP to test connectivity and measure response time.
