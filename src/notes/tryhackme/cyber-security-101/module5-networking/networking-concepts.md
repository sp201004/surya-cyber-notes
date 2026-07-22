| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Networking / Concepts |
| **Difficulty** | Beginner |
| **Time** | ~50 Minutes |
| **Module** | Networking |

---

## Objective

This room builds the foundation of networking: how devices communicate, the models that describe that communication, how addresses and ports work, and how the two core transport protocols behave. Every website, app, email, and online service works because devices exchange data through computer networks, and these concepts underpin almost everything else in cyber security.

By the end of this room you will be able to:

- Explain why networking exists and what a protocol is
- Describe the OSI model and its seven layers
- Describe the TCP/IP model and compare it with OSI
- Read and reason about IPv4 addresses, octets, and special addresses
- Interpret CIDR notation and subnet masks
- Distinguish private and public IPs and explain NAT
- Explain routing and how a packet travels across networks
- Compare TCP and UDP and walk through the three-way handshake
- Explain encapsulation, decapsulation, and PDUs
- Use Telnet and understand why it has been replaced by SSH

---

## Task 1 — Why We Need Networking

Networking is the foundation of modern communication. Without a network, two computers sit side by side with no way to exchange data. Once you connect them through a router, they can share information freely.

```text
Computer A
     │
   Router
     │
Computer B
```

A real request travels through several hops before reaching its destination:

```text
Laptop
   │
   ▼
WiFi Router
   │
   ▼
ISP
   │
   ▼
Internet
   │
   ▼
Google Server
```

Networking makes everyday tasks possible: browsing websites, sending emails, video calls, file sharing, gaming, and cloud computing.

---

## Task 2 — What Is a Protocol?

A **protocol** is simply a set of rules that every device agrees to follow. Traffic signals are a good analogy: green means go, yellow means slow, and red means stop, and every driver follows the same rules. Networking works the same way, only devices follow the rules instead of drivers.

Common protocols include **HTTP**, **HTTPS**, **FTP**, **SSH**, **DNS**, **TCP**, and **UDP**. Without a shared protocol, one device sends data the other cannot interpret, and no communication happens.

> **Note:** Protocols exist at every layer of the network. A single web request relies on many protocols cooperating, from HTTP at the top down to Ethernet at the bottom.

---

## Task 3 — The OSI Model

**OSI** stands for **Open Systems Interconnection**. It was developed by the **ISO (International Organization for Standardization)** to provide a standard model that explains how two computers communicate.

OSI is a **conceptual** model. Real networks mostly run on TCP/IP, but every networking engineer learns OSI first because it cleanly separates communication into distinct responsibilities.

| Property | Detail |
|----------|--------|
| **Full name** | Open Systems Interconnection |
| **Created by** | ISO |
| **Number of layers** | 7 |
| **Type** | Conceptual reference model |
| **Purpose** | Standardises how two computers communicate |

---

## Task 4 — The Seven OSI Layers

Data moves down the stack on the sender and back up the stack on the receiver. Keep this diagram as your mental map:

```text
                +----------------------+
 Layer 7        | Application          |
                +----------------------+
 Layer 6        | Presentation         |
                +----------------------+
 Layer 5        | Session              |
                +----------------------+
 Layer 4        | Transport            |
                +----------------------+
 Layer 3        | Network              |
                +----------------------+
 Layer 2        | Data Link            |
                +----------------------+
 Layer 1        | Physical             |
                +----------------------+
```

On the sender, data travels top to bottom until only bits leave the wire; on the receiver, it travels bottom to top until the application reads it:

```text
Sender                         Receiver
Application                    Application
     ↓                              ↑
Presentation                   Presentation
     ↓                              ↑
Session                        Session
     ↓                              ↑
Transport                      Transport
     ↓                              ↑
Network                        Network
     ↓                              ↑
Data Link                      Data Link
     ↓                              ↑
Physical  ── Cable / WiFi ──►   Physical
```

### Memory Tricks

A pair of mnemonics helps recall the order in each direction:

| Direction | Mnemonic | Layers |
|-----------|----------|--------|
| **Bottom → Top** | Please Do Not Throw Sausage Pizza Away | Physical, Data Link, Network, Transport, Session, Presentation, Application |
| **Top → Bottom** | All People Seem To Need Data Processing | Application, Presentation, Session, Transport, Network, Data Link, Physical |

### Layer 1 — Physical

The Physical layer is responsible for sending raw bits over the medium. It deals with electrical, optical, and radio signals. Only binary travels here — no IP, no MAC, no TCP, just bits like `0 1 0 1 1 0 0 1`.

| Aspect | Detail |
|--------|--------|
| **Purpose** | Send raw bits over the medium |
| **Deals with** | Electrical, optical, and radio signals |
| **Examples** | Ethernet cable, fiber cable, WiFi, Bluetooth |
| **Devices** | Hub, repeater |

The interview answer for the layer that works with cables is **Layer 1**.

### Layer 2 — Data Link

The Data Link layer transfers data inside the same network. It provides MAC addressing, error detection, and frame creation. A MAC address such as `A4:C3:F0:85:AC:2D` is structured as a vendor ID followed by a device ID.

| Aspect | Detail |
|--------|--------|
| **Purpose** | Transfer data inside the same network |
| **Provides** | MAC addressing, error detection, frame creation |
| **Protocols** | Ethernet (802.3), WiFi (802.11) |
| **Address used** | MAC address |
| **Devices** | Switch, bridge |

A frame wraps the payload between a header and a trailer:

```text
+-------------------------+
| MAC Header              |
+-------------------------+
| Payload                 |
+-------------------------+
| Trailer                 |
+-------------------------+
```

The address that exists at this layer is the **MAC address**.

### Layer 3 — Network

The Network layer moves packets between different networks. It handles routing, path selection, and logical addressing using IP addresses such as `192.168.1.10`.

| Aspect | Detail |
|--------|--------|
| **Purpose** | Move packets between different networks |
| **Responsible for** | Routing, path selection, logical addressing |
| **Protocols** | IP, ICMP, IPSec |
| **Address used** | IP address |
| **Device** | Router |

The device that works at Layer 3 is the **router**.

### Layer 4 — Transport

The Transport layer provides reliable communication between two hosts. It performs segmentation, reliability, error recovery, and flow control using **TCP** and **UDP**.

| Aspect | Detail |
|--------|--------|
| **Purpose** | Reliable communication between two hosts |
| **Protocols** | TCP, UDP |
| **Functions** | Segmentation, reliability, error recovery, flow control |
| **PDU** | Segment (TCP), Datagram (UDP) |

The protocol that performs the three-way handshake is **TCP**.

### Layer 5 — Session

The Session layer creates, maintains, and terminates sessions. Examples include **RPC** and **NFS**. A video call is a real-world session: the connection starts, the session is maintained during the call, and it ends when the call finishes.

### Layer 6 — Presentation

The Presentation layer makes data readable. It handles encoding, compression, and encryption. Examples include **ASCII**, **Unicode**, **JPEG**, **PNG**, **MIME**, and **TLS** encryption. Encrypted HTTPS traffic arrives, the browser decrypts it, and readable data results.

### Layer 7 — Application

The Application layer is closest to the user. Its protocols include **HTTP**, **HTTPS**, **FTP**, **DNS**, **SMTP**, **POP3**, **IMAP**, **SSH**, and **Telnet**. When Chrome sends an HTTP request to a Google server, that interaction lives at Layer 7.

### OSI Summary

| Layer | Name | Role |
|-------|------|------|
| **7** | Application | Services to applications |
| **6** | Presentation | Encoding and encryption |
| **5** | Session | Manage sessions |
| **4** | Transport | TCP / UDP |
| **3** | Network | IP routing |
| **2** | Data Link | MAC addressing |
| **1** | Physical | Bits over the wire |

> **Tip:** When troubleshooting, work the layers in order. Confirm the physical link first, then addressing, then transport, then the application — most problems reveal themselves once you know which layer they sit on.

