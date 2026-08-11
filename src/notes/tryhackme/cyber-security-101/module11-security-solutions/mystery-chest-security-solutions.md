| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Security Solutions / Bonus Revision |
| **Difficulty** | Beginner |
| **Time** | ~15 Minutes |
| **Module** | Security Solutions |

---

## Objective

This Mystery Chest is a **bonus revision vault** for the entire Security Solutions module. It consolidates the most important reference material from every room — Introduction to SIEM, Firewall Fundamentals, IDS Fundamentals, Vulnerability Scanner Overview, and the Snort Challenge — into one quick-reference place.

Use it as a lookup before a lab, an exam, or an interview. Everything here was covered across the module: how a **SIEM** centralizes and correlates logs, how a **firewall** allows or blocks traffic at the boundary, how an **IDS/IPS** detects (and prevents) threats inside the network, how a **vulnerability scanner** finds weaknesses before an attacker does, and how **Snort** turns detection rules into real alerts on captured traffic. The common thread is layered defence — **prevent at the edge, detect inside, and continuously find and fix weaknesses**.

> **Analyst mindset:** *An alert is the beginning of an investigation, not proof of compromise.* Detection tools tell you *something happened* — you still have to investigate the who, what, when, where, why and how, and decide **true positive vs false positive**.

---

## Security Solutions at a Glance

Each solution answers a different question, and together they form **defence in depth** — no single control is enough on its own.

| Solution | What it does | Core question |
|-----------|--------------|---------------|
| **SIEM** | Collect, normalize, correlate and alert on logs | *What does all the evidence, together, tell me?* |
| **Firewall** | Allow or block traffic against rules | *Should this traffic pass?* |
| **IDS** | Detect suspicious activity and alert | *Does this activity look malicious?* |
| **IPS** | Detect **and** block malicious activity | *Can I stop this before it lands?* |
| **Vulnerability Scanner** | Find known weaknesses automatically | *Where are my weaknesses?* |
| **Snort** | Rule-based IDS/IPS engine on live or captured traffic | *Which packets match my detection rules?* |

> **Security relevance:** a firewall controls traffic *before/during* a connection, an IDS detects what slips *past* it, a SIEM ties every source together, and vulnerability scanning shrinks the attack surface *before* anyone connects at all.

---

## SIEM Quick Reference

A **SIEM (Security Information and Event Management)** centralizes scattered logs so a SOC analyst works from **one platform** instead of connecting to every machine. Its pipeline is a loop.

`Collect → Normalize → Correlate → Detect → Alert → Investigate → Respond`

| Concept | Key fact |
|--------|----------|
| **Five core features** | Centralized Log Collection, Normalization, Correlation, Real-Time Alerting, Dashboards & Reporting |
| **Log source categories** | Host-centric (on the machine — file, process, registry) vs Network-centric (through the network — SSH, VPN, FTP, web) |
| **Ingestion methods (ASMP)** | Agent/Forwarder, Syslog, Manual Upload, Port Forwarding |
| **Syslog ports** | UDP 514 / TCP 514; TCP 6514 over TLS |
| **Detection rule** | Logic that turns matching events into an alert (`ALERT ≠ CONFIRMED ATTACK`) |
| **TP vs FP** | True positive = alert was right; false positive = alert was wrong (drives alert fatigue → tuning) |

> **Security relevance:** the power of a SIEM is **correlation** — `unusual VPN login + sensitive file access + PowerShell + outbound connection` becomes *potential data exfiltration*, something no single log reveals.

---

## Firewall Quick Reference

A **firewall** is a security guard at the boundary — it inspects incoming and outgoing traffic and allows or blocks it against **rules**. It is only as effective as its configuration.

| Concept | Key fact |
|--------|----------|
| **Four types (S S P N)** | Stateless (L3/4, forgets), Stateful (L3/4, remembers connections), Proxy (L7, application-level), NGFW (L3–L7, DPI/IPS/heuristics/TLS inspection) |
| **Rule components** | Source, Destination, Port, Protocol, Action, Direction |
| **Actions** | Allow (pass), Deny (block), Forward (redirect) |
| **Directions** | Inbound (into me), Outbound (out of me), Forward (through me) |
| **Host vs Network** | Host-based (Windows Defender Firewall, UFW) vs network/perimeter firewall (NGFW) |
| **Key ports** | 22 SSH, 23 Telnet, 25 SMTP, 53 DNS, 80 HTTP, 443 HTTPS, 3389 RDP |

