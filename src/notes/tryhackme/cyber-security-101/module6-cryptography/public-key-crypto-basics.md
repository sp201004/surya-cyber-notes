| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Cryptography / Public Key |
| **Difficulty** | Beginner |
| **Time** | ~50 Minutes |
| **Module** | Cryptography |

---

## Objective

Symmetric encryption is fast but leaves one hard problem unsolved: how do two people share a secret key over a network an attacker is watching? **Public key cryptography** answers that with a pair of mathematically related keys — one public, one private — and it underpins almost every secure system on the Internet.

By the end of this room you will be able to:

- Recap the difference between **symmetric** and **asymmetric** encryption and when each is used
- Explain **public/private key pairs** and the lock-box intuition behind them
- Describe **hybrid encryption** and how it solves the secure key exchange problem
- Understand **RSA** — primes, one-way functions, key pairs, and the communication flow
- Walk through the **Diffie-Hellman** key exchange step by step
- Use **SSH** key-based authentication, `ssh-keygen`, and `authorized_keys`
- Explain **digital signatures**, and how signing a hash proves integrity and authenticity
- Describe **certificates, CAs, PKI**, and the HTTPS trust chain
- Compare **PGP and GPG** and the **web of trust** model
- Recognise common **cryptographic attacks** and the best practices that defend against them

---

## Task 1 — Symmetric vs Asymmetric Recap

Cryptography converts readable **plaintext** into unreadable **ciphertext** so that only someone with the right key can recover the original data. Even if an attacker captures the traffic, without the key the ciphertext should be practically impossible to read.

`Plaintext ──► Encryption ──► Ciphertext ──► Decryption ──► Plaintext`. Good cryptographic systems provide four security properties.

| Goal | Meaning | Provided by |
|------|---------|-------------|
| **Confidentiality** | Only authorised users can read the data. | Encryption |
| **Integrity** | Data was not modified in transit. | Hashing / signatures |
| **Authentication** | You are talking to the genuine party. | Certificates / keys |
| **Non-repudiation** | A sender cannot later deny sending a message. | Digital signatures |

### Core Terminology

| Term | Meaning |
|------|---------|
| **Plaintext** | Readable data, e.g. `Hello World`. |
| **Ciphertext** | Encrypted, unreadable data, e.g. `8dk2@!#AA9kL*`. |
| **Encryption** | Converting plaintext into ciphertext. |
| **Decryption** | Converting ciphertext back into plaintext. |
| **Cipher** | The mathematical algorithm (AES, RSA, ChaCha20, DES). |
| **Key** | Secret value that controls encryption; different keys produce different ciphertext. |

### Symmetric Encryption

Symmetric encryption uses **one** key — the same secret key encrypts and decrypts the data. Both users must already know that key.

```text
Sender ──► Secret Key ──► Encrypt ──► Ciphertext ──► Internet ──► Decrypt ◄── Secret Key ──► Receiver
```

It is very fast and well suited to VPNs, file encryption, disk encryption, and Wi-Fi. Its weakness is key distribution: if the attacker gets the shared key, everything is compromised.

### Asymmetric Encryption

Asymmetric encryption uses **two** mathematically related keys — a public key and a private key. Knowing the public key must not reveal the private key.

| Key | Can be shared? | Purpose |
|-----|----------------|---------|
| **Public key** | Yes, freely | Encrypt data, verify signatures. |
| **Private key** | Never | Decrypt messages, create signatures. |

When Alice sends a message to Bob, she encrypts it with **Bob's public key**. Only Bob's private key can undo it.

```text
Alice ──► Encrypt with Bob's Public Key ──► Ciphertext
                                               │
                                           Internet
                                               │
Bob ◄── Plaintext ◄── Decrypt with Private Key ┘
```

Only Bob can read it, because only Bob owns the matching private key.

### The Lock-Box Analogy

The cleanest way to picture asymmetric keys is an open padlock. Bob hands out open locks (his public key); anyone can snap one shut on a box, but only Bob holds the key that opens it.

```text
Bob ──► Open Lock ──► Alice ──► locks secret in box ──► Bob ──► opens with private key
```

