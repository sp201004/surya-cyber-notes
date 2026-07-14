## WHAT IS CRYPTOGRAPHY?

Cryptography is the science of protecting information by converting readable data into an unreadable format so that only authorized people can read it.

**Main Goal:**
- Protect Confidentiality
- Protect Integrity
- Enable Secure Communication

| Without Cryptography | With Cryptography |
|---|---|
| Anyone can read your data | Data becomes unreadable |
| Anyone can modify it | Only authorized users can decrypt it |
| Anyone can steal passwords | Data remains private and secure |
| Anyone can impersonate websites | - |

### Real Life Examples
- HTTPS websites
- Online Banking
- WhatsApp Messages
- VPN
- SSH
- WiFi Password
- Password Managers
- Digital Certificates
- Cloud Storage

### CIA Triad Relation

| Pillar | Protection |
|---|---|
| **Confidentiality** | Prevent unauthorized access. |
| **Integrity** | Prevent unauthorized modification. |
| **Availability** | Ensure data is accessible. |

> [!NOTE]
> Cryptography mainly protects **Confidentiality** and **Integrity**.

## BASIC TERMINOLOGIES

| Term | Definition | Example |
|---|---|---|
| **1. Plaintext** | Readable message. | `HELLO` or `Patient Name: Alice Smith` |
| **2. Ciphertext** | Encrypted unreadable message. Without a key, it is meaningless. | `KHOOR` or `x7$Q@9!a#` |
| **3. Encryption** | Converting plaintext into ciphertext. | Plaintext → Encryption → Ciphertext |
| **4. Decryption** | Converting ciphertext back into plaintext. | Ciphertext → Decryption → Plaintext |
| **5. Key** | Secret value used during encryption and decryption. Think of it like a password for the algorithm. | `Shift = 3` |
| **6. Algorithm** | Public mathematical procedure used to encrypt/decrypt data. | AES, RSA, Caesar Cipher |

> [!IMPORTANT]
> The Algorithm can be public, but the Key must remain secret. Security comes from keeping the KEY secret, NOT keeping the algorithm secret.

## HOW ENCRYPTION WORKS

**Encryption:**
```text
Plaintext + Algorithm + Secret Key
        ↓
   Ciphertext
```

**Decryption:**
```text
Ciphertext + Algorithm + Same Key
        ↓
    Plaintext
```

## LOCKBOX ANALOGY

Imagine sending a secret letter using **Symmetric Encryption**:

```text
Alice
  ↓
Writes letter
  ↓
Puts inside lockbox
  ↓
Locks box using key
  ↓
Sends locked box
  ↓
Bob receives box
  ↓
Uses same key
  ↓
Reads message
```

> [!TIP]
> Anyone intercepting the box can see it, but cannot open it.

## PLAINTEXT VS CIPHERTEXT

| Plaintext | Ciphertext |
|---|---|
| `HELLO` | `KHOOR` |

- **Without key**: `KHOOR` has no meaning.
- **With key**: It is decrypted back to `HELLO`.

## CAESAR CIPHER

One of the oldest encryption techniques, created by Julius Caesar.
- **Idea**: Shift every letter by fixed positions.
- **Example**: Key = 3 (A → D, B → E, C → F)

```text
Message: ATTACK
Shift:   +3
Result:  DWWDFN
```

## SYMMETRIC VS ASYMMETRIC ENCRYPTION

### 1. Symmetric Encryption
- **Key**: Uses 1 single key.
- **Mechanism**: The same key is used to lock (encrypt) and unlock (decrypt).
- **Speed**: Very fast.
- **Use Case**: Encrypting large amounts of data (e.g., Hard drives, Databases).
- **Examples**: AES, DES, RC4.
- **Problem**: How do you safely share the secret key with the other person without an attacker stealing it? (This is called the Key Distribution Problem).

### 2. Asymmetric Encryption
- **Key**: Uses 2 keys (a Key Pair).
  1. **Public Key**: Shared with everyone. Used only to encrypt.
  2. **Private Key**: Kept secretly by you. Used only to decrypt.
- **Mechanism**: Data encrypted with the Public Key can ONLY be decrypted by the Private Key.
- **Speed**: Very slow.
- **Use Case**: Securely exchanging keys, Digital Signatures, HTTPS.
- **Examples**: RSA, ECC.

### How Asymmetric Solves the Key Problem:
```text
Bob creates Public Key & Private Key
        ↓
Bob shares Public Key with Alice
        ↓
Alice encrypts secret message using Bob's Public Key
        ↓
Alice sends encrypted message to Bob
        ↓
Bob decrypts it using his Private Key
```

> [!NOTE]
> Even if an attacker intercepts the encrypted message, they cannot read it because they do not have Bob's Private Key.

## HASHING

Hashing is **NOT** encryption. It is a one-way mathematical function.

| Concept | Explanation |
|---|---|
| **Purpose** | To verify Integrity. |
| **Mechanism** | Converts any amount of data into a fixed-size string of characters. |
| **One-Way** | You cannot reverse a hash back to the original data. |
| **Unique** | Even a tiny change in the input completely changes the hash output. |

### Example (MD5 Hash)
- Input: `Hello` → Hash: `8b1a9953c4611296a827abf8c47804d7`
- Input: `hello` → Hash: `5d41402abc4b2a76b9719d911017c592`
*(Notice how a small lowercase 'h' changes the entire hash!)*

### What Hashing is used for:
- **Storing Passwords**: Websites store the hash of your password, not the actual password.
- **File Integrity**: Checking if a downloaded file was corrupted or infected with malware (Checksums).

## ENCRYPTION VS HASHING

| Feature | Encryption | Hashing |
|---|---|---|
| **Function** | Two-way (Reversible) | One-way (Irreversible) |
| **Purpose** | Protects Confidentiality | Protects Integrity |
| **Uses a Key?** | Yes | No |
| **Output Size** | Depends on input size | Fixed size (e.g., 256 bits) |

## DIGITAL SIGNATURES

Just like a real-world signature proves who signed a document, a digital signature proves who sent a digital message.

**Provides:**
- **Authentication**: Proves the sender's identity.
- **Integrity**: Proves the message was not altered.
- **Non-repudiation**: The sender cannot deny sending the message.

**How it works (Using Asymmetric Encryption backwards):**
```text
Alice hashes her message
        ↓
Alice encrypts the hash using her PRIVATE key (This is the signature)
        ↓
Alice sends message + signature to Bob
        ↓
Bob decrypts signature using Alice's PUBLIC key
        ↓
Bob verifies the hash
```
> [!TIP]
> If the hashes match, Bob knows Alice sent it and it was not changed.

## DIGITAL CERTIFICATES

How do you know a Public Key actually belongs to a specific website (like google.com) and not an attacker? You use a **Digital Certificate**.

- Think of it as a Digital ID Card.
- It binds a Public Key to a specific entity (person, company, or website).
- It is issued and signed by a trusted third party called a **Certificate Authority (CA)**.

## HTTPS (TYING IT ALL TOGETHER)

When you visit a secure website, cryptography works together:

```text
Browser connects to Website
        ↓
Website sends its Digital Certificate (Contains its Public Key)
        ↓
Browser verifies the Certificate with a CA (Authentication)
        ↓
Browser uses Asymmetric Encryption to securely send a Symmetric Key to the website
        ↓
Both now use the Symmetric Key for fast, secure communication (Confidentiality)
        ↓
Both use Hashing to ensure no one changes the traffic (Integrity)
```

## FLAG

`THM{SECRETS_OF_MATH}`
