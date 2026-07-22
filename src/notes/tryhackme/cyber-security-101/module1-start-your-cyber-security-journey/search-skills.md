| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Search Skills / OSINT |
| **Difficulty** | Beginner |
| **Time** | ~15 Minutes |
| **Module** | Start Your Cyber Security Journey |

---

## Objective

This room teaches one of the most important skills in Cyber Security: **searching**.

Cybersecurity professionals spend a significant amount of their time searching for information. Knowing **how** to search is often more valuable than memorizing every tool.

You will learn how to use:

- Shodan
- VirusTotal
- CVE Databases
- Linux MAN Pages
- GitHub

These resources are used daily by:

-  Penetration Testers
-  SOC Analysts
-  Incident Responders
-  Threat Hunters
-  Malware Analysts
-  Security Researchers

---

## Task 1 — Introduction

Cybersecurity is **not** about memorizing tools. Instead, professionals know:

-  Where information exists
-  How to search
-  Which website contains the answer

This room introduces websites that help security professionals collect intelligence during investigations. These services are useful for **both** Offensive Security and Defensive Security.

### Why Search Skills Matter

Imagine you discover:

- Unknown IP Address
- Strange File
- Weird Domain
- Open Port
- Unknown Software Version

What do you do? You **search**. Professional investigators rarely guess — instead they gather intelligence.

### Real Example

A SOC Analyst notices an IP address `185.243.xxx.xxx`. Instead of guessing, they investigate it through trusted sources:

```
IP Address
   │
   ▼
VirusTotal
   │
   ▼
Shodan
   │
   ▼
AbuseIPDB
   │
   ▼
WHOIS
   │
   ▼
CVE Database
   │
   ▼
Determine if malicious
```

### Information Gathering Workflow

```
Unknown Target
      │
      ▼
Collect Information
      │
      ▼
Identify Technology
      │
      ▼
Search Vulnerabilities
      │
      ▼
Find Exploits
      │
      ▼
Perform Investigation
```

> **Remember:** Searching is a cybersecurity skill. Good investigators don't know everything — they know where to find everything.

---

## Task 2 — Shodan

### What is Shodan?

**Shodan** is a search engine that indexes devices connected to the Internet.

Unlike Google, which searches **content**, Shodan searches **devices**.

**Google searches:**

- Websites
- Images
- Videos
- Documents

**Shodan searches:**

- Servers
- Routers
- Firewalls
- CCTV Cameras
- Databases
- IoT Devices
- Printers
- NAS Devices
- Industrial Control Systems (ICS)
- Smart Devices

> **Memory Trick:** Google searches **CONTENT** — Shodan searches **DEVICES**.

### What is IoT?

**IoT = Internet of Things** — physical devices connected to the Internet that communicate without human interaction.

Examples: Smart TV, Smart Camera, Smart Watch, Smart Door Lock, Smart Thermostat, Smart Light, Industrial Sensors.

### How Shodan Works

Instead of waiting for websites to appear, Shodan actively scans the Internet:

```
Internet
     │
     ▼
Shodan Scanner
     │
     ▼
Visits Every Public IP
     │
     ▼
Reads Open Ports
     │
     ▼
Collects Banners
     │
     ▼
Stores Information
```

### What is Banner Grabbing?

Whenever a service responds, it often reveals information. Example:

```
HTTP/1.1 200 OK
Apache/2.4.57
Ubuntu
OpenSSL 3.0
```

This information is called a **banner**. A banner tells us:

-  Software Name
-  Version
-  Operating System
-  Protocol
-  Server Type

### Example Banner

```http
HTTP/1.1 200 OK
Server: Apache/2.4.1
Content-Type: text/html
Date: Mon, 01 Jul
```

From this banner we learn:

| Field | Value |
|-------|-------|
| Web Server | Apache |
| Version | 2.4.1 |

### Why Version Numbers Matter

Suppose **Apache 2.4.1** has a vulnerability. If Shodan finds **Apache 2.4.1**, the attacker immediately knows it is a **potential target**.

### Real Attack Workflow

```
Search
   │
   ▼
Apache 2.4.1
   │
   ▼
Thousands of Servers
   │
   ▼
Search CVE Database
   │
   ▼
Known Vulnerability
   │
   ▼
Possible Exploitation
```

### Common Uses of Shodan

| Blue Team | Red Team |
|-----------|----------|
| Asset Discovery | Reconnaissance |
| Exposure Monitoring | Fingerprinting |
| Detect Open Services | Enumeration |
| Verify Public Systems | Technology Detection |
| Threat Intelligence | Target Selection |

