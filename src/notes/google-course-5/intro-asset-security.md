## Contents

- [The CIA Triad — Foundation of All Security](#the-cia-triad--foundation-of-all-security)
- [The Three Elements of Security Planning](#the-three-elements-of-security-planning)
- [Risk Management — Equation & Register](#risk-management--equation--register)
- [Asset Classification — Four Levels](#asset-classification--four-levels)
- [The Three States of Data](#the-three-states-of-data)
- [Cloud Computing & Shared Responsibility Model](#cloud-computing--shared-responsibility-model)
- [Security Plan: Policies, Standards & Procedures](#security-plan-policies-standards--procedures)
- [NIST Cybersecurity Framework (CSF)](#nist-cybersecurity-framework-csf)

## The CIA Triad — Foundation of All Security

> **KEY CONCEPT: Every security decision is evaluated against these three pillars:**
> **CONFIDENTIALITY:** Only authorized people can access data.
> **INTEGRITY:** Data is accurate, untampered, and reliable.
> **AVAILABILITY:** Data and systems are accessible to authorized users when needed.
> 
> Violating ANY ONE pillar = a security incident. All three must be maintained simultaneously.

> **CIA TRIAD — Three Pillars of Security**

```
                    +------------------------------+
                    |        CIA  TRIAD            |
                    +------------------------------+

         +--------------------+
         | CONFIDENTIALITY    |  --> Only authorized users see data
         | Encryption, PoLP   |      Passwords, access controls, IAM
         | Need-to-know basis |
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
  Hashing, digital    Redundancy, backups,
  signatures, FIM     uptime SLAs, DDoS mitigation
```

## The Three Elements of Security Planning

| **Element** | **What It Is** | **Examples** | **Why It Matters** |
| --- | --- | --- | --- |
| **ASSETS (The 'What')** | Anything perceived as having value to the organization. | Physical: laptops, servers, buildings. Digital: customer databases, source code. Intangible: brand reputation, IP. | You can only protect what you know you have. Untracked assets = unprotected assets. |
| **THREATS (The 'Why')** | Any circumstance or event that can negatively impact assets. | Intentional: phishing attack, insider theft. Unintentional: employee holds door for stranger, storm knocks out power. | Understanding threats reveals WHY security controls are necessary. |
| **VULNERABILITIES (The 'How')** | A weakness or flaw in an asset that a threat can exploit. | Technical: unpatched server, weak encryption. Human: poor password habits, lost badge, social engineering. | The specific flaw that allows a threat to cause damage. Fix vulnerabilities to break the threat-exploit chain. |

> **EXAMPLE: Home Analogy — Connecting All Three**
> **ASSET:**         Your television (valuable item inside the home).
> **VULNERABILITY:** Weak lock on the front door, cracked wood frame around the door.
> **THREAT:**        A burglar actively looking to break in, or a severe windstorm.
> **RISK:**          Likelihood of burglar x Impact of theft = Priority to fix the lock.
> If you fix the lock (remove vulnerability), the burglar (threat) cannot cause harm.

## Risk Management — Equation & Register

> **KEY CONCEPT: The Risk Priority Formula**
> RISK SCORE = LIKELIHOOD (1-3) x SEVERITY/IMPACT (1-3)
> 
> **Likelihood:** 1=Rare  2=Likely  3=Certain/Imminent
> **Severity:**   1=Low   2=Moderate  3=High/Catastrophic
> **Score range:** 1 (lowest priority) to 9 (CRITICAL -- fix immediately)

> **RISK REGISTER — Likelihood x Severity Matrix**
> **RISK REGISTER EXAMPLE (Bank Security Assessment):**

```
  +---------------------------------+------------+-----------+-------+
  | Risk                            | Likelihood | Severity  | Score |
  +---------------------------------+------------+-----------+-------+
  | Customer financial records leak |     3      |     3     |   9   | <- CRITICAL
  | Ransomware attack on servers    |     2      |     3     |   6   | <- HIGH
  | Phishing email to employee      |     3      |     2     |   6   | <- HIGH
  | Server room power failure       |     2      |     2     |   4   | <- MEDIUM
  | Supply chain disruption         |     1      |     2     |   2   | <- LOW
  +---------------------------------+------------+-----------+-------+

  Priority 9 = Drop everything, fix NOW.
  Priority 1-2 = Schedule for later, monitor in meantime.
```

## Asset Classification — Four Levels

> **NOTE: Why Classify Assets?**
> **Classification tells every employee:** 'Who can access this? How carefully must we handle it?'
> Without classification, a junior employee might email a trade secret not knowing it was sensitive.
> Classification drives access controls, encryption requirements, and handling procedures.

> **ASSET CLASSIFICATION — Four Levels**
> **ASSET CLASSIFICATION HIERARCHY:**

```
  +-------------------------------------------------------------+
  | RESTRICTED (Highest)                                        |
  | Need-to-know only. Most sensitive. Severe harm if exposed.  |
  | Examples: Intellectual property, healthcare records (PHI),  |
  |           encryption keys, board meeting strategy docs.     |
  +-------------------------------------------------------------+
                        |
  +-------------------------------------------------------------+
  | CONFIDENTIAL                                                |
  | Significant negative impact if disclosed publicly.          |
  | Examples: Internal emails about unreleased product plans,   |
  |           salary data, M&A negotiations in progress.        |
  +-------------------------------------------------------------+
                        |
  +-------------------------------------------------------------+
  | INTERNAL-ONLY                                               |
  | Available to employees and partners, not the public.        |
  | Examples: Company holiday schedules, internal procedures,   |
  |           org charts, internal tool documentation.          |
  +-------------------------------------------------------------+
                        |
  +-------------------------------------------------------------+
  | PUBLIC (Lowest)                                             |
  | No negative consequences if released to the public.         |
  | Examples: Company website, press releases, job postings,    |
  |           publicly filed financial statements.              |
  +-------------------------------------------------------------+
```

## The Three States of Data

| **State** | **Definition** | **Security Controls Needed** | **Real Example** |
| --- | --- | --- | --- |
| **Data IN USE** | Actively being accessed or processed by a user or application at this moment. | Screen locks, endpoint security (EDR), MFA to access, no shoulder surfing, encrypted RAM. | You are reading an email on your screen. The email content is in use in your browser. |
| **Data IN TRANSIT** | Travelling from one location to another over a network. | TLS/HTTPS encryption, VPN tunnels, certificate validation, secure email (S/MIME). | You click 'Send' on an email. Data travels from your laptop to the mail server over the internet. |
| **Data AT REST** | Stored on a device, drive, or cloud storage and not currently being accessed. | Full-disk encryption (BitLocker/FileVault), database encryption, access controls on storage. | That same email saved on your closed laptop's hard drive, or backed up in cloud storage. |

## Cloud Computing & Shared Responsibility Model

> **IMPORTANT: The Biggest Cloud Threat: Misconfiguration**
> The #1 cause of cloud breaches is NOT the cloud provider's infrastructure being hacked.
> It is the CUSTOMER misconfiguring their own resources (S3 buckets left public, IAM roles too permissive).
> The cloud provider secures the infrastructure. YOU must secure what you PUT on it.

| **Service Model** | **Provider Secures** | **Customer Secures** | **Example** |
| --- | --- | --- | --- |
| **IaaS (Infrastructure as a Service)** | Physical hardware, data center, hypervisor, networking hardware. | OS patches, runtime, applications, data, IAM config, network rules. | AWS EC2. You rent a blank VM -- install and secure everything above the hypervisor. |
| **PaaS (Platform as a Service)** | Everything in IaaS + OS, runtime, middleware. | Your application code, data, user access management. | Google App Engine. Deploy code -- provider handles OS and server management. |
| **SaaS (Software as a Service)** | Everything. Full application managed by provider. | Your data, user access settings, compliance obligations. | Gmail, Slack, Zoom. You just use it -- zero infrastructure management. |

## Security Plan: Policies, Standards & Procedures

> **SECURITY PLAN HIERARCHY**
> **SECURITY PLAN HIERARCHY:**

```
  +---------------------------------------------------------------+
  | POLICIES (Strategic -- The 'WHAT' and 'WHY')                  |
  | High-level rules that reduce risk and protect information.    |
  | Set by leadership. Cannot be ignored.                         |
  | Example: 'No personal email for company data' (AUP)           |
  +---------------------------------------------------------------+
                        |
                        v (informed by)
  +---------------------------------------------------------------+
  | STANDARDS (Tactical -- The 'HOW WELL')                        |
  | References and baselines informing HOW policies are met.      |
  | Often based on external frameworks (NIST, ISO 27001).         |
  | Example: 'Passwords must be at least 12 characters' (NIST)    |
  +---------------------------------------------------------------+
                        |
                        v (implemented via)
  +---------------------------------------------------------------+
  | PROCEDURES (Operational -- The 'EXACTLY HOW')                 |
  | Step-by-step instructions for performing specific tasks.      |
  | Used daily by employees and IT staff.                         |
  | Example: '5-step process for helpdesk to reset passwords'     |
  +---------------------------------------------------------------+
```

## NIST Cybersecurity Framework (CSF)

> **NIST CSF 2.0 — Framework Overview**
> **NIST CSF 2.0 — SIX CORE FUNCTIONS:**

```
  +---------+  +----------+  +---------+  +--------+  +--------+  +---------+
  | GOVERN  |->| IDENTIFY |->| PROTECT |->| DETECT |->| RESPOND|->| RECOVER |
  +---------+  +----------+  +---------+  +--------+  +--------+  +---------+
  Set strategy  Inventory     Deploy        Spot       Contain &   Restore to
  & oversight    all assets   safeguards    IOCs &     investigate  normal ops
  (new in 2024)              (MFA, enc.)   anomalies

  TIERS (Maturity Levels):
  Tier 1 = PASSIVE  (minimal, reactive, ad-hoc)  -- bare minimum
  Tier 2 = RISK INFORMED (aware but not formal processes)
  Tier 3 = REPEATABLE   (formal policies, practiced regularly)
  Tier 4 = ADAPTIVE     (exemplary, continuous improvement, proactive)

  PROFILES = Pre-made templates tracking current state vs. target state.
```

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| **What does CIA stand for?** | Confidentiality (authorized access only), Integrity (data stays accurate), Availability (always accessible when needed). |
| **Asset vs. Vulnerability vs. Threat?** | Asset = what you protect (laptop). Vulnerability = the weakness (unpatched OS). Threat = what exploits it (hacker). All three must align for a breach. |
| **Risk formula?** | Risk Score = Likelihood (1-3) x Severity (1-3). Score 9 = critical. Score 1 = low priority. |
| **4 Asset classification levels?** | Restricted (highest) -> Confidential -> Internal-only -> Public (lowest). |
| **3 states of data?** | In Use (being accessed now), In Transit (traveling over network), At Rest (stored, not accessed). |
| **Biggest cloud security threat?** | Misconfiguration by the customer. Not the provider's infrastructure -- your own IAM, storage, and network settings. |
| **Policy vs. Standard vs. Procedure?** | Policy = what and why (rules). Standard = how well (baselines). Procedure = exact step-by-step (operational instructions). |
| **NIST CSF 6 functions?** | Govern, Identify, Protect, Detect, Respond, Recover. |
