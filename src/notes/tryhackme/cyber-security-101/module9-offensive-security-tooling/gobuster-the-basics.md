| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Offensive Security Tooling / Enumeration |
| **Difficulty** | Easy |
| **Time** | ~45 Minutes |
| **Module** | Offensive Security Tooling |

---

## Objective

**Gobuster** is an open-source command-line tool written in **Go (Golang)** that performs brute-force based **enumeration** using wordlists. It sits in the reconnaissance and scanning stages of a penetration test, where the goal is to discover resources a target does not advertise on its homepage — hidden directories, files, DNS subdomains and virtual hosts. Its core idea is simple: take every entry in a wordlist, combine it with the target, send a request, and analyse the response. That single loop — **wordlist → request → response → analyse** — is what makes Gobuster the go-to content-discovery tool.

Gobuster can enumerate web directories, web files, DNS subdomains, virtual hosts, Amazon S3 buckets, Google Cloud Storage buckets, TFTP resources and fuzzing targets. The three modes this room focuses on are `dir`, `dns` and `vhost`:

```text
                    GOBUSTER
                       |
          +------------+------------+
          |            |            |
        dir           dns         vhost
          |            |            |
   Directories     Subdomains   Virtual Hosts
      & Files
```

By the end of this room you will be able to:

- Explain what Gobuster is and why enumeration matters in an engagement
- Distinguish **enumeration** from **brute force**, and understand what a **wordlist** is
- Locate common wordlists in Kali Linux under `/usr/share/wordlists/` and `/usr/share/seclists/`
- Run directory/file enumeration with `dir` mode using `-u` and `-w`
- Test file extensions with `-x`, follow redirects with `-r`, and skip TLS checks with `-k`
- Enumerate DNS subdomains with `dns` mode using `-d` and `-w`
- Enumerate virtual hosts with `vhost` mode using `--domain` and `--append-domain`
- Read HTTP status codes and response lengths to spot **false positives** with `--exclude-length`

> **Warning:** Gobuster can generate a large number of requests. Only use it against systems you own, TryHackMe machines, CTF targets, or systems where you have **explicit authorization**. Never scan random public infrastructure without permission.

---

## Task 1 — What Is Gobuster?

The most important concept to anchor first is that **Gobuster is an enumeration tool, not an exploitation framework**. It is written in **Go**, runs from the command line, and uses wordlists to discover resources during the reconnaissance and scanning stages of a penetration test. It does not exploit anything — its job is to build an **attack-surface map** that other tools and manual techniques then act on.

When attacking a web application, the homepage rarely tells you everything that exists on the server. A web server might contain far more than what is linked from the front page:

```text
http://target.thm/
├── index.html
├── admin/
├── login/
├── backup/
├── uploads/
├── api/
├── dev/
└── secret/
```

Some of these paths are not linked anywhere, so manually browsing the site is not enough. For example, a target whose homepage only shows `Welcome to Example Website` might still hide `/admin`, `/login`, `/backup`, `/dev` and `/uploads`. Those resources could expose login panels, configuration files, backup files, development interfaces, sensitive information, API endpoints and potential vulnerabilities. Enumeration is how we discover resources that are not immediately visible.

> **Note:** Remember Gobuster in one line — **"Gobuster discovers what the target does not show you."** Everything else in this room is a variation on wordlist → request → response → analyse.

---

## Task 2 — Enumeration, Brute Force & Wordlists

Two terms are closely related here but should not be confused. **Enumeration** is the process of identifying or listing available resources (`/admin`, `/login`, `/api`, `/uploads`). **Brute force** means systematically trying many possibilities until something matches — like testing every key against a lock until one fits. Gobuster combines the two: it enumerates resources *by* brute-forcing candidate names from a wordlist against the target.

```text
wordlist
   |
   +--> admin
   +--> login
   +--> backup
   +--> images
   +--> secret
   |
   v
Target Web Server
   |
   +--> HTTP Response
```

A **wordlist** is a file containing many possible values that a tool can test. Gobuster takes each word and combines it with the target — turning entries like `admin`, `login`, `dashboard`, `backup` into candidate URLs such as `http://example.thm/admin` and `http://example.thm/login`. The larger and more relevant the wordlist, the more possibilities Gobuster can test.

Kali Linux ships with many useful wordlists. A common location is `/usr/share/wordlists/`, and security-focused wordlists (SecLists) commonly live under `/usr/share/seclists/`. The two wordlists this room uses are:

```text
/usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt
/usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt
```

