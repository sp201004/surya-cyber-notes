## Contents

> A complete beginner-friendly study guide covering Python basics, variables, input/output, random numbers, data types, and the foundations required for scripting in Cyber Security.

---

## Objective

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

Python is a **High-Level, Interpreted, General Purpose Programming Language** created by **Guido van Rossum** in **1991**. It focuses on readability and simplicity. Unlike C/C++, Python uses simple English-like syntax.

**Example:**
```python
print("Hello World")
```

instead of:
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

- Easy to Learn
- Easy to Read
- Huge Community
- Cross Platform
- Open Source
- Powerful Libraries
- Used Everywhere

---

## Python Applications

```text
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

Python is the most popular scripting language used by ethical hackers. It helps automate repetitive work.

**Examples:**
- Port Scanner
- Password Generator
- Malware Analysis
- Packet Analyzer
- Log Parser
- Web Scraper
- Exploit Development
- Network Automation

---

## Real World Example

Instead of manually checking 1000 IP addresses, Python can check all automatically. Instead of manually opening 500 log files, Python reads them automatically. **Automation saves time.**

---

## The Project of this Room

We create a simple game:
1. Computer secretly chooses a number.
2. Player keeps guessing.
3. Computer gives hints.
4. Eventually player wins.

---

## Program Flow

```text
Computer Starts
        │
Generate Random Number
        │
Tell User: "I'm thinking of a number"
        │
Take User Input
        │
Compare Guess
        │
    Correct?
    │      │
   No     Yes
   │       │
 Hint   Print Success
   │       │
 Repeat   End
```

---

## Understanding Variables

### What is a Variable?
A variable is simply **a named container used to store data.** Think of it as a labeled box.

**Example:**
```text
Name Box:  Surya
Age Box:   22
```

Instead of remembering the value, we remember the variable name.

### Variable Analogy

```text
Variable
↓
Storage Box
↓
Contains Value
↓
Can Change Anytime
```

**Example:**
```python
name = "Surya"
age = 22
city = "Ballia"
```

**Memory looks like:**
```text
name ─────► Surya
age ───────► 22
city ──────► Ballia
```

---

## Variables Used in This Room

There are three important variables in our game.

| Variable | Description |
|---|---|
| `secret` | Stores the hidden random number (e.g., `secret = 14`). Player never sees this. |
| `guess` | Stores the player's input (e.g., `guess = 10`, later `guess = 15`). |
| `tries` | Counts attempts (`0 → 1 → 2 → 3`). |

**Relationship:**
```text
secret  → Hidden Number
guess   → Player Guess
tries   → Attempt Counter
```

---

## Data Types

Everything stored inside Python belongs to a type.

| Data Type | Example | Description |
|---|---|---|
| Integer | `10`, `-8` | Whole Numbers |
| Float | `3.14`, `2.5` | Decimal Numbers |
| String | `"Hello"` | Text |
| Boolean | `True`, `False` | Only two values. Used in conditions. |

---

## Importing Modules

Large programs are divided into modules. Need extra functionality? Import it.

**Example:**
```python
import random
```

This loads Python's random library.

**Module Analogy:**
```text
Python  →  Toolbox
Need Hammer?  →  Import Hammer  →  Use Hammer
```

---

## Random Module

The random module generates unpredictable numbers. Used in Games, Simulations, Password Generation, Cryptography (though not always secure enough), and Testing.

### randint()

**Syntax:** `random.randint(a,b)`
**Returns:** `a <= number <= b` (Both numbers included).

**Example:**
```python
random.randint(1,20)
```
**Possible outputs:** `4, 8, 17, 20, 1`. Every execution may differ.

---

## Creating the Secret Number

```python
import random
secret = random.randint(1,20)
```

**Explanation:**
```text
Import Random Library
↓
Generate Number
↓
Store inside `secret`
↓
Ready for Game
```

---

## Printing Output

Python displays information using `print()`.

**Example:**
```python
print("Hello")
# Output: Hello

