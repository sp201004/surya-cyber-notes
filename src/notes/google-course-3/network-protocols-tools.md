## Contents

- [The Network Security Engineer Workflow](#the-network-security-engineer-workflow)
- [All Network Protocols — Complete Reference](#all-network-protocols--complete-reference)
- [Wi-Fi Security Protocols — Evolution of Wireless Security](#wi-fi-security-protocols--evolution-of-wireless-security)
- [Network Segmentation, Subnetting & Security Zones](#network-segmentation-subnetting--security-zones)
- [Firewalls — Deep Dive](#firewalls--deep-dive)
- [Proxy Servers — The Middleman](#proxy-servers--the-middleman)
- [VPNs & Encapsulation](#vpns--encapsulation)

## The Network Security Engineer Workflow

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

## All Network Protocols — Complete Reference

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

## Wi-Fi Security Protocols — Evolution of Wireless Security

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

## Network Segmentation, Subnetting & Security Zones

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

## Firewalls — Deep Dive

| **Firewall Type** | **How It Filters** | **Pros** | **Cons** | **Best Use Case** |
| --- | --- | --- | --- | --- |
| **Stateless** | Inspects each packet independently using fixed rules (IP, port, protocol). No memory of past packets. | Simple, fast, low overhead. | Cannot detect attacks spread across multiple packets. Requires rules in BOTH directions (inbound AND outbound reply). | High-throughput edge filtering where speed is critical and traffic patterns are simple. |
| **Stateful** | Tracks the 'state' of active connections (SYN/SYN-ACK/ACK handshake table). Only allows reply traffic for established connections. | Smarter -- prevents many spoofed packets. Only needs inbound rule; reply traffic automatically allowed. | More resource-intensive than stateless. | Standard for most corporate firewalls. Far more secure than stateless. |
| **NGFW (Next-Gen)** | Deep Packet Inspection (DPI) -- reads INSIDE the payload, not just headers. Application-aware filtering. Integrated IPS. | Can block specific applications (block Tor, allow only HTTP). Detects malware signatures in payloads. | High cost, high CPU usage, requires expert configuration. | Enterprise perimeter defense where sophisticated threats and application-level control are required. |
| **Cloud/FWaaS** | Hosted and maintained by vendor. Filters traffic before it reaches on-premises network. | No hardware to maintain. Scales automatically. Always updated with latest threat signatures. | Data leaves premises. Ongoing subscription cost. | Cloud-heavy organizations, remote workforces, and organizations without dedicated security hardware teams. |

## Proxy Servers — The Middleman

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

## VPNs & Encapsulation

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

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| **What are the 4 Wi-Fi security standards and which to use?** | WEP (1999, broken -- never use), WPA (2003, KRACK vulnerable -- avoid), WPA2 (2004, acceptable with strong passphrase), WPA3 (2018, best -- use everywhere possible). WPA3 uses SAE to defeat KRACK. |
| **What ports must you memorize?** | 22=SSH, 25/587=SMTP, 53=DNS, 80=HTTP, 110/995=POP3, 143/993=IMAP, 443=HTTPS, 67/68=DHCP. |
| **Stateless vs. Stateful vs. NGFW firewalls?** | Stateless: inspects each packet independently, fast, no memory. Stateful: tracks connection state, allows reply traffic automatically. NGFW: Deep Packet Inspection, application-aware, integrated IPS. |
| **Forward proxy vs. reverse proxy?** | Forward proxy controls/logs outbound access from internal users. Reverse proxy shields internal servers from direct internet exposure (hides IPs, terminates TLS, load balances). |
| **How does a VPN protect data?** | Encapsulation: original packet is encrypted, then wrapped inside a new outer packet with standard routing headers. Traffic travels through an encrypted tunnel -- intercepted packets are unreadable ciphertext. |
| **IPSec vs. WireGuard?** | IPSec: traditional standard, battle-tested, natively supported, complex, slower. WireGuard: modern, minimal codebase (~4,000 lines), faster, easier to audit, increasingly preferred. |
