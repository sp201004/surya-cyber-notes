| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Offensive Security Tooling / Password Attacks |
| **Difficulty** | Easy |
| **Time** | ~45 Minutes |
| **Module** | Offensive Security Tooling |

---

## Objective

**Hydra** is a fast **network login cracker** used to perform **brute-force attacks** against authentication services. Instead of manually trying passwords one at a time, Hydra automates the process by combining a **username**, a **password wordlist**, a **target**, and an **authentication protocol** into a stream of automated login attempts. It is used during **authorized penetration testing** and **CTFs** to test the strength of authentication mechanisms.

```text
Username  +  Password Wordlist  +  Target  +  Authentication Protocol
        ↓
   Automated Login Attempts
```

By the end of this room you will be able to:

- Explain what Hydra is and how brute-force authentication works
- Understand how password wordlists (such as `rockyou.txt`) are used
- Read and build Hydra command syntax
- Brute-force **FTP** and **SSH** services
- Brute-force an **HTTP POST** login form with `http-post-form`
- Use Hydra's **`^USER^`** / **`^PASS^`** placeholders and the **`F=`** failure-response detector
- Enable **verbose** mode, tune **threads**, and target **custom ports**
- Identify web login parameters and understand why weak passwords are compromised

> **Warning:** Hydra is a legitimate penetration-testing and security-auditing tool, but brute-forcing credentials against systems **without authorization** is illegal and can cause service disruption or account lockouts. Only use Hydra against your own systems, authorized penetration-testing targets, TryHackMe machines, CTF environments, and explicitly permitted lab systems.

---

## Task 1 — What Is Hydra?

Hydra is a network login cracker designed to **automate brute-force authentication attacks** against supported network services. Rather than a human typing `password1`, `password2`, `password3`, `password4`, … one after another, Hydra performs the attempts automatically and reports the moment a valid credential is found.

The basic concept is a pipeline: a **username** (e.g. `molly`) plus a **password list** feed into Hydra, which fires attempts at an **authentication service** and branches on the result:

```text
Username (molly)  →  Password List  →  Hydra (automated attempts)  →  Authentication Service
                                                                          ├── FAILED  → continue
                                                                          └── SUCCESS → valid credentials
```

Typical targets include **SSH, FTP, HTTP, HTTPS, SMB, RDP, SMTP, IMAP, SNMP, Telnet, VNC, LDAP, MySQL, PostgreSQL** and many others.

> **Note:** Remember Hydra in one line — **`Username + Wordlist + Target + Service → Hydra → Valid Credentials`**. Every task in this room is a variation on that formula.

---

## Task 2 — Brute Force and Password Wordlists

A **brute-force attack** systematically attempts many possible credentials until a valid combination is discovered. With `Username = molly` and a password list, Hydra walks the list in order:

```text
molly : 123456       → FAIL
molly : password     → FAIL
molly : admin        → FAIL
molly : qwerty       → FAIL
molly : sunshine     → SUCCESS
```

Once the correct credential is found, Hydra reports it. The effectiveness of brute force depends heavily on **password complexity, password length, wordlist quality, account lockout policies, rate limiting, number of threads,** and the **authentication protocol**.

Hydra needs a list of candidate passwords for a dictionary/wordlist-based attack. A common Kali Linux wordlist is `/usr/share/wordlists/rockyou.txt`, which contains commonly used passwords collected from historical password breaches. You can list what's available:

```bash
$ ls /usr/share/wordlists/
rockyou.txt
```

If the wordlist ships compressed as `rockyou.txt.gz`, extract it before use:

```bash
$ sudo gzip -d /usr/share/wordlists/rockyou.txt.gz
```

Then reference the extracted file at `/usr/share/wordlists/rockyou.txt`.

> **Note:** Wordlists are not magic. A password can only be discovered if the candidate password exists somewhere in the tested list or generated search space.

---

## Task 3 — Supported Protocols

