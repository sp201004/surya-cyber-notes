## Contents

- [Baselines — Knowing Normal to Find Abnormal](#baselines--knowing-normal-to-find-abnormal)
- [SOC vs. NOC — Different Goals, Same Network](#soc-vs-noc--different-goals-same-network)
- [Data Exfiltration — 6-Stage Attack Lifecycle](#data-exfiltration--6-stage-attack-lifecycle)
- [Packet Anatomy — Header, Payload, Footer](#packet-anatomy--header-payload-footer)
- [tcpdump — Command-Line Packet Analysis](#tcpdump--command-line-packet-analysis)
- [Command and Control (C2) Detection](#command-and-control-c2-detection)

## Baselines — Knowing Normal to Find Abnormal

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

## SOC vs. NOC — Different Goals, Same Network

| **Feature** | **SOC (Security Operations Center)** | **NOC (Network Operations Center)** |
| --- | --- | --- |
| **Primary Focus** | Maintaining security posture. Defending against threats and adversaries. | Maintaining network PERFORMANCE, speed, availability, and hardware uptime. |
| **Daily Tasks** | Monitoring for IoCs, identifying intrusions, isolating threats, threat hunting. | Monitoring congestion, routing loops, hardware degradation, responding to outages. |
| **Key Metrics** | Mean Time to Detect (MTTD), Mean Time to Respond (MTTR), incidents resolved. | Network uptime %, latency, packet loss, bandwidth utilization, hardware health. |
| **Alert Sources** | SIEM alerts, IDS signatures, threat intelligence feeds. | Network monitoring tools (Nagios, PRTG), hardware sensors, performance dashboards. |
| **When They Collaborate** | A DDoS attack affects BOTH security AND network performance -- both SOC and NOC respond together. | Major network outage may have a security component -- NOC loops in SOC to rule out attack. |

## Data Exfiltration — 6-Stage Attack Lifecycle

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

## Packet Anatomy — Header, Payload, Footer

> **PACKET ANATOMY — Header / Payload / Footer**
> **ANATOMY OF A NETWORK DATA PACKET:**

```
  +----------------------------------------------------------------+
  | HEADER (20-60 bytes)                                           |
  | Contains routing and control information:                      |
  |   Source IP: 192.168.1.10    Destination IP: 10.0.0.5          |
  |   Protocol: TCP (6)          TTL: 64                           |
  |   Length: 250 bytes          ID/Flags: for fragmentation       |
  |   Checksum: 0x4A2B           ToS: 0x00                         |
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

## tcpdump — Command-Line Packet Analysis

> **KEY CONCEPT: What is tcpdump?**
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

```bash
# CAPTURE LIVE TRAFFIC (1 packet, verbose, all interfaces):
sudo tcpdump -i any -v -c 1

# CAPTURE AND SAVE TO FILE (forensic capture):
sudo tcpdump -i any -w capture.pcap

# READ SAVED PCAP FILE (offline analysis):
sudo tcpdump -r capture.pcap -nn

# FILTER BY IP AND PORT (focus on web traffic from specific host):
sudo tcpdump -r capture.pcap -nn 'ip and host 192.168.1.5 and port 80'

# FILTER BY MULTIPLE PORTS (HTTP and HTTPS traffic only):
sudo tcpdump -r capture.pcap -nn 'ip and (port 80 or port 443)'

# EXCLUDE KNOWN CLEAN HOST (ignore noise):
sudo tcpdump -r capture.pcap -nn 'not host 10.0.0.1'
```

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

## Command and Control (C2) Detection

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
> **Why -nn flag is CRITICAL for C2 investigations:**
> Without -nn: tcpdump queries attacker's DNS server to resolve their IP to a name.
> This TELLS the attacker their infrastructure is under investigation. They disappear.
> With -nn: No DNS queries made. Analyst stays invisible to the attacker.

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| **What is a baseline and why does it matter?** | A reference point of normal behavior. Without it, you cannot identify what is abnormal. Example: 2AM multi-GB transfer = off-baseline by temporal pattern. |
| **SOC vs. NOC?** | SOC: security posture (threats, intrusions, defense). NOC: network performance (uptime, speed, hardware). DDoS attack requires both to respond. |
| **6 stages of data exfiltration?** | Initial Access -> Lateral Movement -> Asset Discovery -> Data Consolidation -> Bypass Controls -> Exfiltration. |
| **Packet Header vs. Payload vs. Footer?** | Header: routing info (IPs, TTL, protocol). Payload: actual data content (often encrypted). Footer: error-checking (Layer 2 only, Ethernet). |
| **tcpdump -n vs. -nn?** | -n: disables hostname resolution (IP stays as IP). -nn: disables BOTH hostname AND port resolution (port 80 stays 80, not 'HTTP'). -nn essential to avoid alerting attacker's DNS. |
| **What is C2 traffic and how do you detect it?** | Attacker communicates with infected systems using legitimate protocols on non-standard ports (e.g., HTTPS on port 8088). Detected via flow analysis looking for port-protocol mismatches. |
| **What is a .pcap file?** | A Packet Capture file -- a snapshot of network packets saved to disk. Used by tcpdump (-w to write, -r to read) and Wireshark for offline forensic analysis. |
