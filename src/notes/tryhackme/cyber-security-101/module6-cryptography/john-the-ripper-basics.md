| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Cryptography / Password Cracking |
| **Difficulty** | Beginner |
| **Time** | ~55 Minutes |
| **Module** | Cryptography |

---

## Objective

This room introduces **John the Ripper (JtR)**, one of the most popular offline password-cracking tools used by penetration testers, red teamers, forensics analysts, incident responders, and CTF players. It walks through the full recovery workflow: understanding hashes, running dictionary attacks with `rockyou.txt`, identifying and specifying hash formats, and cracking Windows NTLM, Linux `/etc/shadow`, ZIP, RAR, and SSH-key passwords.

By the end of this room you will be able to:

- Explain what John the Ripper is and why it works offline against hashes
- Run a dictionary attack with `--wordlist` and let John auto-detect the format
- Identify unknown hashes and specify the correct format manually with `--format`
- Crack Windows NTLM hashes (`--format=nt`) and Linux hashes (`--format=sha512crypt`)
- Merge `/etc/passwd` and `/etc/shadow` with `unshadow` before cracking
- Use Single Crack Mode, GECOS data, and custom rules to generate smarter guesses
- Extract crackable hashes from archives and keys with `zip2john`, `rar2john`, and `ssh2john`

> **Warning:** Only crack passwords on systems you own or have **explicit written authorisation** to test, or in a CTF/lab. Unauthorised password cracking can violate laws and organisational policy.

---

## Task 1 — What Is John the Ripper

**John the Ripper (JtR)** is a password-cracking tool whose primary purpose is to **recover passwords from password hashes**. Unlike an online brute-force attack that hammers a login form, John works **offline** against captured hashes, which makes it extremely fast because there is no network delay and no account-lockout to worry about.

Imagine a penetration test where, during privilege escalation, you obtain `/etc/shadow`, an `NTDS.dit`, or a `SAM` database. These files store only **hashes**, not plaintext, so you cannot simply read the password back. John is the tool that attempts to recover the original password from those hashes.

### John Does Not Decrypt Hashes

A crucial point: John never reverses or decrypts a hash. Instead it repeatedly guesses a candidate, hashes the guess with the right algorithm, and compares the result to the target hash — `Password Candidate → Hash Algorithm → Generated Hash → Compare → Match?` — and stops when a guess produces the same hash.

### Password Cracking Workflow

Every cracking task follows the same high-level path, from a raw hash to a recovered password:

```text
Hash
 │
 ▼
Identify Hash Type
 │
 ▼
Choose Attack
 │
 ▼
Wordlist
 │
 ▼
John the Ripper
 │
 ▼
Recovered Password
```

### Prerequisites

Before this room you should be comfortable with **Cryptography Basics**, **Public Key Cryptography**, **Hashing Basics**, and **basic Linux commands**, since John is a command-line tool that operates on hashes produced by those systems.

> **Tip:** Offline cracking bypasses account lockouts entirely, which is exactly why weak passwords fall quickly. Treat John as both an attack tool and a reminder to enforce strong, unique passwords with slow, salted hashing.

---

## Task 2 — Basic Terms

Before driving John, it helps to recap what a hash is and why cracking (rather than reversing) is the only option.

### What Is a Hash?

A **hash** is a fixed-length representation of data. Hashing `hello` with MD5 produces a 32-character hexadecimal digest even though the input is only 5 characters, and no matter how long the input, the output stays a fixed size:

```text
hello  ->  5d41402abc4b2a76b9719d911017c592
cat    ->  d077f244def8a70e5ea758bd8352fcd8
```

### Properties of a Good Hash

A secure cryptographic hash function should satisfy several properties:

| Property | Meaning |
|----------|---------|
| **Deterministic** | The same input always produces the same output. |
| **Fast to compute** | Hashing a login password should be near-instant. |
| **One-way** | Easy to go password → hash, practically impossible to reverse. |
| **Avalanche effect** | A tiny input change (`hello` → `Hello`) produces a completely different hash. |
| **Collision resistant** | Different inputs should not produce the same hash. |

