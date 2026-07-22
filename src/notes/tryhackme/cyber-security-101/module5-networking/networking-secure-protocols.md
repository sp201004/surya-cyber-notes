| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Networking / Secure Protocols |
| **Difficulty** | Beginner |
| **Time** | ~50 Minutes |
| **Module** | Networking |

---

## Objective

Early networking protocols were designed only to move data between machines — they never protected it. Passwords, credit card numbers, emails, and login credentials all travelled as plaintext, so anyone sniffing packets could read everything. This room shows how **Transport Layer Security (TLS)**, **SSH**, and **VPNs** add encryption, authentication, and integrity on top of those legacy protocols.

By the end of this room you will be able to:

- Explain why secure protocols exist and how they map to the **CIA triad** (Confidentiality, Integrity, Authentication)
- Describe the relationship between **SSL and TLS** and why SSL is obsolete
- Understand **TLS certificates**, Certificate Authorities (CA), CSRs, self-signed certificates, and Let's Encrypt
- Explain how **HTTPS** combines HTTP with TLS, including the TCP and TLS handshakes
- Capture and decrypt HTTPS traffic in **Wireshark** using an SSL key log
- Identify the **secure email protocols** SMTPS, POP3S, and IMAPS and their ports
- Use **SSH / OpenSSH** for secure remote login, tunneling, and file transfer
- Compare **SFTP and FTPS** for secure file transfer
- Describe **VPN** types (site-to-site and remote-access) and how a VPN tunnel works
- Recall the plaintext and secure **port numbers** for every protocol covered

---

## Task 1 — Why We Need Secure Protocols

Earlier networking protocols such as HTTP, SMTP, POP3, IMAP, TELNET, and FTP were built purely for communication. They did **not** protect passwords, credit card information, emails, personal files, or login credentials. Anyone capturing packets could read the entire conversation.

```text
Client ──── HTTP ────► Server
   │
   ▼
Attacker sniffs the wire and reads:
  Username
  Password
  Cookies
  Payment details
```

The core weaknesses of these legacy protocols are the same three gaps:

| Weakness | Consequence |
|----------|-------------|
| **No Encryption** | Data travels as readable plaintext. |
| **No Authentication** | You cannot prove you are talking to the real server. |
| **No Integrity** | Data can be modified in transit without detection. |

### The CIA Triad

Secure communication requires three properties, known collectively as the **CIA triad**.

| Principle | Meaning | Provided by |
|-----------|---------|-------------|
| **Confidentiality** | Only the sender and receiver can read the data. | Encryption |
| **Integrity** | Nobody can modify the data undetected. | Integrity checks (MACs / hashes) |
| **Authentication** | You can verify you are talking to the genuine party. | Certificates / keys |

Confidentiality turns readable text into ciphertext:

```text
HELLO  ──► Encrypted ──►  A9#P!7@...
```

Integrity detects tampering. If an attacker intercepts a "Transfer ₹100" instruction and rewrites it as "Transfer ₹900", integrity mechanisms flag that the message changed. Authentication answers "is this really bank.com?" — a verified certificate proves the server is genuine, while a fake site that looks identical but has no valid certificate is caught.

### The Solution — TLS

**Transport Layer Security (TLS)** adds encryption, authentication, and integrity to existing protocols without redesigning them. Adding the letter **"S"** (for *Secure*) to a protocol name usually signals a TLS-protected version.

| Plaintext | Secure version | Secured by |
|-----------|----------------|------------|
| **HTTP** | HTTPS | TLS |
| **SMTP** | SMTPS | TLS |
| **POP3** | POP3S | TLS |
| **IMAP** | IMAPS | TLS |
| **TELNET** | SSH | SSH |
| **FTP** | FTPS | TLS |
| **FTP** | SFTP | SSH |

> **Security relevance:** Legacy protocols are not broken as transport mechanisms — they simply lack security. TLS and SSH wrap them so the same application data becomes confidential, tamper-evident, and authenticated.

---

## Task 2 — SSL vs TLS

TLS grew out of an older protocol called **SSL (Secure Sockets Layer)**. SSL came first, was found to be insecure, and was gradually replaced by TLS. Today SSL is obsolete and TLS is the standard, even though people still loosely say "SSL" when they mean TLS.

```text
1995  SSL 2.0
  │
1999  TLS 1.0
  │
      TLS 1.1
  │
      TLS 1.2
  │
2018  TLS 1.3  (current)
```

