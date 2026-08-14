| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Defensive Security Tooling / CAPA |
| **Difficulty** | Beginner |
| **Time** | Not stated in source |
| **Module** | Defensive Security Tooling |

---

## Objective

**CAPA** stands for **Common Analysis Platform for Artifacts** — a malware-analysis tool developed by the **FireEye Mandiant** team. Its primary purpose is to identify the **capabilities** present in executable files and other supported artifacts. Instead of manually reverse-engineering a binary to determine what it can do, CAPA analyzes the file and applies a collection of **rules** that describe known behaviours, then presents readable results. CAPA is a **static analysis** tool: it examines a file *without executing it*, which makes it safer for initial analysis and useful for **malware analysis, threat hunting, incident response, and malware triage**. This room builds the concept from the ground up: what CAPA is, static vs dynamic analysis, the CAPA command-line tool and its options (`-v`, `-vv`, `-j`, output redirection), how to read a CAPA result (Capability, Rule, Namespace, MITRE ATT&CK, MBC, Evidence), the **Malware Behavior Catalogue (MBC)** hierarchy and identifiers, CAPA **namespaces** and Top-Level Namespaces, individual **capabilities** and their rule YAML files, and how verbose output plus the **CAPA Web Explorer** reveal *why* a rule matched.

By the end of this room you will be able to:

- Explain what **CAPA** is and expand the acronym — **Common Analysis Platform for Artifacts** (developed by **FireEye Mandiant**)
- Distinguish **static analysis** (study the file) from **dynamic analysis** (run the file) and know where CAPA fits
- Use the CAPA command-line tool and its options — `capa.exe <file>`, `-v` / `--verbose`, `-vv` / `--very-verbose`, `-j` (JSON), and `>` output redirection
- Read a CAPA result across its layers: **Capability, Rule, Namespace, MITRE ATT&CK, MBC, Matching Evidence**
- Understand **MITRE ATT&CK** (Tactic → Technique → Sub-technique) and **MAEC** (Malware Attribute Enumeration and Characterization)
- Navigate the **Malware Behavior Catalogue (MBC)** hierarchy — Objective → Behaviour → Method → Identifier — and recall key identifiers (`C0017`, `B0009`, `C0002`, `C0026`)
- Explain CAPA **namespaces** and the **TLN → Namespace → Rule YAML** hierarchy, including special namespaces like `nursery` and `lib`
- Map **capabilities** to their **rule YAML files** (e.g. `check-http-status-code.yml`, `reference-anti-vm-strings.yml`)
- Use **verbose/JSON output** and the **CAPA Web Explorer** (Global Search Box, filters) to inspect matching evidence

> **Analyst mindset:** *A CAPA capability is not a malware verdict.* CAPA answers **WHAT** a program can potentially do — the analyst must still investigate **WHERE** (namespace), **HOW** (rule), and **WHY** (evidence), then correlate multiple capabilities and add context before deciding whether a binary is malicious. `Capability ≠ Maliciousness`.

---

## Task 1 — Introduction to CAPA

**CAPA** = **Common Analysis Platform for Artifacts**, a malware-analysis tool from the **FireEye Mandiant** team. It identifies the capabilities present in executable files and other supported artifacts by applying rules that describe known behaviours, then presents readable results to the analyst.

At a high level the workflow is a pipeline:

`Executable / Malware Sample → CAPA → Detect behaviours → Match CAPA rules → Map behaviours → Identify capabilities → Present readable results → Analyst Understanding`

CAPA may identify that a program is capable of things such as **Network communication, File manipulation, Process creation, Process injection, PowerShell execution, Scheduled task creation, Data encoding, Anti-VM / Sandbox detection**.

### Why CAPA Is Useful

Running unknown malware without proper isolation can compromise the analysis environment, so malware analysis commonly uses isolated environments — **Sandboxes, Virtual machines, Dedicated analysis systems**. CAPA provides another useful approach: **Static Analysis**.

### Static Analysis vs Dynamic Analysis

> **1. Static Analysis**
> Examines a file **without executing it** — inspecting Strings, Metadata, Code, Headers, and known behaviours. Advantages: does not require executing the malware, safer for initial analysis, can reveal potential capabilities, and is useful for automated analysis. **CAPA is useful here.**

> **2. Dynamic Analysis**
> Observes a program **while it is running** in an isolated environment — Network activity, File changes, Process activity, Registry changes, and other runtime behaviour. Advantages: shows actual runtime behaviour, can reveal network connections, can observe file/registry changes, and is useful for confirming suspected behaviour.

| Static Analysis | Dynamic Analysis |
|---|---|
| Does not execute the sample | Executes the sample |
| Generally safer | Requires isolation |
| Examines file/code/features | Observes runtime behaviour |
| Can identify capabilities | Can observe actual actions |
| CAPA is useful here | Sandboxes/debuggers are commonly used |

> **Memory trick:** `STATIC = Study the file` · `DYNAMIC = Do/execute the file`.

### What CAPA Analyzes & What a Capability Is

CAPA can analyze **Portable Executables (PE), ELF binaries, .NET modules, Shellcode, and Sandbox reports**, applying rules that describe **common behaviours**. A **capability** represents something a program is *capable of doing* (e.g. `create process`, `reference Base64 string`). Importantly, a capability describes what the program **can potentially do** based on CAPA's rule matches — it does not necessarily mean the behaviour was observed during execution.

> **Key security concept:** `CAPA Result ≠ Observed Runtime Behaviour`. A CAPA result means the analyzed artifact contains characteristics that match a rule describing a particular capability — not proof the behaviour ran.

### Learning Objectives & Prerequisites

The room's learning objectives: explore what CAPA is, learn how to use CAPA effectively, understand common CAPA fields/results, and identify potential program activity. The **MITRE ATT&CK Framework** is **recommended but not mandatory** — it matters later because CAPA can map identified behaviours to ATT&CK techniques (`CAPA Behaviour → MITRE ATT&CK Mapping → Adversary Technique`).

