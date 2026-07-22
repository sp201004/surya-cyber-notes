| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Cryptography / Hashing |
| **Difficulty** | Beginner |
| **Time** | ~50 Minutes |
| **Module** | Cryptography |

---

## Objective

- Explain what hashing is and why it produces a fixed-size, one-way digest
- Describe the core properties of a secure hash function, including the avalanche effect
- Distinguish hashing from encryption and from encoding
- Recognise common hash algorithms (MD5, SHA-1, SHA-2) and their output lengths
- Understand collisions and why the pigeonhole principle makes them unavoidable
- Store passwords securely with salting and slow password-hashing algorithms
- Recognise password hashes by prefix, length, and context on Linux and Windows
- Use `hashcat` and John the Ripper for authorised password auditing
- Verify file integrity with hashing and authenticate messages with HMAC

---

## Task 1 — What Is Hashing?

Hashing is the process of converting data of **any size** into a **fixed-size output**, known as a **hash**, **digest**, or **hash value**. Unlike encryption, hashing is designed to be **one-way**: once data has been hashed, there is no practical way to recover the original input. A hash function always takes a variable-length input and produces a fixed-length output — the word `Hello` passed through SHA-256 produces `185f8db32271fe25...`, always the same length no matter how large the input.

> **Tip:** Think of a hash as a digital fingerprint of data. It uniquely represents the input but cannot be turned back into it.

---

## Task 2 — Why Do We Need Hashing?

Imagine downloading a **6 GB Ubuntu ISO**. How can you verify that it downloaded successfully, that nobody modified it, and that it is not infected with malware? Comparing file sizes is not enough. Instead, you compare the **hash values** of the original and downloaded files — if both SHA-256 hashes are identical, the files are almost certainly identical.

Hashing is everywhere in daily computing, often without you noticing:

- Logging into websites
- Verifying software downloads
- Git commits
- Blockchain
- Password storage
- Digital signatures
- TLS certificates
- HMAC authentication
- File integrity

### Real-World Example

Suppose Microsoft publishes `Windows.iso` alongside its SHA-256 digest `5d81a67bc3...`. After downloading, you calculate the hash yourself and compare:

```bash
sha256sum Windows.iso
```

If the output matches the published digest, file integrity is verified — the download is complete and unmodified.

---

## Task 3 — Hashing vs Encryption

Many beginners confuse these two concepts, but they solve different problems. Encryption hides data so it can be recovered later with a key. Hashing produces a fingerprint of data that can never be reversed.

| Property | Encryption | Hashing |
|----------|------------|---------|
| **Direction** | Reversible | One-way |
| **Keys** | Uses keys | No keys |
| **Protects** | Confidentiality | Integrity |
| **Recovery** | Can decrypt | Cannot decrypt |

> **Tip:** Encryption is a secret message you unlock later; hashing is a digital fingerprint you can only compare, never unlock.

---

## Task 4 — Hash Function Properties

A secure hash function should satisfy four key properties.

### Deterministic

The same input always produces the same output. Hashing `Hello` with SHA-256 today gives exactly the same digest as hashing it tomorrow.

### Fast to Compute

Even large files should hash quickly. A 1 KB file hashes in a few milliseconds, and a 5 GB file still hashes in a reasonable time.

### One-Way Function

Hashes should not be reversible. Given a digest such as `A91DF67...`, there is no practical way to calculate the original password or input that produced it.

### Avalanche Effect

One tiny change in the input should completely change the output. Changing a single letter — `Hello` to `hello` — produces a hash with no visible relationship to the original.

> **Security relevance:** The avalanche effect is what makes hashes useful for integrity. Any modification, even a single bit, produces a completely different digest, so tampering is immediately obvious.

### The Avalanche Effect in Action

Consider two files that differ by a single bit. `file1.txt` contains the letter `T` (ASCII 54, binary `01010100`) and `file2.txt` contains `U` (ASCII 55, binary `01010101`). Only one bit changed, yet their MD5 hashes are completely different:

```text
File 1  ->  MD5  ->  b9ece18c950afbfa...
File 2  ->  MD5  ->  4c614360da93c0a0...
```

The same behaviour applies to SHA-1, SHA-256, and SHA-512. You can demonstrate this on Linux:

```bash
cat file1.txt
hexdump -C file1.txt
md5sum *.txt
sha1sum *.txt
sha256sum *.txt
sha512sum *.txt
```

Although only one bit changed between the files, every hash is completely different.

### Password Verification Example

Instead of storing your password `TryHackMe123`, a website stores its hash, for example `e76f9c0d...`. When you log in, the entered password is hashed and the result is compared against the stored hash. If both hashes match, login succeeds — the password itself is never stored.

---

## Task 5 — Common Hash Algorithms

Several hash algorithms are in widespread use. They differ mainly in output length and security status.

| Algorithm | Output Length | Status |
|-----------|--------------|--------|
| **MD5** | 128 bits (32 hex) | Broken |
| **SHA-1** | 160 bits (40 hex) | Broken |
| **SHA-224** | 224 bits | Secure |
| **SHA-256** | 256 bits (64 hex) | Secure |
| **SHA-384** | 384 bits | Secure |
| **SHA-512** | 512 bits (128 hex) | Secure |
| **SHA-3** | Variable | Modern SHA family |

**MD5** produces a 128-bit output (16 bytes, 32 hex characters) — for example `hello` hashes to `5d41402abc4b2a76b9719d911017c592`. It is now **cryptographically broken** and must never be used for password storage, digital signatures, or any security-sensitive application, though it still appears in checksums, legacy systems, and non-security file verification.

**SHA-1** produces a 160-bit output (20 bytes, 40 hex characters). It is also broken because practical collision attacks have been demonstrated, so it should not be used for modern security.

The **SHA-2 family** (SHA-224, SHA-256, SHA-384, SHA-512) is the most widely used secure family today. **SHA-256** outputs 256 bits (64 hex characters) and is used in TLS, software downloads, Bitcoin, and Linux ISOs. **SHA-512** outputs 512 bits (128 hex characters) and is common in Linux password storage, certificates, and secure systems.

> **Warning:** MD5 and SHA-1 are both broken by known collision attacks. Never use them to secure new applications — choose SHA-256 or SHA-512 instead.

---

## Task 6 — Collisions and the Pigeonhole Principle

A **collision** happens when two different inputs produce the same output (for example, `Input A` and `Input B` both hashing to `ABC123`). For a good hash algorithm this should be extremely unlikely, but it can never be fully eliminated.

### Why Collisions Exist

Hash outputs are fixed in size while the number of possible inputs is unlimited, so collisions are mathematically unavoidable. This is the **pigeonhole principle**: if you have 21 pigeons and only 16 holes, at least one hole must hold more than one pigeon. Likewise, a 4-bit hash has only 16 possible outputs, so hashing 17 different files guarantees at least one collision.

Collisions therefore always exist, but for a secure algorithm, finding one intentionally should be computationally infeasible. Modern algorithms like SHA-256 and SHA-3 make engineered collisions practically impossible with current technology, whereas MD5 and SHA-1 have known, practical collision attacks.

---

## Task 7 — Insecure Password Storage

One of the most important applications of hashing is **password storage**. Whenever you create an account, the server must remember something about your password. The obvious but dangerous approach is storing the password itself in plaintext.

### Why Plaintext Storage Is Dangerous

If a company's database is leaked and passwords are stored in plaintext, the attacker instantly knows every user's password — no cracking required.

| Username | Stored Password |
|----------|-----------------|
| **Surya** | password123 |
| **Alice** | hello123 |
| **Bob** | qwerty |

An attacker who steals such a database immediately gains access to customer accounts, email accounts, reused bank accounts, and social media — especially because most users reuse the same password across many sites. One breach can compromise many accounts.

### Famous Data Breaches

Several major companies suffered password leaks due to poor storage, including RockYou, LinkedIn (2012), Adobe, and Yahoo. These incidents demonstrated why secure password storage is essential.

