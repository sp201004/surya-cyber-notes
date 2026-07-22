| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Windows / Active Directory |
| **Difficulty** | Beginner |
| **Time** | ~45 Minutes |
| **Module** | Windows and AD Fundamentals |

---

## Objective

Active Directory is the backbone of nearly every enterprise Windows network. This room introduces the core building blocks of AD and how administrators use them to manage identity, computers, and policy at scale.

By the end of this room you will be able to:

- Explain what Active Directory and a Windows Domain are
- Describe the role of the Domain Controller and AD DS
- Organize objects with Organizational Units and delegate control
- Apply configuration centrally with Group Policy Objects
- Compare the Kerberos and NetNTLM authentication protocols
- Understand Trees, Forests, and Trust Relationships

---

## Task 1 — Introduction

### What is Active Directory?

**Active Directory (AD)** is Microsoft's directory service used to centrally manage the resources of an enterprise Windows network, including users, computers, servers, groups, security policies, authentication, permissions, and other network resources.

Instead of managing every machine individually, administrators control everything through an **Active Directory Domain**. This centralization is what makes AD scalable across hundreds or thousands of devices.

---

## Task 2 — Windows Domains

### What is a Windows Domain?

A **Windows Domain** is a group of users, computers, servers, and other resources managed under a single centralized administration system. The central repository of Active Directory information is held by servers known as **Domain Controllers (DCs)**.

A typical domain name looks like `thm.local`.

### Why Use a Domain?

Without a domain, each computer keeps its own local users and configuration, which does not scale:

```
PC-1
├── Local User A
└── Local User B

PC-2
├── Local User A
└── Local User C
```

With Active Directory, a single Domain Controller manages everything centrally:

```
              Domain Controller
                    │
              Active Directory
                    │
       ┌────────────┼────────────┐
       │            │            │
     PC-1          PC-2        Server
       │            │            │
       └──── Central Management ─┘
```

From one place, the administrator manages user accounts, password policies, access permissions, computer configurations, and security policies.

### Domain Controller (DC)

A **Domain Controller** is a Windows server running **Active Directory Domain Services (AD DS)**. Its responsibilities are:

| Responsibility | Description |
|----------------|-------------|
| **Authenticate users** | Verifies user credentials against the domain. |
| **Authenticate computers** | Validates computers joined to the domain. |
| **Manage AD objects** | Stores and maintains directory objects. |
| **Enforce security policies** | Applies domain-wide policy such as GPOs. |
| **Manage domain resources** | Controls access to shared resources. |

For example, the domain `thm.local` might be served by a Domain Controller named `DC-ROOT`.

### Advantages of Windows Domains

| Advantage | Benefit |
|-----------|---------|
| **Centralized identity management** | Users log in with the same domain credentials on any authorized computer. |
| **Centralized security policies** | Configurations are deployed through Group Policy Objects (GPOs). |
| **Scalable administration** | Thousands of users and computers are managed from one place. |

---

## Task 3 — Active Directory

Active Directory stores information about network resources as **objects**. Common AD object types include:

- Users
- Computers
- Groups
- Printers
- Servers
- Organizational Units

### Active Directory Users and Computers (ADUC)

The **Active Directory Users and Computers (ADUC)** management console is the tool most commonly used to manage AD objects. Administrators use it to create and delete users, create groups, manage computers, create Organizational Units, move objects between OUs, and delegate permissions.

### Active Directory Domain Services (AD DS)

**AD DS** is the core Active Directory service responsible for storing and managing directory information. It holds the objects that represent every resource in the domain.

### Organizational Units (OUs)

An **Organizational Unit (OU)** is a container used to logically organize objects inside Active Directory. OUs can contain users, groups, computers, and even other OUs.

```
thm.local
│
└── THM
    ├── Management
    ├── Marketing
    ├── Sales
    └── IT
```

A populated structure might look like this:

```
THM
├── Management
│   └── Daniel
│
├── Marketing
│   └── Mark
│
├── Sales
│   ├── Sophie
│   └── Thomas
│
└── IT
    ├── Phillip
    ├── Mary
    └── Claire
```

OUs help administrators organize objects, apply Group Policies, and delegate administrative permissions.

### OU vs Security Group

These are different concepts that are easy to confuse.

| Concept | Primary Purpose |
|---------|-----------------|
| **Organizational Unit** | Organizing AD objects, applying Group Policies, and delegating administration. |
| **Security Group** | Assigning permissions to resources. |

