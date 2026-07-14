## 📋 Contents

# Room 3 — Python: Simple Demo

> A complete beginner-friendly study guide covering Python basics, variables, input/output, random numbers, data types, and the foundations required for scripting in Cyber Security.

---

### Objective

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

```python
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

```python
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

```python
Name Box
---------

Surya

```

```python
Age Box
--------

22
```

Instead of remembering the value

we remember the variable name.

---

### Variable Analogy

```python
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

```python
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

```python
secret = 14
```

Player never sees this.

---

### guess

Stores player's input.

Example

```python
guess = 10
```

Later

```python
guess = 15
```

Variable changes.

---

### tries

Counts attempts.

Example

```python
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

```python
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

```python
5

20

100

-8
```

---

### Float

Decimal Numbers

```python
3.14

2.5

7.89
```

---

### String

Text

```python
"TryHackMe"

"Python"

"Cyber Security"
```

---

### Boolean

Only two values

```python
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

```python
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

```python
a <= number <= b
```

Both numbers included.

Example

```python
random.randint(1,20)
```

Possible outputs

```python
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

```python
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

```python
Hello
```

---

Game Example

```python
print("I'm thinking of a number between 1 and 20")
```

Output

```python
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

```python
Enter Name:
```

User types

```python
Surya
```

Variable becomes

```python
name = "Surya"
```

---

## Important Thing

input()

ALWAYS returns

```python
String
```

Even if user types

```python
15
```

Python stores

```python
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

```python
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

```python
"10"

and

20

cannot be compared properly.
```

Need

```python
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

```python
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

### Objective

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

```python
Age = 20

Is Age > 18 ?

↓

Yes

↓

Execute Code
```

---

### Real Life Examples

```python
Rain?

↓

Yes

↓

Take Umbrella

Else

Don't Take
```

---

```python
Password Correct?

↓

Yes

↓

Login

Else

Access Denied
```

---

```python
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

```python
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

```python
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

```python
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

```python
True
```

---

```python
5 > 20
```

```python
False
```

---

```python
20 == 20
```

```python
True
```

---

```python
20 != 20
```

```python
False
```

---

## Guessing Logic

Player enters

```python
guess
```

Computer compares

```python
guess

with

secret
```

Possible cases

```python
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

```python
1

↓

20
```

Anything else

```python
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

```python
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

```python
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

```python
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

```python
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

```python
Keep asking

until

Guess becomes Secret
```

---

## Loop Flow

```python
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

```python
!=

means

Not Equal
```

Example

```python
10 != 20

↓

True
```

```python
10 != 10

↓

False
```

---

## Complete Program Flow

```python
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

```python
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

```python
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

```python
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

## Important Terms

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

## Memory Tricks

#### print()

Think

```python
PRINT

↓

Show on Screen
```

---

#### input()

Think

```python
INPUT

↓

Take from Keyboard
```

---

#### int()

Think

```python
TEXT

↓

NUMBER
```

---

#### randint()

Remember

```python
Random Integer

Between

a and b

Both Included
```

---

#### if

```python
IF

↓

Decision
```

---

#### elif

```python
Else

+

If
```

---

#### else

```python
Everything Failed

↓

Default Action
```

---

#### while

```python
WHILE

Condition True

↓

Keep Repeating
```

---

#### !=

Remember

```python
!

means

NOT
```

---

## Common Mistakes

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

## 30-Second Revision

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

## One Shot Revision

```python
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

## Interview Questions

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

```python
=

Assignment

Stores value
```

```python
==

Comparison

Checks equality
```

---

### Why use elif?

To check multiple conditions efficiently without writing separate `if` statements.

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

---

