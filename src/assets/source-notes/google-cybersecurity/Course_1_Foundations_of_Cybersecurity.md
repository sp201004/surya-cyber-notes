GOOGLE CYBERSECURITY CERTIFICATE

**Course 1**

**Foundations of**

**Cybersecurity**

Print-Ready Study Notes  |  Modules 1 – 3  +  Master Glossary

Deep Understanding Edition  |  With Diagrams, Case Studies & Real-World Examples

| **Module** | **Title** | **Topics Covered** |
| --- | --- | --- |
| Module 1 | Core Cybersecurity Foundations | CIA Triad · Threat Landscape · PII/SPII · Blue/Red Team · SIEM · IDS · DFIR · Tools |
| Module 2 | Historical Attacks & Threat Classification | Attack History · Malware Types · Social Engineering · CISSP 8 Domains · Incident Management |
| Module 3 | Frameworks, Controls & Ethics | Security Frameworks · CIA Triad · NIST CSF · Global Compliance · Security Ethics · Counterattacks |
| Master Glossary | Complete Course 1 Reference | All key terms A-Z from all three modules |

**MODULE 1**

# Core Cybersecurity Foundations

## 1.1  What is Cybersecurity?

> **KEY CONCEPT: Operational Definition**
> Cybersecurity is the comprehensive practice of ensuring the Confidentiality, Integrity, and Availability (CIA) of digital assets by protecting networks, hardware devices, software applications, human users, and data from unauthorized access, malicious modification, or criminal exploitation.
> 
> Ultimate goal: Contribute to the creation of a SAFER INTERNET for everyone.
> The field covers: networks, devices, people, and data -- all four must be protected simultaneously.

## 1.2  The CIA Triad — Foundation of All Security

> **CIA TRIAD — Three Pillars of Security**

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

## 1.3  The Threat Landscape — External vs. Internal

> **THREAT LANDSCAPE — External vs. Internal**

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

## 1.4  Social Engineering & Phishing — Human Exploitation

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

## 1.5  Data Classification — PII vs. SPII

| **Category** | **Full Name** | **Description** | **Examples** | **Protection Level** |
| --- | --- | --- | --- | --- |
| PII | Personally Identifiable Information | Data that can identify, contact, or locate an individual. | Full name, personal email, phone number, home address, static public IP address. | Standard protection. Encryption, access controls, breach notification. |
| SPII | Sensitive PII | PII requiring STRICTER handling due to severity of harm if exposed. | Social Security Number, medical records, biometric hashes (fingerprints), credit card numbers, login credentials. | Maximum protection. Restricted access, strong encryption, audit logs, NDAs. |
| PHI | Protected Health Information | Health and medical data protected by HIPAA. | Diagnoses, prescriptions, treatment history, insurance info, mental health records. | HIPAA-mandated controls. 60-day breach notification. Strict access logs. |

## 1.6  Blue Team vs. Red Team

> **BLUE TEAM vs. RED TEAM — Roles and Responsibilities**

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

## 1.7  Security Tools — SIEM, IDS, and DFIR

### SIEM — Security Information and Event Management

> **SIEM — Centralized Telemetry with Anomaly Detection**  
> **SIEM DATA FLOW:**  
> **[ App Logs    ] ----+**  
> **[ K8s Nodes   ] ----|---> [ SIEM INGESTION PIPELINE ] ---> [ REAL-TIME ALERTING ]**  
> **[ DB Queries  ] ----|                                       (Flags anomalies,**  
> **[ Firewall    ] ----+                                        generates tickets)**  
> **[ Network     ] ----+**  
> **IMPOSSIBLE TRAVEL ANOMALY EXAMPLE:**  
> **User 'jsmith' logs in from New York at 09:00 AM.**  
> **Same credentials log in from Tokyo at 09:14 AM.**  
> **New York to Tokyo in 14 minutes = physically impossible.**  
> **SIEM: Auto-tags as credential compromise, locks session, alerts analyst.**

