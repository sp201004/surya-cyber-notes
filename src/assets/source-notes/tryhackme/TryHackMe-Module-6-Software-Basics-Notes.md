# 📘 TryHackMe — Module 6: Software Basics

> 🗂️ **Rooms:** 🧮 Data Representation • 🔣 Data Encoding • 🐍 Python: Simple Demo • ⚡ JavaScript: Simple Demo • 🗄️ Database SQL Basics • 🎁 Mystery Chest

---

# Room 1 — Data Representation 🧮

## Overview

Computers cannot understand human languages, words, images, colors, or numbers directly.

Everything inside a computer is ultimately represented using only two states:

```
0
1
```

These two values form the Binary Number System, which is the foundation of all modern computing.

Every image, document, executable file, video, password, network packet, and even an operating system is stored as binary data.

Understanding how computers represent information is one of the most important concepts in Cybersecurity because security professionals constantly analyze binary and hexadecimal data.

Examples include:

- Memory Dumps
- Network Packets
- Malware Files
- Password Hashes
- Hex Editors
- File Signatures
- Digital Forensics

---

## Learning Objectives

After completing this room you should understand:

✔ Binary Numbers

✔ Decimal Numbers

✔ Hexadecimal Numbers

✔ Octal Numbers

✔ Bits

✔ Bytes

✔ Nibbles

✔ RGB Color Representation

✔ Binary Conversion

✔ Hexadecimal Conversion

✔ Why Cybersecurity professionals prefer Hexadecimal

---

## What is Data Representation?

Data Representation is the process of storing and representing information inside a computer using binary digits.

Humans understand:

```
Letters
Numbers
Images
Videos
Audio
Colors
```

Computers understand only:

```
0
1
```

Everything must eventually become binary.

Example

```
Character

A

↓

ASCII

65

↓

Binary

01000001
```

---

## Why Computers Use Binary

Electronic devices are built using billions of tiny switches called Transistors.

A transistor has only two stable states.

```
ON
OFF
```

or

```
HIGH Voltage
LOW Voltage
```

These become

```
ON  → 1

OFF → 0
```

ASCII Diagram

```
Switch

OFF ------------> 0

ON -------------> 1
```

Modern CPUs contain billions of these switches.

Everything is processed using combinations of these binary states.

---

## Real World Example

Imagine a light bulb.

```
Bulb ON

1
```

```
Bulb OFF

0
```

Now imagine three bulbs.

```
Red

Green

Blue
```

Each bulb has two states.

```
ON

OFF
```

Possible combinations

```
000

001

010

011

100

101

110

111
```

Total combinations

```
2 × 2 × 2 = 8
```

This is exactly how the first computer color systems worked.

---

## Number Systems

Humans normally use

```
Decimal
```

Computers use

```
Binary
```

Programmers frequently use

```
Hexadecimal
```

Older systems sometimes use

```
Octal
```

Comparison

| Number System | Base | Symbols |
|--------------|------|----------|
| Binary | 2 | 0 1 |
| Octal | 8 | 0–7 |
| Decimal | 10 | 0–9 |
| Hexadecimal | 16 | 0–9 A–F |

---

## Understanding Bases

The Base of a number system tells us how many unique symbols it contains.

Example

Decimal

```
0
1
2
3
4
5
6
7
8
9
```

After 9

```
10
```

Binary

Only

```
0

1
```

After

```
1
```

comes

```
10
```

Hexadecimal

```
0

1

...

9

A

B

C

D

E

F
```

After F

```
10
```

---

## Decimal Number System

Humans naturally use Base-10.

Example

```
572
```

Actually means

```
5 × 10²

+

7 × 10¹

+

2 × 10⁰
```

Expanded

```
500

+

70

+

2
```

ASCII Diagram

```
572

│ │ │

│ │ └── 2 × 10⁰

│ └──── 7 × 10¹

└────── 5 × 10²
```

---

## Binary Number System

Binary contains only

```
0

1
```

Each position represents a power of two.

Example

```
1011
```

```
1 × 2³

+

0 × 2²

+

1 × 2¹

+

1 × 2⁰
```

```
8

+

0

+

2

+

1

=

11
```

Position Table

| Bit | Value |
|------|------:|
| 2⁷ |128|
|2⁶|64|
|2⁵|32|
|2⁴|16|
|2³|8|
|2²|4|
|2¹|2|
|2⁰|1|

Memory Trick

```
128

64

32

16

8

4

2

1
```

Remember this sequence forever.

Every binary conversion becomes easy.

---

## What is a Bit?

Bit

=

Binary Digit

Possible values

```
0

1
```

One Bit stores only

```
Two States
```

Examples

```
True

False
```

```
Yes

No
```

```
ON

OFF
```

---

## What is a Nibble?

```
4 Bits

=

1 Nibble
```

Example

```
1010
```

Nibble is important because

```
One Hexadecimal Digit

=

One Nibble
```

---

## What is a Byte?

```
8 Bits

=

1 Byte
```

Example

```
10101010
```

One Byte stores

```
256

Possible Values
```

Because

```
2⁸

=

256
```

---

## Storage Units

| Unit | Size |
|------|------|
|1 Bit|0 or 1|
|1 Nibble|4 Bits|
|1 Byte|8 Bits|
|1 KB|1024 Bytes|
|1 MB|1024 KB|
|1 GB|1024 MB|
|1 TB|1024 GB|

---

## Binary Counting

Decimal

```
0

1

2

3

4

5
```

Binary

```
000

001

010

011

100

101

110

111
```

Notice

Every digit doubles the possible combinations.

```
1 Bit

2 values

2 Bits

4 values

3 Bits

8 values

4 Bits

16 values

8 Bits

256 values
```

Formula

```
2ⁿ
```

Where

```
n

=

Number of Bits
```

---

## Why Binary Matters in Cybersecurity

Binary appears everywhere.

Examples

✔ Packet Analysis

✔ Malware Analysis

✔ Reverse Engineering

✔ Digital Forensics

✔ Memory Dumps

✔ File Recovery

✔ Disk Analysis

✔ Password Hashes

✔ CPU Instructions

✔ Network Protocols

Example

Wireshark captures packets in Hexadecimal, but internally those bytes are binary.

Hex Editors display binary files using hexadecimal because binary is too long for humans to read.

---

## Representing Colors

Computers do not understand colors like humans do.

Instead, every color is created by combining three primary colors:

```
Red (R)
Green (G)
Blue (B)
```

This is known as the **RGB Color Model**.

Every color displayed on your monitor, phone, or TV is generated using different intensities of these three colors.

---

## RGB Color Model

ASCII Diagram

```
          RED
           ▲
          / \
         /   \
        /     \
 BLUE -------- GREEN
```

Each primary color has its own intensity value.

```
Red   : 0 - 255
Green : 0 - 255
Blue  : 0 - 255
```

Example

```
RGB(255,0,0)
```

Produces

```
Pure Red
```

---

## Why 255?

Each color channel uses **8 bits**.

```
8 Bits

↓

2⁸

↓

256 Values

↓

0 - 255
```

So every RGB component can store

```
256 different intensity levels.
```

---

## Example RGB Values

| Color | RGB |
|--------|----------------|
| Black | (0,0,0) |
| White | (255,255,255) |
| Red | (255,0,0) |
| Green | (0,255,0) |
| Blue | (0,0,255) |
| Yellow | (255,255,0) |
| Cyan | (0,255,255) |
| Magenta | (255,0,255) |

---

## Representing Only 8 Colors

Suppose each color only has

```
1 Bit
```

Possible values

```
0

or

1
```

Meaning

```
OFF

ON
```

Available combinations

```
000

001

010

011

100

101

110

111
```

Total

```
2³ = 8 Colors
```

---

## Color Table

| Binary | Color |
|---------|----------------|
|000|Black|
|001|Blue|
|010|Green|
|011|Cyan|
|100|Red|
|101|Magenta|
|110|Yellow|
|111|White|

ASCII Diagram

```
Red Green Blue

0     0     0

↓

Black


1     1     1

↓

White
```

---

## Modern Displays

Modern monitors don't use only

```
1 Bit
```

They use

```
8 Bits

per color.
```

Therefore

```
Red

↓

256 Levels

Green

↓

256 Levels

Blue

↓

256 Levels
```

Total colors

```
256 × 256 × 256

=

16,777,216

Colors
```

This is called

```
24-bit Color
```

because

```
8 + 8 + 8 = 24 Bits
```

---

## 24-bit Color Layout

```
+--------+--------+--------+

 Red       Green      Blue

8 Bits    8 Bits     8 Bits

+--------+--------+--------+
```

Each pixel occupies

```
24 Bits

=

3 Bytes
```

---

## Binary Representation

Suppose

```
Red

=

255

↓

11111111
```

Green

```
128

↓

10000000
```

Blue

```
64

↓

01000000
```

Entire color

```
11111111

10000000

01000000
```

---

## What is Hexadecimal?

Hexadecimal is a Base-16 Number System.

Instead of

```
10 Digits
```

it uses

```
16 Symbols
```

```
0

1

2

3

4

5

6

7

8

9

A

B

C

D

E

F
```

Where

```
A = 10

B = 11

C = 12

D = 13

E = 14

F = 15
```

---

## Why Programmers Love Hex

Imagine one byte.

Binary

```
11111111
```

Looks long.

Hexadecimal

```
FF
```

Much shorter.

Comparison

| Binary | Hex |
|---------|-----|
|0000|0|
|0001|1|
|0010|2|
|0011|3|
|0100|4|
|0101|5|
|0110|6|
|0111|7|
|1000|8|
|1001|9|
|1010|A|
|1011|B|
|1100|C|
|1101|D|
|1110|E|
|1111|F|

Memory Trick

```
4 Bits

↓

1 Hex Digit
```

Always remember this.

---

## Hexadecimal Color Codes

Web developers usually write RGB colors as

```
#RRGGBB
```

Example

```
#FF0000
```

Meaning

```
FF

↓

Red

00

↓

Green

00

↓

Blue
```

Result

```
Pure Red
```

---

## More Examples

White

```
#FFFFFF
```

Black

```
#000000
```

Green

```
#00FF00
```

Blue

```
#0000FF
```

Yellow

```
#FFFF00
```

Purple

```
#FF00FF
```

Cyan

```
#00FFFF
```

---

## Binary → Hex Conversion

Example

```
11001010
```

Split into groups of four bits.

```
1100

1010
```

Convert individually.

```
1100

↓

C

1010

↓

A
```

Answer

```
CA
```

ASCII Diagram

```
11001010

↓

1100 1010

↓

 C     A

↓

CA
```

---

## Hex → Binary

Example

```
3F
```

Convert each digit separately.

```
3

↓

0011

F

↓

1111
```

Answer

```
00111111
```

---

## Where is Hex Used?

Cybersecurity professionals use Hexadecimal almost every day.

Examples

✔ Wireshark

✔ Hex Editors

✔ Reverse Engineering

✔ Malware Analysis

✔ Digital Forensics

✔ Packet Analysis

✔ Memory Dumps

✔ File Recovery

✔ File Signatures

---

## Example

PNG files always begin with

```
89 50 4E 47
```

JPEG files begin with

```
FF D8 FF
```

PDF files begin with

```
25 50 44 46
```

These are called

```
Magic Numbers

or

File Signatures
```

Analysts use these signatures to identify unknown files.

---

## Number Systems in Detail

In the previous sections, we learned that computers internally store everything in Binary, while humans naturally use Decimal.

As a cybersecurity professional, you should be comfortable converting between:

✔ Decimal ↔ Binary

✔ Binary ↔ Decimal

✔ Binary ↔ Hexadecimal

✔ Hexadecimal ↔ Decimal

✔ Binary ↔ Octal

These conversions are frequently encountered while analyzing:

- Network Packets
- Memory Dumps
- Malware
- Shellcode
- Machine Instructions
- File Signatures
- Cryptographic Data

---

## Binary Place Values

Every binary digit (bit) represents a power of 2.

```
Bit Position

128   64   32   16    8    4    2    1
 │     │    │    │    │    │    │    │
 2⁷   2⁶   2⁵   2⁴   2³   2²   2¹   2⁰
```

Always memorize this table.

Memory Trick

```
128

64

32

16

8

4

2

1
```

If you remember these eight values, most binary conversions become very easy.

---

## Decimal → Binary

The easiest method is repeated division by 2.

Example

Convert

```
13
```

Divide repeatedly

```
13 ÷ 2 = 6  remainder 1

6 ÷ 2 = 3   remainder 0

3 ÷ 2 = 1   remainder 1

1 ÷ 2 = 0   remainder 1
```

Now read remainders from bottom to top.

```
1101
```

Answer

```
13₁₀ = 1101₂
```

---

## Another Example

Convert

```
25
```

```
25 ÷2 =12 remainder1

12 ÷2 =6 remainder0

6 ÷2 =3 remainder0

3 ÷2 =1 remainder1

1 ÷2 =0 remainder1
```

Read upwards

```
11001
```

Answer

```
25 = 11001₂
```

---

## Binary → Decimal

Multiply every bit with its corresponding power of two.

Example

```
1101
```

```
1×8

+

1×4

+

0×2

+

1×1
```

```
8

+

4

+

0

+

1

=

13
```

Answer

```
1101₂ =13₁₀
```

---

## Example

Convert

```
101101
```

```
32 +0+8+4+0+1

=

45
```

Answer

```
101101₂ =45₁₀
```

---

## Shortcut Method

Write the powers of two.

```
32

16

8

4

2

1
```

Binary

```
1

0

1

1

0

1
```

Multiply

```
32

+

8

+

4

+

1

=

45
```

Very useful during interviews.

---

## Binary ↔ Hexadecimal

Instead of converting the whole binary number, split it into groups of four bits.

Example

```
11101010
```

Split

```
1110

1010
```

Convert individually.

```
1110

↓

E

1010

↓

A
```

