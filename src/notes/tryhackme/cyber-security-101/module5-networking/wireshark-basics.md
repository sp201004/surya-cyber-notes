| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Networking / Wireshark |
| **Difficulty** | Beginner |
| **Time** | ~50 Minutes |
| **Module** | Networking |

---

## Objective

This room introduces **Wireshark**, the world's most popular network protocol analyzer. Wireshark captures the packets travelling across a network and displays them in a readable format, so instead of guessing what happened you can see every packet that was exchanged between devices.

By the end of this room you will be able to:

- Explain what a packet, a PCAP file, and Wireshark are
- Navigate the three-pane Wireshark interface (Packet List, Packet Details, Packet Bytes)
- Follow packet dissection through the OSI protocol layers
- Move around large captures with Go To Packet, Find, Mark, and Comments
- Write display filters to isolate protocols, ports, and IP addresses
- Use Apply as Filter, conversation filters, and Follow Stream
- Export selected packets and recover transferred files with Export Objects
- Read Expert Information and follow a repeatable investigation workflow

Wireshark is used daily by SOC analysts, incident responders, malware analysts, penetration testers, digital forensic investigators, and network engineers.

---

## Task 1 — What Is a Packet?

A **packet** is a small unit of data sent across a network. Almost everything you do online is broken into packets: opening a website, watching a video, sending a message, logging into a site, or downloading a file all generate thousands of packets.

A simple web request travels as a stream of packets between the browser and the server:

```text
Browser
    │
    │ HTTP Request
    ▼
Internet
    │
    ▼
Server
```

Each request and each response is made up of packets, and Wireshark lets us inspect every one of them.

---

## Task 2 — What Is a PCAP File?

**PCAP** stands for **Packet Capture**. A PCAP file stores captured packets on disk so they can be analyzed later, exactly as they appeared on the wire.

The two common file extensions are:

```text
.pcap
.pcapng
```

Think of a PCAP as a recording. Instead of recording your screen, it records network traffic:

```text
Video Recording
        │
        ▼
Network Recording
```

Because the capture is saved, an analyst can reopen it, filter it, and re-examine it as many times as needed.

---

## Task 3 — What Is Wireshark?

**Wireshark** is a GUI-based packet analyzer. It captures packets from a network interface and displays them in a human-readable form, decoding each protocol so you do not have to read raw bytes by hand. The official project lives at `https://www.wireshark.org`.

### Common Uses

| Use case | What Wireshark helps with |
|----------|---------------------------|
| **Network troubleshooting** | Finding delays, retransmissions, and packet loss |
| **Malware analysis** | Inspecting suspicious traffic and recovering payloads |
| **Incident response** | Reconstructing what an attacker did on the network |
| **Threat hunting** | Searching captures for signs of compromise |
| **Digital forensics** | Preserving and examining network evidence |
| **Protocol analysis** | Understanding how a protocol behaves on the wire |
| **Performance analysis** | Measuring latency and throughput issues |

### Real-World Example

When a user reports that a website is very slow, guessing wastes time. With Wireshark you can look at the capture and pinpoint the real cause, such as DNS delay, TCP retransmission, server delay, HTTP errors, or packet loss.

> **Tip:** Wireshark answers the question "what actually happened on the network?" with evidence instead of assumptions, which is why it is a foundational tool across both offensive and defensive security.

---

## Task 4 — The Wireshark Interface

The Wireshark window is built around three stacked panes. The top pane lists packets, the middle pane decodes the selected packet, and the bottom pane shows its raw bytes.

```text
+--------------------------------------+
| Packet List                          |
+--------------------------------------+
| Packet Details                       |
+--------------------------------------+
| Packet Bytes                         |
+--------------------------------------+
```

### Packet List Pane

Shows every captured packet, one per row. The columns usually include:

| Column | Meaning |
|--------|---------|
| **No.** | Unique packet number |
| **Time** | When the packet was captured |
| **Source** | Sending address |
| **Destination** | Receiving address |
| **Protocol** | Highest protocol detected |
| **Length** | Packet size in bytes |
| **Info** | Short summary of the packet |

### Packet Details Pane

Displays the protocol layers of the selected packet, from the frame up to the application data. Each layer can be expanded to reveal its fields:

```text
Frame
Ethernet
IPv4
TCP
HTTP
```

### Packet Bytes Pane