print("I'm thinking of a number between 1 and 20")
# Output: I'm thinking of a number between 1 and 20
```

---

## Taking User Input

Python uses `input()`.

**Example:**
```python
name = input("Enter Name: ")
```
User types: `Surya`. Variable becomes: `name = "Surya"`.

### Important Thing
`input()` ALWAYS returns a **String**. Even if the user types `15`, Python stores `"15"`, NOT `15`. This confuses many beginners.

---

## Type Conversion

Need an integer? Use `int()`.

**Example:**
```python
text = input("Take a guess: ")
guess = int(text)
```

**Flow:**
```text
Keyboard → "15" → int() → 15 → guess
```

### Why Convert?
Without conversion, `"10"` and `20` cannot be compared properly. You need `10` and `20` (both integers) to compare them.

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

**Code Flow:**
```text
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

Programs should make decisions. Instead of executing every line, Python decides "What should happen?" based on conditions. A conditional checks whether something is True or False.

**Example:**
```text
Is Age > 18?
↓
Yes
↓
Execute Code
```

### Real Life Examples

- **Rain?** Yes → Take Umbrella. Else → Don't Take.
- **Password Correct?** Yes → Login. Else → Access Denied.
- **Balance > ₹100?** Yes → Withdraw Money. Else → Insufficient Balance.

---

## Python Conditional Statements

Python mainly uses `if`, `elif`, `else`.

### if
Runs only when condition is TRUE.
```python
marks = 95
if marks > 90:
    print("Excellent")
```

### elif
Means "Else If". Checks another condition.
```python
if condition:
    # do something
elif condition:
    # do something else
```

### else
Runs when every condition becomes FALSE.
```python
if age >= 18:
    print("Adult")
else:
    print("Minor")
```

---

## Flow of if-elif-else

```text
Condition 1
      │
True? ──────Yes────► Execute
      │
     No
      │
Condition 2
      │
True? ──────Yes────► Execute
      │
     No
      │
Execute Else
```

---

## Comparison Operators

Python compares values using operators.

| Operator | Meaning | Example | Result |
|---|---|---|---|
| `==` | Equal | `20 == 20` | True |
| `!=` | Not Equal | `20 != 20` | False |
| `>` | Greater Than | `10 > 5` | True |
| `<` | Less Than | `5 > 20` | False |
| `>=` | Greater or Equal | | |
| `<=` | Less or Equal | | |

---

## Guessing Logic

Player enters `guess`. Computer compares `guess` with `secret`.

**Possible cases:**
```text
Guess
│
├── Out of Range
├── Too Low
├── Too High
└── Correct
```

### Out of Range
Allowed numbers are 1 to 20. Anything else (`0, 21, 40, -5`) is invalid.
```python
if guess < 1 or guess > 20:
    print("That number is out of range.")
```

### Too Low
```python
elif guess < secret:
    print("Too low")
```

### Too High
```python
elif guess > secret:
    print("Too high")
```

### Correct Guess
Since every other condition failed, guess must be equal to secret.
```python
else:
    print("You got it!")
```

---

## Loops

Without loops, the user gets ONLY ONE chance. That's boring. We need repeated execution. A Loop repeats code until a condition fails.

### while Loop
Runs until condition becomes FALSE.
```python
while condition:
    statements
```

### Guess Game Loop
`while guess != secret:`
**Meaning:** Keep asking until Guess becomes Secret.

---

## Loop Flow

```text
Guess Correct?
│
No
↓
Ask Again → Compare → Correct? → No → Repeat
↓
Yes
↓
Exit Loop
```

---

## Complete Program Flow

```text
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
    Compare (Low? / High? / Out of Range?)
↓
Correct
↓
Game Ends
```

---

## Final Program Structure

```python
import random
secret = random.randint(1,20)
tries = 0
guess = 0

print("I'm thinking of a number between 1 and 20")

while guess != secret:
    text = input("Take a guess: ")
    guess = int(text)
    tries = tries + 1
    
    if guess < 1 or guess > 20:
        print("That number is out of range.")
    elif guess < secret:
        print("Too low")
    elif guess > secret:
        print("Too high")
    else:
        print("You got it! It took you", tries, "tries.")
```

---

## Cyber Security Applications

