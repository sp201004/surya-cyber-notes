# 📘 TryHackMe — Cyber Security 101

> 🗂️ **Module:** Start Your Cyber Security Journey • **Room:** 🔍 Search Skills

---

# Room — Search Skills 🔍

Learning Path : Cyber Security 101
Module        : Start Your Cyber Security Journey
Room          : Search Skills

Difficulty    : Beginner
Estimated Time: 15 Minutes

## OBJECTIVE

This room teaches one of the most important skills in Cyber Security:

                    SEARCHING

Cybersecurity professionals spend a significant amount of their
time searching for information.

Knowing HOW to search is often more valuable than memorizing
every tool.

You will learn how to use:

• Shodan
• VirusTotal
• CVE Databases
• Linux MAN Pages
• GitHub

These resources are used daily by:

✔ Penetration Testers
✔ SOC Analysts
✔ Incident Responders
✔ Threat Hunters
✔ Malware Analysts
✔ Security Researchers

## TASK 1 — INTRODUCTION

Cybersecurity is NOT about memorizing tools.

Instead, professionals know:

✔ Where information exists
✔ How to search
✔ Which website contains the answer

This room introduces websites that help security professionals
collect intelligence during investigations.

These services are useful for BOTH

• Offensive Security
• Defensive Security

### Why Search Skills Matter

Imagine you discover:

• Unknown IP Address
• Strange File
• Weird Domain
• Open Port
• Unknown Software Version

What do you do?

You SEARCH.

Professional investigators rarely guess.

Instead they gather intelligence.

### Real Example

SOC Analyst notices

IP:
185.243.xxx.xxx

Instead of guessing...

They search
↓
VirusTotal
↓
Shodan
↓
AbuseIPDB
↓
WHOIS
↓
CVE Database
↓
Determine if malicious

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

### Remember

Searching is a cybersecurity skill.

Good investigators don't know everything.

They know where to find everything.

## TASK 2 — SHODAN

### What is Shodan?

Definition

Shodan is a search engine that indexes devices connected to the
Internet.

Unlike Google...

Google searches

✔ Websites
✔ Images
✔ Videos
✔ Documents

Shodan searches

✔ Servers
✔ Routers
✔ Firewalls
✔ CCTV Cameras
✔ Databases
✔ IoT Devices
✔ Printers
✔ NAS Devices
✔ Industrial Control Systems (ICS)
✔ Smart Devices

### Memory Trick

Google searches

        CONTENT

Shodan searches

        DEVICES

### What is IoT?

IoT = Internet of Things

Definition

Physical devices connected to the Internet that communicate
without human interaction.

Examples

• Smart TV
• Smart Camera
• Smart Watch
• Smart Door Lock
• Smart Thermostat
• Smart Light
• Industrial Sensors

### How Shodan Works

Instead of waiting for websites to appear...

Shodan actively scans the Internet.

