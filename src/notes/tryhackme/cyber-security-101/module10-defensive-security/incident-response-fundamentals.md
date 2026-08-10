| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Defensive Security / Incident Response |
| **Difficulty** | Easy |
| **Time** | ~60 Minutes |
| **Module** | Defensive Security |

---

## Objective

**Incident Response (IR)** is the structured process an organisation uses to handle a cyber attack from detection all the way through to recovery and learning. Prevention tries to stop an attack before it succeeds, but security does not end once an attacker gets in — you also need a plan to detect the attack, understand what happened, limit the damage, remove the threat, recover systems and learn from the incident. This room builds the vocabulary first (events, logs, alerts, false/true positives, incidents and severity), walks the two most-referenced IR frameworks — the **SANS PICERL** lifecycle and the **NIST** four-phase model — and then covers the roles, plans, playbooks, runbooks, security tooling (SIEM, EDR, IDS/IPS, SOAR) and practical investigation techniques that turn a stressful, unpredictable situation into a repeatable workflow.

By the end of this room you will be able to:

- Explain what **Incident Response** is and why it matters, and how it is both **proactive** (preparation) and **reactive** (handling the attack)
- Distinguish an **event**, a **log**, an **alert**, a **false positive**, a **true positive** and an **incident**, and assign incident **severity** (Low / Medium / High / Critical)
- Recognise common incident types: **Malware Infection**, **Security Breach**, **Data Leak**, **Insider Attack** and **Denial of Service (DoS/DDoS)**
- Walk the **SANS PICERL** lifecycle: Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned
- Walk the **NIST** lifecycle: Preparation → Detection & Analysis → Containment, Eradication & Recovery → Post-Incident Activity, and map it against SANS
- Tell apart an **IR Plan**, a **Playbook** and a **Runbook**, and define IR **roles**, **communication** and **escalation**
- Select the right **security tool** for the job — SIEM, EDR, Antivirus, IDS, IPS, Firewall, Email Security, Threat Intelligence, SOAR
- Investigate an alert with the **WHO/WHAT/WHEN/WHERE/HOW/WHY** framework, using process trees, IOCs, evidence preservation and scope determination

> **Core distinction:** `Containment` = STOP / LIMIT the attack, `Eradication` = REMOVE the threat and root cause, `Recovery` = RESTORE trusted operations. These three stay distinct even where NIST groups them into one phase.

---

## Task 1 — What Is Incident Response?

A **cyber security incident** is an event or activity involving computer systems, networks, applications or data that may negatively affect the security of an organisation — for example a malware infection, phishing attack, unauthorized access, data breach, data leakage, insider attack, Denial of Service (DoS), compromised account or suspicious network activity.

**Incident Response (IR)** is the structured process an organisation uses to prepare for, detect, investigate, contain, remove and recover from security incidents, then learn and improve. In simple words:

> **Incident Response is the process of handling a cyber attack from detection until recovery and learning.**

### Proactive *and* Reactive

IR is not only about fighting an attack after it happens — it also involves preparing before an incident. The work splits across three moments in time:

> **1. Before an Incident (Proactive)**
> Preparation: create the IR plan, build the security team, deploy security tools, configure logging, run employee awareness training, and define communication & escalation.

> **2. During an Incident (Reactive)**
> Once detected: investigate, determine scope, contain, eradicate and recover.

> **3. After an Incident (Improve)**
> Post-incident review: what happened, why did it happen, what worked, what failed, and how can we prevent it again.

### Why Planning Matters

Without an IR plan, a detected incident triggers confusion — *"What should we do? Who should investigate? Who isolates the machine? Who is notified?"* — and time is lost. With a plan, the same alert flows straight into a defined workflow (identify affected host → isolate → investigate → remove threat → recover → document), making the response faster and more organised.

### The CIA Triad Connection

IR is closely tied to the **CIA Triad**. Incidents can compromise one or more properties:

```text
        CIA TRIAD
            │
 ┌──────────┼──────────┐
 ▼          ▼          ▼
Confidentiality  Integrity  Availability
 │          │          │
 ▼          ▼          ▼
Data kept   Data not   Systems/data
secret      modified   accessible
```

Examples: a data breach compromises **Confidentiality**, malware modifying files compromises **Integrity**, and a DoS attack compromises **Availability**.

### Incident Response vs Prevention

These are related but different: **Prevention** = *"Don't let it happen"* (firewall, antivirus, MFA, security awareness, patch management, access control, network segmentation); **Incident Response** = *"If it happens, handle it"* (detection, investigation, containment, eradication, recovery, lessons learned).

### SOC and Incident Response

A **Security Operations Center (SOC)** continuously monitors the environment. Logs/events feed a security tool, which raises an alert, which a SOC analyst investigates. The alert resolves to a **False Positive** (discard) or a **True Positive** (incident → Incident Response):

```text
Logs / Events → Security Tool → Alert → SOC Analyst → Investigation
                                          ┌──────────┴──────────┐
                                          ▼                     ▼
                                    False Positive        True Positive → Incident → Incident Response
```

### Beginner Mental Model — P·D·I·C·E·R·L

A simple flow to remember the whole cycle:

`Prepare → Incident → Detect → Investigate → Contain → Eradicate → Recover → Learn & Improve → Prepare better`

| Letter | Meaning |
|---|---|
| **P** | Prepare |
| **D** | Detect |
| **I** | Investigate |
| **C** | Contain |
| **E** | Eradicate |
| **R** | Recover |
| **L** | Learn |

### Interview Questions — Fundamentals

