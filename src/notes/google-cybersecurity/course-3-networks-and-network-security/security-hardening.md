## Contents

- [What is Security Hardening?](#what-is-security-hardening)
- [Operating System Hardening](#operating-system-hardening)
- [Defeating Credential Attacks](#defeating-credential-attacks)
- [Network Hardening Practices](#network-hardening-practices)
- [Cloud Infrastructure Hardening](#cloud-infrastructure-hardening)

## What is Security Hardening?

> **KEY CONCEPT**
> Security Hardening is the continuous process of strengthening a system's configurations and defenses to reduce the number of vulnerabilities an attacker could exploit.
> 
> Attack Surface: The total set of all possible entry points, vulnerabilities, and exposed vectors that a threat actor could use to gain unauthorized access.
> 
> Goal of hardening: Shrink the attack surface as small as possible. Every unnecessary open port, default credential, unpatched library, and misconfigured service is a potential entry point.
> 
> The House Analogy: Your network is a house. The attack surface is every window, door, mail slot, and loose brick. Hardening = adding deadbolts, window locks, an alarm system, security cameras, and a guard dog.


**DEFENSE-IN-DEPTH:** No single tool stops every attack. LAYER your defenses.

| **Layer** | **Controls** | **Prevents** |
| --- | --- | --- |
| LAYER 5: PHYSICAL SECURITY | Biometric access, CCTV, guards, server cages, locked racks | physical theft, unauthorized hardware access |
| LAYER 4: NETWORK HARDENING | Firewalls, IDS/IPS, network segmentation, VPN, VLAN isolation | external intrusion, lateral movement, eavesdropping |
| LAYER 3: OS HARDENING | Patch management, baseline configs, MFA, minimal services | OS exploits, credential attacks, privilege escalation |
| LAYER 2: APPLICATION HARDENING | Input validation, secure coding, WAF, dependency scanning | SQL injection, XSS, RCE via vulnerable libraries |
| LAYER 1: CLOUD HARDENING | IAM policies, encryption, shared responsibility model, CSPM | data exposure, misconfigured cloud services |

If attacker breaches Layer 4 (network firewall), Layer 3 (OS hardening) still stops them. If they bypass Layer 3, Layer 2 (app security) catches them. No single failure = total compromise. Multiple failures required.

## Operating System Hardening

> **IMPORTANT: Why OS Hardening is Critical**
> The OS sits between ALL software applications and the physical hardware.
> A single compromised OS gives the attacker access to EVERY application running on it --
> all databases, all encryption keys, all user data, all network connections.
> Hardening the OS is the highest-leverage security investment you can make on a server.

### A. Patch Management — The First Line of OS Defense

> **NOTE**
> A patch is a software update that fixes a specific, known security vulnerability.
> 
> The Race Against Time:
> 1. Security researcher discovers a vulnerability in, say, OpenSSL.
> 2. Vendor is notified (responsible disclosure). Vendor develops and releases a patch.
> 3. The patch itself ANNOUNCES the vulnerability details publicly.
> 4. Malicious actors immediately read the patch notes and write exploits targeting
> systems that have NOT yet updated.
> 5. Organizations that patch within 24-48 hours are safe.
> Organizations that take weeks are sitting targets.
> 
> Zero-Day Vulnerability: A vulnerability discovered and exploited BEFORE the vendor even knows about it.
> There is NO patch available yet. The only defense is network-level mitigations and detection.

| **Patch Priority** | **Examples** | **Response Time** | **Why** |
| --- | --- | --- | --- |
| **CRITICAL (CVSS 9.0-10.0)** | Remote code execution (RCE) vulnerabilities, authentication bypass, unauthenticated exploits. | 24-48 hours. Emergency change. | These are actively weaponized within hours of disclosure. WannaCry exploited a critical patch that had been available for 2 months. |
| **HIGH (CVSS 7.0-8.9)** | Privilege escalation, local code execution, significant data exposure. | Within 1 week. | High probability of active exploitation. Attack tools appear quickly on GitHub and dark web forums. |
| **MEDIUM (CVSS 4.0-6.9)** | Requires user interaction, limited scope, partial data exposure. | Within 30 days. | Less likely to be actively targeted, but still creates meaningful risk if left unpatched long-term. |
| **LOW (CVSS 0.1-3.9)** | Informational leakage, minor UI issues, theoretical vulnerabilities. | Within 90 days or next scheduled maintenance. | Low practical risk. Address in regular maintenance cycles. |

### B. Baseline Configurations — The Standard for Secure Deployment

> **EXAMPLE**
> A baseline configuration (baseline image) is a documented, pre-approved, standardized set of security settings used as the TEMPLATE for deploying all new systems.
> 
> Think of it as the 'known good state' of a system. Any deviation from the baseline is immediately suspicious.
> 
> Example of a corporate laptop baseline:
> * Full-disk encryption (BitLocker / FileVault) ENABLED
> * Local administrator account DISABLED
> * Automatic OS updates ENABLED
> * USB mass storage DISABLED
> * Screensaver lock after 5 minutes ENABLED
> * Host-based firewall ENABLED and policy applied
> * Approved endpoint security software INSTALLED
> 
> If an analyst suspects a server was compromised, they compare current config against the baseline.
> A newly opened port 4444 (classic backdoor port) not in the baseline = immediate red flag.

### C. Strong Authentication — Defending the Login Portal


**Authentication Portal:** The #1 target for attackers. Most breaches begin with a compromised account.

**STRONG PASSWORD POLICY REQUIREMENTS:**

| **Requirement** | **Policy** |
| --- | --- |
| Minimum length | 12-16 characters (longer = stronger) |
| Complexity | Upper + lower + numbers + symbols |
| No dictionary words | 'Password123' cracked in seconds |
| No reuse | Cannot reuse last 12 passwords |
| Expiry | Force reset every 90 days (contested) |
| Lockout | Lock 15 minutes after 5 failed attempts |

**MFA (Multi-Factor Authentication) — THREE FACTORS:**

| **Factor** | **Examples** | **Note** |
| --- | --- | --- |
| SOMETHING YOU KNOW | Password, PIN, security question | Weakness: phishable, guessable |
| SOMETHING YOU HAVE | Authenticator app OTP, YubiKey | Strength: physical device required |
| SOMETHING YOU ARE | Fingerprint, Face ID, iris scan | Strength: cannot be shared/stolen easily |

Combining any TWO factors stops 99.9% of automated credential attacks. (Microsoft Security report: MFA blocks 99.9% of account compromise attempts)

## Defeating Credential Attacks

### Brute Force Attack Types

| **Attack Type** | **Method** | **Speed** | **Best Defence** |
| --- | --- | --- | --- |
| **Simple Brute Force** | Automated tool tries EVERY possible character combination: aaa, aab, aac... zzz. Methodical and exhaustive. | Very slow for long passwords. 8-char password = 218 trillion combos. 12-char = 3.5 quintillion. Time: seconds to centuries depending on length. | Long passwords. Account lockout after 5 attempts. MFA (even if password guessed, MFA required). |
| **Dictionary Attack** | Tool tries a pre-compiled wordlist of common passwords, real words, and passwords stolen from previous data breaches (have I been pwned database). | Very fast. Checks millions of common passwords in seconds. Incredibly effective because 80% of people use variations of common words. | Prohibit dictionary words in password policy. Check passwords against known breach databases on creation. MFA. |
| **Credential Stuffing** | Uses username+password pairs stolen from SITE A to try logging into SITE B, exploiting password reuse. | Fast and scalable. Automated tools check thousands of sites. Success rate ~0.1-2% per pair but against millions of stolen credentials = thousands of compromised accounts. | Never reuse passwords. Use a password manager. MFA everywhere. Monitor for logins from unusual IPs/locations. |
| **Rainbow Table Attack** | Pre-computed table of password hashes. Instead of hashing 'password123' each guess, looks it up in the table instantly. | Extremely fast for unsalted hashes. Renders basic MD5/SHA1 password storage useless. | Password SALTING: add random unique value to each password before hashing. Makes rainbow tables useless because each hash is unique. |

### Safe Testing Environments — Where Analysts Practice

| **Environment** | **What It Is** | **Best For** | **Key Limitation** |
| --- | --- | --- | --- |
| **Virtual Machine (VM)** | Software-simulated computer running on a host machine. Complete OS isolation. | Testing malware samples, practicing exploits, running risky configurations. If VM is compromised, delete and recreate in minutes. | Advanced malware detects VM environments (checks for VM artifacts) and behaves innocently to avoid analysis. |
| **Sandbox** | An isolated, constrained execution environment specifically designed to observe malware behavior. | Detonating suspicious files to watch exactly what they do: files modified, registry changes, network connections made. | Same sandbox detection evasion as VMs. Time-limited analysis windows may miss delayed-activation malware. |
| **Network Simulation** | Virtual network topology (using tools like GNS3, EVE-NG) that mimics production infrastructure. | Testing firewall rule changes, routing configurations, and attack simulations before applying to production. | Cannot fully replicate production traffic patterns and load. Some behaviors only appear under real load. |

## Network Hardening Practices

### A. Port Filtering & Firewall Rules

> **NOTE: Principle of Least Privilege for Ports**
> Every open port is a potential attack vector. If a port is not REQUIRED for normal operations, it MUST be closed.
> Default: DENY ALL. Then explicitly open ONLY what is needed.
> Example secure server setup:
> * Port 22 (SSH): Open ONLY from known admin IP ranges. Key-based auth only.
> * Port 443 (HTTPS): Open from anywhere (public web server).
> * Port 80 (HTTP): Open but immediately redirects to 443.
> * Port 5432 (PostgreSQL): Bound to localhost ONLY. Never externally accessible.
> * Everything else: BLOCKED at firewall.

| **Firewall Type** | **Inspection Level** | **Remembers Sessions?** | **Detects App-Layer Attacks?** |
| --- | --- | --- | --- |
| **Stateless** | Packet headers only (IP, port, protocol). Each packet evaluated independently. | No. Same rules apply whether first packet or thousandth. | No. Cannot correlate across packets to detect DoS patterns or fragmentation attacks. |
| **Stateful** | Packet headers + tracks connection state table (SYN/ACK tracking). | Yes. Allows reply traffic for established connections automatically. | Partially. Can detect SYN floods and half-open connection attacks. Cannot inspect payload. |
| **NGFW (Next-Gen)** | Deep Packet Inspection: reads inside the payload. Application-aware. Integrated IPS/IDS. | Yes + application context. | Yes. Can block specific apps, detect malware signatures in payload, enforce application policies. |

### B. Network Segmentation — Containing Breaches

> **IMPORTANT: Why Segmentation Saves Organizations**
> Flat network (no segmentation): Attacker compromises ONE machine -> Has direct access to EVERY machine on the network.
> Segmented network: Attacker compromises one machine -> Firewall walls block access to all other segments.
> 
> Real example: Target's 2013 breach began with a compromised HVAC vendor's credentials.
> Because Target's network was insufficiently segmented, attackers moved from the HVAC system
> to the POS (Point of Sale) systems and stole 40 million credit card numbers.
> Proper segmentation between HVAC/vendor access and POS systems would have contained the breach.

> **NETWORK SEGMENTATION — Containing the Blast Radius**
> **SEGMENTED NETWORK ARCHITECTURE:**

```
  +---------------------+  +---------------------+  +---------------------+
  | SEGMENT A           |  | SEGMENT B           |  | SEGMENT C           |
  | Engineering (VLAN1) |  | HR (VLAN2)          |  | Finance (VLAN3)     |
  +---------------------+  +---------------------+  +---------------------+
         |                          |                          |
         +------------+-------------+------------+------------+
                      |  INTER-VLAN FIREWALL        |
                      |  Rules: Eng -> Internet OK  |
                      |         HR -> Internet OK   |
                      |         Eng -> Finance DENY |
                      |         HR -> Finance DENY  |
                      v
                 [INTERNET]

  If attacker compromises Engineering laptop:
  * Can reach Engineering segment resources
  * CANNOT reach Finance database (inter-VLAN firewall blocks)
  * CANNOT reach HR records
  * Blast radius is CONTAINED to one segment
```

### C. IDS vs. IPS — Detection vs. Prevention

> **IDS vs. IPS -- Detection vs. Active Prevention**
> **IDS (Intrusion Detection System)     IPS (Intrusion Prevention System)**

```
  +----------------------------------+  +--------------------------------------+
  | PASSIVE -- reads traffic copy    |  | INLINE -- sits in traffic path       |
  |                                  |  |                                      |
  | Network --[copy]-> IDS           |  | Network --[all traffic]-> IPS ->     |
  |         --[real]-> Destination   |  |                         (or DROP).   |
  |                                  |  |                                      |
  | Sees attack, sends ALERT         |  | Sees attack, DROPS packets           |
  | Does NOT stop traffic            |  | Stops attack automatically           |
  | Zero network performance impact  |  | Small latency added                  |
  | Cannot block false positives     |  | False positives = blocked legit      |
  |                                  |  | traffic (dangerous if misconfiged)   |
  +----------------------------------+  +--------------------------------------+

  SIEM integrates with both: collects all IDS/IPS alerts into one dashboard.

  TYPICAL DEPLOYMENT:
  * IPS at the network PERIMETER: block known attacks before they enter
  * IDS inside the network: detect lateral movement that already got past perimeter
  * SIEM correlates both: 'IPS blocked 50 attacks, but IDS shows an internal
    machine is still behaving maliciously -- perimeter breach succeeded.'
```

## Cloud Infrastructure Hardening

### A. The Shared Responsibility Model

> **SHARED RESPONSIBILITY MODEL**
> **CLOUD SECURITY = SHARED RESPONSIBILITY**

```
  +----------------------------------------------------------------------+
  |                    CLOUD SERVICE PROVIDER (CSP)                      |
  | Responsible for: Physical data centers, hardware, host servers,      |
  | hypervisors, network infrastructure, physical security.              |
  | You CANNOT audit or control this layer.                              |
  +----------------------------------------------------------------------+
  |                                                                      |
  |            ---- THE LINE OF SHARED RESPONSIBILITY ----               |
  |                                                                      |
  +----------------------------------------------------------------------+
  |                      CUSTOMER (YOU)                                  |
  | Responsible for: Your data, your applications, your OS patches,      |
  | your IAM configurations, your security groups/firewall rules,        |
  | your encryption keys, your compliance requirements.                  |
  | You ARE responsible for this layer. Misconfiguring it = YOUR breach. |
  +----------------------------------------------------------------------+

  COMMON CLOUD MISCONFIGURATION BREACHES:
  * S3 bucket set to PUBLIC: all data freely downloadable by anyone
  * Overly permissive IAM role: attacker gains access to entire cloud account
  * Security group open to 0.0.0.0/0: database exposed to entire internet
  * Missing encryption: data readable if storage is accessed
```

### B. Hypervisors & VM Escape Attacks

> **NOTE**
> Hypervisor: Software layer that allows multiple Virtual Machines (VMs) to run on ONE physical server simultaneously. Each VM believes it has dedicated hardware.
> 
> VM Escape Attack: A rare but catastrophic exploit where an attacker's code running INSIDE a guest VM breaks out of the virtualization boundary and gains access to the underlying hypervisor.
> 
> Impact: The hypervisor has control over ALL VMs on that physical server.
> In a cloud environment, this could mean accessing OTHER CUSTOMERS' virtual machines -- a massive breach.
> 
> Cloud providers are hypervisor security is extremely hardened (they patch hypervisor vulnerabilities within hours).
> Still, defense: keep guest VM OS patched, minimize the attack surface inside the VM.

### C. Cloud Cryptography

| **Concept** | **What It Is** | **Why It Matters** |
| --- | --- | --- |
| **Encryption at Rest** | Data stored on disk is encrypted. Unreadable without the decryption key. | If a storage drive is physically stolen or cloud storage is misconfigured, raw data is unreadable. AWS S3 server-side encryption, Azure Storage Service Encryption. |
| **Encryption in Transit** | Data is encrypted while traveling between services. TLS/HTTPS. | Prevents eavesdropping on data moving between your application, database, and users. Use TLS 1.3 for all internal service-to-service traffic. |
| **HSM / TPM** | Hardware Security Module / Trusted Platform Module. Dedicated hardware chips that securely store encryption keys and perform cryptographic operations. | Keys never leave the hardware chip unencrypted. Even if an attacker accesses the server, they cannot extract the keys. AWS CloudHSM, Google Cloud HSM. |
| **Crypto-Shredding** | Intentionally destroying the decryption keys for data you want to permanently delete. | In cloud environments, you cannot physically shred a hard drive. By destroying the keys, all encrypted data becomes permanently unreadable -- effectively deleted. Used for GDPR right-to-erasure compliance. |

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| **What is Defense-in-Depth?** | Layering multiple security controls (physical, network, OS, application, cloud) so that no single failure leads to total compromise. Attacker must defeat EVERY layer to succeed. |
| **How fast must CRITICAL (CVSS 9.0-10.0) patches be applied?** | Within 24-48 hours as an emergency change — these are actively weaponized within hours of disclosure. |
| **What is a baseline configuration?** | A documented, pre-approved, standardized set of security settings used as the template for all new deployments. Any deviation is immediately suspicious. |
| **Name the 4 brute-force attack types.** | Simple Brute Force, Dictionary Attack, Credential Stuffing, Rainbow Table Attack. |
| **How do you defeat a rainbow table attack?** | Password SALTING — add a random unique value to each password before hashing so every hash is unique, rendering pre-computed tables useless. |
| **IDS vs. IPS -- key difference?** | IDS: PASSIVE, reads a copy of traffic, generates alerts, does not stop attacks, zero performance impact. IPS: INLINE, sits in the traffic path, automatically drops malicious packets. |
| **What is the Shared Responsibility Model in cloud?** | CSP secures physical hardware, data centers, hypervisors. Customer secures their data, applications, OS patches, IAM configs, firewall rules, encryption keys. |
| **What is a VM Escape attack?** | Attacker's code running inside a guest VM breaks out of the virtualization boundary to access the underlying hypervisor — potentially compromising all other VMs on the same physical server. |
