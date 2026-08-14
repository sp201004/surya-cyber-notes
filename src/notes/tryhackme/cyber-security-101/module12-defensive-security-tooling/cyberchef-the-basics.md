| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Defensive Security Tooling / CyberChef |
| **Difficulty** | Beginner |
| **Time** | ~60 Minutes |
| **Module** | Defensive Security Tooling |

---

## Objective

**CyberChef** is a simple, intuitive **web-based application** designed to perform many different "cyber" operations directly inside a web browser. It is best described as a **"Swiss Army knife for data"**: a large collection of **operations**, where each operation performs one specific task, that can be chained together into a **recipe**. CyberChef handles everything from simple **encoding/decoding** through to more complex **cryptographic** work — the room specifically names `XOR`, `Base64`, `AES`, and `RSA`. This room builds the tool from the ground up: what CyberChef is and why it is useful during investigations, CTFs, malware analysis, and forensics; how to navigate the four interface areas (**Operations, Recipe, Input, Output**); the common operation categories (**Extractors, Date/Time, Data Format, Base Encodings, URL**); how Base64 works under the hood (a full manual `THM → VEhN` conversion); and a hands-on **"Your First Official Cook"** task that applies IP extraction, Base64, URL decoding, UNIX timestamps, and Base85.

By the end of this room you will be able to:

- Explain what **CyberChef** is — a web-based tool for **encoding, decoding, data transformation, encryption-related operations, and data extraction**
- Navigate the four interface areas: **Operations, Recipe, Input, Output**
- Understand and use common operations such as **From Base64, To Base64, To Hex, To Decimal, ROT13, From Morse Code, URL Encode/Decode**
- Recognise operation categories — **Extractors** (IPs, URLs, emails), **Date/Time** (UNIX timestamps), **Data Format / Base Encodings** (Base64, Base85, Base58, Base62)
- Build a **recipe** (an ordered sequence of operations) and process data through it
- Convert Base64 manually using the **ASCII → Binary → 6-bit groups → Decimal → Base64 index** pipeline
- Apply the core method — **Recognise → Select → Process → Verify** — to solve practical CyberChef questions

> **Content gap flag:** The source notes are organised into authored "Parts 1–10" that explicitly reference the room's **Task 3** (Navigating the Interface), **Task 5** (Practice, Practice, Practice), **Task 6** (Your First Official Cook), and **Task 7** (Conclusion). The source does not separately enumerate Task 2 or Task 4, so the sections below mirror the task numbers exactly as they appear in the source.

> **Analyst mindset:** *CyberChef is not a tool where you randomly click operations until something readable appears.* Understand the data, form a hypothesis, choose the correct operation, and verify the output. `Decoded ≠ Automatically Malicious` — the result still needs to be interpreted in context.

---

## Task 1 — Introduction to CyberChef

CyberChef is a simple and intuitive **web-based application** designed to help perform different types of "cyber" operations directly inside a web browser. A useful way to think about CyberChef is as a hub for **Encoding / Decoding, Data Transformation, Encryption-related operations, Data Extraction,** and other cyber security operations.

CyberChef can be thought of as a **"Swiss Army knife for data"**. Just like a Swiss Army knife contains multiple tools for different situations, CyberChef contains a large collection of operations where each operation performs a specific task.

### What Can CyberChef Do?

CyberChef supports operations ranging from very simple encoding and decoding tasks to more complex cryptographic operations. Examples mentioned in the room include:

```text
XOR
Base64
AES
RSA
```

### Example Categories

| Category | Example |
|---|---|
| Encoding | Base64 |
| Decoding | From Base64 |
| Transformation | Hex conversion |
| Encryption | AES |
| Cryptography | RSA decryption |

### CyberChef Works Using "Recipes"

One of the most important concepts in CyberChef is the idea of a **recipe** — a series of operations that CyberChef executes in order. For example a recipe might chain `From Base64 → To Hex → To Decimal`. CyberChef processes the input through the operations in the order they appear.

### Why CyberChef Is Useful in Cyber Security

During security investigations, CTFs, malware analysis, forensic analysis, or general security work, we frequently encounter data that is not immediately readable. Examples:

```text
SGVsbG8=

54 68 69 73 20 69 73 20 48 65 78

%68%74%74%70%73%3A%2F%2F

.... . .-.. .-.. ---
```

Instead of manually processing each format, CyberChef can perform the required transformation quickly. The typical investigation flow is a loop:

`Suspicious / Encoded Data → Identify Format → Select Operation → Process Data → Examine Output → Understand Data`

### Common Types of Data You May Encounter

CyberChef is particularly useful when dealing with **Base64, Hexadecimal, Binary, URLs, Encoded strings, Morse Code, Timestamps, IP addresses, Email addresses, Domains,** and other transformed data.

### Encoding Examples

- **Base64** — `hello` → `To Base64` → `aGVsbG8=`; reverse with `From Base64` (`aGVsbG8=` → `hello`).
- **Morse Code** — `Morse Code → From Morse Code → Normal Text`, useful when a challenge provides data in an unusual representation.
- **URL Encoding** — characters such as `:` `/` `.` `=` `#` can appear percent-encoded as `%3A` `%2F` `%2E` `%3D` `%23`. `URL Decode` reverses it: `https%3A%2F%2Ftryhackme.com` → `https://tryhackme.com`.

### CyberChef as a Data Transformation Pipeline

CyberChef does not only perform one operation — multiple operations can be chained. For example: `Raw Data → From Base64 → From Hex → URL Decode → Extract Information → Final Result`. This sequence of operations is the **recipe**.

### Learning Objectives

```text
[1] Learn what CyberChef is
[2] Learn how to navigate the CyberChef interface
[3] Understand common CyberChef operations
[4] Learn how to create recipes
[5] Learn how to process data
[6] Understand how to extract useful information
[7] Apply CyberChef operations to practical problems
```

### Room Prerequisites

The room states that familiarity with the following rooms is recommended, but **not mandatory**: **Hashing Basics** and **Cryptography Basics**. Because CyberChef can be used for encoding, decoding, cryptography, and data transformation, some previous knowledge of hashing and cryptography makes the concepts easier to understand.

### CyberChef Access

CyberChef can be accessed in two main ways:

> **1. Online Access**
> The easiest method is to use CyberChef through a web browser. Requirements: a **web browser** and an **internet connection**. Convenient because there is no local installation required.

> **2. Offline / Local Copy**
> CyberChef can also be run locally/offline. You can download the latest release file and run CyberChef on your own machine. Supported platforms: **Windows** and **Linux**. The room recommends downloading the **most stable version** as a best practice.

### Online vs Offline

| Online | Offline / Local |
|---|---|
| Browser based | Runs locally |
| Internet required | Can work without internet |
| No local setup | Requires downloading the release |
| Easy to access | Useful for local/private processing |

### Key Terms to Remember

| Term | Meaning |
|---|---|
| **CyberChef** | Web-based cyber/data processing tool |
| **Operation** | A single transformation/action |
| **Recipe** | Ordered collection of operations |
| **Input** | Data supplied to CyberChef |
| **Output** | Result produced after processing |
| **Encoding** | Converting data to another representation |
| **Decoding** | Converting encoded data back |

> **Quick memory trick:** `I → O → R → O` = **I**nput, **O**perations, **R**ecipe, **O**utput. The full workflow is `DATA → INPUT → OPERATION → RECIPE → OUTPUT → ANALYZE`.

### Interview / CTF Takeaways — Introduction

| Question | Answer |
|---|---|
| **Q1. What is CyberChef?** | CyberChef is a web-based tool used for performing various cyber security-related data transformations, including encoding, decoding, encryption-related operations, and data extraction. |
| **Q2. Why is CyberChef called a Swiss Army knife?** | Because it provides a large collection of different operations in one tool, allowing analysts to perform many different data-processing tasks. |
| **Q3. What is a CyberChef recipe?** | A recipe is an ordered sequence of CyberChef operations that are applied to input data. |
| **Q4. Can CyberChef run locally?** | Yes. The room explains that CyberChef can be downloaded and run locally/offline, with releases available for Windows and Linux. |
| **Q5. What are the four main concepts of the CyberChef interface?** | Operations, Recipe, Input, Output. |

---

## Task 3 — Navigating the CyberChef Interface

CyberChef's interface is divided into **four main areas**: **Operations, Recipe, Input,** and **Output**. Each area has a different purpose.

```text
┌─────────────────────────────────────────────────────────────────────┐
│                         CYBERCHEF                                  │
├──────────────────┬──────────────────────┬───────────────────────────┤
│                  │                      │                           │
│   OPERATIONS     │       RECIPE         │          INPUT            │
│                  │                      │                           │
│  Search          │  Operations placed  │  Paste / type / upload   │
│  Operations      │  here are executed  │  your data here          │
│                  │  in sequence        │                           │
│                  │                      ├───────────────────────────┤
│                  │                      │                           │
│                  │                      │          OUTPUT           │
│                  │                      │                           │
│                  │                      │  Processed result        │
│                  │                      │                           │
└──────────────────┴──────────────────────┴───────────────────────────┘
```

