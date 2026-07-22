| Field | Detail |
|------|--------|
| **Platform** | TryHackMe |
| **Category** | Networking / Tcpdump |
| **Difficulty** | Beginner |
| **Time** | ~35 Minutes |
| **Module** | Networking |

---

## Objective

This room introduces **Tcpdump**, the command-line packet capture tool used to record, filter, and inspect network traffic directly from the terminal. It builds the foundation needed before moving on to graphical tools like Wireshark and Tshark.

By the end of this room you will be able to:

- Explain what Tcpdump is and how it relies on the **libpcap** library
- Understand the basic syntax and why capturing requires `sudo`
- Capture, save, read, and limit packets on a chosen interface
- Filter traffic by host, source, destination, port, and protocol
- Combine filters using the logical operators `and`, `or`, and `not`
- Apply advanced filtering with packet length, header bytes, and TCP flags
- Display packets in quick, link-layer, ASCII, hexadecimal, and combined formats

---

## Task 1 — Introduction to Tcpdump

**Tcpdump** is a command-line packet capture and analysis tool. It listens on a network interface, records the packets that pass through it, and then displays or saves them for later study.

```text
   Network Traffic
        │
        ▼
   Tcpdump captures
        │
        ▼
 Displays / Saves Packets
```

Tcpdump is widely used across security and networking roles:

- SOC Analysts
- Network Engineers
- Penetration Testers
- Incident Responders
- Malware Analysts

### Why Use Tcpdump?

It helps you capture network traffic, save packets to disk, read them back later, filter down to only the traffic you care about, investigate attacks, and troubleshoot network problems.

### Tcpdump and libpcap

Tcpdump relies on the **libpcap** library to perform the actual packet capture. The tool sits above libpcap, which in turn talks to the network interface.

```text
Application
      │
      ▼
 Tcpdump
      │
      ▼
 libpcap
      │
      ▼
 Network Interface
```

On Windows, the equivalent capture libraries are **WinPcap** and **Npcap**.

> **Note:** Because Tcpdump is built on libpcap, the same capture and filter concepts carry over to other libpcap-based tools such as Wireshark and Tshark.

### Basic Syntax

The general form of a Tcpdump command is:

```bash
tcpdump [options]
```

A minimal capture looks like this:

```bash
sudo tcpdump
```

### Why sudo?

Packet capturing requires **raw socket access**, which normal users usually do not have. Running with elevated privileges lets Tcpdump read traffic straight off the interface:

```bash
sudo tcpdump
```

> **Security relevance:** Raw packet capture can expose sensitive data in transit, so it is a privileged operation. Only run captures on systems and networks you are authorized to monitor.

---

## Task 2 — Basic Packet Capture

### Select Network Interface

First, list the available interfaces so you know where to capture:

```bash
ip address show
```

Or the shorter form:

```bash
ip a
```

A typical interface list might include:

```text
lo
ens5
eth0
wlan0
```

Capture on a specific interface:

```bash
sudo tcpdump -i ens5
```

Capture on every interface at once:

```bash
sudo tcpdump -i any
```

### Save Packets

Instead of printing packets to the screen, save them to a file for later analysis:

```bash
sudo tcpdump -w capture.pcap
```

This produces a capture file:

```text
capture.pcap
```

The saved `.pcap` file can later be opened with Wireshark, Tcpdump, or Tshark.

### Read a Saved Capture

Read packets back from a saved file:

```bash
tcpdump -r capture.pcap
```

Reading saved captures is useful when investigating malware, reviewing attacks, or performing offline packet analysis.

### Capture a Limited Number of Packets

Without a limit, Tcpdump runs forever. Use `-c` to stop after a set number of packets:

```bash
tcpdump -c 20
```

This captures only:

```text
20 packets
```

### Numeric Output

By default Tcpdump resolves addresses to names, showing something like `google.com` instead of the raw IP. Disable hostname resolution with `-n`:

```bash
tcpdump -n
```

Use `-nn` to disable both DNS and port-name resolution:

```bash
tcpdump -nn
```

For example, instead of the service name `http` you will see the numeric port `80`.

### Verbose Output

Increase the amount of detail printed for each packet with additional `v` characters:

| **Option** | Meaning |
|------------|---------|
| **-v** | Verbose output |
| **-vv** | More verbose |
| **-vvv** | Maximum verbosity |

Verbose modes reveal details such as TTL, packet length, IP identification, TCP options, and flags.

### Basic Capture Cheat Sheet

| Command | Purpose |
|---------|---------|
| `tcpdump -i eth0` | Capture on a specific interface |
| `tcpdump -i any` | Capture on all interfaces |
| `tcpdump -w file.pcap` | Save packets to a file |
| `tcpdump -r file.pcap` | Read packets from a file |
| `tcpdump -c 50` | Capture only 50 packets |
| `tcpdump -n` | Numeric IP output |
| `tcpdump -nn` | Numeric IP and port output |
| `tcpdump -v` | Verbose output |

---

## Task 3 — Filtering Expressions

Without a filter, Tcpdump captures everything on the interface. With a filter, it captures only the packets you actually need, which makes analysis far more manageable.

### Filter by Host

Capture all packets involving a given host, by name or IP:

```bash
tcpdump host example.com
tcpdump host 192.168.1.5
```

### Source Host

Capture only packets coming **from** a host:

```bash
tcpdump src host 192.168.1.10
```

### Destination Host

Capture only packets going **to** a host:

```bash
tcpdump dst host 192.168.1.20
```

### Filter by Port

Capture traffic on a specific port, such as HTTP, DNS, or HTTPS:

```bash
tcpdump port 80
tcpdump port 53
tcpdump port 443
```

You can also restrict to a source or destination port:

```bash
tcpdump src port 22
tcpdump dst port 80
```

### Filter by Protocol

Capture only packets of a chosen protocol:

```bash
tcpdump tcp
tcpdump udp
tcpdump icmp
tcpdump ip6
tcpdump arp
```

### Logical Operators

Combine conditions using `and`, `or`, and `not`:

```bash
tcpdump tcp and port 80
tcpdump tcp or udp
tcpdump not tcp
```

| **Operator** | Meaning |
|--------------|---------|
| **and** | Both conditions must match |
| **or** | Either condition may match |
| **not** | Exclude matching packets (for example, all packets except TCP) |

### Combine Filters

Filters can be chained to target very specific traffic:

```bash
tcpdump host example.com and tcp port 443
```

This example captures HTTPS traffic to and from `example.com` only.

---

## Task 4 — Advanced Filtering

Sometimes millions of packets exist and basic filters are not precise enough. Advanced filtering lets you match on packet size and specific header bytes.

### Packet Length

Filter packets by size using `greater` and `less`:

```bash
tcpdump greater 500
tcpdump less 100
tcpdump greater 1500
```

### Binary Operations

Advanced filters use three bitwise operators:

| **Operator** | Meaning |
|--------------|---------|
| **&** | Bitwise AND |
| **\|** | Bitwise OR |
| **!** | Bitwise NOT |

The AND and OR operators combine bits, while NOT inverts them:

```text
AND
1 & 1 = 1
1 & 0 = 0

OR
1 | 0 = 1
0 | 0 = 0

NOT
!1 = 0
!0 = 1
```

### Header Bytes

You can inspect specific bytes inside a protocol header using the `proto[offset:size]` syntax:

```bash
tcpdump "proto[offset:size]"
```

For example, `tcp[13]` refers to the TCP flags byte located at offset 13.

### TCP Flags

TCP flags describe the state of a connection:

| **Flag** | Meaning |
|----------|---------|
| **SYN** | Start connection |
| **ACK** | Acknowledgement |
| **FIN** | Finish connection |
| **RST** | Reset connection |
| **PSH** | Push buffered data |

Capture only packets where the SYN flag is exactly set:

```bash
tcpdump "tcp[tcpflags] == tcp-syn"
```

Capture packets that have the SYN flag set (among others):

```bash
tcpdump "tcp[tcpflags] & tcp-syn != 0"
```

Capture packets with either SYN or ACK set:

```bash
tcpdump "tcp[tcpflags] & (tcp-syn|tcp-ack) != 0"
```

> **Security relevance:** Filtering on TCP flags helps detect port scans, observe the TCP handshake, spot reconnaissance activity, and identify network attacks.