The **RockYou** breach is one of the most famous. RockYou stored passwords in plaintext, so when its database leaked, attackers obtained millions of real passwords. Today the `rockyou.txt` wordlist contains over 14 million passwords (`123456`, `password`, `iloveyou`, and so on) and is commonly used during penetration testing and CTFs:

```bash
wc -l rockyou.txt
head rockyou.txt
```

### Why Encryption and Weak Hashes Are Wrong

Some organisations historically encrypted passwords, but encryption requires a key — if that key is stolen, every password becomes readable. Authentication only needs to verify passwords, not recover them, so hashing is the correct approach. Others used weak hash functions: LinkedIn, for example, used SHA-1 without salting, and millions of passwords were eventually cracked.

> **Warning:** Never store passwords in plaintext, never encrypt them for storage, and never use fast or broken hashes like MD5 or SHA-1 to protect them.

---

## Task 8 — Password Salting

A **salt** is a random value added to a password before hashing. Instead of hashing `password123`, we combine it with a random salt such as `Xj82@L` and hash the result — `SHA256(password123Xj82@L)`.

### Why Use Salts?

Without salts, two users with the same password produce identical hashes, so an attacker instantly knows they share a password. With a unique salt per user, even identical passwords produce completely different hashes.

| User | Password | Salt | Resulting Hash |
|------|----------|------|----------------|
| **Alice** | hello123 | X72A | AAAA... |
| **Bob** | hello123 | Q81M | BBBB... |

### Secure Password Storage Flow

```text
Password
   |
Generate Random Salt
   |
Password + Salt
   |
Hash Function
   |
Store: Hash + Salt
```

The salt is stored in the database alongside the hash. It does **not** need to remain secret — its job is to make every hash unique, not to stay hidden.

> **Security relevance:** Salting ensures that two identical passwords never share the same stored hash, which defeats precomputed rainbow-table attacks and prevents an attacker from spotting reused passwords in a leaked database.

---

## Task 9 — Rainbow Tables

A **rainbow table** is a huge precomputed database that maps a hash back to the original password. Instead of calculating hashes every time, the attacker performs a fast lookup.

| Hash | Password |
|------|----------|
| **abc123** | hello |
| **def456** | admin |
| **ghi789** | password |

Websites like **CrackStation** host enormous rainbow tables. Given an unsalted MD5 hash, the attacker searches the database and finds the password instantly. This works mainly against **unsalted hashes**.

### Why Rainbow Tables Fail Against Salts

Suppose two users both choose `123456`. Without a salt, a single hash lookup cracks both. With unique salts, `123456 + X1` and `123456 + Z8` produce entirely different hashes, so the attacker would need a separate rainbow table for every possible salt — which is impractical.

To protect against rainbow tables: generate a unique random salt for every password, combine it with the password before applying a modern slow algorithm (for example `AL4RMc10k` + salt `Y4UV*^(=go_!` → Argon2), store the salt alongside the hash, and never reuse salts or store the plaintext password.

---

## Task 10 — Password Hashing Algorithms

Modern systems use specialised, deliberately slow algorithms designed specifically for passwords. Being slow and memory-intensive dramatically increases the cost of brute-force attacks.

| Algorithm | Key Feature | Prefix |
|-----------|-------------|--------|
| **bcrypt** | Automatic salting, adjustable cost factor, slow by design | `$2b$` |
| **scrypt** | Memory-hard; resists GPU attacks by needing large RAM | `$7$` |
| **Argon2** | Memory-hard, GPU-resistant, PHC winner; recommended | `$argon2$` |
| **PBKDF2** | Iterated key derivation — hashes thousands of times | — |

**bcrypt** provides automatic salting, an adjustable **cost factor** (cost 10 is fast, cost 14 is slower and more secure — raise it as hardware improves), and resistance to rainbow tables. **scrypt** additionally requires large amounts of memory, so an attacker needs both CPU and RAM, making GPU cracking far more expensive. **Argon2** won the Password Hashing Competition, is memory-hard, GPU-resistant, and supports parallel processing; of its variants (Argon2d, Argon2i, Argon2id) most applications should use **Argon2id**. **PBKDF2** hashes the password many thousands or millions of times instead of once — more iterations mean more security — and is very widely supported.