### Lab Machine

CAPA is already installed inside the TryHackMe VM. Pre-processed files used in the room live under `C:\Users\Administrator\Desktop\capa`. Because running CAPA against a binary can take several minutes, the room provides already-processed results so you can study the output without waiting for a full analysis every time.

```text
C:\Users\Administrator\Desktop\capa
```

Important files mentioned in the room:

```text
cryptbot.txt
cryptbot_vv.txt
cryptbot_vv.json
```

The room's sample executable is `cryptbot.bin`.

> **Note (content gap):** The source does not provide a sample **hash** for `cryptbot.bin`, and Task 1 requires **no answer**.

---

## Task 2 — Tool Overview: How CAPA Works

CAPA is primarily used from the command line. The basic pattern is `capa.exe <file>`, which tells CAPA to analyze the specified file, match its rules, and display the identified capabilities/behaviours.

```bash
capa.exe <file>
capa.exe .\cryptbot.bin
```

A result can contain a **Capability**, its **Namespace**, an **ATT&CK Technique**, and a **Malware Behaviour Catalogue** reference, letting the analyst move from `Binary → Rule Match → Capability → Behaviour → Security Interpretation`.

### Command-Line Options

CAPA supports options that modify how results are generated. Two important verbosity options are `-v` and `-vv`.

> **1. `-v` / `--verbose`**
> Enables a **verbose result document** — more detailed information than the basic output. Example: `capa.exe -v .\cryptbot.bin`.

> **2. `-vv` / `--very-verbose`**
> Enables a **very verbose result document** — even more detailed rule/match information. Example: `capa.exe -vv .\cryptbot.bin`. Memory trick: more `v` characters = more detailed output.

The room demonstrates a very verbose run; analysis takes some time because CAPA must process the sample and evaluate its rules, so the output is pre-processed into `cryptbot_vv.txt`:

```bash
PS C:\Users\Administrator\Desktop\capa> capa -vv .\cryptbot.bin
loading : 100%
analyzing program...
```

The verbose text output can be read from PowerShell:

```bash
PS C:\Users\Administrator\Desktop\capa>
Get-Content .\cryptbot_vv.txt
```

### JSON Output & Redirection

A very verbose result can contain **thousands of lines**, which is hard to read in a terminal or text editor. CAPA can save its result as JSON using `-j`, commonly combined with `-vv` and shell output redirection (`>`) into a file:

```bash
capa.bin -j -vv .\cryptbot.bin > cryptbot_vv.json
```

Command breakdown: `capa.bin` (the CAPA executable) · `-j` (request JSON-formatted output) · `-vv` (request very verbose output) · `.\cryptbot.bin` (the input sample) · `>` (PowerShell output redirection) · `cryptbot_vv.json` (the destination file). JSON is structured data, which makes results easier for web tools, scripts, programs, and analysts to process.

### CAPA Web Explorer

The **CAPA Web Explorer** is a web-based interface for exploring CAPA results. Instead of reading a huge JSON/text result manually, you load `cryptbot_vv.json` (via **Upload from local**) and browse interactively: `cryptbot.bin → CAPA → cryptbot_vv.json → CAPA Web Explorer → Interactive Analysis`.

Useful features highlighted in the room:

> **1. Upload from Local**
> Upload the JSON result from the local machine: `Upload from local → Select JSON → Load CAPA results`.

> **2. Global Search Box**
> Search through the CAPA results (e.g. searching `schedule task via at` locates the corresponding rule) — much faster than manually searching thousands of lines. It can show the Rule, Namespace, and ATT&CK Technique together.

> **3. Filters**
> Options that reduce the amount of information displayed, e.g. `Show capabilities by function`, `Show 6 distinct library rules`, `Show namespace chart`, `Show column filters`.

Example Global Search result:

```text
Rule:
    schedule task via at
Namespace:
    persistence/scheduled-tasks
ATT&CK Technique:
    Scheduled Task/Job
```

### CAPA Rules

A rule is a set of conditions that describe a particular behaviour or capability; when all required conditions are satisfied, CAPA reports the associated result. The room shows a simplified scheduled-task rule concept and the regular expressions it uses (the trailing `i` = case-insensitive matching):

```text
match: host-interaction/process/create
OR
string: /schtasks/i
string: /\create/i
string: /Register-ScheduledTask/i
```

Rules can use conditions such as `match`, `string`, `or`, and `and` (`AND` = both required; `OR` = either can match), and results can be organized using **namespaces** (e.g. `persistence/scheduled-tasks`) and mapped to **MITRE ATT&CK** techniques.

### Example Analysis Workflow

```bash
# Analyze a sample
capa.exe .\cryptbot.bin

# Verbose analysis
capa.exe -v .\cryptbot.bin

# Very verbose analysis
capa.exe -vv .\cryptbot.bin

# Generate JSON output
capa.exe -j -vv .\cryptbot.bin > cryptbot_vv.json
```

### Important Options

| Option | Meaning |
|---|---|
| `-v` | Verbose result document |
| `--verbose` | Long form of `-v` |
| `-vv` | Very verbose result document |
| `--very-verbose` | Long form of `-vv` |
| `-j` | JSON output |
| `>` | Redirect output to a file |

### Interview Questions — CAPA Tool

| Question | Answer |
|---|---|
| **Q1. What does `-v` do?** | Enables verbose CAPA results. |
| **Q2. What does `-vv` do?** | Enables very verbose CAPA results. |
| **Q3. What option is used for JSON output?** | `-j` |
| **Q4. How do you redirect CAPA output to a file?** | Using `>`. Example: `capa.exe -j -vv .\cryptbot.bin > result.json` |
| **Q5. What tool lets you interactively explore CAPA results?** | CAPA Web Explorer |
| **Q6. What feature helps search CAPA results?** | Global Search Box |
| **Q7. What are CAPA rules?** | Rules contain conditions/patterns used by CAPA to identify capabilities and behaviours. |

