| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | OWASP Top 10 2025 / Data Handling |
| **Difficulty** | Easy |
| **Time** | ~50 Minutes |
| **Module** | OWASP Top 10 (2025) |

---

## Objective

When applications handle data unsafely — trusting input, mishandling secrets, or accepting untrusted content — attackers can read, alter or execute things they should not. This room covers three OWASP Top 10 (2025) categories: **A04: Cryptographic Failures**, **A05: Injection** (SQL, command, prompt, and template injection), and **A08: Software or Data Integrity Failures** (including insecure deserialization).

By the end of this room you will be able to:

- Explain **A04: Cryptographic Failures** from an offensive and defensive view
- Explain **A05: Injection** — how untrusted input becomes code — across **SQL, command, prompt (AI)** and **template (SSTI)** injection
- Apply general **injection defences** — validation, prepared statements, least privilege
- Explain **A08: Software or Data Integrity Failures**, the difference between **integrity and authenticity**, and **insecure deserialization**
- Understand **CI/CD integrity** and how to verify software and data have not been tampered with

> **Analyst mindset:** injection is one idea in many forms — *untrusted input is treated as trusted code or instruction*. The fix is always the same shape: keep data as data.

---

## A04: Cryptographic Failures

**Cryptographic Failures** are the unsafe handling of sensitive data: weak or missing encryption, outdated algorithms, and poor key management.

- **Offensive mindset:** look for plaintext secrets, weak/old algorithms, and predictable or exposed keys to recover protected data.
- **Defensive mindset:** encrypt data in transit and at rest with strong current algorithms, manage keys securely, and store passwords with salted, slow hashes.

> **A04 practical flag:** `THM{WEAK_CRYPTO_FLAG}`

---

## A05: Injection

**Injection** occurs when user input is treated as part of a command or query instead of ordinary data. It is dangerous because it can let an attacker read, modify or destroy data, or execute commands.

```text
┌──────────────────────────────────────┐
│          INJECTION TYPES             │
├──────────────────────────────────────┤
│                                      │
│  SQL Injection                       │
│  Command Injection                   │
│  AI Prompt Injection                 │
│  Server-Side Template Injection      │
│                                      │
└──────────────────────────────────────┘
```

### SQL Injection

SQL Injection occurs when user input is incorporated into a database query unsafely. A vulnerable application constructs a query by concatenating input directly:

```sql
SELECT * FROM users
WHERE username = '<USER_INPUT>';
```

When input becomes part of the SQL **syntax** rather than remaining ordinary **data**, the attacker can alter the query's meaning. *(The room presents this conceptually with the vulnerable query template above; it does not print a specific injection payload.)*

### The forms of injection

> **1. SQL Injection**
> User input alters a database query.

> **2. Command Injection**
> User-controlled input is passed into an operating-system command, letting an attacker influence what the OS executes.

> **3. AI Prompt Injection**
> Attacker input manipulates an LLM's instructions, causing it to ignore guardrails or take unintended actions.

> **4. Server-Side Template Injection (SSTI)**
> Untrusted input is evaluated by a server-side template engine, which can lead to data disclosure or code execution.

The SSTI rendering pipeline — untrusted input reaches the template engine:

```text
User Input
    │
    ▼
Web Application
    │
    ▼
Template Engine
    │
    ▼
Rendered Output
```

### Preventing injection

The room's recommended fix for SQL injection is **prepared statements + parameterized queries** instead of string concatenation, so the database treats the parameter as **data**, not executable syntax. Untrusted input should be forced down the "treat as data" path before it ever reaches an interpreter:

```text
                    USER INPUT
                        │
                        ▼
                 ┌──────────────┐
                 │   TRUST?     │
                 └──────┬───────┘
                        │
                        ▼
                Treat as DATA
                        │
                        ▼
              Safe API / Interface
                        │
                        ▼
                 Interpreter
```

The general injection defence checklist:

`Validate & sanitise input → Use parameterized queries / safe APIs → Apply least privilege → Encode output → Never trust user input`

> **A05 practical flag:** `THM{SSTI_FLAG_OBTAINED}`

---

