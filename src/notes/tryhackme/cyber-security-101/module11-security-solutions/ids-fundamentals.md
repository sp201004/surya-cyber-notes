| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Security Solutions / IDS |
| **Difficulty** | Easy |
| **Time** | ~30 Minutes |
| **Module** | Security Solutions |

---

## Objective

An **IDS (Intrusion Detection System)** is a security solution used to **detect suspicious or malicious activity** inside a network or system. Where a **firewall** focuses on controlling traffic before or during a connection, an IDS monitors activity and looks for threats that may have **already passed through the firewall**. This room builds the concept from the ground up: what an IDS is and why it complements a firewall, the crucial difference between an IDS and an **IPS** (detection vs prevention), the two ways to classify an IDS — by **deployment mode** (**HIDS** vs **NIDS**) and by **detection mode** (**Signature-based**, **Anomaly-based**, **Hybrid**) — and finally a hands-on look at **Snort**, the open-source IDS: its modes, its rule syntax, its command-line usage, and a practical lab that writes a custom rule, generates traffic, and reads the resulting alert.

By the end of this room you will be able to:

- Explain what an **IDS** is and why it is needed as a layer *inside* the network, behind the firewall
- Distinguish a **firewall** (`Allow/Deny` traffic) from an **IDS** (`Detect + Alert`) and an **IPS** (`Detect + Prevent/Block`)
- Understand that an IDS **detects and reports** — it does **not** automatically stop the detected threat
- Classify IDS by **deployment mode** — **HIDS** (host-based) vs **NIDS** (network-based)
- Classify IDS by **detection mode** — **Signature-based**, **Anomaly-based**, and **Hybrid**
- Define **false positives**, **baselines**, and **zero-day attacks**, and know which detection method handles each
- Describe **Snort** — an open-source IDS — and its three modes: **Packet Sniffer**, **Packet Logging**, and **NIDS**
- Read a Snort rule (`action protocol source_ip source_port -> destination_ip destination_port (options)`) and its fields (`msg`, `sid`, `rev`)
- Run Snort from the command line (`-i`, `-r`, `-c`, `-v`, `-d`, `-e`, `-q`) and interpret an alert such as `[**] [1:10001:1] Ping Detected [**]`

> **Core idea:** *An IDS is a detection layer.* It observes activity, identifies suspicious patterns, and generates alerts so analysts can investigate and respond. It is **not** a replacement for a firewall or an IPS.

---

## Task 1 — What Is an IDS?

An **IDS (Intrusion Detection System)** is a security solution used to **detect suspicious or malicious activity** inside a network or system. A firewall primarily focuses on **controlling traffic before or during a connection**, while an IDS monitors activity and looks for threats that may have already passed through the firewall.

### Why Do We Need an IDS?

A firewall is commonly deployed at the **boundary of a network**, inspecting traffic and deciding whether a connection should be **Allowed** or **Denied**. However, a firewall cannot guarantee that every malicious connection will be blocked. An attacker may:

- Use a legitimate-looking connection
- Exploit an allowed service
- Compromise a valid account
- Bypass firewall restrictions
- Perform malicious activity after gaining internal access

Therefore, another security layer is required **inside the network** to detect suspicious activity — that layer can be an **IDS**.

### Firewall vs IDS — a Building Analogy

Think of network security like security at a building. The **firewall = gatekeeper** — it checks people *before they enter* (`Allow / Deny`). The **IDS = surveillance camera** — it monitors activity *inside/around the network* and raises an alert on suspicious behaviour that reaches the security team.

> **Memory trick:** Firewall → *"Should this traffic enter?"* · IDS → *"Does this traffic/activity look malicious?"*

### How an IDS Works

An IDS continuously monitors network or system activity: `Activity → IDS → Analyze → (Normal → No Alert)` or `(Suspicious → Alert → Security Administrator)`. When the IDS detects suspicious activity, it generates an **alert**, and the security team can then investigate and respond.

### Important: IDS Does NOT Prevent the Threat

One of the most important concepts in the room:

```text
IDS = Detection
NOT
IDS = Prevention
```

An IDS **detects and reports** malicious activity. It does **not automatically stop the detected threat**. For example, if an attacker enters using a legitimate-looking connection that the firewall allows, the IDS identifies the suspicious behaviour and alerts the security team — the administrator then takes appropriate action.

### What Does an IDS Monitor?

Depending on its type, an IDS can monitor network traffic, system activity, packets, connections, logs, processes, files, user activity and suspicious behaviour. The exact capability depends on whether the IDS is **HIDS** (host-based) or **NIDS** (network-based).

### Firewall vs IDS vs IPS

| Security Solution | Main Purpose |
|---|---|
| Firewall | Allow/Deny network traffic |
| IDS | Detect suspicious activity |
| IPS | Detect + prevent/block threats |