> **Note (content gap):** Task 2 in the room focuses on options/concepts and lists no single graded answer value.

---

## Task 3 — Dissecting CAPA Results Part 1: General Information, MITRE ATT&CK & MAEC

CAPA does **not** simply say *"This file is malicious."* It performs static analysis and identifies **capabilities**, adding context around them. A CAPA result can be read as several layers, each answering a different question:

| Component | Question it answers |
|---|---|
| Capability | What can the program do? |
| Rule | What CAPA rule detected it? |
| Namespace | What category does the rule belong to? |
| MITRE ATT&CK | Which adversary technique may this relate to? |
| MBC | What malware behaviour/objective does it represent? |
| Evidence | Why did the rule match? |

### Capability ≠ Maliciousness

A **capability** describes functionality CAPA believes is present (e.g. `create process on Windows`, `schedule task via schtasks`, `encode data using XOR`). This does **not** automatically mean the file is malware — a legitimate application can also create processes, and `HTTP communication` does not automatically mean Command and Control. Interpret results as: `Capability detected → Investigate context → Determine intent → Determine whether behaviour is suspicious`.

### MITRE ATT&CK

**MITRE ATT&CK** is a knowledge base describing adversary tactics and techniques, letting analysts describe attacker behaviour with standardized terminology instead of vague descriptions. Its mental model:

`TACTIC (the adversary's goal — WHY) → TECHNIQUE (how the goal is achieved — HOW) → SUB-TECHNIQUE (more specific detail)`

CAPA can associate detected capabilities with relevant ATT&CK techniques, connecting static analysis with threat intelligence (`Capability → Behaviour → ATT&CK technique → Possible adversary activity`).

### MAEC

**MAEC** stands for **Malware Attribute Enumeration and Characterization** — a standardized language/framework for describing malware attributes and behaviours so analysts describe the same behaviour consistently and shareably (`Raw description → structured Attributes: Behaviour, Capability, Action, Objects, Relationships`).

### CAPA vs ATT&CK vs MAEC vs MBC

| Technology / Framework | Main Purpose |
|---|---|
| CAPA | Identify capabilities in executable files |
| MITRE ATT&CK | Describe adversary tactics and techniques |
| MAEC | Standardize malware attributes/behaviour descriptions |
| MBC | Catalogue malware objectives, behaviours and methods |

> **Memory trick:** `CAPA → "What can the program do?"` · `ATT&CK → "How does this relate to adversary behaviour?"` · `MAEC → "What malware attributes/behaviours can be described?"` · `MBC → "What malware objective/behaviour/method is involved?"`

### Reading a Result & Correlation

Read a CAPA result conceptually left to right: `Capability → Rule → Namespace → (MITRE ATT&CK / MBC) → Evidence`. A single capability may be harmless, but correlating several (e.g. `reference Base64 string + encode data using XOR + HTTP communication + create process + PowerShell`) can justify deeper investigation. CAPA is a **triage tool** — not a complete malware verdict and not a replacement for reverse engineering, but automated capability discovery that helps prioritize samples for tools like Ghidra, a debugger, or strings analysis.

> **Result reading checklist:** [1] What capability was detected? [2] Which rule detected it? [3] Which namespace does the rule belong to? [4] Is there a MITRE ATT&CK mapping? [5] Is there an MBC mapping? [6] What evidence caused the rule to match? [7] Is the capability suspicious by itself? [8] What other capabilities are present? [9] Can the capabilities be correlated? [10] Does the binary require deeper analysis?

> **Memory trick (`C → N → R → E`):** **C**apability (*what can it do?*) → **N**amespace (*where is the rule categorized?*) → **R**ule (*what detected it?*) → **E**vidence (*why did it match?*).

### Interview Questions — General Information, ATT&CK & MAEC

| Question | Answer |
|---|---|
| **Q1. What is CAPA?** | CAPA is a static analysis tool that identifies capabilities in executable files using a set of rules. |
| **Q2. Does CAPA determine whether a file is definitely malware?** | No. CAPA identifies capabilities and behaviours. An analyst must interpret those findings in context to determine whether the file is malicious. |
| **Q3. What is a CAPA rule?** | A CAPA rule contains conditions used to identify a particular capability or behaviour in a program. |
| **Q4. What is MITRE ATT&CK?** | MITRE ATT&CK is a knowledge base that categorizes adversary tactics, techniques and sub-techniques. |
| **Q5. What is MAEC?** | MAEC stands for Malware Attribute Enumeration and Characterization. It provides a standardized way to describe malware attributes and behaviours. |
| **Q6. Why does CAPA use MITRE ATT&CK mappings?** | ATT&CK mappings provide standardized context for the behaviours identified by CAPA and help analysts understand how those behaviours may relate to adversary techniques. |
| **Q7. Why is evidence important in CAPA?** | Evidence explains what caused a CAPA rule to match, making the result more transparent and easier to investigate. |
| **Q8. Can a legitimate application trigger CAPA rules?** | Yes. CAPA detects capabilities, not malicious intent. Legitimate software may contain the same functionality as malware. |

---

## Task 4 — Dissecting CAPA Results Part 2: Malware Behavior Catalogue (MBC)

**MBC** stands for **Malware Behavior Catalogue** — a catalogue designed to describe malware behaviours in a standardized way (for labelling, similarity analysis, behaviour classification, and standardized reporting). Instead of two analysts describing the same behaviour differently, MBC provides common terminology and identifiers. MBC can reference MITRE ATT&CK methods but `MBC ≠ MITRE ATT&CK`: ATT&CK describes adversary tactics/techniques, while MBC describes malware objectives/behaviours/methods.

