| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Build Your Cyber Security Career / Foundations |
| **Difficulty** | Easy |
| **Time** | ~45 Minutes |
| **Module** | Build Your Cyber Security Career |

---

## Objective

**Security principles** are the foundational ideas that every cyber security decision rests on. This room builds them from the ground up: the **CIA Triad** (the three goals of security) and its attacker-mirror the **DAD Triad**, the classic **security models** (Bell-LaPadula, Biba, Clark-Wilson) that formalise how access should work, **Defence-in-Depth** and the **ISO/IEC 19249** architectural principles, and finally the modern ideas of **Zero Trust** and the **Threat vs Risk vs Vulnerability** distinction.

By the end of this room you will be able to:

- Explain the **CIA Triad** — Confidentiality, Integrity, Availability — and how they balance
- Describe the **DAD Triad** (Disclosure, Alteration, Destruction) and map it to CIA
- Compare the three security models — **Bell-LaPadula** (confidentiality), **Biba** (integrity), **Clark-Wilson** (integrity via well-formed transactions)
- State the model rules: **No Read Up / No Write Down** (Bell-LaPadula) and **No Read Down / No Write Up** (Biba)
- Explain **Defence-in-Depth** and the ISO/IEC 19249 architectural principles (domain separation, layering, encapsulation, redundancy, virtualization)
- Distinguish **Threat**, **Risk** and **Vulnerability**, and explain **Zero Trust** ("never trust, always verify")

> **Core idea:** security is about protecting information and systems while keeping them usable — every principle is a way to prevent unauthorised **disclosure, alteration or destruction** without breaking legitimate access.

---

## The CIA Triad

The **CIA Triad** is the foundation of information security — three goals every control serves.

| Goal | Protects against | Question it answers |
|---|---|---|
| **Confidentiality** | Unauthorised disclosure | *Who can SEE the data?* |
| **Integrity** | Unauthorised modification | *Has the data been ALTERED?* |
| **Availability** | Loss of access | *Is the system ACCESSIBLE when needed?* |

- **Confidentiality** — keep information secret from those not authorised (mechanisms: encryption, access control, authentication, MFA).
- **Integrity** — ensure data is not altered without authorisation (mechanisms: hashing, digital signatures, checksums, version control).
- **Availability** — ensure systems and data are accessible to legitimate users when required (mechanisms: redundancy, backups, failover, DDoS protection).

> **CIA is a balance:** maximising one can hurt another — extreme confidentiality (locking data away) can reduce availability. Security design is about the right trade-off for the context.

---

## The DAD Triad

The **DAD Triad** is the attacker's mirror of CIA — the three ways security fails:

`Confidentiality ↔ Disclosure` · `Integrity ↔ Alteration` · `Availability ↔ Destruction`

| DAD | Attacks the CIA goal | Meaning |
|---|---|---|
| **Disclosure** | Confidentiality | Information is exposed to unauthorised parties |
| **Alteration** | Integrity | Data is modified without authorisation |
| **Destruction** | Availability | Systems/data are made unavailable |

> **Memory trick:** CIA is what defenders protect; DAD is what attackers cause. Each D directly breaks its matching CIA goal.

---

## Security Models

Security models formalise how access should be controlled. The three classic models:

> **1. Bell-LaPadula Model**
> Focuses on **confidentiality**. Two core rules: the **Simple Security Property = "No Read Up"** (a subject cannot read data at a higher classification) and the **Star (\*) Security Property = "No Write Down"** (a subject cannot write to a lower classification). It also adds a **Discretionary Security Property**. Limitation: it protects confidentiality but not integrity.

> **2. Biba Model**
> Focuses on **integrity** — effectively the inverse of Bell-LaPadula. The **Simple Integrity Property = "No Read Down"** (do not read lower-integrity data) and the **Star Integrity Property = "No Write Up"** (do not write to higher-integrity data). Limitation: protects integrity but not confidentiality.

> **3. Clark-Wilson Model**
> Focuses on **integrity** through **well-formed transactions** and **separation of duties**. Core components: **CDI** (Constrained Data Items), **UDI** (Unconstrained Data Items), **TP** (Transformation Procedures), and **IVP** (Integrity Verification Procedures). Users never touch data directly — only through validated transformation procedures.

### Model rules at a glance

| Model | Focus | Read rule | Write rule |
|---|---|---|---|
| **Bell-LaPadula** | Confidentiality | No Read Up | No Write Down |
| **Biba** | Integrity | No Read Down | No Write Up |
| **Clark-Wilson** | Integrity | Access only via Transformation Procedures | Enforced separation of duties |

> **Memory trick:** Bell-LaPadula = **confidentiality** (read up / write down forbidden); Biba = **integrity** (read down / write up forbidden). They are mirror images.

---

## Defence-in-Depth & Architectural Principles

**Defence-in-Depth** layers multiple independent controls so that if one fails, others still protect the asset — there is no single point of failure. The **ISO/IEC 19249** standard describes five architectural principles:

> **1. Domain Separation**
> Group components with the same trust/security requirements into a domain and separate them, so a compromise in one domain does not spread.

> **2. Layering**
> Build the system in layers (like the OSI model), each with defined responsibilities, so controls apply at every level.

