| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Networking / Core Protocols |
| **Difficulty** | Beginner |
| **Time** | ~55 Minutes |
| **Module** | Networking |

---

## Objective

This room focuses on the **Application Layer** protocols that power everyday Internet use. Networking Concepts explained how data travels, Networking Essentials explained how networks are built, and this room explains what individual protocols actually do.

By the end of this room you will be able to:

- Explain what DNS, WHOIS, HTTP, HTTPS, FTP, SMTP, POP3, and IMAP each do
- Match every protocol to its default port
- Describe the basic client–server request/response model
- Read DNS record types and follow the DNS lookup and query flow
- Distinguish DNS from WHOIS and HTTP from HTTPS
- Understand HTTP methods, status codes, and headers
- Compare the email protocols (SMTP for sending, POP3 and IMAP for receiving)
- Recognise how Wireshark captures each protocol's traffic

---

## Task 1 — The Internet Protocol Stack

Every protocol in this room lives at the **Application Layer**, which is responsible for communication between applications. The application data is handed down to the transport layer (TCP/UDP), then to IP, then to Ethernet for delivery.

```text
                    APPLICATION LAYER
                           │
      ┌──────────────────────────────────────┐
      │ DNS                                  │
      │ HTTP / HTTPS                         │
      │ FTP                                  │
      │ SMTP                                 │
      │ POP3                                 │
      │ IMAP                                 │
      └──────────────────────────────────────┘
                     │
                 TCP / UDP
                     │
                     IP
                     │
                  Ethernet
```

You never talk to TCP or IP directly. Instead, an application speaks its protocol and the lower layers hide the complexity:

```text
Browser              Email App
   │                     │
  HTTP                  SMTP
   │                     │
  TCP                   TCP
   │                     │
   IP                    IP
   │                     │
Ethernet              Ethernet
```

| Application | Protocol used |
|-------------|---------------|
| **Browser** | HTTP / HTTPS |
| **Email client (send)** | SMTP |
| **Email client (receive)** | POP3 |
| **Email client (sync)** | IMAP |
| **Terminal file transfer** | FTP |

> **Note:** Application layer protocols exist so that people and programs can work with names, requests, and messages instead of raw packets and addresses.

---

## Task 2 — The Client–Server Model

Almost every protocol in this room follows the same pattern: a **client** sends a request and a **server** returns a response.

```text
             REQUEST
   Client -------------->  Server

             RESPONSE
   Client <--------------  Server
```

The same shape repeats across protocols, only the wording of the request changes:

```text
   Browser         DNS Client       FTP Client        Email Client
      │                │                │                  │
   GET /index.html   google.com?     Download file      Send email
      │                │                │                  │
   Web Server       DNS Server       FTP Server         Mail Server
      │                │                │                  │
   Returns HTML     Returns IP        Returns file      Stores/Forwards
```

> **Tip:** If you remember the request/response shape, every protocol below becomes a variation on the same conversation.

---

## Task 3 — Default Ports

Knowing the default port for each protocol is one of the most common networking interview topics.

| Protocol | Port | Purpose |
|----------|-----:|---------|
| **DNS** | 53 | Resolve names to IP addresses |
| **HTTP** | 80 | Website traffic |
| **HTTPS** | 443 | Secure website traffic |
| **FTP** | 21 | File transfer |
| **SMTP** | 25 | Send mail |
| **POP3** | 110 | Receive mail |
| **IMAP** | 143 | Synchronise mail |

> **Tip:** Group them by job — 53 resolves, 80/443 browse, 21 transfers files, and 25/110/143 handle email (send, download, sync).

---

## Task 4 — DNS (Domain Name System)

### Why DNS Exists

Humans remember names like `google.com`, `youtube.com`, and `github.com`, but computers route traffic using IP addresses like `142.250.183.206`. DNS converts a domain name into an IP address so you never have to memorise numbers.

It works like a phone's contact list: you remember "Mom", but the phone stores the actual number. `google.com` maps to `142.x.x.x` in exactly the same way. Everything on the Internet depends on DNS — web browsing, email delivery, cloud services, APIs, gaming, and mobile apps.

### DNS Ports

DNS uses port **53** over both transports:

| Transport | When it is used |
|-----------|-----------------|
| **UDP 53** | Default — faster because there is no connection setup |
| **TCP 53** | Large responses or when UDP fails (fallback) |

