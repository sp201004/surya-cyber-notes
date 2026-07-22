## Contents

## Overview

In the previous room, we learned how computers represent numbers and colors using binary and hexadecimal.

Now comes the next important question:

> **If computers only understand numbers, then how do they store letters, symbols, emojis, and text?**

The answer is **Data Encoding**.

Data Encoding is the process of converting characters (letters, numbers, punctuation, emojis, and symbols) into numerical values so that computers can store, process, and transmit them. Without encoding, computers would never know that the number **65** should be displayed as **A**, or that **U+1F600** represents 😀.

---

## Learning Objectives

After completing this room you should understand:
- What Encoding is
- Character Sets
- ASCII and Extended ASCII
- Unicode
- UTF-8, UTF-16, and UTF-32
- Emojis
- Why Encoding Matters
- Common Encoding Problems
- Real-world Cybersecurity Applications

---

## Representation vs Encoding

Many beginners confuse these two concepts.

### Data Representation
Representation answers: **How is data stored inside a computer?**
**Example:**
```text
Number: 15
↓
Binary: 00001111
```

---

### Data Encoding
Encoding answers: **What does this number actually mean?**
**Example:**
```text
65
↓
Character: A
```

Without encoding, `65` could mean `A` or something else entirely. Computers need a predefined agreement. That agreement is called an **Encoding Standard**.

---

## Real-World Example

Suppose you type: `Hello`

The computer never stores `H e l l o`. Instead, it stores numbers.
**ASCII:**
```text
H → 72
e → 101
l → 108
l → 108
o → 111
```

Then these numbers become binary: `72 → 01001000`. Everything eventually becomes binary.

```text
Text
↓
Numbers
↓
Binary
↓
Memory
```

### ASCII Diagram

```text
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

Imagine sending `A` to another computer. If one computer thinks `65 = A` while another thinks `65 = B`, communication completely fails. Encoding standards ensure every computer interprets characters the same way.

---

## What is a Character?

A character is any individual symbol. Examples include:
- **Letters:** `A, B, C`
- **Digits:** `0, 1, 2`
- **Symbols:** `@, #, $, %`
- **Whitespace:** Space, Tab, New Line
- **Emojis:** , , ,
- **Different languages:** ह, 你, あ, Ω, Ж

---

## Character Set

A Character Set is a collection of characters supported by an encoding standard.

| Character Set | Contains |
|---|---|
| **ASCII** | Letters, Digits, Punctuation, Control Characters |
| **Unicode** | Almost every language, Emoji, Ancient scripts, Mathematical symbols |

---

## What is ASCII?

ASCII stands for **American Standard Code for Information Interchange**. It was created in 1963 to provide one common standard for English text.

ASCII uses **7 Bits**, which means it supports `2⁷ = 128` characters. The character range is `0` to `127`.

---

## ASCII Structure

ASCII consists of Control Characters and Printable Characters.

### ASCII Diagram

```text
ASCII
│
├── 0-31
│     Control Characters
│
├── 32-126
│     Printable Characters
│
└── 127
      DEL
```

---

## Printable Characters

ASCII supports Uppercase Letters, Lowercase Letters, Digits, and Symbols.
**Examples:**
```text
A → 65
B → 66
a → 97
0 → 48
@ → 64
```

---

## Control Characters

Not every ASCII value represents a visible character. Some values control devices.

**Examples:**
| Decimal | Name | Purpose |
|---:|---|---|
| 0 | NUL | Null |
| 7 | BEL | Bell |
| 8 | BS | Backspace |
| 9 | TAB | Horizontal Tab |
| 10 | LF | Line Feed |
| 13 | CR | Carriage Return |
| 27 | ESC | Escape |
| 127 | DEL | Delete |

---

## Common ASCII Values

| Character | Decimal | Hex | Binary |
|---|---:|---|---|
| A | 65 | 41 | 01000001 |
| B | 66 | 42 | 01000010 |
| C | 67 | 43 | 01000011 |
| a | 97 | 61 | 01100001 |
| b | 98 | 62 | 01100010 |
| 0 | 48 | 30 | 00110000 |
| 1 | 49 | 31 | 00110001 |
| Space | 32 | 20 | 00100000 |
| @ | 64 | 40 | 01000000 |
| # | 35 | 23 | 00100011 |

**Memory Trick:**
```text
A  →  65  →  0x41
a  →  97  →  0x61
```
The difference between uppercase and lowercase is `32` (`97 - 65 = 32`). This is a very common interview question.

---

## ASCII Example

**Word:** `CAT`
**ASCII:** `C → 67 | A → 65 | T → 84`
**Binary:** `01000011 | 01000001 | 01010100`
**Hexadecimal:** `43 | 41 | 54`

