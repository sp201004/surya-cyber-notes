| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | OWASP Top 10 2025 / Access & Identity |
| **Difficulty** | Easy |
| **Time** | ~45 Minutes |
| **Module** | OWASP Top 10 (2025) |

---

## Objective

Many of the most damaging web vulnerabilities come down to failures in **who you are** and **what you are allowed to do**. This room frames three OWASP Top 10 (2025) categories through the **IAAA** model — **Identification, Authentication, Authorisation, Accountability** — covering **A01: Broken Access Control** (including IDOR), **A07: Authentication Failures**, and **A09: Logging & Alerting Failures**.

By the end of this room you will be able to:

- Explain the **IAAA** model and why its four stages are **sequential**
- Describe **A01: Broken Access Control** and **IDOR**, and distinguish **horizontal** from **vertical** privilege escalation
- Describe **A07: Authentication Failures** — weak/guessable passwords, brute force, and session/cookie handling
- Describe **A09: Logging & Alerting Failures** and why missing logs let attacks go undetected
- Connect A01, A07 and A09 back to the IAAA stage each one breaks

> **Analyst mindset:** IAAA is a chain — Identification says *who you claim to be*, Authentication *proves it*, Authorisation *decides what you can do*, and Accountability *records what you did*. A failure at any stage undermines the ones after it.

---

## The IAAA Model

**IAAA** is the sequence every access decision follows:

> **1. Identification**
> The user claims an identity (e.g. enters a username). No proof yet — just a claim.

> **2. Authentication**
> The system verifies the claim (password, MFA, key). This proves the identity is genuine.

> **3. Authorisation**
> The system decides what the authenticated identity is allowed to access or do.

> **4. Accountability**
> The system records actions (logging) so activity can be traced back to an identity.

The stages are **sequential**: `Identification → Authentication → Authorisation → Accountability`. If authentication is weak, authorisation decisions are built on a false identity; if accountability is missing, you cannot detect or investigate the failure.

```text
                 USER
                   │
                   ▼
        ┌────────────────────┐
        │      IDENTITY      │
        │    "Who are you?"  │
        └─────────┬──────────┘
                  │
                  ▼
        ┌────────────────────┐
        │   AUTHENTICATION   │
        │   "Prove it."      │
        └─────────┬──────────┘
                  │
                  ▼
        ┌────────────────────┐
        │   AUTHORISATION    │
        │ "What can you do?" │
        └─────────┬──────────┘
                  │
                  ▼
        ┌────────────────────┐
        │   ACCOUNTABILITY   │
        │ "What happened?"   │
        └────────────────────┘
```

| Stage | Question it answers | OWASP failure |
|---|---|---|
| **Identification** | Who do you claim to be? | — |
| **Authentication** | Can you prove it? | A07 Authentication Failures |
| **Authorisation** | What are you allowed to do? | A01 Broken Access Control |
| **Accountability** | What did you do? | A09 Logging & Alerting Failures |

---

## A01: Broken Access Control

**Broken Access Control** is the #1 OWASP risk: the application fails to properly enforce what an authenticated user is allowed to access. The classic example is **IDOR (Insecure Direct Object Reference)** — the app exposes a reference (like a numeric ID in a URL) and does not check that the requesting user owns that object.

`Request /account?id=1001 → change to id=1002 → view another user's data` — because the server trusts the ID without an ownership check.

The access decision should hinge on an ownership/permission check the vulnerable app skips:

```text
Current User
     │
     ▼
Requested Object
     │
     ▼
Ownership / Permission Check
     │
     ├──  No permission → Reject
     │
     └──  Permission → Allow
```

The full IDOR attack path:

```text
┌───────────────────────────────────────────┐
│              IDOR ATTACK                  │
├───────────────────────────────────────────┤
│                                           │
│  1. Authenticate as normal user           │
│                    ↓                      │
│  2. Identify object ID                    │
│                    ↓                      │
│  3. Modify object ID                      │
│                    ↓                      │
│  4. Send request                          │
│                    ↓                      │
│  5. Server fails authorization check      │
│                    ↓                      │
│  6. Another user's resource is returned   │
│                    ↓                      │
│  7. Broken Access Control                 │
│                                           │
└───────────────────────────────────────────┘
```

### Privilege escalation types

| Type | Meaning |
|---|---|
| **Horizontal** | Accessing another user's data at the **same** privilege level (e.g. viewing another customer's account) |
| **Vertical** | Gaining a **higher** privilege level (e.g. a normal user acting as admin) |

> **IDOR is not limited to numeric IDs** — usernames, UUIDs, filenames and other references can all be manipulated if ownership is not verified server-side.