> **Note:** DNS usually uses UDP because queries are tiny and UDP avoids the overhead of establishing a connection, which makes lookups faster.

### Important DNS Record Types

| Record | Meaning | Maps to |
|--------|---------|---------|
| **A** | Address record | Domain → IPv4 address |
| **AAAA** | IPv6 address record | Domain → IPv6 address |
| **CNAME** | Canonical name | Domain → another domain (alias) |
| **MX** | Mail exchange | Domain → responsible mail server |
| **TXT** | Text record | Arbitrary text (verification, SPF, etc.) |
| **NS** | Name server | Domain → authoritative name servers |

Examples of what each record returns:

```text
A      google.com        → 142.250.183.206
AAAA   google.com        → 2404:6800:4009::200e
CNAME  www.example.com   → example.com
MX     gmail.com         → mail server
```

> **Tip:** Remember A = Address (IPv4), AAAA = four A's for the bigger IPv6 address, CNAME = "copy name"/alias, and MX = Mail eXchange.

### The DNS Lookup Process

A full lookup for a name you have never visited walks down the DNS hierarchy:

```text
You
 │
Browser
 │
DNS Query
 │
Local DNS Resolver
 │
Root DNS
 │
TLD DNS (.com)
 │
Authoritative DNS
 │
Returns IP
 │
Browser connects to server
```

The whole process usually takes only a few milliseconds. Once the authoritative server returns the matching A record (for example `93.184.215.14`), the browser opens a connection to that IP and the website loads.

### DNS Packets in Wireshark

A single lookup normally produces a query and a response. When IPv6 is enabled, the client asks for both A and AAAA records, so four packets appear:

```text
Client
 │
A Query
 │
DNS Server
 │
A Response
 │
AAAA Query
 │
DNS Server
 │
AAAA Response
```

### DNS Commands

Use `nslookup` to query DNS records from the command line:

```bash
nslookup google.com
```

```text
Name:    google.com
Address: 142.x.x.x
```

Query specific record types with the `-type` flag:

```bash
nslookup -type=AAAA google.com
nslookup -type=MX gmail.com
nslookup -type=CNAME example.com
```

### DNS in Penetration Testing

DNS is valuable to both attackers and defenders during reconnaissance. It can reveal IP addresses, mail servers, cloud services, and subdomains:

```text
company.com
 │
MX Record
 │
mail.company.com
 │
Possible attack surface
```

> **Security relevance:** Enumerating DNS records exposes an organisation's IP ranges, mail infrastructure, and subdomains, which helps map the attack surface before any scanning begins.

---

## Task 5 — WHOIS

Where DNS answers "where is the website?", WHOIS answers "who owns the website?".

### What Is WHOIS?

WHOIS is a protocol and service that stores the registration details of domains. When someone buys a domain, the registrar records ownership and administrative information that WHOIS can return.

```text
google.com
 │
WHOIS
 │
Owner and registration information
```

### Domain Registration

Buying a domain makes you its **registrant**. You can then configure DNS records for it (A, AAAA, MX, CNAME, TXT, and others).

### WHOIS Information Fields

| Field | Shows |
|-------|-------|
| **Domain Name** | The registered domain (e.g. `google.com`) |
| **Registrar** | Company that sold the domain (GoDaddy, Namecheap, Cloudflare, Porkbun) |
| **Creation Date** | When the domain was first registered |
| **Expiry Date** | When the current registration ends |
| **Updated Date** | Last modification to the record |
| **Registrant / Admin / Tech** | Contact information for the owner and administrators |
| **Name Servers** | Where the domain's DNS is hosted (e.g. `ns1.cloudflare.com`) |
| **Status** | Registration and transfer lock status |

### Privacy Protection

WHOIS records once exposed the owner's name, phone number, email, and address. Privacy protection now hides these behind placeholder values:

| You may now see | Instead of |
|-----------------|------------|
| **Registration Private** | Owner name |
| **Domains By Proxy** | Contact details |
| **Redacted For Privacy** | Email and address |

This protects domain owners from spam and abuse while keeping the domain registered.

### The WHOIS Command

```bash
whois google.com
```

The output typically includes the domain name, creation date, expiry date, registrar, status, and DNS servers.

### WHOIS in Reconnaissance

WHOIS is useful before scanning because it reveals the registrar, DNS provider, creation date, organisation, and name servers:

```text
Target Domain
 │
WHOIS
 │
Registrar
 │
DNS Servers
 │
Name Servers
 │
Possible technologies
```

> **Security relevance:** WHOIS data supports open-source intelligence by tying a domain to an organisation, its DNS provider, and registration timeline, all of which shape how a target is approached.

---

## Task 6 — DNS vs WHOIS

Both services answer questions about a domain, but very different ones.

| Aspect | DNS | WHOIS |
|--------|-----|-------|
| **Question answered** | Where is it? | Who owns it? |
| **Returns** | IP address | Ownership and registration details |
| **Port / source** | Port 53 | Registration database |
| **Purpose** | Website access and resolution | Domain information and identity |

**Simple trick:** DNS gives you a **location**, WHOIS gives you an **identity**.

---

## Task 7 — HTTP and HTTPS: Accessing the Web

Every time you open a website your browser uses **HTTP** or **HTTPS** to communicate with the web server.

### What Is HTTP?

HTTP stands for **HyperText Transfer Protocol**. It transfers webpages, images, videos, CSS, JavaScript, APIs, and files between a client and a server. HTTP traffic is plain text — anyone capturing it can read it.

### What Is HTTPS?

HTTPS is **HTTP Secure**: exactly the same as HTTP but wrapped in **TLS/SSL** encryption. An eavesdropper only sees ciphertext instead of readable content.

| Property | HTTP | HTTPS |
|----------|------|-------|
| **Default port** | 80 | 443 |
| **Encryption** | None | TLS/SSL |
| **Secure** | No | Yes |
| **Traffic** | Plain text | Encrypted |
| **Recommended** | No | Yes |

### The Web Request Flow

```text
Type URL
 │
DNS Lookup
 │
IP Address Found
 │
TCP Connection
 │
HTTP Request
 │
Server Response
 │
Browser Renders Page
```

### An HTTP Request

```http
GET / HTTP/1.1
Host: example.com
```

