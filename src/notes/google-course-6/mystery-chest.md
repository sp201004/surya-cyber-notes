## Contents

- [Complete Course 6 Glossary](#complete-course-6-glossary)
- [Complete Flashcard Review — All Modules](#complete-flashcard-review--all-modules)

## Complete Course 6 Glossary

| **Term** | **Definition** |
| --- | --- |
| **Alert Triage** | The process of prioritizing security alerts according to their level of importance or urgency to efficiently allocate limited analyst resources. |
| **Anomaly-Based Analysis** | IDS detection method that identifies deviations from a learned normal baseline. Can detect zero-days but has higher false-positive rate than signature-based. |
| **Baseline** | A reference point representing normal expected behavior for systems, networks, or users. Deviations from baseline indicate potential threats. |
| **Business Continuity Plan (BCP)** | A document outlining procedures to sustain business operations during and after a significant disruption (breach, disaster, outage). |
| **C2 (Command and Control)** | Techniques attackers use to maintain communications with compromised systems inside a network, often using legitimate protocols on non-standard ports to evade detection. |
| **CEF (Common Event Format)** | A log format using pipe-separated fields and key-value pairs. Used by security appliances (Palo Alto firewalls, ArcSight SIEM). |
| **Chain of Custody** | Documentation of every person who handled evidence, when they handled it, and what they did with it. A broken chain makes evidence inadmissible in court. |
| **Chronicle (Google SecOps)** | Google's cloud-native SIEM platform. Uses UDM (Unified Data Model) and YARA-L for detection. Petabyte-scale log ingestion and search. |
| **Cold Site** | A backup facility with power and cooling but no equipment or data loaded. Requires extensive setup (days/weeks) before operations can resume. |
| **CSIRT** | Computer Security Incident Response Team. A cross-functional task force assembled to handle specific major security incidents. |
| **Data Exfiltration** | Unauthorized transmission of data from a system to an external destination controlled by the attacker. The primary goal of most sophisticated attacks. |
| **Disaster Recovery Plan (DRP)** | A plan focused specifically on restoring IT infrastructure and data after a major disaster (physical destruction, catastrophic failure, extended breach). |
| **EDR** | Endpoint Detection and Response. AI-driven software installed on individual devices that uses behavioral analysis to detect and respond to threats at the host level. |
| **Event** | Any observable occurrence on a network, system, or device. Not all events are security incidents. |
| **False Negative (FN)** | An alert that DOES NOT fire when a real threat IS present. The worst-case scenario -- company is completely blind to an active breach. |
| **False Positive (FP)** | An alert that fires when NO real threat exists. Causes alert fatigue -- analysts start ignoring alarms if too frequent. |
| **Filebeat** | A lightweight log data shipper utility that automatically forwards log records from endpoints to a SIEM or log aggregator. |
| **Flow Analysis** | Examining network communication metadata (routing, protocols, ports) to detect anomalies like C2 traffic using legitimate protocols on non-standard ports. |
| **Honeypot** | A deliberately vulnerable-looking decoy system with zero legitimate business value. Any interaction with it is classified as malicious. Zero false positives. |
| **Hot Site** | A fully operational duplicate facility with equipment and data synced in real-time. Instant failover with zero downtime. |
| **HIDS** | Host-Based Intrusion Detection System. Monitors activity on the individual host it is installed on (processes, files, memory, registry). |
| **IDS** | Intrusion Detection System. Passive tool that monitors traffic/activity and generates ALERTS only. Does not block traffic. |
| **Incident** | An occurrence that actually or imminently jeopardizes the CIA of an information system, or violates a security policy. A subset of events. |
| **Incident Handler's Journal** | A form of documentation used to record the 5 W's (Who, What, Where, When, Why) of an incident in real-time during response. |
| **IoA** | Indicator of Attack. Observed events indicating a REAL-TIME, UNFOLDING attack (the why and how). Requires immediate response. |
| **IoC** | Indicator of Compromise. Observable evidence that a security incident has ALREADY occurred (the who and what). Used for forensic reconstruction. |
| **IPS** | Intrusion Prevention System. Active tool that monitors traffic inline and automatically BLOCKS/DROPS malicious packets in real-time. |
| **jq** | A command-line JSON processor. Used to parse and filter Suricata's eve.json log files for specific fields or session reconstruction. |
| **JSON** | JavaScript Object Notation. Log format using key-value pairs in curly braces. Standard in cloud environments and modern security tools. |
| **Lateral Movement** | Tactics attackers use to move through an internal network after initial compromise, accessing additional systems to find high-value targets. |
| **Lessons Learned Meeting** | A blameless post-mortem held within 2 weeks of incident resolution. All parties identify gaps and generate recommendations for improvement. |
| **libpcap** | Packet capture library for Unix/Linux/macOS systems. The underlying engine for tcpdump. |
| **NIDS** | Network-Based Intrusion Detection System. Positioned at network choke points to monitor raw traffic across all network devices. |
| **NIST Incident Response Lifecycle** | A 4-phase framework: Preparation; Detection & Analysis; Containment, Eradication & Recovery; Post-Incident Activity. Non-linear continuous loop. |
| **NOC** | Network Operations Center. Monitors network performance, hardware uptime, and connectivity. Different focus than SOC (security). |
| **Parsing** | Converting raw unstructured log text into structured, searchable fields. Example: 'Failed login from 192.168.1.5' becomes Event=Failed_Login, IP=192.168.1.5. |
| **Pcap (.pcap)** | Packet Capture file. A snapshot of network packets saved to disk for offline forensic analysis. Created by tcpdump (-w flag) and Wireshark. |
| **Playbook** | A manual providing explicit step-by-step instructions for responding to specific security incidents. Can be manual, automated (SOAR), or semi-automated. |
| **Pyramid of Pain** | A model showing the relationship between IoC types and difficulty they cause attackers when blocked. From trivial (hashes) to tough (TTPs). |
| **Security Incident** | An event that jeopardizes CIA or violates security policy. Subset of all events -- requires formal incident response. |
| **Signature-Based Analysis** | IDS detection comparing traffic against a library of known attack patterns. Low false positives but blind to zero-days. |
| **SIEM** | Security Information and Event Management. Aggregates, normalizes, correlates, and analyzes log data from all network sources. Generates centralized alerts. |
| **SOAR** | Security Orchestration, Automation, and Response. Executes automated response playbooks triggered by SIEM alerts. Completes in seconds what takes humans 20+ minutes. |
| **SOC** | Security Operations Center. A dedicated 24/7 team monitoring networks and defending against threats. Organized in tiers (L1, L2, L3, Manager). |
| **SPL** | Search Processing Language. Splunk's query language. Uses pipe (\|) to chain commands. Always specify index= for performance optimization. |
| **Suricata** | Open-source IDS/IPS/NSM tool. Rules have three components: Action, Header, Rule Options. Produces fast.log and eve.json output files. |
| **Syslog** | Native logging standard for Linux, Unix, and network devices. Uses Priority Field (PRI) in angle brackets. Lower PRI = higher urgency. |
| **tcpdump** | Command-line network protocol analyzer for Linux/macOS. Captures live traffic or reads .pcap files. Always use -nn during incident investigations. |
| **Telemetry** | Live collection and transmission of computing state data for real-time analysis (raw pcap streams, live metrics). |
| **Threat Hunting** | Proactive, human-driven search for hidden threats that automated tools missed. Finds APTs and fileless malware that never trigger alerts. |
| **Threat Intelligence** | Evidence-based information about existing or emerging threats, providing context for prioritizing security responses. |
| **TIP** | Threat Intelligence Platform. Aggregates, de-duplicates, and analyzes threat intel feeds to help prioritize security risks. |
| **True Negative (TN)** | Alert does NOT fire AND no real threat exists. System correctly silent. No action needed. |
| **True Positive (TP)** | Alert fires AND a real threat IS present. Correct detection. Requires immediate investigation and response. |
| **TTPs** | Tactics, Techniques, and Procedures. The complete behavioral footprint of an attacker. Highest level in Pyramid of Pain -- blocking TTPs is most impactful. |
| **UDM** | Unified Data Model. Chronicle's normalized data schema enabling fast, structured queries across all ingested log sources. |
| **VirusTotal** | Free crowdsourced service for analyzing suspicious files, URLs, IPs, and domains. Never upload PII or proprietary data. |
| **Warm Site** | A backup facility that is configured and updated but requires a brief setup period (hours to days) to bring online. Medium cost and recovery speed. |
| **Wazuh** | Open-source SIEM and security analytics engine. Free alternative to commercial SIEM platforms. Uses Filebeat for log collection. |
| **Wireshark** | Open-source GUI network protocol analyzer. Uses WinPcap/Npcap on Windows. Provides visual packet inspection with protocol dissection. |
| **XML** | eXtensible Markup Language. Log format used by Windows Event Logs. Uses paired tags (<tag>value</tag>). EventID 4625 = Failed Logon. |
| **YARA-L** | A computer language used in Google Chronicle to create custom detection rules for searching through ingested log data. |
| **Zero-Day** | An exploit targeting a vulnerability unknown to the vendor. No signature exists yet -- anomaly-based detection is the only automated defense. |

## Complete Flashcard Review — All Modules

| **Question** | **Answer** |
| --- | --- |
| **Event vs. Security Incident?** | Event = any observable occurrence. Security Incident = event that jeopardizes CIA or violates policy. ALL incidents are events; NOT all events are incidents. |
| **NIST 4 phases?** | 1-Preparation (before attack), 2-Detection & Analysis (is it real?), 3-Containment/Eradication/Recovery (stop, remove, restore), 4-Post-Incident Activity (learn). Non-linear loop. |
| **CSIRT vs. SOC?** | CSIRT: cross-functional task force for specific major crises (temporary). SOC: dedicated 24/7 team for ongoing network defense monitoring (permanent Blue Team). |
| **IDS vs. IPS vs. EDR?** | IDS: detects+alerts only, passive. IPS: detects+blocks automatically, active inline. EDR: on-device behavioral AI, detects abnormal behavior, isolates endpoint. |
| **TP vs. FP vs. FN vs. TN?** | TP: alarm fires + real threat (correct). TN: no alarm + no threat (correct). FP: alarm fires + no threat (alert fatigue). FN: no alarm + real threat (worst case -- blind to breach). |
| **SIEM vs. SOAR?** | SIEM: collects/normalizes/correlates logs, generates alerts (the dashboard). SOAR: auto-executes playbooks when SIEM fires (the autopilot). SIEM detects, SOAR responds. |
| **What is a baseline?** | A reference point of normal expected behavior. Without it, you cannot identify what is abnormal or suspicious. Example: 2AM 10GB transfer = off-baseline temporally. |
| **6 stages of data exfiltration?** | 1-Initial Access, 2-Lateral Movement, 3-Asset Discovery, 4-Data Consolidation, 5-Bypass Controls, 6-Exfiltration. |
| **What is C2 and how detected?** | Command and Control: attacker communicates with infected systems using legitimate protocols on non-standard ports (HTTPS on 8088). Detected by flow analysis looking for port-protocol mismatches. |
| **tcpdump -n vs. -nn?** | -n: disables hostname resolution. -nn: disables BOTH hostname AND port resolution. -nn is critical -- prevents alerting attacker via DNS lookups during investigation. |
| **IoC vs. IoA?** | IoC: evidence breach already happened (forensics -- who/what, malicious file hash). IoA: real-time signal of active attack happening NOW (why/how -- unknown process executing code). |
| **Pyramid of Pain top vs. bottom?** | Bottom (trivial): hashes (change 1 byte = new hash). Top (tough): TTPs (breaking forces attacker to rebuild entire methodology). Focus on TTPs for maximum defender ROI. |
| **What is a honeypot?** | Deliberate decoy system with zero legitimate business value. ANY interaction = automatic high-priority malicious alert. Zero false positives by design. |
| **3 triage priority factors?** | Functional Impact (does it disrupt business?), Information Impact (was data stolen/modified?), Recoverability (can we get it back, at what cost?). |
| **Chain of Custody steps?** | 1-Write Protection (lock drive), 2-Cryptographic Hash (digital seal), 3-Forensic Copy (work on copy never original), 4-Continuous Logging (every transfer documented). |
| **Hot vs. Warm vs. Cold Site?** | Hot: instant failover, zero downtime (most expensive). Warm: hours to activate (moderate cost). Cold: days/weeks to setup (cheapest, most downtime). |
| **Lessons Learned Meeting rules?** | Within 2 weeks of resolution. All parties present. BLAMELESS culture. Goal: improve systems, not punish people. Output: updated playbooks, new controls. |
| **4 Log format types?** | JSON (cloud/APIs, curly braces {}). Syslog (Linux/network devices, PRI in angle brackets). XML (Windows events, paired tags). CEF (security appliances, pipe-separated fields). |
| **Windows EventID 4625 means?** | Failed Logon attempt. Important for detecting brute force attacks. EventID 4624 = successful logon. 4648 = explicit credential logon (possible pass-the-hash). |
| **Suricata rule 3 components?** | Action (alert/pass/drop/reject), Header (protocol + source IP/port + direction + dest IP/port), Options (msg, flow, content, sid, rev) in parentheses. |
| **Suricata action priority order?** | 1-PASS (highest, allow through), 2-DROP (silently discard), 3-REJECT (discard + send RST), 4-ALERT (lowest, log + allow). If rules conflict, higher priority wins. |
| **fast.log vs. eve.json?** | fast.log: minimal plaintext, legacy, no session correlation. eve.json: production JSON format with flow_id to correlate all alerts from one network session. Use eve.json for SIEM. |
| **jq command to filter by flow_id?** | jq 'select(.flow_id == 14500150016149)' /var/log/suricata/eve.json -- reconstructs complete session from all Suricata alerts sharing that flow ID. |
| **SPL wildcard and pipe?** | fail* matches fail, failed, failure, failing etc. \| (pipe) passes output of one command as input to next. Always specify index= first for performance. |
| **UDM Search vs. Raw Log Search in Chronicle?** | UDM: fast, normalized, structured queries on indexed data. Raw Log: slow scan of original text files -- used when normalization breaks and events don't appear in UDM. |
