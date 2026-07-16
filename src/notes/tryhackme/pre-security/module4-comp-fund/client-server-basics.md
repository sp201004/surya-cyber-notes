## Contents

- [Contents](#contents)
- [Overview](#overview)
- [Learning Objectives](#learning-objectives)
- [What is Client-Server?](#what-is-client-server)
- [Real Life Analogy (Pizza Shop)](#real-life-analogy-pizza-shop)
- [Client](#client)
- [Server](#server)
- [Service](#service)
- [Request](#request)
- [Response](#response)
- [Protocol](#protocol)
- [Network](#network)
- [Port](#port)
- [Common Ports](#common-ports)
- [DNS (Domain Name System)](#dns-domain-name-system)
- [IP Address](#ip-address)
- [HTTP](#http)
- [HTTPS](#https)
- [Stateless Protocol](#stateless-protocol)
- [How Websites Remember You](#how-websites-remember-you)
- [HTTP Methods](#http-methods)
- [GET](#get)
- [POST](#post)
- [PUT](#put)
- [PATCH](#patch)
- [DELETE](#delete)
- [HEAD](#head)
- [OPTIONS](#options)
- [CONNECT](#connect)
- [TRACE](#trace)
- [GET Request Flow](#get-request-flow)
- [HTTP Request Example](#http-request-example)
- [HTTP Response Example](#http-response-example)
- [Important Request Fields](#important-request-fields)
- [Response Components](#response-components)
- [Common HTTP Status Codes](#common-http-status-codes)
- [Browser Developer Tools](#browser-developer-tools)
- [Network Tab](#network-tab)
- [URL Breakdown](#url-breakdown)
- [Complete Communication Flow](#complete-communication-flow)
- [Important Definitions](#important-definitions)
- [What is Client-Server Architecture?](#what-is-client-server-architecture)
- [Difference between Client and Server?](#difference-between-client-and-server)
- [Why is DNS needed?](#why-is-dns-needed)
- [What is a Port?](#what-is-a-port)
- [HTTP vs HTTPS](#http-vs-https)
- [What is Stateless?](#what-is-stateless)
- [What are Cookies?](#what-are-cookies)
- [What is a Session?](#what-is-a-session)
- [Mind Map](#mind-map)
- [Memory Tricks](#memory-tricks)
- [Quick Revision](#quick-revision)
- [TryHackMe Answers](#tryhackme-answers)

> **Platform:** TryHackMe
> **Path:** Pre Security → Computer Fundamentals → Client-Server Basics
> **Difficulty:** Easy
> **Status:** Completed

---

## Contents
---

## Overview
Earlier computers worked independently. As technology evolved, systems started communicating over networks to share resources and services.

This communication follows the **Client-Server Model**, the foundation of the Internet.

---

## Learning Objectives
- Understand Client-Server Architecture
- Understand Client
- Understand Server
- Understand Network
- Understand Service
- Understand Protocol
- Understand Port
- Understand DNS
- Understand HTTP
- Understand HTTP Request & Response

---

## What is Client-Server?
A Client requests a service.

A Server provides that service.

```
          Request
Client ----------------> Server
       <----------------
          Response
```

| Client | Server |
|---------|---------|
| Browser | Google |
| Phone App | Instagram Server |
| Chrome | GitHub |
| Outlook | Mail Server |

---

## Real Life Analogy (Pizza Shop)
Imagine ordering pizza.

```
You (Alice)
        ↓
Tell Bob your order
        ↓
Bob goes to Luigi's Pizza
        ↓
Luigi prepares pizza
        ↓
Bob returns pizza
```

**Computer Equivalent**

| Pizza Story | Networking |
|-------------|------------|
| Alice | Client |
| Luigi's Pizza | Server |
| Bob | Network Communication |
| Pizza Order | Request |
| Pizza | Response |

---

## Client
A client is a device or software that requests services from another computer.

**Examples**

- Browser
- Mobile App
- Laptop
- Desktop
- API Consumer

```
Chrome
Firefox
Edge
Safari
Postman
curl
```

---

## Server
A server is a computer that provides services to clients.

**Examples**

- Web Server
- Database Server
- File Server
- Mail Server
- DNS Server

Servers usually:

- Run 24×7
- Handle many users
- Store data
- Process requests

---

## Service
A service is something a server offers.

```
Website
Email
Database
Cloud Storage
Authentication
API
Downloads
Streaming
```

---

## Request
A request is sent by the client asking for a resource.

**Example**

```
GET /index.html
```

---

## Response
The server processes the request and sends back data.

**Example**

```
200 OK

HTML Page
Image
JSON
CSS
JavaScript
```

---

## Protocol
A protocol is a set of communication rules.

Without protocols computers cannot understand each other.

**A protocol defines**

- Language
- Message format
- Commands
- Responses
- Error handling

**Examples**

```
HTTP
HTTPS
FTP
SSH
DNS
SMTP
```

---

## Network
A network connects computers together.

**Examples**

```
LAN
WAN
Internet
```

---

## Port
A Port identifies a particular service running on a server.

> Think of one building having many doors. Each door leads to a different service.

```
Computer
│
├── Port 80
├── Port 443
├── Port 22
├── Port 21
└── Port 53
```

### Common Ports
| Port | Service |
|-------|----------|
| `20/21` | FTP |
| `22` | SSH |
| `23` | Telnet |
| `25` | SMTP |
| `53` | DNS |
| `80` | HTTP |
| `110` | POP3 |
| `143` | IMAP |
| `443` | HTTPS |
| `3389` | RDP |

---

## DNS (Domain Name System)
DNS converts human-readable names into IP addresses.

**Example**

```
google.com
↓
142.250.xxx.xxx
```

> Like GPS: Restaurant Name → Actual Address

Without DNS:

```
https://google.com
↓
142.250.xxx.xxx
```

---

## IP Address
Every computer on a network has an address.

**Example**

```
192.168.1.10
8.8.8.8
1.1.1.1
```

> IP is like a house address.

---

## HTTP
HTTP = HyperText Transfer Protocol

Used to transfer web pages.

**Default Port:** `80`

**Characteristics**

- Stateless
- Client-Server Protocol
- Request-Response Model

---

## HTTPS
HTTPS = HTTP + SSL/TLS Encryption

**Default Port:** `443`

**Advantages**

- Encryption
- Authentication
- Integrity

> Always prefer HTTPS.

---

## Stateless Protocol
HTTP is stateless.

**Meaning:** The server forgets previous requests.

```
Request 1
↓
Completed
↓
Server forgets
```

---

## How Websites Remember You
Modern websites use:

- Cookies
- Session IDs
- Tokens

```
Login
↓
Session Created
↓
Cookie Stored
↓
Next Request
↓
Cookie Sent
↓
User Recognized
```

---

## HTTP Methods

### GET
Retrieve data.

```
GET /index.html
```

Used for: Opening pages, Reading information

---

### POST
Create data.

```
POST /login
```

Used for: Login, Signup, Form Submission

---

### PUT
Replace existing resource.

---

### PATCH
Update part of a resource.

---

### DELETE
Delete a resource.

---

### HEAD
Retrieve headers only.

---

### OPTIONS
Shows supported methods.

---

### CONNECT
Creates a tunnel. Mostly used for HTTPS proxies.

---

### TRACE
Returns received request. Used for debugging.

---

## GET Request Flow
```
Browser
↓
DNS Lookup
↓
IP Address
↓
TCP Connection
↓
HTTP GET Request
↓
Server
↓
HTTP Response
↓
Browser Renders Page
```

---

## HTTP Request Example
```http
GET /index.html HTTP/1.1

Host: tryhackme.com
User-Agent: Firefox
Accept: text/html
```

---

## HTTP Response Example
```http
HTTP/1.1 200 OK

Content-Type: text/html

<html>
...
</html>
```

---

## Important Request Fields
| Field | Example |
|-------|---------|
| Scheme | `http`, `https` |
| Host | `google.com` |
| Filename | `/index.html` |
| Address | IP Address |
| Status | `200 OK` |

---

## Response Components
```
HTTP Response
├── Status Code
├── Headers
└── Body
```

- **Headers** → Metadata
- **Body** → Actual webpage

---

## Common HTTP Status Codes
| Code | Meaning |
|------|----------|
| `200` | OK |
| `201` | Created |
| `301` | Moved Permanently |
| `302` | Redirect |
| `400` | Bad Request |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Not Found |
| `500` | Internal Server Error |
| `502` | Bad Gateway |
| `503` | Service Unavailable |

---

## Browser Developer Tools
**Open**

```
F12

or

Right Click → Inspect
```

**Useful Tabs**

```
Elements
Console
Network
Sources
Application
Storage
```

---

## Network Tab
**Shows**

- Every Request
- Every Response
- Status Codes
- Headers
- Timing
- Size
- Response Body

> Useful for: Debugging, API Testing, Web Security

---

## URL Breakdown
**Example**

```
https://www.iamlearning.thm/contact
```

| Part | Value |
|------|-------|
| Scheme | `https` |
| Host | `www.iamlearning.thm` |
| Path | `/contact` |

---

## Complete Communication Flow
```
Client
↓
DNS
↓
IP Address
↓
Connect to Port 443
↓
HTTPS Request
↓
Server
↓
Response
↓
Browser Displays Website
```

---

## Important Definitions
| Term | Definition |
|------|------------|
| Client | Requests a service |
| Server | Provides a service |
| Protocol | Rules of communication |
| Port | Identifies a service |
| DNS | Converts domain names into IP addresses |
| IP Address | Address of a computer |
| HTTP | Transfers webpages |
| HTTPS | Secure version of HTTP |
| Request | Message sent by client |
| Response | Message returned by server |

---

### What is Client-Server Architecture?
A communication model where clients request services and servers provide them.

---

### Difference between Client and Server?
| Client | Server |
|---------|---------|
| Requests | Responds |
| Starts Communication | Waits for Requests |
| Browser | Web Server |

---

### Why is DNS needed?
Humans remember names. Computers communicate using IP addresses. DNS converts names into IPs.

---

### What is a Port?
A logical communication endpoint used to identify services running on a computer.

---

### HTTP vs HTTPS
| HTTP | HTTPS |
|------|-------|
| Unencrypted | Encrypted |
| Port `80` | Port `443` |
| Less Secure | More Secure |

---

### What is Stateless?
Server does not remember previous requests.

---

### What are Cookies?
Small files stored in the browser to maintain sessions.

---

### What is a Session?
Temporary user information maintained after login.

---

## Mind Map
```
                    Client-Server Basics
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
     Client             Server            Network
        │                  │                  │
        └──────────────Request───────────────┘
                           │
                       Response
                           │
        ┌──────────────┬───────────────┐
        │              │               │
     Protocol         Port            DNS
        │              │               │
      HTTP         80 / 443        Name → IP
        │
      HTTPS
        │
   GET POST PUT PATCH DELETE
```

## Memory Tricks

```
Client → Requests → Server → Responds
```

```
DNS: Name → IP
```

```
Port: Door of a Service
```

```
HTTP: Web Communication
HTTPS: Secure Web Communication
```

```
GET → Read
POST → Create
PUT → Replace
PATCH → Update
DELETE → Delete
```

---

## Quick Revision

**Client requests**

**Server responds**

 Protocol = Communication rules

 DNS = Name → IP

 Port = Service Identifier

 HTTP = Web Protocol

 HTTPS = Secure HTTP

**HTTP is Stateless**

**Cookies maintain sessions**

**GET retrieves data**

**POST sends data**

 Developer Tools → Network tab shows requests and responses

 URL = Scheme + Host + Path

---

## TryHackMe Answers

| Question | Answer |
|----------|--------|
| What identifies a specific service on a server? | `Port` |
| What is the address of a server called? | `Internet Protocol Address` |
| Host of `https://www.iamlearning.thm/contact` | `www.iamlearning.thm` |
| Scheme of `https://www.iamlearning.thm/contact` | `https` |

---
