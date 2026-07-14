**GOOGLE CYBERSECURITY CERTIFICATE**

**Course 6**

**Sound the Alarm:**

**Detection and Response**

**Study** **Notes | Modules** **1 – 4**

Deep Understanding Edition | With Diagrams, Command Cards & Real-World Examples

| **Module** | **Title** | **Topics Covered** |
| --- | --- | --- |
| Module 1 | Intro to Detection & Incident Response | Events vs Incidents · NIST Lifecycle · CSIRT/SOC · IDS/IPS/EDR · SIEM · SOAR · Signal Triage |
| Module 2 | Network Monitoring & Analysis | Baselines · C2 · Data Exfiltration · Packet Anatomy · tcpdump · Wireshark · pcap |
| Module 3 | Incident Investigation & Response | Threat Hunting · IoC vs IoA · Pyramid of Pain · Triage · Chain of Custody · BCP · Final Report |
| Module 4 | IDS & SIEM Tools | Log Formats · Suricata Rules · Splunk SPL · Chronicle YARA-L · Wazuh · jq |

**MODULE 1**

# Introduction to Detection and Incident Response

## 1.1 The Modern Security Reality — Detection Over Prevention

> **KEY CONCEPT: The Industry Mindset Shift**
> You CANNOT prevent 100% of attacks. The perimeter is too large, threats too sophisticated, humans too fallible.
> Modern security has shifted from 'how do we stop all attacks?' to 'how do we detect and respond FAST?'
> Goal: Reduce Time to Detect (TTD) and Time to Respond (TTR) to minimize blast radius.

## 1.2 Event vs. Security Incident

> **NOTE: Core Rule: All security incidents are events, but NOT all events are security incidents.**
> 
> EVENT: Any observable occurrence on a network, system, or device. Events are normal -- millions happen daily.
> Example: Employee forgets password, requests reset, successfully changes it. Logged as an event. No policy violated.
> 
> SECURITY INCIDENT: An occurrence that jeopardizes the CIA of an information system OR violates a security policy.
> Example: Attacker forces a fraudulent password reset on the CEO's account and steals financial records.
> This violates policy AND compromises confidentiality. This is a SECURITY INCIDENT.
> 
> Why the distinction matters: Not every alert needs an incident response. Analysts must triage accurately.
> Mis-classifying an incident as a normal event = missed breach. Mis-classifying events as incidents = alert fatigue.

## 1.3 NIST Incident Response Lifecycle — 4 Phases

> **TIP: How** **the Lifecycle** **Works**
> The NIST lifecycle is NOT linear -- it is a continuous loop. Phases CAN overlap.
> Example: During Recovery (Phase 3), new evidence discovered may send the team back to Detection (Phase 2).
> The loop continues until the incident is fully resolved and post-incident review is complete.

> **NIST 4-PHASE INCIDENT RESPONSE LIFECYCLE**

```
  +-------------------------------------------------------------------+
  |             NIST INCIDENT RESPONSE LIFECYCLE                      |
  +-------------------------------------------------------------------+

  +----------------+   +----------------------+   +-------------------+
  | PHASE 1:       |-->| PHASE 2:             |-->| PHASE 3:          |
  | PREPARATION    |   | DETECTION &          |   | CONTAINMENT,      |
  |                |   | ANALYSIS             |   | ERADICATION &     |
  | Before attack: |   | Monitor & assess     |   | RECOVERY          |
  | tools, policy, |   | indicators. Is this  |   | Stop bleeding,    |
  | training, plans|   | a real incident?     |   | remove threat,    |
  |                |   |                      |   | restore ops.      |
  +----------------+   +----------------------+   +---------+---------+
          ^                                                  |
          |                                                  v
          |             +----------------------+
          +-------------|  PHASE 4:            |
                        | POST-INCIDENT        |
                        | ACTIVITY             |
                        | Lessons learned,     |
                        | update playbooks,    |
                        | improve defences.    |
                        +----------------------+

  Phases can OVERLAP. New evidence in Phase 3 may loop back to Phase 2.
```

| **Phase** | **Name** | **What Happens** | **Analyst Action Example** |
| --- | --- | --- | --- |
| **1** | **Preparation** | Build defences BEFORE attacks occur. Tools, resources, policies, training, playbooks all set up proactively. | Configure company email to flag all external emails with 'CAUTION' banner. Train employees on phishing recognition quarterly. |
| **2** | **Detection & Analysis** | Continuous monitoring to catch incidents early. Analyze alerts to determine if a real incident or false alarm. | SIEM flags 3AM spike in outbound database traffic. Analyst investigates logs -- is data being exfiltrated or is it a scheduled backup? |
| **3** | **Containment, Eradication & Recovery** | Stop the damage (contain), remove the threat (eradicate), restore operations (recover). | CONTAIN: Disconnect infected laptop from network. ERADICATE: Delete malicious files, patch vulnerability. RECOVER: Restore from clean backup. |
| **4** | **Post-Incident Activity** | The learning phase. What went wrong? Update defences to prevent recurrence. | Hold blameless post-mortem. Update playbook to add attacker's fake domain to blocklist. Improve detection rules in SIEM. |

## 1.4 Incident Documentation — The 5 W's

> **NOTE: Why Documentation is Critical**
> During a breach, chaos is the enemy. Meticulous documentation ensures:
> * Accurate analysis (what actually happened vs. what people THINK happened)
> * Legal chain of custody (evidence must be handled correctly for court)
> * Post-incident learning (you cannot improve what you did not record)
> * Handoff continuity (shift change -- next analyst needs full context)
> Tool: An Incident Handler's Journal tracks all facts in real-time during the response.

| **W** | **Question** | **Example Answer** |
| --- | --- | --- |
| **WHO** | Who triggered the incident? Who is responsible? | Known ransomware gang: BlackCat/ALPHV. Initial access via phishing email to junior accountant. |
| **WHAT** | What happened? What systems were affected? | Customer database encrypted. 50,000 records potentially exfiltrated before encryption. |
| **WHERE** | Where did it take place? Which systems, locations? | Primary production database server (DB-PROD-01) in AWS us-east-1 region. |
| **WHEN** | When did it start? When was it detected? Timeline? | Attacker entered: Tuesday 02:14 AM. Encryption started: Tuesday 03:47 AM. Detected: Tuesday 08:23 AM (by employee). |
| **WHY** | Why did it succeed? What vulnerability was exploited? | Unpatched Apache Log4j vulnerability (Log4Shell, CVE-2021-44228) on public-facing web server used for initial access. |

## 1.5 Team Structures — CSIRT & SOC

### CSIRT — Computer Security Incident Response Team