### Why Fast Hashes Are Bad for Passwords

Algorithms like MD5, SHA-1, and SHA-256 are designed to be extremely fast, so attackers can compute billions of hashes per second. Password hashing should instead be **slow and memory-intensive** to raise the cost of cracking.

### Comparison of Storage Methods

| Method | Recommended? | Reason |
|--------|--------------|--------|
| **Plaintext** | No | Immediate compromise |
| **Encryption** | No | Requires a decryption key |
| **MD5** | No | Broken |
| **SHA-1** | No | Broken |
| **SHA-256 alone** | No | Too fast |
| **bcrypt** | Yes | Automatic salt, slow |
| **scrypt** | Yes | Memory-hard |
| **Argon2id** | Yes | Best modern choice |
| **PBKDF2** | Yes | Widely supported |

> **Security relevance:** bcrypt, scrypt, Argon2, and PBKDF2 are slow by design. That slowness is a feature — it makes GPU-accelerated brute-force attacks impractical, unlike fast general-purpose hashes.

---

## Task 11 — Recognising Password Hashes

During penetration testing, CTFs, and forensic investigations, you often encounter password hashes. Before cracking one, you must identify which algorithm produced it, whether it contains a salt, and which tool to use.

Correct identification matters because different algorithms require different cracking modes:

| Algorithm | Hashcat Mode |
|-----------|-------------:|
| **MD5** | 0 |
| **NTLM** | 1000 |
| **SHA-256** | 1400 |

If you select the wrong algorithm, the hash will never crack.

### Can Tools Detect Hash Types?

Tools such as hashID, Hashcat's example-hash list, and online identifiers can help, but automatic detection is not always accurate because some formats look identical — both MD5 and NTLM are 32 hex characters. Context matters. Consider the hash `5f4dcc3b5aa765d61d8327deb882cf99`; where it came from changes the likely answer:

| Source | Likely Algorithm |
|--------|------------------|
| **Linux password database** | Probably not plain MD5 |
| **Windows SAM database** | NTLM |
| **Website database** | MD5, SHA-1, bcrypt, Argon2, or PBKDF2 |

### Common Hash Lengths

| Algorithm | Length |
|-----------|--------|
| **MD5** | 32 hex |
| **SHA-1** | 40 hex |
| **SHA-256** | 64 hex |
| **SHA-512** | 128 hex |
| **NTLM** | 32 hex |
| **bcrypt** | Variable (starts with `$2`) |
| **Argon2** | Variable (starts with `$argon2`) |

> **Tip:** Prefix recognition is one of the quickest ways to identify a Linux password hash — `$2b$` is bcrypt, `$argon2id$` is Argon2id, and `$6$` is SHA-512crypt.

---

## Task 12 — Linux Password Storage

Modern Linux stores password hashes inside `/etc/shadow`, which requires root privileges to read. Older systems used `/etc/passwd`, which was readable by everyone, so for security the hashes were moved to `/etc/shadow`.

### Structure of /etc/shadow

Each line contains the username, password hash, password info, and expiry information, separated by colons:

```text
surya:$y$j9T$76UzfgEM5Pn.../0OSg64dh...:19965:0:99999:7:::
```

### Password Field Format

The password field itself has four parts in the form `$prefix$options$salt$hash`. In `$y$j9T$76UzfgEM5Pn...0OSg64dh...`, `$y$` is the algorithm, `$j9T$` holds the parameters, `76UzfgEM5Pn...` is the salt, and `0OSg64dh...` is the hash.

### Linux Hash Prefixes

Different algorithms use different prefixes at the start of the password field.

| Prefix | Algorithm |
|--------|-----------|
| **`$y$`** | yescrypt |
| **`$gy$`** | gost-yescrypt |
| **`$7$`** | scrypt |
| **`$2a$` / `$2b$` / `$2x$` / `$2y$`** | bcrypt |
| **`$6$`** | SHA-512crypt |
| **`$5$`** | SHA-256crypt |
| **`$1$`** | MD5crypt |