According to Hydra's official documentation/repository, Hydra supports many authentication protocols and services. The exact syntax differs between protocols, and **Hydra's options depend on the authentication service being attacked**.

```text
Asterisk · AFP · Cisco AAA · Cisco auth · Cisco enable · CVS · Firebird · FTP
HTTP-FORM-GET · HTTP-FORM-POST · HTTP-GET · HTTP-HEAD · HTTP-POST · HTTP-PROXY
HTTPS-FORM-GET · HTTPS-FORM-POST · HTTPS-GET · HTTPS-HEAD · HTTPS-POST · HTTP-Proxy
ICQ · IMAP · IRC · LDAP · MEMCACHED · MongoDB · MS-SQL · MySQL · NCP · NNTP
Oracle Listener · Oracle SID · Oracle · PC-Anywhere · PCNFS · POP3 · POSTGRES
Radmin · RDP · Rexec · Rlogin · Rsh · RTSP · SAP/R3 · SIP · SMB · SMTP · SMTP Enum
SNMP v1/v2/v3 · SOCKS5 · SSH v1/v2 · SSHKEY · Subversion · TeamSpeak (TS2) · Telnet
VMware-Auth · VNC · XMPP
```

> **Tip:** Do not memorize every protocol. Recognize the common ones for CTFs — **SSH, FTP, and `http-post-form`** — and know that the module name you pass to Hydra selects the attack behaviour.

---

## Task 4 — Why Strong Passwords Matter

Hydra demonstrates why weak passwords are dangerous. A credential like `admin:password` is extremely weak — an attacker does not need sophisticated malware if a service accepts a simple, predictable password, and a large password list can contain millions of commonly used passwords.

```text
Weak Password → Wordlist Attack → Correct Guess → Account Compromise
```

A strong password should generally have **sufficient length, high entropy, unpredictability, unique usage,** and **resistance to common-password guessing**. Avoid predictable values such as `password`, `123456`, `admin`, `qwerty`, `password123`, `companyname`, `username`, and `birthday`.

**Default credentials** are a related risk: many devices, applications and frameworks historically ship with defaults like `admin:password`. If the administrator never changes them, the publicly known username + password lead straight to unauthorized access:

```text
Default Credentials → Publicly Known Username + Password → Unauthorized Access
```

This is particularly dangerous for **IoT devices, CCTV systems, routers, web applications, network appliances,** and **management interfaces**. Always change default credentials during deployment.

---

## Task 5 — Lab Environment and Connecting

The TryHackMe Hydra room provides an **AttackBox** (which already has Hydra installed) connected over the network to a separately deployed **Lab Machine**. Hydra runs on the AttackBox and attacks the lab machine.

```text
┌──────────────┐   Network   ┌──────────────────┐
│  AttackBox   │ ──────────► │   Lab Machine    │
│   (Hydra)    │             │  10.48.158.140   │
└──────────────┘             └──────────────────┘
```

The target IP used in the room is `10.48.158.140`. The AttackBox may have a different IP address — for example, the room interface showed:

```text
AttackBox IP : 10.48.125.158
Target IP    : 10.48.158.140
```

To connect: click **Start AttackBox**, use **Show Split View** if the split view is not visible, then click **Start Lab Machine** (it may take a few minutes to boot). Once running, access its web service at `http://10.48.158.140`.

---

## Task 6 — Installing Hydra

Hydra is already installed on the TryHackMe AttackBox, so you usually do not need to install anything. To install it on another Linux distribution, the room provides examples.

On Debian / Ubuntu:

```bash
$ sudo apt install hydra
```

On Fedora:

```bash
$ sudo dnf install hydra
```

You can also obtain Hydra from its official repository. Verify the installation by displaying the help menu:

```bash
$ hydra -h
```

or:

```bash
$ hydra --help
```

If the help menu appears, Hydra is installed and available.

---

## Task 7 — Command Structure and Options

A generic Hydra command looks like this:

```bash
$ hydra [options] [target] [service]
```

For a username/password brute force:

```bash
$ hydra -l <username> -P <password-list> <target> <service>
```

Conceptually, Hydra takes a **username**, a **password list**, a **target**, a **service**, and optional arguments. The exact syntax depends on the service. The common options used in this room:

| Option | Meaning |
|--------|---------|
| `-l` | Specifies a single username |
| `-L` | Specifies a username list |
| `-p` | Specifies a single password |
| `-P` | Specifies a password list |
| `-t` | Number of parallel tasks/threads |
| `-v` | Verbose output |
| `-V` | Verbose output for every attempt |
| `-s` | Specify a non-default port |
| `-h` | Display help |

> **Note:** `-p` and `-P` are different — `-p` supplies **one password**, while `-P` supplies a **password list**. The same lowercase/uppercase distinction applies to `-l` (single username) versus `-L` (username list).

---

## Task 8 — FTP Brute Force

The room first demonstrates the general syntax using **FTP**. The service can be expressed as a URL scheme (`ftp://`):

```bash
$ hydra -l user -P passlist.txt ftp://10.48.158.140
```

This breaks down as `-l user` (username `user`), `-P passlist.txt` (the password list), and `ftp://10.48.158.140` (the FTP target). Hydra will attempt authentication using the supplied username and each password from the wordlist.

---

## Task 9 — SSH Brute Force (Flag 2)

**SSH** is one of the most common services encountered during CTFs and penetration tests. The room provides this command form, adding `-t 4` to run four parallel tasks:

```bash
$ hydra -l <username> -P <full path to pass> 10.48.158.140 -t 4 ssh
```

An example used in the room:

```bash
$ hydra -l root -P passwords.txt 10.48.158.140 -t 4 ssh
```

The pieces are `-l root` (username `root`), `-P passwords.txt` (password wordlist), `10.48.158.140` (target IP), `-t 4` (four parallel tasks), and `ssh` (attack SSH authentication). For the lab, the room uses the username `molly` and the `rockyou.txt` wordlist:

```bash
$ hydra -l molly -P /usr/share/wordlists/rockyou.txt 10.48.158.140 -t 4 ssh
```

The credential discovered in the lab is username `molly`, password `butterfly`. Connect over SSH, enter that password, and read the flag:

```bash
$ ssh molly@10.48.158.140
$ ls
$ cat flag2.txt
THM{c8eeb0468febbadea859baeb33b2541b}
```

> **Note:** Flag 2 is `THM{c8eeb0468febbadea859baeb33b2541b}`, obtained by brute-forcing molly's SSH password (`butterfly`) and reading `flag2.txt`.

---

## Task 10 — Threading with -t

The `-t` option controls the number of **parallel tasks** Hydra uses. `-t 4` means Hydra can perform four parallel authentication tasks against the target service:

```text
Hydra → [ Task 1 · Task 2 · Task 3 · Task 4 ] → Target Service
```

Higher concurrency can increase speed, but excessive parallelism can cause **network instability, service overload, account lockouts, detection by security systems,** and **failed authentication attempts**. Therefore, choose an appropriate thread count — the room uses `-t 4`.

---

## Task 11 — POST Web Form Brute Force

Hydra can also brute-force web login forms, but web forms are different from services such as SSH. For a form, Hydra needs to understand the **HTTP method**, the **login URL/path**, the **username parameter**, the **password parameter**, and the **failure response**. This room focuses on **HTTP POST**, so the Hydra module is `http-post-form`.

Web applications commonly use **GET** or **POST** requests for form submissions:

> **GET**
> Data is generally included in the URL, e.g. `/login.php?username=molly&password=password123` — the browser sends `GET /login.php?username=...&password=...` to the web server.

> **POST**
> Data is normally sent inside the HTTP request body — the browser sends `POST /login.php` with `username=molly` and `password=password123` in the body.

Hydra needs to know which method the target login form uses; this room focuses on POST authentication.