Other useful directories include `/usr/share/wordlists/dirb/`, `/usr/share/seclists/Discovery/Web-Content/` and `/usr/share/seclists/Discovery/DNS/`.

> **Tip:** Wordlist selection is a tradeoff. A small list (`common.txt`, `small.txt`) is fast, generates less traffic and is good for initial discovery; a medium list (`directory-list-2.3-medium.txt`) gives better coverage; a large list gives extensive coverage but is slow, noisy and produces more false positives. Methodology: **small wordlist → quick discovery → if interesting, escalate to a larger list.**

---

## Task 3 — Gobuster Basics, Help & Global Flags

Gobuster is included by default in many security-focused distributions such as Kali Linux. A few quick commands confirm it is present and show the general help:

```bash
$ gobuster
$ gobuster version
$ gobuster --help
```

The general syntax is `gobuster [command]`. The help menu lists several commands — the ones that matter most in this room are the three enumeration modes:

| Command | Purpose |
|---|---|
| `completion` | Generate shell autocompletion |
| `dir` | Directory/file enumeration |
| `dns` | DNS subdomain enumeration |
| `fuzz` | Fuzzing mode |
| `gcs` | Google Cloud Storage enumeration |
| `help` | Display help |
| `s3` | Amazon S3 bucket enumeration |
| `tftp` | TFTP enumeration |
| `version` | Display current version |
| `vhost` | Virtual host enumeration |

Each mode has its own help page for command-specific flags:

```bash
$ gobuster dir --help
$ gobuster dns --help
$ gobuster vhost --help
```

### Important Global Flags

These flags are useful across Gobuster operations regardless of mode:

| Short Flag | Long Flag | Purpose |
|---|---|---|
| `-t` | `--threads` | Number of concurrent threads |
| `-w` | `--wordlist` | Wordlist to use |
| `--delay` | `--delay` | Delay between requests |
| `--debug` | `--debug` | Enable debug output |
| `-o` | `--output` | Save results to a file |
| `-q` | `--quiet` | Reduce banner/noise |
| `-v` | `--verbose` | More detailed output |
| `-h` | `--help` | Display help |
| `--no-color` | `--no-color` | Disable coloured output |
| `--no-error` | `--no-error` | Hide errors |
| `-z` | `--no-progress` | Disable progress output |

### Threads, Delay, Output & Debug

Four global flags shape *how* a scan runs. Author them as their own concept cards:

> **1. Threads (`-t` / `--threads`)**
> Controls the number of concurrent threads. Gobuster commonly defaults to **10 threads**. More threads means more requests per second (`10 threads → slower`, `64 threads → faster`), but too many can consume local resources, overload the target, trigger rate limiting or intrusion detection, and cause instability. For a controlled CTF `-t 50` or `-t 64` may be acceptable; for a real test, **start low → observe → increase carefully**.

> **2. Delay (`--delay`)**
> Controls how long each thread waits between requests, e.g. `--delay 1500ms`. Some servers detect aggressive enumeration by request pattern, so a delay makes traffic less aggressive (`Request → Wait → Request → Wait`) and reduces server load.

> **3. Output (`-o` / `--output`)**
> Saves results to a file, e.g. `-o gobuster-results.txt`. Useful during longer engagements so you can review or process results later instead of relying only on terminal output.

> **4. Debug (`--debug`)**
> Enables debug output when Gobuster behaves unexpectedly. It helps identify request problems, connection issues, configuration problems and unexpected responses.

### HTTP Status Codes

Gobuster relies heavily on HTTP responses, so reading status codes is essential:

| Status | Meaning |
|---|---|
| `200` | OK / resource exists |
| `301` | Permanent redirect |
| `302` | Temporary redirect |
| `401` | Authentication required |
| `403` | Forbidden |
| `404` | Not Found |
| `500` | Internal Server Error |

A response does not automatically mean a resource is useful. A `403 Forbidden` can actually be valuable because it indicates the server **recognises the resource but refuses access** — so both `/admin → 200` and `/secret → 403` may be interesting, while `/random → 404` usually is not.

> **Note:** Do not follow the naive rule `200 = real, 404 = fake`. Reality is more nuanced — `403` = exists but access denied, `301`/`302` = exists and redirects, `401` = authentication required, `500` = possibly an interesting endpoint, and `200` could just be a generic page. Always investigate context.

---

## Task 4 — Directory and File Enumeration

Gobuster's `dir` mode enumerates directories, files and web application resources. The two essential options are `-u` (target URL) and `-w` (wordlist):

