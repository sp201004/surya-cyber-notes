## 📋 Contents

# Room 1 — Data Representation

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

### ASCII Diagram

```text
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

### ASCII Diagram

```text
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

### ASCII Diagram

```text
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

### ASCII Diagram

```text
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

### ASCII Diagram

```text
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

## Memory Tricks

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

## Common Mistakes

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

## One Shot Revision

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

## Interview Questions

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

## Frequently Asked Questions

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

## Key Takeaways

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