Displays the raw packet as hexadecimal on the left and the corresponding ASCII on the right, letting you inspect the exact bytes behind each decoded field.

```text
0000   45 00 00 3c ...
0010   ab cd ef ...
```

> **Note:** The three panes work together. Selecting a packet in the Packet List drives what appears in the Packet Details and Packet Bytes panes, and clicking a field in the details pane highlights the matching bytes below.

---

## Task 5 — Packet Structure and Dissection

Every packet is built from several protocol headers wrapped around the application data. A typical web packet is layered like this:

```text
+-----------------------+
| Ethernet Header       |
+-----------------------+
| IP Header             |
+-----------------------+
| TCP / UDP Header      |
+-----------------------+
| Application Data      |
+-----------------------+
```

**Packet dissection** means breaking a single packet apart into those protocol layers so each one can be read on its own. Instead of showing random bytes, Wireshark decodes every protocol in order:

```text
Frame
  │
  ▼
Ethernet
  │
  ▼
IPv4
  │
  ▼
TCP
  │
  ▼
HTTP
```

Each layer adds its own information, and the layers map onto the OSI model. Wireshark's decoded stack lines up with OSI as shown below:

```text
OSI Model                 Wireshark
-------------------       -------------
Application
Presentation      <-->    HTTP
Session
-------------------       -------------
Transport         <-->    TCP
-------------------       -------------
Network           <-->    IPv4
-------------------       -------------
Data Link         <-->    Ethernet II
-------------------
Physical
```

### Frame Layer

Contains capture metadata rather than on-the-wire header data.

| Field | Description |
|-------|-------------|
| **Frame Number** | Position in the capture |
| **Arrival Time** | When the frame was captured |
| **Frame Length** | Total size of the frame |
| **Capture Length** | Number of bytes actually captured |
| **Interface Used** | Interface the frame arrived on |

### Ethernet Layer

Carries the Layer 2 addressing information.

| Field | Description |
|-------|-------------|
| **Source MAC** | Hardware address of the sender, e.g. `00:11:22:33:44:55` |
| **Destination MAC** | Hardware address of the receiver, e.g. `AA:BB:CC:DD:EE:FF` |
| **EtherType** | The upper-layer protocol carried in the frame |

### IPv4 Layer

Carries the Layer 3 routing information.

| Field | Description |
|-------|-------------|
| **Source IP** | Sending IP address, e.g. `192.168.1.10` |
| **Destination IP** | Receiving IP address, e.g. `8.8.8.8` |
| **TTL** | Time To Live hop limit |
| **Identification** | Fragment identifier |
| **Flags** | Fragmentation control flags |

### TCP Layer

Carries the Layer 4 reliable transport information.

| Field | Description |
|-------|-------------|
| **Source Port** | Sending port |
| **Destination Port** | Receiving port |
| **Sequence Number** | Byte offset of this segment |
| **ACK Number** | Next expected byte |
| **Window Size** | Advertised receive window |
| **Flags** | Control flags: `SYN`, `ACK`, `FIN`, `RST`, `PSH`, `URG` |

### HTTP Layer

The application protocol layer, containing the request and response detail.

| Field | Description |
|-------|-------------|
| **Method** | Request verb such as `GET` or `POST` |
| **Host** | Target host header |
| **User-Agent** | Client software string |
| **Cookies** | Session and state cookies |
| **Response Code** | Server status such as `200 OK` |

---

## Task 6 — Packet Navigation

A single capture can hold anywhere from a handful of packets to well over a million, so finding packets manually is impossible. Wireshark provides several navigation tools to move around quickly.

Every packet is given a **unique packet number** that never repeats, which makes it easy to reference specific packets in investigations, documentation, and incident reports.

### Go To Packet

Jumps straight to a packet by its number, reached through **Go → Go To Packet**. Type a number such as `5000` and Wireshark opens that packet instantly.

### Find Packet

Opened from **Edit → Find Packet**, this searches the capture for matching content. You can search by:

| Search type | Use |
|-------------|-----|
| **Display Filter** | Match packets using filter syntax |
| **Hex Value** | Match specific byte sequences |
| **String** | Match readable text such as `login`, `password`, or `admin` |
| **Regular Expression** | Match text patterns |

### Mark Packet

Marking highlights important packets so they stand out during an investigation. Marked packets keep their highlight until you unmark them and can later be exported on their own.

