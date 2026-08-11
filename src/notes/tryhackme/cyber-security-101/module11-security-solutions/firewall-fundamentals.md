| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Security Solutions / Firewalls |
| **Difficulty** | Easy |
| **Time** | ~40 Minutes |
| **Module** | Security Solutions |

---

## Objective

A **firewall** is a security solution that inspects incoming and outgoing network traffic and **allows or blocks** it based on configured **rules**. Think of it as a digital **security guard** standing at the boundary between a trusted network and an untrusted one: it checks who is coming in, who is going out, blocks the unauthorised, and permits the legitimate. This room builds the concept from the ground up: what a firewall is and why it is needed, how it inspects traffic and enforces rules, the four major firewall **types** (Stateless, Stateful, Proxy, NGFW) and the OSI layers they work on, the anatomy of a **firewall rule** (source, destination, port, protocol, action, direction), and hands-on configuration on both **Windows Defender Firewall** and the **Linux** stack (Netfilter → iptables → UFW).

By the end of this room you will be able to:

- Explain the **purpose** of a firewall and how it inspects **incoming** and **outgoing** traffic
- Describe why firewalls are needed and how they act as a **security barrier** between trusted and untrusted networks
- Distinguish a **host-based firewall** from a **network firewall**
- Compare the four firewall types — **Stateless, Stateful, Proxy, and Next-Generation (NGFW)** — and the OSI layers they operate on
- Break a **firewall rule** into its components — **Source, Destination, Port, Protocol, Action, Direction**
- Apply the three rule actions — **Allow, Deny, Forward** — and the three directions — **Inbound, Outbound, Forward**
- Configure **Windows Defender Firewall** using network profiles (**Domain, Private, Public**) and rule types (Program, Port, Predefined, Custom)
- Manage a **Linux firewall** with **Netfilter**, **iptables** chains (**INPUT, OUTPUT, FORWARD**), and **UFW**

> **Core mindset:** *A firewall is only as effective as its configuration.* A secure firewall should allow required traffic while minimising unnecessary exposure and blocking unauthorised communication.

---

## Task 1 — What Is the Purpose of a Firewall?

Imagine a **security guard** at the entrance of a bank or office. The guard checks who comes in, checks who goes out, blocks unauthorised people, allows authorised people, and controls access to the protected area. A **firewall performs the same job for computers and networks.**

> **A firewall is a security solution that inspects incoming and outgoing network traffic and allows or blocks traffic based on configured rules.**

### Why Do We Need a Firewall?

Every day, huge amounts of traffic (HTTP/HTTPS, DNS, SSH and more) flow between our devices and the Internet, and not all of it is trustworthy. Traffic may be legitimate, unwanted, malicious, suspicious, unauthorised, or part of an attack. Without a firewall, a device or network could potentially accept unwanted connections. The firewall acts as a **security barrier** between trusted and untrusted networks:

`Untrusted Internet → Firewall → Trusted Internal Network`

### What Does a Firewall Inspect?

A firewall can inspect traffic flowing **into** a system/network and **out of** a system/network — giving control over **both incoming and outgoing traffic**.

```text
             INTERNET
                |
                ▼
        ┌───────────────┐
        │   FIREWALL    │
        └───────────────┘
                |
                ▼
          INTERNAL HOST
```

### How Does a Firewall Decide?

A firewall uses **rules**. Rules tell the firewall what to do when traffic matches certain conditions:

`Traffic → Firewall → Check Rule → Match → Allow  |  No match → Default Policy`

A very simple rule might be `Allow TCP port 80` (permit HTTP), while `Deny TCP port 22` blocks SSH. A rule can contain information such as **Source, Destination, Port, Protocol, Direction, Action**. For example:

```text
Source      : 192.168.1.0/24
Destination : Any
Protocol    : TCP
Port        : 80
Direction   : Outbound
Action      : Allow
```

> Allow TCP traffic from the `192.168.1.0/24` network to any destination on port `80` when the traffic is outbound.

### Allow vs Deny

`ALLOW` means the traffic is permitted (e.g. `Allow TCP/443` permits HTTPS). `DENY` means the traffic is blocked (e.g. `Deny TCP/22` blocks SSH). For **incoming** traffic a firewall might allow `TCP/80` and `TCP/443` while blocking `TCP/22`; for **outgoing** traffic it can prevent systems from reaching unwanted destinations, reducing risks such as **malware communication, command-and-control traffic, unwanted applications, and data exfiltration**.

### Host Firewall vs Network Firewall

Firewalls protect different levels of infrastructure:

| Firewall | Protects | Examples |
|---|---|---|
| **Host-Based Firewall** | An individual machine (runs directly on the host) | Windows Defender Firewall, UFW on Linux |
| **Network Firewall** | An entire network or network segment (PCs, servers, devices) | Perimeter/gateway firewalls, NGFW |

### Main Goals of a Firewall

> **1. Inspect Traffic**
> Examine incoming and outgoing traffic before making a decision.

> **2. Enforce Rules**
> Match traffic against configured rules, then decide.

> **3. Allow Legitimate Traffic**
> Permit trusted / allowed traffic through.

> **4. Block Unwanted Traffic**
> Deny untrusted / blocked traffic.