```text
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

Whenever a service responds...

It often reveals information.

Example

HTTP/1.1 200 OK

Apache/2.4.57

Ubuntu

OpenSSL 3.0

This information is called

BANNER

Banner tells us

✔ Software Name

✔ Version

✔ Operating System

✔ Protocol

✔ Server Type

### Example Banner

HTTP/1.1 200 OK

Server: Apache/2.4.1

Content-Type: text/html

Date:
Mon, 01 Jul

From this banner we learn

Web Server
↓
Apache

Version
↓

2.4.1

### Why Version Numbers Matter

Suppose

Apache 2.4.1

has a vulnerability.

If Shodan finds

Apache 2.4.1

The attacker immediately knows

↓

Potential Target

### Real Attack Workflow

Search

↓

Apache 2.4.1

↓

Thousands of Servers

↓

Search CVE Database

↓

Known Vulnerability

↓

Possible Exploitation

### Common Uses of Shodan

Blue Team

✔ Asset Discovery

✔ Exposure Monitoring

✔ Detect Open Services

✔ Verify Public Systems

✔ Threat Intelligence

Red Team

✔ Reconnaissance

✔ Fingerprinting

✔ Enumeration

✔ Technology Detection

✔ Target Selection

### Common Shodan Filters

country:

Limits search to a country.

Example

country:IN

country:US

country:JP

------------------------------------------------------------

port:

Search by port.

Example

port:22

SSH

port:80

HTTP

port:443

HTTPS

port:3389

Remote Desktop

------------------------------------------------------------

hostname:

Search specific hostname.

Example

hostname:tryhackme.com

------------------------------------------------------------

org:

Search devices owned by an organization.

Example

org:Amazon

org:Google

org:Microsoft

### Practical Exercise — TryScanMe

In this task, TryHackMe introduces a machine named:

            TryScanMe

Your objective is to use **Shodan** to investigate the target
and identify information about the exposed services.

Instead of scanning the machine yourself, you search Shodan's
database because it has already indexed the target.

### Searching a Domain

Open:

https://www.shodan.io

Search for:

tryhackme.thm

Shodan will display information collected during its Internet-wide
scan.

Example Information You May Find

✔ IP Address
✔ Open Ports
✔ Running Services
✔ Web Server
✔ Hostname
✔ Organization
✔ Operating System (sometimes)
✔ Geographic Location

### Understanding the Results

Example

Hostname
↓

tryhackme.thm

IP Address
↓

10.x.x.x (Lab Example)

Open Ports
↓

22

80

443

Meaning

22
↓

SSH Remote Login

80
↓

HTTP Website

443
↓

HTTPS Secure Website

### Attack Surface

Every exposed service increases the attack surface.

Example

Internet

```text
      │

      ▼
```

Target Server

```text
 ├── SSH (22)

 ├── HTTP (80)

 ├── HTTPS (443)
```

Each service should be reviewed for:

✔ Weak Passwords

✔ Vulnerabilities

✔ Misconfiguration

✔ Outdated Versions

### Shodan Search Examples

Search Apache Servers

apache

------------------------------------------------------------

Search Apache in India

apache country:IN

------------------------------------------------------------

Search SSH Servers

port:22

------------------------------------------------------------

Search Web Servers

port:80

------------------------------------------------------------

Search HTTPS Servers

port:443

------------------------------------------------------------

Search Microsoft Devices

org:Microsoft

------------------------------------------------------------

Search Amazon Devices

org:Amazon

------------------------------------------------------------

Search Cameras

webcam

------------------------------------------------------------

Search NAS Devices

nas

------------------------------------------------------------

Search Elasticsearch Servers

product:Elasticsearch

------------------------------------------------------------

Search Jenkins Servers

product:Jenkins

### Important Note

Shodan is intended for:

✔ Security Research

✔ Asset Discovery

✔ Exposure Monitoring

✔ Defensive Assessments

Never use information obtained from Shodan to attack systems
without explicit authorization.

Only perform testing against:

• TryHackMe

• Hack The Box

• Your own systems

• Authorized environments

### Advantages of Shodan

✔ Extremely Fast

✔ No Need to Scan Yourself

✔ Global Internet Visibility

✔ Historical Data

✔ Excellent OSINT Source

### Limitations

✘ Results may not be real-time

✘ Some devices block scanning

✘ Internal/private networks cannot be indexed

✘ Missing information if ports are closed

## REAL-WORLD EXAMPLE

Imagine a company accidentally exposes:

Apache 2.4.49

An attacker searches

Apache 2.4.49

↓

Thousands of vulnerable servers appear.

↓

Attacker checks

CVE Database

↓

Finds

CVE-2021-41773

↓

Downloads Public Exploit

↓

Attempts exploitation

This demonstrates why organizations should continuously monitor
their Internet-facing assets.

## ASCII DIAGRAM

                    Internet

```text
                        │

                        ▼
```

              Shodan Internet Scanner

```text
                        │

        ┌───────────────┼───────────────┐

        ▼               ▼               ▼
```

    Web Server      CCTV Camera      Router

```text
        │               │               │

        ▼               ▼               ▼
```

      Banner          Banner         Banner

```text
        │               │               │

        └───────────────┼───────────────┘

                        ▼
