**GOOGLE CYBERSECURITY CERTIFICATE**

**Course 5**

**Assets, Threats,**

**and Vulnerabilities**

Study Notes | Modules 1 – 4

Deep Understanding Edition | With Diagrams, Attack Cards & Real-World Examples

| **Module** | **Title** | **Topics Covered** |
| --- | --- | --- |
| Module 1 | Introduction to Asset Security | CIA Triad · Assets/Threats/Vulnerabilities · Risk Assessment · Data States · NIST CSF |
| Module 2 | Protecting Organizational Assets | Security Controls · Cryptography · Hashing · IAM · AAA Framework · Access Models |
| Module 3 | Vulnerabilities in Systems | Vulnerability Management · OWASP Top 10 · CVE/CVSS · Pen Testing · Threat Actors |
| Module 4 | Threats to Asset Security | Social Engineering · Malware Types · Web Exploits · XSS · SQLi · Threat Modeling · PASTA |

**MODULE 1**

# Introduction to Asset Security

## 1.1 The CIA Triad — Foundation of All Security

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

## 1.2 The Three Elements of Security Planning

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

## 1.3 Risk Management — Equation & Register

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

## 1.4 Asset Classification — Four Levels

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

## 1.5 The Three States of Data

| **State** | **Definition** | **Security Controls Needed** | **Real Example** |
| --- | --- | --- | --- |
| **Data IN USE** | Actively being accessed or processed by a user or application at this moment. | Screen locks, endpoint security (EDR), MFA to access, no shoulder surfing, encrypted RAM. | You are reading an email on your screen. The email content is in use in your browser. |
| **Data IN TRANSIT** | Travelling from one location to another over a network. | TLS/HTTPS encryption, VPN tunnels, certificate validation, secure email (S/MIME). | You click 'Send' on an email. Data travels from your laptop to the mail server over the internet. |
| **Data AT REST** | Stored on a device, drive, or cloud storage and not currently being accessed. | Full-disk encryption (BitLocker/FileVault), database encryption, access controls on storage. | That same email saved on your closed laptop's hard drive, or backed up in cloud storage. |

## 1.6 Cloud Computing & Shared Responsibility Model

> **IMPORTANT: The Biggest Cloud Threat: Misconfiguration**
> The #1 cause of cloud breaches is NOT the cloud provider's infrastructure being hacked.
> It is the CUSTOMER misconfiguring their own resources (S3 buckets left public, IAM roles too permissive).
> The cloud provider secures the infrastructure. YOU must secure what you PUT on it.

| **Service Model** | **Provider Secures** | **Customer Secures** | **Example** |
| --- | --- | --- | --- |
| **IaaS (Infrastructure as a Service)** | Physical hardware, data center, hypervisor, networking hardware. | OS patches, runtime, applications, data, IAM config, network rules. | AWS EC2. You rent a blank VM -- install and secure everything above the hypervisor. |
| **PaaS (Platform as a Service)** | Everything in IaaS + OS, runtime, middleware. | Your application code, data, user access management. | Google App Engine. Deploy code -- provider handles OS and server management. |
| **SaaS (Software as a Service)** | Everything. Full application managed by provider. | Your data, user access settings, compliance obligations. | Gmail, Slack, Zoom. You just use it -- zero infrastructure management. |

## 1.7 Security Plan: Policies, Standards & Procedures

> **SECURITY PLAN HIERARCHY**  
> **SECURITY PLAN HIERARCHY:**

```
  +---------------------------------------------------------------+
  | POLICIES (Strategic -- The 'WHAT' and 'WHY')                  |
  | High-level rules that reduce risk and protect information.    |
  | Set by leadership. Cannot be ignored.                         |
  | Example: 'No personal email for company data' (AUP)          |
  +---------------------------------------------------------------+
                        |
                        v (informed by)
  +---------------------------------------------------------------+
  | STANDARDS (Tactical -- The 'HOW WELL')                        |
  | References and baselines informing HOW policies are met.      |
  | Often based on external frameworks (NIST, ISO 27001).         |
  | Example: 'Passwords must be at least 12 characters' (NIST)   |
  +---------------------------------------------------------------+
                        |
                        v (implemented via)
  +---------------------------------------------------------------+
  | PROCEDURES (Operational -- The 'EXACTLY HOW')                 |
  | Step-by-step instructions for performing specific tasks.      |
  | Used daily by employees and IT staff.                         |
  | Example: '5-step process for helpdesk to reset passwords'    |
  +---------------------------------------------------------------+
```

## 1.8 NIST Cybersecurity Framework (CSF)

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

## 1.9 Module 1 Quick Review

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

**MODULE 2**

# Protecting Organizational Assets

## 2.1 Security Controls — Three Categories

| **Control Category** | **Focus** | **Examples** |
| --- | --- | --- |
| **Technical Controls** | Technology-based safeguards enforced by hardware or software. | Encryption, firewalls, MFA systems, IDS/IPS, antivirus/EDR, access control lists. |
| **Operational Controls** | Day-to-day, people-driven processes and behaviors. | Security awareness training, physical security guards, incident response procedures, background checks. |
| **Managerial Controls** | Oversight, governance, and administrative rules. | Writing acceptable use policies, annual risk assessments, compliance audits, security program management. |

## 2.2 Privacy vs. Security + Data Governance Roles

| **Concept/Role** | **Definition** | **Real Example** |
| --- | --- | --- |
| **Information Privacy** | Giving people CONTROL over their personal data and how it is shared. The right to consent or opt-out. | GDPR lets EU citizens request companies delete all their personal data ('right to be forgotten'). |
| **Information Security** | PROTECTING those privacy choices and keeping data safe from threats. | Encrypting a user's data so even if the database is stolen, their info cannot be read. |
| **Data Owner** | Decides who can access, edit, use, or destroy the information. | The HR Director owns employee salary records. They decide who in the company can view them. |
| **Data Custodian** | Responsible for safe handling, transport, and storage of the information. (Security analysts often fill this role.) | The IT team who manages the database server where salary records are stored. |
| **Data Steward** | Maintains and implements the organization's data governance policies. | The compliance officer who writes and enforces the data handling policy for the whole company. |