### Popular Hash Algorithms

| Algorithm | Status | Common Usage |
|-----------|--------|--------------|
| **MD5** | Broken | Old applications |
| **SHA1** | Weak | Legacy systems |
| **SHA256** | Secure | Modern systems |
| **SHA512** | Secure | Linux passwords |
| **Whirlpool** | Secure | Specialised usage |
| **NTLM** | Legacy | Windows passwords |

### Why Hashes Cannot Be Reversed

Hash functions deliberately **discard information**, so there is no reverse function that turns a digest back into the original password. Unlike encryption, hashing has **no decryption key**, so the only path back to the password is to guess candidates and hash them. This mirrors the classic **P vs NP** idea: finding the password is hard, but **verifying** a guess is easy (`Guess → Hash It → Matches? → Yes/No`).

### Dictionary Attack

The most common attack. Instead of trying every possible string, John reads a **wordlist** (a text file with one candidate per line), hashes each word, and compares (`Word → Hash → Compare → Next Word`, until a match). Dictionary attacks work because humans choose predictable passwords such as `password`, `welcome`, `india123`, `qwerty`, `football`, and `admin123` rather than truly random strings.

> **Security relevance:** MD5 and SHA1 are broken and must not protect new systems. Passwords should never be stored with a plain fast hash — always use a slow, salted algorithm — precisely because fast hashes make dictionary attacks trivial.

---

## Task 3 — Setting Up Your System

Throughout this room you use **Jumbo John** and the **`rockyou.txt`** wordlist. On the AttackBox or Kali Linux, John is usually pre-installed; confirm it by running the command with no arguments to see the usage/help screen:

```bash
john
```

### Installing John

```bash
# Ubuntu
sudo apt install john

# Fedora
sudo dnf install john
```

On Windows, download the Jumbo binaries from the official Openwall project.

### Jumbo John

The room uses **John the Ripper Jumbo** rather than the standard build because Jumbo supports far more targets, including community plugins:

| Standard John | Jumbo John |
|---------------|------------|
| Fewer hash formats | Hundreds of hash formats |
| No archive support | ZIP and RAR archives |
| No key/document support | SSH keys, PDF, Office documents |
| Core algorithms only | WPA hashes and many community plugins |

Always prefer Jumbo during penetration testing.

### Wordlists and rockyou.txt

A **wordlist** is just a text file with one candidate password per line. John hashes each line and compares it to the target hash.

**`rockyou.txt`** is the most famous wordlist, created from the **RockYou.com** breach in 2009. It contains millions of real leaked passwords, which makes it extremely effective because it reflects what people actually choose. On Kali it lives at a known location and may need decompressing first:

```bash
/usr/share/wordlists/rockyou.txt
tar xvzf rockyou.txt.tar.gz
```

Rather than guessing random strings like `Yh@29!LpQ#`, `rockyou.txt` tries real human passwords such as `123456`, `password`, `welcome`, `football`, `princess`, and `letmein`, which is why it cracks many hashes quickly.

> **Tip:** Fix the workflow in your head before every task — take the hash, identify its type, choose a wordlist, run John, and read the recovered password.

---

## Task 4 — Cracking Basic Hashes

With John installed and a wordlist ready, you can crack your first hashes. The general syntax puts optional flags before the hash file:

```bash
john [options] [hash_file]
john hash.txt
john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
```

### Breaking Down the Command

| Part | Meaning |
|------|---------|
| **`john`** | Launch John the Ripper. |
| **`--wordlist=`** | Use a dictionary attack. |
| **`rockyou.txt`** | The password list to try. |
| **`hash.txt`** | File containing the target hash(es). |

### John's Cracking Process

