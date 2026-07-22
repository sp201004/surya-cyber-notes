## Contents

- [What is HTTP?](#what-is-http)
- [What is HTTPS?](#what-is-https)
- [HTTP vs HTTPS](#http-vs-https)
- [Request & Response Model](#request-&-response-model)
- [URL (Uniform Resource Locator)](#url-uniform-resource-locator)
- [HTTP Request Format](#http-request-format)
- [HTTP Response Format](#http-response-format)
- [HTTP Methods](#http-methods)
- [HTTP Status Codes](#http-status-codes)
- [Important Status Codes](#important-status-codes)
- [HTTP Headers](#http-headers)
- [Common Request Headers](#common-request-headers)
- [Common Response Headers](#common-response-headers)
- [Cookies](#cookies)
- [Complete HTTP Lifecycle](#complete-http-lifecycle)
- [Interview Questions](#interview-questions)
- [Final Summary](#final-summary)

## What is HTTP?
**HTTP (HyperText Transfer Protocol)** is the communication protocol between a web browser (client) and a web server, used to transfer web content like HTML, CSS, JavaScript, images, and videos. Developed by **Tim Berners-Lee (1989–1991)**.

**Features:** Client-Server communication · Stateless protocol · Request-Response model · Runs on **Port 80**.

## What is HTTPS?
**HTTPS (HyperText Transfer Protocol Secure)** is the secure version of HTTP. It encrypts communication using **SSL/TLS**. Default port: **443**.

**Advantages:** Encryption · Data integrity · Authentication · Protection against Man-in-the-Middle (MITM) attacks.

### HTTP vs HTTPS
| HTTP | HTTPS |
|---|---|
| Not Secure | Secure |
| Port 80 | Port 443 |
| No Encryption | SSL/TLS Encryption |
| Vulnerable to Sniffing | Protected |
| Faster | Slightly Slower |

## Request & Response Model
```text
Browser  ---- HTTP Request ---->  Web Server
Browser  <--- HTTP Response ----  Web Server
```

## URL (Uniform Resource Locator)
```text
https://user:password@tryhackme.com:443/blog?id=1#comments
```

| Component | Value | Purpose |
|---|---|---|
| Scheme | `https` | Defines the protocol (HTTP, HTTPS, FTP) |
| User | `user` | Optional username for authentication |
| Password | `password` | Optional password |
| Host | `tryhackme.com` | Domain name or IP address |
| Port | `443` | Service port (HTTP 80, HTTPS 443, FTP 21) |
| Path | `/blog` | Resource location |
| Query String | `?id=1` | Sends parameters |
| Fragment | `#comments` | Navigates to a section of the page |

## HTTP Request Format
```http
GET /blog?id=1 HTTP/1.1
Host: tryhackme.com
User-Agent: Mozilla/5.0
Accept-Encoding: gzip
Cookie: session=abc123
```

## HTTP Response Format
```http
HTTP/1.1 200 OK
Server: nginx
Content-Type: text/html
Content-Length: 98

<html>...</html>
```

## HTTP Methods
| Method | Purpose | Example |
|---|---|---|
| GET | Read data | `GET /profile` |
| POST | Create resource / submit data | `POST /login` |
| PUT | Update existing resource | `PUT /user/5` |
| DELETE | Delete resource | `DELETE /user/5` |

## HTTP Status Codes
| Class | Meaning | Examples |
|---|---|---|
| 1xx | Informational | `100 Continue` |
| 2xx | Success | `200 OK`, `201 Created` |
| 3xx | Redirection | `301 Moved Permanently`, `302 Found` |
| 4xx | Client Errors | `400`, `401`, `403`, `404`, `405` |
| 5xx | Server Errors | `500`, `503` |

### Important Status Codes
| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 301 | Moved Permanently |
| 302 | Found (Temporary Redirect) |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 405 | Method Not Allowed |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

## HTTP Headers
Headers provide extra information between client and server.

### Common Request Headers
| Header | Purpose | Example |
|---|---|---|
| Host | Which website is requested | `Host: tryhackme.com` |
| User-Agent | Browser & OS info | `User-Agent: Firefox/87` |
| Content-Length | Size of request body | `Content-Length: 150` |
| Accept-Encoding | Supported compression | `gzip, br, deflate` |
| Cookie | Stored session information | `Cookie: session=abc123` |

### Common Response Headers
| Header | Purpose | Example |
|---|---|---|
| Set-Cookie | Stores a cookie in the browser | `Set-Cookie: session=abc123` |
| Cache-Control | Controls browser caching | — |
| Content-Type | Type of returned content | `text/html`, `application/json`, `image/png`, `application/pdf` |
| Content-Encoding | Compression used | `gzip` |

## Cookies
Cookies are small pieces of data stored in the browser. Used for: login sessions · user preferences · authentication · shopping carts · "Remember Me".

```text
Login Request (POST /login)
      ↓
Server: Set-Cookie: session=abc123
      ↓
Browser stores cookie
      ↓
Future Requests: Cookie: session=abc123
      ↓
Server: User Authenticated
```

- **Server → Browser:** `Set-Cookie`
- **Browser → Server:** `Cookie`

**Why cookies?** HTTP is **stateless** — without cookies, the server would forget the user on every new request. Cookies solve this.

## Complete HTTP Lifecycle
```text
User enters URL
      ↓
Browser creates HTTP Request
      ↓
DNS Resolution
      ↓
Server processes request
      ↓
HTTP Response (Status Code + Headers + Body)
      ↓
Browser renders webpage
```

## Interview Questions

HTTP vs HTTPS · Why HTTPS is secure · URL components · Request vs Response headers · User-Agent · Host header · Cookie vs Set-Cookie · Why HTTP is stateless · GET vs POST · PUT vs POST · 401 vs 403 · 301 vs 302 · 404 vs 500 · Content-Type · Content-Length · the full Request-Response lifecycle.

## Final Summary

- **HTTP** is a stateless protocol; **HTTPS** encrypts communication using **SSL/TLS**.
- **URLs** identify internet resources; HTTP follows a **Request-Response** model.
- **Headers** carry additional metadata; **cookies** maintain user sessions.
- **Status codes** indicate request outcomes.
- GET retrieves, POST creates, PUT updates, DELETE removes resources.
