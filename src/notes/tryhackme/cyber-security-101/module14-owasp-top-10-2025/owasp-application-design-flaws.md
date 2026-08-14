| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | OWASP Top 10 2025 / Secure Design |
| **Difficulty** | Easy |
| **Time** | ~50 Minutes |
| **Module** | OWASP Top 10 (2025) |

---

## Objective

Some vulnerabilities are not single bugs but **design and configuration flaws** baked into how an application is built and deployed. This room covers four OWASP Top 10 (2025) categories: **A02: Security Misconfigurations**, **A03: Software Supply Chain Failures**, **A04: Cryptographic Failures**, and **A06: Insecure Design** (including AI-era **prompt injection**).

By the end of this room you will be able to:

- Explain **A02: Security Misconfigurations** — default settings, verbose errors, exposed cloud storage — and how to prevent them
- Explain **A03: Software Supply Chain Failures** — risky third-party libraries, APIs and AI models — and how to verify components
- Explain **A04: Cryptographic Failures** — weak/absent encryption, hardcoded keys — and secure practice
- Explain **A06: Insecure Design** — flaws designed in from the start, including AI risks and **prompt injection**

> **Analyst mindset:** these are *design and deployment* problems. You cannot patch your way out of an insecure design — security has to be built in and configured correctly from the start.

---

## A02: Security Misconfigurations

A **Security Misconfiguration** is a weakness introduced by how a system is set up rather than a code bug. Common patterns:

> **1. Default Settings**
> Default accounts, passwords, or sample content left enabled.

> **2. Verbose Errors**
> Detailed error messages leaking stack traces, versions, or internal paths to attackers.

> **3. Exposed Cloud Storage**
> Misconfigured cloud buckets/storage left publicly readable.

> **4. Unnecessary Features**
> Unused services, ports, or debug features left on, expanding the attack surface.

> **Prevention:** harden configurations, disable defaults and unused features, suppress verbose errors in production, and review cloud storage permissions. An attacker's first move is often to read a leaked error message or find an open bucket.

---

## A03: Software Supply Chain Failures

**Software Supply Chain Failures** arise from the external components an application depends on:

| Component | Risk |
|---|---|
| **Third-party libraries** | Known vulnerabilities or malicious/compromised packages |
| **Third-party APIs** | Trusting external services that may be insecure or breached |
| **Third-party AI models** | Using models without monitoring their behaviour or provenance |

Every dependency your application pulls in becomes part of its attack surface:

```text
                    YOUR APPLICATION
                           │
          ┌────────────────┼────────────────┐
          │                │                │
          ▼                ▼                ▼
      Libraries          APIs          AI Models
          │                │                │
          ▼                ▼                ▼
     Dependencies      Services       Third Party
          │
          ▼
     Package Manager
          │
          ▼
      Build System
          │
          ▼
       CI/CD
          │
          ▼
      Production
```

> **Prevention — verify third-party components:** track dependencies, check for known vulnerabilities, use trusted sources, pin/verify versions, and monitor for compromise. You inherit the security of everything you depend on.

---

## A04: Cryptographic Failures

**Cryptographic Failures** occur when sensitive data is not properly protected — weak or missing encryption, outdated algorithms, or **hardcoded keys** left in source code.

> **Common failures:** transmitting/storing sensitive data in plaintext, using broken algorithms (e.g. MD5/SHA-1 for security), poor key management, and embedding secrets directly in code.

The categories of cryptographic weakness an attacker looks for:

```text
Weak Algorithms
       │
       ├── MD5?
       ├── SHA-1?
       └── ECB?
Hard-coded Secrets
       │
       ├── Source Code
       ├── Config Files
       └── Environment Exposure
Poor Key Management
       │
       ├── No Rotation
       ├── Exposed Keys
       └── Weak Storage
Transport Security
       │
       ├── HTTP?
       ├── Invalid TLS?
       └── Bad Certificate Validation?
Sensitive Data
       │
       ├── Stored Unencrypted?
       └── Transmitted Unencrypted?
```

> **Secure practice:** use strong, current algorithms; encrypt data in transit and at rest; manage keys securely (never hardcode them); and store passwords with salted, slow hashes.

