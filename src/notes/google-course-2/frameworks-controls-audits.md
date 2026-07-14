## Contents

- [What is a Security Framework?](#what-is-a-security-framework)
- [Security Controls — Three Major Categories](#security-controls--three-major-categories)
- [Four Functional Types of Controls](#four-functional-types-of-controls)
- [Core Technical Safeguards — Deep Dive](#core-technical-safeguards--deep-dive)
- [The CIA Triad — Applied in the Workplace](#the-cia-triad--applied-in-the-workplace)
- [Industry Frameworks — NIST CSF 2.0](#industry-frameworks--nist-csf-20)
- [OWASP Secure Design Principles](#owasp-secure-design-principles)
- [The Security Audit Lifecycle](#the-security-audit-lifecycle)

## What is a Security Framework?

> **📋 Framework = Blueprint**
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

## Security Controls — Three Major Categories

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

## Four Functional Types of Controls

> **FOUR CONTROL TYPES — Timeline View**
> **ATTACK TIMELINE ──────────────────────────────────────>**
> **BEFORE ATTACK         DURING ATTACK         AFTER ATTACK**

```
       │                      │                    │
  ┌────┴───────┐      ┌───────┴──────┐     ┌───────┴──────┐
  │ DETERRENT  │      │ PREVENTATIVE │     │  DETECTIVE   │
  │            │────> │              │────>│              │
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

## Core Technical Safeguards — Deep Dive

### Encryption: Plaintext vs. Ciphertext

> **ENCRYPTION FLOW — Protecting Data in Transit**
> **SENDER                                                   RECEIVER**

```
  ┌──────────────────┐                                    ┌──────────────────┐
  │ PLAINTEXT        │                                    │ PLAINTEXT        │
  │ 'Transfer $5000  │  ──[ ENCRYPTION KEY ]──>           │ 'Transfer $5000  │
  │  to account 123' │                                    │  to account 123' │
  └──────────────────┘                                    └──────────────────┘
          │                                                        ^
          v                                                        │
  ┌───────────────────────────────────────────────────────────────┐│
  │ CIPHERTEXT (in transit)                                       ││
  │ 'Xk9#mP2@qR5!nL8$vB3*wY6^uA4&oJ1%iC7~eD0'                     ││
  │                                [ DECRYPTION KEY ]──────────────┘
  └───────────────────────────────────────────────────────────────┘

  An attacker who intercepts the ciphertext gets NOTHING usable.
  Without the decryption key, it is mathematically impossible to read.
```

### Authentication & MFA — Three Factors

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

> **⚠️ Advanced Threat: Vishing (Voice Phishing)**
> AI voice-cloning technology now allows attackers to perfectly replicate a CEO's voice. They call an employee posing as the CEO and say: 'I'm stuck in a meeting — I need you to bypass MFA and approve this wire transfer immediately. Don't tell anyone.'
> 
> Defense: Establish a verbal code word or callback procedure for any high-stakes authorization request. Always verify through a second, independent channel (call back the CEO on their known number, not the number that called you).

## The CIA Triad — Applied in the Workplace

| **CIA Pillar** | **Core Meaning** | **How It's Enforced** | **Real Analyst Example** |
| --- | --- | --- | --- |
| Confidentiality | Only authorized people can see sensitive data. Strict need-to-know access. | Principle of Least Privilege, data classification, encryption, access control lists (ACLs). | A junior analyst can read application logs but cannot access the customer PII database. Role-based access controls enforce this automatically. |
| Integrity | Data must remain accurate, unmodified, and trustworthy. Any unauthorized change must be detected. | Cryptographic hashing, digital signatures, write permissions, file integrity monitoring (FIM). | An analyst receives an alert that a financial record was modified at 2 AM. Hash comparison shows the file was altered — a forensic investigation begins immediately. |
| Availability | Authorized users can always access systems and data when needed for business operations. | Redundant servers, load balancers, VPNs, DDoS protection, disaster recovery plans, uptime SLAs. | An accountant working remotely accesses payroll via VPN — fully available to her, but completely blocked to the attacker trying to log in from an unknown IP. |

## Industry Frameworks — NIST CSF 2.0

> **NIST CSF 2.0 — Applied Scenario**

```
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                     NIST CSF 2.0 — 6 CORE FUNCTIONS                         │
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

## OWASP Secure Design Principles

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

## The Security Audit Lifecycle

> **📋 What is a Security Audit?**
> A formal, structured review of an organization's controls, policies, and procedures — compared against internal standards or external regulations. Think of it as an exam: is your security as strong as you claim it is?
> 
> Entry-level analysts play a key role in internal audits — gathering evidence, mapping controls, and identifying gaps that could result in regulatory fines or security incidents.

> **5-STEP AUDIT LIFECYCLE**

```
  ┌────────────────────────────────────────────────────────────────────────┐
  │              SECURITY AUDIT — 5-STEP LIFECYCLE                         │
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
  ┌──────────────────────-┐
  │ STEP 5: COMMUNICATE   │
  │ & REPORT              │
  │ Findings + remediation│
  │ plan to leadership    │
  └──────────────────────-┘
```

### Step 1: Scope & Goals — Real Example

> **Audit Scenario: Internal IT Audit**
> SCOPE: Evaluate all endpoint user permissions, map existing network firewalls, document every technology deployed across the organization.
> GOALS: Verify adherence to NIST CSF 2.0 guidelines and identify gaps in system access controls.
> Duration: 4 weeks. Team: 2 analysts + 1 manager. Output: Full audit report with remediation roadmap.

### Step 2: Risk Assessment — Scoring

> **Risk Score: 8/10 (HIGH)**
> Assets Catalogued: 200 laptops, 50 mobile devices, 3 on-prem servers, 1 cloud storage bucket, customer PII database.
> Gap Found: Asset management is inadequate — no current inventory of who has access to what. No formal deprovisioning process when employees leave.
> Risk Drivers: No encryption on internal network communications. No formal access control reviews. PII stored without proper controls.
> Impact if Exploited: GDPR fine of up to 4% of annual global revenue. Reputational damage. Customer lawsuits.

### Step 3: Controls Assessment Matrix

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

### Step 4: Compliance Assessment

| **Regulation** | **Who It Applies To** | **Key Requirement** | **Company Status** |
| --- | --- | --- | --- |
| GDPR (EU) | Any org handling EU citizens' personal data | Notify affected users AND supervisory authority within 72 hours of a data breach. Users have 'right to be forgotten.' | APPLIES — Company serves EU customers. Currently NON-COMPLIANT: no breach notification procedure documented. |
| PCI DSS | Any org that processes, stores, or transmits credit card data | All payment data must be encrypted. Network segmentation required. Regular penetration testing mandatory. | APPLIES — Company takes online payments. PARTIAL COMPLIANCE: encryption missing on some internal segments. |
| HIPAA | Healthcare organizations & their business associates in the US | Protected Health Information (PHI) must be encrypted at rest and in transit. Access logs mandatory. | DOES NOT APPLY — Company is not in healthcare sector. |

### Step 5: Audit Report — Key Findings Summary

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

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| **What are the 3 types of security controls?** | Administrative (policies/procedures), Technical (software/hardware), Physical (locks/cameras). |
| **What are the 4 functional control types?** | Deterrent, Preventative, Detective, Corrective — applied across the attack timeline. |
| **Name the 6 NIST CSF 2.0 functions.** | Govern, Identify, Protect, Detect, Respond, Recover. |
| **What are the 5 steps of a security audit?** | Scope & Goals → Risk Assessment → Controls Assessment → Compliance Assessment → Communicate Results. |
| **What is GDPR's breach notification requirement?** | Affected individuals AND supervisory authorities must be notified within 72 hours of discovering a breach. |
| **Name the 3 MFA factor types.** | Something you KNOW (password), Something you HAVE (hardware key), Something you ARE (biometrics). |
| **What does 'Fail Securely' mean?** | When a system crashes, it must default to the most restrictive state (block all) — fail closed, not fail open. |