For example, a security group named **IT Admins** might be granted permission to access an administrative server, while the **IT** OU simply groups those user objects for policy and delegation.

---

## Task 4 — Managing Users in AD

Organizations change over time. Employees join, leave, change departments, and change roles, so AD administrators must keep the directory up to date. A typical structure maps people to roles:

```
Management
└── Daniel   → General Manager

Marketing
└── Mark     → Marketing Specialist

Sales
├── Sophie   → Sales Director
└── Thomas   → Sales Representative

IT
├── Phillip  → IT Support
├── Mary     → Server Admin
└── Claire   → Domain Admin
```

### Deleting Extra OUs

Old departments sometimes remain in AD. By default, OUs may have protection enabled against accidental deletion, so attempting to delete one can produce an error:

```text
You do not have sufficient privileges to delete...
or this object is protected from accidental deletion.
```

To remove such an OU, first enable **View → Advanced Features**, then open the OU's **Properties → Object** tab and uncheck **"Protect object from accidental deletion"**. The OU can then be deleted.

> **Warning:** Deleting an OU can also delete every object contained inside it. Confirm the OU is empty or truly unneeded before removing it.

### Delegation

**Delegation** is the process of granting specific administrative privileges over an OU or AD object to another user, allowing them to perform certain administrative tasks without receiving full Domain Administrator privileges.

For example, Phillip works in IT Support. Instead of making him a Domain Administrator, we can allow him to reset passwords for users in the **Sales OU**. Using ADUC, this is done by right-clicking the Sales OU, choosing **Delegate Control**, adding the user `phillip`, and selecting **"Reset user passwords and force password change at next logon"**. Phillip can now reset passwords for Sales users only.

> **Security relevance:** Delegation follows the principle of least privilege. Granting a narrow, specific capability is far safer than handing out Domain Admin rights that an attacker could later abuse.

### Reset an AD User Password with PowerShell

```powershell
Set-ADAccountPassword sophie -Reset -NewPassword (Read-Host -AsSecureString -Prompt 'New Password') -Verbose
```

The parts of this command break down as follows:

| Component | Meaning |
|-----------|---------|
| `Set-ADAccountPassword` | Changes or resets an AD account password. |
| `sophie` | The target user. |
| `-Reset` | Performs a password reset. |
| `-NewPassword` | Specifies the new password. |
| `Read-Host -AsSecureString` | Securely prompts for the password without echoing it. |

### Force Password Change at Next Logon

```powershell
Set-ADUser -ChangePasswordAtLogon $true -Identity sophie -Verbose
```

This forces Sophie to choose a new password the next time she logs in.

### Domain Login Format

When connecting with a domain account (for example over RDP), the username uses the `DOMAIN\username` format:

```text
THM\phillip
THM\sophie
```

---

## Task 5 — Managing Computers in AD

By default, computers that join a domain are placed in the built-in **Computers** container. Storing everything together is not ideal, because different devices need different security policies. At a minimum, devices should be separated into three categories.

| Category | Purpose |
|----------|---------|
| **Workstations** | Everyday user machines for browsing and office work. Privileged admin accounts should not be used for routine activity here. |
| **Servers** | Provide services to users, applications, and other servers (web, database, file, application servers). |
| **Domain Controllers** | Manage AD domains; among the most sensitive systems, holding authentication data, and must be strongly protected. |

### Recommended OU Structure

Create a dedicated OU for each category and move devices into the matching OU:

```
thm.local
│
├── Workstations
├── Servers
└── Domain Controllers
```

Separating machines this way lets administrators apply different policies to each device type. After sorting the room's machines, the **Workstations OU** ended up containing **7 computers**, and creating separate OUs for servers and workstations is the recommended approach.

---

## Task 6 — Group Policies

### What is a Group Policy Object?

A **Group Policy Object (GPO)** is a collection of settings applied to users and computers in Active Directory. GPOs allow centralized configuration of security settings, password policies, desktop settings, Control Panel restrictions, account lockout policies, and other system and user settings.

### Group Policy Management

GPOs are managed through the **Group Policy Management** console. A typical layout links policies to domains and OUs, while the objects themselves live under **Group Policy Objects**:

```
Forest: thm.local
│
└── Domains
    └── thm.local
        ├── Default Domain Policy
        ├── RDP Policy
        ├── Domain Controllers
        └── THM
```

### Creating and Linking GPOs

GPOs are created under **Group Policy Objects** and then **linked** to domains or OUs. The policy applies to the objects within that scope:

```
GPO
 │
 └── Linked to Sales OU
          │
          ├── Sophie
          └── Thomas
```