```bash
$ gobuster dir -u http://example.thm -w /path/to/wordlist
```

Directory enumeration is useful because web applications often have predictable structures. A WordPress installation, for example, contains `wp-admin`, `wp-content` and `wp-includes` — so an attacker can probe `http://target.thm/wp-admin`, `http://target.thm/wp-content` and `http://target.thm/wp-includes` even if none are linked.

The URL **must include the protocol** — `http://example.thm` or `https://example.thm`, never a bare `example.thm`. Gobuster needs to know whether to speak HTTP or HTTPS; the wrong protocol can make the scan fail or target the wrong service. The target also does not have to be the site root — `-u http://example.thm/resources` begins enumeration under `/resources`.

### Important `dir` Flags

| Flag | Long Flag | Purpose |
|---|---|---|
| `-u` | `--url` | Target URL |
| `-w` | `--wordlist` | Wordlist |
| `-x` | `--extensions` | File extensions to test |
| `-c` | `--cookies` | Cookies to send |
| `-H` | `--headers` | Custom HTTP headers |
| `-k` | `--no-tls-validation` | Skip TLS certificate validation |
| `-n` | `--no-status` | Hide status codes |
| `-p` | `--password` | Password for authentication |
| `-U` | `--username` | Username for authentication |
| `-s` | `--status-codes` | Status codes to display |
| `-b` | `--status-codes-blacklist` | Status codes to hide |
| `-r` | `--follow-redirect` | Follow HTTP redirects |

### Key `dir` Options in Practice

> **1. File extensions (`-x` / `--extensions`)**
> Tests specific file extensions. With `-x php,js`, a wordlist entry like `admin` is tested as `/admin`, `/admin.php` **and** `/admin.js`. This exposes files that would otherwise stay hidden. Other useful extensions include `txt`, `html`, `bak`, `zip`, `conf`, `old`.

> **2. Follow redirects (`-r` / `--follow-redirect`)**
> A server may return `HTTP/1.1 301` with `Location: /login`. Without `-r`, Gobuster only reports the redirect; with `-r`, it follows the redirect to the destination.

> **3. Skip TLS validation (`-k` / `--no-tls-validation`)**
> Skips TLS certificate validation — useful in CTF environments that use a **self-signed certificate** your system does not trust. Do not blindly disable TLS validation in real environments; it removes an important security check.

> **4. Cookies & headers (`-c`, `-H`)**
> `-c "session=abcdef123456"` sends cookies (useful when the app needs a session); `-H "X-Custom-Header: value"` sends custom headers for apps that depend on specific HTTP headers.

> **5. Status filtering (`-s`, `-b`, `-n`)**
> `-s 200,301,302` displays only those status codes; `-b 404` blacklists status codes; `-n` hides status codes entirely for cleaner output.

> **6. Authentication (`-U`, `-p`)**
> `-U admin -p password123` sends credentials for enumerating an authenticated application. Only use credentials you are authorized to use.

A very important point: **Gobuster `dir` mode is not recursive by default.** If it discovers `/admin`, it does *not* automatically continue into `/admin/users` or `/admin/config`. You must manually re-run it against the discovered directory:

```bash
$ gobuster dir -u http://example.thm/admin -w wordlist.txt
```

### Practical CTF Example

A complete `dir` command combining a wordlist, extensions and redirect following:

```bash
$ gobuster dir \
-u "http://www.example.thm" \
-w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt \
-x php,js \
-r
```

Running a smaller scan against a target might produce output like this:

```bash
$ gobuster dir -u http://10.10.10.10 -w /usr/share/wordlists/dirb/common.txt
/admin          (Status: 301)
/login.php      (Status: 200)
/backup         (Status: 403)
/images         (Status: 301)
```

Gobuster only discovers *candidates* — manual validation determines what they actually contain. Follow up interesting results with `curl`:

```bash
$ curl -i http://10.10.10.10/admin
$ curl -i http://10.10.10.10/login.php
$ curl -i http://10.10.10.10/backup
```

### Room Findings

The room demonstrated enumeration against `www.offensivetools.thm`. The TLS-validation flag required to skip certificate verification was `--no-tls-validation`. A discovered directory of interest was `secret`, and further enumeration of that directory revealed a JavaScript file containing the flag:

```text
THM{ReconWasASuccess}
```

> **Security relevance:** Directory enumeration is often only the first step: `Initial scan → /secret → enumerate /secret → interesting .js file → flag`. Discovering a directory is an invitation to enumerate deeper, not the finish line.

