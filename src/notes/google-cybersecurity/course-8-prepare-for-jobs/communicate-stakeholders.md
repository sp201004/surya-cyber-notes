## Contents

- [Who Are Stakeholders?](#who-are-stakeholders)
- [The Stakeholder Matrix — Who Needs What](#the-stakeholder-matrix--who-needs-what)
- [Information Flow — Organizational Hierarchy](#information-flow--organizational-hierarchy)
- [Security Storytelling — The Communication Framework](#security-storytelling--the-communication-framework)
- [Communication Channels — Choosing the Right Medium](#communication-channels--choosing-the-right-medium)
- [Quick Revision](#quick-revision)

## Who Are Stakeholders?

> **KEY CONCEPT: Definition**
> A **STAKEHOLDER** is any individual or group that has a distinct interest in the decisions, activities, or operational outcomes of an organization.
> 
> In cybersecurity, stakeholders form a chain of custody for RISK.
> Information flows **UPWARD**: **entry-level analyst -> operations manager -> risk manager -> CISO -> CFO -> CEO.**
> 
> Key insight: Each tier needs data filtered **DIFFERENTLY** for their level of decision-making authority.
> Sending raw technical logs to a **CEO** = useless. Sending a high-level summary to an entry-level analyst = not actionable.

## The Stakeholder Matrix — Who Needs What

| **Stakeholder** | **Core Focus** | **Security Responsibility** | **What They Need From You** | **When to Escalate** |
| --- | --- | --- | --- | --- |
| **Operations Manager** | Day-to-day security ops efficiency | Direct supervisor. First line of defense. Oversees analyst work. | Direct escalation of daily anomalies, log spikes, failed login patterns, policy violations. | Immediately for any abnormal event you cannot resolve at your level. |
| **Cybersecurity Risk Manager** | Identifying and mitigating structural risks across the enterprise | Enforces IT policies. Coordinates incident responses. Bridges security, legal, and PR. | Operational metrics. Active incident status. Cross-department coordination needs. | When systemic vulnerabilities are found or incidents require multi-department response. |
| **Legal Counsel** | Litigation, regulatory compliance, and financial penalties | Legal advice on security legislation. Data loss penalty mitigation. | Immediate notification when PII is breached. Compliance questions. | IMMEDIATELY when any PII/SPII/PHI data is compromised or a regulatory requirement is triggered. |
| **CISO** | High-level security architecture and strategic risk management | Develops corporate defense strategy. Directs system audits. Manages business continuity. | Detailed post-mortem reports. Strategic compliance assessments. Systemic vulnerability analyses. | High-criticality incidents and comprehensive procedural post-incident reports. |
| **CFO** | Financial operations and corporate budgeting | Assesses financial burden of breaches vs. cost of security investments. | Data-heavy financial risk reports. Tool procurement justifications. Long-term cost-benefit analyses. | During tool procurement decisions or when quantifying financial impact of a breach. |
| **CEO** | Highest-ranking executive. Ultimate business decision-maker. | Manages macro organizational decisions. Reports to shareholders. | High-level executive summaries only. Never raw technical data. | Rarely direct. Route through your manager. Only for catastrophic incidents. |

## Information Flow — Organizational Hierarchy

> **ORGANIZATIONAL HIERARCHY — Information Flow**
> **INFORMATION FLOWS UPWARD -- Each tier requires different data format:**
```
                [CEO] -- Ultimate decision-maker. Receives 1-page executive summaries.
                  ^
                  |  (Strategic summaries + board-level impact statements)
                  |
                [CFO] ──────────────── [CISO]
            Budget impact       Defense architecture,
                                risk audits, compliance
                  ^                       ^
                  |                       |  (Detailed reports, timelines,
                  |                       |   procedural analyses)
                  |                       |
          [Risk Manager] ─────── [Legal Counsel]
           Systemic risk          PII breaches,
                                  compliance violations
                          ^
                          |  (Operational metrics,
                          |   incident summaries)
                          |
                [Operations Manager]   <- YOUR DIRECT SUPERVISOR
                          ^
                          |  (Direct escalation,
                          |   raw incidents, anomalies)
                          |
              [Security Analyst (YOU)]
    Detects events. Triages. Escalates. Communicates.

RULE: Never send raw log data to executives.
      Always translate to business impact.
```

## Security Storytelling — The Communication Framework

> **NOTE: Why 'Security Storytelling'?**
> Decision-makers are BUSY. They cannot decode raw technical alerts.
> A structured narrative lets them grasp severity instantly and confidently approve remediation.
> WRONG: 'We detected a POST request bypass on an unauthenticated endpoint.'
> RIGHT: Use the Beginning-Middle-End framework below.

> **SECURITY STORYTELLING — Beginning / Middle / End Framework**

**SECURITY STORY STRUCTURE**

**BEGINNING (The Alert / Challenge):**
What happened? State the observable fact clearly.
Example: 'We detected a 40% spike in automated password-guessing attempts against our HR payroll system over the past 24 hours.'

**MIDDLE (The Impact / Playbook Strategy):**
What does this mean for the business? What does the playbook say to do?
Example: 'This activity endangers sensitive employee PII and financial records. Following our incident playbook, we initiated temporary geographic blocks on incoming requests from the source IP ranges.'

**END (The Actionable Solution / Recommendation):**
What specific action do you recommend right now?
Example: 'I recommend we immediately mandate MFA for all payroll administrators to secure these high-risk accounts before the next business day.'

## Communication Channels — Choosing the Right Medium

| **Situation** | **Best Channel** | **Why** | **Tool Example** |
| --- | --- | --- | --- |
| **Data-heavy metrics (login counts, patch %s, trend analysis)** | Visual Dashboard / Spreadsheet | Charts and graphs display complex comparative data instantly. Executives see patterns without reading tables of numbers. | Google Sheets, Apache OpenOffice Calc -- bar charts, line graphs, heat maps. |
| **Urgent active incident requiring immediate action** | Instant Message / Direct Phone Call | Email sits unread. In urgent situations, take PROFESSIONAL INITIATIVE and call or message directly. | Slack, Teams, direct phone call. Follow up with email documentation. |
| **CISO needs procedural compliance assessment** | Detailed Written Report | CISO requires systematic documentation detailing timelines, policy efficacy, and strategic recommendations for governance. | Formal PDF/DOCX report with sections: Executive Summary, Timeline, Findings, Recommendations. |
| **Operations Manager daily briefing** | Direct Escalation / Short Email | Immediate supervisor needs actionable operational data. Keep it concise and specific. | Clear subject line, 3-5 bullet points, specific asset affected, action taken, next step. |
| **CFO tool procurement justification** | Data-heavy financial report | CFO cares about cost vs. risk in dollar figures. Show ROI of the security investment. | Spreadsheet with breach cost estimates vs. tool cost. Multi-year financial projection. |

> **TIP: 4 Questions to Ask Before Every Stakeholder Communication**
> 1. What do I want them to KNOW? (The key fact -- one sentence maximum)
> 2. Why is it IMPORTANT to them? (Frame in their business context -- financial, legal, operational)
> 3. When is ACTION needed? (Immediate, within 24 hours, this week, next quarter?)
> 4. How do I explain this WITHOUT technical jargon? (Remove all technical terms. Use business language.)

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| **What is a stakeholder?** | Any individual or group with a distinct interest in the decisions, activities, or outcomes of an organization. |
| **Which stakeholder handles regulatory compliance and PII breach legalities?** | Legal Counsel -- tracks litigation, advises on data loss penalties, handles regulatory compliance. |
| **Which stakeholder gets tool procurement financial reports?** | CFO -- manages financial operations, budgets, and cost-benefit analysis of security investments. |
| **Security Storytelling formula?** | Beginning (what happened) + Middle (business impact + playbook strategy) + End (recommended action). Translate technical facts to business narrative. |
| **When to use a visual dashboard?** | When communicating data-heavy metrics (numbers, percentages, trends) to busy stakeholders who need patterns at a glance. |
| **Email not answered during urgent incident -- what do you do?** | Take professional initiative: call or instant message directly. Email is too slow during active incidents. |
| **Why avoid jargon with executives?** | They make decisions in business terms (risk, cost, reputation). Technical jargon creates confusion and slows decision-making. |
| **Does an entry-level analyst report directly to the CEO?** | No. Route through your operations manager. CEO receives high-level summaries only, via management chain. |
