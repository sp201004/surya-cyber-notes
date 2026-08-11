| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Security Solutions / SIEM |
| **Difficulty** | Easy |
| **Time** | ~30 Minutes |
| **Module** | Security Solutions |

---

## Objective

A **SIEM (Security Information and Event Management)** is a centralized security platform used by security teams — especially **SOC (Security Operations Center) analysts** — to **collect, centralize, normalize, correlate, and analyze** security logs from many different devices and systems. Instead of an analyst manually connecting to every machine to read logs, a SIEM brings the relevant information into **one place**, detects suspicious activity using **detection rules**, generates **alerts**, and helps analysts investigate. This room builds the concept from the ground up: what a SIEM is and why scattered logs are hard to use, the difference between **host-centric** and **network-centric** log sources, the five core SIEM **features**, how logs are **ingested** (Agent, Syslog, Manual Upload, Port Forwarding), how **detection rules** turn events into alerts, the difference between a **true positive** and a **false positive**, the log sources analysts investigate, and a hands-on **lab** investigating a suspicious `cudominer.exe` process.

By the end of this room you will be able to:

- Explain what a **SIEM** is and expand the acronym — **Security Information and Event Management**
- Describe why isolated logs are difficult to use: **numerous sources, no centralization, limited context, limited analysis, format issues**
- Distinguish **host-centric** logs (activity *on* a machine) from **network-centric** logs (activity *through* the network)
- Identify the five core SIEM features: **Centralized Log Collection, Normalization, Correlation, Real-Time Alerting, Dashboards & Reporting**
- Compare the log **ingestion** methods — **Agent/Forwarder, Syslog, Manual Upload, Port Forwarding** — and the Syslog ports `514` / `6514`
- Understand how a **detection rule** matches events to generate an **alert**, and why `ALERT ≠ CONFIRMED ATTACK`
- Distinguish a **true positive** from a **false positive**, and explain **alert fatigue** and **rule tuning**
- Read the key **Windows Event IDs** and **Linux log files** a SIEM ingests
- Investigate a realistic alert using the **5W + 1H** method and decide **True Positive vs False Positive**

> **Analyst mindset:** *A SIEM alert is the beginning of an investigation, not proof of compromise.* Don't ask only *"Why did I get this alert?"* — ask *what* happened, *who* did it, *where*, *when*, *how*, and whether it is **actually malicious**.

---

## Task 1 — What Is SIEM?

**SIEM** stands for **Security Information and Event Management**. It is a security solution/platform that centralizes security data so that instead of checking logs on every individual machine, an analyst works from **one centralized platform**.

At its simplest, the SIEM pipeline is a loop:

`Collect Logs → Normalize → Correlate → Detect → Alert → Investigate → Respond`

### Why Is SIEM Important?

Modern organizations have many devices — Windows machines, Linux machines, servers, firewalls, routers, web servers, VPN gateways — and every one continuously generates security-related information: **login attempts, file access, process execution, network connections, authentication events, firewall events, malware detections, web requests, system errors**. A SIEM helps analysts make sense of this large volume of data.

```text
                    ┌─────────────────┐
                    │    INTERNET     │
                    └────────┬────────┘
                             │
                       ┌─────▼─────┐
                       │  NETWORK  │
                       └─────┬─────┘
                             │
        ┌────────────────────┼────────────────────┐
   ┌────▼────┐          ┌────▼─────┐        ┌────▼────┐
   │ Windows │          │ Linux    │        │ Servers │
   │ Machines│          │ Machines │        │         │
   └────┬────┘          └────┬─────┘        └────┬────┘
        └────────────────────┼────────────────────┘
                       ┌─────▼─────┐
                       │   SIEM    │
                       └─────┬─────┘
                       ┌─────▼─────┐
                       │ SOC       │
                       │ Analysts  │
                       └───────────┘
```

### SIEM and the SOC

A **SOC (Security Operations Center)** is responsible for continuously monitoring and responding to security events. SIEM is one of the **core technologies used by SOC analysts**. The simplified SOC workflow:

`Log Sources → SIEM → Correlation → Detection → Alert → SOC Analyst → Investigation → (False Positive → Close/Tune) or (True Positive → Respond/Contain)`

### Example — Correlating an Attack

An attacker compromises an employee account. Different systems each record a fragment:

`VPN Log: Successful VPN Login → Windows Log: Suspicious Process Execution → File Server Log: Sensitive File Access → Network Log: Outbound Connection`

Individually these events may look normal. Correlated together they become **Potential Data Exfiltration** — which is exactly the visibility a SIEM provides.

### Important Terminology

| Term | Meaning |
|---|---|
| **SIEM** | Security Information and Event Management |
| **SOC** | Security Operations Center |
| **Log** | Recorded information about an event/activity |
| **Log Source** | Device/system that generates logs |
| **Event** | An activity recorded in a log |
| **Alert** | Notification generated when suspicious conditions are detected |
| **Detection Rule** | Logic used to identify suspicious activity |
| **Correlation** | Connecting events from different sources |
| **Normalization** | Converting different log formats into a consistent structure |
| **Investigation** | Analyzing an alert/event to determine what happened |

