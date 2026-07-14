| | |
|---|---|
| **Module** | Network Fundamentals |
| **Room** | Extending Your Network |
| **Difficulty** | Easy |
| **Status** | Completed |

#### Learning Objectives
After completing this room you should understand:
- What a WAN is
- Public vs Private IP addresses
- How NAT (Network Address Translation) works
- How DNS (Domain Name System) works
- DNS record types

#### What is a WAN? (WAN = Wide Area Network)
A **WAN** is a network that connects devices across a large physical distance (e.g., across cities, countries, or continents). The **Internet** is the most famous example of a WAN.

```text
[ LAN 1: London ] ────── ( WAN / Internet ) ────── [ LAN 2: New York ]
```

---

#### Public vs Private IP Addresses
To prevent running out of IPv4 addresses, the IP space was divided into:
- **Private IP Addresses** — Used inside local networks (LANs). They are free to use but **cannot** communicate directly on the Internet.
- **Public IP Addresses** — Globally unique and routable on the public Internet. Your ISP (Internet Service Provider) leases a public IP to your router.

##### Private IP Ranges (RFC 1918)
- `10.0.0.0 – 10.255.255.255` (Large Networks)
- `172.16.0.0 – 172.31.255.255` (Medium Networks)
- `192.168.0.0 – 192.168.255.255` (Small/Home Networks)

---

#### NAT (Network Address Translation)
Since private IPs cannot travel on the public Internet, your home router uses **NAT** to translate your private IP into a single public IP.

```text
[ Client (192.168.1.5) ] ─── Private Packet ───> [ Router (NAT) ]
                                                        │ (Translates IP)
[ Google (8.8.8.8)     ] <─── Public Packet  ─── [ Router (82.15.3.1)  ]
```

1. **Request** — Your laptop (`192.168.1.5`) requests a website.
2. **Translation** — Your router intercepts the packet, replaces the private source IP with its external public IP (`82.15.3.1`), and records the transaction in a NAT translation table.
3. **Response** — The web server replies to the router's public IP.
4. **Delivery** — The router reads its NAT table and forwards the reply back to your laptop.

This allows hundreds of devices on a LAN to share a single public IP.

---

#### DNS (Domain Name System)
DNS is the "phonebook" of the Internet. It translates human-readable domain names (e.g., `google.com`) into computer-readable IP addresses (e.g., `142.250.190.46`).

##### Domain Name Hierarchy
- **Root Domain** — Represented by a dot (`.`).
- **Top-Level Domain (TLD)** — The extension, e.g., `.com`, `.org`, `.net`, `.edu`, `.gov`.
- **Second-Level Domain** — The unique name, e.g., `tryhackme`.com, `google`.com.
- **Subdomain** — E.g., `store`.tryhackme.com, `blog`.google.com.

```text
             [ . (Root) ]
                  |
             [ .com (TLD) ]
                  |
         [ tryhackme.com (2nd Level) ]
                  |
     [ store.tryhackme.com (Subdomain) ]
```

##### Common DNS Record Types
- **A Record** — Translates a domain to an **IPv4** address.
- **AAAA Record** — Translates a domain to an **IPv6** address.
- **CNAME (Canonical Name)** — Points a domain to another domain (an alias).
- **MX Record** — Specifies the mail servers responsible for receiving email for the domain.
- **TXT Record** — Stores text-based information (commonly used for domain verification, SPF email security).

##### Private Ranges
| Range | Use Case |
|---|---|
| **10.x.x.x** | Large enterprises |
| **172.16.x.x – 172.31.x.x** | Medium-scale networks |
| **192.168.x.x** | Home and small office networks |

## Contents

- [Learning Objectives](#learning-objectives)
- [What is a WAN? (WAN = Wide Area Network)](#what-is-a-wan-wan-=-wide-area-network)
- [Public vs Private IP Addresses](#public-vs-private-ip-addresses)
- [Private IP Ranges (RFC 1918)](#private-ip-ranges-rfc-1918)
- [NAT (Network Address Translation)](#nat-network-address-translation)
- [DNS (Domain Name System)](#dns-domain-name-system)
- [Domain Name Hierarchy](#domain-name-hierarchy)
- [Common DNS Record Types](#common-dns-record-types)
- [Private Ranges](#private-ranges)
- [Interview Questions](#interview-questions)
- [Memory Tricks](#memory-tricks)
- [Quick Revision](#quick-revision)
- [Final Summary](#final-summary)

## Interview Questions

- **Private vs Public IP?**
  - **Private IP:** Used locally inside LAN, non-routable over the Internet, free.
  - **Public IP:** Assigned to router by ISP, globally unique, routable over the public Internet.
- **How does NAT help conserve IPv4 addresses?** It allows hundreds of local private devices to communicate on the public internet using only a single shared public IP address.
- **What is the purpose of a DNS MX record?** Directs incoming email messages to the specific mail server responsible for hosting that domain's email.
- **What is the difference between an A record and a CNAME record?**
  - An **A Record** maps a domain directly to an IP address (e.g., `example.com` -> `192.0.2.1`).
  - A **CNAME Record** maps an alias domain to another canonical domain (e.g., `www.example.com` -> `example.com`).

## Memory Tricks

```text
Network Extension
│
├── WAN (Internet Connecting LANs)
│
├── NAT (The Single Gatekeeper)
│   ├── Keeps Private IPs safe inside LAN
│   └── Represents everyone with ONE Public IP
│
└── DNS (The Internet Phonebook)
    ├── Domain Hierarchy: Root -> TLD -> Domain -> Subdomain
    └── Records: A (IPv4), AAAA (IPv6), CNAME (Alias), MX (Email)
```

## Quick Revision

| Concept/Record | Key Feature |
|---|---|
| Private IP | Local LAN use only (non-routable) |
| Public IP | Internet routable (provided by ISP) |
| NAT | Translates Private IP <──> Public IP |
| DNS | Translates Domains <──> IP Addresses |
| A Record | Domain to IPv4 |
| AAAA Record | Domain to IPv6 |
| CNAME Record | Alias (Domain to Domain) |
| MX Record | Mail server director |
| TXT Record | Text storage (verification/SPF) |

## Final Summary

- WANs span wide geographical distances, with the Internet being the premier example.
- Private IP addresses are non-routable and divided into 10.x.x.x, 172.16.x.x, and 192.168.x.x ranges.
- NAT allows private LAN devices to access the public Internet by translating private source IPs to the router's public external IP.
- DNS is the Internet's domain translation directory, structured in a hierarchical namespace.
- Core DNS record types include A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), and TXT (metadata).