## 2.3 Principle of Least Privilege & Separation of Duties

> **KEY CONCEPT: Principle of Least Privilege (PoLP)**
> Grant users ONLY the minimum access required to perform their specific job -- nothing more.
> 
> **Example:** A marketing analyst should NOT have access to the payroll database.
> If their account is compromised, the attacker gets marketing files -- not salaries or SSNs.
> 
> **How it is enforced:** Role-Based Access Control (RBAC), access reviews, account provisioning workflows.

> **NOTE: Separation of Duties**
> No single person should have enough access to misuse a system or commit fraud alone.
> Critical actions require MULTIPLE independent approvals from different people.
> 
> **Example:** The employee who REQUESTS new laptops cannot also be the person who APPROVES the budget.
> **Example:** The developer who writes code cannot also be the one who approves it for production deployment.
> 
> **Prevents:** insider fraud, accidental catastrophic errors, single points of corruption.

## 2.4 Cryptography — Encryption & Hashing

> **KEY CONCEPT: Cryptography Core Concept**
> Cryptography transforms information so unintended readers cannot understand it.
> Two main techniques: ENCRYPTION (two-way, can decrypt) and HASHING (one-way, cannot reverse).

### Encryption — Making Data Unreadable & Reversible

> **SYMMETRIC vs. ASYMMETRIC ENCRYPTION**  
> **SYMMETRIC ENCRYPTION (One Key):**

```
  +------------------------------------------------+
  | Same secret key used to ENCRYPT and DECRYPT.  |
  |                                               |
  | SENDER: plaintext --[key]--> ciphertext       |
  | RECEIVER: ciphertext --[same key]--> plaintext|
  |                                               |
  | PROS: Very FAST. Great for bulk data.         |
  | CONS: How do you securely SHARE the key?      |
  | Algorithms: AES (gold standard), 3DES (legacy)|
  +------------------------------------------------+

  ASYMMETRIC ENCRYPTION (Two Keys / PKI):
  +------------------------------------------------+
  | PUBLIC key: shared openly. Encrypts data.     |
  | PRIVATE key: kept secret. Decrypts data.      |
  |                                               |
  | SENDER: plaintext --[recipient's PUBLIC key]  |
  |         --> ciphertext (only recipient can    |
  |         decrypt with their PRIVATE key)       |
  |                                               |
  | PROS: Highly secure key exchange.             |
  | CONS: Slower processing than symmetric.       |
  | Algorithms: RSA, DSA                          |
  +------------------------------------------------+

  HYBRID (How HTTPS Actually Works):
  1. Asymmetric encryption to SECURELY EXCHANGE a symmetric key.
  2. Symmetric encryption for all subsequent data transfer (fast).
  Best of both worlds: security of asymmetric + speed of symmetric.
```

### Hashing — One-Way Verification

> **HASHING — One-Way Verification + Salting Defence**  
> **HOW HASHING WORKS:**  
> **Input: 'Password123'  --[SHA-256 algorithm]-->  Hash:**  
> **'0a4d55a8d778e5022fab701977c5d840bbc486d0'  (fixed-length output)**  
> **Input: 'Password124'  --[SHA-256 algorithm]-->  Hash:**  
> **'completely different hash output'  (one char change = totally different hash)**  
> **KEY PROPERTIES:**  
> *** ONE-WAY: Cannot reverse a hash to get original input. EVER.**  
> *** DETERMINISTIC: Same input always produces same hash.**  
> *** AVALANCHE: Tiny change in input = completely different hash.**  
> *** FIXED LENGTH: SHA-256 always outputs 256 bits regardless of input size.**  
> **USES:**  
> *** Password storage: Store hash, not plaintext password.**  
> *** File integrity: Hash a file to detect if it was modified.**  
> *** Digital signatures: Prove who signed a document.**  
> **ATTACKS ON HASHING:**  
> *** Hash Collision: Two different inputs produce the same hash (MD5 is vulnerable).**  
> *** Rainbow Tables: Pre-computed dictionaries of password-to-hash mappings.**  
> **DEFENCE -- SALTING:**  
> **Add a RANDOM string (salt) to password BEFORE hashing.**  
> **'Password123' + random salt 'xK9#' = hash('Password123xK9#')**  
> **Even if two users have same password, their salted hashes are completely different.**  
> **Rainbow tables are defeated because attackers cannot pre-compute salted hashes.**

```

```

| **Algorithm** | **Type** | **Status** | **Key Use** |
| --- | --- | --- | --- |
| **AES-256** | Symmetric Encryption | Modern Gold Standard | Bulk data encryption (files, databases, VPNs, disk encryption). |
| **RSA** | Asymmetric Encryption | Modern Standard | Key exchange, digital signatures, TLS handshake, PKI certificates. |
| **SHA-256** | Hashing | Modern Standard | Password hashing, file integrity verification, blockchain, digital signatures. |
| **MD5** | Hashing | BROKEN / Legacy | Avoid for security. Only for non-security checksums. Vulnerable to collisions. |
| **3DES** | Symmetric Encryption | Being phased out | Legacy systems. Being replaced by AES. Slower and weaker than AES. |

## 2.5 The Data Lifecycle — Five Stages

> **DATA LIFECYCLE — 5 Stages with Security Controls**  
> **1. COLLECT          2. STORE           3. USE**