- **GET** — the method (retrieve data)
- **/** — the path (the homepage)
- **HTTP/1.1** — the protocol version
- **Host** — the target website

### An HTTP Response

```http
HTTP/1.1 200 OK
Content-Type: text/html

<html>
...
</html>
```

The status line reports the result (`200 OK` means success), and the body carries the HTML, images, CSS, and JavaScript.

### HTTP Methods

| Method | Action | Example |
|--------|--------|---------|
| **GET** | Retrieve data (safe, does not modify) | Open homepage, read article, view profile |
| **POST** | Submit data to be stored | Login, register, upload or contact form |
| **PUT** | Update/replace an existing resource | Update user profile, product, or record |
| **DELETE** | Remove a resource | Delete account, file, or comment |

> **Tip:** Map the four methods to CRUD — GET reads, POST creates, PUT updates, DELETE removes.

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| **200** | OK — success |
| **301** | Moved Permanently |
| **302** | Temporary Redirect |
| **400** | Bad Request |
| **401** | Unauthorized |
| **403** | Forbidden |
| **404** | Not Found |
| **500** | Internal Server Error |

Status codes are grouped by their first digit:

| Range | Category |
|-------|----------|
| **2xx** | Success |
| **3xx** | Redirect |
| **4xx** | Client error |
| **5xx** | Server error |

### HTTP Headers

Headers carry extra information about the request or response.

| Header | Provides |
|--------|----------|
| **Host** | Target website |
| **User-Agent** | Browser/client information |
| **Accept** | Content types the client accepts |
| **Cookie** | Session data |
| **Authorization** | Authentication credentials |

### HTTP over Telnet

Because HTTP is just text, you can talk to a web server manually. Connect with telnet on port 80:

```bash
telnet <IP> 80
```

Then type a request followed by a blank line:

```http
GET / HTTP/1.1
Host: anything

```

The server responds with HTTP headers and the HTML body. The same trick can request a specific page such as `GET /flag.html HTTP/1.1`, which is handy in CTFs, pentesting, and debugging.

> **Security relevance:** HTTP sends everything — including passwords, cookies, and form data — as plain text, so anyone sniffing the network can read it. HTTPS encrypts the same traffic so only ciphertext is exposed.

---

## Task 8 — FTP (File Transfer Protocol)

FTP is designed specifically to **transfer files** between a client and a server, unlike HTTP which serves webpages. It handles uploading, downloading, renaming, deleting, and listing files efficiently.

### FTP Uses Two Connections

FTP runs on **TCP port 21** for control, but the actual file bytes travel over a separate data connection:

```text
Connection 1  →  Control channel (commands and replies)
Connection 2  →  Data channel (actual file transfer)
```

### The FTP Workflow

```text
Connect
 │
Login
 │
List Files
 │
Choose File
 │
Download / Upload
 │
Disconnect
```

### FTP Commands

| Command | Purpose | Example |
|---------|---------|---------|
| **USER** | Provide the username | `USER anonymous` |
| **PASS** | Provide the password | `PASS password123` |
| **LIST** (`ls`) | List files on the server | `ls` |
| **RETR** | Retrieve (download) a file | `RETR coffee.txt` |
| **STOR** | Store (upload) a file | `STOR backup.zip` |
| **QUIT** | End the session | `QUIT` |

A typical interactive session looks like this:

```bash
ftp 10.10.10.10
```

```ftp
USER anonymous
PASS
ls
get coffee.txt
quit
```

### Download and Upload Flows

```text
Download                    Upload
--------                    ------
FTP Client                  FTP Client
 │                           │
RETR coffee.txt             STOR backup.zip
 │                           │
FTP Server                  FTP Server
 │                           │
Transfers file              Stores file
 │
Saved locally
```

### Common FTP Responses

| Code | Meaning |
|------|---------|
| **220** | Service ready |
| **331** | Password needed |
| **230** | Login successful |
| **150** | Opening data connection |
| **226** | Transfer complete |

### FTP in Wireshark

Wireshark shows client commands (`USER`, `PASS`, `LIST`, `RETR`, `QUIT`) and the server's numbered replies. Because classic FTP is unencrypted, the username, password, commands, and files all appear as plain text.

> **Security relevance:** Classic FTP transmits credentials and file contents in the clear, so anyone capturing packets can read them. Use **SFTP** or **FTPS** where confidentiality matters.

---

## Task 9 — SMTP (Simple Mail Transfer Protocol)

SMTP **sends** emails — it does not download them. It runs on **TCP port 25** by default (secure submission commonly uses 465 or 587).

Think of it as a post office: you hand over a letter and the office forwards it toward the destination.

### The Email Sending Flow

```text
Sender
 │
SMTP
 │
Mail Server
 │
Recipient Mail Server
 │
Mailbox
```

### SMTP Commands

| Command | Purpose | Example |
|---------|---------|---------|
| **HELO** | Start the conversation | `HELO client.com` |
| **EHLO** | Extended HELO (modern features) | `EHLO client.com` |
| **MAIL FROM** | Specify the sender | `MAIL FROM:<alice@example.com>` |
| **RCPT TO** | Specify the recipient | `RCPT TO:<bob@example.com>` |
| **DATA** | Begin the message body | `DATA` |
| **.** | A single dot on its own line ends the message | `.` |
| **QUIT** | End the SMTP session | `QUIT` |

### The Complete SMTP Flow

```text
Client
 │
SMTP Server
 │
HELO
 │
MAIL FROM
 │
RCPT TO
 │
DATA
 │
Email content
 │
.   (single dot ends the message)
 │
QUIT
```

After `DATA` the server replies `354 Start Mail Input`, and it waits until it receives a line containing only a dot before sending the message.

### SMTP over Telnet

You can send an email manually over telnet:

```bash
telnet 10.10.10.10 25
```

```smtp
HELO client
MAIL FROM:<user@test.com>
RCPT TO:<admin@test.com>
DATA
Subject: Test

Hello
.
QUIT
```

### Important SMTP Responses

| Code | Meaning |
|------|---------|
| **220** | Ready |
| **250** | OK |
| **354** | Start entering the email body |
| **221** | Closing connection |

### FTP vs SMTP

| FTP | SMTP |
|-----|------|
| Transfers files | Transfers emails |
| Port 21 | Port 25 |
| `RETR` (download) | `MAIL FROM` (sender) |
| `STOR` (upload) | `RCPT TO` (recipient) |
| `LIST` (files) | `DATA` (message) |

> **Security relevance:** Plain SMTP also travels in clear text, so commands, addresses, and message content can be captured. Secure submission ports (465/587) with TLS protect the conversation.

---

## Task 10 — POP3 (Post Office Protocol v3)

SMTP sends mail; POP3 lets the receiver **download** it. POP3 pulls emails from the mail server down to a local computer, and it typically removes them from the server afterward.

It works like collecting letters from a post office box and taking them home — once collected, the box may be empty.

### Default Port

POP3 uses port **110** (secure **POP3S** uses **995**).

### How POP3 Works

```text
Mail Server
 │
Stores Emails
 │
POP3 Client Connects
 │
Downloads Emails
 │
(Optional) Deletes Emails
 │
Disconnect
```

Combined with SMTP, the end-to-end path is:

```text
Alice
 │
SMTP        (send)
 │
Mail Server
 │
POP3        (receive)
 │
Bob's Laptop
```

### POP3 Commands

| Command | Purpose | Example |
|---------|---------|---------|
| **USER** | Provide the username | `USER surya` |
| **PASS** | Provide the password | `PASS password123` |
| **LIST** | List emails with their sizes | `LIST` |
| **RETR** | Retrieve an email by number | `RETR 1` |
| **DELE** | Delete an email from the server | `DELE 1` |
| **QUIT** | End the session | `QUIT` |

A `LIST` reply pairs each message number with its size:

```text
1 1520
2 4100
3 2200
```

### POP3 Characteristics and Limits

POP3 downloads mail, usually removes it from the server, works well for a single device, and supports offline reading. Its weaknesses are poor multi-device support and no folder synchronisation. In Wireshark, POP3 replies begin with `+OK` (success) or `-ERR` (error).

> **Tip:** Remember POP3 as "Pick Up Post" — go to the server, collect the mail, and bring it home.

---

## Task 11 — IMAP (Internet Message Access Protocol)

Unlike POP3, IMAP does not simply download mail — it **synchronises** your mailbox across every device. Read an email on your phone and it also shows as read on your laptop.

### Default Port

IMAP uses port **143** (secure **IMAPS** uses **993**).

### The IMAP Workflow

```text
Mail Server
 │
Keeps Emails
 │
Laptop ── Phone ── Tablet ── Office PC
 │
All synchronised
```

### IMAP Commands

| Command | Purpose | Example |
|---------|---------|---------|
| **LOGIN** | Authenticate | `LOGIN user password` |
| **SELECT** | Choose a mailbox | `SELECT INBOX` |
| **FETCH** | Retrieve an email | `FETCH 1` |
| **LOGOUT** | Disconnect | `LOGOUT` |

### IMAP Characteristics

IMAP keeps emails on the server, synchronises all devices, and supports folders and message flags, which makes it the better fit for modern email accessed from multiple devices.

> **Tip:** Remember IMAP as "Internet Mail Always Present" — the mail stays on the server for every device to see.

---

## Task 12 — Email Protocol Comparison

The three email protocols split cleanly by job: SMTP sends, POP3 downloads, IMAP synchronises.

| Protocol | Purpose | Port |
|----------|---------|-----:|
| **SMTP** | Send email | 25 |
| **POP3** | Receive (download) email | 110 |
| **IMAP** | Synchronise email | 143 |

Their secure (TLS) equivalents:

| Secure protocol | Port |
|-----------------|-----:|
| **SMTPS** | 465 / 587 |
| **POP3S** | 995 |
| **IMAPS** | 993 |

### POP3 vs IMAP

| POP3 | IMAP |
|------|------|
| Downloads emails | Synchronises emails |
| Usually removes mail from server | Keeps mail on server |
| Best for one device | Best for multiple devices |
| Simple | Advanced |
| Offline focused | Synchronisation focused |

### The Complete Email System

```text
Sender
 │
SMTP        (send)
 │
Mail Server
 │
POP3 / IMAP (receive or sync)
 │
Receiver
```

> **Note:** A useful real-world image — POP3 collects the letter and empties the box, while IMAP leaves the letter in the box so every device can still read it.

---

## Quick Revision

| Protocol | Port | Job |
|----------|-----:|-----|
| **DNS** | 53 | Resolve domain names to IP addresses |
| **WHOIS** | — | Show domain ownership and registration |
| **HTTP** | 80 | Web traffic (plain text) |
| **HTTPS** | 443 | Secure web traffic (TLS) |
| **FTP** | 21 | File transfer (control + data channels) |
| **SMTP** | 25 | Send email |
| **POP3** | 110 | Download email |
| **IMAP** | 143 | Synchronise email |

**Key idea:** Every protocol here is an Application Layer conversation built on the same client–server request/response model — learn each one's job, its default port, and whether it protects data in transit.

---

## 30-Second Revision

- **DNS** turns names into IP addresses on port 53 (UDP by default, TCP for large or fallback).
- Core DNS records: **A** (IPv4), **AAAA** (IPv6), **CNAME** (alias), **MX** (mail server), plus **TXT** and **NS**.
- **WHOIS** shows who owns a domain — registrar, dates, and name servers; privacy services now redact contacts.
- **HTTP** (80) is plain text; **HTTPS** (443) adds TLS encryption.
- HTTP methods map to CRUD: **GET** read, **POST** create, **PUT** update, **DELETE** remove.
- Status codes group by first digit: 2xx success, 3xx redirect, 4xx client error, 5xx server error.
- **FTP** (21) transfers files over separate control and data channels and is unencrypted.
- **SMTP** (25) sends mail; a lone `.` ends the message body.
- **POP3** (110) downloads and often deletes mail; **IMAP** (143) keeps and syncs mail across devices.

---

## Cheat Sheet

### Default Ports

| Protocol | Port | Secure port |
|----------|-----:|------------:|
| DNS | 53 | — |
| HTTP | 80 | 443 (HTTPS) |
| FTP | 21 | — (use SFTP/FTPS) |
| SMTP | 25 | 465 / 587 (SMTPS) |
| POP3 | 110 | 995 (POP3S) |
| IMAP | 143 | 993 (IMAPS) |

### Protocols and Their Jobs

| Protocol | Purpose | Key commands / terms |
|----------|---------|----------------------|
| **DNS** | Resolve names to IPs | `nslookup`, A / AAAA / CNAME / MX |
| **WHOIS** | Domain ownership lookup | `whois`, registrar, name servers |
| **HTTP/HTTPS** | Web communication | GET, POST, PUT, DELETE, status codes |
| **FTP** | File transfer | USER, PASS, LIST, RETR, STOR, QUIT |
| **SMTP** | Send email | HELO/EHLO, MAIL FROM, RCPT TO, DATA, `.` |
| **POP3** | Download email | USER, PASS, LIST, RETR, DELE, QUIT |
| **IMAP** | Synchronise email | LOGIN, SELECT, FETCH, LOGOUT |

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. Why do we need DNS?** | DNS translates human-readable domain names into the IP addresses computers use to route traffic, so people do not have to memorise numeric addresses. |
| **Q2. What is the difference between an A and an AAAA record?** | An A record maps a domain to an IPv4 address, while an AAAA record maps a domain to an IPv6 address. |
| **Q3. What is the purpose of an MX record?** | It specifies the mail server responsible for receiving email for a domain. |
| **Q4. Why does DNS usually use UDP instead of TCP?** | DNS queries are small, and UDP is faster because it avoids the overhead of establishing a connection; TCP is used for large responses or as a fallback. |
| **Q5. What information does WHOIS provide, and how does DNS differ from it?** | WHOIS provides ownership and registration details (registrar, dates, name servers). DNS answers "where" a domain resolves (its IP), while WHOIS answers "who" owns it. |
| **Q6. Why is HTTPS preferred over HTTP?** | HTTPS encrypts traffic with TLS, so credentials, cookies, and content cannot be read in transit, whereas HTTP sends everything as plain text. |
| **Q7. What is the difference between GET and POST?** | GET retrieves data without modifying it, while POST submits data to be processed or stored on the server. |
| **Q8. Why does FTP use two connections?** | FTP separates a control channel (port 21 for commands and replies) from a data channel that carries the actual file bytes. |
| **Q9. How does SMTP know an email has ended?** | The client sends a line containing only a single dot (`.`), which signals the end of the message body. |
| **Q10. What is the difference between POP3 and IMAP?** | POP3 downloads emails to one device and usually removes them from the server, while IMAP keeps mail on the server and synchronises it across multiple devices. |

## Final Takeaway

Networking Core Protocols ties the **Application Layer** together: **DNS** finds a website's address and **WHOIS** reveals who owns it; **HTTP** and **HTTPS** carry web content, with HTTPS adding **TLS** encryption; **FTP** moves files over separate control and data channels; and the email trio splits by role — **SMTP** sends, **POP3** downloads, and **IMAP** synchronises. Learn each protocol's job, its default port, and whether it protects data in transit, and you have the foundation that networking, cybersecurity, penetration testing, and technical interviews all build on.
