# 🌐 Web Application Basics
> TryHackMe | Cyber Security 101 → Web Hacking

> **Room Difficulty:** Beginner
>
> **Estimated Time:** 120 Minutes
>
> **Module:** Web Hacking

---

## Learning Objectives

By completing this room, you will learn:

- What a Web Application is
- Front End vs Back End
- Components of a Web Application
- Uniform Resource Locator (URL)
- Anatomy of a URL
- HTTP Protocol
- HTTP Messages
- HTTP Requests
- HTTP Responses
- HTTP Methods
- HTTP Headers
- HTTP Status Codes
- Security Headers
- Practical HTTP Requests
- Real-world security implications

---

## Why This Room Matters

Nearly every modern application is a web application.

Examples:

- Facebook
- Instagram
- Gmail
- GitHub
- Amazon
- Netflix
- Banking websites
- Government portals

If you want to become a:

- Web Pentester
- Bug Bounty Hunter
- Security Engineer
- SOC Analyst
- Red Teamer

then understanding HTTP and Web Applications is **absolutely mandatory**.

---

## What is a Web Application?

A **Web Application** is software that runs on a web server and is accessed through a web browser using the Internet.

Unlike desktop applications, users don't install web applications locally.

Instead:

```
User
   │
Browser
   │
Internet
   │
Web Server
   │
Application
   │
Database
```

Examples

| Website | Type |
|----------|------|
| Gmail | Email Application |
| Facebook | Social Media |
| Amazon | E-Commerce |
| GitHub | Code Hosting |
| Netflix | Streaming |
| TryHackMe | Learning Platform |

---

## Basic Web Application Flow

```
            Browser
                │
                │ HTTP Request
                ▼
        Web Server
                │
                │
      Application Logic
                │
                ▼
          Database
                ▲
                │
         HTTP Response
                ▲
            Browser
```

---

## How Does a User Access a Website?

Suppose you open

```
https://tryhackme.com
```

The following happens:

1. Browser receives URL
2. DNS finds server IP
3. Browser connects
4. HTTP Request sent
5. Server processes request
6. Database queried if required
7. HTTP Response returned
8. Browser renders HTML/CSS/JS

---

## Browser Responsibilities

A browser is responsible for:

- Sending HTTP Requests
- Receiving Responses
- Rendering HTML
- Running JavaScript
- Applying CSS
- Managing Cookies
- Saving Cache
- Managing Sessions

Examples:

- Chrome
- Firefox
- Edge
- Safari
- Brave

---

## Client vs Server

| Client | Server |
|---------|---------|
| Browser | Web Server |
| Sends Requests | Sends Responses |
| Displays Website | Stores Website |
| User Controlled | Server Controlled |

---

## Web Application Overview

TryHackMe explains a web application using an excellent analogy.

Imagine a planet.

Users only see the surface.

But underneath...

Thousands of things are working together.

Exactly the same happens inside web applications.

```
Surface
↓
Frontend
↓
Backend
↓
Database
↓
Infrastructure
```

---

## Components of a Web Application

```
                User
                 │
             Browser
                 │
     HTML CSS JavaScript
                 │
         Web Application
        ┌───────────────┐
        │ Backend Logic │
        └───────────────┘
                 │
          Database
                 │
        Infrastructure
                 │
             Firewall
```

---

## Front End

The Front End is everything the user can see and interact with.

Examples

- Buttons
- Images
- Forms
- Menus
- Videos
- Colors
- Text
- Animations

---

## Front-End Technologies

The room introduces three core technologies.

---

### HTML

**HyperText Markup Language**

HTML provides the **structure** of a webpage.

Without HTML:

There is no webpage.

Example

```html
<h1>Hello</h1>
<p>Welcome</p>
```

Browser renders

```
Hello
Welcome
```

Think of HTML as:

```
Skeleton
```

of a human body.

---

#### HTML Responsibilities

- Page Structure
- Forms
- Tables
- Images
- Videos
- Buttons
- Links

---

#### HTML Real Example

```html
<form>
<input>
<button>
</button>
</form>
```

---

#### Security Perspective

HTML itself isn't dangerous.

But:

Improper HTML generation can introduce

- XSS
- HTML Injection
- Clickjacking

---

### CSS

CSS = Cascading Style Sheets

CSS controls

- Colors
- Layout
- Fonts
- Animations
- Positioning

Example

```css
h1{
color:red;
}
```

Without CSS

```
Plain Website
```

With CSS

```
Professional Website
```

Think of CSS as

```
Skin
```

of the human body.

---

#### CSS Controls

- Background
- Padding
- Margin
- Width
- Height
- Font
- Flexbox
- Grid
- Animation

---

#### Security Perspective

Although CSS isn't executable like JavaScript,

attackers sometimes abuse CSS for

- Information leakage
- Clickjacking
- UI Redressing

---

### JavaScript

JavaScript provides

```
Logic
```

It makes websites interactive.

Example

```javascript
button.onclick=function(){
alert("Hello")
}
```

---

JavaScript handles

- Login
- Validation
- Animation
- Dynamic Updates
- API Calls
- Form Checking

Think of JavaScript as

```
Brain
```

of the webpage.

---

#### Examples

Without JavaScript