### Operations Area

The **Operations Area** is the practical and comprehensive repository of the different operations CyberChef can perform, organized into categories. A **Search** box lets you quickly find a particular operation instead of scrolling through hundreds (e.g. searching `Base64` returns `To Base64` and `From Base64`). Frequently used operations can be pinned to the **Favourites** section — useful during CTFs, Incident Response, Digital Forensics, Malware Analysis, and Security Investigations.

### Common Operations Shown in the Room

```text
Operation            Purpose
────────────────────────────────────────────────────────────
From Morse Code      Converts Morse Code into text
URL Encode           Encodes special characters for URLs
To Base64            Encodes data into Base64
To Hex               Converts input into hexadecimal
To Decimal           Converts input into decimal values
ROT13                Performs ROT13 substitution
From Base64          Decodes Base64 data
```

- **From Morse Code** — translates Morse Code into uppercase alphanumeric characters, e.g. `-- .... .-. . .- - ...` → `THREATS`.
- **URL Encode** — converts problematic/special characters into percent-encoded values, e.g. `https://tryhackme.com/r/room/cyberchefbasic` → `https%3A%2F%2Ftryhackme%2Ecom%2Fr%2Froom%2Fcyberchefbasic`.
- **To Base64** — encodes raw data into an ASCII Base64 string: `This is fun!` → `VGhpcyBpcyBmdW4h` (reverse with `From Base64`).
- **To Hex** — converts an input string into hexadecimal bytes separated by the specified delimiter:

```text
Input:
This Hex conversion is awesome!

Output:
54 68 69 73 20 48 65 78 20 63 6f 6e 76 65 72 73 69 6f 6e 20 69 73 20 61 77 65 73 6f 6d 65 21
```

- **To Decimal** — converts input data into an ordinal integer array, e.g. `This Decimal conversion is awesome!`.
- **ROT13** — a simple Caesar substitution cipher rotating alphabetic characters by **13 positions**: `Digital Forensics and Incident Response` → `Qvtvgny Sberafvp naq Vapvqrag Erfcbafr`.

Hovering over an operation can show its **Description, Example, Operation details,** and a **Link to relevant information / Wikipedia**. For example, hovering over **From Base64** shows that Base64 is a notation for encoding arbitrary byte data using a restricted set of symbols, and that `From Base64` decodes an ASCII Base64 string back into its raw format (`aGVsbG8=` → `hello`).

### Recipe Area

The **Recipe Area** is the central area where operations are placed and arranged — the **heart of CyberChef**. The recipe determines the sequence in which operations are applied. For example, to decode Base64 then convert to Hex:

```text
SGVsbG8=
    │
    ▼
From Base64
    │
    ▼
hello
    │
    ▼
To Hex
    │
    ▼
68 65 6c 6c 6f
```

Operations execute in the order in which they appear.

### Input Area

The **Input Area** is where data is provided — by **Pasting, Typing, Dragging,** or **Opening a file**. Important controls:

```text
+       → Add a new input tab
Folder  → Open folder as input
File    → Open file as input
Trash   → Clear input and output
Layout  → Reset pane layout
```

The `+` button creates another input tab so different values can be kept separately (encoded string, another encoded string, log data, another test value). The folder button loads a whole folder as input; the file button uploads a single file as input (useful when data is stored inside a file). Clear removes the current input and corresponding output; **Reset pane layout** returns the interface to its default window sizes.

### Output Area

The **Output Area** displays the result of processing the input. Controls: **Save output, Copy output, Replace input with output, Maximise output pane.**

- **Save Output to File** — the result can be saved into a `.dat` file.
- **Copy Raw Output to Clipboard** — copies the raw output so it can be pasted into another tool/document.
- **Replace Input with Output** — replaces the current input with the generated output, useful when continuing processing from the previous result.
- **Maximise Output Pane** — enlarges the pane when the result is large, long, or difficult to inspect.

### Interface at a Glance

`OPERATIONS (find the tools) → RECIPE (select + arrange the tools) → INPUT (provide the data) → OUTPUT (see the processed result)`

> **Memory trick:** `FIND → BUILD → FEED → SEE` = Operations → Recipe → Input → Output. In short: `Operations = Tools`, `Recipe = Pipeline`, `Input = Data`, `Output = Result`.

