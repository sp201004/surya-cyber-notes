| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Web Hacking / Fundamentals |
| **Difficulty** | Beginner |
| **Time** | ~120 Minutes |
| **Module** | Web Hacking |

---

## Objective

This room builds the foundation of web hacking: what a web application is, how the pieces fit together, and how browsers and servers talk over HTTP. Nearly every modern application — Facebook, Instagram, Gmail, GitHub, Amazon, Netflix, banking sites, and government portals — is a web application, so anyone aiming to become a web pentester, bug bounty hunter, security engineer, SOC analyst, or red teamer must understand HTTP and web architecture first. Everything that follows in web exploitation (SQL injection, XSS, authentication attacks, API security, Burp Suite) rests on the concepts here.

By the end of this room you will be able to:

- Explain what a web application is and how front end and back end differ
- Identify the components of a web application: browser, web server, database, infrastructure, and WAF
- Break a URL down into its parts and explain each one
- Describe the HTTP protocol as a request-response exchange
- Read the structure of HTTP request and response messages
- Use and recognise all the HTTP methods and their purposes
- Interpret common request/response headers, status codes, and body formats
- Recognise the security headers that harden a web application
- Trace a full HTTP lifecycle from URL to rendered page
- Map common web vulnerabilities to the HTTP components they abuse

---

## Task 1 — What Is a Web Application?

A **Web Application** is software that runs on a web server and is accessed through a web browser using the Internet. Unlike desktop applications, users do not install web applications locally — the browser sends a request, the server processes it (often querying a database), and a response comes back to be rendered. Everyday examples include Gmail (email), Facebook (social media), Amazon (e-commerce), GitHub (code hosting), Netflix (streaming), and TryHackMe (learning platform).

```text
User → Browser → Internet → Web Server → Application → Database
```

The basic flow is a round trip: the browser sends an **HTTP Request** to the web server, application logic runs and queries the database if required, and an **HTTP Response** travels back to the browser to be displayed.

```text
Browser ── HTTP Request ──▶ Web Server ──▶ Application Logic ──▶ Database
Browser ◀── HTTP Response ──────────────────────────────────────┘
```

The browser is the **client**: it sends requests, receives responses, renders HTML, runs JavaScript, applies CSS, and manages cookies, cache, and sessions. Common browsers are Chrome, Firefox, Edge, Safari, and Brave. The server stores and serves the website. The split is worth pinning down early:

| Client | Server |
|--------|--------|
| **Browser** | Web Server |
| **Sends requests** | Sends responses |
| **Displays website** | Stores website |
| **User controlled** | Server controlled |

> **Note:** A useful analogy from the room: a web application is like a planet. Users only see the surface (the front end), but underneath, thousands of things — back end, database, infrastructure — work together. Understanding HTTP and web applications is mandatory for any web-security role.

---

## Task 2 — How a User Accesses a Website

When you open `https://tryhackme.com`, a defined sequence of steps runs before you ever see the page. Each step is its own stage in the request-response journey.

| **1** | **Browser receives URL**<br>You type or click a URL and the browser begins processing it. |
| --- | --- |

| **2** | **DNS finds server IP**<br>A DNS lookup resolves the domain name (e.g. `tryhackme.com`) to a server IP address such as `104.x.x.x`. |
| --- | --- |

| **3** | **Browser connects**<br>A TCP connection is opened to the server, followed by a TLS handshake for HTTPS. |
| --- | --- |

| **4** | **HTTP Request sent**<br>The browser sends an HTTP request for the resource. |
| --- | --- |

| **5** | **Server processes request**<br>Application logic on the server handles the request. |
| --- | --- |

| **6** | **Database queried if required**<br>If the request needs stored data, the application queries the database. |
| --- | --- |

| **7** | **HTTP Response returned**<br>The server sends back an HTTP response containing the result. |
| --- | --- |

| **8** | **Browser renders HTML/CSS/JS**<br>The browser parses and renders the HTML, CSS, and JavaScript into the page you see. |
| --- | --- |

> **Tip:** Fragments (`#section`) are processed only by the browser and are not normally sent to the server. Keep that in mind when reasoning about which URL parts actually reach the back end.

---

## Task 3 — Web Application Components

A web application is split into a **Front End** (everything the user sees and interacts with) and a **Back End** (everything hidden, running on the server). The full stack layers from surface to infrastructure.

```text
User → Browser → HTML / CSS / JavaScript → Web Application → Backend Logic → Database → Infrastructure → Firewall
```