Answer

```
EA
```

---

## Another Example

```
10111100
```

Split

```
1011

1100
```

```
1011=B

1100=C
```

Answer

```
BC
```

---

## Hexadecimal → Binary

Each hexadecimal digit always represents four bits.

Example

```
A
```

↓

```
1010
```

Example

```
F
```

↓

```
1111
```

Example

```
2A
```

↓

```
0010

1010
```

↓

```
00101010
```

---

## Decimal → Hexadecimal

Divide repeatedly by 16.

Example

Convert

```
255
```

```
255÷16=15 remainder15
```

```
15

↓

F
```

Remainder

```
15

↓

F
```

Answer

```
FF
```

---

## Example

Convert

```
26
```

```
26÷16=1 remainder10
```

```
10=A
```

Answer

```
1A
```

---

## Hexadecimal → Decimal

Example

```
2F
```

```
2×16

+

15

=

47
```

Answer

```
2F₁₆=47₁₀
```

---

## Octal Number System

Octal uses Base-8.

Digits

```
0

1

2

3

4

5

6

7
```

After

```
7
```

comes

```
10
```

---

## Why Octal Exists

Older computer systems grouped binary digits into sets of three bits.

```
3 Bits

↓

One Octal Digit
```

Today Octal is less common but still appears in:

- Linux File Permissions
- UNIX Systems
- Embedded Devices

Example

```
755
```

Linux Permissions

```
rwxr-xr-x
```

---

## Binary ↔ Octal

Split binary into groups of three.

Example

```
110101
```

↓

```
110

101
```

↓

```
6

5
```

Answer

```
65₈
```

---

## Practice Questions

Convert to Binary

```
15

31

42

100
```

Convert to Decimal

```
10010

11111

101010
```

Convert to Hex

```
11111111

10101010

11001100
```

Answers

```
15=1111

31=11111

42=101010

100=1100100
```

```
10010=18

11111=31

101010=42
```

```
11111111=FF

10101010=AA

11001100=CC
```

---

## Cybersecurity Applications

### 1. Packet Analysis

Wireshark displays packet bytes as hexadecimal.

Example

```
45 00 00 54
```

Each pair represents one byte.

---

### 2. Memory Dumps

Memory analysis tools display RAM contents in hexadecimal because binary would be too long.

---

### 3. Hex Editors

Programs like

```
HxD

Hex Fiend

Bless
```

allow investigators to inspect files byte-by-byte.

---

### 4. Reverse Engineering

Machine instructions are usually represented in hexadecimal.

Example

```
90

90

C3
```

---

### 5. File Signatures

Examples

PNG

```
89 50 4E 47
```

JPEG

```
FF D8 FF
```

GIF

```
47 49 46 38
```

PDF

```
25 50 44 46
```

ZIP

```
50 4B 03 04
```

---

## Best Practices

Following good practices while working with data representation helps reduce errors and improves efficiency during cybersecurity investigations.

✔ Learn Binary before Hexadecimal.

✔ Memorize powers of two.

✔ Remember:

```
1 Hex Digit = 4 Bits
```

✔ Practice manual conversions regularly.

✔ Verify conversions using calculators after solving manually.

✔ Understand the concept instead of memorizing answers.

✔ Learn common hexadecimal values.

✔ Learn common file signatures.

✔ Practice reading hexadecimal dumps.

✔ Understand RGB color representation.

✔ Learn storage units from Bit to Terabyte.

✔ Practice using Hex Editors.

---

## Real-World Cybersecurity Relevance

Understanding data representation is essential because security professionals constantly encounter binary and hexadecimal values.

---

### Digital Forensics

Investigators examine:

- Deleted files
- Disk images
- Memory dumps
- USB drives
- Hard disks

Most forensic tools display raw data in hexadecimal.

Example

```
00000000

89 50 4E 47
```

Immediately tells us

```
PNG Image
```

---

### Malware Analysis

Malware analysts inspect

- Executables
- DLL files
- Shellcode
- Memory

Most assembly instructions are represented in hexadecimal.

Example

```
90
90
90
CC
```

---

### Network Analysis

Wireshark displays packets like

```
45 00 00 54
```

Instead of

```
0100010100000000...
```

Hexadecimal makes packet analysis much easier.

---

### Reverse Engineering

CPU instructions are stored in binary.

Disassemblers convert them into hexadecimal and assembly language.

Example

```
55

48 89 E5

5D

C3
```

---

### Cryptography

Hashes are normally displayed in hexadecimal.

Example

MD5

```
5d41402abc4b2a76b9719d911017c592
```

SHA-256

```
9f86d081884c7d659a2feaa0...
```

---

### Web Development

Colors are usually written using hexadecimal.

Example

```
#FFFFFF
```

↓

White

```
#000000
```

↓

Black

```
#4285F4
```

↓

Google Blue

---

## Important Commands

Although this room is mostly theoretical, these commands are useful.

---

### Binary Calculator (Linux)

```bash
bc
```

Purpose

Perform calculations.

---

### Hex Dump

```bash
xxd file
```

Purpose

Displays hexadecimal representation of a file.

Example

```bash
xxd image.png
```

---

### Strings

```bash
strings file
```

Purpose

Extract readable text from binary files.

---

### File Type

```bash
file filename
```

Purpose

Identifies file type using magic numbers.

Example

```bash
file image.png
```

Output

```
PNG image data
```

---

### Hexdump

```bash
hexdump -C file
```

Purpose

Displays hexadecimal and ASCII side-by-side.

Example

```bash
hexdump -C malware.exe
```

---

## Common Hexadecimal Values

| Decimal | Hex | Binary |
|----------|-----|---------|
|0|00|00000000|
|1|01|00000001|
|10|0A|00001010|
|15|0F|00001111|
|16|10|00010000|
|32|20|00100000|
|64|40|01000000|
|127|7F|01111111|
|128|80|10000000|
|255|FF|11111111|

---

## Common File Signatures

| File Type | Hex Signature |
|------------|----------------|
|PNG|89 50 4E 47|
|JPEG|FF D8 FF|
|GIF|47 49 46 38|
|PDF|25 50 44 46|
|ZIP|50 4B 03 04|
|RAR|52 61 72 21|
|ELF|7F 45 4C 46|
|Windows EXE|4D 5A|

Memory Trick

```
MZ

↓

Windows Executable

ELF

↓

Linux Executable

PK

↓

ZIP Archive
```

---

## 🧠 Memory Tricks

```
1 Bit

↓

2 Values
```

```
4 Bits

↓

1 Nibble
```

```
8 Bits

↓

1 Byte
```

```
16 Hex Digits

↓

0-9 A-F
```

Remember

```
Every Hex Digit

=

4 Bits
```

This shortcut alone saves a lot of time.

---

## ❌ Common Mistakes

❌ Reading binary left to right without considering place values.

❌ Forgetting that Hex is Base-16.

❌ Forgetting that one Hex digit equals four bits.

❌ Reading binary remainders from top instead of bottom during conversion.

❌ Assuming 1 KB =1000 Bytes.

Technically

```
1 KB

=

1024 Bytes
```

---

## Complete Cheat Sheet

### Binary

```
Base 2

Digits

0

1
```

---

### Decimal

```
Base 10

Digits

0-9
```

---

### Hexadecimal

```
Base 16

Digits

0-9

A-F
```

---

### Octal

```
Base 8

Digits

0-7
```

---

### Storage Units

```
1 Bit

↓

2 Values
```

```
4 Bits

↓

1 Nibble
```

```
8 Bits

↓

1 Byte
```

```
1024 Bytes

↓

1 KB
```

```
1024 KB

↓

1 MB
```

```
1024 MB

↓

1 GB
```

```
1024 GB

↓

1 TB
```

---

### RGB

```
Red

Green

Blue
```

Each

```
8 Bits
```

Total

```
24 Bits

↓

16.7 Million Colors
```

---

### Binary Powers

```
128

64

32

16

8

4

2

1
```

Always remember these.

---

## ⚡ One Shot Revision

```
Data Representation
        │
        ▼
Everything becomes Binary
        │
        ▼
Number Systems
│
├── Binary
├── Decimal
├── Octal
└── Hexadecimal
        │
        ▼
Storage Units
│
├── Bit
├── Nibble
├── Byte
├── KB
├── MB
├── GB
└── TB
        │
        ▼
Colors
│
└── RGB
     │
     ▼
24-bit Color
16.7 Million Colors
        │
        ▼
Hexadecimal
│
├── File Signatures
├── Wireshark
├── Hex Editors
├── Malware Analysis
├── Reverse Engineering
└── Digital Forensics
```

---

## ⭐ Interview Questions

### Q1. What is Data Representation?

Data Representation is the method of storing information inside a computer using binary values.

---

### Q2. Why do computers use Binary?

Because electronic circuits have two stable states:

```
ON

OFF
```

represented as

```
1

0
```

---

### Q3. What is a Bit?

A Bit is the smallest unit of data.

Possible values

```
0

1
```

---

### Q4. What is a Byte?

```
8 Bits

=

1 Byte
```

---

### Q5. What is a Nibble?

```
4 Bits

=

1 Nibble
```

---

### Q6. Which number system does Hexadecimal use?

```
Base 16
```

---

### Q7. Why is Hexadecimal preferred over Binary?

Because it is much shorter and easier for humans to read.

---

### Q8. How many colors can 24-bit RGB represent?

```
16,777,216
```

---

### Q9. What is RGB?

RGB stands for

- Red
- Green
- Blue

used to represent colors digitally.

---

### Q10. Which tools commonly display hexadecimal?

- Wireshark
- HxD
- Hex Fiend
- Bless
- xxd
- hexdump

---

### Q11. What are Magic Numbers?

Special hexadecimal values that identify file types.

Example

```
89 50 4E 47

↓

PNG
```

---

### Q12. Why is Data Representation important in Cybersecurity?

Because analysts work with raw binary and hexadecimal data in:

- Malware Analysis
- Packet Analysis
- Digital Forensics
- Reverse Engineering
- Memory Analysis

---

## ❓ Frequently Asked Questions

#### Can a computer understand English?

No.

Everything is converted into binary before processing.

---

#### Why is hexadecimal easier than binary?

Every hexadecimal digit represents exactly four bits, making long binary values much shorter.

---

#### Is RGB additive or subtractive?

RGB is an **Additive Color Model**, meaning colors are created by adding light.

---

#### Where will I use this knowledge?

- TryHackMe
- Hack The Box
- CEH
- PNPT
- OSCP
- Reverse Engineering
- Malware Analysis
- SOC Analyst Roles
- Digital Forensics
- Network Security

---

## 🎯 Key Takeaways

✔ Computers understand only binary.

✔ Binary is based on powers of 2.

✔ Decimal is based on powers of 10.

✔ 1 Bit = Binary Digit.

✔ 4 Bits = 1 Nibble.

✔ 8 Bits = 1 Byte.

✔ Every file eventually becomes binary.

✔ Cybersecurity professionals constantly work with binary and hexadecimal data.

---

✔ RGB uses Red, Green and Blue.

✔ Each channel stores 8 Bits.

✔ Total colors = 16.7 Million.

✔ Hexadecimal uses Base-16.

✔ One Hex digit represents one Nibble.

✔ Hex is shorter and easier to read than Binary.

✔ File signatures and memory dumps are usually displayed in Hex.

---

✔ Computers understand only Binary.

✔ Binary is Base-2.

✔ Decimal is Base-10.

✔ Hexadecimal is Base-16.

✔ Octal is Base-8.

✔ 1 Bit = Binary Digit.

✔ 4 Bits = 1 Nibble.

✔ 8 Bits = 1 Byte.

✔ RGB uses three color channels.

✔ 24-bit color represents over 16 million colors.

✔ Hexadecimal simplifies binary representation.

✔ Hexadecimal is widely used in cybersecurity.

✔ Learn binary conversions before moving to advanced topics.

✔ Understanding data representation is essential for networking, operating systems, malware analysis, and digital forensics.

---

## End of Room

Congratulations! 🎉

You have completed the **Data Representation** room and now understand how computers store numbers, colors, and files using binary and hexadecimal. These concepts form the foundation for networking, operating systems, programming, reverse engineering, malware analysis, and almost every cybersecurity domain.

---

# Room 2 — Data Encoding 🔣

## Overview

In the previous room, we learned how computers represent numbers and colors using binary and hexadecimal.

Now comes the next important question:

> **If computers only understand numbers, then how do they store letters, symbols, emojis, and text?**

The answer is **Data Encoding**.

Data Encoding is the process of converting characters (letters, numbers, punctuation, emojis, and symbols) into numerical values so that computers can store, process, and transmit them.

Without encoding, computers would never know that the number **65** should be displayed as **A**, or that **U+1F600** represents 😀.

---

## Learning Objectives

After completing this room you should understand:

✔ What Encoding is

✔ Character Sets

✔ ASCII

✔ Extended ASCII

✔ Unicode

✔ UTF-8

✔ UTF-16

✔ UTF-32

✔ Emojis

✔ Why Encoding Matters

✔ Common Encoding Problems

✔ Real-world Cybersecurity Applications

---

## Representation vs Encoding

Many beginners confuse these two concepts.

### Data Representation

Representation answers:

> **How is data stored inside a computer?**

Example

```
Number

15

↓

Binary

00001111
```

---

### Data Encoding

Encoding answers:

> **What does this number actually mean?**

Example

```
65

↓

Character

A
```

Without encoding,

```
65

could mean

A

or

something else.
```

Computers need a predefined agreement.

That agreement is called an **Encoding Standard**.

---

## Real-World Example

Suppose you type:

```
Hello
```

The computer never stores

```
H
e
l
l
o
```

Instead it stores numbers.

ASCII

```
H → 72

e → 101

l →108

l →108

o →111
```

Then these numbers become binary.

```
72

↓

01001000
```

Everything eventually becomes binary.

