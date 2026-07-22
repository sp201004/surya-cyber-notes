## Contents

- [Learning Objectives](#learning-objectives)
- [What is DNS?](#what-is-dns)
- [IP Address](#ip-address)
- [DNS Terminology](#dns-terminology)
- [Domain Hierarchy](#domain-hierarchy)
- [Root Domain (`.`)](#root-domain-``)
- [Top Level Domain (TLD)](#top-level-domain-tld)
- [Second Level Domain (SLD)](#second-level-domain-sld)
- [Subdomain](#subdomain)
- [DNS Record Types](#dns-record-types)
- [DNS Resolution Process](#dns-resolution-process)
- [DNS Server Roles](#dns-server-roles)
- [DNS Cache & TTL](#dns-cache-&-ttl)
- [Practical Commands](#practical-commands)
- [nslookup](#nslookup)
- [dig](#dig)
- [TryHackMe Practical Answers](#tryhackme-practical-answers)
- [Exam Tips](#exam-tips)
- [Interview Questions](#interview-questions)
- [Memory Tricks](#memory-tricks)

## Learning Objectives
- Understand what DNS is.
- Learn the Domain Hierarchy.
- Learn common DNS Record Types.
- Understand the DNS Resolution Process.
- Practice querying DNS records.

## What is DNS?
**DNS (Domain Name System)** translates human-readable domain names into IP addresses. Instead of remembering `104.26.10.229`, you simply type `tryhackme.com` and DNS finds the correct IP automatically.

```text
👤 Human remembers google.com
        ↓
      🌐 DNS
        ↓
  142.250.xxx.xxx
        ↓
      Server
```

**Why DNS?** Without it we'd need to memorize IP addresses for every website (Google, YouTube, GitHub, TryHackMe...) using only numbers. DNS solves this problem.

## IP Address
IPv4 example: `104.26.10.229` — consists of **4 octets**, each ranging `0 – 255`.

## DNS Terminology
| Term | Meaning |
|---|---|
| DNS | Domain Name System |
| Domain | Human-readable website |
| IP Address | Machine address |
| Resolver | Finds DNS records |
| Cache | Previously stored DNS response |

## Domain Hierarchy
```text
admin  .  tryhackme  .  com
  │          │          └── Top Level Domain (TLD)
  │          └────────── Second Level Domain (SLD)
  └───────────────── Subdomain
```

### Root Domain (`.`)
The root domain sits at the very top of DNS — everything starts here.
```text
          .
        / | \
    .com .org .edu
```

### Top Level Domain (TLD)
The right-most part of a domain. In `tryhackme.com`, the TLD is `.com`.

| Type | Description | Examples |
|---|---|---|
| Generic TLD (gTLD) | Purpose-based | `.com` `.org` `.net` `.edu` `.gov` `.biz` `.online` `.club` |
| Country Code TLD (ccTLD) | Country-specific | `.in` `.us` `.ca` `.uk` `.jp` `.au` (e.g. `.co.uk` = United Kingdom) |

### Second Level Domain (SLD)
In `tryhackme.com`, the SLD is `tryhackme`.
- **Restrictions:** max 63 characters · letters, numbers, hyphens only.
- **Cannot:** start with `-`, end with `-`, or use consecutive hyphens.

### Subdomain
Appears before the SLD. In `admin.tryhackme.com`, the subdomain is `admin`.
- More examples: `mail.google.com`, `blog.company.com`, `api.github.com`, `shop.amazon.com`.
- Multiple subdomains allowed: `dev.api.shop.company.com`.
- **Maximum domain length: 253 characters.**

Domains are read from **Right → Left**:
```text
mail . api . tryhackme . com
```

## DNS Record Types
| Record | Maps / Purpose | Example |
|---|---|---|
| **A** | Domain → IPv4 Address | `google.com → 142.250.xx.xx` |
| **AAAA** | Domain → IPv6 Address | `2606:4700:20::681a:be5` |
| **CNAME** | Alias to another domain (Canonical Name) | `store.tryhackme.com → shops.myshopify.com` |
| **MX** | Mail Exchange — where emails should go | `10 mail1.domain.com`, `20 backup.domain.com` |
| **TXT** | Plain text (SPF, DKIM, DMARC, verification) | `v=spf1 include:_spf.google.com ~all` |

> **MX Priority:** lower number = higher priority.

## DNS Resolution Process
Suppose you type `tryhackme.com`:

1. **Local Cache** — Browser checks its cache. Found? Return IP immediately. Not found? Continue.
2. **Recursive DNS Server** — Ask the recursive server (usually ISP DNS, or `8.8.8.8` / `1.1.1.1`). It also checks its cache.
3. **Root DNS Server** — Root replies: "Ask the `.com` servers."
4. **TLD Server** — The `.com` TLD server replies: "The authoritative server is here."
5. **Authoritative DNS Server** — Returns the actual IP address.
6. **Cache & Return** — The recursive server caches the answer and returns it to the browser.

```text
User → Local Cache → Recursive DNS → Root DNS → TLD DNS → Authoritative DNS → IP Address → Browser Opens Website
```

### DNS Server Roles
| Server | Knows / Does |
|---|---|
| Recursive DNS | Queries other DNS servers, caches responses, returns the answer (Google `8.8.8.8`, Cloudflare `1.1.1.1`) |
| Root DNS | Knows where TLD servers are; does **NOT** know the website IP |
| TLD DNS | Knows where the authoritative server is (e.g. `.com → Cloudflare NS`) |
| Authoritative DNS | Stores official DNS records (A, AAAA, MX, TXT, CNAME) — the final source of truth |

## DNS Cache & TTL
After a lookup, the browser, recursive DNS, and OS all store the response to improve speed.

**TTL (Time To Live)** — every DNS record has a TTL. `TTL = 3600` means cache for 3600 seconds (1 hour). After it expires, the DNS lookup happens again.

## Practical Commands
```bash

# nslookup
nslookup google.com                    # A record
nslookup -type=MX google.com           # MX record
nslookup -type=TXT google.com          # TXT record
nslookup -type=CNAME shop.website.thm  # CNAME record

# dig
dig google.com
dig MX google.com
dig TXT google.com
```

## TryHackMe Practical Answers
| Task | Question | Answer |
|---|---|---|
| 1 | DNS stands for | `Domain Name System` |
| 2 | Maximum subdomain length | `63` |
| 2 | Character not allowed | `_` |
| 2 | Maximum domain length | `253` |
| 2 | `.co.uk` is a | `ccTLD` |
| 3 | Email record | `MX` |
| 3 | IPv6 record | `AAAA` |
| 4 | Caching field | `TTL` |
| 4 | ISP DNS type | `Recursive` |
| 4 | Stores official records | `Authoritative` |
| 5 | CNAME | `shops.myshopify.com` |
| 5 | TXT | `THM{7012BBA60997F35A9516C2E16D2944FF}` |
| 5 | MX Priority | `30` |
| 5 | A Record | `10.10.10.10` |

## Exam Tips
- Remember the DNS hierarchy (Root → TLD → Authoritative).
- Know the purpose of each record type (A, AAAA, CNAME, MX, TXT).
- Be clear on Recursive vs Authoritative DNS.
- TTL is a common interview question.
- Practice `nslookup` and `dig`.

## Interview Questions

| Question | Answer |
|---|---|
| **What is DNS?** | Translates domain names into IP addresses. |
| **A vs AAAA?** | A → IPv4; AAAA → IPv6. |
| **CNAME vs A Record?** | A: Domain → IP; CNAME: Domain → Domain. |
| **What does MX do?** | Specifies the mail server. |
| **What is TTL?** | Cache lifetime. |
| **Authoritative DNS?** | Server holding the official DNS records. |
| **Recursive DNS?** | Queries DNS servers on behalf of the client. |
| **gTLD vs ccTLD?** | gTLD is purpose-based (`.com`, `.org`); ccTLD is country-based (`.in`, `.uk`, `.jp`). |

## Memory Tricks

- A → Address (IPv4) · AAAA → IPv6 · CNAME → Copy another Name · MX → Mail Exchange · TXT → Text · TTL → Time To Live
- Domain → IP · TLD = `.com` · SLD = `tryhackme` · Subdomain = `admin`
- Recursive DNS finds the answer · Root knows TLD · TLD knows Authoritative · Authoritative holds records
