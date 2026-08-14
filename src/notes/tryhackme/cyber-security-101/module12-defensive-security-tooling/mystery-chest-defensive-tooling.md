| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Defensive Security Tooling / Bonus Revision |
| **Difficulty** | Beginner |
| **Time** | ~15 Minutes |
| **Module** | Defensive Security Tooling |

---

## Objective

This Mystery Chest is a **bonus revision vault** for the entire Defensive Security Tooling module. It consolidates the most important reference material from every room — CyberChef: The Basics, CAPA: The Basics, REMnux: Getting Started, and FlareVM: Arsenal of Tools — into one quick-reference place.

Use it as a lookup before a lab, an exam, or an interview. Everything here was covered across the module: how **CyberChef** decodes and deobfuscates data with recipes, how **CAPA** identifies a program's capabilities and maps them to MITRE ATT&CK, how **REMnux** provides a Linux malware-analysis workstation for document, network and memory analysis, and how **FlareVM** provides the Windows arsenal for static and dynamic executable analysis. The common thread is the analyst workflow — **triage → analyse statically → observe dynamically → correlate → extract IOCs**.

> **Analyst mindset:** a decoded string, a detected capability, a suspicious API, or a Malfind hit is a **lead, not proof**. Correlate multiple sources before concluding — *suspicious ≠ malicious*.

---

## Defensive Tooling at a Glance

Each tool answers a different analysis question, and together they cover data, capability, Linux, and Windows analysis.

| Tool | Platform | What it does |
|------|----------|--------------|
| **CyberChef** | Web / offline | Decode, deobfuscate and transform data with recipes |
| **CAPA** | Cross-platform CLI | Identify a program's capabilities, map to MITRE ATT&CK / MAEC |
| **REMnux** | Linux distro | Malware-analysis workstation: documents, network sim, memory |
| **FlareVM** | Windows env | Static + dynamic executable analysis arsenal |

> **Security relevance:** the tools are complementary — CyberChef untangles encoded payloads, CAPA summarises what a binary *can do*, REMnux dissects documents/memory on Linux, and FlareVM investigates executables on Windows.

---

## CyberChef Quick Reference

**CyberChef** is the "Cyber Swiss Army Knife" — a tool for decoding, deobfuscating and transforming data using a chain of operations called a **recipe**.

| Concept | Key fact |
|--------|----------|
| **Recipe** | An ordered chain of operations applied to the input, top to bottom |
| **Four areas** | Operations, Recipe, Input, Output |
| **Common ops** | From Base64, URL Decode, From Hex, ROT13, Morse Code, Magic |
| **Extractors** | Extract IP addresses, Extract URLs, Extract email addresses |
| **Access** | Online (hosted) or offline (local copy) — offline suits sensitive data |

> **Security relevance:** malware hides payloads behind **encoding** (Base64, hex, URL) and **obfuscation** — CyberChef reverses them, but decoding reveals *what data is*, not that it *executed*.

---

## CAPA Quick Reference

**CAPA** identifies the **capabilities** of a program — what it is *able* to do — by matching its code against a library of rules, then maps findings to **MITRE ATT&CK** and **MAEC**.

| Concept | Key fact |
|--------|----------|
| **Capability** | A behaviour a program can perform (e.g. write a file, create a process, connect to a host) |
| **Rules** | CAPA matches code against community rules to identify capabilities |
| **Frameworks** | Maps to MITRE ATT&CK (adversary techniques) and MAEC (malware attributes) |
| **Verbosity** | `-v` verbose, `-vv` very verbose (more `v` = more detail) |
| **Output** | `-j` JSON; redirect large output with `>` |

Common command patterns:

```bash
# Basic analysis
capa.exe .\cryptbot.bin

# Verbose / very verbose
capa.exe -v .\cryptbot.bin
capa.exe -vv .\cryptbot.bin

# JSON + very verbose to a file
capa.exe -j -vv .\cryptbot.bin > cryptbot_vv.json
```

> **Security relevance:** a **capability ≠ maliciousness** — legitimate software also writes files and makes connections. CAPA speeds triage by summarising behaviour; the analyst decides intent.

---

## REMnux Quick Reference

**REMnux** is a Linux distribution pre-loaded with malware-analysis tools, used for document, network and memory analysis.

| Concept | Key fact |
|--------|----------|
| **Static vs Dynamic** | Static = examine without running; Dynamic = run and observe |
| **oledump.py** | `oledump.py file` lists streams; `-s N` selects; `--vbadecompress` decompresses VBA |
| **VBA IOCs** | `Invoke-WebRequest -Uri … -OutFile …` downloads; `Start-Process` executes |
| **INetSim** | Fake Internet; reports under `/var/log/inetsim/report/` |
| **Volatility 3** | `pslist`, `pstree`, `cmdline`, `filescan`, `dlllist`, `psscan`, `malfind` |
| **strings** | ASCII, `-e l` (UTF-16LE), `-e b` (UTF-16BE); then `grep` for IOCs |

Memory-forensics essentials:

```bash
$ vol3 -f wcry.mem windows.pstree.PsTree
$ vol3 -f wcry.mem windows.malfind.Malfind
$ strings -e l wcry.mem > strings.txt
$ grep -i "WanaDecryptor" strings.txt
```