```
  +--------------+    +--------------+   +--------------+
  | New data     |    | Held securely|   | Actively     |
  | acquired or  |--->| in encrypted |->>| processed or |
  | created      |    | databases,   |   | accessed by  |
  |              |    | with access  |   | authorized   |
  | Control:     |    | controls.    |   | users/apps.  |
  | Consent,     |    | Control:     |   | Control:     |
  | data min.    |    | Encryption   |   | MFA, PoLP    |
  +--------------+    +--------------+   +--------------+
                                                |
                                                v
  4. ARCHIVE                          5. DESTROY
  +--------------+                   +--------------+
  | Moved to     |                   | PERMANENTLY  |
  | long-term    |                   | deleted when |
  | storage when |                   | no longer    |
  | not actively |------------------>| needed or    |
  | needed but   |                   | legally req. |
  | legally req. |                   | Crypto-shred |
  | Control:     |                   | or physical  |
  | Access review|                   | destruction  |
  +--------------+                   +--------------+
```

## 2.6 Protected Information Categories & Regulations

| **Data Type** | **Full Name** | **Description** | **Regulation** |
| --- | --- | --- | --- |
| **PII** | Personally Identifiable Information | Data that can identify, contact, or locate an individual. Name, email, phone number, address, date of birth. | GDPR (EU), CCPA (California) |
| **SPII** | Sensitive PII | PII requiring STRICTER handling on a need-to-know basis. Bank accounts, Social Security Numbers, login credentials, biometrics. | GDPR, state breach notification laws |
| **PHI** | Protected Health Information | Regulated health and medical information. Diagnoses, prescriptions, treatment records, insurance info. | HIPAA (USA) |

| **Regulation** | **Region** | **What It Requires** | **Penalty for Breach** |
| --- | --- | --- | --- |
| **GDPR** | European Union (applies globally) | User consent for data collection. Right to be forgotten. 72-hour breach notification. Data minimization. | Up to 4% of annual global revenue or €20M (whichever is higher). |
| **HIPAA** | United States (healthcare) | Protect PHI. Restrict access to health records. Mandatory breach notification. Annual risk assessments. | $100 to $50,000 per violation. Up to $1.9M per category per year. |
| **PCI DSS** | Global (payment industry) | Secure credit/debit card transactions. Encrypt cardholder data. Quarterly network scans. Annual audits. | Fines from $5,000 to $100,000/month. Loss of ability to process cards. |

## 2.7 Access Management — AAA Framework & IAM

> **AAA FRAMEWORK — Authentication, Authorization, Accounting**  
> **THE AAA FRAMEWORK:**  
> **STEP 1: AUTHENTICATION  ('Who are you?')**

```
  +----------------------------------------------------------+
  | Prove your identity BEFORE being granted any access.     |
  | KNOWLEDGE:      Something you KNOW  (password, PIN)      |
  | OWNERSHIP:      Something you HAVE  (OTP app, hardware   |
  |                  key, SMS code)                           |
  | CHARACTERISTIC: Something you ARE   (fingerprint, Face   |
  |                  ID, iris scan)                           |
  | MFA = 2 or more of the above factors combined.           |
  +----------------------------------------------------------+
                        |
                        v
  STEP 2: AUTHORIZATION ('What are you allowed to do?')
  +----------------------------------------------------------+
  | After authentication, determine WHAT resources the user  |
  | can access and what ACTIONS they can perform.            |
  | Guided by: Principle of Least Privilege + access models. |
  | Models: MAC, DAC, RBAC (see table below).                |
  +----------------------------------------------------------+
                        |
                        v
  STEP 3: ACCOUNTING ('What did you do?')
  +----------------------------------------------------------+
  | Monitor and LOG all access, actions, and sessions.       |
  | Detects: Session Hijacking (attacker steals session      |
  |          cookie to impersonate authenticated user).      |
  | Tools: SIEM, audit logs, user behavior analytics (UBA). |
  +----------------------------------------------------------+
```

| **Access Model** | **How It Works** | **Best For** | **Example** |
| --- | --- | --- | --- |
| **MAC (Mandatory Access Control)** | Central ADMIN manually grants access based on strict clearance levels. Users cannot share access themselves. | Military, government, classified environments. Maximum control. | Top Secret clearance = access to TS files. Secret clearance = access to S files only. Admin controls everything. |
| **DAC (Discretionary Access Control)** | The DATA OWNER decides who gets access to their specific resources. | Personal collaboration, small teams, flexible environments. | You create a Google Doc and choose who to share it with. You are the owner and control access. |
| **RBAC (Role-Based Access Control)** | Access determined entirely by the user's JOB ROLE or department. | Most enterprises. Scalable, efficient, consistent. | All HR employees automatically get payroll system access when assigned the 'HR' role. Marketing gets marketing tools. |

> **NOTE: Modern Authentication Technologies**
> SSO (Single Sign-On): One login unlocks all authorized applications. Uses SAML or LDAP protocols.
> **Benefit:** Eliminates password fatigue (one strong password vs. 20 weak ones).
> **Risk:** Single point of failure -- if SSO is compromised, all apps are compromised.
> **Solution:** Combine SSO with MFA for best security + user experience.
> 
> **OAuth:** Open-standard authorization protocol. Lets apps share access WITHOUT sharing passwords.
> **Example:** 'Log in with Google' button. Google sends an API token -- your password never leaves Google.
> OAuth grants designated access (e.g., 'this app can read your Google Drive files').

## 2.8 Module 2 Quick Review

| **Question** | **Answer** |
| --- | --- |
| **3 categories of security controls?** | Technical (encryption, firewalls, MFA), Operational (training, guards, procedures), Managerial (policies, risk assessments, audits). |
| **Privacy vs. Security?** | Privacy = user's RIGHT to control their data. Security = PROTECTING that data from threats. Different goals, work together. |
| **Symmetric vs. Asymmetric encryption?** | Symmetric: one key for both encrypt/decrypt, fast, key sharing is risky. Asymmetric: public key encrypts, private key decrypts, slower but secure exchange. |
| **Why is hashing one-way?** | Hash algorithms are mathematical functions with no inverse. You can verify a hash matches, but cannot mathematically reverse it to get the original input. |
| **What is salting?** | Adding a random string to a password BEFORE hashing. Defeats rainbow table attacks because every user's hash is unique even if passwords match. |
| **PoLP definition?** | Principle of Least Privilege: grant only the minimum access required for a user's specific job. Nothing more. |
| **MAC vs. DAC vs. RBAC?** | MAC: admin controls everything (military). DAC: data owner controls access (Google Docs sharing). RBAC: job role determines access (enterprise standard). |
| **What is session hijacking?** | Attacker steals a legitimate user's authenticated session cookie and uses it to impersonate that user without needing their password. |

