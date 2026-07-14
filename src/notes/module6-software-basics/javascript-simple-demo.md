## Contents

> A clean, structured study guide covering JavaScript fundamentals through a simple **Guess the Number** game.
>
> Beginner Friendly • Interview Oriented • Cybersecurity Perspective • GitHub/Obsidian Ready

---

## Objective

Learn the basics of JavaScript by building a simple **Guess the Number** game.

Instead of only learning syntax, we'll understand:
- Variables
- Constants
- Random Numbers
- User Interaction
- Output
- Programming Logic

---

## What is JavaScript?

JavaScript (JS) is a **high-level programming language** mainly used to make websites interactive.

Without JavaScript:
- Buttons wouldn't respond
- Forms wouldn't validate
- Games wouldn't work
- Animations wouldn't exist

**JavaScript adds behavior to web pages.**

### Mind Map

```text
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

Today JavaScript is everywhere: Websites, Web Applications, APIs, Mobile Apps, Desktop Apps, Automation, and Cybersecurity Tools.

**Examples:** Netflix, Amazon, YouTube, Facebook, Discord, and VS Code Extensions all use JavaScript.

---

## Cybersecurity Perspective

Many security tools include JavaScript. A Web Pentester **must know JavaScript**.

**Examples:**
- Burp Suite Extensions
- Browser Exploitation
- XSS Payloads
- DOM Manipulation
- Web Pentesting
- Node.js Automation Scripts

---

## Client Side vs Server Side JavaScript

Originally JavaScript only ran inside browsers.

**Browser Example:**
```text
Click Button → JavaScript Runs → Page Updates
```

Then came **Node.js**. Now JavaScript can run directly on servers.

**Node.js Example:**
```text
Browser → HTTP Request → Node.js Server → Database → Response
```

### Comparison

| Browser JavaScript | Node.js JavaScript |
|---|---|
| Runs in browser | Runs on server |
| Manipulates webpage | Builds backend |
| Uses DOM | Uses filesystem, network |
| Client-side | Server-side |

**Remember:** Browser JS = Frontend. Node.js = Backend.

---

## Guess the Number Project

Throughout this room we build one program: **Guess the Number**.

### Program Logic

```text
Computer Picks Number
↓
User Guesses
↓
Correct?
├── No  → Hint → Guess Again
└── Yes → Win
```

### Flow Diagram

```text
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

### Learning Objectives

By the end of this room you'll understand:
- Variables
- Constants
- User Input
- Output
- Conditions
- While Loops

---

## Setting up the Environment

TryHackMe uses **Node.js**. Instead of browser JavaScript, we execute JavaScript from the terminal.

```bash
node filename.js
```
**Example:** `node guess_v1.js`

### Why Node.js?
**Advantages:** Easy, Fast, No browser required, Great for automation, Popular in industry.

### Browser vs Node
- **Browser:** Open Website → Run JavaScript
- **Node.js:** Open Terminal → `node app.js`

---

## Variables

A variable stores information. Think of it as a labeled box that can change its value later.

```javascript
let tries = 0;
let guess = 0;
```

**Meaning:**
- `tries` → Number of attempts
- `guess` → Current user input

### Why Variables?
Without variables the computer cannot remember anything.
```text
User Guess → Store Guess → Compare Guess → Ask Again → Update Guess
```

### Variable Declaration

JavaScript uses `let`.
```javascript
let age = 20;
let name = "Surya";
let score = 95;
```

### Why "let"?
Because the value changes later. Perfectly valid:
```javascript
let score = 10;
score = 20;
```

### Cybersecurity Example

```javascript
let failedAttempts = 0;
failedAttempts++;
```
Useful for: Login Systems, Rate Limiting, Password Retry, and Account Locking.

---

## Variable Life Cycle

```text
Declare → Assign → Use → Update → Program Ends
```

---

## Constants

Sometimes values should never change. For this we use `const`.

**Example:**
```javascript
const PI = 3.14;
```

**Example from room:**
```javascript
const secret = Math.floor(Math.random()*20)+1;
```

**Meaning:** Secret Number generated once, never changes.

### Difference

| Feature | `let` | `const` |
|---|---|---|
| Modification | Can change | Cannot change |
| Type | Variable | Constant |
| State | Mutable | Immutable Reference |

**Example:**
- Allowed: `let age = 20; age = 21;`
- Error: `const age = 20; age = 21;`

### Why Secret Uses const?
If `secret` changed every guess (`14 → 9 → 18 → 5`), the player could never win. Hence, `const secret`.

---

## Random Number Generation

The computer must secretly choose `1` to `20`.

```javascript
const secret = Math.floor(Math.random() * 20) + 1;
```

### Breaking It Down

1. **`Math.random()`**: Returns `0.000` to `0.999`. (e.g., `0.82`)
2. **Multiply by 20**: `0.82 × 20 = 16.4`
3. **`Math.floor()`**: Removes decimal. `16.4 → 16`
4. **`+1`**: Shifts range from `0–19` to `1–20`. `16 + 1 = 17`

### Complete Diagram