```

                 Shodan Database

```text
                        │

                        ▼
```

                Security Researcher

## TASK 3 — VIRUSTOTAL

### What is VirusTotal?

Definition

VirusTotal is a free online threat intelligence platform that
analyzes suspicious files, URLs, domains, and IP addresses using
multiple antivirus engines and security vendors.

Instead of relying on a single antivirus, VirusTotal compares
results from dozens of security products simultaneously.

Website

https://www.virustotal.com

### Why Security Professionals Use VirusTotal

VirusTotal helps answer questions like:

✔ Is this file malicious?

✔ Has anyone seen this malware before?

✔ Which antivirus vendors detect it?

✔ Is this URL phishing?

✔ Is this IP involved in attacks?

✔ What relationships exist between files and domains?

### Supported Search Types

VirusTotal can analyze:

✔ Files

✔ URLs

✔ Domains

✔ IP Addresses

✔ File Hashes

### What is a File Hash?

A hash is a unique digital fingerprint generated from a file.

Even changing ONE character in a file completely changes its hash.

Example

File

↓

malware.exe

↓

SHA256

↓

A4C9E8F21F5A......

Hashes help identify files without sharing the file itself.

### Common Hash Algorithms

MD5

• 128-bit

• Fast

• No longer secure for cryptographic purposes

------------------------------------------------------------

SHA1

• 160-bit

• Better than MD5

• Also considered weak today

------------------------------------------------------------

SHA256

• 256-bit

• Industry Standard

• Most commonly used in cybersecurity

### Memory Trick

MD5

↓

Old

SHA1

↓

Older

SHA256

↓

Modern

### VirusTotal Scan Process

Upload File

```text
        │

        ▼
```

Calculate Hash

```text
        │

        ▼
```

Compare Existing Database

```text
        │

        ▼
```

Scan with Multiple Antivirus Engines

```text
        │

        ▼
```

Generate Report

### Detection Ratio

Example

52 / 70

Meaning

52 security vendors detected the file as malicious.

18 vendors did NOT detect it.

Higher detection ratio

↓

Higher confidence that the file is malicious.

### Community Intelligence

VirusTotal also contains

✔ User Comments

✔ Security Research

✔ Community Votes

✔ Threat Labels

Example

Trojan

Ransomware

Spyware

Downloader

Backdoor

### Relationships

VirusTotal links related objects together.

Example

Malware

```text
     │

     ├── Domain

     ├── IP Address

     ├── URL

     ├── Certificate

     └── Other Malware Samples
```

This helps analysts investigate attacks.

## REAL-WORLD EXAMPLE

SOC Analyst receives

invoice.pdf.exe

Looks suspicious.

↓

Upload to VirusTotal

↓

Detection Ratio

65 / 71

↓

Threat Label

Trojan

↓

Analyst isolates infected computer

↓

Incident Response begins.

## BLUE TEAM WORKFLOW

Suspicious File

```text
      │

      ▼
```

Calculate SHA256

```text
      │

      ▼
```

Search VirusTotal

```text
      │

      ▼
```

Read Detection Report

```text
      │

      ▼
```

Confirm Threat

```text
      │

      ▼
```

Contain Incident

## TASK 4 — VULNERABILITY DATABASES

### What is a Vulnerability?

Definition

A vulnerability is a weakness in software, hardware, or system
configuration that can be exploited by an attacker.

Examples

✔ Weak Password

✔ Software Bug

✔ Missing Patch

✔ Misconfiguration

## What is CVE?

CVE

=

Common Vulnerabilities and Exposures

It is a globally recognized catalog of publicly disclosed
security vulnerabilities.

Every published vulnerability receives a unique identifier.

Example

CVE-2024-3094

Breakdown

CVE

↓

Common Vulnerabilities and Exposures

2024

↓

Year Published

3094

↓

Unique ID

## MITRE

MITRE maintains the official CVE program.

Responsibilities

✔ Assign CVE IDs

✔ Publish vulnerability details

✔ Coordinate researchers

✔ Maintain vulnerability records

## National Vulnerability Database (NVD)

The NVD is maintained by NIST.

It expands CVE information by adding

✔ Severity Score

✔ CVSS Metrics

✔ References

✔ Patch Information

✔ Technical Details

Website

https://nvd.nist.gov

## CVSS

Common Vulnerability Scoring System

Used to measure the severity of vulnerabilities.

Range

0.0

↓

10.0

Severity Levels

0.0

None

1.0 – 3.9

Low

4.0 – 6.9

Medium

7.0 – 8.9

High

9.0 – 10.0

Critical

## ASCII FLOW

Software Bug

```text
      │

      ▼