> **Memory trick:** `CNCD-AIR` = **C**ollect → **N**ormalize → **C**orrelate → **D**etect → **A**lert → **I**nvestigate → **R**espond.

### Task 1 — Answer

| Question | Answer |
|---|---|
| **What does SIEM stand for?** | Security Information and Event Management system |

### Interview Questions — SIEM Basics

| Question | Answer |
|---|---|
| **Q1. What is SIEM?** | SIEM stands for Security Information and Event Management. It is a security platform that collects logs from different sources, normalizes and correlates them, detects suspicious activities using rules, generates alerts, and helps security analysts investigate incidents. |
| **Q2. Why do organizations use SIEM?** | To centralize security logs, correlate events from multiple sources, detect suspicious activity, generate alerts, and provide better visibility for SOC analysts. |
| **Q3. What is the role of SIEM in a SOC?** | It provides the SOC with centralized visibility into security events — collecting and analyzing logs, detecting suspicious behavior, generating alerts, and helping analysts investigate and respond to incidents. |

---

## Task 2 — Logs Everywhere, Answers Nowhere

In a modern network many devices communicate with each other and the Internet, and every one continuously generates logs. A **log source** is a device, application, or system that generates logs about activities occurring on it or through it (e.g. `Windows Machine → Windows Event Logs`, `Linux Machine → Linux System Logs`, `Web Server → Web Access Logs`, `Firewall → Firewall Logs`, `Router → Network Logs`, `IDS/IPS → Security Alerts`).

Logs help teams **investigate incidents, identify suspicious activity, troubleshoot systems, track user activity, detect unauthorized access, understand attacker behaviour, and build a timeline**.

### Two Categories of Log Source

Log sources split into two major categories: **Host-Centric** and **Network-Centric**.

> **1. Host-Centric Log Sources**
> Capture events that occur *within or related to a particular host/system* (Windows, Linux, servers, endpoints, workstations). Common activities: **file access, authentication attempts, process execution, registry modification, PowerShell execution, system events, application events**.
> **Memory trick:** *Host-Centric = What happened ON the machine?*

> **2. Network-Centric Log Sources**
> Generated when systems communicate with each other or external networks. Common devices: **firewall, IDS, IPS, router, VPN gateway, network monitoring devices**. Common activities: **SSH connections, FTP activity, web traffic, VPN activity, network file sharing, firewall activity, IDS/IPS events**.
> **Memory trick:** *Network-Centric = What happened THROUGH the network?*

### Host-Centric vs Network-Centric

| Host-Centric | Network-Centric |
|---|---|
| Activity on a system | Activity across/through network |
| File access | SSH connection |
| Authentication attempt | VPN activity |
| Process execution | Web traffic |
| Registry modification | FTP activity |
| PowerShell execution | Network file sharing |
| Windows/Linux events | Firewall/IDS/IPS events |

> **Easy rule:** `ON THE HOST → Host-Centric` · `OVER THE NETWORK → Network-Centric`. Registry, Process, File → Host. SSH, VPN, FTP, Web → Network.

### Why Having Logs Is Not Enough

Having logs does **not** automatically make investigation easy. Organizations may have hundreds or thousands of log sources, which creates five key challenges — authored here as concept cards:

> **1. Numerous Log Sources**
> Many devices (e.g. 100 Windows machines, 50 Linux machines, 10 firewalls, 5 web servers, routers, VPN, IDS/IPS, applications), each generating hundreds or thousands of events. Analysts may have to check each device individually — extremely time-consuming.

> **2. No Centralization**
> Logs usually remain on the systems that generated them. To investigate, an analyst must connect to each system separately (`SSH → Linux`, `RDP → Windows`, login → firewall/web server/VPN). This is inefficient.

> **3. Limited Context**
> A single log often does not tell the whole story. *"User accessed sensitive.docx"* looks normal alone — but combined with `VPN login from unusual IP → File Access → PowerShell → Outbound Connection` it becomes suspicious. **Individual logs provide limited context; correlating multiple logs provides the bigger picture.**

> **4. Limited Analysis**
> Networks can generate thousands of events per second — millions per day. A human cannot realistically inspect every event manually, so events can be missed.

> **5. Format Issues**
> Different systems use different formats — Windows Event Log, Linux `syslog`/`auth.log`/`kern.log`, Apache access log, firewall-specific formats. Different structures make analysis harder.

SIEM directly addresses all five: `Multiple Log Sources → SIEM → Collect / Normalize / Correlate → Detection → Alerts → Investigation`.

### Task 2 — Answers

| Question | Answer |
|---|---|
| **Q1. Is Registry-related activity host-centric or network-centric?** | host-centric |
| **Q2. Is VPN-related activity host-centric or network-centric?** | network-centric |

> Registry modifications happen *inside* the host operating system → **host-centric**. VPN activity involves communication between the user and a network → **network-centric**.

---

## Task 3 — Why SIEM?