**MODULE 3**

# Vulnerabilities in Systems

## 3.1 Vulnerability, Exploit, Exposure — Key Distinctions

| **Term** | **Definition** | **Analogy** | **Example** |
| --- | --- | --- | --- |
| **Vulnerability** | A weakness or flaw in a system, process, or person that can be exploited. | A broken window lock on your house. | An unpatched SQL server running an outdated version with a known buffer overflow flaw. |
| **Exploit** | The specific method or tool used to take advantage of a vulnerability. | A crowbar used to pry open the broken lock. | A Python script that sends a crafted SQL query to trigger the buffer overflow and gain shell access. |
| **Exposure** | A mistake that leaves data accessible to threats. Not necessarily a code flaw. | Leaving a confidential printed document on a park bench. | A developer accidentally commits AWS database credentials to a public GitHub repository. |
| **Zero-Day** | A vulnerability that is completely unknown to the vendor and public. No patch exists yet. | A hidden secret entrance to the house that even the architect forgot about. | A threat actor finds a browser flaw, exploits it to steal data BEFORE the browser company even knows the bug exists. |

## 3.2 Vulnerability Management — 4-Step Cycle

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

## 3.3 CVE & CVSS — Tracking and Scoring Vulnerabilities

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

## 3.4 OWASP Top 10 — Web Application Vulnerabilities

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

## 3.5 Defense in Depth — The Castle Approach

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
  +--------------------------------------------------+
  | Protects the actual information at its core.     |
  | Database encryption, data classification, DLP    |
  | Even if attacker reaches here: encrypted = useless|
  +--------------------------------------------------+