### Task 3 — Answers

| Question | Answer |
|---|---|
| **Q1. In which area can you find "From Base64"?** | operations |
| **Q2. Which area is considered the heart of the tool?** | Recipe |

> `From Base64` is an operation available inside the **Operations Area**. The **Recipe Area** is where operations are selected, arranged, and configured to process the input.

---

## Task 5 — Practice, Practice, Practice (Operations, Categories & Manual Base64)

CyberChef contains a large collection of operations, which raises the key question: *"Which operation should I use?"* Instead of memorising every operation, recognise the category: `DATA → FORMAT → OPERATION → RESULT`. The room introduces several categories: **Extractors, Date/Time, Data Format, Base Encodings,** and **URL Decoding**.

### Extractors

Extractor operations are useful when the input contains a large amount of text and you want to find specific pieces of information inside it.

> **1. Extract IP addresses**
> Extracts all **IPv4** and **IPv6** addresses from the input. Useful during security investigations when IP addresses appear inside logs or other text.

> **2. Extract URLs**
> Extracts Uniform Resource Locators (URLs) from the input. The **protocol** (such as `HTTP` or `FTP`) is required for URL extraction — without a protocol there can be too many false positives. `https://tryhackme.com` is clearly a URL because `https://` identifies the protocol.

> **3. Extract email addresses**
> Extracts all email addresses from the input. It looks for strings matching a pattern similar to `anything@domain[.]com` (example domains mentioned: `hotmail.com`, `google.com`, `tryhackme.com`, `yahoo.com`), so `security@tryhackme.com` is recognised as an email address.

| Operation | Purpose |
|---|---|
| Extract IP addresses | Extracts IPv4 and IPv6 addresses |
| Extract URLs | Extracts URLs from input |
| Extract email addresses | Extracts email addresses |

### Date and Time Category — UNIX Timestamps

A **UNIX timestamp** represents the number of seconds since **January 1, 1970 UTC** — a point commonly called the **UNIX epoch**. The two operations discussed:

> **1. From UNIX Timestamp**
> Converts a UNIX timestamp into a datetime string (`UNIX timestamp → readable date/time`).

> **2. To UNIX Timestamp**
> Parses a datetime string in UTC and returns the corresponding UNIX timestamp (`date/time → UNIX timestamp`).

Room example: `Fri Sep 6 20:30:22 +04 2024` → `To UNIX Timestamp` → `1725654622` (and the reverse via `From UNIX Timestamp`). Timestamps are extremely common in logs, incident response, forensics, web server records, authentication records, and malware analysis.

### Data Format Category

Operations used to transform data between different representations. The room specifically discusses `From Base64`, `URL Decode`, `From Base85`, `From Base58`, and `To Base62`.

- **From Base64** — decodes data from an ASCII Base64 string back into its raw format (room example input: `V2VsY29tZSB0byB0cnloYWNr`). Important: `Base64 ≠ Encryption` and `Base64 ≠ Hashing` — it is primarily an **encoding** mechanism, so Base64 data can normally be decoded if the encoding is known.
- **URL Decode** — converts URL/URI percent-encoded characters back to their raw values (e.g. `%3A` → `:`, `%2F` → `/`). Example: `https%3A%2F%2Ftryhackme%2Ecom` → `https://tryhackme.com`.
- **From Base85** — Base85 is a notation for encoding arbitrary byte data, generally more efficient than Base64 for the amount of data represented. Example: `B0u!rDj7BEbo7` → `hello world`.
- **From Base58** — Base58 removes characters that can easily be confused with one another to improve human readability. Removed characters: `I`, `l`, `1`, `0`, `O`. Example: `AXLU7qR` → `Thm58`.
- **To Base62** — a notation for encoding arbitrary byte data using a restricted set of symbols that computers can conveniently process. Example: `Thm62` → `6NjRkQY`.

### URL Encoding Reference

| Character | UTF-8 encoded |
|---|---|
| `:` | `%3A` |
| `/` | `%2F` |
| `.` | `%2E` |
| `=` | `%3D` |
| `#` | `%23` |

An extended set of common encodings also seen in the room: `?` → `%3F`, `&` → `%26`, `%` → `%25`.

### Common Operations — Quick Reference