```
Text

↓

Numbers

↓

Binary

↓

Memory
```

ASCII Diagram

```
Human

Hello
   │
   ▼
Encoding
   │
   ▼
72 101 108 108 111
   │
   ▼
Binary
   │
   ▼
01001000...
```

---

## Why Encoding Exists

Imagine sending

```
A
```

to another computer.

If one computer thinks

```
65 = A
```

while another thinks

```
65 = B
```

communication completely fails.

Encoding standards ensure every computer interprets characters the same way.

---

## What is a Character?

A character is any individual symbol.

Examples

Letters

```
A
B
C
```

Digits

```
0

1

2
```

Symbols

```
@

#

$

%
```

Whitespace

```
Space

Tab

New Line
```

Emojis

```
😀

😂

🔥

❤️
```

Different languages

```
ह

你

あ

Ω

Ж
```

---

## Character Set

A Character Set is a collection of characters supported by an encoding standard.

Example

ASCII Character Set

Contains

```
Letters

Digits

Punctuation

Control Characters
```

Unicode Character Set

Contains

```
Almost every language

Emoji

Ancient scripts

Mathematical symbols
```

---

## What is ASCII?

ASCII stands for

```
American Standard Code for Information Interchange
```

Created

```
1963
```

Purpose

Provide one common standard for English text.

ASCII uses

```
7 Bits
```

Meaning

```
2⁷

=

128 Characters
```

Character range

```
0

↓

127
```

---

## ASCII Structure

ASCII consists of

```
Control Characters

+

Printable Characters
```

ASCII Diagram

```
ASCII
│
├── 0-31
│     Control Characters
│
├── 32-126
│     Printable Characters
│
└──127
      DEL
```

---

## Printable Characters

ASCII supports

✔ Uppercase Letters

✔ Lowercase Letters

✔ Digits

✔ Symbols

Examples

```
A

↓

65
```

```
B

↓

66
```

```
a

↓

97
```

```
0

↓

48
```

```
@

↓

64
```

---

## Control Characters

Not every ASCII value represents a visible character.

Some values control devices.

Examples

| Decimal | Name | Purpose |
|---------:|------|---------|
|0|NUL|Null|
|7|BEL|Bell|
|8|BS|Backspace|
|9|TAB|Horizontal Tab|
|10|LF|Line Feed|
|13|CR|Carriage Return|
|27|ESC|Escape|
|127|DEL|Delete|

---

## Common ASCII Values

| Character | Decimal | Hex | Binary |
|-----------|--------:|-----|----------|
|A|65|41|01000001|
|B|66|42|01000010|
|C|67|43|01000011|
|a|97|61|01100001|
|b|98|62|01100010|
|0|48|30|00110000|
|1|49|31|00110001|
|Space|32|20|00100000|
|@|64|40|01000000|
|#|35|23|00100011|

Memory Trick

```
A

↓

65

↓

0x41
```

```
a

↓

97

↓

0x61
```

Difference between uppercase and lowercase

```
32
```

```
97 - 65 = 32
```

Very common interview question.

---

## ASCII Example

Word

```
CAT
```

ASCII

```
C

↓

67

A

↓

65

T

↓

84
```

Binary

```
01000011

01000001

01010100
```

Hexadecimal

```
43

41

54
```

---

## "TryHackMe" Example

ASCII

| Character | Hex |
|-----------|-----|
|T|54|
|r|72|
|y|79|
|H|48|
|a|61|
|c|63|
|k|6B|
|M|4D|
|e|65|

Stored inside memory

```
54 72 79 48 61 63 6B 4D 65
```

---

## Why Hexadecimal is Used

Instead of showing

```
01010100

01110010

01111001
```

we write

```
54

72

79
```

Much easier to read.

---

## Extended ASCII

ASCII only supports

```
128 Characters
```

This became a problem for European languages.

Examples

```
ñ

ö

ß

ç

ø
```

Different countries created different versions.

Examples

```
ISO-8859-1

ISO-8859-2

Windows-1252
```

Unfortunately

Different systems assigned different meanings to the same byte.

Result

```
Gibberish
```

Example

```
Ã©

ÐŸ

Â£
```

This is called **Mojibake**.

---

## What is Mojibake?

Mojibake is corrupted text caused by decoding data using the wrong character encoding.

Example

Original

```
Café
```

Incorrect Display

```
CafÃ©
```

Reason

Saved in UTF-8

↓

Opened as Latin-1

---

## Real-World Scenario

Imagine receiving subtitles for a movie.

Correct

```
Olá!
```

Incorrect

```
OlÃ¡!
```

Nothing is wrong with the file.

The wrong encoding was used to interpret it.

---

## Cybersecurity Relevance

Encoding is extremely important because analysts inspect:

✔ Log Files

✔ Malware Strings

✔ HTTP Requests

✔ Email Headers

✔ Memory Dumps

✔ Network Packets

✔ Source Code

Understanding encoding helps identify hidden payloads, obfuscated scripts, and malicious content.

---

## Why ASCII Failed

ASCII was revolutionary...

But it had one major limitation.

It only supports:

    128 characters

Which is enough for:

✔ English Alphabet
✔ Numbers
✔ Basic Symbols

But NOT enough for:

❌ Hindi
❌ Chinese
❌ Japanese
❌ Arabic
❌ Korean
❌ Russian
❌ Emoji

Example

ASCII can store:

A

But cannot store:

ह
你
あ
😊
🔥

Hence,

A new universal standard was needed.

That standard is...

UNICODE.

---

## What is Unicode?

Unicode is a universal character standard.

Think of it as a huge dictionary that gives every character on Earth
its own unique number.

Example

Character          Unicode Code Point

A                  U+0041
a                  U+0061
Ω                  U+03A9
あ                 U+3042
你                 U+4F60
😊                 U+1F60A
🔥                 U+1F525

Unicode supports

✔ Every modern language

✔ Mathematical symbols

✔ Currency symbols

✔ Emojis

✔ Ancient languages

✔ Musical notation

✔ Chess symbols

✔ Braille

Almost EVERYTHING.

---

## Unicode Code Point

Every Unicode character gets a unique identifier.

Called:

Code Point

Format

U+XXXX

Example

U+0041

means

Character:

A

Another

U+1F600

means

😀

ASCII Diagram

Character
     │
     ▼
Unicode Code Point
     │
     ▼
U+0041
     │
     ▼
"A"

---

## Unicode Examples

Character          Code Point

A                  U+0041

Ω                  U+03A9

あ                 U+3042

ت                  U+062A

龍                 U+9F8D

♞                 U+265E

😊                 U+1F60A

🔥                 U+1F525

---

## But Wait...

Unicode only defines

WHAT NUMBER

belongs to

WHICH CHARACTER.

It DOES NOT tell us

How to store those numbers.

That's where UTF comes in.

---

## What is UTF?

UTF means

Unicode Transformation Format

Its job:

Convert Unicode code points into bytes.

Unicode

↓

UTF Encoding

↓

Bytes

↓

Memory

---

## UTF-8

Most popular encoding today.

Used by

✔ Linux

✔ Windows

✔ macOS

✔ Websites

✔ APIs

✔ JSON

✔ HTML

✔ JavaScript

✔ Python

Almost EVERYTHING.

---

## UTF-8 Size

UTF-8 is variable length.

Character Size

ASCII Characters

↓

1 Byte

European Characters

↓

2 Bytes

Chinese/Japanese

↓

3 Bytes

Emoji

↓

4 Bytes

Example

Character

A

Unicode

U+0041

UTF-8

41

1 Byte

Another

Character

😊

Unicode

U+1F60A

UTF-8

F0 9F 98 8A

4 Bytes

---

## UTF-8 Memory Diagram

Text

Hello 😊

↓

Unicode

H

e

l

l

o

😊

↓

UTF-8

48

65

6C

6C

6F

F0 9F 98 8A

↓

Disk

---

## Advantages of UTF-8

✔ Backward Compatible with ASCII

✔ Small storage

✔ Internet Standard

✔ Most widely supported

✔ Variable length

✔ Efficient

---

## UTF-16

UTF-16 uses

2 bytes

for most characters.

Some rare characters

need

4 bytes.

Example

Character

A

↓

U+0041

↓

0041

Character

🔥

↓

Needs

2 UTF-16 units

(4 Bytes)

---

## UTF-16 Summary

Common Characters

↓

2 Bytes

Emoji

↓

4 Bytes

Widely used by

Windows

Java

C#

---

## UTF-32

Simplest encoding.

Every character

=

Exactly

4 Bytes

Always.

Example

A

↓

00000041

Emoji

↓

0001F600

Advantages

Very simple.

Disadvantages

Huge storage requirement.

---

## UTF Comparison

                UTF-8      UTF-16      UTF-32

ASCII           1B          2B          4B

Emoji           4B          4B          4B

Storage         Small       Medium      Large

Speed           Fast        Medium      Fast

Internet        ✔           Rare        Very Rare

---

## UTF Comparison Diagram

Unicode Character

        😊

        │

        ▼

UTF-8

F0 9F 98 8A

4 Bytes

----------------------

UTF-16

D83D DE0A

4 Bytes

----------------------

UTF-32

0001F60A

4 Bytes

---

## Emoji Encoding

Emoji are simply Unicode characters.

Example

😀

↓

Unicode

U+1F600

😊

↓

Unicode

U+1F60A

🔥

↓

Unicode

U+1F525

☕

↓

Unicode

U+2615

The computer only stores numbers.

Your operating system displays images.

---

## Interesting Unicode Examples

Character          Unicode

☕

U+2615

♞

U+265E

龍

U+9F8D

ツ

U+30C4

😊

U+1F60A

🔥

U+1F525

---

## Why Unicode Matters

Without Unicode

Hindi users

Chinese users

Japanese users

Emoji

Would all break.

Unicode solved

Language compatibility forever.

---

## Real World Example

Message

नमस्ते 😊

↓

Unicode

↓

UTF-8

↓

Network

↓

Receiver

↓

UTF-8 Decode

↓

Unicode

↓

Display

Correct Text

---

## Cybersecurity Relevance

Unicode appears everywhere.

✔ Log Files

✔ HTTP Requests

✔ DNS

✔ URLs

✔ SQL Injection

✔ XSS

✔ Malware

✔ Reverse Engineering

✔ Memory Dumps

✔ Packet Analysis

Attackers abuse Unicode to

✔ Hide payloads

✔ Bypass filters

✔ Obfuscate malware

Understanding encoding is extremely important during malware analysis.

---

## ASCII vs Unicode

ASCII

128 Characters

English Only

7 Bits

Old

-------------

Unicode

Millions of Characters

Every Language

Variable Encoding

Modern

---

## 🧠 Memory Tricks

ASCII

↓

English Only

-------------------

Unicode

↓

Everything

-------------------

UTF

↓

Stores Unicode

-------------------

UTF-8

↓

Internet King 🌐

-------------------

UTF-16

↓

Windows + Java

-------------------

UTF-32

↓

Simple but Wasteful

---

## ⚡ One Shot Revision

Representation

↓

How data is stored

Encoding

↓

How numbers become characters

ASCII

↓

128 Characters

English Only

Extended ASCII

↓

European Languages

Unicode

↓

Universal Character Set

UTF

↓

Unicode Storage Format

UTF-8

↓

1–4 Bytes

Internet Standard

UTF-16

↓

2–4 Bytes

UTF-32

↓

Always 4 Bytes

Emoji

↓

Unicode Characters

Unicode

↓

Defines Characters

UTF

↓

Stores Characters

---

## ⭐ Interview Questions

Q. What is Unicode?

Ans:

Universal character encoding standard assigning unique code points to every
character.

------------------------------------------------

Q. Difference between Unicode and UTF?

Unicode

Character Set

UTF

Encoding Format

------------------------------------------------

Q. Why UTF-8 is popular?

✔ Small

✔ Backward compatible

✔ Internet standard

------------------------------------------------

Q. Difference between UTF-8 and UTF-16?

UTF-8

1–4 Bytes

UTF-16

2–4 Bytes

------------------------------------------------

Q. Does Unicode store bytes?

No.

UTF stores bytes.

Unicode stores code points.

---

## 🎯 Key Takeaways

✔ Computers store text as numbers.

✔ Encoding maps numbers to characters.

✔ ASCII is a 7-bit standard with 128 characters.

✔ ASCII mainly supports English.

✔ Extended ASCII attempted to support European languages.

✔ Different encodings caused compatibility issues.

✔ Incorrect decoding leads to Mojibake (garbled text).

✔ Encoding knowledge is essential for cybersecurity, programming, networking, and digital forensics.

---

# Room 3 — Python: Simple Demo 🐍

> A complete beginner-friendly study guide covering Python basics, variables, input/output, random numbers, data types, and the foundations required for scripting in Cyber Security.

---

### 🎯 Objective

Learn the basic building blocks of Python by creating a simple **Guess the Number** game.

During this room you'll learn:

- Variables
- Functions
- Input
- Output
- Random numbers
- Type Conversion
- Program Logic
- Foundations for Conditionals & Loops

---

## What is Python?

### Definition

Python is a

> High-Level
>
> Interpreted
>
> General Purpose Programming Language

created by **Guido van Rossum** in **1991**.

It focuses on readability and simplicity.

Unlike C/C++, Python uses simple English-like syntax.

Example:

```python
print("Hello World")
```

instead of

```cpp
#include<iostream>
using namespace std;

int main(){
    cout<<"Hello World";
}
```

Python requires far less code.

---

## Why Python is Popular?

✔ Easy to Learn

✔ Easy to Read

✔ Huge Community

✔ Cross Platform

✔ Open Source

✔ Powerful Libraries

✔ Used Everywhere

---

### Python Applications

```
                    Python

                       │
      ┌────────────────┼────────────────┐
      │                │                │
 Web Development   Automation      Cyber Security
      │                │                │
 Django          Shell Scripts      Pentesting
 Flask           File Automation    Malware Analysis

      │                │                │

 Machine Learning   Data Science    AI Development

```