```

## 3.6 Threat Actors & Hacker Types

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

## 3.7 Penetration Testing Strategies

| **Strategy** | **Team** | **Knowledge Level** | **What It Tests** |
| --- | --- | --- | --- |
| **Red Team (Offensive)** | Attackers | Varies by test type | Tests the organization's defenses by actively attempting to breach them using real attack techniques. |
| **Blue Team (Defensive)** | Defenders | Full internal knowledge | Tests detection, response, and recovery capabilities during or after a simulated attack. |
| **Purple Team** | Both working together | Full collaboration | Red and Blue teams share findings in real-time to immediately improve defensive controls. |
| **White-Box Testing** | Pen tester (any) | FULL: code, network maps, architecture | Deep internal audit. Tests ALL potential vulnerabilities. Most comprehensive but least realistic. |
| **Black-Box Testing** | Pen tester (any) | ZERO: acts as external attacker | Most realistic simulation of an outside attacker. Tests what attackers can find from scratch. |
| **Gray-Box Testing** | Pen tester (any) | LIMITED: standard employee access | Simulates insider threat or attacker with some foothold. Balanced realism and depth. |

## 3.8 Brute Force Attacks & Defences

> **BRUTE FORCE ATTACKS — Types and Defences**
> **BRUTE FORCE ATTACK TYPES:**
> 
> **DICTIONARY ATTACK:**
> Try: 'password', 'admin', '123456', 'iloveyou', 'qwerty'...
> Uses a pre-built wordlist of commonly used passwords.
> Very fast against weak passwords. Fails against random complex passwords.
> 
> **CREDENTIAL STUFFING:**
> Take database of 100M leaked username/password pairs from one breach.
> Automatically try ALL of them on a DIFFERENT website.
> Works because 65% of people reuse passwords across sites.
> Tools: Sentry MBA, OpenBullet, SentryMBA
> 
> **SIMPLE BRUTE FORCE:**
> Try every possible combination: aaaa, aaab, aaac... zzzz, aaaa1...
> Theoretically cracks any password given enough time.
> 8-char password: modern GPU = hours/days. 16-char random = centuries.
> 
> **TOOLS USED:** Aircrack-ng (Wi-Fi), Hashcat (hash cracking), John the Ripper
> 
> **DEFENCES:**
> * **MFA:** Password cracked? Attacker still needs physical device.
> * **Account lockout**: Lock after 5 failed attempts for 15 minutes.
> * **CAPTCHA:** Proves human, stops automated bots instantly.
> * **Salting:** Unique salt defeats rainbow tables and pre-computation.
> * **Rate limiting:** Slow down login attempts (max 3/minute).
> * **SIEM alert:** Alert on >5 failed logins from same IP in 60 seconds.

## 3.9 OSINT — Open-Source Intelligence

| **Tool** | **What It Does** | **Security Analyst Use Case** |
| --- | --- | --- |
| **VirusTotal** | Upload files or URLs to check against 70+ antivirus engines. | Analyst receives suspicious email attachment. Upload to VirusTotal before opening. If 30/70 engines flag it as malware, do not open. |
| **Have I Been Pwned** | Check if an email address appears in known data breaches. | Employee reports strange account activity. Check their email -- found in 3 breach databases. Immediate password reset required. |
| **MITRE ATT&CK** | Database of real-world adversary tactics, techniques, and procedures (TTPs). | After detecting unusual PowerShell activity, look up ATT&CK T1059.001 to understand exactly how attackers use PowerShell and what to look for next. |
| **Shodan** | Search engine for internet-connected devices and exposed services. | Scan your own organization's public IP ranges to see what attackers see. Find exposed admin panels, open ports, and default services. |
| **Google Dorks** | Advanced Google search operators to find exposed information. | Search site:yourcompany.com filetype:pdf confidential to find accidentally published sensitive documents. |

## 3.10 Module 3 Quick Review

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

**MODULE 4**

# Threats to Asset Security

## 4.1 Social Engineering — Manipulating Humans

> **KEY CONCEPT: Why Social Engineering Works**
> Social engineering exploits human psychology -- not technical flaws. No firewall protects against human trust.
> People are hardwired to be helpful, to trust authority, and to act quickly under urgency.
> **Attackers exploit:** urgency, fear, curiosity, trust, helpfulness, and desire for reward.
> **Defence:** Security awareness training is the PRIMARY countermeasure.

> **SOCIAL ENGINEERING TAXONOMY**
> **SOCIAL ENGINEERING ATTACK SPECTRUM:**
> 
> **PHYSICAL / IN-PERSON:**
> * Tailgating (Piggybacking):
> Unauthorized person physically follows authorized employee through secure door.
> Classic technique: Carry heavy boxes. Employee politely holds the door open.
> 
> * Baiting (USB Drop):
> Leave USB drive labeled 'Q4 Employee Bonuses' in company parking lot.
> Curious employee plugs it in. Malware auto-executes. Network compromised.
> 
> **DIGITAL DECEPTION (PHISHING FAMILY):**
> Phishing   = Deceptive EMAIL to masses. 'Your Netflix payment failed.'
> Smishing   = Phishing via TEXT MESSAGE. 'FedEx: Package delayed. Click here.'
> Vishing    = Phishing via VOICE CALL. 'IRS: You owe taxes. Call back immediately.'
> 
> **TARGETED ATTACKS:**
> Spear Phishing = Highly customized phishing targeting ONE specific person.
> Attacker researches target on LinkedIn, personalizes the attack.
> Whaling        = Spear phishing targeting EXECUTIVES (CEO, CFO).
> 'Hi CFO, this is the CEO. Wire $50K to new vendor by 5PM today.'
> Angler Phishing= Impersonate customer support on SOCIAL MEDIA.
> Customer tweets complaint. Fake support account DMs them for PIN.

| **Attack** | **Vector** | **Urgency Technique** | **Detection / Defence** |
| --- | --- | --- | --- |
| **Phishing** | Email | Urgent account threat, limited time offer, security alert. | Check sender domain carefully. Hover over links before clicking. Use email filtering with DMARC/DKIM/SPF. |
| **Spear Phishing** | Email | Personalized with victim's name, role, colleague names. | Be skeptical of any email requesting unusual action even from 'known' senders. Verify via phone. |
| **Whaling** | Email | Executive urgency, confidentiality ('don't tell anyone'), financial pressure. | Financial wire transfer policy requiring dual approval. Callback verification to known number. |
| **Vishing** | Phone | IRS threats, bank fraud alerts, tech support urgent problems. | Never provide info to inbound callers. Hang up and call official number yourself. |
| **Smishing** | SMS | Package delays, prize winners, urgent account issues. | Never click links in unsolicited texts. Go directly to official website. |
| **Tailgating** | Physical | Social pressure of appearing rude to not hold the door. | Badge-in policy: every person swipes their own badge. Challenge anyone without visible badge. |
| **USB Baiting** | Physical | Curiosity ('Bonuses', 'Confidential', 'Private Photos'). | Never plug in unknown USB devices. Corporate policy to report found drives to IT. |

## 4.2 Malware — Malicious Software Types

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

## 4.3 Web-Based Exploits — XSS & SQL Injection

> **KEY CONCEPT: Why Web Exploits Work**
> Web exploits exist because applications fail to properly VALIDATE and SANITIZE user input.
> The application blindly trusts what the user types into a text field and processes it as code or commands.
> Golden Rule: NEVER trust user input. Always validate, sanitize, and parameterize.

### Cross-Site Scripting (XSS)

> **CROSS-SITE SCRIPTING (XSS) — Three Types**  
> **XSS = Injecting malicious JavaScript into a webpage that other users visit.**  
> **TYPE 1: REFLECTED XSS**  
> **Attacker crafts malicious URL --> victim clicks it --> browser REFLECTS**  
> **the malicious script from the server back to the victim's browser.**  
> **www.bank.com/search?q=<script>steal(document.cookie)</script>**  
> **Victim's browser runs the script. Session cookie stolen. Account hijacked.**  
> **TYPE 2: STORED XSS (more dangerous)**  
> **Attacker posts a comment on a blog with hidden malicious script.**  
> **Script is STORED on the server's database.**  
> **EVERY visitor to that blog post automatically runs the malicious script.**  
> **One injection = many victims.**  
> **TYPE 3: DOM-BASED XSS**  
> **Attack happens entirely INSIDE the victim's browser.**  
> **No data sent to server. Modifies the DOM environment locally.**  
> **DEFENCE AGAINST ALL XSS:**  
> *** Input Validation: Reject inputs containing <script> tags or HTML.**  
> *** Output Encoding: Encode all user data before displaying it on the page.**  
> *** Content Security Policy (CSP): Browser header that blocks inline scripts.**  
> *** HttpOnly cookies: Prevents JavaScript from reading session cookies.**

```