### Common Shodan Filters

| Filter | Purpose | Examples |
|--------|---------|----------|
| `country:` | Limit search to a country | `country:IN`, `country:US`, `country:JP` |
| `port:` | Search by port | `port:22` (SSH), `port:80` (HTTP), `port:443` (HTTPS), `port:3389` (Remote Desktop) |
| `hostname:` | Search a specific hostname | `hostname:tryhackme.com` |
| `org:` | Devices owned by an organization | `org:Amazon`, `org:Google`, `org:Microsoft` |

### Practical Exercise — TryScanMe

In this task, TryHackMe introduces a machine named **TryScanMe**. Your objective is to use **Shodan** to investigate the target and identify information about the exposed services.

Instead of scanning the machine yourself, you search Shodan's database because it has already indexed the target.

### Searching a Domain

Open <https://www.shodan.io> and search for `tryhackme.thm`. Shodan will display information collected during its Internet-wide scan.

Example information you may find:

-  IP Address
-  Open Ports
-  Running Services
-  Web Server
-  Hostname
-  Organization
-  Operating System (sometimes)
-  Geographic Location

### Understanding the Results

| Field | Value |
|-------|-------|
| Hostname | tryhackme.thm |
| IP Address | 10.x.x.x (Lab Example) |
| Open Ports | 22, 80, 443 |

The open ports mean:

| Port | Meaning |
|------|---------|
| 22 | SSH Remote Login |
| 80 | HTTP Website |
| 443 | HTTPS Secure Website |

### Attack Surface

Every exposed service increases the attack surface:

```
Internet
   │
   ▼
Target Server
 ├── SSH   (22)
 ├── HTTP  (80)
 └── HTTPS (443)
```

Each service should be reviewed for:

-  Weak Passwords
-  Vulnerabilities
-  Misconfiguration
-  Outdated Versions

### Shodan Search Examples

| Goal | Query |
|------|-------|
| Search Apache Servers | `apache` |
| Search Apache in India | `apache country:IN` |
| Search SSH Servers | `port:22` |
| Search Web Servers | `port:80` |
| Search HTTPS Servers | `port:443` |
| Search Microsoft Devices | `org:Microsoft` |
| Search Amazon Devices | `org:Amazon` |
| Search Cameras | `webcam` |
| Search NAS Devices | `nas` |
| Search Elasticsearch Servers | `product:Elasticsearch` |
| Search Jenkins Servers | `product:Jenkins` |

> **Important Note:** Shodan is intended for security research, asset discovery, exposure monitoring, and defensive assessments. **Never** use information obtained from Shodan to attack systems without explicit authorization. Only perform testing against TryHackMe, Hack The Box, your own systems, or authorized environments.

### Advantages of Shodan

-  Extremely Fast
-  No Need to Scan Yourself
-  Global Internet Visibility
-  Historical Data
-  Excellent OSINT Source

### Limitations

-  Results may not be real-time
-  Some devices block scanning
-  Internal/private networks cannot be indexed
-  Missing information if ports are closed

---

## Real-World Example — Shodan

Imagine a company accidentally exposes a server running **Apache 2.4.49**:

```
Apache 2.4.49 exposed
        │
        ▼
Attacker searches "Apache 2.4.49"
        │
        ▼
Thousands of vulnerable servers appear
        │
        ▼
Attacker checks CVE Database
        │
        ▼
Finds CVE-2021-41773
        │
        ▼
Downloads Public Exploit
        │
        ▼
Attempts exploitation
```

This demonstrates why organizations should continuously monitor their Internet-facing assets.

---

## Shodan Data Flow

```
                    Internet
                        │
                        ▼
              Shodan Internet Scanner
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
    Web Server      CCTV Camera      Router
        │               │               │
        ▼               ▼               ▼
      Banner          Banner          Banner
        │               │               │
        └───────────────┼───────────────┘
                        ▼
                 Shodan Database
                        │
                        ▼
                Security Researcher
```

---

## Task 3 — VirusTotal

### What is VirusTotal?

**VirusTotal** is a free online threat intelligence platform that analyzes suspicious files, URLs, domains, and IP addresses using multiple antivirus engines and security vendors.

Instead of relying on a single antivirus, VirusTotal compares results from dozens of security products simultaneously.

**Website: <https://www.virustotal.com>**

### Why Security Professionals Use VirusTotal

VirusTotal helps answer questions like:

-  Is this file malicious?
-  Has anyone seen this malware before?
-  Which antivirus vendors detect it?
-  Is this URL phishing?
-  Is this IP involved in attacks?
-  What relationships exist between files and domains?

