| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | OWASP Top 10 2025 / Bonus Revision |
| **Difficulty** | Beginner |
| **Time** | ~15 Minutes |
| **Module** | OWASP Top 10 (2025) |

---

## Objective

This Mystery Chest is a **bonus revision vault** for the entire OWASP Top 10 (2025) module. It consolidates the most important reference material from every room — IAAA Failures, Application Design Flaws, and Insecure Data Handling — into one quick-reference place.

Use it as a lookup before a lab, an exam, or an interview. Everything here was covered across the module: the **IAAA-based access & identity failures** (A01, A07, A09), the **design and configuration flaws** (A02, A03, A04, A06), and the **unsafe data handling** categories (A04, A05, A08). The common thread is the same across all of them — *never trust input, enforce controls server-side, and verify what you accept*.

> **Analyst mindset:** almost every OWASP category reduces to one of two failures — trusting something you should verify, or failing to enforce a control you assumed was there.

---

## OWASP 2025 Categories at a Glance

| Category | Failure | Covered in |
|---|---|---|
| **A01** | Broken Access Control (IDOR) | IAAA Failures |
| **A02** | Security Misconfigurations | Application Design Flaws |
| **A03** | Software Supply Chain Failures | Application Design Flaws |
| **A04** | Cryptographic Failures | Design Flaws + Data Handling |
| **A05** | Injection | Insecure Data Handling |
| **A06** | Insecure Design | Application Design Flaws |
| **A07** | Authentication Failures | IAAA Failures |
| **A08** | Software / Data Integrity Failures | Insecure Data Handling |
| **A09** | Logging & Alerting Failures | IAAA Failures |

> **Security relevance:** access/identity failures (A01/A07/A09) map onto the **IAAA** model; design failures (A02/A03/A06) are built in before code; data-handling failures (A04/A05/A08) come from trusting untrusted content.

---

## IAAA Failures Quick Reference

| Concept | Key fact |
|--------|----------|
| **IAAA** | Identification → Authentication → Authorisation → Accountability (sequential) |
| **A01** | Broken Access Control — #1 risk; IDOR is the classic case |
| **IDOR** | Manipulate an object reference the server doesn't verify ownership of |
| **Escalation** | Horizontal (same-level, another user) vs Vertical (higher privilege) |
| **A07** | Authentication Failures — weak passwords, brute force, session handling |
| **A09** | Logging & Alerting Failures — attacks undetected without logs |

> **Mapping:** A07↔Authentication, A01↔Authorisation, A09↔Accountability.

---

## Application Design Flaws Quick Reference

| Concept | Key fact |
|--------|----------|
| **A02** | Security Misconfigurations — defaults, verbose errors, exposed cloud storage |
| **A03** | Software Supply Chain Failures — risky libraries, APIs, AI models |
| **A04** | Cryptographic Failures — weak encryption, hardcoded keys |
| **A06** | Insecure Design — security missing from the architecture; AI risks |
| **Prompt Injection** | Attacker input manipulates an LLM's instructions (design-level flaw) |

> **Security relevance:** you cannot patch an insecure design or an inherited supply-chain risk — build security in and verify dependencies.

---

## Insecure Data Handling Quick Reference

| Concept | Key fact |
|--------|----------|
| **A04** | Cryptographic Failures — encrypt in transit/at rest, manage keys |
| **A05** | Injection — untrusted input treated as code/query |
| **Injection types** | SQL, Command, AI Prompt, Server-Side Template (SSTI) |
| **SQLi fix** | Prepared statements + parameterized queries |
| **A08** | Software/Data Integrity Failures — accept only verified content |
| **Deserialization** | Deserializing untrusted data can lead to code execution |

> **Security relevance:** injection is one idea in many forms — keep **data as data**; verify **integrity and authenticity** before accepting software or data.

---

## Challenge Flags