> **5. Reduce Attack Surface**
> If unnecessary services and ports are blocked, attackers have fewer possible entry points (`Open services → Attack surface`; `Block unnecessary services → Reduced attack surface`).

### Simple Real-World Example

Suppose a web server should only provide HTTPS (normally `TCP/443`). The firewall rules could be `ALLOW TCP/443` and `DENY everything unnecessary`, so `TCP/443` is allowed to the web server while `TCP/22` and `TCP/23` are denied — reducing unnecessary exposure.

### Important Networking Terms

| Term | Meaning |
|---|---|
| Firewall | Security mechanism that controls network traffic |
| Traffic | Data moving across a network |
| Incoming | Traffic coming into a system/network |
| Outgoing | Traffic leaving a system/network |
| Rule | Condition used to control traffic |
| Allow | Permit traffic |
| Deny | Block traffic |
| Source | Where traffic originates |
| Destination | Where traffic is going |
| Port | Logical endpoint used by network services |
| Protocol | Communication protocol such as TCP/UDP |
| Network Profile | Security configuration based on network type |

### Key Ports to Remember

| Port | Service |
|---|---|
| 22 | SSH |
| 23 | Telnet |
| 25 | SMTP |
| 53 | DNS |
| 80 | HTTP |
| 443 | HTTPS |
| 3389 | RDP |

> **Memory trick — FIREWALL = DIGITAL SECURITY GUARD:** **F**ilters traffic · **I**nspects packets · **R**ules decide · **E**nforces policy · **W**atches network traffic · **A**llows legitimate traffic · **L**imits unwanted access · **L**ocks down systems.

### Task 1 — Answer

| Question | Answer |
|---|---|
| **Which security solution inspects the incoming and outgoing traffic of a device or a network?** | Firewall |

### Interview Questions — Firewall Purpose

| Question | Answer |
|---|---|
| **What is a firewall?** | A network security control that monitors and filters incoming and outgoing traffic according to predefined or custom rules. Its primary purpose is to prevent unauthorised access while allowing legitimate communication. |
| **What is the difference between a host-based and a network firewall?** | A host-based firewall runs directly on an individual machine (e.g. Windows Defender Firewall, UFW); a network firewall protects an entire network or segment. |
| **Why are outbound rules useful?** | They can prevent systems from reaching unwanted destinations, helping reduce malware communication, command-and-control traffic, and data exfiltration. |
| **How does a firewall reduce the attack surface?** | By blocking unnecessary services and ports, attackers have fewer possible entry points into the network. |

---

## Task 2 — Types of Firewalls

Different firewalls provide different levels of traffic inspection. Some only inspect basic packet information; more advanced firewalls can inspect **connection state, packet contents, application-layer traffic, attack patterns, and encrypted traffic after decryption**. The four major firewall types covered in this room are **Stateless, Stateful, Proxy, and Next-Generation (NGFW)**.

### Firewall Types and the OSI Model

A useful way to compare firewalls is by which OSI layers they operate on. Stateless and Stateful firewalls work around Layers 3–4; Proxy firewalls work at Layer 7; NGFWs span Layers 3 through 7.

```text
OSI MODEL
Layer 7 ─── Application ──── Proxy Firewall
Layer 6 ─── Presentation
Layer 5 ─── Session
Layer 4 ─── Transport ────── Stateless / Stateful
Layer 3 ─── Network  ─────── Stateless / Stateful
Layer 2 ─── Data Link
Layer 1 ─── Physical

NGFW ── operates across Layer 3 → Layer 7
```

### The Four Firewall Types

> **1. Stateless Firewall**
> Filters packets using predefined rules and does **not remember previous connections** — every packet is treated independently (`Packet → Firewall → Check Rule → Allow/Deny`). It never asks "was this packet part of an existing connection?"; it simply checks the packet against its rules. **Advantages:** simple, fast packet processing, low resource usage, good for high-speed networks, easy to understand. **Disadvantage:** it has no knowledge of previous connections, giving limited context and less sophisticated filtering.

> **2. Stateful Firewall**
> Keeps track of active network connections in a **state table**, so it understands the *context* of traffic. When a client establishes a connection (e.g. `SYN`), the firewall records details (Source IP, Destination IP, Source Port, Destination Port, Protocol, State: `ESTABLISHED`). Subsequent packets are checked against the state table, and response traffic from an allowed connection is recognised as part of that existing connection — more intelligent filtering than a stateless firewall.

> **3. Proxy Firewall**
> Acts as an **intermediary** between the client and the destination and operates at the **application layer (Layer 7)**. Instead of the client talking directly to the destination, the proxy receives the request, inspects it, and then forwards it — enabling application-level filtering and **content filtering** (block malicious websites, restricted categories, suspicious content). It can also provide a degree of **anonymity**, since the destination may see the proxy's address instead of the internal client's IP. Also called an **application-level gateway**; it may inspect protocols such as HTTP, HTTPS, FTP, SMTP, and DNS.

