| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Cryptography / Basics |
| **Difficulty** | Beginner |
| **Time** | ~45 Minutes |
| **Module** | Cryptography |

---

## Objective

This room builds the foundation of cryptography: what it is, why it exists, and the core building blocks every algorithm relies on. Cryptography protects information from unauthorized access so we can communicate securely even when attackers are watching the channel. Almost everything else in cyber security — HTTPS, SSH, VPNs, password storage — rests on these ideas.

By the end of this room you will be able to:

- Explain what cryptography is and why it is essential
- Describe the four security goals: confidentiality, integrity, authentication, and non-repudiation
- Identify where cryptography is used day to day and in industry
- Distinguish data at rest from data in transit
- Define plaintext, ciphertext, cipher, and key
- Walk through the encryption and decryption cycle
- Explain how the Caesar cipher works and why it is insecure
- Compare symmetric and asymmetric encryption and name common algorithms
- Apply the two core mathematical operations: XOR and modulo

---

## Task 1 — What Is Cryptography?

**Cryptography** is the practice and study of techniques for secure communication and data protection in the presence of adversaries. In simple terms, it converts readable data into unreadable data so that only authorized users can access it. Its primary goal is to ensure that attackers cannot read or modify transmitted information. Without cryptography, everything we send over the Internet would be visible to anyone intercepting the traffic. The value is clearest when you imagine sending a password across the network: without protection it travels in the open, but with encryption it becomes meaningless to anyone who intercepts it.

```text
Without cryptography       With cryptography
--------------------       -----------------
Your Password              Password
     |                         |
     v                         v
  Internet                 Encryption
     |                         |
     v                         v
Attacker Reads It     Unreadable Ciphertext
     |                         |
     v                         v
Account Compromised        Internet
                               |
                               v
                       Attacker Sees Garbage
                               |
                               v
                       Receiver Decrypts -> Password
```

Only someone possessing the correct key can recover the original message.

> **Security relevance:** Cryptography does not stop attackers from seeing the traffic — it makes what they see useless without the key. That distinction underpins every protocol that follows.

---

## Task 2 — Goals of Cryptography (CIA + Authentication)

Modern cryptography provides four security services. The first three form the classic CIA triad, and authentication is added because verifying identity is just as important as protecting the data itself.

| Goal | Guarantees | Everyday example |
|------|-----------|------------------|
| **Confidentiality** | Only authorized people can read the data | WhatsApp messages readable only by sender and receiver |
| **Integrity** | Data has not been modified in transit | Hash verification of a downloaded file |
| **Authentication** | Confirms the identity of the other party | Browser checking a website certificate |
| **Non-Repudiation** | The sender cannot deny sending a message | Digital signatures on a document |

Integrity is usually confirmed by comparing a hash before and after transfer:

```text
Original File
      |
      v
  Download
      |
      v
Hash Verification
      |
      v
  Same Hash
      |
      v
File Untampered
```

> **Note:** Non-repudiation is an advanced goal usually achieved with digital signatures. It builds on authentication but adds proof that a specific sender — and only that sender — could have produced the message.

---

## Task 3 — Where Cryptography Is Used

Most people use cryptography every day without realizing it. Whenever data must stay private or trustworthy across an untrusted network, cryptography is doing the work behind the scenes.

| Scenario | What cryptography protects |
|----------|----------------------------|
| **Logging into websites** | Credentials sent over HTTPS instead of plain text |
| **SSH remote login** | An encrypted tunnel to a remote server |
| **Online banking** | TLS certificate verification and an encrypted connection |
| **File downloads** | A published hash confirms the file was not tampered with |

An SSH session wraps everything between the two endpoints so a network observer sees only ciphertext:

```text
Laptop
   |
=============== Encrypted Tunnel ===============
   |
Linux Server
```

A file download is verified by recomputing its hash (for example SHA256) and comparing it to the official value — a match means the file was not tampered with.

Cryptography is essential across Internet banking, UPI payments, email, VPNs, Wi-Fi security, password managers, cloud storage, mobile apps, cryptocurrency, and digital signatures. Without it, secure online communication would not exist.

