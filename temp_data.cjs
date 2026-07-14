"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODULES_DATA = void 0;
exports.MODULES_DATA = [
    {
        id: 'intro-to-cybersecurity',
        title: 'Introduction to Cyber Security',
        description: 'Learn about the core concepts of offensive security, defensive security, career pathways, and general cybersecurity vocabulary.',
        topics: [
            {
                id: 'offensive-security-intro',
                moduleId: 'intro-to-cybersecurity',
                title: 'Offensive Security Intro',
                description: 'Understand how ethical hackers compromise systems to find vulnerabilities and secure organizations.',
                status: 'unlocked',
                iconType: 'sword',
                content: "# Room 1 \u2013 Offensive Security Intro\n\n## \uD83C\uDFAF Objective\nLearn the basics of **Offensive Security** by thinking like an ethical hacker and exploiting a vulnerable banking website in a safe lab.\n\n## 1\uFE0F\u20E3 What is Offensive Security?\n\n**Definition:** Offensive Security is the practice of **simulating real-world cyber attacks** to identify and fix vulnerabilities **before malicious hackers exploit them**.\n\n**Goal:**\n- Find weaknesses\n- Exploit vulnerabilities (legally)\n- Help organizations improve security\n\n### \uD83E\uDDE0 Mind Map\n```\nOffensive Security\n\u2502\n\u251C\u2500\u2500 Think Like an Attacker\n\u251C\u2500\u2500 Find Vulnerabilities\n\u251C\u2500\u2500 Exploit Weaknesses (Legally)\n\u251C\u2500\u2500 Report Findings\n\u2514\u2500\u2500 Improve Security\n```\n\n### Offensive vs Defensive Security\n| Offensive Security | Defensive Security |\n|---|---|\n| Attacks systems ethically | Protects systems |\n| Finds vulnerabilities | Detects & prevents attacks |\n| Uses hacking tools | Uses monitoring & security tools |\n| Red Team | Blue Team |\n\n> \u2B50 **Remember:** Offensive = Attack (Ethically) \u00B7 Defensive = Protect\n\n## 2\uFE0F\u20E3 Think Like a Hacker\n\nEthical hackers ask questions like:\n- What information is exposed?\n- Are there hidden pages?\n- Can authentication be bypassed?\n- Can I gain unauthorized access?\n\n### Hacker Mindset\n```\nObserve \u2192 Gather Information \u2192 Find Weakness \u2192 Exploit \u2192 Gain Access\n```\n\n## 3\uFE0F\u20E3 Starting the Lab\n\nA vulnerable banking website called **FakeBank** is provided.\n\n**Information Found**\n- Bank Account Number: `8881`\n- Purpose: used later to manipulate the account balance.\n\n## 4\uFE0F\u20E3 Finding Hidden Pages\n\n**Why?** Many websites accidentally leave the following accessible to everyone:\n- Admin panels\n- Backup files\n- Test pages\n- Login portals\n\nThese are called **Hidden Pages**.\n\n**Tool Used \u2014 Dirb**\nDirb is a **directory brute-forcing tool** that discovers hidden files and directories using a wordlist.\n\n```bash\n# Syntax\ndirb <URL>\n\n# Command\ndirb http://fakebank.thm\n```\n\n**What it does**\n- Sends many HTTP requests\n- Tests common filenames/directories\n- Displays existing pages\n\n**Hidden Pages Found**\n- `/images`\n- `/bank-transfer`\n\n### Mind Map\n```\nWebsite Enumeration\n\u2502\n\u251C\u2500\u2500 Scan Website\n\u251C\u2500\u2500 Run DIRB\n\u2502      dirb URL\n\u251C\u2500\u2500 Find Hidden Pages\n\u2502      \u251C\u2500\u2500 /images\n\u2502      \u2514\u2500\u2500 /bank-transfer\n\u2514\u2500\u2500 Attack Hidden Admin Panel\n```\n\n## 5\uFE0F\u20E3 Exploiting the Admin Page\n\nNavigate to `http://fakebank.thm/bank-transfer`\n\n**Steps**\n1. Open hidden page\n2. Select account `8881`\n3. Deposit `$2000 or more`\n4. Balance becomes positive\n5. Flag appears \u2192 `BANK-HACKED`\n\n### Attack Flow\n```\nReconnaissance\n     \u25BC\nDirectory Enumeration\n     \u25BC\nHidden Page Found\n     \u25BC\nAccess Admin Panel\n     \u25BC\nDeposit Money\n     \u25BC\nPositive Balance\n     \u25BC\nFlag Obtained\n```\n\n## \uD83D\uDCCC Important Terms\n| Term | Meaning |\n|---|---|\n| Offensive Security | Ethically attacking systems to identify vulnerabilities |\n| Ethical Hacker | A security professional authorized to test systems for weaknesses |\n| Vulnerability | A flaw or weakness that attackers can exploit |\n| Enumeration | The process of collecting detailed information about a target |\n| Directory Brute Force | Searching for hidden web pages using a predefined wordlist |\n| Admin Panel | A privileged management interface; if exposed, can lead to unauthorized access |\n\n## \u26A1 Quick Revision\n```\nOffensive Security \u2192 Think Like Hacker \u2192 Find Hidden Pages \u2192 Use DIRB\n\u2192 dirb http://fakebank.thm\n\u2192 Found: /images, /bank-transfer\n\u2192 Deposit $2000+ \u2192 Flag: BANK-HACKED\n```\n\n## \u2B50 Interview Notes\n- **What is Offensive Security?** Simulating cyberattacks in an authorized environment to identify and remediate vulnerabilities before attackers exploit them.\n- **What is Directory Enumeration?** Discovering hidden files and directories on a web server using tools such as DIRB, Gobuster, or FFUF.\n- **What is DIRB?** A web content scanner that performs directory brute-forcing using a wordlist to discover hidden resources.\n\n## \u274C Common Mistakes\n| Mistake | Correct Approach |\n|---|---|\n| Assuming only visible pages exist | Always perform directory enumeration |\n| Accessing hidden pages without authorization | Test only in authorized environments (TryHackMe, Hack The Box) |\n| Skipping reconnaissance | Recon & enumeration are critical first steps before exploitation |\n\n## \uD83D\uDCDD 30-Second Revision\n- \u2705 Offensive Security = Ethical hacking to find vulnerabilities.\n- \u2705 Think like an attacker to identify weaknesses.\n- \u2705 Use **DIRB** to enumerate hidden web directories.\n- \u2705 Command: `dirb http://fakebank.thm`\n- \u2705 Hidden pages discovered: `/images`, `/bank-transfer`\n- \u2705 Deposit **$2000+** into account **8881** to trigger the flag.\n- \u2705 Final flag: **BANK-HACKED**\n\n> **Core Lesson:** Every successful penetration test starts with **reconnaissance and enumeration**. Finding hidden resources often reveals the attack surface before any exploitation begins.",
                realWorldCallout: {
                    title: 'Bank Vault Assessment',
                    concept: 'Physical and Digital Penetration Testing',
                    scenario: 'Apex Security is hired by a major bank to test their security. A pentester spoofs an employee ID badge, walks past physical security, plugs a small rogue device (Rubber Ducky) into an unattended workstation, and gains remote access to the internal banking network.',
                    relevance: 'This shows that offensive security is not just about digital exploits, but also social engineering and physical security. It proved to the bank that physical access equals total compromise.'
                },
                mindmap: [
                    { id: 'off-sec', label: 'Offensive Security', description: 'Adversarial approach to security', x: 50, y: 15, connections: ['pentesting', 'red-team', 'vuln-assess'] },
                    { id: 'pentesting', label: 'Penetration Testing', description: 'Simulated cyberattack on a system', x: 25, y: 50 },
                    { id: 'red-team', label: 'Red Teaming', description: 'Stealthy full-scope defense test', x: 50, y: 55 },
                    { id: 'vuln-assess', label: 'Vulnerability Assessment', description: 'Finding and cataloging security flaws', x: 75, y: 50 }
                ],
                keyTakeaways: [
                    'Offensive security is proactive and fully authorized; unauthorized hacking is illegal.',
                    'Penetration testing is highly structured and focuses on finding as many bugs as possible.',
                    'Red Teaming mimics real threat actors, focusing on stealth and overall incident response, rather than cataloging every single vulnerability.',
                    'Vulnerabilities must be patched and re-tested to ensure they are remediated.'
                ],
                quiz: [
                    {
                        id: 'q-off-1',
                        question: 'What color team is associated with offensive operations and simulating adversary attacks?',
                        type: 'text',
                        correctAnswer: 'red',
                        hint: 'Think of Red vs Blue.'
                    },
                    {
                        id: 'q-off-2',
                        question: 'What is the term for an authorized, structured security assessment designed to actively exploit vulnerabilities in a system?',
                        type: 'text',
                        correctAnswer: 'penetration testing',
                        hint: 'Often abbreviated as pentesting.'
                    }
                ]
            },
            {
                id: 'defensive-security-intro',
                moduleId: 'intro-to-cybersecurity',
                title: 'Defensive Security Intro',
                description: 'Explore the protective side of cyber, including monitoring, forensics, threat detection, and incident response.',
                status: 'unlocked',
                iconType: 'shield',
                content: "# Room 2 \u2013 Defensive Security Intro\n\n## \uD83C\uDFAF Objective\nLearn the fundamentals of **Defensive Security** by monitoring, detecting, investigating, and stopping an attack on the **FakeBank** website.\n\n## 1\uFE0F\u20E3 What is Defensive Security?\n\n**Definition:** Defensive Security is the practice of **protecting systems, networks, and data** from cyber attacks by continuously monitoring, detecting, analyzing, and responding to threats.\n\n**Goal:**\n- Protect systems\n- Detect attacks\n- Investigate incidents\n- Respond quickly\n- Minimize damage\n\n### \uD83E\uDDE0 Mind Map\n```\nDefensive Security\n\u2502\n\u251C\u2500\u2500 Monitor Systems\n\u251C\u2500\u2500 Detect Threats\n\u251C\u2500\u2500 Investigate Incidents\n\u251C\u2500\u2500 Respond to Attacks\n\u2514\u2500\u2500 Improve Security\n```\n\n### Offensive vs Defensive Security\n| Offensive Security | Defensive Security |\n|---|---|\n| Finds vulnerabilities | Protects against attacks |\n| Simulates attacks | Detects & responds to attacks |\n| Ethical Hacking | Security Monitoring |\n| Red Team | Blue Team |\n\n> \u2B50 **Remember:**\n> Red Team \u2192 Attack \u00B7 Blue Team \u2192 Defend \u00B7 Purple Team \u2192 Collaboration of Red + Blue\n\n## 2\uFE0F\u20E3 Think Like a Defender\n\nUnlike ethical hackers, defenders:\n- Monitor systems continuously\n- Detect suspicious activities\n- Investigate incidents\n- Respond before damage occurs\n\n**Main Goal:** \u2714 Detect and respond to attacks.\n\n### Defender Workflow\n```\nMonitor \u2192 Detect \u2192 Investigate \u2192 Contain \u2192 Recover\n```\n\n## 3\uFE0F\u20E3 SOC (Security Operations Center)\n\n**Definition:** A **Security Operations Center (SOC)** is a team responsible for continuously monitoring and defending an organization's systems against cyber threats.\n\n**Responsibilities**\n- Monitor security alerts\n- Analyze suspicious events\n- Investigate incidents\n- Respond to attacks\n- Improve security posture\n\n### SOC Analyst Workflow\n```\nReceive Alert \u2192 Investigate \u2192 Identify Threat \u2192 Contain Attack \u2192 Recover System\n```\n\n## 4\uFE0F\u20E3 Detect Suspicious Activity\n\n**Objective:** Monitor security logs to identify malicious activity.\n\n**Steps**\n1. Open monitoring dashboard.\n2. Review recent alerts.\n3. Identify suspicious IP address.\n\n**Suspicious Source IP:** `32.122.195.63`\n\n> Monitoring helps defenders detect attacks **before they cause significant damage**.\n\n## 5\uFE0F\u20E3 Identify the Attack\n\n**Objective:** Determine what the attacker is trying to access.\n\n**Investigation Process**\n- Review logs\n- Check URL discovery attempts\n- Examine latest activity\n\n**Latest URL Accessed:** `https://fakebank.com/admin`\n\n### Attack Flow\n```\nAttacker \u2192 Website Scan \u2192 Discover Hidden Admin Page \u2192 Attempt Unauthorized Access\n```\n\n## 6\uFE0F\u20E3 Stop the Attack\n\n**Immediate Priority \u2014 Containment:** stopping an attack while it is still in progress to prevent further damage.\n\n**Steps**\n1. Identify malicious IP.\n2. Create firewall rule.\n3. Block attacker IP.\n4. Apply changes.\n5. Verify attack has stopped.\n\n- **Blocked IP:** `32.122.195.63`\n- **Action:** `Firewall Rule \u2192 BLOCK`\n- **Final Flag:** `THM{FAKEBANK-SECURED}`\n\n### Containment Process\n```\nAlert Generated \u2192 Investigate Logs \u2192 Find Malicious IP \u2192 Block IP \u2192 Attack Stopped\n```\n\n## \uD83D\uDCCC Important Terms\n| Term | Meaning |\n|---|---|\n| Defensive Security | Protecting systems from cyber attacks |\n| SOC | Security Operations Center responsible for monitoring and responding to threats |\n| SOC Analyst | Monitors alerts, investigates incidents, and responds to attacks |\n| Monitoring | Continuous observation of system activity to detect threats |\n| Alert | A notification generated when suspicious behavior is detected |\n| Incident | A security event that may compromise confidentiality, integrity, or availability |\n| Investigation | Analyzing logs and alerts to determine the nature and impact of an attack |\n| Containment | Stopping an active attack to minimize damage |\n| Firewall | Filters incoming/outgoing network traffic based on predefined rules |\n| Firewall Rule | Allows or blocks traffic based on IP address, port, or protocol |\n\n### Incident Response Lifecycle\n```\nPreparation \u2192 Detection \u2192 Analysis \u2192 Containment \u2192 Eradication \u2192 Recovery \u2192 Lessons Learned\n```\n\n## \u26A1 Quick Revision \u2014 Values to Remember\n| Item | Value |\n|---|---|\n| Suspicious IP | `32.122.195.63` |\n| Hidden Admin URL | `https://fakebank.com/admin` |\n| Firewall Action | `BLOCK` |\n| Flag | `THM{FAKEBANK-SECURED}` |\n\n## \u2B50 Interview Notes\n- **What is Defensive Security?** Protecting systems by monitoring, detecting, investigating, and responding to cyber threats.\n- **What is a SOC?** A Security Operations Center where analysts monitor security events and respond to incidents 24/7.\n- **What is Containment?** Limiting an ongoing attack to prevent further damage before eradication and recovery.\n- **Why are logs important?** They provide evidence of attacker actions, helping analysts investigate incidents and determine scope.\n- **What is a Firewall?** A network security mechanism that controls traffic by allowing or blocking connections based on predefined rules.\n\n## \u274C Common Mistakes\n| Mistake | Correct Approach |\n|---|---|\n| Ignoring security alerts | Investigate every alert to determine if it is malicious |\n| Delaying containment | Stop the attack first, then perform deeper analysis |\n| Blocking traffic without verification | Confirm the malicious source before applying firewall rules |\n| Focusing only on prevention | Defense needs continuous monitoring, detection, response, and recovery |\n\n## \uD83D\uDCDD 30-Second Revision\n- \u2705 Defensive Security = Protect systems and respond to attacks.\n- \u2705 Blue Team monitors and defends the infrastructure.\n- \u2705 SOC analysts investigate alerts and logs.\n- \u2705 Suspicious IP: **32.122.195.63**\n- \u2705 Attacker targeted: **https://fakebank.com/admin**\n- \u2705 Containment = Block the attacker immediately.\n- \u2705 Firewall action: **BLOCK**\n- \u2705 Final flag: **THM{FAKEBANK-SECURED}**\n\n> **Core Lesson:** Defensive Security is not just about preventing attacks \u2014 it's about **rapid detection, effective investigation, and swift containment** to minimize impact and keep systems secure.",
                realWorldCallout: {
                    title: 'The Ransomware Containment',
                    concept: 'Incident Detection & Quarantine',
                    scenario: 'At 2:00 AM, a defensive system alerts the SOC that a server is rapidly renaming files with a ".locked" extension. Within 2 minutes, a SOC Analyst confirms it is ransomware. They immediately isolate the infected server from the local network, preventing the malware from spreading to the other 400 computers in the building.',
                    relevance: 'This illustrates the critical speed of defensive security operations and shows how isolation/quarantine saves millions of dollars in business operational downtime.'
                },
                mindmap: [
                    { id: 'def-sec', label: 'Defensive Security', description: 'Defending assets and detecting attacks', x: 50, y: 15, connections: ['soc', 'ir', 'forensics', 'malware'] },
                    { id: 'soc', label: 'SOC Operations', description: '24/7 continuous log & event monitoring', x: 15, y: 50 },
                    { id: 'ir', label: 'Incident Response', description: 'Containing active network breaches', x: 38, y: 55 },
                    { id: 'forensics', label: 'Digital Forensics', description: 'Analyzing digital evidence post-incident', x: 62, y: 55 },
                    { id: 'malware', label: 'Malware Analysis', description: 'Deconstructing malicious programs', x: 85, y: 50 }
                ],
                keyTakeaways: [
                    'Defensive security is reactive (incident response) AND proactive (vulnerability patching, firewall configurations).',
                    'A SOC utilizes SIEM (Security Information and Event Management) tools to aggregate millions of system logs.',
                    'Digital Forensics must follow a strict "chain of custody" so evidence is legally admissible.',
                    'Quarantine is the absolute first action when containing an active network threat.'
                ],
                quiz: [
                    {
                        id: 'q-def-1',
                        question: 'What is the acronym for the command center where security analysts monitor logs and alerts 24/7?',
                        type: 'text',
                        correctAnswer: 'SOC',
                        hint: 'Security Operations Center.'
                    },
                    {
                        id: 'q-def-2',
                        question: 'Which defensive security field involves analyzing digital evidence post-compromise to discover how a hacker got in?',
                        type: 'text',
                        correctAnswer: 'digital forensics',
                        hint: 'Starts with digital, ends with forensics.'
                    }
                ]
            },
            {
                id: 'careers-in-cyber',
                moduleId: 'intro-to-cybersecurity',
                title: 'Careers in Cyber',
                description: 'Analyze different cybersecurity jobs, domains, and certifications to map out your learning path.',
                status: 'unlocked',
                iconType: 'clipboard',
                content: "# Room 3 \u2013 Careers in Cyber\n\n## \uD83C\uDFAF Objective\nUnderstand the major career paths in Cyber Security and the responsibilities, skills, and progression of each role.\n\n## \uD83E\uDDE0 Cyber Security Career Map\n```\nCyber Security\n\u2502\n\u251C\u2500\u2500 \uD83D\uDD35 Defensive Security (Blue Team)\n\u2502     \u251C\u2500\u2500 Security Analyst\n\u2502     \u251C\u2500\u2500 Security Engineer\n\u2502     \u251C\u2500\u2500 Incident Responder\n\u2502     \u251C\u2500\u2500 Threat Hunter\n\u2502     \u2514\u2500\u2500 Malware Analyst\n\u2502\n\u251C\u2500\u2500 \uD83D\uDD34 Offensive Security (Red Team)\n\u2502     \u251C\u2500\u2500 Penetration Tester\n\u2502     \u251C\u2500\u2500 Red Team Operator\n\u2502     \u251C\u2500\u2500 Web Pentester\n\u2502     \u2514\u2500\u2500 Network Pentester\n\u2502\n\u2514\u2500\u2500 \uD83D\uDFE3 Purple Team\n      \u2514\u2500\u2500 Combines Red + Blue Teams\n```\n\n## 1\uFE0F\u20E3 Introduction\nCybersecurity offers multiple career paths, whether you enjoy attacking systems (Offensive Security) or protecting them (Defensive Security).\n\n**Why Choose Cyber Security?**\n- \u2714 **High Demand** \u2014 Over **3.5 million** unfilled jobs worldwide.\n- \u2714 **High Salaries** \u2014 Competitive pay, even for entry-level roles.\n- \u2714 **Continuous Learning** \u2014 Technology and threats evolve constantly.\n\n## 2\uFE0F\u20E3 Security Analyst (Blue Team)\n**Role:** Monitor systems, investigate alerts, and respond to security incidents \u2014 the **digital defenders** of an organization.\n\n**Responsibilities:** monitor security events \u00B7 investigate suspicious activity \u00B7 analyze alerts \u00B7 respond to incidents \u00B7 work with security teams \u00B7 improve organizational defense.\n\n**Skills Needed:** analytical thinking \u00B7 curiosity \u00B7 attention to detail \u00B7 log analysis \u00B7 networking basics.\n\n**Career Progression**\n```\nSecurity Analyst \u2192 Incident Responder / Threat Hunter / Malware Analyst / SOC Lead\n```\n\n## 3\uFE0F\u20E3 Security Engineer\n**Role:** **Design, build, and maintain** an organization's security infrastructure \u2014 creating systems that prevent attacks before they happen.\n\n**Responsibilities:** design security architecture \u00B7 maintain security systems \u00B7 configure security tools \u00B7 assess risks \u00B7 keep defenses updated \u00B7 write security documentation.\n\n**Example:** maintaining an `Intrusion Detection System (IDS)`.\n\n**Skills Needed:** Linux \u00B7 Networking \u00B7 Firewalls \u00B7 IDS/IPS \u00B7 Cloud Security \u00B7 Scripting.\n\n**Career Progression**\n```\nSecurity Engineer \u2192 Application Security / Cloud Security / Infrastructure Security / Security Architect\n```\n\n## 4\uFE0F\u20E3 Penetration Tester (Ethical Hacker)\n**Role:** Legally attempts to hack systems to identify vulnerabilities before malicious attackers do.\n\n**Goal:** Find weaknesses \u2192 Exploit safely \u2192 Report findings \u2192 Help improve security.\n\n**Typical Workflow**\n```\nReconnaissance \u2192 Enumeration \u2192 Find Vulnerabilities \u2192 Exploitation \u2192 Privilege Escalation \u2192 Report Writing\n```\n\n> **Engagement:** the agreed-upon, authorized process of penetration testing between the tester and the organization. Always requires written permission and defined scope.\n\n**Skills Needed:** Linux \u00B7 Networking \u00B7 Web Security \u00B7 Active Directory \u00B7 Scripting \u00B7 Report Writing.\n\n## Blue Team vs Red Team\n| Blue Team | Red Team |\n|---|---|\n| Protect systems | Attack systems ethically |\n| Monitor alerts | Find vulnerabilities |\n| Incident Response | Exploitation |\n| SIEM | Burp Suite |\n| Firewalls | Metasploit |\n| IDS/IPS | Nmap |\n\n## Common Cybersecurity Roles\n| Role | Primary Work |\n|---|---|\n| Security Analyst | Monitoring & Incident Response |\n| Security Engineer | Build & Maintain Security Infrastructure |\n| Penetration Tester | Ethical Hacking |\n| Threat Hunter | Search for Hidden Threats |\n| Malware Analyst | Analyze Malicious Software |\n| Incident Responder | Handle Active Attacks |\n| Security Architect | Design Enterprise Security |\n\n## Cyber Security Skills Roadmap\n```\nNetworking \u2192 Linux \u2192 Operating Systems \u2192 Programming \u2192 Web Security \u2192 Cloud \u2192 Cyber Security Tools\n```\n\n## Tools You'll Eventually Learn\n**Blue Team:** Splunk \u00B7 Microsoft Sentinel \u00B7 Elastic (ELK) \u00B7 Wireshark \u00B7 Suricata \u00B7 Snort \u00B7 CrowdStrike\n\n**Red Team:** Nmap \u00B7 Burp Suite \u00B7 Metasploit \u00B7 Gobuster \u00B7 FFUF \u00B7 Hydra \u00B7 SQLmap\n\n## \u2B50 Interview Notes\n- **Security Analyst?** Monitors events, investigates alerts, responds to incidents, and helps protect systems.\n- **Security Engineer?** Designs, implements, and maintains security infrastructure (firewalls, IDS/IPS, secure architecture).\n- **What is an IDS?** An Intrusion Detection System monitors activity for suspicious behavior and generates alerts.\n- **Penetration Testing?** A legal, authorized simulation of cyberattacks to discover and validate vulnerabilities.\n- **Engagement?** The formal agreement defining scope, rules, timeline, and authorization for a pentest.\n\n## \u274C Common Mistakes\n| Mistake | Correct Approach |\n|---|---|\n| Thinking cybersecurity only means hacking | It includes both offensive (Red) and defensive (Blue) roles |\n| Assuming pentesters can attack any system | Testing must be authorized and within scope |\n| Believing engineers only configure firewalls | They design and maintain the whole security infrastructure |\n| Ignoring soft skills | Communication, documentation, teamwork, and analysis matter |\n\n## \uD83D\uDCDD 30-Second Revision\n- \u2705 Cybersecurity has **3.5M+** unfilled jobs globally.\n- \u2705 **Security Analyst** \u2192 Monitor, investigate, and respond to incidents.\n- \u2705 **Security Engineer** \u2192 Design and maintain security infrastructure (e.g., IDS).\n- \u2705 **Penetration Tester** \u2192 Ethically hack systems under an authorized **engagement**.\n- \u2705 **Blue Team** protects; **Red Team** attacks ethically.\n- \u2705 Strong foundations: **Networking \u2192 Linux \u2192 OS \u2192 Programming \u2192 Web Security \u2192 Cloud**.\n\n> **Core Lesson:** Whether you enjoy **defending systems (Blue Team)**, **building secure infrastructure**, or **ethically testing defenses (Red Team)**, every role contributes to keeping organizations secure.",
                realWorldCallout: {
                    title: 'Entering the Field',
                    concept: 'Certification and Practical Skills',
                    scenario: 'Alice transitions from a customer support representative to a junior SOC analyst in 8 months. She does this by obtaining her CompTIA Security+ certification to learn theory, and practicing hands-on security labs on platforms like TryHackMe to demonstrate practical technical knowledge during her interviews.',
                    relevance: 'Demonstrates that entry into cybersecurity requires a combination of foundational certification knowledge and hands-on, practical labs.'
                },
                mindmap: [
                    { id: 'careers', label: 'Cyber Careers', description: 'Vast field of specializations', x: 50, y: 15, connections: ['red-roles', 'blue-roles', 'grc-roles'] },
                    { id: 'red-roles', label: 'Offensive Roles', description: 'Pentesters, Red Teamers, Bug Hunters', x: 20, y: 50 },
                    { id: 'blue-roles', label: 'Defensive Roles', description: 'SOC Analysts, IR, Forensics, Hunters', x: 50, y: 55 },
                    { id: 'grc-roles', label: 'Compliance & Eng', description: 'GRC, Architects, Secure Coders', x: 80, y: 50 }
                ],
                keyTakeaways: [
                    'Cybersecurity is not just about hacking; defense, architecture, and compliance are equally vital.',
                    'SOC Analyst is often the most common entry-level role on the defensive side.',
                    'Junior Pentester is a highly competitive offensive role that requires solid networking and web fundamentals.',
                    'Hands-on laboratories (CTFs, TryHackMe rooms) are a major differentiator on standard CVs.'
                ],
                quiz: [
                    {
                        id: 'q-car-1',
                        question: 'Which role proactively searches network traffic and server logs to find sneaky threat actors before an alert fires?',
                        type: 'text',
                        correctAnswer: 'threat hunter',
                        hint: 'They Hunt for active Threats.'
                    },
                    {
                        id: 'q-car-2',
                        question: 'What is the acronym for the field that deals with regulations, audits, and compliance (e.g., GDPR, HIPAA)?',
                        type: 'text',
                        correctAnswer: 'GRC',
                        hint: 'Governance, Risk, and Compliance.'
                    }
                ]
            },
            {
                id: 'mystery-chest',
                moduleId: 'intro-to-cybersecurity',
                title: 'Mystery Chest',
                description: 'A collection of essential resources, terminal shortcuts, and tips for security students.',
                status: 'unlocked',
                iconType: 'chest',
                content: "# Room 3 (Extra) \u2013 Interactive Career Quiz\n\n## \uD83C\uDFAF Purpose\nThe interactive quiz helps identify which cybersecurity career best matches your personality, problem-solving style, and interests.\n\n## \uD83E\uDDE0 Your Result \u2192 \uD83D\uDEE1\uFE0F Security Analyst\n\n**Why Security Analyst?** Based on the quiz responses, you enjoy:\n- Investigating problems\n- Finding root causes\n- Reviewing logs\n- Improving security\n- Preventing attacks\n- Working with different teams\n- Thinking analytically\n\nThese are the core qualities of a **Blue Team Security Analyst**.\n\n## \uD83D\uDEE1\uFE0F Security Analyst\n**Mission:** Protect an organization's systems by continuously monitoring, detecting, investigating, and responding to cyber threats.\n\n**Core Responsibilities:** monitor security alerts \u00B7 analyze logs \u00B7 investigate incidents \u00B7 identify attack patterns \u00B7 improve security posture \u00B7 recommend improvements \u00B7 work with engineering/IT teams \u00B7 create security reports.\n\n### Daily Workflow\n```\nReceive Alert \u2192 Investigate Logs \u2192 Find Root Cause \u2192 Contain Attack \u2192 Recover Systems \u2192 Write Report\n```\n\n### Required Skills\n**Technical:** Networking \u00B7 Linux \u00B7 Windows \u00B7 TCP/IP \u00B7 DNS \u00B7 HTTP/HTTPS \u00B7 Firewalls \u00B7 SIEM \u00B7 IDS/IPS \u00B7 Incident Response \u00B7 Log Analysis\n\n**Soft Skills:** \u2714 Curiosity \u00B7 \u2714 Critical Thinking \u00B7 \u2714 Patience \u00B7 \u2714 Communication \u00B7 \u2714 Documentation \u00B7 \u2714 Teamwork\n\n### Common Tools\n| Category | Tools |\n|---|---|\n| SIEM | Splunk, Microsoft Sentinel, ELK Stack, IBM QRadar, Google Chronicle |\n| Network Monitoring | Wireshark, Zeek, tcpdump |\n| IDS / IPS | Snort, Suricata |\n| Endpoint Security | CrowdStrike, Microsoft Defender, SentinelOne |\n\n### Career Progression\n```\nSecurity Analyst \u2192 SOC Analyst \u2192 Incident Responder \u2192 Threat Hunter \u2192 Security Engineer \u2192 SOC Lead \u2192 Security Architect\n```\n\n### Suggested TryHackMe Learning Path\n```\nPre Security \u2192 SOC Level 1 \u2192 Jr Penetration Tester\n```\n\n## Skills Roadmap for a Security Analyst\n```\nComputer Basics \u2192 Networking \u2192 Linux \u2192 Windows \u2192 Web Fundamentals \u2192 Security Fundamentals \u2192 Logs \u2192 SIEM \u2192 Incident Response \u2192 Threat Hunting\n```\n\n## \uD83D\uDCCC Important Terms\n| Term | Meaning |\n|---|---|\n| Security Analyst | Monitors and investigates security events to protect systems |\n| SIEM | Security Information and Event Management \u2014 collects, correlates, and analyzes logs from multiple sources |\n| Alert | Notification generated when suspicious activity is detected |\n| Incident | A confirmed security event affecting confidentiality, integrity, or availability |\n| Log Analysis | Reviewing system, application, and network logs to identify malicious activity |\n| Threat Hunting | Proactively searching for hidden threats that bypassed traditional controls |\n\n## Security Analyst vs Penetration Tester\n| Security Analyst | Penetration Tester |\n|---|---|\n| Blue Team | Red Team |\n| Defends systems | Tests systems by attacking ethically |\n| Uses SIEM and logs | Uses tools like Nmap and Burp Suite |\n\n## \uD83D\uDCDD 30-Second Revision\n- \u2705 Quiz Result: **Security Analyst**\n- \u2705 Primary goal: Detect, investigate, and respond to cyber threats.\n- \u2705 Core skills: Networking, Linux, SIEM, log analysis, incident response.\n- \u2705 Common tools: Splunk, Microsoft Sentinel, Wireshark, Suricata.\n- \u2705 Career path: **Security Analyst \u2192 SOC Analyst \u2192 Incident Responder \u2192 Threat Hunter \u2192 Security Engineer / SOC Lead**.\n- \u2705 Learning path: **Pre Security \u2192 SOC Level 1 \u2192 Jr Penetration Tester**.\n\n> **Core Lesson:** A **Security Analyst** is the first line of defense in cybersecurity. Success comes from combining **technical knowledge, analytical thinking, continuous learning, and effective communication** to identify and stop threats before they cause damage.",
                realWorldCallout: {
                    title: 'The Tab Key Savior',
                    concept: 'Terminal Efficiency & Accuracy',
                    scenario: 'A junior pentester is attempting to run a script with a very long filename: "exploit_cve_2026_99812_auth_bypass_v3.py". Instead of typing all 45 characters and risking a typo, they type "python3 ex" and press "Tab". The terminal instantly completes the filename, allowing them to launch it instantly.',
                    relevance: 'Shows that simple terminal efficiency prevents typos, which is crucial during fast-paced examinations or threat remediation sessions.'
                },
                mindmap: [
                    { id: 'shortcuts', label: 'Terminal Skills', description: 'Essential command line hacks', x: 50, y: 15, connections: ['completion', 'kill-proc', 'clear-scr'] },
                    { id: 'completion', label: 'Tab Key', description: 'Instant auto-complete for paths & commands', x: 20, y: 50 },
                    { id: 'kill-proc', label: 'Ctrl + C', description: 'Hard stop running processes instantly', x: 50, y: 55 },
                    { id: 'clear-scr', label: 'Ctrl + L', description: 'Quickly clear terminal screen clutter', x: 80, y: 50 }
                ],
                keyTakeaways: [
                    'Using "Tab" auto-complete will save you hundreds of hours in the CLI.',
                    'Ctrl+C is your emergency brake in command environments.',
                    'Continuous documentation is the only way to manage cybersecurity knowledge explosion.',
                    'Linux mastery is mandatory for serious offensive and defensive analysts.'
                ],
                quiz: [
                    {
                        id: 'q-mys-1',
                        question: 'Which terminal key combination immediately terminates a running script or process?',
                        type: 'text',
                        correctAnswer: 'Ctrl + C',
                        hint: 'Control key plus the letter C.'
                    },
                    {
                        id: 'q-mys-2',
                        question: 'What type of security challenge format does "CTF" stand for?',
                        type: 'text',
                        correctAnswer: 'Capture The Flag',
                        hint: 'You find a hidden "flag" text block to score points.'
                    }
                ]
            }
        ]
    },
    {
        id: 'network-fundamentals',
        title: 'Network Fundamentals',
        description: 'Master how computers talk to each other. Explore IP addresses, MAC addresses, LAN hubs/switches, and the 7-layer OSI model.',
        topics: [
            {
                id: 'what-is-networking',
                moduleId: 'network-fundamentals',
                title: 'What is Networking?',
                description: 'Understand the basic components of a network, client-server models, IP/MAC identification, and latency tests.',
                status: 'unlocked',
                iconType: 'network',
                content: "### Room 1 \u2014 What is Networking?\n\n| | |\n|---|---|\n| **Module** | Network Fundamentals |\n| **Room** | What is Networking? |\n| **Difficulty** | Easy |\n| **Status** | \u2705 Completed |\n\n#### Learning Objectives\nAfter completing this room you should understand:\n- What a network is\n- What the Internet is\n- Public vs Private Networks\n- IP Addresses\n- MAC Addresses\n- IPv4 vs IPv6\n- ICMP & Ping\n- Device Identification\n\n#### What is a Network?\nA **network** is simply two or more devices connected together so they can communicate and share resources.\n\n**Examples outside computing:** Friendship circles \u00B7 Electricity Grid \u00B7 Road Transportation \u00B7 Postal Service \u00B7 Mobile Networks\n\n**In computing, devices can include:** Laptop \u00B7 Desktop \u00B7 Smartphone \u00B7 Server \u00B7 Printer \u00B7 CCTV Camera \u00B7 Router \u00B7 IoT Devices\n\n```text\n      Alice\n     /     \\\n   Bob ---- Jim\n\nAll devices are connected = One Network\n```\n\n#### What is the Internet?\nThe **Internet** is the world's largest network \u2014 made up of millions of smaller networks connected together.\n\n```text\nHome Network\n       \\\nOffice Network ---- Internet ---- University Network\n       /\nSchool Network\n```\n\n##### History\n- **ARPANET** \u2014 Created in the late 1960s, funded by the U.S. Department of Defense; the first large computer network.\n- **World Wide Web (WWW)** \u2014 Invented by **Tim Berners-Lee**; made information sharing much easier.\n\n#### Types of Networks\n**Private Network** \u2014 Used inside a home, office, school, or company.\n```text\nLaptop\n  |\nRouter\n  |\nPhone\n```\n\n**Public Network** \u2014 Accessible through the Internet.\n```text\nHome Router\n    |\nInternet\n    |\nGoogle \u00B7 YouTube \u00B7 GitHub\n```\n\n#### Device Identification\nEvery device needs an identity. Like humans have a name and fingerprint, computers have:\n- IP Address\n- MAC Address\n\n#### IP Address (IP = Internet Protocol)\nUsed to identify a device on a network.\n```text\n192 . 168 . 1 . 1\n |      |     |   |\nOctet Octet Octet Octet\n```\n- Split into four parts called **Octets**.\n- Each octet ranges from **0 \u2013 255**.\n\n##### IPv4\n- Example: `192.168.1.15`\n- 32-bit \u00B7 4 Octets \u00B7 ~4.3 Billion Addresses\n\n##### IPv6\n- Example: `2a00:22c4:a531:c500:425f:cce6:c36b:f64d`\n- 128-bit \u00B7 Massive Address Space \u00B7 Designed to replace IPv4\n- **Advantages:** More addresses \u00B7 Better efficiency \u00B7 Future-proof\n\n#### Public vs Private IP\n**Private IP** \u2014 Used inside a local network; cannot be accessed directly from the Internet.\n```text\n192.168.x.x\n10.x.x.x\n172.16.x.x \u2013 172.31.x.x\n```\n\n**Public IP** \u2014 Given by your ISP; used to communicate on the Internet. Example: `86.157.52.21`\n\n#### MAC Address (MAC = Media Access Control)\nA unique hardware address assigned to a network interface.\n```text\nVendor ID | Device ID\na4:c3:f0  | 85:ac:2d\n```\nExample: `a4:c3:f0:85:ac:2d`\n\n**MAC Spoofing** \u2014 A MAC address can be changed temporarily. Uses: testing \u00B7 penetration testing \u00B7 bypassing weak MAC filtering.\n\n#### Protocols\nProtocols are rules that allow devices from different manufacturers to communicate. Examples: **TCP, UDP, HTTP, HTTPS, ICMP, DNS**. Without protocols, devices would not understand each other.\n\n#### Ping\nPing checks whether another device is reachable. It uses **ICMP (Internet Control Message Protocol)**.\n```bash\nping 10.10.10.10\nping google.com\n```\nPing provides: Connectivity \u00B7 Packet Loss \u00B7 Latency (Response Time).\n```text\nReply from 10.10.10.10 time=2 ms\n```\nLower response time = faster connection.\n\n#### \u26A1 Quick Revision\n| Topic | Remember |\n|---|---|\n| Network | Connected devices |\n| Internet | Network of Networks |\n| Private IP | Local communication |\n| Public IP | Internet communication |\n| IP Address | Logical Address |\n| MAC Address | Physical Address |\n| IPv4 | 32-bit |\n| IPv6 | 128-bit |\n| Ping | Connectivity Test |\n| ICMP | Ping Protocol |\n\n##### Key acronyms\n| Acronym | Meaning |\n|---|---|\n| IP | Internet Protocol |\n| MAC | Media Access Control |\n| ICMP | Internet Control Message Protocol |\n\n#### \uD83E\uDDE0 Memory Trick\n```text\nNetwork\n\u2502\n\u251C\u2500\u2500 Internet\n\u251C\u2500\u2500 Device Identification\n\u2502   \u251C\u2500\u2500 IP Address\n\u2502   \u2514\u2500\u2500 MAC Address\n\u251C\u2500\u2500 IP Types\n\u2502   \u251C\u2500\u2500 Private\n\u2502   \u2514\u2500\u2500 Public\n\u251C\u2500\u2500 Versions\n\u2502   \u251C\u2500\u2500 IPv4\n\u2502   \u2514\u2500\u2500 IPv6\n\u2514\u2500\u2500 Connectivity\n    \u2514\u2500\u2500 Ping (ICMP)\n```\n\n#### \u2B50 Interview Questions\n- **What is a Network?** Two or more connected devices that communicate and share resources.\n- **What is the Internet?** A global collection of interconnected networks.\n- **Public vs Private IP?**\n  | Private IP | Public IP |\n  |---|---|\n  | Local Network | Internet |\n  | Not Routable | Routable |\n  | Free | Provided by ISP |\n- **IP vs MAC Address?**\n  | IP Address | MAC Address |\n  |---|---|\n  | Logical Address | Physical Address |\n  | Can Change | Usually Permanent |\n  | Used for Routing | Used on Local Network |\n- **Why is IPv6 needed?** IPv4 addresses are limited; IPv6 provides a vastly larger address space and improved networking features.\n\n#### \u2705 Key Takeaways\n- A network is a collection of connected devices.\n- The Internet is a network of networks.\n- Devices are identified using IP and MAC addresses.\n- Private IPs are used within local networks; Public IPs communicate over the Internet.\n- IPv6 addresses the limitations of IPv4.\n- Protocols standardize communication between devices.\n- Ping uses ICMP to test connectivity and measure response time.\n",
                realWorldCallout: {
                    title: 'The Echo Request',
                    concept: 'ICMP Diagnostic Flow',
                    scenario: "A network technician cannot access a remote file share. They run 'ping 10.10.10.10'. The ping returns successful replies with a 4ms latency, proving that the physical connection and IP routing are functional, meaning the issue lies at a higher layer like authentication or file sharing permissions.",
                    relevance: 'Demonstrates that ping is the absolute first diagnostic tool used to isolate physical and logical routing issues.'
                },
                mindmap: [
                    { id: 'what-is-networking-root', label: 'What is Networking?', description: 'Two or more devices connected to communicate', x: 50, y: 15, connections: ['device-id', 'ip-versions', 'protocols', 'ping-icmp'] },
                    { id: 'device-id', label: 'Device ID', description: 'Identification using IP and MAC addresses', x: 20, y: 50, connections: ['ip-address', 'mac-address'] },
                    { id: 'ip-address', label: 'IP Address', description: 'Logical identity: Public vs Private IP', x: 10, y: 80 },
                    { id: 'mac-address', label: 'MAC Address', description: 'Physical hardware address (e.g., a4:c3:f0:85:ac:2d)', x: 30, y: 80 },
                    { id: 'ip-versions', label: 'IP Versions', description: 'IPv4 (32-bit, ~4.3B) vs IPv6 (128-bit)', x: 45, y: 50 },
                    { id: 'protocols', label: 'Protocols', description: 'Standard rules allowing communication (TCP, UDP, etc.)', x: 65, y: 50 },
                    { id: 'ping-icmp', label: 'Ping & ICMP', description: 'Checks reachability and measures latency', x: 85, y: 50 }
                ],
                keyTakeaways: [
                    'A network is a collection of connected devices sharing resources.',
                    'The Internet is a massive network of interconnected networks.',
                    'Devices are identified by both a logical IP address and a physical MAC address.',
                    'Private IPs are used inside local networks, while Public IPs are given by ISPs for Internet communication.',
                    'IPv6 solves the IPv4 address exhaustion crisis by using a 128-bit address space.',
                    'Ping uses ICMP to test connection reachability and measure round-trip latency.'
                ],
                quiz: [
                    {
                        id: 'q-net-1',
                        question: "What type of address is physical, permanent, and hardcoded onto a device's network card?",
                        type: 'text',
                        correctAnswer: 'MAC Address',
                        hint: 'Media Access Control.'
                    },
                    {
                        id: 'q-net-2',
                        question: 'Which protocol does the ping command use to test connectivity?',
                        type: 'text',
                        correctAnswer: 'ICMP',
                        hint: 'Internet Control Message Protocol.'
                    },
                    {
                        id: 'q-net-3',
                        question: 'How many bits are in an IPv4 address?',
                        type: 'text',
                        correctAnswer: '32',
                        hint: 'Made of 4 octets.'
                    }
                ]
            },
            {
                id: 'intro-to-lan',
                moduleId: 'network-fundamentals',
                title: 'Intro to LAN',
                description: 'Explore Local Area Networks, MAC address structures, Hubs vs Switches, and DHCP addressing.',
                status: 'unlocked',
                iconType: 'lan',
                content: "### Room 2 \u2014 Intro to LAN\n\n| | |\n|---|---|\n| **Module** | Network Fundamentals |\n| **Room** | Intro to LAN |\n| **Difficulty** | Easy |\n| **Status** | \u2705 Completed |\n\n#### Learning Objectives\nAfter completing this room you should understand:\n- What a LAN is\n- Devices used to build a LAN\n- Hubs vs Switches vs Routers\n- What Subnetting is\n- ARP (Address Resolution Protocol)\n- DHCP (Dynamic Host Configuration Protocol)\n\n#### What is a LAN? (LAN = Local Area Network)\nA **LAN** is a network of devices in a single physical location (like a home, school, or office).\n\n```text\n[ PC 1 ] \u2500\u2500\u2500\u2510\n            \u251C\u2500\u2500\u2500 [ Switch ] \u2500\u2500\u2500 [ Router ] \u2500\u2500\u2500 Internet\n[ PC 2 ] \u2500\u2500\u2500\u2518\n```\n\n#### LAN Hardware\n\n##### 1. Network Interface Card (NIC)\nEvery device needs a NIC to connect to a network. It can be:\n- Wired (Ethernet port)\n- Wireless (Wi-Fi chip)\n\n##### 2. Ethernet Cables\nUsed to connect devices physically.\n- **Speed:** Can range from 10 Mbps up to 100 Gbps+ (e.g., Cat5e, Cat6, Cat7).\n\n##### 3. Hubs\n- Legacy (old) device.\n- Unintelligent: When it receives data, it sends (broadcasts) it to **everyone** on the network.\n- High traffic and security risks.\n\n##### 4. Switches\n- Intelligent device.\n- Keeps a **MAC Address Table** showing which device is connected to which port.\n- When it receives data, it reads the destination MAC and sends it **only** to that specific device.\n\n##### 5. Routers\n- Used to connect different networks (e.g., connects your LAN to the public Internet).\n- Works with IP Addresses.\n\n#### How do devices get IP Addresses?\n\n##### DHCP (Dynamic Host Configuration Protocol)\nAutomatically assigns IP addresses to devices when they connect.\n\n```text\n[ Client ] \uD83D\uDE80 DISCOVER (Broadcast) \u2500\u2500> [ DHCP Server ]\n[ Client ] <\u2500\u2500 OFFER (Unicast) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 [ DHCP Server ]\n[ Client ] \uD83D\uDE80 REQUEST (Broadcast) \u2500\u2500\u2500> [ DHCP Server ]\n[ Client ] <\u2500\u2500 ACK (Unicast) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 [ DHCP Server ]\n```\n\n**Four steps (DORA):**\n1. **Discover** \u2014 Client asks: \"Is there a DHCP server?\"\n2. **Offer** \u2014 Server says: \"Here is an IP address you can use.\"\n3. **Request** \u2014 Client says: \"I would like to take that IP.\"\n4. **Acknowledge (ACK)** \u2014 Server says: \"All set, it is yours.\"\n\n#### How do devices find each other?\n\n##### ARP (Address Resolution Protocol)\nUsed to find a device's **MAC Address** when only its **IP Address** is known.\n\n```text\n[ Sender ] \u2500\u2500 Who has 192.168.1.5? Tell 192.168.1.2 \u2500\u2500> (Broadcast)\n[ Target ] <\u2500\u2500 I have 192.168.1.5, my MAC is aa:bb:cc... \u2500 (Unicast)\n```\n\n- **ARP Request** \u2014 Broadcasted to everyone: \"Who has IP 192.168.1.5?\"\n- **ARP Reply** \u2014 Unicast reply from the target: \"I have that IP, my MAC is aa:bb:cc:dd:ee:ff.\"\n\n#### Subnetting\nSubnetting splits a large network into smaller, manageable subnets to improve:\n- Security\n- Network Performance\n- Management\n\n##### Subnet Mask\nHelps determine which part of an IP address is the Network ID and which is the Host ID. Example: `255.255.255.0`.\n\n#### \u26A1 Quick Revision\n| Device/Protocol | Key Feature |\n|---|---|\n| LAN | Private local network |\n| Switch | Intelligent local sender (uses MAC) |\n| Hub | Unintelligent local sender (broadcasts) |\n| Router | Connects networks (uses IP) |\n| DHCP | Assigns IPs automatically (DORA) |\n| ARP | Translates IP to MAC address |\n| Subnetting | Splits large networks |\n\n##### DORA Steps\n| Step | Action |\n|---|---|\n| **D**iscover | Client searches |\n| **O**ffer | Server offers IP |\n| **R**equest | Client requests IP |\n| **A**cknowledge | Server confirms IP |\n\n#### \uD83E\uDDE0 Memory Trick\n```text\nLAN Components\n\u2502\n\u251C\u2500\u2500 Hardware\n\u2502   \u251C\u2500\u2500 NIC\n\u2502   \u251C\u2500\u2500 Hub (Broadcast)\n\u2502   \u251C\u2500\u2500 Switch (Unicast, MAC table)\n\u2502   \u2514\u2500\u2500 Router (IP routing)\n\u2502\n\u2514\u2500\u2500 Protocols\n    \u251C\u2500\u2500 DHCP (IP lease: DORA)\n    \u251C\u2500\u2500 ARP (IP -> MAC lookup)\n    \u2514\u2500\u2500 Subnetting (Network division)\n```\n\n#### \u2B50 Interview Questions\n- **Hub vs Switch?**\n  | Feature | Hub | Switch |\n  |---|---|\n  | Intelligence | None | High |\n  | Data Delivery | Broadcasts to all | Sends to destination only |\n  | Security | Low | High |\n- **What is the purpose of ARP?** Translates a known IP address to a physical MAC address so local communication can happen.\n- **Explain DHCP DORA.** It is the four-step process (Discover, Offer, Request, Acknowledge) used by DHCP to dynamically lease IP configurations to clients.\n- **Why do we subnet?** To reduce network congestion, improve security boundaries, and prevent broadcast storms.\n\n#### \u2705 Key Takeaways\n- A LAN connects devices within a limited physical area.\n- Switches forward local traffic intelligently using MAC addresses, while legacy Hubs broadcast everything.\n- Routers forward traffic between different networks using IP addresses.\n- DHCP dynamically assigns network settings using the DORA process.\n- ARP resolves IP addresses to physical MAC addresses.\n- Subnetting improves network security and efficiency by breaking networks into smaller segments.\n",
                realWorldCallout: {
                    title: 'The Silent Switch',
                    concept: 'MAC Address Table Building',
                    scenario: "When a new computer is plugged into a switch, the switch does not know its MAC address. The computer sends an ARP request, and as the packet passes through, the switch reads the source MAC and records it in its MAC table. From that point on, traffic for that computer is sent only to its specific port instead of being broadcast.",
                    relevance: 'Demonstrates how Layer 2 devices dynamically learn network topology to keep communication efficient.'
                },
                mindmap: [
                    { id: 'intro-to-lan-root', label: 'Intro to LAN', description: 'Local Area Networks of connected devices', x: 50, y: 15, connections: ['lan-hardware', 'dhcp-dora', 'arp-protocol'] },
                    { id: 'lan-hardware', label: 'Hardware', description: 'NICs, Cables, Hubs, Switches, Routers', x: 20, y: 50, connections: ['hubs-vs-switches', 'routers'] },
                    { id: 'hubs-vs-switches', label: 'Hubs vs Switches', description: 'Broadcast (Hub) vs MAC-addressed Unicast (Switch)', x: 10, y: 80 },
                    { id: 'routers', label: 'Routers', description: 'Connects different networks (Layer 3)', x: 30, y: 80 },
                    { id: 'dhcp-dora', label: 'DHCP DORA', description: 'Discover, Offer, Request, ACK', x: 50, y: 50 },
                    { id: 'arp-protocol', label: 'ARP', description: 'Resolves logical IP to physical MAC address', x: 80, y: 50 }
                ],
                keyTakeaways: [
                    'A LAN is a private network operating in a localized physical space.',
                    'Switches build MAC address tables to route frames efficiently to single ports, unlike Hubs which flood all ports.',
                    'DHCP uses the four-step DORA handshake to lease IP configurations automatically.',
                    'ARP bridges Layer 3 to Layer 2 by mapping a destination IP address to its physical hardware MAC address.',
                    'Subnetting segregates a large network into smaller broadcast domains for security and performance.'
                ],
                quiz: [
                    {
                        id: 'q-lan-1',
                        question: 'What is the intelligent network device that sends traffic to specific ports using a MAC address table?',
                        type: 'text',
                        correctAnswer: 'Switch',
                        hint: 'Replaced the legacy, unintelligent hub.'
                    },
                    {
                        id: 'q-lan-2',
                        question: 'What does the abbreviation ARP stand for?',
                        type: 'text',
                        correctAnswer: 'Address Resolution Protocol',
                        hint: 'Finds physical MAC addresses from logical IP addresses.'
                    },
                    {
                        id: 'q-lan-3',
                        question: 'What acronym represents the four stages of a DHCP lease?',
                        type: 'text',
                        correctAnswer: 'DORA',
                        hint: 'Discover, Offer, Request, Acknowledge.'
                    }
                ]
            },
            {
                id: 'osi-model',
                moduleId: 'network-fundamentals',
                title: 'OSI Model',
                description: 'Understand the 7 layers of the OSI Model, data encapsulation flows, and real-world blue/red team troubleshooting applications.',
                status: 'unlocked',
                iconType: 'osi',
                content: "### Room 3 \u2014 OSI Model\n\n| | |\n|---|---|\n| **Module** | Network Fundamentals |\n| **Room** | OSI Model |\n| **Difficulty** | Easy |\n| **Status** | \u2705 Completed |\n\n#### Learning Objectives\nAfter completing this room you should understand:\n- What the OSI Model is\n- The 7 layers of the OSI Model\n- What happens at each layer\n- Data encapsulation process\n- Real-world application of the OSI Model in troubleshooting and security\n\n#### What is the OSI Model? (OSI = Open Systems Interconnection)\nThe **OSI Model** is a 7-layer theoretical framework that standardizes how computers send data to each other.\n\nIt was created to allow devices from different vendors to work together.\n\n#### Why is the OSI Model important?\n- Helps with **Troubleshooting** \u2014 By identifying which layer a problem is on, you can solve it much faster.\n- Helps with **Security** \u2014 Different security controls (firewalls, encryption, authentication) work at different layers.\n- Standardizes network communication.\n\n#### The 7 Layers\n```text\n[ Layer 7 ]  Application    <\u2500\u2500 Web browsers, HTTP, DNS\n[ Layer 6 ]  Presentation   <\u2500\u2500 Encryption, TLS, Compression\n[ Layer 5 ]  Session        <\u2500\u2500 Communication sessions\n[ Layer 4 ]  Transport      <\u2500\u2500 TCP, UDP, Ports\n[ Layer 3 ]  Network        <\u2500\u2500 IP Addresses, Routing\n[ Layer 2 ]  Data Link      <\u2500\u2500 MAC Addresses, Switches\n[ Layer 1 ]  Physical       <\u2500\u2500 Cables, Bits, Hubs\n```\n\n---\n\n#### Layer 7 \u2014 Application Layer\nProvides network services directly to user applications (web browsers, email clients).\n- **Protocols:** HTTP, HTTPS, FTP, SMTP, DNS, SSH, Telnet.\n- **Example:** Chrome requesting a website using HTTPS.\n\n#### Layer 6 \u2014 Presentation Layer\nTranslates data into a standard format for the application layer. It handles **formatting, encryption, and compression**.\n- **Features:** Encryption/Decryption (TLS/SSL) \u00B7 Compression \u00B7 Data Translation (e.g., ASCII to UTF-8).\n- **Example:** Encrypting credit card details using TLS before sending them.\n\n#### Layer 5 \u2014 Session Layer\nEstablishes, manages, and terminates communication sessions between two devices.\n- **Features:** Authentication \u00B7 Session Setup \u00B7 Session teardown \u00B7 Keeping sessions separate.\n- **Example:** Logging into a website and keeping your connection alive.\n\n#### Layer 4 \u2014 Transport Layer\nHandles flow control, error checking, and data delivery.\n- **Protocols:** TCP, UDP.\n- **Data Unit:** **Segment** (TCP) or **Datagram** (UDP).\n- **Example:** Choosing TCP for reliable file transfers, or UDP for fast live-streaming video.\n\n#### Layer 3 \u2014 Network Layer\nHandles logical routing of data packets across different networks.\n- **Protocols:** IP (IPv4, IPv6), ICMP.\n- **Device:** Routers.\n- **Data Unit:** **Packet**.\n- **Example:** Finding the best route across the Internet using IP addresses.\n\n#### Layer 2 \u2014 Data Link Layer\nHandles physical device-to-device communication on the **same** local network.\n- **Devices:** Switches, Network cards (NIC).\n- **Protocols:** Ethernet, Wi-Fi.\n- **Data Unit:** **Frame**.\n- **Example:** Sending data from your laptop to your home router using MAC addresses.\n\n#### Layer 1 \u2014 Physical Layer\nTransmits raw binary data (1s and 0s) over physical media.\n- **Media:** Ethernet cables (copper), Fiber optic cables (light), Wi-Fi (radio waves).\n- **Devices:** Hubs, Repeaters, Cables.\n- **Data Unit:** **Bit**.\n- **Example:** Electrical signals passing through an Ethernet cable.\n\n---\n\n#### Data Encapsulation & Decapsulation\nAs data travels from the sender to the receiver, it undergoes:\n- **Encapsulation (Sender)** \u2014 Wrapping data with headers at each layer as it goes from Layer 7 to Layer 1.\n- **Decapsulation (Receiver)** \u2014 Stripping off the headers as the data moves from Layer 1 back to Layer 7.\n\n##### Encapsulation Flow\n```text\n[ L7: Data ] \u2500\u2500> [ L6: Data ] \u2500\u2500> [ L5: Data ]\n      \u2193\n[ L4: TCP Header + Data ]               (Segment)\n      \u2193\n[ L3: IP Header + TCP + Data ]          (Packet)\n      \u2193\n[ L2: MAC Header + IP + TCP + Data ]    (Frame)\n      \u2193\n[ L1: 10110011... ]                     (Bits)\n```\n\n#### \u26A1 Quick Revision\n| Layer | Name | Protocol/Device | Data Unit |\n|---|---|---|---|\n| **7** | Application | HTTP, HTTPS, DNS | Data |\n| **6** | Presentation | TLS/SSL, JPEG, ASCII | Data |\n| **5** | Session | NetBIOS, Session Setup | Data |\n| **4** | Transport | TCP, UDP | Segment/Datagram |\n| **3** | Network | IP, ICMP / Routers | Packet |\n| **2** | Data Link | Ethernet, Wi-Fi / Switches | Frame |\n| **1** | Physical | Cables, Hubs | Bits |\n\n##### Mnemonics\n- **Top-to-Bottom:** **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing\n- **Bottom-to-Top:** **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way\n\n#### \uD83E\uDDE0 Memory Trick\n```text\nOSI Model Layers\n\u2502\n\u251C\u2500\u2500 L7: Application  (User UI: HTTP, DNS)\n\u251C\u2500\u2500 L6: Presentation (Formatting & TLS)\n\u251C\u2500\u2500 L5: Session      (Session Sync)\n\u251C\u2500\u2500 L4: Transport    (Reliability: TCP/UDP)\n\u251C\u2500\u2500 L3: Network      (IP Routing: Packets)\n\u251C\u2500\u2500 L2: Data Link    (MAC Switching: Frames)\n\u2514\u2500\u2500 L1: Physical     (Cables & Bits: Volts)\n```\n\n#### \u2B50 Interview Questions\n- **What is the difference between Layer 2 and Layer 3?**\n  - **Layer 2 (Data Link)** uses physical **MAC addresses** and handles communication on the *same* network (using Switches).\n  - **Layer 3 (Network)** uses logical **IP addresses** and routes data *across different* networks (using Routers).\n- **At which layer does TLS/SSL encryption happen?** Layer 6 (Presentation Layer).\n- **What is Encapsulation?** The process of wrapping data with headers at each layer of the OSI model as it moves down from the Application layer to the Physical layer.\n- **Where do Switches and Routers operate?**\n  - **Switches** operate at Layer 2 (Data Link).\n  - **Routers** operate at Layer 3 (Network).\n\n#### \u2705 Key Takeaways\n- The OSI Model is a 7-layer framework standardizing network communications.\n- Layer 7 (Application) interfaces with users; Layer 1 (Physical) deals with raw hardware/bits.\n- Protocols are mapped to specific layers (e.g., HTTP at L7, TCP at L4, IP at L3).\n- Data is encapsulated into Segments (L4), Packets (L3), and Frames (L2).\n- Security controls exist across layers: Firewalls block ports (L4) or IPs (L3); TLS encrypts at L6.\n",
                realWorldCallout: {
                    title: 'The Multi-Layer Troubleshooter',
                    concept: 'Cross-Layer Network Diagnostics',
                    scenario: "An administrator notes a server is unreachable. They verify Layer 1 is fine (cable is plugged in and link lights are on), Layer 2 is working (the switch table lists the server's MAC), Layer 3 is up (the router can ping the server's IP), but the application is down because the HTTP daemon crashed at Layer 7.",
                    relevance: 'Demonstrates why network and security engineers systematically troubleshoot issues starting from the physical layer up.'
                },
                mindmap: [
                    { id: 'osi-model-root', label: '7-Layer OSI Model', description: 'Standard communication framework', x: 50, y: 15, connections: ['software-layers', 'transport-layer', 'routing-switching', 'hardware-layer'] },
                    { id: 'software-layers', label: 'L5 - L7 (Software)', description: 'Application (L7), Presentation (L6), Session (L5)', x: 15, y: 50 },
                    { id: 'transport-layer', label: 'L4 (Transport)', description: 'TCP vs UDP, flow control and segments', x: 40, y: 50 },
                    { id: 'routing-switching', label: 'L3 (Network)', description: 'IP addressing, packet routing, and routers', x: 65, y: 50 },
                    { id: 'hardware-layer', label: 'L1 - L2 (Physical & Link)', description: 'Data Link (L2 frames, MAC) and Physical (L1 bits, cables)', x: 88, y: 50 }
                ],
                keyTakeaways: [
                    'The OSI model has 7 structured layers, standardizing communication protocols across vendors.',
                    'Data moves DOWN the stack on sending systems (Encapsulation) and UP the stack on receiving systems (Decapsulation).',
                    'Each layer has its own unique Data Protocol Unit: Segment (L4), Packet (L3), Frame (L2), Bit (L1).',
                    'Troubleshooting starts from Physical (L1) and rises to Application (L7) to isolate failures logically.',
                    'Different network devices function at separate layers: Routers operate at L3, while Switches function at L2.'
                ],
                quiz: [
                    {
                        id: 'q-osi-1',
                        question: 'Which layer of the OSI model does encryption, compression, and TLS occur at?',
                        type: 'text',
                        correctAnswer: 'Presentation',
                        hint: 'Layer 6 of the OSI model.'
                    },
                    {
                        id: 'q-osi-2',
                        question: 'At which layer of the OSI model do Switches operate?',
                        type: 'text',
                        correctAnswer: 'Data Link',
                        hint: 'Layer 2 of the OSI model.'
                    },
                    {
                        id: 'q-osi-3',
                        question: 'What is the Protocol Data Unit (PDU) at Layer 3 (Network Layer) called?',
                        type: 'text',
                        correctAnswer: 'Packet',
                        hint: 'Wrapped around a segment.'
                    }
                ]
            },
            {
                id: 'packets-and-frames',
                moduleId: 'network-fundamentals',
                title: 'Packets & Frames',
                description: 'Differentiate TCP and UDP transport models, analyze the 3-way handshake, and master packet encapsulation structures.',
                status: 'unlocked',
                iconType: 'packet',
                content: "### Room 4 \u2014 Packets & Frames\n\n| | |\n|---|---|\n| **Module** | Network Fundamentals |\n| **Room** | Packets & Frames |\n| **Difficulty** | Easy |\n| **Status** | \u2705 Completed |\n\n#### Learning Objectives\nAfter completing this room you should understand:\n- The difference between packets and frames\n- What encapsulation is\n- TCP (Transmission Control Protocol)\n- UDP (User Datagram Protocol)\n- The TCP Three-Way Handshake\n\n#### Packets vs Frames\n\nData travels in different units depending on which OSI layer it is on.\n- **Packets** \u2014 Data unit at **Layer 3 (Network Layer)**. Contains logical IP addresses.\n- **Frames** \u2014 Data unit at **Layer 2 (Data Link Layer)**. Contains physical MAC addresses.\n\n```text\n[ Layer 3: Packet ]  <\u2500\u2500 Contains Source IP & Destination IP\n        \u2193  (Encapsulated into L2)\n[ Layer 2: Frame  ]  <\u2500\u2500 Contains Source MAC & Destination MAC + Packet Data\n```\n\n---\n\n#### Layer 4 Transport Protocols\nWhen sending data over a network, Layer 4 must choose between two main protocols: **TCP** and **UDP**.\n\n##### TCP (Transmission Control Protocol)\n- **Connection-oriented** \u2014 Before sending data, a connection MUST be established between the sender and receiver.\n- **Reliable** \u2014 Guarantees that all data is delivered safely and in the correct order. If a piece of data is lost, TCP will detect it and request retransmission.\n- **Features:** Slow but reliable \u00B7 Flow Control \u00B7 Error checking.\n- **Used for:** Web browsing (HTTP/HTTPS) \u00B7 Email (SMTP) \u00B7 File Transfer (FTP) \u00B7 Remote Terminal (SSH).\n\n##### UDP (User Datagram Protocol)\n- **Connectionless** \u2014 Does not establish a connection before sending data. It just sends the data and hopes it arrives (fire-and-forget).\n- **Unreliable** \u2014 Does not guarantee that data will arrive or that it will be in the correct order. No retransmission if data is lost.\n- **Features:** Fast \u00B7 Low overhead \u00B7 No error checking/retransmission.\n- **Used for:** Video streaming \u00B7 Online gaming \u00B7 Voice over IP (VoIP) \u00B7 DNS queries.\n\n---\n\n#### The TCP Three-Way Handshake\nTo establish a secure connection, TCP uses a three-step handshake:\n\n```text\n[ Client ] \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 SYN \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500> [ Server ]\n[ Client ] <\u2500\u2500\u2500\u2500\u2500\u2500\u2500 SYN-ACK \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 [ Server ]\n[ Client ] \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 ACK \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500> [ Server ]\n```\n\n1. **SYN (Synchronize)** \u2014 The client sends a packet with a synchronize flag to initiate the connection. \"Hello, I want to talk.\"\n2. **SYN-ACK (Synchronize-Acknowledge)** \u2014 The server replies with a synchronize and acknowledge flag. \"I hear you, I am ready to talk.\"\n3. **ACK (Acknowledge)** \u2014 The client sends an acknowledge packet. \"Great, let's start sending data.\"\n\nOnce these three steps are complete, the connection is open, and data can be transmitted.\n\n#### \u26A1 Quick Revision\n| Feature | TCP | UDP |\n|---|---|---|\n| **Connection** | Connection-oriented | Connectionless |\n| **Reliability** | Reliable | Unreliable |\n| **Speed** | Slower | Faster |\n| **Flow Control** | Yes | No |\n| **Data Unit** | Segment | Datagram |\n| **Common Uses** | Web, Email, SSH | Video, Gaming, DNS |\n\n##### Handshake Steps\n| Step | Sender | Packet Flag | Meaning |\n|---|---|---|---|\n| **1** | Client | **SYN** | Requesting connection |\n| **2** | Server | **SYN-ACK** | Ready, acknowledging request |\n| **3** | Client | **ACK** | Final handshake confirmation |\n\n#### \uD83E\uDDE0 Memory Trick\n```text\nTransport Protocols\n\u2502\n\u251C\u2500\u2500 TCP (Reliable Post Office)\n\u2502   \u251C\u2500\u2500 Connection-oriented\n\u2502   \u251C\u2500\u2500 Three-Way Handshake (SYN -> SYN-ACK -> ACK)\n\u2502   \u2514\u2500\u2500 Re-sends lost packages\n\u2502\n\u2514\u2500\u2500 UDP (Megaphone/Broadcast)\n    \u251C\u2500\u2500 Connectionless\n    \u251C\u2500\u2500 Fire-and-forget (instant delivery)\n    \u2514\u2500\u2500 Ignores lost packages\n```\n\n#### \u2B50 Interview Questions\n- **TCP vs UDP?**\n  | Feature | TCP | UDP |\n  |---|---|---|\n  | Connection | Yes | No |\n  | Reliability | Yes | No |\n  | Speed | Slower | Faster |\n- **What is the TCP 3-Way Handshake?** The process used to establish a reliable TCP session using three packets: **SYN**, **SYN-ACK**, and **ACK**.\n- **When would you use UDP over TCP?** For real-time applications like online gaming, video streaming, or VoIP, where speed is more important than perfect data accuracy.\n- **What is Encapsulation in networking?** The process of wrapping higher-layer data with headers (IP at L3, MAC at L2) as it travels down the OSI stack for transmission.\n\n#### \u2705 Key Takeaways\n- Packets belong to Layer 3 and use IP addresses; Frames belong to Layer 2 and use MAC addresses.\n- Encapsulation builds the transmission unit step-by-step down the OSI stack.\n- TCP is connection-oriented, performing a 3-way handshake to guarantee reliable delivery.\n- UDP is connectionless and fast, prioritizing transmission speed over verification.\n- The 3-way handshake consists of SYN, SYN-ACK, and ACK packets.\n",
                realWorldCallout: {
                    title: 'The Unanswered Call',
                    concept: 'SYN Flooding DDoS Defense',
                    scenario: "An attacker targets a server by sending thousands of SYN packets with spoofed IP addresses. The server allocates memory for each connection and responds with a SYN-ACK, but the spoofed IPs never send the final ACK. The server's connection slots fill up, crashing the service for legitimate users.",
                    relevance: 'Illustrates how the structural handshake requirements of TCP can be exploited to launch Denial of Service attacks.'
                },
                mindmap: [
                    { id: 'packets-and-frames-root', label: 'Packets & Frames', description: 'Data structures and transport mechanics', x: 50, y: 15, connections: ['pdus', 'transport-layer-protocols', 'handshake-mechanic'] },
                    { id: 'pdus', label: 'PDUs', description: 'L3 Packets (IPs) vs L2 Frames (MACs)', x: 20, y: 50 },
                    { id: 'transport-layer-protocols', label: 'L4 Protocols', description: 'TCP (Reliable, structured) vs UDP (Fast, stateless)', x: 50, y: 50 },
                    { id: 'handshake-mechanic', label: '3-Way Handshake', description: 'SYN -> SYN-ACK -> ACK connection sequence', x: 80, y: 50 }
                ],
                keyTakeaways: [
                    'Packets are Layer 3 structures containing IP addresses; Frames are Layer 2 structures containing MAC addresses.',
                    'Encapsulation nests upper-layer headers inside lower-layer frames before transmission.',
                    'TCP guarantees delivery using sliding windows, acknowledgements, and flow control.',
                    'UDP transmits datagrams directly without session establishment, minimizing transmission overhead.',
                    'The TCP three-way handshake coordinates sequence numbers before data exchange begins.'
                ],
                quiz: [
                    {
                        id: 'q-pack-1',
                        question: 'What is the Layer 4 protocol that guarantees reliable, connection-oriented data delivery?',
                        type: 'text',
                        correctAnswer: 'TCP',
                        hint: 'Transmission Control Protocol.'
                    },
                    {
                        id: 'q-pack-2',
                        question: 'Which TCP flag initiates the Three-Way Handshake process?',
                        type: 'text',
                        correctAnswer: 'SYN',
                        hint: 'Short for Synchronize.'
                    },
                    {
                        id: 'q-pack-3',
                        question: 'What is the Layer 2 data unit containing MAC address headers called?',
                        type: 'text',
                        correctAnswer: 'Frame',
                        hint: 'Contains packet data.'
                    }
                ]
            },
            {
                id: 'extending-your-network',
                moduleId: 'network-fundamentals',
                title: 'Extending Your Network',
                description: 'Explore WAN concepts, DNS record lookups, RFC 1918 Private vs Public boundaries, and NAT translation mechanisms.',
                status: 'unlocked',
                iconType: 'lan',
                content: "### Room 5 \u2014 Extending Your Network\n\n| | |\n|---|---|\n| **Module** | Network Fundamentals |\n| **Room** | Extending Your Network |\n| **Difficulty** | Easy |\n| **Status** | \u2705 Completed |\n\n#### Learning Objectives\nAfter completing this room you should understand:\n- What a WAN is\n- Public vs Private IP addresses\n- How NAT (Network Address Translation) works\n- How DNS (Domain Name System) works\n- DNS record types\n\n#### What is a WAN? (WAN = Wide Area Network)\nA **WAN** is a network that connects devices across a large physical distance (e.g., across cities, countries, or continents). The **Internet** is the most famous example of a WAN.\n\n```text\n[ LAN 1: London ] \u2500\u2500\u2500\u2500\u2500\u2500 ( WAN / Internet ) \u2500\u2500\u2500\u2500\u2500\u2500 [ LAN 2: New York ]\n```\n\n---\n\n#### Public vs Private IP Addresses\nTo prevent running out of IPv4 addresses, the IP space was divided into:\n- **Private IP Addresses** \u2014 Used inside local networks (LANs). They are free to use but **cannot** communicate directly on the Internet.\n- **Public IP Addresses** \u2014 Globally unique and routable on the public Internet. Your ISP (Internet Service Provider) leases a public IP to your router.\n\n##### Private IP Ranges (RFC 1918)\n- `10.0.0.0 \u2013 10.255.255.255` (Large Networks)\n- `172.16.0.0 \u2013 172.31.255.255` (Medium Networks)\n- `192.168.0.0 \u2013 192.168.255.255` (Small/Home Networks)\n\n---\n\n#### NAT (Network Address Translation)\nSince private IPs cannot travel on the public Internet, your home router uses **NAT** to translate your private IP into a single public IP.\n\n```text\n[ Client (192.168.1.5) ] \u2500\u2500\u2500 Private Packet \u2500\u2500\u2500> [ Router (NAT) ]\n                                                        \u2502 (Translates IP)\n[ Google (8.8.8.8)     ] <\u2500\u2500\u2500 Public Packet  \u2500\u2500\u2500 [ Router (82.15.3.1)  ]\n```\n\n1. **Request** \u2014 Your laptop (`192.168.1.5`) requests a website.\n2. **Translation** \u2014 Your router intercepts the packet, replaces the private source IP with its external public IP (`82.15.3.1`), and records the transaction in a NAT translation table.\n3. **Response** \u2014 The web server replies to the router's public IP.\n4. **Delivery** \u2014 The router reads its NAT table and forwards the reply back to your laptop.\n\nThis allows hundreds of devices on a LAN to share a single public IP.\n\n---\n\n#### DNS (Domain Name System)\nDNS is the \"phonebook\" of the Internet. It translates human-readable domain names (e.g., `google.com`) into computer-readable IP addresses (e.g., `142.250.190.46`).\n\n##### Domain Name Hierarchy\n- **Root Domain** \u2014 Represented by a dot (`.`).\n- **Top-Level Domain (TLD)** \u2014 The extension, e.g., `.com`, `.org`, `.net`, `.edu`, `.gov`.\n- **Second-Level Domain** \u2014 The unique name, e.g., `tryhackme`.com, `google`.com.\n- **Subdomain** \u2014 E.g., `store`.tryhackme.com, `blog`.google.com.\n\n```text\n             [ . (Root) ]\n                  |\n             [ .com (TLD) ]\n                  |\n         [ tryhackme.com (2nd Level) ]\n                  |\n     [ store.tryhackme.com (Subdomain) ]\n```\n\n##### Common DNS Record Types\n- **A Record** \u2014 Translates a domain to an **IPv4** address.\n- **AAAA Record** \u2014 Translates a domain to an **IPv6** address.\n- **CNAME (Canonical Name)** \u2014 Points a domain to another domain (an alias).\n- **MX Record** \u2014 Specifies the mail servers responsible for receiving email for the domain.\n- **TXT Record** \u2014 Stores text-based information (commonly used for domain verification, SPF email security).\n\n#### \u26A1 Quick Revision\n| Concept/Record | Key Feature |\n|---|---|\n| Private IP | Local LAN use only (non-routable) |\n| Public IP | Internet routable (provided by ISP) |\n| NAT | Translates Private IP <\u2500\u2500> Public IP |\n| DNS | Translates Domains <\u2500\u2500> IP Addresses |\n| A Record | Domain to IPv4 |\n| AAAA Record | Domain to IPv6 |\n| CNAME Record | Alias (Domain to Domain) |\n| MX Record | Mail server director |\n| TXT Record | Text storage (verification/SPF) |\n\n##### Private Ranges\n| Range | Use Case |\n|---|---|\n| **10.x.x.x** | Large enterprises |\n| **172.16.x.x \u2013 172.31.x.x** | Medium-scale networks |\n| **192.168.x.x** | Home and small office networks |\n\n#### \uD83E\uDDE0 Memory Trick\n```text\nNetwork Extension\n\u2502\n\u251C\u2500\u2500 WAN (Internet Connecting LANs)\n\u2502\n\u251C\u2500\u2500 NAT (The Single Gatekeeper)\n\u2502   \u251C\u2500\u2500 Keeps Private IPs safe inside LAN\n\u2502   \u2514\u2500\u2500 Represents everyone with ONE Public IP\n\u2502\n\u2514\u2500\u2500 DNS (The Internet Phonebook)\n    \u251C\u2500\u2500 Domain Hierarchy: Root -> TLD -> Domain -> Subdomain\n    \u2514\u2500\u2500 Records: A (IPv4), AAAA (IPv6), CNAME (Alias), MX (Email)\n```\n\n#### \u2B50 Interview Questions\n- **Private vs Public IP?**\n  - **Private IP:** Used locally inside LAN, non-routable over the Internet, free.\n  - **Public IP:** Assigned to router by ISP, globally unique, routable over the public Internet.\n- **How does NAT help conserve IPv4 addresses?** It allows hundreds of local private devices to communicate on the public internet using only a single shared public IP address.\n- **What is the purpose of a DNS MX record?** Directs incoming email messages to the specific mail server responsible for hosting that domain's email.\n- **What is the difference between an A record and a CNAME record?**\n  - An **A Record** maps a domain directly to an IP address (e.g., `example.com` -> `192.0.2.1`).\n  - A **CNAME Record** maps an alias domain to another canonical domain (e.g., `www.example.com` -> `example.com`).\n\n#### \u2705 Key Takeaways\n- WANs span wide geographical distances, with the Internet being the premier example.\n- Private IP addresses are non-routable and divided into 10.x.x.x, 172.16.x.x, and 192.168.x.x ranges.\n- NAT allows private LAN devices to access the public Internet by translating private source IPs to the router's public external IP.\n- DNS is the Internet's domain translation directory, structured in a hierarchical namespace.\n- Core DNS record types include A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), and TXT (metadata).\n",
                realWorldCallout: {
                    title: 'The Invisible Shield',
                    concept: 'NAT Security Boundary',
                    scenario: "An administrator notes that external scanners on the public Internet can ping their router's public IP, but are physically unable to probe the developer laptops on the local network. This is because NAT acts as a one-way stateful firewall; unless a local device initiates the outbound connection, the router has no translation mapping and drops any incoming traffic targeting private IP addresses.",
                    relevance: 'Demonstrates how NAT provides an inherent security layer, preventing direct, unsolicited external connections to internal hosts.'
                },
                mindmap: [
                    { id: 'extending-your-network-root', label: 'Extending Your Network', description: 'Expanding local boundaries to the WAN', x: 50, y: 15, connections: ['wan-boundary', 'nat-gateway', 'dns-namespace'] },
                    { id: 'wan-boundary', label: 'WAN & IP Ranges', description: 'Wide Area Networks & RFC 1918 boundaries', x: 20, y: 50 },
                    { id: 'nat-gateway', label: 'NAT Translation', description: 'Translating private LAN IPs to routable WAN IPs', x: 50, y: 50 },
                    { id: 'dns-namespace', label: 'DNS Service', description: 'Domain namespace hierarchy and query records', x: 80, y: 50, connections: ['dns-records'] },
                    { id: 'dns-records', label: 'DNS Records', description: 'A, AAAA, CNAME, MX, and TXT record types', x: 80, y: 80 }
                ],
                keyTakeaways: [
                    'WANs link separate networks together across global physical scales.',
                    'RFC 1918 mandates private non-routable IP blocks (10.x.x.x, 172.16.x.x, and 192.168.x.x) to conserve IPv4 space.',
                    'NAT translates private source IP headers to public IP headers, tracking state in a local address table.',
                    'DNS acts as a decentralized directory resolving user domains to structural IP addresses.',
                    'Common DNS record definitions include A (IPv4), AAAA (IPv6), CNAME (Alias), and MX (Mail servers).'
                ],
                quiz: [
                    {
                        id: 'q-ext-1',
                        question: 'What is the acronym for the service that translates domain names to computer-readable IP addresses?',
                        type: 'text',
                        correctAnswer: 'DNS',
                        hint: 'Domain Name System.'
                    },
                    {
                        id: 'q-ext-2',
                        question: 'Which DNS record type translates a domain name to an IPv4 address?',
                        type: 'text',
                        correctAnswer: 'A',
                        hint: 'Single letter of the alphabet.'
                    },
                    {
                        id: 'q-ext-3',
                        question: 'Which technology translates local private IP addresses to a public external IP address at the router boundary?',
                        type: 'text',
                        correctAnswer: 'NAT',
                        hint: 'Network Address Translation.'
                    }
                ]
            },
            {
                id: 'mystery-chest-net',
                moduleId: 'network-fundamentals',
                title: 'Mystery Chest',
                description: 'Review core concepts, diagnostic commands, common port mappings, and test your knowledge in the Module 2 Summary.',
                status: 'locked',
                iconType: 'chest',
                content: "### \uD83C\uDFC1 Module Summary \u2014 Network Fundamentals\n\n| | |\n|---|---|\n| **Module** | Network Fundamentals |\n| **Room** | Module Summary |\n| **Difficulty** | Easy |\n| **Status** | \u2705 Completed |\n\n#### Module Overview\nCongratulations! You have successfully walked through the entire **Network Fundamentals** module. Here is a comprehensive digest of everything you have learned to consolidate your security analyst skillset.\n\n---\n\n### \uD83D\uDDFA\uFE0F Network Map Recap\nHere is how all the foundational rooms connect into a single unified flow:\n\n```text\n[ Room 1: What is Networking? ]  <\u2500\u2500 Basics: Local vs. Wide area networks\n               \u2502\n[ Room 2: Intro to LAN ]         <\u2500\u2500 MAC, IP addresses, Switches, Routers\n               \u2502\n[ Room 3: OSI Model ]            <\u2500\u2500 7 theoretical layers of data flow\n               \u2502\n[ Room 4: Packets & Frames ]     <\u2500\u2500 TCP vs. UDP transport & the 3-Way Handshake\n               \u2502\n[ Room 5: Extending Your LAN ]   <\u2500\u2500 Public vs. Private IPs, NAT, and DNS records\n```\n\n---\n\n### \uD83D\uDCBB Security Analyst Network Diagnostics Toolkit\nAs a Security Analyst or Blue Team Defender, you will frequently use these commands to analyze networks and troubleshoot connectivity issues:\n\n| Command | Purpose | Key Example / Security Use Case |\n|---|---|---|\n| **ping** | Checks basic network connectivity to a host | `ping 8.8.8.8` (Verify internet access) |\n| **traceroute** / **tracert** | Maps the path packets take across routers | `traceroute google.com` (Find network bottleneck/malicious hop) |\n| **ifconfig** / **ipconfig** | Displays network card configurations | `ipconfig /all` (Retrieve MAC and internal IPv4 gateway) |\n| **nslookup** / **dig** | Queries DNS records for a domain | `nslookup tryhackme.com` (Investigate potential DNS hijacking/spoofing) |\n\n---\n\n### \uD83D\uDD0C Standard Ports & Security Mappings\nKeep these common ports and protocols at your fingertips during SOC analyses:\n\n| Port | Protocol | Usage | Security Profile |\n|---|---|---|---|\n| **21** | FTP | File Transfer Protocol | \u274C Cleartext (Unsecure) |\n| **22** | SSH | Secure Shell | Secure remote terminal access |\n| **23** | Telnet | Terminal Network | \u274C Cleartext (Unsecure) |\n| **25** | SMTP | Simple Mail Transfer Protocol | Email transmission |\n| **53** | DNS | Domain Name System | Domain resolution |\n| **80** | HTTP | HyperText Transfer Protocol | \u274C Cleartext Web Traffic |\n| **443** | HTTPS | HTTP Secure (uses TLS) | Encrypted Web Traffic |\n\n---\n\n#### \uD83E\uDDE0 Memory Trick \u2014 The 3 D's of Networks\n```text\nNetwork Diagnostics & Security\n\u2502\n\u251C\u2500\u2500 DHCP \u2500\u2500> Dynamic Host Configuration Protocol (Assigns IP, Gateway, DNS automatically)\n\u251C\u2500\u2500 DNS  \u2500\u2500> Domain Name System (Resolves names to IPs)\n\u2514\u2500\u2500 NAT  \u2500\u2500> Network Address Translation (Shields LAN with a single public WAN IP)\n```\n\n#### \u2B50 Interview Practice\n- **What happens when you type a URL into a web browser?**\n  1. **DNS Lookup:** Browser checks cache, then queries a DNS server to resolve domain (e.g. `google.com`) to an IP address.\n  2. **TCP Connection:** Browser initiates a TCP 3-Way Handshake (SYN -> SYN-ACK -> ACK) with the IP on port 443.\n  3. **TLS Handshake:** Secure encryption tunnel is established.\n  4. **HTTP Request:** Browser sends an HTTP GET request for the web content.\n  5. **Response Rendering:** Server responds, and browser renders HTML, CSS, and JavaScript.\n- **Why is HTTPS preferred over HTTP?** HTTP sends data in cleartext, meaning anyone sniffing network packets can steal credentials. HTTPS encrypts traffic using TLS/SSL, ensuring confidentiality and integrity.\n- **Why is a MAC address called a physical address?** It is permanently burned into the hardware's Network Interface Card (NIC) by the manufacturer, whereas an IP address is logical and can change dynamically.\n\n#### \u2705 Key Takeaways\n- Networks allow digital resource sharing and communication via standardized communication channels.\n- Local Area Networks (LAN) use switches to coordinate physical frames inside local boundaries.\n- Wide Area Networks (WAN) expand locally using routers, NAT, and hierarchical DNS directories.\n- The OSI Model defines 7 layers of structured encapsulation wrapping data down to copper, light, or waves.\n- TCP (reliable, connection-oriented) and UDP (fast, connectionless) are the primary transport models.\n",
                realWorldCallout: {
                    title: 'The Blueprint of Defense',
                    concept: 'Comprehensive Network Defense',
                    scenario: 'A SOC Analyst intercepts a security alert pointing to an internal workstation communicating with a rogue IP on port 23 (Telnet). Leveraging their network fundamentals, the analyst knows Telnet is unencrypted (Layer 7). They use nslookup to investigate the host, trace the malicious packets to the core switch (Layer 2), isolate the port, and prevent a major credential theft incident.',
                    relevance: 'Demonstrates how mastering network diagnostics, ports, and structures directly enables security professionals to isolate and contain modern network threats.'
                },
                mindmap: [
                    { id: 'mystery-chest-net-root', label: 'Module Summary', description: 'Consolidation of network fundamentals', x: 50, y: 15, connections: ['diagnostics-group', 'standards-group', 'concepts-group'] },
                    { id: 'diagnostics-group', label: 'Diagnostics', description: 'ping, traceroute, nslookup, and ipconfig', x: 20, y: 50 },
                    { id: 'standards-group', label: 'Ports & Protocols', description: 'Port 80 (HTTP), 443 (HTTPS), 53 (DNS), 22 (SSH)', x: 50, y: 50 },
                    { id: 'concepts-group', label: 'Core Concepts', description: 'OSI 7 layers, NAT, and TCP/UDP transport models', x: 80, y: 50 }
                ],
                keyTakeaways: [
                    'The Network Fundamentals module builds the technical baseline required for security monitoring, log analysis, and threat containment.',
                    'MAC addresses guide Layer 2 frame switching; IP addresses guide Layer 3 packet routing.',
                    'The OSI model standardizes transport and logical paths, defining segments, packets, frames, and bits.',
                    'TCP guarantees reliable transport via the SYN, SYN-ACK, ACK handshake; UDP provides rapid, lightweight datagram delivery.',
                    'DNS acts as the public domain mapping registry; NAT translates private non-routable LAN blocks to public internet WAN IPs.'
                ],
                quiz: [
                    {
                        id: 'q-chest-net-1',
                        question: 'Which tool maps the exact path of routers that a packet traverses to reach its destination?',
                        type: 'text',
                        correctAnswer: 'traceroute',
                        hint: 'Also known as tracert on Windows.'
                    },
                    {
                        id: 'q-chest-net-2',
                        question: 'What port number is standard for HTTPS encrypted web traffic?',
                        type: 'text',
                        correctAnswer: '443',
                        hint: 'HTTP is port 80.'
                    },
                    {
                        id: 'q-chest-net-3',
                        question: 'Which unencrypted remote terminal protocol runs on port 23?',
                        type: 'text',
                        correctAnswer: 'Telnet',
                        hint: 'Replaced by secure SSH on port 22.'
                    }
                ]
            }
        ]
    },
    {
        id: 'how-the-web-works',
        title: 'How the Web Works',
        description: 'Learn HTML/CSS, DNS resolution hierarchy, and dissect HTTP requests, headers, and cookies.',
        isFuture: false,
        topics: [
            {
                id: 'dns-in-detail',
                moduleId: 'how-the-web-works',
                title: 'DNS in Detail',
                description: 'Understand how the Domain Name System works, records, and resolution.',
                status: 'unlocked',
                iconType: 'web',
                content: '',
                mindmap: [
                    { id: 'dns-root', label: 'DNS', description: 'Domain Name System', x: 50, y: 15, connections: ['dns-records', 'dns-servers'] },
                    { id: 'dns-records', label: 'DNS Records', description: 'A, AAAA, CNAME, MX, TXT', x: 20, y: 50 },
                    { id: 'dns-servers', label: 'DNS Servers', description: 'Recursive, Root, TLD, Authoritative', x: 80, y: 50 }
                ],
                keyTakeaways: [],
                quiz: []
            },
            {
                id: 'http-in-detail',
                moduleId: 'how-the-web-works',
                title: 'HTTP in Detail',
                description: 'Understand HTTP requests, responses, methods, and status codes.',
                status: 'unlocked',
                iconType: 'web',
                content: '',
                mindmap: [
                    { id: 'http-root', label: 'HTTP/HTTPS', description: 'HyperText Transfer Protocol', x: 50, y: 15, connections: ['http-req', 'http-res'] },
                    { id: 'http-req', label: 'Requests', description: 'GET, POST, Headers, URL', x: 20, y: 50 },
                    { id: 'http-res', label: 'Responses', description: 'Status Codes, Cookies', x: 80, y: 50 }
                ],
                keyTakeaways: [],
                quiz: []
            },
            {
                id: 'how-websites-work',
                moduleId: 'how-the-web-works',
                title: 'How Websites Work',
                description: 'Frontend vs Backend, HTML, CSS, JavaScript, and Injection.',
                status: 'unlocked',
                iconType: 'web',
                content: '',
                mindmap: [
                    { id: 'web-root', label: 'Web Architecture', description: 'Client-Server Model', x: 50, y: 15, connections: ['frontend', 'backend'] },
                    { id: 'frontend', label: 'Frontend', description: 'HTML, CSS, JS', x: 20, y: 50 },
                    { id: 'backend', label: 'Backend', description: 'Server, Database, Logic', x: 80, y: 50 }
                ],
                keyTakeaways: [],
                quiz: []
            },
            {
                id: 'putting-it-all-together',
                moduleId: 'how-the-web-works',
                title: 'Putting it all together',
                description: 'The complete lifecycle of a website request from DNS to render.',
                status: 'unlocked',
                iconType: 'web',
                content: '',
                mindmap: [
                    { id: 'lifecycle-root', label: 'Request Lifecycle', description: 'End-to-End Flow', x: 50, y: 15, connections: ['dns-waf', 'lb-server'] },
                    { id: 'dns-waf', label: 'Edge Layer', description: 'DNS, CDN, WAF', x: 20, y: 50 },
                    { id: 'lb-server', label: 'Core Infrastructure', description: 'Load Balancer, Web Server, DB', x: 80, y: 50 }
                ],
                keyTakeaways: [],
                quiz: []
            },
            {
                id: 'mystery-chest',
                moduleId: 'how-the-web-works',
                title: 'Mystery Chest',
                description: 'Rapid Revision and Exam Tips',
                status: 'unlocked',
                iconType: 'shield',
                content: '',
                mindmap: [
                    { id: 'chest-root', label: 'Mystery Chest', description: 'Rapid Revision', x: 50, y: 50 }
                ],
                keyTakeaways: [],
                quiz: []
            }
        ]
    },
    {
        id: 'linux-fundamentals',
        title: 'Linux Fundamentals',
        description: 'Master the Linux terminal, understand the file system hierarchy, and practice shell commands.',
        isFuture: true,
        topics: [
            {
                id: 'linux-intro',
                moduleId: 'linux-fundamentals',
                title: 'Linux Intro',
                description: 'Learn the core philosophy of Linux, basic commands, and directory layouts.',
                status: 'locked',
                iconType: 'linux',
                content: "### Linux Fundamentals\n\nLinux is an open-source, highly reliable operating system that powers over 90% of the world's internet servers, cloud infrastructure, and the vast majority of cybersecurity hacking systems (such as Kali Linux).\n\nUnlike Windows, Linux heavily emphasizes the Command Line Interface (CLI) for speed, automation, and remote administration.\n\n#### Fundamental Commands to Navigate the Shell\n\n* **`pwd` (Print Working Directory):** Shows your current directory location.\n* **`ls` (List):** Lists the files and subdirectories inside your current folder. Use `ls -la` to see hidden files and details.\n* **`cd` (Change Directory):** Navigates to a different folder (e.g., `cd /var/log`).\n* **`cat` (Concatenate):** Reads and prints the contents of a text file to the terminal screen (e.g., `cat flag.txt`).\n* **`whoami`:** Displays the username of the active terminal session.\n",
                realWorldCallout: {
                    title: 'The Shadow File Leak',
                    concept: 'Linux Directory Permissions',
                    scenario: 'An attacker exploits a misconfigured web application that allows file reading. They request the "/etc/shadow" file. Because the web server process was mistakenly running as the "root" superuser, the app is able to read and return the salted passwords hashes of all system users.',
                    relevance: 'Highlights why running programs with "least privilege" is vital. Standard web daemons should never run as root.'
                },
                mindmap: [
                    { id: 'linux-root', label: 'Linux OS', description: 'Core open-source server environment', x: 50, y: 15, connections: ['navigation', 'read-files', 'identity'] },
                    { id: 'navigation', label: 'Navigation', description: 'pwd, cd, and ls directory commands', x: 20, y: 50 },
                    { id: 'read-files', label: 'File Operations', description: 'cat, nano, less, and file listing', x: 50, y: 55 },
                    { id: 'identity', label: 'User Identity', description: 'whoami, groups, and root superuser access', x: 80, y: 50 }
                ],
                keyTakeaways: [
                    'Linux is the standard operating system for security servers and devices.',
                    'Files and directories are organized starting from the root "/" directory.',
                    'The "root" account has absolute, unrestricted privileges on the system.'
                ],
                quiz: [
                    {
                        id: 'q-lin-1',
                        question: 'Which three-letter Linux command shows your current working directory path?',
                        type: 'text',
                        correctAnswer: 'pwd',
                        hint: 'Print Working Directory.'
                    },
                    {
                        id: 'q-lin-2',
                        question: 'What is the username of the superuser in a Linux system who has absolute administrative rights?',
                        type: 'text',
                        correctAnswer: 'root',
                        hint: 'The base of the tree.'
                    }
                ]
            }
        ]
    },
    {
        id: 'windows-fundamentals',
        title: 'Windows Fundamentals',
        description: 'Learn about Windows internals, administrative shares, Registry databases, and Active Directory concepts.',
        isFuture: true,
        topics: [
            {
                id: 'windows-internals',
                moduleId: 'windows-fundamentals',
                title: 'Windows Internals',
                description: 'Understand the Windows operating system architecture, Registry, and Event Viewer logs.',
                status: 'locked',
                iconType: 'windows',
                content: "### Windows Internals\n\nWindows is the dominant operating system for corporate workplaces and endpoints. Securing or attacking Windows networks requires understanding how the OS handles user permissions, logs events, and stores system configurations.\n\n#### Key Windows Architecture Pillars\n\n1. **The Windows Registry:**\n   A massive hierarchical database that stores low-level configuration settings for the Windows operating system, device drivers, user preferences, and installed applications. It is split into hives like `HKLM` (Machine) and `HKCU` (User).\n\n2. **Active Directory (AD):**\n   A directory service developed by Microsoft for Windows domain networks. It allows central management of users, computers, permissions, and group policies across thousands of corporate laptops from a single domain controller.\n\n3. **Event Viewer:**\n   The centralized log system. It tracks Windows events categorized into Application, Security, System, and PowerShell execution logs. Security logs track logins, failed authentications, and privilege changes.\n",
                realWorldCallout: {
                    title: 'The Mimikatz Incident',
                    concept: 'LSASS Memory Dumping',
                    scenario: 'An attacker gets administrative access to a corporate computer. They run a security tool (Mimikatz) to dump the memory of the "LSASS.exe" (Local Security Authority Subsystem Service) process, extracting the active user\'s plain text password from RAM.',
                    relevance: 'Shows why safeguarding administrative credentials and restricting local admin rights is the single most important control in Active Directory.'
                },
                mindmap: [
                    { id: 'win-root', label: 'Windows OS', description: 'Enterprise desktop standards', x: 50, y: 15, connections: ['registry', 'active-dir', 'logging'] },
                    { id: 'registry', label: 'Registry Hives', description: 'HKLM, HKCU configuration parameters', x: 20, y: 50 },
                    { id: 'active-dir', label: 'Active Directory', description: 'Central corporate domain user management', x: 50, y: 55 },
                    { id: 'logging', label: 'Event Logs', description: 'Security, System, and Application events', x: 80, y: 50 }
                ],
                keyTakeaways: [
                    'The Windows Registry stores nearly all OS config and auto-start keys.',
                    'Active Directory is the backbone of corporate enterprise authentication and permissions.',
                    'Event logs must be forwarded to a SIEM to prevent attackers from clearing them locally.'
                ],
                quiz: [
                    {
                        id: 'q-win-1',
                        question: 'What is the name of the centralized configuration database in Windows?',
                        type: 'text',
                        correctAnswer: 'registry',
                        hint: 'Contains hives like HKLM.'
                    },
                    {
                        id: 'q-win-2',
                        question: 'What Microsoft service manages corporate users, computers, and Group Policies centrally?',
                        type: 'text',
                        correctAnswer: 'Active Directory',
                        hint: 'Often abbreviated as AD.'
                    }
                ]
            }
        ]
    }
];