### GPO Inheritance

If a GPO is linked to a parent domain or OU, child OUs generally inherit that policy:

```
thm.local
│
└── Default Domain Policy
        │
        └── THM
            ├── Sales
            ├── Marketing
            └── IT
```

A policy linked at `thm.local` can therefore affect objects far below it in the hierarchy.

### Security Filtering

**Security Filtering** controls which users, groups, or computers actually receive a policy. By default, policies commonly apply to **Authenticated Users**.

### Computer Configuration vs User Configuration

Every GPO is split into two main sections:

| Section | Applies To |
|---------|-----------|
| **Computer Configuration** | Settings applied to computers. |
| **User Configuration** | Settings applied to users. |

Because a single GPO can contain both, one policy is able to configure users **and** computers at the same time.

### Default Domain Policy

The **Default Domain Policy** commonly holds domain-wide security settings such as the Password Policy, Account Lockout Policy, and Kerberos Policy.

### Distribution and Refresh

GPOs are distributed to domain machines through a network share named **SYSVOL**. Clients refresh policy periodically, but an immediate refresh can be forced:

```powershell
gpupdate /force
```

> **Tip:** After changing a GPO during testing, run `gpupdate /force` on the target machine instead of waiting for the automatic refresh interval to confirm your settings apply.

---

## Task 7 — Authentication Methods

Windows domains primarily support two authentication protocols: **Kerberos** and **NetNTLM**.

### Kerberos Authentication

**Kerberos** is the default authentication protocol for modern Windows domains. It uses a **ticket-based** system: instead of repeatedly sending credentials to each service, a user authenticates once and receives tickets. The key components are:

| Component | Meaning |
|-----------|---------|
| **KDC** | Key Distribution Center (usually runs on the Domain Controller). |
| **TGT** | Ticket Granting Ticket — used to request further tickets. |
| **TGS** | Ticket Granting Service / service-specific ticket. |
| **SPN** | Service Principal Name — identifies a target service. |

### Kerberos Authentication Flow

The exchange happens in five steps:

- **Step 1 — Request TGT:** The client sends its username plus an encrypted timestamp to the KDC. The timestamp is encrypted with a key derived from the user's password.
- **Step 2 — Receive TGT:** The KDC returns a TGT and a session key. The TGT is encrypted with the password hash of the `krbtgt` account, so the user cannot decrypt it themselves.
- **Step 3 — Request Service Ticket:** To reach a service, the client sends the TGT back to the KDC along with its username, a timestamp, and the target **SPN** (for example `MSSQL/SRV`).
- **Step 4 — Receive TGS:** The KDC returns a TGS plus a service session key. The TGS is encrypted with a key derived from the service owner's password hash.
- **Step 5 — Authenticate to Service:** The client presents the TGS to the service, which decrypts it with its own key and validates the session. If valid, authentication succeeds.

The overall flow:

```
Client
  │
  │ 1. Request TGT
  ▼
KDC
  │
  │ 2. TGT + Session Key
  ▼
Client
  │
  │ 3. Request TGS using TGT
  ▼
KDC
  │
  │ 4. TGS + Service Session Key
  ▼
Client
  │
  │ 5. Present TGS
  ▼
Service
  │
  └── Access Granted
```

The single most important idea: the **TGT** is the ticket used to request additional service tickets.

### NetNTLM Authentication

**NetNTLM** is a legacy Windows authentication mechanism kept mainly for compatibility. Modern domains prefer Kerberos. NetNTLM relies on a **challenge-response** mechanism rather than tickets.

### NetNTLM Authentication Flow

- **Step 1:** The client requests authentication from the server.
- **Step 2:** The server generates a random **challenge** and sends it to the client.
- **Step 3:** The client combines its NTLM password hash, the challenge, and other known data to calculate a response, then sends the response to the server.
- **Step 4:** For a domain account, the server forwards the challenge and response to the Domain Controller.
- **Step 5:** The Domain Controller calculates the expected response from its stored data and compares it to the client's response — allowing authentication if they match and denying it otherwise.
- **Step 6:** The result travels back from the Domain Controller to the server to the client.

```
Client
  │
  │ Authentication Request
  ▼
Server
  │
  │ Challenge
  ▼
Client
  │
  │ Response
  ▼
Server
  │
  │ Challenge + Response
  ▼
Domain Controller
  │
  │ Verify
  ▼
Allow / Deny
```

> **Security relevance:** In NetNTLM the user's actual password is never transmitted over the network. Authentication is proven through the challenge-response exchange instead.