### Front End

The front end is built from three core technologies, each with a distinct job — a common memory trick maps them to a house: HTML is the skeleton, CSS is the paint, JavaScript is the electricity.

> **1. HTML (HyperText Markup Language)**
> Provides the **structure** of a webpage — page structure, forms, tables, images, videos, buttons, and links. Without HTML there is no webpage. Improper HTML generation can introduce **XSS**, **HTML Injection**, and **Clickjacking**.

> **2. CSS (Cascading Style Sheets)**
> Controls **styling** — colors, layout, fonts, animations, positioning, background, padding, margin, width, height, Flexbox, and Grid. Not executable like JavaScript, but attackers sometimes abuse CSS for information leakage, clickjacking, and UI redressing.

> **3. JavaScript**
> Provides **logic** and interactivity — login, validation, animation, dynamic updates, API calls, and form checking. Many attacks involve JavaScript: **XSS**, **DOM XSS**, CSRF helpers, token theft, and session hijacking.

A minimal HTML structure and its rendered output:

```xml
<h1>Hello</h1>
<p>Welcome</p>
```

```text
Hello
Welcome
```

| Technology | Purpose |
|------------|---------|
| **HTML** | Structure |
| **CSS** | Styling |
| **JavaScript** | Logic |

### Back End

Everything hidden from the user runs on the server and is responsible for authentication, business logic, database access, APIs, and file storage. A login is the classic example: the browser sends username and password, the server checks the database, and returns success or failure.

```text
Login → Username + Password → Server → Check Database → Return Success
```

The **database** stores information such as users, password hashes, orders, products, messages, and comments. Poor database security leads to **SQL Injection**, data leakage, unauthorized access, and credential theft.

| Database | Type |
|----------|------|
| **MySQL** | Relational |
| **PostgreSQL** | Relational |
| **MSSQL** | Relational |
| **Oracle** | Enterprise |
| **MongoDB** | NoSQL |
| **Redis** | In-memory |

**Infrastructure** includes everything required to run the application: web servers, application servers, load balancers, DNS, storage, reverse proxies, CDN, virtual machines, and containers. A typical stack chains together like this:

```text
Browser → Cloudflare → Nginx → Node.js → PostgreSQL
```

| Component | Purpose |
|-----------|---------|
| **Nginx** | Reverse Proxy |
| **Apache** | Web Server |
| **IIS** | Microsoft Web Server |
| **Docker** | Containerization |
| **Kubernetes** | Orchestration |
| **AWS EC2** | Virtual Machine |
| **Cloudflare** | CDN + Protection |

### The Three Components the Room Tests

The room highlights three components specifically. The **Web Server** hosts and delivers web application content — serving HTML/CSS/JS, handling HTTP requests, delivering files, managing virtual hosts, reverse-proxying requests, and terminating SSL/TLS. Popular web servers are Apache HTTP Server, Nginx, Microsoft IIS, LiteSpeed, and Caddy. The **Web Browser** is the primary tool used to access and interact with web applications (Chrome, Firefox, Edge, Safari, Brave), and for pentesting it is often paired with developer tools and proxy tools like Burp Suite. A **Web Application Firewall (WAF)** filters malicious HTTP traffic before it reaches the web server.

```text
Attacker → Malicious Request → [ WAF ] → Allowed Request → Web Server
```

A WAF helps protect against SQL Injection, Cross-Site Scripting (XSS), File Inclusion attacks, Command Injection, and known malicious payloads. Examples include Cloudflare WAF, AWS WAF, Azure WAF, Imperva, and F5 BIG-IP ASM.

> **Security relevance:** A WAF is a filter, not a fix — it blocks known malicious patterns but does not repair the underlying vulnerability. Treat it as one layer of defence in depth, never the only one.

| Question | Answer |
|---|---|
| **Which component on a computer is responsible for hosting and delivering content for web applications?** | **Web Server** |
| **Which tool is used to access and interact with web applications?** | **Web Browser** |
| **Which component filters incoming traffic to block malicious attacks?** | **Web Application Firewall** |

---

## Task 4 — Uniform Resource Locator (URL)

A **URL (Uniform Resource Locator)** is the address used to locate and access a resource on the Internet. Its general format packs several components into one string, each with a specific job:

```text
scheme://user:password@host:port/path?query#fragment
```

The room's worked example labels every part:

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

The seven components each play a distinct role:

