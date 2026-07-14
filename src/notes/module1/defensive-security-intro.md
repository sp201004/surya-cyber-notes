## Contents

- [Objective](#objective)
- [What is Defensive Security?](#what-is-defensive-security)
- [Mind Map](#mind-map)
- [Offensive vs Defensive Security](#offensive-vs-defensive-security)
- [Think Like a Defender](#think-like-a-defender)
- [Defender Workflow](#defender-workflow)
- [SOC (Security Operations Center)](#soc-security-operations-center)
- [SOC Analyst Workflow](#soc-analyst-workflow)
- [Detect Suspicious Activity](#detect-suspicious-activity)
- [Identify the Attack](#identify-the-attack)
- [Attack Flow](#attack-flow)
- [Stop the Attack](#stop-the-attack)
- [Containment Process](#containment-process)
- [Important Terms](#important-terms)
- [Incident Response Lifecycle](#incident-response-lifecycle)
- [Interview Notes](#interview-notes)
- [Common Mistakes](#common-mistakes)
- [30-Second Revision](#30-second-revision)
- [Quick Revision](#quick-revision)

## Objective
Learn the fundamentals of **Defensive Security** by monitoring, detecting, investigating, and stopping an attack on the **FakeBank** website.

## What is Defensive Security?
**Definition:** Defensive Security is the practice of **protecting systems, networks, and data** from cyber attacks by continuously monitoring, detecting, analyzing, and responding to threats.

**Goal:**
- Protect systems
- Detect attacks
- Investigate incidents
- Respond quickly
- Minimize damage

### Mind Map
```
Defensive Security
│
├── Monitor Systems
├── Detect Threats
├── Investigate Incidents
├── Respond to Attacks
└── Improve Security
```

### Offensive vs Defensive Security
| Offensive Security | Defensive Security |
|---|---|
| Finds vulnerabilities | Protects against attacks |
| Simulates attacks | Detects & responds to attacks |
| Ethical Hacking | Security Monitoring |
| Red Team | Blue Team |

> **Remember:**
> Red Team → Attack · Blue Team → Defend · Purple Team → Collaboration of Red + Blue

## Think Like a Defender
Unlike ethical hackers, defenders:
- Monitor systems continuously
- Detect suspicious activities
- Investigate incidents
- Respond before damage occurs

**Main Goal:** Detect and respond to attacks.

### Defender Workflow
```
Monitor → Detect → Investigate → Contain → Recover
```

## SOC (Security Operations Center)
**Definition:** A **Security Operations Center (SOC)** is a team responsible for continuously monitoring and defending an organization's systems against cyber threats.

**Responsibilities**
- Monitor security alerts
- Analyze suspicious events
- Investigate incidents
- Respond to attacks
- Improve security posture

### SOC Analyst Workflow
```
Receive Alert → Investigate → Identify Threat → Contain Attack → Recover System
```

## Detect Suspicious Activity
**Objective:** Monitor security logs to identify malicious activity.

**Steps**
1. Open monitoring dashboard.
2. Review recent alerts.
3. Identify suspicious IP address.

**Suspicious Source IP:** `32.122.195.63`

> Monitoring helps defenders detect attacks **before they cause significant damage**.

## Identify the Attack
**Objective:** Determine what the attacker is trying to access.

**Investigation Process**
- Review logs
- Check URL discovery attempts
- Examine latest activity

**Latest URL Accessed:** `https://fakebank.com/admin`

### Attack Flow
```
Attacker → Website Scan → Discover Hidden Admin Page → Attempt Unauthorized Access
```

## Stop the Attack
**Immediate Priority — Containment:** stopping an attack while it is still in progress to prevent further damage.

**Steps**
1. Identify malicious IP.
2. Create firewall rule.
3. Block attacker IP.
4. Apply changes.
5. Verify attack has stopped.

- **Blocked IP:** `32.122.195.63`
- **Action:** `Firewall Rule → BLOCK`
- **Final Flag:** `THM{FAKEBANK-SECURED}`

### Containment Process
```
Alert Generated → Investigate Logs → Find Malicious IP → Block IP → Attack Stopped
```

## Important Terms
| Term | Meaning |
|---|---|
| Defensive Security | Protecting systems from cyber attacks |
| SOC | Security Operations Center responsible for monitoring and responding to threats |
| SOC Analyst | Monitors alerts, investigates incidents, and responds to attacks |
| Monitoring | Continuous observation of system activity to detect threats |
| Alert | A notification generated when suspicious behavior is detected |
| Incident | A security event that may compromise confidentiality, integrity, or availability |
| Investigation | Analyzing logs and alerts to determine the nature and impact of an attack |
| Containment | Stopping an active attack to minimize damage |
| Firewall | Filters incoming/outgoing network traffic based on predefined rules |
| Firewall Rule | Allows or blocks traffic based on IP address, port, or protocol |

### Incident Response Lifecycle
```
Preparation → Detection → Analysis → Containment → Eradication → Recovery → Lessons Learned
```

## Interview Notes
- **What is Defensive Security?** Protecting systems by monitoring, detecting, investigating, and responding to cyber threats.
- **What is a SOC?** A Security Operations Center where analysts monitor security events and respond to incidents 24/7.
- **What is Containment?** Limiting an ongoing attack to prevent further damage before eradication and recovery.
- **Why are logs important?** They provide evidence of attacker actions, helping analysts investigate incidents and determine scope.
- **What is a Firewall?** A network security mechanism that controls traffic by allowing or blocking connections based on predefined rules.

## Common Mistakes
| Mistake | Correct Approach |
|---|---|
| Ignoring security alerts | Investigate every alert to determine if it is malicious |
| Delaying containment | Stop the attack first, then perform deeper analysis |
| Blocking traffic without verification | Confirm the malicious source before applying firewall rules |
| Focusing only on prevention | Defense needs continuous monitoring, detection, response, and recovery |

## 30-Second Revision
- Defensive Security = Protect systems and respond to attacks.
- Blue Team monitors and defends the infrastructure.
- SOC analysts investigate alerts and logs.
- Suspicious IP: **32.122.195.63**
- Attacker targeted: **https://fakebank.com/admin**
- Containment = Block the attacker immediately.
- Firewall action: **BLOCK**
- Final flag: **THM{FAKEBANK-SECURED}**

> **Core Lesson:** Defensive Security is not just about preventing attacks — it's about **rapid detection, effective investigation, and swift containment** to minimize impact and keep systems secure.

## Quick Revision

| Item | Value |
|---|---|
| Suspicious IP | `32.122.195.63` |
| Hidden Admin URL | `https://fakebank.com/admin` |
| Firewall Action | `BLOCK` |
| Flag | `THM{FAKEBANK-SECURED}` |
