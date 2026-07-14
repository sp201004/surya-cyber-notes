## Contents

- [Master Glossary — Course 2 Complete](#master-glossary--course-2-complete)
- [Quick-Review Flashcard Matrix — All Modules](#quick-review-flashcard-matrix--all-modules)

## Master Glossary — Course 2 Complete

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

## Quick-Review Flashcard Matrix — All Modules

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