The Linux stack is `Netfilter → iptables → chains`, with three built-in chains and three common targets:

```bash
$ sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT
$ sudo iptables -P INPUT DROP
$ sudo iptables -L -n -v
```

`INPUT → into me` · `OUTPUT → out of me` · `FORWARD → through me`; targets `ACCEPT` (allow), `DROP` (silently discard), `REJECT` (block + reply). Windows uses three profiles — **Domain** (company), **Private** (trusted), **Public** (untrusted) — managed via `wf.msc` or `Get-NetFirewallRule`.

> **Security relevance:** outbound rules matter as much as inbound — restricting egress can cut off malware **command-and-control** and **data exfiltration**.

---

## IDS / IPS Quick Reference

An **IDS (Intrusion Detection System)** is a detection layer *inside* the network — it observes activity the firewall let through, and **alerts** but does **not** block. An **IPS** detects **and** prevents.

| Concept | Key fact |
|--------|----------|
| **Firewall vs IDS vs IPS** | Firewall = Allow/Deny; IDS = Detect + Alert; IPS = Detect + Prevent/Block |
| **Deployment mode** | HIDS (host-based) vs NIDS (network-based) |
| **Detection mode** | Signature-based (known attacks), Anomaly-based (baseline + deviations, catches zero-days), Hybrid (both) |
| **False positive** | Legitimate activity flagged as malicious — too many cause alert fatigue |
| **Zero-day** | No signature yet — signature-based may miss it; anomaly-based may catch it |

> **Memory trick:** `IDS → "I Detect Something"` · `IPS → "I Prevent Something"`. An IDS is a surveillance camera; a firewall is the gatekeeper.

---

## Vulnerability Scanner Quick Reference

A **vulnerability** is a weakness that can be exploited. Vulnerability management is a continuous loop: `SCAN = Find`, `PATCH = Fix`, `RESCAN = Verify`.

| Concept | Key fact |
|--------|----------|
| **Chain** | Vulnerability → Exploit → Attack → Impact |
| **By credentials** | Authenticated (logged-in, deeper) vs Unauthenticated (outside view) |
| **By location** | Internal (inside the network) vs External (from the Internet) |
| **Tools** | Nessus (Tenable), Qualys, Nexpose (Rapid7), OpenVAS (Greenbone) |
| **CVE** | `CVE-YEAR-NUMBER` — a unique identifier for a known vulnerability |
| **CVSS** | A 0–10 severity score with a vector (AV, AC, PR, UI, C, I, A) |
| **Scan vs pentest** | Scanning asks *"is there a weakness?"*; a pentest asks *"can it be exploited, and what is the impact?"* |

The OpenVAS workflow ties it together: `Target → Task → Scan → Results → Report → Remediation → Rescan`.

> **Security relevance:** scanning is never one-time — new software, versions, services and CVEs constantly create fresh weaknesses, so networks, servers, apps, cloud and endpoints are scanned regularly.

---

## Snort Quick Reference

**Snort** is an open-source IDS/IPS that compares packets against **rules** and alerts on a match. In the challenge it runs as an IDS doing **offline PCAP analysis**.

Every rule is a **header** plus **options**:

```bash
alert tcp any any -> any 80 (msg:"HTTP Traffic"; sid:1000001;)
```

`action protocol src_ip src_port direction dst_ip dst_port (options)` — `any` means "don't restrict this field", `->` is source→destination and `<>` is bidirectional.

```bash
$ sudo snort -c local.rules -r traffic.pcap -A console
```

| Concept | Key fact |
|--------|----------|
| **Three modes** | Packet Sniffer, Packet Logging, NIDS |
| **Run against a PCAP** | `-c` load rules, `-r` read PCAP (offline), `-A console` print alerts |
| **Common options** | `msg`, `sid`, `content` (ASCII or `\|hex\|`), `flags`, `flow`, `offset`, `depth`, `nocase`, `dsize`, `sameip` |
| **Content matching** | Detect by port (`any 80`, `any 21`) or payload (`content:"..."`); files by magic bytes (PNG, `GIF89a`, BitTorrent) |
| **Editing a rule** | Bump the `rev`; keep the `sid` unique; clear old logs before re-running |
| **Famous detections** | MS17-010 (EternalBlue / SMBv1, `IPC$`) and Log4j (Log4Shell / CVE-2021-44228, `${jndi:`) |

