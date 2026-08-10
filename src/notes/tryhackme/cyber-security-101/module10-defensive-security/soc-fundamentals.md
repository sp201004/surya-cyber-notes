| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Defensive Security / SOC |
| **Difficulty** | Easy |
| **Time** | ~30 Minutes |
| **Module** | Defensive Security |

---

## Objective

A **Security Operations Center (SOC)** is a dedicated team and facility that continuously monitors an organisation's network, computers, servers, cloud infrastructure, endpoints, security systems, logs and events. Its whole reason to exist is to **detect suspicious or malicious activity and respond to security incidents before they cause significant damage**. This room builds the concept from the ground up: what a SOC is and why modern organisations need one, its two core capabilities (**Detection** and **Response**), the three pillars that make it work (**People, Process, Technology**), the roles inside a SOC (CISO down to L1 analyst), the alert-triage process and the **5 Ws**, reporting and the **Incident Response** lifecycle, the security tooling a SOC runs (SIEM, EDR, IDS/IPS, XDR, SOAR and more), and finally a practical **port-scan investigation** performed the way a Level 1 analyst would.

By the end of this room you will be able to:

- Explain what a **SOC** is and why continuous **24/7** monitoring is necessary
- Describe the two core SOC capabilities — **Detection** and **Response** — and the four detection areas
- Identify the three pillars — **People, Process, Technology** — and why all three are required
- Map the SOC roles and escalation path: **CISO → SOC Manager → L1 → L2 → L3**, plus Security and Detection Engineers
- Perform **alert triage** and apply the **5 Ws** (Who, What, When, Where, Why) to an alert
- Distinguish a **false positive** from a **true positive**, and severity from priority
- Walk the **Incident Response** lifecycle: Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned
- Compare the major SOC technologies — **SIEM, EDR, Firewall, Antivirus, EPP, IDS, IPS, XDR, SOAR**
- Investigate a realistic **port-scan** alert and decide whether it is authorised or malicious

> **Analyst mindset:** *An alert is the beginning of an investigation, not the conclusion.* Don't blindly trust the alert title or your own assumptions — investigate the evidence, understand the context, correlate the events, then decide.

---

## Task 1 — What Is a SOC?

A **Security Operations Center (SOC)** is a dedicated facility/team responsible for continuously monitoring an organisation's **network, computers, servers, cloud infrastructure, endpoints, security systems, and logs/events**. Its main objective is to **detect suspicious or malicious activity and respond to security incidents before they cause significant damage**.

At its simplest, the SOC's job is a loop: `Monitor → Detect → Investigate → Respond`, all in service of protecting the organisation.

### Why Do We Need a SOC?

Modern organisations depend heavily on technology, and important information no longer lives only in physical filing cabinets. It now sits in **databases, cloud storage, servers, applications, employee devices, customer data, credentials, financial data and source code**. That shift means attackers can target digital infrastructure remotely instead of physically entering a building. Because threat actors continuously discover and exploit new **vulnerabilities** (weaknesses that can be exploited) across operating systems, applications, servers, network devices, cloud services and employee accounts, organisations need **continuous security monitoring**.

### The SOC Runs 24/7

A SOC generally works **24 hours a day, 7 days a week (24/7)** because attacks can happen at any time — security monitoring cannot depend only on normal business hours. Continuous monitoring across employees, security systems and events lets the SOC separate normal activity from suspicious activity that needs investigating.

### What Does the SOC Monitor?

A SOC pulls telemetry from many sources so it can spot suspicious behaviour anywhere in the environment:

| Source | Examples |
|---|---|
| **Network** | Routers, Switches, Firewalls, IDS/IPS, Network Traffic |
| **Endpoints** | Laptops, Desktops, Servers, Workstations, Mobile Devices |
| **Applications** | Web Applications, APIs, Databases, Business Applications |
| **Identity** | User Logins, Authentication, Privilege Changes, Failed Login Attempts, Account Activity |
| **Cloud** | Cloud Servers, Cloud Applications, Cloud Logs, IAM Activity, Storage Access |

### Why Traditional Security Alone Is Not Enough

A firewall blocks some malicious traffic, but an attacker using **legitimate stolen credentials** may not be recognised as malicious. Attackers can also use malware, phishing, vulnerabilities, misconfigured systems, social engineering and legitimate tools. Therefore organisations need a team that continuously monitors and *investigates* activity rather than relying on a single control.

### SOC = People + Process + Technology

A SOC is not just a single security tool. It is a combination of **People + Process + Technology**, and all three are discussed throughout the room. The core goal of a SOC is **Detection and Response**.

```text
SOC
 │
 ├── Monitor
 ├── Detect
 ├── Investigate
 └── Respond
        │
        ▼
   Protect Organization
```

> **Memory trick:** `M → D → I → R` = **Monitor → Detect → Investigate → Respond**.

### Task 1 — Answer

| Question | Answer |
|---|---|
| **What does the term SOC stand for?** | Security Operations Center |

### Interview Questions — SOC Basics

| Question | Answer |
|---|---|
| **Q1. What does SOC stand for?** | Security Operations Center |
| **Q2. What is a SOC?** | A dedicated security team/facility that continuously monitors an organization's systems and networks to detect, investigate, and respond to security threats. |
| **Q3. Why does a SOC operate 24/7?** | Because cyber attacks can happen at any time. Continuous monitoring helps detect and respond to threats as quickly as possible. |
| **Q4. What are the primary responsibilities of a SOC?** | Monitoring, Detection, Investigation, Incident Response. |
| **Q5. What are the three pillars of a SOC?** | People, Process, Technology. |
| **Q6. What is the main objective of a SOC?** | To continuously detect suspicious activity and respond to security incidents to protect the organization. |