> **4. Next-Generation Firewall (NGFW)**
> A more advanced firewall operating across **Layer 3 → Layer 7**, combining traditional firewall capabilities with additional security technologies: **Deep Packet Inspection (DPI)**, **Intrusion Prevention (IPS)**, **application awareness**, **heuristic analysis**, **SSL/TLS inspection**, and **advanced threat protection**. DPI inspects packet content (not just metadata); IPS can block malicious traffic before it reaches protected systems; heuristic analysis looks for suspicious behaviour/patterns rather than only known signatures; TLS inspection can decrypt, inspect, and re-encrypt traffic.

> ⚠️ In real environments, TLS inspection has privacy, performance, certificate, and policy considerations.

### Stateful State Table

A simplified state table gives the firewall context:

```text
┌──────────────┬──────────────┬───────┬──────┬────────────┐
│ Source IP    │ Destination  │ S.Port│ D.Port│ State      │
├──────────────┼──────────────┼───────┼──────┼────────────┤
│192.168.1.10  │10.10.10.20   │50000  │443   │ESTABLISHED │
│192.168.1.11  │10.10.10.30   │51000  │80    │ESTABLISHED │
└──────────────┴──────────────┴───────┴──────┴────────────┘
```

### Stateless vs Stateful

| Stateless | Stateful |
|---|---|
| No state tracking | Tracks connections |
| Packet-based | Connection-aware |
| Faster / simple | More intelligent |
| Less context | More context |
| Basic filtering | Complex rules |

> **Memory trick:** `STATELESS = FORGETS` · `STATEFUL = REMEMBERS`.

### Firewall Comparison

| Firewall | OSI Layer | Connection State | Content Inspection | Advanced Security |
|---|---|---|---|---|
| Stateless | L3/L4 | ❌ No | ❌ Limited | ❌ Basic |
| Stateful | L3/L4 | ✅ Yes | ❌ Limited | ⚠️ Moderate |
| Proxy | L7 | Application-aware | ✅ Yes | ✅ Yes |
| NGFW | L3–L7 | ✅ Yes | ✅ Deep inspection | ✅ Advanced |

### Characteristics from the Room

- **Stateless Firewall** — basic filtering; no tracking of previous connections; efficient for high-speed networks.
- **Stateful Firewall** — recognises traffic by patterns; complex rules can be applied; monitors network connections.
- **Proxy Firewall** — inspects data inside packets; provides content filtering; provides application control; can decrypt and inspect SSL/TLS traffic.
- **Next-Generation Firewall** — provides advanced threat protection; includes an intrusion prevention system; identifies anomalies using heuristic analysis; decrypts and inspects SSL/TLS data packets.

> **One-line comparison:** Stateless → *"I only look at this packet."* · Stateful → *"I remember this connection."* · Proxy → *"I inspect the application request."* · NGFW → *"I perform advanced security inspection."* Memory order: `S → S → P → N`.

### Task 2 — Answers

| Question | Answer |
|---|---|
| **Q1. Which type of firewall maintains the state of connections?** | stateful firewall |
| **Q2. Which type of firewall offers heuristic analysis for the traffic?** | next-generation firewall |
| **Q3. Which type of firewall inspects the traffic coming to an application?** | proxy firewall |

### Interview Questions — Firewall Types

| Question | Answer |
|---|---|
| **What is a stateless firewall?** | A firewall that evaluates packets independently using predefined rules without maintaining connection state. |
| **What is a stateful firewall?** | A firewall that maintains information about active connections and uses connection state when making filtering decisions. |
| **What is a proxy firewall?** | A firewall that acts as an intermediary between clients and destinations and can inspect application-layer traffic. |
| **What is an NGFW?** | A Next-Generation Firewall combines traditional firewall filtering with advanced capabilities such as deep packet inspection, IPS, application awareness, heuristic analysis, and TLS inspection. |

---

## Task 3 — Rules in Firewalls

A firewall controls network traffic using **rules**. A rule tells the firewall *who* is communicating, *where* the traffic is going, *which* port/protocol is used, *what* to do, and *which direction* the rule applies to. When traffic arrives, the firewall checks it against its rules: `Match → Rule Action` or `No match → Default Policy`.

### Components of a Firewall Rule

> **1. Source Address**
> Identifies the machine the traffic originates from (e.g. `192.168.1.10`). It can also represent an entire network/subnet such as `192.168.1.0/24`, applying the rule to all traffic originating from that network.

> **2. Destination Address**
> Identifies the machine that will receive the traffic (e.g. `192.168.1.20`). The first IP is the source, the second is the destination (`SOURCE = where traffic comes FROM`, `DESTINATION = where traffic goes TO`).

> **3. Port**
> Identifies a network service — e.g. `22 → SSH`, `80 → HTTP`, `443 → HTTPS`, `25 → SMTP`, `53 → DNS`. Firewalls frequently create rules based on specific ports.

> **4. Protocol**
> Specifies the network protocol used by the traffic — commonly `TCP`, `UDP`, or `ICMP`. Example: `Protocol: TCP`, `Port: 22`, `Action: Allow` allows TCP traffic destined for port 22.

> **5. Action**
> Tells the firewall what to do when traffic matches a rule. The three main actions covered here are `ALLOW`, `DENY`, and `FORWARD`.

> **6. Direction**
> Determines whether the rule applies to `INCOMING` or `OUTGOING` traffic. Common directions: `Inbound`, `Outbound`, `Forward`.

