| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Defensive Security Tooling / FlareVM |
| **Difficulty** | Easy |
| **Time** | Not stated in source |
| **Module** | Defensive Security Tooling |

---

## Objective

**FlareVM** is a customized Windows-based environment that ships with a large collection of tools for **malware analysis, digital forensics, reverse engineering, incident response, threat hunting, binary analysis, network analysis, and file analysis**. Instead of manually installing dozens of security tools, FlareVM provides a ready-to-use environment for security investigations. This room walks through the core FlareVM arsenal — **Wireshark, PEStudio, FLOSS, Process Explorer, Process Monitor (Procmon), CFF Explorer** — the difference between **static** and **dynamic** analysis, key **PE (Portable Executable)** concepts (headers, sections, entropy, Rich Header, imported APIs, hashes), and then applies everything in a hands-on investigation of a suspicious `windows.exe` sample: static triage in PEStudio and FLOSS, dynamic confirmation of a C2 connection in Process Explorer and Procmon, and the extraction of **IOCs (Indicators of Compromise)**.

By the end of this room you will be able to:

- Explain what **FlareVM** is and why a single analysis environment beats installing tools one by one
- Distinguish **static analysis** (*"What is inside?"*) from **dynamic analysis** (*"What happens when it runs?"*)
- Use the six core tools: **Wireshark** (network), **PEStudio** (static PE), **FLOSS** (strings/obfuscation), **Process Explorer** (processes), **Procmon** (system activity), **CFF Explorer** (PE structure)
- Read PE fundamentals — the `MZ` / `5A4D` DOS signature, `e_magic`, sections (`.text`, `.data`, `.rdata`, `.rsrc`), **entropy** (0→8), the **Rich Header**, and imported APIs / the **IAT**
- Calculate and use file **hashes** (`MD5`, `SHA-1`, `SHA-256`) as fingerprints and IOCs
- Extract strings with **FLOSS** (`FLOSS.exe .\windows.exe > windows.txt`) and compare it to traditional `strings`
- Investigate a suspicious `windows.exe`: fake `REGEDIT` metadata, entropy `7.999`, missing Rich Header, crypto APIs (`RijndaelManaged`, `CreateDecryptor`, `CryptoStream`), and `set_UseShellExecute`
- Confirm a C2 connection to `47.120.46.210:81` for `cobaltstrike.exe` using two independent tools and record the IOCs
- Apply the analyst golden rule: **one indicator ≠ proof; multiple correlated indicators = strong evidence**

> **Analyst mindset:** *Don't execute first — analyze statically, observe behaviour dynamically, then correlate the evidence.* A suspicious API, high entropy, or an unknown IP is an **indicator, not proof** of malware.

---

## Task 1 — FlareVM & the Arsenal of Tools

### What is FlareVM?

**FlareVM** stands for **Forensics, Logic Analysis, and Reverse Engineering**. It is a customized Windows-based environment containing a large collection of tools used for **Malware Analysis, Digital Forensics, Reverse Engineering, Incident Response, Threat Hunting, Binary Analysis, Network Analysis,** and **File Analysis**. Rather than manually installing and configuring dozens of security tools, FlareVM provides a dedicated, ready-to-use analysis environment — especially useful when investigating a suspicious executable.

```text
Windows
   │
   ├── Malware Analysis Tools
   │
   ├── Reverse Engineering Tools
   │
   ├── Digital Forensics Tools
   │
   ├── Network Analysis Tools
   │
   ├── Process Analysis Tools
   │
   └── File / Binary Analysis Tools
```

When a suspicious file arrives, FlareVM lets an analyst point several tools at it: `PEStudio` (static info), `FLOSS` (strings / obfuscation), `Process Explorer` (process behaviour), `Procmon` (system activity), `Wireshark` (network traffic), `CFF Explorer` (PE structure).

### Why FlareVM is Useful

A malware analyst normally needs many different tools. Instead of the *Install Tool 1 → Install Tool 2 → Configure Tool 4 → …* cycle, FlareVM provides a dedicated analysis environment. Main advantages:

- Large malware-analysis toolkit
- Windows-native analysis environment
- Useful for PE files
- Useful for reverse engineering
- Useful for incident response
- Useful for forensic investigations
- Allows multiple tools to be used together
- Helps analysts correlate findings

### The FlareVM Tool Arsenal

Different tools answer different questions:

| Tool | Primary Purpose |
|---|---|
| **Wireshark** | Network traffic analysis |
| **PEStudio** | Static executable analysis |
| **FLOSS** | String extraction / deobfuscation |
| **Process Explorer** | Process investigation |
| **Process Monitor** | Detailed system activity monitoring |
| **CFF Explorer** | PE / binary structure analysis |

Tool selection follows the question *"What do I want to know?"* → **File** (`PEStudio`, `FLOSS`, `CFF`) · **Process** (`ProcExp`, `Procmon`) · **Network** (`Wireshark`).