> **1. Scheme (Protocol)**
> Tells the browser **how to communicate** with the server. Common schemes: `HTTP`, `HTTPS`, `FTP`, `SSH`, `WS` (WebSocket), and `WSS` (Secure WebSocket).

> **2. User Information**
> Legacy credentials embedded in the URL, e.g. `http://admin:password@example.com`. Rarely used today because credentials become visible, are stored in browser history, and are logged by proxies. Modern apps use login forms, sessions, tokens, and OAuth instead.

> **3. Host / Domain**
> Tells the browser which server should receive the request, e.g. `tryhackme.com`. A DNS lookup resolves it to an IP address. A domain splits into subdomain, second-level domain, and top-level domain (`sub.example.com`).

> **4. Port**
> The service the request targets on the server, e.g. `:8443`. One server can run a website, database, SSH, and FTP simultaneously; ports distinguish them.

> **5. Path**
> Identifies the exact resource — a file, folder, API endpoint, or resource, e.g. `/room/web-basics`. Poor validation enables **Directory Traversal**, **Local File Inclusion**, and **Broken Access Control**.

> **6. Query String**
> Extra parameters after `?`, e.g. `/search?q=linux`. Multiple parameters are joined with `&` (`?id=5&user=admin&role=student`) and drive search, filters, pagination, sorting, and IDs. Never trust user-controlled parameters — they enable **SQL Injection**, **XSS**, **IDOR**, and **Parameter Pollution**.

> **7. Fragment**
> Starts with `#`, e.g. `#installation`. Used to jump to a section on the page. Processed **only by the browser** and **not sent to the server** in normal HTTP requests.

### Scheme Detail: HTTP vs HTTPS

The two schemes you meet most are HTTP and HTTPS. **HTTP** is plaintext, unencrypted, easy to intercept, fast, and uses default **Port 80**. **HTTPS** adds SSL/TLS encryption, authentication, integrity, and confidentiality on default **Port 443**.

| HTTP | HTTPS |
|------|-------|
| **Not encrypted** | Encrypted |
| **Port 80** | Port 443 |
| **Less secure** | Secure |
| **Vulnerable to MITM** | Protected using TLS |

Without HTTPS, a browser sending a username, password, or cookies can be sniffed by an attacker; with HTTPS everything travels through an encrypted TLS tunnel. The TLS handshake sets this up before any HTTP data flows:

```text
Browser → Hello → Certificate → Key Exchange → Encrypted Connection → HTTP Communication
```

> **Warning:** Never log into `http://bank.com` — always use `https://bank.com`. HTTPS encrypts the entire HTTP session after the TLS handshake, not just the password.

### Common Ports

| Port | Service |
|------|---------|
| **21** | FTP |
| **22** | SSH |
| **23** | Telnet |
| **25** | SMTP |
| **53** | DNS |
| **80** | HTTP |
| **110** | POP3 |
| **143** | IMAP |
| **443** | HTTPS |
| **3306** | MySQL |
| **3389** | RDP |

### Typosquatting

**Typosquatting** is registering domain names that look very similar to legitimate websites to trick users — for example `gooogle.com` for `google.com`, `amaz0n.com` for `amazon.com`, or `faceboook.com` for `facebook.com`. A subtle variant swaps a capital `I` for a lowercase `l`, so `paypaI.com` looks like `paypal.com`. Its purposes are credential theft, malware distribution, phishing, and advertising fraud. Prevent it by bookmarking important websites, enabling HTTPS, checking spelling, and verifying certificates.

> **Tip:** Memory trick for URL order — **"Some Users Host Powerful Personal Queries Frequently"**: **S**cheme, **U**ser, **H**ost, **P**ort, **P**ath, **Q**uery, **F**ragment.

| Question | Answer |
|---|---|
| **What is the practice of registering look-alike domains to legitimate websites?** | **Typosquatting** |
| **Which URL component is used to pass additional information to the server?** | **Query String** |

---

## Task 5 — HTTP Messages

HTTP works by exchanging **messages** between the client (browser) and the server. There are only two types — the **HTTP Request** and the **HTTP Response** — which makes HTTP a **request-response protocol**.

```text
Browser ── HTTP Request ──▶ Server ── HTTP Response ──▶ Browser
```

Every HTTP message, request or response, follows the same defined format, where an empty line separates the headers from the body:

```text
Start Line
Headers
<Empty Line>
Body
```