Before using `http-post-form`, determine how the website processes login data using **browser Developer Tools**, the **Network tab**, the **page source**, **HTML form inspection**, or **intercepting proxy tools**. Look for `<form method="POST">` and identify the input fields:

```xml
<input name="username">
<input name="password">
```

Here the username parameter is `username` and the password parameter is `password`. Also determine what the server returns when authentication **fails** — for example the text `incorrect`. This failure string is important because Hydra uses it to identify failed attempts.

---

## Task 12 — HTTP POST Form Syntax and Placeholders

The generic `http-post-form` syntax passes a colon-separated string describing the form:

```bash
$ hydra -l <username> -P <wordlist> <target> http-post-form \
"<path>:<login_credentials>:<invalid_response>"
```

The room also shows this form (username/wordlist filled in by you):

```bash
$ sudo hydra <username> <wordlist> 10.48.158.140 \
http-post-form "<path>:<login_credentials>:<invalid_response>"
```

A concrete example against the lab machine:

```bash
$ hydra -l <username> -P <wordlist> 10.48.158.140 \
http-post-form "/:username=^USER^&password=^PASS^:F=incorrect" -V
```

The three colon-separated fields, plus the options, map as follows:

| Parameter | Meaning |
|-----------|---------|
| `-l` | Username for the web form login |
| `-P` | Password list |
| `http-post-form` | Tells Hydra the form uses POST |
| `<path>` | Login page URL/path |
| `<login_credentials>` | Username/password fields submitted to the server |
| `<invalid_response>` | Part of the response shown when login fails |
| `-v` | Verbose output |

Hydra substitutes **placeholders** into the request. The username placeholder `^USER^` is replaced by the value from `-l`, and the password placeholder `^PASS^` is replaced by each password from the wordlist in turn:

```text
-l molly     → username=^USER^     becomes  username=molly
^PASS^       → sunshine, butterfly, …       becomes  password=sunshine, password=butterfly, …
```

In the login-credentials string `username=^USER^&password=^PASS^`, `username` and `password` are the web form field names, `^USER^`/`^PASS^` are where Hydra inserts values, and the `&` separates the HTTP form parameters so both are submitted together.

The final field is the **failure detector**, written as `F=<failure-string>`. If the server returns `Login incorrect` on a failed login, you tell Hydra to look for `incorrect`:

```text
F=incorrect  →  if the server response contains "incorrect" → treat the attempt as FAILED
                otherwise → potential SUCCESS
```

This is one of the most important parts of web-form brute forcing: if the failure string is wrong, Hydra may incorrectly report credentials.

> **Note:** In the lab command the path is `/`, meaning the login page is at the root of the web server (`http://10.48.158.140/`). If the login page were `/login.php`, the path would change accordingly, e.g. `http-post-form "/login.php:username=^USER^&password=^PASS^:F=incorrect"`. Always identify the actual login endpoint before running the attack.

---

## Task 13 — Verbose Mode and Custom Ports

Hydra provides **verbose** options. `-v` gives verbose output; `-V` is particularly useful when you want to see **every attempt**:

```bash
$ hydra -l molly -P wordlist.txt 10.48.158.140 \
http-post-form "/:username=^USER^&password=^PASS^:F=incorrect" -V
```

Verbose mode helps during troubleshooting because you can observe each attempt (`Attempt 1`, `Attempt 2`, `Attempt 3`, …) instead of minimal output. Use it carefully, because large wordlists can generate a lot of terminal output.

Sometimes a web server or authentication service does not use its default port. Hydra allows specifying a **custom port** with `-s <port>`:

```bash
$ hydra -l <username> -P <wordlist> 10.48.158.140 \
http-post-form "/:username=^USER^&password=^PASS^:F=incorrect" \
-s <port> -V
```

For example, `-s 8080` means Hydra should target port 8080. If the web server listens on a non-default port, the port can be explicitly specified.

---

## Task 14 — Web Login Brute Force (Flag 1)

