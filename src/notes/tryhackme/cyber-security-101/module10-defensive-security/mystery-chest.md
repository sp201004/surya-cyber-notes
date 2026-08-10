| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Defensive Security / Bonus Revision |
| **Difficulty** | Beginner |
| **Time** | ~15 Minutes |
| **Module** | Defensive Security |

---

## Objective

This Mystery Chest is a **bonus revision vault** for the entire Defensive Security module. It consolidates the most important reference material from every room — Defensive Security Intro, SOC Fundamentals, Digital Forensics Fundamentals, Incident Response Fundamentals, and Logs Fundamentals — into one quick-reference place.

Use it as a lookup before a lab, an exam, or an interview. Everything here was covered across the module: how a **SOC** detects and responds, how **digital forensics** preserves and analyses evidence, how **incident response** handles an attack end to end, and how **logs** provide the evidence that ties it all together. The common thread is the blue-team workflow — **monitor → detect → investigate → contain → recover → learn**.

> **Analyst mindset:** an alert is the *beginning* of an investigation, not the conclusion — and *suspicious ≠ malicious*. Investigate the evidence, correlate multiple sources, determine scope, then decide.

---

## Defensive Security at a Glance

Defensive security (**blue team**) protects assets, detects attacks, and responds to incidents — it is both **reactive** (incident response) and **proactive** (patching, hardening, monitoring).

| Discipline | What it does |
|-----------|--------------|
| **SOC** | 24/7 monitoring, detection, triage and response |
| **Digital Forensics** | Collect, preserve, examine and analyse digital evidence |
| **Incident Response** | Handle an attack from detection to recovery and learning |
| **Logs** | The digital footprints that feed detection and investigation |

> **Security relevance:** every discipline leans on the same evidence — **logs** — and the same discipline of **chain of custody / preservation** so findings hold up technically and legally.

---

## SOC Quick Reference

A **Security Operations Center (SOC)** rests on three pillars — **People + Process + Technology** — and delivers two core capabilities: **Detection** and **Response**.

| Concept | Key fact |
|--------|----------|
| **Detection areas** | Vulnerabilities, Unauthorized activity, Policy violations, Intrusions |
| **Roles** | CISO → SOC Manager → L1 (triage) → L2 (investigate) → L3 (hunt/forensics) |
| **Triage** | The 5 Ws — Who, What, When, Where, Why |
| **FP vs TP** | False positive = benign flagged; true positive = real malicious activity |
| **Tools** | SIEM (correlate), EDR (endpoint), IDS (detect), IPS (prevent), XDR, SOAR (automate) |

> **Security relevance:** a SIEM's power is **correlation** — one failed login is noise, but `many failed logins → success → new device → unusual location` is a potential account compromise.

---

## Digital Forensics Quick Reference

**Digital forensics** collects and analyses **digital evidence** using the **NIST** methodology, always preserving the original.

| Concept | Key fact |
|--------|----------|
| **NIST phases** | Collection → Examination → Analysis → Reporting (`C → E → A → R`) |
| **Examination vs Analysis** | Examination extracts/filters relevant data; Analysis correlates it to conclude |
| **Chain of custody** | Records description, individuals, date/time, storage location, access times |
| **Write blocker** | Prevents writes to a device while allowing read/acquire — protects integrity |
| **Order of volatility** | CPU/registers → RAM → network state → temp → disk → archival |
| **Tools** | FTK Imager (acquire), Autopsy (analyse), DumpIt (RAM), Volatility (memory) |

Command-line triage extracts leads from a single file:

```bash
$ file evidence
$ sha256sum evidence
$ exiftool evidence
$ pdfinfo evidence.pdf
$ strings evidence | grep -Ei "flag|password|http"
```

> **Security relevance:** metadata is a **lead, not proof** — corroborate it, and never modify the original evidence.

---

## Incident Response Quick Reference

**Incident Response (IR)** turns a stressful attack into a repeatable workflow. The two most-referenced frameworks share the same objectives:

| Framework | Phases |
|-----------|--------|
| **SANS PICERL** | Preparation → Identification → Containment → Eradication → Recovery → Lessons Learned |
| **NIST** | Preparation → Detection & Analysis → Containment/Eradication/Recovery → Post-Incident Activity |

The crucial distinction both preserve:

`Containment = STOP / LIMIT` · `Eradication = REMOVE threat + root cause` · `Recovery = RESTORE + validate`

| Concept | Key fact |
|--------|----------|
| **Event → Incident** | `Event → Log → Tool → Alert → Investigate → FP (discard) / TP (incident)` |
| **Incident types** | Malware, Security Breach, Data Leak, Insider Attack, DoS/DDoS (**MB LID**) |
| **Docs** | IR Plan (strategy) → Playbook (per incident type) → Runbook (technical steps) |
| **IOC vs IOA** | IOC = evidence of compromise; IOA = evidence of attack behaviour |
| **Metrics** | MTTD = Mean Time to Detect; MTTR = Mean Time to Respond/Recover |

