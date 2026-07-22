| | |
|---|---|
| **Module** | Network Fundamentals |
| **Room** | Packets & Frames |
| **Difficulty** | Easy |
| **Status** | Completed |

#### Learning Objectives
After completing this room you should understand:
- The difference between packets and frames
- What encapsulation is
- TCP (Transmission Control Protocol)
- UDP (User Datagram Protocol)
- The TCP Three-Way Handshake

#### Packets vs Frames
Data travels in different units depending on which OSI layer it is on.
- **Packets** — Data unit at **Layer 3 (Network Layer)**. Contains logical IP addresses.
- **Frames** — Data unit at **Layer 2 (Data Link Layer)**. Contains physical MAC addresses.

```text
[ Layer 3: Packet ]  <── Contains Source IP & Destination IP
        ↓  (Encapsulated into L2)
[ Layer 2: Frame  ]  <── Contains Source MAC & Destination MAC + Packet Data
```

---

#### Layer 4 Transport Protocols
When sending data over a network, Layer 4 must choose between two main protocols: **TCP** and **UDP**.

##### TCP (Transmission Control Protocol)
- **Connection-oriented** — Before sending data, a connection MUST be established between the sender and receiver.
- **Reliable** — Guarantees that all data is delivered safely and in the correct order. If a piece of data is lost, TCP will detect it and request retransmission.
- **Features:** Slow but reliable · Flow Control · Error checking.
- **Used for:** Web browsing (HTTP/HTTPS) · Email (SMTP) · File Transfer (FTP) · Remote Terminal (SSH).

##### UDP (User Datagram Protocol)
- **Connectionless** — Does not establish a connection before sending data. It just sends the data and hopes it arrives (fire-and-forget).
- **Unreliable** — Does not guarantee that data will arrive or that it will be in the correct order. No retransmission if data is lost.
- **Features:** Fast · Low overhead · No error checking/retransmission.
- **Used for:** Video streaming · Online gaming · Voice over IP (VoIP) · DNS queries.

---

#### The TCP Three-Way Handshake
To establish a secure connection, TCP uses a three-step handshake:

```text
[ Client ] ────────── SYN ──────────> [ Server ]
[ Client ] <─────── SYN-ACK ───────── [ Server ]
[ Client ] ────────── ACK ──────────> [ Server ]
```

1. **SYN (Synchronize)** — The client sends a packet with a synchronize flag to initiate the connection. "Hello, I want to talk."
2. **SYN-ACK (Synchronize-Acknowledge)** — The server replies with a synchronize and acknowledge flag. "I hear you, I am ready to talk."
3. **ACK (Acknowledge)** — The client sends an acknowledge packet. "Great, let's start sending data."

Once these three steps are complete, the connection is open, and data can be transmitted.

##### Handshake Steps
| Step | Sender | Packet Flag | Meaning |
|---|---|---|---|
| **1** | Client | **SYN** | Requesting connection |
| **2** | Server | **SYN-ACK** | Ready, acknowledging request |
| **3** | Client | **ACK** | Final handshake confirmation |

## Contents

- [Learning Objectives](#learning-objectives)
- [Packets vs Frames](#packets-vs-frames)
- [Layer 4 Transport Protocols](#layer-4-transport-protocols)
- [TCP (Transmission Control Protocol)](#tcp-transmission-control-protocol)
- [UDP (User Datagram Protocol)](#udp-user-datagram-protocol)
- [The TCP Three-Way Handshake](#the-tcp-three-way-handshake)
- [Handshake Steps](#handshake-steps)
- [Interview Questions](#interview-questions)
- [Memory Tricks](#memory-tricks)
- [Quick Revision](#quick-revision)
- [Final Summary](#final-summary)

## Interview Questions

| Question | Answer |
|---|---|
| **TCP vs UDP?** | Feature — TCP — UDP<br>Connection — Yes — No<br>Reliability — Yes — No<br>Speed — Slower — Faster |
| **What is the TCP 3-Way Handshake?** | The process used to establish a reliable TCP session using three packets: **SYN**, **SYN-ACK**, and **ACK**. |
| **When would you use UDP over TCP?** | For real-time applications like online gaming, video streaming, or VoIP, where speed is more important than perfect data accuracy. |
| **What is Encapsulation in networking?** | The process of wrapping higher-layer data with headers (IP at L3, MAC at L2) as it travels down the OSI stack for transmission. |

## Memory Tricks

```text
Transport Protocols
│
├── TCP (Reliable Post Office)
│   ├── Connection-oriented
│   ├── Three-Way Handshake (SYN -> SYN-ACK -> ACK)
│   └── Re-sends lost packages
│
└── UDP (Megaphone/Broadcast)
    ├── Connectionless
    ├── Fire-and-forget (instant delivery)
    └── Ignores lost packages
```

## Quick Revision

| Feature | TCP | UDP |
|---|---|---|
| **Connection** | Connection-oriented | Connectionless |
| **Reliability** | Reliable | Unreliable |
| **Speed** | Slower | Faster |
| **Flow Control** | Yes | No |
| **Data Unit** | Segment | Datagram |
| **Common Uses** | Web, Email, SSH | Video, Gaming, DNS |

## Final Summary

- **Packets** belong to Layer 3 and use IP addresses; **Frames** belong to Layer 2 and use MAC addresses.
- **Encapsulation** builds the transmission unit step-by-step down the OSI stack.
- **TCP** is connection-oriented, performing a **3-way handshake** to guarantee reliable delivery.
- **UDP** is connectionless and fast, prioritizing transmission speed over verification.
- The 3-way handshake consists of **SYN**, SYN-ACK, and ACK packets.