| Operation | Purpose |
|---|---|
| Extract IP addresses | Extract IPv4 + IPv6 |
| Extract URLs | Extract URLs |
| Extract email addresses | Extract email addresses |
| From UNIX Timestamp | Timestamp → datetime |
| To UNIX Timestamp | Datetime → UNIX timestamp |
| From Base64 | Decode Base64 |
| URL Decode | Decode percent-encoded values |
| From Base85 | Decode Base85 |
| From Base58 | Decode Base58 |
| To Base62 | Encode using Base62 |

> **Extractor vs Decoder:** an **extractor** finds specific information inside existing data (`Large text → Extract IP addresses → IPs`); a **decoder** converts encoded data back to another representation (`Base64 → From Base64 → Original data`).

### Task 5 Knowledge Check — Practical Question Types

For the first two questions the room recommends using operations under the **Extractors** category. The practical questions include:

```text
• A hidden email address
• A hidden IP address ending in .232
• A domain address beginning with "T"
• Binary value of decimal 78
• URL encoded value of a TryHackMe careers URL
```

> **Content gap flag:** The source states that the "exact practical solving process and answers" for these Task 5 items are covered in the dedicated practical/write-up section (Task 6). It provides the **method** for each (e.g. `Find email → Extract email addresses`, `Convert decimal to binary → 78 = 01001110`) but does **not** publish literal final answer values for the email / `.232` IP / domain-beginning-with-T items, so those specific values are not reproduced here.

The binary conversion of `78` is worked through in full: using place values `128 64 32 16 8 4 2 1`, `78 = 64 + 8 + 4 + 2`, giving `78 = 01001110`.

### Deep Dive — Manual Base64 Conversion (THM → VEhN)

Although CyberChef can encode Base64 instantly, understanding the process helps you recognise Base64, understand binary data, debug transformations, and explain Base64 in an interview.

**Base64 fundamentals.** The alphabet contains `A-Z`, `a-z`, `0-9`, `+`, `/`, with `=` used as padding. There are **64 possible values** indexed `0`–`63`:

```text
A-Z → 0-25
a-z → 26-51
0-9 → 52-61
+   → 62
/   → 63
```

Because `2^6 = 64`, each Base64 character represents **6 bits**. Base64 processes data in groups of **24 bits** = `4 groups × 6 bits`. One byte = 8 bits, so 3 bytes = 24 bits → 4 Base64 characters (`3 bytes → 4 Base64 characters`).

The room walks through encoding `THM`:

| **1** | **Convert characters to ASCII**<br>`T = 84`, `H = 72`, `M = 77`. |
| --- | --- |

| **2** | **Convert ASCII to 8-bit binary**<br>`T = 01010100`, `H = 01001000`, `M = 01001101`. |
| --- | --- |

| **3** | **Combine and split into 6-bit groups**<br>`010101000100100001001101` → `010101 \| 000100 \| 100001 \| 001101`. |
| --- | --- |

| **4** | **Convert each 6-bit group to decimal**<br>`010101 → 21`, `000100 → 4`, `100001 → 33`, `001101 → 13`. |
| --- | --- |

| **5** | **Map decimals to the Base64 alphabet**<br>`21 → V`, `4 → E`, `33 → h`, `13 → N` → final result `VEhN`. |
| --- | --- |

Verify in CyberChef: input `THM` → `To Base64` → `VEhN`. Because `THM` is exactly 3 bytes, no `=` padding is required. Padding is needed when the original input is not a multiple of three bytes (1 byte → 4 chars incl. padding; 2 bytes → 4 chars incl. padding; 3 bytes → 4 chars), so Base64 output length is generally a multiple of 4.

**Binary place values.** For an 8-bit byte: `128 64 32 16 8 4 2 1` (e.g. `01010100 = 64 + 16 + 4 = 84 = T`). For 6-bit Base64 groups: `32 16 8 4 2 1` (e.g. `010101 = 16 + 4 + 1 = 21 → V`).

### Base64 Recognition

A suspicious string may be Base64 if it uses `A-Z`, `a-z`, `0-9`, may contain `+` or `/`, may end with `=`, and its length is commonly a multiple of 4 (e.g. `SGVsbG8=`). But a string *looking* like Base64 is not automatically proof that it is Base64 — always verify the decoded output.

### Common Mistakes

> **1. Calling Base64 encryption**
> Wrong: *"This is encrypted with Base64."* Correct: *"This is Base64 encoded."*

> **2. Forgetting the 6-bit groups**
> Base64 works with **6-bit groups**, not 8-bit groups.

> **3. Using ASCII decimal directly as the Base64 index**
> The process is `Character → ASCII → Binary → 6-bit groups → Decimal → Base64 index`. Do not skip the 6-bit grouping step.

