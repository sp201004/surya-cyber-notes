> GOOGLE CYBERSECURITY CERTIFICATE
> **Course 2**
> **Play It Safe:**
> **Manage Security Risks**
> ─────────────────────────────────────────
> Comprehensive Enhanced Study Notes
> Modules 1 – 4  |  With Diagrams & Real-World Examples

| **Module 1**<br>Security Domains & Risk | **Module 2**<br>Frameworks & Audits | **Module 3**<br>SIEM & Security Tools | **Module 4**<br>Incident Response & Playbooks |
| --- | --- | --- | --- |

| **Module** | **Title** | **Topics Covered** |
| --- | --- | --- |
| **Module 1** | **Security Domains, Threats & Risk** | CISSP 8 Domains · CIA Triad · Risk Strategies · NIST RMF |
| **Module 2** | **Frameworks, Controls & Audits** | NIST CSF · OWASP · Control Types · Full Audit Walkthrough |
| **Module 3** | **SIEM Tools & Logs** | Log Sources · SIEM Architecture · Splunk · Chronicle · SOAR |
| **Module 4** | **Incident Response & Playbooks** | 6-Phase IR · Playbook Anatomy · Security Triad · Glossary |

| **Module 1** |
| --- |
| Security Domains, Threats, Risks & the NIST RMF |

# 1.1 Core Concepts & Definitions

> **🎯** **What** **is Cybersecurity About?**
> The primary goal of cybersecurity is to protect business operations, users, and devices — creating a safer internet for everyone. Three foundational ideas underpin everything:

| **Term** | **Explanation** |
| --- | --- |
| **Security Posture** | An organization's overall ability to manage the defense of its critical assets AND react swiftly to changes in the threat landscape. Think of it as your organization's fitness level for handling attacks. |
| **InfoSec** | Information Security — the complete set of processes and practices established to protect any form of information (e.g., incident response, vulnerability management, cloud security, physical records). |
| **CIA Triad** | Confidentiality + Integrity + Availability — the three-pillar foundation of every security decision made in any organization worldwide. |
| **Shared Responsibility** | Security is NOT just IT's job. Every employee — from the CEO to a new intern — must actively participate in maintaining security. One click on a phishing link by any employee can bring down the whole organization. |

# 1.2 The CIA Triad — Deep Dive

> **CIA TRIAD — Foundation of All Security**

```
                   ┌─────────────────────────────┐
                   │        CIA TRIAD            │
                   └─────────────────────────────┘

         ┌──────────────────┐
         │ CONFIDENTIALITY  │  ──── Who can SEE the data?
         │ (Need-to-Know)  │       Encryption, Access Controls,
         └──────────────────┘       Principle of Least Privilege
                  /\
                 /  \
                /    \
               /      \
  ┌────────────┐      ┌─────────────┐
  │  INTEGRITY │      │AVAILABILITY │
  │(Data is    │      │(Always      │
  │ accurate & │      │ accessible) │
  │ unmodified)│      │             │
  └────────────┘      └─────────────┘
  Hashing, Checksums   Redundancy, Backups,
  Digital Signatures   Uptime SLAs, VPNs

  ALL THREE must be maintained simultaneously.
  Sacrificing one weakens the entire security posture.
```

# 1.3 CISSP’s Eight Security Domains

The CISSP framework organizes all of cybersecurity into 8 domains. Security teams use these to assign responsibilities, identify coverage gaps, and plan defenses. Think of them as departments in a security organization.

> **CISSP 8 DOMAINS — AT A GLANCE**

```
  ┌─────────────────────────────────────────────────────────────────┐
  │               8 CISSP SECURITY DOMAINS                          │
  ├──────────────────────────────────────────────────────────────── ┤
  │  1. Security & Risk Mgmt    │  2. Asset Security                │
  │  3. Security Architecture   │  4. Communication & Network Sec   │
  │  5. IAM (Identity & Access) │  6. Security Assessment/Testing   │
  │  7. Security Operations     │  8. Software Development Security │
  └──────────────────────────────────────────────────────────────── ┘
```

| **1** | **Security and Risk Management**<br>Defines security goals, risk mitigation plans, legal compliance, business continuity planning, and the ethical conduct of security professionals. Sets the overall direction for the organization's security strategy.<br>**🔍** **Example:** Ensuring internal data policies comply with GDPR to avoid multi-million-dollar EU fines. Drafting an Acceptable Use Policy (AUP) for company devices. |
| --- | --- |

| **2** | **Asset Security**<br>Secures both digital data and physical hardware throughout their full lifecycle: creation, storage, maintenance, retention, and proper destruction at end-of-life. Prevents data from being recovered from discarded equipment.<br>**🔍** **Example:** Physically shredding or degaussing old server hard drives so threat actors cannot extract data. Ensuring daily encrypted backups run to an offsite location. |
| --- | --- |

| **3** | **Security Architecture and Engineering**<br>Optimizes data security by designing effective tools, systems, and processes. Uses principles like Defense in Depth (multiple security layers) and Zero Trust (never trust, always verify every request).<br>**🔍** **Example:** Configuring a SIEM tool to baseline normal login patterns and auto-alert when someone logs in at 3 AM from a foreign country. |
| --- | --- |

| **4** | **Communication and Network Security**<br>Manages and secures physical networks (on-premises), wireless communications (Wi-Fi, Bluetooth), remote access channels, and cloud connectivity. Protects data in transit from interception.<br>**🔍** **Example:** Blocking remote employees from accessing sensitive databases over public coffee shop Wi-Fi without a company-approved encrypted VPN connection. |
| --- | --- |

| **5** | **Identity and Access Management (IAM)**<br>Keeps data secure by verifying who users are and restricting what resources they can access. Built on the Principle of Least Privilege (PoLP) — give users only the minimum access required to do their job, nothing more.<br>**🔍** **Example:** A customer service rep can view a client's phone number during an active support call, but that access is automatically revoked the moment the call ends. They cannot access billing or payment data. |
| --- | --- |

| **6** | **Security Assessment and Testing**<br>Identifies risks and validates that current security controls actually work as intended. Employs Penetration Testers (ethical hackers hired to attack systems before malicious hackers do) and runs security audits.<br>**🔍** **Example:** Running quarterly penetration tests to discover SQL injection vulnerabilities in a web app before cybercriminals do. Auditing user permissions to confirm no one has unauthorized admin rights. |
| --- | --- |

| **7** | **Security Operations**<br>Handles the day-to-day: investigating potential breaches, responding to active incidents, digital forensics after attacks, and implementing preventative measures learned from past incidents.<br>**🔍** **Example:** After a ransomware infection, conducting a digital forensic investigation to determine exactly when, how, and through which entry point the attacker accessed the network. Preserving evidence for law enforcement. |
| --- | --- |

| **8** | **Software Development Security**<br>Integrates secure coding practices at EVERY phase of the Software Development Life Cycle (SDLC). Security is built in from day one, not bolted on at the end. Includes code reviews, SAST/DAST scanning, and threat modeling.<br>**🔍** **Example:** Reviewing the source code of a medical device app before launch to verify patient health data is encrypted at rest and in transit. Preventing HIPAA violations before the product ships. |
| --- | --- |

# 1.4 IAM — The Four Components

> **IAM — Four-Step Access Control Flow**

```
  ┌─────────────────────────────────────────────────────────────────────┐
  │             IAM — FOUR PILLARS OF ACCESS CONTROL                   │
  └─────────────────────────────────────────────────────────────────────┘

  STEP 1: IDENTIFICATION          STEP 2: AUTHENTICATION
  ┌──────────────────────┐        ┌──────────────────────────────────┐
  │ 'Who are you?'        │  ───>  │ 'Prove it!'                     │
  │ Username / Employee ID│        │ Password + OTP + Biometric (MFA)│
  └──────────────────────┘        └──────────────────────────────────┘
                                               │
                                               v
  STEP 4: ACCOUNTABILITY          STEP 3: AUTHORIZATION
  ┌──────────────────────┐        ┌──────────────────────────────────┐
  │ 'Log everything!'     │  <───  │ 'What can you access?'          │
  │ Audit Logs, SIEM      │        │ Role-based access (RBAC)        │
  │ Tracks all actions    │        │ Least Privilege applied         │
  └──────────────────────┘        └──────────────────────────────────┘
```

# 1.5 Threats, Risks & Vulnerabilities

> **⚠️ The** **Core Security Equation**
> RISK = THREAT  +  VULNERABILITY
> 
> Both components must exist simultaneously for an incident to occur.
> Example: A phishing email (THREAT) + an untrained employee who clicks it (VULNERABILITY) = a successful breach (RISK realized).
> Remove either element, or the risk disappears.

| **Term** | **Definition & Context** |
| --- | --- |
| **Asset** | Anything of value to the organization. Data, hardware, software, people, reputation. |
| **Low-Risk Asset** | Public info (website content, press releases). Compromise causes minimal damage. |
| **Medium-Risk Asset** | Internal non-public info (draft earnings reports, org charts). Leaking causes moderate financial/reputational harm. |
| **High-Risk Asset** | PII (Social Security Numbers, health records), trade secrets, financial data. Compromise causes catastrophic, potentially irreversible damage. |
| **Threat** | Any circumstance or event that can negatively impact assets. Example: phishing emails, ransomware, disgruntled insiders, natural disasters. |
| **Vulnerability** | A weakness that can be exploited. Humans are often the biggest vulnerability. Others: unpatched software, weak passwords, misconfigured firewalls. |

## Real-World Vulnerabilities (Advanced)