The four parts each do one job. The **Start Line** is the first line and states what type of message is being sent — a request start line looks like `GET /login HTTP/1.1`, a response start line like `HTTP/1.1 200 OK`. The **Headers** are key-value pairs of metadata controlling content type, authentication, cookies, caching, compression, security, and connection behaviour:

```http
Host: tryhackme.com
Content-Type: application/json
User-Agent: Mozilla/5.0
```

The **Empty Line** is a blank line that signals "headers are finished, body starts now" — without it the receiver cannot tell where headers end. The **Body** carries the actual data: login credentials, JSON data, HTML pages, images, API responses, or file uploads. For example:

```json
{
  "username": "alex",
  "password": "password123"
}
```

> **Security relevance:** Understanding HTTP messages is what lets you analyse traffic, use Burp Suite effectively, debug applications, build secure APIs, and identify vulnerabilities such as SQL Injection, XSS, CSRF, Request Smuggling, and Header Injection.

| Question | Answer |
|---|---|
| **Which HTTP message is returned by the web server after processing a client's request?** | **HTTP Response** |
| **What follows the headers in an HTTP message?** | **Empty Line** |

---

## Task 6 — HTTP Request: Request Line & Methods

An **HTTP Request** is the message sent by the client (browser, mobile app, or API client) to a web server asking it to perform an action. Every request begins with the **Request Line**, followed by headers, an empty line, and an optional body:

```http
GET /user/login HTTP/1.1
Host: tryhackme.com
User-Agent: Mozilla/5.0
Accept: */*
Connection: keep-alive
```

The Request Line itself has three parts in the format `METHOD PATH HTTP_VERSION`, for example `GET /login HTTP/1.1`: the **HTTP Method**, the **URL Path**, and the **HTTP Version**.

### HTTP Methods

HTTP methods define what action the client wants the server to perform — think of them as commands.

| Method | Purpose |
|--------|---------|
| **GET** | Read data |
| **POST** | Create data |
| **PUT** | Replace data |
| **PATCH** | Update part of data |
| **DELETE** | Remove data |
| **HEAD** | Headers only |
| **OPTIONS** | Show supported methods |
| **TRACE** | Debugging |
| **CONNECT** | Secure tunnel |

**GET** retrieves information from the server (e.g. `GET /users`). It is read-only, should not modify data, is fast and cacheable, and is the most commonly used method — Google searches, reading news, viewing products, and opening a profile page all use GET. Never send passwords, tokens, or secrets inside URL parameters (`/login?password=admin123` is a bad example) because URLs may be logged, cached, or stored in browser history.

**POST** sends data to the server (e.g. `POST /login` with a JSON body) and is used for login, registration, creating records, and uploading information. Always validate input, length, type, and encoding to prevent SQL Injection, XSS, and Command Injection.

**PUT** replaces or updates an existing resource, usually the *entire* resource (e.g. `PUT /users/12`). **PATCH** modifies only specific fields — given a user `{name, age, country}`, `PATCH` with `{"country":"USA"}` changes only that one field. **DELETE** removes an existing resource (e.g. `DELETE /users/12`) and must verify authentication and authorization; never allow anonymous DELETE requests.

**HEAD** works like GET but returns only headers — useful for checking file existence, `Content-Length`, `Last Modified`, and cache validation without downloading the page. **OPTIONS** asks the server which HTTP methods are allowed (used by browsers, CORS, and API discovery). **TRACE** echoes the received request for debugging and diagnostics and is often disabled for security reasons. **CONNECT** creates a tunnel between client and server, mostly for HTTPS, proxy servers, and VPN tunnels.

### URL Path and Security

The path tells the server exactly which resource the client wants, e.g. `/api/users/123`. Attackers often manipulate paths — **Directory Traversal** (`../../etc/passwd`) or **Broken Access Control** (changing `/users/100` to `/users/101`) — so always validate paths, check permissions, and restrict file access.

### HTTP Version

The final part of the Request Line is the version, e.g. `HTTP/1.1`. The protocol has evolved through five versions:

> **1. HTTP/0.9 (1991)**
> Extremely simple: GET only, no headers.

> **2. HTTP/1.0 (1996)**
> Introduced headers, better content handling, and basic caching.

> **3. HTTP/1.1 (1997)**
> Still the most widely supported version. Introduced persistent connections, the Host header, chunked transfer encoding, and better caching.

> **4. HTTP/2 (2015)**
> Major improvements: multiplexing, header compression, a binary protocol, and faster loading — multiple requests handled simultaneously.