### Packet Comments

Comments let analysts attach notes directly inside the capture, such as "Possible Malware", "Investigate Later", or "Suspicious DNS Request". Because the note is stored in the PCAP, it is preserved when the file is shared, which helps teams collaborate.

> **Tip:** Marking highlights a packet visually, while a comment stores written context inside the capture file. Use marking to flag packets and comments to explain why they matter.

---

## Task 7 — Packet Filtering

Filtering is what makes large captures usable. Rather than scrolling through hundreds of thousands of packets, you narrow the view to only what matters:

```text
500,000 Packets
        │
        ▼
   HTTP Only
        │
        ▼
   120 Packets
```

Wireshark provides two filtering mechanisms.

| Filter type | When it runs | Effect |
|-------------|--------------|--------|
| **Capture Filter** | Before capturing | Only matching packets are recorded to the PCAP |
| **Display Filter** | After capturing | Nothing is deleted; only matching packets are shown |

A capture filter reduces what gets saved in the first place:

```text
Network → Capture Filter → Matching Packets → PCAP
```

A display filter changes only what is visible, leaving the full capture intact:

```text
PCAP → Display Filter → Displayed Packets
```

Display filters are used most often during investigations because they are non-destructive and can be changed freely.

> **Note:** The golden rule of Wireshark filtering is "if you can click it, you can filter it." Almost any field you see in the Packet Details pane can be turned into a filter.

### Apply as Filter

The quickest way to filter without typing. Right-click a field or value and choose **Apply as Filter**, then pick how it should be combined:

| Option | Result |
|--------|--------|
| **Selected** | Show packets matching the value |
| **Not Selected** | Show packets that do not match the value |
| **...and Selected** | Add the value with a logical AND |
| **...or Selected** | Add the value with a logical OR |

For example, right-clicking a source IP of `192.168.1.20` and choosing Apply as Filter builds the filter automatically:

```text
ip.src == 192.168.1.20
```

### Prepare as Filter

Works like Apply as Filter but places the filter in the filter bar **without** running it, so you can edit or extend it first. This is useful when building a longer filter from several conditions, for example:

```text
ip.dst == 8.8.8.8
```

### Apply as Column

If you frequently inspect a field such as `TTL`, TCP stream, HTTP host, or sequence number, right-click it and choose **Apply as Column** to make it a permanent column in the Packet List. This avoids reopening the Packet Details pane for every packet.

---

## Task 8 — Conversation Filters and Coloring

### Conversation Filter

A conversation filter isolates every packet that belongs to a single conversation, which is ideal when investigating an HTTP session, a TCP session, an SSH connection, or malware communication. Selecting a packet and applying the conversation filter generates something like:

```text
tcp.stream == 5
```

Only packets from stream 5 remain visible.

### Colourise Conversation

Colourise Conversation is similar but non-destructive. Instead of hiding other packets, it keeps them all and highlights the related ones, which is handy for comparing several conversations at once.

| Feature | Effect on other packets |
|---------|-------------------------|
| **Conversation Filter** | Hides everything except the chosen conversation |
| **Colourise Conversation** | Keeps all packets and highlights the related ones |

---

## Task 9 — Follow Stream

Follow Stream is one of Wireshark's most powerful features. Instead of reading packets one at a time, Wireshark reconstructs the entire conversation into readable text. It supports TCP, UDP, and HTTP streams.

Following a stream lets analysts read the actual content of a session: HTTP requests and responses, login credentials, cookies, commands, chat messages, and malware traffic, instead of piecing together hundreds of packets by hand.

### Follow HTTP Stream

Reconstructs the full request and response of a web exchange:

```text
Request
  GET /login
  Host: example.com
  User-Agent: Mozilla
  Cookie: PHPSESSID=...

Response
  HTTP/1.1 200 OK
  Content-Type: text/html
```

This is especially useful for web application analysis.

### Follow TCP Stream

Shows the complete TCP conversation from handshake to teardown:

```text
Client
  │  SYN
  │  SYN ACK
  │  ACK
  │  Application Data
  │  FIN
  ▼
Server
```

### Follow UDP Stream

Useful for connectionless protocols and services such as DNS, VoIP, streaming, and gaming.

---

## Task 10 — Common Display Filters

### Filter by Protocol

Type the protocol name on its own to see only that protocol's packets.

```text
http
dns
ftp
arp
icmp
tls
```