```text
Hash File
      │
      ▼
  Read Hash
      │
      ▼
Read Wordlist
      │
      ▼
Hash Each Word
      │
      ▼
   Compare
      │
      ▼
Password Found
```

### Automatic Hash Detection

John can automatically identify many common hash types (MD5, SHA1, SHA256, SHA512, NTLM, and more), so a plain dictionary attack often just works:

```bash
john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
```

Auto-detection is **not always reliable**, though — two different algorithms can produce similar-looking hashes. When it guesses wrong, specify the format manually.

### Identifying Unknown Hashes with hash-id

Given a hash like `5f4dcc3b5aa765d61d8327deb882cf99`, you may not know whether it is MD5, NTLM, or something else. TryHackMe recommends the **hash-id** tool:

```bash
wget https://gitlab.com/kalilinux/packages/hash-identifier/-/raw/kali/master/hash-id.py
python3 hash-id.py
```

```text
HASH:
5f4dcc3b5aa765d61d8327deb882cf99

Possible Hashes:
MD5
NTLM
Domain Cached Credentials
```

One hash may match multiple algorithms (here MD5, NTLM, and Domain Cached Credentials), so hash-id narrows the options but you still choose the correct format before running John.

### Manually Specifying the Format

When you know (or have narrowed down) the algorithm, pass it with `--format`:

```bash
john --format=<type> --wordlist=<wordlist> hash.txt
john --format=raw-md5 --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
```

Use **`raw-md5`** rather than `md5` because John distinguishes between implementations such as `raw-md5`, `md5crypt`, `hmac-md5`, and `md5-opencl`. For a plain MD5 hash, `raw-md5` is the right identifier. To see every supported format, list them and filter:

```bash
john --list=formats
john --list=formats | grep md5
john --list=formats | grep sha
```

### Practical Examples

Each algorithm uses the matching `raw-*` format for a plain hash:

```bash
john --format=raw-md5    --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
john --format=raw-sha1   --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
john --format=raw-sha256 --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
john --format=whirlpool  --wordlist=/usr/share/wordlists/rockyou.txt hash.txt
```

The room's practice hashes crack to intentionally simple passwords:

| Hash | Cracked Password |
|------|------------------|
| **MD5** | biscuit |
| **SHA1** | kangeroo |
| **SHA256** | microphone |
| **Whirlpool** | colossal |

### Common Beginner Mistakes

| Mistake | Effect |
|---------|--------|
| **Wrong format** | Using `raw-sha1` for an MD5 hash makes John fail immediately. |
| **Weak wordlist** | Small lists reduce success; prefer `rockyou.txt`. |
| **Corrupted hash file** | Extra spaces, tabs, or blank lines can block cracking. |
| **Forgetting the file** | `john` alone shows help; you must pass `john hash.txt`. |

> **Security relevance:** In a real engagement you might recover a database dump of email/username/hash rows, crack the weak ones, and report them — direct evidence of weak password policy and password reuse.

---

## Task 5 — Cracking Windows Authentication Hashes

Windows stores passwords differently from Linux. Instead of `/etc/shadow`, it uses the **SAM database** on a local machine and **`NTDS.dit`** in Active Directory. Both hold **NTLM hashes**, not plaintext.

### What Is NTLM and Where It Lives

**NTLM** stands for **NT LAN Manager**. Modern Windows stores passwords using the **NT Hash** algorithm, and the terms *NT Hash* and *NTLM hash* are used interchangeably. The "NT" originally meant *New Technology* from Windows NT; the branding is gone but the hash format remains. Attackers typically obtain these hashes with **Mimikatz**, **secretsdump.py**, registry extraction, or SAM/`NTDS.dit` dumps, then crack them offline.

| Location | Stores |
|----------|--------|
| **SAM database** | Local Windows account hashes (Security Account Manager). |
| **`NTDS.dit`** | Domain user credentials in Active Directory. |

### Pass-the-Hash

