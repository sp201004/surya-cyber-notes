## 📋 Contents

# Room 4 — JavaScript: Simple Demo

> A clean, structured study guide covering JavaScript fundamentals through a simple **Guess the Number** game.
>
> 💻 Beginner Friendly • 🎯 Interview Oriented • 🛡️ Cybersecurity Perspective • 📚 GitHub/Obsidian Ready

---

### Objective

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

### Mind Map

```javascript
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

```javascript
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

```javascript
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

```javascript
Browser

↓

HTML

↓

CSS

↓

JavaScript
```

Example

```javascript
Click Button

↓

JavaScript Runs

↓

Page Updates
```

---

Then came **Node.js**

Now JavaScript can run directly on servers.

```javascript
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

```javascript
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

```javascript
Guess the Number
```

---

### Program Logic

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
tries

↓

Number of attempts

guess

↓

Current user input
```

---

### Memory Diagram

```javascript
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

```javascript
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

```javascript
Login Systems

Rate Limiting

Password Retry

Account Locking
```

---

## Variable Life Cycle

```javascript
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

```javascript
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

```javascript
Secret = 14
```

If it changed every guess

```javascript
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

```javascript
const secret
```

---

## 7️⃣ Random Number Generation

The computer must secretly choose

```javascript
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

```javascript
0.000

↓

0.999
```

Example

```javascript
0.28

0.73

0.91
```

---

#### Step 2

Multiply by 20

```javascript
0.28

×

20

=

5.6
```

---

#### Step 3

```javascript
Math.floor()
```

Removes decimal

```javascript
5.6

↓

5
```

---

#### Step 4

```javascript
+1
```

Range becomes

```javascript
0–19

↓

1–20
```

---

### Complete Diagram

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
rl.question()

↓

Displays Question

↓

Waits for User

↓

Returns Text
```

Example

```javascript
Take a guess:

10
```

The returned value is

```javascript
"10"
```

Notice

It is **text**, not a number.

---

## Why is it Text?

Whenever a user types something,

JavaScript receives

```javascript
String
```

Example

```javascript
10

↓

"10"
```

Even though it looks like a number,

internally

```javascript
Type

↓

String
```

---

## Readline Module

Node.js doesn't automatically know how to read keyboard input.

We use

```javascript
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

```javascript
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

```javascript
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

```javascript
"10"
```

Needed value

```javascript
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

```javascript
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

```javascript
parseInt(text,10)
```

The

```javascript
10
```

means

```javascript
Decimal Number System
```

---

Example

```javascript
parseInt("25",10)
```

returns

```javascript
25
```

---

## Cybersecurity Example

Suppose a login system asks

```javascript
Enter OTP
```

User types

```javascript
123456
```

Received

```javascript
"123456"
```

Convert

```javascript
parseInt()

↓

123456
```

---

## Complete Flow

```javascript
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

```javascript
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

```javascript
Too High

Too Low

Correct
```

Answer

```javascript
Conditionals
```

---

## What is a Conditional?

A conditional allows a program

to make decisions.

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
Guess

=

Secret
```

then

```javascript
Winner
```

---

## Complete Decision Tree

```javascript
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

```javascript
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

```javascript
Less than 1

OR

Greater than 20
```

---

## Example

Guess

```javascript
35
```

Condition

```javascript
35>20

↓

True
```

Output

```javascript
Out of Range
```

---

Guess

```javascript
-5
```

Condition

```javascript
-5<1

↓

True
```

Output

```javascript
Out of Range
```

---

## Complete Program Flow

```javascript
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

```javascript
if(Login Success)

↓

Dashboard

else

↓

Access Denied
```

---

Firewall Example

```javascript
if(IP Blocked)

↓

Drop Packet

else

↓

Allow Packet
```

---

IDS Example

```javascript
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

```javascript
Start

↓

Take Guess

↓

Check

↓

Exit
```

Problem

```javascript
Only One Chance
```

A guessing game isn't fun if you only get one try.

Instead

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
Guess

≠

Secret

↓

Ask Again
```

---

## Flow Diagram

```javascript
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

```javascript
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

```javascript
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

```javascript
True
```

Different data types.

---

#### Why Use !== ?

It avoids unexpected bugs.

Modern JavaScript recommends

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
You got it in

4 tries!
```

Without incrementing

Program would always show

```javascript
0 tries
```

---

## 1️⃣9️⃣ Complete Game Logic

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
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

## Important Terms

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

## Memory Tricks

```javascript
let

↓

LET it change
```

---

```javascript
const

↓

CONSTANT

↓

Never changes
```

---

```javascript
console.log

↓

Console Prints
```

---

```javascript
Math.floor

↓

Floor

↓

Go Down

↓

Remove Decimal
```

---

```javascript
readline

↓

Reads Line
```

---

```javascript
parseInt

↓

Parse

↓

Convert

↓

Integer
```

---

```javascript
if

↓

First Choice
```

---

```javascript
else if

↓

Second Choice
```

---

```javascript
else

↓

Last Option
```

---

```javascript
||

↓

OR
```

---

```javascript
while

↓

WHILE True

↓

Keep Going
```

---

```javascript
tries++

↓

One More Try
```

---

```javascript
!==

↓

Not Equal

+

Different Type
```

---

```javascript
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

## Common Mistakes

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

## Quick Revision

```javascript
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

```javascript
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

## 30-Second Revision

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

## JavaScript Cheatsheet

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

## One Shot Revision

```javascript
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

## Interview Questions

#### What is JavaScript?

A high-level programming language used for interactive web applications.

---

#### What is Node.js?

A runtime that allows JavaScript to run outside browsers.

---

#### Difference between let and const?

```javascript
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

```javascript
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

```javascript
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

```javascript
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

```javascript
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

## Room Summary

This room introduced the **three fundamental building blocks of imperative programming**:

```javascript
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

