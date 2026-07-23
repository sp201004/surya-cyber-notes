## Contents

- [Core Concepts & Definitions](#core-concepts--definitions)
- [The CIA Triad — Deep Dive](#the-cia-triad--deep-dive)
- [CISSP's Eight Security Domains](#cissps-eight-security-domains)
- [IAM — The Four Components](#iam--the-four-components)
- [Threats, Risks & Vulnerabilities](#threats-risks--vulnerabilities)
- [Four Risk Management Strategies](#four-risk-management-strategies)
- [Impact of Security Breaches](#impact-of-security-breaches)
- [Ransomware & The Dark Web](#ransomware--the-dark-web)
- [NIST Risk Management Framework (RMF)](#nist-risk-management-framework-rmf)
- [Career Insights — Entry-Level Analyst](#career-insights--entry-level-analyst)

## Core Concepts & Definitions

> **🎯 What is Cybersecurity About?**
> The primary goal of cybersecurity is to protect business operations, users, and devices — creating a safer internet for everyone. Three foundational ideas underpin everything:

| **Term** | **Explanation** |
| --- | --- |
| **Security Posture** | An organization's overall ability to manage the defense of its critical assets AND react swiftly to changes in the threat landscape. Think of it as your organization's fitness level for handling attacks. |
| **InfoSec** | Information Security — the complete set of processes and practices established to protect any form of information (e.g., incident response, vulnerability management, cloud security, physical records). |
| **CIA Triad** | Confidentiality + Integrity + Availability — the three-pillar foundation of every security decision made in any organization worldwide. |
| **Shared Responsibility** | Security is NOT just IT's job. Every employee — from the CEO to a new intern — must actively participate in maintaining security. One click on a phishing link by any employee can bring down the whole organization. |

## The CIA Triad — Deep Dive

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

## CISSP's Eight Security Domains

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

> **1. Security and Risk Management**
> Defines security goals, risk mitigation plans, legal compliance, business continuity planning, and the ethical conduct of security professionals. Sets the overall direction for the organization's security strategy.
> **🔍 Example:** Ensuring internal data policies comply with GDPR to avoid multi-million-dollar EU fines. Drafting an Acceptable Use Policy (AUP) for company devices.

> **2. Asset Security**
> Secures both digital data and physical hardware throughout their full lifecycle: creation, storage, maintenance, retention, and proper destruction at end-of-life. Prevents data from being recovered from discarded equipment.
> **🔍 Example:** Physically shredding or degaussing old server hard drives so threat actors cannot extract data. Ensuring daily encrypted backups run to an offsite location.

> **3. Security Architecture and Engineering**
> Optimizes data security by designing effective tools, systems, and processes. Uses principles like Defense in Depth (multiple security layers) and Zero Trust (never trust, always verify every request).
> **🔍 Example:** Configuring a SIEM tool to baseline normal login patterns and auto-alert when someone logs in at 3 AM from a foreign country.

> **4. Communication and Network Security**
> Manages and secures physical networks (on-premises), wireless communications (Wi-Fi, Bluetooth), remote access channels, and cloud connectivity. Protects data in transit from interception.
> **🔍 Example:** Blocking remote employees from accessing sensitive databases over public coffee shop Wi-Fi without a company-approved encrypted VPN connection.

> **5. Identity and Access Management (IAM)**
> Keeps data secure by verifying who users are and restricting what resources they can access. Built on the Principle of Least Privilege (PoLP) — give users only the minimum access required to do their job, nothing more.
> **🔍 Example:** A customer service rep can view a client's phone number during an active support call, but that access is automatically revoked the moment the call ends. They cannot access billing or payment data.

> **6. Security Assessment and Testing**
> Identifies risks and validates that current security controls actually work as intended. Employs Penetration Testers (ethical hackers hired to attack systems before malicious hackers do) and runs security audits.
> **🔍 Example:** Running quarterly penetration tests to discover SQL injection vulnerabilities in a web app before cybercriminals do. Auditing user permissions to confirm no one has unauthorized admin rights.

> **7. Security Operations**
> Handles the day-to-day: investigating potential breaches, responding to active incidents, digital forensics after attacks, and implementing preventative measures learned from past incidents.
> **🔍 Example:** After a ransomware infection, conducting a digital forensic investigation to determine exactly when, how, and through which entry point the attacker accessed the network. Preserving evidence for law enforcement.

> **8. Software Development Security**
> Integrates secure coding practices at EVERY phase of the Software Development Life Cycle (SDLC). Security is built in from day one, not bolted on at the end. Includes code reviews, SAST/DAST scanning, and threat modeling.
> **🔍 Example:** Reviewing the source code of a medical device app before launch to verify patient health data is encrypted at rest and in transit. Preventing HIPAA violations before the product ships.

## IAM — The Four Components

> **IAM — Four-Step Access Control Flow**

```
  ┌─────────────────────────────────────────────────────────────────────┐
  │             IAM — FOUR PILLARS OF ACCESS CONTROL                    │
  └─────────────────────────────────────────────────────────────────────┘

  STEP 1: IDENTIFICATION          STEP 2: AUTHENTICATION
  ┌─────────────────────-─┐        ┌──────────────────────────────────┐
  │ 'Who are you?'        │  ───>  │ 'Prove it!'                      │
  │ Username / Employee ID│        │ Password + OTP + Biometric (MFA) │
  └──────────────────────-┘        └──────────────────────────────────┘
                                               │
                                               v
  STEP 4: ACCOUNTABILITY          STEP 3: AUTHORIZATION
  ┌────────────────────-──┐        ┌──────────────────────────────────┐
  │ 'Log everything!'     │  <───  │ 'What can you access?'           │
  │ Audit Logs, SIEM      │        │ Role-based access (RBAC)         │
  │ Tracks all actions    │        │ Least Privilege applied          │
  └─────────────────────-─┘        └──────────────────────────────────┘
```

## Threats, Risks & Vulnerabilities

> **⚠️ The Core Security Equation**
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

### Real-World Vulnerabilities (Advanced)

| **Vulnerability** | **Type** | **Real Impact** |
| --- | --- | --- |
| Log4Shell (Log4j) | Remote Code Execution (RCE) | Affected millions of servers worldwide in Dec 2021. Attackers could run ANY code on vulnerable systems remotely. |
| ProxyLogon | Exchange Server Exploit | Targeted Microsoft Exchange; gave attackers full email access and network entry. Used by state-sponsored hackers. |
| Server-Side Request Forgery (SSRF) | Web Application Attack | Tricks a server into accessing internal resources (like internal APIs or AWS metadata) that should be private. |
| Weak Passwords | Human/Config Vulnerability | The most common attack vector. 'Password123' or default credentials are cracked in seconds with dictionary attacks. |
| Unpatched Software | Configuration Vulnerability | WannaCry ransomware in 2017 exploited a Windows flaw that had a patch available 2 months before the attack. |

## Four Risk Management Strategies

> **💡 Risk Analogy**
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

## Impact of Security Breaches

| **Impact Type** | **Description** | **Real Example** |
| --- | --- | --- |
| Financial Loss | Halted production, regulatory fines, legal costs, ransom payments, system recovery expenses. | Equifax breach (2017) cost $575M+ in fines and settlements after 147M people's SSNs were exposed. |
| Identity Theft | Customer and employee PII is stolen and sold on dark web marketplaces. Victims face years of financial fraud. | 2013 Yahoo breach exposed 3 billion accounts; data sold on dark web for years afterward. |
| Reputation Damage | Loss of customer trust, negative media coverage, clients switching to competitors, stock price drops. | Facebook's Cambridge Analytica scandal caused massive user exodus and congressional hearings. |
| Operational Disruption | Systems go offline, business operations halt, employees cannot work, customers cannot be served. | 2021 Colonial Pipeline ransomware attack shut down fuel supply to the US East Coast for 6 days. |

## Ransomware & The Dark Web

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

> **🔒 How Ransomware Works — Step by Step**
> 1. DELIVERY: Attacker sends phishing email with malicious attachment or link.
> 2. EXECUTION: Victim opens attachment → malware installed silently in background.
> 3. PROPAGATION: Ransomware spreads across the network, infecting shared drives and backups.
> 4. ENCRYPTION: All files are encrypted with attacker's key. Victims see only locked files.
> 5. RANSOM NOTE: Screen displays demand 'Pay $X in Bitcoin within 48hrs or data is deleted/published.'
> 6. NEGOTIATION: Victim contacts attacker via Tor-based chat on the dark web.
> 7. OUTCOME: Payment (no guarantee of key) OR restore from clean backups (if they exist).
> 
> Key Defense: Maintain OFFLINE, air-gapped backups. Ransomware cannot encrypt what it cannot reach.

## NIST Risk Management Framework (RMF)

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
                                                        |
                                                        |
  ┌─────────┐   ┌──────────────┐   ┌───────────┐        |
  │ MONITOR │<──│   AUTHORIZE  │<──│  ASSESS   │<--------
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

## Career Insights — Entry-Level Analyst

> **🚀 You Don't Need to Be a Math Genius**
> Many successful security engineers come from retail, customer service, military, healthcare, and arts backgrounds. Cybersecurity values diverse thinking — attackers don't think like engineers, so defenders shouldn't only hire engineers.
> 
> T-Shaped Professional: Deep expertise in ONE area (e.g., incident response) + broad knowledge across others (networking, compliance, coding basics).
> 
> Soft Skills Matter as Much as Technical Skills:
> • **Teamwork**: You'll work with HR, Legal, Finance, and Engineering simultaneously during an incident.
> • **Communication**: Explaining technical risks to non-technical executives is a rare and valuable skill.
> • **Analytical Thinking**: If you can analyze a complex text or process, you can analyze a security log.
> • **Empathy**: Understanding human behavior is critical for detecting social engineering and insider threats.

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| **What does CIA stand for?** | Confidentiality, Integrity, Availability — the three pillars all security decisions are measured against. |
| **How many CISSP domains exist?** | 8 domains covering all aspects of professional cybersecurity practice. |
| **What is Least Privilege?** | Users receive ONLY the minimum access required for their specific job — nothing more. |
| **Risk formula?** | Risk = Threat + Vulnerability. Remove either element and risk disappears. |
| **Name 4 risk strategies.** | Acceptance, Avoidance, Transference, Mitigation. |
| **What is the Dark Web?** | Part of the internet requiring special software (Tor). Extreme anonymity. Used by criminals to sell stolen data and coordinate attacks. Not illegal to access, but criminal activity there is. |
| **What are NIST RMF's 7 steps?** | Prepare → Categorize → Select → Implement → Assess → Authorize → Monitor. |
