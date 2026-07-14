## Contents

- [What is Cybersecurity?](#what-is-cybersecurity)
- [The CIA Triad — Foundation of All Security](#the-cia-triad--foundation-of-all-security)
- [The Threat Landscape — External vs. Internal](#the-threat-landscape--external-vs-internal)
- [Social Engineering & Phishing — Human Exploitation](#social-engineering--phishing--human-exploitation)
- [Data Classification — PII vs. SPII](#data-classification--pii-vs-spii)
- [Blue Team vs. Red Team](#blue-team-vs-red-team)
- [Security Tools — SIEM, IDS, and DFIR](#security-tools--siem-ids-and-dfir)

## What is Cybersecurity?
> **KEY CONCEPT: Operational Definition**
> Cybersecurity is the comprehensive practice of ensuring the Confidentiality, Integrity, and Availability (CIA) of digital assets by protecting networks, hardware devices, software applications, human users, and data from unauthorized access, malicious modification, or criminal exploitation.
> 
> Ultimate goal: Contribute to the creation of a SAFER INTERNET for everyone.
> The field covers: networks, devices, people, and data -- all four must be protected simultaneously.

## The CIA Triad — Foundation of All Security
```
                    +--------------------------+
                    |       CIA  TRIAD         |
                    +--------------------------+

         +--------------------+
         | CONFIDENTIALITY    |   Only authorized users access data.
         | Who can SEE it?    |   Encryption, access controls, PoLP.
         +--------------------+
                  /\
                 /  \
                /    \
  +-------------+    +--------------+
  |  INTEGRITY  |    | AVAILABILITY |
  | Data stays  |    | Always       |
  | accurate &  |    | accessible   |
  | unmodified  |    | when needed  |
  +-------------+    +--------------+
  Hashing, HMAC       Redundancy,
  signatures          backups, K8s HA

  ALL THREE must be maintained simultaneously.
```

| **Pillar** | **Definition** | **Beginner Analogy** | **Advanced Engineering Example** |
| --- | --- | --- | --- |
| CONFIDENTIALITY | Only explicitly authorized users can view specific assets or data. | A tamper-proof envelope only the named recipient can open. | Encrypting passwords with bcrypt/Argon2id before storing in PostgreSQL. Even a raw SQL dump reveals nothing without the cryptographic secret. |
| INTEGRITY | Data remains accurate, complete, and unaltered throughout its entire lifecycle. | A legal contract signed with special ink that smears visibly if anyone tries to alter it. | API Gateway using HMAC SHA-256 to verify packet signatures. If an attacker modifies data in transit, the signature fails and the request is dropped instantly. |
| AVAILABILITY | Information systems remain reliably accessible to authorized users when needed. | A grocery store with backup generators open 24/7 during a blackout. | Kubernetes with pod replication, auto-scaling, and liveness/readiness probes. Hardware failure triggers automatic traffic rerouting to surviving nodes. |

## The Threat Landscape — External vs. Internal
```
  +-------------------------------------------------------------------------+
  |                       THE THREAT LANDSCAPE                              |
  +--------------------------------------+----------------------------------+
  |  EXTERNAL THREATS                    |  INTERNAL THREATS                |
  +--------------------------------------+----------------------------------+
  | * Organized Cybercrime (Ransomware)  | * Malicious Insiders (Theft)     |
  | * Nation-State APTs (Espionage)      | * Accidental Insiders            |
  | * Hacktivists (DDoS, Defacement)     |   (Misconfig, Phishing victims)  |
  | * Script Kiddies (Pre-made tools)    | * Departing Employees            |
  +--------------------------------------+----------------------------------+

  KEY INSIGHT: Internal threats are often MORE DANGEROUS than external.
  Reason: Insiders already have legitimate access -- no perimeter to breach.
  Mitigation: Principle of Least Privilege (PoLP) strictly enforced.
```

| **Threat Type** | **Who** | **Motive** | **Real Example** |
| --- | --- | --- | --- |
| External: Organized Cybercrime | Criminal groups and syndicates | Financial gain: ransomware payments, data resale, fraud. | DDoS attack flooding a cloud load balancer with millions of dummy HTTP requests per second, crashing legitimate traffic. |
| External: APT (Nation-State) | Government-sponsored hacking groups | Espionage, infrastructure disruption, intellectual property theft. | Staying hidden inside a government network for months, quietly exfiltrating classified documents without triggering any alert. |
| External: Hacktivist | Ideologically motivated individuals | Political statement, exposing wrongdoing, disruption. | Defacing a corporation's website to protest their environmental record. |
| Internal: Malicious Insider | Current/former employee or vendor with legitimate access | Sabotage, personal gain, revenge, corporate espionage. | Backend developer with production DB access runs a data-wiping script right before their resignation takes effect. |
| Internal: Accidental Insider | Careless employee, phishing victim | No malicious intent -- human error. | Network admin accidentally pushes an unencrypted .env file with database passwords to a public GitHub repo. |

## Social Engineering & Phishing — Human Exploitation
> **KEY CONCEPT: Why Social Engineering Works**
> Phishing exploits human PSYCHOLOGY, not technical vulnerabilities.
> It is often easier to trick a human than to hack a hardened system.
> The three psychological triggers attackers exploit most effectively:

| **Psychological Trigger** | **Attacker's Technique** | **Real Example** |
| --- | --- | --- |
| URGENCY | Create artificial time pressure to prevent rational thinking. | 'Your account will be permanently deactivated in 1 HOUR if you do not log in immediately.' |
| FEAR/CONSEQUENCES | Threaten legal or financial penalties to induce panic. | 'A formal legal lawsuit has been filed against you. Click below to view the case details before your court date.' |
| AUTHORITY IMPERSONATION | Pretend to be a CEO, auditor, IT team, or government agency. | Email designed to look exactly like it came from the Chief Executive Officer demanding immediate wire transfer. |

### Technical Phishing Indicators — How to Spot a Fake

> **PHISHING TECHNICAL INDICATORS — How to Identify Fake Emails**
> INDICATOR 1: MISMATCHED SENDER DOMAIN
> Email banner CLAIMS to be from:  'Global Security Bank'
> Actual email header source domain: security-update-verification-portal.co
> Legitimate bank domain would be:  bank.com
> -> The .co domain and long subdomain are major red flags.
> 
> INDICATOR 2: HYPERLINK MASKING
> Text displayed in email:   https://secure.yourbank.com  (looks real)
> Hover reveals actual URL:  http://login-credentials-harvest-scam.net/login
> -> Always hover before clicking. The displayed text and actual URL can differ.
> 
> INDICATOR 3: GENERIC GREETINGS
> 'Dear Valued Customer' instead of your actual name.
> Legitimate companies use your name -- phishers use mass generic templates.
> 
> INDICATOR 4: URGENT GRAMMAR ERRORS
> Spelling mistakes, unusual capitalization, awkward phrasing.
> Automated phishing campaigns often have subtle grammatical errors.

## Data Classification — PII vs. SPII
| **Category** | **Full Name** | **Description** | **Examples** | **Protection Level** |
| --- | --- | --- | --- | --- |
| PII | Personally Identifiable Information | Data that can identify, contact, or locate an individual. | Full name, personal email, phone number, home address, static public IP address. | Standard protection. Encryption, access controls, breach notification. |
| SPII | Sensitive PII | PII requiring STRICTER handling due to severity of harm if exposed. | Social Security Number, medical records, biometric hashes (fingerprints), credit card numbers, login credentials. | Maximum protection. Restricted access, strong encryption, audit logs, NDAs. |
| PHI | Protected Health Information | Health and medical data protected by HIPAA. | Diagnoses, prescriptions, treatment history, insurance info, mental health records. | HIPAA-mandated controls. 60-day breach notification. Strict access logs. |

## Blue Team vs. Red Team
```
  +-------------------------------------------------------------------------+
  |                        THE DEFENSIVE BALANCE                            |
  +--------------------------------------+----------------------------------+
  |  BLUE TEAM (Defenders)               |  RED TEAM (Adversaries)          |
  +--------------------------------------+----------------------------------+
  | * System hardening & log analysis    | * Offensive penetration testing  |
  | * Real-time incident response        | * Simulating real threat actors  |
  | * Creating defensive playbooks       | * Uncovering policy/code gaps    |
  | * SIEM monitoring and triage         | * Social engineering tests       |
  | * Firewall rule management           | * Network mapping and recon      |
  +--------------------------------------+----------------------------------+

  PURPLE TEAM: Blue + Red working together in real-time to immediately
  improve defenses based on offensive findings. Best of both worlds.

  Security ANALYST = Frontline operations (monitoring, triage, response)
  Security ENGINEER = Systems architecture (building, configuring, automating)
```

## Security Tools — SIEM, IDS, and DFIR

### SIEM — Security Information and Event Management

```
SIEM DATA FLOW:
[ App Logs    ] ----+
[ K8s Nodes   ] ----|---> [ SIEM INGESTION PIPELINE ] ---> [ REAL-TIME ALERTING ]
[ DB Queries  ] ----|                                       (Flags anomalies,
[ Firewall    ] ----+                                        generates tickets)
[ Network     ] ----+

IMPOSSIBLE TRAVEL ANOMALY EXAMPLE:
User 'jsmith' logs in from New York at 09:00 AM.
Same credentials log in from Tokyo at 09:14 AM.
New York to Tokyo in 14 minutes = physically impossible.
SIEM: Auto-tags as credential compromise, locks session, alerts analyst.
```

### IDS — Intrusion Detection System

| **IDS Detection Method** | **How It Works** | **Strength** | **Weakness** |
| --- | --- | --- | --- |
| Signature-Based | Compares network packet hashes against a known index of verified malicious code structures (ransomware fingerprints, known exploit patterns). | Very low false-positive rate. Fast. Well-understood. | Completely blind to zero-day exploits -- no signature exists for brand-new attacks. |
| Anomaly-Based | Establishes a baseline of normal behavior. Flags any significant deviation from that baseline (unusual bandwidth, unexpected port calls). | Can catch unknown zero-day attacks through behavioral deviation. | Higher false-positive rate. Legitimate business changes (new app launch) can look like attacks. |

### DFIR — Digital Forensics and Incident Response

| **1** | **Identification**<br>Analyst spots unauthorized connection to a backend server via an unapproved port. SIEM or IDS flags the anomaly. Investigation begins. |
| --- | --- |

| **2** | **Containment**<br>Following the established playbook, the analyst cuts network access to the compromised server container. This stops the attack from spreading laterally across the network. |
| --- | --- |

| **3** | **Preservation & Analysis**<br>Forensics investigator takes a RAM snapshot and creates a bit-stream disk clone of the storage volume. This frozen evidence is analyzed to identify the exact exploit used. Evidence preserved securely for legal proceedings. |
| --- | --- |

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| What is the CIA Triad? | Confidentiality (authorized access only), Integrity (data stays accurate and unaltered), Availability (always accessible when needed). All three must be maintained simultaneously. |
| External vs. Internal threats? | External: originate outside the perimeter (hackers, APTs, hacktivists). Internal: originate inside (malicious insiders, accidental misconfig). Internal often more dangerous due to existing legitimate access. |
| 3 phishing psychological triggers? | Urgency (1 hour to act!), Fear/Consequences (lawsuit filed!), Authority Impersonation (pretending to be CEO/IRS/IT). |
| PII vs. SPII? | PII: data identifying an individual (name, email). SPII: stricter category needing maximum protection (SSN, biometrics, medical records, credentials). |
| Blue Team vs. Red Team? | Blue Team: defenders (monitoring, incident response, playbooks). Red Team: ethical attackers (pen testing, simulating threats, finding gaps). |
| SIEM vs. IDS? | SIEM: collects/correlates ALL logs organization-wide, generates alerts (broad visibility). IDS: sits on network lines, inspects traffic for intrusions specifically (targeted detection). |
| 3 DFIR steps? | Identification (spot the anomaly), Containment (cut off the infected system), Preservation & Analysis (capture evidence, trace the exploit). |
| Security Analyst vs. Engineer? | Analyst: operations focus (monitoring, triage, response using playbooks). Engineer: project focus (building platforms, configuring firewalls, automating security). |