> **4. Assuming every readable result is correct**
> Always ask *"Does the output make sense?"* If not, re-evaluate the assumed encoding.

### Interview / Security Questions — Operations & Categories

| Question | Answer |
|---|---|
| **Q1. What is an extractor in CyberChef?** | An extractor is an operation used to identify and extract specific types of information from input data, such as IP addresses, URLs, or email addresses. |
| **Q2. What does "Extract IP addresses" find?** | It extracts IPv4 and IPv6 addresses. |
| **Q3. What does "Extract URLs" do?** | It extracts URLs from the input. The room notes that the protocol is required to avoid excessive false positives. |
| **Q4. What does "From UNIX Timestamp" do?** | It converts a UNIX timestamp into a datetime string. |
| **Q5. What does "To UNIX Timestamp" do?** | It parses a datetime string in UTC and returns the corresponding UNIX timestamp. |
| **Q6. What is the UNIX epoch?** | The UNIX epoch is January 1, 1970 UTC, from which UNIX timestamps count seconds. |
| **Q7. What does "From Base64" do?** | It decodes an ASCII Base64 string back into its raw format. |
| **Q8. What does "URL Decode" do?** | It converts percent-encoded URL/URI characters back into their raw values. |
| **Q9. Why does Base58 remove characters such as I, l, 1, 0 and O?** | To improve human readability by avoiding characters that can easily be confused with each other. |

### Interview Questions — Base64 In Depth

| Question | Answer |
|---|---|
| **Q1. What is Base64?** | Base64 is an encoding scheme that represents binary data using a 64-character alphabet. |
| **Q2. How many bits does each Base64 character represent?** | 6 bits, because `2^6 = 64`. |
| **Q3. Why are 3 bytes converted into 4 Base64 characters?** | Because 3 bytes = 24 bits, and `24 / 6 = 4`. |
| **Q4. What is the Base64 alphabet?** | `A-Z`, `a-z`, `0-9`, `+`, `/`, with `=` commonly used for padding. |
| **Q5. What is the UNIX epoch?** | January 1, 1970 UTC. |
| **Q6. Is Base64 encryption?** | No. Base64 is encoding, not encryption. |
| **Q7. What is the Base64 encoding of `THM`?** | `VEhN` |

---

## Task 6 — Your First Official Cook

Task 6 combines the interface, operations, input, recipe, and output into five practical questions. It also uses the file downloaded in Task 5. The core skill is mapping the question wording to the correct operation.

### Question → Operation Mapping

| Question type | Operation |
|---|---|
| Find IP address | Extract IP addresses |
| Base64 encode | To Base64 |
| Decode URL | URL Decode |
| UNIX timestamp → datetime | From UNIX Timestamp |
| Base85 decode | From Base85 |

### Q1 — IP starting and ending with "10"

The question: *"Using the file you downloaded in Task 5, which IP starts and ends with '10'?"* Load the file (`Open file as input`), add `Extract IP addresses`, and filter to **IPv4**. Relevant extracted candidates:

```text
102.20.11.232
10.10.2.10
```

Apply the condition `starts with 10 AND ends with 10`:

| Candidate | Starts with 10 | Ends with 10 | Match |
|---|---|---|---|
| `102.20.11.232` | begins `102` | ends `232` | No |
| `10.10.2.10` | begins `10` | ends `10` | Yes |

The lesson: `CyberChef gives you processed data — you still need to interpret the result` (extraction is not the final answer automatically).

### Q2 — Base64 encode "Nice Room!"

The question explicitly says *base64 encoded*, so use `To Base64`. Input `Nice Room!` → `To Base64` → `TmljZSBSb29tIQ==`. The trailing `==` are Base64 padding characters and are part of the standard representation — do not remove them unless the context says so.

### Q3 — URL Decode

The input contains `%3A`, `%2F`, `%2E` (percent-encoded characters), so use `URL Decode`. Input `https%3A%2F%2Ftryhackme%2Ecom%2Fr%2Froom%2Fcyberchefbasics` → `URL Decode` → `https://tryhackme.com/r/room/cyberchefbasics`.

### Q4 — UNIX Timestamp

*"What is the datetime string for the Unix timestamp 1725151258?"* Use `From UNIX Timestamp`. Input `1725151258` → `From UNIX Timestamp` → `Sun 1 September 2024 00:40:58 UTC`.

### Q5 — Base85 Decode