> **NOTE**
> A cross-functional task force assembled to handle specific major security crises.
> Not a permanent 24/7 unit -- formed when a significant incident occurs and disbanded after resolution.
> 
> Security Analyst: Investigates the initial alert. Determines if it is a real incident.
> Technical Lead (Ops Lead): Directs the technical fix -- emergency patches, firewall rules, containment.
> Incident Coordinator: Manages the project timeline. Bridges to non-security departments.
> Example: If customer credit cards are stolen, Coordinator brings Legal (compliance) and
> PR (public disclosure) teams into the response to manage mandatory breach notifications.

### SOC — Security Operations Center

> **SOC HIERARCHY — From Frontline to Threat Hunters**  
> **SOC HIERARCHY (24/7 Blue Team):**

```
  +----------------------------------------------------------+
  | SOC MANAGER                                              |
  | Manages hiring, training, strategy, reports to CISO/CEO  |
  +----------------------------------------------------------+
              |
  +----------------------------------------------------------+
  | TIER 3 (L3) -- THREAT HUNTERS & ADVANCED ANALYSTS        |
  | Proactively hunt through millions of logs looking for    |
  | HIDDEN attackers that never triggered any alert.         |
  | Handle the most complex escalations from L2.             |
  +----------------------------------------------------------+
              |

  +----------------------------------------------------------+
  | TIER 2 (L2) -- DEEP INVESTIGATORS                        |
  | Receive escalated tickets from L1. Perform digital       |
  | forensics: extract malware, analyze what it did,         |
  | determine scope of breach. Write detailed reports.       |
  +----------------------------------------------------------+
              |
  +----------------------------------------------------------+
  | TIER 1 (L1) -- FRONTLINE ANALYSTS (Entry-Level)          |
  | Monitor alert queue. Investigate automated alerts.       |
  | Close false positives. Escalate real incidents to L2.    |
  | Most entry-level analyst roles start here.               |
  +----------------------------------------------------------+
```

## 1.6 Detection Tools — IDS, IPS, EDR

| **Tool** | **Type** | **What It Does** | **Action on Threat** | **Analogy** |
| --- | --- | --- | --- | --- |
| **IDS (Intrusion Detection System)** | Passive monitoring | Watches network traffic or host activity. Compares against signatures or baselines. | Generates ALERT only. Does NOT block or stop the threat. | Security camera: records the burglar and sends you a notification, but doesn't lock the door. |
| **IPS (Intrusion Prevention System)** | Active blocking | Watches traffic inline (all traffic passes through it). Detects threats in real-time. | Automatically BLOCKS/DROPS malicious traffic without human intervention. | Automated steel shutter: detects broken window, slams shut instantly to block entry. |
| **EDR (Endpoint Detection & Response)** | Host-based AI defense | Installed directly on individual devices. Uses AI behavioral analysis, not just signatures. | Detects anomalous behavior, kills malicious process, isolates device from network. | An Excel file trying to open a terminal and delete system files = abnormal behavior. EDR kills it instantly. |

> **TIP: IDS Tools to Know**
> Zeek: Open-source network analysis framework. Excellent for traffic logging and protocol analysis.
> Suricata: Open-source IDS/IPS/NSM. Signature-based + anomaly. Integrates with SIEM tools.
> Snort: Classic open-source IDS/IPS. Widely deployed. Large community rule library.

## 1.7 The 4 Signal Triage States

> **KEY CONCEPT: Every security alert falls into exactly one of these four categories:**
> Analysts must correctly classify every alert. Incorrect classification causes missed breaches or wasted resources.

> **4 SIGNAL TRIAGE STATES — TP / TN / FP / FN Matrix**  
> **THREAT ACTUALLY PRESENT?**  
> **YES            NO**

```
               +----------+   +----------+
  ALERT YES   |   TRUE   |   |  FALSE   |
  FIRES?       | POSITIVE |   | POSITIVE |
               | (TP)     |   | (FP)     |
               +----------+   +----------+
               +----------+   +----------+
  ALERT NO    |   FALSE  |   |   TRUE   |
  FIRES?       | NEGATIVE |   | NEGATIVE |
               | (FN)     |   | (TN)     |
               +----------+   +----------+

  TP (True Positive): Alarm fires + real hacker present. CORRECT detection.
  TN (True Negative): No alarm + no threat. System correctly silent. CORRECT.
  FP (False Positive): Alarm fires but NO real threat. IT admin ran backup.
     Danger: Alert fatigue. Analysts start ignoring alarms.
  FN (False Negative): NO alarm + real threat present. Zero-day bypassed IDS.
     Danger: WORST CASE. Company is completely blind to active breach.
```

## 1.8 SIEM vs. SOAR — The Operations Backbone

> **SIEM + SOAR — How They Work Together**  
> **SIEM (Security Information and Event Management)**  
> **'THE DASHBOARD'**

```
  +----------------------------------------------------------+
  | STEP 1: COLLECT & AGGREGATE                              |
  | Pull raw data from: firewalls, routers, laptops, servers |
  | into one massive centralized database.                   |
  +----------------------------------------------------------+
  | STEP 2: NORMALIZE (Parsing)                              |
  | Convert logs from different vendors (Cisco, Windows, Mac)|
  | into one universal language for unified searching.       |
  | Parsing: 'Failed password from 192.168.1.5' becomes:     |
  |   Event=Failed_Login, IP=192.168.1.5, Time=14:32:01      |
  +----------------------------------------------------------+
  | STEP 3: CORRELATE & ALERT                                |
  | Connect the dots across separate events.                 |
  | Example: 5 failed logins on web server + 1 success on DB |
  | from SAME IP = one high-priority brute force alert.      |
  +----------------------------------------------------------+

  SOAR (Security Orchestration, Automation, and Response)
  'THE AUTOPILOT'
  +----------------------------------------------------------+
  | SIEM triggers alert for malicious IP address.            |
  | SOAR receives alert, runs automated playbook:            |
  |   1. Looks up IP in threat intelligence feeds            |
  |   2. Logs into firewall, adds block rule                 |
  |   3. Opens ServiceNow incident ticket                    |
  |   4. Sends Slack alert to SOC team                       |
  | Total time: 3 seconds. Manual equivalent: 20 minutes.    |
  +----------------------------------------------------------+
```

## 1.9 Module 1 Quick Review