| Question | Answer |
|---|---|
| **Q1. What is Incident Response?** | Incident Response is a structured process used by organizations to detect, investigate, contain, eradicate, and recover from cybersecurity incidents while minimizing their impact. |
| **Q2. Why is Incident Response important?** | It helps organizations respond quickly and systematically to cyber attacks, minimize damage, restore affected systems, and prevent similar incidents in the future. |
| **Q3. Is Incident Response only performed after an attack?** | No. Incident Response also includes preparation, such as creating response plans, assigning responsibilities, training employees, and deploying security tools. |
| **Q4. Give examples of security incidents.** | Phishing, Malware infection, Data breach, Data leak, Insider attack, Denial of Service, Unauthorized access. |

---

## Task 2 — Events, Logs, Alerts and Incidents

Modern systems run many processes simultaneously, and every process may generate many **events** — so large organisations produce thousands → millions → billions of events, which is impossible to check manually.

An **event** is an activity or action that occurs on a system — *"something that happened on a computer or network."* Examples: user logs in/out, file created/deleted, process starts/stops, network connection created, application crashes, USB device connected, email received.

Events can be recorded as **logs**. A log is a record of an activity that occurred on a system, application or network, for example:

```text
2026-08-10 10:30:21
User: Surya
Action: Login
Source IP: 192.168.1.10
Status: Success
```

Logs are essential for **Detection, Investigation, Threat Hunting, Forensics** and **Incident Response**. Because organisations generate huge volumes of events, security solutions (**SIEM, EDR, Antivirus, IDS/IPS, Firewall**) collect logs, correlate events, detect suspicious activity and generate alerts.

### What Is an Alert?

An **alert** is a notification generated by a security solution when an event or group of events appears to indicate potentially harmful activity.

> **Alert = Security system saying "Something suspicious may be happening."**

Not every event creates an alert — an event is *something happened*, while an alert is *the security system thinks something suspicious may have happened*. Once raised, an analyst investigates and classifies it:

> **1. False Positive**
> The security solution raises an alert for activity that appears malicious but is actually legitimate. *Example:* a large scheduled backup is mistaken for data exfiltration. **False Positive = Alert triggered, but no real malicious activity exists** → close / discard.

> **2. True Positive**
> The security solution correctly identifies harmful or malicious activity. *Example:* a phishing attachment executes malware and the alert is confirmed. **True Positive = Alert correctly identifies a real threat** → becomes an incident → Incident Response begins.

> **3. Fire-Alarm Analogy**
> A fire alarm triggered by cooking smoke with no real fire is a **False Positive**; a fire alarm triggered by an actual fire is a **True Positive**.

### When Does an Alert Become an Incident?

Not every alert is an incident — an alert must be investigated first. A confirmed harmful event is classified as an **incident**: a confirmed security event/activity that requires a response (confirmed phishing, confirmed malware infection, unauthorized access, data breach, data exfiltration, insider attack, DoS). The full chain:

`EVENT → LOG → SECURITY TOOL → ALERT → INVESTIGATION → (False Positive → Discard) OR (True Positive → INCIDENT → Incident Response)`

### Incident Severity

Because a team cannot handle every incident with equal urgency, incidents are assigned **severity levels**, prioritised highest-first: `CRITICAL → HIGH → MEDIUM → LOW`.

> **1. Low Severity**
> Relatively limited impact (minor suspicious activity). Still may require investigation, but generally lower priority.

> **2. Medium Severity**
> Greater potential impact than low — e.g. a compromised workstation with limited organizational impact. Addressed with more urgency than low.

> **3. High Severity**
> Can significantly affect an organisation — compromised important server, major malware infection, significant unauthorized access, potential sensitive-data exposure. Requires rapid response.

> **4. Critical Severity**
> Highest priority because it can cause severe organizational impact — major ransomware attack, critical production system compromise, large-scale data breach, domain-wide compromise, critical infrastructure disruption.

Severity is based on **impact**, not on how "scary" an attack looks — factors include number and importance of affected systems, data involved, number of affected users, business impact, operational disruption and potential financial damage. The same malware on an isolated test laptop may be LOW/MEDIUM, but on a production server affecting thousands of users may be HIGH/CRITICAL.

### Room Answers — What Are Incidents?

| Question | Answer |
|---|---|
| **What is triggered after an event or group of events point to a harmful activity?** | Alert |
| **If a security solution correctly identifies a harmful activity from a set of events, what type of alert is it?** | True Positive |
| **If a fire alarm is triggered by smoke after cooking, is it a true positive or a false positive?** | False Positive |

### Interview Questions — Events & Alerts

| Question | Answer |
|---|---|
| **Q1. What is a security event?** | An observable activity occurring on a system, network, application, or device that may be relevant to security monitoring. |
| **Q2. What is an alert?** | A notification generated by a security solution when an event or group of events appears to indicate potentially harmful activity. |
| **Q3. What is a false positive?** | When a security system generates an alert for legitimate activity that is incorrectly identified as malicious. |
| **Q4. What is a true positive?** | When a security system correctly detects actual malicious or harmful activity. |
| **Q5. Does every alert mean there is an incident?** | No. Alerts must be investigated. Some are false positives, while confirmed malicious alerts may become incidents. |
| **Q6. Why are incident severity levels used?** | They help security teams prioritize incidents according to their potential impact and allocate resources effectively. |

---

## Task 3 — Types of Incidents

Not every incident is the same, and different incident types can occur together in one campaign (e.g. `Phishing Email → Malicious Attachment → Malware Infection → Account Compromise → Data Exfiltration`). Responders need to recognise the main categories — remembered as **MB LID**:

> **1. Malware Infection (M)**
> **Malware** = *Malicious Software*, designed to damage systems, steal information, disrupt operations, gain unauthorized access, spy on users or execute malicious actions. Examples: Virus, Worm, Trojan, Ransomware, Spyware, Rootkit, Keylogger, Botnet Malware. Delivered via phishing attachments, malicious websites, drive-by downloads, compromised software, USB devices, malicious links, exploited vulnerabilities or compromised accounts.

> **2. Security Breach (B)**
> **Security Breach = Unauthorized access to protected information or systems.** *Example:* an attacker gains unauthorized access to a customer database. Can lead to privacy violations, financial losses, reputation damage, legal consequences, loss of customer trust and business disruption.