### General Malware Investigation Workflow

A good investigation normally starts with **static analysis**:

`Suspicious File → Identify → Calculate Hash → Static Analysis (PEStudio, FLOSS, CFF Explorer) → Dynamic Analysis (Process Explorer, Process Monitor, Network Monitoring) → Identify IOCs (Hash, IP, Domain, File, Process, Registry) → Investigate / Contain`

---

## Task 2 — Static vs Dynamic Analysis

### Static Analysis

Static analysis means examining a file **without executing it**. Examples: `PEStudio`, `FLOSS`, `CFF Explorer`, `strings`, hashing, PE headers, imported APIs, metadata. **Goal:** understand what the file **contains**.

### Dynamic Analysis

Dynamic analysis means observing what happens when the file is executed in a controlled environment. Examples: `Process Explorer`, `Process Monitor`, `Wireshark`, network monitoring, registry monitoring, file-system monitoring. **Goal:** understand what the file **does**.

> **Easy memory trick:** `STATIC = See the file` · `DYNAMIC = See the behaviour`. Or: *Static → "What is inside?"* · *Dynamic → "What happens when it runs?"*

---

## Task 3 — Commonly Used Tools

### Wireshark

**Wireshark** is a network protocol analyzer that captures and displays network packets. It is useful for network troubleshooting, incident response, malware analysis, protocol analysis, detecting suspicious connections, investigating C2 communication, and finding unusual network traffic. Typical packet information includes **Packet Number, Time, Source, Destination, Protocol, Length, Info**.

```text
No.     Source        Destination     Protocol
------------------------------------------------
1663    10.10.x.x     10.8.x.x        RDPUDP
1679    10.8.x.x      10.10.x.x       TLSv1.2
1685    10.10.x.x     10.8.x.x       TLSv1.2
```

Wireshark may show `TLSv1.2` / `Application Data` even though the actual payload is encrypted (`TCP → TLSv1.2 → Application Data`) — meaning we can see that communication is occurring, but the payload may be encrypted. For malware analysis, this helps identify **Source IP, Destination IP, Destination port, Protocol, Connection frequency, Suspicious domains,** and **Unusual traffic** — malware may talk to **Command & Control (C2)** to receive commands, send information, download payloads, and exfiltrate data.

### PEStudio

**PEStudio** is a static malware-analysis tool that inspects executable files **without running them**. It can provide **Hashes, PE headers, Entropy, Sections, Imports, Exports, Strings, Libraries, Resources, .NET information, Manifest, Certificates, Indicators,** and **Metadata**. Basic workflow: open `suspicious.exe` → review Hashes, Headers, Sections, Libraries, Functions, Strings, Resources, Manifest, Indicators.

### PE — Portable Executable Analysis

Windows executables commonly use the **PE (Portable Executable)** format (`.exe`, `.dll`, `.sys`). A PE file contains information that helps Windows load and execute it. Simplified structure:

```text
PE File
 │
 ├── DOS Header
 │
 ├── DOS Stub
 │
 ├── PE Header
 │
 ├── Optional Header
 │
 ├── Section Table
 │
 └── Sections
       ├── .text
       ├── .data
       ├── .rdata
       ├── .rsrc
       └── others
```

**DOS Header** — the beginning of a Windows PE file commonly contains the magic value `MZ` (hex `4D 5A`), the DOS header signature. The DOS header contains `e_magic = 5A4D` when represented according to the PE structure / little-endian ordering, commonly seen as `MZ`.

Important PE sections:

| Section | Contains |
|---|---|
| `.text` | Executable code — program instructions |
| `.data` | Initialized writable data |
| `.rdata` | Read-only data |
| `.rsrc` | Resources — Icons, Dialogs, Version information, Embedded files, Manifest |

**PEStudio Indicators** — PEStudio provides an **indicators** section that highlights potentially suspicious properties: **High entropy, Suspicious imports, Suspicious sections, Missing Rich Header, Unusual metadata, Packed / obfuscated characteristics, Executable type, Manifest, Certificates, .NET information**.

### File Hashes

A hash is a fixed-length value generated from file contents — a file's fingerprint. Common hashes and their lengths:

| Hash | Length |
|---|---|
| **MD5** | 32 hexadecimal characters |
| **SHA-1** | 40 hexadecimal characters |
| **SHA-256** | 64 hexadecimal characters |

Example: `malware.exe → SHA-256 → E9627EBAAC562067759681DCEBA8DDE8D83B1D813AF8181948C549E342F67C0E`. If two files have the same cryptographic hash, they have the same content with respect to that hash algorithm. Hashes are used for **Malware identification, IOC creation, File integrity verification, Threat intelligence, VirusTotal lookups,** and **Comparing samples**.

### Entropy

Entropy measures how random the data in a file or section appears to be. Higher entropy can indicate **Compression, Encryption, Packing,** or **Obfuscation**. For byte data, entropy is commonly measured on a scale approaching `0 → low randomness` and `8 → very high randomness`.

