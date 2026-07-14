**GOOGLE CYBERSECURITY CERTIFICATE**

**Course 3**

**Connect and Protect:**

**Networks and Network Security**

Study Notes | Modules 1 – 4

Deep Understanding Edition | ASCII Diagrams & Real-World Examples

| **Module** | **Title** | **Topics Covered** |
| --- | --- | --- |
| **Module 1** | **Network Architecture Foundations** | LAN/WAN · Hardware · IP/MAC · OSI & TCP/IP · IPv4 Packets · SDN |
| **Module 2** | **Network Operations, Protocols & Tools** | All Protocols & Ports · Wi-Fi Security · Firewalls · Proxies · VPNs |
| **Module 3** | **Attack Tactics & Intrusion Methods** | DoS/DDoS · Packet Sniffing · IP Spoofing · tcpdump · Incident Reports |
| **Module 4** | **Security Hardening & Defense** | OS Hardening · Patch Mgmt · Brute Force · IDS/IPS · Cloud Security |

**MODULE 1**

# Network Architecture Foundations

## 1.1 What is a Network?

> **KEY CONCEPT**
> A network is a group of connected devices that communicate over physical cables or wireless connections to share resources (files, internet access, printers, services).
> Understanding how networks are built is essential for cybersecurity — you can only defend what you understand. Attackers exploit the gaps between devices, and analysts must know where those gaps exist.

| **Network Type** | **Definition & Real-World Context** |
| --- | --- |
| **LAN (Local Area Network)** | Spans a small geographic area: a home, office floor, or single building. Example: The network created on your machine when you spin up a KIND (Kubernetes in Docker) cluster — your local pods communicate over a virtual LAN. Your home Wi-Fi is also a LAN. |
| **WAN (Wide Area Network)** | Spans a large area: a city, country, or the entire globe. The internet IS the largest WAN ever built. Example: When your local dev environment pulls a container image from Docker Hub, your request travels over a WAN (public internet) to reach a remote registry server. |
| **Client** | The device or software that REQUESTS information or services. Example: A user's browser requesting to load a webpage, or your FastAPI app requesting data from a PostgreSQL database. |
| **Server** | The device or software that PROVIDES the requested information or service. Example: Your Node.js/Express backend that processes browser requests, queries the database, and returns the response. |

## 1.2 Network Hardware — Every Device's Role

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

## 1.3 IP Addressing — Finding Devices on the Network

> **MAC ADDRESS vs. IP ADDRESS**  
> **TWO TYPES OF DEVICE IDENTIFIERS**

```
  +-------------------------------------------------+  +-------------------------------------------
  | MAC ADDRESS (Physical / Hardware)               |  | IP ADDRESS (Logical / Software)             
  +-------------------------------------------------+  +-------------------------------------------
  | * Hardcoded into the NIC at manufacturing time  |  | * Assigned by network configuration (DHCP)  
  | * Permanent -- never changes (usually)          |  | * Can change -- dynamic or static            
  | * Only used within the LOCAL network (LAN)      |  | * Used to route across DIFFERENT networks    
  | * 48 bits: e.g. 00:1A:2B:3C:4D:5E               |  | * IPv4: 32 bits  e.g. 192.168.1.100          
  | * Format: 6 groups of 2 hex digits              |  | * IPv6: 128 bits e.g. 2001:0db8::1           
  +-------------------------------------------------+  +-------------------------------------------

  Analogy: MAC = your name (personal, fixed identity)
           IP = your current home address (can change if you move)
```

| **IP Version** | **Bits** | **Example** | **Why It Matters** |
| --- | --- | --- | --- |
| **IPv4** | 32 bits | 192.168.1.1 | Current dominant standard. 4.3 billion possible addresses — EXHAUSTED. We are running out of IPv4 addresses globally. |
| **IPv6** | 128 bits | 2002:0db8::ff21:0023:1234 | 340 undecillion addresses (3.4 x 10^38). Eliminates address exhaustion. Also eliminates private IP collision issues between networks. Adoption is accelerating. |
| **Public IP** | N/A | 203.0.113.5 (example) | Assigned by your ISP. Visible to the entire internet. Your public-facing web server has a public IP. Attackers can scan public IPs. |
| **Private IP** | N/A | 10.x.x.x / 192.168.x.x | Used only within a LAN. Not routable on the public internet. Your database server should ONLY have a private IP so it cannot be directly attacked from outside. |

## 1.4 Ports — Directing Traffic to the Right Service

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

## 1.5 Data Packets — How Data Actually Travels

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

## 1.6 OSI Model vs. TCP/IP Model

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

## 1.7  TCP vs. UDP — When to Use Each

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

## 1.8 Cloud Computing & Software-Defined Networks

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

**MODULE 2**

# Network Operations, Protocols & Security Tools

## 2.1 The Network Security Engineer Workflow

> **KEY CONCEPT**
> A network security engineer's job is to protect infrastructure by solving complex diagnostic puzzles. When something goes wrong, they follow a systematic process rather than guessing.

> **NETWORK SECURITY DIAGNOSTIC WORKFLOW**

```
  +------------------------------------------------------------------+
  |          DIAGNOSTIC WORKFLOW — STEP BY STEP                      |
  +------------------------------------------------------------------+
  |                                                                  |
  |  STEP 1: IDENTIFY SYMPTOM                                        |
  |  Notice anomalies: endpoint flooded with requests, service slow  |
  |  Collect initial reports from users and monitoring systems       |
  |                         |                                        |
  |                         v                                        |
  |  STEP 2: TRAFFIC CAPTURE                                         |
  |  Connect to affected endpoint, run tcpdump or Wireshark          |
  |  Capture and examine EXACTLY what traffic is entering/leaving    |
  |                         |                                        |
  |                         v                                        |
  |  STEP 3: LAB RECREATION                                          |
  |  Build a controlled, isolated environment to reproduce the issue |
  |  Safe to test without risking production systems                 |
  |                         |                                        |
  |                         v                                        |
  |  STEP 4: CONSULT EXPERTS                                         |
  |  Cross-team collaboration. Often the solution emerges simply by  |
  |  explaining the problem to someone from a different domain.      |
  +------------------------------------------------------------------+

  GOLDEN RULE: Never write your own encryption. Use tested protocols
  like TLS and SSH. Custom crypto is almost always broken by experts.
```

## 2.2 All Network Protocols — Complete Reference

### A. Communication Protocols

| **Protocol** | **Full Name** | **Port** | **Type** | **Key Detail & Security Note** |
| --- | --- | --- | --- | --- |
| **TCP** | Transmission Control Protocol | N/A | Transport | Connection-oriented. Three-way handshake guarantees delivery. Used for all data where loss is unacceptable (databases, web pages, email). Exploited by SYN flood attacks. |
| **UDP** | User Datagram Protocol | N/A | Transport | Connectionless. No delivery guarantee. Extremely fast. Used for streaming, gaming, DNS. Exploited by UDP flood DDoS attacks. |
| **HTTP** | Hypertext Transfer Protocol | 80 | Application | Plain-text web communication. ALL content readable by anyone sniffing the network. Should be upgraded to HTTPS everywhere. Never use for sensitive data. |
| **HTTPS** | HTTP Secure | 443 | Application | HTTP encrypted with TLS. The standard for all modern web traffic. TLS certificate authenticates the server's identity. Always verify certificate validity. |
| **DNS** | Domain Name System | 53 | Application | Translates domain names to IP addresses. 'Phone book of the internet.' DNS traffic is often unencrypted -- attackers can poison DNS to redirect users to malicious sites. |
| **ARP** | Address Resolution Protocol | N/A | Network | Maps IP addresses to MAC addresses on a local network. Has NO authentication -- ARP poisoning attacks can redirect all LAN traffic through an attacker's machine. |

### B. Management Protocols