### Supported Search Types

VirusTotal can analyze **Files, URLs, Domains, IP Addresses,** and **File Hashes**.

### What is a File Hash?

A **hash** is a unique digital fingerprint generated from a file. Even changing ONE character in a file completely changes its hash:

```
File
   │
   ▼
malware.exe
   │
   ▼
SHA256
   │
   ▼
A4C9E8F21F5A......
```

Hashes help identify files without sharing the file itself.

### Common Hash Algorithms

| Algorithm | Size | Notes |
|-----------|------|-------|
| MD5 | 128-bit | Fast; no longer secure for cryptographic purposes |
| SHA1 | 160-bit | Better than MD5; also considered weak today |
| SHA256 | 256-bit | Industry standard; most commonly used in cybersecurity |

> **Memory Trick:** MD5 = Old · SHA1 = Older · SHA256 = Modern.

### VirusTotal Scan Process

```
Upload File
     │
     ▼
Calculate Hash
     │
     ▼
Compare Existing Database
     │
     ▼
Scan with Multiple Antivirus Engines
     │
     ▼
Generate Report
```

### Detection Ratio

A detection ratio such as **52 / 70** means 52 security vendors detected the file as malicious, while 18 vendors did **not** detect it. A higher detection ratio means higher confidence that the file is malicious.

### Community Intelligence

VirusTotal also contains user comments, security research, community votes, and threat labels such as **Trojan, Ransomware, Spyware, Downloader,** and **Backdoor**.

### Relationships

VirusTotal links related objects together to help analysts investigate attacks:

```
Malware
   │
   ├── Domain
   ├── IP Address
   ├── URL
   ├── Certificate
   └── Other Malware Samples
```

---

## Real-World Example — VirusTotal

A SOC Analyst receives a file named `invoice.pdf.exe`, which looks suspicious:

```
invoice.pdf.exe (suspicious)
        │
        ▼
Upload to VirusTotal
        │
        ▼
Detection Ratio: 65 / 71
        │
        ▼
Threat Label: Trojan
        │
        ▼
Analyst isolates infected computer
        │
        ▼
Incident Response begins
```

---

## Blue Team Workflow

```
Suspicious File
      │
      ▼
Calculate SHA256
      │
      ▼
Search VirusTotal
      │
      ▼
Read Detection Report
      │
      ▼
Confirm Threat
      │
      ▼
Contain Incident
```

---

## Task 4 — Vulnerability Databases

### What is a Vulnerability?

A **vulnerability** is a weakness in software, hardware, or system configuration that can be exploited by an attacker. Examples: weak password, software bug, missing patch, misconfiguration.

### What is CVE?

**CVE = Common Vulnerabilities and Exposures** — a globally recognized catalog of publicly disclosed security vulnerabilities. Every published vulnerability receives a unique identifier.

Example: `CVE-2024-3094`

| Part | Meaning |
|------|---------|
| CVE | Common Vulnerabilities and Exposures |
| 2024 | Year Published |
| 3094 | Unique ID |

### MITRE

**MITRE** maintains the official CVE program. Responsibilities:

-  Assign CVE IDs
-  Publish vulnerability details
-  Coordinate researchers
-  Maintain vulnerability records

### National Vulnerability Database (NVD)

The **NVD** is maintained by **NIST**. It expands CVE information by adding severity score, CVSS metrics, references, patch information, and technical details.

**Website: <https://nvd.nist.gov>**

### CVSS

**CVSS = Common Vulnerability Scoring System**, used to measure the severity of vulnerabilities on a scale from **0.0 to 10.0**:

| CVSS Score | Severity |
|------------|----------|
| 0.0 | None |
| 1.0 – 3.9 | Low |
| 4.0 – 6.9 | Medium |
| 7.0 – 8.9 | High |
| 9.0 – 10.0 | Critical |

### CVE Lifecycle

```
Software Bug
      │
      ▼
Researcher Finds Bug
      │
      ▼
MITRE Assigns CVE
      │
      ▼
NVD Publishes Details
      │
      ▼
Organizations Patch Systems
```

---

## Task 5 — Technical Documentation

### Why Technical Documentation Matters

One of the most underrated cybersecurity skills is the ability to read and understand official documentation. Experienced professionals rarely memorize every command or option — instead, they know where to find reliable documentation quickly.

Common sources:

-  Linux MAN Pages
-  Official Vendor Documentation
-  GitHub Documentation
-  Tool Help Menus
-  RFCs (Request for Comments)