Putting the web-form pieces together, the complete web brute-force flow is: **find the login form → identify the HTTP method (GET/POST) → identify the login path (`/` or `/login.php`) → identify the failure string (`incorrect`) → build the Hydra command → run it against the wordlist → recover valid credentials.**

The room asks you to use Hydra to brute-force molly's web password and read flag 1. The discovered web credentials are username `molly`, password `sunshine`. After logging into the web application, Flag 1 is:

```text
THM{2673a7dd116de68e85c48ec0b1f2612e}
```

> **Security relevance:** The same user (`molly`) reuses a weak, common password on both the web app (`sunshine`) and SSH (`butterfly`) — both of which live in `rockyou.txt`. Weak, guessable credentials are exactly what a wordlist attack is built to exploit.

---

## Task 15 — Troubleshooting and Common Mistakes

When an attack does not behave as expected, check each component of the command individually. The most common issues:

> **Problem 1 — Hydra finds nothing**
> Possible causes: wrong username, wrong password wordlist, the correct password is not in the wordlist, wrong service, wrong port, wrong login path, wrong username field, wrong password field, or wrong failure string. Check each component individually.

> **Problem 2 — Web brute force gives false positives**
> Likely cause is a wrong failure condition. If `F=incorrect` but `incorrect` is not actually returned on failed login attempts, Hydra may misunderstand the responses. Always inspect the HTTP response.

> **Problem 3 — SSH connection fails**
> Confirm the service is open with `nmap -p 22 10.48.158.140`. If SSH is not open, Hydra cannot attack it. Check connectivity with `ping 10.48.158.140`, and verify the username and wordlist.

> **Problem 4 — Wordlist does not exist**
> Confirm with `ls -lh /usr/share/wordlists/rockyou.txt`. If necessary, locate it with `find /usr/share/wordlists -name "rockyou*"`.

The room also lists frequent **command mistakes** to avoid:

> **1. Confusing `-p` and `-P`**
> `-p` → single password; `-P` → password list. Do not write `-P password` when you meant a single password.

> **2. Wrong username option**
> `-l` is a single username; `-L` is a username list.

> **3. Wrong service**
> For SSH use `ssh`, for FTP use `ftp`, for POST web forms use `http-post-form`.

> **4. Wrong web form field**
> If the HTML uses `<input name="user">` but Hydra sends `username=^USER^`, the request will not work correctly — the field names must match the application.

> **5. Wrong failure string**
> `F=incorrect` must correspond to something actually returned when login fails.

> **6. Wrong path**
> If the login page is `/login.php`, using `/` may fail.

> **7. Too many threads**
> Increasing `-t 100` does not automatically make an attack better — it can cause service instability, rate limiting, account lockouts, and detection.

---

## Task 16 — Defensive Perspective

Hydra demonstrates why authentication systems need strong defenses. The key controls the room highlights:

> **1. Strong Passwords**
> Use long, unique and unpredictable passwords, and password managers where appropriate. Avoid `password`, `admin`, `123456`, `qwerty`, and `companyname`.

> **2. Account Lockout**
> After repeated failures (`Attempt 1 → FAIL … Attempt 5 → LOCK`), locking the account makes brute-force attacks much harder.

> **3. Rate Limiting**
> Instead of allowing unlimited authentication attempts, a rate limiter allows a few and blocks the source after **too many attempts**.

> **4. MFA**
> Multi-factor authentication adds another layer — even if a password is discovered, the attacker still needs the second factor (`Password + MFA → Authentication`).

> **5. Monitoring**
> Defenders should watch for repeated authentication failures, multiple usernames from one IP, large numbers of login attempts, unusual geographic locations, and abnormal authentication patterns.

Hydra is primarily an **offensive** security tool, but understanding how it works helps defenders detect and prevent password attacks:

| Red Team | Blue Team |
|----------|-----------|
| Identify exposed login service | Monitor authentication |
| Test weak passwords | Enforce strong passwords |
| Use wordlists | Detect repeated failures |
| Test authentication controls | Implement rate limiting |
| Test lockout mechanisms | Configure account lockouts |
| Validate credentials | Deploy MFA |
| Assess attack surface | Monitor source IPs |

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **Hydra** | Fast network login cracker for brute-force / dictionary attacks against auth services |
| **Formula** | `Username + Wordlist + Target + Service → Hydra → Valid Credentials` |
| **Wordlist** | `/usr/share/wordlists/rockyou.txt` (extract `rockyou.txt.gz` with `sudo gzip -d`) |
| **Single vs list** | `-l`/`-p` = single username/password; `-L`/`-P` = username/password list |
| **Threads** | `-t 4` = four parallel tasks; too many causes lockouts/detection |
| **Verbose** | `-v` verbose, `-V` shows every attempt |
| **Custom port** | `-s <port>` (e.g. `-s 8080`) |
| **SSH** | `hydra -l <user> -P <wordlist> <target> -t 4 ssh` |
| **FTP** | `hydra -l <user> -P <wordlist> ftp://<target>` |
| **Web form** | `http-post-form "<path>:<login_credentials>:<invalid_response>"` |
| **Placeholders** | `^USER^` → username, `^PASS^` → password |
| **Failure** | `F=incorrect` marks a response as a failed login |
| **Target IP** | `10.48.158.140` |
| **Flag 1 (web, sunshine)** | `THM{2673a7dd116de68e85c48ec0b1f2612e}` |
| **Flag 2 (SSH, butterfly)** | `THM{c8eeb0468febbadea859baeb33b2541b}` |

**Key idea:** First identify the authentication service and understand how the login request works, then choose the correct Hydra module and build the command around the real authentication parameters.

---

## 30-Second Revision

- **Hydra** is a fast **network login cracker** that automates brute-force/dictionary attacks against services like **SSH, FTP,** and **HTTP POST forms**.
- The mental formula is **`Username + Wordlist + Target + Service → Hydra → Valid Credentials`**.
- Options: `-l`/`-L` (username / list), `-p`/`-P` (password / list), `-t` (threads), `-v`/`-V` (verbose / every attempt), `-s` (custom port).
- **SSH:** `hydra -l molly -P /usr/share/wordlists/rockyou.txt 10.48.158.140 -t 4 ssh` → `molly:butterfly` → `cat flag2.txt`.
- **Web:** `http-post-form "/:username=^USER^&password=^PASS^:F=incorrect"` where `^USER^`/`^PASS^` are placeholders and `F=incorrect` is the failure string → `molly:sunshine`.
- **Flag 1** = `THM{2673a7dd116de68e85c48ec0b1f2612e}`, **Flag 2** = `THM{c8eeb0468febbadea859baeb33b2541b}`.

---

## Cheat Sheet

### Core Hydra Commands

```bash
hydra -h
```

Single username + password list:

```bash
hydra -l <username> -P <wordlist> <target> <service>
```

Username list + password list:

```bash
hydra -L <userlist> -P <wordlist> <target> <service>
```

SSH:

```bash
hydra -l <username> -P <wordlist> <target> ssh
```

SSH with threads:

```bash
hydra -l <username> -P <wordlist> <target> -t 4 ssh
```

FTP:

```bash
hydra -l <username> -P <wordlist> ftp://<target>
```

HTTP POST form:

```bash
hydra -l <username> -P <wordlist> <target> \
http-post-form "/:username=^USER^&password=^PASS^:F=incorrect"
```

Verbose / every attempt:

```bash
hydra -l <username> -P <wordlist> <target> <service> -v
hydra -l <username> -P <wordlist> <target> <service> -V
```

Custom port:

```bash
hydra -l <username> -P <wordlist> <target> \
http-post-form "<form>" -s <port>
```

### Command Reference Table