> **Important:** High entropy does **NOT** automatically mean malware — an encrypted legitimate file, a compressed legitimate file, and packed malware all show high entropy. *Entropy is an indicator, not proof.*

### Rich Header

The **Rich Header** is metadata found in many Windows PE files. It can contain information about the tools / build environment used to create the executable (Compiler, Build tools, Development environment). A **missing Rich Header** can sometimes be suspicious — possible reasons include a packed binary, obfuscated binary, modified PE, manually constructed PE, or malware attempting to evade analysis. But again: *Missing Rich Header ≠ automatic malware* — it is simply another indicator to investigate.

### Imported Functions / APIs

PEStudio can show the functions imported by an executable — commonly associated with the **Import Address Table (IAT)**. Imported APIs give clues about what a program may do:

| API | May indicate |
|---|---|
| `CreateProcess` | May create processes |
| `VirtualAlloc` | May allocate memory |
| `WriteFile` | May write files |
| `RegOpenKey` | May interact with registry |
| Cryptography APIs | May encrypt/decrypt data |

An API by itself does not prove malicious behavior — the analyst should correlate multiple indicators.

### Suspicious API Indicators

- **`set_UseShellExecute`** — allows a process to use the operating system shell when starting another process (`Malware → UseShellExecute → Windows Shell → Another Process`). This can be legitimate, but malware may use process-launching functionality for execution chains.
- **Cryptographic APIs** — the room's suspicious executable exposed `CryptoStream`, `RijndaelManaged`, `CipherMode`, `CreateDecryptor`, `CryptoStreamMode`. These indicate the program uses cryptographic functionality (encrypting files, decrypting configuration, protecting strings, ransomware functionality, obfuscating payloads). *Cryptography APIs alone do not prove malicious intent.*
- **`RijndaelManaged`** — Rijndael is the algorithm family from which AES was standardized; `RijndaelManaged` is a .NET cryptographic implementation.
- **`CreateDecryptor`** — creates a decryptor (`Encrypted Data → CreateDecryptor → Decrypted Data`); malware can use it to decrypt configuration, payloads, strings, or embedded content.
- **`CryptoStream`** — allows cryptographic transformations to be applied while data is read/written through a stream (`Data → CryptoStream → Encryption / Decryption → Output`).

### FLOSS

**FLOSS** stands for **FLARE Obfuscated String Solver**. It was formerly known as **FireEye Labs Obfuscated String Solver**. FLOSS performs advanced static string analysis and can extract **Static strings, Stack strings, Tight strings,** and **Decoded strings** — particularly useful when malware attempts to hide strings.

Strings may reveal **URLs, IP addresses, File paths, Registry keys, Commands, API names, Error messages, Encryption information, C2 addresses,** and **Configuration** (e.g. `http://malicious.example`, `C:\Users\Public\payload.exe`, `cmd.exe`, `powershell.exe`, `192.168.1.10`) — all valuable IOCs.

FLOSS output categories: **Static Strings** (ASCII, UTF-16LE) · **Stack Strings** (constructed on the stack) · **Tight Strings** (generated during execution) · **Decoded Strings** (recovered after decoding).

Example run against `cobaltstrike.exe`:

```text
static strings  → 189
stack strings   → 0
tight strings   → 0
decoded strings → 0
```

The static strings included:

```text
CreateFileA
CreateNamedPipeA
CreateThread
GetProcAddress
LoadLibraryW
VirtualAlloc
VirtualProtect
WriteFile
KERNEL32.dll
msvcrt.dll
```

> **Important FLOSS observation:** FLOSS finding **no decoded strings** does not mean the file is safe — it only means FLOSS did not identify a decodable/obfuscated string using the techniques available. Malware can still use runtime-generated strings, encrypt configuration, use custom decoding, or use another obfuscation technique.

**FLOSS vs `strings`** — traditional `strings malware.exe` mainly extracts printable strings; FLOSS goes further (Static, Stack, Tight, Decoded).

> **Memory trick:** `strings = "What text is visible?"` · `FLOSS = "What hidden strings can I recover?"`

### Process Explorer

**Process Explorer** is a Windows Sysinternals tool that provides detailed information about running processes: **Processes, Parent-child relationships, Threads, Handles, Loaded DLLs, Process properties, Network-related information, Process IDs**. One of the most useful concepts is the **parent-child** relationship, which tells us how a process was launched:

```text
explorer.exe
     │
     └── cobaltstrike.exe
             │
             └── suspicious child process
```

For a `suspicious.exe`, an analyst can ask *Who started it?* (Parent Process), *What did it start?* (Child Processes), *What DLLs does it load?* (Loaded Modules), and *What is its PID?* (Process Identification).

Process Explorer can also provide **TCP/IP** information for a process, associating `Process → Network Connection` — e.g. `cobaltstrike.exe` (PID `4756`) → Remote Address `47.120.46.210`, Port `81`.