| **Vulnerability** | **Type** | **Real Impact** |
| --- | --- | --- |
| Log4Shell (Log4j) | Remote Code Execution (RCE) | Affected millions of servers worldwide in Dec 2021. Attackers could run ANY code on vulnerable systems remotely. |
| ProxyLogon | Exchange Server Exploit | Targeted Microsoft Exchange; gave attackers full email access and network entry. Used by state-sponsored hackers. |
| Server-Side Request Forgery (SSRF) | Web Application Attack | Tricks a server into accessing internal resources (like internal APIs or AWS metadata) that should be private. |
| Weak Passwords | Human/Config Vulnerability | The most common attack vector. 'Password123' or default credentials are cracked in seconds with dictionary attacks. |
| Unpatched Software | Configuration Vulnerability | WannaCry ransomware in 2017 exploited a Windows flaw that had a patch available 2 months before the attack. |

# 1.6 Four Risk Management Strategies

> **💡** **Risk** **Analogy**
> Risk = Being late to work.  Threats = traffic jam, flat tire, oversleeping.
> Strategy = How you plan to deal with it (leave early, call a cab, accept it, work from home).

> **1. Acceptance**
> Acknowledge the risk exists but consciously decide NOT to act on it because the cost of mitigation outweighs the potential damage. This is a deliberate, documented business decision — not ignorance.
> **Real Example:** A small startup accepts the risk of not having a 24/7 SOC because the annual cost of $500K exceeds their entire security budget.

> **2. Avoidance**
> Change your plans entirely to eliminate the risk. If an activity creates an unacceptable risk, simply don't do that activity.
> **Real Example:** A company avoids storing customer credit card numbers entirely by routing all payment processing through a certified third-party payment gateway (like Stripe), so they never touch card data.

> **3. Transference**
> Shift the financial or operational responsibility of the risk to another party. You still experience the incident, but someone else absorbs the cost.
> **Real Example:** Purchasing cyber insurance that covers legal costs, customer notification expenses, and lost revenue after a ransomware attack. Outsourcing email security to a managed security service provider (MSSP).

> **4. Mitigation**
> Take steps to reduce the likelihood OR the impact of the risk. The most common strategy — you don't eliminate the risk, but you make it much less damaging.
> **Real Example:** Installing endpoint antivirus, enabling MFA on all accounts, patching systems monthly, and training employees on phishing recognition — each one reduces the blast radius of an incident.

# 1.7 Impact of Security Breaches

| **Impact Type** | **Description** | **Real Example** |
| --- | --- | --- |
| Financial Loss | Halted production, regulatory fines, legal costs, ransom payments, system recovery expenses. | Equifax breach (2017) cost $575M+ in fines and settlements after 147M people's SSNs were exposed. |
| Identity Theft | Customer and employee PII is stolen and sold on dark web marketplaces. Victims face years of financial fraud. | 2013 Yahoo breach exposed 3 billion accounts; data sold on dark web for years afterward. |
| Reputation Damage | Loss of customer trust, negative media coverage, clients switching to competitors, stock price drops. | Facebook's Cambridge Analytica scandal caused massive user exodus and congressional hearings. |
| Operational Disruption | Systems go offline, business operations halt, employees cannot work, customers cannot be served. | 2021 Colonial Pipeline ransomware attack shut down fuel supply to the US East Coast for 6 days. |

# 1.8 Ransomware & The Dark Web

> **SURFACE / DEEP / DARK WEB — How They Differ**

```
  ┌────────────────────────────────────────────────────────────────────┐
  │                     LAYERS OF THE WEB                              │
  ├────────────────────────────────────────────────────────────────────┤
  │                                                                    │
  │  SURFACE WEB  (Indexed by Google, Bing, etc.)                      │
  │  └── Public websites, news sites, Wikipedia                        │
  │      ~4% of the entire internet                                    │
  │                                                                    │
  │  DEEP WEB  (Requires login/authorization)                          │
  │  └── Corporate intranets, online banking, email, cloud storage     │
  │      ~90% of the internet — completely legitimate                  │
  │                                                                    │
  │  DARK WEB  (Requires Tor browser / special software)               │
  │  └── Extreme anonymity — used by criminals to sell stolen data,    │
  │      trade ransomware kits, and negotiate ransom payments          │
  │      Also used by journalists & activists in repressive regimes    │
  │      ~6% of the internet                                           │
  └────────────────────────────────────────────────────────────────────┘
```

> **🔒** **How** **Ransomware Works — Step by Step**
> 1. DELIVERY: Attacker sends phishing email with malicious attachment or link.
> 2. EXECUTION: Victim opens attachment → malware installed silently in background.
> 3. PROPAGATION: Ransomware spreads across the network, infecting shared drives and backups.
> 4. ENCRYPTION: All files are encrypted with attacker's key. Victims see only locked files.
> 5. RANSOM NOTE: Screen displays demand ‘Pay $X in Bitcoin within 48hrs or data is deleted/published.'
> 6. NEGOTIATION: Victim contacts attacker via Tor-based chat on the dark web.
> 7. OUTCOME: Payment (no guarantee of key) OR restore from clean backups (if they exist).
> 
> Key Defense: Maintain OFFLINE, air-gapped backups. Ransomware cannot encrypt what it cannot reach.

# 1.9 NIST Risk Management Framework (RMF)

> **NIST RMF — Continuous 7-Step Risk Management Cycle**

```
  ┌─────────────────────────────────────────────────────────────────────────┐
  │                   NIST RMF — 7-STEP CYCLE                               │
  └─────────────────────────────────────────────────────────────────────────┘

  ┌─────────┐   ┌──────────────┐   ┌────────┐   ┌──────────────┐
  │ PREPARE │──>│  CATEGORIZE  │──>│ SELECT │──>│  IMPLEMENT   │
  │ Step 1  │   │   Step 2     │   │ Step 3 │   │   Step 4     │
  └─────────┘   └──────────────┘   └────────┘   └──────────────┘
                                                        │
            ┌───────────────────────────────────────────┘
            v
  ┌─────────┐   ┌──────────────┐   ┌───────────┐
  │ MONITOR │<──│   AUTHORIZE  │<──│  ASSESS   │
  │ Step 7  │   │   Step 6     │   │  Step 5   │
  └─────────┘   └──────────────┘   └───────────┘
       │
       └──> Continuous loop — security is never 'done'
```

| **Step** | **Name** | **What Happens** | **Analyst Action** |
| --- | --- | --- | --- |
| 1 | Prepare | Set the stage before any breach occurs. Establish context, resources, and team structure. | Document security policies, assign roles, build a risk-aware culture through training. |
| 2 | Categorize | Classify systems and data by their sensitivity and criticality to business operations. | Label data: Public, Internal, Confidential, Restricted. Identify crown jewels. |
| 3 | Select | Choose specific security controls from NIST SP 800-53 appropriate for the risk level. | Select controls like MFA, encryption, IDS — document WHY each was chosen. |
| 4 | Implement | Deploy the selected controls across systems, networks, and processes. | Enable MFA, configure firewall rules, deploy antivirus, enforce password policy. |
| 5 | Assess | Test whether implemented controls are actually working as designed. | Run penetration tests, review audit logs, conduct tabletop incident exercises. |
| 6 | Authorize | Leadership formally accepts remaining risks and authorizes systems to operate. | CISO signs off on residual risks. Decision is documented for accountability. |
| 7 | Monitor | Continuously watch systems to detect changes, new threats, and control effectiveness. | Daily SIEM review, automated alerts, quarterly control re-assessments. |

# 1.10 Career Insights — Entry-Level Analyst

> **🚀** **You** **Don't Need to Be a Math Genius**
> Many successful security engineers come from retail, customer service, military, healthcare, and arts backgrounds. Cybersecurity values diverse thinking — attackers don't think like engineers, so defenders shouldn't only hire engineers.
> 
> T-Shaped Professional: Deep expertise in ONE area (e.g., incident response) + broad knowledge across others (networking, compliance, coding basics).
> 
> Soft Skills Matter as Much as Technical Skills:
> • **Teamwork**: You'll work with HR, Legal, Finance, and Engineering simultaneously during an incident.
> • **Communication**: Explaining technical risks to non-technical executives is a rare and valuable skill.
> **• Analytical Thinking**: If you can analyze a complex text or process, you can analyze a security log.
> • **Empathy**: Understanding human behavior is critical for detecting social engineering and insider threats.

# 1.11  Quick Review — Module 1

| **Question** | **Answer** |
| --- | --- |
| **What does CIA stand for?** | Confidentiality, Integrity, Availability — the three pillars all security decisions are measured against. |
| **How many CISSP domains exist?** | 8 domains covering all aspects of professional cybersecurity practice. |
| **What is Least Privilege?** | Users receive ONLY the minimum access required for their specific job — nothing more. |
| **Risk formula?** | Risk = Threat + Vulnerability. Remove either element and risk disappears. |
| **Name 4 risk strategies.** | Acceptance, Avoidance, Transference, Mitigation. |
| **What is the Dark Web?** | Part of the internet requiring special software (Tor). Extreme anonymity. Used by criminals to sell stolen data and coordinate attacks. Not illegal to access, but criminal activity there is. |
| **What are NIST RMF's 7 steps?** | Prepare → Categorize → Select → Implement → Assess → Authorize → Monitor. |

| **Module 2** |
| --- |
| Security Frameworks, Controls, CIA Triad & Security Audits |

# 2.1 What is a Security Framework?

