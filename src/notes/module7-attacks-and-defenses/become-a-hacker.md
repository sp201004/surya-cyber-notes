## 1. WHAT IS OFFENSIVE SECURITY?

Offensive Security is the practice of proactively attacking systems, applications, or networks in a legal and authorized manner to discover security weaknesses before real attackers do.

Instead of waiting for hackers to attack, organizations hire ethical hackers to attack them first.

| Term | Definition |
|---|---|
| **Simple Definition** | Thinking like an attacker to protect a system. |

**Goal Workflow:**
```text
Find Weaknesses
        ↓
Exploit Weaknesses
        ↓
Report Weaknesses
        ↓
Fix Weaknesses
        ↓
Improve Security
```

### Real World Example
Imagine your house. Instead of waiting for a thief, you hire a security expert. He checks your doors, windows, locks, CCTV, and alarms. Then he tells you: "This window is weak." "This lock is easy to break." You fix them before thieves arrive. This is exactly the same concept in cybersecurity.

## 2. WHY OFFENSIVE SECURITY?

**Main Objectives:**
- Discover vulnerabilities
- Test existing security
- Prevent future attacks
- Understand attacker behavior
- Improve organization's security posture

## 3. OFFENSIVE SECURITY PROCESS

```text
               Information Gathering
                         │
                         ▼
                  Find Weaknesses
                         │
                         ▼
                 Exploit Weaknesses
                         │
                         ▼
               Gain Authorized Access
                         │
                         ▼
                  Report Findings
                         │
                         ▼
                 Security Improved
```

## 4. LEARNING OBJECTIVES

After completing this room you should understand:
- Offensive Security
- Common Terminology
- Ethical Hacking Process
- Vulnerabilities
- Enumeration
- Exploitation
- Dictionary Attacks
- Hydra Basics
- Hacker Mindset

## 5. ETHICAL HACKING

Ethical Hacking means trying to hack a system **WITH PERMISSION**.

| Hacking Type | Permission |
|---|---|
| **Illegal Hacking** | Without permission |
| **Ethical Hacking** | With permission |

### Ethical Hacker Responsibilities:
- Find vulnerabilities
- Never damage systems
- Never steal information
- Report findings responsibly
- Stay inside scope
- Help improve security

## 6. REAL ATTACKER vs ETHICAL HACKER

| Hacker Type | Goals |
|---|---|
| **Real Attacker** | Steal, Destroy, Encrypt, Extort |
| **Ethical Hacker** | Find, Report, Improve, Protect |

> [!WARNING]
> **IMPORTANT RULE**: Permission is everything. Without permission, it's illegal. With permission, it's a Legal Penetration Test.

## 7. CORE TERMINOLOGY

| Term | Definition | Details |
|---|---|---|
| **Red Team** | Simulates real attackers. | Goal is to break into systems, avoid detection, and test security controls. Think of them as "The Fake Hacker Team." |
| **Penetration Test** | An authorized security assessment. | Purpose is to find vulnerabilities, demonstrate impact, and suggest fixes. Output is a Security Report. |
| **Vulnerability** | A weakness in software, hardware, etc. | Examples: Weak Password, SQL Injection, Open Port, Old Software, Default Credentials. |
| **Exploit** | Technique used to take advantage of a vulnerability. | Example: Weak password → Password Guessing → Unauthorized Login. |
| **Scope** | Defines what you are allowed to test. | Example: Allowed = `example.com`, Not Allowed = `mail.example.com`. |

### Relationship Between Terms:
```text
Weakness
    │
    ▼
Vulnerability
    │
    ▼
Exploit
    │
    ▼
Gain Access
    │
    ▼
Report
```

## 8. FINDING WEAKNESSES (ENUMERATION)

Before attacking anything, we first understand the target.

| Questions Every Hacker Asks |
|---|
| What is exposed? |
| What services exist? |
| Are there hidden pages? |
| Where is the login portal? |
| Where is the admin panel? |
| Are there open ports? |
| What technologies are used? |

> [!NOTE]
> This process is called **Enumeration**: Collecting information about a target before attacking it. Good hackers don't guess. They enumerate.

### Enumeration Targets
- Hidden Pages
- Login Panels
- Directories
- Subdomains
- Users
- Emails
- Software Versions
- Open Services

### Practical Example
Target: `http://www.onlineshop.thm`

Suppose the homepage looks normal. Try navigating to: `/sitemap`, `/mail`, `/register`, `/login`, `/admin`.

| Server Response | Meaning |
|---|---|
| `200 OK` | Page Exists |
| `404 Not Found` | Doesn't Exist |
| `403 Forbidden` | Exists but Access Denied |

### Why Hidden Pages Matter
Many developers forget to remove: 
- Admin Pages
- Test Pages
- Backup Files
- Old Login Panels
- Debug Pages

Attackers search these first.

**Attack Chain Example:**
```text
Homepage
        ↓
Nothing Interesting
        ↓
Try /login
        ↓
Login Found
        ↓
Try Default Credentials
        ↓
Access Granted
```

> [!IMPORTANT]
> **IMPORTANT CONCEPT:** Small weaknesses become big security incidents when combined together. (e.g., Hidden Login + Weak Password + No MFA = Full System Access)

## 9. EXPLOITATION IN ACTION

In this section, we automate the password guessing process using a dictionary attack.

| Term | Definition |
|---|---|
| **Dictionary Attack** | Trying a large list of common passwords against a single username until one works. |

### Using Hydra
`Hydra` is a fast network logon cracker.
```bash
hydra -l admin -P passwords.txt http-post-form "/login.php:user=^USER^&pass=^PASS^:Invalid password" example.com
```

## 10. FLAG
`THM{HACKER_MINDSET}`