| Real world | Cryptography |
|------------|--------------|
| **Secret code** | Symmetric key |
| **Lock** | Public key |
| **Lock's key** | Private key |

> **Tip:** Remember "anyone can lock, only the owner can unlock." Public key locks, private key unlocks — and the private key must stay secret forever.

---

## Task 2 — Hybrid Encryption and Secure Key Exchange

Asymmetric encryption solves key distribution, but it is far slower than symmetric encryption. RSA is much slower than AES, so encrypting a large file or video stream purely with RSA would be painfully slow.

| Property | Symmetric | Asymmetric |
|----------|-----------|------------|
| **Keys** | One shared secret | Public + private pair |
| **Speed** | Very fast | Much slower |
| **Best for** | Bulk data | Key exchange, signatures, identity |
| **Examples** | AES, ChaCha20 | RSA, Diffie-Hellman, ECC |
| **Challenge** | Sharing the key safely | Computational cost |

### The Secure Key Exchange Problem

Suppose Alice and Bob want to use AES. Both need the same secret key, but the network is monitored. If Alice simply sends `AES Key = abc123`, the attacker captures it too. Game over.

The fix is to wrap the symmetric key inside asymmetric encryption:

```text
AES Key ──► Encrypt with Bob's Public Key ──► Ciphertext ──► Internet ──► Bob
                                                                           │
                                          Original AES Key ◄── Decrypt with Private Key
```

Now the attacker sees only ciphertext, and cannot recover the AES key without Bob's private key.

### Hybrid Encryption

Real systems combine both models: asymmetric cryptography **exchanges a symmetric key**, then fast symmetric encryption protects the actual data.

```text
Asymmetric Encryption ──► Securely exchange key
          │
          ▼
Symmetric Encryption ──► Actual communication (bulk data)
```

For example, encrypting a 5 GB movie with RSA would be far too slow. Instead a random AES key is generated, RSA protects just that small key (`RSA ──► protects ──► AES Key`), and AES encrypts the whole movie.

> **Security relevance:** This hybrid model powers HTTPS/TLS, SSH, VPNs, and OpenPGP. Asymmetric cryptography establishes a shared secret; fast symmetric encryption (AES) then does the heavy lifting on the bulk data. Opening `https://google.com` does exactly this — the browser uses RSA or ECDHE to agree a session key, then AES encrypts all traffic.

---

## Task 3 — RSA (Rivest–Shamir–Adleman)

RSA is one of the world's most famous public-key algorithms, developed in **1977** by Ron **R**ivest, Adi **S**hamir, and Leonard **A**dleman (the first letters of their surnames). It is used for key exchange, digital signatures, PKI/certificates, SSH, HTTPS/TLS, and email encryption.

### Security Comes From Mathematics, Not Secrecy

RSA is not secure because the algorithm is hidden — the algorithm is public. Its security rests on a hard mathematical problem: multiplying two large primes is easy, but factoring the result back into those primes is extremely difficult.

```text
Prime A × Prime B ──► Large Number     (easy)

Large Number ──► recover Prime A, Prime B     (very hard)
```

This is a **trapdoor one-way function**: easy in one direction, infeasible in reverse without the secret.

| Number type | Example | Factors |
|-------------|---------|---------|
| **Prime** | 13 | 1 × 13 only |
| **Composite** | 12 | 1, 2, 3, 4, 6, 12 |

Multiplying `113 × 127 = 14351` is trivial. Given only `14351`, guessing that the factors were 113 and 127 is much harder — and when both primes are 300 digits long, the multiplication is still practical but factoring becomes extraordinarily difficult.

### RSA Key Pair

RSA generates the public and private keys together, yet the public key cannot practically reveal the private key.

```text
Large Primes ──► Multiply ──► n ──► Public Key (e, n)
                                └─► Private Key (d, n)
```

At a high level, key generation:

1. Choose two very large prime numbers.
2. Multiply them to obtain `n`.
3. Compute Euler's totient value.
4. Select a public exponent `e`.
5. Calculate the matching private exponent `d`.
6. Publish `(e, n)` as the public key.
7. Keep `(d, n)` secret.