---

## Task 5 — The TCP/IP Model

**TCP/IP** stands for **Transmission Control Protocol / Internet Protocol** and was developed by the **US Department of Defense (DoD)**. Unlike OSI, which is a conceptual model, TCP/IP is a practical implementation — it is the model the Internet actually runs on.

The four TCP/IP layers map onto the seven OSI layers:

```text
OSI                         TCP/IP
Application  ┐
Presentation ├───────────►  Application
Session      ┘
Transport    ───────────►   Transport
Network      ───────────►   Internet
Data Link    ┐
Physical     ┴───────────►  Link
```

Some modern texts split the Link layer, giving a five-layer view of Application, Transport, Network, Link, and Physical.

| TCP/IP Layer | Protocols | Purpose |
|--------------|-----------|---------|
| **Application** | HTTP, HTTPS, FTP, SMTP, POP3, IMAP, SSH, Telnet, DNS | Provides services to applications |
| **Transport** | TCP, UDP | Reliable or fast communication |
| **Internet** | IP, ICMP, IPSec | Routing packets |
| **Link** | Ethernet, WiFi | Communication inside the local network |

HTTP belongs to the **Application** layer, and **3** OSI layers (Application, Presentation, Session) merge into the TCP/IP Application layer.

---

## Task 6 — OSI vs TCP/IP

Both models describe the same communication, but at different levels of detail and for different purposes.

| Aspect | OSI | TCP/IP |
|--------|-----|--------|
| **Layers** | 7 | 4 |
| **Type** | Conceptual | Real implementation |
| **Used for** | Learning and reference | The actual Internet |

> **Note:** OSI is the teaching model and TCP/IP is the working model. Engineers reason in OSI terms but build on TCP/IP.

---

## Task 7 — IP Addresses and IPv4

An **IP (Internet Protocol) address** uniquely identifies every device on a network. Without it, one computer cannot locate another. An example is `192.168.1.10`.

**IPv4** uses **32 bits** split into **4 octets**, giving roughly **2³² ≈ 4.3 billion** possible addresses. Each octet ranges from **0 to 255**.

```text
192.168.66.89
 │   │   │  └── Octet 4 : 89
 │   │   └───── Octet 3 : 66
 │   └───────── Octet 2 : 168
 └───────────── Octet 1 : 192
```

In binary, `192.168.1.10` is `11000000 . 10101000 . 00000001 . 00001010`.

### Special IPv4 Addresses

| Address type | Rule | Example |
|--------------|------|---------|
| **Network address** | Usually ends with `.0` | `192.168.1.0` |
| **Broadcast address** | Usually ends with `.255` | `192.168.1.255` |
| **Host range** | Everything in between | `192.168.1.1` – `192.168.1.254` |

### Checking Your IP Address

On Windows:

```cmd
ipconfig
```

On Linux:

```bash
ifconfig
ip addr show
ip a
```

A sample Linux line reads `inet 192.168.66.89/24`, which means the IP is `192.168.66.89`, the subnet is `/24`, and the broadcast address is `192.168.66.255`.

### Valid IPv4 Rules

A valid IPv4 address has four decimal octets, each between 0 and 255. `192.168.1.25` is valid, but `192.168.305.19` is invalid because `305` exceeds `255`.

---

## Task 8 — CIDR Notation

**CIDR (Classless Inter-Domain Routing)** replaces the older dotted subnet mask with a shorter slash notation. The old format `255.255.255.0` becomes `/24`, meaning the first 24 bits identify the network and the remaining 8 bits identify hosts.

| CIDR | Subnet Mask | Meaning |
|------|-------------|---------|
| **/8** | `255.0.0.0` | 8 network bits |
| **/16** | `255.255.0.0` | 16 network bits |
| **/24** | `255.255.255.0` | 24 network bits |
| **/32** | — | Single host |

---

## Task 9 — Private vs Public IP and NAT

**Private IP** addresses cannot directly access the Internet and are reserved by **RFC 1918**. **Public IP** addresses are reachable over the Internet, are globally unique, and are assigned by an ISP (for example `49.69.147.197`).

