| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Defensive Security / Digital Forensics |
| **Difficulty** | Info |
| **Time** | ~45 Minutes |
| **Module** | Defensive Security |

---

## Objective

**Digital Forensics** is the branch of forensics that applies systematic methods to investigate crimes involving digital devices and digital data — collecting, preserving, examining and analysing **digital evidence** so investigators can reconstruct what happened and support legal proceedings. This room builds the foundations first (what forensics and cyber crime are, and why digital devices leave traces), then walks the **NIST** four-phase methodology (`Collection → Examination → Analysis → Reporting`), the different **types** of digital forensics, how evidence is **acquired** legally (authorization, chain of custody, write blockers), the key **Windows** artifacts and **Linux** command-line tooling, and finally a hands-on investigation of a PDF and an image using `file`, `pdfinfo`, `exiftool`, `sha256sum`, `strings`, `grep` and `which`.

By the end of this room you will be able to:

- Explain what **forensics**, **digital forensics**, **cyber crime** and **digital evidence** are
- Walk the **NIST** methodology and tell **Examination** apart from **Analysis**, and **Collection** apart from **Examination**
- Name the main **types** of digital forensics (computer, mobile, network, database, cloud, email, disk, memory, malware)
- Describe legal evidence acquisition: **authorization**, **search warrant**, **chain of custody** and its five recorded details
- Preserve integrity with **write blockers** and cryptographic **hashing** (MD5, SHA-1, SHA-256, SHA-512)
- Distinguish **volatile** vs **non-volatile** data and apply the **order of volatility**
- Recognise Windows artifacts — registry, event logs, browser artifacts, deleted files, unallocated space, file metadata
- Identify the roles of **FTK Imager**, **Autopsy**, **DumpIt** and **Volatility**
- Investigate files from the command line: `file`, `pdfinfo`, `exiftool`, `sha256sum`, `strings`, `grep`, `which`, `command -v`

> **Authorization warning:** Digital forensics must only be performed with proper legal authority (search warrants, consent, or lawful authorisation). Accessing devices or data you do not own or have permission to examine is illegal.

---

## Task 1 — Introduction to Digital Forensics

**Forensics** is the application of systematic methods and procedures to investigate and solve crimes — in short, *Collect + Preserve + Examine + Analyze evidence to discover what happened*. Traditional forensics deals with physical evidence (fingerprints, DNA, blood, weapons, documents). When the crime involves computers, phones, networks or other digital devices, we enter **Digital Forensics**.

**Digital Forensics** uses specialised tools, techniques, procedures and methodologies to investigate digital devices and discover evidence. Common devices investigated include a computer, laptop, mobile phone, hard drive, USB drive, digital camera, memory and cloud storage.

A **cyber crime** is any criminal activity conducted **on or using a digital device** — unauthorized access, data theft, malware attacks, online fraud, phishing, identity theft, cyber espionage, ransomware, illegal communications and attacks against computer systems.

**Digital evidence** is information stored or transmitted in digital form that can be relevant to an investigation: documents, photos, videos, emails, chat messages, call records, browser history, GPS data, files, network logs and system logs. It must be handled carefully because it can be modified, deleted, overwritten, corrupted or destroyed.

> **Key idea:** Digital devices leave traces of activity. Even when a person tries to hide activity, useful forensic artifacts may remain.

### The Bank Robbery Example

The room's worked example is a bank robber whose house was searched under proper warrant. Investigators found a laptop, mobile phone, hard drive and USB drive, and handed the case to the **Digital Forensics Team**, which securely collected the evidence and discovered: a digital bank map (planning), a document with entrance and escape routes, a document listing the bank's physical security controls (planning and intent), photos/videos tied to previous robberies, and mobile-phone evidence (illegal chat groups, call records, communications about the robbery).

### Preserving the Original

Investigators should work with forensic copies/images whenever possible rather than modifying the original device — if the original is altered, its integrity (and legal admissibility) can be challenged.

> **Preserving the original evidence is a fundamental requirement of digital forensics.**