> **Fix:** enforce access control **server-side** on every request, deny by default, and never rely on hiding the reference.

---

## A07: Authentication Failures

**Authentication Failures** occur when the mechanism that proves identity is weak or mishandled:

> **1. Weak / Guessable Passwords**
> Short, common or default passwords are easily guessed or cracked.

> **2. Brute Force**
> Automated guessing of credentials when there is no rate limiting or lockout.

> **3. Session & Cookie Handling**
> Poor session management — predictable tokens, no expiry, or missing **session binding** — lets attackers hijack sessions.

> **Defences:** strong password policies, **MFA**, rate limiting / account lockout against brute force, secure session tokens with proper expiry and binding.

---

## A09: Logging & Alerting Failures

**Logging & Alerting Failures** mean attacks are not recorded or not noticed. Without logs (the **Accountability** stage), a brute-force attempt, an IDOR abuse, or a breach can proceed undetected and cannot be investigated afterwards.

`Attack occurs → no logging → no alert → no detection → no response`

> **Fix:** log security-relevant events (logins, access-control failures, high-value actions), monitor and alert on suspicious patterns, and protect logs from tampering.

---

## A01 + A07 + A09 Together

The three categories map cleanly onto IAAA: **A07** breaks **Authentication**, **A01** breaks **Authorisation**, and **A09** breaks **Accountability**. An attacker who defeats authentication (A07) can then abuse access control (A01), and missing logging (A09) means nobody notices.

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **IAAA** | Identification → Authentication → Authorisation → Accountability (sequential). |
| **A01** | Broken Access Control — #1 risk; IDOR is the classic case. |
| **IDOR** | Manipulate an object reference the server doesn't check ownership of. |
| **Horizontal vs Vertical** | Same-level (another user) vs higher-level (admin) escalation. |
| **A07** | Authentication Failures — weak passwords, brute force, session handling. |
| **A07 defences** | Strong passwords, MFA, rate limiting/lockout, secure sessions. |
| **A09** | Logging & Alerting Failures — attacks go undetected without logs. |
| **Mapping** | A07↔Authentication, A01↔Authorisation, A09↔Accountability. |

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What does IAAA stand for?** | Identification, Authentication, Authorisation, and Accountability. |
| **Q2. What is Broken Access Control (A01)?** | When an application fails to properly enforce what an authenticated user is allowed to access — the #1 OWASP risk. |
| **Q3. What is IDOR?** | Insecure Direct Object Reference — manipulating an exposed object reference (e.g. an ID) that the server does not verify the requester owns. |
| **Q4. What is the difference between horizontal and vertical privilege escalation?** | Horizontal accesses another user's data at the same privilege level; vertical gains a higher privilege level. |
| **Q5. Name three causes of authentication failures (A07).** | Weak/guessable passwords, brute-force attacks (no rate limiting), and poor session/cookie handling. |
| **Q6. Why do logging and alerting failures (A09) matter?** | Without logging and alerting, attacks go undetected and cannot be investigated after the fact. |

## TryHackMe Task Answers

| Question | Answer |
|---|---|
| **What does IAAA stand for?** | Identification, Authentication, Authorisation, Accountability |
| **If you can't get more roles but can view another user's data, what type of privilege escalation is this?** | Horizontal |
| **A01 (Broken Access Control) challenge flag** | `THM{Found.the.Millionaire!}` |
| **A07 (Authentication Failures) challenge flag** | `THM{Account.confusion.FTW!}` |

## Final Takeaway

This room ties three OWASP Top 10 (2025) categories to the **IAAA** model — **Identification, Authentication, Authorisation, Accountability** — a **sequential** chain where a failure early on undermines everything after. **A01: Broken Access Control** (the #1 risk) is exemplified by **IDOR**, where a server trusts a manipulable object reference without checking ownership; abusing it to read a peer's data is **horizontal** privilege escalation (the room's flag: **`THM{Found.the.Millionaire!}`**), while gaining admin is **vertical**. **A07: Authentication Failures** stem from weak passwords, unthrottled **brute force**, and poor **session/cookie handling**, and are defended with strong policies, **MFA**, rate limiting and secure sessions (flag: **`THM{Account.confusion.FTW!}`**). **A09: Logging & Alerting Failures** break **Accountability** — without logs and alerts, attacks go undetected and uninvestigable. The through-line: **A07↔Authentication, A01↔Authorisation, A09↔Accountability** — enforce every stage server-side, and record what happens.

---
*Room notes authored for the Cyber Security 101 OWASP Top 10 (2025) module — IAAA Failures.*