Manually analyzing logs across many sources creates the five problems above (numerous sources + no centralization + limited context + limited analysis + different formats → difficult security investigation). **SIEM** solves them by acting as a centralized security platform that **collects, normalizes, correlates, and analyzes** logs to detect and investigate threats.

The room represents the SIEM process as four major stages, expanding into a full pipeline:

`1. Collect Data from Sources → 2. Aggregate Data → 3. Discover & Detect Threats → 4. Identify Breaches & Investigate`

Full pipeline: `Log Sources → Collection → Aggregation → Normalization → Correlation → Detection → Alert → Investigation`.

### The Five Core SIEM Features

> **1. Centralized Log Collection**
> Instead of logs scattered across individual systems, the SIEM collects them into one central location (Windows, Linux, firewall, VPN, web server, IDS/IPS, applications → SIEM). The analyst no longer connects to each machine individually, which significantly improves visibility. Collection methods (covered in Task 4) include **Agent/Forwarder, Syslog, Manual Upload, Port Forwarding**.

> **2. Normalization of Logs**
> Different systems produce different formats (Windows Event Log ≠ Linux syslog ≠ Apache access log ≠ firewall log). **Normalization** converts them into a consistent structure with common fields — **Timestamp, Source IP, Destination IP, Username, Event Type, Action, Status, Hostname, Process** — so events can be searched, compared, and correlated.
> **Memory trick:** *Normalization = Different log languages → One common language.*

> **3. Correlation of Logs**
> A single event may not reveal malicious activity, but the SIEM can connect events from multiple sources. Example within 5 minutes: `Unusual VPN Login + Sensitive File Access + PowerShell Execution + Outbound Connection = Potential Data Exfiltration`. Attackers rarely perform one action — correlation reveals the overall attack pattern (`Initial Access → Execution → Privilege Escalation → Discovery → Collection → Exfiltration`).

> **4. Real-Time Alerting**
> The SIEM evaluates events against **detection rules**; when a rule's conditions are met, an alert is generated. Example rule: *IF 5 failed login attempts within 10 seconds THEN alert "Multiple Failed Login Attempts."* Other examples: successful login after multiple failures, restricted USB usage, large outbound traffic (> 25 MB → *Potential Data Exfiltration Attempt*). Thresholds depend on the organization's security policy.

> **5. Dashboards & Reporting**
> Instead of reading thousands of raw logs, analysts view summarized information visually — **Alert Highlights, System Notifications, Health Alerts, Failed Login Attempts, Events Ingested Count, Rules Triggered, Top Domains Visited** — turning raw data into actionable visibility.

### SIEM vs Manual Log Analysis

| Manual Analysis | SIEM |
|---|---|
| Logs scattered across systems | Centralized logs |
| Analyst checks machines individually | Single platform |
| Different formats | Normalized data |
| Difficult correlation | Automatic correlation |
| Manual searching | Detection rules |
| Difficult real-time detection | Real-time alerts |
| Raw logs | Dashboards & reports |

> **Key idea:** A SIEM does **not** simply store logs — its value comes from turning raw data into useful security information: `Raw Logs → Collection → Normalization → Correlation → Detection → Alert → Investigation → Security Decision`.

### Interview Questions — Why SIEM

| Question | Answer |
|---|---|
| **Q1. What is SIEM?** | A security platform that centrally collects, normalizes, correlates, and analyzes logs from multiple sources to detect threats and generate alerts. |
| **Q2. Why is log normalization required?** | Different devices generate logs in different formats. Normalization converts them into a consistent structure so they can be searched, compared, and correlated easily. |
| **Q3. What is log correlation?** | The process of connecting events from different log sources to identify relationships and detect suspicious activity that may not be obvious from a single event. |
| **Q4. Why is centralized logging useful?** | It gives analysts a single location to investigate logs from multiple systems instead of connecting to each system individually. |
| **Q5. How does SIEM detect threats?** | It uses detection rules that evaluate normalized and correlated events; when the rule conditions are satisfied, an alert is generated. |
| **Q6. What is real-time alerting?** | The SIEM generates an alert as soon as events satisfy the conditions of a configured detection rule. |

---

## Task 4 — Log Sources & Log Ingestion

**Log ingestion** is the process of collecting logs from different sources and sending them into a SIEM for analysis — in short, *getting logs from their source into the SIEM*. The flow: `Log Source → Log Generated → Collection → Ingestion → SIEM → Normalization → Correlation → Detection → Alert`.

### Where Logs Come From

A SIEM can receive logs from **Windows** (Event Logs), **Linux** (syslog), **network devices** (firewall, router, VPN), plus **web servers, applications, databases, cloud services, IDS/IPS, endpoint security tools, and authentication systems**.