```text
Math.random()  →  0.82
× 20           →  16.4
Math.floor()   →  16
+ 1            →  17
```

---

## Displaying Output

To print text, JavaScript uses `console.log()`.

**Example:**
```javascript
console.log("I'm thinking of a number between 1 and 20");
```

### Why console.log()?
Useful for Messages, Debugging, Logs, and Testing.

### Cybersecurity Example
- `console.log("Login Successful");`
- `console.log("Suspicious Activity Detected");`

---

## Program Flow Till Now

```text
Start → Generate Secret → Store Secret → Initialize Variables → Display Message → Wait for User Input
```

---

## Taking User Input

We now need to ask the player for a guess.

**User Interaction:**
```text
Computer: "Take a guess" → User Types → Program Reads Input → Stores Guess
```

**Code:**
```javascript
const text = await rl.question("Take a guess: ");
```

**Explanation:**
`rl.question()` displays the question, waits for the user, and returns **Text**. Even if the user types `10`, the returned value is `"10"`.

### Why is it Text?
Whenever a user types something, JavaScript receives a `String`. Even though it looks like a number, internally its type is String.

### Readline Module
Node.js doesn't automatically know how to read keyboard input. We use `readline`.

```javascript
import * as readline from "node:readline/promises";

const rl = readline.createInterface({
    input,
    output
});
```

### Why await?
When JavaScript asks a question, it waits for the user. Without waiting, the program would continue immediately.

```text
Question → Wait → User Types → Continue
```

---

## Converting Text into Numbers

Current value: `"10"`. Needed value: `10`. JavaScript uses `parseInt()`.

**Code:**
```javascript
guess = parseInt(text, 10);
```

### Flow
```text
Keyboard → "15" → parseInt() → 15 → Integer
```

### Why Base 10?
`parseInt(text, 10)`. The `10` means Decimal Number System.

### Cybersecurity Example
Suppose a login system asks `Enter OTP`. User types `123456`. Received: `"123456"`. Convert: `parseInt() → 123456`.

---

## Complete Flow

```text
Ask User → Receive Text → Convert → Store Guess
```

**Program So Far:**
```text
Generate Secret → Print Welcome → Ask Guess → Convert Guess → Store Guess
```

---

## Conditional Statements

Now the program knows the user's guess. How does it decide if it is Too High, Too Low, or Correct? **Conditionals**.

A conditional allows a program to make decisions.
- Condition True → Run Code
- Condition False → Skip Code

**Real Life Example:** Rain? Yes → Take Umbrella. No → Go Outside.

### JavaScript Conditional Keywords

```text
if      → Check Condition
else if → Another Check
else    → Everything Else
```

---

## if Statement

Runs only when condition is true.

**Example:**
```javascript
if (guess < secret) {
    console.log("Too low");
}
```

---

## else if Statement

Used when the first condition fails.

**Example:**
```javascript
else if (guess > secret) {
    console.log("Too high");
}
```

---

## else Statement

Runs only when every previous condition fails.

**Example:**
```javascript
else {
    console.log("You Win");
}
```

### Complete Decision Tree

```text
Guess
↓
Less?    ──────Yes────► Too Low
↓ No
Greater? ──────Yes────► Too High
↓ No
Correct  ─────────────► Win
```

### Full Guess Logic

```javascript
if (guess < 1 || guess > 20) {
    console.log("Out of range");
} else if (guess < secret) {
    console.log("Too low");
} else if (guess > secret) {
    console.log("Too high");
} else {
    console.log("You got it!");
}
```

### Understanding ||
JavaScript uses `||` for **OR**. `guess < 1 || guess > 20` means "Less than 1 OR Greater than 20".

---

## Complete Program Flow

```text
Start → Generate Secret → Ask Guess → Convert Number → Check Range → Compare Secret → Hint → End
```

### Cybersecurity Perspective

Conditionals are used everywhere.
- **Login:** `if (Login Success) → Dashboard else → Access Denied`
- **Firewall:** `if (IP Blocked) → Drop Packet else → Allow Packet`
- **IDS:** `if (Suspicious Traffic) → Generate Alert else → Ignore`

---

## Why Do We Need Loops?

Current program only gives One Chance. That's boring. We need to repeat until correct.

```text
Guess → Wrong → Guess Again → Wrong → Guess Again → Correct → Win
```

This is exactly what loops are designed for.

### What is a Loop?
A loop repeatedly executes code until a condition becomes false.
**Real-Life Example:** Knock → Friend Opens? No → Knock Again. Yes → Stop.

---

## While Loop

JavaScript provides `while`.

**Syntax:**
```javascript
while (condition) {
    // code
}
```

### Guess Game Loop

```javascript
while (guess !== secret) {
    // keep asking
}
```
**Meaning:** Guess ≠ Secret → Ask Again.

### Flow Diagram

```text
Guess → Correct?
  │
  ├── No  → Loop Again
  └── Yes → Exit Loop
```

---

## != vs !==

JavaScript has two "Not Equal" operators.

### != (Loose Comparison)
`10 != "10"` → `False`. JavaScript converts the types automatically.