> **Security relevance:** `PsList` shows active processes while `PsScan` can find **hidden** ones; `Malfind` flags injected code (the room finds `csrss.exe` then `winlogon.exe`) — always investigate before concluding.

---

## FlareVM Quick Reference

**FlareVM** is a customized Windows environment packed with tools for malware analysis, reverse engineering and forensics — the Windows counterpart to REMnux.

| Concept | Key fact |
|--------|----------|
| **Six core tools** | Wireshark, PEStudio, FLOSS, Process Explorer, Procmon, CFF Explorer |
| **Static tools** | PEStudio (PE metadata), FLOSS (strings/obfuscation), CFF Explorer (PE structure) |
| **Dynamic tools** | Process Explorer (processes), Procmon (system activity), Wireshark (network) |
| **PE concepts** | Headers, sections, entropy, Rich Header, imported APIs, hashes |
| **FLOSS** | `FLOSS.exe .\windows.exe > windows.txt` — recovers obfuscated strings |

> **Security relevance:** high **entropy** suggests packing/encryption, suspicious **imported APIs** hint at capability, and an unknown outbound IP seen in Procmon/Wireshark is a **C2 indicator** — each an IOC, none alone proof.

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **Workflow** | Triage → static analysis → dynamic analysis → correlate → extract IOCs. |
| **CyberChef** | Recipe of operations; decode Base64/URL/hex/ROT13; extractors for IP/URL/email. |
| **CAPA** | Identifies capabilities; maps to MITRE ATT&CK + MAEC; `-v`/`-vv`/`-j`. |
| **Capability rule** | A capability is what code *can* do — not proof it is malicious. |
| **REMnux** | Linux malware-analysis distro: oledump/VBA, INetSim, Volatility, strings. |
| **Volatility** | `vol3 -f image windows.<plugin>`; pslist/pstree/cmdline/filescan/dlllist/psscan/malfind. |
| **strings** | `-e l` UTF-16LE, `-e b` UTF-16BE; pipe to `grep` for IOCs. |
| **FlareVM** | Windows arsenal: Wireshark, PEStudio, FLOSS, Process Explorer, Procmon, CFF Explorer. |
| **Static vs Dynamic** | Examine without running vs run and observe — use both. |
| **Golden rule** | Decoded data / capability / API / memory hit = lead; correlate before concluding. |

**Key idea:** defensive tooling is one connected workflow — **CyberChef** untangles encoded data, **CAPA** summarises what a binary can do, **REMnux** dissects documents, traffic and memory on Linux, and **FlareVM** investigates executables on Windows — all driven by *analyse statically, observe dynamically, correlate, then extract IOCs*.

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is a CyberChef recipe?** | An ordered chain of operations applied to the input to decode, deobfuscate or transform data. |
| **Q2. What does CAPA identify, and does a capability prove malice?** | CAPA identifies a program's capabilities (what it can do) and maps them to MITRE ATT&CK/MAEC; a capability is not proof of maliciousness — legitimate software shares many. |
| **Q3. What is the difference between static and dynamic analysis?** | Static analysis examines a file without running it; dynamic analysis runs the sample and observes its behaviour. |
| **Q4. Which REMnux tool analyses Office document macros, and how?** | `oledump.py` — it lists streams, selects one with `-s N`, and decompresses VBA with `--vbadecompress`. |
| **Q5. Which Volatility plugin flags injected/suspicious memory, and what did the room find?** | `windows.malfind.Malfind`; it flagged `csrss.exe` (1st) and `winlogon.exe` (2nd). |
| **Q6. Name three FlareVM tools and whether they are static or dynamic.** | PEStudio (static PE metadata), FLOSS (static strings), Process Monitor/Procmon (dynamic system activity). |

## Final Takeaway

The Mystery Chest is your one-page memory aid for the **Defensive Security Tooling module**. Skim it before any lab, exam, or interview: **CyberChef** transforms data through a **recipe** of operations (From Base64, URL Decode, From Hex, ROT13, extractors), online or offline; **CAPA** matches code against rules to list a program's **capabilities** and maps them to **MITRE ATT&CK** and **MAEC** (`capa.exe -vv -j file`), remembering a capability is not proof of malice; **REMnux** is the Linux malware-analysis workstation for **static** document analysis (`oledump.py -s`, `--vbadecompress`, VBA IOCs like `Invoke-WebRequest`/`Start-Process`), **dynamic** network simulation (**INetSim**, reports in `/var/log/inetsim/report/`), and **memory forensics** with **Volatility 3** (`pslist`, `pstree`, `cmdline`, `filescan`, `dlllist`, `psscan`, `malfind`) plus **strings** (`-e l`/`-e b`) piped to `grep`; and **FlareVM** is the Windows arsenal — **Wireshark, PEStudio, FLOSS, Process Explorer, Procmon, CFF Explorer** — for PE triage (entropy, imported APIs, Rich Header) and dynamic C2 confirmation. Across every room the discipline is identical: *decode, analyse, observe, and correlate* — a single indicator is a lead, but corroborated evidence tells the story.

---
*Bonus revision room authored for the Cyber Security 101 Defensive Security Tooling module — consolidating the CyberChef, CAPA, REMnux and FlareVM rooms.*