### Filter by TCP Port

Use `tcp.port` to match a specific TCP port.

```text
tcp.port == 80
tcp.port == 443
```

| Filter | Service |
|--------|---------|
| **`tcp.port == 80`** | HTTP |
| **`tcp.port == 443`** | HTTPS |
| **`tcp.port == 22`** | SSH |
| **`tcp.port == 3389`** | RDP |
| **`tcp.port == 25`** | SMTP |

### Filter by UDP Port

Use `udp.port` for UDP-based services.

```text
udp.port == 53
```

| Filter | Service |
|--------|---------|
| **`udp.port == 53`** | DNS |
| **`udp.port == 67`** | DHCP |
| **`udp.port == 123`** | NTP |

### Filter by IP Address

`ip.addr` matches either the source or destination, while `ip.src` and `ip.dst` are direction-specific.

```text
ip.addr == 192.168.1.15
ip.src == 192.168.1.15
ip.dst == 192.168.1.15
```

| Filter | Matches |
|--------|---------|
| **`ip.addr`** | Packets where the source OR destination matches |
| **`ip.src`** | Packets from the given source only |
| **`ip.dst`** | Packets to the given destination only |

### Comparison Operators

Display filters support the standard comparison operators.

| Operator | Meaning |
|----------|---------|
| **`==`** | Equal |
| **`!=`** | Not equal |
| **`>`** | Greater than |
| **`<`** | Less than |
| **`>=`** | Greater than or equal |
| **`<=`** | Less than or equal |

### Combining Filters

Filters can be joined with logical operators to build precise queries.

```text
http && ip.addr == 192.168.1.5
http || dns
!icmp
```

| Filter | Result |
|--------|--------|
| **`http && ip.addr == 192.168.1.5`** | HTTP traffic involving one IP (AND) |
| **`http \|\| dns`** | HTTP or DNS packets (OR) |
| **`!icmp`** | Everything except ICMP (NOT) |

---

## Task 11 — Export Packets and Objects

### Export Packets

Large captures can hold millions of packets, but you rarely need to share the whole file. Exporting lets you save just the packets that matter for evidence, malware analysis, reporting, or incident response. Rather than sharing a 500 MB PCAP, you can export only the 15 suspicious packets.

| Export option | Saves |
|---------------|-------|
| **All Packets** | Every packet in the capture |
| **Displayed Packets** | Only packets matching the current display filter |
| **Marked Packets** | Only the packets you marked |
| **Selected Packets** | Only the currently selected packets |

The typical flow is capture, filter, mark, then export the selected packets.

### Export Objects

Export Objects recovers the actual files that were transferred across the network, rather than just the packets that carried them.

| Supported protocol | Notes |
|--------------------|-------|
| **HTTP** | Web downloads and uploads |
| **SMB** | Windows file sharing |
| **TFTP** | Trivial file transfers |
| **IMF** | Internet message format (email) |
| **DICOM** | Medical imaging transfers |

Recovered objects can include images, PDFs, ZIP archives, text files, executables, Office documents, and scripts. In a malware investigation where a victim downloads `invoice.exe`, the packets alone show only network traffic, but Export Objects can rebuild the file so it can be sent to static and dynamic analysis.

> **Security relevance:** Export Objects turns a raw capture into recovered evidence. Being able to reconstruct a downloaded executable from HTTP or SMB traffic is often the pivot point between spotting suspicious traffic and confirming a malware infection.

---

## Task 12 — Time Display and Expert Information

### Time Display Format

Time is central to any investigation, and Wireshark can present it in several formats.

| Format | Description |
|--------|-------------|
| **Seconds Since Beginning of Capture** | Relative to the first packet |
| **Seconds Since Previous Packet** | Gap from the previous packet |
| **UTC Time** | Absolute time in UTC |
| **Date and Time** | Full calendar date and clock time |
| **Local Time** | Time in the analyst's timezone |

Choosing the right format makes it far easier to build a timeline, for example lining up a login, a malware download, a command-and-control connection, and data exfiltration.

### Expert Information

Expert Information automatically detects and highlights abnormal events in a capture, so you do not have to review every packet by hand. It groups findings by severity.

| Severity | Colour | Meaning |
|----------|--------|---------|
| **Chat** | Blue | Normal workflow information |
| **Note** | Cyan | Interesting but not alarming |
| **Warning** | Yellow | Potential issue worth checking |
| **Error** | Red | Critical problem detected |