### Complete Rule Structure

| Action | Source | Destination | Protocol | Port | Direction |
|---|---|---|---|---|---|
| Allow | 192.168.1.0/24 | Any | TCP | 80 | Outbound |

> Read it as: Allow TCP traffic from `192.168.1.0/24` to any destination on port `80` in the outbound direction.

### The Three Actions

| Action | Meaning |
|---|---|
| Allow | Permit matching traffic |
| Deny | Block matching traffic |
| Forward | Redirect traffic to another segment |

> **Memory trick:** `ALLOW → Let it pass` · `DENY → Stop it` · `FORWARD → Send it somewhere else`.

- **Allow example** — permit outgoing HTTP: `Action: Allow`, `Source: 192.168.1.0/24`, `Destination: Any`, `Protocol: TCP`, `Port: 80`, `Direction: Outbound`.
- **Deny example** — block incoming SSH: `Action: Deny`, `Source: Any`, `Destination: 192.168.1.0/24`, `Protocol: TCP`, `Port: 22`, `Direction: Inbound`.
- **Forward example** — redirect incoming HTTP to an internal web server: `Action: Forward`, `Source: Any`, `Destination: 192.168.1.8`, `Protocol: TCP`, `Port: 80`, `Direction: Inbound`.

### Directionality of Firewall Rules

Rules are categorised by the direction of traffic — **Inbound, Outbound, Forward**:

```text
INBOUND
-------
Traffic coming INTO the network/device.
Internet → Firewall → Internal System

OUTBOUND
--------
Traffic going OUT of the network/device.
Internal System → Firewall → Internet

FORWARD
--------
Traffic redirected/forwarded to another
network segment or internal host.
Internet → Firewall → Internal Web Server
```

- **Inbound rule** (allow HTTP to a web server): `Action: Allow`, `Source: Any`, `Destination: Web Server`, `Protocol: TCP`, `Port: 80`, `Direction: Inbound`.
- **Outbound rule** (block outgoing SMTP): `Action: Deny`, `Source: Internal Network`, `Destination: Any`, `Protocol: TCP`, `Port: 25`, `Direction: Outbound`.
- **Forwarding rule** (forward HTTP to internal host): `Action: Forward`, `Source: Any`, `Destination: 192.168.1.8`, `Protocol: TCP`, `Port: 80`, `Direction: Inbound`.

### Real-World Scenario

Imagine a company network with a Web Server (`192.168.1.8`), a Mail Server (`192.168.1.9`), and employee PCs behind a firewall. Possible rules:

```text
1. Allow inbound TCP/80
2. Allow inbound TCP/443
3. Deny inbound TCP/22
4. Allow outbound TCP/80
5. Allow outbound TCP/443
6. Deny outbound TCP/25
```

Without proper rules, unnecessary services (SSH, SMB, RDP, database traffic) could become reachable; with rules the exposed **attack surface** is reduced.

> **Memory trick:** `SOURCE = FROM` · `DESTINATION = TO` · `PORT = WHICH SERVICE` · `PROTOCOL = HOW` · `ACTION = WHAT TO DO` · `DIRECTION = WHICH WAY`.

### Task 3 — Answers

| Question | Answer |
|---|---|
| **Q1. Which type of action should be defined in a rule to permit any traffic?** | allow |
| **Q2. What is the direction of the rule that is created for traffic leaving our network?** | outbound |

### Interview Questions — Firewall Rules

| Question | Answer |
|---|---|
| **What is a firewall rule?** | A firewall rule defines conditions such as source, destination, protocol, port, and direction, along with an action that determines whether matching traffic is allowed, denied, or forwarded. |
| **What is an inbound rule?** | A rule that controls incoming traffic to a system or network. |
| **What is an outbound rule?** | A rule that controls traffic leaving a system or network. |
| **What is a forwarding rule?** | A rule that redirects traffic to another network segment or internal destination. |
| **What are the three main firewall actions?** | Allow, Deny, and Forward. |

---

## Task 4 — Windows Defender Firewall

**Windows Defender Firewall** is the built-in firewall included with Windows. It protects Windows systems by controlling both **incoming** and **outgoing** traffic and deciding whether to **allow or block** it. Because it runs directly on the Windows machine, it is a **host-based firewall** — unlike a network firewall that protects many machines at once, it primarily protects the individual Windows host.

### Windows Network Profiles

Windows Firewall applies different policies depending on the type of network it is connected to. The three profiles are:

> **1. Domain Profile**
> Used when a Windows computer is connected to an organisation's **Active Directory domain**. Typical of enterprise environments; security policies can be managed centrally by the organisation.

> **2. Private Profile**
> Intended for **trusted** networks — home network, trusted office network, trusted LAN. The system may allow more network discovery or communication than on an untrusted public network, depending on configuration.

> **3. Public Profile**
> Intended for **untrusted** networks — airport Wi-Fi, hotel Wi-Fi, coffee-shop Wi-Fi, public hotspots. Designed to be more restrictive and reduce exposure when connected to an unknown network.

The same computer can shift profiles as it moves between networks — company network → Domain, home Wi-Fi → Private, airport Wi-Fi → Public — and the firewall applies different policies accordingly.