> **Security relevance:** `packet count ≠ alert count` — a rule only fires on the packets that match, so always **clear old logs → run → read fresh output** before counting.

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **Defence in depth** | Firewall prevents at the edge, IDS/IPS detects inside, SIEM correlates everything, scanning shrinks the attack surface. |
| **SIEM** | Collect → Normalize → Correlate → Detect → Alert → Investigate → Respond; correlation is the value. |
| **Ingestion** | Agent, Syslog (514/6514), Manual Upload, Port Forwarding (ASMP). |
| **Firewall types** | Stateless, Stateful, Proxy (L7), NGFW (L3–L7). |
| **Firewall rule** | Source, Destination, Port, Protocol, Action, Direction. |
| **iptables chains** | INPUT (into me), OUTPUT (out of me), FORWARD (through me); ACCEPT/DROP/REJECT. |
| **IDS vs IPS** | Detect + Alert vs Detect + Prevent; HIDS/NIDS; signature/anomaly/hybrid. |
| **Vulnerability loop** | Scan (find) → Patch (fix) → Rescan (verify); CVE identifies, CVSS scores. |
| **Scanners** | Nessus, Qualys, Nexpose, OpenVAS. |
| **Snort rule** | `action protocol src_ip src_port -> dst_ip dst_port (options)`; bump `rev`, keep `sid` unique. |
| **Golden rule** | An alert starts an investigation; decide true positive vs false positive. |

**Key idea:** security solutions are one layered system — a **firewall** decides what may pass, an **IDS/IPS** watches what does, a **vulnerability scanner** removes the weaknesses attackers would target, **Snort** turns detection logic into concrete alerts, and a **SIEM** correlates every source into the full picture — all driven by *detect, investigate, correlate, then respond*.

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What does SIEM stand for and what is its core value?** | Security Information and Event Management; its core value is correlating events from many log sources into a single meaningful picture, not just storing logs. |
| **Q2. What are the four main firewall types?** | Stateless, Stateful, Proxy, and Next-Generation Firewall (NGFW). |
| **Q3. What is the difference between an IDS and an IPS?** | An IDS detects suspicious activity and alerts but does not block it; an IPS detects and can prevent or block the malicious traffic. |
| **Q4. What is the difference between a signature-based and an anomaly-based IDS?** | Signature-based compares activity to known attack patterns (good for known attacks); anomaly-based builds a baseline of normal behaviour and flags deviations (can catch zero-days but with more false positives). |
| **Q5. What do CVE and CVSS represent?** | CVE is a unique identifier for a known vulnerability (`CVE-YEAR-NUMBER`); CVSS is a 0–10 severity score with a vector describing exploitability and impact. |
| **Q6. What is the basic structure of a Snort rule?** | A header — `action protocol source_ip source_port direction destination_ip destination_port` — followed by options in parentheses such as `msg`, `sid`, and `content`. |

## Final Takeaway

The Mystery Chest is your one-page memory aid for the **Security Solutions module**. Skim it before any lab, exam, or interview: a **SIEM** centralizes and **correlates** logs through the loop `Collect → Normalize → Correlate → Detect → Alert → Investigate → Respond`, ingesting via **Agent, Syslog, Manual Upload and Port Forwarding**; a **firewall** allows or blocks traffic against rules built from **Source, Destination, Port, Protocol, Action and Direction**, in four flavours — **Stateless, Stateful, Proxy and NGFW** — and on Linux runs through **Netfilter → iptables → chains** (`INPUT`, `OUTPUT`, `FORWARD`); an **IDS** detects and alerts while an **IPS** detects and blocks, classified by deployment (**HIDS/NIDS**) and detection (**signature/anomaly/hybrid**); a **vulnerability scanner** drives the continuous loop `SCAN → PATCH → RESCAN`, using **CVE** to identify and **CVSS** to score, with tools like **Nessus, Qualys, Nexpose and OpenVAS**; and **Snort** turns detection logic into concrete alerts on captured traffic with `snort -c local.rules -r traffic.pcap -A console`. Across every room the discipline is identical: *an alert is the start of an investigation*, controls work best **layered as defence in depth**, and the real work is to **detect, investigate, correlate, determine scope, and respond**.

---
*Bonus revision room authored for the Cyber Security 101 Security Solutions module — consolidating the SIEM, Firewall, IDS, Vulnerability Scanner and Snort rooms.*