- **Windows** — Security, System, Application, PowerShell, and Windows Defender logs (successful/failed login, account creation/modification, process execution, privilege activity).
- **Linux** — files under `/var/log/` such as `/var/log/auth.log`, `/var/log/syslog`, `/var/log/kern.log` (SSH login, auth failure, system/kernel/service events).
- **Network Devices** — firewall, router, switch, VPN, IDS, IPS (connections, blocked/allowed traffic, authentication, network attacks, policy violations).
- **Web Servers** — Apache `access.log`/`error.log` (IP, timestamp, HTTP method, URL, status code, user-agent).
- **Applications / Databases** — login attempts, errors, database queries, API requests, user actions.
- **Cloud** — authentication, API calls, resource creation, configuration changes, network activity, administrative actions.

### The Four Ingestion Methods

> **1. Agent / Forwarder**
> A **log agent** is software installed on a host that collects local logs and forwards them to the SIEM (`Local Logs → Agent → SIEM`). An agent can **collect, filter, parse, forward, and secure transmission**, providing more control over what is sent. Commonly preferred for Windows/Linux endpoints.

> **2. Syslog**
> A common standard/mechanism for sending and managing log messages, widely used by Linux systems and network devices (firewalls, routers, security appliances): `Log Source → Syslog → Syslog Server → SIEM`.

> **3. Manual Upload**
> Uploading existing log files directly into the SIEM (`access.log → Manual Upload → SIEM`). Useful when logs already exist as files, a system is not connected to the SIEM, historical logs need analysis, or in a lab/CTF. **Not ideal for continuous monitoring** because it requires human intervention and gives no real-time visibility.

> **4. Port Forwarding**
> Logs are sent over a network connection to a listening service/collector (`Log Source → Network Connection → Listening Port → SIEM/Collector`). Network devices may be configured to send logs to a collector listening on a specific port.

### Syslog Ports

| Port | Use |
|---|---|
| **UDP 514** | Traditional Syslog |
| **TCP 514** | Syslog over TCP |
| **TCP 6514** | Syslog over TLS (secure) |

### Ingestion Methods Comparison

| Method | How It Works | Typical Use |
|---|---|---|
| **Agent / Forwarder** | Software collects and forwards local logs | Windows/Linux hosts |
| **Syslog** | Devices send log messages over network | Firewalls/routers/Linux |
| **Manual Upload** | Analyst uploads existing log files | Historical/lab analysis |
| **Port Forwarding** | Network traffic is redirected to collector | Network-based ingestion |

### Collection vs Ingestion & Secure Transmission

**Collection** = getting logs from the source; **Ingestion** = bringing those collected logs into the SIEM for processing (`Collect → Ingest → Process → Analyze`). Because logs contain sensitive data (usernames, IPs, authentication events, system info), secure transmission matters — **encryption, authentication, TLS, access control, integrity protection**. Centralized logging also preserves evidence: if an attacker compromises a server and deletes local logs, logs already forwarded to a remote SIEM remain available.

> **Memory trick:** `ASMP` = **A**gent, **S**yslog, **M**anual, **P**ort. A SIEM is only useful when it receives the right data — **log ingestion is the bridge between individual log sources and centralized monitoring.**

### Interview Questions — Log Ingestion

| Question | Answer |
|---|---|
| **Q1. What is log ingestion?** | The process of bringing logs from different sources into a centralized system such as a SIEM for processing and analysis. |
| **Q2. What is a log agent?** | Software installed on a system that collects local logs and forwards them to a centralized logging or SIEM platform. |
| **Q3. What is Syslog?** | A commonly used standard/mechanism for transporting log messages, especially from Linux systems and network devices such as firewalls and routers. |
| **Q4. What are common Syslog ports?** | `UDP 514` and `TCP 514`; for Syslog over TLS, `TCP 6514`. |
| **Q5. What is the disadvantage of manual log upload?** | It requires human intervention and is generally unsuitable for continuous real-time monitoring. |
| **Q6. Why is centralized log collection useful?** | It provides a single location for investigation and can preserve log evidence even if an attacker deletes logs from a compromised endpoint. |

---

## Task 5 — Detection Rules, Alerts & Security Monitoring

Simply collecting logs is not enough — the SIEM must determine whether activity is normal or suspicious. That is the job of **detection rules**.

A **detection rule** is a predefined condition/logic used by a SIEM to identify potentially suspicious activity: `Event → Check Rule → Condition Matched? → YES → Alert · NO → No Alert`. In short, it tells the SIEM *what activity should be considered suspicious enough to investigate*.

### Rules Can Combine Conditions

A simple rule may fire on a single threshold (`IF failed logins >= 5 THEN alert`). A stronger rule combines conditions — e.g. `IF 5 failed logins AND 1 successful login within 5 minutes THEN alert`, which may indicate `Repeated Authentication Failures → Successful Login → Potential Compromise`. Correlating five failed logins (`4625`) followed by a success (`4624`) is far more interesting than any single event.

### Alert vs Event

| Concept | Meaning |
|---|---|
| **Event** | Something recorded in a log (e.g. *"User logged in successfully"*) — *something happened*. |
| **Alert** | A notification generated when a rule determines one or more events need attention — *something may need investigation*. |

> **Important:** `ALERT ≠ CONFIRMED ATTACK`. An alert only means a configured detection condition was triggered; the analyst must determine whether the activity is actually malicious.

### Rule Matching Example