### Detection Methods (Preview)

IDS solutions identify abnormal or malicious activity using different detection techniques — the major approaches are **Signature-based**, **Anomaly-based**, and **Hybrid** (covered in detail in Task 2).

- **Signature-Based** — compares activity against known attack patterns called **signatures**. Very effective for **known attacks**, but may not detect a completely new **zero-day attack** if no signature exists.
- **Anomaly-Based** — establishes a baseline of normal behaviour, then looks for deviations. Can potentially detect **unknown/zero-day attacks**, but may generate more **false positives**.
- **Hybrid** — combines signature-based and anomaly-based detection, using known signatures while also detecting unusual behaviour.

### False Positive

A **false positive** occurs when an IDS identifies legitimate activity as malicious. The activity is actually legitimate, but the IDS considers it suspicious. Too many false positives can waste analyst time, create alert fatigue, hide real attacks among many alerts, and increase investigation workload — so IDS rules and detection thresholds need to be tuned properly.

### Zero-Day Attacks

A **zero-day attack** exploits a vulnerability that is not yet known or does not have an existing detection signature. A **signature-based IDS** may **not** detect it (no existing signature), whereas an **anomaly-based IDS** may flag the unusual behaviour and achieve **potential detection** — one reason anomaly-based and hybrid detection techniques are important.

### IDS Alerting

When an IDS identifies suspicious activity it generates an **alert** and forwards it to the security administrator for investigation/response. The alert may contain information such as:

- Source IP
- Destination IP
- Protocol
- Port
- Detection rule
- Timestamp
- Attack type
- Signature ID

### IDS vs IPS

A common interview question is the difference between IDS and IPS:

| Solution | Behaviour |
|---|---|
| **IDS** | `Detect → Alert` → Security Team |
| **IPS** | `Detect → Block / Prevent` → Threat Stopped |

> **Easy memory trick:** `IDS = I Detect Something` · `IPS = I Prevent Something`. Also: **Firewall = Control**, **IDS = Detect + Alert**, **IPS = Detect + Prevent**.

### Task 1 — Answer

| Question | Answer |
|---|---|
| **Can an intrusion detection system (IDS) prevent the threat after it detects it?** | Nay<br>*(An IDS is designed primarily to DETECT suspicious activity and ALERT security administrators — it does not itself prevent/block the detected threat.)* |

### Interview Questions — What Is an IDS?

| Question | Answer |
|---|---|
| **Q. What is IDS?** | An IDS (Intrusion Detection System) is a security solution that monitors network or system activity to detect suspicious or malicious behaviour and generate alerts. |
| **Q. Can an IDS prevent a threat after detecting it?** | No. IDS is primarily a detection and alerting system. |
| **Q. What is the main purpose of an IDS?** | To detect suspicious or malicious activity and alert security administrators. |
| **Q. Does IDS replace a firewall?** | No. A firewall controls traffic, while an IDS monitors activity and detects threats. |
| **Q. What happens when IDS detects malicious activity?** | IDS detects activity → generates an alert → the security administrator investigates. |

---

## Task 2 — Types of IDS

IDS solutions can be categorised in two major ways — by **deployment mode** (*where* the IDS runs) and by **detection mode** (*how* the IDS detects threats):

```text
                    IDS
                     │
          ┌──────────┴──────────┐
          │                     │
     Deployment Mode       Detection Mode
          │                     │
      ┌───┴───┐          ┌──────┼────────┐
      │       │          │      │        │
     HIDS    NIDS    Signature  Anomaly  Hybrid
```

- **Deployment Mode** — describes *where* the IDS is deployed: **HIDS** (Host Intrusion Detection System) and **NIDS** (Network Intrusion Detection System).
- **Detection Mode** — describes *how* the IDS detects threats: **Signature-Based**, **Anomaly-Based**, and **Hybrid**.

### Deployment Mode: HIDS

**HIDS** stands for **Host Intrusion Detection System**. A HIDS is installed **individually on a host/system** and monitors activity associated with that particular host. Depending on its configuration, a HIDS can monitor system activity, files, processes, logs, user activity, network activity associated with the host, configuration changes, and suspicious behaviour.

If an organisation has three computers (PC-01, PC-02, Server), each host runs its own HIDS, and each HIDS is responsible for detecting potential threats associated with its host.

> **1. Advantage — Detailed Host Visibility**
> HIDS provides detailed visibility into the activity of the host and can monitor things a network-based IDS may not directly see: file changes, process execution, system logs, user activity, configuration changes.

> **2. Advantage — Useful for Host-Level Investigation**
> If a specific server is compromised, HIDS can provide detailed information about exactly what happened on that server.