```

Researcher Finds Bug

```text
      │

      ▼
```

MITRE Assigns CVE

```text
      │

      ▼
```

NVD Publishes Details

```text
      │

      ▼
```

Organizations Patch Systems

## TASK 5 — TECHNICAL DOCUMENTATION

### Why Technical Documentation Matters

One of the most underrated cybersecurity skills is the ability
to read and understand official documentation.

Experienced professionals rarely memorize every command or option.
Instead, they know where to find reliable documentation quickly.

Official documentation is usually the most accurate source of
information about a tool or command.

Common Sources

✔ Linux MAN Pages

✔ Official Vendor Documentation

✔ GitHub Documentation

✔ Tool Help Menus

✔ RFCs (Request for Comments)

### Linux MAN Pages

MAN

=

Manual Pages

Linux systems include built-in manuals for most commands.

Syntax

man <command>

Example

man ls

This opens the complete documentation for the "ls" command.

### Example

Command

man grep

Information Available

✔ Description

✔ Syntax

✔ Options

✔ Examples

✔ Exit Status

✔ Related Commands

### Structure of a MAN Page

NAME

↓

Command Name

SYNOPSIS

↓

Command Syntax

DESCRIPTION

↓

What the command does

OPTIONS

↓

Available Arguments

EXAMPLES

↓

Usage Examples

SEE ALSO

↓

Related Commands

### Useful Navigation Keys

Space

↓

Next Page

b

↓

Previous Page

/

↓

Search Text

n

↓

Next Match

q

↓

Quit

### --help Option

Most Linux commands support

--help

Example

ls --help

grep --help

curl --help

This displays a quick summary of available options.

### Difference

man

↓

Detailed Documentation

--help

↓

Quick Reference

## REAL-WORLD EXAMPLE

Suppose you forget the options for "find".

Instead of searching Google...

Run

man find

or

find --help

This saves time and provides official documentation.

## TASK 6 — GITHUB

### What is GitHub?

GitHub is a platform for hosting software projects using Git.

It allows developers and security researchers to collaborate,
share code, report issues, and publish documentation.

Website

https://github.com

### Git vs GitHub

Git

↓

Version Control System

GitHub

↓

Cloud Platform that hosts Git repositories

### Repository

A Repository (Repo) stores:

✔ Source Code

✔ Documentation

✔ Images

✔ Configuration Files

✔ Releases

✔ Issues

✔ Wiki

### Why Cybersecurity Professionals Use GitHub

✔ Open Source Security Tools

✔ Exploit Proof-of-Concept (PoC)

✔ Detection Rules

✔ YARA Rules

✔ Sigma Rules

✔ Scripts

✔ Automation

✔ Security Research

### Common Cybersecurity Projects

Nmap

Metasploit

OWASP Projects

Sigma Rules

Awesome Lists

Threat Intelligence

Blue Team Scripts

Red Team Tools

### Searching GitHub

Example Searches

"CVE-2024"

"Apache Exploit"

"Log4Shell"

"Detection Rules"

"YARA"

"Suricata"

### Important Warning

Never execute random GitHub scripts without understanding
their functionality.

Always

✔ Read README

✔ Review Code

✔ Verify Author

✔ Test in a Lab

✔ Use Virtual Machines

## ASCII DIAGRAM

Developer

```text
      │

      ▼
```

Upload Code

```text
      │

      ▼
```

GitHub Repository

```text
      │

 ┌────┼────┐

 ▼    ▼    ▼
```

README Issues Releases

```text
      │

      ▼