### Task 1 — Answer

| Question | Answer |
|---|---|
| **Which team was handed the case by law enforcement?** | digital forensics |

### Interview Questions — Foundations

| Question | Answer |
|---|---|
| **Q1. What is digital forensics?** | The process of collecting, preserving, examining and analyzing digital evidence from devices such as computers, phones, storage devices and networks to investigate incidents or crimes. |
| **Q2. What is cyber crime?** | Criminal activity conducted on or using digital devices or computer systems. |
| **Q3. Why is digital forensics important?** | It helps investigators identify, preserve and analyze digital evidence to understand what happened, how it happened, and potentially who was responsible. |
| **Q4. Give examples of digital evidence.** | Files, emails, chat messages, browser history, call records, photos, videos, GPS information, system logs and network logs. |

---

## Task 2 — Digital Forensics Methodology (NIST)

Every investigation is different, but investigators still need a **structured, repeatable process**. The **National Institute of Standards and Technology (NIST)** defines a general digital forensics process of **four phases**:

```text
Collection → Examination → Analysis → Reporting
```

> **Memory trick:** `C → E → A → R` — **C**ollection → **E**xamination → **A**nalysis → **R**eporting. Think *Collect → Extract → Analyze → Report*.

The four phases each have a distinct purpose:

> **1. Collection**
> Identify and collect all relevant digital evidence. Determine *what devices or sources may contain useful evidence* (desktop, laptop, phone, USB, camera, hard drive), and collect them securely and documented. The original evidence must **not** be unnecessarily altered. Collection is the foundation of the entire investigation — poor collection loses data, modifies originals, destroys volatile information and creates legal problems.

> **2. Examination**
> After collection you may have a huge amount of data (e.g. a 500 GB drive with millions of files, of which only a little is relevant). Examination **filters and extracts data of interest** — searching for specific artifacts and narrowing large datasets. Example: filtering 10,000 camera photos by date/time, or isolating one target user out of 100 accounts.

> **3. Analysis**
> Determine *what actually happened*. Investigators correlate different pieces of evidence, build timelines, identify relationships and draw conclusions — answering *what happened, when, how, who was involved, and what evidence supports it*. A single artifact rarely tells the whole story, so sources are correlated (browser history + file metadata + chat + call records + GPS → timeline).

> **4. Reporting**
> Document the findings in a clear forensic report, including an executive summary, so the results can support investigative or legal use.

### Collection vs Examination vs Analysis

| Phase | Main Purpose |
|---|---|
| **Collection** | *What evidence do we have?* — collect digital evidence. |
| **Examination** | *What data inside that evidence is relevant?* — extract/filter data of interest. |
| **Analysis** | *What does the relevant data mean?* — correlate to draw conclusions. |

### Task 2 — Answers

| Question | Answer |
|---|---|
| **Q1. Which phase of digital forensics is concerned with correlating the collected data to draw any conclusions from it?** | Analysis |
| **Q2. Which phase of digital forensics is concerned with extracting the data of interest from the collected evidence?** | Examination |

### Interview Questions — Methodology

| Question | Answer |
|---|---|
| **Q1. What are the four NIST phases?** | Collection, Examination, Analysis, Reporting (`C → E → A → R`). |
| **Q2. What is the goal of Collection?** | Identify and securely collect all relevant digital evidence without unnecessarily altering the original. |
| **Q3. What is the goal of Examination?** | Filter and extract the relevant data of interest from the collected evidence. |
| **Q4. What is the goal of Analysis?** | Correlate evidence, build timelines and draw conclusions about what happened. |
| **Q5. What is the goal of Reporting?** | Document findings clearly (including an executive summary) for investigative or legal use. |

---

## Task 3 — Types of Digital Forensics

Digital forensics splits into specialisations by the kind of evidence involved:

| Type | What it investigates |
|---|---|
| **Computer Forensics** | Computers and laptops — files, user activity, system information. |
| **Mobile Forensics** | Phones and tablets — SMS, calls, contacts, app data, GPS. |
| **Network Forensics** | Network traffic and logs to reconstruct communications and attacks. |
| **Database Forensics** | Databases — records, transactions and stored data. |
| **Cloud Forensics** | Cloud services and infrastructure — files, backups, account activity. |
| **Email Forensics** | Emails, headers and messaging artifacts. |
| **Disk Forensics** | Storage media — files, deleted data, file-system structures. |
| **Memory Forensics** | Volatile RAM — running processes, network connections, in-memory artifacts. |
| **Malware Forensics** | Malicious software — behaviour, indicators and impact. |

> **Examination vs Analysis:** *Examination* = extract/filter the useful data out of the collected evidence. *Analysis* = interpret and correlate that data to reach conclusions. Extraction comes first, interpretation second.

### Interview Questions — Types

| Question | Answer |
|---|---|
| **Q1. What does memory forensics investigate?** | Volatile RAM — running processes, network connections, loaded modules and other in-memory artifacts. |
| **Q2. What does network forensics investigate?** | Network traffic and logs, to reconstruct communications and detect attacks. |
| **Q3. What is disk forensics?** | Investigation of storage media, including existing files, deleted data and file-system structures. |
| **Q4. Difference between examination and analysis?** | Examination extracts/filters relevant data; analysis correlates and interprets it to draw conclusions. |

---

## Task 4 — Evidence Acquisition: Authorization, Chain of Custody & Write Blockers

**Evidence acquisition** is the process of securely acquiring digital evidence so it can be examined without compromising the original. It must be done legally and in a documented, controlled manner.

### Authorization and Search Warrant

Proper **authorization** (such as a **search warrant** or lawful consent) is required before evidence is collected. Evidence gathered without proper authority may be inadmissible, and improper access is itself illegal.

### Chain of Custody

The **chain of custody** is the document that records the complete history of the collected digital evidence — who handled it, when, and where — so its integrity and admissibility can be defended. The room identifies five recorded details:

> **1. Description of Evidence**
> The name, type, identifier and description of the item (e.g. `Evidence Type: Hard Drive`, `Evidence Type: USB Drive`, `Evidence Type: Mobile Phone`, `Evidence Type: Laptop`).

> **2. Name of Individuals**
> Who collected, handled or received the evidence (e.g. `Collected By: Investigator A`, `Transferred To: Investigator B`).

> **3. Date and Time**
> When the evidence was collected (e.g. `Collection Date: 12 June 2026`, `Collection Time: 14:30`).

> **4. Storage Location**
> Where the evidence is stored (e.g. `Forensics Evidence Room`, `Locker: A-12`).

> **5. Access Times**
> Every access to the evidence is recorded (e.g. `10:00 → Investigator A accessed evidence`, `12:30 → Investigator B accessed evidence`).

### Write Blockers and Evidence Integrity

A **write blocker** is a forensic tool that prevents any write operations to a storage device while still allowing investigators to **read** and acquire its data. It ensures **evidence integrity** by preventing accidental modification of the original during acquisition — without one, simply connecting a drive can change timestamps or data.

> **Memory trick:** *Chain of custody = the paperwork (who/when/where).* *Write blocker = the hardware/software that stops writes so the original is never changed.*

### Acquisition Workflow

The end-to-end acquisition of a device follows a fixed order:

```text
Authorization → Collection → Chain of Custody → Acquisition → Write Protection → Analysis
```

### Task 4 — Answers

| Question | Answer |
|---|---|
| **Q1. Which tool is used to ensure data integrity during the collection?** | write blocker |
| **Q2. What is the name of the document that has all the details of the collected digital evidence?** | chain of custody |

### Interview Questions — Acquisition