For example, `surya:$6$abc123$3Aq8F...` means SHA-512crypt (`$6$`), with `abc123` as the salt and `3Aq8F...` as the hash.

### Viewing Shadow Entries

```bash
sudo cat /etc/shadow
grep surya /etc/shadow
```

```text
surya:$y$j9T$76UzfgEM5Pn...:19965:0:99999:7:::
```

> **Warning:** `/etc/shadow` is readable only by root precisely because it contains password hashes. Never expose it, and treat any leaked shadow file as a full credential compromise.

---

## Task 13 — Windows Password Storage and NTLM

Windows stores password hashes inside the **SAM** (Security Account Manager) database. Unlike Linux, normal users cannot access it directly. Attackers often extract SAM hashes using tools such as Mimikatz, `secretsdump.py` (Impacket), or `reg save` for offline extraction.

Modern Windows primarily uses **NTLM** for password hashing. Although both NTLM and MD5 produce 32 hex characters, they are completely different algorithms — NTLM is not MD5.

| Hash | Characteristics |
|------|-----------------|
| **LM** | Legacy, uppercase only, weak, easy to crack |
| **NTLM** | Stronger than LM, but outdated versus modern password hashes (bcrypt, scrypt, Argon2) |

---

## Task 14 — Hashcat and John the Ripper

**Hashcat** is one of the fastest password-cracking tools, available at `https://hashcat.net`. It supports GPU cracking, CPU cracking, and hundreds of algorithms.

The basic syntax specifies a hash type (`-m`), an attack mode (`-a`), the target hash file, and a wordlist:

```bash
hashcat -m <hash_type> -a <attack_mode> hash.txt wordlist.txt
```

```bash
hashcat -m 0 -a 0 hash.txt rockyou.txt
```

### Hashcat Attack Modes

| Mode | Description |
|------|-------------|
| **`0`** | Straight (dictionary) |
| **`3`** | Brute force |
| **`6`** | Hybrid wordlist + mask |
| **`7`** | Hybrid mask + wordlist |

Most beginners start with `-a 0`, a dictionary attack. For specific hash types you change the mode — `hashcat -m 1000` for NTLM, `hashcat -m 3200` for bcrypt.

### John the Ripper

John the Ripper (often just "John") is another popular password cracker, favoured for its ease of use and auto-detection:

```bash
john --wordlist=rockyou.txt hashes.txt
john --show hashes.txt
```

### Hashcat vs John

| Hashcat | John the Ripper |
|---------|-----------------|
| **Excellent GPU support** | CPU-focused by default |
| **Faster on GPUs** | Easier for beginners |
| **Supports hundreds of formats** | Excellent auto-detection |
| **Popular in pentesting** | Popular in forensics |

### Password Cracking with GPUs

Hashing involves mathematical calculations, and GPUs contain thousands of cores, letting them compute hashes far faster than a CPU's few cores — reaching millions or billions of hashes per second. This is exactly why bcrypt, scrypt, and Argon2 are intentionally slow and memory-intensive: GPUs excel at parallel computation, but large memory requirements sharply reduce their advantage.

Hashcat works best on the host operating system for direct GPU access; inside a virtual machine GPU access is limited and slower. John the Ripper, being CPU-based, works well inside virtual machines. The typical workflow is: find the hash, identify the algorithm, choose the matching Hashcat mode, pick a wordlist, run the tool, and recover the password.

> **Security relevance:** GPU acceleration can try billions of candidates per second, so weak passwords protected by fast hashes fall almost instantly. Use these tools only for authorised auditing, and defend by enforcing strong passwords and slow, salted hashing.

---

## Task 15 — Hashing for Integrity Checking

Beyond password storage, another critical use of hashing is **integrity checking** — ensuring data has not been modified. Because of the avalanche effect, even changing a single bit produces a completely different hash.

Integrity answers one simple question: **has this file changed?** If the hash of the original file matches the hash of a downloaded copy, the files are considered identical.