The question explicitly says *Base85 decoded*, so use `From Base85`. Input `<+oue+DGm>Ap%u7` → `From Base85` → `This is fun!`.

### Task 6 — Complete Answers

| Question | Answer |
|---|---|
| **Q1. Which IP starts and ends with "10"?** | `10.10.2.10` |
| **Q2. What is the base64 encoded value of the string "Nice Room!"?** | `TmljZSBSb29tIQ==` |
| **Q3. What is the URL decoded value for `https%3A%2F%2Ftryhackme%2Ecom%2Fr%2Froom%2Fcyberchefbasics`?** | `https://tryhackme.com/r/room/cyberchefbasics` |
| **Q4. What is the datetime string for the Unix timestamp `1725151258`?** | `Sun 1 September 2024 00:40:58 UTC` |
| **Q5. What is the Base85 decoded string of the value `<+oue+DGm>Ap%u7`?** | `This is fun!` |

### "TO" vs "FROM"

`To` converts something **INTO** a format; `From` converts something **FROM** a format. Examples: `To Base64` = data → Base64; `From Base64` = Base64 → data; `To UNIX Timestamp` = datetime → timestamp; `From UNIX Timestamp` = timestamp → datetime; `To URL Encode` = normal URL → encoded URL; `URL Decode` = encoded URL → normal URL.

### Recipe Ordering (Multi-Step)

A recipe can contain one or many operations; each operation processes the previous operation's output. If data went through multiple transformations, reverse them in the **opposite order** — the last transformation applied must generally be reversed first (`Original: A → B → C`, `Reverse: C → B → A`). Example: original `Plain Text → To Base64 → URL Encode`; to recover it: `URL Decode → From Base64`.

### Interview / CTF Questions — Practical Cook

| Question | Answer |
|---|---|
| **Q1. How do you decode Base64 in CyberChef?** | Use the `From Base64` operation: add it to the Recipe, provide the Base64 input, and read the Output. |
| **Q2. How do you Base64 encode a string?** | Use the `To Base64` operation. |
| **Q3. How do you decode a percent-encoded URL?** | Use `URL Decode`. |
| **Q4. How do you convert a UNIX timestamp into a readable date?** | Use `From UNIX Timestamp`. |
| **Q5. How do you decode Base85?** | Use `From Base85`. |
| **Q6. What should you do if an extractor returns multiple results?** | Read the question, apply its condition, and select the matching result. |

---

## Task 7 — Conclusion

The room's goal was to understand CyberChef as a practical security tool. The complete learning path covered the **Interface, Operations, Recipe, Input, Output, Extractors, Encoding/Decoding, Timestamps,** and **Practical Recipes**. The most important skill is not memorising hundreds of operations, but: `Understand the data → Understand the question → Recognise required transformation → Search operation → Build recipe → Verify output`.

### Complete Task Answer Sheet

| Task | Outcome |
|---|---|
| Task 1 — Introduction | No answer needed |
| Task 3 — Interface navigation | `From Base64` is in **Operations**; the heart of CyberChef is the **Recipe** |
| Task 5 — Practice | Extract IPs / URLs / Emails · Base64 · URL encoding · Binary (`78 → 01001110`) · Timestamp · Base85 |
| Task 6 — Your First Official Cook | Q1 `10.10.2.10` · Q2 `TmljZSBSb29tIQ==` · Q3 `https://tryhackme.com/r/room/cyberchefbasics` · Q4 `Sun 1 September 2024 00:40:58 UTC` · Q5 `This is fun!` |
| Task 7 — Conclusion | No answer needed |

### Defensive & Offensive Relevance

CyberChef assists **defensive** teams with Log Analysis, Incident Response, **IOC (Indicator of Compromise)** Extraction (IP, Domain, URL, Email, Hash, File path), URL Analysis, Email Extraction, Timestamp Conversion, and Encoded Data Analysis. It is also useful for **authorised** CTF/lab work — identifying an encoding and decoding an encoded flag or payload. In both cases CyberChef helps *transform* the data, but the analyst still needs to **Interpret, Correlate, Validate,** and **Investigate** — `CyberChef Is a Tool, Not the Analysis`.

### Interview Questions — Conclusion