> **3. Disadvantage — Management at Scale**
> Each host needs its own HIDS (`10 hosts → 10 HIDS`, `100 hosts → 100 HIDS`, `10,000 hosts → 10,000 HIDS`). HIDS can be **resource-intensive** and **difficult to manage at large scale**.

> **Key point:** HIDS provides detailed visibility of individual hosts, but managing HIDS across a large environment can be challenging.

### Deployment Mode: NIDS

**NIDS** stands for **Network Intrusion Detection System**. Unlike HIDS, a NIDS monitors **network traffic** and can monitor traffic involving multiple hosts across a network. Its main purpose is to detect potentially malicious activity within the network, providing a **centralised view** of network activity.

> **1. Advantage — Centralised Monitoring**
> Instead of installing an IDS on every host, a single NIDS can monitor traffic across the network.

> **2. Advantage — Network-Wide Visibility**
> NIDS is useful for detecting malicious activity across an entire network. It can identify suspicious connections, network attacks, malicious packets, scanning activity, known attack patterns, and abnormal network traffic.

### HIDS vs NIDS

| Feature | HIDS | NIDS |
|---|---|---|
| Full Name | Host Intrusion Detection System | Network Intrusion Detection System |
| Deployment | Individual hosts | Network |
| Monitoring | Host activity | Network traffic |
| Visibility | Detailed host-level visibility | Network-wide visibility |
| Management | Difficult at large scale | More centralised |
| Scope | Specific host | Multiple hosts/network |
| Example | Server monitoring | Network traffic monitoring |

> **Memory trick:** `HIDS → H = Host → monitors ONE HOST` · `NIDS → N = Network → monitors NETWORK TRAFFIC`.

### Detection Mode: Signature-Based IDS

A **signature** is a known pattern associated with an attack. Many attacks occur repeatedly and have identifiable patterns, which an IDS can store in a **signature database** (e.g. SQL Injection pattern, Port Scan pattern, Malware Traffic pattern, Exploit pattern, Known Attack pattern). When traffic matches a signature, the IDS generates an alert: `Traffic → IDS → Compare with Signature DB → (Match → Alert)` or `(No Match → No Alert)`.

- **Effective for known threats.** Signature-based detection is fast and reliable for previously seen attacks.
- **Weak against zero-days.** If an attack has never been seen before, there may be no matching signature, so the IDS **may not detect** it.

### Detection Mode: Anomaly-Based IDS

Anomaly-based IDS first learns or defines **normal behaviour**, known as a **baseline**, then detects activity that deviates from that baseline: `Baseline → Current Activity → Compare → (Normal → No Alert)` or `(Abnormal → Alert)`.

A **baseline** represents what normal activity looks like. For example, if a server normally receives `100–500 requests/minute` and suddenly receives `50,000 requests/minute`, that is a significant deviation an anomaly-based IDS may identify as suspicious.

- **Advantage** — does not depend entirely on known signatures, so it can potentially detect **unknown attacks**, **zero-day attacks**, and unusual behaviour, making it useful against modern threats.
- **Disadvantage** — the major problem is **false positives**: legitimate applications can behave unusually (e.g. a legitimate traffic spike deviates from baseline and gets flagged), so anomaly-based IDS may generate a large number of alerts.
- **Reducing false positives** — fine-tune the IDS by manually refining what normal behaviour should look like: `Initial Baseline → Too Many Alerts → Fine-Tuning → Improved Baseline → Fewer False Positives`.

### Detection Mode: Hybrid IDS

A **Hybrid IDS** combines **Signature-Based Detection + Anomaly-Based Detection**, leveraging the strengths of both. For a known threat it uses the signature database (`Signature Match → Alert`); for a new/unusual threat it uses anomaly detection (`Deviation from Baseline → Alert`). Hybrid detection provides broader coverage — fast detection of known threats *plus* potential zero-day detection.

### Signature vs Anomaly vs Hybrid

| Detection Type | Detects Known Threats | Potential Zero-Day Detection | False Positives |
|---|---|---|---|
| Signature-Based | Excellent | Limited | Generally lower |
| Anomaly-Based | Possible | Yes | Generally higher |
| Hybrid | Yes | Yes | Depends on configuration |

> **Memory trick:** `SIGNATURE = Stored signature → Known attack` · `ANOMALY = Abnormal → Deviation from normal` · `HYBRID = Both → Signature + Anomaly`.

### Task 2 — Answers

| Question | Answer |
|---|---|
| **Q1. Which type of IDS is deployed to detect threats throughout the network?** | Network Intrusion Detection System (NIDS) |
| **Q2. Which IDS leverages both signature-based and anomaly-based detection techniques?** | Hybrid IDS |

### Interview Questions — Types of IDS