---

## Task 2 — Purpose of a SOC: Detection & Response

The primary focus of a SOC team is to maintain **Detection + Response**. Security solutions bring information from across the organisation (network, systems, applications, endpoints, users, security events) into a **centralized location**, so instead of monitoring every device separately the SOC can watch security events from one place and detect incidents as early as possible.

### Detection — Four Areas

**Detection** means identifying suspicious, unauthorized, or potentially harmful activity. The room focuses on four detection capabilities, authored here as concept cards:

> **1. Detect Vulnerabilities**
> A **vulnerability** is a weakness an attacker can exploit to act beyond their intended permission level (in operating systems, applications, servers, computers, web apps, network devices). Vulnerability management may not always be the SOC's direct responsibility, but **unfixed vulnerabilities affect the overall security level of the organization**, so the SOC may detect/monitor them and coordinate with other teams.

> **2. Detect Unauthorized Activity**
> Activity performed by users who should not have access — e.g. an attacker using stolen credentials. It may look suspicious because of unusual geographic location, unusual login time, an unknown device, multiple failed logins, abnormal behaviour or unexpected resource access.

> **3. Detect Policy Violations**
> A **security policy** is the set of rules and procedures that protect the organisation and ensure compliance. Example violations: unauthorized software, downloading sensitive data to personal devices, sharing company credentials, using unauthorized devices.

> **4. Detect Intrusions**
> An **intrusion** is unauthorized access to a system or network — e.g. an attacker exploiting a web-application vulnerability, or a user visiting a malicious website and infecting their endpoint with malware.

> **Memory trick:** `V → U → P → I` = **V**ulnerabilities, **U**nauthorized Activity, **P**olicy Violations, **I**ntrusions.

### Response

Detection alone is not enough. After detecting an incident, the SOC supports the response process: investigating the alert, determining impact, containing the threat, supporting incident response, performing **Root Cause Analysis (RCA)** ("Why did this happen?"), escalating, and helping recover affected systems.

`Detection` → **"Something is wrong."**  ·  `Response` → **"Let's deal with it."**

### The Three Pillars

A mature SOC depends on three pillars that must work together — technology alone does not create an effective SOC:

> **1. People**
> The human professionals who operate the SOC (SOC Manager, Analysts L1/L2/L3, Security Engineer, Detection Engineer). Security tools generate alerts, but not every alert is malicious — humans provide analysis, decision-making, investigation, threat hunting, incident response and expertise.

> **2. Process**
> The defined procedures and workflows: alert triage, incident investigation, incident response, escalation, reporting, threat hunting, recovery. Without proper process an alert leads to confusion, delayed response and greater impact.

> **3. Technology**
> The security solutions (SIEM, EDR, Firewall, IDS/IPS, Antivirus, EPP, XDR, SOAR) that collect data, monitor systems, detect threats, generate alerts, aid investigation and automate responses.

Why all three matter: **Technology without People** = thousands of unanalysed alerts. **People without Process** = inconsistent response. **People + Process without Technology** = manual monitoring that is slow and hard at scale. Together they produce a **mature SOC**.

### Detection vs Response

| Detection | Response |
|---|---|
| Finds suspicious activity | Handles the incident |
| Generates/raises alerts | Investigates and contains |
| Identifies threats | Minimizes impact |
| Finds vulnerabilities | Supports remediation |
| Detects unauthorized activity | Supports incident response |
| Detects intrusions | Performs/assists recovery |

> **Memory trick:** `DETECT = FIND`, `RESPONSE = FIX / HANDLE`.

### Task 2 — Answers

| Question | Answer |
|---|---|
| **Q1. The SOC team discovers an unauthorized user trying to log in to an account. Which capability of SOC is this?** | Detection |
| **Q2. What are the three pillars of a SOC?** | People, Process, Technology |

### Interview Questions — Purpose & Components

| Question | Answer |
|---|---|
| **Q1. What are the two primary capabilities of a SOC?** | Detection and Response. |
| **Q2. What are the three pillars of a SOC?** | People, Process, Technology. |
| **Q3. What does a SOC detect?** | Vulnerabilities, unauthorized activity, policy violations, and intrusions. |
| **Q4. Why is continuous monitoring important in a SOC?** | It allows the SOC to identify suspicious activity as early as possible and respond before the incident causes greater damage. |
| **Q5. What is the difference between detection and response?** | Detection identifies a potential threat, while response investigates and takes action to contain, remediate, and recover from the threat. |
| **Q6. Why are people important in a SOC?** | Tools generate alerts, but analysts investigate them, distinguish real threats from false positives, make decisions, and coordinate response actions. |

---

## Task 3 — People: SOC Roles & Hierarchy

A successful SOC needs skilled security professionals who can **Monitor → Analyse → Investigate → Make Decisions → Respond → Improve Security**. Technology can generate alerts, but humans understand those alerts and decide what happens next. Security tools can generate thousands of events a day, so an analyst must reason: *Is this normal? If not, investigate. Is it malicious? If yes, escalate.*

### The Roles

A typical SOC structure runs from the CISO down through the SOC Manager to tiered analysts, alongside engineering roles. Each role is a concept card:

> **1. CISO — Chief Information Security Officer**
> Generally the senior-most security leader. Focuses on the organisation's **overall security strategy** rather than individual alerts: security governance, risk management, policies, compliance, budgets, executive communication, architecture direction and incident-management oversight. Asks *"How secure is the organization?"*

> **2. SOC Manager**
> Manages the day-to-day operation of the SOC and acts as the bridge between analysts and management. Handles shifts, assigns responsibilities, monitors performance, manages escalation, creates operational procedures, coordinates with other teams, reports metrics and ensures adequate coverage.

> **3. SOC Analyst L1 — Alert Monitoring & Initial Triage**
> Usually the first person to investigate incoming alerts. Monitors and reviews SIEM alerts, performs initial investigation, validates whether an alert is suspicious, identifies false positives, collects initial information, categorises alerts and escalates confirmed/high-priority incidents. Asks *"Is this suspicious?"*

> **4. SOC Analyst L2 — Deeper Investigation**
> Handles alerts needing more detailed work: deeper investigation, log/endpoint/network analysis, threat-intelligence research, malware investigation, correlation of multiple events, determining attack scope, containment support and escalation to L3. Asks *"What exactly happened?"*

> **5. SOC Analyst L3 — Advanced Investigation & Threat Hunting**
> Handles the most complex investigations with advanced expertise in threat hunting, malware analysis, digital forensics, advanced network analysis, detection engineering and attacker techniques. Investigates the entire attack chain and helps improve the SOC itself.

> **6. Security Engineer**
> Designs, implements, maintains and improves security infrastructure — deploying and configuring security tools, integrating products, managing endpoint solutions and troubleshooting technology. *"Build and maintain security systems."*

> **7. Detection Engineer**
> Creates and improves security detections so the SOC identifies malicious activity more effectively — building detection rules, reducing false positives, mapping detections to attacker techniques, and working with SIEM data. *"Make security systems better at detecting threats."*

### L1 → L2 → L3 Escalation

Not every analyst investigates every incident. Escalation routes each incident to the right skill level, keeping operations efficient:

`Simple / Routine Login Alert → L1`  ·  `Moderate / Potential Account Compromise → L2`  ·  `Complex / Advanced Persistent Threat → L3`

```text
                  ALERT
                    │
                    ▼
                SOC L1 ── Initial Triage
                    │
            ┌───────┴───────┐
          Benign          Suspicious
            │               │
          Close           SOC L2 ── Deep Investigation
                            │
                     ┌──────┴──────┐
                   Resolved      Complex
                     │             │
                   Close         SOC L3 ── Threat Hunting / Forensics / Response
```

### False Positive vs True Positive

A security alert does **not** automatically mean an attack — it means *potentially suspicious activity*. The analyst decides between benign activity, a false positive, or a true security incident.

- **False positive** — a security system alerts on activity that is **not** actually malicious (e.g. an employee logging in from another country turns out to be travelling). Document the reason and close.
- **True positive** — the alert **correctly** identifies malicious or unauthorized activity (e.g. stolen credentials → attacker access). Escalate.

### SOC Roles by Focus

| Role | Primary Focus |
|---|---|
| **CISO** | Security strategy and organizational risk |
| **SOC Manager** | SOC operations and team management |
| **SOC Analyst L1** | Alert monitoring and initial triage |
| **SOC Analyst L2** | Detailed investigation |
| **SOC Analyst L3** | Advanced investigation and threat hunting |
| **Security Engineer** | Security infrastructure and controls |
| **Detection Engineer** | Detection rules and detection capability |

> **Memory trick:** Analyst levels — `L1 = LOOK`, `L2 = LEARN`, `L3 = LEAD`. Practically: `L1 → Triage`, `L2 → Investigate`, `L3 → Hunt`.

### Interview Questions — People

| Question | Answer |
|---|---|
| **Q1. What does a SOC Analyst L1 do?** | Monitors alerts, performs initial triage, identifies potential false positives, collects initial information, and escalates suspicious incidents. |
| **Q2. What does an L2 analyst do?** | Performs deeper investigation, correlates events, determines incident scope and impact, and supports containment and response. |
| **Q3. What does an L3 analyst do?** | Handles advanced investigations, threat hunting, malware analysis, digital forensics, and sophisticated security incidents. |
| **Q4. What is the role of a SOC Manager?** | Manages SOC operations, personnel, workflows, escalation, performance, and coordination during incidents. |
| **Q5. What does a CISO do?** | Leads the organization's overall information security strategy, risk management, governance, and security program. |
| **Q6. What does a Security Engineer do?** | Designs, implements, configures, and maintains security infrastructure and controls. |
| **Q7. What does a Detection Engineer do?** | Creates and improves detection rules and mechanisms used to identify malicious activity. |
| **Q8. Why are different SOC analyst levels needed?** | Different incidents have different complexity levels — L1 handles initial triage, L2 handles deeper investigation, and L3 handles advanced investigations and threat hunting. |
| **Q9. What is a false positive?** | An alert incorrectly identifying benign activity as malicious or suspicious. |
| **Q10. What is a true positive?** | An alert that correctly identifies malicious or unauthorized activity. |

---

## Task 4 — Process: Alert Triage & the 5 Ws

After a tool generates an alert, an analyst must determine what happened, who was involved, when/where it happened, and why. This initial investigation is **Alert Triage** — reviewing and analysing an alert to determine whether it is legitimate, whether the activity is suspicious, whether it is a false positive, how serious it is, what further investigation is required, and whether it should be escalated.