| **Protocol** | **Full Name** | **Port** | **Key Function** | **Security Note** |
| --- | --- | --- | --- | --- |
| **DHCP** | Dynamic Host Configuration Protocol | 67/68 UDP | Automatically assigns IP, gateway, and DNS server to new devices joining the network. | DHCP starvation attacks exhaust the IP pool. Rogue DHCP servers can assign attacker-controlled DNS, redirecting all traffic silently. |
| **ICMP** | Internet Control Message Protocol | N/A | Error reporting and network diagnostics. Powers the 'ping' command to test connectivity. | Used in ICMP flood and Ping of Death DoS attacks. Many organizations rate-limit or filter ICMP from external sources. |
| **SNMP** | Simple Network Management Protocol | 161/162 | Remotely monitor and configure network devices (routers, switches, printers). | SNMPv1/v2 transmit community strings (passwords) in plaintext. Always use SNMPv3 with encryption and strong authentication. |

### C. Security Protocols

| **Protocol** | **Port** | **How It Secures** | **Replaces / Upgrade From** |
| --- | --- | --- | --- |
| **SSH (Secure Shell)** | 22 | Creates a fully encrypted terminal session with a remote machine. Also used to tunnel other protocols securely. | Replaces Telnet (port 23) which sent all commands including passwords in plaintext. Always use key-based auth over password auth. |
| **SFTP (Secure FTP)** | 22 | Securely transfers files over a network using SSH as the underlying encryption channel. | Replaces FTP (ports 20/21) which transmitted file contents and credentials in plaintext. Never use plain FTP. |

| **TLS/HTTPS** | 443 | Encrypts the entire HTTP session using asymmetric key exchange + symmetric encryption. Certificate validates server identity. | Replaces HTTP (port 80). Also replaces SSL (predecessor to TLS). TLS 1.3 is the current secure standard; TLS 1.0/1.1 are deprecated. |
| --- | --- | --- | --- |

### D. Email Protocols

| **Protocol** | **Unencrypted Port** | **Encrypted Port** | **Function** | **Key Difference** |
| --- | --- | --- | --- | --- |
| **POP3** | 110 | 995 (SSL/TLS) | Downloads email from server to local device. Usually DELETES from server after download. | Single-device access. Email only on the device that downloaded it. Old-fashioned but still used. |
| **IMAP** | 143 | 993 (SSL/TLS) | Downloads email HEADERS, keeps full messages on server. Syncs across multiple devices. | Multi-device sync (phone + laptop both see same inbox). Modern standard for personal email. |
| **SMTP** | 25 | 587 (STARTTLS) | Routes and transmits OUTGOING email between servers and from clients to servers. | Port 25 is server-to-server (often blocked by ISPs). Port 587 is for client-to-server sending with authentication. |

> **IMPORTANT**
> ALWAYS use the encrypted port versions (995, 993, 587).
> Using unencrypted email protocols means your username, password, and every email you send or receive
> travels across the network in plaintext -- readable by anyone on the same network segment.

## 2.3 Wi-Fi Security Protocols — Evolution of Wireless Security

> **NOTE**
> Wireless data travels through the air as radio waves. Unlike wired networks, ANY device within range can receive the signal.
> Without strong encryption, every nearby device can passively read all your wireless traffic.
> This is why Wi-Fi security protocols have evolved rapidly -- each generation fixed critical flaws in the previous one.

| **Standard** | **Year** | **Encryption** | **Vulnerability** | **Verdict** |
| --- | --- | --- | --- | --- |
| **WEP** | 1999 | RC4 (40-bit) | Fundamentally broken. Keys can be cracked in minutes with freely available tools. Static, easily guessable IVs. | OBSOLETE. Never use. Any network still using WEP is completely insecure. |
| **WPA** | 2003 | TKIP (128-bit) | Vulnerable to KRACK (Key Reinstallation Attack) -- attacker can force the network to use an empty encryption key, exposing all traffic. | WEAK. Avoid. Only use if WPA2 is unavailable (very old hardware). |
| **WPA2** | 2004 | AES-CCMP (128-bit) | Still vulnerable to KRACK. Dictionary attacks on weak passphrases. PMKID attack allows offline cracking of captured 4-way handshake. | ACCEPTABLE. Current dominant standard. Use strong, random passphrase (20+ chars). Enterprise mode is far more secure than Personal. |
| **WPA3** | 2018 | SAE + AES (128/192-bit) | No known practical attacks. Theoretical side-channel attacks require physical proximity and specialized equipment. | BEST. Use wherever hardware supports it. SAE eliminates KRACK vulnerability entirely. Forward secrecy: past traffic safe even if key later compromised. |

> **EXAMPLE: WPA2 Personal vs. Enterprise**
> PERSONAL MODE: One shared passphrase for all devices. If one device is compromised or an ex-employee knows the password, ALL traffic from ALL devices can be decrypted. Home use only.
> ENTERPRISE MODE: Each user/device gets their own unique credentials via a RADIUS authentication server. Compromising one person's credentials only exposes their own traffic. Required for corporate environments.

## 2.4 Network Segmentation, Subnetting & Security Zones

> **KEY CONCEPT**
> Network segmentation divides a large flat network into smaller, isolated zones.
> Purpose: If an attacker compromises ONE segment (e.g., a guest Wi-Fi laptop), they CANNOT freely move to other segments (e.g., the finance database).
> This is the network-level implementation of Defense in Depth.

> **SUBNETTING & SECURITY ZONES — Network Architecture**  
> **SUBNETTING: Dividing a large IP range into smaller sub-networks**  
> **Full network: 192.168.0.0/16  (65,534 hosts -- too large to manage)**  
> **After subnetting:**

```
  +----------------------+  +----------------------+  +----------------------+
  | 192.168.1.0/24       |  | 192.168.2.0/24       |  | 192.168.3.0/24       |
  | Engineering subnet   |  | HR subnet            |  | Finance subnet       |
  | 254 host addresses   |  | 254 host addresses   |  | 254 host addresses   |
  +----------------------+  +----------------------+  +----------------------+
  CIDR notation: /24 means 24 bits are the network portion, 8 bits for hosts.
  /24 = 256 addresses (254 usable), /16 = 65536 addresses, /32 = single host.

  SECURITY ZONES (from outermost to innermost, most to least trusted):

  INTERNET (Uncontrolled Zone)
  |   Public. Attackers live here. Zero trust.
  |
  +-- FIREWALL (perimeter)
  |   DMZ (Demilitarized Zone / Controlled Zone - outer)
  |   +-- Web servers, load balancers, public APIs
  |   +-- MUST touch the internet. Treated as semi-trusted.
  |
  +-- INTERNAL FIREWALL
  |   INTERNAL NETWORK (Controlled Zone - inner)
  |   +-- Private app servers, internal tools, employee systems
  |   +-- No direct internet access. Accessed via DMZ or VPN.
  |
  +-- RESTRICTED ZONE
      +-- Databases with PII, HR records, financial data
      +-- Only privileged admins can access. Heavily audited.
```

## 2.5 Firewalls — Deep Dive

| **Firewall Type** | **How It Filters** | **Pros** | **Cons** | **Best Use Case** |
| --- | --- | --- | --- | --- |
| **Stateless** | Inspects each packet independently using fixed rules (IP, port, protocol). No memory of past packets. | Simple, fast, low overhead. | Cannot detect attacks spread across multiple packets. Requires rules in BOTH directions (inbound AND outbound reply). | High-throughput edge filtering where speed is critical and traffic patterns are simple. |
| **Stateful** | Tracks the 'state' of active connections (SYN/SYN-ACK/ACK handshake table). Only allows reply traffic for established connections. | Smarter -- prevents many spoofed packets. Only needs inbound rule; reply traffic automatically allowed. | More resource-intensive than stateless. | Standard for most corporate firewalls. Far more secure than stateless. |
| **NGFW (Next-Gen)** | Deep Packet Inspection (DPI) -- reads INSIDE the payload, not just headers. Application-aware filtering. Integrated IPS. | Can block specific applications (block Tor, allow only HTTP). Detects malware signatures in payloads. | High cost, high CPU usage, requires expert configuration. | Enterprise perimeter defense where sophisticated threats and application-level control are required. |
| **Cloud/FWaaS** | Hosted and maintained by vendor. Filters traffic before it reaches on-premises network. | No hardware to maintain. Scales automatically. Always updated with latest threat signatures. | Data leaves premises. Ongoing subscription cost. | Cloud-heavy organizations, remote workforces, and organizations without dedicated security hardware teams. |