| Aspect | SSL | TLS |
|--------|-----|-----|
| **Status** | Obsolete / deprecated | Current standard |
| **Latest version** | SSL 3.0 | TLS 1.3 |
| **Security** | Known weaknesses | Modern, strong ciphers |
| **Recommendation** | Do not use | Use everywhere |

### Where TLS Sits

TLS operates between the application and the transport layer. Application traffic is handed to TLS, encrypted, and only then passed down to TCP.

```text
Application
    │
   TLS
    │
 Transport (TCP)
    │
 Network (IP)
```

Because TLS sits above TCP, it encrypts only the **application data**. TCP still handles reliability, ordering, and retransmission, and IP still handles routing — none of that changes.

### Protocols That Use TLS

| Base protocol | TLS-secured version |
|---------------|---------------------|
| **HTTP** | HTTPS |
| **SMTP** | SMTPS |
| **POP3** | POP3S |
| **IMAP** | IMAPS |
| **DNS** | DoT (DNS over TLS) |
| **MQTT** | MQTTS |
| **SIP** | SIPS |

> **Note:** The TryHackMe answer to "TLS upgraded which protocol?" is **SSL** — TLS is the successor that replaced it.

---

## Task 3 — TLS Certificates

To prove its identity, a server presents a **digital certificate** during the TLS handshake. The client checks the certificate before continuing.

```text
Client ──► Server ──► presents Certificate
   │
   ▼
Browser verifies certificate ──► Trusted? ──► Yes ──► Continue
```

### Certificate Authority (CA)

A **Certificate Authority** is a trusted organisation that signs certificates to vouch for a server's identity. Browsers and operating systems ship with a list of trusted CAs, so a certificate signed by one of them is automatically trusted. Common CAs include Let's Encrypt, DigiCert, GlobalSign, and Sectigo.

### Certificate Signing Request (CSR)

To obtain a signed certificate, an administrator generates a **CSR** and sends it to a CA. The CA verifies the request, signs the certificate, and returns it for installation on the server.

```text
Admin creates CSR
        │
        ▼
   Sent to CA
        │
        ▼
   CA verifies identity
        │
        ▼
   CA signs certificate
        │
        ▼
Server installs certificate
```

### Self-Signed Certificates

A **self-signed certificate** is created and signed by the server itself, with no CA involved. Because no trusted third party vouches for it, browsers show a warning such as "Your connection is not private."

| Certificate type | Signed by | Trusted by browsers | Typical use |
|------------------|-----------|---------------------|-------------|
| **CA-signed** | Trusted Certificate Authority | Yes | Production websites |
| **Self-signed** | The server itself | No (warning shown) | Labs, testing, internal servers |

> **Note:** The TryHackMe answer to "which certificate should never prove server authenticity?" is a **self-signed certificate** — it should not be used in production.

### Let's Encrypt

Most trusted certificates historically required payment. **Let's Encrypt** provides free, automated, CA-trusted certificates, which is why it is now extremely popular for securing websites.

> **Security relevance:** Certificates are what make authentication possible. Without a valid, CA-signed certificate a client cannot be sure the server is genuine, leaving it open to impersonation attacks.

---

## Task 4 — HTTPS (HTTP Secure)

HTTPS is simply **HTTP + TLS**. Instead of sending HTTP data straight over TCP, the HTTP data is first encrypted by TLS.

```text
Without HTTPS                 With HTTPS
Browser                       Browser
   │                             │
  HTTP                          HTTP
   │                             │
Internet                    TLS Encryption
   │                             │
Anyone can read packets         TCP
                                 │
                              Internet
                                 │
                          Encrypted packets
```

### Plain HTTP Communication

Normal HTTP communication runs through four steps, and every part is visible on the wire.

```text
Step 1  Resolve domain     google.com ──► DNS ──► IP address
Step 2  TCP 3-way handshake
Step 3  HTTP request        GET / HTTP/1.1  Host: website.com
Step 4  HTTP response       200 OK + HTML/CSS/JS/images
```

Because everything is plaintext, anyone using Wireshark can read usernames, passwords, cookies, form data, and payment information:

```text
GET /login
username=admin
password=123456
```

### HTTPS Communication

HTTPS adds a TLS handshake before the HTTP exchange. Nothing else about the flow changes.

```text
Client
   │
  DNS
   │
  TCP handshake
   │
  TLS handshake
   │
Encrypted HTTP
```

### TCP Handshake

