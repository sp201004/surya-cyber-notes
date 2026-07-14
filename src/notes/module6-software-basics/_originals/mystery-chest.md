## 📋 Contents

# Mystery Chest — Software Basics Rapid Revision

> Welcome to the Mystery Chest! This is your ultimate rapid-revision cheat sheet for the entire **Software Basics** module. Use this before interviews or exams.

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

Internet King 

-------------------

UTF-16

↓

Windows + Java

-------------------

UTF-32

↓

Simple but Wasteful

---

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
