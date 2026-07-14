| Metadata | Value |
|---|---|
| **Room** | Become a Defender |
| **Module** | Attacks and Defenses |
| **Difficulty** | Beginner |
| **Time** | ~30 Minutes |

**Goal:** Understand Defensive Security and how defenders protect systems, monitor attacks, detect threats, and respond to incidents.

## 1. WHAT IS DEFENSIVE SECURITY?

Defensive Security focuses on:
- Preventing attacks
- Detecting attacks
- Reducing damage
- Recovering after attacks

> [!NOTE]
> Instead of attacking systems, **Defenders protect systems**.

**Main Goal:**
Protect Confidentiality, Integrity, and Availability (CIA Triad).

Unlike Offensive Security which asks *"How can I break this?"*, Defensive Security asks *"How do I stop someone from breaking this?"*

### Blue Team = Defenders
**Responsibilities:**
- Monitor systems
- Detect attacks
- Configure firewalls
- Update software
- Analyze logs
- Investigate incidents
- Respond to attacks
- Recover systems

### Think Like a Defender
A defender constantly asks:
- What do I need to protect?
- What systems are important?
- Can I detect attacks?
- Can I stop attackers?
- If something happens... Can I recover quickly?

## 2. LEARNING OBJECTIVES
- Understand Defensive Security
- Understand Visibility
- Identify Infrastructure
- Learn Protection Methods
- Begin Defensive Journey

## 3. PREREQUISITES
Recommended Knowledge:
- CIA Triad
- Computer Types
- Basic Networking
- Basic Linux

## 4. DEFENSIVE SECURITY LIFE CYCLE

```text
                  ATTACK
                     │
                     ▼
             Can we stop it?
                     │
           Yes ─────────────► Prevent
                     │
                    No
                     ▼
            Can we detect it?
                     │
           Yes ─────────────► Detect
                     │
                    No
                     ▼
              Damage Happens
                     │
                     ▼
                 Mitigate
                     │
                     ▼
                 Investigate
                     │
                     ▼
             Improve Defenses
```

## 5. UNDERSTANDING YOUR ENVIRONMENT (VISIBILITY)

Before protecting anything, you must know:
- **WHAT** exists.
- **WHERE** it exists.
- **WHY** it exists.

> [!WARNING]
> If you don't know your systems, you cannot defend them.

Think of Cyber Security like protecting a city. Every building has a purpose. Similarly, every server has a purpose.

### City Analogy

| Cyber Infrastructure | Imagine a City |
|---|---|
| **Employee Devices** | Homes |
| **Web Servers** | Public Buildings |
| **Mail Server** | Post Office |
| **Firewall** | City Gate |
| **Internet** | Outside City |

### Why Visibility Matters

| Question | You Need Visibility Into... |
|---|---|
| "What am I protecting?" | Servers, Workstations, Users, Applications, Data |
| "Can I see what is happening?" | Logs, Alerts, Monitoring, Network Traffic |
| "What looks suspicious?" | Repeated Login Attempts, Unknown IP Addresses, Malware, Unusual Network Activity |

## 6. FIVE CORE DEFENSIVE ACTIVITIES

| Activity | Definition | Examples |
|---|---|---|
| **1. Prevention** | Stop attacks BEFORE they happen. | Firewall, Antivirus, Software Updates, MFA, Strong Passwords |
| **2. Detection** | Notice attacks quickly. | Logs, Alerts, IDS, SIEM, Monitoring |
| **3. Mitigation** | Reduce attack damage. | Disconnect infected device, Block IP, Disable account, Kill malicious process |
| **4. Analysis** | Understand What, How, When, Who, Why. | Log Analysis, Event Timeline, Packet Analysis, Malware Investigation |
| **5. Response & Improvement** | Recover, Fix, Improve. | Patch Systems, Restore Backup, Improve Firewall Rules, User Training, Incident Report |

## 7. UNDERSTANDING SCOPE

Defenders **DO NOT** protect the whole Internet. They only protect **Their Organization**.

**Example Scope:**
- Company Network
- Company Servers
- Employees
- Databases
- Email Server
- Applications

## 8. INFRASTRUCTURE COMPONENTS

| Component | Purpose | Examples |
|---|---|---|
| **Employee Devices** | Employees work here. | Laptop, Desktop, Tablet |
| **Web Server** | Hosts Website. | Company Website, Customer Portal, Shopping Site |
| **Mail Server** | Handles Emails. | Gmail Server, Exchange, SMTP |
| **Firewall** | Controls Incoming & Outgoing Traffic. | Like a Security Guard |
| **Internet** | Everything outside your organization. | Potential Threat Source |

### How a Defender Thinks
```text
What systems exist?
        ↓
Which systems are important?
        ↓
Can I monitor them?
        ↓
Can attackers reach them?
        ↓
Can I stop attacks?
        ↓
Can I recover?
```

## 9. MEMORY TRICK (PDMAR)

```text
P → Prevent
D → Detect
M → Mitigate
A → Analyze
R → Respond
```

## 10. FLAG
`THM{DEFENSE_NEVER_SLEEPS}`