The TCP three-way handshake still happens first and works exactly as before.

```text
Packet 1   SYN     ──►
Packet 2   SYN ACK ◄──
Packet 3   ACK     ──►
Connection established
```

### TLS Handshake

After the TCP connection is established, TLS negotiates the secure session — handling authentication, key exchange, the encryption algorithm, and the session keys.

```text
Client Hello
     │
Server Hello
     │
Certificate
     │
Key Exchange
     │
Finished
     │
Encrypted Session
```

Once the handshake finishes, all HTTP data is encrypted.

### HTTPS Packet Capture in Wireshark

With HTTPS, Wireshark can no longer read the HTTP payload. Instead of `GET`, `POST`, and cookies, it shows generic **Application Data**.

```text
TCP
  │
TLSv1.3
  │
Application Data
```

This happens because TLS encrypts the HTTP payload, and without the encryption key Wireshark cannot interpret the contents — so it simply labels them as Application Data.

### Decrypting HTTPS

If Wireshark is given the **TLS session keys**, it can decrypt the captured packets. Modern browsers can export these keys to a log file (commonly `ssl-key.log`), which Wireshark loads to reveal the plaintext.

```text
Browser ──► TLS keys ──► ssl-key.log ──► Wireshark ──► Readable HTTP
```

The Wireshark decryption workflow is:

```text
Select TLS packet
        │
Right-click ──► Protocol Preferences
        │
Transport Layer Security
        │
Browse ──► select ssl-key.log
        │
Reload capture
        │
Traffic decrypted
```

After decryption, the previously hidden Application Data becomes readable HTTP again — `GET /login`, `POST /login`, cookies, headers, forms, and responses.

### HTTP vs HTTPS

| Property | HTTP | HTTPS |
|----------|------|-------|
| **Encryption** | None | TLS |
| **Port** | 80 | 443 |
| **Data form** | Plaintext | Encrypted |
| **Sniffing** | Easy | Protected |
| **Authentication** | None | Certificate-based |
| **Integrity** | None | Protected |

> **Security relevance:** Even if HTTPS packets are captured, they appear as random ciphertext (`A81F99...`, `D3AA1...`) rather than readable credentials. TCP and IP remain unchanged — only the application-layer data is encrypted.

> **Note:** In the lab, the TLS negotiation spans **8** packets and the packet containing `GET /login` is packet **10** — both are TryHackMe answers for this room.

---

## Task 5 — Secure Email Protocols

Email originally used the plaintext protocols **SMTP**, **POP3**, and **IMAP**. Like HTTP, they send data without encryption, so anyone capturing packets could read email contents, usernames, passwords, and attachments. Adding TLS produces the secure variants.

```text
User ──► SMTP ──► Mail Server ──► POP3 / IMAP ──► Recipient
```

SMTP **sends** email; POP3 and IMAP **receive** it.

### SMTP and SMTPS

SMTP sends email but is plaintext by default. **SMTPS** is SMTP + TLS, adding encryption, authentication, and integrity.

| Property | SMTP | SMTPS |
|----------|------|-------|
| **Purpose** | Send email | Send email securely |
| **Encryption** | Plaintext | TLS |
| **Port** | 25 | 465 / 587 |
| **Credentials** | Visible | Encrypted |

> **Note:** Port **587** is the modern, recommended message submission port for authenticated sending.

### POP3 and POP3S

**POP3** downloads email from the server, usually removing it after download. It works well offline and saves server storage but synchronises poorly across devices. **POP3S** is the TLS-encrypted version.

| Property | POP3 | POP3S |
|----------|------|-------|
| **Purpose** | Download email | Download email securely |
| **Encryption** | Plaintext | TLS |
| **Port** | 110 | 995 |
| **Best for** | Single device, offline use | Single device, offline use |

### IMAP and IMAPS

**IMAP** synchronises email — messages stay on the server and multiple devices (phone, laptop, tablet) share the same mailbox, with folders and read status kept in sync. **IMAPS** is the TLS-encrypted version.

| Property | IMAP | IMAPS |
|----------|------|-------|
| **Purpose** | Synchronise email | Synchronise email securely |
| **Encryption** | Plaintext | TLS |
| **Port** | 143 | 993 |
| **Best for** | Multiple devices | Multiple devices |

### POP3 vs IMAP