If a **local account** is used, the server can verify the challenge-response itself using account information stored locally in the **SAM** database, without contacting a Domain Controller.

### Kerberos vs NetNTLM

| Feature | Kerberos | NetNTLM |
|---|---|---|
| Type | Ticket-based | Challenge-response |
| Modern Windows Default | Yes | No |
| Domain Controller Involvement | KDC issues tickets | DC validates response |
| Password Sent Over Network | No | No |
| Status | Preferred | Legacy compatibility |

---

## Task 8 — Trees, Forests and Trusts

As organizations grow, a single domain can become hard to manage. Active Directory supports larger structures through domains, trees, forests, and trust relationships.

### Active Directory Tree

A **Tree** is a collection of domains that share the same namespace. For example, `thm.local` is the root domain, and `uk.thm.local` and `us.thm.local` are subdomains that all share the `thm.local` namespace:

```
thm.local
├── uk.thm.local
└── us.thm.local
```

Organizations create multiple domains for reasons such as geographic separation, different countries or regulations, independent IT teams, and general administrative separation. Each domain can have its own Domain Controllers, users, computers, policies, and administrators:

```
             thm.local
             DC-ROOT
              /    \
             /      \
            ▼        ▼
    uk.thm.local   us.thm.local
       DC-UK          DC-US
```

### Domain Admins

Each domain has its own **Domain Admins** group, which manages only that domain. For example, the UK Domain Admin manages `uk.thm.local` while the US Domain Admin manages `us.thm.local`.

### Enterprise Admins

In multi-domain environments, the **Enterprise Admins** group holds administrative privileges across all domains in the enterprise:

```
Enterprise Admin
        │
        ├── thm.local
        ├── uk.thm.local
        └── us.thm.local
```

### Active Directory Forest

A **Forest** is a collection of one or more Active Directory trees. Unlike the domains inside a single tree, separate trees may use different namespaces:

```
Forest
│
├── THM Tree
│   ├── thm.local
│   ├── uk.thm.local
│   └── us.thm.local
│
└── MHT Tree
    ├── mht.local
    ├── eu.mht.local
    └── asia.mht.local
```

In short, a **Tree** is a set of domains sharing a namespace, while a **Forest** is a collection of one or more trees.

### Trust Relationships

A **Trust Relationship** allows users from one domain to potentially access resources in another domain. It establishes the authentication relationship between domains:

```
Domain A User
       │
       │ Trust Relationship
       ▼
Domain B Resource
```

> **Warning:** A trust relationship does **not** automatically grant access to every resource. It only enables cross-domain authentication — permissions must still be explicitly assigned.

### One-Way Trust

Suppose Domain AAA trusts Domain BBB. Then users from Domain BBB can potentially be authorized to access resources in Domain AAA. Notice that the trust direction and the access direction move opposite ways:

```
Trust Direction
AAA ─────────────► BBB

Access Direction
AAA ◄───────────── BBB
```

### Two-Way Trust

A **two-way trust** allows both domains to trust each other, so users from either domain may be authorized to access resources in the other. Domains joined under AD trees and forests commonly establish two-way trusts:

```
Domain A ◄────────► Domain B
```

Regardless of direction, having a trust never means automatic access to all resources — it means cross-domain authentication can be supported, and actual authorization still depends on assigned permissions.

---

## Task 9 — Conclusion

This room introduced the fundamental components of Active Directory: Windows Domains, Domain Controllers, users, computers, Organizational Units, delegation, Group Policies, authentication with Kerberos and NetNTLM, and Trees, Forests, and Trust Relationships.

Active Directory is a major component of enterprise Windows environments, and understanding it matters for both **Blue Team / defensive security** and **Red Team / offensive security**. Misconfigured AD environments create serious security risks, which is why proper authentication, authorization, privilege management, Group Policy configuration, and domain administration are essential.

---

## Quick Revision

| Concept | Meaning |
|---------|---------|
| Active Directory | Microsoft directory service for centralized identity, computer, authentication, and policy management. |
| Domain Controller | Windows server running AD DS that authenticates users/computers and enforces policy. |
| Organizational Unit | Container that organizes objects, applies GPOs, and supports delegation. |
| Delegation | Granting specific admin privileges without full Domain Admin rights. |
| Group Policy Object | Collection of settings for Computer Configuration and User Configuration. |
| Kerberos | Modern ticket-based authentication using TGTs and service tickets. |
| NetNTLM | Legacy challenge-response authentication. |
| Tree / Forest | Domains sharing a namespace / a collection of one or more trees. |

