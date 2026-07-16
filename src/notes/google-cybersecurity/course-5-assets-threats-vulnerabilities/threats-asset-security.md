## Contents

- [Social Engineering — Manipulating Humans](#social-engineering--manipulating-humans)
- [Malware — Malicious Software Types](#malware--malicious-software-types)
- [Web-Based Exploits — XSS & SQL Injection](#web-based-exploits--xss--sql-injection)
- [Threat Modeling — PASTA Framework](#threat-modeling--pasta-framework)

## Social Engineering — Manipulating Humans

> **KEY CONCEPT: Why Social Engineering Works**
> Social engineering exploits human psychology -- not technical flaws. No firewall protects against human trust.
> People are hardwired to be helpful, to trust authority, and to act quickly under urgency.
> **Attackers exploit:** urgency, fear, curiosity, trust, helpfulness, and desire for reward.
> **Defence:** Security awareness training is the PRIMARY countermeasure.

**SOCIAL ENGINEERING ATTACK SPECTRUM**

**PHYSICAL / IN-PERSON:**
- **Tailgating (Piggybacking):** Unauthorized person physically follows authorized employee through secure door. Classic technique: Carry heavy boxes. Employee politely holds the door open.
- **Baiting (USB Drop):** Leave USB drive labeled 'Q4 Employee Bonuses' in company parking lot. Curious employee plugs it in. Malware auto-executes. Network compromised.

**DIGITAL DECEPTION (PHISHING FAMILY):**
Phishing = Deceptive EMAIL to masses. 'Your Netflix payment failed.'
Smishing = Phishing via TEXT MESSAGE. 'FedEx: Package delayed. Click here.'
Vishing = Phishing via VOICE CALL. 'IRS: You owe taxes. Call back immediately.'

**TARGETED ATTACKS:**
Spear Phishing = Highly customized phishing targeting ONE specific person. Attacker researches target on LinkedIn, personalizes the attack.
Whaling = Spear phishing targeting EXECUTIVES (CEO, CFO).

| **Attack** | **Vector** | **Urgency Technique** | **Detection / Defence** |
| --- | --- | --- | --- |
| **Phishing** | Email | Urgent account threat, limited time offer, security alert. | Check sender domain carefully. Hover over links before clicking. Use email filtering with DMARC/DKIM/SPF. |
| **Spear Phishing** | Email | Personalized with victim's name, role, colleague names. | Be skeptical of any email requesting unusual action even from 'known' senders. Verify via phone. |
| **Whaling** | Email | Executive urgency, confidentiality ('don't tell anyone'), financial pressure. | Financial wire transfer policy requiring dual approval. Callback verification to known number. |
| **Vishing** | Phone | IRS threats, bank fraud alerts, tech support urgent problems. | Never provide info to inbound callers. Hang up and call official number yourself. |
| **Smishing** | SMS | Package delays, prize winners, urgent account issues. | Never click links in unsolicited texts. Go directly to official website. |
| **Tailgating** | Physical | Social pressure of appearing rude to not hold the door. | Badge-in policy: every person swipes their own badge. Challenge anyone without visible badge. |
| **USB Baiting** | Physical | Curiosity ('Bonuses', 'Confidential', 'Private Photos'). | Never plug in unknown USB devices. Corporate policy to report found drives to IT. |

## Malware — Malicious Software Types

> **NOTE: What is Malware?**
> Malware (Malicious Software) is code specifically designed to harm, exploit, or infiltrate devices and networks.
> Knowing HOW each type works is essential for detection, containment, and appropriate incident response.

> **Virus**
> **How:** Malicious code that attaches to legitimate files. REQUIRES user action (opening/running the file) to activate and spread.
> **Example:** *User downloads a free game. Double-clicking to install activates the hidden virus, which deletes documents and emails itself to the victim's contacts.*
> **Defence:** Endpoint antivirus/EDR, user education to avoid untrusted downloads, application allowlisting.

> **Worm**
> **How:** Standalone malware that SELF-REPLICATES and spreads across networks AUTOMATICALLY without any user interaction required.
> **Example:** *The Blaster Worm (2003) infected one PC, then autonomously scanned the network for other vulnerable Windows machines, infecting them in seconds with zero user clicks.*
> **Defence:** Network segmentation (limits spread between subnets), IPS signatures, OS patching (worms exploit known OS vulnerabilities).

> **Trojan Horse**
> **How:** Malware disguised as legitimate, useful, or harmless software. Requires user to install it willingly.
> **Example:** *'Free Antivirus Scanner' app that, once installed, actually opens a backdoor for remote attacker access. User WANTED to install it.*
> **Defence:** Only install software from verified, official sources. Verify digital signatures. App reputation checking.

> **Ransomware**
> **How:** Encrypts victim's files making them inaccessible. Demands ransom payment (usually Bitcoin) for the decryption key.
> **Example:** *Hospital's patient database is encrypted. Screen shows: 'Pay $500,000 in Bitcoin within 48 hours or patient records are permanently deleted.'*
> **Defence:** Offline air-gapped backups (test them regularly!), network segmentation, endpoint EDR, patch management, MFA on all accounts.

> **Spyware / Keylogger**
> **How:** Secretly monitors and records user activity (keystrokes, screenshots, clipboard, browsing) and exfiltrates it to the attacker.
> **Example:** *Keylogger records every keystroke. Attacker receives complete log of victim's banking credentials, email password, and credit card number.*
> **Defence:** EDR software with behavioral detection, MFA (stolen password alone is useless), network monitoring for unusual data egress.

> **Fileless Malware**
> **How:** Operates entirely in RAM using legitimate built-in system tools (PowerShell, WMI, cmd.exe). No files written to disk -- traditional antivirus cannot detect it.
> **Example:** *Malicious PowerShell script runs entirely in memory, uses Windows Credential Manager to steal NTLM hashes, and exfiltrates them over HTTPS. No file ever touches the hard drive.*
> **Defence:** EDR with memory scanning and behavioral analysis, PowerShell Constrained Language Mode, application control (WDAC), SIEM behavioral alerts.

> **Rootkit**
> **How:** Grants attacker deep kernel-level (root/admin) access while actively hiding its own existence from the OS, task manager, and antivirus tools.
> **Example:** *Attacker installs rootkit that makes malicious processes, files, and network connections completely invisible to the infected OS. The computer appears clean in all scans.*
> **Defence:** Boot-time integrity checking (Secure Boot), verified OS installation media, hypervisor-based security, Trusted Platform Module (TPM).

> **Cryptojacking**
> **How:** Malware secretly uses victim's CPU/GPU to mine cryptocurrency for the attacker. No data stolen -- just computing resources.
> **Example:** *Visit a compromised website. Hidden JavaScript runs a Monero miner in your browser tab. Your CPU hits 100%, laptop fan roars, battery drains in 2 hours, all while you browse normally.*
> **Defence:** Browser extensions blocking mining scripts (e.g., uBlock Origin), EDR detecting abnormal CPU usage, Content Security Policy headers on websites.

## Web-Based Exploits — XSS & SQL Injection

> **KEY CONCEPT: Why Web Exploits Work**
> Web exploits exist because applications fail to properly VALIDATE and SANITIZE user input.
> The application blindly trusts what the user types into a text field and processes it as code or commands.
> Golden Rule: NEVER trust user input. Always validate, sanitize, and parameterize.

### Cross-Site Scripting (XSS)

XSS = Injecting malicious JavaScript into a webpage that other users visit.

**TYPE 1: REFLECTED XSS**
Attacker crafts malicious URL --> victim clicks it --> browser REFLECTS the malicious script from the server back to the victim's browser.
`www.bank.com/search?q=<script>steal(document.cookie)</script>`
Victim's browser runs the script. Session cookie stolen. Account hijacked.

**TYPE 2: STORED XSS (more dangerous)**
Attacker posts a comment on a blog with hidden malicious script.
Script is STORED on the server's database.
EVERY visitor to that blog post automatically runs the malicious script.
One injection = many victims.

**TYPE 3: DOM-BASED XSS**
Attack happens entirely INSIDE the victim's browser.
No data sent to server. Modifies the DOM environment locally.

**DEFENCE AGAINST ALL XSS:**
- Input Validation: Reject inputs containing <script> tags or HTML.
- Output Encoding: Encode all user data before displaying it on the page.

### SQL Injection (SQLi)

SQL = Language websites use to query their databases. SQLi = Inserting SQL commands into user input to manipulate the database.

**NORMAL LOGIN QUERY:**

```sql
SELECT * FROM users WHERE username='alice' AND password='secret123'
```

Result: Returns alice's account. Login succeeds.

**SQL INJECTION ATTACK:**
Username typed: `admin'--`

```sql
SELECT * FROM users WHERE username='admin'--' AND password='anything'
```

The `--` comments out everything after it. Password check is BYPASSED. Result: Logged in as admin with NO valid password.

**ANOTHER ATTACK (OR 1=1):**
Username: `' OR 1=1--`

```sql
SELECT * FROM users WHERE username='' OR 1=1--'
```

`1=1` is always TRUE. Database returns ALL user records. First result is usually the admin account. Attacker gets admin access.

**BLIND SQLi:**
Website shows no data but attacker asks True/False questions:
- 'Does username start with A?' -- if page loads normally = YES
- 'Does it start with B?' -- if page shows error = NO

Slowly maps entire database through yes/no responses.

**THE DEFINITIVE DEFENCE -- PREPARED STATEMENTS:**
Database query structure is FIXED before user input is added.

```sql
SELECT * FROM users WHERE username = ? AND password = ?
```

User input fills the ? placeholders as pure DATA, never as code. Even typing SQL commands just searches for username='admin OR 1=1' (no such user). Injection is IMPOSSIBLE with prepared statements.

## Threat Modeling — PASTA Framework

> **KEY CONCEPT: What is Threat Modeling?**
> A proactive engineering process to identify assets, find vulnerabilities, and determine how to protect them BEFORE an attack happens.
> Attack Surface = all points where an attacker could enter or extract data (website, employee laptops, office doors).
> Attack Vector = the specific pathway an attacker uses (phishing email, open port, stolen badge).

```
STRIDE (Microsoft's Threat Categories):
S = Spoofing       (impersonating another user or system)
T = Tampering      (modifying data or code maliciously)
R = Repudiation    (denying an action was taken -- no audit trail)
I = Info Disclosure(exposing data to unauthorized parties)
D = Denial of Svc  (making system unavailable)
E = Elevation of   (gaining higher privileges than authorized)
    Privilege
```

### PASTA — 7-Stage Risk-Centric Threat Modeling

> **NOTE: PASTA = Process for Attack Simulation and Threat Analysis**
> A 7-stage framework that aligns technical threats with BUSINESS GOALS.
> Asks: 'What does this threat mean for our revenue, compliance, and users?'

| **1** | **Define Business Objectives**<br>Identify what the business needs to function and stay compliant. Example (Fitness App): The app must be profitable and comply with PCI-DSS (stores payment data). A breach would cause both financial and legal damage. |
| --- | --- |

| **2** | **Define Technical Scope**<br>Map ALL technologies the application uses. Example: The fitness app uses REST APIs, AWS cloud storage, a SQL database, and a mobile client for iOS and Android. |
| --- | --- |

| **3** | **Decompose the Application**<br>Create a Data Flow Diagram (DFD) showing exactly how data moves through the system. Example: Trace user's credit card from mobile app -> API -> payment processor -> database. Every transition is a potential attack point. |
| --- | --- |

| **4** | **Threat Analysis**<br>Research current threats targeting similar applications. Example: Look up threat intelligence on attackers currently targeting mobile fitness apps and payment APIs. Reference MITRE ATT&CK for known TTPs. |
| --- | --- |

| **5** | **Vulnerability Analysis**<br>Test the actual application for weaknesses. Example: Penetration test reveals the login API uses weak MD5 hashing for passwords and lacks rate limiting -- vulnerable to brute force. |
| --- | --- |

| **6** | **Attack Modeling — Build an Attack Tree**<br>Model exactly HOW an attacker would exploit the vulnerabilities found. Example: Attack tree shows path: Brute force login (weak hashing, no lockout) -> Access user profile -> Exfiltrate stored payment tokens. |
| --- | --- |

| **7** | **Risk & Impact Analysis — Present to Management**<br>Quantify business impact and recommend mitigations. Example: 'Weak password hashing could enable account takeover for all 500,000 users. Mitigation: Upgrade to bcrypt hashing + add account lockout + rate limiting before launch. Estimated dev cost: $15K. Cost of breach: $5M+.' |
| --- | --- |

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| **Phishing vs. Spear Phishing vs. Whaling?** | Phishing: mass generic email. Spear Phishing: customized to specific person (researched via LinkedIn). Whaling: spear phishing targeting executives specifically. |
| **How does Ransomware work?** | Infects via phishing/exploit -> encrypts all files -> demands Bitcoin payment for decryption key. Defence: offline air-gapped backups tested regularly. |
| **Fileless malware vs. regular malware?** | Fileless: runs entirely in RAM using legitimate system tools (PowerShell, WMI). No files = antivirus cannot detect it. Requires EDR with behavioral analysis. |
| **Reflected XSS vs. Stored XSS?** | Reflected: script bounces off server via crafted URL (one victim per click). Stored: script saved in database and runs for EVERY visitor (massively more dangerous). |
| **How does SQL Injection work?** | Attacker types SQL commands into input fields. Database executes them as commands instead of data. Fix: prepared statements make injection impossible. |
| **What is STRIDE?** | Microsoft threat model categories: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege. |
| **PASTA 7 stages?** | 1-Define Objectives, 2-Define Technical Scope, 3-Decompose Application, 4-Threat Analysis, 5-Vulnerability Analysis, 6-Attack Modeling (Attack Tree), 7-Risk & Impact Analysis. |
| **Social engineering defence?** | Security awareness training is #1. Verify requests through an independent channel. Badge-in policies. Never plug in unknown USB. Challenge unrecognized people in secure areas. |