> **📋** **Framework** **= Blueprint**
> A security framework is like a comprehensive recipe book for organizational security. It provides high-level guidelines, standard policies, and compliance rules that an organization follows to build its cybersecurity program.
> 
> Beginner Analogy: If building a house, the framework is the architect's blueprint — it tells you what rooms you need, where to put load-bearing walls, and fire safety requirements. The actual bricks, locks, and alarm systems are your controls.
> 
> Advanced View: Frameworks are structured collections of compliance policies, best practices, and international technical standards that satisfy statutory, regulatory, and contractual requirements across physical, administrative, and cloud environments.

| **Security Dimension** | **Description** |
| --- | --- |
| **Virtual Space Security** | Securing cloud networks, databases, APIs, and code using software-defined controls. Firewalls, encryption, IDS, SIEM tools all operate here. |
| **Physical Space Security** | Securing the actual physical machinery that stores, processes, or transmits data. Locked server rooms, CCTV, badge access systems, security guards. |
| **The Human Element** | Humans are the #1 vulnerability in any security system. Social engineering, phishing, and insider threats all exploit human psychology, not software flaws. |

# 2.2 Security Controls — Three Major Categories

> **THREE CONTROL CATEGORIES**

```
  ┌─────────────────────────────────────────────────────────────────────┐
  │              THREE CATEGORIES OF SECURITY CONTROLS                  │
  └─────────────────────────────────────────────────────────────────────┘

  ┌────────────────────────┐  ┌────────────────────────┐  ┌────────────────────────┐
  │  ADMINISTRATIVE /      │  │  TECHNICAL CONTROLS    │  │  PHYSICAL CONTROLS     │
  │  MANAGERIAL CONTROLS   │  │                        │  │                        │
  ├────────────────────────┤  ├────────────────────────┤  ├────────────────────────┤
  │ Focus: HUMAN &         │  │ Focus: DIGITAL SYSTEMS │  │ Focus: TANGIBLE ASSETS │
  │ POLICY layer           │  │ & HARDWARE             │  │ & SPACES               │
  ├────────────────────────┤  ├────────────────────────┤  ├────────────────────────┤
  │ • Policies & Standards │  │ • Firewalls & IDS      │  │ • Locks & Cages        │
  │ • Procedures           │  │ • Encryption           │  │ • CCTV & Guards        │
  │ • Training Programs    │  │ • Antivirus Software   │  │ • Badge Access         │
  │ • Account Mgmt Policy  │  │ • MFA Systems          │  │ • Mantraps             │
  │ • Acceptable Use Policy│  │ • SIEM Tools           │  │ • Fire Suppression     │
  └────────────────────────┘  └────────────────────────┘  └────────────────────────┘
```

# 2.3  Four Functional Types of Controls

> **FOUR CONTROL TYPES — Timeline View**  
> **ATTACK TIMELINE ─────────────────────────────────────────────────────────────>**  
> **BEFORE ATTACK         DURING ATTACK         AFTER ATTACK**

```
       │                      │                     │
  ┌────┴───────┐      ┌───────┴──────┐     ┌───────┴──────┐
  │ DETERRENT  │      │ PREVENTATIVE │     │  DETECTIVE   │
  │            │ ──── │              │──>──│              │
  │Discourages │      │  Blocks the  │     │ Discovers it │
  │ the attack │      │   attempt    │     │  happened    │
  └────────────┘      └──────────────┘     └──────┬───────┘
                                                   │
                                                   v
                                          ┌────────────────┐
                                          │  CORRECTIVE    │
                                          │                │
                                          │ Fixes the mess │
                                          │ & restores ops │
                                          └────────────────┘
```

| **Control Type** | **Function** | **Example** | **When Active** |
| --- | --- | --- | --- |
| Deterrent | Psychologically discourages attackers by making success seem unlikely or risky. | Security camera signs, time-lock safes, warning banners on login screens. | Before the attack — psychological phase. |
| Preventative | Actively blocks or stops an attack from succeeding in the first place. | Strong password policies, MFA enforcement, locked server cabinets, firewall rules. | During the attack — blocking phase. |
| Detective | Identifies and alerts when an attack is occurring or has occurred. | CCTV footage review, SIEM alerts, IDS signatures, audit log monitoring. | During or immediately after — discovery phase. |
| Corrective | Limits damage and restores systems to normal operation after an incident. | Restoring from clean backup, patching exploited vulnerability, removing malware. | After the attack — recovery phase. |

# 2.4  Core Technical Safeguards — Deep Dive

## Encryption: Plaintext vs. Ciphertext

> **ENCRYPTION FLOW — Protecting Data in Transit**  
> **SENDER                                                   RECEIVER**

```
  ┌──────────────────┐                                    ┌──────────────────┐
  │ PLAINTEXT        │                                    │ PLAINTEXT        │
  │ 'Transfer $5000  │  ──[ ENCRYPTION KEY ]──>          │ 'Transfer $5000  │
  │  to account 123' │                                    │  to account 123' │
  └──────────────────┘                                    └──────────────────┘
          │                                                        ^
          v                                                        │
  ┌───────────────────────────────────────────────────────────────┐│
  │ CIPHERTEXT (in transit)                                       ││
  │ 'Xk9#mP2@qR5!nL8$vB3*wY6^uA4&oJ1%iC7~eD0'                   ││
  │                            ──[ DECRYPTION KEY ]──────────────┘│
  └───────────────────────────────────────────────────────────────┘

  An attacker who intercepts the ciphertext gets NOTHING usable.
  Without the decryption key, it is mathematically impossible to read.
```

## Authentication & MFA — Three Factors

> **MFA — THREE AUTHENTICATION FACTORS**  
> **MFA GATE — All factors must pass for access to be granted**

```
  ┌─────────────────────────────────────────────────────────────┐
  │ Factor 1: SOMETHING YOU KNOW                                │
  │  Password, PIN, Security Question, Passphrase               │
  │  Weakness: Can be guessed, phished, or data-breached        │
  ├─────────────────────────────────────────────────────────────┤
  │ Factor 2: SOMETHING YOU HAVE                                │
  │  Authenticator app OTP, Hardware key (YubiKey), Smart card  │
  │  Strength: Attacker must physically steal your device       │
  ├─────────────────────────────────────────────────────────────┤
  │ Factor 3: SOMETHING YOU ARE                                 │
  │  Fingerprint, Face ID, Iris scan, Palm vein pattern         │
  │  Strength: Biometrics cannot be 'forgotten' or 'shared'     │
  └─────────────────────────────────────────────────────────────┘

  Combining 2+ factors makes attacks exponentially harder.
  Even if your password leaks, attacker still cannot pass Factor 2 or 3.
```

> **⚠️ Advanced** **Threat: Vishing (Voice Phishing)**
> AI voice-cloning technology now allows attackers to perfectly replicate a CEO's voice. They call an employee posing as the CEO and say: 'I'm stuck in a meeting — I need you to bypass MFA and approve this wire transfer immediately. Don't tell anyone.'
> 
> Defense: Establish a verbal code word or callback procedure for any high-stakes authorization request. Always verify through a second, independent channel (call back the CEO on their known number, not the number that called you).

# 2.5 The CIA Triad — Applied in the Workplace

| **CIA Pillar** | **Core Meaning** | **How It's Enforced** | **Real Analyst Example** |
| --- | --- | --- | --- |
| Confidentiality | Only authorized people can see sensitive data. Strict need-to-know access. | Principle of Least Privilege, data classification, encryption, access control lists (ACLs). | A junior analyst can read application logs but cannot access the customer PII database. Role-based access controls enforce this automatically. |
| Integrity | Data must remain accurate, unmodified, and trustworthy. Any unauthorized change must be detected. | Cryptographic hashing, digital signatures, write permissions, file integrity monitoring (FIM). | An analyst receives an alert that a financial record was modified at 2 AM. Hash comparison shows the file was altered — a forensic investigation begins immediately. |
| Availability | Authorized users can always access systems and data when needed for business operations. | Redundant servers, load balancers, VPNs, DDoS protection, disaster recovery plans, uptime SLAs. | An accountant working remotely accesses payroll via VPN — fully available to her, but completely blocked to the attacker trying to log in from an unknown IP. |

# 2.6 Industry Frameworks — NIST CSF 2.0

> **NIST CSF 2.0 — Applied Scenario**

```
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                     NIST CSF 2.0 — 6 CORE FUNCTIONS                        │
  └─────────────────────────────────────────────────────────────────────────────┘

  ┌─────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌─────────┐   ┌─────────┐
  │ GOVERN  │──>│ IDENTIFY │──>│ PROTECT  │──>│  DETECT  │──>│ RESPOND │──>│ RECOVER │
  └─────────┘   └──────────┘   └──────────┘   └──────────┘   └─────────┘   └─────────┘
  Set strategy  Inventory      Deploy         Spot IOCs      Contain &     Restore to
  & oversight   all assets     safeguards     & anomalies    investigate   operations

  ─── SCENARIO: Employee plugs personal malware-infected phone into work laptop ───

  GOVERN:   AUP policy explicitly prohibits personal devices on corporate hardware.
  IDENTIFY: Alert fires — workstation ID, port location, and anomalous device flagged.
  PROTECT: Analyst remotely disables USB mass-storage on the laptop immediately.
  DETECT:   SIEM dashboard shows the unknown device's behavior vs. known malicious patterns.
  RESPOND:  Forensics run — confirmed personal device used to charge, malware installed.
  RECOVER: OS partition wiped, clean files restored from backup, device returned to service.
```