---

## Why Python in Cyber Security?

Python is the most popular scripting language used by ethical hackers.

It helps automate repetitive work.

Examples:

- Port Scanner
- Password Generator
- Malware Analysis
- Packet Analyzer
- Log Parser
- Web Scraper
- Exploit Development
- Network Automation

---

### Real World Example

Instead of manually checking

1000 IP addresses

Python can check all automatically.

Instead of manually opening

500 log files

Python reads them automatically.

Automation saves time.

---

## The Project of this Room

We create a simple game.

Computer secretly chooses a number.

Player keeps guessing.

Computer gives hints.

Eventually player wins.

---

### Program Flow

```
Computer Starts

        │

Generate Random Number

        │

Tell User

"I'm thinking of a number"

        │

Take User Input

        │

Compare Guess

        │

Correct?

   │            │

 No           Yes

 │              │

Hint         Print Success

 │

Repeat
```

---

## Learning Objectives

By the end of this room you'll understand:

✔ Variables

✔ Input

✔ Output

✔ Random Numbers

✔ Type Conversion

✔ Basic Program Structure

---

## Understanding Variables

### What is a Variable?

A variable is simply

> A named container used to store data.

Think of it as a labeled box.

Example

```
Name Box
---------

Surya

```

```
Age Box
--------

22
```

Instead of remembering the value

we remember the variable name.

---

### Variable Analogy

```
Variable

↓

Storage Box

↓

Contains Value

↓

Can Change Anytime

```

---

Example

```python
name = "Surya"

age = 22

city = "Ballia"
```

Memory looks like

```
name ─────► Surya

age ───────► 22

city ──────► Ballia
```

---

## Variables Used in This Room

There are three important variables.

---

### secret

Stores the hidden random number.

Example

```
secret = 14
```

Player never sees this.

---

### guess

Stores player's input.

Example

```
guess = 10
```

Later

```
guess = 15
```

Variable changes.

---

### tries

Counts attempts.

Example

```
tries = 0

↓

tries = 1

↓

tries = 2

↓

tries = 3
```

---

### Variable Relationship

```
secret

↓

Hidden Number

guess

↓

Player Guess

tries

↓

Attempt Counter

```

---

## Data Types

Everything stored inside Python belongs to a type.

Common types

| Data Type | Example |
|------------|----------|
| Integer | 10 |
| Float | 3.14 |
| String | "Hello" |
| Boolean | True |

---

### Integer

Whole Numbers

```
5

20

100

-8
```

---

### Float

Decimal Numbers

```
3.14

2.5

7.89
```

---

### String

Text

```
"TryHackMe"

"Python"

"Cyber Security"
```

---

### Boolean

Only two values

```
True

False
```

Used in conditions.

---

## Importing Modules

Large programs are divided into modules.

Need extra functionality?

Import it.

Example

```python
import random
```

This loads Python's random library.

---

### Module Analogy

```
Python

↓

Toolbox

↓

Need Hammer?

↓

Import Hammer

↓

Use Hammer
```

Same concept.

---

## Random Module

Random module generates unpredictable numbers.

Used in:

- Games
- Simulations
- Password Generation
- Cryptography (not secure enough)
- Testing

---

### randint()

Syntax

```python
random.randint(a,b)
```

Returns

```
a <= number <= b
```

Both numbers included.

Example

```python
random.randint(1,20)
```

Possible outputs

```
4

8

17

20

1
```

Every execution may differ.

---

## Creating the Secret Number

```python
import random

secret = random.randint(1,20)
```

Explanation

```
Import Random Library

↓

Generate Number

↓

Store inside secret

↓

Ready for Game
```

---

## Printing Output

Python displays information using

```python
print()
```

Example

```python
print("Hello")
```

Output

```
Hello
```

---

Game Example

```python
print("I'm thinking of a number between 1 and 20")
```

Output

```
I'm thinking of a number between 1 and 20
```

---

## Taking User Input

Python uses

```python
input()
```

Example

```python
name = input("Enter Name: ")
```

Output

```
Enter Name:
```

User types

```
Surya
```

Variable becomes

```
name = "Surya"
```

---

## Important Thing

input()

ALWAYS returns

```
String
```

Even if user types

```
15
```

Python stores

```
"15"

NOT

15
```

This confuses many beginners.

---

## Type Conversion

Need integer?

Use

```python
int()
```

Example

```python
text = input("Guess : ")

guess = int(text)
```

Flow

```
Keyboard

↓

"15"

↓

int()

↓

15

↓

guess
```

---

## Why Convert?

Without conversion

```
"10"

and

20

cannot be compared properly.
```

Need

```
10

and

20
```

Both integers.

---

## Code Written So Far

```python
import random

secret = random.randint(1,20)

tries = 0

guess = 0

print("I'm thinking of a number between 1 and 20")

text = input("Take a guess: ")

guess = int(text)

tries = tries + 1
```

---

## Code Flow

```
Start

↓

Import Random

↓

Generate Secret Number

↓

Initialize Variables

↓

Display Message

↓

Take Input

↓

Convert Input

↓

Increase Tries

↓

Ready for Comparison
```

---

## Conditional Statements

### 🎯 Objective

Programs should make decisions.

Instead of executing every line,

Python decides

"What should happen?"

based on conditions.

---

### What is a Conditional?

A conditional checks whether something is

✔ True

or

❌ False

Example

```
Age = 20

Is Age > 18 ?

↓

Yes

↓

Execute Code
```

---

### Real Life Examples

```
Rain?

↓

Yes

↓

Take Umbrella

Else

Don't Take
```

---

```
Password Correct?

↓

Yes

↓

Login

Else

Access Denied
```

---

```
Balance > ₹100 ?

↓

Yes

↓

Withdraw Money

Else

Insufficient Balance
```

---

## Python Conditional Statements

Python mainly uses

```
if

elif

else
```

---

### if

Runs only when condition is TRUE.

Syntax

```python
if condition:
    statement
```

Example

```python
marks = 95

if marks > 90:
    print("Excellent")
```

---

### elif

Means

```
Else If
```

Checks another condition.

Syntax

```python
if condition:

elif condition:

elif condition:
```

---

### else

Runs when every condition becomes FALSE.

Example

```python
if age >= 18:

    print("Adult")

else:

    print("Minor")
```

---

## Flow of if-elif-else

```
Condition 1

      │

True?──────Yes────►Execute

      │

      No

      │

Condition 2

      │

True?

      │

      No

      │

Execute Else
```

---

## Comparison Operators

Python compares values using operators.

| Operator | Meaning |
|-----------|----------|
| == | Equal |
| != | Not Equal |
| > | Greater Than |
| < | Less Than |
| >= | Greater or Equal |
| <= | Less or Equal |

---

### Examples

```python
10 > 5
```

Result

```
True
```

---

```python
5 > 20
```

```
False
```

---

```python
20 == 20
```

```
True
```

---

```python
20 != 20
```

```
False
```

---

## Guessing Logic

Player enters

```
guess
```

Computer compares

```
guess

with

secret
```

Possible cases

```
Guess

│

├── Out of Range

├── Too Low

├── Too High

└── Correct
```

---

## Out of Range

```python
if guess < 1 or guess > 20:

    print("That number is out of range.")
```

---

### Explanation

Allowed numbers

```
1

↓

20
```

Anything else

```
0

21

40

-5
```

is invalid.

---

## Too Low

```python
elif guess < secret:

    print("Too low")
```

Example

```
Secret = 15

Guess = 8

↓

Too Low
```

---

## Too High

```python
elif guess > secret:

    print("Too high")
```

Example

```
Secret = 15

Guess = 19

↓

Too High
```

---

## Correct Guess

```python
else:

    print("You got it!")
```

Since every other condition failed,

guess must be equal to secret.

---

## Decision Tree

```
Guess

│

Is Guess <1

OR

Guess >20 ?

│

Yes

↓

Out of Range

No

↓

Guess < Secret ?

│

Yes

↓

Too Low

No

↓

Guess > Secret ?

│

Yes

↓

Too High

No

↓

Correct
```

---

## Loops

### Why Loops?

Without loops

User gets

ONLY ONE chance.

That's boring.

Need repeated execution.

---

## What is a Loop?

Loop repeats code.

Example

```
Repeat

↓

Repeat

↓

Repeat

↓

Until Condition Fails
```

---

### while Loop

Syntax

```python
while condition:

    statements
```

Runs until

condition becomes FALSE.

---

### Guess Game Loop

```python
while guess != secret:
```

Meaning

```
Keep asking

until

Guess becomes Secret
```

---

## Loop Flow

```
Guess Correct?

│

No

↓

Ask Again

↓

Compare

↓

Correct?

↓

No

↓

Repeat

↓

Correct?

↓

Yes

↓

Exit Loop
```

---

## Operator !=

```
!=

means

Not Equal
```

Example

```
10 != 20

↓

True
```

```
10 != 10

↓

False
```

---

## Complete Program Flow

```
Program Starts

↓

Generate Secret Number

↓

Initialize Variables

↓

Display Message

↓

While Guess != Secret

↓

Take Input

↓

Convert Integer

↓

Increase Tries

↓

Compare

↓

Low?

↓

High?

↓

Correct?

↓

Game Ends
```

---

## Final Program Structure

```
import random

↓

Generate Secret

↓

while guess != secret

↓

Take Input

↓

Convert

↓

Increment Tries

↓

if

elif

elif

else

↓

End
```

---

## Cyber Security Applications

Conditionals are used in

✔ Login Systems

✔ Password Checking

✔ Firewall Rules

✔ Packet Filtering

✔ IDS Detection

✔ Malware Detection

✔ Authentication

---

Loops are used in

✔ Port Scanners

✔ Password Crackers

✔ Log Analysis

✔ Vulnerability Scanners

✔ Packet Capture

✔ Automation Scripts

---

### Example

Port Scanner

```
for port in ports

↓

Connect

↓

Success?

↓

Print Open Port
```

---

Log Analysis

```
Read File

↓

Read Next Line

↓

Attack Found?

↓

Generate Alert

↓

Continue
```

---

## 📌 Important Terms

| Term | Meaning |
|------|----------|
| Variable | Stores data |
| Module | Collection of Python code |
| random | Library for random values |
| randint() | Returns random integer |
| print() | Displays output |
| input() | Takes keyboard input |
| int() | Converts string into integer |
| Secret | Hidden random number |
| Guess | Player input |
| Tries | Number of attempts |

---

| Term | Meaning |
|------|----------|
| if | Execute if condition is True |
| elif | Else If |
| else | Execute when everything fails |
| while | Repeat while condition is True |
| == | Equal |
| != | Not Equal |
| > | Greater Than |
| < | Less Than |
| Condition | Expression returning True or False |
| Iteration | One execution of loop |

---

## 🧠 Memory Tricks

#### print()

Think

```
PRINT

↓

Show on Screen
```

---

#### input()

Think

```
INPUT

↓

Take from Keyboard
```

---

#### int()

Think

```
TEXT

↓

NUMBER
```

---

#### randint()

Remember

```
Random Integer

Between

a and b

Both Included
```

---

#### if

```
IF

↓

Decision
```

---

#### elif

```
Else

+

If
```

---

#### else

```
Everything Failed

↓

Default Action
```

---

#### while

```
WHILE

Condition True

↓

Keep Repeating
```

---

#### !=

Remember

```
!

means

NOT
```

---

## ❌ Common Mistakes

| Mistake | Correct Way |
|----------|-------------|
| Forgetting `import random` | Import the module before using `randint()` |
| Comparing `"10"` with `10` | Convert using `int()` |
| Thinking `input()` returns an integer | It always returns a string |
| Using an undefined variable | Initialize variables first |
| Assuming random numbers repeat | `randint()` generates different values on each execution |

---

| Mistake | Correct Way |
|----------|-------------|
| Using `=` inside condition | Use `==` |
| Infinite while loop | Update loop variables correctly |
| Forgetting `:` | Every `if`, `elif`, `else`, `while` needs a colon |
| Wrong indentation | Python depends on indentation |
| Forgetting `int()` | Convert input before comparison |

---

## 📝 30-Second Revision

- ✅ Python is a high-level, interpreted programming language.
- ✅ Variables store data (`secret`, `guess`, `tries`).
- ✅ `import random` loads the random module.
- ✅ `random.randint(1,20)` generates a random integer.
- ✅ `print()` displays output.
- ✅ `input()` receives user input as a string.
- ✅ `int()` converts a string into an integer.
- ✅ The program is now ready for **comparison using conditionals**, which will be covered in **Part 2**.

> **Core Lesson:** Every Python program starts with variables, input/output, and basic data handling. These fundamentals are the building blocks for writing automation scripts, cybersecurity tools, and larger applications.

---

- ✅ Variables store values.
- ✅ `random.randint()` generates a random number.
- ✅ `print()` displays output.
- ✅ `input()` takes user input.
- ✅ `int()` converts text to an integer.
- ✅ `if`, `elif`, and `else` control decision-making.
- ✅ Comparison operators determine program flow.
- ✅ `while` repeats code until the condition becomes false.
- ✅ `!=` means "not equal".
- ✅ The final game repeatedly asks for guesses until the correct number is entered.

> **Core Lesson:** This room introduces the essential programming concepts—variables, input/output, conditionals, comparison operators, and loops—that form the foundation of Python scripting. These same concepts are heavily used in cybersecurity automation, penetration testing, log analysis, and security tool development.

---

## ⚡ One Shot Revision

```
Python Simple Demo

↓

Variables

↓

Random Number

↓

print()

↓

input()

↓

int()

↓

if

↓

elif

↓

else

↓

Comparison Operators

↓

while Loop

↓

Guess Game Completed
```

---

## ⭐ Interview Questions

#### What is Python?

A high-level, interpreted, general-purpose programming language known for readability and automation.