| Question | Answer |
|---|---|
| **Q1. What is HIDS?** | HIDS is a Host Intrusion Detection System that is installed on individual hosts and monitors host-level activity. |
| **Q2. What is NIDS?** | NIDS is a Network Intrusion Detection System that monitors network traffic to detect suspicious activities across a network. |
| **Q3. What is the main difference between HIDS and NIDS?** | HIDS monitors an individual host, while NIDS monitors network traffic across multiple hosts. |
| **Q4. What is signature-based detection?** | Signature-based detection compares activity against known attack patterns stored in a signature database. |
| **Q5. Can signature-based IDS detect zero-day attacks?** | Generally no, because zero-day attacks do not have a previously known signature. |
| **Q6. What is anomaly-based detection?** | Anomaly-based detection establishes a baseline of normal behaviour and detects significant deviations from that baseline. |
| **Q7. What is the biggest problem with anomaly-based IDS?** | False positives — legitimate unusual behaviour may be incorrectly classified as malicious. |
| **Q8. What is a Hybrid IDS?** | A Hybrid IDS combines signature-based and anomaly-based detection techniques. |

---

## Task 3 — IDS Example: Snort

**Snort** is one of the most widely used **open-source IDS solutions**. It was originally developed in **1998** and is widely used for network security monitoring and intrusion detection. Snort can use different detection approaches — **Signature-Based** and **Anomaly-Based** — and its detection logic is primarily defined through **rule files**.

### Snort Rules

Snort comes with several **built-in rule files** that contain known attack patterns and network traffic conditions Snort can detect. Administrators can also create **custom rules** when the default rules do not cover a particular requirement.

- **Built-in Rules** — detect many known malicious activities out of the box.
- **Custom Rules** — created by administrators for organisation-specific traffic (e.g. detecting ICMP ping), letting security teams detect traffic specific to their environment.

### Snort Modes

Snort can operate in multiple modes; the three important ones covered in this room are:

> **1. Packet Sniffer Mode**
> Snort reads and displays network packets. It does **not** perform intrusion detection analysis in this mode. Packets can be displayed on the console or written to a file. Useful for network monitoring, troubleshooting, and understanding traffic. Remember: **Packet Sniffer Mode ≠ Intrusion Detection Mode**.

> **2. Packet Logging Mode**
> Snort captures network traffic and stores it for later analysis, typically in **PCAP** format (packet capture). Analysts can later examine this traffic during forensic investigation, incident investigation, and root cause analysis — useful when investigating an attack that happened previously.

> **3. NIDS Mode**
> The **Network Intrusion Detection System (NIDS) Mode** is the primary mode of Snort for IDS functionality: `Monitor traffic → Apply rule files → Match known attack patterns → Generate alerts`. This is the main functionality expected from an IDS.

| Mode | Main Purpose | Detection? | Output |
|---|---|---|---|
| Packet Sniffer Mode | Read/display packets | No | Console/file |
| Packet Logging Mode | Store traffic | Detection not primary purpose | PCAP |
| NIDS Mode | Detect malicious traffic | Yes | Alerts |

> **Memory trick:** `Sniffer → SEE 👀` · `Logger → SAVE 💾` · `NIDS → DETECT 🚨`. Although Snort supports multiple modes, the most relevant mode for its use as an IDS is **NIDS Mode**.

### Snort Is Rule Driven

A very important concept: `Traffic → Snort → Rules → Detection → Alert`. The rules define what traffic Snort should detect, so **understanding Snort rules is essential for using Snort effectively as an IDS**.

### Snort Rule Structure

A basic Snort rule looks like this:

```text
alert icmp any any -> $HOME_NET any (msg:"Ping Detected"; sid:10001; rev:1;)
```

The general structure is `action protocol source_ip source_port -> destination_ip destination_port (options)`. Breaking the example rule into its fields:

| Field | Value | Meaning |
|---|---|---|
| Action | `alert` | What Snort does when the rule matches — here, generate an alert |
| Protocol | `icmp` | The network protocol the rule looks for (ICMP is used by the `ping` command) |
| Source IP | `any` | Where the traffic originates — `any` matches any source IP |
| Source Port | `any` | Source port — `any` matches any source port (ICMP does not use ports like TCP/UDP, but the positional field remains) |
| Direction | `->` | Direction of traffic, from source toward destination |
| Destination IP | `$HOME_NET` | A Snort variable representing the monitored/protected network |
| Destination Port | `any` | Applies regardless of the destination port |
| Metadata | `(msg:"Ping Detected"; sid:10001; rev:1;)` | Rule options inside the parentheses |

The **rule metadata** contains three key options:

- `msg:"Ping Detected"` — the **message** displayed when the rule triggers (shown as `Ping Detected`).
- `sid:10001` — the **Signature ID**, a unique identifier that distinguishes this rule from others.
- `rev:1` — the **Revision**/version of the rule; incremented when the rule is modified (e.g. `rev:2`).

### Rule → Match → Alert

Rule flow for the example: `Incoming Traffic → Protocol? (ICMP) → Source Match? → Destination Match? → Rule Match → Generate Alert → "Ping Detected"`.

> **Golden rule:** `Packet Sniffer = Observe` · `Packet Logging = Save` · `NIDS = Detect` · `sid = Signature ID` · `rev = Revision` · `msg = Alert Message`.

### Task 3 — Answers

| Question | Answer |
|---|---|
| **Q1. Which mode of Snort helps us to log the network traffic in a PCAP file?** | Packet Logging Mode |
| **Q2. What is the primary mode of Snort called?** | Network Intrusion Detection System Mode (NIDS Mode) |

### Interview Questions — Snort

| Question | Answer |
|---|---|
| **Q. What is Snort?** | Snort is an open-source intrusion detection solution used to monitor network traffic and detect malicious activity. |
| **Q. What is the primary IDS mode of Snort?** | NIDS Mode. |
| **Q. What does packet sniffer mode do?** | It reads and displays network packets without performing intrusion detection analysis. |
| **Q. What does packet logging mode do?** | It captures network traffic and stores it, typically in PCAP format, for later analysis. |
| **Q. What is the purpose of Snort rules?** | Snort rules define the traffic patterns and conditions that Snort should detect. |
| **Q. What is `sid`?** | Signature ID — a unique identifier for a Snort rule. |
| **Q. What is `rev`?** | Revision number of the rule. |
| **Q. What is `msg`?** | The message displayed when the rule triggers. |

---

## Task 4 — Snort Usage

Snort can **capture live traffic**, **read existing PCAP files**, analyse packets, detect suspicious traffic, and generate alerts. The basic workflow is `Traffic → Snort → Select Interface / PCAP → Choose Mode → Apply Rules → Detect → Output / Alerts`.

### Running Snort & Getting Help

The basic command is `snort`. To see the available command-line options:

```bash
$ snort
$ snort -?
$ snort --help
```

### Selecting a Network Interface

When Snort monitors live traffic, it needs to know **which network interface** to listen on, specified with `-i <interface>`. Before running Snort, identify the available interfaces with `ip addr` (or `ip a`):

```bash
$ ip addr
1: lo
2: eth0
3: wlan0
```

Possible interfaces include `lo`, `eth0`, `ens33`, `enp0s3`, `wlan0` — the exact name depends on the system. The `lo` interface is usually the **loopback interface**, used for communication within the local system; traffic sent through loopback does not normally leave the host.

### Live Packet Capture & Verbose Output

Snort can capture packets directly from a live interface, and several flags control how much packet detail is shown:

```bash
$ sudo snort -i eth0
$ sudo snort -v -i eth0
$ sudo snort -v -d -i eth0
$ sudo snort -v -d -e -i eth0
```

- `-v` — verbose packet output on the terminal.
- `-d` — display application-layer packet data (payload).
- `-e` — display link-layer information.

### Reading a PCAP File

Snort can also analyse previously captured traffic with `-r`, which is useful for **incident response, digital forensics, threat hunting, malware analysis, network investigation, and troubleshooting**:

```bash
$ sudo snort -r capture.pcap
```

> **Memory trick:** `-i → Interface (live traffic)` · `-r → Read PCAP (existing traffic)`. Do not confuse them.

### Configuration File

Snort uses a configuration file to define its behaviour — commonly `snort.lua` depending on the version — which can contain network variables, rule paths, detection settings, logging settings, and output settings. Specify it with `-c`, and combine with `-i` for live analysis:

```bash
$ sudo snort -c /path/to/snort.lua
$ sudo snort -c /path/to/snort.lua -i eth0
```

Without the correct configuration, Snort may not monitor or detect traffic as expected.

### Quiet Mode

The `-q` option enables **quiet mode**, reducing unnecessary startup/output information so important alerts are easier to notice:

```bash
$ sudo snort -q -i eth0
```

### Snort Command-Line Options

| Option | Meaning |
|---|---|
| `-i` | Select network interface |
| `-r` | Read PCAP |
| `-c` | Specify configuration |
| `-v` | Verbose packet output |
| `-d` | Display packet data |
| `-e` | Display link-layer information |
| `-q` | Quiet mode |

### Understanding a Snort Alert

Snort generates an alert when a rule matches network traffic. An example alert:

```text
[**] [1:10001:1] Ping Detected [**]
```

The identifier `[1:10001:1]` breaks down as:

| Position | Value | Meaning |
|---|---|---|
| First | `1` | Generator ID — identifies the component that generated the event |
| Second | `10001` | Signature ID — corresponds to `sid:10001` in the rule |
| Third | `1` | Revision — corresponds to `rev:1` in the rule |

And `Ping Detected` is the custom message defined by `msg:"Ping Detected"`. So the rule `alert icmp any any -> $HOME_NET any (msg:"Ping Detected"; sid:10001; rev:1;)`, when matched by a matching ICMP packet, produces `[**] [1:10001:1] Ping Detected [**]`.

### Live vs Offline Detection

The same rule logic works in both scenarios: **Live Detection** = `Network → Interface → Snort → Rules → Alert`; **Offline Detection** = `PCAP → snort -r → Rules → Alert`. Snort can also produce different outputs depending on configuration and mode: console output, alert logs, packet logs, PCAP, and other configured logging formats.

### Interview Questions — Snort Usage

| Question | Answer |
|---|---|
| **Q1. How do you select a network interface in Snort?** | Use `-i <interface>`, e.g. `sudo snort -i eth0`. |
| **Q2. How do you read a PCAP file using Snort?** | Use `-r <pcap-file>`, e.g. `sudo snort -r capture.pcap`. |
| **Q3. What does `-c` do?** | It specifies the Snort configuration file, e.g. `sudo snort -c /path/to/snort.lua`. |
| **Q4. What does `-v` do?** | It enables verbose packet output. |
| **Q5. What does `-d` do?** | It displays packet/application-layer data. |
| **Q6. What does `-e` do?** | It displays link-layer information. |
| **Q7. What does `-q` do?** | It enables quiet mode and reduces unnecessary output. |
| **Q8. What is the difference between `-i` and `-r`?** | `-i` captures LIVE traffic from an interface; `-r` reads EXISTING traffic from a PCAP file. |

---

## Task 5 — Practical Lab

The practical lab puts everything together on a Linux machine with **Snort** installed. The main idea: **generate network traffic → Snort observes it → a rule detects it → an alert is generated**. The lab workflow as step-cards:

| Step | Action |
|---|---|
| **1** | **Find the interface**<br>Run `ip addr` (or `ip a`) to determine which interface Snort should capture from — selecting the wrong interface means Snort won't see the expected traffic. |
| --- | --- |
| **2** | **Create / load the Snort rule**<br>Write the custom detection rule and load it via the Snort configuration. |
| **3** | **Start Snort**<br>Start Snort against the discovered interface (or with a config file for NIDS mode). |
| **4** | **Generate test traffic**<br>Produce traffic that should trigger the rule — ICMP via `ping <target>`. |
| **5** | **Snort receives the packet**<br>The ICMP packet reaches Snort through the monitored interface. |
| **6** | **Rule matches**<br>Snort's rule engine matches the ICMP packet against the loaded rule. |
| **7** | **Alert generated**<br>Snort outputs `[1:10001:1] Ping Detected`, which the analyst then investigates. |

### Lab Commands

Identify the interface, start Snort, and generate ICMP test traffic:

```bash
$ ip addr
1: lo
2: eth0
3: wlan0
$ sudo snort -i eth0
$ sudo snort -c /path/to/snort.lua -i eth0
$ ping 10.10.10.10
```

Because ICMP (used by `ping`) is easy to generate, it is convenient for demonstrating a simple Snort IDS rule: `ping → ICMP Echo Request → Network Interface → Snort`.

### The Custom Rule

The practical rule used in the lab:

```text
alert icmp any any -> $HOME_NET any (msg:"Ping Detected"; sid:10001; rev:1;)
```

This tells Snort: *if ICMP traffic comes from any source towards the home network, then generate an alert with the message "Ping Detected".* When an ICMP packet matches, Snort generates:

```text
[**] [1:10001:1] Ping Detected [**]
```

where `Generator ID = 1`, `Signature ID = 10001`, `Revision = 1`, and `Message = Ping Detected`.

### Detection vs Prevention

The lab reinforces a key concept: `Snort detects → Snort alerts → Analyst investigates`. Snort running as an IDS does **not** automatically block the traffic:

| Solution | Behaviour |
|---|---|
| **IDS** | Detect + Alert |
| **IPS** | Detect + Prevent/Block |

### Detection Engineering & Rule Tuning

Creating a Snort rule is a simple example of **detection engineering**: `Threat → Identify Indicator/Pattern → Write Detection Rule → Test Rule → Generate Alert → Tune Rule → Deploy Detection`. Real organisations have unique infrastructure (web servers, database servers, DNS servers, internal applications, employee systems), and a generic rule set may not detect every organisation-specific threat — custom rules let defenders create detections for specific IPs, protocols, ports, payloads, attack patterns, and internal behaviour.