```
Button
does nothing.
```

With JavaScript

```
Click Button
↓
API Call
↓
Display Data
```

---

#### JavaScript Security

Many attacks involve JavaScript.

Examples

- XSS
- DOM XSS
- CSRF helpers
- Token theft
- Session hijacking

---

## Front-End Summary

| Technology | Purpose |
|------------|----------|
| HTML | Structure |
| CSS | Styling |
| JavaScript | Logic |

Memory Trick

```
HTML
↓
House Skeleton
CSS
↓
Paint
JavaScript
↓
Electricity
```

---

## Back End

Everything hidden from users.

Runs on server.

Responsible for

- Authentication
- Business Logic
- Database
- APIs
- File Storage

---

Example

```
Login
↓
Username Password
↓
Server
↓
Check Database
↓
Return Success
```

---

### Database

The database stores information.

Examples

- Users
- Password Hashes
- Orders
- Products
- Messages
- Comments

Common Databases

| Database | Type |
|-----------|------|
| MySQL | Relational |
| PostgreSQL | Relational |
| MSSQL | Relational |
| Oracle | Enterprise |
| MongoDB | NoSQL |
| Redis | In-memory |

---

#### Security Risks

Poor database security leads to

- SQL Injection
- Data Leakage
- Unauthorized Access
- Credential Theft

---

### Infrastructure

Infrastructure includes everything required to run the application.

Examples

- Web Servers
- Application Servers
- Load Balancers
- DNS
- Storage
- Reverse Proxies
- CDN
- Virtual Machines
- Containers

Example Stack

```
Browser
↓
Cloudflare
↓
Nginx
↓
Node.js
↓
PostgreSQL
```

---

#### Common Infrastructure Components

| Component | Purpose |
|------------|----------|
| Nginx | Reverse Proxy |
| Apache | Web Server |
| IIS | Microsoft Web Server |
| Docker | Containerization |
| Kubernetes | Orchestration |
| AWS EC2 | Virtual Machine |
| Cloudflare | CDN + Protection |

---

### Web Server

The room highlights that the **Web Server** is responsible for hosting and delivering web application content.

Popular Web Servers:

- Apache HTTP Server
- Nginx
- Microsoft IIS
- LiteSpeed
- Caddy

Responsibilities:

- Serve HTML/CSS/JS
- Handle HTTP requests
- Deliver files
- Manage virtual hosts
- Reverse proxy requests
- SSL/TLS termination

---

### Web Browser

The primary tool used to access and interact with web applications is the **Web Browser**.

Examples:

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari
- Brave

For pentesting, browsers are often used with developer tools and proxy tools like Burp Suite.

---

### Web Application Firewall (WAF)

A **WAF (Web Application Firewall)** filters malicious HTTP traffic before it reaches the web server.

```
Attacker
    │
Malicious Request
    │
    ▼
+----------------+
|      WAF       |
+----------------+
    │
 Allowed Request
    ▼
 Web Server
```

A WAF helps protect against:

- SQL Injection
- Cross-Site Scripting (XSS)
- File Inclusion attacks
- Command Injection
- Known malicious payloads

Examples:

- Cloudflare WAF
- AWS WAF
- Azure WAF
- Imperva
- F5 BIG-IP ASM

> **TryHackMe Question Answers (Task 2):**
>
> - Which component on a computer is responsible for hosting and delivering content for web applications? → **Web Server**
> - Which tool is used to access and interact with web applications? → **Web Browser**
> - Which component filters incoming traffic to block malicious attacks? → **Web Application Firewall**

---

## Uniform Resource Locator (URL)

A **URL (Uniform Resource Locator)** is the address used to locate and access a resource on the Internet.

Example:

```text
http://user:password@tryhackme.com:80/view-room?id=1#task3
```

The room breaks this URL into several important parts, which will be covered in detail in the next section.

## Anatomy of a URL

A URL is made up of multiple components. Each part has a specific job in locating and accessing a resource on a web server.

General Format:

```text
scheme://user:password@host:port/path?query#fragment
```

TryHackMe Example:

```text
http://user:password@tryhackme.com:80/view-room?id=1#task3
```

---

### URL Anatomy Diagram

```text
http://user:password@tryhackme.com:80/view-room?id=1#task3
│      │      │             │     │           │      │
│      │      │             │     │           │      └── Fragment
│      │      │             │     │           └──────── Query String
│      │      │             │     └──────────────────── Path
│      │      │             └────────────────────────── Port
│      │      └──────────────────────────────────────── Host / Domain
│      └─────────────────────────────────────────────── User Credentials
└────────────────────────────────────────────────────── Scheme
```

---

## 1. Scheme (Protocol)

The **Scheme** tells the browser **how to communicate** with the server.

Common Schemes:

| Scheme | Description |
|----------|-------------|
| HTTP | HyperText Transfer Protocol |
| HTTPS | Secure HTTP |
| FTP | File Transfer Protocol |
| SSH | Secure Shell |
| WS | WebSocket |
| WSS | Secure WebSocket |

Example:

```text
https://tryhackme.com
```

Scheme:

```text
https
```

---

### HTTP

HyperText Transfer Protocol

Characteristics:

- Plaintext communication
- No encryption
- Easy to intercept
- Fast
- Default Port: **80**

Example

```text
http://example.com
```

---

### HTTPS

HyperText Transfer Protocol Secure

Adds:

- SSL/TLS Encryption
- Authentication
- Integrity
- Confidentiality

Default Port

```text
443
```

Example

```text
https://example.com
```

---

### HTTP vs HTTPS

| HTTP | HTTPS |
|--------|--------|
| Not encrypted | Encrypted |
| Port 80 | Port 443 |
| Less secure | Secure |
| Vulnerable to MITM | Protected using TLS |

---

### Why HTTPS Matters

Without HTTPS:

```
Browser
     │
 Username
 Password
 Cookies
    ↓
 Attacker can sniff traffic
```

With HTTPS:

```
Browser
↓
Encrypted Tunnel (TLS)
↓
Server
```

---

### TLS Handshake (Simplified)

```text
Browser
↓
Hello
↓
Certificate
↓
Key Exchange
↓
Encrypted Connection
↓
HTTP Communication
```

---

### Real-World Example

Never log into:

```text
http://bank.com
```

Always use

```text
https://bank.com
```

---

## 2. User Information

Example

```text
http://admin:password@example.com
```

User Information

```text
admin:password
```

Historically used for authentication.

Nowadays:

Rarely used because

- Credentials become visible
- Stored in browser history
- Logged by proxies
- Security risk

---

### Why It Is Dangerous

Example

```text
http://admin:password@company.com
```

Anyone seeing this URL now knows:

- Username
- Password

This is why modern applications use:

- Login forms
- Sessions
- Tokens
- OAuth

instead.

---

## 3. Host / Domain

Example

```text
https://tryhackme.com
```

Host

```text
tryhackme.com
```

The Host tells the browser:

> Which server should receive the request?

---

### Domain Resolution

```
Browser
↓
DNS Lookup
↓
IP Address
↓
Server
```

Example

```
tryhackme.com
↓
104.x.x.x
```

---

### Domain Components

```
sub.example.com
│      │      │
│      │      └── Top Level Domain
│      └────────── Second Level Domain
└───────────────── Subdomain
```

---

### Top-Level Domains

Examples

- .com
- .org
- .net
- .edu
- .gov
- .io

---

### Security Tip

Always verify domains carefully.

Example

Correct

```text
paypal.com
```

Fake

```text
paypaI.com
```

Notice:

Capital

```text
I
```

instead of

```text
l
```

---

## Typosquatting

The room introduces **Typosquatting**.

Definition:

Registering domain names that look very similar to legitimate websites to trick users.

Examples

```
google.com
↓
gooogle.com
```

```
amazon.com
↓
amaz0n.com
```

```
facebook.com
↓
faceboook.com
```

Purpose

- Credential Theft
- Malware Distribution
- Phishing
- Advertising Fraud

---

### Prevention

Bookmark important websites
Enable HTTPS
Check spelling
Verify certificates

---

> **TryHackMe Question Answer**
>
> Practice of registering look-alike domains?
>
> **Typosquatting**

---

## 4. Port

Every service running on a server listens on a **Port Number**.

Example

```text
https://example.com:8443
```

Port

```text
8443
```

---

### Common Ports

| Port | Service |
|--------|----------|
| 21 | FTP |
| 22 | SSH |
| 23 | Telnet |
| 25 | SMTP |
| 53 | DNS |
| 80 | HTTP |
| 110 | POP3 |
| 143 | IMAP |
| 443 | HTTPS |
| 3306 | MySQL |
| 3389 | RDP |

---

### Why Ports Exist

One server may provide:

- Website
- Database
- SSH
- FTP

All simultaneously.

Ports distinguish them.

```
Server
│
├──80 → HTTP
├──22 → SSH
├──443 → HTTPS
└──3306 → MySQL
```

---

## 5. Path

Example

```text
https://tryhackme.com/room/web-basics
```

Path

```text
/room/web-basics
```

The path identifies:

- File
- Folder
- API Endpoint
- Resource

---

Examples

```
/login
/profile
/settings
/api/users
/images/logo.png
```

---

### Security Risks

Poor validation can lead to:

- Directory Traversal
- Local File Inclusion
- Broken Access Control

Example

```text
../../etc/passwd
```

---

## 6. Query String

Starts with

```text
?
```

Example

```text
/search?q=linux
```

Query

```text
q=linux
```

---

Multiple Parameters

```text
?id=5&user=admin&role=student
```

Parameters

```
id
user
role
```

---

### Uses

- Search
- Filters
- Pagination
- Sorting
- IDs

---

### Security Risks

Never trust user-controlled parameters.

Possible attacks:

- SQL Injection
- XSS
- IDOR
- Parameter Pollution

Example

```text
?id=1 OR 1=1
```

---

> **TryHackMe Question Answer**
>
> URL component for additional information?
>
> **Query String**

---

## 7. Fragment

Starts with

```text
#
```

Example

```text
https://site.com/docs#installation
```

Fragment

```text
installation
```

Used to jump to a section on the page.

---

Example

```
Table of Contents
↓
Click Installation
↓
Browser jumps
↓
#installation
```