```

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

## 1.8  Module 1 Quick Review

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

**MODULE 2**

# Historical Attacks & Threat Classification

## 2.1  Chronological History of Cyber Attacks

> **KEY CONCEPT: Why Study Attack History?**
> Modern cyber exploits are rarely entirely unprecedented.
> Threat actors continuously MODIFY and ENHANCE established methodologies.
> Understanding history lets you predict future attack patterns and recognize them faster.

| **Attack / Year** | **Mechanics** | **Impact** | **Defensive Lesson** |
| --- | --- | --- | --- |
| The Brain Virus (1986) | Originally built to track illegal software copies. Self-replicated by infecting boot sectors and binding to any inserted storage disk. | Spread globally within months. Severely degraded device performance and stalled business productivity worldwide. | Revealed the urgent need for disaster recovery planning, asset management, and proactive security continuity. First major awareness of self-spreading code. |
| The Morris Worm (1988) | A network crawler to map the internet's true size. A programming loop flaw caused it to repeatedly re-infect already-compromised machines without tracking. | Crashed ~6,000 hosts (10% of the entire internet). Millions in disruption costs. The first major internet-scale incident. | Directly led to the creation of the first Computer Emergency Response Teams (CERTs). Prototype for DoS via resource exhaustion. K8s lesson: always set CPU/memory resource quotas. |
| LoveLetter / ILOVEYOU (2000) | Deceptive email ('I Love You') with executable attachment. Scraped address book, emailed itself to all contacts, dropped a credential-harvesting payload. | Compromised 45+ million computers worldwide. $10 billion in estimated damage. | Marked the dawn of large-scale Social Engineering. Proved human error is the most exploitable vulnerability vector. Training and email filtering became essential. |
| Equifax Breach (2017) | Attackers exploited known unpatched software vulnerabilities that the enterprise failed to remediate for several months despite patches being available. | 143 million customer records stolen. SSNs, birthdates, credit cards (SPII). $575 million regulatory settlement. | Direct financial cost of weak security posture. Patch management is non-negotiable. Unpatched known CVEs = invitation to attackers. |

## 2.2  Malware — Four Major Types

| **Malware Type** | **Definition** | **How It Spreads** | **Key Characteristic** | **Real Example** |
| --- | --- | --- | --- | --- |
| Virus | Malicious code that alters standard computer operations and causes damage. | Requires EXPLICIT USER ACTION to execute (opening a malicious email attachment). | Needs a host file to attach to. Cannot self-spread without user triggering it. | Brain Virus (1986). User runs infected file -> virus attaches to boot sector of every disk inserted. |
| Worm | Self-replicating program that autonomously duplicates and traverses network infrastructure. | Spreads WITHOUT ANY USER INTERACTION. Exploits network vulnerabilities automatically. | Completely autonomous. No host file needed. Can fill memory by re-infecting the same machine (Morris Worm bug). | Morris Worm (1988). Crashed 10% of the internet. K8s analogy: why CPU/RAM resource limits are mandatory. |
| Ransomware | Cryptographic malware that encrypts an organization's datasets and demands payment to restore access. | Via phishing, unpatched RDP, or malicious links. Often deployed after initial access is established. | Encrypts files with attacker's key. Displays ransom demand. Modern ransomware also threatens to publish stolen data. | Colonial Pipeline (2021). Fuel supply to US East Coast shut down for 6 days. $4.4M ransom paid. |
| Spyware | Malicious monitoring software installed without consent to track, harvest, and export private data. | Bundled with legitimate software, malicious ads, or drive-by downloads. | Operates silently in background. Keyloggers record every keystroke. Sends data to attacker's server. | Keylogger installed via phishing attachment captures banking credentials without user ever knowing. |

## 2.3  Social Engineering & Phishing — Full Classification

| **Attack Type** | **Channel** | **How It Works** | **Specific Target** | **Defence** |
| --- | --- | --- | --- | --- |
| Phishing | Email | Mass deceptive email tricking recipients into revealing credentials or installing malware. | General public / all employees | Email filtering (DMARC/DKIM/SPF), user training, link hover-check habit. |
| Spear Phishing | Email | Highly customized phishing targeting a SPECIFIC individual/group with researched personal details. | Named individual or department | No automated filter catches this -- only user awareness and verification habits. |
| Whaling | Email | Spear phishing specifically targeting HIGH-PROFILE EXECUTIVES (CEO, CFO, CISO). | C-suite and board members | Dual-approval for financial transfers. Call-back verification for executive requests. |
| Business Email Compromise (BEC) | Email | Impersonating a known trusted source (vendor, CEO, attorney) to authorize fraudulent financial transfers. | Finance teams, accountants | Multi-step approval workflows. Never wire money based on email alone. |
| Vishing | Voice/Phone | Using phone calls or voicemails to extract sensitive information by impersonating authority. | Any employee | Never provide sensitive info to inbound callers. Hang up and call official number back. |
| Smishing | SMS Text | Phishing conducted via SMS text messages with malicious links. | Mobile users | Never click links in unsolicited texts. Go directly to official website. |
| Physical Social Engineering | In-person | Impersonating a contractor, delivery person, or vendor face-to-face to bypass physical building security. | Receptionists, security guards | Badge verification for ALL visitors. Challenge anyone without visible credentials. |
| USB Baiting | Physical | Leaving a malware-infected USB drive (labeled 'Employee Bonuses') in a parking lot for a curious employee. | Any employee who finds it | Never plug in unknown USB devices. Report found drives to IT security. |
| Watering Hole Attack | Web | Compromising a website frequently visited by the target group. Malware activates when target visits. | Specific industry groups or communities | Web proxy filtering, browser isolation, endpoint protection. |

## 2.4  Advanced Attack Types

| **Attack Type** | **How It Works** | **Why It's Dangerous** | **Defence** |
| --- | --- | --- | --- |
| Password Attack: Brute Force | Automated software tries every possible password combination sequentially until the correct one is found. | Modern GPUs can try billions of combinations per second. Short/simple passwords cracked in minutes. | Account lockout after N failed attempts. Strong password policy. MFA requirement. |
| Password Attack: Rainbow Table | Uses a pre-computed dictionary of password-to-hash mappings to instantly look up cracked hashes. | Eliminates the computation time of brute force. Pre-computed lookup = instant crack for common passwords. | Salting passwords before hashing (unique random salt per user defeats rainbow tables). |
| Cryptographic: Downgrade Attack | Forces a connection to drop from a modern secure protocol (TLS 1.3) to an older, weaker one (SSL 2.0) by manipulating the handshake. | Older protocols have known mathematical flaws. Attacker can then decrypt 'encrypted' traffic. | Disable all legacy protocols. Enforce minimum TLS 1.2. HSTS headers. |
| Supply-Chain Attack | Compromising a trusted vendor, software library, or hardware dependency BEFORE it reaches the target organization. | Target organization never directly attacked. The compromise arrives through their trusted update/vendor channel. | Code signing verification. Software composition analysis (SCA). Vendor security assessments. |
| Adversarial AI | Manipulating AI/ML systems to cause misclassification, bypass detection, or generate deceptive outputs. | AI systems can be fooled by subtly modified inputs that humans cannot detect. Defeats AI-based security tools. | Adversarial training datasets. Human-in-the-loop validation. Model monitoring for behavioral drift. |

## 2.5  Threat Actors — Taxonomy

| **Category** | **Who They Are** | **Skill Level** | **Primary Motivation** | **Key Characteristic** |
| --- | --- | --- | --- | --- |
| APT (Advanced Persistent Threat) | Highly organized groups, often nation-state sponsored. | Expert | Espionage, infrastructure disruption, intellectual property theft. | Remain UNDETECTED inside a network for months or years. Patient, methodical, well-resourced. |
| Insider Threat: Malicious | Current/former employees, vendors with legitimate credentials. | Varies | Sabotage, data theft for financial gain, revenge. | Already has legitimate access -- bypasses perimeter controls entirely. Hardest to detect. |
| Insider Threat: Accidental | Careless employees or phishing victims with no malicious intent. | Varies | None -- human error | Accounts for majority of data incidents. Training is the primary mitigation. |
| Hacktivist | Ideologically or politically motivated individuals or groups. | Low to medium | Political statement, environmental cause, exposing wrongdoing. | Website defacement, DDoS attacks, data leaks. Targets organizations they oppose ideologically. |
| Script Kiddie | Low-skill individuals using pre-made hacking tools without understanding them. | Low | Curiosity, notoriety, causing disruption for fun. | No sophisticated attack design. Opportunistic. Target low-hanging fruit (unpatched systems). |
| Authorized (White Hat) Hacker | Security professionals hired to test and find vulnerabilities legally. | High | Improving organizational security posture. | Have written authorization. Follow rules of engagement. Report findings responsibly. |
| Semi-Authorized (Researcher) | Security researchers who find bugs but don't exploit them for harm. | Medium to high | Research, public good, responsible disclosure. | May not have explicit authorization but intent is non-malicious. Report to vendors. |

## 2.6  The 8 CISSP Security Domains

> **KEY CONCEPT: Why the CISSP Framework Matters**
> The CISSP divides ALL of cybersecurity into 8 domains.
> A vulnerability in ONE domain can compromise the ENTIRE organization.
> Understanding all 8 lets security teams identify coverage gaps and assign responsibilities.

| **#** | **Domain** | **Core Focus** | **Real Analyst Task** |
| --- | --- | --- | --- |
| 1 | Security & Risk Management | Defining goals, risk mitigation, compliance (HIPAA/GDPR), business continuity, legal frameworks. | Ensuring the organization's data policies comply with GDPR to avoid multi-million-dollar fines. |
| 2 | Asset Security | Securing digital and physical assets. Governing data lifecycle: storage, retention, secure destruction. | Overseeing the physical shredding of old hard drives and ensuring daily encrypted backups run. |
| 3 | Security Architecture & Engineering | Designing effective tools and security systems. Defense in Depth, Zero Trust, firewall configs. | Configuring a SIEM to detect impossible travel anomalies on user authentication logs. |
| 4 | Communication & Network Security | Managing and securing physical networks and wireless communications (on-site, remote, cloud). | Ensuring remote employees only access internal databases through company-approved VPN connections. |
| 5 | Identity & Access Management (IAM) | Validating identities. Ensuring users follow authorization policies. Principle of Least Privilege. | Ensuring a customer service rep can only view a client's phone number during an active support call. |
| 6 | Security Assessment & Testing | Testing controls, analyzing log data, running security audits, monitoring for permissions creep. | Auditing user permission levels quarterly to verify no unauthorized admin rights exist. |
| 7 | Security Operations (SecOps) | Frontline detection, live monitoring, incident investigations, implementing preventative measures. | Conducting digital forensics after a malware infection to determine when, how, and why it occurred. |
| 8 | Software Development Security (AppSec) | Integrating secure coding practices into every phase of the SDLC. Input validation, code review. | Reviewing a new application's code before launch to ensure customer PII is properly encrypted. |

### Incident Management — The 3-Priority Sequence

> **RULE**
> During an active data breach, order of operations is critical:
> 
> 1. STOP THE HEMORRHAGING (Containment): IMMEDIATE priority.
> Shut down the compromised server. Disconnect the infected network segment.
> Stop ongoing data loss BEFORE any investigation begins.
> 
> 2. INVESTIGATE THE ROOT CAUSE: Only AFTER breach is fully contained.
> Trace the exact exploit vector. Identify all affected systems.
> Preserve evidence for forensics and legal requirements.
> 
> 3. EXECUTE THE PLAYBOOK: Entry-level professionals must follow documented
> incident management plans SEQUENTIALLY. Never improvise during a breach.

## 2.7  Module 2 Quick Review

| **Question** | **Answer** |
| --- | --- |
| What caused the Morris Worm to become destructive? | A programming loop flaw caused it to re-infect machines it had already compromised, repeatedly consuming memory until systems crashed. |
| What makes the LoveLetter attack historically significant? | It marked the dawn of large-scale social engineering -- proving that exploiting human psychology is often easier than breaking technical defenses. |
| Equifax breach key lesson? | $575M penalty for failing to patch a KNOWN vulnerability for months. Demonstrates the direct financial liability of a weak patch management program. |
| Virus vs. Worm? | Virus: requires user action to spread (opening attachment). Worm: self-replicating, spreads autonomously across networks without any user interaction. |
| Spear Phishing vs. Whaling? | Spear Phishing: customized attack on a specific individual. Whaling: spear phishing specifically targeting HIGH-PROFILE EXECUTIVES (CEO, CFO, CISO). |
| What is an APT? | Advanced Persistent Threat. Highly organized (often nation-state) group that stays UNDETECTED inside a network for months to years to gather intel or cause damage. |
| CISSP Domain 5? | Identity and Access Management (IAM). Validating identities. Enforcing authorization policies. Principle of Least Privilege. |
| 3 incident management priorities in order? | 1-Containment (stop data loss immediately), 2-Investigation (trace root cause), 3-Execute Playbook (follow procedures exactly). |

**MODULE 3**

# Frameworks, Controls, Ethics & Global Compliance

## 3.1  Security Frameworks vs. Security Controls

| **Concept** | **Definition** | **Analogy** | **Role in Security** |
| --- | --- | --- | --- |
| Security Framework | Comprehensive guidelines providing organizational blueprints for building risk-mitigation plans to safeguard data and privacy across a continuous security lifecycle. | The ARCHITECT'S BLUEPRINT for a building. Shows what rooms are needed, structural requirements, and safety codes. | Strategic layer. Provides the high-level structure and goals for the entire security program. |
| Security Controls | Direct, actionable safeguards and technical countermeasures designed to reduce a specific security risk. | The actual LOCKS, ALARMS, FIRE SPRINKLERS, and SECURITY CAMERAS installed per the blueprint. | Operational layer. The specific tools and processes that implement the framework's goals in daily practice. |

### The 4 Core Components of a Security Framework

| **1** | **Identify and Document Security Goals**<br>Establish targeted compliance standards and regional laws the organization must legally satisfy. Defines WHAT must be protected and to what level of assurance. |
| --- | --- |

| **2** | **Set Guidelines to Achieve Goals**<br>Craft baseline corporate policies that establish the operational criteria for meeting the documented milestones. Translates high-level goals into internal rules everyone must follow. |
| --- | --- |

| **3** | **Implement Strong Security Processes**<br>Engineer the day-to-day functional technical workflows that fulfill the guidelines. This is where controls (firewalls, encryption, MFA, IDS) are deployed operationally. |
| --- | --- |

| **4** | **Monitor and Communicate Results**<br>Continuously audit systems, identify anomalies, and escalate status indicators. Closes the feedback loop -- ensures controls are actually working and goals are being met. |
| --- | --- |

## 3.2  NIST Cybersecurity Framework (CSF)

> **KEY CONCEPT: What is NIST CSF?**
> The National Institute of Standards and Technology Cybersecurity Framework is a VOLUNTARY framework composed of rigorous standards and industry best practices engineered to manage cybersecurity risk.
> 
> Voluntary: Organizations are not legally required to adopt it (unless federal contracts require it).
> Widely adopted: Considered the global gold standard for enterprise security planning.
> NIST CSF 2.0 (2024): Added a 6th function -- GOVERN -- to emphasize leadership accountability.

> **NIST CSF 2.0 -- Six Functions**  
> **NIST CSF 2.0 -- SIX CORE FUNCTIONS:**

```
  +---------+  +----------+  +---------+  +--------+  +--------+  +---------+
  | GOVERN  |->| IDENTIFY |->| PROTECT |->| DETECT |->| RESPOND|->| RECOVER |
  +---------+  +----------+  +---------+  +--------+  +--------+  +---------+
  Set strategy  Inventory     Deploy        Spot        Contain &   Restore to
  & oversight    all assets   safeguards    IOCs &      investigate  operations
  (new 2024)                 MFA,enc,fw    anomalies

  ASSET VALUATION: An asset's value = financial/regulatory costs of its compromise.
  High-risk assets (PostgreSQL DB storing SPII) -> tighter controls required.
  Low-risk assets (public website) -> standard controls acceptable.