> **Memory trick:** 🏢 `DOMAIN → Company` · 🏠 `PRIVATE → Trusted` · 🌐 `PUBLIC → Untrusted`.

### Windows Defender Firewall Rules

Windows Firewall rules can control **Program, Port, Protocol, IP Address, Direction, Action, and Profile**. **Inbound rules** control traffic coming into the Windows machine (e.g. `Allow inbound TCP/443` permits HTTPS to a Windows service). **Outbound rules** control traffic leaving the machine (e.g. `Deny outbound TCP/25` prevents the machine from sending SMTP over port 25).

### Windows Firewall with Advanced Security

Windows provides a more advanced management console — **Windows Defender Firewall with Advanced Security** — that manages **Inbound Rules, Outbound Rules, Connection Security Rules, Monitoring, and Firewall Properties**. You can open it via **Start → search → Windows Defender Firewall with Advanced Security**, or with the Run dialog:

`Win + R → wf.msc → Enter`

Each inbound/outbound rule can define properties such as Name, Description, Program, Protocol, Local Port, Remote Port, Local Address, Remote Address, Action, and Profile.

### Rule Types

When creating a Windows Firewall rule you can choose from four rule types:

> **1. Program Rule**
> Controls traffic for a specific executable (e.g. `C:\Example\app.exe`) — allowing or blocking network access for that application.

> **2. Port Rule**
> Controls traffic based on `TCP`/`UDP` and a port number (e.g. `TCP` port `443`).

> **3. Predefined Rule**
> Uses predefined Windows firewall rule categories, e.g. Remote Desktop, File and Printer Sharing.

> **4. Custom Rule**
> Provides fine-grained control over Programs, Protocols, Ports, IP addresses, and Profiles.

### Blocking a Port — Example

To block `TCP/80` (HTTP), a simplified rule is `Rule Type: Port`, `Protocol: TCP`, `Local Port: 80`, `Action: Block the connection`, `Profile: Appropriate profile`, `Name: Block HTTP`. If outbound `TCP/80` is blocked, browser HTTP requests are blocked while HTTPS on `TCP/443` may still be allowed if no rule blocks it. A rule can be tied to one or more profiles — e.g. `Allow File Sharing` might be Domain → ✅ Allow, Private → ✅ Allow, Public → ❌ Block, reducing exposure on public networks.

### Why Outbound Rules Matter

Many beginners focus only on incoming traffic, but outbound filtering matters too. If malware executes and tries to connect out, restricted outbound traffic can block the attempt (`Malware → Connection Attempt → Firewall → ❌ BLOCK`), potentially disrupting **command-and-control, data exfiltration, and malware communication**. Combining a network firewall with a host firewall (`Internet → Network Firewall → Windows Firewall → Application`) is an example of **defence in depth**: `Attacker → Network Firewall → Endpoint Firewall → Endpoint Security → Application`.

### Command-Line Management

Windows Firewall can be managed from the command line with `netsh advfirewall`:

```powershell
netsh advfirewall
netsh advfirewall show allprofiles
```

PowerShell can also inspect firewall rules and profiles:

```powershell
Get-NetFirewallRule
Get-NetFirewallProfile
```

`Get-NetFirewallRule` returns configured rules (Name, Enabled, Direction, Action, Profile); `netsh advfirewall show allprofiles` shows the configuration for the different profiles.

### Firewall Logs and SIEM

Windows Firewall events can be collected by a SIEM: `Windows Firewall → Firewall Events → Log Collection → SIEM → Detection Rule → Alert`. Correlated with other telemetry — `Suspicious Process + DNS Request + Firewall Block → Potential Malware Activity` — this is far stronger than looking at one event alone. A SOC analyst investigating *why* a connection was blocked or allowed uses fields such as Source IP, Destination IP, Port, Protocol, Direction, Rule, Profile, Timestamp, and Application.

### Interview Questions — Windows Defender Firewall

| Question | Answer |
|---|---|
| **Q1. What is Windows Defender Firewall?** | Windows Defender Firewall is a built-in host-based firewall that controls inbound and outbound network traffic on Windows systems according to configured rules. |
| **Q2. What are the Windows Firewall network profiles?** | Domain, Private, Public. |
| **Q3. What is the difference between Private and Public profiles?** | The Private profile is intended for trusted networks, while the Public profile is intended for untrusted networks and is generally more restrictive. |
| **Q4. What are inbound firewall rules?** | Inbound rules control network traffic coming into the Windows host. |
| **Q5. What are outbound firewall rules?** | Outbound rules control network traffic leaving the Windows host. |
| **Q6. How can you open Windows Firewall with Advanced Security?** | Run `wf.msc`. |
| **Q7. How can you list Windows Firewall rules using PowerShell?** | Use `Get-NetFirewallRule`. |
| **Q8. Why are outbound firewall rules useful?** | They can restrict unwanted connections leaving a host, potentially limiting malware command-and-control communication or data exfiltration. |

---

## Task 5 — Linux Firewall: Netfilter, iptables & UFW

Linux provides several mechanisms for controlling network traffic. The core stack is `Netfilter → iptables → Rules + Chains`, and modern systems may also use `nftables` and user-friendly tools such as `UFW`.