| **Question** | **Answer** |
| --- | --- |
| **Event vs. Security Incident?** | Event = observable occurrence (any). Incident = event that jeopardizes CIA OR violates security policy. All incidents are events, not all events are incidents. |
| **NIST 4 phases?** | 1-Preparation, 2-Detection & Analysis, 3-Containment/Eradication/Recovery, 4-Post-Incident Activity. Non-linear loop -- phases can overlap. |
| **5** **W's** **of incident documentation?** | Who (attacker/victim), What (happened), Where (systems/location), When (timeline), Why (root cause/vulnerability). |
| **CSIRT vs. SOC?** | CSIRT: cross-functional task force for major crises, temporary. SOC: dedicated 24/7 unit for ongoing network defense (Blue Team). |
| **IDS vs. IPS vs. EDR?** | IDS: detects + alerts only (passive). IPS: detects + blocks automatically (active, inline). EDR: on-device behavioral AI, detects + isolates endpoint. |
| **True Positive vs. False Negative?** | TP: alarm fires AND real threat exists (correct detection). FN: alarm stays silent BUT real threat exists (worst case -- company is blind to breach). |
| **SIEM vs. SOAR?** | SIEM: aggregates/normalizes/correlates logs, generates alerts (the dashboard). SOAR: auto-executes response playbooks when SIEM fires alerts (the autopilot). |

**MODULE 2**

# Network Monitoring and Analysis

## 2.1 Baselines — Knowing Normal to Find Abnormal

> **KEY CONCEPT: Baseline = Reference Point for Normal Behavior**
> You cannot identify suspicious activity without knowing what NORMAL looks like first.
> 
> Baseline Example: A North American company normally has peak traffic 9AM-5PM weekdays.
> A multi-gigabyte transfer triggering at 2AM on a Sunday is OFF-BASELINE -- flagged for investigation.
> 
> Grocery Budget Analogy: Your baseline is $100/week on groceries.
> If you see a $500 charge in one week, you INSTANTLY know something is wrong.
> Without the $100 baseline reference, the $500 charge means nothing.

| **Concept** | **Definition** | **Security Significance** |
| --- | --- | --- |
| **Network Traffic** | Total volume/amount of data moving across a network, including protocol types (HTTP, DNS, etc.). | Sudden 10x spike in traffic = possible DDoS attack or data exfiltration in progress. |
| **Network Data** | The actual payload content transmitted between specific devices. | Encrypted payloads are decrypted at the perimeter to verify internal data is not being silently sent to attackers. |
| **Baseline** | A reference point of expected normal behavior for systems, devices, and networks. | Without baseline, analysts cannot distinguish normal from malicious traffic patterns. |
| **Temporal Patterns** | Time-based characteristics embedded within network communication packets. | Massive data transfers at 2AM = off-baseline by time. Triggers investigation even if volume alone looks normal. |
| **Flow Analysis** | Examining movement of network communications including metadata, protocols, and port usage. | Detects C2 (Command & Control) traffic: e.g., malware communicating via HTTPS but on PORT 8088 instead of 443. |

## 2.2 SOC vs. NOC — Different Goals, Same Network

| **Feature** | **SOC (Security Operations Center)** | **NOC (Network Operations Center)** |
| --- | --- | --- |
| **Primary Focus** | Maintaining security posture. Defending against threats and adversaries. | Maintaining network PERFORMANCE, speed, availability, and hardware uptime. |
| **Daily Tasks** | Monitoring for IoCs, identifying intrusions, isolating threats, threat hunting. | Monitoring congestion, routing loops, hardware degradation, responding to outages. |
| **Key Metrics** | Mean Time to Detect (MTTD), Mean Time to Respond (MTTR), incidents resolved. | Network uptime %, latency, packet loss, bandwidth utilization, hardware health. |
| **Alert Sources** | SIEM alerts, IDS signatures, threat intelligence feeds. | Network monitoring tools (Nagios, PRTG), hardware sensors, performance dashboards. |
| **When They Collaborate** | A DDoS attack affects BOTH security AND network performance -- both SOC and NOC respond together. | Major network outage may have a security component -- NOC loops in SOC to rule out attack. |

## 2.3 Data Exfiltration — 6-Stage Attack Lifecycle

> **NOTE: What is Data Exfiltration?**
> The unauthorized transmission of data FROM a system to an external destination controlled by the attacker.
> This is typically the END GOAL of most sophisticated attacks -- getting the data out.
> Defenders must detect and stop exfiltration at ANY of the 6 stages below.

> **DATA EXFILTRATION — 6-Stage Attack with Detection Windows**  
> **DATA EXFILTRATION ATTACK LIFECYCLE:**  
> **STAGE 1: INITIAL ACCESS**

```
  +--------------------------+
  | Attacker gains foothold  |
  | via phishing, exploit,   |  --> STAGE 2: LATERAL MOVEMENT
  | or credential theft.     |  +--------------------------+
  +--------------------------+  | 'Pivoting' -- attacker   |
                                | moves across the network,| --> STAGE 3: ASSET DISCOVERY
                                | compromising more systems| +--------------------------+
                                +--------------------------+ | Scan for shares, repos,  |
                                                             | databases, file servers. |
                                                             +-----------+--------------+
                                                                         |
                                                                         v
  STAGE 6: EXFILTRATION                                     STAGE 4: DATA CONSOLIDATION
  +--------------------------+                               +--------------------------+
  | Data sent to attacker's  |  <-- STAGE 5: BYPASS          | Package/compress stolen  |
  | server via: email, C2    |  +--------------------------+ | data. Reduce file size   |
  | channel, cloud storage.  |  | Compress data to bypass  | | to evade size alerts.    |
  +--------------------------+  | size-based controls.     | +--------------------------+
                                +--------------------------+

  DETECTION WINDOWS (when to catch it):
  Stage 1: Email gateway (block phishing). IPS (block exploit).
  Stage 2: IDS anomaly (unusual lateral traffic). Network segmentation.
  Stage 3: SIEM alert (unusual scan patterns inside network).
  Stage 4: DLP (data loss prevention -- large internal file copies).
  Stage 5/6: Firewall (block unknown external IPs). SIEM outbound alerts.
```

## 2.4 Packet Anatomy — Header, Payload, Footer

> **PACKET ANATOMY — Header / Payload / Footer**  
> **ANATOMY OF A NETWORK DATA PACKET:**

```
  +----------------------------------------------------------------+
  | HEADER (20-60 bytes)                                           |
  | Contains routing and control information:                      |
  |   Source IP: 192.168.1.10    Destination IP: 10.0.0.5          |
  |   Protocol: TCP (6)          TTL: 64                           |
  |   Length: 250 bytes          ID/Flags: for fragmentation       |
  |   Checksum: 0x4A2B           ToS: 0x00                          |
  +----------------------------------------------------------------+
  | PAYLOAD (variable size)                                        |
  | The ACTUAL data being transmitted:                             |
  |   Website HTML content, image bytes, file data,                |
  |   email body text, database query results.                     |
  |   Often ENCRYPTED (TLS) -- appears as ciphertext.              |
  +----------------------------------------------------------------+
  | FOOTER / TRAILER (Layer 2 only)                                |
  | Frame Check Sequence (FCS) for error detection.                |
  | Used by Ethernet (Layer 2). IP (Layer 3) does NOT use footers. |
  +----------------------------------------------------------------+

  PCAP FILES (.pcap): Snapshots of captured packets stored on disk.
  libpcap: Unix/Linux/macOS packet capture library (used by tcpdump).
  WinPcap/Npcap: Windows packet capture library (used by Wireshark).
```

