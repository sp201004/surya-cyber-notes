## Contents

- [Objective](#objective)
- [What is Offensive Security?](#what-is-offensive-security)
- [Mind Map](#mind-map)
- [Offensive vs Defensive Security](#offensive-vs-defensive-security)
- [Think Like a Hacker](#think-like-a-hacker)
- [Hacker Mindset](#hacker-mindset)
- [Starting the Lab](#starting-the-lab)
- [Finding Hidden Pages](#finding-hidden-pages)
- [Syntax](#syntax)
- [Command](#command)
- [Mind Map](#mind-map)
- [Exploiting the Admin Page](#exploiting-the-admin-page)
- [Attack Flow](#attack-flow)
- [Important Terms](#important-terms)
- [Interview Notes](#interview-notes)
- [Common Mistakes](#common-mistakes)
- [30-Second Revision](#30-second-revision)
- [Quick Revision](#quick-revision)

## Objective
Learn the basics of **Offensive Security** by thinking like an ethical hacker and exploiting a vulnerable banking website in a safe lab.

## What is Offensive Security?
**Definition:** Offensive Security is the practice of **simulating real-world cyber attacks** to identify and fix vulnerabilities **before malicious hackers exploit them**.

**Goal:**
- Find weaknesses
- Exploit vulnerabilities (legally)
- Help organizations improve security

### Mind Map
```
Offensive Security
│
├── Think Like an Attacker
├── Find Vulnerabilities
├── Exploit Weaknesses (Legally)
├── Report Findings
└── Improve Security
```

### Offensive vs Defensive Security
| Offensive Security | Defensive Security |
|---|---|
| Attacks systems ethically | Protects systems |
| Finds vulnerabilities | Detects & prevents attacks |
| Uses hacking tools | Uses monitoring & security tools |
| Red Team | Blue Team |

> **Remember:** Offensive = Attack (Ethically) · Defensive = Protect

## Think Like a Hacker
Ethical hackers ask questions like:
- What information is exposed?
- Are there hidden pages?
- Can authentication be bypassed?
- Can I gain unauthorized access?

### Hacker Mindset
```
Observe → Gather Information → Find Weakness → Exploit → Gain Access
```

## Starting the Lab
A vulnerable banking website called **FakeBank** is provided.

**Information Found**
- Bank Account Number: `8881`
- Purpose: used later to manipulate the account balance.

## Finding Hidden Pages
**Why?** Many websites accidentally leave the following accessible to everyone:
- Admin panels
- Backup files
- Test pages
- Login portals

These are called **Hidden Pages**.

**Tool Used — Dirb**
Dirb is a **directory brute-forcing tool** that discovers hidden files and directories using a wordlist.

```bash

# Syntax
dirb <URL>

# Command
dirb http://fakebank.thm
```

**What it does**
- Sends many HTTP requests
- Tests common filenames/directories
- Displays existing pages

**Hidden Pages Found**
- `/images`
- `/bank-transfer`

### Mind Map
```
Website Enumeration
│
├── Scan Website
├── Run DIRB
│      dirb URL
├── Find Hidden Pages
│      ├── /images
│      └── /bank-transfer
└── Attack Hidden Admin Panel
```

## Exploiting the Admin Page
Navigate to `http://fakebank.thm/bank-transfer`

**Steps**
1. Open hidden page
2. Select account `8881`
3. Deposit `$2000 or more`
4. Balance becomes positive
5. Flag appears → `BANK-HACKED`

### Attack Flow
```
Reconnaissance
     ▼
Directory Enumeration
     ▼
Hidden Page Found
     ▼
Access Admin Panel
     ▼
Deposit Money
     ▼
Positive Balance
     ▼
Flag Obtained
```

## Important Terms
| Term | Meaning |
|---|---|
| Offensive Security | Ethically attacking systems to identify vulnerabilities |
| Ethical Hacker | A security professional authorized to test systems for weaknesses |
| Vulnerability | A flaw or weakness that attackers can exploit |
| Enumeration | The process of collecting detailed information about a target |
| Directory Brute Force | Searching for hidden web pages using a predefined wordlist |
| Admin Panel | A privileged management interface; if exposed, can lead to unauthorized access |

## Interview Notes
- **What is Offensive Security?** Simulating cyberattacks in an authorized environment to identify and remediate vulnerabilities before attackers exploit them.
- **What is Directory Enumeration?** Discovering hidden files and directories on a web server using tools such as DIRB, Gobuster, or FFUF.
- **What is DIRB?** A web content scanner that performs directory brute-forcing using a wordlist to discover hidden resources.

## Common Mistakes
| Mistake | Correct Approach |
|---|---|
| Assuming only visible pages exist | Always perform directory enumeration |
| Accessing hidden pages without authorization | Test only in authorized environments (TryHackMe, Hack The Box) |
| Skipping reconnaissance | Recon & enumeration are critical first steps before exploitation |

## 30-Second Revision
- Offensive Security = Ethical hacking to find vulnerabilities.
- Think like an attacker to identify weaknesses.
- Use **DIRB** to enumerate hidden web directories.
- Command: `dirb http://fakebank.thm`
- Hidden pages discovered: `/images`, `/bank-transfer`
- Deposit **$2000+** into account **8881** to trigger the flag.
- Final flag: **BANK-HACKED**

> **Core Lesson:** Every successful penetration test starts with **reconnaissance and enumeration**. Finding hidden resources often reveals the attack surface before any exploitation begins.

## Quick Revision

```
Offensive Security → Think Like Hacker → Find Hidden Pages → Use DIRB
→ dirb http://fakebank.thm
→ Found: /images, /bank-transfer
→ Deposit $2000+ → Flag: BANK-HACKED
```