> **3. Data Leak (L)**
> **Data Leak = Confidential information is exposed to people who should not have access to it.** Unlike a breach (focused on unauthorized *access*), a leak focuses on *exposure* and does not necessarily require a successful external attack — it can be accidental (human error, misconfiguration, incorrect permissions, public cloud storage, accidental email, exposed database).

> **4. Insider Attack (I)**
> An attack originating from someone inside an organisation — employee, contractor, administrator, partner or temporary worker. Dangerous because insiders may already have a valid account, network access, application access and knowledge of the environment. *Key difference:* an external attacker **breaks IN**, whereas an insider **abuses existing ACCESS**.

> **5. Denial of Service (D)**
> **DoS = Attack designed to disrupt availability** — making a system, network or application unavailable to legitimate users by overwhelming resources. It primarily targets **Availability** in the CIA triad. **DDoS (Distributed Denial of Service)** uses many distributed systems (a botnet) against the target, so blocking one source may not be enough.

Incident severity still depends on impact, not just the type — a small internal document exposed may be Low/Medium, while millions of customer records exposed may be HIGH/CRITICAL.

### Room Answers — Types of Incidents

| Question | Answer |
|---|---|
| **A user's system got compromised after downloading a file attachment from an email. What type of incident is this?** | Malware Infection |
| **What type of incident aims to disrupt the availability of an application?** | Denial of Service |

### Interview Questions — Incident Types

| Question | Answer |
|---|---|
| **Q1. What is malware?** | Malicious software designed to damage systems, steal information, gain unauthorized access, or perform other harmful actions. |
| **Q2. What is a security breach?** | When an unauthorized person gains access to protected information or systems. |
| **Q3. What is a data leak?** | When confidential information is exposed to unauthorized entities. It can happen intentionally or accidentally. |
| **Q4. What is an insider attack?** | A malicious activity originating from someone within an organization who may already have legitimate access to systems or data. |
| **Q5. What is a DoS attack?** | A Denial of Service attack attempts to make a system, application, or network unavailable to legitimate users. |
| **Q6. What is the main security property targeted by DoS?** | Availability. |
| **Q7. What is the difference between DoS and DDoS?** | DoS generally involves a single attacking source, while DDoS uses multiple distributed systems to attack the target. |

---

## Task 4 — The SANS PICERL Lifecycle

Once an incident is detected, the organisation needs a structured process so the security team does not react randomly during a stressful situation. A commonly used Incident Response lifecycle is the **SANS Incident Response Process**, remembered as **PICERL** — six phases that loop back into preparation:

`Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned → (better) Preparation`

> **1. Preparation**
> Happens **before** an incident, to make sure the organisation is ready. Prepare across **People** (SOC analysts, incident responders, system administrators, network engineers, management, legal, communications), **Processes** (IR plan, escalation & communication procedures, evidence handling, recovery procedures) and **Technology** (SIEM, EDR, antivirus, firewalls, network monitoring, centralized logging, backups, forensic tools). Preparation reduces confusion and response time.

> **2. Identification**
> Determine whether an incident actually occurred — what happened, when, which systems are affected, the scope and how serious it is. Analysts investigate alerts and evidence from SIEM, EDR, antivirus, firewall/authentication/DNS logs, network traffic, email/cloud/endpoint logs and user reports, then determine **scope** (what looked like 1 infected machine may be many compromised systems) and classify the incident (type, severity, affected assets, initial access, status).

> **3. Containment**
> **Stop the incident from getting worse** and limit the spread while investigation continues. Common actions: isolate a workstation, disable compromised accounts, block malicious IPs/domains, quarantine malware, disconnect affected systems, restrict network communication. Split into **Short-Term Containment** (immediate — e.g. disconnect infected host) and **Long-Term Containment** (controlled — e.g. move affected systems to an isolated network). Responders must balance **Security** against **Business Continuity**.

> **4. Eradication**
> **Remove the threat and its root cause** — remove malware, delete malicious files, remove persistence mechanisms, patch vulnerabilities, reset compromised credentials, revoke malicious sessions, remove unauthorized accounts, rebuild compromised systems, block attacker infrastructure. Eradication must address the **root cause**, not just the visible symptom — if the original unpatched vulnerability remains, the attacker simply returns.

> **5. Recovery**
> **Restore affected systems to normal operation** — restore from clean backups, rebuild systems, reinstall applications, restore configurations, reset credentials, reconnect systems, increase monitoring and validate integrity. Do not assume a restored system is safe: `Restore → Verify → Monitor → Confirm Clean → Return to Production`. Enhanced monitoring during recovery watches for suspicious processes, unexpected logins, network connections, new accounts and persistence, because the attacker may still have access.

> **6. Lessons Learned**
> Post-incident review: what happened, why, how did the attacker enter, what worked, what failed, how quickly did we respond, what should we improve. Findings feed back into Preparation, creating continuous improvement. *Example:* a phishing incident caused by untrained users → add security awareness training, email filtering, attachment sandboxing and a user reporting mechanism.

### Containment vs Eradication vs Recovery

A common interview point — these three remain distinct actions:

| Phase | Main Question | Example |
|---|---|---|
| **Containment** | How do we stop the damage? | Isolate infected host |
| **Eradication** | How do we remove the threat? | Remove malware |
| **Recovery** | How do we restore operations? | Rebuild and return host to service |

`CONTAIN → STOP` · `ERADICATE → REMOVE` · `RECOVER → RESTORE`

### Identification vs Investigation

- **Identification** — recognise and confirm that suspicious activity may represent a security incident.
- **Investigation** — collect and analyse evidence to understand what happened, how, when, where and who/what was affected.

Evidence preservation should be considered **before** destructive response actions (wiping/rebuilding can destroy logs, memory, files, network data and endpoint artifacts) when practical and appropriate.