---

## Task 4 — Cryptography in Industry

Organizations are often legally required to protect sensitive information using cryptographic standards. Two domains illustrate the point clearly.

| Domain | Requirement |
|--------|-------------|
| **Payment cards (PCI DSS)** | Encrypt stored cardholder data, encrypt data in transmission, and follow strict security controls |
| **Healthcare** | Regulations such as HIPAA, HITECH, GDPR, and DPA require encryption of medical records at rest and in transit |

Under PCI DSS, cardholder data is encrypted before it ever reaches storage, so the database never holds raw card numbers.

> **Note:** Encryption alone is not enough. Real security layers it with access control, secure authentication, backups, security policies, monitoring, and compliance standards.

---

## Task 5 — Data at Rest vs Data in Transit

Cryptography protects information in two distinct states. Knowing which state you are protecting decides which tools you reach for.

| State | Meaning | Examples | Typical protection |
|-------|---------|----------|--------------------|
| **Data at Rest** | Data stored on a device | Hard disk, SSD, database, USB drive | AES full-disk or database encryption |
| **Data in Transit** | Data moving across a network | HTTPS, SSH, VPN, email | TLS / encrypted tunnels |

Data at rest is encrypted (for example with AES) before being written to storage, while data in transit is encrypted before it leaves the sender and decrypted only at the receiver.

> **Security relevance:** A system can encrypt data in transit yet still leak it at rest, or vice versa. Both states must be covered — protecting only one leaves an open door.

---

## Task 6 — Core Terminology

Before learning algorithms, it helps to pin down the vocabulary. Every modern algorithm — AES, RSA, ChaCha20 — follows the same basic workflow built from these terms.

| Term | Meaning |
|------|---------|
| **Plaintext** | The original, readable information before encryption |
| **Ciphertext** | The encrypted, unreadable output |
| **Cipher** | The mathematical algorithm that converts between the two |
| **Key** | The secret value that drives encryption and decryption |
| **Encryption** | Converting plaintext into ciphertext |
| **Decryption** | Converting ciphertext back into plaintext |

Plaintext is anything a human can read directly — text messages, passwords, credit card numbers, images, PDFs, medical records, or videos. For example, `Password123` is plaintext because anyone can read it, and after encryption it might become `A8!k#91@LmZ%`, which should reveal nothing about the original. The cipher is the recipe (Caesar, AES, DES, 3DES, RSA, ChaCha20), while the key is the secret ingredient — the algorithm is usually public, only the key must stay secret.

> **Security relevance:** Modern cryptography assumes the algorithm is public knowledge. Security depends entirely on keeping the key secret — never on hiding the cipher.

---

## Task 7 — The Encryption and Decryption Cycle

A message flows from readable plaintext, through encryption with a cipher and key, across the network as ciphertext, and back to plaintext at the receiver. The same cipher is used in both directions — only the direction changes.

```text
                Sender
                   |
                   v
            Plaintext Message
                   |
                   v
        +----------------------+
        |      Encryption      |
        |  Cipher + Secret Key |
        +----------------------+
                   |
                   v
             Ciphertext
                   |
           Internet / Network
                   |
                   v
        +----------------------+
        |      Decryption      |
        |  Cipher + Secret Key |
        +----------------------+
                   |
                   v
             Plaintext
                Receiver
```

The relationship is symmetric in structure: encryption combines plaintext with cipher and key to produce ciphertext, and decryption reverses it with the same cipher and key.

Sending an ATM PIN shows the payoff: without encryption `1234` travels in the open, but with encryption it becomes `X@#91L8` on the wire and is decrypted back to `1234` only by the receiver.

> **Tip:** When reasoning about any protocol, trace the message through this cycle and ask where the key lives at each step. That single habit explains most design decisions in cryptography.

---

## Task 8 — Historical Ciphers and the Caesar Cipher