| Feature | POP3 | IMAP |
|---------|------|------|
| **Model** | Downloads email | Synchronises email |
| **Server copy** | Usually removed | Kept on server |
| **Devices** | Best for one device | Best for multiple devices |
| **Offline** | Offline friendly | Multi-device friendly |
| **Sync** | Minimal | Full synchronisation |

### Email Port Summary

| Protocol | Port |
|----------|------|
| **SMTP** | 25 |
| **SMTPS** | 465 / 587 |
| **POP3** | 110 |
| **POP3S** | 995 |
| **IMAP** | 143 |
| **IMAPS** | 993 |

> **Security relevance:** As with HTTPS, adding TLS changes only the application data — TCP and IP are untouched. Without TLS, a `LOGIN user@gmail.com Password123` line is fully visible in Wireshark; with TLS it becomes encrypted Application Data.

> **Note:** The TryHackMe question asks which protocol leaks login credentials from captured traffic, and the answer is **IMAP** — only the plaintext version exposes credentials, because IMAPS encrypts them.

---

## Task 6 — SSH (Secure Shell)

Before SSH, administrators used **TELNET** for remote login, which sent usernames, passwords, and commands in plaintext — readable by anyone with Wireshark. SSH replaced TELNET entirely by encrypting the whole session.

| Property | TELNET | SSH |
|----------|--------|-----|
| **Port** | 23 | 22 |
| **Encryption** | Plaintext | Encrypted |
| **Safety** | Unsafe | Secure |
| **Status** | Legacy | Standard for remote login |

### History and OpenSSH

```text
1995  SSH-1
  │
1996  SSH-2
  │
1999  OpenSSH
  │
Present  OpenSSH
```

**OpenSSH** is the free, open-source, and most widely used SSH implementation. It runs on Linux, macOS, BSD, and cloud servers across AWS, Azure, and GCP.

> **Note:** The TryHackMe answer for "open-source SSH implementation?" is **OpenSSH**.

### SSH Features and Authentication

SSH provides authentication, encryption, integrity, secure remote login, secure file transfer, and secure tunnels. It supports three main authentication methods:

| Method | Description | Strength |
|--------|-------------|----------|
| **Password** | Username + password | Basic |
| **Public key** | Public key + private key pair | Stronger, preferred |
| **Multi-factor** | Additional factor on top of the above | Strongest |

Public-key authentication is more secure than passwords and is the preferred method.

### Connecting with SSH

```bash
ssh username@hostname
ssh root@192.168.1.10
ssh kali@192.168.124.148
```

Once authenticated, you can execute commands and manage the server securely over the encrypted channel. SSH uses port **22** by default (TELNET uses 23).

### SSH Tunneling and X11 Forwarding

SSH can wrap other traffic in an encrypted tunnel, so even an insecure application can be transported securely.

```text
Application ──► SSH Tunnel ──► Remote Server
```

X11 forwarding lets you run remote graphical Linux applications on your local display:

```bash
ssh -X user@host
```

> **Security relevance:** SSH tunneling is a common way to protect legacy or internal services, but it should only be used against systems you own or are authorised to access.

---

## Task 7 — Secure File Transfer (SFTP and FTPS)

There are two common ways to transfer files securely, and despite similar names they are built on different technologies.

### SFTP

**SFTP (SSH File Transfer Protocol)** runs over SSH and provides secure upload, download, and encryption. It uses the same port as SSH — **22**.

```bash
sftp user@hostname
```
```bash
get filename
put filename
```

### FTP and FTPS

Plain **FTP** is a plaintext file transfer protocol on port **21**, so passwords are visible. **FTPS** is FTP + TLS, adding encryption and authentication using certificates, and typically uses port **990**. Unlike SFTP, FTPS relies on TLS, not SSH.

### SFTP vs FTPS

| Property | SFTP | FTPS |
|----------|------|------|
| **Secured by** | SSH | TLS |
| **Port** | 22 | 990 |
| **Connections** | Single connection | Separate control and data connections |
| **Firewalls** | Easier to allow | More firewall issues |
| **Certificates** | Not required | Uses certificates |

### SSH vs SFTP

| Property | SSH | SFTP |
|----------|-----|------|
| **Purpose** | Remote login | File transfer |
| **Actions** | Execute commands | Upload and download |
| **Port** | 22 | 22 |
| **Built on** | OpenSSH | SSH protocol |

> **Note:** The TryHackMe answer to "does FTPS use SSH?" is **no** — FTPS uses TLS, while SFTP uses SSH. Both SFTP and SSH share port 22.

---