| Question | Answer |
|---|---|
| **Q1. What is a write blocker?** | A forensic tool that prevents write operations to a storage device while allowing investigators to read and acquire its data. |
| **Q2. Why is a write blocker important?** | It prevents accidental modification of the original evidence during acquisition, preserving evidence integrity. |
| **Q3. What is the chain of custody?** | The document recording all details of the collected evidence — description, individuals, date/time, storage location and access times. |
| **Q4. Why is authorization important?** | Evidence collected without proper legal authority may be inadmissible, and unauthorised access is illegal. |
| **Q5. What five details does the chain of custody record?** | Description of evidence, name of individuals, date and time, storage location, and access times. |

---

## Task 5 — Windows Forensics: Volatile vs Non-Volatile & Artifacts

Windows systems store evidence in two broad categories. **Volatile data** disappears when the system loses power (RAM contents, running processes, network connections, active sessions). **Non-volatile data** persists after shutdown (files on disk, registry, event logs, browser artifacts).

### Order of Volatility

During collection, capture the **most volatile** information first, when appropriate:

```text
CPU / Registers → RAM → Network State → Temporary Data → Disk → Archival / Remote Data
```

**Live forensics** collects evidence from a running system (to preserve volatile data), while **dead-box forensics** analyses a powered-off system's storage. The decision to power off must weigh the loss of volatile RAM against other risks.

### Key Windows Artifacts

| Artifact | Forensic value |
|---|---|
| **Windows Registry** | Hierarchical config database — user activity, system config, installed software, devices, execution history, user settings. |
| **Windows Event Logs** | Records logons, process/system/security events, service activity and errors — used to reconstruct activity and build timelines. |
| **Browser Artifacts** | History, downloads, cookies, cached data, bookmarks and sessions. |
| **User Activity** | Recently opened files, recent applications, downloads, USB connections, logon events. |
| **Deleted Files** | Deletion often only marks space as available — data may remain recoverable depending on filesystem/activity. |
| **Unallocated Space** | Areas not assigned to active files; may hold remnants of deleted data. |
| **File Metadata** | Filename, size, creation/modification/access times, owner and type — used to build timelines. |

> **File timestamps caution:** Creation, Modification and Access times build timelines, but they can be affected by time zones, clock configuration, file copying and metadata modification — always validate against other evidence.

### Interview Questions — Windows Forensics

| Question | Answer |
|---|---|
| **Q1. What is volatile data?** | Data that is lost when the system powers off, such as RAM contents, running processes and network connections. |
| **Q2. What is the order of volatility?** | The principle of collecting the most volatile data first (CPU/registers → RAM → network state → temporary data → disk → archival/remote data). |
| **Q3. Difference between live and dead-box forensics?** | Live forensics collects evidence from a running system to preserve volatile data; dead-box forensics analyses a powered-off system's storage. |
| **Q4. Why is the Windows Registry useful?** | It stores configuration and activity data — installed software, devices, execution history and user settings. |
| **Q5. Does deleting a file destroy the data?** | Not necessarily — the filesystem often just marks the space available, so deleted data may remain in unallocated space and be recoverable. |

---

## Task 6 — Forensic Imaging, Hashing & Forensic Tools

### Forensic Image

A **forensic image** is a **bit-for-bit** representation or acquisition of storage media. Instead of repeatedly working on the original drive, investigators analyse the image, preserving the original.

A forensic image is **not** simply a folder of copied files. A normal file copy only captures accessible files; a forensic acquisition can preserve existing files, deleted data, file-system structures, unallocated space, metadata and partition information.

Common forensic image formats:

| Format | Notes |
|---|---|
| **RAW / DD** | Direct representation of acquired storage data (e.g. `disk.dd`). |
| **E01** | Common EnCase-style evidence image; can support metadata and integrity mechanisms. |
| **AFF** | **Advanced Forensic Format**, another format designed for forensic storage. |

### Hashing Forensic Evidence

Hashing verifies **evidence integrity**: a cryptographic hash produces a fixed-length value from data. Hash the evidence at acquisition, and re-hash later — matching hashes support integrity; differing hashes indicate a change to investigate. Common algorithms: **MD5**, **SHA-1**, **SHA-256**, **SHA-512** (prefer stronger algorithms such as SHA-256 over MD5/SHA-1 where appropriate).