## 2.5 tcpdump — Command-Line Packet Analysis

> **KEY CONCEPT: What is** **tcpdump?**
> A lightweight, command-line network protocol analyzer preinstalled on Linux and macOS.
> Security analysts use it to capture live traffic or read saved .pcap files for forensic analysis.
> **IMPORTANT:** Run with sudo (requires root to access network interfaces).
> **CRITICAL:** Always use -n/-nn flags when investigating live incidents to avoid alerting attackers via DNS lookups.

> **tcpdump FLAG REFERENCE**  
> **CORE tcpdump FLAGS REFERENCE:**  
> **FLAG    FUNCTION                    SECURITY CONTEXT**

```
  ------  --------------------------  ----------------------------------------
  -i any  Capture on ALL interfaces   Catches traffic on every network card
  -i eth0 Capture on specific NIC     Isolate traffic on one interface
  -v      Verbose output              Shows IP headers, TTL, ToS fields
  -vv     More verbose                Adds TCP/UDP details
  -vvv    Maximum verbose             Full packet dissection
  -c N    Capture N packets only      Stop after N packets (prevents overrun)
  -w file Write to .pcap file         Save capture for offline forensic review
  -r file Read from .pcap file        Replay saved capture for analysis
  -n      Disable HOST resolution     NO reverse DNS lookup (critical!)
          (IP stays as IP)            Prevents alerting attacker's DNS servers
  -nn     Disable HOST+PORT resolv.   Ports shown as numbers, not protocol names
          (port 80 stays as 80)       Reveals port-protocol mismatches (C2)
  -D      List available interfaces   Find which NICs are available to sniff
```

> **tcpdump COMMANDS & OUTPUT FORMAT**  
> **COMMON tcpdump COMMANDS:**  
> **CAPTURE LIVE TRAFFIC (1 packet, verbose, all interfaces):**  
> **sudo tcpdump -i any -v -c 1**  
> **CAPTURE AND SAVE TO FILE (forensic capture):**  
> **sudo tcpdump -i any -w capture.pcap**  
> **READ SAVED PCAP FILE (offline analysis):**  
> **sudo tcpdump -r capture.pcap -nn**  
> **FILTER BY IP AND PORT (focus on web traffic from specific host):**  
> **sudo tcpdump -r capture.pcap -nn 'ip and host 192.168.1.5 and port 80'**  
> **FILTER BY MULTIPLE PORTS (HTTP and HTTPS traffic only):**  
> **sudo tcpdump -r capture.pcap -nn 'ip and (port 80 or port 443)'**  
> **EXCLUDE KNOWN CLEAN HOST (ignore noise):**  
> **sudo tcpdump -r capture.pcap -nn 'not host 10.0.0.1'**  
> **READING tcpdump OUTPUT LINE:**  
> **12:04:15.123456 IP 192.168.1.10.53142 > 10.0.0.5.80: Flags [P.], seq 101:250**  
> **|               |  |                    |             |          |**

```
  |               |  |                    |             |          +-- Sequence numbers
  |               |  |                    |             +-- [P.] = PUSH+ACK (data flowing)
  |               |  |                    +-- Destination IP.Port
  |               |  +-- Source IP.Port (port appended with dot)
  |               +-- Protocol (IP = IPv4)
  +-- Timestamp (HH:MM:SS.microseconds)

  TCP FLAGS: [S]=SYN  [.]=ACK  [S.]=SYN-ACK  [P.]=PUSH+ACK  [F.]=FIN  [R]=RST
```

## 2.6 Command and Control (C2) Detection

> **IMPORTANT: What is C2 and Why is it Hard to Detect?**
> Command and Control (C2): The techniques attackers use to send commands to and receive data from compromised systems inside a network.
> 
> The Challenge: Attackers use LEGITIMATE-LOOKING protocols to blend in with normal traffic.
> 
> **Classic C2 Evasion Example:**
> Port 443 = universally allowed for HTTPS traffic. Everyone uses it. Easy to hide in.
> Attacker configures malware to communicate using HTTPS protocol but on PORT 8088.
> Standard firewall rule: 'Allow all port 443, allow all port 8088' -- both pass through.
> 
> **DETECTION via Flow Analysis:**
> Analyst runs: sudo tcpdump -r capture.pcap -nn 'port 8088'
> Sees HTTPS handshake on non-standard port. Protocol/port MISMATCH = suspicious.
> Normal HTTPS uses port 443. HTTPS on 8088 from an internal workstation = investigate.
> 
> **Why -nn** **flag is CRITICAL for C2 investigations:**
> Without -nn: tcpdump queries attacker's DNS server to resolve their IP to a name.
> This TELLS the attacker their infrastructure is under investigation. They disappear.
> With -nn: No DNS queries made. Analyst stays invisible to the attacker.

## 2.7 Module 2 Quick Review

| **Question** | **Answer** |
| --- | --- |
| **What is** **a baseline** **and why does it matter?** | A reference point of normal behavior. Without it, you cannot identify what is abnormal. Example: 2AM multi-GB transfer = off-baseline by temporal pattern. |
| **SOC vs. NOC?** | SOC: security posture (threats, intrusions, defense). NOC: network performance (uptime, speed, hardware). DDoS attack requires both to respond. |
| **6 stages of data exfiltration?** | Initial Access -> Lateral Movement -> Asset Discovery -> Data Consolidation -> Bypass Controls -> Exfiltration. |
| **Packet Header vs. Payload vs. Footer?** | Header: routing info (IPs, TTL, protocol). Payload: actual data content (often encrypted). Footer: error-checking (Layer 2 only, Ethernet). |
| **tcpdump** **-n vs. -nn?** | -n: disables hostname resolution (IP stays as IP). -nn: disables BOTH hostname AND port resolution (port 80 stays 80, not 'HTTP'). -nn essential to avoid alerting attacker's DNS. |
| **What is C2 traffic and how do you detect it?** | Attacker communicates with infected systems using legitimate protocols on non-standard ports (e.g., HTTPS on port 8088). Detected via flow analysis looking for port-protocol mismatches. |
| **What is a .pcap** **file?** | A Packet Capture file -- a snapshot of network packets saved to disk. Used by tcpdump (-w to write, -r to read) and Wireshark for offline forensic analysis. |