Sometimes attackers do not need the plaintext at all — they can authenticate using the NTLM hash directly (`Password → NTLM Hash → Authenticate`), a technique called **Pass-the-Hash (PtH)**. Even so, cracking a weak NTLM password reveals the user's real credential, which enables password-reuse attacks across other systems.

### Cracking NTLM with John

Use the format identifier **`nt`** (not `ntlm`):

```bash
john --format=nt --wordlist=/usr/share/wordlists/rockyou.txt ntlm.txt
```

The room's exercise recovers the password `mushroom`. Remember the split: Linux hashes live in `/etc/shadow`, Windows hashes live in the SAM database and `NTDS.dit`, and John handles both.

> **Security relevance:** NTLM has no salt and is fast, so weak Windows passwords fall quickly. Pass-the-Hash shows that even an uncracked hash can grant access, which is why hardening credential storage matters as much as password strength.

---

## Task 6 — Cracking Linux /etc/shadow Hashes

Linux splits account data across two files: **`/etc/passwd`** holds general account information and **`/etc/shadow`** holds the password hashes.

### /etc/passwd and /etc/shadow

A `/etc/passwd` line contains seven colon-separated fields, and the password field holds only a placeholder `x` because the real hash lives in `/etc/shadow`:

```text
root:x:0:0:root:/root:/bin/bash
```

| Field | Meaning |
|-------|---------|
| **Username** | The account name. |
| **Password placeholder** | Usually `x`; the hash is in `/etc/shadow`. |
| **UID / GID** | User and group IDs. |
| **Comment (GECOS)** | Full name, phone, office, description. |
| **Home directory** | The user's home path. |
| **Shell** | The login shell. |

`/etc/shadow` stores the actual hash and is readable only by root:

```text
root:$6$.....hashedpassword.....
```

Older systems kept hashes inside world-readable `/etc/passwd`, so anyone could steal them. Modern Linux separates public account info (`/etc/passwd`) from the protected hashes (`/etc/shadow`).

### Why John Needs unshadow

John needs both the **username** (from `/etc/passwd`) and the **hash** (from `/etc/shadow`) in one file. The **`unshadow`** utility merges them (`/etc/passwd + /etc/shadow → unshadow → combined file → John`):

```bash
unshadow passwd shadow > hashes.txt
unshadow local_passwd local_shadow > unshadowed.txt
```

### Cracking the Combined File

Modern Linux typically uses **`sha512crypt`** (`$6$`), which is far stronger than MD5 or SHA1:

```bash
john --format=sha512crypt --wordlist=/usr/share/wordlists/rockyou.txt unshadowed.txt
```

The room's `etchashes.txt` cracks to the password `1234`.

### Common Mistakes

| Mistake | Effect |
|---------|--------|
| **Forgetting `unshadow`** | John cannot map usernames to hashes. |
| **Wrong format** | Use `sha512crypt`, not `raw-sha512`. |
| **Missing root** | Regular users cannot read `/etc/shadow`. |

> **Security relevance:** Recovering a weak `/etc/shadow` password during a test often leads straight to privilege escalation, so auditing Linux password strength is a core defensive task.

---

## Task 7 — Single Crack Mode

Dictionary mode relies on a predefined list. **Single Crack Mode** instead generates candidates intelligently from information already tied to the account — usernames and the GECOS field.

### The Idea Behind Single Mode

If the username is `Markus`, John tries mangled variants such as `Markus1`, `Markus12`, `MARKUS`, `markus`, `Markus!`, and `Markus123`, because humans routinely build passwords from their own names. This modifying of a base word into new candidates is called **word mangling** — from `password` John derives `Password`, `PASSWORD`, `password1`, `password123`, and `Password2025`.

### The GECOS Field

Linux accounts include a **GECOS** field that often stores the full name, phone, office, or description:

```text
john:x:1000:1000:John Smith:/home/john:/bin/bash
```