| **Framework** | **Scope & Use Case** |
| --- | --- |
| **NIST CSF 2.0** | Voluntary framework — 6 functions (Govern, Identify, Protect, Detect, Respond, Recover). Used by most private-sector organizations globally. |
| **NIST SP 800-53** | Mandatory for US Federal Government agencies. Extremely detailed catalog of specific technical security controls. Also used by government contractors. |
| **ISO/IEC 27001** | International standard for building and auditing an Information Security Management System (ISMS). Used globally across all industries. |
| **Cyber Threat Framework (CTF)** | US government framework for standardizing how threat intelligence is shared and communicated across different security teams and agencies. |

# 2.7 OWASP Secure Design Principles

The Open Worldwide Application Security Project (OWASP) defines 8 core principles that, if followed during design and development, prevent the vast majority of modern vulnerabilities before any code ships to users.

> **1. Minimize Attack Surface Area**
> **Concept:** Remove or disable every unnecessary feature, port, protocol, or access point. The fewer entry points, the fewer ways an attacker can get in. An unused open port is an unlocked door.
> **Example:** Analyst locks down a cloud server — shuts SSH port 22, disables FTP, and routes all admin access through a private internal gateway with strict IP allowlisting.

> **2. Establish Secure Defaults**
> **Concept:** A new system or application must ship in its most secure configuration out-of-the-box. Making it LESS secure should require deliberate administrator action — not more secure.
> **Example:** A new enterprise database installs with full encryption-at-rest enabled, default password complexity requirements enforced, and all external network access blocked until manually enabled.

> **3. Fail Securely**
> **Concept:** When a system crashes or encounters an error, it must default to the most RESTRICTIVE state — not open everything up. A crashed firewall should block all traffic, not allow all traffic.
> **Example:** Power fails unexpectedly in the data center. The smart door lock defaults to LOCKED (not open). The network firewall defaults to BLOCK ALL (not allow all). Fail closed, not fail open.

> **4. Separation of Duties**
> **Concept:** Critical operations must require multiple independent approvals. No single person should hold enough access to commit fraud or cause major damage alone. This prevents insider threats.
> **Example:** The accountant who CREATES the payroll batch cannot be the same person who APPROVES and RELEASES the payment. Two separate authenticated roles are required for the full action.

> **5. Don't Trust Services**
> **Concept:** Never assume third-party APIs, vendor platforms, or external data feeds are safe. All external input must be treated as potentially malicious and validated before use in your systems.
> **Example:** A rewards app receives loyalty point data from an external vendor API. Before inserting this data into the database, it's sanitized, schema-validated, and range-checked for impossible values.

> **6. Avoid Security by Obscurity**
> **Concept:** Security must NEVER rely on keeping source code or architecture secret. The system must be secure even if an attacker knows exactly how it works. Rely on strong cryptography, not secrecy.
> **Example:** An authentication system uses AES-256 encryption. Even if an attacker downloads the entire open-source codebase and knows exactly how the system works, they cannot break the math.

> **7. Keep Security Simple**
> **Concept:** Overly complex security controls are hard to maintain, prone to bugs, and tempt users to create workarounds. Simple, clear security mechanisms are more reliably effective.
> **Example:** Instead of 5 separate authentication apps for different internal systems, implement a single SSO (Single Sign-On) solution with MFA — one secure login grants appropriate access everywhere.

> **8. Fix Security Issues Correctly**
> **Concept:** When a breach occurs, find the ROOT CAUSE and fix it permanently. Don't just apply a quick patch. Run regression tests to ensure the fix works and no new vulnerabilities were introduced.
> **Example:** After tracing a breach to a legacy Wi-Fi node using WEP encryption, the analyst updates the global policy to mandate WPA3 across all access points and runs automated audits to verify compliance.

# 2.8 The Security Audit Lifecycle

> **📋** **What** **is a Security Audit?**
> A formal, structured review of an organization's controls, policies, and procedures — compared against internal standards or external regulations. Think of it as an exam: is your security as strong as you claim it is?
> 
> Entry-level analysts play a key role in internal audits — gathering evidence, mapping controls, and identifying gaps that could result in regulatory fines or security incidents.

> **5-STEP AUDIT LIFECYCLE**

```
  ┌────────────────────────────────────────────────────────────────────────┐
  │              SECURITY AUDIT — 5-STEP LIFECYCLE                        │
  └────────────────────────────────────────────────────────────────────────┘

  ┌──────────────────────┐
  │ STEP 1: SCOPE & GOALS│
  │ Define what's being  │
  │ reviewed and why     │
  └──────────┬───────────┘
             │
             v
  ┌──────────────────────┐
  │ STEP 2: RISK         │
  │ ASSESSMENT           │
  │ Identify gaps, score │
  │ risk 1-10            │
  └──────────┬───────────┘
             │
             v
  ┌──────────────────────┐
  │ STEP 3: CONTROLS     │
  │ ASSESSMENT           │
  │ Map admin/tech/phys  │
  │ controls to risks    │
  └──────────┬───────────┘
             │
             v
  ┌──────────────────────┐
  │ STEP 4: COMPLIANCE   │
  │ ASSESSMENT           │
  │ Check GDPR, PCI DSS, │
  │ HIPAA, etc.          │
  └──────────┬───────────┘
             │
             v
  ┌──────────────────────┐
  │ STEP 5: COMMUNICATE │
  │ & REPORT             │
  │ Findings + remediation│
  │ plan to leadership   │
  └──────────────────────┘
```

## Step 1: Scope & Goals — Real Example

> **Audit Scenario: Internal IT Audit**
> SCOPE: Evaluate all endpoint user permissions, map existing network firewalls, document every technology deployed across the organization.
> GOALS: Verify adherence to NIST CSF 2.0 guidelines and identify gaps in system access controls.
> Duration: 4 weeks. Team: 2 analysts + 1 manager. Output: Full audit report with remediation roadmap.

## Step 2: Risk Assessment — Scoring

> **Risk Score: 8/10 (HIGH)**
> Assets Catalogued: 200 laptops, 50 mobile devices, 3 on-prem servers, 1 cloud storage bucket, customer PII database.
> Gap Found: Asset management is inadequate — no current inventory of who has access to what. No formal deprovisioning process when employees leave.
> Risk Drivers: No encryption on internal network communications. No formal access control reviews. PII stored without proper controls.
> Impact if Exploited: GDPR fine of up to 4% of annual global revenue. Reputational damage. Customer lawsuits.

## Step 3: Controls Assessment Matrix

| **Control** | **Category** | **Type** | **Priority** | **Current Status** |
| --- | --- | --- | --- | --- |
| Least Privilege (PoLP) | Administrative | Preventative | HIGH | NOT IMPLEMENTED — Users have broad access beyond job requirements. |
| Password Policy (Complexity) | Administrative | Preventative | HIGH | PARTIAL — Policy exists but not technically enforced on all systems. |
| Disaster Recovery Plan | Administrative | Corrective | MEDIUM | NOT IMPLEMENTED — No documented recovery procedures exist. |
| Intrusion Detection System (IDS) | Technical | Detective | HIGH | NOT IMPLEMENTED — No automated anomaly detection on network. |
| Encryption (Data in Transit) | Technical | Deterrent | HIGH | NOT IMPLEMENTED — Internal traffic is unencrypted (plain HTTP). |
| Antivirus / EDR Software | Technical | Corrective | MEDIUM | IMPLEMENTED — Deployed on 80% of endpoints. 20% missing. |
| Server Room Locks | Physical | Preventative | HIGH | IMPLEMENTED — Biometric lock + badge access on server room. |
| CCTV Surveillance | Physical | Detective | HIGH | IMPLEMENTED — Cameras cover all entry/exit points. |
| Fire Detection & Suppression | Physical | Detective/Preventative | HIGH | IMPLEMENTED — Automated halon suppression in server room. |

## Step 4: Compliance Assessment

| **Regulation** | **Who It Applies To** | **Key Requirement** | **Company Status** |
| --- | --- | --- | --- |
| GDPR (EU) | Any org handling EU citizens' personal data | Notify affected users AND supervisory authority within 72 hours of a data breach. Users have 'right to be forgotten.' | APPLIES — Company serves EU customers. Currently NON-COMPLIANT: no breach notification procedure documented. |
| PCI DSS | Any org that processes, stores, or transmits credit card data | All payment data must be encrypted. Network segmentation required. Regular penetration testing mandatory. | APPLIES — Company takes online payments. PARTIAL COMPLIANCE: encryption missing on some internal segments. |
| HIPAA | Healthcare organizations & their business associates in the US | Protected Health Information (PHI) must be encrypted at rest and in transit. Access logs mandatory. | DOES NOT APPLY — Company is not in healthcare sector. |

## Step 5: Audit Report — Key Findings Summary

> **Delivered to: CISO & Executive Leadership Team**
> HIGH PRIORITY (Fix within 30 days):
> • Implement Least Privilege across all systems — revoke unnecessary admin rights.
> • Enable encryption on all internal network segments (TLS 1.3 minimum).
> • Deploy IDS on network perimeter and internal core switch.
> • Document GDPR breach notification procedure — assign a Data Protection Officer.
> 
> MEDIUM PRIORITY (Fix within 90 days):
> • Complete antivirus rollout to remaining 20% of endpoints.
> • Create and test Disaster Recovery Plan with actual failover exercise.
> • Achieve full PCI DSS compliance on payment processing infrastructure.
> 
> Next Audit: Schedule in 6 months to verify remediation completion.

| **Module 3** |
| --- |
| Security Tools, Logs & SIEM Dashboards |

# 3.1 Understanding Logs — Your Eyes on the Network

