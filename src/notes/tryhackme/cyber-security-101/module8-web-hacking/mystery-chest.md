| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Web Hacking / Bonus Revision |
| **Difficulty** | Beginner |
| **Time** | ~15 Minutes |
| **Module** | Web Hacking |

---

## Objective

This Mystery Chest is a **bonus revision vault** for the entire Web Hacking module. It consolidates the most important reference material from every room — Web Application Basics, JavaScript Essentials, SQL Fundamentals, and Burp Suite: The Basics — into one quick-reference place.

Use it as a lookup before a lab, an exam, or an interview. Everything here was covered across the module: how web applications are structured, the JavaScript that runs in the browser, the SQL that powers the back-end database, and the Burp Suite proxy workflow that ties web pentesting together.

> **Warning:** Every technique below is for use only on web applications you own or have **explicit written authorisation** to test, or inside a CTF/lab. Unauthorised testing of live websites can violate laws and organisational policy.

---

## How a Web Application Works

A web application has two halves: the **front end** that renders in the browser and the **back end** that runs on the server. A request travels from the browser, through DNS and the network, to the web server, which builds a response (often from a database) and sends it back.

| Layer | Runs where | Built with |
|-------|-----------|------------|
| **Front end** | The user's browser | HTML (structure), CSS (style), JavaScript (behaviour) |
| **Back end** | The web server | A server language (PHP, Python, Node.js, etc.), a database, and the web server software |
| **Transport** | Between them | HTTP/HTTPS requests and responses |

> **Security relevance:** Anything sent to the browser — HTML, JS, comments — is fully visible to the user, so the front end can never be trusted for security. All authorisation and validation must be enforced on the back end.

---

## HTTP Requests and Responses

Every interaction is an HTTP request met by an HTTP response. Knowing the common methods and status-code families is essential for reading Burp traffic.

| Method | Purpose |
|--------|---------|
| **GET** | Retrieve a resource |
| **POST** | Submit data to the server |
| **PUT** | Create or replace a resource |
| **DELETE** | Remove a resource |

| Status range | Meaning |
|--------------|---------|
| **1xx** | Informational |
| **2xx** | Success (e.g. `200 OK`) |
| **3xx** | Redirection (e.g. `301`, `302`) |
| **4xx** | Client error (e.g. `401`, `403`, `404`) |
| **5xx** | Server error (e.g. `500`) |

> **Security relevance:** Status codes leak intent — a `403` versus `404` can reveal that a hidden resource exists, and a `500` often exposes an unhandled error worth probing.

---

## Front-End Trio

The three browser languages each own one job, and together they build every page.

| Language | Role | Example |
|----------|------|---------|
| **HTML** | Structure and content | `<h1>Title</h1>`, `<a href="...">` |
| **CSS** | Styling and layout | colours, fonts, positioning |
| **JavaScript** | Behaviour and interactivity | DOM changes, events, fetch requests |

JavaScript runs in the browser, can read and modify the page through the **DOM**, respond to events, and make background HTTP requests. Because it is delivered to the client, an attacker can always read and tamper with it.

> **Security relevance:** Client-side JavaScript checks (e.g. "is this input valid?") are a convenience, not a control — they can be bypassed by editing the request directly, so the server must re-validate everything.

---

## SQL Quick Reference

Web back ends store data in relational databases queried with **SQL**. The core statements recur constantly.

| Statement | Purpose |
|-----------|---------|
| **`SELECT`** | Read rows from a table |
| **`INSERT`** | Add new rows |
| **`UPDATE`** | Modify existing rows |
| **`DELETE`** | Remove rows |

```sql
SELECT * FROM users WHERE username = 'admin';
SELECT name, price FROM products WHERE price < 50 ORDER BY price;
INSERT INTO users (username, password) VALUES ('bob', 'secret');
UPDATE users SET password = 'new' WHERE id = 3;
DELETE FROM users WHERE id = 5;
```

Common clauses shape the result: `WHERE` filters, `ORDER BY` sorts, `LIMIT` caps rows, `LIKE` pattern-matches, and `UNION` combines the results of two `SELECT` statements.

> **Security relevance:** When user input is concatenated straight into a query, an attacker can inject SQL — this is the root of **SQL injection**. Parameterised queries (prepared statements) are the defence; input filtering alone is not enough.

---

## Burp Suite Workflow

**Burp Suite** is an intercepting proxy that sits between the browser and the web server, letting you view, modify, and replay every request. The core tools cover the whole web-testing loop.