| Class | Range | CIDR |
|-------|-------|------|
| **Class A** | `10.0.0.0` – `10.255.255.255` | `10/8` |
| **Class B** | `172.16.0.0` – `172.31.255.255` | `172.16/12` |
| **Class C** | `192.168.0.0` – `192.168.255.255` | `192.168/16` |

| Type | Where used | Notes |
|------|------------|-------|
| **Private** | Home, office | Needs NAT to reach the Internet |
| **Public** | Internet-facing | Globally unique |

### NAT

**NAT (Network Address Translation)** converts a private IP into a public IP so devices on a local network can reach the Internet. The **router performs NAT**. Without it, a private IP cannot access the Internet at all.

> **Security relevance:** NAT also hides internal addressing from the outside world, so external hosts see only the router's public IP rather than each device behind it.

A quick way to remember the private ranges is **"10 – 172 – 192"**.

---

## Task 10 — Routing

A **router** finds the best path for packets. It reads the destination IP, chooses the best path, forwards the packet, and connects networks together. Routing happens at **OSI Layer 3 (Network layer)**.

A packet often passes through many routers on its way to a server:

```text
Laptop
   ↓
Home Router
   ↓
ISP Router
   ↓
Regional Router
   ↓
International Router
   ↓
Destination Router
   ↓
Server
```

When you open `www.google.com`, the browser creates a request, the router checks the destination, the packet is forwarded across the Internet to the Google server, and the reply travels back along a similar path.

---

## Task 11 — Transport Layer and Ports

The Transport layer sits at **OSI Layer 4** and provides end-to-end communication between hosts using **TCP** and **UDP**. It is responsible for reliability, error detection, segmentation, flow control, and multiplexing using port numbers.

A single computer can run many network services — Chrome, SSH, Discord, Teams, a web server — all sharing the same IP address. **Port numbers** tell the operating system which application should receive incoming data.

```text
IP Address                Port Number
    │                          │
    ▼                          ▼
Apartment Building        Specific Apartment
```

In `192.168.1.10:80`, the IP is `192.168.1.10` and the port is `80`.

### Port Number Ranges

Ports run from 0 to 65535 and split into three ranges:

| Range | Category |
|-------|----------|
| **0 – 1023** | Well-known ports |
| **1024 – 49151** | Registered ports |
| **49152 – 65535** | Dynamic / ephemeral ports |

### Important Well-Known Ports

| Port | Service |
|------|---------|
| **20** | FTP (Data) |
| **21** | FTP (Control) |
| **22** | SSH |
| **23** | Telnet |
| **25** | SMTP |
| **53** | DNS |
| **67** | DHCP Server |
| **68** | DHCP Client |
| **69** | TFTP |
| **80** | HTTP |
| **110** | POP3 |
| **123** | NTP |
| **143** | IMAP |
| **161** | SNMP |
| **389** | LDAP |
| **443** | HTTPS |
| **445** | SMB |
| **3389** | RDP |

> **Tip:** Memorise the everyday handful first: `80` HTTP, `443` HTTPS, `22` SSH, `23` Telnet, `21` FTP, `25` SMTP, `53` DNS, and `3389` RDP. The rest fill in with practice.

---

## Task 12 — TCP

**TCP (Transmission Control Protocol)** is connection-oriented and reliable. It guarantees delivery, correct ordering, retransmission of lost data, and error checking, at the cost of being slower than UDP.

| Property | TCP |
|----------|-----|
| **Type** | Connection-oriented |
| **Reliable** | Yes |
| **Ordered delivery** | Yes |
| **Error recovery** | Yes |
| **Flow control** | Yes |
| **Speed** | Slower than UDP |

If a packet goes missing, TCP notices the gap and recovers it:

```text
Packet 1 ✔
Packet 2 ✔
Packet 3 ✔
Packet 4 ✔
Packet 5 ✘    ← lost
Packet 6 ✔

TCP detects missing packet 5
        ↓
Requests retransmission
        ↓
Packet 5 received
        ↓
Data delivered correctly
```