- **Netfilter** — the Linux **kernel framework** that provides packet filtering, NAT, logging, and other network functionality. It is the underlying firewall framework (`Netfilter = kernel-level networking framework`).
- **iptables** — a command-line firewall administration tool traditionally used to configure Netfilter packet-filtering rules (`iptables = tool used to configure Netfilter rules`).

### iptables Rule Structure

A simplified iptables rule can contain Protocol, Source IP, Destination IP, Source Port, Destination Port, Interface, and Action. For example:

```bash
$ sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
```

Breaking it down: `-A INPUT` appends a rule to the INPUT chain, `-p tcp` matches the TCP protocol, `--dport 22` matches destination port 22, and `-j ACCEPT` allows the packet.

### Chains

iptables organises rules into **chains**. The three main built-in chains are:

> **1. INPUT Chain**
> Handles packets **destined for the local machine** — traffic coming *INTO* this host (e.g. `Internet → SSH → Linux Firewall → INPUT → Linux Host`).

> **2. OUTPUT Chain**
> Handles packets **generated by the local machine** — traffic *leaving* this host (e.g. `Linux Host → HTTP/HTTPS → OUTPUT Chain → Internet`).

> **3. FORWARD Chain**
> Handles packets **routed through the machine** when it acts as a router/gateway — the packet is not destined for the Linux host itself (`Network A → Linux Firewall/Router → FORWARD → Network B`).

```text
                         INTERNET
                            │
                    ┌───────▼───────┐
                    │ Linux Firewall│
                    │   Netfilter   │
                    └───────┬───────┘
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
           INPUT          OUTPUT       FORWARD
              │             │             │
              ▼             ▼             ▼
          Local Host     Network      Other Network
```

> **Memory trick:** `INPUT → INTO ME` · `OUTPUT → OUT OF ME` · `FORWARD → THROUGH ME`.

### Default Policies & Targets

Each chain can have a default policy — commonly `ACCEPT` or `DROP` (e.g. `iptables -P INPUT DROP` sets the default policy of the INPUT chain to DROP). Common targets:

- **ACCEPT** — allow the packet.
- **DROP** — silently discard the packet.
- **REJECT** — block the packet **and** send the sender an error/response.

> **Memory trick:** `DROP → Ignore it` · `REJECT → Refuse it explicitly`.

### Rule Syntax & Common Options

General structure: `iptables [OPTIONS] [CHAIN] [MATCH] [TARGET]`.

| Option | Meaning |
|---|---|
| `-A` | Append rule |
| `-I` | Insert rule |
| `-D` | Delete rule |
| `-L` | List rules |
| `-F` | Flush rules |
| `-P` | Set default policy |
| `-p` | Protocol |
| `-s` | Source |
| `-d` | Destination |
| `--sport` | Source port |
| `--dport` | Destination port |
| `-j` | Target/action |
| `-n` | Numeric output |
| `-v` | Verbose output |

### Listing Rules

```bash
$ sudo iptables -L
Chain INPUT (policy ACCEPT)
target   prot opt source      destination
ACCEPT   tcp  --  anywhere    anywhere
DROP     tcp  --  anywhere    anywhere
```

A more detailed form is `sudo iptables -L -n -v`, where `-L` lists rules, `-n` skips address/service resolution, and `-v` gives verbose output.

### Matching by IP and Protocol

You can restrict traffic by source IP (`sudo iptables -A INPUT -s 192.168.1.10 -j ACCEPT`), by destination (`sudo iptables -A INPUT -d 192.168.1.20 -j ACCEPT`), or by protocol using `-p tcp`, `-p udp`, or `-p icmp` (e.g. `sudo iptables -A INPUT -p icmp -j ACCEPT` allows ICMP through the INPUT chain).

### Default-Deny Secure Configuration

A common security approach is **deny by default** (`Unknown Traffic → Default Policy → DROP`), then explicitly allow required services:

```bash
sudo iptables -P INPUT DROP
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT
```

This sets the default INPUT policy to DROP and allows SSH, HTTP, and HTTPS while dropping everything else.

> ⚠️ On a remote SSH server, changing the default INPUT policy before ensuring the required SSH rule is in place can lock you out. Be equally careful with `sudo iptables -F` (flush), which can unintentionally expose services or change connectivity.

### UFW — Uncomplicated Firewall

**UFW** (Uncomplicated Firewall) provides a simpler interface for managing Linux firewall rules. Instead of writing long iptables commands, you can use short ones — `sudo ufw allow 22/tcp` instead of `iptables -A INPUT -p tcp --dport 22 -j ACCEPT`. Conceptually: `UFW → Simplified Interface → Firewall Rules → Netfilter`.

Check the current status:

```bash
$ sudo ufw status
Status: active
To                         Action      From
--                         ------      ----
22/tcp                     ALLOW       Anywhere
80/tcp                     ALLOW       Anywhere
443/tcp                    ALLOW       Anywhere
```

Display numbered rules so you can delete one by index:

```bash
$ sudo ufw status numbered
[1] 22/tcp    ALLOW
[2] 80/tcp    ALLOW
[3] 443/tcp   ALLOW
```