---

## Task 5 — Subdomain (DNS) Enumeration

Gobuster's `dns` mode enumerates DNS subdomains for a target domain. The essential flags are `-d` (domain) and `-w` (wordlist):

```bash
$ gobuster dns -d example.thm -w /path/to/wordlist
```

Subdomain enumeration matters because a company may expose multiple services through different subdomains (`www`, `mail`, `api`, `dev`, `admin`). The main website may be secure while a development subdomain is misconfigured — so **a vulnerability patched on the main domain may still exist on a subdomain**.

DNS enumeration is different from directory enumeration. Directory enumeration tests web *paths* (`http://example.thm/admin`); DNS enumeration tests *hostnames* (`admin.example.thm`). Gobuster combines each wordlist entry with the domain to build FQDNs, then performs a DNS lookup on each:

```text
                example.thm
                    |
          +---------+---------+
          |                   |
       Web Paths           Subdomains
          |                   |
          v                   v
      /admin             admin.example.thm
      /login             dev.example.thm
      /backup             api.example.thm
```

### Important `dns` Flags

| Short Flag | Long Flag | Purpose |
|---|---|---|
| `-d` | `--domain` | Target domain |
| `-w` | `--wordlist` | Subdomain wordlist |
| `-c` | `--show-cname` | Show CNAME records |
| `-i` | `--show-ips` | Show resolved IP addresses |
| `-r` | `--resolver` | Use a custom DNS resolver |

> **1. Target domain (`-d` / `--domain`)**
> Specifies the domain to enumerate. If the wordlist contains `www`, `shop`, `api`, `dev`, Gobuster checks `www.example.thm`, `shop.example.thm`, `api.example.thm`, `dev.example.thm`.

> **2. Show IPs (`-i` / `--show-ips`)**
> Displays the IP addresses that discovered subdomains resolve to — extra information about the infrastructure.

> **3. Show CNAME (`-c` / `--show-cname`)**
> Displays CNAME records. A CNAME can reveal that a hostname points to another hostname (`app.example.thm → CNAME → service.provider.thm`), useful for infrastructure recon.

> **4. Custom resolver (`-r` / `--resolver`)**
> Specifies a custom DNS server, e.g. `-r 8.8.8.8`. A resolver translates domain names into IP addresses.

### Practical DNS Enumeration

The room example, plus the IP and CNAME variants:

```bash
$ gobuster dns \
-d example.thm \
-w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt

$ gobuster dns \
-d example.thm \
-w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt \
-i

$ gobuster dns \
-d example.thm \
-w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt \
-c
```

A scan against the `subdomains-top1million-5000.txt` list processes almost all entries (`Progress: 4989 / 4990`) and reports resolved hostnames:

```bash
$ gobuster dns -d example.thm -w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt
Found: www.example.thm
Found: shop.example.thm
Found: academy.example.thm
Found: primary.example.thm
```

### Room Findings

The room asked how many subdomains were configured for `www.offensivetools.thm`. The practical enumeration demonstrated **4 configured subdomains**. The key lesson: subdomain enumeration can reveal additional application surfaces that are not obvious from the main website.

> **Note:** For the basic DNS command the essential flags are just `-d` and `-w` — `dns → mode`, `-d → domain`, `-w → wordlist`.

---

## Task 6 — VHost Enumeration

The third mode, `vhost`, enumerates **virtual hosts** — multiple websites running on the same server/IP. The web server decides which site to serve based on the HTTP `Host` header, so the same IP (`10.10.10.10`) can serve `Website A` for `www.example.thm` and `Website B` for `admin.example.thm`, even though both share the same IP, server and network interface.

### VHost vs Subdomain — the Key Difference

This distinction is essential. A **subdomain** is configured through **DNS** (`api.example.thm → 10.10.10.10`). A **virtual host** is configured at the **web-server level**, and the server uses the HTTP `Host` header to decide which site responds:

```text
DNS Mode                     VHost Mode
   |                            |
   v                            v
DNS Lookup                   HTTP Request
   |                            |
   v                            v
FQDN                         Host Header
   |                            |
   v                            v
Does DNS resolve?            Which virtual website responds?
```

Gobuster's `vhost` mode sends multiple HTTP requests to the same IP, changing only the `Host:` header each time, and compares the responses:

```http
GET / HTTP/1.1
Host: www.example.thm
User-Agent: gobuster/3.6
Accept: text/html
Connection: keep-alive
```

### Important `vhost` Flags

