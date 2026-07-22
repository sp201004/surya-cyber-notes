| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Cryptography / Bonus Revision |
| **Difficulty** | Beginner |
| **Time** | ~15 Minutes |
| **Module** | Cryptography |

---

## Objective

This Mystery Chest is a **bonus revision vault** for the entire Cryptography module. It consolidates the most important reference material from every room — Cryptography Basics, Public Key Cryptography, Hashing Basics, and John the Ripper — into one quick-reference place.

Use it as a lookup before a lab, an exam, or an interview. Everything here was covered across the module: the core terms, symmetric and asymmetric encryption, hashing and password storage, digital signatures and PKI, and the command-line tools you drive to audit and recover passwords.

---

## Core Terms

Cryptography starts with a shared vocabulary. These terms recur in every room and underpin every algorithm and tool that follows.

| Term | Meaning |
|------|---------|
| **Plaintext** | Original readable data before encryption. |
| **Ciphertext** | Encrypted, unreadable data. |
| **Cipher** | The encryption/decryption algorithm. |
| **Key** | Secret value that drives encryption and decryption. |
| **Encryption** | Plaintext converted into ciphertext. |
| **Decryption** | Ciphertext converted back into plaintext. |
| **XOR** | Bitwise operation returning 1 only when bits differ. |
| **Modulo** | Returns the remainder after division. |

> **Security relevance:** Modern cryptography assumes the algorithm is public — only the key is secret. Confusing plaintext with ciphertext, or assuming secrecy of the algorithm provides protection, leads to broken designs.

---

## Symmetric vs Asymmetric

The central split in encryption is whether both parties share one secret key or each party holds a public/private key pair. Symmetric is fast for bulk data; asymmetric solves key exchange and identity.

| Property | Symmetric | Asymmetric |
|----------|-----------|------------|
| **Keys** | One shared secret key | Public + private key pair |
| **Speed** | Fast, efficient for bulk data | Slower, for small data |
| **Main use** | Encrypting large amounts of data | Key exchange, signatures, identity |
| **Examples** | AES, ChaCha20, DES, 3DES | RSA, Diffie-Hellman, ECC |
| **Challenge** | Sharing the key securely | Computationally expensive |

> **Security relevance:** Real protocols combine both — asymmetric cryptography (RSA or Diffie-Hellman) safely establishes a shared secret, then fast symmetric encryption (AES) protects the actual data. This hybrid model powers HTTPS, SSH, and VPNs.

---

## Common Algorithms

Each algorithm has a clear purpose. Knowing which are secure and which are deprecated is essential for reading configurations and audit findings.

### Symmetric Algorithms

| Algorithm | Status |
|-----------|--------|
| **DES** | Insecure — do not use. |
| **3DES** | Deprecated old upgrade. |
| **AES** | Industry standard for encrypting data. |
| **ChaCha20** | Modern, fast stream cipher. |

### Asymmetric Algorithms

| Algorithm | Purpose |
|-----------|---------|
| **RSA** | Public-key encryption; based on prime factorization. |
| **Diffie-Hellman** | Secure key exchange; based on the discrete logarithm problem. |
| **ECDHE** | Modern TLS key exchange (ephemeral, elliptic curve). |
| **ECC** | Efficient public-key cryptography — smaller keys, same security. |

> **Security relevance:** RSA encrypts small secrets and signs data, Diffie-Hellman generates a shared secret without transmitting it, and AES encrypts the bulk data afterward because it is far faster. RSA and ECC solve a different problem from AES — never treat them as interchangeable.

---

## Encryption Cycle

The end-to-end flow shows where symmetric and asymmetric keys fit, from plaintext on the sender's side to plaintext on the receiver's side.

```
                Plaintext
                     |
                     v
             Encryption Algorithm
                     |
          +----------+----------+
          |                     |
          v                     v
    Symmetric Key         Public Key
          |                     |
          v                     v
               Ciphertext
                     |
              Internet/Network
                     |
                     v
             Decryption Algorithm
                     |
          +----------+----------+
          |                     |
          v                     v
    Same Secret Key       Private Key
          |
          v
                 Plaintext
```

