## Contents

- [Search Skills Cheat Sheet — Rapid Recall](#search-skills-cheat-sheet--rapid-recall)

## Search Skills Cheat Sheet — Rapid Recall

| **Question** | **Answer** |
| --- | --- |
| What does Google search vs. what does Shodan search? | Google indexes CONTENT (web pages, images, documents). Shodan indexes DEVICES (servers, routers, firewalls, CCTV, databases, IoT, ICS). Think "Google = books, Shodan = buildings." |
| What is banner grabbing? | Collecting the information a network service returns when it responds — software name, version, operating system, protocol, and server type. |
| Which Shodan filters should you memorise? | `country:` (e.g. country:IN), `port:` (e.g. port:22), `hostname:` (e.g. hostname:tryhackme.com), `org:` (e.g. org:Amazon), and `product:` (e.g. product:Elasticsearch). |
| Why do version numbers matter to an attacker? | A version like Apache 2.4.49 can be matched to a known CVE. Finding the version via Shodan instantly reveals whether a host is a potential target. |
| What is VirusTotal and what can it analyse? | A free threat-intelligence platform that scans files, URLs, domains, IP addresses, and hashes against dozens of antivirus engines and security vendors simultaneously. |
| What is a file hash and why is it useful? | A unique digital fingerprint of a file (MD5, SHA1, SHA256). Changing one character changes the whole hash, so hashes identify files without sharing the file itself. |
| Which hash algorithm is the modern standard? | SHA256. Memory trick: MD5 = Old, SHA1 = Older, SHA256 = Modern. |
| What is a detection ratio (e.g. 52/70)? | The number of security vendors that flagged a file as malicious. A higher ratio means higher confidence the file is malicious. |
| What does CVE stand for and who assigns IDs? | Common Vulnerabilities and Exposures — a global catalog of publicly disclosed vulnerabilities. MITRE maintains the program and assigns the IDs. |
| What is the NVD and who maintains it? | The National Vulnerability Database, maintained by NIST. It expands CVE records with CVSS severity scores, references, and technical details. |
| What is the CVSS range and its severity bands? | 0.0–10.0. None (0.0), Low (0.1–3.9), Medium (4.0–6.9), High (7.0–8.9), Critical (9.0–10.0). |
| How do you read a command's full manual vs. quick help in Linux? | `man <command>` for detailed documentation (e.g. man grep); `<command> --help` for a quick reference of options. |
| Git vs. GitHub? | Git is a distributed version-control system that tracks code changes. GitHub is a cloud platform that hosts Git repositories and enables collaboration. |
| What must you do before running a GitHub PoC or script? | Read the README, review the code, verify the author, and test in an isolated lab / virtual machine. Never run unknown exploit code blindly. |
| What is an IOC? | Indicator of Compromise — evidence suggesting a system was compromised (malicious IP, file hash, domain, URL, registry key, or process name). |
| What is a sandbox? | An isolated environment used to safely execute and observe suspicious files without risking the real system. |
| What is OSINT? | Open Source Intelligence — intelligence gathered from publicly available sources such as Shodan, VirusTotal, and WHOIS. |
| The core search-skills workflow? | Unknown target → gather info → Shodan → VirusTotal → search CVE → read documentation → search GitHub → understand risk → take action. |

---

> **Module 1 Complete!**  
> **Start Your Cyber Security Journey**  
> **Rooms Mastered: Offensive Security Intro  *  Defensive Security Intro  *  Search Skills**  
> **Resources: Shodan  *  VirusTotal  *  CVE/NVD  *  Linux MAN Pages  *  GitHub**  
> **Golden rule: don't memorise every tool — know where to find accurate information and how to verify it.**