### Forensic Tools

| Tool | Role |
|---|---|
| **FTK Imager** | Forensic **acquisition** and evidence preview — acquire images, preview evidence, calculate hashes, export files. |
| **Autopsy** | Forensic **examination/analysis** platform — file-system analysis, timelines, keyword searches, web artifacts, deleted files. |
| **DumpIt** | Acquires **physical memory (RAM)** from a running system into a memory image. |
| **Volatility** | **Memory forensics framework** that analyses memory images — processes, network connections, loaded modules and other volatile artifacts. |

> **FTK Imager vs Autopsy:** FTK Imager is mostly about **acquisition** (image creation, preview, hashing, export); Autopsy is mostly about **examination/analysis** (timelines, keyword searching, artifact analysis).

### Interview Questions — Imaging & Tools

| Question | Answer |
|---|---|
| **Q1. What is a forensic image?** | A bit-for-bit acquisition of storage media, analysed instead of the original to preserve evidence. |
| **Q2. How is a forensic image different from a file copy?** | A file copy captures only accessible files; a forensic image can also preserve deleted data, unallocated space, file-system structures and metadata. |
| **Q3. Why hash forensic evidence?** | To verify integrity — matching hashes before and after support that the evidence has not changed. |
| **Q4. Name common hash algorithms.** | MD5, SHA-1, SHA-256, SHA-512. |
| **Q5. What are FTK Imager and Autopsy used for?** | FTK Imager for acquisition/preview/hashing; Autopsy for examination and analysis of forensic images. |
| **Q6. What are DumpIt and Volatility?** | DumpIt acquires RAM into a memory image; Volatility is a framework that analyses that memory image. |

---

## Task 7 — Practical Forensics: File Metadata & PDF Investigation

**Metadata** is data that describes other data — author, timestamps, software and technical properties. In forensics it provides investigative **leads**, but it can be **modified or forged**, so it must be corroborated, never treated as absolute proof.

### Identify the File First

The Linux `file` command identifies a file's type from its **contents**, which matters when the extension is missing or misleading:

```bash
$ file suspicious
suspicious: PDF document
```

### Inspecting a PDF with `pdfinfo`

`pdfinfo` is a command-line utility that displays information about a PDF — version, pages, page size, file size, author, creator, producer, creation date, modification date and encryption status.

```bash
pdfinfo <file.pdf>
```

Useful fields for an investigation: `Author`, `Creator` (application that created the document), `Producer` (software that produced the final PDF), `CreationDate` and `ModDate` (timestamps for timeline building). Check whether it is installed and where:

```bash
which pdfinfo
command -v pdfinfo
```

On Debian/Ubuntu/Kali it comes from the Poppler utilities package:

```bash
sudo apt update
sudo apt install poppler-utils
```

### Case Evidence — Ransom Letter

The practical example investigates `ransom-letter.pdf`. Running `pdfinfo` and reading the author field reveals the key clue:

```bash
$ pdfinfo ransom-letter.pdf
Author: Ann Gree Shepherd
```

This is an **investigative lead**, not proof of guilt — a proper investigation correlates it with user accounts, file-system activity, login records, other documents, communications and timeline evidence.

### Preserve With a Hash

Before analysis, preserve integrity by hashing the file, then work on a copy:

```bash
sha256sum ransom-letter.pdf
```

### `exiftool` — Broad Metadata Extraction

`exiftool` reads metadata from many file types (images, PDFs, videos, documents, audio):

```bash
exiftool <file>
```

### `strings` — Human-Readable Text

`strings` extracts readable text from binary data, sometimes revealing URLs, usernames, file paths, messages, embedded text or CTF flags:

```bash
strings suspicious.bin
```

### `pdfinfo` vs `exiftool`

| Tool | Main strength |
|---|---|
| `pdfinfo` | PDF-specific information. |
| `exiftool` | Broad metadata extraction across many file types. |

### Practical Command Cheat Sheet

