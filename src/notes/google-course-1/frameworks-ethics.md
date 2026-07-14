## Contents

- [Security Frameworks vs. Security Controls](#security-frameworks-vs-security-controls)
- [NIST Cybersecurity Framework (CSF)](#nist-cybersecurity-framework-csf)
- [Global Compliance Regulations — Complete Reference](#global-compliance-regulations--complete-reference)
- [Security Ethics — Professional Responsibility](#security-ethics--professional-responsibility)

## Security Frameworks vs. Security Controls

| **Concept** | **Definition** | **Analogy** | **Role in Security** |
| --- | --- | --- | --- |
| Security Framework | Comprehensive guidelines providing organizational blueprints for building risk-mitigation plans to safeguard data and privacy across a continuous security lifecycle. | The ARCHITECT'S BLUEPRINT for a building. Shows what rooms are needed, structural requirements, and safety codes. | Strategic layer. Provides the high-level structure and goals for the entire security program. |
| Security Controls | Direct, actionable safeguards and technical countermeasures designed to reduce a specific security risk. | The actual LOCKS, ALARMS, FIRE SPRINKLERS, and SECURITY CAMERAS installed per the blueprint. | Operational layer. The specific tools and processes that implement the framework's goals in daily practice. |

### The 4 Core Components of a Security Framework

| **1** | **Identify and Document Security Goals**<br>Establish targeted compliance standards and regional laws the organization must legally satisfy. Defines WHAT must be protected and to what level of assurance. |
| --- | --- |

| **2** | **Set Guidelines to Achieve Goals**<br>Craft baseline corporate policies that establish the operational criteria for meeting the documented milestones. Translates high-level goals into internal rules everyone must follow. |
| --- | --- |

| **3** | **Implement Strong Security Processes**<br>Engineer the day-to-day functional technical workflows that fulfill the guidelines. This is where controls (firewalls, encryption, MFA, IDS) are deployed operationally. |
| --- | --- |

| **4** | **Monitor and Communicate Results**<br>Continuously audit systems, identify anomalies, and escalate status indicators. Closes the feedback loop -- ensures controls are actually working and goals are being met. |
| --- | --- |

## NIST Cybersecurity Framework (CSF)

> **KEY CONCEPT: What is NIST CSF?**
> The National Institute of Standards and Technology Cybersecurity Framework is a VOLUNTARY framework composed of rigorous standards and industry best practices engineered to manage cybersecurity risk.
> 
> Voluntary: Organizations are not legally required to adopt it (unless federal contracts require it).
> Widely adopted: Considered the global gold standard for enterprise security planning.
> NIST CSF 2.0 (2024): Added a 6th function -- GOVERN -- to emphasize leadership accountability.

```
NIST CSF 2.0 -- SIX CORE FUNCTIONS:
  +---------+  +----------+  +---------+  +--------+  +--------+  +---------+
  | GOVERN  |->| IDENTIFY |->| PROTECT |->| DETECT |->| RESPOND|->| RECOVER |
  +---------+  +----------+  +---------+  +--------+  +--------+  +---------+
  Set strategy  Inventory     Deploy        Spot        Contain &   Restore to
  & oversight    all assets   safeguards    IOCs &      investigate  operations
  (new 2024)                 MFA,enc,fw    anomalies

  ASSET VALUATION: An asset's value = financial/regulatory costs of its compromise.
  High-risk assets (PostgreSQL DB storing SPII) -> tighter controls required.
  Low-risk assets (public website) -> standard controls acceptable.
```

## Global Compliance Regulations — Complete Reference

| **Regulation** | **Region** | **Who It Applies To** | **Key Requirements** | **Key Penalty** |
| --- | --- | --- | --- | --- |
| GDPR (General Data Protection Regulation) | European Union (applies globally to any org handling EU citizen data) | Any business worldwide that collects or processes EU residents' personal data. | Transparent data collection. Right to be forgotten. 72-HOUR breach notification window. Data minimization. | Up to 4% of annual global revenue or €20M (whichever is higher). |
| PCI DSS (Payment Card Industry Data Security Standard) | Global (payment industry) | Any organization that stores, processes, or transmits credit/debit card information. | Encrypted card storage. Network segmentation for cardholder data. Quarterly penetration tests. Annual audits. | $5,000-$100,000/month. Loss of card processing ability. |
| HIPAA (Health Insurance Portability and Accountability Act) | United States | Healthcare providers, insurers, and their business associates. | Privacy Rule (patient data rights). Security Rule (safeguards for PHI). Breach Notification Rule (60-day notification). | $100-$50,000 per violation. Up to $1.9M/year per category. |
| FERC-NERC | North America (energy sector) | Energy organizations operating components of the North American power grid. | Prepare for and mitigate security incidents affecting the power grid. Critical infrastructure protection. | Up to $1M per day per violation. |
| FedRAMP | United States (federal cloud) | Cloud service providers working with US federal government agencies. | Standardized security assessments and continuous monitoring for federal cloud architectures. | Loss of federal contract authorization. |
| SOC 1 & SOC 2 | United States (widespread adoption) | Service organizations storing or processing data on behalf of clients. | SOC 1: Financial reporting controls. SOC 2: Security, availability, confidentiality, and privacy of customer data. | No direct fines -- but failure can terminate business relationships and trigger legal liability. |

## Security Ethics — Professional Responsibility

### Micro-Ethics: The 'Slight Laziness' Trap

> **IMPORTANT**
> Most unethical behavior in cybersecurity originates from LAZINESS rather than malice.
> 
> Examples of ethical violations security professionals must actively resist:
> * Sharing credentials with a colleague because MFA is inconvenient.
> * Querying a user database out of curiosity without a business justification.
> * Skipping audit log entries because the incident 'wasn't really that serious.'
> * Using a personal device to access company systems to avoid paperwork.
> 
> Each action seems minor in isolation but introduces massive systemic risk.

### High-Pressure Ethics: Refusing Unauthorized Requests

> **IMPORTANT**
> Scenario: A senior executive asks you to access and extract private user data WITHOUT a written paper trail or court order.
> 
> YOUR MANDATORY RESPONSE: Refuse and mandate the request follow documented legal channels.
> 
> Even if the request comes from the CEO, you are the data custodian.
> Your responsibility is to the DATA, the LAW, and the affected INDIVIDUALS -- not to hierarchy.
> Document the refusal. Escalate to Legal Counsel if pressure continues.
> Compliance with an illegal order makes YOU legally liable alongside the requester.

### The Legality of Counterattacks ('Hacking Back')

| **Jurisdiction** | **Is Counterattack Legal?** | **Key Rule** | **Reference** |
| --- | --- | --- | --- |
| United States | STRICTLY ILLEGAL -- classified as criminal vigilantism. | Computer Fraud and Abuse Act of 1986. Only approved military/federal personnel are legally cleared to counterattack. | 18 U.S.C. § 1030 (CFAA) |
| International (ICJ Standard) | ONLY allowed under extremely narrow conditions. | Must: affect only the initial attacker, not escalate the event, act only as a communication to halt operations, and be completely reversible. | Tallinn Manual on international cyber law |
| Your Role as an Analyst | ALWAYS defensive. NEVER offensive. | Your job: logging payloads, blocking IPs via firewalls, isolating affected systems. Never initiating outbound attacks. | Employer policies + local law |

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| Framework vs. Security Control? | Framework = blueprint (strategic guidelines). Control = implementation (specific safeguard). Framework tells you WHAT to protect; controls are HOW you protect it. |
| 4 components of a security framework? | 1-Identify/document goals, 2-Set guidelines, 3-Implement processes, 4-Monitor and communicate results. Continuous cycle. |
| What is NIST CSF? | Voluntary framework from NIST providing standards and best practices to manage cybersecurity risk. 6 functions: Govern, Identify, Protect, Detect, Respond, Recover. |
| GDPR breach notification window? | 72 HOURS to notify affected individuals AND supervisory authorities after discovering a personal data breach. |
| HIPAA breach notification window? | 60 DAYS from discovery of breach affecting Protected Health Information (PHI). |
| Is hacking back legal in the US? | NO. Strictly illegal under the Computer Fraud and Abuse Act (1986). Criminal vigilantism. Only approved military/federal personnel may counterattack. |
| What to do if a senior executive demands unauthorized data access? | Refuse. Mandate the request follow documented legal channels. Document the refusal. Escalate to Legal if pressure continues. You are legally liable if you comply. |
| What drives asset valuation? | Financial or regulatory costs associated with compromise. High-risk assets (SPII databases) require maximum controls. Low-risk assets (public web pages) require standard controls. |