Here `John Smith` is the GECOS data. From username `jdoe` plus GECOS `John Doe`, John can automatically generate `John123`, `Doe123`, `JDoe2025`, `JohnDoe`, and `John@123`.

### Single Mode Syntax

The hash file must include the username in `username:hash` form (for example `mike:abcdef123456...`); without usernames, Single Mode loses most of its intelligence:

```bash
john --single hashes.txt
john --single --format=raw-sha256 hashes.txt
```

The room's `Task07` recovers `Jok3r` — a realistic mutation of `Joker`.

### Single Crack Workflow

```text
Username
      │
      ▼
Word Mangling
      │
      ▼
Generate Candidates
      │
      ▼
    Hash
      │
      ▼
   Compare
      │
      ▼
Password Found
```

### Dictionary vs Single Mode

| Dictionary Mode | Single Mode |
|-----------------|-------------|
| Uses a wordlist | Uses username / GECOS information |
| Faster | Smarter |
| Large fixed password list | Generates candidates dynamically |
| Needs no user information | Requires usernames |

> **Security relevance:** Passwords derived from a username or full name fall almost instantly to Single Mode, which is why naming conventions should never influence the password.

---

## Task 8 — Custom Rules

Dictionary and Single modes still miss patterns like `football2025!` when the wordlist only contains `football`. **Rules** solve this by mutating each dictionary word into thousands of new candidates — an automatic password generator.

```text
Wordlist  ->  Rule Engine  ->  New Passwords  ->  John  ->  Hash Match?
```

### What Rules Generate

From `football`, rules can produce `Football`, `FOOTBALL`, `football1`, `football123`, `football2025`, `Football!`, and `football$`. This maps directly onto real complexity policies — "8+ characters, one number, one symbol" — that push users toward predictable forms like `Summer2025!`, `Password123`, and `Admin@123`.

### Common Mangling Operations

| Operation | Example |
|-----------|---------|
| **Append numbers** | `password123` |
| **Uppercase first letter** | `Password` |
| **Replace letters (leetspeak)** | `P@ssword` |
| **Append symbols** | `password!` |
| **Reverse the word** | `drowssap` |

### Enabling Rules

Add `--rules` to a dictionary attack so John mutates every word before testing it:

```bash
john --wordlist=rockyou.txt --rules hash.txt
```

Rules live in the John configuration file (`john.conf` or `john.ini`), commonly at `/etc/john/john.conf` or `/opt/john/john.conf`. Rules generate only the **most likely** human patterns rather than every possible mutation, which would explode from ~10 million words into billions or trillions of candidates.

The room's rules example recovers `polopassword` — a dictionary word mutated before it matched.

### Dictionary Attack vs Rules

| Dictionary | Rules |
|------------|-------|
| Existing words only | Modified words |
| Faster | Slightly slower |
| Limited guesses | Many more guesses |
| Misses common variations | Excellent for human passwords |

> **Tip:** When a plain dictionary attack "almost" works — the real password is clearly a variant of a common word — reach for `--rules` before jumping to slow brute force.

---

## Task 9 — Cracking ZIP Passwords

John cannot attack a password-protected ZIP archive directly; it first needs a crackable hash extracted from the archive with the **`zip2john`** helper (`ZIP File → zip2john → ZIP Hash → John → Password`). Extract the hash, crack it, then show the result:

```bash
zip2john secure.zip > zip.hash
```

```text
secure.zip:$pkzip$...
```

```bash
john --wordlist=/usr/share/wordlists/rockyou.txt zip.hash
john --show zip.hash
```

The room recovers `password123`.

---

## Task 10 — Cracking RAR Archives

RAR archives work the same way, using **`rar2john`** instead of `zip2john` (`RAR File → rar2john → RAR Hash → John → Password`):

```bash
rar2john secure.rar > rar.hash
john --wordlist=/usr/share/wordlists/rockyou.txt rar.hash
john --show rar.hash
```