---

## "TryHackMe" Example

| Character | Hex |
|---|---|
| T | 54 |
| r | 72 |
| y | 79 |
| H | 48 |
| a | 61 |
| c | 63 |
| k | 6B |
| M | 4D |
| e | 65 |

Stored inside memory: `54 72 79 48 61 63 6B 4D 65`

---

## Why Hexadecimal is Used

Instead of showing binary (`01010100 01110010 01111001`), we write hexadecimal (`54 72 79`). It is much easier to read.

---

## Extended ASCII

ASCII only supports 128 Characters. This became a problem for European languages (e.g., `ñ, ö, ß, ç, ø`).

Different countries created different versions (e.g., ISO-8859-1, ISO-8859-2, Windows-1252). Unfortunately, different systems assigned different meanings to the same byte. The result was Gibberish (e.g., `Ã©`, `ÐŸ`, `Â£`). This is called **Mojibake**.

---

## What is Mojibake?

Mojibake is corrupted text caused by decoding data using the wrong character encoding.

**Example:**
- Original: `Café` (Saved in UTF-8)
- Incorrect Display: `CafÃ©` (Opened as Latin-1)

---

## Real-World Scenario

Imagine receiving subtitles for a movie.
- Correct: `Olá!`
- Incorrect: `OlÃ¡!`

Nothing is wrong with the file. The wrong encoding was used to interpret it.

---

## Cybersecurity Relevance

Encoding is extremely important because analysts inspect Log Files, Malware Strings, HTTP Requests, Email Headers, Memory Dumps, Network Packets, and Source Code. Understanding encoding helps identify hidden payloads, obfuscated scripts, and malicious content.

---

## Why ASCII Failed

ASCII was revolutionary, but it had one major limitation. It only supports 128 characters. This is enough for the English Alphabet, Numbers, and Basic Symbols. But it is NOT enough for Hindi, Chinese, Japanese, Arabic, Korean, Russian, or Emoji.

**Example:**
ASCII can store `A` but cannot store `ह, 你, あ, `. Hence, a new universal standard was needed. That standard is **UNICODE**.

---

## What is Unicode?

Unicode is a universal character standard. Think of it as a huge dictionary that gives every character on Earth its own unique number.

Unicode supports Every modern language, Mathematical symbols, Currency symbols, Emojis, Ancient languages, Musical notation, Chess symbols, and Braille. Almost EVERYTHING.

---

## Unicode Code Point

Every Unicode character gets a unique identifier called a **Code Point**.
**Format:** `U+XXXX`

| Term | Value |
|---|---|
| Example 1 | `U+0041` means Character `A` |
| Example 2 | `U+1F600` means Emoji 😀 |

### ASCII Diagram

```text
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
```

---

## Unicode Examples

| Character | Code Point |
|---|---|
| A | U+0041 |
| Ω | U+03A9 |
| あ | U+3042 |
| ت | U+062A |
| 龍 | U+9F8D |
| ♞ | U+265E |
| 😊 | U+1F60A |
| 🔥 | U+1F525 |

---

## But Wait...

Unicode only defines **WHAT NUMBER** belongs to **WHICH CHARACTER**. It DOES NOT tell us how to store those numbers. That's where UTF comes in.

---

## What is UTF?

UTF means **Unicode Transformation Format**. Its job is to convert Unicode code points into bytes.

```text
Unicode
↓
UTF Encoding
↓
Bytes
↓
Memory
```

---

## UTF-8

UTF-8 is the most popular encoding today. Used by Linux, Windows, macOS, Websites, APIs, JSON, HTML, JavaScript, Python, and almost EVERYTHING.

---

## UTF-8 Size

UTF-8 is variable length.

| Character Type | Size |
|---|---|
| ASCII Characters | 1 Byte |
| European Characters | 2 Bytes |
| Chinese/Japanese | 3 Bytes |
| Emoji | 4 Bytes |

**Example:**
- `A` → Unicode `U+0041` → UTF-8 `41` (1 Byte)
- `😊` → Unicode `U+1F60A` → UTF-8 `F0 9F 98 8A` (4 Bytes)

---

## UTF-8 Memory Diagram

```text
Text:      Hello 😊
↓
Unicode:   H e l l o 😊
↓
UTF-8:     48 65 6C 6C 6F  F0 9F 98 8A
↓
Disk:      Stored as raw bytes
```

---

## Advantages of UTF-8
- Backward Compatible with ASCII
- Small storage
- Internet Standard
- Most widely supported
- Variable length
- Efficient

---

## UTF-16

