| | |
|---|---|
| **Module** | Network Fundamentals |
| **Room** | OSI Model |
| **Difficulty** | Easy |
| **Status** | Completed |

#### Learning Objectives
After completing this room you should understand:
- What the OSI Model is
- The 7 layers of the OSI Model
- What happens at each layer
- Data encapsulation process
- Real-world application of the OSI Model in troubleshooting and security

#### What is the OSI Model? (OSI = Open Systems Interconnection)
The **OSI Model** is a 7-layer theoretical framework that standardizes how computers send data to each other.

It was created to allow devices from different vendors to work together.

#### Why is the OSI Model important?
- Helps with **Troubleshooting** — By identifying which layer a problem is on, you can solve it much faster.
- Helps with **Security** — Different security controls (firewalls, encryption, authentication) work at different layers.
- Standardizes network communication.

#### The 7 Layers
```text
[ Layer 7 ]  Application    <── Web browsers, HTTP, DNS
[ Layer 6 ]  Presentation   <── Encryption, TLS, Compression
[ Layer 5 ]  Session        <── Communication sessions
[ Layer 4 ]  Transport      <── TCP, UDP, Ports
[ Layer 3 ]  Network        <── IP Addresses, Routing
[ Layer 2 ]  Data Link      <── MAC Addresses, Switches
[ Layer 1 ]  Physical       <── Cables, Bits, Hubs
```

---

#### Layer 7 — Application Layer
Provides network services directly to user applications (web browsers, email clients).
- **Protocols:** HTTP, HTTPS, FTP, SMTP, DNS, SSH, Telnet.
- **Example:** Chrome requesting a website using HTTPS.

#### Layer 6 — Presentation Layer
Translates data into a standard format for the application layer. It handles **formatting, encryption, and compression**.
- **Features:** Encryption/Decryption (TLS/SSL) · Compression · Data Translation (e.g., ASCII to UTF-8).
- **Example:** Encrypting credit card details using TLS before sending them.

#### Layer 5 — Session Layer
Establishes, manages, and terminates communication sessions between two devices.
- **Features:** Authentication · Session Setup · Session teardown · Keeping sessions separate.
- **Example:** Logging into a website and keeping your connection alive.

#### Layer 4 — Transport Layer
Handles flow control, error checking, and data delivery.
- **Protocols:** TCP, UDP.
- **Data Unit:** **Segment** (TCP) or **Datagram** (UDP).
- **Example:** Choosing TCP for reliable file transfers, or UDP for fast live-streaming video.

#### Layer 3 — Network Layer
Handles logical routing of data packets across different networks.
- **Protocols:** IP (IPv4, IPv6), ICMP.
- **Device:** Routers.
- **Data Unit:** **Packet**.
- **Example:** Finding the best route across the Internet using IP addresses.

#### Layer 2 — Data Link Layer
Handles physical device-to-device communication on the **same** local network.
- **Devices:** Switches, Network cards (NIC).
- **Protocols:** Ethernet, Wi-Fi.
- **Data Unit:** **Frame**.
- **Example:** Sending data from your laptop to your home router using MAC addresses.

#### Layer 1 — Physical Layer
Transmits raw binary data (1s and 0s) over physical media.
- **Media:** Ethernet cables (copper), Fiber optic cables (light), Wi-Fi (radio waves).
- **Devices:** Hubs, Repeaters, Cables.
- **Data Unit:** **Bit**.
- **Example:** Electrical signals passing through an Ethernet cable.

---

#### Data Encapsulation & Decapsulation
As data travels from the sender to the receiver, it undergoes:
- **Encapsulation (Sender)** — Wrapping data with headers at each layer as it goes from Layer 7 to Layer 1.
- **Decapsulation (Receiver)** — Stripping off the headers as the data moves from Layer 1 back to Layer 7.