```

### SQL Injection (SQLi)

> **SQL INJECTION — Mechanics and Defence**
> SQL = Language websites use to query their databases.
> SQLi = Inserting SQL commands into user input to manipulate the database.
> 
> **NORMAL LOGIN QUERY:**
> SELECT * FROM users WHERE username='alice' AND password='secret123'
> Result: Returns alice's account. Login succeeds.
> 
> **SQL INJECTION ATTACK:**
> Username typed: admin'--
> Built query: SELECT * FROM users WHERE username='admin'--' AND password='anything'
> The -- comments out everything after it. Password check is BYPASSED.
> Result: Logged in as admin with NO valid password.
> 
> **ANOTHER ATTACK (OR 1=1):**
> Username: ' OR 1=1--
> Query: SELECT * FROM users WHERE username='' OR 1=1--'
> 1=1 is always TRUE. Database returns ALL user records.
> First result is usually the admin account. Attacker gets admin access.
> 
> **BLIND SQLi:**
> Website shows no data but attacker asks True/False questions:
> 'Does username start with A?' -- if page loads normally = YES
> 'Does it start with B?' -- if page shows error = NO
> Slowly maps entire database through yes/no responses.
> 
> **THE DEFINITIVE DEFENCE -- PREPARED STATEMENTS:**
> Database query structure is FIXED before user input is added.
> SELECT * FROM users WHERE username = ? AND password = ?
> User input fills the ? placeholders as pure DATA, never as code.
> Even typing SQL commands just searches for username='admin OR 1=1'
> (no such user). Injection is IMPOSSIBLE with prepared statements.

## 4.4 Threat Modeling — PASTA Framework

> **KEY CONCEPT: What is Threat Modeling?**
> A proactive engineering process to identify assets, find vulnerabilities, and determine how to protect them BEFORE an attack happens.
> Attack Surface = all points where an attacker could enter or extract data (website, employee laptops, office doors).
> Attack Vector = the specific pathway an attacker uses (phishing email, open port, stolen badge).

> **STRIDE — Microsoft's Threat Category Framework**
> **STRIDE (Microsoft's Threat Categories):**
> **S** = Spoofing       (impersonating another user or system)
> **T** = Tampering      (modifying data or code maliciously)
> **R** = Repudiation    (denying an action was taken -- no audit trail)
> **I** = Info Disclosure(exposing data to unauthorized parties)
> **D** = Denial of Svc  (making system unavailable)
> **E** = Elevation of   (gaining higher privileges than authorized)
> Privilege

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

## 4.5 Complete Course 5 Glossary

| **Term** | **Definition** |
| --- | --- |
| **AAA Framework** | Authentication (who are you), Authorization (what can you do), Accounting (what did you do). The complete access management framework. |
| **Advanced Persistent Threat (APT)** | A highly skilled threat actor (usually state-sponsored) maintaining unauthorized access for an extended period. Often undetected for months. |
| **Algorithm** | A set of mathematical rules used to solve a problem or perform a transformation (e.g., encryption, hashing). |
| **Angler Phishing** | Attackers impersonating official customer support accounts on social media to steal credentials from complaining customers. |
| **Asymmetric Encryption** | Uses a PUBLIC key to encrypt and a PRIVATE key to decrypt. Secure key exchange. Slower than symmetric. Algorithms: RSA, DSA. |
| **Attack Surface** | All potential entry points and vulnerabilities that a threat actor could exploit to gain access to a system or data. |
| **Attack Tree** | A visual diagram mapping all possible attack paths from an initial goal to the final compromise of an asset. |
| **Attack Vector** | The specific pathway an attacker takes to penetrate a security defense and reach a target asset. |
| **Availability** | CIA Triad pillar: systems and data are accessible to authorized users whenever needed. |
| **Baiting** | Social engineering using a physical or digital lure (e.g., infected USB drive labeled 'Bonuses') to attract a victim. |
| **Botnet** | A network of infected computers (bots) controlled by a single attacker (bot-herder). Used for DDoS, spam, and credential stuffing. |
| **Brute Force Attack** | Trial-and-error process to discover passwords or encryption keys by systematically trying all possibilities. |
| **CIA Triad** | Confidentiality, Integrity, Availability. The three foundational pillars of all cybersecurity decisions. |
| **Compliance** | Adhering to internal standards and external regulations (GDPR, HIPAA, PCI DSS). |
| **Confidentiality** | CIA Triad pillar: only authorized users can access sensitive data. |
| **Credential Stuffing** | Using leaked username/password pairs from one breach to attack other websites, exploiting password reuse. |
| **Cryptography** | Transforming information into a form that unintended readers cannot understand. Includes encryption and hashing. |
| **CVE** | Common Vulnerabilities and Exposures. Public dictionary of known vulnerabilities maintained by MITRE. Each gets a unique ID. |
| **CVSS** | Common Vulnerability Scoring System. Scores vulnerability severity from 0.0 (none) to 10.0 (critical). |
| **DAC** | Discretionary Access Control. The data owner decides who can access their specific resources. |
| **Data at Rest** | Data stored on a device or drive, not currently being accessed. Requires encryption at rest. |
| **Data Custodian** | Anyone responsible for safe handling, transport, and storage of information. |
| **Data in Transit** | Data traveling over a network. Requires TLS/HTTPS encryption. |
| **Data in Use** | Data currently being accessed or processed. Requires endpoint security and screen privacy. |
| **Data Owner** | The person who decides who can access, edit, use, or destroy their information. |
| **Defense in Depth** | Layered security approach: Perimeter -> Network -> Endpoint -> Application -> Data. Each layer protects if outer layers fail. |
| **Dictionary Attack** | Brute force using a pre-built wordlist of common passwords, dictionary words, and previously breached credentials. |
| **Digital Certificate** | A file issued by a Certificate Authority (CA) that verifies the identity of a public key holder. Foundation of HTTPS trust. |
| **DOM-based XSS** | XSS attack that occurs entirely within the victim's browser by modifying the DOM, without sending data to the server. |
| **Encryption** | Converting plaintext into unreadable ciphertext using an algorithm and key. Two-way -- can be decrypted. |
| **Exploit** | The method or tool used to take advantage of a vulnerability to cause harm. |
| **Exposure** | A mistake that leaves data or systems accessible to threats (not necessarily a technical flaw). |
| **Fileless Malware** | Malware that runs entirely in RAM using legitimate system tools. No files on disk. Difficult to detect with traditional antivirus. |
| **Hashing** | One-way algorithm producing a fixed-length digest from any input. Cannot be reversed. Used for integrity verification. |
| **HIPAA** | Health Insurance Portability and Accountability Act. US law protecting patient health information (PHI). |
| **IAM** | Identity and Access Management. Framework for managing digital identities and controlling resource access. |
| **IaaS** | Infrastructure as a Service. Rent virtual compute, storage, and networking. You manage OS upward. |
| **Information Security** | Protecting data in all states from unauthorized access, modification, or destruction. |
| **Injection Attack** | Inserting malicious code into a user input field that the application processes as commands. |
| **Insider Threat** | Employee, contractor, or partner who causes a breach intentionally (disgruntled) or unintentionally (phishing victim). |
| **Integrity** | CIA Triad pillar: data remains accurate and unmodified unless changed by authorized processes. |
| **MAC** | Mandatory Access Control. Central admin grants access based on strict clearance levels. Most restrictive model. |
| **Malware** | Malicious software designed to harm, exploit, or infiltrate devices and networks. |
| **MFA** | Multi-Factor Authentication. Requires 2+ independent verification factors (know + have + are). |
| **MITRE ATT&CK** | Knowledge base of real adversary tactics, techniques, and procedures (TTPs) used by security teams for threat intelligence. |
| **NIST CSF** | National Institute of Standards and Technology Cybersecurity Framework. Voluntary 6-function framework (Govern, Identify, Protect, Detect, Respond, Recover). |
| **OAuth** | Open-standard authorization protocol allowing apps to share designated access via API tokens without sharing passwords. |
| **OWASP Top 10** | Annual list of the 10 most critical web application security risks published by OWASP. |
| **PASTA** | Process for Attack Simulation and Threat Analysis. 7-stage risk-centric threat modeling framework. |
| **PaaS** | Platform as a Service. Provider manages OS and runtime. You manage code and data only. |
| **PCI DSS** | Payment Card Industry Data Security Standard. Requirements for organizations processing credit card transactions. |
| **Phishing** | Deceptive email communications tricking recipients into revealing credentials or installing malware. |
| **PHI** | Protected Health Information. Health and medical data regulated by HIPAA. |
| **PII** | Personally Identifiable Information. Data that can identify an individual (name, email, SSN, phone). |
| **PKI** | Public Key Infrastructure. Framework using asymmetric encryption + digital certificates to verify identity online. |
| **Policies** | High-level rules defining what is protected and why. Foundation of a security plan. |
| **PoLP** | Principle of Least Privilege. Grant only the minimum access required. Nothing more. |
| **Prepared Statements** | SQL parameterization technique that completely prevents SQL injection by separating code structure from user data. |
| **Procedures** | Step-by-step operational instructions for performing specific security tasks. |
| **Rainbow Table** | Pre-computed database of plaintext-to-hash mappings used to crack hashed passwords. Defeated by salting. |
| **Ransomware** | Malware encrypting victim files and demanding payment for the decryption key. |
| **RBAC** | Role-Based Access Control. Access determined by user's job role or department. Enterprise standard. |
| **Reflected XSS** | XSS where malicious script is immediately bounced back from the server to the victim's browser via a crafted URL. |
| **Regulations** | Rules set by governments or authorities that organizations must comply with (GDPR, HIPAA, PCI DSS). |
| **Risk** | Anything impacting confidentiality, integrity, or availability. Risk = Likelihood x Severity. |
| **Rootkit** | Malware granting deep admin-level access while hiding its own existence from the OS and security tools. |
| **SaaS** | Software as a Service. Provider manages everything. You manage only your data and user access. |
| **Salting** | Adding a random string to a password BEFORE hashing. Defeats rainbow table attacks and prevents duplicate hashes. |
| **Separation of Duties** | No single person has enough access to commit fraud or cause major damage alone. Critical actions require multiple approvals. |
| **Session Hijacking** | Stealing a user's authenticated session cookie to impersonate them without needing their password. |
| **SHA-256** | Secure Hash Algorithm 256-bit. Modern gold standard for hashing. Used in passwords, file integrity, and digital signatures. |
| **Shared Responsibility** | Cloud security is split: provider secures infrastructure, customer secures their data/apps/IAM configuration. |
| **Smishing** | Phishing conducted via SMS text messages. |
| **Social Engineering** | Psychological manipulation of humans to perform actions or reveal confidential information. |
| **Spear Phishing** | Highly customized phishing targeting a specific individual using researched personal details. |
| **SPII** | Sensitive PII. Requires stricter handling. Bank accounts, SSNs, login credentials, biometric data. |
| **SQL Injection** | Inserting SQL commands into user input fields to manipulate a database. Fixed by prepared statements. |
| **SSRF** | Server-Side Request Forgery. Tricking a server into making unauthorized requests to internal resources. |
| **SSO** | Single Sign-On. One login grants access to all authorized applications via SAML/LDAP protocols. |
| **Standards** | References and baselines informing how policies should be implemented (e.g., password must be 12+ chars). |
| **Stored XSS** | XSS where malicious script is permanently saved in the server database and runs for every visitor. |
| **STRIDE** | Microsoft threat modeling framework: Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation of Privilege. |
| **Symmetric Encryption** | Uses ONE secret key for both encryption and decryption. Fast. Key sharing is the challenge. AES is the standard. |
| **Tailgating (Piggybacking)** | Unauthorized person physically following an authorized employee through a secured door. |
| **Threat** | Any circumstance or event that can negatively impact assets. Intentional or unintentional. |
| **Threat Actor** | Any person or group who presents a security risk (hackers, insiders, state actors). |
| **Threat Modeling** | Proactive process to identify assets, find vulnerabilities, and plan protections before attacks occur. |
| **Trojan Horse** | Malware disguised as legitimate software. User installs it willingly, believing it is helpful. |
| **Virus** | Malware attaching to legitimate files. Requires user action to activate and spread. |
| **Vishing** | Phishing conducted via voice calls or voicemail. |
| **Vulnerability** | A weakness in a system, process, or person that can be exploited by a threat. |
| **Vulnerability Assessment** | Internal review process to find security weaknesses. Identifies but does not exploit (unlike pen testing). |
| **Vulnerability Management** | Continuous cycle: Identify -> Consider Exploits -> Prepare Defences -> Evaluate Defences. |
| **Whaling** | Spear phishing specifically targeting senior executives (CEO, CFO). |
| **Worm** | Self-replicating malware that spreads automatically across networks without user interaction. |
| **XSS** | Cross-Site Scripting. Injecting malicious JavaScript into a website that other users' browsers execute. |
| **Zero-Day** | A vulnerability unknown to the vendor and public. No patch exists. Exploited before anyone can defend against it. |

## 4.6 Complete Flashcard Review — All Modules

| **Question** | **Answer** |
| --- | --- |
| **What is the CIA Triad?** | Confidentiality (authorized access only), Integrity (accurate & unmodified), Availability (always accessible). Every security decision is measured against these three pillars. |
| **Risk formula?** | Risk Score = Likelihood (1-3) x Severity (1-3). Score 9 = critical emergency. Score 1-2 = low, schedule for later. |
| **4 asset classification levels?** | Restricted (highest, need-to-know) -> Confidential -> Internal-only -> Public (lowest, no harm if released). |
| **3 states of data?** | In Use (being accessed now -- protect with MFA, screen lock), In Transit (traveling -- protect with TLS/HTTPS), At Rest (stored -- protect with disk encryption). |
| **Symmetric vs. Asymmetric?** | Symmetric: one key, fast, risky key sharing (AES). Asymmetric: public encrypts, private decrypts, slow but secure exchange (RSA). HTTPS uses both. |
| **Why use hashing for passwords?** | One-way -- cannot be reversed. Same input always gives same output. Store hash not plaintext. If database stolen, attacker cannot read actual passwords. |
| **What does salting do?** | Adds random string to password before hashing. Even if two users have identical passwords, their stored hashes are completely different. Defeats rainbow table attacks. |
| **MAC vs. DAC vs. RBAC?** | MAC: admin controls all access (military). DAC: data owner controls access (Google Docs). RBAC: job role determines access (enterprise standard). |
| **PoLP definition?** | Principle of Least Privilege: grant ONLY the minimum access needed for a user's specific job. If account is compromised, attacker gets only what that account could access. |
| **What is session hijacking?** | Attacker steals a legitimate user's authenticated session cookie and uses it to impersonate them without needing their password. Fix: HttpOnly cookies, short session timeouts. |
| **Vulnerability vs. Exploit vs. Exposure?** | Vulnerability = weakness (broken lock). Exploit = tool/method to attack it (crowbar). Exposure = mistake leaving data accessible (leaving key under doormat). |
| **What is a Zero-Day?** | Vulnerability completely unknown to vendor. No patch exists. Vendor has had 'zero days' to fix it. Most dangerous class of vulnerability. |
| **OWASP #1 Broken Access Control?** | Users accessing resources they should not. Fix: server-side authorization check on EVERY request regardless of how the user got there. |
| **OWASP #3 Injection fix?** | Prepared statements / parameterized queries. Database query structure is fixed before user input is added. Input treated as pure data, never as executable code. |
| **What is Defense in Depth?** | Layering 5 security controls: Perimeter -> Network -> Endpoint -> Application -> Data. Attacker must breach ALL layers. Each layer contains them further. |
| **Phishing vs. Spear Phishing vs. Whaling?** | Phishing: mass generic email. Spear Phishing: customized to specific person (researched via LinkedIn). Whaling: spear phishing targeting executives specifically. |
| **How does Ransomware work?** | Infects via phishing/exploit -> encrypts all files -> demands Bitcoin payment for decryption key. Defence: offline air-gapped backups tested regularly. |
| **Fileless malware vs. regular malware?** | Fileless: runs entirely in RAM using legitimate system tools (PowerShell, WMI). No files = antivirus cannot detect it. Requires EDR with behavioral analysis. |
| **Reflected XSS vs. Stored XSS?** | Reflected: script bounces off server via crafted URL (one victim per click). Stored: script saved in database and runs for EVERY visitor (massively more dangerous). |
| **How does SQL Injection work?** | Attacker types SQL commands into input fields. Database executes them as commands instead of data. Fix: prepared statements make injection impossible. |
| **PASTA 7 stages?** | 1-Define Objectives, 2-Define Technical Scope, 3-Decompose Application, 4-Threat Analysis, 5-Vulnerability Analysis, 6-Attack Modeling (Attack Tree), 7-Risk & Impact Analysis. |
| **What is STRIDE?** | Microsoft threat model categories: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege. |
| **Social engineering defence?** | Security awareness training is #1. Verify requests through independent channel. Badge-in policies. Never plug in unknown USB. Challenge unrecognized people in secure areas. |
| **What is credential stuffing?** | Using leaked username/password pairs from one breach to attack other sites. Works because most people reuse passwords. Fix: MFA + unique passwords via password manager. |
| **CVSS score meanings?** | 0.0=None, 0.1-3.9=Low (schedule patch), 4.0-6.9=Medium (patch in 30 days), 7.0-8.9=High (patch in 7 days), 9.0-10.0=Critical (emergency -- patch NOW). |

> **Course 5 Complete!**  
> **Assets, Threats, and Vulnerabilities**  
> **Topics Mastered: CIA Triad * Asset Classification * Risk Management * Data States**  
> **Cryptography * Hashing * IAM * OWASP Top 10 * CVE/CVSS * Vulnerability Management**  
> **Social Engineering * Malware Types * XSS * SQL Injection * PASTA Threat Modeling**  
> **Next: Course 6 -- Sound the Alarm: Detection and Response -->**