> **📒** **What** **is a Log?**
> Beginner: A log is a digital receipt or diary entry — an automated, timestamped record of an event that occurred in a system, application, or network device.
> 
> Advanced: Logs provide immutable telemetry data. During forensic investigations and incident response, logs are parsed for Indicators of Compromise (IOCs) to reconstruct exactly how and when a threat actor bypassed network defenses.
> 
> Real Impact: Without logs, a breach is invisible. With logs, you can reconstruct every step an attacker took — when they entered, what they accessed, and how they tried to cover their tracks.

# 3.2  Three Critical Log Sources

> **THREE LOG SOURCES — At a Glance**

```
  ┌─────────────────────────────────────────────────────────────────────────┐
  │                    THREE LOG SOURCES                                   │
  └─────────────────────────────────────────────────────────────────────────┘

  INTERNET/EXTERNAL                    INTERNAL NETWORK                 SERVERS
       │                                      │                            │
       v                                      v                            v
  ┌─────────────┐    ┌───────────────────────────────────┐    ┌───────────────────┐
  │  FIREWALL   │    │       NETWORK LOGS                │    │  SERVER LOGS      │
  │    LOGS     │    │                                   │    │                   │
  ├─────────────┤    ├───────────────────────────────────┤    ├───────────────────┤
  │ Incoming    │    │ All devices entering/leaving       │    │ Authentication    │
  │ connection  │    │ network. Connections between       │    │ events: logins,   │
  │ attempts    │    │ internal devices. Network scans.   │    │ failed attempts,  │
  │ from the    │    │                                   │    │ password resets   │
  │ internet    │    │                                   │    │                   │
  └─────────────┘    └───────────────────────────────────┘    └───────────────────┘

   Example:           Example:                                Example:
   Unknown IP         Compromised laptop scanning             Admin login at 3AM
   hit port 22        restricted financial DB server          on a Sunday
   50x in 1 minute    (unusual internal traffic)             (suspicious timing)
```

| **Log Type** | **What It Records** | **Detective Scenario** | **Key Question Answered** |
| --- | --- | --- | --- |
| Firewall Logs | All inbound connection attempts from the internet. All outbound data requests leaving the network. Blocked and allowed traffic rules. | Unknown external IP attempting to connect to internal server 50+ times per minute — likely a port scan or brute-force attack. | Who is trying to get INTO our network? What is trying to LEAVE our network? |
| Network Logs | All devices (laptops, phones, IoT) connecting to or disconnecting from the network. All communication flows between internal devices. | A compromised employee laptop suddenly starts scanning and connecting to the restricted financial database server — lateral movement detected. | What devices are on our network? Are internal devices communicating in unusual ways? |
| Server Logs | Application events for specific services (web, email, file shares). Heavily focused on authentication — login attempts, usernames, passwords, session tokens. | An administrator account logs into the payroll database at 3:00 AM on a Sunday — a major anomaly for that account's baseline behavior. | Who authenticated to what system, when, and from where? |

# 3.3  Introduction to SIEM Tools

> **🏢**  **Why Manual Log Reading Fails at Scale**
> A Fortune 500 company generates 5–10 MILLION log entries per day across its network.
> At a reading speed of 1 log per second, 24/7, it would take a human analyst 58 DAYS to read just one day's logs.
> SIEM tools solve this impossibility by automating collection, correlation, and alerting — humans review only the flagged anomalies.

> **SIEM — How It Processes Log Data**

```
  ┌─────────────────────────────────────────────────────────────────────────┐
  │                    HOW A SIEM WORKS                                    │
  └─────────────────────────────────────────────────────────────────────────┘

  DATA SOURCES            SIEM ENGINE              ANALYST OUTPUT
  ┌────────────┐          ┌──────────────────────┐  ┌─────────────────────┐
  │ Firewalls  │──────>   │                      │  │ Real-time Dashboard │
  │ Servers    │──────>   │  1. COLLECT          │  │ with alerts,charts, │
  │ Endpoints  │──────>   │  2. NORMALIZE        │  │ maps, and graphs    │
  │ Cloud Apps │──────>   │  3. CORRELATE        │  └─────────────────────┘
  │ Network    │──────>   │  4. ANALYZE          │
  │ Devices    │──────>   │  5. ALERT            │  ┌─────────────────────┐
  │ IDS/IPS    │──────>   │                      │  │ Automated SOAR      │
  │ VPN Logs   │──────>   │  Millions of logs    │  │ Response triggered  │
  └────────────┘          │  processed into      │  │ on high-confidence  │
                          │  actionable alerts   │  │ alerts              │
                          └──────────────────────┘  └─────────────────────┘

  ⚠ IMPORTANT: SIEMs require CONSTANT tuning. They do not work out-of-the-box.
  False positives (noise) must be reduced. New threat patterns must be added.
  An untuned SIEM either misses real threats or drowns analysts in false alarms.
```

# 3.4  SIEM Dashboards & Scenario Analysis

> **📊**  **Dashboard Analogy**
> Reading raw text logs during a crisis = trying to navigate a city by reading raw GPS coordinates (numbers).
> A SIEM Dashboard = Google Maps for your network — same data, instantly visual and actionable.
> 
> Dashboards convert millions of log entries into charts, graphs, maps, and color-coded alerts — enabling a 30-second situation assessment instead of hours of manual digging.

## Real-World Dashboard Scenario: The Suspicious Login

> **Incident: SIEM Alert — 'Suspicious Authentication Detected'**
> WITHOUT a SIEM Dashboard: Analyst manually searches through 2M+ server log lines. Takes 3–4 hours to locate the relevant entries.
> 
> WITH a SIEM Dashboard (30 seconds):
> • Bar chart shows: 500 FAILED login attempts in 5 minutes on one account.
> • Geographic map shows: All attempts originate from Russia — user is known to be in Chicago.
> • Time overlay shows: Attacks began at 2:37 AM local time — outside any normal working hours.
> • Verdict: Classic credential stuffing / brute-force attack. Account locked. IP range blocked.
> 
> Metrics that flagged this: Failed auth rate per minute, geographic origin of auth requests, time-of-day baseline deviation.

## Real-World Scenario: Website DDoS Outage

> **Incident: E-commerce Website Goes Offline**
> Step 1 — SIEM Collects: Web server logs from all front-end nodes flow into SIEM in real-time.
> Step 2 — SIEM Correlates: Dashboard highlights a 10,000% spike in incoming HTTP requests.
> Step 3 — SIEM Alerts: High-severity alert triggers: 'Potential DDoS Attack — Abnormal Traffic Volume.'
> Step 4 — Analyst Acts: Uses the visual IP map to identify attacking IP ranges and blocks them via firewall rule — site back online in 8 minutes.
> 
> Without SIEM: Analyst would spend hours manually parsing crashed web server log files, trying to identify attacking IPs one by one while the site remains down and the company loses $50,000/minute in revenue.

# 3.5  Open-Source vs. Proprietary Tools

> **OPEN-SOURCE vs. PROPRIETARY — Key Differences**

```
  ┌─────────────────────────────────────────────────────────────────────────┐
  │           OPEN-SOURCE  vs.  PROPRIETARY                                │
  ├────────────────────────────────┬────────────────────────────────────────┤
  │  OPEN-SOURCE                  │  PROPRIETARY                           │
  ├────────────────────────────────┼────────────────────────────────────────┤
  │ Source code: PUBLIC            │ Source code: PRIVATE (vendor only)     │
  │ Cost: FREE                     │ Cost: Expensive licensing fees         │
  │ Customization: UNLIMITED       │ Customization: Vendor-controlled       │
  │ Security: Community-reviewed   │ Security: Vendor-patched on schedule   │
  │ Patches: Fast (community)      │ Patches: Slow (wait for vendor release)│
  │ Support: Community forums      │ Support: Dedicated vendor support      │
  ├────────────────────────────────┼────────────────────────────────────────┤
  │ Examples: Linux, Suricata,     │ Examples: Splunk Enterprise,           │
  │           Wireshark, Snort     │           Google Chronicle, CrowdStrike│
  └────────────────────────────────┴────────────────────────────────────────┘

  MYTH: Open-source is less secure because hackers can see the code.
  REALITY: MORE security researchers worldwide reviewing = faster vulnerability discovery.
  Linux powers 96% of the world's top 1 million web servers.
```

| **Open-Source Tool** | **Function & Context** |
| --- | --- |
| **Linux (OS)** | Open-source operating system. Serves as the interface between hardware and the user. Security professionals heavily customize it via the command line for server management, forensics, and security tool hosting. |
| **Suricata** | Open-source network analysis and threat detection engine. Maintained by the OISF (Open Information Security Foundation). Inspects network traffic in real-time, matches against threat signatures, and integrates with SIEM tools to feed alerts. |
| **Wireshark** | Open-source network protocol analyzer. Captures and analyzes individual network packets. Used by analysts for deep-dive investigation of specific network traffic during incident response. |
| **Snort** | Open-source IDS/IPS (Intrusion Detection/Prevention System). Monitors network traffic against rule sets and either alerts (IDS mode) or actively blocks (IPS mode) suspicious traffic. |

# 3.6  SIEM Deployment Models

| **Deployment Model** | **How It Works** | **Best For** | **Trade-off** |
| --- | --- | --- | --- |
| Self-Hosted (On-Premises) | Organization installs and maintains SIEM on its own physical servers in its own data center. | Organizations with classified data that legally cannot leave their facilities (government, defense, healthcare). | High upfront hardware cost. Organization responsible for maintenance, patches, and scaling. |
| Cloud-Hosted | SIEM software maintained entirely by the vendor; accessed via internet browser. | Organizations that want enterprise security without buying server infrastructure. Startups and mid-size companies. | Ongoing subscription cost. Data leaves your physical premises — may not meet all compliance requirements. |
| Hybrid | Sensitive operations and classified data on self-hosted servers. Fast, scalable processing pushed to the cloud. | Large enterprises with both compliance requirements and massive data volumes. Best of both worlds. | Complex architecture to manage. Requires expertise in both on-prem and cloud environments. |