**MODULE 3**

# Incident Investigation and Response

## 3.1 Proactive Detection Methods — Beyond Automated Tools

| **Method** | **What It Is** | **How It Works** | **Advantage** **Over Automated Tools** |
| --- | --- | --- | --- |
| **Threat Hunting** | Proactive, human-driven search for hidden threats. | Analysts actively search systems/logs for malicious activity that BYPASSED security tools. No alert required to start. | Finds advanced threats (APTs, fileless malware) that never trigger any automated alerts. Catches what automation misses. |
| **Threat Intelligence** | Evidence-based information about existing/emerging threats. | Industry reports, government advisories, threat data feeds (malicious IPs, file hashes). Aggregated by a Threat Intelligence Platform (TIP). | Provides CONTEXT -- who is attacking similar organizations, what tools they use, what indicators to look for. |
| **Cyber Deception (Honeypots)** | Deliberately fake, vulnerable-looking decoy systems. | Honeypots have ZERO legitimate business purpose. Any interaction = automatic high-priority malicious alert. Zero false positives. | Perfect detection rate for anything touching it. Attackers reveal their TTPs by trying to exploit honeypots. |

## 3.2 IoC vs. IoA — What You Are Looking At

> **KEY CONCEPT**
> IoC (Indicator of Compromise): Evidence that a breach HAS ALREADY happened.
> **Focus:** The WHO and WHAT. Forensic artifacts left behind.
> **Examples:** Malicious file hash found on disk, known attacker IP in firewall log, suspicious registry key.
> 
> IoA (Indicator of Attack): Evidence of a REAL-TIME, UNFOLDING attack.
> **Focus:** The WHY and HOW. Behavioral signals of active malicious intent.
> **Examples:** Unknown process actively executing arbitrary code, lateral movement in progress, C2 beacon firing.
> 
> **Key Difference:** IoCs = post-event forensics. IoAs = real-time behavioral detection.
> IoAs require faster response -- the attack is HAPPENING NOW. IoCs help you understand WHAT happened.

## 3.3 The Pyramid of Pain — Prioritizing Threat Intelligence

> **NOTE: What the Pyramid Shows**
> Different types of threat indicators cause different levels of 'pain' (difficulty) to attackers when defenders block them.
> The HIGHER on the pyramid, the MORE VALUABLE and HARDER to replace the indicator is.
> Blocking a hash (bottom) = trivial for attacker to bypass. Blocking their TTPs (top) = breaks their entire methodology.

> **PYRAMID OF PAIN — Indicator Value vs. Attacker Difficulty**  
> **PYRAMID OF PAIN:**  
> **/\**  
> **/  \**  
> **/ 6  \  TTPs (Tactics, Techniques, Procedures)**  
> **/TOUGH,\  Complete behavioral footprint. Breaking TTPs**

```
                /--------\  forces attacker to rethink EVERYTHING.
               /    5     \
              /CHALLENGING \  TOOLS -- Software utilities (password crackers,
             /              \  exploit frameworks). Must engineer custom code.
            /----------------\
           /         4        \
          /       ANNOYING     \  NETWORK/HOST ARTIFACTS -- Custom registry keys,
         /                      \  user-agent strings. Forces script rewrites.
        /------------------------\
       /            3             \
      /           SIMPLE           \  DOMAIN NAMES -- Attackers use DGA to generate
     /                              \  hundreds of new domains instantly.
    /--------------------------------\
   /                 2                \
  /                 EASY               \  IP ADDRESSES -- Attackers swap proxy/VPN
 /                                      \  nodes in minutes.
/========================================\
                     1                    HASH VALUES -- Trivial. Change 1 byte
                  TRIVIAL                 of malware = completely new hash.

  ANALYST STRATEGY: Focus on collecting TTPs and Tools -- maximum attacker pain.
  Hash values expire quickly. TTPs remain consistent across campaigns.
```

## 3.4 Alert Triage — 3-Step Process

> **NOTE: What is Triage?**
> SOC analysts face THOUSANDS of alerts daily. Triage = prioritizing which to investigate first.
> Without triage, analysts waste time on low-priority noise while critical incidents go uninvestigated.

| **1** | **Receive and Assess**<br>Review the incoming alert for initial validity. Is it a known false positive? Was it triggered by a scheduled maintenance task? Verify the alert has enough context to investigate. If it is obviously a false positive, document and close it. |
| --- | --- |

| **2** | **Assign Priority — Based on Three Impact Factors**<br>Functional Impact: Does the incident disrupt business operations? (e.g., ransomware disabling systems = CRITICAL). Information Impact: Was sensitive data accessed, stolen, or modified? (e.g., PII exfiltrated = CRITICAL). Recoverability: Can the organization recover? Is recovery worth the time and cost? (deleted backups = HIGH). |
| --- | --- |

| **3** | **Collect and Analyze Evidence**<br>Gather all available evidence. Review logs, pull PCAP files, query SIEM for correlated events. Conduct external research (VirusTotal, threat intel feeds). Add context: Did the failed login happen outside working hours? From a foreign country? Does the IP match known malicious infrastructure? Make an informed escalation decision. |
| --- | --- |

## 3.5 VirusTotal — Crowdsourced Threat Intelligence

> **IMPORTANT: WARNING: Never upload customer data, PII, or intellectual property to** **VirusTotal.**
> Data uploaded to VirusTotal is PUBLICLY SHARED with all subscribers worldwide.

| **Tab** | **What It Shows** | **Security Analyst Use** |
| --- | --- | --- |
| **Detection** | Results from 70+ security vendor engines that analyzed the file/URL/IP. | See how many vendors flag it as malicious. 40/70 vendors = very likely malicious. 2/70 = possible false positive. |
| **Details** | Static metadata: file hashes (MD5, SHA256), file size, headers, creation timestamps, compilation date. | Verify file hashes match known malware signatures. Check if file was compiled just before attack (fresh malware). |
| **Relations** | Network connections: contacted domains, IP addresses, URLs associated with the file. | Map attacker infrastructure. Find other malicious domains hosted on same IP. Build the full C2 network picture. |
| **Behavior** | Sandboxed execution: registry writes, files created/deleted, processes spawned, network calls made. | See exactly WHAT the malware does when it runs. Identify persistence mechanisms, C2 channels, lateral movement tools. |
| **Community** | Comments and analysis from the global security research community. | Check if other analysts have already documented this sample. Get attribution (which threat group used it). |

## 3.6 Chain of Custody — Legal Evidence Handling

> **IMPORTANT: Why Chain of Custody Matters**
> If a breach results in criminal prosecution, digital evidence must be collected and handled correctly.
> A broken chain of custody = evidence is INADMISSIBLE in court = attacker walks free.
> Every person who touches the evidence must be documented, timestamped, and signed.