### Linux MAN Pages

**MAN = Manual Pages.** Linux systems include built-in manuals for most commands.

```
man <command>
```

Example: `man ls` opens the complete documentation for the `ls` command.

Running `man grep` provides:

-  Description
-  Syntax
-  Options
-  Examples
-  Exit Status
-  Related Commands

### Structure of a MAN Page

| Section | Contents |
|---------|----------|
| NAME | Command Name |
| SYNOPSIS | Command Syntax |
| DESCRIPTION | What the command does |
| OPTIONS | Available Arguments |
| EXAMPLES | Usage Examples |
| SEE ALSO | Related Commands |

### Useful Navigation Keys

| Key | Action |
|-----|--------|
| `Space` | Next Page |
| `b` | Previous Page |
| `/` | Search Text |
| `n` | Next Match |
| `q` | Quit |

### The --help Option

Most Linux commands support `--help`, for example `ls --help`, `grep --help`, `curl --help`. This displays a quick summary of available options.

| Command | Purpose |
|---------|---------|
| `man` | Detailed Documentation |
| `--help` | Quick Reference |

> **Real-World Example:** Suppose you forget the options for `find`. Instead of searching Google, run `man find` or `find --help` — this saves time and provides official documentation.

---

## Task 6 — GitHub

### What is GitHub?

**GitHub** is a platform for hosting software projects using Git. It allows developers and security researchers to collaborate, share code, report issues, and publish documentation.

**Website: <https://github.com>**

| Term | Meaning |
|------|---------|
| Git | Version Control System |
| GitHub | Cloud platform that hosts Git repositories |

### Repository

A **Repository (Repo)** stores source code, documentation, images, configuration files, releases, issues, and a wiki.

### Why Cybersecurity Professionals Use GitHub

-  Open Source Security Tools
-  Exploit Proof-of-Concept (PoC)
-  Detection Rules
-  YARA Rules
-  Sigma Rules
-  Scripts & Automation
-  Security Research

### Common Cybersecurity Projects

Nmap · Metasploit · OWASP Projects · Sigma Rules · Awesome Lists · Threat Intelligence · Blue Team Scripts · Red Team Tools

### Searching GitHub

Example searches: `"CVE-2024"`, `"Apache Exploit"`, `"Log4Shell"`, `"Detection Rules"`, `"YARA"`, `"Suricata"`.

> **Important Warning:** Never execute random GitHub scripts without understanding their functionality. Always read the README, review the code, verify the author, test in a lab, and use virtual machines.

### GitHub Data Flow

```
Developer
     │
     ▼
Upload Code
     │
     ▼
GitHub Repository
     │
 ┌───┼───┐
 ▼   ▼   ▼
README Issues Releases
     │
     ▼
Community Collaboration
```

---

## Search Skills Workflow

```
Unknown Target
      │
      ▼
Gather Information
      │
      ▼
Shodan
      │
      ▼
VirusTotal
      │
      ▼
Search CVE
      │
      ▼
Read Documentation
      │
      ▼
Search GitHub
      │
      ▼
Understand Risk
      │
      ▼
Take Action
```

---

## Important Terms

| Term | Definition |
|------|------------|
| Threat Intelligence | Information collected about cyber threats. |
| IOC (Indicator of Compromise) | Evidence suggesting a system has been compromised — e.g. malicious IP, file hash, domain, URL, registry key, process name. |
| Sandbox | An isolated environment used to safely execute suspicious files. |
| OSINT | Open Source Intelligence. |
| Repository | Storage location for code and documentation. |
| PoC (Proof of Concept) | A demonstration showing how a vulnerability can be exploited. |
| README | Documentation explaining a project. |

---

## Memory Tricks

| Resource | What it searches |
|----------|------------------|
| Google | Web Pages / Information |
| Shodan | Devices |
| VirusTotal | Malware Intelligence |
| CVE | Known Vulnerabilities |
| MAN | Linux Documentation |
| GitHub | Open Source Knowledge |

> **Think:** Google = Books · Shodan = Buildings.

---

## Common Mistakes

|  Mistake |  Reality |
|-----------|-----------|
| Thinking Shodan scans websites like Google | Shodan scans Internet-connected devices |
| Assuming Shodan data is always live | Some results may be from previous scans |
| Using Shodan for unauthorized attacks | Use it only in authorized environments |
| Trusting every GitHub repository | Verify the project before using it |
| Running unknown exploit scripts | Review code first |
| Ignoring documentation | Always read official manuals |
| Depending only on Google | Learn specialized cybersecurity resources |