### ZIP vs RAR

| ZIP | RAR |
|-----|-----|
| **`zip2john`** | **`rar2john`** |
| Extract ZIP hash | Extract RAR hash |
| John cracks the extracted hash | Same process |

> **Warning:** Never try to crack the archive itself — always extract the hash with the matching helper first, then run John against that hash file.

---

## Task 11 — Cracking SSH Private Keys

SSH private keys such as `id_rsa` can be protected with a passphrase. If you gain access to a user's `~/.ssh/` directory but the key is encrypted, it is useless without the passphrase. John recovers the **passphrase**, not the key itself, using **`ssh2john`**:

```bash
ssh2john id_rsa > ssh.hash
john --wordlist=/usr/share/wordlists/rockyou.txt ssh.hash
john --show ssh.hash
```

The flow is `id_rsa → ssh2john → SSH Hash → John → Recovered Passphrase`. Once the passphrase is recovered, the private key becomes usable for authentication.

### Helper Tools Included with John

| Tool | Source | Produces |
|------|--------|----------|
| **`zip2john`** | ZIP archive | Hash John can attack. |
| **`rar2john`** | RAR archive | Hash John can attack. |
| **`ssh2john`** | SSH private key | Passphrase hash (attacks the passphrase, not the key). |
| **`unshadow`** | `/etc/passwd` + `/etc/shadow` | Combined file John can read. |

### Complete John Workflow

Pulling every mode together, the end-to-end process runs from a captured hash to a recovered password, choosing an attack based on what you know:

```text
Password Hash
      │
      ▼
Identify Format
      │
      ▼
Choose Attack
   Dictionary
   Rules
   Single
   Brute Force
      │
      ▼
     John
      │
      ▼
Recovered Password
```

> **Security relevance:** A leaked private key protected by a weak passphrase is only as strong as that passphrase. `ssh2john` shows why key passphrases should be long and random.

---

## Task 12 — Choosing the Right Attack

Once you know the modes, the skill is picking the right one — the correct choice saves an enormous amount of time.

### Attack Mode Decision

```text
                    Password Hash
                           │
                           ▼
                Do you know the username?
                    │             │
                  Yes             No
                   │              │
                   ▼              ▼
          Single Crack Mode   Dictionary Attack
                   │              │
             Found? Stop      Found? Stop
                   │              │
                  No             No
                   │              │
                   └──────┬───────┘
                          ▼
                     Custom Rules
                          │
                    Found? Stop
                          │
                         No
                          ▼
                  Incremental Mode
                   (Brute Force)
```

### When to Use Each Mode

| Mode | Flag | When to use |
|------|------|-------------|
| **Dictionary** | `--wordlist=` | Passwords likely common; a good wordlist and fast results are needed. |
| **Single Crack** | `--single` | Usernames or GECOS data exist; passwords may be based on names. |
| **Rules** | `--rules` | A dictionary attack almost works; the real password is a variant. |
| **Incremental** | `--incremental` | Last resort — pure brute force when everything else fails. |

### Incremental Mode (Brute Force)

Incremental mode generates candidates without any wordlist, trying `a`, `b`, `c`, then `aa`, `ab`, and onward:

```bash
john --incremental hash.txt
```

It is extremely slow: an 8-character password over 95 possible symbols is roughly 95^8 ≈ 6.6 quadrillion combinations, which can take years. Use it only when other attacks fail.

### Performance and Session Management

Specifying the format saves John from wasting time guessing it, and long sessions can be named, saved, and resumed:

```bash
john --format=nt hash.txt          # skip format guessing
john --session=office hash.txt     # name a session
john --restore=office              # resume that session
john --restore                     # resume the last session
john --show hash.txt               # display recovered passwords
```

```text
admin:password123
surya:qwerty123
```

> **Tip:** Always run `--show` after a session to list what was cracked instead of re-running the whole attack.

