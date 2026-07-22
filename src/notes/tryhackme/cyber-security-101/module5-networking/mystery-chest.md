| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Networking / Bonus Revision |
| **Difficulty** | Beginner |
| **Time** | ~15 Minutes |
| **Module** | Networking |

---

## Objective

This Mystery Chest is a **bonus revision vault** for the entire Networking module. It consolidates the most important reference material from every room — Networking Concepts, Networking Essentials, Networking Core Protocols, Networking Secure Protocols, Wireshark, Tcpdump, and Nmap — into one quick-reference place.

Use it as a lookup before a lab, an exam, or an interview. Everything here was covered across the module: ports and models, addressing schemes, the application and secure protocols, and the analysis and scanning tools you drive from the command line.

---

## Common Ports

Port numbers are how a host directs traffic to the right service. The well-known ports below are the ones that appear most often in troubleshooting, packet analysis, and scanning.

### Well-Known Ports

| Port | Protocol | Purpose |
|------|----------|---------|
| **20** | FTP Data | File transfer data channel. |
| **21** | FTP Control | File transfer command channel. |
| **22** | SSH | Secure remote shell. |
| **23** | Telnet | Plaintext remote shell. |
| **25** | SMTP | Sending email. |
| **53** | DNS | Domain name resolution. |
| **67** | DHCP Server | Address assignment (server). |
| **68** | DHCP Client | Address assignment (client). |
| **69** | TFTP | Trivial file transfer. |
| **80** | HTTP | Web traffic. |
| **110** | POP3 | Receiving email. |
| **123** | NTP | Time synchronization. |
| **143** | IMAP | Synchronizing email. |
| **161** | SNMP | Network management. |
| **389** | LDAP | Directory services. |
| **443** | HTTPS | Secure web traffic. |
| **445** | SMB | File and printer sharing. |
| **3389** | RDP | Remote Desktop. |

### Secure Protocol Ports

Most plaintext protocols have a secure counterpart that wraps the traffic in TLS or SSH.

| Protocol | Port |
|----------|------|
| **SSH** | 22 |
| **Telnet** | 23 |
| **FTP** | 21 |
| **FTPS** | 990 |
| **SFTP** | 22 |
| **HTTP** | 80 |
| **HTTPS** | 443 |
| **SMTP** | 25 |
| **SMTPS** | 465 / 587 |
| **POP3** | 110 |
| **POP3S** | 995 |
| **IMAP** | 143 |
| **IMAPS** | 993 |

> **Security relevance:** Knowing default ports lets you read a scan result or packet capture at a glance and spot plaintext services like Telnet (23), FTP (21), and HTTP (80) that expose credentials and data, versus their encrypted equivalents.

---

## OSI And TCP/IP Models

The OSI model has seven layers; the TCP/IP model condenses the same ideas into four. Memory trick for OSI (Layer 7 down to Layer 1): **Please Do Not Throw Sausage Pizza Away**.

### OSI Seven Layers

| Layer | Name | Role / Examples |
|-------|------|-----------------|
| **7** | Application | HTTP, HTTPS, FTP, DNS, SMTP, SSH. |
| **6** | Presentation | Encryption, compression, encoding. |
| **5** | Session | Start, maintain, and close sessions. |
| **4** | Transport | TCP, UDP, ports. |
| **3** | Network | IP, routing, routers. |
| **2** | Data Link | MAC, switches, Ethernet. |
| **1** | Physical | Bits, cables, hubs. |

### TCP/IP Four Layers

The TCP/IP stack maps to the OSI layers and is the model used on the real Internet.

```
Application   (HTTP, HTTPS, DNS, SSH, FTP)
      |
Transport     (TCP, UDP)
      |
Internet      (IP, ICMP)
      |
Link          (Ethernet, WiFi)
```

> **Security relevance:** Layered models let you localize a problem or an attack. Routing sits at Layer 3, ports and reliability at Layer 4, and application data at Layer 7 — so you know which layer a filter, scan, or exploit is operating on.

---

## CIDR And Private Ranges