Long before computers, people protected secrets with manual encryption methods called historical ciphers — famous examples include the Caesar cipher, the Vigenère cipher, the Enigma machine, and the one-time pad. The best-known beginner cipher is the Caesar cipher, introduced by Julius Caesar around the 1st century BCE.

### How the Caesar Cipher Works

It shifts every letter by a fixed number defined by the key. With a key of 3, the whole alphabet slides forward by three positions:

```text
Original
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z

Shift 3
D E F G H I J K L M N O P Q R S T U V W X Y Z A B C
```

Encrypting `TRYHACKME` with key 3 shifts each letter forward:

```text
T -> W    R -> U    Y -> B    H -> K    A -> D
C -> F    K -> N    M -> P    E -> H

Result: WUBKDFNPH
```

Decryption simply shifts in the opposite direction — `KHOOR` shifted left by 3 returns `HELLO`. When a shift passes `Z` it wraps around to `A` again (so `X -> A`, `Y -> B`, `Z -> C` when encrypting, and the reverse when decrypting).

### Why the Caesar Cipher Is Insecure

The English alphabet has only 26 letters, so a Caesar cipher has only 25 usable keys. An attacker can simply try them all — a **brute-force attack** — until readable text appears. For example, the ciphertext `XRPCTCRGNEI` yields `ICANENCRYPT` once the right key is found.

| Historical cipher | Note |
|-------------------|------|
| **Caesar Cipher** | Fixed-shift substitution; only 25 keys |
| **Vigenère Cipher** | 16th century; uses multiple shifting values instead of one |
| **Enigma Machine** | Used by Germany in WWII; far more complex than Caesar |
| **One-Time Pad** | Truly random key, message length, used once — gives perfect secrecy |

> **Security relevance:** A tiny key space is fatal. With only 25 possibilities, the Caesar cipher offers no real protection — the entire strength of a modern cipher comes from a key space too large to brute-force.

---

## Task 9 — Symmetric Encryption

Symmetric encryption uses **the same secret key** for both encryption and decryption. It is also called secret-key or private-key cryptography.

```text
                Shared Secret Key
                       |
Alice                  |                  Bob
  |                    |                   ^
  v                    v                   |
Plaintext                              Plaintext
  |                                        ^
  v                                        |
Encryption --> Ciphertext --network--> Decryption
     (same key on both ends)
```

### The Key Distribution Problem

The biggest challenge is sharing the secret key safely. Alice can easily send an encrypted file, but if she emails the key alongside it, an attacker who compromises the mailbox gets everything. The safer approach separates the channels — send the encrypted ZIP by email, but share the password by phone call or in person.

| Aspect | Detail |
|--------|--------|
| **Advantages** | Very fast, low CPU usage, efficient for large files, good for real-time communication |
| **Disadvantages** | Secure key sharing is hard, every pair needs a shared secret, poor scalability |

### Common Symmetric Algorithms

| Algorithm | Adopted | Key size | Status |
|-----------|---------|----------|--------|
| **DES** | 1977 | 56 bits | Insecure — broken in 1999 in under 24 hours |
| **3DES** | — | 168 bits (~112-bit effective) | Deprecated in 2019; lingers in legacy systems |
| **AES** | 2001 | 128 / 192 / 256 bits | Industry standard, used almost everywhere |

AES protects Wi-Fi (WPA2/WPA3), HTTPS, VPNs, BitLocker, file encryption, and cloud storage.

> **Security relevance:** Symmetric encryption is fast and ideal for bulk data, but it only works once both sides already share the secret key. Solving that key-exchange problem is exactly what asymmetric encryption is for.

---

## Task 10 — Asymmetric Encryption

Asymmetric encryption uses **two different keys** — a public key and a private key — so it is also called public-key cryptography. The public key can be shared with anyone and is used to encrypt; the private key stays secret and is used to decrypt.

```text
                     Bob publishes his keys
              Public Key (shareable) / Private Key (secret)

Alice                                            Bob
  |                                               ^
  v                                               |
Plaintext                                     Plaintext
  |                                               ^
  v                                               |
Encryption with                             Decryption with
Bob's PUBLIC KEY --> Ciphertext --net--> Bob's PRIVATE KEY
```