> **Security relevance:** The ciphertext travels across an untrusted network, so its confidentiality rests entirely on key secrecy. Symmetric decryption needs the same secret key; asymmetric decryption needs the matching private key.

---

## Hashing

Hashing is fundamentally different from encryption: it is a one-way function producing a fixed-size digest, ideal for integrity checks and password storage. It cannot be reversed.

### Hash Functions

| Algorithm | Length | Status |
|-----------|--------|--------|
| **MD5** | 128 bits | Broken. |
| **SHA-1** | 160 bits | Broken. |
| **SHA-256** | 256 bits | Secure. |
| **SHA-512** | 512 bits | Secure. |

### Password Hashing Algorithms

Password storage uses deliberately slow, salted algorithms to resist brute-force and rainbow-table attacks.

| Algorithm | Note |
|-----------|------|
| **bcrypt** | Slow, salted; prefix `$2a$` / `$2b$`. |
| **scrypt** | Memory-hard password hashing. |
| **Argon2id** | Modern recommended password hash. |
| **PBKDF2** | Iterated key-derivation function. |

### Hash Recognition

Prefixes, lengths, and context help identify which algorithm produced a hash.

| Prefix / Context | Algorithm |
|------------------|-----------|
| **`$1$`** | MD5 crypt. |
| **`$2a$` / `$2b$`** | bcrypt. |
| **`$6$`** | SHA-512 crypt (Linux `/etc/shadow`). |
| **`$argon2id$`** | Argon2id. |
| **32 hex chars** | Likely MD5. |
| **40 hex chars** | Likely SHA-1. |
| **64 hex chars** | Likely SHA-256. |

Where hashes live on each platform, plus related helpers:

```text
Linux    -> /etc/shadow
Windows  -> SAM / NTLM
Integrity -> sha256sum
Auth     -> HMAC (hash + secret key)
Encoding -> Base64 (NOT encryption)
```

> **Security relevance:** MD5 and SHA-1 are broken and must not secure new systems. Passwords should never be stored with plain hashes — always use a slow, salted password hash like Argon2id or bcrypt. Base64 is encoding, not encryption, and provides no protection.

---

## Digital Signatures And PKI

Asymmetric cryptography also proves who sent data and binds identities to keys. Signatures give integrity, authentication, and non-repudiation; certificates and PKI establish trust on the Internet.

| Concept | Meaning |
|---------|---------|
| **Digital Signature** | Proves authenticity, integrity, and non-repudiation. |
| **Signing Key** | The **private key** creates the signature. |
| **Verifying Key** | The **public key** verifies the signature. |
| **Certificate** | Binds an identity to a public key. |
| **Certificate Authority (CA)** | Trusted organization that issues and signs certificates. |
| **PKI** | Public Key Infrastructure — framework managing keys, certificates, and trust. |

### Email And File Security

| Technology | Purpose |
|------------|---------|
| **PGP** | Original software for secure email. |
| **GPG** | Free, open-source implementation of the OpenPGP standard. |

> **Security relevance:** A signature made with a private key and verified with the matching public key is what lets a recipient trust a sender or a software release. Certificates and CAs extend that trust to strangers on the Internet, which is why a leaked private key is catastrophic — it enables both decryption and impersonation.

---

## OpenSSL And GPG Quick Reference

OpenSSL and GPG are the everyday command-line tools for keys, certificates, hashing, and encrypted email or files.

```bash
# Generate an RSA private key and matching public key
openssl genrsa -out private.key 2048
openssl rsa -in private.key -pubout -out public.key

# Inspect a certificate
openssl x509 -in cert.pem -text -noout

# Hash a file for integrity
sha256sum file.iso
openssl dgst -sha256 file.iso

# GPG: generate a key pair, encrypt and decrypt
gpg --full-generate-key
gpg --encrypt --recipient user@example.com file.txt
gpg --decrypt file.txt.gpg
```

> **Security relevance:** These tools let you create the keys and certificates that underpin TLS and SSH, and verify downloaded files against a published hash. Handle generated private keys carefully — anyone who obtains one can decrypt or impersonate.

---

## SSH Keys