### Interview Questions — SANS Process

| Question | Answer |
|---|---|
| **Q1. What is the SANS Incident Response lifecycle?** | Commonly represented by PICERL: Preparation, Identification, Containment, Eradication, Recovery, and Lessons Learned. |
| **Q2. What happens during Preparation?** | The organization prepares its people, processes, tools, policies, playbooks, communication procedures, and other resources needed for incident response. |
| **Q3. What happens during Identification?** | Analysts investigate alerts and evidence to determine whether an incident occurred, its scope, severity, affected systems, and potential cause. |
| **Q4. What is Containment?** | Containment limits the spread and impact of an active incident, such as isolating a compromised endpoint or disabling a compromised account. |
| **Q5. What is Eradication?** | Eradication removes the threat and addresses its root cause — removing malware, eliminating persistence, patching vulnerabilities, and resetting compromised credentials. |
| **Q6. What is Recovery?** | Recovery restores affected systems and services to normal operation while validating their security and monitoring for further suspicious activity. |
| **Q7. What are Lessons Learned?** | The post-incident review used to identify weaknesses, evaluate the response, and improve future security controls and procedures. |
| **Q8. What is PICERL?** | Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned. |

---

## Task 5 — The NIST Incident Response Framework

**NIST** = **National Institute of Standards and Technology**, a U.S. government organisation that publishes standards, frameworks and guidance widely referenced by organisations, security teams, SOC analysts, incident responders, auditors and governments. The traditional NIST incident response model uses four broad phases, remembered as `P → D&A → C/E/R → PIA`:

> **1. Preparation**
> Performed before an incident. Establish **People** (defined roles — SOC analyst, incident responder, security engineer, sysadmin, network engineer, threat hunter, forensic analyst, IT, management, legal, HR, communications), **Technology** (SIEM, EDR, antivirus, firewalls, IDS/IPS, centralized logging, backups, monitoring, forensic tools, ticketing) and **Processes/Training** — including **tabletop exercises** (simulated incident discussions that test readiness with no real attack).

> **2. Detection & Analysis**
> Identify potentially malicious activity and determine whether it represents an incident. Detection sources include SIEM, EDR, antivirus, firewall, IDS/IPS, email/cloud security, user reports, threat intelligence, network monitoring and application logs. **Analysis** answers what/when/how happened, which system and user, the scope, whether it is malicious and how severe. Collect and **preserve evidence** (logs, memory, disk artifacts, network data, process info) before actions that could destroy or modify it.

> **3. Containment, Eradication & Recovery**
> NIST groups these into one broad response phase (but each stays distinct). **Containment** limits impact and prevents spread (short-term isolation, long-term segmentation). **Eradication** removes the threat and root cause. **Recovery** restores systems and validates them: `System Rebuilt → Security Scan → Patch Verification → Configuration Review → Credential Validation → Monitoring → Production`.

> **4. Post-Incident Activity**
> After resolution, perform a post-incident review and capture **Lessons Learned** (e.g. MFA not enabled → deploy MFA + improve phishing awareness + improve email filtering). A post-incident report may include incident ID, type, severity, timeline, affected systems, initial access, root cause, indicators of compromise, actions taken, impact, recovery and recommendations.

### SANS vs NIST

Both describe Incident Response with similar objectives; the main difference is how activities are **grouped** — SANS separates Containment, Eradication and Recovery into individual phases, NIST combines them.

| Concept | SANS | NIST |
|---|---|---|
| Preparation | Separate phase | Separate phase |
| Detection | Identification | Detection & Analysis |
| Investigation | Identification | Detection & Analysis |
| Containment | Separate phase | Combined response phase |
| Eradication | Separate phase | Combined response phase |
| Recovery | Separate phase | Combined response phase |
| Lessons Learned | Separate phase | Post-Incident Activity |

```text
SANS                         NIST
────                         ────
Preparation          →       Preparation
Identification       →       Detection & Analysis
Containment          ┐
Eradication          ├──→    Containment, Eradication & Recovery
Recovery             ┘
Lessons Learned      →       Post-Incident Activity
```

### The Incident Response Plan (IRP)

An **Incident Response Plan** is a documented plan describing how an organisation responds to incidents — it answers WHO responds, WHAT happens, WHEN to escalate, WHERE, HOW, and WHO must be notified. Typical components:

`1. Purpose → 2. Scope → 3. Roles & Responsibilities → 4. Incident Classification → 5. Severity Levels → 6. Detection Procedures → 7. Escalation Procedures → 8. Communication Procedures → 9. Evidence Handling → 10. Containment → 11. Eradication → 12. Recovery → 13. Documentation → 14. Post-Incident Review`

### Roles, Communication and Escalation

Clearly defined **roles** prevent the *"who handles this?"* confusion that delays response:

| Role | Responsibility |
|---|---|
| **SOC Analyst** | Initial detection |
| **Incident Responder** | Investigation + response |
| **System Administrator** | System isolation / recovery |
| **Network Engineer** | Network containment |
| **Management** | Business decisions |
| **Legal** | Legal / regulatory guidance |
| **Communications** | External / internal communication |

**Communication** should be accurate, timely, clear, consistent, share only necessary information and document important decisions — avoid speculation, unverified claims and conflicting statements. During a serious incident normal channels may themselves be compromised, so organisations may keep alternative communication mechanisms. **Escalation** typically follows severity: `Low → SOC Analyst`, `Medium → Senior Analyst / IR Team`, `High → IR Lead + Management`, `Critical → IR Lead + Executive + Relevant Stakeholders`.

### IR Metrics

- **MTTD — Mean Time to Detect:** how quickly the organisation detects an incident (shorter is generally better). A very high MTTD suggests poor monitoring, insufficient logging or weak detection rules.
- **MTTR — Mean Time to Respond/Recover/Resolve:** the exact definition varies, so organisations should define it precisely for consistent measurement.