Fragments are processed **only by the browser** and are **not sent to the server** in normal HTTP requests.

---

## URL Summary Table

| Component | Purpose |
|-----------|---------|
| Scheme | Protocol |
| User | Authentication (legacy) |
| Host | Server address |
| Port | Service identifier |
| Path | Resource location |
| Query | Extra parameters |
| Fragment | Page section |

---

## URL Processing Flow

```text
User enters URL
↓
Browser parses URL
↓
DNS Lookup
↓
TCP Connection
↓
TLS (HTTPS only)
↓
HTTP Request
↓
Server
↓
HTTP Response
↓
Browser renders page
```

---

## HTTP Messages

HTTP works by exchanging **messages** between the **client (browser)** and the **server**.

There are only two types of HTTP messages:

1. **HTTP Request**
2. **HTTP Response**

```
Browser
   │
   │ HTTP Request
   ▼
Server
   │
   │ HTTP Response
   ▼
Browser
```

HTTP is a **request-response protocol**.

---

## Structure of an HTTP Message

Every HTTP message (request or response) follows a defined format:

```text
Start Line
Headers
<Empty Line>
Body
```

The empty line separates the **headers** from the **body**.

---

### 1. Start Line

The first line of every HTTP message.

It tells what type of message is being sent.

#### Request Example

```http
GET /login HTTP/1.1
```

#### Response Example

```http
HTTP/1.1 200 OK
```

---

### 2. Headers

Headers are **key-value pairs** that provide metadata about the request or response.

Example:

```http
Host: tryhackme.com
Content-Type: application/json
User-Agent: Mozilla/5.0
```

Headers control:

- Content type
- Authentication
- Cookies
- Caching
- Compression
- Security
- Connection behavior

---

### 3. Empty Line

A blank line that indicates:

> "Headers are finished. Body starts now."

Without this separator, the receiver would not know where the headers end.

---

### 4. Body

Contains the actual data being transferred.

Examples:

- Login credentials
- JSON data
- HTML pages
- Images
- API responses
- File uploads

Example Request Body:

```json
{
  "username": "alex",
  "password": "password123"
}
```

---

## Why HTTP Messages Matter

Understanding HTTP messages helps you:

- Analyze web traffic
- Use Burp Suite effectively
- Debug applications
- Build secure APIs
- Identify vulnerabilities such as:
  - SQL Injection
  - XSS
  - CSRF
  - Request Smuggling
  - Header Injection

---

> **TryHackMe Question Answers (Task 4):**
>
> - Which HTTP message is returned by the web server after processing a client's request? → **HTTP Response**
> - What follows the headers in an HTTP message? → **Empty Line**

---

### Quick Revision

```text
URL Components
Scheme
│
Host
│
Port
│
Path
│
Query
│
Fragment
↓
HTTP
↓
Request
↓
Response
```

---

## HTTP Request: Request Line & Methods

An **HTTP Request** is the message sent by the client (browser, mobile app, or API client) to a web server asking it to perform an action.

Every HTTP request starts with the **Request Line**.

---

## HTTP Request Structure

```http
GET /user/login HTTP/1.1
Host: tryhackme.com
User-Agent: Mozilla/5.0
Accept: */*
Connection: keep-alive
<Optional Body>
```

ASCII View

```text
┌─────────────────────────────┐
│ GET /user/login HTTP/1.1    │ ← Request Line
├─────────────────────────────┤
│ Host                        │
│ User-Agent                  │
│ Accept                      │
│ Connection                  │
│ ...                         │ ← Headers
├─────────────────────────────┤
│                             │ ← Empty Line
├─────────────────────────────┤
│ Request Body (Optional)     │
└─────────────────────────────┘
```

---

## Request Line

The **Request Line** is the first line of every HTTP request.

Format

```text
METHOD PATH HTTP_VERSION
```

Example

```http
GET /login HTTP/1.1
```

It contains **three parts**:

1. HTTP Method
2. URL Path
3. HTTP Version

---

## HTTP Methods

HTTP methods define **what action** the client wants the server to perform.

Think of them as commands.

---

### GET

Purpose

Retrieve information from the server.

Example

```http
GET /users
```

Returns

```json
[
  {
    "id":1,
    "name":"Alex"
  }
]
```

Characteristics

- Read-only
- Should not modify data
- Fast
- Most commonly used

Examples

```text
Google Search
Reading news
Viewing products
Opening profile page
```

Security Notes

 Never send

- Passwords
- Tokens
- Secrets

inside URL parameters.

Bad Example

```text
/login?password=admin123
```

URLs may be:

- Logged
- Cached
- Stored in browser history

---

### POST

Purpose

Send data to the server.

Example

```http
POST /login
```

Body

```json
{
  "username":"alex",
  "password":"123456"
}
```

Used for

- Login
- Registration
- Creating records
- Uploading information

Security Notes

Always validate:

- Input
- Length
- Type
- Encoding

to prevent

- SQL Injection
- XSS
- Command Injection

---

### PUT

Purpose

Replace or update an existing resource.

Example

```http
PUT /users/12
```

Body

```json
{
 "name":"John",
 "age":25
}
```

Usually replaces the entire resource.

---

### DELETE

Purpose

Remove an existing resource.

Example