Conceptually, encryption and decryption are modular exponentiation (not simple multiplication):

```text
Ciphertext = Message^e mod n      (encrypt with public exponent e)
Message    = Ciphertext^d mod n   (decrypt with private exponent d)
```

Modern RSA commonly uses **2048, 3072, or 4096-bit** keys — larger keys resist brute force but cost more compute.

### RSA Communication Flow

```text
Alice ──► Plaintext ──► Encrypt with Bob's Public Key ──► Ciphertext
                                                             │
                                                         Internet
                                                             │
Bob ◄── Plaintext ◄── Decrypt with Private Key ◄─────────────┘
```

An attacker holding the ciphertext and public key still cannot decrypt, because the private key is missing and recovering it is computationally infeasible.

### RSA in Real Life

RSA rarely encrypts large files. It encrypts only a **small secret** — an AES key, session key, or random secret — and then AES does the bulk work. This is exactly how HTTPS operates internally.

| Advantages | Limitations |
|------------|-------------|
| Solves secure key exchange | Slower than symmetric encryption |
| No pre-shared secret required | Not for encrypting large files |
| Widely supported | Large key sizes |
| Basis of TLS, SSH, certificates | Needs proper padding (e.g. OAEP) |
| Enables digital signatures | Future quantum computers may threaten it |

> **Tip:** Whenever you hear "RSA", think **"protect the key, not the data."** RSA is for key exchange and signatures, not bulk file encryption — AES and ChaCha20 handle that.

---

## Task 4 — Diffie-Hellman Key Exchange

Diffie-Hellman (DH) is a **key exchange algorithm**, not an encryption algorithm — it does not encrypt data. Instead it lets two parties generate the **same shared secret** over an insecure network without ever transmitting that secret. Both sides pick a private number, derive a public value, exchange only the public values, and independently compute an identical shared secret.

It uses public parameters everyone knows — a large prime `p` and a generator `g` — plus a private number each side keeps secret and never transmits.

### Step by Step

> **Public parameters (known to everyone):** prime `p = 29`, generator `g = 3`.

| **1** | **Agree on public `p` and `g`**<br>Both sides agree on the public values `p = 29` and `g = 3`. |
| --- | --- |

| **2** | **Choose private numbers**<br>Alice picks `a = 13`; Bob picks `b = 15` (kept secret, never sent). |
| --- | --- |

| **3** | **Compute public keys**<br>Alice: `A = g^a mod p = 3^13 mod 29 = 19`<br>Bob: `B = g^b mod p = 3^15 mod 29 = 26` |
| --- | --- |

| **4** | **Exchange public keys**<br>Alice → `19` → Bob, and Bob → `26` → Alice. |
| --- | --- |

| **5** | **Compute shared secret**<br>Alice: `B^a mod p = 26^13 mod 29 = 10`<br>Bob: `A^b mod p = 19^15 mod 29 = 10` |
| --- | --- |

> ✅ **Shared Secret = `10`** — both sides derive the same value, and it is **never transmitted** across the network.

Both sides arrive at `10` without either one sending it across the wire. AES encryption can now begin using that shared secret.

### Why Attackers Can't Recover It

The attacker sees `p`, `g`, and both public keys (19 and 26), but not the private numbers (13 and 15). Recovering those requires solving the **Discrete Logarithm Problem**, which is computationally difficult.

### RSA vs Diffie-Hellman

| Property | RSA | Diffie-Hellman |
|----------|-----|----------------|
| **Function** | Encrypts small data | Does not encrypt data |
| **Type** | Public-key encryption | Key exchange |
| **Hard problem** | Prime factorization | Discrete logarithm |
| **Typical use** | Certificates, signing | Generating session keys |

Diffie-Hellman appears in HTTPS, TLS, VPNs, SSH, secure messaging, IPSec, and WireGuard. Modern protocols favour **ECDHE (Elliptic Curve Diffie-Hellman Ephemeral)** for stronger security and forward secrecy.