SSH uses asymmetric cryptography for authentication and symmetric encryption for the session itself. The key pair and its supporting files are worth memorizing.

```bash
# Generate an SSH key pair
ssh-keygen -t ed25519

# Copy the public key to a server
ssh-copy-id user@host
```

| File | Role |
|------|------|
| **`id_rsa` / `id_ed25519`** | Private key (keep secret). |
| **`.pub`** | Public key (shareable). |
| **`authorized_keys`** | Public keys allowed to log in to a host. |
| **`known_hosts`** | Server public keys the client has trusted. |

> **Security relevance:** SSH authentication proves identity without ever sending a password over the wire. The private key must stay protected — commonly with a passphrase — because it is the sole credential that grants access.

---

## John The Ripper Commands

John the Ripper performs offline password recovery: it generates candidate passwords, hashes them with the right algorithm, and compares against stored hashes. Offline cracking is fast because there is no network delay or account lockout.

### Core Commands

```bash
john                                        # check version
john --wordlist=rockyou.txt hash.txt        # dictionary attack
john --format=raw-md5 hash.txt              # specify hash format
john --single hashes.txt                    # single crack mode (uses usernames)
john --rules --wordlist=rockyou.txt hash.txt # mutate words with rules
john --incremental hashes.txt               # brute force when all else fails
john --restore                              # resume an interrupted session
john --show hash.txt                        # display recovered passwords
```

### Attack Modes

| Mode | Flag | When To Use |
|------|------|-------------|
| **Dictionary** | `--wordlist=` | First try, using a wordlist like `rockyou.txt`. |
| **Single Crack** | `--single` | Guesses from usernames and GECOS info. |
| **Rules** | `--rules` | Mutates words (numbers, symbols, capitalization). |
| **Incremental** | `--incremental` | Pure brute force when everything else fails. |

> **Security relevance:** Offline cracking bypasses lockouts entirely, which is why weak passwords fall quickly. This makes John a core tool for authorized password auditing — and a reminder to enforce strong, unique passwords and slow hashing.

---

## John Helper Tools

John cannot attack archives, SSH keys, or Linux hashes directly — helper tools first extract a crackable hash. Never attempt to crack the archive itself.

```bash
zip2john file.zip > zip.hash        # extract hash from a ZIP archive
rar2john file.rar > rar.hash        # extract hash from a RAR archive
ssh2john id_rsa > ssh.hash          # extract passphrase hash from SSH key
unshadow passwd shadow > hashes.txt # merge /etc/passwd + /etc/shadow
```

| Tool | Source | Produces |
|------|--------|----------|
| **zip2john** | ZIP archive | Hash John can attack. |
| **rar2john** | RAR archive | Hash John can attack. |
| **ssh2john** | SSH private key | Passphrase hash (attacks the passphrase, not the key). |
| **unshadow** | `/etc/passwd` + `/etc/shadow` | Combined file John can read. |

### Password-Cracking Workflow

```
Wordlist
   |
   v
Rules  ->  Mutated Passwords
   |
   v
 John  ->  hash comparison
   |
   v
Recovered Password  ->  john --show
```

> **Security relevance:** `unshadow` combines the username file with the hash file because John needs both. `ssh2john` attacks the passphrase protecting a private key, not the key itself. Keeping original hash files unchanged and choosing the correct format are what make the workflow reliable.

---

## John vs Hashcat

Both are offline cracking tools; the practical difference is hardware focus. John is optimized for the CPU with broad format support and ease of use, while Hashcat is optimized for GPU-accelerated recovery on large keyspaces.

```bash
hashcat -m 0 -a 0 hash.txt rockyou.txt   # GPU dictionary attack, MD5
```

> **Security relevance:** GPU acceleration in Hashcat can try billions of candidates per second, which is exactly why fast hashes like MD5 are unsuitable for passwords and slow, salted hashes are mandatory.

---

## Quick Revision