---

## Quick Revision

| Concept | Meaning |
|---------|---------|
| Google | Searches Web Pages |
| Shodan | Searches Internet Devices |
| IoT | Internet Connected Devices |
| Banner | Information Returned by Services |

**Useful Filters:** `country`, `port`, `hostname`, `org`

---

## 30-Second Revision

- Shodan is a search engine for Internet-connected devices.
- It scans public IP addresses and collects service banners.
- Banners reveal software names, versions, and services.
- Common filters include `country:`, `port:`, `hostname:`, `org:`, `product:`.
- Used by both Red Teams and Blue Teams for reconnaissance, asset discovery, and exposure monitoring.

-  VirusTotal scans files using multiple antivirus engines.
-  SHA256 is the most commonly used file hash.
-  IOC means Indicator of Compromise.
-  CVE uniquely identifies vulnerabilities.
-  MITRE manages CVEs.
-  NVD provides technical details and CVSS scores.

-  Search skills are essential in cybersecurity.
-  MAN pages are Linux's built-in documentation.
-  GitHub hosts open-source cybersecurity tools and research.
-  Always verify information and use only authorized environments for security testing.

---

## Cheat Sheet

| Resource | Purpose | Website |
|----------|---------|---------|
| Shodan | Internet Device Search Engine | <https://www.shodan.io> |
| VirusTotal | Malware & Threat Intelligence | <https://www.virustotal.com> |
| NVD | National Vulnerability Database | <https://nvd.nist.gov> |
| MITRE CVE | Official CVE Records | <https://cve.mitre.org> |
| GitHub | Code Hosting & Collaboration | <https://github.com> |
| Linux Manual | `man <command>` / `<command> --help` | built-in |

**Shodan** — Common filters: `country:`, `port:`, `hostname:`, `org:`, `product:`. Common uses: Asset Discovery, Exposure Monitoring, Reconnaissance, OSINT, Fingerprinting.

**VirusTotal** — Supports Files, URLs, Domains, IP Addresses, Hashes. Key concepts: Hash, Detection Ratio, IOC, Sandbox, Threat Intelligence.

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is Shodan?** | Shodan is a search engine that indexes Internet-connected devices, allowing security professionals to discover publicly exposed systems, services, banners, and technologies. |
| **Q2. What is Banner Grabbing?** | Banner grabbing is the process of collecting information returned by a network service, such as the software name, version, operating system, or protocol. |
| **Q3. What is IoT?** | IoT (Internet of Things) refers to physical devices connected to the Internet that communicate and exchange data, such as smart cameras, sensors, TVs, and industrial equipment. |
| **Q4. Why is Shodan useful?** | It helps security professionals identify exposed assets, understand attack surfaces, perform reconnaissance, and verify whether systems are publicly accessible. |
| **Q5. What is VirusTotal?** | VirusTotal is a threat intelligence platform that scans files, URLs, domains, IPs, and hashes using multiple antivirus engines. |
| **Q6. What is a File Hash?** | A unique fingerprint of a file generated using algorithms such as MD5, SHA1, or SHA256. |
| **Q7. What is an IOC?** | An Indicator of Compromise is evidence suggesting malicious activity, such as a malicious IP address, file hash, or domain. |
| **Q8. Why use multiple antivirus engines?** | No antivirus detects every threat. Using many engines increases detection accuracy and confidence. |
| **Q9. What is Git?** | Git is a distributed version control system used to track changes in source code. |
| **Q10. What is a Repository?** | A repository is a storage location containing project files, documentation, source code, and version history. |
| **Q11. Why should you read official documentation?** | Official documentation is accurate, maintained by developers, and explains correct usage, syntax, options, and best practices. |
| **Q12. Why shouldn't you blindly run PoC code?** | PoC code may be outdated, unsafe, or malicious. Always review the code and test it in an isolated environment before use. |

## Room Answers

| Question | Answer |
|----------|--------|
| What is the hostname of the machine shown in Shodan? | `tryhackme.thm` |
| How many vendors detected the file? | `52` |
| Task 2 — Hostname | `tryhackme.thm` |
| Task 3 — Detection Count | `52` |
| Task 4 — Example CVE | `CVE-2024-29988` |

---

## Final Takeaway

A successful cybersecurity professional doesn't memorize every tool or command — they know where to find accurate information, how to verify it, and how to use trusted resources effectively.

Mastering **search skills** is the foundation of:

-  **Penetration Testing**
-  **SOC Operations**
-  **Threat Hunting**
-  **Incident Response**
-  **Vulnerability Management**
