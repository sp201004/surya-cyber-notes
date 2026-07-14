## Contents

- [Complete Website Request Flow](#complete-website-request-flow)
- [DNS & HTTP/HTTPS](#dns-&-http/https)
- [Load Balancer](#load-balancer)
- [CDN (Content Delivery Network)](#cdn-content-delivery-network)
- [Database](#database)
- [WAF (Web Application Firewall)](#waf-web-application-firewall)
- [Web Server](#web-server)
- [Root Directory](#root-directory)
- [Virtual Hosts](#virtual-hosts)
- [Static vs Dynamic Content](#static-vs-dynamic-content)
- [Frontend vs Backend](#frontend-vs--backend)
- [Final Request Order (Important)](#final-request-order-important)
- [Quiz Answers](#quiz-answers)
- [Interview Revision](#interview-revision)

> **Objective:** Understand the complete lifecycle of a website request and how all web components work together.

## Complete Website Request Flow
```text
User enters URL
      ↓
Browser checks Local DNS Cache
      ↓
Recursive DNS Server
      ↓
Root DNS Server
      ↓
Authoritative DNS Server
      ↓
Returns Website IP Address
      ↓
WAF (Web Application Firewall)
      ↓
Load Balancer
      ↓
Web Server (Port 80 / 443)
      ↓
Application Logic (Backend)
      ↓
Database
      ↓
HTML + CSS + JavaScript Response
      ↓
Browser Renders Website
```

## DNS & HTTP/HTTPS
- **DNS** converts domain names into IP addresses (`google.com → 142.250.x.x`).
- **HTTP → Port 80**, **HTTPS → Port 443**. Server returns HTML, CSS, JavaScript, images, videos, and fonts, which the browser renders.

## Load Balancer
Distributes incoming traffic among multiple servers.
```text
        Client
          ↓
    Load Balancer
    /     |     \
Server1 Server2 Server3
```
**Benefits:** prevents server overload · high availability · automatic failover · better performance.

| Algorithm | Behavior |
|---|---|
| Round Robin | Requests sent sequentially (S1, S2, S3, S1...) |
| Weighted | Traffic sent to the least busy server |

**Health Check:** the load balancer periodically checks whether servers are alive — healthy servers keep receiving traffic; unhealthy ones are skipped until they recover.

## CDN (Content Delivery Network)
Stores static files (images, CSS, JavaScript, videos, fonts) across servers worldwide, serving them from the nearest server.
```text
User (India) → Nearest CDN Server → Website Loads Faster
```
**Benefits:** faster loading · lower latency · reduced server load · better UX. Examples: Cloudflare CDN, Amazon CloudFront.

## Database
Stores website information permanently: user accounts, passwords, products, orders, blog posts, comments. Popular: MySQL, PostgreSQL, MSSQL, MongoDB.

## WAF (Web Application Firewall)
Positioned between the user and web server (`User → WAF → Web Server`). Protects websites from malicious requests — blocks SQL Injection, XSS, bots, DDoS, and malicious requests.

**Rate Limiting:** limits the number of requests from one IP (e.g. 100 requests/minute; more than the limit → blocked).

## Web Server
Software that accepts HTTP requests and delivers website content. Popular: Apache, Nginx, IIS, Node.js.

### Root Directory
Default folder where website files are stored.
- **Linux:** `/var/www/html`
- **Windows IIS:** `C:\inetpub\wwwroot`

Example: request `example.com/image.jpg` → server reads `/var/www/html/image.jpg`.

### Virtual Hosts
One web server can host multiple websites. The server checks the HTTP **Host Header** and serves the correct site.
```text
            Web Server
        ┌───────┴───────┐
     one.com            two.com
 /var/www/website1   /var/www/website2
```

## Static vs Dynamic Content
| Static | Dynamic |
|---|---|
| Never changes | Changes frequently |
| Faster | Slightly slower |
| No backend needed | Backend required |
| No database | Database often used |
| Images, CSS, logos | Login, dashboard, search results |

## Frontend vs Backend
- **Frontend:** everything visible to the user (HTML, CSS, JS, buttons, images, text) — runs inside the browser.
- **Backend:** runs on the server — login, authentication, database queries, business logic, API calls, dynamic content. Users **cannot** see backend code.

**Backend languages:** PHP, Python, Ruby, Node.js, Perl.
```text
Request: example.com/index.php?name=adam
Backend (PHP): echo $_GET["name"];
Browser receives: Hello Adam
```
The browser never sees the PHP code.

## Final Request Order (Important)
```text
1. User requests website in browser
2. Browser checks Local DNS Cache
3. Query Recursive DNS Server
4. Recursive DNS queries Root DNS Server
5. Root DNS finds Authoritative DNS Server
6. Authoritative DNS returns Website IP
7. Request passes through WAF
8. Request reaches Load Balancer
9. Load Balancer forwards to Web Server (80/443)
10. Web Server receives HTTP GET request
11. Backend communicates with Database
12. Server sends HTML + CSS + JavaScript
13. Browser renders the website
```

## Quiz Answers
| Task | Answers |
|---|---|
| Task 2 | `CDN`, `Health Check`, `WAF` |
| Task 3 | `Virtual Hosts`, `Dynamic`, `Nay` |

## Interview Revision
- DNS converts Domain → IP Address
- HTTP → Port 80 · HTTPS → Port 443
- Load Balancer distributes traffic · Health Check verifies server availability
- CDN stores static files near users
- WAF blocks malicious traffic
- Web Server hosts websites · Virtual Hosts allow multiple sites on one server
- Static content never changes · Dynamic content is generated by the backend
- Frontend runs in the browser · Backend runs on the server and interacts with databases
- The client never sees backend code
