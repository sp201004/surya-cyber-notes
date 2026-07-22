| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Networking / Nmap |
| **Difficulty** | Beginner |
| **Time** | ~55 Minutes |
| **Module** | Networking |

---

## Objective

This room introduces **Nmap (Network Mapper)**, one of the most widely used network scanning and security auditing tools. It walks through the full reconnaissance workflow: discovering live hosts, scanning TCP and UDP ports, detecting services and versions, guessing operating systems, controlling scan speed, and saving professional reports.

By the end of this room you will be able to:

- Explain what Nmap is and why reconnaissance matters
- Discover live hosts with ping scans and choose the right target formats
- Scan TCP ports with connect (`-sT`) and SYN stealth (`-sS`) scans, and UDP ports with `-sU`
- Use fast scans (`-F`), port ranges (`-p`), and full port scans (`-p-`)
- Detect service versions (`-sV`), operating systems (`-O`), and run aggressive scans (`-A`)
- Skip host discovery with `-Pn` and control speed with timing templates (`-T0`–`-T5`)
- Save results in normal, XML, grepable, and combined formats (`-oN`, `-oX`, `-oG`, `-oA`)

> **Warning:** Only scan systems you own or have **explicit written authorisation** to test. Nmap is an active tool that sends real packets, and unauthorised scanning is illegal in many jurisdictions and can trigger intrusion detection systems.

---

## Task 1 — What Is Nmap and Why Use It

**Nmap (Network Mapper)** is one of the world's most popular network scanning and security auditing tools. It is used to discover live hosts, find open ports, detect running services, identify service versions, guess operating systems, and support broader security assessments.

Imagine you are connected to a network with hundreds of devices. Checking every IP by hand, pinging each host, and testing every port individually is painfully slow. Nmap scans an entire network in seconds, detects active machines, identifies open ports, and gathers information before a penetration test. This early information-gathering stage is called **Reconnaissance**.

### Nmap Workflow

Nmap moves through a predictable set of stages, from a raw target to a finished report:

```text
Target
   │
   ▼
Host Discovery
   │
   ▼
Port Scan
   │
   ▼
Version Detection
   │
   ▼
OS Detection
   │
   ▼
Reporting
```

### Prerequisites

