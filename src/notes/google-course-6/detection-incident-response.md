## Contents

- [The Modern Security Reality — Detection Over Prevention](#the-modern-security-reality--detection-over-prevention)
- [Event vs. Security Incident](#event-vs-security-incident)
- [NIST Incident Response Lifecycle — 4 Phases](#nist-incident-response-lifecycle--4-phases)
- [Incident Documentation — The 5 W's](#incident-documentation--the-5-ws)
- [Team Structures — CSIRT & SOC](#team-structures--csirt--soc)
- [Detection Tools — IDS, IPS, EDR](#detection-tools--ids-ips-edr)
- [The 4 Signal Triage States](#the-4-signal-triage-states)
- [SIEM vs. SOAR — The Operations Backbone](#siem-vs-soar--the-operations-backbone)

## The Modern Security Reality — Detection Over Prevention

> **KEY CONCEPT: The Industry Mindset Shift**
> You CANNOT prevent 100% of attacks. The perimeter is too large, threats too sophisticated, humans too fallible.
> Modern security has shifted from 'how do we stop all attacks?' to 'how do we detect and respond FAST?'
> Goal: Reduce Time to Detect (TTD) and Time to Respond (TTR) to minimize blast radius.

## Event vs. Security Incident

> **NOTE: Core Rule: All security incidents are events, but NOT all events are security incidents.**
> 
> EVENT: Any observable occurrence on a network, system, or device. Events are normal -- millions happen daily.
> Example: Employee forgets password, requests reset, successfully changes it. Logged as an event. No policy violated.
> 
> SECURITY INCIDENT: An occurrence that jeopardizes the CIA of an information system OR violates a security policy.
> Example: Attacker forces a fraudulent password reset on the CEO's account and steals financial records.
> This violates policy AND compromises confidentiality. This is a SECURITY INCIDENT.
> 
> Why the distinction matters: Not every alert needs an incident response. Analysts must triage accurately.
> Mis-classifying an incident as a normal event = missed breach. Mis-classifying events as incidents = alert fatigue.

## NIST Incident Response Lifecycle — 4 Phases

> **TIP: How the Lifecycle Works**
> The NIST lifecycle is NOT linear -- it is a continuous loop. Phases CAN overlap.
> Example: During Recovery (Phase 3), new evidence discovered may send the team back to Detection (Phase 2).
> The loop continues until the incident is fully resolved and post-incident review is complete.

> **NIST 4-PHASE INCIDENT RESPONSE LIFECYCLE**

```
  +-------------------------------------------------------------------+
  |             NIST INCIDENT RESPONSE LIFECYCLE                      |
  +-------------------------------------------------------------------+

  +----------------+   +----------------------+   +-------------------+
  | PHASE 1:       |-->| PHASE 2:             |-->| PHASE 3:          |
  | PREPARATION    |   | DETECTION &          |   | CONTAINMENT,      |
  |                |   | ANALYSIS             |   | ERADICATION &     |
  | Before attack: |   | Monitor & assess     |   | RECOVERY          |
  | tools, policy, |   | indicators. Is this  |   | Stop bleeding,    |
  | training, plans|   | a real incident?     |   | remove threat,    |
  |                |   |                      |   | restore ops.      |
  +----------------+   +----------------------+   +---------+---------+
                                                            |
                                                            |
                        +----------------------+            |
                        |  PHASE 4:            |+------------
                        | POST-INCIDENT        |
                        | ACTIVITY             |
                        | Lessons learned,     |
                        | update playbooks,    |
                        | improve defences.    |
                        +----------------------+

  Phases can OVERLAP. New evidence in Phase 3 may loop back to Phase 2.
```

| **Phase** | **Name** | **What Happens** | **Analyst Action Example** |
| --- | --- | --- | --- |
| **1** | **Preparation** | Build defences BEFORE attacks occur. Tools, resources, policies, training, playbooks all set up proactively. | Configure company email to flag all external emails with 'CAUTION' banner. Train employees on phishing recognition quarterly. |
| **2** | **Detection & Analysis** | Continuous monitoring to catch incidents early. Analyze alerts to determine if a real incident or false alarm. | SIEM flags 3AM spike in outbound database traffic. Analyst investigates logs -- is data being exfiltrated or is it a scheduled backup? |
| **3** | **Containment, Eradication & Recovery** | Stop the damage (contain), remove the threat (eradicate), restore operations (recover). | CONTAIN: Disconnect infected laptop from network. ERADICATE: Delete malicious files, patch vulnerability. RECOVER: Restore from clean backup. |
| **4** | **Post-Incident Activity** | The learning phase. What went wrong? Update defences to prevent recurrence. | Hold blameless post-mortem. Update playbook to add attacker's fake domain to blocklist. Improve detection rules in SIEM. |

## Incident Documentation — The 5 W's

> **NOTE: Why Documentation is Critical**
> During a breach, chaos is the enemy. Meticulous documentation ensures:
> * Accurate analysis (what actually happened vs. what people THINK happened)
> * Legal chain of custody (evidence must be handled correctly for court)
> * Post-incident learning (you cannot improve what you did not record)
> * Handoff continuity (shift change -- next analyst needs full context)
> Tool: An Incident Handler's Journal tracks all facts in real-time during the response.

| **W** | **Question** | **Example Answer** |
| --- | --- | --- |
| **WHO** | Who triggered the incident? Who is responsible? | Known ransomware gang: BlackCat/ALPHV. Initial access via phishing email to junior accountant. |
| **WHAT** | What happened? What systems were affected? | Customer database encrypted. 50,000 records potentially exfiltrated before encryption. |
| **WHERE** | Where did it take place? Which systems, locations? | Primary production database server (DB-PROD-01) in AWS us-east-1 region. |
| **WHEN** | When did it start? When was it detected? Timeline? | Attacker entered: Tuesday 02:14 AM. Encryption started: Tuesday 03:47 AM. Detected: Tuesday 08:23 AM (by employee). |
| **WHY** | Why did it succeed? What vulnerability was exploited? | Unpatched Apache Log4j vulnerability (Log4Shell, CVE-2021-44228) on public-facing web server used for initial access. |

## Team Structures — CSIRT & SOC

### CSIRT — Computer Security Incident Response Team

> **NOTE**
> A cross-functional task force assembled to handle specific major security crises.
> Not a permanent 24/7 unit -- formed when a significant incident occurs and disbanded after resolution.
> 
> Security Analyst: Investigates the initial alert. Determines if it is a real incident.
> Technical Lead (Ops Lead): Directs the technical fix -- emergency patches, firewall rules, containment.
> Incident Coordinator: Manages the project timeline. Bridges to non-security departments.
> Example: If customer credit cards are stolen, Coordinator brings Legal (compliance) and
> PR (public disclosure) teams into the response to manage mandatory breach notifications.

### SOC — Security Operations Center

> **SOC HIERARCHY — From Frontline to Threat Hunters**
> **SOC HIERARCHY (24/7 Blue Team):**

```
  +----------------------------------------------------------+
  | SOC MANAGER                                              |
  | Manages hiring, training, strategy, reports to CISO/CEO  |
  +----------------------------------------------------------+
              |
  +----------------------------------------------------------+
  | TIER 3 (L3) -- THREAT HUNTERS & ADVANCED ANALYSTS        |
  | Proactively hunt through millions of logs looking for    |
  | HIDDEN attackers that never triggered any alert.         |
  | Handle the most complex escalations from L2.             |
  +----------------------------------------------------------+
              |

  +----------------------------------------------------------+
  | TIER 2 (L2) -- DEEP INVESTIGATORS                        |
  | Receive escalated tickets from L1. Perform digital       |
  | forensics: extract malware, analyze what it did,         |
  | determine scope of breach. Write detailed reports.       |
  +----------------------------------------------------------+
              |
  +----------------------------------------------------------+
  | TIER 1 (L1) -- FRONTLINE ANALYSTS (Entry-Level)          |
  | Monitor alert queue. Investigate automated alerts.       |
  | Close false positives. Escalate real incidents to L2.    |
  | Most entry-level analyst roles start here.               |
  +----------------------------------------------------------+
```

## Detection Tools — IDS, IPS, EDR

| **Tool** | **Type** | **What It Does** | **Action on Threat** | **Analogy** |
| --- | --- | --- | --- | --- |
| **IDS (Intrusion Detection System)** | Passive monitoring | Watches network traffic or host activity. Compares against signatures or baselines. | Generates ALERT only. Does NOT block or stop the threat. | Security camera: records the burglar and sends you a notification, but doesn't lock the door. |
| **IPS (Intrusion Prevention System)** | Active blocking | Watches traffic inline (all traffic passes through it). Detects threats in real-time. | Automatically BLOCKS/DROPS malicious traffic without human intervention. | Automated steel shutter: detects broken window, slams shut instantly to block entry. |
| **EDR (Endpoint Detection & Response)** | Host-based AI defense | Installed directly on individual devices. Uses AI behavioral analysis, not just signatures. | Detects anomalous behavior, kills malicious process, isolates device from network. | An Excel file trying to open a terminal and delete system files = abnormal behavior. EDR kills it instantly. |

> **TIP: IDS Tools to Know**
> Zeek: Open-source network analysis framework. Excellent for traffic logging and protocol analysis.
> Suricata: Open-source IDS/IPS/NSM. Signature-based + anomaly. Integrates with SIEM tools.
> Snort: Classic open-source IDS/IPS. Widely deployed. Large community rule library.

## The 4 Signal Triage States

> **KEY CONCEPT: Every security alert falls into exactly one of these four categories:**
> Analysts must correctly classify every alert. Incorrect classification causes missed breaches or wasted resources.

> **4 SIGNAL TRIAGE STATES — TP / TN / FP / FN Matrix**
> **THREAT ACTUALLY PRESENT?**
> **YES            NO**

```
               +----------+   +----------+
  ALERT YES    |   TRUE   |   |  FALSE   |
  FIRES?       | POSITIVE |   | POSITIVE |
               | (TP)     |   | (FP)     |
               +----------+   +----------+
               +----------+   +----------+
  ALERT NO     |   FALSE  |   |   TRUE   |
  FIRES?       | NEGATIVE |   | NEGATIVE |
               | (FN)     |   | (TN)     |
               +----------+   +----------+

  TP (True Positive): Alarm fires + real hacker present. CORRECT detection.
  TN (True Negative): No alarm + no threat. System correctly silent. CORRECT.
  FP (False Positive): Alarm fires but NO real threat. IT admin ran backup.
     Danger: Alert fatigue. Analysts start ignoring alarms.
  FN (False Negative): NO alarm + real threat present. Zero-day bypassed IDS.
     Danger: WORST CASE. Company is completely blind to active breach.
```

## SIEM vs. SOAR — The Operations Backbone

> **SIEM + SOAR — How They Work Together**
> **SIEM (Security Information and Event Management)**
> **'THE DASHBOARD'**

```
  +----------------------------------------------------------+
  | STEP 1: COLLECT & AGGREGATE                              |
  | Pull raw data from: firewalls, routers, laptops, servers |
  | into one massive centralized database.                   |
  +----------------------------------------------------------+
  | STEP 2: NORMALIZE (Parsing)                              |
  | Convert logs from different vendors (Cisco, Windows, Mac)|
  | into one universal language for unified searching.       |
  | Parsing: 'Failed password from 192.168.1.5' becomes:     |
  |   Event=Failed_Login, IP=192.168.1.5, Time=14:32:01      |
  +----------------------------------------------------------+
  | STEP 3: CORRELATE & ALERT                                |
  | Connect the dots across separate events.                 |
  | Example: 5 failed logins on web server + 1 success on DB |
  | from SAME IP = one high-priority brute force alert.      |
  +----------------------------------------------------------+

  SOAR (Security Orchestration, Automation, and Response)
  'THE AUTOPILOT'
  +----------------------------------------------------------+
  | SIEM triggers alert for malicious IP address.            |
  | SOAR receives alert, runs automated playbook:            |
  |   1. Looks up IP in threat intelligence feeds            |
  |   2. Logs into firewall, adds block rule                 |
  |   3. Opens ServiceNow incident ticket                    |
  |   4. Sends Slack alert to SOC team                       |
  | Total time: 3 seconds. Manual equivalent: 20 minutes.    |
  +----------------------------------------------------------+
```

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| **Event vs. Security Incident?** | Event = observable occurrence (any). Incident = event that jeopardizes CIA OR violates security policy. All incidents are events, not all events are incidents. |
| **NIST 4 phases?** | 1-Preparation, 2-Detection & Analysis, 3-Containment/Eradication/Recovery, 4-Post-Incident Activity. Non-linear loop -- phases can overlap. |
| **5 W's of incident documentation?** | Who (attacker/victim), What (happened), Where (systems/location), When (timeline), Why (root cause/vulnerability). |
| **CSIRT vs. SOC?** | CSIRT: cross-functional task force for major crises, temporary. SOC: dedicated 24/7 unit for ongoing network defense (Blue Team). |
| **IDS vs. IPS vs. EDR?** | IDS: detects + alerts only (passive). IPS: detects + blocks automatically (active, inline). EDR: on-device behavioral AI, detects + isolates endpoint. |
| **True Positive vs. False Negative?** | TP: alarm fires AND real threat exists (correct detection). FN: alarm stays silent BUT real threat exists (worst case -- company is blind to breach). |
| **SIEM vs. SOAR?** | SIEM: aggregates/normalizes/correlates logs, generates alerts (the dashboard). SOAR: auto-executes response playbooks when SIEM fires alerts (the autopilot). |