| Concept | Used In |
|---|---|
| **Conditionals** | Login Systems, Password Checking, Firewall Rules, Packet Filtering, IDS Detection, Malware Detection, Authentication |
| **Loops** | Port Scanners, Password Crackers, Log Analysis, Vulnerability Scanners, Packet Capture, Automation Scripts |

**Example Port Scanner Loop:**
```text
for port in ports
↓
Connect
↓
Success?
↓
Print Open Port
```

---

## Important Terms

| Term | Meaning |
|---|---|
| **Variable** | Stores data |
| **Module** | Collection of Python code |
| **random** | Library for random values |
| **randint()** | Returns random integer |
| **print()** | Displays output |
| **input()** | Takes keyboard input |
| **int()** | Converts string into integer |
| **Secret** | Hidden random number |
| **Guess** | Player input |
| **Tries** | Number of attempts |
| **if** | Execute if condition is True |
| **elif** | Else If |
| **else** | Execute when everything fails |
| **while** | Repeat while condition is True |
| **==** | Equal |
| **!=** | Not Equal (NOT) |
| **Condition** | Expression returning True or False |
| **Iteration** | One execution of loop |

---

## Memory Tricks

| Function / Syntax | What to think |
|---|---|
| `print()` | Show on Screen |
| `input()` | Take from Keyboard |
| `int()` | TEXT → NUMBER |
| `randint()` | Random Integer Between `a` and `b` (Both Included) |
| `if` | Decision |
| `elif` | Else + If |
| `else` | Everything Failed → Default Action |
| `while` | Condition True → Keep Repeating |
| `!=` | `!` means NOT |

---

## Common Mistakes

| Mistake | Correct Way |
|---|---|
| Forgetting `import random` | Import the module before using `randint()` |
| Comparing `"10"` with `10` | Convert using `int()` |
| Thinking `input()` returns an integer | It always returns a string |
| Using an undefined variable | Initialize variables first |
| Assuming random numbers repeat | `randint()` generates different values on each execution |
| Using `=` inside condition | Use `==` |
| Infinite while loop | Update loop variables correctly |
| Forgetting `:` | Every `if`, `elif`, `else`, `while` needs a colon |
| Wrong indentation | Python depends on indentation |

---

## Key Takeaways

- Python is a high-level, interpreted programming language.
- Variables store data (`secret`, `guess`, `tries`).
- `import random` loads the random module.
- `random.randint(1,20)` generates a random integer.
- `print()` displays output.
- `input()` receives user input as a string.
- `int()` converts text to an integer.
- `if`, `elif`, and `else` control decision-making.
- Comparison operators determine program flow.
- `while` repeats code until the condition becomes false.
- `!=` means "not equal".
- The final game repeatedly asks for guesses until the correct number is entered.

> **Core Lesson:** This room introduces the essential programming concepts—variables, input/output, conditionals, comparison operators, and loops—that form the foundation of Python scripting. These same concepts are heavily used in cybersecurity automation, penetration testing, log analysis, and security tool development.

---

## One Shot Revision

```text
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
if / elif / else
↓
Comparison Operators
↓
while Loop
↓
Guess Game Completed
```

---

## Interview Questions

| Question | Answer |
|---|---|
| **What is Python?** | A high-level, interpreted, general-purpose programming language known for readability and automation. |
| **Why Python in Cyber Security?** | Because it automates repetitive tasks like scanning, parsing logs, writing exploits, packet analysis, and scripting. |
| **Difference between print() and input()** | `print()` displays data. `input()` receives data from the user. |
| **Why does input() return a string?** | Because keyboard input is received as text first. We convert it using `int()`, `float()`, etc., depending on the requirement. |
| **What does randint(1,20) return?** | A random integer between **1 and 20**, inclusive. |
| **What is a conditional statement?** | A decision-making statement that executes code depending on whether a condition evaluates to True or False. |
| **Difference between if and while?** | `if` runs once. `while` repeats until condition becomes False. |
| **What is iteration?** | One complete execution of a loop. |
| **Difference between == and = ?** | `=` is Assignment (Stores value). `==` is Comparison (Checks equality). |

---

## What's Next?

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