### Why Triage Matters

Security tools can generate a large number of alerts (e.g. 1000 events → 100 alerts → one analyst). Treating every alert with equal priority causes **alert fatigue, delayed investigation, missed attacks, poor resource allocation and slow response**. The triage flow: `Alert → Understand → Validate → Prioritize → Escalate / Close`.

### The 5 Ws of Alert Triage

The core investigation technique, authored here as concept cards:

> **1. WHO?** — *Who is involved in the activity?* User, account, computer, server, source IP, destination IP, process, application. (e.g. "Who logged in? Which account/device? Who owns it?")

> **2. WHAT?** — *What happened?* Understand the actual event, not just the alert title: failed/successful login, port scan, malware execution, file download, privilege escalation, suspicious PowerShell, data transfer.

> **3. WHEN?** — *When did it happen?* Date, time, timezone, duration, first/last occurrence. Timeline information is essential for building an attack chain.

> **4. WHERE?** — *Where did it occur?* Source/destination IP, hostname, endpoint, server, network segment, geographic location, cloud environment, application.

> **5. WHY?** — *Why did this happen?* Often the hardest question: legitimate administration, user error, automated system, security testing, misconfiguration, compromised account, malware, or attacker activity. Don't assume malicious intent.

> **Memory:** `Person → Activity → Time → Location → Reason`. WHO/WHAT/WHEN/WHERE are usually observable from logs; WHY requires investigation + context.

### Severity vs Priority

Alerts are commonly classified by severity — **Low, Medium, High, Critical**:

| Severity | Typical example |
|---|---|
| **Low** | Single failed login (forgotten/incorrect password) |
| **Medium** | Multiple failed login attempts (possible brute force / user mistake) |
| **High** | Malware execution, privilege escalation, confirmed account compromise, suspicious lateral movement |
| **Critical** | Ransomware, major data breach, active domain-admin compromise, large-scale exfiltration |

**Severity** = *how serious could this be?* **Priority** = *how urgently should we handle it?* They are related but not identical — e.g. `High Severity + Currently Active = Very High Priority`, whereas `High Severity + Old/Contained = Lower Immediate Priority`. **Asset criticality** also shifts priority: the same port scan on a test machine vs a domain controller warrants very different attention.

### Enrichment, Threat Intelligence & Correlation

Analysts **enrich** an alert with context (asset info, user info, historical activity, related events) and use **threat intelligence** to check whether an IP/domain/hash/indicator is known malicious — treating it as evidence, not an automatic verdict. Single events may look harmless, but **correlation** reveals the story:

`Failed Login → Successful Login → Privilege Change → Suspicious Process → External Connection` = **Potential Account Compromise**.

Good investigations are **evidence-based** ("known malicious IP + unusual login + suspicious process + malicious domain") rather than "looks suspicious."

### Complete Triage Workflow

`Alert → Read → Collect Data → 5 Ws → (Benign → Validate → Close)` or `(Suspicious → Investigate → Assess Risk → Low/Medium: continue | High: Escalate → L2/L3)`.

### Interview Questions — Process & Triage

| Question | Answer |
|---|---|
| **Q1. What is alert triage?** | The initial process of analysing a security alert to determine its legitimacy, severity, impact, and whether further investigation or escalation is required. |
| **Q2. What are the 5 Ws used in SOC investigation?** | Who, What, When, Where, Why. |
| **Q3. Why are the 5 Ws important?** | They provide a structured way to understand an event and gather the context required for investigation. |
| **Q4. What is a false positive?** | When a security system generates an alert for activity that turns out to be legitimate or benign. |
| **Q5. What is a true positive?** | When a security alert correctly identifies malicious or unauthorized activity. |
| **Q6. What factors affect alert priority?** | Severity, asset criticality, business impact, threat intelligence, attack status, affected user, scope. |
| **Q7. Why is context important during alert investigation?** | The same activity can be either legitimate or malicious depending on the environment and circumstances. |
| **Q8. Why should SOC analysts correlate multiple events?** | Individual events may not reveal the full attack chain; correlation can reveal relationships and suspicious patterns. |
| **Q9. When should an alert be escalated?** | When it indicates confirmed malicious activity, high severity, critical asset impact, active compromise, data breach, or requires deeper expertise. |
| **Q10. What should an analyst do before closing an alert?** | Validate the activity, collect sufficient evidence, determine it is benign or a false positive, and document the reasoning. |

---

## Task 5 — Reporting & Incident Response

Detecting an incident is only the beginning — the SOC must also communicate what happened and help the organisation respond. The end-to-end flow is `Security Event → Alert → Triage → Investigation → Reporting → Escalation → Incident Response → Containment → Eradication → Recovery → Lessons Learned`.

### Incident Reporting

**Incident reporting** documents and communicates information about a security incident, answering: what happened, who/what was affected, when and where, how it was detected, the impact, actions taken, current status, and next steps. Clear reporting drives better decisions and faster response; poor reporting causes confusion, delay and greater impact. A useful report contains:

| Information | Example |
|---|---|
| Incident ID | INC-2026-001 |
| Date/Time | 10 Aug 2026 14:30 |
| Detection Source | SIEM |
| Affected User | Alice |
| Affected Host | WORKSTATION-01 |
| Source IP | 10.10.10.50 |
| Destination | External Server |
| Activity | Suspicious PowerShell |
| Severity | High |
| Evidence | Logs / EDR telemetry |
| Impact | Potential endpoint compromise |
| Actions | Host isolated |
| Status | Under investigation |

