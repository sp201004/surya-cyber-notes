#### Module Overview
Congratulations! You have successfully walked through the entire **Network Fundamentals** module. Here is a comprehensive digest of everything you have learned to consolidate your security analyst skillset.

---

### Network Map Recap
Here is how all the foundational rooms connect into a single unified flow:

```text
[ Room 1: What is Networking? ]  <── Basics: Local vs. Wide area networks
               │
[ Room 2: Intro to LAN ]         <── MAC, IP addresses, Switches, Routers
               │
[ Room 3: OSI Model ]            <── 7 theoretical layers of data flow
               │
[ Room 4: Packets & Frames ]     <── TCP vs. UDP transport & the 3-Way Handshake
               │
[ Room 5: Extending Your LAN ]   <── Public vs. Private IPs, NAT, and DNS records
```

---

### Security Analyst Network Diagnostics Toolkit
As a Security Analyst or Blue Team Defender, you will frequently use these commands to analyze networks and troubleshoot connectivity issues:

| Command | Purpose | Key Example / Security Use Case |
|---|---|---|
| **ping** | Checks basic network connectivity to a host | `ping 8.8.8.8` (Verify internet access) |
| **traceroute** / **tracert** | Maps the path packets take across routers | `traceroute google.com` (Find network bottleneck/malicious hop) |
| **ifconfig** / **ipconfig** | Displays network card configurations | `ipconfig /all` (Retrieve MAC and internal IPv4 gateway) |
| **nslookup** / **dig** | Queries DNS records for a domain | `nslookup tryhackme.com` (Investigate potential DNS hijacking/spoofing) |

---

### Standard Ports & Security Mappings
Keep these common ports and protocols at your fingertips during SOC analyses:

| Port | Protocol | Usage | Security Profile |
|---|---|---|---|
| **21** | FTP | File Transfer Protocol | Cleartext (Unsecure) |
| **22** | SSH | Secure Shell | Secure remote terminal access |
| **23** | Telnet | Terminal Network | Cleartext (Unsecure) |
| **25** | SMTP | Simple Mail Transfer Protocol | Email transmission |
| **53** | DNS | Domain Name System | Domain resolution |
| **80** | HTTP | HyperText Transfer Protocol | Cleartext Web Traffic |
| **443** | HTTPS | HTTP Secure (uses TLS) | Encrypted Web Traffic |

---

#### Interview Practice
- **What happens when you type a URL into a web browser?**
  1. **DNS Lookup:** Browser checks cache, then queries a DNS server to resolve domain (e.g. `google.com`) to an IP address.
  2. **TCP Connection:** Browser initiates a TCP 3-Way Handshake (SYN -> SYN-ACK -> ACK) with the IP on port 443.
  3. **TLS Handshake:** Secure encryption tunnel is established.
  4. **HTTP Request:** Browser sends an HTTP GET request for the web content.
  5. **Response Rendering:** Server responds, and browser renders HTML, CSS, and JavaScript.
- **Why is HTTPS preferred over HTTP?** HTTP sends data in cleartext, meaning anyone sniffing network packets can steal credentials. HTTPS encrypts traffic using TLS/SSL, ensuring confidentiality and integrity.
- **Why is a MAC address called a physical address?** It is permanently burned into the hardware's Network Interface Card (NIC) by the manufacturer, whereas an IP address is logical and can change dynamically.

## Contents

- [Module Overview](#module-overview)
- [Network Map Recap](#network-map-recap)
- [Security Analyst Network Diagnostics Toolkit](#security-analyst-network-diagnostics-toolkit)
- [Standard Ports & Security Mappings](#standard-ports-&-security-mappings)
- [Interview Practice](#interview-practice)
- [Memory Tricks](#memory-tricks)
- [Quick Revision](#quick-revision)
- [Final Summary](#final-summary)

## Memory Tricks

```text
Network Diagnostics & Security
│
├── DHCP ──> Dynamic Host Configuration Protocol (Assigns IP, Gateway, DNS automatically)
├── DNS  ──> Domain Name System (Resolves names to IPs)
└── NAT  ──> Network Address Translation (Shields LAN with a single public WAN IP)
```

## Quick Revision

| | |
|---|---|
| **Module** | Network Fundamentals |
| **Room** | Module Summary |
| **Difficulty** | Easy |
| **Status** | Completed |

## Final Summary

- **Networks** allow digital resource sharing and communication via standardized communication channels.
- **Local Area Networks** (LAN) use **switches** to coordinate physical frames inside local boundaries.
- **Wide Area Networks** (WAN) expand locally using **routers**, **NAT**, and hierarchical **DNS** directories.
- The **OSI Model** defines 7 layers of structured encapsulation wrapping data down to copper, light, or waves.
- **TCP** (reliable, connection-oriented) and **UDP** (fast, connectionless) are the primary transport models.