```http
DELETE /users/12
```

Security

Must verify

- Authentication
- Authorization

Never allow anonymous DELETE requests.

---

### PATCH

Purpose

Modify only specific fields.

Example

Current User

```json
{
 "name":"John",
 "age":25,
 "country":"India"
}
```

PATCH

```json
{
 "country":"USA"
}
```

Updated

```json
{
 "name":"John",
 "age":25,
 "country":"USA"
}
```

Only one field changes.

---

### HEAD

Works like GET

BUT

Returns only headers.

Example

```http
HEAD /index.html
```

Useful for

- Checking file existence
- Content-Length
- Last Modified
- Cache validation

without downloading the page.

---

### OPTIONS

Purpose

Ask the server:

> Which HTTP methods are allowed?

Example

```http
OPTIONS /users
```

Possible Response

```text
Allow:
GET
POST
DELETE
```

Used by

- Browsers
- CORS
- API discovery

---

### TRACE

Echoes the received request.

Mainly used for

- Debugging
- Diagnostics

Often disabled because of security risks.

---

### CONNECT

Creates a tunnel between client and server.

Mostly used for

- HTTPS
- Proxy Servers
- VPN tunnels

---

## HTTP Method Summary

| Method | Purpose |
|---------|----------|
| GET | Read data |
| POST | Create data |
| PUT | Replace data |
| PATCH | Update part of data |
| DELETE | Remove data |
| HEAD | Headers only |
| OPTIONS | Show supported methods |
| TRACE | Debugging |
| CONNECT | Secure tunnel |

---

## URL Path

The **Path** tells the server exactly **which resource** the client wants.

Example

```text
https://tryhackme.com/api/users/123
```

Path

```text
/api/users/123
```

Examples

```text
/login
/profile
/dashboard
/api/products
/images/logo.png
```

---

### Security Risks

Attackers often manipulate paths.

Examples

Directory Traversal

```text
../../etc/passwd
```

Broken Access Control

```text
/users/100
↓
/users/101
```

Always

Validate paths

Check permissions

Restrict file access

---

## HTTP Version

The final part of the Request Line.

Example

```http
GET /login HTTP/1.1
```

Version

```text
HTTP/1.1
```

---

### HTTP Evolution

#### HTTP/0.9 (1991)

Features

- GET only
- No headers
- Extremely simple

---

#### HTTP/1.0 (1996)

Introduced

- Headers
- Better content handling
- Basic caching

---

#### HTTP/1.1 (1997)

Still the most widely supported version.

Introduced

- Persistent Connections
- Host Header
- Chunked Transfer Encoding
- Better caching

---

#### HTTP/2 (2015)

Major improvements

- Multiplexing
- Header Compression
- Binary Protocol
- Faster loading

Multiple requests simultaneously.

```
Browser
↓
HTTP/2
↓
Request 1
Request 2
Request 3
↓
Server
```

---

#### HTTP/3 (2022)

Built on

QUIC

instead of TCP.

Advantages

- Faster
- Lower latency
- Better mobile performance
- Improved reliability

---

## HTTP Version Comparison

| Version | Features |
|-----------|----------|
| HTTP/0.9 | GET only |
| HTTP/1.0 | Headers |
| HTTP/1.1 | Persistent Connections |
| HTTP/2 | Multiplexing |
| HTTP/3 | QUIC |

---

## Request Headers

After the Request Line come the **Request Headers**.

Headers provide additional information about the request.

Example

```http
Host: tryhackme.com
User-Agent: Mozilla/5.0
Accept: */*
Connection: keep-alive
```

---

## Common Request Headers

### Host

Specifies the destination server.

Example

```http
Host: tryhackme.com
```

Without Host

The server may not know which website is requested on shared hosting.

---

### User-Agent

Identifies the client software.

Example

```http
User-Agent: Mozilla/5.0
```

Useful for

- Browser compatibility
- Analytics
- Logging

Can also be spoofed.

---

### Referer

Shows where the request originated.

Example

```http
Referer: https://google.com
```

Used for

- Analytics
- Navigation tracking
- CSRF protection

---

### Cookie

Sends previously stored cookies.

Example

```http
Cookie:
sessionid=12345
```

Cookies may contain

- Session IDs
- Login state
- Preferences

---

### Content-Type

Describes the body format.

Example

```http
Content-Type:
application/json
```

Common values

```text
application/json
application/xml
text/plain
multipart/form-data
application/x-www-form-urlencoded
```

---

## HTTP Request Body

The body contains the actual data being sent.

Usually present in

- POST
- PUT
- PATCH

Sometimes

DELETE

Rarely

GET

---

## Body Format 1

### application/x-www-form-urlencoded

Default HTML form encoding.

Example

```text
username=alex&age=27&country=US
```

Characteristics

- Key-value pairs
- '&' separates values
- URL encoded

---

Example Request

```http
POST /profile HTTP/1.1
Content-Type:
application/x-www-form-urlencoded
username=Alex&age=27
```

---

## Body Format 2

### multipart/form-data

Used for

- File uploads
- Images
- Videos
- PDFs

Example

```http
POST /upload
Content-Type:
multipart/form-data
```

Each section is separated by a

Boundary

```text
------WebKitBoundary
```

