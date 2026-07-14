## Contents

- [What is a Network?](#what-is-a-network)
- [Network Hardware — Every Device's Role](#network-hardware--every-devices-role)
- [IP Addressing — Finding Devices on the Network](#ip-addressing--finding-devices-on-the-network)
- [Ports — Directing Traffic to the Right Service](#ports--directing-traffic-to-the-right-service)
- [Data Packets — How Data Actually Travels](#data-packets--how-data-actually-travels)
- [OSI Model vs. TCP/IP Model](#osi-model-vs-tcpip-model)
- [TCP vs. UDP — When to Use Each](#tcp-vs-udp--when-to-use-each)
- [Cloud Computing & Software-Defined Networks](#cloud-computing--software-defined-networks)

## What is a Network?

> **KEY CONCEPT**
> A network is a group of connected devices that communicate over physical cables or wireless connections to share resources (files, internet access, printers, services).
> Understanding how networks are built is essential for cybersecurity — you can only defend what you understand. Attackers exploit the gaps between devices, and analysts must know where those gaps exist.

| **Network Type** | **Definition & Real-World Context** |
| --- | --- |
| **LAN (Local Area Network)** | Spans a small geographic area: a home, office floor, or single building. Example: The network created on your machine when you spin up a KIND (Kubernetes in Docker) cluster — your local pods communicate over a virtual LAN. Your home Wi-Fi is also a LAN. |
| **WAN (Wide Area Network)** | Spans a large area: a city, country, or the entire globe. The internet IS the largest WAN ever built. Example: When your local dev environment pulls a container image from Docker Hub, your request travels over a WAN (public internet) to reach a remote registry server. |
| **Client** | The device or software that REQUESTS information or services. Example: A user's browser requesting to load a webpage, or your FastAPI app requesting data from a PostgreSQL database. |
| **Server** | The device or software that PROVIDES the requested information or service. Example: Your Node.js/Express backend that processes browser requests, queries the database, and returns the response. |

## Network Hardware — Every Device's Role

> **NOTE: Why This Matters for Security**
> Each hardware device is both a network component AND a potential attack surface.
> Analysts must understand each device's function to know what kinds of attacks target it,
> what logs it generates, and how to configure it securely.

> **Hub**
> **Role:** Legacy device that broadcasts incoming data to EVERY port on the network simultaneously, regardless of intended recipient.
> **Example:** *Like shouting a password in a crowded room — everyone hears everything. Extremely insecure.*
> **Security Note:** Never use in modern networks. Hubs make passive packet sniffing trivial because all traffic reaches all ports. Replaced entirely by switches.

> **Switch**
> **Role:** Intelligent device that uses a MAC Address Table to send data ONLY to the specific intended device. No unnecessary broadcasting.
> **Example:** *Your laptop sends a file to a printer. The switch looks up the printer's MAC address and forwards the packet only to that port.*
> **Security Note:** Dramatically reduces the effectiveness of passive sniffing compared to hubs. However, ARP poisoning attacks can still fool a switch into misdirecting traffic.

> **Router**
> **Role:** Connects MULTIPLE DIFFERENT networks together (e.g., LAN to WAN). Reads IP addresses to determine the best forward path for each packet.
> **Example:** *Your home router connects your internal LAN (192.168.x.x) to the public internet (WAN) via your ISP. Every packet leaving your house passes through it.*
> **Security Note:** Routers are prime targets. Compromised routers can redirect ALL traffic. Always change default credentials and update firmware promptly.

> **Modem**
> **Role:** Bridges your home/office network to the Internet Service Provider (ISP). Converts digital network signals into formats compatible with physical lines (fiber, coaxial, DSL).
> **Example:** *The box from your ISP that physically connects your home to the internet. Usually combined with a router in modern home setups.*
> **Security Note:** Modem firmware vulnerabilities can expose the entire network before traffic even reaches your router. Keep firmware updated.

> **Firewall**
> **Role:** The primary security barrier. Monitors and controls ALL incoming and outgoing traffic based on a predefined set of security rules (allow/block by IP, port, protocol).
> **Example:** *A firewall rule drops ALL external internet traffic EXCEPT HTTP (port 80) and HTTPS (port 443). Internal servers are completely invisible from the internet.*
> **Security Note:** First line of defense but NOT the only one (Defense in Depth). Misconfigured firewalls are one of the most common causes of breaches. Log ALL dropped packets.

> **Wireless Access Point (WAP)**
> **Role:** Bridges wireless devices (laptops, phones) to a wired Ethernet network using Wi-Fi protocols (radio waves, IEEE 802.11 standard).
> **Example:** *The Wi-Fi router in a coffee shop. Your laptop connects wirelessly to the WAP, which is physically cabled to the internet router.*
> **Security Note:** Wireless is inherently less secure than wired. Radio signals travel through walls — attackers don't need physical network access. Always use WPA3 encryption.

## IP Addressing — Finding Devices on the Network

> **MAC ADDRESS vs. IP ADDRESS**
> **TWO TYPES OF DEVICE IDENTIFIERS**

```
  +-------------------------------------------------+  +--------------------------------------------+
  | MAC ADDRESS (Physical / Hardware)               |  | IP ADDRESS (Logical / Software)            | 
  +-------------------------------------------------+  +--------------------------------------------+
  | * Hardcoded into the NIC at manufacturing time  |  | * Assigned by network configuration (DHCP) | 
  | * Permanent -- never changes (usually)          |  | * Can change -- dynamic or static          | 
  | * Only used within the LOCAL network (LAN)      |  | * Used to route across DIFFERENT networks  |  
  | * 48 bits: e.g. 00:1A:2B:3C:4D:5E               |  | * IPv4: 32 bits  e.g. 192.168.1.100        |  
  | * Format: 6 groups of 2 hex digits              |  | * IPv6: 128 bits e.g. 2001:0db8::1         |  
  +-------------------------------------------------+  +--------------------------------------------+

  Analogy: MAC = your name (personal, fixed identity)
           IP = your current home address (can change if you move)
```

| **IP Version** | **Bits** | **Example** | **Why It Matters** |
| --- | --- | --- | --- |
| **IPv4** | 32 bits | 192.168.1.1 | Current dominant standard. 4.3 billion possible addresses — EXHAUSTED. We are running out of IPv4 addresses globally. |
| **IPv6** | 128 bits | 2002:0db8::ff21:0023:1234 | 340 undecillion addresses (3.4 x 10^38). Eliminates address exhaustion. Also eliminates private IP collision issues between networks. Adoption is accelerating. |
| **Public IP** | N/A | 203.0.113.5 (example) | Assigned by your ISP. Visible to the entire internet. Your public-facing web server has a public IP. Attackers can scan public IPs. |
| **Private IP** | N/A | 10.x.x.x / 192.168.x.x | Used only within a LAN. Not routable on the public internet. Your database server should ONLY have a private IP so it cannot be directly attacked from outside. |

## Ports — Directing Traffic to the Right Service

> **TIP: Apartment Building Analogy**
> If an IP address is the apartment BUILDING (finds the server on the internet),
> then a PORT is the specific APARTMENT NUMBER (finds the specific service on that server).
> Example: IP 203.0.113.5:443 means -> go to that server, then talk to the HTTPS service specifically.

| **Port Number** | **Protocol** | **Service** | **Security Note** |
| --- | --- | --- | --- |
| **22** | TCP | SSH (Secure Shell) | Encrypted remote terminal access. Replaces insecure Telnet. Change default port and use key-based auth to reduce brute-force attacks. |
| **25 / 587** | TCP | SMTP (Email Sending) | Port 25 = unencrypted. Port 587 = encrypted (TLS). Always use 587. Open port 25 is heavily exploited for spam relays. |
| **53** | UDP/TCP | DNS (Domain Name System) | Translates hostnames to IPs. DNS attacks (poisoning, hijacking) can redirect all traffic silently. Always monitor DNS logs. |
| **80** | TCP | HTTP (Web, unencrypted) | ALL data transmitted in plaintext. Anyone sniffing the network can read it. Should be redirected to port 443 in 2024+. |
| **110 / 995** | TCP | POP3 (Email Receive) | 110 = unencrypted. 995 = SSL/TLS encrypted. Use 995 only. |
| **143 / 993** | TCP | IMAP (Email Sync) | 143 = unencrypted. 993 = SSL/TLS encrypted. Use 993. IMAP keeps mail on server for multi-device access. |
| **443** | TCP | HTTPS (Web, encrypted) | TLS-encrypted HTTP. Standard for all modern web traffic. Certificate validates server identity. |
| **5432** | TCP | PostgreSQL Database | Default database port. Should NEVER be exposed to the internet. Bind to localhost or private IP only. |
| **67 / 68** | UDP | DHCP (IP Assignment) | 67 = server. 68 = client. Automatically assigns IP addresses to devices joining the network. |

## Data Packets — How Data Actually Travels

> **DATA PACKET — Three-Part Structure**
> **EVERY piece of data on a network is broken into PACKETS before transmission.**

```
  +------------------------------------------------------------------+
  | DATA PACKET STRUCTURE                                            |
  +------------------+--------------------------+--------------------+
  |     HEADER       |         PAYLOAD          |       FOOTER       |
  +------------------+--------------------------+--------------------+
  | Routing info:    | The actual data:         | End marker:        |
  | * Source IP      | * Your email text        | * Signals packet   |
  | * Destination IP | * Part of a file         |   is complete      |
  | * Protocol (TCP) | * Portion of a webpage   | * Error detection  |
  | * TTL countdown  | * Video stream chunk     |   checksum (CRC)   |
  | * Packet size    |                          |                    |
  +------------------+--------------------------+--------------------+

  WHY PACKETS? Large files are broken into thousands of packets.
  Each packet may take a DIFFERENT route to the destination.
  The destination reassembles them in the correct order.
  If a packet is lost, only THAT packet is re-sent -- not the whole file.

  SECURITY RELEVANCE: Analysts examine packet HEADERS to detect:
  * Spoofed source IPs (IP spoofing attacks)
  * Unusual TTL values (traceroute-based reconnaissance)
  * Fragmented packets (evasion of IDS/firewall inspection)
```

### IPv4 Packet Header — Key Fields Analysts Read

| **Header Field** | **Size** | **What it Contains** | **Why Analysts Watch It** |
| --- | --- | --- | --- |
| Source IP Address | 32 bits | The IP address of the device that sent this packet. | In IP spoofing attacks, this field is forged with a fake IP. IDS tools flag packets whose source IP doesn't match known network ranges. |
| Destination IP Address | 32 bits | The IP address of the intended recipient. | Packets destined for unusual internal IPs (like database servers from external sources) flag lateral movement or external intrusion attempts. |
| Protocol | 8 bits | Identifies the protocol in the payload: 6=TCP, 17=UDP, 1=ICMP. | In ICMP flood attacks, protocol field shows '1' at abnormally high packet rates — a clear DoS indicator. |
| TTL (Time to Live) | 8 bits | Decremented by 1 at each router hop. Packet destroyed when it hits 0. | Prevents endless loops. Unusually low TTL values on inbound packets suggest the packet traveled many hops (possibly through a proxy or TOR). Used in OS fingerprinting. |
| Flags / Fragment Offset | 3+13 bits | Controls packet fragmentation: Is this a fragment? Is more coming? Where does it fit? | Attackers use tiny, fragmented packets to slip malicious payloads past IDS rules that inspect only whole packets. NGFWs reassemble fragments before inspecting. |
| Total Length | 16 bits | Total size of the IP packet (header + payload). Max 65,535 bytes. | Oversized or malformed packets trigger alerts. The 'Ping of Death' attack sends packets exceeding the 65,535 byte limit. |

## OSI Model vs. TCP/IP Model

> **NOTE: Why Learn Two Models?**
> OSI is the DETAILED diagnostic model (7 layers). When something breaks, you use OSI to pinpoint exactly which layer has the problem.
> TCP/IP is the PRACTICAL implementation model (4 layers). This is what the actual internet runs on.
> Security tools and attacks are often described using OSI layer numbers (e.g., 'Layer 7 attack' = application layer DDoS).

> **OSI vs. TCP/IP — Side by Side with Attack Examples**
> **OSI MODEL (7 Layers)            TCP/IP MODEL (4 Layers)      WHAT HAPPENS HERE**

```
  +-------------------------+    +------------------------+
  | 7. APPLICATION          |--> |                        |   HTTP, HTTPS, DNS, SSH,
  | 6. PRESENTATION         |--> | 4. APPLICATION         |   SMTP, FTP, TLS/SSL
  | 5. SESSION              |--> |                        |   encryption, formatting
  +-------------------------+    +------------------------+
  |                         |--> | 3. TRANSPORT           |   TCP, UDP
  | 4. TRANSPORT            |    |                        |   Ports, segmentation,
  |                         |    |                        |   flow control
  +-------------------------+    +------------------------+
  | 3. NETWORK              |--> | 2. INTERNET            |   IP addresses, routing,
  |                         |    |                        |   ICMP, packets
  +-------------------------+    +------------------------+
  | 2. DATA LINK            |--> |                        |   MAC addresses, switches,
  | 1. PHYSICAL             |--> | 1. NETWORK ACCESS      |   ARP, Ethernet frames,
  |                         |    |                        |   cables, Wi-Fi radio
  +-------------------------+    +------------------------+

  ATTACK EXAMPLES BY LAYER:
  Layer 1 (Physical): Cutting cables, unauthorized physical access to hardware
  Layer 2 (Data Link): ARP poisoning, MAC flooding attacks
  Layer 3 (Network): IP spoofing, ICMP flood, Ping of Death
  Layer 4 (Transport): SYN flood, port scanning
  Layer 7 (Application): SQL injection, XSS, HTTP DDoS, phishing
```

## TCP vs. UDP — When to Use Each

> **TCP vs. UDP — Detailed Comparison**
> **TCP (Transmission Control Protocol)      UDP (User Datagram Protocol)**

```
  +-------------------------------------+  +-------------------------------------+
  | CONNECTION-ORIENTED                 |  | CONNECTIONLESS                      |
  | THREE-WAY HANDSHAKE required:       |  | No handshake. Just fire and forget: |
  |                                     |  |                                     |
  |  Client          Server             |  |  Sender ----[packet]---> Receiver   |
  |    |---[SYN]------->|               |  |  Sender ----[packet]---> Receiver   |
  |    |<--[SYN-ACK]----|               |  |  Sender ----[packet]---> (lost?)    |
  |    |---[ACK]------->|               |  |  Sender does NOT check              |
  |    |====DATA=======>|               |  |                                     |
  |    |<====DATA=======|               |  |                                     |
  +-------------------------------------+  +-------------------------------------+
  GUARANTEES:                              NO GUARANTEES:
  * Delivery confirmation                  * No delivery confirmation
  * Correct packet ordering                * No ordering guarantee
  * Lost packets re-sent                   * Lost packets are GONE
  * Slower (overhead)                      * FAST (minimal overhead)

  
USE TCP FOR:                             USE UDP FOR:
  * Database queries (no data loss)        * Live video/audio streaming
  * File transfers                         * Online gaming
  * Web pages (HTTP/HTTPS)                 * DNS lookups
  * Email sending/receiving                * Real-time metrics/telemetry

  SECURITY NOTE: TCP's SYN handshake is exploited by SYN Flood attacks.
  Attackers send millions of SYN packets but never complete the handshake,
  exhausting the server's connection table and blocking legitimate users.
```

## Cloud Computing & Software-Defined Networks

| **Service Model** | **What You Get** | **What Provider Manages** | **Example Use Case** |
| --- | --- | --- | --- |
| **IaaS (Infrastructure as a Service)** | Raw virtual machines, storage, and networking. You manage everything above the hypervisor. | Physical data centers, hypervisors, hardware. | Provisioning bare VMs on AWS EC2 or Google Compute Engine to host your own Kubernetes cluster. |
| **PaaS (Platform as a Service)** | A managed development and deployment environment. You manage your app and data only. | OS, runtime, middleware, hardware, scaling. | Google App Engine, Heroku. Deploy your code -- platform handles servers, OS patches, scaling automatically. |
| **SaaS (Software as a Service)** | Fully hosted end-user applications. You manage nothing technical. | Everything: hardware, OS, app, security patches. | Gmail, Salesforce, Google Workspace. Users just log in and use it. |
| **SDN (Software-Defined Networking)** | Network routing controlled by software instead of physical cables and routers. | Dynamic virtual routing rules programmed via API. | Inside Kubernetes, Calico/Flannel act as SDNs -- pods on different physical nodes communicate via virtual software-defined routes. No physical cables needed. |

> **NOTE: SDN Security Impact**
> Traditional networks: changing routing required physical reconfiguration of hardware.
> SDN: routing rules are just software -- they can be changed instantly via API.
> Security benefit: Isolate a compromised container/pod in milliseconds by changing routing rules -- no physical intervention needed.
> Security risk: The SDN controller itself becomes a high-value target. Compromise the controller and you control all traffic routing.

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| **What is the difference between LAN and WAN?** | LAN = Local Area Network (home, office, building). WAN = Wide Area Network (city, country, globe). The internet is the largest WAN. |
| **What is the difference between a hub and a switch?** | Hub: broadcasts data to ALL ports -- insecure, replaced. Switch: uses MAC address table to send data ONLY to the specific intended device. |
| **What is the difference between MAC address and IP address?** | MAC = permanent physical hardware ID (for local delivery within LAN). IP = logical network address (for routing across different networks). MAC never changes; IP can. |
| **Why do packets have a TTL field?** | Time to Live: decremented by 1 at each router hop. Packet destroyed at 0. Prevents malformed packets from looping endlessly and crashing network infrastructure. |
| **Name all 7 OSI layers in order.** | 1-Physical (cables), 2-Data Link (MAC/switches), 3-Network (IP/routing), 4-Transport (TCP/UDP), 5-Session (connections), 6-Presentation (encryption/formatting), 7-Application (HTTP/DNS/SSH). |
| **What are the 4 TCP/IP layers?** | 1-Network Access (hardware, MAC, ARP), 2-Internet (IP, ICMP, routing), 3-Transport (TCP, UDP), 4-Application (HTTP, DNS, SSH, SMTP). |
| **TCP vs. UDP -- key difference?** | TCP: connection-oriented, 3-way handshake, guarantees delivery, slower. UDP: connectionless, no guarantee, very fast. Use TCP for reliability (databases), UDP for speed (streaming, gaming). |
| **What ports must you memorize?** | 22=SSH, 25/587=SMTP, 53=DNS, 80=HTTP, 110/995=POP3, 143/993=IMAP, 443=HTTPS, 67/68=DHCP. |