```

Community Collaboration

## SEARCH SKILLS WORKFLOW

Unknown Target

```text
      │

      ▼
```

Gather Information

```text
      │

      ▼
```

Shodan

```text
      │

      ▼
```

VirusTotal

```text
      │

      ▼
```

Search CVE

```text
      │

      ▼
```

Read Documentation

```text
      │

      ▼
```

Search GitHub

```text
      │

      ▼
```

Understand Risk

```text
      │

      ▼
```

Take Action

---

## 📌 IMPORTANT TERMS

Threat Intelligence

Information collected about cyber threats.

------------------------------------------------------------

IOC (Indicator of Compromise)

Evidence suggesting a system has been compromised.

Examples

✔ Malicious IP

✔ File Hash

✔ Domain

✔ URL

✔ Registry Key

✔ Process Name

------------------------------------------------------------

Sandbox

An isolated environment used to safely execute suspicious files.

---

OSINT

Open Source Intelligence

------------------------------------------------------------

Threat Intelligence

Information collected about cyber threats.

------------------------------------------------------------

Repository

Storage location for code and documentation.

------------------------------------------------------------

PoC

Proof of Concept

A demonstration showing how a vulnerability can be exploited.

------------------------------------------------------------

README

Documentation explaining a project.

---

## 🧠 MEMORY TRICKS

Google

↓

Searches INFORMATION

Shodan

↓

Searches DEVICES

Think:

Google = Books

Shodan = Buildings

---

Google

↓

Web Pages

Shodan

↓

Devices

VirusTotal

↓

Malware Intelligence

CVE

↓

Known Vulnerabilities

MAN

↓

Linux Documentation

GitHub

↓

Open Source Knowledge

---

## ❌ COMMON MISTAKES

❌ Thinking Shodan scans websites like Google.

✔ Shodan scans Internet-connected devices.

------------------------------------------------------------

❌ Assuming Shodan data is always live.

✔ Some results may be from previous scans.

------------------------------------------------------------

❌ Using Shodan for unauthorized attacks.

✔ Use it only in authorized environments.

---

❌ Trusting every GitHub repository.

✔ Verify the project before using it.

------------------------------------------------------------

❌ Running unknown exploit scripts.

✔ Review code first.

------------------------------------------------------------

❌ Ignoring documentation.

✔ Always read official manuals.

------------------------------------------------------------

❌ Depending only on Google.

✔ Learn specialized cybersecurity resources.

---

## ⚡ QUICK REVISION

Google

↓

Searches Web Pages

Shodan

↓

Searches Internet Devices

IoT

↓

Internet Connected Devices

Banner

↓

Information Returned by Services

Useful Filters

country

port

hostname

org

---

## 📝 30-SECOND REVISION

✅ Shodan is a search engine for Internet-connected devices.

✅ It scans public IP addresses and collects service banners.

✅ Banners reveal software names, versions, and services.

✅ Common filters include:

country:

port:

hostname:

org:

product:

✅ Used by both Red Teams and Blue Teams for reconnaissance,
asset discovery, and exposure monitoring.

---

✔ VirusTotal scans files using multiple antivirus engines.

✔ SHA256 is the most commonly used file hash.

✔ IOC means Indicator of Compromise.

✔ CVE uniquely identifies vulnerabilities.

✔ MITRE manages CVEs.

✔ NVD provides technical details and CVSS scores.

---

✔ Search skills are essential in cybersecurity.

✔ Shodan searches Internet-connected devices.

✔ VirusTotal analyzes files, URLs, IPs, and domains.

✔ CVE identifies publicly known vulnerabilities.

✔ NVD provides detailed vulnerability information.

✔ MAN pages are Linux's built-in documentation.

✔ GitHub hosts open-source cybersecurity tools and research.

✔ Always verify information and use only authorized environments
for security testing.

---

## 📋 CHEAT SHEET

Website

https://www.shodan.io

Purpose

Search Internet-connected Devices

Common Filters

country:

port:

hostname:

org:

product:

Common Uses

✔ Asset Discovery

✔ Exposure Monitoring

✔ Reconnaissance

✔ OSINT

✔ Fingerprinting

---

Website

https://www.virustotal.com

Supports

✔ Files

✔ URLs

✔ Domains

✔ IP Addresses

✔ Hashes

Important Concepts

Hash

Detection Ratio

IOC

Sandbox

Threat Intelligence

---

Shodan

Purpose

Internet Device Search Engine

Website

https://www.shodan.io

------------------------------------------------------------

VirusTotal

Purpose

Malware & Threat Intelligence

Website

https://www.virustotal.com

------------------------------------------------------------

NVD

Purpose

National Vulnerability Database

Website

https://nvd.nist.gov

------------------------------------------------------------

MITRE CVE

Purpose

Official CVE Records

Website

https://cve.mitre.org

------------------------------------------------------------

GitHub

Purpose

Code Hosting & Collaboration

Website

https://github.com

------------------------------------------------------------

Linux Manual

Command

man <command>

Quick Help

<command> --help

---

## ⭐ INTERVIEW QUESTIONS

Q1. What is Shodan?

Answer:

Shodan is a search engine that indexes Internet-connected devices,
allowing security professionals to discover publicly exposed
systems, services, banners, and technologies.

------------------------------------------------------------

Q2. What is Banner Grabbing?

Answer:

Banner grabbing is the process of collecting information returned
by a network service, such as the software name, version,
operating system, or protocol.

------------------------------------------------------------

Q3. What is IoT?

Answer:

IoT (Internet of Things) refers to physical devices connected to
the Internet that communicate and exchange data, such as smart
cameras, sensors, TVs, and industrial equipment.

------------------------------------------------------------

Q4. Why is Shodan useful?

Answer:

It helps security professionals identify exposed assets,
understand attack surfaces, perform reconnaissance, and verify
whether systems are publicly accessible.

---

Q1. What is VirusTotal?

Answer

VirusTotal is a threat intelligence platform that scans files,
URLs, domains, IPs, and hashes using multiple antivirus engines.

------------------------------------------------------------

Q2. What is a File Hash?

Answer

A unique fingerprint of a file generated using algorithms such
as MD5, SHA1, or SHA256.

------------------------------------------------------------

Q3. What is an IOC?

Answer

An Indicator of Compromise is evidence suggesting malicious
activity, such as a malicious IP address, file hash, or domain.

------------------------------------------------------------

Q4. Why use multiple antivirus engines?

Answer

No antivirus detects every threat. Using many engines increases
detection accuracy and confidence.

---

Q1. What is GitHub?

Answer

GitHub is a cloud-based platform that hosts Git repositories
and enables collaboration, version control, and project
management.

------------------------------------------------------------

Q2. What is Git?

Answer

Git is a distributed version control system used to track
changes in source code.

------------------------------------------------------------

Q3. What is a Repository?

Answer

A repository is a storage location containing project files,
documentation, source code, and version history.

------------------------------------------------------------

Q4. Why should you read official documentation?

Answer

Official documentation is accurate, maintained by developers,
and explains correct usage, syntax, options, and best practices.

------------------------------------------------------------

Q5. Why shouldn't you blindly run PoC code?

Answer

PoC code may be outdated, unsafe, or malicious. Always review
the code and test it in an isolated environment before use.

---

## ✅ ROOM ANSWERS

Question:

What is the hostname of the machine shown in Shodan?

Answer

tryhackme.thm

---

Question

How many vendors detected the file?

Answer

52

---

Task 2

Hostname

tryhackme.thm

------------------------------------------------------------

Task 3

Detection Count

52

------------------------------------------------------------

Task 4

Example CVE

CVE-2024-29988

---

## 🎯 FINAL TAKEAWAY

A successful cybersecurity professional doesn't memorize every
tool or command—they know where to find accurate information,
how to verify it, and how to use trusted resources effectively.

Mastering search skills is the foundation of:

✔ Penetration Testing

✔ SOC Operations

✔ Threat Hunting

✔ Incident Response

✔ Vulnerability Management

✔ Security Research

---

## 🏁 END OF ROOM