UFW can also restrict by source IP: `sudo ufw allow from 192.168.1.10`, or combine source and port with `sudo ufw allow from 192.168.1.10 to any port 22`. Default policies can be set with `sudo ufw default deny incoming` (only explicitly allowed services pass inbound) and `sudo ufw default allow outgoing` (applications can communicate outward).

> ⚠️ **SSH warning:** when working remotely, allow SSH *before* enabling a restrictive incoming policy — run `sudo ufw allow 22/tcp` then `sudo ufw default deny incoming`, otherwise the firewall change can block port 22 and drop your session.

### iptables vs UFW

| iptables | UFW |
|---|---|
| Low-level | User-friendly |
| More complex | Easier |
| Fine-grained | Simplified management |
| CLI-based | CLI-based |
| Powerful | Beginner-friendly |

> **Memory trick:** `iptables → POWER + CONTROL` · `UFW → SIMPLE + EASY`.

### Practical Examples

A Linux web server needs SSH, HTTP, and HTTPS (ports 22, 80, 443). Configure with UFW, then enable and check:

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

To block Telnet (`TCP/23`) you can use either tool — `sudo ufw deny 23/tcp` or `sudo iptables -A INPUT -p tcp --dport 23 -j DROP`.

### Troubleshooting a Linux Firewall

If a service is unreachable, check: (1) Is the service running? (2) Is the correct port open? (3) Is the firewall enabled? (4) Is there a rule blocking traffic? (5) Is the service listening on the expected interface? (6) Is another firewall filtering the traffic? Useful commands:

```bash
sudo ufw status
sudo iptables -L -n -v
ss -tulpn
```

`ss -tulpn` checks listening services.

### iptables vs nftables

Modern Linux systems may use **nftables** as the newer packet-filtering framework (`Older/Traditional → iptables`; `Modern Linux → nftables`). UFW can provide a simpler management layer while the underlying implementation depends on the distribution/version. For the fundamentals, the important concepts remain **Netfilter, iptables, Chains, Rules, UFW**.

### iptables Command Reference

```bash
# List rules
sudo iptables -L
sudo iptables -L -n -v

# Allow SSH (TCP/22)
sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# Allow HTTP (TCP/80)
sudo iptables -A INPUT -p tcp --dport 80 -j ACCEPT

# Allow HTTPS (TCP/443)
sudo iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# Block Telnet (TCP/23)
sudo iptables -A INPUT -p tcp --dport 23 -j DROP

# Set default INPUT policy to DROP
sudo iptables -P INPUT DROP

# Flush all rules
sudo iptables -F
```

### UFW Command Reference