Supports

- Files
- Text
- Multiple values

---

## Body Format 3

### JSON

Most common for REST APIs.

Example

```json
{
 "name":"Alex",
 "age":27,
 "country":"US"
}
```

Advantages

- Human readable
- Lightweight
- Easy parsing
- Supported everywhere

---

## Body Format 4

### XML

Older structured format.

Example

```xml
<user>
<name>Alex</name>
<age>27</age>
</user>
```

Still used in

- SOAP APIs
- Legacy Enterprise Systems

---

## Body Format Comparison

| Format | Used For |
|----------|----------|
| x-www-form-urlencoded | HTML Forms |
| multipart/form-data | File Upload |
| JSON | REST APIs |
| XML | SOAP / Legacy |

---

## Request Flow

```text
Browser
↓
Request Line
↓
Headers
↓
Empty Line
↓
Body
↓
Server
```

---

## Real-World Examples

Opening YouTube

```http
GET /watch?v=abc
```

Logging in

```http
POST /login
```

Updating Profile

```http
PATCH /profile
```

Deleting Account

```http
DELETE /account
```

Uploading Resume

```http
POST /upload
multipart/form-data
```

---

## Interview Questions

Q1.
Difference between GET and POST?

Answer

GET

- Reads data
- URL parameters
- Cacheable

POST

- Sends body
- Creates data
- Not cached by default

------------------------------------------------------------

Q2.
Difference between PUT and PATCH?

Answer

PUT

Entire resource replaced.

PATCH

Only specified fields updated.

------------------------------------------------------------

Q3.
Why is Host Header important?

Answer

Because one server may host multiple websites.

Host tells the server which website the client wants.

------------------------------------------------------------

Q4.
Why use multipart/form-data?

Answer

To upload binary files like

- Images
- PDFs
- Videos
- ZIP files

------------------------------------------------------------

## Memory Trick

```text
GET
↓
Grab Data
POST
↓
Push Data
PUT
↓
Replace
PATCH
↓
Modify
DELETE
↓
Remove
```

---

## TryHackMe Answers (Tasks 5 & 6)

### Task 5

HTTP version introducing persistent connections?

```text
HTTP/1.1
```

HTTP method that tells supported methods?

```text
OPTIONS
```

Component specifying the requested endpoint?

```text
URL Path
```

---

### Task 6

Header specifying the destination server?

```text
Host
```

Default HTML form encoding?

```text
application/x-www-form-urlencoded
```

Section containing Host, User-Agent and Content-Type?

```text
Request Headers
```

---

## Quick Revision

```text
Request Line
METHOD PATH VERSION
↓
Headers
↓
Empty Line
↓
Body
```

Methods

```text
GET      → Read
POST     → Create
PUT      → Replace
PATCH    → Modify
DELETE   → Remove
HEAD     → Headers Only
OPTIONS  → Allowed Methods
TRACE    → Debug
CONNECT  → Tunnel
```

---

## Practical Task

The final section of the room provides hands-on experience with HTTP requests and responses.

Instead of only learning the theory, you interact directly with a web application and observe how different HTTP methods work.

This reinforces the concepts learned throughout the room.

---

## Objective

Understand how:

- GET requests retrieve data
- POST requests send data
- DELETE requests remove data

while observing the corresponding HTTP responses.

---

## GET Request

A **GET** request is used to retrieve information from the server.

Example

```http
GET /profile HTTP/1.1
Host: example.com
```

Flow

```text
Browser
    │
 GET /profile
    │
    ▼
Server
    │
Fetch Data
    │
    ▼
200 OK
```

Characteristics

- Read-only
- Safe
- Cacheable
- No request body (usually)

Real-world Examples

- Opening Google
- Viewing products
- Reading articles
- Opening GitHub repositories

---

## POST Request

POST sends data to the server.

Example

```http
POST /login HTTP/1.1
Host: example.com
Content-Type: application/json
{
    "username":"alex",
    "password":"Password123"
}
```

Flow

```text
Browser
↓
POST Login
↓
Server
↓
Authenticate
↓
200 OK
```

Common Uses

- Login
- Registration
- Creating blog posts
- Uploading comments
- Creating API resources

---

## DELETE Request

DELETE removes an existing resource.

Example

```http
DELETE /api/users/15 HTTP/1.1
```

Flow

```text
Client
↓
DELETE
↓
Server
↓
Delete Record
↓
204 No Content
```

Security Note

DELETE endpoints should always require

- Authentication
- Authorization
- CSRF Protection (where applicable)
- Logging

---

## Practical Lab Workflow

The TryHackMe lab demonstrates the following sequence:

```text
Client
↓
GET
↓
Read Existing Data
↓
POST
↓
Create New Data
↓
DELETE
↓
Remove Data
↓
Observe Responses
```

The goal is to understand how different HTTP methods behave and how the server responds.

---

## Complete HTTP Lifecycle

One of the most important concepts for interviews and real-world penetration testing.

```text
User
↓
Browser
↓
DNS Resolution
↓
TCP Handshake
↓
TLS Handshake (HTTPS)
↓
HTTP Request
↓
Web Server
↓
Application Logic
↓
Database
↓
Application Logic
↓
HTTP Response
↓
Browser
↓
Render HTML/CSS/JS
↓
User
```