---

#### Why Python in Cyber Security?

Because it automates repetitive tasks like scanning, parsing logs, writing exploits, packet analysis, and scripting.

---

#### Difference between print() and input()

print()

Displays data.

input()

Receives data from the user.

---

#### Why does input() return a string?

Because keyboard input is received as text first. We convert it using `int()`, `float()`, etc., depending on the requirement.

---

#### What does randint(1,20) return?

A random integer between **1 and 20**, inclusive.

---

### What is a conditional statement?

A decision-making statement that executes code depending on whether a condition evaluates to True or False.

---

### Difference between if and while?

if

Runs once.

while

Repeats until condition becomes False.

---

### What is iteration?

One complete execution of a loop.

---

### Why use loops?

To avoid repeating the same code manually.

---

### What is != ?

Not Equal operator.

---

### Difference between == and = ?

```
=

Assignment

Stores value
```

```
==

Comparison

Checks equality
```

---

### Why use elif?

To check multiple conditions efficiently without writing separate `if` statements.

---

## 🚀 What's Next?

After completing **Python: Simple Demo**, you're ready to learn:

- Functions
- Lists
- Dictionaries
- File Handling
- Exception Handling
- Modules & Packages
- Automation Scripts
- Networking with Python
- Cyber Security Scripting (Scapy, Requests, Socket, Paramiko)

---

# Room 4 — JavaScript: Simple Demo ⚡

> A clean, structured study guide covering JavaScript fundamentals through a simple **Guess the Number** game.
>
> 💻 Beginner Friendly • 🎯 Interview Oriented • 🛡️ Cybersecurity Perspective • 📚 GitHub/Obsidian Ready

---

### 🎯 Objective

Learn the basics of JavaScript by building a simple **Guess the Number** game.

Instead of only learning syntax, we'll understand:

- Variables
- Constants
- Random Numbers
- User Interaction
- Output
- Programming Logic

---

## 1️⃣ What is JavaScript?

### Definition

JavaScript (JS) is a **high-level programming language** mainly used to make websites interactive.

Without JavaScript:

- Buttons wouldn't respond
- Forms wouldn't validate
- Games wouldn't work
- Animations wouldn't exist

JavaScript adds **behavior** to web pages.

---

### 🧠 Mind Map

```
JavaScript
│
├── Dynamic Language
├── High-Level
├── Event Driven
├── Runs in Browser
├── Runs on Server (Node.js)
│
├── Variables
├── Conditions
├── Loops
├── Functions
└── Objects
```

---

## Why Learn JavaScript?

Today JavaScript is everywhere.

✔ Websites

✔ Web Applications

✔ APIs

✔ Mobile Apps

✔ Desktop Apps

✔ Automation

✔ Cybersecurity Tools

---

Examples

```
Netflix
Amazon
YouTube
Facebook
Discord
VS Code Extensions
```

All use JavaScript.

---

## Cybersecurity Perspective

Many security tools include JavaScript.

Examples

```
Burp Suite Extensions

Browser Exploitation

XSS Payloads

DOM Manipulation

Web Pentesting

Node.js Automation Scripts
```

A Web Pentester **must know JavaScript**.

---

## 2️⃣ Client Side vs Server Side JavaScript

Originally JavaScript only ran inside browsers.

```
Browser

↓

HTML

↓

CSS

↓

JavaScript
```

Example

```
Click Button

↓

JavaScript Runs

↓

Page Updates
```

---

Then came **Node.js**

Now JavaScript can run directly on servers.

```
Browser

↓

HTTP Request

↓

Node.js Server

↓

Database

↓

Response
```

---

### Comparison

| Browser JavaScript | Node.js JavaScript |
|-------------------|-------------------|
| Runs in browser | Runs on server |
| Manipulates webpage | Builds backend |
| Uses DOM | Uses filesystem, network |
| Client-side | Server-side |

---

### Remember

```
Browser JS

↓

Frontend


Node.js

↓

Backend
```

---

## 3️⃣ Guess the Number Project

Throughout this room we build one program.

```
Guess the Number
```

---

### Program Logic

```
Computer Picks Number

↓

User Guesses

↓

Correct?

↓

No

↓

Hint

↓

Guess Again

↓

Correct

↓

Win
```

---

### Flow Diagram

```
          Start

             │

             ▼

 Pick Random Number

             │

             ▼

 Ask User Guess

             │

             ▼

 Compare Guess

        ┌───────────┐
        │Correct ?  │
        └─────┬─────┘
              │
     No       │ Yes
      │       │
      ▼       ▼
 Show Hint   Win
      │
      ▼
 Guess Again
```

---

### Learning Objectives

By the end of this room you'll understand:

✅ Variables

✅ Constants

✅ User Input

✅ Output

✅ Conditions

✅ While Loops

---

## 4️⃣ Setting up the Environment

TryHackMe uses **Node.js**.

Instead of browser JavaScript,

we execute JavaScript from terminal.

```
node filename.js
```

Example

```bash
node guess_v1.js
```

---

### Why Node.js?

Advantages

✔ Easy

✔ Fast

✔ No browser required

✔ Great for automation

✔ Popular in industry

---

### Browser vs Node

```
Browser

↓

Open Website

↓

Run JavaScript


Node.js

↓

Open Terminal

↓

node app.js
```

---

## 5️⃣ Variables

### Definition

A variable stores information.

Think of it as a labeled box.

```
Variable

↓

Stores Data

↓

Can Change Later
```

---

Example

```javascript
let tries = 0;

let guess = 0;
```

---

### Meaning

```
tries

↓

Number of attempts


guess

↓

Current user input
```

---

### Memory Diagram

```
Memory

+----------------+

tries

0

+----------------+

guess

0

+----------------+
```

---

### Why Variables?

Without variables

the computer cannot remember anything.

Example

```
User Guess

↓

Store Guess

↓

Compare Guess

↓

Ask Again

↓

Update Guess
```

---

### Variable Declaration

JavaScript uses

```javascript
let
```

Example

```javascript
let age = 20;

let name = "Surya";

let score = 95;
```

---

### Why "let"?

Because value changes later.

Example

```javascript
let score = 10;

score = 20;
```

Perfectly valid.

---

### Cybersecurity Example

```javascript
let failedAttempts = 0;

failedAttempts++;
```

Useful for

```
Login Systems

Rate Limiting

Password Retry

Account Locking
```

---

## Variable Life Cycle

```
Declare

↓

Assign

↓

Use

↓

Update

↓

Program Ends
```

---

## 6️⃣ Constants

Sometimes values should never change.

For this we use

```javascript
const
```

---

Example

```javascript
const PI = 3.14;
```

---

Example from room

```javascript
const secret =
Math.floor(Math.random()*20)+1;
```

---

Meaning

```
Secret Number

↓

Generated Once

↓

Never Changes
```

---

### Difference

| let | const |
|------|--------|
| Can change | Cannot change |
| Variable | Constant |
| Mutable | Immutable Reference |

---

Example

```javascript
let age = 20;

age = 21;
```

Allowed

---

```javascript
const age = 20;

age = 21;
```

❌ Error

---

## Why Secret Uses const?

Suppose

```
Secret = 14
```

If it changed every guess

```
14

↓

9

↓

18

↓

5
```

Player could never win.

Hence

```
const secret
```

---

## 7️⃣ Random Number Generation

The computer must secretly choose

```
1

to

20
```

---

Code

```javascript
const secret =
Math.floor(
Math.random()*20
)+1;
```

---

### Breaking It Down

#### Step 1

```javascript
Math.random()
```

Returns

```
0.000

↓

0.999
```

Example

```
0.28

0.73

0.91
```

---

#### Step 2

Multiply by 20

```
0.28

×

20

=

5.6
```

---

#### Step 3

```
Math.floor()
```

Removes decimal

```
5.6

↓

5
```

---

#### Step 4

```
+1
```

Range becomes

```
0–19

↓

1–20
```

---

### Complete Diagram

```
Math.random()

↓

0.82

↓

×20

↓

16.4

↓

Math.floor()

↓

16

↓

+1

↓

17
```

---

## 8️⃣ Displaying Output

To print text

JavaScript uses

```javascript
console.log()
```

---

Example

```javascript
console.log(
"I'm thinking of a number between 1 and 20"
);
```

---

Output

```
I'm thinking of a number between 1 and 20
```

---

### Why console.log()?

Useful for

✔ Messages

✔ Debugging

✔ Logs

✔ Testing

---

### Cybersecurity Example

```javascript
console.log(
"Login Successful"
);
```

or

```javascript
console.log(
"Suspicious Activity Detected"
);
```

---

## Program Flow Till Now

```
Start

↓

Generate Secret

↓

Store Secret

↓

Initialize Variables

↓

Display Message

↓

Wait for User Input
```

---

## 9️⃣ Taking User Input

Until now our game could:

✔ Pick a secret number

✔ Display a message

But...

❌ The user couldn't actually play.

We now need to ask the player for a guess.

---

### User Interaction

```
Computer

↓

"Take a guess"

↓

User Types

↓

Program Reads Input

↓

Stores Guess
```

---

### Code

```javascript
const text =
await rl.question("Take a guess: ");
```

---

### Explanation

```
rl.question()

↓

Displays Question

↓

Waits for User

↓

Returns Text
```

Example

```
Take a guess:

10
```

The returned value is

```
"10"
```

Notice

It is **text**, not a number.

---

## Why is it Text?

Whenever a user types something,

JavaScript receives

```
String
```

Example

```
10

↓

"10"
```

Even though it looks like a number,

internally

```
Type

↓

String
```

---

## Readline Module

Node.js doesn't automatically know how to read keyboard input.

We use

```
readline
```

---

### Import

```javascript
import * as readline
from "node:readline/promises";
```

---

### Create Interface

```javascript
const rl =
readline.createInterface({
input,
output
});
```

---

### Mind Map

```
Keyboard

↓

readline

↓

question()

↓

Returns Text

↓

Store in Variable
```

---

## Why await?

When JavaScript asks a question,

it waits for the user.

Without waiting,

the program would continue immediately.

```
Question

↓

Wait

↓

User Types

↓

Continue
```

---

Example

```javascript
const text =
await rl.question(
"Guess: "
);
```

---

## 1️⃣0️⃣ Converting Text into Numbers

Current value

```
"10"
```

Needed value

```
10
```

---

JavaScript uses

```javascript
parseInt()
```

---

Code

```javascript
guess =
parseInt(text,10);
```

---

### Flow

```
Keyboard

↓

"15"

↓

parseInt()

↓

15

↓

Integer
```

---

### Why Base 10?

```
parseInt(text,10)
```

The

```
10
```

means

```
Decimal Number System
```

---

Example

```javascript
parseInt("25",10)
```

returns

```
25
```

---

## Cybersecurity Example

Suppose a login system asks

```
Enter OTP
```

User types

```
123456
```

Received

```
"123456"
```

Convert

```
parseInt()

↓

123456
```

---

## Complete Flow

```
Ask User

↓

Receive Text

↓

Convert

↓

Store Guess
```

---

## Program So Far

```
Generate Secret

↓

Print Welcome

↓

Ask Guess

↓

Convert Guess

↓

Store Guess
```

---

## 1️⃣1️⃣ Conditional Statements

Now the program knows the user's guess.

But...

How does it decide

```
Too High

Too Low

Correct
```

Answer

```
Conditionals
```

---

## What is a Conditional?

A conditional allows a program

to make decisions.

```
Condition

↓

True ?

↓

Yes

↓

Run Code

No

↓

Skip Code
```

---

### Real Life Example

```
Rain?

↓

Yes

↓

Take Umbrella

No

↓

Go Outside
```

Programming works the same way.

---

## JavaScript Conditional Keywords

```
if

↓

Check Condition

↓

else if

↓

Another Check

↓

else

↓

Everything Else
```

---

## 1️⃣2️⃣ if Statement

Syntax

```javascript
if(condition){

}
```

---

Example

```javascript
if(guess<secret){

console.log(
"Too low"
);

}
```

---

Flow

```
Guess < Secret

↓

Yes

↓

Print

Too Low
```

---

## 1️⃣3️⃣ else if Statement

Used when first condition fails.

Example

```javascript
else if(
guess>secret
){

console.log(
"Too high"
);

}
```

---

Flow

```
Guess < Secret

↓

False

↓

Guess > Secret

↓

True

↓

Too High
```

---

## 1️⃣4️⃣ else Statement

Runs only

when every previous condition fails.

Example

```javascript
else{

console.log(
"You Win"
);

}
```

---

Meaning

If

```
Guess

=

Secret
```

then

```
Winner
```

---

## Complete Decision Tree

```
Guess

↓

Less?

───────────

Yes

↓

Too Low

───────────

No

↓

Greater?

───────────

Yes

↓

Too High

───────────

No

↓

Correct

↓

Win
```

---

## Full Guess Logic

```javascript
if(guess<1 || guess>20){

console.log(
"Out of range"
);

}

else if(
guess<secret
){

console.log(
"Too low"
);

}

else if(
guess>secret
){

console.log(
"Too high"
);

}

else{

console.log(
"You got it!"
);

}
```

---

## Understanding ||

JavaScript uses

```
||

↓

OR
```

Example

```javascript
guess<1 ||

guess>20
```

Meaning

```
Less than 1

OR

Greater than 20
```

---

## Example

Guess

```
35
```

Condition

```
35>20

↓

True
```

Output

```
Out of Range
```

---

Guess

```
-5
```

Condition

```
-5<1

↓

True
```

Output

```
Out of Range
```

---

## Complete Program Flow

```
Start

↓

Generate Secret

↓

Ask Guess

↓

Convert Number

↓

Check Range

↓

Compare Secret

↓

Hint

↓

End
```

---

## Cybersecurity Perspective

Conditionals are used everywhere.

Examples

```
if(Login Success)

↓

Dashboard

else

↓

Access Denied
```

