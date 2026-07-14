## Contents

- [Chronological History of Cyber Attacks](#chronological-history-of-cyber-attacks)
- [Malware — Four Major Types](#malware--four-major-types)
- [Social Engineering & Phishing — Full Classification](#social-engineering--phishing--full-classification)
- [Advanced Attack Types](#advanced-attack-types)
- [Threat Actors — Taxonomy](#threat-actors--taxonomy)
- [The 8 CISSP Security Domains](#the-8-cissp-security-domains)

## Chronological History of Cyber Attacks

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

## Malware — Four Major Types

| **Malware Type** | **Definition** | **How It Spreads** | **Key Characteristic** | **Real Example** |
| --- | --- | --- | --- | --- |
| Virus | Malicious code that alters standard computer operations and causes damage. | Requires EXPLICIT USER ACTION to execute (opening a malicious email attachment). | Needs a host file to attach to. Cannot self-spread without user triggering it. | Brain Virus (1986). User runs infected file -> virus attaches to boot sector of every disk inserted. |
| Worm | Self-replicating program that autonomously duplicates and traverses network infrastructure. | Spreads WITHOUT ANY USER INTERACTION. Exploits network vulnerabilities automatically. | Completely autonomous. No host file needed. Can fill memory by re-infecting the same machine (Morris Worm bug). | Morris Worm (1988). Crashed 10% of the internet. K8s analogy: why CPU/RAM resource limits are mandatory. |
| Ransomware | Cryptographic malware that encrypts an organization's datasets and demands payment to restore access. | Via phishing, unpatched RDP, or malicious links. Often deployed after initial access is established. | Encrypts files with attacker's key. Displays ransom demand. Modern ransomware also threatens to publish stolen data. | Colonial Pipeline (2021). Fuel supply to US East Coast shut down for 6 days. $4.4M ransom paid. |
| Spyware | Malicious monitoring software installed without consent to track, harvest, and export private data. | Bundled with legitimate software, malicious ads, or drive-by downloads. | Operates silently in background. Keyloggers record every keystroke. Sends data to attacker's server. | Keylogger installed via phishing attachment captures banking credentials without user ever knowing. |

## Social Engineering & Phishing — Full Classification

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

## Advanced Attack Types

| **Attack Type** | **How It Works** | **Why It's Dangerous** | **Defence** |
| --- | --- | --- | --- |
| Password Attack: Brute Force | Automated software tries every possible password combination sequentially until the correct one is found. | Modern GPUs can try billions of combinations per second. Short/simple passwords cracked in minutes. | Account lockout after N failed attempts. Strong password policy. MFA requirement. |
| Password Attack: Rainbow Table | Uses a pre-computed dictionary of password-to-hash mappings to instantly look up cracked hashes. | Eliminates the computation time of brute force. Pre-computed lookup = instant crack for common passwords. | Salting passwords before hashing (unique random salt per user defeats rainbow tables). |
| Cryptographic: Downgrade Attack | Forces a connection to drop from a modern secure protocol (TLS 1.3) to an older, weaker one (SSL 2.0) by manipulating the handshake. | Older protocols have known mathematical flaws. Attacker can then decrypt 'encrypted' traffic. | Disable all legacy protocols. Enforce minimum TLS 1.2. HSTS headers. |
| Supply-Chain Attack | Compromising a trusted vendor, software library, or hardware dependency BEFORE it reaches the target organization. | Target organization never directly attacked. The compromise arrives through their trusted update/vendor channel. | Code signing verification. Software composition analysis (SCA). Vendor security assessments. |
| Adversarial AI | Manipulating AI/ML systems to cause misclassification, bypass detection, or generate deceptive outputs. | AI systems can be fooled by subtly modified inputs that humans cannot detect. Defeats AI-based security tools. | Adversarial training datasets. Human-in-the-loop validation. Model monitoring for behavioral drift. |

## Threat Actors — Taxonomy

| **Category** | **Who They Are** | **Skill Level** | **Primary Motivation** | **Key Characteristic** |
| --- | --- | --- | --- | --- |
| APT (Advanced Persistent Threat) | Highly organized groups, often nation-state sponsored. | Expert | Espionage, infrastructure disruption, intellectual property theft. | Remain UNDETECTED inside a network for months or years. Patient, methodical, well-resourced. |
| Insider Threat: Malicious | Current/former employees, vendors with legitimate credentials. | Varies | Sabotage, data theft for financial gain, revenge. | Already has legitimate access -- bypasses perimeter controls entirely. Hardest to detect. |
| Insider Threat: Accidental | Careless employees or phishing victims with no malicious intent. | Varies | None -- human error | Accounts for majority of data incidents. Training is the primary mitigation. |
| Hacktivist | Ideologically or politically motivated individuals or groups. | Low to medium | Political statement, environmental cause, exposing wrongdoing. | Website defacement, DDoS attacks, data leaks. Targets organizations they oppose ideologically. |
| Script Kiddie | Low-skill individuals using pre-made hacking tools without understanding them. | Low | Curiosity, notoriety, causing disruption for fun. | No sophisticated attack design. Opportunistic. Target low-hanging fruit (unpatched systems). |
| Authorized (White Hat) Hacker | Security professionals hired to test and find vulnerabilities legally. | High | Improving organizational security posture. | Have written authorization. Follow rules of engagement. Report findings responsibly. |
| Semi-Authorized (Researcher) | Security researchers who find bugs but don't exploit them for harm. | Medium to high | Research, public good, responsible disclosure. | May not have explicit authorization but intent is non-malicious. Report to vendors. |

## The 8 CISSP Security Domains

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

## Quick Revision

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
