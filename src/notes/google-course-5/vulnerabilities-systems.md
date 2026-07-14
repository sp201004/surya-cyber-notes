## Contents

- [Vulnerability, Exploit, Exposure — Key Distinctions](#vulnerability-exploit-exposure--key-distinctions)
- [Vulnerability Management — 4-Step Cycle](#vulnerability-management--4-step-cycle)
- [CVE & CVSS — Tracking and Scoring Vulnerabilities](#cve--cvss--tracking-and-scoring-vulnerabilities)
- [OWASP Top 10 — Web Application Vulnerabilities](#owasp-top-10--web-application-vulnerabilities)
- [Defense in Depth — The Castle Approach](#defense-in-depth--the-castle-approach)
- [Threat Actors & Hacker Types](#threat-actors--hacker-types)
- [Penetration Testing Strategies](#penetration-testing-strategies)
- [Brute Force Attacks & Defences](#brute-force-attacks--defences)
- [OSINT — Open-Source Intelligence](#osint--open-source-intelligence)

## Vulnerability, Exploit, Exposure — Key Distinctions

| **Term** | **Definition** | **Analogy** | **Example** |
| --- | --- | --- | --- |
| **Vulnerability** | A weakness or flaw in a system, process, or person that can be exploited. | A broken window lock on your house. | An unpatched SQL server running an outdated version with a known buffer overflow flaw. |
| **Exploit** | The specific method or tool used to take advantage of a vulnerability. | A crowbar used to pry open the broken lock. | A Python script that sends a crafted SQL query to trigger the buffer overflow and gain shell access. |
| **Exposure** | A mistake that leaves data accessible to threats. Not necessarily a code flaw. | Leaving a confidential printed document on a park bench. | A developer accidentally commits AWS database credentials to a public GitHub repository. |
| **Zero-Day** | A vulnerability that is completely unknown to the vendor and public. No patch exists yet. | A hidden secret entrance to the house that even the architect forgot about. | A threat actor finds a browser flaw, exploits it to steal data BEFORE the browser company even knows the bug exists. |

## Vulnerability Management — 4-Step Cycle

> **VULNERABILITY MANAGEMENT — 4-Step Continuous Cycle**
> **VULNERABILITY MANAGEMENT IS A CONTINUOUS LOOP:**

```
  +------------------+
  |   1. IDENTIFY    |
  | Find weaknesses  |<-----------------+
  | Scanning tools,  |                  |
  | pen tests, CVE   |                  |
  | database checks  |                  |
  +--------+---------+                  |
           |                            |
           v                            |
  +------------------+                  |
  |  2. CONSIDER     |                  |
  |    EXPLOITS      |                  |  (Cycle repeats as
  | Think like an    |                  |   new vulns emerge)
  | attacker. How    |                  |
  | could this be    |                  |
  | weaponized?      |                  |
  +--------+---------+                  |
           |                            |
           v                            |
  +------------------+                  |
  |  3. PREPARE      |                  |
  |   DEFENCES       |                  |
  | Build fix or     |                  |
  | mitigation:      |                  |
  | patch, config,   |                  |
  | compensating ctrl|                  |
  +--------+---------+                  |
           |                            |
           v                            |
  +------------------+                  |
  |  4. EVALUATE     +------------------+
  |   DEFENCES       |
  | Test the fix.    |
  | Does it work?    |
  | No new issues?   |
  +------------------+
```

## CVE & CVSS — Tracking and Scoring Vulnerabilities

> **NOTE: The Vulnerability Tracking System**
> CVE (Common Vulnerabilities and Exposures): Public dictionary of known vulnerabilities. Maintained by MITRE.
> Each vulnerability gets a unique CVE ID: e.g., CVE-2021-44228 (Log4Shell).
> Before getting a CVE ID, bugs are reviewed by a CNA (CVE Numbering Authority).
> 
> NVD (National Vulnerability Database): Managed by NIST. Takes CVE list and SCORES each vulnerability.
> CVSS (Common Vulnerability Scoring System): The scoring scale from 0.0 to 10.0.

| **CVSS Score** | **Severity** | **Response Required** |
| --- | --- | --- |
| **0.0** | None | No action needed. |
| **0.1 – 3.9** | Low | Schedule patching in next maintenance window. |
| **4.0 – 6.9** | Medium | Prioritize. Patch within 30 days. |
| **7.0 – 8.9** | High | Urgent. Patch within 7 days or apply mitigations immediately. |
| **9.0 – 10.0** | Critical | DROP EVERYTHING. Emergency patch NOW. Log4Shell (9.8), Heartbleed (7.5). |

## OWASP Top 10 — Web Application Vulnerabilities

> **NOTE: What is OWASP?**
> Open Worldwide Application Security Project. Non-profit that publishes the 10 most critical web app risks.
> These 10 vulnerabilities account for the vast majority of successful web application attacks.
> Every developer and security analyst should know and test for all 10.

| **#** | **Vulnerability** | **What It Is** | **Real Example & Fix** |
| --- | --- | --- | --- |
| **1** | **Broken Access Control** | Users accessing resources they are NOT authorized to see. | Changing URL from /account?id=1 to /account?id=2 views another user's account. Fix: server-side authorization checks on every request. |
| **2** | **Cryptographic Failures** | Weak or missing encryption protecting sensitive data. | Storing passwords using MD5 (crackable in seconds). Fix: Use bcrypt or SHA-256 with salting for password storage. |
| **3** | **Injection** | Malicious code inserted through user input fields. | Typing SQL commands into a login box to bypass authentication. Fix: Parameterized queries / prepared statements. |
| **4** | **Insecure Design** | Security flaws baked in at the DESIGN stage before coding started. | Designing a password reset flow that lets anyone reset any account. Fix: Threat model during design. Privacy/security by design. |
| **5** | **Security Misconfiguration** | Default, incomplete, or incorrect security settings left in place. | Installing a server and keeping the admin username/password as 'admin'/'admin'. Fix: Harden all configs, disable defaults, regular audits. |
| **6** | **Vulnerable Components** | Using third-party libraries or frameworks with known CVEs. | Building a site on an outdated version of a JavaScript library with a critical XSS vulnerability. Fix: Monitor dependencies, update regularly. |
| **7** | **Auth Failures** | Weak login protections allowing credential attacks. | Login page allows unlimited password attempts -- vulnerable to brute force. Fix: Account lockout, MFA, CAPTCHA, rate limiting. |
| **8** | **Software Integrity Failures** | Applying unverified software updates (supply chain attacks). | SolarWinds hack: attackers injected malware into legitimate software update sent to 18,000+ companies. Fix: Code signing, hash verification of updates. |
| **9** | **Logging Failures** | Not keeping track of security events -- attackers operate undetected. | Breach discovered 8 months later because no logging was configured. Fix: Comprehensive logging + SIEM alerts on anomalies. |
| **10** | **SSRF** | Server tricked into making unauthorized requests to internal systems. | Attacker sends request that causes server to fetch AWS metadata endpoint, leaking cloud credentials. Fix: Validate and whitelist all outbound URLs. |

## Defense in Depth — The Castle Approach

> **DEFENSE IN DEPTH — 5-Layer Castle Model**
> **LAYER 1: PERIMETER (Outer Wall)**

```
  +--------------------------------------------------+
  | Filters external access before it enters.        |
  | Firewalls, WAF, DDoS protection, email filtering |
  | If attacker breaches this... they face Layer 2   |
  +--------------------------------------------------+
       |
       v
  LAYER 2: NETWORK (Moat)
  +--------------------------------------------------+
  | Controls traffic inside the organization.        |
  | Network segmentation, IDS/IPS, VLANs, VPNs       |
  | If attacker breaches this... they face Layer 3   |
  +--------------------------------------------------+
       |
       v
  LAYER 3: ENDPOINT (Castle Doors)
  +--------------------------------------------------+
  | Protects individual devices (laptops, servers).  |
  | Antivirus/EDR, OS hardening, patch management    |
  | If attacker breaches this... they face Layer 4   |
  +--------------------------------------------------+
       |
       v
  LAYER 4: APPLICATION (Inner Rooms)
  +--------------------------------------------------+
  | Security built into software interfaces.         |
  | MFA on login portals, input validation, RBAC     |
  | If attacker breaches this... they face Layer 5   |
  +--------------------------------------------------+
       |
       v
  LAYER 5: DATA (The Treasury / Crown Jewels)
  +----------------------------------------------------+
  | Protects the actual information at its core.       |
  | Database encryption, data classification, DLP      |
  | Even if attacker reaches here: encrypted = useless |
  +----------------------------------------------------+
```

## Threat Actors & Hacker Types

| **Threat Actor** | **Who They Are** | **Primary Motivation** | **Key Characteristic** |
| --- | --- | --- | --- |
| **Competitors** | Rival companies or individuals. | Steal trade secrets, IP, customer lists for competitive advantage. | Often conduct corporate espionage through insiders or targeted spear phishing. |
| **State Actors** | Government-sponsored hacking groups. | Espionage, disruption of enemy infrastructure, propaganda. | APT-level skills. Long-term patient campaigns. Target critical infrastructure. |
| **Criminal Syndicates** | Organized criminal groups. | Financial gain: ransomware, fraud, data theft for sale. | Operate like businesses. Ransomware-as-a-service. Dark web marketplaces. |
| **Insider Threats** | Current or former employees, contractors. | Intentional (disgruntled, bribed) or unintentional (accident, phishing victim). | Most dangerous -- they already have legitimate access. Hard to detect with perimeter tools. |
| **Script Kiddies** | Low-skill individuals. | Curiosity, notoriety, causing disruption. | Use pre-built hacking tools without understanding them. Opportunistic, not targeted. |
| **Hacktivists** | Ideologically motivated hackers. | Political statements, exposing wrongdoing. | Website defacement, data leaks, DDoS attacks against targeted organizations. |
| **APT Groups** | Advanced Persistent Threats. Usually state-sponsored. | Long-term espionage, data theft, infrastructure control. | Remain hidden in networks for MONTHS. SolarWinds attackers went undetected for ~9 months. |

| **Hacker Category** | **Also Called** | **Authorization** | **Example** |
| --- | --- | --- | --- |
| **Black Hat** | Unauthorized hacker | ILLEGAL -- no permission | Ransomware groups, data thieves, nation-state attackers |
| **White Hat** | Ethical hacker / Pen tester | LEGAL -- hired permission | Bug bounty hunters, penetration testers, red team security consultants |
| **Gray Hat** | Semi-authorized | Unauthorized but usually non-malicious | Hacktivists defacing a website for a cause. Break rules without intent to profit personally. |

## Penetration Testing Strategies

| **Strategy** | **Team** | **Knowledge Level** | **What It Tests** |
| --- | --- | --- | --- |
| **Red Team (Offensive)** | Attackers | Varies by test type | Tests the organization's defenses by actively attempting to breach them using real attack techniques. |
| **Blue Team (Defensive)** | Defenders | Full internal knowledge | Tests detection, response, and recovery capabilities during or after a simulated attack. |
| **Purple Team** | Both working together | Full collaboration | Red and Blue teams share findings in real-time to immediately improve defensive controls. |
| **White-Box Testing** | Pen tester (any) | FULL: code, network maps, architecture | Deep internal audit. Tests ALL potential vulnerabilities. Most comprehensive but least realistic. |
| **Black-Box Testing** | Pen tester (any) | ZERO: acts as external attacker | Most realistic simulation of an outside attacker. Tests what attackers can find from scratch. |
| **Gray-Box Testing** | Pen tester (any) | LIMITED: standard employee access | Simulates insider threat or attacker with some foothold. Balanced realism and depth. |

## Brute Force Attacks & Defences

```
BRUTE FORCE ATTACK TYPES:

DICTIONARY ATTACK:
Try: 'password', 'admin', '123456', 'iloveyou', 'qwerty'...
Uses a pre-built wordlist of commonly used passwords.
Very fast against weak passwords. Fails against random complex passwords.

CREDENTIAL STUFFING:
Take database of 100M leaked username/password pairs from one breach.
Automatically try ALL of them on a DIFFERENT website.
Works because 65% of people reuse passwords across sites.
Tools: Sentry MBA, OpenBullet, SentryMBA

SIMPLE BRUTE FORCE:
Try every possible combination: aaaa, aaab, aaac... zzzz, aaaa1...
Theoretically cracks any password given enough time.
8-char password: modern GPU = hours/days. 16-char random = centuries.

TOOLS USED: Aircrack-ng (Wi-Fi), Hashcat (hash cracking), John the Ripper

DEFENCES:
* MFA: Password cracked? Attacker still needs physical device.
* Account lockout: Lock after 5 failed attempts for 15 minutes.
* CAPTCHA: Proves human, stops automated bots instantly.
* Salting: Unique salt defeats rainbow tables and pre-computation.
* Rate limiting: Slow down login attempts (max 3/minute).
* SIEM alert: Alert on >5 failed logins from same IP in 60 seconds.
```

## OSINT — Open-Source Intelligence

| **Tool** | **What It Does** | **Security Analyst Use Case** |
| --- | --- | --- |
| **VirusTotal** | Upload files or URLs to check against 70+ antivirus engines. | Analyst receives suspicious email attachment. Upload to VirusTotal before opening. If 30/70 engines flag it as malware, do not open. |
| **Have I Been Pwned** | Check if an email address appears in known data breaches. | Employee reports strange account activity. Check their email -- found in 3 breach databases. Immediate password reset required. |
| **MITRE ATT&CK** | Database of real-world adversary tactics, techniques, and procedures (TTPs). | After detecting unusual PowerShell activity, look up ATT&CK T1059.001 to understand exactly how attackers use PowerShell and what to look for next. |
| **Shodan** | Search engine for internet-connected devices and exposed services. | Scan your own organization's public IP ranges to see what attackers see. Find exposed admin panels, open ports, and default services. |
| **Google Dorks** | Advanced Google search operators to find exposed information. | Search site:yourcompany.com filetype:pdf confidential to find accidentally published sensitive documents. |

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| **Vulnerability vs. Exploit vs. Exposure?** | Vulnerability = the weakness. Exploit = the tool/method to attack it. Exposure = a mistake leaving data accessible (not necessarily a code flaw). |
| **What is a Zero-Day?** | A vulnerability completely unknown to the vendor. No patch exists. The vendor has had 'zero days' to fix it. Most dangerous class of vulnerability. |
| **CVSS Score 9.8 means what?** | Critical severity. Requires IMMEDIATE emergency patching. Drop everything. Examples: Log4Shell (9.8), some buffer overflows. |
| **OWASP #3 Injection -- what is it?** | Attacker inserts malicious code (SQL, commands) into user input fields. The application executes the code instead of treating it as data. Fix: parameterized queries. |
| **What is Defense in Depth?** | Layering multiple security controls so if one layer fails, others catch the attacker. Five layers: Perimeter, Network, Endpoint, Application, Data. |
| **Black Hat vs. White Hat?** | Black Hat: unauthorized, illegal, malicious intent. White Hat: authorized, hired by the organization, legal. Both use the same techniques -- authorization is the difference. |
| **What is Credential Stuffing?** | Taking leaked username/password pairs from one breach and trying them on different websites. Effective because most people reuse passwords. |
| **What is an APT?** | Advanced Persistent Threat. Highly skilled group (usually state-sponsored) maintaining hidden access to a target network for months to gather intelligence. |