> **CHAIN OF CUSTODY — Forensic Evidence Handling**  
> **CORRECT FORENSIC EVIDENCE HANDLING STEPS:**  
> **STEP 1: WRITE PROTECTION**

```
  +--------------------------------------------------+
  | Use a hardware write-blocker on the device.      |
  | Prevents ANY data from being written or changed  |
  | on the original evidence drive.                  |
  +--------------------------------------------------+
                        |
                        v
  STEP 2: CRYPTOGRAPHIC HASHING (Evidence Seal)
  +--------------------------------------------------+
  | Hash the drive image BEFORE copying.             |
  | SHA-256 hash = permanent digital fingerprint.    |
  | If hash changes later = evidence was tampered.   |
  +--------------------------------------------------+
                        |
                        v
  STEP 3: FORENSIC COPY (Work on the Copy, Never Original)
  +--------------------------------------------------+
  | Create a bit-for-bit forensic copy.              |
  | Hash the copy to verify it matches original.     |
  | ALL analysis is performed on the COPY.           |
  +--------------------------------------------------+
                        |
                        v
  STEP 4: CONTINUOUS LOGGING
  +--------------------------------------------------+
  | Log EVERY physical or digital transfer:          |
  |   Who touched it, when, why, what they did.      |
  | Any gap = BROKEN CHAIN OF CUSTODY.               |
  | Result: Evidence excluded from court proceedings.|
  +--------------------------------------------------+
```

## 3.7 Playbook Types — Manual, Automated, Semi-Automated

| **Playbook Type** | **How It Works** | **Time to Resolution** | **Best For** |
| --- | --- | --- | --- |
| **Non-Automated (Manual)** | Human analyst follows a step-by-step flowchart or checklist. Every action requires manual execution. | Slowest. Minutes to hours depending on complexity and analyst experience. | Novel incidents without established automation. Complex decisions requiring human judgment. |
| **Automated (SOAR-driven)** | Software executes entire response without any human involvement. SIEM alert triggers SOAR playbook automatically. | Fastest. Seconds to minutes. 20-minute manual job done in 3 seconds. | High-volume, well-understood, repetitive incidents. IP blocking, account lockouts, ticket creation. |
| **Semi-Automated (Hybrid)** | Tedious background tasks are automated (log collection, IP lookups, ticket creation). Analyst focuses on complex analysis and decisions. | Balanced. Automation handles 80% of work. Analyst provides 20% final judgment. | Most enterprise SOC workflows. Maximizes analyst efficiency on what humans do best. |

## 3.8 Business Continuity & Site Resilience

| **Plan/Site** | **What It Is** | **Purpose** | **When** **Activated** |
| --- | --- | --- | --- |
| **Business Continuity Plan (BCP)** | Document outlining procedures to sustain business operations DURING and after a disruption. | Keep the business running even if key systems are compromised or offline. | During any significant disruption: ransomware, major breach, natural disaster, power outage. |
| **Disaster Recovery Plan (DRP)** | Focuses specifically on restoring IT infrastructure and data after a major disaster. | Return IT systems to operational state after physical destruction or catastrophic failure. | After fire, flood, hardware failure, or extended breach causing infrastructure loss. |
| **Hot Site** | Fully operational duplicate facility. Identical equipment, data synced in real-time. | Immediate failover with ZERO downtime. Business continues without interruption. | When zero downtime is required (financial trading, healthcare, emergency services). |
| **Warm Site** | Fully updated and configured facility but requires brief setup time to bring online. | Moderate failover. Hours to days to activate. Lower cost than hot site. | When some downtime is acceptable. Good balance of cost and recovery speed. |
| **Cold Site** | Basic backup facility with power and cooling but no equipment or data loaded. | Lowest cost option. Requires extensive setup before any operations can resume. | For non-critical operations where days/weeks of downtime are acceptable. |

## 3.9 Post-Incident Activity — Lessons Learned & Final Report

> **NOTE: Lessons Learned Meeting (Post-Mortem)**
> **WHEN:** No later than TWO WEEKS after incident resolution.
> **WHO:** ALL parties involved in the response (analysts, management, IT, legal, PR if applicable).
> **TONE:** BLAMELESS. Goal is to improve systems and processes, not punish individuals.
> 
> **Key Questions Asked:**
> * What detection gaps allowed the attacker to remain undetected?
> * Were playbooks followed correctly? Were they adequate?
> * What could have reduced Time to Detect (TTD) or Time to Respond (TTR)?
> * What controls would have prevented the initial access?
> 
> **Output:** Updated playbooks, new SIEM correlation rules, improved training, new controls.

| **Final Report Section** | **Purpose** | **Content** |
| --- | --- | --- |
| **Executive Summary** | High-level overview for business leadership and board. Non-technical language. | What happened, business impact, immediate actions taken, current status. |
| **Timeline** | Chronological sequence of events mapping the complete attack lifecycle. | Timestamps from first attacker action to detection to containment to recovery. |
| **Investigation** | Compilation of all forensic artifacts, analysis steps, and technical findings. | Malware samples, IOCs found, systems affected, attacker TTPs identified. |
| **Recommendations** | Prioritized action items to prevent recurrence. Ranked by risk and effort. | Patch specific CVE, implement MFA on VPN, add SIEM correlation rule for C2 beacon pattern. |

## 3.10 Module 3 Quick Review

| **Question** | **Answer** |
| --- | --- |
| **IoC vs.** **IoA?** | IoC: forensic evidence a breach ALREADY happened (who/what -- malicious file hash, attacker IP). IoA: real-time signal of ACTIVE attack (why/how -- unknown process executing code right now). |
| **Pyramid of Pain top vs. bottom?** | Bottom (trivial): hash values (attacker changes 1 byte). Top (tough): TTPs (attacker must change entire methodology). Focus intelligence on TTPs for maximum impact. |
| **3 triage steps?** | 1-Receive & Assess (real or false positive?), 2-Assign Priority (functional/information/recoverability impact), 3-Collect & Analyze (gather evidence, add context, escalate). |
| **What is a honeypot?** | A decoy system with zero legitimate business purpose. Any interaction = automatic malicious alert. Zero false positives because no real user should ever touch it. |
| **What is the Chain of Custody?** | Documentation of every person who handled evidence, when, and what they did. Broken chain = evidence inadmissible in court. Attacker goes free. |
| **Hot vs. Warm vs. Cold Site?** | Hot: fully operational, instant failover (zero downtime). Warm: configured, needs hours to activate. Cold: basic facility, needs days/weeks of setup before use. |
| **What** **is** **the Lessons Learned Meeting?** | Blameless post-mortem held within 2 weeks of incident resolution. All parties review what happened and generate recommendations to improve playbooks and controls. |