> **5. HTTP/3 (2022)**
> Built on **QUIC** instead of TCP: faster, lower latency, better mobile performance, and improved reliability.

| Question | Answer |
|---|---|
| **Which HTTP version introduced persistent connections?** | **HTTP/1.1** |
| **Which HTTP method tells the client which methods are supported?** | **OPTIONS** |
| **Which component of the request line specifies the requested endpoint?** | **URL Path** |

---

## Task 7 — HTTP Request: Headers & Body

After the Request Line come the **Request Headers**, which provide additional information about the request. The most common ones each carry a specific piece of metadata.

| Header | Purpose |
|--------|---------|
| **Host** | Destination server (required for virtual hosting) |
| **User-Agent** | Client software identifier |
| **Referer** | Page the request originated from |
| **Cookie** | Previously stored session data |
| **Authorization** | Authentication credentials |
| **Accept** | Response formats the client expects |
| **Content-Type** | Format of the request body |

The **Host** header specifies the destination server (`Host: tryhackme.com`); without it a server may not know which website is requested on shared hosting. **User-Agent** identifies the client software (`User-Agent: Mozilla/5.0`) and can be spoofed. **Referer** shows where the request originated (`Referer: https://google.com`) and is used for analytics, navigation tracking, and CSRF protection. **Cookie** sends previously stored cookies (`Cookie: sessionid=12345`) that may contain session IDs, login state, and preferences. **Content-Type** describes the body format — common values are `application/json`, `application/xml`, `text/plain`, `multipart/form-data`, and `application/x-www-form-urlencoded`.

### HTTP Request Body

The body contains the actual data being sent, usually present in POST, PUT, and PATCH (sometimes DELETE, rarely GET). It comes in several formats.

| Format | Used For |
|--------|----------|
| **application/x-www-form-urlencoded** | HTML Forms |
| **multipart/form-data** | File Upload |
| **JSON** | REST APIs |
| **XML** | SOAP / Legacy |

**`application/x-www-form-urlencoded`** is the default HTML form encoding — key-value pairs where `&` separates values and content is URL encoded (`username=alex&age=27&country=US`). **`multipart/form-data`** is used for file uploads (images, videos, PDFs) where each section is separated by a boundary such as `------WebKitBoundary`. **JSON** is the most common format for REST APIs — human readable, lightweight, easy to parse, and supported everywhere. **XML** is an older structured format still used in SOAP APIs and legacy enterprise systems:

```json
{
 "name":"Alex",
 "age":27,
 "country":"US"
}
```

```xml
<user>
<name>Alex</name>
<age>27</age>
</user>
```

> **Tip:** Method memory trick — GET **G**rabs data, POST **P**ushes data, PUT **R**eplaces, PATCH **M**odifies, DELETE **R**emoves.

| Question | Answer |
|---|---|
| **Which header specifies the destination server?** | **Host** |
| **What is the default HTML form encoding type?** | **application/x-www-form-urlencoded** |
| **Which section contains headers like Host, User-Agent, and Content-Type?** | **Request Headers** |

Some short interview-style questions the room raises alongside the request material:

| Question | Answer |
|---|---|
| **Q1. Difference between GET and POST?** | GET reads data, uses URL parameters, and is cacheable. POST sends a body, creates data, and is not cached by default. |
| **Q2. Difference between PUT and PATCH?** | PUT replaces the entire resource; PATCH updates only the specified fields. |
| **Q3. Why is the Host header important?** | Because one server may host multiple websites, and Host tells the server which website the client wants. |
| **Q4. Why use multipart/form-data?** | To upload binary files such as images, PDFs, videos, and ZIP files. |

---

## Task 8 — HTTP Response: Status Line & Status Codes

Once the server processes a request, it returns an **HTTP Response** built from the same four parts: a **Status Line**, headers, an empty line, and an optional body. The Status Line looks like `HTTP/1.1 200 OK` — the version, a status code, and a reason phrase. Status codes are grouped into five classes by their first digit:

```text
1xx → Information   2xx → Success   3xx → Redirect   4xx → Client Error   5xx → Server Error
```

The codes you meet most often across web assessments:

| Code | Meaning |
|------|---------|
| **200** | Success |
| **201** | Created |
| **204** | No Content |
| **301** | Permanent Redirect |
| **302** | Temporary Redirect |
| **304** | Cached Resource |
| **400** | Bad Request |
| **401** | Unauthorized |
| **403** | Forbidden |
| **404** | Not Found |
| **405** | Method Not Allowed |
| **500** | Internal Server Error |
| **502** | Bad Gateway |
| **503** | Service Unavailable |
| **504** | Gateway Timeout |