> **Security relevance:** deleting the malware is not enough — investigate **initial access, persistence, credentials, lateral movement and root cause**, or the attacker returns.

---

## Logs Quick Reference

**Logs are the digital footprints of a system** — the evidence every other discipline depends on. They split into six types (**S S A A N A**): **System, Security, Application, Audit, Network, Access**.

### Windows Event IDs

| Event ID | Meaning |
|---:|---|
| **4624** | Successful logon |
| **4625** | Failed logon |
| **4634** | Logoff |
| **4720** | Account created |
| **4722** | Account enabled |
| **4724** | Password reset attempt |
| **4725** | Account disabled |
| **4726** | Account deleted |

Investigate via **Event Viewer** → `Windows Logs → Security → Filter Current Log → Event ID`.

### Linux log analysis

Apache access logs live at `/var/log/apache2/access.log` (fields: IP, timestamp, method, URL, status, User-Agent). Filter with `grep`, chain with the pipe, page large files with `less`:

```bash
$ grep "172.16.0.1" access.log | grep "POST" | grep "/contact"
$ less access.log
$ cat access.log access.log.1 access.log.2 > combined.log
```

> **Security relevance:** check **rotated logs** for historical activity, order events into a **timeline**, and **correlate** multiple sources — one event may be meaningless, but several related events tell the story.

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **Blue team** | Defensive security — reactive (IR) and proactive (hardening/monitoring). |
| **SOC** | People + Process + Technology; Detection + Response; L1→L2→L3; the 5 Ws. |
| **SIEM** | Centralizes and **correlates** logs into meaningful alerts. |
| **Forensics** | NIST `Collection → Examination → Analysis → Reporting`; preserve originals; chain of custody; write blocker. |
| **Order of volatility** | RAM before disk — capture the most volatile evidence first. |
| **IR frameworks** | SANS PICERL and NIST — Contain (stop), Eradicate (remove), Recover (restore). |
| **Incident types** | Malware, Breach, Data Leak, Insider, DoS/DDoS (MB LID). |
| **IOC vs IOA** | Evidence of compromise vs evidence of attack behaviour. |
| **Logs** | Six types (S S A A N A); the evidence behind detection and investigation. |
| **Windows Event IDs** | 4624 logon, 4625 failed, 4720 created, 4724 password reset. |
| **Linux tooling** | `cat`, `less`, `grep`, and the pipe `\|` to filter logs down to the answer. |

**Key idea:** defensive security is one connected workflow — a **SOC** detects on **logs**, **incident response** handles what's confirmed, and **digital forensics** preserves and explains the evidence — all driven by the discipline of *investigate, correlate, scope, then respond*.

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What are the three pillars of a SOC?** | People, Process, and Technology. |
| **Q2. What is the NIST digital forensics methodology?** | Collection → Examination → Analysis → Reporting; Examination extracts relevant data and Analysis correlates it to draw conclusions. |
| **Q3. What is the difference between containment, eradication, and recovery?** | Containment stops/limits the attack, eradication removes the threat and its root cause, and recovery restores and validates systems. |
| **Q4. What are the six main types of logs?** | System, Security, Application, Audit, Network, and Access logs. |
| **Q5. What Windows Event ID indicates a successful logon, and which indicates account creation?** | 4624 is a successful logon; 4720 is a user account creation. |
| **Q6. Why is log correlation important?** | A single event may be meaningless, but correlating multiple log sources reconstructs the full sequence of an incident. |

## Final Takeaway

The Mystery Chest is your one-page memory aid for the **Defensive Security module**. Skim it before any lab, exam, or interview: a **SOC** built on **People, Process and Technology** runs continuous **detection and response**; **digital forensics** follows the **NIST** methodology (`Collection → Examination → Analysis → Reporting`) while preserving evidence through **chain of custody**, **write blockers** and the **order of volatility**; **incident response** handles a confirmed incident through the **SANS PICERL** and **NIST** lifecycles, always separating **containment**, **eradication** and **recovery**; and **logs** — the six types **System, Security, Application, Audit, Network, Access** — are the digital footprints that feed it all, read through **Windows Event IDs** and Linux `grep`/`less` filtering. Across every room the discipline is identical: *suspicious is not malicious*, an alert is the start of an investigation, and the real work is to **investigate, correlate, determine scope, and respond** — then learn and improve for the next attack.

---
*Bonus revision room authored for the Cyber Security 101 Defensive Security module — consolidating the SOC, Digital Forensics, Incident Response and Logs Fundamentals rooms.*