| Short Flag | Long Flag | Purpose |
|---|---|---|
| `-u` | `--url` | Base target URL |
| | `--append-domain` | Append domain to each word |
| `-m` | `--method` | HTTP method |
| | `--domain` | Domain used to construct hostname |
| | `--exclude-length` | Filter responses by body length |
| `-r` | `--follow-redirect` | Follow redirects |
| `-w` | `--wordlist` | Wordlist |

> **1. Target URL (`-u` / `--url`)**
> Specifies the target URL/IP. Unlike DNS enumeration, the target can be an **IP address** (`-u "http://10.48.145.182"`) — especially useful because multiple virtual hosts may sit behind one IP.

> **2. Domain (`--domain`)**
> Specifies the domain used when constructing the `Host` header. With `--domain example.thm` and wordlist entries `www`, `blog`, `shop`, Gobuster constructs `www.example.thm`, `blog.example.thm`, `shop.example.thm`.

> **3. Append domain (`--append-domain`)**
> Appends the configured domain to each wordlist entry. Without it Gobuster may test raw values like `www`, `blog`, `shop`; with it, the intended hostnames `www.example.thm`, `blog.example.thm`, `shop.example.thm`. This is important for correct VHost enumeration.

> **4. Exclude length (`--exclude-length`)**
> Filters results by HTTP response **body size** to remove false positives. If invalid hosts consistently return the same size, exclude it: `--exclude-length 279`.

### Practical VHost Enumeration

The room demonstrated an IP-based command constructing hostnames from a subdomain wordlist:

```bash
$ gobuster vhost \
-u "http://10.48.145.182" \
--domain example.thm \
-w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt \
--append-domain
```

Results include the discovered hosts with their status code and response size — different sizes can indicate genuinely different virtual hosts:

```bash
$ gobuster vhost -u "http://10.48.145.182" --domain example.thm -w /usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt --append-domain
Found: blog.example.thm Status: 200 [Size: 1493]
Found: shop.example.thm Status: 200 [Size: 2983]
Found: www.example.thm
Found: academy.example.thm
```

### False Positives and `--exclude-length`

Some servers return the same response for unknown hostnames. If both `Host: random.example.thm` and `Host: random123.example.thm` return `HTTP 404` with `Size: 279`, every result at that size is noise (`Found: Orion.example.thm Status: 404 [Size: 279]`). Confirm the baseline with a deliberately fake host, then exclude that size:

```bash
$ curl -i -H "Host: definitely-not-real.example.thm" http://10.10.10.10/
```

```bash
$ gobuster vhost \
-u http://10.10.10.10 \
--domain example.thm \
-w wordlist.txt \
--append-domain \
--exclude-length 279
```

Because two responses can share a status code but mean different things, VHost analysis should compare **status code + response length + content** together, never status code alone.

### Manual VHost Validation

Never blindly trust scanner output. Validate a discovered host by sending the `Host` header manually with `curl` and comparing status code, content length, page title, headers, redirect location and body:

```bash
$ curl -i -H "Host: blog.example.thm" http://10.10.10.10/
$ curl -i -H "Host: www.example.thm" http://10.10.10.10/
```

### VHost vs DNS — Deep Comparison

| Feature | `dns` | `vhost` |
|---|---|---|
| Main purpose | Discover DNS subdomains | Discover virtual hosts |
| Protocol | DNS | HTTP |
| Primary target | Domain | URL/IP |
| Mechanism | DNS lookup | HTTP request |
| Important value | FQDN | `Host:` header |
| Typical flag | `-d` | `-u` |
| Wordlist | Subdomain names | Hostname candidates |
| Can share same IP? | Yes | Yes |
| Finds web-server-only hosts? | Not necessarily | Yes |

> **Tip:** The memory hook — **DNS asks "Does this name resolve?"** and **VHost asks "What website answers for this Host header?"** DNS enumeration may miss hosts that exist only at the web-server level, which is exactly where VHost enumeration shines.

---

## Task 7 — Enumeration Methodology & Common Mistakes

Gobuster is one part of a larger methodology, not a complete solution. A practical CTF reconnaissance sequence chains the modes together with manual validation:

```text
1. Identify IP → 2. Identify domains → 3. Directory enumeration
→ 4. DNS subdomain enumeration → 5. VHost enumeration
→ 6. Manually validate discoveries → 7. Enumerate discovered paths/hosts again
```