A poorly designed rule can generate too many alerts: `Very Broad Rule → Lots of Matches → Many Alerts → Alert Fatigue`. A better rule is **specific + relevant + tested + well documented**, which reduces unnecessary alerts.

### An Alert Is Not a Confirmed Attack

If a rule detects *every* ICMP packet, it will alert on malicious pings, administrator pings, monitoring pings, and troubleshooting pings alike. Therefore `Detection ≠ Confirmed Attack` — an IDS alert is an **indicator that requires investigation**. When an alert appears, an analyst investigates context: *Who generated the traffic? What was the destination? What protocol/port? When did it happen? Was the activity expected? Was there other suspicious activity?* If packet captures are available, the analyst can inspect the actual traffic: `Alert → Associated Traffic → PCAP → Packet Analysis → Determine Intent`.

### IDS in a Real SOC

The same concept scales into a SOC: `Network → Snort → Alert → Log Collection → SIEM → SOC Analyst → (Investigate / Escalate) → Incident Response`. Snort alerts can be correlated with firewall logs, DNS logs, endpoint logs, authentication logs, and web logs to improve detection accuracy.

### Common Practical Mistakes

- **Wrong interface** — Snort listens on the wrong interface → no expected traffic → no alert. Always verify with `ip addr`.
- **Rule not loaded** — packet capture is not the same as IDS detection; the correct configuration and rules must be loaded (`Packet Capture ≠ IDS Detection`).
- **Wrong target** — pinging somewhere outside the monitored network means the rule may not match.
- **Assuming every alert is an attack** — `IDS Alert ≠ Confirmed Incident`; always investigate context.

### Interview Questions — Practical Lab

| Question | Answer |
|---|---|
| **Q1. How can you identify the network interfaces on Linux?** | Use `ip addr` or `ip a`. |
| **Q2. How do you capture live traffic with Snort?** | `sudo snort -i <interface>`. |
| **Q3. How do you read a PCAP file with Snort?** | `sudo snort -r capture.pcap`. |
| **Q4. What command can generate ICMP traffic?** | `ping <target>`. |
| **Q5. What does `sid` represent in a Snort rule?** | Signature ID. |
| **Q6. What does `rev` represent?** | Rule revision. |
| **Q7. What does `msg` represent?** | The message displayed when the rule triggers. |
| **Q8. What does `$HOME_NET` represent?** | The network configured as the protected/home network for Snort monitoring. |
| **Q9. What happens when a packet matches a rule containing `alert`?** | Snort generates an alert. |
| **Q10. Does an IDS alert automatically mean an attack occurred?** | No. An alert indicates suspicious activity that should be investigated. |

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **IDS** | Intrusion Detection System — detects suspicious/malicious activity and generates alerts (`Detect + Alert`). |
| **Firewall vs IDS** | Firewall controls network traffic (`Allow/Deny`); IDS detects suspicious activity inside the network. |
| **IDS vs IPS** | IDS = Detect + Alert; IPS = Detect + Prevent/Block. |
| **IDS ≠ Prevention** | An IDS detects and reports — it does **not** automatically stop the detected threat. |
| **False positive** | Legitimate activity flagged as malicious; too many cause alert fatigue and hide real attacks. |
| **Zero-day** | New/unknown attack with no existing signature; anomaly/hybrid detection helps catch it. |
| **HIDS** | Host Intrusion Detection System — installed per host; detailed host visibility; hard to manage at scale. |
| **NIDS** | Network Intrusion Detection System — monitors network traffic; centralised, network-wide visibility. |
| **Signature-based** | Compares traffic to known attack patterns (signature DB); strong on known threats, weak on zero-days. |
| **Anomaly-based** | Builds a baseline of normal behaviour, detects deviations; catches unknown threats but more false positives. |
| **Hybrid** | Combines signature + anomaly detection for broader coverage. |
| **Snort** | Open-source IDS (since 1998); rule-driven; supports signature and anomaly detection. |
| **Snort modes** | Packet Sniffer (see 👀) · Packet Logging (save 💾, PCAP) · NIDS (detect 🚨 — primary IDS mode). |
| **Rule format** | `action protocol source_ip source_port -> destination_ip destination_port (options)`. |
| **Example rule** | `alert icmp any any -> $HOME_NET any (msg:"Ping Detected"; sid:10001; rev:1;)`. |
| **Rule options** | `msg` = alert message · `sid` = Signature ID · `rev` = revision. |
| **$HOME_NET** | Snort variable for the protected/monitored network. |
| **Key options** | `-i` interface · `-r` read PCAP · `-c` config · `-v` verbose · `-d` packet data · `-e` link-layer · `-q` quiet. |
| **Alert format** | `[**] [1:10001:1] Ping Detected [**]` → `Generator ID : Signature ID : Revision` + message. |
| **Alert ≠ attack** | `Detection ≠ Confirmed Attack` — an IDS alert is an indicator that requires investigation. |