| Concept | Recall |
|---------|--------|
| Symmetric standard | AES |
| Asymmetric encryption | RSA (prime factorization) |
| Key exchange | Diffie-Hellman (shared secret) |
| Signature keys | Private signs, public verifies |
| Broken hashes | MD5 (128-bit), SHA-1 (160-bit) |
| Secure hashes | SHA-256, SHA-512 |
| Password hashes | Argon2id, bcrypt, scrypt, PBKDF2 |
| bcrypt prefix | `$2a$` / `$2b$` |
| Linux hashes | `/etc/shadow` (`$6$` = SHA-512) |
| Windows hashes | SAM / NTLM |
| First John attempt | `john --wordlist=rockyou.txt hash.txt` |
| Show cracked | `john --show hash.txt` |
| Archive helpers | `zip2john`, `rar2john`, `ssh2john`, `unshadow` |

**Key idea:** Cryptography protects data three ways — encryption for confidentiality, hashing for integrity and password storage, and signatures for authenticity — and the same math that secures it (slow, salted hashing) is what makes weak passwords fall to tools like John.

---

## 30-Second Revision

- Encryption is reversible with a key; hashing is one-way and fixed-length. Encoding (Base64) is neither and provides no protection.
- Symmetric (AES, ChaCha20) is fast for bulk data; asymmetric (RSA, Diffie-Hellman, ECC) handles key exchange, signatures, and identity.
- DES and 3DES are dead; AES is the standard. RSA encrypts small secrets and signs, Diffie-Hellman shares a secret, AES then encrypts the data.
- MD5 (128-bit) and SHA-1 (160-bit) are broken; SHA-256 and SHA-512 are secure. Passwords need slow, salted hashes: Argon2id, bcrypt, scrypt, PBKDF2.
- Recognize hashes by prefix and length: `$2a$` bcrypt, `$6$` SHA-512 crypt, 32 hex MD5, 64 hex SHA-256.
- Digital signatures use the private key to sign and the public key to verify, giving integrity, authentication, and non-repudiation; PKI and CAs bind identities to keys.
- John cracks hashes offline with dictionary, single, rules, and incremental modes; helper tools `zip2john`, `rar2john`, `ssh2john`, and `unshadow` extract crackable hashes first.

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is the difference between symmetric and asymmetric encryption?** | Symmetric encryption uses a single shared secret key and is fast, so it encrypts bulk data (AES, ChaCha20). Asymmetric encryption uses a public/private key pair and is slower, so it handles key exchange, digital signatures, and identity (RSA, Diffie-Hellman, ECC). Real protocols combine both. |
| **Q2. How is hashing different from encryption?** | Encryption is a two-way process reversible with a key, protecting confidentiality. Hashing is a one-way function producing a fixed-size digest that cannot be reversed, used for integrity checks and password storage. Base64, by contrast, is only encoding and offers no security. |
| **Q3. Which key creates a digital signature, and which verifies it?** | The private key creates the signature and the corresponding public key verifies it. This provides authenticity, integrity, and non-repudiation, since only the holder of the private key could have produced the signature. |
| **Q4. Why should passwords be stored with algorithms like bcrypt or Argon2id instead of MD5?** | MD5 is broken and extremely fast, so GPU-accelerated tools can try billions of guesses per second. bcrypt, scrypt, Argon2id, and PBKDF2 are deliberately slow and salted, which defeats rainbow tables and dramatically slows brute-force attacks. |
| **Q5. What does `unshadow` do and why is it needed for John the Ripper?** | `unshadow` merges `/etc/passwd` and `/etc/shadow` into a single combined file. John needs both the username information from `passwd` and the password hashes from `shadow` in one format before it can attempt to crack Linux account passwords. |

## Final Takeaway

The Mystery Chest is your one-page memory aid for the **Cryptography module**. Skim it before any lab, exam, or interview: the core terms, the **symmetric-versus-asymmetric** split, the algorithm and hash tables with their prefixes and lengths, the signature and PKI concepts, and the **OpenSSL**, **GPG**, and **John the Ripper** references here cover the vast majority of what you will meet. Because cryptography reduces to three jobs — confidentiality through **encryption**, integrity and password storage through **hashing**, and authenticity through **signatures** — mastering how the algorithms, hashes, and tools fit together is what lets you protect data and audit its weaknesses with confidence.