> **Warning:** Do not assume every `200 OK` response means the application is secure. A successful status code only means the request was processed — it says nothing about authorization flaws, injection, or data exposure behind it.

---

## Task 9 — HTTP Response: Headers & Security Headers

Response headers describe the returned data and control browser behaviour. The common ones and the security-focused ones are worth separating.

| Response Header | Purpose |
|-----------------|---------|
| **Content-Type** | Returned data type |
| **Content-Length** | Response size |
| **Server** | Web server software |
| **Set-Cookie** | Create cookies |
| **Location** | Redirect target |
| **Cache-Control** | Caching rules |
| **CSP** | Prevent XSS |
| **HSTS** | Force HTTPS |

Security headers harden a web application against common attacks and are prime targets during reconnaissance because their absence is itself a finding.

| Security Header | Purpose |
|-----------------|---------|
| **Content-Security-Policy (CSP)** | Restricts which resources the browser may load, mitigating XSS |
| **Strict-Transport-Security (HSTS)** | Forces browsers to use HTTPS for future connections |
| **X-Content-Type-Options** | Stops MIME-type sniffing |
| **Referrer-Policy** | Controls how much referrer information is sent |

> **Security relevance:** Missing security headers are low-hanging fruit in any assessment. `Content-Security-Policy` and `Strict-Transport-Security` in particular close off whole classes of attack (XSS injection sinks and HTTPS downgrade), so always review response headers for what *isn't* there.

---

## Task 10 — Practical HTTP Requests

The final hands-on section lets you interact directly with a web application and observe how different HTTP methods behave, reinforcing the theory. The objective is to see how **GET** retrieves data, **POST** sends data, and **DELETE** removes data — while watching the corresponding HTTP responses.

A **GET** request retrieves information and is read-only, safe, cacheable, and usually has no request body:

```http
GET /profile HTTP/1.1
Host: example.com
```

```text
Browser → GET /profile → Server → Fetch Data → 200 OK
```

A **POST** request sends data to the server and is used for login, registration, creating blog posts, uploading comments, and creating API resources:

```http
POST /login HTTP/1.1
Host: example.com
Content-Type: application/json
{
    "username":"alex",
    "password":"Password123"
}
```

```text
Browser → POST Login → Server → Authenticate → 200 OK
```

A **DELETE** request removes an existing resource and typically returns `204 No Content`. DELETE endpoints should always require authentication, authorization, CSRF protection (where applicable), and logging:

```http
DELETE /api/users/15 HTTP/1.1
```

```text
Client → DELETE → Server → Delete Record → 204 No Content
```

The lab demonstrates the sequence end to end — read existing data with GET, create new data with POST, remove data with DELETE, and observe the responses at each step:

```text
Client → GET (read) → POST (create) → DELETE (remove) → Observe Responses
```

---

## Task 11 — The Complete HTTP Lifecycle & Where Pentesters Focus

One of the most important concepts for interviews and real-world testing is the full lifecycle of a request from the moment a user acts to the moment the page renders:

```text
User → Browser → DNS Resolution → TCP Handshake → TLS Handshake (HTTPS) → HTTP Request → Web Server → Application Logic → Database → Application Logic → HTTP Response → Browser → Render HTML/CSS/JS → User
```

After receiving the response, the browser runs its own rendering pipeline before displaying the page:

```text
Receive HTML → Parse HTML → Download CSS → Download JavaScript → Execute JavaScript → Render DOM → Display Page
```

A penetration tester rarely attacks the browser directly. Instead they inspect every HTTP request and response, focusing on URL parameters, request headers, cookies, authentication tokens, hidden API endpoints, file uploads, HTTP methods, response headers, and error messages. Two tools dominate this work. **Burp Suite** proxies the browser so you can intercept and modify requests before they reach the server, using modules like Proxy, Repeater, Intruder, Decoder, Comparer, and Logger:

```text
Browser → Burp Proxy → Modify Request → Server → Response → Browser
```

Browser **Developer Tools** (opened with `F12`) provide the Network, Console, Sources, Storage, Security, and Application tabs. The **Network** tab is especially valuable because it shows HTTP requests and responses, headers, cookies, timing, response body, and status codes.