### Process Monitor (Procmon)

**Process Monitor (Procmon)** is a Windows Sysinternals tool for monitoring system activity, providing detailed information about events involving **Processes, Files, Registry, Network activity, Threads,** and **System operations**. Instead of asking *"What is this executable?"* it lets us ask *"What is this executable actually doing?"* Procmon events can show **Time, Process Name, PID, Operation, Path, Result**:

```text
Process Name     PID     Operation
------------------------------------------
cobaltstrike.exe 1120    TCP Reconnect
cobaltstrike.exe 1120    TCP Disconnect
```

**Filtering** is essential because Procmon generates huge amounts of data. The shortcut `Ctrl + L` opens the filtering interface. Example filter flow: `Ctrl + L → Process Name → contains → cobalt → Include → Add → Apply`. The room used Procmon to confirm that `cobaltstrike.exe` was communicating with `47.120.46.210`, verifying the connection identified using Process Explorer.

> **Correlation:** *Never rely on only one tool when you can independently verify an important finding.* Process Explorer shows the connection to `47.120.46.210`; Process Monitor confirms it — making the investigation stronger.

### CFF Explorer

**CFF Explorer** is a PE analysis tool that inspects **PE headers, DOS Header, NT Headers, Sections, Imports, Exports, Resources, .NET structures,** and **Metadata**. It can also provide hashes (useful for file identification, integrity verification, threat intelligence, malware comparison). The `DOS Header` contains fields including `e_magic`; the PE magic value is `5A4D`, which corresponds to `MZ`.

### Quick Tool Comparison

| Tool | Main Question |
|---|---|
| **PEStudio** | What does this executable look like statically? |
| **FLOSS** | What strings are hidden inside it? |
| **CFF Explorer** | What is the PE structure? |
| **Process Explorer** | What processes are running and related? |
| **Procmon** | What activity is the process performing? |
| **Wireshark** | What network traffic is occurring? |

### Important Commands

```powershell
# Extract strings with FLOSS
FLOSS.exe .\windows.exe

# Save results to a file (> redirects output)
FLOSS.exe .\windows.exe > windows.txt
```

```bash
# Traditional strings extraction (Linux)
strings malware.exe

# Search for interesting strings
strings malware.exe | grep -i "http"
strings malware.exe | grep -i "cmd"
strings malware.exe | grep -i "powershell"
```

```powershell
# Calculate hashes with PowerShell
Get-FileHash .\windows.exe

# SHA-256 explicitly
Get-FileHash .\windows.exe -Algorithm SHA256

# MD5
Get-FileHash .\windows.exe -Algorithm MD5

# SHA-1
Get-FileHash .\windows.exe -Algorithm SHA1
```

```bash
# Linux hash commands
md5sum malware.exe
sha1sum malware.exe
sha256sum malware.exe
```

### Task 3 — Commonly Used Tools (Answers)

| Question | Answer |
|---|---|
| **Q1. Which tool was formerly known as FireEye Labs Obfuscated String Solver?** | FLOSS |
| **Q2. Which tool offers in-depth insights into active processes running on your computer?** | Process Explorer |
| **Q3. By using Process Explorer, under what process can we find `smss.exe`?** | System |
| **Q4. Which powerful Windows tool is designed to help you record issues with your system's apps?** | Procmon |
| **Q5. Which tool can be used for static analysis or studying executable file properties without running the files?** | PEStudio |
| **Q6. Using PEStudio to open `cryptominer.bin` in the Desktop\Sample folder, what is the SHA-256 value?** | E9627EBAAC562067759681DCEBA8DDE8D83B1D813AF8181948C549E342F67C0E |
| **Q7. Using PEStudio to open `cryptominer.bin`, how many functions does it have?** | 102 |
| **Q8. What tool can generate file hashes for integrity verification, authenticate the source of system files, and validate their validity?** | CFF Explorer |
| **Q9. Using CFF Explorer to open `possible_medusa.txt`, what is the MD5?** | 646698572AFBBF24F50EC5681FEB2DB7 |
| **Q10. Using CFF Explorer, go to the DOS Header section. What is the `e_magic` value?** | 5A4D |

### Interview Questions — Tools & Concepts