# 3.7  Industry Giants — Splunk vs. Google Chronicle

> **SPLUNK vs. CHRONICLE**

```
  ┌─────────────────────────────────────────────────────────────────────────┐
  │              SPLUNK  vs.  GOOGLE CHRONICLE                             │
  ├──────────────────────────────────┬──────────────────────────────────────┤
  │  SPLUNK                          │  GOOGLE CHRONICLE                   │
  ├──────────────────────────────────┼──────────────────────────────────────┤
  │ Type: Self-hosted OR Cloud       │ Type: Cloud-Native only             │
  │ Origin: Built for on-prem,       │ Origin: Built FROM SCRATCH for cloud│
  │         later moved to cloud     │         Fully leverages Google infra │
  │ Data Processing: Good at real-   │ Data Processing: Petabyte-scale      │
  │                  time searching  │ search — extreme speed & scale       │
  │ Interface: SPL query language    │ Interface: UDM + YARA-L rules       │
  │ Pricing: Per GB of data indexed  │ Pricing: Per user/capacity model    │
  │ Strength: Massive ecosystem,     │ Strength: Google AI integration,    │
  │           thousands of plugins   │           unmatched scalability      │
  └──────────────────────────────────┴──────────────────────────────────────┘

  KEY DISTINCTION: 'Cloud-native' (Chronicle) ≠ 'Cloud-hosted' (Splunk Cloud).
  Chronicle was architecturally designed for cloud from day one.
  Splunk Cloud is the same on-prem software running on cloud infrastructure.
```

# 3.8  Splunk Dashboards — Deep Dive

| **Dashboard Name** | **Primary Purpose** | **What an Analyst Uses It For** | **Key Data Shown** |
| --- | --- | --- | --- |
| Security Posture Dashboard | Real-time SOC situation awareness. | Monitoring active threats during a shift. The first screen every analyst opens at the start of a workday. | Last 24 hours of notable events, highest-severity alerts, active incident count. |
| Executive Summary Dashboard | High-level organizational health overview. | Generating weekly/monthly security reports for CISO and non-technical leadership. Communicating security value. | Trend lines, incident totals, MTTR (mean time to respond), compliance status. |
| Incident Review Dashboard | Forensic timeline construction. | Building the attack timeline during an active investigation. Spotting patterns across multiple related alerts. | Visual event timeline, correlated alerts, severity rankings, affected hosts. |
| Risk Analysis Dashboard | Behavioral anomaly detection per entity. | Investigating a specific user, device, or IP that is behaving unusually. Risk scoring per entity. | Risk score over time, anomalous events per entity, peer comparison baselines. |

# 3.9  Google Chronicle Dashboards — Deep Dive

| **Dashboard Name** | **Primary Purpose** | **What It Detects** | **Key Feature** |
| --- | --- | --- | --- |
| Enterprise Insights | Identify Indicators of Compromise (IOCs) across the network. | Known malicious domains, IPs, or file hashes present in network traffic. | Confidence Score (0-100%) + Severity Level for each IOC — helps prioritize response. |
| IOC Matches | Track top threats and malicious IPs over time. | Long-term threat campaigns targeting the organization. Persistent attacker infrastructure. | Trend view over weeks/months — reveals attackers who 'low and slow' exfiltrate data. |
| Rule Detections | Show which security rules are triggering most frequently. | Recurring attack patterns — e.g., phishing clicks, repeated failed auth, policy violations. | Helps identify gaps: a rule triggering 1000x/day means either a real problem or a misconfigured rule. |
| Data Ingestion & Health | Monitor the SIEM itself for reliability. | Gaps in log collection — if a source stops sending logs, attacks in that area become invisible. | Source-by-source data receipt confirmation. Alerts when a log source goes silent. |
| User Sign-In Overview | Authentication anomaly detection. | Impossible travel, simultaneous logins from multiple countries, account sharing. | Time-series heatmap of auth events per user — makes anomalies visually obvious at a glance. |

> **🔍**  **'Impossible Travel' Explained**
> Scenario: John Smith's account logs in from New York at 9:03 AM. Same account logs in from Tokyo at 9:11 AM.
> Problem: It's physically impossible to travel from New York to Tokyo in 8 minutes.
> What this means: John's credentials have been stolen. The second login is an attacker.
> SIEM Action: High-confidence alert fired. Account immediately suspended pending verification.
> Chronicle Dashboard: User Sign-In Overview flags this as a critical geographic anomaly.

# 3.10  The Future of SIEM & Security

| **Trend** | **What It Means** | **Security Impact** |
| --- | --- | --- |
| IoT Explosion | Billions of smart devices (cameras, thermostats, medical devices, industrial sensors) are now network-connected. | Massively expands the attack surface. Each IoT device is a potential entry point. SIEMs must process orders of magnitude more log volume. |
| AI & Machine Learning in SIEM | AI models trained on billions of security events learn to recognize attack patterns that humans miss. | SIEMs can detect zero-day attacks (never seen before). Reduce false positives by 90%+. Automatically prioritize which alerts need human attention. |
| SOAR Integration | Security Orchestration, Automation, and Response — automated playbook execution triggered by SIEM alerts. | When SIEM detects a confirmed threat, SOAR auto-executes the first response steps (block IP, isolate host) in seconds — before a human could even read the alert. |
| Extended Detection & Response (XDR) | Next evolution beyond SIEM — integrates endpoint, network, cloud, and identity telemetry into one unified platform. | Single pane of glass for all security data. Correlated detections across ALL layers simultaneously. Replaces siloed security tools. |

# 3.11  SIEM vs. SOAR — The Key Distinction

> **SIEM + SOAR + PLAYBOOK — The Security Triad**

```
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                SIEM  vs.  SOAR  —  Working Together                        │
  └─────────────────────────────────────────────────────────────────────────────┘

  1. SIEM (The Alarm)                                    2. SOAR (The Automated Responder)
  ┌─────────────────────────────────┐                    ┌──────────────────────────────────┐
  │ Collects ALL logs               │   ────ALERT────>   │ Receives high-confidence alert   │
  │ Correlates patterns             │                    │ Executes pre-defined playbook     │
  │ Fires alert on anomaly          │                    │ automatically within milliseconds │
  │                                 │                    │ • Block IP at firewall            │
  │ 'Brute force detected:          │                    │ • Disable user account            │
  │  500 failed logins in 5 min     │                    │ • Isolate infected endpoint       │
  │  on account: jsmith@corp.com'   │                    │ • Create incident ticket          │
  └─────────────────────────────────┘                    └───────────────┬──────────────────┘
                                                                          │
                                                                          v
                                                         3. PLAYBOOK (The Human Guide)
                                                         ┌──────────────────────────────────┐
                                                         │ Immediate threat is contained.   │
                                                         │ Analyst opens playbook:           │
                                                         │ • Call jsmith to verify identity  │
                                                         │ • Issue secure password reset     │
                                                         │ • Write incident report           │
                                                         │ • Escalate if confirmed breach    │
                                                         └──────────────────────────────────┘
```

| **Module 4** |
| --- |
| Incident Response, Playbooks & The Security Triad |

# 4.1  What is a Playbook?

> **📖**  **Playbook = Security Recipe Book**
> Beginner Analogy: Just like a recipe tells you exactly how to bake a cake step by step, a playbook tells a security analyst exactly what to do when a specific security alarm goes off.
> 
> Advanced: Playbooks provide a predefined, highly structured, standardized operational response. They eliminate hesitation and guesswork during high-stress breach scenarios, ensure legal compliance, preserve forensic evidence integrity, and encode decades of organizational security experience into repeatable procedures.
> 
> Also called: Runbooks (when focused on technical execution steps).

## Anatomy of a Playbook

> **PLAYBOOK ANATOMY — Structure & Example**

```
  ┌─────────────────────────────────────────────────────────────────────────┐
  │                    PLAYBOOK STRUCTURE                                  │
  └─────────────────────────────────────────────────────────────────────────┘

  ┌──────────────────────────────────┐  ┌─────────────────────────────────────┐
  │  THE STRATEGY (The 'WHAT' & 'WHO')│  │  THE PLAN (The 'HOW')               │
  ├──────────────────────────────────┤  ├─────────────────────────────────────┤
  │ • Overall goal of response       │  │ • Step-by-step technical procedures │
  │ • Who is responsible for what    │  │ • Decision flowcharts               │
  │ • Escalation paths               │  │ • Checklists with checkboxes        │
  │ • Communication requirements     │  │ • Tool-specific commands            │
  │ • Legal/compliance obligations   │  │ • Evidence collection procedures   │
  └──────────────────────────────────┘  └─────────────────────────────────────┘

  Example Playbook: 'Unauthorized External Login Detected'
  ┌─────────────────────────────────────────────────────────────────────────┐
  │  STRATEGY:                                                              │
  │   Tier 1 Analyst → Verify login legitimacy                             │
  │   Tier 2 Analyst → Account lockdown if confirmed malicious             │
  │   Security Manager → Notify CISO if data exfiltration suspected        │
  │  PLAN:                                                                  │
  │  Step 1: Call employee on verified number — 'Are you traveling?'       │
  │  Step 2: If NOT traveling → Force password reset + revoke all tokens   │
  │  Step 3: Check logs for data exfiltration in past 24 hours             │
  │  Step 4: Preserve all relevant logs as forensic evidence               │
  │  Step 5: Document timeline and submit incident report within 2 hours   │
  └─────────────────────────────────────────────────────────────────────────┘
```