## 2.6 Proxy Servers — The Middleman

> **FORWARD PROXY vs. REVERSE PROXY with NAT**  
> **FORWARD PROXY                         REVERSE PROXY**  
> **(Controls outbound / internal users) (Controls inbound / protects servers)**  
> **Internal -> Forward -> Internet       Internet -> Reverse -> Internal**  
> **User          Proxy                              Proxy        App Server**  
> **(NGINX)**  
> **Use case: Block employees from       Use case: Hides real server IPs.**  
> **visiting malware sites. Filter        Terminates TLS. Load balances.**  
> **content. Log all web requests.        Prevents direct attacks on backend.**  
> **NAT (Network Address Translation) -- used by ALL proxy types:**

```
  +----------------------------------------------------------+
  | Private IP (10.0.0.5) sends request                      |
  | NAT replaces source IP with public IP (203.0.113.1)      |
  | Internet sees only the public IP -- private IP is hidden |
  | Reply comes back to public IP, NAT routes to 10.0.0.5    |
  +----------------------------------------------------------+
  Result: Internal IP addresses are NEVER visible to the internet.
```

| **Proxy Type** | **Direction** | **What It Protects** | **Real Example** |
| --- | --- | --- | --- |
| **Forward Proxy** | Internal -> External | Controls and logs outbound internet access from internal users. | Corporate proxy blocking access to social media and known malware domains during work hours. All web requests logged for compliance. |
| **Reverse Proxy** | External -> Internal | Shields internal servers from direct exposure to the internet. | NGINX receiving HTTPS traffic on port 443, terminating TLS, and forwarding plain HTTP to a hidden FastAPI backend on localhost:8000. |
| **Email Proxy** | Both directions | Filters inbound spam, blocks outbound data exfiltration, verifies sender authenticity. | Microsoft Exchange Online Protection scanning all inbound email for phishing links, malware attachments, and spoofed sender addresses. |

## 2.7 VPNs & Encapsulation

> **KEY CONCEPT: What a VPN Does**
> A VPN creates an encrypted tunnel over a public (untrusted) network.
> It hides your real IP address, encrypts all data in transit, and makes your traffic appear to originate from the VPN server's IP.
> Essential for: remote workers accessing corporate resources, protecting traffic on public Wi-Fi, connecting geographically separated offices.

> **VPN ENCAPSULATION — How the Tunnel Works**  
> **HOW VPN ENCAPSULATION WORKS:**  
> **Without VPN (DANGEROUS on public Wi-Fi):**

```
  [Your Device] ---->[PLAINTEXT DATA] ----> [Internet] -----> [Destination]
                  ^--- anyone on same Wi-Fi can READ this

  With VPN (SECURE):
  [Your Device]
      |
      | Step 1: Original packet encrypted with VPN key
      |
      | Step 2: Encrypted packet WRAPPED inside new outer packet
      |        (Encapsulation -- the outer packet has normal routing headers)
      |
      v
  [Encrypted Outer Packet: From=MyIP, To=VPNServer] -----> [VPN Server]
      |                                                           |
      |   Anyone intercepting sees ONLY garbled ciphertext        |
      |                                                           |
      v                                                           |
  [VPN Server decrypts outer packet, reveals inner packet] <------+
      |
      v
  [VPN Server forwards inner packet to destination]
  [Reply comes back to VPN Server, re-encrypted, sent to you]

  Result: To the attacker, your data is 100% unreadable.
  To the destination, your traffic appears to come from the VPN server's IP.
```

| **VPN Type** | **Who Uses It** | **How It Works** | **Common Protocol** |
| --- | --- | --- | --- |
| **Remote Access VPN** | Individual employees working remotely. | Single device connects to corporate VPN server. Traffic is encrypted between device and server, then flows normally on corporate network. | IPSec or WireGuard. Client software installed on laptop/phone. |
| **Site-to-Site VPN** | Connecting two geographically separate offices. | Entire networks are connected together. New York office and London office communicate as if on the same LAN. Users don't need individual VPN clients. | IPSec. SD-WAN is increasingly used as a managed alternative. |