A rule with keyword `miner` inspects a process-start event for `cudominer.exe`. Because `cudominer.exe` *contains* the string `miner`, the condition is satisfied: `Rule "miner" → cudominer.exe → String Match → Rule Triggered → 🚨 Alert`. Detection rules can match on **IP addresses, domains, URLs, usernames, process names, file names, event IDs, ports, commands, hashes, and patterns**.

### True Positive vs False Positive

- **True Positive (TP)** — the alert correctly identifies actual suspicious/malicious activity (e.g. `cudominer.exe` is confirmed to be unauthorized cryptocurrency-mining software).
- **False Positive (FP)** — the alert fires but investigation shows the activity is legitimate (e.g. a "Suspicious PowerShell" alert turns out to be an approved administrator script).

> **Memory trick:** `TP → Alert was right` · `FP → Alert was wrong`.

### Alert Fatigue, Tuning & Severity

Too many low-value alerts (e.g. 1000 alerts, 900 false positives, 100 real events) cause **alert fatigue → analyst overload → important alerts missed**. Good **detection engineering** tunes rules to reduce noise while keeping useful coverage:

| Rule quality | Example |
|---|---|
| **Bad (noisy)** | `IF any PowerShell execution occurs THEN alert` — too many benign alerts. |
| **Better (context-rich)** | `IF PowerShell executes AND encoded command detected AND unusual parent process THEN alert (HIGH severity)`. |

Alerts carry severity levels — **Low, Medium, High, Critical** — depending on **threat, impact, confidence, asset importance, and context** (e.g. single failed login → Low/Medium; suspicious admin account → High; confirmed malware execution → Critical). A good rule is **relevant, specific, actionable, understandable, testable, and maintainable**.

> **Detection formula:** `EVENT + CONDITION + CONTEXT = DETECTION` → `Rule Match → Alert`.

### Interview Questions — Detection & Alerts

| Question | Answer |
|---|---|
| **Q1. What is a detection rule?** | Logic configured in a security platform to identify events or patterns that may indicate suspicious or malicious activity. |
| **Q2. What is an alert?** | A notification generated when a detection rule's conditions are satisfied. |
| **Q3. Is every alert malicious?** | No. Alerts can be true positives or false positives and must be investigated. |
| **Q4. What is a True Positive?** | When an alert correctly identifies actual suspicious or malicious activity. |
| **Q5. What is a False Positive?** | When an alert is generated for activity that is ultimately determined to be legitimate. |
| **Q6. What is alert fatigue?** | When analysts receive excessive alerts, especially low-value or false-positive alerts, making it harder to focus on important threats. |
| **Q7. Why should detection rules be tuned?** | To reduce false positives and alert noise while maintaining useful detection coverage. |
| **Q8. What is alert triage?** | The initial assessment and prioritization of an alert to determine its severity, relevance, and required response. |

---

## Task 6 — Log Sources in Detail

A SIEM is only as useful as the data it receives, and different sources answer different questions. Think of each log source as a different camera: the Windows log is the camera of the host, the firewall log the camera of the network, the web log the camera of the application, and the VPN log the camera of remote access. Combining them gives more visibility and a better investigation.

### Windows Event IDs

| Event ID | Meaning |
|---|---|
| **4624** | Successful Logon |
| **4625** | Failed Logon |
| **4634** | Logoff |
| **4720** | User Account Created |
| **4722** | User Account Enabled |
| **4724** | Password Reset Attempt |
| **4725** | User Account Disabled |
| **4726** | User Account Deleted |

For example, `Event ID 4720 → Account: hacked, Creator: Administrator` means an administrator created an account named `hacked` — prompting questions: was it expected, why, when, was it enabled, did it log in, and what did it do afterward?

### Linux Logs

Linux stores logs under `/var/log/`. Key files:

| File | Contains |
|---|---|
| `/var/log/auth.log` | Authentication activity — SSH login, failed/successful authentication, privilege activity |
| `/var/log/syslog` | General system activity — services, system/network events, warnings, errors |
| `/var/log/kern.log` | Kernel messages — hardware events, drivers, system-level errors |

A sequence of `Failed password → Failed password → Failed password → Accepted password` may indicate brute force, password guessing, or a legitimate user — the sequence alone is not enough to confirm malicious activity.

### Web Server Logs

Apache commonly logs to `/var/log/apache2/access.log`. Useful fields: **Source IP, Timestamp, HTTP Method, URL, Status Code, User-Agent** (e.g. `172.16.0.1 GET /contact 200 Mozilla/5.0`).

| HTTP Method | Purpose | Status Code | Meaning |
|---|---|---|---|
| **GET** | Retrieve a resource (`GET /login`) | **200** | OK |
| **POST** | Submit data (`POST /login`) | **301 / 302** | Moved Permanently / Redirect |
| | | **400 / 401 / 403** | Bad Request / Unauthorized / Forbidden |
| | | **404 / 500** | Not Found / Internal Server Error |

To investigate a suspicious IP in a web log, filter it down (commands shown in the room; no output was displayed, so none is invented):