| Question | Answer |
|---|---|
| **Q1. What is FlareVM?** | FlareVM is a customized Windows environment containing tools for malware analysis, reverse engineering, digital forensics, and incident response. |
| **Q2. What is static analysis?** | Static analysis examines a file without executing it. |
| **Q3. What is dynamic analysis?** | Dynamic analysis examines the behaviour of a program while it is executing in a controlled environment. |
| **Q4. What is PEStudio used for?** | PEStudio is used for static analysis of Windows executable files and provides information such as hashes, PE headers, sections, imports, strings, entropy, and indicators. |
| **Q5. What is FLOSS?** | FLOSS is the FLARE Obfuscated String Solver, used to extract and recover strings from binaries, including potentially obfuscated strings. |
| **Q6. What was FLOSS formerly known as?** | FireEye Labs Obfuscated String Solver. |
| **Q7. What is Process Explorer?** | Process Explorer is a Sysinternals tool that provides detailed information about running processes, their relationships, threads, handles, and other process properties. |
| **Q8. What is Procmon?** | Process Monitor is a Sysinternals tool used to monitor detailed system activity such as process, file-system, registry, and other events. |
| **Q9. Why use filters in Procmon?** | Procmon generates a large amount of event data, so filters allow analysts to isolate events related to a specific process or activity. |
| **Q10. What does high entropy indicate?** | High entropy indicates highly random-looking data and can be associated with encryption, compression, or packing. It is an indicator, not proof of malware. |
| **Q11. Why are hashes useful?** | Hashes provide a fingerprint of a file and are useful for identification, integrity verification, malware tracking, and threat intelligence. |
| **Q12. What is the PE format?** | Portable Executable is the Windows executable file format used by files such as EXEs and DLLs. |

---

## Task 4 — Analyzing Malicious Files (Hands-on Investigation)

The objective is to investigate a suspicious executable using the FlareVM tools — **PEStudio, FLOSS, Process Explorer, Process Monitor**. The main sample is `windows.exe`; another executable used during network analysis is `cobaltstrike.exe`.

### Investigation Scenario

A suspicious `windows.exe` file was downloaded by a user. The download occurred on `09/24/2024 at 3:43 AM`. The monitoring team flagged the file as a potential threat. The file was provided for investigation and located at `C:\Users\Administrator\Desktop\Sample`.

The Sample directory contained:

```text
C:\Users\Administrator\Desktop\Sample
│
├── cobaltstrike.exe
├── cryptominer.exe
├── possible_medusa.exe
└── windows.exe
```

Approximate file sizes shown in the room:

| File | Size |
|---|---|
| `cobaltstrike.exe` | 18 KB |
| `cryptominer.exe` | 1,958 KB |
| `possible_medusa.exe` | 670 KB |
| `windows.exe` | 1,958 KB |

> **First step:** *Do not immediately execute the suspicious file.* Start with static analysis.

### PEStudio — `windows.exe` Metadata

Opening `windows.exe` in PEStudio reveals the following important properties:

| Field | Value |
|---|---|
| **MD5** | `9FDD4767DE5AEC8E577C1916ECC3E1D6` |
| **SHA-1** | `A1BC55A7931BFCD24651357829C460FD3DC4828F` |
| **SHA-256** | `E9627EBAAC562067759681DCEBA8DDE8D83B1D813AF8181948C549E342F67C0E` |
| **File Size** | `2004480 bytes` |
| **Entropy** | `7.999` |
| **Signature** | `Microsoft .NET` |
| **File Type** | `executable` |
| **CPU** | `64-bit` |
| **Subsystem** | `GUI` |
| **Description** | `REGEDIT` |
| **File Version** | `6.3.9600.16384 (winblue_rtm)` |

### Suspicious Metadata

One of the biggest clues is the description `REGEDIT` — the file attempts to appear as the legitimate Windows Registry Editor. But the suspicious file was located at `C:\Users\Administrator\Desktop\Sample\windows.exe`, whereas a legitimate Windows Registry Editor is normally located under `C:\Windows\System32`. So `Description = REGEDIT + Unexpected Location → Suspicious`.

The PE metadata also contains Russian-language text:

```text
Редактор реестра
Операционная система Microsoft Windows
```

Translated: `Registry Editor` and `Microsoft Windows Operating System`. If the environment does not normally use Russian-language software metadata, this is another suspicious clue. Malware can impersonate legitimate Windows programs, so always verify **Filename + Path + Hash + Signature + Metadata + Behaviour** together.

### Entropy Analysis

The entropy of `windows.exe` was `7.999` — extremely high. On the `0 ────── 8` scale, a value close to `8` means the data appears highly random. Possible explanations: **Encryption, Compression, Packing, Obfuscation**. `7.999` is very close to the theoretical maximum for byte entropy, making the file highly suspicious — especially when combined with `No Rich Header + High entropy + Suspicious metadata + Cryptographic APIs`. However, high entropy alone does **NOT** prove malware.

### Rich Header Analysis

The PEStudio analysis shows `rich-header (n/a)` — the Rich Header is **Not available**. The absence of a Rich Header may indicate **Packing, Obfuscation, PE modification, Unusual compilation,** or **Attempts to evade static analysis** — another clue to correlate with other findings.

### Imported APIs

PEStudio showed `functions (102)` — the executable imported 102 functions, including several interesting APIs:

- **`set_UseShellExecute`** — allows a process to use the operating system shell to execute another process (`Program → UseShellExecute → Windows Shell → Other Process`); relevant when investigating process-execution behaviour.
- **Cryptographic APIs** — `CryptoStream`, `RijndaelManaged`, `CipherMode`, `CreateDecryptor`, `CryptoStreamMode`. Malware may use cryptography for encrypted configuration/strings, payload/data encryption, network communication, ransomware functionality, or obfuscation.
- **`RijndaelManaged`** — associated with the Rijndael symmetric encryption algorithm; AES is based on a subset of Rijndael.
- **`CreateDecryptor`** — indicates functionality for decrypting data (Configuration, Strings, Payloads, Embedded data, Communication data).
- **`CryptoStream`** — allows cryptographic transformations to be applied to data streams (`Input → CryptoStream → Cryptographic Transformation → Output`).

> **API analysis rule:** Never think `Crypto API = Malware`. Instead: `Crypto API + High entropy + Obfuscation + Suspicious metadata + Unexpected network connection → Strong reason to investigate`.

### FLOSS — Extracting Strings

Navigate to `C:\Users\Administrator\Desktop\Sample` and run FLOSS, redirecting output into a file with `>`:

```powershell
PS C:\Users\Administrator\Desktop\Sample> FLOSS.exe .\windows.exe > windows.txt
WARNING: floss: .NET language-specific string extraction is not supported yet
WARNING: floss: FLOSS does NOT attempt to deobfuscate any strings from .NET binaries
INFO: floss: disabled string deobfuscation
INFO: floss: extracting static strings
INFO: floss: finished execution
INFO: floss: rendering results
```

> **Important FLOSS limitation:** the file is a `.NET binary`, and the FLOSS version used does not perform .NET language-specific string extraction/deobfuscation. Therefore `No decoded strings ≠ No malicious strings exist` — the tool simply could not recover them using the available techniques.

The FLOSS results contained strings such as:

```text
set_WorkingDirectory
Exception
MemoryStream
CryptoStream
System.Security.Cryptography
RijndaelManaged
SymmetricAlgorithm
set_KeySize
set_Mode
CipherMode
GetBytes
Rfc2898DeriveBytes
CreateDecryptor
ICryptoTransform
CryptoStreamMode
Write
Close
IDisposable
Dispose
```

**Correlating PEStudio + FLOSS** — both independently reveal the same cryptographic functionality (`RijndaelManaged`, `CryptoStream`, `CipherMode`, `CreateDecryptor`). Two separate analysis methods agreeing → `Higher Confidence`.

### Dynamic Analysis — Process Explorer

Static analysis gives clues; dynamic analysis answers *"What does the executable actually do when it runs?"* using **Process Explorer** and **Process Monitor**. The room analyzes `cobaltstrike.exe` (located at `C:\Users\Administrator\Desktop\Sample`). After running it, Process Explorer shows the process and its **parent process** `explorer.exe`:

```text
explorer.exe
      │
      └── cobaltstrike.exe
```

The room screenshot showed `cobaltstrike.exe` with `PID = 4756`.

> **⚠️ Note:** PIDs can be different on different machines/runs — don't memorize the PID as a universal IOC.

**Network Connection** — in Process Explorer, right-click the process → `Properties → TCP/IP`. The TCP/IP tab showed a connection to `47.120.46.210`, with connection state `SYN_SENT` and destination port `81`. So `Destination IP → 47.120.46.210` and `Destination Port → 81` (`cobaltstrike.exe → TCP → 47.120.46.210:81`). An unexpected executable communicating with an external IP could indicate **C2 communication, Payload download, Data exfiltration, Remote commands,** or **Beaconing** — here the destination was treated as a suspicious/unknown IP.

### Dynamic Analysis — Procmon Confirmation

The room uses Procmon to independently verify the network activity. Open the filter window with `CTRL + L`, then configure: **Column** `Process Name`, **Relation** `contains`, **Value** `cobalt`, **Action** `Include` → `Add` → `Apply`. Procmon then primarily shows activity related to `cobaltstrike.exe`:

```text
Process Name       Operation
--------------------------------------
cobaltstrike.exe   TCP Reconnect
cobaltstrike.exe   TCP Disconnect
```

The remote destination repeatedly appeared as `47.120.46.210`. The network connection was confirmed independently — Process Explorer showed `47.120.46.210`, and Process Monitor confirmed it, so `cobaltstrike.exe → 47.120.46.210:81` was confirmed as the destination. This is a core incident-response principle: `Tool #1 → Finding → Tool #2 → Verification`, which reduces false positives and improves confidence.

### Indicators of Compromise (IOCs)