### MBC Formats

MBC information can be represented two ways:

- **Format 1 — Objective + Behaviour + Method:** `OBJECTIVE::Behavior::Method[Identifier]`
  Example: `ANTI-STATIC ANALYSIS::Executable Code Obfuscation::Argument Obfuscation [B0032.020]`
- **Format 2 — Objective + Behaviour:** `OBJECTIVE::Behavior::[Identifier]`
  Example: `COMMUNICATION::HTTP Communication::[C0002]`

> **Format memory trick (`O → B → M → ID`):** **O**bjective (high-level goal) → **B**ehaviour (what behaviour is performed) → **M**ethod (how specifically) → **ID**entifier (unique identifier).

### MBC Objectives

MBC contains high-level malware **objectives**:

| Objective | Meaning |
|---|---|
| Anti-Behavioral Analysis | Avoid/hinder behavioural analysis |
| Anti-Static Analysis | Make static analysis harder |
| Collection | Gather information/data |
| Command and Control | Communicate with attacker infrastructure |
| Credential Access | Obtain credentials |
| Defense Evasion | Avoid detection/security controls |
| Discovery | Learn about the target environment |
| Execution | Execute commands/code |
| Exfiltration | Steal/transfer data |
| Impact | Disrupt, damage or manipulate systems/data |
| Lateral Movement | Move through a network |
| Persistence | Maintain access |
| Privilege Escalation | Obtain higher privileges |

### Micro-Objectives

MBC also contains **micro-objectives** associated with more specific, lower-level behaviours: **PROCESS** (Create Process, Setting Thread Context, Terminating Process, Checking Mutex), **MEMORY** (Allocate Memory, Change Memory Protection, Free Memory), **COMMUNICATION** (DNS, FTP, HTTP, ICMP, SMTP), and **DATA** (Check String, Compress, Decode, Encode).

### MBC Behaviours

| Objective | Behaviour | Identifier |
|---|---|---|
| Anti-Behavioral Analysis | Lab Machine Detection | B0009 |
| Anti-Static Analysis | Executable Code Obfuscation | B0032 |
| Execution | Command and Scripting Interpreter | E1059 |
| Discovery | File and Directory Discovery | E1083 |
| Anti-Static Analysis / Defense Evasion | Obfuscated Files or Information | E1027 |

### Micro-Behaviours

| Micro-Objective | Micro-Behaviour | Identifier |
|---|---|---|
| MEMORY | Allocate Memory | C0007 |
| PROCESS | Create Process | C0017 |
| COMMUNICATION | HTTP Communication | C0002 |
| DATA | Check String | C0019 |
| DATA | Encode Data | C0026 |
| FILE SYSTEM | Create Directory | C0046 |
| FILE SYSTEM | Delete File | C0047 |
| FILE SYSTEM | Read File | C0051 |
| FILE SYSTEM | Writes File | C0052 |

### Methods

| Behaviour | Method | Identifier |
|---|---|---|
| Executable Code Obfuscation | Argument Obfuscation | B0032.020 |
| Executable Code Obfuscation | Stack Strings | B0032.017 |
| HTTP Communication | Read Header | C0002.014 |
| Encode Data | Base64 | C0026.001 |
| Encode Data | XOR | C0026.002 |
| Obfuscated Files or Information | Encoding-Standard Algorithm | E1027.m02 |

Reading the hierarchy for Encode Data: `DATA → Encode Data → Base64 → C0026.001` and `DATA → Encode Data → XOR → C0026.002`; for HTTP: `COMMUNICATION → HTTP Communication → Read Header → C0002.014`.

> **Identifier memory trick:** `Bxxxx` = Behaviour · `Cxxxx` = Micro-Behaviour · `Exxxx` = Behaviour / ATT&CK-related mapping. Examples: `B0009 → Lab Machine Detection`, `C0017 → Create Process`, `C0002 → HTTP Communication`.

> **MBC vs CAPA Namespace:** MBC answers *"What malware behaviour does this represent?"* (Objective → Behaviour → Method → Identifier), while a CAPA namespace answers *"Where does the rule belong?"* (TLN → Namespace → Rule). Do not confuse them.

### Task 4 — Answers

| Question | Answer |
|---|---|
| **Q1. What serves as a catalogue of malware objectives and behaviours?** | Malware Behavior Catalogue |
| **Q2. Which field is based on ATT&CK tactics in the context of malware behaviour?** | Objective |
| **Q3. What is the identifier of the "Create Process" micro-behaviour?** | C0017 |
| **Q4. Which behaviour has the identifier B0009?** | Lab Machine Detection |
| **Q5. Which micro-behaviour is related to Base64 and XOR?** | Encode Data |
| **Q6. Which micro-behaviour refers to "Malware is capable of initiating HTTP communications"?** | HTTP Communication |

---

## Task 5 — Dissecting CAPA Results Part 3: Namespaces

A **namespace** is a logical way of grouping CAPA rules that have a related purpose. Instead of one giant list of thousands of rules, CAPA organizes them into meaningful categories, making results easier to navigate. The main question a namespace answers is *"Where does this CAPA rule belong?"*

### Namespace Hierarchy

The hierarchy has three important levels: `Top-Level Namespace (TLN) → Namespace → Rule (YAML file)`.

- **Level 1 — Top-Level Namespace (TLN):** the broadest category, e.g. `Anti-Analysis`. Think of it as the main folder.
- **Level 2 — Namespace:** a more specific category, e.g. `anti-vm/vm-detection`.
- **Level 3 — Rule:** the actual CAPA detection rule, e.g. `reference-anti-vm-strings.yml`.

Complete example: `Anti-Analysis → anti-vm/vm-detection → reference-anti-vm-strings.yml`.

### Namespace Output Format

CAPA output can be represented as `Capability(Rule Name)::TLN(Top-Level Namespace)/Namespace`.