```text
Original File            Downloaded File
   |                          |
 SHA-256                    SHA-256
   |                          |
 ABC123                     ABC123
                              |
                        Identical -> safe
```

When downloading a large file like `Ubuntu.iso`, you want to know whether the download completed, whether it was corrupted, and whether an attacker modified it. Instead of comparing a 4 GB file byte by byte, you compare its SHA-256 hash, which is far faster.

### File Verification Process

```text
Official Website
   |
Publishes SHA-256
   |
Download File
   |
Run SHA-256 Locally
   |
Compare
   |
Match? -> YES -> Safe File
```

For example, if Fedora publishes `Fedora.iso` with digest `8d3cb4d99f...`, you run `sha256sum Fedora.iso` yourself and a matching output verifies integrity. The standard Linux tools are:

```bash
md5sum file.txt
sha1sum file.txt
sha256sum file.txt
sha512sum file.txt
```

Hashes also help detect duplicate files: two photos that produce the same SHA-256 hash are the same file, which is useful for backup software, cloud storage, and duplicate removal.

> **Warning:** A hash only tells you whether a file changed — not who changed it or why. For authentication of the source, you need something stronger than a plain hash.

---

## Task 16 — HMAC (Hash-Based Message Authentication Code)

HMAC combines a **hash function** with a **secret key** to provide both **integrity** and **authentication**. Unlike a normal hash, HMAC proves who created the message.

### Why Normal Hashing Isn't Enough

Suppose Alice sends `Hello Bob` along with its SHA-256 hash. An attacker could change the message to `Hello Hacker` and simply calculate a new SHA-256 hash. Bob has no way to detect the attacker, because anyone can compute a plain hash.

### The HMAC Solution

Instead, Alice combines a secret key with the message before hashing. Since the attacker does not know the secret key, they cannot create a valid HMAC.

```text
Message
   +
Secret Key
   |
Hash Function
   |
  HMAC
   |
Send: Message + HMAC
   |
Receiver recalculates with same key
   |
Compare -> Match? -> Authentic
```

Bob receives the message and HMAC, uses the same secret key to calculate the HMAC himself, and if it matches, the message is authentic and unmodified.

### HMAC Internal Steps

Conceptually, HMAC applies two hashing operations using padded versions of the key. The formal definition is `HMAC(K, M) = H((K ⊕ opad) || H((K ⊕ ipad) || M))`, where `K` is the secret key, `M` is the message, `ipad` is the inner padding, and `opad` is the outer padding. You do not need to memorise the formula — just remember that HMAC performs two hashing operations using a secret key.

### Why HMAC Is Secure and Where It Is Used

An attacker knows the message and the hash algorithm but not the secret key, so creating a valid HMAC is practically impossible. HMAC is used in HTTPS, JWT tokens, API authentication, AWS request signing, OAuth, banking APIs, and secure cookies.

> **Security relevance:** A plain hash proves only that data is unchanged; HMAC proves it came from someone holding the shared secret key. That is why APIs and tokens rely on HMAC rather than a bare hash.

---

## Task 17 — Hashing vs Encoding vs Encryption

These three concepts are often confused, but each has a distinct purpose.

| Feature | Hashing | Encoding | Encryption |
|---------|---------|----------|------------|
| **Reversible** | No | Yes | Yes |
| **Uses a key** | No | No | Yes |
| **Protects confidentiality** | No | No | Yes |
| **Integrity checking** | Yes | No | No |
| **Password storage** | Yes | No | No |

**Hashing** is one-way, uses no keys, and cannot recover the original — ideal for integrity and password storage (`hello` → SHA-256 → `2cf24dba...`). **Encoding** simply represents data in a different format and is fully reversible with no security (`Hello` → Base64 → `SGVsbG8=` → decode → `Hello`). **Encryption** uses keys, is reversible, and protects confidentiality (`Hello` → AES → ciphertext → key → `Hello`).

### Base64

Base64 is **encoding, not encryption** — anyone can decode it, so it must never be used to hide passwords:

```bash
echo "TryHackMe" | base64
echo "VHJ5SGFja01lCg==" | base64 -d
```

Common misconceptions to avoid: Base64 is **not** encryption, MD5 does **not** encrypt passwords, and hashes **cannot** be decrypted. Correctly, Base64 is encoding, AES is encryption, and SHA-256 is a hash function.

> **Security relevance:** Base64 provides zero protection — it is a representation format, not a security control. Treating encoded data as if it were encrypted is a common and dangerous mistake.

---

## Quick Revision

| Concept | Recall |
|---------|--------|
| Hashing direction | One-way, cannot be decrypted |
| Output size | Fixed length, no keys |
| Avalanche effect | Tiny input change → huge hash change |
| Broken hashes | MD5 (128-bit), SHA-1 (160-bit) |
| Secure hashes | SHA-256, SHA-512 |
| Password hashes | Argon2id, bcrypt, scrypt, PBKDF2 |
| Salt | Random value that defeats rainbow tables |
| Linux hashes | `/etc/shadow` (`$6$` = SHA-512crypt) |
| Windows hashes | SAM / NTLM |
| Cracking tools | Hashcat (GPU), John (CPU) |
| Integrity | `sha256sum` |
| Authentication | HMAC (hash + secret key) |
| Encoding | Base64 (not encryption) |

**Key idea:** Hashing is a one-way, fixed-size fingerprint of data. It secures passwords when combined with a unique salt and a slow algorithm, verifies integrity through the avalanche effect, and — with a secret key — becomes HMAC for authentication. It is neither encryption nor encoding.

---

## 30-Second Revision

- Hashing is **one-way** and produces a **fixed-size** digest with **no keys**; you cannot recover the original input.
- The **avalanche effect** means one changed bit produces a completely different hash — the basis of integrity checking.
- **MD5** (128-bit) and **SHA-1** (160-bit) are broken; **SHA-256** and **SHA-512** are secure.
- **Collisions** are unavoidable by the pigeonhole principle, but secure algorithms make intentional ones infeasible.
- Never store plaintext or encrypted passwords; use **salting** plus a slow hash — **Argon2id**, **bcrypt**, **scrypt**, or **PBKDF2**.
- **Salting** defeats rainbow tables by making identical passwords hash differently; the salt is stored, not secret.
- Recognise hashes by **prefix and length**: `$2b$` bcrypt, `$6$` SHA-512crypt, 32 hex MD5/NTLM, 64 hex SHA-256.
- Linux hashes live in **`/etc/shadow`**; Windows uses **SAM / NTLM** (NTLM is not MD5).
- **Hashcat** cracks on the GPU, **John** on the CPU; slow hashes resist GPU attacks.
- **HMAC** = hash + secret key, giving integrity **and** authentication. **Hashing ≠ encoding ≠ encryption**.

---

## Cheat Sheet

### Hash Algorithms

| Algorithm | Length | Status |
|-----------|--------|--------|
| **MD5** | 128 bits / 32 hex | Broken |
| **SHA-1** | 160 bits / 40 hex | Broken |
| **SHA-256** | 256 bits / 64 hex | Secure |
| **SHA-512** | 512 bits / 128 hex | Secure |
| **NTLM** | 32 hex | Windows, outdated |

### Password Hashing Algorithms

| Algorithm | Note |
|-----------|------|
| **bcrypt** | Slow, auto-salted; prefix `$2b$` |
| **scrypt** | Memory-hard; prefix `$7$` |
| **Argon2id** | Modern recommended password hash |
| **PBKDF2** | Iterated key-derivation function |

### Linux Hash Prefixes

| Prefix | Algorithm |
|--------|-----------|
| **`$1$`** | MD5crypt |
| **`$5$`** | SHA-256crypt |
| **`$6$`** | SHA-512crypt |
| **`$2a$` / `$2b$`** | bcrypt |
| **`$7$`** | scrypt |
| **`$y$`** | yescrypt |
| **`$argon2id$`** | Argon2id |

### Commands