Common alerts it raises include:

| Alert | What it indicates |
|-------|-------------------|
| **TCP Retransmission** | A segment was sent again, often due to loss |
| **Duplicate ACK** | Repeated acknowledgements, a sign of loss or delay |
| **Spurious Retransmission** | An unnecessary retransmission |
| **Checksum Error** | A corrupted or miscomputed checksum |
| **Malformed Packet** | A packet that does not match its protocol structure |
| **Deprecated Protocol** | Use of an outdated protocol |

> **Tip:** Checking Expert Information early gives you a fast overview of where the problems are, letting you jump straight to warnings and errors instead of scanning the whole capture.

---

## Task 13 — Investigation Workflow

Wireshark investigations follow a repeatable pattern. Starting with Expert Information surfaces the anomalies quickly, then display filters and Follow Stream narrow the focus to the relevant conversation before evidence is exported and reported.

```text
Open PCAP
   │
   ▼
Check Expert Information
   │
   ▼
Look for Warnings
   │
   ▼
Apply Display Filters
   │
   ▼
Follow Stream
   │
   ▼
Inspect Payload
   │
   ▼
Mark Important Packets
   │
   ▼
Add Comments
   │
   ▼
Export Evidence
   │
   ▼
Write Report
```

A concrete example ties the whole toolset together:

```text
User Reports Slow Computer
   │
   ▼
Capture Traffic → Open PCAP
   │
   ▼
Expert Information → Warnings Found
   │
   ▼
HTTP Filter → Follow Stream
   │
   ▼
Downloaded Malware Found
   │
   ▼
Export Object → Analyze Malware
   │
   ▼
Create Report
```

### Advantages and Limitations

Wireshark is free, open source, cross-platform, and understands 2000+ protocols with deep packet inspection, powerful display filters, file extraction, and stream reconstruction, which is why it is the industry standard analyzer. It is important to know what it cannot do as well.

| Wireshark can | Wireshark cannot |
|---------------|------------------|
| Capture and decode traffic | Block attacks |
| Filter and search packets | Prevent malware |
| Reconstruct streams | Replace an IDS |
| Extract transferred files | Decrypt traffic without keys |
| Highlight anomalies | Handle huge captures without ample RAM |

> **Security relevance:** Wireshark is an analysis tool, not a defensive control. It tells you what happened after the fact, which is exactly what makes it valuable for forensics and incident response, but it must be paired with preventive tools like firewalls and IDS/IPS.

### Best Practices

- Capture only the interfaces you actually need.
- Prefer display filters during analysis to keep the original capture intact.
- Save the original PCAP and never modify the original evidence.
- Add comments as you investigate and export suspicious packets separately.
- Follow streams before drawing conclusions and always verify timestamps.

---

## Quick Revision

| Concept | Summary |
|---------|---------|
| Packet | A small unit of data sent across a network |
| PCAP | A file that stores captured packets for later analysis |
| Packet List | Top pane showing a summary of every packet |
| Packet Details | Middle pane showing decoded protocol layers |
| Packet Bytes | Bottom pane showing raw hex and ASCII |
| Packet dissection | Breaking a packet into Ethernet, IP, TCP, and HTTP layers |
| Capture filter | Runs before capture and limits what is recorded |
| Display filter | Runs after capture and limits what is shown |
| Follow Stream | Reconstructs a full TCP, UDP, or HTTP conversation |
| Export Objects | Recovers transferred files from supported protocols |
| Expert Information | Automatically highlights abnormal traffic by severity |

**Key idea:** Wireshark records the network like a video recorder, decodes each packet through its protocol layers, and then uses filters, Follow Stream, and Expert Information to turn an overwhelming capture into focused, reportable evidence.

---

## 30-Second Revision

- A packet is a small unit of network data; a PCAP file stores captured packets for later analysis.
- Wireshark's three panes are Packet List (summary), Packet Details (decoded layers), and Packet Bytes (raw hex and ASCII).
- Packet dissection maps to OSI: HTTP over TCP over IPv4 over Ethernet II.
- Capture filters run before capture and drop packets; display filters run after and only change the view.
- Filter by protocol (`http`), TCP port (`tcp.port == 80`), UDP port (`udp.port == 53`), or IP (`ip.addr == 192.168.1.15`).
- Combine filters with `&&`, `||`, and `!`; compare with `==`, `!=`, `>`, `<`, `>=`, `<=`.
- Apply as Filter builds filters from a right-click; conversation filters and Follow Stream isolate one session.
- Mark packets to flag them, comment to store notes, Export Objects to recover files, and Expert Information to spot anomalies.