### Plan vs Playbook vs Runbook

Three related but distinct levels of documentation:

> **1. IR Plan — "What is our overall response?"**
> The broad organisation-wide strategy for how the organisation responds to incidents.

> **2. Playbook — "What should we do for this type of incident?"**
> Predefined procedures for a particular incident type (phishing, ransomware, malware, account compromise, data breach, DDoS). *Example phishing playbook:* identify sender → extract URLs → analyze attachment → search recipients → check endpoint activity → remove malicious email → reset credentials if needed.

> **3. Runbook — "Exactly how do we perform this task?"**
> A detailed, operational, step-by-step set of instructions for a specific technical task. *Example — isolate a compromised endpoint:* 1. Confirm hostname 2. Confirm user 3. Validate incident 4. Isolate endpoint using EDR 5. Record timestamp 6. Preserve required evidence 7. Notify IR team 8. Document the action.

The hierarchy: `IR PLAN → PLAYBOOK → RUNBOOK → TECHNICAL ACTION`.

### Interview Questions — NIST & Planning

| Question | Answer |
|---|---|
| **Q1. What is the NIST Incident Response framework?** | A structured approach consisting of Preparation, Detection and Analysis, Containment/Eradication/Recovery, and Post-Incident Activity. |
| **Q2. What are the four NIST Incident Response phases?** | Preparation; Detection and Analysis; Containment, Eradication and Recovery; Post-Incident Activity. |
| **Q3. What is the difference between SANS and NIST?** | SANS commonly represents the lifecycle as six phases using PICERL, while NIST groups the response into four broader phases. The underlying objectives are largely similar. |
| **Q4. What is an Incident Response Plan?** | A documented organizational plan defining how incidents are detected, investigated, contained, eradicated, recovered from, communicated, and reviewed. |
| **Q5. What is a playbook?** | Predefined procedures for responding to a particular incident type, such as phishing or ransomware. |
| **Q6. What is a runbook?** | Detailed operational steps for carrying out a specific technical task. |
| **Q7. Why are roles important in Incident Response?** | Clearly defined roles prevent confusion, reduce response delays, and ensure the right people perform the appropriate actions. |
| **Q8. What is MTTD?** | Mean Time to Detect — a metric measuring how quickly an organization detects an incident. |
| **Q9. What is MTTR?** | Mean Time to Respond/Recover/Resolve, depending on the organization's exact definition — a measure of response or resolution speed. |

---

## Task 6 — Security Tools for Incident Response

A SOC combines several technologies. Each answers a different question — `SIEM → "What is happening?"` (big picture) and `SOAR → "What should we do about it?"` (automation):

> **1. SIEM — Security Information and Event Management**
> Collects and centralises logs/events from endpoints, servers, network, cloud/apps, DNS, VPN and authentication sources, then correlates them, searches, builds dashboards and generates alerts. **Correlation** is the key value: one failed login is normal, but `20 failed logins + successful login + unusual location + new device` correlates into a potential account-compromise alert.

> **2. EDR — Endpoint Detection and Response**
> Focuses on endpoint security and visibility (laptops, desktops, servers, workstations). An agent collects telemetry — processes, files, command execution, network connections, user activity, persistence — and supports response actions: **isolate endpoint, kill process, quarantine file, collect evidence, investigate process tree, block indicators**.

> **3. Antivirus (AV)**
> Detects and prevents malicious software using signature detection, behavioral detection, heuristics, cloud-based analysis, reputation and machine learning. **Signature-based** detection is good for known threats but weaker against unseen malware; **behavioral** detection flags what a program *does* (e.g. modifying many files, deleting backups, encrypting documents) even when the signature is unknown.

> **4. IDS — Intrusion Detection System**
> Monitors network/system activity and **detects + alerts** on suspicious behaviour. *"I Detect Suspicious activity."*

> **5. IPS — Intrusion Prevention System**
> Can **detect + prevent/block** suspicious activity depending on configuration. *"I Prevent Suspicious activity."*

> **6. Firewall**
> Controls network traffic based on configured rules (network segmentation, access control, IP/port/application filtering, outbound restrictions). During an incident, responders use firewall controls to block malicious IPs/domains/ports and prevent external communication.

> **7. Email Security**
> Email is a common attack vector. Detects phishing, malicious attachments/URLs, spoofed senders, spam and known malware, delivering safe mail and quarantining/alerting on suspicious mail.

> **8. Threat Intelligence**
> Provides information about known or suspected threats — malicious IPs, domains, file hashes, URLs, attack techniques, threat actor information and malware families. It should **support** investigation, not replace it.

> **9. SOAR — Security Orchestration, Automation and Response**
> Automates and orchestrates security workflows: from a SIEM alert it can gather context, query threat intelligence, create a ticket, notify an analyst and execute approved response actions.

### IDS vs IPS

| Technology | Main Purpose |
|---|---|
| **IDS** | Detect and alert |
| **IPS** | Detect and potentially prevent/block |

### SIEM vs EDR vs SOAR

`SIEM → BIG PICTURE (logs/correlation)` · `EDR → ENDPOINT DETAIL (processes/files/network + response)` · `SOAR → AUTOMATION (orchestrate + execute playbooks)`. In practice they integrate: `Endpoint → EDR → Alert → SIEM → Correlation → SOAR → (Enrich / Ticket / Response) → Analyst`.

### An IOC

**IOC = Indicator of Compromise** — an observable artifact that may indicate malicious activity: file hash, IP address, domain, URL, malicious filename, registry key or email address. IOC-based investigation searches DNS/proxy/firewall/endpoint/email logs to find matching systems and determine scope.

### Tool Selection Cheat Sheet