| Room / Category | Flag |
|---|---|
| **A01 — Broken Access Control** | `THM{Found.the.Millionaire!}` |
| **A07 — Authentication Failures** | `THM{Account.confusion.FTW!}` |
| **A02 — Security Misconfigurations** | `THM{V3RB0S3_3RR0R_L34K}` |
| **A03 — Software Supply Chain Failures** | `THM{SUPPLY_CH41N_VULN3R4B1L1TY}` |
| **A04 — Cryptographic Failures (Design)** | `THM{CRYPTO_FAILURE_H4RDC0D3D_K3Y}` |
| **A06 — Insecure Design** | `THM{1NS3CUR3_D3S1GN_4SSUMPT1ON}` |
| **A04 — Cryptographic Failures (Data)** | `THM{WEAK_CRYPTO_FLAG}` |
| **A05 — Injection (SSTI)** | `THM{SSTI_FLAG_OBTAINED}` |

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **IAAA** | Identification, Authentication, Authorisation, Accountability. |
| **A01 / IDOR** | Enforce access control server-side; IDOR = unchecked object reference. |
| **A07** | Strong passwords, MFA, rate limiting, secure sessions. |
| **A09** | Log security events; alert on suspicious patterns. |
| **A02** | Harden config, disable defaults, hide verbose errors, lock down storage. |
| **A03** | Verify and monitor third-party components. |
| **A04** | Strong current crypto; never hardcode keys. |
| **A05** | Parameterize queries; validate input; keep data as data. |
| **A06** | Design security in; beware prompt injection. |
| **A08** | Verify integrity (signatures/checksums); avoid untrusted deserialization. |

**Key idea:** the OWASP Top 10 (2025) is a checklist of the same two mistakes repeated — **failing to enforce a control** (access, authentication, logging, configuration) and **trusting something unverified** (input, dependencies, serialized data, keys). Enforce server-side, verify everything you accept, and design security in from the start.

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What does IAAA stand for and which OWASP categories map to it?** | Identification, Authentication, Authorisation, Accountability — A07↔Authentication, A01↔Authorisation, A09↔Accountability. |
| **Q2. What is the #1 OWASP risk and its classic example?** | A01 Broken Access Control; the classic example is IDOR. |
| **Q3. Name three OWASP "design/configuration" categories.** | A02 Security Misconfigurations, A03 Software Supply Chain Failures, and A06 Insecure Design (A04 Cryptographic Failures also applies). |
| **Q4. What are the main forms of injection (A05)?** | SQL, command, AI prompt, and server-side template injection (SSTI). |
| **Q5. What is the difference between integrity and authenticity (A08)?** | Integrity means data has not been altered; authenticity means it genuinely comes from the claimed source. |
| **Q6. What single principle prevents most injection?** | Keep data as data — use parameterized queries/safe APIs and validate untrusted input. |

## Final Takeaway

The Mystery Chest is your one-page memory aid for the **OWASP Top 10 (2025) module**. Skim it before any lab, exam, or interview: the **access & identity** failures map onto **IAAA** — **A01 Broken Access Control** (IDOR; horizontal vs vertical escalation), **A07 Authentication Failures** (weak passwords, brute force, sessions), and **A09 Logging & Alerting Failures** (no logs, no detection). The **design & configuration** failures are built in before a single request — **A02 Security Misconfigurations** (defaults, verbose errors, open storage), **A03 Software Supply Chain Failures** (inherited third-party risk), **A04 Cryptographic Failures** (weak crypto, hardcoded keys), and **A06 Insecure Design** (including **prompt injection**). The **data-handling** failures come from trusting untrusted content — **A05 Injection** in its SQL/command/prompt/SSTI forms (fix: keep **data as data** with parameterized queries) and **A08 Software or Data Integrity Failures** (verify **integrity and authenticity**; avoid **insecure deserialization**). Eight practical flags — from **`THM{Found.the.Millionaire!}`** to **`THM{SSTI_FLAG_OBTAINED}`** — prove each concept hands-on. The unifying lesson: **enforce controls server-side and verify everything you accept.**

---
*Bonus revision room authored for the Cyber Security 101 OWASP Top 10 (2025) module — consolidating the IAAA Failures, Application Design Flaws and Insecure Data Handling rooms.*