| Question | Answer |
|---|---|
| **Q1. What is CyberChef?** | CyberChef is a web-based tool for performing data transformation, encoding, decoding, extraction and analysis operations. |
| **Q2. What are the four main areas of CyberChef?** | Operations, Recipe, Input, Output. |
| **Q3. What is the Recipe Area?** | The Recipe Area is where operations are added, configured and arranged in the order in which they should process the input. |
| **Q4. What does Extract IP addresses do?** | It extracts IPv4 and IPv6 addresses from the input. |
| **Q5. What does From Base64 do?** | It decodes an ASCII Base64 string back into its raw representation. |
| **Q6. Is Base64 encryption?** | No. Base64 is an encoding scheme. |
| **Q7. How many bits does one Base64 character represent?** | 6 bits, because `2^6 = 64`. |
| **Q8. What is the UNIX epoch?** | January 1, 1970 UTC. |
| **Q9. What does URL Decode do?** | It converts percent-encoded URL/URI characters back into their original representation. |
| **Q10. Why is operation order important?** | Because the output of one operation becomes the input of the next; for multi-step transformations, reversing them usually requires reversing their order. |

---

## Quick Revision

| Topic | Key fact |
|---|---|
| **CyberChef** | Web-based "Swiss Army knife for data" — encoding, decoding, transformation, encryption-related ops, and extraction. |
| **Four areas** | Operations (find tools) · Recipe (pipeline/heart) · Input (data) · Output (result). |
| **Recipe** | An ordered sequence of operations; operations execute in order and each processes the previous output. |
| **Core method** | `Recognise → Select → Process → Verify`. |
| **Extractors** | Extract IP addresses (IPv4 + IPv6) · Extract URLs (protocol required) · Extract email addresses. |
| **Date/Time** | From UNIX Timestamp (timestamp → datetime) · To UNIX Timestamp (datetime → timestamp); UNIX epoch = January 1, 1970 UTC. |
| **Base encodings** | Base64, Base85, Base58 (removes `I l 1 0 O`), Base62 — encoding, not encryption. |
| **Base64 math** | Alphabet `A-Z`(0-25) `a-z`(26-51) `0-9`(52-61) `+`(62) `/`(63); 1 char = 6 bits; 3 bytes = 24 bits = 4 chars; `=` = padding. |
| **Manual THM** | `T=84 H=72 M=77` → `01010100 01001000 01001101` → `010101\|000100\|100001\|001101` → `21\|4\|33\|13` → `VEhN`. |
| **URL encoding** | `: %3A` · `/ %2F` · `. %2E` · `= %3D` · `# %23` (also `? %3F` · `& %26` · `% %25`). |
| **To vs From** | `To` = convert INTO a format · `From` = convert FROM a format. |
| **Reverse order** | Reverse multi-step transformations in reverse order (last applied → reversed first). |
| **Task 3** | `From Base64` → Operations · heart of the tool → Recipe. |
| **Task 6** | `10.10.2.10` · `TmljZSBSb29tIQ==` · `https://tryhackme.com/r/room/cyberchefbasics` · `Sun 1 September 2024 00:40:58 UTC` · `This is fun!`. |
| **Flag** | No `THM{}` flag appears in this room. |

**Key idea:** Don't memorise everything — understand the data, understand the question, choose the right operation, and verify the result.

---

## Final Takeaway

**CyberChef** is a web-based **"Swiss Army knife for data"** that turns unreadable or transformed data into something an analyst can understand. Its power comes from four areas working together — **Operations** (where you find the tools), the **Recipe** (the processing pipeline and heart of the tool), the **Input** (your data), and the **Output** (the result) — chained into an ordered **recipe** of individual **operations**. The room covered the everyday operations analysts reach for: the **Extractors** (`Extract IP addresses` for IPv4/IPv6, `Extract URLs` which needs a protocol, `Extract email addresses`), **Date/Time** conversions built on the **UNIX epoch** of January 1, 1970 UTC (`From UNIX Timestamp` / `To UNIX Timestamp`), and the **Base Encodings** (`Base64`, `Base85`, `Base58`, `Base62`) plus `URL Decode` — always remembering that **encoding is not encryption**. A full manual walkthrough proved how Base64 works underneath: `THM → VEhN` via **ASCII → binary → 6-bit groups → decimal → Base64 index**. The hands-on **"Your First Official Cook"** tied it all together, mapping question wording to operations and yielding `10.10.2.10`, `TmljZSBSb29tIQ==`, `https://tryhackme.com/r/room/cyberchefbasics`, `Sun 1 September 2024 00:40:58 UTC`, and `This is fun!`. The lasting lesson is a method, not a memorised list — **Recognise → Select → Process → Verify** — because CyberChef processes the data, but the **analyst** still interprets, correlates, and investigates it.