A typical toolkit places Gobuster after service discovery and before manual testing: `Nmap → service discovery → Gobuster (dirs / files / subdomains / vhosts) → Burp Suite → manual web testing → Nuclei / other scanners → exploitation`. Gobuster's job is `DISCOVER → ENUMERATE → MAP ATTACK SURFACE`; it does **not** exploit vulnerabilities, test for SQL injection or XSS, bypass authentication, understand application logic, or replace manual testing.

### Common Mistakes to Avoid

> **1. Forgetting `-w` or `-u`**
> `gobuster dir -u http://example.thm` (no wordlist) or `gobuster dir -w wordlist.txt` (no URL) both fail. Always supply both: `gobuster dir -u http://example.thm -w wordlist.txt`.

> **2. Wrong protocol**
> `gobuster dir -u example.thm` is wrong — include the scheme: `gobuster dir -u http://example.thm`.

> **3. Using DNS mode for directories (or confusing DNS and VHost)**
> Use `dir` for `/admin`, `/login`, `/backup`; use `dns` for subdomains. DNS mode does a DNS lookup, VHost mode uses the HTTP `Host` header — they are not identical.

> **4. Ignoring false positives**
> Do not assume every `200` is a real page. A server returning the same generic page for random paths means `200` is meaningless — always validate.

> **5. Too many threads**
> Blindly using `-t 500` increases network load, server load, detection, rate limiting and instability. Reduce threads or add `--delay 500ms` in sensitive environments.

> **6. Forgetting extensions, redirects and deeper enumeration**
> A scan may find `/config` when the real resource is `/config.php` (`-x php`); a result may redirect `/admin → /admin/` (`-r`); and finding `/secret` means you should re-scan `http://example.thm/secret`, not stop.

> **Security relevance:** A good workflow is never `run tool → trust output`. It is `run enumeration → observe results → identify anomalies → filter false positives → manually validate → enumerate deeper → map the attack surface`.

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **Gobuster** | Open-source Go-based enumeration tool that brute-forces resources using wordlists |
| **Modes** | `dir` (directories/files), `dns` (subdomains), `vhost` (virtual hosts) |
| **dir syntax** | `gobuster dir -u URL -w WORDLIST` |
| **dns syntax** | `gobuster dns -d DOMAIN -w WORDLIST` |
| **vhost syntax** | `gobuster vhost -u URL --domain DOMAIN -w WORDLIST --append-domain` |
| **Wordlist / URL** | `-w` = wordlist, `-u` = target URL (must include `http://` or `https://`) |
| **Threads** | `-t` (default **10**); more = faster but noisier |
| **Extensions** | `-x php,js` tests `admin.php`, `admin.js`, etc. |
| **Redirects** | `-r` follows HTTP redirects |
| **TLS skip** | `-k` / `--no-tls-validation` for self-signed certs |
| **DNS extras** | `-d` domain, `-i` show IPs, `-c` show CNAMEs |
| **VHost extras** | `--domain` + `--append-domain` build hostnames; `--exclude-length` filters false positives |
| **Recursion** | Gobuster `dir` is **not** recursive — re-scan discovered directories manually |
| **Status codes** | `403` = exists but denied (interesting); `200` can be a generic false positive |
| **Room flag** | `THM{ReconWasASuccess}` (found in a `.js` file under `secret`) |

**Key idea:** Gobuster gives you an attack-surface map by combining a wordlist with a target and analysing every response — mapping paths, subdomains and virtual hosts that the site never advertises.

---

## 30-Second Revision

- **Gobuster** is a Go-based enumeration tool that brute-forces resources from **wordlists**; it discovers, it does not exploit.
- Three modes: **`dir`** (web directories/files), **`dns`** (DNS subdomains), **`vhost`** (virtual hosts).
- `dir` needs **`-u`** (URL, with protocol) and **`-w`** (wordlist); add **`-x`** for extensions, **`-r`** for redirects, **`-k`** for self-signed TLS.
- `dns` needs **`-d`** (domain) and **`-w`**; **`-i`** shows IPs, **`-c`** shows CNAMEs.
- `vhost` targets an **IP** with **`--domain`** + **`--append-domain`**; **`--exclude-length`** filters false positives by response size.
- **DNS** asks "does this name resolve?"; **VHost** asks "what site answers for this Host header?"
- Gobuster is **not recursive** — re-scan discovered directories; `403` can be a real protected resource; `200` can be a generic false positive.
- Room result: `www.offensivetools.thm`, **4 subdomains**, `--no-tls-validation`, `secret` directory → flag **`THM{ReconWasASuccess}`**.

---

## Cheat Sheet

### Gobuster Commands