Because Bob simply publishes his public key, Alice can send a secret message with no password exchange at all — only Bob's private key can undo the encryption.

| Key | Who holds it | Purpose |
|-----|--------------|---------|
| **Public Key** | Everyone | Encrypts data (or verifies signatures) |
| **Private Key** | Only the owner | Decrypts data (or creates signatures) |

### Common Asymmetric Algorithms

| Algorithm | Purpose / basis |
|-----------|-----------------|
| **RSA** | One of the oldest public-key algorithms; recommended minimum 2048-bit keys |
| **Diffie-Hellman** | Secure key exchange; lets two strangers agree on a shared secret over an insecure network |
| **ECC** | Elliptic Curve Cryptography — same security as RSA with much smaller keys (a 256-bit ECC key ≈ a 3072-bit RSA key), so it is faster, lighter on memory, and better suited to mobile devices |

### Why Asymmetric Encryption Is Slower

Asymmetric algorithms depend on hard mathematical problems — large integer factorization (RSA), the discrete logarithm problem (Diffie-Hellman), and elliptic-curve mathematics (ECC) — which are far more expensive than symmetric operations. That is why HTTPS uses asymmetric cryptography only to exchange a key, then switches to fast AES for the actual data.

> **Note:** Alice and Bob are the traditional fictional characters used across cryptography to represent the sender and receiver in a protocol.

---

## Task 11 — Symmetric vs Asymmetric

The central split in encryption is whether both parties share one secret key or each holds a public/private pair. Real protocols combine both.

| Feature | Symmetric | Asymmetric |
|---------|-----------|------------|
| **Keys used** | One shared key | Two (public + private) |
| **Encryption key** | Same as decryption | Public key |
| **Decryption key** | Same key | Private key |
| **Speed** | Very fast | Slower |
| **Key sharing** | Difficult | Easy |
| **Best for** | Large data | Key exchange, certificates |
| **Examples** | AES, DES, 3DES | RSA, ECC, Diffie-Hellman |

The practical rule of thumb: use AES to encrypt large files, use RSA or ECC to exchange keys securely, and use both together for modern HTTPS. In HTTPS the browser uses RSA or ECC to establish a secure session key, then AES encrypts all the traffic — combining safe key exchange with high-speed encryption. Wi-Fi relies on AES for traffic, and messengers like Signal and WhatsApp use asymmetric cryptography for key exchange and symmetric cryptography for the messages themselves.

> **Security relevance:** AES and RSA solve different problems and are never interchangeable. AES encrypts bulk data efficiently; RSA and ECC securely exchange keys and protect small amounts of data. The hybrid model uses each where it is strongest.

---

## Task 12 — Basic Math: XOR

Modern cryptography is built on mathematics — even AES, RSA, ECC, ChaCha20, and SHA-256 rely on simple operations underneath. The first is **XOR** (Exclusive OR), written `⊕` or `^`, a logical operation on binary bits: the result is 1 when the bits differ and 0 when they are the same.

| A | B | A ⊕ B |
|---|---|-------|
| **0** | 0 | 0 |
| **0** | 1 | 1 |
| **1** | 0 | 1 |
| **1** | 1 | 0 |

Working bit by bit, `1010 ⊕ 1100` gives `0110`:

```text
1 ⊕ 1 = 0
0 ⊕ 1 = 1
1 ⊕ 0 = 1
0 ⊕ 0 = 0
--------
Result: 0110
```

### Properties That Make XOR Useful

| Property | Rule | Meaning |
|----------|------|---------|
| **Self-inverse** | `A ⊕ A = 0` | A value XORed with itself cancels to zero |
| **Identity** | `A ⊕ 0 = A` | XOR with zero leaves the value unchanged |
| **Commutative** | `A ⊕ B = B ⊕ A` | Order does not matter |
| **Associative** | `(A ⊕ B) ⊕ C = A ⊕ (B ⊕ C)` | Grouping does not matter |