> **Tip:** RSA **encrypts** a key; Diffie-Hellman **creates** a key — they solve the key-distribution problem in two different ways.

---

## Task 5 — SSH Authentication and Key Pairs

SSH (Secure Shell) securely accesses remote computers over an untrusted network. Without SSH, logins, passwords, commands, and files would travel in plaintext for anyone to intercept. SSH encrypts everything.

SSH authentication happens in two directions.

### Authenticate the Server

Before you enter anything, your client checks the server is genuine. On first connect SSH shows the server's public key fingerprint for you to verify.

```text
The authenticity of host can't be established.
Are you sure you want to continue? yes
```

Once accepted, the fingerprint is stored in `~/.ssh/known_hosts` and compared automatically on future connections. If it changes unexpectedly, SSH warns you — the cause may be a legitimate server reinstall, new keys, or a **man-in-the-middle attack**. Never ignore that warning blindly.

### Authenticate the Client

After the server is verified, the server verifies you. Methods include password authentication and **public key authentication**, the more secure and recommended option. SSH uses asymmetric cryptography here: the private key stays on your computer, the public key goes on the remote server.

### Generating Keys

```bash
ssh-keygen -t ed25519
ssh-keygen -t rsa
```

This creates a key pair, for example:

```text
id_ed25519       Private key (keep secret)
id_ed25519.pub   Public key (upload to server)
```

| Algorithm | Notes |
|-----------|-------|
| **RSA** | Traditional, widely supported. |
| **DSA** | Obsolete, no longer recommended. |
| **ECDSA** | Elliptic Curve Digital Signature Algorithm. |
| **Ed25519** | Modern, fast, secure — recommended. |
| **ECDSA-SK / Ed25519-SK** | Hardware security-key backed variants. |

The public key is safe to share and looks like `ssh-ed25519 AAAAC3Nza... username@host`. The private key is wrapped in `-----BEGIN OPENSSH PRIVATE KEY-----` and must never be shared — anyone holding it can log in as you.

### The `~/.ssh` Directory and `authorized_keys`

```text
~/.ssh/
├── id_rsa
├── id_rsa.pub
├── id_ed25519
├── id_ed25519.pub
├── known_hosts
└── config
```

The server keeps trusted public keys in `~/.ssh/authorized_keys`. If your public key is listed there, the server lets you authenticate.

```text
Laptop (Private Key) ──► Signs challenge ──► Server (authorized_keys)
                                                  │
                                       Public key matches? ──► Access granted
```

### Connecting and Protecting Keys

```bash
ssh username@hostname
ssh -i id_ed25519 root@192.168.1.20
chmod 600 id_ed25519
```

Protect the private key with a passphrase so even a stolen file is useless without it, and lock down permissions — SSH refuses to use overly permissive private keys.

> **Security relevance:** In authorised CTF labs or systems you own, adding your own public key to `authorized_keys` after gaining a foothold provides stable, persistent SSH access. Only ever do this where you have permission.

> **Note:** SSH is both symmetric and asymmetric — it uses asymmetric cryptography for authentication and key exchange, then switches to fast symmetric encryption for the session itself.

---

## Task 6 — Digital Signatures

Encryption protects confidentiality. **Digital signatures** protect integrity, authentication, and non-repudiation. When you download `ubuntu.iso`, a signature proves it was not modified and really came from Ubuntu.

Signatures use the key pair in the **opposite** direction to encryption: the **private key signs**, and the **public key verifies**.

| Action | Key used |
|--------|----------|
| **Sign** | Private key |
| **Verify** | Public key |

### The Signing Process

Rather than signing an entire file, the signer signs its **hash** — far faster, since a 20 GB file reduces to a small fixed-size digest before signing.

| **1** | **Hash the message**<br>`"Hello Bob"` → `SHA-256` → `A92D18...` |
| --- | --- |

| **2** | **Sign the hash**<br>`Hash` → Alice's Private Key → `Digital Signature` |
| --- | --- |

| **3** | **Send**<br>`Message` + `Signature` are sent together. |
| --- | --- |