CIDR notation expresses how many bits of an address identify the network. Private ranges are reserved for internal use and are not routable on the public Internet.

### CIDR Notation

| CIDR | Subnet Mask | Meaning |
|------|-------------|---------|
| **/8** | 255.0.0.0 | Very large network. |
| **/16** | 255.255.0.0 | Medium network. |
| **/24** | 255.255.255.0 | Common LAN (256 addresses). |
| **/32** | Single host | One exact address. |

### Private IP Ranges

| Range | CIDR |
|-------|------|
| **10.x** | 10.0.0.0/8 |
| **172.16.x** | 172.16.0.0/12 |
| **192.168.x** | 192.168.0.0/16 |

> **Security relevance:** Recognizing private ranges tells you instantly whether an address is internal or public, which shapes how you scope a scan and how NAT translates internal hosts to a public address before reaching the Internet.

---

## TCP vs UDP

Both are Transport layer (Layer 4) protocols, but they make opposite tradeoffs between reliability and speed.

| Property | TCP | UDP |
|----------|-----|-----|
| **Reliability** | Reliable, retransmits lost data | No retransmission |
| **Ordering** | Ordered delivery | No guaranteed order |
| **Connection** | Connection-oriented | Connectionless |
| **Setup** | Three-way handshake | None |
| **Speed** | Slower, more overhead | Fast, low overhead |
| **Typical use** | Downloads, SSH, HTTPS | Streaming, gaming, DNS |

> **Security relevance:** TCP's three-way handshake is the basis of the SYN scan (`-sS`), while UDP's connectionless nature makes UDP scans slower and less certain. Knowing which protocol a service uses guides how you probe it.

---

## Networking Essentials Protocols

These lower-level protocols keep a local network running: address assignment, address resolution, diagnostics, routing, and translation.

### DHCP, ARP And ICMP

| Protocol | Purpose | Key Detail |
|----------|---------|------------|
| **DHCP** | Automatic IP assignment | UDP 67 server / 68 client; DORA = Discover, Offer, Request, ACK. |
| **ARP** | Map IP to MAC | Broadcast request to `FF:FF:FF:FF:FF:FF`, unicast reply. |
| **ICMP** | Diagnostics | Echo Request = Type 8, Echo Reply = Type 0, TTL Expired = Type 11. |
| **NAT** | Private to public translation | Router rewrites internal addresses to a public address. |

Routing protocols choose the path a packet takes: **RIP** uses hop count, **OSPF** uses shortest path, **EIGRP** is Cisco proprietary, and **BGP** routes between networks across the Internet.

Common commands used to inspect this layer on Windows and Linux:

```bash
# Windows
ipconfig
arp -a
ping google.com
tracert google.com

# Linux
ip addr
ip neigh
ping -c 4 google.com
traceroute google.com
```

> **Security relevance:** ARP and ICMP are frequently abused — ARP spoofing redirects traffic on a LAN, and ICMP is used for host discovery and tunneling. TTL values (via ICMP Type 11) reveal path length and help trace routes.

---

## Core Protocols

The application-layer protocols that make the everyday Internet work: name resolution, web, file transfer, and email.

| Protocol | Port | Purpose |
|----------|-----:|---------|
| **DNS** | 53 | Resolve domain names to IP addresses. |
| **HTTP** | 80 | Web traffic. |
| **HTTPS** | 443 | Secure web traffic. |
| **FTP** | 21 | File transfer between client and server. |
| **SMTP** | 25 | Send email. |
| **POP3** | 110 | Download email from the mail server. |
| **IMAP** | 143 | Synchronize email across devices. |

WHOIS also appears here: it looks up domain ownership rather than resolving a name. Each protocol has one clear job — DNS finds the website, HTTP/HTTPS browses it, FTP transfers files, and SMTP, POP3, and IMAP send, download, and sync email respectively.

> **Security relevance:** WHOIS reveals domain ownership useful for reconnaissance, while DNS, HTTP, and unencrypted email protocols leak information in transit. These protocols form the foundation of most web and email attacks.

---

## Secure Protocols