## Task 8 — VPN (Virtual Private Network)

A **VPN** creates a private network over the public internet. Instead of sending data openly, a VPN encrypts all traffic inside a tunnel, so companies can connect head offices, remote branches, and individual users securely.

### VPN Tunnel

```text
Original Data
     │
  Encrypted
     │
  Internet
     │
 VPN Server
     │
  Decrypted
     │
 Destination
```

Nobody can read the traffic while it travels across the internet.

### Site-to-Site VPN

A **site-to-site VPN** connects entire networks — for example a branch office to a main office — so all devices at each site communicate securely.

```text
Branch Office ──► VPN Tunnel ──► Main Office
```

### Remote-Access VPN

A **remote-access VPN** connects a single user or device into a private network, which is ideal for working from home.

```text
Laptop ──► VPN Client ──► Internet ──► VPN Server ──► Company Network
```

| VPN type | Connects | Typical use |
|----------|----------|-------------|
| **Site-to-Site** | Entire networks (office to office) | Linking branches to headquarters |
| **Remote-Access** | A single user/device to a network | Remote workers, travelling staff |

### How a VPN Changes Your IP

Without a VPN the website sees your real ISP-assigned IP. With a VPN, traffic exits through the VPN server, so the website sees the VPN server's IP instead.

```text
Without VPN   You ──► ISP ──► Website  (sees your real IP)
With VPN      You ──► VPN ──► Website  (sees VPN server IP)
```

### Benefits and Limitations

VPNs provide encryption, privacy, remote access, secure corporate networking, IP hiding, and access to geo-restricted content. They are not magic, though — some VPNs leak DNS or IP data, or fail to encrypt everything, so it is worth verifying against DNS and IP leaks.

> **Security relevance:** A VPN protects data in transit across untrusted networks such as public Wi-Fi, but it does not automatically make you anonymous — trust in the VPN provider and correct configuration still matter.

---

## Task 9 — Conclusion

This room covered three core technologies for securing network traffic: **TLS**, **SSH**, and **VPNs**. Almost every secure protocol is built around one of them.

```text
HTTP  ──► HTTPS  (TLS)
SMTP  ──► SMTPS  (TLS)
POP3  ──► POP3S  (TLS)
IMAP  ──► IMAPS  (TLS)
TELNET ──► SSH
FTP   ──┬─► FTPS (TLS)
        └─► SFTP (SSH)
```

TLS provides confidentiality, integrity, and authentication for application traffic without touching TCP or IP. SSH secures remote login (replacing TELNET) and underpins SFTP. VPNs wrap all traffic in an encrypted tunnel for secure remote and site-to-site connectivity. Together they secure web browsing, email, remote administration, file transfer, and enterprise networking.

> **Note:** The room's challenge password is `THM{B8WM6P}`.

---

## Quick Revision

| Technology | Secures | Key facts |
|------------|---------|-----------|
| **TLS** | Application traffic (HTTPS, SMTPS, POP3S, IMAPS, DoT, MQTTS, SIPS) | Replaced SSL; provides confidentiality, integrity, authentication; sits between application and TCP. |
| **Certificates** | Server identity | Signed by a CA via a CSR; self-signed certs are untrusted; Let's Encrypt issues free trusted certs. |
| **HTTPS** | Web traffic | HTTP + TLS on port 443; TCP handshake then TLS handshake; Wireshark shows Application Data until keys are loaded. |
| **Secure email** | Mail traffic | SMTPS (465/587), POP3S (995), IMAPS (993). |
| **SSH** | Remote login | Replaced TELNET; port 22; OpenSSH is standard; supports tunneling and SFTP. |
| **File transfer** | File uploads/downloads | SFTP over SSH (22); FTPS over TLS (990). |
| **VPN** | All traffic over public networks | Encrypted tunnel; site-to-site vs remote-access; hides public IP. |

**Key idea:** Secure protocols take an existing plaintext protocol and wrap it in TLS or SSH (or route it through a VPN tunnel) so the same application data gains confidentiality, integrity, and authentication — without changing TCP or IP.

---

## 30-Second Revision