```

## 3.3  Global Compliance Regulations — Complete Reference

| **Regulation** | **Region** | **Who It Applies To** | **Key Requirements** | **Key Penalty** |
| --- | --- | --- | --- | --- |
| GDPR (General Data Protection Regulation) | European Union (applies globally to any org handling EU citizen data) | Any business worldwide that collects or processes EU residents' personal data. | Transparent data collection. Right to be forgotten. 72-HOUR breach notification window. Data minimization. | Up to 4% of annual global revenue or €20M (whichever is higher). |
| PCI DSS (Payment Card Industry Data Security Standard) | Global (payment industry) | Any organization that stores, processes, or transmits credit/debit card information. | Encrypted card storage. Network segmentation for cardholder data. Quarterly penetration tests. Annual audits. | $5,000-$100,000/month. Loss of card processing ability. |
| HIPAA (Health Insurance Portability and Accountability Act) | United States | Healthcare providers, insurers, and their business associates. | Privacy Rule (patient data rights). Security Rule (safeguards for PHI). Breach Notification Rule (60-day notification). | $100-$50,000 per violation. Up to $1.9M/year per category. |
| FERC-NERC | North America (energy sector) | Energy organizations operating components of the North American power grid. | Prepare for and mitigate security incidents affecting the power grid. Critical infrastructure protection. | Up to $1M per day per violation. |
| FedRAMP | United States (federal cloud) | Cloud service providers working with US federal government agencies. | Standardized security assessments and continuous monitoring for federal cloud architectures. | Loss of federal contract authorization. |
| SOC 1 & SOC 2 | United States (widespread adoption) | Service organizations storing or processing data on behalf of clients. | SOC 1: Financial reporting controls. SOC 2: Security, availability, confidentiality, and privacy of customer data. | No direct fines -- but failure can terminate business relationships and trigger legal liability. |

## 3.4  Security Ethics — Professional Responsibility

### Micro-Ethics: The 'Slight Laziness' Trap

> **IMPORTANT**
> Most unethical behavior in cybersecurity originates from LAZINESS rather than malice.
> 
> Examples of ethical violations security professionals must actively resist:
> * Sharing credentials with a colleague because MFA is inconvenient.
> * Querying a user database out of curiosity without a business justification.
> * Skipping audit log entries because the incident 'wasn't really that serious.'
> * Using a personal device to access company systems to avoid paperwork.
> 
> Each action seems minor in isolation but introduces massive systemic risk.

### High-Pressure Ethics: Refusing Unauthorized Requests

> **IMPORTANT**
> Scenario: A senior executive asks you to access and extract private user data WITHOUT a written paper trail or court order.
> 
> YOUR MANDATORY RESPONSE: Refuse and mandate the request follow documented legal channels.
> 
> Even if the request comes from the CEO, you are the data custodian.
> Your responsibility is to the DATA, the LAW, and the affected INDIVIDUALS -- not to hierarchy.
> Document the refusal. Escalate to Legal Counsel if pressure continues.
> Compliance with an illegal order makes YOU legally liable alongside the requester.

### The Legality of Counterattacks ('Hacking Back')

| **Jurisdiction** | **Is Counterattack Legal?** | **Key Rule** | **Reference** |
| --- | --- | --- | --- |
| United States | STRICTLY ILLEGAL -- classified as criminal vigilantism. | Computer Fraud and Abuse Act of 1986. Only approved military/federal personnel are legally cleared to counterattack. | 18 U.S.C. § 1030 (CFAA) |
| International (ICJ Standard) | ONLY allowed under extremely narrow conditions. | Must: affect only the initial attacker, not escalate the event, act only as a communication to halt operations, and be completely reversible. | Tallinn Manual on international cyber law |
| Your Role as an Analyst | ALWAYS defensive. NEVER offensive. | Your job: logging payloads, blocking IPs via firewalls, isolating affected systems. Never initiating outbound attacks. | Employer policies + local law |

## 3.5  Module 3 Quick Review

| **Question** | **Answer** |
| --- | --- |
| Framework vs. Security Control? | Framework = blueprint (strategic guidelines). Control = implementation (specific safeguard). Framework tells you WHAT to protect; controls are HOW you protect it. |
| 4 components of a security framework? | 1-Identify/document goals, 2-Set guidelines, 3-Implement processes, 4-Monitor and communicate results. Continuous cycle. |
| What is NIST CSF? | Voluntary framework from NIST providing standards and best practices to manage cybersecurity risk. 6 functions: Govern, Identify, Protect, Detect, Respond, Recover. |
| GDPR breach notification window? | 72 HOURS to notify affected individuals AND supervisory authorities after discovering a personal data breach. |
| HIPAA breach notification window? | 60 DAYS from discovery of breach affecting Protected Health Information (PHI). |
| Is hacking back legal in the US? | NO. Strictly illegal under the Computer Fraud and Abuse Act (1986). Criminal vigilantism. Only approved military/federal personnel may counterattack. |
| What to do if a senior executive demands unauthorized data access? | Refuse. Mandate the request follow documented legal channels. Document the refusal. Escalate to Legal if pressure continues. You are legally liable if you comply. |
| What drives asset valuation? | Financial or regulatory costs associated with compromise. High-risk assets (SPII databases) require maximum controls. Low-risk assets (public web pages) require standard controls. |

**MASTER GLOSSARY**

# Course 1 — Complete Master Glossary

| **Term** | **Definition** |
| --- | --- |
| **Adversarial AI** | A technique that manipulates artificial intelligence and machine learning technology to conduct attacks more efficiently or bypass AI-based security systems. |
| **Antivirus Software** | A software program used to prevent, detect, and eliminate malware and viruses from devices and networks. |
| **APT (Advanced Persistent Threat)** | A highly organized threat actor group (often nation-state sponsored) that maintains unauthorized network access for extended periods to gather intel or cause damage. |
| **Asset** | Any item perceived as having value to an organization. Can be physical (server), digital (database), or intangible (reputation). |
| **Asset Valuation** | The process of calculating an asset's value based on the financial or regulatory costs associated with its compromise. |
| **Availability** | The guarantee that information systems and data are reliably accessible to authorized users when needed. One pillar of the CIA Triad. |
| **Blue Team** | The defensive security team responsible for monitoring, hardening systems, responding to incidents, and maintaining playbooks. |
| **Business Email Compromise (BEC)** | A phishing attack where a threat actor impersonates a known, trusted source via email to authorize fraudulent financial transfers. |
| **CIA Triad** | Confidentiality, Integrity, Availability -- the three foundational principles underlying all security decisions and control implementations. |
| **CISSP** | Certified Information Systems Security Professional. An 8-domain framework organizing all cybersecurity responsibilities. |
| **Cloud Security** | Ensuring assets stored in cloud environments are properly configured, encrypted, and accessible only to authorized users. |
| **Compliance** | The process of adhering to internal standards and external regulations (GDPR, HIPAA, PCI DSS). |
| **Confidentiality** | Ensuring only explicitly authorized users can access specific assets or data. Enforced via encryption, access controls, and Least Privilege. |
| **Computer Virus** | Malicious code that interferes with computer operations. Requires explicit user action (opening a file) to activate and spread. |
| **Cryptographic Attack** | An attack exploiting weaknesses in secure communication protocols. Example: downgrade attacks forcing TLS to drop to an older vulnerable protocol. |
| **Cybersecurity** | The practice of ensuring CIA of digital assets by protecting networks, devices, people, and data from unauthorized access and malicious exploitation. |
| **DFIR (Digital Forensics and Incident Response)** | The combination of forensic investigation techniques and structured response procedures to contain, analyze, and recover from security breaches. |
| **Data Classification** | The practice of categorizing data by sensitivity level (Public, Private, Sensitive, Confidential/PII/SPII/PHI) to determine handling requirements. |
| **GDPR** | General Data Protection Regulation. EU law requiring transparent data collection, 72-hour breach notification, and granting citizens rights over their personal data. |
| **Hacktivist** | A person who uses hacking methods to achieve a political, environmental, or ideological goal (website defacement, DDoS, data leaks). |
| **HIPAA** | Health Insurance Portability and Accountability Act. US federal law protecting patients' Protected Health Information (PHI). 60-day breach notification requirement. |
| **IDS (Intrusion Detection System)** | A tool that monitors network traffic or host activity and alerts on possible intrusions using signature-based or anomaly-based detection. Does NOT block -- only detects. |
| **Incident Response** | The structured process of identifying, containing, investigating, and recovering from a security breach. |
| **Insider Threat** | A current or former employee, vendor, or partner who poses a security risk -- either maliciously or through accidental misuse of legitimate access. |
| **Integrity** | The guarantee that data remains accurate, complete, and unaltered throughout its lifecycle. Enforced via hashing, HMAC, digital signatures. |
| **LoveLetter / ILOVEYOU Virus** | The 2000 social engineering attack that compromised 45+ million computers via a deceptive email. Pioneered large-scale phishing and social engineering attacks. |
| **Log** | A timestamped record of events occurring within an organization's systems. Foundation of security monitoring, forensics, and compliance auditing. |
| **Malware** | Software specifically designed to harm, exploit, or infiltrate devices and networks (viruses, worms, ransomware, spyware). |
| **Morris Worm** | The 1988 self-replicating worm that crashed 10% of the internet due to a logic flaw. Led directly to the creation of the first Computer Emergency Response Teams (CERTs). |
| **NIST CSF** | National Institute of Standards and Technology Cybersecurity Framework. Voluntary 6-function framework: Govern, Identify, Protect, Detect, Respond, Recover. |
| **Network Protocol Analyzer (Packet Sniffer)** | A tool capturing and analyzing data traffic within a network for troubleshooting, security analysis, and forensic investigation (e.g., Wireshark, tcpdump). |
| **OWASP** | Open Worldwide Application Security Project. Non-profit publishing the OWASP Top 10 list of critical web application security risks. |
| **PCI DSS** | Payment Card Industry Data Security Standard. Mandates secure storage/processing/transmission of credit card data for any organization handling card payments. |
| **PHI (Protected Health Information)** | Regulated health/medical data protected by HIPAA including diagnoses, prescriptions, insurance info, and mental health records. |
| **PII (Personally Identifiable Information)** | Data that can identify, contact, or locate an individual (name, email, phone, address). |
| **Phishing** | Using deceptive digital communications (email, text, voice) to trick people into revealing sensitive data or installing malware. |
| **Physical Social Engineering** | Impersonating an employee, contractor, or vendor in person to gain unauthorized physical access to buildings or data. |
| **Playbook** | A documented, step-by-step procedure guide for responding to specific security incidents. Entry-level analysts must follow these sequentially. |
| **Principle of Least Privilege (PoLP)** | Granting users and processes only the minimum access required for their specific job function. Primary defense against insider threats. |
| **Ransomware** | Malware that encrypts an organization's data and demands a ransom payment (usually cryptocurrency) to restore access. |
| **Red Team** | The offensive security team that simulates real threat actors through penetration testing, social engineering tests, and vulnerability exploitation to find gaps before attackers do. |
| **SIEM** | Security Information and Event Management. Aggregates and correlates logs from all sources organization-wide, generates real-time alerts and anomaly detection. |
| **SPII (Sensitive PII)** | PII requiring the strictest handling controls due to severity of harm if exposed (SSN, biometrics, medical records, financial credentials). |
| **Security Architecture** | A security design composed of multiple components, tools, and processes working together to protect an organization from risks. |
| **Security Controls** | Direct, actionable safeguards (technical, operational, managerial) designed to reduce a specific identified security risk. |
| **Security Ethics** | Professional guidelines for making appropriate security decisions, including protecting privacy, refusing unauthorized requests, and maintaining data integrity. |
| **Security Frameworks** | Structured guidelines providing organizational blueprints for building risk-mitigation plans across a continuous security lifecycle. |
| **Security Posture** | An organization's overall ability to manage the defense of its critical assets and adapt and respond to changes in the threat landscape. |
| **Social Engineering** | Exploiting human psychology (urgency, fear, authority) rather than technical vulnerabilities to extract information or access. |
| **Spear Phishing** | A highly customized phishing attack targeting a specific named individual or department using researched personal details. |
| **Supply-Chain Attack** | Compromising a trusted vendor, software library, or hardware component before it reaches the target organization. The attack arrives via a trusted channel. |
| **Threat** | Any circumstance, vulnerability, or event with the potential to negatively impact an informational asset. |
| **Threat Actor** | The active human entity or automated group driving a security threat (hackers, nation-states, insiders, hacktivists). |
| **USB Baiting** | Leaving a malware-infected USB drive in a location where a target employee will find and plug it in out of curiosity. |
| **Vishing** | Voice phishing -- using phone calls or voicemails to extract sensitive information by impersonating a trusted authority. |
| **Watering Hole Attack** | Compromising a website frequently visited by the target group so malware installs automatically when targets visit the legitimate-looking site. |
| **Whaling** | A spear phishing attack specifically targeting high-profile executives (CEO, CFO, CISO) to access high-clearance data or authorize large financial transfers. |
| **Worm** | Self-replicating malware that spreads autonomously across networks without any user interaction required. |

## Complete Flashcard Review — All Modules

| **Question** | **Answer** |
| --- | --- |
| What is Cybersecurity? | Ensuring CIA of digital assets by protecting networks, devices, people, and data from unauthorized access, malicious modification, or criminal exploitation. |
| CIA Triad three pillars? | Confidentiality (authorized access only), Integrity (accurate and unaltered), Availability (always accessible when needed). All three maintained simultaneously. |
| External vs. Internal threats? | External: originate outside perimeter (hackers, APTs, hacktivists). Internal: originate inside (malicious/accidental insiders). Internal often more dangerous due to existing access. |
| 3 social engineering psychological triggers? | Urgency (act now!), Fear/Consequences (lawsuit filed!), Authority Impersonation (pretending to be CEO/IRS/IT). |
| 2 phishing technical indicators? | Mismatched sender domain (real domain differs from displayed name), Hyperlink masking (displayed URL differs from actual destination URL on hover). |
| PII vs. SPII? | PII: identifies an individual (name, email, address). SPII: stricter category (SSN, biometrics, medical records, credentials) -- maximum protection required. |
| Blue Team vs. Red Team? | Blue: defenders (monitoring, incident response, playbooks). Red: ethical attackers (pen testing, simulating threats, finding gaps). |
| SIEM impossible travel anomaly? | Login from New York then Tokyo 14 minutes later = physically impossible. SIEM auto-locks session and alerts analyst. Classic credential compromise indicator. |
| IDS Signature vs. Anomaly detection? | Signature: matches known attack patterns (low false positives, blind to zero-days). Anomaly: detects deviations from baseline (catches zero-days, higher false positives). |
| Morris Worm's defensive lesson? | Led to creation of the first CERTs. Prototype for DoS via resource exhaustion. K8s lesson: always set CPU/RAM resource limits on containers. |
| LoveLetter's defensive lesson? | Marked dawn of large-scale social engineering. Human error is the most exploitable vector. Email filtering and security awareness training became essential. |
| Equifax breach cost? | $575 million regulatory settlement for failing to patch a KNOWN vulnerability for months. Direct financial cost of neglected patch management. |
| Virus vs. Worm? | Virus: requires user action to spread (opening file). Worm: self-replicating, spreads autonomously across networks with zero user interaction. |
| Spear Phishing vs. Whaling? | Spear Phishing: customized attack on specific individual. Whaling: spear phishing targeting specifically HIGH-PROFILE EXECUTIVES (CEO/CFO/CISO). |
| What is an APT? | Advanced Persistent Threat. Nation-state level group that stays UNDETECTED inside networks for months/years to gather intelligence or cause infrastructure damage. |
| CISSP Domain 5? | Identity and Access Management (IAM). Validating identities, enforcing authorization policies, applying Principle of Least Privilege. |
| 3 incident management priorities in order? | 1-Containment (stop data loss first), 2-Investigate root cause (after breach is stopped), 3-Execute Playbook (follow procedures exactly, never improvise). |
| Framework vs. Control? | Framework = strategic blueprint (what to protect and why). Control = operational safeguard (specific tool/process implementing the framework's goals). |
| NIST CSF 6 functions? | Govern, Identify, Protect, Detect, Respond, Recover (CSF 2.0 -- Govern was added in 2024). |
| GDPR breach notification window? | 72 HOURS to notify affected individuals AND supervisory authorities after discovering a data breach. |
| HIPAA breach notification window? | 60 DAYS from discovery of a breach affecting Protected Health Information (PHI). |
| Is hacking back legal in the US? | NO. Strictly illegal under the Computer Fraud and Abuse Act of 1986. Criminal vigilantism. Only approved military/federal personnel may legally counterattack. |
| What to do when CEO demands unauthorized data? | REFUSE. Mandate legal channels with documented paper trail. Document your refusal. Escalate to Legal if pressure continues. You are liable if you comply. |
| What is the Principle of Least Privilege? | Granting users and processes ONLY the minimum access required for their specific role. Primary defense against insider threats limiting blast radius of compromise. |
| Rainbow Table vs. Brute Force? | Brute Force: tries every combination (slow but thorough). Rainbow Table: looks up pre-computed hash-to-password mappings (instant for common passwords). Salting defeats rainbow tables. |

> **Course 1 Complete!**  
> **Foundations of Cybersecurity**  
> **Topics Mastered: CIA Triad  *  Threat Landscape  *  PII/SPII  *  Social Engineering  *  Phishing**  
> **Attack History  *  Malware Types  *  CISSP 8 Domains  *  SIEM  *  IDS  *  DFIR**  
> **Security Frameworks  *  NIST CSF  *  GDPR/HIPAA/PCI DSS  *  Security Ethics  *  Counterattack Laws**  
> **Next: Course 2 -- Play It Safe: Manage Security Risks -->**