---

## Browser Rendering Process

After receiving the response, the browser performs several steps before displaying the webpage.

```text
Receive HTML
↓
Parse HTML
↓
Download CSS
↓
Download JavaScript
↓
Execute JavaScript
↓
Render DOM
↓
Display Page
```

---

## Where Pentesters Focus

A penetration tester rarely attacks the browser directly.

Instead, they inspect every HTTP request and response.

Typical targets include:

- URL Parameters
- Request Headers
- Cookies
- Authentication Tokens
- Hidden API Endpoints
- File Uploads
- HTTP Methods
- Response Headers
- Error Messages

---

## Burp Suite Workflow

Burp Suite is one of the most important web penetration testing tools.

Typical workflow

```text
Browser
↓
Burp Proxy
↓
Modify Request
↓
Server
↓
Response
↓
Browser
```

Common Burp Modules

- Proxy
- Repeater
- Intruder
- Decoder
- Comparer
- Logger

---

## Useful Browser Developer Tools

Modern browsers provide built-in developer tools.

Shortcut

```text
F12
```

Useful Tabs

- Network
- Console
- Sources
- Storage
- Security
- Application

The **Network** tab is especially valuable because it shows:

- HTTP Requests
- HTTP Responses
- Headers
- Cookies
- Timing
- Response Body
- Status Codes

---

## Common Web Vulnerabilities Related to HTTP

Understanding HTTP is essential because most web attacks manipulate HTTP requests or responses.

---

### SQL Injection

Attackers inject SQL through parameters.

Example

```text
?id=1 OR 1=1
```

---

### Cross-Site Scripting (XSS)

Inject malicious JavaScript into web pages.

Example

```html
<script>alert("XSS")</script>
```

---

### Cross-Site Request Forgery (CSRF)

Tricks a victim into sending unwanted authenticated requests.

Example

```text
Victim Logged In
↓
Malicious Website
↓
Hidden POST Request
↓
Password Changed
```

---

### Insecure Direct Object Reference (IDOR)

Changing identifiers to access unauthorized resources.

Example

```text
/user/10
↓
/user/11
```

---

### Directory Traversal

Manipulating file paths.

Example

```text
../../../../etc/passwd
```

---

### File Upload Vulnerabilities

Uploading executable files instead of images.

Example

```text
shell.php
```

instead of

```text
image.png
```

---

## Mapping to OWASP Top 10

| Vulnerability | HTTP Component Involved |
|--------------|-------------------------|
| Broken Access Control | URL, Cookies |
| Cryptographic Failures | HTTPS |
| Injection | Parameters, Body |
| Insecure Design | Entire Application |
| Security Misconfiguration | Headers |
| Vulnerable Components | Server |
| Authentication Failures | Cookies, Tokens |
| Software Integrity Failures | Downloads |
| Logging Failures | Responses |
| SSRF | URLs |

---

## HTTP Methods vs CRUD

| CRUD | HTTP Method |
|------|-------------|
| Create | POST |
| Read | GET |
| Update | PUT / PATCH |
| Delete | DELETE |

---

## HTTP Request vs HTTP Response

| Request | Response |
|----------|-----------|
| Sent by Client | Sent by Server |
| Contains Method | Contains Status Code |
| Has Request Headers | Has Response Headers |
| Optional Body | Optional Body |

---

## Common Request Headers

| Header | Purpose |
|---------|----------|
| Host | Destination Server |
| User-Agent | Client Software |
| Referer | Previous Page |
| Cookie | Session Data |
| Authorization | Authentication |
| Accept | Expected Response |
| Content-Type | Body Format |

---

## Common Response Headers

| Header | Purpose |
|---------|----------|
| Content-Type | Returned Data Type |
| Content-Length | Response Size |
| Server | Web Server |
| Set-Cookie | Create Cookies |
| Location | Redirect |
| Cache-Control | Caching |
| CSP | Prevent XSS |
| HSTS | Force HTTPS |

---

## Important HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 204 | No Content |
| 301 | Permanent Redirect |
| 302 | Temporary Redirect |
| 304 | Cached Resource |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 405 | Method Not Allowed |
| 500 | Internal Server Error |
| 502 | Bad Gateway |
| 503 | Service Unavailable |
| 504 | Gateway Timeout |

---

## Important Ports

| Port | Service |
|------|----------|
| 21 | FTP |
| 22 | SSH |
| 25 | SMTP |
| 53 | DNS |
| 80 | HTTP |
| 110 | POP3 |
| 143 | IMAP |
| 443 | HTTPS |
| 3306 | MySQL |
| 3389 | RDP |

---

## Memory Tricks

### Web Application

```text
Frontend
↓
Backend
↓
Database
↓
Infrastructure
```

---

### Frontend

```text
HTML
↓
Structure
CSS
↓
Style
JavaScript
↓
Logic
```

---

### URL

```text
Scheme
↓
User
↓
Host
↓
Port
↓
Path
↓
Query
↓
Fragment
```

Remember:

**"Some Users Host Powerful Personal Queries Frequently."**

- **S** → Scheme
- **U** → User
- **H** → Host
- **P** → Port
- **P** → Path
- **Q** → Query
- **F** → Fragment