| **4** | **Bob verifies**<br>`Message` → `SHA-256` → `Hash`<br>`Signature` → Alice's Public Key → `expected Hash`<br>Hashes match? → **YES** → Authentic |
| --- | --- |

### Tamper Detection

If an attacker changes `Pay ₹100` into `Pay ₹100000`, the recomputed hash no longer matches the signed hash (`Pay ₹100 ──► H1` vs `Pay ₹100000 ──► H2`), so verification fails and the receiver immediately knows the data was altered.

> **Security relevance:** A signature made with a private key and checked with the matching public key gives integrity, authentication, and non-repudiation at once. Signing the hash instead of the whole file keeps the operation fast even for huge downloads.

---

## Task 7 — Certificates, CA, PKI, and HTTPS Trust

Digital signatures prove data came from a specific key — but how do you know a public key really belongs to Google? Anyone can generate a key pair and claim to be Google. **Certificates** solve this by binding an identity to a public key.

### What a Certificate Contains

| Field | Purpose |
|-------|---------|
| **Domain name** | The identity being vouched for. |
| **Public key** | The server's public key. |
| **Issuer** | The CA that signed it. |
| **Expiration date** | When the certificate stops being valid. |
| **Signature** | The CA's signature over the certificate. |
| **Serial number** | Unique identifier for the certificate. |

### Certificate Authority (CA)

A **Certificate Authority** is a trusted organisation that verifies an identity before issuing and signing a certificate. Common CAs include Let's Encrypt, DigiCert, Sectigo, and GlobalSign.

### Public Key Infrastructure (PKI)

**PKI** is the complete framework that manages certificates, public and private keys, certificate authorities, and revocation.

```text
Certificate Authority ──► Issues Certificate ──► Website ──► Browser trusts website
```

### HTTPS Trust Process

Opening `https://tryhackme.com`, the browser checks the certificate before starting the encrypted session.

```text
Website ──► Certificate ──► Verify CA ──► Verify Signature ──► Public Key ──► TLS starts
```

If verification fails, the browser shows `Your Connection Is Not Private` or `Certificate Not Trusted`.

### Self-Signed Certificates

Anyone can create a certificate (for example with `openssl req`), but a certificate the server signs itself has no trusted CA behind it, so browsers show a warning.

```text
Certificate ──► Self-signed ──► Browser warning
```

Self-signed certificates are useful for labs, internal servers, and testing, but should never prove authenticity in production.

> **Security relevance:** Certificates and CAs extend trust to strangers on the Internet. Without a valid, CA-signed certificate a client cannot be sure the server is genuine, leaving it open to impersonation.

---

## Task 8 — PGP, GPG, and the Web of Trust

**PGP (Pretty Good Privacy)** was created by Phil Zimmermann in **1991** to secure email. It is one of the earliest examples of hybrid cryptography, combining symmetric encryption, asymmetric encryption, hashing, and digital signatures.

### Why PGP Uses Hybrid Encryption

Encrypting a large email with RSA alone would be slow, so PGP encrypts the message with a fast symmetric key and protects that key with RSA, delivering both speed and security.

```text
Random AES key ──► encrypts email    AES key ──► encrypted with RSA
                          └──────────► send encrypted email + encrypted key
```

### GPG (GNU Privacy Guard)

**GPG** is the free, open-source implementation of the OpenPGP standard.

```bash
gpg --full-generate-key    # generate a key pair
gpg --list-keys            # list keys
gpg -e file.txt            # encrypt a file
gpg -d file.txt.gpg        # decrypt a file
gpg --export               # export public key
```

### Web of Trust

Unlike HTTPS, PGP does not rely only on Certificate Authorities. Users sign each other's public keys, building a decentralised trust network.

```text
Alice trusts Bob ──► Bob trusts Charlie ──► Alice may trust Charlie's key
```

This decentralised model is the **web of trust**.

| Concept | Trust model |
|---------|-------------|
| **HTTPS / TLS** | Centralised — trust flows from Certificate Authorities. |
| **PGP / GPG** | Decentralised — users sign and vouch for each other's keys. |

