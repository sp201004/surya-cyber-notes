## Contents

- [Security Controls — Three Categories](#security-controls--three-categories)
- [Privacy vs. Security + Data Governance Roles](#privacy-vs-security--data-governance-roles)
- [Principle of Least Privilege & Separation of Duties](#principle-of-least-privilege--separation-of-duties)
- [Cryptography — Encryption & Hashing](#cryptography--encryption--hashing)
- [The Data Lifecycle — Five Stages](#the-data-lifecycle--five-stages)
- [Protected Information Categories & Regulations](#protected-information-categories--regulations)
- [Access Management — AAA Framework & IAM](#access-management--aaa-framework--iam)

## Security Controls — Three Categories

| **Control Category** | **Focus** | **Examples** |
| --- | --- | --- |
| **Technical Controls** | Technology-based safeguards enforced by hardware or software. | Encryption, firewalls, MFA systems, IDS/IPS, antivirus/EDR, access control lists. |
| **Operational Controls** | Day-to-day, people-driven processes and behaviors. | Security awareness training, physical security guards, incident response procedures, background checks. |
| **Managerial Controls** | Oversight, governance, and administrative rules. | Writing acceptable use policies, annual risk assessments, compliance audits, security program management. |

## Privacy vs. Security + Data Governance Roles

| **Concept/Role** | **Definition** | **Real Example** |
| --- | --- | --- |
| **Information Privacy** | Giving people CONTROL over their personal data and how it is shared. The right to consent or opt-out. | GDPR lets EU citizens request companies delete all their personal data ('right to be forgotten'). |
| **Information Security** | PROTECTING those privacy choices and keeping data safe from threats. | Encrypting a user's data so even if the database is stolen, their info cannot be read. |
| **Data Owner** | Decides who can access, edit, use, or destroy the information. | The HR Director owns employee salary records. They decide who in the company can view them. |
| **Data Custodian** | Responsible for safe handling, transport, and storage of the information. (Security analysts often fill this role.) | The IT team who manages the database server where salary records are stored. |
| **Data Steward** | Maintains and implements the organization's data governance policies. | The compliance officer who writes and enforces the data handling policy for the whole company. |

## Principle of Least Privilege & Separation of Duties

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

## Cryptography — Encryption & Hashing

> **KEY CONCEPT: Cryptography Core Concept**
> Cryptography transforms information so unintended readers cannot understand it.
> Two main techniques: ENCRYPTION (two-way, can decrypt) and HASHING (one-way, cannot reverse).

### Encryption — Making Data Unreadable & Reversible

> **SYMMETRIC vs. ASYMMETRIC ENCRYPTION**
> **SYMMETRIC ENCRYPTION (One Key):**

```
  +------------------------------------------------+
  | Same secret key used to ENCRYPT and DECRYPT.   |
  |                                                |
  | SENDER: plaintext --[key]--> ciphertext        |
  | RECEIVER: ciphertext --[same key]--> plaintext |
  |                                                |
  | PROS: Very FAST. Great for bulk data.          |
  | CONS: How do you securely SHARE the key?       |
  | Algorithms: AES (gold standard), 3DES (legacy) |
  +------------------------------------------------+

  ASYMMETRIC ENCRYPTION (Two Keys / PKI):
  +------------------------------------------------+
  | PUBLIC key: shared openly. Encrypts data.      |
  | PRIVATE key: kept secret. Decrypts data.       |
  |                                                |
  | SENDER: plaintext --[recipient's PUBLIC key]   |
  |         --> ciphertext (only recipient can     | 
  |         decrypt with their PRIVATE key)        |
  |                                                |
  | PROS: Highly secure key exchange.              |
  | CONS: Slower processing than symmetric.        | 
  | Algorithms: RSA, DSA                           |
  +------------------------------------------------+

  HYBRID (How HTTPS Actually Works):
  1. Asymmetric encryption to SECURELY EXCHANGE a symmetric key.
  2. Symmetric encryption for all subsequent data transfer (fast).
  Best of both worlds: security of asymmetric + speed of symmetric.
```

### Hashing — One-Way Verification

```
HASHING — One-Way Verification + Salting Defence
HOW HASHING WORKS:
Input: 'Password123'  --[SHA-256 algorithm]-->  Hash:
'0a4d55a8d778e5022fab701977c5d840bbc486d0'  (fixed-length output)
Input: 'Password124'  --[SHA-256 algorithm]-->  Hash:
'completely different hash output'  (one char change = totally different hash)

KEY PROPERTIES:
* ONE-WAY: Cannot reverse a hash to get original input. EVER.
* DETERMINISTIC: Same input always produces same hash.
* AVALANCHE: Tiny change in input = completely different hash.
* FIXED LENGTH: SHA-256 always outputs 256 bits regardless of input size.

USES:
* Password storage: Store hash, not plaintext password.
* File integrity: Hash a file to detect if it was modified.
* Digital signatures: Prove who signed a document.

ATTACKS ON HASHING:
* Hash Collision: Two different inputs produce the same hash (MD5 is vulnerable).
* Rainbow Tables: Pre-computed dictionaries of password-to-hash mappings.

DEFENCE -- SALTING:
Add a RANDOM string (salt) to password BEFORE hashing.
'Password123' + random salt 'xK9#' = hash('Password123xK9#')
Even if two users have same password, their salted hashes are completely different.
Rainbow tables are defeated because attackers cannot pre-compute salted hashes.
```

| **Algorithm** | **Type** | **Status** | **Key Use** |
| --- | --- | --- | --- |
| **AES-256** | Symmetric Encryption | Modern Gold Standard | Bulk data encryption (files, databases, VPNs, disk encryption). |
| **RSA** | Asymmetric Encryption | Modern Standard | Key exchange, digital signatures, TLS handshake, PKI certificates. |
| **SHA-256** | Hashing | Modern Standard | Password hashing, file integrity verification, blockchain, digital signatures. |
| **MD5** | Hashing | BROKEN / Legacy | Avoid for security. Only for non-security checksums. Vulnerable to collisions. |
| **3DES** | Symmetric Encryption | Being phased out | Legacy systems. Being replaced by AES. Slower and weaker than AES. |

## The Data Lifecycle — Five Stages

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

## Protected Information Categories & Regulations

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

## Access Management — AAA Framework & IAM

> **AAA FRAMEWORK — Authentication, Authorization, Accounting**
> **THE AAA FRAMEWORK:**
> **STEP 1: AUTHENTICATION  ('Who are you?')**

```
  +----------------------------------------------------------+
  | Prove your identity BEFORE being granted any access.     |
  | KNOWLEDGE:      Something you KNOW  (password, PIN)      |
  | OWNERSHIP:      Something you HAVE  (OTP app, hardware   |
  |                  key, SMS code)                          |
  | CHARACTERISTIC: Something you ARE   (fingerprint, Face   |
  |                  ID, iris scan)                          |
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
  | Tools: SIEM, audit logs, user behavior analytics (UBA).  |
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

## Quick Revision

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