### !== (Strict Comparison)
`10 !== "10"` → `True`. Different data types.

**Why Use !== ?** It avoids unexpected bugs. Modern JavaScript recommends `===` and `!==`.

### Guess Loop Implementation

```javascript
while (guess !== secret) {
    const text = await rl.question("Take a guess: ");
    guess = parseInt(text, 10);
}
```

---

## Updating Variables

Every guess increases the number of attempts.

**Code:** `tries = tries + 1;` or `tries++;`

**Meaning:** `0 → 1 → 2 → 3 → 4`.
Without incrementing, the program would always show `0 tries`.

---

## Complete Game Logic

```text
Generate Secret → Print Welcome → Loop Begins
↓
Ask Guess → Convert Input → Increase Tries → Check Range → Too Low? → Too High? → Correct?
↓
Yes → Exit Loop → Print Victory
```

---

## Example Execution

```text
I'm thinking of a number between 1 and 20
Take a guess: 10
Too Low
Take a guess: 15
Too High
Take a guess: 13
Too Low
Take a guess: 14
Correct! You got it in 4 tries!
```

---

## JavaScript vs Python

| Feature | JavaScript | Python |
|---|---|---|
| Variable | `let` | Assignment |
| Constant | `const` | By convention |
| Output | `console.log()` | `print()` |
| Number Conversion | `parseInt()` | `int()` |
| Loop | `while` | `while` |
| Conditions | `if / else if / else` | `if / elif / else` |

---

## Cybersecurity Perspective (Loops)

Loops are everywhere.
- **Password Cracking:** Try Password → Success? No → Next Password
- **Port Scanner:** Port 1 Open? No → Port 2 Open? ...
- **Log Monitoring:** Read Log → Attack Found? No → Read Next Log
- **Firewall:** Packet Allowed? No → Drop → Next Packet

---

## Important Terms

| Term | Meaning |
|---|---|
| **JavaScript** | Programming language for web development |
| **Node.js** | Runtime for executing JavaScript outside browsers |
| **Variable (`let`)** | Storage whose value can change |
| **Constant (`const`)** | Storage whose value cannot change |
| **Math.random()** | Generates random decimal |
| **Math.floor()** | Removes decimal part |
| **console.log()** | Prints output |
| **readline / question()** | Reads user input / displays prompt |
| **await** | Waits for user response |
| **parseInt()** | Converts string to integer |
| **if / else if / else** | Conditionals |
| **\|\|** | Logical OR |
| **while** | Repeats code while condition is true |
| **!==** | Strict Not Equal |
| **++** | Increment by one |

---

## Memory Tricks

| Code | Mental Hook |
|---|---|
| `let` | **LET** it change |
| `const` | **CONSTANT** - Never changes |
| `console.log` | **Console** Prints |
| `Math.floor` | **Floor** - Go Down, Remove Decimal |
| `readline` | Reads Line |
| `parseInt` | Parse - Convert to Integer |
| `if` | First Choice |
| `else if` | Second Choice |
| `else` | Last Option |
| `\|\|` | OR |
| `while` | WHILE True - Keep Going |
| `tries++` | One More Try |
| `!==` | Not Equal + Different Type |

---

## Common Mistakes

| Mistake | Correct Way |
|---|---|
| Using `const` for changing values | Use `let` |
| Forgetting `+1` in random formula | Range becomes `0–19` |
| Using `console.log` without brackets | Always use `()` |
| Thinking Node.js is a language | It is a JavaScript runtime |
| Comparing strings instead of numbers | Use `parseInt()` |
| Forgetting `await` | Program won't wait |
| Using `=` instead of `==`/`===` in conditions | Use comparison operators |
| Forgetting to update loop variable | Infinite while loop |

---

## Interview Questions

| Question | Answer |
|---|---|
| **What is JavaScript?** | A high-level programming language used for interactive web applications. |
| **What is Node.js?** | A runtime that allows JavaScript to run outside browsers. |
| **Difference between let and const?** | `let` can change, `const` cannot change. |
| **Why use constants?** | To prevent important values from changing accidentally. |
| **What does Math.random() return?** | A random decimal between 0 (inclusive) and 1 (exclusive). |
| **What does parseInt() do?** | Converts text into an integer. |
| **Difference between != and !== ?** | `!=` is Loose Comparison. `!==` is Strict Comparison. |
| **What happens if the loop condition never becomes false?** | Infinite Loop. |
| **Why is JavaScript useful in cybersecurity?** | Because browsers execute JavaScript. It helps understand XSS, DOM, Browser Security, Web Applications, and Node.js Automation. |

---

## Room Summary

This room introduced the **three fundamental building blocks of imperative programming**:

```text
Variables    → Store Information
Conditionals → Make Decisions
Loops        → Repeat Tasks
```

By combining these concepts, we built a complete **Guess the Number** game that generates a random secret number, accepts user input, converts text into numbers, compares guesses using conditions, repeats until the correct answer is entered, and tracks the number of attempts.

These same programming concepts are used in real-world software, backend services, automation scripts, and cybersecurity tools.
