## Contents

- [Complete Course 3 Master Glossary](#complete-course-3-master-glossary)
- [Course 3 — Complete Flashcard Review](#course-3--complete-flashcard-review)

## Complete Course 3 Master Glossary

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
| **Packet Sniffing** | Capturing and inspecting network packets. Used legitimately (tcpdump) and maliciously. |
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

## Course 3 — Complete Flashcard Review

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
