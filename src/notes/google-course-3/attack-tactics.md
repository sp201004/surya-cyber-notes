## Contents

- [The Threat Landscape — Why Networks Are Attacked](#the-threat-landscape--why-networks-are-attacked)
- [Denial of Service (DoS) Attacks — Complete Breakdown](#denial-of-service-dos-attacks--complete-breakdown)
- [Packet Sniffing — Intercepting Network Traffic](#packet-sniffing--intercepting-network-traffic)
- [IP Spoofing & Advanced Network Attacks](#ip-spoofing--advanced-network-attacks)
- [Network Analysis Tools](#network-analysis-tools)
- [Module 3 Quick-Reference Glossary](#module-3-quick-reference-glossary)

## The Threat Landscape — Why Networks Are Attacked

| **Attack Motivation** | **What Attackers Want** | **Real Example** |
| --- | --- | --- |
| **Financial Gain** | Steal payment data, deploy ransomware for payment, sell stolen PII on dark web. | 2014 Home Depot breach: Malware compromised 56 million credit/debit card records. Cards sold on underground forums for $5-$50 each. |
| **Corporate Espionage** | Steal trade secrets, R&D data, client lists, or competitive intelligence. | Chinese state-sponsored hackers (APT10) stole intellectual property from aerospace, pharmaceutical, and technology companies across 45+ countries. |
| **Political Disruption** | Disrupt government services, deface websites, leak classified information, influence elections. | 2016 US election: Russian APTs breached Democratic National Committee, exfiltrating emails later used for political disruption. |
| **Public Safety Attacks** | Compromise critical infrastructure -- power grids, water treatment, hospitals. | 2021 Florida water treatment plant: Attacker remotely increased sodium hydroxide levels to dangerous concentrations via exposed industrial control system. |

> **KEY CONCEPT: The 3Cs Framework — Incident Response Mindset**
> When an attack is active, panic is natural and dangerous. DFIR professionals use the 3Cs:
> 
> **1. COMMAND:**        Someone must be affirmatively in charge. No leaderless response.
> **2. CONTROL:**        The leader aligns the entire team to focus ONLY on the mission.
> **3. COMMUNICATIONS:** The most critical pillar. Responders MUST communicate findings
> and proposed actions to command BEFORE executing them.
> Unauthorized actions during active incidents destroy evidence.

## Denial of Service (DoS) Attacks — Complete Breakdown

> **NOTE**
> **DoS goal:** Make a network resource so overwhelmed it cannot serve legitimate users.
> **Attacker wins if:** server crashes, bandwidth saturated, connection table exhausted, or service is too slow to be usable.
> DDoS (Distributed): same attack but from thousands of compromised machines simultaneously -- much harder to block because traffic comes from legitimate-looking IPs worldwide.

> **DoS vs. DDoS vs. Botnet**
> **DoS vs. DDoS:**
> **DoS (Single Source):        DDoS (Distributed -- via Botnet):**

```
  +----------+                +-------+  +-------+  +-------+
  | Attacker |---[FLOOD]-->   | Bot 1 |  | Bot 2 |  | Bot N |
  +----------+   [Target]     +---+---+  +---+---+  +---+---+
                                  |          |          |
  Easy to block:                  +----+-----+-----+----+
  Just block that one IP               |
                                  [MASSIVE FLOOD]
                                       v
  MUCH harder to block:            [TARGET SERVER]
  Traffic comes from               Goes offline
  thousands of real IPs

  BOTNET: A network of malware-infected computers ('zombies') secretly controlled
  by a single attacker ('bot-herder') via a Command & Control (C2) server.
  Botnet owners rent access to other criminals -- 10,000 bots available for $50/hr.
```

### SYN Flood Attack — Exploiting TCP Handshake

> **SYN FLOOD ATTACK — How It Exhausts Server Resources**
> **NORMAL TCP HANDSHAKE (3 steps):      SYN FLOOD ATTACK:**
> **Attacker sends millions of SYN packets**
> **Client          Server                 but NEVER sends the final ACK.**

```
    |---[SYN]------->|                   Server allocates memory for each half-open
    |<--[SYN-ACK]----|   Server reserves  connection, waiting for an ACK that
    |---[ACK]------->|   port & memory    never arrives.
    |===CONNECTION===|                    Memory fills. Port table exhausts.
                                         Legitimate users get 'Connection refused'.

  DEFENCE:                               CASE STUDY:
  * SYN cookies (server-side)            2016 GitHub DDoS: 1.35 Tbps SYN flood.
  * Rate-limit SYN packets from same IP   Largest recorded DDoS at the time.
  * IPS with half-open connection limits
```

### ICMP Flood & Ping of Death

> **ICMP Flood (Ping Flood)**
> **How it works:** Attacker sends an overwhelming volume of ICMP echo request packets (like rapid-fire pings) at the target. Server is forced to process and reply to EVERY one, consuming 100% of both inbound and outbound bandwidth.
> **Impact:** Target server's bandwidth and CPU are completely consumed. Legitimate network traffic cannot get through. Services appear offline to users.
> **Defence:** Rate-limit ICMP requests at the firewall. Block ICMP echo requests from external/unknown sources. IPS with ICMP flood detection thresholds.

> **Ping of Death**
> **How it works:** Attacker sends an ICMP packet that is intentionally crafted to EXCEED the maximum legal IP packet size of 65,535 bytes. The oversized packet is fragmented during transmission and reassembled at the target.
> **Impact:** When the target reassembles the oversized packet, the system's buffer overflows. Causes system crashes, freezes, or reboots -- a complete denial of service.
> **Defence:** Modern OS kernels patch this vulnerability. Keep all systems patched. IPS rules detect packets with suspicious fragmentation/offset values indicating reassembly into oversized packets.

## Packet Sniffing — Intercepting Network Traffic

> **NOTE**
> Packet sniffing is the practice of capturing and inspecting data packets as they travel across a network.
> LEGITIMATE USE: Network troubleshooting, performance analysis, security monitoring (tcpdump, Wireshark).
> MALICIOUS USE: Stealing credentials, reading private communications, intercepting sensitive data.

> **PASSIVE vs. ACTIVE PACKET SNIFFING**
> **HOW NICs WORK (Normal):           HOW ATTACKERS EXPLOIT IT:**
> **Network segment carries ALL        Attacker sets NIC to PROMISCUOUS MODE.**
> **traffic, but NIC only passes       In this mode, NIC accepts ALL packets**
> **packets addressed to IT to         on the segment -- not just those addressed**
> **the OS. Other packets dropped.     to it. Every conversation is visible.**
> **PASSIVE SNIFFING:                  ACTIVE SNIFFING:**

```
  +----------------------------+     +----------------------------+
  | Attacker connects to HUB   |     | Attacker injects forged    |
  | (or uses promiscuous mode) |     | ARP replies to redirect    |
  | Silently reads ALL traffic |     | traffic through their NIC  |
  | Does NOT alter packets     |     | Can MODIFY packet contents |
  | Like reading someone's     |     | Like rewriting a letter    |
  | mail without unsealing it  |     | before re-sealing it       |
  +----------------------------+     +----------------------------+

  DEFENCE against both types:
  * TLS/HTTPS: Even sniffed packets are encrypted ciphertext -- unreadable.
  * VPN: All traffic encrypted end-to-end through the tunnel.
  * Avoid public Wi-Fi for sensitive work without a VPN.
  * Use switches (not hubs) -- limits traffic to intended ports.
```

## IP Spoofing & Advanced Network Attacks

> **NOTE: IP Spoofing Explained**
> Attackers manually craft a packet and sets the SOURCE IP ADDRESS field to a FAKE IP -- usually an IP that is trusted by the target.
> Purpose: Bypass firewall rules (which may whitelist certain IPs), impersonate authorized systems, or anonymize the attack source.
> Limitation: The attacker cannot receive reply to traffic (replies go to the real owner of the spoofed IP). Used mainly for one-way floods or blind attacks.

> **On-Path Attack (Meddler-in-the-Middle / MitM)**
> **How it works:** Attacker positions themselves between two communicating parties (client and server) by ARP poisoning or DNS hijacking. All traffic flows THROUGH the attacker, who can read and modify it in real-time.
> **Impact:** Complete interception of all communication. Attackers can steal session tokens, credentials, modify transactions in real-time (change bank transfer amounts), or inject malicious content into responses.
> **Defence:** Use TLS everywhere (HTTPS) -- MitM attacker cannot decrypt properly encrypted traffic without triggering certificate errors. HSTS (HTTP Strict Transport Security) prevents SSL stripping. Use DNSSEC to protect against DNS hijacking.

> **Replay Attack**
> **How it works:** Attacker captures a legitimate authentication packet (e.g., a login token, session cookie, or Kerberos ticket) and retransmits it later to authenticate as the original user without knowing the password.
> **Impact:** Attacker gains unauthorized access to systems using the victim's captured valid credentials. It is particularly dangerous for time-sensitive authentication systems.
> **Defence:** Use timestamps and nonces (one-time random values) in authentication tokens so captured tokens expire within seconds. HTTPS prevents capture in the first place. Session tokens should have very short lifetimes.

> **Smurf Attack**
> **How it works:** Combines IP spoofing + ICMP flood. Attacker spoofs the victim's IP address, then broadcasts an ICMP ping to the ENTIRE network. Every single device on the network automatically replies -- all replies flood the victim simultaneously.
> **Impact:** The victim's bandwidth is overwhelmed by the amplified flood of ICMP replies from all network devices. Amplification factor = number of devices on network. A network with 1,000 devices amplifies the attack 1,000x.
> **Defence:** Disable IP-directed broadcasts on all routers (blocks broadcast pings). Rate-limit ICMP replies. Modern routers and ISPs filter this by default. Ingress filtering on routers prevents spoofed source IPs from passing.

## Network Analysis Tools

> **NOTE**
> Network protocol analyzers (packet sniffers used LEGITIMATELY) are essential analyst tools.
> They help establish traffic BASELINES (what does normal look like?), troubleshoot connectivity issues, detect malicious anomalies, and gather forensic evidence during incident response.

### tcpdump — Command-Line Packet Analyzer

```
tcpdump — Reading Live Packet Data
tcpdump: Lightweight, command-line packet analyzer built into Linux/macOS.
Captures live network traffic and prints packet details to terminal.

SAMPLE OUTPUT:
10:32:15.123456 IP 203.0.113.5.54321 > 10.0.0.50.80: Flags [S], seq 0
|              |  |                    |            |  |              |
Timestamp       Protocol Source IP.Port  Dest IP.Port  TCP Flag  Sequence#

FLAGS TO KNOW:
[S]  = SYN  (initiating connection -- thousands per second = SYN flood)
[.]  = ACK  (acknowledgment)
[P]  = PSH  (push data to app immediately)
[F]  = FIN  (closing connection cleanly)
[R]  = RST  (abrupt connection reset -- often indicates errors or scans)
[S.] = SYN-ACK (server response to SYN)

COMMON ANALYST COMMANDS:
tcpdump -i eth0              # Capture on interface eth0
tcpdump port 80              # Only HTTP traffic
tcpdump -n host 10.0.0.5     # Traffic to/from specific IP
tcpdump -w capture.pcap      # Save to file for Wireshark analysis
tcpdump -r capture.pcap      # Read saved capture file
```

### Writing a Cybersecurity Incident Report

> **EXAMPLE: Real Scenario: Website Timeout Reported by Users**
> Step 1 (Users Report): Multiple users report the company website is timing out.
> Step 2 (Run tcpdump): Analyst runs: tcpdump -n udp port 53
> Step 3 (Observe Output): Output shows:
> 10:45:23 IP 10.0.0.10.50123 > 8.8.8.8.53: UDP, DNS query for 'company.com'
> 10:45:23 IP 8.8.8.8 > 10.0.0.10: ICMP 'udp port 53 unreachable'
> Step 4 (Analysis): Outbound DNS queries (port 53) are receiving 'unreachable' errors.
> DNS resolution is failing. Websites rely on DNS to find server IPs.
> Without DNS, browsers cannot load any websites.
> Step 5 (Root Cause): Either internal DNS server is down (DoS attack or misconfiguration)
> OR firewall rule change accidentally blocked outbound UDP port 53.
> Step 6 (Report): Document timestamp, affected systems, tcpdump evidence, root cause
> hypothesis, and escalate to network engineers with captured file.

## Module 3 Quick-Reference Glossary

| **Term** | **Definition** |
| --- | --- |
| **DoS Attack** | Denial of Service. Floods a target with traffic to make it unavailable to legitimate users. |
| **DDoS Attack** | Distributed DoS. Same flood from thousands of compromised devices simultaneously. Harder to block. |
| **Botnet** | Network of malware-infected 'zombie' computers controlled by a threat actor to launch coordinated attacks. |
| **Bot-herder** | The attacker who commands and controls a botnet, often renting it to other criminals. |
| **SYN Flood** | DoS exploiting TCP handshake. Sends millions of SYN packets without completing the handshake, exhausting server connections. |
| **ICMP Flood** | DoS that sends overwhelming volume of ICMP ping packets to saturate bandwidth and CPU. |
| **Ping of Death** | DoS sending oversized ICMP packets (>64KB) to overflow target's buffer and cause system crash. |
| **Packet Sniffing** | Capturing and inspecting network packets. Legitimate (tcpdump, Wireshark) or malicious. |
| **Passive Sniffing** | Silently reading network traffic without modifying it. Like secretly reading mail without opening it. |
| **Active Sniffing** | Intercepting AND modifying packets in transit. Requires ARP poisoning or similar injection technique. |
| **Promiscuous Mode** | NIC configuration that accepts ALL network traffic, not just packets addressed to that device. |
| **IP Spoofing** | Forging the source IP address field in a packet to impersonate a trusted system or hide the attacker's identity. |
| **On-Path Attack** | Attacker positions themselves between two parties to intercept/modify all communications (MitM). |
| **Replay Attack** | Capturing a valid authentication packet and retransmitting it later to impersonate the original user. |
| **Smurf Attack** | IP spoofing + ICMP broadcast = amplified flood of ICMP replies directed at the spoofed victim IP. |
| **tcpdump** | Command-line packet analyzer for Linux/macOS. Captures live traffic and prints packet details to terminal. |
| **Wireshark** | GUI-based packet analyzer. Can open tcpdump .pcap files for deep visual analysis. |
| **DFIR** | Digital Forensics and Incident Response. The practice of investigating breaches and preserving evidence. |
| **3Cs Framework** | Command, Control, Communications -- the structured mindset for managing active incidents without panic. |
| **Bandwidth** | Total capacity of a network link. Measured in Mbps or Gbps. Saturating it = effective DoS. |