---

## A06: Insecure Design

**Insecure Design** is a flaw built into the architecture from the start — the system was designed without the right security requirements, so no amount of clean coding fixes it. In the **AI era**, insecure design increasingly includes trusting AI/LLM components unsafely.

### Prompt Injection

**Prompt Injection** is an AI-era design flaw where attacker-controlled input manipulates an LLM's instructions — causing it to ignore its guardrails, leak data, or take unintended actions. It is a design problem: the system trusts untrusted input as if it were trusted instruction.

> **Secure design requirements:** define security requirements up front, apply threat modelling, validate and constrain untrusted input (including to AI components), and default to safe behaviour.

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **A02** | Security Misconfigurations — defaults, verbose errors, exposed cloud storage. |
| **A02 fix** | Harden config, disable defaults/unused features, hide errors, lock down storage. |
| **A03** | Software Supply Chain Failures — risky libraries, APIs, AI models. |
| **A03 fix** | Verify and monitor third-party components; you inherit their risk. |
| **A04** | Cryptographic Failures — weak/absent encryption, hardcoded keys. |
| **A04 fix** | Strong current algorithms, encrypt in transit/at rest, secure key management. |
| **A06** | Insecure Design — security missing from the architecture; includes AI risks. |
| **Prompt Injection** | Attacker input manipulates an LLM's instructions — a design-level flaw. |

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is a security misconfiguration (A02)?** | A weakness caused by how a system is set up — default settings, verbose errors, exposed cloud storage, or unnecessary enabled features. |
| **Q2. What are software supply chain failures (A03)?** | Risks introduced by external dependencies — vulnerable/malicious third-party libraries, insecure third-party APIs, or unmonitored third-party AI models. |
| **Q3. Give examples of cryptographic failures (A04).** | Missing or weak encryption, outdated algorithms, poor key management, and hardcoded keys/secrets in source code. |
| **Q4. What is insecure design (A06)?** | A flaw built into the architecture because security requirements were not considered from the start — it cannot be fixed by clean coding alone. |
| **Q5. What is prompt injection?** | An AI-era attack where attacker-controlled input manipulates an LLM's instructions, causing it to bypass guardrails or take unintended actions. |

## TryHackMe Task Answers

| Question | Answer |
|---|---|
| **A02 (Security Misconfigurations) challenge flag** | `THM{V3RB0S3_3RR0R_L34K}` |
| **A03 (Software Supply Chain Failures) challenge flag** | `THM{SUPPLY_CH41N_VULN3R4B1L1TY}` |
| **A04 (Cryptographic Failures) challenge flag** | `THM{CRYPTO_FAILURE_H4RDC0D3D_K3Y}` |
| **A06 (Insecure Design) challenge flag** | `THM{1NS3CUR3_D3S1GN_4SSUMPT1ON}` |

## Final Takeaway

This room covers the **design and deployment** failures of the OWASP Top 10 (2025). **A02: Security Misconfigurations** come from defaults, **verbose errors** and **exposed cloud storage** — the challenge flag **`THM{V3RB0S3_3RR0R_L34K}`** captures exactly how a leaked error hands an attacker information. **A03: Software Supply Chain Failures** mean you inherit the risk of every third-party **library, API and AI model** you depend on (flag **`THM{SUPPLY_CH41N_VULN3R4B1L1TY}`**), so components must be verified and monitored. **A04: Cryptographic Failures** — weak/absent encryption and **hardcoded keys** — are fixed with strong current algorithms, encryption in transit and at rest, and proper key management (flag **`THM{CRYPTO_FAILURE_H4RDC0D3D_K3Y}`**). And **A06: Insecure Design** is a flaw baked into the architecture — increasingly including AI risks like **prompt injection** — that no clean coding can patch (flag **`THM{1NS3CUR3_D3S1GN_4SSUMPT1ON}`**). The lesson: **build security in and configure it correctly** — you cannot bolt it on afterwards.

---
*Room notes authored for the Cyber Security 101 OWASP Top 10 (2025) module — Application Design Flaws.*