# 4.2  Playbooks as Living Documents

> **🔄**  **Why Playbooks Are Never 'Done'**
> A playbook written today becomes outdated the moment the threat landscape shifts. Security teams maintain and update playbooks continuously — they are living documents, not static manuals.

| **Trigger for Update** | **What Changed** | **Real Example** |
| --- | --- | --- |
| A Failure Occurred | A gap in the playbook is discovered during a real incident — either a step was missing, unclear, or produced the wrong outcome. | During a ransomware response, the analyst couldn't find the offline backup location because it wasn't documented in the playbook. New step added: 'Location of offline backups: [path].' |
| Industry Standards Changed | New best practice, framework update, or regulatory change requires procedure updates. | NIST updates its IR framework. All playbooks must be reviewed against the new guidance within 90 days and updated to reflect new requirements. |
| A New Threat Emerged | A brand new attack type, malware family, or threat actor TTP (tactic, technique, procedure) requires new defensive steps. | MOVEit zero-day exploitation begins. Zero existing playbook for MOVEit-specific attacks. Security team writes a new playbook within 48 hours based on vendor advisories and CISA alerts. |
| Legal/Regulatory Change | New law mandates different notification timelines, data handling, or documentation requirements. | New state privacy law requires breach notification within 24 hours (previously 72 hours). All incident response playbooks updated to reflect new deadline. |

# 4.3  Why Strict Playbook Adherence is Critical

| **Reason** | **Explanation** | **What Happens if You Skip Steps** |
| --- | --- | --- |
| Legal Compliance | Playbooks encode regulatory requirements — GDPR notification timelines, HIPAA breach procedures, PCI DSS evidence requirements. Deviating risks legal liability. | Missing GDPR's 72-hour notification window results in fines up to 4% of global annual revenue. Skipping a step is not just a procedural error — it's potential criminal liability. |
| Error Reduction Under Stress | During an active breach, adrenaline impairs decision-making. Following a checklist eliminates the cognitive load of deciding 'what do I do next' in a crisis. | An analyst, panicking during a ransomware event, reboots infected servers to 'fix it' — destroying volatile memory forensic evidence that could have identified the attacker. |
| Forensic Integrity | Digital evidence must be collected in a legally defensible manner. Improper handling makes evidence inadmissible in court, and attackers go unprosecuted. | Analyst directly accesses a compromised system's files (modifying access timestamps). In court, defense attorneys argue evidence was tampered with — case dismissed. |

# 4.4  The Six Phases of Incident Response

> **📋**  **Definition: Incident Response**
> An organization's quick, structured attempt to: (1) Identify an attack, (2) Contain the damage, and (3) Correct the effects of a security breach — while preserving evidence and maintaining legal compliance throughout the process.

> **6-PHASE INCIDENT RESPONSE CYCLE**

```
  ┌─────────────────────────────────────────────────────────────────────────────────┐
  │                 SIX PHASES OF INCIDENT RESPONSE                                │
  └─────────────────────────────────────────────────────────────────────────────────┘

  ┌──────────────┐   ┌──────────────────┐   ┌───────────────┐
  │   PHASE 1    │──>│    PHASE 2       │──>│   PHASE 3     │
  │ PREPARATION  │   │ DETECTION &      │   │ CONTAINMENT   │
  │              │   │ ANALYSIS         │   │               │
  │ Before the   │   │ Is it real?      │   │ Stop the      │
  │ incident     │   │ How bad?         │   │ bleeding      │
  └──────────────┘   └──────────────────┘   └───────┬───────┘
                                                     │
  ┌──────────────┐   ┌──────────────────┐   ┌───────v───────┐
  │   PHASE 6    │   │    PHASE 5       │   │   PHASE 4     │
  │ COORDINATION │<──│ POST-INCIDENT    │<──│ ERADICATION & │
  │              │   │ ACTIVITY         │   │ RECOVERY      │
  │ Legal &      │   │ Lessons learned  │   │               │
  │ reporting    │   │ Update playbooks │   │ Clean & restore│
  └──────────────┘   └──────────────────┘   └───────────────┘
```

| **1** | **Preparation — Building the Foundation**<br>Setting up everything BEFORE an incident occurs. Documenting procedures, staffing an on-call response team, educating employees on phishing and social engineering, creating Business Continuity Plans (BCPs), and establishing communication trees so everyone knows who to call when something goes wrong. You cannot prepare during a crisis — preparation happens now. |
| --- | --- |

| **2** | **Detection and Analysis — Is This Real?**<br>Receiving an alert (from SIEM, IDS, or user report) and analyzing it to determine: Is this a true incident or a false alarm? How severe is it? What systems are affected? An analyst receives a SIEM alert for a suspicious file download. They analyze the log data to check if the file matches known malware signatures, where it came from, and whether it has executed. Classification determines the response urgency. |
| --- | --- |

| **3** | **Containment — Stop the Bleeding**<br>Preventing the incident from spreading further. This is the most time-critical phase. The goal is NOT to fix everything — it's to limit damage FIRST. Isolate (network-disconnect) an infected laptop so ransomware cannot propagate to file servers. Block the attacker's IP at the firewall. Suspend the compromised user account to prevent further unauthorized access. |
| --- | --- |

| **4** | **Eradication and Recovery — Clean Up & Restore**<br>Completely removing all traces of the attacker and returning systems to verified clean operation. Delete malicious code and persistence mechanisms. Patch the specific software vulnerability the attacker exploited. Restore databases and files from the most recent clean, verified backup. Perform a full integrity check before returning systems to production. Do NOT rush this phase — incomplete eradication means the attacker returns. |
| --- | --- |

| **5** | **Post-Incident Activity — Learn and Improve**<br>After the dust settles, the team conducts a thorough post-mortem. What happened? Why did it happen? Could it have been prevented? Document the complete incident timeline, notify organizational leadership, update the relevant playbooks with lessons learned, and implement new controls to prevent recurrence. This phase is what separates organizations that improve from those that get breached the same way twice. |
| --- | --- |

| **6** | **Coordination — Communicate Throughout**<br>This phase runs in parallel with ALL other phases — not just at the end. Reporting obligations exist throughout the response. Notify the FBI if a federal crime was committed. Meet GDPR's 72-hour breach notification requirement. Coordinate with your legal team, PR team, and insurance provider simultaneously. Share threat intelligence with ISACs (Information Sharing and Analysis Centers) to protect other organizations from the same attacker. |
| --- | --- |

# 4.5  The Security Triad: SIEM + SOAR + Playbook

> **SIEM + SOAR + PLAYBOOK — Full Response Flow**

```
  ┌─────────────────────────────────────────────────────────────────────────────────┐
  │              THE SECURITY OPERATIONS TRIAD                                     │
  │              SIEM  ──>  SOAR  ──>  PLAYBOOK                                   │
  └─────────────────────────────────────────────────────────────────────────────────┘

  ┌──────────────────────────────────────────────────────────────────────────────┐
  │ STEP 1: SIEM DETECTS                                                         │
  │ Network monitoring → Anomaly spotted → Alert generated                       │
  │ Example: User 'jsmith' makes 50 failed logins in 60 seconds from Russia      │
  └──────────────────────────────────────────────────────────────────┬───────────┘
                                                                     │
                                                                     v
  ┌──────────────────────────────────────────────────────────────────────────────┐
  │ STEP 2: SOAR RESPONDS (Automated — milliseconds)                             │
  │ Pre-configured playbook rules execute automatically:                         │
  │  • Block attacking IP range at firewall                                      │
  │  • Disable jsmith's account                                                  │
  │  • Generate incident ticket in Jira/ServiceNow                               │
  │  • Send PagerDuty alert to on-call analyst's phone                           │
  └──────────────────────────────────────────────────────────────────┬───────────┘
                                                                     │
                                                                     v
  ┌──────────────────────────────────────────────────────────────────────────────┐
  │ STEP 3: ANALYST FOLLOWS PLAYBOOK (Human — minutes to hours)                  │
  │ Immediate automated threat is contained. Analyst takes over:                 │
  │  • Call jsmith on verified number to check if they're traveling              │
  │  • Review last 48hrs of jsmith's data access for exfiltration                │
  │  • Coordinate with HR if insider threat suspected                            │
  │  • Issue secure password reset and re-enable account if verified legit       │
  │  • Write full incident report within SLA deadline                            │
  └──────────────────────────────────────────────────────────────────────────────┘
```

# 4.6  Career Insights — Entry-Level Analyst Reality

> **💡**  **The Playbook = Decades of Experience in Your Hands**
> It is impossible for any entry-level analyst to know how to respond to every attack type from memory. No one does. Even veterans refer to playbooks.
> 
> Playbooks encode the collective wisdom of every senior analyst who has ever responded to that type of incident. When you follow a playbook, you are benefiting from the hard-won experience of people who have managed real breaches under real pressure.
> 
> Your job as an entry-level analyst: Execute the playbook accurately, observe what is happening, document everything precisely, and escalate appropriately when something falls outside the playbook scope.

> **🤝**  **Cybersecurity is NOT a Solo Sport**
> The Dark Room Myth: Many people imagine a security analyst as a lone person in a dark room typing code for 12 hours a day with no human contact.
> 
> The Reality: Approximately 50% of an analyst's time is spent communicating and collaborating:
> • Briefing the CISO and executive team on active threats
> • Coordinating with IT teams to push emergency patches
> • Working with Legal to navigate compliance requirements
> • Partnering with HR during insider threat investigations
> • Training employees on security awareness
> • Writing incident reports that non-technical stakeholders can understand
> 
> Communication and relationship-building skills are just as important as technical skills — and much harder to teach.

