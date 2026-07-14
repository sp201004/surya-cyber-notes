## Contents

- [Proactive Detection Methods — Beyond Automated Tools](#proactive-detection-methods--beyond-automated-tools)
- [IoC vs. IoA — What You Are Looking At](#ioc-vs-ioa--what-you-are-looking-at)
- [The Pyramid of Pain — Prioritizing Threat Intelligence](#the-pyramid-of-pain--prioritizing-threat-intelligence)
- [Alert Triage — 3-Step Process](#alert-triage--3-step-process)
- [VirusTotal — Crowdsourced Threat Intelligence](#virustotal--crowdsourced-threat-intelligence)
- [Chain of Custody — Legal Evidence Handling](#chain-of-custody--legal-evidence-handling)
- [Playbook Types — Manual, Automated, Semi-Automated](#playbook-types--manual-automated-semi-automated)
- [Business Continuity & Site Resilience](#business-continuity--site-resilience)
- [Post-Incident Activity — Lessons Learned & Final Report](#post-incident-activity--lessons-learned--final-report)

## Proactive Detection Methods — Beyond Automated Tools

| **Method** | **What It Is** | **How It Works** | **Advantage Over Automated Tools** |
| --- | --- | --- | --- |
| **Threat Hunting** | Proactive, human-driven search for hidden threats. | Analysts actively search systems/logs for malicious activity that BYPASSED security tools. No alert required to start. | Finds advanced threats (APTs, fileless malware) that never trigger any automated alerts. Catches what automation misses. |
| **Threat Intelligence** | Evidence-based information about existing/emerging threats. | Industry reports, government advisories, threat data feeds (malicious IPs, file hashes). Aggregated by a Threat Intelligence Platform (TIP). | Provides CONTEXT -- who is attacking similar organizations, what tools they use, what indicators to look for. |
| **Cyber Deception (Honeypots)** | Deliberately fake, vulnerable-looking decoy systems. | Honeypots have ZERO legitimate business purpose. Any interaction = automatic high-priority malicious alert. Zero false positives. | Perfect detection rate for anything touching it. Attackers reveal their TTPs by trying to exploit honeypots. |

## IoC vs. IoA — What You Are Looking At

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

## The Pyramid of Pain — Prioritizing Threat Intelligence

> **NOTE: What the Pyramid Shows**
> Different types of threat indicators cause different levels of 'pain' (difficulty) to attackers when defenders block them.
> The HIGHER on the pyramid, the MORE VALUABLE and HARDER to replace the indicator is.
> Blocking a hash (bottom) = trivial for attacker to bypass. Blocking their TTPs (top) = breaks their entire methodology.

> **PYRAMID OF PAIN — Indicator Value vs. Attacker Difficulty**
> **PYRAMID OF PAIN:**

```
                /\
               /  \
              / 6  \   TTPs (Tactics, Techniques, Procedures)
             / TOUGH\  Complete behavioral footprint. Breaking TTPs
            /--------\  forces attacker to rethink EVERYTHING.
           /          \
          /     5      \  TOOLS -- Software utilities (password
         / CHALLENGING  \  crackers, exploit frameworks). Must
        /----------------\  engineer custom code.
       /                  \
      /         4          \  NETWORK/HOST ARTIFACTS -- Custom registry
     /       ANNOYING       \  keys, user-agent strings. Forces
    /------------------------\  script rewrites.
   /                          \
  /             3              \  DOMAIN NAMES -- Attackers use DGA to
 /            SIMPLE            \  generate hundreds of new domains instantly.
/--------------------------------\
|               2                |  IP ADDRESSES -- Attackers swap
|              EASY              |  proxy/VPN nodes in minutes.
|================================|
|               1                |  HASH VALUES -- Trivial. Change 1 byte
|            TRIVIAL             |  of malware = completely new hash.
+--------------------------------+

ANALYST STRATEGY: Focus on collecting TTPs and Tools -- maximum attacker pain.
Hash values expire quickly. TTPs remain consistent across campaigns.
```

## Alert Triage — 3-Step Process

> **NOTE: What is Triage?**
> SOC analysts face THOUSANDS of alerts daily. Triage = prioritizing which to investigate first.
> Without triage, analysts waste time on low-priority noise while critical incidents go uninvestigated.

| **1** | **Receive and Assess**<br>Review the incoming alert for initial validity. Is it a known false positive? Was it triggered by a scheduled maintenance task? Verify the alert has enough context to investigate. If it is obviously a false positive, document and close it. |
| --- | --- |

| **2** | **Assign Priority — Based on Three Impact Factors**<br>Functional Impact: Does the incident disrupt business operations? (e.g., ransomware disabling systems = CRITICAL). Information Impact: Was sensitive data accessed, stolen, or modified? (e.g., PII exfiltrated = CRITICAL). Recoverability: Can the organization recover? Is recovery worth the time and cost? (deleted backups = HIGH). |
| --- | --- |

| **3** | **Collect and Analyze Evidence**<br>Gather all available evidence. Review logs, pull PCAP files, query SIEM for correlated events. Conduct external research (VirusTotal, threat intel feeds). Add context: Did the failed login happen outside working hours? From a foreign country? Does the IP match known malicious infrastructure? Make an informed escalation decision. |
| --- | --- |

## VirusTotal — Crowdsourced Threat Intelligence

> **IMPORTANT: WARNING: Never upload customer data, PII, or intellectual property to VirusTotal.**
> Data uploaded to VirusTotal is PUBLICLY SHARED with all subscribers worldwide.

| **Tab** | **What It Shows** | **Security Analyst Use** |
| --- | --- | --- |
| **Detection** | Results from 70+ security vendor engines that analyzed the file/URL/IP. | See how many vendors flag it as malicious. 40/70 vendors = very likely malicious. 2/70 = possible false positive. |
| **Details** | Static metadata: file hashes (MD5, SHA256), file size, headers, creation timestamps, compilation date. | Verify file hashes match known malware signatures. Check if file was compiled just before attack (fresh malware). |
| **Relations** | Network connections: contacted domains, IP addresses, URLs associated with the file. | Map attacker infrastructure. Find other malicious domains hosted on same IP. Build the full C2 network picture. |
| **Behavior** | Sandboxed execution: registry writes, files created/deleted, processes spawned, network calls made. | See exactly WHAT the malware does when it runs. Identify persistence mechanisms, C2 channels, lateral movement tools. |
| **Community** | Comments and analysis from the global security research community. | Check if other analysts have already documented this sample. Get attribution (which threat group used it). |

## Chain of Custody — Legal Evidence Handling

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

## Playbook Types — Manual, Automated, Semi-Automated

| **Playbook Type** | **How It Works** | **Time to Resolution** | **Best For** |
| --- | --- | --- | --- |
| **Non-Automated (Manual)** | Human analyst follows a step-by-step flowchart or checklist. Every action requires manual execution. | Slowest. Minutes to hours depending on complexity and analyst experience. | Novel incidents without established automation. Complex decisions requiring human judgment. |
| **Automated (SOAR-driven)** | Software executes entire response without any human involvement. SIEM alert triggers SOAR playbook automatically. | Fastest. Seconds to minutes. 20-minute manual job done in 3 seconds. | High-volume, well-understood, repetitive incidents. IP blocking, account lockouts, ticket creation. |
| **Semi-Automated (Hybrid)** | Tedious background tasks are automated (log collection, IP lookups, ticket creation). Analyst focuses on complex analysis and decisions. | Balanced. Automation handles 80% of work. Analyst provides 20% final judgment. | Most enterprise SOC workflows. Maximizes analyst efficiency on what humans do best. |

## Business Continuity & Site Resilience

| **Plan/Site** | **What It Is** | **Purpose** | **When Activated** |
| --- | --- | --- | --- |
| **Business Continuity Plan (BCP)** | Document outlining procedures to sustain business operations DURING and after a disruption. | Keep the business running even if key systems are compromised or offline. | During any significant disruption: ransomware, major breach, natural disaster, power outage. |
| **Disaster Recovery Plan (DRP)** | Focuses specifically on restoring IT infrastructure and data after a major disaster. | Return IT systems to operational state after physical destruction or catastrophic failure. | After fire, flood, hardware failure, or extended breach causing infrastructure loss. |
| **Hot Site** | Fully operational duplicate facility. Identical equipment, data synced in real-time. | Immediate failover with ZERO downtime. Business continues without interruption. | When zero downtime is required (financial trading, healthcare, emergency services). |
| **Warm Site** | Fully updated and configured facility but requires brief setup time to bring online. | Moderate failover. Hours to days to activate. Lower cost than hot site. | When some downtime is acceptable. Good balance of cost and recovery speed. |
| **Cold Site** | Basic backup facility with power and cooling but no equipment or data loaded. | Lowest cost option. Requires extensive setup before any operations can resume. | For non-critical operations where days/weeks of downtime are acceptable. |

## Post-Incident Activity — Lessons Learned & Final Report

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

## Quick Revision

| **Question** | **Answer** |
| --- | --- |
| **IoC vs. IoA?** | IoC: forensic evidence a breach ALREADY happened (who/what -- malicious file hash, attacker IP). IoA: real-time signal of ACTIVE attack (why/how -- unknown process executing code right now). |
| **Pyramid of Pain top vs. bottom?** | Bottom (trivial): hash values (attacker changes 1 byte). Top (tough): TTPs (attacker must change entire methodology). Focus intelligence on TTPs for maximum impact. |
| **3 triage steps?** | 1-Receive & Assess (real or false positive?), 2-Assign Priority (functional/information/recoverability impact), 3-Collect & Analyze (gather evidence, add context, escalate). |
| **What is a honeypot?** | A decoy system with zero legitimate business purpose. Any interaction = automatic malicious alert. Zero false positives because no real user should ever touch it. |
| **What is the Chain of Custody?** | Documentation of every person who handled evidence, when, and what they did. Broken chain = evidence inadmissible in court. Attacker goes free. |
| **Hot vs. Warm vs. Cold Site?** | Hot: fully operational, instant failover (zero downtime). Warm: configured, needs hours to activate. Cold: basic facility, needs days/weeks of setup before use. |
| **What is the Lessons Learned Meeting?** | Blameless post-mortem held within 2 weeks of incident resolution. All parties review what happened and generate recommendations to improve playbooks and controls. |