---

## Task 13 — John vs Hashcat

Both John and Hashcat are industry-standard offline cracking tools; the practical difference is hardware focus. John is CPU-optimised with broad format support and easy setup, while Hashcat is GPU-optimised for maximum speed on huge keyspaces.

| John | Hashcat |
|------|---------|
| **CPU optimised** | **GPU optimised** |
| Easy setup | Maximum speed |
| Excellent format support | Excellent performance |
| Great for CTFs, Linux, forensics, quick assessments | Great for GPU clusters, enterprise audits, very large lists |

> **Security relevance:** GPU acceleration in Hashcat can try billions of candidates per second, which is exactly why fast hashes like MD5 are unsuitable for passwords and slow, salted hashes are mandatory.

---

## Task 14 — Password Auditing and Ethical Use

John is fundamentally a **password-auditing** tool. Organisations use it to find weak passwords, improve password policies, verify complexity requirements, and train employees on the risk of reuse.

Only crack passwords when you **own the system**, have **written authorisation**, or are working in a **CTF or lab**. Never run John against systems without permission — unauthorised cracking can violate laws and organisational policy.

### Common Files Encountered During Pentests

| Platform | Files |
|----------|-------|
| **Linux** | `/etc/passwd`, `/etc/shadow` |
| **Windows** | `SAM`, `SYSTEM`, `NTDS.dit` |
| **Archives** | `backup.zip`, `secret.rar` |
| **SSH** | `id_rsa`, `id_ed25519` |

The real-world loop is: compromise host → collect hashes → identify format → choose attack → recover password → report the weak password.

> **Warning:** The value of an engagement is the report, not the cracked password itself. Recovered weak passwords are evidence used to strengthen policy — handle them like the sensitive data they are.

---

## Quick Revision

| Area | Key points |
|------|-----------|
| **Core idea** | John never decrypts; it hashes candidates and compares them to the target hash, offline. |
| **Dictionary** | `john --wordlist=rockyou.txt hash.txt` — first try, using real leaked passwords. |
| **Format** | Auto-detection is unreliable; specify with `--format` (`raw-md5`, `nt`, `sha512crypt`). |
| **Windows** | NTLM lives in SAM / `NTDS.dit`; crack with `--format=nt`. |
| **Linux** | Merge with `unshadow passwd shadow > hashes.txt`, then `--format=sha512crypt`. |
| **Single** | `--single` uses usernames and GECOS to generate smart guesses. |
| **Rules** | `--rules` mutates words (numbers, case, symbols, leetspeak). |
| **Helpers** | `zip2john`, `rar2john`, `ssh2john` extract crackable hashes first. |
| **Incremental** | `--incremental` brute force — the slow last resort. |

**Key idea:** John turns a captured hash into a recovered password by identifying the format, choosing the smartest attack (dictionary → single → rules → incremental), and comparing candidate hashes — which is exactly why weak, name-based, or unsalted passwords fall so fast.

---

## 30-Second Revision

- John the Ripper is an offline password cracker: it hashes candidate passwords and compares them to a stored hash, never decrypting.
- Start with a dictionary attack using `rockyou.txt`, the famous list of real leaked passwords.
- Auto-detection can be wrong; identify unknown hashes (hash-id) and set `--format` — use `raw-md5`, not `md5`.
- Windows NTLM hashes (SAM / `NTDS.dit`) crack with `--format=nt`; Linux `$6$` hashes use `--format=sha512crypt`.
- `unshadow` merges `/etc/passwd` and `/etc/shadow` because John needs both username and hash.
- Single Crack Mode (`--single`) builds guesses from usernames and GECOS; Rules (`--rules`) mutate dictionary words.
- Helper tools `zip2john`, `rar2john`, and `ssh2john` extract hashes from archives and keys; incremental mode is the slow brute-force fallback.
- Only crack passwords you are authorised to test.

---

## Cheat Sheet