```bash
$ grep "172.16.0.1" access.log
$ grep "172.16.0.1" access.log | grep "POST"
```

### Other Log Sources

- **Firewall** — Source/Destination IP, Source/Destination Port, Protocol, Action (`ALLOW`, `DENY`, `DROP`, `REJECT`), Timestamp. Answers *who initiated, where it connected, which port/protocol, when, and whether it was allowed or blocked*.
- **VPN** — Username, Source IP, Timestamp, Login Success/Failure, Connection Duration. Useful for detecting unusual remote access (e.g. `chris` normally connects from India but suddenly logs in from an unexpected location).
- **Application** — user actions, login, API requests, file uploads, transactions, errors, configuration changes.
- **Database** — authentication, queries, data access, administrative actions, schema changes, errors — important for investigating unauthorized data access.
- **IDS/IPS** — IDS detects suspicious network traffic; IPS detects and can block it. Their alerts feed the SIEM.
- **Endpoint Security** — malware detection, process execution, file activity, network connections, threat detection, quarantine events.
- **Cloud** — authentication, API calls, resource creation, configuration changes, network activity, administrative actions.

### Log Source Comparison

| Log Source | Useful Information |
|---|---|
| Windows | Authentication, processes, accounts |
| Linux | Authentication, system activity |
| Web Server | HTTP requests, URLs, status |
| Firewall | Network connections, allowed/blocked traffic |
| VPN | Remote access and authentication |
| Application | User/application actions |
| Database | Queries and database access |
| IDS/IPS | Network threat detection |
| Endpoint Security | Malware/process/file activity |
| Cloud | API, identity, resource activity |

> **The power of context:** `PowerShell executed` alone could be normal; `PowerShell + Unknown User + Unusual Time + Encoded Command + External Connection` is highly suspicious. A strong investigation rarely depends on a single source — it combines **host, network, application, authentication, and security-tool logs** to reconstruct what happened.

### Interview Questions — Log Sources

| Question | Answer |
|---|---|
| **Q1. Why are multiple log sources required?** | Different sources provide different visibility. Correlating them helps analysts understand the complete sequence and context of an incident. |
| **Q2. What can Windows logs tell you?** | Information about authentication, account activity, processes, system events, and other host-level activities. |
| **Q3. What can firewall logs tell you?** | Network connections, source and destination information, ports, protocols, and whether traffic was allowed or blocked. |
| **Q4. Why are VPN logs useful?** | They provide visibility into remote access — usernames, source IPs, authentication results, and connection times. |
| **Q5. Why are application logs important?** | They provide application-specific context (user actions, API requests, transactions, errors) that may not appear in operating-system logs. |
| **Q6. Why correlate endpoint and network logs?** | Endpoint logs show what happened on a host; network logs show communications. Correlating them connects local activity with network behaviour. |

---

## Task 7 — Practical SIEM Lab Investigation

The lab applies every earlier concept to a real security event. The SIEM raised an alert for a suspicious process, with these facts:

```text
┌─────────────────────────────────────┐
│          SIEM ALERT                 │
├─────────────────────────────────────┤
│ Host:       HR_02                   │
│ User:       chris                   │
│ Process:    cudominer.exe           │
│ Rule:       miner                   │
│ Status:     Rule Matched            │
└─────────────────────────────────────┘
```

The detection rule `miner` matched because `cudominer.exe` *contains* the string `miner`. The `.exe` extension indicates a Windows executable and the name (`cudo` + `miner`) strongly suggests cryptocurrency-mining software — but **a process name alone is not enough to prove malicious activity**, so the analyst investigates the surrounding context step by step:

| **1** | **Read the alert**<br>Review the alert name, rule, host, user, timestamp, process, and severity to understand *what* triggered it — do not react immediately. |
| --- | --- |

| **2** | **Identify the host**<br>The affected host is `HR_02`. Ask: what type of machine is it, who normally uses it, is it a critical asset, and what other events occurred on it? |
| --- | --- |

| **3** | **Identify the user**<br>The associated user is `chris`. Ask: was Chris logged in, was he expected to use `HR_02`, and what other activity did the account perform? |
| --- | --- |

| **4** | **Identify the process**<br>Investigate `cudominer.exe`: where is the executable located, who launched it, when did it start, what parent process launched it, and was it installed recently? |
| --- | --- |

| **5** | **Search related events**<br>Do not investigate in isolation — look for authentication, process, file, network, DNS, endpoint-security events and other SIEM alerts around the same time. |
| --- | --- |

| **6** | **Correlate**<br>`Chris logs in → cudominer.exe starts → high CPU usage → external network connection → mining-related domain` builds far stronger evidence than any single event. |
| --- | --- |

| **7** | **Build a timeline**<br>Reconstruct the sequence (login → executable appears → process starts → rule matches → alert) to see what happened *before and after* the alert. |
| --- | --- |

| **8** | **Determine TP or FP**<br>Confirmed unauthorized miner → **True Positive → respond**. Approved/authorized software → **False Positive → close/tune the rule**. |
| --- | --- |