Secure protocols wrap plaintext services in encryption. The pattern is consistent: a plaintext protocol gets a TLS or SSH-protected sibling.

| Plaintext | Secure Version | Mechanism |
|-----------|----------------|-----------|
| **Telnet** | SSH (22) | Encrypted remote shell replacing Telnet. |
| **FTP** | FTPS (990) / SFTP (22) | FTPS adds TLS; SFTP runs over SSH. |
| **HTTP** | HTTPS (443) | HTTP over TLS. |
| **SMTP** | SMTPS (465 / 587) | Email sending over TLS. |
| **POP3** | POP3S (995) | Email download over TLS. |
| **IMAP** | IMAPS (993) | Email sync over TLS. |

The overall theme is consistent: every plaintext protocol moves toward a secure, encrypted version on its own dedicated port.

> **Security relevance:** TLS provides confidentiality and integrity, and SSH provides encrypted, authenticated remote access. Preferring the secure port for every service prevents credential and data interception on the wire.

---

## Wireshark Display Filters

Wireshark display filters narrow a capture *after* it has been recorded. They are the most commonly used filters in the tool.

Filter by protocol, port, address, and with logical operators:

```text
http    dns    ftp    smtp    arp    icmp    tls    tcp    udp

tcp.port==80    tcp.port==443    tcp.port==22    udp.port==53

ip.addr==IP    ip.src==IP    ip.dst==IP

http && ip.addr==192.168.1.10    dns || http    !icmp
```

> **Security relevance:** Display filters isolate the traffic that matters in an investigation. Combined with Follow Stream (which reconstructs application-level communication), they let you extract credentials, requests, and payloads from a capture quickly.

---

## Tcpdump Options

Tcpdump is the command-line packet capture tool. Filters go on the command line; captures can be saved to and read from `.pcap` files.

Capture on an interface, filter by protocol or port, then save, read, and control output:

```bash
sudo tcpdump -i eth0        # capture one interface
sudo tcpdump -i any         # capture all interfaces
tcpdump port 80             # filter by port (80, 53, 443)
tcpdump icmp                # filter by protocol (icmp, tcp)
tcpdump tcp
tcpdump -w packets.pcap     # write capture to file
tcpdump -r packets.pcap     # read capture from file
tcpdump -c 100              # stop after 100 packets
tcpdump -nn                 # no name/port resolution
tcpdump -vv                 # verbose output
```

> **Security relevance:** Tcpdump runs where no GUI exists — on servers and remote hosts — so being able to capture, save a `.pcap`, and pull it back for Wireshark analysis is a core incident-response and monitoring skill.

---

## Nmap Flags And Scan Types

Nmap discovers hosts, scans ports, and fingerprints services. The flags group cleanly by purpose.

### Host Discovery

| Flag | Meaning |
|------|---------|
| **-sn** | Ping scan (no port scan). |
| **-sL** | List scan (list targets only). |
| **-PS** | TCP SYN ping. |
| **-PA** | TCP ACK ping. |
| **-PU** | UDP ping. |

### Port Scanning

| Flag | Meaning |
|------|---------|
| **-sS** | TCP SYN (stealth) scan. |
| **-sT** | TCP connect scan. |
| **-sU** | UDP scan. |
| **-F** | Fast scan (fewer ports). |
| **-p-** | Scan all 65535 ports. |

### Detection

| Flag | Meaning |
|------|---------|
| **-sV** | Service/version detection. |
| **-O** | Operating system detection. |
| **-A** | Aggressive scan (version, OS, scripts, traceroute). |

### Timing, Output And Miscellaneous

| Flag | Meaning |
|------|---------|
| **-T0 to -T5** | Timing template, slowest to fastest. |
| **-oN** | Normal output to file. |
| **-oX** | XML output. |
| **-oG** | Greppable output. |
| **-oA** | Output in all formats. |
| **-v / -vv** | Verbose / very verbose. |
| **-d** | Debug output. |
| **-n** | No DNS resolution. |
| **-Pn** | Treat host as online (skip discovery). |