```text
reference anti-VM strings::Anti-Analysis/anti-vm/vm-detection
```

Read it as: **WHAT?** `reference anti-VM strings` · **WHERE?** `Anti-Analysis` (TLN) then `anti-vm/vm-detection` (Namespace).

### Important Top-Level Namespaces

| Namespace | Main Purpose |
|---|---|
| anti-analysis | Anti-analysis techniques |
| collection | Data/information collection |
| communication | Network communication |
| compiler | Compiler/build indicators |
| data-manipulation | Data transformation/manipulation |
| executable | Executable/PE attributes |
| host-interaction | Interaction with host OS |
| impact | Potential effects/consequences |
| internal | Internal CAPA rules |
| lib | Reusable rule building blocks |
| linking | Linking/loading external libraries |
| load-code | Loading/resolving/executing code |
| malware-family | Malware-family-specific rules |
| nursery | Staging area for immature rules |
| persistence | Maintaining access |
| runtime | Runtime/language/platform indicators |
| targeting | Target-specific behaviour such as ATM interaction |

### Two Special Namespaces

> **1. nursery**
> A **staging area for rules that are not fully polished** (`New / Experimental Rule → Nursery → Further Development → Mature Rule`). Important exception: a capability may appear to belong to one conceptual category while its actual rule lives elsewhere — e.g. the capability `reference cryptocurrency strings` is conceptually associated with `Impact`, but the actual rule may be located under `Nursery`. `Capability name ≠ always the exact folder/TLN location` — always inspect the actual namespace/rule.

> **2. lib**
> Contains **reusable building-block rules** that can be used as components when constructing other CAPA rules. Think `lib = Library`.

### Namespace + Rule Examples

| Capability | Top-Level Namespace | Namespace | Rule |
|---|---|---|---|
| reference anti-VM strings | Anti-Analysis | anti-vm/vm-detection | reference-anti-vm-strings.yml |
| reference HTTP User-Agent string | Communication | http/client | reference-http-user-agent-string.yml |
| check HTTP status code | Communication | http | check-http-status-code.yml |
| reference Base64 string | Data Manipulation | encoding/base64 | reference-base64-string.yml |
| encode data using XOR | Data Manipulation | encoding/xor | encode-data-using-xor.yml |
| create directory | Host-Interaction | file-system/create | create-directory.yml |
| create process on Windows | Host-Interaction | process/create | create-process-on-windows.yml |
| run PowerShell expression | load-code | load-code/PowerShell | run-powershell-expression.yml |
| schedule task via at | persistence | scheduled-tasks | schedule-task-via-at.yml |
| schedule task via schtasks | persistence | scheduled-tasks | schedule-task-via-schtasks.yml |

> **Namespace gives context, not intent:** `communication/http` doesn't automatically mean C2 — it could be a legitimate HTTP request or malware C2. `persistence/scheduled-tasks` doesn't automatically prove malicious persistence. The analyst still needs evidence and context.

### Revision Questions — Namespaces

| Question | Answer |
|---|---|
| **Q1. What is a namespace?** | A logical grouping of related CAPA rules. |
| **Q2. What does TLN stand for?** | Top-Level Namespace |
| **Q3. What is the namespace hierarchy?** | Top-Level Namespace → Namespace → Rule YAML |
| **Q4. What is the TLN for anti-VM detection?** | Anti-Analysis |
| **Q5. What namespace can contain anti-VM detection rules?** | anti-vm/vm-detection |
| **Q6. What is the staging area for rules that are not fully polished?** | Nursery |
| **Q7. What namespace contains reusable building blocks?** | lib |
| **Q8. Which namespace contains rules related to scheduled-task persistence?** | persistence (with a more specific namespace such as scheduled-tasks) |

> **Note (content gap):** Task 5 covers the namespace hierarchy conceptually; the room lists no single graded answer value for it.

---

## Task 6 — Dissecting CAPA Results Part 4: Capability

A **capability** is a functionality that CAPA identifies in an executable — the **human-readable result** of a matched CAPA rule (e.g. `create process on Windows`, `run PowerShell expression`, `encode data using XOR`, `schedule task via schtasks`, `read file on Windows`). The key question is *"What is this executable capable of doing?"*

### Capability → Namespace → Rule

One of the most important relationships in this task: `Capability → Top-Level Namespace → Namespace → Rule YAML File`. For example: `reference Base64 string → Data Manipulation → encoding/base64 → reference-base64-string.yml`. Each level answers a question — Capability (*what functionality?*), TLN (*what broad category?*), Namespace (*what specific category?*), Rule YAML (*which rule defines the detection?*).

### Complete Capability Table

| Capability | TLN | Namespace | Rule YAML |
|---|---|---|---|
| reference anti-VM strings | Anti-Analysis | anti-vm/vm-detection | reference-anti-vm-strings.yml |
| reference anti-VM strings targeting VMWare | Anti-Analysis | anti-vm/vm-detection | reference-anti-vm-strings-targeting-vmware.yml |
| reference anti-VM strings targeting VirtualBox | Anti-Analysis | anti-vm/vm-detection | reference-anti-vm-strings-targeting-virtualbox.yml |
| reference HTTP User-Agent string | Communication | http/client | reference-http-user-agent-string.yml |
| check HTTP status code | Communication | http | check-http-status-code.yml |
| reference Base64 string | Data Manipulation | encoding/base64 | reference-base64-string.yml |
| encode data using XOR | Data Manipulation | encoding/xor | encode-data-using-xor.yml |
| contain a thread local storage (.tls) section | Executable | pe/section/tls | contain-a-thread-local-storage-tls-section.yml |
| get common file path | Host-Interaction | file-system | get-common-file-path.yml |
| create directory | Host-Interaction | file-system/create | create-directory.yml |
| delete file | Host-Interaction | file-system/delete | delete-file.yml |
| read file on Windows | Host-Interaction | file-system/read | read-file-on-windows.yml |
| write file on Windows | Host-Interaction | file-system/write | write-file-on-windows.yml |
| get thread local storage value | Host-Interaction | process | get-thread-local-storage-value.yml |
| allocate or change RWX memory | Host-Interaction | process/inject | allocate-or-change-rwx-memory.yml |
| create process on Windows | Host-Interaction | process/create | create-process-on-windows.yml |
| reference cryptocurrency strings | Impact* | impact/cryptocurrency* | reference-cryptocurrency-strings.yml |
| link function at runtime on Windows | Linking | runtime-linking | link-function-at-runtime-on-windows.yml |
| parse PE header | load-code | load-code/pe | parse-pe-header.yml |
| resolve function by parsing PE exports | load-code | load-code/pe | resolve-function-by-parsing-pe-exports.yml |
| run PowerShell expression | load-code | load-code/PowerShell | run-powershell-expression.yml |
| schedule task via at | persistence | scheduled-tasks | schedule-task-via-at.yml |
| schedule task via schtasks | persistence | scheduled-tasks | schedule-task-via-schtasks.yml |