### Lab Findings

| Field | Finding |
|---|---|
| Host | `HR_02` |
| User | `chris` |
| Process | `cudominer.exe` |
| Detection Rule | `miner` |
| Detection Type | Process/keyword-based detection |
| Result | Rule matched |
| Investigation Goal | Determine whether activity is legitimate or malicious |

### Room Flag

```text
THM{000_SIEM_INTRO}
```

> **Do not rely on filename alone:** a name like `cudominer.exe` can be renamed, spoofed, or mimicked. Combine **filename + path + hash + parent process + user + network activity** for higher confidence. `Simple → IF process contains "miner" THEN alert` · `Advanced → process + user + host + network + file reputation + historical behaviour + threat intel = high-confidence detection`.

### Interview Questions — Practical Investigation

| Question | Answer |
|---|---|
| **Q1. What is the purpose of a SIEM alert?** | It informs a security analyst that a detection rule has identified potentially suspicious activity that requires investigation. |
| **Q2. Does an alert always mean an attack occurred?** | No. An alert may be a true positive or false positive and must be investigated. |
| **Q3. What information should you check when investigating a suspicious process?** | The process name, host, user, timestamp, path, parent process, network connections, file information, and related security events. |
| **Q4. Why is correlation important?** | It combines events from multiple sources to provide context and reveal activity that may not be suspicious when viewed individually. |
| **Q5. What triggered the lab alert?** | The detection rule `miner` matched the process `cudominer.exe`. |

---

## Task 8 — SIEM Investigation Workflow

A SIEM does not replace the analyst. The SIEM **collects → processes → correlates → detects → generates an alert**; the analyst then **triages → investigates → correlates → decides → responds**. A professional investigation follows a structured order:

`Alert → Triage → Understand Rule → Identify Host → Identify User → Identify Event/Process → Check Timestamp → Search Related Logs → Correlate → Build Timeline → Determine TP/FP → Respond / Close / Tune`

### The 5W + 1H Method

| Question | Focus |
|---|---|
| **WHO?** | Which user/account? |
| **WHAT?** | What happened (event/process)? |
| **WHEN?** | When did it happen (timestamp)? |
| **WHERE?** | Which host/system? |
| **WHY?** | Is there a legitimate explanation? |
| **HOW?** | How did the activity occur (method/sequence)? |

### Process Tree & Context

A process should not be examined alone — the **parent process** provides context. `Word Document → PowerShell → Suspicious Process` is far more concerning than `Administrator → Approved PowerShell Script`. The same event carries different risk in different contexts: `Same Event + Different Context = Different Risk`.

### SIEM Investigation Golden Rules

> **1–4. Start clean**
> Never assume an alert is automatically malicious · understand *why* the rule triggered · identify the host · identify the user.

> **5–8. Dig in**
> Identify the process/event · check timestamps · search related events · correlate multiple log sources.

> **9–12. Conclude**
> Build a timeline · determine True Positive or False Positive · escalate or respond when necessary · tune noisy detection rules.

### Interview Questions — Investigation Workflow

| Question | Answer |
|---|---|
| **Q1. What is the first thing you do after receiving a SIEM alert?** | Review the alert details and understand the detection rule that triggered it, then identify the affected host, user, timestamp, and event before investigating related activity. |
| **Q2. How would you investigate a suspicious process?** | Identify the process, host, user, timestamp, path, parent process, hash, network connections, DNS activity, and related security events, then correlate them to determine whether the activity is malicious. |
| **Q3. Why build a timeline during an investigation?** | It helps reconstruct the sequence of events and understand what happened before, during, and after the detected activity. |
| **Q4. How do you reduce false positives?** | Analyze false-positive alerts, identify legitimate patterns, and tune detection rules by adding relevant conditions, exclusions, or contextual information. |
| **Q5. What is alert triage?** | Quickly validating and prioritizing an alert based on its severity, context, and potential impact. |

---

## Quick Revision

| Topic | Key fact |
|---|---|
| **SIEM** | Security Information and Event Management — a centralized platform that collects, normalizes, correlates, and analyzes logs to detect and investigate threats. |
| **Pipeline** | `Collect → Normalize → Correlate → Detect → Alert → Investigate → Respond` (`CNCD-AIR`). |
| **Log source** | Any system/device/application that generates logs. |
| **Host vs Network** | Host-centric = activity ON the machine (file, login, process, registry, PowerShell); Network-centric = activity THROUGH the network (SSH, FTP, VPN, web, file sharing). |
| **Raw-log problems** | Numerous sources · no centralization · limited context · limited analysis · format issues. |
| **Core features** | Centralized Log Collection · Normalization · Correlation · Real-Time Alerting · Dashboards & Reporting. |
| **Ingestion** | Agent/Forwarder · Syslog · Manual Upload · Port Forwarding (`ASMP`). |
| **Syslog ports** | `UDP 514`, `TCP 514`; TLS = `TCP 6514`. |
| **Detection rule** | Logic that decides which events are suspicious → generates an **alert** (`ALERT ≠ CONFIRMED ATTACK`). |
| **TP vs FP** | True Positive = alert correctly identifies malicious activity; False Positive = benign activity flagged. |
| **Alert fatigue** | Too many (often false-positive) alerts reduce analyst effectiveness → tune rules. |
| **Windows Event IDs** | `4624` logon · `4625` failed logon · `4634` logoff · `4720` account created · `4722` enabled · `4724` password reset · `4725` disabled · `4726` deleted. |
| **Linux logs** | `/var/log/auth.log`, `/var/log/syslog`, `/var/log/kern.log`. |
| **Investigation** | `Alert → Rule → Host → User → Event → Correlation → Timeline → Decision` (5W + 1H). |
| **Lab** | Host `HR_02` · User `chris` · Process `cudominer.exe` · Rule `miner` · Flag `THM{000_SIEM_INTRO}`. |