An **incident timeline** is one of the most useful parts of a report, turning apparently unrelated events into an attack chain (`Initial Access → Execution → Persistence → Privilege Escalation → Lateral Movement → Data Access`).

### Incident Response Lifecycle

**Incident Response (IR)** is the structured process used to handle and manage a security incident. Where the SOC focuses on monitoring, detection, triage, investigation and escalation, IR focuses more heavily on containment, eradication, recovery and post-incident analysis. The six lifecycle phases, as concept cards:

> **1. Preparation**
> Be ready *before* an incident: security policies, IR plans, backups, monitoring, logging, security tools, communication plans, training and playbooks. A prepared org gets fast detection → fast containment → faster recovery; an unprepared org gets confusion, delayed decisions and greater damage.

> **2. Identification**
> Determine whether an event is actually a security incident — this is where SOC analysts play a major role (`Alert → Triage → Investigation → Evidence → Incident Confirmed`). Ask what happened, which systems are affected, whether the attacker is still active and the potential impact.

> **3. Containment**
> **Limit the attack and prevent further damage.** Actions: isolating an endpoint, blocking an IP or malicious domain, disabling a compromised account, restricting network access. Split into **short-term** (immediate — disconnect the device) and **long-term** (segment network, restrict access, continue investigating).

> **4. Eradication**
> **Remove the root cause and malicious presence:** identify and remove malware, remove persistence, patch the vulnerability, reset compromised credentials, remove malicious accounts. The goal is to remove the attacker's ability to return.

> **5. Recovery**
> **Restore affected systems safely:** restore backups, rebuild systems, patch, reset credentials, reconnect hosts, monitor and validate security. A compromised system should not simply be reconnected — validate, verify patches and monitor before controlled reconnection to reduce reinfection.

> **6. Lessons Learned**
> After resolution, review what happened, how the attacker got in, why the attack succeeded, how it was detected, what worked and what failed, and how detection/prevention can improve. This builds resilience.

> **Memory trick:** `Contain = Stop`, `Eradicate = Remove`, `Recover = Restore safely`. The wider process is **TIRE-CRL** — **T**riage, **I**nvestigate, **R**eport, **E**scalate, **C**ontain, **R**ecover, **L**earn.

### Supporting Concepts

- **Root Cause Analysis (RCA)** — identifies the underlying reason an incident occurred (e.g. Ransomware ← malware execution ← malicious attachment ← phishing email ← weak email filtering). Removing the threat without fixing the root cause invites a repeat attack.
- **Digital forensics** — collecting and analysing digital evidence (disk images, memory, logs, files, processes, network traffic, registry, authentication events) to understand what happened and what evidence remains.
- **Evidence preservation & chain of custody** — do not unnecessarily modify evidence; document actions, record timestamps and maintain **chain of custody** (`Collected → Handled → Transferred → Stored → Analysed`).
- **IoC vs IoA** — an **Indicator of Compromise (IoC)** is *evidence of compromise* (malicious IP/domain, file hash, C2 address, compromised account); an **Indicator of Attack (IoA)** is *evidence of attack behaviour* (repeated failed logins, suspicious PowerShell, credential dumping, lateral movement, abnormal privilege changes).
- **Technical vs executive reporting** — technical reports focus on IPs, hashes, commands, processes, logs and IoCs; executive reports focus on business impact, risk, status, actions taken and remaining risk.

### Interview Questions — Reporting & IR

| Question | Answer |
|---|---|
| **Q1. What is Incident Response?** | The structured process of handling, containing, investigating, eradicating, and recovering from security incidents. |
| **Q2. What are the major phases of Incident Response?** | Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned. |
| **Q3. What is containment?** | Limiting the spread or impact of a security incident (e.g. isolate a compromised endpoint). |
| **Q4. What is eradication?** | Removing the malicious presence and addressing the cause of the incident. |
| **Q5. What is recovery?** | Restoring systems to normal and verifying they are secure before returning them to production. |
| **Q6. What is Root Cause Analysis?** | Identifying the underlying reason that allowed an incident to occur. |
| **Q7. Why is evidence preservation important?** | Evidence may be required to understand the attack, determine scope, support investigations, and satisfy legal/compliance requirements. |
| **Q8. What is the difference between containment and eradication?** | Containment stops/limits the attack; eradication removes the threat. |
| **Q9. What is digital forensics?** | Collecting and analysing digital evidence to understand what happened during an incident. |
| **Q10. What is chain of custody?** | A record of how evidence was collected, handled, transferred, stored, and analysed. |

---

## Task 6 — Technology: The SOC Toolset

Technology provides the visibility and capabilities a SOC needs to **Collect → Monitor → Detect → Investigate → Respond**. Modern organisations have thousands of endpoints, hundreds of servers, multiple networks, cloud infrastructure, applications and databases — each producing logs and events — so a SOC needs technology to collect and process this information. A **log** is a record of an event that occurred on a system, for example:

```text
2026-08-10 10:30:15
User: alice
Source IP: 10.10.10.50
Action: Login
Status: Success
```

The major technologies, authored as concept cards:

> **1. SIEM — Security Information and Event Management**
> Collects, centralizes, analyses, correlates and searches security-related logs and events from many sources (operating systems, servers, firewalls, applications, databases, cloud, authentication systems, EDR, DNS, proxies). Its power is **event correlation** — turning many low-signal events into one meaningful alert. *"What is happening across the organization?"*