### XOR in Encryption

If `P` is plaintext and `K` is the secret key, encryption is `C = P ⊕ K`. Decryption XORs the ciphertext with the same key again, and because `K ⊕ K = 0`, the original plaintext returns:

```text
Plaintext
   |
   v
XOR Secret Key
   |
   v
Ciphertext ----send---->  Ciphertext
                              |
                              v
                        XOR Same Key
                              |
                              v
                          Plaintext
```

XOR appears in AES, stream ciphers, error detection, RAID storage, network protocols, and checksums — real encryption is far more complex, but XOR remains a core building block.

> **Tip:** Do not confuse XOR with OR. Plain OR returns 1 whenever either bit is 1; XOR returns 1 only when the two bits are different.

---

## Task 13 — Basic Math: Modulo

The **modulo** operator, written `%` or `mod`, returns the remainder after division. It always yields a value between `0` and `n-1`, so the answer is never larger than the divisor.

| Expression | Result | Why |
|------------|--------|-----|
| **25 % 5** | 0 | 25 ÷ 5 = 5 remainder 0 |
| **23 % 6** | 5 | 23 = 6 × 3 + 5 |
| **23 % 7** | 2 | 23 = 7 × 3 + 2 |
| **17 % 5** | 2 | 17 = 5 × 3 + 2 |

Modulo is **not reversible**: knowing `x % 5 = 4` tells you `x` could be 4, 9, 14, 19, 24, and so on. Many numbers produce the same remainder, and that one-way behavior is exactly what makes it valuable in cryptography. A clock is the everyday analogy — move 5 hours forward from 10 o'clock and you land on 3, which is simply `15 % 12 = 3`, wrapping around like a clock face.

Modulo underpins RSA, Diffie-Hellman, ECC, digital signatures, and key exchange; without it, public-key cryptography would not exist. These algorithms work with numbers hundreds or thousands of bits long — RSA commonly uses 2048-bit numbers — far beyond a normal calculator, which is why languages like Python that handle arbitrarily large integers are so useful here.

### XOR vs Modulo

| Feature | XOR | Modulo |
|---------|-----|--------|
| **Works on** | Binary bits | Integers |
| **Symbol** | ⊕ or ^ | % |
| **Main use** | Encryption | Mathematical operations |
| **Reversible** | Yes, with the same key | No |
| **Used in** | AES, stream ciphers | RSA, ECC, Diffie-Hellman |

> **Security relevance:** The irreversibility of modulo is a feature, not a limitation. Public-key algorithms lean on operations that are easy to compute one way but extremely hard to undo, and modular arithmetic provides exactly that asymmetry.

The whole module comes together in one workflow — plaintext is encrypted with either a symmetric or public key, travels as ciphertext, and is decrypted with the matching key:

```text
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

---

## Quick Revision

| Topic | Key fact |
|-------|----------|
| **Cryptography** | Converts readable data into unreadable data for authorized users only |
| **CIA + Auth** | Confidentiality, Integrity, Authentication, Non-Repudiation |
| **Data states** | Protect data at rest and in transit |
| **Cipher vs key** | Cipher is public; the key stays secret |
| **Caesar cipher** | Fixed letter shift; only 25 keys, easily brute-forced |
| **Symmetric** | One shared key; fast (AES, DES, 3DES) |
| **Asymmetric** | Public + private keys; solves key exchange (RSA, ECC, DH) |
| **XOR** | Returns 1 only when bits differ; reversible with the same key |
| **Modulo** | Returns the remainder; one-way, not reversible |

**Key idea:** Cryptography turns readable data into ciphertext that only a key can undo — symmetric encryption moves bulk data fast, asymmetric encryption safely exchanges the keys, and XOR and modulo are the mathematical bricks beneath it all.

---

## 30-Second Revision

- Cryptography protects information from attackers by making intercepted data useless without the key.
- The four goals are confidentiality, integrity, authentication, and non-repudiation.
- It secures HTTPS, SSH, VPNs, banking, email, Wi-Fi, and cloud services; PCI DSS and HIPAA mandate it.
- Protect data both at rest (stored) and in transit (moving across a network).
- Plaintext is readable, ciphertext is encrypted, the cipher is the algorithm, the key is the secret.
- The algorithm is public; only the key must stay secret.
- Caesar cipher shifts letters by a fixed key and has only 25 keys, so brute force breaks it instantly.
- Symmetric uses one shared key (AES, DES, 3DES); asymmetric uses a public/private pair (RSA, ECC, Diffie-Hellman).
- HTTPS combines RSA/ECC for key exchange with AES for fast bulk encryption.
- XOR returns 1 only for differing bits and is reversible with the same key; modulo returns the remainder and is one-way.

---

## Cheat Sheet

### Core Terms

| Term | Meaning |
|------|---------|
| **Plaintext** | Original readable data |
| **Ciphertext** | Encrypted, unreadable data |
| **Cipher** | Encryption/decryption algorithm |
| **Key** | Secret value used by the cipher |
| **Encryption** | Plaintext → Ciphertext |
| **Decryption** | Ciphertext → Plaintext |

### Symmetric Algorithms

| Algorithm | Status |
|-----------|--------|
| **DES** | Insecure |
| **3DES** | Deprecated |
| **AES** | Industry standard |

### Asymmetric Algorithms

| Algorithm | Purpose |
|-----------|---------|
| **RSA** | Public-key encryption |
| **Diffie-Hellman** | Secure key exchange |
| **ECC** | Efficient public-key cryptography |

### Mathematical Operations

| Operation | Description |
|-----------|-------------|
| **XOR** | Compares binary bits; 1 when different |
| **Modulo** | Returns the remainder after division |

---

## Interview Questions

**Q1. What is cryptography?**
The practice of securing communication and protecting data using encryption techniques so only authorized users can read it.

**Q2. What are the four goals of cryptography?**
Confidentiality, integrity, authentication, and non-repudiation.

**Q3. What is the difference between data at rest and data in transit?**
Data at rest is stored data such as databases and SSDs; data in transit is data moving across a network such as HTTPS or SSH traffic.

**Q4. What is the difference between a cipher and a key?**
The cipher is the algorithm that transforms data and is usually public; the key is the secret value that drives it and must stay private.

**Q5. How does the Caesar cipher work and why is it insecure?**
It shifts each letter by a fixed number of positions, but with only 25 possible keys an attacker can brute-force all of them almost instantly.

**Q6. What is the difference between symmetric and asymmetric encryption?**
Symmetric uses one shared secret key, while asymmetric uses a public key to encrypt and a private key to decrypt.

**Q7. What is the biggest challenge of symmetric encryption?**
Securely sharing the secret key between the two parties.

**Q8. Which methods does HTTPS combine and why?**
RSA or ECC for secure key exchange and AES for fast data encryption, pairing safe key delivery with high-speed bulk encryption.

**Q9. Why is XOR useful in cryptography?**
Applying the same key twice with XOR restores the original plaintext, because a value XORed with itself is zero.

**Q10. What does modulo return and is it reversible?**
It returns the remainder after division and is not reversible, since many different numbers produce the same remainder.

---

## Final Takeaway

Cryptography is the foundation of secure communication: it converts readable **plaintext** into **ciphertext** that only the right key can undo, delivering **confidentiality**, **integrity**, **authentication**, and **non-repudiation** across untrusted networks. It protects data both at rest and in transit, and everyday tools from HTTPS and SSH to VPNs, Wi-Fi, and messaging apps depend on it. Historical ciphers like Caesar show why a small key space fails, which is why modern systems pair fast **symmetric encryption** (**AES**) for bulk data with **asymmetric encryption** (**RSA**, **ECC**, **Diffie-Hellman**) to exchange keys safely — never treating the two as interchangeable. Underneath it all sit two simple operations: **XOR**, reversible with the same key, and **modulo**, deliberately one-way. Master these fundamentals and every later topic in public-key cryptography, hashing, and password cracking has solid ground to stand on.