| Type | Value |
|---|---|
| File | `windows.exe` |
| Path | `C:\Users\Administrator\Desktop\Sample` |
| MD5 | `9FDD4767DE5AEC8E577C1916ECC3E1D6` |
| SHA-1 | `A1BC55A7931BFCD24651357829C460FD3DC4828F` |
| SHA-256 | `E9627EBAAC562067759681DCEBA8DDE8D83B1D813AF8181948C549E342F67C0E` |
| Entropy | `7.999` |
| Description | `REGEDIT` |
| Architecture | `64-bit` |
| Signature | `Microsoft .NET` |
| Suspicious IP | `47.120.46.210` |
| Destination Port | `81` |
| Parent Process | `explorer.exe` |
| Crypto API | `RijndaelManaged` |
| Crypto API | `CreateDecryptor` |
| Crypto API | `CryptoStream` |
| Suspicious API | `set_UseShellExecute` |
| Crypto API | `CipherMode` |
| Crypto API | `CryptoStreamMode` |

### Why Defang an IP?

Security analysts often defang IOCs before putting them in reports. Normal `47.120.46.210` becomes defanged `47[.]120[.]46[.]210` — this reduces the chance of accidental clicking/parsing by security tools or applications.

### Task 4 — Malicious File Analysis (Answers)

| Question | Answer |
|---|---|
| **Q1. What is the entropy value of `windows.exe`?** | 7.999 |
| **Q2. In PEStudio → manifest → administrator, what is the value under `requestedExecutionLevel`?** | requireAdministrator |
| **Q3. Which function allows the process to use the operating system's shell to execute other processes?** | set_UseShellExecute |
| **Q4. Which API starts with R and indicates that the executable uses cryptographic functions?** | RijndaelManaged |
| **Q5. What is the Imphash of `cobaltstrike.exe`?** | 92EFF189FB188C541CBD83ACB8A4CF5 |
| **Q6. What is the defanged IP address to which `cobaltstrike.exe` is connecting?** | 47[.]120[.]46[.]210<br>Normal form: 47.120.46.210 |
| **Q7. What is the destination port number used by `cobaltstrike.exe` when connecting to its C2 IP address?** | 81 |
| **Q8. What is the parent process of `cobaltstrike.exe`?** | explorer.exe |

### SOC Analyst Mindset — Correlating the Evidence

A SOC analyst should not immediately say *"This is malware."* Instead follow `Observation → Evidence → Correlation → Confidence → Conclusion`. For `windows.exe` the observations correlate as:

```text
High entropy (7.999)
      +
Missing Rich Header
      +
Fake REGEDIT metadata
      +
Administrator execution (requireAdministrator)
      +
Cryptographic APIs
      +
Suspicious external connection (47.120.46.210:81)
      ↓
HIGHLY SUSPICIOUS EXECUTABLE
```

Static analysis gives **hypotheses** (e.g. `CreateDecryptor exists → "Program may decrypt something"` — it does NOT mean *"Program definitely decrypted malware"*); dynamic analysis provides stronger evidence. When a suspicious process makes an outbound connection, record **Process, PID, Source IP, Source Port, Destination IP, Destination Port, Protocol, Timestamp, State**.

### Interview Questions — Malicious File Analysis

| Question | Answer |
|---|---|
| **Q1. Why should static analysis be performed before dynamic analysis?** | Static analysis provides initial information about the file without executing it and helps identify suspicious characteristics before running the sample. |
| **Q2. What is entropy in malware analysis?** | Entropy measures the randomness of data. High entropy can indicate encryption, compression, or packing. |
| **Q3. Does high entropy prove malware?** | No. High entropy is only an indicator and must be correlated with other evidence. |
| **Q4. Why are imported APIs useful?** | Imported APIs provide clues about the capabilities of an executable, such as process creation, file operations, networking, memory manipulation, or cryptography. |
| **Q5. Why is `CreateDecryptor` interesting?** | It indicates that the application has functionality for decrypting data, which may be used for configuration, strings, payloads, or other encrypted content. |
| **Q6. Why is `RijndaelManaged` interesting?** | It indicates the application uses Rijndael-based cryptographic functionality. |
| **Q7. Why is `set_UseShellExecute` interesting?** | It can allow an application to use the Windows shell to launch another process, which may be relevant when investigating process execution behaviour. |
| **Q8. Why use FLOSS instead of only `strings`?** | FLOSS performs more advanced string extraction and can recover certain stack, tight, and decoded strings that traditional string extraction may miss. |
| **Q9. What is Process Explorer used for?** | It provides detailed information about running processes, including process relationships, PIDs, threads, modules, and other process properties. |
| **Q10. What is Procmon used for?** | Procmon records detailed system activity and can be filtered to investigate activity associated with a specific process. |
| **Q11. Why filter Procmon?** | Because Procmon generates a large amount of data. Filtering makes it easier to focus on events generated by the process being investigated. |
| **Q12. Why verify a finding using multiple tools?** | Correlating results from multiple independent tools increases confidence and reduces the possibility of relying on a false positive or incorrect observation. |

---

## Quick Revision

