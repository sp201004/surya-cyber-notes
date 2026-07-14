import { Module } from './types';

export const GOOGLE_CYBER_MODULES: Module[] = [
  {
    "id": "google-course-1",
    "title": "Foundations of Cybersecurity",
    "description": "Core foundational concepts of cybersecurity including the CIA triad, threats, and frameworks.",
    "isFuture": false,
    "topics": [
      {
        "id": "core-cyber-foundations",
        "moduleId": "google-course-1",
        "title": "Core Cybersecurity Foundations",
        "description": "Essential security principles, CIA Triad, and threat landscapes.",
        "status": "unlocked",
        "iconType": "shield",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "What is Cybersecurity?",
            "description": "Comprehensive practice ensuring CIA of digital assets by protecting networks, devices, people, and data.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "CIA Triad",
            "description": "Confidentiality (authorized access), Integrity (data accuracy), Availability (reliable access). All three must be maintained simultaneously.",
            "x": 30,
            "y": 45,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "Threat Landscape",
            "description": "External threats (cybercrime, APTs, hacktivists) vs Internal threats (malicious insiders, accidental errors). Internal often more dangerous.",
            "x": 70,
            "y": 45,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Social Engineering",
            "description": "Exploits human psychology using urgency, fear, and authority impersonation. Phishing indicators: mismatched domains, URL masking, generic greetings.",
            "x": 50,
            "y": 60,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "Data Classification",
            "description": "PII (identifies individuals), SPII (sensitive PII requiring stricter protection), PHI (HIPAA-protected health data).",
            "x": 25,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-6",
            "label": "Blue vs Red Teams",
            "description": "Blue Team: defenders (monitoring, incident response). Red Team: ethical attackers (pen testing, finding gaps). Purple Team: collaboration.",
            "x": 75,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-7",
            "label": "Security Tools",
            "description": "SIEM (log aggregation & correlation), IDS (intrusion detection), DFIR (forensics & incident response).",
            "x": 50,
            "y": 95,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "CIA Triad: Confidentiality (authorized access only), Integrity (data stays accurate), Availability (always accessible when needed)",
          "Internal threats are often more dangerous than external because insiders already have legitimate access",
          "Phishing exploits psychology using three triggers: Urgency, Fear/Consequences, and Authority Impersonation",
          "SPII requires stricter protection than regular PII (examples: SSN, biometrics, medical records, credentials)",
          "Blue Team defends, Red Team attacks ethically, Purple Team combines both for real-time defense improvement",
          "SIEM provides organization-wide log visibility; IDS provides targeted network traffic inspection",
          "DFIR follows three steps: Identification, Containment, Preservation & Analysis"
        ],
        "quiz": [
          {
            "id": "q1-cia",
            "question": "What are the three pillars of the CIA Triad and why must all three be maintained?",
            "type": "text",
            "correctAnswer": "Confidentiality (authorized access only), Integrity (data stays accurate and unaltered), Availability (always accessible when needed). All three must be maintained simultaneously.",
            "hint": "Check the CIA Triad section - they form the foundation of all security."
          },
          {
            "id": "q2-threats",
            "question": "Why are internal threats often more dangerous than external threats?",
            "type": "text",
            "correctAnswer": "Internal threats are more dangerous because insiders already have legitimate access - there's no perimeter to breach. Mitigation requires Principle of Least Privilege (PoLP).",
            "hint": "Look at the Threat Landscape table's KEY INSIGHT box."
          },
          {
            "id": "q3-phishing",
            "question": "Name the three psychological triggers attackers use in phishing attacks.",
            "type": "text",
            "correctAnswer": "Urgency (1 hour to act!), Fear/Consequences (lawsuit filed!), Authority Impersonation (pretending to be CEO/IRS/IT).",
            "hint": "See the Social Engineering & Phishing section - these exploit human psychology."
          },
          {
            "id": "q4-data",
            "question": "What's the difference between PII and SPII?",
            "type": "text",
            "correctAnswer": "PII identifies individuals (name, email). SPII is a stricter category needing maximum protection (SSN, biometrics, medical records, credentials).",
            "hint": "Check the Data Classification table."
          },
          {
            "id": "q5-teams",
            "question": "Explain the difference between Blue Team, Red Team, and Purple Team roles.",
            "type": "text",
            "correctAnswer": "Blue Team: defenders (monitoring, incident response, playbooks). Red Team: ethical attackers (pen testing, simulating threats, finding gaps). Purple Team: Blue + Red working together in real-time.",
            "hint": "See the Blue Team vs. Red Team diagram box."
          }
        ]
      },
      {
        "id": "historical-attacks",
        "moduleId": "google-course-1",
        "title": "Historical Attacks & Threat Classification",
        "description": "Major cyberattacks that shaped modern security practices.",
        "status": "unlocked",
        "iconType": "skull",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Historic Attacks",
            "description": "Brain Virus (1986), Morris Worm (1988), LoveLetter (2000), Equifax (2017) - each taught critical defensive lessons.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Malware Types",
            "description": "Virus (needs user action), Worm (self-replicating), Ransomware (encryption+payment), Spyware (silent monitoring).",
            "x": 25,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "Social Engineering",
            "description": "Phishing (mass email), Spear Phishing (targeted), Whaling (executives), BEC, Vishing, Smishing, Physical, USB Baiting.",
            "x": 75,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Advanced Attacks",
            "description": "Brute Force, Rainbow Tables, Downgrade Attacks, Supply-Chain attacks, Adversarial AI.",
            "x": 50,
            "y": 60,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "Threat Actors",
            "description": "APT (nation-state), Insiders (malicious/accidental), Hacktivists, Script Kiddies, Authorized Hackers.",
            "x": 30,
            "y": 85,
            "connections": []
          },
          {
            "id": "node-6",
            "label": "CISSP 8 Domains",
            "description": "8 domains covering all cybersecurity: Risk Management, Asset Security, Architecture, Network, IAM, Testing, Operations, AppSec.",
            "x": 70,
            "y": 85,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "Morris Worm (1988) crashed 10% of the internet due to a re-infection loop bug, leading to creation of the first CERTs",
          "LoveLetter (2000) marked the dawn of large-scale social engineering - proved human psychology is the weakest link",
          "Equifax breach (2017) cost $575M for failing to patch a known vulnerability - demonstrates direct financial liability",
          "Virus needs user action to spread; Worm self-replicates autonomously without any user interaction",
          "Spear Phishing targets specific individuals; Whaling specifically targets high-profile executives (CEO, CFO, CISO)",
          "APT (Advanced Persistent Threat) stays undetected inside networks for months/years to gather intelligence",
          "CISSP Domain 5 is Identity & Access Management (IAM) - validating identities and enforcing Principle of Least Privilege",
          "Incident management priority order: 1-Containment (stop bleeding), 2-Investigation (root cause), 3-Execute Playbook"
        ],
        "quiz": [
          {
            "id": "q1-morris",
            "question": "What programming flaw caused the Morris Worm to become destructive instead of benign?",
            "type": "text",
            "correctAnswer": "A loop flaw caused it to re-infect machines it had already compromised, repeatedly consuming memory until systems crashed.",
            "hint": "Check the Chronological History table - it was originally meant to map the internet."
          },
          {
            "id": "q2-lovelet",
            "question": "Why is the LoveLetter attack historically significant?",
            "type": "text",
            "correctAnswer": "It marked the dawn of large-scale social engineering, proving that exploiting human psychology is often easier than breaking technical defenses.",
            "hint": "See the Quick Revision table."
          },
          {
            "id": "q3-virus-worm",
            "question": "What's the key difference between a virus and a worm?",
            "type": "text",
            "correctAnswer": "Virus requires user action to spread (like opening an attachment). Worm self-replicates autonomously across networks without any user interaction.",
            "hint": "Look at the Malware - Four Major Types table."
          },
          {
            "id": "q4-spear-whale",
            "question": "What distinguishes Spear Phishing from Whaling?",
            "type": "text",
            "correctAnswer": "Spear Phishing is a customized attack on a specific individual. Whaling is spear phishing specifically targeting HIGH-PROFILE EXECUTIVES (CEO, CFO, CISO).",
            "hint": "Check the Social Engineering classification table."
          },
          {
            "id": "q5-apt",
            "question": "What is an APT and what makes it particularly dangerous?",
            "type": "text",
            "correctAnswer": "Advanced Persistent Threat. Highly organized (often nation-state) group that stays UNDETECTED inside a network for months to years to gather intel or cause damage.",
            "hint": "See the Threat Actors taxonomy table."
          }
        ]
      },
      {
        "id": "frameworks-ethics",
        "moduleId": "google-course-1",
        "title": "Frameworks, Controls & Ethics",
        "description": "Security frameworks, compliance, and professional ethics.",
        "status": "unlocked",
        "iconType": "clipboard",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Framework vs Controls",
            "description": "Framework = blueprint (strategic guidelines). Control = implementation (specific safeguard like firewall, MFA).",
            "x": 50,
            "y": 15,
            "connections": ["node-2"]
          },
          {
            "id": "node-2",
            "label": "4 Framework Components",
            "description": "1-Identify goals, 2-Set guidelines, 3-Implement processes, 4-Monitor & communicate. Continuous cycle.",
            "x": 50,
            "y": 35,
            "connections": ["node-3", "node-4"]
          },
          {
            "id": "node-3",
            "label": "NIST CSF 2.0",
            "description": "6 functions: Govern, Identify, Protect, Detect, Respond, Recover. Voluntary but gold standard framework.",
            "x": 25,
            "y": 60,
            "connections": ["node-5"]
          },
          {
            "id": "node-4",
            "label": "Compliance Regulations",
            "description": "GDPR (EU, 72hr breach notification), HIPAA (US healthcare, 60 days), PCI DSS (payment cards), FedRAMP (federal cloud).",
            "x": 75,
            "y": 60,
            "connections": ["node-5"]
          },
          {
            "id": "node-5",
            "label": "Security Ethics",
            "description": "Resist laziness (credential sharing, unauthorized queries). Refuse illegal executive requests. Never hack back (illegal in US).",
            "x": 50,
            "y": 85,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "Framework provides the blueprint (strategic guidelines); Controls are the implementation (specific safeguards)",
          "Security Framework has 4 components: Identify goals, Set guidelines, Implement processes, Monitor & communicate",
          "NIST CSF 2.0 has 6 functions: Govern (new in 2024), Identify, Protect, Detect, Respond, Recover",
          "GDPR requires 72-HOUR breach notification; HIPAA requires 60-DAY notification for PHI breaches",
          "Asset valuation = financial/regulatory costs of compromise. High-risk assets need tighter controls",
          "Most unethical behavior comes from laziness (credential sharing, unauthorized queries) not malice",
          "Hacking back is STRICTLY ILLEGAL in the US under Computer Fraud and Abuse Act (1986)",
          "If executive demands unauthorized data access: Refuse, mandate legal channels, document, escalate to Legal"
        ],
        "quiz": [
          {
            "id": "q1-framework",
            "question": "What's the difference between a Security Framework and a Security Control?",
            "type": "text",
            "correctAnswer": "Framework = blueprint (strategic guidelines). Control = implementation (specific safeguard). Framework tells you WHAT to protect; controls are HOW you protect it.",
            "hint": "Check the first table comparing Framework vs Controls."
          },
          {
            "id": "q2-components",
            "question": "Name the 4 core components of a security framework.",
            "type": "text",
            "correctAnswer": "1-Identify and document security goals, 2-Set guidelines to achieve goals, 3-Implement strong security processes, 4-Monitor and communicate results. It's a continuous cycle.",
            "hint": "See The 4 Core Components section with numbered boxes."
          },
          {
            "id": "q3-nist",
            "question": "What is NIST CSF and what are its 6 functions?",
            "type": "text",
            "correctAnswer": "Voluntary framework from NIST providing standards and best practices to manage cybersecurity risk. 6 functions: Govern, Identify, Protect, Detect, Respond, Recover.",
            "hint": "Look at the NIST CSF 2.0 diagram."
          },
          {
            "id": "q4-breach",
            "question": "What are the breach notification windows for GDPR vs HIPAA?",
            "type": "text",
            "correctAnswer": "GDPR: 72 HOURS to notify affected individuals and authorities. HIPAA: 60 DAYS from discovery of PHI breach.",
            "hint": "Check the Global Compliance Regulations table."
          },
          {
            "id": "q5-hackback",
            "question": "Is hacking back legal in the United States? Why or why not?",
            "type": "text",
            "correctAnswer": "NO. Strictly illegal under the Computer Fraud and Abuse Act (1986). Classified as criminal vigilantism. Only approved military/federal personnel may counterattack.",
            "hint": "See The Legality of Counterattacks table."
          }
        ]
      },
      {
        "id": "master-glossary",
        "moduleId": "google-course-1",
        "title": "Master Glossary",
        "description": "Comprehensive cybersecurity terminology reference.",
        "status": "unlocked",
        "iconType": "clipboard",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Core Concepts",
            "description": "CIA Triad, Asset, Asset Valuation, Cybersecurity, Security Posture, Threat, Threat Actor.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Attack Types",
            "description": "Malware, Virus, Worm, Ransomware, Phishing, Spear Phishing, Whaling, BEC, Vishing, Smishing, Social Engineering.",
            "x": 25,
            "y": 45,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "Defense Tools",
            "description": "SIEM, IDS, Antivirus, DFIR, Security Controls, Security Architecture, Playbook.",
            "x": 75,
            "y": 45,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Teams & Actors",
            "description": "Blue Team (defenders), Red Team (attackers), APT, Hacktivist, Insider Threat.",
            "x": 50,
            "y": 65,
            "connections": ["node-5"]
          },
          {
            "id": "node-5",
            "label": "Compliance & Standards",
            "description": "NIST CSF, GDPR, HIPAA, PCI DSS, CISSP, OWASP, Security Frameworks, Compliance.",
            "x": 50,
            "y": 90,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "CIA Triad: Confidentiality, Integrity, Availability - the three foundational principles of all security",
          "Asset Valuation = financial/regulatory costs of compromise; determines control strength needed",
          "Blue Team defends (monitoring, response); Red Team attacks ethically (pen testing, finding gaps)",
          "SIEM aggregates logs organization-wide for correlation; IDS monitors network traffic for intrusions",
          "NIST CSF has 6 functions: Govern, Identify, Protect, Detect, Respond, Recover",
          "GDPR (EU): 72-hour breach notification. HIPAA (US healthcare): 60-day notification for PHI",
          "APT (Advanced Persistent Threat): Nation-state level, stays undetected for months/years",
          "Principle of Least Privilege: Grant only minimum access needed - primary insider threat defense"
        ],
        "quiz": [
          {
            "id": "q1-cia",
            "question": "Define the CIA Triad and explain why all three must be maintained.",
            "type": "text",
            "correctAnswer": "Confidentiality (authorized access only), Integrity (data stays accurate and unaltered), Availability (always accessible when needed). All three must be maintained simultaneously as the foundation of security.",
            "hint": "Look up 'CIA Triad' in the glossary table."
          },
          {
            "id": "q2-siem-ids",
            "question": "What's the difference between SIEM and IDS?",
            "type": "text",
            "correctAnswer": "SIEM: aggregates and correlates logs from all sources organization-wide, generates real-time alerts. IDS: monitors network traffic or host activity for intrusions using signature/anomaly detection. SIEM is broader; IDS is targeted.",
            "hint": "Check the glossary entries for both SIEM and IDS."
          },
          {
            "id": "q3-blue-red",
            "question": "Explain the roles of Blue Team vs Red Team.",
            "type": "text",
            "correctAnswer": "Blue Team: defensive security (monitoring, hardening systems, responding to incidents, maintaining playbooks). Red Team: offensive security (simulating real threat actors through pen testing and social engineering to find gaps).",
            "hint": "See the glossary definitions for Blue Team and Red Team."
          },
          {
            "id": "q4-compliance",
            "question": "What are the breach notification windows for GDPR and HIPAA?",
            "type": "text",
            "correctAnswer": "GDPR (EU): 72-hour breach notification requirement. HIPAA (US): 60-day breach notification requirement for PHI breaches.",
            "hint": "Look up GDPR and HIPAA in the glossary."
          },
          {
            "id": "q5-apt",
            "question": "What is an APT and why is it particularly dangerous?",
            "type": "text",
            "correctAnswer": "Advanced Persistent Threat - highly organized (often nation-state sponsored) group that maintains unauthorized network access for extended periods to gather intelligence or cause damage. Dangerous because they stay UNDETECTED for months/years.",
            "hint": "Check the APT entry in the glossary."
          }
        ]
      },
      {
        "id": "mystery-chest-gc1",
        "moduleId": "google-course-1",
        "title": "Mystery Chest",
        "description": "Quick revision of all Course 1 concepts.",
        "status": "unlocked",
        "iconType": "chest",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "CIA & Foundations",
            "description": "CIA Triad (C/I/A), External vs Internal threats, Blue/Red Teams, Asset Valuation.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Attack History",
            "description": "Morris Worm (1988), LoveLetter (2000), Equifax (2017) - lessons learned from each.",
            "x": 25,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "Malware & Social Engineering",
            "description": "Virus vs Worm, Ransomware, Phishing types (Spear/Whaling/BEC), Psychological triggers.",
            "x": 75,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Frameworks & Compliance",
            "description": "NIST CSF 6 functions, GDPR (72hr), HIPAA (60 days), Framework vs Control.",
            "x": 50,
            "y": 65,
            "connections": ["node-5"]
          },
          {
            "id": "node-5",
            "label": "Tools & Ethics",
            "description": "SIEM, IDS (Signature/Anomaly), DFIR steps, Hacking back (illegal), Professional ethics.",
            "x": 50,
            "y": 90,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "CIA Triad: Confidentiality, Integrity, Availability - all three must be maintained simultaneously",
          "Morris Worm led to first CERTs; LoveLetter pioneered social engineering at scale; Equifax cost $575M for failing to patch",
          "Virus needs user action; Worm self-replicates autonomously. Spear Phishing targets individuals; Whaling targets executives",
          "APT (Advanced Persistent Threat) stays undetected in networks for months/years gathering intelligence",
          "NIST CSF 2.0: Govern, Identify, Protect, Detect, Respond, Recover (Govern added 2024)",
          "GDPR: 72-hour breach notification. HIPAA: 60-day notification for PHI breaches",
          "Incident management order: 1-Containment, 2-Investigation, 3-Execute Playbook (never improvise)",
          "Hacking back is STRICTLY ILLEGAL in US under Computer Fraud and Abuse Act (1986)"
        ],
        "quiz": [
          {
            "id": "q1-quick",
            "question": "Explain the three pillars of the CIA Triad.",
            "type": "text",
            "correctAnswer": "Confidentiality (authorized access only), Integrity (data stays accurate and unaltered), Availability (always accessible when needed). All three must be maintained simultaneously.",
            "hint": "First entry in the flashcard review table."
          },
          {
            "id": "q2-history",
            "question": "What defensive lessons did Morris Worm, LoveLetter, and Equifax teach us?",
            "type": "text",
            "correctAnswer": "Morris Worm: Led to first CERTs, showed resource exhaustion DoS. LoveLetter: Marked dawn of social engineering at scale. Equifax: $575M penalty for failing to patch known vulnerabilities.",
            "hint": "Check the flashcard entries for each attack."
          },
          {
            "id": "q3-malware",
            "question": "What's the key difference between Virus and Worm? Between Spear Phishing and Whaling?",
            "type": "text",
            "correctAnswer": "Virus: requires user action to spread. Worm: self-replicating, spreads autonomously. Spear Phishing: customized attack on specific individual. Whaling: spear phishing targeting specifically C-suite executives.",
            "hint": "Look at the Virus vs. Worm and Spear Phishing vs. Whaling entries."
          },
          {
            "id": "q4-framework",
            "question": "Name the 6 functions of NIST CSF 2.0 and the breach notification windows for GDPR vs HIPAA.",
            "type": "text",
            "correctAnswer": "NIST CSF: Govern, Identify, Protect, Detect, Respond, Recover (Govern added 2024). GDPR: 72 hours. HIPAA: 60 days from PHI breach discovery.",
            "hint": "Check the NIST and breach notification flashcard entries."
          },
          {
            "id": "q5-ethics",
            "question": "Is hacking back legal in the US? What should you do if a CEO demands unauthorized data access?",
            "type": "text",
            "correctAnswer": "NO - hacking back is strictly illegal under Computer Fraud and Abuse Act (1986). If CEO demands unauthorized access: REFUSE, mandate legal channels with documentation, document refusal, escalate to Legal.",
            "hint": "See the flashcard entries on hacking back legality and executive demands."
          }
        ]
      }
    ]
  },
  {
    "id": "google-course-2",
    "title": "Play It Safe: Manage Security Risks",
    "description": "Security domains, risk management, frameworks, controls, SIEM tools, and incident response playbooks.",
    "isFuture": false,
    "topics": [
      {
        "id": "security-domains-risk",
        "moduleId": "google-course-2",
        "title": "Security Domains, Threats & Risk",
        "description": "CISSP 8 Domains, CIA Triad, Risk Strategies, NIST RMF.",
        "status": "unlocked",
        "iconType": "shield",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Security Posture",
            "description": "An organization's overall ability to defend its critical assets AND react swiftly to changes in the threat landscape. Underpinned by InfoSec, CIA Triad, and Shared Responsibility.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "CIA Triad",
            "description": "Confidentiality (who can see data), Integrity (data stays accurate/unmodified), Availability (always accessible). All three must be maintained simultaneously.",
            "x": 30,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "CISSP 8 Domains",
            "description": "Security & Risk Mgmt, Asset Security, Architecture, Network Security, IAM, Assessment/Testing, Security Operations, Software Development Security.",
            "x": 70,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "IAM — 4 Pillars",
            "description": "Identification (who are you?), Authentication (prove it - MFA), Authorization (what can you access? - RBAC/Least Privilege), Accountability (log everything).",
            "x": 50,
            "y": 58,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "Risk = Threat + Vuln",
            "description": "Both a threat and a vulnerability must exist simultaneously for an incident to occur. Assets range from Low-Risk (public) to High-Risk (PII, trade secrets).",
            "x": 25,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-6",
            "label": "4 Risk Strategies",
            "description": "Acceptance (document & accept), Avoidance (don't do the activity), Transference (shift to insurance/MSSP), Mitigation (reduce likelihood/impact - most common).",
            "x": 75,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-7",
            "label": "NIST RMF (7 Steps)",
            "description": "Continuous cycle: Prepare, Categorize, Select, Implement, Assess, Authorize, Monitor. Security is never 'done'.",
            "x": 50,
            "y": 95,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "Security Posture is an organization's overall ability to defend its critical assets and react swiftly to changes in the threat landscape",
          "CIA Triad: Confidentiality, Integrity, Availability — all three must be maintained simultaneously; sacrificing one weakens the entire posture",
          "The CISSP framework organizes all of cybersecurity into 8 domains; Domain 5 is Identity and Access Management (IAM)",
          "IAM has four pillars: Identification, Authentication, Authorization, and Accountability",
          "Risk = Threat + Vulnerability — both components must exist simultaneously for an incident to occur",
          "The 4 Risk Management Strategies are Acceptance, Avoidance, Transference, and Mitigation",
          "NIST RMF is a continuous 7-step cycle: Prepare, Categorize, Select, Implement, Assess, Authorize, Monitor",
          "Principle of Least Privilege (PoLP): give users only the minimum access required to do their job, nothing more"
        ],
        "quiz": [
          {
            "id": "q1-gc2m1-cia",
            "question": "What does CIA stand for and why must all three be maintained?",
            "type": "text",
            "correctAnswer": "Confidentiality, Integrity, Availability — the three pillars all security decisions are measured against. Sacrificing one weakens the entire security posture.",
            "hint": "See the CIA Triad — Deep Dive section."
          },
          {
            "id": "q2-gc2m1-cissp",
            "question": "How many CISSP security domains exist, and which domain covers IAM?",
            "type": "text",
            "correctAnswer": "8 domains covering all aspects of professional cybersecurity practice. Domain 5 is Identity and Access Management (IAM).",
            "hint": "Check the CISSP's Eight Security Domains section."
          },
          {
            "id": "q3-gc2m1-polp",
            "question": "What is the Principle of Least Privilege?",
            "type": "text",
            "correctAnswer": "Users receive ONLY the minimum access required for their specific job — nothing more.",
            "hint": "It's the foundation of the IAM domain (Domain 5)."
          },
          {
            "id": "q4-gc2m1-risk",
            "question": "What is the risk formula, and what are the 4 risk management strategies?",
            "type": "text",
            "correctAnswer": "Risk = Threat + Vulnerability. The 4 strategies are Acceptance, Avoidance, Transference, and Mitigation.",
            "hint": "See the Core Security Equation and Four Risk Management Strategies sections."
          },
          {
            "id": "q5-gc2m1-rmf",
            "question": "Name the 7 steps of the NIST Risk Management Framework in order.",
            "type": "text",
            "correctAnswer": "Prepare → Categorize → Select → Implement → Assess → Authorize → Monitor. It's a continuous loop — security is never 'done'.",
            "hint": "Check the NIST RMF 7-step cycle diagram."
          }
        ]},
      {
        "id": "frameworks-controls-audits",
        "moduleId": "google-course-2",
        "title": "Frameworks, Controls & Audits",
        "description": "NIST CSF, OWASP, Control Types, Full Audit Walkthrough.",
        "status": "unlocked",
        "iconType": "clipboard",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Security Framework",
            "description": "The blueprint (strategic guidelines) for an organization's security program. Covers virtual space, physical space, and the human element.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "3 Control Categories",
            "description": "Administrative/Managerial (policies, training), Technical (firewalls, encryption, MFA, SIEM), Physical (locks, CCTV, badge access, mantraps).",
            "x": 30,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "4 Control Types",
            "description": "Deterrent (discourages - before), Preventative (blocks - during), Detective (discovers - during/after), Corrective (fixes & restores - after).",
            "x": 70,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "NIST CSF 2.0",
            "description": "6 core functions: Govern, Identify, Protect, Detect, Respond, Recover. Voluntary framework used by most private-sector organizations globally.",
            "x": 50,
            "y": 60,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "OWASP 8 Principles",
            "description": "Minimize attack surface, Secure defaults, Fail securely, Separation of duties, Don't trust services, Avoid security by obscurity, Keep it simple, Fix issues correctly.",
            "x": 25,
            "y": 85,
            "connections": []
          },
          {
            "id": "node-6",
            "label": "5-Step Security Audit",
            "description": "Scope & Goals, Risk Assessment, Controls Assessment, Compliance Assessment (GDPR/PCI DSS/HIPAA), Communicate & Report to leadership.",
            "x": 75,
            "y": 85,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "A Security Framework is the blueprint (strategic guidelines); Security Controls are the actual safeguards that implement it",
          "3 control categories: Administrative/Managerial (policies, training), Technical (firewalls, encryption, MFA), Physical (locks, CCTV, badges)",
          "4 functional control types map to the attack timeline: Deterrent (before), Preventative (during), Detective (during/after), Corrective (after)",
          "NIST CSF 2.0 has 6 core functions: Govern, Identify, Protect, Detect, Respond, Recover",
          "OWASP defines 8 secure design principles; 'Fail Securely' means defaulting to the most restrictive state (fail closed, not open)",
          "MFA uses three factor types: something you KNOW (password), something you HAVE (hardware key), something you ARE (biometrics)",
          "The security audit lifecycle has 5 steps: Scope & Goals, Risk Assessment, Controls Assessment, Compliance Assessment, Communicate Results",
          "GDPR requires notifying affected individuals AND supervisory authorities within 72 hours of discovering a breach"
        ],
        "quiz": [
          {
            "id": "q1-gc2m2-fwctrl",
            "question": "What is the difference between a Security Framework and a Security Control?",
            "type": "text",
            "correctAnswer": "Framework = the blueprint / strategic guidelines for the whole program. Control = the specific safeguard (administrative, technical, or physical) that implements it.",
            "hint": "See the 'Framework = Blueprint' callout."
          },
          {
            "id": "q2-gc2m2-categories",
            "question": "Name the 3 categories of security controls.",
            "type": "text",
            "correctAnswer": "Administrative (policies/procedures/training), Technical (software/hardware — firewalls, encryption, MFA), and Physical (locks, cameras, badge access).",
            "hint": "Check the Three Control Categories diagram."
          },
          {
            "id": "q3-gc2m2-types",
            "question": "What are the 4 functional control types across the attack timeline?",
            "type": "text",
            "correctAnswer": "Deterrent (before — discourages), Preventative (during — blocks), Detective (during/after — discovers), Corrective (after — fixes & restores).",
            "hint": "See the Four Control Types timeline view."
          },
          {
            "id": "q4-gc2m2-csf",
            "question": "Name the 6 core functions of NIST CSF 2.0.",
            "type": "text",
            "correctAnswer": "Govern, Identify, Protect, Detect, Respond, Recover.",
            "hint": "Check the NIST CSF 2.0 diagram."
          },
          {
            "id": "q5-gc2m2-audit",
            "question": "What are the 5 steps of a security audit?",
            "type": "text",
            "correctAnswer": "Scope & Goals → Risk Assessment → Controls Assessment → Compliance Assessment → Communicate Results.",
            "hint": "See the 5-Step Audit Lifecycle diagram."
          }
        ]},
      {
        "id": "siem-tools-logs",
        "moduleId": "google-course-2",
        "title": "SIEM Tools & Logs",
        "description": "Log Sources, SIEM Architecture, Splunk, Chronicle, SOAR.",
        "status": "unlocked",
        "iconType": "network",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Logs",
            "description": "Automated, timestamped records of events. Provide immutable telemetry parsed for Indicators of Compromise (IOCs). Without logs, a breach is invisible.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "3 Log Sources",
            "description": "Firewall Logs (who's entering/leaving), Network Logs (devices & internal traffic), Server Logs (authentication events, logins, resets).",
            "x": 30,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "SIEM Tools",
            "description": "Automate Collect, Normalize, Correlate, Analyze, Alert on millions of logs. Require constant tuning to reduce false positives.",
            "x": 70,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Dashboards",
            "description": "Convert millions of log entries into charts, maps, and color-coded alerts — enabling a 30-second situation assessment instead of hours of digging.",
            "x": 50,
            "y": 58,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "Splunk vs Chronicle",
            "description": "Splunk: self-hosted OR cloud, SPL query language, per-GB pricing. Chronicle: cloud-native only, UDM + YARA-L, Google AI integration, petabyte scale.",
            "x": 25,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-6",
            "label": "Open vs Proprietary",
            "description": "Open-source (Linux, Suricata, Wireshark, Snort): free, community-reviewed. Proprietary (Splunk, Chronicle, CrowdStrike): licensed, vendor support.",
            "x": 75,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-7",
            "label": "SIEM vs SOAR",
            "description": "SIEM = the alarm (collects logs, correlates, fires alerts). SOAR = the automated responder (executes pre-defined playbooks in milliseconds).",
            "x": 50,
            "y": 95,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "A log is an automated, timestamped record of an event; without logs a breach is invisible",
          "3 critical log sources: Firewall Logs (inbound/outbound), Network Logs (devices & internal flows), Server Logs (authentication events)",
          "SIEM tools automate collection, normalization, correlation, analysis, and alerting across millions of daily logs",
          "SIEMs require CONSTANT tuning — an untuned SIEM either misses real threats or drowns analysts in false alarms",
          "Open-source tools (Linux, Suricata, Wireshark, Snort) vs proprietary tools (Splunk, Chronicle, CrowdStrike)",
          "Cloud-Native (Chronicle) was built for cloud from day one; Cloud-Hosted (Splunk Cloud) is on-prem software running on cloud hardware",
          "SIEM detects and fires alerts; SOAR automatically executes response playbooks within milliseconds",
          "Impossible Travel (logins from two distant locations too quickly) is detected by Chronicle's User Sign-In Overview dashboard"
        ],
        "quiz": [
          {
            "id": "q1-gc2m3-log",
            "question": "What is a log, and why is it critical for security?",
            "type": "text",
            "correctAnswer": "An automated, timestamped record of an event in a system, application, or network device. Without logs a breach is invisible; with logs you can reconstruct every step an attacker took.",
            "hint": "See the 'What is a Log?' section."
          },
          {
            "id": "q2-gc2m3-sources",
            "question": "Name the 3 critical log sources and what each answers.",
            "type": "text",
            "correctAnswer": "Firewall Logs (who is entering/leaving the network), Network Logs (what devices are on the network and internal traffic), Server Logs (who authenticated to what, when, and from where).",
            "hint": "Check the Three Critical Log Sources table."
          },
          {
            "id": "q3-gc2m3-siemsoar",
            "question": "What is the difference between SIEM and SOAR?",
            "type": "text",
            "correctAnswer": "SIEM collects logs, correlates patterns, and fires alerts. SOAR automatically executes the response playbook (block IP, disable account, isolate host) without waiting for a human.",
            "hint": "See the SIEM vs. SOAR — The Key Distinction section."
          },
          {
            "id": "q4-gc2m3-cloud",
            "question": "What is the difference between 'Cloud-Native' and 'Cloud-Hosted'?",
            "type": "text",
            "correctAnswer": "Cloud-Native (e.g., Chronicle) is built from scratch specifically for cloud infrastructure. Cloud-Hosted (e.g., Splunk Cloud) is traditional on-prem software running on cloud hardware.",
            "hint": "See the Splunk vs. Google Chronicle key distinction."
          },
          {
            "id": "q5-gc2m3-travel",
            "question": "What is Impossible Travel, and which dashboard detects it?",
            "type": "text",
            "correctAnswer": "A user logging in from two geographically distant locations within a timeframe that makes physical travel impossible — a sign of stolen credentials. Detected by Google Chronicle's User Sign-In Overview dashboard.",
            "hint": "See the 'Impossible Travel' Explained callout."
          }
        ]},
      {
        "id": "incident-response-playbooks",
        "moduleId": "google-course-2",
        "title": "Incident Response & Playbooks",
        "description": "6-Phase IR, Playbook Anatomy, Security Triad.",
        "status": "unlocked",
        "iconType": "sword",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Playbook",
            "description": "A documented, standardized step-by-step response to a specific security alarm (also called a runbook). Made of a Strategy (what/who) and a Plan (how).",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Living Documents",
            "description": "Playbooks are never 'done'. Updated when a failure occurs, industry standards change, a new threat emerges, or a legal/regulatory change happens.",
            "x": 30,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "Strict Adherence",
            "description": "Critical for Legal Compliance (GDPR 72hr), Error Reduction Under Stress, and Forensic Integrity (evidence must be legally defensible).",
            "x": 70,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "6 Phases of IR",
            "description": "Preparation, Detection & Analysis, Containment, Eradication & Recovery, Post-Incident Activity, Coordination. Containment is the most time-critical.",
            "x": 50,
            "y": 60,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "Security Triad",
            "description": "SIEM detects the anomaly → SOAR auto-executes the first response (block IP, disable account) in milliseconds → Analyst follows the Playbook.",
            "x": 25,
            "y": 85,
            "connections": []
          },
          {
            "id": "node-6",
            "label": "Analyst Reality",
            "description": "~50% of an analyst's time is communication & collaboration. Playbooks encode decades of experience. Privacy by Design builds security in from day one.",
            "x": 75,
            "y": 85,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "A Playbook (or runbook) is a documented, standardized step-by-step response to a specific security incident",
          "A playbook has two parts: the Strategy (the 'what' and 'who') and the Plan (the 'how')",
          "Playbooks are living documents — updated after a failure, a standards change, a new threat, or a legal/regulatory change",
          "Strict playbook adherence matters for Legal Compliance, Error Reduction Under Stress, and Forensic Integrity",
          "The 6 phases of Incident Response: Preparation, Detection & Analysis, Containment, Eradication & Recovery, Post-Incident Activity, Coordination",
          "Containment is the most time-critical phase — the goal is to limit damage FIRST, not fix everything",
          "The Security Operations Triad flows SIEM (detects) → SOAR (automated response) → Playbook (human guide)",
          "Coordination runs in parallel with ALL IR phases; ~50% of an analyst's time is communication and collaboration"
        ],
        "quiz": [
          {
            "id": "q1-gc2m4-playbook",
            "question": "What is a playbook, and what are its two main parts?",
            "type": "text",
            "correctAnswer": "A documented manual with explicit step-by-step procedures for responding to a specific security incident (also called a runbook). Its two parts are the Strategy (the 'what' and 'who') and the Plan (the 'how').",
            "hint": "See the 'Playbook = Security Recipe Book' section and Playbook Anatomy."
          },
          {
            "id": "q2-gc2m4-living",
            "question": "Why must playbooks be updated regularly?",
            "type": "text",
            "correctAnswer": "Because failures reveal gaps, industry standards change, new threats emerge, and laws impose new requirements — all requiring updated response procedures. They are living documents.",
            "hint": "Check the Playbooks as Living Documents section."
          },
          {
            "id": "q3-gc2m4-phases",
            "question": "Name the 6 phases of Incident Response in order.",
            "type": "text",
            "correctAnswer": "1-Preparation, 2-Detection & Analysis, 3-Containment, 4-Eradication & Recovery, 5-Post-Incident Activity, 6-Coordination.",
            "hint": "See the 6-Phase Incident Response cycle diagram."
          },
          {
            "id": "q4-gc2m4-containment",
            "question": "Which IR phase is the most time-critical and why?",
            "type": "text",
            "correctAnswer": "Containment — the goal is NOT to fix everything but to limit damage FIRST by isolating infected systems, blocking the attacker's IP, and suspending compromised accounts.",
            "hint": "See phase 3 in the Six Phases of Incident Response."
          },
          {
            "id": "q5-gc2m4-triad",
            "question": "Describe the Security Operations Triad (SIEM + SOAR + Playbook).",
            "type": "text",
            "correctAnswer": "SIEM detects the anomaly and fires an alert. SOAR automatically executes the first response steps (block IP, disable account, isolate host) in milliseconds. The analyst then follows the Playbook for the human-driven steps.",
            "hint": "See The Security Triad: SIEM + SOAR + Playbook section."
          }
        ]},
      {
        "id": "mystery-chest-gc2",
        "moduleId": "google-course-2",
        "title": "Mystery Chest",
        "description": "Quick revision of all Course 2 concepts.",
        "status": "unlocked",
        "iconType": "chest",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Domains & Risk",
            "description": "Security Posture, CIA Triad, CISSP 8 Domains, IAM 4 pillars, Risk = Threat + Vulnerability, 4 Risk Strategies, NIST RMF 7 steps.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Frameworks & Audits",
            "description": "3 control categories, 4 control types, NIST CSF 2.0 (6 functions), OWASP 8 principles, 5-step security audit, GDPR 72-hour notification.",
            "x": 25,
            "y": 45,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "SIEM & Logs",
            "description": "3 log sources, SIEM collect/correlate/alert, Splunk vs Chronicle, open-source vs proprietary, SIEM vs SOAR, Impossible Travel.",
            "x": 75,
            "y": 45,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Incident Response",
            "description": "6 phases of IR, Playbooks (living documents), strict adherence, Security Operations Triad (SIEM → SOAR → Playbook).",
            "x": 50,
            "y": 65,
            "connections": ["node-5"]
          },
          {
            "id": "node-5",
            "label": "Master Glossary",
            "description": "All key Course 2 terms A–Z: Attack Surface, Defense in Depth, IOC, MFA, PoLP, Zero Trust, SIEM, SOAR, and more.",
            "x": 50,
            "y": 90,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "CIA Triad, 8 CISSP domains, Least Privilege, and Risk = Threat + Vulnerability are the foundations of Course 2",
          "4 Risk Management Strategies: Acceptance, Avoidance, Transference, Mitigation",
          "3 control categories (Administrative, Technical, Physical) and 4 control types (Deterrent, Preventative, Detective, Corrective)",
          "NIST CSF 2.0: Govern, Identify, Protect, Detect, Respond, Recover",
          "5-step security audit: Scope & Goals, Risk Assessment, Controls Assessment, Compliance Assessment, Communicate",
          "SIEM collects logs and fires alerts; SOAR auto-executes response playbooks; GDPR requires 72-hour breach notification",
          "6 IR phases: Preparation, Detection & Analysis, Containment, Eradication & Recovery, Post-Incident Activity, Coordination",
          "3 MFA factors (know, have, are); Cloud-Native (Chronicle) vs Cloud-Hosted (Splunk Cloud)"
        ],
        "quiz": [
          {
            "id": "q1-gc2mc-controls",
            "question": "What are the 3 types of security controls and the 4 functional control types?",
            "type": "text",
            "correctAnswer": "3 categories: Administrative (policies/procedures), Technical (software/hardware), Physical (locks/cameras). 4 functional types: Deterrent, Preventative, Detective, Corrective.",
            "hint": "First entries in the flashcard matrix on controls."
          },
          {
            "id": "q2-gc2mc-authn",
            "question": "What is the difference between authentication and authorization?",
            "type": "text",
            "correctAnswer": "Authentication = proving who you are (login). Authorization = what you're allowed to do/access after logging in.",
            "hint": "Check the AuthN vs AuthZ glossary entries."
          },
          {
            "id": "q3-gc2mc-ir",
            "question": "Name the 6 phases of Incident Response.",
            "type": "text",
            "correctAnswer": "1-Preparation, 2-Detection & Analysis, 3-Containment, 4-Eradication & Recovery, 5-Post-Incident Activity, 6-Coordination.",
            "hint": "See the incident response flashcard entry."
          },
          {
            "id": "q4-gc2mc-siemsoar",
            "question": "What is the difference between SIEM and SOAR?",
            "type": "text",
            "correctAnswer": "SIEM collects logs and fires alerts. SOAR automatically executes the response to those alerts without waiting for a human.",
            "hint": "Check the SIEM vs SOAR flashcard entry."
          },
          {
            "id": "q5-gc2mc-ssrf",
            "question": "What is SSRF (Server-Side Request Forgery)?",
            "type": "text",
            "correctAnswer": "An attack where a malicious input tricks a server into accessing internal resources (like private APIs or metadata services) that should never be exposed externally.",
            "hint": "See the SSRF flashcard entry."
          }
        ]}
    ]
  },
  {
    "id": "google-course-3",
    "title": "Connect and Protect: Networks and Network Security",
    "description": "Network architecture, protocols, attack tactics, and security hardening techniques.",
    "isFuture": false,
    "topics": [
      {
        "id": "network-architecture",
        "moduleId": "google-course-3",
        "title": "Network Architecture Foundations",
        "description": "LAN/WAN, Hardware, IP/MAC, OSI & TCP/IP, IPv4 Packets, SDN.",
        "status": "unlocked",
        "iconType": "network",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "What is a Network?",
            "description": "A group of connected devices sharing resources. LAN (small area) vs WAN (the internet is the largest WAN). Client requests; server provides.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Network Hardware",
            "description": "Hub (broadcasts, insecure), Switch (MAC table), Router (connects networks), Modem (to ISP), Firewall (rules), WAP (Wi-Fi bridge).",
            "x": 30,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "IP & MAC Addressing",
            "description": "MAC = permanent physical hardware ID (local). IP = logical routable address. IPv4 (32-bit, exhausted) vs IPv6 (128-bit). Public vs Private IP.",
            "x": 70,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Ports & Packets",
            "description": "Ports direct traffic to services (22=SSH, 80=HTTP, 443=HTTPS). Packets = Header + Payload + Footer. TTL prevents endless loops.",
            "x": 50,
            "y": 58,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "OSI & TCP/IP",
            "description": "OSI = 7-layer diagnostic model. TCP/IP = 4-layer practical model. Attacks map to layers (L3 IP spoofing, L7 SQL injection).",
            "x": 25,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-6",
            "label": "TCP vs UDP",
            "description": "TCP: connection-oriented, 3-way handshake, guarantees delivery. UDP: connectionless, fast, no guarantee. SYN handshake exploited by SYN floods.",
            "x": 75,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-7",
            "label": "Cloud & SDN",
            "description": "IaaS, PaaS, SaaS service models. SDN controls routing via software/API — isolate a compromised pod instantly, but the controller is a high-value target.",
            "x": 50,
            "y": 95,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "LAN spans a small area (home, office); WAN spans large areas — the internet is the largest WAN ever built",
          "Hub broadcasts to ALL ports (insecure); Switch uses a MAC address table to send data only to the intended device",
          "MAC address is the permanent physical hardware ID (local delivery); IP address is the logical routable address (can change)",
          "IPv4 is 32-bit (4.3 billion addresses, exhausted); IPv6 is 128-bit (340 undecillion addresses)",
          "Ports direct traffic to specific services: 22=SSH, 53=DNS, 80=HTTP, 443=HTTPS, 67/68=DHCP",
          "Every packet has a Header (routing info + TTL), Payload (data), and Footer (CRC checksum); TTL prevents endless loops",
          "OSI is the 7-layer diagnostic model; TCP/IP is the 4-layer practical implementation the internet actually runs on",
          "TCP is connection-oriented with a 3-way handshake and guaranteed delivery; UDP is connectionless, fast, with no guarantees"
        ],
        "quiz": [
          {
            "id": "q1-gc3m1-lanwan",
            "question": "What is the difference between a LAN and a WAN?",
            "type": "text",
            "correctAnswer": "LAN = Local Area Network (home, office, building). WAN = Wide Area Network (city, country, globe). The internet is the largest WAN.",
            "hint": "See the What is a Network? table."
          },
          {
            "id": "q2-gc3m1-hubswitch",
            "question": "What is the difference between a hub and a switch?",
            "type": "text",
            "correctAnswer": "Hub: broadcasts data to ALL ports -- insecure, replaced. Switch: uses a MAC address table to send data ONLY to the specific intended device.",
            "hint": "Check the Network Hardware section."
          },
          {
            "id": "q3-gc3m1-macip",
            "question": "What is the difference between a MAC address and an IP address?",
            "type": "text",
            "correctAnswer": "MAC = permanent physical hardware ID (for local delivery within a LAN). IP = logical network address (for routing across different networks). MAC never changes; IP can.",
            "hint": "See the MAC vs IP diagram."
          },
          {
            "id": "q4-gc3m1-osi",
            "question": "Name all 7 OSI layers in order.",
            "type": "text",
            "correctAnswer": "1-Physical, 2-Data Link, 3-Network, 4-Transport, 5-Session, 6-Presentation, 7-Application.",
            "hint": "See the OSI vs TCP/IP diagram."
          },
          {
            "id": "q5-gc3m1-tcpudp",
            "question": "What is the key difference between TCP and UDP?",
            "type": "text",
            "correctAnswer": "TCP: connection-oriented, 3-way handshake, guarantees delivery, slower. UDP: connectionless, no guarantee, very fast. Use TCP for reliability (databases), UDP for speed (streaming, gaming).",
            "hint": "See the TCP vs UDP comparison diagram."
          }
        ]},
      {
        "id": "network-protocols-tools",
        "moduleId": "google-course-3",
        "title": "Network Operations, Protocols & Tools",
        "description": "All Protocols & Ports, Wi-Fi Security, Firewalls, Proxies, VPNs.",
        "status": "unlocked",
        "iconType": "network",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Diagnostic Workflow",
            "description": "Identify symptom → Traffic capture (tcpdump/Wireshark) → Lab recreation → Consult experts. Golden rule: never write your own encryption.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Protocols & Ports",
            "description": "Communication (TCP/UDP/HTTP/HTTPS/DNS/ARP), Management (DHCP/ICMP/SNMP), Security (SSH/SFTP/TLS), Email (POP3/IMAP/SMTP). Always use encrypted ports.",
            "x": 30,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "Wi-Fi Security",
            "description": "WEP (broken), WPA (KRACK), WPA2 (acceptable), WPA3 (best, SAE defeats KRACK). Personal (shared key) vs Enterprise (per-user RADIUS).",
            "x": 70,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Segmentation & Zones",
            "description": "Subnetting (CIDR /24) divides networks. Security zones: Internet → DMZ → Internal → Restricted. Network-level Defense in Depth.",
            "x": 50,
            "y": 58,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "Firewalls",
            "description": "Stateless (per-packet), Stateful (tracks connections), NGFW (Deep Packet Inspection + IPS), Cloud/FWaaS (vendor-hosted).",
            "x": 25,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-6",
            "label": "Proxies",
            "description": "Forward proxy (controls outbound users), Reverse proxy (shields servers, hides IPs, terminates TLS), Email proxy. NAT hides internal IPs.",
            "x": 75,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-7",
            "label": "VPNs & Encapsulation",
            "description": "Encrypted tunnel over public networks. Encapsulation wraps encrypted packet in an outer packet. Remote Access vs Site-to-Site. IPSec vs WireGuard.",
            "x": 50,
            "y": 95,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "The diagnostic workflow: Identify Symptom → Traffic Capture → Lab Recreation → Consult Experts; never write your own encryption",
          "Always use encrypted protocol ports: SSH (22), HTTPS (443), SMTP (587), POP3 (995), IMAP (993) — never their plaintext versions",
          "Wi-Fi standards: WEP (broken, never use), WPA (KRACK-vulnerable), WPA2 (acceptable), WPA3 (best — SAE eliminates KRACK)",
          "WPA2/WPA3 Personal uses one shared passphrase; Enterprise gives each user unique RADIUS credentials (required for corporate)",
          "Network segmentation + subnetting (CIDR) isolate zones: Internet → DMZ → Internal → Restricted, limiting an attacker's blast radius",
          "Firewalls: Stateless (per-packet), Stateful (tracks connections), NGFW (Deep Packet Inspection + IPS), Cloud/FWaaS",
          "Forward proxy controls outbound user traffic; reverse proxy shields internal servers (hides IPs, terminates TLS, load balances); NAT hides internal IPs",
          "A VPN uses encapsulation to wrap an encrypted packet inside an outer packet; IPSec is the battle-tested standard, WireGuard the modern lightweight one"
        ],
        "quiz": [
          {
            "id": "q1-gc3m2-wifi",
            "question": "What are the 4 Wi-Fi security standards and which should you use?",
            "type": "text",
            "correctAnswer": "WEP (1999, broken -- never use), WPA (2003, KRACK vulnerable -- avoid), WPA2 (2004, acceptable with strong passphrase), WPA3 (2018, best -- use everywhere possible). WPA3 uses SAE to defeat KRACK.",
            "hint": "See the Wi-Fi Security Protocols table."
          },
          {
            "id": "q2-gc3m2-ports",
            "question": "Which common ports should you memorize?",
            "type": "text",
            "correctAnswer": "22=SSH, 25/587=SMTP, 53=DNS, 80=HTTP, 110/995=POP3, 143/993=IMAP, 443=HTTPS, 67/68=DHCP.",
            "hint": "Check the protocol reference tables."
          },
          {
            "id": "q3-gc3m2-firewalls",
            "question": "What is the difference between stateless, stateful, and NGFW firewalls?",
            "type": "text",
            "correctAnswer": "Stateless: inspects each packet independently, fast, no memory. Stateful: tracks connection state, allows reply traffic automatically. NGFW: Deep Packet Inspection, application-aware, integrated IPS.",
            "hint": "See the Firewalls Deep Dive table."
          },
          {
            "id": "q4-gc3m2-proxy",
            "question": "What is the difference between a forward proxy and a reverse proxy?",
            "type": "text",
            "correctAnswer": "Forward proxy controls and logs outbound internet access from internal users. Reverse proxy shields internal servers from direct internet exposure (hides IPs, terminates TLS, load balances).",
            "hint": "See the Proxy Servers section."
          },
          {
            "id": "q5-gc3m2-vpn",
            "question": "How does a VPN protect data, and what is encapsulation?",
            "type": "text",
            "correctAnswer": "A VPN creates an encrypted tunnel over a public network. Encapsulation wraps the encrypted original packet inside a new outer packet with standard routing headers, so intercepted packets are unreadable ciphertext.",
            "hint": "See the VPN Encapsulation diagram."
          }
        ]},
      {
        "id": "attack-tactics",
        "moduleId": "google-course-3",
        "title": "Attack Tactics & Intrusion Methods",
        "description": "DoS/DDoS, Packet Sniffing, IP Spoofing, tcpdump, Incident Reports.",
        "status": "unlocked",
        "iconType": "sword",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Threat Landscape & 3Cs",
            "description": "Motivations: financial gain, espionage, political disruption, public safety. The 3Cs incident mindset: Command, Control, Communications.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "DoS / DDoS / Botnet",
            "description": "DoS overwhelms a resource. DDoS = same from thousands of bots (a botnet run by a bot-herder via C2). SYN Flood, ICMP Flood, Ping of Death.",
            "x": 30,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "Packet Sniffing",
            "description": "Capturing traffic. Passive (silently reads via promiscuous mode) vs Active (modifies packets via ARP poisoning). Defence: TLS/HTTPS, VPN, switches.",
            "x": 70,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "IP Spoofing & MitM",
            "description": "IP spoofing forges the source IP. On-Path (MitM) intercepts/modifies traffic. Replay reuses captured auth. Smurf = spoofing + ICMP broadcast amplification.",
            "x": 50,
            "y": 60,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "tcpdump & Reports",
            "description": "tcpdump captures live packets; flags [S]/[.]/[P]/[F]/[R]/[S.]. Incident reports document timestamp, affected systems, evidence, root cause.",
            "x": 25,
            "y": 85,
            "connections": []
          },
          {
            "id": "node-6",
            "label": "Advanced Attacks",
            "description": "Smurf (amplified ICMP flood), Replay (retransmit captured tokens), On-Path/MitM. Defences: DNSSEC, HSTS, nonces/timestamps, ingress filtering.",
            "x": 75,
            "y": 85,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "Attack motivations: financial gain, corporate espionage, political disruption, and public safety attacks on critical infrastructure",
          "The 3Cs framework for active incidents: Command (someone in charge), Control (focus the team), Communications (report before executing)",
          "DoS overwhelms a resource; DDoS does the same from thousands of bots (a botnet controlled by a bot-herder via a C2 server)",
          "SYN Flood sends SYN packets without the final ACK, exhausting the server's connection table (2016 GitHub: 1.35 Tbps)",
          "Ping of Death sends ICMP packets exceeding 65,535 bytes to overflow the target's buffer on reassembly",
          "Passive sniffing silently reads traffic (promiscuous mode); active sniffing modifies packets (ARP poisoning). Defence: TLS/HTTPS, VPN, switches",
          "IP spoofing forges the source IP to bypass firewall rules; the attacker can't receive replies (they go to the real IP owner)",
          "tcpdump flags to know: [S]=SYN, [.]=ACK, [P]=PSH, [F]=FIN, [R]=RST, [S.]=SYN-ACK — thousands of [S]/sec = SYN flood"
        ],
        "quiz": [
          {
            "id": "q1-gc3m3-dos",
            "question": "What is a SYN Flood attack?",
            "type": "text",
            "correctAnswer": "Sends millions of SYN packets without completing the handshake (no ACK). The server reserves resources for each half-open connection until its connection table fills up, blocking all legitimate users.",
            "hint": "See the SYN Flood Attack diagram."
          },
          {
            "id": "q2-gc3m3-spoof",
            "question": "What is IP Spoofing and its main limitation?",
            "type": "text",
            "correctAnswer": "Forging the SOURCE IP field in a packet to impersonate a trusted IP address (bypasses IP-based firewall rules). Limitation: the attacker cannot receive replies -- they go to the real owner of the spoofed IP.",
            "hint": "See the IP Spoofing Explained note."
          },
          {
            "id": "q3-gc3m3-sniff",
            "question": "What is the difference between passive and active packet sniffing?",
            "type": "text",
            "correctAnswer": "Passive: silently reads traffic without modifying it (requires a promiscuous-mode NIC). Active: intercepts AND modifies packets in transit (requires ARP poisoning or traffic injection).",
            "hint": "See the Passive vs Active Packet Sniffing diagram."
          },
          {
            "id": "q4-gc3m3-3cs",
            "question": "What is the 3Cs framework for incident response?",
            "type": "text",
            "correctAnswer": "Command (someone must be affirmatively in charge), Control (the leader aligns the team on the mission), Communications (responders must communicate findings and proposed actions to command BEFORE executing them).",
            "hint": "See the 3Cs Framework key concept."
          },
          {
            "id": "q5-gc3m3-smurf",
            "question": "What is a Smurf attack?",
            "type": "text",
            "correctAnswer": "IP spoofing + ICMP flood. The attacker spoofs the victim's IP, then broadcasts an ICMP ping to the entire network; every device replies, flooding the victim. Amplification factor = number of devices.",
            "hint": "See the Smurf Attack section."
          }
        ]},
      {
        "id": "security-hardening",
        "moduleId": "google-course-3",
        "title": "Security Hardening & Defense",
        "description": "OS Hardening, Patch Mgmt, Brute Force, IDS/IPS, Cloud Security.",
        "status": "unlocked",
        "iconType": "shield",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Security Hardening",
            "description": "Continuous process of shrinking the attack surface — every unnecessary port, default credential, and unpatched library is an entry point.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Defense-in-Depth",
            "description": "5 layers: Physical, Network, OS, Application, Cloud. No single failure = total compromise; the attacker must defeat EVERY layer.",
            "x": 30,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "OS Hardening",
            "description": "Patch management (CRITICAL patches in 24-48h), baseline configurations (known-good state), strong authentication (password policy + MFA).",
            "x": 70,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Credential Attacks",
            "description": "Simple Brute Force, Dictionary, Credential Stuffing, Rainbow Table. Defences: long passwords, lockout, MFA, and salting. Test in VMs/sandboxes.",
            "x": 50,
            "y": 60,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "Network Hardening",
            "description": "Port filtering (default DENY ALL), segmentation (VLANs contain breaches), IDS (passive alerts) vs IPS (inline blocks). SIEM correlates both.",
            "x": 25,
            "y": 85,
            "connections": []
          },
          {
            "id": "node-6",
            "label": "Cloud Hardening",
            "description": "Shared Responsibility Model (CSP vs customer), hypervisor & VM escape risks, cloud crypto (encryption at rest/in transit, HSM/TPM, crypto-shredding).",
            "x": 75,
            "y": 85,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "Security hardening is the continuous process of shrinking the attack surface — the total set of all possible entry points",
          "Defense-in-Depth layers 5 controls (Physical, Network, OS, Application, Cloud) so no single failure causes total compromise",
          "Patch priority by CVSS: CRITICAL (9.0-10.0) in 24-48h, HIGH (7.0-8.9) in 1 week, MEDIUM in 30 days, LOW in 90 days",
          "A baseline configuration is the documented 'known-good state'; any deviation (e.g., an unexpected open port 4444) is a red flag",
          "MFA combines two of: something you know, have, or are — it blocks 99.9% of automated credential attacks",
          "Brute-force types: Simple, Dictionary, Credential Stuffing, Rainbow Table — salting defeats rainbow tables by making each hash unique",
          "IDS is passive (reads a copy, alerts only); IPS is inline (sits in the traffic path and drops malicious packets automatically)",
          "Cloud Shared Responsibility: the CSP secures physical hardware and hypervisors; the customer secures data, apps, patches, IAM, and encryption keys"
        ],
        "quiz": [
          {
            "id": "q1-gc3m4-did",
            "question": "What is Defense-in-Depth and its 5 layers?",
            "type": "text",
            "correctAnswer": "Layering multiple security controls so no single failure leads to total compromise. The 5 layers are Physical, Network, OS, Application, and Cloud hardening.",
            "hint": "See the Defense-in-Depth diagram."
          },
          {
            "id": "q2-gc3m4-patch",
            "question": "How quickly must CRITICAL (CVSS 9.0-10.0) patches be applied and why?",
            "type": "text",
            "correctAnswer": "Within 24-48 hours as an emergency change, because they are actively weaponized within hours of disclosure. WannaCry exploited a critical patch available for 2 months.",
            "hint": "See the Patch Management priority table."
          },
          {
            "id": "q3-gc3m4-rainbow",
            "question": "How do you defeat a rainbow table attack?",
            "type": "text",
            "correctAnswer": "Password SALTING: add a random unique value to each password before hashing. This makes every hash unique, rendering pre-computed rainbow tables useless.",
            "hint": "See the Brute Force Attack Types table."
          },
          {
            "id": "q4-gc3m4-idsips",
            "question": "What is the key difference between IDS and IPS?",
            "type": "text",
            "correctAnswer": "IDS is PASSIVE — reads a copy of traffic and generates alerts, does not stop attacks, zero performance impact. IPS is INLINE — sits in the actual traffic path and automatically drops malicious packets.",
            "hint": "See the IDS vs IPS diagram."
          },
          {
            "id": "q5-gc3m4-shared",
            "question": "What is the cloud Shared Responsibility Model?",
            "type": "text",
            "correctAnswer": "The CSP secures physical hardware, data centers, and hypervisors. The customer secures their data, applications, OS patches, IAM configurations, firewall rules, and encryption keys. Misconfiguring the customer layer = your breach.",
            "hint": "See the Shared Responsibility Model diagram."
          }
        ]},
      {
        "id": "mystery-chest-gc3",
        "moduleId": "google-course-3",
        "title": "Mystery Chest",
        "description": "Quick revision of all Course 3 concepts.",
        "status": "unlocked",
        "iconType": "chest",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Architecture & Hardware",
            "description": "LAN/WAN, Hub/Switch/Router/Modem/Firewall/WAP, MAC vs IP, IPv4/IPv6, Public/Private IP, packets & TTL.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "OSI/TCP-IP & Ports",
            "description": "7-layer OSI vs 4-layer TCP/IP, TCP vs UDP, 3-way handshake, protocols & ports (22/53/80/443), Wi-Fi (WEP→WPA3).",
            "x": 25,
            "y": 45,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "Attacks & Sniffing",
            "description": "DoS/DDoS/Botnet, SYN Flood, Ping of Death, passive/active sniffing, IP spoofing, MitM, Replay, Smurf, tcpdump.",
            "x": 75,
            "y": 45,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Hardening & Defense",
            "description": "Defense-in-Depth (5 layers), patch management, MFA, brute-force defences, segmentation, IDS vs IPS, cloud shared responsibility.",
            "x": 50,
            "y": 65,
            "connections": ["node-5"]
          },
          {
            "id": "node-5",
            "label": "Master Glossary",
            "description": "All key Course 3 terms A–Z: ARP, CIDR, DMZ, Encapsulation, NAT, NGFW, SDN, VM Escape, WPA3, and more.",
            "x": 50,
            "y": 90,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "LAN vs WAN; Hub broadcasts (insecure) vs Switch uses a MAC table; Router connects networks; the internet is the largest WAN",
          "MAC = permanent physical ID; IP = logical routable address. IPv4 (32-bit, exhausted) vs IPv6 (128-bit)",
          "OSI is the 7-layer diagnostic model; TCP/IP is the 4-layer practical model. TCP guarantees delivery via 3-way handshake; UDP is fast and connectionless",
          "Key ports: 22=SSH, 53=DNS, 80=HTTP, 443=HTTPS, 67/68=DHCP. Wi-Fi: WPA3 is best (SAE defeats KRACK)",
          "DoS/DDoS via botnets; SYN Flood exhausts the connection table; passive vs active sniffing; IP spoofing forges the source IP",
          "Defense-in-Depth layers Physical, Network, OS, Application, and Cloud controls so no single failure = total compromise",
          "Patch CRITICAL vulns in 24-48h; MFA blocks 99.9% of credential attacks; salting defeats rainbow tables",
          "IDS is passive (alerts); IPS is inline (blocks). Cloud Shared Responsibility: CSP secures hardware, customer secures data/apps/config"
        ],
        "quiz": [
          {
            "id": "q1-gc3mc-osi",
            "question": "Name all 7 OSI layers in order and the 4 TCP/IP layers.",
            "type": "text",
            "correctAnswer": "OSI: 1-Physical, 2-Data Link, 3-Network, 4-Transport, 5-Session, 6-Presentation, 7-Application. TCP/IP: 1-Network Access, 2-Internet, 3-Transport, 4-Application.",
            "hint": "See the OSI/TCP-IP flashcard entries."
          },
          {
            "id": "q2-gc3mc-handshake",
            "question": "What is the TCP Three-Way Handshake?",
            "type": "text",
            "correctAnswer": "SYN (client initiates) -> SYN-ACK (server acknowledges and responds) -> ACK (client confirms). Connection established. Exploited by SYN Flood attacks.",
            "hint": "Check the handshake flashcard entry."
          },
          {
            "id": "q3-gc3mc-vpn",
            "question": "How does a VPN protect data?",
            "type": "text",
            "correctAnswer": "Encapsulation: the original packet is encrypted, then wrapped inside a new outer packet with standard routing headers. Traffic travels through an encrypted tunnel -- intercepted packets are unreadable ciphertext.",
            "hint": "See the VPN flashcard entry."
          },
          {
            "id": "q4-gc3mc-idsips",
            "question": "IDS vs. IPS -- what is the key difference?",
            "type": "text",
            "correctAnswer": "IDS: PASSIVE. Reads a copy of traffic, generates alerts, does not stop attacks, zero performance impact. IPS: INLINE. Sits in the actual traffic path and automatically drops malicious packets.",
            "hint": "See the IDS vs IPS flashcard entry."
          },
          {
            "id": "q5-gc3mc-segmentation",
            "question": "What is network segmentation and why does it matter?",
            "type": "text",
            "correctAnswer": "Divides a flat network into isolated subnets separated by firewalls. If one segment is breached, the attacker cannot freely move to others -- limiting blast radius. The 2013 Target breach would have been contained by proper segmentation.",
            "hint": "See the network segmentation flashcard entry."
          }
        ]}
    ]
  },
  {
    "id": "google-course-4",
    "title": "Tools of the Trade: Linux and SQL",
    "description": "Operating systems, Linux architecture, Bash commands, and relational databases with SQL.",
    "isFuture": false,
    "topics": [
      {
        "id": "intro-operating-systems",
        "moduleId": "google-course-4",
        "title": "Introduction to Operating Systems",
        "description": "What is an OS, Boot Process, GUI vs CLI, Virtualization, Legacy OS.",
        "status": "unlocked",
        "iconType": "network",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "What is an OS?",
            "description": "Core software bridging USER and HARDWARE. Translates human actions into binary. Manages CPU, RAM, storage, I/O. Layers: User -> Application -> OS -> Hardware.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "OS Comparison",
            "description": "Windows (proprietary, most targeted), macOS, Linux (open-source, 96% of servers), ChromeOS, Android, iOS.",
            "x": 30,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "Legacy OS Risk",
            "description": "Outdated OS with no security patches. New vulnerabilities stay permanently unfixed (WannaCry hit Windows XP). Mitigate: air-gap, segment, monitor.",
            "x": 70,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Boot Process",
            "description": "Power On -> Firmware (BIOS/UEFI) -> Bootloader -> OS Init. UEFI adds Secure Boot. Firmware malware survives disk wipes.",
            "x": 50,
            "y": 58,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "Task Cycle & Resources",
            "description": "Every action: User -> App -> OS -> Hardware -> back up. OS manages CPU, RAM, Storage, I/O. Task Manager/top reveals malware (high CPU).",
            "x": 25,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-6",
            "label": "Virtualization",
            "description": "Hypervisor runs multiple isolated VMs. Type 1 (bare-metal: ESXi, KVM) vs Type 2 (hosted: VirtualBox). Used for malware sandboxing and pentest labs.",
            "x": 75,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-7",
            "label": "GUI vs CLI",
            "description": "CLI preferred by analysts: faster, scriptable, auto-logs to ~/.bash_history (forensics), full remote access via SSH.",
            "x": 50,
            "y": 95,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "An OS bridges user and hardware, translating human actions into binary instructions and managing CPU, RAM, storage, and I/O",
          "Linux is completely open-source and powers 96%+ of servers; Windows is the most-targeted OS due to market share",
          "A Legacy OS receives no more security patches, so new vulnerabilities stay permanently unfixed (WannaCry exploited Windows XP)",
          "Boot sequence: Power On -> Firmware (BIOS/UEFI) -> Bootloader -> OS Init; UEFI adds Secure Boot and firmware malware survives disk wipes",
          "Every computer action follows the 4-part cycle: User -> Application -> OS -> Hardware -> back up",
          "A hypervisor runs isolated VMs; Type 1 (bare-metal, e.g., KVM/ESXi) is more secure than Type 2 (hosted, e.g., VirtualBox)",
          "Analysts prefer CLI over GUI for speed, automation, automatic command history (forensics), and remote SSH management",
          "The bash history file (~/.bash_history) lets investigators reconstruct exactly what an attacker did on a compromised system"
        ],
        "quiz": [
          {
            "id": "q1-gc4m1-os",
            "question": "What does an operating system do?",
            "type": "text",
            "correctAnswer": "Bridges user and hardware. Translates human actions into binary hardware instructions. Manages CPU, RAM, storage, and I/O resources.",
            "hint": "See the What is an Operating System? section."
          },
          {
            "id": "q2-gc4m1-legacy",
            "question": "What is the security risk of a Legacy OS?",
            "type": "text",
            "correctAnswer": "No more security patches. New vulnerabilities discovered after end-of-support are permanently unfixed. Attackers actively target known legacy OS exploits (e.g., WannaCry on Windows XP).",
            "hint": "See The Danger of Legacy Operating Systems."
          },
          {
            "id": "q3-gc4m1-bios",
            "question": "What is the difference between BIOS and UEFI?",
            "type": "text",
            "correctAnswer": "BIOS: older (pre-2007), 16-bit, limited security. UEFI: modern, 64-bit, Secure Boot feature, faster, supports larger disks.",
            "hint": "See the Boot Process section."
          },
          {
            "id": "q4-gc4m1-hypervisor",
            "question": "What is a hypervisor, and how do Type 1 and Type 2 differ?",
            "type": "text",
            "correctAnswer": "Software that creates and manages Virtual Machines. Type 1 (bare-metal, more secure) runs directly on hardware. Type 2 (hosted) runs inside an OS.",
            "hint": "See the Virtualization Technology section."
          },
          {
            "id": "q5-gc4m1-cli",
            "question": "Why do analysts prefer CLI over GUI?",
            "type": "text",
            "correctAnswer": "Speed of complex operations, infinite automation via scripts, automatic command history logging (forensics), and full remote server management via SSH.",
            "hint": "See the GUI vs. CLI section."
          }
        ]},
      {
        "id": "linux-operating-system",
        "moduleId": "google-course-4",
        "title": "The Linux Operating System",
        "description": "Linux Architecture, Distros, Shell Types, Package Managers, stdin/stdout/stderr.",
        "status": "unlocked",
        "iconType": "network",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Why Linux",
            "description": "96%+ of web servers, all major cloud, security distros (Kali/Parrot), every major tool. Analysts use it daily for logs, IAM, pentesting, forensics.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Linux History",
            "description": "1983 Stallman starts GNU (tools, no kernel). 1991 Torvalds writes the kernel under GPL. GNU + Linux kernel = complete free OS.",
            "x": 30,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "6-Layer Architecture",
            "description": "User -> Application -> Shell -> FHS -> Kernel -> Hardware. The Kernel is the core engine (scheduling, memory, drivers, security).",
            "x": 70,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Distributions",
            "description": "Debian family (Ubuntu, Kali, Parrot) uses APT. Red Hat family (RHEL, AlmaLinux) uses YUM/DNF. Always run Kali in a VM.",
            "x": 50,
            "y": 58,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "Package Managers",
            "description": "APT (Debian .deb) vs YUM/DNF (Red Hat .rpm). 'sudo apt update && apt upgrade' applies all security patches and auto-resolves dependencies.",
            "x": 25,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-6",
            "label": "Shells & Prompt",
            "description": "Bash (default, $), Zsh (%), Csh/Tcsh, Ksh, Fish. Prompt shows user@host:dir. $ = regular user, # = ROOT (maximum privileges).",
            "x": 75,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-7",
            "label": "Standard Streams",
            "description": "stdin (0) input, stdout (1) success output (redirect with >), stderr (2) errors (redirect with 2>).",
            "x": 50,
            "y": 95,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "Linux powers 96%+ of the world's top web servers and is the foundation of nearly all cybersecurity tooling",
          "Linus Torvalds wrote the kernel (1991); combined with Stallman's GNU tools under the GPL license it forms a complete free OS",
          "The 6 Linux architecture layers: User -> Application -> Shell -> FHS -> Kernel -> Hardware",
          "The Kernel is the core engine: process scheduling, RAM allocation, hardware drivers, system calls, and security enforcement",
          "Kali (pentesting/forensics, run in a VM) vs Ubuntu (user-friendly, general use); Debian family uses APT, Red Hat family uses YUM/DNF",
          "'sudo apt update && sudo apt upgrade -y' fetches and installs all pending security patches",
          "The prompt shows user@host:dir — $ means a regular user, # means ROOT (maximum privileges, be very careful)",
          "Three standard streams: stdin (0) input, stdout (1) success output (>), stderr (2) errors (2>)"
        ],
        "quiz": [
          {
            "id": "q1-gc4m2-history",
            "question": "Who created Linux and what is its license?",
            "type": "text",
            "correctAnswer": "Linus Torvalds created the kernel (1991). GNU tools by Richard Stallman. Combined as GNU/Linux. Licensed under GPL -- free to use, modify, and distribute.",
            "hint": "See the Brief History section."
          },
          {
            "id": "q2-gc4m2-layers",
            "question": "Name the 6 Linux architecture layers.",
            "type": "text",
            "correctAnswer": "User -> Application -> Shell -> FHS -> Kernel -> Hardware. Each layer passes instructions to the one below it.",
            "hint": "See the Linux Architecture — Six Layers diagram."
          },
          {
            "id": "q3-gc4m2-apt",
            "question": "What is the difference between APT and YUM?",
            "type": "text",
            "correctAnswer": "APT: Debian family (Kali, Ubuntu). YUM/DNF: Red Hat family (RHEL, AlmaLinux). Both install packages and auto-resolve dependencies.",
            "hint": "See the Package Managers section."
          },
          {
            "id": "q4-gc4m2-prompt",
            "question": "What is the difference between $ and # in the shell prompt?",
            "type": "text",
            "correctAnswer": "$ = regular user (limited permissions). # = root/superuser (maximum privileges -- every command has full system access).",
            "hint": "See the Reading Your Shell Prompt tip."
          },
          {
            "id": "q5-gc4m2-streams",
            "question": "What are stdin, stdout, and stderr?",
            "type": "text",
            "correctAnswer": "stdin (0): your typed input. stdout (1): successful command output shown on screen (redirect with >). stderr (2): error messages (redirect with 2>).",
            "hint": "See the Standard Streams diagram."
          }
        ]},
      {
        "id": "linux-bash-commands",
        "moduleId": "google-course-4",
        "title": "Linux Commands in the Bash Shell",
        "description": "Navigation, File Ops, Permissions, User Mgmt, grep/find/pipe, Getting Help.",
        "status": "unlocked",
        "iconType": "network",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "FHS & Paths",
            "description": "Linux is 100% case-sensitive. Directory tree (/home, /bin, /etc, /var, /tmp). Absolute (from /) vs relative (from current) paths; ~ . ..",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Navigation & Reading",
            "description": "pwd, ls (-a -l -la), cd. Read files: cat, head/tail (-f follow live logs), less (paged).",
            "x": 30,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "File Management",
            "description": "mkdir, rmdir, touch, rm (-r), cp (-r), mv (move/rename), nano. Output redirection: > overwrites, >> appends.",
            "x": 70,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "grep / find / pipe",
            "description": "grep searches INSIDE files (-i -r -n -v -c). find searches the FILESYSTEM (-name -mtime -perm -size). Pipe | chains commands.",
            "x": 50,
            "y": 58,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "Permissions",
            "description": "10-char string (type + rwx for owner/group/other). Octal r=4 w=2 x=1. chmod changes permissions, chown changes owner. Least Privilege.",
            "x": 25,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-6",
            "label": "User Management",
            "description": "sudo (one command as root, logged). useradd (-m -g -G), usermod (-aG append!, -L lock), userdel (-r). id, whoami, /etc/passwd.",
            "x": 75,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-7",
            "label": "Getting Help",
            "description": "man (full manual), whatis (one-line description), apropos (search man pages by keyword when you forgot the command name).",
            "x": 50,
            "y": 95,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "Linux is 100% case-sensitive; the FHS defines where files live (/home, /bin, /etc, /var, /tmp, /usr, /root, /proc)",
          "Absolute paths start from / and work anywhere; relative paths start from the current directory; ~ = home, . = current, .. = parent",
          "Navigation: pwd, ls (-a hidden, -l long, -la both), cd; read files with cat, head/tail (-f for live logs), and less",
          "grep searches INSIDE files for text patterns; find searches the FILESYSTEM by name/date/size/permissions",
          "The pipe ( | ) sends one command's output as the next command's input, enabling chained multi-step filtering",
          "Permissions are a 10-char string (type + rwx for owner/group/other); octal r=4, w=2, x=1 (e.g., chmod 600 for SSH keys)",
          "sudo runs one command as root (logged to auth.log); always use -aG with usermod to APPEND groups without wiping existing ones",
          "Get help with man (full manual), whatis (one-line summary), and apropos (search man pages by keyword)"
        ],
        "quiz": [
          {
            "id": "q1-gc4m3-pwd",
            "question": "What does pwd do, and what does ls -la show?",
            "type": "text",
            "correctAnswer": "pwd prints the working directory (your exact current location). ls -la lists ALL files including hidden dot-files in long format (permissions, owner, size, date) -- most useful for security.",
            "hint": "See the Navigation Commands section."
          },
          {
            "id": "q2-gc4m3-grepfind",
            "question": "What is the difference between grep and find?",
            "type": "text",
            "correctAnswer": "grep searches INSIDE files for lines matching a text pattern. find searches the FILESYSTEM for files/directories by name, date, size, permissions, etc.",
            "hint": "See the Finding and Filtering Data section."
          },
          {
            "id": "q3-gc4m3-pipe",
            "question": "What does the pipe ( | ) operator do?",
            "type": "text",
            "correctAnswer": "Sends the output of the first command as input to the second command. Enables chained filtering, e.g., cat auth.log | grep 'FAILED' | grep '10.0.0.5'.",
            "hint": "See the PIPE command card."
          },
          {
            "id": "q4-gc4m3-chmod",
            "question": "What does chmod 600 key.pem mean?",
            "type": "text",
            "correctAnswer": "Owner can read+write (6=rw). Group has NO access (0). Others have NO access (0). Required for SSH private keys -- SSH refuses keys with wider permissions.",
            "hint": "See the octal permissions and chmod card."
          },
          {
            "id": "q5-gc4m3-usermod",
            "question": "Why does the -a flag matter in 'usermod -aG'?",
            "type": "text",
            "correctAnswer": "Without -a, all existing supplemental groups are REPLACED by the new one. With -aG, the new group is APPENDED and existing groups are preserved. Forgetting -a causes accidental privilege removal.",
            "hint": "See the CRITICAL: Always use -a with -G callout."
          }
        ]},
      {
        "id": "databases-sql",
        "moduleId": "google-course-4",
        "title": "Relational Databases and SQL",
        "description": "Databases, Primary/Foreign Keys, SELECT/FROM, WHERE, JOINs, Aggregate Functions.",
        "status": "unlocked",
        "iconType": "network",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Databases & Keys",
            "description": "Organized data for many users/millions of rows. Relational tables linked by keys. Primary Key (unique, non-NULL, one per table) vs Foreign Key (links to a PK, allows duplicates/NULLs).",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "SELECT / FROM",
            "description": "SELECT chooses columns (* = all), FROM chooses the table. End with a semicolon. Keywords in ALL CAPS by convention.",
            "x": 30,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "WHERE & LIKE",
            "description": "WHERE filters rows by condition. Strings/dates in single quotes, numbers unquoted. LIKE + wildcards: % = any chars, _ = exactly one char.",
            "x": 70,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Logical Operators",
            "description": "AND (both true, narrows), OR (either true, broadens), NOT (exclude), BETWEEN (inclusive range). Combine multiple conditions.",
            "x": 50,
            "y": 58,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "Sorting & Aggregates",
            "description": "ORDER BY col ASC/DESC. Aggregates: COUNT, AVG, SUM, MIN, MAX -- math across entire columns (e.g., COUNT(*) of failed logins).",
            "x": 25,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-6",
            "label": "JOINs",
            "description": "INNER (match in both), LEFT (all left + matches), RIGHT (all right + matches), FULL OUTER (everything). Use dot notation for shared columns.",
            "x": 75,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-7",
            "label": "Full Query Structure",
            "description": "Mandatory clause order: SELECT -> FROM -> JOIN -> WHERE -> ORDER BY -> LIMIT.",
            "x": 50,
            "y": 95,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "A database stores millions of rows for many concurrent users; one SQL query finds the few suspicious events in seconds",
          "A Primary Key is unique and non-NULL (one per table); a Foreign Key references another table's PK (can have duplicates/NULLs) and links tables",
          "SELECT chooses columns (* = all), FROM chooses the table; always end a query with a semicolon",
          "WHERE filters rows; strings and dates use single quotes, numbers never do; LIKE uses % (any chars) and _ (exactly one char)",
          "Logical operators: AND (both true, narrows), OR (either true, broadens), NOT (exclude), BETWEEN (inclusive range)",
          "ORDER BY sorts (ASC/DESC); aggregate functions COUNT, AVG, SUM, MIN, MAX perform math across entire columns",
          "JOIN types: INNER (match in both), LEFT (all left + matches), RIGHT (all right + matches), FULL OUTER (all rows from both)",
          "Mandatory clause order: SELECT -> FROM -> JOIN -> WHERE -> ORDER BY -> LIMIT"
        ],
        "quiz": [
          {
            "id": "q1-gc4m4-pk",
            "question": "What is a Primary Key, and how does it differ from a Foreign Key?",
            "type": "text",
            "correctAnswer": "Primary Key: a column with a unique, non-NULL value in every row that uniquely identifies each record (one per table). Foreign Key: references another table's PK to link tables; can have duplicates and NULLs.",
            "hint": "See the relational database diagram."
          },
          {
            "id": "q2-gc4m4-select",
            "question": "What does SELECT * FROM employees; return?",
            "type": "text",
            "correctAnswer": "Returns ALL columns from every row in the employees table. The * wildcard means all columns. The semicolon ends the statement.",
            "hint": "See the SELECT & FROM section."
          },
          {
            "id": "q3-gc4m4-like",
            "question": "What is the difference between LIKE 'East%' and LIKE 'N_'?",
            "type": "text",
            "correctAnswer": "'East%' = starts with 'East' followed by ANY number of characters. 'N_' = starts with N followed by EXACTLY ONE character.",
            "hint": "See Pattern Matching with LIKE."
          },
          {
            "id": "q4-gc4m4-andor",
            "question": "What is the difference between the AND and OR operators?",
            "type": "text",
            "correctAnswer": "AND: BOTH conditions must be true (narrows results). OR: EITHER condition can be true (broadens results).",
            "hint": "See the Logical Operators section."
          },
          {
            "id": "q5-gc4m4-join",
            "question": "What is the difference between an INNER JOIN and a LEFT JOIN?",
            "type": "text",
            "correctAnswer": "INNER JOIN: only rows with a match in BOTH tables. LEFT JOIN: ALL rows from the left table plus matching rows from the right (NULLs where no match). Use LEFT JOIN to find employees without machines.",
            "hint": "See the Four Join Types diagram."
          }
        ]},
      {
        "id": "mystery-chest-gc4",
        "moduleId": "google-course-4",
        "title": "Mystery Chest",
        "description": "Quick revision of all Course 4 concepts.",
        "status": "unlocked",
        "iconType": "chest",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "OS Fundamentals",
            "description": "OS bridges user & hardware. Boot (BIOS/UEFI), Legacy OS risk, virtualization (Type 1/2 hypervisors), GUI vs CLI.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Linux System",
            "description": "6-layer architecture, distros (Kali/Ubuntu/RHEL), package managers (APT/YUM), shells, stdin/stdout/stderr.",
            "x": 25,
            "y": 45,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "Bash Commands",
            "description": "FHS & paths, navigation (pwd/ls/cd), file ops, grep/find/pipe, permissions (chmod/chown), user mgmt (sudo/useradd), help (man).",
            "x": 75,
            "y": 45,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "SQL & Databases",
            "description": "Primary/Foreign Keys, SELECT/FROM, WHERE/LIKE, AND/OR/NOT/BETWEEN, ORDER BY, aggregates, the four JOIN types.",
            "x": 50,
            "y": 65,
            "connections": ["node-5"]
          },
          {
            "id": "node-5",
            "label": "Master Glossary",
            "description": "All Course 4 terms A-Z: OS/Linux (APT, FHS, Kernel, sudo, chmod) and SQL (PK, FK, JOIN, LIKE, aggregates).",
            "x": 50,
            "y": 90,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "An OS bridges user and hardware; UEFI adds Secure Boot; Legacy OSes are permanently vulnerable; analysts favor CLI",
          "Hypervisors run isolated VMs (Type 1 bare-metal vs Type 2 hosted); always run Kali in a VM",
          "Linux 6-layer architecture: User -> Application -> Shell -> FHS -> Kernel -> Hardware; APT (Debian) vs YUM (Red Hat)",
          "$ = regular user, # = root; stdin/stdout/stderr are the three streams (redirect with >, >>, 2>)",
          "grep searches inside files, find searches the filesystem, pipe ( | ) chains commands together",
          "Permissions use rwx (octal r=4/w=2/x=1); chmod changes them, chown changes owner; always use usermod -aG to append groups",
          "SQL: Primary Key (unique) vs Foreign Key (links tables); SELECT/FROM/WHERE, LIKE wildcards % and _",
          "The four JOIN types: INNER, LEFT, RIGHT, FULL OUTER; mandatory clause order SELECT -> FROM -> JOIN -> WHERE -> ORDER BY -> LIMIT"
        ],
        "quiz": [
          {
            "id": "q1-gc4mc-cli",
            "question": "Why do security analysts prefer the CLI over the GUI?",
            "type": "text",
            "correctAnswer": "CLI is faster for complex operations, scriptable for automation, auto-logs all commands in bash_history (forensics), and allows full remote server management via SSH.",
            "hint": "See the GUI vs CLI flashcard."
          },
          {
            "id": "q2-gc4mc-layers",
            "question": "Name the 6 Linux architecture layers.",
            "type": "text",
            "correctAnswer": "User -> Application -> Shell -> FHS -> Kernel -> Hardware. Each passes instructions to the layer below it.",
            "hint": "See the Linux architecture flashcard."
          },
          {
            "id": "q3-gc4mc-pipe",
            "question": "What does the pipe ( | ) do, and how do grep and find differ?",
            "type": "text",
            "correctAnswer": "Pipe passes the output of one command as input to the next. grep searches INSIDE files for text patterns; find searches the FILESYSTEM for files by name/date/size/permissions.",
            "hint": "See the grep/find/pipe flashcards."
          },
          {
            "id": "q4-gc4mc-keys",
            "question": "What is the difference between a Primary Key and a Foreign Key?",
            "type": "text",
            "correctAnswer": "Primary Key: unique, non-NULL identifier within its own table (one per table). Foreign Key: references another table's PK to create the link between tables; can have duplicates and NULLs.",
            "hint": "See the Primary/Foreign Key flashcard."
          },
          {
            "id": "q5-gc4mc-joins",
            "question": "Describe the four JOIN types.",
            "type": "text",
            "correctAnswer": "INNER JOIN: rows matching in BOTH tables. LEFT JOIN: all left rows + matching right (NULLs otherwise). RIGHT JOIN: all right rows + matching left. FULL OUTER JOIN: all rows from both tables, NULLs where no match.",
            "hint": "See the JOIN types flashcard."
          }
        ]}
    ]
  },
  {
    "id": "google-course-5",
    "title": "Assets, Threats, and Vulnerabilities",
    "description": "Asset security, cryptography, vulnerability management, and threat modeling techniques.",
    "isFuture": false,
    "topics": [
      {
        "id": "intro-asset-security",
        "moduleId": "google-course-5",
        "title": "Introduction to Asset Security",
        "description": "CIA Triad, Assets/Threats/Vulnerabilities, Risk Assessment, Data States, NIST CSF.",
        "status": "unlocked",
        "iconType": "shield",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "CIA Triad",
            "description": "Confidentiality (authorized access), Integrity (accurate/unmodified), Availability (accessible when needed). Every security decision is measured against these three pillars.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Assets / Threats / Vulns",
            "description": "Asset = what you protect. Threat = what can harm it. Vulnerability = the weakness that a threat exploits. All three must align for a breach.",
            "x": 30,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "Risk Management",
            "description": "Risk Score = Likelihood (1-3) x Severity (1-3). Score 9 = critical, fix now. Tracked in a risk register.",
            "x": 70,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Asset Classification",
            "description": "Four levels: Restricted (highest) -> Confidential -> Internal-only -> Public (lowest). Drives access controls and handling.",
            "x": 50,
            "y": 58,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "3 States of Data",
            "description": "In Use (MFA, screen lock), In Transit (TLS/HTTPS, VPN), At Rest (full-disk/database encryption).",
            "x": 25,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-6",
            "label": "Cloud & Shared Resp.",
            "description": "IaaS/PaaS/SaaS. Provider secures infrastructure; customer secures data, apps, IAM. Misconfiguration is the #1 cloud breach cause.",
            "x": 75,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-7",
            "label": "Policies & NIST CSF",
            "description": "Policies (what/why) -> Standards (how well) -> Procedures (exactly how). NIST CSF: Govern, Identify, Protect, Detect, Respond, Recover.",
            "x": 50,
            "y": 95,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "The CIA Triad — Confidentiality, Integrity, Availability — is the yardstick for every security decision; violating any one is an incident",
          "Asset = what you protect; Threat = what can harm it; Vulnerability = the weakness a threat exploits — all three must align for a breach",
          "Risk Score = Likelihood (1-3) x Severity (1-3); a score of 9 is critical (fix now), tracked in a risk register",
          "Four asset classification levels: Restricted (highest) -> Confidential -> Internal-only -> Public (lowest)",
          "Three states of data: In Use (MFA/screen lock), In Transit (TLS/HTTPS/VPN), At Rest (disk/database encryption)",
          "The #1 cause of cloud breaches is customer misconfiguration, not the provider's infrastructure (shared responsibility)",
          "Security plan hierarchy: Policies (what/why) -> Standards (how well) -> Procedures (exactly how)",
          "NIST CSF 2.0 has 6 functions: Govern, Identify, Protect, Detect, Respond, Recover"
        ],
        "quiz": [
          {
            "id": "q1-gc5m1-cia",
            "question": "What does the CIA Triad stand for?",
            "type": "text",
            "correctAnswer": "Confidentiality (authorized access only), Integrity (data stays accurate), Availability (always accessible when needed).",
            "hint": "See the CIA Triad section."
          },
          {
            "id": "q2-gc5m1-ave",
            "question": "What is the difference between an Asset, a Vulnerability, and a Threat?",
            "type": "text",
            "correctAnswer": "Asset = what you protect (laptop). Vulnerability = the weakness (unpatched OS). Threat = what exploits it (hacker). All three must align for a breach.",
            "hint": "See The Three Elements of Security Planning."
          },
          {
            "id": "q3-gc5m1-risk",
            "question": "What is the risk formula?",
            "type": "text",
            "correctAnswer": "Risk Score = Likelihood (1-3) x Severity (1-3). Score 9 = critical. Score 1 = low priority.",
            "hint": "See Risk Management — Equation & Register."
          },
          {
            "id": "q4-gc5m1-states",
            "question": "Name the three states of data.",
            "type": "text",
            "correctAnswer": "In Use (being accessed now), In Transit (traveling over the network), At Rest (stored, not currently accessed).",
            "hint": "See The Three States of Data table."
          },
          {
            "id": "q5-gc5m1-cloud",
            "question": "What is the biggest cloud security threat?",
            "type": "text",
            "correctAnswer": "Misconfiguration by the customer -- not the provider's infrastructure, but your own IAM, storage, and network settings (shared responsibility model).",
            "hint": "See the Shared Responsibility Model section."
          }
        ]},
      {
        "id": "protecting-assets",
        "moduleId": "google-course-5",
        "title": "Protecting Organizational Assets",
        "description": "Security Controls, Cryptography, Hashing, IAM, AAA Framework, Access Models.",
        "status": "unlocked",
        "iconType": "shield",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Security Controls",
            "description": "Three categories: Technical (encryption, firewalls, MFA), Operational (training, guards, procedures), Managerial (policies, audits).",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Privacy & Roles",
            "description": "Privacy = user's right to control data; Security = protecting it. Data Owner decides access; Custodian handles/stores; Steward enforces policy.",
            "x": 30,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "PoLP & SoD",
            "description": "Principle of Least Privilege: minimum access needed. Separation of Duties: critical actions need multiple approvals -- no single person can commit fraud alone.",
            "x": 70,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Cryptography",
            "description": "Encryption (two-way): symmetric (AES, one key) vs asymmetric (RSA, public/private). Hashing (one-way): SHA-256, defeated rainbow tables via salting.",
            "x": 50,
            "y": 58,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "Data Lifecycle & Regs",
            "description": "5 stages: Collect, Store, Use, Archive, Destroy. PII/SPII/PHI protected by GDPR, HIPAA, PCI DSS.",
            "x": 25,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-6",
            "label": "AAA & Access Models",
            "description": "Authentication (who?), Authorization (what can you do?), Accounting (what did you do?). Models: MAC (admin), DAC (owner), RBAC (role).",
            "x": 75,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-7",
            "label": "IAM (SSO / OAuth)",
            "description": "SSO: one login for all apps (SAML/LDAP) — combine with MFA. OAuth: share access via API tokens without sharing passwords.",
            "x": 50,
            "y": 95,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "Three security control categories: Technical (encryption/firewalls/MFA), Operational (training/guards/procedures), Managerial (policies/audits)",
          "Privacy is the user's RIGHT to control their data; Security is PROTECTING that data — different goals that work together",
          "Data governance roles: Owner (decides access), Custodian (handles/stores), Steward (enforces policy)",
          "Symmetric encryption (AES) uses one key and is fast; asymmetric (RSA) uses public/private keys for secure exchange; HTTPS uses both",
          "Hashing is one-way (SHA-256); salting adds a random string before hashing to defeat rainbow tables and duplicate hashes",
          "Principle of Least Privilege grants minimum access; Separation of Duties requires multiple approvals so no one can commit fraud alone",
          "The AAA framework: Authentication (who are you?), Authorization (what can you do?), Accounting (what did you do?)",
          "Access models: MAC (admin controls all, military), DAC (data owner controls, Google Docs), RBAC (job role determines access, enterprise)"
        ],
        "quiz": [
          {
            "id": "q1-gc5m2-controls",
            "question": "What are the 3 categories of security controls?",
            "type": "text",
            "correctAnswer": "Technical (encryption, firewalls, MFA), Operational (training, guards, procedures), Managerial (policies, risk assessments, audits).",
            "hint": "See the Security Controls table."
          },
          {
            "id": "q2-gc5m2-crypto",
            "question": "What is the difference between symmetric and asymmetric encryption?",
            "type": "text",
            "correctAnswer": "Symmetric: one key for both encrypt/decrypt, fast, key sharing is risky (AES). Asymmetric: public key encrypts, private key decrypts, slower but secure exchange (RSA).",
            "hint": "See the Symmetric vs Asymmetric diagram."
          },
          {
            "id": "q3-gc5m2-salting",
            "question": "What is salting and why is hashing one-way?",
            "type": "text",
            "correctAnswer": "Salting adds a random string to a password before hashing so every user's hash is unique (defeats rainbow tables). Hashing is one-way because the algorithm has no inverse -- you can verify a match but cannot reverse it.",
            "hint": "See the Hashing section."
          },
          {
            "id": "q4-gc5m2-access",
            "question": "What is the difference between MAC, DAC, and RBAC?",
            "type": "text",
            "correctAnswer": "MAC: central admin controls access by clearance (military). DAC: the data owner controls access (Google Docs sharing). RBAC: access determined by job role (enterprise standard).",
            "hint": "See the Access Models table."
          },
          {
            "id": "q5-gc5m2-aaa",
            "question": "What are the three steps of the AAA framework?",
            "type": "text",
            "correctAnswer": "Authentication (who are you?), Authorization (what are you allowed to do?), Accounting (what did you do? -- logging and monitoring).",
            "hint": "See the AAA Framework diagram."
          }
        ]},
      {
        "id": "vulnerabilities-systems",
        "moduleId": "google-course-5",
        "title": "Vulnerabilities in Systems",
        "description": "Vulnerability Management, OWASP Top 10, CVE/CVSS, Pen Testing, Threat Actors.",
        "status": "unlocked",
        "iconType": "sword",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Vuln / Exploit / Exposure",
            "description": "Vulnerability = weakness. Exploit = tool/method to attack it. Exposure = mistake leaving data accessible. Zero-Day = unknown to vendor, no patch.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Vuln Management",
            "description": "Continuous 4-step loop: Identify -> Consider Exploits -> Prepare Defences -> Evaluate Defences.",
            "x": 30,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "CVE & CVSS",
            "description": "CVE = public dictionary of known vulns (MITRE). CVSS = severity score 0.0-10.0. 9.0-10.0 = critical, patch NOW.",
            "x": 70,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "OWASP Top 10",
            "description": "Top web app risks: Broken Access Control, Cryptographic Failures, Injection, Insecure Design, Misconfiguration, Vulnerable Components, Auth Failures, and more.",
            "x": 50,
            "y": 58,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "Defense in Depth",
            "description": "5-layer castle: Perimeter -> Network -> Endpoint -> Application -> Data. Attacker must breach every layer.",
            "x": 25,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-6",
            "label": "Threat Actors & Pen Testing",
            "description": "Actors: state, criminal, insider, hacktivist, APT. Hats: Black/White/Gray. Pen test: Red/Blue/Purple teams, White/Black/Gray box.",
            "x": 75,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-7",
            "label": "Brute Force & OSINT",
            "description": "Dictionary, credential stuffing, simple brute force. Defences: MFA, lockout, CAPTCHA, salting, rate limiting. OSINT: VirusTotal, HIBP, Shodan, MITRE ATT&CK.",
            "x": 50,
            "y": 95,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "Vulnerability = the weakness; Exploit = the tool/method to attack it; Exposure = a mistake leaving data accessible (not necessarily a code flaw)",
          "A Zero-Day is a vulnerability unknown to the vendor with no patch available — the most dangerous class",
          "Vulnerability management is a continuous loop: Identify -> Consider Exploits -> Prepare Defences -> Evaluate Defences",
          "CVE is MITRE's public dictionary of known vulnerabilities; CVSS scores severity 0.0-10.0 (9.0-10.0 = critical, patch immediately)",
          "The OWASP Top 10 lists the most critical web app risks; #1 Broken Access Control and #3 Injection are among the most common",
          "Defense in Depth layers 5 controls (Perimeter, Network, Endpoint, Application, Data) so the attacker must breach every layer",
          "Black Hat = unauthorized/illegal, White Hat = authorized/hired, Gray Hat = unauthorized but usually non-malicious",
          "Brute-force types (dictionary, credential stuffing, simple) are defeated by MFA, account lockout, CAPTCHA, salting, and rate limiting"
        ],
        "quiz": [
          {
            "id": "q1-gc5m3-vee",
            "question": "What is the difference between a Vulnerability, an Exploit, and an Exposure?",
            "type": "text",
            "correctAnswer": "Vulnerability = the weakness. Exploit = the tool/method used to attack it. Exposure = a mistake that leaves data accessible (not necessarily a code flaw).",
            "hint": "See the Key Distinctions table."
          },
          {
            "id": "q2-gc5m3-zeroday",
            "question": "What is a Zero-Day vulnerability?",
            "type": "text",
            "correctAnswer": "A vulnerability completely unknown to the vendor and public. No patch exists -- the vendor has had 'zero days' to fix it. The most dangerous class of vulnerability.",
            "hint": "See the Zero-Day row of the distinctions table."
          },
          {
            "id": "q3-gc5m3-cvss",
            "question": "What does a CVSS score of 9.8 mean?",
            "type": "text",
            "correctAnswer": "Critical severity. Requires IMMEDIATE emergency patching -- drop everything. Examples: Log4Shell (9.8).",
            "hint": "See the CVSS scoring table."
          },
          {
            "id": "q4-gc5m3-did",
            "question": "What is Defense in Depth and its five layers?",
            "type": "text",
            "correctAnswer": "Layering multiple security controls so if one fails, others catch the attacker. Five layers: Perimeter, Network, Endpoint, Application, Data.",
            "hint": "See the Defense in Depth castle model."
          },
          {
            "id": "q5-gc5m3-stuffing",
            "question": "What is credential stuffing?",
            "type": "text",
            "correctAnswer": "Taking leaked username/password pairs from one breach and trying them on different websites. It works because most people reuse passwords across sites.",
            "hint": "See the Brute Force Attacks section."
          }
        ]},
      {
        "id": "threats-asset-security",
        "moduleId": "google-course-5",
        "title": "Threats to Asset Security",
        "description": "Social Engineering, Malware Types, Web Exploits, XSS, SQLi, Threat Modeling, PASTA.",
        "status": "unlocked",
        "iconType": "skull",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Social Engineering",
            "description": "Exploits human psychology, not technical flaws. Attackers use urgency, fear, curiosity, trust. Security awareness training is the primary defence.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Phishing Family",
            "description": "Phishing (email), Smishing (SMS), Vishing (voice), Spear Phishing (targeted), Whaling (executives), Angler (fake support). Plus physical: tailgating, USB baiting.",
            "x": 30,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "Malware Types",
            "description": "Virus (needs user action), Worm (self-replicates), Trojan (disguised), Ransomware (encrypts), Spyware/Keylogger, Fileless (RAM-only), Rootkit, Cryptojacking.",
            "x": 70,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Web Exploits",
            "description": "Applications fail to validate/sanitize user input. Golden rule: NEVER trust user input — always validate, sanitize, and parameterize.",
            "x": 50,
            "y": 60,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "XSS & SQLi",
            "description": "XSS: inject JavaScript (Reflected/Stored/DOM) — fix with input validation, output encoding, CSP. SQLi: inject SQL — fix with prepared statements.",
            "x": 25,
            "y": 85,
            "connections": []
          },
          {
            "id": "node-6",
            "label": "Threat Modeling",
            "description": "STRIDE categories (Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation). PASTA: 7-stage risk-centric framework aligning threats with business goals.",
            "x": 75,
            "y": 85,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "Social engineering exploits human psychology (urgency, fear, curiosity, trust); security awareness training is the primary defence",
          "Phishing family: Phishing (email), Smishing (SMS), Vishing (voice), Spear Phishing (targeted), Whaling (executives), Angler (fake support)",
          "Malware types: Virus (needs user action), Worm (self-replicates), Trojan (disguised), Ransomware (encrypts), Spyware, Fileless (RAM-only), Rootkit, Cryptojacking",
          "Fileless malware runs in RAM using legitimate tools (PowerShell/WMI) — traditional antivirus can't detect it; needs EDR with behavioral analysis",
          "Web exploits exist because apps fail to validate/sanitize input — never trust user input; always validate, sanitize, and parameterize",
          "XSS injects JavaScript (Reflected/Stored/DOM); defences are input validation, output encoding, CSP, and HttpOnly cookies",
          "SQL injection inserts SQL into input fields; prepared statements make injection impossible by separating code from data",
          "Threat modeling uses STRIDE (threat categories) and PASTA (7-stage risk-centric framework aligning threats with business goals)"
        ],
        "quiz": [
          {
            "id": "q1-gc5m4-se",
            "question": "Why does social engineering work, and what is the primary defence?",
            "type": "text",
            "correctAnswer": "It exploits human psychology (urgency, fear, curiosity, trust, helpfulness) rather than technical flaws. The primary countermeasure is security awareness training.",
            "hint": "See the Social Engineering key concept."
          },
          {
            "id": "q2-gc5m4-phishing",
            "question": "What is the difference between Phishing, Spear Phishing, and Whaling?",
            "type": "text",
            "correctAnswer": "Phishing: mass generic email. Spear Phishing: customized to a specific person (researched via LinkedIn). Whaling: spear phishing targeting executives (CEO, CFO).",
            "hint": "See the social engineering spectrum."
          },
          {
            "id": "q3-gc5m4-fileless",
            "question": "How is fileless malware different from regular malware?",
            "type": "text",
            "correctAnswer": "Fileless malware runs entirely in RAM using legitimate system tools (PowerShell, WMI). No files are written to disk, so traditional antivirus cannot detect it — it requires EDR with behavioral analysis.",
            "hint": "See the Fileless Malware card."
          },
          {
            "id": "q4-gc5m4-xss",
            "question": "What is the difference between Reflected XSS and Stored XSS?",
            "type": "text",
            "correctAnswer": "Reflected: the malicious script bounces off the server via a crafted URL (one victim per click). Stored: the script is saved in the database and runs for EVERY visitor (far more dangerous).",
            "hint": "See the XSS section."
          },
          {
            "id": "q5-gc5m4-sqli",
            "question": "How does SQL Injection work and how is it stopped?",
            "type": "text",
            "correctAnswer": "The attacker types SQL commands into input fields and the database executes them as commands instead of data. Prepared statements fix it by fixing the query structure and treating input as pure data.",
            "hint": "See the SQL Injection section."
          }
        ]},
      {
        "id": "mystery-chest-gc5",
        "moduleId": "google-course-5",
        "title": "Mystery Chest",
        "description": "Quick revision of all Course 5 concepts.",
        "status": "unlocked",
        "iconType": "chest",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Asset Security",
            "description": "CIA Triad, Asset/Threat/Vulnerability, Risk = Likelihood x Severity, classification levels, 3 data states, NIST CSF.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Protecting Assets",
            "description": "Security controls, cryptography (symmetric/asymmetric/hashing), salting, data lifecycle, AAA framework, MAC/DAC/RBAC.",
            "x": 25,
            "y": 45,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "Vulnerabilities",
            "description": "Vuln/Exploit/Exposure, Zero-Day, CVE/CVSS, OWASP Top 10, Defense in Depth, threat actors, pen testing, brute force, OSINT.",
            "x": 75,
            "y": 45,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Threats",
            "description": "Social engineering (phishing family), malware types, web exploits (XSS/SQLi), threat modeling (STRIDE, PASTA).",
            "x": 50,
            "y": 65,
            "connections": ["node-5"]
          },
          {
            "id": "node-5",
            "label": "Master Glossary",
            "description": "All Course 5 terms A-Z: CIA, AAA, encryption, hashing, CVE/CVSS, OWASP, XSS, SQLi, PASTA, STRIDE, and more.",
            "x": 50,
            "y": 90,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "CIA Triad is the yardstick for security; Asset/Threat/Vulnerability must align for a breach; Risk = Likelihood x Severity",
          "Data has 3 states (In Use, In Transit, At Rest) and 4 classification levels (Restricted -> Confidential -> Internal -> Public)",
          "Cryptography: symmetric (AES) vs asymmetric (RSA) encryption, and one-way hashing (SHA-256) hardened with salting",
          "The AAA framework (Authentication, Authorization, Accounting) and access models MAC/DAC/RBAC control who can do what",
          "Vulnerability vs Exploit vs Exposure; Zero-Days have no patch; CVE/CVSS track and score vulnerabilities (9.0+ = critical)",
          "OWASP Top 10 lists critical web risks; Defense in Depth layers Perimeter/Network/Endpoint/Application/Data",
          "Social engineering (phishing family) and malware (virus, worm, ransomware, fileless, rootkit) are the main threats",
          "Web exploits: XSS (fix with validation/encoding/CSP) and SQL injection (fix with prepared statements); model threats with STRIDE and PASTA"
        ],
        "quiz": [
          {
            "id": "q1-gc5mc-cia",
            "question": "What is the CIA Triad and the risk formula?",
            "type": "text",
            "correctAnswer": "CIA = Confidentiality, Integrity, Availability — the three pillars all security decisions are measured against. Risk Score = Likelihood (1-3) x Severity (1-3).",
            "hint": "See the CIA Triad and risk flashcards."
          },
          {
            "id": "q2-gc5mc-crypto",
            "question": "Symmetric vs asymmetric encryption, and what does salting do?",
            "type": "text",
            "correctAnswer": "Symmetric: one key, fast (AES). Asymmetric: public encrypts, private decrypts, secure exchange (RSA); HTTPS uses both. Salting adds a random string before hashing so identical passwords get different hashes, defeating rainbow tables.",
            "hint": "See the encryption and salting flashcards."
          },
          {
            "id": "q3-gc5mc-access",
            "question": "What is the difference between MAC, DAC, and RBAC?",
            "type": "text",
            "correctAnswer": "MAC: admin controls all access (military). DAC: data owner controls access (Google Docs). RBAC: job role determines access (enterprise standard).",
            "hint": "See the access models flashcard."
          },
          {
            "id": "q4-gc5mc-owasp",
            "question": "What is OWASP #3 Injection and how is it fixed?",
            "type": "text",
            "correctAnswer": "Attacker inserts malicious code (SQL, commands) into user input fields; the app executes it instead of treating it as data. Fix: parameterized queries / prepared statements.",
            "hint": "See the OWASP Injection flashcard."
          },
          {
            "id": "q5-gc5mc-xss",
            "question": "What is the difference between Reflected and Stored XSS?",
            "type": "text",
            "correctAnswer": "Reflected: script bounces off the server via a crafted URL (one victim per click). Stored: script is saved in the database and runs for EVERY visitor (much more dangerous).",
            "hint": "See the XSS flashcard."
          }
        ]}
    ]
  },
  {
    "id": "google-course-6",
    "title": "Sound the Alarm: Detection and Response",
    "description": "Incident detection, network monitoring, threat hunting, and SIEM tools for security operations.",
    "isFuture": false,
    "topics": [
      {
        "id": "detection-incident-response",
        "moduleId": "google-course-6",
        "title": "Intro to Detection & Incident Response",
        "description": "Events vs Incidents, NIST Lifecycle, CSIRT/SOC, IDS/IPS/EDR, SIEM, SOAR, Signal Triage.",
        "status": "unlocked",
        "iconType": "shield",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Detection over Prevention",
            "description": "You cannot prevent 100% of attacks. Modern security shifts to detecting and responding FAST — reduce Time to Detect (TTD) and Time to Respond (TTR).",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Event vs Incident",
            "description": "Event = any observable occurrence. Security Incident = event that jeopardizes CIA or violates policy. All incidents are events; not all events are incidents.",
            "x": 30,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "NIST 4 Phases",
            "description": "1-Preparation, 2-Detection & Analysis, 3-Containment/Eradication/Recovery, 4-Post-Incident Activity. Non-linear continuous loop.",
            "x": 70,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "5 W's Documentation",
            "description": "Who, What, Where, When, Why — recorded in real-time in an Incident Handler's Journal for accurate analysis, legal chain of custody, and learning.",
            "x": 50,
            "y": 58,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "CSIRT & SOC",
            "description": "CSIRT: temporary cross-functional crisis task force. SOC: permanent 24/7 Blue Team in tiers (L1 frontline, L2 investigators, L3 threat hunters, Manager).",
            "x": 25,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-6",
            "label": "IDS / IPS / EDR",
            "description": "IDS: detects + alerts (passive). IPS: detects + blocks inline (active). EDR: on-device behavioral AI, kills processes and isolates the endpoint.",
            "x": 75,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-7",
            "label": "Triage & SIEM/SOAR",
            "description": "4 signal states: TP, TN, FP, FN (FN is worst case). SIEM = the dashboard (collect/normalize/correlate/alert). SOAR = the autopilot (auto-runs playbooks).",
            "x": 50,
            "y": 95,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "You cannot prevent 100% of attacks — modern security prioritizes detecting and responding FAST (reduce TTD and TTR)",
          "All security incidents are events, but not all events are incidents; an incident jeopardizes CIA or violates policy",
          "NIST IR lifecycle: 1-Preparation, 2-Detection & Analysis, 3-Containment/Eradication/Recovery, 4-Post-Incident Activity — a non-linear loop",
          "Document the 5 W's (Who, What, Where, When, Why) in an Incident Handler's Journal in real-time",
          "CSIRT is a temporary cross-functional crisis team; the SOC is a permanent 24/7 Blue Team tiered L1/L2/L3/Manager",
          "IDS detects + alerts (passive); IPS detects + blocks inline (active); EDR uses on-device behavioral AI to isolate endpoints",
          "The 4 signal triage states are TP, TN, FP, FN — a False Negative (no alarm + real threat) is the worst case",
          "SIEM aggregates/normalizes/correlates logs and alerts (the dashboard); SOAR auto-executes response playbooks (the autopilot)"
        ],
        "quiz": [
          {
            "id": "q1-gc6m1-event",
            "question": "What is the difference between an Event and a Security Incident?",
            "type": "text",
            "correctAnswer": "Event = any observable occurrence. Security Incident = an event that jeopardizes the CIA of a system OR violates a security policy. All incidents are events, but not all events are incidents.",
            "hint": "See Event vs. Security Incident."
          },
          {
            "id": "q2-gc6m1-nist",
            "question": "Name the 4 phases of the NIST Incident Response Lifecycle.",
            "type": "text",
            "correctAnswer": "1-Preparation, 2-Detection & Analysis, 3-Containment/Eradication/Recovery, 4-Post-Incident Activity. It is a non-linear loop -- phases can overlap.",
            "hint": "See the NIST 4-Phase lifecycle diagram."
          },
          {
            "id": "q3-gc6m1-csirt",
            "question": "What is the difference between a CSIRT and a SOC?",
            "type": "text",
            "correctAnswer": "CSIRT: a cross-functional task force assembled for a specific major crisis (temporary). SOC: a dedicated 24/7 team for ongoing network defense (permanent Blue Team).",
            "hint": "See Team Structures — CSIRT & SOC."
          },
          {
            "id": "q4-gc6m1-idsipsedr",
            "question": "What is the difference between IDS, IPS, and EDR?",
            "type": "text",
            "correctAnswer": "IDS: detects and alerts only (passive). IPS: detects and blocks automatically (active, inline). EDR: on-device behavioral AI that detects abnormal behavior and isolates the endpoint.",
            "hint": "See the Detection Tools table."
          },
          {
            "id": "q5-gc6m1-siemsoar",
            "question": "What is the difference between SIEM and SOAR?",
            "type": "text",
            "correctAnswer": "SIEM aggregates, normalizes, and correlates logs and generates alerts (the dashboard). SOAR auto-executes response playbooks when SIEM fires an alert (the autopilot).",
            "hint": "See SIEM vs. SOAR."
          }
        ]},
      {
        "id": "network-monitoring",
        "moduleId": "google-course-6",
        "title": "Network Monitoring & Analysis",
        "description": "Baselines, C2, Data Exfiltration, Packet Anatomy, tcpdump, Wireshark, pcap.",
        "status": "unlocked",
        "iconType": "network",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Baselines",
            "description": "A reference point of normal behavior. Without a baseline you cannot spot the abnormal. A 2AM multi-GB transfer is off-baseline by temporal pattern.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "SOC vs NOC",
            "description": "SOC defends security posture (threats, intrusions). NOC maintains network performance (uptime, latency, hardware). A DDoS requires both.",
            "x": 30,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "Data Exfiltration",
            "description": "6 stages: Initial Access -> Lateral Movement -> Asset Discovery -> Data Consolidation -> Bypass Controls -> Exfiltration. Detect at any stage.",
            "x": 70,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Packet Anatomy",
            "description": "Header (routing: IPs, TTL, protocol), Payload (actual data, often encrypted), Footer/Trailer (FCS error-check, Layer 2 only). Saved as .pcap files.",
            "x": 50,
            "y": 60,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "tcpdump",
            "description": "Command-line packet analyzer. -w writes, -r reads .pcap. Always use -nn during investigations to avoid alerting the attacker via DNS lookups.",
            "x": 25,
            "y": 85,
            "connections": []
          },
          {
            "id": "node-6",
            "label": "C2 Detection",
            "description": "Attackers use legitimate protocols on non-standard ports (HTTPS on 8088) to blend in. Flow analysis reveals port-protocol mismatches.",
            "x": 75,
            "y": 85,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "A baseline is a reference point of normal behavior; without it you cannot identify what is abnormal (e.g., a 2AM multi-GB transfer)",
          "SOC defends the security posture; NOC maintains network performance/uptime — a DDoS attack requires both teams to respond",
          "Data exfiltration has 6 stages: Initial Access, Lateral Movement, Asset Discovery, Data Consolidation, Bypass Controls, Exfiltration",
          "A packet has a Header (routing info), Payload (actual data, often encrypted), and Footer/FCS (Layer 2 error-checking only)",
          "tcpdump captures live traffic or reads .pcap files (-w write, -r read); .pcap files are snapshots for offline forensics",
          "Always use -nn during incident investigations so tcpdump makes no DNS lookups that would alert the attacker",
          "C2 traffic hides by using legitimate protocols on non-standard ports (e.g., HTTPS on 8088)",
          "Flow analysis detects C2 by spotting port-protocol mismatches from internal hosts"
        ],
        "quiz": [
          {
            "id": "q1-gc6m2-baseline",
            "question": "What is a baseline and why does it matter?",
            "type": "text",
            "correctAnswer": "A reference point of normal expected behavior. Without it, analysts cannot distinguish normal from malicious. Example: a 2AM multi-GB transfer is off-baseline by temporal pattern.",
            "hint": "See the Baselines section."
          },
          {
            "id": "q2-gc6m2-socnoc",
            "question": "What is the difference between a SOC and a NOC?",
            "type": "text",
            "correctAnswer": "SOC: maintains security posture (threats, intrusions, defense). NOC: maintains network performance (uptime, speed, hardware). A DDoS attack requires both to respond.",
            "hint": "See SOC vs. NOC."
          },
          {
            "id": "q3-gc6m2-exfil",
            "question": "Name the 6 stages of data exfiltration.",
            "type": "text",
            "correctAnswer": "Initial Access -> Lateral Movement -> Asset Discovery -> Data Consolidation -> Bypass Controls -> Exfiltration.",
            "hint": "See the Data Exfiltration lifecycle diagram."
          },
          {
            "id": "q4-gc6m2-nn",
            "question": "What is the difference between tcpdump -n and -nn, and why does -nn matter?",
            "type": "text",
            "correctAnswer": "-n disables hostname resolution (IP stays as IP). -nn disables BOTH hostname AND port resolution. -nn is essential during investigations because it prevents DNS lookups that would alert the attacker.",
            "hint": "See the tcpdump flag reference and C2 section."
          },
          {
            "id": "q5-gc6m2-c2",
            "question": "What is C2 traffic and how do you detect it?",
            "type": "text",
            "correctAnswer": "Command and Control: attackers communicate with infected systems using legitimate protocols on non-standard ports (e.g., HTTPS on port 8088). Detected via flow analysis looking for port-protocol mismatches.",
            "hint": "See Command and Control (C2) Detection."
          }
        ]},
      {
        "id": "incident-investigation",
        "moduleId": "google-course-6",
        "title": "Incident Investigation & Response",
        "description": "Threat Hunting, IoC vs IoA, Pyramid of Pain, Triage, Chain of Custody, BCP, Final Report.",
        "status": "unlocked",
        "iconType": "sword",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Proactive Detection",
            "description": "Threat Hunting (human search for hidden threats), Threat Intelligence (context via TIP), Cyber Deception (honeypots = zero false positives).",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "IoC vs IoA",
            "description": "IoC: evidence a breach ALREADY happened (who/what — file hash, attacker IP). IoA: real-time signal of an ACTIVE attack (why/how — process executing code now).",
            "x": 30,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "Pyramid of Pain",
            "description": "Indicator value vs. attacker pain. Bottom (trivial): hashes. Top (tough): TTPs. Focus intelligence on TTPs to break the attacker's whole methodology.",
            "x": 70,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Alert Triage",
            "description": "3 steps: Receive & Assess, Assign Priority (Functional/Information/Recoverability impact), Collect & Analyze evidence. Use VirusTotal (never upload PII).",
            "x": 50,
            "y": 58,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "Chain of Custody",
            "description": "Write protection -> Cryptographic hash (seal) -> Forensic copy (work on copy) -> Continuous logging. A broken chain = evidence inadmissible in court.",
            "x": 25,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-6",
            "label": "Playbooks & BCP/DRP",
            "description": "Playbooks: manual, automated (SOAR), semi-automated. BCP sustains operations; DRP restores IT. Hot/Warm/Cold sites trade cost for recovery speed.",
            "x": 75,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-7",
            "label": "Post-Incident Report",
            "description": "Blameless Lessons Learned meeting within 2 weeks. Final report: Executive Summary, Timeline, Investigation, Recommendations.",
            "x": 50,
            "y": 95,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "Proactive detection goes beyond alerts: Threat Hunting (human search), Threat Intelligence (context), and honeypots (zero false positives)",
          "IoC = evidence a breach already happened (forensics, who/what); IoA = real-time signal of an active, unfolding attack (why/how)",
          "The Pyramid of Pain ranks indicators by attacker pain: hashes (trivial) at the bottom, TTPs (tough) at the top — focus on TTPs",
          "Alert triage is 3 steps: Receive & Assess, Assign Priority (Functional/Information/Recoverability), Collect & Analyze evidence",
          "Never upload PII or proprietary data to VirusTotal — everything uploaded is publicly shared",
          "Chain of custody: Write Protection -> Cryptographic Hash -> Forensic Copy -> Continuous Logging; a broken chain makes evidence inadmissible",
          "Playbooks can be manual, automated (SOAR), or semi-automated; BCP sustains operations while DRP restores IT infrastructure",
          "Hold a BLAMELESS Lessons Learned meeting within 2 weeks; the final report has Executive Summary, Timeline, Investigation, and Recommendations"
        ],
        "quiz": [
          {
            "id": "q1-gc6m3-iocioa",
            "question": "What is the difference between an IoC and an IoA?",
            "type": "text",
            "correctAnswer": "IoC (Indicator of Compromise): forensic evidence a breach ALREADY happened (who/what -- malicious file hash, attacker IP). IoA (Indicator of Attack): a real-time signal of an ACTIVE, unfolding attack (why/how -- an unknown process executing code now).",
            "hint": "See IoC vs. IoA."
          },
          {
            "id": "q2-gc6m3-pyramid",
            "question": "In the Pyramid of Pain, what is at the top vs. the bottom?",
            "type": "text",
            "correctAnswer": "Bottom (trivial): hash values (attacker changes one byte to bypass). Top (tough): TTPs (blocking them forces the attacker to rethink their entire methodology). Focus intelligence on TTPs.",
            "hint": "See the Pyramid of Pain."
          },
          {
            "id": "q3-gc6m3-triage",
            "question": "What are the 3 alert triage steps?",
            "type": "text",
            "correctAnswer": "1-Receive & Assess (real or false positive?), 2-Assign Priority (Functional, Information, and Recoverability impact), 3-Collect & Analyze evidence and make an escalation decision.",
            "hint": "See Alert Triage — 3-Step Process."
          },
          {
            "id": "q4-gc6m3-custody",
            "question": "What is the Chain of Custody and why does it matter?",
            "type": "text",
            "correctAnswer": "Documentation of every person who handled evidence, when, and what they did (write protection, hashing, forensic copy, continuous logging). A broken chain makes evidence inadmissible in court -- the attacker goes free.",
            "hint": "See Chain of Custody."
          },
          {
            "id": "q5-gc6m3-sites",
            "question": "What is the difference between Hot, Warm, and Cold sites?",
            "type": "text",
            "correctAnswer": "Hot: fully operational, instant failover (zero downtime). Warm: configured but needs hours to activate. Cold: basic facility, needs days/weeks of setup before use.",
            "hint": "See Business Continuity & Site Resilience."
          }
        ]},
      {
        "id": "ids-siem-tools",
        "moduleId": "google-course-6",
        "title": "IDS & SIEM Tools",
        "description": "Log Formats, Suricata Rules, Splunk SPL, Chronicle YARA-L, Wazuh, jq.",
        "status": "unlocked",
        "iconType": "network",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Logs vs. Telemetry",
            "description": "Telemetry: live raw streams (pcap, memory dumps) for real-time analysis. Log: unalterable text record AFTER an event (JSON, Syslog, XML, CEF). Don't log everything -- cost, performance, alert fatigue.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Log Formats",
            "description": "JSON (cloud/APIs, curly braces). Syslog (Linux/network, PRI in angle brackets, lower = more urgent). XML (Windows events, paired tags, 4625=failed logon). CEF (security appliances, pipe-separated).",
            "x": 28,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "IDS Architecture",
            "description": "HIDS: host-based, sees one machine's processes/files/registry. NIDS: network-based, sees raw traffic at choke points. Signature detection (low FP, blind to zero-days) vs. Anomaly detection (catches zero-days, high FP).",
            "x": 72,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Suricata Rules",
            "description": "Open-source IDS/IPS/NSM. Rule = Action + Header + Options. Action priority: PASS > DROP > REJECT > ALERT. Outputs fast.log (plaintext) and eve.json (flow_id correlates a session).",
            "x": 50,
            "y": 58,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "SPL & Chronicle",
            "description": "Splunk SPL pipes (|) commands; always specify index= for performance; fail* is a wildcard. Chronicle: UDM Search (fast, normalized) vs. Raw Log Search (slow, for broken pipelines); YARA-L writes detections.",
            "x": 28,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-6",
            "label": "Wazuh & jq",
            "description": "Wazuh: free open-source SIEM using Filebeat agents, integrates with the ELK Stack. jq: command-line JSON processor to parse eve.json and reconstruct sessions by flow_id.",
            "x": 72,
            "y": 80,
            "connections": ["node-7"]
          },
          {
            "id": "node-7",
            "label": "Reading Logs = Forensics",
            "description": "SIEM normalization unifies formats, but raw log reading is essential for investigation. Memorize Windows Event IDs: 4624 success, 4625 failed, 4648 pass-the-hash, 4688 process created.",
            "x": 50,
            "y": 95,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "Telemetry is live raw data (pcap, memory) for real-time analysis; a log is an unalterable text record created AFTER a discrete event completes",
          "Don't log everything -- multi-terabyte volumes cause financial cost, I/O performance bottlenecks, and alert fatigue; log the RIGHT events at the RIGHT verbosity",
          "Four log formats: JSON (cloud/APIs, curly braces), Syslog (Linux/network, PRI in angle brackets), XML (Windows events, paired tags), CEF (security appliances, pipe-separated)",
          "Windows EventID 4625 = Failed Logon, 4624 = Successful Logon, 4648 = Explicit Credential Logon (pass-the-hash indicator), 4688 = Process Created",
          "HIDS is host-based (one machine's processes/files/registry); NIDS is network-based (raw traffic at choke points across all devices)",
          "Signature-based detection has low false positives but is blind to zero-days; anomaly-based detection catches zero-days but has a high false-positive rate",
          "A Suricata rule has three parts -- Action, Header, and Options; action priority is PASS > DROP > REJECT > ALERT, and eve.json's flow_id correlates all alerts from one session",
          "SPL pipes (|) commands and needs index= for performance; Chronicle UDM Search is fast and normalized while Raw Log Search is a slow fallback when the pipeline breaks"
        ],
        "quiz": [
          {
            "id": "q1-gc6m4-formats",
            "question": "What are the 4 log format types and where is each seen?",
            "type": "text",
            "correctAnswer": "JSON (cloud/APIs, curly braces {}). Syslog (Linux/network devices, PRI in angle brackets). XML (Windows events, paired tags). CEF (security appliances, pipe-separated fields).",
            "hint": "See Quick Revision -- 4 Log format types."
          },
          {
            "id": "q2-gc6m4-4625",
            "question": "What does Windows EventID 4625 mean?",
            "type": "text",
            "correctAnswer": "Failed Logon attempt. Important for detecting brute force attacks. EventID 4624 = successful logon. 4648 = explicit credential logon (possible pass-the-hash).",
            "hint": "See Quick Revision -- Windows EventID 4625."
          },
          {
            "id": "q3-gc6m4-hidsnids",
            "question": "What is the difference between HIDS and NIDS?",
            "type": "text",
            "correctAnswer": "HIDS: host-based, monitors one machine's processes/files/registry. NIDS: network-based, monitors raw traffic at choke points across all devices.",
            "hint": "See Quick Revision -- HIDS vs. NIDS."
          },
          {
            "id": "q4-gc6m4-suricata",
            "question": "What are the 3 components of a Suricata rule?",
            "type": "text",
            "correctAnswer": "Action (alert/pass/drop/reject), Header (protocol + source IP/port + direction + dest IP/port), Options (msg, flow, content, sid, rev) in parentheses.",
            "hint": "See Quick Revision -- Suricata rule 3 components."
          },
          {
            "id": "q5-gc6m4-logs",
            "question": "What is the difference between fast.log and eve.json?",
            "type": "text",
            "correctAnswer": "fast.log: minimal plaintext, legacy, no session correlation. eve.json: production JSON format with flow_id to correlate all alerts from one network session. Use eve.json for SIEM.",
            "hint": "See Quick Revision -- fast.log vs. eve.json."
          }
        ]},
      {
        "id": "mystery-chest-gc6",
        "moduleId": "google-course-6",
        "title": "Mystery Chest",
        "description": "Quick revision of all Course 6 concepts.",
        "status": "unlocked",
        "iconType": "chest",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Detection & IR",
            "description": "Event vs. Incident (all incidents are events). NIST 4 phases: Preparation, Detection & Analysis, Containment/Eradication/Recovery, Post-Incident. CSIRT (temporary) vs. SOC (24/7). IDS/IPS/EDR, SIEM vs. SOAR, TP/FP/FN/TN.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Network Monitoring",
            "description": "Baseline = normal behavior reference. C2 uses legit protocols on odd ports (detect via flow analysis). 6 exfil stages. tcpdump -nn (no host/port resolution). Wireshark GUI. .pcap files.",
            "x": 28,
            "y": 42,
            "connections": ["node-5"]
          },
          {
            "id": "node-3",
            "label": "Investigation",
            "description": "Threat Hunting (human) + honeypots (zero FP). IoC (already happened) vs. IoA (happening now). Pyramid of Pain (hashes trivial -> TTPs tough). Triage priorities, Chain of Custody, BCP/DRP, Hot/Warm/Cold sites.",
            "x": 72,
            "y": 42,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "IDS & SIEM Tools",
            "description": "Log formats: JSON, Syslog, XML, CEF. Windows 4625 = failed logon. HIDS vs. NIDS; Signature vs. Anomaly. Suricata rules (Action/Header/Options, eve.json flow_id). Splunk SPL, Chronicle UDM/YARA-L, Wazuh, jq.",
            "x": 50,
            "y": 68,
            "connections": ["node-5"]
          },
          {
            "id": "node-5",
            "label": "Master Glossary & Flashcards",
            "description": "Complete Course 6 glossary plus full flashcard review across all four modules -- terms, definitions, and rapid-fire Q&A for exam-ready recall.",
            "x": 50,
            "y": 92,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "An event is any observable occurrence; a security incident jeopardizes CIA or violates policy -- all incidents are events, but not all events are incidents",
          "The NIST lifecycle has 4 non-linear phases: Preparation, Detection & Analysis, Containment/Eradication/Recovery, and Post-Incident Activity",
          "SIEM collects, normalizes, and correlates logs to generate alerts; SOAR auto-executes response playbooks -- SIEM detects, SOAR responds",
          "A baseline defines normal behavior; C2 traffic hides in legitimate protocols on non-standard ports and is caught with flow analysis; always use tcpdump -nn",
          "IoC is forensic evidence a breach already happened (who/what); IoA is a real-time signal of an active attack (why/how); the Pyramid of Pain ranks hashes (trivial) up to TTPs (tough)",
          "Chain of custody (write protection -> hash -> forensic copy -> continuous logging) keeps evidence admissible; a broken chain frees the attacker",
          "Four log formats: JSON (cloud), Syslog (Linux/network), XML (Windows, 4625=failed logon), CEF (security appliances); HIDS watches a host, NIDS watches the network",
          "Suricata rules combine Action, Header, and Options; eve.json's flow_id correlates a session; Splunk SPL, Chronicle (UDM/YARA-L), Wazuh, and jq are the core SIEM tools"
        ],
        "quiz": [
          {
            "id": "q1-gc6mc-eventincident",
            "question": "What is the difference between an Event and a Security Incident?",
            "type": "text",
            "correctAnswer": "Event = any observable occurrence. Security Incident = event that jeopardizes CIA or violates policy. ALL incidents are events; NOT all events are incidents.",
            "hint": "See Flashcard Review -- Event vs. Security Incident."
          },
          {
            "id": "q2-gc6mc-nist",
            "question": "What are the NIST Incident Response 4 phases?",
            "type": "text",
            "correctAnswer": "1-Preparation (before attack), 2-Detection & Analysis (is it real?), 3-Containment/Eradication/Recovery (stop, remove, restore), 4-Post-Incident Activity (learn). Non-linear loop.",
            "hint": "See Flashcard Review -- NIST 4 phases."
          },
          {
            "id": "q3-gc6mc-siemsoar",
            "question": "What is the difference between SIEM and SOAR?",
            "type": "text",
            "correctAnswer": "SIEM: collects/normalizes/correlates logs, generates alerts (the dashboard). SOAR: auto-executes playbooks when SIEM fires (the autopilot). SIEM detects, SOAR responds.",
            "hint": "See Flashcard Review -- SIEM vs. SOAR."
          },
          {
            "id": "q4-gc6mc-tcpdump",
            "question": "What is the difference between tcpdump -n and -nn?",
            "type": "text",
            "correctAnswer": "-n: disables hostname resolution. -nn: disables BOTH hostname AND port resolution. -nn is critical -- prevents alerting attacker via DNS lookups during investigation.",
            "hint": "See Flashcard Review -- tcpdump -n vs. -nn."
          },
          {
            "id": "q5-gc6mc-custody",
            "question": "What are the Chain of Custody steps?",
            "type": "text",
            "correctAnswer": "1-Write Protection (lock drive), 2-Cryptographic Hash (digital seal), 3-Forensic Copy (work on copy never original), 4-Continuous Logging (every transfer documented).",
            "hint": "See Flashcard Review -- Chain of Custody steps."
          }
        ]}
    ]
  },
  {
    "id": "google-course-7",
    "title": "Automate Cybersecurity Tasks with Python",
    "description": "Python programming fundamentals, functions, data structures, and practical security automation.",
    "isFuture": false,
    "topics": [
      {
        "id": "intro-python",
        "moduleId": "google-course-7",
        "title": "Introduction to Python",
        "description": "Automation, Data Types, Variables, Conditionals, for/while Loops, break/continue.",
        "status": "unlocked",
        "iconType": "network",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Why Python?",
            "description": "Security analysts process millions of logs, IPs, and events daily -- manual review is impossible. A 3-line Python script can filter 10M log lines in seconds (log parsing, access control, scanning, malware analysis).",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "How Python Executes",
            "description": "The interpreter translates human-readable Python into binary LINE BY LINE at runtime. Break the strict grammar (syntax) and it crashes immediately with a SyntaxError.",
            "x": 28,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "Data Types",
            "description": "str (text in quotes), int (whole numbers), float (decimals), bool (True/False), list (mutable), dict (key:value), tuple (immutable), set (unique values).",
            "x": 72,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Variables",
            "description": "Named memory containers assigned with =. Use snake_case (PEP 8), be descriptive, avoid reserved keywords. Type cast with int(), str(), float().",
            "x": 50,
            "y": 55,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "Conditionals",
            "description": "if / elif / else decision logic with comparison (==, !=, >, <) and logical (and, or, not, in) operators. Header ends with a colon; body indented 4 spaces.",
            "x": 28,
            "y": 78,
            "connections": ["node-7"]
          },
          {
            "id": "node-6",
            "label": "Loops (for / while)",
            "description": "for iterates a KNOWN sequence (list, range); while iterates on a BOOLEAN condition. while MUST increment its loop variable or it runs forever.",
            "x": 72,
            "y": 78,
            "connections": ["node-7"]
          },
          {
            "id": "node-7",
            "label": "break & continue",
            "description": "break immediately exits the entire loop; continue skips the current iteration and jumps to the next one.",
            "x": 50,
            "y": 93,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "Automation uses technology to reduce manual effort for repetitive tasks -- essential for processing millions of security logs daily",
          "The Python interpreter translates human-readable code into binary machine instructions LINE BY LINE at runtime",
          "String is text in quotes and cannot do math; Integer is a whole number with no quotes that can do math -- '443' is not 443",
          "The eight core data types are str, int, float, bool, list, dict, tuple, and set; tuples are immutable and sets hold only unique values",
          "Variables use snake_case (PEP 8): lowercase words joined by underscores, descriptive, never reserved keywords like if/for/return",
          "The 'in' operator checks whether a value exists inside a list, string, or other sequence and returns True/False",
          "for loops iterate a KNOWN sequence; while loops run on a BOOLEAN condition and MUST increment or you get an infinite loop",
          "break exits the entire loop immediately; continue skips only the current iteration; range() stop is always EXCLUSIVE"
        ],
        "quiz": [
          {
            "id": "q1-gc7m1-automation",
            "question": "What is automation and why does it matter in cybersecurity?",
            "type": "text",
            "correctAnswer": "Using technology to reduce human and manual effort for common, repetitive tasks. Essential for processing millions of security logs daily.",
            "hint": "See Quick Revision -- What is automation?"
          },
          {
            "id": "q2-gc7m1-interpreter",
            "question": "What does the Python interpreter do?",
            "type": "text",
            "correctAnswer": "Translates human-readable Python code into binary machine instructions, LINE BY LINE at runtime.",
            "hint": "See Quick Revision -- What does the Python interpreter do?"
          },
          {
            "id": "q3-gc7m1-strvint",
            "question": "What is the key difference between a String and an Integer?",
            "type": "text",
            "correctAnswer": "String: text in quotes, can contain numbers but CANNOT do math. Integer: whole number, NO quotes, can do math. '443' != 443.",
            "hint": "See Quick Revision -- String vs. Integer."
          },
          {
            "id": "q4-gc7m1-range",
            "question": "What does range(0,5,2) generate?",
            "type": "text",
            "correctAnswer": "Generates sequence: 0, 2, 4. Start=0 (inclusive), Stop=5 (EXCLUSIVE), Step=2 (increment). Stop is NEVER included in the output.",
            "hint": "See Quick Revision -- What is range(0,5,2)?"
          },
          {
            "id": "q5-gc7m1-breakcontinue",
            "question": "What is the difference between break and continue?",
            "type": "text",
            "correctAnswer": "break: EXITS the entire loop immediately. continue: SKIPS the current iteration only, loop continues with the next item.",
            "hint": "See Quick Revision -- break vs. continue?"
          }
        ]},
      {
        "id": "effective-python",
        "moduleId": "google-course-7",
        "title": "Write Effective Python Code",
        "description": "Functions, Parameters vs Arguments, return, Scope, Libraries, PEP 8 Style.",
        "status": "unlocked",
        "iconType": "network",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Functions",
            "description": "Define logic ONCE with def, call it anywhere, change it in one place. The foundation of maintainable, reusable security automation. Header ends with a colon; body indented.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Parameters vs. Arguments",
            "description": "Parameter: placeholder in the DEFINITION. Argument: real data passed at the CALL. Python maps arguments to parameters by POSITION (left to right) -- order matters.",
            "x": 28,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "return Statement",
            "description": "Sends data back OUT of a function and IMMEDIATELY exits it -- code after return never runs. Capture the value in a variable. Use 'return x' not 'return(x)'.",
            "x": 72,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Variable Scope",
            "description": "Global: defined outside all functions, accessible everywhere. Local: defined inside a function, destroyed when it ends. Namespace masking = same name, two separate variables.",
            "x": 50,
            "y": 55,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "Built-in Functions",
            "description": "Available without importing: print(), type(), str(), int(), len(), max(), min(), sorted(), range(). Nesting runs innermost first. sorted() returns a NEW list.",
            "x": 28,
            "y": 78,
            "connections": ["node-7"]
          },
          {
            "id": "node-6",
            "label": "Libraries & Modules",
            "description": "import module (access via module.function) vs. from module import function (direct access). Key security modules: re, csv, os, glob, datetime, statistics.",
            "x": 72,
            "y": 78,
            "connections": ["node-7"]
          },
          {
            "id": "node-7",
            "label": "PEP 8 Style",
            "description": "The official style guide: snake_case names, exactly 4 spaces (never tabs), 79-char lines, comments explaining WHY, docstrings in triple quotes.",
            "x": 50,
            "y": 93,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "Functions let you define logic once, call it anywhere, and change it in one place -- the foundation of reusable security scripts",
          "A parameter is a placeholder in the function definition; an argument is the real data passed at the call, mapped by position",
          "return sends data back out of a function AND immediately exits it -- any code after return in the same function never runs",
          "Global variables are defined outside all functions and accessible everywhere; local variables exist only inside their function and are destroyed after",
          "Namespace masking (shadowing) creates a separate local variable with the same name as a global -- the global is NOT modified, a hidden bug source",
          "sorted() returns a NEW sorted list (alphabetical or numeric) and does not modify the original list in place",
          "Use 'import module' for module.function() access, or 'from module import function' for direct access to frequently used functions",
          "PEP 8 mandates snake_case, exactly 4 spaces per indentation level (never tabs), 79-character lines, and docstrings in triple quotes"
        ],
        "quiz": [
          {
            "id": "q1-gc7m2-paramarg",
            "question": "What is the difference between a Parameter and an Argument?",
            "type": "text",
            "correctAnswer": "Parameter: placeholder in function DEFINITION. Argument: actual data passed at function CALL. Mapped by position (left to right).",
            "hint": "See Quick Revision -- Parameter vs. Argument?"
          },
          {
            "id": "q2-gc7m2-return",
            "question": "What does the return statement do?",
            "type": "text",
            "correctAnswer": "Sends data back out of a function AND immediately exits the function. All code after return in the same function = never runs.",
            "hint": "See Quick Revision -- What does return do?"
          },
          {
            "id": "q3-gc7m2-scope",
            "question": "What is the difference between Global and Local scope?",
            "type": "text",
            "correctAnswer": "Global: defined outside all functions, accessible everywhere. Local: defined inside a function, exists ONLY during that function's execution. Destroyed after.",
            "hint": "See Quick Revision -- Global vs. Local scope?"
          },
          {
            "id": "q4-gc7m2-import",
            "question": "What is the difference between import and from X import Y?",
            "type": "text",
            "correctAnswer": "import module: access via module.function(). from module import function: access function directly without prefix. Use 'from' for frequently used functions.",
            "hint": "See Quick Revision -- import vs. from X import Y?"
          },
          {
            "id": "q5-gc7m2-pep8",
            "question": "What is PEP 8's indentation rule?",
            "type": "text",
            "correctAnswer": "Exactly 4 SPACES per indentation level. Never use tabs. Every nested block adds 4 more spaces.",
            "hint": "See Quick Revision -- PEP 8 indentation rule?"
          }
        ]},
      {
        "id": "data-structures-algorithms",
        "moduleId": "google-course-7",
        "title": "Data Structures & Algorithms",
        "description": "Strings, Indexing, Slicing, Lists, Mutability, Regex, re.findall().",
        "status": "unlocked",
        "iconType": "network",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "String Operations",
            "description": "Almost all log, packet, and API data arrives as STRINGS (IPs, usernames, timestamps, paths). Mastering string manipulation is essential for log parsing and incident analysis.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Indexing & Slicing",
            "description": "Index 0 = first char, -1 = last char. Slice [start:stop] extracts a substring where start is INCLUSIVE and stop is EXCLUSIVE. Methods: .upper(), .lower(), .index(), len().",
            "x": 28,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "List Operations",
            "description": "Ordered, mutable collections. Access by index, modify in place, .append() to end, .insert(i, x) at a position, .remove(value) by value. + concatenates lists.",
            "x": 72,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Mutability",
            "description": "Strings are IMMUTABLE -- cannot change characters in place, must build a new string. Lists are MUTABLE -- change, add, or remove items in place.",
            "x": 50,
            "y": 55,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "Algorithms",
            "description": "Precise step-by-step instructions to solve a problem: Input -> Processing -> Output. Break a large problem into small, manageable sub-steps.",
            "x": 28,
            "y": 78,
            "connections": ["node-7"]
          },
          {
            "id": "node-6",
            "label": "Regex Patterns",
            "description": "Define a PATTERN to extract every match from unstructured text. \\w (word char), \\d (digit), \\s (whitespace), \\. (literal dot), + (one or more), {n} (exactly n).",
            "x": 72,
            "y": 78,
            "connections": ["node-7"]
          },
          {
            "id": "node-7",
            "label": "re.findall()",
            "description": "From the re module: returns a LIST of ALL matches of a pattern in a string. Find all IPs with re.findall(r'\\d+\\.\\d+\\.\\d+\\.\\d+', log). Requires import re.",
            "x": 50,
            "y": 93,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "Almost all security data (IPs, usernames, timestamps, URLs, paths) arrives as strings, so string manipulation is essential for log parsing",
          "Index 0 is the first character and -1 is the last; slicing [0:3] returns indices 0, 1, 2 because the stop index is always EXCLUSIVE",
          "Strings are IMMUTABLE (cannot change characters in place); lists are MUTABLE (can modify, add, and remove items in place)",
          ".append(item) adds to the END of a list; .insert(index, item) inserts at a position and shifts items right; neither overwrites",
          ".remove(value) deletes the FIRST occurrence of that value (not by index) and raises a ValueError if the value is not found",
          "An algorithm is a set of precise step-by-step instructions with Input -> Processing -> Output; break big problems into small sub-steps",
          "Regex defines a text pattern: \\w matches word characters, \\d matches digits, \\. matches a literal dot, + means one or more",
          "re.findall(pattern, string) returns a LIST of all non-overlapping matches; find every IP with re.findall(r'\\d+\\.\\d+\\.\\d+\\.\\d+', log)"
        ],
        "quiz": [
          {
            "id": "q1-gc7m3-index",
            "question": "In string indexing, what is index 0?",
            "type": "text",
            "correctAnswer": "Index 0 = the FIRST character (leftmost). Index -1 = the LAST character. Python is 0-indexed -- counting starts at zero.",
            "hint": "See Quick Revision -- String indexing."
          },
          {
            "id": "q2-gc7m3-slice",
            "question": "What does slicing [0:3] return?",
            "type": "text",
            "correctAnswer": "Characters at indices 0, 1, and 2. The stop index (3) is EXCLUSIVE -- never included. 'h32rb17'[0:3] = 'h32'.",
            "hint": "See Quick Revision -- Slicing [0:3]."
          },
          {
            "id": "q3-gc7m3-mutability",
            "question": "What is the difference between String and List mutability?",
            "type": "text",
            "correctAnswer": "String: IMMUTABLE (cannot change characters in place). List: MUTABLE (can modify, add, remove items in place).",
            "hint": "See Quick Revision -- String vs. List mutability?"
          },
          {
            "id": "q4-gc7m3-findall",
            "question": "What is re.findall() and what does it return?",
            "type": "text",
            "correctAnswer": "Returns a LIST of ALL non-overlapping matches of a regex pattern in a string. Requires 'import re' first.",
            "hint": "See Quick Revision -- What is re.findall()?"
          },
          {
            "id": "q5-gc7m3-findips",
            "question": "How do you find all IP addresses in a log?",
            "type": "text",
            "correctAnswer": "import re, then: re.findall(r'\\d+\\.\\d+\\.\\d+\\.\\d+', log_text) -- matches 4 groups of digits separated by literal dots.",
            "hint": "See Quick Revision -- How to find all IPs in a log?"
          }
        ]},
      {
        "id": "python-practice",
        "moduleId": "google-course-7",
        "title": "Python in Practice",
        "description": "File I/O, open(), read/write/append, .split(), .join(), Debugging, IP Allow-List.",
        "status": "unlocked",
        "iconType": "network",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "File I/O",
            "description": "Security logs live in files (/var/log/auth.log, firewall.csv). Python can open, read, parse, modify, and write them. The 'with' statement auto-closes files and prevents resource leaks.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Open Modes (r / w / a)",
            "description": "'r' = read only (safe). 'w' = write, which OVERWRITES the entire file (destructive!). 'a' = append, which adds to the END without deleting existing content.",
            "x": 28,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "read / write / append",
            "description": ".read() converts the file to one big string. .write() sends a string to the file. Use relative paths (same directory) or absolute paths (full path from root).",
            "x": 72,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Parsing: split & join",
            "description": ".split(delimiter) cuts a string into a LIST (default splits at whitespace). .join() is the inverse -- 'connector'.join(list) builds a string. They convert between file text and lists.",
            "x": 50,
            "y": 55,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "IP Allow-List Engine",
            "description": "The full flow: File -> .read() -> string -> .split() -> list -> .remove() loop -> list -> .join() -> string -> .write() -> file. Automates removing flagged IPs at scale.",
            "x": 28,
            "y": 78,
            "connections": ["node-7"]
          },
          {
            "id": "node-6",
            "label": "Debugging Errors",
            "description": "Three categories: Syntax (interpreter can't parse), Exceptions (valid syntax, runtime fails -- NameError, TypeError, IndexError), Logic (runs but wrong result). Use print() traces.",
            "x": 72,
            "y": 78,
            "connections": ["node-7"]
          },
          {
            "id": "node-7",
            "label": "Real-World Automation",
            "description": "auth.log parsing, IP allowlist management, timestamp normalization, alert deduplication with sets, automated lockouts, CI/CD scanning, threat-intel enrichment.",
            "x": 50,
            "y": 93,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "Security logs live in files, and Python can open, read, parse, modify, and write them automatically for repeatable workflows",
          "The 'with open()' statement is a context manager that automatically closes the file when the block ends, preventing resource leaks",
          "File modes: 'r' reads only (safe), 'w' OVERWRITES the entire file (destructive), 'a' appends to the end without deleting existing content",
          ".read() converts an entire file into one Python string; then .split() converts that string into a list for processing",
          ".split(delimiter) cuts a string into a list (default splits at whitespace); .join() is the inverse, joining a list into a string with a connector",
          "The IP allow-list flow chains read -> split -> remove loop -> join -> write to remove flagged IPs from a file reliably at scale",
          "Python errors fall into three categories: SyntaxError (can't parse), Exceptions (valid syntax but runtime fails), and Logic errors (wrong result)",
          "Debug logic errors with print() trace statements -- if a trace doesn't print, the crash happened before that line; fix str+int with str()"
        ],
        "quiz": [
          {
            "id": "q1-gc7m4-modes",
            "question": "What is the difference between file modes 'r', 'w', and 'a'?",
            "type": "text",
            "correctAnswer": "'r' = read only (safe). 'w' = write (OVERWRITES entire file -- destructive!). 'a' = append (adds to END without deleting existing content).",
            "hint": "See Flashcard Review -- File mode 'r' vs 'w' vs 'a'?"
          },
          {
            "id": "q2-gc7m4-with",
            "question": "Why use 'with open()' instead of just open()?",
            "type": "text",
            "correctAnswer": "'with' automatically closes the file when the indented block ends. Prevents resource leaks (open file handles consume RAM and file descriptors).",
            "hint": "See Flashcard Review -- Why use 'with open()'?"
          },
          {
            "id": "q3-gc7m4-splitjoin",
            "question": "What do .split() and .join() do?",
            "type": "text",
            "correctAnswer": ".split(): converts a string into a LIST by cutting at each delimiter (default whitespace). .join(): the inverse -- joins list elements into a string with a connector: ','.join(['a','b','c']) = 'a,b,c'.",
            "hint": "See Flashcard Review -- What does .split()/.join() do?"
          },
          {
            "id": "q4-gc7m4-errors",
            "question": "What is the difference between a SyntaxError, an Exception, and a Logic Error?",
            "type": "text",
            "correctAnswer": "Syntax: code structure invalid, interpreter cannot parse. Exception: valid syntax but runtime impossible (NameError, TypeError, IndexError). Logic: runs but produces wrong result.",
            "hint": "See Flashcard Review -- SyntaxError vs. Exception vs. Logic Error?"
          },
          {
            "id": "q5-gc7m4-debug",
            "question": "How do you debug a logic error?",
            "type": "text",
            "correctAnswer": "Insert print() trace statements at key points to track execution flow. If a print doesn't appear, the crash happened before that line. Use an IDE debugger for breakpoints.",
            "hint": "See Flashcard Review -- How to debug a logic error?"
          }
        ]},
      {
        "id": "mystery-chest-gc7",
        "moduleId": "google-course-7",
        "title": "Mystery Chest",
        "description": "Quick revision of all Course 7 concepts.",
        "status": "unlocked",
        "iconType": "chest",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Python Fundamentals",
            "description": "Automation, the interpreter (line by line), data types (str/int/float/bool/list/dict/tuple/set), variables (snake_case), conditionals, for/while loops, break/continue.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Effective Code",
            "description": "Functions (def), parameters vs. arguments (mapped by position), return (exits immediately), global vs. local scope, built-in functions, libraries, PEP 8 style.",
            "x": 28,
            "y": 42,
            "connections": ["node-5"]
          },
          {
            "id": "node-3",
            "label": "Data Structures & Regex",
            "description": "String indexing/slicing (stop exclusive), immutable strings vs. mutable lists, append/insert/remove, algorithms, regex tokens (\\w \\d \\s \\. + {n}), re.findall().",
            "x": 72,
            "y": 42,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "File I/O & Debugging",
            "description": "open() modes r/w/a, the 'with' context manager, read/write/append, split & join parsing, the IP allow-list engine, and the three error categories.",
            "x": 50,
            "y": 68,
            "connections": ["node-5"]
          },
          {
            "id": "node-5",
            "label": "Glossary & Flashcards",
            "description": "The complete Course 7 glossary plus full flashcard review across all four modules -- terms, definitions, and rapid-fire Q&A for exam-ready recall.",
            "x": 50,
            "y": 92,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "Automation with Python reduces manual effort for repetitive tasks; the interpreter translates code into binary line by line at runtime",
          "The eight data types are str, int, float, bool, list, dict, tuple, and set; variables use snake_case per PEP 8",
          "for loops iterate a known sequence, while loops run on a boolean condition; break exits a loop, continue skips one iteration",
          "A parameter is a definition placeholder, an argument is the real data passed at the call; return sends a value out and exits immediately",
          "Global variables are accessible everywhere; local variables die when their function ends; PEP 8 mandates 4-space indentation",
          "Strings are immutable and lists are mutable; slicing stop is exclusive; .append() adds to the end and .remove() deletes by value",
          "Regex extracts patterns from text (\\w, \\d, \\s, \\., +, {n}); re.findall() returns a list of all matches, e.g. every IP in a log",
          "File modes: 'r' read, 'w' overwrite, 'a' append; read -> split -> process -> join -> write; errors are Syntax, Exception, or Logic"
        ],
        "quiz": [
          {
            "id": "q1-gc7mc-automation",
            "question": "What is automation in cybersecurity?",
            "type": "text",
            "correctAnswer": "Using Python scripts to reduce manual effort for repetitive tasks. Example: automatically filtering millions of log lines for IOCs instead of reading manually.",
            "hint": "See Flashcard Review -- What is automation in cybersecurity?"
          },
          {
            "id": "q2-gc7mc-forwhile",
            "question": "What is the difference between a for loop and a while loop?",
            "type": "text",
            "correctAnswer": "for: iterates a KNOWN sequence (list, range) - number of iterations known upfront. while: iterates based on a BOOLEAN condition - runs until the condition becomes False.",
            "hint": "See Flashcard Review -- for vs. while loop?"
          },
          {
            "id": "q3-gc7mc-return",
            "question": "What does the return statement do?",
            "type": "text",
            "correctAnswer": "Sends value back to the caller AND immediately exits the function. Code after return in the same function = dead code (never executes).",
            "hint": "See Flashcard Review -- What does return do?"
          },
          {
            "id": "q4-gc7mc-findall",
            "question": "What does re.findall() return?",
            "type": "text",
            "correctAnswer": "A LIST of ALL non-overlapping matches of the regex pattern in the string. Empty list [] if no matches found.",
            "hint": "See Flashcard Review -- What does re.findall() return?"
          },
          {
            "id": "q5-gc7mc-modes",
            "question": "What is the difference between file modes 'r', 'w', and 'a'?",
            "type": "text",
            "correctAnswer": "'r' = read only (safe). 'w' = write (OVERWRITES entire file -- destructive!). 'a' = append (adds to END without deleting existing content).",
            "hint": "See Flashcard Review -- File mode 'r' vs 'w' vs 'a'?"
          }
        ]}
    ]
  },
  {
    "id": "google-course-8",
    "title": "Put It to Work: Prepare for Cybersecurity Jobs",
    "description": "Career preparation, incident communication, stakeholder management, community engagement, and AI in cybersecurity.",
    "isFuture": false,
    "topics": [
      {
        "id": "protect-data-communicate",
        "moduleId": "google-course-8",
        "title": "Protect Data & Communicate Incidents",
        "description": "Security Mindset, Data Classification, Events vs Incidents, BCP/DRP, Info Lifecycle.",
        "status": "unlocked",
        "iconType": "shield",
        "content": "",
        "realWorldCallout": {
          "title": "Ransomware Attack",
          "concept": "BCP keeps the BUSINESS alive during an incident (people, operations, customer communication); DRP fixes the TECHNOLOGY (servers, software, data restoration). Both run simultaneously.",
          "scenario": "While IT fights the ransomware, the Operations team diverts to manual order processing, HR communicates the situation to staff, and PR manages customer communications -- the business keeps operating at reduced capacity. Meanwhile IT isolates infected servers, restores from the last clean offline backup, rebuilds from hardened baseline images, and patches the vulnerability before verifying data integrity.",
          "relevance": "BCP and DRP complement each other during a major incident -- one sustains operations while the other restores technology."
        },
        "mindmap": [
          {
            "id": "node-1",
            "label": "Security Mindset",
            "description": "The continuous ability to evaluate risk, seek out vulnerabilities, and identify breaches. Assume every click could lead to a breach -- complacency is the enemy of security.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Events vs. Incidents",
            "description": "A security event is any observable occurrence (a firewall blocks a bad IP). A security incident is an event that results in a DATA BREACH or POLICY VIOLATION. All incidents are events; not all events are incidents.",
            "x": 28,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "Data Classification",
            "description": "Four levels by risk: Public (minimal), Private (moderate, internal), Sensitive (high -- PII/SPII/PHI), Confidential (severe -- trade secrets, NDAs). Sensitive + Confidential = HIGH-LEVEL asset.",
            "x": 72,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "BCP vs. DRP",
            "description": "BCP keeps the business running during a disruption (people, ops, customers). DRP restores the technology after an incident (servers, software, data). Both run simultaneously.",
            "x": 50,
            "y": 55,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "Information Lifecycle",
            "description": "A continuous 4-step cycle (I.A.P.M): Identify important assets -> Assess current controls -> Protect with defensive controls -> Monitor for anomalies. Then repeat.",
            "x": 28,
            "y": 78,
            "connections": ["node-7"]
          },
          {
            "id": "node-6",
            "label": "Incident Escalation",
            "description": "Golden Rule: there are NO issues too small to report. 15 failed logins, malicious code, or unapproved software all warrant escalation to the right team.",
            "x": 72,
            "y": 78,
            "connections": ["node-7"]
          },
          {
            "id": "node-7",
            "label": "When to Escalate",
            "description": "Always err on the side of caution. Entry-level analysts are not expected to solve every crisis alone -- escalation puts the right experts on the problem with the right authority.",
            "x": 50,
            "y": 93,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "The security mindset is the continuous ability to evaluate risk and identify breaches -- assume every action could lead to a breach; complacency is the enemy",
          "A security event is any observable occurrence; a security incident is an event that causes a data breach or policy violation -- all incidents are events, not vice versa",
          "Four data classification levels: Public (minimal), Private (moderate), Sensitive (high -- PII/SPII/PHI), Confidential (severe -- trade secrets, NDAs)",
          "Sensitive + Confidential data = HIGH-LEVEL asset; Public + Private data = LOW-LEVEL asset in most cases",
          "BCP keeps business operations running during a disruption (people/ops); DRP restores technical infrastructure after an incident -- both run simultaneously",
          "The Information Lifecycle Strategy is a continuous cycle: Identify -> Assess -> Protect -> Monitor, then back to Identify",
          "Golden Rule of escalation: there are no issues too small to report -- when unsure, always err on the side of caution and escalate",
          "Confidential data (trade secrets, proprietary source code, unreleased financials) is the level typically governed by NDAs"
        ],
        "quiz": [
          {
            "id": "q1-gc8m1-mindset",
            "question": "What is the security mindset?",
            "type": "text",
            "correctAnswer": "The continuous ability to evaluate risk, seek out vulnerabilities, and identify potential or actual breaches. Assume every action could lead to a breach.",
            "hint": "See Quick Revision -- What is the security mindset?"
          },
          {
            "id": "q2-gc8m1-eventincident",
            "question": "What is the difference between an Event and a Security Incident?",
            "type": "text",
            "correctAnswer": "Event = observable occurrence (firewall blocks attack). Incident = event that results in a DATA BREACH or POLICY VIOLATION. All incidents are events; not all events are incidents.",
            "hint": "See Quick Revision -- Event vs. Security Incident?"
          },
          {
            "id": "q3-gc8m1-classification",
            "question": "What are the 4 data classification levels?",
            "type": "text",
            "correctAnswer": "Public (minimal risk), Private (moderate, internal), Sensitive (high -- PII/PHI/SPII), Confidential (severe -- trade secrets, NDAs).",
            "hint": "See Quick Revision -- 4 data classification levels?"
          },
          {
            "id": "q4-gc8m1-bcpdrp",
            "question": "What is the difference between BCP and DRP?",
            "type": "text",
            "correctAnswer": "BCP: keeps business operations running during disruption (people/ops). DRP: restores technical infrastructure after incident (IT/systems). Both run simultaneously.",
            "hint": "See Quick Revision -- BCP vs. DRP?"
          },
          {
            "id": "q5-gc8m1-lifecycle",
            "question": "What are the 4 steps of the Information Lifecycle Strategy?",
            "type": "text",
            "correctAnswer": "Identify (find important assets) -> Assess (review current controls) -> Protect (implement defences) -> Monitor (continuous observation). Repeat.",
            "hint": "See Quick Revision -- 4 steps of Information Lifecycle Strategy?"
          }
        ]},
      {
        "id": "escalate-incidents",
        "moduleId": "google-course-8",
        "title": "Escalate Incidents",
        "description": "Incident Types, Data Governance Roles, Escalation Policy, Asset Criticality, Triage.",
        "status": "unlocked",
        "iconType": "sword",
        "content": "",
        "realWorldCallout": {
          "title": "3 AM Database Admin Login",
          "concept": "Unauthorized Access: an individual (internal or external) gains digital or physical access to a system, data, or application without permission -- via brute-force, stolen credentials, or physical tailgating.",
          "scenario": "An external IP successfully logs into a database administrator account at 3 AM on a Sunday -- a classic indicator of compromised credentials. Escalate immediately; priority is based on asset criticality, and a live production system means critical urgency to prevent lateral movement.",
          "relevance": "Asset criticality drives escalation urgency -- an incident on a high-level asset (customer PII, live production) takes priority and must be routed to the IR team fast."
        },
        "mindmap": [
          {
            "id": "node-1",
            "label": "Escalation Process",
            "description": "Recognize a potential incident, then route it correctly. Save the Escalation Policy on day one -- an active incident is not the time to search for contact information.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Identify -> Triage -> Handoff",
            "description": "IDENTIFY the incident from alerts/logs/anomalies, TRIAGE its severity by asset criticality and type, then HANDOFF to the correct team per the Escalation Policy.",
            "x": 28,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "3 Incident Types",
            "description": "Malware Infection (bad code -- ransomware, keyloggers), Unauthorized Access (bad actors breaking in), Improper Usage (AUP violation -- always escalate to a supervisor, never judge intent yourself).",
            "x": 72,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Asset Criticality",
            "description": "All incidents matter but are not equal. A high-level asset (customer PII, live payment gateway) outranks a low-level asset (offline test server, guest Wi-Fi). Criticality drives urgency.",
            "x": 50,
            "y": 55,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "Data Governance Roles",
            "description": "Owner (accountable boss), Controller (purpose decider), Processor (third-party vendor), Custodian (technical implementer), DPO (compliance watchdog). Route the incident to the correct role.",
            "x": 28,
            "y": 78,
            "connections": ["node-7"]
          },
          {
            "id": "node-6",
            "label": "Breach Notification Laws",
            "description": "When PII/SPII/PHI is compromised, legal obligations trigger immediately. GDPR: notify within 72 hours; HIPAA: within 60 days. Never delay reporting a PII breach.",
            "x": 72,
            "y": 78,
            "connections": ["node-7"]
          },
          {
            "id": "node-7",
            "label": "When in Doubt, Escalate",
            "description": "There are no issues too small to report. Escalate any PII breach immediately to Legal Counsel and the DPO; never wait for the investigation to be complete.",
            "x": 50,
            "y": 93,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "The escalation sequence is Identify (recognize the incident) -> Triage (assess severity) -> Handoff (route per the Escalation Policy)",
          "Bookmark the Escalation Policy on your first day -- an active incident is not the time to search for contacts, and it lists backups when your supervisor is unavailable",
          "Three incident classification types: Malware Infection, Unauthorized Access, and Improper Usage (an AUP violation)",
          "Always escalate Improper Usage to a supervisor -- do NOT try to determine intent yourself; HR and Legal implications need experienced leadership",
          "Asset criticality is the primary driver of escalation urgency -- high-level assets (customer PII, live production) take priority over low-level ones",
          "Data governance roles: Owner (accountable boss), Controller (purpose decider), Processor (third-party vendor), Custodian (technical implementer), DPO (compliance watchdog)",
          "When PII/SPII/PHI is compromised, legal obligations trigger immediately -- GDPR requires notice within 72 hours, HIPAA within 60 days",
          "Never delay reporting a PII breach waiting for the investigation to complete -- escalate any PII breach to Legal Counsel and the DPO immediately"
        ],
        "quiz": [
          {
            "id": "q1-gc8m2-sequence",
            "question": "What is the escalation sequence?",
            "type": "text",
            "correctAnswer": "IDENTIFY (recognize incident) -> TRIAGE (assess severity) -> HANDOFF (route per escalation policy).",
            "hint": "See Quick Revision -- Escalation sequence?"
          },
          {
            "id": "q2-gc8m2-types",
            "question": "What are the 3 incident classification types?",
            "type": "text",
            "correctAnswer": "Malware Infection (bad code), Unauthorized Access (bad actors breaking in), Improper Usage (bad employee behavior -- AUP violation).",
            "hint": "See Quick Revision -- 3 incident classification types?"
          },
          {
            "id": "q3-gc8m2-urgency",
            "question": "What drives escalation urgency?",
            "type": "text",
            "correctAnswer": "Asset criticality. High-level assets (customer PII, live production systems) = highest urgency. Low-level assets = lower urgency.",
            "hint": "See Quick Revision -- What drives escalation urgency?"
          },
          {
            "id": "q4-gc8m2-ownercustodian",
            "question": "What is the difference between a Data Owner and a Data Custodian?",
            "type": "text",
            "correctAnswer": "Owner: accountable executive who sets access rules. Custodian: technical team member who implements those rules (IAM, firewall config).",
            "hint": "See Quick Revision -- Data Owner vs. Data Custodian?"
          },
          {
            "id": "q5-gc8m2-dpo",
            "question": "What is the DPO?",
            "type": "text",
            "correctAnswer": "Data Protection Officer -- independent role monitoring the organization's compliance with data protection laws (GDPR, HIPAA). Not a technical role.",
            "hint": "See Quick Revision -- What is the DPO?"
          }
        ]},
      {
        "id": "communicate-stakeholders",
        "moduleId": "google-course-8",
        "title": "Communicate Effectively to Stakeholders",
        "description": "Stakeholder Matrix, Security Storytelling, Dashboards, Communication Channels.",
        "status": "unlocked",
        "iconType": "clipboard",
        "content": "",
        "realWorldCallout": {
          "title": "Payroll Password-Guessing Spike",
          "concept": "Security Storytelling structures technical data into a business narrative: Beginning (what happened) + Middle (business impact + playbook strategy) + End (recommended action).",
          "scenario": "'We detected a 40% spike in automated password-guessing attempts against our HR payroll system over the past 24 hours. This endangers sensitive employee PII; following our playbook we initiated temporary geographic blocks on the source IP ranges. I recommend we immediately mandate MFA for all payroll administrators before the next business day.'",
          "relevance": "Each section answers one stakeholder question -- what to KNOW, why it MATTERS, and what to DECIDE -- so busy decision-makers can approve remediation instantly."
        },
        "mindmap": [
          {
            "id": "node-1",
            "label": "Stakeholders",
            "description": "Any individual or group with a distinct interest in an organization's decisions, activities, or outcomes. In security they form a chain of custody for risk.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Stakeholder Matrix",
            "description": "Each role needs different data: Operations Manager (daily anomalies), Risk Manager (systemic risk), Legal Counsel (PII breaches), CISO (post-mortems), CFO (financial reports), CEO (executive summaries).",
            "x": 28,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "Information Flow (Upward)",
            "description": "Information flows UPWARD: analyst -> operations manager -> risk manager -> CISO -> CFO -> CEO. Each tier needs data filtered differently. Never send raw logs to executives.",
            "x": 72,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Security Storytelling",
            "description": "Beginning (what happened) + Middle (business impact + playbook strategy) + End (recommended action). Translate technical facts into a business narrative decision-makers can act on.",
            "x": 50,
            "y": 55,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "Communication Channels",
            "description": "Match the medium to the message: visual dashboards for data-heavy metrics, instant message/phone for urgent incidents, detailed written reports for the CISO, short emails for daily briefings.",
            "x": 28,
            "y": 78,
            "connections": ["node-7"]
          },
          {
            "id": "node-6",
            "label": "4 Questions to Ask",
            "description": "Before every stakeholder communication: What do I want them to KNOW? Why is it IMPORTANT to them? When is ACTION needed? How do I explain it WITHOUT jargon?",
            "x": 72,
            "y": 78,
            "connections": ["node-7"]
          },
          {
            "id": "node-7",
            "label": "Translate to Business Impact",
            "description": "Executives decide in business terms (risk, cost, reputation). Remove technical jargon and frame everything as business impact so they can decide quickly.",
            "x": 50,
            "y": 93,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "A stakeholder is any individual or group with a distinct interest in the decisions, activities, or outcomes of an organization",
          "Information flows upward -- analyst -> operations manager -> risk manager -> CISO -> CFO -> CEO -- and each tier needs data filtered differently",
          "Legal Counsel handles regulatory compliance and PII breach legalities; the CFO gets tool procurement and financial risk reports",
          "Security Storytelling = Beginning (what happened) + Middle (business impact + playbook strategy) + End (recommended action)",
          "Use a visual dashboard for data-heavy metrics; use instant message or a phone call for urgent active incidents (email is too slow)",
          "The CISO needs detailed written reports (timelines, findings, recommendations); the Operations Manager needs concise, actionable escalations",
          "Before communicating, ask four questions: what to KNOW, why it's IMPORTANT, when ACTION is needed, and how to explain it WITHOUT jargon",
          "Never send raw log data to executives and an entry-level analyst never reports directly to the CEO -- route through your operations manager"
        ],
        "quiz": [
          {
            "id": "q1-gc8m3-stakeholder",
            "question": "What is a stakeholder?",
            "type": "text",
            "correctAnswer": "Any individual or group with a distinct interest in the decisions, activities, or outcomes of an organization.",
            "hint": "See Quick Revision -- What is a stakeholder?"
          },
          {
            "id": "q2-gc8m3-legal",
            "question": "Which stakeholder handles regulatory compliance and PII breach legalities?",
            "type": "text",
            "correctAnswer": "Legal Counsel -- tracks litigation, advises on data loss penalties, handles regulatory compliance.",
            "hint": "See Quick Revision -- Which stakeholder handles regulatory compliance?"
          },
          {
            "id": "q3-gc8m3-storytelling",
            "question": "What is the Security Storytelling formula?",
            "type": "text",
            "correctAnswer": "Beginning (what happened) + Middle (business impact + playbook strategy) + End (recommended action). Translate technical facts to business narrative.",
            "hint": "See Quick Revision -- Security Storytelling formula?"
          },
          {
            "id": "q4-gc8m3-dashboard",
            "question": "When should you use a visual dashboard?",
            "type": "text",
            "correctAnswer": "When communicating data-heavy metrics (numbers, percentages, trends) to busy stakeholders who need patterns at a glance.",
            "hint": "See Quick Revision -- When to use a visual dashboard?"
          },
          {
            "id": "q5-gc8m3-jargon",
            "question": "Why avoid jargon with executives?",
            "type": "text",
            "correctAnswer": "They make decisions in business terms (risk, cost, reputation). Technical jargon creates confusion and slows decision-making.",
            "hint": "See Quick Revision -- Why avoid jargon with executives?"
          }
        ]},
      {
        "id": "engage-community",
        "moduleId": "google-course-8",
        "title": "Engage with the Cybersecurity Community",
        "description": "Resources, Professional Orgs, Conferences, LinkedIn Networking, OWASP Top 10.",
        "status": "unlocked",
        "iconType": "network",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Continuous Learning",
            "description": "The threat landscape shifts constantly -- what was critical 3 years ago may be obsolete today. A certificate opens the door; continuous community engagement keeps skills relevant.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "News Resources",
            "description": "CSO Online (executive/risk focus), Krebs on Security (investigative deep-dives), Dark Reading (broad coverage), CISA Mailing Lists (free government threat intel).",
            "x": 28,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "Professional Orgs",
            "description": "Match the org to your career: CSA (cloud), NCSA (advocacy), WiCyS (women in security), CISO Executive Network (C-level only), OWASP (web app security). Don't join executive networks as an entry-level analyst.",
            "x": 72,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Conferences",
            "description": "BSides (small, local, HIGHLY recommended for entry-level networking), DEFCON and Black Hat (massive global, great for learning), OWASP Global AppSec (web app / DevSecOps focus).",
            "x": 50,
            "y": 58,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "LinkedIn Networking",
            "description": "Conversational tone, clear reason to connect, perfect grammar. NEVER include links or attachments -- it mimics social engineering and you will be blocked. Apply your security mindset to your own social media.",
            "x": 28,
            "y": 82,
            "connections": []
          },
          {
            "id": "node-6",
            "label": "OWASP Top 10",
            "description": "A globally recognized list of the 10 most critical web application security risks, updated every 3-4 years because the threat landscape shifts so drastically.",
            "x": 72,
            "y": 82,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "The threat landscape evolves constantly -- skills current 3 years ago may be obsolete, so continuous learning is required to stay relevant",
          "Four key security news resources: CSO Online (executive/risk), Krebs on Security (investigative), Dark Reading (broad), CISA Mailing Lists (government intel)",
          "CSA is the Cloud Security Alliance (cloud best practices); WiCyS is Women in Cybersecurity (recruitment, retention, advancement of women)",
          "Match a professional organization to your career trajectory -- don't join executive-level networks (like the CISO Executive Network) as an entry-level analyst",
          "BSides is small, local, and community-driven -- highly recommended for entry-level networking; DEFCON is massive and better for learning than networking at entry level",
          "Three LinkedIn outreach rules: conversational tone, clearly state your reason to connect, and use perfect grammar",
          "NEVER include links or attachments in LinkedIn outreach to security professionals -- it mimics social engineering and you will be blocked or reported",
          "The OWASP Top 10 is a globally recognized list of the 10 most critical web application security risks, updated every 3-4 years"
        ],
        "quiz": [
          {
            "id": "q1-gc8m4-learning",
            "question": "Why is continuous learning critical in cybersecurity?",
            "type": "text",
            "correctAnswer": "The threat landscape evolves constantly. Attackers innovate daily. Skills that were current 3 years ago may be obsolete. Continuous learning is required to stay relevant and effective.",
            "hint": "See Quick Revision -- Why is continuous learning critical?"
          },
          {
            "id": "q2-gc8m4-resources",
            "question": "Name 4 security news resources.",
            "type": "text",
            "correctAnswer": "CSO Online (executive/risk focus), Krebs on Security (investigative deep-dives), Dark Reading (broad coverage), CISA Mailing Lists (government threat intel).",
            "hint": "See Quick Revision -- Name 4 security news resources."
          },
          {
            "id": "q3-gc8m4-bsides",
            "question": "BSides vs. DEFCON for an entry-level analyst?",
            "type": "text",
            "correctAnswer": "BSides: small, local, community-driven, excellent for regional networking and job opportunities. DEFCON: massive global event, better for learning than personal networking at entry level.",
            "hint": "See Quick Revision -- BSides vs. DEFCON?"
          },
          {
            "id": "q4-gc8m4-linkedin",
            "question": "Why no links in LinkedIn outreach to security professionals?",
            "type": "text",
            "correctAnswer": "It mimics social engineering tactics. Security professionals are trained to block/report anyone who sends suspicious links.",
            "hint": "See Quick Revision -- Why no links in LinkedIn outreach?"
          },
          {
            "id": "q5-gc8m4-owasp",
            "question": "What is the OWASP Top 10?",
            "type": "text",
            "correctAnswer": "A globally recognized list of the 10 most critical web application security risks. Updated every 3-4 years.",
            "hint": "See Quick Revision -- What is OWASP Top 10?"
          }
        ]},
      {
        "id": "utilize-ai",
        "moduleId": "google-course-8",
        "title": "Utilize AI in Cybersecurity",
        "description": "TCREI Framework, AI Workflows, Prompt Engineering, Career Prep, AI Safety.",
        "status": "unlocked",
        "iconType": "network",
        "content": "",
        "realWorldCallout": {
          "title": "SYN Flood as a Diversion",
          "concept": "AI can assist SOC triage by prioritizing sanitized alert logs from highest to lowest severity -- and can spot tactics humans miss.",
          "scenario": "Paste sanitized alert logs into AI and it can identify a noisy SYN Flood as a DIVERSIONARY TACTIC masking a quiet data exfiltration happening simultaneously. Critical rule: always check your formal Incident Response Plan FIRST; only use AI to draft a response if the threat is completely absent from official playbooks.",
          "relevance": "Human-in-the-Loop -- never trust AI blindly, never paste PII or secrets into public tools, and always verify AI output in a sandbox before acting."
        },
        "mindmap": [
          {
            "id": "node-1",
            "label": "Generative AI",
            "description": "AI performs cognitive tasks; Generative AI (Gemini, ChatGPT, Claude) creates new content from a prompt. Watch for hallucinations (confident fabrications) and bias in training data.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "TCREI Framework",
            "description": "Thoughtfully Create Really Excellent Inputs: Task (what + persona + format), Context (who you are), References (an example), Evaluate (check accuracy), Iterate (refine). Detailed prompts = actionable results.",
            "x": 28,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-3",
            "label": "AI Workflows",
            "description": "Decode dense frameworks (NIST 800-53), debug and optimize code (find edge cases like division by zero), research new CVEs, and prioritize SOC alerts -- but check the IR plan first.",
            "x": 72,
            "y": 40,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "AI Safety & Governance",
            "description": "Human-in-the-Loop (never trust blindly), No PII or Secrets in public tools, Sanitize Inputs, Verify AI Code in a sandbox, and Check the official IR Plan First during incidents.",
            "x": 50,
            "y": 55,
            "connections": ["node-5", "node-6"]
          },
          {
            "id": "node-5",
            "label": "Cover Letters",
            "description": "Narrative-driven: a hook showing genuine interest in THIS company, your story, the pivot from prior fields (an asset, not a gap), and customization to their mission.",
            "x": 28,
            "y": 78,
            "connections": ["node-7"]
          },
          {
            "id": "node-6",
            "label": "Technical Interviews",
            "description": "Know core fundamentals (WHY, not just WHAT), ask clarifying questions, think out loud, write it down, use the STAR method, and be honest about unknowns.",
            "x": 72,
            "y": 78,
            "connections": ["node-7"]
          },
          {
            "id": "node-7",
            "label": "Human-in-the-Loop",
            "description": "The non-negotiable rule: AI lacks real-world context and can hallucinate. Always read, verify, and test AI-generated code in a sandbox before deploying to any live system.",
            "x": 50,
            "y": 93,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "Generative AI (Gemini, ChatGPT, Claude) creates new content from a prompt; watch for hallucinations (confident fabrications) and bias in training data",
          "TCREI = Task, Context, References, Evaluate, Iterate -- a framework for writing highly effective, actionable AI prompts",
          "Use AI to decode dense frameworks, debug code and find edge cases (like division by zero), research new CVEs, and help prioritize SOC alerts",
          "Human-in-the-Loop: never trust AI blindly -- always read, verify, and test AI-generated code in a sandbox before live deployment",
          "NEVER paste PII, source code, cryptographic keys, real IPs, or company-specific identifiers into a public AI tool -- it violates NDAs and can leak data",
          "Sanitize inputs before asking AI for help (replace real IPs with 10.0.0.x and names with 'User A') and always check your official IR Plan first",
          "A narrative-driven cover letter uses a company-specific hook, your story, the pivot from prior fields, and customization -- your diverse background is an asset",
          "In technical interviews: know WHY fundamentals exist, ask clarifying questions, think out loud, use STAR, and be honest about what you don't know"
        ],
        "quiz": [
          {
            "id": "q1-gc8m5-tcrei",
            "question": "What is TCREI?",
            "type": "text",
            "correctAnswer": "Task, Context, References, Evaluate, Iterate. A framework for writing highly effective AI prompts.",
            "hint": "See Flashcard Review -- What is TCREI?"
          },
          {
            "id": "q2-gc8m5-hallucination",
            "question": "What is AI hallucination?",
            "type": "text",
            "correctAnswer": "When an AI generates confident-sounding but factually incorrect or completely fabricated information. Always verify outputs.",
            "hint": "See Flashcard Review -- What is AI hallucination?"
          },
          {
            "id": "q3-gc8m5-nopii",
            "question": "What should you NEVER paste into a public AI tool?",
            "type": "text",
            "correctAnswer": "PII, company source code, cryptographic keys, real IP addresses, employee data, or any company-specific identifiers. Violates NDAs and creates data leaks.",
            "hint": "See Flashcard Review -- What should you NEVER paste into a public AI tool?"
          },
          {
            "id": "q4-gc8m5-humanloop",
            "question": "What is the 'Human-in-the-Loop' rule?",
            "type": "text",
            "correctAnswer": "Never trust AI blindly. Always verify and test AI-generated code in a sandbox before deploying to any live system.",
            "hint": "See Flashcard Review -- What is the 'Human-in-the-Loop' rule?"
          },
          {
            "id": "q5-gc8m5-star",
            "question": "What is the STAR method?",
            "type": "text",
            "correctAnswer": "Situation, Task, Action, Result. Use for behavioral interview questions to provide a complete structured narrative.",
            "hint": "See Flashcard Review -- STAR method?"
          }
        ]},
      {
        "id": "mystery-chest-gc8",
        "moduleId": "google-course-8",
        "title": "Mystery Chest",
        "description": "Quick revision of all Course 8 concepts.",
        "status": "unlocked",
        "iconType": "chest",
        "content": "",
        "mindmap": [
          {
            "id": "node-1",
            "label": "Protect Data & Incidents",
            "description": "Security mindset, events vs. incidents, four data classification levels, BCP vs. DRP, the Information Lifecycle Strategy (Identify -> Assess -> Protect -> Monitor), and when to escalate.",
            "x": 50,
            "y": 15,
            "connections": ["node-2", "node-3"]
          },
          {
            "id": "node-2",
            "label": "Escalate Incidents",
            "description": "Identify -> Triage -> Handoff. Three incident types (Malware, Unauthorized Access, Improper Usage), asset criticality, data governance roles, and breach notification laws (GDPR 72h, HIPAA 60d).",
            "x": 28,
            "y": 42,
            "connections": ["node-5"]
          },
          {
            "id": "node-3",
            "label": "Communicate to Stakeholders",
            "description": "The stakeholder matrix, upward information flow, Security Storytelling (Beginning/Middle/End), communication channels, and the 4 questions to ask before every message.",
            "x": 72,
            "y": 42,
            "connections": ["node-4"]
          },
          {
            "id": "node-4",
            "label": "Community & AI",
            "description": "Continuous learning, news resources, professional orgs, conferences, LinkedIn networking, OWASP Top 10, the TCREI prompting framework, AI safety, and career preparation.",
            "x": 50,
            "y": 68,
            "connections": ["node-5"]
          },
          {
            "id": "node-5",
            "label": "Glossary & Flashcards",
            "description": "The complete Course 8 glossary plus full flashcard review across all five modules -- terms, definitions, and rapid-fire Q&A for exam-ready recall.",
            "x": 50,
            "y": 92,
            "connections": []
          }
        ],
        "keyTakeaways": [
          "The security mindset means continuously evaluating risk; a security incident is an event that causes a data breach or policy violation",
          "Four data classification levels (Public, Private, Sensitive, Confidential); BCP sustains operations while DRP restores technology -- both run simultaneously",
          "Escalation is Identify -> Triage -> Handoff; the three incident types are Malware Infection, Unauthorized Access, and Improper Usage",
          "Asset criticality drives escalation urgency; route incidents to the right data governance role (Owner, Controller, Processor, Custodian, DPO)",
          "GDPR requires breach notification within 72 hours and HIPAA within 60 days -- escalate any PII breach immediately, never wait",
          "Information flows upward through the stakeholder chain; Security Storytelling (Beginning/Middle/End) translates technical facts into business impact",
          "Continuous learning is non-negotiable; BSides suits entry-level networking, and LinkedIn outreach must never include links or attachments",
          "TCREI (Task, Context, References, Evaluate, Iterate) structures AI prompts; Human-in-the-Loop and never pasting PII into public tools are non-negotiable"
        ],
        "quiz": [
          {
            "id": "q1-gc8mc-eventincident",
            "question": "What is the difference between a security event and a security incident?",
            "type": "text",
            "correctAnswer": "Event = observable occurrence (firewall blocks attack). Incident = event resulting in a data BREACH or POLICY VIOLATION. All incidents are events; not all events are incidents.",
            "hint": "See Flashcard Review -- Event vs. Security Incident?"
          },
          {
            "id": "q2-gc8mc-bcpdrp",
            "question": "What is the difference between BCP and DRP?",
            "type": "text",
            "correctAnswer": "BCP: keeps business operations running during disruption (people, customers, ops). DRP: restores broken technology after incident (servers, software, data). Both run simultaneously.",
            "hint": "See Flashcard Review -- BCP vs. DRP?"
          },
          {
            "id": "q3-gc8mc-types",
            "question": "What are the 3 incident classification types?",
            "type": "text",
            "correctAnswer": "Malware Infection (bad code: ransomware, viruses), Unauthorized Access (bad actors breaking in: brute force), Improper Usage (bad employee behavior: AUP violation).",
            "hint": "See Flashcard Review -- 3 incident classification types?"
          },
          {
            "id": "q4-gc8mc-storytelling",
            "question": "What is the Security Storytelling formula?",
            "type": "text",
            "correctAnswer": "Beginning (what happened) + Middle (business impact + playbook action) + End (recommended solution/approval needed).",
            "hint": "See Flashcard Review -- Security Storytelling formula?"
          },
          {
            "id": "q5-gc8mc-tcrei",
            "question": "What is TCREI?",
            "type": "text",
            "correctAnswer": "Task, Context, References, Evaluate, Iterate. A framework for writing highly effective AI prompts.",
            "hint": "See Flashcard Review -- What is TCREI?"
          }
        ]}
    ]
  }
];