| Task | Command |
|------|---------|
| **General help** | `gobuster --help` |
| **Version** | `gobuster version` |
| **Directory enum** | `gobuster dir -u http://example.thm -w wordlist.txt` |
| **Dir + extensions** | `gobuster dir -u http://example.thm -w wordlist.txt -x php,js` |
| **Dir + redirects** | `gobuster dir -u http://example.thm -w wordlist.txt -r` |
| **Dir + TLS skip** | `gobuster dir -u https://example.thm -w wordlist.txt --no-tls-validation` |
| **Dir + threads** | `gobuster dir -u http://example.thm -w wordlist.txt -t 50` |
| **Dir + output** | `gobuster dir -u http://example.thm -w wordlist.txt -o results.txt` |
| **DNS enum** | `gobuster dns -d example.thm -w wordlist.txt` |
| **DNS + IPs** | `gobuster dns -d example.thm -w wordlist.txt -i` |
| **DNS + CNAME** | `gobuster dns -d example.thm -w wordlist.txt -c` |
| **VHost enum** | `gobuster vhost -u http://10.10.10.10 --domain example.thm -w wordlist.txt --append-domain` |
| **VHost + exclude length** | `gobuster vhost -u http://10.10.10.10 --domain example.thm -w wordlist.txt --append-domain --exclude-length 279` |

### Important Flags

| Flag | Meaning |
|------|---------|
| `-u` / `--url` | Target URL |
| `-w` / `--wordlist` | Wordlist |
| `-t` / `--threads` | Number of threads |
| `-o` / `--output` | Save output |
| `-x` / `--extensions` | File extensions |
| `-r` / `--follow-redirect` | Follow redirects |
| `-k` / `--no-tls-validation` | Ignore TLS certificate |
| `-H` / `--headers` | Custom HTTP headers |
| `-c` / `--cookies` | Cookies |
| `-U` / `--username` | Username |
| `-p` / `--password` | Password |
| `-s` / `--status-codes` | Allowed status codes |
| `-b` / `--status-codes-blacklist` | Status codes to ignore |
| `-n` / `--no-status` | Hide status codes |
| `--exclude-length` | Ignore response sizes |
| `--delay` | Delay requests |
| `--debug` | Debug output |
| `-d` / `--domain` | DNS domain (dns mode) |
| `-i` / `--show-ips` | Show resolved IPs (dns mode) |
| `-c` / `--show-cname` | Show CNAME records (dns mode) |

### Modes at a Glance

| Mode | Purpose | Key flags | Question it answers |
|------|---------|-----------|---------------------|
| `dir` | Directory/file enumeration | `-u`, `-w`, `-x`, `-r` | "What paths/files exist on this website?" |
| `dns` | DNS subdomain enumeration | `-d`, `-w`, `-i`, `-c` | "What subdomains resolve through DNS?" |
| `vhost` | Virtual host enumeration | `-u`, `--domain`, `--append-domain`, `--exclude-length` | "What websites answer for different Host headers?" |
| `fuzz` | Fuzzing | — | Custom fuzzing targets |
| `s3` | Amazon S3 buckets | — | Cloud storage discovery |
| `gcs` | Google Cloud Storage | — | Cloud storage discovery |
| `tftp` | TFTP enumeration | — | TFTP resource discovery |

### Key Values from the Room

| Item | Value |
|------|-------|
| **Target domain** | `www.offensivetools.thm` |
| **Dir wordlist** | `/usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt` |
| **DNS wordlist** | `/usr/share/wordlists/SecLists/Discovery/DNS/subdomains-top1million-5000.txt` |
| **TLS skip flag** | `--no-tls-validation` |
| **Discovered directory** | `secret` |
| **Configured subdomains** | 4 |
| **Flag** | `THM{ReconWasASuccess}` |

### Common Mistakes → Checks