---

Firewall Example

```
if(IP Blocked)

↓

Drop Packet

else

↓

Allow Packet
```

---

IDS Example

```
if(Suspicious Traffic)

↓

Generate Alert

else

↓

Ignore
```

---

## 1️⃣5️⃣ Why Do We Need Loops?

Current program

```
Start

↓

Take Guess

↓

Check

↓

Exit
```

Problem

```
Only One Chance
```

A guessing game isn't fun if you only get one try.

Instead

```
Guess

↓

Wrong

↓

Guess Again

↓

Wrong

↓

Guess Again

↓

Correct

↓

Win
```

This is exactly what loops are designed for.

---

## What is a Loop?

A loop repeatedly executes code until a condition becomes false.

```
Condition True

↓

Run Code

↓

Condition True

↓

Run Again

↓

Condition False

↓

Exit Loop
```

---

## Real-Life Example

Imagine knocking on a friend's door.

```
Knock

↓

Friend Opens?

↓

No

↓

Knock Again

↓

No

↓

Knock Again

↓

Yes

↓

Stop
```

That's a loop.

---

## 1️⃣6️⃣ While Loop

JavaScript provides

```javascript
while
```

---

### Syntax

```javascript
while(condition){

// code

}
```

Meaning

```
As long as

Condition == True

↓

Keep Running
```

---

### Guess Game

```javascript
while(
guess !== secret
){

// keep asking

}
```

Meaning

```
Guess

≠

Secret

↓

Ask Again
```

---

## Flow Diagram

```
Guess

↓

Correct?

──────────────

No

↓

Loop Again

──────────────

Yes

↓

Exit Loop
```

---

## Mind Map

```
while Loop

│

├── Checks Condition

├── Executes Code

├── Repeats

├── Updates Variables

└── Stops When Condition Fails
```

---

## 1️⃣7️⃣ != vs !==

JavaScript has two "Not Equal" operators.

---

### !=

Loose Comparison

```javascript
10 != "10"
```

Result

```
False
```

Because JavaScript converts the types automatically.

---

### !==

Strict Comparison

```javascript
10 !== "10"
```

Result

```
True
```

Different data types.

---

#### Why Use !== ?

It avoids unexpected bugs.

Modern JavaScript recommends

```
===

!==

instead of

==

!=
```

---

## Guess Loop

```javascript
while(
guess !== secret
){

const text =
await rl.question(
"Take a guess: "
);

guess =
parseInt(text,10);

}
```

---

Flow

```
Question

↓

User Types

↓

Convert Number

↓

Compare

↓

Wrong?

↓

Repeat
```

---

## 1️⃣8️⃣ Updating Variables

Every guess increases the number of attempts.

Code

```javascript
tries =
tries + 1;
```

Equivalent

```javascript
tries++;
```

Meaning

```
tries

↓

0

↓

1

↓

2

↓

3

↓

4
```

---

## Memory Diagram

```
tries

0

↓

1

↓

2

↓

3

↓

4
```

---

## Why Count Tries?

At the end

Program prints

```
You got it in

4 tries!
```

Without incrementing

Program would always show

```
0 tries
```

---

## 1️⃣9️⃣ Complete Game Logic

```
Generate Secret

↓

Print Welcome

↓

Loop Begins

↓

Ask Guess

↓

Convert Input

↓

Increase Tries

↓

Check Range

↓

Too Low?

↓

Too High?

↓

Correct?

↓

Yes

↓

Exit Loop

↓

Print Victory
```

---

## Complete Decision Tree

```
Guess

↓

Range Valid?

──────────────

No

↓

Out Of Range

──────────────

Yes

↓

Guess < Secret?

──────────────

Yes

↓

Too Low

──────────────

No

↓

Guess > Secret?

──────────────

Yes

↓

Too High

──────────────

No

↓

Correct

↓

Victory
```

---

## Complete Program Summary

```
Start

↓

Random Number

↓

Initialize Variables

↓

Display Welcome

↓

while Loop

↓

Input

↓

Convert

↓

Increment Tries

↓

Compare

↓

Repeat Until Correct

↓

Congratulations

↓

End
```

---

## Example Execution

```
I'm thinking of a number
between 1 and 20

Take a guess

10

↓

Too Low

Take a guess

15

↓

Too High

Take a guess

13

↓

Too Low

Take a guess

14

↓

Correct!

You got it in 4 tries!
```

---

## JavaScript vs Python

| JavaScript | Python |
|------------|---------|
| let | variable assignment |
| const | constant (by convention) |
| console.log() | print() |
| parseInt() | int() |
| while | while |
| if | if |
| else if | elif |
| else | else |

---

## Cybersecurity Perspective

Loops are everywhere.

---

### Password Cracking

```
Password List

↓

Try Password

↓

Success?

↓

No

↓

Next Password
```

Loop.

---

### Port Scanner

```
Port 1

↓

Open?

↓

No

↓

Port 2

↓

Open?

↓

Continue...
```

Loop.

---

### Log Monitoring

```
Read Log

↓

Attack Found?

↓

No

↓

Read Next Log
```

Loop.

---

### Firewall

```
Packet

↓

Allowed?

↓

No

↓

Drop

↓

Next Packet
```

Loop.

---

## 📌 Important Terms

| Term | Meaning |
|-------|---------|
| JavaScript | Programming language for web development |
| Node.js | Runtime for executing JavaScript outside browsers |
| Variable | Storage whose value can change |
| Constant | Storage whose value cannot change |
| let | Keyword used to declare variables |
| const | Keyword used to declare constants |
| Math.random() | Generates random decimal |
| Math.floor() | Removes decimal part |
| console.log() | Prints output |

---

| Term | Meaning |
|------|----------|
| readline | Reads user input |
| question() | Displays prompt |
| await | Waits for user response |
| parseInt() | Converts string to integer |
| if | First condition |
| else if | Second condition |
| else | Default condition |
| \|\| | Logical OR |

---

| Term | Meaning |
|------|----------|
| while | Repeats code while condition is true |
| Iteration | One execution of loop |
| tries | Counts attempts |
| != | Loose Not Equal |
| !== | Strict Not Equal |
| ++ | Increment by one |

---

## 🧠 Memory Tricks

```
let

↓

LET it change
```

---

```
const

↓

CONSTANT

↓

Never changes
```

---

```
console.log

↓

Console Prints
```

---

```
Math.floor

↓

Floor

↓

Go Down

↓

Remove Decimal
```

---

```
readline

↓

Reads Line
```

---

```
parseInt

↓

Parse

↓

Convert

↓

Integer
```

---

```
if

↓

First Choice
```

---

```
else if

↓

Second Choice
```

---

```
else

↓

Last Option
```

---

```
||

↓

OR
```

---

```
while

↓

WHILE True

↓

Keep Going
```

---

```
tries++

↓

One More Try
```

---

```
!==

↓

Not Equal

+

Different Type
```

---

```
Loop

↓

Repeat

↓

Repeat

↓

Repeat

↓

Stop
```

---

## ❌ Common Mistakes

| Mistake | Correct Way |
|----------|-------------|
| Using const for changing values | Use let |
| Forgetting +1 in random formula | Range becomes 0–19 |
| Using console.log without brackets | Always use () |
| Thinking Node.js is a language | It is a JavaScript runtime |

---

| Mistake | Correct Way |
|----------|-------------|
| Comparing strings instead of numbers | Use parseInt() |
| Forgetting await | Program won't wait |
| Using = instead of ==/=== in conditions | Use comparison operators |
| Forgetting range validation | Always validate input |

---

| Mistake | Correct Way |
|----------|-------------|
| Forgetting to update loop variable | Update `guess` or `tries` |
| Infinite while loop | Ensure condition eventually becomes false |
| Using == instead of === | Prefer strict comparison |
| Forgetting parseInt() | Compare numbers, not strings |

---

## ⚡ Quick Revision

```
JavaScript

↓

Interactive Websites

↓

Node.js

↓

Runs JS Outside Browser

↓

let

↓

Variable

↓

const

↓

Constant

↓

Math.random()

↓

Random Decimal

↓

Math.floor()

↓

Remove Decimal

↓

console.log()

↓

Display Output
```

---

```
readline

↓

Reads User Input

↓

question()

↓

Returns Text

↓

parseInt()

↓

Converts Number

↓

if

↓

Check Condition

↓

else if

↓

Second Check

↓

else

↓

Default
```

---

## 📝 30-Second Revision

✅ JavaScript makes websites interactive.

✅ Node.js runs JavaScript outside browsers.

✅ `let` creates variables.

✅ `const` creates constants.

✅ `Math.random()` generates a random decimal.

✅ `Math.floor()` removes decimals.

✅ `console.log()` prints output.

✅ The game starts by generating a secret number between **1 and 20**.

---

> 🎯 **Core Lesson (Part 1):** Before building any interactive program, you must understand how JavaScript stores data (`let`, `const`), generates values (`Math.random()`), and communicates with the user (`console.log()`). These are the foundational building blocks for every JavaScript application, from web development to cybersecurity automation.

---

✅ `readline` reads keyboard input.

✅ `question()` displays prompts.

✅ `await` pauses execution until the user responds.

✅ `parseInt()` converts strings into integers.

✅ `if` checks the first condition.

✅ `else if` checks additional conditions.

✅ `else` runs if every previous condition is false.

✅ `||` means **OR**.

---

> 🎯 **Core Lesson (Part 2):** A program becomes interactive by accepting user input, converting it into usable data, and making decisions based on conditions. This pattern—**Input → Process → Decision → Output**—is the foundation of almost every real-world application, including web apps, login systems, firewalls, and cybersecurity tools.

---

✅ `let` → Variable

✅ `const` → Constant

✅ `console.log()` → Print output

✅ `readline.question()` → Read user input

✅ `parseInt()` → Convert string to integer

✅ `if / else if / else` → Decision making

✅ `while` → Repeat until condition becomes false

✅ `tries++` → Increase attempt counter

✅ `!==` → Strict not equal

---

> 🎯 **Core Lesson (Complete Room):** Programming is built on three core ideas—**storing data (Variables), making decisions (Conditionals), and repeating actions (Loops)**. Mastering these fundamentals enables you to build interactive applications and forms the foundation for web development, backend engineering, automation, and cybersecurity scripting.

---

## 📋 JavaScript Cheatsheet

### Variables

```javascript
let age = 20;
```

---

### Constants

```javascript
const PI = 3.14;
```

---

### Output

```javascript
console.log("Hello");
```

---

### Input

```javascript
await rl.question();
```

---

### Number Conversion

```javascript
parseInt(text,10);
```

---

### Condition

```javascript
if(){

}

else if(){

}

else{

}
```

---

### Loop

```javascript
while(){

}
```

---

### Increment

```javascript
tries++;
```

---

### Random Number

```javascript
Math.floor(
Math.random()*20
)+1;
```

---

## ⚡ One Shot Revision

```
JavaScript

↓

Node.js

↓

let

↓

const

↓

Math.random()

↓

console.log()

↓

readline

↓

parseInt()

↓

if

↓

else if

↓

else

↓

while

↓

tries++

↓

Game Completed
```

---

## ⭐ Interview Questions

#### What is JavaScript?

A high-level programming language used for interactive web applications.

---

#### What is Node.js?

A runtime that allows JavaScript to run outside browsers.

---

#### Difference between let and const?

```
let

↓

Can change

const

↓

Cannot change
```

---

#### Why use constants?

To prevent important values from changing accidentally.

---

#### What does console.log() do?

Displays output in terminal or browser console.

---

#### What does Math.random() return?

A random decimal between

```
0 (inclusive)

and

1 (exclusive)
```

---

#### Why do we use readline?

To receive keyboard input in Node.js.

---

#### Why use await?

Because user input takes time.

The program must wait.

---

#### What does parseInt() do?

Converts text into an integer.

---

#### Difference between String and Integer?

```
"10"

↓

String


10

↓

Integer
```

---

#### What is an if statement?

A decision-making statement.

---

#### What is else if?

Checks another condition if previous one failed.

---

#### What is else?

Runs only if all previous conditions are false.

---

#### What does || mean?

Logical OR.

---

#### What is a loop?

A structure that repeats instructions.

---

#### What is a while loop?

Runs continuously until its condition becomes false.

---

#### Why increment tries?

To count user attempts.

---

#### Difference between != and !== ?

```
!=

↓

Loose Comparison

!==

↓

Strict Comparison
```

---

#### What happens if the loop condition never becomes false?

Infinite Loop.

---

#### Why are loops important?

They automate repetitive work.

---

### Common Infinite Loop Example

```javascript
while(true){

console.log(
"Hello"
);

}
```

Never stops.

---

### Correct Loop

```javascript
while(
guess!==secret
){

guess=
parseInt(
await rl.question()
);

}
```

Eventually

```
Guess

=

Secret

↓

Loop Ends
```

---

### Cybersecurity Interview Questions

#### Where are loops used?

- Password crackers
- Network scanners
- Malware analysis
- Packet inspection
- SIEM log analysis
- Automation scripts

---

#### Why is JavaScript useful in cybersecurity?

Because browsers execute JavaScript.

It helps understand

- XSS
- DOM
- Browser Security
- Web Applications
- Node.js Automation

---

## 🎯 Room Summary

This room introduced the **three fundamental building blocks of imperative programming**:

```
Variables

↓

Store Information

↓

Conditionals

↓

Make Decisions

↓

Loops

↓

Repeat Tasks
```

By combining these concepts, we built a complete **Guess the Number** game that:

- Generates a random secret number.
- Accepts user input.
- Converts text into numbers.
- Compares guesses using conditions.
- Repeats until the correct answer is entered.
- Tracks the number of attempts.

These same programming concepts are used in real-world software, backend services, automation scripts, and cybersecurity tools.

---

# Room 5 — Database SQL Basics 🗄️