> **Cryptocurrency exception:** the capability `reference cryptocurrency strings` is conceptually associated with `Impact` (`impact/cryptocurrency`), while its actual rule location can be under `Nursery`. `Capability ≠ always direct namespace location`.

> **RWX memory:** `R = Read`, `W = Write`, `X = Execute`. Memory that is simultaneously Readable + Writable + Executable can be interesting during malware analysis — it may be associated with code injection or dynamically generated/executed code.

### Capability → Rule Naming

CAPA capability names generally correspond to their rule names via `Capability → lowercase → spaces become hyphens → .yml`. Examples: `check HTTP status code → check-http-status-code.yml` · `reference Base64 string → reference-base64-string.yml` · `run PowerShell expression → run-powershell-expression.yml` · `schedule task via schtasks → schedule-task-via-schtasks.yml`.

### Capability vs Rule

| Capability | Rule |
|---|---|
| Human-readable | Detection definition |
| Describes functionality | Contains matching logic |
| Example: `create directory` | `create-directory.yml` |
| Appears in CAPA results | Stored as a YAML rule |

A rule YAML contains Metadata, Namespace, Description, and Match Conditions (Strings, APIs, Features, Regex, Other Rules). The capability tells you **what** was identified; inspecting the rule YAML tells you **how** CAPA identified it.

> **RegOpenKeyEx:** the room references the Windows Registry-related API `RegOpenKeyEx`; the `Ex` suffix is part of the API name. APIs can provide valuable evidence about what functionality a program may contain.

### Task 6 — Answers

| Question | Answer |
|---|---|
| **Q1. What rule YAML file is matched for "check HTTP status code"?** | check-http-status-code.yml |
| **Q2. What capability is associated with reference-anti-vm-strings.yml?** | reference anti-VM strings |
| **Q3. What is the TLN for run PowerShell expression?** | load-code |
| **Q4. What API value ends in "Ex" from the sandbox-related rule?** | RegOpenKeyEx |

---

## Task 7 — More Information, More Fun!

Until now the flow was `CAPA → Rules → Capabilities → Namespaces → MBC / MITRE ATT&CK`. Task 7 answers a deeper question: *"WHY did CAPA identify this capability?"* — using verbose output, JSON, and the CAPA Web Explorer to reveal which rule, string, API, or condition satisfied the match, and at what address/function.

### Output Levels

The information hierarchy runs `Basic → Verbose (-v) → Very Verbose (-vv) → Detailed Rule Evidence (Web Explorer)`.

> **1. Basic output**
> `capa.exe .\cryptbot.bin` — a relatively concise overview of detected capabilities. Useful for quick triage.

> **2. Verbose output (`-v`)**
> `capa.exe -v .\cryptbot.bin` or `capa.exe --verbose .\cryptbot.bin` — provides additional information compared with the basic output.

> **3. Very verbose output (`-vv`)**
> `capa.exe -vv .\cryptbot.bin` or `capa.exe --very-verbose .\cryptbot.bin` — even more detailed rule information; can become extremely large, so it is often saved to a file.

| Option | Meaning | Purpose |
|---|---|---|
| `-v` | Verbose | More detailed output |
| `-vv` | Very Verbose | Even more detailed rule information |

### Saving & JSON Output

Redirect very verbose text output to a file, then read it in PowerShell:

```bash
capa.exe -vv .\cryptbot.bin > cryptbot_vv.txt
```

```bash
PS C:\Users\Administrator\Desktop\capa>
Get-Content .\cryptbot_vv.txt
```

For structured output, use `-j` (JSON), commonly with `-vv` and redirection:

```bash
capa.bin -j -vv .\cryptbot.bin > cryptbot_vv.json
```

JSON is structured data that tools and applications (like CAPA Web Explorer) can parse: `cryptbot.bin → CAPA → -j -vv → cryptbot_vv.json → CAPA Web Explorer → Search / Filter / Explore`.

### CAPA Web Explorer & Global Search

The Web Explorer provides interactive access to Search, Filter, Capabilities, Rules, Namespaces, Addresses, ATT&CK, and MBC. The most useful feature is the **Global Search Box** — e.g. searching `schedule task via at` jumps straight to the matching rule instead of scrolling through 500+/1000+/2000+ findings. Filtering options include `Show capabilities by function`, `Show 6 distinct library rules`, `Show namespace chart`, and `Show column filters` (Namespace, Capability, Rule, Function, Address).

### Rule Match Details, Regex & Logic

Very verbose output shows not only *"Rule matched"* but **why** it matched — the actual feature/string/API/condition that satisfied the rule. CAPA rules can use regular expressions where the trailing `i` means **case-insensitive**:

```text
/VMware/i
/schtasks/i
/\create/i
/Register-ScheduledTask/i
```

For example, `/VMware/i` matches `VMware`, `vmware`, `VMWARE`, `VmWare`. Rules combine conditions with `AND` (all required), `OR` (either can match), and `NOT`, and can reference other rules. The scheduled-task rule (`schedule task via schtasks`, namespace `persistence/scheduled-tasks`) combines process-creation (`host-interaction/process/create`) with strings `/schtasks/i`, `/\create/i`, `/Register-ScheduledTask/i`:

`Process Creation + schtasks + create → Rule Conditions Match → schedule task via schtasks`

> **Analyst lesson:** don't stop at *"CAPA says: schedule task via schtasks."* Ask: what rule? what namespace? what conditions? what strings? what APIs? what function/address? why did it match? That's the difference between **reading** a CAPA result and **analyzing** one.

### Practical Workflow

```bash
# 1. Basic analysis
capa.exe .\cryptbot.bin

# 2. Verbose analysis
capa.exe -v .\cryptbot.bin

# 3. Very verbose analysis
capa.exe -vv .\cryptbot.bin

# 4. JSON + very verbose output
capa.exe -j -vv .\cryptbot.bin > cryptbot_vv.json
```

### Task 7 — Answers

| Question | Answer |
|---|---|
| **Q1. Which parameter allows output of CAPA into a .json file?** | -j |
| **Q2. What tool allows interactive exploration of CAPA results?** | CAPA Web Explorer |
| **Q3. Which feature allows filtering/searching options or results?** | Global Search Box |

### Interview Questions — More Information

| Question | Answer |
|---|---|
| **Q1. What does `-v` do in CAPA?** | It enables verbose output. |
| **Q2. What does `-vv` do?** | It enables very verbose output with more detailed information. |
| **Q3. What does `-j` do?** | It enables JSON output. |
| **Q4. Why use JSON output?** | JSON provides structured output that can be processed by tools such as CAPA Web Explorer and other programs. |
| **Q5. What is CAPA Web Explorer?** | An interactive interface for exploring CAPA results. |
| **Q6. Why is very verbose output useful?** | It provides more detailed information about rule matches and helps analysts understand why a capability was detected. |
| **Q7. What does `/i` mean in a regex?** | Case-insensitive matching. |
| **Q8. Why are rule conditions important?** | They explain the logic CAPA uses to identify a capability. |

---

## Task 8 — Conclusion

CAPA is a tool used to identify capabilities in executable files: *"What can this program potentially do?"* It uses predefined static-analysis rules and rule matching to surface capabilities, then adds context via namespaces, MITRE ATT&CK, and MBC. In one sentence: **CAPA automatically identifies interesting capabilities in executable files using static-analysis rules**, which makes it especially useful for **Malware Triage, Reverse Engineering Support, Threat Hunting, Incident Response, Static Analysis, and Threat Intelligence**.

### CAPA in the Wider Workflow

CAPA is powerful but **not** a replacement for full malware analysis. A suspicious executable may still require Reverse Engineering, Dynamic Analysis, a Debugger, a Sandbox, or Network Analysis. Think of it as the first layer: `Binary → CAPA → Interesting Capabilities → Relevant Functions → Ghidra / IDA / Debugger`, so analysts prioritize deeper work efficiently.

### The Four Questions & Correlation

Every CAPA result answers four questions — **Capability (WHAT?)**, **Namespace (WHERE?)**, **Rule (HOW?)**, **Evidence (WHY?)** — plus **ATT&CK (adversary context)**, **MBC (malware behaviour)**, and **MAEC (malware attributes)**. One capability may be normal, but correlated capabilities like `PowerShell + Process Creation + HTTP Communication + Data Encoding + Scheduled Task` (Execution + Communication + Encoding + Persistence) may deserve deeper investigation.

### Limitations

CAPA is based on static analysis and rule matching, so it can be hindered by **Obfuscation, Packing, Encryption, Dynamic API Resolution, Runtime Decoding, Self-Modifying Code, and Incomplete Visibility**. A packed executable may hide its real code (`Original Program → Packing → Obfuscated/Packed Binary → CAPA → Limited Visibility`), which may require unpacking, dynamic analysis, debugging, or reverse engineering. Also remember: a capability describes potential functionality — `Potential ≠ Observed` — dynamic analysis may be needed to confirm runtime behaviour.

> **Analyst golden rule:** never think *"CAPA found it → it is malware."* Instead: *CAPA found a capability → what does it mean? → why did the rule match? → what evidence supports it? → what other capabilities exist? → can they be correlated? → is deeper analysis required?* Don't trust the label alone — understand **WHAT / WHERE / HOW / WHY**.

> **Note (content gap):** Task 8 (Conclusion) requires **no answer** in the room.

---

## Quick Revision