TCP is used where correctness matters: **HTTPS, SSH, FTP, SMTP, IMAP, POP3, database connections, file downloads, and banking**.

---

## Task 13 — UDP

**UDP (User Datagram Protocol)** is connectionless and unreliable but very fast. It simply sends packets with no connection setup, no acknowledgements, and no retransmissions. If a packet is lost, it is simply lost.

| Property | UDP |
|----------|-----|
| **Type** | Connectionless |
| **Reliable** | No |
| **Ordered delivery** | No |
| **Retransmission** | No |
| **Speed** | Very fast |

UDP suits applications where speed beats perfect delivery: **video streaming, voice calls, online gaming, DNS queries, DHCP, NTP, and live broadcasts**.

---

## Task 14 — TCP vs UDP

| Aspect | TCP | UDP |
|--------|-----|-----|
| **Connection** | Yes | No |
| **Reliable** | Yes | No |
| **Ordered** | Yes | No |
| **Retransmit** | Yes | No |
| **Speed** | Slower | Faster |
| **Header** | Larger | Smaller |
| **Streaming** | Poor | Excellent |
| **Gaming** | Sometimes | Yes |
| **File transfer** | Excellent | Poor |

Real-world choices follow directly from these traits: Netflix prefers **UDP** because small packet loss is acceptable, a Windows ISO download uses **TCP** because every byte must arrive correctly, SSH remote login uses **TCP** for reliability, and a DNS lookup uses **UDP** for a fast request-response.

---

## Task 15 — Three-Way Handshake, Flags, and Termination

TCP establishes a connection before transferring data, using a process called the **three-way handshake**. The client sends `SYN` ("I want to connect"), the server replies `SYN + ACK` ("I received your request"), and the client sends `ACK` ("connection established").

```text
Client                      Server
   SYN  -------------------->
        <---------------- SYN ACK
   ACK  -------------------->
Connection Established
```

The handshake ensures both devices are online, synchronises sequence numbers, and marks the start of reliable communication.

### TCP Flags

| Flag | Meaning |
|------|---------|
| **SYN** | Start connection |
| **ACK** | Acknowledgement |
| **FIN** | Graceful connection close |
| **RST** | Immediately reset the connection |
| **PSH** | Deliver data immediately |
| **URG** | Urgent data |

### Connection Termination

TCP closes connections gracefully with a four-step exchange of FIN and ACK:

```text
Client  ── FIN ──►  Server
Client  ◄── ACK ──  Server
Client  ◄── FIN ──  Server
Client  ── ACK ──►  Server
Connection Closed
```

---

## Task 16 — Encapsulation and Decapsulation

**Encapsulation** is the process of adding protocol information (headers and trailers) to data as it moves down the stack. Each layer wraps the data from the layer above:

```text
Application Data
        │
        ▼
Transport Layer
+-----------------------------+
| TCP/UDP Header | Data       |
+-----------------------------+
        │
        ▼
Network Layer
+--------------------------------------+
| IP Header | TCP/UDP Header | Data    |
+--------------------------------------+
        │
        ▼
Data Link Layer
+------------------------------------------------+
| MAC Header | IP | TCP/UDP | Data | FCS Trailer |
+------------------------------------------------+
        │
        ▼
Physical Layer
010101001101010100101...
```

Only bits travel across the wire. **Decapsulation** is the reverse: the receiver strips one header per layer as the data climbs back up.

```text
Bits
  ↓
Frame
  ↓
Packet
  ↓
Segment
  ↓
Application Data
```

### Protocol Data Units (PDU)

The name for the data unit changes at each layer:

| OSI Layer | PDU |
|-----------|-----|
| **Application** | Data |
| **Presentation** | Data |
| **Session** | Data |
| **Transport** | Segment (TCP) / Datagram (UDP) |
| **Network** | Packet |
| **Data Link** | Frame |
| **Physical** | Bits |

### Life of a Packet