Before learning Nmap you should be comfortable with the underlying networking concepts: **TCP/IP** (the core protocol suite Nmap probes), **IPv4 addressing** (to specify hosts, ranges, and subnets), **ports** (Nmap's main job is finding open/closed ports), **TCP** (connection-oriented scans rely on the handshake), **UDP** (connectionless services need a different scan type), and **ICMP** (used heavily during host discovery).

> **Tip:** Reconnaissance is the foundation of every engagement. You can't secure or attack what you haven't discovered, so mastering Nmap early pays off across the rest of your security learning.

---

## Task 2 — Host Discovery

**Host discovery** answers a single question before any port scanning happens: *which devices are currently online?* Scanning only the live systems (and skipping offline ones) saves a large amount of time.

### Ways to Specify Targets

Nmap supports several target formats, so you can scan anything from a single machine to an entire subnet:

| Format | Example | Meaning |
|--------|---------|---------|
| **Single host** | `nmap 192.168.1.10` | Scans one machine. |
| **IP range** | `nmap 192.168.1.1-10` | Scans `192.168.1.1` through `192.168.1.10`. |
| **CIDR subnet** | `nmap 192.168.1.0/24` | Scans `192.168.1.0`–`192.168.1.255` (256 addresses). |
| **Hostname** | `nmap google.com` | Resolves DNS automatically, then scans. |

Each of these forms is a valid target specification:

```bash
nmap 192.168.1.10
nmap 192.168.1.1-10
nmap 192.168.1.0/24
nmap google.com
```

### Ping Scan (`-sn`)

The `-sn` option performs **host discovery only** — no port scanning. It simply reports which hosts are up:

```bash
sudo nmap -sn 192.168.1.0/24
```

```text
Host is up
Host is up
Host is up
...
7 hosts up
```

### Why sudo?

Throughout this room Nmap is run with `sudo` because many scan types require **raw packets**. Without root privileges, some scan types are unavailable, results are less accurate, and Nmap silently falls back to simpler scans.

> **Tip:** When a scan behaves unexpectedly or returns fewer details than you expect, check whether you forgot `sudo`. Privileged scans like SYN scans need raw packet access.

### Local Network Discovery

On a local Wi-Fi network such as `192.168.66.0/24`, run:

```bash
sudo nmap -sn 192.168.66.0/24
```

```text
Nmap scan report for 192.168.66.1
Host is up
MAC Address: 44:DF:65:...

Nmap scan report for 192.168.66.88
Host is up
```

On a **local LAN**, Nmap mainly uses **ARP** because it is faster and more reliable than ICMP:

```text
Who has 192.168.66.10?
        │
        ▼
   ARP Broadcast
        │
        ▼
  Device replies
        │
        ▼
    Host is Up
```

Because ARP replies reveal hardware addresses, Nmap can also display the **MAC address**, which can be mapped to a vendor (Espressif, Apple, VMware, Dell, Cisco) to identify device manufacturers.

### Remote Network Discovery

When the target is on another network, ARP cannot be used. Instead Nmap sends ICMP Echo, TCP SYN, TCP ACK, or ICMP Timestamp probes depending on the situation:

```text
Your PC ──► Router ──► Internet ──► Target
```

```bash
sudo nmap -sn 192.168.11.0/24
```

If ICMP is blocked, Nmap can fall back to TCP probes to confirm a host is alive:

```text
   TCP SYN
      │
      ▼
  Port 443
      │
      ▼
  SYN-ACK
      │
      ▼
  Host is Up
```

This makes Nmap more reliable than a simple `ping`. Note that a `Destination Unreachable` ICMP message does **not** always mean the host is offline — it can indicate a network issue, a firewall, or a blocked path.

### More Host Discovery Options

Nmap lets you customise the discovery probes it sends:

| Option | Name | Example |
|--------|------|---------|
| **`-PS`** | TCP SYN Ping | `sudo nmap -PS80,443 target` |
| **`-PA`** | TCP ACK Ping | `sudo nmap -PA80 target` |
| **`-PU`** | UDP Ping | `sudo nmap -PU53 target` |

```bash
sudo nmap -PS80,443 target
sudo nmap -PA80 target
sudo nmap -PU53 target
```

UDP ping is especially useful when ICMP is blocked.

### List Scan (`-sL`)

Sometimes you only want to see **what would be scanned** without sending any packets. The `-sL` list scan does exactly that:

```bash
nmap -sL 192.168.0.0/24
```

```text
192.168.0.0
192.168.0.1
192.168.0.2
...
192.168.0.255
```

No packets are sent and no hosts are scanned.

### Discovery Options Compared

| Command | Behaviour |
|---------|-----------|
| **`-sL`** | Lists targets only; sends no packets. |
| **`-sn`** | Finds live hosts; no port scan. |
| **`nmap target`** | Default: host discovery **and** port scan. |

> **Security relevance:** On a company network of 500 machines, a single `sudo nmap -sn 10.10.10.0/24` might reveal only 42 live hosts. Narrowing to those systems before deeper scanning drastically cuts scan time and network noise.

---

## Task 3 — Port Scanning: Who Is Listening

After discovering live hosts, the next step is to find **which services are running** on them. A service listens on a **TCP** or **UDP** port so clients can communicate with it.

| Service | Protocol | Default Port |
|---------|----------|-------------:|
| HTTP | TCP | 80 |
| HTTPS | TCP | 443 |
| SSH | TCP | 22 |
| FTP | TCP | 21 |
| DNS | UDP/TCP | 53 |
| DHCP | UDP | 67, 68 |
| NTP | UDP | 123 |

### What Is a Port?

A **port** is a logical communication endpoint used by applications. Think of it like an apartment building: the IP address is the building, the port number is the apartment, and the service is the person living there. So `192.168.1.20` might expose SSH on port 22, HTTP on port 80, and HTTPS on port 443.

### TCP vs UDP

| Protocol | Characteristics | Example services |
|----------|-----------------|------------------|
| **TCP** | Connection-oriented, reliable, three-way handshake, error checking, ordered delivery. | SSH, HTTP, HTTPS, FTP, SMTP |
| **UDP** | Connectionless, faster, no handshake, no guaranteed delivery. | DNS, DHCP, VoIP, streaming, online games |

### TCP Three-Way Handshake

Before TCP communication begins, the client and server complete a three-way handshake. Different Nmap scan types interact with this handshake differently:

```text
Client                          Server
  │                                │
  │ ─────────── SYN ─────────────► │
  │                                │
  │ ◄────────  SYN + ACK ────────  │
  │                                │
  │ ─────────── ACK ─────────────► │
  │                                │
  │      Connection Established    │
```

### TCP Connect Scan (`-sT`)

The `-sT` connect scan performs the **entire** TCP three-way handshake, then tears the connection down:

```text
SYN → SYN-ACK → ACK → Connection Established → RST → Connection Closed
```

```bash
sudo nmap -sT 192.168.1.15
```

An open port completes the handshake (SYN → SYN-ACK → ACK → OPEN), while a closed port replies with RST-ACK (CLOSED).

| Aspect | Detail |
|--------|--------|
| **Advantages** | Simple, works without raw packets, supported everywhere. |
| **Disadvantages** | Fully establishes the connection, easier to detect, generates more logs, slower. |

### SYN Scan / Stealth Scan (`-sS`)

The `-sS` SYN scan — also called a **half-open** or **stealth** scan — stops midway through the handshake and never sends the final ACK:

```text
SYN → SYN-ACK → RST → Connection Closed
```

Because many services only log **completed** TCP connections, and Nmap never completes the handshake, fewer logs are generated — hence "stealth". An open port replies with SYN-ACK (Nmap then sends RST); a closed port replies with RST-ACK.

```bash
sudo nmap -sS 192.168.1.20
```

| Aspect | Detail |
|--------|--------|
| **Advantages** | Fast, less detectable, industry standard, default for privileged users. |
| **Disadvantages** | Requires `sudo` because raw packets are needed. |

### Connect Scan vs SYN Scan

| Feature | Connect Scan | SYN Scan |
|---------|--------------|----------|
| **Option** | `-sT` | `-sS` |
| **Completes handshake** | Yes | No |
| **Faster** | No | Yes |
| **Logs generated** | More | Less |
| **Requires sudo** | No | Yes |
| **Stealth** | No | Yes |

### UDP Scan (`-sU`)

UDP has no handshake, so the `-sU` scan sends a UDP packet and interprets the response (or lack of one):

```bash
sudo nmap -sU target
```

- An `ICMP Port Unreachable` reply means the port is **closed**.
- **No reply** means the port is **open** or **open|filtered**.

Because most UDP services ignore unknown packets and never reply, Nmap must wait for timeouts, which makes UDP scans much slower than TCP scans. Common UDP services include DNS (53), DHCP (67), TFTP (69), NTP (123), and SNMP (161).

### Fast Scan (`-F`)

Instead of scanning the default 1000 ports, the `-F` fast scan checks only the 100 most common ports — ideal for quick reconnaissance:

```bash
sudo nmap -F target
```

### Port Ranges (`-p`) and All Ports (`-p-`)

The `-p` option selects exactly which ports to scan:

| Syntax | Meaning |
|--------|---------|
| **`-p22`** | A single port. |
| **`-p22,80,443`** | Multiple specific ports. |
| **`-p20-100`** | A range of ports. |
| **`-p-`** | All 65,535 TCP ports. |

```bash
sudo nmap -p22,80,443 target
sudo nmap -p- target
```

Scanning all ports is much slower but finds uncommon services. Ports **1–1023** are the **well-known ports** where most important services live (FTP 21, SSH 22, Telnet 23, SMTP 25, DNS 53, HTTP 80, POP3 110, IMAP 143, HTTPS 443).

### Example Workflow

A typical port-scanning flow combines discovery and scanning — first find live hosts, then scan one:

```bash
sudo nmap -sn 192.168.1.0/24
sudo nmap -sS 192.168.1.20
```

```text
22/tcp  open  ssh
80/tcp  open  http
443/tcp open  https
```

> **Security relevance:** A targeted scan such as `sudo nmap -sS -p22,80,443 server.company.com` is faster and generates far less traffic than a full 65,535-port sweep, while still revealing the key services (SSH for admin, HTTP for the site, HTTPS for encrypted access).

---

## Task 4 — Version and OS Detection

Discovering open ports is only the beginning. The more valuable question is *what service is running on that port?* Finding "Port 80 open" is useful, but finding "Port 80 → Apache HTTP Server 2.4.58" helps you identify software versions, vulnerabilities, misconfigurations, and possible exploits.

### OS Detection (`-O`)

The `-O` option attempts to determine the target operating system:

```bash
sudo nmap -O 192.168.1.15
```

```text
Running: Linux 5.X
OS Details: Linux 5.4 - 5.15
```

Nmap crafts special packets and compares the responses against a large fingerprint database:

```text
Packets → Fingerprint → Database Match → Possible Operating System
```

It analyses TCP window size, TCP flags, TTL values, ICMP responses, and sequence numbers. Detection is an **educated guess** — accuracy depends on firewalls, network devices, OS configuration, and packet filtering — but it remains very useful.

### Service Version Detection (`-sV`)

The `-sV` option probes open ports to identify the service name, version, and extra details rather than just "open":

```bash
sudo nmap -sV 192.168.1.15
```

```text
22/tcp open ssh OpenSSH 8.9p1 Ubuntu
```

```text
Open Port → Nmap Sends Probes → Service Replies → Version Identified
```

Version detection matters because older versions may carry known vulnerabilities. Once you know a version, you can search a CVE database for a known exploit:

```text
Service → Version → Search CVE Database → Known Exploit
```

### Aggressive Scan (`-A`)

The `-A` aggressive scan combines several capabilities into one command:

```bash
sudo nmap -A target
```

| Feature enabled by `-A` | Purpose |
|-------------------------|---------|
| **OS detection** | Guess the operating system. |
| **Version detection** | Identify service names and versions. |
| **Script scanning** | Run default NSE scripts. |
| **Traceroute** | Map the path to the target. |

It replaces running `-O`, `-sV`, and `--traceroute` separately. Use it in **lab environments, internal assessments, and CTFs**, but avoid it on production systems unless authorised, because it generates significantly more traffic.

### Skip Host Discovery (`-Pn`)

Normally Nmap checks whether a host is alive before scanning ports. If ICMP is blocked or firewalls ignore pings, Nmap may wrongly conclude the host is down. The `-Pn` option tells Nmap to treat every host as online and skip discovery:

```bash
sudo nmap -Pn target
```

```text
No Ping → Direct Port Scan
```

Use `-Pn` when a firewall blocks ICMP, ping is disabled, or during internal assessments. Be careful: running `-Pn` against many offline hosts wastes time.

> **Warning:** Aggressive (`-A`) and version scans are loud and easily logged. Confirm you have authorisation before running them, and prefer targeted, lighter scans on production networks.

---

## Task 5 — Scan Timing and Performance

Scanning too quickly can trigger an IDS or IPS and overload slow devices, so Nmap lets you control scan speed.

### Timing Templates (`-T0`–`-T5`)

Timing templates run from slowest and stealthiest to fastest and loudest:

| Option | Name | When to use |
|--------|------|-------------|
| **`-T0`** | Paranoid | Very slow; used to avoid detection. |
| **`-T1`** | Sneaky | Slow; reduces network noise. |
| **`-T2`** | Polite | Good for slow or fragile networks. |
| **`-T3`** | Normal (default) | Balanced speed. |
| **`-T4`** | Aggressive | Fast; best for CTFs and labs. |
| **`-T5`** | Insane | Very fast; can be inaccurate on unstable networks. |

```text
Slowest  T0 → T1 → T2 → T3 → T4 → T5  Fastest
```

```bash
sudo nmap -sS -T4 target
```

### Parallelism, Packet Rate, and Host Timeout

Finer-grained flags give you direct control over throughput:

| Option | Purpose |
|--------|---------|
| **`--min-parallelism`** | Minimum number of probes sent simultaneously. |
| **`--max-parallelism`** | Maximum number of probes sent simultaneously. |
| **`--min-rate`** | Minimum packets sent per second. |
| **`--max-rate`** | Maximum packets sent per second. |
| **`--host-timeout`** | Maximum time to wait for a single host. |

Higher parallelism means faster scans but more traffic; `--min-rate` guarantees a packet rate in fast labs; and `--host-timeout` skips slow hosts on unreliable networks:

```bash
sudo nmap --min-parallelism 20 target
sudo nmap --min-rate 1000 target
sudo nmap --host-timeout 30s target
```

> **Security relevance:** A single `sudo nmap -A 192.168.1.100` might reveal `lighttpd 1.4.74` on port 80, `OpenSSH 9.2` on port 22, and a Linux 5.x host — enough to begin researching known vulnerabilities for each version.

---

## Task 6 — Output and Reporting

Finding information is useful, but saving it properly is essential. Professional testers always generate reports, and Nmap supports several output formats.

### Verbosity and Debugging

| Option | Effect |
|--------|--------|
| **`-v`** | Verbose: shows scan progress, hosts discovered, and open ports as they are found. |
| **`-vv`** | Double verbose: even more detail, useful on long scans. |
| **`-d`** | Debug output; higher levels (`-d2`…`-d5`) for troubleshooting. |

```bash
sudo nmap -v target
sudo nmap -d target
```

### Saving Results

Rather than only printing to the terminal, save scans to files:

| Option | Output format | Best for |
|--------|---------------|----------|
| **`-oN`** | Normal text | Human-readable reports. |
| **`-oX`** | XML | Automation, parsing, importing into other tools. |
| **`-oG`** | Grepable | `grep`, `awk`, `sed`, and shell scripts. |
| **`-oA`** | All formats at once | The most commonly used option. |

Each format is chosen with its own flag, and `-oA` writes `report.nmap`, `report.xml`, and `report.gnmap` in one go:

```bash
sudo nmap -oN scan.txt target
sudo nmap -oX scan.xml target
sudo nmap -oG scan.gnmap target
sudo nmap -A -oA company_scan target
```

Saved reports (for example `company_scan.nmap` or `company_scan.xml`) can be reviewed later without rescanning — valuable for incident response, penetration testing, and documentation.

### Practical Reconnaissance Workflow

A real engagement chains these stages together, with Nmap doing most of its work during reconnaissance:

```text
Target
   │
   ▼
Host Discovery
   │
   ▼
Port Scan
   │
   ▼
Version Detection
   │
   ▼
OS Detection
   │
   ▼
Save Report
   │
   ▼
Vulnerability Research
   │
   ▼
Exploitation
   │
   ▼
Reporting
```

> **Tip:** Watch out for common beginner mistakes — forgetting `sudo`, accidentally scanning a huge range like `10.0.0.0/8` instead of `10.0.0.0/24`, assuming `filtered` means `closed` (it usually means a firewall), ignoring UDP services, and defaulting to `-A` everywhere when a lighter scan would do.

---

## Task 7 — Common Nmap Commands

The everyday commands you will reach for most often, grouped by purpose:

```bash
# Discovery
sudo nmap -sn 192.168.1.0/24
sudo nmap -Pn target

# Port scanning
sudo nmap -sS target
sudo nmap -sT target
sudo nmap -sU target
sudo nmap -F target
sudo nmap -p22,80,443 target
sudo nmap -p- target

# Detection and reporting
sudo nmap -sV target
sudo nmap -O target
sudo nmap -A target
sudo nmap -oA report target
```

---

## Quick Revision

| Area | Key points |
|------|-----------|
| **Host discovery** | `-sn` finds live hosts; `-sL` lists targets only; local LANs use ARP, remote networks use ICMP/TCP/UDP probes. |
| **Port scanning** | `-sT` full connect scan, `-sS` half-open stealth scan (needs sudo), `-sU` UDP, `-F` fast, `-p`/`-p-` port selection. |
| **Detection** | `-sV` service versions, `-O` operating system, `-A` aggressive (OS + version + scripts + traceroute). |
| **Discovery control** | `-Pn` skips host discovery and assumes the target is online. |
| **Timing** | `-T0` (slowest) through `-T5` (fastest); `-T3` is default, `-T4` is common in labs. |
| **Output** | `-oN` normal, `-oX` XML, `-oG` grepable, `-oA` all formats; `-v`/`-d` add verbosity/debugging. |

**Key idea:** Nmap turns a raw target into actionable intelligence by moving through host discovery, port scanning, and version/OS detection — then saving it all in a report, because you can't secure or attack what you haven't discovered.

---

## 30-Second Revision

- Nmap is a network scanner used for reconnaissance: live hosts, open ports, services, versions, and OS guesses.
- `-sn` performs host discovery only; `-sL` just lists targets without sending packets.
- `-sT` completes the TCP handshake; `-sS` is the stealth half-open scan and needs `sudo`; `-sU` scans UDP and is slow.
- `-F` scans the 100 common ports, `-p` picks specific ports, and `-p-` scans all 65,535 TCP ports.
- `-sV` finds service versions, `-O` guesses the OS, and `-A` bundles OS + version + scripts + traceroute.
- `-Pn` skips host discovery; timing runs `-T0` (paranoid) to `-T5` (insane), with `-T3` as default.
- Save results with `-oN`, `-oX`, `-oG`, or `-oA` (all formats), and always scan only authorised targets.

---

## Cheat Sheet

| Option | Purpose |
|--------|---------|
| `-sn` | Ping scan — host discovery only. |
| `-sL` | List scan — list targets, send no packets. |
| `-PS` | TCP SYN ping. |
| `-PA` | TCP ACK ping. |
| `-PU` | UDP ping. |
| `-sS` | TCP SYN (stealth / half-open) scan; needs sudo. |
| `-sT` | TCP connect scan (full handshake). |
| `-sU` | UDP scan. |
| `-F` | Fast scan (100 common ports). |
| `-p22` | Scan a single port. |
| `-p22,80,443` | Scan multiple specific ports. |
| `-p20-100` | Scan a port range. |
| `-p-` | Scan all 65,535 TCP ports. |
| `-sV` | Service version detection. |
| `-O` | Operating system detection. |
| `-A` | Aggressive scan (OS + version + scripts + traceroute). |
| `-Pn` | Skip host discovery; assume host is online. |
| `-T0`–`-T5` | Timing templates: paranoid → insane (`-T3` default). |
| `--min-rate` / `--max-rate` | Control packets sent per second. |
| `--host-timeout` | Maximum wait time per host. |
| `-v` / `-vv` | Verbose / double-verbose output. |
| `-d` | Debug output. |
| `-oN` / `-oX` / `-oG` / `-oA` | Normal / XML / grepable / all output formats. |

### Scan Types at a Glance

| Scan | Option | Protocol | Handshake | Needs sudo | Notes |
|------|--------|----------|-----------|-----------|-------|
| Connect | `-sT` | TCP | Full | No | Simple, noisy, more logs. |
| SYN / Stealth | `-sS` | TCP | Half-open | Yes | Fast, stealthy, default for root. |
| UDP | `-sU` | UDP | None | Yes | Slow due to timeouts. |
| Fast | `-F` | TCP | — | No | 100 most common ports. |
| All ports | `-p-` | TCP | — | No | All 65,535 ports; slow but thorough. |

---

## Interview Questions

**Q1. What is Nmap?**
Nmap (Network Mapper) is a network discovery and security auditing tool used to find live hosts, open ports, services, versions, and operating systems during reconnaissance.

**Q2. Which option performs host discovery only, and which just lists targets?**
`-sn` performs a ping scan that only discovers live hosts without scanning ports. `-sL` lists the target addresses without sending any packets.

**Q3. What is the difference between `-sS` and `-sT`?**
`-sS` is a SYN (half-open) scan that never completes the TCP handshake, making it faster and stealthier but requiring raw packet privileges (`sudo`). `-sT` completes the full three-way handshake, needs no special privileges, but is easier to detect and generates more logs.

**Q4. Why is a SYN scan called a stealth scan?**
Because it never finishes the TCP handshake, and many services only log completed connections, so a SYN scan tends to generate fewer log entries.

**Q5. What do `-sV`, `-O`, and `-A` do?**
`-sV` detects service names and versions, `-O` guesses the operating system, and `-A` is an aggressive scan that combines OS detection, version detection, NSE script scanning, and traceroute.

**Q6. What is the purpose of `-Pn`?**
It skips host discovery and treats the target as online, which is useful when a firewall blocks ICMP or ping is disabled.

**Q7. Which timing template is the default, and which is common in labs?**
`-T3` (Normal) is the default. `-T4` (Aggressive) is commonly used in labs and CTFs for faster scans.

**Q8. How do you save all output formats at once, and why is version detection valuable?**
`-oA report` writes normal, XML, and grepable files together. Version detection is valuable because knowing the exact software version lets you search CVE databases for known vulnerabilities.

---

## Final Takeaway

**Nmap** is the **reconnaissance** workhorse of network security, taking you from an unknown target to a detailed map of live hosts, **open ports**, running **services**, and likely operating systems. This room builds that workflow step by step: discover hosts with `-sn`, scan ports with `-sT`, `-sS`, and `-sU`, narrow or widen scope with `-F`, `-p`, and `-p-`, then enrich the picture with `-sV`, `-O`, and `-A` while controlling speed through **timing templates** and saving everything with `-oA`. Used responsibly and only against authorised systems, Nmap forms the foundation for vulnerability assessment and penetration testing — because you can't secure or attack what you haven't discovered.