Reference commands for a file investigation:

```bash
# Identify file type
file suspicious

# Inspect PDF metadata
pdfinfo suspicious.pdf

# Extract metadata
exiftool suspicious

# Calculate SHA-256 hash
sha256sum suspicious

# Extract readable strings
strings suspicious

# Find command location
which pdfinfo
```

| Command | Purpose |
|---|---|
| `file` | Identify file type |
| `pdfinfo` | Inspect PDF information |
| `exiftool` | Extract metadata |
| `sha256sum` | Calculate SHA-256 hash |
| `strings` | Extract readable strings |
| `which` | Locate executable |

### Task 7 — Answer

| Question | Answer |
|---|---|
| **Who is the author of the `ransom-letter.pdf` file?** | Ann Gree Shepherd |

### Interview Questions — File & PDF Forensics

| Question | Answer |
|---|---|
| **Q1. What is metadata?** | Information that describes a file or other data, such as its author, timestamps, software or technical properties. |
| **Q2. Why is metadata useful in forensics?** | It provides investigative clues about how, when and sometimes by whom a file was created or modified. |
| **Q3. What does the `file` command do?** | Identifies a file's type based on its contents, useful when the extension is missing or misleading. |
| **Q4. What does `pdfinfo` do?** | Displays information about a PDF — version, pages, author, creator, producer, creation/modification dates and encryption status. |
| **Q5. Difference between `pdfinfo` and `exiftool`?** | `pdfinfo` is PDF-specific; `exiftool` extracts metadata across many file types. |
| **Q6. Why hash a file before analysis?** | To document and preserve its integrity so any later change can be detected. |
| **Q7. Can metadata be trusted as proof?** | No — metadata can be modified or forged, so it is a lead that must be corroborated. |

---

## Task 8 — Photo Forensics: EXIF, Camera & GPS

**EXIF (Exchangeable Image File Format)** is a metadata standard for digital images. It can include the camera manufacturer, model, date and time, exposure settings, lens information, software and **GPS coordinates** — extremely valuable for placing a photo at a time and location. Like all metadata, EXIF can be removed or modified, so it requires validation.

### Extracting EXIF With `exiftool`

The primary tool is `exiftool`:

```bash
exiftool <filename>
```

Example output for an image:

```bash
$ exiftool image.jpg
ExifTool Version Number : 12.x
File Name               : image.jpg
File Size               : 2.4 MB
File Type               : JPEG
Image Width             : 4000
Image Height            : 3000
Make                     : Canon
Camera Model Name        : Canon EOS R6
Date/Time Original       : 2026:06:15 18:30:25
GPS Latitude             : 40 deg 42' 46.00" N
GPS Longitude            : 74 deg 00' 21.00" W
Software                 : ...
```

### Filtering Metadata With `grep`

Rather than reading everything, pipe `exiftool` into `grep` to target specific fields:

```bash
exiftool image.jpg | grep -i "GPS"
exiftool image.jpg | grep -i "camera"
exiftool image.jpg | grep -i "date"
```

Camera-information lookup shows the make and model directly:

```bash
$ exiftool image.jpg | grep -Ei "make|model"
Make                    : Canon
Camera Model Name       : Canon EOS R6
```

### GPS Coordinates

GPS metadata stores **Latitude** and **Longitude**. Latitude is measured North/South of the equator, longitude East/West of the prime meridian. Coordinates may appear in **DMS** (degrees/minutes/seconds) and can be converted to decimal degrees, applying the sign convention (N/E positive, S/W negative).

> **Same model ≠ same camera:** Multiple photos showing `Camera Model Name : Canon EOS R6` suggest the same camera *model*, but many people own the same model — it does not prove the same physical device.

### Practical Investigation Example

An investigation of `evidence.jpg` follows the identify → hash → extract → correlate flow:

```bash
# Step 1 — Identify the file
file evidence.jpg

# Step 2 — Calculate hash
sha256sum evidence.jpg

# Step 3 — Extract metadata
exiftool evidence.jpg

# Step 4 — Look for camera information
exiftool evidence.jpg | grep -Ei "make|model"

# Step 5 — Look for timestamps
exiftool evidence.jpg | grep -i "date"

# Step 6 — Look for GPS
exiftool evidence.jpg | grep -i "GPS"
```

The practical case identifies the camera as `Canon EOS R6` — an important clue to correlate with the timestamp, GPS and other evidence.

### Task 8 — Answer

| Question | Answer |
|---|---|
| **What is the model of the camera used to take the photo?** | Canon EOS R6 |

### Interview Questions — Photo Forensics

| Question | Answer |
|---|---|
| **Q1. What is EXIF?** | Exchangeable Image File Format — a metadata standard for digital images storing camera, timestamp, settings and GPS data. |
| **Q2. What tool extracts EXIF metadata?** | `exiftool`. |
| **Q3. How do you filter for GPS fields?** | Pipe into grep, e.g. `exiftool image.jpg \| grep -i "GPS"`. |
| **Q4. Why is GPS metadata powerful?** | Latitude/longitude can place a photo at a specific location, helping build a timeline. |
| **Q5. Does the same camera model prove the same device?** | No — many people own the same model, so it only suggests a common model, not the same physical camera. |
| **Q6. Can EXIF metadata be trusted absolutely?** | No — it can be removed or modified, so it must be validated against other evidence. |

---

## Task 9 — Command-Line Forensic Triage & Investigation Workflow

The command-line tools combine into a fast forensic triage: identify a file, hash it, extract metadata/strings, and search the output for indicators. `which` and `command -v` confirm a tool is installed and where.

### CTF / Triage Command Pack

```bash
# Identify file
file evidence

# Hash
sha256sum evidence

# Metadata
exiftool evidence

# PDF metadata
pdfinfo evidence.pdf

# Extract strings
strings evidence

# Search strings
strings evidence | grep -Ei "flag|password|http"

# Search metadata
exiftool evidence | grep -Ei "GPS|date|camera|model"
```

### Master Command Reference

```bash
# Identify file
file <file>

# SHA-256 hash
sha256sum <file>

# General metadata
exiftool <file>

# PDF metadata
pdfinfo <file.pdf>

# Extract strings
strings <file>

# Search text
grep -i "keyword" <file>

# Search multiple patterns
grep -Ei "pattern1|pattern2|pattern3" <file>

# Locate command
which <command>

# Alternative command lookup
command -v <command>

# Save output
command > output.txt

# Append output
command >> output.txt

# Combine commands
command1 | command2
```

### Investigation Workflow

The practical forensic mindset moves from a raw file to corroborated findings:

```text
Find File → Preserve Evidence → Hash → Identify Type → Extract Metadata → Find Clues → Correlate Evidence → Build Timeline → Draw Conclusions
```

### Real-World Incident Order

A full host investigation follows the acquisition-first order:

```text
Secure → Preserve → Volatile Evidence → Storage → Analysis → Correlation → Timeline → Report
```

### Interview Questions — Triage & Workflow