---

### HTTP Request

```text
Request Line
↓
Headers
↓
Empty Line
↓
Body
```

---

### HTTP Response

```text
Status Line
↓
Headers
↓
Empty Line
↓
Body
```

---

### Status Codes

```text
1xx
Information
2xx
Success
3xx
Redirect
4xx
Client Error
5xx
Server Error
```

---

## Common Beginner Mistakes

 Confusing **HTTP** with **HTML**

 Thinking HTTPS encrypts only passwords (it encrypts the **entire HTTP session** after the TLS handshake)

 Assuming GET requests are always secure

 Sending sensitive data in URL parameters

 Ignoring HTTP response headers during assessments

 Forgetting that fragments (`#section`) are processed by the browser and are **not** normally sent to the server

 Assuming every `200 OK` response means the application is secure

 Ignoring security headers during reconnaissance

---

## Interview Questions

Q1.
Difference between HTTP and HTTPS?

Answer

- HTTP transmits data in plaintext.
- HTTPS uses TLS/SSL to encrypt communication.

------------------------------------------------------------

Q2.
Difference between GET and POST?

Answer

GET retrieves data.

POST submits data.

------------------------------------------------------------

Q3.
Difference between PUT and PATCH?

Answer

PUT replaces the entire resource.

PATCH updates only specific fields.

------------------------------------------------------------

Q4.
Why is the Host header important?

Answer

It tells the server which website the client wants, especially when multiple websites are hosted on the same server (virtual hosting).

------------------------------------------------------------

Q5.
Which HTTP method is idempotent?

Answer

Examples:

- GET
- PUT
- DELETE
- HEAD
- OPTIONS

POST is generally **not idempotent**.

------------------------------------------------------------

Q6.
What does HTTP 404 mean?

Answer

The requested resource does not exist.

------------------------------------------------------------

Q7.
What does HTTP 403 mean?

Answer

The server understood the request, but refuses to authorize it.

------------------------------------------------------------

Q8.
What is CSP?

Answer

**Content-Security-Policy** restricts which resources the browser is allowed to load, helping mitigate XSS.

------------------------------------------------------------

Q9.
What is HSTS?

Answer

**Strict-Transport-Security** forces browsers to use HTTPS for future connections.

------------------------------------------------------------

Q10.
Why are HTTP headers important?

Answer

Headers carry metadata such as authentication, cookies, content type, caching rules, and security policies.

------------------------------------------------------------

## CTF Tips

Always inspect the **Network** tab in Developer Tools.

Capture requests with **Burp Suite**.

Check all request and response headers.

Enumerate hidden API endpoints.

Test every HTTP method (GET, POST, PUT, DELETE, PATCH, OPTIONS).

Inspect cookies, session IDs, and tokens.

Look for verbose error messages and exposed server information.

Review response headers for missing security protections.

Use tools like `curl`, `wget`, Burp Suite, and browser DevTools to understand application behavior.

---

## Quick Revision Cheat Sheet

```text
Web Application
│
├── Frontend
│   ├── HTML
│   ├── CSS
│   └── JavaScript
│
├── Backend
│   ├── Application Logic
│   ├── Database
│   └── APIs
│
└── Infrastructure
    ├── Web Server
    ├── WAF
    └── Network
↓
URL
│
├── Scheme
├── User
├── Host
├── Port
├── Path
├── Query
└── Fragment
↓
HTTP
│
├── Request
│   ├── Request Line
│   ├── Headers
│   ├── Empty Line
│   └── Body
│
└── Response
    ├── Status Line
    ├── Headers
    ├── Empty Line
    └── Body
↓
Security
│
├── HTTPS
├── CSP
├── HSTS
├── X-Content-Type-Options
└── Referrer-Policy
```

---

## Room Completion Summary

In this room, you learned:

- The architecture of modern web applications
- Frontend and backend components
- The purpose of web servers, browsers, databases, and WAFs
- The anatomy of a URL
- HTTP request and response formats
- HTTP methods and status codes
- Request and response headers
- Common request body formats
- Security headers and why they matter
- Practical use of GET, POST, and DELETE requests
- How browsers and servers communicate
- The foundation needed for future web exploitation topics such as:
  - SQL Injection
  - Cross-Site Scripting (XSS)
  - Authentication attacks
  - Session management
  - API security
  - Burp Suite usage
  - OWASP Top 10 vulnerabilities

This room provides the essential groundwork for nearly every web application security assessment and serves as the basis for more advanced web penetration testing techniques.

---

## Useful References

- **TryHackMe Room:** Web Application Basics
- **Security Headers Analyzer:** https://securityheaders.io
- **OWASP Top 10:** https://owasp.org/www-project-top-ten/
- **MDN HTTP Documentation:** https://developer.mozilla.org/docs/Web/HTTP
- **RFC 9110 (HTTP Semantics):** https://www.rfc-editor.org/rfc/rfc9110

---
## 🎉 Room Completed

You now understand the core concepts behind web applications and the HTTP protocol. These fundamentals will be used repeatedly in future topics including web enumeration, authentication testing, session management, API testing, Burp Suite, and exploitation of common web vulnerabilities.