> **Note:** PGP is the original software; GPG is the free, open-source OpenPGP implementation. Functionally they interoperate through the same OpenPGP standard.

---

## Task 9 — Common Cryptographic Attacks and Best Practices

Even strong algorithms fail if keys are weak or trust is misplaced. These are the attacks the concepts above defend against.

| Attack | How it works | Defence |
|--------|--------------|---------|
| **Brute force** | Tries every possible key until one works. | Large, strong keys make it impractical. |
| **Dictionary** | Tries common passwords (`password`, `123456`, `admin`). | Strong, random passphrases. |
| **Man-in-the-middle (MITM)** | Attacker secretly relays and alters traffic between two parties (`Alice ──► Attacker ──► Bob`). | TLS and digital certificates. |

### Best Practices

- Use modern algorithms like AES and Ed25519.
- Protect private keys with strong passphrases.
- Never share private keys.
- Verify SSH host fingerprints.
- Check HTTPS certificates.
- Keep software updated.
- Use multi-factor authentication where possible.

Public key cryptography powers HTTPS/TLS, SSH, VPNs, Git commit signing, email encryption (PGP/GPG), code signing, software updates, digital certificates, and secure messaging apps. Without it, the modern Internet would not function securely.

> **Security relevance:** Most cryptographic failures are not broken maths — they are weak passwords, leaked private keys, or ignored certificate and fingerprint warnings. The human handling of keys and trust matters as much as the algorithm.

---

## Quick Revision

| Concept | Recall |
|---------|--------|
| Symmetric | One shared key, fast, bulk data (AES, ChaCha20) |
| Asymmetric | Public + private pair, slower, key exchange & signing |
| Public key | Encrypts data / verifies signatures — shareable |
| Private key | Decrypts data / creates signatures — secret |
| RSA | Public-key encryption; based on prime factorization |
| Diffie-Hellman | Key exchange; based on the discrete logarithm problem |
| Hybrid encryption | Asymmetric exchanges a symmetric key; AES encrypts data |
| SSH auth | Asymmetric for login, symmetric for the session |
| SSH files | `id_ed25519(.pub)`, `known_hosts`, `authorized_keys` |
| Digital signature | Private key signs a hash, public key verifies |
| Certificate | Binds an identity to a public key |
| CA / PKI | Trusted issuer / framework managing keys and trust |
| PGP / GPG | Secure email; GPG is open-source OpenPGP |
| Web of trust | Decentralised trust — users sign each other's keys |

**Key idea:** Public key cryptography uses a public/private key pair so strangers can exchange secrets, prove identity, and detect tampering. RSA and Diffie-Hellman set up a shared key, fast AES then encrypts the data, and signatures plus certificates bind that trust to real identities.

---

## 30-Second Revision

- **Symmetric** (AES, ChaCha20) is fast for bulk data; **asymmetric** (RSA, DH, ECC) handles key exchange, signatures, and identity.
- **Public key encrypts / verifies; private key decrypts / signs.** The private key must never be shared.
- **Hybrid encryption**: asymmetric crypto exchanges a symmetric key, then AES encrypts the actual data — this is how HTTPS, SSH, and VPNs work.
- **RSA** security rests on prime factorization being hard; it protects small secrets, not large files.
- **Diffie-Hellman** lets two parties compute the same shared secret without ever sending it, protected by the discrete logarithm problem.
- **SSH** uses asymmetric auth (`ssh-keygen`, `authorized_keys`, `known_hosts`) then symmetric session encryption; Ed25519 is preferred.
- **Digital signatures** sign a hash with the private key and verify with the public key — integrity, authentication, non-repudiation.
- **Certificates + CAs + PKI** bind identities to public keys and drive the HTTPS trust chain; self-signed certs are untrusted.
- **PGP/GPG** secure email via hybrid crypto; GPG is open-source OpenPGP, and the **web of trust** is decentralised.
- Common attacks — brute force, dictionary, MITM — are beaten by strong keys, passphrases, and verified certificates.

---

## Cheat Sheet

Encryption and key exchange:

| Category | Technology | Purpose |
|----------|-----------|---------|
| **Symmetric** | AES, ChaCha20 | Fast bulk data encryption |
| **Asymmetric** | RSA, ECC | Key exchange, signatures, identity |
| **Key exchange** | Diffie-Hellman | Generate a shared secret |
| **Key exchange** | ECDHE | Modern TLS key exchange (forward secrecy) |

Authentication and trust:

| Technology | Purpose |
|------------|---------|
| **SSH keys** | Remote login |
| **Digital signature** | Verify the sender |
| **Certificate** | Verify identity (binds identity to public key) |
| **CA / PKI** | Issue and manage trusted certificates |
| **PGP / GPG** | Secure email; GPG is open-source OpenPGP |

Common commands:

```bash
# SSH key generation and login
ssh-keygen -t ed25519
ssh -i id_ed25519 root@192.168.1.20
chmod 600 id_ed25519

# GPG email/file encryption
gpg --full-generate-key
gpg -e file.txt
gpg -d file.txt.gpg
```

Which hard problem secures each algorithm:

| Algorithm | Hard problem |
|-----------|--------------|
| **RSA** | Prime factorization |
| **Diffie-Hellman** | Discrete logarithm |

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is the difference between symmetric and asymmetric encryption?** | Symmetric uses one shared secret key and is fast, so it encrypts bulk data (AES, ChaCha20). Asymmetric uses a public/private key pair and is slower, so it handles key exchange, digital signatures, and identity (RSA, Diffie-Hellman, ECC). Real protocols combine both. |
| **Q2. Why is RSA considered secure, and why isn't it used for large files?** | RSA's security comes from the difficulty of factoring the product of two very large primes. It is much slower than symmetric algorithms, so it encrypts only small secrets like an AES key; AES then encrypts the bulk data. |
| **Q3. What problem does Diffie-Hellman solve?** | It lets two parties generate the same shared secret over an insecure network without ever transmitting that secret. Attackers see the public values but cannot derive the private numbers, which requires solving the discrete logarithm problem. |
| **Q4. Which key creates a digital signature and which verifies it?** | The private key creates the signature and the matching public key verifies it. This gives authenticity, integrity, and non-repudiation, since only the private-key holder could have produced the signature. |
| **Q5. Is SSH symmetric or asymmetric?** | Both. SSH uses asymmetric cryptography for authentication and key exchange, then switches to fast symmetric encryption for the session itself. |
| **Q6. What is a certificate, a CA, and PKI?** | A certificate binds an identity to a public key. A Certificate Authority (CA) is a trusted organisation that verifies identities and signs certificates. PKI (Public Key Infrastructure) is the overall framework managing certificates, keys, CAs, and revocation. |
| **Q7. What is the difference between PGP and GPG?** | PGP is the original secure-email software created in 1991. GPG is the free, open-source implementation of the OpenPGP standard. Both combine symmetric and asymmetric encryption with hashing and signatures. |
| **Q8. Why should a private key never be shared?** | Anyone holding the private key can decrypt data meant for the owner and impersonate them by creating valid signatures — so a leaked private key breaks both confidentiality and authenticity. |

## Final Takeaway

Public key cryptography exists to solve the one thing symmetric encryption cannot: sharing a secret safely over a network an attacker is watching. A public/private key pair lets anyone lock a message that only the private-key holder can open. **RSA** builds on the difficulty of factoring large primes, **Diffie-Hellman** lets two parties compute an identical shared secret without transmitting it, and both are used to establish a symmetric key so fast **AES** can protect the actual data — the hybrid model behind HTTPS, SSH, VPNs, and PGP. The same key pair, run in reverse, produces **digital signatures**: sign a hash with the private key, verify with the public key, and you gain integrity, authentication, and non-repudiation. **Certificates, CAs, and PKI** bind those keys to real identities so browsers can trust strangers, while **PGP/GPG** extend the idea to email through a decentralised web of trust. Master how the algorithms, keys, and trust models fit together — and guard private keys and heed certificate warnings — and you understand the machinery that keeps the modern Internet secure.