- Legacy protocols (HTTP, SMTP, POP3, IMAP, TELNET, FTP) have **no encryption, authentication, or integrity**.
- The **CIA triad** — Confidentiality, Integrity, Authentication — defines secure communication.
- **TLS replaced SSL**; TLS 1.3 is current and SSL is obsolete.
- TLS encrypts only **application data**; TCP and IP are unchanged.
- **Certificates** prove server identity: a **CA** signs them via a **CSR**; self-signed certs are untrusted.
- **HTTPS = HTTP + TLS** on port 443, with a TCP handshake then a TLS handshake.
- Wireshark shows **Application Data** for HTTPS until an `ssl-key.log` is loaded, then decrypts it.
- Secure email: **SMTPS 465/587**, **POP3S 995**, **IMAPS 993**; plaintext IMAP leaks credentials.
- **SSH** (port 22) replaced TELNET (23); **OpenSSH** is the common implementation.
- **SFTP** uses SSH (port 22); **FTPS** uses TLS (port 990).
- **VPNs** create encrypted tunnels — site-to-site links networks, remote-access links users.

---

## Cheat Sheet

Plaintext vs secure ports:

| Protocol | Plaintext port | Secure protocol | Secure port |
|----------|----------------|-----------------|-------------|
| **HTTP** | 80 | HTTPS | 443 |
| **SMTP** | 25 | SMTPS | 465 / 587 |
| **POP3** | 110 | POP3S | 995 |
| **IMAP** | 143 | IMAPS | 993 |
| **FTP** | 21 | FTPS | 990 |
| **FTP** | 21 | SFTP | 22 |
| **TELNET** | 23 | SSH | 22 |

Which technology secures each protocol:

| Protocol | Secured by |
|----------|-----------|
| **HTTPS** | TLS |
| **SMTPS** | TLS |
| **POP3S** | TLS |
| **IMAPS** | TLS |
| **FTPS** | TLS |
| **SFTP** | SSH |
| **SSH** | Encryption (SSH) |

Common commands:

```bash
ssh username@hostname
ssh -X user@host
sftp user@hostname
get filename
put filename
```

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q1. What is the difference between SSL and TLS?** | TLS is the modern replacement for SSL. SSL is obsolete and has known weaknesses, while TLS (currently TLS 1.3) is the standard for encrypting application traffic. People often say "SSL" but mean TLS. |
| **Q2. What three security services does TLS provide?** | Confidentiality (encryption), integrity (tamper detection), and authentication (verifying the server via a certificate) — the CIA triad. |
| **Q3. Why is HTTPS more secure than HTTP?** | HTTPS wraps HTTP in TLS, so the application data is encrypted, integrity-protected, and the server is authenticated by a certificate. HTTP sends everything in plaintext on port 80, while HTTPS uses port 443. |
| **Q4. Does HTTPS replace TCP or IP?** | No. TLS sits between the application and the transport layer, so it encrypts only application data. TCP still handles reliability and ordering, and IP still handles routing. |
| **Q5. Why does Wireshark show "Application Data" for HTTPS traffic?** | Because TLS encrypts the HTTP payload and Wireshark has no key to decrypt it. Supplying the TLS session keys (an `ssl-key.log`) lets Wireshark decrypt and show the underlying HTTP. |
| **Q6. What is a Certificate Authority, and what is a self-signed certificate?** | A CA is a trusted organisation that signs certificates to vouch for a server's identity. A self-signed certificate is signed by its own creator with no CA, so browsers do not trust it and show a warning — it should never prove server authenticity in production. |
| **Q7. What is the difference between SFTP and FTPS?** | SFTP transfers files over SSH on port 22 with a single connection. FTPS transfers files over TLS on port 990 using certificates and separate control and data connections, which can cause more firewall issues. |
| **Q8. What is the difference between a site-to-site VPN and a remote-access VPN?** | A site-to-site VPN connects entire networks, such as a branch office to a main office. A remote-access VPN connects a single user or device into a private network, which suits remote workers. |

## Final Takeaway

Secure protocols exist because the original internet protocols were never designed to protect data — they carried passwords, emails, and payment details in readable plaintext. The fix is consistent: take an existing protocol and layer **TLS** or **SSH** on top, or route traffic through a **VPN tunnel**, so the same application data gains confidentiality, integrity, and authentication without disturbing TCP or IP. TLS (the successor to SSL) secures HTTPS, SMTPS, POP3S, and IMAPS and relies on CA-signed certificates for trust; SSH secures remote login and file transfer through SFTP; FTPS secures file transfer with TLS; and VPNs protect all traffic across untrusted networks. Learn the plaintext-to-secure port mappings, remember that the letter "S" usually means "secured by TLS," and you have the foundation for secure web browsing, email, remote administration, file transfer, and enterprise networking.
