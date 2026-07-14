## Contents

- [The Security Mindset](#the-security-mindset)
- [Security Events vs. Security Incidents](#security-events-vs-security-incidents)
- [Data Classification — Four Levels](#data-classification--four-levels)
- [Business Continuity Plan (BCP) vs. Disaster Recovery Plan (DRP)](#business-continuity-plan-bcp-vs-disaster-recovery-plan-drp)
- [The Information Lifecycle Strategy — 4 Steps](#the-information-lifecycle-strategy--4-steps)
- [Incident Escalation — When and How](#incident-escalation--when-and-how)
- [Quick Revision](#quick-revision)

## The Security Mindset

> **KEY CONCEPT: Definition**
> The continuous ability to evaluate risk, seek out vulnerabilities, and identify potential or actual breaches of systems, applications, or data.
> 
> Core principle: Operate under the assumption that 'every click of the mouse has the potential to lead to a security breach.'
> Complacency is the ENEMY of security. Even systems that haven't been attacked recently must be treated as vulnerable.
> 
> This mindset is NOT just about tools -- it is about continuously evaluating risk before executing any command or deploying any infrastructure.

> **IMPORTANT: Common Mistakes to Avoid**
> * Assuming a system is secure just because it hasn't been attacked recently.
> * Failing to ask senior team members for help when facing an unknown threat.
> * Treating an unusual event as 'probably nothing' without investigating.

> **INTERVIEW TIP: Interview Tip**
> When asked about your strengths, explicitly mention your 'security mindset.'
> Say: 'I proactively evaluate risk before executing commands or deploying infrastructure, and I treat every unusual event as worth investigating.'

## Security Events vs. Security Incidents

> **NOTE: Core Rule: ALL incidents are events. NOT all events are incidents.**
> 
> SECURITY EVENT: Any observable occurrence in a system or network.
> Example: A user attempts to log in but fails the password check twice.
> Example: A firewall successfully BLOCKS a known malicious IP. -> This is an EVENT (no breach).
> 
> SECURITY INCIDENT: A security event that results in a DATA BREACH or a POLICY VIOLATION.
> Example: A user falls for a phishing email and an attacker downloads an internal database.
> Example: A threat actor BYPASSES the firewall and accesses a database. -> This is an INCIDENT.
> 
> Why the distinction matters: Treating every event as an incident = alert fatigue.
> Treating an incident as a mere event = unmitigated data breach.

## Data Classification — Four Levels

| **Level** | **Risk** | **Definition** | **Examples** |
| --- | --- | --- | --- |
| **PUBLIC** | Minimal | Information already accessible to the public. Still needs basic integrity checks. | Press releases, job descriptions, marketing materials, public website content. |
| **PRIVATE** | Moderate | Internal information for organizational members only. Not for public release. | Company email addresses, employee IDs, internal training materials, org charts. |
| **SENSITIVE** | High | Unauthorized access causes significant financial and reputational damage. | PII (names, addresses), SPII (SSNs, passport numbers), PHI (medical records), bank accounts. |
| **CONFIDENTIAL** | Severe | Highly restricted data vital to business operations. Often governed by NDAs. | Trade secrets, proprietary source code, unreleased financial reports, M&A strategy. |

> **ASSET CLASSIFICATION — Low vs. High Level**
> **ASSET CLASSIFICATION based on data type:**
> **LOW-LEVEL ASSETS: Will NOT severely impact organization if compromised.**

```
  +-- Guest Wi-Fi networks
  +-- Published press releases
  +-- Public website content

  HIGH-LEVEL ASSETS: Devastating financial, operational, or reputational damage if breached.
  +-- Intellectual property (trade secrets, source code)
  +-- Databases containing customer PII, SPII, or PHI
  +-- Financial transaction systems and payroll databases
  +-- Cryptographic keys and authentication infrastructure

  CLASSIFICATION RULE: Sensitive + Confidential data = HIGH-LEVEL asset.
  Public + Private data = LOW-LEVEL asset (in most cases).
```

## Business Continuity Plan (BCP) vs. Disaster Recovery Plan (DRP)

> **KEY CONCEPT: Key Distinction**
> **BCP:** Keeps the BUSINESS alive during an incident (people, operations, customer communication).
> **DRP:** Fixes the TECHNOLOGY after an incident (servers, software, data restoration).
> Both run simultaneously during a major incident. They complement each other.

| **Plan** | **Focus Area** | **Purpose** | **Key Actions** |
| --- | --- | --- | --- |
| **Business Continuity Plan (BCP)** | Business operations and people | Sustain business operations (customer service, staff management) DURING and AFTER a disruption. | 1. Conduct Business Impact Analysis (BIA). 2. Document recovery steps. 3. Form cross-functional team (IT, HR, Comms, Ops). 4. Train and simulate. |
| **Disaster Recovery Plan (DRP)** | IT infrastructure and data | Minimize impact and RESTORE technical systems (hardware, software, data) after an incident. | 1. Hardware recovery (replace failed servers). 2. Software recovery (re-deploy OS/apps). 3. Identify what apps and data were impacted. |

> **EXAMPLE: Real-World Scenario: Ransomware Attack**
> BCP IN ACTION: While IT fights the ransomware, the Operations team diverts to manual order processing.
> HR communicates the situation to staff. PR manages customer communications.
> Business continues operating at reduced capacity -- 'keep the music playing.'
> 
> DRP IN ACTION: IT team isolates infected servers. Restores from last clean offline backup.
> Rebuilds operating systems from hardened baseline images.
> Patches the specific vulnerability that allowed ransomware entry.
> Verifies data integrity before returning systems to production.

## The Information Lifecycle Strategy — 4 Steps

> **INFORMATION LIFECYCLE STRATEGY — I.A.P.M Continuous Cycle**
> **INFORMATION LIFECYCLE STRATEGY (I.A.P.M):**

```
  +------------------+   +------------------+   +------------------+   +------------------+
  |   1. IDENTIFY    |-->|   2. ASSESS      |-->|   3. PROTECT     |-->|   4. MONITOR     |
  +------------------+   +------------------+   +------------------+   +------------------+
  | Locate the MOST  |   | Review current   |   | Implement        |   | Continuously     |
  | important assets |   | security measures|   | defensive        |   | observe systems  |
  | and sensitive    |   | and policies in  |   | controls to      |   | for anomalies    |
  | data.            |   | place.           |   | secure assets.   |   | and unauthorized |
  |                  |   | Vulnerability    |   | Encryption, IAM, |   | access attempts. |
  | Classify them:   |   | scanning,        |   | firewalls,       |   | SIEM alerts,     |
  | Public/Private/  |   | access reviews,  |   | patching,        |   | log reviews,     |
  | Sensitive/Conf.  |   | policy gaps.     |   | training.        |   | dashboards.      |
  +------------------+   +------------------+   +------------------+   +------------------+

  This is a CONTINUOUS CYCLE -- not a one-time checklist.
  After Monitor -> new threats identified -> back to Identify.
```

## Incident Escalation — When and How

> **RULE: Golden Rule: There are NO issues too small to report.**
> If you are unsure whether an event warrants escalation, ALWAYS err on the side of caution and report it.
> Entry-level analysts are NOT expected to solve every crisis alone.
> Escalation ensures the RIGHT experts handle the problem with the RIGHT authority.

| **Situation** | **Action** | **Why** |
| --- | --- | --- |
| **Single failed login attempt** | Log, monitor for recurrence. No immediate escalation required. | One failed login is a normal user experience. Context matters. |
| **15 failed logins in 30 minutes on one account** | Escalate to Password Protection Team / supervisor. | Pattern indicates possible brute-force attack. High risk of unauthorized access. |
| **Malicious code found in log file** | Escalate IMMEDIATELY to Incident Response team. | Can lead to severe data breach and financial consequences if not contained fast. |
| **Employee installs unapproved software** | Escalate to IT and supervisor. | Unapproved apps may harbor vulnerabilities. Minor event can become major incident. |
| **You are unsure if something is an incident** | Escalate. Always. | 'There are no issues too small or too big to report.' -- Google Certificate. |

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| **What is the security mindset?** | The continuous ability to evaluate risk, seek out vulnerabilities, and identify potential or actual breaches. Assume every action could lead to a breach. |
| **Event vs. Security Incident?** | Event = observable occurrence (firewall blocks attack). Incident = event that results in a DATA BREACH or POLICY VIOLATION. All incidents are events; not all events are incidents. |
| **4 data classification levels?** | Public (minimal risk), Private (moderate, internal), Sensitive (high -- PII/PHI/SPII), Confidential (severe -- trade secrets, NDAs). |
| **BCP vs. DRP?** | BCP: keeps business operations running during disruption (people/ops). DRP: restores technical infrastructure after incident (IT/systems). Both run simultaneously. |
| **4 steps of Information Lifecycle Strategy?** | Identify (find important assets) -> Assess (review current controls) -> Protect (implement defences) -> Monitor (continuous observation). Repeat. |
| **When should you escalate?** | Always err on caution. 'No issue too small or too big.' If unsure, escalate to supervisor or appropriate team immediately. |
| **What data type requires NDAs?** | Confidential Data -- trade secrets, proprietary source code, unreleased financial reports. |