| Topic | Key fact |
|---|---|
| **CAPA** | Common Analysis Platform for Artifacts — a static-analysis tool (by FireEye Mandiant) that identifies capabilities in executables using rules. |
| **Static vs Dynamic** | Static = study the file without executing it (CAPA); Dynamic = run the file and observe runtime behaviour (sandboxes/debuggers). |
| **Basic command** | `capa.exe .\cryptbot.bin` |
| **Options** | `-v` / `--verbose` = verbose · `-vv` / `--very-verbose` = very verbose · `-j` = JSON · `>` = redirect output. |
| **JSON example** | `capa.bin -j -vv .\cryptbot.bin > cryptbot_vv.json` |
| **Read text output** | `Get-Content .\cryptbot_vv.txt` |
| **Result layers** | Capability (WHAT) · Namespace (WHERE) · Rule (HOW) · Evidence (WHY) · plus ATT&CK & MBC. |
| **Namespace hierarchy** | Top-Level Namespace (TLN) → Namespace → Rule YAML. |
| **Special namespaces** | `nursery` = staging area for immature rules · `lib` = reusable building-block rules. |
| **MBC** | Malware Behavior Catalogue: Objective → Behaviour → Method → Identifier. |
| **MBC formats** | `OBJECTIVE::Behavior::Method[Identifier]` and `OBJECTIVE::Behavior::[Identifier]`. |
| **Key MBC IDs** | `C0017` Create Process · `B0009` Lab Machine Detection · `C0002` HTTP Communication · `C0026` Encode Data (`.001` Base64, `.002` XOR) · `B0032.020` Argument Obfuscation. |
| **MITRE ATT&CK** | Tactic (WHY) → Technique (HOW) → Sub-technique. Example CAPA mapping: `schedule task via at → Scheduled Task/Job`. |
| **MAEC** | Malware Attribute Enumeration and Characterization. |
| **Regex** | `/i` = case-insensitive. Examples: `/VMware/i`, `/schtasks/i`, `/\create/i`, `/Register-ScheduledTask/i`. |
| **Web Explorer** | Interactive JSON exploration; **Global Search Box** locates rules quickly. |
| **Key answers** | `check-http-status-code.yml` · `reference anti-VM strings` · TLN `load-code` for run PowerShell expression · API `RegOpenKeyEx`. |
| **Sample & dir** | Sample `cryptbot.bin`; directory `C:\Users\Administrator\Desktop\capa`. |

**Key idea:** CAPA uses static-analysis rules to identify what an executable **may** be capable of doing, then gives analysts structured context and evidence — `Capability ≠ Maliciousness`; a capability is the *start* of an investigation, not the verdict.

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is CAPA?** | CAPA is a static-analysis tool that identifies capabilities in executable files using rules. |
| **Q2. What does CAPA help analysts determine?** | It helps determine what functionality or capabilities an executable may contain. |
| **Q3. Is CAPA a replacement for reverse engineering?** | No. CAPA supports malware triage and reverse engineering by identifying interesting functionality, but deeper analysis may still be required. |
| **Q4. What is a CAPA capability?** | A capability is functionality that CAPA identifies based on matched rules. |
| **Q5. What is a CAPA rule?** | A rule defines conditions that CAPA uses to identify a particular capability. |
| **Q6. What is a namespace?** | A namespace logically groups related CAPA rules. |
| **Q7. What does `-v` mean?** | Verbose output. |
| **Q8. What does `-vv` mean?** | Very verbose output. |
| **Q9. What does `-j` mean?** | JSON output. |
| **Q10. Why use JSON?** | JSON provides structured output that can be processed by tools and explored using interfaces such as CAPA Web Explorer. |
| **Q11. What is CAPA Web Explorer?** | An interactive interface for exploring CAPA results, including capabilities, rules, namespaces and matching information. |
| **Q12. What is the Global Search Box?** | It allows analysts to quickly search through CAPA results for capabilities, rules or other relevant information. |
| **Q13. What does `/i` mean in regex?** | Case-insensitive matching. |
| **Q14. What is MBC?** | MBC stands for Malware Behavior Catalogue and provides standardized descriptions of malware objectives and behaviours. |
| **Q15. What is the MBC hierarchy?** | Objective → Behaviour → Method → Identifier. |
| **Q16. What is MITRE ATT&CK?** | A knowledge base describing adversary tactics, techniques and sub-techniques. |
| **Q17. What is MAEC?** | Malware Attribute Enumeration and Characterization, a framework for describing malware attributes and behaviours. |
| **Q18. Does a CAPA capability automatically mean malware?** | No. A capability indicates functionality or evidence identified by a rule. The analyst must interpret it in context and correlate it with other evidence. |
| **Q19. Why is very verbose output useful?** | It provides more detailed information about rule matching, helping analysts understand why a capability was identified. |
| **Q20. How does CAPA support malware triage?** | CAPA quickly identifies interesting capabilities so analysts can prioritize samples, rules and functions for deeper analysis. |

---

## Final Takeaway

**CAPA (Common Analysis Platform for Artifacts)**, developed by the **FireEye Mandiant** team, is a **static-analysis** tool that identifies the **capabilities** present in executable files and other artifacts using rule matching — answering *"What can this program potentially do?"* without executing it. It runs from the command line (`capa.exe <file>`) with options for **verbose** (`-v`), **very verbose** (`-vv`), and **JSON** (`-j`) output, and results can be redirected to files such as `cryptbot_vv.txt` or `cryptbot_vv.json` and explored interactively in the **CAPA Web Explorer** via the **Global Search Box** and filters. Every result reads across layers — **Capability (WHAT?)**, **Namespace (WHERE?)** in the `TLN → Namespace → Rule YAML` hierarchy, **Rule (HOW?)**, and **Matching Evidence (WHY?)** — and connects to standardized frameworks: **MITRE ATT&CK** (Tactic → Technique → Sub-technique), the **Malware Behavior Catalogue (MBC)** (Objective → Behaviour → Method → Identifier, e.g. `C0017` Create Process, `B0009` Lab Machine Detection, `C0002` HTTP Communication, `C0026.001` Base64, `C0026.002` XOR), and **MAEC (Malware Attribute Enumeration and Characterization)**. Rules combine strings, APIs, and case-insensitive regex (`/schtasks/i`, `/\create/i`, `/Register-ScheduledTask/i`) using **AND/OR** logic, and namespaces like **nursery** (staging area for immature rules) and **lib** (reusable building blocks) show that a capability's name is *not* always its exact folder location. Most important of all, `Capability ≠ Maliciousness`: CAPA is a **triage** tool that helps analysts prioritize suspicious functionality and decide *where to investigate first* — correlating multiple capabilities, inspecting evidence, and adding context before reaching a verdict, then handing off to deeper **reverse engineering** and **dynamic analysis** where `Potential ≠ Observed`.