**MODULE 4**

# Network Traffic and Logs Using IDS and SIEM Tools

## 4.1 Logs vs. Telemetry

| **Concept** | **Definition** | **Format** | **Forensic Use** |
| --- | --- | --- | --- |
| **Telemetry** | Live streams of raw computing states or active data transiting a network. | Raw .pcap files, live packet streams, memory dumps. | Real-time analysis of active sessions. See live attack as it happens. |
| **Log** | An unalterable, retrospective text record created AFTER a discrete event has completed. | Structured text files: JSON, Syslog, XML, CEF, CSV. | Reconstruct attack timeline. Answer the 5 W's of the incident post-event. |

> **IMPORTANT: Why NOT** **to Log** **Everything**
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

## 4.2 Log Formats — Reading Different Vendor Syntaxes

> **NOTE: Why Analysts Must Know Multiple Log Formats**
> Enterprise environments have mixed hardware: Linux servers, Windows DCs, Cisco firewalls, AWS cloud.
> Each vendor outputs logs in a different format. Analysts must read them all during an investigation.
> SIEM normalization converts all formats to a unified schema -- but raw log reading is essential for forensics.

### JSON — JavaScript Object Notation (Cloud & APIs)

> **JSON LOG FORMAT**
> **WHEN SEEN:** Cloud environments, web APIs, modern applications, Suricata eve.json
> **STRUCTURE:** Key-value pairs enclosed in curly braces {}.
> Strings in double quotes. Arrays in square brackets [].
> 
> {
> "Alert_ID": 9482,
> "Classification": "Malware_Execution",
> "Timestamp": "2026-05-21T17:45:15.892Z",
> "Source_IP": "192.168.10.45",
> "Impacted_Assets": ["PROD-DB-01", "PROD-APP-02"]
> }
> 
> **READING:** Alert 9482 classified as Malware_Execution at 17:45.
> Source IP 192.168.10.45 affected two production servers.

### Syslog — Linux, Unix, Network Devices

> **SYSLOG FORMAT**  
> **WHEN SEEN: Linux servers, routers, firewalls, switches, Kubernetes nodes.**  
> **STRUCTURE: Starts with Priority Field (PRI) in angle brackets <>.**  
> **Lower PRI number = HIGHER urgency/severity.**  
> **<236>1 2026-05-21T17:50:02.003Z k8s-worker-node1 kubelet - ID88 Container sandbox execution blocked.**  
> **|    | |                       | |                |       | |    |**

```
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

```

```

### CEF — Common Event Format (Security Appliances)

> **CEF LOG FORMAT**  
> **WHEN SEEN: Firewalls, WAFs, IDS/IPS appliances, ArcSight SIEM.**  
> **STRUCTURE: Fields separated by pipe characters |. Key-value pairs after.**  
> **CEF:1|PaloAlto|ThreatAppliance|10.0|1012|SQL Injection Attempt Blocked|10|src=192.168.10.45 dst=172.21.224.5**  
> **|    | |        |              |    |    |                              |  |**

```
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

## 4.3 IDS Architecture — HIDS vs. NIDS

| **Type** | **Full Name** | **Where It Sits** | **What It Monitors** | **Blind Spots** |
| --- | --- | --- | --- | --- |
| **HIDS** | Host-Based IDS | Installed directly ON the monitored device (laptop, server). | Process executions, file integrity, memory injections, registry changes on ONE machine. | Cannot see network traffic between other devices. Single host perspective only. |
| **NIDS** | Network-Based IDS | At network choke points (perimeter, core switches). Sees all traffic. | Raw packet payloads across the wire for all devices. Network-wide visibility. | Cannot see what happens INSIDE encrypted payloads (unless TLS inspection). Cannot see host-level activity. |

| **Detection Method** | **How It Works** | **Strength** | **Weakness** |
| --- | --- | --- | --- |
| **Signature-Based** | Compares traffic against a library of known attack patterns (signatures). Like antivirus -- looks for known malware fingerprints. | Very LOW false-positive rate. Fast. Well-understood. Vendor-maintained rule libraries. | COMPLETELY BLIND to zero-day exploits. If no signature exists, it passes through. |
| **Anomaly-Based** | Training Phase: Learn normal behavior baseline. Detection Phase: Flag deviations from baseline. | Can detect UNKNOWN zero-day attacks by recognizing abnormal behavior patterns. | HIGH false-positive rate. Legitimate business changes (new software, new employee) look like attacks. |

## 4.4 Suricata — Writing IDS/IPS Rules

> **NOTE: What is Suricata?**
> Open-source IDS/IPS/Network Security Monitoring (NSM) tool.
> Maintained by the Open Information Security Foundation (OISF).
> Integrates directly with SIEM tools (Splunk, Chronicle, Elastic Stack).
> Can operate as IDS (alert only) OR IPS (alert + block) depending on configuration.

> **SURICATA RULE ANATOMY**  
> **SURICATA RULE ANATOMY:**  
> **alert http $HOME_NET any -> $EXTERNAL_NET any (msg:"GET on wire"; flow:established,to_server; content:"GET"; sid:12345; rev:3;)**  
> **|     |    |          |  |  |             |   |                                                                               |**

```
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

> **SURICATA LOG FILES &** **jq** **PARSING**
> **SURICATA LOG FILES:**
> 
> **fast.log:** Legacy minimal plaintext format. Quick human reading.
> **Format:** date+time [**] [sid] msg [**] [Classification] [Priority]
> **Example:** 05/21-17:45:15.123 [**] [1:12345:3] GET on wire [**] [Priority: 2]
> **Limitation:** No flow_id. Cannot correlate multiple alerts to same session.
> 
> **eve.json:** Production-standard JSON format. Use this for SIEM integration.
> **Contains:** timestamp, flow_id, src_ip, dest_ip, protocol, alert.signature
> **flow_id:** Unique integer key correlating ALL alerts from the same network session.
> 
> **PARSING** **eve.json** **WITH** **jq** **(command-line JSON processor):**
> 
> **# Extract key fields (compact format):**
> jq -c "[.timestamp, .flow_id, .alert.signature]" /var/log/suricata/eve.json
> 
> **# Reconstruct complete session by** **flow_id:**
> jq "select(.flow_id == 14500150016149)" /var/log/suricata/eve.json

## 4.5 SIEM Query Engineering

### Splunk — Search Processing Language (SPL)

> **TIP: SPL Core Concept**
> SPL pipes (|) the output of one command directly into the input of the next.
> OPTIMIZATION MANDATE: Always specify index= and time range. Vague global scans cause massive latency.

> **SPL QUERY STRUCTURE & EXAMPLES**  
> **SPL QUERY STRUCTURE:**  
> **index=buttercupgames error OR fail* host!=www1 | chart count by host**  
> **|                   |         |    |           |**

```
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