```bash
# Check status
sudo ufw status

# Enable / disable the firewall
sudo ufw enable
sudo ufw disable

# Allow common services
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Deny Telnet
sudo ufw deny 23/tcp

# Delete a rule
sudo ufw delete allow 80/tcp

# Numbered rules
sudo ufw status numbered

# Default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

### Interview Questions — Linux Firewall

| Question | Answer |
|---|---|
| **Q1. What is Netfilter?** | Netfilter is the Linux kernel framework that provides packet filtering and other network packet-processing capabilities. |
| **Q2. What is iptables?** | iptables is a command-line tool traditionally used to configure packet-filtering rules in Linux through the Netfilter framework. |
| **Q3. What are the three main iptables chains?** | INPUT, OUTPUT, FORWARD. |
| **Q4. What does INPUT do?** | It handles traffic destined for the local Linux machine. |
| **Q5. What does OUTPUT do?** | It handles traffic generated by the local Linux machine. |
| **Q6. What does FORWARD do?** | It handles traffic passing through the Linux machine when it is acting as a router or gateway. |
| **Q7. What is UFW?** | UFW stands for Uncomplicated Firewall and provides a simpler interface for managing Linux firewall rules. |
| **Q8. What is the difference between DROP and REJECT?** | DROP silently discards the packet, while REJECT blocks it and sends an appropriate rejection response to the sender. |
| **Q9. How do you list iptables rules?** | Run `sudo iptables -L -n -v`. |
| **Q10. How do you check UFW status?** | Run `sudo ufw status`. |

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **Firewall** | A security solution that inspects incoming and outgoing traffic and allows or blocks it based on configured rules — a digital security guard between trusted and untrusted networks. |
| **Inspects** | Both incoming (`Internet → Firewall → Internal System`) and outgoing (`Internal System → Firewall → Internet`) traffic. |
| **Host vs Network** | Host-based runs on one machine (Windows Defender Firewall, UFW); network firewall protects a whole network/segment. |
| **Rule components** | Source, Destination, Port, Protocol, Action, Direction. |
| **Actions** | `ALLOW` (permit), `DENY` (block), `FORWARD` (redirect to another segment). |
| **Directions** | `Inbound` (in), `Outbound` (out), `Forward` (through). |
| **Firewall types** | Stateless (L3/L4, no state), Stateful (L3/L4, state table), Proxy (L7, application-level gateway), NGFW (L3–L7, DPI + IPS + heuristics + TLS inspection). `S → S → P → N`. |
| **Stateless vs Stateful** | `STATELESS = FORGETS`; `STATEFUL = REMEMBERS` (tracks connections in a state table). |
| **Key ports** | 22 SSH · 23 Telnet · 25 SMTP · 53 DNS · 80 HTTP · 443 HTTPS · 3389 RDP. |
| **Windows profiles** | Domain (company), Private (trusted), Public (untrusted). Advanced console: `wf.msc`. |
| **Windows rule types** | Program, Port, Predefined, Custom. |
| **Windows CLI** | `netsh advfirewall show allprofiles`, `Get-NetFirewallRule`, `Get-NetFirewallProfile`. |
| **Linux stack** | `Netfilter` (kernel framework) → `iptables` (rule tool) → `UFW` (simpler interface); modern systems may use `nftables`. |
| **iptables chains** | `INPUT` (into me), `OUTPUT` (out of me), `FORWARD` (through me). |
| **Targets** | `ACCEPT` (allow), `DROP` (silently discard), `REJECT` (block + respond). |
| **iptables example** | `sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT` (allow SSH). |
| **UFW example** | `sudo ufw allow 22/tcp`; check with `sudo ufw status`. |
| **Default-deny** | Deny by default, then explicitly allow required services; allow SSH before enabling a restrictive policy remotely. |

**Key idea:** A firewall controls network traffic with rules built from **Source + Destination + Port + Protocol + Direction** and an action of **ALLOW / DENY / FORWARD** — across firewall types (**Stateless / Stateful / Proxy / NGFW**) and platforms (**Windows Defender Firewall**, **Linux Netfilter / iptables / UFW**).

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is a firewall?** | A network security control that inspects incoming and outgoing traffic and allows or blocks it based on predefined or custom rules, preventing unauthorised access while allowing legitimate communication. |
| **Q2. Which security solution inspects the incoming and outgoing traffic of a device or a network?** | A firewall. |
| **Q3. What is the difference between a host-based and a network firewall?** | Host-based runs on an individual machine (e.g. Windows Defender Firewall, UFW); network firewall protects an entire network or segment. |
| **Q4. What are the components of a firewall rule?** | Source, Destination, Port, Protocol, Action, Direction. |
| **Q5. What are the three main firewall actions?** | Allow, Deny, Forward. |
| **Q6. What are the three rule directions?** | Inbound, Outbound, Forward. |
| **Q7. What is a stateless firewall?** | A firewall that evaluates packets independently using predefined rules without maintaining connection state. |
| **Q8. What is a stateful firewall?** | A firewall that maintains information about active connections and uses connection state when making filtering decisions. |
| **Q9. What is a proxy firewall?** | A firewall that acts as an intermediary between clients and destinations and can inspect application-layer traffic; also called an application-level gateway. |
| **Q10. What is an NGFW?** | A Next-Generation Firewall that combines traditional filtering with deep packet inspection, IPS, application awareness, heuristic analysis, and TLS inspection. |
| **Q11. Which firewall type maintains the state of connections?** | Stateful firewall. |
| **Q12. Which firewall type offers heuristic analysis?** | Next-generation firewall. |
| **Q13. Which firewall type inspects traffic coming to an application?** | Proxy firewall. |
| **Q14. What is Windows Defender Firewall?** | A built-in host-based firewall that controls inbound and outbound traffic on Windows systems according to configured rules. |
| **Q15. What are the Windows Firewall network profiles?** | Domain, Private, Public. |
| **Q16. How do you open Windows Firewall with Advanced Security?** | Run `wf.msc`. |
| **Q17. What is Netfilter?** | The Linux kernel framework that provides packet filtering and other network packet-processing capabilities. |
| **Q18. What is iptables?** | A command-line tool used to configure packet-filtering rules in Linux through the Netfilter framework. |
| **Q19. What are the three main iptables chains?** | INPUT, OUTPUT, FORWARD. |
| **Q20. What is the difference between DROP and REJECT?** | DROP silently discards the packet; REJECT blocks it and sends a rejection response to the sender. |

---

## Final Takeaway

A **firewall** is a network security control that inspects **incoming** and **outgoing** traffic and **allows or blocks** it based on configured **rules** — the digital security guard between **trusted** and **untrusted** networks. Every rule is built from **Source, Destination, Port, Protocol, Direction**, and an **Action** of **Allow, Deny, or Forward**, applied in the **Inbound, Outbound, or Forward** direction. Firewalls come in four types of increasing capability — **Stateless** (packet-by-packet, no memory), **Stateful** (connection-aware via a **state table**), **Proxy** (a Layer 7 **application-level gateway** with content filtering), and **NGFW** (Layers 3–7 with **Deep Packet Inspection**, **IPS**, **heuristic analysis**, and **SSL/TLS inspection**). On endpoints, **Windows Defender Firewall** enforces policy through **Domain, Private, and Public** profiles and Program/Port/Predefined/Custom rules (managed via `wf.msc`, `netsh advfirewall`, and `Get-NetFirewallRule`). On Linux, the stack runs **Netfilter → iptables → UFW**, with the **INPUT, OUTPUT, and FORWARD** chains and targets **ACCEPT, DROP, and REJECT**. The recurring lesson is that *a firewall is only as effective as its configuration* — allow required traffic, minimise unnecessary exposure through **default-deny**, and block unauthorised communication.