| Symptom | Check |
|---------|-------|
| Scan fails immediately | Did you include both `-u` and `-w`? |
| Wrong service scanned | Does the URL include `http://` or `https://`? |
| Discovered dir seems empty | Gobuster is not recursive — re-scan `/dir` manually |
| Files not found | Add relevant extensions with `-x php,js` |
| HTTPS certificate error | Add `-k` / `--no-tls-validation` for self-signed certs |
| VHost output full of noise | Find the baseline size and use `--exclude-length` |
| Getting blocked / rate-limited | Lower `-t` threads and add `--delay` |

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is Gobuster?** | Gobuster is an open-source Go-based enumeration tool used to brute-force and discover web directories, files, DNS subdomains, virtual hosts and other resources using wordlists. |
| **Q2. What is Gobuster mainly used for?** | It is primarily used for reconnaissance and enumeration during penetration testing and CTFs. |
| **Q3. What is a wordlist?** | A wordlist is a collection of candidate values that a tool tests systematically against a target. |
| **Q4. What is the `dir` mode?** | `dir` mode performs web directory and file enumeration. Example: `gobuster dir -u http://example.thm -w wordlist.txt` |
| **Q5. What is the `dns` mode?** | `dns` mode brute-forces DNS subdomains for a target domain. Example: `gobuster dns -d example.thm -w wordlist.txt` |
| **Q6. What is VHost enumeration?** | VHost enumeration discovers virtual hosts on a web server by sending HTTP requests with different `Host` headers. |
| **Q7. What is the difference between DNS and VHost enumeration?** | DNS enumeration performs DNS lookups for possible subdomains, while VHost enumeration sends HTTP requests with different Host headers to identify websites configured on the same server. |
| **Q8. What does `-w` do?** | It specifies the wordlist Gobuster uses. |
| **Q9. What does `-u` do?** | It specifies the target URL. |
| **Q10. What does `-t` do?** | It specifies the number of concurrent threads used by Gobuster. |
| **Q11. Why would you use `--no-tls-validation`?** | It skips TLS certificate validation, which can be useful in authorized test environments using self-signed certificates. |
| **Q12. What does `-x` do?** | It specifies file extensions to test during directory enumeration. Example: `-x php,js` |
| **Q13. Why is `403 Forbidden` interesting?** | A 403 response may indicate that the requested resource exists but access is restricted. |
| **Q14. Why can `200 OK` be a false positive?** | Some applications return the same generic page with status 200 for nonexistent resources. |
| **Q15. How can you identify VHost false positives?** | Send a request with a random Host header and compare the response status, body length and content. If many invalid hosts produce the same response size, that size can potentially be excluded. |
| **Q16. What does `--exclude-length` do?** | It filters out responses with specified body lengths, which is useful for removing repeated false-positive responses. |
| **Q17. Is Gobuster recursive?** | No. Gobuster does not automatically recursively enumerate every discovered directory. Interesting directories may need to be scanned separately. |
| **Q18. What does `-r` do?** | It tells Gobuster to follow HTTP redirects. |
| **Q19. What does `-o` do?** | It writes Gobuster results to an output file. |
| **Q20. What is the HTTP Host header?** | The Host header identifies the hostname requested by the client and allows a web server to select the appropriate virtual host. |

### Scenario-Based Questions

| Question | Answer |
|---|---|
| **You have `10.10.10.10` and believe it hosts `example.thm`. How would you look for hidden directories?** | Run `gobuster dir -u http://10.10.10.10 -w /usr/share/wordlists/dirb/common.txt`, then investigate interesting responses such as `200`, `301`, `302`, `403`. |
| **How would you enumerate subdomains?** | Use `gobuster dns -d example.thm -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt`. |
| **You know multiple websites may exist on the same IP. What would you use?** | Use VHost mode: `gobuster vhost -u http://10.10.10.10 --domain example.thm -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt --append-domain`. |
| **Every random hostname returns `404` with `Size: 279`. How can you reduce these false positives?** | Use `--exclude-length 279` after confirming that the response size represents the generic invalid-host response. |

## Final Takeaway

**Gobuster** is a Go-based **enumeration** tool that turns a wordlist into an attack-surface map: it combines each entry with the target, sends a request, and analyses the response. Its three core modes answer three distinct questions — **`dir`** ("what web paths and files exist?" via `-u` and `-w`, extended with `-x`, `-r` and `-k`), **`dns`** ("what subdomains resolve in DNS?" via `-d` and `-w`, with `-i` and `-c` for extra detail), and **`vhost`** ("what websites answer for different `Host` headers on the same IP?" via `--domain`, `--append-domain` and `--exclude-length`). The room's practical work against `www.offensivetools.thm` reinforced the essentials — skip self-signed certificates with **`--no-tls-validation`**, remember Gobuster is **not recursive** so re-scan the `secret` directory to reach **`THM{ReconWasASuccess}`**, treat a **`403`** as a possible real resource, and never trust a raw **`200`** without validation. Above all, carry forward the workflow **ENUMERATE → FILTER → VALIDATE → ENUMERATE DEEPER**, always inside **authorised scope** — Gobuster discovers the candidates, but manual validation determines what they truly contain.