> **3. Encapsulation**
> Hide internal details and expose only defined interfaces, limiting how components can be misused.

> **4. Redundancy**
> Duplicate critical components so a single failure does not cause loss of availability.

> **5. Virtualization**
> Use virtual environments to isolate and contain workloads, aiding separation and recovery.

> **Security relevance:** the layers stack — physical, network, host, application, data — so an attacker must defeat many controls, not one.

---

## Zero Trust, and Threat vs Risk vs Vulnerability

**Zero Trust** replaces implicit network trust with **"never trust, always verify"** — every request is authenticated, authorised and continuously validated regardless of where it originates. It builds on **"trust but verify"** but goes further: no user or device is trusted by default.

The three terms that are often confused:

| Term | Meaning |
|---|---|
| **Vulnerability** | A weakness that could be exploited |
| **Threat** | A potential event or actor that could exploit a vulnerability |
| **Risk** | The likelihood and impact of a threat exploiting a vulnerability |

> **Relationship:** `Threat + Vulnerability → Risk`. You reduce risk by removing vulnerabilities (patching/hardening) or reducing a threat's opportunity (controls).

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **CIA Triad** | Confidentiality, Integrity, Availability — the three security goals. |
| **DAD Triad** | Disclosure, Alteration, Destruction — mirror of CIA (what attackers cause). |
| **Bell-LaPadula** | Confidentiality; No Read Up, No Write Down. |
| **Biba** | Integrity; No Read Down, No Write Up. |
| **Clark-Wilson** | Integrity via well-formed transactions + separation of duties (CDI/UDI/TP/IVP). |
| **Defence-in-Depth** | Multiple layered controls; no single point of failure. |
| **ISO/IEC 19249** | Domain separation, layering, encapsulation, redundancy, virtualization. |
| **Zero Trust** | Never trust, always verify — no implicit trust. |
| **Threat/Risk/Vuln** | Vulnerability = weakness; Threat = potential exploiter; Risk = likelihood × impact. |
| **Golden rule** | CIA is a balance — protect data without breaking legitimate access. |

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What are the three components of the CIA Triad?** | Confidentiality, Integrity, and Availability. |
| **Q2. What is the DAD Triad and how does it relate to CIA?** | Disclosure, Alteration, Destruction — the attacker's mirror of CIA (Disclosure↔Confidentiality, Alteration↔Integrity, Destruction↔Availability). |
| **Q3. Which model focuses on confidentiality, and what are its rules?** | Bell-LaPadula; Simple Security Property = No Read Up, Star Security Property = No Write Down. |
| **Q4. Which model focuses on integrity with "No Read Down / No Write Up"?** | The Biba model. |
| **Q5. What does the Clark-Wilson model use to protect integrity?** | Well-formed transactions and separation of duties (users act only through Transformation Procedures on Constrained Data Items). |
| **Q6. What is Defence-in-Depth?** | Layering multiple independent security controls so no single failure compromises the asset. |
| **Q7. What does Zero Trust mean?** | "Never trust, always verify" — no user or device is trusted by default; every request is authenticated and authorised. |
| **Q8. What is the difference between a threat, a vulnerability, and a risk?** | A vulnerability is a weakness; a threat is a potential actor/event that could exploit it; risk is the likelihood and impact of that happening. |

## TryHackMe Task Answers

| Question | Answer |
|---|---|
| **Data accessible only to the intended users — which security function?** | Confidentiality |
| **A file should not be modified without authorisation — which function?** | Integrity |
| **A service must remain accessible to legitimate users — which function?** | Availability |
| **An officer's clearance is insufficient to access records — which function is lacking?** | Confidentiality |
| **A leader tells troops not to reveal their location — which function is being protected?** | Confidentiality |
| **Which model dictates "no read down"?** | Biba |
| **Which model states "no read up"?** | Bell-LaPadula |
| **Which model teaches "no write down"?** | Bell-LaPadula |
| **Which model forces "no write up"?** | Biba |

## Final Takeaway

Security principles are the bedrock of the whole field. The **CIA Triad** — **Confidentiality, Integrity, Availability** — defines *what* security protects, while the **DAD Triad** — **Disclosure, Alteration, Destruction** — names exactly how each goal fails. The classic **security models** formalise access: **Bell-LaPadula** guards *confidentiality* (**No Read Up, No Write Down**), **Biba** guards *integrity* as its mirror (**No Read Down, No Write Up**), and **Clark-Wilson** enforces integrity through **well-formed transactions and separation of duties**. Real systems combine these with **Defence-in-Depth** and the **ISO/IEC 19249** architectural principles (**domain separation, layering, encapsulation, redundancy, virtualization**) so no single failure is fatal, and modern architectures adopt **Zero Trust** — *never trust, always verify*. Underpinning risk decisions is the distinction between a **vulnerability** (a weakness), a **threat** (a potential exploiter), and the **risk** they combine to create. The recurring lesson: security is a **balance** — protect information from disclosure, alteration and destruction while keeping it available to the people who legitimately need it.

---
*Room notes authored for the Cyber Security 101 Build Your Cyber Security Career module — Security Principles.*
