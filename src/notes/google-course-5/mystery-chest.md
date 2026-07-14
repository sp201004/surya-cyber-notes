## Contents

- [Complete Course 5 Glossary](#complete-course-5-glossary)
- [Complete Flashcard Review — All Modules](#complete-flashcard-review--all-modules)

## Complete Course 5 Glossary

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

## Complete Flashcard Review — All Modules

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