```bash
# Integrity — generate and verify file hashes
md5sum file.txt
sha1sum file.txt
sha256sum file.iso
sha512sum file.txt

# Inspect Linux password hashes (root required)
sudo cat /etc/shadow
grep surya /etc/shadow

# Crack hashes with Hashcat (GPU) — mode + attack + hash + wordlist
hashcat -m 0 -a 0 hash.txt rockyou.txt        # MD5 dictionary
hashcat -m 1000 -a 0 hashes.txt rockyou.txt   # NTLM
hashcat -m 3200 -a 0 bcrypt.txt rockyou.txt   # bcrypt

# Crack hashes with John the Ripper (CPU)
john --wordlist=rockyou.txt hashes.txt
john --show hashes.txt

# Base64 is encoding, NOT encryption
echo "TryHackMe" | base64
echo "VHJ5SGFja01lCg==" | base64 -d
```

---

## Interview Questions

**Q1. What is hashing?**
Hashing is a one-way process that converts data of any size into a fixed-size digest. It uses no keys and cannot be reversed, which makes it ideal for integrity checking and password storage.

**Q2. Why can't hashes be decrypted?**
Because a hash function is designed as a one-way function. The output is a fixed-size fingerprint that discards the structure needed to reconstruct the original input, so there is no practical way to reverse it.

**Q3. What is the avalanche effect?**
It is the property that a tiny change in the input — even a single bit — produces a completely different hash. This is what makes hashing reliable for detecting any modification to data.

**Q4. What is a collision, and why do collisions exist?**
A collision is when two different inputs produce the same hash. They are mathematically unavoidable because inputs are unlimited while hash outputs are a fixed, finite size — the pigeonhole principle. Secure algorithms make finding one intentionally infeasible.

**Q5. Why are MD5 and SHA-1 considered insecure?**
Both have practical, demonstrated collision attacks, so an attacker can craft two different inputs with the same hash. They must not be used for new security-sensitive applications.

**Q6. What is a salt and what problem does it solve?**
A salt is a unique random value added to a password before hashing. It ensures that identical passwords produce different hashes, which defeats precomputed rainbow tables and hides password reuse. The salt is stored alongside the hash and need not be secret.

**Q7. Why should passwords use bcrypt or Argon2id instead of MD5 or SHA-256?**
MD5 and SHA-256 are extremely fast, so GPUs can try billions of guesses per second. bcrypt, scrypt, Argon2id, and PBKDF2 are deliberately slow and salted (and often memory-hard), which makes brute-force attacks far more expensive.

**Q8. What is HMAC and how does it differ from a plain hash?**
HMAC combines a hash function with a secret key to provide both integrity and authentication. A plain hash only proves data is unchanged; HMAC also proves the message came from someone holding the shared secret key, so an attacker cannot forge a valid one.

**Q9. What is the difference between hashing, encoding, and encryption, and is Base64 secure?**
Hashing is one-way and used for integrity and password storage. Encoding (like Base64) is reversible and provides no security — it only reformats data, so Base64 must never be used to hide passwords. Encryption is reversible with a key and protects confidentiality.

---

## Final Takeaway

**Hashing** is fundamentally different from **encryption**: a hash function creates a fixed-size, **one-way** digest that cannot be reversed, making it ideal for verifying integrity and storing passwords. Its properties — determinism, speed, one-way behaviour, and the **avalanche effect** — underpin everything from software-download checks to login systems, while the **pigeonhole principle** explains why collisions exist yet stay impractical for secure algorithms like **SHA-256**. Passwords must never be stored in plaintext or encrypted; they belong in a unique **salt** combined with a deliberately slow algorithm such as **Argon2id** or **bcrypt**, which defeats **rainbow tables** and GPU-accelerated cracking. Recognising hashes by prefix, length, and context lets you work with `/etc/shadow` on Linux and SAM/NTLM on Windows, and tools like Hashcat and John the Ripper turn that knowledge into authorised password auditing. Finally, **HMAC** extends hashing with a secret key for authentication, and remembering that hashing, encoding, and encryption are three different things — with **Base64** offering no protection at all — is what keeps a security design sound.