| Need | Useful Technology |
|---|---|
| Centralized logs | SIEM |
| Endpoint visibility | EDR |
| Malware prevention | Antivirus |
| Network detection | IDS |
| Network prevention | IPS |
| Network access control | Firewall |
| Email threat detection | Email Security |
| Threat context | Threat Intelligence |
| Automated response | SOAR |
| Incident-specific procedure | Playbook |
| Technical procedure | Runbook |

### Interview Questions — SOC Tools

| Question | Answer |
|---|---|
| **Q1. What is SIEM?** | Security Information and Event Management — centralizes security data, correlates events, supports detection, and helps analysts investigate incidents. |
| **Q2. What is EDR?** | Endpoint Detection and Response — provides endpoint visibility, threat detection, investigation, and response capabilities. |
| **Q3. Difference between SIEM and EDR?** | SIEM collects and correlates security data from many sources; EDR focuses primarily on endpoint telemetry, detection, investigation, and response. |
| **Q4. What is SOAR?** | Security Orchestration, Automation and Response — helps automate and orchestrate security workflows and response actions. |
| **Q5. What is IDS?** | An Intrusion Detection System monitors activity and generates alerts when suspicious behavior is detected. |
| **Q6. What is IPS?** | An Intrusion Prevention System can detect suspicious activity and take preventative action such as blocking traffic. |
| **Q7. Difference between IDS and IPS?** | IDS → Detect + Alert; IPS → Detect + Prevent. |
| **Q8. What is an IOC?** | An Indicator of Compromise — an observable artifact that may indicate malicious activity, such as a file hash, IP address, domain, or URL. |

---

## Task 7 — Practical Investigation Techniques

Investigation is most effective with a consistent framework — the **six questions**: `WHO? → WHAT? → WHEN? → WHERE? → HOW? → WHY?` And a golden rule: never judge from a single indicator. `PowerShell` alone may be legitimate, but `PowerShell + Suspicious Parent + Encoded Command + External Connection + Persistence` is much stronger evidence.

### Process Tree Analysis

EDR can show parent-child process relationships, which are extremely valuable — Office applications launching PowerShell do not necessarily happen during normal user activity:

```text
explorer.exe
     └── winword.exe
             └── powershell.exe
                     └── suspicious.exe
                             └── network connection
```

Ask: *Why did Word start PowerShell? Why did PowerShell start the executable? What command was executed? What happened afterward?* Suspicious behaviour should be investigated **in context** — an administrator running an approved, known script may be legitimate.

### IOC & File-Hash Investigation

A file has a cryptographic hash (e.g. SHA256). Search the hash in EDR, SIEM, threat intelligence and malware-analysis platforms; if the same hash appears on multiple endpoints, the investigation may reveal a larger infection. For any IOC (IP, domain, URL, hash, filename): `Search SIEM → Search EDR → Search DNS → Search Network → Identify Affected Systems`. Remember `IOC ≠ Complete Proof` — an IP may be shared, dynamic, cloud-hosted, reassigned or behind a CDN, so use multiple evidence sources.

### IOC vs IOA

- **IOC (Indicator of Compromise)** — evidence suggesting compromise may have occurred (malicious file hash, known C2 domain, suspicious IP, malicious file).
- **IOA (Indicator of Attack)** — behaviour suggesting an attack is occurring (credential dumping, suspicious PowerShell, unusual lateral movement, mass file encryption).

### Threat Hunting

Proactive investigation — instead of waiting for an alert, the analyst asks *"Could this attacker already be somewhere in our environment?"* Process: `Hypothesis → Identify Data Sources → Search → Analyze Results → Find Suspicious Activity → Expand Investigation → Confirm / Reject Hypothesis`.

### Account Compromise

Indicators: unusual login location, impossible travel, multiple failed logins, new device, unexpected MFA requests, password change, new session, unusual application/data access. Investigate `User → Login History → Source IPs → Devices → MFA Events → Application Access → File/Data Access`, then contain: `Disable / Restrict → Revoke Sessions → Reset Password → Require MFA → Review Privileges → Monitor`. A compromised **privileged** account (e.g. Domain Administrator) is particularly serious and often requires rapid escalation.

### Evidence Handling

Some evidence disappears when a system is shut down, so responders distinguish:

| Type | Examples |
|---|---|
| **Volatile Data** | RAM, running processes, active network connections, logged-in users |
| **Non-Volatile Data** | Disk files, logs, registry data, stored artifacts |

Before destructive actions, consider what evidence is needed and what might be lost, then capture it safely. When evidence may be used for a formal investigation, organisations track its handling with a **Chain of Custody** documenting who collected it, when, where, how, who accessed it, and how it was stored/transferred — preserving evidence integrity.

### Lateral Movement

If one host is compromised, do not assume it is isolated — the attacker may pivot from Host A → Host B → Host C → Server. Search authentication events, remote logins, SMB connections, RDP, SSH, administrative tools and remote management. **Scope determination is critical**: the initially detected system may only be one part of a larger compromise.

### Practical Investigation Matrix

| Evidence | Question |
|---|---|
| User | Who was involved? |
| Host | Which system? |
| Timestamp | When? |
| Process | What executed? |
| Parent Process | What launched it? |
| File Hash | Is the file known? |
| IP | Where did it connect? |
| Domain | What infrastructure was contacted? |
| Authentication | Was access legitimate? |
| Logs | What happened before/after? |
| EDR | What happened on the endpoint? |
| SIEM | What happened across the environment? |

### Interview Questions — Investigation