A typical scanning progression from broad to detailed:

```bash
nmap -sn 192.168.1.0/24
nmap -sS -F 192.168.1.10
nmap -sS -sV -O 192.168.1.10
nmap -A -T4 192.168.1.10
```

> **Security relevance:** The SYN scan (`-sS`) is stealthier because it never completes the handshake, while `-Pn` is essential against hosts that block ping. Timing (`-T`) balances speed against detectability during authorized testing.

---

## Quick Revision

| Concept | Recall |
|---------|--------|
| Web ports | HTTP 80, HTTPS 443 |
| Remote access | SSH 22, Telnet 23, RDP 3389 |
| Email | SMTP 25, POP3 110, IMAP 143 |
| Name resolution | DNS 53 |
| Routing layer | OSI Layer 3 (Network) |
| Transport choice | TCP reliable, UDP fast |
| DHCP process | DORA — Discover, Offer, Request, ACK |
| Private ranges | 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16 |
| Stealth scan | `nmap -sS` |
| Read a pcap | `tcpdump -r packets.pcap` |
| Common Wireshark filter | `ip.addr==IP`, `tcp.port==80` |

**Key idea:** Networking is layered and port-driven — once you know the models, the ports, and how to drive Nmap, Tcpdump, and Wireshark, you can discover, monitor, and investigate any traffic on a network.

---

## 30-Second Revision

- Ports direct traffic: HTTP 80, HTTPS 443, SSH 22, DNS 53, SMTP 25, POP3 110, IMAP 143, RDP 3389.
- The OSI model has seven layers (Please Do Not Throw Sausage Pizza Away); TCP/IP condenses them into Application, Transport, Internet, and Link.
- Routing happens at Layer 3; TCP is reliable and connection-oriented while UDP is fast and connectionless.
- CIDR sets the network size (/24 = 255.255.255.0); private ranges are 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16.
- DHCP assigns addresses via DORA, ARP maps IP to MAC, ICMP handles diagnostics, and NAT translates private to public.
- Secure protocols wrap plaintext ones — Telnet becomes SSH, HTTP becomes HTTPS, and FTP becomes FTPS or SFTP.
- Wireshark display filters (like `tcp.port==80`) analyze a capture after the fact; tcpdump captures from the command line; Nmap discovers and scans with flags such as `-sS`, `-sV`, and `-Pn`.

---

## Interview Questions

**Q1. What is the difference between TCP and UDP?**
TCP is reliable and connection-oriented, using a three-way handshake and retransmitting lost data, so it suits downloads, SSH, and HTTPS. UDP is connectionless and faster with no retransmission, so it suits streaming, gaming, and DNS.

**Q2. Which OSI layer performs routing, and what operates there?**
Layer 3, the Network layer, performs routing. IP addressing and routers operate at this layer to move packets between networks.

**Q3. What are the private IP address ranges?**
`10.0.0.0/8`, `172.16.0.0/12`, and `192.168.0.0/16`. These are reserved for internal networks and are translated to a public address by NAT before reaching the Internet.

**Q4. What is the difference between HTTP and HTTPS, and their ports?**
HTTP (port 80) sends web traffic in plaintext, while HTTPS (port 443) wraps the same traffic in TLS to provide confidentiality and integrity, protecting it from interception.

**Q5. What does the Nmap `-sS` flag do, and why is `-Pn` useful?**
`-sS` runs a stealth TCP SYN scan that never completes the handshake, making it quieter. `-Pn` skips host discovery and treats the target as online, which is essential when a host blocks ping.

---

## Final Takeaway

The Mystery Chest is your one-page memory aid for the **Networking module**. Skim it before any lab, exam, or interview: the port tables, the **OSI** and **TCP/IP** models, **CIDR** and private ranges, the core and secure protocols, and the **Wireshark**, **Tcpdump**, and **Nmap** references here cover the vast majority of what you will meet on a network. Because networking is consistently layered and port-driven, mastering how the models, addresses, protocols, and tools fit together is what lets you confidently discover, monitor, and investigate traffic anywhere.