| Tool | Purpose |
|------|---------|
| **Proxy** | Intercept and modify requests/responses in transit |
| **Target** | Site map and scope of the application |
| **Repeater** | Manually tweak and resend a single request |
| **Intruder** | Automate/fuzz a request across many payloads |
| **Decoder** | Encode/decode data (URL, Base64, hex, etc.) |
| **Comparer** | Diff two responses to spot subtle changes |

The traffic flows through the proxy, and the browser is pointed at Burp (commonly via the bundled browser or FoxyProxy):

```text
Browser → Burp Proxy (intercept) → Web Server → Response → Burp → Browser
```

> **Security relevance:** Because Burp shows the raw request, it exposes exactly what the browser sends — hidden fields, headers, and cookies — so client-side restrictions can be edited out and the server's real behaviour observed.

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **Web app halves** | Front end (browser: HTML/CSS/JS) vs back end (server + database). |
| **Trust boundary** | Never trust the client; validate and authorise on the server. |
| **HTTP methods** | GET (read), POST (submit), PUT (create/replace), DELETE (remove). |
| **Status codes** | 2xx success, 3xx redirect, 4xx client error, 5xx server error. |
| **JavaScript** | Runs in the browser, manipulates the DOM; always readable/tamperable by the user. |
| **SQL** | `SELECT`/`INSERT`/`UPDATE`/`DELETE`; `WHERE`, `ORDER BY`, `UNION`. |
| **SQL injection** | Caused by concatenating input into queries; fix with parameterised queries. |
| **Burp Suite** | Intercepting proxy — Proxy, Repeater, Intruder, Decoder, Comparer. |

**Key idea:** A web app splits into a browser front end you can always read and a server back end you cannot — so real security lives on the server, and tools like Burp Suite exist to reveal and test exactly what crosses the boundary between them.

---

## 30-Second Revision

- A web application is a front end (HTML/CSS/JavaScript in the browser) plus a back end (server language + database) that talk over HTTP/HTTPS.
- HTTP methods: GET reads, POST submits, PUT creates/replaces, DELETE removes; status codes group into 2xx/3xx/4xx/5xx.
- The front end is fully visible and editable by the user, so all security must be enforced on the back end.
- JavaScript runs in the browser and manipulates the page through the DOM; client-side validation can always be bypassed.
- SQL drives the database: `SELECT`, `INSERT`, `UPDATE`, `DELETE`, with `WHERE`, `ORDER BY`, and `UNION`.
- SQL injection happens when user input is concatenated into a query; parameterised queries are the fix.
- Burp Suite is an intercepting proxy (Proxy, Repeater, Intruder, Decoder, Comparer) that reveals and tampers with the raw traffic.

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is the difference between the front end and the back end of a web application?** | The front end runs in the browser (HTML for structure, CSS for style, JavaScript for behaviour) and is fully visible to the user; the back end runs on the server (application language plus a database) and holds the real logic and data. |
| **Q2. Why can client-side JavaScript validation not be trusted for security?** | Because JavaScript is delivered to and executed in the browser, a user can read, modify, or bypass it entirely (for example by editing the request in Burp), so the server must independently validate every input. |
| **Q3. What causes SQL injection and how is it prevented?** | It occurs when untrusted user input is concatenated directly into an SQL query, letting an attacker change the query's meaning. The primary defence is parameterised queries (prepared statements) that separate code from data. |
| **Q4. What is Burp Suite used for?** | Burp Suite is an intercepting proxy that sits between the browser and server, letting a tester view, modify, replay, and fuzz HTTP requests and responses through tools like Proxy, Repeater, and Intruder. |
| **Q5. What do HTTP status-code families 4xx and 5xx indicate?** | 4xx codes indicate a client-side error such as unauthorised (`401`), forbidden (`403`), or not found (`404`); 5xx codes indicate a server-side error such as an internal server error (`500`). |

## Final Takeaway

The Mystery Chest is your one-page memory aid for the **Web Hacking module**. Skim it before any lab, exam, or interview: the split between a browser **front end** (**HTML**, **CSS**, **JavaScript**) and a server **back end** (application code plus a **SQL** database), the **HTTP** methods and status-code families, the SQL statements and the **SQL injection** risk of concatenating input, and the **Burp Suite** proxy workflow cover the vast majority of what you will meet. Because a web application always exposes its front end to the user while hiding its back end, real security must live on the **server** — and tools like Burp Suite exist precisely to reveal and test what crosses the boundary between the two.
