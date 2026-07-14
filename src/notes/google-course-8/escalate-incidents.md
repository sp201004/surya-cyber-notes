## Contents

- [Incident Escalation — Process & Policy](#incident-escalation--process--policy)
- [Three Incident Classification Types](#three-incident-classification-types)
- [Asset Criticality & Incident Prioritization](#asset-criticality--incident-prioritization)
- [Data Governance Roles — Complete Reference](#data-governance-roles--complete-reference)
- [Breach Notification Laws](#breach-notification-laws)
- [Quick Revision](#quick-revision)

## Incident Escalation — Process & Policy

> **KEY CONCEPT: The Escalation Sequence**
> **IDENTIFY -> TRIAGE -> HANDOFF**
> 
> **IDENTIFY:** Recognize a potential security incident from system alerts, logs, or anomalies.
> **TRIAGE:**   Assess the severity and urgency based on asset criticality and incident type.
> **HANDOFF:** Route the incident to the correct team/individual per the Escalation Policy.

> **ESCALATION WORKFLOW — Identify -> Triage -> Handoff**
> **ESCALATION WORKFLOW:**
> **[Alert Generated in SIEM / IDS / User Report]**
> **|**
> **v**
> **[TRIAGE: Classify the incident type]**
> **|           |              |**
> **v           v              v**
> **[Malware]  [Unauthorized    [Improper**
> **[Infection] Access]          Usage]**
> **|           |              |**
> **v           v              v**
> **[Assess Asset Criticality: High / Medium / Low]**
> **|**
> **v**
> **[Create Incident Ticket in ServiceNow / Jira / PagerDuty]**
> **[Document: what happened, when, which assets, who is affected]**
> **|**
> **v**
> **[Route to correct team PER ESCALATION POLICY]**

```
  +-- High Criticality -> Incident Response Team + Supervisor
  +-- Medium Criticality -> Tier 2 Analyst or appropriate team
  +-- Low Criticality -> IT Helpdesk or monitor
```

> **TIP: Day-One Must-Do**
> On your FIRST DAY as an analyst: Save or bookmark the Escalation Policy document.
> During an active incident is NOT the time to search for contact information.
> The Escalation Policy also lists BACKUP contacts when your supervisor is unavailable.

## Three Incident Classification Types

| **Type** | **Definition** | **How it Happens** | **Real Example** | **Escalation Rule** |
| --- | --- | --- | --- | --- |
| **Malware Infection** | Malicious software infiltrates the network to disrupt, damage, or gain unauthorized access. | Phishing email with malicious attachment, drive-by download, infected USB drive. | User clicks phishing link -> keylogger installs silently -> attacker captures banking credentials. OR ransomware encrypts all files and demands payment. | ALWAYS escalate immediately, especially if malware touches production servers. Time = damage spread. |
| **Unauthorized Access** | An individual (internal or external) gains digital or physical access to a system, data, or application WITHOUT permission. | Brute-force credential attacks, stolen credentials from data breaches, physical tailgating into server rooms. | External IP successfully logs into a database administrator account at 3 AM on a Sunday. Classic indicator of compromised credentials. | Escalate immediately. Priority based on asset criticality. Live production system = critical urgency. Prevents lateral movement. |
| **Improper Usage** | An employee violates the organization's Acceptable Use Policy (AUP). Can be accidental OR intentional. | Intentional: malicious insider theft. Accidental: employee unaware of policy limits. | Using a corporate software license for a personal side business. Accessing a coworker's HR file out of curiosity. Uploading source code to a public GitHub repo. | Always escalate to supervisor -- DO NOT try to determine intent yourself. HR and Legal implications require experienced leadership. |

## Asset Criticality & Incident Prioritization

> **KEY CONCEPT: Prioritization Rule**
> All incidents matter -- but they are NOT created equal.
> An incident impacting a HIGH-LEVEL asset (customer PII database, live payment gateway) takes priority over one impacting a LOW-LEVEL asset (offline test server, guest Wi-Fi).
> Asset criticality = the primary driver of escalation URGENCY.

| **Scenario** | **Asset Level** | **Priority** | **Action** |
| --- | --- | --- | --- |
| **Malware on legacy offline test server** | Low-level | Low / Medium | Triage, document, route to IT Helpdesk. No immediate business impact. |
| **Unauthorized access on live manufacturing application** | High-level | HIGH -- CRITICAL | Immediately isolate if authorized. Escalate to IR team with critical urgency. |
| **Employee accidentally accesses payroll folder** | High-level (PII) | Medium-High | Escalate to supervisor for HR/Legal review. Document all details including timestamp. |
| **Ransomware encrypting customer database** | High-level (PII + operations) | CRITICAL | Activate DRP immediately. Escalate to CISO. Notify Legal for breach notification laws. |

## Data Governance Roles — Complete Reference

> **NOTE: Why These Roles Matter for Escalation**
> When an incident occurs, you must route it to the CORRECT role based on what was affected.
> Routing a PII breach to a Data Custodian (technical) instead of the Data Controller (compliance) delays the correct regulatory response.

| **Role** | **Accountability** | **Core Responsibility** | **Escalate to This Role When...** |
| --- | --- | --- | --- |
| **Data Owner** | ULTIMATE accountability for classification, protection, and use of specific data. | Sets access rules. Decides who can see, edit, or delete the data. Has administrative control. | An employee gains unauthorized access to a specific software suite or dataset. |
| **Data Controller** | Determines the PROCEDURE and PURPOSE for processing data. | Focuses on compliance regarding PII collection and how it is used. Sets data processing policies. | Sensitive customer PII is at risk of exposure or misuse. GDPR/CCPA compliance questions arise. |
| **Data Processor** | THIRD-PARTY VENDOR processing data on behalf of the Controller. | Installs security measures. Processes data according to Controller's instructions. | An issue occurs at the vendor level (cloud provider outage, third-party breach, vendor API failure). |
| **Data Custodian** | TECHNICAL IMPLEMENTER of security controls. | Assigns/removes system access, configures IAM/firewall rules, monitors data per Owner's rules. | Technical security controls (firewalls, IAM permissions, access logs) need strengthening or review. |
| **Data Protection Officer (DPO)** | INDEPENDENT COMPLIANCE MONITOR. | Monitors adherence to data protection laws (GDPR, HIPAA, CCPA). Assesses overall security posture. | Privacy laws or legal compliance protocols are violated. Regulatory audit is triggered. |

> **TIP: Memory Shortcut**
> **Owner**    = Accountable boss (decides what's allowed)
> **Controller** = Purpose decider (decides why data is collected)
> **Processor**  = Third-party vendor (actually processes the data)
> **Custodian**  = Technical implementer (builds and maintains the controls)
> **DPO**      = Compliance watchdog (monitors legal adherence)

## Breach Notification Laws

> **IMPORTANT**
> When sensitive data (PII, SPII, PHI) is compromised in a security incident, LEGAL OBLIGATIONS trigger immediately.
> 
> What must be reported: Social Security Numbers, medical records, driver's license numbers, bank account details, biometric data.
> 
> Who gets notified: Affected individuals AND relevant government authorities (FTC, HHS, state regulators).
> 
> Timeline: GDPR requires notification within 72 hours. HIPAA requires notification within 60 days.
> 
> Who handles this: Legal Counsel + Data Protection Officer. Analysts must escalate ANY PII breach immediately.
> NEVER delay reporting a PII breach waiting for investigation to be complete.

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| **Escalation sequence?** | IDENTIFY (recognize incident) -> TRIAGE (assess severity) -> HANDOFF (route per escalation policy). |
| **3 incident classification types?** | Malware Infection (bad code), Unauthorized Access (bad actors breaking in), Improper Usage (bad employee behavior -- AUP violation). |
| **What drives escalation urgency?** | Asset criticality. High-level assets (customer PII, live production systems) = highest urgency. Low-level assets = lower urgency. |
| **Data Owner vs. Data Custodian?** | Owner: accountable executive who sets access rules. Custodian: technical team member who implements those rules (IAM, firewall config). |
| **Data Controller vs. Data Processor?** | Controller: determines purpose/procedure for collecting PII. Processor: third-party vendor who actually processes the data on behalf of Controller. |
| **What is the DPO?** | Data Protection Officer -- independent role monitoring organization's compliance with data protection laws (GDPR, HIPAA). Not a technical role. |
| **When to escalate Improper Usage?** | Always escalate to supervisor. DO NOT try to determine intent yourself. HR and Legal must be involved. |
| **What if you are unsure during your first incident?** | Escalate. The Golden Rule: 'When in doubt, escalate.' There are no issues too small to report. |