---

## Task 5 — Displaying Packets

Tcpdump can present captured packets in several formats depending on what you need to see.

### Quick Output

Show a short, compact summary of each packet for fast analysis:

```bash
tcpdump -q
```

### Link-Layer Header

Show the link-layer (Ethernet) header, including MAC addresses:

```bash
tcpdump -e
```

This reveals details such as the source and destination MAC address, for example `AA:BB:CC:DD:EE:FF`.

### ASCII Output

Display packet payloads as readable text, which is handy for plaintext protocols like HTTP, FTP, SMTP, and Telnet:

```bash
tcpdump -A
```

An HTTP request in ASCII output might look like:

```text
GET /index.html
Host: example.com
```

### Hexadecimal Output

Display the raw packet bytes in hex, useful for studying packet structure and binary analysis:

```bash
tcpdump -xx
```

```text
00 ff 1a bc 20 ...
```

### Hex and ASCII

Show hexadecimal and ASCII side by side. This is often the best option during investigations because it combines byte-level detail with readable text:

```bash
tcpdump -X
```

### Display Cheat Sheet

| **Option** | Meaning |
|------------|---------|
| **-q** | Quick, short output |
| **-e** | Show link-layer / MAC header |
| **-A** | ASCII payload |
| **-xx** | Hexadecimal bytes |
| **-X** | Hex and ASCII together |

---

## Task 6 — Common Commands and Real-World Usage

### Common Tcpdump Commands

Capture on a specific interface or all interfaces:

```bash
sudo tcpdump -i eth0
sudo tcpdump -i any
```

Capture common services and protocols:

```bash
tcpdump port 80
tcpdump port 53
tcpdump port 443
tcpdump icmp
tcpdump tcp
```

Save, read, limit, and format output:

```bash
tcpdump -w packets.pcap
tcpdump -r packets.pcap
tcpdump -c 100
tcpdump -nn
tcpdump -vv
```

### Real-World Usage

| Role | How Tcpdump Is Used |
|------|---------------------|
| **SOC** | Find malicious connections |
| **Blue Team** | Investigate attacks |
| **Pentester** | Verify scans |
| **Network Engineer** | Troubleshoot latency |
| **Malware Analyst** | Observe C2 traffic |

> **Tip:** Combining a saved capture (`-w`) with numeric output (`-nn`) gives you a clean, resolvable record that you can revisit and re-filter offline without depending on live DNS.

---

## Quick Revision

| Area | Key points |
|------|-----------|
| **What it is** | Command-line packet capture tool built on **libpcap**. |
| **Capture** | `-i` interface, `-w` save, `-r` read, `-c` count. |
| **Output control** | `-n`/`-nn` numeric, `-v`/`-vv`/`-vvv` verbose. |
| **Filters** | `host`, `src`, `dst`, `port`, protocols, and `and`/`or`/`not`. |
| **Advanced** | `greater`/`less`, `proto[offset:size]`, TCP flags, binary ops. |
| **Display** | `-q` quick, `-e` MAC, `-A` ASCII, `-xx` hex, `-X` hex+ASCII. |

**Key idea:** Tcpdump captures raw traffic from an interface and lets you narrow it down with filters and present it in whatever format the investigation needs, making it the foundation of packet analysis.

---

## 30-Second Revision

- Tcpdump is a command-line packet capture tool that uses the **libpcap** library and needs `sudo` for raw socket access.
- Use `-i` to choose an interface, `-w` to save, `-r` to read, and `-c` to limit the number of packets.
- `-n` disables hostname resolution and `-nn` also disables port-name resolution; `-v`/`-vv`/`-vvv` add detail.
- Filter with `host`, `src host`, `dst host`, `port`, `src port`, `dst port`, and protocols like `tcp`, `udp`, `icmp`, `ip6`, `arp`.
- Combine filters with `and`, `or`, and `not`, for example `host example.com and tcp port 443`.
- Go deeper with `greater`/`less`, header bytes via `proto[offset:size]`, and TCP flag filters to spot scans and handshakes.
- Display packets with `-q`, `-e`, `-A`, `-xx`, and `-X` depending on the level of detail you need.