```text
██████╗  █████╗ ████████╗ █████╗ ██████╗  █████╗ ███████╗███████╗
██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝
██║  ██║███████║   ██║   ███████║██████╔╝███████║███████╗█████╗
██║  ██║██╔══██║   ██║   ██╔══██║██╔══██╗██╔══██║╚════██║██╔══╝
████���█╔╝██║  ██║   ██║   ██║  ██║██████╔╝██║  ██║███████║███████╗
╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝

███████╗ ██████╗ ██╗
██╔════╝██╔═══██╗██║
███████╗██║   ██║██║
╚════██║██║▄▄ ██║██║
███████║╚██████╔╝███████╗
╚══════╝ ╚══▀▀═╝ ╚══════╝
```

## 1. WHAT IS DATA?

Data simply means information.

Examples

Name
Age
Price
Email
Phone Number
Marks
Salary

Example

Surya
21
₹200
surya@gmail.com

All of these are data.

Think:

Computer stores everything as data.

Examples

Facebook Posts
Instagram Likes
WhatsApp Messages
Bank Balance
Amazon Orders
College Marks

Everything is data.

## 2. WHY DO WE NEED DATABASES?

Imagine a small café.

Customer comes.

Owner writes order in notebook.

------------------------------------

Coffee
₹120
10:00 AM

Tea
₹80
10:10 AM

Latte
₹250
10:20 AM

------------------------------------

Looks easy...

Now imagine after

1 Day
100 Orders

1 Month
3000 Orders

1 Year
36,000 Orders

Now customer asks

"How many coffees were sold today?"

Owner has to search thousands of pages.

Very slow.

Very difficult.

Very inefficient.

So...

We need a better way.

That better way is...

DATABASE.

## 3. WHAT IS A DATABASE?

Definition

A Database is an organized collection of data.

OR

A database stores information so that computers can retrieve it quickly.

Simple Definition

Notebook
↓

Digital Notebook

with

Searching
Sorting
Filtering
Editing

### Real Life Examples

Instagram
↓

Users Database

-----------------------------------
Username
Password
Followers
Posts
-----------------------------------

Amazon

-----------------------------------
Product Name
Price
Seller
Rating
-----------------------------------

College

-----------------------------------
Roll Number
Marks
Attendance
CGPA
-----------------------------------

Bank

-----------------------------------
Account Number
Balance
Transactions
-----------------------------------

Hospital

-----------------------------------
Patient Name
Disease
Doctor
Medicine
-----------------------------------

### Advantages of Database

✓ Fast Search

✓ Easy Update

✓ Easy Delete

✓ Secure

✓ Stores Millions of Records

✓ Backup Possible

✓ Multiple Users

✓ Organized Data

### Without Database

Searching

❌ Slow

Storage

❌ Messy

Editing

❌ Difficult

Backup

❌ Hard

### With Database

Searching

✔ Fast

Storage

✔ Organized

Editing

✔ Easy

Backup

✔ Easy

## 4. DATABASE STRUCTURE

Everything inside database is stored in

TABLES

Think

Database

```text
        |
        |
   +-----------+
   | Database  |
   +-----------+
```
      /   \
     /     \
+---------+ +---------+
| Orders  | |  Users  |
+---------+ +---------+
|.........| |.........|
|.........| |.........|
+---------+ +---------+

Database

contains

Multiple Tables

## 5. WHAT IS A TABLE?

A table is like an Excel Sheet.

Example

```text
```text
+---------------------------------------------+
| ID | Drink | Price | Time                  |
+---------------------------------------------+
```
| 1  | Tea   |  20   | 09:00                 |
| 2  | Coffee|  30   | 09:10                 |
| 3  | Latte | 120   | 09:20                 |
+---------------------------------------------+
```

Everything is stored inside tables.

## 6. WHAT IS A COLUMN?

Columns describe

WHAT TYPE OF DATA

is stored.

Example

ID

stores IDs

Drink

stores drink names

Price

stores prices

Time

stores order time

Visualization

ID

↓

1
2
3
4

Drink

↓

Tea
Coffee
Latte

Price

↓

20
30
120

Each column stores ONE TYPE OF DATA.

Think

Column

=

Category

## 7. WHAT IS A ROW?

Row means

ONE COMPLETE RECORD

Example

```text
+---------------------------------------------+
| ID | Drink | Price | Time                  |
+---------------------------------------------+
| 1  | Tea   | 20    |09:00                  |
+---------------------------------------------+
```

Everything about ONE ORDER

is one row.

Another row

```text
+---------------------------------------------+
| 2 | Coffee |30 |09:10                      |
+---------------------------------------------+
```

Each row

=

One Record

## 8. RECORD

Record

=

One Complete Row

Example

--------------------------------

ID

1

Drink

Coffee

Price

30

Time

09:00

--------------------------------

Entire thing

=

One Record

### Database Hierarchy

Database

↓

Tables

↓

Rows

↓

Columns

↓

Values

Example

Database

Cafe

↓

Orders Table

↓

Row

Coffee

↓

Column

Price

↓

Value

30

## 9. VISUAL UNDERSTANDING

Database

        |
        |
   Orders Table

```text
```text
+----------------------------------------------+
|ID|Drink|Price|Time                           |
+----------------------------------------------+
```
|1 |Tea  |20   |09:00                          |
|2 |Latte|120  |09:10                          |
|3 |Coffee|30  |09:15                          |
+----------------------------------------------+
```

Columns

↓

ID

Drink

Price

Time

Rows

↓

Tea

↓

Latte

↓

Coffee

## 10. WHAT IS SQL?

SQL

=

Structured Query Language

SQL is

NOT

a database.

SQL is

A LANGUAGE

used to communicate with a database.

Think

Human
↓

SQL
↓

Database

### Analogy

English

↓

Talk to Humans

SQL

↓

Talk to Database

=====================================================================
Examples

Human says

Show me coffee orders.

SQL says

SELECT * FROM Orders
WHERE drink='Coffee';

Database returns

Coffee Orders

## 11. SQL vs DATABASE

DATABASE

Stores Data

SQL

Accesses Data

Database

Like Library

SQL

Like Librarian

Database

Book Storage

SQL

Find Book

## 12. WHY SQL?

Without SQL

Imagine searching

1 Million Orders

Manually

Impossible.

SQL

Can find them

in milliseconds.

=====================================================================
SQL can

Read Data

Insert Data

Delete Data

Update Data

Filter Data

Sort Data

Count Data

## 13. DATABASE EXAMPLES

MySQL

PostgreSQL

SQLite

Oracle

Microsoft SQL Server

MariaDB

MongoDB
(NoSQL)

## 14. SQL IS EVERYWHERE

Facebook

Instagram

Netflix

Amazon

Flipkart

Google

Uber

Paytm

Swiggy

Zomato

Every app uses databases.

## 15. CYBER SECURITY IMPORTANCE

Almost every target has

Database

Examples

Login System

↓

User Database

Bank

↓

Transaction Database

Hospital

↓

Patient Database

Government

↓

Citizen Database

Company

↓

Employee Database

=====================================================================
As Ethical Hackers

We interact with databases.

Examples

Login Testing

SQL Injection

Data Leakage

Broken Authentication

Privilege Escalation

Database Enumeration

=====================================================================
Future Topics

SQL Injection

Authentication Bypass

Dumping Database

Information Disclosure

Blind SQL Injection

Error Based SQLi

UNION SQLi

All require SQL knowledge.

## 16. MEMORY TRICKS

Database

↓

Cupboard

Table

↓

Shelf

Row

↓

One File

Column

↓

Label

Cell

↓

One Value

=====================================================================
Another Trick

Database

↓

School

Table

↓

Class

Row

↓

Student

Column

↓

Student Detail

Example

Roll

Name

CGPA

## 17. KEYWORDS TO REMEMBER

Data

Information

Database

Collection of data

Table

Stores records

Row

One record

Column

One attribute

Record

One row

SQL

Language to communicate with database

## 18. INTERVIEW QUESTIONS

Q1.
What is a database?

Answer

An organized collection of data.

------------------------------------------------------------

Q2.

Difference between SQL and Database?

Answer

Database stores data.

SQL accesses data.

------------------------------------------------------------

Q3.

What is a row?

Answer

One complete record.

------------------------------------------------------------

Q4.

What is a column?

Answer

One type of information.

------------------------------------------------------------

Q5.

Can database have multiple tables?

Yes.

------------------------------------------------------------

Q6.

Is SQL a programming language?

No.

It is a query language.

------------------------------------------------------------

Q7.

Why databases are faster than notebooks?

Because they support searching,
sorting,
filtering,
and indexing.

## 19. QUICK REVISION

Data
↓

Information

Database
↓

Collection of Data

Table
↓

Spreadsheet

Column
↓

Attribute

Row
↓

Record

Record
↓

One Complete Entry

SQL
↓

Language to communicate with Database

## 20. ONE-MINUTE CHEATSHEET

```text
Database
    │
    ├── Table
    │      │
    │      ├── Rows (Records)
    │      └── Columns (Attributes)
    │
    └── SQL
           │
           ├── Read
           ├── Insert
           ├── Update
           ├── Delete
           ├── Filter
           └── Sort
```

## 21. WHAT IS A QUERY?

A Query is simply a request made to a database.

Think

You ask a question

↓

Database answers

Example

Show all students.

Show all coffee orders.

Show products under ₹100.

These questions are called

QUERIES

## 22. BASIC SQL QUERY STRUCTURE

Almost every SQL query follows this pattern

SELECT
FROM
WHERE
ORDER BY

Visual

SELECT
    ↓
Choose Data

FROM
    ↓
Choose Table

WHERE
    ↓
Filter Rows

ORDER BY
    ↓
Sort Results

=====================================================================
Query Flow

Database

```text
        │
```
        ▼

SELECT

```text
        │
```

FROM

```text
        │
```

WHERE

```text
        │
```

ORDER BY

```text
        │
```

Result

## 23. SELECT

SELECT tells SQL

"What data do you want?"

Example

SELECT *

Meaning

Show everything.

=====================================================================
Example

Orders Table

```text
```text
+--------------------------------------------+
| ID | Drink | Price | Time                 |
+--------------------------------------------+
```
|1|Tea|20|09:00|
|2|Coffee|30|09:10|
|3|Latte|120|09:20|
+--------------------------------------------+
```

Query

SELECT *

returns

Everything

## 24. ASTERISK (*)

*

means

ALL COLUMNS

Example

SELECT *

means

Show

ID

Drink

Price

Time

Everything.

## 25. FROM

FROM tells SQL

Which table?

Example

SELECT *

FROM Orders;

Meaning

Show everything

FROM

Orders table.

=====================================================================
Without FROM

Database doesn't know

which table to read.

Wrong

SELECT *

Correct

SELECT *
FROM Orders;

## 26. FIRST SQL QUERY

SELECT *
FROM Orders;

Meaning

Select

↓

Everything

From

↓

Orders table

Result

ID

Drink

Price

Time

All rows

=====================================================================
Memory Trick

SELECT

↓

WHAT

FROM

↓

WHERE FROM

## 27. SELECT SPECIFIC COLUMNS

Sometimes

We don't need every column.

Instead of

SELECT *

Use

SELECT drink, price

Example

SELECT drink, price
FROM Orders;

Output

Drink

Price

Tea

20

Coffee

30

Latte

120

Notice

ID

Time

are hidden.

=====================================================================
Another Example

SELECT drink
FROM Orders;

Only

Drink

Tea

Coffee

Latte

=====================================================================
Multiple Columns

SELECT

drink,
price,
time

FROM Orders;

## 28. WHY SELECT SPECIFIC COLUMNS?

Advantages

Less Data

Faster

Cleaner

Easy to Read

Better Performance

Professional Practice

## 29. WHERE

WHERE

filters rows.

Think

WHERE

means

ONLY SHOW

matching records.

=====================================================================
Example

Orders

Tea

Coffee

Coffee

Latte

Coffee

Query

SELECT *

FROM Orders

WHERE drink='Coffee';

Output

Coffee

Coffee

Coffee

Only coffee rows remain.

=====================================================================
Visual

All Rows

Tea

Coffee

Latte

Coffee

Tea

↓

WHERE Coffee

↓

Coffee

Coffee

### WHERE Examples

Coffee only

SELECT *
FROM Orders
WHERE drink='Coffee';

Price 20

SELECT *
FROM Orders
WHERE price=20;

ID 5

SELECT *
FROM Orders
WHERE id=5;

### Common Operators

=

Equal

!=

Not Equal

>

Greater Than

<

Less Than

>=

Greater than or equal

<=

Less than or equal

=====================================================================
Examples

Price greater than 100

SELECT *
FROM Orders
WHERE price>100;

Price less than 50

SELECT *
FROM Orders
WHERE price<50;

Price not equal 30

SELECT *
FROM Orders
WHERE price!=30;

## 30. ORDER BY

ORDER BY

sorts data.

Think

Arrange

Small to Large

Large to Small

A to Z

Z to A

=====================================================================
Example

Prices

120

20

50

80

ORDER BY price

Result

20

50

80

120

=====================================================================
SQL

SELECT *

FROM Orders

ORDER BY price;

=====================================================================
Default

Ascending

Small

↓

Large

## 31. ASC

ASC

=

Ascending

Lowest

↓

Highest

Example

SELECT *

FROM Orders

ORDER BY price ASC;

Result

20

30

40

100

120

=====================================================================
ASC also works on text

Apple

Banana

Coffee

Tea

## 32. DESC

DESC

=

Descending

Highest

↓

Lowest

Example

SELECT *

FROM Orders

ORDER BY price DESC;

Output

120

100

50

30

20

=====================================================================
Memory Trick

ASC

A

Ascending

Small

↓

Large

DESC

Descending

Large

↓

Small

## 33. COMBINING WHERE + ORDER BY

Professional queries

combine commands.

Example

SELECT *

FROM Orders

WHERE drink='Coffee'