> **🌍**  **Privacy by Design — Building Security In**
> Security and privacy should be embedded into technology from day one — not added as an afterthought after users are already using it.
> 
> Principle: If a new product is being designed today, its privacy and security architecture should account for threats 2-5 years into the future — not just current threats.
> 
> Example: When WhatsApp engineers designed end-to-end encryption, they built it into the core messaging protocol — not as an optional add-on feature that users have to remember to enable.
> 
> Lesson: It is 10x cheaper to build security in during design than to patch it in after deployment. Security debt is real and expensive.

# 4.7  Master Glossary — Course 2 Complete

| **Term** | **Definition** |
| --- | --- |
| Asset | Anything of value to an organization — data, hardware, software, people, intellectual property, reputation. |
| Attack Surface | The total number of possible entry points an attacker could exploit. Smaller = safer. |
| Authentication (AuthN) | Proving you are who you claim to be. The verification step before access is granted. |
| Authorization (AuthZ) | Defining what resources an authenticated user is allowed to access or modify. |
| Availability | Systems and data are accessible to authorized users whenever needed. One pillar of the CIA Triad. |
| Brute-Force Attack | Systematically trying every possible password combination until the correct one is found. |
| Business Continuity Plan (BCP) | A documented plan allowing a business to maintain operations and recover from major disruptions like breaches or natural disasters. |
| CIA Triad | Confidentiality, Integrity, Availability — the three foundational pillars of all security decision-making. |
| CISSP | Certified Information Systems Security Professional — a globally recognized security certification framework dividing the field into 8 domains. |
| Compliance | Adhering to laws, regulations, and standards (e.g., GDPR, PCI DSS, HIPAA) that govern how data must be handled. |
| Confidentiality | Only authorized individuals can access sensitive data. Enforced via encryption, access controls, and Least Privilege. |
| Dark Web | Requires special software (Tor) to access. Provides extreme anonymity — used by criminals to sell stolen data and communicate. |
| DDoS Attack | Distributed Denial of Service — flooding a server with traffic from thousands of sources to overwhelm and take it offline. |
| Defense in Depth | Layering multiple security controls so that if one fails, others still provide protection. |
| Digital Forensics | The process of collecting, preserving, and analyzing digital evidence from devices in a legally defensible manner. |
| Eradication | Phase 4 of IR — completely removing all attacker presence from compromised systems before restoration. |
| Firewall | A network security device that monitors and controls incoming and outgoing traffic based on predefined rules. |
| GDPR | General Data Protection Regulation — EU law protecting citizen data privacy. Mandates 72-hour breach notification. |
| IAM | Identity and Access Management — the framework for managing digital identities and controlling what they can access. |
| IDS | Intrusion Detection System — monitors traffic and generates alerts for suspicious patterns. Does NOT block — only detects. |
| IOC | Indicator of Compromise. Forensic evidence suggesting a breach: known malicious IP, unexpected file hash, unusual process. |
| IPS | Intrusion Prevention System — like IDS but actively BLOCKS suspicious traffic in addition to alerting. |
| Incident Response (IR) | An organization's structured process to identify, contain, eradicate, and recover from security incidents. |
| Indicator of Compromise (IOC) | Forensic evidence suggesting a system has been breached — e.g., known malicious IP, unexpected file hash, unusual process. |
| Integrity | Data remains accurate and unmodified. Changes are only made by authorized users through authorized processes. |
| Least Privilege (PoLP) | Users receive only the minimum access rights needed to perform their job functions — nothing more. |
| MFA | Multi-Factor Authentication — requires 2+ independent verification factors (know + have + are) to authenticate. |
| NIST CSF | National Institute of Standards & Technology Cybersecurity Framework — voluntary 6-function framework for enterprise risk management. |
| NIST RMF | NIST Risk Management Framework — mandatory 7-step framework for US federal government risk management. |
| PCI DSS | Payment Card Industry Data Security Standard — mandates security requirements for organizations handling credit card data. |
| Penetration Testing | Authorized ethical hacking — paying security professionals to intentionally attack your systems to find vulnerabilities before malicious hackers do. |
| PII | Personally Identifiable Information — data that can identify an individual: name, SSN, DOB, address, email, biometrics. |
| Phishing | Deceptive emails/messages designed to trick recipients into revealing credentials or installing malware. |
| Playbook (Runbook) | A documented manual with explicit step-by-step procedures for responding to specific security events. |
| Ransomware | Malware that encrypts victim's files and demands payment for the decryption key. Spread via phishing and unpatched vulnerabilities. |
| Risk | The likelihood that a threat will exploit a vulnerability and cause harm to an asset. Risk = Threat + Vulnerability. |
| Security Audit | A formal review comparing an organization's security controls against internal standards or external regulatory requirements. |
| Security Control | A safeguard implemented to reduce risk to an acceptable level. Can be administrative, technical, or physical. |
| Security Framework | A structured set of guidelines and best practices for building and managing an organization's security program. |
| Security Posture | An organization's overall ability to defend its critical assets and adapt to changes in the threat landscape. |
| SIEM | Security Information and Event Management — aggregates and analyzes logs from across an organization, generating real-time alerts. |
| SOAR | Security Orchestration, Automation, and Response — automates the execution of response playbooks triggered by SIEM alerts. |
| Social Engineering | Manipulating humans (rather than machines) to disclose sensitive information or take unsafe actions. Phishing is the most common form. |
| Threat | Any event, actor, or circumstance with the potential to negatively impact assets. Can be internal, external, intentional, or accidental. |
| Vishing | Voice phishing — using phone calls (often with AI voice cloning) to impersonate trusted individuals and extract information. |
| Vulnerability | A weakness in a system, process, or person that could be exploited by a threat to cause harm. |
| Zero Trust | A security model based on 'never trust, always verify' — every access request is authenticated and authorized, even from inside the network. |

# 4.8  Quick-Review Flashcard Matrix — All Modules

| **Question** | **Answer** |
| --- | --- |
| What does CIA stand for in security? | Confidentiality, Integrity, Availability — the three pillars that all security decisions are measured against. |
| How many CISSP domains exist? | 8 domains covering all aspects of professional cybersecurity practice. |
| What is the Principle of Least Privilege? | Users receive ONLY the minimum access rights required for their specific job function — nothing more. |
| What is the difference between a Threat and a Vulnerability? | A Threat is what could harm you (e.g., a hacker). A Vulnerability is the weakness they exploit (e.g., unpatched software). Both must exist for risk to materialize. |
| Name the 4 Risk Management Strategies. | Acceptance, Avoidance, Transference, Mitigation. |
| What is the difference between SIEM and SOAR? | SIEM collects logs and fires alerts. SOAR automatically executes the response to those alerts without waiting for a human. |
| What are the 3 types of security controls? | Administrative (policies/procedures), Technical (software/hardware), Physical (locks/cameras). |
| What are the 4 functional control types? | Deterrent, Preventative, Detective, Corrective — applied across the attack timeline. |
| Name the 6 NIST CSF 2.0 functions. | Govern, Identify, Protect, Detect, Respond, Recover. |
| What are the 5 steps of a security audit? | Scope & Goals → Risk Assessment → Controls Assessment → Compliance Assessment → Communicate Results. |
| What is GDPR's breach notification requirement? | Affected individuals AND supervisory authorities must be notified within 72 hours of discovering a breach. |
| What is the difference between authentication and authorization? | Authentication = proving who you are (login). Authorization = what you're allowed to do/access after logging in. |
| Name the 3 MFA factor types. | Something you KNOW (password), Something you HAVE (hardware key), Something you ARE (biometrics). |
| What is Impossible Travel and which SIEM detects it? | A user logging in from two geographically distant locations within a timeframe that makes physical travel impossible. Detected by Google Chronicle's User Sign-In Overview dashboard. |
| Name the 6 phases of Incident Response. | 1-Preparation, 2-Detection & Analysis, 3-Containment, 4-Eradication & Recovery, 5-Post-Incident Activity, 6-Coordination. |
| What is a Playbook? | A documented manual with explicit step-by-step procedures an analyst follows when responding to a specific type of security incident. |
| Why must playbooks be updated regularly? | Because failures reveal gaps, industry standards change, new threats emerge, and laws impose new requirements — all requiring updated response procedures. |
| What is the Dark Web? | A part of the internet requiring special software (Tor) to access. Provides extreme anonymity. Used by criminals to sell stolen data and communicate about criminal operations. |
| What is 'Cloud-Native' vs 'Cloud-Hosted'? | Cloud-Native (e.g., Chronicle) = built from scratch specifically for cloud infrastructure. Cloud-Hosted (e.g., Splunk Cloud) = traditional software running on cloud hardware. |
| What is SSRF? | Server-Side Request Forgery — an attack where a malicious input tricks a server into accessing internal resources (like private APIs or metadata services) that should never be exposed externally. |
| What is the CIA Triad and why does it matter? | Confidentiality (who can see data), Integrity (data stays accurate and unmodified), Availability (always accessible when needed). Every security decision is measured against these three pillars. |

> **🎉**  **Course 2 Complete!**
> Play It Safe: Manage Security Risks
> You've mastered: Security Domains · CIA Triad · NIST Frameworks · Security Audits
> SIEM Tools · Log Analysis · Open-Source Security · Incident Response · Playbooks
> **Next Up: Network Security →**