| Question | Answer |
|---|---|
| **Q1. What is alert triage?** | The process of quickly evaluating a security alert to determine its validity, severity, context, and required response. |
| **Q2. What information should you collect during initial triage?** | At minimum, the alert source, timestamp, affected host, user, process, network activity, and available historical context. |
| **Q3. How would you investigate a phishing email?** | Analyze the sender, headers, URLs, attachments, authentication results, recipients, then search the environment for related activity and affected users. |
| **Q4. How would you investigate malware on an endpoint?** | Examine the process tree, command line, files and hashes, network connections, persistence mechanisms, user context, and related activity across the environment. |
| **Q5. How do you investigate a compromised account?** | Review authentication history, source IPs, devices, MFA events, sessions, accessed resources, and unusual activity before containing the account and securing its credentials. |
| **Q6. Why is scope determination important?** | Because the initially detected system may only be one part of a larger compromise. |
| **Q7. What is threat hunting?** | The proactive search for malicious activity that may not have generated a clear security alert. |
| **Q8. What is the difference between IOC and IOA?** | An IOC represents evidence associated with compromise; an IOA focuses more on suspicious behavior indicating an attack. |

---

## Task 8 — Challenges & Best Practices

In a real organisation responders face many challenges — thousands of alerts, limited analysts, incomplete logs, unclear scope and business pressure. A mature IR capability needs People + Processes + Technology + Visibility + Automation + Communication + Continuous Improvement.

> **1. Alert Fatigue**
> Occurs when analysts receive too many alerts, so an important alert can be buried and its investigation delayed. Causes: poor detection rules, too many low-value/duplicate alerts, misconfigured tools, weak thresholds, insufficient tuning. Reduce it with rule tuning, prioritization, deduplication, context enrichment, automation, threat intelligence and suppression of known-benign activity. The goal is **not fewer alerts** but **more useful alerts**.

> **2. False Positives vs False Negatives**
> **False Positive** = benign activity detected as malicious (*"Alarm rang, but no fire"*). **False Negative** = malicious activity not detected (*"Fire exists, but alarm didn't ring"*) — often more dangerous because the organisation may not know an attack is happening. Teams balance detection sensitivity against false positives.

> **3. Lack of Visibility**
> An organisation cannot investigate activity it cannot see. Missing network/DNS/authentication/cloud logs → incomplete investigation → unknown scope. Aim for visibility across critical attack paths: endpoint, network, identity, email, cloud, applications, DNS, authentication, firewall, proxy.

> **4. Logging & Log Integrity**
> Logs are one of the most important IR evidence sources. Prefer **centralized logging** (feeding a SIEM) for central search, correlation and long-term investigation. Logs themselves can be targets — attackers try to delete, modify or disable logging — so protect them with centralized collection, access controls, retention policies, integrity controls and monitoring.

> **5. Limited Resources & Risk-Based Prioritization**
> With more alerts than analysts, prioritise by asset value + threat severity + confidence + scope + business impact. Identify **critical assets** (domain controllers, production databases, payment systems, identity infrastructure, cloud control plane, sensitive data stores, backups) — incidents involving these may require immediate escalation.

> **6. Communication & the Incident Commander**
> Poor communication causes delayed/conflicting/duplicate actions. For major incidents an organisation may assign an **Incident Commander** to coordinate teams, set priorities, track progress, coordinate communication, make/facilitate decisions and maintain situational awareness.

Other advanced concepts include **detection engineering** (design → test → deploy → monitor → tune detections), **dwell time** (how long an attacker remains before detection/removal), **network segmentation** (limits lateral movement), **backups** (essential for ransomware recovery when protected and reliable), and the risk of **over-automation** (incorrect automation can perform high-impact actions against legitimate systems).

### Interview Questions — Challenges & Best Practices

| Question | Answer |
|---|---|
| **Q1. What is alert fatigue?** | When analysts receive a large number of alerts, making it difficult to identify and prioritize the most important ones. |
| **Q2. How can an organization reduce alert fatigue?** | By tuning detection rules, reducing duplicate alerts, enriching alerts with context, prioritizing by risk, and automating repetitive triage tasks. |
| **Q3. What is a false negative?** | Malicious activity that is not detected by the security controls. |
| **Q4. Why is centralized logging important?** | It provides a unified view of security activity, enables correlation across systems, and makes investigations and timeline reconstruction easier. |
| **Q5. What is dwell time?** | The period during which an attacker remains inside an environment before being detected or removed. |
| **Q6. Why is network segmentation useful during an incident?** | It can limit lateral movement and reduce the number of systems an attacker can reach from a compromised host. |
| **Q7. Why are backups important for Incident Response?** | They allow organizations to restore systems and data after destructive incidents such as ransomware, provided the backups are protected and reliable. |
| **Q8. What is the risk of excessive automation?** | Incorrect automation can perform high-impact actions against legitimate systems or users and cause unnecessary business disruption. |
| **Q9. Why should an Incident Response plan be tested?** | Testing reveals gaps in procedures, roles, communication, tools, and recovery capabilities before a real incident occurs. |

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **Incident Response** | Structured process to handle a cyber attack from detection until recovery and learning; both proactive (prepare) and reactive (respond). |
| **Event → Incident** | `EVENT → LOG → SECURITY TOOL → ALERT → INVESTIGATION → False Positive (discard) / True Positive (INCIDENT)`. |
| **False vs True Positive** | False Positive = alert but legitimate activity; True Positive = alert correctly identifies a real threat. |
| **Severity** | Based on impact; priority `CRITICAL → HIGH → MEDIUM → LOW`. |
| **Incident types** | Malware Infection, Security Breach, Data Leak, Insider Attack, Denial of Service (DoS/DDoS) — remember **MB LID**. |
| **SANS PICERL** | Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned. |
| **NIST** | Preparation → Detection & Analysis → Containment, Eradication & Recovery → Post-Incident Activity. |
| **SANS vs NIST** | Similar objectives; SANS separates C/E/R, NIST groups them. |
| **C vs E vs R** | Containment = STOP/LIMIT, Eradication = REMOVE threat + root cause, Recovery = RESTORE + validate. |
| **Plan / Playbook / Runbook** | Plan = org-wide strategy; Playbook = incident-specific workflow; Runbook = detailed technical procedure. |
| **Tools** | SIEM (logs/correlation), EDR (endpoint + response), Antivirus, IDS (detect), IPS (prevent), Firewall, Email Security, Threat Intel, SOAR (automation). |
| **IOC vs IOA** | IOC = evidence of compromise; IOA = evidence of malicious behaviour. |
| **Investigation** | WHO? WHAT? WHEN? WHERE? HOW? WHY? — correlate multiple indicators, determine scope. |
| **Evidence** | Volatile (RAM, processes, connections) vs Non-Volatile (disk, logs); preserve before destructive actions; track Chain of Custody. |
| **Metrics** | MTTD = Mean Time to Detect; MTTR = Mean Time to Respond/Recover/Resolve. |
| **Challenges** | Alert fatigue, false negatives, lack of visibility, log integrity, limited resources, communication. |