**Key idea:** An IDS **monitors → analyses → detects → alerts** so that analysts can **investigate**. Classify it by **where** it runs (**HIDS** vs **NIDS**) and **how** it detects (**Signature**, **Anomaly**, **Hybrid**). **Snort** is the classic open-source, rule-driven network IDS.

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is an IDS?** | A security solution that monitors network or system activity to detect suspicious or malicious behaviour and generate alerts. |
| **Q2. What is the difference between a firewall and an IDS?** | A firewall controls traffic (allow/deny) at the boundary; an IDS monitors activity inside the network and detects suspicious behaviour. |
| **Q3. What is the difference between an IDS and an IPS?** | IDS = detect + alert; IPS = detect + prevent/block. |
| **Q4. Can an IDS prevent a threat after detecting it?** | No — an IDS is primarily a detection and alerting system. |
| **Q5. What is HIDS?** | Host Intrusion Detection System — installed on individual hosts to monitor host-level activity. |
| **Q6. What is NIDS?** | Network Intrusion Detection System — monitors network traffic to detect suspicious activity across a network. |
| **Q7. What is signature-based detection?** | Comparing activity against known attack patterns stored in a signature database. |
| **Q8. Can signature-based IDS detect zero-day attacks?** | Generally no, because zero-day attacks have no previously known signature. |
| **Q9. What is anomaly-based detection?** | Establishing a baseline of normal behaviour and detecting significant deviations from it. |
| **Q10. What is the biggest problem with anomaly-based IDS?** | False positives — legitimate unusual behaviour may be flagged as malicious. |
| **Q11. What is a Hybrid IDS?** | An IDS that combines signature-based and anomaly-based detection techniques. |
| **Q12. What is a false positive?** | When an IDS identifies legitimate activity as malicious. |
| **Q13. What is a zero-day attack?** | An attack exploiting a vulnerability that is not yet known or has no existing detection signature. |
| **Q14. What is Snort?** | An open-source intrusion detection solution used to monitor network traffic and detect malicious activity. |
| **Q15. What are Snort's three modes?** | Packet Sniffer Mode, Packet Logging Mode, and NIDS Mode. |
| **Q16. What is Snort's primary IDS mode?** | NIDS Mode. |
| **Q17. In a Snort rule, what do `msg`, `sid`, and `rev` mean?** | `msg` = the message shown when the rule triggers; `sid` = Signature ID; `rev` = rule revision. |
| **Q18. What does `$HOME_NET` represent?** | The network configured as the protected/home network for Snort monitoring. |
| **Q19. What is the difference between `-i` and `-r` in Snort?** | `-i` captures live traffic from an interface; `-r` reads existing traffic from a PCAP file. |
| **Q20. Does an IDS alert automatically mean an attack occurred?** | No — an alert indicates suspicious activity that should be investigated. |

---

## Final Takeaway

An **IDS (Intrusion Detection System)** is a **detection layer** that sits *inside* the network, behind the **firewall**. Where a firewall **controls** traffic (`Allow/Deny`) and an **IPS** goes further to **Detect + Prevent/Block**, an IDS **detects and alerts** — it observes activity, identifies suspicious patterns, and hands the alert to a security analyst. Crucially, an IDS does **not** automatically stop the threat it finds.

An IDS is classified two ways. By **deployment mode**: **HIDS** (host-based, detailed per-host visibility but hard to manage at scale) versus **NIDS** (network-based, centralised network-wide visibility). By **detection mode**: **Signature-based** (matches known attack patterns — strong on known threats, weak on **zero-days**), **Anomaly-based** (builds a **baseline** and flags deviations — can catch unknown threats but produces more **false positives**), and **Hybrid** (combines both for broader coverage).

**Snort** is the classic **open-source**, rule-driven network IDS. It runs in three modes — **Packet Sniffer** (observe), **Packet Logging** (save to **PCAP**), and **NIDS** (detect, its primary IDS mode) — and its behaviour is defined by rules such as `alert icmp any any -> $HOME_NET any (msg:"Ping Detected"; sid:10001; rev:1;)`, where `msg`, `sid`, and `rev` describe the alert. From the command line, `-i` selects a live interface, `-r` reads a PCAP, `-c` loads the configuration (`snort.lua`), and `-v`/`-d`/`-e`/`-q` control output. A matching packet produces an alert like `[**] [1:10001:1] Ping Detected [**]`. The recurring lesson is that **`Detection ≠ Confirmed Attack`** — an IDS alert is the *beginning* of an investigation, not the conclusion.
