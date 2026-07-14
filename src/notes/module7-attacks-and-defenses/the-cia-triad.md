| Metadata | Value |
|---|---|
| **Room** | The CIA Triad |
| **Module** | Attacks and Defenses |
| **Difficulty** | Beginner |
| **Time** | 30 Minutes |

### Learning Objectives

By the end of this room you will understand:
- What the CIA Triad is
- Why it is important
- Confidentiality
- Integrity
- Availability
- Security Mindset
- Real-world security examples

## 1. INTRODUCTION

Cyber Security protects:
- Computers
- Servers
- Networks
- Applications
- Data

> [!NOTE]
> But what exactly are we protecting? The answer is **Digital Information**. Cyber Security mainly focuses on protecting three fundamental properties of information. These three properties are called the **CIA TRIAD**.

## 2. WHAT IS THE CIA TRIAD?

```text
                                 CIA TRIAD
                                     ▲
                                     │
                 ┌───────────────────┼───────────────────┐
                 │                   │                   │
                 │                   │                   │
                 ▼                   ▼                   ▼
          Confidentiality        Integrity         Availability
```

These are the three pillars of Cyber Security. Every security control usually protects one or more of these pillars.

## 3. WHY IS THE CIA TRIAD IMPORTANT?

Without proper security, data may be subject to a cascading failure:

```text
Viewed by attackers
        ↓
Modified by attackers
        ↓
Deleted from the system
        ↓
Unavailable to users
        ↓
Lost forever
```

**CIA helps organizations understand:**
- What happened?
- Which security property failed?
- How to prevent it again?

## 4. DIGITAL WORLD EXAMPLE

**Without Security (A Chain Reaction):**

```text
Sensitive Data
        ↓
Seen by attacker
        ↓
Changed maliciously
        ↓
Unavailable for use
        ↓
Business Loss
        ↓
Customer Loss
        ↓
Legal Problems
        ↓
Financial Damage
```

## 5. THE THREE PILLARS

| Pillar | Concept | Principle |
|---|---|---|
| **C** | **Confidentiality** | Only authorized people can access information. |
| **I** | **Integrity** | Data must remain accurate. No unauthorized changes. |
| **A** | **Availability** | Data and services must be available when needed. |

## 6. CONFIDENTIALITY

| Term | Value |
|---|---|
| **Definition** | Protect information from unauthorized access. |
| **Goal** | Only authorized users should read sensitive information. |

### Real World Example
Imagine you are discussing private information with your friend. Someone secretly listens. Your private conversation is no longer private. **Confidentiality is broken.**

### Digital Example
```text
Free Public Wi-Fi
        ↓
Login to your Gmail
        ↓
Attacker captures credentials
        ↓
Account Compromised
```

### How Confidentiality is Protected

```text
Confidentiality
        ↓
Protect Data
        ↓
Encryption
        ↓
Passwords
        ↓
Access Control
```

### Protection Examples
- Authentication
- Authorization
- VPN
- Multi-Factor Authentication

## 7. INTEGRITY

| Term | Value |
|---|---|
| **Definition** | Protect information from unauthorized modification. |
| **Goal** | Data must remain accurate, complete, and trustworthy. |

### Real World Example
Imagine you receive a letter. The envelope is opened, the letter is changed, and then sealed again. You read the changed letter thinking it is the original. **Integrity is broken.**

### Digital Example
```text
Bank Transfer
        ↓
Attacker changes Receiver Account
        ↓
Money goes elsewhere
```

### How Integrity is Protected

```text
Integrity
        ↓
Protect Accuracy
        ↓
Hashing
        ↓
Digital Signatures
        ↓
Checksums
```

### Protection Examples
- File Permissions
- Version Control
- Audit Logs

## 8. AVAILABILITY

| Term | Value |
|---|---|
| **Definition** | Ensure information and services are accessible when needed. |
| **Goal** | Authorized users must always have access to the data. |

### Real World Example
Imagine a bank branch closes unexpectedly. You cannot access your own money. **Availability is broken.**

### Digital Example
```text
Website
        ↓
DDoS Attack
        ↓
Website Offline
        ↓
Customers cannot access it
```

### How Availability is Protected

```text
Availability
        ↓
Protect Access
        ↓
Backups
        ↓
Redundancy
        ↓
Disaster Recovery
```

### Protection Examples
- Load Balancers
- Redundant Servers
- UPS / Generators
- Failover Systems

## 9. CIA TRIAD VISUAL

```text
                                   C I A
                 ┌───────────────────┼───────────────────┐
                 │                   │                   │
              Secret              Correct            Accessible
             No Leak             No Change           Always Up
```

## 10. QUICK COMPARISON

| Pillar | Purpose | If it fails... |
|---|---|---|
| **Confidentiality** | Keep it secret | Data Leak |
| **Integrity** | Keep it correct | Data Modified |
| **Availability** | Keep it accessible | System Down |

> [!WARNING]
> If one pillar fails, overall security becomes weaker. They depend on each other.

## 11. MEMORY TRICK

| Letter | Question | Threat | Pillar |
|---|---|---|---|
| **C** | Can I **SEE** the data? | Unauthorized access | **Confidentiality** |
| **I** | Is the data **CORRECT**? | Unauthorized modification | **Integrity** |
| **A** | Can I **USE** the data? | Service availability | **Availability** |

## 12. QUESTIONS SECURITY PROFESSIONALS ASK

Whenever a security incident occurs, they ask:

| Question Asked | Pillar Concerned |
|---|---|
| **Was sensitive information exposed?** | Confidentiality |
| **Was information changed?** | Integrity |
| **Could users access the system?** | Availability |

## 13. CIA CHALLENGE EXAMPLES

| Scenario | Pillar Broken |
|---|---|
| Financial report altered before publishing | **Integrity** |
| Customer passwords leaked on Dark Web | **Confidentiality** |
| Ransomware encrypts database, making it inaccessible | **Availability** |
| Employee changes their own salary in the HR system | **Integrity** |
| Hospital systems go offline due to power outage | **Availability** |

## 14. FLAG

`THM{CIA_IS_ABOUT_BALANCE}`

## 15. KEY TERMINOLOGY

| Term | Definition |
|---|---|
| **CIA Triad** | The three core pillars of cybersecurity: Confidentiality, Integrity, and Availability. |
| **Confidentiality** | Keeping data secret from unauthorized users. |
| **Integrity** | Keeping data accurate and untampered. |
| **Availability** | Ensuring authorized users can access data when needed. |

## 16. ROOM SUMMARY

- The CIA Triad is the foundation of information security.
- **Confidentiality**: Keep Information Secret.
- **Integrity**: Keep Information Correct.
- **Availability**: Keep Information Accessible.
- Security requires balancing all three pillars simultaneously.