> **2. EDR — Endpoint Detection and Response**
> Focuses on endpoints (laptops, desktops, workstations, servers) with deep visibility into processes, command lines, parent/child process relationships, file activity, registry activity, network connections and users. Response actions: isolate endpoint, kill process, quarantine file, collect evidence, block activity. *"What is happening on this endpoint?"*

> **3. Firewall**
> A security control that monitors and controls network traffic according to defined rules (source/destination IP, port, protocol, direction, application) — allowing or blocking traffic and generating network logs that can feed a SIEM.

> **4. Antivirus (AV)**
> Detects and prevents malicious software, traditionally via known malware signatures (viruses, trojans, worms, malicious files). Modern AV may add behavioural and machine-learning techniques.

> **5. EPP — Endpoint Protection Platform**
> A broader set of **preventive** endpoint capabilities: antivirus, malware prevention, firewall, application control, device control and exploit prevention. Prevention-focused (`EPP → PREVENT`) versus EDR (`detect + investigate + respond`).

> **6. IDS — Intrusion Detection System**
> Monitors network or system activity for suspicious patterns and **generates alerts** (e.g. many port probes → "Possible Port Scan" alert). *"I Detect."*

> **7. IPS — Intrusion Prevention System**
> Detects malicious traffic **and can take action to block/prevent it**, typically deployed inline. *"I Prevent."*

> **8. XDR — Extended Detection and Response**
> Extends detection and response **beyond a single endpoint**, correlating telemetry across endpoints, network, email, cloud, identity and applications — useful because attackers move across domains (phishing → endpoint → credential theft → cloud → data access).

> **9. SOAR — Security Orchestration, Automation and Response**
> Automates repetitive tasks and coordinates actions across tools via **playbooks** (e.g. extract IP → threat-intel lookup → block if malicious → create ticket). SOAR does *not* replace analysts — it automates repetitive work while humans handle complex decisions; sensitive actions may require human approval.

### Technology Comparison

| Technology | Main Purpose |
|---|---|
| **SIEM** | Centralize and correlate security events |
| **EDR** | Detect/investigate/respond on endpoints |
| **Firewall** | Control network traffic |
| **Antivirus** | Detect/prevent malware |
| **EPP** | Broad endpoint prevention |
| **IDS** | Detect suspicious network/system activity |
| **IPS** | Detect and prevent suspicious traffic |
| **XDR** | Cross-domain detection and response |
| **SOAR** | Automate and orchestrate security workflows |

Tools are often grouped by goal — **Prevention** (EPP, AV, FW, IPS), **Detection** (IDS, SIEM, EDR, XDR), **Response** (EDR, XDR, SOAR) — and modern platforms overlap categories. No single tool provides complete visibility, so a SOC uses **defense-in-depth**: if one control misses something, another may catch it. This is a genuine architecture diagram, kept as-is:

```text
                        INTERNET
                           │
                           ▼
                      ┌─────────┐
                      │ FIREWALL│
                      └────┬────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
          Endpoints      Servers      Network
              │            │            │
              ▼            ▼            ▼
             EDR          Logs         IDS/IPS
              │            │            │
              └────────────┼────────────┘
                           ▼
                          SIEM
                           │
                     ┌─────┴─────┐
                     ▼           ▼
                 Detection     Analysis
                     └─────┬─────┘
                           ▼
                       SOC Analyst
                           │
                           ▼
                          SOAR
                           │
                           ▼
                       Response
```

> **Log quality matters:** a SIEM cannot detect well if key data is missing. Poor logging (`"Login failed"`) is far weaker than rich logging (`Time / User / Source IP / Host / Action / Status`). SOC teams also track **detection coverage** — what they can and cannot detect.

### Interview Questions — Technology

| Question | Answer |
|---|---|
| **Q1. What is SIEM?** | Security Information and Event Management — collects, centralizes, correlates, analyses, and provides search/alerting for security events from multiple sources. |
| **Q2. What is EDR?** | Endpoint Detection and Response — monitors endpoint activity and provides detection, investigation, and response capabilities. |
| **Q3. What is the difference between SIEM and EDR?** | SIEM = broad, centralized event visibility; EDR = deep endpoint visibility. |
| **Q4. What is a firewall?** | A control that manages network traffic according to defined security rules. |
| **Q5. What is IDS?** | Intrusion Detection System — detects suspicious activity and generates alerts. |
| **Q6. What is IPS?** | Intrusion Prevention System — detects suspicious activity and can act to prevent/block it. |
| **Q7. What is XDR?** | Extended Detection and Response — detection/response across multiple domains such as endpoints, network, email, cloud, and identity. |
| **Q8. What is SOAR?** | Security Orchestration, Automation and Response — automates and coordinates repetitive security workflows. |
| **Q9. What is EPP?** | Endpoint Protection Platform — endpoint-focused preventive security capabilities. |
| **Q10. Why is SIEM useful for SOC analysts?** | It provides centralized visibility into events from multiple systems, making correlation and investigation easier. |

---

## Task 7 — Practical: Investigating a Port Scan

This exercise applies SOC concepts to a realistic alert the way a **Level 1 analyst** would. A **port scan** is a technique used to discover which network ports are open, closed or filtered on a target system. Attackers use scanning during **reconnaissance**, so the SOC investigates it — but the key rule is:

> **A port scan is not automatically malicious.** It could also come from security teams, vulnerability scanners, penetration testers, network administrators, monitoring systems or automated infrastructure tools. Context determines the meaning.

### The L1 Workflow

`Alert → Identify Source → Identify Target → Understand Activity → Check Time → Check Context → Determine Intent → Close OR Escalate`. Escalate to L2 if deeper investigation is needed.

Suppose the SOC receives this alert:

```text
ALERT:
Possible Port Scan
Source:
10.10.10.50
Destination:
10.10.10.20
Protocol:
TCP
Multiple Ports:
21, 22, 23, 25, 53, 80, 443
```

The analyst works the alert step by step (as step-cards):

| **1** | **Read the alert & list the facts**<br>Identify the available facts (source, destination, protocol, ports) before drawing any conclusion. |
| --- | --- |

| **2** | **Identify the source**<br>The system that initiated the activity (`10.10.10.50`). Is it a workstation, server, security scanner, admin machine or external system? Same activity + different source = different risk. |
| --- | --- |

| **3** | **Identify the destination**<br>The system being scanned (`10.10.10.20`). A test machine differs greatly from a domain controller — **asset criticality influences priority**. |
| --- | --- |

| **4** | **Examine the ports & protocol**<br>A wide range of ports may indicate service discovery. Note the protocol (TCP/UDP/ICMP) — UDP is connectionless, so "no TCP connection" does not mean "no service". |
| --- | --- |

| **5** | **Examine the timestamp**<br>Was the source meant to be active? Was a scan scheduled? Did other suspicious activity occur around the same time? |
| --- | --- |

| **6** | **Apply the 5 Ws**<br>Who initiated it, what happened, when, where (source/target), and why (authorized scan vs malicious reconnaissance). |
| --- | --- |

| **7** | **Check authorization, history & threat intel**<br>Is the source a known/approved scanner? Compare against a **baseline** of normal behaviour. Check IP reputation for external sources. |
| --- | --- |

| **8** | **Correlate, determine intent & verify response**<br>Check for related events (suspicious login, malware, PowerShell, external connection). Classify Benign/Authorized/Suspicious/Malicious, then act — and always verify the response worked. |
| --- | --- |

### Common Ports Reference

| Port | Common Service |
|---:|---|
| 20/21 | FTP |
| 22 | SSH |
| 23 | Telnet |
| 25 | SMTP |
| 53 | DNS |
| 80 | HTTP |
| 110 | POP3 |
| 143 | IMAP |
| 443 | HTTPS |
| 445 | SMB |
| 3389 | RDP |
| 8080 | Common alternate HTTP |

> Port numbers indicate commonly associated services, but they do not guarantee which service is actually running.

### Vertical vs Horizontal Scanning

- **Vertical scan** — one source scans **many ports on one host** (e.g. one target: 21, 22, 80, 443, 3389).
- **Horizontal scan** — one source scans **the same port across many hosts** (e.g. Host A–E all on 445).

### Command-Line Validation

Although SOC analysts mostly work in SIEM dashboards, command-line tools can help validate network information. Commands only — no output was shown in the room, so none is invented:

```bash
$ ss -tuln
$ ss -tupn
$ ping TARGET_IP
$ nslookup example.com
$ dig example.com
$ curl -I http://TARGET
```

`ss -tuln` shows listening TCP/UDP sockets; `ss -tupn` maps processes to network connections; `ping` tests basic reachability (ICMP may be blocked); `nslookup`/`dig` inspect DNS; `curl -I` inspects HTTP response headers.

### Worked Classifications

**Benign / Authorized** — source `10.10.10.50` = hostname `VULN-SCANNER-01`, owner Security Team, scheduled every Monday 02:00, target internal server network → **Authorized Vulnerability Scan** → document and close.

**Suspicious** — source `10.10.10.75` = `EMPLOYEE-LAPTOP-12`, unknown/compromised user, 02:30 AM, no authorization, plus suspicious PowerShell and an external connection → **Potential Compromise** → escalate to L2, potential endpoint isolation.

> **Golden principle:** Think *"What evidence do I have?"* rather than *"What do I think happened?"* — `Evidence → Analysis → Conclusion`, never `Assumption → Conclusion`. And after any action: `Action → Verify → Monitor → Confirm`.

### Interview Questions — Practical Investigation