##### Encapsulation Flow
```text
[ L7: Data ] ──> [ L6: Data ] ──> [ L5: Data ]
      ↓
[ L4: TCP Header + Data ]               (Segment)
      ↓
[ L3: IP Header + TCP + Data ]          (Packet)
      ↓
[ L2: MAC Header + IP + TCP + Data ]    (Frame)
      ↓
[ L1: 10110011... ]                     (Bits)
```

##### Mnemonics
- **Top-to-Bottom:** **A**ll **P**eople **S**eem **T**o **N**eed **D**ata **P**rocessing
- **Bottom-to-Top:** **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way

## Contents

- [Learning Objectives](#learning-objectives)
- [What is the OSI Model? (OSI = Open Systems Interconnection)](#what-is-the-osi-model-osi-=-open-systems-interconnection)
- [Why is the OSI Model important?](#why-is-the-osi-model-important)
- [The 7 Layers](#the-7-layers)
- [Layer 7 — Application Layer](#layer-7-—-application-layer)
- [Layer 6 — Presentation Layer](#layer-6-—-presentation-layer)
- [Layer 5 — Session Layer](#layer-5-—-session-layer)
- [Layer 4 — Transport Layer](#layer-4-—-transport-layer)
- [Layer 3 — Network Layer](#layer-3-—-network-layer)
- [Layer 2 — Data Link Layer](#layer-2-—-data-link-layer)
- [Layer 1 — Physical Layer](#layer-1-—-physical-layer)
- [Data Encapsulation & Decapsulation](#data-encapsulation-&-decapsulation)
- [Encapsulation Flow](#encapsulation-flow)
- [Mnemonics](#mnemonics)
- [Interview Questions](#interview-questions)
- [Memory Tricks](#memory-tricks)
- [Quick Revision](#quick-revision)
- [Final Summary](#final-summary)

## Interview Questions

| Question | Answer |
|---|---|
| **What is the difference between Layer 2 and Layer 3?** | **Layer 2 (Data Link)** uses physical **MAC addresses** and handles communication on the *same* network (using Switches).<br>**Layer 3 (Network)** uses logical **IP addresses** and routes data *across different* networks (using Routers). |
| **At which layer does TLS/SSL encryption happen?** | Layer 6 (Presentation Layer). |
| **What is Encapsulation?** | The process of wrapping data with headers at each layer of the OSI model as it moves down from the Application layer to the Physical layer. |
| **Where do Switches and Routers operate?** | **Switches** operate at Layer 2 (Data Link).<br>**Routers** operate at Layer 3 (Network). |

## Memory Tricks

```text
OSI Model Layers
│
├── L7: Application  (User UI: HTTP, DNS)
├── L6: Presentation (Formatting & TLS)
├── L5: Session      (Session Sync)
├── L4: Transport    (Reliability: TCP/UDP)
├── L3: Network      (IP Routing: Packets)
├── L2: Data Link    (MAC Switching: Frames)
└── L1: Physical     (Cables & Bits: Volts)
```

## Quick Revision

| Layer | Name | Protocol/Device | Data Unit |
|---|---|---|---|
| **7** | Application | HTTP, HTTPS, DNS | Data |
| **6** | Presentation | TLS/SSL, JPEG, ASCII | Data |
| **5** | Session | NetBIOS, Session Setup | Data |
| **4** | Transport | TCP, UDP | Segment/Datagram |
| **3** | Network | IP, ICMP / Routers | Packet |
| **2** | Data Link | Ethernet, Wi-Fi / Switches | Frame |
| **1** | Physical | Cables, Hubs | Bits |

## Final Summary

- The **OSI Model** is a 7-layer framework standardizing network communications.
- Layer 7 (**Application**) interfaces with users; Layer 1 (**Physical**) deals with raw hardware/bits.
- **Protocols** are mapped to specific layers (e.g., HTTP at L7, TCP at L4, IP at L3).
- Data is **encapsulated** into Segments (L4), Packets (L3), and Frames (L2).
- Security controls exist across layers: **Firewalls** block ports (L4) or IPs (L3); **TLS** encrypts at L6.