**Key idea:** Active Directory centralizes identity and policy; Domain Controllers enforce it, OUs and GPOs shape it, Kerberos and NetNTLM authenticate it, and trees, forests, and trusts scale it across an enterprise.

---

## 30-Second Revision

- Active Directory centrally manages users, computers, groups, and policies in a Windows Domain.
- Domain Controllers run AD DS and authenticate users and computers.
- OUs organize objects, allow GPO targeting, and support delegation.
- Delegation grants narrow admin rights instead of full Domain Admin — least privilege.
- Computers should be split into Workstations, Servers, and Domain Controllers OUs.
- GPOs configure Computer and User settings, are distributed through `SYSVOL`, and refresh with `gpupdate /force`.
- Kerberos is ticket-based (TGT then TGS) and is the modern default; NetNTLM is legacy challenge-response.
- Neither Kerberos nor NetNTLM sends the actual password over the network.
- A Tree shares one namespace; a Forest holds one or more trees; Trusts enable cross-domain authentication but not automatic access.

---

## Cheat Sheet

| Term / Command | Meaning |
|----------------|---------|
| AD | Active Directory |
| AD DS | Active Directory Domain Services |
| DC | Domain Controller |
| ADUC | Active Directory Users and Computers console |
| OU | Organizational Unit |
| GPO | Group Policy Object |
| SYSVOL | Network share used for Group Policy distribution |
| `gpupdate /force` | Force an immediate Group Policy refresh |
| `Set-ADAccountPassword` | Reset an AD user's password via PowerShell |
| `Set-ADUser -ChangePasswordAtLogon $true` | Force a password change at next logon |
| `DOMAIN\username` | Domain account login format (e.g. `THM\sophie`) |
| KDC | Key Distribution Center |
| TGT | Ticket Granting Ticket |
| TGS | Service-specific Kerberos ticket |
| SPN | Service Principal Name |
| Kerberos | Modern ticket-based Windows domain authentication |
| NetNTLM | Legacy challenge-response authentication |
| SAM | Local account database used for local NetNTLM verification |
| Delegation | Granting specific administrative privileges |
| Tree | Domains sharing a common namespace |
| Forest | Collection of one or more AD trees |
| Trust | Relationship enabling cross-domain authentication |

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is Active Directory and why is it used?** | Active Directory is Microsoft's directory service for centrally managing users, computers, groups, authentication, and policy across a Windows network, so administrators do not have to configure each machine individually. |
| **Q2. What is a Domain Controller?** | A Domain Controller is a Windows server running AD DS that authenticates users and computers, stores AD objects, and enforces domain security policies. |
| **Q3. What is the difference between an OU and a Security Group?** | An OU organizes objects, allows Group Policy to be applied, and supports delegation, while a Security Group is used to assign permissions to resources. |
| **Q4. What is delegation and why is it useful?** | Delegation grants a user specific administrative privileges over an OU or object without making them a Domain Admin, following the principle of least privilege. |
| **Q5. What is a GPO and how is it distributed?** | A Group Policy Object is a collection of user and computer settings applied to domains or OUs; it is distributed to machines through the `SYSVOL` network share and can be refreshed with `gpupdate /force`. |
| **Q6. How does Kerberos authentication work at a high level?** | The client requests a TGT from the KDC, receives a TGT and session key, uses the TGT to request a TGS for a specific service, then presents that TGS to the service to gain access — all without repeatedly sending credentials. |
| **Q7. What is the difference between Kerberos and NetNTLM?** | Kerberos is a modern, ticket-based protocol and the default in current Windows domains, while NetNTLM is a legacy challenge-response protocol kept for compatibility. Neither transmits the actual password over the network. |
| **Q8. What is the difference between a Tree and a Forest?** | A Tree is a set of domains that share the same namespace, while a Forest is a collection of one or more trees that may use different namespaces. |
| **Q9. Does a trust relationship grant access to all resources?** | No. A trust enables cross-domain authentication, but access to any specific resource still depends on explicitly assigned permissions. |

## Final Takeaway

Active Directory turns a collection of individual Windows machines into a single, centrally managed enterprise. Domain Controllers hold the identity and policy, OUs and GPOs shape how everything is organized and configured, Kerberos and NetNTLM prove who users are, and trees, forests, and trusts let the whole structure scale across sites and organizations. Because so much control is concentrated here, understanding AD is essential for both defending and attacking enterprise networks — a misconfiguration in any of these layers can expose the entire domain.