| Question | Answer |
|---|---|
| **Q1. How do you check whether a tool is installed?** | With `which <command>` or `command -v <command>`. |
| **Q2. How do you search strings output for indicators?** | Pipe into grep, e.g. `strings evidence \| grep -Ei "flag\|password\|http"`. |
| **Q3. How do you save command output to a file?** | Redirect with `>` (overwrite) or `>>` (append), e.g. `command > output.txt`. |
| **Q4. Why document every command you run?** | For reproducibility — another investigator should be able to repeat the steps and reach the same result. |
| **Q5. What is the correct order for host acquisition?** | Secure → preserve → volatile evidence → storage → analysis → correlation → timeline → report. |

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **Forensics** | Systematic investigation to Collect + Preserve + Examine + Analyze evidence. |
| **Digital forensics** | Forensics of digital devices/data; evidence must be preserved (work on copies/images). |
| **Cyber crime** | Any criminal activity on or using a digital device. |
| **NIST methodology** | `Collection → Examination → Analysis → Reporting` (`C → E → A → R`). |
| **Examination vs Analysis** | Examination extracts/filters relevant data; Analysis correlates it to conclude. |
| **Types** | Computer, mobile, network, database, cloud, email, disk, memory, malware forensics. |
| **Acquisition** | Needs authorization/warrant; recorded in the **chain of custody**. |
| **Chain of custody** | Description, individuals, date/time, storage location, access times. |
| **Write blocker** | Prevents writes to a device while allowing read/acquire — protects integrity. |
| **Volatility** | Collect most volatile first: CPU/registers → RAM → network → temp → disk → archival. |
| **Forensic image** | Bit-for-bit acquisition; verified with hashing (MD5, SHA-1, SHA-256, SHA-512). |
| **Tools** | FTK Imager (acquire), Autopsy (analyse), DumpIt (RAM capture), Volatility (memory analysis). |
| **CLI tooling** | `file`, `pdfinfo`, `exiftool`, `sha256sum`, `strings`, `grep`, `which`, `command -v`. |
| **Lab findings** | `ransom-letter.pdf` author `Ann Gree Shepherd`; image camera `Canon EOS R6`. |
| **Golden rule** | Metadata is a lead, not proof — always corroborate; never modify the original. |

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is digital forensics?** | Collecting, preserving, examining and analyzing digital evidence from devices to investigate incidents or crimes. |
| **Q2. What are the four NIST phases?** | Collection, Examination, Analysis, Reporting. |
| **Q3. Difference between Examination and Analysis?** | Examination extracts/filters the relevant data; Analysis correlates and interprets it to draw conclusions. |
| **Q4. What is a chain of custody and what does it record?** | The document tracking evidence handling — description, individuals, date/time, storage location and access times. |
| **Q5. What is a write blocker and why use one?** | A tool that prevents writes to a storage device while allowing reads, preserving the integrity of the original evidence. |
| **Q6. What is the order of volatility?** | Collect the most volatile data first: CPU/registers → RAM → network state → temporary data → disk → archival/remote data. |
| **Q7. What is a forensic image and how is integrity verified?** | A bit-for-bit acquisition of media, verified with cryptographic hashes (e.g. SHA-256). |
| **Q8. Name key forensic tools and their roles.** | FTK Imager (acquisition/preview), Autopsy (analysis), DumpIt (RAM acquisition), Volatility (memory analysis). |
| **Q9. Which CLI tools investigate files, and what do they do?** | `file` (type), `pdfinfo` (PDF info), `exiftool` (metadata), `sha256sum` (hash), `strings` (readable text), `grep` (search). |
| **Q10. Can metadata be trusted as proof?** | No — it can be forged or modified, so it is an investigative lead requiring corroboration. |

## Final Takeaway

**Digital forensics** is the systematic investigation of **digital evidence** from devices involved in **cyber crime** — its purpose is not just to find data but to securely **identify, preserve, examine and analyse** it so findings hold up in an investigation or in court. The **NIST** methodology anchors the whole process (`Collection → Examination → Analysis → Reporting`), where **Examination** extracts the relevant data and **Analysis** correlates it into a timeline and conclusion. Evidence must be acquired **legally** (authorization, **search warrant**) and defensibly, tracked in the **chain of custody**, protected with a **write blocker**, and verified with cryptographic **hashing**. Investigators respect the **order of volatility** (RAM before disk), use **FTK Imager** and **Autopsy** for disk work and **DumpIt** with **Volatility** for memory, and reach for command-line tools — `file`, `pdfinfo`, `exiftool`, `sha256sum`, `strings`, `grep`, `which` — to triage individual files. The room's practical case proves the mindset: `pdfinfo ransom-letter.pdf` surfaces author **Ann Gree Shepherd** and `exiftool` reveals a **Canon EOS R6** camera — but the recurring lesson is that **metadata is a lead, not proof**, and the original evidence must never be altered.