When you open `https://tryhackme.com`, the request is built and wrapped layer by layer, sent as bits, then unwrapped on the server:

```text
Browser creates HTTP request
        ↓
Transport Layer adds TCP Header
        ↓
Network Layer adds IP Header
        ↓
Data Link adds MAC Header
        ↓
Physical converts to bits
        ↓
Internet
        ↓
Destination Server removes all headers
        ↓
HTTP request reaches the Web Server
        ↓
Response follows the same path back
```

---

## Task 17 — Telnet

**Telnet** runs on **port 23** over **TCP** and provides remote terminal access. It was originally used to remotely manage systems, but it is insecure today because everything — passwords, commands, and responses — is sent in plain text and can be intercepted.

Basic usage connects to a Telnet server by IP:

```bash
telnet 10.10.10.10
```

Because HTTP is a text-based protocol, you can even connect to a web server on port 80 and type a request by hand:

```bash
telnet example.com 80
```

Once connected, type the request manually and press Enter twice:

```text
GET / HTTP/1.1
Host: example.com
```

The server responds with the raw HTTP reply:

```text
HTTP/1.1 200 OK
Content-Type: text/html
...
```

Telnet is still handy for testing open ports, HTTP services, and SMTP servers, and for general troubleshooting.

### SSH vs Telnet

| Aspect | Telnet | SSH |
|--------|--------|-----|
| **Port** | 23 | 22 |
| **Encryption** | None | Encrypted |
| **Security** | Insecure | Secure |
| **Status** | Old protocol | Used today |

> **Security relevance:** Telnet sends plain-text passwords, which are trivial to sniff or hijack, so SSH has replaced it for any real remote administration.

### Common Network Commands

On Linux:

```bash
ip a
ip addr
ifconfig
ping
traceroute
netstat
ss
arp
route
hostname
```

On Windows:

```cmd
ipconfig
ping
tracert
netstat
arp
hostname
```

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **OSI model** | 7 conceptual layers, learned first |
| **TCP/IP model** | 4 practical layers, runs the Internet |
| **IPv4** | 32 bits, 4 octets, each 0–255 |
| **CIDR /24** | Equals `255.255.255.0` |
| **Router** | Works at Layer 3 |
| **Switch** | Works at Layer 2 |
| **TCP** | Reliable, connection-oriented, three-way handshake |
| **UDP** | Fast, connectionless, no retransmission |
| **Telnet → SSH** | Plain text replaced by encryption |

**Key idea:** Communication is layered — data is wrapped on the way down, sent as bits, and unwrapped on the way up — and the choice of address, port, and transport protocol at each step determines how it reaches the right application reliably or quickly.

---

## 30-Second Revision

- A protocol is a shared set of rules; without one, devices cannot communicate.
- OSI has 7 layers (Physical → Application); TCP/IP has 4 (Link, Internet, Transport, Application).
- Layer 1 = bits, Layer 2 = MAC/switch, Layer 3 = IP/router, Layer 4 = TCP/UDP.
- IPv4 is 32 bits in 4 octets (0–255); `/24` means `255.255.255.0`.
- Private ranges: `10/8`, `172.16/12`, `192.168/16`; NAT maps private to public.
- Ports identify applications: `80` HTTP, `443` HTTPS, `22` SSH, `23` Telnet, `53` DNS, `3389` RDP.
- TCP is reliable and ordered with a three-way handshake (SYN, SYN-ACK, ACK); UDP is fast and connectionless.
- Encapsulation adds headers going down the stack; decapsulation removes them going up.
- Telnet (port 23) is plain text and insecure; SSH (port 22) is its encrypted replacement.

---

## Cheat Sheet

### Well-Known Ports

| Port | Service | Port | Service |
|------|---------|------|---------|
| **20** | FTP (Data) | **110** | POP3 |
| **21** | FTP (Control) | **123** | NTP |
| **22** | SSH | **143** | IMAP |
| **23** | Telnet | **161** | SNMP |
| **25** | SMTP | **389** | LDAP |
| **53** | DNS | **443** | HTTPS |
| **67** | DHCP Server | **445** | SMB |
| **68** | DHCP Client | **3389** | RDP |
| **69** | TFTP | **80** | HTTP |