> **Tip:** CTF workflow — inspect the Network tab, capture requests with Burp Suite, check all request and response headers, enumerate hidden API endpoints, test every HTTP method (GET, POST, PUT, DELETE, PATCH, OPTIONS), inspect cookies and tokens, look for verbose error messages, review response headers for missing protections, and use `curl`, `wget`, Burp Suite, and DevTools to understand application behaviour.

---

## Task 12 — Common Web Vulnerabilities Related to HTTP

Understanding HTTP matters because most web attacks manipulate HTTP requests or responses. Each of the classic vulnerabilities abuses a specific HTTP component.

> **1. SQL Injection**
> Attackers inject SQL through parameters, e.g. `?id=1 OR 1=1`.

> **2. Cross-Site Scripting (XSS)**
> Injecting malicious JavaScript into web pages, e.g. `<script>alert("XSS")</script>`.

> **3. Cross-Site Request Forgery (CSRF)**
> Tricks a logged-in victim into sending an unwanted authenticated request (e.g. a hidden POST that changes their password).

> **4. Insecure Direct Object Reference (IDOR)**
> Changing identifiers to access unauthorized resources, e.g. `/user/10` → `/user/11`.

> **5. Directory Traversal**
> Manipulating file paths, e.g. `../../../../etc/passwd`.

> **6. File Upload Vulnerabilities**
> Uploading executable files instead of images, e.g. `shell.php` instead of `image.png`.

These map cleanly onto the **OWASP Top 10** and the HTTP component each one abuses:

| Vulnerability | HTTP Component Involved |
|---------------|-------------------------|
| **Broken Access Control** | URL, Cookies |
| **Cryptographic Failures** | HTTPS |
| **Injection** | Parameters, Body |
| **Insecure Design** | Entire Application |
| **Security Misconfiguration** | Headers |
| **Vulnerable Components** | Server |
| **Authentication Failures** | Cookies, Tokens |
| **Software Integrity Failures** | Downloads |
| **Logging Failures** | Responses |
| **SSRF** | URLs |

HTTP methods also map neatly onto the CRUD operations they perform:

| CRUD | HTTP Method |
|------|-------------|
| **Create** | POST |
| **Read** | GET |
| **Update** | PUT / PATCH |
| **Delete** | DELETE |

> **Warning:** Common beginner mistakes to avoid — confusing HTTP with HTML; thinking HTTPS encrypts only passwords (it encrypts the entire session after the TLS handshake); assuming GET requests are always secure; sending sensitive data in URL parameters; ignoring response headers during assessments; forgetting that fragments (`#section`) are not normally sent to the server; assuming every `200 OK` means the app is secure; and ignoring security headers during reconnaissance.

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **Web application** | Software running on a web server, accessed through a browser over the Internet |
| **Front end** | HTML (structure), CSS (styling), JavaScript (logic) |
| **Back end** | Application logic, database, APIs, infrastructure, WAF |
| **URL parts** | Scheme, User, Host, Port, Path, Query, Fragment |
| **HTTP vs HTTPS** | HTTP is plaintext on port 80; HTTPS is TLS-encrypted on port 443 |
| **HTTP message** | Start Line → Headers → Empty Line → Body (request or response) |
| **Methods** | GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS, TRACE, CONNECT |
| **Status classes** | 1xx info, 2xx success, 3xx redirect, 4xx client error, 5xx server error |
| **Security headers** | CSP, HSTS, X-Content-Type-Options, Referrer-Policy |
| **Fragment** | Processed by the browser; not sent to the server |

**Key idea:** A web application is a front end talking to a back end over HTTP — every request and response is a structured message, and almost every web attack is just a manipulation of one of those messages.

---

## 30-Second Revision

- A web application runs on a web server and is accessed through a browser; the front end (HTML/CSS/JS) is what users see, the back end (logic, database, infrastructure, WAF) is hidden.
- Accessing a site runs URL → DNS → TCP → TLS → HTTP Request → server + database → HTTP Response → render.
- A URL is `scheme://user:password@host:port/path?query#fragment`; the fragment is browser-only and not sent to the server.
- HTTP is plaintext on port 80; HTTPS wraps it in TLS on port 443 and encrypts the whole session.
- Every HTTP message is Start Line → Headers → Empty Line → Body, for both requests and responses.
- Methods: GET reads, POST creates, PUT replaces, PATCH updates part, DELETE removes, plus HEAD, OPTIONS, TRACE, CONNECT.
- Status codes group as 1xx info, 2xx success, 3xx redirect, 4xx client error, 5xx server error.
- Security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy) harden the app; their absence is a finding.
- Body formats: `x-www-form-urlencoded` (forms), `multipart/form-data` (uploads), JSON (APIs), XML (SOAP/legacy).
- Most web vulnerabilities (SQLi, XSS, CSRF, IDOR, Directory Traversal, file upload) are manipulations of HTTP requests or responses.