UTF-16 uses 2 bytes for most characters. Some rare characters need 4 bytes.
**Example:** `A` → `U+0041` → `0041` (2 Bytes).
Emojis need 2 UTF-16 units (4 Bytes).

**Summary:** Common Characters (2 Bytes), Emoji (4 Bytes). Widely used by Windows, Java, and C#.

---

## UTF-32

The simplest encoding. Every character is exactly 4 Bytes. Always.
- `A` → `00000041`
- Emoji → `0001F600`

**Advantages:** Very simple.
**Disadvantages:** Huge storage requirement.

---

## UTF Comparison

| Feature | UTF-8 | UTF-16 | UTF-32 |
|---|---|---|---|
| ASCII | 1B | 2B | 4B |
| Emoji | 4B | 4B | 4B |
| Storage | Small | Medium | Large |
| Speed | Fast | Medium | Fast |
| Internet | Yes | Rare | Very Rare |

---

## UTF Comparison Diagram

```text
Unicode Character: 😊

UTF-8:  F0 9F 98 8A (4 Bytes)
UTF-16: D83D DE0A   (4 Bytes)
UTF-32: 0001F60A    (4 Bytes)
```

---

## Emoji Encoding

Emoji are simply Unicode characters.
- 😀 → `U+1F600`
- 😊 → `U+1F60A`
- 🔥 → `U+1F525`
- ☕ → `U+2615`

The computer only stores numbers. Your operating system displays images.

---

## Interesting Unicode Examples

| Character | Unicode |
|---|---|
| ☕ | U+2615 |
| ♞ | U+265E |
| 龍 | U+9F8D |
| ツ | U+30C4 |
| 😊 | U+1F60A |
| 🔥 | U+1F525 |

---

## Why Unicode Matters

Without Unicode, Hindi users, Chinese users, Japanese users, and Emoji would all break. Unicode solved language compatibility forever.

---

## Real World Example

```text
Message:      नमस्ते 😊
↓
Unicode:      Character Mapping
↓
UTF-8:        Encoded bytes
↓
Network:      Transmission
↓
Receiver:     Receives bytes
↓
UTF-8 Decode: Parses bytes
↓
Unicode:      Maps to character
↓
Display:      Correct Text
```

---

## Cybersecurity Relevance

Unicode appears everywhere: Log Files, HTTP Requests, DNS, URLs, SQL Injection, XSS, Malware, Reverse Engineering, Memory Dumps, and Packet Analysis. Attackers abuse Unicode to hide payloads, bypass filters, and obfuscate malware. Understanding encoding is extremely important during malware analysis.

---

## ASCII vs Unicode

| Feature | ASCII | Unicode |
|---|---|---|
| Size | 128 Characters | Millions of Characters |
| Support | English Only | Every Language |
| Encoding | 7 Bits | Variable Encoding |
| Age | Old | Modern |

---

## Memory Tricks

| Concept | Meaning |
|---|---|
| **ASCII** | English Only |
| **Unicode** | Everything |
| **UTF** | Stores Unicode |
| **UTF-8** | Internet King |
| **UTF-16** | Windows + Java |
| **UTF-32** | Simple but Wasteful |

---

## One Shot Revision

```text
Representation → How data is stored
Encoding       → How numbers become characters

ASCII          → 128 Characters, English Only
Extended ASCII → European Languages
Unicode        → Universal Character Set
UTF            → Unicode Storage Format

UTF-8          → 1–4 Bytes, Internet Standard
UTF-16         → 2–4 Bytes
UTF-32         → Always 4 Bytes

Emoji          → Unicode Characters
Unicode        → Defines Characters
UTF            → Stores Characters
```

---

## Interview Questions

| Question | Answer |
|---|---|
| **Q. What is Unicode?** | Universal character encoding standard assigning unique code points to every character. |
| **Q. Difference between Unicode and UTF?** | Unicode is the Character Set. UTF is the Encoding Format. |
| **Q. Why is UTF-8 popular?** | Small, backward compatible with ASCII, and the Internet standard. |
| **Q. Difference between UTF-8 and UTF-16?** | UTF-8 uses 1–4 Bytes. UTF-16 uses 2–4 Bytes. |
| **Q. Does Unicode store bytes?** | No. UTF stores bytes. Unicode stores code points. |

---

## Key Takeaways

- Computers store text as numbers.
- **Encoding** maps numbers to characters.
- **ASCII** is a 7-bit standard with 128 characters. It mainly supports English.
- **Extended ASCII** attempted to support European languages but different encodings caused compatibility issues.
- Incorrect decoding leads to **Mojibake** (garbled text).
- Encoding knowledge is essential for **cybersecurity**, programming, networking, and **digital forensics**.