ORDER BY price DESC;

Meaning

Step 1

Find Coffee

↓

Step 2

Sort highest price first

↓

Display

=====================================================================
Execution

Orders

↓

WHERE

↓

Coffee Only

↓

ORDER BY

↓

Highest Price

↓

Result

## 34. SQL EXECUTION ORDER

Although we write

SELECT

first,

Database processes

FROM

↓

WHERE

↓

SELECT

↓

ORDER BY

Easy way

Read Table

↓

Filter

↓

Choose Columns

↓

Sort

## 35. SQL RULES

SQL keywords

can be written

Uppercase

SELECT

FROM

WHERE

or

lowercase

select

from

where

Both work.

Professional style

UPPERCASE keywords

=====================================================================
Semicolon

;

marks end of query.

Example

SELECT *
FROM Orders;

=====================================================================
Strings

Use

Single Quotes

Correct

'Coffee'

Wrong

Coffee

## 36. COMPLETE EXAMPLES

Show everything

SELECT *
FROM Orders;

---------------------------------------------------

Only drink names

SELECT drink
FROM Orders;

---------------------------------------------------

Drink + Price

SELECT drink,price
FROM Orders;

---------------------------------------------------

Only Coffee

SELECT *
FROM Orders
WHERE drink='Coffee';

---------------------------------------------------

Price High → Low

SELECT *
FROM Orders
ORDER BY price DESC;

---------------------------------------------------

Price Low → High

SELECT *
FROM Orders
ORDER BY price ASC;

---------------------------------------------------

Coffee Highest Price First

SELECT *
FROM Orders
WHERE drink='Coffee'
ORDER BY price DESC;

## 37. COMMON MISTAKES

Wrong

SELECT FROM Orders;

Missing *

--------------------------------

Wrong

SELECT *

Orders;

Missing FROM

--------------------------------

Wrong

WHERE drink=Coffee

Missing quotes

--------------------------------

Correct

WHERE drink='Coffee'

--------------------------------

Wrong

ORDER price

Correct

ORDER BY price

## 38. INTERVIEW QUESTIONS

Q1

What does SELECT do?

Answer

Chooses which columns to display.

-----------------------------------------------------

Q2

What does FROM do?

Answer

Specifies the table.

-----------------------------------------------------

Q3

What does WHERE do?

Answer

Filters rows.

-----------------------------------------------------

Q4

Difference between ASC and DESC?

ASC

Lowest → Highest

DESC

Highest → Lowest

-----------------------------------------------------

Q5

Meaning of *

All Columns

-----------------------------------------------------

Q6

Can WHERE and ORDER BY be used together?

Yes.

Very common.

-----------------------------------------------------

Q7

Default ORDER BY?

Ascending

## 39. CYBER SECURITY CONNECTION

Attackers

also use SQL.

Examples

SELECT username,password FROM users;

SELECT *

FROM information_schema.tables;

SELECT version();

These are used during

SQL Injection.

Learning basic SQL

is mandatory

before learning

SQLi.

## 40. ONE PAGE CHEATSHEET

SELECT

Choose Columns

--------------------------------

FROM

Choose Table

--------------------------------

WHERE

Filter Rows

--------------------------------

ORDER BY

Sort Results

--------------------------------

ASC

Lowest → Highest

--------------------------------

DESC

Highest → Lowest

--------------------------------

*

All Columns

### QUERY FLOW

```text
```text
```text
```text
SELECT
      │
```
      ▼
FROM
      │
```
      ▼
WHERE
      │
```
      ▼
ORDER BY
      │
```
      ▼
RESULT

### MOST COMMON SQL COMMANDS

SELECT *

FROM table;

--------------------------------

SELECT column

FROM table;

--------------------------------

SELECT column1,column2

FROM table;

--------------------------------

SELECT *

FROM table

WHERE column='value';

--------------------------------

SELECT *

FROM table

ORDER BY column;

--------------------------------

SELECT *

FROM table

ORDER BY column DESC;

--------------------------------

SELECT *

FROM table

WHERE column='value'

ORDER BY column DESC;

## 41. COMPLETE DATABASE HIERARCHY

```text
```text
                        DATABASE
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
```
     USERS               ORDERS             PRODUCTS
      TABLE               TABLE               TABLE
        │                   │                   │
   ┌────┴────┐         ┌────┴────┐        ┌────┴────┐
   │ Rows    │         │ Rows    │        │ Rows    │
   └────┬────┘         └────┬────┘        └────┬────┘
        │                   │                  │
     Columns             Columns           Columns
        │                   │                  │
```
      Values              Values            Values

## 42. COMPLETE SQL QUERY FLOW

Write Query

```text
        │
```

        ▼

FROM

Read Table

```text
        │
```

        ▼

WHERE

Filter Records

```text
        │
```

        ▼

SELECT

Choose Columns

```text
        │
```

        ▼

ORDER BY

Sort Results

```text
        │
```

        ▼

Display Output

## 43. DATABASE VOCABULARY

Data

↓

Information

---------------------------------------------------

Database

↓

Collection of Tables

---------------------------------------------------

Table

↓

Collection of Rows

---------------------------------------------------

Row

↓

One Record

---------------------------------------------------

Column

↓

One Attribute

---------------------------------------------------

Cell

↓

One Value

---------------------------------------------------

SQL

↓

Language to Query Database

## 44. SQL COMMAND CHEATSHEET

Show everything

SELECT *
FROM Orders;

-----------------------------------------------------

Show one column

SELECT drink
FROM Orders;

-----------------------------------------------------

Show multiple columns

SELECT drink, price
FROM Orders;

-----------------------------------------------------

Filter

SELECT *
FROM Orders
WHERE drink='Coffee';

-----------------------------------------------------

Sort

SELECT *
FROM Orders
ORDER BY price;

-----------------------------------------------------

Sort Descending

SELECT *
FROM Orders
ORDER BY price DESC;

-----------------------------------------------------

Sort Ascending

SELECT *
FROM Orders
ORDER BY price ASC;

-----------------------------------------------------

Filter + Sort

SELECT *
FROM Orders
WHERE drink='Coffee'
ORDER BY price DESC;

## 45. SQL KEYWORDS SUMMARY

SELECT

Choose Data

-----------------------------------

FROM

Choose Table

-----------------------------------

WHERE

Filter Data

-----------------------------------

ORDER BY

Sort Data

-----------------------------------

ASC

Lowest → Highest

-----------------------------------

DESC

Highest → Lowest

-----------------------------------

*

All Columns

## 46. SQL OPERATORS

=

Equal

-----------------------------------

!=

Not Equal

-----------------------------------

>

Greater Than

-----------------------------------

<

Less Than

-----------------------------------

>=

Greater Than or Equal

-----------------------------------

<=

Less Than or Equal

=====================================================================
Examples

price = 50

price > 50

price < 100

price >= 20

price <= 30

drink != 'Tea'

## 47. SQL EXECUTION EXAMPLES

Example 1

SELECT *
FROM Orders;

Meaning

Read every row
Return every column

---------------------------------------------------

Example 2

SELECT drink
FROM Orders;

Meaning

Return only drink names

---------------------------------------------------

Example 3

SELECT *
FROM Orders
WHERE drink='Tea';

Meaning

Filter only Tea orders

---------------------------------------------------

Example 4

SELECT *
FROM Orders
ORDER BY price DESC;

Meaning

Highest price appears first

---------------------------------------------------

Example 5

SELECT drink,price
FROM Orders
WHERE price>50
ORDER BY price;

Meaning

Show drink and price

Only drinks above ₹50

Sort from cheapest to expensive

## 48. SQL IN CYBER SECURITY

Databases exist almost everywhere.

Examples

Login Systems

↓

User Accounts

---------------------------------------------------

Banking

↓

Transactions

---------------------------------------------------

Hospitals

↓

Patient Records

---------------------------------------------------

E-Commerce

↓

Orders

Products

Payments

---------------------------------------------------

Government

↓

Citizen Data

## 49. WHY HACKERS LEARN SQL?

Hackers don't attack SQL.

They attack

Applications

that use SQL.

Examples

Login Pages

Search Boxes

Comment Forms

Forgot Password

Feedback Forms

Admin Panels

## 50. SQL INJECTION (INTRODUCTION)

One of the most famous web attacks

is

SQL Injection (SQLi)

SQL Injection happens when

User Input

↓

Becomes SQL Code

Example

Application

SELECT *
FROM users
WHERE username='admin'
AND password='123';

If application

doesn't validate input,

attacker may change query.

This can

Read Data

Modify Data

Delete Data

Bypass Login

### SQL Injection Types

Error Based SQLi

Union SQLi

Boolean SQLi

Time Based SQLi

Blind SQLi

Out of Band SQLi

These will be covered later in
Web Exploitation rooms.

## 51. WHY ETHICAL HACKERS MUST KNOW SQL

Because SQL helps understand

Authentication

Databases

Web Applications

Backend Logic

Data Storage

Without SQL

SQL Injection becomes difficult.

## 52. COMMON DATABASES

MySQL

Most popular

-----------------------------------

PostgreSQL

Enterprise

-----------------------------------

SQLite

Small Applications

-----------------------------------

Oracle

Large Enterprises

-----------------------------------

Microsoft SQL Server

Windows Environment

-----------------------------------

MariaDB

MySQL Alternative

## 53. SQL BEST PRACTICES

Use uppercase keywords

SELECT

FROM

WHERE

ORDER BY

-----------------------------------

Use meaningful formatting

-----------------------------------

Terminate query using ;

-----------------------------------

Use quotes for strings

'Coffee'

-----------------------------------

Read queries before execution

## 54. COMMON BEGINNER MISTAKES

❌ Forgetting FROM

❌ Missing semicolon

❌ Missing quotes

❌ Wrong table name

❌ Wrong column name

❌ ORDER instead of ORDER BY

❌ Using DESC before ORDER BY

❌ Typing SELECT FROM

## 55. MEMORY TRICKS

SELECT

↓

Select Data

-----------------------------------

FROM

↓

From Which Table

-----------------------------------

WHERE

↓

Where Condition

-----------------------------------

ORDER BY

↓

Arrange Results

-----------------------------------

ASC

↓

A = Ascending

-----------------------------------

DESC

↓

Descending

## 56. QUICK TABLE REFERENCE

```text
```text
+------------+------------------------------+
| Keyword    | Purpose                      |
+------------+------------------------------+
```
| SELECT     | Choose columns               |
| FROM       | Choose table                 |
| WHERE      | Filter rows                  |
| ORDER BY   | Sort rows                    |
| ASC        | Low → High                   |
| DESC       | High → Low                   |
| *          | All columns                  |
+------------+------------------------------+
```

## 57. INTERVIEW QUESTIONS

Q1

What is SQL?

Answer

Structured Query Language.

--------------------------------------------------

Q2

Is SQL a programming language?

Answer

No.

It is a Query Language.

--------------------------------------------------

Q3

Difference between Table and Database?

Database contains tables.

Table contains rows and columns.

--------------------------------------------------

Q4

Difference between Row and Column?

Row

One Record

Column

One Attribute

--------------------------------------------------

Q5

What does WHERE do?

Filters rows.

--------------------------------------------------

Q6

What does ORDER BY do?

Sorts rows.

--------------------------------------------------

Q7

Default sorting?

Ascending

--------------------------------------------------

Q8

Difference between ASC and DESC?

ASC

Low → High

DESC

High → Low

--------------------------------------------------

Q9

Meaning of *

All Columns

--------------------------------------------------

Q10

Why do hackers learn SQL?

To understand databases and perform
security testing like SQL Injection.

## 58. ROOM SUMMARY

In this room you learned

✔ What is Data

✔ Database

✔ Table

✔ Row

✔ Column

✔ Record

✔ SQL

✔ SELECT

✔ FROM

✔ WHERE

✔ ORDER BY

✔ ASC

✔ DESC

✔ Filtering

✔ Sorting

✔ Combining Queries

These are the building blocks
for every SQL database.

## 59. ONE-SHOT REVISION

```text
DATABASE
    │
    ├── TABLE
    │      │
    │      ├── ROW
    │      │      │
    │      │      └── VALUES
    │      │
    │      └── COLUMN
    │
    └── SQL
           │
           ├── SELECT
           ├── FROM
           ├── WHERE
           ├── ORDER BY
           ├── ASC
           └── DESC
```

## 60. COMPLETE SQL FLOW

Database

↓

Table

↓

Rows

↓

Columns

↓

Write SQL

↓

SELECT

↓

FROM

↓

WHERE

↓

ORDER BY

↓

Results

## 61. PREPARATION FOR NEXT ROOMS

You are now ready to learn

✔ SQL Injection

✔ Authentication Bypass

✔ Login Vulnerabilities

✔ UNION Queries

✔ Database Enumeration

✔ Information Disclosure

✔ Web Exploitation

✔ OWASP Top 10

✔ Burp Suite

✔ Advanced SQL

## 62. FINAL CHEATSHEET

SELECT *

FROM table;

-------------------------------------------------

SELECT column

FROM table;

-------------------------------------------------

SELECT col1,col2

FROM table;

-------------------------------------------------

SELECT *

FROM table

WHERE condition;

-------------------------------------------------

SELECT *

FROM table

ORDER BY column;

-------------------------------------------------

SELECT *

FROM table

ORDER BY column DESC;

-------------------------------------------------

SELECT *

FROM table

WHERE condition

ORDER BY column DESC;

## 🏁 END OF DATABASE SQL BASICS

Room Complete ✔

Knowledge Gained

✓ Database Fundamentals

✓ SQL Basics

✓ Reading Data

✓ Filtering Data

✓ Sorting Data

✓ Writing Simple Queries

✓ Foundation for SQL Injection

Next Recommended TryHackMe Rooms

→ SQL Injection
→ OWASP Top 10
→ Burp Suite Basics
→ Jr Penetration Tester
→ Web Fundamentals