**Key idea:** `PREPARE → DETECT → TRIAGE → INVESTIGATE → SCOPE → CONTAIN → ERADICATE → RECOVER → DOCUMENT → LEARN → IMPROVE → PREPARE`. The goal of IR is not simply to remove malware — it is to understand the incident, limit its impact, remove the attacker's access, restore trusted operations and make the organisation stronger against the next attack.

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. Explain Incident Response.** | A structured process for preparing for, detecting, analyzing, containing, eradicating, and recovering from security incidents, including post-incident analysis and continuous improvement. In practice: validate the alert, collect context, determine scope and severity, preserve evidence, contain the threat, remove the root cause, recover systems, and document lessons learned. |
| **Q2. What are the NIST Incident Response phases?** | Preparation; Detection & Analysis; Containment, Eradication & Recovery; Post-Incident Activity. |
| **Q3. What is SANS PICERL?** | Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned. |
| **Q4. Difference between NIST and SANS?** | Both provide structured IR approaches. SANS separates containment, eradication, and recovery into individual phases; NIST groups them into one broader response phase. |
| **Q5. What is containment?** | Containment limits the attacker's ability to continue operating or spread further. |
| **Q6. What is eradication?** | Eradication removes the malicious presence, persistence mechanisms, and underlying causes where possible. |
| **Q7. What is recovery?** | Recovery restores affected systems and services to a trusted operational state and verifies that they are safe to return to production. |
| **Q8. Why is scope determination important?** | Because the initially detected system may only be one part of a larger compromise. |
| **Q9. Why isn't deleting malware enough?** | Because persistence, stolen credentials or a backdoor may remain — the attacker returns. You must investigate initial access, persistence, credentials, lateral movement and root cause. |
| **Q10. How do you balance evidence preservation with containment?** | Prioritize stopping active threats while considering what evidence could be lost; where practical, preserve volatile and relevant evidence before destructive actions, following the organization's IR and forensic procedures. |
| **Q11. What makes a good security alert?** | It should be relevant, accurate, actionable, timely and context-rich — helping the analyst answer what happened, why it's suspicious, which system/user, and what to investigate next. |
| **Q12. SOC receives 5,000 alerts a day and analysts are overwhelmed — what do you do?** | Identify noisy rules, measure false-positive rates, tune detections, deduplicate, add context enrichment, prioritize by risk, automate repetitive tasks, improve playbooks, and continuously tune. Goal: higher-quality, actionable alerts — not merely fewer. |
| **Q13. EDR detects suspicious activity on a Domain Controller — what do you do?** | Escalate immediately (critical asset), validate the alert, preserve critical evidence, review authentication activity, identify affected accounts, search for lateral movement, check persistence, determine scope, coordinate containment carefully, eradicate attacker access, validate recovery, and monitor closely. |
| **Q14. Multiple production systems are encrypted (ransomware) — what is your approach?** | Detect → confirm → determine scope → isolate affected hosts → protect backups → investigate initial access → investigate lateral movement → eradicate → recover from clean sources → validate → monitor → lessons learned. |
| **Q15. You identify one compromised workstation — is containment complete?** | No. Determine whether the attacker moved laterally or reused indicators on other systems; search related users, hashes, domains, IPs, processes, authentication events, and network activity before considering the incident fully contained. |
| **Q16. A user reports repeated MFA prompts (MFA fatigue) — what does it suggest and what do you do?** | It suggests an attacker may already have the password and is trying to get the user to approve. Investigate login attempts, source IP, device, MFA events and application; respond by blocking/restricting the account, resetting credentials, revoking sessions, reviewing MFA and monitoring. |

---

## Final Takeaway

**Incident Response (IR)** is the structured process an organisation uses to handle a cyber attack from detection through to recovery and learning — it is both **proactive** (preparation) and **reactive** (handling the attack). It builds on a clear vocabulary: an **event** is recorded as a **log**, a security tool raises an **alert**, an analyst investigates and classifies it as a **False Positive** (discard) or a **True Positive** (a confirmed **incident**), and each incident receives a **severity** (`Low → Medium → High → Critical`) based on impact. Incidents come in recognisable types — **Malware Infection**, **Security Breach**, **Data Leak**, **Insider Attack** and **Denial of Service** — and are handled through a lifecycle. The **SANS PICERL** model (**Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned**) and the **NIST** model (**Preparation → Detection & Analysis → Containment, Eradication & Recovery → Post-Incident Activity**) share the same objectives; the crucial distinction they both preserve is that **Containment** stops/limits the attack, **Eradication** removes the threat and its **root cause**, and **Recovery** restores trusted operations. Mature IR combines an **IR Plan**, **Playbooks** and **Runbooks** with defined **roles**, **communication** and **escalation**; the right tooling — **SIEM**, **EDR**, **Antivirus**, **IDS/IPS**, **Firewall**, **Threat Intelligence** and **SOAR**; and disciplined investigation using the **WHO/WHAT/WHEN/WHERE/HOW/WHY** framework, **process trees**, **IOCs**, **evidence preservation** and **scope determination**. The recurring lesson is that IR is a process, not a single tool — the ultimate goal is to **detect faster, respond faster, limit damage, recover safely, learn, and improve security against the next attack**.