---

## Cheat Sheet

| Command / Syntax | Purpose |
|------------------|---------|
| `sudo tcpdump -i eth0` | Capture on a specific interface. |
| `sudo tcpdump -i any` | Capture on all interfaces. |
| `tcpdump -w file.pcap` | Save captured packets to a file. |
| `tcpdump -r file.pcap` | Read packets from a saved file. |
| `tcpdump -c 20` | Capture only 20 packets. |
| `tcpdump -n` | Disable hostname resolution. |
| `tcpdump -nn` | Disable hostname and port-name resolution. |
| `tcpdump -v` / `-vv` / `-vvv` | Increase verbosity. |
| `tcpdump host example.com` | Capture traffic involving a host. |
| `tcpdump src host 192.168.1.10` | Capture traffic from a source host. |
| `tcpdump dst host 192.168.1.20` | Capture traffic to a destination host. |
| `tcpdump port 80` | Capture traffic on a specific port. |
| `tcpdump src port 22` | Capture traffic from a source port. |
| `tcpdump dst port 80` | Capture traffic to a destination port. |
| `tcpdump tcp` / `udp` / `icmp` / `ip6` / `arp` | Filter by protocol. |
| `tcpdump greater 1500` | Capture packets larger than a size. |
| `tcpdump less 100` | Capture packets smaller than a size. |
| `tcpdump "tcp[tcpflags] == tcp-syn"` | Capture only SYN packets. |
| `tcpdump -q` / `-e` / `-A` / `-xx` / `-X` | Control display format. |

### Filter Expressions

| Expression | Matches |
|------------|---------|
| `host <ip/name>` | Packets to or from a host. |
| `src host <ip>` | Packets from a source host. |
| `dst host <ip>` | Packets to a destination host. |
| `port <n>` | Packets on a given port. |
| `src port <n>` / `dst port <n>` | Packets from / to a given port. |
| `tcp` / `udp` / `icmp` / `ip6` / `arp` | Packets of a given protocol. |
| `A and B` | Both conditions true. |
| `A or B` | Either condition true. |
| `not A` | Exclude matching packets. |
| `proto[offset:size]` | Match specific header bytes. |

---

## Interview Questions

**Q1. What is Tcpdump?**
Tcpdump is a command-line packet capture and analysis tool used to record and inspect network traffic directly from the terminal.

**Q2. Which library does Tcpdump use?**
It uses the **libpcap** library to capture packets (the equivalent on Windows is WinPcap or Npcap).

**Q3. How do you save and read packets?**
Use `-w` to write packets to a `.pcap` file and `-r` to read them back later, for example `tcpdump -w capture.pcap` and `tcpdump -r capture.pcap`.

**Q4. How do you capture only a limited number of packets?**
Use the `-c` option followed by a count, such as `tcpdump -c 20`, which stops after 20 packets.

**Q5. What do `-n` and `-e` do?**
`-n` disables hostname resolution so addresses stay numeric, while `-e` displays the link-layer header, including MAC addresses.

**Q6. Which options control how packet contents are displayed?**
`-A` shows ASCII payloads, `-xx` shows hexadecimal bytes, and `-X` shows hex and ASCII together for the most detail.

**Q7. How would you capture only TCP or only ICMP traffic?**
Run `tcpdump tcp` to capture TCP traffic and `tcpdump icmp` to capture ICMP traffic.

**Q8. Why is filtering on TCP flags useful?**
Matching flags such as SYN and ACK helps detect port scans, observe the TCP handshake, and identify reconnaissance or attacks.

---

## Final Takeaway

**Tcpdump** turns any network interface into a searchable stream of packets, all from the command line. Starting with basic captures and the `-i`, `-w`, `-r`, and `-c` options, it grows into a precise investigative tool through host, port, and **protocol filters**, **logical operators**, and advanced matching on packet length, header bytes, and **TCP flags**. Combined with flexible display modes like ASCII, hex, and hex-plus-ASCII, Tcpdump gives SOC analysts, blue teamers, pentesters, and network engineers a fast, scriptable way to capture and understand traffic, and it lays the groundwork for deeper analysis in **Wireshark** and **Tshark**.