### OSI Layers

| Layer | Name | Keywords |
|-------|------|----------|
| **7** | Application | HTTP, HTTPS, FTP, DNS, SMTP, SSH |
| **6** | Presentation | Encryption, compression, encoding |
| **5** | Session | Start, maintain, close sessions |
| **4** | Transport | TCP, UDP, ports |
| **3** | Network | IP, routing, router |
| **2** | Data Link | MAC, switch, Ethernet |
| **1** | Physical | Bits, cable, hub |

### TCP/IP Layers

| Layer | Protocols |
|-------|-----------|
| **Application** | HTTP, HTTPS, DNS, SSH, FTP |
| **Transport** | TCP, UDP |
| **Internet** | IP, ICMP |
| **Link** | Ethernet, WiFi |

### CIDR and Private Ranges

| CIDR | Subnet Mask | Private Range |
|------|-------------|---------------|
| **/8** | `255.0.0.0` | `10.0.0.0/8` |
| **/16** | `255.255.0.0` | `172.16.0.0/12` |
| **/24** | `255.255.255.0` | `192.168.0.0/16` |
| **/32** | Single host | — |

### TCP vs UDP

| Trait | TCP | UDP |
|-------|-----|-----|
| **Connection** | Yes | No |
| **Reliable / ordered** | Yes | No |
| **Speed** | Slower | Faster |
| **Best for** | Downloads, SSH, HTTPS, banking | Streaming, gaming, DNS, VoIP |

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is the difference between TCP and UDP?** | TCP is reliable and connection-oriented with a three-way handshake and ordered delivery, while UDP is faster and connectionless with no retransmission. |
| **Q2. How many layers does each model have?** | OSI has 7 layers and TCP/IP has 4. Three OSI layers (Application, Presentation, Session) merge into the single TCP/IP Application layer. |
| **Q3. Which layer performs routing, and which device does it?** | Routing happens at Layer 3, the Network layer, and the router forwards packets between networks. |
| **Q4. Which address works at Layer 2 and which at Layer 3?** | The MAC address works at Layer 2 (Data Link) and the IP address works at Layer 3 (Network). |
| **Q5. How many bits are in an IPv4 address and what is the octet range?** | IPv4 uses 32 bits split into 4 octets, each ranging from 0 to 255. |
| **Q6. What does `/24` mean?** | It is CIDR notation for the subnet mask `255.255.255.0`, meaning the first 24 bits identify the network. |
| **Q7. Which protocol uses the three-way handshake, and what are its steps?** | TCP does, using SYN from the client, SYN-ACK from the server, and ACK from the client to establish the connection. |
| **Q8. What is encapsulation and decapsulation?** | Encapsulation adds protocol headers as data moves down the stack; decapsulation removes those headers at the receiving side as data moves back up. |
| **Q9. Why is Telnet insecure and what replaced it?** | Telnet sends everything in plain text on port 23, so it is easy to sniff or hijack; SSH on port 22 replaced it with encryption. |
| **Q10. Why is HTTPS considered secure?** | It uses TLS encryption at the Presentation layer to protect data in transit. |

## Final Takeaway

Networking is a layered story: the **OSI model** explains it in seven conceptual steps, and **TCP/IP** implements it in four practical ones on the real Internet. Data is addressed with **IPv4** (32 bits in four octets), scoped with **CIDR** and private ranges, translated for the Internet by **NAT**, and routed hop by hop at **Layer 3**. At the **Transport layer**, ports direct traffic to the right application while **TCP** trades speed for guaranteed, ordered delivery and **UDP** trades reliability for raw speed. **Encapsulation** and **decapsulation** wrap and unwrap that data as it crosses the stack, and protocols like **Telnet** — now replaced by **SSH** — show why security has to be built into these foundations rather than bolted on later. Master these concepts and every later topic in Linux, web hacking, and defensive security has solid ground to stand on.