| Question | Answer |
|---|---|
| **Q1. What is a port scan?** | A technique used to identify reachable or open network ports and potentially discover services running on a target system. |
| **Q2. Why might a SOC investigate a port scan?** | Because attackers can use port scanning during reconnaissance to identify potential services and attack surfaces. |
| **Q3. Is a port scan always malicious?** | No. Security teams and administrators may perform authorized scanning for vulnerability assessment, testing, or network management. |
| **Q4. What are the 5 Ws?** | Who, What, When, Where, Why. |
| **Q5. What information should an analyst collect from a port scan alert?** | Source IP, Destination IP, Source Host, Destination Host, Ports, Protocol, Timestamp, User, Number of Targets, Authorization, Related Events. |
| **Q6. What is a vertical port scan?** | A scan where one source targets many ports on one host. |
| **Q7. What is a horizontal port scan?** | A scan where one source targets the same or similar port across many hosts. |
| **Q8. Why does asset criticality matter?** | A suspicious event affecting a critical asset may have greater potential impact and therefore require higher priority. |
| **Q9. Why should an analyst check whether a scan is authorized?** | Because legitimate security tools and administrators can generate scanning activity that may otherwise look malicious. |
| **Q10. What should an analyst do after a response action?** | Verify that the action worked and monitor for continued or related activity. |

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **SOC** | Security Operations Center — continuously monitors network, endpoints, servers, cloud, identity and logs to detect and respond to threats. |
| **24/7** | A SOC runs around the clock because attacks can happen at any time. |
| **Core capabilities** | **Detection** (find the threat) + **Response** (handle the threat). |
| **Detection areas** | Vulnerabilities, Unauthorized Activity, Policy Violations, Intrusions (`V → U → P → I`). |
| **Three pillars** | People + Process + Technology — all three required. |
| **Roles** | CISO → SOC Manager → L1 (triage) → L2 (deep investigation) → L3 (hunt/forensics); + Security Engineer, Detection Engineer. |
| **Alert triage** | Read → Understand → Investigate → Classify → Close/Escalate. Alert ≠ confirmed attack. |
| **5 Ws** | Who, What, When, Where, Why (`Person → Activity → Time → Location → Reason`). |
| **FP vs TP** | False positive = benign flagged as malicious; true positive = correctly identified malicious activity. |
| **Severity vs Priority** | Severity = how serious; Priority = how urgent; asset criticality shifts priority. |
| **IR lifecycle** | Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned. |
| **Contain vs Eradicate** | Contain = stop/limit; Eradicate = remove; Recovery = restore safely. |
| **IoC vs IoA** | IoC = evidence of compromise; IoA = evidence of attack behaviour. |
| **Technologies** | SIEM (centralize/correlate), EDR (endpoint), Firewall (traffic), AV/EPP (prevent), IDS (detect), IPS (prevent), XDR (cross-domain), SOAR (automate). |
| **Port scan** | Reconnaissance technique; **not automatically malicious** — check source, target, timing, authorization and related events. |

**Key idea:** A SOC uses **People, Process and Technology** to continuously detect threats and respond to incidents — and an alert is the *start* of an investigation, not the conclusion.

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is a SOC?** | A function or team responsible for monitoring, detecting, investigating, and responding to cybersecurity threats. |
| **Q2. What are the three pillars of a SOC?** | People, Process, Technology. |
| **Q3. What is the role of an L1 SOC analyst?** | Initial alert monitoring, triage, validation, basic investigation, documentation, and escalation. |
| **Q4. What is the role of an L2 analyst?** | Deeper investigations, event correlation, threat analysis, and more complex incident handling. |
| **Q5. What is the role of an L3 analyst?** | Advanced investigations, threat hunting, complex incidents, malware analysis, forensics, and advanced detection work. |
| **Q6. What is alert triage?** | Analysing an alert to determine its legitimacy, severity, impact, and appropriate next action. |
| **Q7. What are the 5 Ws?** | Who, What, When, Where, Why. |
| **Q8. What is a false positive?** | An alert generated for activity ultimately determined to be legitimate or benign. |
| **Q9. What is a true positive?** | An alert that correctly identifies malicious or unauthorized activity. |
| **Q10. Why is context important?** | The same activity may be legitimate in one situation and malicious in another. |
| **Q11. What is SIEM?** | Centralizes and analyses security events from multiple sources and correlates activity to generate detections and support investigations. |
| **Q12. What is EDR?** | Monitors endpoint activity and provides detection, investigation, and response capabilities. |
| **Q13. SIEM vs EDR?** | SIEM = broad centralized visibility; EDR = deep endpoint visibility. |
| **Q14. IDS vs IPS?** | IDS = detect + alert; IPS = detect + prevent. |
| **Q15. What is XDR?** | Extends detection and response across multiple domains such as endpoints, network, email, cloud, and identity. |
| **Q16. What is SOAR?** | Automates and orchestrates security workflows to reduce repetitive analyst tasks and coordinate response actions. |
| **Q17. What are the common Incident Response phases?** | Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned. |
| **Q18. Containment vs Eradication?** | Containment stops/limits the incident; eradication removes the threat. |
| **Q19. Why is Root Cause Analysis important?** | Removing the immediate threat without fixing the underlying cause can allow similar attacks to happen again. |
| **Q20. Why preserve evidence?** | It helps determine what happened, establish scope, support forensic investigation, and satisfy organisational or legal requirements. |

---

## Final Takeaway

A **Security Operations Center (SOC)** is the organisation's continuous monitoring and response capability, built on three pillars — **People, Process, and Technology** — that must work together. Its two core capabilities are **Detection** (finding vulnerabilities, unauthorized activity, policy violations and intrusions) and **Response** (handling the incident). People run the SOC through a tiered hierarchy — **CISO → SOC Manager → L1 → L2 → L3**, supported by Security and Detection Engineers — following a process that begins with **alert triage** and the **5 Ws** (Who, What, When, Where, Why) to separate a **false positive** from a **true positive**. Confirmed incidents move into the **Incident Response** lifecycle — **Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned** — reinforced by **Root Cause Analysis** and careful evidence handling. Technology gives the SOC its visibility: **SIEM** centralizes and correlates, **EDR** watches endpoints, **firewalls** and **IDS/IPS** guard the network, **XDR** correlates across domains, and **SOAR** automates the repetitive work. The recurring lesson, proven in the practical **port-scan** investigation, is that *an alert is the beginning of an investigation, not the conclusion* — investigate the evidence, understand the context, correlate the events, then decide.