---

## Cheat Sheet

### URL Components

| Component | Purpose |
|-----------|---------|
| **Scheme** | Protocol |
| **User** | Authentication (legacy) |
| **Host** | Server address |
| **Port** | Service identifier |
| **Path** | Resource location |
| **Query** | Extra parameters |
| **Fragment** | Page section (browser only) |

### HTTP Methods

| Method | Purpose |
|--------|---------|
| **GET** | Read data |
| **POST** | Create data |
| **PUT** | Replace data |
| **PATCH** | Update part of data |
| **DELETE** | Remove data |
| **HEAD** | Headers only |
| **OPTIONS** | Supported methods |
| **TRACE** | Debugging |
| **CONNECT** | Secure tunnel |

### Key Status Codes

| Code | Meaning |
|------|---------|
| **200 / 201 / 204** | OK / Created / No Content |
| **301 / 302 / 304** | Permanent / Temporary Redirect / Cached |
| **400 / 401 / 403 / 404 / 405** | Bad Request / Unauthorized / Forbidden / Not Found / Method Not Allowed |
| **500 / 502 / 503 / 504** | Internal Error / Bad Gateway / Unavailable / Gateway Timeout |

### Common Headers

| Header | Purpose |
|--------|---------|
| **Host** | Destination server |
| **User-Agent** | Client software |
| **Cookie / Set-Cookie** | Session data |
| **Authorization** | Authentication |
| **Content-Type** | Body format |
| **CSP / HSTS** | XSS mitigation / force HTTPS |

### Important Ports

| Port | Service |
|------|---------|
| **21 / 22 / 23** | FTP / SSH / Telnet |
| **25 / 53** | SMTP / DNS |
| **80 / 443** | HTTP / HTTPS |
| **110 / 143** | POP3 / IMAP |
| **3306 / 3389** | MySQL / RDP |

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. Difference between HTTP and HTTPS?** | HTTP transmits data in plaintext; HTTPS uses TLS/SSL to encrypt communication. |
| **Q2. Difference between GET and POST?** | GET retrieves data; POST submits data. |
| **Q3. Difference between PUT and PATCH?** | PUT replaces the entire resource; PATCH updates only specific fields. |
| **Q4. Why is the Host header important?** | It tells the server which website the client wants, especially when multiple websites are hosted on the same server (virtual hosting). |
| **Q5. Which HTTP method is idempotent?** | `GET`, `PUT`, `DELETE`, `HEAD`, and `OPTIONS` are idempotent; POST is generally **not** idempotent. |
| **Q6. What does HTTP 404 mean?** | The requested resource does not exist. |
| **Q7. What does HTTP 403 mean?** | The server understood the request but refuses to authorize it. |
| **Q8. What is CSP?** | **Content-Security-Policy** restricts which resources the browser is allowed to load, helping mitigate XSS. |
| **Q9. What is HSTS?** | **Strict-Transport-Security** forces browsers to use HTTPS for future connections. |
| **Q10. Why are HTTP headers important?** | They carry metadata such as authentication, cookies, content type, caching rules, and security policies. |

## Final Takeaway

A **web application** is a **front end** (HTML, CSS, JavaScript) talking to a **back end** (application logic, database, infrastructure, and a **WAF**) across the Internet, and every conversation between them travels over **HTTP**. A **URL** breaks into scheme, user, host, port, path, query, and fragment, and choosing **HTTPS** over HTTP wraps the whole session in **TLS** encryption. Each HTTP message — request or response — is a structured sequence of a start line, **headers**, an empty line, and a body, and the **HTTP methods** (**GET**, **POST**, **PUT**, **PATCH**, **DELETE**) map directly onto CRUD operations while **status codes** report the outcome. Hardening comes from **security headers** like **CSP** and **HSTS**, and nearly every web attack — **SQL Injection**, **XSS**, **CSRF**, **IDOR**, Directory Traversal — is simply a manipulation of an HTTP request or response. Master this request-response model and you have the groundwork for every advanced web exploitation topic and the OWASP Top 10 that follow.
