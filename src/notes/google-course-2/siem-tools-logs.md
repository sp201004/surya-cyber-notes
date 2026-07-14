## Contents

- [Understanding Logs — Your Eyes on the Network](#understanding-logs--your-eyes-on-the-network)
- [Three Critical Log Sources](#three-critical-log-sources)
- [Introduction to SIEM Tools](#introduction-to-siem-tools)
- [SIEM Dashboards & Scenario Analysis](#siem-dashboards--scenario-analysis)
- [Open-Source vs. Proprietary Tools](#open-source-vs-proprietary-tools)
- [SIEM Deployment Models](#siem-deployment-models)
- [Industry Giants — Splunk vs. Google Chronicle](#industry-giants--splunk-vs-google-chronicle)
- [Splunk Dashboards — Deep Dive](#splunk-dashboards--deep-dive)
- [Google Chronicle Dashboards — Deep Dive](#google-chronicle-dashboards--deep-dive)
- [The Future of SIEM & Security](#the-future-of-siem--security)
- [SIEM vs. SOAR — The Key Distinction](#siem-vs-soar--the-key-distinction)

## Understanding Logs — Your Eyes on the Network

> **📒 What is a Log?**
> Beginner: A log is a digital receipt or diary entry — an automated, timestamped record of an event that occurred in a system, application, or network device.
> 
> Advanced: Logs provide immutable telemetry data. During forensic investigations and incident response, logs are parsed for Indicators of Compromise (IOCs) to reconstruct exactly how and when a threat actor bypassed network defenses.
> 
> Real Impact: Without logs, a breach is invisible. With logs, you can reconstruct every step an attacker took — when they entered, what they accessed, and how they tried to cover their tracks.

## Three Critical Log Sources

> **THREE LOG SOURCES — At a Glance**

```
  ┌─────────────────────────────────────────────────────────────────────────┐
  │                    THREE LOG SOURCES                                    │
  └─────────────────────────────────────────────────────────────────────────┘

  INTERNET/EXTERNAL                    INTERNAL NETWORK                 SERVERS
       │                                      │                            │
       v                                      v                            v
  ┌─────────────┐    ┌───────────────────────────────────┐    ┌───────────────────┐
  │  FIREWALL   │    │       NETWORK LOGS                │    │  SERVER LOGS      │
  │    LOGS     │    │                                   │    │                   │
  ├─────────────┤    ├───────────────────────────────────┤    ├───────────────────┤
  │ Incoming    │    │ All devices entering/leaving      │    │ Authentication    │
  │ connection  │    │ network. Connections between      │    │ events: logins,   │
  │ attempts    │    │ internal devices. Network scans.  │    │ failed attempts,  │
  │ from the    │    │                                   │    │ password resets   │
  │ internet    │    │                                   │    │                   │
  └─────────────┘    └───────────────────────────────────┘    └───────────────────┘

   Example:           Example:                                Example:
   Unknown IP         Compromised laptop scanning             Admin login at 3AM
   hit port 22        restricted financial DB server          on a Sunday
   50x in 1 minute    (unusual internal traffic)             (suspicious timing)
```

| **Log Type** | **What It Records** | **Detective Scenario** | **Key Question Answered** |
| --- | --- | --- | --- |
| Firewall Logs | All inbound connection attempts from the internet. All outbound data requests leaving the network. Blocked and allowed traffic rules. | Unknown external IP attempting to connect to internal server 50+ times per minute — likely a port scan or brute-force attack. | Who is trying to get INTO our network? What is trying to LEAVE our network? |
| Network Logs | All devices (laptops, phones, IoT) connecting to or disconnecting from the network. All communication flows between internal devices. | A compromised employee laptop suddenly starts scanning and connecting to the restricted financial database server — lateral movement detected. | What devices are on our network? Are internal devices communicating in unusual ways? |
| Server Logs | Application events for specific services (web, email, file shares). Heavily focused on authentication — login attempts, usernames, passwords, session tokens. | An administrator account logs into the payroll database at 3:00 AM on a Sunday — a major anomaly for that account's baseline behavior. | Who authenticated to what system, when, and from where? |

## Introduction to SIEM Tools

> **🏢 Why Manual Log Reading Fails at Scale**
> A Fortune 500 company generates 5–10 MILLION log entries per day across its network.
> At a reading speed of 1 log per second, 24/7, it would take a human analyst 58 DAYS to read just one day's logs.
> SIEM tools solve this impossibility by automating collection, correlation, and alerting — humans review only the flagged anomalies.

> **SIEM — How It Processes Log Data**

```
  ┌─────────────────────────────────────────────────────────────────────────┐
  │                    HOW A SIEM WORKS                                     │
  └─────────────────────────────────────────────────────────────────────────┘

  DATA SOURCES            SIEM ENGINE              ANALYST OUTPUT
  ┌────────────┐          ┌──────────────────────┐  ┌─────────────────────┐
  │ Firewalls  │──────>   │                      │  │ Real-time Dashboard │
  │ Servers    │──────>   │  1. COLLECT          │  │ with alerts,charts, │
  │ Endpoints  │──────>   │  2. NORMALIZE        │  │ maps, and graphs    │
  │ Cloud Apps │──────>   │  3. CORRELATE        │  └─────────────────────┘
  │ Network    │──────>   │  4. ANALYZE          │
  │ Devices    │──────>   │  5. ALERT            │  ┌─────────────────────┐
  │ IDS/IPS    │──────>   │                      │  │ Automated SOAR      │
  │ VPN Logs   │──────>   │  Millions of logs    │  │ Response triggered  │
  └────────────┘          │  processed into      │  │ on high-confidence  │
                          │  actionable alerts   │  │ alerts              │
                          └──────────────────────┘  └─────────────────────┘

  ⚠ IMPORTANT: SIEMs require CONSTANT tuning. They do not work out-of-the-box.
  False positives (noise) must be reduced. New threat patterns must be added.
  An untuned SIEM either misses real threats or drowns analysts in false alarms.
```

## SIEM Dashboards & Scenario Analysis

> **📊 Dashboard Analogy**
> Reading raw text logs during a crisis = trying to navigate a city by reading raw GPS coordinates (numbers).
> A SIEM Dashboard = Google Maps for your network — same data, instantly visual and actionable.
> 
> Dashboards convert millions of log entries into charts, graphs, maps, and color-coded alerts — enabling a 30-second situation assessment instead of hours of manual digging.

### Real-World Dashboard Scenario: The Suspicious Login

> **Incident: SIEM Alert — 'Suspicious Authentication Detected'**
> WITHOUT a SIEM Dashboard: Analyst manually searches through 2M+ server log lines. Takes 3–4 hours to locate the relevant entries.
> 
> WITH a SIEM Dashboard (30 seconds):
> • Bar chart shows: 500 FAILED login attempts in 5 minutes on one account.
> • Geographic map shows: All attempts originate from Russia — user is known to be in Chicago.
> • Time overlay shows: Attacks began at 2:37 AM local time — outside any normal working hours.
> • Verdict: Classic credential stuffing / brute-force attack. Account locked. IP range blocked.
> 
> Metrics that flagged this: Failed auth rate per minute, geographic origin of auth requests, time-of-day baseline deviation.

### Real-World Scenario: Website DDoS Outage

> **Incident: E-commerce Website Goes Offline**
> Step 1 — SIEM Collects: Web server logs from all front-end nodes flow into SIEM in real-time.
> Step 2 — SIEM Correlates: Dashboard highlights a 10,000% spike in incoming HTTP requests.
> Step 3 — SIEM Alerts: High-severity alert triggers: 'Potential DDoS Attack — Abnormal Traffic Volume.'
> Step 4 — Analyst Acts: Uses the visual IP map to identify attacking IP ranges and blocks them via firewall rule — site back online in 8 minutes.
> 
> Without SIEM: Analyst would spend hours manually parsing crashed web server log files, trying to identify attacking IPs one by one while the site remains down and the company loses $50,000/minute in revenue.

## Open-Source vs. Proprietary Tools

> **OPEN-SOURCE vs. PROPRIETARY — Key Differences**

```
  ┌─────────────────────────────────────────────────────────────────────────┐
  │           OPEN-SOURCE  vs.  PROPRIETARY                                 │
  ├────────────────────────────────┬────────────────────────────────────────┤
  │  OPEN-SOURCE                   │  PROPRIETARY                           │
  ├────────────────────────────────┼────────────────────────────────────────┤
  │ Source code: PUBLIC            │ Source code: PRIVATE (vendor only)     │
  │ Cost: FREE                     │ Cost: Expensive licensing fees         │
  │ Customization: UNLIMITED       │ Customization: Vendor-controlled       │
  │ Security: Community-reviewed   │ Security: Vendor-patched on schedule   │
  │ Patches: Fast (community)      │ Patches: Slow (wait for vendor release)│
  │ Support: Community forums      │ Support: Dedicated vendor support      │
  ├────────────────────────────────┼────────────────────────────────────────┤
  │ Examples: Linux, Suricata,     │ Examples: Splunk Enterprise,           │
  │           Wireshark, Snort     │           Google Chronicle, CrowdStrike│
  └────────────────────────────────┴────────────────────────────────────────┘

  MYTH: Open-source is less secure because hackers can see the code.
  REALITY: MORE security researchers worldwide reviewing = faster vulnerability discovery.
  Linux powers 96% of the world's top 1 million web servers.
```

| **Open-Source Tool** | **Function & Context** |
| --- | --- |
| **Linux (OS)** | Open-source operating system. Serves as the interface between hardware and the user. Security professionals heavily customize it via the command line for server management, forensics, and security tool hosting. |
| **Suricata** | Open-source network analysis and threat detection engine. Maintained by the OISF (Open Information Security Foundation). Inspects network traffic in real-time, matches against threat signatures, and integrates with SIEM tools to feed alerts. |
| **Wireshark** | Open-source network protocol analyzer. Captures and analyzes individual network packets. Used by analysts for deep-dive investigation of specific network traffic during incident response. |
| **Snort** | Open-source IDS/IPS (Intrusion Detection/Prevention System). Monitors network traffic against rule sets and either alerts (IDS mode) or actively blocks (IPS mode) suspicious traffic. |

## SIEM Deployment Models

| **Deployment Model** | **How It Works** | **Best For** | **Trade-off** |
| --- | --- | --- | --- |
| Self-Hosted (On-Premises) | Organization installs and maintains SIEM on its own physical servers in its own data center. | Organizations with classified data that legally cannot leave their facilities (government, defense, healthcare). | High upfront hardware cost. Organization responsible for maintenance, patches, and scaling. |
| Cloud-Hosted | SIEM software maintained entirely by the vendor; accessed via internet browser. | Organizations that want enterprise security without buying server infrastructure. Startups and mid-size companies. | Ongoing subscription cost. Data leaves your physical premises — may not meet all compliance requirements. |
| Hybrid | Sensitive operations and classified data on self-hosted servers. Fast, scalable processing pushed to the cloud. | Large enterprises with both compliance requirements and massive data volumes. Best of both worlds. | Complex architecture to manage. Requires expertise in both on-prem and cloud environments. |

## Industry Giants — Splunk vs. Google Chronicle

> **SPLUNK vs. CHRONICLE**

```
  ┌─────────────────────────────────────────────────────────────────────────┐
  │              SPLUNK  vs.  GOOGLE CHRONICLE                              │
  ├──────────────────────────────────┬──────────────────────────────────────┤
  │  SPLUNK                          │  GOOGLE CHRONICLE                    │
  ├──────────────────────────────────┼──────────────────────────────────────┤
  │ Type: Self-hosted OR Cloud       │ Type: Cloud-Native only              │
  │ Origin: Built for on-prem,       │ Origin: Built FROM SCRATCH for cloud │
  │         later moved to cloud     │         Fully leverages Google infra │
  │ Data Processing: Good at real-   │ Data Processing: Petabyte-scale      │
  │                  time searching  │ search — extreme speed & scale       │
  │ Interface: SPL query language    │ Interface: UDM + YARA-L rules        │
  │ Pricing: Per GB of data indexed  │ Pricing: Per user/capacity model     │
  │ Strength: Massive ecosystem,     │ Strength: Google AI integration,     │
  │           thousands of plugins   │           unmatched scalability      │
  └──────────────────────────────────┴──────────────────────────────────────┘

  KEY DISTINCTION: 'Cloud-native' (Chronicle) ≠ 'Cloud-hosted' (Splunk Cloud).
  Chronicle was architecturally designed for cloud from day one.
  Splunk Cloud is the same on-prem software running on cloud infrastructure.
```

## Splunk Dashboards — Deep Dive

| **Dashboard Name** | **Primary Purpose** | **What an Analyst Uses It For** | **Key Data Shown** |
| --- | --- | --- | --- |
| Security Posture Dashboard | Real-time SOC situation awareness. | Monitoring active threats during a shift. The first screen every analyst opens at the start of a workday. | Last 24 hours of notable events, highest-severity alerts, active incident count. |
| Executive Summary Dashboard | High-level organizational health overview. | Generating weekly/monthly security reports for CISO and non-technical leadership. Communicating security value. | Trend lines, incident totals, MTTR (mean time to respond), compliance status. |
| Incident Review Dashboard | Forensic timeline construction. | Building the attack timeline during an active investigation. Spotting patterns across multiple related alerts. | Visual event timeline, correlated alerts, severity rankings, affected hosts. |
| Risk Analysis Dashboard | Behavioral anomaly detection per entity. | Investigating a specific user, device, or IP that is behaving unusually. Risk scoring per entity. | Risk score over time, anomalous events per entity, peer comparison baselines. |

## Google Chronicle Dashboards — Deep Dive

| **Dashboard Name** | **Primary Purpose** | **What It Detects** | **Key Feature** |
| --- | --- | --- | --- |
| Enterprise Insights | Identify Indicators of Compromise (IOCs) across the network. | Known malicious domains, IPs, or file hashes present in network traffic. | Confidence Score (0-100%) + Severity Level for each IOC — helps prioritize response. |
| IOC Matches | Track top threats and malicious IPs over time. | Long-term threat campaigns targeting the organization. Persistent attacker infrastructure. | Trend view over weeks/months — reveals attackers who 'low and slow' exfiltrate data. |
| Rule Detections | Show which security rules are triggering most frequently. | Recurring attack patterns — e.g., phishing clicks, repeated failed auth, policy violations. | Helps identify gaps: a rule triggering 1000x/day means either a real problem or a misconfigured rule. |
| Data Ingestion & Health | Monitor the SIEM itself for reliability. | Gaps in log collection — if a source stops sending logs, attacks in that area become invisible. | Source-by-source data receipt confirmation. Alerts when a log source goes silent. |
| User Sign-In Overview | Authentication anomaly detection. | Impossible travel, simultaneous logins from multiple countries, account sharing. | Time-series heatmap of auth events per user — makes anomalies visually obvious at a glance. |

> **🔍 'Impossible Travel' Explained**
> Scenario: John Smith's account logs in from New York at 9:03 AM. Same account logs in from Tokyo at 9:11 AM.
> Problem: It's physically impossible to travel from New York to Tokyo in 8 minutes.
> What this means: John's credentials have been stolen. The second login is an attacker.
> SIEM Action: High-confidence alert fired. Account immediately suspended pending verification.
> Chronicle Dashboard: User Sign-In Overview flags this as a critical geographic anomaly.

## The Future of SIEM & Security

| **Trend** | **What It Means** | **Security Impact** |
| --- | --- | --- |
| IoT Explosion | Billions of smart devices (cameras, thermostats, medical devices, industrial sensors) are now network-connected. | Massively expands the attack surface. Each IoT device is a potential entry point. SIEMs must process orders of magnitude more log volume. |
| AI & Machine Learning in SIEM | AI models trained on billions of security events learn to recognize attack patterns that humans miss. | SIEMs can detect zero-day attacks (never seen before). Reduce false positives by 90%+. Automatically prioritize which alerts need human attention. |
| SOAR Integration | Security Orchestration, Automation, and Response — automated playbook execution triggered by SIEM alerts. | When SIEM detects a confirmed threat, SOAR auto-executes the first response steps (block IP, isolate host) in seconds — before a human could even read the alert. |
| Extended Detection & Response (XDR) | Next evolution beyond SIEM — integrates endpoint, network, cloud, and identity telemetry into one unified platform. | Single pane of glass for all security data. Correlated detections across ALL layers simultaneously. Replaces siloed security tools. |

## SIEM vs. SOAR — The Key Distinction

> **SIEM + SOAR + PLAYBOOK — The Security Triad**

```
  ┌─────────────────────────────────────────────────────────────────────────────┐
  │                SIEM  vs.  SOAR  —  Working Together                         │
  └─────────────────────────────────────────────────────────────────────────────┘

  1. SIEM (The Alarm)                                    2. SOAR (The Automated Responder)
  ┌─────────────────────────────────┐                    ┌────────────────────────────────-──┐
  │ Collects ALL logs               │   ────ALERT────>   │ Receives high-confidence alert    │
  │ Correlates patterns             │                    │ Executes pre-defined playbook     │
  │ Fires alert on anomaly          │                    │ automatically within milliseconds │
  │                                 │                    │ • Block IP at firewall            │
  │ 'Brute force detected:          │                    │ • Disable user account            │
  │  500 failed logins in 5 min     │                    │ • Isolate infected endpoint       │
  │  on account: jsmith@corp.com'   │                    │ • Create incident ticket          │
  └─────────────────────────────────┘                    └───────────────┬──────────────────-┘
                                                                         │
                                                                         v
                                                         3. PLAYBOOK (The Human Guide)
                                                         ┌────────────────────────────────-──┐
                                                         │ Immediate threat is contained.    │
                                                         │ Analyst opens playbook:           │
                                                         │ • Call jsmith to verify identity  │
                                                         │ • Issue secure password reset     │
                                                         │ • Write incident report           │
                                                         │ • Escalate if confirmed breach    │
                                                         └──────────────────────────────────-┘
```

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| **What is a log?** | An automated, timestamped record of an event that occurred in a system, application, or network device. |
| **Name the 3 critical log sources.** | Firewall Logs, Network Logs, Server Logs. |
| **What is the difference between SIEM and SOAR?** | SIEM collects logs and fires alerts. SOAR automatically executes the response to those alerts without waiting for a human. |
| **What is 'Cloud-Native' vs 'Cloud-Hosted'?** | Cloud-Native (e.g., Chronicle) = built from scratch specifically for cloud infrastructure. Cloud-Hosted (e.g., Splunk Cloud) = traditional software running on cloud hardware. |
| **What is Impossible Travel and which SIEM detects it?** | A user logging in from two geographically distant locations within a timeframe that makes physical travel impossible. Detected by Google Chronicle's User Sign-In Overview dashboard. |
| **Name two open-source security tools.** | Any of: Linux, Suricata, Wireshark, Snort. |
| **Why do SIEMs require constant tuning?** | To reduce false positives (noise) and add new threat patterns — an untuned SIEM either misses real threats or drowns analysts in false alarms. |