## 4.6 Wazuh — Open-Source SIEM

> **NOTE: What is** **Wazuh?**
> Free, open-source security analytics engine. Powerful alternative to expensive commercial SIEMs.
> Collects logs from endpoints via Filebeat agents. Provides threat detection, compliance, and incident response.
> Integrates with Elasticsearch and Kibana for visualization (the ELK Stack).

> **WAZUH FILEBEAT CONFIGURATION**  
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

## 4.7 Complete Course 6 Glossary

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
| **Pcap** **(.pcap)** | Packet Capture file. A snapshot of network packets saved to disk for offline forensic analysis. Created by tcpdump (-w flag) and Wireshark. |
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

## 4.8 Complete Flashcard Review — All Modules

| **Question** | **Answer** |
| --- | --- |
| **Event vs. Security Incident?** | Event = any observable occurrence. Security Incident = event that jeopardizes CIA or violates policy. ALL incidents are events; NOT all events are incidents. |
| **NIST 4 phases?** | 1-Preparation (before attack), 2-Detection & Analysis (is it real?), 3-Containment/Eradication/Recovery (stop, remove, restore), 4-Post-Incident Activity (learn). Non-linear loop. |
| **CSIRT vs. SOC?** | CSIRT: cross-functional task force for specific major crises (temporary). SOC: dedicated 24/7 team for ongoing network defense monitoring (permanent Blue Team). |
| **IDS vs. IPS vs. EDR?** | IDS: detects+alerts only, passive. IPS: detects+blocks automatically, active inline. EDR: on-device behavioral AI, detects abnormal behavior, isolates endpoint. |
| **TP vs. FP vs. FN vs. TN?** | TP: alarm fires + real threat (correct). TN: no alarm + no threat (correct). FP: alarm fires + no threat (alert fatigue). FN: no alarm + real threat (worst case -- blind to breach). |
| **SIEM vs. SOAR?** | SIEM: collects/normalizes/correlates logs, generates alerts (the dashboard). SOAR: auto-executes playbooks when SIEM fires (the autopilot). SIEM detects, SOAR responds. |
| **What is** **a baseline?** | A reference point of normal expected behavior. Without it, you cannot identify what is abnormal or suspicious. Example: 2AM 10GB transfer = off-baseline temporally. |
| **6 stages of data exfiltration?** | 1-Initial Access, 2-Lateral Movement, 3-Asset Discovery, 4-Data Consolidation, 5-Bypass Controls, 6-Exfiltration. |
| **What is C2 and how detected?** | Command and Control: attacker communicates with infected systems using legitimate protocols on non-standard ports (HTTPS on 8088). Detected by flow analysis looking for port-protocol mismatches. |
| **tcpdump** **-n vs. -nn?** | -n: disables hostname resolution. -nn: disables BOTH hostname AND port resolution. -nn is critical -- prevents alerting attacker via DNS lookups during investigation. |
| **IoC vs.** **IoA?** | IoC: evidence breach already happened (forensics -- who/what, malicious file hash). IoA: real-time signal of active attack happening NOW (why/how -- unknown process executing code). |
| **Pyramid of Pain top vs. bottom?** | Bottom (trivial): hashes (change 1 byte = new hash). Top (tough): TTPs (breaking forces attacker to rebuild entire methodology). Focus on TTPs for maximum defender ROI. |
| **What is a honeypot?** | Deliberate decoy system with zero legitimate business value. ANY interaction = automatic high-priority malicious alert. Zero false positives by design. |
| **3 triage priority factors?** | Functional Impact (does it disrupt business?), Information Impact (was data stolen/modified?), Recoverability (can we get it back, at what cost?). |
| **Chain of Custody steps?** | 1-Write Protection (lock drive), 2-Cryptographic Hash (digital seal), 3-Forensic Copy (work on copy never original), 4-Continuous Logging (every transfer documented). |
| **Hot vs. Warm vs. Cold Site?** | Hot: instant failover, zero downtime (most expensive). Warm: hours to activate (moderate cost). Cold: days/weeks to setup (cheapest, most downtime). |
| **Lessons Learned Meeting rules?** | Within 2 weeks of resolution. All parties present. BLAMELESS culture. Goal: improve systems, not punish people. Output: updated playbooks, new controls. |
| **4 Log format types?** | JSON (cloud/APIs, curly braces {}). Syslog (Linux/network devices, PRI in angle brackets). XML (Windows events, paired tags). CEF (security appliances, pipe-separated fields). |
| **Windows** **EventID** **4625 means?** | Failed Logon attempt. Important for detecting brute force attacks. EventID 4624 = successful logon. 4648 = explicit credential logon (possible pass-the-hash). |
| **Suricata rule 3 components?** | Action (alert/pass/drop/reject), Header (protocol + source IP/port + direction + dest IP/port), Options (msg, flow, content, sid, rev) in parentheses. |
| **Suricata action priority order?** | 1-PASS (highest, allow through), 2-DROP (silently discard), 3-REJECT (discard + send RST), 4-ALERT (lowest, log + allow). If rules conflict, higher priority wins. |
| **fast.log** **vs.** **eve.json?** | fast.log: minimal plaintext, legacy, no session correlation. eve.json: production JSON format with flow_id to correlate all alerts from one network session. Use eve.json for SIEM. |
| **jq** **command to filter by** **flow_id?** | jq 'select(.flow_id == 14500150016149)' /var/log/suricata/eve.json -- reconstructs complete session from all Suricata alerts sharing that flow ID. |
| **SPL wildcard and pipe?** | fail* matches fail, failed, failure, failing etc. \| (pipe) passes output of one command as input to next. Always specify index= first for performance. |
| **UDM Search vs. Raw Log Search in Chronicle?** | UDM: fast, normalized, structured queries on indexed data. Raw Log: slow scan of original text files -- used when normalization breaks and events don't appear in UDM. |

> **Course 6 Complete!**  
> **Sound the Alarm: Detection and Response**  
> **Topics Mastered: NIST Lifecycle * CSIRT/SOC * IDS/IPS/EDR * SIEM/SOAR * Signal Triage**  
> **Network Baselines * Data Exfiltration * tcpdump * Packet Analysis * C2 Detection**  
> **Threat Hunting * Pyramid of Pain * Chain of Custody * BCP/DRP * Hot/Warm/Cold Sites**  
> **Log Formats * Suricata Rules * SPL * Chronicle UDM * YARA-L * Wazuh**  
> **Next: Course 7 -- Automate Cybersecurity Tasks with Python -->**