| **VPN Protocol** | **Comparison** |
| --- | --- |
| **IPSec** | The traditional industry standard. Highly battle-tested and natively supported by virtually all operating systems and routers. Works in two modes: Transport Mode (encrypts payload only) and Tunnel Mode (encrypts entire packet). Slightly complex to configure. Slower than WireGuard. |
| **WireGuard** | The modern open-source alternative. Minimal codebase (~4,000 lines vs IPSec's ~400,000) -- dramatically fewer potential vulnerabilities. Faster handshakes, faster throughput. Easier to configure and audit. Increasingly adopted as the preferred standard for new deployments. |

**MODULE 3**

# Attack Tactics, Intrusion Methods & Incident Response

## 3.1 The Threat Landscape — Why Networks Are Attacked

| **Attack Motivation** | **What Attackers Want** | **Real Example** |
| --- | --- | --- |
| **Financial Gain** | Steal payment data, deploy ransomware for payment, sell stolen PII on dark web. | 2014 Home Depot breach: Malware compromised 56 million credit/debit card records. Cards sold on underground forums for $5-$50 each. |
| **Corporate Espionage** | Steal trade secrets, R&D data, client lists, or competitive intelligence. | Chinese state-sponsored hackers (APT10) stole intellectual property from aerospace, pharmaceutical, and technology companies across 45+ countries. |
| **Political Disruption** | Disrupt government services, deface websites, leak classified information, influence elections. | 2016 US election: Russian APTs breached Democratic National Committee, exfiltrating emails later used for political disruption. |
| **Public Safety Attacks** | Compromise critical infrastructure -- power grids, water treatment, hospitals. | 2021 Florida water treatment plant: Attacker remotely increased sodium hydroxide levels to dangerous concentrations via exposed industrial control system. |

> **KEY CONCEPT: The 3Cs Framework — Incident Response Mindset**
> When an attack is active, panic is natural and dangerous. DFIR professionals use the 3Cs:
> 
> **1. COMMAND:**        Someone must be affirmatively in charge. No leaderless response.
> **2. CONTROL:**        The leader aligns the entire team to focus ONLY on the mission.
> **3. COMMUNICATIONS:** The most critical pillar. Responders MUST communicate findings
> and proposed actions to command BEFORE executing them.
> Unauthorized actions during active incidents destroy evidence.

## 3.2 Denial of Service (DoS) Attacks — Complete Breakdown

> **NOTE**
> **DoS goal:** Make a network resource so overwhelmed it cannot serve legitimate users.
> **Attacker wins** **if:** server crashes, bandwidth saturated, connection table exhausted, or service is too slow to be usable.
> DDoS (Distributed): same attack but from thousands of compromised machines simultaneously -- much harder to block because traffic comes from legitimate-looking IPs worldwide.

> **DoS vs. DDoS vs. Botnet**  
> **DoS vs. DDoS:**  
> **DoS (Single Source):        DDoS (Distributed -- via Botnet):**

```
  +----------+                +-------+  +-------+  +-------+
  | Attacker |---[FLOOD]-->   | Bot 1 |  | Bot 2 |  | Bot N |
  +----------+   [Target]     +---+---+  +---+---+  +---+---+
                                  |          |          |
  Easy to block:                  +----+-----+-----+----+
  Just block that one IP               |
                                  [MASSIVE FLOOD]
                                       v
  MUCH harder to block:            [TARGET SERVER]
  Traffic comes from               Goes offline
  thousands of real IPs

  BOTNET: A network of malware-infected computers ('zombies') secretly controlled
  by a single attacker ('bot-herder') via a Command & Control (C2) server.
  Botnet owners rent access to other criminals -- 10,000 bots available for $50/hr.
```

### 3.2.1  SYN Flood Attack — Exploiting TCP Handshake

> **SYN FLOOD ATTACK — How It Exhausts Server Resources**  
> **NORMAL TCP HANDSHAKE (3 steps):      SYN FLOOD ATTACK:**  
> **Attacker sends millions of SYN packets**  
> **Client          Server                 but NEVER sends the final ACK.**

```
    |---[SYN]------->|                   Server allocates memory for each half-open
    |<--[SYN-ACK]----|   Server reserves  connection, waiting for an ACK that
    |---[ACK]------->|   port & memory    never arrives.
    |===CONNECTION===|                    Memory fills. Port table exhausts.
                                         Legitimate users get 'Connection refused'.

  DEFENCE:                               CASE STUDY:
  * SYN cookies (server-side)            2016 GitHub DDoS: 1.35 Tbps SYN flood.
  * Rate-limit SYN packets from same IP   Largest recorded DDoS at the time.
  * IPS with half-open connection limits
```

### 3.2.2 ICMP Flood & Ping of Death

> **ICMP Flood (Ping Flood)**
> **How it works:** Attacker sends an overwhelming volume of ICMP echo request packets (like rapid-fire pings) at the target. Server is forced to process and reply to EVERY one, consuming 100% of both inbound and outbound bandwidth.
> **Impact:** Target server's bandwidth and CPU are completely consumed. Legitimate network traffic cannot get through. Services appear offline to users.
> **Defence:** Rate-limit ICMP requests at the firewall. Block ICMP echo requests from external/unknown sources. IPS with ICMP flood detection thresholds.

> **Ping of Death**
> **How it works:** Attacker sends an ICMP packet that is intentionally crafted to EXCEED the maximum legal IP packet size of 65,535 bytes. The oversized packet is fragmented during transmission and reassembled at the target.
> **Impact:** When the target reassembles the oversized packet, the system's buffer overflows. Causes system crashes, freezes, or reboots -- a complete denial of service.
> **Defence:** Modern OS kernels patch this vulnerability. Keep all systems patched. IPS rules detect packets with suspicious fragmentation/offset values indicating reassembly into oversized packets.

## 3.3 Packet Sniffing — Intercepting Network Traffic

> **NOTE**
> Packet sniffing is the practice of capturing and inspecting data packets as they travel across a network.
> LEGITIMATE USE: Network troubleshooting, performance analysis, security monitoring (tcpdump, Wireshark).
> MALICIOUS USE: Stealing credentials, reading private communications, intercepting sensitive data.

> **PASSIVE vs. ACTIVE PACKET SNIFFING**  
> **HOW NICs WORK (Normal):           HOW ATTACKERS EXPLOIT IT:**  
> **Network segment carries ALL        Attacker sets NIC to PROMISCUOUS MODE.**  
> **traffic, but NIC only passes       In this mode, NIC accepts ALL packets**  
> **packets addressed to IT to         on the segment -- not just those addressed**  
> **the OS. Other packets dropped.     to it. Every conversation is visible.**  
> **PASSIVE SNIFFING:                  ACTIVE SNIFFING:**

```
  +----------------------------+     +----------------------------+
  | Attacker connects to HUB   |     | Attacker injects forged    |
  | (or uses promiscuous mode) |     | ARP replies to redirect    |
  | Silently reads ALL traffic |     | traffic through their NIC  |
  | Does NOT alter packets     |     | Can MODIFY packet contents |
  | Like reading someone's     |     | Like rewriting a letter    |
  | mail without unsealing it  |     | before re-sealing it       |
  +----------------------------+     +----------------------------+

  DEFENCE against both types:
  * TLS/HTTPS: Even sniffed packets are encrypted ciphertext -- unreadable.
  * VPN: All traffic encrypted end-to-end through the tunnel.
  * Avoid public Wi-Fi for sensitive work without a VPN.
  * Use switches (not hubs) -- limits traffic to intended ports.
```

## 3.4 IP Spoofing & Advanced Network Attacks

> **NOTE: IP Spoofing Explained**
> Attackers manually craft a packet and sets the SOURCE IP ADDRESS field to a FAKE IP -- usually an IP that is trusted by the target.
> Purpose: Bypass firewall rules (which may whitelist certain IPs), impersonate authorized systems, or anonymize the attack source.
> Limitation: The attacker cannot receive reply to traffic (replies go to the real owner of the spoofed IP). Used mainly for one-way floods or blind attacks.

> **On-Path Attack (Meddler-in-the-Middle / MitM)**
> **How it works:** Attacker positions themselves between two communicating parties (client and server) by ARP poisoning or DNS hijacking. All traffic flows THROUGH the attacker, who can read and modify it in real-time.
> **Impact:** Complete interception of all communication. Attackers can steal session tokens, credentials, modify transactions in real-time (change bank transfer amounts), or inject malicious content into responses.
> **Defence:** Use TLS everywhere (HTTPS) -- MitM attacker cannot decrypt properly encrypted traffic without triggering certificate errors. HSTS (HTTP Strict Transport Security) prevents SSL stripping. Use DNSSEC to protect against DNS hijacking.

> **Replay Attack**
> **How it works:** Attacker captures a legitimate authentication packet (e.g., a login token, session cookie, or Kerberos ticket) and retransmits it later to authenticate as the original user without knowing the password.
> **Impact:** Attacker gains unauthorized access to systems using the victim's captured valid credentials. It is particularly dangerous for time-sensitive authentication systems.
> **Defence:** Use timestamps and nonces (one-time random values) in authentication tokens so captured tokens expire within seconds. HTTPS prevents capture in the first place. Session tokens should have very short lifetimes.

> **Smurf Attack**
> **How it works:** Combines IP spoofing + ICMP flood. Attacker spoofs the victim's IP address, then broadcasts an ICMP ping to the ENTIRE network. Every single device on the network automatically replies -- all replies flood the victim simultaneously.
> **Impact:** The victim's bandwidth is overwhelmed by the amplified flood of ICMP replies from all network devices. Amplification factor = number of devices on network. A network with 1,000 devices amplifies the attack 1,000x.
> **Defence:** Disable IP-directed broadcasts on all routers (blocks broadcast pings). Rate-limit ICMP replies. Modern routers and ISPs filter this by default. Ingress filtering on routers prevents spoofed source IPs from passing.

## 3.5  Network Analysis Tools

> **NOTE**
> Network protocol analyzers (packet sniffers used LEGITIMATELY) are essential analyst tools.
> They help establish traffic BASELINES (what does normal look like?), troubleshoot connectivity issues, detect malicious anomalies, and gather forensic evidence during incident response.

### tcpdump — Command-Line Packet Analyzer

> **tcpdump — Reading Live Packet Data**  
> **tcpdump: Lightweight, command-line packet analyzer built into Linux/macOS.**  
> **Captures live network traffic and prints packet details to terminal.**  
> **SAMPLE OUTPUT:**  
> **10:32:15.123456 IP 203.0.113.5.54321 > 10.0.0.50.80: Flags [S], seq 0**  
> **|              |  |                    |            |  |              |**  
> **Timestamp       Protocol Source IP.Port  Dest IP.Port  TCP Flag  Sequence#**  
> **FLAGS TO KNOW:**  
> **[S]  = SYN  (initiating connection -- thousands per second = SYN flood)**  
> **[.]  = ACK  (acknowledgment)**  
> **[P]  = PSH  (push data to app immediately)**  
> **[F]  = FIN  (closing connection cleanly)**  
> **[R]  = RST  (abrupt connection reset -- often indicates errors or scans)**  
> **[S.] = SYN-ACK (server response to SYN)**  
> **COMMON ANALYST COMMANDS:**  
> **tcpdump -i eth0              # Capture on interface eth0**  
> **tcpdump port 80              # Only HTTP traffic**  
> **tcpdump -n host 10.0.0.5     # Traffic to/from specific IP**  
> **tcpdump -w capture.pcap      # Save to file for Wireshark analysis**  
> **tcpdump -r capture.pcap      # Read saved capture file**

```

```

### Writing a Cybersecurity Incident Report

> **EXAMPLE: Real Scenario: Website Timeout Reported by Users**
> Step 1 (Users Report): Multiple users report the company website is timing out.
> Step 2 (Run tcpdump): Analyst runs: tcpdump -n udp port 53
> Step 3 (Observe Output): Output shows:
> 10:45:23 IP 10.0.0.10.50123 > 8.8.8.8.53: UDP, DNS query for 'company.com'
> 10:45:23 IP 8.8.8.8 > 10.0.0.10: ICMP 'udp port 53 unreachable'
> Step 4 (Analysis): Outbound DNS queries (port 53) are receiving 'unreachable' errors.
> DNS resolution is failing. Websites rely on DNS to find server IPs.
> Without DNS, browsers cannot load any websites.
> Step 5 (Root Cause): Either internal DNS server is down (DoS attack or misconfiguration)
> OR firewall rule change accidentally blocked outbound UDP port 53.
> Step 6 (Report): Document timestamp, affected systems, tcpdump evidence, root cause
> hypothesis, and escalate to network engineers with captured file.

## 3.6 Module 3 Quick-Reference Glossary

| **Term** | **Definition** |
| --- | --- |
| **DoS Attack** | Denial of Service. Floods a target with traffic to make it unavailable to legitimate users. |
| **DDoS Attack** | Distributed DoS. Same flood from thousands of compromised devices simultaneously. Harder to block. |
| **Botnet** | Network of malware-infected 'zombie' computers controlled by a threat actor to launch coordinated attacks. |
| **Bot-herder** | The attacker who commands and controls a botnet, often renting it to other criminals. |
| **SYN Flood** | DoS exploiting TCP handshake. Sends millions of SYN packets without completing the handshake, exhausting server connections. |
| **ICMP Flood** | DoS that sends overwhelming volume of ICMP ping packets to saturate bandwidth and CPU. |
| **Ping of Death** | DoS sending oversized ICMP packets (>64KB) to overflow target's buffer and cause system crash. |
| **Packet Sniffing** | Capturing and inspecting network packets. Legitimate (tcpdump, Wireshark) or malicious. |
| **Passive Sniffing** | Silently reading network traffic without modifying it. Like secretly reading mail without opening it. |
| **Active Sniffing** | Intercepting AND modifying packets in transit. Requires ARP poisoning or similar injection technique. |
| **Promiscuous Mode** | NIC configuration that accepts ALL network traffic, not just packets addressed to that device. |
| **IP Spoofing** | Forging the source IP address field in a packet to impersonate a trusted system or hide the attacker's identity. |
| **On-Path Attack** | Attacker positions themselves between two parties to intercept/modify all communications (MitM). |
| **Replay Attack** | Capturing a valid authentication packet and retransmitting it later to impersonate the original user. |
| **Smurf Attack** | IP spoofing + ICMP broadcast = amplified flood of ICMP replies directed at the spoofed victim IP. |
| **tcpdump** | Command-line packet analyzer for Linux/macOS. Captures live traffic and prints packet details to terminal. |
| **Wireshark** | GUI-based packet analyzer. Can open tcpdump .pcap files for deep visual analysis. |
| **DFIR** | Digital Forensics and Incident Response. The practice of investigating breaches and preserving evidence. |
| **3Cs Framework** | Command, Control, Communications -- the structured mindset for managing active incidents without panic. |
| **Bandwidth** | Total capacity of a network link. Measured in Mbps or Gbps. Saturating it = effective DoS. |

**MODULE 4**

# Security Hardening & Defense Architecture

## 4.1 What is Security Hardening?

> **KEY CONCEPT**
> Security Hardening is the continuous process of strengthening a system's configurations and defenses to reduce the number of vulnerabilities an attacker could exploit.
> 
> Attack Surface: The total set of all possible entry points, vulnerabilities, and exposed vectors that a threat actor could use to gain unauthorized access.
> 
> Goal of hardening: Shrink the attack surface as small as possible. Every unnecessary open port, default credential, unpatched library, and misconfigured service is a potential entry point.
> 
> The House Analogy: Your network is a house. The attack surface is every window, door, mail slot, and loose brick. Hardening = adding deadbolts, window locks, an alarm system, security cameras, and a guard dog.

> **DEFENSE-IN-DEPTH — 5 Hardening Layers**  
> **DEFENSE-IN-DEPTH: No single tool stops every attack. LAYER your defenses.**  
> **LAYER 5: PHYSICAL SECURITY**

```
  +------------------------------------------------------------------+
  | Biometric access, CCTV, guards, server cages, locked racks       |
  | Prevents: physical theft, unauthorized hardware access           |
  +------------------------------------------------------------------+
  LAYER 4: NETWORK HARDENING
  +------------------------------------------------------------------+
  | Firewalls, IDS/IPS, network segmentation, VPN, VLAN isolation    |
  | Prevents: external intrusion, lateral movement, eavesdropping    |
  +------------------------------------------------------------------+
  LAYER 3: OS HARDENING
  +------------------------------------------------------------------+
  | Patch management, baseline configs, MFA, minimal services        |
  | Prevents: OS exploits, credential attacks, privilege escalation  |
  +------------------------------------------------------------------+
  LAYER 2: APPLICATION HARDENING
  +------------------------------------------------------------------+
  | Input validation, secure coding, WAF, dependency scanning        |
  | Prevents: SQL injection, XSS, RCE via vulnerable libraries       |
  +------------------------------------------------------------------+
  LAYER 1: CLOUD HARDENING
  +------------------------------------------------------------------+
  | IAM policies, encryption, shared responsibility model, CSPM      |
  | Prevents: data exposure, misconfigured cloud services            |
  +------------------------------------------------------------------+

  If attacker breaches Layer 4 (network firewall), Layer 3 (OS hardening)
  still stops them. If they bypass Layer 3, Layer 2 (app security) catches them.
  No single failure = total compromise. Multiple failures required.
```

## 4.2 Operating System Hardening

> **IMPORTANT: Why OS Hardening is Critical**
> The OS sits between ALL software applications and the physical hardware.
> A single compromised OS gives the attacker access to EVERY application running on it --
> all databases, all encryption keys, all user data, all network connections.
> Hardening the OS is the highest-leverage security investment you can make on a server.

### A. Patch Management — The First Line of OS Defense

> **NOTE**
> A patch is a software update that fixes a specific, known security vulnerability.
> 
> The Race Against Time:
> 1. Security researcher discovers a vulnerability in, say, OpenSSL.
> 2. Vendor is notified (responsible disclosure). Vendor develops and releases a patch.
> 3. The patch itself ANNOUNCES the vulnerability details publicly.
> 4. Malicious actors immediately read the patch notes and write exploits targeting
> systems that have NOT yet updated.
> 5. Organizations that patch within 24-48 hours are safe.
> Organizations that take weeks are sitting targets.
> 
> Zero-Day Vulnerability: A vulnerability discovered and exploited BEFORE the vendor even knows about it.
> There is NO patch available yet. The only defense is network-level mitigations and detection.

| **Patch Priority** | **Examples** | **Response Time** | **Why** |
| --- | --- | --- | --- |
| **CRITICAL (CVSS 9.0-10.0)** | Remote code execution (RCE) vulnerabilities, authentication bypass, unauthenticated exploits. | 24-48 hours. Emergency change. | These are actively weaponized within hours of disclosure. WannaCry exploited a critical patch that had been available for 2 months. |
| **HIGH (CVSS 7.0-8.9)** | Privilege escalation, local code execution, significant data exposure. | Within 1 week. | High probability of active exploitation. Attack tools appear quickly on GitHub and dark web forums. |
| **MEDIUM (CVSS 4.0-6.9)** | Requires user interaction, limited scope, partial data exposure. | Within 30 days. | Less likely to be actively targeted, but still creates meaningful risk if left unpatched long-term. |
| **LOW (CVSS 0.1-3.9)** | Informational leakage, minor UI issues, theoretical vulnerabilities. | Within 90 days or next scheduled maintenance. | Low practical risk. Address in regular maintenance cycles. |

### B. Baseline Configurations — The Standard for Secure Deployment

> **EXAMPLE**
> A baseline configuration (baseline image) is a documented, pre-approved, standardized set of security settings used as the TEMPLATE for deploying all new systems.
> 
> Think of it as the 'known good state' of a system. Any deviation from the baseline is immediately suspicious.
> 
> Example of a corporate laptop baseline:
> * Full-disk encryption (BitLocker / FileVault) ENABLED
> * Local administrator account DISABLED
> * Automatic OS updates ENABLED
> * USB mass storage DISABLED
> * Screensaver lock after 5 minutes ENABLED
> * Host-based firewall ENABLED and policy applied
> * Approved endpoint security software INSTALLED
> 
> If an analyst suspects a server was compromised, they compare current config against the baseline.
> A newly opened port 4444 (classic backdoor port) not in the baseline = immediate red flag.

### C. Strong Authentication — Defending the Login Portal

> **STRONG AUTHENTICATION — Password Policy + MFA**  
> **Authentication Portal: The #1 target for attackers.**  
> **Most breaches begin with a compromised account.**  
> **STRONG PASSWORD POLICY REQUIREMENTS:**

```
  +------------------------------------------------------------+
  | Minimum length:    12-16 characters (longer = stronger)    |
  | Complexity:        Upper + lower + numbers + symbols       |
  | No dictionary words: 'Password123' cracked in seconds      |
  | No reuse:          Cannot reuse last 12 passwords          |
  | Expiry:            Force reset every 90 days (contested)   |
  | Lockout:           Lock 15 minutes after 5 failed attempts |
  +------------------------------------------------------------+

  MFA (Multi-Factor Authentication) -- THREE FACTORS:
  +---------------------------+
  | SOMETHING YOU KNOW        | Password, PIN, security question
  +---------------------------+ Weakness: phishable, guessable
  | SOMETHING YOU HAVE        | Authenticator app OTP, YubiKey
  +---------------------------+ Strength: physical device required
  | SOMETHING YOU ARE         | Fingerprint, Face ID, iris scan
  +---------------------------+ Strength: cannot be shared/stolen easily

  Combining any TWO factors stops 99.9% of automated credential attacks.
  (Microsoft Security report: MFA blocks 99.9% of account compromise attempts)
```

## 4.3 Defeating Credential Attacks

### Brute Force Attack Types

| **Attack Type** | **Method** | **Speed** | **Best** **Defence** |
| --- | --- | --- | --- |
| **Simple Brute Force** | Automated tool tries EVERY possible character combination: aaa, aab, aac... zzz. Methodical and exhaustive. | Very slow for long passwords. 8-char password = 218 trillion combos. 12-char = 3.5 quintillion. Time: seconds to centuries depending on length. | Long passwords. Account lockout after 5 attempts. MFA (even if password guessed, MFA required). |

| **Dictionary Attack** | Tool tries a pre-compiled wordlist of common passwords, real words, and passwords stolen from previous data breaches (have I been pwned database). | Very fast. Checks millions of common passwords in seconds. Incredibly effective because 80% of people use variations of common words. | Prohibit dictionary words in password policy. Check passwords against known breach databases on creation. MFA. |
| --- | --- | --- | --- |
| **Credential Stuffing** | Uses username+password pairs stolen from SITE A to try logging into SITE B, exploiting password reuse. | Fast and scalable. Automated tools check thousands of sites. Success rate ~0.1-2% per pair but against millions of stolen credentials = thousands of compromised accounts. | Never reuse passwords. Use a password manager. MFA everywhere. Monitor for logins from unusual IPs/locations. |
| **Rainbow Table Attack** | Pre-computed table of password hashes. Instead of hashing 'password123' each guess, looks it up in the table instantly. | Extremely fast for unsalted hashes. Renders basic MD5/SHA1 password storage useless. | Password SALTING: add random unique value to each password before hashing. Makes rainbow tables useless because each hash is unique. |

### Safe Testing Environments — Where Analysts Practice

| **Environment** | **What It Is** | **Best For** | **Key Limitation** |
| --- | --- | --- | --- |
| **Virtual Machine (VM)** | Software-simulated computer running on a host machine. Complete OS isolation. | Testing malware samples, practicing exploits, running risky configurations. If VM is compromised, delete and recreate in minutes. | Advanced malware detects VM environments (checks for VM artifacts) and behaves innocently to avoid analysis. |
| **Sandbox** | An isolated, constrained execution environment specifically designed to observe malware behavior. | Detonating suspicious files to watch exactly what they do: files modified, registry changes, network connections made. | Same sandbox detection evasion as VMs. Time-limited analysis windows may miss delayed-activation malware. |
| **Network Simulation** | Virtual network topology (using tools like GNS3, EVE-NG) that mimics production infrastructure. | Testing firewall rule changes, routing configurations, and attack simulations before applying to production. | Cannot fully replicate production traffic patterns and load. Some behaviors only appear under real load. |

## 4.4 Network Hardening Practices

### A. Port Filtering & Firewall Rules

> **NOTE: Principle of Least Privilege for Ports**
> Every open port is a potential attack vector. If a port is not REQUIRED for normal operations, it MUST be closed.
> Default: DENY ALL. Then explicitly open ONLY what is needed.
> Example secure server setup:
> * Port 22 (SSH): Open ONLY from known admin IP ranges. Key-based auth only.
> * Port 443 (HTTPS): Open from anywhere (public web server).
> * Port 80 (HTTP): Open but immediately redirects to 443.
> * Port 5432 (PostgreSQL): Bound to localhost ONLY. Never externally accessible.
> * Everything else: BLOCKED at firewall.

| **Firewall Type** | **Inspection Level** | **Remembers** **Sessions?** | **Detects App-Layer Attacks?** |
| --- | --- | --- | --- |
| **Stateless** | Packet headers only (IP, port, protocol). Each packet evaluated independently. | No. Same rules apply whether first packet or thousandth. | No. Cannot correlate across packets to detect DoS patterns or fragmentation attacks. |
| **Stateful** | Packet headers + tracks connection state table (SYN/ACK tracking). | Yes. Allows reply traffic for established connections automatically. | Partially. Can detect SYN floods and half-open connection attacks. Cannot inspect payload. |
| **NGFW (Next-Gen)** | Deep Packet Inspection: reads inside the payload. Application-aware. Integrated IPS/IDS. | Yes + application context. | Yes. Can block specific apps, detect malware signatures in payload, enforce application policies. |

### B. Network Segmentation — Containing Breaches

> **IMPORTANT: Why Segmentation Saves Organizations**
> Flat network (no segmentation): Attacker compromises ONE machine -> Has direct access to EVERY machine on the network.
> Segmented network: Attacker compromises one machine -> Firewall walls block access to all other segments.
> 
> Real example: Target's 2013 breach began with a compromised HVAC vendor's credentials.
> Because Target's network was insufficiently segmented, attackers moved from the HVAC system
> to the POS (Point of Sale) systems and stole 40 million credit card numbers.
> Proper segmentation between HVAC/vendor access and POS systems would have contained the breach.

> **NETWORK SEGMENTATION — Containing the Blast Radius**  
> **SEGMENTED NETWORK ARCHITECTURE:**

```
  +---------------------+  +---------------------+  +---------------------+
  | SEGMENT A           |  | SEGMENT B           |  | SEGMENT C           |
  | Engineering (VLAN1) |  | HR (VLAN2)          |  | Finance (VLAN3)     |
  +---------------------+  +---------------------+  +---------------------+
         |                          |                          |
         +------------+-------------+------------+------------+
                      |             INTER-VLAN FIREWALL        |
                      |             Rules: Eng -> Internet OK  |
                      |                    HR -> Internet OK   |
                      |                    Eng -> Finance DENY |
                      |                    HR -> Finance DENY  |
                      v
                 [INTERNET]

  If attacker compromises Engineering laptop:
  * Can reach Engineering segment resources
  * CANNOT reach Finance database (inter-VLAN firewall blocks)
  * CANNOT reach HR records
  * Blast radius is CONTAINED to one segment
```

### C. IDS vs. IPS — Detection vs. Prevention

> **IDS vs. IPS -- Detection vs. Active Prevention**  
> **IDS (Intrusion Detection System)     IPS (Intrusion Prevention System)**

```
  +----------------------------------+  +----------------------------------+
  | PASSIVE -- reads traffic copy    |  | INLINE -- sits in traffic path   |
  |                                  |  |                                  |
  | Network --[copy]-> IDS           |  | Network --[all traffic]-> IPS -> |
  |         --[real]-> Destination   |  |                         (or DROP)|
  |                                  |  |                                  |
  | Sees attack, sends ALERT         |  | Sees attack, DROPS packets       |
  | Does NOT stop traffic            |  | Stops attack automatically       |
  | Zero network performance impact  |  | Small latency added              |
  | Cannot block false positives     |  | False positives = blocked legit  |
  |                                  |  | traffic (dangerous if misconfiged)|
  +----------------------------------+  +----------------------------------+

  SIEM integrates with both: collects all IDS/IPS alerts into one dashboard.

  TYPICAL DEPLOYMENT:
  * IPS at the network PERIMETER: block known attacks before they enter
  * IDS inside the network: detect lateral movement that already got past perimeter
  * SIEM correlates both: 'IPS blocked 50 attacks, but IDS shows an internal
    machine is still behaving maliciously -- perimeter breach succeeded.'
```

## 4.5 Cloud Infrastructure Hardening

### A. The Shared Responsibility Model

> **SHARED RESPONSIBILITY MODEL**  
> **CLOUD SECURITY = SHARED RESPONSIBILITY**

```
  +----------------------------------------------------------------------+
  |                    CLOUD SERVICE PROVIDER (CSP)                      |
  | Responsible for: Physical data centers, hardware, host servers,      |
  | hypervisors, network infrastructure, physical security.              |
  | You CANNOT audit or control this layer.                              |
  +----------------------------------------------------------------------+
  |                                                                      |
  |            ---- THE LINE OF SHARED RESPONSIBILITY ----               |
  |                                                                      |
  +----------------------------------------------------------------------+
  |                      CUSTOMER (YOU)                                  |
  | Responsible for: Your data, your applications, your OS patches,      |
  | your IAM configurations, your security groups/firewall rules,        |
  | your encryption keys, your compliance requirements.                  |
  | You ARE responsible for this layer. Misconfiguring it = YOUR breach. |
  +----------------------------------------------------------------------+

  COMMON CLOUD MISCONFIGURATION BREACHES:
  * S3 bucket set to PUBLIC: all data freely downloadable by anyone
  * Overly permissive IAM role: attacker gains access to entire cloud account
  * Security group open to 0.0.0.0/0: database exposed to entire internet
  * Missing encryption: data readable if storage is accessed
```

### B. Hypervisors & VM Escape Attacks

> **NOTE**
> Hypervisor: Software layer that allows multiple Virtual Machines (VMs) to run on ONE physical server simultaneously. Each VM believes it has dedicated hardware.
> 
> VM Escape Attack: A rare but catastrophic exploit where an attacker's code running INSIDE a guest VM breaks out of the virtualization boundary and gains access to the underlying hypervisor.
> 
> Impact: The hypervisor has control over ALL VMs on that physical server.
> In a cloud environment, this could mean accessing OTHER CUSTOMERS' virtual machines -- a massive breach.
> 
> Cloud providers are hypervisor security is extremely hardened (they patch hypervisor vulnerabilities within hours).
> Still, defense: keep guest VM OS patched, minimize the attack surface inside the VM.

### C. Cloud Cryptography

| **Concept** | **What It Is** | **Why It Matters** |
| --- | --- | --- |
| **Encryption at Rest** | Data stored on disk is encrypted. Unreadable without the decryption key. | If a storage drive is physically stolen or cloud storage is misconfigured, raw data is unreadable. AWS S3 server-side encryption, Azure Storage Service Encryption. |
| **Encryption in Transit** | Data is encrypted while traveling between services. TLS/HTTPS. | Prevents eavesdropping on data moving between your application, database, and users. Use TLS 1.3 for all internal service-to-service traffic. |
| **HSM / TPM** | Hardware Security Module / Trusted Platform Module. Dedicated hardware chips that securely store encryption keys and perform cryptographic operations. | Keys never leave the hardware chip unencrypted. Even if an attacker accesses the server, they cannot extract the keys. AWS CloudHSM, Google Cloud HSM. |
| **Crypto-Shredding** | Intentionally destroying the decryption keys for data you want to permanently delete. | In cloud environments, you cannot physically shred a hard drive. By destroying the keys, all encrypted data becomes permanently unreadable -- effectively deleted. Used for GDPR right-to-erasure compliance. |

## 4.6 Complete Course 3 Master Glossary

| **Term** | **Definition** |
| --- | --- |
| **ARP (Address Resolution Protocol)** | Maps IP addresses to MAC addresses on a local network. Has no authentication -- vulnerable to ARP poisoning. |
| **ARP Poisoning** | Attacker sends fake ARP replies to corrupt ARP tables, redirecting traffic through attacker's machine. Enables MitM attacks. |
| **Attack Surface** | The total set of all potential vulnerabilities and entry points a threat actor could exploit. |
| **Bandwidth** | Total capacity of a network connection (Mbps/Gbps). DoS attacks work by saturating bandwidth. |
| **Baseline Configuration** | Documented, pre-approved security settings used as the standard template for all new system deployments. |
| **Botnet** | Network of malware-infected 'zombie' computers controlled by a single attacker (bot-herder) via a C2 server. |
| **CIDR** | Classless Inter-Domain Routing. Notation like /24 that specifies how many bits are the network portion of an IP address. |
| **Cloud Computing** | Using remote servers and services hosted on the internet instead of local physical infrastructure. |
| **DHCP** | Dynamic Host Configuration Protocol. Automatically assigns IP addresses to devices joining a network. |
| **Defense-in-Depth** | Layering multiple security controls so no single failure leads to total compromise. |
| **Dictionary Attack** | Brute-force variant using a wordlist of common passwords and stolen credentials. |
| **DMZ** | Demilitarized Zone. Network segment between the internet and internal network hosting public-facing services. |
| **DNS** | Domain Name System. Translates human-readable domain names (google.com) to IP addresses. |
| **DoS Attack** | Denial of Service. Floods a target to make it unavailable to legitimate users. |
| **DDoS Attack** | Distributed DoS. Same attack from thousands of devices simultaneously. Much harder to block. |
| **Encapsulation** | Wrapping an encrypted packet inside a new outer packet with standard routing headers. Used by VPNs. |
| **Firewall** | Network device monitoring and controlling traffic based on predefined security rules. |
| **HTTPS** | HTTP Secure. HTTP encrypted with TLS/SSL. Standard for all modern web traffic. |
| **Hub** | Legacy network device that broadcasts data to ALL ports. Insecure. Replaced by switches. |
| **Hypervisor** | Software allowing multiple VMs to run on one physical server. Target of VM escape attacks. |
| **IaaS** | Infrastructure as a Service. Renting raw virtual machines and storage from a cloud provider. |
| **ICMP** | Internet Control Message Protocol. Used for network diagnostics (ping). Exploited in flood and Ping of Death attacks. |
| **IDS** | Intrusion Detection System. Passively monitors traffic and ALERTS on suspicious patterns. Does not block. |
| **IP Spoofing** | Forging the source IP address in a packet to impersonate a trusted system or hide attacker identity. |
| **IPS** | Intrusion Prevention System. Actively monitors traffic and BLOCKS/DROPS suspicious packets. |
| **IPv4** | 32-bit IP addressing. 4.3 billion addresses. Exhausted globally. |
| **IPv6** | 128-bit IP addressing. 340 undecillion addresses. Successor to IPv4. |
| **LAN** | Local Area Network. Network spanning a small geographic area (home, office, floor). |
| **MAC Address** | Unique physical identifier hardcoded into a network interface card. Used for local network delivery. |
| **MFA** | Multi-Factor Authentication. Requires 2+ factors: know + have + are. |
| **Modem** | Device connecting a home/office network to the ISP's infrastructure. |
| **NAT** | Network Address Translation. Allows multiple private IPs to share one public IP. Hides internal IPs. |
| **NGFW** | Next-Generation Firewall. Deep Packet Inspection + IPS + application awareness. |
| **On-Path Attack** | Attacker intercepts communications between two parties (MitM). Can read and modify all traffic. |
| **OSI Model** | 7-layer framework for network communication: Physical, Data Link, Network, Transport, Session, Presentation, Application. |
| Packet Sniffing | Capturing and inspecting network packets. Used legitimately (tcpdump) and maliciously. |
| **Patch Update** | Software update that fixes specific known security vulnerabilities. |
| **Ping of Death** | DoS attack sending ICMP packets exceeding 65,535 bytes to crash target system on reassembly. |
| **Port** | Software-based address directing network traffic to specific services on a server (e.g., 443=HTTPS). |
| **Private IP** | IP address used only within a LAN. Not routable on the public internet. |
| **Promiscuous Mode** | NIC mode that accepts ALL network traffic, not just traffic addressed to that device. |
| **Proxy Server** | Intermediary server forwarding requests on behalf of clients. Hides internal IPs via NAT. |
| **Public IP** | IP address assigned by ISP. Visible to the entire internet. |
| **Replay Attack** | Capturing a valid auth packet and retransmitting it later to impersonate the original user. |
| **Router** | Connects different networks. Reads IP addresses to find optimal path for packets. |
| **SDN** | Software-Defined Networking. Network routing controlled by software/API instead of physical hardware. |
| **SSH** | Secure Shell. Encrypted remote terminal access (port 22). Replaces insecure Telnet. |
| **Subnetting** | Dividing a large network into smaller manageable sub-networks. |
| **SYN Flood** | DoS exploiting TCP handshake. Sends SYN packets without completing ACK, exhausting server connections. |
| **TCP** | Transmission Control Protocol. Connection-oriented. Guarantees delivery via 3-way handshake. |
| **TCP/IP Model** | 4-layer practical implementation model: Network Access, Internet, Transport, Application. |
| **TTL (Time to Live)** | Packet field decremented at each hop. Packet destroyed at 0. Prevents endless network loops. |
| **UDP** | User Datagram Protocol. Connectionless. Fast but no delivery guarantee. |
| **VM Escape** | Attack where malicious code breaks out of a VM to access the underlying hypervisor. |
| **VPN** | Virtual Private Network. Encrypts traffic and creates a secure tunnel over public networks. |
| **WAP** | Wireless Access Point. Bridges wireless devices to a wired network. |
| **WAN** | Wide Area Network. Spans large geographic areas. The internet is the largest WAN. |
| **WPA3** | Latest Wi-Fi security standard. Uses SAE to eliminate KRACK vulnerabilities. Use wherever possible. |

## 4.7 Course 3 — Complete Flashcard Review

| **Question** | **Answer** |
| --- | --- |
| **What is the difference between LAN and WAN?** | LAN = Local Area Network (home, office, building). WAN = Wide Area Network (city, country, globe). The internet is the largest WAN. |
| **What is the difference between a hub and a switch?** | Hub: broadcasts data to ALL ports -- insecure, replaced. Switch: uses MAC address table to send data ONLY to the specific intended device. |
| **What is the difference between MAC address and IP address?** | MAC = permanent physical hardware ID (for local delivery within LAN). IP = logical network address (for routing across different networks). MAC never changes; IP can. |
| **Why do packets have a TTL field?** | Time to Live: decremented by 1 at each router hop. Packet destroyed at 0. Prevents malformed packets from looping endlessly and crashing network infrastructure. |
| **Name all 7 OSI layers in order.** | 1-Physical (cables), 2-Data Link (MAC/switches), 3-Network (IP/routing), 4-Transport (TCP/UDP), 5-Session (connections), 6-Presentation (encryption/formatting), 7-Application (HTTP/DNS/SSH). |
| **What are the 4 TCP/IP layers?** | 1-Network Access (hardware, MAC, ARP), 2-Internet (IP, ICMP, routing), 3-Transport (TCP, UDP), 4-Application (HTTP, DNS, SSH, SMTP). |
| **TCP vs. UDP -- key difference?** | TCP: connection-oriented, 3-way handshake, guarantees delivery, slower. UDP: connectionless, no guarantee, very fast. Use TCP for reliability (databases), UDP for speed (streaming, gaming). |
| **What is the TCP Three-Way Handshake?** | SYN (client initiates) -> SYN-ACK (server acknowledges and responds) -> ACK (client confirms). Connection established. Exploited by SYN Flood attacks. |
| **What ports must you memorize?** | 22=SSH, 25/587=SMTP, 53=DNS, 80=HTTP, 110/995=POP3, 143/993=IMAP, 443=HTTPS, 67/68=DHCP. |
| **What is a SYN Flood attack?** | Sends millions of SYN packets without completing the handshake (no ACK). Server reserves resources for each half-open connection until its connection table fills up, blocking all legitimate users. |
| **What is IP Spoofing?** | Forging the SOURCE IP field in a packet to impersonate a trusted IP address. Bypasses IP-based firewall rules. Cannot receive replies (replies go to real IP owner). |
| **Difference between passive and active packet sniffing?** | Passive: silently reads traffic without modifying it (requires promiscuous mode NIC). Active: intercepts AND modifies packets in transit (requires ARP poisoning or traffic injection). |
| **How does a VPN protect data?** | Encapsulation: original packet is encrypted, then wrapped inside a new outer packet with standard routing headers. Traffic travels through an encrypted tunnel -- intercepted packets are unreadable ciphertext. |
| **What is the Shared Responsibility Model in cloud?** | CSP secures: physical hardware, data centers, hypervisors. Customer secures: their data, applications, OS patches, IAM configs, firewall rules, encryption keys. |
| **What is a VM Escape attack?** | Attacker's code running inside a guest VM breaks out of the virtualization boundary to access the underlying hypervisor -- potentially compromising all other VMs on the same physical server. |
| **What is Crypto-Shredding?** | Permanently deleting data in the cloud by destroying the decryption keys. Encrypted data without its keys is permanently unreadable -- effectively deleted. Used for GDPR right-to-erasure compliance. |
| **IDS vs. IPS -- key difference?** | IDS: PASSIVE. Reads a copy of traffic, generates alerts. Does not stop attacks. Zero performance impact. IPS: INLINE. Sits in the actual traffic path. Automatically drops malicious packets. |
| **What is network segmentation and why does it matter?** | Divides a flat network into isolated subnets separated by firewalls. If one segment is breached, attacker cannot freely move to other segments. Limits blast radius. The Target breach (2013) would have been contained by proper segmentation. |
| **What are the 4 Wi-Fi security standards and which to use?** | WEP (1999, broken -- never use), WPA (2003, KRACK vulnerable -- avoid), WPA2 (2004, acceptable with strong passphrase), WPA3 (2018, best -- use everywhere possible). WPA3 uses SAE to defeat KRACK. |
| **What is Defense-in-Depth?** | Layering multiple security controls (physical, network, OS, application, cloud) so that no single failure leads to total compromise. Attacker must defeat EVERY layer to succeed. |

> **Course 3 Complete!**  
> **Connect and Protect: Networks and Network Security**  
> **Topics Mastered: Network Architecture * All Protocols & Ports * OSI & TCP/IP Models**  
> **DoS/DDoS Attacks * Packet Sniffing * IP Spoofing *  OS & Network Hardening  *  Cloud Security**  
> **Next: Course 4 -- Linux & SQL for Security -->**