## A08: Software or Data Integrity Failures

**Software or Data Integrity Failures** occur when software or data is accepted without verifying it has not been tampered with.

**Integrity vs authenticity:** *integrity* means the data has not been altered; *authenticity* means it genuinely comes from who it claims to. Both are needed — verified-unaltered data from an untrusted source is still a risk.

```text
                DATA
                  │
        ┌─────────┴─────────┐
        │                   │
   Integrity             Authenticity
        │                   │
   Not modified       Trusted source
```

### Insecure Deserialization

**Insecure Deserialization** happens when an application deserializes untrusted data without validation. Because serialized objects can carry instructions/state, a crafted payload can lead to tampering or code execution.

```text
Attacker-Controlled Data
          │
          ▼
      Application
          │
          ▼
     Deserialize
          │
          ▼
 Potentially Dangerous Behaviour
```

> **Prevention:** verify integrity with **digital signatures / checksums**, avoid deserializing untrusted data (or use safe formats), secure the **CI/CD pipeline** so builds and dependencies are verified, and use integrity verification for updates.

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **A04** | Cryptographic Failures — weak/absent encryption, poor key management. |
| **A05** | Injection — untrusted input treated as code/query. |
| **Injection types** | SQL, Command, AI Prompt, Server-Side Template (SSTI). |
| **SQLi fix** | Prepared statements + parameterized queries (data, not syntax). |
| **Injection defence** | Validate input, parameterize, least privilege, encode output. |
| **A08** | Software/Data Integrity Failures — accepting untampered-unverified content. |
| **Integrity vs authenticity** | Not altered vs genuinely from the claimed source. |
| **Insecure deserialization** | Deserializing untrusted data can lead to code execution. |
| **A08 fix** | Signatures/checksums, secure CI/CD, avoid untrusted deserialization. |

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What causes SQL injection?** | Incorporating user input into a database query unsafely (e.g. string concatenation), so input becomes part of the SQL syntax rather than data. |
| **Q2. What is the recommended fix for SQL injection?** | Prepared statements and parameterized queries, so the database treats input as data rather than executable syntax. |
| **Q3. Name the forms of injection covered.** | SQL injection, command injection, AI prompt injection, and server-side template injection (SSTI). |
| **Q4. What is the difference between integrity and authenticity?** | Integrity means data has not been altered; authenticity means it genuinely comes from the claimed source. |
| **Q5. What is insecure deserialization?** | Deserializing untrusted data without validation, which can lead to tampering or code execution. |
| **Q6. How do you defend against A08 integrity failures?** | Verify integrity with signatures/checksums, secure the CI/CD pipeline, and avoid deserializing untrusted data. |

## TryHackMe Task Answers

| Question | Answer |
|---|---|
| **A04 (Cryptographic Failures) practical flag** | `THM{WEAK_CRYPTO_FLAG}` |
| **A05 (Injection / SSTI) practical flag** | `THM{SSTI_FLAG_OBTAINED}` |

## Final Takeaway

This room is about **handling data safely**. **A04: Cryptographic Failures** — weak or absent encryption and poor key management — are defended by encrypting in transit and at rest with strong algorithms and secure keys (flag **`THM{WEAK_CRYPTO_FLAG}`**). **A05: Injection** is one idea in many forms — **SQL, command, AI prompt, and server-side template (SSTI)** injection — all caused by treating **untrusted input as trusted code**; the room's SQL example shows the vulnerable `SELECT * FROM users WHERE username = '<USER_INPUT>';` template and prescribes **prepared statements and parameterized queries** so input stays data, not syntax (flag **`THM{SSTI_FLAG_OBTAINED}`**). **A08: Software or Data Integrity Failures** — including **insecure deserialization** — come from accepting software or data without verifying it is unaltered; distinguish **integrity** (not altered) from **authenticity** (genuinely from the source), and defend with **signatures/checksums, secure CI/CD, and avoiding untrusted deserialization**. The recurring rule across all three: **never trust input, and always verify what you accept.**

---
*Room notes authored for the Cyber Security 101 OWASP Top 10 (2025) module — Insecure Data Handling.*
