## Contents

- [Logs vs. Telemetry](#logs-vs-telemetry)
- [Log Formats — Reading Different Vendor Syntaxes](#log-formats--reading-different-vendor-syntaxes)
- [IDS Architecture — HIDS vs. NIDS](#ids-architecture--hids-vs-nids)
- [Suricata — Writing IDS/IPS Rules](#suricata--writing-idsips-rules)
- [SIEM Query Engineering](#siem-query-engineering)
- [Wazuh — Open-Source SIEM](#wazuh--open-source-siem)

## Logs vs. Telemetry

| **Concept** | **Definition** | **Format** | **Forensic Use** |
| --- | --- | --- | --- |
| **Telemetry** | Live streams of raw computing states or active data transiting a network. | Raw .pcap files, live packet streams, memory dumps. | Real-time analysis of active sessions. See live attack as it happens. |
| **Log** | An unalterable, retrospective text record created AFTER a discrete event has completed. | Structured text files: JSON, Syslog, XML, CEF, CSV. | Reconstruct attack timeline. Answer the 5 W's of the incident post-event. |

> **IMPORTANT: Why NOT to Log Everything**
> Attempting to log every single computational transaction is a costly operational mistake.
> 
> **1. Financial:** Multi-terabyte log volumes = massive storage and SIEM licensing costs.
> **2. Performance:** Systems continuously writing non-essential events = I/O bottlenecks and slowdowns.
> **3. Alert Fatigue:** Critical security warnings buried in background noise -- analysts miss real threats.
> 
> **Solution:** Log the RIGHT events at the RIGHT verbosity level.
> **Standard:** 'Login Event [05:45:15] User1 Authenticated successfully'
> **Verbose:** 'Login Event [2026/05/21 17:45:15.892] auth.cc:470 User1 from 192.168.1.2 device1'
> Use VERBOSE only when deep investigation is needed -- not as default.

## Log Formats — Reading Different Vendor Syntaxes

> **NOTE: Why Analysts Must Know Multiple Log Formats**
> Enterprise environments have mixed hardware: Linux servers, Windows DCs, Cisco firewalls, AWS cloud.
> Each vendor outputs logs in a different format. Analysts must read them all during an investigation.
> SIEM normalization converts all formats to a unified schema -- but raw log reading is essential for forensics.

### JSON — JavaScript Object Notation (Cloud & APIs)

> **JSON LOG FORMAT**
> **WHEN SEEN:** Cloud environments, web APIs, modern applications, Suricata eve.json
> **STRUCTURE:** Key-value pairs enclosed in curly braces {}.
> Strings in double quotes. Arrays in square brackets [].

```json
{
  "Alert_ID": 9482,
  "Classification": "Malware_Execution",
  "Timestamp": "2026-05-21T17:45:15.892Z",
  "Source_IP": "192.168.10.45",
  "Impacted_Assets": ["PROD-DB-01", "PROD-APP-02"]
}
```

> **READING:** Alert 9482 classified as Malware_Execution at 17:45.
> Source IP 192.168.10.45 affected two production servers.

### Syslog — Linux, Unix, Network Devices

> **SYSLOG FORMAT**
> **WHEN SEEN: Linux servers, routers, firewalls, switches, Kubernetes nodes.**
> **STRUCTURE: Starts with Priority Field (PRI) in angle brackets <>.**
> **Lower PRI number = HIGHER urgency/severity.**

```
<236>1 2026-05-21T17:50:02.003Z k8s-worker-node1 kubelet - ID88 Container sandbox execution blocked. 
  |    | |                       | |                |       | |    |
  |    | |                       | |                |       | |    +-- Event message
  |    | |                       | |                |       | +-- Message ID
  |    | |                       | |                |       +-- Process name (kubelet)
  |    | |                       | |                +-- Hostname
  |    | |                       | +-- Timestamp (ISO 8601)
  |    | |                       +-- Syslog version
  |    | +-- PRI field = Facility (29) x 8 + Severity (4) = 236
  |    +-- Syslog version
  +-- PRI in angle brackets

  PRIORITY: PRI=<0> is most critical. PRI=<191> is least critical.
```

### XML — Windows Event Logs

> **XML LOG FORMAT — Windows Events**
> **WHEN SEEN: Windows Event Viewer (.evtx files), Active Directory, IIS, Exchange.**
> **STRUCTURE: Strict paired tags <tag>value</tag>. Human-readable but verbose.**
> **<Event>**
> **<System>**
> **<EventID>4625</EventID>        <!-- 4625 = Failed Logon attempt -->**
> **<TimeCreated>2026-05-21T17:45:00Z</TimeCreated>**
> **<Computer>DC-01.CORP.INTERNAL</Computer>**
> **<Channel>Security</Channel>**
> **</System>**
> **<EventData>**
> **<Data Name='TargetUserName'>jsmith</Data>**
> **<Data Name='IpAddress'>192.168.10.45</Data>**
> **</EventData>**
> **</Event>**
> **READING: Windows Security Event 4625 = FAILED LOGIN for user 'jsmith'**
> **from IP 192.168.10.45 on Domain Controller DC-01.**
> **CRITICAL WINDOWS EVENT IDs TO MEMORIZE:**
> **4624 = Successful Logon    4625 = Failed Logon**
> **4648 = Explicit Credential Logon (Pass-the-Hash indicator)**
> **4688 = Process Created     4720 = User Account Created**
> **4732 = Member Added to Security Group**

### CEF — Common Event Format (Security Appliances)

> **CEF LOG FORMAT**
> **WHEN SEEN: Firewalls, WAFs, IDS/IPS appliances, ArcSight SIEM.**
> **STRUCTURE: Fields separated by pipe characters |. Key-value pairs after.**

```
    CEF:1|PaloAlto|ThreatAppliance|10.0|1012|SQL Injection Attempt Blocked|10|src=192.168.10.45 dst=172.21.224.5
  |    | |        |              |    |    |                              |  |
  |    | |        |              |    |    |                              |  +-- Extension (key=value pairs)
  |    | |        |              |    |    |                              +-- Severity (0-10, 10=max)
  |    | |        |              |    |    +-- Event Name
  |    | |        |              |    +-- Event Class ID
  |    | |        |              +-- Device Version
  |    | |        +-- Device Product
  |    | +-- Device Vendor
  |    +-- CEF Version
  +-- Format identifier

  READING: PaloAlto firewall blocked a SQL injection attempt from
  192.168.10.45 targeting 172.21.224.5. Severity: 10 (maximum).
```

## IDS Architecture — HIDS vs. NIDS

| **Type** | **Full Name** | **Where It Sits** | **What It Monitors** | **Blind Spots** |
| --- | --- | --- | --- | --- |
| **HIDS** | Host-Based IDS | Installed directly ON the monitored device (laptop, server). | Process executions, file integrity, memory injections, registry changes on ONE machine. | Cannot see network traffic between other devices. Single host perspective only. |
| **NIDS** | Network-Based IDS | At network choke points (perimeter, core switches). Sees all traffic. | Raw packet payloads across the wire for all devices. Network-wide visibility. | Cannot see what happens INSIDE encrypted payloads (unless TLS inspection). Cannot see host-level activity. |

| **Detection Method** | **How It Works** | **Strength** | **Weakness** |
| --- | --- | --- | --- |
| **Signature-Based** | Compares traffic against a library of known attack patterns (signatures). Like antivirus -- looks for known malware fingerprints. | Very LOW false-positive rate. Fast. Well-understood. Vendor-maintained rule libraries. | COMPLETELY BLIND to zero-day exploits. If no signature exists, it passes through. |
| **Anomaly-Based** | Training Phase: Learn normal behavior baseline. Detection Phase: Flag deviations from baseline. | Can detect UNKNOWN zero-day attacks by recognizing abnormal behavior patterns. | HIGH false-positive rate. Legitimate business changes (new software, new employee) look like attacks. |

## Suricata — Writing IDS/IPS Rules

> **NOTE: What is Suricata?**
> Open-source IDS/IPS/Network Security Monitoring (NSM) tool.
> Maintained by the Open Information Security Foundation (OISF).
> Integrates directly with SIEM tools (Splunk, Chronicle, Elastic Stack).
> Can operate as IDS (alert only) OR IPS (alert + block) depending on configuration.

> **SURICATA RULE ANATOMY:**

```
  alert http $HOME_NET any -> $EXTERNAL_NET any (msg:"GET on wire"; flow:established,to_server; content:"GET"; sid:12345; rev:3;)
  |     |    |          |  |  |             |   |                                                      
  |     |    |          |  |  |             |   +-- RULE OPTIONS BLOCK (enclosed in parentheses)
  |     |    |          |  |  |             +-- Destination port (any)
  |     |    |          |  |  +-- Destination IP ($EXTERNAL_NET = all external IPs)
  |     |    |          |  +-- Direction arrow (-> = one-way, <> = bidirectional)
  |     |    |          +-- Source port (any)
  |     |    +-- Source IP ($HOME_NET = your internal network)
  |     +-- Protocol (http, tcp, udp, icmp, dns, tls)
  +-- ACTION (alert, pass, drop, reject)

  RULE OPTIONS EXPLAINED:
  msg:"text"          -- Alert message displayed when rule triggers
  flow:established    -- Only match on established TCP sessions (stateful)
  content:"GET"       -- Deep Packet Inspection: look for 'GET' in payload
  sid:12345           -- Unique Signature ID (every rule must have one)
  rev:3               -- Revision number (increment when rule is updated)

  ACTION PRIORITY ORDER (when rules conflict):
  1. PASS (highest priority -- allow through)
  2. DROP (silently discard packet)
  3. REJECT (discard + send RST to sender)
  4. ALERT (lowest -- generate alert, allow through)
```

> **SURICATA LOG FILES:**
> **fast.log:** Legacy minimal plaintext format. Quick human reading.
> **Format:** date+time [**] [sid] msg [**] [Classification] [Priority]
> **Example:** 05/21-17:45:15.123 [**] [1:12345:3] GET on wire [**] [Priority: 2]
> **Limitation:** No flow_id. Cannot correlate multiple alerts to same session.
> 
> **eve.json:** Production-standard JSON format. Use this for SIEM integration.
> **Contains:** timestamp, flow_id, src_ip, dest_ip, protocol, alert.signature
> **flow_id:** Unique integer key correlating ALL alerts from the same network session.

```bash
# PARSING eve.json WITH jq (command-line JSON processor):

# Extract key fields (compact format):
jq -c "[.timestamp, .flow_id, .alert.signature]" /var/log/suricata/eve.json

# Reconstruct complete session by flow_id:
jq "select(.flow_id == 14500150016149)" /var/log/suricata/eve.json
```

## SIEM Query Engineering

### Splunk — Search Processing Language (SPL)

> **TIP: SPL Core Concept**
> SPL pipes (|) the output of one command directly into the input of the next.
> OPTIMIZATION MANDATE: Always specify index= and time range. Vague global scans cause massive latency.

```
SPL QUERY STRUCTURE:
  index=buttercupgames error OR fail* host!=www1 | chart count by host
  |                   |         |    |           |
  |                   |         |    |           +-- PIPE: feed output to next command
  |                   |         |    +-- host!=www1: exclude records from www1 (known clean)
  |                   |         +-- fail*: wildcard (matches fail, failed, failure, failing...)
  |                   +-- error OR fail*: search for either term
  +-- index=: ALWAYS specify. Isolates to specific data repository.

  COMMON SPL COMMANDS:
  search   -- Filter events matching conditions
  stats    -- Calculate statistics (count, sum, avg)
  chart    -- Build visual charts from data
  table    -- Display specific fields as columns
  rex      -- Extract fields using regex
  eval     -- Create new calculated fields
  where    -- Filter on calculated field conditions
  dedup    -- Remove duplicate events
  sort     -- Sort results

  SECURITY ANALYST EXAMPLES:

  # Find all failed logins in last 24 hours:
  index=security EventCode=4625 | stats count by src_ip | sort -count

  # Find logins outside business hours:
  index=security EventCode=4624 date_hour<9 OR date_hour>17 | table user, src_ip, _time

  # Top 10 source IPs generating errors:
  index=web error | stats count by src_ip | sort -count | head 10
```

### Google Chronicle — UDM & YARA-L

> **GOOGLE CHRONICLE — UDM & YARA-L**
> **GOOGLE CHRONICLE QUERY METHODS:**
> **METHOD 1: UDM SEARCH (Unified Data Model -- Fast, Normalized)**

```
  +---------------------------------------------------------+
  | Queries pre-normalized, structured data.                |
  | Fastest search method. Best for operational monitoring. |
  |                                                         |
  | Example -- Find all blocked user logins:                |
  | metadata.event_type = "USER_LOGIN"                      |
  | AND security_result.action = "BLOCK"                    |
  +---------------------------------------------------------+

  METHOD 2: RAW LOG SEARCH (Slower, Bypasses Normalization)
  +---------------------------------------------------------+
  | Scans raw text of original log files directly.          |
  | Used when normalization pipeline breaks and logs are    |
  | not appearing in UDM search results.                    |
  | Critical for troubleshooting SIEM ingestion issues.     |
  +---------------------------------------------------------+

  YARA-L RULES (Detection Engineering):
  A language for writing custom detection rules in Chronicle.
  Similar to Suricata rules but for SIEM-level detection across logs.
  Used to detect behavioral patterns across correlated events over time.
```

## Wazuh — Open-Source SIEM

> **NOTE: What is Wazuh?**
> Free, open-source security analytics engine. Powerful alternative to expensive commercial SIEMs.
> Collects logs from endpoints via Filebeat agents. Provides threat detection, compliance, and incident response.
> Integrates with Elasticsearch and Kibana for visualization (the ELK Stack).

> **WAZUH FILEBEAT CONFIGURATION (ingest.yml):**
> **filebeat.inputs:**
> **- type: log**
> **enabled: true**
> **paths:**
> **- /media/sf_buttercup-shared/www1/*.log**
> **|**

```
                                           +-- *.log = wildcard: collect ALL .log files

  output.logstash:
    hosts: ["localhost:5044"]
          |
          +-- Send all collected logs to Logstash on port 5044

  EXECUTION: Launch Filebeat from command line to start log collection.
  For historical offline log analysis: Set dashboard time range back to Jan 1, 2000
  to ensure all historical .pcap and .csv records register as hits.
```

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| **4 Log format types?** | JSON (cloud/APIs, curly braces {}). Syslog (Linux/network devices, PRI in angle brackets). XML (Windows events, paired tags). CEF (security appliances, pipe-separated fields). |
| **Windows EventID 4625 means?** | Failed Logon attempt. Important for detecting brute force attacks. EventID 4624 = successful logon. 4648 = explicit credential logon (possible pass-the-hash). |
| **HIDS vs. NIDS?** | HIDS: host-based, monitors one machine's processes/files/registry. NIDS: network-based, monitors raw traffic at choke points across all devices. |
| **Signature vs. Anomaly detection?** | Signature: matches known attack patterns, low false positives but blind to zero-days. Anomaly: flags deviations from a learned baseline, catches zero-days but higher false positives. |
| **Suricata rule 3 components?** | Action (alert/pass/drop/reject), Header (protocol + source IP/port + direction + dest IP/port), Options (msg, flow, content, sid, rev) in parentheses. |
| **fast.log vs. eve.json?** | fast.log: minimal plaintext, legacy, no session correlation. eve.json: production JSON format with flow_id to correlate all alerts from one network session. Use eve.json for SIEM. |
| **SPL wildcard and pipe?** | fail* matches fail, failed, failure, failing etc. \| (pipe) passes output of one command as input to next. Always specify index= first for performance. |
| **UDM Search vs. Raw Log Search in Chronicle?** | UDM: fast, normalized, structured queries on indexed data. Raw Log: slow scan of original text files -- used when normalization breaks and events don't appear in UDM. |