**Key idea:** A SIEM turns scattered, inconsistent, overwhelming raw logs into useful security intelligence — and an alert is the *start* of an investigation, not the conclusion.

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is SIEM?** | A centralized security platform that collects, normalizes, correlates, and analyzes logs from multiple sources to detect suspicious activity and generate alerts. |
| **Q2. Why is SIEM needed?** | Organizations generate huge volumes of logs from many systems; SIEM centralizes these logs and provides correlation, detection, alerting, and investigation capabilities. |
| **Q3. What does SIEM stand for?** | Security Information and Event Management. |
| **Q4. What is a log source?** | A system, device, or application that generates logs. |
| **Q5. What is the difference between host-centric and network-centric logs?** | Host-centric = activity on a host (file access, login, process, registry, PowerShell); network-centric = activity through the network (SSH, FTP, VPN, web, file sharing). |
| **Q6. What is log ingestion?** | Bringing logs from different sources into a centralized SIEM for processing and analysis. |
| **Q7. What are the log ingestion methods?** | Agent/Forwarder, Syslog, Manual Upload, and Port/Network-based Forwarding. |
| **Q8. What are common Syslog ports?** | `UDP 514` and `TCP 514`; Syslog over TLS uses `TCP 6514`. |
| **Q9. What is normalization?** | Converting logs from different formats into a common structure so they can be searched and correlated effectively. |
| **Q10. What is correlation?** | Connecting related events from multiple sources to identify meaningful patterns or suspicious activity. |
| **Q11. What is a detection rule?** | Logic configured to identify specific events or patterns that may indicate suspicious activity. |
| **Q12. What is an alert?** | A notification generated when a detection rule's conditions are satisfied. |
| **Q13. Does every alert represent an attack?** | No. An alert can be a true positive or false positive and must be investigated. |
| **Q14. What is a True Positive?** | An alert that correctly identifies actual suspicious or malicious activity. |
| **Q15. What is a False Positive?** | An alert generated for activity ultimately determined to be legitimate. |
| **Q16. What is alert fatigue?** | When analysts receive too many alerts, particularly false positives, reducing their ability to focus on important security events. |
| **Q17. Why should detection rules be tuned?** | To reduce false positives and noise while maintaining useful detection coverage. |
| **Q18. How do you investigate a SIEM alert?** | Understand the rule and alert details, identify the host and user, examine the event/process, check timestamps and related logs, correlate activity, build a timeline, and determine whether it is a true or false positive. |
| **Q19. Why are multiple log sources important?** | Different sources provide different visibility; combining host, network, application, authentication, and security-tool logs reconstructs the full incident. |
| **Q20. What was the lab's detection and flag?** | Rule `miner` matched process `cudominer.exe` on host `HR_02` (user `chris`); flag `THM{000_SIEM_INTRO}`. |

---

## Final Takeaway

A **SIEM (Security Information and Event Management)** is a centralized security platform that solves the problem of scattered, inconsistent, and overwhelming logs. It follows a clear pipeline — **Collect → Normalize → Correlate → Detect → Alert → Investigate → Respond** — pulling from both **host-centric** log sources (file access, login, process, registry, PowerShell) and **network-centric** sources (SSH, FTP, VPN, web, firewall, IDS/IPS). Logs reach the SIEM through **ingestion** methods — **Agent/Forwarder, Syslog** (`UDP/TCP 514`, TLS `6514`), **Manual Upload,** and **Port Forwarding** — where **normalization** turns many formats into one common structure and **correlation** links related events into a story. **Detection rules** decide which events matter and raise an **alert**, but `ALERT ≠ CONFIRMED ATTACK`: the analyst must separate a **true positive** from a **false positive**, mindful of **alert fatigue** and the need for **rule tuning**. Using the **5W + 1H** method — and reading **Windows Event IDs** and **Linux logs** — the analyst identifies the host, user, and process, correlates related events, and builds a **timeline**. The practical lab proved the lesson: the rule `miner` matched `cudominer.exe` on host `HR_02` (user `chris`), yielding the flag **`THM{000_SIEM_INTRO}`** — and reinforcing that a SIEM is not a log store but a **detection, alerting, and investigation platform**, where every alert is the beginning of an investigation, not the end.