```bash
# Check version / help
john

# Dictionary attack
john --wordlist=rockyou.txt hash.txt
john --wordlist=/usr/share/wordlists/rockyou.txt hash.txt

# Specify hash format
john --format=raw-md5 hash.txt
john --format=nt ntlm.txt
john --format=sha512crypt unshadowed.txt

# List and filter supported formats
john --list=formats
john --list=formats | grep md5

# Single Crack Mode (uses usernames / GECOS)
john --single hashes.txt

# Rules (word mangling)
john --rules --wordlist=rockyou.txt hash.txt

# Incremental (brute force)
john --incremental hash.txt

# Session management and results
john --session=office hash.txt
john --restore=office
john --restore
john --show hash.txt
```

### Helper Tools

```bash
zip2john file.zip > zip.hash        # extract hash from a ZIP archive
rar2john file.rar > rar.hash        # extract hash from a RAR archive
ssh2john id_rsa > ssh.hash          # extract passphrase hash from an SSH key
unshadow passwd shadow > hashes.txt # merge /etc/passwd + /etc/shadow
```

| Tool | Source | Produces |
|------|--------|----------|
| `zip2john` | ZIP archive | Hash John can attack. |
| `rar2john` | RAR archive | Hash John can attack. |
| `ssh2john` | SSH private key | Passphrase hash (attacks the passphrase). |
| `unshadow` | `/etc/passwd` + `/etc/shadow` | Combined file John can read. |

---

## Interview Questions

**Q1. Can John the Ripper decrypt hashes?**
No. John performs offline password guessing — it hashes candidate passwords and compares them to the target hash. Hashing is one-way, so there is nothing to decrypt.

**Q2. Why is offline cracking faster than online attacks?**
Because hashes are attacked locally without communicating with the target system, eliminating network delays and account-lockout mechanisms.

**Q3. Why is `rockyou.txt` so effective?**
It contains millions of real leaked passwords from the RockYou breach, so it reflects the predictable choices humans actually make, making dictionary attacks far more successful than random guessing.

**Q4. What is the difference between `--format=raw-md5` and `--format=nt`?**
`raw-md5` cracks plain MD5 hashes, while `nt` cracks Windows NTLM (NT Hash) passwords. John distinguishes implementations, so the format identifier must match the exact hash type.

**Q5. What does `unshadow` do and why is it needed?**
It merges `/etc/passwd` and `/etc/shadow` into one file. John needs the username information from `passwd` and the password hashes from `shadow` together before it can crack Linux account passwords.

**Q6. What is Single Crack Mode and when is it useful?**
`--single` generates intelligent guesses from usernames and GECOS data (full names, descriptions) instead of relying on a wordlist. It is ideal when passwords are likely derived from account information.

**Q7. Why are custom rules effective?**
They automatically generate realistic password variations — appending numbers or symbols, changing case, and leetspeak substitutions — matching how humans build passwords around complexity requirements.

**Q8. Can John crack SSH private keys directly, and how does it differ from Hashcat?**
No — it attacks the passphrase protecting the key after `ssh2john` extracts the data. Compared to Hashcat, John is CPU-optimised with broad format support and easy setup, while Hashcat is GPU-optimised for very large audits.

---

## Final Takeaway

**John the Ripper** is the go-to tool for offline password auditing and recovery: it generates candidate passwords, hashes them with the appropriate algorithm, and compares the results against stored hashes. This room builds the full workflow — identify the hash, run a **dictionary attack** with `rockyou.txt`, specify the format with `--format`, and escalate through **Single Crack Mode**, custom rules, and finally **incremental brute force** — while using `unshadow`, `zip2john`, `rar2john`, and `ssh2john` to turn Linux files, archives, and SSH keys into crackable hashes. Used responsibly and only against authorised systems, John exposes weak, reused, and name-based passwords so organisations can enforce strong, unique credentials backed by slow, **salted hashing**.