---

## Cheat Sheet

### Protocol Filters

```text
http
https
dns
ftp
smtp
pop
imap
ssh
telnet
tcp
udp
arp
icmp
tls
```

### Port Filters

```text
tcp.port == 80
tcp.port == 443
tcp.port == 22
tcp.port == 21
tcp.port == 25
tcp.port == 3389
udp.port == 53
udp.port == 67
udp.port == 123
```

### IP and MAC Filters

```text
ip.addr == 192.168.1.10
ip.src == 192.168.1.10
ip.dst == 192.168.1.10
eth.addr == 00:11:22:33:44:55
```

### TCP Flags and Packet Length

```text
tcp.flags.syn == 1
tcp.flags.fin == 1
tcp.flags.reset == 1
tcp.flags.ack == 1
frame.len > 1000
frame.len < 100
```

### HTTP and DNS Filters

```text
http.request
http.response
http.host
http.user_agent
http.request.method == "GET"
http.request.method == "POST"
dns.flags.response == 1
dns.qry.name
dns.a
```

### ICMP and TCP Stream

```text
icmp
icmp.type == 8
icmp.type == 0
tcp.stream == 0
tcp.stream == 1
tcp.stream == 2
```

### Combining Filters

```text
http && ip.addr == 192.168.1.5
dns || http
!icmp
tcp.port == 80 && ip.src == 192.168.1.10
```

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Ctrl + /** | Focus the display filter bar |
| **Ctrl + F** | Find Packet |
| **Ctrl + Shift + F** | Find Next |
| **Ctrl + M** | Mark / Unmark Packet |
| **Ctrl + G** | Go To Packet |

---

## Interview Questions

**Q1. What is Wireshark?**
A GUI-based network protocol analyzer used to capture, decode, and analyze packets travelling across a network.

**Q2. What is a PCAP file?**
A file, usually with a `.pcap` or `.pcapng` extension, that stores captured network packets so they can be analyzed later.

**Q3. What is the difference between the Packet List and Packet Details panes?**
The Packet List pane shows a one-line summary of every captured packet, while the Packet Details pane decodes the selected packet into its protocol layers.

**Q4. What is packet dissection?**
Breaking a single packet into its protocol layers, such as Ethernet, IPv4, TCP, and HTTP, so each layer's fields can be read individually.

**Q5. What is the difference between a capture filter and a display filter?**
A capture filter decides which packets are recorded to the PCAP and runs before capture, while a display filter only changes which captured packets are shown and runs afterward without deleting anything.

**Q6. Why use Follow Stream?**
It reconstructs an entire application-layer conversation into readable text, so an analyst can read requests, responses, credentials, and commands instead of piecing together individual packets.

**Q7. What does Export Objects do?**
It recovers the actual files transferred over supported protocols such as HTTP, SMB, and TFTP, which is valuable for extracting downloaded malware for further analysis.

**Q8. What is Expert Information?**
A Wireshark feature that automatically detects and highlights abnormal events, grouped by severity as Chat, Note, Warning, and Error.

**Q9. What is the difference between marking a packet and commenting on a packet?**
Marking only highlights a packet visually, while a comment stores a written note directly inside the capture file so it is preserved when shared.

**Q10. Which filter shows all packets involving a specific IP address?**
`ip.addr == 192.168.1.10`, which matches packets where either the source or the destination is that address.

---

## Final Takeaway

Wireshark turns invisible network traffic into evidence you can read. It captures packets into PCAP files, presents them across the Packet List, Packet Details, and Packet Bytes panes, and dissects each packet through its protocol layers from Ethernet up to HTTP. Once a capture is open, display filters cut the noise, Apply as Filter and conversation filters isolate a single exchange, and Follow Stream reconstructs whole conversations, while Export Objects recovers transferred files and Expert Information flags anomalies automatically. Because it analyzes rather than blocks traffic, Wireshark is not a defensive control, but its ability to show exactly what happened on the wire makes it a foundational tool for troubleshooting, malware analysis, digital forensics, and incident response.