| Topic | Key fact |
|---|---|
| **FlareVM** | Forensics, Logic Analysis, and Reverse Engineering — a customized Windows environment for malware analysis, forensics, reverse engineering, and incident response. |
| **Static vs Dynamic** | Static = See the file (*"What is inside?"*); Dynamic = See the behaviour (*"What happens when it runs?"*). |
| **Tool → purpose** | Wireshark → network packets · PEStudio → static PE analysis · FLOSS → strings/obfuscation · Process Explorer → running processes · Procmon → system activity · CFF Explorer → PE structure. |
| **PE signatures** | `MZ` / `e_magic` → `5A4D` (hex `4D 5A`). |
| **PE sections** | `.text` executable code · `.data` writable data · `.rdata` read-only data · `.rsrc` resources. |
| **Entropy** | Scale `0 → 8`; high entropy = possible encryption/packing/compression. Indicator, not proof. |
| **windows.exe entropy** | `7.999`. |
| **Rich Header** | Build/tool metadata; missing header is a clue, not proof. |
| **FLOSS strings** | Static · Stack · Tight · Decoded. Formerly FireEye Labs Obfuscated String Solver. |
| **Hashes** | MD5 (32) · SHA-1 (40) · SHA-256 (64) hexadecimal characters. |
| **windows.exe hashes** | MD5 `9FDD4767DE5AEC8E577C1916ECC3E1D6` · SHA-1 `A1BC55A7931BFCD24651357829C460FD3DC4828F` · SHA-256 `E9627EBAAC562067759681DCEBA8DDE8D83B1D813AF8181948C549E342F67C0E`. |
| **Fake metadata** | Description `REGEDIT`, located in `Desktop\Sample` (not `C:\Windows\System32`) → impersonation. |
| **requestedExecutionLevel** | `requireAdministrator`. |
| **Suspicious API** | `set_UseShellExecute`. |
| **Crypto APIs** | `RijndaelManaged`, `CryptoStream`, `CipherMode`, `CreateDecryptor`, `CryptoStreamMode`. |
| **cobaltstrike.exe** | Parent `explorer.exe` · Imphash `92EFF189FB188C541CBD83ACB8A4CF5` · C2 `47.120.46.210` (defanged `47[.]120[.]46[.]210`) · Port `81`. |
| **possible_medusa MD5** | `646698572AFBBF24F50EC5681FEB2DB7`. |
| **cryptominer.bin** | SHA-256 `E9627EBAAC562067759681DCEBA8DDE8D83B1D813AF8181948C549E342F67C0E` · functions `102`. |
| **Golden rule** | One indicator = suspicious; multiple correlated indicators = strong evidence. |

**What you should remember:** Don't execute first → perform static analysis. PEStudio gives the initial picture of a PE file. Hashes identify files and help with IOC tracking. Entropy can indicate packing/encryption/compression. A missing Rich Header can be suspicious but is not proof. Imported APIs reveal potential capabilities. FLOSS can reveal strings that normal `strings` tools may miss. Process Explorer shows process relationships and properties; Procmon shows detailed system activity; Wireshark shows network packets. Always investigate suspicious network destinations, verify important findings with multiple tools, and remember that **correlation is more valuable than a single indicator** — a suspicious indicator is not automatically proof of malware.

---

## Final Takeaway

**FlareVM (Forensics, Logic Analysis, and Reverse Engineering)** is a customized Windows environment that puts an entire **malware-analysis arsenal** in one place, so an analyst can correlate findings instead of installing tools one by one. The workflow always begins with **static analysis** (*"What is inside?"*) before **dynamic analysis** (*"What happens when it runs?"*). Statically, **PEStudio** reads the **PE (Portable Executable)** structure — the `MZ` / `5A4D` `e_magic` signature, the `.text` / `.data` / `.rdata` / `.rsrc` sections, **entropy**, the **Rich Header**, imported APIs (the **IAT**), and **hashes** (`MD5`, `SHA-1`, `SHA-256`); **FLOSS** (the **FLARE Obfuscated String Solver**) recovers static, stack, tight, and decoded strings that plain `strings` would miss; and **CFF Explorer** inspects PE structure and hashes. Dynamically, **Process Explorer** exposes process trees and TCP/IP connections while **Process Monitor (Procmon)** confirms system and network activity — and **Wireshark** captures the traffic. The hands-on investigation proved the method: `windows.exe` masqueraded as **`REGEDIT`** yet sat in `Desktop\Sample`, showed entropy **`7.999`**, a missing Rich Header, `requireAdministrator`, and crypto APIs (**`RijndaelManaged`**, **`CreateDecryptor`**, **`CryptoStream`**, **`set_UseShellExecute`**), while `cobaltstrike.exe` (parent **`explorer.exe`**, Imphash **`92EFF189FB188C541CBD83ACB8A4CF5`**) beaconed to the C2 at **`47.120.46.210:81`** (defanged **`47[.]120[.]46[.]210`**), confirmed independently by two tools. The lesson every analyst carries away: **a single indicator is only suspicious; multiple correlated indicators are strong evidence** — analyze statically, observe dynamically, correlate the evidence, extract IOCs, and investigate further.