| Command / Option | Purpose |
|------------------|---------|
| `hydra -h` | Display Hydra help |
| `-l` | Single username |
| `-L` | Username list |
| `-p` | Single password |
| `-P` | Password list |
| `-t` | Parallel tasks |
| `-v` | Verbose mode |
| `-V` | Show every attempt |
| `-s` | Custom port |
| `ssh` | SSH module |
| `ftp` | FTP module |
| `http-post-form` | HTTP POST form module |
| `^USER^` | Username placeholder |
| `^PASS^` | Password placeholder |
| `F=` | Failure condition |

### Key Values from the Room

| Item | Value |
|------|-------|
| **Target IP** | `10.48.158.140` |
| **Example AttackBox IP** | `10.48.125.158` |
| **Wordlist** | `/usr/share/wordlists/rockyou.txt` |
| **Username** | `molly` |
| **Web password** | `sunshine` |
| **SSH password** | `butterfly` |
| **Failure string** | `F=incorrect` |
| **Flag 1 (web)** | `THM{2673a7dd116de68e85c48ec0b1f2612e}` |
| **Flag 2 (SSH)** | `THM{c8eeb0468febbadea859baeb33b2541b}` |

### CTF Methodology

```text
Identify target IP → Scan ports → Identify services → Identify auth endpoints
→ Determine username → Choose wordlist → Build Hydra command
→ Validate successful credentials → Login → Enumerate → Find flags
```

Example reconnaissance before choosing a module:

```bash
$ nmap -sC -sV 10.48.158.140
```

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is Hydra?** | Hydra is a fast network login cracker used to automate brute-force and dictionary attacks against authentication services. |
| **Q2. What is a brute-force attack?** | A brute-force attack systematically tries possible credentials until a valid credential is found. |
| **Q3. What is the difference between -p and -P?** | `-p` → Single password<br>`-P` → Password list |
| **Q4. What is the difference between -l and -L?** | `-l` → Single username<br>`-L` → Username list |
| **Q5. What does -t do?** | It controls the number of parallel tasks Hydra uses. Example: `-t 4` means four parallel tasks. |
| **Q6. What does -V do?** | It displays verbose output for every attempt. |
| **Q7. What is http-post-form?** | It is Hydra's module for brute-forcing HTTP POST login forms. |
| **Q8. What is ^USER^?** | It is Hydra's username placeholder. |
| **Q9. What is ^PASS^?** | It is Hydra's password placeholder. |
| **Q10. What does F=incorrect mean?** | It tells Hydra that the response containing `incorrect` represents a failed authentication attempt. |
| **Q11. Why is the failure string important?** | Because Hydra needs a reliable way to distinguish failed login attempts from successful ones. |
| **Q12. How can you find the parameters of a web login form?** | Use browser developer tools, especially the Network tab, inspect the HTML form, or use an intercepting proxy. |
| **Q13. Why can brute-force attacks fail even with the correct tool?** | Possible reasons: password not present in wordlist<br>incorrect username<br>wrong service<br>wrong port<br>wrong login path<br>wrong form fields<br>wrong failure condition<br>rate limiting / account lockout |

---

## Final Takeaway

**Hydra** is a fast **network login cracker** that turns weak authentication into a single automated formula: **`Username + Wordlist + Target + Service → Hydra → Valid Credentials`**. Point it at a service with `-l`/`-L` for the username, `-P` for a wordlist such as **`rockyou.txt`**, `-t` to tune parallel tasks, and the module name — **`ssh`**, **`ftp`**, or **`http-post-form`** — to select the attack. For web logins the colon-separated form string `"<path>:<login_credentials>:<invalid_response>"` uses the **`^USER^`** and **`^PASS^`** placeholders and an **`F=incorrect`** failure detector, so the failure string must match exactly what the server returns on a bad login. In the lab, brute-forcing **`molly`** yields the web password **`sunshine`** (Flag 1) and the SSH password **`butterfly`** (Flag 2) — both weak, breach-list passwords. The defensive lesson is the mirror image of the attack: **strong passwords, account lockout, rate limiting, MFA,** and **monitoring** are what make brute force impractical. Identify the service first, understand the login request, then build the command around the real authentication parameters — and only ever against **authorized** targets.
