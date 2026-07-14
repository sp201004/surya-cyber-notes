## Contents

> Welcome to the Mystery Chest! This is your ultimate rapid-revision cheat sheet for the entire **Software Basics** module. Use this before interviews or exams.

---

## Memory Tricks

### Data Representation & Encoding

| Hook | Concept | Details |
|---|---|---|
| **1 Bit** | 2 Values | `0` or `1` (ON/OFF) |
| **4 Bits** | 1 Nibble | Half a byte |
| **8 Bits** | 1 Byte | Standard unit |
| **16 Hex Digits** | `0-9`, `A-F` | Base-16 Number System |
| **Every Hex Digit** | 4 Bits | A shortcut that saves a lot of time |
| **ASCII** | English Only | 7-bit character set (128 characters) |
| **Unicode** | Everything | Universal character set (assigns code points) |
| **UTF** | Stores Unicode | Encoding format (translates to bytes) |
| **UTF-8** | Internet King | 1–4 Bytes, Small, Backward compatible |
| **UTF-16** | Windows + Java | 2–4 Bytes |
| **UTF-32** | Simple but Wasteful| Fixed 4 Bytes |

---

### Python Memory Tricks

| Code | Mental Hook | Meaning |
|---|---|---|
| `print()` | **PRINT** | Show on Screen |
| `input()` | **INPUT** | Take from Keyboard (Always returns String) |
| `int()` | **TEXT → NUMBER** | Converts text to integer |
| `randint(a,b)` | **Random Integer** | Between `a` and `b` (Both Included) |
| `if` | **Decision** | First Choice |
| `elif` | **Else + If** | Second Choice |
| `else` | **Everything Failed** | Default Action |
| `while` | **WHILE Condition True** | Keep Repeating |
| `!=` | **! means NOT** | Not Equal |

---

### JavaScript Memory Tricks

| Code | Mental Hook | Meaning |
|---|---|---|
| `let` | **LET it change** | Variable |
| `const` | **CONSTANT** | Never changes |
| `console.log` | **Console Prints** | Show on Screen |
| `Math.floor` | **Floor - Go Down** | Remove Decimal |
| `readline` | **Reads Line** | Read from Keyboard |
| `parseInt` | **Parse → Convert** | Convert String to Integer |
| `if` | **First Choice** | Check condition |
| `else if` | **Second Choice** | Check next condition |
| `else` | **Last Option** | Default |
| `\|\|` | **OR** | Logical OR |
| `while` | **WHILE True** | Keep Going |
| `tries++` | **One More Try** | Increment by 1 |
| `!==` | **Not Equal + Type**| Strict Not Equal |

---

## Cybersecurity Interview Questions

### Section 1: Data Representation & Encoding

| Question | Answer |
|---|---|
| **What is Data Representation?** | Data Representation is the method of storing information inside a computer using binary values. |
| **Why do computers use Binary?** | Because electronic circuits have two stable states: ON (`1`) and OFF (`0`). |
| **What is a Bit?** | A Bit is the smallest unit of data. Possible values are `0` and `1`. |
| **What is a Byte and Nibble?** | `8 Bits = 1 Byte`. `4 Bits = 1 Nibble`. |
| **Which number system does Hexadecimal use?** | Base 16. |
| **Why is Hexadecimal preferred over Binary?**| Because it is much shorter and easier for humans to read. |
| **How many colors can 24-bit RGB represent?** | `16,777,216` |
| **What is RGB?** | RGB stands for Red, Green, Blue; used to represent colors digitally. |
| **Which tools commonly display hexadecimal?** | Wireshark, HxD, Hex Fiend, Bless, `xxd`, `hexdump`. |
| **What are Magic Numbers?** | Special hexadecimal values that identify file types (e.g., `89 50 4E 47` = PNG). |
| **Why is Data Representation important in Cybersecurity?** | Because analysts work with raw binary and hexadecimal data in: Malware Analysis, Packet Analysis, Digital Forensics, Reverse Engineering, Memory Analysis. |
| **What is Unicode?** | Universal character encoding standard assigning unique code points to every character. |
| **Difference between Unicode and UTF?** | Unicode = Character Set. UTF = Encoding Format. |
| **Does Unicode store bytes?** | No. UTF stores bytes. Unicode stores code points. |
| **Why UTF-8 is popular?** | Small, Backward compatible, Internet standard. |
| **Difference between UTF-8 and UTF-16?** | UTF-8 uses 1–4 Bytes. UTF-16 uses 2–4 Bytes. |

---

### Section 2: Programming Fundamentals (Python & JavaScript)

| Question | Answer |
|---|---|
| **What is Python?** | A high-level, interpreted, general-purpose programming language known for readability and automation. |
| **What is JavaScript?** | A high-level programming language used for interactive web applications. |
| **What is Node.js?** | A runtime that allows JavaScript to run outside browsers. |
| **Why Python in Cyber Security?** | Because it automates repetitive tasks like scanning, parsing logs, writing exploits, packet analysis, and scripting. |
| **Why is JavaScript useful in cybersecurity?**| Because browsers execute JavaScript. It helps understand XSS, DOM, Browser Security, Web Applications, and Node.js Automation. |
| **Difference between print() and input() (Python)?** | `print()` displays data. `input()` receives data from the user. |
| **What does console.log() do?** | Displays output in terminal or browser console. |
| **Why do we use readline (JS)?** | To receive keyboard input in Node.js. |
| **Why does input() return a string?** | Because keyboard input is received as text first. We convert it depending on the requirement. |
| **Difference between String and Integer?** | `"10"` is a String. `10` is an Integer. |
| **What does parseInt() do?** | Converts text into an integer. |
| **Difference between let and const (JS)?** | `let` can change. `const` cannot change. |
| **Why use constants?** | To prevent important values from changing accidentally. |
| **What does randint(1,20) return?** | A random integer between **1 and 20**, inclusive. |
| **What does Math.random() return?** | A random decimal between 0 (inclusive) and 1 (exclusive). |
| **What is a conditional statement?** | A decision-making statement that executes code depending on whether a condition evaluates to True or False. |
| **What is else if (elif)?** | Checks another condition if previous one failed. |
| **What is else?** | Runs only if all previous conditions are false. |
| **Difference between == and = ?** | `=` is Assignment (Stores value). `==` is Comparison (Checks equality). |
| **Difference between != and !== ?** | `!=` is Loose Comparison. `!==` is Strict Comparison. |
| **What does \|\| mean?** | Logical OR. |
| **What is a loop?** | A structure that repeats instructions to automate repetitive work. |
| **Difference between if and while?** | `if` runs once. `while` repeats until condition becomes False. |
| **What happens if the loop condition never becomes false?** | Infinite Loop (e.g., `while(true){}`). |
| **What is iteration?** | One complete execution of a loop. |
| **Where are loops used in Cybersecurity?** | Password crackers, Network scanners, Malware analysis, Packet inspection, SIEM log analysis, Automation scripts. |
| **Why use await?** | Because user input takes time. The program must wait. |
